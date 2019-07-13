gameclass.goldtuitongzitable = gameclass.baseui.extend({
    node:null,
    mod_ttz:null,
    playerHeads:null,
    helpinfo_layout:null,
    //curround:null,
    nodebgArr:null,
    doublecards:null,
    //tablecardnum:0,
    usedcard:0,
    myonecard:0,
    dealeruid:0,
    chaircard:null,//对应座位号牌的下标
    diansprArr:[],
    lastcardArr:null,
    isrobzh:null,
    curmaxscore:0,//抢庄最大值
    isduijubegin:false,
    jishu:0,
    spineAni:null,//通杀通赔动画
    ctor: function () {
        this._super();
        this.playerHeads = [];
        this.nodebgArr = [];
        this.doublecards = [];
        //this.tablecardnum = 20;
        this.isrobzh = [0,0,0,0,0];
        this.jishu = 0;
    },
    show:function(){
        this.init();
    },
    setmod: function (_mod) {
        this.mod_ttz = _mod;
        this.mod_ttz.bindUI(this);
        var _this = this;
        var usejinbi = [50 , 100 , 200 , 300 , 500 , 1000];
        ccui.helper.seekWidgetByName(this.node,"usegoldnum").setString("本场每局消耗"+ usejinbi[(parseInt(this.mod_ttz.roominfo.type/10)%10)]*0.5 +"金币");
    }
});

