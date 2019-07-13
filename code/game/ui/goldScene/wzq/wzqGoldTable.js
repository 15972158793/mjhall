gameclass.wzqGoldTable = gameclass.baseui.extend({
    sprite: null,
    node: null,
    mod_niuniu: null,
    playerHeads: null,
    helpinfo_layout: null,
    betnum_layout: null,
    players: null,
    playersbp: null,
    ongameview: null,
    curround: null,
    buqiang: null,
    qiangzhuang: null,
    clock: null,
    clocktime: null,
    lunshu: null,
    zongzhu: null,
    danzhu: null,
    haveCard_Btn: null,//要牌按钮
    dontCard_Btn: null,//不要牌按钮
    ready_Btn: null, //开始按钮
    dispatcher_queue: null,
    //设置按钮
    setBtn: null,
    //聊天按钮
    chatBtn: null,
    //麦克风按钮
    micBtn: null,
    //认输按钮
    giveupBtn: null,
    //设置学费按钮
    setScoreBtn: null,
    //微信邀请按钮
    inviteFromWxBtn: null,
    //开始按钮
    startBtn: null,
    //房间号文本
    roomIdTxt: null,
    //学费文本
    scoreTxt: null,
    //棋盘控制器
    chessControl: null,
    //录影
    micContain: null,
    //菜单
    menu: null,
    //菜单控制器
    playMenuCtr: null,
    //控制层
    operateLayer: null,
    //设置学费面板
    setScoreLayer: null,
    //设置学费面板控制器
    setScoreLayerCtr: null,
    //窗口及UI
    windowsLayer: null,
    ctor: function () {
        this._super();
        this.players = [];
        this.playersbp = [];

    },
    show: function () {
        this.init();
        this.initView();
        this.initListen();
        this.initialize();
    },
    init: function () {
        var _this = this;
        this.node = this.game.uimgr.createnode(res.goldWzqTable, true);
        this.operateLayer = this.node.getChildByName("operateLayer");
        var chessLayer = this.node.getChildByName("chessLayer");
        var userLayer = this.node.getChildByName("userLayer");
        var roomInfoLayer = this.node.getChildByName("roomInfoLayer");
        var dynamicLayer = roomInfoLayer.getChildByName("dynamicLayer");
        this.windowsLayer = this.node.getChildByName("windowsLayer");
        this.setBtn = this.operateLayer.getChildByName("setBtn");
        this.chatBtn = this.operateLayer.getChildByName("chatBtn");
        this.micBtn = this.operateLayer.getChildByName("micBtn");
        this.giveupBtn = this.operateLayer.getChildByName("giveupBtn");
        this.setScoreBtn = this.operateLayer.getChildByName("setScoreBtn");
        this.inviteFromWxBtn = this.operateLayer.getChildByName("inviteFromWxBtn");
        this.startBtn = this.operateLayer.getChildByName("startBtn");
        this.roomIdTxt = dynamicLayer.getChildByName("roomIdTxt");
        this.scoreTxt = dynamicLayer.getChildByName("scoreTxt");
        this.setScoreLayer = this.windowsLayer.getChildByName("setScoreLayer");
        this.setScoreLayerCtr = new gameclass.numSetControl(this.setScoreLayer, true, 6);

        this.chessControl = new gameclass.wzqChessLayerCtr(chessLayer);
        this.playerHeads = [];
        for (var i = 0; i < gameclass.wzqGoldTable.playerNum; i++) {
            var headNode = userLayer.getChildByName("head" + i);
            this.playerHeads[i] = new gameclass.wzqUserHeadCtr(headNode, i);
            // this.playerHeads[i].setVisible(false);
        }

        this.micContain = new cc.Sprite;
        var anim = new sp.SkeletonAnimation(res.voiceJson, res.voiceAtlas);
        anim.setScale(0.7);
        this.micContain.addChild(anim);
        anim.setAnimation(0, 'animation', true);

        this.menu = new gameclass.playMenuLayer(this.game);
        this.menu._EVENT_DISMISS = gameclass.WZQ_DISMISS;

    },
    initView: function () {
        this.addChild(this.node);

        this.node.addChild(this.micContain);
        this.operateLayer.addChild(this.menu);
    },
    initListen: function () {
        cc.eventManager.addCustomListener(gameclass.WZQ_SET_SCORE_CANCEL, this.closeSetScoreHandle.bind(this));
        cc.eventManager.addCustomListener(gameclass.WZQ_SET_SCORE_OK, this.setScoreCompleteHandle.bind(this));
        cc.eventManager.addCustomListener(gameclass.WZQ_DISMISS, this.dismissHandle.bind(this));


        var _this = this;
        gameclass.createbtnpressSub(this.inviteFromWxBtn, function () {
            _this.share();
        });
        gameclass.createbtnpressSub(this.setScoreBtn, function () {
            if (_this.mod_wzq.gameInfo && !_this.mod_wzq.gameInfo.begin) {
                _this.setScoreLayer.setVisible(true);
            }
        });
        gameclass.createbtnpressSub(this.startBtn, function () {
            cc.log("startBtn click...");

            var curScore = parseInt(_this.scoreTxt.getString());
            if (!_this.scoreLegalCheck(curScore)) {
                return;
            }

            if (_this.mod_wzq.roominfo.person.length >= gameclass.wzqGoldTable.playerNum) {
                _this.mod_wzq.requestStart();
            }
        });

        gameclass.createbtnpressSub(this.chatBtn, function () {
            _this.game.uimgr.showui("gameclass.chatuinew");
            _this.game.uimgr.uis["gameclass.chatuinew"].setmod(_this.mod_wzq);
        });
        this.giveupBtn.addTouchEventListener(_this.giveupClickHandle, _this);

        this.micBtn.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    oldvnum = mod_sound.getEffectsVolume();
                    oldmnum = mod_sound.getMusicVolume();
                    mod_sound.setEffectsVolume(0.0);
                    mod_sound.setMusicVolume(0.0);
                    _this.micContain.setVisible(true);
                    gameclass.mod_platform.begmic();
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    _this.micContain.setVisible(false);
                    gameclass.mod_platform.endmic();
                    mod_sound.setEffectsVolume(Number(oldvnum));
                    mod_sound.setMusicVolume(Number(oldmnum));
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    _this.micContain.setVisible(false);
                    gameclass.mod_platform.cancelmic();
                    mod_sound.setEffectsVolume(Number(oldvnum));
                    mod_sound.setMusicVolume(Number(oldmnum));
                    break;
            }
        });
    },
    initialize: function () {
        this.setScoreLayerCtr._EVENT_OK = gameclass.WZQ_SET_SCORE_OK;
        this.setScoreLayerCtr._EVENT_CLOSE = gameclass.WZQ_SET_SCORE_CANCEL;

        // this.node.setPosition((cc.winSize.width - this.node.getContentSize().width) / 2, 0);
        this.micContain.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.micContain.setVisible(false);
        this.roomIdTxt.setString("");

        this.initializeView();

        this.playMenuCtr = new gameclass.playMenuCtr(this.setBtn, this.menu, cc.p(-this.menu.getWidth(), 0), cc.p(0, 0));

    },
    initializeView: function () {
        this.initializeTurn();

        this.scoreTxt.setString("0");

        this.closeSetScoreHandle();

        this.giveupBtn.setVisible(false);

        this.setScoreBtn.setBright(false);
        this.setScoreBtn.setTouchEnabled(false);

        this.inviteFromWxBtn.setBright(false);
        this.inviteFromWxBtn.setTouchEnabled(false);

        this.startBtn.setBright(false);
        this.startBtn.setTouchEnabled(false);
    },
    /**
     * 解散按钮点击事件处理
     */
    dismissHandle: function () {
        cc.log("11111111");
        cc.log(this.mod_wzq.roominfo.host);
        cc.log(this.game.modmgr.mod_login.logindata.uid);
        if(this.mod_wzq.roominfo.host == this.game.modmgr.mod_login.logindata.uid) {  //! 房主任何时候都能解散
            this.mod_wzq.gameend();
        } else {
            if(this.mod_wzq.gameInfo.begin) {
                this.game.uimgr.showui("gameclass.msgboxui");
                this.game.uimgr.uis["gameclass.msgboxui"].setString(staticString.wzqDismissCondition);
            } else {
                this.mod_wzq.dissmissroom();
            }
        }
    },
    giveupClickHandle: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;

        var _this = this;
        if (_this.mod_wzq.gameInfo && _this.mod_wzq.gameInfo.begin) {
            _this.game.uimgr.showui("gameclass.msgboxui");
            _this.game.uimgr.uis["gameclass.msgboxui"].setString(staticString.giveup_ask, function () {
                _this.mod_wzq.requestGiveup();
            });
        }
    },
    giveupOkHandle: function () {
        this.mod_wzq.requestGiveup();
    },
    setmod: function (_mod) {
        this.mod_wzq = _mod;
        this.mod_wzq.bindUI(this);
        this.chessControl.setmod(_mod);
        var _this = this;
        // if (window.wx) {
        //     _this.share();
        // }
        //_this.resultOnend({});
    },
    setScoreCompleteHandle: function (event) {
        var number = event.getUserData().number;

        if (!this.scoreLegalCheck(number)) {
            return;
        }

        this.closeSetScoreHandle();
        this.mod_wzq.requestSetScore(number);
    },
    scoreLegalCheck:function (number) {
        if (number < gameclass.wzqGoldTable.scoreMin) {
            gameclass.showText(staticString.wzq_score_name + staticString.cantLow + gameclass.wzqGoldTable.scoreMin + "," + staticString.pReset);
            return false;
        }
        //else if(number > gameclass.wzqGoldTable.scoreMax){
        //    gameclass.showText(staticString.wzq_score_name + staticString.cantHigh + gameclass.wzqGoldTable.scoreMax + "," + staticString.pReset);
        //    return false;
        //}
        return true;
    },
    closeSetScoreHandle: function () {
        this.setScoreLayer.setVisible(false);
    },
    destroy: function () {
        cc.log("wzqTable  destroy.....");

        this.chessControl.destroy();

        cc.eventManager.removeCustomListeners(gameclass.WZQ_SET_SCORE_CANCEL);
        cc.eventManager.removeCustomListeners(gameclass.WZQ_SET_SCORE_OK);
        cc.eventManager.removeCustomListeners(gameclass.WZQ_DISMISS);
    }
});
gameclass.wzqGoldTable.prototype.onChat = function (index, data) {
    //this.playerHeads[index].showCart(data);
    var _this = this;
    for (var i = 0; i < g_chatstr.length; i++) {
        if (g_chatstr[i] == data.chat) {
            mod_sound.playeffect(g_music["fix_msg_" + (i + 1)], false);
        }
    }
    // var playerIdex = _this.mod_wzq.getchairbyuid(data.uid);
    // var playerIdex = _this.mod_wzq.getUserViewIndex(index);
    var playerIdex = index;
    // var talkPos = this.talkPos[playerIdex];
    var userPos = this.playerHeads[playerIdex].getPosition();
    var chatPos = this.playerHeads[playerIdex].getChatPos();
    var talkPos = cc.p(userPos.x + chatPos.x, userPos.y + chatPos.y);

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
            s9 = new cc.Scale9Sprite(arr[playerIdex]);
            s9.setCapInsets(cc.rect(60, 10, 10, 10));
            s9.setAnchorPoint(cc.p(0, 0));
            // s9.setPosition(cc.p(-18, -18));
            _node.addChild(s9);

            var helloLabel = new cc.LabelTTF(data.chat, "Arial", 36);
            helloLabel.setAnchorPoint(cc.p(0, 0));
            helloLabel.setColor(cc.color(33, 111, 75));
            helloLabel.setPosition(cc.p(18, 18));
            _node.addChild(helloLabel);
            s9.setContentSize(helloLabel.getContentSize().width + 30, helloLabel.getContentSize().height + 30);
        } else if (data.type == 2) {
            var index = Number(data.chat);
            //var spr = new cc.Sprite();
            //spr.initWithFile(g_face[index]);
            //
            //s9 = new ccui.Layout();
            //s9.setContentSize(spr.width + 150, spr.height + 20);
            //s9.setBackGroundImage(arr[playerIdex]);
            //s9.setBackGroundImageScale9Enabled(true);
            //spr.setPosition(0.5 * s9.getContentSize().width, 0.5 * s9.getContentSize().height + 5);
            //s9.addChild(spr);
            //_node.addChild(s9);
            var spine = new sp.SkeletonAnimation(g_chat_expression["expression"+index+"_json"],g_chat_expression["expression"+index+"_atlas"]);
            spine.setAnimation(0, 'animation', false);
            spine.setAnchorPoint(0.5, 0.5);

            s9 = new ccui.Layout();
            s9.setContentSize(110, 100);
            s9.setBackGroundImage(arr[playerIdex]);
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
        // if (playerIdex == 1 || playerIdex == 2) {
        //     _node.setPosition(talkPos.x - s9.width, talkPos.y);
        // } else {
        _node.setPosition(talkPos);
        // }
        this.node.addChild(_node);
        var seq = cc.sequence(cc.delayTime(2), cc.callFunc(function () {
            _node.removeFromParent(true);
        }));
        _node.runAction(seq);
    } else if (data.type == 4) {
        var _senderObj = JSON.parse(data.chat);
        var _animateNode = new cc.Node();
        _animateNode.setScale(0.8);
        _animateNode.setTag(334455);
        _senderObj.type += 1;
        if (this.node.getChildByTag(334455)) {
            this.node.getChildByTag(334455).removeFromParent();
        }
        var sucAnim = new sp.SkeletonAnimation(g_magic_chat["magic_chat_" + _senderObj.type + "_1_json"], g_magic_chat["magic_chat_" + _senderObj.type + "_1_atlas"]);
        sucAnim.setAnimation(0, 'animation', false);
        sucAnim.setAnchorPoint(0.5, 0.5);
        _animateNode.addChild(sucAnim);
        var senderPos = _this.playerHeads[playerIdex].head.getPosition();
        _animateNode.setPosition(senderPos);
        var hitIndex = _this.mod_wzq.getchairbyuid(_senderObj.hitUid);
        var hitPos = _this.playerHeads[hitIndex].head.getPosition();
        this.node.addChild(_animateNode);
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
};

