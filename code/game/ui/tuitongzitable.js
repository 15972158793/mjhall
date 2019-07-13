gameclass.tuitongzitable = gameclass.baseui.extend({
    node:null,
    mod_ttz:null,
    playerHeads:null,
    helpinfo_layout:null,
    curround:null,
    nodebgArr:null,
    doublecards:null,
    //tablecardnum:0,
    usedcard:0,
    myonecard:0,
    selectcardtype:0,
    dealeruid:0,
    chaircard:null,//对应座位号牌的下标
    diansprArr:null,
    lastcardArr:null,
    nextdata:null,
    ctor: function () {
        this._super();
        this.playerHeads = [];
        this.nodebgArr = [];
        this.doublecards = [];
        this.selectcardtype = 0;
        //this.tablecardnum = 20;
        this.nextdata = null;
    },
    show:function(){
        this.init();
    },
    setmod: function (_mod) {
        this.mod_ttz = _mod;
        this.mod_ttz.bindUI(this);
        var _this = this;
        if(window.wx) {
            _this.share();
        }
        //_this.resultOnend({});
    }
});

gameclass.tuitongzitable.prototype.onChat = function(index,data){
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
            //var spr = new cc.Sprite();
            //spr.initWithFile(g_face[index]);
            //
            //s9 = new ccui.Layout();
            //s9.setContentSize(spr.width + 30, spr.height + 20);
            //s9.setBackGroundImage(arr[playerIdex]);
            //s9.setBackGroundImageScale9Enabled(true);
            //spr.setPosition(0.5*s9.getContentSize().width,0.5*s9.getContentSize().height+5);
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

gameclass.tuitongzitable.prototype.setRoomInfo = function(dealeruid){
    var _this = this;
    _this.dealeruid = dealeruid;
    var data = _this.mod_ttz.roominfo;
    ccui.helper.seekWidgetByName(_this.node, "roomnum").setString("房间号:"+data.roomid);

    //this.playerHeads[i].playerscore.setString(persons[i].name);
    _this.curround = data.step;
    if (_this.curround > data.maxStep){
        _this.curround = data.maxStep;
    }
    ccui.helper.seekWidgetByName(_this.node, "curround").setString("局数:" + _this.curround + "/" + data.maxStep);

    _this.mod_ttz.roominfo.step = _this.curround;
};

/*
 * 开局前 玩家离开当前游戏
 * */
gameclass.tuitongzitable.prototype.userExitRoom = function(index){

    this.playerHeads[index].reset();
    this.playerHeads[index].setVisible(false);
};
/*
 *  gameReady  游戏开始
 * */
//gameclass.tuitongzitable.prototype.gameReady = function(playerInfo,roominfo){
//    var _this = this;
//    ccui.helper.seekWidgetByName(_this.node,"invitebtn").setVisible(false);
//    ccui.helper.seekWidgetByName(_this.node,"ready").setVisible(true);
//};

/*微信邀请文字*/
gameclass.tuitongzitable.prototype.share = function(){
	var strinfo = "房号[" + this.mod_ttz.roominfo.roomid + "]，";
    if(this.mod_ttz.roominfo.bankerType == 0) strinfo += "轮庄，";
    else if(this.mod_ttz.roominfo.bankerType == 1) strinfo += "连庄，";
    else if(this.mod_ttz.roominfo.bankerType == 2) strinfo += "霸王庄，";
    if(this.mod_ttz.roominfo.scoreType == 0) {
        strinfo += "每次选分，";
    }else{
        strinfo += "固定分数，";
        if( this.mod_ttz.roominfo.selcscore == 0 )
            strinfo += "3分，";
        else if( this.mod_ttz.roominfo.selcscore == 1 )
            strinfo += "5分，";
        else if( this.mod_ttz.roominfo.selcscore == 2 )
            strinfo += "7分，";
    }
    strinfo += "一共[" + this.mod_ttz.roominfo.maxStep + "]局。大家都在等您，快来吧。";
	gameclass.mod_platform.invitefriend(strinfo,
        this.mod_ttz.roominfo.roomid,
        "傲世娱乐-" +  this.mod_ttz.roominfo.roomid +"-推筒子");
    // gameclass.mod_platform.invitefriend("房号[" + this.mod_ttz.roominfo.roomid + "]，一共[" + this.mod_ttz.roominfo.maxStep + "]局。大家都在等您，快来吧。",
        // this.mod_ttz.roominfo.roomid,
        // "聚游棋牌-" +  this.mod_ttz.roominfo.roomid +"-推筒子");
};

gameclass.tuitongzitable.prototype.checkSafe = function(people){
    this.safeLayer.checkSafe(people);
};


gameclass.tuitongzitable.prototype.init = function(){

    this.node = this.game.uimgr.createnode(res.tuitongzitable,true);

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

    var ready = ccui.helper.seekWidgetByName(this.node, "ready");
    ready.setTouchEnabled(true);
    gameclass.createbtnpress(this.node, "ready", function () {
        _this.mod_ttz.gameready();
        ready.setTouchEnabled(false);
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

    //gameclass.createbtnpress(this.node, "help", function () {
    //    _this.helpinfo_layout.setVisible(true);
    //});
    //
    //_this.helpinfo_layout.addTouchEventListener(function () {
    //    _this.helpinfo_layout.setVisible(false);
    //});

    gameclass.createbtnpress(this.node, "invitebtn", function () {
        _this.share();

        if(window.wx)
        {
            _this.sharelayer.setVisible(true);
        }
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

    var selebg = ccui.helper.seekWidgetByName(_this.node, "selectscorebg");
    selebg.setVisible(false);
    var selectScore = function(sender,type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                    selebg.setVisible(false);
                    var str = sender.getName();
                    var str1 = str.substring(5,6);
                    ccui.helper.seekWidgetByName(_this.node, "ttz_waiting").setVisible(true);
                    _this.mod_ttz.sendselectscore(parseInt(str1));
                break;
        }
    }

    for(var ii = 0; ii < 3; ii++) {
        var scorebtn = ccui.helper.seekWidgetByName(selebg, "score"+ii);
        scorebtn.setTouchEnabled(true);
        scorebtn.addTouchEventListener(selectScore);
    }
};

gameclass.tuitongzitable.prototype.updatePlayerinfo = function(bool){
    var persons = this.mod_ttz.persons;
    //cc.log(persons);
    for(var i = 0; i < persons.length; i++){
        if(persons[i]){
            var _ok = persons[i].ready;
            if(this.myonecard > 0) _ok = false;
            if(_ok){
                if(this.mod_ttz.getchairbyuid(persons[i].uid) == 0)
                    ccui.helper.seekWidgetByName(this.node,"ready").setVisible(false);
            }
            this.playerHeads[i].ok.setVisible(_ok);
            this.playerHeads[i].playername.setString(persons[i].name);
            //this.playerHeads[i].playerid.setString("ID:"+persons[i].uid);
            if(bool && persons[i].score) this.playerHeads[i].playerscore.setString(persons[i].score);
            this.playerHeads[i].zhuang.setVisible(false);
            this.playerHeads[i].uid_Text.setString("ID:"+persons[i].uid);
            this.playerHeads[i].uip_Text.setString("IP:"+persons[i].ip);
            this.playerHeads[i].address_Text.setString("地址:"+persons[i].address);
            this.playerHeads[i].head.setVisible(true);
            this.playerHeads[i].ishaves = true;

            this.playerHeads[i].head_url = persons[i].imgurl || "";
            gameclass.mod_base.showtximg(this.playerHeads[i].head_img, persons[i].imgurl, 0, 0 ,null,!persons[i].line);
            this.playerHeads[i].off_line.setVisible(!persons[i].line);
            if (this.dealeruid == persons[i].uid) this.playerHeads[i].zhuang.setVisible(true);
        }
        else{
            this.playerHeads[i].head.setVisible(false);
            this.playerHeads[i].ishaves = false;
        }
    }
};
gameclass.tuitongzitable.prototype.refreshStep = function() {
    var maxStep = this.mod_ttz.roominfo.maxStep;
    if (this.curround > maxStep){
        this.curround = maxStep;
    }
    this.mod_ttz.roominfo.step = this.curround;
    ccui.helper.seekWidgetByName(this.node, "curround").setString("局数:" + this.curround + "/" + maxStep);
};

gameclass.tuitongzitable.prototype.showReady = function(index){

    this.playerHeads[index].ok.setVisible(true);
    if(index == 0){
        ccui.helper.seekWidgetByName(this.node,"ready").setVisible(false);
    }
};

//添加桌牌
gameclass.tuitongzitable.prototype.addCards = function () {
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
            //this.nodebgArr[i].setPositionY(0);
            this.doublecards[index].addChild(this.nodebgArr[i]);
            this.usedcard = index;
            this.doublecards[index].setPosition(posx,firstpy);
            //this.node.addChild(this.doublecards[index]);
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
gameclass.tuitongzitable.prototype.createCard = function(card,up) {
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
gameclass.tuitongzitable.prototype.showtouzi = function(num){
    var self = this;
    ccui.helper.seekWidgetByName(self.node,"invitebtn").setVisible(false);
    ccui.helper.seekWidgetByName(self.node,"ready").setVisible(false);

    self.chaircard = [];
    for(var i = 0; i < 5; i++){
        this.playerHeads[i].ok.setVisible(false);
        self.chaircard.push(-1);
    }

    self.touziFunc(num);
}
gameclass.tuitongzitable.prototype.cardRunaction = function(chair,next) {
    var _chair = chair; var _next = next;
    var _this = this;
    if(_next >= 5)
    {
        if(_this.selectcardtype == 0) {
            //cc.log(_this.mod_ttz.getchairbyuid(_this.dealeruid),_this.dealeruid,_chair);
            if(_this.mod_ttz.getchairbyuid(_this.dealeruid) == 0){
                ccui.helper.seekWidgetByName(_this.node, "selectscorebg").setVisible(false);
                ccui.helper.seekWidgetByName(_this.node, "ttz_waiting").setVisible(true);
            }
            else{
                ccui.helper.seekWidgetByName(_this.node, "selectscorebg").setVisible(true);
            }
        }
        else{
            this.addAnimationEffect(res.ttz_kaipai,true);
        }
        return;
    }
    if(_this.playerHeads[_chair].ishaves)
    {
        var nodebg = ccui.helper.seekWidgetByName(_this.node, "Node_"+_chair);
        var px = nodebg.getPositionX();
        var py = nodebg.getPositionY();
        var act = cc.moveTo(0.3, cc.p(px,py));
        var seq = cc.sequence(act,cc.callFunc(function(){
            _this.nodebgArr[_this.usedcard*2].setPosition(cc.p(71*0.8,0));
            if(_chair == 0){
                _this.nodebgArr[_this.usedcard*2].setTexture(res.ttz_bg_frontcard);
                var strname = "ttz_card_"+_this.myonecard;
                _this.nodebgArr[_this.usedcard*2].getChildByTag(1).setTexture(res[strname]);
            }
            _this.chaircard[_chair] = _this.usedcard*2;
            //cc.log(_this.chaircard);
            _this.usedcard -= 1;
            _next += 1;
            _chair += 1;
            if(_chair >= 5) _chair = 0;
            _this.cardRunaction(_chair,_next);
        }));
        _this.doublecards[_this.usedcard].runAction(seq);
    }
    else{
        _next += 1;
        _chair += 1;
        if(_chair >= 5) _chair = 0;
        _this.cardRunaction(_chair,_next);
    }
};

gameclass.tuitongzitable.prototype.touziFunc = function ( touzinums )
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

            _this.cardRunaction(_this.mod_ttz.beginchair,0);
        })));
    };
    var spineBoy = new sp.SkeletonAnimation(res.tousaizi_json, res.tousaizi_skeleton);
    spineBoy.setAnimation(9, 'w', false);
    spineBoy.setEndListener(removeSprite);
    spineBoy.setPosition(cc.p(pox,poy));
    _this.node.addChild(spineBoy);
};

