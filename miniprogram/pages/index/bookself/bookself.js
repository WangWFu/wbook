// miniprogram/pages/index/bookself/bookself.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishaveChild:false,
    cateItems: [
      {
        cate_id: 1,
        cate_name: "哲学类",
        //ishaveChild: true,
        children:
          [
            // {
            //   child_id: 1,
            //   title: '',
            //   imgSrc: ""
            // } 
          ]
      },
      {
        cate_id: 2,
        cate_name: "经济类",
        //ishaveChild: false,
        children:
          [
            // {
            //   child_id: 2,
            //   title: '',
            //   imgSrc: ""
            // } 
          ]
      },
      {
        cate_id: 3,
        cate_name: "文学类",
        //ishaveChild: true,
        children:
          [
            // {
            //   child_id: 3,
            //   title: '',
            //   imgSrc: ""
            // } 
          ]
      },
      {
        cate_id: 4,
        cate_name: "艺术类",
        //ishaveChild: true,
        children: [
          // {
          //   child_id: 4,
          //   title: '',
          //   imgSrc: ""
          // } 
        ]
      },
      {
        cate_id: 5,
        cate_name: "工业技术类",
        //ishaveChild: true,
        children: [
          // {
          //   child_id: 5,
          //   title: '',
          //   imgSrc: ""
          // } 
        ]
      },
      {
        cate_id: 6,
        cate_name: "小说类",
        //ishaveChild: true,
        children: [
          // {
          //   child_id: 6,
          //   title: '',
          //   imgSrc: ""
          // } 
        ]
      },
      {
        cate_id: 7,
        cate_name: "学习资料类",
        //ishaveChild: true,
        children: [
          // {
          //   child_id: 7,
          //   title: '',
          //   imgSrc: ""
          // } 
        ]
      }
    ],
    curNav: 1,
    curIndex: 0
  },
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
    //console.log(index);
   if(index==0){
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
    if (index==1){
      var that = this;
      const db = wx.cloud.database();
      db.collection('book').where({
        collegeId: '2'
      }).get({
        success: function (res) {
          console.log(res.data.length);
          if (res.data.length==0){
            that.setData({
              ishaveChild:false
            })
          }else{
            that.setData({
              children: res.data,
              ishaveChild: true
            })
          }
          

        }
      })
    }
    if (index == 2) {
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
    if (index == 3) {
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
    if (index == 4) {
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
    if (index == 5) {
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
    if (index == 6) {
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