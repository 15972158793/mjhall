gameclass.pintianjiutable = gameclass.baseui.extend({
    node:null,
    mod_ptj:null,
    playerHeads:null,
    curround:null,
    nodebgArr:null,
    playercardindex:[],//对应玩家牌的下标（nodebgArr）
    myviewlist:null,
    xiadaocount:2,//最高次数k
    xiadaonum:0,//已下次数
    xiadaofen:0,//下道分数
    zhuangtype:0,
    tablecards:[],
    mycardsgroup:[],
    groupstable:[], //表
    sprmax:null,
    sprmin:null,
    isrobzh:null,
    dearchair:-1,
    ptjtype:0,//0表示大牌九，1表示小牌九
    remaincardposy:0,
    coinSprArr:null,
    ctor: function () {
        this._super();
        this.coinSprArr = [];
        this.playerHeads = [];
        this.nodebgArr = [];
        this.groupstable = [];
        this.playercardindex = [[],[],[],[]];
        this.isrobzh = [0,0,0,0];
        //this.teshugroup = [[12,8],[21,18],[1,13],[12,1],[1,1],[1,3],[1,14],[1,15],[2,2],[2,3],[1,14],[2,15],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9],[10,10],[11,11]];
        //this.allcardsnum = [0,12,2,8,4,10,6,4,11,10,7,6,9,9,8,8,7,7,6,5,5,3];
        this.talkPos = [cc.p(290,110),cc.p(1040,360),cc.p(840,500),cc.p(135,360)];
    },
    //_type=0大天九，1小天九
    setptjtype:function(){
        this.ptjtype = this.mod_ptj.roominfo.param1%10;
        this.remaincardposy = 70;
        if(this.ptjtype == 1) this.remaincardposy = 36;
        this.isbomb = this.mod_ptj.roominfo.param2%10;
        this.isdjnn = parseInt(this.mod_ptj.roominfo.param2/10)%10;
        this.isguizi = parseInt(this.mod_ptj.roominfo.param2/100)%10;
        this.istjw = parseInt(this.mod_ptj.roominfo.param2/1000)%10;
    },
    show:function(){
        if(this.groupstable.length == 0)
            this.getptjson();
        this.init();
    },
    setmod: function (_mod) {
        this.mod_ptj = _mod;
        this.mod_ptj.bindUI(this);
        var _this = this;
        if(window.wx) {
            _this.share();
        }
    }
});

