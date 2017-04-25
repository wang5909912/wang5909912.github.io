// pages/introduce/introduce.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(options);
    var that=this;
    wx.request({
      url: 'http://localhost:8889/login.do',
      data: {
        id:options.id
      },
      method: 'GET', 
      success: function(res){
        console.log(res);
        console.log("wangyuwangyu")
        that.setData({
          item:res.data[0]
        })
      }
    })
  },
 



})