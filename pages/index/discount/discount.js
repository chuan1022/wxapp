// pages/index/discount/discount.js
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
        app.checkToken('../../login/login');
        this.getDiscounts();
    },
    
    //获取优惠券列表
    getDiscounts:function(){
        var This=this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Promo/index',
            data:{
                token:app.data.token,
                start:1,
                number:20
            },
            success:function(res){
                This.setData({
                    list:res.data.data.list
                })
            }
        })
    },

    //领取优惠券
    getCount:function(ev){
        var This=this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Promo/get_promo',
            data: {
                id:ev.currentTarget.dataset.id,
                token:app.data.token
            },
            success: function (res) {
                if(res.data.data.errCode==1){
                    wx.showToast({
                        title: res.data.errMsg
                    });
                    This.onLoad();//重新加载
                }else{
                    wx.showToast({
                        title: res.data.errMsg
                    })
                }
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