gameclass.pintianjiutable.prototype.onChat = function(index,data){
    //this.playerHeads[index].showCart(data);
    var _this = this;
    for(var i = 0;i < g_chatstr.length; i++){
        if(g_chatstr[i] == data.chat){
            mod_sound.playeffect(g_music["fix_msg_" + (i+1)],false);
        }
    }
    //for (var i = 0;i < 5;i ++) {
    var playerIdex = _this.mod_ptj.getchairbyuid(data.uid);
    var playernode = _this.playerHeads[playerIdex].ccc;
    //if (player != null && player.uid == data.uid) {
    var talkPos = this.talkPos[playerIdex];
    var arr = [
        res.chatbg_ld,
        res.chatbg_rd,
        res.chatbg_ud,
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
        var _animateNode=new cc.Node();
        _animateNode.setScale(0.8);
        mod_sound.playeffect(g_music["magic"+_senderObj.type],false);
        _senderObj.type+=1;
        var sucAnim = new sp.SkeletonAnimation(g_magic_chat["magic_chat_"+_senderObj.type+"_1_json"], g_magic_chat["magic_chat_"+_senderObj.type+"_1_atlas"]);
        sucAnim.setAnimation(0, 'animation', false);
        sucAnim.setAnchorPoint(0.5,0.5);
        _animateNode.addChild(sucAnim);
        var senderPos=_this.playerHeads[playerIdex].head.getPosition();
        _animateNode.setPosition(senderPos);
        var hitIndex = _this.mod_ptj.getchairbyuid(_senderObj.hitUid);
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

gameclass.pintianjiutable.prototype.setRoomInfo = function(begin){
    var _this = this;
    var data = _this.mod_ptj.roominfo;
    ccui.helper.seekWidgetByName(_this.node, "roomnum").setString("房间号:"+data.roomid);

    //this.playerHeads[i].playerscore.setString(persons[i].name);
    _this.curround = data.step;
    if (_this.curround > data.maxStep){
        _this.curround = data.maxStep;
    }
    ccui.helper.seekWidgetByName(_this.node, "curround").setString("局数:" + _this.curround + "/" + data.maxStep);

    _this.setptjtype();

    _this.mod_ptj.roominfo.step = _this.curround;
    _this.xiadaonum = 0;
    _this.xiadaocount = 2;
    _this.xiadaofen = 0;
    if(parseInt(_this.mod_ptj.roominfo.param1/100)%10 == 1) _this.xiadaocount = 3;
    _this.zhuangtype =  parseInt(_this.mod_ptj.roominfo.param1 / 10) % 10;
    //cc.log(_this.xiadaocount,_this.mod_ptj.roominfo.param1);
    //for(var chair = 0 ; chair < 4; chair++){
    //    if(_this.playerHeads[chair].ishaves){
    //        var bets1 = "ptj_x2.png";
    //        _this.playerHeads[chair].selectbg0.setVisible(true);
    //        _this.playerHeads[chair].selectscore0.initWithSpriteFrameName(bets1);
    //        _this.playerHeads[chair].selectbg1.setVisible(true);
    //        _this.playerHeads[chair].selectscore1.initWithSpriteFrameName(bets1);
    //        if(_this.xiadaocount == 3) {
    //            _this.playerHeads[chair].selectbg2.setVisible(true);
    //            _this.playerHeads[chair].selectscore2.initWithSpriteFrameName(bets1);
    //        }
    //    }
    //}
    if(begin) {
        ccui.helper.seekWidgetByName(_this.node,"invitebtn").setVisible(false);
        ccui.helper.seekWidgetByName(_this.node,"ready").setVisible(false);
    }
};

/*
 * 开局前 玩家离开当前游戏
 * */
gameclass.pintianjiutable.prototype.userExitRoom = function(index){

    this.playerHeads[index].reset();
    this.playerHeads[index].setVisible(false);
};

/*微信邀请文字*/
gameclass.pintianjiutable.prototype.share = function(){
    var shareText = "";
    shareText += "房号[" + this.mod_ptj.roominfo.roomid + "],";
    if(this.mod_ptj.roominfo.param1%10 == 0) shareText += "大牌九,";
    else if(this.mod_ptj.roominfo.param1%10 == 1) shareText += "小牌九,";
    else if(this.mod_ptj.roominfo.param1%10 == 2) shareText += "加锅牌九,";

    if(parseInt(this.mod_ptj.roominfo.param1/100)%10 == 0) shareText += "两道杠,";
    else if(parseInt(this.mod_ptj.roominfo.param1/100)%10 == 1) shareText += "三道杠,";

    if(this.mod_ptj.roominfo.param2%10 == 1) shareText += "炸弹,";
    if(parseInt(this.mod_ptj.roominfo.param2/10)%10 == 1) shareText += "地九娘娘,";
    if(parseInt(this.mod_ptj.roominfo.param2/100)%10 == 1) shareText += "鬼子,";
    if(parseInt(this.mod_ptj.roominfo.param2/1000)%10 == 1) shareText += "天九王,";

    if(parseInt(this.mod_ptj.roominfo.param1/1000)%10 == 0) shareText += "每次选分,";
    else if(parseInt(this.mod_ptj.roominfo.param1 / 1000) %10 == 1) shareText += "固定选1分,";
    else if(parseInt(this.mod_ptj.roominfo.param1 / 1000) %10 == 2) shareText += "固定选2分,";
    else if(parseInt(this.mod_ptj.roominfo.param1 / 1000) %10 == 3) shareText += "固定选5分,";
    else if(parseInt(this.mod_ptj.roominfo.param1 / 1000) %10 == 4) shareText += "固定选8分,";
    else if(parseInt(this.mod_ptj.roominfo.param1 / 1000) %10 == 5) shareText += "固定选10分,";

    if(parseInt(this.mod_ptj.roominfo.param1/10)%10 == 0) shareText += "抢庄模式,";
    else if(parseInt(this.mod_ptj.roominfo.param1/10)%10 == 1) shareText += "轮庄模式,";
    else if(parseInt(this.mod_ptj.roominfo.param1/10)%10 == 2) shareText += "霸王庄,";

    shareText = shareText+ "一共" + this.mod_ptj.roominfo.maxStep + "局,";
    shareText += "大家都在等你,快来玩吧!";
    gameclass.mod_platform.invitefriend(
        shareText,
        this.mod_ptj.roominfo.roomid,
        "傲世娱乐-" +  this.mod_ptj.roominfo.roomid +"-拼天九");
};

gameclass.pintianjiutable.prototype.checkSafe = function(people){
    this.safeLayer.checkSafe(people);
};

gameclass.pintianjiutable.prototype.init = function(){

    this.node = this.game.uimgr.createnode(res.pintianjiutable,true);

    this.node.setPosition((cc.winSize.width - this.node.getContentSize().width)/2,0);

    this.addChild(this.node);

    cc.spriteFrameCache.addSpriteFrames(res.ptj_painumplist);

    var _this = this;
    //this.helpinfo_layout = ccui.helper.seekWidgetByName(_this.node, "closeinfo");
    //this.helpinfo_layout.setVisible(false);
    ccui.helper.seekWidgetByName(_this.node, "ready").setVisible(false);
    gameclass.createbtnpress(_this.node, "ready", function () {
        _this.mod_ptj.gameready();
    });
    _this._timeContain = ccui.helper.seekWidgetByName(_this.node,"daojisilay");
    _this._timerControl = new gameclass.timeTextControl(_this._timeContain, res.goldTimeBar);
    _this._timerControl.setishide(false);

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

    this.invitebtn = ccui.helper.seekWidgetByName(this.node,"invitebtn");

    gameclass.createbtnpress(this.node, "invitebtn", function () {
        _this.share();

        if(window.wx)
        {
            _this.sharelayer.setVisible(true);
        }
    });

    var selebg = ccui.helper.seekWidgetByName(_this.node, "selectscorebg");
    selebg.setVisible(false);

    //下注选分按钮
    var selectScore = function(sender,type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                _this.xiadaonum += 1;
                var str = sender.getName();
                var str1 = parseInt(str.substring(5,6)) + 1;
                if(str1 == 3) str1 = 5;
                else if(str1 == 4) str1 = 8;
                else if(str1 == 5) str1 = 10;
                if(_this.xiadaonum == 1){
                    _this.xiadaofen = str1;
                    ccui.helper.seekWidgetByName(_this.node, "showxiazhu2").setVisible(true);
                }
                else if(_this.xiadaonum == 2){
                    _this.xiadaofen += 100*str1;
                    if(_this.xiadaocount > 2) ccui.helper.seekWidgetByName(_this.node, "showxiazhu3").setVisible(true);
                }
                else if(_this.xiadaonum == 3){
                    _this.xiadaofen += 10000*str1;
                }

                var showxiazhu = ccui.helper.seekWidgetByName(_this.node, "showxiazhu"+_this.xiadaonum);
                showxiazhu.setVisible(false);
                //showxiazhu.setScaleY(0);
                //var act0 = cc.scaleTo(0.3,1,1.2);
                //var act1 = cc.scaleTo(0.1,1,1);
                //var act2 = cc.delayTime(0.3);
                //var act3 = cc.scaleTo(0.3,1,0);
                //var seq = cc.sequence(act0,act1,act2,act3, cc.callFunc(function () {
                //    showxiazhu.setVisible(false);
                //}));
                //showxiazhu.runAction(seq);

                if(_this.xiadaonum >= _this.xiadaocount){
                    _this.mod_ptj.sendselectscore(_this.xiadaofen);
                    _this.xiadaonum = 0;
                    _this.xiadaofen = 0;
                    selebg.setVisible(false);
                }
                mod_sound.playeffect(g_music["game_ptj_bet"], false);//下注
                break;
        }
    }

    for(var ii = 0; ii < 5; ii++) {
        var scorebtn = ccui.helper.seekWidgetByName(selebg, "score"+ii);
        scorebtn.setTouchEnabled(true);
        scorebtn.addTouchEventListener(selectScore);
    }

    var tishi = ccui.helper.seekWidgetByName(this.node, "ptj_tishi");
    tishi.setVisible(false);
    var ptj_showpai = ccui.helper.seekWidgetByName(this.node, "ptj_showpai");
    ptj_showpai.setVisible(false);
    gameclass.createbtnpress(this.node, "ptj_tishi", function () {
        _this.tishiselectgroup();
    });
    gameclass.createbtnpress(this.node, "ptj_showpai", function () {
        var viewcard = []; var viewcard1 = [];
        var count = 0;  var ischangpos = [0,0,0,0];

        if(_this.ptjtype == 1){
            for(var n = 0; n < _this.mycardsgroup.length; n++){
                viewcard.push(_this.mycardsgroup[n].cardnum);
                _this.mycardsgroup[n].cardnode.setTouchEnabled(false);
            }
            //_this.playsoundcard(viewcard,viewcard1);
            _this.kaipaiAnimation();
            return;
        }

        for(var n = 0; n < _this.mycardsgroup.length; n++){
            //ischangpos[n] = _this.mycardsgroup[n].cardnode;
            if(_this.mycardsgroup[n].flag) count += 1;
        }
        if(count >= 2) {
            _this.unscheduleUpdate();
            tishi.setVisible(false);
            ptj_showpai.setVisible(false);
            _this._timeContain.setVisible(false);
            viewcard = [];
            mod_sound.playeffect(g_music["game_ptj_kaicard"], false);
            for (var n = 0; n < _this.mycardsgroup.length; n++) {
                _this.mycardsgroup[n].cardnode.setTouchEnabled(false);
                if (_this.mycardsgroup[n].flag) {
                    viewcard.push(_this.mycardsgroup[n].cardnum);
                    var posy = _this.mycardsgroup[n].cardnode.getPositionY();
                    _this.mycardsgroup[n].cardnode.setPositionY(posy - 20);
                } else {
                    viewcard1.push(_this.mycardsgroup[n].cardnum);
                }
            }
            var getchangcard = function(max,min){
                _this.kaipainame(max,min);
                var tempmin = []; var tempmax = [];
                for(var kk = 0; kk < 2;kk++){
                    tempmin.push(min[kk]);
                    tempmax.push(max[kk]);
                }
                if(_this.mycardsgroup[0].cardnum == tempmin[0] || _this.mycardsgroup[0].cardnum == tempmin[1]){
                    ischangpos[0] = _this.mycardsgroup[0].cardnode;
                    if(_this.mycardsgroup[0].cardnum == tempmin[0]) tempmin[0] = 0;
                    else tempmin[1] = 0;
                }
                if(_this.mycardsgroup[1].cardnum == tempmin[0] || _this.mycardsgroup[1].cardnum == tempmin[1]){
                    ischangpos[1] = _this.mycardsgroup[1].cardnode;
                }
                if(_this.mycardsgroup[2].cardnum == tempmax[0] || _this.mycardsgroup[2].cardnum == tempmax[1]){
                    ischangpos[2] = _this.mycardsgroup[2].cardnode;
                    if(_this.mycardsgroup[2].cardnum == tempmax[0]) tempmax[0] = 0;
                    else  tempmax[1] = 0;
                }
                if(_this.mycardsgroup[3].cardnum == tempmax[0] || _this.mycardsgroup[3].cardnum == tempmax[1]){
                    ischangpos[3] = _this.mycardsgroup[3].cardnode;
                }
            }

            var change = _this.findmaxgroup(viewcard,viewcard1);
            if(change){
                getchangcard(viewcard1,viewcard);
                for (var m = 0; m < viewcard.length; m++) {
                    viewcard1.push(viewcard[m]);
                }
                _this.mod_ptj.sendview(viewcard1);

                _this.playsoundcard(viewcard1,viewcard);
            }else{
                getchangcard(viewcard,viewcard1);
                for (var m = 0; m < viewcard1.length; m++) {
                    viewcard.push(viewcard1[m]);
                }
                //cc.log(viewcard);
                _this.mod_ptj.sendview(viewcard);
                _this.playsoundcard(viewcard,viewcard1);
            }
            //cc.log(ischangpos);

            _this.sprmax.setVisible(false);
            _this.sprmin.setVisible(false);
            //自己开牌动画ischangpos[0] && ischangpos[1]小组合
            if(ischangpos[0] && ischangpos[1]){
                var tempos1 = ischangpos[0].getPosition();
                var tempos2 = ischangpos[1].getPosition();
                var act0 = null; var act1 = null;
                act0 = cc.moveTo(0.1,ischangpos[2].getPosition());
                act1 = cc.moveBy(0.1, cc.p(40,27));
                var seq = cc.sequence(act0, act1, cc.rotateTo(0.2, 90, 90), cc.callFunc(function () { }));
                ischangpos[0].runAction(seq);

                act0 = cc.moveTo(0.1,ischangpos[3].getPosition());
                act1 = cc.moveBy(0.1, cc.p(-20,-35));
                seq = cc.sequence(act0, act1, cc.rotateTo(0.2, 90, 90), cc.callFunc(function () { }));
                ischangpos[1].runAction(seq);

                act1 = cc.moveTo(0.2, tempos1);
                ischangpos[2].runAction(act1);
                act1 = cc.moveTo(0.2, tempos2);
                ischangpos[3].runAction(act1);

            } else if(ischangpos[0]){
                var tempos1 = ischangpos[0].getPosition();
                var act0 = null; var act1 = null;
                if(ischangpos[2]) {
                    act0 = cc.moveTo(0.1,ischangpos[2].getPosition());
                    act1 = cc.moveBy(0.1, cc.p(40,27));
                    var seq = cc.sequence(act0, act1, cc.rotateTo(0.2, 90, 90), cc.callFunc(function () { }));
                    ischangpos[0].runAction(seq);

                    act1 = cc.moveTo(0.2, tempos1);
                    ischangpos[2].runAction(act1);

                    act1 = cc.moveBy(0.1, cc.p(-20,-35));
                    seq = cc.sequence(act1, cc.rotateTo(0.2, 90, 90), cc.callFunc(function () { }));
                    _this.mycardsgroup[3].cardnode.runAction(seq);
                }
                if(ischangpos[3]) {
                    act0 = cc.moveTo(0.1,ischangpos[3].getPosition());
                    act1 = cc.moveBy(0.1, cc.p(-20,-35));
                    var seq = cc.sequence(act0, act1, cc.rotateTo(0.2, 90, 90), cc.callFunc(function () { }));
                    ischangpos[0].runAction(seq);

                    act1 = cc.moveTo(0.2, tempos1);
                    ischangpos[3].runAction(act1);

                    act1 = cc.moveBy(0.1, cc.p(40,27));
                    seq = cc.sequence(act1, cc.rotateTo(0.2, 90, 90), cc.callFunc(function () { }));
                    _this.mycardsgroup[2].cardnode.runAction(seq);
                }

            } else if(ischangpos[1]){
                var tempos2 = ischangpos[1].getPosition();
                var act0 = null; var act1 = null;
                if(ischangpos[2]) {
                    act0 = cc.moveTo(0.1,ischangpos[2].getPosition());
                    act1 = cc.moveBy(0.1, cc.p(40,27));
                    var seq = cc.sequence(act0, act1, cc.rotateTo(0.2, 90, 90), cc.callFunc(function () { }));
                    ischangpos[1].runAction(seq);

                    act1 = cc.moveTo(0.2, tempos2);
                    ischangpos[2].runAction(act1);

                    act1 = cc.moveBy(0.1, cc.p(-20,-35));
                    seq = cc.sequence(act1, cc.rotateTo(0.2, 90, 90), cc.callFunc(function () { }));

                    _this.mycardsgroup[3].cardnode.runAction(seq);
                }
                if(ischangpos[3]) {
                    act0 = cc.moveTo(0.1,ischangpos[3].getPosition());
                    act1 = cc.moveBy(0.1, cc.p(-20,-35));
                    var seq = cc.sequence(act0, act1, cc.rotateTo(0.2, 90, 90),cc.callFunc(function () { }));
                    ischangpos[1].runAction(seq);

                    act1 = cc.moveTo(0.2, tempos2);
                    ischangpos[3].runAction(act1);

                    act1 = cc.moveBy(0.2, cc.p(40,27));
                    seq = cc.sequence(act1, cc.rotateTo(0.2, 90, 90), cc.callFunc(function () { }));
                    _this.mycardsgroup[2].cardnode.runAction(seq);
                }
            }else{
                ischangpos = [];
                for(var e = 0; e < _this.mycardsgroup.length; e++){
                    ischangpos.push(_this.mycardsgroup[e].cardnode);
                }
                var seq = cc.sequence(cc.moveBy(0.1, cc.p(40,27)), cc.rotateTo(0.2, 90, 90), cc.callFunc(function () { }));
                ischangpos[2].runAction(seq);
                seq = cc.sequence(cc.moveBy(0.1, cc.p(-20,-35)), cc.rotateTo(0.2, 90, 90), cc.callFunc(function () { }));
                ischangpos[3].runAction(seq);
            }

        }
    });

    var buqiang = ccui.helper.seekWidgetByName(_this.node, "ptj_buqiangz");
    buqiang.setVisible(false);
    var qiang = ccui.helper.seekWidgetByName(_this.node, "ptj_qiangzh");
    qiang.setVisible(false);
    gameclass.createbtnpress(this.node, "ptj_buqiangz", function () {
        _this.mod_ptj.sendgamedeal(false);
        buqiang.setVisible(false);
        qiang.setVisible(false);
    });
    gameclass.createbtnpress(this.node, "ptj_qiangzh", function () {
        buqiang.setVisible(false);
        qiang.setVisible(false);
        _this.mod_ptj.sendgamedeal(true);
    });
    var showipinfo = function(sender,type){
        if(ccui.Widget.TOUCH_ENDED == type){
            //if(sender.index == 0) return;
            var playerdata = _this.mod_ptj.persons[sender.index];
            _this.game.uimgr.showui("gameclass.chatMicLayer").setPlayerInfo(playerdata,_this.mod_ptj,sender.index);
        }
    }
    for(var i = 0; i < 4; i++)
    {
        var personobj = {};
        personobj.head = ccui.helper.seekWidgetByName(_this.node, "head"+i);
        personobj.head.setVisible(false);
        personobj.ok = ccui.helper.seekWidgetByName(personobj.head, "ok");
        personobj.playername = ccui.helper.seekWidgetByName(personobj.head, "playername");
        personobj.head_img = ccui.helper.seekWidgetByName(personobj.head, "icon");
        personobj.playerid = ccui.helper.seekWidgetByName(personobj.head, "playerid");
        personobj.playerscore = ccui.helper.seekWidgetByName(personobj.head, "playerscore");
        personobj.playerscore.setString("0");
        personobj.zhuang = ccui.helper.seekWidgetByName(personobj.head, "zhuang");
        personobj.zhuang.setVisible(false);
        personobj.uid_Text = ccui.helper.seekWidgetByName(personobj.head, "uid_Text");
        personobj.uip_Text = ccui.helper.seekWidgetByName(personobj.head, "uip_Text");
        personobj.address_Text = ccui.helper.seekWidgetByName(personobj.head, "address_Text");
        personobj.selectbg0 = ccui.helper.seekWidgetByName(personobj.head, "selectbg_0");
        personobj.selectbg0.setVisible(false);
        personobj.selectscore0 = ccui.helper.seekWidgetByName(personobj.head, "selectscore_0");
        personobj.selectbg1 = ccui.helper.seekWidgetByName(personobj.head, "selectbg_1");
        personobj.selectbg1.setVisible(false);
        personobj.selectscore1 = ccui.helper.seekWidgetByName(personobj.head, "selectscore_1");
        personobj.selectbg2 = ccui.helper.seekWidgetByName(personobj.head, "selectbg_2");
        personobj.selectbg2.setVisible(false);
        personobj.selectscore2 = ccui.helper.seekWidgetByName(personobj.head, "selectscore_2");

        personobj.ptj_kuang = ccui.helper.seekWidgetByName(personobj.head, "ptj_kuang");
        personobj.ptj_win_lose = ccui.helper.seekWidgetByName(personobj.head, "ptj_win_lose");

        personobj.off_line  = ccui.helper.seekWidgetByName(personobj.head, "off_line");
        personobj.off_line.setVisible(false);

        personobj.ccc = ccui.helper.seekWidgetByName(personobj.head, "ccc");
        personobj.ishaves = false;
        personobj.uid = 0;
        this.playerHeads[i] = personobj;
        personobj.head.index = i;
        personobj.head.addTouchEventListener(showipinfo);
    }
};


gameclass.pintianjiutable.prototype.playsoundcard = function (smax1,smin2) {
    var _this = this;
    var soundmax = parseInt(_this.findtabelgroup(smax1).sound);
    //cc.log(smax1,soundmax);
    if(soundmax){
        if(_this.mod_ptj.mysex == 0)
            mod_sound.playeffect(resnameman[soundmax],false);
        else
            mod_sound.playeffect(resnamewoman[soundmax],false);
    }
    if(_this.ptjtype != 1){
        var soundmin = parseInt(_this.findtabelgroup(smin2).sound);
        if(soundmin){
            var seqsound = cc.sequence(cc.delayTime(1.5), cc.callFunc(function () {
                if(_this.mod_ptj.mysex == 0)
                    mod_sound.playeffect(resnameman[soundmin],false);
                else
                    mod_sound.playeffect(resnamewoman[soundmin],false);
            }));
            _this.node.runAction(seqsound);
        }
    }
};

gameclass.pintianjiutable.prototype.kaipainame = function(groupmax,groupmin) {

    var _this = this;
    var node0 = ccui.helper.seekWidgetByName(_this.node, "Node_0");
    var mygroupmaxname = _this.showgroupname(groupmax);
    var sprmaxname = ccui.helper.seekWidgetByName(node0, "sprmaxname");
    sprmaxname.setVisible(true);
    sprmaxname.initWithSpriteFrameName(mygroupmaxname+".png");
    if(groupmin.length > 0){
        var mygroupminname = _this.showgroupname(groupmin);
        var sprminname = ccui.helper.seekWidgetByName(node0, "sprminname");
        sprminname.setVisible(true);
        sprminname.initWithSpriteFrameName(mygroupminname+".png");
    }else{
        sprmaxname.setPositionX(90);
    }
};

gameclass.pintianjiutable.prototype.updatePlayerinfo = function(bool){
    var persons = this.mod_ptj.persons;
    //cc.log(this.playerHeads);
    for(var i = 0; i < persons.length; i++){
        if(persons[i]){
            //if (persons[i].ready && this.mod_ptj.getchairbyuid(persons[i].uid) == 0)
            if (persons[i].ready && i == 0)
                ccui.helper.seekWidgetByName(this.node, "ready").setVisible(false);
            //var _ok = persons[i].ready;
            //if(this.mod_ptj.gamestate == 1) _ok = false;
            //this.playerHeads[i].ok.setVisible(_ok);
            this.playerHeads[i].playername.setString(persons[i].name);
            //this.playerHeads[i].playerid.setString("ID:" + persons[i].uid);
            this.playerHeads[i].uid = persons[i].uid;
            this.playerHeads[i].uid_Text.setString("ID:" + persons[i].uid);
            this.playerHeads[i].uip_Text.setString("IP:" + persons[i].ip);
            this.playerHeads[i].address_Text.setString("地址:" + persons[i].address);
            this.playerHeads[i].head.setVisible(true);
            this.playerHeads[i].ishaves = true;
            this.playerHeads[i].head_url = persons[i].imgurl || "";
            if(bool){
                var score = persons[i].score;
                if (!score) score = 0;
                this.playerHeads[i].playerscore.setString(score);
                this.playerHeads[i].zhuang.setVisible(persons[i].deal);
                if(persons[i].deal) {
                    this.dearchair = i;
                    this.playerHeads[i].selectbg0.setVisible(false);
                    this.playerHeads[i].selectbg1.setVisible(false);
                    this.playerHeads[i].selectbg2.setVisible(false);
                }
            }
            gameclass.mod_base.showtximg(this.playerHeads[i].head_img, persons[i].imgurl, 0, 0 ,null,!persons[i].line);
            this.playerHeads[i].off_line.setVisible(!persons[i].line);
        }
        else{
            this.playerHeads[i].head.setVisible(false);
            this.playerHeads[i].ishaves = false;
        }
    }
};

//gameclass.pintianjiutable.prototype.userLineOut =  function(index,data){
//    gameclass.mod_base.showtximg(this.playerHeads[index].head_img, data.imgurl, 0, 0 , null ,true);
//};

gameclass.pintianjiutable.prototype.refreshStep = function() {
    var maxStep = this.mod_ptj.roominfo.maxStep;
    if (this.curround > maxStep){
        this.curround = maxStep;
    }
    this.mod_ptj.roominfo.step = this.curround;
    ccui.helper.seekWidgetByName(this.node, "curround").setString("局数:" + this.curround + "/" + maxStep);
};

gameclass.pintianjiutable.prototype.showReady = function(index){

    //this.playerHeads[index].ok.setVisible(true);
    if(index == 0){
        //ccui.helper.seekWidgetByName(this.node,"ready").setVisible(false);
        if(this.curround > 0) this.cleartable(false);
    }
};
gameclass.pintianjiutable.prototype.showreadybtn = function(){
    ccui.helper.seekWidgetByName(this.node,"ready").setVisible(true);
};

gameclass.pintianjiutable.prototype.onbegin = function(msgdata){
    if(msgdata.begin) {
        this.showtablecard(msgdata);
    }
};
//游戏开始（发牌）
gameclass.pintianjiutable.prototype.showtablecard = function(msgdata) {
    var _this = this;
    for(var i = 0; i < 4; i++){
        _this.playerHeads[i].ok.setVisible(false);
    }
    _this.tablecards = [];
    for(var i = 0; i < msgdata.card.length; i++){
        if(msgdata.card[i] > 0) _this.tablecards.push(msgdata.card[i]);
    }
    //cc.log(_this.tablecards)
    ccui.helper.seekWidgetByName(this.node,"invitebtn").setVisible(false);
    ccui.helper.seekWidgetByName(this.node,"ready").setVisible(false);
    var nodeAllcardbg = ccui.helper.seekWidgetByName(_this.node, "cardpanel");
    var remaincardbg = ccui.helper.seekWidgetByName(_this.node, "remaincardbg");
    remaincardbg.setScale(1);

    var node5 = ccui.helper.seekWidgetByName(_this.node, "Node_5");
    var ndpx = node5.getPositionX();
    var ndpy = node5.getPositionY();
    var playercount = 4;
    var cardcount = playercount*4;
    if(_this.ptjtype == 1) cardcount = playercount*2;
    //for(var i = 0; i < msgdata.card.length; i++){
    for(var i = 0; i < 32; i++){
        var cardspr = _this.createCard(0,true);
        cardspr.setScale(0.4);
        var posx = i%8 * 24 - 82 + ndpx;
        var posy = parseInt(i/8) * 62 - 68 + ndpy;
        cardspr.setPosition(posx,posy);
        if(_this.tablecards[i] > 0) {
            var strname = "ptj_dianimg_"+_this.tablecards[i]+".png";
            //var cardchild = new cc.Sprite();
            //cardchild.initWithSpriteFrameName(strname);
            var cardchild = new ccui.ImageView();
            cardchild.setAnchorPoint(cc.p(0,0));
            cardchild.loadTexture(strname,ccui.Widget.PLIST_TEXTURE);
            cardchild.setPosition(cc.p(6.5,9));
            cardspr.addChild(cardchild);
        }
        if(i < 32-cardcount) {
            remaincardbg.addChild(cardspr);
        }
        else{
            nodeAllcardbg.addChild(cardspr);
        }
        _this.nodebgArr.push(cardspr);
    }
    //this.cannons[0].convertToWorldSpaceAR(cc.p(0,0))
    var viewobjArr = []; var ishavedealer = false;
    var robdeal = false; var isbet = 0; var mydealer = false; var allisbets = false;
    for(var j = 0 ; j < msgdata.info.length; j++){
        var chair = _this.mod_ptj.getchairbyuid(msgdata.info[j].uid);
        _this.isrobzh[chair] = msgdata.info[j].robdeal;
        if(chair == 0)  {
            if(msgdata.info[j].robdeal > 0){
                robdeal = true;
            }
            isbet = msgdata.info[j].bets ;

            if(msgdata.info[j].card && msgdata.info[j].card.length > 0){
                allisbets = true;
                if(msgdata.info[j].card[0] > 0) _this.myviewlist = msgdata.info[j].card;//[2,13,3,10];//
            }
        }
        var viewobj = {
            uchair:chair,
            uview:msgdata.info[j].view,
            ucard:msgdata.info[j].card
        };
        viewobjArr.push(viewobj);

        if(msgdata.info[j].dealer){
            ishavedealer = true;
            for(var m = 0 ; m < 4; m++){
                if(this.playerHeads[m].uid == msgdata.info[j].uid){
                    this.playerHeads[m].zhuang.setVisible(true);
                    this.playerHeads[m].selectbg0.setVisible(false);
                    this.playerHeads[m].selectbg1.setVisible(false);
                    if(this.xiadaocount == 3)this.playerHeads[m].selectbg2.setVisible(false);
                    this.dearchair = m;
                    if(chair == 0) mydealer = true;
                }else{
                    this.playerHeads[m].zhuang.setVisible(false);
                    this.playerHeads[m].selectbg0.setVisible(true);
                    this.playerHeads[m].selectbg1.setVisible(true);
                    if(this.xiadaocount == 3)this.playerHeads[m].selectbg2.setVisible(true);
                }
            }
        }else{
            if(msgdata.info[j].bets > 0 ) _this.showbets(msgdata.info[j]);
        }
    }
    if(!allisbets) { //没下注,是否已抢庄啦
        var selectype = parseInt( parseInt(_this.mod_ptj.roominfo.param1)*0.001 );
        //cc.log(selectype);
        if (_this.zhuangtype == 0) {
            if (!robdeal && !ishavedealer) {
                ccui.helper.seekWidgetByName(_this.node, "ptj_buqiangz").setVisible(true);
                ccui.helper.seekWidgetByName(_this.node, "ptj_qiangzh").setVisible(true);
            }else{
                if(selectype == 0 && !mydealer && ishavedealer){
                    if (isbet == 0){
                        mod_sound.playeffect(g_music["game_ptj_pleasebet"], false);//请下注
                        ccui.helper.seekWidgetByName(_this.node, "selectscorebg").setVisible(true);
                        ccui.helper.seekWidgetByName(_this.node, "showxiazhu1").setVisible(true);
                    }
                }
            }
        }else{
            if (selectype == 0 && !mydealer) {
                if (isbet == 0){
                    mod_sound.playeffect(g_music["game_ptj_pleasebet"], false);//请下注
                    ccui.helper.seekWidgetByName(_this.node, "selectscorebg").setVisible(true);
                    ccui.helper.seekWidgetByName(_this.node, "showxiazhu1").setVisible(true);
                }
            }
        }
    }else{
        var dearc = _this.dearchair+(_this.mod_ptj.beginchair-1)%4;
        if(dearc >= 4) dearc = dearc-4;
        _this.cardRunaction(dearc,0,false,viewobjArr);
    }
};

/*
 * 创建
 * */
gameclass.pintianjiutable.prototype.createCard = function(card,up) {
    var cardImage;
    if(up){
        //cardImage = new cc.Sprite(res.ptj_cardshubg);
        cardImage = new ccui.ImageView(res.ptj_cardshubg);
        cardImage.setAnchorPoint(cc.p(0.5,0.5));
    }
    else{
        //cardImage = new cc.Sprite(res.ptj_cardhengbg);
        cardImage = new ccui.ImageView(res.ptj_cardhengbg);
        cardImage.setAnchorPoint(cc.p(0.5,0.5));
    }
    return cardImage;
};
gameclass.pintianjiutable.prototype.showtouzicard = function(msgdata){
    var self = this;
    self.tablecards = msgdata.view;
    self.myviewlist = msgdata.card;
    self.touziFunc(msgdata.sz);
    //cc.log(msgdata);
    mod_sound.playeffect(g_music["game_ptj_rocksezi"], false);//
};
//发牌以及动画
gameclass.pintianjiutable.prototype.cardRunaction = function(chair,next,isant,viewobj) {
    var Maxcard = 4; //每人发牌数量
    if(this.ptjtype == 1) Maxcard = 2;
    var _chair = chair; var _next = next;
    var _this = this;
    if(_next >= 4) {
        if(viewobj){
            //cc.log(viewobj);
            for(var tt = 0; tt < viewobj.length; tt++){
                if(viewobj[tt].uchair == 0){
                    if(viewobj[tt].uview){
                        var groupm1 = []; var groupm2 = [];
                        groupm1.push(viewobj[tt].ucard[0]);groupm1.push(viewobj[tt].ucard[1]);
                        if(_this.ptjtype != 1) {
                            groupm2.push(viewobj[tt].ucard[2]);
                            groupm2.push(viewobj[tt].ucard[3]);
                        }
                        _this.showgroupnameSpr(groupm1, groupm2,true);
                    }else{
                        if(_this.ptjtype == 1)
                            ccui.helper.seekWidgetByName(_this.node, "ptj_tishi").setVisible(false);
                        else
                            ccui.helper.seekWidgetByName(_this.node, "ptj_tishi").setVisible(true);

                        ccui.helper.seekWidgetByName(_this.node, "ptj_showpai").setVisible(true);
                        _this._timeContain.setVisible(true);
                        _this.scheduleUpdate();
                        _this._timerControl.startCount(16);
                    }
                }
            }
        }else{
            if(_this.ptjtype == 1)
                ccui.helper.seekWidgetByName(_this.node, "ptj_tishi").setVisible(false);
            else
                ccui.helper.seekWidgetByName(_this.node, "ptj_tishi").setVisible(true);

            ccui.helper.seekWidgetByName(_this.node, "ptj_showpai").setVisible(true);
            _this._timeContain.setVisible(true);
            _this.scheduleUpdate();
            _this._timerControl.startCount(16);
        }
        var remaincardbg = ccui.helper.seekWidgetByName(_this.node, "remaincardbg");
        var movebgx = remaincardbg.getPositionX();
        var movebgy = remaincardbg.getPositionY()+_this.remaincardposy;
        //cc.log(movebgy);
        if(isant){
            var act = cc.moveTo(0.2, cc.p(movebgx, movebgy));
            var act1 = cc.scaleTo(0.2, 1.3, 1.3);
            var seq = cc.sequence(act, act1,cc.callFunc(function () {
                //_this.fanpaiAnimation(_this.tablecards,16,isant);
            }));
            remaincardbg.runAction(seq);
        }else{
            remaincardbg.setPosition(cc.p(movebgx, movebgy));
            remaincardbg.setScale(1.3);
            //_this.fanpaiAnimation(_this.tablecards,16,isant);
        }
        return;
    }

    var nodebg = ccui.helper.seekWidgetByName(_this.node, "Node_"+_chair);
    var px = nodebg.getPositionX();
    var py = nodebg.getPositionY();
    var flag = false;
    for(var i = 0; i < Maxcard; i++) {
        var index = 31 - _next * Maxcard - i;
        _this.playercardindex[_chair].push(index);
        if(_chair == 0){
            _this.nodebgArr[index].setTag(1000+i);
            var obj = {
                cardnode:_this.nodebgArr[index],
                cardtag:1000+i,
                cardnum:0,
                flag:false,//是否被点起
                prechoose:0,//优先选择值
            }
            if(_this.ptjtype != 1 || (_this.ptjtype == 1 && i==0)){
                _this.nodebgArr[index].setTouchEnabled(true);
                _this.nodebgArr[index].addTouchEventListener(_this.selectgroup.bind(_this));
            }
            _this.mycardsgroup.push(obj);
        }
        var animation = function(){
            if (_chair == 0) {
                _this.fanpaiAnimation(_this.myviewlist,_next,isant);//翻开自己的牌
            }
            _next += 1;
            _chair += 1;
            if (_chair >= 4) _chair = 0;
            _this.cardRunaction(_chair, _next, isant, viewobj);
            mod_sound.playeffect(g_music["game_ptj_dealcard"], false);//
        }
        var ptjdaxposX = 0; var ptjdaxposY = py;
        if(_this.ptjtype == 1){
            if(_chair == 0){
                ptjdaxposX = px+0+90;
                ptjdaxposY = py+i*15;
            }else{
                if(_chair == 1)
                    ptjdaxposX = px+i*60+120;
                else if(_chair == 2)
                    ptjdaxposX = px+i*60+60;
                else
                    ptjdaxposX = px+i*60;
            }
        }else{
            ptjdaxposX = px+i*60;
        }
        if(isant){
            var act1 = cc.moveTo(0.2, cc.p(ptjdaxposX, ptjdaxposY));
            var act2 = cc.scaleTo(0.2, 1);
            var seq = cc.sequence(act1, cc.callFunc(function () {
                if(!flag) {
                    flag = true;
                    animation();
                }
            }));
            _this.nodebgArr[index].runAction(seq);
            _this.nodebgArr[index].runAction(act2);
        }else{
            _this.nodebgArr[index].setScale(1);
            _this.nodebgArr[index].setPosition(ptjdaxposX, ptjdaxposY);
            //var curchair = _this.mod_ptj.getchairbyuid();
            if(viewobj){
                for(var tt = 0; tt < viewobj.length; tt++){
                    if(viewobj[tt].uchair == _chair){
                        if(viewobj[tt].uview){
                            if(_chair == 0){
                                _this.nodebgArr[index].setTouchEnabled(false);
                            }
                            if(i == 2 || i == 3){
                                if(_chair == 1){
                                    var pnx = _this.nodebgArr[index+2].getPositionX();
                                    var pny = _this.nodebgArr[index+2].getPositionY();
                                    if(i == 2) _this.nodebgArr[index+2].setPosition(pnx+15,pny-33);
                                    if(i == 3) _this.nodebgArr[index+2].setPosition(pnx-45,pny+27);
                                    _this.nodebgArr[index+2].setRotation(-90);
                                }else{
                                    var pnx = _this.nodebgArr[index].getPositionX();
                                    var pny = _this.nodebgArr[index].getPositionY();
                                    if(i == 2) _this.nodebgArr[index].setPosition(pnx+40,pny+27);
                                    if(i == 3) _this.nodebgArr[index].setPosition(pnx-20,pny-35);
                                    _this.nodebgArr[index].setRotation(90);

                                }
                            }
                        }
                    }
                }
            }
            if(i == Maxcard-1) animation();
        }
    }
};
gameclass.pintianjiutable.prototype.update = function(){
    this._timerControl.update();
    if(this._timerControl._count<0){
        this.unscheduleUpdate();
    }
}
//小牌九开牌动画
gameclass.pintianjiutable.prototype.kaipaiAnimation = function() {
    var nodebg = ccui.helper.seekWidgetByName(this.node, "Node_0");
    ccui.helper.seekWidgetByName(this.node, "ptj_showpai").setVisible(false);
    this._timeContain.setVisible(false);
    this.unscheduleUpdate();
    var px = nodebg.getPositionX();
    var py = nodebg.getPositionY();
    var _this = this; var flag = false;
    var viewcard = [];
    for(var i = 0; i < this.mycardsgroup.length; i++){
        viewcard.push(this.mycardsgroup[i].cardnum);
        var ptjdaxposX = px+i*60+60;
        var act = cc.moveTo(0.2, cc.p(ptjdaxposX, py));
        var seq = cc.sequence(act, cc.callFunc(function () {
            if(!flag) {
                flag = true;
                _this.kaipainame(viewcard,[]);
                _this.mod_ptj.sendview(viewcard);
            }
        }));
        this.mycardsgroup[i].cardnode.runAction(seq);
    }
    this.playsoundcard(viewcard,[]);
};

//翻牌动画//显示牌值
gameclass.pintianjiutable.prototype.fanpaiAnimation = function ( viewcardsnum,nodebgArrindex,isant ){
    var _this = this;
    var len =  viewcardsnum.length;
    //cc.log(len)
    var flag = false;
    if(_this.ptjtype == 1) isant = false;
    for(var i = 0; i < len; i++){
        var animation = function(){
            if(!flag){
                flag = true;
                for(var j = 0; j < len; j++){
                    if(viewcardsnum[j] <= 0) continue;
                    var strname = "ptj_dianimg_"+viewcardsnum[j]+".png";
                    //var cardchild = new cc.Sprite();
                    //cardchild.initWithSpriteFrameName(strname);
                    var cardchild = new ccui.ImageView();
                    cardchild.setAnchorPoint(cc.p(0,0));
                    cardchild.loadTexture(strname,ccui.Widget.PLIST_TEXTURE);
                    var ind = 0;
                    if(nodebgArrindex == 16){
                        cardchild.setPosition(cc.p(5.5,6));
                        //cc.log(strname,viewcardsnum[j])
                        ind = j;
                    }else {
                        cardchild.setPosition(cc.p(6.5,9));
                        ind = 31 - nodebgArrindex * len - j;
                        for(var k = 0; k < len; k++){
                            if(_this.nodebgArr[ind].getTag() == _this.mycardsgroup[k].cardtag){
                                _this.mycardsgroup[k].cardnum = viewcardsnum[j];
                            }
                        }
                    }
                    _this.nodebgArr[ind].addChild(cardchild);
                }
            }
        }
        if(isant){
            var act1 = null;  var act2 = null;  var act3 = null;
            var index = i;
            //if(nodebgArrindex == 16){
            //    act1 = cc.scaleTo(0.1, 0.4, 0.5);
            //    act2 = cc.scaleTo(0.2, 0, 0.4);
            //    act3 = cc.scaleTo(0.2, 0.4, 0.4);
            //}else {
                index = 31 - nodebgArrindex * len - i;
                act1 = cc.scaleTo(0.1, 1, 1.2);
                act2 = cc.scaleTo(0.2, 0, 1);
                act3 = cc.scaleTo(0.2, 1, 1);
            //}
            var seq = cc.sequence(act1,cc.delayTime(0.1),act2, act3, cc.callFunc(function () {
                animation();
            }));
            _this.nodebgArr[index].runAction(seq);
        }else{
            animation();
            break;
        }
    }
};
gameclass.pintianjiutable.prototype.selectgroup = function (selector, target) {
    var _this = this;
    if(_this.ptjtype == 1){
        //var beginx = 0;
        switch (target){
            case ccui.Widget.TOUCH_BEGAN:
                _this.xiaobeginposx = selector.getPositionX();
                _this.xiaobeginposy = selector.getPositionY();
                _this.xiaobeginx = selector.getTouchBeganPosition().x-_this.xiaobeginposx;
                _this.xiaobeginy = selector.getTouchBeganPosition().y-_this.xiaobeginposy;
                break;
            case ccui.Widget.TOUCH_MOVED:
                var movex = selector.getTouchMovePosition().x-_this.xiaobeginx;
                var movey = selector.getTouchMovePosition().y-_this.xiaobeginy;
                selector.setPosition(movex , movey);
                if(movex >= this.xiaobeginposx+50 || movex <= this.xiaobeginposx-50 || movey >= this.xiaobeginposy+150 || movey <= this.xiaobeginposy-150){
                    _this.kaipaiAnimation();//小牌九自己牌的开牌动画
                    selector.setTouchEnabled(false);
                }
                break;
            case ccui.Widget.TOUCH_ENDED:
                selector.setPosition(_this.xiaobeginposx , _this.xiaobeginposy);
                break;
            case ccui.Widget.TOUCH_CANCELED:
                selector.setPosition(_this.xiaobeginposx , _this.xiaobeginposy);
                break;
        }
        return;
    }
    if(target == ccui.Widget.TOUCH_ENDED){
        var count = 0;
        for(var mn = 0; mn < _this.mycardsgroup.length; mn++){
            if(_this.mycardsgroup[mn].flag) count += 1;
        }

        for(var mn = 0; mn < _this.mycardsgroup.length; mn++){
            if(selector.getTag() == _this.mycardsgroup[mn].cardtag){
                if(_this.mycardsgroup[mn].flag) {
                    _this.mycardsgroup[mn].flag = false;
                    _this.mycardsgroup[mn].prechoose = 0;
                    var poy = selector.getPositionY() - 20;
                    selector.setPositionY(poy);
                    if(_this.sprmax) _this.sprmax.setVisible(false);
                    if(_this.sprmin) _this.sprmin.setVisible(false);
                    for(var m = 0; m < _this.mycardsgroup.length; m++){
                        if(_this.mycardsgroup[m].flag) {
                            _this.mycardsgroup[m].prechoose = 1;
                        }
                    }
                    return;
                }else{
                    if(count >= 2){
                        for(var m = 0; m < _this.mycardsgroup.length; m++){
                            if(_this.mycardsgroup[m].flag) {
                                if(_this.mycardsgroup[m].prechoose==1) {
                                    count = 1;
                                    _this.mycardsgroup[m].flag = false;
                                    _this.mycardsgroup[m].prechoose = 0;
                                    var poy = _this.mycardsgroup[m].cardnode.getPositionY() - 20;
                                    _this.mycardsgroup[m].cardnode.setPositionY(poy);
                                    break;
                                }
                            }
                        }
                        for(var m = 0; m < _this.mycardsgroup.length; m++){
                            if(_this.mycardsgroup[m].flag) {
                                _this.mycardsgroup[m].prechoose = 1;
                            }
                        }
                    }
                    _this.mycardsgroup[mn].flag = true;
                    _this.mycardsgroup[mn].prechoose = 1;
                    var poy = selector.getPositionY() + 20;
                    selector.setPositionY(poy);
                    count += 1;
                    if(count >= 2){
                        _this.mycardsgroup[mn].prechoose = 2;
                        var groupmax = [];var groupmin = []; //var group1 = 0; var group2 = 0;
                        for(var n = 0; n < _this.mycardsgroup.length; n++){
                            if(_this.mycardsgroup[n].flag) {
                                groupmax.push(_this.mycardsgroup[n].cardnum);
                            }else{
                                groupmin.push(_this.mycardsgroup[n].cardnum);
                            }
                        }
                        var change = _this.findmaxgroup(groupmax, groupmin);
                        if(change){
                            _this.showgroupnameSpr(groupmin,groupmax,false);
                        }else{
                            _this.showgroupnameSpr(groupmax,groupmin,false);
                        }
                    }
                    return;
                }
            }
        }
    }
}
gameclass.pintianjiutable.prototype.touziFunc = function ( touzinums )
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

        var dearc = _this.dearchair+(_this.mod_ptj.beginchair-1)%4;
        if(dearc >= 4) dearc = dearc-4;
        var endpos = ccui.helper.seekWidgetByName(_this.node, "Node_"+dearc).getPosition();
        var endpos1; var endpos2;
        if(dearc == 0){
            endpos1 = cc.p(endpos.x+20,endpos.y);
            endpos2 = cc.p(endpos.x+80,endpos.y);
        }else if(dearc == 1){
            endpos1 = cc.p(endpos.x+100,endpos.y-30);
            endpos2 = cc.p(endpos.x+100,endpos.y+30);
        }else if(dearc == 2){
            endpos1 = cc.p(endpos.x+20,endpos.y);
            endpos2 = cc.p(endpos.x+80,endpos.y);
        }else if(dearc == 3){
            endpos1 = cc.p(endpos.x,endpos.y-30);
            endpos2 = cc.p(endpos.x,endpos.y+30);
        }
        //cc.log(endpos,dearc);
        sprt1.runAction(cc.sequence(cc.moveTo(0.2,endpos1), cc.fadeOut(2), cc.callFunc(function () {
            _this.node.removeChild(sprt1);
            spineBoy.clearTrack(19);
            spineBoy.removeFromParent();
        })));
        sprt2.runAction(cc.sequence(cc.moveTo(0.2,endpos2),cc.fadeOut(2), cc.callFunc(function () {
            _this.node.removeChild(sprt2);
            //var dearc = _this.dearchair+(_this.mod_ptj.beginchair-1)%4;
            //if(dearc >= 4) dearc = dearc-3;
            _this.cardRunaction(dearc,0,true,null);
        })));
    };
    //var spineBoy = new sp.SkeletonAnimation(res.ptjsaizijson, res.ptjsaiziatlas);
    //spineBoy.setAnimation(19, "yaoshaizi", false);
    var spineBoy = new sp.SkeletonAnimation(res.tousaizi_json, res.tousaizi_skeleton);
    spineBoy.setAnimation(19, 'w', false);
    spineBoy.setEndListener(removeSprite);
    spineBoy.setPosition(cc.p(pox,poy));
    _this.node.addChild(spineBoy);
};

