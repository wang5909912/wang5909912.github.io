var api = require('../../utils/api.js')
Page({
  data: {
    // image:[]
  },


  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'collection',
      success: function (res) {
        that.setData({
          image: res.data
        })
        console.log(res.data)
      }
    })
  },

  collectionfail: function (e) {
    var that = this;
    var newId = e.currentTarget.dataset.rowid;
    console.log(newId);
    wx.getStorage({
      key: 'collection',
      success: function (res) {
        var collection = res.data;
        for (var i = 0; i < collection.length; i++) {
          if (newId.row_id == collection[i].row_id) {
            collection.splice(i, 1);
          }
        }
        wx.setStorage({
          key: 'collection',
          data: collection,
          success: function (res) {
            // success
           console.log(collection);
            wx.redirectTo({
              url: '../collection/collection',
              success: function(res){
                // success
              }
            })
          }
        })

      }
    })

  },
 
})