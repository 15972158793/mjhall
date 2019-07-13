/**
 * Created by yang on 2016/11/9.
 */

gameclass.goldhall = gameclass.baseui.extend({
    node:null,
    gold:null,
    gem:null,
    charm:null,
    p1:null,
    ctor: function () {
        this._super();
    },
    show:function(){
        //if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS) {
        //    cc.spriteFrameCache.removeUnusedSpriteFrames();
        //    cc.textureCache.removeUnusedTextures();
        //}

        this.node = this.game.uimgr.createnode(res.GoldHall,true);
        this.addChild(this.node);

        this.p1 = ccui.helper.seekWidgetByName(this.node, "p1");

        this.gold = ccui.helper.seekWidgetByName(this.node, "gold");
        this.gem = ccui.helper.seekWidgetByName(this.node, "gem");
        this.charm = ccui.helper.seekWidgetByName(this.node, "charm");

        ccui.helper.seekWidgetByName(this.node, "id").setString("ID:" + this.game.modmgr.mod_login.logindata.uid);
        ccui.helper.seekWidgetByName(this.node, "name").setString(this.game.modmgr.mod_login.logindata.name);

        gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(this.node, "head"), this.game.modmgr.mod_login.logindata.imgurl, 0, 0, "im_headbg2");

        var _this = this;

        this.updateMoney();

        gameclass.createbtnpress(this.node, "back", function () {
            _this.game.uimgr.showui("gameclass.hallui");
            _this.game.uimgr.closeui("gameclass.goldhall");
        });

        gameclass.createbtnpress(this.node, "btn_bairenniuniu", function () {
            _this.game.modmgr.mod_center.joinGoldRoom(1001);
        });

        gameclass.createbtnpress(this.node, "btnSetting_3", function () {
            _this.game.uimgr.showui("gameclass.shopui");
        });
    },
    updateMoney : function() {
        this.gold.setString(this.game.modmgr.mod_userbase.userbase.money);
        this.gem.setString(this.game.modmgr.mod_userbase.userbase.gem);
        this.charm.setString(this.game.modmgr.mod_userbase.userbase.charm);
    },
    updateUIMsg:function(msgtype) {
        if(msgtype == "updatemoney") {
            this.updateMoney();
        }

        return false;
    },
    //updategonggao: function () {
    //    var gg = ccui.helper.seekWidgetByName(this.node, "pmdInfo");
    //    gg.setString(this.game.modmgr.mod_center.gonggao);
    //    gg.ignoreContentAdaptWithSize(true);
    //
    //    //gg.setPosition(cc.p(666,16));
    //
    //    gg.stopAllActions();
    //    var act = cc.repeatForever( cc.sequence(cc.moveTo(20,cc.p(0 - gg.getContentSize().width,gg.getPosition().y)),cc.moveTo(0,cc.p(ccui.helper.seekWidgetByName(this.node, "pmdBack").getContentSize().width,gg.getPosition().y))));
    //    gg.runAction(act);
    //},
});