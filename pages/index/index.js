// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    message: '',
    newslist: []
  },

  id: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.connectSocket({
      url: 'ws://127.0.0.1:3000',
    })

    wx.onSocketOpen(function () {
      console.log('WebSocket connect open')
    })

    wx.onSocketMessage(function (msg) {
      console.log('receive msg:', msg)
      var data = JSON.parse(msg.data)
      data.role = 'server'
      console.log('this.id:', that.id)
      data.id = ++that.id
      var list = that.data.newslist
      list.push(data)
      that.setData({
        newslist: list,
        message: null
      })
      that.rollingBottom()
    })

    wx.onSocketClose(function () {
      console.log('WebSocket connect close')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.onSocketClose()
    console.log('WebSocket connect close')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  tapSend: function () {
    if (this.data.message) {
      wx.sendSocketMessage({
        data: this.data.message
      })
      this.rollingBottom()
      var list = []
      list = this.data.newslist
      var temp = {
        id: this.id++,
        content: this.data.message,
        date: new Date(),
        role: 'me'
      }
      list.push(temp)
      this.setData({
        newslist: list,
        message: null
      })
      console.log('send: ', this.data.newslist)
    } else {
      wx.showToast({
        title: '消息不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    this.rollingBottom()
  },

  inputChange: function (e) {
    this.setData({
      message: e.detail.value
    })
  },

  rollingBottom: function () {
    var s = 0
    var list = wx.createSelectorQuery().selectAll('.list')
    list.boundingClientRect(rects => {
      rects.forEach( rect => {
        this.setData({
          scrollTop: rect.bottom
        })
      })
    }).exec()
  }
})