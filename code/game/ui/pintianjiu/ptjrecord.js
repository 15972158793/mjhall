/**
 * Created by Administrator on 2017/8/24 0024.
 */
gameclass.ptjrecord = gameclass.baseui.extend({
    node: null,
    curRoomid:0,
    curIndex:0,
    groupstable:null,
    nodebgArr:null,
    alldata:null,
    ctor: function () {
        this._super();
        this.groupstable = [];
        this.nodebgArr = [];
        this.alldata = [];
        //this.getptjson();
    },

    show: function () {
        cc.spriteFrameCache.addSpriteFrames(res.ptj_painumplist);
        this.node = this.game.uimgr.createnode(res.Ptj_record,true);
        this.addChild(this.node);
        var _this = this;
        gameclass.createbtnpress(_this.node, "btn_colse", function () {
            _this.game.uimgr.closeui("gameclass.ptjrecord");
            _this.game.uimgr.showui("gameclass.hallui");
        });
        gameclass.createbtnpress(this.node, "btn_shangJu", function () {
            _this.curIndex = _this.curIndex-1;
            if(_this.curIndex <= 0) _this.curIndex = _this.alldata.length;
            if(_this.alldata[_this.curIndex-1]) _this.showPlayer(_this.alldata[_this.curIndex-1]);
        });
        gameclass.createbtnpress(this.node, "btn_xiaJu", function () {
            _this.curIndex = _this.curIndex+1;
            if( _this.curIndex > _this.alldata.length) _this.curIndex = 1;
            if(_this.alldata[_this.curIndex-1]) _this.showPlayer(_this.alldata[_this.curIndex-1]);
        });
        gameclass.createbtnpress(this.node, "btn_share", function () {
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
    ptj_showRecord:function(curRoomid,data,curTime,groupstable){
        this.alldata = data;
        this.groupstable = groupstable;
        if(!data){
            this.game.uimgr.showui("gameclass.hallui");
            this.game.uimgr.closeui("gameclass.ptjrecord");
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
        //cc.log(curRoomid,str);

        ccui.helper.seekWidgetByName(_this.node, "roomnum").setString(str);
        ccui.helper.seekWidgetByName(_this.node, "curTime").setString(_this.getDate(curTime));
        _this.curIndex = curRoomid%100;
        //cc.log(data);
        _this.showPlayer(data[_this.curIndex-1]);
    },
    showPlayer:function(data){
        var _this = this;

        var ptjtype = data.param1%10;
        var isbomb = data.param2%10;
        var isdjnn = parseInt(data.param2/10)%10;
        var isguizi = parseInt(data.param2/100)%10;
        var istjw = parseInt(data.param2/1000)%10;

        ccui.helper.seekWidgetByName(_this.node, "curround").setString("第 "+_this.curIndex+" 局");
        ccui.helper.seekWidgetByName(_this.node, "curTime").setString(_this.getDate(data.time));
        //cc.log(_this.groupstable);
        var node5 = ccui.helper.seekWidgetByName(_this.node, "Node_5");
        for(var i = 0; i < 24; i++){
            if(i>15&&ptjtype==1)
                ccui.helper.seekWidgetByName(node5, "ptjzhoucard0_"+i).setVisible(true);
            ccui.helper.seekWidgetByName(node5, "zcardnum"+i).setVisible(false);

        }
        if(data.view){
            for(var i = 0; i < data.view.length; i++){
                var pngname = "ptj_dianimg_"+data.view[i]+".png";
                ccui.helper.seekWidgetByName(node5, "zcardnum"+i).setVisible(true);
                ccui.helper.seekWidgetByName(node5, "zcardnum"+i).initWithSpriteFrameName(pngname);

            }
        }
        for(var i = 0; i < 4; i++){
            var _node = ccui.helper.seekWidgetByName(_this.node, "Node_"+i);
            var _head = ccui.helper.seekWidgetByName(_this.node, "head"+i);
            if(i < data.info.length){
                ccui.helper.seekWidgetByName(_head, "playername").setString(data.info[i].name);
                //personobj.head_img = ccui.helper.seekWidgetByName(_head, "icon");
                //ccui.helper.seekWidgetByName(_head, "playerid").setString("ID:"+data.info[i].uid);
                ccui.helper.seekWidgetByName(_head, "playerscore").setString(data.info[i].score);
                ccui.helper.seekWidgetByName(_head, "zhuang").setVisible(data.info[i].dealer);
                gameclass.mod_base.showtximg(_head.getChildByName("icon"), data.info[i].head, 0, 0, "im_headbg2");

                if(!data.info[i].dealer) {
                    var bet0 = "ptj_x" + data.info[i].bets % 100 + ".png";//十位个位
                    ccui.helper.seekWidgetByName(_head, "selectbg_0").setVisible(true);

                    var bet1 = "ptj_x" + parseInt(data.info[i].bets/100)%100 + ".png";//百位和千位
                    ccui.helper.seekWidgetByName(_head, "selectbg_1").setVisible(true);

                    var bet2 = ""; var flag = false;
                    if (data.info[i].bets/10000 >= 1) {
                        flag = true;
                        bet2 = "ptj_x" + parseInt(data.info[i].bets/10000) + ".png";
                        ccui.helper.seekWidgetByName(_head, "selectbg_2").setVisible(true);
                    }
                    if(i==1) {
                        if(flag){
                            ccui.helper.seekWidgetByName(_head, "selectscore_0").initWithSpriteFrameName(bet2);
                            ccui.helper.seekWidgetByName(_head, "selectscore_1").initWithSpriteFrameName(bet1);
                            ccui.helper.seekWidgetByName(_head, "selectscore_2").initWithSpriteFrameName(bet0);
                        }else{
                            ccui.helper.seekWidgetByName(_head, "selectscore_0").initWithSpriteFrameName(bet1);
                            ccui.helper.seekWidgetByName(_head, "selectscore_1").initWithSpriteFrameName(bet0);
                        }
                    }else{
                        ccui.helper.seekWidgetByName(_head, "selectscore_0").initWithSpriteFrameName(bet0);
                        ccui.helper.seekWidgetByName(_head, "selectscore_1").initWithSpriteFrameName(bet1);
                        if(flag) ccui.helper.seekWidgetByName(_head, "selectscore_2").initWithSpriteFrameName(bet2);
                    }
                }

                var maxname = _this.showgroupname(data.info[i].ct[0]);
                var sprmaxname = ccui.helper.seekWidgetByName(_node, "sprmaxname");
                sprmaxname.setVisible(true);
                sprmaxname.initWithSpriteFrameName(maxname+".png");
                if(data.info[i].ct.length == 2){
                    if(data.info[i].ct[1] > 0){
                        var minname = _this.showgroupname(data.info[i].ct[1]);
                        var sprminname = ccui.helper.seekWidgetByName(_node, "sprminname");
                        sprminname.setVisible(true);
                        sprminname.initWithSpriteFrameName(minname+".png");
                    }
                }

                for(var j = 0 ; j < data.info[i].card.length;j++){
                    var pngname = "ptj_dianimg_"+data.info[i].card[j]+".png";
                    ccui.helper.seekWidgetByName(_node, "cardnum"+j).initWithSpriteFrameName(pngname);
                }
                if(ptjtype == 1 ){
                    ccui.helper.seekWidgetByName(_node, "ptjcard2").setVisible(false);
                    ccui.helper.seekWidgetByName(_node, "ptjcard3").setVisible(false);
                }
            }else{
                _head.setVisible(false);
                _node.setVisible(false);
            }
        }
    },
    showgroupname:function(ct){
        for(var i = 0; i < this.groupstable.length; i++){
            if(this.groupstable[i].id == ct){
                var ptjimg = this.groupstable[i].ptjimg
                if(this.groupstable[i].type > 0){
                    var splitpngarr = [];
                    splitpngarr = ptjimg.split("#",2);
                    ptjimg = splitpngarr[1];
                }
                return ptjimg;
            }
        }
        return "ptj_bi_10";
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