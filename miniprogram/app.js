//app.js
App({
  onLaunch: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              //that.queryUsreInfo();
              //用户已经授权过
              // wx.navigateBack({
              //   delta: 1
              // })
              const db = wx.cloud.database();
              db.collection('user').get({
                data: {
                  openid: getApp().globalData.openid
                }, success: function (res) {
                  console.log(res.data);
                  that.setData({
                    avatarUrl: res.data[0].avatarUrl,
                    nickName: res.data[0].nickName,
                    gender: res.data[0].gender

                  })
                  getApp().globalData.userInfo = res.data;
                }
              })
            }
          });
        }
      }
    })
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      userInfo: null,
    }
  }
})
