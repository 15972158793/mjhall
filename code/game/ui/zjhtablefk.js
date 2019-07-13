/**
 * Created by yang on 2016/11/9.
 */

gameclass.zjhtablefk = gameclass.baseui.extend({
    sprite: null,
    node: null,
    mod_niuniu: null,
    players: null,
    playersbp: null,
    ongameview: null,
    curround: null,
    buqiang: null,
    qiangzhuang: null,
    menpai: null,
    genpai: null,
    bipai: null,
    zongzhu: null,
    //chouma:null,
    danzhu: null,
    jiazhuextra: null,
    scoreboardsprite: [],
    scoretable: null,
    isjiazhu: null,
    beinumpositon: [],
    cooldown: null,
    bottomScore: -1,
    isBiPaiing: false,
    btn_layer: null,
    //! 动画是否播放完毕
    _isPlayEnd: true,
    gametype:0,
    invitebtn:null,
    //onchat:null,
    ctor: function () {
        this._super();
        this.players = [];
        this.playersbp = [];
    },
    show: function () {
        this.init();
    },
    ongamereadyHandle: function (data) {
        var _this = this;
        _this.refplayerinfo();
        _this.genzhu.setBright(false);
        _this.jiazhu.setBright(false);
        _this.bipai.setBright(false);
        _this.qipai.setBright(false);
        _this.kanpai.setBright(false);

        _this.genzhu.setTouchEnabled(false);
        _this.jiazhu.setTouchEnabled(false);
        _this.bipai.setTouchEnabled(false);
        _this.qipai.setTouchEnabled(false);
        _this.kanpai.setTouchEnabled(false);
        _this.showgameinfo();
    },
    openCardHandle: function (uid, cards, type) {

    },
    kanPaiClickHandle: function () {
        var _this = this;
        _this.setJiazhuextraViewSub(2);
        _this.isjiazhu = false;
        _this.setbipaistate(false);
    },
    setmod: function (_mod_niuniiu) {
        this.mod_niuniu = _mod_niuniiu;
        this.mod_niuniu.bindUI(this);
        var _this = this;
        var mod_login = this.game.mod_login;

        if (window.wx) {
            _this.share();
        }

        if (_this.mod_niuniu.roominfo.time != 0) {
            _this.game.uimgr.showui("gameclass.exitroom", false);
            _this.game.uimgr.uis["gameclass.exitroom"].setData(_this.mod_niuniu, _this.mod_niuniu.roominfo);
        }

        this.mod_niuniu.onupdateroominfo = function (data) {

            _this.refplayerinfo();
            _this.showgameinfo();

        };

        this.mod_niuniu.ongameready = function (data) {
            _this.ongamereadyHandle(data);
        };
        this.mod_niuniu.ongameniuniubegin = function () {
            _this.refreshStep();
            _this.refplayerinfo(null, true);
            _this.playerinfovisible();
            _this.showgameinfo();
        };
        this.mod_niuniu.ongameniuniuinfo = function () {
            _this.showrule();
            _this.showgameinfo();

            _this.setJiazhuextraView();

            ccui.helper.seekWidgetByName(_this.node, "invitebtn").setVisible(false);

            _this.mod_niuniu.ongameniuniuinfoSub();

            _this.refplayerinfo();
        };
        this.mod_niuniu.ongameniuniuinfoSub = function () {
            if (_this.mod_niuniu.gameniuniuinfo.info.length > 0) {
                _this.mod_niuniu.gameniuniuinfo.begin = true;
                _this.playerinfovisible();
                _this.mod_niuniu.gamestate = 1;
                if (_this.mod_niuniu.gameniuniuinfo.info[0].score != 0) {
                    _this.mod_niuniu.gamestate = 2;
                    _this.game.uimgr.showui("gameclass.zjhresultoneui").setniuniumod(_this.mod_niuniu, _this);
                }
            }
        }

        this.mod_niuniu.ongamecompare = function (data) {
            //{\"uid\":106424,\"destuid\":106425,\"win\":false,\"point\":2,\"allpoint\":3,\"round\":1,\"opuid\":106425}"}
            _this.showbipai(data.uid, data.destuid, data.win, data.card1, data.card2)
            _this.bipaistate1 = true;
            _this.refplayerinfo(null, true, null, data.uid);
            _this.showgameinfo();
            _this.bipaistate1 = false;
        };

        this.mod_niuniu.ongamebets = function (uid) {
            _this.refplayerinfo(null, true, null, uid);
            _this.showgameinfo();
        };

        this.mod_niuniu.onchat = function (data) {

            for (var i = 0; i < g_chatstr.length; i++) {
                if (g_chatstr[i] == data.chat) {
                    mod_sound.playeffect(g_music["fix_msg_" + (i + 1)], false);
                }
            }

            for (var i = 0; i < 5; i++) {
                var player = this.getplayerdata(i);
                var otherddata = this.getplayerotherdata(i);
                if (player != null && player.uid == data.uid) {
                    var talkPos = _this.talkPos[i];

                    var arr = [
                        res.chatbg_ld,
                        res.chatbg_rd,
                        res.chatbg_rd,
                        res.chatbg_ld,
                        res.chatbg_ld,
                    ];

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
                            //s9.setContentSize(spr.width + 150, spr.height + 20);
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

        this.mod_niuniu.gamewaittime = function (dealer) {

        }


        this.mod_niuniu.ongamedealer = function (dealer) {

            if (dealer) {
                //var lst = [];

                var playerdata = _this.mod_niuniu.getplayerdata(0);

                var playernum = _this.mod_niuniu.getplayernum();

                var beg = 0;
                var playerlst = [];
                var playerctrl = [];

                for (var i = 0; i < 5; i++) {
                    var player = _this.mod_niuniu.getplayerdata(i);
                    var otherddata = _this.mod_niuniu.getplayerotherdata(i);
                    if (player != null && player.rob == 1) {
                        playerlst[playerlst.length] = otherddata;
                        playerctrl[playerctrl.length] = _this.players[i].zhuang;
                    }
                }

                if (playerlst.length == 0) {
                    for (var i = 0; i < 5; i++) {
                        var otherddata = _this.mod_niuniu.getplayerotherdata(i);
                        if (player != null) {
                            playerlst[i] = otherddata;
                            playerctrl[i] = _this.players[i].zhuang;
                        }
                    }
                }
                if (playerlst.length > 1) {
                    var rand = (Math.floor(Math.random() * 100) % 4 + playerlst.length * 2);
                    var act = cc.repeatForever(cc.sequence(cc.delayTime(0.20), cc.callFunc(function () {
                        var index = beg % playerlst.length

                        for (var i = 0; i < 5; i++) {
                            var otherddata = playerlst[i];
                            if (otherddata != null) {
                                playerctrl[i].setVisible(index == i);
                            }
                        }

                        if (beg > rand) {
                            var otherddata = playerlst[index];

                            if (otherddata != null && otherddata.dealer) {
                                _this.stopAllActions();
                                _this.refplayerinfo();
                                _this.showgameinfo();
                            }
                        }
                        beg++;
                    })));
                    _this.runAction(act);
                } else {
                    _this.refplayerinfo();
                    _this.showgameinfo();
                }

                //lst.sort(function(){ return 0.5 - Math.random() });

            } else {
                _this.refplayerinfo();
                _this.showgameinfo();
            }
        }


        var titiletime = ccui.helper.seekWidgetByName(_this.node, "time");
        var reftime = function () {
            var myDate = new Date();
            var str = myDate.Format("hh:mm");
            titiletime.setString(str);
        };
        reftime();
        var func = cc.repeatForever(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
            reftime();
        })));
        titiletime.runAction(func);

        ccui.helper.seekWidgetByName(_this.node, "roomnum").setString("房号:" + this.mod_niuniu.roominfo.roomid.toString());

        // _this.qiangzhuang = ccui.helper.seekWidgetByName(_this.node, "qiangzhuang");
        // _this.buqiang = ccui.helper.seekWidgetByName(_this.node, "buqiang");

        gameclass.createbtnpress(this.node, "qiangzhuang", function () {
            _this.mod_niuniu.gamedeal(true);
        });

        gameclass.createbtnpress(this.node, "buqiang", function () {
            _this.mod_niuniu.gamedeal(false);
        });

        this.curround = ccui.helper.seekWidgetByName(_this.node, "curround");
        this.lunshu = ccui.helper.seekWidgetByName(_this.node, "lunshu");
        this.zongzhu = ccui.helper.seekWidgetByName(_this.node, "zongzhu");
        //this.chouma= ccui.helper.seekWidgetByName(_this.node, "chouma");
        this.danzhu = ccui.helper.seekWidgetByName(_this.node, "danzhu");
        this.menpai = ccui.helper.seekWidgetByName(_this.node, "menpai");
        this.genpai = ccui.helper.seekWidgetByName(_this.node, "genpai");
        this.bipai1 = ccui.helper.seekWidgetByName(_this.node, "bipai1");

        this.genzhu = ccui.helper.seekWidgetByName(_this.node, "genzhu");
        this.jiazhu = ccui.helper.seekWidgetByName(_this.node, "jiazhu");
        this.kanpai = ccui.helper.seekWidgetByName(_this.node, "kanpai");
        this.bipai = ccui.helper.seekWidgetByName(_this.node, "bipai");
        this.bipaitips = ccui.helper.seekWidgetByName(_this.node, "bipaitips");
        this.bipaitips.setVisible(false);
        this.qipai = ccui.helper.seekWidgetByName(_this.node, "qipai");
        this.scoretable = ccui.helper.seekWidgetByName(_this.node, "scoretable");

        gameclass.createbtnpress(this.node, "genzhu", function () {
            _this.setbipaistate(false);
            if(_this.gametype == gameclass.gameszpbaofang && parseInt(_this.mod_niuniu.roominfo.param1/10000)%10 > 0){
                var curscore = _this.mod_niuniu.gameniuniuinfo.point;
                if(curscore < _this.bottomScore) curscore = _this.bottomScore;
                _this.mod_niuniu.gamebfallbets(curscore);
            }else{
                _this.mod_niuniu.gamebets(1);
            }
        });

        gameclass.createbtnpress(this.node, "kanpai", function () {
            _this.kanPaiClickHandle();
            if(_this.gametype == gameclass.gameszpbaofang && parseInt(_this.mod_niuniu.roominfo.param1/10000)%10 > 0){
                _this.mod_niuniu.gamebfallbets(0);
            }else{
                _this.mod_niuniu.gamebets(0);
            }
        });

        var panel_1 = ccui.helper.seekWidgetByName(_this.node, "Panel_1");
        var panel_3 = ccui.helper.seekWidgetByName(_this.node, "Panel_3");
        this.jiazhuextra = ccui.helper.seekWidgetByName(_this.node, "Panel_2");
        this.jiazhuextra.setVisible(false);
        var slider = ccui.helper.seekWidgetByName(panel_3, "Slider_1");
        slider.addEventListener(function(sender,type){
            var curscore = _this.mod_niuniu.gameniuniuinfo.point;
            if(curscore < _this.bottomScore) curscore = _this.bottomScore;
            var maxgold = _this.game.modmgr.mod_login.logindata.gold;
            if(maxgold > 990000) maxgold = 990000;
            var perc = curscore/maxgold*100;
            var curperc = sender.getPercent();
            if(curperc < perc) curperc = perc;
            var xiazhumoney = parseInt(maxgold * (curperc/100));
            if(xiazhumoney < curscore) xiazhumoney = curscore;
            ccui.helper.seekWidgetByName(panel_3,"jiazhuedu").setString(xiazhumoney);
        });
        gameclass.createbtnpress(this.node, "jiazhu", function () {
            panel_1.setVisible(false);
            //cc.log(_this.bottomScore,_this.mod_niuniu.gameniuniuinfo.point);
            if(_this.gametype == gameclass.gameszpbaofang && parseInt(_this.mod_niuniu.roominfo.param1/10000)%10 > 0){
                var curscore = _this.mod_niuniu.gameniuniuinfo.point;
                if(curscore < _this.bottomScore) curscore = _this.bottomScore;
                var maxgold = _this.game.modmgr.mod_login.logindata.gold;
                if(maxgold > 990000) maxgold = 990000;
                var perc = curscore/maxgold*100;
                slider.setPercent(perc);
                ccui.helper.seekWidgetByName(panel_3,"jiazhuedu").setString(curscore);
                panel_3.setVisible(true);
            }else{
                _this.jiazhuextra.setVisible(true);
                if (_this.jiazhuextra.isVisible()) {
                    for (var i = 1; i < _this.jiazhuextra.getChildren().length; i++) {
                        if (i * _this.bottomScore < _this.mod_niuniu.gameniuniuinfo.point) {
                            _this.jiazhuextra.getChildren()[i].setTouchEnabled(false);
                            _this.jiazhuextra.getChildren()[i].setBright(false);
                        }
                        else {
                            _this.jiazhuextra.getChildren()[i].setTouchEnabled(true);
                            _this.jiazhuextra.getChildren()[i].setBright(true);
                        }
                    }
                }
            }
            _this.setbipaistate(false);
        });

        this.jiazhuextra.getChildren()[0].addTouchEventListener(function () {
            _this.setbipaistate(false);
            _this.jiazhuextra.setVisible(false);
            panel_1.setVisible(true);
        })

        this.jiazhuextra.getChildren()[1].addTouchEventListener(function () {
            _this.setbipaistate(false);
            _this.mod_niuniu.gamebets(2);
            _this.jiazhuextra.setVisible(false);
            panel_1.setVisible(true);
        })
        this.jiazhuextra.getChildren()[2].addTouchEventListener(function () {
            _this.setbipaistate(false);
            _this.mod_niuniu.gamebets(3);
            _this.jiazhuextra.setVisible(false);
            panel_1.setVisible(true);
        })
        this.jiazhuextra.getChildren()[3].addTouchEventListener(function () {
            _this.setbipaistate(false);
            _this.mod_niuniu.gamebets(4);
            _this.jiazhuextra.setVisible(false);
            panel_1.setVisible(true);
        })
        this.jiazhuextra.getChildren()[4].addTouchEventListener(function () {
            _this.setbipaistate(false);
            _this.mod_niuniu.gamebets(5);
            _this.jiazhuextra.setVisible(false);
            panel_1.setVisible(true);
        });

        gameclass.createbtnpress(panel_3, "edusure", function () {
            _this.setbipaistate(false);
            var jiazhunum = parseInt(ccui.helper.seekWidgetByName(panel_3,"jiazhuedu").getString());
            _this.mod_niuniu.gamebfallbets(jiazhunum);
            panel_3.setVisible(false);
            panel_1.setVisible(true);
        });

        gameclass.createbtnpress(this.node, "qipai", function () {
            _this.game.uimgr.showui("gameclass.msgboxui");
            _this.game.uimgr.uis["gameclass.msgboxui"].setString("是否确定弃牌？", function () {
                _this.isjiazhu = false;
                _this.setbipaistate(false);
                if(_this.gametype == gameclass.gameszpbaofang && parseInt(_this.mod_niuniu.roominfo.param1/10000)%10 > 0){
                    _this.mod_niuniu.gamebfallbets(-1);
                }else{
                    _this.mod_niuniu.gamebets(-1);
                }
            });
        });

        _this.bipaistate = false;
        _this.bipaistate1 = false;
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
        this.talkPos = [cc.p(75, 200), cc.p(1040, 260), cc.p(1040, 470), cc.p(140, 470), cc.p(140, 260)];

        var gamebets = ccui.helper.seekWidgetByName(this.node, "gamebets");
        this.mod_niuniu.ongameniuniuend = function (data, showfast) {
            for (var i = 0; i < 5; i++) {
                _this.players[i].cooldown.setVisible(false);
                _this.players[i].cooldown.stopAllActions();
            }
            _this.stopAllActions();
            var showtime = 3;
            if (showfast) {
                showtime = 1;
            }
            _this.ongameendHandle(showtime);
        };

        this.mod_niuniu.ongameniuniucardui = function () {
            //_this.refplayerinfo();
        };


        this.ongameview = 0;
        this.mod_niuniu.ongameview = function (uid, cards, type) {
            _this.ongameview = 1;
            _this.refplayerinfo();
            _this.openCardHandle(uid, cards, type);
        };

        this.reset();
        this.refplayerinfo();
    }
});
/**
 * 依据数据更新加注按钮列表显示
 */
