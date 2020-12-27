// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 25.611751,
    longitude: 112.380073,
    markers: [{
      id: 0,
      iconPath: '/images/pt.png',
      latitude: 25.611751,
      longitude: 112.380073,
      width: 30,
      height: 30
    }]
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

  tapMyLocation: function () {
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },

  markertap: function () {
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: '中港世纪嘉城酒店',
      address: '郴州市嘉禾县和谐路'
    })
  }
})