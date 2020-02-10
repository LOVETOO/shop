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
      //       changOrigin: true, //改变源
      //       pathRewrite: {
      //         "^/api": "/" //路径重写
      //       }
      //   },
      //   // 此处若使用 "/api1" 类似命名可能会导致请求时只截取api部分接口出现404错误，因此命名时尽量避免此类命名方式。
      //   "/iui": {
      //       target: "http://127.0.0.1:3000/", 
      //       changOrigin: true, //改变源
      //       pathRewrite: {
      //         "^/iui": "/" //路径重写
      //       }
      //   }
      // },

      before(app) {
        // 模拟后台服务器express
        app.get("/api/login", function(req, res) {
          const { userAccount, passWord } = req.query

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
          res.json({ code: 1, data: {
            id:20191210,
            name: "车文烨",
            age: 25,
            avatar:"./images/avatar.jpg",
            lv:3
          }})
        })
      }
    }
  }
}
