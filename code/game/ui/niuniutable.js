/**
 * Created by yang on 2016/11/9.
 */

var nn_playerHead = cc.Class.extend({
    node: null,
    index: null,
    head_img: null,
    zhuang_img: null,
    name_text: null,
    score_text: null,
    call_scoreImg: null,
    ok_img: null,
    id_text: null,
    rob_zhuang_img: null,
    handCards: null,
    ccc: null,
    hasniu: false,

    ctor: function (node, index, parent) {
        this.node = node.getChildByName('head');
        this.index = index;
        this.name_text = this.node.getChildByName('playername');
        this.ok_img = this.node.getChildByName('ok');
        this.head_img = this.node.getChildByName('icon');
        this.id_text = this.node.getChildByName('playerid');
        this.score_text = this.node.getChildByName('playerscore');
        this.call_scoreImg = this.node.getChildByName('call_score');
        this.zhuang_img = this.node.getChildByName('zhuang');
        this.rob_zhuang_img = this.node.getChildByName('rob_zhuang');
        this.handCards = ccui.helper.seekWidgetByName(parent, "notifynode" + index);
        this.off_line = this.node.getChildByName("off_line");

        this.ipLayout = this.node.getChildByName('ipLayout');
        this.uid_Text = this.ipLayout.getChildByName('uid_Text');
        this.uip_Text = this.ipLayout.getChildByName('uip_Text');
        this.address_Text = this.ipLayout.getChildByName('address_Text');
        this.ccc = this.node.getChildByName('ccc');
        this.init();
    },
    createProgress: function (isMingPai, strName) {
        var _this = this;
        var to1 = cc.progressFromTo(15, 100, 0);
        var timer = new cc.ProgressTimer(new cc.Sprite(res.progressBar));
        timer.setAnchorPoint(0.5, 0.5);
        timer.type = cc.ProgressTimer.TYPE_RADIAL;
        timer.setReverseDirection(true);
        timer.setScale(0.9);
        timer.setColor(cc.color(255, 215, 0));
        this.node.addChild(timer);
        timer.setPosition(this.head_img.getPosition());
        if (isMingPai) {
            timer.setName(strName);
            timer.runAction(cc.sequence(to1, cc.callFunc(function () {
                _this.objToMingPai();
                timer.removeFromParent(true);
            })));
        } else {
            timer.setName(strName);
            timer.runAction(to1.repeatForever());
        }
    },

    destroyProgress: function (strName) {
        if (this.node.getChildByName(strName)) {
            this.node.getChildByName(strName).removeFromParent(true);
        }

    },
    uniq: function (arr1, arr2) {
        var arr = [];
        for (var i = 0; i < arr1.length; i++) {
            if (0 > arr2.indexOf(arr1[i])) {
                arr.push(arr1[i]);
            }
        }
        return arr;
    },
    objToMingPai: function () {
        var lst = [];
        for (var i = 0; i < 5; i++) {
            lst[i] = false;
        }
        var isMaxNiu = mod_compare.gettype(nn_playerHead.curPlayCard, lst);
        nn_playerHead.Play_mod_niuniu.gameview(isMaxNiu, nn_playerHead.curPlayCard);
    },
    init: function () {
        if (this.index == 1 || this.index == 2) {
            this.ok_img.setPositionX(-45);
            this.rob_zhuang_img.setPositionX(-60);
            //this.call_scoreImg.setPositionX(-60);
        }

        this.ok_img.setVisible(false);
        this.rob_zhuang_img.setVisible(false);
        this.call_scoreImg.setVisible(false);
        this.zhuang_img.setVisible(false);
        this.zhuang_img.setLocalZOrder(1000);
        this.ipLayout.setVisible(false);
        this.node.setVisible(false);
        this.off_line.setVisible(false);
        this.score_text.setString("0");
        this.handCards.setLocalZOrder(1000);


        //this.ccc.addTouchEventListener(function (sender, type) {
        //    cc.log("2132142343");
        //    if(type != ccui.Widget.TOUCH_ENDED) return;
        //    if(this.index == 0) return;
        //    var playerdata = this.mod_niuniu.getplayerdata(sender.index);
        //    this.game.uimgr.showui("gameclass.chatMicLayer").setPlayerInfo(playerdata,this.mod_niuniu);
        //}, this);
    },
});
nn_playerHead.curPlayCard = [];
nn_playerHead.Play_mod_niuniu = null;
gameclass.niuniutable = gameclass.baseui.extend({
    sprite: null,
    node: null,
    //mod_niuniu:null,
    ongameview_attr: null,
    curround: null,
    buqiang: null,
    qiangzhuang: null,
    ready: null,
    clock: null,
    invitebtn: null,
    gamebets: null,
    playerHeads: null,
    //curHandCard:[],
    calLayer: null,
    calTextArr: [],
    calArr: [0, 0, 0],
    calIndex: 0,
    isCardTouch: false,
    userBetsCount: null,
    mingpai: null,
    dealUid: 0,
    callScoreStage: 0,
    numObj: [],
    isGameEnd: false,
    //onchat:null,
    ctor: function () {
        this._super();
        this.playerHeads = [];
        this.userBetsCount = [];
        this.isGameEnd = false;
    },
    show: function () {
        this.NiuNiuInit();
    },
    onEnter: function () {
        this._super();
        this.setColor(cc.color.BLACK);
        this.setOpacity(160);
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(listener, this);
        this._listener = listener;
    },

    onExit: function () {
        cc.eventManager.removeListener(this._listener);
        this._super();
    },
    setmod: function (_mod_niuniiu) {
        this.mod_niuniu = _mod_niuniiu;
        nn_playerHead.Play_mod_niuniu = _mod_niuniiu;
        var _this = this;
        this.mod_niuniu.bindUI(_this);

        if (window.wx) {
            _this.share();
        }
        //_this.micLayerState();
        _this.timeState();
        ccui.helper.seekWidgetByName(_this.node, "roomnum").setString("房间号:" + _this.mod_niuniu.roominfo.roomid.toString());
        _this.curround = ccui.helper.seekWidgetByName(_this.node, "curround");
        if (_this.mod_niuniu.roominfo.time != 0) {
            _this.game.uimgr.showui("gameclass.exitroom", false);
            _this.game.uimgr.uis["gameclass.exitroom"].setData(_this.mod_niuniu, _this.mod_niuniu.roominfo);
        }
        if (parseInt(_this.mod_niuniu.roominfo.param1 / 10) == 2) {
            cc.each(_this.gamebets.getChildren(), function (o, i) {
                if (i > 2) {
                    /*o.setEnabled(false);
                    o.setBright(false);*/
                    o.setVisible(false);
                } else {
                    o.setPositionX(o.getPositionX() + o.getContentSize().width);
                }
            });
        }
    },

});

