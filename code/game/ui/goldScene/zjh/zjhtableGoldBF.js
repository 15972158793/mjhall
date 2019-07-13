gameclass.zjhtableGoldBF = gameclass.zjhtablefk.extend({
    //计时器
    _timerControl: null,
    //搓牌按钮
    _cuoPai: null,
    //搓牌遮罩
    _fightMask: null,
    //动画容器
    _movieContain: null,
    //轮到自己时起始时间
    _mineTurnStartTime: null,

    ctor: function () {
        this._super();
    },
    init: function () {
        this._super();

        var _this = this;
        _this.gametype = 0;
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist1);
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist2);
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist3);

        this.btn_layer.setgoldtype(gameclass.gamegoldszp);

        for (var i = 0; i < gameclass.mod_zjh.USER_NUM; i++) {
            this.players[i].betTxt = ccui.helper.seekWidgetByName(this.node, "bet" + i);
            this.players[i].betTxt.setString("");
            this.players[i].cards.removeAllChildren();
        }
        ccui.helper.seekWidgetByName(this.node, "ready").setVisible(false);
        ccui.helper.seekWidgetByName(this.node, "change").setVisible(false);
        gameclass.createbtnpress(this.node, "startready", function () {
            _this.mod_niuniu.gameready();
        });
    },
    setbftype: function (gametype) {
        this.gametype = gametype;

        //if(this.gametype == gameclass.gameszpbaofang){
        //    //ccui.helper.seekWidgetByName(this.node, "ready").setPositionX(568);
        //
        //}
    },
    onTurnHandle: function (isMineTurn) {
        if (isMineTurn) {
            this._mineTurnStartTime = new Date().getTime();
        } else {
            this._mineTurnStartTime = -1;
        }
    },
    createNode: function () {
        this.node = this.game.uimgr.createnode(res.zjhtableGold, true);
        this._cuoPai = ccui.helper.seekWidgetByName(this.node, "cuoPai");
        this._fightMask = ccui.helper.seekWidgetByName(this.node, "fightMask");
        this._timeContain = this.node.getChildByName("readyMovie");
        this._timerControl = new gameclass.timeTextControl(this._timeContain, res.goldTimeBar);

        this._movieContain = new cc.Sprite();
        this.node.addChild(this._movieContain);

    },
    reset: function () {
        //this.mod_niuniu.resetData();

        this._super();

        this.isBiPaiing = false;
        this._mineTurnStartTime = -1;

        this._fightMask.setVisible(false);
        this._fightMask.removeAllChildren();

        for (var i = 0; i < gameclass.mod_zjh.USER_NUM; i++) {
            this.players[i].betTxt.setString("");
        }


    },
    setmod: function (_mod_niuniiu) {
        this._super(_mod_niuniiu);
        var _this = this;

        mod_sound.playbmg(g_music.zjhBg, true);
        // mod_sound.setMusicVolume(0.5);
        // mod_sound.setEffectsVolume(0.5);
        this.mod_niuniu.ongameniuniubegin = function () {
            _this.refreshStep();
            _this.playerinfovisible();
            _this.showgameinfo();
            _this.startBtnVisibleCheck();
            _this.genzhu.setVisible(false);
            _this.jiazhu.setVisible(false);
            _this.bipai.setVisible(false);
            _this.qipai.setVisible(false);
            _this.kanpai.setVisible(false);
            _this._cuoPai.setVisible(false);
            _this.runJuShuAction();
            // gameclass.showStartAnim(this.view);
            this.view.scheduleOnce(function () {
                _this.refplayerinfo(null, true);
            }, 2);
        };
        this.mod_niuniu.ongameniuniuinfoSub = function () {
            _this.refreshStep();
            if (_this.mod_niuniu.gameniuniuinfo.begin) {
                //显示玩家跟注数量
                var len = _this.mod_niuniu.gameniuniuinfo.info.length;
                for(var i = 0;i<len;i++){
                    var info = _this.mod_niuniu.gameniuniuinfo.info[i];
                    var sceneIndex = _this.mod_niuniu.getSceneIndexFromS(i);
                    _this.players[sceneIndex].betTxt.setString(gameclass.mod_zjh.BET_TYPE_1_NAME + ":" + info.bets);
                }


                // _this.mod_niuniu.gameniuniuinfo.begin = true;
                _this.playerinfovisible();
                _this.mod_niuniu.gamestate = 1;
                if (_this.mod_niuniu.gameniuniuinfo.info[0].score != 0) {
                    _this.mod_niuniu.gamestate = 2;
                    _this.game.uimgr.showui("gameclass.zjhresultoneui").setniuniumod(_this.mod_niuniu, _this);
                }
            }
        };

        var gameType = _this.mod_niuniu.roominfo.type - gameclass.gamegoldszp;
        var modType = gameType % 2;
        var goldType = parseInt(gameType / 10);
        this.bottomScore = gameclass.mod_zjhGold.SCORE_RULE[modType][goldType];

        this._cuoPai.setVisible(false);
        gameclass.createbtnpress(this.node, "cuoPai", function () {
            _this.kanPaiClickHandle();

            _this.mod_niuniu.gamebets(gameclass.mod_zjh.CUOPAI_TYPE);
        });

        //this.updateDifen();

        this.scheduleUpdate();
    },
    showbipai: function (uid, uid2, win, card1, card2) {
        this._super(uid, uid2, win, card1, card2);
        this.isBiPaiing = true;
    },
    showgameinfo: function () {
        this._super();
        var roominfo = this.mod_niuniu.roominfo;
        ccui.helper.seekWidgetByName(this.node, "extraReward").setVisible(parseInt(roominfo.param1/1000000)%10);
        if (this.mod_niuniu.gameniuniuinfo != null) {
            this.genpai.setString("封顶:20000");
            var wanfa = "";
            if(parseInt(roominfo.param1/10000000)%10 == 0) wanfa = "比大小";
            else if(parseInt(roominfo.param1/10000000)%10 == 1) wanfa = "比花色";
            else if(parseInt(roominfo.param1/10000000)%10 == 2) wanfa = "全比";
            ccui.helper.seekWidgetByName(this.node, "quanbi").setString(wanfa);
            ccui.helper.seekWidgetByName(this.node, "bishuangbei").setVisible(parseInt(roominfo.param1/100000)%10);
            ccui.helper.seekWidgetByName(this.node, "bishuangbei").setString("比牌开双倍");
        }

        var roomNameNode = ccui.helper.seekWidgetByName(this.node, "roomnum");
        roomNameNode.setString("包厢号:"+roominfo.roomid);
        roomNameNode.setPositionY(60);
        var difenstr = 0;
        if(roominfo.param1%10 == 0) difenstr = 50;
        else if(roominfo.param1%10 == 1) difenstr = 100;
        else if(roominfo.param1%10 == 2) difenstr = 200;
        else if(roominfo.param1%10 == 3) difenstr = 500;
        else if(roominfo.param1%10 == 4) difenstr = 1000;
        this.bottomScore = difenstr;
        this.danzhu.setString("单注:"+difenstr);//0,50  1,100  2,200   3,500    4,1000(个位↑)
        this.danzhu.setPosition(cc.p(128,30));
        this.menpai.setVisible(true);
        this.bipai1.setVisible(true);
        var menpaistr = "";
        var men = parseInt(roominfo.param1/10)%10;
        var bi = parseInt(roominfo.param1/100)%10+1;
        if(men == 0) menpaistr = "不闷";
        else  menpaistr = "闷" + (men+1) + "轮";
        this.menpai.setString(menpaistr);
        this.bipai1.setString(bi + "轮比牌");
    },
    refreshStep: function () {
        if(this.mod_niuniu.gameniuniuinfo){
            this.curround.setString("第" + (this.mod_niuniu.gameniuniuinfo.round + 1) + "轮");
        }else{
            this.curround.setString("第0轮");
        }
    },
    ongamereadyHandle: function (data) {
        this._super();

        this._cuoPai.setBright(false);
        this._cuoPai.setTouchEnabled(false);
        //if (data.msgdata.uid == this.game.modmgr.mod_login.logindata.uid) {
        //    ccui.helper.seekWidgetByName(this.node, "ready").setVisible(false);
        //}
    },
    ongameendHandle: function (fast) {
        this._movieContain.removeAllChildren();

        this.genzhu.setVisible(false);
        this.jiazhu.setVisible(false);
        this.bipai.setVisible(false);
        this.qipai.setVisible(false);
        this.kanpai.setVisible(false);
        this._cuoPai.setVisible(false);
        var len = this.mod_niuniu.gameniuniuinfo.info.length;
        for (var i = 0; i < len; i++) {
            var info = this.mod_niuniu.gameniuniuinfo.info[i];
            if(info.score > 0){
                var userIndex = this.mod_niuniu.getSceneIndexFromS(i);
                this.recoverChip(this.players[userIndex].head.getPosition());
                break;
            }
        }

        var _this = this;
        this._isPlayEnd = false;
        if (this.isBiPaiing) {
            this.node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(function () {
                _this.playEndMovie();
            })));
        } else {
            _this.playEndMovie();
        }

        this.refplayerinfo();
    },
    showGameResultView: function (delay) {
        //this.mod_niuniu.resetData();

        this.startBtnVisibleCheck();
        this.btnVisibleCheck();
    },
    setJiazhuextraViewSub: function (rate) {
        for (var i = 1; i < this.jiazhuextra.getChildren().length; i++) {
            var button = this.jiazhuextra.getChildren()[i];
            // button.removeAllChildren();
            // var sprite = new cc.Sprite();
            // sprite.loadTexture("");
            this.jiazhuextra.getChildren()[i].getChildren()[0].setString("" + (i + 1) * rate * this.bottomScore);
        }
    },
    /**
     * 搓牌处理
     * @param uid
     * @param cards
     */
    openCardHandle: function (uid, cards, type) {
        if (uid != this.game.modmgr.mod_login.logindata.uid) return;
        if (type != gameclass.mod_zjh.CUOPAI_TYPE) return;

        var serverIndex = this.mod_niuniu.getPlayerIndexById(this.game.modmgr.mod_login.logindata.uid);
        var sceneIndex = this.mod_niuniu.getSceneIndexFromS(serverIndex);
        var cardsNode = this.players[sceneIndex].cards;
        if (!cardsNode) return;
        var cardLen = cards.length;
        if (cardsNode.getChildrenCount() != cardLen) return;
        var centerIndex = parseInt(cardLen / 2);
        this._fightMask.setVisible(true);
        var backContain = this.createCardList([-1, -1, -1]);
        var frontContain = this.createCardList(cards);
        this._fightMask.addChild(backContain);
        this._fightMask.addChild(frontContain);
        backContain.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.55));
        frontContain.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.55));
        backContain.setScale(0.8);
        frontContain.setScale(0.8);

        this.layCardList(backContain, centerIndex, 10, true);
        this.layCardList(frontContain, centerIndex, 10, false);

        this.openCardMovie(cardsNode, backContain, frontContain);
    },
    /**
     * 搓牌动画
     * @param cardsNode
     * @param backContain
     * @param frontContain
     */
    openCardMovie: function (cardsNode, backContain, frontContain) {
        //牌翻至一半回调
        var cardFlipHalfCallback = function (backCard, frontCard) {
            backCard.stopAllActions();
            backCard.setVisible(false);
            frontCard.setVisible(true);
        }
        //牌完全翻开回调
        var cardFlipFullCallback = function (frontCard, ob) {
            var cardsNode = ob.orgNode;
            var orgCard = cardsNode.getChildren()[ob.index];
            orgCard.setVisible(true);

            if (ob.index == cardsNode.getChildrenCount() - 1) {
                //已经全部翻完了
                this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(openCardMovieComplete, this)))
            }
        };
        //翻牌完成
        var openCardMovieComplete = function () {
            this._fightMask.setVisible(false);
            this._fightMask.removeAllChildren();
        }
        var len = backContain.getChildrenCount();
        var totalTime = 3;
        var delayTime = 0.2;
        var flipOneTime = (totalTime - delayTime * (len - 1)) / 3;
        var fliphalfCallBack;
        var flipFullCallBack;
        var seqB1, seqB2, seqF;
        for (var i = 0; i < len; i++) {
            var orgCard = cardsNode.getChildren()[i];
            var backCard = backContain.getChildren()[i];
            var frontCard = frontContain.getChildren()[i];

            orgCard.setVisible(false);
            frontCard.setVisible(false);

            fliphalfCallBack = cc.callFunc(cardFlipHalfCallback, this, frontCard);
            seqB1 = cc.sequence(cc.delayTime(i * delayTime), cc.scaleTo(flipOneTime, 1, -1));
            seqB2 = cc.sequence(cc.delayTime(i * delayTime), cc.delayTime(flipOneTime / 2), fliphalfCallBack);
            backCard.runAction(cc.spawn(seqB1, seqB2));

            frontCard.setScaleX(-1);
            flipFullCallBack = cc.callFunc(cardFlipFullCallback, this, {index: i, orgNode: cardsNode});
            seqF = cc.sequence(cc.delayTime(i * delayTime), cc.scaleTo(flipOneTime, 1, 1), flipFullCallBack);
            frontCard.runAction(seqF)
        }
    },
    refplayerinfo: function (showother, refscore, soundniu, refscoreuid) {
        this._super(showother, refscore, soundniu, refscoreuid);
        this.updatePersonGold();

        var consumeTxt = ccui.helper.seekWidgetByName(this.node, "consumeTxt");
        consumeTxt.setString(this.bottomScore * gameclass.mod_zjh.CONSUME_RATE);

        var consumeInfo = ccui.helper.seekWidgetByName(this.node, "consumeInfo");
        if (this.mod_niuniu.gameniuniuinfo && this.mod_niuniu.gameniuniuinfo.begin) {
            consumeInfo.setVisible(false);
        } else {
            consumeInfo.setVisible(true);
        }
        this.updateDifen();

        ccui.helper.seekWidgetByName(this.node, "invitebtn").setVisible(false);

        this.startBtnVisibleCheck();
        this.btnVisibleCheck();
        for (var i = 0; i < gameclass.mod_zjh.USER_NUM; i++) {
            var otherddata = this.mod_niuniu.getplayerotherdata(i);
            if (otherddata == null) continue;

            this.mod_niuniu.updateUserCard(otherddata.uid);
        }
    },
    createscoreboards:function (times, bet, player, isOpen) {
        //if(parseInt(this.mod_niuniu.roominfo.param1/10000)%10 == 0){
            var useNumArr = this.splipChip(bet);
        cc.log(useNumArr)
            for(var i = 0;i<useNumArr.length;i++){
                // cc.log("get chipSource--i:"+i+","+useNumArr[i]);
                var ss = this.createscoreboard(useNumArr[i], player);
                ss.setScale(0.3);
            }
        //}
    },
    splipChip:function (bets) {
        var compareArr = gameclass.zjhtableGoldBF.chipSourceArr;
        var useNumArr = [];

        var ob;
        while(bets != 0){
            ob = this.getMaxChip(compareArr, bets);
            if(ob.useNum == 0){
                //cc.log("严重错误!!!!!!!!!!!!!!!!!!!!!创建筹码时，bet="+bets);
                return useNumArr;
            }else{
                useNumArr.push(ob.useNum);
                compareArr = ob.leftArr;
                bets -= ob.useNum;
            }
        }
        return useNumArr;
    },
    getChipArr: function (_allPoint) {
        var chipArr = this.splipChip(_allPoint);
        var len = chipArr.length;
        for(var i = 0;i<len;i++){
            var chip = chipArr[i];
            var chipView = this.showChip(chip);
            chipView.setScale(0.3);
        }
    },
    update: function () {
        this._timerControl.update();

        if (this.mod_niuniu.gameniuniuinfo && this.mod_niuniu.gameniuniuinfo.begin) {
            if (this._mineTurnStartTime > 0 && new Date().getTime() - this._mineTurnStartTime >= 10000) {
                // cc.log("please bet......");
                this._mineTurnStartTime = new Date().getTime();
                mod_sound.playeffect(g_music.pleaseBet, false);
            }
        }
    },
    destroy: function () {
        this._timerControl.destroy();
    },
});
/**
 * 回收筹码到赢家
 */
