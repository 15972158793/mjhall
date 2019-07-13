/**
 * Created by yang on 2016/11/9.
 */
var goldNiuMaxNum = 5;
var goldNys_playerHead = cc.Class.extend({
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
    gameUi:null,
    ccc:null,
    isShow:false,

    ctor: function (node,index,parent,gameUi) {
        this.gameUi=gameUi;
        this.node = node;
        //cc.log(this.node);
        this._icon=ccui.helper.seekWidgetByName(this.node,"icon");
        this._pos = this._icon.getParent().convertToWorldSpace(this._icon.getPosition());
        this.index = index;
        this.name_text = this.node.getChildByName('playername');
        this.ok_img = this.node.getChildByName('ok');
        this.head_img =  this.node.getChildByName('icon');
        //this.id_text = this.node.getChildByName("playerid");
        this.score_text = this.node.getChildByName('playerscore');
        this.call_scoreImg = this.node.getChildByName('call_score');
        this.zhuang_img = this.node.getChildByName('zhuang');
        this.light = this.node.getChildByName('light');
        this.rob_zhuang_img =  this.node.getChildByName('rob_zhuang');
        this.handCards = ccui.helper.seekWidgetByName( parent, "notifynode"  + index);
        this.off_line = this.node.getChildByName("off_line");
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
        timer.setName(strName);
        timer.runAction(cc.sequence(to1,cc.callFunc(function(){
            timer.removeFromParent(true);
        })));
    },

    destroyProgress : function(strName){
        var _index=0;
        while(this.node.getChildByName(strName)){
            _index++;
            this.node.getChildByName(strName).removeFromParent(true);
            if(_index>10)break;
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
        for(var i = 0;i < goldNiuMaxNum; i++){
            lst[i] = false;
        }
        var isMaxNiu = mod_compare.gettype(goldNys_playerHead.curPlayCard,lst);
        goldNys_playerHead.Play_mod_niuniu.gameview(isMaxNiu, goldNys_playerHead.curPlayCard);

    },
    init:function(){
        this.ok_img.setVisible(false);
        this.rob_zhuang_img.setVisible(false);
        this.call_scoreImg.setVisible(false);
        this.off_line.setVisible(false);
        this.zhuang_img.setVisible(false);
        this.zhuang_img.setLocalZOrder(100);
        this.node.setVisible(false);
        this.light.setVisible(false);
        this.score_text.setString("0");
        this.handCards.setLocalZOrder(1000);
        var _this=this;
        this.ccc.addTouchEventListener(function (sender, type) {
            if(this.index == 0) return;
            var seat = this.gameUi.playerSeat;

            var uid = seat[this.index];

            var playerdata = this.gameUi.mod_niuniu.getplayerdatabyuid(uid);
            this.gameUi.game.uimgr.showui("gameclass.chatMicLayer");
            this.gameUi.game.uimgr.uis["gameclass.chatMicLayer"].setPlayerInfo(playerdata,this.gameUi.mod_niuniu);

        }, this);
    },

});

goldNys_playerHead.curPlayCard = [];
goldNys_playerHead.Play_mod_niuniu = null;
gameclass.goldNysTable = gameclass.baseui.extend({
    sprite: null,
    node:null,
    //mod_niuniu:null,
    ongameview_attr:null,
    ready:null,
    gamebets:null,
    playerHeads:null,
    //curHandCard:[],
    calTextArr:[],
    calArr:[0,0,0],
    calIndex:0,
    isCardTouch:false,
    userBetsCount:null,
    dealUid:0,
    callScoreStage:0,
    numObj:[],
    playerSeat:null,
    //updataTimer:null,

    //onchat:null,
    ctor: function () {
        //cc.log("niuniu ctor");
        this._super();
        this.playerHeads = [];
        this.userBetsCount = [];
        this.playerSeat = [];
        //this.updataTimer   = 0;
    },
    show:function(){
        //cc.log("niuniu show");
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
        goldNys_playerHead.Play_mod_niuniu = _mod_niuniiu;
        var _this = this;
        this.mod_niuniu.bindUI(_this);

        _this.timeState();
        this.setRoomRuleStr();

        if(this.gameType == 0 || this.gameType == 1){
            goldNiuMaxNum = 5;
            this.playerLayer = this.player5Layer;
            this.player8Layer.removeFromParent(true);

        }else{
            this.playerLayer = this.player8Layer;
            this.player5Layer.removeFromParent(true);
            goldNiuMaxNum = 8;

            this.gamebets.setPositionY(150);
            this.qzbtnLayer.setPositionY(145);
            this.cuoPaiLayer.setPositionY(100);
            this.showCardLayer.setPositionY(100);
            this.btn_tuizhu.setPositionY(145);

            this.btn_layer.setBtnXSPos();

            this.talkPos = [cc.p(110,115),cc.p(940,235),cc.p(910,390),cc.p(925,450),
                cc.p(580,480),cc.p(175,450),cc.p(240,360),cc.p(240,215)];

            this._timeContain.setPositionY(410);
            this.ready.setPositionY(150);
            this.btn_changeTable.setPositionY(150);
            this.payScore.setPositionY(205);

            ccui.helper.seekWidgetByName(this.node,"BG").loadTexture(res.player8Bg,ccui.Widget.LOCAL_TEXTURE);
            ccui.helper.seekWidgetByName(this.node,"diFen").setPositionY(250);

        }

        for(var i = 0; i < goldNiuMaxNum; i++) {
            this.playerSeat.push(0);
        }

        for (var i = 0;i < goldNiuMaxNum; i++){
            var unode = ccui.helper.seekWidgetByName(_this.playerLayer, "UserNode" + i);
            _this.playerHeads[i] = new goldNys_playerHead( unode,i,_this.playerLayer,_this);
        }

        if (_this.mod_niuniu.roominfo.time != 0){
            _this.game.uimgr.showui("gameclass.exitroom",false);
            _this.game.uimgr.uis["gameclass.exitroom"].setData(_this.mod_niuniu,_this.mod_niuniu.roominfo);
        }
    },
    updateTime: function (dt) {
        //this.updataTimer += dt;
        this._timerControl.update();
    },
    destroy: function () {
        this._timerControl.destroy();
    },
});

gameclass.goldNysTable.prototype.onGameReady = function (data) {
    for (var i = 0;i < goldNiuMaxNum;i++){
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && data == playerdata.uid){
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            this.playerHeads[index].ok_img.setVisible(true);
            if(this.node.getChildByTag(1122)){
                this.node.getChildByTag(1122).removeFromParent(true);
            }
            break;
        }
    }
};


gameclass.goldNysTable.prototype.resetIcon = function(uid) {
    for (var i = 0; i < goldNiuMaxNum;i++){
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if(playerdata == null) {
            continue;
        }
        if(playerdata.uid != uid) {
            continue;
        }
        var index = this.getSeat(playerdata.uid);
        if(index == -1) {
            continue;
        }
        gameclass.mod_base.showtximg(this.playerHeads[index].head_img, playerdata.imgurl, 0, 0,"im_headbg5", playerdata.ip == "")
        break;
    }
};

gameclass.goldNysTable.prototype.getSeat = function(uid) {
    if(uid == this.mod_niuniu.uid) {
        return 0;
    }

    for(var i = 1; i < goldNiuMaxNum; i++) {
        if(this.playerSeat[i] == uid) {
            return i;
        }
    }

    return -1;
};
//如果这个uid已经有位置
gameclass.goldNysTable.prototype.setSeat = function(uid) {
    if(uid == this.mod_niuniu.uid) {
        return;
    }

    for(var i = 1; i < goldNiuMaxNum; i++) {
        var curIndex = this.changeSeat(i);
        if(this.playerSeat[curIndex] == uid) {
            return;
        }
    }

    for(var i = 1; i < goldNiuMaxNum; i++) {
        var curIndex = this.changeSeat(i);
        if(this.playerSeat[curIndex] == 0) {
            this.playerSeat[curIndex] = uid;
            return;
        }
    }
};

gameclass.goldNysTable.prototype.changeSeat = function(orginalSeat){
    var curSeat = -1;
    if( this.gameType == 2){
        if(orginalSeat == 0) curSeat = 0;
        else if(orginalSeat == 1) curSeat = 4;
        else if(orginalSeat == 2) curSeat = 1;
        else if(orginalSeat == 3) curSeat = 5;
        else if(orginalSeat == 4) curSeat = 2;
        else if(orginalSeat == 5) curSeat = 6;
        else if(orginalSeat == 6) curSeat = 3;
        else if(orginalSeat == 7) curSeat = 7;
    }else{
        curSeat = orginalSeat;
    }
    return curSeat;
};

