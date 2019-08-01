// miniprogram/pages/index/mine/mine.js
var app=getApp();
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
      avatarUrl: '',
      nickName: '',
    integral:0,
    remoney:90,
    id:''
  },
  tobefborrow:function(){
    wx.navigateTo({
      url: '../befborrow/befborrow'
    })
  },
  inborrow: function () {
    wx.navigateTo({
      url: '../inborrow/inborrow'
    })
  },
  returnborrow: function () {
    wx.navigateTo({
      url: '../returnborrow/returnborrow'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              db.collection('user').where({
                _openid: app.globalData.openid
              }).get({
                // data: {
                //   _openid: app.globalData.openid
                // }, 
                success: function (res) {
                  console.log(res.data[0]._openid);
                  db.collection('user').where({
                  _openid: res.data[0]._openid
                  }).get({
                success: function (res) {
                  console.log(res.data);
                  that.setData({
                    avatarUrl: res.data[0].avatarUrl,
                    nickName: res.data[0].nickName,
                    gender: res.data[0].gender,
                    id:res.data[0]._openid
                  })
                  //getApp().globalData.userInfo = res.data;
                }
              })
                }
              })
            }
          });
        }
      }
    })




    // // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res)
    //           //从数据库获取用户信息
    //           //that.queryUsreInfo();
    //           //用户已经授权过
    //           // wx.navigateBack({
    //           //   delta: 1
    //           // })
    //           const db = wx.cloud.database();
    //           db.collection('user').doc(app.globalData.openid).get({
    //             // data: {
    //             //   openid: app.globalData.openid
    //             // }, 
    //             success: function (res) {
    //               console.log(res.data);
    //               that.setData({
    //                 avatarUrl: res.data[0].avatarUrl,
    //                 nickName: res.data[0].nickName,
    //                 gender: res.data[0].gender
                    
    //               })
    //               //getApp().globalData.userInfo = res.data;
    //             }
    //           })
    //         }
    //       });
    //     }
    //   }
    // })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      const db = wx.cloud.database();
      db.collection('user').add({
        data: {
          openid: getApp().globalData.openid,
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
          province: e.detail.userInfo.province,
          city: e.detail.userInfo.city,
          gender:e.detail.userInfo.gender,
          integral:that.data.integral,
          remoney:that.data.remoney
        },
        success: function (res) {
          //从数据库获取用户信息
          that.queryUsreInfo();
          console.log("插入小程序登录用户信息成功！");
          //console.log(res);
        }
      });
      //授权成功后，跳转进入小程序首页
      // wx.navigateTo({
      //   url: '',
      // })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    var that=this;
    const db = wx.cloud.database();
    db.collection('user').where({
      _openid:that.data.id
    }).get({
       success: function (res) {
        console.log(res.data[0].avatarUrl);
        that.setData({
          avatarUrl:res.data[0].avatarUrl,
          nickName: res.data[0].nickName,
          gender: res.data[0].gender
        })
        //getApp().globalData.userInfo = res.data;
      }
    })
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
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              //that.queryUsreInfo();
              //用户已经授权过
              // wx.navigateBack({
              //   delta: 1
              // })
              const db = wx.cloud.database();
              db.collection('user').where({
                _openid:that.data.id
              }).get({
                success: function (res) {
                  console.log(res.data);
                  that.setData({
                    avatarUrl: res.data[0].avatarUrl,
                    nickName: res.data[0].nickName,
                    gender: res.data[0].gender

                  })
                  //getApp().globalData.userInfo = res.data;
                }
              })
            }
          });
        }
      }
    })
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