gameclass.zjhtableGoldBF.prototype.recoverChip = function(p) {
    p.x -= this.scoretable.getPositionX();
    p.y -= this.scoretable.getPositionY();
    var chipLen = this.scoretable.getChildrenCount();
    for(var i = 0;i<chipLen;i++){
        var chipView = this.scoretable.getChildren()[i];
        var time = cc.pDistance(chipView.getPosition(), p) / 1000;
        chipView.runAction(cc.sequence(cc.moveTo(time, p.x, p.y), cc.callFunc(function (sender) {
            sender.removeFromParent();
        })))
    }
}
gameclass.zjhtableGoldBF.prototype.runJuShuAction = function() {
    var sucAnim = new sp.SkeletonAnimation(res.duijukaishi_j, res.duijukaishi_a);
    sucAnim.setAnimation(0, 'animation', false);
    sucAnim.setAnchorPoint(0.5, 0.5);
    sucAnim.setPosition(1136/2,320);
    this.node.addChild(sucAnim);
}
gameclass.zjhtableGoldBF.prototype.getMaxChip = function ($leftArr, leftNum) {
    var leftArr = [];
    var useNum = 0;
    var isGet = false;
    var len = $leftArr.length;
    for(var i = len - 1;i>=0;i--){
        var canUseNum = $leftArr[i];
        if(!isGet && leftNum / canUseNum >= 1){
            useNum = canUseNum;
            isGet = true;
        }
        if(isGet){
            leftArr.unshift(canUseNum);
        }
    }
    return {leftArr:leftArr, useNum:useNum};
},
/**
 * 开始和换桌按钮显示监测
 */
