/**
 * Created by yang on 2016/11/17.
 */

gameclass.pdkresultui = gameclass.baseui.extend({
    sprite: null,
    node:null,
    sharelayer:null,
    chulitu:null,
    shareing:null,
    round:null,
    roomnum:null,
    curtime:null,
    ctor: function () {
        this._super();
        this.shareing = false;
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.pdkresultui,true);
        var _this = this;

        this.sharelayer =  ccui.helper.seekWidgetByName(this.node, "sharelayer");
        this.sharelayer.setVisible(false);

        this.chulitu = ccui.helper.seekWidgetByName(this.node, "chulitu");

        this.round = ccui.helper.seekWidgetByName(this.node, "round");
        this.roomid = ccui.helper.seekWidgetByName(this.node, "roomid");

        this.curtime = ccui.helper.seekWidgetByName(this.node, "curtime");
        var myDate = new Date();
        var str = myDate.Format("MM/dd hh:mm");
        this.curtime.setString(str);

        gameclass.createbtnpress(this.node, "sharelayer", function () {
            //if (!_this.shareing)
            _this.sharelayer.setVisible(false);
        });

        this.addChild(this.node);

        var _this = this;
        gameclass.createbtnpress(this.node, "cancelbtn", function () {
            _this.game.uimgr.showui("gameclass.hallui");
            _this.game.uimgr.closeui("gameclass.pdktable");
            _this.game.uimgr.closeui("gameclass.pdkresultui");
        });


        gameclass.createbtnpress(this.node, "okbtn", function () {
            gameclass.mod_platform.savescreen(function(url){
                if(window.wx)
                {//
                    //alert(url);
                    url = JSON.parse(url);

                    if(url.error == 0){
                        _this.share(url.url);
                        _this.chulitu.setString("处理完成");
                    }
                    _this.shareing = false;
                    //_this.sharelayer.setVisible(true);
                }
            },function(){
                if(window.wx) {
                    _this.sharelayer.setVisible(true);
                }
            });

            if(window.wx)
            {
                _this.chulitu.setString("图片正在处理中");
                //_this.sharelayer.setVisible(true);
                _this.shareing = true;
            }
        });

    },
    setData:function(mod_pdk,table){
        //this.mod_pdk = data;
        var data = [];
        var info = mod_pdk.endinfo.info;
        var tmpstr="";
        for(var i=0;i<table.createinfo.length;i++)
        {

            if(table.createinfo[i]){
                if(i==0){
                    tmpstr+=table.createinfo[i];
                }else{
                    tmpstr+="," + table.createinfo[i];
                }
            }
        }

        ccui.helper.seekWidgetByName(this.node, "roominfo1").setString(tmpstr);
        for(var i = 0;  i<mod_pdk.roominfo.person.length ; i++ ){
            for(var j = 0; j<mod_pdk.endinfo.info.length ;j++){
                if(info[j].uid == mod_pdk.roominfo.person[i].uid  ){
                    data.push({
                        icon:mod_pdk.roominfo.person[i].imgurl,
                        uid:mod_pdk.roominfo.person[i].uid,
                        name:mod_pdk.roominfo.person[i].name,
                        //high:info[j].high,
                        maxscore:info[j].maxscore,
                        winnum:info[j].winnum,
                        allboom:info[j].allboom,
                        loser:info[j].loser,
                        //deal:info[j].deal,
                        score:info[j].score
                    });
                    break;
                }
            }
        }
        /*var curstep = (this.mod_pdk.roominfo.step + 1);
        if (curstep > this.mod_pdk.roominfo.maxstep){
            curstep = this.mod_pdk.roominfo.maxstep;
        }*/
        var icon = [];
        var step = mod_pdk.roominfo.step;
        if(step > mod_pdk.roominfo.maxstep) step = mod_pdk.roominfo.maxstep;
        this.round.setString("局数:"+step + "/"+mod_pdk.roominfo.maxstep );
        this.roomid.setString("房间号:"+mod_pdk.roominfo.roomid);
        var winnerScore = 0,winnerIndex = 0;
        for(var i = 0;i <data.length; i++){
            if(data[i].score > winnerScore){
                winnerScore = data[i].score;
                winnerIndex = i;
            }
        }
        var leng = data.length;
        for(var i = leng; i < 4; i++){
            ccui.helper.seekWidgetByName(this.node, "player"+i).setVisible(false);
        }
        for (var i = 0;i <data.length; i++){
            var player=ccui.helper.seekWidgetByName(this.node, "player" + i);
            //if (i < this.mod_pdk.gameniuniudata.data.length) {
            ccui.helper.seekWidgetByName(player, "name").setString(data[i].name);
            var id="ID:"+data[i].uid;
            ccui.helper.seekWidgetByName(player, "id").setString(id);
            //ccui.helper.seekWidgetByName(this.node, "high" + i).setString("单局最高："+data[i].high);
            ccui.helper.seekWidgetByName(player, "hightext").setString(data[i].maxscore);
            ccui.helper.seekWidgetByName(player, "wintext").setString(data[i].winnum);
            ccui.helper.seekWidgetByName(player, "boomtext").setString(data[i].allboom);
            ccui.helper.seekWidgetByName(player, "losetext").setString(data[i].loser);
            //ccui.helper.seekWidgetByName(this.node, "deal" + i).setString("地主次数："+data[i].deal);
            ccui.helper.seekWidgetByName(player, "score").setString(data[i].score);
            ccui.helper.seekWidgetByName(player, "host").setVisible(data[i].uid==mod_pdk.roominfo.host);
            ccui.helper.seekWidgetByName(player, "wintag").setVisible(i == winnerIndex);
            gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(player, "icon") ,data[i].icon || "",0,0,"im_headbg2");
        }

    }
});

gameclass.pdkresultui.prototype.share = function(url){
    gameclass.mod_platform.wxsharelink("跑得快结算","战绩",url);
};