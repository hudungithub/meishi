// pages/details/details.js
// 引入云数据库
const db=wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    detail:[]
  },

  /**
   * 生命周期函数--
   */
  onLoad: function (options) {
    var id=options.id;
    this.setData({
      id:id
    })
    console.log(id)
    db.collection("msaggregate")
    .where({
      _id:id
    })
    .get()
    .then(res=>{
      console.log(res.data)
      this.setData({
      detail:res.data[0]
      })
    })
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