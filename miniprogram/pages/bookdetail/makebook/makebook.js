// miniprogram/pages/bookdetail/makebook/makebook.js
const db=wx.cloud.database();
var app=getApp();
var util = require('../../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     bookid:'',
     makeday:'',
     stopday:'',
     num:'',
     day:'',
    avatarUrl:'',
    details:'',
    imgSrc:[],
    sharauthor:'',
    title:'',
    _id:'',
    _openid:''
  },
  bindDateChange:function(e){
    this.setData({
      day: e.detail.value
    })
  },
  send:function(){
    var that=this;
    //console.log(123)
    var formdata={
      num: that.data.num,
      avatarUrl: that.data.avatarUrl,
      details: that.data.details,
      imgSrc: that.data.imgSrc,
      sharauthor: that.data.sharauthor,
      title: that.data.title,
      _id: that.data._id,
      _openid: that.data._openid,
      date: that.data.day
    };
    db.collection('makebook').add({
      data:formdata,
      success:function(res){
       console.log(res)
      }
    })
  },
   //获取时间
   datetime:function(dat){
     var that=this;
     var d = Date.parse(that.data.makeday);
     d = d / 1000;
     console.log(d);
     var n = d * 1000;
     var date = new Date(n);
     //年
     var Y = date.getFullYear();
     //月
     var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
     //日
     var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
     console.log(Y+M+D);
     var nowday = Y + '-' + M + '-' + D;
     console.log(nowday)
     var tomorrow_timetamp = d + 168 * 60 * 60;
     //加一天的时间：
     var n_to = tomorrow_timetamp * 1000;
     var tomorrow_date = new Date(n_to);
     //加一天后的年份
     var Y_tomorrow = tomorrow_date.getFullYear();
     //加一天后的月份
     var M_tomorrow = (tomorrow_date.getMonth() + 1 < 10 ? '0' + (tomorrow_date.getMonth() + 1) : tomorrow_date.getMonth() + 1);
     //加一天后的日期
     var D_tomorrow = tomorrow_date.getDate() < 10 ? '0' + tomorrow_date.getDate() : tomorrow_date.getDate();
     var datet = Y_tomorrow + '-' + M_tomorrow + '-' + D_tomorrow;
     console.log(Y_tomorrow + M_tomorrow + D_tomorrow);
     console.log(datet);
     //转换为时间格式字符串
     console.log(date.toLocaleDateString());
     console.log(tomorrow_date.toLocaleDateString());
     that.setData({
       //makeday: nowday,
       stopday: datet
     })
   },
  datetime1: function (dat) {
    var that = this;
    var d = Date.parse(new Date());
    d = d / 1000;
    console.log(d);
    var n = d * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    console.log(Y + M + D);
    var nowday = Y + '-' + M + '-' + D;
    console.log(nowday)
    var tomorrow_timetamp = d + 168 * 60 * 60;
    //加一天的时间：
    var n_to = tomorrow_timetamp * 1000;
    var tomorrow_date = new Date(n_to);
    //加一天后的年份
    var Y_tomorrow = tomorrow_date.getFullYear();
    //加一天后的月份
    var M_tomorrow = (tomorrow_date.getMonth() + 1 < 10 ? '0' + (tomorrow_date.getMonth() + 1) : tomorrow_date.getMonth() + 1);
    //加一天后的日期
    var D_tomorrow = tomorrow_date.getDate() < 10 ? '0' + tomorrow_date.getDate() : tomorrow_date.getDate();
    var datet = Y_tomorrow + '-' + M_tomorrow + '-' + D_tomorrow;
    console.log(Y_tomorrow + M_tomorrow + D_tomorrow);
    console.log(datet);
    //转换为时间格式字符串
    console.log(date.toLocaleDateString());
    console.log(tomorrow_date.toLocaleDateString());
    that.setData({
      makeday: nowday,
      stopday: datet
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var id=options.id;
    that.setData({
      bookid:id
    })
   
    db.collection('book').doc(id).get({
      success: function (res) {
        console.log(res.data.num);
        that.setData({
          num:res.data.num,
          //date: res.data.date,
          avatarUrl: res.data.avatarUrl,
          details: res.data.details,
          imgSrc: res.data.imgSrc,
          sharauthor: res.data.sharauthor,
          title: res.data.title,
          _id: res.data._id,
          _openid: res.data._openid
        })
        if (res.data.num==0)
        {
          db.collection('borrowbook').where({
            id:that.data.id
          }).get({
            success: function (res) {
              console.log(res.data[0].deadDay);
              
              that.setData({
                makeday:res.data[0].deadDay,
              })
              this.datetime(res.data[0].deadDay);
            }
          })
        }else{
        
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
    var that=this;
      db.collection('book').doc(that.data.bookid).get({
        success:function(res){
          console.log(res);
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