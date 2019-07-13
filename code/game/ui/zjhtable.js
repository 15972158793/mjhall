/**
 * Created by yang on 2016/11/9.
 */

gameclass.zjhtable = gameclass.baseui.extend({
    sprite: null,
    node:null,
    mod_niuniu:null,
    players:null,
    //playersbp:null,
    ongameview:null,
    curround:null,
    buqiang:null,
    qiangzhuang:null,
    lunshu:null,
    zongzhu:null,
    danzhu:null,
    zhankai:false,
    //onchat:null,
    ctor: function () {
        this._super();
        this.players = [];
        //this.playersbp = [];
    },
    show:function(){
        this.init();
    },
    setmod: function (_mod_niuniiu) {
        this.mod_niuniu = _mod_niuniiu;
        this.mod_niuniu.bindUI(this);
        var _this = this;
        var mod_login = this.game.mod_login;

        if(window.wx) {
            _this.share();
        }

        if (_this.mod_niuniu.roominfo.time != 0){
            _this.game.uimgr.showui("gameclass.exitroom",false);
            _this.game.uimgr.uis["gameclass.exitroom"].setData(_this.mod_niuniu,_this.mod_niuniu.roominfo);
        }

        this.mod_niuniu.onupdateroominfo = function (data) {
            _this.refplayerinfo();

        };
        
        this.mod_niuniu.ongameready = function (data) {
            _this.refplayerinfo();
        };
        this.mod_niuniu.ongameniuniubegin = function(){
            _this.refreshStep();
            _this.refplayerinfo(null,true);
        };
        this.mod_niuniu.ongameniuniuinfo = function(){

            ccui.helper.seekWidgetByName(_this.node, "invitebtn").setVisible(false);

            if(_this.mod_niuniu.gameniuniuinfo.info.length > 0){
                _this.mod_niuniu.gameniuniuinfo.begin = true;
                _this.mod_niuniu.gamestate = 1;
                if (_this.mod_niuniu.gameniuniuinfo.info[0].score != 0){
                    _this.mod_niuniu.gamestate = 2;
                    _this.game.uimgr.showui("gameclass.zjhresultoneui").setniuniumod(_this.mod_niuniu,_this);
                }
            }


            _this.refplayerinfo();
        };

        this.mod_niuniu.ongamecompare = function(data){
            //{\"uid\":106424,\"destuid\":106425,\"win\":false,\"point\":2,\"allpoint\":3,\"round\":1,\"opuid\":106425}"}
            _this.showbipai(data.uid,data.destuid,data.win,data.card1,data.card2)
            _this.refplayerinfo(null,true,null,data.uid);
        };

        this.mod_niuniu.ongamebets = function(uid){
            _this.refplayerinfo(null,true,null,uid);
        };

        this.mod_niuniu.onchat = function(data){

            for(var i = 0;i < g_chatstr.length; i++){
                if(g_chatstr[i] == data.chat)
                {
                    mod_sound.playeffect(g_music["fix_msg_" + (i+1)],false);
                    break;
                }
                else if(i==8)
                {
                    mod_sound.playeffect(g_music.fix_msg_9,false);
                    break;
                }
            }

            var arr = [
                res.chatbg_ld,
                res.chatbg_rd,
                res.chatbg_rd,
                res.chatbg_ld,
                res.chatbg_ld,
            ];

            for (var i = 0;i < 5;i ++) {
                var player = this.getplayerdata(i);
                var otherddata = this.getplayerotherdata(i);
                if (player != null && player.uid == data.uid) {
                    var talkPos = _this.talkPos[i];

                    if (data.type < 4) {
                        var _node = new ccui.Layout();
                        var s9 = null;
                        if (data.type == 1) {
                            s9 = new cc.Scale9Sprite(arr[i]);
                            s9.setCapInsets(cc.rect(60, 10, 10, 10));
                            s9.setAnchorPoint(cc.p(0, 0));
                            s9.setPosition(cc.p(-18, -18));
                            _node.addChild(s9);

                            var helloLabel = new cc.LabelTTF(data.chat, "Arial", 36);
                            helloLabel.setAnchorPoint(cc.p(0, 0));
                            helloLabel.setColor(cc.color(33, 111, 75));
                            _node.addChild(helloLabel);
                            s9.setContentSize(helloLabel.getContentSize().width + 30, helloLabel.getContentSize().height + 30);
                        } else if (data.type == 2) {
                            var index = Number(data.chat);
                            //var spr = new cc.Sprite();
                            //spr.initWithFile(g_face[index]);
                            //
                            //s9 = new ccui.Layout();
                            //s9.setContentSize(spr.width + 30, spr.height + 20);
                            //s9.setBackGroundImage(arr[i]);
                            //s9.setBackGroundImageScale9Enabled(true);
                            //spr.setPosition(0.5 * s9.getContentSize().width, 0.5 * s9.getContentSize().height + 5);
                            //s9.addChild(spr);
                            //_node.addChild(s9);

                            var spine = new sp.SkeletonAnimation(g_chat_expression["expression"+index+"_json"],g_chat_expression["expression"+index+"_atlas"]);
                            spine.setAnimation(0, 'animation', false);
                            spine.setAnchorPoint(0.5, 0.5);

                            s9 = new ccui.Layout();
                            s9.setContentSize(110, 100);
                            s9.setBackGroundImage(arr[i]);
                            s9.setBackGroundImageScale9Enabled(true);
                            spine.setPosition(0.5 * s9.getContentSize().width, 0.5 * s9.getContentSize().height + 5);
                            s9.addChild(spine);
                            _node.addChild(s9);


                        } else if (data.type == 3) {
                            gameclass.mod_platform.playurl(data.chat);
                            var spr = new cc.Sprite(res.soundopen2);
                            spr.setAnchorPoint(cc.p(0.5, 0.5));
                            _node.addChild(spr);
                        }
                        if (i == 1 || i == 2) {
                            _node.setPosition(talkPos.x - s9.width, talkPos.y);
                        } else {
                            _node.setPosition(talkPos);
                        }
                        _this.node.addChild(_node);
                        var seq = cc.sequence(cc.delayTime(2), cc.callFunc(function () {
                            _node.removeFromParent(true);
                        }));
                        _node.runAction(seq);
                    } else if (data.type == 4) {
                        var _senderObj = JSON.parse(data.chat);
                        var _animateNode = new cc.Node();
                        _animateNode.setScale(0.8);
                        mod_sound.playeffect(g_music["magic"+_senderObj.type],false);
                        _senderObj.type += 1;
                        var sucAnim = new sp.SkeletonAnimation(g_magic_chat["magic_chat_" + _senderObj.type + "_1_json"], g_magic_chat["magic_chat_" + _senderObj.type + "_1_atlas"]);
                        sucAnim.setAnimation(0, 'animation', false);
                        sucAnim.setAnchorPoint(0.5, 0.5);
                        _animateNode.addChild(sucAnim);
                        var senderPos = _this.players[i].head.getPosition();
                        _animateNode.setPosition(senderPos);
                        var hitPos = null;
                        for (var j = 0; j < 5; j++) {
                            var player = _this.mod_niuniu.getplayerdata(j);
                            if (player && player.uid == _senderObj.hitUid) {
                                hitPos = _this.players[j].head.getPosition();
                                break;
                            }
                        }

                        _this.node.addChild(_animateNode);
                        _animateNode.runAction(cc.sequence(cc.delayTime(1), cc.spawn(cc.rotateTo(0.5, 360), cc.moveTo(0.5, hitPos)), cc.callFunc(function (_animateNode, sucAnim) {
                            sucAnim.removeFromParent(true);
                            var sucAnim1 = new sp.SkeletonAnimation(g_magic_chat["magic_chat_" + _senderObj.type + "_2_json"], g_magic_chat["magic_chat_" + _senderObj.type + "_2_atlas"]);
                            sucAnim1.setAnimation(0, 'animation', false);
                            sucAnim1.setAnchorPoint(0.5, 0.5);
                            _animateNode.addChild(sucAnim1);
                            _animateNode.scheduleOnce(function () {
                                _animateNode.removeFromParent(true)
                            }, 1)
                        }, _animateNode, sucAnim)))
                    }
                }
            }
        };

        this.mod_niuniu.ongamedealer = function (dealer) {
            if (dealer){
                //var lst = [];

                var playerdata = _this.mod_niuniu.getplayerdata(0);
                if (playerdata!= null){
                    _this.qiangzhuang.setVisible(false);
                    _this.buqiang.setVisible(false);
                }

                var playernum = _this.mod_niuniu.getplayernum();

                var beg = 0;
                var playerlst = [];
                var playerctrl = [];

                for (var i = 0;i < 5;i ++) {
                    var player = _this.mod_niuniu.getplayerdata(i);
                    var otherddata = _this.mod_niuniu.getplayerotherdata(i);
                    if (player != null && player.rob == 1) {
                        playerlst[playerlst.length] = otherddata;
                        playerctrl[playerctrl.length] = _this.players[i].zhuang;
                    }
                }

                if (playerlst.length == 0){
                    for (var i = 0;i < 5;i ++) {
                        var otherddata = _this.mod_niuniu.getplayerotherdata(i);
                        if (player != null ) {
                            playerlst[i] = otherddata;
                            playerctrl[i] = _this.players[i].zhuang;
                        }
                    }
                }
                if (playerlst.length > 1){
                    var rand = (Math.floor(Math.random()*100)%4 + playerlst.length * 2);
                    var act = cc.repeatForever(cc.sequence(cc.delayTime(0.20),cc.callFunc(function(){
                        var index = beg%playerlst.length

                        for (var i = 0;i < 5;i ++) {
                            var otherddata = playerlst[i];
                            if (otherddata != null) {
                                playerctrl[i].setVisible(index == i);
                            }
                        }

                        if(beg > rand){
                            var otherddata = playerlst[index];

                            if (otherddata != null && otherddata.dealer) {
                                _this.stopAllActions();
                                _this.refplayerinfo();
                            }
                        }
                        beg++;
                    })));
                    _this.runAction(act);
                }else{
                    _this.refplayerinfo();
                }

                //lst.sort(function(){ return 0.5 - Math.random() });

            }else {
                _this.refplayerinfo();
            }
        }


        var titiletime =  ccui.helper.seekWidgetByName(_this.node, "time");
        var reftime = function () {
            var myDate = new Date();
            var str = myDate.Format("hh:mm");
            titiletime.setString(str);
        };
        reftime();
        var func = cc.repeatForever(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            reftime();
        })));
        titiletime.runAction(func);

        ccui.helper.seekWidgetByName(_this.node, "roomnum").setString("房间号:"+this.mod_niuniu.roominfo.roomid.toString());

        _this.qiangzhuang = ccui.helper.seekWidgetByName(_this.node, "qiangzhuang");
        _this.buqiang = ccui.helper.seekWidgetByName(_this.node, "buqiang");

        gameclass.createbtnpress(this.node, "qiangzhuang", function () {
            _this.mod_niuniu.gamedeal(true);
        });

        gameclass.createbtnpress(this.node, "buqiang", function () {
            _this.mod_niuniu.gamedeal(false);
        });

        this.curround =  ccui.helper.seekWidgetByName(_this.node, "curround");
        this.zongzhu =  ccui.helper.seekWidgetByName(_this.node, "zongzhu");
        this.danzhu =  ccui.helper.seekWidgetByName(_this.node, "danzhu");

        this.genzhu = ccui.helper.seekWidgetByName(_this.node, "genzhu");
        this.jiazhu = ccui.helper.seekWidgetByName(_this.node, "jiazhu");
        this.kanpai = ccui.helper.seekWidgetByName(_this.node, "kanpai");
        this.bipai = ccui.helper.seekWidgetByName(_this.node, "bipai");
        this.bipaitips = ccui.helper.seekWidgetByName(_this.node, "bipaitips");
        this.bipaitips.setVisible(false);
        this.qipai = ccui.helper.seekWidgetByName(_this.node, "qipai");

        gameclass.createbtnpress(this.node, "genzhu", function () {
            _this.setbipaistate(false);
            _this.mod_niuniu.gamebets(1);
        });
        gameclass.createbtnpress(this.node, "jiazhu", function () {
            _this.setbipaistate(false);
            _this.mod_niuniu.gamebets(2);
        });
        gameclass.createbtnpress(this.node, "kanpai", function () {
            _this.setbipaistate(false);
            _this.mod_niuniu.gamebets(0);
        });
        gameclass.createbtnpress(this.node, "qipai", function () {
            _this.setbipaistate(false);
            _this.mod_niuniu.gamebets(-1);
        });

        _this.bipaistate = false;
        gameclass.createbtnpress(this.node, "bipai", function () {
           // _this.mod_niuniu.gamecompare(_this.destcompareuid);
            _this.bipaistate = !_this.bipaistate;
            _this.setbipaistate(_this.bipaistate);
        });

        this.genzhu.setVisible(false);
        this.jiazhu.setVisible(false);
        this.kanpai.setVisible(false);
        this.bipai.setVisible(false);
        this.qipai.setVisible(false);
        this.talkPos =[cc.p(75,200),cc.p(1040,300),cc.p(1040,470),cc.p(140,470),cc.p(140,300)];

        //var helpnode = ccui.helper.seekWidgetByName(_this.node, "closeinfo");

        //var btnhu = ccui.helper.seekWidgetByName(_this.node, "mingpai");
        //btnhu.setVisible(btnhu);
        var gamebets = ccui.helper.seekWidgetByName(this.node, "gamebets");
        this.mod_niuniu.ongameniuniuend = function(data,showfast){
            //_this.game.uimgr.showui("gameclass.resultoneui").setniuniumod(_this.mod_niuniu);
            //_this.refplayerinfo();
            _this.stopAllActions();
            if (_this.mod_niuniu.gamestate == 2 && _this.game.uimgr.uis["gameclass.zjhresultui"] == null){
                var banker = false;

                var otherddata = _this.mod_niuniu.getplayerotherdata(0);
                if (otherddata != null) {
                    banker = otherddata.dealer;
                }
                //btnhu.setVisible(true);
                //if (!banker){
                //    gamebets.setVisible(false);
                //}else{
                //    //
                //}
                _this.refplayerinfo();

                var showtime = 3;

                if(showfast){
                    showtime = 1;
                }
                var ani = cc.sequence(cc.delayTime(showtime),cc.callFunc(function(sender){
                    /*var ani = cc.sequence(cc.delayTime(3),cc.callFunc(function(sender){
                        _this.game.uimgr.showui("gameclass.zjhresultoneui").setniuniumod(_this.mod_niuniu,_this);
                    }));
                    _this.runAction(ani);*/
                    _this.game.uimgr.showui("gameclass.zjhresultoneui").setniuniumod(_this.mod_niuniu,_this);
                    //_this.refplayerinfo(true);
                }));
                _this.runAction(ani);
            }else{
                if( _this.mod_niuniu.isover){

                    _this.game.uimgr.showui("gameclass.zjhresultui");
                    _this.game.uimgr.uis["gameclass.zjhresultui"].setData(_this.mod_niuniu);
                }
            }

        };

        this.mod_niuniu.ongameniuniucardui = function(){
            //_this.refplayerinfo();

        };

        this.ongameview = 0;
        this.mod_niuniu.ongameview = function(){
            /*_this.ongameview++;

            if (_this.mod_niuniu.getplayernum() == _this.ongameview){
                _this.stopAllActions();
                //_this.game.uimgr.showui("gameclass.resultoneui").setniuniumod(_this.mod_niuniu,_this);
                var ani = cc.sequence(cc.delayTime(3),cc.callFunc(function(sender){
                    _this.game.uimgr.showui("gameclass.resultoneui").setniuniumod(_this.mod_niuniu,_this);
                }));
                _this.runAction(ani);
                _this.refplayerinfo(true);
            }*/
            _this.refplayerinfo();
        };

        this.reset();
        this.refplayerinfo();
    },


});

