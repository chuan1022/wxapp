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
    addAddress:function(){
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Address/add',
            data:{
                token:app.data.token,
                address:this.data.address,
                people:this.data.people,
                telephone: this.data.telephone,
                is_default:this.data.default
            },
            success:function(res){
                switch (res.data.errCode){
                    case 1:
                        wx.navigateBack({
                           url: '../myAddress'
                       });
                    break;
                    case 0:
                        wx.showToast({
                            title: res.data.errMsg,
                        });
                    break;
                    
                }
            }

        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
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