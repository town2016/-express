var http = require('http')
var app = require('../index')
http.createServer(app).listen(9000, function () {
  console.log('server start on 9000')
})