gameclass.zjhtableGoldBF.prototype.startBtnVisibleCheck = function () {
    if(!this._isPlayEnd) {
        return false;
    }
    //var readyBtn = ccui.helper.seekWidgetByName(this.node, "ready");
    //var changeBtn = ccui.helper.seekWidgetByName(this.node, "change");
    if (this.mod_niuniu.gameniuniuinfo && this.mod_niuniu.gameniuniuinfo.begin) {
        //readyBtn.setVisible(false);
        //changeBtn.setVisible(false);
        ccui.helper.seekWidgetByName(this.node, "startready").setVisible(false);
        this.invitebtn.setVisible(false);
    } else {
        //readyBtn.setVisible(true);
        //changeBtn.setVisible(true);
        ccui.helper.seekWidgetByName(this.node, "startready").setVisible(true);
        this.invitebtn.setVisible(true);
        if(this.mod_niuniu.isReady(this.game.modmgr.mod_login.logindata.uid)) {
            //readyBtn.setVisible(false);
            ccui.helper.seekWidgetByName(this.node, "startready").setVisible(false);
        }
    }
    if(this.mod_niuniu.isLook) {  //! 是观众显示
        //changeBtn.setVisible(true);
        this.invitebtn.setVisible(true);
    } else if(this.mod_niuniu.gameniuniuinfo.begin) { //! 开始了
        var mineUserData = this.mod_niuniu.getOtherdataFromUid(this.game.modmgr.mod_login.logindata.uid);
        if(mineUserData.discard) {
            //changeBtn.setVisible(true);
            this.invitebtn.setVisible(true);
        }
    }
}
/**
 * 操作按钮可见性处理
 */