gameclass.pintianjiutable.prototype.showbets = function(msgdata) {
    var _this = this;
    var bets0 = "ptj_x" + msgdata.bets%100 + ".png";//十位和个位
    var chair = _this.mod_ptj.getchairbyuid(msgdata.uid);
    _this.playerHeads[chair].selectbg0.setVisible(true);

    var bets1 = "ptj_x" + parseInt(msgdata.bets/100)%100 + ".png";//百位和千位
    //cc.log(bets1,bets0,chair);
    _this.playerHeads[chair].selectbg1.setVisible(true);

    var flag = false; var bets2 = "";
    if(msgdata.bets/10000 >= 1){
        flag = true;
        bets2 = "ptj_x" + parseInt(msgdata.bets/10000) + ".png";//万位和十万位
        _this.playerHeads[chair].selectbg2.setVisible(true);
    }

    if(chair==1) {
        if(flag){
            _this.playerHeads[chair].selectscore0.initWithSpriteFrameName(bets2);
            _this.playerHeads[chair].selectscore1.initWithSpriteFrameName(bets1);
            _this.playerHeads[chair].selectscore2.initWithSpriteFrameName(bets0);
        }else{
            _this.playerHeads[chair].selectscore0.initWithSpriteFrameName(bets1);
            _this.playerHeads[chair].selectscore1.initWithSpriteFrameName(bets0);
        }
    }else{
        _this.playerHeads[chair].selectscore0.initWithSpriteFrameName(bets0);
        _this.playerHeads[chair].selectscore1.initWithSpriteFrameName(bets1);
        if(flag) _this.playerHeads[chair].selectscore2.initWithSpriteFrameName(bets2);
    }
};