gameclass.goldNysTable.prototype.updataRoomUserInfo = function(){
    for(var i = 1; i < goldNiuMaxNum; i++) {
        var curIndex = this.changeSeat(i);
        if(this.playerSeat[curIndex] == 0) {
            continue;
        }
        var find = false;
        for (var j = 0;j < goldNiuMaxNum;j++) {
            var playerdata = this.mod_niuniu.getplayerdata(j);
            if(!playerdata) {
                continue;
            }
            if(this.playerSeat[curIndex] == playerdata.uid) {
                find = true;
                break;
            }
        }
        if(!find) {
            this.playerSeat[curIndex] = 0;
        }
    }

    for (var i = 0;i < goldNiuMaxNum;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if(!playerdata) {
            continue;
        }
        this.setSeat(playerdata.uid);
    }

    var tmp = [];
    for(var i = 0; i < goldNiuMaxNum; i++) {
        tmp.push(0);
    }
    //cc.log(tmp);
    for (var i = 0;i < goldNiuMaxNum; i++){
        var playerdata = this.mod_niuniu.getplayerdata(i);

        if (playerdata){
            //cc.log(playerdata);
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            tmp[index] = 1;
            if(this.mod_niuniu.roominfo.state==0){
                this.playerHeads[index].handCards.removeAllChildren();
                if(playerdata&&playerdata.card&&playerdata.card.length){
                    this.onGameInitCard(this.playerHeads[index],playerdata,index);
                }
            }
            this.playerHeads[index].destroyProgress("ProgressBar");
            this.playerHeads[index].node.setVisible(true);
            this.playerHeads[index].isShow = true;
            this.playerHeads[index].name_text.setString(playerdata.name);
            this.playerHeads[index].ok_img.setVisible(!this.mod_niuniu.roominfo.begin && playerdata.ready);
            this.playerHeads[index].off_line.setVisible(!playerdata.line);
            this.playerHeads[index].head_url = playerdata.imgurl || "";
            if(!playerdata.param)playerdata.param=0;
            this.playerHeads[index].score_text.setString(gameclass.changeShow(playerdata.param));
            if(playerdata.dealer)this.playerHeads[i].zhuang_img.setVisible(true);

            gameclass.mod_base.showtximg(this.playerHeads[index].head_img, playerdata.imgurl, 0, 0,"im_headbg5", playerdata.ip == "");
        }
    }
    //cc.log(tmp);
    cc.log(goldNiuMaxNum);
    for(var i = 0; i < goldNiuMaxNum; i++) {
        if(tmp[i] == 0) {
            //cc.log(this.playerHeads[i]);
            //if(!this.playerHeads[i]) continue;
            this.playerHeads[i].isShow = false;
            this.playerHeads[i].handCards.removeAllChildren();
            this.playerHeads[i].node.setVisible(false);
        }
    }
};

gameclass.goldNysTable.prototype.onGameNiuNiuBegin = function(data){
    var _this = this;
    this.unscheduleAllCallbacks();
    this.cleanTableShow();
    this.resetNiuNiuNext();//清空上局牌
    this.updataUserScore(data.info);//更新分数
    if(this.gameType == 0 || this.gameType == 2){
        this._timeContain.setVisible(false);//发牌的时候不显示倒计时
    }
    this.btn_changeTable.setVisible(false);
    this.payScore.setVisible(false);
    var callfunc = function(){
        _this.runShowCardAction(function () {
            _this.dealAnimationLayer.removeAllChildren();
            _this.showHandCard(data.info);
            _this._timeContain.setVisible(true);
            _this.stateImg.loadTexture(res.niuniuState1, ccui.Widget.LOCAL_TEXTURE);
            for(var i = 0;i<data.info.length;i++) {
                if (data.info[i].dealer) {
                    _this.dealUid = data.info[i].uid;
                }
            }
            //if(_this.dealUid){
            //    _this.isGameBetsShow(true);
            //}else{
            //    _this.isShowQiangZhuang(true);
            //}
            //_this.createProgressBar(-1,"ProgressBar",8);
        });
    }

    if(this.gameType == 0 || this.gameType == 2){
        this.node.scheduleOnce(callfunc,2);//2为开局动画时间
    }else{
        this.node.scheduleOnce(function(){
            if(_this.mod_niuniu.serverchair != null){
                if(_this.mod_niuniu.roominfo.state == 1 ){
                    _this.isShowQiangZhuang(true);
                    _this.stateImg.loadTexture(res.niuniuState1,ccui.Widget.LOCAL_TEXTURE);
                }
            }
        },2)
    }
};




//切后台回来是否播放发牌动画
//gameclass.goldNysTable.prototype.isPlaySendAnim = function(){
//    cc.log(this.mod_niuniu.messageTime);
//    var bool = true;
//    for(var i = 0;i < this.mod_niuniu.messageTime.length;i++){
//        if(this.gameType==0){
//            if(Math.abs(this.mod_niuniu.messageTime[1] - this.mod_niuniu.messageTime[0]) < 0.1){
//                bool = false;
//            }
//        }else{
//            if(Math.abs(this.mod_niuniu.messageTime[1] - this.mod_niuniu.messageTime[0]) < 0.1){
//                bool = false;
//            }else if(Math.abs(this.mod_niuniu.messageTime[2] - this.mod_niuniu.messageTime[0]) < 0.1){
//                bool = false;
//            }
//        }
//    }
//    return bool;
//};

gameclass.goldNysTable.prototype.sendCard = function(_cardArr){
    var _this = this;
    _this.runShowCardAction(function () {
        _this.dealAnimationLayer.removeAllChildren();
        _this.showHandCard(_cardArr);
        _this.isShowCuoPaiLayer(true);
        _this.stateImg.loadTexture(res.niuniuState3,ccui.Widget.LOCAL_TEXTURE);
    });
};


gameclass.goldNysTable.prototype.runShowCardAction = function(_callback){
    var cardCount = goldNiuMaxNum*5;
    for(var i = 0;i< cardCount;i++){
        var cardBack = new cc.Sprite(res.pokerBei);
        cardBack.setPosition(cc.winSize.width / 2,cc.winSize.height / 2);
        this.dealAnimationLayer.addChild(cardBack);
    }

    var nowPlayerIndex=0;
    var nowCount=0;
    var that=this;
    var _scheduleCallBack=function(){
        if(nowPlayerIndex>=goldNiuMaxNum){
            that.scheduleOnce(_callback,0.1);
            that.unschedule(_scheduleCallBack);
        }else{
            while (!that.playerHeads[nowPlayerIndex].isShow){
                nowPlayerIndex++;
                if(nowPlayerIndex >= goldNiuMaxNum){
                    that.scheduleOnce(_callback,0.1);
                    that.unschedule(_scheduleCallBack);
                    return;
                }
            }
            var _offset=(nowPlayerIndex==0?56:40);
            for(var i=0;i<4;i++){
                nowCount++;
                var pos=that.playerHeads[nowPlayerIndex].handCards.getPosition();
                pos.x+=(i-2)*_offset;
                that.dealAnimationLayer.getChildren()[nowCount].setScale(that.playerHeads[nowPlayerIndex].handCards.getScale());
                that.dealAnimationLayer.getChildren()[nowCount].runAction(cc.sequence(cc.delayTime(i*0.02),cc.moveTo(0.1,pos)))
            }
        }
        nowPlayerIndex++;
    }
    this.schedule(_scheduleCallBack,0.1,this.mod_niuniu.roominfo.person.length);
};

gameclass.goldNysTable.prototype.runMoveCardAction = function(_callback){
    this.dealAnimationLayer.removeAllChildren();

    //allCardLayout.setPosition(cc.winSize.width / 2 - cardlength + 39,cc.winSize.height / 2);

    var cardCount = 45;
    var offset = cardCount * 3;
    for(var i = 0;i< cardCount;i++){
        var cardBack = new cc.Sprite(res.pokerBei);
        cardBack.setPosition(cc.winSize.width / 2 - offset ,cc.winSize.height / 2);
        cardBack.setScale(0.8);
        cardBack.runAction(new cc.MoveBy(0.6, 8 * i , 0 ) );
        this.dealAnimationLayer.addChild(cardBack);
    }
    this.scheduleOnce(function(){
        if(_callback){
            _callback();
        }
    }, 0.7);
};