gameclass.zjhtableGoldBF.prototype.btnVisibleCheck = function () {
    if(!this._isPlayEnd) {
        return false;
    }

    if (this.mod_niuniu.gameniuniuinfo == null) {
        this.genzhu.setVisible(false);
        this.jiazhu.setVisible(false);
        this.bipai.setVisible(false);
        this.qipai.setVisible(false);
        this.kanpai.setVisible(false);
        this._cuoPai.setVisible(false);
    } else {
        var isGameEnd = this.mod_niuniu.gamestate == 2;
        var begin = this.mod_niuniu.gameniuniuinfo.begin;
        var mineUserData = this.mod_niuniu.getOtherdataFromUid(this.game.modmgr.mod_login.logindata.uid);
        var curUserData = this.mod_niuniu.getOtherdataFromUid(this.mod_niuniu.gameniuniuinfo.curop);
        var canopenqipai = this.mod_niuniu.gameniuniuinfo.round > 0;
        var canbipai;
        if (this.mod_niuniu.gameniuniuinfo.round >= parseInt(this.mod_niuniu.roominfo.param1/100)%10+1) {
            canbipai = true;
        }
        var cankanpai = false;
        if (this.mod_niuniu.gameniuniuinfo.round > parseInt(this.mod_niuniu.roominfo.param1/10)%10) {
            cankanpai = true;
        }

        this.genzhu.setVisible(begin && !isGameEnd);
        this.jiazhu.setVisible(begin && !isGameEnd);

        this.qipai.setVisible(begin && !isGameEnd);
        this.qipai.setBright(begin && !isGameEnd && curUserData && curUserData.uid == mineUserData.uid && !mineUserData.discard);
        this.qipai.setTouchEnabled(this.qipai.isBright());

        this.bipai.setVisible(begin && !isGameEnd);
        this.bipai.setBright(begin && !isGameEnd && curUserData && curUserData.uid == mineUserData.uid && !mineUserData.discard && canopenqipai && canbipai);
        this.bipai.setTouchEnabled(this.bipai.isBright());

        this.kanpai.setVisible(begin && !isGameEnd && !mineUserData.discard && !mineUserData.open && canopenqipai && cankanpai && !mineUserData.lose);
        this.kanpai.setBright(this.kanpai.isVisible());
        this.kanpai.setTouchEnabled(this.kanpai.isBright());

        this._cuoPai.setVisible(begin && !isGameEnd);
        this._cuoPai.setBright(this.kanpai.isVisible());
        this._cuoPai.setTouchEnabled(this.kanpai.isVisible());

        if (!mineUserData.card || mineUserData.card.length == 0) {
            this.kanpai.setVisible(false);
            this.kanpai.setTouchEnabled(false);
            this._cuoPai.setBright(false);
            this._cuoPai.setTouchEnabled(false);
            this.qipai.setBright(false);
            this.qipai.setTouchEnabled(false);
        }
    }
}
gameclass.zjhtableGoldBF.prototype.switchPoit = function (point) {
    return parseInt(point / this.bottomScore);
}
/**
 * 开局打底处理
 */