gameclass.niuniutable.prototype.onGameReady = function (data) {
    for (var i = 0; i < 5; i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && data == playerdata.uid) {
            this.playerHeads[i].ok_img.setVisible(true);
            this.playerHeads[i].call_scoreImg.setVisible(false);
        }
    }

};

gameclass.niuniutable.prototype.resetIcon = function (uid) {
    for (var i = 0; i < 5; i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata == null) {
            continue;
        }
        if (playerdata.uid != uid) {
            continue;
        }
        gameclass.mod_base.showtximg(this.playerHeads[i].head_img, playerdata.imgurl, 0, 0, "im_headbg5", playerdata.ip == "")
        break;
    }
};
gameclass.niuniutable.prototype.onGameNiuniuInfo = function (data) {
    this.initReadyUser(data.ready);//是否已准备
    this.refreshStep();
    this.updataUserScore(data.info);
    if (this.mod_niuniu.roominfo.step > 0) {
        this.invitebtn.setVisible(false);
    }
    if (data.begin) {
        this.ready.setVisible(false);
        var reConnect = true;//断线重连
        this.onGameNiuNiuBegin(data, reConnect);

    }
    /*if(_this.mod_niuniu.gameniuniuinfo.info.length > 0){
        _this.mod_niuniu.gameniuniuinfo.begin = true;
        _this.mod_niuniu.gamestate = 1;
        if (_this.mod_niuniu.gameniuniuinfo.info[0].score != 0){
            _this.mod_niuniu.gamestate = 2;
            _this.game.uimgr.showui("gameclass.resultoneui").setniuniumod(_this.mod_niuniu,_this);
        }
    }*/
    //_this.refplayerinfo();
};
gameclass.niuniutable.prototype.initReadyUser = function (dataReady) {
    for (var i = 0; i < dataReady.length; i++) {
        for (var j = 0; j < 5; j++) {
            var playerdata = this.mod_niuniu.getplayerdata(j);
            if (playerdata) {
                if (playerdata.uid == dataReady[i]) {
                    this.playerHeads[j].ok_img.setVisible(true);
                }
            }
        }
    }
};

gameclass.niuniutable.prototype.updataRoomUserInfo = function () {
    for (var i = 0; i < 5; i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata) {
            this.playerHeads[i].node.setVisible(true);
            this.playerHeads[i].name_text.setString(playerdata.name);
            this.playerHeads[i].off_line.setVisible(!playerdata.line);
            //this.playerHeads[i].id_text.setString("ID:" + playerdata.uid.toString());
            //this.playerHeads[i].score_text.setString(""+playerdata.total);

            this.playerHeads[i].uid_Text.setString("ID:" + playerdata.uid.toString());
            this.playerHeads[i].uip_Text.setString("IP:" + playerdata.ip.toString());
            this.playerHeads[i].address_Text.setString("地址:" + playerdata.address.toString());

            gameclass.mod_base.showtximg(this.playerHeads[i].head_img, playerdata.imgurl, 0, 0, "im_headbg5", playerdata.ip == "");
        } else {
            this.playerHeads[i].node.setVisible(false);
        }
    }
};

gameclass.niuniutable.prototype.showCurDealer = function (dataInfo) {
    var dealerUid = 0;
    for (var i = 0; i < dataInfo.length; i++) {
        if (dataInfo[i].dealer) {
            dealerUid = dataInfo[i].uid;
            break;
        }
    }
    for (var i = 0; i < 5; i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata) {
            if (playerdata.uid == dealerUid) {
                this.playerHeads[i].zhuang_img.setVisible(true);
            } else {
                this.playerHeads[i].zhuang_img.setVisible(false);
            }
        }
    }
};
gameclass.niuniutable.prototype.initcallScoreStage = function (dataInfo) {
    var numArr = [];
    if (parseInt(this.mod_niuniu.roominfo.param1 / 10) == 2) {
        for (var i = 0; i < dataInfo.length; i++) {
            if (dataInfo[i].dealer) {
                continue;
            }
            numArr.push(dataInfo[i].num);
            this.numObj.push({
                uid: dataInfo[i].uid,
                num: dataInfo[i].num
            });
        }
    }
    this.callScoreStage = Math.min.apply(Math, numArr);
    cc.log("initcallScoreStage=" + this.callScoreStage);
    cc.log(this.numObj);
};
gameclass.niuniutable.prototype.onGameNiuNiuBegin = function (data, reConnect) {
    var _this = this;
    cc.log(data);
    this.resetNiuNiuNext();//清空上局牌
    this.updataUserScore(data.info);//更新分数
    this.refreshStep();//更新当前局数
    this.showCurDealer(data.info);//显示庄家
    this.invitebtn.setVisible(false);
    if (reConnect) {//true为断线重连
        _this.initcallScoreStage(data.info);
        _this.showHandCard(data.info, data.deal);
    } else {
        _this.runShowCardAction(function () {

            _this.runMoveCardAction(function () {
                var posArr = [];
                cc.each(_this.playerHeads, function (o, i) {
                    if (o && o.node.isVisible()) {
                        posArr.push(o.handCards.getPosition());
                    }
                });
                cc.log("end move action");
                _this.runSendCardAction(posArr, function () {
                    cc.log("end bacll runSendCardAction");
                    _this.dealAnimationLayer.removeAllChildren();
                    _this.showHandCard(data.info, data.deal);

                });

            });

        });
    }
};

