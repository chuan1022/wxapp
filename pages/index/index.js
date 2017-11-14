//index.js
//获取应用实例
const app = getApp();   
Page({
    data: {
        indicatorDots: true,    //标示圈
        autoplay: false,           //自动播放
        interval: 5000,         //自动播放间隔
        duration: 1000,        //滑动动画时长
        indicatorColor:'rgba(0, 0, 0, .3)',
        indicatorActiveColor:'red',
        circular:true,
        activeItems:[{src:'../../images/active/6.png',note:"限时抢购"},
            { src: '../../images/active/4.png', note: "免邮费" },
            { src: '../../images/active/1.png', note: "优惠券" },
            { src: '../../images/active/3.png', note: "免单" },
            { src: '../../images/active/2.png', note: "积分兑换" }
            ]
    },
    onLoad:function(){
      this.getHomeData();
    },
    getHomeData:function(){
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
