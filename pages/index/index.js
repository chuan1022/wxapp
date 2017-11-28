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
            ],
        page:1,
        activeNum:-1
    },
    onLoad:function(){
      this.getHomeData();
    },
    //跳转二级分类页
    goNav:function(ev){
       app.goNav(ev);
    },
    //跳转详情页
    goProduct:function(ev){
        app.goProduct(ev.currentTarget.id);
    },
    //限时抢购
    goFlash:function(){
        wx.navigateTo({
            url: 'flash/flash',
        });
    },
    //免邮
    goNoPos: function () {
        wx.navigateTo({
            url: 'noPos/noPos',
        });
    },
    //优惠券
    goDiscount: function () {
        wx.navigateTo({
            url: 'discount/discount',
        });
    },
    //免单
    goFree: function () {
        wx.navigateTo({
            url: 'free/free',
        });
    },
    //积分
    goCount: function () {
        wx.navigateTo({
            url: 'count/count',
        });
    },

    //获取首页数据
    getHomeData:function(){
        this.getBanners();
        this.getTopNavs();
        this.getRecommendProducts();
    },
    //获取banner
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
    //获取顶部导航
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
    //获取推荐商品
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
                });
            }
        });
    },
    //下拉刷新函数
    onPullDownRefresh:function(){
        this.getHomeData();
    },

    //切换导航 顶级分类
    goHome:function(){
        this.setData({
            page: 1 ,
            activeNum: -1
        });
    },
    //切换首页导航tab
    changeNav: function (e) {
        var This=this;
        this.setData({
            page:0,
            navId: e.currentTarget.dataset.id,
            language:1,
            start:1,
            number:10,
            parentTit: e.currentTarget.dataset.parenttit,
            activeNum: e.currentTarget.dataset.index          //class变化
        });
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/ProductType/get_types?id=' + this.data.navId + '&&language=' + this.data.language + '&&start=' + this.data.start + '&&number=' + this.data.number + '',
            success:function(data){
                This.setData({
                    navs:data.data.data.menus,
                    products: data.data.data.products,
                });
            }
        })
    }
})
