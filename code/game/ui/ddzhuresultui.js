/**
 * Created by yang on 2016/11/17.
 */

gameclass.ddzhuresultui = gameclass.baseui.extend({
    sprite: null,
    node:null,
    round:null,
    roomnum:null,
    curtime:null,
    ctor: function () {
        this._super();
        this.shareing = false;
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.ddzhuresultui,true);
        var _this = this;

        this.round = ccui.helper.seekWidgetByName(this.node, "round");
        this.roomnum = ccui.helper.seekWidgetByName(this.node, "roomnum");

        this.curtime = ccui.helper.seekWidgetByName(this.node, "curtime");
        var myDate = new Date();
        var str = myDate.Format("MM/dd hh:mm");
        this.curtime.setString("当前时间:" + str);

        this.addChild(this.node);

        var _this = this;
        gameclass.createbtnpress(this.node, "cancelbtn", function () {
            _this.game.uimgr.showui("gameclass.hallui");
            _this.game.uimgr.closeui("gameclass.ddzhuresultui");
        });


        gameclass.createbtnpress(this.node, "okbtn", function () {
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
    },
    setData:function(mod_ddzhu){
        var data = [];
        var info = mod_ddzhu.endinfo.info;
        for(var i = 0;  i < mod_ddzhu.roominfo.person.length ; i++ ){
            for(var j = 0; j < mod_ddzhu.endinfo.info.length ;j++){
                if(info[j] && info[j].uid == mod_ddzhu.roominfo.person[i].uid  ){
                    data.push({
                        icon:mod_ddzhu.roominfo.person[i].imgurl,
                        uid:mod_ddzhu.roominfo.person[i].uid,
                        name:mod_ddzhu.roominfo.person[i].name,
                        high:info[j].high,
                        boom:info[j].boom,
                        win:info[j].win,
                        deal:info[j].deal,
                        score:info[j].score
                    });
                    break;
                }
            }
        }

        var icon = [];
        var step = mod_ddzhu.roominfo.step;
        if(step > mod_ddzhu.roominfo.maxstep) step = mod_ddzhu.roominfo.maxstep;
        this.round.setString("局数:"+step + "/"+mod_ddzhu.roominfo.maxstep );
        this.roomnum.setString("房间号:"+mod_ddzhu.roominfo.roomid);
        var winnerScore = 0,winnerIndex = -1;
        for(var i = 0;i <data.length; i++){
            if(data[i].score > winnerScore && data[i].score > 0){
                winnerScore = data[i].score;
                winnerIndex = i;
            }
        }
        for (var i = 0;i < data.length; i++){
            var playerNode = ccui.helper.seekWidgetByName(this.node,"player"+i);
            ccui.helper.seekWidgetByName(playerNode, "name").setString(data[i].name);
            ccui.helper.seekWidgetByName(playerNode, "id").setString("ID："+data[i].uid);
            ccui.helper.seekWidgetByName(playerNode, "high").setString("单局最高："+data[i].high);
            ccui.helper.seekWidgetByName(playerNode, "boom").setString("炸弹次数："+data[i].boom);
            ccui.helper.seekWidgetByName(playerNode, "win").setString("胜利局数："+data[i].win);
            ccui.helper.seekWidgetByName(playerNode, "deal").setString("地主次数："+data[i].deal);
            ccui.helper.seekWidgetByName(playerNode, "score").setString(data[i].score);
            ccui.helper.seekWidgetByName(playerNode, "wintag").setVisible(i == winnerIndex);
            gameclass.mod_base.showtximg(playerNode.getChildByName("icon") ,data[i].icon || "",0,0,"im_headbg2");
        }
    }
});

gameclass.ddzhuresultui.prototype.share = function(url){
    gameclass.mod_platform.wxsharelink("斗地主结算","战绩",url);
};