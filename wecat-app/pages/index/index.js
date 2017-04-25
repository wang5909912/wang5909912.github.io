var api = require('../../utils/api.js')
var app = getApp()
Page({

  data: {

    winWidth: 0,
    winHeight: 0,

    currentTab: 0,
    systemInfo: {},
    _api: {},
    navbar: ["推荐", "新作", "人物"],
    currentNavbar: '0',
    swipers: [],
    list: [],
    hot_last_id: 0,
    latest_list: [],
    latest_last_id: 0
  },

  //onLoad  

  onLoad: function () {
    var that = this;

    app.getSystemInfo(function (res) {
      that.setData({
        systemInfo: res
      })
    })

    that.setData({
      _api: api
    })
    // console.log(this);

    this.getSwipers()
    this.pullUpLoad()

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

    //onLoad从服务器获取数据
    wx.request({
      url: 'http://localhost:8889/login.do',
      method: 'GET',
      success: function (res) {
        // console.log("王瑜");
        // console.log(res);
        that.setData({
          wecat: res.data
        })
      }
    });
    wx.getStorage({
      key: 'collection',
      success: function (res) {
        // success

      }
    })

  },



  /**
   *
   */
  getSwipers() {
    api.get(api.SWIPERS)
      .then(res => {
        this.setData({
          swipers: res.data.ads
        })
      })
  },

  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentNavbar: e.detail.current });

  },
  /**
   * 切换 navbar
   */
  swichNav(e) {
    // console.log(111122223333);
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
    // console.log(e.currentTarget.dataset.idx);
    // console.log(this.data.latest_list.length);
    if (e.currentTarget.dataset.idx == 1 && this.data.latest_list.length == 0) {
      this.pullUpLoadLatest()
    }
  },

  /**
    * 点击跳转详情页
    */
  onItemClick(e) {
    // console.log(targetUrl);
    var targetUrl = "../work-details/work-details";
    if (e.currentTarget.dataset.rowId != null)
      targetUrl = targetUrl + '?rowId=' + e.currentTarget.dataset.rowId
    wx.navigateTo({
      url: targetUrl
    })
  },




  pullUpLoad() {   //推荐
    wx.showNavigationBarLoading()
    api.get(api.HOST_IOS + api.HOT + '?last_id=' + this.data.hot_last_id)
      .then(res => {
        // console.log(res.data);
        this.setData({
          list: this.data.list.concat(res.data.list),
          hot_last_id: res.data.last_id
        })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      })
  },


  /**
     * [最新]上拉刷新-新作
     */
  pullUpLoadLatest() {
    wx.showNavigationBarLoading()
    api.get(api.HOST_IOS + api.LATEST + '?last_id=' + this.data.latest_last_id)
      .then(res => {
        this.setData({
          latest_list: this.data.latest_list.concat(res.data.list),
          latest_last_id: res.data.last_id
        })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      })
  },

  //点击收藏
  addlike: function (e) {
    // console.log("wangyu");
    // console.log(this);
    var that = this;
    var num = e.currentTarget.dataset.rowid;
    // console.log(num);


    wx.getStorage({
      key: 'collection',
      success: function (res) {
        // success
        var collection = res.data;

        collection.push(num)
        wx.setStorage({
          key: 'collection',
          data: collection,
          success: function (res) {
            // success
            console.log(collection);
          }
        })

      }

    })
  }
})