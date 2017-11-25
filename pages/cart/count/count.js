// pages/cart/count/count.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        num:{
            type:Number,
            value:0,
            observer:function(newVal,old,ev){
                var pages= getCurrentPages();
                pages[pages.length - 1].data.products[this.data.index].count= newVal;

                pages[pages.length - 1].setData({
                    products: pages[pages.length - 1].data.products
                });
                pages[pages.length - 1].getTotalPrice();   //重新计算价格  问题：初次渲染执行五次
            }
        }
    },
    //在组件实例进入页面节点树时执行
    ready:function(){
        this.setData({
            num: this.dataset.num,
            index:this.dataset.index
        });
    },
    /** 组件的初始数据*/
    data: {
        isSubAble: true,      //是否可见减 
        isAddAble: true,    //是否可加  
        minNum: 1,           //最小值
        maxNum: 999999      //最大值      微信解析infinity为null?
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //减
        sub: function () {
            if (this.data.isSubAble) {
                this.setData({
                    num: this.data.num - 1,
                    isAddAble: true
                });
            };
            //限制最小值
            if (this.data.num <= this.data.minNum) {
                this.setData({
                    isSubAble: false,
                    num: this.data.minNum
                });
            }
        },
        //加
        add: function () {
            if (this.data.isAddAble) {
                this.setData({
                    num: this.data.num + 1,
                    isSubAble: true
                });
            };
            //限制最大值
            if (this.data.maxNum <= this.data.num) {
                this.setData({
                    isAddAble: false,
                    num: this.data.maxNum
                });
            }
        }
    }
})
