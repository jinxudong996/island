import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

let classicModel = new ClassicModel()
let bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: true,
    userInfo: null,
    classics: [],
    myBooksCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    this.getMyFavor()
    this.hasGottenUserInfo()
    this.getMyBookCount()
  },

  // onShow:function(options){

  // },

  getMyBookCount() {
    bookModel.getMyBookCount(data => {
      this.setData({
        myBooksCount: data.count
      })
    })
  },

  hasGottenUserInfo: function() {
    wx.getSetting({
      success: (data) => {
        console.log(data)
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (data) => {
              this.setData({
                hasUserInfo: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },

  onGetUserInfo: function(event) {
    let userInfo = event.detail.userInfo
    console.log(userInfo)
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  },

  getMyFavor: function() {
    classicModel.getMyFavor((data) => {
      this.setData({
        classics: data.data
      })
    })
  },

  onPreviewTap: function(event) {
    wx.navigateTo({
      url: '/pages/classic-detail/index?cid=' + event.detail.cid + '&type=' + event.detail.type
    })
  },
  onJumpToAbout: function(event) {
    // wx.navigateTo({
    //   url: '/pages/about/about',
    // })
    wx.showToast({
      title: '你想愁啥',
      icon: 'none'
    })
  },

  onLikeBook:function(e) {
    wx.showToast({
      title: '没有',
      icon: 'none'
    })
  },

  onStudy: function(event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

  onShareAppMessage() {

  }
})