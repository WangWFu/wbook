// miniprogram/pages/index/bookself/bookself.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishaveChild:false,
    TabCur: 0,
    scrollLeft: 0,
    nav: [
      {
        id: 0,
        name: '哲学',
      },
      {
        id: 1,
        name: '经济',
      }, {
        id: 2,
        name: '文学',
      }, {
        id: 3,
        name: '艺术',
      }, {
        id: 4,
        name: '工业技术',
      }, {
        id: 5,
        name: '小说',
      }, {
        id: 6,
        name: '学习资料',
      }

    ],
    children:[]
  },

  tabSelect(e) {
    var that=this;
    that.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 50
    })
    if (that.data.TabCur == 0) {
      var that = this;
      const db = wx.cloud.database();
      db.collection('book').where({
        collegeId: '1'
      }).get({
        success: function (res) {
          //console.log(res.data);
          if (res.data.length == 0) {
            that.setData({
              ishaveChild: false
            })
          } else {
            that.setData({
              children: res.data,
              ishaveChild: true
            })
          }
        }
      })
    }
    if (that.data.TabCur == 1) {
      var that = this;
      const db = wx.cloud.database();
      db.collection('book').where({
        collegeId: '2'
      }).get({
        success: function (res) {
          console.log(res.data.length);
          if (res.data.length == 0) {
            that.setData({
              ishaveChild: false
            })
          } else {
            that.setData({
              children: res.data,
              ishaveChild: true
            })
          }


        }
      })
    }
    if (that.data.TabCur == 2) {
      var that = this;
      const db = wx.cloud.database();
      db.collection('book').where({
        collegeId: '3'
      }).get({
        success: function (res) {
          //console.log(res.data);
          if (res.data.length == 0) {
            that.setData({
              ishaveChild: false
            })
          } else {
            that.setData({
              children: res.data,
              ishaveChild: true
            })
          }

        }
      })
    }
    if (that.data.TabCur == 3) {
      var that = this;
      const db = wx.cloud.database();
      db.collection('book').where({
        collegeId: '4'
      }).get({
        success: function (res) {
          //console.log(res.data);
          if (res.data.length == 0) {
            that.setData({
              ishaveChild: false
            })
          } else {
            that.setData({
              children: res.data,
              ishaveChild: true
            })
          }

        }
      })
    }
    if (that.data.TabCur == 4) {
      var that = this;
      const db = wx.cloud.database();
      db.collection('book').where({
        collegeId: '5'
      }).get({
        success: function (res) {
          //console.log(res.data);
          if (res.data.length == 0) {
            that.setData({
              ishaveChild: false
            })
          } else {
            that.setData({
              children: res.data,
              ishaveChild: true
            })
          }

        }
      })
    }
    if (that.data.TabCur == 5) {
      var that = this;
      const db = wx.cloud.database();
      db.collection('book').where({
        collegeId: '6'
      }).get({
        success: function (res) {
          //console.log(res.data);
          if (res.data.length == 0) {
            that.setData({
              ishaveChild: false
            })
          } else {
            that.setData({
              children: res.data,
              ishaveChild: true
            })
          }

        }
      })
    }
    if (that.data.TabCur == 6) {
      var that = this;
      const db = wx.cloud.database();
      db.collection('book').where({
        collegeId: '7'
      }).get({
        success: function (res) {
          //console.log(res.data);
          if (res.data.length == 0) {
            that.setData({
              ishaveChild: false
            })
          } else {
            that.setData({
              children: res.data,
              ishaveChild: true
            })
          }

        }
      })
    }
  },
  //跳转详情页
  Jumpdetail:function(event){
    //let str = JSON.stringify(event.currentTarget.dataset.children);
    var id=event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../bookdetail/bookdetail?id='+id,
      success:function(res){
        console.log(id);
      },fail:function(){
        
      }
    })
  },
  //跳转地图
  goToaddress:function(event){
    var that=this;
    var addressName = event.currentTarget.dataset.addressname;
    var latitude = event.currentTarget.dataset.latitude;
    var longitude = event.currentTarget.dataset.longitude;
    let plugin = requirePlugin('route-plan');
    let key = '4CQBZ-2QQ6F-NEIJX-JZY44-TKCSZ-N6BXP';  //使用在腾讯位置服务申请的key
    let referer = 'demo';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': addressName,
      'latitude': latitude,
      'longitude': longitude
    });
    wx.navigateTo({
      url: 'plugin://route-plan/route-plan?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const db = wx.cloud.database();
    db.collection('book').where({
      collegeId: '1'
    }).get({
      success: function (res) {
        //console.log(res.data);
        if (res.data.length == 0) {
          that.setData({
            ishaveChild: false
          })
        } else {
          that.setData({
            children: res.data,
            ishaveChild: true
          })
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    const db = wx.cloud.database();
    db.collection('book').where({
      collegeId:'1'
    }).get({
      success: function (res) {
        //console.log(res.data);
        if (res.data.length == 0) {
          that.setData({
            ishaveChild: false
          })
        } else {
          that.setData({
            children: res.data,
            ishaveChild: true
          })
        }
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var that = this;
    // const db = wx.cloud.database();
    // db.collection('book').where({
    //   collegeId: 'that.data.curIndex'
    // }).get({
    //   success: function (res) {
    //     //console.log(res.data);
    //     if (res.data.length == 0) {
    //       that.setData({
    //         ishaveChild: false
    //       })
    //     } else {
    //       that.setData({
    //         children: res.data,
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