gameclass.tuitongzitable.prototype.dealCard = function(msgdata) {
    this.curround += 1;
    this.refreshStep();
    this.selectcardtype = msgdata.choicescore;
    for(var i = 0; i < msgdata.info.length; i++){
        if(msgdata.info[i].card && msgdata.info[i].card[0] > 0){
            this.myonecard = msgdata.info[i].card[0];
            break;
        }
    }
    this.lastcardArr = msgdata.lastcard;
    if(this.lastcardArr.length == 0){
        this.addCards();
    }
};
//单局结算
gameclass.tuitongzitable.prototype.resultOnend = function(msgdata) {

    ccui.helper.seekWidgetByName(this.node, "ttz_waiting").setVisible(false);
    this.endinfo = msgdata;
    if(this.selectcardtype == 0){
        this.addAnimationEffect(res.ttz_kaipai,true);
    }
    this.getNextdata(msgdata.info);
    if(this.curround%2 == 0){
        this.lastcardArr = [];
    }
}
gameclass.tuitongzitable.prototype.delayresultOnend = function() {
    var _this = this;
    var sprname = "";
    var deltime = 4;
    _this.findAllcards(_this.endinfo.info);
    var _data = _this.resultdata(this.endinfo);
    //_this.stopAllActions();
    if(_this.endinfo.winall){
        sprname = res.ttz_tongsha;
    }
    else if(_this.endinfo.loseall){
        sprname = res.ttz_tongpei;
    }
    if (sprname == ""){
        deltime = 2;
    }else{
        _this.addAnimationEffect(sprname,false);
    }
    //cc.log(sprname,deltime);
    var ani = cc.sequence(cc.delayTime(deltime),cc.callFunc(function(){
        _this.game.uimgr.showui("gameclass.ttzresultoneui").setmodttz(_data,_this.mod_ttz);
    }));
    _this.runAction(ani);
};

