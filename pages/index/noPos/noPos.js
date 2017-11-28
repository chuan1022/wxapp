const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        start: 1,
        number: 20,
        activeNum: -1,
        navId:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getProducts();
        this.getAll();
    },

    //所有免邮费导航列表
    getAll: function () {
        var This = this;
        //导航
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/ProductType/front',
            data: {
                type:2
            },
            success: function (res) {
                This.setData({
                    navs: res.data.data.list
                });
            }
        });
    },
    
    //切换到所有商品
    getAllProduct: function (ev) {
        this.setData({
            activeNum: -1,
            navId:''
        });
        this.getProducts();
    },

    //切换到分类商品
    getNavId: function (ev) {
        this.setData({
            activeNum: ev.currentTarget.dataset.index,
            navId: ev.currentTarget.dataset.id
        });
        this.getProducts();
    },

    //获取列表下产品(全部或者分类)
   getProducts:function(){
       var This=this;
       wx.request({
           url: 'http://www.amazonli.com/mijingapp/index.php/Product/free_post',
           data: {
               product_type :this.data.navId,
               language: app.data.language,
               start: this.data.start,
               number: this.data.number
           },
           success: function (res) {
            //    console.log(res)
               This.setData({
                   products: res.data.data.list
               });
           }
       });
   },
 
    //跳转产品页
    goProduct: function (ev) {
        var This = this;
        wx.navigateTo({
            url: '../../product/product?id=' + ev.currentTarget.dataset.id + '',//页面之间传id
        });
    },
    //下拉加载更多   暂时不能触发？？？
    onReachBottom: function () {
        console.log(1);
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})