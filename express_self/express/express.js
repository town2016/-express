var url = require('url')
var http = require('http')
function express () {
  // 存管中间件
  let tasks = []
  // express函数的执行结果
  var app = function (req, res) {
    let i = 0
    setQuery(req)
    // express  next() 方法，执行下一个中间件
    function next () {
      var task = tasks[i++]
      if (!task) {
        res.end()
        return
      }
      if (task.route === null || task.route === url.parse(req.url, true).pathname) {
        task.middleware && task.middleware(req, res, next)
      } else {
        next()
      }
    }
    next()
  }
  
  // 模拟express 启动server
  app.listen = function (port, fn) {
    http.createServer(this).listen(port, fn)
  }
  
  // 绑定中间件
  app.use = function (route, fn) {
    var task = {}
    if (typeof route === 'function') {
      task.route = null
      task.middleware = route
    } else {
      task.route = route   
      task.middleware = fn
    }
    tasks.push(task)
  }
  
  // 给req绑定query属性
  function setQuery (req) {
    var urlObj = url.parse(req.url),query = {}
    if (urlObj.query) {
      var queryList = urlObj.query.split('&')
      queryList.map(item => {
        query[item.split('=')[0]] = item.split('=')[1]
      })
    }
    req.query = query
  }

  return app
}



module.exports = express