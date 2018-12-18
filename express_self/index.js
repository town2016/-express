var express = require('./express/express')
var url = require('url')
var app = express()

app.listen(8000, function () {
  console.log('sever is start')
})

app.use(function (req, res, next) {
  res.setHeader('Content-Type','text/html')
  res.write(JSON.stringify(url.parse(req.url)))
  next()
})

app.use(function (req, res, next) {
  res.write(`<div>this is the ${url.parse(req.url).pathname} page</div>`)
  next()
})

app.use('/hello', function (req, res, next) {
  res.write(`<div>hello world${JSON.stringify(req.query)}</div>`)
  next()
})

module.exports = app