gameclass.zjhtablefk.prototype.setJiazhuextraView = function () {
    var rate = 1;
    if (this.mod_niuniu.gameniuniuinfo && this.mod_niuniu.gameniuniuinfo.info) {
        var len = this.mod_niuniu.gameniuniuinfo.info.length;
        for (var i = 0; i < len; i++) {
            var info = this.mod_niuniu.gameniuniuinfo.info[i];
            if (info.uid == this.game.modmgr.mod_login.logindata.uid && info.open) {
                rate = 2;
                break;
            }
        }
    }
    this.setJiazhuextraViewSub(rate);
}
/**
 * 根据倍率更新加注按钮列表显示
 * @param rate
 */
gameclass.zjhtablefk.prototype.setJiazhuextraViewSub = function (rate) {
    for (var i = 1; i < this.jiazhuextra.getChildren().length; i++) {
        this.jiazhuextra.getChildren()[i].getChildren()[0].setString("X" + (i + 1) * rate);
    }
}
gameclass.zjhtablefk.prototype.ongameendHandle = function (delay) {
    this.showGameResultView(delay);
}
gameclass.zjhtablefk.prototype.showGameResultView = function (delay) {
    var _this = this;
    if (_this.mod_niuniu.gamestate == 2 && _this.game.uimgr.uis["gameclass.zjhresultui"] == null) {
        _this.refplayerinfo();
        var ani = cc.sequence(cc.delayTime(delay), cc.callFunc(function (sender) {
            _this.game.uimgr.showui("gameclass.zjhresultoneui").setniuniumod(_this.mod_niuniu, _this);
        }));
        _this.runAction(ani);
    } else {
        if (_this.mod_niuniu.isover) {

            _this.game.uimgr.showui("gameclass.zjhresultui");
            _this.game.uimgr.uis["gameclass.zjhresultui"].setData(_this.mod_niuniu);
        }
    }
}
gameclass.zjhtablefk.prototype.share = function () {
    var shareText = "";
    if(this.gametype == gameclass.gameszpbaofang){
        shareText += "包厢拼三张,房号[" + this.mod_niuniu.roominfo.roomid + "],";
        shareText += parseInt(this.mod_niuniu.roominfo.param1/1000)%10 + "轮封顶，";
        if(parseInt(this.mod_niuniu.roominfo.param1/10000000)%10 == 0) shareText += "比大小，";
        else if (parseInt(this.mod_niuniu.roominfo.param1/10000000)%10 == 1) shareText += "比花色，";
        else if (parseInt(this.mod_niuniu.roominfo.param1/10000000)%10 == 2) shareText += "全比，";

        if (parseInt(this.mod_niuniu.roominfo.param1/1000000)%10 == 1) shareText += "豹子额外奖励，";
        if (parseInt(this.mod_niuniu.roominfo.param1/100000)%10 == 1) shareText += "比牌开双倍，";
        if (parseInt(this.mod_niuniu.roominfo.param1/10000)%10 == 1) shareText += "拼到底，";

        shareText += (parseInt(this.mod_niuniu.roominfo.param1/100)%10+1) + "轮比牌，";
        if(parseInt(this.mod_niuniu.roominfo.param1/10)%10 == 0)
            shareText += "不闷，";
        else
            shareText += "闷牌" + (parseInt(this.mod_niuniu.roominfo.param1/10)%10+1) + "轮，";

        if(this.mod_niuniu.roominfo.param1%10 == 0) shareText += "底分:50";
        else if(this.mod_niuniu.roominfo.param1%10 == 1) shareText += "底分:100";
        else if(this.mod_niuniu.roominfo.param1%10 == 2) shareText += "底分:200";
        else if(this.mod_niuniu.roominfo.param1%10 == 3) shareText += "底分:500";
        else if(this.mod_niuniu.roominfo.param1%10 == 4) shareText += "底分:1000";
    }else {
        var fengding = parseInt(this.mod_niuniu.roominfo.param1 / 10) % 10 * 5;
        shareText += "疯狂三张,房号[" + this.mod_niuniu.roominfo.roomid + "],";
        shareText = shareText + String(fengding) + "轮封顶，";
        if (this.mod_niuniu.roominfo.wanfa == 1) shareText += "比大小，";
        else if (this.mod_niuniu.roominfo.wanfa == 2) shareText += "比花色，";
        else if (this.mod_niuniu.roominfo.wanfa == 3) shareText += "全比，";

        if (this.mod_niuniu.roominfo.extraReward) shareText += "豹子额外奖励，";
        if (this.mod_niuniu.roominfo.bishuangbei) shareText += "比牌双倍，";
        if (this.mod_niuniu.roominfo.zidongqipai) shareText += "超时自动弃牌。";
    }
    cc.log(shareText);
    gameclass.mod_platform.invitefriend(shareText,
        this.mod_niuniu.roominfo.roomid,
        "傲世娱乐三张牌-" + this.mod_niuniu.roominfo.roomid + "-");
};

