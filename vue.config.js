module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devServer: {
      // proxy: {
      //   "/api": {
      //       target: "http://127.0.0.1:3000/", 
      //       changOrigin: true
      //   }
      // },

      before(app) {
        // 模拟后台服务器express
        app.get("/api/login", function(req, res) {
          const { userAccount, passWord } = req.query
          window.console.log(userAccount, passWord)

          if (userAccount == "test" && passWord == "test") {
            res.json({ code: 1, token: "lovetoo" })
          } else {
            res.status(401).json({ code: 0, message: "账号或密码错误" })
          }
        })

        // 保护接口中间件
        function auth(req, res, next) {
          if (req.headers.authorization) { // 已认证
            next()
          } else { // 用户未授权
            res.sendStatus(401)
          }
        }
        
        // 获取登录用户信息
        app.get("/api/userinfo", auth, function(req, res) {
          res.json({ code: 1, data: { name: "iui", age: 18 } })
        })
      }
    }
  }
}
