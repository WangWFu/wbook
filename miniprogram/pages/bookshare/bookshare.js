// miniprogram/pages/bookshare/bookshare.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collegeInfo: [
      {
        collegeName: '哲学',
        collegeId:1
       },
      {
        collegeName: '经济',
        collegeId: 2
      },
      {
        collegeName: '文学',
        collegeId: 3
      }, {
        collegeName: '艺术',
        collegeId: 4
      }, {
        collegeName: '工业技术',
        collegeId: 5
      }, {
        collegeName: '小说',
        collegeId: 6
      },
      {
        collegeName: '学习资料',
        collegeId: 7
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