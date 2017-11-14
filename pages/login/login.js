// pages/login/login.js
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        email:'',
        password:''
    }, 
    getEmail:function(e){
      this.setData({
          email:e.detail.value
      })
    },
    getPassword:function(e){
        this.setData({
            password: e.detail.value
        })
    },
    login:function(){
       
        if (!this.data.email && !this.data.password){
            wx.showModal({
                title: '提示',
                content: '账号或密码不能为空！',
            })
        }else{
            wx.request({
                url: 'http://www.amazonli.com/mijingapp/index.php/Login/login',
                data: {
                    email: this.data.email,
                    password: this.data.password
                },
                success: function (data) {
                    switch(data.data.errCode){
                        case 0:
                            wx.showModal({
                                title: '提示',
                                content: '账号或密码错误！',
                            })
                        break;
                        case 1:
                            app.data.token = data.data.data.token;
                            app.data.username = data.data.data.username;
                            app.data.headimg = data.data.data.headimg;
                            wx.reLaunch({
                                url: '../index/index'
                            });
                            // 个人信息存储到本地
                            wx.setStorageSync('userInfo',data.data.data);
                           
                        };
                }
            });
           
        }
    },
    toRegister:function(){
        wx.navigateTo({
            url: '../registe/registe'
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