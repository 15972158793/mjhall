gameclass.pdktableFk = gameclass.baseui.extend({
    node:null,
    mod_pdk:null,
    players:null,
    ongameview:null,
    curround:null,
    ready:null,
    tool_cardType:null,
    pdkenddata:null,
    RoomMax:null,//房间最大次数
    RoomMin:null,//房间剩余次数
    zhuangJia:null,//庄家UID
    savebefCard:null,//上家打出的牌
    difen:null,
    isPDKend:null,// 时间显示控制/*一局结算还是总结算
    curStep:0,  //当前该谁出牌 UID
    playerCardCounts:null,//玩家手牌数组
    isbaopei:null,//是否会包赔
    createinfo:null,
    zhankai:null,
    clock:null,
    clocktime:null,

    ctor: function () {
        this._super();
        this.players = [];
        this.createinfo=[];
        this.playerCardCounts = {};
    },

    show:function(){
        this.node = this.game.uimgr.createnode(res.pdktableFk,true);
        this.node.setPosition((cc.winSize.width - this.node.getContentSize().width)/2,0);
        this.addChild(this.node);

        var _this = this;
        cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
        cc.spriteFrameCache.addSpriteFrames(res.bombplist);
        cc.spriteFrameCache.addSpriteFrames(res.feijiplist);
        cc.spriteFrameCache.addSpriteFrames(res.shunzplist);
        cc.spriteFrameCache.addSpriteFrames(res.wangzhaplist);
        cc.spriteFrameCache.addSpriteFrames(res.spring0plist);
        cc.spriteFrameCache.addSpriteFrames(res.lianduilist);
        cc.spriteFrameCache.addSpriteFrames(res.alarmplist);

        _this.btn_closeCaidan = ccui.helper.seekWidgetByName(this.node,"btn_exitCaidan");
        _this.btn_closeCaidan.setVisible(false);
        _this.invitebtn = ccui.helper.seekWidgetByName(_this.node, "invitebtn");
        _this.chatAnimationLayer = ccui.helper.seekWidgetByName(_this.node, "animateLayer");
        _this.ready=ccui.helper.seekWidgetByName(_this.node, "gamestart");

        gameclass.createbtnpress(this.node, "btn_open", function () {
            if(_this.zhankai) return;
            ccui.helper.seekWidgetByName(_this.node,"btn_list").runAction(cc.sequence(cc.moveTo(0.3,cc.p(140,320)),cc.callFunc(function(){
                _this.zhankai = true;
                _this.btn_closeCaidan.setVisible(true);
            })))
        });

        gameclass.createbtnpress(this.node, "btn_exitCaidan", function () {
            if(!_this.zhankai) return;
            ccui.helper.seekWidgetByName(_this.node,"btn_list").runAction(cc.sequence(cc.moveTo(0.3,cc.p(-130,320)),cc.callFunc(function(){
                _this.zhankai = false;
                _this.btn_closeCaidan.setVisible(false);
            })))
        });

        gameclass.createbtnpress(this.node, "setting", function () {
            _this.game.uimgr.showui("gameclass.settingui");
        });
        gameclass.createbtnpress(this.node, "exitroom", function () {
            _this.mod_pdk.isover = false;
            _this.game.uimgr.showui("gameclass.msgboxui");
            _this.game.uimgr.uis["gameclass.msgboxui"].setString("是否想要解散房间？",function(){
                _this.mod_pdk.dissmissroom();
            });
        });

        gameclass.createbtnpress(this.node, "invitebtn", function () {
            _this.share();
        });

        this.zhankai = false;
        _this.clock=ccui.helper.seekWidgetByName(this.node,"clock");
        _this.btn_list = ccui.helper.seekWidgetByName(_this.node, "btn_list");

        _this.sharelayer = ccui.helper.seekWidgetByName(_this.node, "sharelayer");
        _this.btn_chupai = ccui.helper.seekWidgetByName(_this.node, "btn_chupai");
        _this.btn_tishi = ccui.helper.seekWidgetByName(_this.node, "btn_tishi");
        _this.btn_buchu = ccui.helper.seekWidgetByName(_this.node, "btn_buchu");
        _this.sharelayer.setVisible(false);
        _this.btn_chupai.setVisible(false);
        _this.btn_tishi.setVisible(false);
        _this.btn_buchu.setVisible(false);

        _this.showbaopei = ccui.helper.seekWidgetByName(_this.node, "showbaopei");

        gameclass.createbtnpress(this.node, "btn_chupai", (function () {
            _this.btn_chupaifunc();
        }).bind(_this));

        gameclass.createbtnpress(this.node, "btn_tishi", function () {
            _this.btn_tishifunc();
        });

        gameclass.createbtnpress(this.node, "btn_buchu", function () {
            if(_this.curStep != _this.mod_pdk.uid) {
                return;
            }
            _this.passCard();
        });

        for(var i = 1; i < 3; i++) {
            ccui.helper.seekWidgetByName(this.node, "head" + i).addTouchEventListener( function (sender, type) {
                _this.game.uimgr.showui("gameclass.chatMicLayer");
                var str = sender.getName();
                var str1 = str.substring(4,5);
                var playerdata=_this.mod_pdk.getplayerdata(str1);
                _this.game.uimgr.uis["gameclass.chatMicLayer"].setPlayerInfo(playerdata,_this.mod_pdk);
            });
        }

        for (var i = 0;i < 3; i++){
            var data = {};
            data.head = ccui.helper.seekWidgetByName(this.node, "head" + i);
            data.headbg = ccui.helper.seekWidgetByName(this.node, "headbg" + i);
            data.dizhu = ccui.helper.seekWidgetByName(this.node, "isdizhu" + i);
            data.zhuang = ccui.helper.seekWidgetByName(this.node, "zhuang" + i);
            data.cards = ccui.helper.seekWidgetByName(this.node, "notifynode" + i);
            data.outCards = ccui.helper.seekWidgetByName(this.node, "hitoutCardView" + i);
            data.ok = ccui.helper.seekWidgetByName(this.node, "ok" + i);
            data.icon = null;//ccui.helper.seekWidgetByName(this.node, "icon" + i);
            data.ip_id = ccui.helper.seekWidgetByName(this.node, "ip_id" + i);
            data.playerid = ccui.helper.seekWidgetByName(this.node, "playerid" + i);
            data.playerip = ccui.helper.seekWidgetByName(this.node, "playerip" + i);
            data.address = ccui.helper.seekWidgetByName(this.node, "address" + i);
            data.playername = ccui.helper.seekWidgetByName(this.node, "playername" + i);
            data.userScore = ccui.helper.seekWidgetByName(this.node, "jifenText" + i);
            data.alarm = ccui.helper.seekWidgetByName(_this.node, "alarm" + i);
            data.pokerback = ccui.helper.seekWidgetByName(_this.node, "pokerback" + i);
            data.alarmcount = ccui.helper.seekWidgetByName(_this.node, "alarmcount" + i);
            data.uid=ccui.helper.seekWidgetByName(_this.node, "uid" + i);
            data.sex=0;
            this.players[i] = data;

            this.players[i].uid.setVisible(false);
            this.players[i].head.setVisible(false);
            this.players[i].dizhu.setVisible(false);
            this.players[i].zhuang.setVisible(false);
            this.players[i].ok.setVisible(false);
            this.players[i].pokerback.setVisible(false);
            this.players[i].alarmcount.setVisible(false);
            this.players[i].alarm.setVisible(false);
            this.players[i].ip_id.setVisible(false);
            this.players[i].userScore.setString("0");
        }
    },

    setmod: function (_mod) {
        this.mod_pdk = _mod;
        this.mod_pdk.bindUI(this);
        var _this = this;
        this.tool_cardType = new gameclass.tool_pdkcardType;
        this.mod_pdk.mainUI = this;

        if (_this.mod_pdk.roominfo.time != 0){
            _this.game.uimgr.showui("gameclass.exitroom",false);
            _this.game.uimgr.uis["gameclass.exitroom"].setData(_this.mod_pdk,_this.mod_pdk.roominfo);
        };

        this.initMicView();
        this.initTimeView();
        this.initHelpView();
        this.mod_pdk.onupdateroominfo = this.onupdateroominfo.bind(this);
        this.mod_pdk.ongameready = this.ongameready.bind(this);
        this.mod_pdk.onchat = this.onchat.bind(this);
        this.mod_pdk.ongamePDKbegin = this.ongamePDKbegin.bind(this);
        this.mod_pdk.ongamepdkstep = this.ongamepdkstep.bind(this);
        this.mod_pdk.onPDKgamedealer = this.onPDKgamedealer.bind(this);
        this.mod_pdk.ongamedealer = this.ongamedealer.bind(this);
        this.ongameview = 0;
        this.mod_pdk.ongameview = this.ongameviewf.bind(this);
        this.mod_pdk.ongamepdkbye = this.ongamepdkbye.bind(this);
        this.mod_pdk.ongamePDKend = this.ongamePDKend.bind(this);

        ccui.helper.seekWidgetByName(_this.node, "roomnum").setString("房号:"+_this.mod_pdk.roomnum.toString());
        if(parseInt(_this.mod_pdk.roominfo.param1/1000)%10 == 1){//! 必须管
            _this.btn_tishi.setPositionX(cc.winSize.width*0.44);
            _this.btn_chupai.setPositionX(cc.winSize.width*0.56);
        }

        gameclass.createbtnpress(this.node, "chat", function () {
            _this.game.uimgr.showui("gameclass.chatui");
            _this.game.uimgr.uis["gameclass.chatui"].setmod(_this.mod_pdk);
        });

        this.curround =  ccui.helper.seekWidgetByName(_this.node, "curround");
        this.reset();
        this.refplayerinfo();
    }
});