gameclass.pintianjiutable.prototype.robzhuang = function(uid,ok) {
    var _this = this;
    if(ok){
        var chair = _this.mod_ptj.getchairbyuid(uid);
        _this.isrobzh[chair] = 1;
        //cc.log(_this.isrobzh,chair)
    }
};

//抢庄成功
gameclass.pintianjiutable.prototype.robzhuangsus = function(uid) {
    var _this = this; var flag = false; var nobodyrob = false;
    var showselectsbg = function () {
        flag = true;
        for(var i = 0; i < _this.playerHeads.length; i++){
            if(_this.playerHeads[i].uid == uid){
                //抢庄成功动画
                _this.playerHeads[i].zhuang.setVisible(true);
                _this.playerHeads[i].zhuang.setScale(6);
                _this.playerHeads[i].zhuang.runAction(cc.scaleTo(0.2,1));
                _this.playerHeads[i].selectbg0.setVisible(false);
                _this.playerHeads[i].selectbg1.setVisible(false);
                _this.playerHeads[i].selectbg2.setVisible(false);
                //var chair = _this.mod_ptj.getchairbyuid(uid);
                var selectype = parseInt( parseInt(_this.mod_ptj.roominfo.param1)*0.001 );
                if(i != 0 && selectype == 0){
                    ccui.helper.seekWidgetByName(_this.node, "selectscorebg").setVisible(true);
                    ccui.helper.seekWidgetByName(_this.node, "showxiazhu1").setVisible(true);
                    mod_sound.playeffect(g_music["game_ptj_pleasebet"], false);//请下注
                }
                break;
            }
        }
    }
    for(var i = 0; i < _this.isrobzh.length; i++){
        if(_this.isrobzh[i] == 1){
            nobodyrob = true;
            break;
        }
    }
    if(!nobodyrob){
        _this.isrobzh = [1,1,1,1];
    }
    for(var i = 0; i < _this.playerHeads.length; i++){
        if(_this.playerHeads[i].ishaves){
            if(_this.playerHeads[i].uid == uid) {
                _this.dearchair = i;
            }else {
                _this.playerHeads[i].selectbg0.setVisible(true);
                _this.playerHeads[i].selectbg1.setVisible(true);
                if(_this.xiadaocount == 3) _this.playerHeads[i].selectbg2.setVisible(true);
            }
            if(_this.isrobzh[i] == 1) {
                _this.isrobzh[i] = 0;
                var seq = cc.sequence(cc.blink(1,4),cc.callFunc(function (){
                    if(!flag) showselectsbg();
                }));
                _this.playerHeads[i].ptj_kuang.runAction(seq);
            }
        }
    }
};

