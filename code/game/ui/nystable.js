/**
 * Created by yang on 2016/11/9.
 */
var NYSMAX_PLAY_LENGTH=8;
var nys_playerHead = cc.Class.extend({
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
    playerData:null,
    ccc:null,
    cuoStateIndex:null,
    isShow:false,

    ctor: function (node,index,parent,gameUi,playerData,notifynodeIndex) {
        this.gameUi=gameUi;
        this.playerData=playerData;
        this.node = node.getChildByName('head');
        this._icon=ccui.helper.seekWidgetByName(this.node,"icon");
        this._pos = this._icon.getParent().convertToWorldSpace(this._icon.getPosition());
        this.index = index;
        this.name_text = this.node.getChildByName('playername');
        this.ok_img = this.node.getChildByName('ok');
        this.head_img =  this.node.getChildByName('icon');
        this.id_text = this.node.getChildByName("playerid");
        this.score_text = this.node.getChildByName('playerscore');
        this.call_scoreImg = this.node.getChildByName('call_score');
        this.zhuang_img = this.node.getChildByName('zhuang');
        this.rob_zhuang_img =  this.node.getChildByName('rob_zhuang');
        this.handCards = ccui.helper.seekWidgetByName( parent, "notifynode"  + notifynodeIndex);
        this.off_line = this.node.getChildByName("off_line");
        this.cuoPaiStatePanel = ccui.helper.seekWidgetByName( this.node, "cuoPaiStateLabel");
        this.cuoPaiStatePanel.setVisible(false);
        ccui.helper.seekWidgetByName(this.node,"light").setVisible(false);
        this.light = this.node.getChildByName('light');

        this.ccc = this.node.getChildByName('ccc');
        this.node.schedule(this.cuoPaiAnimateUpdate.bind(this),0.5);

        this.SAFE_COLORL = cc.color(255, 255, 255);
        this.DANGER_COLOR = cc.color(165, 42, 42);

        this.S_UNKNOWN = "未知";

        this.init();
    },
    createProgress : function(strName,time){
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
            // _this.objToMingPai();
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
        for(var i = 0;i < NYSMAX_PLAY_LENGTH; i++){
            lst[i] = false;
        }
        var isMaxNiu = mod_compare.gettype(nys_playerHead.curPlayCard,lst);
        nys_playerHead.Play_mod_niuniu.gameview(isMaxNiu, nys_playerHead.curPlayCard);

    },
    init:function(){
        this.ok_img.setVisible(false);
        this.rob_zhuang_img.setVisible(false);
        this.call_scoreImg.setVisible(false);
        this.zhuang_img.setVisible(false);
        this.zhuang_img.setLocalZOrder(100);
        this.node.setVisible(false);
        this.score_text.setString("0");
        this.handCards.setLocalZOrder(1000);
        this.light.setVisible(false);
        var _this=this;
        this.ccc.addTouchEventListener(function (sender, type) {

            if (ccui.Widget.TOUCH_ENDED == type) {
                if(this.index==0) return;
                this.gameUi.game.uimgr.showui("gameclass.chatMicLayer");
                var seat = this.gameUi.playerSeat;
                var uid = seat[this.index];
                var playerdata = this.gameUi.mod_niuniu.getplayerdatabyuid(uid);
                this.gameUi.game.uimgr.uis["gameclass.chatMicLayer"].setPlayerInfo(playerdata,this.gameUi.mod_niuniu);
            }
        }, this);
    },
    showCuoPaiState:function(bool){
        this.cuoStateIndex=0;
        this.cuoPaiStatePanel.setVisible(bool);
        this.cuoPaiAnimateUpdate();
    },
    cuoPaiAnimateUpdate:function(){
        if(this.cuoPaiStatePanel&&this.cuoPaiStatePanel.isVisible()){
            var childArr=this.cuoPaiStatePanel.getChildren();
            for(var i=0;i<childArr.length;i++){
                childArr[i].stopAllActions();
                childArr[i].y=this.cuoPaiStatePanel.height/2;
            }
            if(childArr[this.cuoStateIndex]){
                var pos=childArr[this.cuoStateIndex].getPosition();
                childArr[this.cuoStateIndex].runAction(cc.jumpTo(0.5,pos,20,1));
            }
            this.cuoStateIndex++;
            if(this.cuoStateIndex>=5) this.cuoStateIndex=0;
        }
    },
});
var goldSpLayer=cc.Layer.extend({
    _iconImageStr:null,
    _speed:null,
    _endPos:null,
    startPos:null,
    ctor:function(_str,_num,_speed,_dealTime,_endPos,startPos){
        this._super()
        this._endPos=_endPos;
        this._iconImageStr=_str;
        this.startPos=startPos;
        this.setTag(1111);
        this._speed=_speed;
        if(_num>20) _num=20;
        if(!_dealTime) _dealTime=0;
        //cc.log(_dealTime);
        this.schedule(this._addSp,0.1,_num,_dealTime);
    },
    _addSp:function(){
        var _sp=new cc.Sprite(this._iconImageStr);
        _sp.setPosition(this.startPos);
        _sp.runAction(cc.sequence(cc.moveTo(this._speed,this._endPos),cc.callFunc(function(){
            _sp.removeFromParent(true);
        },_sp)));
        this.addChild(_sp);
    },
})
nys_playerHead.curPlayCard = [];
nys_playerHead.Play_mod_niuniu = null;
gameclass.nystable = gameclass.baseui.extend({
    sprite: null,
    node:null,
    //mod_niuniu:null,
    ongameview_attr:null,
    curround:null,
    ready:null,
    invitebtn:null,
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
    updataTimer:null,
    playerSeat:null,
    //onchat:null,
    ctor: function () {
        //cc.log("niuniu ctor");
        this._super();
        this.playerHeads = [];
        this.userBetsCount = [];
        this.updataTimer   = 0;
        this.playerSeat =[];
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
        //cc.log("niuniu setmod");
        this.mod_niuniu = _mod_niuniiu;
        nys_playerHead.Play_mod_niuniu = _mod_niuniiu;
        var _this = this;
        this.mod_niuniu.bindUI(_this);
        NYSMAX_PLAY_LENGTH=8;
        cc.log("游戏类型:"+this.mod_niuniu.roominfo.type)
        if(this.mod_niuniu.roominfo.type != gameclass.gamebrnys){
            for (var i = 0;i < NYSMAX_PLAY_LENGTH; i++){
                var unode = ccui.helper.seekWidgetByName(_this.node, "UserNode" + i);
                var cnode = ccui.helper.seekWidgetByName(_this.node, "notifynode" + i);
                if(i==2||i==6) {
                    unode.setVisible(false);
                    continue;
                }
                if(i==1||i==7){
                    unode.y+=50;
                    cnode.y+=50;
                }
                var shuzuNum=i;
                if(i>6) shuzuNum-=2;
                else if(i>2) shuzuNum-=1;
                _this.playerHeads[shuzuNum] = new nys_playerHead( unode,shuzuNum,_this.node,_this,null,i);
            }
            NYSMAX_PLAY_LENGTH=6;
        }else{
            for (var i = 0;i < NYSMAX_PLAY_LENGTH; i++){
                var shuzuNum=i;
                var unode = ccui.helper.seekWidgetByName(_this.node, "UserNode" + i);
                _this.playerHeads[shuzuNum] = new nys_playerHead( unode,shuzuNum,_this.node,_this,null,shuzuNum);
            }
            NYSMAX_PLAY_LENGTH = 8;
        }
        for(var i = 0;i < NYSMAX_PLAY_LENGTH;i++){
            this.playerSeat[i] = 0;
        }
        if(window.wx) {
            _this.share();
        }
        _this.micLayerState();
        _this.timeState();
        ccui.helper.seekWidgetByName(_this.node, "roomnum").setString("房间号:"+_this.mod_niuniu.roominfo.roomid.toString());
        this.refreshStep();
        this.setRoomRuleStr();
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
    updateTime:function(dt){
        this.updataTimer+=dt;
        this._timerControl.update();
    },
    destroy: function () {
        this._timerControl.destroy();
    },
});

gameclass.nystable.prototype.changeSeat = function(orginalSeat){
    var curSeat = -1;
    if(this.mod_niuniu.roominfo.type != gameclass.gamebrnys){
        if(orginalSeat > 6) orginalSeat -= 2;
        else if(orginalSeat > 2) orginalSeat-= 1;
        if(orginalSeat == 0) curSeat = 0;
        else if(orginalSeat == 1) curSeat = 3;
        else if(orginalSeat == 2) curSeat = 1;
        else if(orginalSeat == 3) curSeat = 4;
        else if(orginalSeat == 4) curSeat = 2;
        else if(orginalSeat == 5) curSeat = 5;
    }else{
        if(orginalSeat == 0) curSeat = 0;
        else if(orginalSeat == 1) curSeat = 4;
        else if(orginalSeat == 2) curSeat = 1;
        else if(orginalSeat == 3) curSeat = 5;
        else if(orginalSeat == 4) curSeat = 2;
        else if(orginalSeat == 5) curSeat = 6;
        else if(orginalSeat == 6) curSeat = 3;
        else if(orginalSeat == 7) curSeat = 7;
    }
    return curSeat;
};

gameclass.nystable.prototype.onGameReady = function (data) {
    for (var i = 0;i < NYSMAX_PLAY_LENGTH;i++){
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && data == playerdata.uid){
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            this.playerHeads[index].ok_img.setVisible(true);
            this.playerHeads[index].ok_img.setScale(3);
            this.playerHeads[index].ok_img.runAction(cc.scaleTo(0.2,1,1));
            if(this.node.getChildByTag(1122)){
                this.node.getChildByTag(1122).removeFromParent(true);
            }
        }
    }
    this.changeBeginShow();
};
gameclass.nystable.prototype.changeBeginShow=function(){
    this.beginBtn.setVisible(false);
    var playerNum=0;
    for(var i=0;i<this.mod_niuniu.roominfo.person.length;i++){
        if(!this.mod_niuniu.roominfo.person[i].ready) {
            return
        };
        playerNum++;
    }
    if(this.mod_niuniu.uid==this.mod_niuniu.roominfo.host&&playerNum>=2&&!Boolean(parseInt(this.mod_niuniu.roominfo.param1/1000)%10)){
        this.beginBtn.setVisible(true);
    }
};
gameclass.nystable.prototype.resetIcon = function(uid) {
    for (var i = 0; i < NYSMAX_PLAY_LENGTH;i++){
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if(playerdata == null) {
            continue;
        }
        var index = this.getSeat(playerdata.uid);
        if(playerdata.uid != uid) {
            continue;
        }
        gameclass.mod_base.showtximg(this.playerHeads[index].head_img, playerdata.imgurl, 0, 0,"im_headbg5", playerdata.ip == "")
        break;
    }
};
gameclass.nystable.prototype.onGameNiuniuInfo = function(data){
    var readyArr=[];
    for(var i=0;i<data.info.length;i++){
        readyArr[i]={uid:data.info[i].uid,ready:data.info[i].ready};
    }
    this.initReadyUser(readyArr);//是否已准备
    this.refreshStep();
    this.updataUserScore(data.info);
    if(data.time)
    //this.createProgressBar(-1,"ProgressBar",data.time);
        if(this.mod_niuniu.roominfo.step > 0){
            this.invitebtn.setVisible(false);
        }
    if(data.begin){
        this.isGameReadyShow(false);
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
gameclass.nystable.prototype.initReadyUser = function(dataReady){
    for(var i = 0;i<dataReady.length;i++){
        for (var j = 0;j < NYSMAX_PLAY_LENGTH;j++) {
            var playerdata = this.mod_niuniu.getplayerdata(j);
            if(playerdata){
                var index = this.getSeat(playerdata.uid);
                if(index == -1) {
                    continue;
                }
                if(playerdata.uid == dataReady[i].uid){
                    this.playerHeads[index].ok_img.setVisible(true);
                }
            }
        }
    }
};

gameclass.nystable.prototype.getSeat = function(uid) {
    if(uid == this.mod_niuniu.uid) {
        return 0;
    }

    for(var i = 1; i < NYSMAX_PLAY_LENGTH; i++) {
        if(this.playerSeat[i] == uid) {
            return i;
        }
    }

    return -1;
};
gameclass.nystable.prototype.setSeat = function(uid) {
    if(uid == this.mod_niuniu.uid) {
        return;
    }

    //如果这个uid已经有位置
    for(var i = 1; i < NYSMAX_PLAY_LENGTH; i++) {
        var curIndex = this.changeSeat(i);
        if(this.playerSeat[curIndex] == uid) {
            return;
        }
    }
    //
    for(var i = 1; i < NYSMAX_PLAY_LENGTH; i++) {
        var curIndex = this.changeSeat(i);
        if(this.playerSeat[curIndex] == 0) {
            this.playerSeat[curIndex] = uid;
            return;
        }
    }
};

gameclass.nystable.prototype.updataRoomUserInfo = function(){
    for(var i = 1; i < NYSMAX_PLAY_LENGTH; i++) {
        var curIndex = this.changeSeat(i);
        if(this.playerSeat[curIndex] == 0) {
            continue;
        }
        var find = false;
        for (var j = 0;j < NYSMAX_PLAY_LENGTH;j++) {
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

    for (var i = 0;i < NYSMAX_PLAY_LENGTH;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if(!playerdata) {
            continue;
        }
        this.setSeat(playerdata.uid);
    }

    var tmp = [];
    for(var i = 0; i < NYSMAX_PLAY_LENGTH; i++) {
        tmp.push(0);
    }

    for (var i = 0;i < NYSMAX_PLAY_LENGTH;i++){
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata){
            var index = this.getSeat(playerdata.uid);
            if(index == -1){
                continue;
            }
            tmp[index]=1;

            if(playerdata.uid==this.mod_niuniu.uid){
                this.seatDownBtn.setVisible(false);
            }
            //if(this.mod_niuniu.roominfo.state==0){
            //    this.playerHeads[index].handCards.removeAllChildren();
            //    if(playerdata&&playerdata.card&&playerdata.card.length){
            //        this.onGameInitCard(this.playerHeads[index],playerdata,index);
            //    }
            //}
            this.playerHeads[index].destroyProgress("ProgressBar");
            this.playerHeads[index].node.setVisible(true);
            this.playerHeads[index].isShow = true;
            this.playerHeads[index].name_text.setString(playerdata.name);
            this.playerHeads[index].id_text.setString("ID:"+playerdata.uid);
            this.playerHeads[index].ok_img.setVisible(playerdata.ready);
            this.playerHeads[index].off_line.setVisible(!playerdata.line);
            this.playerHeads[index].head_url = playerdata.imgurl || "";
            if(!playerdata.total)playerdata.total=0;
            this.playerHeads[index].score_text.setString(""+playerdata.total);
            if(playerdata.dealer)this.playerHeads[index].zhuang_img.setVisible(true);

            gameclass.mod_base.showtximg(this.playerHeads[index].head_img, playerdata.imgurl, 0, 0,"im_headbg5", playerdata.ip == "");
        }
        //else{
        //    this.playerHeads[i].handCards.removeAllChildren();
        //    this.playerHeads[i].node.setVisible(false);
        //}
    }
    this.changeBeginShow();

    for(var i = 0; i < NYSMAX_PLAY_LENGTH; i++) {
        //var curIndex = this.changeSeat(i);
        if(tmp[i] == 0) {
            this.playerHeads[i].isShow = false;
            this.playerHeads[i].handCards.removeAllChildren();
            this.playerHeads[i].node.setVisible(false);
        }
    }
};

gameclass.nystable.prototype.showCurDealer = function(dataInfo){
    var dealerUid = 0;
    for (var i = 0;i < dataInfo.length;i++){
        if(dataInfo[i].dealer){
            dealerUid = dataInfo[i].uid;
            break;
        }
    }
    for (var i = 0;i < NYSMAX_PLAY_LENGTH;i++){
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata) {
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            if (playerdata.uid == dealerUid) {
                this.playerHeads[index].zhuang_img.setVisible(true);
            } else {
                this.playerHeads[index].zhuang_img.setVisible(false);
            }
        }
    }
};
gameclass.nystable.prototype.initcallScoreStage = function(dataInfo){
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
    //cc.log("initcallScoreStage="+this.callScoreStage);
    //cc.log(this.numObj);
};
gameclass.nystable.prototype.onGameNiuNiuBegin = function(data){
    var _this = this;
    this.unscheduleAllCallbacks();
    this.cleanTableShow();
    this.resetNiuNiuNext();//清空上局牌
    this.updataUserScore(data.info);//更新分数
    this.refreshStep();//更新当前局数
    this.showCurDealer(data.info);//显示庄家
    this._timeContain.setVisible(false);//发牌的时候不显示倒计时
    this.invitebtn.setVisible(false);
    this.seatDownBtn.setVisible(false);
    this.InGameChatLayer.setVisible(false);
    this.guanZhanImg.setVisible(false);
    if(!this.mod_niuniu.selfdata)  this.guanZhanImg.setVisible(true);
    else this.InGameChatLayer.setVisible(true);
    var _callfunc=function(){
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
            if(_this.dealUid){
                _this.isGameBetsShow(true);
            }else{
                _this.isShowQiangZhuang(true);
            }
            //_this.createProgressBar(-1,"ProgressBar",8);
        });
    }

    if(this.mod_niuniu.roominfo.type!=gameclass.gamenys&&this.mod_niuniu.roominfo.type!=gameclass.gamebrnys){
        var _isHaveDeal=false;
        for(var i=0;i<this.mod_niuniu.roominfo.person.length;i++){
            if(this.mod_niuniu.roominfo.person[i].dealer){
                _isHaveDeal=true;
                break;
            }
        }
        _this.dealAnimationLayer.removeAllChildren();
        if(_isHaveDeal){
            this.isGameBetsShow(true);
            this._timeContain.setVisible(true);
            this.stateImg.loadTexture(res.niuniuState2, ccui.Widget.LOCAL_TEXTURE);
        }else{
            this.isShowQiangZhuang(true);
            this._timeContain.setVisible(true);
            this.stateImg.loadTexture(res.niuniuState1, ccui.Widget.LOCAL_TEXTURE);
        }
    }else{
        _callfunc()
    }
};
gameclass.nystable.prototype.runShowCardAction = function(_callback){
    var cardCount = 40;
    for(var i = 0;i< cardCount;i++){
        var cardBack = new cc.Sprite(res.pokerBei);
        cardBack.setPosition(cc.winSize.width / 2,cc.winSize.height / 2);
        this.dealAnimationLayer.addChild(cardBack);
    }
    var nowPlayerIndex=0;
    var nowCount=0;

    var that=this;
    var _scheduleCallBack=function(){
        if(nowPlayerIndex >= NYSMAX_PLAY_LENGTH){
            that.scheduleOnce(_callback,0.1);
            that.unschedule(_scheduleCallBack);
        }else{
            //while (!that.mod_niuniu.getplayerdata(nowPlayerIndex)){
            //    nowPlayerIndex++;
            //}
            while (!that.playerHeads[nowPlayerIndex].isShow){
                nowPlayerIndex++;
                if(nowPlayerIndex >= NYSMAX_PLAY_LENGTH){
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
                that.dealAnimationLayer.getChildren()[nowCount].runAction(cc.sequence(cc.delayTime(i*0.02),cc.moveTo(0.2,pos)))
            }
        }
        nowPlayerIndex++;
    }
    this.schedule(_scheduleCallBack,0.2,this.mod_niuniu.roominfo.person.length);
};

gameclass.nystable.prototype.reSendCard=function(_callBack){
    var sendIndex=-1;
    var indexnum=0;
    var _this = this;

    var sendCardCallBack=function(){
        for(var i = 0;i < NYSMAX_PLAY_LENGTH;i++ ){
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
    gameclass.nystable.prototype.showHandCard = function(dataInfo){
        var _this = this;
        for (var i = 0;i < NYSMAX_PLAY_LENGTH;i++) {
            var playerdata = _this.mod_niuniu.getplayerdata(i);
            if(playerdata){
                var index = this.getSeat(playerdata.uid);
                if(index == -1) {
                    continue;
                }
                this.onGameInitCard(this.playerHeads[index],playerdata,index);
            }
        }
    };
gameclass.nystable.prototype.isUserTouch = function(uid){
    if(uid == this.mod_niuniu.uid){//叫分后 或者是庄家 可以算牌操作
        this.isCardTouch = true;
    }
};
gameclass.nystable.prototype.onGameSendOtherCard = function(){
    this.mod_niuniu.sendOpen();
};
gameclass.nystable.prototype.gameFanPaiCallBack = function(){
    if(this.cuoType==0){
        this.onGameCuoCard();
        return ;
    }
    var mydate=this.mod_niuniu.getplayerdata(0);
    var otherCardArr=mydate.card;
    var _this=this;
    _this.isShowCuoPaiLayer(false);
    var _callBack=function(){
        if(_this.mod_niuniu.roominfo.state!=0){
            _this.isShowLiangLayer(true);
        }
    }
    for(var i=0;i<otherCardArr.length;i++){
        if(this.mod_niuniu.roominfo.type==gameclass.gamenys||this.mod_niuniu.roominfo.type==gameclass.gamebrnys){
            if(i!=4)continue;
        }
        var _index=i;
        var sprArr = this.playerHeads[0].handCards.getChildren();
        var sp=sprArr[_index];
        this.openPokerAction(sp,this.getCardUrlByNum(otherCardArr[i]),_callBack);
    }
};
gameclass.nystable.prototype.onGameCuoCard = function(){
    this.isShowCuoPaiLayer(false);
    if(this.mod_niuniu.roominfo.type!=gameclass.gamenys&&this.mod_niuniu.roominfo.type!=gameclass.gamebrnys){
        var mydate=this.mod_niuniu.getplayerdata(0);
        var urlArr=[];
        for(var i=0;i<mydate.card.length;i++){
            urlArr[i]=this.getCardUrlByNum(mydate.card[i])
        }
        this.showCuoPaiLayer(true,urlArr);
    }else{
        var mydate=this.mod_niuniu.getplayerdata(0);
        var urlArr=[];
        for(var i=0;i<mydate.card.length;i++){
            urlArr[i]=this.getCardUrlByNum(mydate.card[i])
        }
        this.showCuoPaiOneLayer(true,urlArr[4]);
    }
};
gameclass.nystable.prototype.showCuoPaiLayer=function(isShow,urlArr) {
    if(!urlArr){
        urlArr=[];
        var mydate=this.mod_niuniu.getplayerdata(0);
        for(var i=0;i<mydate.card.length;i++){
            urlArr[i]=this.getCardUrlByNum(mydate.card[i])
        }
    }
    if(isShow){
        this.game.uimgr.showui("gameclass.cuoPaiLayer");
        this.game.uimgr.uis["gameclass.cuoPaiLayer"].setData(urlArr);
    }else{
        this.cuoPaiLayer.setVisible(false);
        if(this.mod_niuniu.roominfo.state!=0){
            this.showCardLayer.setVisible(true);
        }
        if(this.game.uimgr.uis["gameclass.cuoPaiLayer"]){
            this.game.uimgr.uis["gameclass.cuoPaiLayer"].removeFromParent(true);
            this.game.uimgr.uis["gameclass.cuoPaiLayer"]=null;
        }
        var mycardArr=this.playerHeads[0].handCards.getChildren();
        for(var i=0;i<mycardArr.length;i++){
            mycardArr[i].loadTextures(urlArr[i],urlArr[i],urlArr[i],ccui.Widget.PLIST_TEXTURE);
        }
    }
};
gameclass.nystable.prototype.showCuoPaiOneLayer=function(isShow,url) {
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
        if(mycard)
            mycard.loadTextures(url,url,url,ccui.Widget.PLIST_TEXTURE);
    }
};
gameclass.nystable.prototype.openPokerAction=function(card,texture,_callBack){
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
            card.setScale(1,1);
            card.unschedule(callBack);
            card.addTouchEventListener(that.curUserCardTouchEvent ,that);
            if(_callBack){
                _callBack();
            }
        }
    }
    card.schedule(callBack,0.016);
};
gameclass.nystable.prototype.onGameInitCard = function(player,playerdata,chairNum){
    player.handCards.removeAllChildren();
    var offset = chairNum == 0 ? 47 : 40;
    playerdata.card=playerdata.card||[];
    for (var k = 0; k <playerdata.card.length; k++) {
        var spr = null;
        if (chairNum == 0) {
            nys_playerHead.curPlayCard[k] = playerdata.card[k];
            spr = this.crateBtnCard(playerdata.card[k]);
        } else {
            spr = this.crateBtnCard(playerdata.card[k]);
        }
        spr.setPosition(player.handCards.width/2+(k-2)*offset,player.handCards.height/2 );
        if(!playerdata.view){
            // spr.runAction(cc.moveBy(0.5, , 0));
        }else{
            var sprNiuNiu = new cc.Sprite();
            var cardType=this.mod_niuniu.ongetNiu(playerdata.card).type;
            if(this.mod_niuniu.uid!=playerdata.uid){
                sprNiuNiu.setScale(0.8);
            }
            if(cardType<=100){
                sprNiuNiu.initWithSpriteFrameName("nn331_img_niu" +cardType+ ".png");
            }else{
                sprNiuNiu.initWithSpriteFrameName("type" + cardType + ".png");
            }
            sprNiuNiu.setPosition(cc.p(-10,-20));
            player.handCards.addChild(sprNiuNiu,220);
        }
        player.handCards.addChild(spr);
    }
};
gameclass.nystable.prototype.getCardUrlByNum=function(card){
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
gameclass.nystable.prototype.reshowCallScore  = function() {
    //cc.log("第2次叫分");
    var _this = this;
    this.userBetsCount.length = 0;
    var node = new cc.Sprite(res.showcallScore02);
    node.setPosition(this.node.getContentSize().width / 2, this.node.getContentSize().height / 2 + 150);
    node.setScale(0.3);
    this.node.addChild(node);
    node.runAction(cc.sequence(cc.scaleTo(1, 1.5), new cc.CallFunc(function (tager) {
        tager.removeFromParent();
        //_this.createProgressBar(_this.dealUid, "ProgressBar");//创建叫分进度框
        if (this.mod_niuniu.selfdata) {//除庄家外显示叫分
            _this.isGameBetsShow(true);
        }
    })));
};
gameclass.nystable.prototype.onGameBets = function(data){
    //cc.log(data);
    var that=this;
    for (var i = 0;i < NYSMAX_PLAY_LENGTH;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && playerdata.uid == data.uid) {
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            mod_sound.playeffect(g_music["Man_jiabei"],false);
            // var func=function(){
            //     this.setVisible(true);
            // }
            // this.scheduleOnce(func.bind(this.playerHeads[i].call_scoreImg),data.bets*0.05+0.5);
            this.playerHeads[index].call_scoreImg.setVisible(true);
            this.playerHeads[index].call_scoreImg.getChildByName("label").setString(0);
            this.playerHeads[index].destroyProgress("ProgressBar");//销毁进度条
            var _moneyNode=new cc.Node();
            _moneyNode.setName("moneyNode");
            this.playerHeads[index].node.addChild(_moneyNode);
            for(var j=0;j<data.bets;j++){
                var _sp=new cc.Sprite(res.game_coin);
                var _pos=this.playerHeads[index]._icon.getPosition();
                _sp.setPosition(cc.p(_pos.x,_pos.y));
                _moneyNode.addChild(_sp);
                var pos=this.playerHeads[index].call_scoreImg.getPosition();
                pos.x+=20;
                pos.y+=20;
                _sp.runAction(cc.sequence(cc.delayTime(j*0.05),cc.moveTo(0.5,pos).easing(cc.easeOut(5)),cc.callFunc(function(sender){
                    var parent=sender.getParent().getParent();
                    parent.getChildByName('call_score').setVisible(true);
                    var num=parent.getChildByName('call_score').getChildByName("label").getString();
                    parent.getChildByName('call_score').getChildByName("label").setString(Number(num)+1);
                    sender.removeFromParent(true);
                },_sp)))
            }
            this.scheduleOnce(function(){
                _moneyNode.getParent().getChildByName('call_score').getChildByName("label").setString(data.bets);
                _moneyNode.removeFromParent(true);
            },1)
            break;
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
            that.stateImg.loadTexture(res.niuniuState3,ccui.Widget.LOCAL_TEXTURE);
            for(var i=0;i<NYSMAX_PLAY_LENGTH;i++){
                that.playerHeads[i].showCuoPaiState(true);
            }
            if(!that.mod_niuniu.selfdata||that.mod_niuniu.roominfo.state==0) return;
            that.isShowCuoPaiLayer(true);
            //that.createProgressBar(-1,"ProgressBar");
            that.isCardTouch = true;
        }
        this.reSendCard(_callBack);
    }
};
//dealUid:不等于dealUid创建进度条   isMingPai:true为亮牌 false为叫分阶段进度条  strName:进度条name
gameclass.nystable.prototype.createProgressBar = function(dealUid,strName,time) {
    for (var i = 0;i < NYSMAX_PLAY_LENGTH;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata && playerdata.uid != dealUid) {
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            this.playerHeads[index].createProgress(strName,time);
        }
    }
};
gameclass.nystable.prototype.isShowCuoPaiLayer=function(_isShow){
    if(_isShow){
        var _this=this;
        if(this.mod_niuniu.selfdata&&this.mod_niuniu.selfdata.trust){
            this.scheduleOnce(function(){
                _this.onGameSendOtherCard();
            },1);
            return;
        }
        if(parseInt(this.mod_niuniu.roominfo.param1/10)%10 == 1){
            this.cuoPaiLayer.getChildren()[0].setVisible(false);
        }else{
            if(g_iscuopai) this.cuoPaiLayer.getChildren()[0].setVisible(true);
            else this.cuoPaiLayer.getChildren()[0].setVisible(false);
        }
    }
    this.cuoPaiLayer.setVisible(_isShow);
};
gameclass.nystable.prototype.isShowLiangLayer=function(_isShow){
    if(_isShow){
        if(this.mod_niuniu.selfdata&&this.mod_niuniu.selfdata.trust){
            this.mod_niuniu.gameview();
            return;
        }
    }
    this.showCardLayer.setVisible(_isShow);
}
gameclass.nystable.prototype.showCallScore = function(dealUid,dataInfo,func) {
    //cc.log(dataInfo);
    var _this = this;

    //_this.createProgressBar(dealUid,"ProgressBar");//创建叫分进度框
    var betsCount = 0;//玩家叫分数量
    for(var i = 0;i<dataInfo.length;i++){
        if(dataInfo[i].bets <= 0){
            if(dealUid != dataInfo[i].uid){
                if(dataInfo[i].uid == this.mod_niuniu.uid&&this.mod_niuniu.selfdata){
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
gameclass.nystable.prototype.curUserCardTouchEvent = function(sender, type) {
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
gameclass.nystable.prototype.findCalArr = function(arr,numble) {
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
gameclass.nystable.prototype.setCalArrSum = function(arr) {
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
gameclass.nystable.prototype.updataCalText = function(index,numble) {
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

gameclass.nystable.prototype.setCalText = function(isUp,numble) {
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
gameclass.nystable.prototype.onGameShowUserCard = function(info){
    var view=info.view;
    var uid=info.uid;
    var cardArr=info.card.slice();
    var cardType=info.ct;
    var laiZiIndex=0;
    if(uid == this.mod_niuniu.uid){
        this.showCuoPaiOneLayer(false);
        this.showCuoPaiLayer(false);
        this.isShowLiangLayer(false);
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
    for (var i = 0;i < NYSMAX_PLAY_LENGTH;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if(playerdata && playerdata.uid == uid){
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            this.playerHeads[index].handCards.removeAllChildren();
            this.playerHeads[index].destroyProgress("ProgressBar");
            this.playerHeads[index].showCuoPaiState(false);
            var offset = index ==0? 56:40;
            // if(i>0&&i<3){
            //     offset
            // }
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
                    spr.setPosition((j-2)*offset, 0);
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

                    this.playerHeads[index].handCards.addChild(spr,210);
                }
            }
            if(g_music["niu_" + cardType + "_w"]){
                mod_sound.playeffect(g_music["niu_" + cardType + "_w"],false);
            }
            var sprNiuNiu = new cc.Sprite();
            if(cardType <= 100){
                sprNiuNiu.initWithSpriteFrameName("nn331_img_niu" + cardType + ".png");
            }else{
                sprNiuNiu.initWithSpriteFrameName("type" + cardType + ".png");
            }
            //sprNiuNiu.setScale(0.8);
            sprNiuNiu.setPosition(cc.p(-150,-20));
            sprNiuNiu.setLocalZOrder(1001);
            this.playerHeads[index].handCards.addChild(sprNiuNiu,220);
            var laiSp=null;
            if(laiZiIndex==1){
                laiSp=new cc.Sprite(res.daLaiSp);
            }else if(laiZiIndex==2){
                laiSp=new cc.Sprite(res.xiaoLaiSp);
            }
            if(laiSp){
                laiSp.setPosition(cardArrSp[0].x-30,cardArrSp[0].y+cardArrSp[0].height);
                sprNiuNiu.addChild(laiSp);
                laiSp.setVisible(false);
            }
            var that=this;
            sprNiuNiu.runAction(cc.sequence(cc.moveBy(0.4, 140, 0),cc.callFunc(function (){
                    if((cardType>96&&parseInt(that.mod_niuniu.roominfo.param1/1000000)%10==1)||(cardType>97&&parseInt(that.mod_niuniu.roominfo.param1/1000000)%10==0)){
                        var guangAnim = new sp.SkeletonAnimation(res.guangxiao_json,res.guangxiao_atlas);
                        guangAnim.setAnimation(0, 'animation', false);
                        guangAnim.setAnchorPoint(0.5,0.5);
                        guangAnim.setPosition(-10,-20);
                        guangAnim.setLocalZOrder(1000);
                        that.playerHeads[index].handCards.addChild(guangAnim);
                    }
                    if(laiSp)
                        laiSp.setVisible(true);
                }
            )));

            break;
        }
    }

};
gameclass.nystable.prototype.reconnGameDeal = function (dataInfo) {
    //cc.log(dataInfo);
    if(dataInfo.length <= 0){
        return;
    }
    for (var i = 0;i < NYSMAX_PLAY_LENGTH;i++) {
        for (var j = 0;j < dataInfo.length;j++) {
            var playerdata = this.mod_niuniu.getplayerdata(i);
            if (playerdata && playerdata.uid == dataInfo[j].uid&&dataInfo[j].robdeal>=0) {
                var index = this.getSeat(playerdata.uid);
                if(index == -1) {
                    continue;
                }
                this.playerHeads[index].rob_zhuang_img.setVisible(true);
                this.playerHeads[index].rob_zhuang_img.setTexture(res["img_qiangZhuang"+dataInfo[j].robdeal]);
                if(dataInfo[j].uid == this.mod_niuniu.uid){
                    this.isShowQiangZhuang(false);
                }
            }
        }
    }
};
gameclass.nystable.prototype.reSetCardPos = function(_index){
    var playerdata = this.mod_niuniu.getplayerdata(_index);
    if(!playerdata) return;
    var cardArr = playerdata.card.slice(0);
    var index = this.getSeat(playerdata.uid);
    var _NiuArr=[];
    var _isNiu=false;
    for(var i=0;i<cardArr.length;i++){
        for(var j=i+1;j<cardArr.length;j++){
            for(var k=j+1;k<cardArr.length;k++){
                var Num1=parseInt(cardArr[i]/10)>10?10:parseInt(cardArr[i]/10);
                var Num2=parseInt(cardArr[j]/10)>10?10:parseInt(cardArr[j]/10);
                var Num3=parseInt(cardArr[k]/10)>10?10:parseInt(cardArr[k]/10);
                if((Num1+Num2+Num3)%10==0){
                    _NiuArr=[cardArr[i],cardArr[j],cardArr[k]];
                    _isNiu=true;
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
    var cardLength = 5;
    var moveOffset=null;
    cardArr=_NiuArr.concat(cardArr);
    var cardType=this.mod_niuniu.ongetNiu(cardArr).type;
    if(_isNiu&&cardType!=100){
        var offset = index==0? 55:25;
        this.playerHeads[index].handCards.removeAllChildren(true);
        for(var i=0;i<cardArr.length;i++){
            var spr = this.crateBtnCard(cardArr[i]);
            this.playerHeads[index].handCards.addChild(spr);
            var moveX=0;
            moveX= -cardLength * moveOffset / 2 + (i * moveOffset) + moveOffset / 2;
            if(cardType>90&&cardType<100&&i>=3){
                var moveDel=index==0?40:30;
                moveX+=moveDel;
            }
            spr.setPosition(-cardLength * offset / 2 + (i * offset) + offset / 2+moveX, 0);
        }
        var sprNiuNiu = new cc.Sprite();
        if(cardType <= 100){
            sprNiuNiu.initWithSpriteFrameName("nn331_img_niu" + cardType + ".png");
        }else{
            sprNiuNiu.initWithSpriteFrameName("type" + cardType + ".png");
        }
        //sprNiuNiu.setScale(0.8);
        sprNiuNiu.setPosition(cc.p(-10,-20));
        sprNiuNiu.setLocalZOrder(1001);
        this.playerHeads[index].handCards.addChild(sprNiuNiu,220);
    }

};
//根据信息刷新桌面显示
gameclass.nystable.prototype.updatePlayerShow = function () {
    this.unscheduleAllCallbacks();
    this.dealAnimationLayer.removeAllChildren();
    var _obj=this.mod_niuniu.roominfo;
    if(this.mod_niuniu.selfdata) this.tuoGuang(this.mod_niuniu.selfdata.trust);
    if(!_obj.person) {
        this.seatDownBtn.setVisible(true);
        return ;
    };

    //重置显示
    if(this.mod_niuniu.selfdata||this.mod_niuniu.roominfo.state!=0||this.mod_niuniu.roominfo.person.length==NYSMAX_PLAY_LENGTH){
        this.seatDownBtn.setVisible(false);
    }else{
        this.seatDownBtn.setVisible(true);
    }
    this.isGameBetsShow(false);
    this.isShowQiangZhuang(false);
    this.isShowLiangLayer(false);
    if(_obj.state){
        this._timeContain.setVisible(true);
        this.stateImg.loadTexture(res["niuniuState"+_obj.state], ccui.Widget.LOCAL_TEXTURE);
    }
    if(this.mod_niuniu.selfdata){
        if(this.mod_niuniu.selfdata.uid!=this.mod_niuniu.roominfo.host){
            if(_obj.state==0&&_obj.step==0){
                this.showBtnState(true,false);
            }else{
                this.showBtnState(false,true);
            }
        }else{
            if(_obj.state==0&&_obj.step==0){
                this.showBtnState(true,true);
            }else{
                this.showBtnState(false,true);
            }
        }
    }else{
        if(this.mod_niuniu.roominfo.host==this.game.modmgr.mod_login.logindata.uid){
            if(_obj.state==0&&_obj.step==0){
                this.showBtnState(true,true);
            }else{
                this.showBtnState(true,false);
            }
        }
    }
    this.invitebtn.setVisible(false);
    this.isGameReadyShow(false);
    for(var i=0;i<NYSMAX_PLAY_LENGTH;i++){
        this.playerHeads[i].rob_zhuang_img.setVisible(false);
        this.playerHeads[i].call_scoreImg.setVisible(false);
        this.playerHeads[i].zhuang_img.setVisible(false);
        this.playerHeads[i].handCards.removeAllChildren(true);
        this.playerHeads[i].ok_img.setVisible(false);
        this.playerHeads[i].showCuoPaiState(false);
    }
    for(var i = 0;i < NYSMAX_PLAY_LENGTH;i++){
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if(playerdata){
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            this.onGameInitCard(this.playerHeads[index],playerdata,index);
            this.playerHeads[index].off_line.setVisible(!playerdata.line);
            this.playerHeads[index].head_url = playerdata.imgurl || "";
        }
    }
    this.InGameChatLayer.setVisible(false);
    this.guanZhanImg.setVisible(false);
    if(!this.mod_niuniu.selfdata&&_obj.state!=0)  this.guanZhanImg.setVisible(true);
    else this.InGameChatLayer.setVisible(true);
    //显示玩家的牌
    if(_obj.state==0){
        //未开始或者已结束，这时候等待玩家准备
        var IsFull=true;
        for(var i=0;i<NYSMAX_PLAY_LENGTH;i++){
            var playerdata = this.mod_niuniu.getplayerdata(i);
            if(!playerdata){
                IsFull=false;
                continue;
            };
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            //this.playerHeads[i].handCards.removeAllChildren(true);
            if(playerdata.ready){
                this.playerHeads[index].ok_img.setVisible(true);
            }else if(playerdata.uid==this.mod_niuniu.uid){
                if(this.mod_niuniu.uid==this.mod_niuniu.roominfo.host){
                    this.isGameReadyShow(true);
                    this.changeBeginShow();
                }else{
                    this.isGameReadyShow(true);
                }
            }
            if(playerdata.view){
                cc.log(index);
                this.reSetCardPos(i);
            }
        }
        if(!IsFull&&this.mod_niuniu.roominfo.step==0) this.invitebtn.setVisible(true);
    }else if(_obj.state==1){
        //开始了等待抢庄
        for(var i=0;i<NYSMAX_PLAY_LENGTH;i++){
            var playerdata = this.mod_niuniu.getplayerdata(i);
            if(!playerdata)continue;
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            if(playerdata.robdeal>-1){
                this.playerHeads[index].rob_zhuang_img.setVisible(true);
                this.playerHeads[index].rob_zhuang_img.setTexture(res["img_qiangZhuang"+playerdata.robdeal]);
                this.playerHeads[index].light.setVisible(true);
            }else if(playerdata.uid==this.mod_niuniu.uid){
                this.qzbtnLayer.setVisible(true);
            }
            if(this.mod_niuniu.roominfo.time){
                //this.createProgressBar(-1,"ProgressBar",this.mod_niuniu.roominfo.time);//创建叫分进度框
            }
        }
    }else if(_obj.state==2||_obj.state==3){
        //庄家确定了等待下注
        for(var i=0;i<NYSMAX_PLAY_LENGTH;i++){
            var playerdata = this.mod_niuniu.getplayerdata(i);
            if(!playerdata)continue;
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            if(playerdata.dealer){
                this.playerHeads[index].zhuang_img.setVisible(true);
                this.playerHeads[index].rob_zhuang_img.setVisible(true);
                this.playerHeads[index].rob_zhuang_img.setTexture(res["img_qiangZhuang"+playerdata.robdeal]);
                this.playerHeads[index].light.setVisible(true);
            }
            if(playerdata.bets>0){
                this.playerHeads[index].call_scoreImg.setVisible(true);
                this.playerHeads[index].call_scoreImg.getChildByName("label").setString(playerdata.bets);
            }else if(playerdata.uid==this.mod_niuniu.uid){
                this.isGameBetsShow(true);
            }
            if(_obj.state==3){
                if(playerdata.view){
                    var sprNiuNiu = new cc.Sprite();
                    if(playerdata.ct <= 100){
                        sprNiuNiu.initWithSpriteFrameName("nn331_img_niu" + playerdata.ct + ".png");
                    }else{
                        sprNiuNiu.initWithSpriteFrameName("type" + playerdata.ct + ".png");
                    }
                    if(this.mod_niuniu.selfdata&&this.mod_niuniu.uid!=playerdata.uid){
                        sprNiuNiu.setScale(0.8);
                    }
                    sprNiuNiu.setPosition(cc.p(-10,-20));
                    this.playerHeads[index].handCards.addChild(sprNiuNiu,220);
                }else{
                    this.playerHeads[index].showCuoPaiState(true);
                    if(playerdata.card.length<5){
                        this.isShowCuoPaiLayer(true);
                    }else{
                        this.isShowLiangLayer(true);
                    }
                }
            }
        }
        //if(this.mod_niuniu.roominfo.time){
        //    var _dealNum=-1;
        //    for(var i=0;i<this.mod_niuniu.roominfo.person.length;i++){
        //        if(this.mod_niuniu.roominfo.person[i].dealer){
        //            _dealNum=i;
        //            break;
        //        }
        //    }
        //this.createProgressBar(_dealNum,"ProgressBar",this.mod_niuniu.roominfo.time);//创建叫分进度框
        //}
    }
},
    gameclass.nystable.prototype.randomZhuangBlink = function (obj,_callback) {
        var blinkIndex=0;
        var _this=this;
        var lastBlinkNum=-1;
        var beiShu=-1;
        this._timeContain.setVisible(false);
        for(var i=0;i<NYSMAX_PLAY_LENGTH;i++){
            var playerdata=_this.mod_niuniu.getplayerdata(i);
            if(playerdata&&playerdata.uid==obj.uid){
                beiShu=playerdata.robdeal;
                break;
            }
        }
        var binkCallBack=function () {
            var _isZhuang=false;
            for(var i=lastBlinkNum+1;i<i+NYSMAX_PLAY_LENGTH;i++){
                if(i>=NYSMAX_PLAY_LENGTH)i-=NYSMAX_PLAY_LENGTH;
                var data = _this.mod_niuniu.getplayerdata(i);
                if(data && data.robdeal==beiShu){
                    var index = _this.getSeat(data.uid);
                    if(index == -1) continue;

                    var _sp=_this.playerHeads[index].node.getChildByName("light");
                    if(_sp){
                        _sp.setVisible(true);
                    }
                    lastBlinkNum=i;
                    for(var j=0;j<NYSMAX_PLAY_LENGTH;j++){
                        if(j!=index){
                            if(_this.playerHeads[j].node.getChildByName("light"))
                                _this.playerHeads[j].node.getChildByName("light").setVisible(false);
                        }
                    }
                    if(data.uid==obj.uid){
                        _isZhuang=true;
                    }
                    blinkIndex++;
                    break;
                }
            }

            if(blinkIndex>10&&_isZhuang){
                for(var j=0;j<NYSMAX_PLAY_LENGTH;j++){
                    _this.playerHeads[j].node.getChildByName("light").setVisible(false);
                }
                runAnimateFuc();
                _this.unschedule(binkCallBack);
            }
        }
        this.schedule(binkCallBack,0.1);
        var runAnimateFuc=function () {
            for(var i=0;i<NYSMAX_PLAY_LENGTH;i++){
                var playerdata=_this.mod_niuniu.getplayerdata(i);
                if(playerdata&&playerdata.uid==obj.uid){
                    var index = _this.getSeat(playerdata.uid);
                    if(index == -1) {
                        continue;
                    }

                    var spr = new sp.SkeletonAnimation(res.txpmd_json,res.txpmd_atlas);
                    spr.setAnimation(0, 'animation', true);
                    spr.setAnchorPoint(0.5, 0.5);
                    spr.setPosition(_this.playerHeads[index].head_img.getPosition());
                    _this.playerHeads[index].node.addChild(spr);

                    _this.node.runAction(cc.sequence(cc.delayTime(1.5),cc.callFunc(function(){
                        spr.removeFromParent(true);
                        _this.onGameDealer(obj);
                        _callback();
                    })))
                }
            }
        }
    },
//抢庄
    gameclass.nystable.prototype.onGameDeal = function (data) {
        for (var i = 0;i < NYSMAX_PLAY_LENGTH;i++) {
            var playerdata = this.mod_niuniu.getplayerdata(i);
            if (playerdata && playerdata.uid == data.uid) {
                var index = this.getSeat(playerdata.uid);
                if(index == -1) {
                    continue;
                }
                this.playerHeads[index].rob_zhuang_img.setVisible(true);
                this.playerHeads[index].rob_zhuang_img.setTexture(res["img_qiangZhuang"+data.score]);
                this.playerHeads[index].light.setVisible(true);
                //mod_sound.playeffect(g_music["Man_jiabei"],false);
                this.playerHeads[index].rob_zhuang_img.setScale(0);
                this.playerHeads[index].rob_zhuang_img.runAction(cc.scaleTo(0.8,1,1).easing(cc.easeElasticOut()));
                this.playerHeads[index].destroyProgress("ProgressBar");//销毁进度条
            }
        }

    };
//确定庄家
gameclass.nystable.prototype.onGameDealer = function (data) {
    this.dealUid = data.uid;
    this._timeContain.setVisible(true);
    for (var i = 0;i < NYSMAX_PLAY_LENGTH;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata) {
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            if(playerdata.uid == this.dealUid){
                this.playerHeads[index].zhuang_img.setVisible(true);//显示庄家标记
                if(playerdata.robdeal>0){
                    this.playerHeads[index].rob_zhuang_img.setVisible(true);
                    this.playerHeads[index].rob_zhuang_img.setTexture(res["img_qiangZhuang"+playerdata.robdeal]);
                    this.playerHeads[index].light.setVisible(true);
                }
            }else{
                this.playerHeads[index].rob_zhuang_img.setVisible(false);//隐藏抢庄
                this.playerHeads[index].light.setVisible(false);
            }
        }
    }
    this.isUserTouch(this.dealUid);//庄家可以进行牌的操作
    //this.createProgressBar(this.dealUid,"ProgressBar");//创建叫分进度框
    this.stateImg.loadTexture(res.niuniuState2,ccui.Widget.LOCAL_TEXTURE);
    if(this.mod_niuniu.selfdata){//除庄家外显示叫分
        this.isGameBetsShow(true);
    }
};
gameclass.nystable.prototype.crateBtnCard = function(card) {
    var abcd = ["a","d","b","c"];
    var point = Math.floor(card/10);
    var type = card%10;
    var sprButton = null;
    var laiSp=null;
    if (!card||card<0){
        sprButton = new ccui.Button(res.pokerBei,res.pokerBei,res.pokerBei);
        sprButton.setTouchEnabled(false);
    }else{
        var pngPath ="";
        if(card==1000){
            pngPath="card_joker_gray.png";
            laiSp=new cc.Sprite(res.daLaiSp);
        }else if(card==2000){
            laiSp=new cc.Sprite(res.xiaoLaiSp);
            pngPath="card_joker.png";
        }else{
            pngPath = "card_" + point +  abcd[type - 1]+ ".png";
        }
        sprButton = new ccui.Button(pngPath,pngPath,pngPath,ccui.Widget.PLIST_TEXTURE);
        sprButton.setTouchEnabled(true);
        if(laiSp){
            laiSp.setPosition(sprButton.width/2,sprButton.height);
            sprButton.addChild(laiSp);
        }
    }
    //sprButton.setTag(card);
    sprButton.setAnchorPoint(0.5,0.5);
    //sprButton.loadTextureNormal("card_" + point +  abcd[type - 1]+ ".png",ccui.Widget.PLIST_TEXTURE);
    return sprButton;
};
gameclass.nystable.prototype.setRoomRuleStr = function() {
    var wanfastr="看牌抢庄"
    if(this.mod_niuniu.roominfo.type == gameclass.gamenys){
        wanfastr = "看牌抢庄";
    }else if(this.mod_niuniu.roominfo.type == gameclass.gamebrnys){
        wanfastr = "八人明牌";
    }else if(this.mod_niuniu.roominfo.type == gameclass.gamezynys){
        wanfastr = "自由抢庄";
    }else if(this.mod_niuniu.roominfo.type == gameclass.gamegdnys){
        wanfastr = "固定庄家";
    }else if(this.mod_niuniu.roominfo.type == gameclass.gamesznys){
        wanfastr = "牛牛上庄";
    }
    var diFenStr="";
    var diFenStr=parseInt(this.mod_niuniu.roominfo.param1/1000000);
    if(diFenStr==0){
        diFenStr="1/2";
    }else if(diFenStr==1){
        diFenStr="2/4";
    }else if(diFenStr==2){
        diFenStr="3/6";
    }else if(diFenStr==3){
        diFenStr="4/8";
    }else if(diFenStr==4){
        diFenStr="5/10";
    }

    var fanBeiGuiZe="";
    var fanBeiNum=parseInt(this.mod_niuniu.roominfo.param1/100000)%10;
    if(fanBeiNum==0){
        fanBeiGuiZe="牛牛x3 牛九x2 牛八x2";
    }else if(fanBeiNum==1){
        fanBeiGuiZe="牛牛x4 牛九x3 牛八x2 牛七x2";
    }

    var fangJianGuiZe="";
    if(parseInt(this.mod_niuniu.roominfo.param1/10000)%10){
        if(this.mod_niuniu.roominfo.type==gameclass.gamegdnys){
            var _num=parseInt(this.mod_niuniu.roominfo.param1/10000)%10-1;
            if(_num==0){
                fangJianGuiZe+="上庄分数0  ";
            }else if(_num==1){
                fangJianGuiZe+="上庄分数100  ";
            }else if(_num==2){
                fangJianGuiZe+="上庄分数150  ";
            }else if(_num==3){
                fangJianGuiZe+="上庄分数200  ";
            }
        }else{
            fangJianGuiZe+="最大抢庄"+parseInt(this.mod_niuniu.roominfo.param1/10000)%10+"倍  "
        }
    }
    if(parseInt(this.mod_niuniu.roominfo.param1)%10){
        fangJianGuiZe+="下注限制  "
    }else{
        fangJianGuiZe+="下注无限制  "
    }
    if(parseInt(this.mod_niuniu.roominfo.param1/10)%10){
        fangJianGuiZe+="禁止搓牌  "
    }
    if(parseInt(this.mod_niuniu.roominfo.param1/100)%10){
        fangJianGuiZe+="闲家推注"+parseInt(this.mod_niuniu.roominfo.param1/100)%10*5+"倍  ";
    }
    if(parseInt(this.mod_niuniu.roominfo.param2)%10){
        fangJianGuiZe+="禁止中途加入  "
    }
    var teShuGuiZe="";
    var te1=parseInt(this.mod_niuniu.roominfo.param2/10)%10;
    var te2=parseInt(this.mod_niuniu.roominfo.param2/100)%10;
    var te3=parseInt(this.mod_niuniu.roominfo.param2/1000)%10;
    var te4=parseInt(this.mod_niuniu.roominfo.param2/10000)%10;
    var te5=parseInt(this.mod_niuniu.roominfo.param2/100000)%10;
    var te6=parseInt(this.mod_niuniu.roominfo.param2/1000000)%10;
    var te7=parseInt(this.mod_niuniu.roominfo.param2/10000000)%10;
    if(te1){
        teShuGuiZe+="顺金牛（10倍） ";
    }
    if(te4){
        teShuGuiZe+="炸弹牛（8倍） ";
    }
    if(te3){
        teShuGuiZe+="葫芦牛（7倍） ";
    }
    if(te4){
        teShuGuiZe+="五小牛（6倍） ";
    }
    if(te5){
        teShuGuiZe+="同花牛（6倍） ";
    }
    if(te6){
        teShuGuiZe+="五花牛（5倍） ";
    }
    if(te7){
        teShuGuiZe+="顺子牛（5倍） ";
    }


    ccui.helper.seekWidgetByName(this.roomHelpLayer,"wanfa").setString(wanfastr);
    ccui.helper.seekWidgetByName(this.roomHelpLayer,"difen").setString(diFenStr);
    ccui.helper.seekWidgetByName(this.roomHelpLayer,"fanBeiguize").setString(fanBeiGuiZe);
    ccui.helper.seekWidgetByName(this.roomHelpLayer,"fangjianguize").setString(fangJianGuiZe);
    ccui.helper.seekWidgetByName(this.roomHelpLayer,"teshuwanfa").setString(teShuGuiZe);
}
gameclass.nystable.prototype.refreshStep = function() {
    var curstep = this.mod_niuniu.roominfo.step;
    if (curstep > this.mod_niuniu.roominfo.maxstep){
        curstep = this.mod_niuniu.roominfo.maxstep;
    } else if(curstep == 0) {
        curstep = 1;
    }
    ccui.helper.seekWidgetByName(this.node,"curround").setString("局数：" + curstep + "/" + this.mod_niuniu.roominfo.maxstep);
    var diFenstr="";
    var _num=parseInt(this.mod_niuniu.roominfo.param1/1000000)%10;
    if(_num==0){
        diFenstr="底分：1/2";
    }else if(_num==1){
        diFenstr="底分：2/4";
    }else if(_num==2){
        diFenstr="底分：3/6";
    }else if(_num==3){
        diFenstr="底分：4/8";
    } else if(_num==4){
        diFenstr="底分：5/10";
    }
    ccui.helper.seekWidgetByName(this.node,"diFen").setString(diFenstr);

    var zhuangWei="";
    var zhuangWei="看牌抢庄"
    if(this.mod_niuniu.roominfo.type == gameclass.gamenys){
        zhuangWei = "看牌抢庄";
    }else if(this.mod_niuniu.roominfo.type == gameclass.gamebrnys){
        zhuangWei = "八人明牌";
    }else if(this.mod_niuniu.roominfo.type == gameclass.gamezynys){
        zhuangWei = "自由抢庄";
    }else if(this.mod_niuniu.roominfo.type == gameclass.gamegdnys){
        zhuangWei = "固定庄家";
    }else if(this.mod_niuniu.roominfo.type == gameclass.gamesznys){
        zhuangWei = "牛牛上庄";
    }
    ccui.helper.seekWidgetByName(this.node,"zhuangWei").setString("玩法："+zhuangWei);

    var tuizhuss = parseInt(this.mod_niuniu.roominfo.param1/100)%10;
    var tuizhuNum=0;
    if(tuizhuss==1 ) tuizhuNum = 5;
    else if(tuizhuss == 2) tuizhuNum = 10;
    else if(tuizhuss == 3) tuizhuNum = 15;
    ccui.helper.seekWidgetByName(this.node,"tuizhu").setString("推注:"+tuizhuNum+"倍");
}
gameclass.nystable.prototype.runJuShuAction = function() {
    this.juShuLabel.setString("第" + this.mod_niuniu.roominfo.step + "局");
    this.juShuLabel.setPosition(cc.winSize.width / 4, this.juShuLabel.getPosition().y);
    this.juShuLabel.stopAllActions();
    this.juShuLabel.runAction(cc.sequence(
        cc.spawn(cc.fadeIn(0.5), cc.moveBy(0.5, cc.p(cc.winSize.width / 4, 0))),
        cc.sequence(cc.scaleTo(0.2, 0.8, 1.2), cc.scaleTo(0.2, 1.1, 0.9), cc.scaleTo(0.1, 1, 1)),
        cc.spawn(cc.fadeOut(0.5), cc.moveBy(0.5, cc.p(cc.winSize.width / 4, 0)))
    ))
}
gameclass.nystable.prototype.cleanTableShow = function() {
    for(var i=0;i<NYSMAX_PLAY_LENGTH;i++){
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
gameclass.nystable.prototype.resetNiuNiuNext = function(){
    cc.log("next");

    nys_playerHead.curPlayCard.length = 0;
    this.calArr = [0,0,0];
    this.calIndex = 0;
    this.userBetsCount.length = 0;
    this.dealUid = 0;
    this.callScoreStage = 0;
    this.numObj.length = 0;
    for(var i = 0;i<this.calTextArr.length;i++){
        this.updataCalText(i,""+0);
    }
    for(var i = 0;i < NYSMAX_PLAY_LENGTH;i++){
        this.playerHeads[i].handCards.removeAllChildren();
        this.playerHeads[i].call_scoreImg.setVisible(false);
        this.playerHeads[i].ok_img.setVisible(false);
        this.playerHeads[i].destroyProgress("ProgressBar");
    }
    this.isCardTouch = false;
};

gameclass.nystable.prototype.updataUserScore = function(info){
    for (var i = 0;i < NYSMAX_PLAY_LENGTH;i++) {
        var playerdata = this.mod_niuniu.getplayerdata(i);
        if (playerdata) {
            var index = this.getSeat(playerdata.uid);
            if(index == -1) {
                continue;
            }
            for(var j = 0;j<info.length;j++){
                if(playerdata.uid == info[j].uid){
                    this.playerHeads[index].score_text.setString(""+info[j].total);
                }
            }
        }
    }
};

gameclass.nystable.prototype.fiyAct = function(startPos,endPos,score){
    //_iconImageStr:null,
    //    _speed:null,
    //    _endPos:null,
    //    startPos:null,
    //    ctor:function(_str,_num,_speed,_dealTime,_endPos,startPos){
    //    this._super()
    //    this._endPos=_endPos;
    //    this._iconImageStr=_str;
    //    this.startPos=startPos;
    //    this.setTag(1111);
    //    this._speed=_speed;
    //    if(_num>20) _num=20;
    //    if(!_dealTime) _dealTime=0;
    //    //cc.log(_dealTime);
    //    this.schedule(this._addSp,0.1,_num,_dealTime);
    //},
    //_addSp:function(){
    //    var _sp=new cc.Sprite(this._iconImageStr);
    //    _sp.setPosition(this.startPos);
    //    _sp.runAction(cc.sequence(cc.moveTo(this._speed,this._endPos),cc.callFunc(function(){
    //        _sp.removeFromParent(true);
    //    },_sp)));
    //    this.addChild(_sp);
    //},

    var _this = this;
    var _addSp = function(){
        var sp = new cc.Sprite(res.niuniuAnimateGold);
        sp.setPosition(startPos);
        sp.runAction(cc.sequence(cc.moveTo(0.3,cc.p(endPos)),cc.callFunc(function(sender){
            sender.removeFromParent(true);
        },sp)))
        _this.node.addChild(sp);
    }
    if(score>=20) score = 25;
    else if(score >= 10) score = 10;

    for(var i = 0;i < score;i++){
        this.node.runAction(cc.sequence(cc.delayTime(i*0.08),cc.callFunc(_addSp)));
    }
};


gameclass.nystable.prototype.goldFiy = function(data){
    data.sort(function(a,b){
        return Math.abs(a.score)-Math.abs(b.score);
    });
    var minScore=0;
    for(var i=0;i<data.length;i++){
        if(data[i].score){
            minScore=data[i].score;
            break;
        }
    }
    var dealUid=null;
    var dealUidPos=null;
    for(var i=0;i<NYSMAX_PLAY_LENGTH;i++){
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
            if(!num)continue;
            var pos=null;
            for(var j=0;j<NYSMAX_PLAY_LENGTH;j++){
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
            //if(data[i].score>0){
            //    var _sp=new goldSpLayer(res.niuniuAnimateGold,Math.abs(num),0.5,1,pos,dealUidPos);
            //    this.node.addChild(_sp);
            //}else{
            //    var _sp=new goldSpLayer(res.niuniuAnimateGold,Math.abs(num),0.5,0,dealUidPos,pos);
            //    this.node.addChild(_sp);
            //}
            if(data[i].score > 0){
                this.fiyAct(dealUidPos,pos,data[i].score);
            }else{
                this.fiyAct(pos,dealUidPos,data[i].score);
            }
        }
    }
    var _this=this;
    this.scheduleOnce(function() {
        for (var j = 0; j < data.length; j++) {
            for (var i = 0; i < NYSMAX_PLAY_LENGTH; i++) {
                var playerdata = this.mod_niuniu.getplayerdata(i);
                if(playerdata && playerdata.uid == data[j].uid){
                    var index = _this.getSeat(playerdata.uid);
                    if(index == -1) {
                        continue;
                    }
                    var pos= _this.playerHeads[index]._pos;
                    if (playerdata && playerdata.uid == data[j].uid) {
                        gameclass.showYSText(data[j].score,cc.p(pos.x+20,pos.y),this.GameUIlayer);
                        _this._timeContain.setVisible(false);
                    }
                }
            }
        }
        //if(this.mod_niuniu.selfdata){
        //    var myScore = this.mod_niuniu.getplayerdata(0).score;
        //    if(myScore){
        //        this.playerEndAnim(myScore);
        //    }
        //}
    },2)
    // this.scheduleOnce(function() {
    //     var Xarr = [150, 1000, 630, 260, 150];
    //     var Yarr = [120, 300, 530, 530, 300];
    //     for (var j = 0; j < data.length; j++) {
    //         for (var i = 0; i < goldNiuMaxNum; i++) {
    //             var playerdata = this.mod_niuniu.getplayerdata(i);
    //             if (playerdata && playerdata.uid == data[j].uid) {
    //                 var index = this.getSeat(playerdata.uid);
    //                 if(index == -1) {
    //                     continue;
    //                 }
    //                 gameclass.showYSText(data[j].score,cc.p(Xarr[index],Yarr[index]),this.GameUIlayer);
    //                 _this._timeContain.setVisible(false);
    //             }
    //         }
    //     }
    //     var myScore = this.mod_niuniu.getplayerdata(0).score;
    //     if(myScore){
    //         this.playerEndAnim(myScore);
    //     }
    // },2)
};
gameclass.nystable.prototype.playerEndAnim = function(_score){
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
    sucAnim.setTag(1122);
    this.node.addChild(sucAnim);
    this._timeContain.setVisible(false);
};
gameclass.nystable.prototype.onGameNiuNiuEnd = function(data){
    var _this = this;
    //_this.maxTime = 3;
    this.endcoverLayer.setVisible(true);
    this.isShowLiangLayer(false);
    this.isGameBetsShow(false);
    _this.goldFiy(data.info);
    _this.updataUserScore(data.info);
    _this._timeContain.setVisible(false);
    _this.mod_niuniu.roominfo.state=0;
    this.scheduleOnce(function(){
        this.endcoverLayer.setVisible(false);
        for(var i = 0;i < NYSMAX_PLAY_LENGTH;i++) {
            this.playerHeads[i].rob_zhuang_img.setVisible(false);
            this.playerHeads[i].showCuoPaiState(false);
            this.playerHeads[i].light.setVisible(false);
            this.playerHeads[i].zhuang_img.setVisible(false);
        }
        if(!_this.mod_niuniu.selfdata){
            if(this.mod_niuniu.roominfo.person.length<6){
                this.seatDownBtn.setVisible(true);
            }else{
                this.seatDownBtn.setVisible(false);
            }
        }else{
            this.isGameReadyShow(true);
        }
    },3.5);


};
gameclass.nystable.prototype.onGameNiuNiuBye = function(data){
    var _this = this;
    this.endcoverLayer.setVisible(false);
    _this.game.uimgr.showui("gameclass.nysresultui");
    _this.game.uimgr.uis["gameclass.nysresultui"].setData(_this.mod_niuniu);
    //
    //this.scheduleOnce(function(){
    //
    //},4);
};
gameclass.nystable.prototype.NiuNiuInit = function(){
    var _this = this;
    _this.node = this.game.uimgr.createnode(res.nystable,true);
    _this.node.setPosition((cc.winSize.width - this.node.getContentSize().width)/2,0);
    _this.addChild(_this.node);
    _this.node.scheduleUpdate();
    _this.node.update=this.updateTime.bind(this);

    _this.Uilayer = ccui.helper.seekWidgetByName(_this.node, "UI");
    _this.Gamelayer = ccui.helper.seekWidgetByName(_this.node, "Game");
    _this.GameUIlayer = ccui.helper.seekWidgetByName(_this.node, "GameUI");

    _this.endcoverLayer = ccui.helper.seekWidgetByName(_this.Gamelayer , "endcover");
    _this.endcoverLayer.setVisible(false);

    _this.dealAnimationLayer = new cc.Node();
    _this.chatAnimationLayer=ccui.helper.seekWidgetByName(_this.node, "animateLayer");
    _this.guanZhanImg=ccui.helper.seekWidgetByName(_this.node, "guanzhanTag");
    _this.guanZhanImg.setVisible(false);
    _this.InGameChatLayer=ccui.helper.seekWidgetByName(_this.node, "InGameChatLayer");
    _this.InGameChatLayer.setVisible(true);
    //allCardlayout.setContentSize(80,110);
    //allCardlayout.setAnchorPoint(0.5,0.5);
    cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
    cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist1);
    cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist2);
    cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist3);
    cc.spriteFrameCache.addSpriteFrames(res.niuniuCountPlist);
    cc.spriteFrameCache.addSpriteFrames(res.goldniuniuCountPlist);
    _this.dealAnimationLayer.setPosition(0,0);
    _this.node.addChild(_this.dealAnimationLayer,200);
    var helpnode = ccui.helper.seekWidgetByName(_this.node, "closeinfo");
    helpnode.setVisible(false);
    this._timeContain = this.Uilayer.getChildByName("readyMovie");
    this._timerControl = new gameclass.timeTextControl(this._timeContain, res.goldTimeBar);
    this.stateImg = ccui.helper.seekWidgetByName(this.node,"Image_6");
    //helpnode.setLocalZOrder(2000);
    gameclass.createbtnpress(_this.node, "closeinfo", function () {
        helpnode.setVisible(false);
    });
    gameclass.createbtnpress(_this.node, "tuoGuangBtn", function () {
        if(!_this.mod_niuniu.selfdata) return;
        _this.mod_niuniu.tuoGuang(!_this.mod_niuniu.selfdata.trust);
        _this.tuoGuang(!_this.mod_niuniu.selfdata.trust);
    });
    //gameclass.createbtnpress(_this.node, "help", function () {
    //    helpnode.setVisible(true);
    //});

    gameclass.createbtnpress(_this.node,"checkBtn",function(){
        _this.safeLayer.safeBtncallFunc(_this.mod_niuniu.roominfo.person);
    });

    gameclass.createbtnpress(_this.node, "chat", function () {
        _this.game.uimgr.showui("gameclass.chatuinys");
        _this.game.uimgr.uis["gameclass.chatuinys"].setmod(_this.mod_niuniu);
    });

    gameclass.createbtnpress(_this.node, "set", function () {
        _this.game.uimgr.showui("gameclass.settingui");
    });
    _this.beginBtn = ccui.helper.seekWidgetByName(_this.node, "beginBtn");
    _this.beginBtn.setVisible(false);
    _this.beginBtn.addTouchEventListener(function(sender, type){
        if (ccui.Widget.TOUCH_BEGAN == type) {
            _this.mod_niuniu.gamebegin();
        }
    })
    _this.beginBtn.setVisible(false);
    _this.invitebtn = ccui.helper.seekWidgetByName(_this.node,"invitebtn");
    _this.showLayerBtn=ccui.helper.seekWidgetByName(_this.node,"showBtn");
    _this.juShuLabel= ccui.helper.seekWidgetByName(_this.node, "juShuLabel");
    _this.maskBtnLayer= ccui.helper.seekWidgetByName(_this.node, "btnLayer");
    _this.maskBtnLayer.setVisible(false)
    _this.gamebets = ccui.helper.seekWidgetByName(_this.node, "gamebets");
    _this.isGameBetsShow(false);
    _this.qzbtnLayer=ccui.helper.seekWidgetByName(_this.node, "QZbtnLayer");
    _this.qzbtnLayer.setVisible(false);
    _this.showCardLayer=ccui.helper.seekWidgetByName(_this.node, "btn_showCardLayer");
    _this.isShowLiangLayer(false);
    _this.cuoPaiLayer=ccui.helper.seekWidgetByName(_this.node, "btn_cuoPaiLayer");
    _this.isShowCuoPaiLayer(false);
    _this.jieSuanBtn=ccui.helper.seekWidgetByName(_this.node, "exitRoom");
    _this.tuiChuBtn=ccui.helper.seekWidgetByName(_this.node, "backBtn");
    _this.roomHelpLayer=this.game.uimgr.createnode(res.niuniuRoomHelpJson,true);
    _this.node.addChild(_this.roomHelpLayer,10);
    _this.roomHelpLayer.setVisible(false);
    gameclass.createbtnpress(_this.node, "helpRuleBtn", function () {
        _this.roomHelpLayer.setVisible(true);
    });
    gameclass.createbtnpress(_this.roomHelpLayer, "btnLayer", function () {
        _this.roomHelpLayer.setVisible(false);
    });
    _this.showBtnState(false,false);
    for(var i=0;i<_this.cuoPaiLayer.getChildren().length;i++){
        if(i==0){
            _this.cuoPaiLayer.getChildren()[i].addTouchEventListener(function(sender,type){
                if (ccui.Widget.TOUCH_ENDED == type) {
                    _this.cuoType=0;
                    if(_this.mod_niuniu.roominfo.type==gameclass.gamenys||_this.mod_niuniu.roominfo.type==gameclass.gamebrnys){
                        _this.gameFanPaiCallBack();
                    }else{
                        _this.onGameSendOtherCard();
                    }
                }
            });
        }else{
            _this.cuoPaiLayer.getChildren()[i].addTouchEventListener(function(sender,type){
                if (ccui.Widget.TOUCH_ENDED == type) {
                    _this.cuoType=1;
                    if(_this.mod_niuniu.roominfo.type==gameclass.gamenys||_this.mod_niuniu.roominfo.type==gameclass.gamebrnys){
                        _this.gameFanPaiCallBack();
                    }else{
                        _this.onGameSendOtherCard();
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
    _this.seatDownBtn=ccui.helper.seekWidgetByName(_this.node, "seatDownBtn");
    _this.seatDownBtn.setVisible(false);
    _this.seatDownBtn.addTouchEventListener(function(sender,type){
        if (ccui.Widget.TOUCH_ENDED == type) {
            this.mod_niuniu.gameseat();
            this.mod_niuniu.gameready();
        }
    },this)

    this.safeLayer = new gameclass.checkSafeLayer(this.node,this.game,ccui.helper.seekWidgetByName(this.node,"checkBtn"));
    this.safeLayer.setName("safeLayer");
    this.node.addChild(this.safeLayer);
    //this.safeLayer.setVisible(false);
    //this.btn_safe = ccui.helper.seekWidgetByName(this.safeLayer,"checkBtn");

    //gameclass.createbtnpress(_this.node, "sharelayer", function () {
    //    _this.sharelayer.setVisible(false);
    //});
    gameclass.createbtnpress(_this.node, "showBtn", function () {
        _this.showLayerBtn.setScaleY(-_this.showLayerBtn.getScaleY());
        if(_this.showLayerBtn.getScaleY()>0){
            _this.maskBtnLayer.setVisible(true);
        }else{
            _this.maskBtnLayer.setVisible(false);
        }
    });
    gameclass.createbtnpress(_this.node, "btnLayer", function () {
        _this.showLayerBtn.setScaleY(-_this.showLayerBtn.getScaleY());
        if(_this.showLayerBtn.getScaleY()>0){
            _this.maskBtnLayer.setVisible(true);
        }else{
            _this.maskBtnLayer.setVisible(false);
        }
    });
    gameclass.createbtnpress(_this.node, "exitRoom", function () {
        _this.game.uimgr.showui("gameclass.msgboxui");
        _this.game.uimgr.uis["gameclass.msgboxui"].setString("是否想要解散房间？",function(){
            _this.mod_niuniu.dissmissroom(1);
        });
    });
    gameclass.createbtnpress(_this.node, "backBtn", function () {
        _this.game.uimgr.showui("gameclass.msgboxui");
        _this.game.uimgr.uis["gameclass.msgboxui"].setString("退出后房间保留，如果10分钟后未开始自动解散并返回房卡。(坐下后房主可直接解散房间)",function(){
            _this.mod_niuniu.dissmissroom(0);
        });
    });
    gameclass.createbtnpress(_this.node, "invitebtn", function () {
        _this.share();
        if(window.wx)
        {
            //_this.sharelayer.setVisible(true);
        }
    });

    _this.ready = ccui.helper.seekWidgetByName(_this.node, "ready");
    gameclass.createbtnpress(_this.node, "ready", function () {
        _this.isGameReadyShow(false);
        _this.mod_niuniu.gameready();
    });

    for(var i = 1; i < 4; i++) {
        gameclass.createbtnpress(this.node, "gamebets" + i, function (sender, _2, index) {
            _this.mod_niuniu.gamebets(sender.getChildByName("label").getString());
            _this.isGameBetsShow(false);
        }, null, null, i);
    }
    var _childArr=_this.qzbtnLayer.getChildren();
    for (var i=0;i<_childArr.length;i++){
        var nodeName=_childArr[i].getName();
        var _index=nodeName.split("_")[1];
        gameclass.createbtnpress(this.node, nodeName, function (_1, _2, index) {
            _this.mod_niuniu.gamedealer(index);
            _this.qzbtnLayer.setVisible(false);
        }, null, null, _index);
    }

    this.talkPos = [cc.p(110,115),cc.p(940,235),cc.p(910,390),cc.p(925,450),
        cc.p(580,480),cc.p(175,450),cc.p(240,360),cc.p(240,215)];
};
gameclass.nystable.prototype.showBtnState=function (state,state1) {

    if(this.mod_niuniu && this.mod_niuniu.roominfo.step > 0){
        this.tuiChuBtn.setEnabled(false);
        this.tuiChuBtn.setOpacity(125);
        this.jieSuanBtn.setEnabled(true);
        this.jieSuanBtn.setOpacity(255);
    }else{
        if(state){
            this.tuiChuBtn.setOpacity(255);
        }else{
            this.tuiChuBtn.setOpacity(125);
        }
        if(state1){
            this.jieSuanBtn.setOpacity(255);
        }else{
            this.jieSuanBtn.setOpacity(125);
        }
        this.tuiChuBtn.setEnabled(state);
        this.jieSuanBtn.setEnabled(state1);
    }
};
gameclass.nystable.prototype.tuoGuang=function(_isTuoGuang){
    if(!this.mod_niuniu.selfdata)return;
    this.mod_niuniu.selfdata.trust=_isTuoGuang;
    if(_isTuoGuang){
        if(this.ready.isVisible()){
            this.isGameReadyShow(false);
            this.mod_niuniu.gameready();
        }else if(this.gamebets.isVisible()){
            var tuiZhuLayer=this.gamebets.getChildren();
            this.mod_niuniu.gamebets(tuiZhuLayer[0].getChildByName("label").getString());
            this.isGameBetsShow(false);
        }else if(this.qzbtnLayer.isVisible()){
            this.mod_niuniu.gamedealer(0);
            this.qzbtnLayer.setVisible(false);
        }else if(this.cuoPaiLayer.isVisible()){
            this.onGameSendOtherCard();
        }else if(this.showCardLayer.isVisible()){
            this.mod_niuniu.gameview();
        }
    }
    var _tuoNum=0;
    if(_isTuoGuang)_tuoNum=1;
    ccui.helper.seekWidgetByName(this.node,"tuoGuangBtn").loadTextureNormal(res["tuoGuang_"+_tuoNum]);
},
    gameclass.nystable.prototype.tiShiCallBack=function(sender,type){
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
gameclass.nystable.prototype.showCardCallBack=function () {

};
gameclass.nystable.prototype.isShowQiangZhuang = function(b) {
    if(b){
        if(!this.mod_niuniu.selfdata){
            this.qzbtnLayer.setVisible(false);
            return ;
        }
        var num=parseInt((this.mod_niuniu.roominfo.param1/10000)%10);
        var childarr=this.qzbtnLayer.getChildren();
        cc.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",this.mod_niuniu.roominfo.type)
        if(this.mod_niuniu.roominfo.type==gameclass.gamezynys){
            num=1;
            childarr[1].getChildByName("qiangzhuang").setVisible(true);
            childarr[1].getChildByName("onebei").setVisible(false);
        }else{
            childarr[1].getChildByName("qiangzhuang").setVisible(false);
            childarr[1].getChildByName("onebei").setVisible(true);
        }
        this.qzbtnLayer.x=cc.winSize.width/2;
        this.qzbtnLayer.x+=((4-num)*65);
        if(this.mod_niuniu.selfdata.trust){
            this.mod_niuniu.gamedealer(0);
            this.qzbtnLayer.setVisible(false);
            return;
        }
        cc.log("eeeeeeeeeeeeeeeeeee",num)
        for(var i=0;i<childarr.length;i++){
            if(i<=num){
                childarr[i].setVisible(true);
            }else{
                childarr[i].setVisible(false);
            }
        }

    }
    this.qzbtnLayer.setVisible(b);
};
gameclass.nystable.prototype.isGameReadyShow = function(b) {
    if(b){
        if(this.mod_niuniu.selfdata&&this.mod_niuniu.selfdata.trust){
            this.isGameReadyShow(false);
            this.mod_niuniu.gameready();
            return;
        }
    }
    this.ready.setVisible(b);
};
gameclass.nystable.prototype.isGameBetsShow = function(b) {
    this.gamebets.x=cc.winSize.width/2;
    var tuiZhuLayer=this.gamebets.getChildren();
    if(b){
        var _dealUid=null;
        for(var i=0;i<this.mod_niuniu.roominfo.person.length;i++){
            if(this.mod_niuniu.roominfo.person[i].dealer){
                _dealUid=this.mod_niuniu.roominfo.person[i].uid;
                break;
            }
        }
        //this.createProgressBar(_dealUid,"ProgressBar");//创建叫分进度框
        if(_dealUid==this.mod_niuniu.uid)return;
        var _tuiZhuNum=0;
        if(this.mod_niuniu.roominfo.param1%10&&this.mod_niuniu.getplayerdata(0).robdeal==0){
            _tuiZhuNum=0;
        }else{
            _tuiZhuNum=this.mod_niuniu.getplayerdata(0).tz;
        }
        if(!this.mod_niuniu.selfdata){
            this.gamebets.setVisible(false);
            return ;
        }
        if(_tuiZhuNum&&_tuiZhuNum!=tuiZhuLayer[0].getChildByName("label").getString()&&tuiZhuLayer[1].getChildByName("label").getString()){
            tuiZhuLayer[2].setVisible(true);
            tuiZhuLayer[2].getChildByName("label").setString(_tuiZhuNum);
        }
        else{
            tuiZhuLayer[2].setVisible(false);
            this.gamebets.x+=65;
        }
        var num=parseInt(this.mod_niuniu.roominfo.param1/1000000)%10+1;
        for(var i=0;i<2;i++){
            tuiZhuLayer[i].getChildByName("label").setString(num*(i+1));
        }
        if(this.mod_niuniu.roominfo.param1%10){
            if(this.mod_niuniu.getplayerdata(0).robdeal>0){
                tuiZhuLayer[0].setTouchEnabled(false);
                tuiZhuLayer[0].setOpacity(120);
            }else{
                tuiZhuLayer[0].setTouchEnabled(true);
                tuiZhuLayer[0].setOpacity(255);
            }
        }
        if(this.mod_niuniu.selfdata&&this.mod_niuniu.selfdata.trust){
            this.mod_niuniu.gamebets(tuiZhuLayer[0].getChildByName("label").getString());
            this.isGameBetsShow(false);
            return;
        }
        var data=this.mod_niuniu.getplayerdata(0);
        if(data.bets==-1){
            this.gamebets.setVisible(true);
        }

    }
    this.gamebets.setVisible(b);
}
gameclass.nystable.prototype.updateHandCardPosY = function(handCard) {
    for(var i = 0;i<handCard.length;i++){
        if(handCard[i].isUp){
            handCard[i].isUp = false;
            handCard[i].setPositionY(0);
        }
    }
};
gameclass.nystable.prototype.updateHandCardPosY_2 = function(handCard,calarr) {
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
gameclass.nystable.prototype.cleanCal = function() {
    var _this = this;
    for(var i = 0;i<_this.calArr.length;i++){
        _this.updataCalText(i,0);
        _this.calArr[i] = 0;
    }
    this.calTextArr[3].setString(""+0);
    this.calIndex = 0;
    this.isMingPai(_this.calArr);
};
gameclass.nystable.prototype.showToast = function(_text,delay){
    if(this.node.getChildByTag(123456)){
        return;
    }
    var _this = this;
    //var node = new cc.Sprite(res.img_input);
    var node = new ccui.ImageView(res.img_input,ccui.Widget.LOCAL_TEXTURE);
    node.setScale9Enabled(true);
    node.setContentSize(650,80);
    //var node = new cc.LayerColor(cc.color(0,0,0,150),400,40);
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
gameclass.nystable.prototype.toTips = function(handCard) {
    var _this = this;
    //cc.log("handCard="+handCard);
    var result = mod_compare.tipsNiu(handCard);
    //cc.log(result);
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
gameclass.nystable.prototype.toMingPai = function(handCard) {
    var _this = this;
    //cc.log("calArr"+_this.calArr);
    //cc.log("handCard"+handCard);
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
gameclass.nystable.prototype.uniq = function(arr1,arr2) {
    var arr = [];
    for (var i = 0; i < arr1.length; i++) {
        if (0 > arr2.indexOf(arr1[i])) {
            arr.push(arr1[i]);
        }
    }
    return arr;
};
gameclass.nystable.prototype.crateniuniuani = function(cardlst,soundniu)  {

    var spr = new cc.Sprite();

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
        mod_sound.playeffect(g_music["niu_" + index + "_w"],false);
    }

    return spr;
};
gameclass.nystable.prototype.timeState = function(){
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
gameclass.nystable.prototype.micLayerState = function(){
    var _this = this;
    var mic = ccui.helper.seekWidgetByName(_this.node, "mic");
    var miclayer = ccui.helper.seekWidgetByName(_this.node, "micLayer");
    miclayer.setVisible(false);
    var anim = new sp.SkeletonAnimation(res.voiceJson, res.voiceAtlas);
    anim.setPosition(64,64);
    anim.setScale(0.7);
    miclayer.addChild(anim);
    anim.setAnimation(0, 'animation', true);

    var oldvnum = mod_sound.getEffectsVolume();
    var oldmnum =mod_sound.getMusicVolume();
    var btnFunc = function (sender, type) {
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
    };
    mic.addTouchEventListener(btnFunc);
};

gameclass.nystable.prototype.getHeadIndex = function(index){
    var headIndex = -1;
    if(this.mod_niuniu.roominfo.type != gameclass.gamebrnys){
        if(index == 0) headIndex = 0;
        else if(index == 1) headIndex = 1;
        else if(index == 2) headIndex = 3;
        else if(index == 3) headIndex = 4;
        else if(index == 4) headIndex = 5;
        else if(index == 5) headIndex = 7;
    }else{
        headIndex = index;
    }
    return headIndex;
};
gameclass.nystable.prototype.onchat = function(data){
    //cc.log(data)
    var _this = this;
    for(var i = 0;i < 13; i++){
        if(g_chatstr_nys[i] == data.chat){
            mod_sound.playeffect(this.getSex(data.uid)==0?nys_manTalk[i+1]:nys_womanTalk[i+1]);
        }
    }
    var arr = [
        res.chatbg_ld,
        res.chatbg_rd,
        res.chatbg_rd,
        res.chatbg_ud,
        res.chatbg_ud1,
        res.chatbg_ud1,
        res.chatbg_ld,
        res.chatbg_ld,
    ]

    for (var i = 0;i < NYSMAX_PLAY_LENGTH;i ++) {
        var player = _this.mod_niuniu.getplayerdata(i);
        if (player != null && player.uid == data.uid) {
            var index = this.getSeat(player.uid);
            if(index == -1) {
                continue;
            }
            var headIndex = this.getHeadIndex(index);

            var talkPos = _this.talkPos[headIndex];
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
                    s9.setBackGroundImage(arr[headIndex]);
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
                if( index < 4 && index > 0){
                    _node.setPosition(talkPos.x - s9.width, talkPos.y);
                }else{
                    _node.setPosition(talkPos);
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
                for (var j = 0;j < NYSMAX_PLAY_LENGTH;j ++) {
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
gameclass.nystable.prototype.getSex = function(uid){
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
    gameclass.nystable.prototype.share = function(){
        var wf="看牌抢庄，"
        if(this.mod_niuniu.roominfo.type == gameclass.gamenys){
            wf = "看牌抢庄，";
        }else if(this.mod_niuniu.roominfo.type == gameclass.gamebrnys){
            wf = "八人明牌，";
        }else if(this.mod_niuniu.roominfo.type == gameclass.gamezynys){
            wf = "自由抢庄，";
        }else if(this.mod_niuniu.roominfo.type == gameclass.gamegdnys){
            wf = "固定庄家，";
        }else if(this.mod_niuniu.roominfo.type == gameclass.gamesznys){
            wf = "牛牛上庄，";
        }
        var df="";
        var jus="共" + this.mod_niuniu.roominfo.maxstep + "局，";
        var tuiZhu="";
        var _num=parseInt(this.mod_niuniu.roominfo.param1/100)%10;
        if(_num==0){
            tuiZhu="";
        }else if(_num==1){
            tuiZhu="5倍推注，";
        }else if(_num==2){
            tuiZhu="10倍推注，";
        }else if(_num==3){
            tuiZhu="15倍推注，";
        }
        var _num=parseInt(this.mod_niuniu.roominfo.param1/1000000)%10;
        if(_num==0){
            df="底分：1/2，";
        }else if(_num==1){
            df="底分：2/4，";
        }else if(_num==2){
            df="底分：3/6，";
        }else if(_num==3){
            df="底分：4/8，";
        }else if(_num==4){
            df="底分：5/10，";
        }
        var strtxt = wf + tuiZhu + df + jus +"大家都等您，快来吧。"
        gameclass.mod_platform.invitefriend(strtxt,
            "http://www.hbyouyou.com/down/android/name/poker",
            this.mod_niuniu.roominfo.roomid+"-畅游棋牌");
    };

gameclass.nystable.prototype.checkSafe = function (people) {
    this.safeLayer.checkSafe(people);
};

/*
 * 开局后 玩家掉线
 * */
gameclass.nystable.prototype.userLineOut = function (index, data) {
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
}







