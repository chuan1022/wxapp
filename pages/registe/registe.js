// pages/regiister/registe.js
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      
    },
  
    formSubmit:function(ev){
        console.log(ev);
        this.setData({
            options:ev.detail.value
        });
        if (app.testEmail(this.data.options.email)) {
            if (app.testRepeat(this.data.options.password, this.data.options.repassword)){
                wx.request({
                    url: 'http://www.amazonli.com/mijingapp/index.php/Login/register',
                    data:this.data.options,
                    success: function (res) {
                        console.log(res)
                    }
                })
            }else{
                wx.showModal({
                    title: '提示',
                    content: '密码不一致',
                })
            }
        }else{
            wx.showModal({
                title: '提示',
                content: '邮箱格式不正确！',
            })
        }   
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