/**
 * Created by yang on 2016/11/17.
 */

gameclass.nysresultui = gameclass.baseui.extend({
    sprite: null,
    node:null,
    shareing:null,
    round:null,
    curtime:null,
    roomid:null,
    ctor: function () {
        this._super();
        this.shareing = false;
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.nysresultui,true);
        var _this = this;

        this.round = ccui.helper.seekWidgetByName(this.node, "step");
        this.curtime = ccui.helper.seekWidgetByName(this.node, "time");
        this.roomid = ccui.helper.seekWidgetByName(this.node, "roomid");
        this.difen = ccui.helper.seekWidgetByName(this.node, "diFen");
        var myDate = new Date();
        var str = myDate.Format("yy-MM-dd hh:mm");
        this.curtime.setString(str);
        this.addChild(this.node);

        var _this = this;
        gameclass.createbtnpress(this.node, "backBtn", function () {
            _this.game.uimgr.showui("gameclass.hallui");
            _this.game.uimgr.closeui("gameclass.nysresultui");
        });


        gameclass.createbtnpress(this.node, "shareBtn", function () {
            gameclass.mod_platform.savescreen(function(url){
                if(window.wx)
                {
                    //alert(url);
                    url = JSON.parse(url);

                    if(url.error == 0){
                        _this.share(url.url);
                    }

                    _this.shareing = false;
                    //_this.sharelayer.setVisible(true);
                }
            },function(){
                if(window.wx) {
                }
            });

            if(window.wx)
            {
                //_this.sharelayer.setVisible(true);
                _this.shareing = true;
            }
        });
    },
    setData:function(mod_niuniu){
        this.mod_niuniu = mod_niuniu;

        this.roomid.setString("房间号:" + this.mod_niuniu.roominfo.roomid.toString());
        var curstep = (this.mod_niuniu.roominfo.step + 1);
        if (curstep > this.mod_niuniu.roominfo.maxstep){
            curstep = this.mod_niuniu.roominfo.maxstep;
        }
        var diFenstr="";
        var _num=parseInt(this.mod_niuniu.roominfo.param1/1000000);
        if(_num==0){
            diFenstr="底分：1/2";
        }else if(_num==1){
            diFenstr="底分：2/4";
        }else if(_num==2){
            diFenstr="底分：3/6";
        }else if(_num==3){
            diFenstr="底分：4/8";
        }else if(_num==4){
            diFenstr="底分：5/10";
        }
        this.difen.setString(diFenstr);
        this.round.setString("局数："+curstep+"/"+this.mod_niuniu.roominfo.maxstep);
        var win = 0;
        for(var i = 0; i < this.mod_niuniu.roominfo.person.length; i++)
        {
            if(i == win) {
                continue;
            }
            if(this.mod_niuniu.endinfo[i].score < this.mod_niuniu.endinfo[win].score) {
                continue;
            }
            win = i;
        }

        this.round.setString("局数:" + curstep + "/" + this.mod_niuniu.roominfo.maxstep);
        var playerPanel=ccui.helper.seekWidgetByName(this.node, "playerPanel");
        for (var i = 0;i <8; i++){
            var playerbg = playerPanel.getChildren()[i];
            if (i < this.mod_niuniu.roominfo.person.length) {
                ccui.helper.seekWidgetByName(playerbg, "winer").setVisible(false);
                if(this.mod_niuniu.roominfo.person[i].uid==this.mod_niuniu.roominfo.host){
                    ccui.helper.seekWidgetByName(playerbg, "fangZhu").setVisible(true);
                }else{
                    ccui.helper.seekWidgetByName(playerbg, "fangZhu").setVisible(false);
                }
                var info = this.mod_niuniu.roominfo.person[i];
                var result = this.mod_niuniu.endinfo[i];
                playerbg.setVisible(true);
                gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(playerbg, "icon"), info.imgurl, 0, 0, "im_headbg3");
                ccui.helper.seekWidgetByName(playerbg, "playername").setString(info.name);
                ccui.helper.seekWidgetByName(playerbg, "id").setString(info.uid);
                ccui.helper.seekWidgetByName(playerbg, "score").setString(result.score.toString());
                if(result.score > 0) {
                    ccui.helper.seekWidgetByName(playerbg, "score").setString("+"+ccui.helper.seekWidgetByName(playerbg, "score").getString());
                    ccui.helper.seekWidgetByName(playerbg, "score").setTextColor(cc.color(255, 255, 0));
                } else {
                    ccui.helper.seekWidgetByName(playerbg, "score").setTextColor(cc.color(114, 129, 255));
                }

                //ccui.helper.seekWidgetByName(playerbg,"qiang").setString("抢庄次数:"+info.qz);
                //ccui.helper.seekWidgetByName(playerbg,"zhuang").setString("坐庄次数:"+info.zz);
                //ccui.helper.seekWidgetByName(playerbg,"tui").setString("推注次数:"+info.tz);
            }else{
                playerbg.setVisible(false);
            }
        }
        var maxNum=0;
        var maxIndex=-1;

        var minNum = 0;
        var minIndex=-1;
        for(var k=0;k<this.mod_niuniu.endinfo.length;k++){
            if(this.mod_niuniu.endinfo[k].score>maxNum){
                maxNum=this.mod_niuniu.endinfo[k].score;
                maxIndex=k;
            }
            if(this.mod_niuniu.endinfo[k].score<minNum){
                minNum=this.mod_niuniu.endinfo[k].score;
                minIndex = k;
            }
        }
        if(maxIndex >= 0){
            ccui.helper.seekWidgetByName(playerPanel.getChildren()[maxIndex], "winer").setVisible(true);
            ccui.helper.seekWidgetByName(playerPanel.getChildren()[maxIndex], "winer").loadTexture(res.nysDYJ,ccui.Widget.LOCAL_TEXTURE);
        }
        if(minIndex >=0){
            ccui.helper.seekWidgetByName(playerPanel.getChildren()[minIndex], "winer").setVisible(true);
            ccui.helper.seekWidgetByName(playerPanel.getChildren()[minIndex], "winer").loadTexture(res.nysTH,ccui.Widget.LOCAL_TEXTURE);
        }

    }
});

gameclass.nysresultui.prototype.share = function(url){
    gameclass.mod_platform.wxsharelink("傲世娱乐-牛元帅", "战绩", url);
};