// pages/class/nav/nav.js  二级分类
Page({

    /**
     * 页面的初始数据
     */
    data: {
        start:0,
        language:1,
        start:1,
        number:10,
        title:'全部',
        parentTit:'手机',
        activeNum:-1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            id: options.id,         //二级分类id
            title: options.title,    //接受title  二级分类名
            pid: options.pid,        //顶级分类id
            activeNum: Number(options.activeNum),
            parentTit: options.parentTit        //父级名
        });
        wx.setNavigationBarTitle({
            title: this.data.parentTit+'-'+this.data.title,

        });
        this.getAll();//获取二级分类，设置导航名,获取所有商品列表

        //查看全部和某一个二级分类
        if(this.data.id){
            this.getProduct(this.data.id);  //获取二级分类
        }else{
            this.getAllProduct();          //获取全部产品
        }
    },

    //获取二级分类导航，设置顶级分类导航名
    getAll:function(){
        var This = this;
        this.setData({
            page: 0,
            language: 1,
            start: 1,
            number: 10
        });
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/ProductType/get_types?id=' + this.data.pid + '&&language=' + this.data.language + '&&start=' + this.data.start + '&&number=' + this.data.number + '',
            success: function (data) {
                This.setData({
                    navs: data.data.data.menus,
                    allProducts: data.data.data.products,
                });
            }
        });
    },
    //切换所有产成品
    getAllProduct:function(ev){
        this.setNavTitle(ev.currentTarget.dataset.title);
        this.setData({
            activeNum:-1,
            products:this.data.allProducts
        });
    },
    //获取二级分类下的产品列表
    getNavId:function(ev){
        this.setData({
            activeNum: ev.currentTarget.dataset.index
        });
        this.setNavTitle(ev.currentTarget.dataset.title);
        this.getProduct(ev.currentTarget.dataset.id);
    },
    getProduct:function(id){
        var This=this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/ProductType/get_products',
            data: {
                id:id
            },
            success: function (data) {
                This.setData({
                    products: data.data.data.list
                });
            }
        })
    },
    //设置导航title
    setNavTitle:function(title){
        this.setData({
            title: title,
        });
        wx.setNavigationBarTitle({
            title: this.data.parentTit + '-' + this.data.title,
        });
    },
    //跳转产品页
    goProduct: function (ev) {
        var This = this;
        var id = ev.currentTarget.id;
        wx.navigateTo({
            url: '../../product/product?id=' + id + '',//页面之间传id
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