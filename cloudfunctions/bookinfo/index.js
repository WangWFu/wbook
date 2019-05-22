// 云函数入口文件
//const cloud = require('wx-server-sdk')

//cloud.init()
//var rp = require('request-promise')
// 云函数入口函数
exports.main = async (event, context) => {
//   var res = rp(
//     'https://api.jisuapi.com/isbn/query?appkey=6a7677b4d64b629a&isbn='+event.isbn).then(html => {
//       return html;
//     }).catch(err => {
//       console.log(err)
//     })
// return res
console.log(event)
return event.isbn
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}