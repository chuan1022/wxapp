// pages/cart/cart.js
const app=getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        obj:{},  //goodsId:count  存放所有集合
        checkedObj:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCartProcudts();
    },

    //选取单个
    checked:function(ev){
        console.log(ev)
    },

    //请求购物车数据
    getCartProcudts:function(){
        var This=this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Cart/index',
            data:{
                token:app.data.token
            },
            success:function(res){
                console.log(res);
                This.setData({
                    products:res.data.data.list
                });
                //把货物id和数量存放进obj
                
                for (var attr of res.data.data.list){
                    This.data.obj[attr.goods_id] = Number(attr.count);
                };
                console.log(This.data.obj);
            }
        })

    },



    // 查看商品详情
    goProduct:function(ev){
        app.goProduct(ev.currentTarget.dataset.id)
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