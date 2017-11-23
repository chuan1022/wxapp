// pages/my/history/history.js
const app=getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var This = this;
        this.getHistoryList(function(res){
            console.log(res)
            This.setData({
                lists:res.data.data.list
            })
        })
    },
    goProduct:function(ev){
        wx.navigateTo({
            url: '../../product/product?id=' + ev.currentTarget.dataset.id + '',//传id
        });
    },
    //获取浏览历史列表
    getHistoryList: function (success) {
        
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/History/index',
            data: {
                token: app.data.token
            },
            success: function (res) {
                success(res);
            }
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