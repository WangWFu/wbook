// miniprogram/pages/bookshare/bookshare.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collegeInfo: [
      {
        collegeName: '计算机',
        collegeId:1
       },
      {
        collegeName: '计算机',
        collegeId: 2
      },
      {
        collegeName: '计算机',
        collegeId: 3
      }, {
        collegeName: '计算机',
        collegeId: 4
      }, {
        collegeName: '计算机',
        collegeId: 5
      }, {
        collegeName: '计算机',
        collegeId: 6
      }
    ]
      
    
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
  onJumpPublish(event) {
    var collegeId = event.currentTarget.dataset.collegeId;
    wx.navigateTo({
      url: '../publish/publish?collegeId=' + collegeId
    })
  }
})