gameclass.zjhtableGoldBF.prototype.startBetHandle = function () {
    var len = this.mod_niuniu.roominfo.person.length;
    for (var i = 0; i < len; i++) {
        var sceneIndex = this.mod_niuniu.getSceneIndexFromS(i);
        var playerView = this.players[sceneIndex];
        this.createscoreboards(1, this.bottomScore, playerView);
        gameclass.showYSText(-this.bottomScore, playerView.head.getPosition(), this.node);
    }
}
/**
 * 播放结束动画，播放完毕，弹出结算面板
 */
gameclass.zjhtableGoldBF.prototype.playEndMovie = function () {
    this.isBiPaiing = false;
    var _this = this;
    var otherddata = this.mod_niuniu.getOtherdataFromUid(this.game.modmgr.mod_login.logindata.uid);

    var skeName;
    if (otherddata == null || otherddata.score <= 0) {
        //otherddata空时，自己还未加入牌局
        this.playEndMovieSub();
        return;
    } else if (otherddata.score > 0) {
        skeName = "spineWin";
    }
    var endMovie = new sp.SkeletonAnimation(res[skeName + "_j"], res[skeName + "_a"]);
    endMovie.setAnimation(0, 'animation', false);
    this._movieContain.addChild(endMovie);
    endMovie.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
    this._movieContain.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
        endMovie.removeFromParent();
        _this.playEndMovieSub();
    })))
}
/**
 * 皇冠动画，以及金币加减动画
 */