gameclass.tuitongzitable.prototype.resultdata = function(msgdata){
    var _data = msgdata;
    var _this = this;
    if(_data.info){
        for(var i=0; i < _data.info.length; i++){
            var per = _this.mod_ttz.getpersonbyuid(_data.info[i].uid);
            _data.info[i].name = per.name;
            var chair = _this.mod_ttz.getchairbyuid(_data.info[i].uid);
            _this.playerHeads[chair].playerscore.setString(_data.info[i].score);
        }
    }
    _data.roomid = _this.mod_ttz.roominfo.roomid;
    _data.dealeruid = _this.dealeruid;
    _data.step = _this.curround;
    _data.maxstep = _this.mod_ttz.roominfo.maxStep;
    return _data;
}

gameclass.tuitongzitable.prototype.findAllcards = function(infos) {
    var _this = this;
    var beginchair = _this.mod_ttz.beginchair;
    _this.diansprArr = [];
    var infosSort = [];
    //cc.log(infos);
    for(var i = 0; i < infos.length; i++)
    {
        var chair = _this.mod_ttz.getchairbyuid(infos[i].uid);
        var ii = _this.chaircard[chair];
        //cc.log(ii,chair);
        if(ii > 0){
            _this.showhandcard(infos[i].card[0],ii+1);
            _this.showhandcard(infos[i].card[1],ii);

            //显示点数
            _this.showdiannum(chair,infos[i].card[0],infos[i].card[1]);
        }else{
            //cc.log("出错了");
        }
    }
};

