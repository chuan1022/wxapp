// pages/index/free/free.js
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
        this.getFree();
    },
    //获取所有免单
    getFree:function(){
        var This=this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Product/free',
            data:{
                language:app.data.language
            },
            success:function(res){
                This.setData({
                    isShowMyFree: false,
                    list:res.data.data.list,
                    rule:res.data.data.rule
                })
            }
        })
    },

    //获取我的免单
    myFree:function(){  
        var This = this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Free/my_free',
            data: {
                token: app.data.token
            },
            success: function (res) {
                This.setData({
                    isShowMyFree: true,
                    list: res.data.data.list,
                    rule: res.data.data.rule,
                    desc: res.data.data.list[0].desc,
                    title: res.data.data.list[0].title
                });
            }

        })
    },
    //继续分享
    share:function(ev){
        wx.showModal({
            title: this.data.title,
            content: this.data.desc + ':' +ev.currentTarget.dataset.url,
            showCancel: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    },

    //查看规则
    showRule:function(){
        // this.setData({
        //     isShowRule:true,
        //     isShowMyFree:false
        // });
        wx.showModal({
            title: '免单规则',
            content: '免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案免单规则文案',
            showCancel: false
        })

    },
    //
    hiddeModal:function() {
        this.setData({
            isShowRule: false
        })
    },
    goProduct:function(ev){
        wx.navigateTo({
            url: '../../product/product?id=' + ev.currentTarget.dataset.id +'&&orderType=free',
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