gameclass.zjhtableGoldBF.prototype.playEndMovieSub = function () {
    var _this = this;
    var len = this.mod_niuniu.gameniuniuinfo.info.length;
    for (var i = 0; i < len; i++) {
        var info = this.mod_niuniu.gameniuniuinfo.info[i];
        if (info.score > 0) {
            var sceneIndex = this.mod_niuniu.getSceneIndexFromS(i);
            var playerHead = this.players[sceneIndex].head;
            var crownMovie = new sp.SkeletonAnimation(res.spinecrown_j, res.spinecrown_a);
            crownMovie.setAnimation(0, 'animation', false);
            this._movieContain.addChild(crownMovie);
            this.goldFiy();
            this.createCrownHead(crownMovie, i);
            crownMovie.setPosition(cc.p(cc.winSize.width / 2 - 40, cc.winSize.height / 2));
            var moveAct = cc.moveTo(0.3, playerHead.getPosition());
            moveAct.easing(cc.easeIn(2));
            crownMovie.runAction(cc.sequence(cc.delayTime(3), moveAct, cc.callFunc(function () {
                crownMovie.removeFromParent();
                _this._isPlayEnd = true;
                _this.showGameResultView(0);
            })));
            return;
        }
    }

    this._isPlayEnd = true;
    this.showGameResultView(0);
};

