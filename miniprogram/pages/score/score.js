// miniprogram/pages/score/score.js
const db=wx.cloud.database();
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;


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
                      console.log(res.data[0].integral);
                    
                      that.setData({
                        integral: res.data[0].integral
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


      // db.collection('user').where({
      //   _openid: getApp().globalData.openid,
      // }).get({
      //   success:function(res){
      //     console.log(res.data[0].integral)
      //     that.setData({
      //       integral: res.data[0].integral
      //     })
      //   }
      // })
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
    

    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              db.collection('user').where({
                _openid: app.globalData.openid
              }).get({
               
                success: function (res) {
                  console.log(res.data[0]._openid);
                  db.collection('user').where({
                    _openid: res.data[0]._openid
                  }).get({
                    success: function (res) {
                      console.log(res.data[0].integral);
                    
                      that.setData({
                        integral: res.data[0].integral
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



    // db.collection('user').where({
    //   _openid: getApp().globalData.openid,
    // }).get({
    //   success: function (res) {
    //     console.log(res.data[0].integral)
    //     that.setData({
    //       integral: res.data[0].integral
    //     })
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