//! 初始化语音信息
gameclass.pdktableFk.prototype.initMicView = function(){
    var _this = this;
    var mic = ccui.helper.seekWidgetByName(_this.node, "mic");
    var miclayer = ccui.helper.seekWidgetByName(_this.node, "miclayer");
    miclayer.setVisible(false);
    var imgmic = ccui.helper.seekWidgetByName(_this.node, "imgmic");
    var ani = cc.sequence(cc.scaleTo(0.8,1),cc.scaleTo(0.8,0.8));
    imgmic.runAction(cc.repeatForever(ani));
    var oldvnum = mod_sound.getEffectsVolume();
    var oldmnum =mod_sound.getMusicVolume();
    mic.addTouchEventListener( function (sender, type) {
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

};

//! 初始化时间
gameclass.pdktableFk.prototype.initTimeView = function(){
    var _this = this;
    var titiletime =  ccui.helper.seekWidgetByName(_this.node, "roomnum_0");
    var reftime = function () {
        var myDate = new Date();
        var str = myDate.Format("hh:mm:ss");
        titiletime.setString(str);
    };
    reftime();
    var func = cc.repeatForever(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
        reftime();
    })));
    titiletime.runAction(func);
};

//! 初始化帮助信息
gameclass.pdktableFk.prototype.initHelpView = function() {

    var _this = this;
    var helpnode = ccui.helper.seekWidgetByName(_this.node, "closeinfo");
    helpnode.setVisible(false);
    ccui.helper.seekWidgetByName(_this.node, "help").setVisible(false);
    gameclass.createbtnpress(this.node, "help", function () {
        helpnode.setVisible(true);
    });
    gameclass.createbtnpress(this.node, "closeinfo", function () {
        helpnode.setVisible(false);
    });
}

//! 更新房间信息
gameclass.pdktableFk.prototype.onupdateroominfo = function (data) {
    var _this = this;
    _this.refplayerinfo();

};

//准备
gameclass.pdktableFk.prototype.ongameready = function (data) {
    var _this = this;
    //_this.refplayerinfo();
    for(var i = 0;i<3;i++) {
        for(var j = 0; j<3;j++){
            if(this.mod_pdk.roominfo.person[j] && this.players[i].data)
            {
                if( this.players[i].data.uid == this.mod_pdk.roominfo.person[j].uid && this.mod_pdk.roominfo.person[j].ready){
                    this.players[i].ok.setVisible(true);
                }
            }
        }
    }
};

//进入下一局重置
gameclass.pdktableFk.prototype.resetPDKNext = function(){
    this.btn_chupai.setVisible(false);
    this.btn_tishi.setVisible(false);
    this.btn_buchu.setVisible(false);
    this.clock.setVisible(false);
    this.isbaopei=false;
    this.showbaopei.setVisible(false);
    if(this.mod_pdk.roominfo.person.length > (this.mod_pdk.roominfo.param1/10000%10)==1?2:3 ){//! 两人或三人玩法
        this.invitebtn.setVisible(false);
    }

    this.savebefCard = [];
    this.zhuangJia = 0;
    this.bets = 0;
    this.difen = 0;
    this.alarmUid = [true,true,true];
    for(var i = 0;i<3;i++) {
        this.players[i].alarm.setVisible(false);
        this.players[i].alarmcount.setVisible(false);
        this.players[i].pokerback.setVisible(false);
        this.players[i].cards.removeAllChildren();
        this.players[i].outCards.removeAllChildren();
    }

};

gameclass.pdktableFk.prototype.getSex=function(index){
    var sex = this.players[index].sex;
    if(sex == 1 || sex == 2){
        return sex-1;
    }else{
        return 0;
    }
},

