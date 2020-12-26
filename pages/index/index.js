// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: true
  },

  bgm: null,
  music_url: "http://127.0.0.1/music/zwlphbh-jtnyjgw-ysbb.mp3",
  music_coverImgUrl: "http://127.0.0.1/image/music.png",

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.bgm = wx.getBackgroundAudioManager()
    this.bgm.title = 'marry me'
    this.bgm.epname = 'wedding'
    this.bgm.singer = 'singer'
    this.bgm.coverImgUrl = this.music_coverImgUrl
    // 设置src背景音乐会自动播放，此处设置其不自动播放
    // this.bgm.onCanplay(() => {
    //   this.bgm.pause()
    // })
    this.bgm.src = this.music_url
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

  /**
   * 背景音乐播放和暂停控制
   */
  tapPlay: function () {
    if (this.data.isPlayingMusic) {
      this.bgm.pause()
    } else {
      this.bgm.play()
    }
    this.setData({
      isPlayingMusic: !this.data.isPlayingMusic
    })
  },

  /**
   * 拨打新郎电话
   */
  tapCallGroom: function () {
    wx.makePhoneCall({
      phoneNumber: '17820981652',
    })
  },

  /**
   * 拨打新娘电话
   */
  tapCallBride: function () {
    wx.makePhoneCall({
      phoneNumber: '18570478625',
    })
  }
})