// miniprogram/pages/publish/scancode/scancode.js
var app=getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0 ,
    avatarUrl: '',
    nickName: '',
    collegeId:'',
      title:'',
      details:'',
      author:'',
      imgSrc:'',
    price:'',
    collectionnum:0,
    integral: 0,
    _openid: '',
    objectArray: [
      {
        collegeId: 1,
        name: '哲学类'
      },
      {
        collegeId: 2,
        name: '经济类'
      },
      {
        collegeId: 3,
        name: '文学类'
      },
      {
        collegeId: 4,
        name: '艺术类'
      },
      {
        collegeId: 5,
        name: '工业技术类'
      },
      {
        collegeId: 6,
        name: '小说类'
      }
    ],
    objectIndex: 0,//默认显示位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var info = JSON.parse(options.info);
    var collegeId = options.collegeId;
   var that=this;
   that.setData({
     title: info.result.title,
     details: info.result.summary,
     author: info.result.author,
     imgSrc: info.result.pic,
     price:info.result.price,
     collegeId: collegeId
    //info:info
   })
    console.log(collegeId);
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
                    avatarUrl: res.data[0].avatarUrl,
                    nickName: res.data[0].nickName,
                    gender: res.data[0].gender,
                    _openid: res.data[0]._openid,
                    integral: res.data[0].integral,
                  })
                  //console.log(this.data.avatarUrl)
                }
              })
            }
          });
        }
      }
    })
  },
  //页面滑动
  onPageScroll: function (ev) {
    var _this = this;
    //当滚动的top值最大或者最小时，为什么要做这一步是由于在手机实测小程序的时候会发生滚动条回弹，所以为了解决回弹，设置默认最大最小值   
    if (ev.scrollTop <= 0) {
      ev.scrollTop = 0;
    } else if (ev.scrollTop > wx.getSystemInfoSync().windowHeight) {
      ev.scrollTop = wx.getSystemInfoSync().windowHeight;
    }
    //判断浏览器滚动条上下滚动   
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == wx.getSystemInfoSync().windowHeight) {
      //console.log('向下滚动');
    } else {
      //console.log('向上滚动');
    }
    //给scrollTop重新赋值    
    setTimeout(function () {
      _this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0)
  },
  // //选择器值
  // bindPickerChange2: function (e) {
  //   //console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     objectIndex: e.detail.value
  //   })
  // },
  upinfo:function(res){
    var that=this;
    var snum = that.data.integral + 5;
    var formData={
      title: that.data.title,
      details: that.data.details,
      author: that.data.author,
      sharauthor: that.data.nickName,
      avatarUrl: that.data.avatarUrl,
      imgSrc: that.data.imgSrc,
      collegeId: that.data.collegeId,
      num:1,
      collectionnum: that.data.collectionnum
    };
    db.collection("book").add({
        data: formData,
        success: function (res) {
          db.collection('user').where({
            _openid: that.data._openid
          }).get({
            success: function (res) {
              db.collection('user').doc(res.data[0]._id).update({
                data: {
                  integral: snum
                }, success: function (res) {
                  console.log(res);
                }
              })
              console.log(res.data[0]._id);
            }
          })
          wx.hideLoading();
          wx.switchTab({
            url: '../../index/index',
          })
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