gameclass.zjhtable.prototype.share = function(){
    var maxsocre = "50分";
    if(this.mod_niuniu.roominfo.param1 % 10 != 0) {
        maxsocre = "100分";
    }

    var baozi = "无";
    if(parseInt(this.mod_niuniu.roominfo.param1 / 10) % 10 == 1) {
        baozi = "5分";
    } else if(parseInt(this.mod_niuniu.roominfo.param1 / 10) % 10 == 2) {
        baozi = "10分";
    }

    var ms = "轮庄";
    if(parseInt(this.mod_niuniu.roominfo.param1 / 100) == 1) {
        ms = "赢家庄";
    }

    gameclass.mod_platform.invitefriend("房号[" + this.mod_niuniu.roominfo.roomid + "]，" + maxsocre + "封顶，玩法" + ms + "，豹子奖励" + baozi + "，一共[" + this.mod_niuniu.roominfo.maxstep + "]局。大家都在等您，快来吧。",this.mod_niuniu.roominfo.roomid,"三张牌-" +  this.mod_niuniu.roominfo.roomid + "-" + maxsocre + "封顶");
};

gameclass.zjhtable.prototype.checkSafe = function(people){
    this.safeLayer.checkSafe(people);
};

gameclass.zjhtable.prototype.init = function(){
    cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
    cc.spriteFrameCache.addSpriteFrames(res.ani1list);

    this.node = this.game.uimgr.createnode(res.zjhtable,true);
    this.node.setPosition((cc.winSize.width - this.node.getContentSize().width)/2,0);
    this.addChild(this.node);

    var btn_layer = new gameclass.btn_setLayer(this.node,this.game);
    this.node.addChild(btn_layer);
    var closeinfo = ccui.helper.seekWidgetByName(this.node,"closeinfo");
    closeinfo.setLocalZOrder(1000);
    btn_layer.setLocalZOrder(999);

    this.safeLayer = new gameclass.checkSafeLayer(this.node,this.game,ccui.helper.seekWidgetByName(btn_layer,"btn_safe"));
    this.safeLayer.setName("safeLayer");
    this.node.addChild(this.safeLayer);

    var _this = this;
    _this.sharelayer = ccui.helper.seekWidgetByName(_this.node, "sharelayer");
    _this.sharelayer.setVisible(false);

    var dianchi = ccui.helper.seekWidgetByName(this.node,"dianchi");
    dianchi.setPercent(gameclass.battery);

    gameclass.createbtnpress(this.node, "sharelayer", function () {
        _this.sharelayer.setVisible(false);
        //_this.game.uimgr.showui("gameclass.exitroom");
    });

    gameclass.createbtnpress(this.node, "invitebtn", function () {
        _this.share();

        if(window.wx)
        {
            _this.sharelayer.setVisible(true);
        }
        //else{
        //    _this.game.uimgr.showui("gameclass.msgboxui");
        //    _this.game.uimgr.uis["gameclass.msgboxui"].setString("请先安装微信");
        //}
    });

    var begin = function(){
        //gameclass.mod_platform.invitefriend("11111111","roomid","11111111");
    };

    var end = function(){
        //gameclass.mod_platform.invitefriend("11111111","roomid","11111111");
    };
    //gameclass.createbtnpress(this.node, "mic", end, begin);

    gameclass.createbtnpress(this.node, "ready", function () {
        _this.mod_niuniu.gameready();
    });

    //gameclass.createbtnpress(this.node, "gamebets1", function () {
    //    _this.mod_niuniu.gamebets(1);
    //    _this.refplayerinfo(null,null,true);
    //});
    //gameclass.createbtnpress(this.node, "gamebets2", function () {
    //    _this.mod_niuniu.gamebets(2);
    //    _this.refplayerinfo(null,null,true);
    //});
    //gameclass.createbtnpress(this.node, "gamebets3", function () {
    //    _this.mod_niuniu.gamebets(3);
    //    _this.refplayerinfo(null,null,true);
    //});
    //gameclass.createbtnpress(this.node, "gamebets4", function () {
    //    _this.mod_niuniu.gamebets(4);
    //    _this.refplayerinfo(null,null,true);
    //});
    //gameclass.createbtnpress(this.node, "gamebets5", function () {
    //    _this.mod_niuniu.gamebets(5);
    //    _this.refplayerinfo(null,null,true);
    //});

    //gameclass.createbtnpress(this.node, "mingpai", function () {
    //    ccui.helper.seekWidgetByName(_this.node, "mingpai").setVisible(false);
    //    _this.mod_niuniu.gameview();
    //    _this.refplayerinfo();
    //});

    var showipinfo = function(sender,type){
        if(ccui.Widget.TOUCH_ENDED == type){
            //if(sender.index == 0) return;
            if(_this.bipaistate){
                if(sender.index == 0) return;
                _this.setbipaistate(false);
                _this.mod_niuniu.gamecompare(sender.index);
                return;
            }
            var playerdata = _this.mod_niuniu.getplayerdata(sender.index);
            _this.game.uimgr.showui("gameclass.chatMicLayer").setPlayerInfo(playerdata,_this.mod_niuniu,sender.index);
        }
    }

    for (var i = 0;i < 5; i++){
        var data = {};
        data.head = ccui.helper.seekWidgetByName(this.node, "head" + i);

        data.c = ccui.helper.seekWidgetByName(this.node, "c" + i);
        data.c.index = i;
        data.c.addTouchEventListener(showipinfo);
        //gameclass.createbtnpress(this.node, "c" + i, function (_1, _2, index) {
        //    if(_this.bipaistate && index != 0) {
        //        _this.setbipaistate(false);
        //        _this.mod_niuniu.gamecompare(index);
        //    } else {
        //        _this.players[index].userinfobg.setVisible(false);
        //    }
        //}, function (_1, _2, index) {
        //    if(_this.bipaistate && index != 0) {
        //        return;
        //    }
        //    _this.players[index].userinfobg.setVisible(true);
        //    var playerdata = _this.mod_niuniu.getplayerdata(index);
        //    _this.players[index].id.setString("ID:" + playerdata.uid);
        //    if(playerdata.ip == "") {
        //        _this.players[index].ip.setString("离线");
        //        _this.players[index].address.setString("地址未知");
        //    } else {
        //        _this.players[index].ip.setString("IP:" + playerdata.ip);
        //        if(playerdata.address == "") {
        //            _this.players[index].address.setString("地址未知");
        //        } else {
        //            _this.players[index].address.setString(playerdata.address);
        //        }
        //    }
        //}, null, i);
        data.c.setVisible(true);

        data.zhuang = ccui.helper.seekWidgetByName(this.node, "zhuang" + i);
        data.q = ccui.helper.seekWidgetByName(this.node, "q" + i);
        data.q.setVisible(false);
        data.cards = ccui.helper.seekWidgetByName(this.node, "notifynode" + i);

        data.beinum = ccui.helper.seekWidgetByName(this.node, "beinum" + i);
        data.bei = ccui.helper.seekWidgetByName(data.head, "callBg");
        //data.bei = data.beinum;
        data.qiangtxt = ccui.helper.seekWidgetByName(this.node, "bei" + i + "_0");
        data.icon = null;
        data.zhuang = ccui.helper.seekWidgetByName(this.node,"zhuang"+i);
        data.iconback = ccui.helper.seekWidgetByName(this.node, "icon" + i);
        data.playername = ccui.helper.seekWidgetByName(this.node, "playername" + i);
        data.playerscore = ccui.helper.seekWidgetByName(this.node, "playerscore" + i);
        data.ok = ccui.helper.seekWidgetByName(this.node, "ok" + i);
        data.userinfobg = ccui.helper.seekWidgetByName(this.node, "userinfobg" + i);
        data.id = data.userinfobg.getChildByName("id");
        data.ip = data.userinfobg.getChildByName("ip");
        data.address = data.userinfobg.getChildByName("address");
        data.userinfobg.setVisible(false);
        data.playerscore.setString("0");
        data.playerid = ccui.helper.seekWidgetByName(this.node, "playerid" + i);
        //data.arr = ccui.helper.seekWidgetByName(this.node, "arr" + i);
        //data.progress = this.cratearrani(data.head,i);
        data.off_line = ccui.helper.seekWidgetByName(data.head, "off_line");
        data.off_line.setVisible(false);
        this.players[i] = data;
    }


    //比牌层
    this.bipaiceng = ccui.helper.seekWidgetByName(this.node, "bipaiceng");
    this.bipaiceng.setVisible(false);
};


