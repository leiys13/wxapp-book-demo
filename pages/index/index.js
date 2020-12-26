// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: 0,
    tab: 0,
    playlist: [
      {id: 1, title: '大碗宽面戏曲部分', singer: '张含韵', src: 'http://127.0.0.1/music/dwkm-zhy.mp3', coverImgUrl: '/images/cf_name.jpg'},
      {id: 2, title: '大鱼', singer: '周深', src: 'http://127.0.0.1/music/dy-zs.mp3', coverImgUrl: '/images/cf_name.jpg'},
      {id: 3, title: '无问西东', singer: '王菲', src: 'http://127.0.0.1/music/wwxd-wf.mp3', coverImgUrl: '/images/cf_name.jpg'},
      {id: 4, title: '断桥残雪', singer: '许嵩', src: 'http://127.0.0.1/music/dqcx-xs.mp3', coverImgUrl: '/images/cf_name.jpg'}
    ],
    state: 'paused',
    playIndex: 0,
    play: {
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      title: '',
      singer: '',
      coverImgUrl: '/images/cf_name.jpg'
    }
  },

  audioCtx: null,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createInnerAudioContext()
    var that = this
    // 播放失败检测
    that.audioCtx.onError(function () {
      console.log('播放失败：', that.audioCtx.src)
    })
    // 播放完成自动下一曲
    that.audioCtx.onEnded(function () {
      that.tapNext()
    })
    // 自动更新播放进度
    that.audioCtx.onPlay(function() {
      console.log(that.data.play.title, '-', that.data.play.singer, '播放中...')
    })
    that.audioCtx.onTimeUpdate(function() {
      that.setData({
        'play.duration': formatTime(that.audioCtx.duration),
        'play.currentTime': formatTime(that.audioCtx.currentTime),
        'play.percent': that.audioCtx.currentTime / that.audioCtx.duration * 100
      })
    })
    // 默认选择第一首
    that.setMusic(0)
    // 格式化时间
    function formatTime (time) {
      var m = Math.floor(time / 60) % 60
      var s = Math.floor(time) % 60
      return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
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

  },

  /**
   * 点击顶部标签页
   * @param {*} e 
   */
  tapTabItem: function (e) {
    this.setData({
      item: e.target.dataset.item
    })
  },

  /**
   * 顶部标签页改变事件
   * @param {*} e 
   */
  changeTabItem: function (e) {
    this.setData({
      tab: e.detail.current
    })
  },

  /**
   * 设置播放音乐的索引
   * @param {}} idx 
   */
  setMusic: function (idx) {
    var music = this.data.playlist[idx]
    this.audioCtx.src = music.src
    this.setData({
      playIndex: idx,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': 0
    })
  },

  /**
   * 跳转到播放列表
   */
  tapToPlaylist: function () {
    this.setData({
      item: 2
    })
  },

  /**
   * 播放
   */
  tapPlay: function () {
    this.audioCtx.play()
    this.setData({
      state: 'running'
    })
  },

  /**
   * 暂停播放
   */
  tapPaused: function () {
    this.audioCtx.pause()
    this.setData({
      state: 'paused'
    })
  },

  /**
   * 下一首
   */
  tapNext: function() {
    var idx = this.data.playlist >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1
    this.setMusic(idx)
    if (this.data.state === 'running') {
      this.tapPlay()
    }
  },

  /**
   * 改变播放进度
   * @param {}} e 
   */
  changeProgress: function (e) {
    var s = e.detail.value * this.audioCtx.duration / 100
    this.audioCtx.seek(s)
  },

  /**
   * 播放列表中点击指定音乐播放
   * @param {*} e 
   */
  tapChangeMusic: function (e) {
    this.setMusic(e.currentTarget.dataset.index)
    this.tapPlay()
  }
})