gameclass.goldtuitongzitable.prototype.onChat = function(index,data){
    //this.playerHeads[index].showCart(data);
    var _this = this;
    for(var i = 0;i < g_chatstr.length; i++){
        if(g_chatstr[i] == data.chat){
            mod_sound.playeffect(g_music["fix_msg_" + (i+1)],false);
        }
    }
    var playerIdex = _this.mod_ttz.getchairbyuid(data.uid);
    var talkPos = this.talkPos[playerIdex];

    var arr = [
        res.chatbg_ld,
        res.chatbg_rd,
        res.chatbg_rd,
        res.chatbg_ld,
        res.chatbg_ld,
    ];

    if(data.type < 4){
        var _node = new ccui.Layout();
        var s9 = null;
        if(data.type == 1){
            s9 = new cc.Scale9Sprite(arr[playerIdex]);
            s9.setCapInsets(cc.rect(60,10,10,10));
            s9.setAnchorPoint(cc.p(0,0));
            s9.setPosition(cc.p(-18,-18));
            _node.addChild(s9);

            var helloLabel = new cc.LabelTTF(data.chat, "Arial", 36);
            helloLabel.setAnchorPoint(cc.p(0,0));
            helloLabel.setColor(cc.color(33,111,75));
            _node.addChild(helloLabel);
            s9.setContentSize(helloLabel.getContentSize().width + 30,helloLabel.getContentSize().height + 30);
        }else if(data.type == 2){
            var index = Number(data.chat);
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

        }else if (data.type == 3){
            gameclass.mod_platform.playurl(data.chat);
            var spr = new cc.Sprite(res.soundopen2);
            spr.setAnchorPoint(cc.p(0.5,0.5));
            _node.addChild(spr);
        }
        if (playerIdex == 1 || playerIdex == 2){
            _node.setPosition(talkPos.x - s9.width,talkPos.y);
        }else{
            _node.setPosition(talkPos);
        }
        this.node.addChild(_node);
        var seq = cc.sequence(cc.delayTime(2),cc.callFunc(function(){
            _node.removeFromParent(true);
        }));
        _node.runAction(seq);
    }else if(data.type == 4){
        var _senderObj = JSON.parse(data.chat);
        mod_sound.playeffect(g_music["magic"+_senderObj.type],false);
        var _animateNode=new cc.Node();
        _animateNode.setScale(0.8);
        _animateNode.setTag(334455);
        _senderObj.type+=1;
        var sucAnim = new sp.SkeletonAnimation(g_magic_chat["magic_chat_"+_senderObj.type+"_1_json"], g_magic_chat["magic_chat_"+_senderObj.type+"_1_atlas"]);
        sucAnim.setAnimation(0, 'animation', false);
        sucAnim.setAnchorPoint(0.5,0.5);
        _animateNode.addChild(sucAnim);
        var senderPos=_this.playerHeads[playerIdex].head.getPosition();
        _animateNode.setPosition(senderPos);
        var hitIndex = _this.mod_ttz.getchairbyuid(_senderObj.hitUid);
        var hitPos = _this.playerHeads[hitIndex].head.getPosition();
        this.node.addChild(_animateNode);
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
};
gameclass.goldtuitongzitable.prototype.robzhuang = function(uid,score) {
    var _this = this;
    var chair = _this.mod_ttz.getchairbyuid(uid);
    //cc.log(chair,uid,score)
    this.playerHeads[chair].rob_zhuang_img.setVisible(true);
    //this.playerHeads[chair].ptj_kuang.setVisible(true);
    this.playerHeads[chair].rob_zhuang_img.setTexture(res["callBet"+score]);
    this.playerHeads[chair].rob_zhuang_img.setScale(0);
    this.playerHeads[chair].rob_zhuang_img.runAction(cc.scaleTo(0.8,1,1).easing(cc.easeElasticOut()));
    _this.isrobzh[chair] = score;
    if(_this.curmaxscore < score)_this.curmaxscore = score;
    if(chair == 0) ccui.helper.seekWidgetByName(_this.node, "qzscore").setVisible(false);
};

//抢庄成功
gameclass.goldtuitongzitable.prototype.robzhuangsus = function(data) {
    var _this = this; var flag = false; var nobodyrob = 0;
    var uid = data.uid; var maxbets = data.bets-1;
    ccui.helper.seekWidgetByName(_this.node, "qzscore").setVisible(false);
    var showselectsbg = function () {
        flag = true;
        if(_this.game.modmgr.mod_login.logindata.uid == uid){
            ccui.helper.seekWidgetByName(_this.node, "selectscorebg").setVisible(false);
        }
        else{
            if(!_this.mod_ttz.isviewer){
                var selebg = ccui.helper.seekWidgetByName(_this.node, "selectscorebg");
                selebg.setVisible(true);
                for(var ss = 0; ss < 5; ss++){
                    if(ss <= maxbets){
                        ccui.helper.seekWidgetByName(selebg, "score"+ss).setVisible(true);
                    }else{
                        ccui.helper.seekWidgetByName(selebg, "score"+ss).setVisible(false);
                    }
                }
            }
        }
        for(var k = 0; k < _this.playerHeads.length; k++){
            //_this.playerHeads[k].ptj_kuang.setVisible(false);
            if(_this.playerHeads[k].uid == uid){
                //抢庄成功动画
                if(nobodyrob==0){
                    _this.playerHeads[k].rob_zhuang_img.setVisible(false);//无人抢
                }
                _this.playerHeads[k].zhuang.setVisible(true);
                _this.playerHeads[k].zhuang.setScale(6);
                _this.playerHeads[k].zhuang.runAction(cc.scaleTo(0.2,1));
                if(_this.mod_ttz.isviewer){
                    ccui.helper.seekWidgetByName(_this.node, "guanZhanImg").setVisible(true);
                    ccui.helper.seekWidgetByName(_this.node, "invitebtn").setVisible(true);
                }
            }else{
                if(nobodyrob==0){
                    _this.curmaxscore = 1;
                }
                _this.playerHeads[k].rob_zhuang_img.setVisible(false);
            }
        }
    }
    for(var i = 0; i < _this.isrobzh.length; i++){
        if(_this.curmaxscore == _this.isrobzh[i] && _this.curmaxscore > 0){
            nobodyrob += 1;
        }
    }
    if(nobodyrob==0){
        _this.isrobzh = [0,0,0,0,0];
    }
    for(var i = 0; i < _this.playerHeads.length; i++){
        if(_this.playerHeads[i].ishaves){
            if(_this.playerHeads[i].uid == uid) {
                _this.dearchair = i;
            }
            if(nobodyrob == 1){
                if(!flag) showselectsbg();
            }else{
                if(_this.isrobzh[i] == _this.curmaxscore) {
                    var seq = cc.sequence(cc.blink(1,4),cc.callFunc(function (){
                        if(!flag) showselectsbg();
                    }));
                    _this.playerHeads[i].ptj_kuang.runAction(seq);
                }
            }
        }
    }
};
gameclass.goldtuitongzitable.prototype.showgamebets = function(bets){
    var chair = this.mod_ttz.getchairbyuid(bets.uid);
    if(chair == 0) {
        ccui.helper.seekWidgetByName(this.node, "qzscore").setVisible(false);
        ccui.helper.seekWidgetByName(this.node, "selectscorebg").setVisible(false);
    }
    for(var i = 0; i < this.playerHeads.length; i++){
        if(this.playerHeads[i].uid == bets.uid){
            this.playerHeads[i].rob_zhuang_img.setVisible(true);
            this.playerHeads[i].rob_zhuang_img.setTexture(res["callScore"+bets.bets]);
            this.playerHeads[i].rob_zhuang_img.setScale(0);
            this.playerHeads[i].rob_zhuang_img.runAction(cc.scaleTo(0.8,1,1).easing(cc.easeElasticOut()));
            break;
        }
    }
}
/*
 * 开局前 玩家离开当前游戏
 * */
gameclass.goldtuitongzitable.prototype.userExitRoom = function(index){

    this.playerHeads[index].reset();
    this.playerHeads[index].setVisible(false);
};

gameclass.goldtuitongzitable.prototype.checkSafe = function(people){
    this.safeLayer.checkSafe(people);
};


gameclass.goldtuitongzitable.prototype.init = function(){

    this.node = this.game.uimgr.createnode(res.goldtuitongzitable,true);

    this.node.setPosition((cc.winSize.width - this.node.getContentSize().width)/2,0);

    this.addChild(this.node);

    var _this = this;
    this.talkPos = [cc.p(330,130),cc.p(1040,260),cc.p(1040,470),cc.p(140,470),cc.p(140,260)];

    //_this.game.uimgr.showui("gameclass.btn_setLayer");
    var btn_layer = new gameclass.btn_setLayer(_this.node,_this.game);
    this.node.addChild(btn_layer);
    var closeinfo = ccui.helper.seekWidgetByName(_this.node,"closeinfo");
    closeinfo.setLocalZOrder(1000);
    btn_layer.setLocalZOrder(999);

    this.safeLayer = new gameclass.checkSafeLayer(this.node,this.game,ccui.helper.seekWidgetByName(btn_layer,"btn_safe"));
    this.safeLayer.setName("safeLayer");
    this.node.addChild(this.safeLayer);

    var dianchi = ccui.helper.seekWidgetByName(this.node,"dianchi");
    dianchi.setPercent(gameclass.battery);

    _this._timeContain = ccui.helper.seekWidgetByName(_this.node,"daojisilay");
    _this._timerControl = new gameclass.timeTextControl(_this._timeContain, res.goldTimeBar);

    var ready = ccui.helper.seekWidgetByName(this.node, "ready");
    ready.setLocalZOrder(888);
    gameclass.createbtnpress(this.node, "ready", function () {
        _this.mod_ttz.gameready();
        _this.readytable();
        //ready.setTouchEnabled(false);
    });

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

    var change = ccui.helper.seekWidgetByName(this.node, "invitebtn");
    change.setLocalZOrder(888);
    gameclass.createbtnpress(this.node, "invitebtn", function () {
        _this.mod_ttz.roominfo.goldchang = true;
        _this.mod_ttz.dissmissroom();
    });
    gameclass.createbtnpress(this.node, "ttz_showpai", function () {
        _this.mod_ttz.gameview();
    });

    gameclass.createbtnpress(this.node, "chat", function () {
        _this.game.uimgr.showui("gameclass.chatuinew");
        _this.game.uimgr.uis["gameclass.chatuinew"].setmod(_this.mod_ttz);
    });

    gameclass.createbtnpress(this.node, "set", function () {
        _this.game.uimgr.showui("gameclass.settingui");
    });
    var showipinfo = function(sender,type){
        if(ccui.Widget.TOUCH_ENDED == type){
            //if(sender.index == 0) return;
            //var playerdata = _this.mod_ttz.getplayerdata(sender.index);
            var playerdata = _this.mod_ttz.persons[sender.index];
            _this.game.uimgr.showui("gameclass.chatMicLayer").setPlayerInfo(playerdata,_this.mod_ttz,sender.index);
        }
    }
    for(var i = 0; i < 5; i++)
    {
        var personobj = {};
        personobj.head = ccui.helper.seekWidgetByName(_this.node, "head"+i);
        personobj.head.setVisible(false);
        personobj.ok = ccui.helper.seekWidgetByName(personobj.head, "ok");
        personobj.ptj_kuang = ccui.helper.seekWidgetByName(personobj.head, "ptj_kuang");
        personobj.rob_zhuang_img = ccui.helper.seekWidgetByName(personobj.head, "rob_zhuang_img");
        personobj.playername = ccui.helper.seekWidgetByName(personobj.head, "playername");
        personobj.head_img = ccui.helper.seekWidgetByName(personobj.head, "icon");
        personobj.playerid = ccui.helper.seekWidgetByName(personobj.head, "playerid");
        personobj.playerscore = ccui.helper.seekWidgetByName(personobj.head, "playerscore");
        personobj.zhuang = ccui.helper.seekWidgetByName(personobj.head, "zhuang");
        personobj.uid_Text = ccui.helper.seekWidgetByName(personobj.head, "uid_Text");
        personobj.uip_Text = ccui.helper.seekWidgetByName(personobj.head, "uip_Text");
        personobj.address_Text = ccui.helper.seekWidgetByName(personobj.head, "address_Text");
        personobj.ccc = ccui.helper.seekWidgetByName(personobj.head, "ccc");
        personobj.off_line  = ccui.helper.seekWidgetByName(personobj.head, "off_line");
        personobj.off_line.setVisible(false);
        personobj.ishaves = false;
        personobj.head.index = i;
        this.playerHeads[i] = personobj;
        personobj.head.addTouchEventListener(showipinfo);
    }
    var qzbg = ccui.helper.seekWidgetByName(_this.node, "qzscore");
    qzbg.setVisible(false);
    var selebg = ccui.helper.seekWidgetByName(_this.node, "selectscorebg");
    selebg.setVisible(false);
    var qzbtnScore = function(sender,type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                //qzbg.setVisible(false);
                var str = sender.getName();
                var str1 = str.substring(5,6);
                _this.mod_ttz.gamedeal(parseInt(str1));
                if(parseInt(str1) == 0){
                    str1 = 100+22*5; //22号音效
                }
                else{
                    str1 = 100+23*5;
                }
                if(_this.game.modmgr.mod_login.logindata.sex == 2)
                    mod_sound.playeffect(g_music["ttz_womansd_"+str1]);
                else
                    mod_sound.playeffect(g_music["ttz_mansd_"+str1]);
                break;
        }
    }
    var selectScore = function(sender,type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                    //selebg.setVisible(false);
                    var str = sender.getName();
                    var str1 = str.substring(5,6);
                    //ccui.helper.seekWidgetByName(_this.node, "ttz_waiting").setVisible(true);
                    var score = parseInt(str1)+1;
                    _this.mod_ttz.sendselectscore(score);
                    if(_this.game.modmgr.mod_login.logindata.sex == 2)
                        mod_sound.playeffect(g_music.Woman_jiabei);
                    else
                        mod_sound.playeffect(g_music.Man_jiabei);
                break;
        }
    }

    for(var ii = 0; ii < 5; ii++) {
        var scorebtn = ccui.helper.seekWidgetByName(selebg, "score"+ii);
        scorebtn.addTouchEventListener(selectScore);
        var qzbtn = ccui.helper.seekWidgetByName(qzbg, "score"+ii);
        qzbtn.addTouchEventListener(qzbtnScore);
    }
};
//刷新金币
gameclass.goldtuitongzitable.prototype.refreshgold = function(msgdata) {
    for(var i=0; i < msgdata.info.length; i++){
        var chair = this.mod_ttz.getchairbyuid(msgdata.info[i].uid);
        this.playerHeads[chair].playerscore.setString(""+gameclass.changeShow(msgdata.info[i].total));
    }
    ccui.helper.seekWidgetByName(this.node,"usegoldnum").setVisible(false);
}
gameclass.goldtuitongzitable.prototype.updatePlayerinfo = function(bool){
    var persons = this.mod_ttz.persons;
    //cc.log(persons);
    if(!persons) return;
    for(var i = 0; i < persons.length; i++){
        if(persons[i]){
            if (persons[i].ready && i == 0)
                ccui.helper.seekWidgetByName(this.node, "ready").setVisible(false);
            this.playerHeads[i].playername.setString(persons[i].name);
            //this.playerHeads[i].playerid.setString("ID:"+persons[i].uid);
            if(bool && persons[i].score) this.playerHeads[i].playerscore.setString(persons[i].score);
            this.playerHeads[i].uid = persons[i].uid;
            this.playerHeads[i].uid_Text.setString("ID:"+persons[i].uid);
            this.playerHeads[i].uip_Text.setString("IP:"+persons[i].ip);
            this.playerHeads[i].address_Text.setString("地址:"+persons[i].address);
            this.playerHeads[i].head.setVisible(true);
            this.playerHeads[i].ishaves = true;
            if(bool){
                var score = persons[i].score;
                if (!score) score = 0;
                this.playerHeads[i].playerscore.setString(""+gameclass.changeShow(score));
                this.playerHeads[i].zhuang.setVisible(persons[i].dealer);
                if(persons[i].dealer) {
                    this.dearchair = i;
                }
            }
            this.playerHeads[i].head_url = persons[i].imgurl || "";
            gameclass.mod_base.showtximg(this.playerHeads[i].head_img, persons[i].imgurl, 0, 0 ,null,!persons[i].line);
            this.playerHeads[i].off_line.setVisible(!persons[i].line);
        }
        else{
            this.playerHeads[i].head.setVisible(false);
            this.playerHeads[i].ishaves = false;
        }
    }
};
gameclass.goldtuitongzitable.prototype.showReady = function(index){

    this.playerHeads[index].ok.setVisible(true);
    if(index == 0){
        ccui.helper.seekWidgetByName(this.node,"ready").setVisible(false);
    }
};
gameclass.goldtuitongzitable.prototype.update = function(){
    this._timerControl.update();
    if(this._timerControl._count<0){
        this.unscheduleUpdate();
    }
}
//倒计时
gameclass.goldtuitongzitable.prototype.setshowdaojishi = function (time) {
    this.unscheduleUpdate();
    this.scheduleUpdate();
    var bool = true;
    this._timerControl.startCount(time);
    var wenzitishi = ccui.helper.seekWidgetByName(this._timeContain,"wenzitishi");
    var stateImg = res.niuniuState0; // 等待中
    if(this.mod_ttz.gamestate == 1){
        if(this.isduijubegin) bool = false;//正在播放对局动画中
        stateImg = res.niuniuState1; //抢庄中
    }else if(this.mod_ttz.gamestate == 2){
        stateImg = res.niuniuState2;//下注中
    }else if(this.mod_ttz.gamestate == 3){
        stateImg = res.niuniuState3;//拼牌中
    }
    if(this.mod_ttz.isviewer && this.mod_ttz.gamestate == 2)
    {
        if(this.jishu == 0){
            this.jishu = 1;
        }else if(this.jishu == 1){
            this.jishu = 0;
            stateImg = res.niuniuState3;//拼牌中
        }
    }
    wenzitishi.setTexture(stateImg);
    this._timeContain.setVisible(bool);
};
//添加桌牌
gameclass.goldtuitongzitable.prototype.addCards = function () {
    var nodebg = ccui.helper.seekWidgetByName(this.node, "Node_5");
    var firstpx = nodebg.getPositionX();
    var firstpy = nodebg.getPositionY();
    var index = 0;
    this.doublecards = [];
    for(var i = 0 ; i < 20; i++) {
        var posx = 0; var posy = firstpy;
        this.nodebgArr[i] = this.createCard(-1, false);

        if(i%2 == 0)
        {
            posy = -22 + firstpy;
            this.nodebgArr[i].setPositionY(-22);
            this.doublecards[index] = new cc.Sprite();
            this.doublecards[index].addChild(this.nodebgArr[i]);
			this.doublecards[index].setLocalZOrder(9);
        }
        else{
            posx = (i-1)/2 * 71 * 0.8 + firstpx;
            this.doublecards[index].addChild(this.nodebgArr[i]);
            this.usedcard = index;
            this.doublecards[index].setPosition(posx,firstpy);
            var _node = ccui.helper.seekWidgetByName(this.node, "BG");
            _node.addChild(this.doublecards[index]);
			this.doublecards[index].setLocalZOrder(9);
            index += 1;
        }
    }
}
/*
 * 创建牌
 * */