/*
 * 开局前 玩家离开当前游戏
 * */
gameclass.wzqGoldTable.prototype.userExitRoom = function (index) {

    this.playerHeads[index].reset();
    this.playerHeads[index].setVisible(false);
};

/*微信邀请文字*/
gameclass.wzqGoldTable.prototype.share = function () {
    var strinfo = "房号[" + this.mod_wzq.roominfo.roomid + "]，" + staticString.togetherPlay;
    gameclass.mod_platform.invitefriend(strinfo,
        this.mod_wzq.roominfo.roomid,
        staticString.gameName + "-" + this.mod_wzq.roominfo.roomid + "-" + staticString.gameWzqName);
};

gameclass.wzqGoldTable.prototype.checkSafe = function (people) {
    // this.safeLayer.checkSafe(people);
};


gameclass.wzqGoldTable.prototype.updateScore = function (score) {
    this.scoreTxt.setString(score);
};
gameclass.wzqGoldTable.prototype.updateGameInfo = function (gameInfo) {
    this.roomIdTxt.setString(this.mod_wzq.roominfo.roomid.toString());
    this.scoreTxt.setString(gameInfo.gold.toString());

    this.chessControl.updateRoads(gameInfo.board);

    var len = this.mod_wzq.roominfo.person.length;
    for (var i = 0; i < len; i++) {
        var userIndex = this.mod_wzq.getUserViewIndex(i);
        this.playerHeads[userIndex].setGameUserInfo(gameInfo.info[i]);
    }
    this.setBtnState();
    // var len = gameInfo.info.length;
    // var userViewIndex;
    // for (var i = 0; i < len; i++) {
    //     userViewIndex = this.mod_wzq.getUserViewIndex(i);
    //     this.playerHeads[userViewIndex].setGameUserInfo(gameInfo.info[i]);
    //     if (i == gameInfo.curstep && gameInfo.begin) {
    //         this.playerHeads[userViewIndex].setTurn(true);
    //     } else {
    //         this.playerHeads[userViewIndex].setTurn(false);
    //     }
    // }


};
gameclass.wzqGoldTable.prototype.setBtnState = function () {
    if (this.mod_wzq.gameInfo.begin) {
        this.giveupBtn.setVisible(true);

        this.setScoreBtn.setBright(false);
        this.setScoreBtn.setTouchEnabled(false);

        this.inviteFromWxBtn.setBright(false);
        this.inviteFromWxBtn.setTouchEnabled(false);

        this.startBtn.setVisible(false);
    } else {
        if (this.mod_wzq.roominfo.host == this.game.modmgr.mod_login.logindata.uid) {
            this.setScoreBtn.setBright(true);
            this.setScoreBtn.setTouchEnabled(true);

            this.inviteFromWxBtn.setBright(true);
            this.inviteFromWxBtn.setTouchEnabled(true);

            this.startBtn.setVisible(true);
            if (this.mod_wzq.roominfo.person.length > 1) {
                this.startBtn.setBright(true);
                this.startBtn.setTouchEnabled(true);
            } else {
                this.startBtn.setBright(false);
                this.startBtn.setTouchEnabled(false);
            }

        } else {
            this.setScoreBtn.setBright(false);
            this.setScoreBtn.setTouchEnabled(false);

            this.inviteFromWxBtn.setBright(false);
            this.inviteFromWxBtn.setTouchEnabled(false);

            this.startBtn.setVisible(false);
        }
    }
};
gameclass.wzqGoldTable.prototype.initializeTurn = function () {
    var len = this.playerHeads.length;
    for (var i = 0; i < len; i++) {
        this.playerHeads[i].setTurn(false);
    }
}
gameclass.wzqGoldTable.prototype.updateTurn = function (turnIndex, isBegin) {
    var len = this.mod_wzq.roominfo.person.length;
    for (var i = 0; i < len; i++) {
        var person = this.mod_wzq.roominfo.person[i];
        var userIndex = this.mod_wzq.getUserViewIndex(i);
        if (i == turnIndex && isBegin) {
            this.playerHeads[userIndex].setTurn(true);
        } else {
            this.playerHeads[userIndex].setTurn(false);
        }
    }
}
gameclass.wzqGoldTable.prototype.gameEnd = function (data) {
    this.initializeView();
    this.setBtnState();
    this.goldFiy(data);
};
gameclass.wzqGoldTable.prototype.updatePlayerinfo = function (persons) {
    // var len = persons.length;
    // for(var i = 0;i<len;i++){
    //     this.playerHeads[i].setRoomUserInfo(persons[i]);
    // }
    var userViewIndex;
    for (var i = 0; i < gameclass.wzqGoldTable.playerNum; i++) {
        userViewIndex = this.mod_wzq.getUserViewIndex(i);
        this.playerHeads[userViewIndex].setRoomUserInfo(persons[i]);
        if (i < persons.length) {
            if (i == 0) {
                this.playerHeads[userViewIndex].setFirstHandle(true);
            } else {
                this.playerHeads[userViewIndex].setFirstHandle(false);
            }
        }
    }
    this.setBtnState();
};

