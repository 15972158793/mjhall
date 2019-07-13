/**
 * Created by Administrator on 2017/3/11 0011.
 */

gameclass.recordBureau = gameclass.baseui.extend({
    gameType:0,
    groupstable:null,

    ctor: function () {
        this._super();
        this.getptjson();
    },

    show:function(){
        this.node = this.game.uimgr.createnode(res.RecordBureau,true);
        this.addChild(this.node);
        this.recorBureaulist = ccui.helper.seekWidgetByName(this.node, "ListView_1");
        gameclass.createbtnpress(this.node, "btn_colse", function () {
            this.game.uimgr.closeui("gameclass.recordBureau");
            this.game.uimgr.showui("gameclass.recordPlayList");
        });

    },
    setMod:function(mod){
        var _this = this;
        this.mod_record = mod;

        var data =  _this.mod_record.getBureauList();
        var arr  = data.children;
        arr.sort(function(a,b){
            return a.time>b.time;
        });

        _this.setClickItem(arr);
    },

    getDate:function(date){
        var d = new Date(date * 1000);    //根据时间戳生成的时间对象
        var date =
            //(d.getFullYear()) + "-" +
            (d.getMonth() + 1) + "-" +
            (d.getDate()) + " " +
            (d.getHours()) + ":" +
            (d.getMinutes());
            //(d.getSeconds());
        return date;
    },
    setClickItem:function(data){
        var _this = this;
        _this.gameType = _this.mod_record.curGameid;
        _this.recorBureaulist.removeAllItems();

        cc.log(data);
        var jushu = 1;
        for(var i = 0;i < data.length;i++){
            var listCell = this.game.uimgr.createnode(res.recordCell,true).getChildByName("Panel_1");
            listCell.removeFromParent(false);
            this.recorBureaulist.pushBackCustomItem(listCell);

            ccui.helper.seekWidgetByName(listCell,"item_text").setString("第"+jushu+"局");
            ccui.helper.seekWidgetByName(listCell,"time_text").setString("时间:"+this.getDate(data[i].time));
            jushu++;

            var infos = [];
            if( _this.gameType == gameclass.gameddz || _this.gameType == gameclass.gamelzddz || _this.gameType == gameclass.gameszp || _this.gameType == gameclass.gamekwx)
                infos = data[i].person;
            else
                infos = data[i].info;

            var len = infos.length;
            for(var j = 0;j<5;j++){
                var playerNode = ccui.helper.seekWidgetByName(listCell,"player"+j);
                playerNode.setVisible(j<len);
                if(j>len-1) continue;
                if(infos[j].head) gameclass.mod_base.showtximg(playerNode.getChildByName("icon"),infos[j].head,0,0,"im_headbg2");
                playerNode.getChildByName("nameStr").setString(infos[j].name);
                playerNode.getChildByName("numStr").setString(infos[j].score);
            }

            var btn_fx = ccui.helper.seekWidgetByName(listCell,"btn_share");
            btn_fx.bureauid = data[i].roomid;
            btn_fx.addTouchEventListener(_this.fx_touchEvent, _this);
            var roomid = parseInt(data[i].ot/100);

            var btn_hf = ccui.helper.seekWidgetByName(listCell, "btn_replay");
            btn_hf.addTouchEventListener(_this.hf_touchEvent, _this);

            btn_hf.bureauid = data[i].roomid;
            btn_hf.nn_time = data[i].time;//
            if(_this.mod_record.curGameid == gameclass.gameszp){
                btn_hf.nn_data = _this.mod_record.s_data;
            }
            else if(_this.mod_record.curGameid == gameclass.gameniuniu || _this.mod_record.curGameid == gameclass.gamesdb ||
                _this.mod_record.curGameid == gameclass.gamettz || _this.mod_record.curGameid == gameclass.gameptj ||  _this.mod_record.curGameid == gameclass.gamekwx) {
                var _data =  _this.mod_record.getBureauList();
                btn_hf.nn_data  = _data.children;
            }else{
                cc.log(_this.mod_record.curGameid);
                btn_hf.nn_data = data[i];
            }
        }
    },

    hf_touchEvent: function (sender, type) {
        var _this = this;
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                //cc.log("hf_touchEvent Touch Up"+sender.bureauid);
                _this.game.uimgr.closeui("gameclass.recordBureau");
                _this.game.uimgr.closeui("gameclass.hallui");
                _this.mod_record.setCurBureauid(sender.bureauid);
                if(_this.gameType == gameclass.gamettz){
                    _this.game.uimgr.showui("gameclass.ttzrecord").ttz_showRecord(sender.bureauid,sender.nn_data,sender.nn_time);
                }else if(_this.gameType == gameclass.gameddz){
                    _this.game.uimgr.showui("gameclass.ddzrecord").setMod(_this.mod_record);
                }else if(_this.gameType == gameclass.gameptj){
                    _this.game.uimgr.showui("gameclass.ptjrecord").ptj_showRecord(sender.bureauid,sender.nn_data,sender.nn_time,_this.groupstable);
                }else if(_this.gameType == gameclass.gamekwx){
                    //cc.log(sender.nn_data);
                    _this.game.uimgr.showui("gameclass.kwxRecord").setmod(_this.mod_record,sender.bureauid,sender.nn_data.length);
                }else{
                    var zhanji_data = sender.nn_data;
                    zhanji_data.curGameid = _this.gameType;
                    _this.game.uimgr.showui("gameclass.niuniurecord").showRecord_nn(sender.bureauid,zhanji_data,sender.nn_time);
                }
                break;
            default:
                break;
        }
    },

    fx_touchEvent: function (sender, type) {
        var _this = this;
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var uid = _this.game.modmgr.mod_login.logindata.uid;
                var playCode = String(_this.gameType+""+sender.bureauid+""+uid);
                var name = _this.game.modmgr.mod_login.logindata.name;

                var title = "";
                if(_this.gameType == gameclass.gameszp) title = "三张牌";
                else if(_this.gameType == gameclass.gameniuniu) title = "牛牛";
                else if(_this.gameType == gameclass.gameddz) title = "斗地主";
                else if(_this.gameType == gameclass.gamesdb) title = "十点半";
                else if(_this.gameType == gameclass.gameptj) title = "拼天九";
                else if(_this.gameType == gameclass.gamekwx) title = "卡五星";
                gameclass.mod_platform.invitefriend("玩家["+name+"]分享了一个回放码：["+playCode+"]，在大厅点击进入战绩页面，然后点击查看回放按钮，输入回放码点击确定后即可查看",
                    "http://www.hbyouyou.com/Down",
                    title+"_战绩分享");
                break;
            default:
                break;
        }
    },

    getptjson:function() {
        var _this = this;
        cc.loader.loadJson(res.pintianjiugroups,function(err,data){
            _this.groupstable = [];
            for(var ty in data){
                var obj = data[ty];
                //for(var i = 0 ; i < 10; i++){
                //    var group = "group"+(i+1);
                //    var splitarr = [];
                //    if(obj[group]) {
                //        splitarr = obj[group].split("#",2);
                //        obj[group] = splitarr;
                //    }else{
                //        break;
                //    }
                //}
                _this.groupstable.push(obj);
            }
        });
    }
});