gameclass.zjhtableGoldBF.prototype.createCrownHead = function (parent, index) {
    // cc.log("play crown movie...");
    var playerdata = this.mod_niuniu.roominfo.person[index];
    var otherddata = this.mod_niuniu.gameniuniuinfo.info[index];

    var a1 = cc.scaleTo(0.8, 1);
    var a2 = cc.delayTime(0.8);
    var a3 = cc.scaleTo(0.8, 0);

    var contain = new cc.Sprite(res.headBorder);
    parent.addChild(contain);
    gameclass.mod_base.showtximg(contain, playerdata.imgurl, 0, 0, "im_headbg5", playerdata.ip == "");
    contain.setScale(0);
    contain.runAction(cc.sequence(cc.scaleTo(0.8, 1), cc.delayTime(0.8), cc.scaleTo(0.8, 0)));

    var cardContain = new cc.Sprite();
    parent.addChild(cardContain);
    this.updateHandCard(cardContain, otherddata.card, 0);

    cardContain.setPositionX(120);
    cardContain.setScale(0);
    cardContain.runAction(cc.sequence(cc.scaleTo(0.8, 1), cc.delayTime(0.8), cc.scaleTo(0.8, 0)));
}
gameclass.zjhtableGoldBF.prototype.goldFiy = function () {
    var text;
    var len = this.mod_niuniu.gameniuniuinfo.info.length;
    for (var i = 0; i < len; i++) {
        var info = this.mod_niuniu.gameniuniuinfo.info[i];
        var userIndex = this.mod_niuniu.getSceneIndexFromS(i);
        // if (info.score > 0) {
        //     text = new cc.LabelTTF("+ " + info.score, "Arial", 16);
        //     text.setColor(cc.color(82, 210, 17));
        // } else {
        //     text = new cc.LabelTTF("- " + Math.abs(info.score), "Arial", 16);
        //     text.setColor(cc.color(245, 74, 74));
        // }
        // text.setPosition(this.players[userIndex].head.getPosition());
        // this._movieContain.addChild(text);
        // var spawn = new cc.Spawn(cc.moveBy(2, cc.p(0, 70)), cc.scaleTo(2, 2));
        // text.runAction(new cc.Sequence(spawn, new cc.CallFunc(function (tager) {
        //     tager.removeFromParent(true);
        // })));

        gameclass.showYSText(info.score, this.players[userIndex].head.getPosition(), this.node);
    }
};
/**
 * 布局牌列表
 * @param cardContain   牌容器
 * @param centerIndex   中心索引
 * @param dis   牌与牌的间距
 * @param isBack    牌背，因为牌背是横着的原图，旋转后使用会导致宽高倒置
 */