gameclass.niuniutable.prototype.runShowCardAction = function (_callback) {

    var cardBack = new cc.Sprite(res.pokerBei);
    cardBack.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    cardBack.setScale(0.0);
    this.dealAnimationLayer.addChild(cardBack);
    cardBack.runAction(new cc.Sequence(new cc.ScaleTo(0.8, 0.8, 0.8), new cc.CallFunc(function (targe, backfun) {
        targe.removeFromParent();
        if (backfun) {
            backfun();
        }
    }, this, _callback)));

};

gameclass.niuniutable.prototype.runMoveCardAction = function (_callback) {
    this.dealAnimationLayer.removeAllChildren();

    //allCardLayout.setPosition(cc.winSize.width / 2 - cardlength + 39,cc.winSize.height / 2);

    var cardCount = 45;
    var offset = cardCount * 2.5;
    for (var i = 0; i < cardCount; i++) {
        var cardBack = new cc.Sprite(res.pokerBei);
        cardBack.setPosition(cc.winSize.width / 2 - offset, cc.winSize.height / 2);
        cardBack.setScale(0.8);
        cardBack.runAction(new cc.MoveBy(0.6, 5 * i, 0));
        this.dealAnimationLayer.addChild(cardBack);
    }
    this.scheduleOnce(function () {
        if (_callback) {
            _callback();
        }
    }, 0.7);
};


gameclass.niuniutable.prototype.runSendCardAction = function (endPosArr, _callback) {
    cc.log("start runSendCardAction");
    var _this = this;
    var spArr = this.dealAnimationLayer.getChildren();

    var count = endPosArr.length;
    var totla = count * 5;
    var spcount = spArr.length;
    var index = spcount - 1;
    var offset = 0;
    var userIndex = 0;


    var scCall = function () {

        if (index < 0) {
            _this.unschedule(scCall);
            if (_callback) {
                _callback();
            }
            return;
        }
        if (userIndex >= endPosArr.length) {
            userIndex = 0;
            offset++;
        }
        if (spcount - index > totla) {
            _this.unschedule(scCall);
            if (_callback) {
                _callback();
            }
            return;
        }

        var sp = spArr[index];
        sp.runAction(cc.moveTo(0.1, endPosArr[userIndex].x + offset * 10 - 65, endPosArr[userIndex].y));
        sp.setLocalZOrder(userIndex);
        index--;
        userIndex++;
        mod_sound.playeffect(g_music["game_fapai"], false);

    };


    this.schedule(scCall, 0.1, cc.REPEAT_FOREVER, 0);
    cc.log("end  runSendCardAction");
};

gameclass.niuniutable.prototype.showHandCard = function (dataInfo, dataDral) {
    var _this = this;
    cc.log(dataInfo);

    for (var i = 0; i < 5; i++) {
        var playerdata = _this.mod_niuniu.getplayerdata(i);
        if (playerdata) {
            var offset = i == 0 ? 55 : 25;
            var moveOffset = i == 0 ? 30 : 15;
            for (var j = 0; j < dataInfo.length; j++) {
                if (playerdata.uid == dataInfo[j].uid) {
                    for (var k = 0; k < dataInfo[j].card.length; k++) {
                        var spr = null;
                        if (i == 0) {
                            nn_playerHead.curPlayCard[k] = dataInfo[j].card[k];
                            spr = _this.crateBtnCard(dataInfo[j].card[k]);
                            spr.addTouchEventListener(this.curUserCardTouchEvent, this);
                        } else {
                            spr = _this.crateBtnCard(dataInfo[j].card[k]);
                        }
                        spr.setPosition(-5 * offset / 2 + (k * offset) + offset / 2, 0);
                        spr.runAction(cc.moveBy(0.5, -5 * moveOffset / 2 + (k * moveOffset) + moveOffset / 2, 0));
                        _this.playerHeads[i].handCards.addChild(spr);
                    }
                }
            }

        }
    }

    //延时显示叫分
    this.scheduleOnce(function () {
        for (var i = 0; i < dataInfo.length; i++) {
            if (dataInfo[i].dealer) {
                _this.dealUid = dataInfo[i].uid;
            }
        }
        _this.isUserTouch(_this.dealUid);//如果确定了庄  庄家可以操作牌
        if (_this.mod_niuniu.roominfo.param1 % 10 == 1) {//抢庄模式  需要先抢庄 后叫分
            cc.log("抢庄模式");
            var isShow = _this.dealUid == 0 ? true : false;//断线重连  dealUid等于0 还没确定庄家
            _this.isShowQiangZhuang(isShow);
            if (!isShow) { //以确定庄家 进行叫分阶段
                _this.showCallScore(_this.dealUid, dataInfo, callbackMingPai);
            } else {
                _this.reconnGameDeal(dataDral);//抢庄阶段掉线,玩家是否已操作过强或不抢
            }
        } else {//直接叫分阶段
            cc.log("显示叫分阶段--是否以叫完分,可以亮牌阶段");
            _this.showCallScore(_this.dealUid, dataInfo, callbackMingPai);
        }

    }, 0.6);

    var callbackMingPai = function () {//断线重连  叫分阶段---如果叫分阶段结束进入是否已亮牌阶段
        cc.log("当前是否可亮牌?" + _this.userBetsCount);
        cc.log(dataInfo);
        if (_this.userBetsCount.length >= dataInfo.length - 1) {
            for (var i = 0; i < dataInfo.length; i++) {
                _this.onGameShowUserCard(dataInfo[i].uid, dataInfo[i].type, dataInfo[i].card, dataInfo[i].view);
            }
        }
    }
};

gameclass.niuniutable.prototype.isUserTouch = function (uid) {
    if (uid == this.mod_niuniu.uid) {//叫分后 或者是庄家 可以算牌操作
        this.isCardTouch = true;
    }
};
gameclass.niuniutable.prototype.onGameSendOtherCard = function (otherCard, index) {
    nn_playerHead.curPlayCard[index] = otherCard;
    var spr4 = this.playerHeads[0].handCards.getChildren();
    var spr4Tag = spr4[index].getTag();
    var spr4Pos = spr4[index].getPosition();
    var sp = this.crateBtnCard(otherCard);
    sp.addTouchEventListener(this.curUserCardTouchEvent, this);
    sp.setPosition(cc.p(spr4Pos));
    this.playerHeads[0].handCards.addChild(sp);
    this.playerHeads[0].handCards.removeChildByTag(spr4Tag);

};

