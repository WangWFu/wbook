// miniprogram/pages/index/befborrow/befborrow.js
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
  Jumpdetail: function (event) {
    //let str = JSON.stringify(event.currentTarget.dataset.children);
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../bookdetail/bookdetail?id=' + id,
      success: function (res) {
        // console.log(id);
      },
      fail: function () {

      }
    })
  },
  //长按还书
  longPress: function (event) {
    var that = this;
    var id = event.currentTarget.dataset.id
    var index = event.currentTarget.dataset.index
    var selid = event.currentTarget.dataset.selid
    console.log(id);
    console.log(index)
    console.log(that.data.list[index])
    console.log(selid)
    wx.showModal({
      title: '提示',
      content: '确定要还书吗',
      success: function (res) {
        if (res.confirm) {
          db.collection("returnbook").add({
            data: {
              alist: that.data.list[index]
            },
            success: function (res) {
              console.log(res)
            }
          })
          db.collection('borrowbook').doc(id).remove({
            success: function (res) {
              console.log("-1");
              that.onShow()
            }
          })
          db.collection('book').doc(selid).update({
             data:{
                num:1
             },success:function(res){
               console.log('+1')
             }
          })
          //console.log('案件触发')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    date.setDate(date.getDate() + 3); //获取七天后的日期
    var deadDay = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    var that = this;
  
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              db.collection('user').get({
                data: {
                  openid: app.globalData.openid
                }, success: function (res) {
                  console.log(res.data[0]._openid);
                  db.collection('borrowbook').where({
                    _openid: res.data[0]._openid
                  }).get({
                    success: function (res) {
                      console.log(res)
                      if (res.data.length == 0) {
                        that.setData({
                          ishaveChild: false
                        })
                      } else {
                        that.setData({
                          list: res.data,
                          ishaveChild: true,
                          deadDay: res.data[0].deadDay
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
    var date = new Date();
    date.setDate(date.getDate() + 3); //获取七天后的日期
    var deadDay = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    var that = this;

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              db.collection('user').get({
                data: {
                  openid: app.globalData.openid
                }, success: function (res) {
                  console.log(res.data[0]._openid);
                  db.collection('borrowbook').where({
                    _openid: res.data[0]._openid
                  }).get({
                    success: function (res) {
                      console.log(res)
                      if (res.data.length == 0) {
                        that.setData({
                          ishaveChild: false
                        })
                      } else {
                        that.setData({
                          list: res.data,
                          ishaveChild: true,
                          deadDay: res.data[0].deadDay
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