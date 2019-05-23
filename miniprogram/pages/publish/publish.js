// miniprogram/pages/publish/publish.js
var app=getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: [], //临时存放图片目录的空数组,
    collegeId: 0,
    avatarUrl:'',
    nickName:'',
    isImage: false,
    title:'',
    details:''
  },
  title:function(e){
    this.setData({
      title: e.detail.value
    })
  },
  details:function(e){
    this.setData({
      details: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.data.avatarUrl)
    console.log(options.collegeId);
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              const db = wx.cloud.database();
              db.collection('user').get({
                data: {
                  openid: getApp().globalData.openid
                }, success: function (res) {
                  console.log(res.data[0].avatarUrl);
                  that.setData({
                    avatarUrl: res.data[0].avatarUrl,
                    nickName: res.data[0].nickName,
                    gender: res.data[0].gender
                  })
                  //console.log(this.data.avatarUrl)
                }
              })
            }
          });
        }
      }
    })
      this.setData({
      collegeId: options.collegeId, //选中的学院的编号
    })
  },
  //选择本地图片
  chooseImg: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        // console.log(tempFilePaths[0])
        that.setData({
          imgSrc: filePath,
          isImage: true
        });
        const cloudPath = that.data.count + filePath.match(/\.[^.]+?$/)[0];
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            //console.log('[上传文件] 成功：', cloudPath, res)
            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  //发布
  formSubmit: function (e) {
    var that = this;
    wx.showLoading({
      title: '上传中loading...'
    });
    //上传信息
    var formData={
      title: that.data.title,
      details: that.data.details,
      author: that.data.nickName,
      avatarUrl:that.data.avatarUrl,
      collegeId: that.data.collegeId,
      imgSrc: new Array(app.globalData.fileID)
    };
    if (that.data.collegeId==1){
      db.collection('philosophybook').add({
        data: formData,
        success: function (res) {
          wx.hideLoading();
          wx.switchTab({
            url: '../index/index'
          });
        }
      })
    }
    if (that.data.collegeId == 2) {
      db.collection('Economicsbook').add({
        data: formData,
        success: function (res) {
          wx.hideLoading();
          wx.switchTab({
            url: '../index/index'
          });
        }
      })
    }
    if (that.data.collegeId == 3) {
      db.collection('literaturebook').add({
        data: formData,
        success: function (res) {
          wx.hideLoading();
          wx.switchTab({
            url: '../index/index'
          });
        }
      })
    }
    if (that.data.collegeId == 4) {
      db.collection('artbook').add({
        data: formData,
        success: function (res) {
          wx.hideLoading();
          wx.switchTab({
            url: '../index/index'
          });
        }
      })
    }
    if (that.data.collegeId == 5) {
      db.collection('Technologybook').add({
        data: formData,
        success: function (res) {
          wx.hideLoading();
          wx.switchTab({
            url: '../index/index'
          });
        }
      })
    }
    if (that.data.collegeId == 6) {
      db.collection('Novelbook').add({
        data: formData,
        success: function (res) {
          wx.hideLoading();
          wx.switchTab({
            url: '../index/index'
          });
        }
      })
    }
    if (that.data.collegeId == 7) {
      db.collection('Studybook').add({
        data: formData,
        success: function (res) {
          wx.hideLoading();
          wx.switchTab({
            url: '../index/index'
          });
        }
      })
    }
    },
    
  //预览图片
  perviewImg: function () {
    // console.log("====+++++")
    // wx.previewImage({
    //   urls: this.data.imgSrc
    // })
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