gameclass.goldNysTable.prototype.reSendCard=function(_callBack){
    var sendIndex=-1;
    var indexnum=0;
    var _this = this;
    var sendCardCallBack=function(){
        //for(var i=sendIndex+1;i<i+goldNiuMaxNum;i++){
        //    if(i>=goldNiuMaxNum)i-=goldNiuMaxNum;
        //    var data = that.mod_niuniu.getplayerdata(i);
        //    if(data) {
        //        var index = that.getSeat(data.uid);
        //        if(index == -1) {
        //            continue;
        //        }
        //        var card = that.crateBtnCard();
        //        //if(index == 0) card.setScale(1.6);
        //        that.playerHeads[index].handCards.addChild(card);
        //        var beginPos=that.playerHeads[index].handCards.convertToNodeSpace(cc.p(cc.winSize.width/2,cc.winSize.height*0.45));
        //        card.setPosition(beginPos);
        //        var fanEndPos=that.playerHeads[index].handCards.getChildren()[0].getPosition();
        //        var endPos=cc.p(-fanEndPos.x,fanEndPos.y);
        //        card.runAction(cc.moveTo(0.15,endPos));
        //        sendIndex=i;
        //        indexnum++;
        //        if(indexnum>=that.mod_niuniu.roominfo.person.length) {
        //            that.node.unschedule(sendCardCallBack);
        //            _callBack();
        //        };
        //        break;
        //    }
        //}
        for(var i = 0;i < goldNiuMaxNum;i++ ){
            if(!_this.playerHeads[i].isShow) continue;
            var _cardLength= _this.playerHeads[i].handCards.getChildren().length;
            for(var j=_cardLength;j<5;j++){
                var card = _this.crateBtnCard();
                _this.playerHeads[i].handCards.addChild(card);
                var beginPos = _this.playerHeads[i].handCards.convertToNodeSpace(cc.p(cc.winSize.width/2,cc.winSize.height*0.45));
                card.setPosition(beginPos);
                var _offset=(i==0)?47:40;
                var endPos=cc.p((j-2)*_offset,0);
                card.runAction(cc.sequence(cc.delayTime((j-_cardLength)*0.02),cc.moveTo(0.15,endPos)));
            }
            indexnum++;
            if(indexnum >= _this.mod_niuniu.roominfo.person.length){
                _this.node.unschedule(sendCardCallBack);
                _callBack();
                break;
            };
        }
    }
    this.node.schedule(sendCardCallBack,0.15);
},
gameclass.goldNysTable.prototype.showHandCard = function(dataInfo){
    var _this = this;
    //cc.log(dataInfo);

    for (var i = 0;i < goldNiuMaxNum;i++) {
        var playerdata = _this.mod_niuniu.getplayerdata(i);
        if(playerdata){
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            this.onGameInitCard(this.playerHeads[index],playerdata,index);
        }
    }

    if(this.gameType == 0 || this.gameType == 2){
        //延时显示叫分
        this.scheduleOnce(function(){
            for(var i = 0;i<dataInfo.length;i++) {
                if (dataInfo[i].dealer) {
                    _this.dealUid = dataInfo[i].uid;
                }
            }
            _this.isUserTouch(_this.dealUid);//如果确定了庄  庄家可以操作牌
            var isShow = _this.dealUid == 0 ? true:false;//断线重连  dealUid等于0 还没确定庄家
            _this.isShowQiangZhuang(isShow);
            if(!isShow){ //以确定庄家 进行叫分阶段
                _this.showCallScore(_this.dealUid, dataInfo,callbackMingPai);
            }else{
                this.createProgressBar(-1,true,"ProgressBar",8);
                _this.reconnGameDeal(dataInfo);//抢庄阶段掉线,玩家是否已操作过强或不抢
            }
        }, 0.6);

        var callbackMingPai = function(){//断线重连  叫分阶段---如果叫分阶段结束进入是否已亮牌阶段
            if(_this.userBetsCount.length >= dataInfo.length -1){
                for(var i = 0;i < dataInfo.length;i++){
                    _this.onGameShowUserCard(dataInfo[i]);
                }
            }
        }
    }

};

gameclass.goldNysTable.prototype.isUserTouch = function(uid){
    if(uid == this.mod_niuniu.uid){//叫分后 或者是庄家 可以算牌操作
        this.isCardTouch = true;
    }
};
gameclass.goldNysTable.prototype.onGameSendOtherCard = function(otherCardArr){
    var mydate=this.mod_niuniu.getplayerdata(0);
    if(!otherCardArr) otherCardArr=[mydate.card[4]];
    var _this=this;
    _this.isShowCuoPaiLayer(false);

    var _callBack=function(){
        if(_this.mod_niuniu.roominfo.state!=0){
            _this.isShowLiangLayer(true);
        }
    }

    for(var i=0;i < otherCardArr.length;i++){
        var _index=(5-otherCardArr.length+i);
        var sprArr = this.playerHeads[0].handCards.getChildren();
        var sp=sprArr[_index];
        this.openPokerAction(sp,this.getCardUrlByNum(otherCardArr[i]),_callBack);
    }
};
gameclass.goldNysTable.prototype.onGameCuoCard = function(){
    var mydate=this.mod_niuniu.getplayerdata(0);
    var urlArr=[];
    for(var i=0;i<mydate.card.length;i++){
        urlArr[i]=this.getCardUrlByNum(mydate.card[i])
    }
    this.showCuoPaiOneLayer(true,urlArr[4]);
};
gameclass.goldNysTable.prototype.showCuoPaiOneLayer=function(isShow,url) {
    if(!url){
        url=null;
        var mydate=this.mod_niuniu.getplayerdata(0);
        url=this.getCardUrlByNum(mydate.card[4]);
    }
    if(isShow){
        this.game.uimgr.showui("gameclass.cuoPaiOneLayer");
        this.game.uimgr.uis["gameclass.cuoPaiOneLayer"].setData(url);
    }else{
        this.cuoPaiLayer.setVisible(false);
        if(this.mod_niuniu.roominfo.state!=0){
            var myPlayerdata=this.mod_niuniu.getplayerdata(0);
            if(!myPlayerdata.view)
                this.isShowLiangLayer(true);
        }
        if(this.game.uimgr.uis["gameclass.cuoPaiOneLayer"]){
            this.game.uimgr.uis["gameclass.cuoPaiOneLayer"].removeFromParent(true);
            this.game.uimgr.uis["gameclass.cuoPaiOneLayer"]=null;
        }
        var mycard=this.playerHeads[0].handCards.getChildren()[4];
        if(mycard){
            mycard.loadTextures(url,url,url,ccui.Widget.PLIST_TEXTURE);
        }
    }
};
gameclass.goldNysTable.prototype.openPokerAction=function(card,texture,_callBack){
    var scaleXIndex=1;
    var offset=0.15;
    var _pos=card.getPosition();
    card.setScale(scaleXIndex,1);
    var that=this;
    var callBack=function(dt){
        scaleXIndex-=offset;
        card.setScale(scaleXIndex,1);
        if(Math.abs(scaleXIndex-0)<offset){
            offset=-offset;
            card.loadTextures(texture,texture,texture,ccui.Widget.PLIST_TEXTURE);
        }
        if(scaleXIndex>1){
            card.setPosition(_pos);
            card.unschedule(callBack);
            card.addTouchEventListener(that.curUserCardTouchEvent ,that);
            if(_callBack){
                _callBack();
            }
        }
    }
    card.schedule(callBack,0.016);
};
gameclass.goldNysTable.prototype.showOpenCard = function(data){
    this.myCard = data.card;
    var _this = this;

    var _callBack0 = function(){
        _this.isShowCuoPaiLayer(false);
        _this.isShowLiangLayer(true);
        for(var i = 0;i < 5;i++){
            var btnUrl = _this.getCardUrlByNum(data.card[i]);
            _this.playerHeads[0].handCards.getChildren()[i].loadTextures(btnUrl,btnUrl,btnUrl,ccui.Widget.PLIST_TEXTURE);
        }

    }
    var _callBack1=function(){
        if(_this.mod_niuniu.roominfo.state!=0){
            _this.isShowCuoPaiLayer(false);
            _this.isShowLiangLayer(true);
        }
    }

    if(this.clickType == 0){
        var layout = new gameclass.cuoPLayer(this.myCard,_callBack0);//搓牌
        layout.setTag(1025);
        this.GameUIlayer.addChild(layout);
    }else{
        for(var i = 0;i < 5;i++){
            var spr = this.playerHeads[0].handCards.getChildren()[i];
            this.openPokerAction(spr,this.getCardUrlByNum(data.card[i]),_callBack1);//翻牌
        }
    }
}

