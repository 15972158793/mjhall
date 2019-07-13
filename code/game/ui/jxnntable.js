/**
 * Created by yang on 2016/11/9.
 */

var jxnn_playerHead = cc.Class.extend({
    node:null,
    index:null,
    head_img:null,
    zhuang_img:null,
    name_text:null,
    score_text:null,
    call_scoreImg:null,
    ok_img:null,
    id_text:null,
    rob_zhuang_img:null,
    handCards:null,
    ccc:null,

    ctor: function (node,index,parent) {
        this.node = node.getChildByName('head');
        this.index = index;
        this.name_text = this.node.getChildByName('playername');
        this.ok_img = this.node.getChildByName('ok');
        this.head_img =  this.node.getChildByName('icon');
        this.id_text = this.node.getChildByName('playerid');
        this.score_text = this.node.getChildByName('playerscore');
        this.call_scoreImg = this.node.getChildByName('call_score');
        this.zhuang_img = this.node.getChildByName('zhuang');
        this.rob_zhuang_img =  this.node.getChildByName('rob_zhuang');
        this.handCards = ccui.helper.seekWidgetByName( parent, "notifynode"  + index);
        this.off_line = this.node.getChildByName("off_line");

        this.ipLayout = this.node.getChildByName('ipLayout');
        this.uid_Text = this.ipLayout.getChildByName('uid_Text');
        this.uip_Text = this.ipLayout.getChildByName('uip_Text');
        this.address_Text = this.ipLayout.getChildByName('address_Text');
        this.ccc = this.node.getChildByName('ccc');
        this.init();
    },
    createProgress : function(isMingPai,strName,time){
        var _this = this;
        var numPercentage=100;
        var runTime=8;
        if(time) {
            numPercentage = (time / 8) * 100;
            runTime=time;
        }
        var to1 = cc.progressFromTo(runTime,numPercentage,0);
        var timer = new cc.ProgressTimer(new cc.Sprite(res.progressBar));
        timer.setAnchorPoint(0.5,0.5);
        timer.type = cc.ProgressTimer.TYPE_RADIAL;
        timer.setReverseDirection(true);
        timer.setScale(0.9);
        timer.setColor(cc.color(255,215,0));
        this.node.addChild(timer);
        timer.setPosition(this.head_img.getPosition());
        if(isMingPai){
            timer.setName(strName);
            timer.runAction(cc.sequence(to1,cc.callFunc(function(){
               // _this.objToMingPai();
                timer.removeFromParent(true);
            })));
        }else{
            timer.setName(strName);
            timer.runAction(to1.repeatForever());
        }
    },

    destroyProgress : function(strName){
        if(this.node.getChildByName(strName)){
            this.node.getChildByName(strName).removeFromParent(true);
        }

    },
    uniq : function(arr1,arr2) {
        var arr = [];
        for (var i = 0; i < arr1.length; i++) {
            if (0 > arr2.indexOf(arr1[i])) {
                arr.push(arr1[i]);
            }
        }
        return arr;
    },
    objToMingPai:function (){
        var lst = [];
        for(var i = 0;i < 5; i++){
            lst[i] = false;
        }
        var isMaxNiu = mod_compare.gettype(jxnn_playerHead.curPlayCard,lst);
        jxnn_playerHead.Play_mod_niuniu.gameview(isMaxNiu, jxnn_playerHead.curPlayCard);

    },
    init:function(){
        if (this.index == 1 || this.index == 2) {
            this.ok_img.setPositionX(-45);
            this.rob_zhuang_img.setPositionX(-60);
            this.call_scoreImg.setPositionX(-120);
        }

        this.ok_img.setVisible(false);
        this.rob_zhuang_img.setVisible(false);
        this.call_scoreImg.setVisible(false);
        this.zhuang_img.setVisible(false);
        this.zhuang_img.setLocalZOrder(100);
        this.ipLayout.setVisible(false);
        this.node.setVisible(false);
        this.score_text.setString("0");
        this.handCards.setLocalZOrder(1000);
        //this.ccc.addTouchEventListener(function (sender, type) {
        //
        //    if (ccui.Widget.TOUCH_BEGAN == type) {
        //
        //        this.ipLayout.setVisible(true);
        //        var Yarr = [130, 100, 100, 100, 100];
        //
        //        var Xarr = [240, -140, -140, 230, 230];
        //
        //        this.ipLayout.setPosition(Xarr[this.index], Yarr[this.index]);
        //
        //    } else if (ccui.Widget.TOUCH_ENDED == type) {
        //        this.ipLayout.setVisible(false);
        //    } else if (ccui.Widget.TOUCH_CANCELED == type) {
        //        this.ipLayout.setVisible(false);
        //    }
        //
        //
        //}, this);
    },

});
jxnn_playerHead.curPlayCard = [];
jxnn_playerHead.Play_mod_niuniu = null;
gameclass.jxnntable = gameclass.baseui.extend({
    sprite: null,
    node:null,
    //mod_niuniu:null,
    ongameview_attr:null,
    curround:null,
    ready:null,
    clock:null,
    clocktime:null,
    invitebtn:null,
    gamebets:null,
    betsImgArr:null,
    playerHeads:null,
    //curHandCard:[],
    calLayer:null,
    calTextArr:[],
    calArr:[0,0,0],
    calIndex:0,
    isCardTouch:false,
    userBetsCount:null,
    mingpai:null,
    dealUid:0,
    callScoreStage:0,
    numObj:[],
    //onchat:null,
    ctor: function () {
        cc.log("niuniu ctor");
        this._super();
        this.playerHeads = [];
        this.userBetsCount = [];
    },
    show:function(){
        cc.log("niuniu show");
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
        cc.log("niuniu setmod");
        this.mod_niuniu = _mod_niuniiu;
        jxnn_playerHead.Play_mod_niuniu = _mod_niuniiu;
        var _this = this;
        this.mod_niuniu.bindUI(_this);

        if(window.wx) {
            _this.share();
        }
        _this.micLayerState();
        _this.timeState();
        ccui.helper.seekWidgetByName(_this.node, "roomnum").setString("房间号:"+_this.mod_niuniu.roominfo.roomid.toString());
        _this.curround =  ccui.helper.seekWidgetByName(_this.node, "curround");
        if (_this.mod_niuniu.roominfo.time != 0){
            _this.game.uimgr.showui("gameclass.exitroom",false);
            _this.game.uimgr.uis["gameclass.exitroom"].setData(_this.mod_niuniu,_this.mod_niuniu.roominfo);
        }
         if(parseInt(_this.mod_niuniu.roominfo.param1 / 10) == 2){
             cc.each(_this.gamebets.getChildren(),function(o,i){
                 if(i > 2){
                     /*o.setEnabled(false);
                     o.setBright(false);*/
                     o.setVisible(false);
                 }else{
                     o.setPositionX(o.getPositionX()+ o.getContentSize().width);
                 }
             });
         }
    },

});

gameclass.jxnntable.prototype.onGameReady = function (data) {
    for (var i = 0;i < 5;i++){
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && data == playerdata.uid){
            this.playerHeads[i].ok_img.setVisible(true);
        }
    }

};

