

gameclass.minesweepingtable = gameclass.baseui.extend({
    mod:null,
    ctor:function(){
        this._super();

    },

    show:function(){

    },
    setmod: function (_mod) {
        this.mod = _mod;
        this.mod.bindUI(this);
        if(window.wx) {
            gameclass.mod_platform.wxshare("扫雷", 0, "大家一起过来玩吧。");
        }
        this.init();
        this.initMicView();
    },

    initMicView:function() {
        var _this = this;

        var mic = ccui.helper.seekWidgetByName(_this.node, "mic");
        var miclayer = ccui.helper.seekWidgetByName(_this.node, "micLayer");
        miclayer.setVisible(false);
        //var imgmic = ccui.helper.seekWidgetByName(_this.node, "imgmic");
        //var ani = cc.sequence(cc.scaleTo(0.8, 1), cc.scaleTo(0.8, 0.8));
        //imgmic.runAction(cc.repeatForever(ani));
        var anim = new sp.SkeletonAnimation(res.voiceJson, res.voiceAtlas);
        anim.setPosition(23,23);
        anim.setScale(0.7);
        miclayer.addChild(anim);
        anim.setAnimation(0, 'animation', true);

        var oldvnum = mod_sound.getEffectsVolume();
        var oldmnum = mod_sound.getMusicVolume();
        mic.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    oldvnum = mod_sound.getEffectsVolume();
                    oldmnum = mod_sound.getMusicVolume();
                    mod_sound.setEffectsVolume(0.0);
                    mod_sound.setMusicVolume(0.0);
                    miclayer.setVisible(true);
                    gameclass.mod_platform.begmic();
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    miclayer.setVisible(false);
                    gameclass.mod_platform.endmic();
                    mod_sound.setEffectsVolume(Number(oldvnum));
                    mod_sound.setMusicVolume(Number(oldmnum));
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    miclayer.setVisible(false);
                    gameclass.mod_platform.cancelmic();
                    mod_sound.setEffectsVolume(Number(oldvnum));
                    mod_sound.setMusicVolume(Number(oldmnum));
                    break;
            }
        });
    }
});

gameclass.minesweepingtable.MAX_PLAYER = 10;
gameclass.minesweepingtable.prestate = -1;

gameclass.minesweepingtable.prototype.runFingerAction = function(){
    var sp = ccui.helper.seekWidgetByName(this.node,"iv_finger");
    var pos = sp.getPosition();
    sp.runAction(cc.sequence(cc.callFunc(function () {
        sp.setPosition(pos.x,pos.y + 60);
    }),cc.moveTo(0.5,pos)).repeatForever());
    sp.setVisible(false);
};

gameclass.minesweepingtable.prototype.initProgress = function(){
    this.timer = new cc.ProgressTimer(new cc.Sprite(res.progress_saolei));
    this.timer.setAnchorPoint(0,0);
    this.timer.type = cc.ProgressTimer.TYPE_RADIAL;
    this.timer.setReverseDirection(true);
    this.timer.setPosition(0,0);
    ccui.helper.seekWidgetByName(this.node,"iv_progress").addChild(this.timer);

    ccui.helper.seekWidgetByName(this.node,"iv_progress").setLocalZOrder(1000);

};

/**
 * 初始化
 */
gameclass.minesweepingtable.prototype.init = function(){
    var _this = this;

    // this.bg = this.game.uimgr.createnode(res.minesweepingbg,true);
    // this.bg.setPosition((cc.winSize.width - this.bg.getContentSize().width)/2,0);
    // this.addChild(this.bg);

    this.node = this.game.uimgr.createnode(res.minesweeping,true);
    this.node.setPosition((cc.winSize.width - this.node.getContentSize().width)/2,0);
    this.addChild(this.node);

    this.initProgress();

    this.panel_sweep = this.game.uimgr.createnode(res.minesweepingdialog,true);
    this.node.addChild(this.panel_sweep);

    this.playerHeads = [];
    gameclass.minesweepingtable.prestate = -1;

    this.runFingerAction();

    var showipinfo = function(sender,type){
        if(ccui.Widget.TOUCH_ENDED == type){
            //if(sender.index == _this.mod.getchairbyuid(_this.game.modmgr.mod_login.logindata.uid)) return;
            var isMine = 1;
            if(sender.index == _this.mod.getchairbyuid(_this.game.modmgr.mod_login.logindata.uid)){
                isMine = 0;
            }
            var playerdata = _this.mod.getplayerdata(sender.index);
            _this.game.uimgr.showui("gameclass.chatMicLayer_sl",false,null,1).setPlayerInfo(playerdata,_this.mod,isMine);
        }
    }

    for(var i = 0; i < gameclass.minesweepingtable.MAX_PLAYER; i++){
        var p = ccui.helper.seekWidgetByName(this.node,"p" + (i + 1));
        p.index = i;
        p.addTouchEventListener(showipinfo);
        this.playerHeads.push(this.resolvePlayerHolder(p));
        this.playerHeads[i].off_line.setVisible(false);
    }


    var btn_start = ccui.helper.seekWidgetByName(this.node,"btn_start");
    if(this.mod.isOwner){
        this.enableButton(btn_start,false);
    } else {
        this.enableButton(btn_start,true);
        btn_start.loadTextureNormal(res.btn_ready);
    }

    gameclass.createbtnpress(this.node,"btn_start",function(){
        _this.mod.gameready();
        btn_start.setVisible(false);
        ccui.helper.seekWidgetByName(_this.node,"btn_invite").setVisible(false);
    });

    gameclass.createbtnpress(this.node,"btn_invite",function(){
        _this.share();
    });

    ccui.helper.seekWidgetByName(this.node,"btn_mailei").addTouchEventListener(function (sender,type) {
        if(type != ccui.Widget.TOUCH_ENDED) return;

        mod_sound.playeffect(g_music["selectItemMp3"], false);
        ccui.helper.seekWidgetByName(_this.node,"panel_mailei").setVisible(true);
        _this.showBoomAnim(false);
        ccui.helper.seekWidgetByName(_this.node,"iv_prompt").setVisible(false);
    });

    // gameclass.createbtnpress(_this.node, "panel_boom", function (sender) {
    //     ccui.helper.seekWidgetByName(_this.node,"panel_mailei").setVisible(true);
    //     sender.setVisible(false);
    //     ccui.helper.seekWidgetByName(_this.node,"iv_prompt").setVisible(false);
    // });

    gameclass.createbtnpress(this.node, "btn_chat", function () {
        _this.mod_game=gameclass.mod_platform.game.modmgr.mod_login.getfirstgame();
        if(!_this.mod_game)return;
        _this.game.uimgr.showui("gameclass.chatuisl",false,null,1);
        _this.game.uimgr.uis["gameclass.chatuisl"].setmod(_this.mod_game);
    });

    gameclass.createbtnpress(_this.node, "btn_menu", function () {
        _this.game.uimgr.showui("gameclass.minesweepingmenu",false,null,1);
        _this.game.uimgr.uis["gameclass.minesweepingmenu"].setData(_this.mod);
    });

    gameclass.createbtnpress(_this.node, "btn_next", function (sender) {
        _this.mod.gameready();
        sender.setVisible(false);
    });

    gameclass.createbtnpress(_this.panel_sweep, "btn_open", function () {
        _this.panel_sweep.setVisible(false);
        _this.mod.getBoom();
    });

    cc.each(ccui.helper.seekWidgetByName(this.node,"panel_mailei").getChildren(),function (o) {
        o.addTouchEventListener(function (sender,type) {
            if(type === ccui.Widget.TOUCH_ENDED){
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                var value = parseInt(sender.getComponent("ComExtensionData").getCustomProperty());
                _this.mod.setBoom(value);

                sender.getParent().setVisible(false);
            }
        });
    });

    // cc.each(ccui.helper.seekWidgetByName(this.node,"panel_table").getChildren(),function (o) {
    //     o.addTouchEventListener(function (sender,type) {
    //         if(type === ccui.Widget.TOUCH_ENDED){
    //             var value = parseInt(sender.getComponent("ComExtensionData").getCustomProperty());
    //             _this.mod.getBoom(value);
    //
    //         }
    //     });
    // });
};