gameclass.goldNysTable.prototype.onGameInitCard = function(player,playerdata,chairNum){
    player.handCards.removeAllChildren();
    var offset = chairNum == 0 ? 56 : 40;
    if(this.gameType == 2){
        var offset = chairNum == 0 ? 47 : 40;
    }
    playerdata.card=playerdata.card||[];
    for (var k = 0; k <playerdata.card.length; k++) {
        var spr = null;
        if (chairNum == 0) {
            goldNys_playerHead.curPlayCard[k] = playerdata.card[k];
            spr = this.crateBtnCard(playerdata.card[k]);
            //spr.setScale(1.6);
        } else {
            spr = this.crateBtnCard(playerdata.card[k]);
        }
        //spr.setPosition(-5 * offset / 2 + (k * offset) + offset / 2-5 * moveOffset / 2 + (k * moveOffset) + moveOffset / 2, 0);
        spr.setPosition(player.handCards.width/2+(k-2)*offset,player.handCards.height/2 );
        if(!playerdata.view){
            // spr.runAction(cc.moveBy(0.5, , 0));
        }else{
            var sprNiuNiu = new cc.Sprite();
            var cardType = this.mod_niuniu.ongetNiu(playerdata.card).type;
            if(this.mod_niuniu.uid != playerdata.uid){
                sprNiuNiu.setScale(0.8);
            }
            //sprNiuNiu.initWithSpriteFrameName("nn331_img_niu" + cardType + ".png");
            if(cardType <= 100){
                sprNiuNiu.initWithSpriteFrameName("nn331_img_niu" + cardType + ".png");
            }else{
                sprNiuNiu.initWithSpriteFrameName("type" + cardType + ".png");
            }

            sprNiuNiu.setPosition(cc.p(-10,-20));
            player.handCards.addChild(sprNiuNiu,220);
        }
        player.handCards.addChild(spr);
    }
};
gameclass.goldNysTable.prototype.getCardUrlByNum=function(card){
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
//gameclass.goldNysTable.prototype.reshowCallScore  = function() {
//    //cc.log("第2次叫分");
//    var _this = this;
//    this.userBetsCount.length = 0;
//    var node = new cc.Sprite(res.showcallScore02);
//    node.setPosition(this.node.getContentSize().width / 2, this.node.getContentSize().height / 2 + 150);
//    node.setScale(0.3);
//    this.node.addChild(node);
//    node.runAction(cc.sequence(cc.scaleTo(1, 1.5), new cc.CallFunc(function (tager) {
//        tager.removeFromParent();
//        _this.createProgressBar(_this.dealUid, false, "ProgressBar");//创建叫分进度框
//        if (_this.dealUid != _this.mod_niuniu.uid) {//除庄家外显示叫分
//            _this.isGameBetsShow(true);
//        }
//    })));
//};

gameclass.goldNysTable.prototype.onGameBets = function(data){
    //cc.log(data);
    for (var i = 0;i < goldNiuMaxNum;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && playerdata.uid == data.uid) {
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            mod_sound.playeffect(g_music["Man_jiabei"],false);
            this.playerHeads[index].call_scoreImg.setVisible(true);
            //this.playerHeads[i].call_scoreImg.getChildByName("label").setString(data.bets);
            this.playerHeads[index].call_scoreImg.loadTexture(res["callScore"+data.bets],ccui.Widget.LOCAL_TEXTURE);
            this.playerHeads[index].call_scoreImg.setScale(0);
            this.playerHeads[index].call_scoreImg.runAction(cc.scaleTo(0.8,1,1).easing(cc.easeElasticOut()));
            this.playerHeads[index].destroyProgress("ProgressBar");//销毁进度条
        }
    }
    var _isAllBets=true;
    for(var i=0;i<this.mod_niuniu.roominfo.person.length;i++){
        if(!this.mod_niuniu.roominfo.person[i].bets&&!this.mod_niuniu.roominfo.person[i].dealer){
            _isAllBets=false;
            break;
        }
    }
    if(_isAllBets){
        var that=this;
        var _callBack=function () {
            if(!that.mod_niuniu.serverchair&&that.mod_niuniu.serverchair!=0||that.mod_niuniu.roominfo.state==0) return;
            if(that.gameType == 0 || that.gameType == 2){
                that.isShowCuoPaiLayer(true);
            }
            that.createProgressBar(-1,true,"ProgressBar");
            that.isCardTouch = true;
        }
        if(this.gameType == 0 || this.gameType == 2){
            this.reSendCard(_callBack);
        }
    }
};
//dealUid:不等于dealUid创建进度条   isMingPai:true为亮牌 false为叫分阶段进度条  strName:进度条name
gameclass.goldNysTable.prototype.createProgressBar = function(dealUid,isMingPai,strName,time) {
    for (var i = 0;i < goldNiuMaxNum;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && playerdata.uid != dealUid) {
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            this.playerHeads[index].createProgress(isMingPai,strName,time);
        }
    }
};
gameclass.goldNysTable.prototype.isShowCuoPaiLayer=function(_isShow){
    if(_isShow){
        if(this.mod_niuniu.roominfo.state == 3){
            this.cuoPaiLayer.setVisible(true);
        }else{
            this.cuoPaiLayer.setVisible(false);
        }
    }else{
        this.cuoPaiLayer.setVisible(false);
    }
};
gameclass.goldNysTable.prototype.isShowLiangLayer=function(_isShow){
    if(_isShow){
        if(this.mod_niuniu.roominfo.state == 3){
            this.showCardLayer.setVisible(true);
        }else{
            this.showCardLayer.setVisible(false);
        }
    }else{
        this.showCardLayer.setVisible(false);
    }

}
gameclass.goldNysTable.prototype.showCallScore = function(dealUid,dataInfo,func) {
    //cc.log(dataInfo);
    var _this = this;

    _this.createProgressBar(dealUid,false,"ProgressBar");//创建叫分进度框
    var betsCount = 0;//玩家叫分数量
    for(var i = 0;i<dataInfo.length;i++){
        if(dataInfo[i].bets <= 0){
            if(dealUid != dataInfo[i].uid){
                if(dataInfo[i].uid == this.mod_niuniu.uid){
                    this.isGameBetsShow(true);
                }
            }
            betsCount++;
        }else{
            this.onGameBets({uid: dataInfo[i].uid, bets: dataInfo[i].bets}, dataInfo.length);
        }
    }
    //cc.log("betsCount="+betsCount);
    if(betsCount > 1){//大于1家没有叫分 则不会出现亮牌情况
        func = null;
    }
    if(func && this.userBetsCount.length >= dataInfo.length -1){
        //cc.log("叫完分,回调亮牌");
        func();
    }

};
gameclass.goldNysTable.prototype.curUserCardTouchEvent = function(sender, type) {
    var _this = this;
    if(!this.isCardTouch){
        return;
    }
    switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            //cc.log("TOUCH_ENDED");
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
gameclass.goldNysTable.prototype.findCalArr = function(arr,numble) {
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
gameclass.goldNysTable.prototype.setCalArrSum = function(arr) {
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

gameclass.goldNysTable.prototype.updataCalText = function(index,numble) {
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

gameclass.goldNysTable.prototype.setCalText = function(isUp,numble) {
    if(isUp){
        this.updataCalText(this.calIndex,numble);
        this.calArr[this.calIndex] = numble;
        this.calIndex++;
    }else{
        this.findCalArr(this.calArr,numble);
        this.calIndex--;
    }
    this.setCalArrSum(this.calArr);

};
gameclass.goldNysTable.prototype.onGameShowUserCard = function(info){
    var view=info.view;
    var uid=info.uid;
    var cardArr=info.card.slice();
    var cardType=info.ct;
    var laiZiIndex=0;
    if(this.gameType == 0 || this.gameType == 2){
        if(uid == this.mod_niuniu.uid){
            this.showCuoPaiOneLayer(false);
        }
    }
    if(!view){
        return;
    }
    if(cardType)
        if(!cardType) cardType=0;
    if(uid == this.mod_niuniu.uid){
        // this.btn_tishi.setVisible(false);
        // this.mingpai.setVisible(false);
    }
    var _NiuArr=[];
    //赖子值
    if(cardType>90 && cardType <= 100){
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
    for (var i = 0;i < goldNiuMaxNum;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if(playerdata && playerdata.uid == uid){
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            this.playerHeads[index].handCards.removeAllChildren();
            this.playerHeads[index].destroyProgress("ProgressBar");
            var offset = i==0? 56:40;

            var moveOffset=null;
            var cardArrSp=this.playerHeads[index].handCards.getChildren();
            for (var j = 0; j < 5; j++) {
                var cardNum=cardArr[j];
                if(!cardNum)cardNum=-1;
                if(cardArrSp[j]){
                    var spr = cardArrSp[j];
                    var btnUrl = this.getCardUrlByNum(cardNum);
                    spr.loadTextures(btnUrl,btnUrl,btnUrl,ccui.Widget.PLIST_TEXTURE);
                }else{
                    var spr = this.crateBtnCard(cardNum);
                    //if(i == 0) spr.setScale(1.6);
                    spr.setPosition(-cardLength * offset / 2 + (j * offset) + offset / 2, 0);
                    var moveX=-cardLength * moveOffset / 2 + (j * moveOffset) + moveOffset / 2;
                    if(cardType>90 && cardType<100 && j>=3){
                        var moveDel=i==0?40:30;
                        moveX+=moveDel;
                    }
                    var move1 = cc.moveBy(0.4,moveX , 0);
                    var isMove2 = false;
                    var move2 = cc.moveBy(0.2, 0, 20);
                    for(var k = 0;k < view.length;k++){
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

                    this.playerHeads[index].handCards.addChild(spr,210);
                }
            }
            if(cardType < 100){
                mod_sound.playeffect(g_music["niu_" + cardType + "_w"],false);
            }else{
                if(cardType == 100 || cardType == 400 ||cardType == 500 ||cardType == 700){
                    mod_sound.playeffect(goldniu_music["niu_" + cardType + "_w"],false);
                }
            }

            var animNode = new cc.Node();
            var typeAnim = new sp.SkeletonAnimation(res["jsonNiu"+cardType],res["atlasNiu"+cardType]);
            typeAnim.setAnimation(0, 'animation', false);
            animNode.addChild(typeAnim);
            animNode.setPosition(cc.p(-150,-20));
            this.playerHeads[index].handCards.addChild(animNode,220);

            var that=this;
            animNode.runAction(cc.sequence(cc.moveBy(0.4, 140, 0),cc.callFunc(function (){
                    if(cardType > 96){
                        var guangAnim = new sp.SkeletonAnimation(res.guangxiao_json,res.guangxiao_atlas);
                        guangAnim.setAnimation(0, 'animation', false);
                        guangAnim.setAnchorPoint(0.5,0.5);
                        guangAnim.setPosition(-10,-20);
                        guangAnim.setLocalZOrder(1000);
                        that.playerHeads[index].handCards.addChild(guangAnim);
                    }
                }
            )));
            break;
        }
    }
};


gameclass.goldNysTable.prototype.reconnGameDeal = function (dataInfo) {
    //cc.log(dataInfo);
    if(dataInfo.length <= 0){
        return;
    }
    for (var i = 0;i < goldNiuMaxNum;i++) {
        for (var j = 0;j < dataInfo.length;j++) {
            var playerdata = this.mod_niuniu.getplayerdata(i);
            if (playerdata && playerdata.uid == dataInfo[j].uid&&dataInfo[j].robdeal>=0) {
                var index = this.getSeat(playerdata.uid);
                if(index == -1) {
                    continue;
                }
                this.playerHeads[index].rob_zhuang_img.setVisible(true);
                //this.playerHeads[i].rob_zhuang_img.setTexture(res["img_qiangZhuang"+dataInfo[j].robdeal]);
                this.playerHeads[index].rob_zhuang_img.setTexture(res["callBet"+dataInfo[j].robdeal]);
                if(dataInfo[j].uid == this.mod_niuniu.uid){
                    this.isShowQiangZhuang(false);
                }
            }
        }
    }
};
//根据信息刷新桌面显示
gameclass.goldNysTable.prototype.updatePlayerShow = function () {
    this.unscheduleAllCallbacks();
    this.dealAnimationLayer.removeAllChildren();
    var _obj=this.mod_niuniu.roominfo;

    if(this.mod_niuniu.serverchair == null ){
        this.isGameReadyShow(true);
        this.btn_changeTable.setVisible(true);
        if(this.mod_niuniu.roominfo.state == 0 || this.mod_niuniu.roominfo.state == 4){
            this.ready.setBright(true);
            this.canReady = true;
        }else{
            this.ready.setBright(false);
            this.canReady = false;
        }
    }else{
        this.isGameReadyShow(false);
        if(_obj.state == 0){
            this.btn_changeTable.setVisible(true);
        }else{
            this.btn_changeTable.setVisible(false);
        }
    }
    this.isGameBetsShow(false);
    this.isShowQiangZhuang(false);
    this.isShowLiangLayer(false);
    for(var i=0;i < goldNiuMaxNum;i++) {
        this.playerHeads[i].rob_zhuang_img.setVisible(false);
        this.playerHeads[i].call_scoreImg.setVisible(false);
        this.playerHeads[i].zhuang_img.setVisible(false);
        this.playerHeads[i].handCards.removeAllChildren(true);
        this.playerHeads[i].ok_img.setVisible(false);
    }

    for(var i=0;i < goldNiuMaxNum;i++){
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if(playerdata){
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            this.onGameInitCard(this.playerHeads[index],playerdata,index);
        }
    }
    this.stateImg.loadTexture(res["niuniuState"+_obj.state],ccui.Widget.LOCAL_TEXTURE);
    //显示玩家的牌
    if(_obj.state != 0){
        this.payScore.setVisible(false);
    }
    if(_obj.state==0){
        //未开始或者已结束，这时候等待玩家准备
        var IsFull=true;
        for(var i = 0;i < goldNiuMaxNum;i++){
            var playerdata = this.mod_niuniu.getplayerdata(i);
            if(!playerdata){
                IsFull=false;
                continue;
            };
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            this.playerHeads[index].handCards.removeAllChildren(true);
            if(playerdata.ready){
                this.playerHeads[index].ok_img.setVisible(true);
                if(playerdata.uid == this.mod_niuniu.uid){
                    this.payScore.setVisible(false);
                }
            }else if(playerdata.uid == this.mod_niuniu.uid){
                this.isGameReadyShow(true);
                this.canReady = true;
            }
        }
    }else if(_obj.state==1){
        //开始了等待抢庄
        for(var i=0;i<goldNiuMaxNum;i++){
            var playerdata = this.mod_niuniu.getplayerdata(i);
            if(!playerdata)continue;
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            if(playerdata.robdeal>-1){
                this.playerHeads[index].rob_zhuang_img.setVisible(true);
                this.playerHeads[index].rob_zhuang_img.setTexture(res["callBet"+playerdata.robdeal]);
                this.playerHeads[index].light.setVisible(true);
            }else if(playerdata.uid==this.mod_niuniu.uid){
                this.qzbtnLayer.setVisible(true);
            }
            if(this.mod_niuniu.roominfo.time){
                this.createProgressBar(-1,true,"ProgressBar",this.mod_niuniu.roominfo.time);//创建叫分进度框
            }
        }

    }else if(_obj.state==2||_obj.state==3){
        //庄家确定了等待下注
        if(_obj.bets){
            this.canBets = _obj.bets;
        }
        var mydata = this.mod_niuniu.getplayerdata(0);
        for(var i=0;i < goldNiuMaxNum;i++){
            var playerdata = this.mod_niuniu.getplayerdata(i);
            if(!playerdata)continue;
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            if(playerdata.dealer){
                this.playerHeads[index].zhuang_img.setVisible(true);
                this.playerHeads[index].rob_zhuang_img.setVisible(true);
                this.playerHeads[index].rob_zhuang_img.setTexture(res["callBet"+playerdata.robdeal]);
                this.playerHeads[index].light.setVisible(true);
            }
            if(playerdata.bets>0){
                this.playerHeads[index].call_scoreImg.setVisible(true);
                this.playerHeads[index].call_scoreImg.loadTexture(res["callScore"+playerdata.bets],ccui.Widget.LOCAL_TEXTURE);
            }else if(playerdata.uid==this.mod_niuniu.uid&&!playerdata.dealer){
                this.isGameBetsShow(true);
            }
            if(_obj.state==3){
                if(this.gameType == 0 || this.gameType == 2){
                    this.isShowLiangLayer(!mydata.view);
                    if(playerdata.view){
                        var sprNiuNiu = new cc.Sprite();
                        if(playerdata.ct <= 100){
                            sprNiuNiu.initWithSpriteFrameName("nn331_img_niu" + playerdata.ct + ".png");
                        }else{
                            sprNiuNiu.initWithSpriteFrameName("type" + playerdata.ct + ".png");
                        }
                        //sprNiuNiu.initWithSpriteFrameName("nn331_img_niu" +playerdata.ct+ ".png");
                        if(this.mod_niuniu.selfdata && this.mod_niuniu.selfdata.uid!=playerdata.uid){
                            sprNiuNiu.setScale(0.8);
                        }
                        sprNiuNiu.setPosition(cc.p(-10,-20));
                        this.playerHeads[index].handCards.addChild(sprNiuNiu,220);
                    }else{
                        //if(this.mod_niuniu.serverchair != null){
                        //    if(playerdata.card.length < 5){
                        //        this.isShowCuoPaiLayer(true);
                        //    }else{
                        //        this.isShowLiangLayer(true);
                        //    }
                        //}
                    }
                }else{
                    if(mydata.open){
                        this.myCard = mydata.card;
                        this.isShowLiangLayer(true);
                    }else{
                        this.isShowCuoPaiLayer(true);
                    }
                    if(mydata.view){
                        this.isShowLiangLayer(false);
                    }
                }
            }
        }
        if(this.mod_niuniu.roominfo.time){
            var _dealNum=-1;
            for(var i=0;i<this.mod_niuniu.roominfo.person.length;i++){
                if(this.mod_niuniu.roominfo.person[i].dealer){
                    _dealNum=i;
                    break;
                }
            }
            this.createProgressBar(_dealNum,true,"ProgressBar",this.mod_niuniu.roominfo.time);//创建叫分进度框
        }
    }
},
    gameclass.goldNysTable.prototype.randomZhuangBlink = function (obj,_callback) {
        var blinkIndex=0;
        var _this=this;
        var lastBlinkNum=-1;
        var beiShu=-1;
        this._timeContain.setVisible(false);
        for(var i=0;i < goldNiuMaxNum;i++){
            var playerdata=_this.mod_niuniu.getplayerdata(i);
            if(playerdata && playerdata.uid==obj.uid){
                beiShu=playerdata.robdeal;
                break;
            }
        }
        var binkCallBack=function () {
            var _isZhuang=false;
            for(var i=lastBlinkNum+1;i<i+goldNiuMaxNum;i++){
                if(i>=goldNiuMaxNum)i-=goldNiuMaxNum;
                var data = _this.mod_niuniu.getplayerdata(i);
                if(data && data.robdeal == beiShu){
                    var index = _this.getSeat(data.uid);
                    if(index == -1) continue;
                    _this.playerHeads[index].light.setVisible(true);

                    lastBlinkNum = i;
                    for(var j = 0; j < goldNiuMaxNum; j++){
                        if( j != index){
                            _this.playerHeads[j].light.setVisible(false);
                        }
                    }
                    if(data.uid==obj.uid){
                        _isZhuang=true;
                    }
                    blinkIndex++;
                    break;
                }
            }
            if(blinkIndex > 12 && _isZhuang){
                for(var j=0;j < goldNiuMaxNum;j++){
                    _this.playerHeads[j].light.setVisible(false);
                }
                _this.onGameDealer(obj);
                _callback();
                _this.unschedule(binkCallBack);
            }
        }
        this.schedule(binkCallBack,0.1);
    },
//抢庄
gameclass.goldNysTable.prototype.onGameDeal = function (data) {
    for (var i = 0;i < goldNiuMaxNum;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && playerdata.uid == data.uid) {
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            this.playerHeads[index].rob_zhuang_img.setVisible(true);
            this.playerHeads[index].light.setVisible(true);
            this.playerHeads[index].rob_zhuang_img.setTexture(res["callBet"+data.score]);
            this.playerHeads[index].rob_zhuang_img.setScale(0);
            this.playerHeads[index].rob_zhuang_img.runAction(cc.scaleTo(0.8,1,1).easing(cc.easeElasticOut()));
            this.playerHeads[index].destroyProgress("ProgressBar");//销毁进度条
        }
    }

};
//确定庄家
gameclass.goldNysTable.prototype.onGameDealer = function (data) {
    this.dealUid = data.uid;
    this._timeContain.setVisible(true);
    for (var i = 0;i < goldNiuMaxNum;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata) {
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            if(playerdata.uid == this.dealUid){
                var sender = this.playerHeads[index].zhuang_img;
                sender.setScale(1.2);
                sender.runAction(cc.sequence(cc.scaleTo(0.3,0.9,0.9),cc.scaleTo(0.2,1,1)));
                sender.setVisible(true);
                if(playerdata.robdeal>0){
                    this.playerHeads[index].rob_zhuang_img.setVisible(true);
                    this.playerHeads[index].rob_zhuang_img.setTexture(res["callBet"+playerdata.robdeal]);
                    this.playerHeads[index].light.setVisible(true);
                }
            }else{
                this.playerHeads[index].rob_zhuang_img.setVisible(false);//隐藏抢庄
                this.playerHeads[index].light.setVisible(false);
            }
        }
    }
    this.isUserTouch(this.dealUid);//庄家可以进行牌的操作
    this.createProgressBar(this.dealUid,false,"ProgressBar");//创建叫分进度框
    this.canBets = data.bets;
    cc.log("xxxx:"+this.canBets);
    this.stateImg.loadTexture(res.niuniuState2,ccui.Widget.LOCAL_TEXTURE);
    if(this.dealUid != this.mod_niuniu.uid &&(this.mod_niuniu.serverchair||this.mod_niuniu.serverchair==0)){//除庄家外显示叫分
        this.isGameBetsShow(true);
    }
};
gameclass.goldNysTable.prototype.crateBtnCard = function(card) {
    var abcd = ["a","d","b","c"];
    var point = Math.floor(card/10);
    var type = card%10;
    var sprButton = null;
    var laiSp=null;
    if (!card||card<0){
        sprButton = new ccui.Button(res.pokerBei,res.pokerBei,res.pokerBei);
        sprButton.setTouchEnabled(false);
    }else{
        //var pngPath ="";
        //if(card==1000){
        //    pngPath="card_joker_gray.png";
        //    laiSp=new cc.Sprite(res.daLaiSp);
        //}else if(card==2000){
        //    laiSp=new cc.Sprite(res.xiaoLaiSp);
        //    pngPath="card_joker.png";
        //}else{
        //
        //}
        var pngPath = "card_" + point +  abcd[type - 1]+ ".png";
        sprButton = new ccui.Button(pngPath,pngPath,pngPath,ccui.Widget.PLIST_TEXTURE);
        sprButton.setTouchEnabled(true);
        if(laiSp){
            laiSp.setPosition(sprButton.width/2,sprButton.height);
            sprButton.addChild(laiSp);
        }
    }
    sprButton.setAnchorPoint(0.5,0.5);
    return sprButton;
};
gameclass.goldNysTable.prototype.setRoomRuleStr = function() {
    var type = parseInt(this.mod_niuniu.roominfo.type % 100 / 10) ;
    var arr = [50,100,200,300,500,1000];
    this.difen = arr[type];
    var wanfa = this.mod_niuniu.roominfo.type % 10;
    this.gameType = wanfa;
    cc.log("玩法:"+this.gameType);
    var brr = [0.35,0.5,0.35];
    ccui.helper.seekWidgetByName(this.node,"diFen").setTexture(res["nysDifen"+this.difen]);
    ccui.helper.seekWidgetByName(this.node,"payScore").setString("本场每局消耗"+Math.ceil(this.difen*brr[wanfa])+"金币");
}

gameclass.goldNysTable.prototype.runJuShuAction = function() {
    var sucAnim = new sp.SkeletonAnimation(res.duijukaishi_j, res.duijukaishi_a);
    sucAnim.setAnimation(0, 'animation', false);
    sucAnim.setAnchorPoint(0.5, 0.5);
    sucAnim.setPosition(1136/2,320);
    this.node.addChild(sucAnim);
}
gameclass.goldNysTable.prototype.cleanTableShow = function() {
    for(var i=0;i<goldNiuMaxNum;i++){
        this.playerHeads[i].zhuang_img.setVisible(false);
        this.playerHeads[i].rob_zhuang_img.setVisible(false);
        this.playerHeads[i].call_scoreImg.setVisible(false);
        this.playerHeads[i].handCards.removeAllChildren(true);
    }
    this.isGameReadyShow(false);
    this.qzbtnLayer.setVisible(false);
    this.isGameBetsShow(false);
    this.isShowCuoPaiLayer(false);
    this.isShowLiangLayer(false);
}
gameclass.goldNysTable.prototype.resetNiuNiuNext = function(){
    cc.log("next");

    goldNys_playerHead.curPlayCard.length = 0;
    this.calArr = [0,0,0];
    this.calIndex = 0;
    this.userBetsCount.length = 0;
    this.dealUid = 0;
    this.callScoreStage = 0;
    this.numObj.length = 0;
    for(var i = 0;i<this.calTextArr.length;i++){
        this.updataCalText(i,""+0);
    }
    for(var i = 0;i < goldNiuMaxNum;i++){
        this.playerHeads[i].handCards.removeAllChildren();
        this.playerHeads[i].call_scoreImg.setVisible(false);
        this.playerHeads[i].ok_img.setVisible(false);
        this.playerHeads[i].destroyProgress("ProgressBar");
    }
    this.isCardTouch = false;
};

gameclass.goldNysTable.prototype.updataUserScore = function(info){
    for (var i = 0;i < goldNiuMaxNum;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata) {
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            for(var j = 0;j<info.length;j++){
                if(playerdata.uid == info[j].uid){
                    this.playerHeads[index].score_text.setString(gameclass.changeShow(info[j].total));
                }
            }
        }
    }
};
gameclass.goldNysTable.prototype.goldFiy = function(data){
    data.sort(function(a,b){
        return Math.abs(a.score)-Math.abs(b.score);
    })
    var minScore = 0;
    for(var i = 0;i < data.length;i++){
        if(Math.abs(data[i].score) != 0){
            minScore = Math.abs(data[i].score);
            break;
        }
    }
    //var minScore=Math.abs(data[0].score);
    var dealUid=null;
    var dealUidPos=null;
    for(var i=0;i< goldNiuMaxNum;i++){
        var playerdata=this.mod_niuniu.getplayerdata(i);
        if(!playerdata) continue;
        var index = this.getSeat(playerdata.uid);
        if(index == -1) {
            continue;
        }
        if(playerdata.dealer){
            dealUid=playerdata.uid;
            dealUidPos=this.playerHeads[index]._pos;
            break;
        }
    }
    for(var i=0;i<data.length;i++){
        if(data[i].uid!=dealUid){
            var absScore=Math.abs(data[i].score);
            var num=parseInt(absScore/minScore)*2;
            var pos=null;
            for(var j=0;j< goldNiuMaxNum;j++){
                var playerdata=this.mod_niuniu.getplayerdata(j);
                if(!playerdata) continue;
                var index = this.getSeat(playerdata.uid);
                if(index == -1) {
                    continue;
                }
                if(playerdata.uid==data[i].uid){
                    pos=this.playerHeads[index]._pos;
                    break;
                }
            }
            var sp = null;
            if(data[i].score>0){
                sp=new goldSpLayer(res.niuniuAnimateGold,num,0.5,1,pos,dealUidPos);
                this.node.addChild(sp);
            }else{
                sp=new goldSpLayer(res.niuniuAnimateGold,num,0.5,0,dealUidPos,pos);
                this.node.addChild(sp);
            }
        }
    }
    var _this=this;
    this.scheduleOnce(function() {
        var Xarr = [150, 1000, 630, 260, 150];
        var Yarr = [120, 300, 530, 530, 300];
        for (var j = 0; j < data.length; j++) {
            for (var i = 0; i < goldNiuMaxNum; i++) {
                var playerdata = this.mod_niuniu.getplayerdata(i);
                if (playerdata && playerdata.uid == data[j].uid) {
                    var index = this.getSeat(playerdata.uid);
                    if(index == -1) {
                        continue;
                    }
                    if(_this.gameType == 2){
                        gameclass.showYSText(data[j].score,_this.playerHeads[index].node.getPosition(),this.GameUIlayer);
                    }else{
                        gameclass.showYSText(data[j].score,cc.p(Xarr[index],Yarr[index]),this.GameUIlayer);
                    }
                    _this._timeContain.setVisible(false);
                }
            }
        }

        var myScore = this.mod_niuniu.getplayerdata(0).score;
        if(myScore){
            this.playerEndAnim(myScore);
        }
    },2)
};
gameclass.goldNysTable.prototype.playerEndAnim = function(_score){
    if(_score == 0) return;
    var sucAnim = null;
    if(_score < 0){
        sucAnim = new sp.SkeletonAnimation(res.spineFail_j, res.spineFail_a);
        mod_sound.playeffect(g_music["loseMusic"]);
    }else{
        sucAnim = new sp.SkeletonAnimation(res.spineWin_j, res.spineWin_a);
        mod_sound.playeffect(g_music["winMusic"]);
    }
    sucAnim.setAnimation(0, 'animation', false);
    sucAnim.setAnchorPoint(0.5, 0.5);
    sucAnim.setPosition(1136/2,440);
    if(this.gameType == 2){
        sucAnim.setPosition(1136/2,320);
    }
    sucAnim.setTag(1122);
    this.node.addChild(sucAnim);
    this._timeContain.setVisible(false);
};
gameclass.goldNysTable.prototype.onGameNiuNiuEnd = function(data){
    var _this = this;
    this.endcoverLayer.setVisible(true);
    this.isShowLiangLayer(false);
    this.isGameBetsShow(false);
    this.isShowCuoPaiLayer(false);
    _this.goldFiy(data.info);
    _this.updataUserScore(data.info);
    _this.stateImg.loadTexture(res.niuniuState4,ccui.Widget.LOCAL_TEXTURE);
    _this._timeContain.setVisible(false);
    if(this.GameUIlayer.getChildByTag(1025)){
        this.GameUIlayer.getChildByTag(1025).removeFromParent(true);
    }
    this.scheduleOnce(function(){
        this.endcoverLayer.setVisible(false);
        for(var i = 0;i < goldNiuMaxNum;i++) {
            this.playerHeads[i].rob_zhuang_img.setVisible(false);
            this.playerHeads[i].call_scoreImg.setVisible(false);
            this.playerHeads[i].light.setVisible(false);
            this.playerHeads[i].zhuang_img.setVisible(false);
        }
        if(_this.mod_niuniu.serverchair == null ){
            if(this.mod_niuniu.roominfo.person.length < goldNiuMaxNum){
                this.isGameReadyShow(true);
                this.canReady = true;
                this.ready.setBright(true);
            }else{
                this.isGameReadyShow(false);
                this.canReady = false;
                this.ready.setBright(false);
            }
        }else{
            this.isGameReadyShow(true);
            this.canReady = true;
            this.ready.setBright(true);
        }
        this.btn_changeTable.setVisible(true);
    },3.5);
};

gameclass.goldNysTable.prototype.NiuNiuInit = function(){
    var _this = this;
    _this.node = this.game.uimgr.createnode(res.goldNysTable,true);
    _this.node.setPosition((cc.winSize.width - this.node.getContentSize().width)/2,0);
    _this.addChild(_this.node);
    this.node.setTag(30000);
    _this.node.scheduleUpdate();
    _this.node.update=this.updateTime.bind(this);

    _this.Uilayer = ccui.helper.seekWidgetByName(_this.node, "UI");
    _this.Gamelayer = ccui.helper.seekWidgetByName(_this.node, "Game");
    _this.GameUIlayer = ccui.helper.seekWidgetByName(_this.node, "GameUI");
    //_this.playerLayer = ccui.helper.seekWidgetByName(_this.node,"playerLayer");

    _this.endcoverLayer = ccui.helper.seekWidgetByName(_this.Gamelayer , "endcover");
    _this.endcoverLayer.setVisible(false);

    _this.dealAnimationLayer = new cc.Node();
    _this.chatAnimationLayer=ccui.helper.seekWidgetByName(_this.node, "animateLayer");

    this.player5Layer = ccui.helper.seekWidgetByName(this.node,"playerLayer5");
    this.player8Layer = ccui.helper.seekWidgetByName(this.node,"playerLayer8");

    this._timeContain = this.GameUIlayer.getChildByName("readyMovie");
    this._timerControl = new gameclass.timeTextControl(this._timeContain, res.goldTimeBar);
    this.stateImg = ccui.helper.seekWidgetByName(this.node,"Image_6");
    this.btn_changeTable = ccui.helper.seekWidgetByName(this.node,"changetab");

    cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
    cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist1);
    cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist2);
    cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist3);
    cc.spriteFrameCache.addSpriteFrames(res.niuniuCountPlist);
    cc.spriteFrameCache.addSpriteFrames(res.goldniuniuCountPlist);
    _this.dealAnimationLayer.setPosition(0,0);
    _this.node.addChild(_this.dealAnimationLayer,200);

    _this.ready = ccui.helper.seekWidgetByName(_this.node, "beginBtn");
    _this.ready.addTouchEventListener(function(sender, type){
        if (type == ccui.Widget.TOUCH_ENDED) {
            if(_this.canReady){
                _this.mod_niuniu.gameready();
            }else{
                gameclass.showText("请等待本局结束");
            }
        }
    })
    this.payScore = ccui.helper.seekWidgetByName(this.node,"payScore");
    _this.gamebets = ccui.helper.seekWidgetByName(_this.node, "gamebets");
    _this.isGameBetsShow(false);
    _this.qzbtnLayer=ccui.helper.seekWidgetByName(_this.node, "QZbtnLayer");
    _this.qzbtnLayer.setVisible(false);
    _this.showCardLayer=ccui.helper.seekWidgetByName(_this.node, "btn_showCardLayer");
    _this.isShowLiangLayer(false);
    _this.cuoPaiLayer=ccui.helper.seekWidgetByName(_this.node, "btn_cuoPaiLayer");
    _this.isShowCuoPaiLayer(false);
    this.btn_tuizhu = ccui.helper.seekWidgetByName(this.node,"btn_tuizhu");
    this.btn_tuizhu.setVisible(false);
    this.talkPos = [cc.p(75,125),cc.p(1050,350),cc.p(700,490),cc.p(330,490),cc.p(130,350)];

    this.btn_layer = new gameclass.btn_setLayer(this.node,this.game);
    this.btn_layer.setgoldtype(gameclass.gameGoldNiu);
    this.node.addChild(this.btn_layer);
    this.btn_layer.setLocalZOrder(999);

    this.safeLayer = new gameclass.checkSafeLayer(this.node,this.game,
    ccui.helper.seekWidgetByName(this.btn_layer,"btn_safe"));
    this.safeLayer.setName("safeLayer");
    this.node.addChild(this.safeLayer);

    for(var i = 0;i < 5;i++){
        var btn = this.gamebets.getChildren()[i];
        btn.bet = (i+1);
        btn.addTouchEventListener(function(sender,type){
            if(type == ccui.Widget.TOUCH_ENDED){
                _this.mod_niuniu.gamebets(sender.bet);
            }
        })
    }

    for(var i=0;i<_this.cuoPaiLayer.getChildren().length;i++){
        if(i==0){
            _this.cuoPaiLayer.getChildren()[i].addTouchEventListener(function(sender,type){
                if (ccui.Widget.TOUCH_ENDED == type) {
                    if(_this.gameType == 0 || _this.gameType == 2){
                        _this.onGameCuoCard();
                    }else{
                        _this.clickType = 0;
                        _this.mod_niuniu.sendOpen();
                    }

                }
            });
        }else{
            _this.cuoPaiLayer.getChildren()[i].addTouchEventListener(function(sender,type){
                if (ccui.Widget.TOUCH_ENDED == type) {
                    if(_this.gameType == 0 || _this.gameType == 2){
                        _this.onGameSendOtherCard();
                    }else{
                        _this.clickType = 1;
                        _this.mod_niuniu.sendOpen();
                    }
                }
            });
        }
    }
    for(var i=0;i<_this.showCardLayer.getChildren().length;i++){
        if(i==0){
            _this.showCardLayer.getChildren()[i].addTouchEventListener(this.tiShiCallBack.bind(this));
        }else{
            _this.showCardLayer.getChildren()[i].addTouchEventListener(function(sender,type){
                if (ccui.Widget.TOUCH_ENDED == type) {
                    _this.mod_niuniu.gameview();
                }
            });
        }
    }

    gameclass.createbtnpress( this.node, "changetab", function () {
        _this.mod_niuniu.roominfo.goldchang = true;
        _this.mod_niuniu.dissmissroom();
    });

    var _childArr=_this.qzbtnLayer.getChildren();
    for (var i=0;i<_childArr.length;i++){
        var nodeName=_childArr[i].getName();
        var _index=nodeName.split("_")[1];
        gameclass.createbtnpress(this.node, nodeName, function (_1, _2, index) {
            _this.mod_niuniu.gamedealer(index);
            //_this.qzbtnLayer.setVisible(false);
        }, null, null, _index);
    }
};
gameclass.goldNysTable.prototype.tiShiCallBack=function(sender,type){
    if (ccui.Widget.TOUCH_ENDED == type) {
        var mydata = this.mod_niuniu.getplayerdata(0);
        var _obj = this.mod_niuniu.ongetNiu(mydata.card);
        var showStr = "";
        switch (_obj.type) {
            case 0:
                showStr = "很遗憾，你没有牛哟！";
                break;
            case 91:
                showStr = "牛一！";
                break;
            case 92:
                showStr = "牛二！";
                break;
            case 93:
                showStr = "牛三！";
                break;
            case 94:
                showStr = "牛四！";
                break;
            case 95:
                showStr = "牛五！";
                break;
            case 96:
                showStr = "牛六！";
                break;
            case 97:
                showStr = "牛七！";
                break;
            case 98:
                showStr = "恭喜你，你的牌为牛八！";
                break;
            case 99:
                showStr = "恭喜你，你的牌为牛九！";
                break;
            case 100:
                showStr = "恭喜你，你的牌为牛牛";
                break;
            case 200:
                showStr = "运气好极了，你的牌为顺子牛！";
                break;
            case 300:
                showStr = "运气吊爆了，你的牌为五花牛！";
                break;
            case 400:
                showStr = "财神爷驾到，你的牌为同花牛！";
                break;
            case 500:
                showStr = "财神爷驾到，你的牌为五小牛！";
                break;
            case 600:
                showStr = "财神爷驾到，你的牌为葫芦牛！";
                break;
            case 700:
                showStr = "财神爷驾到，你的牌为炸弹牛！";
                break;
            case 800:
                showStr = "财神爷驾到，你的牌为顺金牛！"
        }
        var mycardArr = [];
        for (var i = 0; i < mydata.card.length; i++) {
            mycardArr[i] = mydata.card[i];
            this.playerHeads[0].handCards.getChildren()[i].y = 0;
        }
        if (_obj.cardArr.length) {
            for (var i = 0; i < _obj.cardArr.length; i++) {
                for (var j = 0; j < mycardArr.length; j++) {
                    if (parseInt(mycardArr[j] / 10) == _obj.cardArr[i]) {
                        this.playerHeads[0].handCards.getChildren()[j].y = 20;
                        mycardArr[j] = 0;
                        break;
                    }
                }
            }
        }
        this.showToast(showStr, 2);
    }
};

