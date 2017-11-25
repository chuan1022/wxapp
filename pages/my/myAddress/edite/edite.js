// pages/my/myAddress/add/add.js
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        default:1
    },
    getAddress:function(ev){
        this.setData({
            address:ev.detail.value
        })
    },
    getPhone:function(ev){
        this.setData({
            telephone: ev.detail.value
        })
    },
    getPeople:function(ev){
        this.setData({
            people: ev.detail.value
        })
    },
    editeAddress:function(){
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Address/update',
            data:{
                token:app.data.token,
                address:this.data.address,
                people:this.data.people,
                telephone: this.data.telephone,
                is_default:this.data.default,
                id: this.data.id
            },
            success:function(res){ 
                if (res.data.errCode==1){
                    wx.navigateBack({
                        url: '../myAddress'
                    });

                }else{
                    wx.showToast({
                        title: res.data.errMsg,
                    });
                };
            }

        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            address: options.address,
            people: options.people,
            telephone: options.telephone,
            id: options.id
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