//普通牌组合选出最大的
gameclass.pintianjiutable.prototype.tishiselectgroup = function() {
    //this.allcardsnum[21]
    var _this = this; var grouptemp = 0; var change = false; var groupgoodmax = 0;
    var groupmax = []; var groupmin = []; var groupminid1 = 0; var groupminid2 = 0; var groupminid3 = 0;
    var tempgroup1max = []; var tempgroup1min = []; var tempgroup2max = []; var tempgroup2min = [];var tempgroup3max = []; var tempgroup3min = [];
    var group1 = []; var group2 = []; var group3 = []; var group4 = []; var group5 = []; var group6 = [];

    tempgroup1max.push(_this.myviewlist[0]);  tempgroup1max.push(_this.myviewlist[1]);
    tempgroup1min.push(_this.myviewlist[2]);  tempgroup1min.push(_this.myviewlist[3]);
    group1 = parseInt(this.findtabelgroup(tempgroup1max).values);
    group2 = parseInt(this.findtabelgroup(tempgroup1min).values);

    tempgroup2max.push(_this.myviewlist[0]);  tempgroup2max.push(_this.myviewlist[2]);
    tempgroup2min.push(_this.myviewlist[1]);  tempgroup2min.push(_this.myviewlist[3]);
    group3 = parseInt(this.findtabelgroup(tempgroup2max).values);
    group4 = parseInt(this.findtabelgroup(tempgroup2min).values);

    tempgroup3max.push(_this.myviewlist[0]);  tempgroup3max.push(_this.myviewlist[3]);
    tempgroup3min.push(_this.myviewlist[1]);  tempgroup3min.push(_this.myviewlist[2]);
    group5 = parseInt(this.findtabelgroup(tempgroup3max).values);
    group6 = parseInt(this.findtabelgroup(tempgroup3min).values);
    var teshucount = 0;
    if(group1 > 900 || group2 > 900) teshucount += 1;
    if(group3 > 900 || group4 > 900) teshucount += 1;
    if(group5 > 900 || group6 > 900) teshucount += 1;

    if(teshucount == 1) {
        if (group1 > 900 || group2 > 900) {
            _this.teshuGroupscard(group1, group2, tempgroup1max, tempgroup1min);
        }
        if (group3 > 900 || group4 > 900) {
            _this.teshuGroupscard(group3, group4, tempgroup2max, tempgroup2min);
        }
        if (group5 > 900 || group6 > 900) {
            _this.teshuGroupscard(group5, group6, tempgroup3max, tempgroup3min);
        }
        return true;
    }else if(teshucount >= 2){
        var max = group1;
        if(group1 < group2) max = group2;
        if(max < group3) max = group3;
        if(max < group4) max = group4;
        if(max < group5) max = group5;
        if(max < group6) max = group6;

        teshucount = 0; var g12 = 0; var g34 = 0; var g56 = 0;
        if(max == group1 || max == group2) {teshucount += 1; g12 = 1;}
        if(max == group3 || max == group4) {teshucount += 1;g34 = 1;}
        if(max == group5 || max == group6) {teshucount += 1;g56 = 1;}
        if(teshucount >= 2){//==3几乎没有可能性
            if(g12 == g34){
                if(group1+group2 > group3+group4){
                    _this.teshuGroupscard(group1, group2, tempgroup1max, tempgroup1min);
                }else{
                    _this.teshuGroupscard(group3, group4, tempgroup2max, tempgroup2min);
                }
            }
            else if(g56 == g34){
                if(group5+group6 > group3+group4){
                    _this.teshuGroupscard(group5, group6, tempgroup3max, tempgroup3min);
                }else{
                    _this.teshuGroupscard(group3, group4, tempgroup2max, tempgroup2min);
                }
            }
            else if(g56 == g12){
                if(group5+group6 > group1+group2){
                    _this.teshuGroupscard(group5, group6, tempgroup3max, tempgroup3min);
                }else{
                    _this.teshuGroupscard(group1, group2, tempgroup1max, tempgroup1min);
                }
            }
        }else{
            if(max == group1 || max == group2)  _this.teshuGroupscard(group1, group2, tempgroup1max, tempgroup1min);
            else if(max == group3 || max == group4) _this.teshuGroupscard(group3, group4, tempgroup2max, tempgroup2min);
            else if(max == group5 || max == group6) _this.teshuGroupscard(group5, group6, tempgroup3max, tempgroup3min);
        }
        return true;
    }
    groupminid1 = group2;
    if(group1 < group2 ) {
        groupminid1 = group1;
        tempgroup1max = [];  tempgroup1min = [];
        tempgroup1max.push(_this.myviewlist[2]);  tempgroup1max.push(_this.myviewlist[3]);
        tempgroup1min.push(_this.myviewlist[0]);  tempgroup1min.push(_this.myviewlist[1]);
    }

    groupminid2 = group4;
    if(group3 < group4 ) {
        groupminid2 = group3;
        tempgroup2max = [];  tempgroup2min = [];
        tempgroup2max.push(_this.myviewlist[1]);  tempgroup2max.push(_this.myviewlist[3]);
        tempgroup2min.push(_this.myviewlist[0]);  tempgroup2min.push(_this.myviewlist[2]);
    }

    groupminid3 = group6;
    if(group5 < group6 ) {
        groupminid3 = group5;
        tempgroup3max = [];  tempgroup3min = [];
        tempgroup3max.push(_this.myviewlist[1]);  tempgroup3max.push(_this.myviewlist[2]);
        tempgroup3min.push(_this.myviewlist[0]);  tempgroup3min.push(_this.myviewlist[3]);
    }

    goodgroupmax = groupminid1;
    groupmax = tempgroup1max;
    groupmin = tempgroup1min;
    if(groupminid1 < groupminid2){
        goodgroupmax = groupminid2;
        groupmax = [];  groupmin = [];
        groupmax = tempgroup2max;
        groupmin = tempgroup2min;
    }

    if(goodgroupmax < groupminid3){
        groupmax = [];  groupmin = [];
        groupmax = tempgroup3max;
        groupmin = tempgroup3min;
    }



    _this.autoGroupscard(groupmax,groupmin);
    return false;
};

