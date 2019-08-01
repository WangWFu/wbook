// miniprogram/pages/bookdetail/bookdetail.js
var app=getApp();
const db=wx.cloud.database();
const _ = db.command;
var util=require('../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'',
    imgSrc: [], //临时存放图片目录的空数组,
    collegeId: '',
    avatarUrl: '',
    nickName: '',
    title: '',
    details: '',
    borrowDay:'',
    deadDay:'',
    _id:'',
    selected:'',
    bookDetail: {},
    //showLoading: true,
    showContent: false,
    isBookFavorite: '',
    qtype: '',
    //id: '',
    similarBookList: [],
    bookCanshareList: [],
    comment:[],
    inputText:'',
    comment_id:'',
    comment_user_name:'',
    comment_user_avatar:'',
    comment_time:'',
    comment_text:'',
    wr:'可借书',
    isnum:'',
    clbookid:'',
    collid:'',
    remoney:''
  },
  borrowbook:function(e){
    var that=this;
    var curnum = that.data.bookDetail[0].num-1;
    var formdata={
      imgSrc: that.data.imgSrc, //临时存放图片目录的空数组,
      collegeId: that.data.collegeId,
      avatarUrl: that.data.avatarUrl,
      nickName: that.data.nickName,
      title: that.data.title,
      details: that.data.details,
      borrowDay: that.data.borrowDay,
      deadDay: that.data.deadDay,
      id:that.data._id,
      selected: that.data.selected
    }
    if(that.data.remoney==0){
      wx.showModal({
        title: '提示',
        content: '您还未支付押金，请先去支付',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../money/money',
            })
          }
          else if (res.cancel){
            console.log('用户点击取消')
          }
          }
      })
    
    }else{
      if (that.data.bookDetail[0].num == 0) {
        wx.showToast({
          title: '当前书籍已被借阅,请下次借阅',
          icon: 'none',
          duration: 2000
        })
        console.log(that.data.bookDetail[0])
      } else {
        wx.showModal({
          title: '提示',
          content: '确定要借这本书吗',
          success(res) {
            if (res.confirm) {
              db.collection('book').doc(that.data.id).update({
                data: {
                  num: curnum
                },
                success: function (res) {
                  that.setData({
                    wr: '不可借书'
                  })
                  wx.showToast({
                    title: '您已借书成功，请尽快到借书点取书',
                    icon: 'none',
                    duration: 2000
                  })
                }
              })
              db.collection('borrowbook').add({
                data: formdata,
                success: function (res) {
                  console.log(res);
                }
              })

              //console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
    
    
  },
  //评论内容
  title: function (e) {
    this.setData({
      comment_text: e.detail.value
    })
  },
  //评论
  onBindConfirm:function(e){
    var that=this;
    //var comment_text=e.detail.value;
    var comment={
      //content:that.data.content,
      bookid:that.data._id,
      comment_id: that.data.comment_id,
      comment_user_name: that.data.comment_user_name,
      comment_user_avatar: that.data.comment_user_avatar,
      comment_time: that.data.borrowDay ,
      comment_text: that.data.comment_text 
    }
    db.collection('comment').add({
      data:comment,
      success:function(res){
        //console.log(res);
        that.onShow()
      }
    })
    that.setData({
      inputText: '',
    })
    //获取评论
    db.collection('comment').where({
      bookid: that.data._id
    }).get({
      success: function (res) {
        console.log(res)
        that.setData({
          comment: res.data
        })
      }
    })
  },

  // //收藏
  managebook:function(){
    var n=3;
    var that=this;
    var collectionnum = that.data.bookDetail[0].collectionnum +1;
    var collectionsnum=that.data.bookDetail[0].collectionnum-1;
    var formdata={
      bookid: that.data._id,
      collention_id: that.data.comment_id,
      isBookFavorite:true,
      imgSrc: that.data.imgSrc,
      sharenickName: that.data.nickName,
      title: that.data.title,
      details: that.data.details,
    }
    db.collection('collectionlist').where({
      bookid: that.data._id,
      collention_id: that.data.comment_id
    }).get({
      success: function (res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
      that.setData({
        clbookid: res.data[0].bookid,
        collid: res.data[0].collention_id
      })
      }
    })
    if (that.data.isBookFavorite) {
     wx.showModal({
       title: '提示',
       content: '确定要取消收藏吗',
       success(res){
         if (res.confirm){
         
           db.collection('collectionlist').where({
             bookid: that.data._id,
             collention_id: that.data.comment_id
           }).get({
               success: function (res) {
                 // res.data 是包含以上定义的两条记录的数组
                 console.log(res.data[0]._id)
                //  db.collection('collectionlist').doc(res.data[0]._id).update({
                //    data: {
                //      //collectionnum: collectionnum
                //      //t: n,
                //      isBookFavorite:false
                //    },
                //    success: function (res) {
                //      console.log(res)
                //      that.setData({
                //        isBookFavorite: false
                //      })
                //    }
                //  })
                 db.collection('collectionlist').doc(res.data[0]._id).remove({
                   success:function(res){
                     that.setData({
                       isBookFavorite: false
                     })
                     console.log(res);
                   }
                 })
               }
             })
           db.collection('book').doc(that.data.id).update({
             data: {
               collectionnum: collectionsnum
             },
             success: function (res) {

             }
           })
           console.log('确定')
         } else if (res.cancel) {
           console.log('用户点击取消')
         }
       }
     })
    }else{
      
      db.collection('collectionlist').add({
        data: formdata,
        success: function (res) {
          console.log(res);
          that.setData({
            isBookFavorite:true
          })
        }
      })
      db.collection('book').doc(that.data.id).update({
        data: {
          collectionnum: collectionnum
        },
        success: function (res) {
    
        }
      })
     
    }
   
  },

  // //预约
  // makebook:function(e){
  //   var that=this;
  //   wx.navigateTo({
  //     url: './makebook/makebook?id=' + e.currentTarget.dataset.id,
  //   })
  //   console.log(e.currentTarget.dataset.id)
  //   // db.collection('makebook').add({
    
  //   // })
  //   // if (that.data.bookDetail[0].num != 0)
  //   // {
  //   //    wx.showToast({
  //   //      title: '当前书籍还未被借阅,您可直接借阅',
  //   //    })
  //   // }

  //   //that.bindDateChange();
  // },
  // bindDateChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     date: e.detail.value
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that=this;
   
    // var date=util.formatTime(new Date());
    // console.log(date);
    var date = new Date();
    var borrowDay = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    console.log(borrowDay);
    date.setDate(date.getDate() + 7);//获取七天后的日期
    var deadDay = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    console.log(deadDay);
    //console.log(id);
    db.collection('book').where({
      _id:id
    }).get({
      success: function (res) {
        console.log(res.data);
        that.setData({
          bookDetail: res.data,
          imgSrc: res.data[0].imgSrc, //临时存放图片目录的空数组,
          collegeId: res.data[0].collegeId,
          avatarUrl: res.data[0].avatarUrl,
          nickName: res.data[0].sharauthor,
          title: res.data[0].title,
          details: res.data[0].details,
          openid: res.data[0]._openid,
          _id:res.data[0]._id,
          isnum:res.data[0].num
        })
        //console.log(res.data[0].num)
        if (res.data[0].num == 0) {
          that.setData({
            wr: '不可借书'
          })
        }
      }
    })
    //获取借书日期和归还日期
    that.setData({
      id:id,
      borrowDay: borrowDay,
      deadDay: deadDay,
    })
   
    //获取openid
    db.collection('user').get({
      data: {
        openid: app.globalData.openid
      }, success: function (res) {
        console.log(res.data);
        that.setData({
          comment_user_avatar: res.data[0].avatarUrl,
          comment_user_name: res.data[0].nickName,
          //gender: res.data[0].gender,
          comment_id:res.data[0]._openid
        })
        //getApp().globalData.userInfo = res.data;
      }
    })
    console.log(options.id)
    //获取评论
    db.collection('comment').where({
      bookid: options.id
    }).get({
      success: function (res) {
        console.log(res)
        that.setData({
          comment: res.data
        })
      }
    })
    // //获取收藏状态
    // db.collection('collectionlist').where({
    //   bookid: options.id,
    //   collention_id: that.data.comment_id
    // }).get({
    //   success:function(res){
    //     console.log(res.data[0].isBookFavorite);
    //     that.setData({
    //       isBookFavorite: res.data[0].isBookFavorite
    //     })
    //   }
    // })
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
              db.collection('user').where({
                _openid: getApp().globalData.openid
              }).get({
               success: function (res) {
                  console.log(res.data[0]._openid);
                  //获取收藏状态
                  db.collection('collectionlist').where({
                    bookid: options.id,
                    collention_id: res.data[0]._openid
                  }).get({
                    success: function (res) {
                      console.log(res.data[0].isBookFavorite);
                      that.setData({
                        isBookFavorite: res.data[0].isBookFavorite
                      })
                    }
                  })

                  //获取openid
                  db.collection('user').get({
                    data: {
                      _openid: res.data[0]._openid
                    }, success: function (res) {
                      console.log(res.data);
                      that.setData({
                        comment_user_avatar: res.data[0].avatarUrl,
                        comment_user_name: res.data[0].nickName,
                        //gender: res.data[0].gender,
                        comment_id: res.data[0]._openid,
                        remoney: res.data[0].remoney
                      })
                      //getApp().globalData.userInfo = res.data;
                    }
                  })
            
                }
              })
            }
          });
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
    //获取评论
    db.collection('comment').where({
      bookid: that.data.id
    }).get({
      success: function (res) {
        console.log(res)
        that.setData({
          comment: res.data
        })
      }
    })
    // //获取收藏状态
    // db.collection('collectionlist').where({
    //   bookid: that.data.id,
    //   collention_id: app.globalData.openid
    // }).get({
    //   success: function (res) {
    //     console.log(res.data[0].isBookFavorite);
    //     that.setData({
    //       isBookFavorite: res.data[0].isBookFavorite
    //     })
    //   }
    // })
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
              db.collection('user').where({
                _openid: getApp().globalData.openid
              }).get({
                success: function (res) {
                  console.log(res.data[0]._openid);
                  //获取openid
                  db.collection('user').get({
                    data: {
                      _openid: res.data[0]._openid
                    }, success: function (res) {
                      console.log(res.data);
                      that.setData({
                        comment_user_avatar: res.data[0].avatarUrl,
                        comment_user_name: res.data[0].nickName,
                        //gender: res.data[0].gender,
                        comment_id: res.data[0]._openid,
                        remoney:res.data[0].remoney
                      })
                      //getApp().globalData.userInfo = res.data;
                    }
                  })
                  // that.setData({
                  //   avatarUrl: res.data[0].avatarUrl,
                  //   nickName: res.data[0].nickName,
                  //   gender: res.data[0].gender,
                  //   remoney: res.data[0].remoney
                  // })
                  //getApp().globalData.userInfo = res.data;
                }
              })
            }
          });
        }
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