gameclass.jxnntable.prototype.resetIcon = function(uid) {
    for (var i = 0; i < 5;i++){
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if(playerdata == null) {
            continue;
        }
        if(playerdata.uid != uid) {
            continue;
        }
        gameclass.mod_base.showtximg(this.playerHeads[i].head_img, playerdata.imgurl, 0, 0,"im_headbg5", playerdata.ip == "")
        break;
    }
};
gameclass.jxnntable.prototype.onGameNiuniuInfo = function(data){
    var readyArr=[];
    for(var i=0;i<data.info.length;i++){
        readyArr[i]={uid:data.info[i].uid,ready:data.info[i].ready};
    }
    this.initReadyUser(readyArr);//是否已准备
    this.refreshStep();
    this.updataUserScore(data.info);
    if(data.time)
    this.createProgressBar(-1,true,"ProgressBar",data.time);
    if(this.mod_niuniu.roominfo.step > 0){
        this.invitebtn.setVisible(false);
    }
    if(data.begin){
        this.ready.setVisible(false);
        var reConnect = true;//断线重连
        this.onGameNiuNiuBegin(data,reConnect);

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
gameclass.jxnntable.prototype.initReadyUser = function(dataReady){
    for(var i = 0;i<dataReady.length;i++){
        for (var j = 0;j < 5;j++) {
            var playerdata = this.mod_niuniu.getplayerdata(j);
            if(playerdata){
                if(playerdata.uid == dataReady[i].uid){
                    this.playerHeads[j].ok_img.setVisible(true);
                }
            }
        }
    }
};

gameclass.jxnntable.prototype.updataRoomUserInfo = function(){
    for (var i = 0;i < 5;i++){
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata){
            this.playerHeads[i].node.setVisible(true);
            this.playerHeads[i].name_text.setString(playerdata.name);
            this.playerHeads[i].id_text.setString("ID:" + playerdata.uid.toString());
            this.playerHeads[i].off_line.setVisible(!playerdata.line);
            //this.playerHeads[i].score_text.setString(""+playerdata.total);

            this.playerHeads[i].uid_Text.setString("ID:" + playerdata.uid.toString());
            this.playerHeads[i].uip_Text.setString("IP:" + playerdata.ip.toString());
            this.playerHeads[i].address_Text.setString("地址:" + playerdata.address.toString());
            this.playerHeads[i].head_url = playerdata.imgurl || "";

            gameclass.mod_base.showtximg(this.playerHeads[i].head_img, playerdata.imgurl, 0, 0,"im_headbg5", playerdata.ip == "");
        }else{
            this.playerHeads[i].node.setVisible(false);
        }
    }
};

gameclass.jxnntable.prototype.showCurDealer = function(dataInfo){
    var dealerUid = 0;
    for (var i = 0;i < dataInfo.length;i++){
        if(dataInfo[i].dealer){
            dealerUid = dataInfo[i].uid;
            break;
        }
    }
    for (var i = 0;i < 5;i++){
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
gameclass.jxnntable.prototype.initcallScoreStage = function(dataInfo){
    var numArr = [];
    if(parseInt(this.mod_niuniu.roominfo.param1 / 10) == 2){
        for(var i = 0;i<dataInfo.length;i++){
            if(dataInfo[i].dealer){
                continue;
            }
            numArr.push(dataInfo[i].num);
            this.numObj.push({
                uid:dataInfo[i].uid,
                num:dataInfo[i].num
            });
        }
    }
    this.callScoreStage = Math.min.apply(Math, numArr);
    cc.log("initcallScoreStage="+this.callScoreStage);
    cc.log(this.numObj);
};
gameclass.jxnntable.prototype.onGameNiuNiuBegin = function(data,reConnect){
    this.unscheduleAllCallbacks();
    this.dealAnimationLayer.removeAllChildren(true);
    var _this = this;
    cc.log(data);
    this.resetNiuNiuNext();//清空上局牌
    this.updataUserScore(data.info);//更新分数
    this.refreshStep();//更新当前局数
    this.showCurDealer(data.info);//显示庄家
    this.invitebtn.setVisible(false);
    if(reConnect){//true为断线重连
        _this.initcallScoreStage(data.info);
        _this.showHandCard(data.info,data.deal);
    }else{
        _this.runShowCardAction(function(){

            _this.runMoveCardAction(function(){
                var posArr = [];
                cc.each(_this.playerHeads , function( o ,i){
                    if(o && o.node.isVisible()){
                        posArr.push(o.handCards.getPosition());
                    }
                });
                cc.log("end move action");
                _this.runSendCardAction(posArr , function(){
                    cc.log("end bacll runSendCardAction");
                    _this.dealAnimationLayer.removeAllChildren();
                    _this.showHandCard(data.info);

                });

            });

        });
    }
};

gameclass.jxnntable.prototype.runShowCardAction = function(_callback){

    var cardBack = new cc.Sprite(res.pokerBei);
    cardBack.setPosition(cc.winSize.width / 2 ,cc.winSize.height / 2);
    cardBack.setScale(0.0);
    this.dealAnimationLayer.addChild(cardBack);
    cardBack.runAction(new cc.Sequence( new cc.ScaleTo(0.8, 0.8, 0.8) , new cc.CallFunc(function(targe , backfun){
        targe.removeFromParent();
        if(backfun){
            backfun();
        }
    },this ,_callback ) ) );

};

gameclass.jxnntable.prototype.runMoveCardAction = function(_callback){
    this.dealAnimationLayer.removeAllChildren();

    //allCardLayout.setPosition(cc.winSize.width / 2 - cardlength + 39,cc.winSize.height / 2);

    var cardCount = 45;
    var offset = cardCount * 2.5;
    for(var i = 0;i< cardCount;i++){
        var cardBack = new cc.Sprite(res.pokerBei);
        cardBack.setPosition(cc.winSize.width / 2 - offset ,cc.winSize.height / 2);
        cardBack.setScale(0.8);
        cardBack.runAction(new cc.MoveBy(0.6, 5 * i , 0 ) );
        this.dealAnimationLayer.addChild(cardBack);
    }
    this.scheduleOnce(function(){
        if(_callback){
            _callback();
        }
    }, 0.7);
};


gameclass.jxnntable.prototype.runSendCardAction = function(endPosArr , _callback){
    cc.log("start runSendCardAction");
    var _this = this;
    var spArr =  this.dealAnimationLayer.getChildren();

    var count = endPosArr.length;
    var totla = count * 5;
    var spcount =  spArr.length ;
    var index = spcount -1  ;
    var offset = 0;
    var userIndex = 0;


    var scCall = function(){

        if(index < 0  ){
            _this.unschedule(scCall);
            if(_callback){
                _callback();
            }
            return;
        }
        if(userIndex >=  endPosArr.length){
            userIndex = 0;
            offset++;
        }
        if( spcount - index   > totla  ){
            _this.unschedule(scCall);
            if(_callback){
                _callback();
            }
            return;
        }

        var sp = spArr[index];
        if(sp){
            sp.runAction(cc.moveTo(0.1,  endPosArr[userIndex].x + offset * 10 - 65  , endPosArr[userIndex].y ));
            sp.setLocalZOrder(userIndex);
        }
        index --;
        userIndex++;
        mod_sound.playeffect(g_music["game_fapai"],false);

    };



    this.schedule( scCall , 0.1 , cc.REPEAT_FOREVER , 0 );
    cc.log("end  runSendCardAction");
};

gameclass.jxnntable.prototype.showHandCard = function(dataInfo){
    var _this = this;
    cc.log(dataInfo);

    for (var i = 0;i < 5;i++) {
        var playerdata = _this.mod_niuniu.getplayerdata(i);
        if (playerdata) {
            _this.playerHeads[i].handCards.removeAllChildren(true);
            var offset = i == 0 ? 55 : 25;
            var moveOffset = i == 0 ? 30 : 15;
            for (var j = 0; j < dataInfo.length; j++) {
                if (playerdata.uid == dataInfo[j].uid) {
                    for (var k = 0; k < 5; k++) {
                        var spr = null;
                        if (i == 0) {
                            jxnn_playerHead.curPlayCard[k] = dataInfo[j].card[k];
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
    this.scheduleOnce(function(){
        for(var i = 0;i<dataInfo.length;i++) {
            if (dataInfo[i].dealer) {
                _this.dealUid = dataInfo[i].uid;
            }
        }
        _this.isUserTouch(_this.dealUid);//如果确定了庄  庄家可以操作牌
        if(_this.mod_niuniu.roominfo.param1 % 10 == 0) {//抢庄模式  需要先抢庄 后叫分
            cc.log("抢庄模式");
            var isShow = _this.dealUid == 0 ? true:false;//断线重连  dealUid等于0 还没确定庄家
            _this.isShowQiangZhuang(isShow);
            if(!isShow){ //以确定庄家 进行叫分阶段
                _this.showCallScore(_this.dealUid, dataInfo,callbackMingPai);
            }else{
                this.createProgressBar(-1,true,"ProgressBar",8);
                _this.reconnGameDeal(dataInfo);//抢庄阶段掉线,玩家是否已操作过强或不抢
            }
        }else{//直接叫分阶段
            cc.log("显示叫分阶段--是否以叫完分,可以亮牌阶段");
            if(_this.mod_niuniu.roominfo.param1 % 10 == 1&&parseInt(_this.mod_niuniu.roominfo.param1/10)%10==3){
                _this.showCallScore(-1, dataInfo,callbackMingPai);
            }else if((_this.mod_niuniu.roominfo.param1 % 10 == 2||_this.mod_niuniu.roominfo.param1 % 10 == 3&&parseInt(_this.mod_niuniu.roominfo.param1/10)%10==3)){
                var isShow=true;
                for(var i=0;i<this.mod_niuniu.gameniuniuinfo.info.length;i++) {
                    if(this.mod_niuniu.gameniuniuinfo.info[i].robdeal>0){
                        isShow=false;
                        break;
                    }
                }
                _this.isShowQiangZhuang(isShow,_this.dealUid);
                if(!isShow){ //以确定庄家 进行叫分阶段
                    _this.showCallScore(_this.dealUid, dataInfo,callbackMingPai);
                }else{
                    for (var i = 0;i < 5;i++) {
                        var playerdata = this.mod_niuniu.getplayerdata(i);
                        if (playerdata && playerdata.uid == _this.dealUid) {
                            this.playerHeads[i].createProgress(true,"ProgressBar",8);
                        }
                    }
                    _this.reconnGameDeal(dataInfo);//抢庄阶段掉线,玩家是否已操作过强或不抢
                }
            }else if(_this.mod_niuniu.roominfo.param1 % 10 == 1||_this.mod_niuniu.roominfo.param1 % 10 == 2||_this.mod_niuniu.roominfo.param1 % 10 == 3){

            }else{
                _this.showCallScore(_this.dealUid, dataInfo,callbackMingPai);
            }
        }

    }, 0.6);

    var callbackMingPai = function(){//断线重连  叫分阶段---如果叫分阶段结束进入是否已亮牌阶段
        cc.log("当前是否可亮牌?"+_this.userBetsCount);
        cc.log(dataInfo);
        if(_this.userBetsCount.length >= dataInfo.length -1){
            for(var i = 0;i<dataInfo.length;i++){
                _this.onGameShowUserCard(dataInfo[i]);
            }
        }
    }
};

gameclass.jxnntable.prototype.isUserTouch = function(uid){
    if(uid == this.mod_niuniu.uid){//叫分后 或者是庄家 可以算牌操作
        this.isCardTouch = true;
    }
};
gameclass.jxnntable.prototype.onGameSendOtherCard = function(otherCardArr){
    for(var i=0;i<otherCardArr.length;i++){
        var _index=(5-otherCardArr.length+i);
        jxnn_playerHead.curPlayCard[_index] = otherCardArr[i];
        var sprArr = this.playerHeads[0].handCards.getChildren();
        var sp=sprArr[_index];
        this.openPokerAction(sp,this.getCardUrlByNum(otherCardArr[i]));
        if(sp){
            sp.addTouchEventListener(this.curUserCardTouchEvent ,this);
        }
    }
};
gameclass.jxnntable.prototype.openPokerAction=function(card,texture){
    if(!card)return;
    var scaleXIndex=1;
    var offset=0.1;
    var _pos=card.getPosition();
    card.setScale(1,1);
    card.setScale(scaleXIndex,1);
    var callBack=function(dt){
        scaleXIndex-=offset;
        card.setScale(scaleXIndex,1);
        if(Math.abs(scaleXIndex-0)<offset){
            offset=-offset;
            card.loadTextures(texture,texture,texture,ccui.Widget.PLIST_TEXTURE);
        }
        if(scaleXIndex>1){
            card.setScale(1,1);
            card.setPosition(_pos);
            card.unschedule(callBack);
        }
    }
    card.schedule(callBack,0.016);
};
gameclass.jxnntable.prototype.onGameSnedAllCard = function(allCard){
    this.playerHeads[0].handCards.removeAllChildren();
    for(var i = 0;i<allCard.length;i++){
        jxnn_playerHead.curPlayCard[i] = allCard[i];
    }

    for(var i = 0;i<jxnn_playerHead.curPlayCard.length;i++) {
        var spr = this.crateBtnCard(jxnn_playerHead.curPlayCard[i]);
        spr.addTouchEventListener(this.curUserCardTouchEvent ,this);
        spr.setPosition(-5 * 30 + (i * 55) + 30, 0);
        spr.runAction(cc.moveBy(0.5, -5 * 15 + (i * 30) + 15, 0));
        this.playerHeads[0].handCards.addChild(spr);

    }

};
gameclass.jxnntable.prototype.getCardUrlByNum=function(card){
    var abcd = ["a","d","b","c"];
    var point = Math.floor(card/10);
    var type = card%10;
    var cardUrl="";
    if (!card||card<0){
        cardUrl=res.pokerBei;
    }else{
        if(card==1000){
            cardUrl="card_joker_gray.png";
        }else if(card==2000){
            cardUrl="card_joker.png";
        }else{
            cardUrl = "card_" + point +  abcd[type - 1]+ ".png";
        }
    }
    return cardUrl;
};
gameclass.jxnntable.prototype.reshowCallScore  = function() {
    cc.log("第2次叫分");
    var _this = this;
    this.userBetsCount.length = 0;
    var node = new cc.Sprite(res.showcallScore02);
    node.setPosition(this.node.getContentSize().width / 2, this.node.getContentSize().height / 2 + 150);
    node.setScale(0.3);
    this.node.addChild(node);
    node.runAction(cc.sequence(cc.scaleTo(1, 1.5), new cc.CallFunc(function (tager) {
        tager.removeFromParent();
        _this.createProgressBar(_this.dealUid, false, "ProgressBar");//创建叫分进度框
        if (_this.dealUid != _this.mod_niuniu.uid) {//除庄家外显示叫分
            if(!_this.mod_niuniu.getplayerdata(0).bets)
                _this.isGameBetShow(true);
        }
    })));
};
gameclass.jxnntable.prototype.canClick  = function(){
    // this.calLayer.setScale(0.5);
    // this.calLayer.setVisible(true);
    // this.calLayer.runAction(cc.scaleTo(0.5,1.2,1.2).easing(cc.easeElasticOut()));
    // this.btn_tishi.setVisible(true);
    // this.mingpai.setVisible(true);
    // this.mingpai.setEnabled(false);
    // this.mingpai.setBright(false);
    // this.isMingPai(this.calArr);
    // this.createProgressBar(-1,true,"ProgressBar");//创建亮牌阶段 进度条 所有玩家都需要创建一次 UID不需要匹配
};

gameclass.jxnntable.prototype.onGameBets = function(data,personCount){
    cc.log(data);
    for (var i = 0;i < 5;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && playerdata.uid == data.uid) {
            if(data.bets > 0 && data.bets < 7){
                mod_sound.playeffect(g_music["Man_jiabei"],false);
                this.playerHeads[i].call_scoreImg.setVisible(true);
                this.playerHeads[i].call_scoreImg.setTexture(this.betsImgArr[data.bets - 1]);
                this.playerHeads[i].call_scoreImg.setScale(0);
                this.playerHeads[i].call_scoreImg.runAction(cc.scaleTo(0.8,1,1).easing(cc.easeElasticOut()));
                if(this.userBetsCount.indexOf(data.uid) < 0){
                    this.userBetsCount.push(data.uid);
                }
                this.playerHeads[i].destroyProgress("ProgressBar");//销毁进度条
            }

        }
    }
    cc.log("当前叫分玩家数量："+this.userBetsCount);
    this.isUserTouch(data.uid);
    if(this.userBetsCount.length >= personCount -1){
        cc.log("onGameBets callScoreStage00="+this.callScoreStage);
        if(parseInt(this.mod_niuniu.roominfo.param1 / 10) == 2){//扣2张模式
            if(this.callScoreStage == 1 || this.callScoreStage == 0){
                this.callScoreStage = 2;
                cc.log(this.numObj);
                if(this.numObj.length > 0){
                    for(var i = 0;i<this.numObj.length;i++){
                        for(var j = 0;j<this.userBetsCount.length;j++){
                            if((this.numObj[i].uid == this.userBetsCount[j] && this.numObj[i].uid == this.mod_niuniu.uid) || this.dealUid == this.mod_niuniu.uid){
                                if(this.numObj[i].num == 1 || this.numObj[i].num == 0){
                                    cc.log("Xxxxxxxxxxx");
                                    this.reshowCallScore();
                                }
                            }
                        }
                    }
                }else{
                    this.reshowCallScore();
                }

            }else if(this.callScoreStage == 2){
                this.canClick();//可以亮牌阶段
            }
         }else{
            this.canClick();//可以亮牌阶段
        }

    }
    cc.log("onGameBets callScoreStage11="+this.callScoreStage);
};

//dealUid:不等于dealUid创建进度条   isMingPai:true为亮牌 false为叫分阶段进度条  strName:进度条name
gameclass.jxnntable.prototype.createProgressBar = function(dealUid,isMingPai,strName,time) {
    for (var i = 0;i < 5;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && playerdata.uid != dealUid) {
            if(i==0){
                this.playerHeads[i].createProgress(isMingPai,strName,time);
            }
        }
    }
};

gameclass.jxnntable.prototype.showCallScore = function(dealUid,dataInfo,func) {
    cc.log(dataInfo);
    var _this = this;

    _this.createProgressBar(dealUid,false,"ProgressBar");//创建叫分进度框
    var betsCount = 0;//玩家叫分数量
    for(var i = 0;i<dataInfo.length;i++){
        if(dataInfo[i].bets <= 0){
            if(dealUid != dataInfo[i].uid){
                if(dataInfo[i].uid == this.mod_niuniu.uid){
                    if(!dataInfo[i].bets){
                        _this.isGameBetShow(true);
                    }
                }
            }
            betsCount++;
        }else{
            this.onGameBets({uid: dataInfo[i].uid, bets: dataInfo[i].bets}, dataInfo.length);
        }
    }
    cc.log("betsCount="+betsCount);
    if(betsCount > 1){//大于1家没有叫分 则不会出现亮牌情况
        func = null;
    }
    if(func && this.userBetsCount.length >= dataInfo.length -1){
        cc.log("叫完分,回调亮牌");
        func();
    }

};
gameclass.jxnntable.prototype.curUserCardTouchEvent = function(sender, type) {
    var _this = this;
    if(!this.isCardTouch){
        return;
    }
    switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log("TOUCH_ENDED");
            sender.isUp = !sender.isUp;
            if(sender.isUp && _this.calIndex > 2){
                sender.isUp = false;
                return;
            }
            _this.setCalText(sender.isUp,sender.getTag());
            sender.setPositionY(sender.isUp ?20:0);
            break;
        default:
            break;
    }

};
gameclass.jxnntable.prototype.findCalArr = function(arr,numble) {
    for(var i = 0;i<arr.length;i++){
        if(arr[i] == numble) {
            arr[i] = 0;
            break;
        }
    }
    /*arr.sort(function(a,b) {
        return b - a;
    });*/
    for(var i = 0;i<arr.length-1;i++){
        if(arr[i] == 0){
            var temp = arr[i];
            arr[i] = arr[i+1];
            arr[i+1] = temp;
        }
    }
    for(var i = 0;i<arr.length;i++){
        var arrNum = parseInt(arr[i]/10);
        if(arrNum >= 10){
            arrNum = 10;
        }
        this.calTextArr[i].setString(""+arrNum);
    }
};
gameclass.jxnntable.prototype.setCalArrSum = function(arr) {
    var sum = 0;
    for(var i = 0;i<arr.length;i++){
        if(parseInt(arr[i]/10) > 10){
            sum += 10;
            continue;
        }
        sum += parseInt(arr[i]/10);
    }
    this.calTextArr[3].setString(""+sum);
};
gameclass.jxnntable.prototype.isMingPai = function(arr) {
    var hasMingPai = true;
    for(var i = 0;i<arr.length;i++){
        if(arr[i] == 0 ){
            hasMingPai =  false;
            break;
        }
    }
    var sum = 0;
    for(var i = 0;i<arr.length;i++){
        var count = parseInt(arr[i] / 10);
        if(count > 10){
            count = 10;
        }
        sum += count;
    }
    if(hasMingPai) {
        var texture = (sum != 0 && sum % 10 == 0) ? res.btn_youniu : res.btn_meiniu;
        this.mingpai.loadTextureNormal(texture);
    }
    this.mingpai.setEnabled(hasMingPai);
    this.mingpai.setBright(hasMingPai);
};
gameclass.jxnntable.prototype.updataCalText = function(index,numble) {
    //cc.log(index+"-----"+numble);
    if(index < 0 || index  > 3){
        cc.log("cal Text Arr index err");
        return;
    }
    var num = parseInt(numble /10);
    if(num > 10){
        num = 10;
    }
    this.calTextArr[index].setString(""+num);
};

gameclass.jxnntable.prototype.setCalText = function(isUp,numble) {
    if(isUp){
        this.updataCalText(this.calIndex,numble);
        this.calArr[this.calIndex] = numble;
        this.calIndex++;
    }else{
        this.findCalArr(this.calArr,numble);
        this.calIndex--;
    }
    this.isMingPai(this.calArr);

    this.setCalArrSum(this.calArr);

};
gameclass.jxnntable.prototype.onGameShowUserCard = function(info){
    var view=info.view;
    var uid=info.uid;
    var cardArr=info.card.slice();
    var cardType=info.ct;
    var laiZiIndex=0;
    if(!view){
        return;
    }
    if(!cardType) cardType=0;
    if(cardType==200)cardType=300;
    else if(cardType==300) cardType=200;
    if(uid == this.mod_niuniu.uid){
        this.calLayer.setVisible(false);
        this.btn_tishi.setVisible(false);
        this.mingpai.setVisible(false);
    }
    var _NiuArr=[];
    //赖子值
    for(var i=0;i<cardArr.length;i++){
        if(cardArr[i]==1000){
            if(laiZiIndex<1)
             laiZiIndex=1;
        }else if(cardArr[i]==2000){
            laiZiIndex=2;
        }
    }
    if(cardType>90&&cardType<100){
        for(var i=0;i<cardArr.length;i++){
            for(var j=i+1;j<cardArr.length;j++){
                for(var k=j+1;k<cardArr.length;k++){
                    var Num1=parseInt(cardArr[i]/10)>10?10:parseInt(cardArr[i]/10);
                    var Num2=parseInt(cardArr[j]/10)>10?10:parseInt(cardArr[j]/10);
                    var Num3=parseInt(cardArr[k]/10)>10?10:parseInt(cardArr[k]/10);
                    if((Num1+Num2+Num3)%10==0){
                        _NiuArr=[cardArr[i],cardArr[j],cardArr[k]];
                        break;
                    }
                }
            }
        }
        for(var i=0;i<cardArr.length;i++){
            if(_NiuArr.indexOf(cardArr[i])>-1){
                cardArr.splice(i,1);
                i--;
            }
        }
        cardArr=_NiuArr.concat(cardArr);
    }
    var cardLength = 5;
    for (var i = 0;i < 5;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if(playerdata && playerdata.uid == uid){
            this.playerHeads[i].handCards.removeAllChildren();
            this.playerHeads[i].destroyProgress("ProgressBar");
            var offset = i==0? 55:25;
            // if(i>0&&i<3){
            //     offset
            // }
            var moveOffset=null;
            var cardArrSp=this.playerHeads[i].handCards.getChildren();
            for (var j = 0; j < 5; j++) {
                var cardNum=cardArr[j];
                if(!cardNum)cardNum=-1;
                if(cardArrSp[j]){
                    var spr = cardArrSp[j];
                    var btnUrl = this.getCardUrlByNum(cardNum);
                    spr.loadTextures(btnUrl,btnUrl,btnUrl,ccui.Widget.PLIST_TEXTURE);
                }else{
                    var spr = this.crateBtnCard(cardNum);
                    spr.setPosition(-cardLength * offset / 2 + (j * offset) + offset / 2, 0);
                    var moveX=-cardLength * moveOffset / 2 + (j * moveOffset) + moveOffset / 2;
                    if(cardType>90&&cardType<100&&j>=3){
                        var moveDel=i==0?40:30;
                        moveX+=moveDel;
                    }
                    var move1 = cc.moveBy(0.4,moveX , 0);
                    var isMove2 = false;
                    var move2 = cc.moveBy(0.2, 0, 20);
                    for(var k = 0;k<view.length;k++){
                        if(spr.getTag() == view[k]){
                            isMove2 = true;
                            break;
                        }
                    }
                    if(isMove2){
                        spr.runAction(cc.sequence(move1,move2));
                    }else{
                        spr.runAction(move1);
                    }

                    this.playerHeads[i].handCards.addChild(spr,210);
                }
            }
            mod_sound.playeffect(g_music["niu_" + cardType + "_w"],false);
            var sprNiuNiu = cc.Sprite.create();
            sprNiuNiu.initWithSpriteFrameName("nn331_img_niu" +cardType+ ".png");
            sprNiuNiu.setScale(0.8);
            sprNiuNiu.setPosition(cc.p(-150,-20));
            this.playerHeads[i].handCards.addChild(sprNiuNiu,220);
            var laiSp=null;
            if(laiZiIndex==1){
                laiSp=new cc.Sprite(res.xiaoLaiSp);
            }else if(laiZiIndex==2){
                laiSp=new cc.Sprite(res.daLaiSp);
            }
            if(laiSp){
                if(i==0){
                    laiSp.setPosition(-120,120);
                }else{
                    laiSp.setPosition(-70,120);
                }
                sprNiuNiu.addChild(laiSp);
                laiSp.setVisible(false);
            }
            sprNiuNiu.runAction(cc.sequence(cc.moveBy(0.4, 140, 0),cc.callFunc(function (){
                    if(laiSp)
                    laiSp.setVisible(true);
            }
            )));

            break;
        }
    }

};
gameclass.jxnntable.prototype.reconnGameDeal = function (dataInfo) {
    cc.log(dataInfo);
    if(dataInfo.length <= 0){
        return;
    }
    for (var i = 0;i < 5;i++) {
        for (var j = 0;j < dataInfo.length;j++) {
            var playerdata = this.mod_niuniu.getplayerdata(i);
            if (playerdata && playerdata.uid == dataInfo[j].uid&&dataInfo[j].robdeal>=0) {
                this.playerHeads[i].rob_zhuang_img.setVisible(true);
                this.playerHeads[i].rob_zhuang_img.setTexture(res["img_qiangZhuang"+dataInfo[j].robdeal]);
                if(dataInfo[j].uid == this.mod_niuniu.uid){
                    this.isShowQiangZhuang(false);
                }
            }
        }
    }


};
gameclass.jxnntable.prototype.randomZhuangBlink = function (obj) {
    var blinkIndex=0;
    var _this=this;
    var lastBlinkNum=-1;
    var binkCallBack=function () {
        var _isZhuang=false;
        for(var i=lastBlinkNum+1;i<i+5;i++){
            if(i>=5)i-=5;
            if(_this.mod_niuniu.getplayerdata(i)){
                _this.playerHeads[i].zhuang_img.setVisible(true);
                lastBlinkNum=i;
                for(var j=0;j<5;j++){
                    if(j!=i){
                        _this.playerHeads[j].zhuang_img.setVisible(false);
                    }
                }
                if(_this.mod_niuniu.getplayerdata(i).uid==obj.uid){
                    _isZhuang=true;
                }
                blinkIndex++;
                break;
            }
        }
        if(blinkIndex>_this.mod_niuniu.gameniuniuinfo.info.length*2&&_isZhuang){
            _this.onGameDealer(obj);
            _this.unschedule(binkCallBack);
        }
    }
    this.schedule(binkCallBack,0.15);
},
//抢庄
gameclass.jxnntable.prototype.onGameDeal = function (data) {
    for (var i = 0;i < 5;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && playerdata.uid == data.uid) {
            this.playerHeads[i].rob_zhuang_img.setVisible(true);
            this.playerHeads[i].rob_zhuang_img.setTexture(res["img_qiangZhuang"+data.score]);
        }
    }

};
//确定庄家
gameclass.jxnntable.prototype.onGameDealer = function (data) {
    this.dealUid = data.uid;
    for (var i = 0;i < 5;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata) {
            if(playerdata.uid == this.dealUid){
                this.playerHeads[i].zhuang_img.setVisible(true);//显示庄家标记
                if(playerdata.robdeal>0){
                    this.playerHeads[i].rob_zhuang_img.setVisible(true);
                    this.playerHeads[i].rob_zhuang_img.setTexture(res["img_qiangZhuang"+playerdata.robdeal]);
                }
            }else{
                this.playerHeads[i].rob_zhuang_img.setVisible(false);//隐藏抢庄
            }
        }
    }
    this.isUserTouch(this.dealUid);//庄家可以进行牌的操作
    this.createProgressBar(this.dealUid,false,"ProgressBar");//创建叫分进度框
    if(this.dealUid != this.mod_niuniu.uid){//除庄家外显示叫分
        if(this.game.modmgr.mod_login.logindata.card>=1){
            this.gamebets.getChildByName("gamebets5").setEnabled(true);
            this.gamebets.getChildByName("gamebets5").setBright(true);
        }else{;
            this.gamebets.getChildByName("gamebets5").setEnabled(false);
            this.gamebets.getChildByName("gamebets5").setBright(false);
        }
        if(!this.mod_niuniu.getplayerdata(0).bets) {
            this.isGameBetShow(true);
        }
    }
};
gameclass.jxnntable.prototype.crateBtnCard = function(card) {
    var abcd = ["a","d","b","c"];
    var point = Math.floor(card/10);
    var type = card%10;
    var sprButton = null;
    if (!card||card<0){
        sprButton = new ccui.Button(res.pokerBei,res.pokerBei,res.pokerBei);
        sprButton.setTouchEnabled(false);
    }else{
        var pngPath ="";
        if(card==1000){
            pngPath="card_joker_gray.png";
        }else if(card==2000){
            pngPath="card_joker.png";
        }else{
            pngPath = "card_" + point +  abcd[type - 1]+ ".png";
        }
        sprButton = new ccui.Button(pngPath,pngPath,pngPath,ccui.Widget.PLIST_TEXTURE);
        sprButton.setTouchEnabled(true);
    }
    //sprButton.setTag(card);
    sprButton.setAnchorPoint(0.5,0.5);
    //sprButton.loadTextureNormal("card_" + point +  abcd[type - 1]+ ".png",ccui.Widget.PLIST_TEXTURE);
    return sprButton;
};
gameclass.jxnntable.prototype.refreshStep = function() {
    var curstep = this.mod_niuniu.roominfo.step;
    if (curstep > this.mod_niuniu.roominfo.maxstep){
        curstep = this.mod_niuniu.roominfo.maxstep;
    } else if(curstep == 0) {
        curstep = 1;
    }
    this.curround.setString("局数:" + curstep + "/" + this.mod_niuniu.roominfo.maxstep);
}
gameclass.jxnntable.prototype.runJuShuAction = function() {
    this.juShuLabel.setString("第" + this.mod_niuniu.roominfo.step + "局");
    this.juShuLabel.setPosition(cc.winSize.width / 4, this.juShuLabel.getPosition().y);
    this.juShuLabel.stopAllActions();
    this.juShuLabel.runAction(cc.sequence(
        cc.spawn(cc.fadeIn(0.5), cc.moveBy(0.5, cc.p(cc.winSize.width / 4, 0))),
        cc.sequence(cc.scaleTo(0.2, 0.8, 1.2), cc.scaleTo(0.2, 1.1, 0.9), cc.scaleTo(0.1, 1, 1)),
        cc.spawn(cc.fadeOut(0.5), cc.moveBy(0.5, cc.p(cc.winSize.width / 4, 0)))
    ))
}
gameclass.jxnntable.prototype.resetNiuNiuNext = function(){
    cc.log("next");

    jxnn_playerHead.curPlayCard.length = 0;
    this.calArr = [0,0,0];
    this.calIndex = 0;
    this.userBetsCount.length = 0;
    this.dealUid = 0;
    this.callScoreStage = 0;
    this.numObj.length = 0;
    for(var i = 0;i<this.calTextArr.length;i++){
        this.updataCalText(i,""+0);
    }
    for(var i = 0;i < 5;i++){
        this.playerHeads[i].handCards.removeAllChildren();
        this.playerHeads[i].call_scoreImg.setVisible(false);
        this.playerHeads[i].ok_img.setVisible(false);
        this.playerHeads[i].destroyProgress("ProgressBar");
    }
    this.isCardTouch = false;
};

gameclass.jxnntable.prototype.updataUserScore = function(info){
    for (var i = 0;i < 5;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata) {
            for(var j = 0;j<info.length;j++){
                if(playerdata.uid == info[j].uid){
                    this.playerHeads[i].score_text.setString(""+info[j].total);
                }
            }
        }
    }
};
gameclass.jxnntable.prototype.goldFiy = function(data){
    var Xarr = [200, 1070, 1070, 60, 60];
    var Yarr = [30, 160, 380, 380, 160];
    for(var j = 0;j<data.length;j++){
        for (var i = 0;i < 5;i++) {
            var playerdata = this.mod_niuniu.getplayerdata(i);
            if (playerdata && playerdata.uid == data[j].uid) {
                var c = data[j].score > 0?"+":"";
                var cor = data[j].score > -1 ? cc.color(82,210,17) : cc.color(245,74,74);
                var text = new cc.LabelTTF(c+""+data[j].score, "Arial", 32);
                text.setScale(0.3);
                text.setPosition(Xarr[i],Yarr[i]);
                text.setColor(cor);
                this.GameUIlayer.addChild(text);
                var spawn =  new cc.Spawn(cc.moveBy(2, cc.p(0,70)),cc.scaleTo(2, 2));
                text.runAction(new cc.Sequence( spawn , new cc.CallFunc(function(tager){
                    tager.removeFromParent();
                }) ) );
            }
        }
    }

};
gameclass.jxnntable.prototype.onGameNiuNiuEnd = function(data){
    var _this = this;
    //_this.maxTime = 3;
    this.endcoverLayer.setVisible(true);
    _this.goldFiy(data.info);
    _this.isGameBetShow(false);
    _this.isShowQiangZhuang(false);
    _this.updataUserScore(data.info);
    for(var i = 0;i < 5;i++) {
        this.playerHeads[i].rob_zhuang_img.setVisible(false);
    }
    this.scheduleOnce(function(){
        this.endcoverLayer.setVisible(false);
        jxnn_playerHead.curPlayCard.length = 0;
        //_this.game.uimgr.showui("gameclass.resultoneui").setniuniumod(_this.mod_niuniu,_this);
        _this.mod_niuniu.gameready();
    },6);


};
gameclass.jxnntable.prototype.onGameNiuNiuBye = function(data){
    var _this = this;
    this.endcoverLayer.setVisible(false);
    _this.game.uimgr.showui("gameclass.resultui");
    _this.game.uimgr.uis["gameclass.resultui"].setData(_this.mod_niuniu);
    //_this.maxTime = 3;
    //this.scheduleOnce(function(){
    //
    //},4);
};
gameclass.jxnntable.prototype.NiuNiuInit = function(){
    var _this = this;
    _this.node = this.game.uimgr.createnode(res.jxnntable,true);
    _this.node.setPosition((cc.winSize.width - this.node.getContentSize().width)/2,0);
    _this.addChild(_this.node);

    _this.Uilayer = ccui.helper.seekWidgetByName(_this.node, "UI");
    _this.Gamelayer = ccui.helper.seekWidgetByName(_this.node, "Game");
    _this.GameUIlayer = ccui.helper.seekWidgetByName(_this.node, "GameUI");

    _this.endcoverLayer = ccui.helper.seekWidgetByName(_this.Gamelayer , "endcover");
    _this.endcoverLayer.setVisible(false);
    cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
    cc.spriteFrameCache.addSpriteFrames(res.niuniuCountPlist);
    _this.betsImgArr = [res.nn331_bets1, res.nn331_bets2, res.nn331_bets3,"",res.nn331_bets5];

    _this.dealAnimationLayer = new cc.Node();
    //allCardlayout.setContentSize(80,110);
    //allCardlayout.setAnchorPoint(0.5,0.5);
    _this.dealAnimationLayer.setPosition(0,0);
    _this.node.addChild(_this.dealAnimationLayer,200);
    var helpnode = ccui.helper.seekWidgetByName(_this.node, "closeinfo");
    helpnode.setVisible(false);
    //helpnode.setLocalZOrder(2000);
    gameclass.createbtnpress(_this.node, "closeinfo", function () {
        helpnode.setVisible(false);
    });

    gameclass.createbtnpress(_this.node, "help", function () {
        helpnode.setVisible(true);
    });

    var btn_layer = new gameclass.btn_setLayer(this.node,this.game);
    this.node.addChild(btn_layer);
    var closeinfo = ccui.helper.seekWidgetByName(this.node,"closeinfo");
    closeinfo.setLocalZOrder(1000);
    btn_layer.setLocalZOrder(999);

    this.safeLayer = new gameclass.checkSafeLayer(this.node,this.game,ccui.helper.seekWidgetByName(btn_layer,"btn_safe"));
    this.safeLayer.setName("safeLayer");
    this.node.addChild(this.safeLayer);

    //gameclass.createbtnpress(_this.node, "chat", function () {
    //    _this.game.uimgr.showui("gameclass.chatuinew");
    //    _this.game.uimgr.uis["gameclass.chatuinew"].setmod(_this.mod_niuniu);
    //});

    //gameclass.createbtnpress(_this.node, "set", function () {
    //    _this.game.uimgr.showui("gameclass.settingui");
    //});

    _this.clock =  ccui.helper.seekWidgetByName(_this.node, "clock");
    _this.clocktime = ccui.helper.seekWidgetByName(_this.node, "clocktime");
    _this.clock.setVisible(false);
    _this.juShuLabel= ccui.helper.seekWidgetByName(_this.node, "juShuLabel");

    _this.mingpai = ccui.helper.seekWidgetByName(_this.node, "mingpai");
    _this.mingpai.setVisible(false);
    _this.btn_tishi = ccui.helper.seekWidgetByName(_this.node, "btn_tishi");
    _this.btn_tishi.setVisible(false);
    _this.gamebets = ccui.helper.seekWidgetByName(_this.node, "gamebets");
    _this.gamebets.setVisible(false);
    _this.qzbtnLayer=ccui.helper.seekWidgetByName(_this.node, "QZbtnLayer");
    _this.qzbtnLayer.setVisible(false);

    _this.calLayer = ccui.helper.seekWidgetByName(_this.node, "calculate_card");
    _this.calLayer.setVisible(false);
    //gameclass.createbtnpress(_this.node, "sharelayer", function () {
    //    _this.sharelayer.setVisible(false);
    //    //_this.game.uimgr.showui("gameclass.exitroom");
    //});

    //gameclass.createbtnpress(_this.node, "exitRoom", function () {
    //    _this.game.uimgr.showui("gameclass.msgboxui");
    //    _this.game.uimgr.uis["gameclass.msgboxui"].setString("是否想要解散房间？",function(){
    //        _this.mod_niuniu.dissmissroom();
    //    });
    //});

    gameclass.createbtnpress(_this.node, "invitebtn", function () {
        _this.share();
        if(window.wx)
        {
            _this.sharelayer.setVisible(true);
        }
    });

    _this.ready = ccui.helper.seekWidgetByName(_this.node, "ready");
    gameclass.createbtnpress(_this.node, "ready", function () {
        _this.ready.setVisible(false);
        _this.mod_niuniu.gameready();
    });

    for(var i = 1; i < 6; i++) {
        gameclass.createbtnpress(this.node, "gamebets" + i, function (_1, _2, index) {
            cc.log(index);
            _this.mod_niuniu.gamebets(index);
            _this.gamebets.setVisible(false);
        }, null, null, i);
    }
    var _childArr=_this.qzbtnLayer.getChildren();
    for (var i=0;i<_childArr.length;i++){
        var nodeName=_childArr[i].getName();
        var _index=nodeName.split("_")[1];
        gameclass.createbtnpress(this.node, nodeName, function (_1, _2, index) {
            cc.log(index);
            _this.mod_niuniu.gamedealer(index);
            _this.qzbtnLayer.setVisible(false);
        }, null, null, _index);
    }
    for(var i = 0; i < 4; i++) {
        _this.calTextArr[i] = ccui.helper.seekWidgetByName(_this.calLayer, "calculate_"+i);
        _this.calTextArr[i].setString(""+0);
    }
    gameclass.createbtnpress(_this.node, "mingpai", function () {
        _this.toMingPai(jxnn_playerHead.curPlayCard);
    });

    gameclass.createbtnpress(_this.node, "btn_tishi", function () {
        _this.toTips(jxnn_playerHead.curPlayCard);

    });
    var showipinfo = function(sender,type){
        if(ccui.Widget.TOUCH_ENDED == type){
            //if(sender.index == 0) return;
            var playerdata = _this.mod_niuniu.getplayerdata(sender.index);
            _this.game.uimgr.showui("gameclass.chatMicLayer").setPlayerInfo(playerdata,_this.mod_niuniu,sender.index);
        }
    }
    for (var i = 0;i < 5; i++){
        var head = ccui.helper.seekWidgetByName(this.node,"UserNode"+i);
        this.playerHeads[i] = new jxnn_playerHead( head,i,this.node);
        head.getChildByName('head').getChildByName('ccc').index = i;
        head.getChildByName('head').getChildByName('ccc').addTouchEventListener(showipinfo);
    }
};

gameclass.jxnntable.prototype.checkSafe = function(people){
    this.safeLayer.checkSafe(people);
};

gameclass.jxnntable.prototype.isShowQiangZhuang = function(b,zhuangId) {
    // cc.log(b);
    // this.qiangzhuang.setVisible(b);
    // this.buqiang.setVisible(b);
    if(this.mod_niuniu.getplayerdata(0).robdeal>=0&&b)return;
    if(zhuangId&&b){
        if(this.mod_niuniu.selfdata.uid==zhuangId){
            this.qzbtnLayer.setVisible(b);
        }else{
            this.qzbtnLayer.setVisible(!b);
        }
        this.qzbtnLayer.getChildren()[0].setVisible(false);
        this.qzbtnLayer.x=-110;
    }else{
        this.qzbtnLayer.setVisible(b);
        this.qzbtnLayer.getChildren()[0].setVisible(true);
        this.qzbtnLayer.x=0;
    }
};
gameclass.jxnntable.prototype.isGameBetShow=function (b) {
    if(b){
        var playerdata=this.mod_niuniu.getplayerdata(0);
        if(playerdata.bets||playerdata.bets==-1) {
            this.gamebets.setVisible(false);
            return;
        }
        this.gamebets.setVisible(true);
        if(this.game.modmgr.mod_login.logindata.card>=1){
            this.gamebets.getChildByName("gamebets5").setEnabled(true);
            this.gamebets.getChildByName("gamebets5").setBright(true);
        }else{
            this.gamebets.getChildByName("gamebets5").setEnabled(false);
            this.gamebets.getChildByName("gamebets5").setBright(false);
        }
    }else{
        this.gamebets.setVisible(false);
    }
}
gameclass.jxnntable.prototype.updateHandCardPosY = function(handCard) {
    for(var i = 0;i<handCard.length;i++){
        if(handCard[i].isUp){
            handCard[i].isUp = false;
            handCard[i].setPositionY(0);
        }
    }
};
gameclass.jxnntable.prototype.updateHandCardPosY_2 = function(handCard,calarr) {
    for(var i = 0;i<calarr.length;i++) {
        for (var j = 0; j < handCard.length; j++) {
            if (handCard[j].getTag() == calarr[i] && !handCard[j].isUp) {
                handCard[j].isUp = true;
                handCard[j].setPositionY(20);
                this.calIndex++;
            }
        }
    }
};
gameclass.jxnntable.prototype.cleanCal = function() {
    var _this = this;
    for(var i = 0;i<_this.calArr.length;i++){
        _this.updataCalText(i,0);
        _this.calArr[i] = 0;
    }
    this.calTextArr[3].setString(""+0);
    this.calIndex = 0;
    this.isMingPai(_this.calArr);
};
gameclass.jxnntable.prototype.showToast = function(_text,delay){
    if(this.node.getChildByTag(123456)){
        return;
    }
    var _this = this;
    var node = new cc.Sprite(res.img_input);
    //var node = new cc.LayerColor(cc.color(0,0,0,150),400,40);
    node.setPosition(_this.node.getContentSize().width / 2,65);
    node.setTag(123456);
    node.setOpacity(230);
    /*node.ignoreAnchor = false;
    node.anchorX = 0.5;
    node.anchorY = 0.5;*/
    _this.node.addChild(node);
    var text = new cc.LabelTTF(_text, "Arial", 35);
    text.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
    node.addChild(text);
    _this.scheduleOnce(function(){
        _this.node.removeChildByTag(123456);
    }, delay);

};
gameclass.jxnntable.prototype.toTips = function(handCard) {
    var _this = this;
    cc.log("handCard="+handCard);
    var result = mod_compare.tipsNiu(handCard);
    cc.log(result);
    if(result.length != 3){
        return;//{'resultCard':result,'type':type};
    }
    _this.cleanCal();
    this.updateHandCardPosY(this.playerHeads[0].handCards.getChildren());
    for(var i = 0;i<result.length;i++){
        _this.calArr[i] = result[i];
        _this.updataCalText(i,_this.calArr[i]);
    }
    this.setCalArrSum(_this.calArr);
    this.updateHandCardPosY_2(this.playerHeads[0].handCards.getChildren(),_this.calArr);
    this.isMingPai(_this.calArr);
};
gameclass.jxnntable.prototype.toMingPai = function(handCard) {
    var _this = this;
    cc.log("calArr"+_this.calArr);
    cc.log("handCard"+handCard);
    var _niuCount = 0;
    var lst = [];
    for(var i = 0;i < 5; i++){
        lst[i] = false;
    }
    var isMaxNiu = mod_compare.gettype(handCard,lst);
    if(isMaxNiu == 200){//炸弹4张牌  需特别处理
         _this.mod_niuniu.gameview(isMaxNiu, _this.calArr);
        return;
    }
    if(mod_compare.isNiu(_this.calArr)) {
        if(isMaxNiu >= 100){
            _niuCount = isMaxNiu;
        }else{
            var reArr = _this.uniq(handCard,_this.calArr);
            _niuCount = mod_compare.countNiu(reArr);
        }
    }else{
        if(isMaxNiu > 0){
            _this.showToast("当前有牛哦！",2);
            return;
        }
    }
    _this.mod_niuniu.gameview(_niuCount, _this.calArr);
};
gameclass.jxnntable.prototype.uniq = function(arr1,arr2) {
    var arr = [];
    for (var i = 0; i < arr1.length; i++) {
        if (0 > arr2.indexOf(arr1[i])) {
            arr.push(arr1[i]);
        }
    }
    return arr;
};
gameclass.jxnntable.prototype.crateniuniuani = function(cardlst,soundniu) {

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
gameclass.jxnntable.prototype.timeState = function(){
    var titiletime =  ccui.helper.seekWidgetByName(this.node, "curTime");
    var reftime = function () {
        var myDate = new Date();
        var str = myDate.Format("MM-dd hh:mm");
        titiletime.setString(str);
    };
    reftime();
    var func = cc.repeatForever(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
        reftime();
    })));
    titiletime.runAction(func);
};
gameclass.jxnntable.prototype.micLayerState = function(){
    var _this = this;
    //var mic = ccui.helper.seekWidgetByName(_this.node, "mic");
    //
    //var miclayer = ccui.helper.seekWidgetByName(_this.node, "miclayer");
    //miclayer.setVisible(false);

    //var imgmic = ccui.helper.seekWidgetByName(_this.node, "imgmic");

    _this.invitebtn = ccui.helper.seekWidgetByName(_this.node, "invitebtn");
    //var ani = cc.sequence(cc.scaleTo(0.8,1),cc.scaleTo(0.8,0.8));
    //imgmic.runAction(cc.repeatForever(ani));

    //var oldvnum = mod_sound.getEffectsVolume();
    //var oldmnum =mod_sound.getMusicVolume();
    //var btnFunc = function (sender, type) {
    //    switch (type) {
    //        case ccui.Widget.TOUCH_BEGAN:
    //            oldvnum = mod_sound.getEffectsVolume();
    //            oldmnum = mod_sound.getMusicVolume();
    //            mod_sound.setEffectsVolume(0.0);
    //            mod_sound.setMusicVolume(0.0);
    //            miclayer.setVisible(true);
    //            gameclass.mod_platform.begmic();
    //            break;
    //        case ccui.Widget.TOUCH_ENDED:
    //            miclayer.setVisible(false);
    //            gameclass.mod_platform.endmic();
    //            mod_sound.setEffectsVolume(Number(oldvnum));
    //            mod_sound.setMusicVolume(Number(oldmnum));
    //            break;
    //        case ccui.Widget.TOUCH_CANCELED:
    //            miclayer.setVisible(false);
    //            gameclass.mod_platform.cancelmic();
    //            mod_sound.setEffectsVolume(Number(oldvnum));
    //            mod_sound.setMusicVolume(Number(oldmnum));
    //            break;
    //    }
    //};
    //mic.addTouchEventListener(btnFunc);
};
gameclass.jxnntable.prototype.onchat = function(data){
    cc.log(data)
    var _this = this;
    for(var i = 0;i < g_chatstr.length; i++){
        if(g_chatstr[i] == data.chat){
            //mod_sound.playeffect(this.getSex(data.uid)==0?g_manTalk[i]:g_womanTalk[i]);
            mod_sound.playeffect(g_music["fix_msg_" + (i+1)],false);
        }
    }
    var posArr = [cc.p(124,54),cc.p(1070,300),cc.p(1070,480),cc.p(60,480),cc.p(60,300)];
    for (var i = 0;i < 5;i ++) {
        var player = _this.mod_niuniu.getplayerdata(i);
        var playernode = _this.playerHeads[i].ccc;
        if (player != null && player.uid == data.uid) {
            if(data.type < 4){
                var _node = new ccui.Layout();

                var s9 = null;
                if(i == 1 || i == 2){
                    s9 = new cc.Scale9Sprite(res.chatbg_rd);
                    /*}else if(i == 2){
                     s9 = new cc.Scale9Sprite(res.chatbg_lt);*/
                }else{
                    s9 = new cc.Scale9Sprite(res.chatbg_ld);
                }

                s9.setCapInsets(cc.rect(60,10,10,10));
                s9.setAnchorPoint(cc.p(0,0));
                s9.setPosition(cc.p(-15,-15));
                _node.addChild(s9);

                if(data.type == 1){
                    var helloLabel = new cc.LabelTTF(data.chat, "Arial", 36);
                    helloLabel.setAnchorPoint(cc.p(0,0));
                    helloLabel.setColor(cc.color(0,0,0));
                    _node.addChild(helloLabel);

                    if (i == 1 || i == 2){
                        _node.setPosition(cc.p(-(helloLabel.getContentSize().width - _node.getContentSize().width),playernode.getContentSize().height))
                    }else{
                        _node.setPosition(cc.p(0,playernode.getContentSize().height))
                    }
                    s9.setContentSize(helloLabel.getContentSize().width + 30,helloLabel.getContentSize().height + 30);
                    cc.log(playernode);
                }else if(data.type == 2){

                    var index = Math.floor(Number(data.chat)) ;
                    var _dh = 80;
                    var _dw = 80;
                    var spr = new cc.Sprite();
                    spr.initWithFile(g_face[index]);
                    spr.setAnchorPoint(cc.p(0.5,0.5));
                    spr.setPosition(cc.p(_dw/2,_dh/2));
                    if(spr.getContentSize().height>spr.getContentSize().width){
                        spr.setScale(_dh/spr.getContentSize().height);
                    }else{
                        spr.setScale(_dw/spr.getContentSize().width);
                    }
                    _node.addChild(spr);

                    if (i == 1 || i == 2){
                        _node.setPosition(cc.p(-50,playernode.getContentSize().height));
                    }else{
                        _node.setPosition(cc.p(100,playernode.getContentSize().height))
                    }
                    s9.setContentSize(spr.getContentSize().width + 30,spr.getContentSize().height + 30);
                }else if (data.type == 3){
                    gameclass.mod_platform.playurl(data.chat);

                    var spr = new cc.Sprite();
                    spr.initWithFile(res.soundopen2);
                    spr.setAnchorPoint(cc.p(0.5,0.5));
                    spr.setPosition(cc.p(spr.getContentSize().width/2,spr.getContentSize().height/2));

                    _node.addChild(spr);

                    if (i == 1 || i == 2){
                        _node.setPosition(cc.p(-50,playernode.getContentSize().height));
                    }else{
                        _node.setPosition(cc.p(100,playernode.getContentSize().height))
                    }
                }
                playernode.addChild(_node);

                var seq = cc.sequence(cc.delayTime(3),cc.callFunc(function(){
                    _node.removeFromParent(true);
                }));
                _node.runAction(seq);
            }else if(data.type == 4){
                var _senderObj=JSON.parse(data.chat);
                var _animateNode=new cc.Node();
                _animateNode.setScale(0.8);
                mod_sound.playeffect(g_music["magic"+_senderObj.type],false);
                _senderObj.type+=1;
                var sucAnim = new sp.SkeletonAnimation(g_magic_chat["magic_chat_"+_senderObj.type+"_1_json"], g_magic_chat["magic_chat_"+_senderObj.type+"_1_atlas"]);
                sucAnim.setAnimation(0, 'animation', false);
                sucAnim.setAnchorPoint(0.5,0.5);
                _animateNode.addChild(sucAnim);
                var senderPos=posArr[i];
                _animateNode.setPosition(senderPos);
                var hitPos=null;
                for (var j = 0;j < 5;j ++) {
                    var player = _this.mod_niuniu.getplayerdata(j);
                    if(player&&player.uid==_senderObj.hitUid){
                        hitPos=posArr[j];
                        break;
                    }
                }
                _this.node.addChild(_animateNode)
                _animateNode.runAction(cc.sequence(cc.delayTime(1),cc.spawn(cc.rotateTo(0.5,360),cc.moveTo(0.5,hitPos)),cc.callFunc(function(_animateNode,sucAnim){
                    sucAnim.removeFromParent(true);
                    var sucAnim1 = new sp.SkeletonAnimation(g_magic_chat["magic_chat_"+_senderObj.type+"_2_json"], g_magic_chat["magic_chat_"+_senderObj.type+"_2_atlas"]);
                    sucAnim1.setAnimation(0, 'animation', false);
                    sucAnim1.setAnchorPoint(0.5,0.5);
                    _animateNode.addChild(sucAnim1);
                    _animateNode.scheduleOnce(function(){
                        _animateNode.removeFromParent(true)
                    },1)
                },_animateNode,sucAnim)))
            }

        }
    }
};
gameclass.jxnntable.prototype.getSex = function(uid){
    var sex = 0;
    var players = this.mod_niuniu.roominfo.person;
    if(!players)return;
    for(var i = 0;i < players.length;i++){
        if(players[i]){
            if(players[i].uid == uid){
                sex = players[i].sex;
                break;
            }
        }
    }
    if(sex == 1 || sex == 2){
        return sex-1;
    }else{
        return 0;
    }
},
gameclass.jxnntable.prototype.share = function(){
        var wf="看牌抢庄，"
        if(this.mod_niuniu.roominfo.param1 % 10 == 1) {
            wf = "通比牛牛，";
        } else if(this.mod_niuniu.roominfo.param1 % 10 == 2) {
            wf = "房主当庄，";
        } else if(this.mod_niuniu.roominfo.param1 % 10 == 3) {
            wf = "轮流当庄，";
        }
        var kp="";
        var bs="";
        var lz="";
        var jus="共" + this.mod_niuniu.roominfo.maxstep + "局，";
        var maxPlayerNum=this.mod_niuniu.roominfo.param2+"人大战，";
        if(this.mod_niuniu.roominfo.param1 % 10 == 0){
            kp = "扣一张";
            if(parseInt(this.mod_niuniu.roominfo.param1 / 10)% 10 == 1) {
                kp = "扣两张";
            }
        }else{
            switch(parseInt(this.mod_niuniu.roominfo.param1 / 10) % 10){
                case 0:
                    bs="1倍赔率";
                    break;
                case 1:
                    bs="3倍赔率";
                    break;
                case 2:
                    bs="5倍赔率";
                    break;
                case 3:
                    bs="7倍赔率";
                    break
                case 4:
                    bs="2倍赔率";
                    break
                case 5:
                    bs="6倍赔率";
                    break;
                case 6:
                    bs="8倍赔率";
                    break;
                case 7:
                    bs="10倍赔率";
                    break;
            }
        }
        if(parseInt(this.mod_niuniu.roominfo.param1 / 100) % 10 == 0){
            lz="无王，";
        }else if(parseInt(this.mod_niuniu.roominfo.param1 / 100) % 10 == 1){
            lz="有王，";
        }
        var strtxt = wf + jus +lz + bs + kp +"大家都等您，快来吧。"
        gameclass.mod_platform.invitefriend(strtxt,
            "http://www.hbyouyou.com/down/android/name/poker",
            this.mod_niuniu.roominfo.roomid+"-傲世娱乐牛牛");
};

/*
 * 开局后 玩家掉线
 * */
gameclass.jxnntable.prototype.userLineOut = function(index,data){
    var index = index - this.mod_niuniu.serverchair;
    if(index < 0){
        index = index + 5;
    }
    if(data.line)
        this.playerHeads[index].off_line.setVisible(false);
    else
        this.playerHeads[index].off_line.setVisible(true);
    gameclass.mod_base.showtximg(this.playerHeads[index].head_img ,this.playerHeads[index].head_url, 0, 0 , "im_headbg5", !data.line );
}