gameclass.zjhtable.prototype.showbipai = function(uid,uid2,win,card1,card2) {
    var data = [];
    var playerData1 = this.mod_niuniu.getplayerdatabyuid(uid);
    var playerData2 = this.mod_niuniu.getplayerdatabyuid(uid2);
    var chair1 = this.mod_niuniu.getPlayerIndexById(uid);
    var chair2 = this.mod_niuniu.getPlayerIndexById(uid2);

    data[0] = {"playerData":playerData1,"win":win,"card":card1,"chair":chair1};
    data[1] = {"playerData":playerData2,"win":!win,"card":card2,"chair":chair2};

    var nodeArr = [];
    this.bipaiceng.setVisible(true);
    nodeArr[0] = this.bipaiceng.getChildByName("p0");
    nodeArr[1] = this.bipaiceng.getChildByName("p1");
    for(var i = 0;i < 2;i++){
        nodeArr[i].getChildByName("winLose").setVisible(false);
        nodeArr[i].getChildByName("winLight").setVisible(false);
        for(var j = 0;j < 3;j++){
            nodeArr[i].getChildByName("head").getChildByName("poke"+j).setVisible(false);
        }
    }

    var _this= this;
    nodeArr[0].runAction(cc.sequence(cc.moveTo(0.5,cc.p(168,175)),cc.callFunc(function(){
        for(var i = 0;i < 2;i++){
            nodeArr[i].getChildByName("winLose").setVisible(true);
            nodeArr[i].getChildByName("winLose").loadTexture(data[i].win?res.winlogo:res.loselogo);
            nodeArr[i].getChildByName("winLight").setVisible(data[i].win);
            var headBg = nodeArr[i].getChildByName("head");
            gameclass.mod_base.showtximg(headBg.getChildByName("icon"),data[i].playerData.imgurl, 0, 0,"im_headbg5");
            headBg.getChildByName("playername").setString(data[i].playerData.name);
            headBg.getChildByName("playerscore").setString(
                _this.players[data[i].chair].head.getChildByName("playerscore"+data[i].chair).getString());
            for(var j = 0;j < 3;j++){
                headBg.getChildByName("poke"+j).setVisible(true);
                if(data[i].card[j]>0){
                    var cardStr = _this.getCardStr(data[i].card[j]);
                    headBg.getChildByName("poke"+j).loadTexture(cardStr,ccui.Widget.PLIST_TEXTURE);
                }else{
                    headBg.getChildByName("poke"+j).loadTexture(res.pokerBei,ccui.Widget.LOCAL_TEXTURE);
                }
            }
        }
        _this.node.scheduleOnce(function(){
            _this.bipaiceng.setVisible(false);
            nodeArr[0].setPositionX(-566);
            nodeArr[1].setPositionX(1250);
        },2.5);
    })))
    nodeArr[1].runAction(cc.sequence(cc.moveTo(0.5,cc.p(522,139)),cc.callFunc(function(){

    })))
};

