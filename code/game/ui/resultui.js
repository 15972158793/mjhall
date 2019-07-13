/**
 * Created by yang on 2016/11/17.
 */

gameclass.resultui = gameclass.baseui.extend({
    sprite: null,
    node:null,
    round:null,
    curtime:null,
    roomid:null,
    ctor: function () {
        this._super();
        this.shareing = false;
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.resultui,true);
        var _this = this;

        this.round = ccui.helper.seekWidgetByName(this.node, "round");
        this.curtime = ccui.helper.seekWidgetByName(this.node, "curtime");
        this.roomid = ccui.helper.seekWidgetByName(this.node, "roomid");

        var myDate = new Date();
        var str = myDate.Format("yy-MM-dd hh:mm");
        this.curtime.setString(str);

        gameclass.createbtnpress(this.node, "sharelayer", function () {
            //if (!_this.shareing)
                _this.sharelayer.setVisible(false);
        });

        this.addChild(this.node);

        var _this = this;
        gameclass.createbtnpress(this.node, "cancelbtn", function () {
            _this.game.uimgr.showui("gameclass.hallui");
            _this.game.uimgr.closeui("gameclass.resultui");
        });


        gameclass.createbtnpress(this.node, "okbtn", function () {
            gameclass.mod_platform.savescreen(function(url){
                if(window.wx)
                {
                    //alert(url);
                    url = JSON.parse(url);

                    if(url.error == 0){
                        _this.share(url.url);
                    }

                }
            });
        });

    },

    setData:function(mod_niuniu){
        this.mod_niuniu = mod_niuniu;

        this.roomid.setString("房间号:" + this.mod_niuniu.roominfo.roomid.toString());

        //var curstep = (this.mod_niuniu.roominfo.step + 1);
        //if (curstep > this.mod_niuniu.roominfo.maxstep){
        //    curstep = this.mod_niuniu.roominfo.maxstep;
        //}
        var curstep = this.mod_niuniu.roominfo.step;

        var win = 0;
        for(var i = 0; i < this.mod_niuniu.gameniuniuinfo.info.length; i++)
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
        for (var i = 0;i <5; i++){
            var playerbg = ccui.helper.seekWidgetByName(this.node, "player" + i);
            if (i < this.mod_niuniu.gameniuniuinfo.info.length) {
                var info = this.mod_niuniu.gameniuniuinfo.info[i];
                var player = this.mod_niuniu.roominfo.person[i];
                var result = this.mod_niuniu.endinfo[i];

                playerbg.setVisible(true);
                gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(playerbg, "icon"), player.imgurl, 0, 0, "im_headbg3");
                var name = ccui.helper.seekWidgetByName(playerbg, "name").setString(player.name);
                var id = ccui.helper.seekWidgetByName(playerbg, "id").setString(player.uid);
                var test = [];
                for (var j = 0; j < 6; j++) {
                    test[j] = ccui.helper.seekWidgetByName(playerbg, "text" + j);
                }
                test[0].setString(result.deal.toString());//
                test[1].setString(result.kill.toString());
                test[2].setString(result.dead.toString());
                test[3].setString(result.niu.toString());
                test[4].setString(result.win.toString());
                test[5].setString(result.score.toString());
                /*if(result.score > 0) {
                    test[5].setString("+" + result.score);
                    //test[5].setColor(cc.color(255, 0, 0));
                } else {
                    test[5].setString("" + result.score);
                    //test[5].setColor(cc.color(0, 255, 0));
                }*/
                if(this.mod_niuniu.endinfo[win].score==0){
                    ccui.helper.seekWidgetByName(playerbg, "win").setVisible(false);
                }else{
                    ccui.helper.seekWidgetByName(playerbg, "win").setVisible(win == i);
                }
            }else{
                playerbg.setVisible(false);
            }
        }
    }
});

gameclass.resultui.prototype.share = function(url){
    gameclass.mod_platform.wxsharelink("牛牛结算", "战绩", url);
};