gameclass.zjhtablefk.prototype.showrule = function () {
    //root =ccui.helper.seekWidgetByName(this.node, "Image_21");
    //var compare = " 比大小 ";
    //if(this.mod_niuniu.roominfo.param1 % 10 == 2) {
    //    compare = " 比花色 ";
    //}
    //else if(this.mod_niuniu.roominfo.param1 % 10 == 3)
    //{
    //    compare = " 全比 ";
    //}
    //
    //var extra="";
    //if(this.mod_niuniu.roominfo.param2 % 10 == 1) {
    //    extra += "豹子额外奖励 ";
    //}
    //if(parseInt((this.mod_niuniu.roominfo.param2 % 100) / 10) == 1 ){
    //    extra += "比牌双倍开 ";
    //}
    //if(parseInt((this.mod_niuniu.roominfo.param2 % 1000)/100) == 1) {
    //    extra += "解散局算分 ";
    //}
    //if(parseInt(this.mod_niuniu.roominfo.param2 / 1000) == 1) {
    //    extra += "超时自动弃牌 ";
    //}
    //
    //var str=new cc.LabelTTF(compare+extra,"Arial",20);
    //str.setPosition(0,root._getHeight()/2);
    //str.setAnchorPoint(cc.p(0,0.5));
    //root.addChild(str,0);
};

