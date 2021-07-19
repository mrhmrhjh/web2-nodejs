var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    // console.log(_url);

    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(url.parse(_url, true));

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

    if (pathname === '/') {
      fs.readFile(`data/${queryData.id}`, 'utf8' ,(err, desc) => {
        if (queryData.id === undefined) {
          desc = 'Hello Node.js';
          title = 'Welcom';
        }
        // if (err) {
        //   desc = 'Hello Node.js';
        //   title = 'Welcom';
        // }

        var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ul>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>
            <h2>${title}</h2>
            <p>${desc}</p>
          </body>
          </html>
        `;
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
