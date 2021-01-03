// pages/index/index.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js')
Page({

  qqmapsdk: new QQMapWX({
    key: 'CHYBZ-FEFKJ-CBEFE-K3JX7-L7HGT-5OFJD'
  }),

  /**
   * 页面的初始数据
   */
  data: {
    mapw: '100%',
    maph: '0',
    scale: '18',
    longitude: null,
    latitude: null,
    markers: null
  },

  markIndex: 0,
  mapCtx: null,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mapCtx = wx.createMapContext('map')
    wx.getSystemInfo({
      success: res => {
        var mapw = res.windowWidth
        var maph = res.windowHeight
        this.setData({
          maph: maph + 'px',
          controls: [{
            id: 1,
            iconPath: '/images/center-point.png',
            position: {
              left: 10,
              top: maph-50,
              width: 30,
              height: 30
            },
            clickable: true
          }, {
            id: 2,
            iconPath: '/images/coupon.png',
            position: {
              left: mapw-60,
              top: maph-50,
              width: 30,
              height: 30
            },
            clickable: true
          }]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
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

  getFood: function (lng, lat) {
    this.qqmapsdk.search({
      keyword: '餐厅',
      location: {
        longitude: lng,
        latitude: lat
      },
      success: res => {
        console.log('getFood success:', res.data)
        var mark = []
        for (let i in res.data) {
          mark.push({
            iconPath: '/images/food.png',
            id: i,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          })
        }
        mark.push({
          iconPath: '/images/center-point.png',
          id: res.data.length,
          latitude: lat,
          longitude: lng
        })
        this.setData({
          markers: mark
        })
      }
    })
  },

  tapControl: function (e) {
    var id = e.controlId
    if (id === 1) {
      this.mapCtx.moveToLocation()
    }
  },

  changeRegion: function (e) {
    if (e.type === 'end') {
      this.mapCtx.getCenterLocation({
        success: res => {
          this.getFood(res.longitude, res.latitude)
        }
      })
    }
  }
})