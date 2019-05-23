// miniprogram/pages/index/bookself/bookself.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateItems: [
      {
        cate_id: 1,
        cate_name: "哲学类",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '论语',
              image: "https://img3.doubanio.com/view/subject/l/public/s5804746.jpg"
            },
            {
              child_id: 2,
              name: '莎士比亚全集',
              image: "https://img1.doubanio.com/view/subject/l/public/s27202409.jpg"
            },
            {
              child_id: 3,
              name: '会饮篇',
              image: "https://img1.doubanio.com/view/subject/l/public/s3010179.jpg"
            },
            {
              child_id: 4,
              name: '百年孤独',
              image: "https://img3.doubanio.com/view/subject/l/public/s3143310.jpg"
            }
          ]
      },
      {
        cate_id: 2,
        cate_name: "经济类",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: 'C语言',
              image: "https://img3.doubanio.com/view/subject/l/public/s26387712.jpg"
            },
            {
              child_id: 2,
              name: 'Java',
              image: "https://img3.doubanio.com/view/subject/l/public/s7663093.jpg"
            },
            {
              child_id: 3,
              name: 'C++',
              image: "https://img3.doubanio.com/view/subject/l/public/s27023182.jpg"
            },
            {
              child_id: 4,
              name: 'PHP',
              image: "https://img3.doubanio.com/view/subject/l/public/s28310875.jpg"
            },
            {
              child_id: 5,
              name: '智能革命',
              image: "https://img3.doubanio.com/view/subject/l/public/s29446445.jpg"
            },
            {
              child_id: 6,
              name: '认识盈余',
              image: "https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=33dd77d4fc246b606f03ba268a917129/838ba61ea8d3fd1fcce08bbd3a4e251f94ca5f4f.jpg"
            },
            {
              child_id: 7,
              name: '人生的智慧',
              image: "https://img3.doubanio.com/view/subject/l/public/s4619775.jpg"
            },
            {
              child_id: 8,
              name: '我遇见了人类',
              image: "https://img3.doubanio.com/view/subject/l/public/s29424486.jpg"
            }
          ]
      },
      {
        cate_id: 3,
        cate_name: "文学类",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '围城',
              image: "https://img1.doubanio.com/view/subject/l/public/s11276847.jpg"
            },
            {
              child_id: 2,
              name: '城南旧事',
              image: "https://img1.doubanio.com/view/subject/l/public/s2654869.jpg"
            },
            {
              child_id: 3,
              name: '夏洛书屋',
              image: "https://img3.doubanio.com/view/subject/l/public/s28355541.jpg"
            },
            {
              child_id: 4,
              name: '小王子',
              image: "https://img3.doubanio.com/view/subject/l/public/s1103152.jpg"
            }
          ]
      },
      {
        cate_id: 4,
        cate_name: "艺术类",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 5,
        cate_name: "工业技术类",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 6,
        cate_name: "小说类",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 7,
        cate_name: "学习资料类",
        ishaveChild: false,
        children: []
      }
    ],
    curNav: 1,
    curIndex: 0
  },
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
    console.log(e.target.dataset.id);
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

  }
})