/**
 * 用户掉线
 * @param index 座位
 * @param data 用户数据
 */
gameclass.minesweepingtable.prototype.userLineOut =  function(index,data){
    this.showImg(this.playerHeads[index].head_img,this.playerHeads[index].imgurl,!this.mod.roominfo.person[index].line);
    if(data.line)
        this.playerHeads[index].off_line.setVisible(false);
    else
        this.playerHeads[index].off_line.setVisible(true);
};

/**
 * 分享
 */
gameclass.minesweepingtable.prototype.share = function(){

    var type = parseInt(this.mod.roominfo.param1 / 10) ? "自由埋雷" :"房主埋雷";
    var total = (this.mod.roominfo.param1 % 10) ? 10 : 5;
    // ccui.helper.seekWidgetByName(this.node,"tv_title").setString("房号:" + this.mod.roominfo.roomid + "   地雷:"
    //     + (total - this.mod.gameInfo.boomnum + 1) + "/" + total +"   " + type + "    分值:" + this.mod.roominfo.param2 + "    赔率:");

    gameclass.mod_platform.invitefriend("房号[" + this.mod.roominfo.roomid + "],底分[" + this.mod.roominfo.param2 + "],雷数["+ total +"],[ " + type +"]。大家都在等您，快来吧。",
        this.mod.roominfo.roomid,
        "扫雷-" +  this.mod.roominfo.roomid);

    cc.log("房号[" + this.mod.roominfo.roomid + "],底分[" + this.mod.roominfo.param2 + "],雷数["+ total +"],[" + type +"]。大家都在等您，快来吧。");
};

gameclass.resultui.prototype.shareResult = function(url){
    gameclass.mod_platform.wxsharelink("扫雷结算", "战绩", url);
};

/**
 * 解析玩家UI控件
 * @param node
 * @return
 */
gameclass.minesweepingtable.prototype.resolvePlayerHolder = function (node) {
    var head = ccui.helper.seekWidgetByName(node,"iv_head");
    var off_line = ccui.helper.seekWidgetByName(node,"off_line");
    var name = ccui.helper.seekWidgetByName(node,"tv_name");
    var gold = ccui.helper.seekWidgetByName(node,"tv_total");
    var ready = ccui.helper.seekWidgetByName(node,"iv_ready");
    var zhuang = ccui.helper.seekWidgetByName(node,"iv_zhuang");
    zhuang.setLocalZOrder(100000);
    var chatbg = ccui.helper.seekWidgetByName(node,"chat_bg");
    var score = ccui.helper.seekWidgetByName(node,"tv_score");
    var bg = ccui.helper.seekWidgetByName(node,"bg");
    var fail = ccui.helper.seekWidgetByName(node,"iv_fail");
    var suc = ccui.helper.seekWidgetByName(node,"iv_suc");
    var fail_score = ccui.helper.seekWidgetByName(node,"al_fail");
    var suc_score = ccui.helper.seekWidgetByName(node,"al_suc");
    var best = ccui.helper.seekWidgetByName(node,"iv_best");
    var state = ccui.helper.seekWidgetByName(node,"tv_state");
    var iv_boom = ccui.helper.seekWidgetByName(node,"iv_booms");
    var tv_boom = ccui.helper.seekWidgetByName(node,"tv_booms");

    var _this = this;
    zhuang.addTouchEventListener(function (sender,type) {
        if(type === ccui.Widget.TOUCH_ENDED){
            mod_sound.playeffect(g_music["selectItemMp3"], false);
            if(parseInt(_this.mod.roominfo.param1/10) !== 0){
                var view = ccui.helper.seekWidgetByName(sender.getParent(),"iv_booms");
                view.setVisible(!view.isVisible());
            }
        }
    });


    var playerHolder = {
        head:node,
        off_line:off_line,
        head_img:head,
        playername:name,
        playerscore:gold,
        ready:ready,
        zhuang:zhuang,
        chatbg:chatbg,
        score:score,
        bg:bg,
        fail:fail,
        suc:suc,
        fail_score:fail_score,
        suc_score:suc_score,
        best:best,
        state:state,
        iv_boom:iv_boom,
        tv_boom:tv_boom
    };

    return playerHolder;
};

