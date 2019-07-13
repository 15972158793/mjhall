/**
 * Created by yang on 2016/11/9.
 */

var sdb_playerHead = cc.Class.extend({
    parent:null,
    node:null,
    name_text:null,
    id_text:null,
    address_text:null,
    zhuang_img:null,
    betnum_img:null,
    score_text:null,
    head_img:null,
    ok_img:null,
    //arrow_img:null,
    notify_node:null,
    index:null,
    curCards:null,
    curCardsSP:null,
    isRun:false,
    isRunType:false,
    c:null,
    ctor: function (node,index,parent) {
        this.curCards = [];
        this.curCardsSP = [];
        this.node = node;
        this.index= index;
        this.name_text = this.node.getChildByName('name_text');
        this.id_text = this.node.getChildByName('id_text');
        this.score_text = this.node.getChildByName('score_text');
        this.head_img =  this.node.getChildByName('icon_img');
        this.ok_img = this.node.getChildByName('ok_img');
        //this.arrow_img =  this.node.getChildByName('arr_img');
        this.zhuang_img = this.node.getChildByName('zhuang_img');
        this.betnum_img =  this.node.getChildByName('beinum_img');
        this.off_line = this.node.getChildByName("off_line");

        this.ipLayout   = this.node.getChildByName('ipLayout');
        //this.uid_Text = this.ipLayout.getChildByName('uid_Text');
        this.uip_Text = this.ipLayout.getChildByName('uip_Text');
        this.address_Text = this.ipLayout.getChildByName('address_Text');

        this.notify_node = ccui.helper.seekWidgetByName( parent, "notifynode"  + index);
        this.pparent = parent;

        this.c = this.node.getChildByName('c4');
        this.talkPos = [cc.p(330,130),cc.p(1040,260),cc.p(1040,470),cc.p(140,470),cc.p(140,260)];
        this.init();
        //this.node.setAnchorPoint(0.5,0.5);
        //------------------------------//
        //this.address_text
    },
    setVisible:function(b){
        this.node.setVisible(b);
    },
    init:function() {
        if (this.index == 1 || this.index == 2) {
            this.ok_img.setPositionX(-50);
        }
        if(this.index == 3 || this.index == 4){
            this.ipLayout.setPositionX(250);
        }
        //if (this.index == 1) {
        //    this.arrow_img.setPositionX(-50);
        //    this.arrow_img.setRotation(-90);
        //
        //}
        this.ipLayout.setVisible(false);
        this.setVisible(false);
        this.score_text.setString(0);
        //this.setBaseInfo(null);
        this.reset();

        //this.c.addTouchEventListener(function (sender, type) {
        //    if (ccui.Widget.TOUCH_BEGAN == type) {
        //        this.ipLayout.setVisible(true);
        //    } else if (ccui.Widget.TOUCH_ENDED == type) {
        //        this.ipLayout.setVisible(false);
        //    } else if (ccui.Widget.TOUCH_CANCELED == type) {
        //        this.ipLayout.setVisible(false);
        //    }
        //}, this);

    },

    showCart : function(data) {
        for(var i = 0;i < g_chatstr.length; i++){
            if(g_chatstr[i] == data.chat){
                mod_sound.playeffect(g_music["fix_msg_" + (i+1)],false);
            }
        }

        var arr = [
            res.chatbg_ld,
            res.chatbg_rd,
            res.chatbg_rd,
            res.chatbg_ld,
            res.chatbg_ld,
        ];
        var talkPos = this.talkPos[this.index];
        if(data.type < 4){
            var _node = new ccui.Layout();
            var s9 = null;
            if(data.type == 1){
                s9 = new cc.Scale9Sprite(arr[this.index]);
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
                //s9.setBackGroundImage(arr[this.index]);
                //s9.setBackGroundImageScale9Enabled(true);
                //spr.setPosition(0.5*s9.getContentSize().width,0.5*s9.getContentSize().height+5);
                //s9.addChild(spr);
                //_node.addChild(s9);

                var spine = new sp.SkeletonAnimation(g_chat_expression["expression"+index+"_json"],g_chat_expression["expression"+index+"_atlas"]);
                spine.setAnimation(0, 'animation', false);
                spine.setAnchorPoint(0.5, 0.5);

                s9 = new ccui.Layout();
                s9.setContentSize(110, 100);
                s9.setBackGroundImage(arr[this.index]);
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
            if (this.index == 1 || this.index == 2){
                _node.setPosition(talkPos.x - s9.width,talkPos.y);
            }else{
                _node.setPosition(talkPos);
            }
            this.pparent.addChild(_node);
            var seq = cc.sequence(cc.delayTime(2),cc.callFunc(function(){
                _node.removeFromParent(true);
            }));
            _node.runAction(seq);
        }
    },

    reset:function(){
        this.isRun = this.isRunType = false;
        this.ok_img.setVisible(false);
        //this.arrow_img.setVisible(false);
        this.zhuang_img.setVisible(false);
        this.betnum_img.setVisible(false);
        this.clearCards();
    },
    gameNext:function(){
        this.isRun = this.isRunType = false;
        //this.arrow_img.setVisible(false);
        this.zhuang_img.setVisible(false);
        this.betnum_img.setVisible(false);
        this.clearCards();
    },
    getNotifyPos:function () {
        return this.notify_node.getPosition();
    },
    setBaseInfo:function(data){
        data = data || {};
        this.off_line.setVisible(!data.line);
        this.name_text.setString(data.name || '离线');
        //this.id_text.setString(data.id || '0');
        this.score_text.setString(data.score || this.score_text.getString());
        this.ok_img.setVisible(data.ready);
        //this.uid_Text.setString("ID："+data.uid || '');
        this.uip_Text.setString("IP："+data.uip || '');
        this.address_Text.setString("地址："+data.address || '');

        this.head_url = data.head || "";
        gameclass.mod_base.showtximg(this.head_img , this.head_url , 0, 0 , "im_headbg5", !data.line );
    },
    /*
    * 判断牌和手牌相等
    * */
    eqCards:function (cards) {
        if( this.curCards.length != cards.length){
            return false;
        }
        for(var i = 0 ; i < this.curCards.length  ; i++){
                if(this.curCards[i] != cards[i]){
                    return false;
                }
        }
        return true;
    },
    /*
     * 判断牌数量和手牌相数量等
     * */
    eqLength:function (cards) {
        return this.curCards.length == cards.length;
    },
    showBet:function(bet){
        this.betnum_img.setTexture("res/niuniuRes/yypk_imh_"+bet+"fen.png");
        //this.betnum_img.setString(bet+"分");
        this.betnum_img.setVisible(true);
    },

    /*
     * 循环发牌
     * */
    sendCards: function(cards) {

        var start  = this.curCards.length;
        this.curCards = cards;
        //this.notify_node.removeAllChildren();
        var starPosX  = [-100,-100,-40,30,30];
        var starPosY  = [40,20,20,20,20] ;
        var offset = this.index == 0 ? 55 : 35;
        for (var i = start ; i < cards.length; i++) {
            var sp = this.createCard(cards[i]);
            sp.setPositionX(starPosX[this.index] + offset * i);
            sp.setPositionY(starPosY[this.index]);
            sp.setTag(cards[i]);

            this.curCardsSP.push(sp);
            this.notify_node.addChild(sp,i);
        }
    },
    replaceCard:function( index , card){
        if( this.curCardsSP[index]){
            var sp = this.createCard(card);
            sp.setTag(card);
            sp.setPosition( this.curCardsSP[index].getPosition());
            this.curCards[index] = card;
            this.notify_node.removeChild( this.curCardsSP[index] );
            this.notify_node.addChild(sp,index);
            this.curCardsSP[index] = sp;
        }
    },
    //播放结束动画
    runEndAction:function(){
        if(this.curCardsSP.length < 1){
            return ;
        }
        var rotateTime = 0.4;

        var tag = this.curCardsSP[0].getTag();
        if(tag != 0 ||!this.curCards[0] || this.isRun ){return ;}
        this.isRun = true;
        var sp = this.createCard(this.curCards[0]);
        sp.setTag(this.curCards[0]);
        sp.setPosition(this.curCardsSP[0].getPosition());
        sp.setRotationY(-90);
        sp.setLocalZOrder(0);
        this.notify_node.addChild(sp);

        // var seq1 =  new cc.Sequence(new cc.MoveBy( 0.5 , -1 * sp.getContentSize().width , 0 ),
        //     new cc.CallFunc(function () {
        //         sp.setPosition(this.curCardsSP[0].getPosition());
        //         var seq2 = new cc.Sequence( new cc.RotateBy(rotateTime, 0, 90) , new cc.CallFunc(function () {
        //             this.curCardsSP[0].setVisible(false);
        //             sp.runAction( new cc.Sequence(
        //                                     new cc.RotateBy(rotateTime, 0, 90) ,
        //                                     new cc.MoveBy( 0.5 , 1 * sp.getContentSize().width , 0 ),
        //                                     new cc.CallFunc(function () {
        //                                         this.runCardType();
        //                                         this.curCardsSP[0] = sp;
        //
        //                                     },this)
        //                         )
        //             );
        //         },this) );
        //         this.curCardsSP[0].runAction(seq2);
        //     },this)
        // );
        var spa1,call1;
        spa1 =  new cc.Spawn(
            new cc.MoveBy( 0.5 , -1 * sp.getContentSize().width , 0 ),
            new cc.RotateBy(rotateTime, 0, 90)
        );

        call1 =  new cc.CallFunc(function ( runder , sp) {
            sp.setPosition( runder.getPosition());
            runder.setVisible(false);
            var spa2 =  new cc.Spawn(
                new cc.MoveBy( 0.5 , sp.getContentSize().width , 0 ),
                new cc.RotateBy(rotateTime, 0, 90)
            );
            var call2 =  new cc.CallFunc(function (runder , sp) {
                this.runCardType();
                this.curCardsSP[0] = sp;
            },this,sp);
            sp.runAction(  new cc.Sequence(spa2  , call2)  ) ;
        },this ,sp);

        this.curCardsSP[0].runAction( new cc.Sequence(spa1,call1) );

    },
    runCardType:function(){
        if(this.isRunType){
            return ;
        }
        this.isRunType = true;
        var type = gameclass.mod_sdb.bombComputer(this.curCards);
        // 0 :爆牌  1：高牌   2：十点半  3: 五小  4：花五小  5：天王
        var imgs = [
            res.sdb_endBomb , res.sdb_endGaoPai , res.sdb_endShiDianBan ,
            res.sdb_endWuXiao , res.sdb_endHuaWuXiao , res.sdb_endTianWang
        ];
        var node = new cc.Sprite(imgs[type]);
        var starPos = [-100,-100,-40,30,30];

        node.setPosition( starPos[this.index]  , 600);
        node.setOpacity(0);
        this.notify_node.addChild(node,10);
        var spa =  new cc.Spawn( new cc.MoveBy(0.3, 0 , -625) , new cc.FadeIn(0.4));
        node.runAction(spa);

        var sounds = [
            g_music.sdb_boomCard,g_music.sdb_tallCard,g_music.sdb_tenHalf,
            g_music.sdb_fiveSmall,g_music.sdb_hwx,g_music.sdb_king,
        ];
        mod_sound.playeffect(sounds[type],false);

    },
    /*
    * 开局前清空
    * */
    clearCards:function(){
        this.isRun = this.isRunType = false;
        this.curCardsSP = [];
        this.curCards = [];
        this.notify_node.removeAllChildren();
    },

    /*
     * 创建牌
     * */
    createCard : function(card,up) {
        var abcd = ["a","d","b","c"];
        var point = Math.floor(card/10);
        var type = card%10;
        var spr = cc.Sprite.create();
        if (card <= 0){
            spr.setTexture(res.pokerBei);
        }else{
            spr.initWithSpriteFrameName("card_" + point +  abcd[type - 1]+ ".png");
        }
        spr.setAnchorPoint(cc.p(0.5,0.5));
        spr.setScale(this.index == 0 ? 1.5 : 1.2);
        if(up){
            spr.setPositionY(20);
        }

        return spr;
    },

});
var sdb_betNumLayout = cc.Class.extend({
    node:null,
    btns:null,
    ctor: function (node) {
        this.node = node;
        this.btns = [];
        for(var i =0 ; i< 5 ; i++){
            var tempBtn =  this.node.getChildByName('gamebets'+ (i+1));
            tempBtn.setTag(i);
            this.btns.push( tempBtn );
        }
        this.setVisible(false);
    },
    setVisible:function(b){
        this.node.setVisible(b);
    },
    addTouchEndEventListenter:function(func){
        var _this = this;
        var temFun = function(sender , type){
            if(type != ccui.Widget.TOUCH_ENDED){
                return false;
            }
            func(sender,sender.getTag());
        }
        cc.each(this.btns , function(obj){
            obj.addTouchEventListener(temFun);
        });
    }

});

gameclass.sdbtable = gameclass.baseui.extend({
    sprite: null,
    node:null,
    mod_niuniu:null,
    playerHeads:null,
    //helpinfo_layout:null,
    betnum_layout:null,
    players:null,
    playersbp:null,
    ongameview:null,
    curround:null,
    buqiang:null,
    qiangzhuang:null,
    lunshu:null,
    zongzhu:null,
    danzhu:null,
    haveCard_Btn:null,//要牌按钮
    dontCard_Btn:null,//不要牌按钮
    ready_Btn:null, //开始按钮
    dispatcher_queue:null,
    //onchat:null,
    ctor: function () {
        this._super();
        this.players = [];
        this.playersbp = [];
        this.playerHeads = [];
    },
    show:function(){
        this.init();
    },

    setmod: function (_mod) {

        this.mod_sdb = _mod;
        this.mod_sdb.bindUI(this);

        var _this = this;
        var mod_login = this.game.mod_login;

        if(window.wx) {
            _this.share();
        }
        //else{
        //    _this.game.uimgr.showui("gameclass.msgboxui");
        //    _this.game.uimgr.uis["gameclass.msgboxui"].setString("请先安装微信");
        //}

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
    }
});


gameclass.sdbtable.prototype.onChat = function(index,data){
    if(data.type == 4){
        var sendIndex = this.mod_sdb.getPlayerIndexById(data.uid);
        var hitIndex = this.mod_sdb.getPlayerIndexById(JSON.parse(data.chat).hitUid);
        var _senderObj = JSON.parse(data.chat);
        mod_sound.playeffect(g_music["magic"+_senderObj.type],false);
        var _animateNode=new cc.Node();
        _animateNode.setScale(0.8);
        _senderObj.type+=1;
        var sucAnim = new sp.SkeletonAnimation(g_magic_chat["magic_chat_"+_senderObj.type+"_1_json"], g_magic_chat["magic_chat_"+_senderObj.type+"_1_atlas"]);
        sucAnim.setAnimation(0, 'animation', false);
        sucAnim.setAnchorPoint(0.5,0.5);
        _animateNode.addChild(sucAnim);
        var senderSize = this.playerHeads[sendIndex].node.getContentSize();
        var senderPos=this.playerHeads[sendIndex].node.getPosition();
        _animateNode.setPosition(senderPos.x+senderSize.width/2,senderPos.y+senderSize.height/2);
        var hitSize = this.playerHeads[hitIndex].node.getContentSize();
        var hitPos = this.playerHeads[hitIndex].node.getPosition();
        this.node.addChild(_animateNode);
        _animateNode.runAction(cc.sequence(cc.delayTime(1),cc.spawn(cc.rotateTo(0.5,360),cc.moveTo(0.5,cc.p(hitPos.x+hitSize.width/2,hitPos.y+hitSize.height/2))),cc.callFunc(function(_animateNode,sucAnim){
            sucAnim.removeFromParent(true);
            var sucAnim1 = new sp.SkeletonAnimation(g_magic_chat["magic_chat_"+_senderObj.type+"_2_json"], g_magic_chat["magic_chat_"+_senderObj.type+"_2_atlas"]);
            sucAnim1.setAnimation(0, 'animation', false);
            sucAnim1.setAnchorPoint(0.5,0.5);
            _animateNode.addChild(sucAnim1);
            _animateNode.scheduleOnce(function(){
                _animateNode.removeFromParent(true)
            },1)
        },_animateNode,sucAnim)))
    }else{
        this.playerHeads[index].showCart(data);
    }
}


gameclass.sdbtable.prototype.setRoomInfo = function(data){
    var _this = this;
    //修改房间号  局数   时间

    ccui.helper.seekWidgetByName(_this.node, "roomnum").setString("房间号:"+data.roomid);
    ccui.helper.seekWidgetByName(_this.node, "zongzhu").setString(data.mulripleType+1 + "分");
    ccui.helper.seekWidgetByName(_this.node, "sdbb_text").setString("十点半");
    ccui.helper.seekWidgetByName(_this.node, "sdb_bei_text").setString("x"+(data.betType+2));

    ccui.helper.seekWidgetByName(_this.node, "zongzhutext").setString(data.bankerType == 0 ? "房主庄":"赢家庄");

    //ccui.helper.seekWidgetByName(_this.node, "roomnum_0").setString(this.getDate1(data.time));
    var curstep = data.step;
    if (curstep > data.maxStep){
        curstep =data.maxStep;
    } else if(curstep == 0) {
        curstep = 1;
    }
    ccui.helper.seekWidgetByName(_this.node, "curround").setString("局数:" + curstep + "/" + data.maxStep);

    //抵住  10点半 倍速
};


/*
* 开局前 玩家离开当前游戏
* */
gameclass.sdbtable.prototype.userExitRoom = function(index){

        this.playerHeads[index].reset();
        this.playerHeads[index].setVisible(false);

};

/*
* 开局后 玩家掉线
* */
gameclass.sdbtable.prototype.userLineOut = function(index,data){
    if(data.line)
        this.playerHeads[index].off_line.setVisible(false);
    else
        this.playerHeads[index].off_line.setVisible(true);
    gameclass.mod_base.showtximg(this.playerHeads[index].head_img , this.playerHeads[index].head_url, 0, 0 , "im_headbg5", !data.line );
};



/*
*  setCurPlayer   箭头指向当前玩家
* */
gameclass.sdbtable.prototype.setCurPlayer = function(index){
    this.curStepPlayer = index;
    //cc.each(this.playerHeads,function(o,i){
    //    o.arrow_img.setVisible(i==index);
    //});
    for(var i = 0;i < this.playerHeads.length;i++){
        if(i==index){
            this.createProgress(this.playerHeads[i].node);
        }else{
            if(this.playerHeads[i].node.getChildByTag(123321)){
                this.playerHeads[i].node.getChildByTag(123321).removeFromParent(true);
            }
        }
    }
};


gameclass.sdbtable.prototype.createProgress = function(playerHead){
    if(playerHead.getChildByTag(123321)){
        playerHead.getChildByTag(123321).removeFromParent(true);
    }
    var to1 = cc.progressFromTo(15,100,0);
    var timer = new cc.ProgressTimer(new cc.Sprite(res.progressBar));
    timer.setAnchorPoint(0.5,0.5);
    timer.type = cc.ProgressTimer.TYPE_RADIAL;
    timer.setReverseDirection(true);
    //timer.setScale(0.9);
    //timer.setColor(cc.color(255,215,0));
    timer.setTag(123321);
    playerHead.addChild(timer);
    timer.setLocalZOrder(9998);
    playerHead.getChildByName("zhuang_img").setLocalZOrder(9999);
    timer.setPosition(playerHead.getChildByName("icon_img").getPosition());
    timer.runAction(to1.repeatForever());
    //return timer;
}

/*
* 打开倍数选择
* */
gameclass.sdbtable.prototype.openBetLayout = function(){
    this.haveCard_Btn.setEnabled(false);
    this.haveCard_Btn.setBright(false);
    this.dontCard_Btn.setEnabled(false);
    this.dontCard_Btn.setBright(false);
    var _this = this;
    this.node.scheduleOnce(function(){
        _this.betnum_layout.setVisible(_this.curStepPlayer === 0);
    },0.5)
}

gameclass.sdbtable.prototype.dispatcher_send = function (func) {
    if( this.dispatcher_queue.length < 1) {
        if(func){
            func.apply(this);
        }
        return;
    }
    var _this = this;
    var size = this.node.getContentSize();
    var sp = this.createCard(0);
    var startPos = cc.p(size.width * 0.5 , size.height - sp.getContentSize().height / 2 - 100);
    sp.setPosition(startPos);
    this.node.addChild(sp);
    var data = this.dispatcher_queue.shift();
    var endPos = this.playerHeads[data.index].getNotifyPos();
    var call = new cc.CallFunc(function () {
        this.node.removeChild(sp);
        this.playerHeads[data.index].sendCards(data.cards);
        this.dispatcher_send(func);
    },this);
    var seq = new cc.Sequence(new cc.Spawn( new cc.MoveTo(0.4,endPos ) , new cc.FadeOut(0.4) ) , call);
    sp.runAction(seq);
    mod_sound.playeffect(g_music.sdb_dealCard,false);
}


/*
 *  sgameReady  游戏开始
 * */
gameclass.sdbtable.prototype.gameReady = function(playerInfo,roominfo){
    var _this = this;
    this.haveCard_Btn.setVisible(true);
    this.dontCard_Btn.setVisible(true);
    this.haveCard_Btn.setEnabled(false);
    this.haveCard_Btn.setBright(false);
    this.dontCard_Btn.setEnabled(false);
    this.dontCard_Btn.setBright(false);
    ccui.helper.seekWidgetByName(this.node,"invitebtn").setVisible(false);
    this.ready_Btn.setVisible(false);
    this.dispatcher_queue = [];

    cc.each(this.playerHeads,function(o,i){
        if(playerInfo[i]){
            o.clearCards();
            o.setVisible(true);
            if(playerInfo[i].dealer){
                o.zhuang_img.setVisible(true);
            }
            if(playerInfo[i].bets){
                _this.showBetImg( i , playerInfo[i].bets);
            }
            o.score_text.setString(playerInfo[i].total);
            _this.dispatcher_queue.push({
                index:i,
                cards:playerInfo[i].card
            });
           // _this.sendCards(i,playerInfo[i].card);
        }
        cc.log("roominfo");

        o.ok_img.setVisible(o.ready);
    });

    this.refreshStep(roominfo);
    this.dispatcher_send();
    cc.log('ready kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    /*******************  断线重连的需要判断的   *******************************/
    var bShow = false;
    // 该不该操作
    if(this.curStepPlayer == 0){
        // 该操作
        // 判断是不是装
        if( playerInfo[0].dealer) {
            //是装
            bShow = true;
        }else{
            if(playerInfo[0].bets == 0){
                bShow = false;
                this.openBetLayout();
            }else{
              bShow = true;
            }
        }
    }
    this.haveCard_Btn.setEnabled(bShow);
    this.haveCard_Btn.setBright(bShow);
    this.dontCard_Btn.setEnabled(bShow);
    this.dontCard_Btn.setBright(bShow);
    //判断还能不呢要
    if( 0 ==gameclass.mod_sdb.bombComputer(playerInfo[0].card ) ){
        this.haveCard_Btn.setEnabled(false);
        this.haveCard_Btn.setBright(false);
    }

};

/*
* 断线重连
* */
gameclass.sdbtable.prototype.reconnection = function(data,roominfo , players){

    this.haveCard_Btn.setVisible(false);
    this.dontCard_Btn.setVisible(false);
    this.haveCard_Btn.setEnabled(false);
    this.haveCard_Btn.setBright(false);
    this.dontCard_Btn.setEnabled(false);
    this.dontCard_Btn.setBright(false);
    ccui.helper.seekWidgetByName(this.node,"invitebtn").setVisible(false);
    this.ready_Btn.setVisible(true);

    cc.log(data);
    cc.each(this.playerHeads,function(o,i){
        if(data[i]){
            o.setVisible(true);
            if(data[i].dealer){
                o.zhuang_img.setVisible(true);
            }
            o.score_text.setString(data[i].total);
        }
        // o.ok_img.setVisible(false);
    });
    if(players[0] && players[0].ready){
        this.ready_Btn.setVisible(false);
    }
};

/*
* 游戏结束
* */
gameclass.sdbtable.prototype.gameEnd = function(playerInfo,oinfo,roominfo){
    var _this = this;
    var bType = false;
    cc.each(this.playerHeads,function(o,i){
        if(playerInfo[i]){
            o.score_text.setString(playerInfo[i].total);
            var tembsend = _this.sendCards(i,playerInfo[i].card , function(){
               _this.runSelfCardType();
            });
            if(tembsend === false && i==0){
                bType = true;
            }
            _this.haveCard_Btn.setVisible(false);
            _this.dontCard_Btn.setVisible(false);
        }
    });

    if(bType){
        _this.runSelfCardType();
    }

    cc.log(playerInfo);
    this.runEndAction(function () {
        this.game.uimgr.showui("gameclass.sdbEndPlayWindow").setParentUI(this).setInfo(oinfo,roominfo);
    });
};

/*
* 播放自己结束后的动画
* */
gameclass.sdbtable.prototype.runSelfCardType = function(){

    this.node.runAction(new cc.Sequence( new cc.DelayTime(0.1) ,  new cc.CallFunc(function () {
        this.playerHeads[0].runCardType();
    },this)));

}

/*
 * 玩家结束动画,一般用于闲家牌大
 * */
gameclass.sdbtable.prototype.runPlayerEndAction = function(index){

    this.node.runAction(new cc.Sequence( new cc.DelayTime(0.8) ,  new cc.CallFunc(function () {
        this.playerHeads[index].runEndAction();
    },this)));

}
/*
* 所有玩家结束动画
* */

gameclass.sdbtable.prototype.runEndAction = function(func){

    this.node.runAction(new cc.Sequence( new cc.DelayTime(0.6) ,  new cc.CallFunc(function () {
            cc.each(this.playerHeads,function(o,i){
                o.runEndAction();
            });
            var call = new cc.CallFunc(function () {
                func.apply(this);
            },this);
            var seq = new cc.Sequence( new cc.DelayTime(2) , call);
            this.node.runAction(seq);
    },this)));

}


/*
 * 下一局
 * */
gameclass.sdbtable.prototype.gameNext = function(){
    var _this = this;
    _this.game.uimgr.closeui("gameclass.sdbEndPlayWindow");
    if(_this.mod_sdb.isover){
        _this.gameBye();
        return ;
    }
    cc.each(_this.playerHeads,function(o,i){
        o.gameNext();
    });
    _this.ready_Btn.setVisible(true);
};


/*
 * 游戏最终结束
 * */
gameclass.sdbtable.prototype.gameBye = function(data,roominfo){
    //var _isvisable=true;
    //if(roominfo.step==roominfo.maxStep&&this.mod_sdb._isThisGameOver){
    //    _isvisable=false;
    //}
    //this.node.runAction(new cc.Sequence( new cc.DelayTime(1) ,  new cc.CallFunc(function () {
    //
    //    this.game.uimgr.closeui("gameclass.sdbEndPlayWindow");
    //    this.game.uimgr.showui("gameclass.sdbEndWindow").setParentUI(this).setInfo(data,roominfo,_isvisable);
    //},this)));

    var _this = this;
    _this.game.uimgr.closeui("gameclass.sdbEndPlayWindow");
    _this.game.uimgr.showui("gameclass.sdbEndWindow").setParentUI(_this).setInfo(_this.mod_sdb);

};

gameclass.sdbtable.prototype.sendCards = function (index,cards,func){
    if(this.playerHeads[index].eqCards(cards)){
        return false;
    }
    if(this.playerHeads[index].eqLength(cards) ){
        this.playerHeads[index].sendCards(cards);
        return false;
    }
    this.dispatcher_queue = [];
    this.dispatcher_queue.push({
        index:index,
        cards:cards
    });
    this.dispatcher_send(function(){
        if(func){  func();  }
    });
    return true;
        // this.playerHeads[index].sendCards(cards);
}


gameclass.sdbtable.prototype.getDate1 = function(date){
    var d = new Date(date * 1000);    //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "-" +
        (d.getMonth() + 1) + "-" +
        (d.getDate()) + " " +
        (d.getHours()) + ":" +
        (d.getMinutes()) + ":" +
        (d.getSeconds());
    return date;
};

gameclass.sdbtable.prototype.updatePlayerinfo = function(data){
    var _this = this;
    cc.log("ip______xp");
    cc.log(data);

    cc.each(data, function(o,i){

        if(o){
            _this.playerHeads[i].setBaseInfo({
                name  : o.name,
                id    : 'ID:' + o.uid,
                head  : o.imgurl,
                uip  : o.ip,
                uid  : o.uid,
                address  : o.address,
                ready : o.ready,
                line:o.line,
                head_url : o.imgurl
            });
            _this.playerHeads[i].setVisible(1);

        }else{
            _this.userExitRoom(i);
        }

    });

    if(data[0] && data[0].ready){
        this.ready_Btn.setVisible(false);
    }

};

/*微信邀请文字*/
gameclass.sdbtable.prototype.share = function(){

    var ms = "10点半X2倍";
    this.mod_sdb.roominfo.betType == 0 ? ms : ms ="10点半X3倍";
    var bets = "房主庄";
    this.mod_sdb.roominfo.bankerType    == 0 ? bets : bets ="赢家庄";

    gameclass.mod_platform.invitefriend("房号[" + this.mod_sdb.roominfo.roomid + "]，[" + ms + "]，["+bets+"]，一共[" + this.mod_sdb.roominfo.maxStep + "]局。大家都在等您，快来吧。",
        this.mod_sdb.roominfo.roomid,
        "傲世娱乐-" +  this.mod_sdb.roominfo.roomid +"-经典十点半");
};



gameclass.sdbtable.prototype.checkSafe = function(people){
    this.safeLayer.checkSafe(people);
};

gameclass.sdbtable.prototype.init = function(){
    cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
    cc.spriteFrameCache.addSpriteFrames(res.ani1list);

    this.node = this.game.uimgr.createnode(res.sdbtable,true);

    this.node.setPosition((cc.winSize.width - this.node.getContentSize().width)/2,0);

    this.addChild(this.node);

    var _this = this;
    //this.helpinfo_layout = ccui.helper.seekWidgetByName(_this.node, "helpinfo");
    //this.helpinfo_layout.setVisible(false);
    _this.sharelayer = ccui.helper.seekWidgetByName(_this.node, "sharelayer");
    _this.sharelayer.setVisible(false);
    this.haveCard_Btn = ccui.helper.seekWidgetByName(_this.node,"haveCard_btn");
    this.haveCard_Btn.setEnabled(false);
    this.haveCard_Btn.setBright(false);
    this.dontCard_Btn = ccui.helper.seekWidgetByName(_this.node,"dontCard_Btn");
    this.dontCard_Btn.setEnabled(false);
    this.dontCard_Btn.setBright(false);
    this.haveCard_Btn.setVisible(false);
    this.dontCard_Btn.setVisible(false);
    this.ready_Btn = ccui.helper.seekWidgetByName(_this.node,"ready");
    this.curround =  ccui.helper.seekWidgetByName(_this.node, "curround");

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

    gameclass.createbtnpress(this.node, "ready", function () {
         _this.mod_sdb.gameready();
    });


    this.betnum_layout = new sdb_betNumLayout(ccui.helper.seekWidgetByName(this.node, "gamebets"));
    //this.betnum_layout.setVisible(true);
    this.betnum_layout.addTouchEndEventListenter(function(sender,index){   //监听倍数
            var arr = [1,2,3,4,5];
            _this.mod_sdb.setPlayerBet(arr[index]);
    });

    this.haveCard_Btn.addTouchEventListener(function(sender,type){
        if(type != ccui.Widget.TOUCH_ENDED){
            return false;
        }
        _this.mod_sdb.askCards(true);
    });

    this.dontCard_Btn.addTouchEventListener(function(sender,type){
        if(type != ccui.Widget.TOUCH_ENDED){
            return false;
        }
        _this.mod_sdb.askCards(false);
    });
    var showipinfo = function(sender,type){
        if(ccui.Widget.TOUCH_ENDED == type){
            //if(sender.index == 0) return;
            //var playerdata = _this.mod_sdb.getplayerdata(sender.index);
            var playerdata = _this.mod_sdb.persons[sender.index];
            _this.game.uimgr.showui("gameclass.chatMicLayer").setPlayerInfo(playerdata,_this.mod_sdb,sender.index);
        }
    }
    for (var i = 0;i < 5; i++){
        var head = ccui.helper.seekWidgetByName(this.node,"head_"+i);
        this.playerHeads[i] = new sdb_playerHead(head,i,this.node);
        head.getChildByName('c4').index = i;
        head.getChildByName('c4').addTouchEventListener(showipinfo);
    }
};


/*
* 显示玩家广播倍数
* */
gameclass.sdbtable.prototype.showBetImg = function(index,bet,card){


    this.playerHeads[index].showBet(bet);
    this.betnum_layout.setVisible(false);
    this.haveCard_Btn.setEnabled(index == 0);
    this.haveCard_Btn.setBright(index == 0);
    this.dontCard_Btn.setEnabled(index == 0);
    this.dontCard_Btn.setBright(index == 0);
    if(index == 0){
        this.playerHeads[index].replaceCard(0,card);
    }


    //播放加倍的声音
   // mod_sound.playeffect(g_music.sdb_double,false);

}

gameclass.sdbtable.prototype.showReady = function(index){

        this.playerHeads[index].ok_img.setVisible(true);
        if(index == 0){
            this.ready_Btn.setVisible(false);
        }

}
;


gameclass.sdbtable.prototype.disabledAsk = function() {

    this.haveCard_Btn.setEnabled(false);
    this.haveCard_Btn.setBright(false);
    //this.dontCard_Btn.setEnabled(false);
    //this.dontCard_Btn.setBright(false);

}



/***********************************************************************************************************************************************************
 *
 *
 *
 *   sdb代码结束
 *
 *
 *
 *
 *
 * ***/


gameclass.sdbtable.prototype.refreshStep = function(roominfo) {
    var curstep = roominfo.step;
    if (curstep > roominfo.maxStep){
        curstep = roominfo.maxStep;
    } else if(curstep == 0) {
        curstep = 1;
    }
    this.curround.setString("局数:" + curstep + "/" + roominfo.maxStep);
}


/*
* 发牌
* */
gameclass.sdbtable.prototype.createCard = function(card,up) {
    var abcd = ["a","d","b","c"];
    var point = Math.floor(card/10);
    var type = card%10;
    var spr = cc.Sprite.create();
    if (card <= 0){
        spr.setTexture(res.pokerBei);
    }else{
        spr.initWithSpriteFrameName("card_" + point +  abcd[type - 1]+ ".png");
    }
    spr.setAnchorPoint(cc.p(0.5,0.5));
    if(up){
        spr.setPositionY(20);
    }
    return spr;
};


gameclass.sdbtable.prototype.cratearrani = function(sprite1) {

    //var sprite1 = cc.Sprite.create(cc.spriteFrameCache.getSpriteFrame("1.png"));
    //sprite1.setPosition(cc.p(200, 150));
    //this.addChild(sprite1, g_GameZOrder.ui);
    var frames = [];
    for (var i = 1; i < 4; i++) {
        var frame = cc.spriteFrameCache.getSpriteFrame("down"+ i + ".png");
        frames.push(frame);
    }
    var animation = new cc.Animation(frames,0.2);
    var animate = new cc.Animate(animation);
    var action = animate.repeatForever();//new cc.RepeatForever(animate)
    sprite1.runAction(action);
}