gameclass.niuniutable.prototype.onGameSnedAllCard = function (allCard) {
    this.playerHeads[0].handCards.removeAllChildren();
    for (var i = 0; i < allCard.length; i++) {
        nn_playerHead.curPlayCard[i] = allCard[i];
    }

    for (var i = 0; i < nn_playerHead.curPlayCard.length; i++) {
        var spr = this.crateBtnCard(nn_playerHead.curPlayCard[i]);
        spr.addTouchEventListener(this.curUserCardTouchEvent, this);
        spr.setPosition(-5 * 30 + (i * 55) + 30, 0);
        spr.runAction(cc.moveBy(0.5, -5 * 15 + (i * 30) + 15, 0));
        this.playerHeads[0].handCards.addChild(spr);

    }

};
gameclass.niuniutable.prototype.reshowCallScore = function () {
    cc.log("第2次叫分");
    var _this = this;
    this.userBetsCount.length = 0;
    var node = new cc.Sprite(res.showcallScore02);
    node.setPosition(this.node.getContentSize().width / 2, this.node.getContentSize().height / 2 + 150);
    node.setScale(0.3);
    this.node.addChild(node);
    node.runAction(cc.sequence(cc.scaleTo(1, 1.5), new cc.CallFunc(function (tager) {
        tager.removeFromParent();
        _this.createProgressBar(_this.dealUid, false, "Progress_callScore");//创建叫分进度框
        if (_this.dealUid != _this.mod_niuniu.uid) {//除庄家外显示叫分
            _this.gamebets.setVisible(true);
        }
    })));
};
gameclass.niuniutable.prototype.canClick = function () {
    this.calLayer.setScale(0.5);
    this.calLayer.setVisible(true);
    this.calLayer.runAction(cc.scaleTo(0.5, 1.2, 1.2).easing(cc.easeElasticOut()));
    this.btn_tishi.setVisible(true);
    this.mingpai.setVisible(true);
    this.mingpai.setEnabled(false);
    this.mingpai.setBright(false);
    this.isMingPai(this.calArr);
    this.createProgressBar(-1, true, "Progress_mingpai");//创建亮牌阶段 进度条 所有玩家都需要创建一次 UID不需要匹配
};

gameclass.niuniutable.prototype.onGameBets = function (data, personCount) {
    cc.log(data);
    for (var i = 0; i < 5; i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && playerdata.uid == data.uid) {
            if (data.bets > 0 && data.bets < 7) {
                mod_sound.playeffect(g_music["Man_jiabei"], false);
                this.playerHeads[i].call_scoreImg.setVisible(true);
                this.playerHeads[i].call_scoreImg.setTexture("res/niuniuRes/yypk_imh_" + data.bets + "fen.png");
                this.playerHeads[i].call_scoreImg.setScale(0);
                this.playerHeads[i].call_scoreImg.runAction(cc.scaleTo(0.8, 1, 1).easing(cc.easeElasticOut()));
                if (this.userBetsCount.indexOf(data.uid) < 0) {
                    this.userBetsCount.push(data.uid);
                }
                this.playerHeads[i].destroyProgress("Progress_callScore");//销毁进度条
            }
        }
    }
    cc.log("当前叫分玩家数量：" + this.userBetsCount);
    this.isUserTouch(data.uid);
    if (this.userBetsCount.length >= personCount - 1) {
        cc.log("onGameBets callScoreStage00=" + this.callScoreStage);
        if (parseInt(this.mod_niuniu.roominfo.param1 / 10) == 2) {//扣2张模式
            if (this.callScoreStage == 1 || this.callScoreStage == 0) {
                this.callScoreStage = 2;
                cc.log(this.numObj);
                if (this.numObj.length > 0) {
                    for (var i = 0; i < this.numObj.length; i++) {
                        for (var j = 0; j < this.userBetsCount.length; j++) {
                            if ((this.numObj[i].uid == this.userBetsCount[j] && this.numObj[i].uid == this.mod_niuniu.uid) || this.dealUid == this.mod_niuniu.uid) {
                                if (this.numObj[i].num == 1 || this.numObj[i].num == 0) {
                                    cc.log("Xxxxxxxxxxx");
                                    this.reshowCallScore();
                                }
                            }
                        }
                    }
                } else {
                    this.reshowCallScore();
                }

            } else if (this.callScoreStage == 2) {
                this.canClick();//可以亮牌阶段
            }
        } else {
            this.canClick();//可以亮牌阶段
        }

    }
    cc.log("onGameBets callScoreStage11=" + this.callScoreStage);
};

//dealUid:不等于dealUid创建进度条   isMingPai:true为亮牌 false为叫分阶段进度条  strName:进度条name
gameclass.niuniutable.prototype.createProgressBar = function (dealUid, isMingPai, strName) {
    for (var i = 0; i < 5; i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && playerdata.uid != dealUid) {
            this.playerHeads[i].createProgress(isMingPai, strName);
        }
    }
};

