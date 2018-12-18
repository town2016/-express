var http  = require('http')
var fs = require('fs')
var path = require('path')
var url = require('url')
/*
 * // 设置响应头
http.createServer(function (req, res) {
  res.setHeader('Content-Type','text/html')
  res.writeHead(200)
  res.write(`
    <html>
      <head>
        <meta charset='utf-8'/>
      </head>
      <body>
        <h1>你好</h1>
      </body>
  `)
  
  res.end()
}).listen(8080)

* */

// 创建静态服务

function staticRoot (staticPath, req, res) {
  var urlObj = url.parse(req.url, true)

  var filePath = path.join(staticPath, urlObj.pathname)
  
  // 以二进制方式读取文件
  fs.readFile(filePath, 'binary', function (err, fileContent) {
    if (err) {
      res.writeHead(404),
      res.end('<h1>404 Not Found</h1>')
    } else {
      res.write(fileContent, 'binary') // 以二进制方式写文件
      res.end()
    }
  })
  
}

http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true)
  if (urlObj.pathname === '/' || urlObj.pathname === '/index.html') {
    var fileContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'binary')
    res.write(fileContent, 'binary')
    res.end()
  } else {
    staticRoot(path.join(__dirname, 'static'), req, res)
  }
}).listen(8080, function () {
  console.log('server success')
})




