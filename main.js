var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');


function templateHTML(title, list, body, control) {
  return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB2</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
  `;

}

function templateList(fileList) {
  var list = '<ul>';
  var i = 0;
  while ( i < fileList.length) {
    list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
    i = i+1;
  }
  list = list + '</ul>';

  return list;
}


var app = http.createServer(function(request,response){
    var _url = request.url;
    // console.log(_url);

    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    // console.log(url.parse(_url, true));

    var title = queryData.id;
    // console.log(title);

    // if(_url == '/'){
    //   // _url = '/index.html';
    //   title = 'Welcom';
    // }
    // if(_url == '/favicon.ico'){
    //   // return response.writeHead(404);
    //   response.writeHead(404);
    //   response.end();
    // }

console.log('pathname='+pathname);

    if (pathname === '/') {
      fs.readdir('./data', function(error, fileList) {
        console.log(`fileList=${fileList}`);

        // 홈인 경우
        if (queryData.id === undefined) {
        }
        // list 섡택된 경우
        else {
        }

        fs.readFile(`data/${queryData.id}`, 'utf8' ,(err, desc) => {
          var list = templateList(fileList);

          //파일이 없는 경우
          if (err) {
            desc = 'Hello Node.js';
            title = 'Welcom';
            var template = templateHTML(title, list,
              `<h2>${title}</h2><p>${desc}</p>`,
              `<a href="/create">create</a>`
            );
          } else {
            // 파일을 선택한 경우
            var template = templateHTML(title, list,
              `<h2>${title}</h2><p>${desc}</p>`,
              `<a href="/create">create</a>
               <a href="/update?id=${title}">update</a>
               <form action="delete_process" method="post">
                 <input type="hidden" name="id" value="${title}">
                 <input type="submit" value="delete">
               </form>
               `
            );
          }

          response.writeHead(200);
          response.end(template);
        });
      });

    } else if (pathname === '/create') {
      fs.readdir('./data', function(error, fileList) {
        console.log(`fileList=${fileList}`);

        title = 'Web - create';
        var list = templateList(fileList);
        var template = templateHTML(title, list, `
          <h2>${title}</h2>
          <form action="/create_process" method="post">
            <p>
              <input type="text" name="title" placeholder="title">
            </p>
            <p>
              <textarea name="description" placeholder="description"  rows="8" cols="80"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `, '');
        response.writeHead(200);
        response.end(template);
      });
    } else if (pathname === '/create_process') {
      var body = '';
      // data를 받으면 자동 callback이 실행됨
      request.on('data', function(chuck) {
        body += chuck;
      });
      // data를 모두 받으면 'end' 로 정의된 callback이 호출됨.
      request.on('end', function(){
        var post = qs.parse(body);
        // console.log(post);
        var title = post.title;
        var description = post.description;
        // console.log('title='+title);
        // console.log('description='+description);
        fs.writeFile(`data/${title}`, description, 'utf8', function(error){

          // response.writeHead(200); //200 - 성공
          // response.end('Success-write');
          response.writeHead(302, {Location: `/?id=${title}`}); // 301 - 페이지 변경됨.   302- 일시적으로 페이지 변경됨.
          response.end();
        });
      });
    } else if (pathname === '/update') {
      fs.readdir('./data', function(error, fileList) {
        console.log(`update-fileList=${fileList}`);

        fs.readFile(`data/${queryData.id}`, 'utf8' ,(err, description) => {
          var list = templateList(fileList);

          //파일이 없는 경우
          if (err) {
            desc = 'Hello Node.js';
            title = 'Welcom';
            var template = templateHTML(title, list,
              `<h2>${title}</h2><p>${description}</p>`,
              `<a href="/create">create</a>`
            );
          } else {
            // 파일을 선택한 경우
            var template = templateHTML(title, list,
              `
              <h2>${title}</h2>
              <form action="/update_process" method="post">
                <input type="hidden" name="id" value=${title}>
                <p>
                  <input type="text" name="title" placeholder="title" value=${title}>
                </p>
                <p>
                  <textarea name="description" placeholder="description"  rows="8" cols="80">${description}</textarea>
                </p>
                <p>
                  <input type="submit">
                </p>
              </form>
              `,
              `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
            );
          }

          response.writeHead(200);
          response.end(template);
        });
      });
    } else if (pathname === '/update_process') {
      var body = '';
      // data를 받으면 자동 callback이 실행됨
      request.on('data', function(chuckdata) {
        body += chuckdata;
      });
      // data를 모두 받으면 'end' 로 정의된 callback이 호출됨.
      request.on('end', function(){
        var post = qs.parse(body);
        console.log(post);
        var id = post.id;
        var title = post.title;
        var description = post.description;

        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(error){
            response.writeHead(302, {Location: `/?id=${title}`}); // 301 - 페이지 변경됨.   302- 일시적으로 페이지 변경됨.
            response.end();
          });
        });
      });
    } else if (pathname === '/delete_process') {
      var body = '';
      // data를 받으면 자동 callback이 실행됨
      request.on('data', function(chuckdata) {
        body += chuckdata;
      });
      // data를 모두 받으면 'end' 로 정의된 callback이 호출됨.
      request.on('end', function(){
        var post = qs.parse(body);
        console.log(post);
        var id = post.id;
        fs.unlink(`data/${id}`, function(err) {
          // 301 - 페이지 변경됨.   302- 일시적으로 페이지 변경됨.
          // /(홈) 으로 이동하도록 함.
          response.writeHead(302, {Location: `/`});
          response.end();
        });
      });

    } else {
      response.writeHead(404);
      response.end('Not Found');
    }









    // console.log(__dirname);
    // console.log(_url);


//    response.end(fs.readFileSync(__dirname + _url));

});
app.listen(3000); //port 3000
// app.listen(80); //port 3000
