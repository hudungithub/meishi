// pages/settlement/settlement.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    phone: "",
    address: "",
    beizhu: "",
    list: [],
    sum: 0,
    good_id: ""
  },
  zhifu: function () {
    if (this.data.name == "") {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.address == "") {
      wx.showToast({
        title: '地址不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (!/^1(3|4|5|7|8)\d{9}$/.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000
      })
    } else {
      console.log(this.data.list)
      for (var i = 0; i < this.data.list.length; i++) {
        console.log(this.data.list)
        console.log(this.data.list[i].sum);
        var price = this.data.list[i].price * this.data.list[i].sum;
        if (this.data.list[i].sum == undefined) {
          var price = this.data.list[i].price * this.data.sum;
        }
        var sum = this.data.list[i].sum;
        if (this.data.list[i].sum == undefined) {
          var sum = this.data.sum
        }
        var good_id = this.data.list[i].good_id;
        if (this.data.list[i].good_id == undefined) {
          var good_id = this.data.good_id
        }
        db.collection("zc_order")
          .add({
            data: {
              good_id: good_id,
              title: this.data.list[i].title,
              price: price,
              name: this.data.name,
              phone: this.data.phone,
              adress: this.data.adress,
              beizhu: this.data.beizhu,
              sum: sum,
              status: 1,
              img: this.data.list[i].img
            }
          })
          .then(res => {
            console.log(res);
            for (var i = 0; i < this.data.list.length; i++) {
              console.log(this.data.list[i]._id)
              db.collection("zc_cart")
                .doc(this.data.list[i]._id)
                .remove({
                  success: function (res) {
                    console.log(res)
                  }
                })
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })
      wx.switchTab({
        url: '/pages/my/my'
      })
    }
  },
  name: function (event) {
    this.setData({
      name: event.detail.value
    })
  },
  phone: function (event) {
    this.setData({
      phone: event.detail.value
    })
  },
  address: function (event) {
    this.setData({
      address: event.detail.value
    })
  },
  beizhu: function (event) {
    this.setData({
      beizhu: event.detail.value
    })
  },
  sel: function (id) {
    db.collection("zc_goodlist_good")
      .where({
        _id: id
      })
      .get()
      .then(res => {
        console.log(res.data);
        this.setData({
          list: res.data
        })
        // db.collection("zc_order")
        // .add({
        //   data:{
        //     good_id:res.data[0].good_id,
        //     name: this.data.name,
        //     phone: this.data.phone,
        //     adress: this.data.adress,
        //     beizhu: this.data.beizhu,
        //   }
        // })
        // .then(res=>{

        // })
        // .catch(err=>{

        // })
      }).catch(err => {
        console.log(err);
      })
  },
  sel_order: function (cart_id) {
    var a = cart_id.split(",")
    console.log(a);
    var arr = []
    for (var i = 0; i < a.length; i++) {
      console.log(a[i])
      db.collection("zc_cart")
        .where({
          _id: a[i]
        })
        .get()
        .then(res => {
          //console.log(res.data[0])

          arr.push(res.data[0])
          //console.log(this.data.list);
          this.setData({
            list: arr
          })
          console.log(arr)
        })
        .catch(err => {
          console.log(err);
        })
    }
    //console.log(this.data.list)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function a(options) {
    if (options.id != undefined) {
      console.log(options.id);
      console.log(options.sum)
      this.setData({
        sum: options.sum
      })
      this.setData({
        good_id: options.id
      })
      this.sel(options.id);
    } else {
      console.log(options.cart_id);
      this.sel_order(options.cart_id)
    }
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