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
        //已选货物属性
        goodsImg: "../../images/bg.png",
        groupId: 0,      //已选拼单id
        orderType: 'buy',   //下单类型
        isSubDisable: true,
        isAddDisable: false,
        isSelectGoods: false,        //判断是不是选了货物，只要选了一次货物就变为true
        goodsNum: 1
    },

    //跳转到订单页面
    goEnsureOrder: function () {
        //当选了货物时，可以跳转到订单确认页，否则提醒选择货物
        if (this.data.isSelectGoods) {
            var goods = this.data.goods;
            goods.count = this.data.goodsNum;     //加入数量
            goods.price = this.data.goodsPrice;     //加入价格
            goods.note = this.data.detail.note; //加入商品名
            var arry = [];        //作为数组传到订单页
            arry.push(goods);

            var goodsInfo = goods.id + ':' + goods.count;//拼goodsInfo
            var goodsPrice = (goods.count * goods.price).toFixed(2);//计算goodsPrice

            //传入货物信息
            wx.navigateTo({
                url: 'ensurOrder/ensureOrder?products=' + JSON.stringify(arry) + '&&orderType=' + this.data.orderType + '&&groupId=' + this.data.groupId + '&&goodsInfo=' + goodsInfo + '&&goodsPrice=' + goodsPrice + '',
            })
        } else {
            wx.showToast({
                title: '请选择货物',
                image: '../../images/tip.png',
            })
        }
    },

    //点击立即分享--弹出分享框
    freeBuy: function () {
        app.checkToken('../login/login');
        this.setData({
            goodsPrice: 0,  //分享价为0
        });
        this.showModal();
    },
    //点击积分兑换--弹出积分兑换框
    freeBuy: function () {
        app.checkToken('../login/login');
        this.setData({
            goodsPrice: this.data.detail.integral,  //价格为积分
        });
        this.showModal();
    },

    //点击立即抢购--弹出抢购框
    flashBuy: function () {
        app.checkToken('../login/login');
        this.setData({ 
            goodsPrice: this.data.detail.flash_price,
        });
        this.showModal();
    },

    //点击单独购买--弹出单独购买框
    aloneBuy: function () {
        app.checkToken('../login/login');
        this.setData({
            orderType: 'buy',
            // isSelectGoods: false,
            goodsPrice: this.data.detail.price,
            // goodsId: '',
            // goodsNote: ''
        });
        this.showModal();
    },

    //点击去拼单（拼别人的单）--弹出拼单购买框
    joinGroupBuy: function (ev) {
        app.checkToken('../login/login');
        this.groupBuy();
        this.setData({
            groupId: ev.currentTarget.dataset.groupid
        });
    },

    //点击拼单购买--弹出拼单购买框
    groupBuy: function () {
        app.checkToken('../login/login');
        this.setData({
            orderType: 'group',
            goodsPrice: this.data.detail.group_price
        });
        this.showModal();
    },

    //点击拼单购买--前往订单确认页
    goGroupBuy: function () {
        this.setData({
            groupId: 0
        });
        this.goEnsureOrder();
    },
    //点击立即抢购--前往订单确认页
    goFlashBuy: function () {
        this.goEnsureOrder();
    },

    //点击马上分享--前往订单确认页
    goFreeBuy: function () {
        this.goEnsureOrder();
    },
    //点击积分兑换--前往订单确认页
    goIntegralBuy: function () {
        this.goEnsureOrder();
    },
    //点击直接购买--前往订单确认页
    buyNow: function (ev) {
        this.setData({
            orderType: 'buy'     //下单类型设为直接购买
        });
        this.goEnsureOrder();
    },

    //加入购物车
    addCart: function () {
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
                if (res.data.errCode == 1) {
                    wx.showToast({
                        title: res.data.errMsg,
                    });
                    This.hiddeModal();
                }
            }
        })
    },





    /**
 * 生命周期函数--监听页面加载
 */
    onLoad: function (options) {
        // options接受上级页面的传值
        var This = this;
        this.setData({
            id: options.id,
            orderType: options.orderType || ''
        });

        if (this.data.orderType == 'free' || this.data.orderType =='flash') {
            this.setData({
                isSubDisable: true,
                isAddDisable: true,
            });
        }
        this.getInfo();
        // console.log(this.data)
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
                    // console.log(detail)
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
            goods: this.data.detail.goods[ev.currentTarget.dataset.index],
            isSelectGoods: true
        });
    },
    //更改货物数量
    sub: function () {
        if (!this.data.isSubDisable) {
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
        if (!this.data.isAddDisable) {
            this.setData({
                goodsNum: this.data.goodsNum + 1,
                isSubDisable: false
            })
        }
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