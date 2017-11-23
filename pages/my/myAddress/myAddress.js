// pages/my/myAddress/myAddress.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options) {
            this.setData({
                isChange: options.changeAddress
            });
        };

        var This = this;
        app.getAddress(function (res) {
            This.setData({
                lists: res.data.data.list
            })
        });
    },

    //从订单页过来,切换地址
    changeAddress: function (ev) {
        if (this.data.isChange == 1) {
            var pages = getCurrentPages();        //获取页面栈
            var prevPage = pages[pages.length - 2];//获取上一页，调用其setdata
            var address = {
                id: ev.currentTarget.dataset.id,
                people: ev.currentTarget.dataset.people,
                address: ev.currentTarget.dataset.address,
                telephone: ev.currentTarget.dataset.telephone
            };
            prevPage.setData({
                address: address,
                addressId: address.id
            })
            wx.navigateBack();
        }
    },
    //添加地址
    addAddress: function () {
        wx.navigateTo({
            url: 'add/add',
        })
    },
    //编辑地址
    editAddress: function (ev) {
        wx.navigateTo({
            url: 'edite/edite?people=' + ev.currentTarget.dataset.people + '&&address=' + ev.currentTarget.dataset.address + '&&telephone=' + ev.currentTarget.dataset.telephone + '&&id=' + ev.currentTarget.dataset.id + '',
        })
    },
    //删除地址
    delteAddress: function (ev) {
        var This = this;
        wx.request({
            url: 'http://www.amazonli.com/mijingapp/index.php/Address/delete',
            data: {
                token: app.data.token,
                id: ev.currentTarget.dataset.id
            },
            success: function (res) {
                if (res.data.errCode == 1) {
                    This.onLoad();
                }

            }
        })
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
        //编辑完返回时，刷新列表
        var This = this;
        app.getAddress(function (res) {
            This.setData({
                lists: res.data.data.list
            })
        });
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