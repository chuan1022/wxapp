// pages/my/my.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        token: app.data.token,
        headimg: app.data.headimg,
        username: app.data.username
    },
    //打开登陆页
    goLogin: function () {
        wx.navigateTo({
            url: '../login/login'
        })
    },
    //打开个人信息编辑
    goEditeInfo:function(){
        wx.navigateTo({
            url: 'editeInfo/editeInfo'
        })
    },
    //打开收货地址
    goMyAddress:function(){
        wx.navigateTo({
            url: 'myAddress/myAddress'
        })
    },
    //打开积分历史
    goMyCount:function(){
        wx.navigateTo({
            url: 'count/count'
        })
    },
    //邀请好友
    goInvite:function(){
        wx.navigateTo({
            url: 'invite/invite'
        })
    },
    //帮助中心
    goHelp:function(){
        wx.navigateTo({
            url: 'help/help'
        })
    },
    //联系我们
    goContactUs:function(){
        wx.navigateTo({
            url: 'contact/contact'
        })
    },
    //设置
    goSettings:function(){
        wx.navigateTo({
            url: 'settings/settings'
        })
    },
    //收藏
    goCollect:function(){
        wx.navigateTo({
            url: 'collect/collect'
        })
    },
    //历史
    goHistory:function(){
        wx.navigateTo({
            url: 'history/history'
        })
    },
    //优惠券
    goCoupon:function(){
        wx.navigateTo({
            url: 'coupon/coupon'
        })
    },
    //读取本地存储
    getStorage: function () {
        var data = wx.getStorageSync('userInfo') || {};
        app.data.token = data.token;
        app.data.username = data.username;
        app.data.headimg = data.headimg;
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getStorage();
        this.setData({
            token: app.data.token,
            headimg: app.data.headimg,
            username: app.data.username
        });
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