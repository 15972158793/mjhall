/**
 * Created by yang on 2016/11/14.
 */
gameclass.ttzallresultui = gameclass.baseui.extend({
    node:null,
    sharelayer:null,
    ctor: function () {
        this._super();

    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.resultui,true);
        var _this = this;

        gameclass.createbtnpress(_this.node, "cancelbtn", function () {
            _this.game.uimgr.closeui("gameclass.ttzallresultui");
            _this.game.uimgr.showui("gameclass.hallui");
        });

        gameclass.createbtnpress(_this.node, "okbtn", function () {
            gameclass.mod_platform.savescreen(function(url){
                if(window.wx)
                {
                    url = JSON.parse(url);

                    if(url.error == 0){
                        _this.share(url.url);
                    }

                }
            });
        });

        this.addChild(_this.node);
    },
    setmodttz: function (persons,byeData) {
        var self = this;
        ccui.helper.seekWidgetByName(self.node, "roomid").setString("房号: "+byeData.roomid);
        ccui.helper.seekWidgetByName(self.node, "round").setString("局数: "+byeData.step+"/"+byeData.maxstep);
        var titiletime =  ccui.helper.seekWidgetByName(self.node, "curtime");
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

        if(!byeData.info) return;

        var leng = byeData.info.length;
        for(var i = leng; i < 5; i++){
            ccui.helper.seekWidgetByName(self.node, "player"+i).setVisible(false);
        }
        var scorelist = [];
        for(var i = 0; i < leng; i++){
            scorelist.push(byeData.info[i].score);
        }
        scorelist.sort(function(a,b){return b-a;})
        //cc.log(scorelist[0],byeData.info);
        for(var i=0; i < leng; i++){
            var playerbg = ccui.helper.seekWidgetByName(self.node, "player"+i);

            ccui.helper.seekWidgetByName(playerbg, "Text_15_0_3").setString("豹子次数:");
            if(byeData.info[i]){
                ccui.helper.seekWidgetByName(playerbg, "id").setString("ID:"+byeData.info[i].uid);
                ccui.helper.seekWidgetByName(playerbg, "name").setString(""+byeData.info[i].name);
                ccui.helper.seekWidgetByName(playerbg, "text0").setString(""+byeData.info[i].dealnum);
                ccui.helper.seekWidgetByName(playerbg, "text1").setString(""+byeData.info[i].winallnum);
                ccui.helper.seekWidgetByName(playerbg, "text2").setString(""+byeData.info[i].loseallnum);
                ccui.helper.seekWidgetByName(playerbg, "text3").setString(""+byeData.info[i].numbaozi);
                ccui.helper.seekWidgetByName(playerbg, "text4").setString(""+byeData.info[i].winnum);
                ccui.helper.seekWidgetByName(playerbg, "text5").setString(""+byeData.info[i].score);
                var bool = false;
                if(scorelist[0] == byeData.info[i].score && byeData.info[i].score > 0) bool = true;
                ccui.helper.seekWidgetByName(playerbg, "win").setVisible(bool);
            }
            var imgurl = persons[i].imgurl;
            gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(playerbg, "icon"), imgurl, 0, 0);
        }
    }
});