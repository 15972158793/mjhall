gameclass.ptjoneresultui = gameclass.baseui.extend({
    mod_tpj:null,
    ctor: function () {
        this._super();
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.pintianjiuoneresult,true);
        var rootbg = ccui.helper.seekWidgetByName(this.node, "root");
        var act1 = cc.moveTo(0.4,cc.p(0,-30));
        var act2 = cc.moveTo(0.2,cc.p(0,30));
        var act3 = cc.moveTo(0.2,cc.p(0,0));
        var seq = cc.sequence(act1,act2,act3, cc.callFunc(function () { }));
        rootbg.runAction(seq);
        this.addChild(this.node);

    },
    setmodttz: function (ptjdatamsg,mod_ttz,groupstable) {
        var self = this;
        this.isbomb = mod_ttz.roominfo.param2%10;
        this.isdjnn = Math.ceil(mod_ttz.roominfo.param2/10);
        this.isguizi = Math.ceil(mod_ttz.roominfo.param2/100);
        this.istjw = Math.ceil(mod_ttz.roominfo.param2/1000);

        gameclass.createbtnpress(self.node, "sendReady", function () {
            self.game.uimgr.closeui("gameclass.ptjoneresultui");
            if(ptjdatamsg.step >= ptjdatamsg.maxstep)
            {
                self.game.uimgr.showui("gameclass.ptjallresultui").setmodttz(mod_ttz.roominfo.person, mod_ttz.byeData);
            }
            else{
                mod_ttz.gameready(true);
            }
        });

        var leng = ptjdatamsg.info.length;  var iswin = false;
        for(var i=0; i < leng; i++){
            var playerbg = ccui.helper.seekWidgetByName(self.node, "playerbg"+i);
            var imgurl = mod_ttz.roominfo.person[i].imgurl;
            gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(playerbg, "icon"), imgurl, 0, 0);
            if(ptjdatamsg.info[i].dealer){
                ccui.helper.seekWidgetByName(playerbg, "zhuang").setVisible(true);
            }
            else{
                ccui.helper.seekWidgetByName(playerbg, "zhuang").setVisible(false);
            }
            //ccui.helper.seekWidgetByName(playerbg, "score").setString(ptjdatamsg.info[i].score);
            ccui.helper.seekWidgetByName(playerbg, "playerid").setString("ID:"+ptjdatamsg.info[i].uid);
            ccui.helper.seekWidgetByName(playerbg, "playername").setString(ptjdatamsg.info[i].name);
            var ptjcardcount = ptjdatamsg.info[i].card.length;
            for(var j = 0 ; j < ptjcardcount; j++){
                var cardnodebg = ccui.helper.seekWidgetByName(playerbg, "cardbgnode");
                var cardImage = new ccui.ImageView(res.ptj_cardshubg);
                cardImage.setAnchorPoint(cc.p(0.5,0.5));
                cardImage.setScale(0.5);
                if(j >=2) {
                    cardImage.setRotation(90);
                    if(j == 2) cardImage.setPosition(80,15);
                    if(j == 3) cardImage.setPosition(80,-15);
                }else{
                    cardImage.setPositionX(j*30);
                }
                var strname = "ptj_dianimg_"+ptjdatamsg.info[i].card[j]+".png";
                var cardchild = new ccui.ImageView();
                cardchild.setAnchorPoint(cc.p(0,0));
                cardchild.loadTexture(strname,ccui.Widget.PLIST_TEXTURE);
                //cardchild.initWithSpriteFrameName(strname);
                cardchild.setPosition(cc.p(6,9));
                cardImage.addChild(cardchild);
                cardnodebg.addChild(cardImage);
            }
            //var groupmax = []; var groupmin = [];
            //groupmax.push(ptjdatamsg.info[i].card[0]);
            //groupmax.push(ptjdatamsg.info[i].card[1]);
            var pngmax = self.showgroupname(ptjdatamsg.info[i].ct[0],groupstable)+".png";
            var maxname = ccui.helper.seekWidgetByName(playerbg, "ptjcard_1_0");
            maxname.initWithSpriteFrameName(pngmax);
            if(ptjcardcount > 2){
                //groupmin.push(ptjdatamsg.info[i].card[2]);
                //groupmin.push(ptjdatamsg.info[i].card[3]);
                var pngmin = self.showgroupname(ptjdatamsg.info[i].ct[1],groupstable)+".png";
                var minname = ccui.helper.seekWidgetByName(playerbg, "ptjcard_1_0_0");
                minname.initWithSpriteFrameName(pngmin);
            }else{
                ccui.helper.seekWidgetByName(playerbg, "ptjcard_1_0_0").setVisible(false);
            }
            var chair = mod_ttz.getchairbyuid(ptjdatamsg.info[i].uid);
            if(ptjdatamsg.info[i].score >= 0){
                if(chair == 0) iswin = true;
                ccui.helper.seekWidgetByName(playerbg, "ptj_AtlasLabel_0").setVisible(false);
                var atlas = ccui.helper.seekWidgetByName(playerbg, "ptj_AtlasLabel");
                atlas.setVisible(true);
                //var scoreStr = ptjdatamsg.info[i].score<10?"0"+String( ptjdatamsg.info[i].score):String(ptjdatamsg.info[i].score);
                var scoreStr = String(ptjdatamsg.info[i].score);
                atlas.setString(scoreStr);
            }else{
                var plus = ccui.helper.seekWidgetByName(playerbg, "ptj_plus");
                plus.setTexture(res.ptj_Atlasjian);
                ccui.helper.seekWidgetByName(playerbg, "ptj_AtlasLabel").setVisible(false);
                var atlas = ccui.helper.seekWidgetByName(playerbg, "ptj_AtlasLabel_0");
                //atlas.setTextureAtlas(res.ptj_Atlasfont2);
                atlas.setVisible(true);
                //var scoreStr = (Math.abs(ptjdatamsg.info[i].score)<10)? "0"+String(Math.abs(ptjdatamsg.info[i].score)): String(Math.abs(ptjdatamsg.info[i].score));
                var scoreStr = String(Math.abs(ptjdatamsg.info[i].score));
                atlas.setString(scoreStr);
            }
        }
        if(!iswin){
            var title = ccui.helper.seekWidgetByName(self.node, "winorlose");
            title.setTexture(res.ptj_losetitle);
        }
        for(var i = 0; i < 4; i++){
            var playerbg = ccui.helper.seekWidgetByName(self.node, "playerbg"+i);
            if(!iswin) {
                playerbg.loadTexture(res.ptj_losebg);
            }
            if(i >= leng) ccui.helper.seekWidgetByName(playerbg, "Panel_1").setVisible(false);
        }
    },
    showgroupname:function(groups,groupstable) {
        var tempgroups = []; var ptjimg = "";
        for(var i = 0; i < groupstable.length; i++){
            if(parseInt(groupstable[i].id) == groups) {
                var groupid = groups;
                ptjimg = groupstable[i].ptjimg;
                if(parseInt(groupstable[i].type) > 0){
                    var splitpngarr = [];
                    splitpngarr = ptjimg.split("#",2);
                    if(this.isbomb && groupstable[i].type == 1){
                        ptjimg = splitpngarr[1];
                    }else if(this.isguizi && groupstable[i].type == 3){
                        ptjimg = splitpngarr[1];
                    }else if(this.istjw && groupstable[i].type == 4){
                        ptjimg = splitpngarr[1];
                    }else if(this.isdjnn && groupstable[i].type == 2){
                        ptjimg = splitpngarr[1];
                    }else{
                        ptjimg = splitpngarr[0];
                    }
                }
                return ptjimg;
            }
        }
        return "ptj_bi_10";
    }
});