gameclass.goldtuitongzitable.prototype.createCard = function(card,up) {
    var cardSprite;
    if(up){
        cardSprite = new cc.Sprite(res.ttz_bg_frontcard);
    }
    else{
        cardSprite = new cc.Sprite(res.ttz_bg_backcard);
    }

    var cardchild = new cc.Sprite();
    if(card > 0){
        var strname = "ttz_card_"+card;
        cardchild.setTexture(res[strname])
    }
    cardchild.setTag(1);
    cardchild.setAnchorPoint(0,0);
    cardchild.setPositionY(15);
    cardSprite.addChild(cardchild);
    cardSprite.setScale(0.8);
    return cardSprite;
};
//bool=true不是断线重连
gameclass.goldtuitongzitable.prototype.showtouzi = function(msgdata,bool){
    var _this = this;

    for(var i = 0; i < 5; i++){
        _this.playerHeads[i].ok.setVisible(false);
    }
    _this.chaircard = [-1,-1,-1,-1,-1];
    if(bool) {
        ccui.helper.seekWidgetByName(_this.node,"invitebtn").setVisible(false);
        ccui.helper.seekWidgetByName(_this.node,"ready").setVisible(false);
        _this.isduijubegin = true;
        _this._timeContain.setVisible(false);
        var sucAnim = new sp.SkeletonAnimation(res.duijukaishi_j, res.duijukaishi_a);
        sucAnim.setAnimation(89, 'animation', false);
        sucAnim.setAnchorPoint(0.5, 0.5);
        sucAnim.setPosition(1136 / 2, 320);
        _this.node.addChild(sucAnim);
        var seq = cc.sequence(cc.delayTime(1.5), cc.callFunc(function () {
            _this.isduijubegin = true;
            _this._timeContain.setVisible(true);
            _this.dealCard(msgdata,bool);
            _this.touziFunc(msgdata.sz);
        }));
        _this.node.runAction(seq);
    }else {
        if(msgdata.begin){
            ccui.helper.seekWidgetByName(_this.node,"invitebtn").setVisible(false);
            ccui.helper.seekWidgetByName(_this.node,"ready").setVisible(false);
            ccui.helper.seekWidgetByName(_this.node,"usegoldnum").setVisible(false);
            if(_this.mod_ttz.isviewer){
                ccui.helper.seekWidgetByName(_this.node, "guanZhanImg").setVisible(true);
                ccui.helper.seekWidgetByName(_this.node, "invitebtn").setVisible(true);
            }
            _this.readytable();
            _this.dealCard(msgdata,bool);
            _this.cardRunaction(_this.mod_ttz.beginchair,0,false);
            var len = msgdata.info.length;
            var robdealer = false;
            for(var i = 0; i < len; i++){
                if(msgdata.info[i].dealer){
                    robdealer = true;
                    var cha = _this.mod_ttz.getchairbyuid(msgdata.info[i].uid);
                    _this.playerHeads[cha].zhuang.setVisible(true);
                    _this.playerHeads[cha].rob_zhuang_img.setVisible(true);
                    _this.playerHeads[cha].rob_zhuang_img.setTexture(res["callBet"+msgdata.info[i].robdeal]);
                    break;
                }
            }
            if(robdealer){
                //亮牌,下注
                var isshowpai = false; var xiabetcount = 0;
                for(var i = 0; i < len; i++){
                    if(msgdata.info[i].view){
                        isshowpai = true;
                        break;
                    }
                    if(!msgdata.info[i].dealer && msgdata.info[i].bets > 0){
                        xiabetcount += 1;
                        if(xiabetcount == len-1) isshowpai = true;
                    }
                }
                for(var i = 0; i < len; i++){
                    var cha = _this.mod_ttz.getchairbyuid(msgdata.info[i].uid);
                    if(isshowpai && !_this.mod_ttz.isviewer){
                        if( cha == 0 && !msgdata.info[i].view ){
                            _this.findAllcards(msgdata.info[i],false);
                            ccui.helper.seekWidgetByName(_this.node, "qzscore").setVisible(false);
                            ccui.helper.seekWidgetByName(_this.node, "selectscorebg").setVisible(false);
                            ccui.helper.seekWidgetByName(_this.node,"ttz_showpai").setVisible(true);
                        }else if(msgdata.info[i].view ){
                            _this.findAllcards(msgdata.info[i],true);
                        }
                    }
                    if(!msgdata.info[i].dealer){
                        if(msgdata.info[i].bets == 0){
                            if(!_this.mod_ttz.isviewer && cha == 0 && !isshowpai){
                                var selebg = ccui.helper.seekWidgetByName(_this.node, "selectscorebg");
                                selebg.setVisible(true);
                                var maxbets = 5;
                                if(msgdata.bets) maxbets = msgdata.bets;
                                for(var ss = 0; ss < 5; ss++){
                                    if(ss <= maxbets){
                                        ccui.helper.seekWidgetByName(selebg, "score"+ss).setVisible(true);
                                    }else{
                                        ccui.helper.seekWidgetByName(selebg, "score"+ss).setVisible(false);
                                    }
                                }
                            }
                        }
                        else{
                            if(_this.mod_ttz.isviewer && cha == 0){
                            }else{
                                _this.playerHeads[cha].rob_zhuang_img.setVisible(true);
                                _this.playerHeads[cha].rob_zhuang_img.setTexture(res["callScore"+msgdata.info[i].bets]);
                            }
                        }
                    }
                }
            }else{
                //抢庄阶段
                for(var i = 0; i < len; i++){
                    var chair = _this.mod_ttz.getchairbyuid(msgdata.info[i].uid);
                    if(msgdata.info[i].robdeal == -1){
                        if(!_this.mod_ttz.isviewer && chair == 0 && !isshowpai)
                            ccui.helper.seekWidgetByName(this.node,"qzscore").setVisible(true);
                    }else{
                        if(_this.mod_ttz.isviewer && chair == 0){
                        }else{
                            _this.playerHeads[chair].rob_zhuang_img.setVisible(true);
                            _this.playerHeads[chair].rob_zhuang_img.setTexture(res["callBet"+msgdata.info[i].robdeal]);
                        }
                    }
                }
            }
        }else{
            if(msgdata.card && msgdata.card.length > 0){
                //_this.dealCard(msgdata,bool);
                _this.lastcardArr = msgdata.card;
                _this.chaircard = [-1,-1,-1,-1,-1];
                _this.usedcard = 9;
                _this.addCards();
                _this.addnextable();
            }
        }
    }
}
gameclass.goldtuitongzitable.prototype.cardRunaction = function(chair,next,bool) {
    var _chair = chair; var _next = next;
    var _this = this;
    if(_next >= 5)
    {
        if(bool){
            if(_this.mod_ttz.getchairbyuid(_this.dealeruid) == 0){
                ccui.helper.seekWidgetByName(_this.node, "qzscore").setVisible(false);
            }
            else{
                ccui.helper.seekWidgetByName(_this.node, "qzscore").setVisible(true);
            }
        }
        return;
    }
    var nodebg = ccui.helper.seekWidgetByName(_this.node, "Node_"+_chair);
    var px = nodebg.getPositionX();
    var py = nodebg.getPositionY();
    var skipanim = function () {
        _this.doublecards[_this.usedcard].setPosition(cc.p(px,py));
        _this.nodebgArr[_this.usedcard*2].setPosition(cc.p(71*0.8,0));
        _this.chaircard[_chair] = _this.usedcard*2;
        _this.usedcard -= 1;
        _next += 1;
        _chair += 1;
        if(_chair >= 5) _chair = 0;
        _this.cardRunaction(_chair,_next,bool);
    }
    if(bool){
        mod_sound.playeffect(g_music.ttzdealsd);
        var act = cc.moveTo(0.1, cc.p(px,py));
        var seq = cc.sequence(act,cc.callFunc(function(){
            skipanim();
        }));
        _this.doublecards[_this.usedcard].runAction(seq);
    }else{
        skipanim();
    }
};