gameclass.goldNysTable.prototype.isShowQiangZhuang = function(b) {
    if(b){
        if(!this.mod_niuniu.serverchair&&this.mod_niuniu.serverchair!=0){
            this.qzbtnLayer.setVisible(false);
            return ;
        }
        var num = 4;
        var childarr=this.qzbtnLayer.getChildren();
        this.qzbtnLayer.x=cc.winSize.width/2;
        this.qzbtnLayer.x+=((4-num)*65);
        for(var i=0;i<childarr.length;i++){
            if(i<=num){
                childarr[i].setVisible(true);
            }else{
                childarr[i].setVisible(false);
            }
        }
        if(this.mod_niuniu.roominfo.state == 1){
            this.qzbtnLayer.setVisible(true);
        }else{
            this.qzbtnLayer.setVisible(false);
        }
    }else{
        this.qzbtnLayer.setVisible(false);
    }


};
gameclass.goldNysTable.prototype.isGameReadyShow = function(b) {
    if(b){
        if(this.mod_niuniu.roominfo.state == 0){
            this.ready.setVisible(true);
        }else{
            this.ready.setVisible(false);
        }
    }else{
        this.ready.setVisible(false)
    }

};
gameclass.goldNysTable.prototype.isGameBetsShow = function(b) {
    if(this.canBets){
        var pos = 1136/2 + (5-this.canBets)*55;
        this.gamebets.setPositionX(pos);
        for(var i = 0;i < 5;i++){
            this.gamebets.getChildren()[i].setVisible(i < this.canBets);
        }
    }
    if(b){
        if(this.mod_niuniu.roominfo.state == 2){
            this.gamebets.setVisible(true);
        }else{
            this.gamebets.setVisible(false);
        }
    }else{
        this.gamebets.setVisible(false);
    }

}
gameclass.goldNysTable.prototype.showToast = function(_text,delay){
    if(this.node.getChildByTag(123456)){
        return;
    }
    var _this = this;
    //var node = new cc.Sprite(res.img_input);
    var node = new ccui.ImageView(res.img_input,ccui.Widget.LOCAL_TEXTURE);
    node.setScale9Enabled(true);
    node.setContentSize(650,80);
    node.setPosition(_this.node.getContentSize().width / 2,200);
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
gameclass.goldNysTable.prototype.uniq = function(arr1,arr2) {
    var arr = [];
    for (var i = 0; i < arr1.length; i++) {
        if (0 > arr2.indexOf(arr1[i])) {
            arr.push(arr1[i]);
        }
    }
    return arr;
};

gameclass.goldNysTable.prototype.timeState = function(){
    var titiletime =  ccui.helper.seekWidgetByName(this.node, "time");
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

gameclass.goldNysTable.prototype.onchat = function(data){
    cc.log(data)
    var _this = this;
    for(var i = 0;i < 12; i++){
        if(g_chatstr_nys[i] == data.chat){
            mod_sound.playeffect(this.getSex(data.uid)==0?nys_manTalk[i]:nys_womanTalk[i]);
        }
    }
    var arr = [
        res.chatbg_ld,
        res.chatbg_rd,
        res.chatbg_ud1,
        res.chatbg_ud1,
        res.chatbg_ld,
    ];
    if(this.gameType == 2){
        arr = [
            res.chatbg_ld,
            res.chatbg_rd,
            res.chatbg_rd,
            res.chatbg_ud,
            res.chatbg_ud1,
            res.chatbg_ud1,
            res.chatbg_ld,
            res.chatbg_ld,
        ]
    }
    for (var i = 0;i < goldNiuMaxNum;i ++) {
        var player = _this.mod_niuniu.getplayerdata(i);
        if (player != null && player.uid == data.uid) {
            var index = this.getSeat(player.uid);
            if(index == -1) {
                continue;
            }
            var talkPos = _this.talkPos[index];
            if (data.type < 4) {
                var _node = new ccui.Layout();
                var s9 = null;
                if (data.type == 1) {
                    s9 = new cc.Scale9Sprite(arr[index]);
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
                    var type = Number(data.chat);

                    var spine = new sp.SkeletonAnimation(g_chat_expression["expression"+type+"_json"],g_chat_expression["expression"+type+"_atlas"]);
                    spine.setAnimation(0, 'animation', false);
                    spine.setAnchorPoint(0.5, 0.5);

                    s9 = new ccui.Layout();
                    s9.setContentSize(110, 100);
                    s9.setBackGroundImage(arr[index]);
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
                if(this.gameType == 2){
                    if( index < 4 && index > 0){
                        _node.setPosition(talkPos.x - s9.width, talkPos.y);
                    }else{
                        _node.setPosition(talkPos);
                    }
                }else{
                    if (index == 1) {
                        _node.setPosition(talkPos.x - s9.width, talkPos.y);
                    } else {
                        _node.setPosition(talkPos);
                    }
                }

                _this.node.addChild(_node);
                var seq = cc.sequence(cc.delayTime(2), cc.callFunc(function () {
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
                var senderPos=_this.playerHeads[index]._pos;
                _animateNode.setPosition(senderPos);
                var hitPos=null;
                for (var j = 0;j < goldNiuMaxNum;j ++) {
                    var player = _this.mod_niuniu.getplayerdata(j);

                    if(player&&player.uid==_senderObj.hitUid){
                        var index = this.getSeat(player.uid);
                        if(index == -1) {
                            continue;
                        }
                        hitPos=this.playerHeads[index]._pos;
                        break;
                    }
                }
                this.chatAnimationLayer.addChild(_animateNode);
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
gameclass.goldNysTable.prototype.getSex = function(uid){
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

gameclass.goldNysTable.prototype.checkSafe = function (people) {
    this.safeLayer.checkSafe(people);
};

/*
 * 开局后 玩家掉线
 * */
gameclass.goldNysTable.prototype.userLineOut = function (index, data) {
    index = this.getSeat(data.uid);
    if(index == -1) {
        return;
    }
    if (data.line) {
        this.playerHeads[index].off_line.setVisible(false);
    } else {
        this.playerHeads[index].off_line.setVisible(true);
    }
    gameclass.mod_base.showtximg(this.playerHeads[index].head_img,this.playerHeads[index].head_url, 0, 0, "im_headbg5", !data.line);
};

gameclass.goldNysTable.prototype.reflashAllMoeny = function(data){
    for(var i = 0;i < data.length ;i++){
        var index = this.getSeat(data[i].uid);
        if(index == -1) {
            continue;
        }
        this.playerHeads[index].score_text.setString(gameclass.changeShow(data[i].total));
    }
};