/**
 * 创建倒计时进度条
 * @param chair 玩家位置
 * @param totalTime 总时间
 * @param costTime 已过时间
 * @return {*|ccui.Widget} 创建好的进度条
 */
gameclass.minesweepingtable.prototype.createProgress = function (chair,totalTime,costTime) {
    var numPercentage=100;
    var runTime=totalTime;

    var timer = ccui.helper.seekWidgetByName(this.node,"progress" + chair);

    if(totalTime != undefined){


        if(this.turn !== chair){//切到后台重进时，需要作判断
            return;
        }

        if(!timer){
            timer = this.createProgress(chair);
        }

        if(costTime) {
            numPercentage = (costTime / totalTime) * 100;
            runTime = totalTime - costTime;
        }

        var to1 = cc.progressFromTo(runTime,numPercentage,0);
        //timer.setScale(0.9);
        // timer.setColor(cc.color(255,215,0));

        //this.node.addChild(timer);

        timer.stopAllActions();
        timer.runAction(to1);
    }else{
        if(!timer){
            timer = new cc.ProgressTimer(new cc.Sprite(res.zgl_headbg4));
        }
        var head_img = this.playerHeads[chair].head_img;
        timer.setAnchorPoint(0.5,0.5);
        timer.type = cc.ProgressTimer.TYPE_RADIAL;
        timer.setReverseDirection(true);
        this.playerHeads[chair].head.addChild(timer);
        timer.setPosition(head_img.getPosition());
        timer.setName("progress" + chair);
        timer.setPercentage(100);
    }
    return timer;
};

/**
 * 更新房间信息
 * @param begin 是否已经开始
 */
gameclass.minesweepingtable.prototype.setRoomInfo = function (data) {
    cc.log("saolei setRoomInfo");

    ccui.helper.seekWidgetByName(this.node,"btn_start").setVisible(this.mod.gameInfo.gamestate == 0 && this.mod.gameInfo.boomnum == this.mod.total);
    ccui.helper.seekWidgetByName(this.node,"btn_invite").setVisible(this.mod.gameInfo.gamestate == 0 && this.mod.gameInfo.boomnum == this.mod.total);

    ccui.helper.seekWidgetByName(this.node,"btn_next").setVisible(this.mod.gameInfo.gamestate == 0 && this.mod.gameInfo.boomnum != this.mod.total && !gameclass.contains(this.mod.gameInfo.ready,this.mod.selfuid));

    //cc.log(this.playerHeads);

    this.updateTitle();
    this.updateGameState(this.mod.gameInfo.gamestate,this.mod.gameInfo);
    //ccui.helper.seekWidgetByName(this.node,"tv_lei").setString("地雷:" + gameinfo.boomnum + "/" + total);
    // ccui.helper.seekWidgetByName(this.node,"tv_room").setString("房间号：" + data.roomid + "   ");

};

gameclass.contains = function (arr,item) {
    for(var i = 0; i < arr.length; i++){
        if(arr[i] == item){
            return true;
        }
    }
    return false;
};

