// miniprogram/pages/index/bookstation/bookstation.js
var util = require('../../../utils/utils.js');
const db = wx.cloud.database();
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    commentlist:[],
    imgArr: [],
    queryResult: [],
    tempImagePath: "",
    page: 1,
    pageSize: 20,
    hasMoreData: true,
    releaseFocus: false,
    releaseName:'',
    query:[],
    c:[],
    text:'',
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    _id:[],
    num:[]
  },
  Publish() {
    wx.navigateTo({
      url: './pushinfo/pushinfo'
    })
  },
  //评论
  onTapToComment:function(e){
    // var that = this;
    // var index = e.currentTarget.dataset.index;
    // console.log(index);
    // db.collection("postList").doc(index).get({
    //   success:function(res){
    //     console.log(res.data)
    //     that.setData({
    //       releaseName:res.data.author,
    //       _id:res.data._id,
    //       num: res.data.commentSize
    //     })
    //   }
    // })
    // that.setData({
    //   releaseFocus: true,
    // })
    wx.navigateTo({
      url: './comment/comment?id=' + e.currentTarget.dataset.index,
    })
  },
  //发送
  // sendcomment:function(e){
  //   var that=this;
  //   var fordata={
  //      userName:that.data.userInfo.nickName,
  //      avatarUrl: that.data.userInfo.avatarUrl,
  //      comment: that.data.text,
  //      postid:that.data._id,
  //   };
  //   db.collection('postcomment').add({
  //     data:fordata,
  //     success:function(res){
  //        console.log(res);
  //       var commentnum = that.data.num + 1;
  //       db.collection('postList').doc(that.data._id).update({
  //         data: {
  //           commentSize: commentnum
  //         }, success: function (res) {
  //           that.onShow()
  //         }
  //       })
  //     }
  //   })
   
  //   this.setData({
  //     //isInput: false,
  //     releaseFocus: false
  //   })

  // },


  //图片预览
  previewImg: function (e) {
    var that=this;
     console.log("e:" + e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    // db.collection("postList").doc(index).get({
    //   success: function (res) {
    //     console.log(res.data.imgsFileId)
    //     that.setData({
    //       // releaseName: res.data.author,
    //       // _id: res.data._id
    //       imgArr: res.data.imgsFileId
    //     })
    //   }
    // })
    // var arr=[],
    // var obj=Object.keys()
    var imgArr = that.data.queryResult[index].imgsFileId;
    console.log(imgArr)
    var imgs = that.data.imgArr;
    imgs.push(imgArr);
    console.log(imgs)
    wx.previewImage({
      current: imgArr,     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      //urls: imgs,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    });
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
  // //更新评论数
  // upcomsize(){
  //   var that=this;
  //   var commentnum=that.data.num+1;
  //   db.collection('postList').doc(that.data._id).update({
  //     data: {
  //       num: curnum
  //     },success:function(res){
       
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: util.formatTime(new Date())
    })
    //this.onQuery();
    this.uploadAvatar();
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
    var that = this;
    var pageSize = that.data.pageSize;
    var rs = that.data.queryResult;
    db.collection('postList').limit(pageSize).orderBy('date', 'desc').get({
      success: res => {
        console.log(res.data)
        this.setData({
          queryResult: res.data,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
    // db.collection('postcomment').get({
    //   success:function(res){
    //     console.log(res.data)
    //     var temData=[];
    //     for(var i=0;i<res.data.length;i++)
    //     {
    //       var tempobj={};
    //       tempobj.id = res.data[i].postid;
    //       temData.push(tempobj)
    //     }
    //     console.log(temData)
    //     // that.setData({
    //     //   queryResult: res.data
    //     // })
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