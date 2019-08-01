// miniprogram/pages/index/bookstation/comment/comment.js
var util = require('../../../../utils/utils.js');
const db = wx.cloud.database();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    commentlist: [],
    imgArr: [],
    queryResult: [],
    tempImagePath: "",
    page: 1,
    pageSize: 20,
    hasMoreData: false,
    releaseFocus: false,
    releaseName: '',
    query: [],
    c: [],
    text: '',
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    _id: [],
    num: [],
    postid:''
  },
  incom: function (e) {
    this.setData({
      text: e.detail.value
    })
  },
  //评论
  onTapToComment: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    db.collection("postList").doc(index).get({
      success: function (res) {
        console.log(res.data)
        that.setData({
          releaseName: res.data.author,
          _id: res.data._id,
          num: res.data.commentSize
        })
      }
    })
    that.setData({
      releaseFocus: true,
      //hasMoreData:true
    })
  },
  //发送
  sendcomment: function (e) {
    var that = this;
    var fordata = {
      userName: that.data.userInfo.nickName,
      avatarUrl: that.data.userInfo.avatarUrl,
      comment: that.data.text,
      postid: that.data._id,
    };
    db.collection('postcomment').add({
      data: fordata,
      success: function (res) {
        console.log(res);
        var commentnum = that.data.num + 1;
        db.collection('postList').doc(that.data._id).update({
          data: {
            commentSize: commentnum
          }, success: function (res) {
           
          }
        })
      }
    })
    this.setData({
      text:'',
      //isInput: false,
      releaseFocus: false,
     // hasMoreData:false
    })
    //that.onShow()
    db.collection('postcomment').where({
      postid: that.data.postid
    }).get({
      success: function (res) {
        console.log(res)
        that.setData({
          query: res.data,
        })
      }
    })
  },

  //获取用户信息
  uploadAvatar() {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        });

      }
    });
  },
  //更新评论数
  upcomsize() {
    var that = this;
    var commentnum = that.data.num + 1;
    db.collection('postList').doc(that.data._id).update({
      data: {
        num: curnum
      }, success: function (res) {
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    var that=this;
    this.setData({
      date: util.formatTime(new Date())
    })
    that.setData({
      postid:id
    })
    this.uploadAvatar();
    db.collection('postList').where({
      _id:id
    }).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          queryResult: res.data,
        })
      }
    })
    db.collection('postcomment').where({
      postid: id
    }).get({
      success: function (res) {
        console.log(res)
        that.setData({
          query: res.data,
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
    //this.onQuery();
    // var that = this;
    
    // db.collection('postcomment').where({
    //   postid: postid
    // }).get({
    //   success: function (res) {
    //     console.log(res)
    //     that.setData({
    //       query: res.data,
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