gameclass.zjhtableGoldBF.prototype.layCardList = function (cardContain, centerIndex, dis, isBack) {
    var singleW;
    var len = cardContain.getChildrenCount();
    for (var i = 0; i < len; i++) {
        var card = cardContain.getChildren()[i];
        if (isBack) {
            card.setRotation(-90);
            singleW = card.getContentSize().height * card.getScale();
        } else {
            singleW = card.getContentSize().width * card.getScale();
        }
        if (i == centerIndex) {
            card.setPositionX(0);
        } else if (i < centerIndex) {
            card.setPositionX(0 - (centerIndex - i) * (singleW + dis));
        } else {
            card.setPositionX(0 + (i - centerIndex) * (singleW + dis));
        }
    }
}
/**
 * 创建牌列表
 * @param card
 */
gameclass.zjhtableGoldBF.prototype.createCardList = function (cardArr) {
    var cardContain = new cc.Sprite();
    var len = cardArr.length;
    for (var i = 0; i < len; i++) {
        var card = this.createCard(cardArr[i]);
        cardContain.addChild(card);
    }
    return cardContain;
}
/**
 * 创建一张牌
 * @param card
 * @return {*}
 */
gameclass.zjhtableGoldBF.prototype.createCard = function (card) {
    var abcd = ["a", "d", "b", "c"];
    var point = Math.floor(card / 10);
    var type = card % 10;
    var spr
    if (card <= 0) {
        spr = new cc.Sprite(res.nn331_beimian_big)
    } else {
        spr = new cc.Sprite("#poker_card_" + point + abcd[type - 1] + ".png");
        //.loadTexture("card_" + point + abcd[type - 1] + ".png", ccui.Widget.PLIST_TEXTURE);
    }
    spr.setAnchorPoint(cc.p(0.5, 0.5));
    return spr;
};
/**
 * 更新用户金币显示
 */
gameclass.zjhtableGoldBF.prototype.updatePersonGold = function () {
    var len = gameclass.mod_zjh.USER_NUM;
    for (var i = 0; i < len; i++) {
        var info = this.mod_niuniu.getplayerotherdata(i);
        if (info) {
            cc.log(info)
            // this.players[i].playername.setString(info.uid);
            this.players[i].playername.setString(info.name);
            var text = gameclass.changeShow(info.total);
            this.players[i].playerscore.setString(text);
            if(this.game.modmgr.mod_login.logindata.uid == info.uid){
                this.game.modmgr.mod_login.logindata.gold = info.total;
            }
        }
    }
    // cc.log(this.mod_niuniu.gameniuniuinfo);
};
gameclass.zjhtableGoldBF.prototype.updateDifen = function () {
    var curscore = this.bottomScore;
    if(this.mod_niuniu.gameniuniuinfo) {
        if(curscore < this.mod_niuniu.gameniuniuinfo.point) curscore = this.mod_niuniu.gameniuniuinfo.point;
    }
    this.danzhu.setString("单注:" + curscore);
};
/**
 * 可用筹码资源
 * @type {[number,number,number,number,number,number,number]}
 */
gameclass.zjhtableGoldBF.chipSourceArr = [50, 100, 200, 500, 1000, 2000, 5000, 10000];





