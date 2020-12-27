// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "http://127.0.0.1/video/wedding-invitation/1.mp4",
    danmuList: [
      {
        text: '第1秒出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第3秒出现的弹幕',
        color: '#00ff00',
        time: 3
      }
    ],
    movieList: [
      {
        createTime: 1565441760000,
        title: '林俊杰珠海演唱会',
        src: 'http://127.0.0.1/video/wedding-invitation/1.mp4'
      },
      {
        createTime: 1565441880000,
        title: '林俊杰珠海演唱会',
        src: 'http://127.0.0.1/video/wedding-invitation/2.mp4'
      }
    ]
  },

  videoContext: null,
  inputValue: '',

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 视频组件video
    this.videoContext = wx.createVideoContext('myVideo')

    // 腾讯视频插件
    // const TxvContent = requirePlugin('tencentvideo')
    // TxvContent.getTxvContent('txv1')
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

  blurInput: function (e) {
    this.inputValue = e.detail.value
  },

  tapSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: "#f90"
    })
  },

  tapSelectLocalVideo: function () {
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: res => {
        this.setData({
          src: res.tempFilePath
        })
      }
    })
  }
})