gameclass.niuniutable.prototype.showCallScore = function (dealUid, dataInfo, func) {
    cc.log(dataInfo);
    var _this = this;

    _this.createProgressBar(dealUid, false, "Progress_callScore");//创建叫分进度框
    var betsCount = 0;//玩家叫分数量
    for (var i = 0; i < dataInfo.length; i++) {
        if (dataInfo[i].bets <= 0) {
            if (dealUid != dataInfo[i].uid) {
                if (dataInfo[i].uid == this.mod_niuniu.uid) {
                    this.gamebets.setVisible(true);
                }
            }
            betsCount++;
        } else {
            this.onGameBets({uid: dataInfo[i].uid, bets: dataInfo[i].bets}, dataInfo.length);
        }
    }
    cc.log("betsCount=" + betsCount);
    if (betsCount > 1) {//大于1家没有叫分 则不会出现亮牌情况
        func = null;
    }
    if (func && this.userBetsCount.length >= dataInfo.length - 1) {
        cc.log("叫完分,回调亮牌");
        func();
    }

};
gameclass.niuniutable.prototype.curUserCardTouchEvent = function (sender, type) {
    var _this = this;
    if (!this.isCardTouch) {
        return;
    }
    switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log("TOUCH_ENDED");
            sender.isUp = !sender.isUp;
            if (sender.isUp && _this.calIndex > 2) {
                sender.isUp = false;
                return;
            }
            _this.setCalText(sender.isUp, sender.getTag());
            sender.setPositionY(sender.isUp ? 20 : 0);
            break;
        default:
            break;
    }

};
gameclass.niuniutable.prototype.findCalArr = function (arr, numble) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == numble) {
            arr[i] = 0;
            break;
        }
    }
    /*arr.sort(function(a,b) {
        return b - a;
    });*/
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] == 0) {
            var temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
    }
    for (var i = 0; i < arr.length; i++) {
        var arrNum = parseInt(arr[i] / 10);
        if (arrNum >= 10) {
            arrNum = 10;
        }
        this.calTextArr[i].setString("" + arrNum);
    }
};
gameclass.niuniutable.prototype.setCalArrSum = function (arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        if (parseInt(arr[i] / 10) > 10) {
            sum += 10;
            continue;
        }
        sum += parseInt(arr[i] / 10);
    }
    this.calTextArr[3].setString("" + sum);
};
gameclass.niuniutable.prototype.isMingPai = function (arr) {
    var hasMingPai = true;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == 0) {
            hasMingPai = false;
            break;
        }
    }
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        var count = parseInt(arr[i] / 10);
        if (count > 10) {
            count = 10;
        }
        sum += count;
    }
    if (hasMingPai) {
        this.hasniu = (sum != 0 && sum % 10 == 0);
        var texture = this.hasniu ? res.btn_youniu : res.btn_meiniu;
        this.mingpai.loadTextureNormal(texture);
    }
    this.mingpai.setEnabled(hasMingPai);
    this.mingpai.setBright(hasMingPai);
};
gameclass.niuniutable.prototype.updataCalText = function (index, numble) {
    //cc.log(index+"-----"+numble);
    if (index < 0 || index > 3) {
        cc.log("cal Text Arr index err");
        return;
    }
    var num = parseInt(numble / 10);
    if (num > 10) {
        num = 10;
    }
    this.calTextArr[index].setString("" + num);
};

gameclass.niuniutable.prototype.setCalText = function (isUp, numble) {
    if (isUp) {
        this.updataCalText(this.calIndex, numble);
        this.calArr[this.calIndex] = numble;
        this.calIndex++;
    } else {
        this.findCalArr(this.calArr, numble);
        this.calIndex--;
    }
    this.isMingPai(this.calArr);

    this.setCalArrSum(this.calArr);

};
gameclass.niuniutable.prototype.onGameShowUserCard = function (uid, cardType, card, view) {
    if (view.length < 1) {
        return;
    }
    if (uid == this.mod_niuniu.uid) {
        this.calLayer.setVisible(false);
        this.btn_tishi.setVisible(false);
        this.mingpai.setVisible(false);
    }

    var cardLength = 5;
    for (var i = 0; i < 5; i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && playerdata.uid == uid) {
            this.playerHeads[i].handCards.removeAllChildren();
            this.playerHeads[i].destroyProgress("Progress_mingpai");
            var offset = i == 0 ? 55 : 25;
            var moveOffset = i == 0 ? 30 : 15;
            //var sprY = i==0? 10:0;
            for (var j = 0; j < card.length; j++) {
                var spr = this.crateBtnCard(card[j]);
                spr.setPosition(-cardLength * offset / 2 + (j * offset) + offset / 2, 0);
                var move1 = cc.moveBy(0.4, -cardLength * moveOffset / 2 + (j * moveOffset) + moveOffset / 2, 0);
                var isMove2 = false;
                var move2 = cc.moveBy(0.2, 0, 20);
                for (var k = 0; k < view.length; k++) {
                    if (spr.getTag() == view[k]) {
                        isMove2 = true;
                        break;
                    }
                }
                if (isMove2) {
                    spr.runAction(cc.sequence(move1, move2));
                } else {
                    spr.runAction(move1);
                }

                this.playerHeads[i].handCards.addChild(spr, 210);
            }
            mod_sound.playeffect(g_music["niu_" + cardType + "_w"], false);
            var sprNiuNiu = cc.Sprite.create();
            sprNiuNiu.initWithSpriteFrameName("nn331_img_niu" + cardType + ".png");
            sprNiuNiu.setScale(0.8);
            sprNiuNiu.setPosition(cc.p(-150, -20));
            sprNiuNiu.runAction(cc.moveBy(0.4, 140, 0));
            this.playerHeads[i].handCards.addChild(sprNiuNiu, 220);
            break;
        }
    }

};
gameclass.niuniutable.prototype.reconnGameDeal = function (dataDeal) {
    cc.log(dataDeal);
    if (dataDeal.length <= 0) {
        return;
    }
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < dataDeal.length; j++) {
            var playerdata = this.mod_niuniu.getplayerdata(i);
            if (playerdata && playerdata.uid == dataDeal[j].uid) {
                this.playerHeads[i].rob_zhuang_img.setVisible(true);
                this.playerHeads[i].rob_zhuang_img.setTexture(dataDeal[j].ok ? res.img_qiangzhuang : res.img_buqiang);
                if (dataDeal[j].uid == this.mod_niuniu.uid) {
                    this.isShowQiangZhuang(false);
                }
            }
        }
    }


};
//抢庄
gameclass.niuniutable.prototype.onGameDeal = function (data) {
    for (var i = 0; i < 5; i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && playerdata.uid == data.uid) {
            this.playerHeads[i].rob_zhuang_img.setVisible(true);
            this.playerHeads[i].rob_zhuang_img.setTexture(data.ok ? res.img_qiangzhuang : res.img_buqiang);
        }
    }

};
//确定庄家
gameclass.niuniutable.prototype.onGameDealer = function (data) {
    this.dealUid = data.uid;
    for (var i = 0; i < 5; i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata) {
            if (playerdata.uid == this.dealUid) {
                this.playerHeads[i].zhuang_img.setVisible(true);//显示庄家标记
            }
            this.playerHeads[i].rob_zhuang_img.setVisible(false);//隐藏抢庄
        }
    }
    this.isUserTouch(this.dealUid);//庄家可以进行牌的操作
    this.createProgressBar(this.dealUid, false, "Progress_callScore");//创建叫分进度框
    if (this.dealUid != this.mod_niuniu.uid) {//除庄家外显示叫分
        this.gamebets.setVisible(true);
    }
};
gameclass.niuniutable.prototype.crateBtnCard = function (card) {

    var abcd = ["a", "d", "b", "c"];
    var point = Math.floor(card / 10);
    var type = card % 10;
    var sprButton = null;
    if (card <= 0) {
        sprButton = new ccui.Button(res.pokerBei, res.pokerBei, res.pokerBei);
        sprButton.setTouchEnabled(false);
    } else {
        var pngPath = "card_" + point + abcd[type - 1] + ".png";
        sprButton = new ccui.Button(pngPath, pngPath, pngPath, ccui.Widget.PLIST_TEXTURE);
        sprButton.setTouchEnabled(true);
    }
    sprButton.setTag(card);
    sprButton.setAnchorPoint(0.5, 0.5);
    //sprButton.loadTextureNormal("card_" + point +  abcd[type - 1]+ ".png",ccui.Widget.PLIST_TEXTURE);
    return sprButton;
};
gameclass.niuniutable.prototype.refreshStep = function () {
    var curstep = this.mod_niuniu.roominfo.step;
    if (curstep > this.mod_niuniu.roominfo.maxstep) {
        curstep = this.mod_niuniu.roominfo.maxstep;
    } else if (curstep == 0) {
        curstep = 1;
    }
    this.curround.setString("局数:" + curstep + "/" + this.mod_niuniu.roominfo.maxstep);
}
gameclass.niuniutable.prototype.resetNiuNiuNext = function () {
    cc.log("next");

    nn_playerHead.curPlayCard.length = 0;
    this.calArr = [0, 0, 0];
    this.calIndex = 0;
    this.userBetsCount.length = 0;
    this.dealUid = 0;
    this.callScoreStage = 0;
    this.numObj.length = 0;
    for (var i = 0; i < this.calTextArr.length; i++) {
        this.updataCalText(i, "" + 0);
    }
    for (var i = 0; i < 5; i++) {
        this.playerHeads[i].handCards.removeAllChildren();
        this.playerHeads[i].call_scoreImg.setVisible(false);
        this.playerHeads[i].ok_img.setVisible(false);
        this.playerHeads[i].destroyProgress("Progress_callScore");
        this.playerHeads[i].destroyProgress("Progress_mingpai");
    }
    this.isCardTouch = false;
};

