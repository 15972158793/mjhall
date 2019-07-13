/**
 * Created by Administrator on 2017-11-27.
 */


gameclass.mod_bank = gameclass.mod_base.extend({
    rankData:null,
    playerData:null,

    ctor:function(){

    },

    saveMoney:function(data,func){
        var _this = this;
        this.sendhttp("savegold",data,function(retdata,temp,recvdata){
            cc.log(retdata);
            if(func){
                func(retdata)
            }
        })
    },

    getMoney:function(data,func){
        var _this = this;
        this.sendhttp('drawgold',data,function(retdata,temp,recvdata){
            cc.log(retdata);
            if(func){
                func(retdata);
            }
        })
    }
});



gameclass.bank = gameclass.baseui.extend({
    node:null,
    selectType:null,

    ctor: function () {
        this._super();
        this.selectType = 0;
        this.saveMoney = 0;
        this.getMoney = 0;
    },

    show:function(){
        this.node = this.game.uimgr.createnode(res.bank,true);
        this.addChild(this.node);

        this.mod_bank = new gameclass.mod_bank();
        this.mod_bank.setgame(this.game);

        var _this = this;
        gameclass.createbtnpress(this.node, "btn_exit", function () {
            _this.game.uimgr.closeui("gameclass.bank");
        });
        gameclass.createbtnpress(this.node, "btn_chongzhi", function () {
            _this.game.uimgr.showui("gameclass.goldShop");
        });
        cc.log(this.game.modmgr.mod_login.logindata);

        ccui.helper.seekWidgetByName(this.node,"total").setString(this.game.modmgr.mod_login.logindata.gold);
        ccui.helper.seekWidgetByName(this.node,"save").setString(this.game.modmgr.mod_login.logindata.savegold);
        ccui.helper.seekWidgetByName(this.node,"curSave").setString(0);

        this.panle = ccui.helper.seekWidgetByName(this.node,"Panel_12");
        for(var i = 0;i < this.panle.getChildrenCount();i++){
            var _node = this.panle.getChildren()[i];
            _node.setTag(100+i);
            _node.setTouchEnabled(true);
            _node.addTouchEventListener(function(sender,type){
                if(type != ccui.Widget.TOUCH_ENDED) return;
                _this.selectType = sender.getTag()-100;
                _this.changeShow();
            })
        }

        this.mySlider = ccui.helper.seekWidgetByName(this.node,"Slider_1");
        this.mySlider.addEventListener(function(sender,type){
            if(_this.selectType == 0){
                _this.saveMoney = parseInt(_this.game.modmgr.mod_login.logindata.gold * (sender.getPercent()/100));
                ccui.helper.seekWidgetByName(_this.node,"curSave").setString(_this.saveMoney);
            }else{
                _this.getMoney = parseInt(_this.game.modmgr.mod_login.logindata.savegold * (sender.getPercent()/100));
                ccui.helper.seekWidgetByName(_this.node,"curSave").setString(_this.getMoney);
            }
        });

        ccui.helper.seekWidgetByName(this.node,"btn_cun").addTouchEventListener(function(sender,type){
            if(type != ccui.Widget.TOUCH_ENDED) return;
            if(_this.game.modmgr.mod_login.logindata.gold <= 5000){
                gameclass.showText("使用银行库存金币,需随身金币大于5000");
                return;
            }
            var data = {"uid":_this.game.modmgr.mod_login.logindata.uid , "gold":parseInt(_this.game.modmgr.mod_login.logindata.gold * (_this.mySlider.getPercent()/100)), "unionid":mod_userdefault.globaldata.code};
            _this.mod_bank.saveMoney(data,function(retdata){
                _this.game.modmgr.mod_login.logindata.gold = retdata.gold;
                _this.game.modmgr.mod_login.logindata.savegold = retdata.savegold;
                ccui.helper.seekWidgetByName(_this.node,"total").setString(retdata.gold);
                ccui.helper.seekWidgetByName(_this.node,"save").setString(retdata.savegold);
                gameclass.showText("您的金钱存入成功");
                _this.game.uimgr.updateUIMsg("updcard");
                _this.changeShow();
            })
        });
        ccui.helper.seekWidgetByName(this.node,"btn_qu").addTouchEventListener(function(sender,type){
            if(type != ccui.Widget.TOUCH_ENDED) return;
            var data = {"uid":_this.game.modmgr.mod_login.logindata.uid,"gold":parseInt(_this.game.modmgr.mod_login.logindata.savegold * (_this.mySlider.getPercent()/100)), "unionid":mod_userdefault.globaldata.code};
            _this.mod_bank.getMoney(data,function(retdata){
                _this.game.modmgr.mod_login.logindata.gold = retdata.gold;
                _this.game.modmgr.mod_login.logindata.savegold = retdata.savegold;
                ccui.helper.seekWidgetByName(_this.node,"total").setString(retdata.gold);
                ccui.helper.seekWidgetByName(_this.node,"save").setString(retdata.savegold);
                gameclass.showText("您的金钱取出成功");
                _this.game.uimgr.updateUIMsg("updcard");
                _this.changeShow();
            })
        });
        this.changeShow();
    },

    setEnterance:function(type){
        if(type){
            this.selectType = type;
            this.changeShow();
            ccui.helper.seekWidgetByName(this.node,"Panel_cun").setTouchEnabled(false);
        }
    },

    changeShow:function(){
        for(var i = 0;i < this.panle.getChildrenCount();i++){
            var _node = this.panle.getChildren()[i];
            _node.getChildByName("select").setVisible(i==this.selectType);
            _node.getChildByName("noselect").setVisible(!(i==this.selectType));
        }
        if(this.selectType == 0){
            ccui.helper.seekWidgetByName(this.node,"curSave").setString(parseInt(this.game.modmgr.mod_login.logindata.gold * this.mySlider.getPercent()/100));
        }else{
            ccui.helper.seekWidgetByName(this.node,"curSave").setString(parseInt(this.game.modmgr.mod_login.logindata.savegold * this.mySlider.getPercent()/100));
        }
    },

    updateUIMsg:function(msgtype){
        if(msgtype == "updcard") {
            var gold = ccui.helper.seekWidgetByName(this.node, "total");
            var text = gameclass.changeShow(this.game.modmgr.mod_login.logindata.gold);
            gold.setString(text);
        }
    },
})