gameclass.wzqGoldTable.prototype.userLineOut = function (index, data) {
    // gameclass.mod_base.showtximg(this.playerHeads[index].head_img, data.imgurl, 0, 0, null, true);
};


gameclass.wzqGoldTable.prototype.goldFiy = function (data) {
    if (data.gold <= 0) {
        gameclass.showText(gameclass.mod_goldWzq.GAME_INVALID);
        return;
    }

    var startPos, endPos;

    var text;
    var len = this.mod_wzq.roominfo.person.length;
    for (var i = 0; i < len; i++) {
        var person = this.mod_wzq.roominfo.person[i];
        var userIndex = this.mod_wzq.getUserViewIndex(i);
        if (person.uid == data.winer) {
            startPos = this.playerHeads[userIndex].getGoldPos();
            text = new cc.LabelTTF("+ " + data.gold, "Arial", 16);
            text.setColor(cc.color(82, 210, 17));
        } else {
            endPos = this.playerHeads[userIndex].getGoldPos();
            text = new cc.LabelTTF("+ " + data.gold, "Arial", 16);
            text.setColor(cc.color(245, 74, 74));
        }
        text.setPosition(this.playerHeads[userIndex].getPosition());
        this.windowsLayer.addChild(text);
        var spawn = new cc.Spawn(cc.moveBy(2, cc.p(0, 70)), cc.scaleTo(2, 2));
        text.runAction(new cc.Sequence(spawn, new cc.CallFunc(function (tager) {
            tager.removeFromParent(true);
        })));
    }
    var _sp = new goldSpLayer(res.niuniuAnimateGold, data.gold, 0.1, 1, endPos, startPos);
    this.node.addChild(_sp);

};
/**
 * 游戏人数
 * @type {number}
 */
gameclass.wzqGoldTable.playerNum = 2;
/**
 * 最低学费
 * @type {number}
 */
gameclass.wzqGoldTable.scoreMin = 5000;
/**
 * 最高学费
 * @type {number}
 */
gameclass.wzqGoldTable.scoreMax = 1000000;
/**
 * 确定设置学费事件名
 * @type {string}
 */
gameclass.WZQ_SET_SCORE_OK = "gameclass.WZQ_SET_SCORE_OK";
/**
 * 取消设置学费事件名
 * @type {string}
 */
gameclass.WZQ_SET_SCORE_CANCEL = "gameclass.WZQ_SET_SCORE_CANCEL";
/**
 * 解散事件名
 * @type {string}
 */
gameclass.WZQ_DISMISS = "gameclass.WZQ_DISMISS";