gameclass.niuniutable.prototype.updataUserScore = function (info) {
    for (var i = 0; i < 5; i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata) {
            for (var j = 0; j < info.length; j++) {
                if (playerdata.uid == info[j].uid) {
                    this.playerHeads[i].score_text.setString("" + info[j].total);
                }
            }
        }
    }
};
gameclass.niuniutable.prototype.goldFiy = function (data) {
    var Xarr = [200, 1070, 1070, 60, 60];
    var Yarr = [30, 160, 380, 380, 160];
    for (var j = 0; j < data.length; j++) {
        for (var i = 0; i < 5; i++) {
            var playerdata = this.mod_niuniu.getplayerdata(i);
            if (playerdata && playerdata.uid == data[j].uid) {
                var c = data[j].score > 0 ? "+" : "";
                var cor = data[j].score > -1 ? cc.color(82, 210, 17) : cc.color(245, 74, 74);
                var text = new cc.LabelTTF(c + "" + data[j].score, "Arial", 32);
                text.setScale(0.3);
                text.setPosition(Xarr[i], Yarr[i]);
                text.setColor(cor);
                this.GameUIlayer.addChild(text);
                var spawn = new cc.Spawn(cc.moveBy(2, cc.p(0, 70)), cc.scaleTo(2, 2));
                text.runAction(new cc.Sequence(spawn, new cc.CallFunc(function (tager) {
                    tager.removeFromParent();
                })));
            }
        }
    }

};
gameclass.niuniutable.prototype.onGameNiuNiuEnd = function (data) {
    var _this = this;
    //_this.maxTime = 3;
    this.endcoverLayer.setVisible(true);

    _this.goldFiy(data.info);
    _this.updataUserScore(data.info);
    this.scheduleOnce(function () {
        this.endcoverLayer.setVisible(false);
        nn_playerHead.curPlayCard.length = 0;
        _this.game.uimgr.showui("gameclass.resultoneui").setniuniumod(_this.mod_niuniu, _this);
    }, 3.5);


};
gameclass.niuniutable.prototype.onGameNiuNiuBye = function (data) {
    var _this = this;
    //_this.maxTime = 3;
    var curstep = this.mod_niuniu.roominfo.step;
    var maxstep = this.mod_niuniu.roominfo.maxstep;
    if (curstep == maxstep && this.mod_niuniu._isThisGameOver) return;
    else {
        this.endcoverLayer.setVisible(false);
        _this.game.uimgr.showui("gameclass.resultui");
        _this.game.uimgr.uis["gameclass.resultui"].setData(_this.mod_niuniu);
    }
};
gameclass.niuniutable.prototype.checkSafe = function (people) {
    this.safeLayer.checkSafe(people);
};
gameclass.niuniutable.prototype.NiuNiuInit = function () {
    var _this = this;
    _this.node = this.game.uimgr.createnode(res.ninniutable, true);
    _this.node.setPosition((cc.winSize.width - this.node.getContentSize().width) / 2, 0);
    _this.addChild(_this.node);

    _this.Uilayer = ccui.helper.seekWidgetByName(_this.node, "UI");
    _this.Gamelayer = ccui.helper.seekWidgetByName(_this.node, "Game");
    _this.GameUIlayer = ccui.helper.seekWidgetByName(_this.node, "GameUI");

    _this.endcoverLayer = ccui.helper.seekWidgetByName(_this.Gamelayer, "endcover");
    _this.endcoverLayer.setVisible(false);
    cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
    cc.spriteFrameCache.addSpriteFrames(res.niuniuCountPlist);
    //_this.betsImgArr = [res.nn331_bets1, res.nn331_bets2, res.nn331_bets3, res.nn331_bets4, res.nn331_bets5,res.nn331_bets6];

    _this.qiangzhuang = ccui.helper.seekWidgetByName(_this.node, "qiangzhuang");
    _this.qiangzhuang.setVisible(false);
    _this.buqiang = ccui.helper.seekWidgetByName(_this.node, "buqiang");
    _this.buqiang.setVisible(false);

    _this.dealAnimationLayer = new cc.Node();
    //allCardlayout.setContentSize(80,110);
    //allCardlayout.setAnchorPoint(0.5,0.5);
    _this.dealAnimationLayer.setPosition(0, 0);
    _this.node.addChild(_this.dealAnimationLayer, 200);
    this.invitebtn = ccui.helper.seekWidgetByName(this.node, "invitebtn");

    var btn_layer = new gameclass.btn_setLayer(this.node, this.game);
    this.node.addChild(btn_layer);
    var closeinfo = ccui.helper.seekWidgetByName(this.node, "closeinfo");
    closeinfo.setLocalZOrder(1000);
    btn_layer.setLocalZOrder(999);

    this.safeLayer = new gameclass.checkSafeLayer(this.node, this.game, ccui.helper.seekWidgetByName(btn_layer, "btn_safe"));
    this.safeLayer.setName("safeLayer");
    this.node.addChild(this.safeLayer);

    var dianchi = ccui.helper.seekWidgetByName(this.node,"dianchi");
    dianchi.setPercent(gameclass.battery);

    gameclass.createbtnpress(_this.node, "qiangzhuang", function () {
        _this.mod_niuniu.gamedeal(true);
        _this.isShowQiangZhuang(false);
    });
    gameclass.createbtnpress(_this.node, "buqiang", function () {
        _this.mod_niuniu.gamedeal(false);
        _this.isShowQiangZhuang(false);
    });

    _this.mingpai = ccui.helper.seekWidgetByName(_this.node, "mingpai");
    _this.mingpai.setVisible(false);
    _this.btn_tishi = ccui.helper.seekWidgetByName(_this.node, "btn_tishi");
    _this.btn_tishi.setVisible(false);
    _this.gamebets = ccui.helper.seekWidgetByName(_this.node, "gamebets");
    _this.gamebets.setVisible(false);
    _this.calLayer = ccui.helper.seekWidgetByName(_this.node, "calculate_card");
    _this.calLayer.setVisible(false);
    this.talkPos = [cc.p(130, 110), cc.p(1040, 260), cc.p(1040, 470), cc.p(140, 470), cc.p(140, 260)];

    gameclass.createbtnpress(_this.node, "sharelayer", function () {
        _this.sharelayer.setVisible(false);
        //_this.game.uimgr.showui("gameclass.exitroom");
    });
    gameclass.createbtnpress(_this.node, "invitebtn", function () {
        _this.share();
        if (window.wx) {
            _this.sharelayer.setVisible(true);
        }
        //else{
        //    _this.game.uimgr.showui("gameclass.msgboxui");
        //    _this.game.uimgr.uis["gameclass.msgboxui"].setString("请先安装微信");
        //}
    });

    _this.ready = ccui.helper.seekWidgetByName(_this.node, "ready");
    gameclass.createbtnpress(_this.node, "ready", function () {
        _this.ready.setVisible(false);
        _this.mod_niuniu.gameready();
    });

    for (var i = 1; i < 6; i++) {
        gameclass.createbtnpress(this.node, "gamebets" + i, function (_1, _2, index) {
            cc.log(index);
            _this.mod_niuniu.gamebets(index);
            _this.gamebets.setVisible(false);
        }, null, null, i);
    }
    for (var i = 0; i < 4; i++) {
        _this.calTextArr[i] = ccui.helper.seekWidgetByName(_this.calLayer, "calculate_" + i);
        _this.calTextArr[i].setString("" + 0);
    }
    gameclass.createbtnpress(_this.node, "mingpai", function () {

        _this.toMingPai(nn_playerHead.curPlayCard);

    });

    gameclass.createbtnpress(_this.node, "btn_tishi", function () {

        _this.toTips(nn_playerHead.curPlayCard);

    });
    var showipinfo = function (sender, type) {
        if (ccui.Widget.TOUCH_ENDED == type) {
            //if (sender.index == 0) return;
            var playerdata = _this.mod_niuniu.getplayerdata(sender.index);
            _this.game.uimgr.showui("gameclass.chatMicLayer").setPlayerInfo(playerdata, _this.mod_niuniu,sender.index);
        }
    }
    for (var i = 0; i < 5; i++) {
        var head = ccui.helper.seekWidgetByName(this.node, "UserNode" + i);
        this.playerHeads[i] = new nn_playerHead(head, i, this.node);
        head.getChildByName('head').getChildByName('ccc').index = i;
        head.getChildByName('head').getChildByName('ccc').addTouchEventListener(showipinfo);
    }

};

