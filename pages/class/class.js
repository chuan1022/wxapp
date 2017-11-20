// pages/class/class.js
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
     
    },
    //打开二级分类
    goNav: function (ev) {
        app.goNav(ev);
    },

    /**生命周期函数--监听页面加载 */
    onLoad: function () {
        this.getNavs();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    // 获取列表
    getNavs:function(){
        var This=this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/ProductType/get_all',
            data: {
                language: 1 
            },
            success: function (data) {
                This.setData({
                    navLists: data.data.data
                })
            }
        });
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