gameclass.zjhtablefk.prototype.checkSafe = function (people) {
    this.safeLayer.checkSafe(people);
};
gameclass.zjhtablefk.prototype.createNode = function () {
    this.node = this.game.uimgr.createnode(res.zjhtablefk, true);
}
gameclass.zjhtablefk.prototype.init = function () {
    this.bottomScore = 1;
    var _this = this;
    this.isjiazhu = true;
    cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
    cc.spriteFrameCache.addSpriteFrames(res.ani1list);

    this.createNode();
    this.node.setPosition((cc.winSize.width - this.node.getContentSize().width) / 2, 0);
    this.addChild(this.node);

    this.invitebtn = ccui.helper.seekWidgetByName(this.node, "invitebtn");

    this.btn_layer = new gameclass.btn_setLayer(_this.node, _this.game);
    this.node.addChild(this.btn_layer);
    var closeinfo = ccui.helper.seekWidgetByName(_this.node, "closeinfo");
    closeinfo.setLocalZOrder(1000);
    this.btn_layer.setLocalZOrder(999);

    this.safeLayer = new gameclass.checkSafeLayer(this.node, this.game, ccui.helper.seekWidgetByName(this.btn_layer, "btn_safe"));
    this.safeLayer.setName("safeLayer");
    this.node.addChild(this.safeLayer);

    var dianchi = ccui.helper.seekWidgetByName(this.node, "dianchi");
    dianchi.setPercent(gameclass.battery);

    //gameclass.createbtnpress(this.node, "exitRoom", function () {
    //    _this.game.uimgr.showui("gameclass.msgboxui");
    //    _this.game.uimgr.uis["gameclass.msgboxui"].setString("是否想要解散房间？",function(){
    //        _this.mod_niuniu.dissmissroom();
    //    });
    //    //_this.game.uimgr.showui("gameclass.exitroom");
    //});

    gameclass.createbtnpress(this.node, "invitebtn", function () {
        _this.share();
    });

    var begin = function () {
        //gameclass.mod_platform.invitefriend("11111111","roomid","11111111");
    };

    var end = function () {
        //gameclass.mod_platform.invitefriend("11111111","roomid","11111111");
    };
    //gameclass.createbtnpress(this.node, "mic", end, begin);

    gameclass.createbtnpress(this.node, "ready", function () {
        _this.mod_niuniu.gameready();
    });

    gameclass.createbtnpress(this.node, "gamebets1", function () {
        _this.mod_niuniu.gamebets(1);
        _this.refplayerinfo(null, null, true);
    });
    gameclass.createbtnpress(this.node, "gamebets2", function () {
        _this.mod_niuniu.gamebets(2);
        _this.refplayerinfo(null, null, true);
    });
    gameclass.createbtnpress(this.node, "gamebets3", function () {
        _this.mod_niuniu.gamebets(3);
        _this.refplayerinfo(null, null, true);
    });
    gameclass.createbtnpress(this.node, "gamebets4", function () {
        _this.mod_niuniu.gamebets(4);
        _this.refplayerinfo(null, null, true);
    });
    gameclass.createbtnpress(this.node, "gamebets5", function () {
        _this.mod_niuniu.gamebets(5);
        _this.refplayerinfo(null, null, true);
    });

    gameclass.createbtnpress(this.node, "mingpai", function () {
        ccui.helper.seekWidgetByName(_this.node, "mingpai").setVisible(false);
        _this.mod_niuniu.gameview();
        _this.refplayerinfo();
    });

    var showipinfo = function (sender, type) {
        if (ccui.Widget.TOUCH_ENDED == type) {
            //if(sender.index == 0) return;
            if (_this.bipaistate) {
                if (sender.index == 0) return;
                _this.setbipaistate(false);
                _this.mod_niuniu.gamecompare(sender.index);
                return;
            }
            var playerdata = _this.mod_niuniu.getplayerdata(sender.index);
            _this.game.uimgr.showui("gameclass.chatMicLayer").setPlayerInfo(playerdata, _this.mod_niuniu, sender.index);
        }
    }


    for (var i = 0; i < 5; i++) {
        var data = {};
        data.head = ccui.helper.seekWidgetByName(this.node, "head" + i);
        data.c = ccui.helper.seekWidgetByName(this.node, "c" + i);
        data.c.index = i;
        data.c.addTouchEventListener(showipinfo);
        data.c.setVisible(true);

        data.zhuang = ccui.helper.seekWidgetByName(this.node, "zhuang" + i);
        data.cards = ccui.helper.seekWidgetByName(this.node, "notifynode" + i);

        spr = new cc.Sprite(res.zjhprogress);
        data.cooldown = new cc.ProgressTimer(spr);
        data.head.addChild(data.cooldown);
        data.cooldown.setPosition(0 + data.head.getContentSize().width / 2, 0 + data.head.getContentSize().height / 2);
        data.beinum = ccui.helper.seekWidgetByName(this.node, "beinum" + i);
        this.beinumpositon[i] = data.beinum.getPosition();
        data.bei = data.beinum;
        data.qiangtxt = ccui.helper.seekWidgetByName(this.node, "bei" + i + "_0");
        data.icon = null;
        data.zhuang = ccui.helper.seekWidgetByName(this.node, "zhuang" + i);
        data.iconback = ccui.helper.seekWidgetByName(this.node, "icon" + i);
        data.iconPosX = data.iconback.getPositionX();
        data.iconPosY = data.iconback.getPositionY();
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
        data.off_line = ccui.helper.seekWidgetByName(data.head, "off_line");
        data.off_line.setVisible(false);
        //data.arr = ccui.helper.seekWidgetByName(this.node, "arr" + i);
        //this.cratearrani(data.arr);
        this.players[i] = data;
    }

    //比牌层
    this.bipaiceng = ccui.helper.seekWidgetByName(this.node, "bipaiceng");
    this.bipaiceng.setVisible(false);
};

