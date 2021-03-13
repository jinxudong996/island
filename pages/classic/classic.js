// pages/classic/classic.js
import {ClassicModel} from '../../models/classic.js'
import {likeModel} from '../../models/like.js'
let Classic = new ClassicModel()
let like = new likeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latest:true,
    first:false,
    likeStatus:false,
    likeCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Classic.getLatest((res) =>{
      this.setData({
        ClassicData:res,
        likeStatus:res.data.like_status,
        likeCount:res.data.fav_nums
      })
    })
  },
  onLike:function(event){
    console.log(event)
    let behavior = event.detail.behavior
    like.like(behavior, this.data.ClassicData.data.id, this.data.ClassicData.data.type)
  },
  onNext:function(event){
    this._updateClassic('previous')
  },
  _updateClassic:function(nextOrPrevious){
    let index = this.data.ClassicData.data.index
    Classic.getClassic(index,nextOrPrevious,(res)=>{
      this._getLikeStatus(res.data.id,res.data.type)
      this.setData({
        ClassicData:res,
        first:Classic.isFirst(res.data.index),
        latest:Classic.isLatest(res.data.index)
      })
    })
  },
  onPrevious:function(event){
    this._updateClassic('next')
  },
  _getLikeStatus:function(artID,category){
    Classic.getClassicLikeStatus(artID,category,
      (res)=>{
        this.setData({
          likeStatus:res.data.like_status,
          likeCount:res.data.fav_nums
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