gameclass.minesweepingtable.prototype.updateSinglePlayer = function (chair,bool) {
    var person = this.mod.gameInfo.info[chair];
    var roominfoPerson = this.mod.roominfo.person;
    if(!person){
        this.playerHeads[chair].head.setVisible(false);
        return;
    } else {
        this.playerHeads[chair].head.setVisible(true);
    }

    this.playerHeads[chair].zhuang.setVisible(person.deal);
    this.playerHeads[chair].off_line.setVisible(!roominfoPerson[chair].line);
    this.playerHeads[chair].imgurl = roominfoPerson[chair].imgurl;
    // if(person.deal){
    //     this.deal = person.uid;
    // }
    //this.playerHeads[chair].head.setVisible(true);

    if(this.mod.gameInfo.gamestate === 0){
        this.playerHeads[chair].best.setVisible(false);
        this.playerHeads[chair].zhuang.setVisible(false);
        this.playerHeads[chair].bg.setVisible(false);
        this.playerHeads[chair].suc.setVisible(false);
        this.playerHeads[chair].fail.setVisible(false);
        this.playerHeads[chair].state.setVisible(false);
        this.playerHeads[chair].iv_boom.setVisible(false);

        var contains = gameclass.contains(this.mod.gameInfo.ready,person.uid);
        this.playerHeads[chair].ready.setVisible(contains);
        if(!contains){
            this.playerHeads[chair].bg.setVisible(person.score);
            if(person.score < 0){
                this.playerHeads[chair].fail.setVisible(true);
                this.playerHeads[chair].suc.setVisible(false);
                this.playerHeads[chair].fail_score.setString("" + person.score.toFixed(2));
                this.playerHeads[chair].playerscore.setString(person.total);
                if(!this.mod.isover){
                    this.flyWords(person.boomscore + "",chair,cc.color(255,0,0));
                    this.flyCoin(chair,this.curChair);
                }
            } else if(person.score > 0){
                this.playerHeads[chair].fail.setVisible(false);
                this.playerHeads[chair].suc.setVisible(true);
                this.playerHeads[chair].suc_score.setString("+" + person.score.toFixed(2));
                this.playerHeads[chair].playerscore.setString(person.total);
            }
        }

    } else if(this.mod.gameInfo.gamestate === 1){
        this.playerHeads[chair].best.setVisible(false);
        this.playerHeads[chair].zhuang.setVisible(false);
        this.playerHeads[chair].bg.setVisible(false);
        this.playerHeads[chair].suc.setVisible(false);
        this.playerHeads[chair].fail.setVisible(false);
        this.playerHeads[chair].state.setVisible(false);
        this.playerHeads[chair].iv_boom.setVisible(false);
        this.playerHeads[chair].ready.setVisible(false);
    }else if(this.mod.gameInfo.gamestate === 2){
        var showScore = person.score != 0;
        this.playerHeads[chair].best.setVisible(false);
        this.playerHeads[chair].zhuang.setVisible(person.deal);
        this.playerHeads[chair].best.setVisible(false);
        this.playerHeads[chair].bg.setVisible(showScore);
        if(!showScore){
            this.playerHeads[chair].fail.setVisible(false);
            this.playerHeads[chair].suc.setVisible(false);
        }

        //this.playerHeads[chair].suc.setVisible(false);
        //this.playerHeads[chair].fail.setVisible(false);
        this.playerHeads[chair].state.setVisible(false);
        this.playerHeads[chair].iv_boom.setVisible(false);
        this.playerHeads[chair].ready.setVisible(false);

        if(person.boomscore < 0){
            this.playerHeads[chair].fail.setVisible(true);
            this.playerHeads[chair].suc.setVisible(false);
            this.playerHeads[chair].fail_score.setString("+" + person.score.toFixed(2));
            this.playerHeads[chair].playerscore.setString(person.total);
            if(!this.mod.isover){
                this.flyWords(person.boomscore + "",chair,cc.color(255,0,0));
                this.flyCoin(chair,this.curChair);
            }

        } else if(person.score > 0){
            this.playerHeads[chair].fail.setVisible(false);
            this.playerHeads[chair].suc.setVisible(true);
            this.playerHeads[chair].suc_score.setString("+" + person.score.toFixed(2));
            this.playerHeads[chair].playerscore.setString(person.total);

            //mod_sound.playeffect(g_music["sl_suc"], false);
        }

    }

    //this.playerHeads[i].ishaves = true
    if(bool){
        var score = person.total;
        if (!score) score = 0;
        this.playerHeads[chair].playerscore.setString(score);
    }

    if(this.playerHeads[chair].head_img.getTag() !== chair){
        this.showImg(this.playerHeads[chair].head_img,this.mod.roominfo.person[chair].imgurl,!this.mod.roominfo.person[chair].line);
        this.playerHeads[chair].head_img.setTag(chair);

        var n = this.mod.roominfo.person[chair].name.substring(0,4);
        this.playerHeads[chair].playername.setString(n);
    }

};

gameclass.minesweepingtable.prototype.updateTitle = function () {
    var type = parseInt(this.mod.roominfo.param1 / 10) ? "自由埋雷" :"房主埋雷";
    var total = (this.mod.roominfo.param1 % 10) ? 10 : 5;
    ccui.helper.seekWidgetByName(this.node,"tv_title").setString("房号:" + this.mod.roominfo.roomid + "   地雷:"
        + (total - this.mod.gameInfo.boomnum + 1) + "/" + total +"   " + type + "    分值:" + this.mod.roominfo.param2 + "    赔率:");
    // ccui.helper.seekWidgetByName(this.bg,"tv_title").setString("房号:" + this.mod.roominfo.roomid + "   地雷:"
    //     + this.mod.gameInfo.boomnum + "/" + total +"   " + type + "    分值:" + this.mod.roominfo.param2 + "    赔率:");
};

gameclass.minesweepingtable.prototype.flyCoin = function (fromChair,toChair,num) {
    var from,to;
    if(fromChair == undefined){
        from = cc.p(cc.winSize.width/2,cc.winSize.height/2);
    } else {
        from = this.getWorldPosition(this.playerHeads[fromChair].head_img);
    }

    if(toChair == undefined){
        to = cc.p(cc.winSize.width/2,cc.winSize.height/2);
    } else {
        to = this.getWorldPosition(this.playerHeads[toChair].head_img);
    }

    if(num == undefined){
        num = 5;
    }
    for (var i = 0; i < num; i++) {
        var sp = new cc.Sprite(res.coin_saolei);
        sp.setPosition(from);
        sp.setVisible(false);
        this.node.addChild(sp);
        var move = cc.moveTo(0.3, to);
        sp.runAction(cc.sequence(cc.delayTime(1 + i * 0.1), cc.callFunc(function (o) {
            mod_sound.playeffect(g_music["gold_ring"], false);
            o.setVisible(true);
        }, sp), move, cc.callFunc(function (o) {
            o.removeFromParent(true);
        }, sp)));
    }
};

/**
 * 更新玩家信息
 * @param bool
 */
gameclass.minesweepingtable.prototype.updatePlayerinfo = function(bool){
    cc.log("saolei updatePlayerInfo");

    for(var i = 0; i < gameclass.minesweepingtable.MAX_PLAYER; i++){
        this.updateSinglePlayer(i,bool);
    }

    this.updateStart();
};

/**
 * 显示准备
 * @param index 座位index
 */
gameclass.minesweepingtable.prototype.showReady = function (index) {
    cc.log("saolei showReady");
    this.mod.gameInfo.info[index].boomscore = 0;
    this.mod.gameInfo.info[index].score = 0;
    this.updateSinglePlayer(index,false);
    this.updateStart();
};

gameclass.minesweepingtable.prototype.updateStart = function(){
    if(!this.mod.isOwner){
        return;
    }
    if(this.mod.gameInfo.ready.length >=4 && this.mod.gameInfo.ready.length === this.mod.roominfo.person.length - 1 && this.mod.isOwner){
        this.enableButton(ccui.helper.seekWidgetByName(this.node,"btn_start"),true);
    } else {
        this.enableButton(ccui.helper.seekWidgetByName(this.node,"btn_start"),false);
    }
}

