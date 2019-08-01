// miniprogram/pages/bookshare/bookshare.js
var app=getApp();
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  list:[],
    ishaveChild:false,
    pagenum: 1, //初始页默认值为1
    openid:'',
    page: 1,
    pageSize: 20,
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
      content: '确定要取消您的分享吗',
      success: function (res) {
        if (res.confirm) {
          db.collection('book').doc(id).remove({
            success: function (res) {
              that.onShow()
              console.log('-1')
            }
          })
          //console.log('案件触发')
        }
      }
    })
  },
 
  getdatalist: function () { //可在onLoad中设置为进入页面默认加载
    var that = this;
    var pageNum = that.data.page;
    var pageSize = that.data.pageSize;
    db.collection('book').where({
      _openid: that.data.openid
    }).skip((pageNum - 1) * pageSize).limit(pageSize).get({
      success: function (res) {
        console.log(res)
        if (res.data.length == 0) {
          // wx.showLoading({
          //   title: '没有更多的数据了',
          // })
        } else {
          var arr1 = that.data.list; //从data获取当前datalist数组
          var arr2 = res.data; //从此次请求返回的数据中获取新数组
          arr1 = arr1.concat(arr2); //合并数组
          that.setData({
            list: arr1, //合并后更新datalist
            ishaveChild: true
          })
          // that.setData({
          //   list: res.data,
          //   ishaveChild: true
          // })
        }
      }
    })
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
                  that.setData({
                    openid: res.data[0]._openid
                  })
                  db.collection('book').where({
                    _openid: res.data[0]._openid
                  }).get({
                    success: function (res) {
                      if(res.data.length==0){
                        that.setData({
                          ishaveChild:false
                        })
                      }else{
                        that.setData({
                          list:res.data,
                          ishaveChild:true
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
   // console.log(userInfo)
   
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
                  db.collection('book').where({
                    _openid: res.data[0]._openid
                  }).get({
                    success: function (res) {
                      console.log(res.data.length)
                      if(res.data.length==0){
                        that.setData({
                          ishaveChild:false
                        })
                      }else{
                      that.setData({
                        list:res.data,
                        ishaveChild:true
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
    //this.onQuery()
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
    var that = this;
    var page = that.data.page + 1; //获取当前页数并+1
    that.setData({
      page: page, //更新当前页数
    })
    //  var that = this;
    // var page = that.data.page + 1; //获取当前页数并+1
    // that.setData({
    //   page: page, //更新当前页数
    // })
     that.getdatalist();//重新调用请求获取下一页数据
    //this.queryByPage();
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