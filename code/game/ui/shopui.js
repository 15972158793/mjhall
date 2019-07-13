/**
 * Created by yang on 2016/11/16.
 */

gameclass.shopui = gameclass.baseui.extend({
    node:null,
    gold:null,
    gem:null,
    charm:null,
    selectindex:null,
    ctor: function () {
        this._super();
    },
    show:function(){
        var _this = this;
        this.node = this.game.uimgr.createnode(res.shopui,true);

        this.addChild(this.node);

        this.gold = ccui.helper.seekWidgetByName(this.node, "gold");
        this.gem = ccui.helper.seekWidgetByName(this.node, "gem");
        this.charm = ccui.helper.seekWidgetByName(this.node, "charm");

        var buyFunc = function() {
            this.game.modmgr.mod_center.buyItem(1000 + _this.selectindex);
        };

        var cellFunc = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    _this.selectindex = sender.getTag();
                    _this.game.uimgr.showui("gameclass.msgboxui");
                    _this.game.uimgr.uis["gameclass.msgboxui"].setString("是否花费" + getcsvmgr.csv_item[1000 + _this.selectindex + "_cost"] + "钻石购买" + getcsvmgr.csv_item[1000 + _this.selectindex + "_num"] + getcsvmgr.csv_item[1000 + _this.selectindex + "_name"], buyFunc);
                    break;
            }
        };

        for(var i = 1; i <= 6; i++) {
            var cell = ccui.helper.seekWidgetByName(this.node, "goldcell" + i);
            cell.setTag(i);
            ccui.helper.seekWidgetByName(cell, "num").setString(getcsvmgr.csv_item[1000 + i + "_num"]);
            ccui.helper.seekWidgetByName(cell, "cost").setString(getcsvmgr.csv_item[1000 + i + "_cost"]);
            cell.addTouchEventListener(cellFunc);
        }

        gameclass.createbtnpress(this.node, "close", function () {
            _this.game.uimgr.closeui("gameclass.shopui");
        });

        this.updateMoney();
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
});