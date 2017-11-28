// pages/index/flash/flash.js
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
        this.getFlashList();
    },
    //请求抢购列表
    getFlashList:function(){
        var This=this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/flash/index',
            data:{
                language:app.data.language,
                start:0,
                number:20
            },
            success:function(res){
                console.log(res);
                This.setData({
                    list:res.data.data.list
                })
            }
        })
    },
    //前往商品页
    goProduct:function(ev){
        wx.navigateTo({
            url: '../../product/product?id='+ev.currentTarget.dataset.id+'&&orderType=flash',
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