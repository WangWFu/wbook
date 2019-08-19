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
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565803168629&di=8e60e5f1d57321fdfd473ecd3c10de63&imgtype=0&src=http%3A%2F%2Fs9.sinaimg.cn%2Fmiddle%2F9cc94970gc3247375b398%26690'
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
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564642746992&di=ba678a7b35808acceb7dbc01d721a568&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160824%2Fb274c8dee2204f7b8e9b273a98e92046_th.jpg'
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
        url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2868232624,1616554254&fm=27&gp=0.jpg'
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
  //跳转地图
  goToaddress: function (event) {
    var that = this;
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