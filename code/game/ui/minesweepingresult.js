gameclass.minesweepingresult = gameclass.baseui.extend({
    mod: null,
    ctor: function () {
        this._super();
    },

    show: function () {
        this.init();
    }
});

gameclass.minesweepingresult.prototype.init = function () {
    this.node = this.game.uimgr.createnode(res.minesweepingresult2,true);
    this.node.setPosition((cc.winSize.width - this.node.getContentSize().width)/2,0);
    this.addChild(this.node);
    var _this = this;

    gameclass.createbtnpress(this.node, "btn_share", function () {
        gameclass.mod_platform.savescreen(function(url){
            if(window.wx)
            {
                //alert(url);
                url = JSON.parse(url);

                if(url.error == 0){
                    _this.shareResult(url.url);
                }

            }
        });
    });

    gameclass.createbtnpress(this.node, "btn_confirm", function () {
        _this.game.uimgr.closeui("gameclass.minesweepingtable");
        _this.game.uimgr.closeui("gameclass.minesweepingresult");
        _this.game.uimgr.showui("gameclass.hallui");
    });


};

gameclass.minesweepingresult.prototype.setData = function (mod,data,type) { //type: 1单局 2全局
    var num = (mod.roominfo.param1 % 10) ? 10 : 5;
    var _this = this;
    gameclass.createbtnpress(this.node, "btn_next", function () {
        if(mod.isover){
            _this.game.uimgr.showui("gameclass.minesweepingresult",false,null,1);
            _this.game.uimgr.uis["gameclass.minesweepingresult"].setData(mod,mod.endinfo,2);
        }else{
            _this.game.uimgr.closeui("gameclass.minesweepingresult");
            mod.gameready();
        }

    });
    if(mod.bets == undefined){
        mod.bets = "--";
    }
    if(mod.boompos == undefined){
        mod.boompos = "--";
    }

    var mode = parseInt(mod.roominfo.param1 / 10) ? 1 : 2;

    ccui.helper.seekWidgetByName(this.node,"iv_owner").setVisible(mode === 2);

    if(type === 1){
        ccui.helper.seekWidgetByName(this.node,"tv_title").setString("单局结算");
        ccui.helper.seekWidgetByName(this.node,"btn_share").setVisible(false);
        ccui.helper.seekWidgetByName(this.node,"btn_confirm").setVisible(false);
        ccui.helper.seekWidgetByName(this.node,"btn_next").setVisible(true);
        ccui.helper.seekWidgetByName(this.node,"tv_info").setString("地雷:" + (num - mod.gameInfo.boomnum + 1) + "/" + num + "\n分值:" + mod.roominfo.param2);
        ccui.helper.seekWidgetByName(this.node,"tv_roomdetail").setString("赔率:" + mod.bets + "\n雷针:" + mod.boompos);

    } else {
        ccui.helper.seekWidgetByName(this.node,"tv_title").setString("全局结算");
        ccui.helper.seekWidgetByName(this.node,"btn_share").setVisible(true);
        ccui.helper.seekWidgetByName(this.node,"btn_confirm").setVisible(true);
        ccui.helper.seekWidgetByName(this.node,"btn_next").setVisible(false);

        var t = parseInt(mod.roominfo.param1 / 10) ? "自由埋雷   " :"房主埋雷   ";

        ccui.helper.seekWidgetByName(this.node,"tv_info").setString("房号:" + mod.roominfo.roomid + "\n" + new Date(data.time*1000).Format("MM/dd hh:mm"));
        ccui.helper.seekWidgetByName(this.node,"tv_roomdetail").setString("分值:" + mod.roominfo.param2 + "  赔率:" + mod.bets + "\n" + t + num + "颗雷");

    }

    for(var i = 0; i < gameclass.minesweepingtable.MAX_PLAYER;i++){
        var p = data.info[i];
        var item = ccui.helper.seekWidgetByName(this.node,"p" + (i + 1));
        if(p){
            item.setVisible(true);
            this.showImg(ccui.helper.seekWidgetByName(item,"iv_head"),mod.roominfo.person[i].imgurl);
            //ccui.helper.seekWidgetByName(item,"tv_name").setString(mod.roominfo.person[i].name);
            var n = mod.roominfo.person[i].name.substring(0,8);
            ccui.helper.seekWidgetByName(item,"tv_name").setString(n);

            var total = ccui.helper.seekWidgetByName(item,"tv_total");
            var fail = ccui.helper.seekWidgetByName(item,"tv_fail");
            var suc = ccui.helper.seekWidgetByName(item,"tv_suc");
            var detail = ccui.helper.seekWidgetByName(item,"tv_detail");
            ccui.helper.seekWidgetByName(item,"iv_best").setVisible(p.bestscore);

            if(type === 1){
                if(mode == 1){
                    ccui.helper.seekWidgetByName(item,"iv_boom").setVisible(p.dealer);
                } else {
                    ccui.helper.seekWidgetByName(item,"iv_boom").setVisible(false);
                }

                if(p.boomscore < 0){
                    suc.setVisible(false);
                    fail.setVisible(true);
                    detail.setVisible(false);
                    fail.setString("中雷:" + p.boomscore);


                } else {
                    suc.setVisible(true);
                    fail.setVisible(false);
                    detail.setVisible(false);
                }

                total.setString(p.score.toFixed(2));
                if(p.score > 0){
                    total.setTextColor(cc.color(0x5e,0xe8,0xff));
                } else {
                    total.setTextColor(cc.color(0xff,0,0));
                }

            } else {
                suc.setVisible(false);
                fail.setVisible(false);
                detail.setVisible(true);

                detail.setString("埋雷 " + p.setboomnum + " 次  中雷 " + p.getboomnum + " 次");
                total.setString(p.total.toFixed(2));
                if(p.total > 0){
                    total.setTextColor(cc.color(0x5e,0xe8,0xff));
                } else {
                    total.setTextColor(cc.color(0xff,0,0));
                }
            }
        } else {
            item.setVisible(false);
        }
    }
};

gameclass.minesweepingresult.prototype.showImg = function(node,url){
    gameclass.mod_base.showtximg(node, url, 0, 0, "sl_bg_head@2x", false);
    ccui.helper.seekWidgetByName(node,"iv_border").setLocalZOrder(1000);

};