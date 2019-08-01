// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'sql-435bf2',
  traceUser: true
})
 
const db=cloud.database()
//var rp = require('request-promise')
// 云函数入口函数
exports.main = async (event, context) => {
  var bookid = event.bookid;
  var collention_id = event.collention_id
  exports.main = async (event, context) => {
    try {
      return await db.collection('collection').where({
        // bookid: bookid,
        // collention_id: collention_id
        isBookFavorite:false
        }).remove()
      // }).update({
      //   data: {
      //     isBookFavorite: false,
      //   },
      // })
    } catch (e) {
      console.error(e)
    }
  }
console.log(event)

  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}