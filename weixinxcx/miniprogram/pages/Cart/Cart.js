const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    checkeds: false,
    checked: [],
    list: [],
    price: 0,
    sum: [],
    openid: ""
  },
  // goDetails: function (event) {
  //   //1:添加参数event事件对象
  //   //2:依据event获取自定义属性id
  //   var id = event.currentTarget.dataset.id;
  //   console.log(id);
  //   //3:跳转pages/home00/home00参数id
  //   var url = "/pages/details/details?id=" + id
  //   wx.navigateTo({
  //     url: url,
  //   })
  // },
  onChanges(event) {
    var a = []; var b = [];
    if (this.data.checkeds == false) {
      for (var i = 0; i < this.data.list.length; i++) {
        a.push(this.data.list[i]._id);
      }
      this.setData({
        checked: a
      });
      this.setData({
        checkeds: true
      });
      var price = 0;
      db.collection("cart")
        .where({
          _openid: wx.getStorageSync('openid')
        })
        .get()
        .then(res => {
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            price += res.data[i].price * res.data[i].sum * 100
          }
          this.setData({
            price: price
          });
        }).catch(err => {
          console.log(err)
        })
    } else {
      this.setData({
        checked: b
      });
      this.setData({
        checkeds: false
      });
      this.setData({
        price: 0
      });
    }
  },
  onChange(event) {
    console.log(event.detail)
    this.setData({
      checked: event.detail
    });
    var price = 0;
    if (this.data.checked.length == 0) {
      this.setData({
        price: 0
      })
    }
    for (var i = 0; i < this.data.checked.length; i++) {
      console.log(i)
      console.log(this.data.checked[i])
      db.collection("cart")
        .where({
          _id: this.data.checked[i]
        })
        .get()
        .then(res => {
          price += res.data[0].price * res.data[0].sum * 100
          this.setData({
            price: price
          })
        })
        .catch(err => {
          console.log(err);
        })
    }
    if (this.data.checked.length == this.data.list.length) {
      this.setData({
        checkeds: true
      });
    } else {
      this.setData({
        checkeds: false
      });
    }
  },
  onChangesum(event) {
    console.log(event.target.dataset.id);
    db.collection("cart")
      .doc(event.target.dataset.id)
      .update({
        data: {
          sum: event.detail
        }
      })
      .then(res => {
        console.log(res);
        var price = 0;
        for (var i = 0; i < this.data.checked.length; i++) {
          console.log(i)
          console.log(this.data.checked[i])
          db.collection("cart")
            .where({
              _id: this.data.checked[i]
            })
            .get()
            .then(res => {
              price += res.data[0].price * res.data[0].sum * 100
              this.setData({
                price: price
              })
            })
            .catch(err => {
              console.log(err);
            })
        }
      })
      .catch(err => {
        console.log(err);
      })
  },
  sel: function () {
    this.data.openid = wx.getStorageSync('useid')
    console.log(this.data.openid)
    db.collection("cart")
      .where({
        _openid: this.data.openid
      })
      .get()
      .then(res => {
        //console.log(res.data);
        this.setData({
          list: res.data
        })
        if (res.data.length == 0) {
          this.setData({
            show: true
          })
        } else {
          this.setData({
            show: false
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
  },
  guangguang: function () {
    wx.switchTab({
      url: "/pages/header/header"
    })
  },
  onSubmit: function () {
    if (this.data.checked.length == 0) {
      wx.showToast({
        title: '您还未勾选商品',
        icon: 'none',
        duration: 2000
      })
    } else {
      var a = []
      for (var i = 0; i < this.data.checked.length; i++) {
        //console.log(this.data.checked[i]);
        a.push(this.data.checked[i])
      }
      wx.navigateTo({
        url: "/pages/settlement/settlement?cart_id=" + a
      })
    }
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    /*wx.getStorage({
      key: 'openid',
      success: (res) => {
        this.setData({
          openid: res.data
        })
      },
    })*/

    //console.log(this.data.openid)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.sel();
    /*wx.getStorage({
      key: 'openid',
      success: (res) => {
        this.setData({
          openid: res.data
        })
      },
    })*/
    //console.log(this.data.openid)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.sel();
    /*wx.getStorage({
      key: 'openid',
      success: (res) => {
        this.setData({
          openid: res.data
        })
      },
    })*/

    //console.log(this.data.openid)
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