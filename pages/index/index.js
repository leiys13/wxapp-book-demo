// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  width: 0,
  height: 0,
  timer: null,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        this.width = res.windowWidth
        this.height = res.windowHeight
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取canvas画布
    var ctx = wx.createCanvasContext('clock')
    // 换算为度数，6（秒针运动度数），30（小时指针），90（12、3、6、9点方向）
    const d6 = 6 * Math.PI / 180;
    const d30 = 30 * Math.PI / 180;
    const d90 = 90 * Math.PI / 180;
    // 获取宽高
    var w = this.width
    var h = this.height
    // 计算表盘半径，留出30px边距
    var radius = w / 2 - 30
    // 每秒绘制一次
    draw()
    this.timer = setInterval(draw, 1000)
    // 绘制函数
    function draw() {
      // 设置中心位置
      ctx.translate(w / 2, h / 2)
      // 绘制表盘
      drawClock(ctx, radius)
      // 绘制指针
      drawHand(ctx, radius)
      // 执行绘制
      ctx.draw()
    }

    function drawClock(ctx, radius) {
      // 绘制大圆
      ctx.setLineWidth(2)
      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, 2 * Math.PI, true)
      ctx.stroke()
      // 绘制中心圆
      ctx.setLineWidth(1)
      ctx.beginPath()
      ctx.arc(0, 0, 8, 0, 2 * Math.PI, true)
      ctx.stroke()
      // 绘制大刻度盘
      ctx.setLineWidth(5)
      for (var i = 0; i < 12; i++) {
        ctx.rotate(d30)
        ctx.beginPath()
        ctx.moveTo(radius, 0)
        ctx.lineTo(radius - 15, 0)
        ctx.stroke()
      }
      // 绘制小刻度盘
      ctx.setLineWidth(1)
      for (var i = 0; i < 60; i++) {
        ctx.rotate(d6)
        ctx.beginPath()
        ctx.moveTo(radius, 0)
        ctx.lineTo(radius - 10, 0)
        ctx.stroke()
      }
      // 绘制文本
      ctx.setFontSize(20)
      ctx.textBaseline = 'middle'
      var r = radius - 30
      for (var i = 1; i <= 12; i++) {
        var x = r * Math.cos(d30 * i - d90)
        var y = r * Math.sin(d30 * i - d90)
        if (i > 10) {
          ctx.fillText(i, x - 12, y)
        } else {
          ctx.fillText(i, x - 6, y)
        }
      }
    }

    function drawHand(ctx, radius) {
      // 当前时间
      var t = new Date()
      var h = t.getHours()
      var m = t.getMinutes()
      var s = t.getSeconds()
      h = h > 12 ? h - 12 : h
      // 时间从3点开始，逆时针旋转90度，指向12点
      ctx.rotate(-d90)
      // 绘制时针
      ctx.save()
      ctx.rotate(d30 * (h + m / 60 + s / 3600))
      ctx.setLineWidth(6)
      ctx.beginPath()
      ctx.moveTo(-20, 0)
      ctx.lineTo(radius / 2.6, 0)
      ctx.stroke()
      ctx.restore()
      // 绘制分针
      ctx.save()
      ctx.rotate(d6 * (m + s / 60))
      ctx.setLineWidth(4)
      ctx.beginPath()
      ctx.moveTo(-20, 0)
      ctx.lineTo(radius / 1.8, 0)
      ctx.stroke()
      ctx.restore()
      // 绘制秒针
      ctx.save()
      ctx.rotate(d6 * s)
      ctx.setLineWidth(2)
      ctx.beginPath()
      ctx.moveTo(-20, 0)
      ctx.lineTo(radius / 1.6, 0)
      ctx.stroke()
      ctx.restore()
    }
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

  }
})