gameclass.tuitongzitable.prototype.showhandcard = function(cardsnum,ii) {

    if(this.nodebgArr[ii]) {
        this.nodebgArr[ii].setTexture(res.ttz_bg_frontcard);
        var strname = "ttz_card_"+cardsnum;
        this.nodebgArr[ii].getChildByTag(1).setTexture(res[strname]);
    }
};

gameclass.tuitongzitable.prototype.showdiannum = function(chair,cardnum1,cardnum2) {
    var cardchild = new cc.Sprite();
    var respath = "";
    if(cardnum1 == cardnum2){
        if(cardnum1 == 37){
            respath = res.ttz_stzz;
        }
        else{
            respath = res.ttz_baozi;
        }
    }
    else{
        var tts = cardnum1 + cardnum2;
        var strname = "";
        if(tts == 30){
            if(cardnum1 == 12 || cardnum2 == 12){
                respath = res.ttz_ebg;
            }else{
                respath = res.ttz_nod;
            }
        }
        else if(tts >= 48) {
            tts = (tts-37-10)*10+5;
            strname = "ttz_img"+tts;
            respath = res[strname];
        }
        else{
            if(tts < 30) tts = tts-20;
            else tts = tts-30;
            strname = "ttz_img"+tts*10;
            respath = res[strname];
        }
    }
    cardchild.setTexture(respath);
    var nodebg = ccui.helper.seekWidgetByName(this.node, "Node_"+chair);
    cardchild.setPosition(cc.p(30,75));
    nodebg.addChild(cardchild);
    this.diansprArr.push(cardchild);
};
gameclass.tuitongzitable.prototype.getNextdata = function(pinfo){
    if(pinfo.length > 0 ){
        this.lastcardArr = [];
        this.nextdata = [];
        for(var i = 0 ; i < pinfo.length; i++){
            this.lastcardArr.push(pinfo[i].card[0]);
            this.lastcardArr.push(pinfo[i].card[1]);
            //var deal = false;
            //if(dealer) deal = pinfo[i].deal;
            //else deal = pinfo[i].nextdeal;
            var info = {deal: pinfo[i].nextdeal,uid:pinfo[i].uid};
            this.nextdata.push(info);
        }
    }
}

