//app.js
App({
    data: {
        token: 0,
        language: 1,
        headimg: "../../images/userImg.png",
        username: "",
    },
    config: {
        host: 'https://qpqlls70.qcloud.la'
    },
    
    //邮箱验证
    testEmail: function (email) {
        var regEmail = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");
        if (regEmail.test(email)) {
            return true;
        } else {
            return false;
        }
    },
    //登陆验证
    checkToken:function(){
        if(this.data.token==0){
            wx.navigateTo({
                url: 'pages/login/login',
            })
        }
    },
    //重复验证
    testRepeat: function (data1, data2) {
        if (data1 == data2) {
            return true;
        } else {
            return false;
        }
    },
    //打开二级分类页面
    goNav: function (ev) {
        var pid = ev.currentTarget.dataset.pid;     //顶级分类id
        var id = ev.currentTarget.dataset.id;       //二级分类id
        var title = ev.currentTarget.dataset.title;    //子类名
        var activeNum = ev.currentTarget.dataset.index;       //活动子类
        var parentTit = ev.currentTarget.dataset.parenttit;        //父类名
        wx.navigateTo({
            url: '../class/nav/nav?pid=' + pid + '&&title=' + title + '&&id=' + id + '&&activeNum=' + activeNum + '&&parentTit=' + parentTit + ''
        });
    },
    //打开产品页
    goProduct:function(id){
        wx.navigateTo({
            url: '../product/product?id=' + id + '',//传id和token
        });
    },
    //获取猜你喜欢
    getYouLikes:function(){
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Product/guess',
            data:{
                data_type:1,
                language:this.data.language,
                start:0,
                number:10
            }
        })
    },
    //获取大家都在买
    getWeBuy:function(){
        wx.request({
            url: '',
            data:{
                
            },
            success:function(data){
                console.log(data)
            }
        })
    },
    // 收藏商品
    addCollect:function(id,token,success){
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Favorite/add',
            data:{
                product_id:id,
                token:token,
                language:this.data.language
            },
            success: function(data){
                success(data)
            }
        })
    },
    //删除收藏
    delCollect: function (id, token, success){
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Favorite/delete',
            data: { 
                id: id,
                token: token,
                language: this.data.language
            },
            success: function (data) {
                console.log(data)
                success(data)

            }
        })
    },
    onLoad:function(){
    
    },
    //读取本地存储
    getStorage: function () {
        var data = wx.getStorageSync('userInfo') || {};
        this.data.token = data.token;
        this.data.username = data.username;
        this.data.headimg = data.headimg;
    },
    onLaunch: function () {
        this.getStorage();//加载app获取本地存储
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        });
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    }
})