gameclass.zjhtable.prototype.setbipaistate = function(b) {
    this.bipaistate = b;
    for(var i = 1;i < 5; i++){
        var otherddata = this.mod_niuniu.getplayerotherdata(i);
        if (otherddata != null) {
            this.players[i].head.stopAllActions();
            if(!otherddata.lose && !otherddata.discard && b ) {
                var ani = cc.sequence(cc.scaleTo(0.5, 1), cc.scaleTo(0.5, 0.8));
                var act = cc.repeatForever(ani);
                this.players[i].head.runAction(act)
            }else{
                this.players[i].head.setScale(1);
            }
        }
    }

    this.bipaitips.setVisible(b);
};


gameclass.zjhtable.prototype.reset = function() {
    this.ongameview = 0;
    this.open = [false,false,false,false];

    this.mod_niuniu.gamestate = 0;

    for(var i = 0; i < 5; i++){
        this.players[i].zhuang.setVisible(false);
        this.players[i].cards.removeAllChildren();
    }

    //ccui.helper.seekWidgetByName(this.node, "mingpai").setVisible(false);

    this.refreshStep();
};

gameclass.zjhtable.prototype.refreshStep = function() {
    var curstep = this.mod_niuniu.roominfo.step;
    if (curstep > this.mod_niuniu.roominfo.maxstep){
        curstep = this.mod_niuniu.roominfo.maxstep;
    } else if(curstep == 0) {
        curstep = 1;
    }
    this.curround.setString("局数:" + curstep + "/" + this.mod_niuniu.roominfo.maxstep);
}