gameclass.pintianjiutable.prototype.teshuGroupscard = function(group1,group2 ,tempgroupmax,tempgroupmin){
    var _this = this;
    if(group1 > 900 && group2 < 900){
        _this.autoGroupscard(tempgroupmax,tempgroupmin);
    }else if(group1 < 900 && group2 > 900){
        _this.autoGroupscard(tempgroupmin,tempgroupmax);
    }else{
        if(group1 < group2){
            _this.autoGroupscard(tempgroupmin,tempgroupmax);
        }else{
            _this.autoGroupscard(tempgroupmax,tempgroupmin);
        }
    }
}

gameclass.pintianjiutable.prototype.autoGroupscard = function(groupmax,groupmin) {
    var _this = this; var tempgroup = [];
    for(var mn = 0; mn < _this.mycardsgroup.length; mn++){
        if(_this.mycardsgroup[mn].flag) {
            _this.mycardsgroup[mn].flag = false;
            _this.mycardsgroup[mn].prechoose = 0;
            var posy = _this.mycardsgroup[mn].cardnode.getPositionY() - 20;
            _this.mycardsgroup[mn].cardnode.setPositionY(posy);
        }
    }
    for(var n = 0; n < 2; n++){
        tempgroup.push(groupmax[n]);
    }
    for(var n = 0; n < 2; n++){
        for(var mn = 0; mn < _this.mycardsgroup.length; mn++){
            if(!_this.mycardsgroup[mn].flag){
                if(tempgroup[n] == _this.mycardsgroup[mn].cardnum){
                    _this.mycardsgroup[mn].flag = true;
                    _this.mycardsgroup[mn].prechoose = 1;
                    tempgroup[n] = 0;
                    var poy = _this.mycardsgroup[mn].cardnode.getPositionY() + 20;
                    _this.mycardsgroup[mn].cardnode.setPositionY(poy);
                    break;
                }
            }
        }
    }
    _this.showgroupnameSpr(groupmax,groupmin,false);
};
gameclass.pintianjiutable.prototype.showgroupnameSpr = function(groupmax,groupmin,bool) {
    var _this = this;
    if(_this.groupstable.length == 0) {
        //cc.log("showgroupnameSpr",bool);
        var seq = cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
            //cc.log("showgroupnameSpr",bool);
            _this.showgroupnameSpr(groupmax,groupmin,bool);
            if(bool) _this.kaipainame(groupmax,groupmin);
        }));
        _this.node.runAction(seq);
        return ;
    }
    var mygroupmaxname = _this.showgroupname(groupmax);
    var mygroupminname;
    if(groupmin.length > 0){
        mygroupminname = _this.showgroupname(groupmin);
    }
    if(!bool){
        var node0 = ccui.helper.seekWidgetByName(_this.node, "Node_0");
        if(!_this.sprmax){
            _this.sprmax = new cc.Sprite();
            //if(_this.ptjtype == 1)
            //    _this.sprmax.setPosition(cc.p(360,35));
            //else
                _this.sprmax.setPosition(cc.p(300,35));
            node0.addChild(_this.sprmax);
        }
        _this.sprmax.setVisible(true);
        _this.sprmax.initWithSpriteFrameName(mygroupmaxname+".png");
        if(groupmin.length > 0){
            if(!_this.sprmin) {
                _this.sprmin = new cc.Sprite();
                _this.sprmin.setPosition(cc.p(300,-30));
                node0.addChild(_this.sprmin);
            }
            _this.sprmin.setVisible(true);
            _this.sprmin.initWithSpriteFrameName(mygroupminname+".png");
        }
    }
};
gameclass.pintianjiutable.prototype.findtabelgroup = function(groups) {
    var tempgroups = []; var groupobj = {};
    var groupstable =  this.groupstable;
    for(var i = 0; i < groupstable.length; i++){
        var count = 0;
        if( (groups[0] == parseInt(groupstable[i].card1) && groups[1] == parseInt(groupstable[i].card2))||
            (groups[0] == parseInt(groupstable[i].card2) && groups[1] == parseInt(groupstable[i].card1)) ){
            groupobj.id = parseInt(groupstable[i].id);
            groupobj.name = groupstable[i].name;
            groupobj.type = parseInt(groupstable[i].type);
            groupobj.card1 = parseInt(groupstable[i].card1);
            groupobj.card2 = parseInt(groupstable[i].card2);
            groupobj.value2 = parseInt(groupstable[i].value2);
            groupobj.values = parseInt(groupstable[i].value1);
            groupobj.sound = groupstable[i].sound;
            groupobj.ptjimg = groupstable[i].ptjimg;
            break;
        }
    }
    if(groupobj.type > 0){
        var splitnamearr = [];
        splitnamearr = groupobj.name.split("#",2);
        var splitpngarr = [];
        splitpngarr = groupobj.ptjimg.split("#",2);
        var splitsoundarr = [];
        splitsoundarr = groupobj.sound.split("#",2);
        if(this.isbomb && groupobj.type == 1){
            groupobj.values = groupobj.value2;
            groupobj.name = splitnamearr[1];
            groupobj.ptjimg = splitpngarr[1];
            groupobj.sound = splitsoundarr[1];
        }else if(this.isguizi && groupobj.type == 3){
            groupobj.values = groupobj.value2;
            groupobj.name = splitnamearr[1];
            groupobj.ptjimg = splitpngarr[1];
            groupobj.sound = splitsoundarr[1];
        }else if(this.istjw && groupobj.type == 4){
            groupobj.values = groupobj.value2;
            groupobj.name = splitnamearr[1];
            groupobj.ptjimg = splitpngarr[1];
            groupobj.sound = splitsoundarr[1];
        }else if(this.isdjnn && groupobj.type == 2){
            groupobj.values = groupobj.value2;
            groupobj.name = splitnamearr[1];
            groupobj.ptjimg = splitpngarr[1];
            groupobj.sound = splitsoundarr[1];
        }else{
            groupobj.name = splitnamearr[0];
            groupobj.ptjimg = splitpngarr[0];
            groupobj.sound = splitsoundarr[0];
        }
    }
    return groupobj;
};
//返回png
gameclass.pintianjiutable.prototype.showgroupname = function(groups) {

    var groupobj = this.findtabelgroup(groups);
    if (!groupobj.ptjimg) return "ptj_bi_10"; //其实这时出错了表中无对应组合或传参错误
    return groupobj.ptjimg;
};

