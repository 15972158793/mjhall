/**
 * Created by yang on 2016/11/9.
 */

gameclass.ddzhutable = gameclass.baseui.extend({
    sprite: null,
    node:null,
    mod_ddzhu:null,
    players:null,
    ongameview:null,
    curround:null,
    //buqiang:null,
    //qiangzhuang:null,
    buqiang0:null,
    qiangzhuang0:null,
    btn_double:null,
    btn_noDouble:null,
    gamebets:null,
    //ready:null,
    btn_chupai:null,
    btn_tishi:null,
    btn_buchu:null,
    tool_cardType:null,
    invitebtn:null,
    ddzenddata:null,
    //ddzbyedata:null,
    RoomMax:null,//房间最大次数
    RoomMin:null,//房间剩余次数
    zhuangJia:null,//庄家UID
    savebefCard:null,//上家打出的牌
    difen:null,
    fsk_difen:null,
    isDDZend:null,// 时间显示控制/*一局结算还是总结算
   // isHitCard:null,// 时间显示控制/*控制出牌显示时间 或者 一局结束显示时间
   // isHitOrRob:null, // 时间显示控制 /*不出 还是不叫
   // onchat:null,
    scoreLimit:null,
    curStep:0,  //当前该谁出牌 UID
    playerCardCounts:null,

    ctor: function () {
        this._super();
        this.players = [];
        this.playerCardCounts = {};
    },

    show:function(){
        this.init();
    },

    setmod: function (_mod) {
        this.mod_ddzhu = _mod;
        var _this = this;
        var mod_login = this.game.mod_login;
        this.mod_ddzhu.bindUI(this);
        this.tool_cardType = new gameclass.tool_cardType();
        this.mod_ddzhu.mainUI = this;

        if(window.wx) {
            _this.share();
        }

        if (_this.mod_ddzhu.roominfo.time != 0){
            _this.game.uimgr.showui("gameclass.exitroom",false);
            _this.game.uimgr.uis["gameclass.exitroom"].setData(_this.mod_ddzhu,_this.mod_ddzhu.roominfo);
        };

        this.initTimeView();
        this.setScorelimit(this.mod_ddzhu.CreateRoomType);
        //-----------------
        this.mod_ddzhu.onupdateroominfo = this.onupdateroominfo.bind(this);
        this.mod_ddzhu.ongameready = this.ongameready.bind(this);
        this.mod_ddzhu.onchat = this.onchat.bind(this);
        this.mod_ddzhu.ongameDDZbegin = this.ongameDDZbegin.bind(this);
        this.mod_ddzhu.ongamebets = this.ongamebets.bind(this);
        this.mod_ddzhu.ongameddzstep = this.ongameddzstep.bind(this);
        this.mod_ddzhu.onDDZgamedealer = this.onDDZgamedealer.bind(this);
        this.mod_ddzhu.ongamedealer = this.ongamedealer.bind(this);
        this.mod_ddzhu.ongameDouble = this.ongamedouble.bind(this);
        this.ongameview = 0;
        this.mod_ddzhu.ongameview = this.ongameviewf.bind(this);
        this.mod_ddzhu.ongameddzbye = this.ongameddzbye.bind(this);
        this.mod_ddzhu.ongameDDZend = this.ongameDDZend.bind(this);
        this.mod_ddzhu.onUpdateDifen = this.updateDifenView.bind(this);
        //----------------

        ccui.helper.seekWidgetByName(_this.node, "roomnum").setString("房号:"+_this.mod_ddzhu.roomnum.toString());

        this.curround =  ccui.helper.seekWidgetByName(_this.node, "curround");

        this.reset();
        this.refplayerinfo();
        //this.node.scheduleOnce(function(){
        //    gameclass.mod_platform.getBattery(100);
        //},1)
    },


    showProgress:function(pid){
        for(var i = 0;i < 3;i++){
            if(this.players[i].data.uid == pid) {
                this.createProgress(this.players[i].head, i);
            } else {
                this.players[i].head.removeChildByTag(123321);
            }
        }
    },
});
gameclass.ddzhutable.prototype.initTimeView = function(){
    var _this = this;
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
};
gameclass.ddzhutable.prototype.onupdateroominfo = function (data) {
    var _this = this;
    _this.refplayerinfo();

};

gameclass.ddzhutable.prototype.ongameready = function (data) {
    var _this = this;
    //_this.refplayerinfo();
    for(var i = 0;i<3;i++) {
        for(var j = 0; j<this.mod_ddzhu.roominfo.person.length;j++){
            if(this.players[i].data && this.players[i].data.uid == this.mod_ddzhu.roominfo.person[j].uid && this.mod_ddzhu.roominfo.person[j].ready){
                this.players[i].ok.setVisible(true);
            }
        }
    }

};

