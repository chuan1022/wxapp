// pages/my/collect/collect.js
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
        var This=this;
        this.getCollectList(app.data.token);
        app.getYouLikes(function(res){
            console.log(res);
            This.setData({
                likeList:res.data.data.list
            })
        });
    },
    //获取收藏列表
    getCollectList: function (token){
        var This=this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Favorite/index',
            data:{
                token: token,
                language:1
            },
            success:function(data){
                This.setData({
                    lists: data.data.data.list
                });
            }
        })
    },
    //打开商品页面
    goProduct: function (ev) {
        wx.navigateTo({
            url: '../../product/product?id=' + ev.currentTarget.dataset.id + '',//传id
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