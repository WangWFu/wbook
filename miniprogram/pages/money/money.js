// miniprogram/pages/money/money.js
const db=wx.cloud.database();
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remoney:'',
    id:''
  },
  return:function(){
    var num=0;
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定要退还押金',
      success(res){
        if(res.confirm){
          db.collection('user').doc(
            that.data.id
          ).update({
            data: {
              remoney: num
            }, success: function (res) {
              that.onShow()
              console.log(res)
            }
          })
        }
        else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  return1: function () {
    var num=90;
    var that=this;
    db.collection('user').doc(
     that.data.id).update({
      data: {
        remoney: num
      }, success: function (res) {
        that.onShow();
        wx.showToast({
          title: '您已成功缴纳押金',
          icon: 'none',
          duration: 2000
        })

        console.log(res)
      }
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
              //从数据库获取用户信息
              //that.queryUsreInfo();
              //用户已经授权过
              // wx.navigateBack({
              //   delta: 1
              // })
              const db = wx.cloud.database();
              db.collection('user').where({
                _openid: app.globalData.openid
              }).get({
                 success: function (res) {
                  console.log(res.data[0]._openid);
                   db.collection('user').where({
                     _openid: res.data[0]._openid
                   }).get({
                     success: function (res) {
                       console.log(res.data[0]._id);
                       that.setData({
                         avatarUrl: res.data[0].avatarUrl,
                         nickName: res.data[0].nickName,
                         gender: res.data[0].gender,
                         remoney: res.data[0].remoney,
                         id: res.data[0]._id
                       })
                       
                     }
                   })
                }
              })
            }
          });
        }
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
      
      
             db.collection('user').where({
                _openid: app.globalData.openid
              }).get({
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
                         remoney: res.data[0].remoney,
                         id: res.data[0]._id
                       })

                     }
                   })
                  // that.setData({
                  //   avatarUrl: res.data[0].avatarUrl,
                  //   nickName: res.data[0].nickName,
                  //   gender: res.data[0].gender,
                  //   remoney:res.data[0].remoney
                  // })
                 
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