gameclass.pintianjiutable.prototype.findmaxgroup = function(g1, g2){
    var groupobj1 = this.findtabelgroup(g1);
    var groupobj2 = this.findtabelgroup(g2);
    var change = false;
    if(groupobj1.values && groupobj2.values){
        if(parseInt(groupobj1.values) < parseInt(groupobj2.values)) change = true;
    }
    return change;
};
//服务器发来
gameclass.pintianjiutable.prototype.showplayerkaipai = function(chair) {
    var _this = this;
    for(var i = 0; i < this.playercardindex[chair].length; i++){
        if(i >= 2){
            var index = this.playercardindex[chair][i];
            var act1 = null; var act2 = null;
            if(chair == 1){
                if(i == 2) act1 = cc.moveBy(0.2, cc.p(15,-33));
                if(i == 3) act1 = cc.moveBy(0.2, cc.p(-45,27));
                act2 = cc.rotateTo(0.2, -90, -90);
                index += 2;
            }else{
                if(i == 2) act1 = cc.moveBy(0.2, cc.p(40,27));
                if(i == 3) act1 = cc.moveBy(0.2, cc.p(-20,-35));
                act2 = cc.rotateTo(0.2, 90, 90);
            }
            var seq = cc.sequence(act1, act2, cc.callFunc(function () {}));
            _this.nodebgArr[index].runAction(seq);
        }
    }
}