gameclass.minesweepingtable.prototype.updateGameState = function (state,data,delay) {
    if(delay === undefined)  delay = 0;
    var _this = this;

    this.scheduleOnce(function () {
        _this.doUpdateGameState(state,data);
    },delay);
};

gameclass.minesweepingtable.prototype.showBoomAnim = function(show){
    ccui.helper.seekWidgetByName(this.node,"panel_boom").setVisible(show);
    // ccui.helper.seekWidgetByName(this.node,"iv_prompt").setVisible(show);
    // ccui.helper.seekWidgetByName(this.node,"tv_prompt").setString("雷针："+ this.mod.gameInfo.boompos);
    // if(show){
    //     this.anim.setAnimation(0, 'animation', true);
    // }
};

gameclass.minesweepingtable.prototype.continueMailei = function (data) {
    if(data.boomnum > 0){
        if(!ccui.helper.seekWidgetByName(this.node,"panel_boom").isVisible() && !ccui.helper.seekWidgetByName(this.node,"panel_mailei").isVisible()){
            this.showBoomAnim(true);
        }

        ccui.helper.seekWidgetByName(this.node,"iv_prompt").setVisible(true);
        ccui.helper.seekWidgetByName(this.node,"tv_prompt").setString("剩余" + data.boomnum + "个地雷，请选择是否埋雷");
    }

};

gameclass.minesweepingtable.prototype.doUpdateGameState = function (state,data) {
    cc.log("saolei updateGameState:" + state);

    var _this = this;

    if(this.mod.gameInfo ){
        if(gameclass.minesweepingtable.prestate === state) return;
        gameclass.minesweepingtable.prestate = state;
        this.mod.gameInfo.gamestate = state;
    }

    var tv_prompt = ccui.helper.seekWidgetByName(this.node,"iv_prompt");

    var panel_mailei = ccui.helper.seekWidgetByName(this.node,"panel_mailei");

    if(data.bets){
        ccui.helper.seekWidgetByName(this.node,"tv_mult").setString(data.bets);
        //ccui.helper.seekWidgetByName(this.bg,"tv_mult").setString(data.bets);
        this.mod.bets = data.bets;
    }

    switch (state){
        case 0:
            this.panel_sweep.setVisible(false);

            this.showBoomAnim(false);
            tv_prompt.setVisible(false);

            panel_mailei.setVisible(false);
            //panel_table.setVisible(false);
            //ccui.helper.seekWidgetByName(this.node,"tv_mult").setString("--");
            ccui.helper.seekWidgetByName(this.node,"iv_progress").setVisible(false);
            this.timer.unscheduleAllCallbacks();
            break;
        case 1:
            //this.resetReady();
            for(var i = 0; i < this.mod.gameInfo.info.length; i++){
                this.mod.gameInfo.info[i].boomscore = 0;
                this.mod.gameInfo.info[i].score = 0;
                this.mod.gameInfo.ready = [];
                this.updatePlayerinfo(false);
            }

            this.mod.totalNum = this.mod.gameInfo.info.length;

            this.panel_sweep.setVisible(false);

            //ccui.helper.seekWidgetByName(this.node,"btn_ready").setVisible(false);
            ccui.helper.seekWidgetByName(this.node,"btn_start").setVisible(false);
            ccui.helper.seekWidgetByName(this.node,"btn_invite").setVisible(false);

            if(parseInt(this.mod.roominfo.param1/10) === 0){
                if(this.mod.isOwner){
                    this.showBoomAnim(true);
                    ccui.helper.seekWidgetByName(this.node,"tv_prompt").setString("剩余" + data.boomnum + "个地雷，请开始埋雷");
                } else {
                    this.showBoomAnim(false);
                    ccui.helper.seekWidgetByName(this.node,"tv_prompt").setString("等待房主埋雷...");
                }
            } else {
                if(!ccui.helper.seekWidgetByName(this.node,"panel_boom").isVisible() && !panel_mailei.isVisible()){
                    this.showBoomAnim(true);
                    ccui.helper.seekWidgetByName(this.node,"iv_prompt").setVisible(true);
                }
                ccui.helper.seekWidgetByName(this.node,"tv_prompt").setString("剩余" + data.boomnum + "个地雷，请选择是否埋雷");

            }
            ccui.helper.seekWidgetByName(this.node,"iv_progress").setVisible(false);

            tv_prompt.setVisible(true);

            //panel_mailei.setVisible(false);
            // panel_table.setVisible(false);
            break;
        case 2:
            var self = this.mod.getchairbyuid(this.mod.selfuid);
            var chair = this.mod.getchairbyuid(data.boomuid);
            if(this.curChair != undefined){
                this.mod.gameInfo.info[this.curChair].deal = false;
            }
            this.curChair = chair;
            this.mod.gameInfo.info[chair].deal = true;
            this.panel_sweep.setVisible(false);

            if(data.begin === undefined){
                for(var i = 0; i < this.mod.gameInfo.info.length; i++){
                    this.mod.gameInfo.info[i].boomscore = 0;
                    this.mod.gameInfo.info[i].score = 0;
                    this.mod.gameInfo.ready = [];
                    this.updatePlayerinfo(false);
                }
            }


            if(this.mod.gameInfo.info[self].score == 0){
                this.playThrowAnim(chair);
            }

            cc.log(data.boomuid + "=======================" + chair);

            this.playerHeads[chair].zhuang.setVisible(true);
            this.showImg(ccui.helper.seekWidgetByName(this.panel_sweep,"iv_head"),this.mod.roominfo.person[chair].imgurl,false);
            ccui.helper.seekWidgetByName(this.panel_sweep,"tv_name").setString(this.mod.roominfo.person[chair].name);
            ccui.helper.seekWidgetByName(this.panel_sweep,"tv_prompt1").setString("雷针：" + data.boompos);
            this.mod.boompos = data.boompos;

            ccui.helper.seekWidgetByName(this.node,"iv_prompt").setVisible(true);

            ccui.helper.seekWidgetByName(this.node,"tv_prompt").setString("雷针：" + data.boompos);


            ccui.helper.seekWidgetByName(this.node,"iv_progress").setVisible(true);
            //var to1 = cc.progressFromTo(data.time,data.time * 100 / 30,0);
            var t = data.hadtime || 30;

            var to1 = cc.progressFromTo(t,(t/30) * 100,0);
            this.timer.runAction(to1);

            ccui.helper.seekWidgetByName(_this.node,"tv_progress").setString(t);

            this.timer.schedule(function () {
                t--;
                ccui.helper.seekWidgetByName(_this.node,"tv_progress").setString(t);
            },1,30);

            this.showBoomAnim(false);
            //tv_prompt.setVisible(false);

            panel_mailei.setVisible(false);

            break;
    }

};