gameclass.tuitongzitable.prototype.nextju = function() {
    var _this = this;
    var bool = false;
    if(this.nextdata) {
        if (_this.lastcardArr.length > 0) {
            bool = true;
            var len = _this.nextdata.length + _this.usedcard + 1;
            var nodebg = ccui.helper.seekWidgetByName(_this.node, "Node_5");
            var firstpx = nodebg.getPositionX();
            var firstpy = nodebg.getPositionY() - 120;
            _this.runbackcard(firstpx, firstpy, _this.usedcard + 1, len);
        }
        for (var i = 0; i < _this.nextdata.length; i++) {
            var cha = _this.mod_ttz.getchairbyuid(_this.nextdata[i].uid);
            if (_this.nextdata[i].deal) {
                _this.dealeruid = _this.nextdata[i].uid;
                _this.playerHeads[cha].zhuang.setVisible(true);
            } else {
                _this.playerHeads[cha].zhuang.setVisible(false);
            }
        }
    }
    _this.cleartable(bool);
};
gameclass.tuitongzitable.prototype.runbackcard = function(px,py,doubind,len){
    var _this = this;
    var index = doubind;
    if(len == index) return;
    var firstpx = px;
    var firstpy = py;
    var act = cc.moveTo(0.5, cc.p(firstpx,firstpy));
    var seq = cc.sequence(act,cc.callFunc(function(){
        firstpx += 71*0.8*2;
        index += 1;
        _this.runbackcard(firstpx,firstpy,index,len);
        }));
    _this.doublecards[index].runAction(seq);
}
gameclass.tuitongzitable.prototype.cleartable = function(bool) {
    this.nextdata = null;
    if(this.diansprArr) {
        for (var i = 0; i < this.diansprArr.length; i++) {
            this.diansprArr[i].removeFromParent();
        }
        this.diansprArr = [];
    }
    if(!bool){
        if(this.nodebgArr) {
            for(var i = 0 ; i < this.nodebgArr.length; i++){
                this.nodebgArr[i].removeFromParent();
            }
        }
        this.nodebgArr = [];
        this.doublecards = [];
        this.usedcard = 0;
    }

    this.refreshStep();
};

//偶数局添加桌牌
gameclass.tuitongzitable.prototype.addnextable = function() {
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
                _this.doublecards[_this.usedcard].setPosition(firstpx+71*0.8*(i-1),firstpx);
                _this.usedcard -= 1;
            }
        }
    }
};