gameclass.pintianjiutable.prototype.cleartable = function(bool) {
    if (bool) this.curround += 1;
    this.refreshStep();
    for(var i = 0; i < this.playerHeads.length; i++){
        this.playerHeads[i].selectbg0.setVisible(false);
        this.playerHeads[i].selectbg1.setVisible(false);
        this.playerHeads[i].selectbg2.setVisible(false);
        this.playerHeads[i].selectscore0.initWithSpriteFrameName("ptj_x2.png");
        this.playerHeads[i].selectscore1.initWithSpriteFrameName("ptj_x2.png");
        this.playerHeads[i].selectscore2.initWithSpriteFrameName("ptj_x2.png");

        this.playerHeads[i].ptj_win_lose.setVisible(false);
        this.playerHeads[i].zhuang.setVisible(false);
        var node0 = ccui.helper.seekWidgetByName(this.node, "Node_"+i);
        var sprminname = ccui.helper.seekWidgetByName(node0, "sprminname");
        sprminname.setVisible(false);
        var sprmaxname = ccui.helper.seekWidgetByName(node0, "sprmaxname");
        sprmaxname.setVisible(false);
    }
    this.isrobzh = [0,0,0,0];
    this.playercardindex = [[],[],[],[]];
    this.myviewlist = [];
    this.tablecards = [];
    this.xiadaonum = 0;//已下次数
    this.xiadaofen = 0;
    this.mycardsgroup = [];
    this.mycardsgroup = [];
    if(this.sprmax) this.sprmax.setVisible(false);
    if(this.sprmin) this.sprmin.setVisible(false);
    for(var i = 0; i < this.nodebgArr.length; i++){
        if(this.nodebgArr[i]) this.nodebgArr[i].removeFromParent();
    }
    this.nodebgArr = [];
};
//单局结算
gameclass.pintianjiutable.prototype.resultOnend = function(msgdata) {
    //首先显示翻牌，接着比牌输赢
    var _this = this; var dearPos = cc.p(0,0); var dearscore = 0;
    for(var i=0; i < msgdata.info.length; i++){
        //先找到庄家的pos
        if(msgdata.info[i].dealer){
            var chair = _this.mod_ptj.getchairbyuid(msgdata.info[i].uid);//head0
            dearPos = _this.playerHeads[chair].head.getPosition();
            dearscore = msgdata.info[i].score;
        }
    }
    for(var i=0; i < msgdata.info.length; i++){
        var chair = _this.mod_ptj.getchairbyuid(msgdata.info[i].uid);
        _this.playerHeads[chair].playerscore.setString(msgdata.info[i].total);

        _this.playerHeads[chair].ptj_win_lose.setVisible(true);
        var strname = res.ptj_img_he;
        if(msgdata.info[i].score > 0) strname = res.ptj_img_win;
        else if(msgdata.info[i].score < 0) strname = res.ptj_img_lose;
        _this.playerHeads[chair].ptj_win_lose.setTexture(strname);
        _this.playerHeads[chair].ptj_win_lose.setScale(6);
        //var actw1 = cc.delayTime(0.1);
        var actw2 = cc.scaleTo(0.2,1);
        //var seq = cc.sequence(actw1,actw2,cc.callFunc(function () { }));
        _this.playerHeads[chair].ptj_win_lose.runAction(actw2);

        if(chair){
            var flag = false;
            for(var j = 0; j < msgdata.info[i].card.length; j++){
                //if(chair == 0) break;
                var nodecard = _this.nodebgArr[_this.playercardindex[chair][j]];
                var seq = cc.sequence(cc.scaleTo(0.1, 1, 1.2),cc.delayTime(0.1),cc.scaleTo(0.2, 0, 1), cc.scaleTo(0.2, 1, 1), cc.callFunc(function () {
                    if(!flag){
                        flag = true;
                        for(var m=0; m < msgdata.info.length; m++){
                            var chair1 = _this.mod_ptj.getchairbyuid(msgdata.info[m].uid);
                            //cc.log(chair1,msgdata.info[m]);
                            if(!msgdata.info[m].dealer){
                                var playerPos = _this.playerHeads[chair1].head.getPosition();
                                var batter = dearscore-msgdata.info[m].score;
                                if(batter > 0){
                                    if(batter > 8) batter = 8;
                                    var _sp=new goldSpLayer(res.niuniuAnimateGold,batter,0.5,0.1,dearPos,playerPos);
                                    _this.node.addChild(_sp);
                                }
                                else if(batter < 0){
                                    if(batter*-1 > 8) batter = 8;
                                    var _sp=new goldSpLayer(res.niuniuAnimateGold,batter,0.5,0.1,playerPos,dearPos);
                                    _this.node.addChild(_sp);
                                }
                            }
                            //桌面其他玩家牌型显示（除开自己）
                            if(chair1){
                                var tempcard = [];
                                for(var n = 0; n < msgdata.info[m].card.length; n++){
                                    if(chair1 == 1 && _this.ptjtype != 1) {
                                        tempcard[n] = msgdata.info[m].card[3-n];//大牌九，1号位玩家先放小牌再放大牌
                                    }else{
                                        tempcard.push(msgdata.info[m].card[n]);
                                    }
                                }
                                //if(chair1 == 1) msgdata.info[m].card.sort(function(a,b){return b-a});
                                for(var n = 0; n < tempcard.length; n++){
                                    var nodecard1 = _this.nodebgArr[_this.playercardindex[chair1][n]];
                                    //var cardchild1 = new cc.Sprite();
                                    //cardchild1.setAnchorPoint(cc.p(0,0));
                                    var strname = "ptj_dianimg_"+tempcard[n]+".png";
                                    //cardchild1.initWithSpriteFrameName(strname);
                                    var cardchild1 = new ccui.ImageView();
                                    cardchild1.setAnchorPoint(cc.p(0,0));
                                    cardchild1.loadTexture(strname,ccui.Widget.PLIST_TEXTURE);

                                    cardchild1.setPosition(cc.p(6.5,9));
                                    nodecard1.addChild(cardchild1);

                                    if(n == 1){
                                        var groupmax = [];
                                        if(chair1 == 1 && _this.ptjtype != 1){
                                            groupmax.push(tempcard[2]);
                                            groupmax.push(tempcard[3]);
                                        }else{
                                            groupmax.push(tempcard[0]);
                                            groupmax.push(tempcard[1]);
                                        }
                                        var maxname = _this.showgroupname(groupmax);
                                        var node0 = ccui.helper.seekWidgetByName(_this.node, "Node_"+chair1);
                                        var sprmaxname = ccui.helper.seekWidgetByName(node0, "sprmaxname");
                                        sprmaxname.setVisible(true);
                                        sprmaxname.initWithSpriteFrameName(maxname+".png");
                                    }
                                    if(n == 3 && _this.ptjtype != 1){
                                        var groupmin = [];
                                        if(chair1 == 1){
                                            groupmin.push(tempcard[0]);
                                            groupmin.push(tempcard[1]);
                                        }else{
                                            groupmin.push(tempcard[2]);
                                            groupmin.push(tempcard[3]);
                                        }
                                        var minname = _this.showgroupname(groupmin);
                                        var node0 = ccui.helper.seekWidgetByName(_this.node, "Node_"+chair1);
                                        var sprminname = ccui.helper.seekWidgetByName(node0, "sprminname");
                                        sprminname.setVisible(true);
                                        sprminname.initWithSpriteFrameName(minname+".png");
                                    }
                                }
                            }
                        }
                    }
                }));
                nodecard.runAction(seq);
            }
        }
        var person = _this.mod_ptj.getpersonbyuid(msgdata.info[i].uid);
        msgdata.info[i].name = person.name;
        _this.isrobzh = [0,0,0,0];
    }
    _this.resultdata(msgdata);
    var seq = cc.sequence(cc.delayTime(2), cc.callFunc(function () {
        _this.game.uimgr.showui("gameclass.ptjoneresultui").setmodttz(msgdata,_this.mod_ptj,_this.groupstable);
        var remaincardbg = ccui.helper.seekWidgetByName(_this.node, "remaincardbg");
        var movebgx = remaincardbg.getPositionX();
        var movebgy = remaincardbg.getPositionY()-_this.remaincardposy;
        remaincardbg.setPosition(cc.p(movebgx,movebgy));
    }));
    _this.runAction(seq);
};

gameclass.pintianjiutable.prototype.resultdata = function(msgdata){
    var _data = msgdata;
    var _this = this;
    for(var i=0; i < _data.info.length; i++){
        var per = _this.mod_ptj.getpersonbyuid(_data.info[i].uid);
        _data.info[i].name = per.name;
        if(_data.info[i].maxtype)
            _data.info[i].maxtype = _this.findnametabelgroup(_data.info[i].maxtype);
    }
    _data.roomid = _this.mod_ptj.roominfo.roomid;
    _data.step = _this.curround;
    _data.maxstep = _this.mod_ptj.roominfo.maxStep;
    return _data;
};

gameclass.pintianjiutable.prototype.findnametabelgroup = function(maxtype){
    var name = "";
    var groupstable =  this.groupstable;
    for(var i = 0; i < groupstable.length; i++){
        if(groupstable[i].id == maxtype){
            name = groupstable[i].name;
            if(groupstable[i].type > 0) {
                var splitnamearr = [];
                splitnamearr = name.split("#",2);
                name = splitnamearr[1];
            }
            return name;
        }
    }
    return name;
}

gameclass.pintianjiutable.prototype.getptjson = function() {
    var _this = this;
    cc.loader.loadJson(res.pintianjiugroups,function(err,data){
        _this.groupstable = [];
        for(var ty in data){
            var obj = data[ty];
            _this.groupstable.push(obj);
        }
    });
};

gameclass.pintianjiutable.prototype.userLineOut =  function(index,data){
    //var index = index - this.mod_ptj.serverchair;
    //if(index < 0){
    //    index = index + 4;
    //}
    if(!this.playerHeads[index]){
        return;
    }
    if(data.line)
        this.playerHeads[index].off_line.setVisible(false);
    else
        this.playerHeads[index].off_line.setVisible(true);
    gameclass.mod_base.showtximg(this.playerHeads[index].head_img, this.playerHeads[index].head_url, 0, 0,"",!data.line);
    //gameclass.mod_base.showtximg(this.playerHeads[index].head_img, data.imgurl, 0, 0 , null ,true);
};
//飞金币动画 res.niuniuAnimateGold
gameclass.pintianjiutable.prototype.flygoldcoins =  function(posbegin,posend,flynum,next){
    var _this = this;  var _flynum = flynum;
    var _next = next+1;
    if(_flynum > 10) _flynum = 10;
    if(_next<_flynum){
        var spr = new cc.Sprite(res.niuniuAnimateGold);
        spr.setPosition(posbegin);
        _this.node.addChild(spr);
        _this.coinSprArr.push(spr);
        var act = cc.moveTo(0.1,posend.x,posend.y);
        var seq = cc.sequence(act, cc.callFunc(function () {
            _this.flygoldcoins(posbegin,posend,_flynum,_next);
        }));
        spr.runAction(seq);
    }else{
        for(var i=0; i < _this.coinSprArr.length; i++){
            _this.coinSprArr[i].removeFromParent();
        }
        _this.coinSprArr = [];
    }
};
