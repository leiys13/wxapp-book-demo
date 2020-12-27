// pages/guest/guest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: {
      arr: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      index: 1
    }
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

  changeNum: function (e) {
    this.setData({
      'picker.index': e.detail.value
    })
  },

  blurName: function (e) {
    this.checkName(e.detail.value)
  },

  checkName: function (d) {
    var reg = /^[\u4E00-\u9FA5A-Za-z]+$/
    return this.check(d, reg, '姓名输入有误')
  },

  blurPhone: function (e) {
    this.checkPhone(e.detail.value)
  },

  checkPhone: function (d) {
    var reg = /^(((13)|(15)|(17)|(18)|(19))\d{9})$/
    return this.check(d, reg, '手机号码输入有误')
  },

  check: function (data, reg, errMsg) {
    if (!reg.test(data)) {
      wx.showToast({
        title: errMsg,
        icon: 'none',
        duration: 1500
      })
      return false
    }
    return true
  },

  submitForm: function (e) {
    var name = e.detail.value.name
    var phone = e.detail.value.phone
    if (this.checkName(name) && this.checkPhone(phone)) {
      // 提交表单
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1500
      })
    }
  }
})