gameclass.niuniutable.prototype.isShowQiangZhuang = function (b) {
    cc.log(b);
    this.qiangzhuang.setVisible(b);
    this.buqiang.setVisible(b);
};
gameclass.niuniutable.prototype.updateHandCardPosY = function (handCard) {
    for (var i = 0; i < handCard.length; i++) {
        if (handCard[i].isUp) {
            handCard[i].isUp = false;
            handCard[i].setPositionY(0);
        }
    }
};
gameclass.niuniutable.prototype.updateHandCardPosY_2 = function (handCard, calarr) {
    for (var i = 0; i < calarr.length; i++) {
        for (var j = 0; j < handCard.length; j++) {
            if (handCard[j].getTag() == calarr[i] && !handCard[j].isUp) {
                handCard[j].isUp = true;
                handCard[j].setPositionY(20);
                this.calIndex++;
            }
        }
    }
};
gameclass.niuniutable.prototype.cleanCal = function () {
    var _this = this;
    for (var i = 0; i < _this.calArr.length; i++) {
        _this.updataCalText(i, 0);
        _this.calArr[i] = 0;
    }
    this.calTextArr[3].setString("" + 0);
    this.calIndex = 0;
    this.isMingPai(_this.calArr);
};
gameclass.niuniutable.prototype.showToast = function (_text, delay) {
    if (this.node.getChildByTag(123456)) {
        return;
    }
    var _this = this;
    var node = new cc.Sprite(res.img_input);
    //var node = new cc.LayerColor(cc.color(0,0,0,150),400,40);
    node.setPosition(_this.node.getContentSize().width / 2, 65);
    node.setTag(123456);
    node.setOpacity(230);
    /*node.ignoreAnchor = false;
    node.anchorX = 0.5;
    node.anchorY = 0.5;*/
    _this.node.addChild(node);
    var text = new cc.LabelTTF(_text, "Arial", 35);
    text.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
    node.addChild(text);
    _this.scheduleOnce(function () {
        _this.node.removeChildByTag(123456);
    }, delay);

};
gameclass.niuniutable.prototype.toTips = function (handCard) {
    var _this = this;
    cc.log("handCard=" + handCard);
    var result = mod_compare.tipsNiu(handCard);
    cc.log(result);
    if (result.length != 3) {
        return;//{'resultCard':result,'type':type};
    }
    _this.cleanCal();
    this.updateHandCardPosY(this.playerHeads[0].handCards.getChildren());
    for (var i = 0; i < result.length; i++) {
        _this.calArr[i] = result[i];
        _this.updataCalText(i, _this.calArr[i]);
    }
    this.setCalArrSum(_this.calArr);
    this.updateHandCardPosY_2(this.playerHeads[0].handCards.getChildren(), _this.calArr);
    //this.isMingPai(_this.calArr);
    var lst = [];
    this.hasniu = mod_compare.gettype(handCard, lst);
    var texture = this.hasniu > 0 ? res.btn_youniu : res.btn_meiniu;
    this.mingpai.loadTextureNormal(texture);
    this.mingpai.setEnabled(true);
    this.mingpai.setBright(true);
};
gameclass.niuniutable.prototype.toMingPai = function (handCard) {
    var _this = this;
    cc.log("calArr" + _this.calArr);
    cc.log("handCard" + handCard);
    var _niuCount = 0;
    var lst = [];
    for (var i = 0; i < 5; i++) {
        lst[i] = false;
    }
    var isMaxNiu = mod_compare.gettype(handCard, lst);
    if (isMaxNiu == 200) {//炸弹4张牌  需特别处理
        _this.mod_niuniu.gameview(isMaxNiu, _this.calArr);
        return;
    }
    if (this.hasniu) {
        if (isMaxNiu >= 100) {
            _niuCount = isMaxNiu;
        } else {
            var reArr = _this.uniq(handCard, _this.calArr);
            _niuCount = mod_compare.countNiu(reArr);
        }
    } else {
        if (isMaxNiu > 0) {
            _this.showToast("当前有牛哦！", 2);
            return;
        }
    }
    _this.mod_niuniu.gameview(_niuCount, _this.calArr);
};
gameclass.niuniutable.prototype.uniq = function (arr1, arr2) {
    var arr = [];
    for (var i = 0; i < arr1.length; i++) {
        if (0 > arr2.indexOf(arr1[i])) {
            arr.push(arr1[i]);
        }
    }
    return arr;
};
gameclass.niuniutable.prototype.crateniuniuani = function (cardlst, soundniu) {

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
        cc.log(index);
        mod_sound.playeffect(g_music["niu_" + index + "_w"], false);
    }

    return spr;
};
gameclass.niuniutable.prototype.timeState = function () {
    var _this = this;
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
};

