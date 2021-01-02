App({

  onLaunch: function () {
    this.checkLogin(res => {
      console.log('onLaunch is_login: ', res.is_login)
      if (!res.is_login) {
        console.log('check login false, then to login')
        this.login()
      }
    })
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       //
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log(res)
    //           this.globalData.userInfo = res.userInfo
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },

  login: function () {
    wx.login({
      success: res => {
        console.log('login code:', res.code)
        wx.request({
          url: 'http://127.0.0.1:3000/login',
          method: 'post',
          data: {
            code: res.code
          },
          success: res => {
            console.log('token: ', res.data.token)
            this.globalData.token = res.data.token
            wx.setStorage({
              data: 'token',
              key: 'res.data.token',
            })
          }
        })
      }
    })
  },

  checkLogin: function (callback) {
    var token = this.globalData.token
    if (!token) {
      token = wx.getStorageSync('token')
      if (token) {
        this.globalData.token = token
      } else {
        callback({is_login: false})
        return
      }
    }
    wx.request({
      url: 'http://127.0.0.1:3000/checklogin',
      data: {token: token},
      success: res => {
        callback({is_login: res.data.is_login})
      }
    })
  },

  globalData: {
    token: null,
    userInfo: null
  }
})