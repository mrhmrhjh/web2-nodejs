var http = require('http');
var fs = require('fs');
var url = require('url');


function templateHTML(title, list, body) {
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

      <a href="/create">create</a>
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

        fs.readFile(`data/${queryData.id}`, 'utf8' ,(err, desc) => {
          if (err) {
            desc = 'Hello Node.js';
            title = 'Welcom';
          }
          var list = templateList(fileList);

          var template = templateHTML(title, list, `<h2>${title}</h2><p>${desc}</p>`);
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
          <form action="http://localhost:3000/process_create" method="post">
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

          `);
        response.writeHead(200);
        response.end(template);
      });

    } else {
      response.writeHead(200);
      response.end('Not Found');
    }









    // console.log(__dirname);
    // console.log(_url);


//    response.end(fs.readFileSync(__dirname + _url));

});
app.listen(3000); //port 3000
// app.listen(80); //port 3000
