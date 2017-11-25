// pages/product/product.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collectImg: '../../images/collect1-2.png',
        noCollectImg: '../../images/collect1.png',
        animationData: {},
        isShowShadow: false,
        isGroupBuy: true,
        //已选货物属性
        goodsImg: "../../images/bg.png",
        goodsId: '',
        goodsPrice: '',
        goodsNote: '',
        goodsNum: 1,
        groupId: 0,      //已选拼单id
        ordertype: '',   //下单类型
        isSubDisable: true,
        isAddDisable: false,
        isSelectGoods: false        //判断是不是选了货物，只要选了一次货物就变为true
    },

    //点击单独购买--弹出单独购买框
    aloneBuy: function () {
        app.checkToken();
        this.setData({
            isGroupBuy: false,
            isSelectGoods: false,
            gooodsPrice: this.data.detail.price,
            goodsImg: "../../images/bg.png",
            goodsId: '',
            goodsNote: '',
            goodsNum: 1,
        });
        this.showModal();

    },

    //点击去拼单（拼别人的单）--弹出拼单购买框
    joinGroupBuy: function (ev) {
        app.checkToken();
        this.groupBuy();
        this.setData({
            groupId: ev.currentTarget.dataset.groupid
        });
    },

    //点击拼单购买--弹出拼单购买框
    groupBuy: function () {
        app.checkToken();
        this.setData({
            isGroupBuy: true,
            isSelectGoods: false,
            goodsPrice: this.data.detail.group_price,
            goodsImg: "../../images/bg.png",
            goodsNote: '',
            goodsNum: 1,
        });
        this.showModal();
    },

    //点击拼单购买--前往订单确认页
    goGroupBuy: function () {
        this.setData({
            ordertype: 'group',     //下单类型设为拼团
            groupId: 0
        });
        this.goEnsureOrder();
    },

    //加入购物车
    addCart: function () {
        console.log(1);
        var This = this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Cart/add',
            data: {
                token: app.data.token,
                language: app.data.language,
                goods_id: this.data.goodsId,
                count: this.data.goodsNum
            },
            success: function (res) {
                console.log(res);
                if (res.data.errCode == 1) {
                    wx.showToast({
                        title: res.data.errMsg,
                    });
                    This.hiddeModal();
                }
            }
        })
    },

    //点击直接购买--前往订单确认页
    buyNow: function (ev) {
        this.setData({
            ordertype: 'buy'     //下单类型设为直接购买
        });
        this.goEnsureOrder();
    },

    //跳转到订单页面
    goEnsureOrder: function () {
        //当选了货物时，可以跳转到订单确认页，否则提醒选择货物
        if (this.data.isSelectGoods) {
            //传入货物信息
            wx.navigateTo({
                url: 'ensurOrder/ensureOrder?goodsImg=' + this.data.goodsImg + '&&goodsId=' + this.data.goodsId + '&&goodsNote=' + this.data.goodsNote + '&&goodsNum=' + this.data.goodsNum + '&&goodsPrice=' + this.data.goodsPrice + '&&goodsName=' + this.data.detail.note + '&&orderType=' + this.data.ordertype + '&&groupId=' + this.data.groupId + '&&goodsInfo=' + this.data.goodsId + ':' + this.data.goodsNum+'',
            })
        } else {
            wx.showToast({
                title: '请选择货物',
                image: '../../images/tip.png',
            })
        }
    },



    /**
 * 生命周期函数--监听页面加载
 */
    onLoad: function (options) {
        // options接受上级页面的传值
        var This = this;
        this.setData({
            id: options.id
        });
        this.getInfo();

        // 设置banner高度等于宽度
        // wx.getSystemInfo({   
        //     success: function (data) {

        //     This.setData({
        //         swiperHeight: data.screenWidth
        //     })
        //  }
        // })
    },
    //获取商品信息
    getInfo: function () {
        var This = this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/product/detail',
            data: {
                id: this.data.id,
                language: 1,
                token: app.data.token
            },
            success: function (data) {
                if (data.data.errCode == 1) {
                    var detail = data.data.data.detail;
                    console.log(detail)
                    This.setData({
                        detail: detail,
                        isCollect: detail.is_fav,
                        favId: detail.fav_id
                    });

                }
            }
        })
    },

    //选择购买货物
    selectGoods: function (ev) {
        this.setData({
            goodsImg: ev.currentTarget.dataset.goodsimg,
            goodsId: ev.currentTarget.dataset.goodsid,
            goodsNote: ev.currentTarget.dataset.goodsnote,
            goodsPrice: ev.currentTarget.dataset.goodsprice,
            isSelectGoods: true
        });
    },
    //更改货物数量
    sub: function () {
        if (this.data.goodsNum > 1) {
            this.setData({
                goodsNum: this.data.goodsNum - 1
            });
            if (this.data.goodsNum == 1) {
                this.setData({
                    isSubDisable: true
                });
            }
        }

    },
    add: function () {
        this.setData({
            goodsNum: this.data.goodsNum + 1,
            isSubDisable: false
        })

    },
    /**
      * 生命周期函数--监听页面显示
      */
    showModal: function () {
        var animation = wx.createAnimation({
            duration: 300,
            timingFunction: 'linear',
            delay: 0
        });
        this.animation = animation;
        animation.translateY(500).step();
        this.setData({
            animationData: animation.export(),
            isShowShadow: true
        });
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 200)
    },
    hiddeModal: function () {
        var animation = wx.createAnimation({
            duration: 300,
            timingFunction: 'linear',
            delay: 0
        });
        this.animation = animation;
        animation.translateY(500).step();
        this.setData({
            animationData: animation.export()
        });
        setTimeout(function () {
            animation.translateY(0).step();
            this.setData({
                animationData: animation.export(),
                isShowShadow: false
            })
        }.bind(this), 200)
    },

    // 返回首页
    goHome: function () {
        wx.reLaunch({
            url: '../index/index'
        })
    },

    //收藏和取消收藏！
    doCollect: function (ev) {
        app.checkToken();
        var This = this;
        //根据用户收藏状态判断调用函数

        //取消收藏
        if (this.data.isCollect == 1) {
            app.delCollect(ev.currentTarget.dataset.id, app.data.token, function (res) {
                if (res.data.errCode == 1) {
                    This.setData({
                        isCollect: 0
                    });
                    wx.showToast({
                        title: res.data.errMsg
                    });
                } else {
                    wx.showToast({
                        title: res.data.errMsg
                    });
                }
            })
        } else {
            app.addCollect(ev.currentTarget.dataset.productid, app.data.token, function (res) {
                if (res.data.errCode == 1) {
                    This.setData({
                        isCollect: 1,
                        favId: res.data.data.fav
                    });
                    wx.showToast({
                        title: res.data.errMsg
                    });
                } else {
                    wx.showToast({
                        title: res.data.errMsg
                    });
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {


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