gameclass.ddzhutable.prototype.resetDDZNext = function(){
    //cc.log("resetDDZNext");
    this.btn_chupai.setVisible(false);
    this.btn_tishi.setVisible(false);
    this.btn_buchu.setVisible(false);
    if(this.mod_ddzhu.roominfo.person.length > 2){
        this.invitebtn.setVisible(false);
    }

    this.savebefCard = [];
    this.zhuangJia = 0;
    this.bets = 0;
    this.difen = 0;
    this.curBoom = 0;
    this.fsk_difen.setString("底分："+this.difen);

    this.alarmUid = [true,true,true];
    //this.hitoutCardView.removeAllChildren();
    this.dipaikuang.removeAllChildren();
    this.laidipaiKuang.removeAllChildren();
    //this.pokerReverse();

    //cc.log( this.mod_ddzhu.roominfo.person);

    for(var i = 0;i<3;i++) {
        this.players[i].alarm.setVisible(false);
        //this.players[i].alarmcount.setVisible(false);
        this.players[i].dizhu.setVisible(false);
        this.players[i].spr_double.setVisible(false);
        this.players[i].spr_double.setTexture(res.spr_double1);
        this.players[i].cards.removeAllChildren();
        this.players[i].outCards.removeAllChildren();
        ccui.helper.seekWidgetByName(this.node, "gamebets"+ i).setBright(true);
        ccui.helper.seekWidgetByName(this.node, "gamebets"+ i).setEnabled(true);
    }
};
gameclass.ddzhutable.prototype.onchat = function(data){
    var _this = this;

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

    for (var i = 0;i < 3;i ++) {
        var player = _this.mod_ddzhu.getplayerdata(i);
        var otherddata = _this.mod_ddzhu.getplayerotherdata(i);
        var playernode = _this.players[i].head;
        if (player != null && player.uid == data.uid) {
            var talkPos = _this.talkPos[i];
            var arr = [
                res.chatbg_ld,
                res.chatbg_rd,
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
                if (i == 1) {
                    _node.setPosition(talkPos.x - s9.width, talkPos.y);
                } else {
                    _node.setPosition(talkPos);
                }
                this.node.addChild(_node);
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
                var hitPos=null;
                for (var j = 0;j < 3;j ++) {
                    var player = _this.mod_ddzhu.getplayerdata(j);
                    if(player&&player.uid==_senderObj.hitUid){
                        hitPos=this.players[j].head.getPosition();
                        break;
                    }
                }
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
        }
    }
};
gameclass.ddzhutable.prototype.clean_call_ui = function(){

    for(var i = 0;i<3;i++){
        this.players[i].outCards.removeAllChildren();
    }
    this.gamebets.setVisible(false);
    this.qiangzhuang0.setVisible(false);
    this.buqiang0.setVisible(false);
};
gameclass.ddzhutable.prototype.updataTotal = function(data){
    for(var i=0;i<3;i++) {
        for(var j=0;j<3;j++) {
            if (data.info[i].uid == this.players[j].data.uid) {
                //cc.log("mod_ddzhu.uid" + _this.mod_ddzhu.uid + ",info[i].uid" + data.info[i].uid);
                this.players[j].userScore.setString("" + data.info[i].total);
                //cc.log("score" + data.info[i].total);
            }
        }
        //_this.players[i].head.setPosition(_this.players[i].head.getPositionX()+ 200,_this.players[i].head.getPositionY()+150);
        //cc.log("startPos="+endPos[i].x+","+endPos[i].y);
        //cc.log("head="+_this.players[i].head.getPositionX()+","+_this.players[i].head.getPositionY());
    }
};
gameclass.ddzhutable.prototype.ongameDDZbegin = function(data){
    //_this.reset();
    cc.log("信息：",data);
    var _this = this;
    _this.invitebtn.setVisible(false);//微信邀请
    if(_this.RoomMin != 1) {
        _this.resetDDZNext();
    }

    //data.info[1].card=[13,14,23,33,34,52,62,71,72,82,83,112,123,114,121,131,132];
    //data.info[2].card=[13,14,23,33,34,52,62,71,72,82,83,112,123,114,121,131,132];

    _this.curStep = data.curstep;
    _this.zhuangJia = data.befstep?data.befstep:data.curstep;
    _this.initUserData(data); //初始化牌

    //_this.pokerReverse();//创建非当前玩家牌的背面
    //断线重连
    if(data.begin == true) {//叫分阶段
        if ( data.bets < 1) { //叫完地主的情况下 data.bets才会复赋值
            //cc.log("qqqqq");
            //if(_this.curStep == _this.mod_ddzhu.uid){
                var maxBets = Math.max(Math.max(data.info[0].bets ,data.info[1].bets),data.info[2].bets);
                //cc.log("maxBets="+maxBets);
                //叫分消息
                _this.ongamebets({"bets":maxBets,"curstep":_this.curStep,},1);
            //}
        }else{ //出牌阶段
            _this.updateDifenView({"bets":data.bets,"boom":data.boom});
            //{\"uid\": data.befstep,\"cards\":data.lastcard,\"curstep\": data.curstep}

            //gameclass.ddzhutable.prototype.onDDZgamedealer = function (DZcard,DZuid,curDifen) ;
            var dealerUid = 0;
            for(var i = 0;i<3; i++){
                _this.playerCardCounts[data.info[i].uid ] = data.info[i].card.length;
                if(data.info[i].dealer){
                    dealerUid = data.info[i].uid;
                }
                if(data.info[i].uid  ==  data.befstep ){
                    _this.playerCardCounts[ data.befstep ] += data.lastcard.length;
                }
            }

            //cc.log('player');
            //cc.log(_this.players);
            //发地主牌
            _this.onDDZgamedealer(data.dzcard,dealerUid,data.razz, 1);
            //加倍和不加倍
            if(_this.mod_ddzhu.isdouble) {
                for (var i = 0; i < 3; i++) {
                    _this.ongamedouble({"uid": data.info[i].uid, "isdouble": data.info[i].isdouble}, 1);
                }
            }
            //如果三家已经 加倍或者不加倍! 走当前该谁出牌消息 。。。或者当前不为可以加倍模式
            if(_this.userDouble.length == 3 || !_this.mod_ddzhu.isdouble){
                _this.ongameddzstep({"uid": data.befstep,"cards":data.lastcard,"abscards":data.lastabscard,"curstep": data.curstep},1);
            }

            if(_this.curStep == _this.mod_ddzhu.uid){
                _this.players[0].outCards.removeAllChildren();
            }
        }
    }
    _this.updataTotal(data);
    _this.updateStepText();

};
gameclass.ddzhutable.prototype.maxBoom = 0;
gameclass.ddzhutable.prototype.curBoom = 0;
gameclass.ddzhutable.prototype.setScorelimit = function(limit){
    var tmp_limit = limit>9?limit-10:limit;

    tmp_limit = tmp_limit<0?0:tmp_limit;

    var maxBoom = [3,4,5];

    this.maxBoom = maxBoom[tmp_limit];
};

gameclass.ddzhutable.prototype.updateDifenView = function(data){
    //cc.log(data);
    var _this = this;
    if(data.bets < 1 )return;
    if(data.boom){
        _this.curBoom = data.boom;
    }
    _this.bets = data.bets;
    _this.difen = _this.countDifen(_this.curBoom , _this.bets);



    //_this.difen = _this.difen>_this.scorelimit?_this.scorelimit:_this.difen;
    _this.fsk_difen.setString("底分：" + _this.difen);
};
gameclass.ddzhutable.prototype.countDifen = function(boom,bets){//1炸 底分1  3炸上限
    //cc.log("boom="+boom+",bets="+bets+"maxboom="+this.maxBoom);
    //计算超出的炸弹倍数
    var otherBoom = boom - this.maxBoom; //1
    //如果超出的倍数小于0 则为0
    otherBoom = otherBoom < 0 ? 0 : otherBoom;  //1
    //如果超出则设为上限
    boom = otherBoom > 0 ? this.maxBoom : boom; // 4

    //翻倍计算
    var difen = ( boom < 1 ? 1 : Math.pow(2,boom) ) * bets;//_this.difen * 2; //48
    //cc.log("difendifen="+difen+",otherBoom="+otherBoom+",bets="+bets);
    //追加计算
    difen += otherBoom * bets;
    return difen;

};
gameclass.ddzhutable.prototype.ongamebets = function(data,noadd){
    var _this = this;
    for(var i = 0;i<3;i++){
        if(_this.players[i].data.uid == data.uid) {
            if (data.bets > _this.bets) {
                var call = cc.Sprite.create(res["ddzCall"+data.bets]);
            } else {
                var call = cc.Sprite.create(res.ddzCall0);
            }
            call.setPosition(0, 0);
            call.setScale(1.8);
            _this.players[i].outCards.addChild(call);
        }
    }

    if(!noadd) {
        if (data.bets > _this.bets) {
            mod_sound.playeffect(g_music["Man_Rob1"], false);//抢地主
            _this.updateDifenView(data);
        } else {
            mod_sound.playeffect(g_music["Man_NoOrder"], false);//不抢
        }
    }else{
        _this.bets = data.bets > _this.bets?data.bets : _this.bets;
    }

    if (data.curstep == _this.mod_ddzhu.uid) {
        if(_this.mod_ddzhu.CreateRoomType <= 2) {
            _this.gamebets.setVisible(true);

            for (var i = 0; i < _this.bets; i++) {
                ccui.helper.seekWidgetByName(_this.node, "gamebets" + i).setBright(false);
                ccui.helper.seekWidgetByName(_this.node, "gamebets" + i).setEnabled(false);
            }
        }else{
            _this.qiangzhuang0.setVisible(true);
            _this.buqiang0.setVisible(true);
        }

    }
    _this.showCurBets(data.curstep);
    _this.refplayerinfo();
};

gameclass.ddzhutable.prototype.showCurBets = function (_data) {
    //cc.log(_data);
    if(_data != this.mod_ddzhu.uid) {
        for (var i = 0; i < 3; i++) {
            //cc.log(this.players[i].data.uid);
            if (_data == this.players[i].data.uid) {

            }
        }
    }
}
gameclass.ddzhutable.prototype.playAnimdeal = function(framename,length,delay,node){
    //cc.log(framename,length,delay,node);
    var animFrames = [];
    for (var i = 1; i < length; i++) {
        var str = framename + i+".png";
        //cc.log(str);
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        animFrames.push(frame);
    }
    //cc.log(animFrames);
    var animation = new cc.Animation(animFrames,delay);
    var animate = cc.animate(animation);
    node.runAction(cc.repeatForever(animate));
    node.setVisible(true);
    /*sprite.runAction(cc.sequence(animate,cc.callFunc(function(){
        sprite.removeFromParent(true);
    })));*/
};
gameclass.ddzhutable.prototype.ongameddzstep = function (stepData,noadd) {
    var _this = this;
    //cc.log("stepCards="+stepData.cards);
    //cc.log("stepData.uid="+stepData.uid);
    //cc.log("curstep.uid="+stepData.curstep);
    //cc.log("zhuangJia="+_this.zhuangJia);
    /*_this.reClock();
     _this.clock.setVisible(true);
     _this.isHitCard = false;
     _this.schedule(_this.updateData, 1);*/
    _this.curStep = stepData.curstep;

    //上家是自己
    if(stepData.uid ==  _this.mod_ddzhu.uid ) {
        _this.btn_chupai.setVisible(false);
        _this.btn_tishi.setVisible(false);
        _this.btn_buchu.setVisible(false);
        /* if(stepData.cards.length > 0)*/
        _this.sendHandCardUI(stepData.cards);
    }
    //下家是自己
    if(_this.mod_ddzhu.uid == _this.curStep){
        _this.btn_chupai.setVisible(true);
        _this.btn_tishi.setVisible(true);
        _this.btn_buchu.setVisible(true);
        _this.btn_buchu.setBright(true);
        _this.btn_buchu.setEnabled(true);
    }

    for(var i = 0;i<3;i++) {
        if (_this.curStep == _this.players[i].data.uid){
            _this.players[i].outCards.removeAllChildren();
            _this.sendOtherHandCardUI(stepData.cards,i)
        }
        if (stepData.uid == _this.players[i].data.uid){
            _this.sendOtherHandCardUI(stepData.cards,i)
        }
    }

    //判断压牌
    if( stepData.cards.length > 0){
        var CheckCards = _this.transMinCard(stepData.cards);
        var hitCard = _this.tool_cardType.check(CheckCards);
        _this.playRes(hitCard.type,hitCard.value);
        _this.savebefCard = stepData.cards;
        //庄家移位
        _this.zhuangJia = stepData.uid;
        //显示要压的牌
        _this.updateHitOutcard(stepData.uid,stepData.cards);
        if(!noadd) {
            if (hitCard.type == 14 || hitCard.type == 4) {//14为火箭 4为炸弹
                _this.curBoom++;
                _this.difen = _this.countDifen(_this.curBoom , _this.bets);
                _this.fsk_difen.setString("底分：" + _this.difen);
            }
        }
    }else{
        if(!noadd) {
            mod_sound.playeffect(g_music["Man_buyao"], false);
            _this.updateHitOutcard(stepData.uid, stepData.cards);
        }
    }
    if(_this.zhuangJia == _this.mod_ddzhu.uid){
        _this.btn_buchu.setBright(false);
        _this.btn_buchu.setEnabled(false);
    }

    /*for(var i = 1;i<3;i++) {
     cc.log("_this.players[i].data.uid"+_this.players[i].data.uid +",_this.mod_ddzhu.uid"+_this.mod_ddzhu.uid);
     if(_this.players[i].data.uid != _this.mod_ddzhu.uid) {
     _this.setpokerCount(i, _this.handCard.length);
     }
     }*/
    _this.curCardCount(stepData.uid,stepData.cards.length);
};
gameclass.ddzhutable.prototype.alarmUid = [true,true,true];
gameclass.ddzhutable.prototype.alarmRes = function (alarmuid,index,alarmcount) {
    //cc.log("alarmuid"+alarmuid+"index"+index+"alarmcount"+alarmcount);
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
            } else {
                mod_sound.playeffect(g_music["Man_two_card"], false);
            }
            this.alarmUid[index] = false;
        }, 1);
    }
};
gameclass.ddzhutable.prototype.curCardCount = function (curuid,size) {
    //cc.log("curuid="+curuid+",size="+size);
    //if(size < 1){return;}
    this.playerCardCounts[ curuid ] -= size;
    for(var i = 0;i<3;i++){

        var alarmcount = this.playerCardCounts[ this.players[i].data.uid ];
        if(alarmcount <= 2 ){
            this.alarmRes(this.players[i].data.uid,i,alarmcount);
            //this.players[i].alarmcount.setVisible(true);
        }

        this.players[i].alarmcount.setString("手牌："+this.playerCardCounts[ this.players[i].data.uid ]);
    }

};
//发地主牌
gameclass.ddzhutable.prototype.onDDZgamedealer = function (DZcard,DZuid,razz,noadd) {
    //cc.log("DZcard="+DZcard+",DZuid="+DZuid);
    var _this = this;
    /*_this.reClock();
     _this.isHitCard = false;
     _this.clock.setVisible(true);
     _this.schedule(_this.updateData, 1);*/
    _this.crateDZcard(_this.transCardtoNum(DZcard));//创建 地主三张牌

    _this.clean_call_ui();//清除叫分UI
    if(!noadd) {
        _this.zhuangJia = DZuid;
        _this.curStep = DZuid;
    }
    if(_this.mod_ddzhu.uid == DZuid){
        if(!noadd){
            _this.dzdeal(DZcard);
        }
    }

    if(!noadd){ _this.playerCardCounts = {};}

    for(var i = 0;i<3;i++){
        if(DZuid == _this.players[i].data.uid) {
            _this.players[i].dizhu.setTexture(res.btn_dizhu);
            if(!noadd)_this.playerCardCounts[ _this.players[i].data.uid ] = 20;
            //cc.log("dzuid="+DZuid+",cardsize="+_this.players[i].data.cardsize);
        }else{
            _this.players[i].dizhu.setTexture(res.btn_nongmin);
            if(!noadd)_this.playerCardCounts[ _this.players[i].data.uid ] = 17;
            //cc.log("nmuid="+DZuid+",cardsize="+_this.players[i].data.cardsize);
        }
        _this.curCardCount(_this.players[i].data.uid,0);
        _this.players[i].dizhu.setVisible(true);

    }
    if(_this.mod_ddzhu.isdouble) {
        _this.isdouble.setVisible(true);
        _this.noDouble.setVisible(true);
    }else{
        if(!noadd)
            _this.curStepUser();
    }
    /*cc.log("DZCard=------------------------------");
    cc.log(_this.players);*/


};
gameclass.ddzhutable.prototype.curStepUser = function() {
    cc.log("func curStepUser");
    var _this = this;
    if(_this.mod_ddzhu.uid == _this.curStep){
        _this.btn_buchu.setVisible(true);
        _this.btn_buchu.setBright(false);
        _this.btn_buchu.setEnabled(false);
        _this.btn_chupai.setVisible(true);
        _this.btn_tishi.setVisible(true);

        _this.showProgress(_this.curStep);
    }
};