gameclass.zjhtable.prototype.cratecard = function(card,up) {
    var abcd = ["a","d","b","c"];
    var point = Math.floor(card/10);
    var type = card%10;
    var spr = new cc.Sprite();
    if (card <= 0){
        spr.setTexture(res.pokerBei);
    }else{
        spr.initWithSpriteFrameName("card_" + point +  abcd[type - 1]+ ".png");
    }
    spr.setAnchorPoint(cc.p(0.5,0.5));
    return spr;
};

gameclass.zjhtable.prototype.getCardStr = function(card){
    var cardStr = "";
    if(card>0){
        var abcd = ["a","d","b","c"];
        var point = Math.floor(card/10);
        var type = card%10;
        cardStr = "card_" + point +  abcd[type - 1]+ ".png";
    }else{
        cardStr = "pukebeimian.png";
    }
    return cardStr;
};

gameclass.zjhtable.prototype.crateniuniuani = function(cardlst,soundniu) {

    var spr = cc.Sprite.create();

    var lst = [];
    for(var i = 0;i < 5; i++){
        lst[i] = false;
    }
    var index = mod_compare.gettype(cardlst,lst);
    if (index > mod_compare.TYPE_YOUNIU){
        index -= mod_compare.TYPE_YOUNIU;
    }else{
        index = 0;
    }
    spr.initWithSpriteFrameName("wenziniu" +index+ ".png");
    spr.setAnchorPoint(cc.p(0.5,0.5));

    if (soundniu){
        cc.log(index);
        mod_sound.playeffect(g_music["niu_" + index + "_w"],false);
    }

    return spr;
};