gameclass.minesweepingtable.prototype.showImg = function(node,url,grey){
    gameclass.mod_base.showtximg(node, url, 0, 0, "sl_bg_head@2x", grey);
    ccui.helper.seekWidgetByName(node,"iv_border").setLocalZOrder(1000);

};

gameclass.minesweepingtable.prototype.enableButton = function (btn,enabled) {
    btn.setEnabled(enabled);
    btn.setOpacity(enabled ? 0xff : 0x80);
};

gameclass.minesweepingtable.prototype.onSetBoom = function (data) {
    cc.log("saolei onSetBoom");
    var chair = this.mod.getchairbyuid(data.uid);
    this.playerHeads[chair].zhuang.setVisible(true);
    this.playerHeads[chair].playerscore.setString(data.total);

    var tv_boom = this.playerHeads[chair].tv_boom;
    if(tv_boom.getString() && tv_boom.getString() != ""){
        tv_boom.setString(data.boomid);
    } else {
        tv_boom.appendString(" " + data.boomid);
    }
};



gameclass.minesweepingtable.prototype.playBoomAnim = function (chair) {
    var anim = new sp.SkeletonAnimation(res.dileiJ, res.dileiA);
    if(this.mod.roominfo.person[chair].uid == this.mod.selfuid){
        anim.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        this.node.addChild(anim);
    } else {
        var head = this.playerHeads[chair].head_img;
        anim.setPosition(head.getContentSize().width/2,head.getContentSize().height/2);
        anim.setScale(0.2);
        anim.setLocalZOrder(2000);
        head.addChild(anim);
    }

    anim.setAnimation(0, 'animation', true);

    this.scheduleOnce(function () {
        anim.removeFromParent(true);
    },1.1666);
};

gameclass.minesweepingtable.prototype.playThrowAnim = function (chair) {
    var _this = this;
    var anim = new sp.SkeletonAnimation(res.dilei2J, res.dilei2A);
    var btn = ccui.helper.seekWidgetByName(this.node,"btn_next").clone();
    btn.setContentSize(200,200);
    btn.setVisible(true);
    btn.setOpacity(0);
    btn.setAnchorPoint(0.5,0.5);
    btn.setPosition(anim.getContentSize().width/2,anim.getContentSize().height/2);
    anim.addChild(btn);
    anim.setAnimation(0, 'animation', true);
    anim.setTag(666666);
    btn.addTouchEventListener(function (sender,type) {
        if(type != ccui.Widget.TOUCH_ENDED){
            return;
        }
        mod_sound.playeffect(g_music["selectItemMp3"], false);

        _this.panel_sweep.setVisible(true);
        ccui.helper.seekWidgetByName(_this.node,"iv_finger").setVisible(false);
        sender.getParent().setVisible(false);
    });

    this.node.addChild(anim);
    anim.setAnchorPoint(0.5,0.5);
    var head = this.playerHeads[chair].head_img;
    anim.setPosition(head.getParent().convertToWorldSpace(head.getPosition()));
    anim.setScale(0.2);

    var jump = cc.jumpTo(0.5,cc.p(cc.winSize.width/2,cc.winSize.height/2),200,1);

    anim.runAction(cc.scaleTo(0.5,1));
    anim.runAction(cc.sequence(jump,cc.callFunc(function () {
        ccui.helper.seekWidgetByName(_this.node,"iv_finger").setVisible(true);
    })));

};

gameclass.minesweepingtable.prototype.flyWords = function(str,chair,color){
    var l = new cc.LabelTTF(str, "Arial", 36);
    if(color != undefined){
        l.setFontFillColor(color);
    }

    l.setPosition(this.getWorldPosition(this.playerHeads[chair].head_img));

    this.node.addChild(l);

    l.runAction(this.fadeInAndOut(l,0,100));

};

gameclass.minesweepingtable.prototype.getWorldPosition = function (node) {
    return node.getParent().convertToWorldSpace(node.getPosition());
};

gameclass.minesweepingtable.prototype.onGetBoom = function (data) {
    cc.log("saolei onGetBoom");
    var chair = this.mod.getchairbyuid(data.uid);

    this.mod.gameInfo.info[chair] = data;
    if(data.boomscore < 0){
        mod_sound.playeffect(g_music["fire"]);
        this.playBoomAnim(chair);
    } else {
        mod_sound.playeffect(g_music["sl_suc"]);
    }

    this.updateSinglePlayer(chair);

    cc.log("========================= " + chair);

    if(data.uid === this.mod.selfuid){
        this.panel_sweep.setVisible(false);
    }
};

