// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  map: function () {
    wx.openLocation({
      latitude: 28.176783,
      longitude: 113.029007,
      name: "长沙市长沙市雨花区万家丽中路358号",
      scale: 28,
    })
  },
  phone: function () {
    wx.makePhoneCall({
      phoneNumber: '15207394594' //仅为示例，并非真实的电话号码
    })
  },
  status0: function () {
    wx.navigateTo({
      url: "/pages/order0/order0?active=" + 0,
    })
  },
  status1: function () {
    wx.navigateTo({
      url: "/pages/order0/order0?active=" + 1,
    })
  },
  status2: function () {
    wx.navigateTo({
      url: "/pages/order0/order0?active=" + 2,
    })
  },
  status3: function () {
    wx.navigateTo({
      url: "/pages/order0/order0?active=" + 3,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 查看是否授权
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       console.log(res.authSetting['scope.userInfo']);
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }else{
    //       console.log(res.userInfo)
    //     }
    //   }
    // })
  },
  // bindGetUserInfo(e) {
  //   console.log(e.detail.userInfo);
  //   if (e.detail.userInfo) {
  //     //用户按了允许授权按钮
  //     console.log(1);
  //     wx.login({
  //       success: function (res) {
  //         console.log(res.code);
  //         const code = res.code
  //         const appid = "wx7bb5c5df45c1ca09";
  //         const secret = "2da7fa88337664fb769fb22778d0bb2d";
  //         const url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + code + "&grant_type=authorization_code";
  //         wx.request({
  //           url: url,
  //           success(res) {
  //             const data = res.data
  //             const openid = res.data.openid;
  //             console.log(data);
  //             wx.setStorage({
  //               key: 'openid',
  //               data: openid
  //             })
  //             wx.setStorageSync('useid',openid)

  //           }
  //         })
  //       }
  //     })
  //   } else {
  //     //用户按了拒绝按钮
  //     console.log(0);
  //   }
  // },

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