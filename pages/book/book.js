import {
  BookModel
} from '../../models/book.js'
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    books:[],
    searching:false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad:function(){
      const b = bookModel.getHotList()
        .then(res => {
          console.log(res)
          this.setData({
            books:res
          })
      })
    },
    onSearching:function(e){
      this.setData({
        searching:true
      })
    },
    onCancel:function(){
      this.setData({
        searching:false
      })
    }
  }
})