gameclass.minesweepingtable.prototype.clearTable = function(){
    ccui.helper.seekWidgetByName(this.node,"panel_boom").setVisible(false);
    ccui.helper.seekWidgetByName(this.node,"panel_mailei").setVisible(false);
    ccui.helper.seekWidgetByName(this.node,"btn_next").setVisible(false);
    ccui.helper.seekWidgetByName(this.node,"iv_prompt").setVisible(false);
    ccui.helper.seekWidgetByName(this.node,"iv_progress").setVisible(false);
    ccui.helper.seekWidgetByName(this.node,"btn_start").setVisible(false);
    ccui.helper.seekWidgetByName(this.node,"btn_invite").setVisible(false);
    ccui.helper.seekWidgetByName(this.node,"btn_chat").setVisible(false);
    ccui.helper.seekWidgetByName(this.node,"mic").setVisible(false);
    ccui.helper.seekWidgetByName(this.node,"btn_menu").setVisible(false);
};

/**
 * 游戏结束
 * @param data 服务端数据
 */
gameclass.minesweepingtable.prototype.onGameMineSweepingBye = function(data){
    cc.log("saolei onGameMingSweepingBye");

    var _this = this;

    var sp = ccui.helper.seekWidgetByName(_this.node,"tv_gameover");

    sp.runAction(_this.fadeInAndOut(sp,0,200));

    ccui.helper.seekWidgetByName(_this.node,"iv_progress").setVisible(false);
    _this.timer.unscheduleAllCallbacks();


    ccui.helper.seekWidgetByName(_this.node,"btn_next").setVisible(false);

    this.mod.endinfo = data;

    if(this.mod._isThisGameOver && this.mod.gameInfo.boomnum <= 0) return;


    this.scheduleOnce(function(){
        ///this.endcoverLayer.setVisible(false);
        // _this.mod.gameInfo.info = data.info;
        // for(var i = 0; i < data.info.length; i ++){
        //     _this.mod.gameInfo.info[i].score = _this.mod.gameInfo.info[i].total;
        // }
        //_this.updatePlayerinfo(true);

        _this.game.uimgr.showui("gameclass.minesweepingresult",false,null,1);
        _this.game.uimgr.uis["gameclass.minesweepingresult"].setData(_this.mod,this.mod.endinfo,2);

        // _this.clearTable();
        //
        // this.node.removeFromParent();
        // var n = _this.game.uimgr.createnode(res.minesweepingresult,true);
        // n.setAnchorPoint(0.5,0.5);
        // n.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        // ccui.helper.seekWidgetByName(_this.node,"btn_share").setVisible(true);
        // ccui.helper.seekWidgetByName(_this.node,"btn_confirm").setVisible(true);
        // var panel = ccui.helper.seekWidgetByName(n,"panel_content");
        // panel.addChild(this.node);
        // this.node.setAnchorPoint(0.5,0.5);
        // ccui.helper.seekWidgetByName(n,"iv_border").setLocalZOrder(100);
        // ccui.helper.seekWidgetByName(n,"tv_title").setLocalZOrder(101);
        // this.node.setPosition(panel.getContentSize().width/2,panel.getContentSize().height/2);
        // //this.node.setLocalZOrder(100);
        // _this.addChild(n);
    },2);
};

gameclass.minesweepingtable.prototype.showOneResult = function (data) {
    var _this = this;

    ccui.helper.seekWidgetByName(this.node,"iv_finger").setVisible(false);
    var n = this.node.getChildByTag(666666);
    if(n){
        n.removeFromParent(true);
    }

    _this.game.uimgr.showui("gameclass.minesweepingresult",false,null,1);
    _this.game.uimgr.uis["gameclass.minesweepingresult"].setData(_this.mod,data,1);

    if(!this.mod.isover){
        this.mod.gameInfo.boomnum--;
        this.updateTitle();
    }

    cc.each(data.info,function (o,i) {
        if(o.bestscore){
            _this.playerHeads[i].best.setVisible(true);
        }
    });

    //ccui.helper.seekWidgetByName(this.node,"btn_next").setVisible(true);

};

gameclass.minesweepingtable.prototype.showSuc = function (isBest,data) {
    var node = ccui.helper.seekWidgetByName(this.node,"iv_suc");
    node.setVisible(true);

    ccui.helper.seekWidgetByName(this.node,"iv_best").setVisible(isBest);

    ccui.helper.seekWidgetByName(node,"tv_score").setString("+ " + data.score);
    var pos = node.getPosition();
    node.setPosition(node.getPosition().x,node.getPosition().y - 1000);
    var move = cc.moveTo(1,pos.x,pos.y).easing(cc.easeBounceOut());
    var seq = cc.sequence(move,cc.delayTime(2),cc.hide());
    node.runAction(seq);
};