gameclass.zjhtablefk.prototype.getCardStr = function (card) {
    var cardStr = "";
    if (card > 0) {
        var abcd = ["a", "d", "b", "c"];
        var point = Math.floor(card / 10);
        var type = card % 10;
        cardStr = "card_" + point + abcd[type - 1] + ".png";
    } else {
        cardStr = "pukebeimian.png";
    }

    return cardStr;
};

gameclass.zjhtablefk.prototype.showbipai = function (uid, uid2, win, card1, card2) {
    var data = [];
    var playerData1 = this.mod_niuniu.getplayerdatabyuid(uid);
    var playerData2 = this.mod_niuniu.getplayerdatabyuid(uid2);
    var chair1 = this.mod_niuniu.getPlayerIndexById(uid);
    var chair2 = this.mod_niuniu.getPlayerIndexById(uid2);

    data[0] = {"playerData": playerData1, "win": win, "card": card1, "chair": chair1};
    data[1] = {"playerData": playerData2, "win": !win, "card": card2, "chair": chair2};

    var nodeArr = [];
    this.bipaiceng.setVisible(true);
    nodeArr[0] = this.bipaiceng.getChildByName("p0");
    nodeArr[1] = this.bipaiceng.getChildByName("p1");
    for (var i = 0; i < 2; i++) {
        nodeArr[i].getChildByName("winLose").setVisible(false);
        nodeArr[i].getChildByName("winLight").setVisible(false);
        for (var j = 0; j < 3; j++) {
            nodeArr[i].getChildByName("head").getChildByName("poke" + j).setVisible(false);
        }
    }

    var _this = this;
    nodeArr[0].runAction(cc.sequence(cc.moveTo(0.5, cc.p(168, 175)), cc.callFunc(function () {
        for (var i = 0; i < 2; i++) {
            nodeArr[i].getChildByName("winLose").setVisible(true);
            nodeArr[i].getChildByName("winLose").loadTexture(data[i].win ? res.winlogo : res.loselogo);
            nodeArr[i].getChildByName("winLight").setVisible(data[i].win);
            var headBg = nodeArr[i].getChildByName("head");
            gameclass.mod_base.showtximg(headBg.getChildByName("icon"), data[i].playerData.imgurl, 0, 0, "im_headbg5");
            headBg.getChildByName("playername").setString(data[i].playerData.name);
            headBg.getChildByName("playerscore").setString(
                _this.players[data[i].chair].head.getChildByName("playerscore" + data[i].chair).getString());
            for (var j = 0; j < 3; j++) {
                headBg.getChildByName("poke" + j).setVisible(true);
                if (data[i].card[j] > 0) {
                    var cardStr = _this.getCardStr(data[i].card[j]);
                    headBg.getChildByName("poke" + j).loadTexture(cardStr, ccui.Widget.PLIST_TEXTURE);
                } else {
                    headBg.getChildByName("poke" + j).loadTexture(res.pokerBei, ccui.Widget.LOCAL_TEXTURE);
                }
            }
        }
        _this.node.scheduleOnce(function () {
            _this.bipaiceng.setVisible(false);
            nodeArr[0].setPositionX(-566);
            nodeArr[1].setPositionX(1250);
        }, 2.5);
    })))
    nodeArr[1].runAction(cc.sequence(cc.moveTo(0.5, cc.p(522, 139)), cc.callFunc(function () {

    })))
    return nodeArr;
};

gameclass.zjhtablefk.prototype.setbipaistate = function (b) {
    this.bipaistate = b;
    for (var i = 1; i < 5; i++) {
        var otherddata = this.mod_niuniu.getplayerotherdata(i);
        if (otherddata != null) {
            this.players[i].head.stopAllActions();
            if (!otherddata.lose && !otherddata.discard && b) {
                var ani = cc.sequence(cc.scaleTo(0.5, 1), cc.scaleTo(0.5, 0.8));
                var act = cc.repeatForever(ani);
                this.players[i].head.runAction(act)
            } else {
                this.players[i].head.setScale(1);
            }
        }
    }

    this.bipaitips.setVisible(b);
};

gameclass.zjhtablefk.prototype.reset = function () {
    this.setJiazhuextraViewSub(1);
    this.danzhu.setString("单注X1");
    this.isjiazhu = true;
    this.bipaistate1 = false;
    this.ongameview = 0;
    this.open = [false, false, false, false];
    this.scoretable.removeAllChildren();
    this.mod_niuniu.gamestate = 0;
    this.mod_niuniu.ongameviewid = 0;

    for (var i = 0; i < 5; i++) {
        this.players[i].zhuang.setVisible(false);
        this.players[i].cards.removeAllChildren();
    }

    this.refreshStep();
};

gameclass.zjhtablefk.prototype.refreshStep = function () {
    var curstep = this.mod_niuniu.roominfo.step;
    if (curstep > this.mod_niuniu.roominfo.maxstep) {
        curstep = this.mod_niuniu.roominfo.maxstep;
    } else if (curstep == 0) {
        curstep = 1;
    }
    this.curround.setString("局数:" + curstep + "/" + this.mod_niuniu.roominfo.maxstep);
}

gameclass.zjhtablefk.prototype.cratecard = function (card, up) {
    var abcd = ["a", "d", "b", "c"];
    var point = Math.floor(card / 10);
    var type = card % 10;
    var spr = new cc.Sprite();
    if (card <= 0) {
        spr.setTexture(res.pokerBei);
    } else {
        spr.initWithSpriteFrameName("card_" + point + abcd[type - 1] + ".png");
    }
    spr.setAnchorPoint(cc.p(0.5, 0.5));
    return spr;
};

