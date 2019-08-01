// miniprogram/pages/index/searchshow/searchshow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  Jumpdetail: function (event) {
    //let str = JSON.stringify(event.currentTarget.dataset.children);
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../bookdetail/bookdetail?id=' + id,
      success: function (res) {
        console.log(id);
      }, fail: function () {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let searchShow = JSON.parse(options.data);
    let that = this
    that.setData({
      searchShow: searchShow
    })
    console.log(searchShow)

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

  }
})