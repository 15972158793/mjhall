/**
 * Created by yang on 2016/11/14.
 */
gameclass.resultoneui = gameclass.baseui.extend({
    sprite: null,
    node:null,
    mod_niuniu:null,
    niuniutable:null,
    ctor: function () {
        this._super();
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.resultoneui,true);

        this.addChild(this.node);
    },
    setniuniumod: function (_mod_niuniui,_niuniutable,data) {
        this.mod_niuniu = _mod_niuniui;
        this.niuniutable = _niuniutable;

        var _this = this;
        gameclass.createbtnpress(this.node, "sendReady", function () {
            if( _this.mod_niuniu.isover){
                _this.game.uimgr.showui("gameclass.resultui");
                _this.game.uimgr.uis["gameclass.resultui"].setData(_this.mod_niuniu);
            }
            _this.game.uimgr.closeui("gameclass.resultoneui");
            _this.mod_niuniu.gameready();
        });

        ccui.helper.seekWidgetByName(this.node, "roomid").setString("房间号:" + this.mod_niuniu.roominfo.roomid);

        var myDate = new Date();
        var str = myDate.Format("yy-MM-dd hh:mm");
        ccui.helper.seekWidgetByName(this.node, "time").setString(str);

        var curstep = this.mod_niuniu.roominfo.step;
        if (curstep > this.mod_niuniu.roominfo.maxstep){
            curstep = this.mod_niuniu.roominfo.maxstep;
        } else if(curstep == 0) {
            curstep = 1;
        }
        ccui.helper.seekWidgetByName(this.node, "step").setString("局数:" + curstep + "/" + this.mod_niuniu.roominfo.maxstep);

        var lst = [];
        var lstplayer = [];

        for (var i = 0;i < this.mod_niuniu.gameniuniuinfo.info.length; i++){
            var data = this.mod_niuniu.gameniuniuinfo.info[i];
            if (data.dealer){
                lst[0] = data;
                lstplayer[0] = this.mod_niuniu.roominfo.person[i];
            }
        }
        for (var i = 0;i < this.mod_niuniu.gameniuniuinfo.info.length; i++) {
            var data = this.mod_niuniu.gameniuniuinfo.info[i];
            if (!data.dealer) {
                lst[lst.length] = data;
                lstplayer[lstplayer.length] = this.mod_niuniu.roominfo.person[i];
            }
        }

        for (var i = 0;i < 5; i++){
            var playerbg = ccui.helper.seekWidgetByName(this.node, "playerbg" + i);
            if (i < lst.length){
                var data = lst[i];
                var player = lstplayer[i];
                playerbg.setVisible(true);
                gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(playerbg, "icon"), player.imgurl, 0, 0,"im_headbg3");
                ccui.helper.seekWidgetByName(playerbg, "playername").setString(player.name);
                ccui.helper.seekWidgetByName(playerbg, "id").setString("ID:" + player.uid);
                ccui.helper.seekWidgetByName(playerbg, "zhuang").setVisible(data.dealer);
                var cnode = ccui.helper.seekWidgetByName(playerbg, "cnode");
                for(var j = 0;j < 5; j++){
                    var card = data.card[j];
                    var spr = this.niuniutable.crateBtnCard(card);
                    spr.setScale(0.7);
                    spr.setPositionX(j * 22);
                    cnode.addChild(spr);
                }

                var tempspr = cc.Sprite.create();
                tempspr.initWithSpriteFrameName("nn331_img_niu" +data.type+ ".png");
                cnode.addChild(tempspr);
                tempspr.setScale(0.45);
                tempspr.setPosition(38.72, -25.44);

                var score = ccui.helper.seekWidgetByName(playerbg, "score");
                if(data.score > 0) {
                    score.setString("+" + data.score);
                    //score.setColor(cc.color(255, 0, 0));
                } else {
                    score.setString("" + data.score);
                    //score.setColor(cc.color(0, 255, 0));
                }
            }else{
                playerbg.setVisible(false);
            }
        }
    }
});