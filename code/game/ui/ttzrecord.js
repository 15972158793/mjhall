/**
 * Created by Administrator on 2017/8/24 0024.
 */
gameclass.ttzrecord = gameclass.baseui.extend({
    node: null,
    curRoomid:0,
    curIndex:0,
    alldata:null,
    ctor: function () {
        this._super();
        this.alldata = [];
        //this.getptjson();
    },

    show: function () {
        this.node = this.game.uimgr.createnode(res.Ttz_record,true);
        this.addChild(this.node);
        var _this = this;
        gameclass.createbtnpress(_this.node, "btn_colse", function () {
            _this.game.uimgr.closeui("gameclass.ttzrecord");
            _this.game.uimgr.showui("gameclass.hallui");
        });
        gameclass.createbtnpress(this.node, "btn_xiaJu", function () {
            _this.curIndex = _this.curIndex-1;
            if(_this.curIndex < 0) _this.curIndex = _this.alldata.length-1;
            if(_this.alldata[_this.curIndex]) _this.showPlayer(_this.alldata[_this.curIndex]);
        });
        gameclass.createbtnpress(this.node, "btn_shangJu", function () {
            _this.curIndex = _this.curIndex+1;
            if( _this.curIndex >= _this.alldata.length) _this.curIndex = 0;
            if(_this.alldata[_this.curIndex]) _this.showPlayer(_this.alldata[_this.curIndex]);
        });
        gameclass.createbtnpress(this.node, "btn_share", function () {
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
    ttz_showRecord:function(curRoomid,data,curTime){
        this.alldata = data;
        //cc.log(curRoomid,data,curTime);
        if(!data){
            this.game.uimgr.showui("gameclass.hallui");
            this.game.uimgr.closeui("gameclass.ttzrecord");
            return;
        }
        if(curRoomid < 10000000){
            this.showToast("数据错误！");
            return;
        }
        var _this = this;
        _this.curRoomid = curRoomid;
        var curTime = curTime?curTime:_this.curTime;

        var str = "房间号"+parseInt(curRoomid/100);
        //cc.log(curRoomid,_this.getDate(_this.curIndex),str);

        ccui.helper.seekWidgetByName(_this.node, "roomnum").setString(str);
        ccui.helper.seekWidgetByName(_this.node, "curTime").setString(_this.getDate(curTime));
        _this.curIndex = curRoomid%100 - 1;
        //cc.log(data);
        _this.showPlayer(data[_this.curIndex]);
    },
    showPlayer:function(data){
        var _this = this;
        ccui.helper.seekWidgetByName(_this.node, "curround").setString("第 "+(_this.alldata.length - _this.curIndex)+" 局");
        ccui.helper.seekWidgetByName(_this.node, "curTime").setString(_this.getDate(data.time));
        //cc.log(_this.groupstable);
        for(var i = 0; i < 5; i++){
            var _node = ccui.helper.seekWidgetByName(_this.node, "Node_"+i);
            var _head = ccui.helper.seekWidgetByName(_this.node, "head"+i);
            if(i < data.info.length){
                ccui.helper.seekWidgetByName(_head, "playername").setString(data.info[i].name);
                //personobj.head_img = ccui.helper.seekWidgetByName(_head, "icon");
                //ccui.helper.seekWidgetByName(_head, "playerid").setString("ID:"+data.info[i].uid);
                ccui.helper.seekWidgetByName(_head, "playerscore").setString(data.info[i].score);
                ccui.helper.seekWidgetByName(_head, "zhuang").setVisible(data.info[i].dealer);
                gameclass.mod_base.showtximg(_head.getChildByName("icon"), data.info[i].head, 0, 0, "im_headbg2");

                var phead = ccui.helper.seekWidgetByName(_head, "betscore");
                if(data.info[i].dealer) {
                    phead.setVisible(false);
                }else{
                    //var bets = res.ttz_bets3;
                    //if(data.info[i].bets == 5) bets = res.ttz_bets5;
                    //else if(data.info[i].bets == 7) bets = res.ttz_bets7;

                    phead.setVisible(true);
                    phead.setTexture("res/niuniuRes/yypk_imh_"+ data.info[i].bets + "fen.png");
                }
                var strname = "ttz_card_"+data.info[i].card[0];
                ccui.helper.seekWidgetByName(_node, "ttzcard_0").setTexture(res[strname]);
                strname = "ttz_card_"+data.info[i].card[1];
                ccui.helper.seekWidgetByName(_node, "ttzcard_1").setTexture(res[strname]);
                _this.showdiannum(i,data.info[i].card[0],data.info[i].card[1]);
            }else{
                _head.setVisible(false);
                _node.setVisible(false);
            }
        }
    },
    showdiannum:function(chair,cardnum1,cardnum2) {
        var respath = "";
        if(cardnum1 == cardnum2){
            if(cardnum1 == 37){
                respath = res.ttz_stzz;
            }
            else{
                respath = res.ttz_baozi;
            }
        }
        else{
            var tts = cardnum1 + cardnum2;
            var strname = "";
            if(tts == 30){
                if(cardnum1 == 12 || cardnum2 == 12){
                    respath = res.ttz_ebg;
                }else{
                    respath = res.ttz_nod;
                }
            }
            else if(tts >= 48) {
                tts = (tts-37-10)*10+5;
                strname = "ttz_img"+tts;
                respath = res[strname];
            }
            else{
                if(tts < 30) tts = tts-20;
                else tts = tts-30;
                strname = "ttz_img"+tts*10;
                respath = res[strname];
            }
        }
        var nodebg = ccui.helper.seekWidgetByName(this.node, "Node_"+chair);
        ccui.helper.seekWidgetByName(nodebg, "cardname").setTexture(respath);
    },
    share:function(url){
        gameclass.mod_platform.wxsharelink("推筒子结算","战绩",url);
    },
    getDate:function(date){
        var d = new Date(date * 1000);
        var hour = d.getHours();
        if(hour < 10) hour = "0"+hour;
        var min = d.getMinutes();
        if(min < 10) min = "0"+min;
        var sec = d.getSeconds();
        if(sec < 10) sec = "0"+sec;
        var date = //(d.getFullYear()) + "-" +
            (d.getMonth() + 1) + "-" +
            (d.getDate()) + " " +
            hour + ":" +
            min + ":" +
            sec;
        return date;
    },
});