gameclass.zjhtablefk.prototype.crateniuniuani = function (cardlst, soundniu) {

    var spr = cc.Sprite.create();

    var lst = [];
    for (var i = 0; i < 5; i++) {
        lst[i] = false;
    }
    var index = mod_compare.gettype(cardlst, lst);
    if (index > mod_compare.TYPE_YOUNIU) {
        index -= mod_compare.TYPE_YOUNIU;
    } else {
        index = 0;
    }
    spr.initWithSpriteFrameName("wenziniu" + index + ".png");
    spr.setAnchorPoint(cc.p(0.5, 0.5));

    if (soundniu) {
        // cc.log(index);
        mod_sound.playeffect(g_music["niu_" + index + "_w"], false);
    }

    return spr;
};

gameclass.zjhtablefk.prototype.resetIcon = function (uid) {
    for (var i = 0; i < 5; i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata == null) {
            continue;
        }
        if (playerdata.uid != uid) {
            continue;
        }

        gameclass.mod_base.showtximg(this.players[i].iconback, playerdata.imgurl, 0, 0, "im_headbg5", playerdata.ip == "")
        break;
    }
};

gameclass.zjhtablefk.prototype.playerinfovisible = function () {
    this.zongzhu.setVisible(true);
    this.danzhu.setVisible(true);
    this.genpai.setVisible(true);
    this.bipai1.setVisible(true);
    this.menpai.setVisible(true);
}

gameclass.zjhtablefk.prototype.genbimen = function (_param) {
    //var fending = 10; var bipai = 100; var menpai = 1000;
    var param = _param;  var isbaofang = false;
    var temparr = [0,2,3,5]; //闷牌
    if(this.gametype == gameclass.gameszpbaofang) {
        isbaofang = true;
        temparr = [0,1,2,3];
        //1000 const TYPE_GOLDZJH_FD = 4  //! 封顶   0,5轮  1,10轮   2,15轮  //房卡的是闷牌，值是123
        //100 const TYPE_GOLDZJH_BL = 5  //! 比牌轮数 0,1轮   1,2轮   2,3轮 //房卡的值是123 位数和包厢一致
        //10 const TYPE_GOLDZJH_MP = 6  //! 闷牌轮数  0不闷  1,2轮   2,3轮   3,4轮 //房卡的是封顶，值一致
       if(param == 10) param = 1000;
        else if(param == 1000) param = 10;
    }
    var param1 = this.mod_niuniu.roominfo.param1;
    var result = 0;
    var tmp = parseInt((param1 / param) % 10);
    switch (param) {
        case 10:
            if(isbaofang)
                result = temparr[tmp];
            else
                result = tmp * 5;
            break;
        case 100:
            if(isbaofang)
                result = tmp+1;
            else
                result = tmp;
            break;
        case 1000:
            if(isbaofang)
                result = (tmp+1)*5;
            else
                result = temparr[tmp];
            break;
    }
    return result;

}

gameclass.zjhtablefk.prototype.showgameinfo = function () {
    var gen = this.genbimen(10);
    var bi = this.genbimen(100);
    var men = this.genbimen(1000);
    if (this.mod_niuniu.gameniuniuinfo == null) {

    } else {
        this.zongzhu.setString("总注:" + this.mod_niuniu.gameniuniuinfo.allpoint);
        this.genpai.setString("跟:" + (this.mod_niuniu.gameniuniuinfo.round < gen ? this.mod_niuniu.gameniuniuinfo.round : gen) + "/" + gen);
        this.bipai1.setString("比:" + (this.mod_niuniu.gameniuniuinfo.round < bi ? this.mod_niuniu.gameniuniuinfo.round : bi) + "/" + bi);
        var wanfaStr = ["", "比大小", "比花色", "全比"];
        ccui.helper.seekWidgetByName(this.node, "quanbi").setString(wanfaStr[this.mod_niuniu.roominfo.wanfa]);
        ccui.helper.seekWidgetByName(this.node, "bishuangbei").setVisible(this.mod_niuniu.roominfo.bishuangbei);
        ccui.helper.seekWidgetByName(this.node, "extraReward").setVisible(this.mod_niuniu.roominfo.extraReward);
        ccui.helper.seekWidgetByName(this.node, "extraReward_0").setVisible(this.mod_niuniu.roominfo.zidongqipai);
        if (this.genbimen(1000) == 0) {
            this.menpai.setString("闷:无");
        }
        else {
            this.menpai.setString("闷:" + (this.mod_niuniu.gameniuniuinfo.round < men ? this.mod_niuniu.gameniuniuinfo.round : men) + "/" + men);
        }
    }

}

