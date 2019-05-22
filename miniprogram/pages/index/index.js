const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  textinput: function (e) {
    this.setData({
      text: e.detail.value
    })
  },
  searcher:function(){
    var content = this.data.text
    db.collection('book').where({
      content:content ,
    }).get({
      success(res) {
        console.log(res.data.length);
        // that.setData({
        //   _content: res.data[0].content
        // })
        if (res.data.length==1) {
          wx.navigateTo({
            url: '../bookdetail/bookdetail',
          })
        }
        if (res.data.length==0){
           wx.showToast({
             icon:'none',
             title: '没有您想查询的书籍',
           })
        }
      },
      // fail: err => {
      //   wx.showToast({
      //     icon: 'none',
      //     title: '查询记录失败'
      //   })
      // }
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    
  },
  Publish() {
    wx.navigateTo({
      url: '../bookshare/bookshare'
    })
  },
})