gameclass.niuniutable.prototype.onchat = function (data) {
    var _this = this;
    for (var i = 0; i < g_chatstr.length; i++) {
        if (g_chatstr[i] == data.chat) {
            mod_sound.playeffect(g_music["fix_msg_" + (i + 1)], false);
        }
    }
    var playerIdex = _this.mod_niuniu.getPlayerIndexById(data.uid);
    var talkPos = this.talkPos[playerIdex];
    var arr = [
        res.chatbg_ld,
        res.chatbg_rd,
        res.chatbg_rd,
        res.chatbg_ld,
        res.chatbg_ld,
    ];

    var posArr = [cc.p(165, 45), cc.p(1065, 240), cc.p(1065, 435), cc.p(50, 435), cc.p(50, 240)];
    for (var i = 0; i < 5; i++) {
        var player = this.mod_niuniu.getplayerdata(i);
        var otherddata = this.mod_niuniu.getplayerotherdata(i);
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
                var senderPos = posArr[i];
                _animateNode.setPosition(senderPos);
                var hitPos = null;
                for (var j = 0; j < 5; j++) {
                    var player = _this.mod_niuniu.getplayerdata(j);
                    if (player && player.uid == _senderObj.hitUid) {
                        hitPos = posArr[j];
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

gameclass.niuniutable.prototype.share = function () {
    var kp = "扣一张";
    if (parseInt(this.mod_niuniu.roominfo.param1 / 10) == 1) {
        kp = "全扣";
    } else if (parseInt(this.mod_niuniu.roominfo.param1 / 10) == 2) {
        kp = "扣两张";
    }

    var ms = "轮庄模式";
    if (this.mod_niuniu.roominfo.param1 % 10 == 1) {
        ms = "抢庄模式";
    } else if (this.mod_niuniu.roominfo.param1 % 10 == 2) {
        ms = "连庄模式";
    } else if (this.mod_niuniu.roominfo.param1 % 10 == 3) {
        ms = "赢家庄";
    }

    gameclass.mod_platform.invitefriend("房号[" + this.mod_niuniu.roominfo.roomid + "]，傲世娱乐牛牛，" + ms + "，" + kp + "，" + "一共[" + this.mod_niuniu.roominfo.maxstep + "]局。大家都等您，快来吧。", this.mod_niuniu.roominfo.roomid, "颂游牛牛-" + this.mod_niuniu.roominfo.roomid + "-" + ms);
};

/*
 * 开局后 玩家掉线
 * */
gameclass.niuniutable.prototype.userLineOut = function(index,data){
    if(data.line)
        this.playerHeads[index].off_line.setVisible(false);
    else
        this.playerHeads[index].off_line.setVisible(true);
    gameclass.mod_base.showtximg(this.playerHeads[index].head_img,this.playerHeads[index].imgurl, 0, 0 , "im_headbg5", !data.line );
}