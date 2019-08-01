const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561529023886&di=78a7524c7fe8621cf44dc5caea4c0152&imgtype=0&src=http%3A%2F%2Fds.devstore.cn%2F20150725%2F1437810946564%2F1.jpeg'
    }, {
      id: 1,
      type: 'image',
      url: 'http://5b0988e595225.cdn.sohucs.com/images/20180111/dd4b96512c2040d0b2240a999eacbecc.jpeg'
    }, {
      id: 2,
      type: 'image',
      url: 'http://img2.imgtn.bdimg.com/it/u=1003354486,4072970882&fm=26&gp=0.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'http://s3.sinaimg.cn/middle/6574f438h7a05d1823b42&690'
    }, {
      id: 4,
      type: 'image',
      url: 'http://ci.xiaohongshu.com/58d8c3ab-ac59-45cc-aee7-a45b85c3c513@r_750w_750h_ss1.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'http://img4.imgtn.bdimg.com/it/u=1296015282,2899001422&fm=26&gp=0.jpg'
    }, {
      id: 6,
      type: 'image',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561528998622&di=4df219e616972fcb0af2258b7c584fd7&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F10%2F09%2F0257f93e08845c1.jpg'
    }],
    text:'',
    word:'',
    list:[]
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      text: e.detail.value
    })
  },
  searcher:function(e){
    var that = this;
    var content = that.data.text;
    if (content) {
      db.collection('book').where({
        title: content,
      }).get({
        success: function (res) {
          console.log(res.data)
          if (res.data.length == 0) {
            wx.showToast({
              title: '没有您要查询的书籍,您可以选择发布想看的书籍',
              icon: 'none'
            })
            that.setData({
              word: ''
            })
          } else {
            that.setData({
              word: ''
            })
            let str = JSON.stringify(res.data);
            wx.navigateTo({
              url: 'searchshow/searchshow?data=' + str,
            })
            console.log(str)
          }
        }
      })
    } else {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none',
        duration: 1500
      })
    }
  },
  goSearch:function(e){
    var that=this;
    var content = e.detail.value;
    if(content){
      db.collection('book').where({
        title:content,
      }).get({
        success:function(res){
          console.log(res.data)
          if(res.data.length==0){
            wx.showToast({
              title: '没有您要查询的书籍,您可以选择发布想看的书籍',
              icon:'none'
            })
            that.setData({
              word: ''
            })
          }else{
            that.setData({
              word:''
            })
            let str = JSON.stringify(res.data);
            wx.navigateTo({
              url: 'searchshow/searchshow?data='+str,
            })
            console.log(str)
          }
        }
      })
    }else{
      wx.showToast({
        title: '输入不能为空',
        icon:'none',
        duration:1500
      })
    }
  },
  Jumpdetail: function (event) {
    //let str = JSON.stringify(event.currentTarget.dataset.children);
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../bookdetail/bookdetail?id=' + id,
      success: function (res) {
        console.log(id);
      }, fail: function () {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var list=that.data.list
     db.collection('book').where({
       collectionnum:_.gt(0)
     }).get({
       success:function(res){
         that.setData({
           list:res.data
         })
         console.log(res)
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
    var that = this;
    var list = that.data.list
    db.collection('book').where({
      collectionnum: _.gt(0)
    }).get({
      success: function (res) {
        that.setData({
          list: res.data
        })
        console.log(res)
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
    
  },
  Publish() {
    wx.navigateTo({
      url: '../bookpush/bookpush'
    })
  },
})