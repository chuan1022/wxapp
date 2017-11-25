// pages/cart/cart.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isSelectAll: false,  //判断是否全选
        totalPrice: 0,       //总价
        ordertype:'buy'
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {
        this.getCartProcudts();
    },

    //前往订单确认
    goEnsureOrder:function(){
        //当选了货物时，可以跳转到订单确认页，否则提醒选择货物

        var goodsPrice = this.data.totalPrice;  //货物总价
        var goods = []; //获取数组，传入到订单页

        //选中时才传递
        for (var i = 0; i < this.data.products.length; i++) {
            if (this.data.products[i].isSelect) {
                goods.push(this.data.products[i]);
            }
        };

        //拼接goodsInfo
        var goodsInfo = '';
        for (var i = 0; i < goods.length; i++) {
            goodsInfo += goods[i].goods_id + ':' + goods[i].count + ';';
        };
        if (goods.length>0) {
           
            //传入货物信息
            wx.navigateTo({
                url: '../product/ensurOrder/ensureOrder?products=' + JSON.stringify(goods) + '&&orderType=' + this.data.ordertype + '&&groupId=' + this.data.groupId + '&&goodsInfo=' + goodsInfo + '&&goodsPrice=' + goodsPrice + '',
            })
        } else {
            wx.showToast({
                title: '未选中商品',
                image: '../../images/tip.png',
            })
        }
    },

    //选取、撤销单个
    change: function (ev) {
        var index = ev.currentTarget.dataset.index;
        var products = this.data.products;
        var price = (products[index].count * products[index].goods.price).toFixed(2);

        products[index].isSelect = !products[index].isSelect;//选中判断置反  
        //重置products
        this.setData({
            products: products
        });
        this.getTotalPrice();   //重新计算价格
    },

    //全选、全撤
    changeAll: function () {
        var isSelectAll = this.data.isSelectAll;    //全选置反
        isSelectAll = !isSelectAll;
        for (var attr of this.data.products) {
            attr.isSelect = isSelectAll;
        };
        this.setData({
            products: this.data.products,
            isSelectAll: isSelectAll
        });
        this.getTotalPrice();   //重新计算价格
    },

    //计算价格
    getTotalPrice: function () {
        var totalPrice = 0;
        for (var i = 0; i < this.data.products.length; i++) {
            var index = i;
            if (this.data.products[i].isSelect) {
                totalPrice += this.data.products[index].count * this.data.products[index].goods.price;
            }
        };
        this.setData({
            totalPrice: totalPrice.toFixed(2)
        });
    },
    //请求购物车数据
    getCartProcudts: function () {
        var This = this;
        app.checkToken();
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Cart/index',
            data: {
                token: app.data.token
            },
            success: function (res) {
                console.log(res)
                if(res.data.errCode==0){
                    wx.showToast({
                        title: '登录失败',
                    })
                }else{
                for(var attr of res.data.data.list) {
                         attr.isSelect = false; //全部默认不选中
                        //取出属性。方便传递到订单页面
                        attr.note = attr.product.note;
                        attr.price = attr.goods.price;
                        attr.pic = attr.goods.pic;
                        attr.attribute = attr.goods.attribute
                    };
                    This.setData({
                        products: res.data.data.list,
                        isSelectAll:false
                    });
                // This.getTotalPrice();//第一次加载数据计算价格
                }
           
            }
        })

    },
    // 查看商品详情
    goProduct: function (ev) {
        app.goProduct(ev.currentTarget.dataset.id)
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