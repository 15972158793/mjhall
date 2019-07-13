/**
 * Created by Administrator on 2017-11-4.
 */


gameclass.goldShop = gameclass.baseui.extend({
    node:null,
    btnArr:null,
    numArr:null,

    ctor: function () {
        this._super();
        this.numArr = [10,30,50,100,300,500,1000,2000];
    },

    show:function(){
        this.node = this.game.uimgr.createnode(res.goldShop,true);
        this.addChild(this.node);

        var _this = this;
        gameclass.createbtnpress(this.node, "btn_close", function () {
            _this.game.uimgr.closeui("gameclass.goldShop");
        });

        var panle = ccui.helper.seekWidgetByName(this.node,"Panel_1");
        var gold = ccui.helper.seekWidgetByName(this.node,"gold");
        var text = gameclass.changeShow(this.game.modmgr.mod_login.logindata.gold);
        gold.setString(text);

        this.btnArr = [];
        for(var i = 0;i < panle.getChildrenCount();i++ ){
            this.btnArr[i] = panle.getChildren()[i];
            var duihuan = this.numArr[i];
            if(i == 6) duihuan = 999;
            //var str = (gameclass.test=="true"?this.numArr[i]+"房卡":"¥"+duihuan);
            var str = "¥"+duihuan;
            var text = new ccui.Text(str, "res/Font/FZY4JW_0569.TTF",24);
            this.btnArr[i].addChild(text);
            this.btnArr[i].amount = this.numArr[i];
            text.setPosition(100,35);

            this.btnArr[i].addTouchEventListener(function(sender,type){
                if(type == ccui.Widget.TOUCH_ENDED){
                    if(gameclass.test == "true"){
                        //var data = {"uid":_this.game.modmgr.mod_login.logindata.uid,"type":1,"amount":sender.amount};
                        //_this.game.modmgr.mod_login.replaceCard(data,function(){
                        //
                        //});
                    }else{
                        //////////////////////////////////////////del at 20180228///////////////////////////////////////////////////
                        var name = encodeURI(_this.game.modmgr.mod_login.logindata.name);
                        cc.sys.openURL("http://asyl.190youxi.com/asqp_host/Pay/MobilePay/buyGold/uid/" + _this.game.modmgr.mod_login.logindata.uid + "/nickname/" + name + "/num/" + (sender.amount * 100));
                        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    }
                }
            })
        }
        if(gameclass.test == "true"){
            ccui.helper.seekWidgetByName(this.node,"title").setTexture(res.duihuanTitle);
        }

    },

    updateUIMsg : function(msgtype) {
        if(msgtype == "updcard") {
            var gold = ccui.helper.seekWidgetByName(this.node, "gold");
            var text = gameclass.changeShow(this.game.modmgr.mod_login.logindata.gold);
            gold.setString(text);
        }
    },

})
