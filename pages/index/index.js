//index.js
//获取应用实例
const app = getApp();   
Page({
    data: {
        activeItems:[{src:'../../images/active/6.png',note:"限时抢购",tap:'goFlash'},
            { src: '../../images/active/4.png', note: "免邮费", tap: 'goNoPos'},
            { src: '../../images/active/1.png', note: "优惠券", tap: 'goDiscount'},
            { src: '../../images/active/3.png', note: "免单", tap: 'goFree'},
            { src: '../../images/active/2.png', note: "积分兑换", tap: 'goCount'}
            ]
    },
    onLoad:function(){
      this.getHomeData();
    },
    goProduct:function(ev){
        var id = ev.currentTarget.id;
        wx.navigateTo({
            url: '../product/product?id='+id+'',//页面之间传id
        });
    },
    goFlash:function(){
        wx.navigateTo({
            url: 'flash/flash',
        });
    },
    goNoPos: function () {
        wx.navigateTo({
            url: 'noPos/noPos',
        });
    },
    goDiscount: function () {
        wx.navigateTo({
            url: 'discount/discount',
        });
    },
    goFree: function () {
        wx.navigateTo({
            url: 'free/free',
        });
    },
    goCount: function () {
        wx.navigateTo({
            url: 'count/count',
        });
    },
    getHomeData:function(){
        //获取首页数据
        this.getBanners();
        this.getTopNavs();
        this.getRecommendProducts();
    },
    getBanners:function(){
        var This=this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Banner/index',
            data: {
                language: 1
            },
           success:function(data){
               This.setData({
                   bannerImages:data.data.data
               });
           }
        });
    },
    getTopNavs: function () {
        var This = this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/ProductType/get_all',
            data: {
                language: 1
            },
            success: function (data) {
                This.setData({
                    navList: data.data.data
                })
            }
        });
    },
    getRecommendProducts: function () {
        var This = this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Product/recommend',
            data: {
                language: 1
            },
            success: function (data) {
                This.setData({
                    reonmendPro: data.data.data.list
                })
            }
        });
    },
    //下拉刷新函数
    onPullDownRefresh:function(){
        this.getHomeData();
    },

    //事件处理函数
    changeNav: function (e) {
             
        console.log(e);
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})
