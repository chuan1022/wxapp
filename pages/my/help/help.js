// pages/my/help/help.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showId:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getHelp();
    },
    getAnswer:function(ev){
        if (ev.currentTarget.dataset.id==this.data.showId){
            this.setData({
                showId: 0
            })
        }else{
            this.setData({
                showId: ev.currentTarget.dataset.id
            })
        }
        
    },
    getHelp: function () {
        var This = this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Question/index',
            data: {
                language: app.data.language
            },
            success: function (res) {
                console.log(res);
                This.setData({
                    list: res.data.data.list
                });
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