gameclass.ddzhutable.prototype.hideDouble = function(uid){
    if(uid == this.mod_ddzhu.uid) {
        this.isdouble.setVisible(false);
        this.noDouble.setVisible(false);
    }
};

gameclass.ddzhutable.prototype.userDouble = [];
gameclass.ddzhutable.prototype.ongamedouble = function(data,noadd){

    //cc.log("this.userDouble");
    //cc.log(this.userDouble);

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
gameclass.ddzhutable.prototype.ongamedealer = function (dealer,uid) {
    /*if(_this.mod_ddzhu.uid == uid) {
     _this.qiangzhuang0.setVisible(false);
     _this.buqiang0.setVisible(false);
     }*/
    var _this = this;
    if (dealer){
        var playerdata = _this.mod_ddzhu.getplayerdata(0);
        if (playerdata!= null){
            //_this.qiangzhuang.setVisible(false);
            //_this.buqiang.setVisible(false);
        }

        var playernum = _this.mod_ddzhu.getplayernum();

        var beg = 0;
        var playerlst = [];
        var playerctrl = [];

        for (var i = 0;i < 3;i ++) {
            var player = _this.mod_ddzhu.getplayerdata(i);
            var otherddata = _this.mod_ddzhu.getplayerotherdata(i);
            if (player != null && player.rob == 1) {
                playerlst[playerlst.length] = otherddata;
                playerctrl[playerctrl.length] = _this.players[i].zhuang;
            }
        }

        if (playerlst.length == 0){
            for (var i = 0;i < 3;i ++) {
                var otherddata = _this.mod_ddzhu.getplayerotherdata(i);
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

        //lst.sort(function(){ return 0.5 - Math.random() });

    }else {
        _this.refplayerinfo();
    }
};
gameclass.ddzhutable.prototype.ongameddzbye = function(data){
    //var _this = this;
    //_this.ddzenddata = data;
    ////_this.isDDZend = false;
    //_this.userDouble.length = 0;
    //_this.gameEndbye();
    var _this = this;
    _this.ddzenddata = data;
    _this.userDouble.length = 0;
    if(!_this.mod_ddzhu.isend)_this.gameByeAll();
};

gameclass.ddzhutable.prototype.gameByeAll = function(){
    var _this = this;
    _this.game.uimgr.showui("gameclass.ddzhuresultui");
    _this.game.uimgr.uis["gameclass.ddzhuresultui"].setData(_this.mod_ddzhu);
},

gameclass.ddzhutable.prototype.ongameDDZend = function(data,showfast){

    var _this = this;

    _this.ddzenddata = data;
    _this.btn_chupai.setVisible(false);
    _this.btn_tishi.setVisible(false);
    _this.btn_buchu.setVisible(false);
    _this.userDouble.length = 0;
    if(data.ct)
        _this.showCTspr();
    for(var i = 1;i<3;i++){
        _this.players[i].cards.removeAllChildren();
    }
    for(var i =0;i<3;i++){
        _this.mod_ddzhu.roominfo.person[i].ready = false;
        if(data.info[i].uid == _this.mod_ddzhu.uid){
            continue;
        }
        for(var j = 1;j<3;j++) {
            if (_this.players[j].data.uid == data.info[i].uid ) {

                _this.showEndCard(data.info[i].card, j);
            }
        }

    }
    if(data.bets < 1){
        _this.showToast("无人叫牌，进入下局");
    }
    _this.mod_ddzhu.roominfo.step++;
    _this.isDDZend = true;
    var seq = cc.sequence(cc.delayTime(2),cc.callFunc(function(sender){
        _this.resultend();
    }));
    _this.node.runAction(seq);
};
gameclass.ddzhutable.prototype.resultend = function(){
    if (this.isDDZend) {
        var tableData = {
            difen:this.difen,
            RoomCount:this.RoomMax - this.RoomMin
        };

        var datasOne = [];
        for(var i = 0; i<this.ddzenddata.info.length ;i++) {
            datasOne.push({
                name: this.mod_ddzhu.roominfo.person[i].name,
                uid: this.mod_ddzhu.roominfo.person[i].uid,
                icon: this.mod_ddzhu.roominfo.person[i].imgurl,
                dealer:this.ddzenddata.info[i].dealer,
                isdouble:this.ddzenddata.info[i].isdouble,
                score: this.ddzenddata.info[i].score,
                card:this.ddzenddata.info[i].card

            });

        }
        this.game.uimgr.showui("gameclass.ddzhuresultoneui").setniuniumod(tableData, this.mod_ddzhu, datasOne);
        this.RoomMin++;
        //更新总分
        this.updataTotal(this.ddzenddata);
    }
};
gameclass.ddzhutable.prototype.showCTspr = function(){
    //this.difen *= 2;
    this.curBoom++;
    this.difen = this.countDifen(this.curBoom , this.bets);
    this.fsk_difen.setString("底分：" + this.difen);
    this.playRes(20);//春天动画
};
gameclass.ddzhutable.prototype.ongameviewf = function(){
    var _this = this;
    _this.ongameview++;
    if (_this.mod_ddzhu.getplayernum() == _this.ongameview){
        _this.stopAllActions();
        //_this.game.uimgr.showui("gameclass.resultoneui").setniuniumod(_this.mod_ddzhu,_this);
        var ani = cc.sequence(cc.delayTime(3),cc.callFunc(function(sender){
            _this.game.uimgr.showui("gameclass.resultoneui").setniuniumod(_this.mod_ddzhu,_this);
        }));
        _this.runAction(ani);
        _this.refplayerinfo(true);
    }
};

/*var cards = [];   //保存牌的数字
 var sprCard = [];//将数字转为对应的牌*/

gameclass.ddzhutable.prototype.showEndCard = function(endCard,index){
    //cc.log("showEndCard="+endCard+","+index);
    if(endCard.length == 0){
        return;
    }

    var tmpCardData = this.transCardtoNum(endCard);
    this.handSort(tmpCardData);
    if(index == 1) {
        for (var i = tmpCardData.length-1; i >= 0; i--) {
            var sp = this.createCardUI(tmpCardData[i].card, tmpCardData[i].type);
            sp.setRotation(-90);
            sp.setPosition(0, 100);/*tmpCardData.length * 20 / 2 - (20 * i) - 70*/
            sp.runAction(cc.moveBy(0.8, 0, -17 * i+70));
            sp.setScale(0.6);
            this.players[index].cards.addChild(sp);
        }
    }else {
        for (var  i = 0; i < tmpCardData.length; i++) {
            var sp = this.createCardUI(tmpCardData[i].card, tmpCardData[i].type);
            sp.setRotation(90);
            sp.setPosition(0, 100);/*tmpCardData.length * 20 / 2 - (20 * i) - 60*/
            sp.runAction(cc.moveBy(0.8, 0, -17 * i+70));
            sp.setScale(0.6);
            this.players[index].cards.addChild(sp);
        }
    }

};
//gameclass.ddzhutable.prototype.updateData = function(){
//
//    //&&  new Date().getTime()+(this.maxTime * 60)
//    --this.maxTime;
//    if(this.maxTime <= 0 ) {
//        /*cc.log("this.mod_ddzhu.uid="+this.mod_ddzhu.uid);
//         cc.log("curStep="+curStep);
//         cc.log(this.isHitOrRob);*/
//        /*if(!this.Pass) {
//         if (this.mod_ddzhu.uid != curStep)return;
//         }*/
//
//        //if(this.isHitCard) {
//        // if (this.mod_ddzhu.CreateRoomType <= 2) {
//
//        if (this.isDDZend) {
//            var tableData = {
//                difen:this.difen,
//                RoomCount:this.RoomMax - this.RoomMin
//            };
//
//            var datasOne = [];
//            for(var i = 0; i<this.ddzenddata.info.length ;i++) {
//                datasOne.push({
//                    name: this.mod_ddzhu.roominfo.person[i].name,
//                    uid: this.mod_ddzhu.roominfo.person[i].uid,
//                    icon: this.mod_ddzhu.roominfo.person[i].imgurl,
//                    dealer:this.ddzenddata.info[i].dealer,
//                    isdouble:this.ddzenddata.info[i].isdouble,
//                    score: this.ddzenddata.info[i].score,
//                    card:this.ddzenddata.info[i].card
//
//                });
//
//            }
//            this.game.uimgr.showui("gameclass.ddzhuresultoneui").setniuniumod(tableData, this.mod_ddzhu, datasOne);
//            this.RoomMin++;
//            //更新总分
//            this.updataTotal(this.ddzenddata);
//        } else {
//            var datasEnd = [];
//            for(var i = 0;  i<this.mod_ddzhu.roominfo.person.length ; i++ ){
//                for(var j = 0; j<this.ddzenddata.info.length ;j++){
//                    if(this.ddzenddata.info[j].uid == this.mod_ddzhu.roominfo.person[i].uid  ){
//                        datasEnd.push({
//                            icon:this.mod_ddzhu.roominfo.person[i].imgurl,
//                            uid:this.mod_ddzhu.roominfo.person[i].uid,
//                            name:this.mod_ddzhu.roominfo.person[i].name,
//                            high:this.ddzenddata.info[j].high,
//                            boom:this.ddzenddata.info[j].boom,
//                            win:this.ddzenddata.info[j].win,
//                            deal:this.ddzenddata.info[j].deal,
//                            score:this.ddzenddata.info[j].score
//                        });
//                        break;
//                    }
//                }
//            }
//            this.game.uimgr.showui("gameclass.ddzhuresultui").setData({
//                steps:{min:this.RoomMin,max:this.RoomMax},
//                roomnum:this.mod_ddzhu.roomnum,
//                info:datasEnd
//            });
//        }
//
//        // } else {
//        //    this.resetDDZNext(this.mod_ddzhu.uid);
//        //}
//        /*}else{
//         if(this.zhuangJia == this.mod_ddzhu.uid){
//         var tag = this.players[0].cards.getChildren();
//         if(tag.length > 0) {
//         var tag1 = tag[tag.length - 1];
//         var tagarr = [];
//         tagarr[0] = tag1.getTag();
//         this.mod_ddzhu.gamesteps(tagarr);
//         }
//         }else{
//         if(this.isHitOrRob){
//         this.isHitOrRob = false;
//         this.gamebets.setVisible(false);
//         this.mod_ddzhu.gamebets(0);
//         this.refplayerinfo(null,null,true);
//         }else {
//         var nullCard = [];
//         this.mod_ddzhu.gamesteps(nullCard);
//         }
//         }
//
//         }*/
//        this.unschedule(this.updateData);
//    }
//};

//var userUID = [];
gameclass.ddzhutable.prototype.initUserData = function(data){
        for (var i = 0; i < data.info.length; i++) {
            this.refplayerDDZinfo(data.info[i].card, data.info[i].uid);
            this.players[i].ok.setVisible(false);
            //userUID[i] = data.info[i].uid;
            this.players[i].alarmcount.setString("手牌:"+data.info[i].card.length);
        }

};
gameclass.ddzhutable.prototype.share = function(){

    var ddz_mode = this.mod_ddzhu.GameType == gameclass.gamelzddz? "癞子玩法":"经典玩法";
    var maxboom = this.maxBoom+"炸封顶";
    if(this.mod_ddzhu.GameType == gameclass.gamelzddz && this.mod_ddzhu.CreateRoomType == 1){
        maxboom = this.maxBoom+"炸不封顶";
    }
    var callScore = this.mod_ddzhu.CreateRoomType <= 2? "叫分模式":"不叫分模式";
    var separateKing = this.mod_ddzhu.chaiwang?"双王可拆":"双王不可拆";
    var isDouble = this.mod_ddzhu.isdouble?"可加倍":"不可加倍";
    var str = "房号[" + this.mod_ddzhu.roomnum+  "],["+maxboom+"],["+callScore+"],["+separateKing+"],["+isDouble+"]," +"一共[" +this.mod_ddzhu.maxStep + "]局。大家都等您，快来吧。";
    //cc.log(str);
    gameclass.mod_platform.invitefriend(str,
        this.mod_ddzhu.roomnum,
        "美鸟斗地主-"+ddz_mode+"-"+this.mod_ddzhu.roomnum);

};
gameclass.ddzhutable.prototype.checkSafe = function(people){
    this.safeLayer.checkSafe(people);
};

gameclass.ddzhutable.prototype.isFirstTips = true;
gameclass.ddzhutable.prototype.init = function(){

    this.node = this.game.uimgr.createnode(res.ddzhutable,true);
    this.node.setTag(9876);
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
    cc.spriteFrameCache.addSpriteFrames(res.ani1list);
    //cc.spriteFrameCache.addSpriteFrames(res.leftplist);

    //_this.game.uimgr.showui("gameclass.btn_setLayer");
    var btn_layer = new gameclass.btn_setLayer(_this.node,_this.game);
    this.node.addChild(btn_layer);
    var closeinfo = ccui.helper.seekWidgetByName(_this.node,"closeinfo");
    closeinfo.setLocalZOrder(1000);
    btn_layer.setLocalZOrder(999);

    this.safeLayer = new gameclass.checkSafeLayer(this.node,this.game,ccui.helper.seekWidgetByName(btn_layer,"btn_safe"));
    this.safeLayer.setName("safeLayer");
    this.node.addChild(this.safeLayer);

    this.laidipaikuang = ccui.helper.seekWidgetByName(this.node,"laidipaikuang");

    var dianchi = ccui.helper.seekWidgetByName(this.node,"dianchi");
    dianchi.setPercent(gameclass.battery);


    ////电池
    //var dianchi = ccui.helper.seekWidgetByName(this.node,"dianchi");


    //if(this.mod_ddzhu.roominfo.type == 6){
    //    .setVisible(false);
    //}

    //_this.sharelayer = ccui.helper.seekWidgetByName(_this.node, "sharelayer");
    //_this.sharelayer.setVisible(false);
    _this.qiangzhuang0 = ccui.helper.seekWidgetByName(_this.node, "qiangzhuang_0");
    _this.buqiang0 = ccui.helper.seekWidgetByName(_this.node, "buqiang_0");
    _this.isdouble = ccui.helper.seekWidgetByName(_this.node, "btn_double");
    _this.noDouble = ccui.helper.seekWidgetByName(_this.node, "btn_noDouble");
    _this.isdouble.setVisible(false);
    _this.noDouble.setVisible(false);
    _this.gamebets = ccui.helper.seekWidgetByName(_this.node, "gamebets");
    _this.gamebets.setVisible(false);
    _this.qiangzhuang0.setVisible(false);
    _this.buqiang0.setVisible(false);
    _this.invitebtn = ccui.helper.seekWidgetByName(_this.node, "invitebtn");

    _this.fsk_difen = ccui.helper.seekWidgetByName(_this.node, "fsk_difen");
    _this.fsk_difen.setString("底分："+0);
    _this.talkPos = [cc.p(70,200),cc.p(1000,410),cc.p(150,410)];
    //_this.pokerReverse();

    gameclass.createbtnpress(this.node, "qiangzhuang_0", function () {
        _this.mod_ddzhu.gamebets(1);
        _this.qiangzhuang0.setVisible(false);
        _this.buqiang0.setVisible(false);
        _this.refplayerinfo(null,null,true);
    });

    gameclass.createbtnpress(this.node, "buqiang_0", function () {
        _this.mod_ddzhu.gamebets(0);
        _this.qiangzhuang0.setVisible(false);
        _this.buqiang0.setVisible(false);
        _this.refplayerinfo(null,null,true);
    });

    gameclass.createbtnpress(this.node, "invitebtn", function () {
        _this.share();

        if(window.wx)
        {
            //_this.sharelayer.setVisible(true);
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
    //_this.ready = ccui.helper.seekWidgetByName(this.node, "ready");//.setVisible(!this.mod_ddzhu.selfdata.ready && !begin);
    //_this.ready.setVisible(false);


    _this.btn_chupai = ccui.helper.seekWidgetByName(_this.node, "btn_chupai");
    _this.btn_tishi = ccui.helper.seekWidgetByName(_this.node, "btn_tishi");
    _this.btn_buchu = ccui.helper.seekWidgetByName(_this.node, "btn_buchu");
    _this.btn_chupai.setVisible(false);
    _this.btn_tishi.setVisible(false);
    _this.btn_buchu.setVisible(false);
    gameclass.createbtnpress(this.node, "btn_chupai", (function () {
        _this.btn_chupaifunc();
        //this.sendHandCardUI(this.willSendCard);
        //_this.selSendCrad();
        //_this.transSpr(cards,true);

    }).bind(_this));
    gameclass.createbtnpress(this.node, "btn_tishi", function () {
        _this.btn_tishifunc();

    });
    gameclass.createbtnpress(this.node, "btn_buchu", function () {
        if(_this.curStep != _this.mod_ddzhu.uid) {
            return;
        }
        _this.passCard();
    });

    gameclass.createbtnpress(this.node, "gamebets0", function () {
        _this.gamebets.setVisible(false);
        _this.mod_ddzhu.gamebets(1);
        _this.refplayerinfo(null,null,true);
    });
    gameclass.createbtnpress(this.node, "gamebets1", function () {
        _this.gamebets.setVisible(false);
        _this.mod_ddzhu.gamebets(2);
        _this.refplayerinfo(null,null,true);
    });
    gameclass.createbtnpress(this.node, "gamebets2", function () {
        _this.gamebets.setVisible(false);
        _this.mod_ddzhu.gamebets(3);
        _this.refplayerinfo(null,null,true);
    });
    gameclass.createbtnpress(this.node, "gamebets_0", function () {
        _this.gamebets.setVisible(false);
        _this.mod_ddzhu.gamebets(0);
        _this.refplayerinfo(null,null,true);
    });

    gameclass.createbtnpress(this.node, "btn_noDouble", function () {
        _this.mod_ddzhu.gamedouble(1);
    });
    gameclass.createbtnpress(this.node, "btn_double", function () {
        _this.mod_ddzhu.gamedouble(2);
    });
    //for(var i = 0; i < 3; i++) {
    //    gameclass.createbtnpress(this.node, "head" + i, function (_1, _2, index) {
    //        _this.players[index].ip_id.setVisible(false);
    //    }, function (_1, _2, index) {
    //        _this.players[index].ip_id.setVisible(true);
    //        var playerdata = _this.mod_ddzhu.getplayerdata(index);
    //        _this.players[index].playerid.setString("ID:" + playerdata.uid);
    //        if(playerdata.ip == "") {
    //            _this.players[index].playerip.setString("离线");
    //            _this.players[index].address.setString("地址未知");
    //        } else {
    //            _this.players[index].playerip.setString("IP:" + playerdata.ip);
    //            if(playerdata.address == "") {
    //                _this.players[index].address.setString("地址未知");
    //            } else {
    //                _this.players[index].address.setString(playerdata.address);
    //            }
    //        }
    //    }, function (_1, _2, index) {
    //        _this.players[index].ip_id.setVisible(false);
    //    }, i);
    //}
    var showipinfo = function(sender,type){
        if(ccui.Widget.TOUCH_ENDED == type){
            //if(sender.index == 0) return;
            var playerdata = _this.mod_ddzhu.getplayerdata(sender.index);
            _this.game.uimgr.showui("gameclass.chatMicLayer").setPlayerInfo(playerdata,_this.mod_ddzhu,sender.index);
        }
    }
      var playerPanelArr=ccui.helper.seekWidgetByName(this.node,"playerPanel").getChildren();
    for (var i = 0;i < playerPanelArr.length; i++){
        var data = {};
        data.head = playerPanelArr[i];
        data.dizhu = ccui.helper.seekWidgetByName(playerPanelArr[i], "isdizhu");
        data.spr_double = ccui.helper.seekWidgetByName(playerPanelArr[i], "spr_double");
        data.cards = ccui.helper.seekWidgetByName(this.node, "notifynode" + i);
        data.outCards = ccui.helper.seekWidgetByName(this.node, "hitoutCardView" + i);
        data.ok = ccui.helper.seekWidgetByName(playerPanelArr[i], "ok");
        data.icon = ccui.helper.seekWidgetByName(playerPanelArr[i], "icon");
        data.ip_id = ccui.helper.seekWidgetByName(playerPanelArr[i], "ip_id");
        data.playerid = ccui.helper.seekWidgetByName(playerPanelArr[i], "playerid");
        data.playerip = ccui.helper.seekWidgetByName(playerPanelArr[i], "playerip");
        data.address = ccui.helper.seekWidgetByName(playerPanelArr[i], "address");
        data.playername = ccui.helper.seekWidgetByName(playerPanelArr[i], "playername");
        data.userScore = ccui.helper.seekWidgetByName(playerPanelArr[i], "jifenText");
        data.alarm = ccui.helper.seekWidgetByName(playerPanelArr[i], "alarm");
        data.alarmcount = ccui.helper.seekWidgetByName(playerPanelArr[i], "alarmcount");
        data.off_line = ccui.helper.seekWidgetByName(playerPanelArr[i], "off_line");
        this.players[i] = data;
        this.players[i].head.setVisible(false);
        this.players[i].dizhu.setVisible(false);
        this.players[i].icon=data.icon;
        this.players[i].spr_double.setVisible(false);
        this.players[i].ok.setVisible(false);
        this.players[i].alarm.setVisible(false);
        this.players[i].ip_id.setVisible(false);
        this.players[i].off_line.setVisible(false);
        this.players[i].userScore.setString("0");
        this.players[i].head.index = i;
        this.players[i].head.addTouchEventListener(showipinfo);
    }
    _this.dipaikuang = ccui.helper.seekWidgetByName(this.node, "dipaikuang");
    _this.laidipaiKuang=ccui.helper.seekWidgetByName(this.node, "laidipaikuang");
   // _this.laidipaiKuang.setVisible(false);
};



gameclass.ddzhutable.prototype.btn_tishifunc = function(){
    var _this = this;
    //cc.log("---------tishi--------");
    //cc.log("_this.savebefCard"+_this.savebefCard);
    if(_this.curStep != _this.mod_ddzhu.uid) {
        return;
    }

    var copyWillSendCard = _this.willSendCard.slice(0,_this.willSendCard.length);
    //cc.log("copyWillSendCard"+copyWillSendCard);
    //清空选中的手牌
    _this.willSendCard.length = 0;
    cc.each(_this.handCard , function(o,i){
        var target = _this.players[0].cards.getChildByTag(o.id);
        if(target.isup){
            target.setPositionY(target.getPositionY() - 20);
            target.isup = false;
        }
    });
    var befcards = [];
    if(_this.zhuangJia != _this.mod_ddzhu.uid){
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
        //cc.log("tipscard");
        //cc.log(tipscard);
        if(!tipscard || tipscard.length == 0){
            _this.showToast("没有牌大过大家");
            return;
        }else{
            _this.isFirstTips = false;
        }
    }else {
        tipscard = _this.tool_cardType.tipsCard(copyhandcards, copyWillSendCard);
        var gg = false;
        //cc.log("tipscard");
        //cc.log(tipscard);
        if (!tipscard || tipscard.length == 0) {
            _this.isFirstTips = true;
        }
    }
    tipscard.sort(function(a, b){
        return b - a});

    _this.tipsSelectCards(tipscard,handcards);

    //cc.log("选定后的牌"+_this.willSendCard);

};
gameclass.ddzhutable.prototype.showToast = function(_text){
    if(this.node.getChildByTag(123456)){
        return;
    }
    var _this = this;
    var node = new cc.Sprite(res.img_input);
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

gameclass.ddzhutable.prototype.btn_chupaifunc = function(){
    var _this = this;
    //cc.log("curStep=="+_this.curStep);
    //cc.log("_this.mod_ddzhu.uid=="+_this.mod_ddzhu.uid);
    //cc.log("zhuangJia=="+_this.zhuangJia);
    if(_this.curStep != _this.mod_ddzhu.uid) {
        return;
    }
    _this.isFirstTips = true;
    //将牌转为 0 - 15
    var CheckCards = this.transMinCard(this.willSendCard);
    var chaiwang = _this.chaiWang(this.willSendCard);
    if(chaiwang) {
        _this.showToast("当前玩法不能拆王");
        return;
    }
    if(_this.zhuangJia == _this.mod_ddzhu.uid) {
        //cc.log("庄家随意出牌hitCard");
        var hitCard =this.tool_cardType.check(CheckCards);
        //cc.log("hitCard");
        //cc.log(hitCard);
        if(hitCard != 0) {
            _this.mod_ddzhu.gamesteps(this.willSendCard);
        }else{
            _this.showToast("牌型错误");
        }
    }else{
        //cc.log("开始压牌perssCard");
        var checkCards2 = this.transMinCard(this.savebefCard);
        var perssCard = this.tool_cardType.compare(CheckCards,checkCards2);
        //cc.log("perssCard");
        //cc.log(perssCard);
        if (perssCard.value != -1) {
            _this.mod_ddzhu.gamesteps(this.willSendCard);
        }else{
            _this.showToast("牌型错误");
        }
    }
};
//是否可以拆王
gameclass.ddzhutable.prototype.chaiWang = function(hitcard){
    var def = false;
    if(hitcard.length == 1 && !this.mod_ddzhu.chaiwang) {
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
//选中提示的牌
gameclass.ddzhutable.prototype.tipsSelectCards = function(_tipscard,_handcards){
    //cc.log(_tipscard,_handcards);
    var selHandindex = 0;
    var tag = [];
    //for(var i = _tipscard.length - 1;i >= 0;i--){
    for(var i = 0;i < _tipscard.length;i++){
        //for(var j = _handcards.length - 1 - selHandindex;j >= 0;j--) {
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
                //cc.log("target="+target.getTag());
                this.willSendCard.push(target.getTag());
                target.setPositionY(target.getPositionY() + 20);
                target.isup = true;
               // selHandindex = j + 1;
                tag.push(j);
                //cc.log("selHandindex"+selHandindex);
                break;

            }
        }
    }
};
gameclass.ddzhutable.prototype.passCard = function(){
    this.isFirstTips = true;
    var nullCard = [];
    this.mod_ddzhu.gamesteps(nullCard);
};
gameclass.ddzhutable.prototype.playAnim = function(framename,start,end,delay){

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
gameclass.ddzhutable.prototype.playRes = function(soundType,value){
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
gameclass.ddzhutable.prototype.transMinCard = function(_arrCards){

    var checkCards = [];
    for(var i =0;i < _arrCards.length; i++){

        checkCards[i]= Math.floor(_arrCards[i]/10);
        if(checkCards[i] < 3){
            checkCards[i] += 13;
        }
    }
    return checkCards;
};
gameclass.ddzhutable.prototype.createCardUI = function (num,type) {

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
    }
    spr.setAnchorPoint(cc.p(0.5,0.5));
    return spr;
};

gameclass.ddzhutable.prototype.updateOtherHandCardUI = function (_cards,befuid) {
    var _this = this;
    _this.players[befuid].cards.removeAllChildren();
    _this.players[befuid].otherHandCard = _cards;
    cc.log("hahahahah啊：",_cards,_cards.length);
    for (var k = 0; k < _cards.length; k++) {
        var tmpCardData = _cards[k];
        var sp = _this.createCardUI(tmpCardData.card , tmpCardData.type);

        sp.setPosition(-_cards.length * 25 + (35 * k) + 120, 350);
        //cc.log("tmpCardData="+tmpCardData.card , tmpCardData.type);
        sp.setTag(tmpCardData.id);
        sp.setScale(1.4);
        _this.players[befuid].cards.setScale(0.5)
        _this.players[befuid].cards.addChild(sp);
    }
};

/*
*  更新手牌UI
* */

gameclass.ddzhutable.prototype.updateHandCardUI = function (isMoveCard) {
    var _this = this;
    _this.willSendCard = [];
    var _cards = _this.handCard;
    _this.players[0].cards.removeAllChildren();
    var x = _cards.length > 17?80:160;
    for (var k = 0; k < _cards.length; k++) {
        var tmpCardData = _cards[k];
        var sp = _this.createCardUI(tmpCardData.card , tmpCardData.type);
        if(isMoveCard){
            //sp.setPosition(_this.players[0].cards.getPositionX() -  cc.winSize.width + x, 0);
            //sp.runAction(cc.moveBy(0.8, 50 * k, 0));
            sp.setPosition(0, 0);
            sp.runAction(cc.moveBy(0.8, -_cards.length * 25 + (50 * k) + 25, 0));
        }else{
            sp.setPosition(-_cards.length * 25 + (50 * k) + 25, 0);
        }
        //cc.log("tmpCardData="+tmpCardData.card , tmpCardData.type);
        sp.setTag(tmpCardData.id);
        sp.setScale(1.4);
        _this.players[0].cards.addChild(sp);
    }
    _this.createMyEventListener();
};
gameclass.ddzhutable.prototype.getHandCardWithIndex = function (index) {

    if(index < 0){
        index = this.handCard.length + index;
    }
    var target = this.players[0].cards.getChildByTag(this.handCard[index].id);
    return target;
};
gameclass.ddzhutable.prototype.touchHandCard = function (isSel) {

    var min = Math.min(this.selStartCard , this.selEndCard );
    //cc.log("min"+min);
    var max = Math.max(this.selStartCard , this.selEndCard );
    //cc.log("max"+max);
    cc.each(this.handCard,function(o,i){
        var target = this.players[0].cards.getChildByTag(o.id);
        var targetchild = target.getChildren();
        if(i >=  min && i<=max){
            target.setColor(cc.color(200,200,200,200));

            //cc.log("targetchild");
            //cc.log(targetchild);
            if(targetchild.length > 0)
                targetchild[0].setColor(cc.color(200,200,200,200));
            if(isSel){
                target.isup = !target.isup;
                target.setPositionY( target.getPositionY() + ( target.isup ? 1 : -1 ) * 20   );
                if(target.isup){
                    this.willSendCard.push(o.id);
                }else{
                    this.willSendCard.remove(o.id);
                }
            }
        }else{
            target.setColor(cc.color(255,255,255,255));
            if(targetchild.length > 0)
                targetchild[0].setColor(cc.color(255,255,255,255));
        }

    },this);
};

gameclass.ddzhutable.prototype.getTouchCard = function(position){
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

gameclass.ddzhutable.prototype.selStartCard = null;//手动滑牌的起始下标
gameclass.ddzhutable.prototype.selEndCard = null;  //手动滑牌的结束下标

gameclass.ddzhutable.prototype.handCard = null;   //玩家手里的牌
gameclass.ddzhutable.prototype.willSendCard = null;//保存点击的手牌
/**
 *  手牌排序
 */
gameclass.ddzhutable.prototype.handSort = function (_cards) {
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
 *  初始发牌
 */
gameclass.ddzhutable.prototype.deal = function (_cards,zhuangjia_uid) {
    var befuid = 0;
    for(var i = 0;i<3;i++){
        if(zhuangjia_uid == this.players[i].data.uid){
            befuid = i;
        }
    }
    if(befuid == 0){
        this.handCard = [];
        this.handCard = this.transCardtoNum(_cards);

        //cc.log("初始发牌转换---------------------");
        //cc.log(this.handCard);
        //cc.log("初始发牌转换---------------------");
        this.handSort(this.handCard);
        this.updateHandCardUI(true);
    }else{
        var _handCard = this.transCardtoNum(_cards);
        this.handSort(_handCard);
        this.updateOtherHandCardUI(_handCard,befuid);
    }
}
/**
 *  发牌地主牌
 */
gameclass.ddzhutable.prototype.dzdeal = function (_cards) {
    var cards = this.transCardtoNum(_cards);

    //cc.log(cards);

    for(var i = 0; i < cards.length; i++){
        this.handCard.push(cards[i]);
    }
    this.handSort(this.handCard);
    this.updateHandCardUI();
}


gameclass.ddzhutable.prototype.sendHandCardUI = function (_cards) {

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

gameclass.ddzhutable.prototype.sendOtherHandCardUI = function (_cards,_index) {
    if(!this.players[_index].otherHandCard)return;
    for(var x = 0; x< _cards.length ; x++){
        for(var  j =0; j<  this.players[_index].otherHandCard.length ; j++){
            if(_cards[x] == this.players[_index].otherHandCard[j].id){
                this.players[_index].otherHandCard.splice(j,1);
                break;
            }
        }
    }

    this.handSort(this.players[_index].otherHandCard);
    this.updateOtherHandCardUI(this.players[_index].otherHandCard,_index);
}

/*
* 跟新压牌的显示界面
* */
gameclass.ddzhutable.prototype.updateHitOutcard = function(zhuangjia_uid,_cards) {
    var befCard =_cards;
    //this.hitoutCardView.removeAllChildren();
    _cards = this.transCardtoNum(befCard);

    /*_cards.sort(function(a,b){
        return a<b ? 1:-1 //大到小排序
    });*/
    this.handSort(_cards);
    var befuid = 0;
    for(var i = 0;i<3;i++){
        if(zhuangjia_uid == this.players[i].data.uid){
            befuid = i;
        }
    }

    if(_cards.length  < 1 ) {
        var pass = cc.Sprite.create("res/niuniuRes/btn_no_bigger.png");
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
            sp.setPosition(-_cards.length * 20  / 2 + (25 * i),0);
        }
        //sp.setScale(0.80);
        this.players[befuid].outCards.addChild(sp);
    }

};

gameclass.ddzhutable.prototype.pokerReverse = function() {
    for(var i = 1;i<3;i++){
        for(var j = 0;j < 17;j++) {
            var spr = cc.Sprite.create("res/niuniuRes/pokercard1.png");
            //spr.initWithSpriteFrameName();
            //spr.setAnchorPoint(cc.p(0.5, 0.5));
            //var rota = (i == 1? 5 * j + 45:305 -(5 * j));
            spr.setRotation(90);
            spr.setPosition(0, -8*j + 6);
            spr.setScale(0.6);
            this.players[i].cards.addChild(spr);
        }
    }
    /*for(var i = 1;i<3;i++){
        ccui.helper.seekWidgetByName(this.node, "poker_beimian"+i).setVisible(state);
        ccui.helper.seekWidgetByName(this.node, "curpoker_count"+i).setVisible(state);

    }*/
};
gameclass.ddzhutable.prototype.setpokerCount = function(cur,count) {
        ccui.helper.seekWidgetByName(this.node, "curpoker_count"+cur).setString(count);
};

gameclass.ddzhutable.prototype.reset = function() {
    //cc.log("reset func");
    this.ongameview = 0;
    this.open = [false,false,false,false];
    this.mod_ddzhu.gamestate = 0;
    for(var i = 0; i < 3; i++){
        this.players[i].cards.removeAllChildren();
    }


    //ccui.helper.seekWidgetByName(this.node, "mingpai").setVisible(false);
    this.bets = 0;
    this.difen = 0;
    this.maxTime = 4;

    this.RoomMin = this.mod_ddzhu.minStep || 1;
    this.RoomMax = this.mod_ddzhu.maxStep;

    /*var curstep = (this.mod_ddzhu.roominfo.step + 1);
    if (curstep > this.mod_ddzhu.maxstep){
        curstep = this.mod_ddzhu.maxstep;
    }*/
    this.updateStepText();
};

gameclass.ddzhutable.prototype.updateStepText = function(){
    this.curround.setString("局数:"+this.RoomMin + "/" + this.RoomMax);
};

gameclass.ddzhutable.prototype.crateniuniuani = function(cardlst,soundniu) {

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
        //cc.log(index);
        mod_sound.playeffect(g_music["niu_" + index + "_w"],false);
    }

    return spr;
};
gameclass.ddzhutable.prototype.cratecard = function(card,up) {
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

gameclass.ddzhutable.prototype.crateDZcard = function(cardarr) {
    for(var i = 0;i<3;i++) {
        var spr = cc.Sprite.create();
        /*if(!card){
            spr.initWithSpriteFrameName("pukebeimian.png");
        }else{*/
        spr = this.createCardUI(cardarr[i].card,cardarr[i].type);
        //}
        spr.setPosition(this.dipaikuang.getContentSize().width / 2 + (28 * i) - 28,this.dipaikuang.getContentSize().height / 2);
        spr.setScale(0.45);
        //spr.setPosition(30 + (20 * i) ,this.dipaikuang.getContentSize().height / 2);
        this.dipaikuang.addChild(spr);
    }

};

/*gameclass.ddzhutable.prototype.card_to_res = function (num,type) {
    var abcd = ["a","d","b","c"];
    var point = num;
    if(point > 13 && point < 16){
        point -= 13;
    }

    var spr = cc.Sprite.create();
    if (point == 100) {
        spr.initWithSpriteFrameName("card_joker_gray.png");
    }else if(point == 200){
        spr.initWithSpriteFrameName("card_joker.png");
    }else{
        spr.initWithSpriteFrameName("card_" + point +  type + ".png");
    }
    spr.setAnchorPoint(cc.p(0.5,0.5));
    return spr;

};*/

gameclass.ddzhutable.prototype.refplayerDDZinfo = function(_cards,befuid) {
    var tmpCards = [];
    for (var j = 0; j < _cards.length; j++) {
        var userCard = _cards[j];
        if (userCard == 0)return;
        tmpCards.push(userCard);
    }

    //cc.log("接受到发牌信息");
    //cc.log(tmpCards);
    //cc.log("接受到发牌信息----------------------------");

    //发牌
    this.deal(tmpCards,befuid);
};

gameclass.ddzhutable.prototype.transCardtoNum = function ( _cards ) {
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
gameclass.ddzhutable.prototype.removeTagSpr = function(tag) {
    this.dipaikuang.removeChildByTag(tag);
};
gameclass.ddzhutable.prototype.createMyEventListener = function () {
    var _this = this;
    // 创建一个事件监听器 OneByOne 为单点触摸
    cc.eventManager.addListener(cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,                        // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
        onTouchBegan: function (touch, event) {        //实现 onTouchBegan 事件回调函数
            //cc.log("onTouchBegan...");
            var target = event.getCurrentTarget();    // 获取事件所绑定的 target
            var position = target.convertToNodeSpace(touch.getLocation());
            if(position.y > 180){return true;}
            _this.selStartCard = _this.getTouchCard(position);
            //cc.log("_this.selStartCard");
            //cc.log(_this.selStartCard);
            return true;
        },
        onTouchMoved: function (touch, event) {
            //cc.log("onTouchMoved...");
            var target = event.getCurrentTarget();
            var position =target.convertToNodeSpace(touch.getLocation());            // 触摸移动时触发
            if( position.y > 180){return true;}
            if(_this.selStartCard === null)return true;
            _this.selEndCard = _this.getTouchCard(position);
            if(_this.selEndCard === null){
                var startCard = _this.getHandCardWithIndex(0);
                //cc.log(startCard.getPosition());
                var endCard = _this.getHandCardWithIndex(-1);
                if( 0 > startCard.convertToNodeSpace(position).x ){
                    _this.selEndCard = 0;
                }

                if(endCard.convertToNodeSpace(position).x > endCard.getContentSize().width ){
                    _this.selEndCard = _this.handCard.length - 1;
                }
                if(_this.selEndCard === null){return true;}
            }
            _this.touchHandCard();
            return true;
        },
        onTouchEnded: function (touch, event) {            // 点击事件结束处理
            //cc.log("onTouchEnded...");
            //cc.log(_this.selEndCard);
            if(_this.selStartCard !== null &&  _this.selEndCard === null){
                _this.selEndCard = _this.getTouchCard(touch.getLocation());
            }
            //cc.log(_this.selEndCard);
            if(_this.selStartCard !== null && _this.selEndCard !== null){
                _this.touchHandCard(true);
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

gameclass.ddzhutable.prototype.resetIcon = function(uid) {
    for (var i = 0; i < 3;i++){
        var playerdata = this.mod_ddzhu.getplayerdata(i);
        if(playerdata == null) {
            continue;
        }
        if(playerdata.uid != uid) {
            continue;
        }

        gameclass.mod_base.showtximg(this.players[i].icon, playerdata.imgurl, 0, 0,"im_headbg2", playerdata.ip == "")
        break;
    }
};

gameclass.ddzhutable.prototype.createProgress = function(playerHead,index){
    if(playerHead.getChildByTag(123321)){
        playerHead.getChildByTag(123321).removeFromParent(true);
    }
    var to1 = cc.progressFromTo(15,100,0);
    var timer = new cc.ProgressTimer(new cc.Sprite(res.progressBar));
    timer.setAnchorPoint(0.5,0.5);
    timer.type = cc.ProgressTimer.TYPE_RADIAL;
    timer.setReverseDirection(true);
    timer.setTag(123321);
    playerHead.addChild(timer);
    timer.setPosition(playerHead.getChildByName("icon").getPosition());
    timer.runAction(to1.repeatForever());
};

gameclass.ddzhutable.prototype.userLineOut = function (index, data) {
    var index = index - this.mod_ddzhu.serverchair;
    if(index < 0){
        index = index + 3;
    }
    if (data.line) {
        this.players[index].off_line.setVisible(false);
    } else {
        this.players[index].off_line.setVisible(true);
    }

    gameclass.mod_base.showtximg(this.players[index].icon,"", 0, 0, "im_headbg5", !data.line);
    this.players[index].off_line.setZOrder(this.players[index].icon.getChildren().length - 1);
};


gameclass.ddzhutable.prototype.refplayerinfo = function(showother,refscore,soundniu) {
    cc.log("refplayerinfo");
    //this.qiangzhuang.setVisible(false);
    //this.buqiang.setVisible(false);

    var begin = this.mod_ddzhu.gameniuniuinfo != null &&  this.mod_ddzhu.gameniuniuinfo.begin;
    for (var i = 0;i < 3;i++){
        var playerdata = this.mod_ddzhu.getplayerdata(i);
        /*cc.log("playerdata");
        cc.log(playerdata);*/
        var has = playerdata != null;

        //this.players[i].bei.setVisible(false);
        //this.players[i].qiangtxt.setVisible(false);

        if (has){
            var player = playerdata;
            this.players[i].data =  player;
            this.players[i].playername.setString(playerdata.name);
            this.players[i].head.setVisible(true);
            this.players[i].off_line.setVisible(!playerdata.line);
            //this.players[i].head.setPosition(400,400);
            //cc.log("head2="+this.players[i].head.getPositionX()+","+this.players[i].head.getPositionY());

            //this.players[i].head.setPosition(500,50);//(cc.winSize.width / 2,this.players[i].head.getPositionY());
            //cc.log(this.players[i].data);
            //this.players[i].ok.setVisible(player.ready&& this.mod_ddzhu.gamestate != 1 && this.mod_ddzhu.gamestate != 2);

            gameclass.mod_base.showtximg(this.players[i].icon,playerdata.imgurl,0,0,"im_headbg2", playerdata.ip == "");

        }else{
            this.players[i].head.setVisible(false);
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
            var otherddata = this.mod_ddzhu.getplayerotherdata(i);
            if (otherddata != null){

                if (otherddata.bets != 0){

                    //this.players[i].bei.setVisible(true);
                    var bet =  Math.floor(Math.abs(otherddata.bets));
                    if (bet > 0 && bet < 6){
                        //this.players[i].beinum.initWithSpriteFrameName("ssl_num2_" + bet + ".png");
                        //this.players[i].beinum.initWithFile("res/ui/niuniunew/ssl_num2_" + bet + ".png");
                    }
                        //("res/ui/niuniunew/ssl_num2_" + otherddata.bets + ".png");
                    //this.players[i].bei.setString(Math.abs(otherddata.bets ) + "倍");
                }else{
                    //this.players[i].bei.setVisible(false);
                }
                if (refscore != null) {
                    //this.players[i].playerscore.setString(otherddata.total);
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

                        if (!this.open[i] && (this.mod_ddzhu.gamestate == 1 || this.mod_ddzhu.gamestate == 2 )){
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

        /*if (showqiangzhuang){
            var playerdata = this.mod_ddzhu.getplayerdata(0);
            if (playerdata!= null &&playerdata.rob == 0){
                this.qiangzhuang.setVisible(true);
                this.buqiang.setVisible(true);
            }

            for(var i = 0; i < 3; i ++){
                var playerdata = this.mod_ddzhu.getplayerdata(i);
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

        }*/
    }
};


