// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: ''
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
    var app = getApp()
    console.log('app.num: ', app.num)
    app.test()
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

  num1: 0,
  num2: 0,

  changeNum1: function (e) {
    this.num1 = Number(e.detail.value)
    console.log('第1个数字为：', this.num1)
  },

  changeNum2: function (e) {
    this.num2 = Number(e.detail.value)
    console.log('第2个数字为：', this.num2)
  },

  changeNum: function (e) {
    console.log(e)
    this[e.currentTarget.dataset.id] = Number(e.detail.value)
  },

  tapCompare: function (e) {
    console.log('compare button touched')
    console.log(e)
    console.log('num1: ', this.num1)
    console.log('num2: ', this.num2)
    var res = '两数相等'
    if (this.num1 > this.num2) {
      res = '第1个数大'
    } else if (this.num1 < this.num2) {
      res = '第2个数大'
    }
    this.setData({
      result: res
    })
  }
})