gameclass.zjhtable.prototype.resetIcon = function(uid) {
    for (var i = 0; i < 5;i++){
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if(playerdata == null) {
            continue;
        }
        if(playerdata.uid != uid) {
            continue;
        }

        gameclass.mod_base.showtximg(this.players[i].iconback, playerdata.imgurl, 0, 0,"im_headbg5", playerdata.ip == "")
        break;
    }
};

gameclass.zjhtable.prototype.refplayerinfo = function(showother,refscore,soundniu,refscoreuid) {

    //this.qiangzhuang.setVisible(false);
    //this.buqiang.setVisible(false);

    if(this.mod_niuniu.gameniuniuinfo == null){

    }else{
        this.zongzhu.setString("" + this.mod_niuniu.gameniuniuinfo.allpoint);
        this.danzhu.setString("单注：" + this.mod_niuniu.gameniuniuinfo.point);
    }


    var begin = this.mod_niuniu.gameniuniuinfo != null &&  this.mod_niuniu.gameniuniuinfo.begin;
    for (var i = 0;i < 5;i++){
        var playerdata = this.mod_niuniu.getplayerdata(i);
        var has = playerdata != null;
        this.players[i].head.setVisible(has);
        this.players[i].bei.setVisible(false);
        //this.players[i].qiangtxt.setVisible(false);
        if (has){
            var player = playerdata;
            this.players[i].playername.setString(playerdata.name);
            //this.players[i].playerid.setString("ID:" + playerdata.uid.toString());
            this.players[i].ok.setVisible(player.ready&& this.mod_niuniu.gamestate != 1 && this.mod_niuniu.gamestate != 2);
            gameclass.mod_base.showtximg(this.players[i].iconback, playerdata.imgurl, 0, 0,"im_headbg5", player.ip == "");
            this.players[i].off_line.setVisible(!playerdata.line);
            this.players[i].head_url = playerdata.imgurl || "";
        }
    }

    ccui.helper.seekWidgetByName(this.node, "ready").setVisible(!this.mod_niuniu.selfdata.ready && !begin);

    var banker = false;
    var isopen = false;
    var islose = false;
    var discard = false;
    var over = false;
    var showqiangzhuang = false;
    var curopen = [false,false,false,false];
    var iscurop = this.mod_niuniu.gameniuniuinfo && this.mod_niuniu.gameniuniuinfo.curop == this.game.modmgr.mod_login.logindata.uid;
    if (begin){
        var haszhuang = false;
        for (var i = 0;i < 5;i ++){
            var otherddata = this.mod_niuniu.getplayerotherdata(i);
            if (otherddata != null){
                this.players[i].q.setVisible(otherddata.discard);
                //this.players[i].arr.setVisible(otherddata.uid == this.mod_niuniu.gameniuniuinfo.curop);
                //this.players[i].progress.setVisible(otherddata.uid == this.mod_niuniu.gameniuniuinfo.curop);
                if(otherddata.uid == this.mod_niuniu.gameniuniuinfo.curop){
                    this.createProgress(this.players[i].head,i);
                }else{
                    if(this.players[i].head.getChildByTag(123321)){
                        this.players[i].head.getChildByTag(123321).removeFromParent(true);
                    }
                }

                var iself = this.game.modmgr.mod_login.logindata.uid == otherddata.uid
                if (iself && otherddata.open) {
                    isopen = true
                }

                if (iself && otherddata.discard) {
                    discard = true
                }

                if (iself && otherddata.lose){
                    islose = true
                }

                if (otherddata.bets != 0){

                    this.players[i].bei.setVisible(true);
                    var bet =  Math.floor(Math.abs(otherddata.bets));
                    if (bet > 0 && bet < 9){
                        //this.players[i].beinum.initWithSpriteFrameName("ssl_num2_" + bet + ".png");
                        //this.players[i].beinum.initWithFile("res/niuniuRes/" + bet + "@2x.png");
                        //this.players[i].beinum.setScale(0);
                        this.players[i].beinum.setTexture("res/niuniuRes/yypk_imh_"+bet+"fen.png");
                    }
                        //("res/ui/niuniunew/ssl_num2_" + otherddata.bets + ".png");
                    //this.players[i].bei.setString(Math.abs(otherddata.bets ) + "倍");
                }else{
                    this.players[i].bei.setVisible(false);
                }
                //if (refscore != null) {
                    this.players[i].playerscore.setString(otherddata.total+"(" + otherddata.allbets +")");
                //}

                if (refscoreuid == otherddata.uid){
                    //.EaseElasticOut
                    var ani = cc.scaleTo(0.5,1,1).easing(cc.easeElasticOut());
                    //ani = cc.sequence(ani,cc.delayTime())
                    this.players[i].beinum.runAction(ani)
                }
                this.players[i].zhuang.setVisible(otherddata.dealer);

                if (otherddata.dealer){
                    haszhuang = true;
                }

                var cards = otherddata.card;

                this.players[i].cards.removeAllChildren();
                this.players[i].cards.setVisible(!otherddata.discard&&!otherddata.lose);


                if (i == 0){
                    banker = otherddata.dealer;
                    //isopen = cards[4] > 0;
                    over = otherddata.score != 0;
                }

                var w = 110;
                var begx = -90*3/2 + 45;

                if(i != 0){
                    w = 25;
                }

                if(i == 3){
                    begx += 150;
                }
                if(i == 1){
                    begx += 150;
                }

                if(i == 2){
                    begx += 150;
                }

                var lst = [];
                for(var m = 0;m < 5; m++){
                    lst[m] = false;
                }
                //var index = mod_compare.gettype(cards,lst);

                for(var j = 0;j < 3; j++){
                    var card = cards[j];
                    var spr = this.cratecard(card);
                    if(i != 0) {
                        spr.setScale(0.8);
                        spr.setPosition(25 * j, 0);
                    } else {
                        spr.setPosition(90 * j, 0);
                    }
                    this.players[i].cards.addChild(spr);

                    //if (j == 3 && isopen && card > 0){
                    //
                    //    if (!this.open[i] && (this.mod_niuniu.gamestate == 1 || this.mod_niuniu.gamestate == 2 )){
                    //        curopen[i] = true;
                    //        this.open[i] = true;
                    //    }
                    //
                    //    var tempspr = this.crateniuniuani(cards,curopen[i]);
                    //    spr.addChild(tempspr);
                    //}
                }

                if (otherddata.open){
                    var lable = cc.Sprite.create();
                        //lable.setTexture(res.zjhfen6);
                        lable.setTexture(res.kanpaiLogo);
                    if(i == 0) {
                        lable.setPosition(86.73, 83.40);
                    } else {
                        lable.setPosition(20.67, 0);
                    }
                    //lable.setFontSize(36);
                    //lable.setString("看牌");
                    this.players[i].cards.addChild(lable);
                }
            }
        }

        if (!haszhuang){
            showqiangzhuang = true;
        }

        if (showqiangzhuang){
            var playerdata = this.mod_niuniu.getplayerdata(0);
            if (playerdata!= null &&playerdata.rob == 0){
                this.qiangzhuang.setVisible(true);
                this.buqiang.setVisible(true);
            }

            for(var i = 0; i < 5; i ++){
                var playerdata = this.mod_niuniu.getplayerdata(i);
                if(playerdata != null){
                    if(playerdata.rob == 1){
                        this.players[i].qiangtxt.setVisible(true);
                        this.players[i].qiangtxt.setString("抢庄");
                    }else if(playerdata.rob == 2){
                        this.players[i].qiangtxt.setVisible(true);
                        this.players[i].qiangtxt.setString("不抢");
                    }
                }
            }

        }
    }else{
        for (var i = 0;i < 5;i ++) {
            //this.players[i].arr.setVisible(false);
        }
    }


    if (!over){
        //var btngamebets = ccui.helper.seekWidgetByName(this.node, "gamebets");
        //btngamebets.setVisible(begin && iscurop);
        ccui.helper.seekWidgetByName(this.node, "invitebtn").setVisible(!begin && !isopen);

        this.genzhu.setVisible(begin);
        this.jiazhu.setVisible(begin);
        this.kanpai.setVisible(begin);
        this.bipai.setVisible(begin);
        this.qipai.setVisible(begin);

        var canopenqipai = this.mod_niuniu.gameniuniuinfo && this.mod_niuniu.gameniuniuinfo.round > 0

        this.genzhu.setBright(begin && iscurop && !discard);
        this.jiazhu.setBright(begin && iscurop && !discard && this.mod_niuniu.gameniuniuinfo.point == 1);
        this.kanpai.setBright(begin && !discard && !isopen && canopenqipai);
        this.bipai.setBright(begin && iscurop && !discard && canopenqipai);
        this.qipai.setBright(begin && !discard && canopenqipai && !islose);

        this.genzhu.setTouchEnabled(this.genzhu.isBright());
        this.jiazhu.setTouchEnabled(this.jiazhu.isBright());
        this.kanpai.setTouchEnabled(this.kanpai.isBright());
        this.bipai.setTouchEnabled(this.bipai.isBright());
        this.qipai.setTouchEnabled(this.qipai.isBright());
    }else{
        //ccui.helper.seekWidgetByName(this.node, "gamebets").setVisible(false);
        ccui.helper.seekWidgetByName(this.node, "invitebtn").setVisible(false);
    }
};

