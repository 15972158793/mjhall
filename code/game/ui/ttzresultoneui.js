/**
 * Created by yang on 2016/11/14.
 */
gameclass.ttzresultoneui = gameclass.baseui.extend({
    ttztable:null,
    ctor: function () {
        this._super();
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.resultoneui,true);

        this.addChild(this.node);

    },
    setmodttz: function (ttzdata,mod_ttz) {
        var self = this;
        var ready = ccui.helper.seekWidgetByName(self.node, "sendReady");
        ready.setTouchEnabled(true);
        gameclass.createbtnpress(self.node, "sendReady", function () {
            self.game.uimgr.closeui("gameclass.ttzresultoneui");
            if(ttzdata.step >= ttzdata.maxstep)
            {
                self.game.uimgr.showui("gameclass.ttzallresultui").setmodttz(mod_ttz.roominfo.person, mod_ttz.byeData);
            }
            else{
                mod_ttz.gameready(true);
                ready.setTouchEnabled(false);
            }
        });

        ccui.helper.seekWidgetByName(self.node, "roomid").setString("房号: "+ttzdata.roomid);
        ccui.helper.seekWidgetByName(self.node, "step").setString("局数: "+ttzdata.step+"/"+ttzdata.maxstep);

        var titiletime =  ccui.helper.seekWidgetByName(self.node, "time");
        var reftime = function () {
            var myDate = new Date();
            var str = myDate.Format("MM-dd hh:mm");
            titiletime.setString(str);
        };
        reftime();
        var func = cc.repeatForever(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            reftime();
        })));
        titiletime.runAction(func);
        //playerbg0
        var createcardfun = function ( cardnum, px ) {
            var cardspr = new cc.Sprite(res.ttz_bg_frontcard);
            var strname = "ttz_card_"+cardnum;
            var cardchild = new cc.Sprite(res[strname]);
            cardchild.setAnchorPoint(0,0);
            cardchild.setPositionY(15);
            cardspr.addChild(cardchild);
            cardspr.setPositionX(px);
            cardnode.addChild(cardspr);
        }
        var leng = ttzdata.info.length;
        for(var i = leng; i < 5; i++){
            ccui.helper.seekWidgetByName(self.node, "playerbg"+i).setVisible(false);
        }
        for(var i=0; i < leng; i++){
            var playerbg = ccui.helper.seekWidgetByName(self.node, "playerbg"+i);
            var imgurl = mod_ttz.roominfo.person[i].imgurl;
            gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(playerbg, "icon"), imgurl, 0, 0);
            if(ttzdata.dealeruid == ttzdata.info[i].uid){
                ccui.helper.seekWidgetByName(playerbg, "zhuang").setVisible(true);
            }
            else{
                ccui.helper.seekWidgetByName(playerbg, "zhuang").setVisible(false);
            }
            ccui.helper.seekWidgetByName(playerbg, "score").setString(ttzdata.info[i].Total);
            ccui.helper.seekWidgetByName(playerbg, "id").setString("ID:"+ttzdata.info[i].uid);
            ccui.helper.seekWidgetByName(playerbg, "playername").setString(ttzdata.info[i].name);

            var cardnode = ccui.helper.seekWidgetByName(playerbg, "cnode");
            createcardfun(ttzdata.info[i].card[0],0);
            createcardfun(ttzdata.info[i].card[1],71);
        }
    }
});