gameclass.zjhtablefk.prototype.refplayerinfo = function (showother, refscore, soundniu, refscoreuid) {
    var begin = this.mod_niuniu.gameniuniuinfo != null && this.mod_niuniu.gameniuniuinfo.begin;
    for (var i = 0; i < 5; i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        var has = playerdata != null;
        this.players[i].head.setVisible(has);
        this.players[i].bei.setVisible(false);
        if (has) {
            var player = playerdata;
            this.players[i].playername.setString(playerdata.name);
            this.players[i].ok.setVisible(this.mod_niuniu.isReady(player.uid) && this.mod_niuniu.gamestate != 1 && this.mod_niuniu.gamestate != 2);
            gameclass.mod_base.showtximg(this.players[i].iconback, playerdata.imgurl, 0, 0, "im_headbg5", player.ip == "")
            this.players[i].off_line.setVisible(!playerdata.line);
            this.players[i].head_url = playerdata.imgurl || "";
        } else {
            this.players[i].cards.removeAllChildren();
        }
    }
    if (this._isPlayEnd) {
        if ((this.mod_niuniu.selfdata && this.mod_niuniu.isReady(this.mod_niuniu.selfdata.uid)) || begin) {
            if(this.gametype == gameclass.gameszpbaofang)
                ccui.helper.seekWidgetByName(this.node, "startready").setVisible(false);
            else
                ccui.helper.seekWidgetByName(this.node, "ready").setVisible(false);
        } else {
            if(this.gametype == gameclass.gameszpbaofang)
                ccui.helper.seekWidgetByName(this.node, "startready").setVisible(true);
            else
                ccui.helper.seekWidgetByName(this.node, "ready").setVisible(true);
        }
    }

    // ccui.helper.seekWidgetByName(this.node, "ready").setVisible(!this.mod_niuniu.selfdata.ready && !begin);

    var iskanpai = false;
    var banker = false;
    var isopen = false;
    var islose = false;
    var discard = false;
    var over = false;
    var showqiangzhuang = false;
    var curopen = [false, false, false, false];
    var iscurop = this.mod_niuniu.gameniuniuinfo && this.mod_niuniu.gameniuniuinfo.curop == this.game.modmgr.mod_login.logindata.uid;
    if (begin) {
        var haszhuang = false;
        for (var i = 0; i < 5; i++) {
            var otherddata = this.mod_niuniu.getplayerotherdata(i);
            if (otherddata != null) {
                if (otherddata.uid == this.mod_niuniu.gameniuniuinfo.curop) {
                    this.createProgress(this.players[i].head, i);
                } else {
                    if (this.players[i].head.getChildByTag(123321)) {
                        this.players[i].head.getChildByTag(123321).removeFromParent(true);
                    }
                }

                var iself = this.game.modmgr.mod_login.logindata.uid == otherddata.uid;
                if (iself && otherddata.open) {
                    isopen = true
                }
                if (!isopen) {
                    this.danzhu.setString("单注X" + this.mod_niuniu.gameniuniuinfo.point);
                }
                else {
                    this.danzhu.setString("单注X" + this.mod_niuniu.gameniuniuinfo.point * 2);
                }

                if (iself && otherddata.discard) {
                    discard = true
                }

                if (iself && otherddata.lose) {
                    islose = true
                }

                if (otherddata.bets != 0) {

                    this.players[i].bei.setVisible(true);
                    var bet = Math.floor(Math.abs(otherddata.bets));
                    if (bet >= this.bottomScore) {

                        if (this.bipaistate1) {
                            if (parseInt((this.mod_niuniu.roominfo.param2 % 100) / 10) == 1) {
                                if (refscoreuid == otherddata.uid) {
                                    this.createscoreboards(2, bet, this.players[i], otherddata.open);
                                    this.players[i].beinum.setTexture(res["img" + bet * 2]);
                                }
                            }
                            //this.players[i].beinum.initWithSpriteFrameName("ssl_num2_" + bet + ".png");
                            else {
                                if (refscoreuid == otherddata.uid) {
                                    this.createscoreboards(1, bet, this.players[i], otherddata.open);
                                    this.players[i].beinum.setTexture(res["img" + bet]);
                                }
                            }
                            //this.players[i].beinum.setScale(0);
                        }
                        else {
                            if (this.isjiazhu) {
                                if (refscoreuid == otherddata.uid) {
                                    this.createscoreboards(1, bet, this.players[i], otherddata.open);
                                    this.players[i].beinum.setTexture(res["img" + bet]);
                                }
                            }
                            else {
                                iskanpai = true;
                            }

                        }
                        this.players[i].beinum.setScale(0);
                    }
                    //("res/ui/niuniunew/ssl_num2_" + otherddata.bets + ".png");
                    //this.players[i].bei.setString(Math.abs(otherddata.bets ) + "倍");
                } else {
                    this.players[i].bei.setVisible(false);
                }
                //if (refscore != null) {
                this.players[i].playerscore.setString(otherddata.total + "(" + otherddata.allbets + ")");
                //}
                // this.players[i].playerscore.setString("9999999");

                if (refscoreuid == otherddata.uid) {
                    //.EaseElasticOut
                    //var ani = cc.scaleTo(0.5,2,2).easing(cc.easeElasticOut());
                    //分数的动画
                    var fadeout = cc.fadeOut(3);
                    var moveby1 = cc.moveBy(3, 0, 100);
                    var ani = cc.spawn(fadeout, moveby1);
                    fadeout = cc.sequence(cc.delayTime(1), ani);
                    //初始化
                    this.players[i].beinum.stopAllActions();
                    this.players[i].beinum.setPosition(this.beinumpositon[i]);
                    this.players[i].beinum.setScale(1.5);
                    this.players[i].beinum.setOpacity(255);
                    //执行动画
                    this.players[i].beinum.runAction(fadeout)
                }

                if (otherddata.dealer) {
                    haszhuang = true;
                }

                var cards = otherddata.card;

                // cc.log(otherddata.uid + ":removeCard........");
                this.players[i].cards.removeAllChildren();
                this.players[i].cards.setVisible(!otherddata.discard && !otherddata.lose);


                if (i == 0) {
                    banker = otherddata.dealer;
                    //isopen = cards[4] > 0;
                    over = otherddata.score != 0;
                }

                var w = 110;
                var begx = -90 * 3 / 2 + 45;

                if (i != 0) {
                    w = 25;
                }

                if (i == 3) {
                    begx += 150;
                }
                if (i == 1) {
                    begx += 150;
                }

                if (i == 2) {
                    begx += 150;
                }

                var lst = [];
                for (var m = 0; m < 5; m++) {
                    lst[m] = false;
                }
                //var index = mod_compare.gettype(cards,lst);
                // cc.log(otherddata.uid + ":addCard........cardLen=" + cards.length);
                this.updateHandCard(this.players[i].cards, cards, i);

                if (!iself) {
                    if (otherddata.open) {
                        this.addCardStatue(this.players[i].cards, res.kanpaiLogo, i);
                    }
                }
            }
        }
        if (iskanpai) {
            this.isjiazhu = true;
        }

        if (!haszhuang) {
            showqiangzhuang = true;
        }

        if (showqiangzhuang) {
            var playerdata = this.mod_niuniu.getplayerdata(0);

            for (var i = 0; i < 5; i++) {
                var playerdata = this.mod_niuniu.getplayerdata(i);
                if (playerdata != null) {
                    if (playerdata.rob == 1) {
                        this.players[i].qiangtxt.setVisible(true);
                        this.players[i].qiangtxt.setString("抢庄");
                    } else if (playerdata.rob == 2) {
                        this.players[i].qiangtxt.setVisible(true);
                        this.players[i].qiangtxt.setString("不抢");
                    }
                }
            }

        }
    }

    if (!over) {
        ccui.helper.seekWidgetByName(this.node, "invitebtn").setVisible(!begin && !isopen);
        this.genzhu.setVisible(begin);
        this.jiazhu.setVisible(begin);
        this.bipai.setVisible(begin);
        this.qipai.setVisible(begin);
        var canopenqipai = this.mod_niuniu.gameniuniuinfo && this.mod_niuniu.gameniuniuinfo.round > 0;
        var canbipai = this.mod_niuniu.gameniuniuinfo && this.mod_niuniu.gameniuniuinfo.round + 1 > this.genbimen(100);
        var cankanpai = this.mod_niuniu.gameniuniuinfo && this.mod_niuniu.gameniuniuinfo.round + 1 > this.genbimen(1000);
        this.genzhu.setBright(begin && iscurop && !discard);
        var bool = false;
        if(begin && iscurop && !discard){
            if(this.mod_niuniu.gameniuniuinfo.point < this.bottomScore * gameclass.mod_zjhGold.SCORE_RATE[gameclass.mod_zjhGold.SCORE_RATE.length - 1])
                bool = true;
            if(this.gametype == gameclass.gameszpbaofang && parseInt(this.mod_niuniu.roominfo.param1/10000)%10 > 0)  bool = true;
        }
        this.jiazhu.setBright(bool);
        this.bipai.setBright(begin && iscurop && !discard && canopenqipai && canbipai);
        this.qipai.setBright(begin && !discard && canopenqipai && !islose);
        this.genzhu.setTouchEnabled(this.genzhu.isBright());
        this.jiazhu.setTouchEnabled(this.jiazhu.isBright());
        this.bipai.setTouchEnabled(this.bipai.isBright());
        this.qipai.setTouchEnabled(this.qipai.isBright());
        var showkanpai = begin && !discard && !isopen && canopenqipai && cankanpai && !islose;
        this.kanpai.setVisible(showkanpai);
        this.kanpai.setBright(showkanpai);
        this.kanpai.setTouchEnabled(showkanpai);
    } else {
        ccui.helper.seekWidgetByName(this.node, "invitebtn").setVisible(false);
    }
};
gameclass.zjhtablefk.prototype.addCardStatue = function (cardContain, imgUrl, index) {
    var lable = cc.Sprite.create();
    lable.initWithFile(imgUrl);
    if (index == 0) {
        lable.setPosition(86.73, 83.40);
    } else {
        lable.setPosition(20.67, 0);
    }
    cardContain.addChild(lable);
}
gameclass.zjhtablefk.prototype.updateHandCard = function (cardContain, cardArr, index) {
    // cc.log("updateHandCard..........");
    if (cardArr == null || cardArr.length == 0) return;
    cardContain.removeAllChildren();
    for (var j = 0; j < 3; j++) {
        var card = cardArr[j];
        var spr = this.cratecard(card);
        if (index != 0) {
            spr.setScale(0.8);
            spr.setPosition(25 * j, 0);
        } else {
            spr.setPosition(90 * j, 0);
        }
        cardContain.addChild(spr);
    }
}
/**
 * 丢筹码
 * @param times
 * @param bet
 * @param player
 */
