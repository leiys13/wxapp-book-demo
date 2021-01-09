// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: null
  },

  animation: null,
  angle: 0,
  x1: 0,
  y1: 0,
  x3: 0,
  y3: 0,

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
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })
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

  start: function (e) {
    this.x1 = e.touches[0].clientX
    this.y1 = e.touches[0].clientY
  },

  end: function (e) {
    this.x3 = e.changedTouches[0].clientX
    this.y3 = e.changedTouches[0].clientY
    if (this.judgeturn(this.x1, this.y1, this.x3, this.y3)) {
      this.angle = this.angle + 35
      this.animation.rotate(this.angle).step()
      this.setData({
        animation: this.animation.export()
      })
    } else {
      this.angle = this.angle - 30
      this.animation.rotate(this.angle).step()
      this.setData({
        animation: this.animation.export()
      })
    }
  },

  tapRotate: function () {
    this.animation.rotate(Math.random() * 720 - 360).step()
    this.setData({
      animation: this.animation.export()
    })
  },

  tapScale: function () {
    this.animation.scale(Math.random() * 2).step()
    this.setData({
      animation: this.animation.export()
    })
  },

  tapTranslate: function () {
    this.animation.translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step()
    this.setData({
      animation: this.animation.export()
    })
  },

  tapSkew: function () {
    this.animation.skew(Math.random() * 45, Math.random() * 45).step()
    this.setData({
      animation: this.animation.export()
    })
  },

  tapRotateAndScale: function () {
    this.animation.rotate(Math.random() * 720 - 360)
                  .scale(Math.random() * 2).step()
    this.setData({
      animation: this.animation.export()
    })
  },

  tapRotateThenScale: function () {
    this.animation.rotate(Math.random() * 720 - 360).step()
                  .scale(Math.random() * 2).step()
    this.setData({
      animation: this.animation.export()
    })
  },

  tapAll: function () {
    this.animation.rotate(Math.random() * 720 - 360)
                  .scale(Math.random() * 2)
                  .translate(Math.random() * 100 - 50, Math.random() * 100 - 50)
                  .skew(Math.random() * 45, Math.random() * 45).step()
    this.setData({
      animation: this.animation.export()
    })
  },

  tapAllOrderBy: function () {
    this.animation.rotate(Math.random() * 720 - 360).step()
                  .scale(Math.random() * 2).step()
                  .translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step()
                  .skew(Math.random() * 45, Math.random() * 45).step()
    this.setData({
      animation: this.animation.export()
    })
  },

  tapReset1: function () {
    this.animation.rotate(0)
                  .scale(1)
                  .translate(0, 0)
                  .skew(0, 0).step()
    this.setData({
      animation: this.animation.export()
    })
  },

  tapReset2: function () {
    this.animation.skew(0, 0).step()
                  .translate(0, 0).step()
                  .scale(1).step()
                  .rotate(0).step()
    this.setData({
      animation: this.animation.export()
    })
  },

  judgeturn: function (x1, y1, x3, y3) {
    var x2 = 150
    var y2 = 150
    return !((x2 - x1) * (y3 - y2) - (y2 - y1) * (x3 - x2) > 0)
  }
})