gameclass.tuitongzitable.prototype.addAnimationEffect = function(sprname,bool) {
    var _this = this;
    var effetnode = ccui.helper.seekWidgetByName(_this.node, "ttz_effect");
    effetnode.setVisible(true);
    effetnode.setTexture(sprname);
    var ani = cc.sequence(cc.fadeIn(1),cc.fadeOut(1),cc.callFunc(function(){
        if(bool) _this.delayresultOnend();
    }));
    effetnode.runAction(ani);
}
//断线重连
gameclass.tuitongzitable.prototype.ongamebegin = function(msgdata) {
    var _this = this;

    if(this.curround > 0) ccui.helper.seekWidgetByName(_this.node,"invitebtn").setVisible(false);

    var infors = msgdata.info;

    _this.getNextdata(infors);

    _this.lastcardArr = msgdata.lastcard;

    var bool = false;
    var isready = true;
    if(msgdata.begin){
        this.mod_ttz.gamestate = 1;
        bool = true;
    }else {
        if(this.curround > 0){

            for(var i = 0; i < infors.length; i++) {
                var _chair = _this.mod_ttz.getchairbyuid(infors[i].uid);
                if(infors[i].nextdeal) _this.dealeruid = infors[i].uid;
                if(_chair == 0){
                    isready = infors[i].ready;
                    if(!isready) {
                        ccui.helper.seekWidgetByName(_this.node,"ready").setVisible(false);
                        var _data = _this.resultdata(msgdata);
                        _this.game.uimgr.showui("gameclass.ttzresultoneui").setmodttz(_data,_this.mod_ttz);
                        ccui.helper.seekWidgetByName(_this.node,"ready").setVisible(false);
                    }
                }
            }
            if(_this.lastcardArr.length > 0){
                bool = true;
            }
        }
    }

    if(bool){
        ccui.helper.seekWidgetByName(_this.node,"ready").setVisible(false);
        _this.chaircard = [-1,-1,-1,-1,-1];

        _this.addCards();

        _this.usedcard = 9;

        _this.addnextable();
        if(msgdata.begin){
            ccui.helper.seekWidgetByName(_this.node, "selectscorebg").setVisible(true);
            for(var i = 0; i < infors.length; i++) {
                var _chair = _this.mod_ttz.getchairbyuid(infors[i].uid);
                var nodebg = ccui.helper.seekWidgetByName(_this.node, "Node_" + _chair);
                var px = nodebg.getPositionX();
                var py = nodebg.getPositionY();
                _this.nodebgArr[_this.usedcard*2].setPosition(cc.p(71*0.8,0));

                if (_chair == 0) {
                    _this.myonecard = infors[i].card[0];
                    _this.nodebgArr[_this.usedcard*2].setTexture(res.ttz_bg_frontcard);
                    var strname = "ttz_card_" + _this.myonecard;
                    _this.nodebgArr[_this.usedcard*2].getChildByTag(1).setTexture(res[strname]);
                }
                //else{
                //    if(!isready){
                //
                //    }
                //}

                _this.chaircard[_chair] = _this.usedcard * 2;

                _this.doublecards[_this.usedcard].setPosition(px,py);

                _this.usedcard -= 1;

                if(infors[i].deal){
                    _this.dealeruid = infors[i].uid;
                    if(_this.mod_ttz.getchairbyuid(_this.dealeruid) == 0){
                        ccui.helper.seekWidgetByName(_this.node, "selectscorebg").setVisible(false);
                        ccui.helper.seekWidgetByName(_this.node, "ttz_waiting").setVisible(true);
                    }
                }
            }
        }
    }
};
gameclass.tuitongzitable.prototype.userLineOut =  function(index,data){
    //var index = index - this.mod_ttz.serverchair;
    //if(index < 0){
    //    index = index + 5;
    //}
    if(data.line)
        this.playerHeads[index].off_line.setVisible(false);
    else
        this.playerHeads[index].off_line.setVisible(true);
    gameclass.mod_base.showtximg(this.playerHeads[index].head_img, this.playerHeads[index].head_url, 0, 0,"",!data.line);
    //gameclass.mod_base.showtximg(this.playerHeads[index].head_img, data.imgurl, 0, 0 , null ,true);
};

