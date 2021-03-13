import {HTTP} from '../util/http.js'
class ClassicModel extends HTTP{
  getLatest(sCallBack){
    this.request({
      url:'classic/latest',
      success:(res)=>{
        sCallBack(res)
        this._setLatestIndex(res.data.index)
        let key = this._getKey(res.data.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  getClassic(index, nextOrPrevious,sCallBack){
    let key = nextOrPrevious == "next"?this._getKey(index+1) : this._getKey(index-1)
    let classic = wx.getStorageSync(key)
    if(!classic){
      this.request({
        url:'classic/' + index + '/' + nextOrPrevious,
        success:(res)=>{
          wx.setStorageSync(this._getKey(res.data.index),res)
          sCallBack(res)
        }
      })
    }else{
      sCallBack(classic)
    }
   
  }

  isFirst(index) {
    return index == 1 ? true : false
  }

  isLatest(index){
    let latestIndex = this._getLatestIndex()
    return latestIndex==index?true:false
  }

  _setLatestIndex(index){
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex(){
    let index = wx.getStorageSync("latest")
    return index
  }

  _getKey(index){
    let key = "classic-" + index
    return key
  }
  getClassicLikeStatus(artID,category,sCallback){
    this.request({
        url:'classic/' + category + '/' + artID + '/favor',
        success:sCallback
    })
  }
  getMyFavor(success){
    let params={
      url:'classic/favor',
      success:success
    }
    this.request(params)
  }
}

export {ClassicModel}