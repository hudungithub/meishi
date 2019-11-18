// pages/header/header.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    show: false,
    index1: [],
    good_id:"",
    cart_show: false,
    liji_show: false,
    openid: "",
    cart_sum: 0,
    image:[],
    name:[]
  },
  // 加入购物车
  add_cart: function () {
    console.log(this.data.good_id);
    // console.log(this.data.sum);
    db.collection("cart")
      .where({
        _openid: this.data.openid,
        good_id: this.data.good_id
      })
      .get()
      .then(res => {
        console.log(res.data);
        if (res.data.length == 0) {
          db.collection("cart")
            .add({
              data: {
                good_id: this.data.good_id,
                sum: this.data.sum,
                name: this.data.list[this.data.index1].name,
                image: this.data.list[this.data.index1].image,
                title: this.data.list[this.data.index1].title,
                price: this.data.list[this.data.index1].price,
              }
            })
            .then(res => {
              console.log(res);
              this.onClose1();
              wx.showToast({
                title: '加入购物车成功',
                icon: 'none',
                duration: 2000
              })
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          //console.log(this.data.sum)
          //console.log(res.data[0].sum)
          //console.log(this.data.good_id)
          //console.log(this.data.sum + res.data[0].sum)
          db.collection("cart")
            .doc(res.data[0]._id)
            .update({
              data: {
                sum: this.data.sum + res.data[0].sum
              }
            })
            .then(res => {
              //console.log(res);
              wx.showToast({
                title: '加入购物车成功',
                icon: 'none',
                duration: 2000
              })
              this.onClose1();
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
  //模糊查询
  onSearch: function (event) {
    var value = event.detail;
    if (value.length == 0) {
      this.setData({
        xs: 1
      })
    } else {
      this.setData({
        xs: 0
      })
      db.collection("msaggregate")
        .where({
          title: db.RegExp({
            regexp: value,//从搜索栏获取值进行匹配
            options: 'i',//大小写不区分
          })
        })
        .get()
        .then(res => {
          console.log(res)
          if (res.data.length == 0) {
            this.setData({
              xs: 1
            })
          } else {
            this.setData({
              slist: res.data
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  onClose1() {
    this.setData({ cart_show: false });
  },
  onClose2() {
    this.setData({ liji_show: false });
  },
  // 弹出框
  //点击我显示底部弹出框
  clickme: function(event) {
    this.showPopup();
    var id = event.target.dataset.id;
    this.setData({
      good_id: this.data.list[event.target.dataset.id]._id
    })
    console.log(id);
    this.setData({
      index1: id
    })
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  select0: function() {
    // 1.查询集合
    wx.showLoading({
      title: '请稍后',
    })
    db.collection("msaggregate")
      .get() //查询
      .then(res => {
        console.log(res)
        var rows = res.data;
        console.log(rows)
        this.setData({
          list: rows
        })
      })
      .catch(err => {
        console.log(err)
      })
    wx.hideLoading();
  },
  goDetails:function(event){
    //1:添加参数event事件对象
    //2:依据event获取自定义属性id
    var id=event.currentTarget.dataset.id;
    console.log(id);
    //3:跳转pages/home00/home00参数id
    var url = "/pages/details/details?id="+id
    wx.navigateTo({
      url: url,
    })
  },
  goStapleFood: function() {
    wx.navigateTo({
      url: '../staplefood/staplefood',
    })
  },
  goFood: function () {
    wx.navigateTo({
      url: '../foodChapter/foodChapter',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    this.select0()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})