// pages/product/ensurOrder/ensureOrder.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderFreight: 0,
        totalPrice: 0,
        disCount:0,     //优惠券金额
        disCountId:0,     //优惠券ID
        addressId:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        var This=this;
        app.getAddress(function (res) {
            var list = res.data.data.list;
            for(var i=0;i<list.length;i++){
                if(list[i].is_default==1){
                    This.setData({
                        address: list[i],
                        addressId: list[i].id
                    });
                }
            };
        });
        this.setData({
            goodsId: options.goodsId,
            goodsImg: options.goodsImg,
            goodsNote: options.goodsNote,
            goodsNum: options.goodsNum,
            goodsPrice: options.goodsPrice,
            goodsName: options.goodsName,
            orderType: options.orderType,
            groupId: options.groupId||0,
            goodsInfo: options.goodsInfo
        });
        this.getTotalPrice();
    },
    changeAddress:function(){
        //跳转到编辑地址
        wx.navigateTo({
            url: '../../my/myAddress/myAddress?changeAddress=1'
        });
    },
    // 计算总价
    getTotalPrice:function(){
        this.setData({
            totalPrice: Number(Number(this.data.goodsNum * this.data.goodsPrice) - this.data.disCount )+ Number(this.data.orderFreight)
        })
    },
    //获取手机号
    getPhone:function(ev){
        this.setData({
            userPhone:ev.detail.value
        });
    },
    //获取用户输入的验证码
    getCode: function (ev) {
        this.setData({
            code: ev.detail.value
        });
    },
    //请求后台发送后台验证码
    getAdminCode:function(){
        //判断用户手机号，非空、格式
        if (this.data.userPhone){
            if(true){
                app.getAdminCode(this.data.userPhone,function(res){
                    console.log(res);
                    if(res.data.errCode==0){
                        wx.showToast({
                            title: res.data.errMsg,
                        })
                    }else{
                        wx.showToast({
                            title: res.data.data.code,
                        })
                    }
                });
            }else{
                // 格式不正确时
            }
        }else{
            //空时
        }  
    },
   
    // 提交订单
    submitOrder:function(){
        // *goods_id：货物id和数量的字符串 33:3; 22:2表示goods_id为33的3件，为22的两件
     
        var options={
            token:app.data.token,
            data_type: this.data.orderType,
            phone: this.data.userPhone,
            code: this.data.code,
            goods_id: this.data.goodsInfo,
            address_id: this.data.addressId,
            post: this.data.orderFreight,
            promo_id: this.data.disCountId,
            group_id: this.data.groupId
        };
        console.log(options);
        app.submitOrder(options,function(res){
            console.log(res);
            // wx.showModal({
            //     title: '',
            //     content: '订单创建成功',
            //     cancelText: '返回首页',
            //     confirmText: '查看订单',
            //     success: function (res) {
            //         if (res.confirm) {
            //             //点击了查看订单
            //             wx.reLaunch({
            //                 url: '../../my/my?seeOrders=1',
            //             });
            //         } else {
            //             //点击返回首页
            //             wx.reLaunch({
            //                 url: '../../index/index',
            //             });
            //         }
            //     }
            // });
            if (res.data.errCode == 0) {
                wx.showToast({
                    title: res.data.errMsg,
                });
            } else {
                wx.showModal({
                    title: '',
                    content: '订单创建成功',
                    cancelText: '返回首页',
                    confirmText: '查看订单',
                    success: function (res) {
                        console.log(res);
                        if (res.confirm) { 
                            //点击了查看订单
                            wx.reLaunch({
                                url: '../../my/my?seeOrders=1',
                            });
                        } else {
                            //点击返回首页
                            wx.reLaunch({
                                url: '../../index/index',
                            });
                        }
                    }
                });
            }
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