//gameclass.zjhtable.prototype.cratearrani = function(sprite1) {
//
//    //var sprite1 = cc.Sprite.create(cc.spriteFrameCache.getSpriteFrame("1.png"));
//    //sprite1.setPosition(cc.p(200, 150));
//    //this.addChild(sprite1, g_GameZOrder.ui);
//
//    //var frames = [];
//    //for (var i = 1; i < 4; i++) {
//    //    var frame = cc.spriteFrameCache.getSpriteFrame("down"+ i + ".png");
//    //    frames.push(frame);
//    //}
//    //var animation = new cc.Animation(frames,0.2);
//    //var animate = new cc.Animate(animation);
//    //var action = animate.repeatForever();//new cc.RepeatForever(animate)
//    //sprite1.runAction(action);
//}


gameclass.zjhtable.prototype.createProgress = function(playerHead,index){
    if(playerHead.getChildByTag(123321)){
        playerHead.getChildByTag(123321).removeFromParent(true);
    }
    var to1 = cc.progressFromTo(15,100,0);
    var timer = new cc.ProgressTimer(new cc.Sprite(res.progressBar));
    timer.setAnchorPoint(0.5,0.5);
    timer.type = cc.ProgressTimer.TYPE_RADIAL;
    timer.setReverseDirection(true);
    //timer.setScale(0.9);
    //timer.setColor(cc.color(255,215,0));
    timer.setTag(123321);
    playerHead.addChild(timer);
    timer.setLocalZOrder(9998);
    playerHead.getChildByName("zhuang"+index).setLocalZOrder(9999);
    timer.setPosition(playerHead.getChildByName("icon"+index).getPosition());
    timer.runAction(to1.repeatForever());
    //return timer;
};

/*
 * 开局后 玩家掉线
 * */
gameclass.zjhtable.prototype.userLineOut = function (index, data) {
    var index = index - this.mod_niuniu.serverchair;
    if(index < 0){
        index = index + 5;
    }
    if (data.line) {
        this.players[index].off_line.setVisible(false);
    } else {
        this.players[index].off_line.setVisible(true);
    }

    gameclass.mod_base.showtximg(this.players[index].iconback, this.players[index].head_url, 0, 0, "im_headbg5", !data.line);
}


