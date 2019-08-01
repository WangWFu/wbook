// miniprogram/pages/index/returnborrow/returnborrow.js
var app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    replay: '',
    deadDay: '',
    ishaveChild: false,
    CheckAll: false,
    list: [],
    allsellist: [],
    sellist: [],
    selarr: [], //选择的货物
    relist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              db.collection('user').where({
                _openid: app.globalData.openid
              }).get({
                 success: function (res) {
                  console.log(res.data[0]._openid);
                  db.collection('returnbook').where({
                    _openid: res.data[0]._openid,
                  }).get({
                    success: function (res) {
                     // console.log('res111111', res)
                      var c = [];
                      var i = 0;
                      for (var j = 0; j < res.data.length; j++) {
                        c[i] = res.data[j].alist;
                        //console.log('c[i]111111111', res.data[j].alist);
                        //console.log('c[i]aaaa', c[i]);
                        i++;

                        //console.log(i)
                      }
                      //console.log(res.data[0].list[0]);
                      if (res.data.length == 0) {
                        that.setData({
                          ishaveChild: false
                        })
                      } else {
                        that.setData({
                          list: c,
                          ishaveChild: true
                        })
                      }
                    }
                  })

                }
              })
            }
          });
        }
      }
    })
    // db.collection('returnbook').where({
    //   _openid: app.globalData.openid,
    // }).get({
    //         success: function(res) {
    //           console.log('res',res)
    //           var c = [];
    //           var i = 0;
    //           for (var l = 0; l < res.data.length; l++) {
    //             for (var j = 0; j < res.data[l].list.length; j++) {
    //               c[i] = res.data[l].list[j];
    //               i++;
    //             }
    //             //console.log(c[i]);
    //           }
    //           //console.log(res.data[0].list[0]);

    //           //console.log(res.data[0].list.length);
    //           if (res.data.length == 0) {
    //             that.setData({
    //               ishaveChild: false
    //             })
    //           } else {
    //             that.setData({
    //               list: c,
    //               ishaveChild:true
    //             })
    //           }
    //         }
    //       })
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
    var that=this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              db.collection('user').where({
                _openid: app.globalData.openid
              }).get({
               success: function (res) {
                  console.log(res.data[0]._openid);
                  db.collection('returnbook').where({
                    _openid: res.data[0]._openid,
                  }).get({
                    success: function (res) {
                      // console.log('res111111', res)
                      var c = [];
                      var i = 0;
                      for (var j = 0; j < res.data.length; j++) {
                        c[i] = res.data[j].alist;
                        //console.log('c[i]111111111', res.data[j].alist);
                        //console.log('c[i]aaaa', c[i]);
                        i++;

                        //console.log(i)
                      }
                      //console.log(res.data[0].list[0]);
                      if (res.data.length == 0) {
                        that.setData({
                          ishaveChild: false
                        })
                      } else {
                        that.setData({
                          list: c,
                          ishaveChild: true
                        })
                      }
                    }
                  })

                }
              })
            }
          });
        }
      }
    })
    // db.collection('returnbook').get({
    //   success: function (res) {
    //     console.log('res111111', res)
    //     var c = [];
    //     var i = 0;
    //     for (var j = 0; j < res.data.length; j++) {
    //       c[i] = res.data[j].alist;
    //       console.log('c[i]111111111', res.data[j].alist);
    //       console.log('c[i]aaaa', c[i]);
    //       i++;

    //       //console.log(i)
    //     }
    //     //console.log(res.data[0].list[0]);
    //     if (res.data.length == 0) {
    //       that.setData({
    //         ishaveChild: false
    //       })
    //     } else {
    //       that.setData({
    //         list: c,
    //         ishaveChild: true
    //       })
    //     }
    //   }
    // })
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