//聊天
gameclass.pdktableFk.prototype.onchat = function(uid,data){
        var _this = this;

        var index=0;
        for(var i = 0;i < 3;i++){
            if(_this.players[i].data && _this.players[i].data.uid == uid)
            {
                index=[i];
            }
        }
        for(var i = 0;i < g_womanTalk.length;i++){
            if(data.chat ==  g_chatstr[i]){
                var soundEffect = this.getSex(index)==0?g_manTalk[i]:g_womanTalk[i];
                mod_sound.playeffect(soundEffect);
                break;
            }
        }

        for (var i = 0;i < 3;i ++) {
            var player = _this.mod_pdk.getplayerdata(i);
            var otherddata = _this.mod_pdk.getplayerotherdata(i);
            var playernode = _this.players[i].head;
            if (player != null && player.uid == data.uid) {

                var _node = new ccui.Layout();

                var s9 = null;
                if(data.type !=4 )
                {
                    if(i == 1){
                        s9 = new cc.Scale9Sprite(res.chatbg_rd);
                    }else if(i == 2){
                        s9 = new cc.Scale9Sprite(res.chatbg_lt);
                    }else{
                        s9 = new cc.Scale9Sprite(res.chatbg_ld);
                    }

                    s9.setCapInsets(cc.rect(60,10,10,10));
                    s9.setAnchorPoint(cc.p(0,0));
                    s9.setPosition(cc.p(-15,-15));
                    _node.addChild(s9);
                }

                if(data.type == 1){
                    var helloLabel = new cc.LabelTTF(data.chat, "Arial", 36);
                    helloLabel.setAnchorPoint(cc.p(0,0));
                    helloLabel.setColor(cc.color(0,0,0));
                    _node.addChild(helloLabel);

                    if (i == 2){
                        _node.setPosition(cc.p(0,-40))
                    }else if (i == 1){
                        _node.setPosition(cc.p(-(helloLabel.getContentSize().width - _node.getContentSize().width),playernode.getContentSize().height))
                    }else{
                        _node.setPosition(cc.p(0,playernode.getContentSize().height))
                    }
                    s9.setContentSize(helloLabel.getContentSize().width + 30,helloLabel.getContentSize().height + 30);
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

                    //_node.setContentSize(_dw,_dh);
                    if (i == 2){
                        _node.setPosition(cc.p(100,-40))
                    }else if (i == 1){
                        _node.setPosition(cc.p(0,playernode.getContentSize().height));
                    }else{
                        _node.setPosition(cc.p(100,playernode.getContentSize().height))
                    }
                }else if (data.type == 3){
                    gameclass.mod_platform.playurl(data.chat);

                    var spr = new cc.Sprite();
                    spr.initWithFile(res.soundopen);
                    spr.setAnchorPoint(cc.p(0.5,0.5));
                    spr.setPosition(cc.p(spr.getContentSize().width/2,spr.getContentSize().height/2));

                    _node.addChild(spr);

                    if (i == 2){
                        _node.setPosition(cc.p(100,-40))
                    }else if (i == 1){
                        _node.setPosition(cc.p(0,playernode.getContentSize().height));
                    }else{
                        _node.setPosition(cc.p(100,playernode.getContentSize().height))
                    }
                }
                else if(data.type == 4){
                    var _senderObj=JSON.parse(data.chat);
                    var _animateNode=new cc.Node();
                    _animateNode.setScale(0.8);
                    _senderObj.type+=1;
                    this.chatAnimationLayer.removeAllChildren(true);
                    var sucAnim = new sp.SkeletonAnimation(g_magic_chat["magic_chat_"+_senderObj.type+"_1_json"], g_magic_chat["magic_chat_"+_senderObj.type+"_1_atlas"]);
                    sucAnim.setAnimation(0, 'animation', false);
                    sucAnim.setAnchorPoint(0.5,0.5);
                    _animateNode.addChild(sucAnim);
                    var senderPos= playernode.getPosition();

                    //var senderPos=_this.playerHeads[i]._pos;
                    _animateNode.setPosition(senderPos);
                    var hitPos=null;
                    for (var j = 0;j < 3;j ++) {
                        var player = _this.mod_pdk.getplayerdata(j);
                        if(player&&player.uid==_senderObj.hitUid){
                            hitPos=_this.players[j].head.getPosition();
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
                playernode.addChild(_node);

                var seq = cc.sequence(cc.delayTime(3),cc.callFunc(function(){
                    _node.removeFromParent(true);
                }));
                _node.runAction(seq);
            }
        }
};

//更新玩家总分
gameclass.pdktableFk.prototype.updataTotal = function(data){
    for(var i=0;i<3;i++) {
        for(var j=0;j<3;j++) {
            if(data.info[i]!=null && this.players[j].data!=null)
            {
                if (data.info[i].uid == this.players[j].data.uid) {
                    this.players[j].userScore.setString(data.info[i].score);
                    //cc.log("score" + data.info[i].total);
                }
            }
        }
    }
};

//更新玩家总分
gameclass.pdktableFk.prototype.updataTotal1 = function(data){
    for(var i=0;i<3;i++) {
        for(var j=0;j<3;j++) {
            if(data.info[i]!=null && this.players[j].data!=null)
            {
                if (data.info[i].uid == this.players[j].data.uid) {
                    this.players[j].userScore.setString(data.info[i].total);
                    //cc.log("score" + data.info[i].total);
                }
            }
        }
        //_this.players[i].head.setPosition(_this.players[i].head.getPositionX()+ 200,_this.players[i].head.getPositionY()+150);
        //cc.log("startPos="+endPos[i].x+","+endPos[i].y);
        //cc.log("head="+_this.players[i].head.getPositionX()+","+_this.players[i].head.getPositionY());
    }
};


//! 游戏开始
gameclass.pdktableFk.prototype.ongamePDKbegin = function(data){
    var _this = this;
    _this.playerCardCounts = {};

    for(var i = 0;i<3;i++){
        if(_this.players[i].data!=null){
            for(var j=0;j<data.info.length;j++){
                if(_this.players[i].data.uid== data.info[j].uid) {
                    _this.players[i].zhuang.setVisible(data.info[j].deal);
                }
            }
            _this.playerCardCounts[ _this.players[i].data.uid ] = 16;

            cc.log("========ongamePDKbegin",_this.mod_pdk.roominfo.param1);
            if(parseInt(_this.mod_pdk.roominfo.param1/10)%10 == 1){//! 显示剩余牌数
                _this.players[i].alarmcount.setVisible(true);
                _this.players[i].pokerback.setVisible(true);
            }
            _this.curCardCount(_this.players[i].data.uid,0);
        }
    }

    _this.curStepUser();
    _this.invitebtn.setVisible(false);//微信邀请
    if(_this.RoomMin != 1) {
        _this.resetPDKNext();
    }
    _this.curStep = data.curstep;
    _this.zhuangJia = data.befstep?data.befstep:data.curstep;
    _this.initUserData(data); //初始化牌

    //断线重连
    if(data.begin == true) {//叫分阶段
        var dealerUid = 0;
        for(var i = 0;i<3; i++){
            if(data.info[i]!=null) {
                _this.playerCardCounts[data.info[i].uid ] = data.info[i].card.length;
                if(data.info[i].dealer){
                    dealerUid = data.info[i].uid;
                }
                if(data.info[i].uid  ==  data.befstep ){
                    _this.playerCardCounts[ data.befstep ] += data.lastcard.length;
                }
            }
        }

        //发地主牌
        _this.onPDKgamedealer(data.dzcard,dealerUid,data.razz, 1);
        _this.ongamepdkstep({"uid": data.befstep,"cards":data.lastcard,"abscards":data.lastabscard,"curstep": data.curstep},1);

        if(_this.curStep == _this.mod_pdk.uid){
            _this.players[0].outCards.removeAllChildren();
        }
    }
    _this.updataTotal1(data);
    _this.updateStepText();

};

//动画
gameclass.pdktableFk.prototype.playAnimdeal = function(framename,length,delay,node){
    //cc.log(framename,length,delay,node);
    var animFrames = [];
    for (var i = 1; i < length; i++) {
        var str = framename + i+".png";
        cc.log(str);
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        animFrames.push(frame);
    }
    cc.log(animFrames);
    var animation = new cc.Animation(animFrames,delay);
    var animate = cc.animate(animation);
    node.runAction(cc.repeatForever(animate));
    node.setVisible(true);
};


gameclass.pdktableFk.prototype.ongamepdkstep = function (stepData,noadd) {
    var _this = this;
    _this.curStep = stepData.curstep;
    for(var i=0;i<_this.players.length;i++){
        if(_this.players[i].data && _this.players[i].data.uid==stepData.curstep){
            _this.createProgress(30,_this.players[i].outCards.getPosition())
        }
    }

    //上家是自己
    if(stepData.uid ==  _this.mod_pdk.uid ) {
        _this.btn_chupai.setVisible(false);
        _this.btn_tishi.setVisible(false);
        _this.btn_buchu.setVisible(false);
        _this.sendHandCardUI(stepData.cards);
        _this.showbaopei.setVisible(false);
    }
    //下家是自己
    if(_this.mod_pdk.uid == _this.curStep){
        _this.btn_chupai.setVisible(true);
        _this.btn_tishi.setVisible(true);
        if(parseInt(_this.mod_pdk.roominfo.param1/1000)%10 == 0) {//! 可不管
            _this.btn_buchu.setVisible(true);
        }
    }
    if(this.mod_pdk.roominfo.person.length!=2 && _this.isbaopei)
    {
        _this.showbaopei.setVisible(true);
    }

    //清除所有打出的牌
    for(var i = 0;i<3;i++) {
        if(_this.players[i].data!=null)
        {
            if (_this.curStep == _this.players[i].data.uid)
                _this.players[i].outCards.removeAllChildren();
        }
    }

    //判断压牌
    if( stepData.cards.length > 0)
    {
        var CheckCards = _this.transMinCard(stepData.cards);
        var hitCard = _this.tool_cardType.check(CheckCards,_this.playerCardCounts[_this.mod_pdk.uid]);
        _this.playRes(hitCard.type,hitCard.value);
        _this.savebefCard = stepData.cards;
        //庄家移位
        _this.zhuangJia = stepData.uid;
        //显示要压的牌
        _this.updateHitOutcard(stepData.uid,stepData.cards);
    }
    else{
        //不要
        if(!noadd) {
            mod_sound.playeffect(g_music["Man_buyao"], false);
            _this.updateHitOutcard(stepData.uid, stepData.cards);
        }
    }
    if(_this.mod_pdk.uid == _this.curStep) {
        if(parseInt(_this.mod_pdk.roominfo.param1/1000)%10 == 0){//! 可不管
            _this.btn_buchu.setBright(true);
            _this.btn_buchu.setEnabled(true);
        }
    }

    if(_this.mod_pdk.uid == _this.curStep && _this.zhuangJia == _this.mod_pdk.uid){
        if(_this.handCard.length<5) {
            var copyhandcards=[];
            var befcards=[];

            for(var i=0;i<_this.handCard.length;i++) {
                copyhandcards[i]= _this.handCard[i].id;
            }
            var handcards = copyhandcards.slice(0,copyhandcards.length);
            var tipscard=_this.tool_cardType.tipsCard(copyhandcards,befcards);
            if(tipscard.length == _this.handCard.length) {
                tipscard.sort(function(a, b){
                    return b - a});
                _this.tipsSelectCards(tipscard,handcards);
                _this.btn_tishifunc();
                this.scheduleOnce(function(){
                    if(_this.willSendCard.length>0)
                    {
                        _this.mod_pdk.gamesteps(_this.willSendCard);
                        _this.isFirstTips=true;
                    }
                }, 2);
            }
        }
        _this.btn_buchu.setBright(false);
        _this.btn_buchu.setEnabled(false);
    }else if(_this.mod_pdk.uid == _this.curStep && !_this.canhandoutcard() && parseInt(_this.mod_pdk.roominfo.param1/1000)%10 == 1) {//! 必须管
        _this.showToast("没有牌能大过上家");
        this.scheduleOnce(function(){
            _this.passCard();
        }, 2);
    }else if(_this.mod_pdk.uid == _this.curStep && _this.canhandoutcard()) {

        var copyhandcards = [];
        var befcards = [];

        befcards = _this.savebefCard.slice(0, _this.savebefCard.length);//_this.transMinCard(_this.savebefCard);

        for (var i = 0; i < _this.handCard.length; i++) {
            copyhandcards[i] = _this.handCard[i].id;
        }
        var handcards = copyhandcards.slice(0,copyhandcards.length);
        var tipscard=_this.tool_cardType.tipsCard(copyhandcards,befcards);
        if (tipscard.length == _this.handCard.length) {
            tipscard.sort(function(a, b){
                return b - a});
            _this.tipsSelectCards(tipscard,handcards);
            _this.btn_tishifunc();
            this.scheduleOnce(function(){
                if(_this.willSendCard)
                {
                    _this.mod_pdk.gamesteps(_this.willSendCard);
                    _this.isFirstTips=true;
                }
            }, 2);
        }

    }

    _this.curCardCount(stepData.uid,stepData.cards.length);
};
gameclass.pdktableFk.prototype.alarmUid = [true,true,true];
gameclass.pdktableFk.prototype.alarmRes = function (alarmuid,index,alarmcount) {
    cc.log("alarmuid"+alarmuid+"index"+index+"alarmcount"+alarmcount);
    if(this.alarmUid[index]) {
        if (alarmcount <= 0) {
            return;
        }
        var animFrames = [];
        for (var i = 0; i < 2; i++) {
            var str = "alarm" + i+".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = new cc.Animation(animFrames,0.2);
        var animate = cc.animate(animation);
        this.players[index].alarm.setVisible(true);
        this.players[index].alarm.runAction(cc.sequence(animate).repeatForever());
        //延迟一秒播放报警声音
        this.scheduleOnce(function(){
            if (alarmcount == 1) {
                mod_sound.playeffect(g_music["Man_one_card"], false);
            }
            this.alarmUid[index] = false;
        }, 1);
    }
};
gameclass.pdktableFk.prototype.curCardCount = function (curuid,size) {
    this.playerCardCounts[ curuid ] -= size;
    for(var i = 0;i<3;i++){

        if(this.players[i].data!=null)
        {
            var alarmcount = this.playerCardCounts[ this.players[i].data.uid ];
            if(alarmcount <= 1 && this.mod_pdk.roominfo.person.length>2){
                if(parseInt(this.mod_pdk.roominfo.param1/1000)%10 == 0){//! 可不管
                    if(i != 0)
                    {
                        this.isbaopei=true;
                        this.showbaopei.setVisible(true);
                    }

                }
                this.alarmRes(this.players[i].data.uid,i,alarmcount);
            }
            this.players[i].alarmcount.setString(this.playerCardCounts[ this.players[i].data.uid ]);
        }
    }
};
//发地主牌
gameclass.pdktableFk.prototype.onPDKgamedealer = function (DZcard,DZuid,razz,noadd) {
    var _this = this;
    if(!noadd) {
        _this.zhuangJia = DZuid;
        _this.curStep = DZuid;
    }
    if(_this.mod_pdk.uid == DZuid){
        if(!noadd){
            _this.dzdeal(DZcard);
        }

    }

    if(!noadd){ _this.playerCardCounts = {};}

    for(var i = 0;i<3;i++){
        if(_this.players[i].data!=null)
        {
            if(!noadd)_this.playerCardCounts[ _this.players[i].data.uid ] = 16;
            if(parseInt(_this.mod_pdk.roominfo.param1/10)%10 == 1) {//! 显示剩余牌数
                _this.players[i].alarmcount.setVisible(true);
                _this.players[i].pokerback.setVisible(true);
            }
            _this.curCardCount(_this.players[i].data.uid,0);
        }
    }
    if(!noadd)
        _this.curStepUser();

};
gameclass.pdktableFk.prototype.curStepUser = function() {
    var _this = this;
    cc.log("========curStepUser",_this.mod_pdk.uid,_this.curStep);
    if(_this.mod_pdk.uid == _this.curStep){
        if(parseInt(_this.mod_pdk.roominfo.param1/1000)%10 == 0){//! 可不管
            _this.btn_buchu.setVisible(true);
            _this.btn_buchu.setBright(false);
            _this.btn_buchu.setEnabled(false);
        }
        _this.btn_chupai.setVisible(true);
        _this.btn_tishi.setVisible(true);
    }
};

gameclass.pdktableFk.prototype.hideDouble = function(uid){
    if(uid == this.mod_pdk.uid) {
        this.isdouble.setVisible(false);
        this.noDouble.setVisible(false);
    }
};

gameclass.pdktableFk.prototype.userDouble = [];
gameclass.pdktableFk.prototype.ongamedouble = function(data,noadd){
    if(!noadd && data.isdouble == 1){
        mod_sound.playeffect(g_music["Man_bujiabei"],false);
    }else if(!noadd && data.isdouble == 2){
        mod_sound.playeffect(g_music["Man_jiabei"],false);
    }
    if(data.isdouble){
        this.hideDouble(data.uid);
        this.userDouble.push(data.isdouble);
        if(this.userDouble.length == 3){
            this.curStepUser();
        }
        for(var i = 0;i<3;i++){
            if(data.uid == this.players[i].data.uid){
                this.players[i].spr_double.setVisible(true);
                if(data.isdouble == 2){
                    this.players[i].spr_double.setTexture(res.spr_double2);
                }
            }
        }
    }
};
gameclass.pdktableFk.prototype.ongamedealer = function (dealer,uid) {
    var _this = this;
    if (dealer){
        var playerdata = _this.mod_pdk.getplayerdata(0);

        var playernum = _this.mod_pdk.getplayernum();

        var beg = 0;
        var playerlst = [];
        var playerctrl = [];

        for (var i = 0;i < 3;i ++) {
            var player = _this.mod_pdk.getplayerdata(i);
            var otherddata = _this.mod_pdk.getplayerotherdata(i);
            if (player != null && player.rob == 1) {
                playerlst[playerlst.length] = otherddata;
                playerctrl[playerctrl.length] = _this.players[i].zhuang;
            }
        }

        if (playerlst.length == 0){
            for (var i = 0;i < 3;i ++) {
                var otherddata = _this.mod_pdk.getplayerotherdata(i);
                if (player != null ) {
                    playerlst[i] = otherddata;
                    playerctrl[i] = _this.players[i].zhuang;
                }
            }
        }
        if (playerlst.length > 1){
            var rand = (Math.floor(Math.random()*100)%3 + playerlst.length * 2);
            var act = cc.repeatForever(cc.sequence(cc.delayTime(0.20),cc.callFunc(function(){
                var index = beg%playerlst.length

                for (var i = 0;i < 3;i ++) {
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
    }else {
        _this.refplayerinfo();
    }
};
gameclass.pdktableFk.prototype.ongamepdkbye = function(data){
    var _this = this;
    _this.userDouble.length = 0;
    _this.gameEndbye();

};

gameclass.pdktableFk.prototype.ongamePDKend = function(data,showfast){

    var _this = this;

    _this.pdkenddata = data;
    _this.btn_chupai.setVisible(false);
    _this.btn_tishi.setVisible(false);
    _this.btn_buchu.setVisible(false);
    _this.userDouble.length = 0;
    for(var i=0;i<data.info.length;i++)
    {
        if(data.info[i].ct)
        {
            _this.showCTspr();
            break;
        }
    }
    for(var i = 1;i<3;i++){
        _this.players[i].cards.removeAllChildren();
    }
    for(var i =0;i<3;i++){
        if(_this.mod_pdk.roominfo.person[i])
        {
            _this.mod_pdk.roominfo.person[i].ready = false;
        }
        if(data.info[i] && data.info[i].uid == _this.mod_pdk.uid){
            continue;
        }
        for(var j = 1;j<3;j++) {

            if (_this.players[j].data && data.info[i] && _this.players[j].data.uid == data.info[i].uid) {

                _this.showEndCard(data.info[i].card, j);
            }

        }
    }
    if(data.othercard)
    {
        for(var i = 0;i<3;i++){
            if(!data.info[i])
            {
                _this.showEndCard(data.othercard, i);
            }
        }
    }

    _this.isPDKend = true;
    var seq = cc.sequence(cc.delayTime(2),cc.callFunc(function(sender){
        _this.updateData();
    }));
    _this.node.runAction(seq);
};
gameclass.pdktableFk.prototype.showCTspr = function(){
    this.playRes(20);//春天动画
};
gameclass.pdktableFk.prototype.ongameviewf = function(){
    var _this = this;
    _this.ongameview++;
    if (_this.mod_pdk.getplayernum() == _this.ongameview){
        _this.stopAllActions();
        var ani = cc.sequence(cc.delayTime(3),cc.callFunc(function(sender){
            _this.game.uimgr.showui("gameclass.resultoneui").setniuniumod(_this.mod_pdk,_this);
        }));
        _this.runAction(ani);
        _this.refplayerinfo(true);
    }
};

gameclass.pdktableFk.prototype.showoneendcard = function (endCard, node) {
    if (endCard.length == 0) {
        return;
    }

    var tmpCardData = this.transCardtoNum(endCard);
    this.handSort(tmpCardData);

    for (var i = 0; i < tmpCardData.length; i++) {
        var sp = this.createCardUI(tmpCardData[i].card, tmpCardData[i].type);
        sp.setPosition(0, 0);
        sp.runAction(cc.moveBy(0.8, 17*i, 0));
        sp.setScale(0.4);
        node.addChild(sp);
    }
};

gameclass.pdktableFk.prototype.showEndCard = function(endCard,index){
    if(endCard.length == 0){
        return;
    }

    var tmpCardData = this.transCardtoNum(endCard);
    this.handSort(tmpCardData);
    if(index == 1) {
        for (var i = tmpCardData.length-1; i >= 0; i--) {
            var sp = this.createCardUI(tmpCardData[i].card, tmpCardData[i].type);
            sp.setRotation(-90);
            sp.setPosition(0, 0);/*tmpCardData.length * 20 / 2 - (20 * i) - 70*/
            sp.runAction(cc.moveBy(0.8, 0, -17 * i));
            sp.setScale(0.6);
            this.players[index].cards.addChild(sp);
        }
    }else {
        for (var  i = 0; i < tmpCardData.length; i++) {
            var sp = this.createCardUI(tmpCardData[i].card, tmpCardData[i].type);
            sp.setRotation(90);
            sp.setPosition(0, 0);/*tmpCardData.length * 20 / 2 - (20 * i) - 60*/
            sp.runAction(cc.moveBy(0.8, 0, -17 * i));
            sp.setScale(0.6);
            this.players[index].cards.addChild(sp);
        }
    }

};

gameclass.pdktableFk.prototype.updateData = function(){
    if (this.isPDKend) {
        var tableData = {
            difen:this.difen,
            RoomCount:this.RoomMax - this.RoomMin
        };

        var datasOne = [];
        for(var i = 0; i<this.pdkenddata.info.length ;i++) {
            datasOne.push({
                name: this.mod_pdk.roominfo.person[i].name,
                uid: this.mod_pdk.roominfo.person[i].uid,
                icon: this.mod_pdk.roominfo.person[i].imgurl,
                total: this.pdkenddata.info[i].total,
                boom: this.pdkenddata.info[i].boom,
                card:this.pdkenddata.info[i].card,
                curscore: this.pdkenddata.info[i].curscore,
            });

        }
        this.game.uimgr.showui("gameclass.pdkresultoneui").setniuniumod(tableData, this.mod_pdk, datasOne,this,this.pdkenddata.doubler);

        this.RoomMin++;
        this.mod_pdk.roominfo.step=this.RoomMin;
        //更新总分
        this.updataTotal(this.pdkenddata);
    }
};

gameclass.pdktableFk.prototype.gameEndbye = function(){
    var _this = this;
    _this.game.uimgr.showui("gameclass.pdkresultui").setData(_this.mod_pdk,_this);
}

gameclass.pdktableFk.prototype.initUserData = function(data) {
    for (var i = 0; i < data.info.length; i++) {
        this.refplayerPDKinfo(data.info[i].card, i);
        this.players[i].ok.setVisible(false);
    }
    for (var i = 0; i < 3; i++) {
        this.players[i].ok.setVisible(false);
    }
};

gameclass.pdktableFk.prototype.refplayerPDKinfo = function(_cards,index) {
    var tmpCards = [];
    for (var j = 0; j < _cards.length; j++) {
        var userCard = _cards[j];
        if (userCard == 0)return;
        tmpCards.push(userCard);
    }

    //发牌
    this.deal(tmpCards);
};

/**
 *  初始发牌
 */
gameclass.pdktableFk.prototype.deal = function (_cards) {
    this.handCard = [];
    this.handCard = this.transCardtoNum(_cards);
    this.handSort(this.handCard);
    this.updateHandCardUI(true);
}

gameclass.pdktableFk.prototype.share = function(){
    var str="";
    for(var i=0;i<this.createinfo.length;i++)
    {
        if(i == 0){
            str+="[" + this.createinfo[i];
        }else{
            str+="," + this.createinfo[i];
        }
    }
    str+="]";

    gameclass.mod_platform.invitefriend("房号[" + this.mod_pdk.roomnum + "]," + str + ",[" + this.mod_pdk.maxStep + "]局。大家都等您，快来吧。",
        "http://www.hbyouyou.com//Down/xyhy",
        "-湘军跑得快");

};
gameclass.pdktableFk.prototype.isFirstTips = true;

//判断是否有牌能大过上家
gameclass.pdktableFk.prototype.canhandoutcard = function() {
    var _this = this;
    if(_this.curStep != _this.mod_pdk.uid) {
        return;
    }
    var befcards = [];
    if (_this.zhuangJia != _this.mod_pdk.uid) {
        //拿到上家打出的牌型
        befcards = _this.savebefCard.slice(0, _this.savebefCard.length);//_this.transMinCard(_this.savebefCard);
    }

    var copyhandcards = [];
    for (var i = 0; i < _this.handCard.length; i++) {
        copyhandcards[i] = _this.handCard[i].id;
    }

    var tipscard = [];

    tipscard = _this.tool_cardType.tipsCard(copyhandcards, befcards);
    if (!tipscard || tipscard.length == 0) {
        return false;
    }
    else
    {
        return true;
    }

}

gameclass.pdktableFk.prototype.createProgress = function(time,position){
    var _this=this;
    _this.clock.setVisible(true);
    _this.clock.setPosition(position);
    _this.clocktime=_this.clock.getChildByName("clocknum");
    _this.clocktime.setString(time);

    var startTime = new Date().getTime();
    var endTime = startTime + time*1000;
    var totalTime = time;
    var act = cc.repeatForever(cc.sequence(cc.delayTime(1),cc.callFunc( function(){
        var _time = parseInt((new Date().getTime() - startTime)/1000);
        var delTime = totalTime - _time;

        if(new Date().getTime() >= endTime){
            _this.clocktime.setString(00);
            //_this.clock.setVisible(false);
            _this.clocktime.stopAllActions();
        }
        _this.clocktime.setString(delTime);

    })));
    _this.clocktime.stopAllActions();
    _this.clocktime.runAction(act);
}

gameclass.pdktableFk.prototype.btn_tishifunc = function(){
    var _this = this;
    if(_this.curStep != _this.mod_pdk.uid) {
        return;
    }

    var copyWillSendCard = _this.willSendCard.slice(0,_this.willSendCard.length);
    //! 清空选中的手牌
    _this.willSendCard.length = 0;
    cc.each(_this.handCard , function(o,i){
        var target = _this.players[0].cards.getChildByTag(o.id);
        if(target.isup){
            target.setPositionY(target.getPositionY() - 20);
            target.isup = false;
        }
    });
    var befcards = [];
    if(_this.zhuangJia != _this.mod_pdk.uid){
        //拿到上家打出的牌型
        befcards = _this.savebefCard.slice(0,_this.savebefCard.length);//_this.transMinCard(_this.savebefCard);
    }

    var copyhandcards = [];
    for(var i =  0;i < _this.handCard.length;i++) {
        copyhandcards[i] = _this.handCard[i].id;
    }

    var handcards = copyhandcards.slice(0,copyhandcards.length);

    var tipscard = [];
    if(_this.isFirstTips) {
        tipscard = _this.tool_cardType.tipsCard(copyhandcards, befcards);
        cc.log("tipscard");
        cc.log(tipscard);
        if(!tipscard || tipscard.length == 0){
            _this.showToast("没有牌大过上家");
            return;
        }else{
            _this.isFirstTips = false;
        }
    }else {
        tipscard = _this.tool_cardType.tipsCard(copyhandcards, copyWillSendCard);
        var gg = false;
        cc.log("tipscard");
        cc.log(tipscard);
        if (!tipscard || tipscard.length == 0) {
            _this.isFirstTips = true;
        }
    }
    tipscard.sort(function(a, b){
        return b - a});

    _this.tipsSelectCards(tipscard,handcards);
};
gameclass.pdktableFk.prototype.showToast = function(_text){
    if(this.node.getChildByTag(123456)){
        return;
    }
    var _this = this;
    var node = new cc.Sprite(res.img_input1);
    node.setPosition(this.node.getContentSize().width / 2,45);
    node.setOpacity(160);
    node.setTag(123456);
    var text = new cc.LabelTTF(_text, "Arial", 30);
    text.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
    node.addChild(text);
    _this.node.addChild(node);
    _this.scheduleOnce(function(){
        _this.node.removeChildByTag(123456);
    }, 2);

};

gameclass.pdktableFk.prototype.includeheitao3 = function(cards) {

    for(var i=0;i<cards.length;i++)
    {
        if(cards[i].card==3 && cards[i].type == "c")
        {
            return true;
        }
    }
}

gameclass.pdktableFk.prototype.includehongtao10 = function(cards) {

    for(var i=0;i<cards.length;i++)
    {
        if(cards[i].card==10 && cards[i].type == "b")
        {
            return true;
        }
    }
}

gameclass.pdktableFk.prototype.btn_chupaifunc = function(){
    var _this = this;
    if(_this.curStep != _this.mod_pdk.uid) {
        return;
    }
    _this.isFirstTips = true;
    //将牌转为 0 - 15
    var CheckCards = this.transMinCard(this.willSendCard);
    var copywillsendcard=_this.willSendCard.slice(0,_this.willSendCard.length);
    var isbaopei=false;
    if(this.willSendCard.length > 1 && _this.isbaopei && this.playerCardCounts[this.zhuangJia]==1) {
        isbaopei = false;
    }else if(this.willSendCard.length ==1 && _this.isbaopei){
        var copyhandcards = [];
        for (var i = 0; i < _this.handCard.length; i++) {
            copyhandcards[i] = _this.handCard[i].id;
        }
        var yapai = _this.tool_cardType.tipsCard(copyhandcards, copywillsendcard);
        if (!yapai || yapai.length == 0) {
            isbaopei = false;
        }
        else{
            isbaopei = true;
        }
    } else{
        isbaopei=false;
    }

    if(_this.zhuangJia == _this.mod_pdk.uid) {
        var hitCard =this.tool_cardType.check(CheckCards,_this.playerCardCounts[_this.mod_pdk.uid]);

        if(hitCard != 0) {
            if(this.mod_pdk.roominfo.param1%10 == 1 && _this.RoomMin<2) {//! 首出黑3
                if(this.includeheitao3(this.handCard)) {
                    var tmp=this.transCardtoNum(this.willSendCard);
                    if(!this.includeheitao3(tmp)) {
                        _this.showToast("黑桃三必出");
                    } else {
                        if(this.isbaopei && isbaopei) {
                            _this.mod_pdk.gamesteps(this.willSendCard,_this.mod_pdk.uid);
                        } else {
                            _this.mod_pdk.gamesteps(this.willSendCard);
                        }
                    }
                } else {
                    if(this.isbaopei && isbaopei) {
                        _this.mod_pdk.gamesteps(this.willSendCard,_this.mod_pdk.uid);
                    } else {
                        _this.mod_pdk.gamesteps(this.willSendCard);
                    }
                }
            } else {
                if(this.isbaopei && isbaopei) {
                    _this.mod_pdk.gamesteps(this.willSendCard,_this.mod_pdk.uid);
                } else {
                    _this.mod_pdk.gamesteps(this.willSendCard);
                }
            }
        } else {
            _this.showToast("牌型错误");
        }
    }else{
        var checkCards2 = this.transMinCard(this.savebefCard);
        var perssCard = this.tool_cardType.compare(CheckCards,checkCards2);
        if (perssCard.value != -1) {
            if(this.isbaopei && isbaopei) {
                _this.mod_pdk.gamesteps(this.willSendCard,_this.mod_pdk.uid);
            }
            else {
                _this.mod_pdk.gamesteps(this.willSendCard);
            }
        }else{
            _this.showToast("牌型错误");
        }
    }
};
//是否可以拆王
gameclass.pdktableFk.prototype.chaiWang = function(hitcard){
    var def = false;
    if(hitcard.length == 1 && !this.mod_pdk.chaiwang) {
        if (hitcard[0] == 1000 || hitcard[0] == 2000) {
            var wangCount = 0;
            for (var i = 0; i < this.handCard.length; i++) {
                if (this.handCard[i].id == 1000 || this.handCard[i].id == 2000) {
                    wangCount++;
                }
            }
            if (wangCount == 2) {
                return true;
            }
        }

    }
    return def;
}

//是否可以拆炸弹
gameclass.pdktableFk.prototype.chaiZhadan = function(hitcard){
    if(hitcard.length==4) {
        if(parseInt(hitcard[0]/10)==parseInt(hitcard[1]/10) && parseInt(hitcard[2]/10)==parseInt(hitcard[3]/10) && parseInt(hitcard[1]/10)==parseInt(hitcard[2]/10)) {
            return false
        }
    }
    if(parseInt(this.mod_pdk.roominfo.param1/1000)%10 == 0) {//! 可不管
        for(var j=0;j<hitcard.length;j++) {
            var cardCount = 0;
            for (var i = 0; i < this.handCard.length; i++) {
                if (this.handCard[i].card== parseInt(hitcard[j]/10)) {
                    cardCount++;
                }
            }if (cardCount == 4) {
                return true;
            }
        }
    }
    return false;
}

//选中提示的牌
gameclass.pdktableFk.prototype.tipsSelectCards = function(_tipscard,_handcards){
    var selHandindex = 0;
    var tag = [];
    for(var i = 0;i < _tipscard.length;i++){
        for(var j = selHandindex;j < _handcards.length  ;j++) {
            var handcards1 = 0;
            if(_handcards[j] == 1000 || _handcards[j] == 2000) {
                handcards1 = _handcards[j];
            }else {
                handcards1 = parseInt(_handcards[j] / 10);
                if (handcards1 == 1) {
                    handcards1 = 14;
                } else if (handcards1 == 2) {
                    handcards1 = 20;
                }
            }

            if (tag.indexOf(j) < 0 && _tipscard[i] == handcards1) {
                var target = this.players[0].cards.getChildByTag(_handcards[j]);
                this.willSendCard.push(target.getTag());
                target.setPositionY(target.getPositionY() + 20);
                target.isup = true;
                tag.push(j);
                break;

            }
        }
    }
};
gameclass.pdktableFk.prototype.passCard = function(){
    this.isFirstTips = true;
    var nullCard = [];
    var copyhandcards = [];
    for(var i =  0;i < this.handCard.length;i++) {
        copyhandcards[i] = this.handCard[i].id;
    }
    if(this.playerCardCounts[this.zhuangJia] == 1 && this.savebefCard.length!=1 && this.isbaopei && this.canhandoutcard()){
        this.mod_pdk.gamesteps(nullCard,this.mod_pdk.uid);
    }
    if(this.isbaopei && this.savebefCard.length==1 && this.tool_cardType.tipsCard(copyhandcards, this.transMinCard(this.savebefCard))) {
        this.mod_pdk.gamesteps(nullCard,this.mod_pdk.uid);
    } else {
        this.mod_pdk.gamesteps(nullCard);
    }
};
gameclass.pdktableFk.prototype.playAnim = function(framename,start,end,delay){

    var animFrames = [];
    for (var i = start; i < end; i++) {
        var str = framename + i+".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        animFrames.push(frame);
    }
    var animation = new cc.Animation(animFrames,delay);
    var animate = cc.animate(animation);
    var sprite = cc.Sprite.create("#"+framename+start+".png");
    sprite.attr({
        x:cc.winSize.width / 2,
        y:cc.winSize.height / 2 + 100
    });
    this.addChild(sprite);

    sprite.runAction(cc.sequence(animate,cc.callFunc(function(){
        sprite.removeFromParent(true);
    })));
};
gameclass.pdktableFk.prototype.playRes = function(soundType,value){
    switch (soundType){
        case this.tool_cardType.CARDTYPE.danzhang:
            mod_sound.playeffect(g_music["Man_"+value],false);
            break;
        case this.tool_cardType.CARDTYPE.duizi:
            mod_sound.playeffect(g_music["Man_dui"+value],false);
            break;
        case this.tool_cardType.CARDTYPE.sanzhang:
            mod_sound.playeffect(g_music["Man_tuple"+value],false);
            break;
        case this.tool_cardType.CARDTYPE.zhadan:
            mod_sound.playeffect(g_music["Man_zhadan"],false);
            this.playAnim("anim_bomb_",1,10,0.1);
            break;
        case this.tool_cardType.CARDTYPE.sandaiyi:
            mod_sound.playeffect(g_music["Man_sandaiyi"],false);
            break;
        case this.tool_cardType.CARDTYPE.sandaier:
            mod_sound.playeffect(g_music["Man_sandaiyidui"],false);
            break;
        case this.tool_cardType.CARDTYPE.liandui:
            mod_sound.playeffect(g_music["Man_liandui"],false);
            this.playAnim("anim_double_",1,2,2);
            this.playAnim("anim_double_",2,17,0.2);
            break;
        case this.tool_cardType.CARDTYPE.shunzi:
            mod_sound.playeffect(g_music["Man_shunzi"],false);
            this.playAnim("anim_straight_",1,16,0.15);
            this.playAnim("anim_straight_",16,17,1.5);
            break;
        case this.tool_cardType.CARDTYPE.sidaierdan:
            mod_sound.playeffect(g_music["Man_sidaier"],false);
            break;
        case this.tool_cardType.CARDTYPE.sidaierdui:
            mod_sound.playeffect(g_music["Man_sidailiangdui"],false);
            break;
        case this.tool_cardType.CARDTYPE.feiji:
        case this.tool_cardType.CARDTYPE.danfei:
        case this.tool_cardType.CARDTYPE.shuangfei:
            mod_sound.playeffect(g_music["Man_feiji"],false);
            this.playAnim("anim_plane_",1,2,1);
            this.playAnim("anim_plane_",2,16,0.2);
            break;
        case this.tool_cardType.CARDTYPE.huojian:
            mod_sound.playeffect(g_music["Man_wangzha"],false);
            this.playAnim("anim_horce_",1,11,0.3);
            this.playAnim("anim_horce_",17,22,0.3);
            break;
        case 20:
            this.playAnim("chun",1,3,0.5);
            this.playAnim("spring/upflower/huaban_",1,13,0.15);
        default:
            break;
    }
};
//将牌数字转为小数发送
gameclass.pdktableFk.prototype.transMinCard = function(_arrCards){

    var checkCards = [];
    for(var i =0;i < _arrCards.length; i++){

        checkCards[i]= Math.floor(_arrCards[i]/10);
        if(checkCards[i] < 3){
            checkCards[i] += 13;
        }
    }
    return checkCards;
};
gameclass.pdktableFk.prototype.createCardUI = function (num,type) {

    var point = num;
    if(point > 13 && point < 16){
        point -= 13;
    }
    var spr =  cc.Sprite.create();
    if (point == 100) {
        //spr.loadTextureNormal("card_joker_gray.png",ccui.Widget.PLIST_TEXTURE);
        spr.initWithSpriteFrameName("card_joker_gray.png");
    }else if(point == 200){
        //spr.loadTextureNormal("card_joker.png",ccui.Widget.PLIST_TEXTURE);
        spr.initWithSpriteFrameName("card_joker.png");
    }else{
        //spr.loadTextureNormal("card_" + point +  type + ".png" ,ccui.Widget.PLIST_TEXTURE );
        spr.initWithSpriteFrameName("card_" + point +  type + ".png");
        if(this.mod_pdk.roominfo.param1%10==1 && point == 3 && type=="c") {//! 首出黑3
            var shouchu=cc.Sprite.create();
            shouchu.initWithFile("res/ui/xiangjun/game/17-room/xjhy_img_shou@2x.png");
            shouchu.setAnchorPoint(cc.p(0,0));
            spr.addChild(shouchu);
            shouchu.setPosition(3,3);
        }
        if(parseInt(this.mod_pdk.roominfo.param1/100)%10==1 && point == 10 && type=="b") {//! 显示剩余牌数
            var niao=cc.Sprite.create();
            niao.initWithFile("res/ui/xiangjun/game/17-room/xjhy_img_bird@2x.png");
            niao.setAnchorPoint(cc.p(0,0));
            spr.addChild(niao);
            niao.setPosition(3,3);
        }
    }
    spr.setAnchorPoint(cc.p(0.5,0.5));
    return spr;

};

/*
 *  更新手牌UI
 * */

gameclass.pdktableFk.prototype.updateHandCardUI = function (isMoveCard) {
    var _this = this;
    _this.willSendCard = [];
    var _cards = _this.handCard;
    _this.players[0].cards.removeAllChildren();
    for (var k = 0; k < _cards.length; k++) {
        var tmpCardData = _cards[k];
        var sp = _this.createCardUI(tmpCardData.card , tmpCardData.type);
        if(isMoveCard){
            sp.setPosition(0, 0);
            sp.runAction(cc.moveBy(0.8, -_cards.length * 25 + (50 * k) + 25, 0));
        }else{
            sp.setPosition(-_cards.length * 25 + (50 * k) + 25, 0);
        }
        sp.setTag(tmpCardData.id);
        sp.setScale(1.0);
        _this.players[0].cards.addChild(sp);
    }
    _this.createMyEventListener();
};
gameclass.pdktableFk.prototype.getHandCardWithIndex = function (index) {

    if(index < 0){
        index = this.handCard.length + index;
    }
    var target = this.players[0].cards.getChildByTag(this.handCard[index].id);
    return target;
};
gameclass.pdktableFk.prototype.touchHandCard = function (index,isSel) {

    var min = Math.min(this.selStartCard , this.selEndCard );
    //cc.log("min"+min);
    var max = Math.max(this.selStartCard , this.selEndCard );
    //cc.log("max"+max);
    cc.each(this.handCard,function(o,i){
        var target = this.players[0].cards.getChildByTag(o.id);
        var targetchild = target.getChildren();
        var isin=false;
        if(index && index!=0)
        {
            for(var j=0;j<index.length;j++){
                if(index[j]==i)
                {
                    isin=true;
                }
            }
        }
        if(i >=  min && i<=max){
            target.setColor(cc.color(200,200,200,200));
            if(targetchild.length > 0)
                targetchild[0].setColor(cc.color(200,200,200,200));
            if(isSel){
                target.isup = !target.isup;
                if(index && index!=0){
                    if(isin){
                        target.isup=true;
                    }
                    else {
                        target.isup=false;
                    }
                }

                if(index && index!=0)
                {
                    var up=0;
                    if(target.isup && !target.isuped) {
                        up=1;
                    } else if(!target.isup && target.isuped){
                        up=-1;
                    }else{
                        up=0
                    }
                    target.setPositionY( target.getPositionY() + up * 20   );
                    if(target.isup && !target.isuped){
                        this.willSendCard.push(o.id);
                    }else if(!target.isup && target.isuped){
                        this.willSendCard.remove(o.id);
                    }
                    if(target.isup)
                    {
                        target.isuped=true;
                    }else{
                        target.isuped=false;
                    }
                }else{
                    target.setPositionY( target.getPositionY() + ( target.isup ? 1 : -1 ) * 20   );
                    if(target.isup){
                        this.willSendCard.push(o.id);
                    }else{
                        this.willSendCard.remove(o.id);
                    }
                    if(target.isup)
                    {
                        target.isuped=true;
                    }else{
                        target.isuped=false;
                    }
                }

            }
        }else{
            target.setColor(cc.color(255,255,255,255));
            if(targetchild.length > 0)
                targetchild[0].setColor(cc.color(255,255,255,255));
        }

    },this);
};

gameclass.pdktableFk.prototype.getTouchCard = function(position){
    var index = null;
    cc.each(this.handCard,function(o,i){
        var target = this.players[0].cards.getChildByTag(o.id);
        var tmppos = target.convertToNodeSpace(position);
        var mwith =  (i == this.handCard.length -1) ? target.getContentSize().width:40;
        if(tmppos.x > 0 && tmppos.x < mwith){
            index = i;
            return false;
        }
    },this);
    return index;
};

gameclass.pdktableFk.prototype.selStartCard = null;//手动滑牌的起始下标
gameclass.pdktableFk.prototype.selEndCard = null;  //手动滑牌的结束下标

gameclass.pdktableFk.prototype.handCard = null;   //玩家手里的牌
gameclass.pdktableFk.prototype.willSendCard = null;//保存点击的手牌
/**
 *  手牌排序
 */
gameclass.pdktableFk.prototype.handSort = function (_cards) {
    _cards.sort(function (a, b) {
        if(a.card < b.card){
            return 1;
        }else if(a.card == b.card){
            return a.type < b.type ? 1:-1;
        }else{
            return -1;
        }
    });
}

/**
 *  发牌地主牌
 */
gameclass.pdktableFk.prototype.dzdeal = function (_cards) {
    var cards = this.transCardtoNum(_cards);

    cc.log(cards);

    for(var i = 0; i < cards.length; i++){
        this.handCard.push(cards[i]);
    }
    this.handSort(this.handCard);
    this.updateHandCardUI();
}


gameclass.pdktableFk.prototype.sendHandCardUI = function (_cards) {

    if(_cards)
    {
        for(var x = 0; x< _cards.length ; x++){
            for(var  j =0; j<  this.handCard.length ; j++){
                if(_cards[x] == this.handCard[j].id){
                    this.handCard.splice(j,1);
                    break;
                }
            }
        }

        this.handSort(this.handCard);
        this.updateHandCardUI();
    }
}

/*
 * 跟新压牌的显示界面
 * */
gameclass.pdktableFk.prototype.updateHitOutcard = function(zhuangjia_uid,_cards) {
    var befCard =_cards;
    _cards = this.transCardtoNum(befCard);

    this.handSort(_cards);
    var befuid = 0;
    for(var i = 0;i<3;i++){
        if(this.players[i].data!=null)
        {
            if(zhuangjia_uid == this.players[i].data.uid){
                befuid = i;
            }
        }
    }

    if(_cards.length  < 1 ) {
        var pass = cc.Sprite.create("res/ui/xiangjun/game/17-room/img_ybq@2x.png");
        pass.setPosition(0,0);
        this.players[befuid].outCards.addChild(pass);
        return;
    }


    for(var i = 0;i<_cards.length;i++) {
        var tmpCardData = _cards[i];
        var sp = this.createCardUI(tmpCardData.card , tmpCardData.type);
        if(befuid == 1){
            sp.setPosition(-_cards.length * 20 + (25 * i) + 20,0);
        }else if(befuid == 2){
            sp.setPosition(25 * i ,0);
        }else{
            sp.setPosition(25 * i,0);
        }
        sp.setScale(0.60);
        this.players[befuid].outCards.addChild(sp);
    }

};

gameclass.pdktableFk.prototype.pokerReverse = function() {
    for(var i = 1;i<3;i++){
        for(var j = 0;j<17;j++) {
            var spr = cc.Sprite.create("res/ui/newniuniu_1221/pokercard1.png");
            spr.setRotation(90);
            spr.setPosition(0, -8*j + 6);
            spr.setScale(0.6);
            this.players[i].cards.addChild(spr);
        }

    }
};
gameclass.pdktableFk.prototype.setpokerCount = function(cur,count) {
    ccui.helper.seekWidgetByName(this.node, "curpoker_count"+cur).setString(count);
};

gameclass.pdktableFk.prototype.reset = function() {
    this.ongameview = 0;
    this.open = [false,false,false,false];

    this.mod_pdk.gamestate = 0;

    for(var i = 0; i < 3; i++){
        this.players[i].zhuang.setVisible(false);
        this.players[i].cards.removeAllChildren();
    }

    this.bets = 0;
    this.difen = 0;

    this.RoomMin = this.mod_pdk.minStep || 1;
    this.RoomMax = this.mod_pdk.maxStep;

    this.updateStepText();
    this.createroominfo();
};

gameclass.pdktableFk.prototype.updateStepText = function(){
    this.curround.setString("局数:"+this.RoomMin + "/" + this.RoomMax);
};

gameclass.pdktableFk.prototype.createroominfo = function(){
    if(this.mod_pdk.roominfo.param2%10==1) {
        this.createinfo[0]="AA支付";
        ccui.helper.seekWidgetByName(this.node, "zhifu").setString(this.createinfo[0]);
    }
    else{
        this.createinfo[0]="房主支付";
        ccui.helper.seekWidgetByName(this.node, "zhifu").setString(this.createinfo[0]);
    }

    if(parseInt(this.mod_pdk.roominfo.param1/1000)%10==1) {//! 必须管
        this.createinfo[1]="必须管";
        ccui.helper.seekWidgetByName(this.node, "bixuguan").setString(this.createinfo[1]);
    }
    else{
        this.createinfo[1]="可不要";
        ccui.helper.seekWidgetByName(this.node, "bixuguan").setString(this.createinfo[1]);
    }

    if(this.mod_pdk.roominfo.param1%10==1) {//! 首出黑3
        this.createinfo[2]="首局先出黑桃3";
        ccui.helper.seekWidgetByName(this.node, "heitao3").setVisible(true);
    }
    else{
        ccui.helper.seekWidgetByName(this.node, "heitao3").setVisible(false);
    }

    if(parseInt(this.mod_pdk.roominfo.param1/10)%10==1) {//! 显示剩余牌数
        this.createinfo[3]="显示剩余牌数";
        ccui.helper.seekWidgetByName(this.node, "lastcard").setVisible(true);
    }
    else{
        ccui.helper.seekWidgetByName(this.node, "lastcard").setVisible(false);
    }

    if(parseInt(this.mod_pdk.roominfo.param1/100)%10==1) {//! 红桃10抓鸟
        this.createinfo[4]="红桃10抓鸟";
        ccui.helper.seekWidgetByName(this.node, "hongtao10").setVisible(true);
    } else{
        ccui.helper.seekWidgetByName(this.node, "hongtao10").setVisible(false);
    }
};

gameclass.pdktableFk.prototype.crateniuniuani = function(cardlst,soundniu) {

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
gameclass.pdktableFk.prototype.cratecard = function(card,up) {
    var abcd = ["a","d","b","c"];
    var point = Math.floor(card/10);
    var type = card%10;
    var spr = cc.Sprite.create();
    if (card <= 0){
        spr.initWithSpriteFrameName("pukebeimian.png");
    }else{
        spr.initWithSpriteFrameName("card_" + point +  abcd[type - 1]+ ".png");
    }
    spr.setAnchorPoint(cc.p(0.5,0.5));
    if(up) {
        spr.setPositionY(20);
    }

    return spr;
};

gameclass.pdktableFk.prototype.crateDZcard = function(cardarr) {
    for(var i = 0;i<3;i++) {
        var spr = cc.Sprite.create();
        spr = this.createCardUI(cardarr[i].card,cardarr[i].type);
        spr.setPosition(this.dipaikuang.getContentSize().width / 2 + (30 * i) - 30,this.dipaikuang.getContentSize().height / 2);
        spr.setScale(0.5);
        this.dipaikuang.addChild(spr);
    }

};

gameclass.pdktableFk.prototype.transCardtoNum = function ( _cards ) {
    var abcd = ["a","d","b","c"];
    var arr = [];

    for(var x =0;x< _cards.length ; x++){
        var point = Math.floor(_cards[x]/10);
        var type = _cards[x] % 10;
        if(point < 3){
            point+=13;
        }

        type = abcd[type -1];
        arr.push({
            'card':point,
            'type':type,
            'id':_cards[x],
        });
    }

    return arr;
};
/*
 *删除对应设定的TAG精灵
 * */
gameclass.pdktableFk.prototype.removeTagSpr = function(tag) {
    this.dipaikuang.removeChildByTag(tag);
};
gameclass.pdktableFk.prototype.createMyEventListener = function () {
    var _this = this;
    // 创建一个事件监听器 OneByOne 为单点触摸
    cc.eventManager.addListener(cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,                        // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
        onTouchBegan: function (touch, event) {        //实现 onTouchBegan 事件回调函数
            var target = event.getCurrentTarget();    // 获取事件所绑定的 target
            var position = target.convertToNodeSpace(touch.getLocation());
            if(position.y > 180){return true;}
            _this.selStartCard = _this.getTouchCard(position);
            return true;
        },
        onTouchMoved: function (touch, event) {
            var target = event.getCurrentTarget();
            var position =target.convertToNodeSpace(touch.getLocation());            // 触摸移动时触发
            if( position.y > 180){return true;}
            if(_this.selStartCard === null)return true;
            _this.selEndCard = _this.getTouchCard(position);
            if(_this.selEndCard === null){
                var startCard = _this.getHandCardWithIndex(0);
                cc.log(startCard.getPosition());
                var endCard = _this.getHandCardWithIndex(-1);
                if( 0 > startCard.convertToNodeSpace(position).x ){
                    _this.selEndCard = 0;
                }

                if(endCard.convertToNodeSpace(position).x > endCard.getContentSize().width ){
                    _this.selEndCard = _this.handCard.length - 1;
                }
                if(_this.selEndCard === null){return true;}
            }
            _this.touchHandCard(0,false);
            return true;
        },
        onTouchEnded: function (touch, event) {            // 点击事件结束处理
            if(_this.selStartCard !== null &&  _this.selEndCard === null){
                _this.selEndCard = _this.getTouchCard(touch.getLocation());
            }
            if(_this.selStartCard !== null && _this.selEndCard !== null){
                var copyhandcard=[];
                var index=[];
                if(_this.selEndCard>_this.selStartCard) {
                    for(var i=_this.selStartCard;i<_this.selEndCard+1;i++){
                        copyhandcard[i]=_this.handCard[i].id;
                    }
                }else if(_this.selEndCard<_this.selStartCard){
                    for(var i=_this.selEndCard;i<_this.selStartCard+1;i++){
                        copyhandcard[i]=_this.handCard[i].id;
                    }
                }
                _this.touchHandCard(0,true);
            }
            _this.selStartCard = null;
            _this.selEndCard = null;
            cc.each(_this.handCard,function(o,i){
                var target = _this.players[0].cards.getChildByTag(o.id);
                var targetchild = target.getChildren();
                target.setColor(cc.color(255,255,255,255));
                if(targetchild.length > 0)
                    targetchild[0].setColor(cc.color(255,255,255,255));

            });
            return true;
        }
    }),this);
};
//数组中找到要删除的元素
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
//删除指定一个元素
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

gameclass.pdktableFk.prototype.resetIcon = function(uid) {
    for (var i = 0; i < 3;i++){
        var playerdata = this.mod_pdk.getplayerdata(i);
        if(playerdata == null) {
            continue;
        }
        if(playerdata.uid != uid) {
            continue;
        }

        this.players[i].icon = gameclass.mod_base.showtximg(this.players[i].headbg, playerdata.imgurl, 0, 0,"im_headbg2", playerdata.ip == "")
        break;
    }
};

gameclass.pdktableFk.prototype.refplayerinfo = function(showother,refscore,soundniu) {
    cc.log("refplayerinfo");
    //this.qiangzhuang.setVisible(false);
    //this.buqiang.setVisible(false);

    var begin = this.mod_pdk.gameniuniuinfo != null &&  this.mod_pdk.gameniuniuinfo.begin;
    for (var i = 0;i < 3;i++){
        var playerdata = this.mod_pdk.getplayerdata(i);
        var has = playerdata != null;


        if (has){
            var player = playerdata;
            this.players[i].data =  player;
            this.players[i].playername.setString(playerdata.name);
            this.players[i].head.setVisible(true);
            this.players[i].sex=playerdata.sex;

            this.players[i].icon = gameclass.mod_base.showtximg(this.players[i].headbg,playerdata.imgurl,0,0,"im_headbg2", playerdata.ip == "");

        }
    }
    var banker = false;
    var isopen = false;
    var over = false;
    var showqiangzhuang = false;
    var curopen = [false,false,false,false];
    if (begin){
        var haszhuang = false;
        for (var i = 0;i < 3;i ++){
            var otherddata = this.mod_pdk.getplayerotherdata(i);
            if (otherddata != null){

                if (otherddata.bets != 0){

                    //this.players[i].bei.setVisible(true);
                    var bet =  Math.floor(Math.abs(otherddata.bets));
                    if (bet > 0 && bet < 6){
                    }
                }

                this.players[i].zhuang.setVisible(otherddata.dealer);

                if (otherddata.dealer){
                    haszhuang = true;
                }

                var cards = otherddata.card;

                this.players[i].cards.removeAllChildren();


                if (i == 0){
                    banker = otherddata.dealer;
                    isopen = cards[3] > 0;
                    over = otherddata.score != 0;
                }

                var w = 90;
                var begx = -90*5/2 + 45;

                if(i != 0){
                    w = 25;
                }

                begx += 150;

                var lst = [];
                for(var m = 0;m < 5; m++){
                    lst[m] = false;
                }
                var index = mod_compare.gettype(cards,lst);

                for(var j = 0;j < 5; j++){
                    var card = cards[j];
                    if (i != 0 && showother == null){
                        card = 0;
                    }
                    var spr = this.cratecard(card,lst[j] && isopen && card > 0);
                    spr.setPositionX(begx + j * w);
                    this.players[i].cards.addChild(spr);

                    if (j == 3 && isopen && card > 0){

                        if (!this.open[i] && (this.mod_pdk.gamestate == 1 || this.mod_pdk.gamestate == 2 )){
                            curopen[i] = true;
                            this.open[i] = true;
                        }

                        var tempspr = this.crateniuniuani(cards,curopen[i]);
                        spr.addChild(tempspr);
                    }
                }
            }
        }

        if (!haszhuang){
            showqiangzhuang = true;
        }
    }
};