gameclass.zjhtablefk.prototype.createscoreboards = function (times, bet, player, isOpen) {
    // cc.log("createscoreboards:times=" + times + ",bet=" + bet + ",player=" + player);

    for (var i = 0; i < times; i++) {
        this.createscoreboard(bet, player);
    }
}
gameclass.zjhtablefk.prototype.createscoreboard = function (bet, player) {
    var x = -150 + 300 * Math.random();
    var y = -100 + 200 * Math.random();
    var scoreboardsprite = new cc.Sprite(this.getChipResource(bet));
    scoreboardsprite.setContentSize(49, 51);
    scoreboardsprite.setAnchorPoint(cc.p(0.5, 0.5));
    this.scoretable.addChild(scoreboardsprite);
    scoreboardsprite.setPosition(player.head.getPositionX() - cc.director.getWinSize().width / 2, player.head.getPositionY() - cc.director.getWinSize().height / 2);
    var time = cc.pDistance(scoreboardsprite.getPosition(), cc.p(x, y)) / 1000;
    var ani = cc.moveTo(time, x, y);
    var randomAng = parseInt(Math.random() * 360);
    scoreboardsprite.runAction(cc.spawn(cc.rotateTo(time, randomAng, randomAng), ani));
    return scoreboardsprite;
}

gameclass.zjhtablefk.prototype.showChipArr = function (_chipArr) {
    for (var i = 0; i < _chipArr.length; i++) {
        this.showChip(_chipArr[i]);
    }
};
gameclass.zjhtablefk.prototype.showChip = function (chip) {
    var x = -150 + 300 * Math.random();
    var y = -100 + 200 * Math.random();
    var chip = new cc.Sprite(res["chip" + chip]);
    chip.setContentSize(49, 51);
    chip.setAnchorPoint(cc.p(0.5, 0.5));
    chip.setPosition(cc.p(x, y));
    this.scoretable.addChild(chip);
    return chip;
};
gameclass.zjhtablefk.prototype.getChipArr = function (_allPoint) {
    var chipArr = [10, 5, 3, 1];
    var resultArr = [];
    var index = 0;
    var digui = function () {
        if (_allPoint == 0) return resultArr;
        if (_allPoint >= chipArr[index]) {
            _allPoint -= chipArr[index];
            resultArr.push(chipArr[index]);
        } else {
            index++;
            digui();
        }

        if (_allPoint > 0) {
            digui();
        }
    }
    digui();
    this.showChipArr(resultArr);
};
gameclass.zjhtablefk.prototype.getChipResource = function (bet) {
    return res["chip" + bet];
}

//gameclass.zjhtablefk.prototype.cratearrani = function(sprite1) {
//
//    //var sprite1 = cc.Sprite.create(cc.spriteFrameCache.getSpriteFrame("1.png"));
//    //sprite1.setPosition(cc.p(200, 150));
//    //this.addChild(sprite1, g_GameZOrder.ui);
//    var frames = [];
//    for (var i = 1; i < 4; i++) {
//        var frame = cc.spriteFrameCache.getSpriteFrame("down"+ i + ".png");
//        frames.push(frame);
//    }
//    var animation = new cc.Animation(frames,0.2);
//    var animate = new cc.Animate(animation);
//    var action = animate.repeatForever();//new cc.RepeatForever(animate)
//    sprite1.runAction(action);
//}

gameclass.zjhtablefk.prototype.createProgress = function (playerHead, index) {
    this.clearProgress(playerHead);
    var to1 = cc.progressFromTo(30, 100, 0);
    var timer = new cc.ProgressTimer(new cc.Sprite(res.progressBar));
    timer.setAnchorPoint(0.5, 0.5);
    timer.type = cc.ProgressTimer.TYPE_RADIAL;
    timer.setReverseDirection(true);
    //timer.setScale(0.9);
    //timer.setColor(cc.color(255,215,0));
    timer.setTag(123321);
    playerHead.addChild(timer);
    timer.setLocalZOrder(9998);
    playerHead.getChildByName("zhuang" + index).setLocalZOrder(9999);
    timer.setPosition(playerHead.getChildByName("icon" + index).getPosition());
    timer.runAction(to1.repeatForever());
};
gameclass.zjhtablefk.prototype.clearProgress = function (playerHead) {
    if (playerHead.getChildByTag(123321)) {
        playerHead.getChildByTag(123321).removeFromParent(true);
    }
}
/*
 * 开局后 玩家掉线
 * */
gameclass.zjhtablefk.prototype.userLineOut = function (index, data) {
    var index = index - this.mod_niuniu.serverchair;
    if (index < 0) {
        index = index + 5;
    }
    if (data.line) {
        this.players[index].off_line.setVisible(false);
    } else {
        this.players[index].off_line.setVisible(true);
    }

    gameclass.mod_base.showtximg(this.players[index].iconback, this.players[index].head_url, 0, 0, "im_headbg5", !data.line);
}