gameclass.goldtuitongzitable.prototype.touziFunc = function ( touzinums )
{
    var _this = this;
    var pox = cc.winSize.width/2;
    var poy = cc.winSize.height/2;
    cc.spriteFrameCache.addSpriteFrames(res.touziplist);
    var removeSprite = function()
    {
        var sprt1 = cc.Sprite.create();
        sprt1.initWithSpriteFrameName("touzi"+touzinums[0]+".png");
        sprt1.setPosition( cc.p(pox-70, poy) );
        var sprt2 = cc.Sprite.create();
        sprt2.initWithSpriteFrameName("touzi"+touzinums[1]+".png");
        sprt2.setPosition( cc.p(pox+10, poy) );
        _this.node.addChild(sprt1);
        _this.node.addChild(sprt2);
        sprt1.runAction(cc.sequence(cc.fadeOut(2), cc.callFunc(function () {
            _this.node.removeChild(sprt1);
            spineBoy.clearTrack(9);
            spineBoy.removeFromParent();
        })));
        sprt2.runAction(cc.sequence(cc.fadeOut(2), cc.callFunc(function () {
            _this.node.removeChild(sprt2);

            _this.cardRunaction(_this.mod_ttz.beginchair,0,true);
        })));
    };
    var spineBoy = new sp.SkeletonAnimation(res.tousaizi_json, res.tousaizi_skeleton);
    spineBoy.setAnimation(9, 'w', false);
    spineBoy.setEndListener(removeSprite);
    spineBoy.setPosition(cc.p(pox,poy));
    _this.node.addChild(spineBoy);
};
gameclass.goldtuitongzitable.prototype.readytable = function() {
    this._timeContain.setVisible(false);
    this.cleartable(false);
    if(this.mod_ttz.isoneover){
        if(this.lastcardArr && this.lastcardArr.length == 0){
            var len = this.usedcard + 1 +5;
            var nodebg = ccui.helper.seekWidgetByName(this.node, "Node_5");
            var firstpx = nodebg.getPositionX();
            var firstpy = nodebg.getPositionY() - 120;
            this.runbackcard(firstpx, firstpy, this.usedcard + 1, len);
        } else{
            this.cleartable(true);
        }
    }
    this.mod_ttz.isoneover = false;
};
//bool=true,不是断线重连
gameclass.goldtuitongzitable.prototype.dealCard = function(msgdata,bool) {
    this._timeContain.setVisible(true);
    this.lastcardArr = msgdata.card;
    if(this.lastcardArr && this.lastcardArr.length == 0){
        this.addCards();
    }else{
        if(!bool){
            this.chaircard = [-1,-1,-1,-1,-1];
            this.usedcard = 9;
            this.addCards();
            this.addnextable();
        }
    }
};
//添加用过的桌牌
gameclass.goldtuitongzitable.prototype.addnextable = function() {
    var _this = this;
    if(_this.lastcardArr.length > 0){
        var nodebg = ccui.helper.seekWidgetByName(_this.node, "Node_5");
        var firstpx = nodebg.getPositionX();
        var firstpy = nodebg.getPositionY()-120;
        for(var i = 0; i < _this.lastcardArr.length; i++){
            _this.nodebgArr[19-i].setTexture(res.ttz_bg_frontcard);
            var strname = "ttz_card_" + _this.lastcardArr[i];
            _this.nodebgArr[19-i].getChildByTag(1).setTexture(res[strname]);
            if(i%2 == 1) {
                _this.nodebgArr[19-i].setPosition(cc.p(71*0.8,0));
                _this.doublecards[_this.usedcard].setPosition(firstpx+71*0.8*(i-1),firstpy);
                _this.usedcard -= 1;
            }
        }
    }
};
//单局结算
gameclass.goldtuitongzitable.prototype.resultOnend = function(msgdata) {
    var _this = this;
    _this.spineAni = null;
    ccui.helper.seekWidgetByName(_this.node, "qzscore").setVisible(false);
    ccui.helper.seekWidgetByName(_this.node, "selectscorebg").setVisible(false);
    ccui.helper.seekWidgetByName(_this.node,"ttz_showpai").setVisible(false);
    if(!msgdata.info) return;
    _this.endinfo = msgdata; var len = msgdata.info.length;
    _this.refreshgold(_this.endinfo);
    var dearct = 0; var minct = 0; var maxct = 0;
    var dearPos = cc.p(0,0); var myselfscore = 0;
    //显示无人 位置桌牌
    var lastindex = 0;
    for(var i = 0; i < _this.playerHeads.length; i++) {
        if(!_this.playerHeads[i].ishaves || (i==0 && _this.mod_ttz.isviewer)){
            var ii = _this.chaircard[i];
            _this.showhandcard(_this.endinfo.cache[lastindex], ii);
            _this.showhandcard(_this.endinfo.cache[lastindex+1], ii+1);
            lastindex += 2;
        }
    }
    //庄家是否通赔,通杀
    for(var i = 0 ; i < _this.endinfo.info.length; i++){
        if(_this.endinfo.info[i].dealer) {
            dearct = _this.endinfo.info[i].ct;
            var chair1 = _this.mod_ttz.getchairbyuid(_this.endinfo.info[i].uid);
            dearPos = _this.playerHeads[chair1].head.getPosition();
        }else {
            if(_this.endinfo.info[i].score > 0){
                maxct += 1;
            }else if(_this.endinfo.info[i].score < 0){
                minct += 1;
            }
        }
    }
    for(var i = 0 ; i < _this.endinfo.info.length; i++){
        var chair = _this.mod_ttz.getchairbyuid(msgdata.info[i].uid);
        var fenPos = _this.playerHeads[chair].head_img.getPosition();

        gameclass.showYSText(msgdata.info[i].score,fenPos,_this.playerHeads[chair].head);//飘字

        if(chair == 0)
            myselfscore = _this.endinfo.info[i].score;
        //飞金币
        if(!_this.endinfo.info[i].dealer){
            var playerPos = _this.playerHeads[chair].head.getPosition();
            if(dearct >= _this.endinfo.info[i].ct){
                var _sp=new goldSpLayer(res.niuniuAnimateGold,8,0.5,0.1,dearPos,playerPos);
                _this.node.addChild(_sp);
            }
            else if(dearct < _this.endinfo.info[i].ct){
                var _sp=new goldSpLayer(res.niuniuAnimateGold,8,0.5,0.1,playerPos,dearPos);
                _this.node.addChild(_sp);
            }
        }
    }
    if(maxct == len-1){
        _this.addAnimationEffect(res.ebgendAnim2json, res.ebgendAnim2atlas);
    }
    else if(minct == len-1){
        _this.addAnimationEffect(res.ebgendAnim1json, res.ebgendAnim1atlas);
    }
    var seq = cc.sequence(cc.delayTime(2), cc.callFunc(function () {
        if(_this.spineAni){
            _this.spineAni.clearTrack(28);
            _this.spineAni.removeFromParent();
            _this.spineAni = null;
        }
        _this.playerEndAnim(myselfscore);
    }));
    _this.node.runAction(seq);
};
gameclass.goldtuitongzitable.prototype.playerEndAnim = function(_score){
    var sucAnim = null;
    var _this = this;
    var removeSprite = function () {
        ccui.helper.seekWidgetByName(_this.node, "invitebtn").setVisible(true);
        ccui.helper.seekWidgetByName(_this.node, "ready").setVisible(true);
        ccui.helper.seekWidgetByName(_this.node, "guanZhanImg").setVisible(false);
        _this._timeContain.setVisible(true);
        if(sucAnim){
            sucAnim.clearTrack(99);
            sucAnim.removeFromParent(true);
        }
    }
    if(_score == 0) {
        removeSprite()
        return;
    }
    if(_score < 0){
        sucAnim = new sp.SkeletonAnimation(res.spineFail_j, res.spineFail_a);
        mod_sound.playeffect(g_music["loseMusic"]);
    }else{
        sucAnim = new sp.SkeletonAnimation(res.spineWin_j, res.spineWin_a);
        mod_sound.playeffect(g_music["winMusic"]);
    }
    sucAnim.setAnimation(99, 'animation', false);
    sucAnim.setAnchorPoint(0.5, 0.5);
    sucAnim.setPosition(1136/2,440);
    _this.node.addChild(sucAnim);
    _this._timeContain.setVisible(false);
    var seq = cc.sequence(cc.delayTime(3),cc.callFunc(function(){
        removeSprite();
    }));
    _this.node.runAction(seq);
};

