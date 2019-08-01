var bookNullTip = {
  tipText: '亲，找不到书籍的收藏',
  actionText: '去逛逛',
  //routeUrl: '../bookself/bookself'
}
const db=wx.cloud.database();
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nullTip: bookNullTip,
    contentlist:[],
    ishavacollection:false,
    openid:'',
    page: 1,
    pageSize: 20,
  },
  Jumpdetail: function (event) {
    //let str = JSON.stringify(event.currentTarget.dataset.children);
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../bookdetail/bookdetail?id=' + id,
      success: function (res) {
        console.log(id);
      },
      fail: function () {

      }
    })
  },

  getdatalist: function () { //可在onLoad中设置为进入页面默认加载
    var that = this;
    var pageNum = that.data.page;
    var pageSize = that.data.pageSize;
    db.collection('collectionlist').where({
      collention_id: that.data.openid
    }).skip((pageNum - 1) * pageSize).limit(pageSize).get({
      success: function (res) {
        console.log(res)
        if (res.data.length == 0) {
          // wx.showLoading({
          //   title: '没有更多的数据了',
          // })
        } else {
          var arr1 = that.data.contentlist; //从data获取当前datalist数组
          var arr2 = res.data; //从此次请求返回的数据中获取新数组
          arr1 = arr1.concat(arr2); //合并数组
          that.setData({
            contentlist: arr1, //合并后更新datalist
            ishavacollection: true
          })
          
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
             
              const db = wx.cloud.database();
              db.collection('user').where({
                _openid: app.globalData.openid
              }).get({
                success: function (res) {
                  console.log(res);
                  db.collection('collectionlist').where({
                    collention_id: res.data[0]._openid
                  }).get({
                    success: function (res) {
                      console.log(res.data)
                      if (res.data.length > 0) {
                        that.setData({
                          contentlist: res.data,
                          ishavacollection: true
                        })
                      } else {
                        that.setData({
                          ishavacollection: false
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
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
            
              const db = wx.cloud.database();
              db.collection('user').where({
                _openid: app.globalData.openid
              }).get({
                 success: function (res) {
                  console.log(res.data);
                  db.collection('collectionlist').where({
                    collention_id: res.data[0]._openid
                  }).get({
                    success: function (res) {
                      console.log(res.data)
                      if (res.data.length > 0) {
                        that.setData({
                          contentlist: res.data,
                          ishavacollection: true
                        })
                      } else {
                        that.setData({
                          ishavacollection: false
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

  }
})