gameclass.minesweepingtable.prototype.onChat = function(data){
    //this.playerHeads[index].showCart(data);
    var _this = this;
    var playerIdex = _this.mod.getchairbyuid(data.uid);

    if(data.type == 4){
        var sendIndex = this.mod.getchairbyuid(data.uid);
        var hitIndex = this.mod.getchairbyuid(JSON.parse(data.chat).hitUid);
        var posArr = [];
        for(var i = 0;i < gameclass.minesweepingtable.MAX_PLAYER;i++){
            posArr[i] = ccui.helper.seekWidgetByName(this.node,'p'+(i+1));
        }

        var _senderObj = JSON.parse(data.chat);
        var _animateNode=new cc.Node();
        _animateNode.setScale(0.8);
        mod_sound.playeffect(g_music["magic"+_senderObj.type],false);
        _senderObj.type+=1;
        var sucAnim = new sp.SkeletonAnimation(g_magic_chat["magic_chat_"+_senderObj.type+"_1_json"], g_magic_chat["magic_chat_"+_senderObj.type+"_1_atlas"]);
        sucAnim.setAnimation(0, 'animation', false);
        sucAnim.setAnchorPoint(0.5,0.5);
        _animateNode.addChild(sucAnim);
        //var senderSize = this.playerHeads[sendIndex].node.getContentSize();
        var senderPos=posArr[sendIndex];
        _animateNode.setPosition(senderPos.x + 29,senderPos.y + 21);
        var hitPos = posArr[hitIndex];
        this.node.addChild(_animateNode);
        _animateNode.runAction(cc.sequence(cc.delayTime(1),cc.spawn(cc.rotateTo(0.5,360),cc.moveTo(0.5,cc.p(hitPos.x + 29,hitPos.y + 21))),cc.callFunc(function(_animateNode,sucAnim){
            sucAnim.removeFromParent(true);
            var sucAnim1 = new sp.SkeletonAnimation(g_magic_chat["magic_chat_"+_senderObj.type+"_2_json"], g_magic_chat["magic_chat_"+_senderObj.type+"_2_atlas"]);
            sucAnim1.setAnimation(0, 'animation', false);
            sucAnim1.setAnchorPoint(0.5,0.5);
            _animateNode.addChild(sucAnim1);
            _animateNode.scheduleOnce(function(){
                _animateNode.removeFromParent(true)
            },1)
        },_animateNode,sucAnim)))
        return;
    }

    var index = -1;
    var fix;
    if(this.mod.roominfo.person[playerIdex].sex == 2){
        fix = "w";
    } else {
        fix = "m";
    }
    for(var i = 0;i < g_chatstr_sl.length; i++){
        if(g_chatstr_sl[i] == data.chat){
            mod_sound.playeffect(g_music["sl_msg_" + fix + (i+1)],false);
            index = i;
        }
    }
    //for (var i = 0;i < 5;i ++) {

    var playernode = _this.playerHeads[playerIdex].ccc;
    //if (player != null && player.uid == data.uid) {
    //var talkPos = this.talkPos[playerIdex];

    var _node = new ccui.Layout();

    var arr = [
        res.chatbg_ld,
        res.chatbg_rd,
    ];

    var s9 = null;
    if(data.type == 1){
        s9 = new cc.Scale9Sprite(arr[playerIdex % 2]);
        s9.setCapInsets(cc.rect(60,10,10,10));
        s9.setAnchorPoint(cc.p(0,0));
        s9.setPosition(cc.p(-18,-18));
        _node.addChild(s9);

        var helloLabel = new cc.LabelTTF(data.chat, "Arial", 36);
        //cc.log("++++++++++++++++" + helloLabel.getContentSize().width);
        if(index === 0){
            helloLabel.setDimensions(helloLabel.getContentSize().width/2,helloLabel.getContentSize().height * 2);
        }
        //cc.log("++++++++++++++++" + helloLabel.getContentSize().width);
        helloLabel.setAnchorPoint(cc.p(0,0));
        helloLabel.setColor(cc.color(33,111,75));
        _node.addChild(helloLabel);
        s9.setContentSize(helloLabel.getContentSize().width + 30,helloLabel.getContentSize().height + 30);
    }else if(data.type == 2){
        var index = Number(data.chat);
        var spr = new cc.Sprite();
        spr.initWithFile(g_face[index]);

        s9 = new ccui.Layout();
        s9.setContentSize(spr.width + 30, spr.height + 20);
        s9.setBackGroundImage(arr[playerIdex % 2]);
        s9.setBackGroundImageScale9Enabled(true);
        spr.setPosition(0.5*s9.getContentSize().width,0.5*s9.getContentSize().height+5);
        s9.addChild(spr);
        _node.addChild(s9);

    }else if (data.type == 3){
        gameclass.mod_platform.playurl(data.chat);

        var count = 0;
        var textureArr = [res.soundopen0,res.soundopen1,res.soundopen2];
        var spr = new cc.Sprite(res.soundopen2);
        spr.setAnchorPoint(cc.p(0.5,0.5));
        //function _callFunc(){
        //    if(count>=4) _this.node.unschedule(_callFunc);
        //    spr.setTexture(textureArr[count%3]);
        //    count++;
        //}
        //this.node.schedule(_callFunc,0.3);
        //spr.setPosition(cc.p(spr.getContentSize().width/2,spr.getContentSize().height/2));
        _node.addChild(spr);
    }
    // if(data.type == 1 || data.type == 2){
    //     if (playerIdex == 1 || playerIdex == 2){
    //         _node.setPosition(talkPos.x - s9.width,talkPos.y);
    //     }else{
    //         _node.setPosition(talkPos);
    //     }
    // }else{
    //     _node.setPosition(talkPos);
    // }

    this.node.addChild(_node);
    var pos = this.playerHeads[playerIdex].head_img.getParent().convertToWorldSpace(this.playerHeads[playerIdex].head_img.getPosition());
    if(playerIdex % 2 === 0){

        _node.setPosition(pos.x + 55,pos.y + 35);
    } else {
        _node.setPosition(pos.x - s9.width - 55,pos.y + 35);
    }

    var seq = cc.sequence(cc.delayTime(2),cc.callFunc(function(){
        _node.removeFromParent(true);
    }));
    _node.runAction(seq);
};

/**
 * 先淡入后淡出动画
 * @param spr
 * @param deltX
 * @param deltY
 * @param dur
 * @return {cc.Sequence}
 */
gameclass.minesweepingtable.prototype.fadeInAndOut = function (spr, deltX, deltY, dur) {
    if (!dur) {
        dur = 0.2;
    }
    var pos = spr.getPosition();
    var act1 = cc.callFunc(function () {
        spr.setVisible(true);
        spr.setPosition(pos.x - deltX, pos.y - deltY);
    });
    var act2 = cc.spawn(cc.moveBy(dur, deltX, deltY), cc.fadeIn(dur));
    var act3 = cc.delayTime(dur * 5);
    var act4 = cc.spawn(cc.moveBy(dur, deltX, deltY), cc.fadeOut(dur));
    var act5 = cc.callFunc(function () {
        spr.setPosition(pos);
    });

    return cc.sequence(act1, act2, act3, act4, act5);
};