//
gameclass.goldtuitongzitable.prototype.showmycard = function(info) {
    ccui.helper.seekWidgetByName(this.node, "qzscore").setVisible(false);
    ccui.helper.seekWidgetByName(this.node, "selectscorebg").setVisible(false);
    ccui.helper.seekWidgetByName(this.node,"ttz_showpai").setVisible(true);
    var chair = this.mod_ttz.getchairbyuid(this.game.modmgr.mod_login.logindata.uid);
    var ii = this.chaircard[chair];
    this.showhandcard(info.card[0],ii);
    this.showhandcard(info.card[1],ii+1);
}
//显示玩家或者自己的
gameclass.goldtuitongzitable.prototype.findAllcards = function(info,bool) {
    var _this = this;
    var chair = _this.mod_ttz.getchairbyuid(info.uid);
    if(chair == 0)ccui.helper.seekWidgetByName(_this.node,"ttz_showpai").setVisible(false);
    var ii = _this.chaircard[chair];
    _this.showhandcard(info.card[0],ii);
    _this.showhandcard(info.card[1],ii+1);
    //显示点数
    if(bool){
        var soundnum = _this.showdiannum(chair,info.card[0],info.card[1]);
        //if(chair == 0){
            if(_this.game.modmgr.mod_login.logindata.sex == 2)
                mod_sound.playeffect(g_music["ttz_womansd_"+soundnum]);
            else
                mod_sound.playeffect(g_music["ttz_mansd_"+soundnum]);
        //}
    }
};

