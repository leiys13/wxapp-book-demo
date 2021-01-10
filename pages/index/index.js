// pages/index/index.js

var tempFilePath = null
var audioCtx = wx.createInnerAudioContext()
var rec = wx.getRecorderManager()

rec.onStop(res => {
  tempFilePath = res.tempFilePath
  console.log('temp file path:', tempFilePath)
})

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  tapRecord: function () {
    rec.start()
  },

  tapStop: function () {
    rec.stop()
  },

  tapPlayback: function () {
    audioCtx.src = tempFilePath
    audioCtx.play()
  },

  tapUpload: function () {
    if (!tempFilePath) {
      wx.showToast({
        title: '您还未录音',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.uploadFile({
      filePath: tempFilePath,
      name: 'file',
      url: 'http://127.0.0.1:3000/upload',
      success: res => {
        console.log('res.data', res.data)
        audioCtx.src = res.data
      }
    })
  },

  tapPlay: function () {
    audioCtx.play()
  },

  tapPause: function () {
    audioCtx.pause()
  },

  tapDownload: function () {
    wx.showLoading({
      title: '下载中...',
      mask: true
    })
    wx.downloadFile({
      url: 'http://127.0.0.1/upload/d0a941b6f74014d3957dec46bd930796.aac',
      success: res => {
        audioCtx.src = res.tempFilePath
        audioCtx.play()
        wx.hideLoading()
      }
    })
  }
})