gameclass.goldtuitongzitable.prototype.showhandcard = function(cardsnum,ii) {

    if(this.nodebgArr[ii]) {
        this.nodebgArr[ii].setTexture(res.ttz_bg_frontcard);
        var strname = "ttz_card_"+cardsnum;
        this.nodebgArr[ii].getChildByTag(1).setTexture(res[strname]);
    }
};

gameclass.goldtuitongzitable.prototype.showdiannum = function(chair,cardnum1,cardnum2) {
    var cardchild = new cc.Sprite();
    var soundnum = 0;  var respath = "";
    if(cardnum1 == cardnum2){
        if(cardnum1 == 37){
            respath = res.ttz_stzz;
            soundnum = 100+1*5;
        }
        else{
            respath = res.ttz_baozi;
            soundnum = 100+21*5;
        }
    }
    else{
        var tts = cardnum1 + cardnum2;
        var strname = "";
        if(tts == 30){
            if(cardnum1 == 12 || cardnum2 == 12){
                respath = res.ttz_ebg;
                soundnum = 100+20*5;
            }else{
                respath = res.ttz_nod;
                soundnum = 100;
            }
        }
        else if(tts >= 48) {
            tts = (tts-37-10)*10+5;
            strname = "ttz_img"+tts;
            respath = res[strname];
            soundnum = 100+tts;
        }
        else{
            if(tts < 30) tts = tts-20;
            else tts = tts-30;
            strname = "ttz_img"+tts*10;
            respath = res[strname];
            soundnum = 100+tts*10;
        }
    }
    cardchild.setTexture(respath);
    var nodebg = ccui.helper.seekWidgetByName(this.node, "Node_"+chair);
    cardchild.setPosition(cc.p(30,75));
    nodebg.addChild(cardchild);
    this.diansprArr.push(cardchild);
    return soundnum;
};
gameclass.goldtuitongzitable.prototype.runbackcard = function(px,py,doubind,len){
    var _this = this;
    var index = doubind;
    if(len == index) return;
    var firstpx = px;
    var firstpy = py;
    var callfunc = function () {
        firstpx += 71*0.8*2;
        index += 1;
        _this.runbackcard(firstpx,firstpy,index,len);
    }
    var act = cc.moveTo(0.1, cc.p(firstpx,firstpy));
    var seq = cc.sequence(act,cc.callFunc(function(){
        callfunc();
        }));
    if(_this.doublecards[index]) _this.doublecards[index].runAction(seq);

}
gameclass.goldtuitongzitable.prototype.cleartable = function(bool) {
    this.curmaxscore = 0;
    if(this.diansprArr) {
        for (var i = 0; i < this.diansprArr.length; i++) {
            this.diansprArr[i].removeFromParent();
        }
        this.diansprArr = [];
    }
    for(var i = 0 ; i < 5; i++){
        this.playerHeads[i].zhuang.setVisible(false);
        this.playerHeads[i].rob_zhuang_img.setVisible(false);
    }
    if(bool){
        if(this.nodebgArr) {
            for(var i = 0 ; i < this.nodebgArr.length; i++){
                this.nodebgArr[i].removeFromParent();
            }
        }
        this.nodebgArr = [];
        this.doublecards = [];
        this.usedcard = 0;
    }
};

gameclass.goldtuitongzitable.prototype.addAnimationEffect = function(nameJson,nameAtlas) {
    this.spineAni = new sp.SkeletonAnimation(nameJson,nameAtlas);
    this.spineAni.setPosition(cc.p(cc.winSize.width*0.5, cc.winSize.height*0.5));
    this.node.addChild(this.spineAni);
    this.spineAni.setAnimation(28, 'animation', false);
};

gameclass.goldtuitongzitable.prototype.userLineOut =  function(index,data){
    if(!this.playerHeads[index]){
        return;
    }
    if(data.line)
        this.playerHeads[index].off_line.setVisible(false);
    else
        this.playerHeads[index].off_line.setVisible(true);
    gameclass.mod_base.showtximg(this.playerHeads[index].head_img, this.playerHeads[index].head_url, 0, 0,"",!data.line);
};

