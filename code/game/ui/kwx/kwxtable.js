/**
 * Created by yang on 2016/11/9.
 */

gameclass.kwxtable = gameclass.baseui.extend({
    sprite: null,
    node:null,
    mod_kwx:null,
    players:null,
    ongameview:null,
    curround:null,
    buqiang:null,
    qiangzhuang:null,
    clock:null,
    clocktime:null,
    btnMyCards:null,
    isQipai:null,   // 是否自己起牌
    myCards:null,   // 自己手上的13张牌
    drawCard:null,  // 当前起的牌
    deskCardsNum:null,  // 打了多少张。
    seenCardsArray:null,    // 见过牌的数组，胡牌张数用得到
    spDisplayPeng:null,    // 碰牌按钮上的固定显示
    spDisplayGang:null,     // 杠牌按钮上的固定显示
    myFirstCardPointX:null,  // 设定自己手牌的起点位置
    myFirstCardPointY:null,  // 设定自己手牌的起点位置
    lastPlayedCard:null,    // 上一张出牌精灵，（如果被碰、杠）需要捡起。
    lastChairNum:0,  // 记录上一张打出牌的座位号，如果被碰杠，显示打出的牌要-1
    rightPengGang:null, //
    leftPengGang:null,  // 碰的牌需要记下来。不然没法知道碰了之后再杠什么
    deskliangCards:null,    // 有杀马存在还得记录亮的什么牌。
    myPengGang:null,
    //isCaGang:null,  // 是否为擦杠
    //isAnGang:null,  // 是否为暗杠
    anGangCard:null,    // 可以暗杠的牌，点击杠的时候发送给服务端。
    cleanTag:null,  // 显示的精灵，需要根据标签来删除
    isLiang:null,   // 是否亮牌，亮牌的时候要
    liangArray:null,    // 记录亮牌信息的数组结构
    kanLiangCards:null, // 胡牌时，亮凑成一坎的两张。
    bStatusLiang:null,  // 是否处于已亮牌状态。
    wantCards:null, // 别人亮牌要胡的牌，不能打。
    spLiangCardsArray:null, // 亮牌的精灵数组，杠的时候要改变位置。
    bAllLiang:null,  // 如果胡七对又胡别的，一定是全亮
    //bGang:null,     // 亮牌如果可以杠，则不自动打出去。
    cardliangArray:null,    // 发送给服务器的亮牌数组
    wantArray:null,     // 发送给服务器的胡牌数组
    bShouDongLiang:null,    // 手动亮牌
    cardnum:null,   // 剩余张数
    remainRround: 0,
    liangcardStructArr:null,
    liangcardArr:null,
    hucardStruct:null,
    hucardStructArr:null,
    waitImg:null,
    jiangCardLiang:0,
    gangcard:0,
    gangcardbgX:0,
    pingnum:0,
    pingflag:true,
    tuoguan:false,
    kougoldtxt:null,
    countdown:null,
    curtime:0,
    curSelCard:null,
    drawcardposX:0,
    quanzhongjiang:0,
    opertorcount:0,
    ctor: function () {
        this._super();
        this.players = [];
        this.btnMyCards = [];
        this.myCards = [];
        this.isQipai = false;
        this.deskCardsNum = [0, 0, 0]; // 3家分别打了多少张牌在桌面上
        this.myFirstCardPointX = 20;
        this.myFirstCardPointY = 10;
        this.rightPengGang = [];
        this.leftPengGang = [];
        this.myPengGang = [];
        this.cleanTag = 2000;
        this.liangArray = [];
        this.isLiang = false;
        this.kanLiangCards = [];
        this.bStatusLiang = false;
        this.wantCards = [];
        this.spLiangCardsArray = [];
        this.bAllLiang = false;
        //this.bGang = false;
        this.cardliangArray = [];
        this.wantArray = [];
        this.bShouDongLiang = false;
        this.seenCardsArray = [];
        this.deskliangCards = [];
        this.liangcardArr = [[],[],[],[]]; //0angang,1kezi,2jiang,3shunzi
        this.liangcardStructArr = [];
        this.hucardStruct = [[],[],[],[],[],[]];
        this.hucardStructArr = [];
        this.opertorcount = 0;
        //this.cardwidth = 75;
    },
    show:function(){
        //this.init();
        cc.spriteFrameCache.addSpriteFrames(res.mjcardsplist);
    },
    setmod: function (_mod_kwx) {
        this.mod_kwx = _mod_kwx;
        this.mod_kwx.bindUI(this);
        this.init();
        var _this    = this;
        var mod_login= this.game.mod_login;
        var pointer  = ccui.helper.seekWidgetByName( this.node, "pointer" );
        pointer.setVisible( false );
        ccui.helper.seekWidgetByName(this.node, "shangloubg").setVisible(false);
        var waitjson; var waitskeleton;
        if(this.mod_kwx.roominfo.type >= gameclass.gamegoldkwx) {
            waitjson = res.waitgold_json;
            waitskeleton = res.waitgold_skeleton;
        }else{
            waitjson = res.wait_json;
            waitskeleton = res.wait_skeleton;
        }

        this.waitImg = new sp.SkeletonAnimation(waitjson, waitskeleton);
        this.waitImg.setAnimation(10, 'animation', true);
        ccui.helper.seekWidgetByName(this.node, "waiting").addChild(this.waitImg);
        if(window.wx) {
            _this.share();
        }

        this.wantCards[0] = new Array();
        this.wantCards[1] = new Array();
        this.wantCards[2] = new Array();

        if (_this.mod_kwx.roominfo.time != 0){
            _this.game.uimgr.showui("gameclass.exitroom",false);
            _this.game.uimgr.uis["gameclass.exitroom"].setData(_this.mod_kwx,_this.mod_kwx.roominfo);
        }

        _this.Onroominfo();

        this.mod_kwx.kwxtablepingflag = function( ) {
            _this.pingflag = true;
        }

        var titiltime =  ccui.helper.seekWidgetByName(_this.node, "roomTitle");
        var reftime = function () {
            var myDate = new Date();
            var str = myDate.Format("  MM-dd hh:mm:ss");
            titiltime.setString(str);
        };
        reftime();
        var func = cc.repeatForever(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            reftime();
            _this.kwxtableping();
            _this.kwxdaojishi();
        })));
        titiltime.runAction(func);

        this.mod_kwx.onupdateroominfo = function () {
            _this.refplayerinfo();
        };

        this.mod_kwx.ongamekwxinfo = function(gamekwxinfo){
            var len = gamekwxinfo.info.length;//卡五星为3人
            for (var i = 0; i < len; i++){
                for (var iChair=0; iChair<3; iChair++) {
                    if (_this.mod_kwx.chairinfo[iChair].uid == gamekwxinfo.info[i].uid) {
                        //cc.log(iChair,gamekwxinfo.info[i].total)
                        _this.mod_kwx.chairinfo[iChair].totalscore = gamekwxinfo.info[i].total;
                        if(iChair == 2) iChair = 3;
                        var psc = "playerscore"+iChair;
                        var score = ccui.helper.seekWidgetByName( _this.node, psc );
                        score.setString( ""+gameclass.changeShow(gamekwxinfo.info[i].total) );
                        break;
                    }
                }
                _this.UpdatePiao(gamekwxinfo.info[i].uid, gamekwxinfo.info[i].piao);
            }
        };

        //this.mod_kwx.onchat = function(data){
        //    if ( data.type == 3 )//语音消息
        //        gameclass.mod_platform.playurl(data.chat);
        //};
        this.mod_kwx.chatshowinfo = function(data){
            var _chair = _this.mod_kwx.getplayerchair(data.uid);
            if (_chair == 2) _chair = 3;
            //cc.log("data.type = "+data.type);
            //cc.log("data.chat = "+data.chat);
            if (data.type == 1){
                var strc = data.chat;
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
                ccui.helper.seekWidgetByName(_this.node, "speakbg"+_chair).setVisible(true);
                ccui.helper.seekWidgetByName(_this.node, "voice"+_chair).setVisible(false);
                var chattext = ccui.helper.seekWidgetByName(_this.node, "talk"+_chair);
                chattext.setColor(cc.color(205,112,84));
                chattext.setString(strc);
                var _txtwidth = ccui.helper.seekWidgetByName(_this.node, "talk"+_chair).getContentSize().width;
                cc.log("!!!!!!!!!!!!!!!!!!",_txtwidth);
                ccui.helper.seekWidgetByName(_this.node, "speakbg"+_chair).setContentSize(_txtwidth,110);
                ccui.helper.seekWidgetByName(_this.node, "talk"+_chair).setContentSize(_txtwidth,70);
                ccui.helper.seekWidgetByName(_this.node, "talk"+_chair).setPosition(10,70);
                var seq = cc.sequence(cc.delayTime(1.5),cc.callFunc(function () {
                    ccui.helper.seekWidgetByName(_this.node, "speakbg"+_chair).setVisible(false);
                }));
                _this.runAction(seq);
            }
            else if(data.type == 2){
                var index = Math.floor(data.chat);
                var spr = new sp.SkeletonAnimation(g_chat_expression["expression"+index+"_json"],g_chat_expression["expression"+index+"_atlas"]);
                spr.setAnimation(0, 'animation', false);
                spr.setAnchorPoint(0.5, 0.5);
                //var spr = new cc.Sprite();
                //spr.initWithFile(g_face[index]);
                spr.setPosition(ccui.helper.seekWidgetByName(_this.node, "head"+_chair).getPosition());
                _this.node.addChild(spr,100);
                var seq = cc.sequence(cc.delayTime(1.5),cc.callFunc(function () {
                    _this.node.removeChild(spr);
                }));
                _this.runAction(seq);
            }
            else if(data.type == 3){
                ccui.helper.seekWidgetByName(_this.node, "speakbg"+_chair).setContentSize(40,120);
                ccui.helper.seekWidgetByName(_this.node, "speakbg"+_chair).setVisible(true);
                ccui.helper.seekWidgetByName(_this.node, "voice"+_chair).setVisible(true);
                ccui.helper.seekWidgetByName(_this.node, "talk"+_chair).setString("");
                var seq = cc.sequence(cc.delayTime(1.5),cc.callFunc(function () {
                    ccui.helper.seekWidgetByName(_this.node, "speakbg"+_chair).setVisible(false);
                }));
                _this.runAction(seq);
                gameclass.mod_platform.playurl(data.chat);
            }
            else if(data.type == 4){
                var _senderObj = JSON.parse(data.chat);
                var _animateNode = new cc.Node();
                _animateNode.setScale(0.8);
                mod_sound.playeffect(g_music["magic"+_senderObj.type],false);
                _senderObj.type += 1;
                var sucAnim = new sp.SkeletonAnimation(g_magic_chat["magic_chat_" + _senderObj.type + "_1_json"], g_magic_chat["magic_chat_" + _senderObj.type + "_1_atlas"]);
                sucAnim.setAnimation(0, 'animation', false);
                sucAnim.setAnchorPoint(0.5, 0.5);
                _animateNode.addChild(sucAnim);
                var senderPos = ccui.helper.seekWidgetByName(_this.node,"head"+_chair).getPosition();
                _animateNode.setPosition(senderPos);
                _animateNode.setLocalZOrder(100);
                var hitIndex=_this.mod_kwx.getplayerchair(_senderObj.hitUid);
                if(hitIndex == 2) hitIndex = 3;
                var hitPos = ccui.helper.seekWidgetByName(_this.node,"head" + hitIndex).getPosition();
                _this.node.addChild(_animateNode);
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
        };

        _this.remainRround = _this.mod_kwx.roominfo.maxstep - _this.mod_kwx.roominfo.step;

        var roomnumtxt = ccui.helper.seekWidgetByName(_this.node, "roomnum");
        var golddifentxt = ccui.helper.seekWidgetByName(_this.node, "golddifen");
        var curround_bg = ccui.helper.seekWidgetByName(_this.node, "curround_bg");
        if(_this.mod_kwx.roominfo.type >= gameclass.gamegoldkwx){
            curround_bg.setVisible(false);
            roomnumtxt.setVisible(false);
            golddifentxt.setVisible(true);
            golddifentxt.setString("底分: " + _this.mod_kwx.roominfo.golddifen);
        }else{
            curround_bg.setVisible(true);
            ccui.helper.seekWidgetByName(_this.node, "curround").setString("剩" + _this.remainRround + "局");
            golddifentxt.setVisible(false);
            roomnumtxt.setVisible(true);
            roomnumtxt.setString("房号:"+_this.mod_kwx.roominfo.roomid.toString());
        }

        this.mod_kwx.ongame_betpiao = function (betpiao_info) {
            _this.UpdatePiao(betpiao_info.uid, betpiao_info.bets);
        };

        //this.mod_kwx.viewcontroler = this;
        // LA 20161215 一盘开始
        this.mod_kwx.ongamekwxbegin = function(gamekwxbegin_info,_bool){
            _this.cardnum = 44;
            if(_this.mod_kwx.roominfo.type >= gameclass.gamegoldkwx){
                ccui.helper.seekWidgetByName(_this.node, "ready_btn").setVisible(false);
                ccui.helper.seekWidgetByName(_this.node, "distroyroom_g").setVisible(false);
            }else{
                ccui.helper.seekWidgetByName(_this.node, "invitebtn").setVisible(false);
                ccui.helper.seekWidgetByName(_this.node, "distroyroom").setVisible(false);
            }
            if(_this.waitImg)
            {
                _this.waitImg.clearTrack(10);
                _this.waitImg.removeFromParent();
                _this.waitImg = null;
            }
            ccui.helper.seekWidgetByName(_this.node, "arrownode").setVisible(true);
            //ccui.helper.seekWidgetByName(_this.node, "roomcardnum").setString(45);
            _this.remainRround = _this.mod_kwx.roominfo.maxstep - _this.mod_kwx.roominfo.step;
            ccui.helper.seekWidgetByName(_this.node, "curround").setString("剩"+ _this.remainRround + "局");
            // LA 20161215 开始后头像移动。
            for (var i=0;i<3;i++)
            {
                _this.UpdatePiao(gamekwxbegin_info.info[i].uid, gamekwxbegin_info.info[i].piao)
                // 卡五星没有第3个位置。。。。后面把这个处理改掉才好。
                if (i==2)
                    i = 3;
                var act = cc.moveTo(1, ccui.helper.seekWidgetByName(_this.node, "headdst"+i).getPosition());
                var spriteHead = ccui.helper.seekWidgetByName(_this.node, "head"+i);
                spriteHead.setLocalZOrder(99);
                spriteHead.runAction(act);
                //spriteHead.runAction(cc.scaleTo(1.0, 0.75));
            }

            //骰子效果
            ccui.helper.seekWidgetByName(_this.node, "shangloubg").setVisible(false);
            if(_bool && gamekwxbegin_info.sl)
            {
                if(gamekwxbegin_info.sl[0] != 0)
                {
                    _this.touziFunc(gamekwxbegin_info.sl);
                }
            }
        };

        // LA 20170113 重新进入游戏，显示桌面信息。
        this.mod_kwx.RedisplayDesk = function(kwx_info){

            var leftpglen = 0; var rightpglen = 0; var leftlialen = 0; var rightlialen = 0;
            _this.cardnum = kwx_info.num;
            if(_this.mod_kwx.roominfo.type >= gameclass.gamegoldkwx){
                ccui.helper.seekWidgetByName(_this.node, "ready_btn").setVisible(false);
                ccui.helper.seekWidgetByName(_this.node, "distroyroom_g").setVisible(false);
            }else{
                ccui.helper.seekWidgetByName(_this.node, "invitebtn").setVisible(false);
                ccui.helper.seekWidgetByName(_this.node, "distroyroom").setVisible(false);
            }
            ccui.helper.seekWidgetByName(_this.node, "arrownode").setVisible(true);
            ccui.helper.seekWidgetByName(_this.node, "roomcardnum").setString("剩牌: "+_this.cardnum +"张");

            _this.mod_kwx.laststepcard = kwx_info.lastcard;
            var _boolt = true; var curchupaichair = 0;
            for(var i=0; i<3; i++)
            {
                for(var iInfo=0; iInfo<kwx_info.info.length; iInfo++)
                {
                    if (_this.mod_kwx.chairinfo[i].uid == kwx_info.info[iInfo].uid)
                    {
                        var templen = kwx_info.info[iInfo].card.cardcg.length + kwx_info.info[iInfo].card.cardp.length + kwx_info.info[iInfo].card.cardmg.length + kwx_info.info[iInfo].card.cardag.length;

                        if (i == 1) {
                            rightpglen = templen;
                            rightlialen = kwx_info.info[iInfo].card.cardl.length;
                        }
                        else if (i == 2) {
                            leftpglen = templen;
                            leftlialen =kwx_info.info[iInfo].card.cardl.length;
                        }
                        _this.wantCards[i] = [];
                        _this.wantCards[i]= kwx_info.info[iInfo].card.want;
                        if(_this.wantCards[i].length > 0)
                        {
                            var _lia = "";
                            if(i==0) _lia = "liang0";
                            if(i==1) _lia = "liang1";
                            if(i==2) _lia = "liang3";
                            ccui.helper.seekWidgetByName(_this.node, _lia).setVisible(true);
                        }
                        if(_this.mod_kwx.chairinfo[i].uid == kwx_info.curstep && _boolt)
                        {
                            _boolt = false;
                            curchupaichair = i;
                            _this.showArrow(i);
                        }
                    }
                    else {
                        continue;
                    }
                }
            }

            var spBackLeft; var spBackRight;
            var lt = 0; var rt = 0;
            // 显示左右的牌
            var leftlens = leftpglen*3+leftlialen;
            var rightlens = rightpglen*3+rightlialen;
            var Lbeginposy = 528+(leftlens*6+(leftpglen+Math.ceil(leftlialen/20))*20)*0.5; //碰杠后位置自适应
            var Rbeginposy = 232-(rightlens*6+(rightpglen+Math.ceil(rightlialen/20))*20)*0.5;
            for (var i=0; i<13; i++) {
                spBackLeft = _this.createpenggangCard(false,0,2,0);
                spBackLeft.setPosition(150, Lbeginposy-lt);
                //var rt = i * 29;
                if(i < leftlens) {
                    lt += 29;
                    if(i > 0){
                        if((i+1)%3 == 0 && i < leftpglen*3) {
                            lt += 15;
                            if((i+1)==leftlens && leftpglen*3 == leftlens){
                                lt += 4;//碰牌和手牌需要 相隔19个像素
                            }
                        }
                        else if(leftlialen > 0 && i == leftlens-1){
                            lt += 19;//亮牌和手牌需要 相隔19个像素
                        }
                    }
                }
                else {
                    lt += 23;//手牌间距
                }
                spBackLeft.setTag(i + 1300);
                spBackLeft.setLocalZOrder(i);
                _this.node.addChild(spBackLeft);

                //spBackRight = new cc.Sprite(res.M_back_Right);
                spBackRight = _this.createpenggangCard(false,0,1,0);
                spBackRight.setPosition(1000, Rbeginposy + rt);
                if(i < rightlens) {
                    rt += 29;
                    if (i > 0){
                        if((i+1)%3 == 0 && i < rightpglen*3) {
                            rt += 15;
                            if((i+1)==rightlens && rightpglen*3 == rightlens){
                                rt += 4;//碰牌和手牌需要 相隔19个像素
                            }
                        }
                        else if(rightlialen > 0 && i == rightlens-1){
                            rt += 19;//亮牌和手牌需要 相隔19个像素
                        }
                    }
                }
                else {
                    rt += 23;//手牌间距
                }
                spBackRight.setTag(i + 1200);
                spBackRight.setLocalZOrder(20 - i);
                _this.node.addChild(spBackRight);
                //if(i == 12) rightpglen = rt;
                //if( i >0 && (i+1)%3 == 0 &&  parseInt((i+1)/3)-1 <= parseInt((13-rightcardlen)/3) ) rt += 8;
            }
            // 如果有碰牌，不起牌也需要多显示一张。
            spBackLeft = _this.createpenggangCard(false,0,2,0);
            spBackLeft.setPosition(150, Lbeginposy - lt-33);
            spBackLeft.setTag(13 + 1300);
            spBackLeft.setLocalZOrder(13);
            _this.node.addChild(spBackLeft);
            if(curchupaichair != 2) spBackLeft.setVisible(false);

            spBackRight = _this.createpenggangCard(false,0,1,0);
            spBackRight.setPosition(1000, Rbeginposy + rt + 33);
            spBackRight.setTag(13 + 1200);
            spBackRight.setLocalZOrder(20 - 13);
            _this.node.addChild(spBackRight);
            if(curchupaichair != 1) spBackRight.setVisible(false);
            for(var iInfo=0; iInfo<kwx_info.info.length; iInfo++){

                for (var i=0; i<3; i++) {

                    if (_this.mod_kwx.chairinfo[i].uid == kwx_info.info[iInfo].uid) {
                        switch (i) {
                            case 0:
                                var precardPosx = _this.myFirstCardPointX;
                                var tempwd = 76;
                                for(var iPeng=0; iPeng<kwx_info.info[iInfo].card.cardp.length; iPeng++){
                                    var penggangNode = {
                                        "penggang": true,
                                        "card": kwx_info.info[iInfo].card.cardp[iPeng],
                                    };
                                    _this.myPengGang.push(penggangNode);

                                    for (var j=0; j<3; j++){
                                        _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardp[iPeng]);
                                        var spPengCard = _this.createpenggangCard(false,kwx_info.info[iInfo].card.cardp[iPeng],0,1);
                                        var temphg = spPengCard.getContentSize().height;
                                        spPengCard.setPosition(precardPosx + tempwd*0.5, _this.myFirstCardPointY + temphg*0.5);
                                        precardPosx += tempwd;
                                        if(j == 2) precardPosx += 8;
                                        spPengCard.setTag(_this.cleanTag++);
                                        _this.node.addChild(spPengCard);
                                    }
                                }

                                for(var iMg=0; iMg<kwx_info.info[iInfo].card.cardmg.length; iMg++){
                                    var penggangNode = {
                                        "penggang": false,
                                        "card": kwx_info.info[iInfo].card.cardmg[iMg],
                                    };
                                    _this.myPengGang.push(penggangNode);
                                    _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardp[iPeng]);

                                    for (var j=0; j<3; j++){
                                        _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardmg[iMg]);
                                        var spGangCard = _this.createpenggangCard(false,kwx_info.info[iInfo].card.cardmg[iMg],0,1);
                                        var temphg = spGangCard.getContentSize().height;
                                        spGangCard.setPosition(precardPosx + tempwd*0.5, _this.myFirstCardPointY + temphg*0.5);
                                        precardPosx += tempwd;
                                        if(j == 2) precardPosx += 8;
                                        spGangCard.setTag(_this.cleanTag++);
                                        _this.node.addChild(spGangCard);

                                        if(j==1){
                                            _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardmg[iMg]);
                                            var spGangCardchild = _this.createpenggangCard(false,kwx_info.info[iInfo].card.cardmg[iMg],0,1);
                                            spGangCardchild.setPosition(tempwd*0.5, 23+temphg*0.5);
                                            spGangCard.addChild(spGangCardchild);
                                        }
                                    }
                                }

                                for(var iCg=0; iCg<kwx_info.info[iInfo].card.cardcg.length; iCg++){
                                    var penggangNode = {
                                        "penggang": false,
                                        "card": kwx_info.info[iInfo].card.cardcg[iCg],
                                    };
                                    _this.myPengGang.push(penggangNode);

                                    for (var j=0; j<3; j++){
                                        _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardcg[iCg]);
                                        var spGangCard = _this.createpenggangCard(false,kwx_info.info[iInfo].card.cardcg[iCg],0,1);
                                        var temphg = spGangCard.getContentSize().height;
                                        spGangCard.setPosition(precardPosx + tempwd*0.5, _this.myFirstCardPointY + temphg*0.5);
                                        precardPosx += tempwd;
                                        if(j == 2) precardPosx += 8;
                                        spGangCard.setTag(_this.cleanTag++);
                                        _this.node.addChild(spGangCard);

                                        if(j==1){
                                            _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardcg[iCg]);
                                            var spGangCardchild = _this.createpenggangCard(false,kwx_info.info[iInfo].card.cardcg[iCg],0,1);
                                            spGangCardchild.setPosition(tempwd*0.5, 23+temphg*0.5);
                                            spGangCard.addChild(spGangCardchild);
                                        }
                                    }
                                }

                                for(var iAg=0; iAg<kwx_info.info[iInfo].card.cardag.length; iAg++){
                                    var penggangNode = {
                                        "penggang": false,
                                        "card": kwx_info.info[iInfo].card.cardag[iAg],
                                    };
                                    _this.myPengGang.push(penggangNode);

                                    for (var j=0; j<3; j++){
                                        _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardag[iAg]);
                                        var spGangCard = _this.createpenggangCard(false,0,0,4);
                                        var temphg = spGangCard.getContentSize().height;
                                        spGangCard.setPosition(precardPosx + tempwd*0.5, _this.myFirstCardPointY + temphg*0.5);
                                        precardPosx += tempwd;
                                        if(j == 2) precardPosx += 8;
                                        spGangCard.setTag(_this.cleanTag++);
                                        _this.node.addChild(spGangCard);

                                        if(j==1){
                                            _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardag[iAg]);
                                            var spGangCardchild = _this.createpenggangCard(false,kwx_info.info[iInfo].card.cardag[iAg],0,1);
                                            spGangCardchild.setPosition(tempwd*0.5, 23+temphg*0.5);
                                            spGangCard.addChild(spGangCardchild);
                                        }
                                    }
                                }
                                var iBeginX = _this.myFirstCardPointX + 75 * _this.myPengGang.length * 3;
                                if(kwx_info.info[iInfo].card.cardl){
                                    var lenliang = kwx_info.info[iInfo].card.cardl.length;
                                    for (var iCardl=0; iCardl<lenliang; iCardl++) {
                                        _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardl[iCardl]);
                                        var spLiangCard = _this.createpenggangCard(false,kwx_info.info[iInfo].card.cardl[iCardl],0,2);
                                        spLiangCard.setPosition(precardPosx + tempwd*0.5, _this.myFirstCardPointY + spLiangCard.getContentSize().height*0.5);
                                        precardPosx += tempwd;
                                        if(iCardl == lenliang-1 ) precardPosx += 8;
                                        //spLiangCard.setColor(cc.color(170,150,60));
                                        spLiangCard.setColor(cc.color(255,255,159));
                                        spLiangCard.getChildByTag(999).setColor(cc.color(255,255,159));
                                        spLiangCard.setTag(_this.cleanTag++);
                                        _this.node.addChild(spLiangCard);
                                        _this.spLiangCardsArray.push(spLiangCard);
                                        iBeginX+= 75;
                                    }
                                    if( lenliang > 0 ) _this.bStatusLiang = true;
                                }

                                _this.myCards = kwx_info.info[iInfo].card.card1;
                                // 断线重连后的胡牌提示
                                _this.seenCardsArray = _this.seenCardsArray.concat(_this.myCards);

                                // 还是把手牌补满13张，和正常情况相统一，以免有别的问题。
                                for(var iMy=_this.myCards.length; iMy<13; iMy++){
                                    _this.myCards.push(0);
                                }
                                _this.myCards.sort(function(a,b){return a-b});
                                for (var iCs=0; iCs<_this.myCards.length; iCs++) {
                                    if(_this.myCards[iCs] == 0) {
                                        _this.btnMyCards[iCs] = new ccui.Button();
                                    }
                                    else{
                                        _this.btnMyCards[iCs] = _this.CreateCard(_this.myCards[iCs]);
                                        var lennn = kwx_info.info[iInfo].card.cardl.length;
                                        if(lennn){
                                            _this.btnMyCards[iCs].getChildByTag(1002).setVisible(true);
                                            _this.btnMyCards[iCs].setEnabled(false);
                                        }
                                        _this.btnMyCards[iCs].setPosition(cc.p(precardPosx, _this.myFirstCardPointY));
                                        precardPosx += tempwd;
                                    }

                                    _this.btnMyCards[iCs].setTag(iCs + 100);    // 设一个序号，方便点击的时候使用。

                                    if(_this.myCards[iCs]!=0){
                                        _this.node.addChild(_this.btnMyCards[iCs],30);
                                        _this.btnMyCards[iCs].addTouchEventListener(_this.clickMyCardBtn);
                                    }
                                    else {
                                        _this.node.addChild(_this.btnMyCards[iCs],30);
                                        _this.btnMyCards[iCs].setVisible(false);
                                    }
                                }
                                _this.drawcardposX = precardPosx;

                                if(kwx_info.info[iInfo].uid == kwx_info.curstep)
                                    _this.isQipai = true;
                                if(kwx_info.info[iInfo].uid == kwx_info.befstep){
                                    _this.isQipai = false;
                                }
                                if(!kwx_info.info[iInfo].card.cardm && _this.isQipai){
                                    _this.drawcardposX -= tempwd;//碰完后下线在上线需要减一个麻将宽度；
                                }
                                var ffff = true;
                                if(kwx_info.info[iInfo].hu || kwx_info.info[iInfo].gang == 1) ffff = false;
                                if( _this.isQipai && ffff){
                                    _this.IsTing();
                                    if(_this.liangArray.length != 0 && (!(_this.cardnum<12 &&  parseInt(_this.mod_kwx.roominfo.param1)%10 == 1))){
                                        _this.DisplayTingPng();
                                        var btn = ccui.helper.seekWidgetByName(_this.node, "liang");
                                        btn.setLocalZOrder(999);
                                        btn.setVisible(true);
                                        btn.addTouchEventListener(_this.clickOperatorBtn);
                                    }
                                }
                                _this.opertorcount = 0;
                                if(kwx_info.info[iInfo].peng){
                                    // 碰杠过的时候，不能点牌
                                    for(var i=0; i<_this.myCards.length; i++){
                                        if(_this.myCards[i]!=0) {
                                            //_this.btnMyCards[i].setColor(cc.color(128,128,128));
                                            _this.btnMyCards[i].getChildByTag(1002).setVisible(true);
                                            _this.btnMyCards[i].setEnabled(false);
                                        }
                                    }

                                    var btng = ccui.helper.seekWidgetByName(_this.node, "guo");
                                    btng.setLocalZOrder(999);
                                    btng.setVisible(true);
                                    btng.addTouchEventListener(_this.clickOperatorBtn);

                                    var btnp = ccui.helper.seekWidgetByName(_this.node, "peng");
                                    btnp.setLocalZOrder(999);
                                    btnp.setVisible(true);
                                    btnp.addTouchEventListener(_this.clickOperatorBtn);
                                    _this.createpenggangCard(_this.spDisplayPeng,_this.mod_kwx.laststepcard,0,1);
                                    _this.spDisplayPeng.setLocalZOrder(1002);
                                    _this.spDisplayPeng.setPosition(cc.p(btnp.getPositionX(), btnp.getPositionY() +135));
                                    _this.spDisplayPeng.setVisible(true);
                                    _this.opertorcount += 1;
                                }
                                if(kwx_info.curstep == kwx_info.info[iInfo].uid) _this.OnDrawCard(kwx_info.info[iInfo].uid, kwx_info.info[iInfo].card.cardm, kwx_info.info[iInfo].hu, kwx_info.info[iInfo].gang);
                                // 显示打出的牌
                                for (var iSc=0; iSc<kwx_info.info[iInfo].card.card2.length; iSc++) {
                                    var _bo = false;
                                    if (iSc == kwx_info.info[iInfo].card.card2.length-1)
                                    {
                                        if(kwx_info.info[iInfo].uid == kwx_info.befstep && kwx_info.lastcard == kwx_info.info[iInfo].card.card2[iSc])
                                            _bo = true;
                                    }
                                    _this.StepCard(0, kwx_info.info[iInfo].card.card2[iSc], _bo);
                                    _this.seenCardsArray.push(kwx_info.info[iInfo].card.card2[iSc]);
                                }

                                if(kwx_info.info[iInfo].card.want.length){
                                    var notifynode = ccui.helper.seekWidgetByName(_this.node, "notifynode1");
                                    notifynode.setLocalZOrder(30);
                                    notifynode.removeAllChildren();
                                    var offset = 15;
                                    ccui.helper.seekWidgetByName(_this.node, "myself_hupng").setVisible(true);
                                    var sprHu = ccui.helper.seekWidgetByName(_this.node, "myself_hu");
                                    sprHu.setVisible(true);
                                    for (var jHu=0; jHu<kwx_info.info[iInfo].card.want.length; jHu++) {
                                        var sprHucard = _this.createpenggangCard(false,kwx_info.info[iInfo].card.want[jHu],0,3);
                                        offset+= 40;
                                        sprHucard.setPosition(sprHucard.getContentSize().width*0.5+offset , 2+sprHucard.getContentSize().height*0.5);
                                        sprHu.addChild(sprHucard);
                                    }
                                }
                                break;
                            case 1:

                                for(var iPeng=0; iPeng<kwx_info.info[iInfo].card.cardp.length; iPeng++){
                                    var penggangNode = {
                                        "penggang": true,
                                        "card": kwx_info.info[iInfo].card.cardp[iPeng],
                                    };
                                    _this.rightPengGang.push(penggangNode);
                                    for (var j=0; j<3; j++){
                                        _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardp[iPeng]);
                                        var spRightCards = _this.node.getChildByTag(1200 + j + (_this.rightPengGang.length - 1) * 3);
                                        _this.createpenggangCard(spRightCards,kwx_info.info[iInfo].card.cardp[iPeng],1,1);
                                    }
                                }

                                for(var iMg=0; iMg<kwx_info.info[iInfo].card.cardmg.length; iMg++){
                                    var penggangNode = {
                                        "penggang": false,
                                        "card": kwx_info.info[iInfo].card.cardmg[iMg],
                                    };
                                    _this.rightPengGang.push(penggangNode);

                                    for (var j=0; j<3; j++){
                                        _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardmg[iMg]);
                                        var spRightCards = _this.node.getChildByTag(1200 + j + (_this.rightPengGang.length - 1) * 3);
                                        _this.createpenggangCard(spRightCards,kwx_info.info[iInfo].card.cardmg[iMg],1,1);

                                        if(j==1){
                                            _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardmg[iMg]);
                                            var spGangCard = _this.createpenggangCard(false,kwx_info.info[iInfo].card.cardmg[iMg],1,1);
                                            spGangCard.setPosition(spGangCard.getContentSize().width*0.5, 10+spGangCard.getContentSize().height*0.5);
                                            spRightCards.addChild(spGangCard);
                                        }
                                    }
                                }

                                for(var iCg=0; iCg<kwx_info.info[iInfo].card.cardcg.length; iCg++){
                                    var penggangNode = {
                                        "penggang": false,
                                        "card": kwx_info.info[iInfo].card.cardcg[iCg],
                                    };
                                    _this.rightPengGang.push(penggangNode);

                                    for (var j=0; j<3; j++){
                                        _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardcg[iCg]);
                                        var spRightCards = _this.node.getChildByTag(1200 + j + (_this.rightPengGang.length - 1) * 3);
                                        _this.createpenggangCard(spRightCards,kwx_info.info[iInfo].card.cardcg[iCg],1,1);
                                        if(j==1){
                                            _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardcg[iCg]);
                                            var spGangCard = _this.createpenggangCard(false,kwx_info.info[iInfo].card.cardcg[iCg],1,1);
                                            spGangCard.setPosition(spGangCard.getContentSize().width*0.5, 10+spGangCard.getContentSize().height*0.5);
                                            spRightCards.addChild(spGangCard);
                                        }
                                    }
                                }

                                for(var iAg=0; iAg<kwx_info.info[iInfo].card.cardag.length; iAg++){
                                    var penggangNode = {
                                        "penggang": false,
                                        "card": kwx_info.info[iInfo].card.cardag[iAg],
                                    };
                                    _this.rightPengGang.push(penggangNode);

                                    for (var j=0; j<3; j++){
                                        _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardag[iAg]);
                                        var spRightCards = _this.node.getChildByTag(1200 + j + (_this.rightPengGang.length - 1) * 3);
                                        _this.createpenggangCard(spRightCards,0,1,4);
                                        if(j==1){
                                            _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardag[iAg]);
                                            var spGangCard = _this.createpenggangCard(false,kwx_info.info[iInfo].card.cardag[iAg],1,1);
                                            spGangCard.setPosition(spGangCard.getContentSize().width*0.5, 10+spGangCard.getContentSize().height*0.5);
                                            spRightCards.addChild(spGangCard);
                                        }
                                    }
                                }

                                for(var jCardl=0; jCardl<kwx_info.info[iInfo].card.cardl.length; jCardl++){
                                    _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardl[jCardl]);
                                    var spRightCards = _this.node.getChildByTag(1200 + jCardl + _this.rightPengGang.length * 3);
                                    _this.createpenggangCard(spRightCards,kwx_info.info[iInfo].card.cardl[jCardl],1,1);
                                }

                                if(kwx_info.info[iInfo].card.want.length) {
                                    var notifynode = ccui.helper.seekWidgetByName(_this.node, "notifynode2");
                                    notifynode.setLocalZOrder(30);
                                    notifynode.removeAllChildren();
                                    var offset = 210;
                                    ccui.helper.seekWidgetByName(_this.node, "right_hupng").setVisible(true);
                                    var sprHu = ccui.helper.seekWidgetByName(_this.node, "right_hu");//cc.Sprite.create(res.hu_png);
                                    sprHu.setVisible(true);
                                    for (var jHu = 0; jHu < kwx_info.info[iInfo].card.want.length; jHu++) {
                                        var sprHucard = _this.createpenggangCard(false,kwx_info.info[iInfo].card.want[jHu],1,3);
                                        offset -= 50;
                                        sprHucard.setPosition(5+sprHucard.getContentSize().width*0.5,offset + sprHucard.getContentSize().height*0.5);
                                        sprHu.addChild(sprHucard);
                                    }
                                }
                                // 显示打出的牌
                                var _bo1 = false;
                                for (var iSc=0; iSc<kwx_info.info[iInfo].card.card2.length; iSc++) {
                                    _bo1 = false;
                                    if (iSc == kwx_info.info[iInfo].card.card2.length-1)
                                    {
                                        if(kwx_info.info[iInfo].uid == kwx_info.befstep && kwx_info.lastcard == kwx_info.info[iInfo].card.card2[iSc])
                                            _bo1 = true;
                                    }
                                    _this.StepCard(1, kwx_info.info[iInfo].card.card2[iSc], _bo1,true);
                                }
                                if(curchupaichair  == 1 && _bo1) spBackRight.setVisible(false);
                                break;
                            case 2:
                                for(var iPeng=0; iPeng<kwx_info.info[iInfo].card.cardp.length; iPeng++){
                                    var penggangNode = {
                                        "penggang": true,
                                        "card": kwx_info.info[iInfo].card.cardp[iPeng],
                                    };
                                    _this.leftPengGang.push(penggangNode);

                                    for (var j=0; j<3; j++){
                                        _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardp[iPeng]);
                                        var spLeftCards = _this.node.getChildByTag(1300 + j + (_this.leftPengGang.length - 1) * 3);
                                        _this.createpenggangCard(spLeftCards,kwx_info.info[iInfo].card.cardp[iPeng],2,1);
                                    }
                                }

                                for(var iMg=0; iMg<kwx_info.info[iInfo].card.cardmg.length; iMg++){
                                    var penggangNode = {
                                        "penggang": false,
                                        "card": kwx_info.info[iInfo].card.cardmg[iMg],
                                    };
                                    _this.leftPengGang.push(penggangNode);

                                    for (var j=0; j<3; j++){
                                        _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardmg[iMg]);
                                        var spLeftCards = _this.node.getChildByTag(1300 + j + (_this.leftPengGang.length - 1) * 3);
                                        _this.createpenggangCard(spLeftCards,kwx_info.info[iInfo].card.cardmg[iMg],2,1);

                                        if(j==1){
                                            _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardmg[iMg]);
                                            var spGangCard = _this.createpenggangCard(false,kwx_info.info[iInfo].card.cardmg[iMg],2,1);
                                            spGangCard.setPosition(spGangCard.getContentSize().width*0.5, 10+spGangCard.getContentSize().height*0.5);
                                            spLeftCards.addChild(spGangCard);
                                        }
                                    }
                                }

                                for(var iCg=0; iCg<kwx_info.info[iInfo].card.cardcg.length; iCg++){
                                    var penggangNode = {
                                        "penggang": false,
                                        "card": kwx_info.info[iInfo].card.cardcg[iCg],
                                    };
                                    _this.leftPengGang.push(penggangNode);

                                    for (var j=0; j<3; j++){
                                        _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardcg[iCg]);
                                        var spLeftCards = _this.node.getChildByTag(1300 + j + (_this.leftPengGang.length - 1) * 3);
                                        _this.createpenggangCard(spLeftCards,kwx_info.info[iInfo].card.cardcg[iCg],2,1);

                                        if(j==1){
                                            _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardcg[iCg]);
                                            var spGangCard = _this.createpenggangCard(false,kwx_info.info[iInfo].card.cardcg[iCg],2,1);
                                            spGangCard.setPosition(spGangCard.getContentSize().width*0.5, 10+spGangCard.getContentSize().height*0.5);
                                            spLeftCards.addChild(spGangCard);
                                        }
                                    }
                                }

                                for(var iAg=0; iAg<kwx_info.info[iInfo].card.cardag.length; iAg++){
                                    var penggangNode = {
                                        "penggang": false,
                                        "card": kwx_info.info[iInfo].card.cardag[iAg],
                                    };
                                    _this.leftPengGang.push(penggangNode);
                                    var lenag = 1300 + (_this.leftPengGang.length - 1) * 3;
                                    for (var j=0; j<3; j++){
                                        _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardag[iAg]);

                                        var spLeftCards = _this.node.getChildByTag(lenag+j);
                                        _this.createpenggangCard(spLeftCards,0,2,4);

                                        if(j==1){
                                            _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardag[iAg]);
                                            var spGangCard = _this.createpenggangCard(false,kwx_info.info[iInfo].card.cardag[iAg],2,1);
                                            spGangCard.setPosition(spGangCard.getContentSize().width*0.5, 10+spGangCard.getContentSize().height*0.5);
                                            spLeftCards.addChild(spGangCard);
                                        }
                                    }
                                }

                                for(var jCardl=0; jCardl<kwx_info.info[iInfo].card.cardl.length; jCardl++){
                                    _this.seenCardsArray.push(kwx_info.info[iInfo].card.cardl[jCardl]);
                                    var spLeftCards = _this.node.getChildByTag(1300 + jCardl + _this.leftPengGang.length * 3);
                                    _this.createpenggangCard(spLeftCards,kwx_info.info[iInfo].card.cardl[jCardl],2,1);
                                }

                                if(kwx_info.info[iInfo].card.want.length) {
                                    var notifynode = ccui.helper.seekWidgetByName(_this.node, "notifynode3");
                                    notifynode.setLocalZOrder(30);
                                    notifynode.removeAllChildren();
                                    var offset = 210;
                                    ccui.helper.seekWidgetByName(_this.node, "left_hupng").setVisible(true);
                                    var sprHu = ccui.helper.seekWidgetByName(_this.node, "left_hu");
                                    sprHu.setVisible(true);
                                    for (var jHu = 0; jHu < kwx_info.info[iInfo].card.want.length; jHu++) {
                                        var sprHucard = _this.createpenggangCard(false,kwx_info.info[iInfo].card.want[jHu],2,3);
                                        offset -= 50;
                                        sprHucard.setPosition(5+sprHucard.getContentSize().width*0.5,offset + sprHucard.getContentSize().height*0.5);
                                        sprHu.addChild(sprHucard);
                                    }
                                }
                                // 显示打出的牌
                                var _bo2 = false;
                                for (var iSc=0; iSc<kwx_info.info[iInfo].card.card2.length; iSc++) {
                                    _bo2 = false;
                                    if (iSc == kwx_info.info[iInfo].card.card2.length-1)
                                    {
                                        if(kwx_info.info[iInfo].uid == kwx_info.befstep && kwx_info.lastcard == kwx_info.info[iInfo].card.card2[iSc])
                                            _bo2 = true;
                                    }
                                    _this.StepCard(2, kwx_info.info[iInfo].card.card2[iSc], _bo2,true);
                                }
                                if(curchupaichair == 2 && _bo2) spBackLeft.setVisible(false);
                                break;
                        }
                        break;
                    }
                }
            }
        };

        // 碰杠胡按钮响应
        _this.clickOperatorBtn = function (sender, type) {
            _this.opertorcount = 0;
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    var bJiXuAnGang = false;

                    var bDouHu = true;
                    // 碰杠的时候会不能点击，碰杠完了恢复。
                    if (!_this.bStatusLiang) {
                        if (_this.btnMyCards[13]
                            && (_this.HaveTheCard(_this.wantCards[1], _this.drawCard)==-1)
                            && (_this.HaveTheCard(_this.wantCards[2], _this.drawCard)==-1)) {
                            //_this.btnMyCards[13].setColor(cc.color(255, 255, 255));
                            _this.btnMyCards[13].getChildByTag(1002).setVisible(false);
                            _this.btnMyCards[13].setEnabled(true);
                            bDouHu = false;
                        }
                        for (var iMyCard = 0; iMyCard < _this.myCards.length; iMyCard++) {
                            if (_this.myCards[iMyCard]
                                && (_this.HaveTheCard(_this.wantCards[1], _this.myCards[iMyCard])==-1)
                                && (_this.HaveTheCard(_this.wantCards[2], _this.myCards[iMyCard])==-1)) {
                                //_this.btnMyCards[iMyCard].setColor(cc.color(255, 255, 255));
                                _this.btnMyCards[iMyCard].getChildByTag(1002).setVisible(false);
                                _this.btnMyCards[iMyCard].setEnabled(true);
                                bDouHu = false;
                            }
                        }
                        // 如果手上的牌别人都胡，就让他随便打吧。。
                        if(bDouHu){
                            for(var iMyCard=0; iMyCard<_this.myCards.length; iMyCard++) {
                                if (_this.myCards[iMyCard] == 0)
                                    continue;
                                else {
                                    //_this.btnMyCards[iMyCard].setColor(cc.color(255, 255, 255));
                                    _this.btnMyCards[iMyCard].getChildByTag(1002).setVisible(false);
                                    _this.btnMyCards[iMyCard].setEnabled(true);
                                }
                            }
                        }
                    }

                    // 通过逻辑标签来区分点的什么按钮
                    switch (this.getTag()){
                        // 过
                        case 21:
                            sender.setVisible(false);
                            // 如果是自摸胡、杠的时候点过。还可以显示亮。
                            if(!_this.bStatusLiang && _this.isQipai){
                                _this.IsTing();

                                // 亮牌
                                if((!(_this.cardnum<12 &&  parseInt(_this.mod_kwx.roominfo.param1)%10 == 1)) && _this.liangArray.length != 0){
                                    _this.DisplayTingPng();
                                    var btn = ccui.helper.seekWidgetByName(_this.node, "liang");
                                    btn.setLocalZOrder(999);
                                    btn.setVisible(true);
                                    //btn.setBright(false);
                                    btn.addTouchEventListener(_this.clickOperatorBtn);
                                }
                            }

                            _this.mod_kwx.OnSendGuo();

                            // 亮牌的时候点过，必然是有杠没杠，这时需要把牌打出去。
                            if(_this.bStatusLiang){
                                _this.btnMyCards[13].runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(function () {
                                    _this.GameStep(113);
                                })));
                            }

                            break;

                        // 碰
                        case 18:
                            _this.mod_kwx.OnSendPeng();
                            // 相当于起到了碰的牌。也置0。这样可以方便后面打牌的逻辑
                            _this.drawCard = 0;
                            _this.isQipai = true;
                            _this.mod_kwx.laststepcard = 0;
                            break;

                        // 杠
                        case 19:
                            var data = {"card":_this.gangcard};
                            var falg = false;
                            for(var kkk = 0; kkk < _this.myCards.length; kkk++)
                            {
                                if (_this.gangcard == _this.myCards[kkk]) {falg = true;break;}
                            }
                            if(!falg){
                                _this.mod_kwx.OnSendCagang(data);
                            }
                            else{
                                _this.mod_kwx.OnSendGang(data);
                            }

                            // 如果听了牌的时候杠，要先把听、亮、过字去掉
                            //cc.log(_this.myCards);
                            for(var iBtn=0; iBtn<=_this.myCards.length; iBtn++) {
                                if (_this.myCards[iBtn] != 0) {
                                    //cc.log(iBtn,_this.myCards);
                                    if(_this.btnMyCards[iBtn]){
                                        var liangpng = _this.btnMyCards[iBtn].getChildByName("liangPng");
                                        if(liangpng) liangpng.removeFromParent();
                                        var tingPng = _this.btnMyCards[iBtn].getChildByName("tingPng");
                                        if(tingPng) tingPng.removeFromParent();
                                    }
                                }
                            }
                            ccui.helper.seekWidgetByName(_this.node, "liang").setVisible(false);
                            break;

                        // 胡
                        case 20:
                            ccui.helper.seekWidgetByName(_this.node, "liang").setVisible(false);
                            _this.isLiang = false;
                            _this.mod_kwx.OnSendHu();
                            break;

                        // 亮
                        case 36:
                            if (_this.drawCard != 0) {
                                var k;
                                for(k=0; k<_this.liangArray.length; k++) {
                                    if (_this.liangArray[k].daTingCard == _this.drawCard) {
                                        break;
                                    }
                                }

                                // 打出起牌不能胡，则置灰。
                                if(k==_this.liangArray.length
                                    || _this.HaveTheCard(_this.wantCards[1], _this.drawCard)!=-1
                                    || _this.HaveTheCard(_this.wantCards[2], _this.drawCard)!=-1)
                                    //_this.btnMyCards[13].setColor(cc.color(128, 128, 128));
                                    _this.btnMyCards[13].getChildByTag(1002).setVisible(true);
                            }

                            for(var i=0; i<_this.myCards.length; i++){
								if(_this.myCards[i] == 0)
									continue;

                                var j;
                                for(j=0; j<_this.liangArray.length; j++){

                                    if(_this.liangArray[j].daTingCard == _this.myCards[i]){
                                        break;
                                    }
                                }

                                if(j==_this.liangArray.length
                                    || _this.HaveTheCard(_this.wantCards[1], _this.myCards[i])!=-1
                                    || _this.HaveTheCard(_this.wantCards[2], _this.myCards[i])!=-1){
                                    //_this.btnMyCards[i].setColor(cc.color(128, 128, 128));
                                    _this.btnMyCards[i].getChildByTag(1002).setVisible(true);
                                    _this.btnMyCards[i].setEnabled(false);
                                }
                            }

                            //this.setBright(true);
                            _this.isLiang = true;
                            this.setVisible(false);

                            // 点亮的时候查找，是否有哪张被点了起来，如果点起来的是有“听”的碰，则可以亮牌。
                            for(var iBtnMy=0; iBtnMy<_this.btnMyCards.length; iBtnMy++){

                                if(_this.btnMyCards[iBtnMy].getPositionY() == (_this.myFirstCardPointY + 20)
                                    && _this.btnMyCards[iBtnMy].getChildByName("tingPng")){

                                    var iLiangClickCard;
                                    if (_this.btnMyCards[iBtnMy].getTag() == 113)
                                        iLiangClickCard = _this.drawCard;
                                    else {
                                        iLiangClickCard = _this.myCards[_this.btnMyCards[iBtnMy].getTag()-100];
                                    }
                                    //cc.log(iLiangClickCard,"2222222");
                                    _this.DisplayLiangPng(iLiangClickCard, _this.btnMyCards[iBtnMy].getTag() - 100);
                                    var btnShouDongLiang = ccui.helper.seekWidgetByName(_this.node, "shoudongliang");
                                    btnShouDongLiang.setLocalZOrder(999);
                                    btnShouDongLiang.setVisible(true);
                                    btnShouDongLiang.addTouchEventListener(_this.clickShouDongLiang);
                                    break;
                                }
                            }

                            var btnQuXiaoLiang = ccui.helper.seekWidgetByName(_this.node, "quxiaoliang");
                            btnQuXiaoLiang.setLocalZOrder(999);
                            btnQuXiaoLiang.setVisible(true);
                            btnQuXiaoLiang.addTouchEventListener(_this.clickQuXiaoLiang);

                            break;
                    }

                    _this.HideOperator();
            }
        }

        ccui.helper.seekWidgetByName(_this.node, "BG").addTouchEventListener(function(sender, type){
            if(type == ccui.Widget.TOUCH_ENDED){

                if( _this.curSelCard){
                    //_this.clickMyCardBtn(_this.curSelCard ,ccui.Widget.TOUCH_ENDED);
                    _this.curSelCard.setPositionY(_this.myFirstCardPointY);
                    _this.curSelCard = null;

                }
            }
        });

        // 点击自己的牌，显示准备出牌。
        var posx = 0;  var posy = _this.myFirstCardPointY; var tempx = 0; var tempy = 0;
        var fmove = false; var onemove = false;
        _this.clickMyCardBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    fmove = false; onemove = false;
                    //cc.log("began_this.isLiang", _this.isLiang)
                    posx = this.getPositionX();
                    //posy = this.getPositionY();
                    //cc.log("Touch Began",posx,posy,sender.getTouchMovePosition().x,sender.getTouchMovePosition().y);
                    //break;
                    _this.closeMyBtnEnble(false);
                    return true;
                case ccui.Widget.TOUCH_MOVED:
                    if (!_this.isLiang)
                    {
                        if (!onemove)
                        {
                            onemove = true;
                            tempx = sender.getTouchMovePosition().x - posx;
                            tempy = sender.getTouchMovePosition().y - posy;
                            var notifynode = ccui.helper.seekWidgetByName(_this.node, "notifynode0");
                            notifynode.removeAllChildren();
                        }
                        //cc.log(this.getPositionX(),this.getPositionY())
                        //cc.log(sender.getTouchMovePosition().x,sender.getTouchMovePosition().y)
                        var moveposy = sender.getTouchMovePosition().y-tempy;
                        if (moveposy > posy+20)
                        {
                            var moveposx = sender.getTouchMovePosition().x-tempx;
                            if (moveposx > 10 && moveposx < cc.winSize.width -40 && moveposy < cc.winSize.height - 100)
                            {
                                fmove = true;
                                sender.setPosition(moveposx , moveposy);
                            }
                        }
                        //cc.log("movedfmove",fmove)
                    }
                    break;
                    //return false;
                case ccui.Widget.TOUCH_ENDED:
                    //cc.log("Touch End_fmove",fmove);
                    // 如果是亮牌要显示胡牌提示
                    // 颜路说没有点亮牌也提示
                    _this.closeMyBtnEnble(true);
                    if(!fmove)
                    {
                        var iClickCard = sender.getTag();
                        //cc.log("Touch End_iClickCard",iClickCard);
                        if (iClickCard == 113)
                            iClickCard = _this.drawCard;
                        else {
                            iClickCard = _this.myCards[iClickCard-100];
                        }
                        //cc.log("Touch End_this.drawCard",_this.drawCard);
                        // 点一下显示出来。点击显示出来的牌则打牌。
                        if (sender.getPositionY() == (posy + 20) && _this.isQipai)
                        {
                            _this.curSelCard = null;
                            if(_this.cardliangArray.length == 0 && _this.isLiang) {
                                //cc.log(iClickCard,"1111111")
                                _this.DisplayLiangPng(iClickCard, sender.getTag() - 100);
                            }
                            //if(_this.bShouDongLiang && !_this.IsLiangArrayRight(iClickCard)){
                            if(_this.isLiang && !_this.IsLiangArrayRight(iClickCard)){
                                // 检查亮牌是否合法会把亮牌结构改变，重做一次听牌操作，还原为亮牌之前的状态。
                                _this.IsTing();
                                break;
                            }
                            _this.GameStep(sender.getTag());
                            _this.isQipai = false;
                            ccui.helper.seekWidgetByName(_this.node, "quedingliang").setVisible(false);
                        }

                        // 手动亮牌
                        else if(_this.bShouDongLiang){

                            // 点击亮的牌，则置为不亮；点不亮的牌置为亮。
                            var liangpng = sender.getChildByName("liangPng");
                            //cc.log(liangpng);
                            if(liangpng){
                                liangpng.removeFromParent();
                                var cardordernum = _this.HaveTheCard(_this.cardliangArray, iClickCard);
                                _this.cardliangArray.splice(cardordernum, 1);
                            }
                            else {
                                var spLiang = new cc.Sprite(res.png_liang);
                                spLiang.setAnchorPoint(1,0);
                                spLiang.setPosition(75, 3);
                                sender.addChild(spLiang, 2, "liangPng");
                                _this.cardliangArray.push(iClickCard);
                            }
                        }
                        else
                        {
                            // 将其他的牌回位
                            for (var j=0; j<_this.btnMyCards.length; j++)
                            {
                                if(_this.myCards[j] || j==13)
                                    _this.btnMyCards[j].setPositionY(posy);
                            }
                            // 将点击的牌显示出来。
                            sender.setPosition(posx,posy + 20);
                            _this.curSelCard = sender;
                            // 查找要胡的牌
                            var iTing=0;
                            for(iTing=0; iTing<_this.liangArray.length; iTing++){
                                if(iClickCard == _this.liangArray[iTing].daTingCard && _this.isQipai)
                                {
                                    var notifynode = ccui.helper.seekWidgetByName(_this.node, "notifynode0");
                                    notifynode.removeAllChildren();
                                    notifynode.setLocalZOrder(1003);
                                    var offset = 75;
                                    var imgbg = new ccui.ImageView(res.kwx_hubg_tishi);
                                    imgbg.setScale9Enabled(true);
                                    imgbg.setAnchorPoint(0.5,0);
                                    var curhulen = _this.liangArray[iTing].huCards.length;
                                    imgbg.setContentSize(cc.size(75+152*curhulen,168));
                                    //imgbg.setPositionY(20);
                                    notifynode.addChild(imgbg);
                                    var sprhu = new cc.Sprite(res.kwx_img_hutips);
                                    sprhu.setPosition(cc.p(40,84));
                                    imgbg.addChild(sprhu);
                                    for(var iHu=0; iHu<curhulen; iHu++){
                                        var node = ccs.csLoader.createNode(res.NotifyCard);
                                        node.setPosition(cc.p(offset,70));
                                        var png = "p4_card_" + _this.liangArray[iTing].huCards[iHu] +".png";
                                        //node.getChildByName("card").setTexture(png);
                                        var cardpngch = node.getChildByName("card");
                                        cardpngch.getChildByName("cardpng").initWithSpriteFrameName(png);
                                        var iSheng = 4 - _this.SumInArray(_this.seenCardsArray, _this.liangArray[iTing].huCards[iHu]);
                                        node.getChildByName("leftnum").setString(iSheng);
                                        imgbg.addChild(node);
                                        offset+=152;
                                    }
                                    break;
                                }
                            }

                            // 如果打这张没胡，则不显示。
                            if(iTing == _this.liangArray.length){
                                ccui.helper.seekWidgetByName(_this.node, "notifynode0").removeAllChildren();
                            }

                            if(_this.isLiang){
                                _this.DisplayLiangPng(iClickCard, sender.getTag() - 100);
                                var btnShouDongLiang = ccui.helper.seekWidgetByName(_this.node, "shoudongliang");
                                btnShouDongLiang.setLocalZOrder(999);
                                btnShouDongLiang.setVisible(true);
                                btnShouDongLiang.addTouchEventListener(_this.clickShouDongLiang);
                            }
                        }
                    }
                    else if(fmove && sender.getPositionY() > 128 && _this.isQipai)
                    {
                        for (var j=0; j<_this.btnMyCards.length; j++)
                        {
                            if(_this.myCards[j] || j==13)
                                _this.btnMyCards[j].setPositionY(posy);
                        }
                        sender.setPosition(posx,posy);
                        _this.GameStep(sender.getTag());
                        _this.isQipai = false;
                        ccui.helper.seekWidgetByName(_this.node, "liang").setVisible(false);
                        _this.curSelCard = null;
                    }
                    else
                    {
                        sender.setPosition(posx,posy);
                        _this.curSelCard = null;
                    }
                    fmove = false;
                    return false;
                case ccui.Widget.TOUCH_CANCELED:
                    _this.closeMyBtnEnble(true);
                    fmove = false;
                    sender.setPosition(posx,posy);
                    return false;
            }
        };

        _this.clickQuXiaoLiang = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:

                    if (_this.btnMyCards[13]){
                        if (_this.HaveTheCard(_this.wantCards[1], _this.drawCard)==-1
                            && (_this.HaveTheCard(_this.wantCards[2], _this.drawCard)==-1)){
                            //_this.btnMyCards[13].setColor(cc.color(255, 255, 255));
                            _this.btnMyCards[13].getChildByTag(1002).setVisible(false);
                            _this.btnMyCards[13].setEnabled(true);
                            var liangpng = _this.btnMyCards[13].getChildByName("liangPng");
                            if (liangpng)
                                liangpng.removeFromParent();
                        }
                        else {
                            //_this.btnMyCards[13].setColor(cc.color(128, 128, 128));
                            _this.btnMyCards[13].getChildByTag(1002).setVisible(true);
                            _this.btnMyCards[13].setEnabled(false);
                        }
                    }
                    for (var iMyCard = 0; iMyCard < _this.myCards.length; iMyCard++) {
                        var liangpng = _this.btnMyCards[iMyCard].getChildByName("liangPng");
                        if(liangpng)
                            liangpng.removeFromParent();
                        if (_this.myCards[iMyCard] != 0) {
                            if (_this.HaveTheCard(_this.wantCards[1], _this.myCards[iMyCard])==-1
                                && (_this.HaveTheCard(_this.wantCards[2], _this.myCards[iMyCard])==-1)) {
                                //_this.btnMyCards[iMyCard].setColor(cc.color(255, 255, 255));
                                _this.btnMyCards[iMyCard].getChildByTag(1002).setVisible(false);
                                _this.btnMyCards[iMyCard].setEnabled(true);
                            }
                            else {
                                //_this.btnMyCards[iMyCard].setColor(cc.color(128, 128, 128));
                                _this.btnMyCards[iMyCard].getChildByTag(1002).setVisible(true);
                                _this.btnMyCards[iMyCard].setEnabled(false);
                            }
                        }
                    }

                    ccui.helper.seekWidgetByName(_this.node, "liang").setVisible(true);
                    ccui.helper.seekWidgetByName(_this.node, "liang").setLocalZOrder(999);
                    ccui.helper.seekWidgetByName(_this.node, "shoudongliang").setVisible(false);
                    ccui.helper.seekWidgetByName(_this.node, "quedingliang").setVisible(false);
                    _this.isLiang = false;
                    _this.bShouDongLiang = false;
                    sender.setVisible(false);
                    _this.cardliangArray = [];

                    break;
            }
        };

        // 手动亮牌
        _this.clickShouDongLiang = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    // 所有牌可点击。
                    for (var iMyCard = 0; iMyCard < _this.myCards.length; iMyCard++) {
                        if(_this.myCards[iMyCard] == 0)
                            continue;
                        //_this.btnMyCards[iMyCard].setColor(cc.color(255, 255, 255));
                        _this.btnMyCards[iMyCard].getChildByTag(1002).setVisible(false);
                        _this.btnMyCards[iMyCard].setEnabled(true);
                    }
                    if(_this.btnMyCards[13]) {
                        //_this.btnMyCards[13].setColor(cc.color(255, 255, 255));
                        _this.btnMyCards[13].getChildByTag(1002).setVisible(false);
                        _this.btnMyCards[13].setEnabled(true);
                    }
                    _this.bShouDongLiang = true;
                    sender.setVisible(false);

                    var btnQueDingLiang = ccui.helper.seekWidgetByName(_this.node, "quedingliang");
                    btnQueDingLiang.setLocalZOrder(999);
                    btnQueDingLiang.setVisible(true);
                    btnQueDingLiang.addTouchEventListener(_this.clickQueDingLiang.bind(_this));

                    break;
            }
        };

        _this.getGangcard = function(sender, type)
        {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    _this.gangcard = sender.getTag();
                    var btn = ccui.helper.seekWidgetByName(_this.node, "gang");
                    btn.setLocalZOrder(999);
                    var fixpox = btn.getPositionX() - sender.getPositionX();
                    var img = ccui.helper.seekWidgetByName(_this.node, "gang_background");
                    //img.setVisible(true);
                    img.setPositionX(_this.gangcardbgX - fixpox);
                    break;
            }
        }
        // LA 20161215 发牌
        _this.mod_kwx.dealCards = function(gamebegininfo) {
            _this.myCards = [];
            _this.myCards = gamebegininfo.info[_this.mod_kwx.chairinfo[0].order].card.card1;//this.order
            _this.seenCardsArray = gameclass.clone(_this.myCards);
            _this.myCards.sort(function(a,b){
                return a-b});
            var cardwd = 76; _this.drawcardposX = _this.myFirstCardPointX;
            for (var i=0; i<_this.myCards.length; i++)
            {
                var btnCard = _this.CreateCard(_this.myCards[i]);
                // LA 20161216 设（40,10）为起点
                btnCard.setPosition(_this.drawcardposX, _this.myFirstCardPointY);
                _this.drawcardposX += cardwd;
                _this.btnMyCards[i] = btnCard;
                _this.btnMyCards[i].setTag(i + 100);    // 设一个序号，方便点击的时候使用。
                _this.node.addChild(_this.btnMyCards[i],30);
                _this.btnMyCards[i].addTouchEventListener(_this.clickMyCardBtn);
            }

            var spBackLeft;
            var spBackRight;
            // 显示左右的牌
            for (var i=0; i<13; i++) {
                spBackLeft = _this.createpenggangCard(false,0,2,0);
                spBackLeft.setPosition(150, 528 - i * 23);
                spBackLeft.setTag(i + 1300);
                spBackLeft.setLocalZOrder(i);
                _this.node.addChild(spBackLeft);

                spBackRight = _this.createpenggangCard(false,0,1,0);
                spBackRight.setPosition(1000, 232 + i * 23);
                spBackRight.setTag(i + 1200);
                spBackRight.setLocalZOrder(20 - i);
                _this.node.addChild(spBackRight);
            }

            // 如果有碰牌，不起牌也需要多显示一张。
            spBackLeft = _this.createpenggangCard(false,0,2,0);
            spBackLeft.setPosition(150, 528 - 13 * 23 - 33);
            spBackLeft.setTag(13 + 1300);
            spBackLeft.setLocalZOrder(13);
            _this.node.addChild(spBackLeft);
            spBackLeft.setVisible(false);

            spBackRight = _this.createpenggangCard(false,0,1,0);
            spBackRight.setPosition(1000, 232 + 13 * 23 + 33);
            spBackRight.setTag(13 + 1200);
            spBackRight.setLocalZOrder(20 - 13);
            _this.node.addChild(spBackRight);
            spBackRight.setVisible(false);

            // 起牌
            // 找到自己在消息中的序号
            var ziji_info = gamebegininfo.info[_this.mod_kwx.chairinfo[0].order];

            _this.drawCard = ziji_info.card.cardm;
            _this.opertorcount = 0;
            _this.OnDrawCard(gamebegininfo.curstep, _this.drawCard, ziji_info.hu, ziji_info.gang);
        };

        // 桌面显示打的牌
        this.mod_kwx.DisplayStepCard = function(gamekwxstep) {
            _this.mod_kwx.laststepcard = gamekwxstep.card;
            for (var i=0; i<3; i++) {
                if (_this.mod_kwx.chairinfo[i].uid == gamekwxstep.uid) {
                    if(_this.mod_kwx.roominfo.type >= gameclass.gamegoldkwx){
                        if(i == 0) _this.DisposeCard(gamekwxstep.card);//金币场为服务器返回后出牌
                    }else{
                        if(i == 0) break;
                    }
                    _this.StepCard(i, gamekwxstep.card,true);
                    break;
                }
            }
        };
        // 碰杠提示牌的固定显示位置
        var pengButton = ccui.helper.seekWidgetByName(_this.node, "peng");
        pengButton.setLocalZOrder(999);
        //this.spDisplayPeng = cc.Sprite.create();
        this.spDisplayPeng = _this.createpenggangCard(false,0,0,1);
        this.spDisplayPeng.setVisible(false);
        this.spDisplayPeng.setAnchorPoint(0.5, 0.5);
        this.spDisplayPeng.setLocalZOrder(1002);
        this.spDisplayPeng.setPosition(cc.p(pengButton.getPositionX(), pengButton.getPositionY() +135));
        this.node.addChild(this.spDisplayPeng);

        // 起牌
        this.mod_kwx.DrawCard = function(gamekwxdraw) {
            //_this.mod_kwx.uid_draw = gamekwxdraw.uid;
            _this.opertorcount = 0;
            _this.OnDrawCard(gamekwxdraw.uid, gamekwxdraw.card, gamekwxdraw.hu, gamekwxdraw.gang);
        };

        // 是否进行碰杠胡的操作
        this.mod_kwx.KwxOperator = function(operatorInfo) {
            _this.OnOperator(operatorInfo);
        };

        // 服务器发回，有人碰
        this.mod_kwx.KwxPeng = function(penggangInfo) {
            //mod_sound.playeffect(g_music.peng, false);
            _this.OnPengGang(penggangInfo, true);
        };

        // 杠
        this.mod_kwx.KwxGang = function(penggangInfo) {
            _this.OnPengGang(penggangInfo, false);
        };

        // 擦杠
        this.mod_kwx.KwxCagang = function(CagangInfo) {
            mod_sound.playeffect(g_music.gang, false);
            _this.OnCagang(CagangInfo);
        };

        // 重置还原卡五星的桌面为初始状态。
        this.mod_kwx.ResetKwxDesk = function() {
            _this.ResetDesk();
        };

        // 亮牌
        this.mod_kwx.kwxView = function(ViewInfo) {
            mod_sound.playeffect(g_music.liang, false);
            _this.OnView(ViewInfo);
        };

        this.mod_kwx.kwxKillMa = function(KillMaInfo) {
            _this.OnKillMa(KillMaInfo);
        };


        // 胡牌
        this.mod_kwx.kwxEnd = function() {
            _this.OnHu();
        }
        //总结算
        this.mod_kwx.kwxAllEnd = function( data ) {
            _this.game.uimgr.showui("gameclass.kwxResultui" ).setData( _this.mod_kwx );
        }

        //离线提醒
        this.mod_kwx.offline = function( data ) {
            //通过uid判断是哪个人离线了
            //for ( var i = 0; i < 3; i++ ) {
            //    var playerdata = _this.mod_kwx.getplayerdata(i);
            //    var has = playerdata != null;
            //
            //    //this.players[i].head.setVisible(has);
            //    if ( has && data.uid == playerdata.uid && data.line == false ) {
            //        //this.players[i].head.setString(playerdata.name);
            //        //gameclass.mod_base.showtximg(this.players[i].head, playerdata.imgurl, 29, -40 );
            //
            //        _this.players[i].playername.setString(playerdata.name + "(离线)" );
            //    }
            //}
        }
        //杠分立即显示
        var floatscore = function(gscore,ind,total){
            var _ind = ind; var gang_scr = "";
            if ( ind == 2 ) _ind = 3;
            if ( gscore == -4 ) gang_scr = res.gang_scr0;
            else if ( gscore == -2 ) gang_scr = res.gang_scr1;
            else if ( gscore == -1 ) gang_scr = res.gang_scr2;
            else if ( gscore == 1 ) gang_scr = res.gang_scr3;
            else if ( gscore == 2 ) gang_scr = res.gang_scr4;
            else if ( gscore == 4 ) gang_scr = res.gang_scr5;
            else if ( gscore == 8 ) gang_scr = res.gang_scr6;
            var _head = ccui.helper.seekWidgetByName( _this.node, "head"+_ind );
            //cc.log(gscore);
			
            var func = function (rec_ind, rec_total) {
                var rec_head = ccui.helper.seekWidgetByName(_this.node, "head" + rec_ind);
                if(gang_scr != "") rec_head.removeChildByTag(9);
                var psc = "playerscore" + rec_ind;
                var pscore = ccui.helper.seekWidgetByName(_this.node, psc);
                pscore.setString(""+gameclass.changeShow(rec_total));
            }
            var _float;
            if(gang_scr == "") {
                //金币场杠后不飘字
                //_float = new ccui.Text(""+gscore, "res/Font/FZY4JW_0569.TTF", 36, cc.size(80, 42));
				func(_ind, total);
				
            }else {
                _float = new cc.Sprite(gang_scr);
                _float.setTag(9);
                _float.setPosition(40, -10);
                _head.addChild(_float);

                var act = cc.moveTo(0.5, cc.p(40, 20));
                _float.runAction(cc.sequence(act, cc.callFunc(function () {
                    func(_ind, total);
                })));
			}

        };
        this.mod_kwx.changetotal = function( data ) {
            for (var i = 0; i < data.info.length; i++){
                for (var iChair=0; iChair<3; iChair++) {
                    var gsco = data.info[i].total - _this.mod_kwx.chairinfo[iChair].totalscore;
                    if (gsco != 0 && _this.mod_kwx.chairinfo[iChair].uid == data.info[i].uid) {
                        //cc.log(data.info[i].total , _this.mod_kwx.chairinfo[iChair].totalscore)
                        floatscore(gsco,iChair,data.info[i].total);
                        _this.mod_kwx.chairinfo[iChair].totalscore = data.info[i].total;
                        break;
                    }
                }
            }
        };

        //----------------------金币场-------------------
        var canceltgclick = function (sender, type) {
            if(ccui.Widget.TOUCH_ENDED == type)
                _this.mod_kwx.sendcanceltuoguang(false);
        };
        //金币场托管
        this.mod_kwx.kwxtuoguan = function(bool) {
            _this.tuoguan = bool;
            var mask = ccui.helper.seekWidgetByName(_this.node, "tuoguanmask");
            mask.setLocalZOrder(1000);
            if(bool){
                mask.setVisible(true);
                var caneltg = ccui.helper.seekWidgetByName(mask, "canceltuoguan");
                caneltg.addTouchEventListener(canceltgclick);
            }else{
                mask.setVisible(false);
            }
        };
        //金币场强制选飘
        this.mod_kwx.kwxgoldchangpiao = function() {
            ccui.helper.seekWidgetByName(_this.node, "Panel_piao").setVisible(true);

            _this.kougoldtxt.setVisible(true);
            _this.kougoldtxt.setString("本场每局消耗 "+Math.ceil(_this.mod_kwx.roominfo.golddifen*0.3)+" 金币");
            //_this.game.uimgr.showui("gameclass.addbonuschoose").setmod(_this.mod_kwx);
        };
    }
});

gameclass.kwxtable.prototype.touziFunc = function ( touzinums )
{
    var _node = ccui.helper.seekWidgetByName(this.node, "arrownode");
    cc.spriteFrameCache.addSpriteFrames(res.touziplist);
    var removeSprite = function()
    {
        //_node.removeChild(spineBoy);
        var sprt1 = cc.Sprite.create();
        sprt1.initWithSpriteFrameName("touzi"+touzinums[0]+".png");
        sprt1.setPosition( cc.p(-70, -20) );
        var sprt2 = cc.Sprite.create();
        sprt2.initWithSpriteFrameName("touzi"+touzinums[1]+".png");
        sprt2.setPosition( cc.p(10, -20) );
        _node.addChild(sprt1);
        _node.addChild(sprt2);
        sprt1.runAction(cc.sequence(cc.fadeOut(2), cc.callFunc(function () {
            _node.removeChild(sprt1);
            spineBoy.clearTrack(9);
            spineBoy.removeFromParent();
        })));
        sprt2.runAction(cc.sequence(cc.fadeOut(2), cc.callFunc(function () {
            _node.removeChild(sprt2);
            if(touzinums[0] == touzinums[1])
                ccui.helper.seekWidgetByName(_this.node, "shangloubg").setVisible(true);
        })));
    };
    var spineBoy = new sp.SkeletonAnimation(res.tousaizi_json, res.tousaizi_skeleton);
    spineBoy.setAnimation(9, 'w', false);
    spineBoy.setEndListener(removeSprite);
    _node.addChild(spineBoy);
}

// 确定亮牌
gameclass.kwxtable.prototype.clickQueDingLiang = function(sender, type) {
    switch (type) {
        case ccui.Widget.TOUCH_ENDED:

            for(var iBtn=0; iBtn<this.btnMyCards.length; iBtn++){
                if (this.btnMyCards[iBtn].isVisible() && (this.btnMyCards[iBtn].getPositionY() == (this.myFirstCardPointY + 20)))
                {
                    var iClickStepCard;
                    if (this.btnMyCards[iBtn].getTag() == 113)
                        iClickStepCard = this.drawCard;
                    else {
                        iClickStepCard = this.myCards[this.btnMyCards[iBtn].getTag()-100];
                    }

                    if(this.bShouDongLiang && !this.IsLiangArrayRight(iClickStepCard)){
                        // 检查亮牌是否合法会把亮牌结构改变，重做一次听牌操作，还原为亮牌之前的状态。
                        this.IsTing();
                        break;
                    }
                    this.GameStep(this.btnMyCards[iBtn].getTag());
                    this.btnMyCards[iBtn].setPositionY(this.myFirstCardPointY);
                    this.isQipai = false;
                    sender.setVisible(false);
                }
            }
            break;
    }
};

// 检验亮牌是否正确
gameclass.kwxtable.prototype.IsLiangArrayRight = function(daChuCard) {

    if(this.cardliangArray.length == 13)
        return true;

    this.cardliangArray.sort(function (a, b) {return a - b;});

    var cards = new Array();
    for(var iMcard=0; iMcard<this.myCards.length; iMcard++){
        if(this.myCards[iMcard] != 0)
            cards.push(this.myCards[iMcard]);
    }
    if(this.drawCard)
        cards.push(this.drawCard);
    cards.splice(this.HaveTheCard(cards, daChuCard), 1);
    cards.sort(function (a, b) {return a - b;});

    // 亮出去1张，手上6对。
    if(this.cardliangArray.length == 1){
        var cards_isQiDui = gameclass.clone(cards);

        cards_isQiDui.splice(this.HaveTheCard(cards_isQiDui, this.cardliangArray[0]), 1);
        if(this.IsLiuDui(cards_isQiDui))
            return true;
    }

    // 豪华七对亮出去3张一样的，手上5对
    if(this.cardliangArray.length == 3
        && this.cardliangArray[0] == this.cardliangArray[1]
        && this.cardliangArray[0] == this.cardliangArray[2]) {
        var cards_HaoHuaQiDui = gameclass.clone(cards);
        cards_HaoHuaQiDui.splice(this.HaveTheCard(cards_HaoHuaQiDui, this.cardliangArray[0]), 3);
        for (var i = 0; i < 10; i = i + 2) {
            if (cards_HaoHuaQiDui[i] != cards_HaoHuaQiDui[i + 1])
                return false;
        }
        return true;
    }

    // 亮出去的牌加一张东风听胡，手上都是坎。亮出玩家所选，胡算出来的牌。
    var cardlting = gameclass.clone(this.cardliangArray);
    cardlting.push(34);
    this.IsTing(cardlting);

    if(this.liangArray.length != 0){

        // 手牌
        var handCards = gameclass.clone(cards);
        var iCardl = this.cardliangArray.length - 1;
        for (var k=cards.length-1; k>=0; k--) {
            if (cards[k] == this.cardliangArray[iCardl])
            {
                handCards.splice(k,1);
                if (iCardl >= 0)
                    iCardl--;
                else
                    break;
            }
        }

        // 分花色查找单牌
        var ziArray = new Array();
        var tongArray = new Array();
        var tiaoArray = new Array();
        for(var iCard=0; iCard<handCards.length; iCard++){
            if(handCards[iCard] > 30)
                ziArray.push(handCards[iCard]);
            else if (handCards[iCard] > 10)
                tongArray.push(handCards[iCard]);
            else
                tiaoArray.push(handCards[iCard]);
        }

        var danpai;
        danpai = this.RemoveSanGe(ziArray);
        if (danpai.length == 0
            && this.IsDouShiKan(tiaoArray)
            && this.IsDouShiKan(tongArray)){

            // 胡牌按现有亮牌
            for(var iStep=0; iStep<this.liangArray.length; iStep++){

                if(this.liangArray[iStep].daTingCard == 34){
                    this.wantArray = new Array();
                    this.wantArray = this.liangArray[iStep].huCards;
                    var i_34 = this.HaveTheCard(this.wantArray, 34);
                    if (i_34 != -1){
                        this.wantArray.splice(i_34, 1);
                    }

                    return true;
                }
            }
        }
    }


    // 2、亮出去的牌加一对东风听胡。手上牌去掉一对成坎（加上已有一对的一张,都是坎）。
    var liangAddDui = gameclass.clone(this.cardliangArray);
    liangAddDui.push(34, 34, 35);

    this.IsTing(liangAddDui);

    if(this.liangArray.length != 0) {

        // 手牌
        var handCards = gameclass.clone(cards);
        iCardl = this.cardliangArray.length - 1;
        for (var k=cards.length-1; k>=0; k--) {
            if (cards[k] == this.cardliangArray[iCardl]) {
                handCards.splice(k, 1);
                if (iCardl >= 0)
                    iCardl--;
                else
                    break;
            }
        }

        for(var iHc=0; iHc<handCards.length; iHc++){

            if(handCards[iHc] == handCards[iHc+1]){
                var handCardsRemoveJiang = gameclass.clone(handCards);
                handCardsRemoveJiang.splice(iHc, 2);

                handCardsRemoveJiang.sort(function (a, b) {return a - b;});

                // 分花色查找单牌
                var ziArray = new Array();
                var tongArray = new Array();
                var tiaoArray = new Array();
                for (var iCard = 0; iCard < handCardsRemoveJiang.length; iCard++) {
                    if (handCardsRemoveJiang[iCard] > 30)
                        ziArray.push(handCardsRemoveJiang[iCard]);
                    else if (handCardsRemoveJiang[iCard] > 10)
                        tongArray.push(handCardsRemoveJiang[iCard]);
                    else
                        tiaoArray.push(handCardsRemoveJiang[iCard]);
                }

                var danpai;
                danpai = this.RemoveSanGe(ziArray);
                if (danpai.length == 0
                    && this.IsDouShiKan(tiaoArray)
                    && this.IsDouShiKan(tongArray)){

                    // 胡牌按现有亮牌
                    for(var iStep=0; iStep<this.liangArray.length; iStep++){
                        if(this.liangArray[iStep].daTingCard == 35){
                            this.wantArray = new Array();
                            this.wantArray = this.liangArray[iStep].huCards;
                            var i_34 = this.HaveTheCard(this.wantArray, 34);
                            if (i_34 != -1){
                                this.wantArray.splice(i_34, 1);
                            }

                            return true;
                        }
                    }
                }
            }
        }
    }

    var sprTishi = cc.Sprite.create(res.liangpai_wrong);
    sprTishi.setPosition(568, 180);
    this.node.addChild(sprTishi);
    sprTishi.runAction(cc.fadeOut(4));

    return false;

}


// 更新加漂信息。只传某一个人的uid，和加漂。
gameclass.kwxtable.prototype.UpdatePiao = function(uid, piao) {

    // 加漂的显示
    for (var j=0; j<3; j++){
        if (!this.mod_kwx.chairinfo[j])
            continue;

        if(this.mod_kwx.chairinfo[j].uid == uid){
            // 2号位的控件都叫3，这是个巨大的坑。
            var k = j;
            if(k == 2)
                k = 3;
            var node_piao = ccui.helper.seekWidgetByName(this.node, "bluebg" + k);
            var node_goldfen = ccui.helper.seekWidgetByName(this.node, "goldfen" + k);
            if (piao == -1) {
                node_piao.setVisible(false);
                node_goldfen.setPositionY(28);
                if(this.mod_kwx.isJiaPiao){
                    ccui.helper.seekWidgetByName(this.node, "Panel_piao").setVisible(true);
                    //this.game.uimgr.showui("gameclass.addbonuschoose").setmod(this.mod_kwx);
                    if(this.mod_kwx.roominfo.type >= gameclass.gamegoldkwx){
                        this.kougoldtxt.setVisible(true);
                        this.kougoldtxt.setString("本场每局消耗 "+Math.ceil(this.mod_kwx.roominfo.golddifen*0.3)+" 金币");
                    }
                }
            }
            else {
                var _piaonum = piao;
                if(this.mod_kwx.roominfo.type >= gameclass.gamegoldkwx) _piaonum = this.mod_kwx.roominfo.golddifen*piao;//金币场
                node_piao.getChildByName("piao").setString(_piaonum);
                node_piao.setVisible(true);
                node_goldfen.setPositionY(42);
                if(j == 0) {
                    ccui.helper.seekWidgetByName(this.node, "Panel_piao").setVisible(false);
                    //this.game.uimgr.closeui("gameclass.addbonuschoose");
                }
            }
        }
    }
}

//fsh 控制手牌监听
gameclass.kwxtable.prototype.closeMyBtnEnble = function(bool)
{
    for(var i=0; i < 14; i++){
        if(this.btnMyCards[i]){
            if(this.myCards[i] != 0) {
                var flag = true;
                if(this.HaveTheCard(this.wantCards[1], this.myCards[i])!=-1
                    || this.HaveTheCard(this.wantCards[2], this.myCards[i])!=-1 )
                    flag = false;
                if(i == 13){
                    if(this.HaveTheCard(this.wantCards[1], this.drawCard) != -1
                    || this.HaveTheCard(this.wantCards[2], this.drawCard) != -1 )
                        flag = false;
                }
                if(flag)
                    this.btnMyCards[i].setEnabled(bool);
            }
        }
    }
}
// fsh 杠重写
gameclass.kwxtable.prototype.doGang = function(bool)
{
    // 查找所有可以杠的牌
    var gangArr = [];
    //this.bGang = true;
    if(this.spDisplayGang){
        for(var i = 0; i < this.spDisplayGang.length; i++)
        {
            this.node.removeChild(this.spDisplayGang[i]);
        }
        this.spDisplayGang = null;
    }
    this.spDisplayGang = [];
    var tempmycards = gameclass.clone(this.myCards);
    for(var i=0; i < 14; i++){
        if(this.btnMyCards[i]){
            if(tempmycards[i]!=0) {
                //this.btnMyCards[i].setColor(cc.color(128,128,128));
                this.btnMyCards[i].getChildByTag(1002).setVisible(true);
                this.btnMyCards[i].setEnabled(false);
            }
        }
    }
    var img = ccui.helper.seekWidgetByName(this.node, "gang_background");
    if (this.gangcardbgX == 0)  this.gangcardbgX = img.getPositionX();
    var btn = ccui.helper.seekWidgetByName(this.node, "gang");
    btn.setPositionX(715-this.opertorcount*130);
    btn.setVisible(true);
    btn.setLocalZOrder(999);
    btn.addTouchEventListener(this.clickOperatorBtn);
    if (!bool)
    {
        //this.spDisplayGang[0] = new ccui.Button();
        //var png = this.CardnumToRes(this.mod_kwx.laststepcard, 0);
        //this.spDisplayGang[0].loadTextures(png, png, png);//,ccui.Widget.PLIST_TEXTURE
        this.spDisplayGang[0] = this.CreateCard(this.mod_kwx.laststepcard);
        this.spDisplayGang[0].setAnchorPoint(0.5, 0.5);
        this.spDisplayGang[0].setLocalZOrder(1002);
        this.spDisplayGang[0].setPosition(btn.getPositionX(), btn.getPositionY() + 135);
        this.node.addChild(this.spDisplayGang[0]);
        this.spDisplayGang[0].setEnabled(false);
        img.setVisible(true);
        this.gangcard = this.mod_kwx.laststepcard;
        return;
    }
    tempmycards.push(this.drawCard);
    for(var j = 0; j < tempmycards.length; j++) {
        var flag = false;
        for(var used = 0; used < gangArr.length; used++)
        {
            if(gangArr[used] == tempmycards[j] && tempmycards[i] != 0)
                flag = true;
        }
        if(!flag)
        {
            var count = 0;
            for (var i = 0; i < tempmycards.length; i++){
                if(tempmycards[j] == tempmycards[i] && tempmycards[i] != 0)
                    count += 1;
                if (count == 4)
                {
                    gangArr.push(tempmycards[j]);
                    break;
                }
            }
        }
    }
    var btn1 = ccui.helper.seekWidgetByName(this.node, "guo");
    btn1.setVisible(true);
    btn1.setLocalZOrder(999);
    btn1.addTouchEventListener(this.clickOperatorBtn);
    for(var i = 0 ; i < this.myPengGang.length; i++)
    {
        if(this.drawCard == this.myPengGang[i].card)
        {
            gangArr.push(this.drawCard);
            break;
        }
    }
    var gflag = false;
    for(var i = 0; i < gangArr.length; i++ ) {
        //this.spDisplayGang[i] = new ccui.Button();
        //var png = this.CardnumToRes(gangArr[i], 0);
        //this.spDisplayGang[i].loadTextures(png, png, png);//,ccui.Widget.PLIST_TEXTURE
        this.spDisplayGang[i] = this.CreateCard(gangArr[i]);
        this.spDisplayGang[i].setAnchorPoint(0.5, 0.5);
        this.spDisplayGang[i].setPosition(btn.getPositionX() - i*108, btn.getPositionY() + 135);
        this.spDisplayGang[i].setLocalZOrder(1002);
        this.node.addChild(this.spDisplayGang[i]);
        this.spDisplayGang[i].setEnabled(false);
        if(this.drawCard == gangArr[i]){
            gflag = true;
            this.gangcard = gangArr[i];
            var fixpox = btn.getPositionX() - this.spDisplayGang[i].getPositionX();
            img.setPositionX(this.gangcardbgX - fixpox);
        }
        if(gangArr.length > 1)
        {
            this.spDisplayGang[i].setEnabled(true);
            this.spDisplayGang[i].setTag(gangArr[i]);
            this.spDisplayGang[i].addTouchEventListener(this.getGangcard);
        }
    }
    if(!gflag && gangArr.length > 0){
        this.gangcard = gangArr[0];
        img.setPositionX(this.gangcardbgX);
    }
}

// 胡牌
gameclass.kwxtable.prototype.OnHu = function() {

    // 结束有可能还显示着碰杠胡
    this.HideOperator();
    var pointer  = ccui.helper.seekWidgetByName( this.node, "pointer" );
    pointer.setVisible( false );

    var _this = this;
    var endinfo = this.mod_kwx.gamekwxend_info.msgdata;
    _this.mod_kwx.laststepcard = endinfo.lastcard;

        var humisic = g_music.hu;
        for (var iEd = 0; iEd < 3; iEd++) {
            for (var iChair=0; iChair<3; iChair++) {
                if (this.mod_kwx.chairinfo[iChair].uid == endinfo.info[iEd].uid) {
                    var locator = ""; var psc = "";
                    if (!endinfo.hz && endinfo.info[iEd].hu > 0)
                    {
                        for(var mm = 0; mm < endinfo.info[iEd].state.length; mm++)
                        {
                            if (endinfo.info[iEd].state[mm].id == 17){ humisic = g_music.zimo; break; }
                        }
                        if(iChair == 0) locator = "locator_my";
                        else if(iChair == 1) locator = "locator_right";
                        else if(iChair == 2) locator = "locator_left";

                        var nodeOperate = ccui.helper.seekWidgetByName(this.node, locator);
                        //var removeSprite = function(){
                        //    if(spineBoy){
                        //        spineBoy.removeFromParent();
                        //        spineBoy = null;
                        //    }
                        //}
                        //var spineBoy = new sp.SkeletonAnimation(res.mjhu_txjson, res.mjhu_txatlas);
                        //spineBoy.setAnimation(122, 'animation', false);
                        //spineBoy.setEndListener(removeSprite);
                        //nodeOperate.addChild(spineBoy);
                        var sprOperate = new cc.Sprite(res.record_hu);
                        nodeOperate.addChild(sprOperate);
                        nodeOperate.setLocalZOrder(100);
                        sprOperate.runAction(cc.scaleTo(1.5, 1.25));
                        sprOperate.runAction(cc.fadeOut(1.5));
                    }
                    this.mod_kwx.chairinfo[iChair].totalscore = endinfo.info[iEd].total;
                    if(iChair == 2) iChair = 3;
                    psc = "playerscore" + iChair;
                    var score = ccui.helper.seekWidgetByName( this.node, psc );
                    score.setString( ""+gameclass.changeShow(endinfo.info[iEd].total) );
                }
            }
        }
        if(!endinfo.hz) {
            mod_sound.playeffect(humisic,false);
        }

    this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {

            var skipuiname = "gameclass.kwxResultoneui";//房卡场
            //金币场
            if(_this.mod_kwx.roominfo.type >= gameclass.gamegoldkwx) skipuiname = "gameclass.kwxGoldResultui";
            if(endinfo.ma.length) {
                // 买马动画
                var _matype = endinfo.ma.length;
                for(var iMa=0; iMa<_matype; iMa++){
                    //var sprMa = cc.Sprite.create();
                    //sprMa.initWithSpriteFrameName(_this.CardnumToRes(endinfo.ma[iMa], 0));
                    //sprMa.setTexture(_this.CardnumToRes(endinfo.ma[iMa], 0));
                    var sprMa = _this.createpenggangCard(false,endinfo.ma[iMa],0,1);
                    sprMa.setTag(_this.cleanTag++);
                    sprMa.setScale(2);
                    if(_matype == 1){
                        var housebg = ccui.helper.seekWidgetByName(_this.node, "buyhousebg");
                        housebg.setLocalZOrder(31);
                        housebg.setVisible(true);
                        sprMa.setPosition(cc.p(145,151));
                        housebg.addChild(sprMa);
                    }else{
                        sprMa.setPosition(568 - sprMa.getContentSize().width * endinfo.ma.length * 0.5 + sprMa.getContentSize().width * iMa * 1.5, 320);
                        _this.node.addChild(sprMa, 999);
                    }
                    var atcion = cc.spawn(cc.fadeIn(0.5), cc.scaleTo(0.2, 1.5), cc.rotateTo(0.5, 720.0));
                    sprMa.runAction(cc.sequence(atcion, cc.delayTime(3)));
                }

                _this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function () {
                    ccui.helper.seekWidgetByName(_this.node, "buyhousebg").setVisible(false);
                    _this.game.uimgr.showui(skipuiname).setkwxmod(_this.mod_kwx);
                })));
            }
            else{
                _this.game.uimgr.showui(skipuiname).setkwxmod(_this.mod_kwx);
            }

    })));
};

// 杀马
gameclass.kwxtable.prototype.OnKillMa = function(KillMaInfo){
    for (var chairNum=0; chairNum<3; chairNum++) {
        if (this.mod_kwx.chairinfo[chairNum].uid == KillMaInfo.uid) {
            switch (chairNum) {
                // 自己
                case 0:
                    var penggangNode = {
                        "penggang": false,
                        "card": KillMaInfo.card,
                    };
                    this.myPengGang.push(penggangNode);

                    var spGangCard;
                    // 4张杠的牌
                    for (var j=0; j<3; j++){
                        var spGangCard;
                        // 明杠
                        if (KillMaInfo.view){
                            spGangCard = this.createpenggangCard(false,0,0,1);
                        }
                        // 暗杠
                        else {
                            spGangCard = this.createpenggangCard(false,0,0,4);
                        }
                        //spGangCard.setAnchorPoint(0,0);
                        spGangCard.setPosition(spGangCard.getContentSize().width * (j + (this.myPengGang.length - 1) * 3.5)
                            + this.myFirstCardPointX, this.myFirstCardPointY);
                        spGangCard.setTag(this.cleanTag++);
                        this.node.addChild(spGangCard);
                    }

                    // 杠就叠加一张
                    spGangCard = this.createpenggangCard(false,KillMaInfo.card,0,1);
                    spGangCard.setPosition(spGangCard.getContentSize().width * (1 + (this.myPengGang.length - 1) * 3.5)
                        + this.myFirstCardPointX, this.myFirstCardPointY + 20);
                    spGangCard.setTag(this.cleanTag++);
                    this.node.addChild(spGangCard);

                    // 刷新手牌显示
                    this.myCards.sort(function (a, b) {
                        return a - b;
                    });

                    // 计算手牌（非碰杠牌）的起点。有碰牌或杠牌，就又移3位。
                    var iBeginX = this.myFirstCardPointX + this.btnMyCards[12].getContentSize().width * this.myPengGang.length * 3;

                    // 显示亮的牌
                    this.deskliangCards[0].sort(function (a, b) {return a - b;});
                    this.deskliangCards[0].splice(this.HaveTheCard(this.deskliangCards[0],KillMaInfo.card), 3);

                    // 删除3张亮牌的精灵
                    for(var iSpL=0; iSpL<3; iSpL++){
                        this.spLiangCardsArray[0].removeFromParent();
                        this.spLiangCardsArray.shift();
                    }

                    for(var iL=0; iL<this.spLiangCardsArray.length; iL++){
                        this.createpenggangCard(this.spLiangCardsArray[iL],this.deskliangCards[0][iL],0,2);
                        this.spLiangCardsArray[iL].setPositionX(iBeginX + this.btnMyCards[12].getContentSize().width * iL);
                    }

                    var m = 0;  // 从myCards>0开始是手牌计数。
                    for (var l = 0; l<this.myCards.length; l++) {

                        // myCards为0是碰和杠的牌。
                        if (this.myCards[l] == 0){
                            this.btnMyCards[l].setVisible(false);
                        }
                        else
                        {
                            var cardPath = this.plistCardnumToResString(this.myCards[l]);
                            this.btnMyCards[l].getChildByTag(1001).setSpriteFrame(cardPath);
                            this.btnMyCards[l].setPositionX(iBeginX + this.btnMyCards[l].getContentSize().width * (m + this.spLiangCardsArray.length));
                            this.btnMyCards[l].setPositionY(10);
                            this.btnMyCards[l].setVisible(true);
                            if(this.bStatusLiang)
                                this.btnMyCards[l].getChildByTag(1002).setVisible(true);
                            m++;
                        }
                    }

                    var notifynode = ccui.helper.seekWidgetByName(this.node, "notifynode1");
                    notifynode.removeAllChildren();
                    ccui.helper.seekWidgetByName(this.node, "myself_hupng").setVisible(true);
                    var sprHu = ccui.helper.seekWidgetByName(this.node, "myself_hu");
                    sprHu.setVisible(true);
                    var offset = 15;
                    for (var jHu=0; jHu<KillMaInfo.want.length; jHu++) {
                        var sprHucard = this.createpenggangCard(false,KillMaInfo.want[jHu],0,3);
                        offset+= 40;
                        sprHucard.setPosition(offset + sprHucard.getContentSize().width*0.5, 2+sprHucard.getContentSize().height*0.5);
                        sprHu.addChild(sprHucard);
                    }

                    this.wantCards[0] = [];
                    this.wantCards[0] = KillMaInfo.want;

                    break;

                case 1:
                    var penggangNode = {
                        "penggang": false,
                        "card": KillMaInfo.card,
                    };
                    this.rightPengGang.push(penggangNode);

                    // 只本次碰杠的牌即可。不需要遍历之前的显示。
                    var j = this.rightPengGang.length-1;

                    // 每个碰牌有3张
                    for (var k=0; k<3; k++){
                        var spRightCards = this.node.getChildByTag(1200 + k + (j * 3));
                        // 碰或明杠
                        if (KillMaInfo.view) {
                            this.createpenggangCard(spRightCards,this.rightPengGang[j].card,1,1);
                        }
                        // 暗杠
                        else{
                            this.createpenggangCard(spRightCards,0,1,4);
                            this.node.getChildByTag(1200 + 13).setVisible(false);
                        }
                        // 杠在上面加一张子显示
                        if (k==1){
                            var spCard = this.createpenggangCard(false,this.rightPengGang[j].card,1,2);
                            spCard.setPosition(spRightCards.getPositionX(), spRightCards.getPositionY()+10);
                            spCard.setLocalZOrder(20);
                            spCard.setTag(this.cleanTag++);
                            this.node.addChild(spCard);
                        }
                    }

                    this.deskliangCards[1].sort(function (a, b) {return a - b;});
                    this.deskliangCards[1].splice(this.HaveTheCard(this.deskliangCards[1],KillMaInfo.card), 3);
                    var rightBeginCard = this.rightPengGang.length * 3;
                    for(var jCardl=0; jCardl<this.deskliangCards[1].length; jCardl++){
                        var spRightCards = this.node.getChildByTag(1200 + jCardl + rightBeginCard);
                        this.createpenggangCard(spRightCards,this.deskliangCards[1][jCardl],1,2);
                    }

                    var nodeOperate =  ccui.helper.seekWidgetByName(this.node, "locator_right");
                    var sprOperate = cc.Sprite.create();
                    sprOperate.setTexture(res.record_gang);
                    nodeOperate.addChild(sprOperate);
                    sprOperate.runAction(cc.scaleTo(0.7, 1.25));
                    sprOperate.runAction(cc.fadeOut(0.7));
                    var notifynode = ccui.helper.seekWidgetByName(this.node, "notifynode2");
                    notifynode.setLocalZOrder(30);
                    notifynode.removeAllChildren();
                    ccui.helper.seekWidgetByName(this.node, "right_hupng").setVisible(true);
                    var sprHu =  ccui.helper.seekWidgetByName(this.node, "right_hu");
                    sprHu.setVisible(true);
                    var offset = 210;
                    for (var jHu=0; jHu<KillMaInfo.want.length; jHu++) {
                        var sprHucard = this.createpenggangCard(false,KillMaInfo.want[jHu],1,3);
                        offset -= 50;
                        sprHucard.setAnchorPoint(0,0);
                        sprHucard.setPosition(5+sprHucard.getContentSize().width*0.5,offset + sprHucard.getContentSize().height*0.5);
                        sprHu.addChild(sprHucard);
                    }
                    this.wantCards[1] = [];
                    this.wantCards[1] = KillMaInfo.want;

                    break;

                case 2:
                    var penggangNode = {
                        "penggang": false,
                        "card": KillMaInfo.card,
                    };
                    this.leftPengGang.push(penggangNode);

                    // 显示碰的牌

                    // 只本次碰杠的牌即可。不需要遍历之前的显示。
                    var j = this.leftPengGang.length-1;
                    // 每个碰牌有3张
                    for (var k=0; k<3; k++){
                        var spLeftCards = this.node.getChildByTag(1300 + k + (j * 3));

                        // 碰或明杠
                        if (KillMaInfo.view) {
                            this.createpenggangCard(spLeftCards,KillMaInfo.card,2,1);
                        }
                        // 暗杠
                        else{
                            this.createpenggangCard(spLeftCards,0,2,4);
                            this.node.getChildByTag(1300 + 13).setVisible(false);
                        }

                        // 杠在上面加一张子显示
                        if (k==1){
                            var spCard = this.createpenggangCard(false,KillMaInfo.card,2,1);
                            spCard.setPosition(spLeftCards.getPositionX(), spLeftCards.getPositionY()+10);
                            spCard.setLocalZOrder(20);
                            spCard.setTag(this.cleanTag++);
                            this.node.addChild(spCard);
                        }
                    }

                    this.deskliangCards[2].sort(function (a, b) {return a - b;});
                    this.deskliangCards[2].splice(this.HaveTheCard(this.deskliangCards[2], KillMaInfo.card), 3);
                    var leftBeginCard = this.leftPengGang.length * 3;
                    for(var jCardl=0; jCardl<this.deskliangCards[2].length; jCardl++){
                        var spLieftCards = this.node.getChildByTag(1300 + jCardl + leftBeginCard);
                        this.createpenggangCard(spLieftCards,this.deskliangCards[2][jCardl],2,2);
                    }

                    var nodeOperate =  ccui.helper.seekWidgetByName(this.node, "locator_left");
                    var sprOperate = cc.Sprite.create();
                    sprOperate.setTexture(res.record_gang);
                    nodeOperate.addChild(sprOperate);
                    sprOperate.runAction(cc.scaleTo(0.7, 1.25));
                    sprOperate.runAction(cc.fadeOut(0.7));

                    var notifynode = ccui.helper.seekWidgetByName(this.node, "notifynode3");
                    notifynode.setLocalZOrder(30);
                    notifynode.removeAllChildren();
                    ccui.helper.seekWidgetByName(this.node, "left_hupng").setVisible(true);
                    var sprHu = ccui.helper.seekWidgetByName(this.node, "left_hu");
                    sprHu.setVisible(true);
                    var offset = 210;
                    this.wantCards[2] = [];
                    for (var jHu=0; jHu<KillMaInfo.want.length; jHu++) {
                        this.wantCards[2].push(KillMaInfo.want[jHu]);
                        var sprHucard = this.createpenggangCard(false,KillMaInfo.want[jHu],2,3);
                        offset -= 50;
                        sprHucard.setAnchorPoint(0,0);
                        sprHucard.setPosition(5+sprHucard.getContentSize().width*0.5,offset + sprHucard.getContentSize().height*0.5);
                        sprHu.addChild(sprHucard);
                    }
                    break;
            }
        }
    }

    // 暗杠不需要捡起打出去的牌。
    if (KillMaInfo.view) {
        this.lastPlayedCard.setVisible(false);
        this.deskCardsNum[this.lastChairNum]--;
    }

}

// 服务端发来，有人亮牌。
gameclass.kwxtable.prototype.OnView = function(ViewInfo) {

    ViewInfo.cardl.sort(function (a, b) {
        return a - b;
    });

    for (var chairNum=0; chairNum<3; chairNum++) {
        if (this.mod_kwx.chairinfo[chairNum].uid == ViewInfo.uid) {
            var spineBoy;
            var removeSprite = function(){
                if(spineBoy){
                    spineBoy.removeFromParent();
                    spineBoy = null;
                }
            }
            switch (chairNum) {
                // 自己
                case 0:
                    // 先显示亮的牌
                    this.deskliangCards[0] = new Array();
                    this.deskliangCards[0] = ViewInfo.cardl;
                    var iCardl = 0;
                    var cardwd = 76;
                    var iBeginX = this.myFirstCardPointX + this.myPengGang.length * (3 * cardwd + 8);
                    for (var k=0; k<this.myCards.length; k++) {
                        if (this.myCards[k] == ViewInfo.cardl[iCardl])
                        {
                            this.myCards[k] = 0;
                            //var spLiangCard = cc.Sprite.create();
                            //spLiangCard.setTexture(this.CardnumToResString(ViewInfo.cardl[iCardl]));
                            //spLiangCard.initWithSpriteFrameName(this.plistCardnumToResString(ViewInfo.cardl[iCardl]));
                            var spLiangCard = this.createpenggangCard(false,ViewInfo.cardl[iCardl],0,2);
                            //spLiangCard.setAnchorPoint(cc.p(0,0));
                            spLiangCard.setPosition(iBeginX+cardwd*0.5, this.myFirstCardPointY + spLiangCard.getContentSize().height*0.5);
                            iBeginX+= cardwd;
                            //spLiangCard.setColor(cc.color(170,150,60));
                            spLiangCard.setColor(cc.color(255,255,159));
                            spLiangCard.getChildByTag(999).setColor(cc.color(255,255,159));
                            spLiangCard.setTag(this.cleanTag++);
                            this.node.addChild(spLiangCard);
                            this.spLiangCardsArray.push(spLiangCard);

                            if (iCardl != ViewInfo.cardl.length-1)
                                iCardl++;
                            else
                                break;
                        }
                    }

                    for (var l = 0; l<this.myCards.length; l++) {
                        // myCards为0是碰和杠的牌。
                        if (this.myCards[l] == 0){
                            this.btnMyCards[l].setVisible(false);
                        }
                        else
                        {
                            var cardPath = this.plistCardnumToResString(this.myCards[l]);
                            //this.btnMyCards[l].loadTextures(cardPath, cardPath, cardPath,ccui.Widget.PLIST_TEXTURE);
                            this.btnMyCards[l].getChildByTag(1001).setSpriteFrame(cardPath);
                            this.btnMyCards[l].setPosition(cc.p(iBeginX,this.myFirstCardPointY));
                            iBeginX += cardwd;
                            //this.btnMyCards[l].setColor(cc.color(128,128,128));
                            this.btnMyCards[l].getChildByTag(1002).setVisible(true);
                            this.btnMyCards[l].setEnabled(false);
                        }
                    }
                    ccui.helper.seekWidgetByName(this.node, "liang0").setVisible(true);
                    this.bStatusLiang = true;

                    var nodeOperate =  ccui.helper.seekWidgetByName(this.node, "locator_my");
                    //spineBoy = new sp.SkeletonAnimation(res.mjliang_txjson, res.mjliang_txatlas);
                    //spineBoy.setAnimation(123, 'animation', false);
                    //spineBoy.setEndListener(removeSprite);
                    //nodeOperate.addChild(spineBoy);
                    var sprOperate = cc.Sprite.create(res.record_liang);
                    nodeOperate.addChild(sprOperate);
                    sprOperate.runAction(cc.scaleTo(0.7, 1.25));
                    sprOperate.runAction(cc.fadeOut(0.7));

                    var notifynode = ccui.helper.seekWidgetByName(this.node, "notifynode1");
                    notifynode.setLocalZOrder(30);
                    notifynode.removeAllChildren();
                    var offset = 15;
                    ccui.helper.seekWidgetByName(this.node, "myself_hupng").setVisible(true);
                    var sprHu = ccui.helper.seekWidgetByName(this.node, "myself_hu");//cc.Sprite.create(res.hu_png);
                    sprHu.setVisible(true);
                    for (var jHu=0; jHu<ViewInfo.want.length; jHu++) {
                        var sprHucard = this.createpenggangCard(false,ViewInfo.want[jHu],0,3);
                        offset += 40;
                        sprHucard.setPosition(offset + sprHucard.getContentSize().width*0.5,2 + sprHucard.getContentSize().height*0.5);
                        sprHu.addChild(sprHucard);
                    }

                    this.wantCards[0] = new Array();
                    this.wantCards[0] = ViewInfo.want;

                    break;

                case 1:

                    var rightBeginCard = this.rightPengGang.length * 3;
                    this.deskliangCards[1] = new Array();
                    // 亮牌跟碰杠分开一点。
                    for(var jCardl=0; jCardl<ViewInfo.cardl.length; jCardl++){
                        this.deskliangCards[1].push(ViewInfo.cardl[jCardl]);
                        this.seenCardsArray.push(ViewInfo.cardl[jCardl]);
                        var spRightCards = this.node.getChildByTag(1200 + jCardl + rightBeginCard);
                        this.createpenggangCard(spRightCards,ViewInfo.cardl[jCardl],1,2);
                    }

                    var notifynode = ccui.helper.seekWidgetByName(this.node, "notifynode2");
                    notifynode.setLocalZOrder(30);
                    notifynode.removeAllChildren();
                    var offset = 210;
                    ccui.helper.seekWidgetByName(this.node, "right_hupng").setVisible(true);
                    var sprHu = ccui.helper.seekWidgetByName(this.node, "right_hu");
                    sprHu.setVisible(true);
                    this.wantCards[1] = new Array();
                    for (var jHu=0; jHu<ViewInfo.want.length; jHu++) {
                        this.wantCards[1].push(ViewInfo.want[jHu]);
                        var sprHucard = this.createpenggangCard(false,ViewInfo.want[jHu],1,3);
                        offset -= 50;
                        sprHucard.setPosition(5+sprHucard.getContentSize().width*0.5,offset + sprHucard.getContentSize().height*0.5);
                        sprHu.addChild(sprHucard);
                    }

                    ccui.helper.seekWidgetByName(this.node, "liang1").setVisible(true);
                    var nodeOperate =  ccui.helper.seekWidgetByName(this.node, "locator_right");
                    //spineBoy = new sp.SkeletonAnimation(res.mjliang_txjson, res.mjliang_txatlas);
                    //spineBoy.setAnimation(123, 'animation', false);
                    //spineBoy.setEndListener(removeSprite);
                    //nodeOperate.addChild(spineBoy);
                    var sprOperate = cc.Sprite.create(res.record_liang);
                    nodeOperate.addChild(sprOperate);
                    sprOperate.runAction(cc.scaleTo(0.7, 1.25));
                    sprOperate.runAction(cc.fadeOut(0.7));

                    this.kwxResetPos(1,this.rightPengGang.length,ViewInfo.cardl.length);
                    break;
                case 2:
                    var leftBeginCard = this.leftPengGang.length * 3;
                    this.deskliangCards[2] = new Array();
                    for(var jCardl=0; jCardl<ViewInfo.cardl.length; jCardl++){
                        this.deskliangCards[2].push(ViewInfo.cardl[jCardl]);
                        this.seenCardsArray.push(ViewInfo.cardl[jCardl]);
                        var spLeftCards = this.node.getChildByTag(1300 + jCardl + leftBeginCard);
                        this.createpenggangCard(spLeftCards,ViewInfo.cardl[jCardl],2,2);
                    }
                    var notifynode = ccui.helper.seekWidgetByName(this.node, "notifynode3");
                    notifynode.setLocalZOrder(30);
                    notifynode.removeAllChildren();
                    var offset = 210;
                    ccui.helper.seekWidgetByName(this.node, "left_hupng").setVisible(true);
                    var sprHu = ccui.helper.seekWidgetByName(this.node, "left_hu");//cc.Sprite.create(res.hu_png);
                    //sprHu.removeAllChildren();
                    sprHu.setVisible(true);
                    this.wantCards[2] = new Array();
                    for (var jHu=0; jHu<ViewInfo.want.length; jHu++) {
                        this.wantCards[2].push(ViewInfo.want[jHu]);
                        var sprHucard = this.createpenggangCard(false,ViewInfo.want[jHu],2,3);
                        offset -= 50;
                        sprHucard.setPosition(5+sprHucard.getContentSize().width*0.5,offset + sprHucard.getContentSize().height*0.5);
                        sprHu.addChild(sprHucard);
                    }

                    ccui.helper.seekWidgetByName(this.node, "liang3").setVisible(true);

                    var nodeOperate =  ccui.helper.seekWidgetByName(this.node, "locator_left");
                    //spineBoy = new sp.SkeletonAnimation(res.mjliang_txjson, res.mjliang_txatlas);
                    //spineBoy.setAnimation(123, 'animation', false);
                    //spineBoy.setEndListener(removeSprite);
                    //nodeOperate.addChild(spineBoy);
                    var sprOperate = cc.Sprite.create(res.record_liang);
                    nodeOperate.addChild(sprOperate);
                    sprOperate.runAction(cc.scaleTo(0.7, 1.25));
                    sprOperate.runAction(cc.fadeOut(0.7));
                    this.kwxResetPos(2,this.leftPengGang.length,ViewInfo.cardl.length);
                    break;
            }
        }
    }
}

// 服务端发来，总结算。
gameclass.kwxtable.prototype.OnAllEnd = function(DataInfo) {

}

// 服务端发来，擦杠成功。
gameclass.kwxtable.prototype.OnCagang = function(CagangInfo) {

    for (var chairNum=0; chairNum<3; chairNum++) {

        if (this.mod_kwx.chairinfo[chairNum].uid == CagangInfo.uid) {
            this.showArrow(chairNum);
            switch (chairNum) {

                // 自己
                case 0:
                    // 遍历自己碰杠的牌
                    for (var i = 0; i < this.myPengGang.length; i++) {
                        if (CagangInfo.card == this.myPengGang[i].card) {

                            // 起的牌置为0
                            this.drawCard = 0;

                            // 起牌位置不显示
                            this.btnMyCards[13].setVisible(false);

                            // 把擦杠的牌显示到碰牌的上面。
                            //var spGangCard = cc.Sprite.create();
                            //spGangCard.setTexture(this.CardnumToRes(CagangInfo.card, 0));
                            var spGangCard = this.createpenggangCard(false,CagangInfo.card,0,1);
                            //spGangCard.setAnchorPoint(0, 0);
                            var tempwd = spGangCard.getContentSize().width;
                            spGangCard.setPosition(tempwd*1.5 + i*(3*tempwd+8) + this.myFirstCardPointX, this.myFirstCardPointY + spGangCard.getContentSize().height*0.5 + 13);
                            spGangCard.setTag(this.cleanTag++);
                            this.node.addChild(spGangCard);

                            // 置碰为杠
                            this.myPengGang[i].isPeng = false;

                            break;
                        }
                    }

                    break;

                // 右家
                case 1:

                    this.seenCardsArray.push(CagangInfo.card);

                    // 遍历碰杠的牌。
                    for(var i=0; i<this.rightPengGang.length; i++){
                        if (CagangInfo.card == this.rightPengGang[i].card) {
                            // 起牌位置不显示
                            this.node.getChildByTag(1200 + 13).setVisible(false);
                            // 杠的牌上面叠加一张
                            var spRightCards = this.node.getChildByTag(1200 + 1 + (i * 3));
                            var spCard = this.createpenggangCard(false,this.rightPengGang[i].card,1,1);
                            spCard.setPosition(spRightCards.getPositionX(), spRightCards.getPositionY()+10);
                            spCard.setTag(this.cleanTag++);
                            spCard.setLocalZOrder(20);
                            this.node.addChild(spCard);

                            // 置碰为杠
                            this.rightPengGang[i].isPeng = false;

                            break;
                        }

                    }
                    break;

                // 左家
                case 2:

                    this.seenCardsArray.push(CagangInfo.card);

                    // 遍历碰杠的牌。
                    for(var i=0; i<this.leftPengGang.length; i++){
                        if (CagangInfo.card == this.leftPengGang[i].card) {
                            // 起牌位置不显示
                            this.node.getChildByTag(1300 + 13).setVisible(false);
                            // 杠的牌上面叠加一张
                            var spLeftCards = this.node.getChildByTag(1300 + 1 + (i * 3));
                            var spCard = this.createpenggangCard(false,this.leftPengGang[i].card,2,1);
                            spCard.setPosition(spLeftCards.getPositionX(), spLeftCards.getPositionY()+10);
                            spCard.setLocalZOrder(20);
                            spCard.setTag(this.cleanTag++);
                            this.node.addChild(spCard);

                            // 置碰为杠
                            this.leftPengGang[i].isPeng = false;
                            break;
                        }
                    }
                    break;
            }
        }
    }
};

// 清空桌面
gameclass.kwxtable.prototype.ResetDesk = function() {
    ccui.helper.seekWidgetByName(this.node, "shangloubg").setVisible(false);
    for(var i=0; i<this.btnMyCards.length; i++){
        this.btnMyCards[i].removeFromParent();
    }
    // 清理左右的手牌
    for(var i=0; i<=13; i++){
        this.node.removeChildByTag(1200 + i);
        this.node.removeChildByTag(1300 + i);
    }

    // 清理亮牌后的胡牌显示
    for(var j=1; j<=3; j++){
        ccui.helper.seekWidgetByName(this.node, "notifynode" + j).removeAllChildren();
    }

    for(var i=2000; i<this.cleanTag; i++){
        this.node.removeChildByTag(i);
    }

    ccui.helper.seekWidgetByName(this.node, "liang0").setVisible(false);
    ccui.helper.seekWidgetByName(this.node, "liang1").setVisible(false);
    ccui.helper.seekWidgetByName(this.node, "liang3").setVisible(false);
    ccui.helper.seekWidgetByName( this.node, "pointer" ).setVisible( false );

    ccui.helper.seekWidgetByName(this.node, "myself_hupng").setVisible(false);
    ccui.helper.seekWidgetByName(this.node, "right_hupng").setVisible(false);
    ccui.helper.seekWidgetByName(this.node, "left_hupng").setVisible(false);
    var myself_hu = ccui.helper.seekWidgetByName(this.node, "myself_hu")
    myself_hu.setVisible(false);
    myself_hu.removeAllChildren();
    var right_hu = ccui.helper.seekWidgetByName(this.node, "right_hu")
    right_hu.setVisible(false);
    right_hu.removeAllChildren();
    var left_hu = ccui.helper.seekWidgetByName(this.node, "left_hu")
    left_hu.setVisible(false);
    left_hu.removeAllChildren();

    // 桌面信息初始化
    this.btnMyCards = [];
    this.myCards = [];
    this.isQipai = false;
    this.deskCardsNum = [0, 0, 0];
    this.rightPengGang = [];
    this.leftPengGang = [];
    this.myPengGang = [];
    this.drawCard = 0;
    this.lastPlayedCard = null;
    this.anGangCard = false;
    this.bStatusLiang = false;
    this.spLiangCardsArray = [];
    this.wantCards[0] = [];
    this.wantCards[1] = [];
    this.wantCards[2] = [];
    //this.bGang = false;
    this.cleanTag = 2000;
    this.gangcard = 0;
    this.gangcardbgX = 0;
    this.deskliangCards = [];
    this.seenCardsArray = [];
    this.drawcardposX = 0;
}

// 显示听牌图标
gameclass.kwxtable.prototype.DisplayTingPng = function() {
    if (this.drawCard != 0) {
        for(var k=0; k<this.liangArray.length; k++) {
            if (this.liangArray[k].daTingCard == this.drawCard) {
                var spTing = new cc.Sprite(res.png_ting);
                spTing.setAnchorPoint(0,1);
                spTing.setPositionY(90);
                spTing.setName("tingPng");
                this.btnMyCards[13].addChild(spTing);
                break;
            }
        }
    }

    for(var i=0; i<this.myCards.length; i++){
        for(var j=0; j<this.liangArray.length; j++){
            if(this.myCards == 0)
                continue;
            if(this.liangArray[j].daTingCard == this.myCards[i]){
                var spTing = new cc.Sprite(res.png_ting);
                spTing.setAnchorPoint(0,1);
                spTing.setPositionY(90);
                spTing.setName("tingPng");
                this.btnMyCards[i].addChild(spTing);
                break;
            }
        }
    }
}

//----------------------------------fsh-begin-------------------------------------
//得到一副能听的牌
gameclass.kwxtable.prototype.getTingCards = function(datingcard)
{
    var tingMyCards = gameclass.clone(this.myCards);
    tingMyCards.push(this.drawCard);
    for(var j = 0; j < tingMyCards.length; j++)
    {
        if (tingMyCards[j] == datingcard)
        {
            tingMyCards.splice(j,1);
            break;
        }
    }
    return tingMyCards;
}
//是否胡7对
gameclass.kwxtable.prototype.isHuQidui = function(huMyCards)
{
    if(huMyCards.length < 13)
        return false;
    var cardArrObj = [];
    cardArrObj = this.keepcardStruct(huMyCards);

    for(var n = 0; n < cardArrObj.length; n++)
    {
        if (cardArrObj[n] == 1 || cardArrObj[n] == 3)  return false;
    }
    return true;
}
//得到胡牌结构
gameclass.kwxtable.prototype.getHuCards = function(tingMyCards,huArr)
{
    var huMyCards = [];
    huMyCards = gameclass.clone(tingMyCards);
    this.hucardStructArr = [];
    this.liangcardStructArr = [];

    var isqidui = false;
    for (var i = 0; i < huArr.length; i++) {
        if (i != 0)  huMyCards.splice(-1, 1);
        huMyCards.push(huArr[i]);
        if (!this.isHuQidui(huMyCards))
        {
            this.keepHucardStruct(huMyCards, huArr[i]);
        }
        else
        {
            isqidui = true;
        }
    }

    this.hucardStruct = [];
    this.liangcardArr = [];

    if (huArr.length < this.hucardStructArr.length && huArr.length > 1)
    {
        var jiangcard = 0; var hucardlen = []; var tempArr = [];  var flag = 0; var bijiao = 0; var hucard = 0;
        var lenhu = this.hucardStructArr.length;
        for(var card = 0; card < 38; card++) tempArr.push(0);
        for(var k = 0; k < lenhu; k++)
        {
            var hulen = this.hucardStructArr[k].length;
            for (var ii = 0; ii < huArr.length; ii++)
            {
                var isbreak = false;
                for(var hh = 0; hh < hulen; hh++){
                    if(this.hucardStructArr[k][hh].length == 1 && this.hucardStructArr[k][hh][0] == huArr[ii])
                    {
                        var jiang = this.hucardStructArr[k][hh-1][0];
                        tempArr[jiang] += 1;
                        if (tempArr[jiang] > bijiao)
                        {
                            hucard = huArr[ii];
                            bijiao = tempArr[jiang];
                            jiangcard = jiang;
                        }
                        if (flag == huArr[ii]) hucardlen.push(huArr[ii]);
                        flag = huArr[ii];
                        isbreak = true;
                        break;
                    }
                }
                if(isbreak) break;
            }
        }

        if (bijiao <=1)
        {
            var jiangArr = [];
            for(var k = 0; k < lenhu; k++)
            {
                var hulen = this.hucardStructArr[k].length;
                for(var h = 0; h < hulen; h++){
                    if(this.hucardStructArr[k][h].length == 1 && this.hucardStructArr[k][h][0] == hucard)
                    {
                        jiangArr.push(this.hucardStructArr[k][h-1][0]);
                    }
                }

            }
            for(var i = 0; i < jiangArr.length; i++)
            {
                var temp1 = 0;
                var abs = Math.abs(hucard - jiangcard);
                if(jiangArr[i] != jiangcard)
                {
                    temp1 = Math.abs(hucard - jiangArr[i]);
                    if(temp1 < abs) jiangcard = jiangArr[i];
                }
            }
        }
        //cc.log(jiangcard ,bijiao," = 选出权重的将")
        var delindex = [];
        for (var ii = 0; ii < hucardlen.length; ii++)
        {
            for(var k = 0; k < this.hucardStructArr.length; k++)
            {
                var isbreak3 = false;
                var hulen1 = this.hucardStructArr[k].length;
                for(var mm = 0 ; mm < hulen1; mm++){
                    if(this.hucardStructArr[k][mm].length == 1 && this.hucardStructArr[k][mm][0] == hucardlen[ii])
                    {
                        if(this.hucardStructArr[k][mm-1][0] != jiangcard)
                        {
                            delindex.push(k);
                            this.quanzhongjiang = jiangcard;
                            isbreak3 = true;
                            break;
                        }
                    }
                }
                if(isbreak3) break;
            }
        }
        for(var kk = 0; kk < delindex.length; kk++)
        {
            this.hucardStructArr.splice(delindex[kk]-kk,1);
            this.liangcardStructArr.splice(delindex[kk]-kk,1);
        }
    }

    return isqidui;
}
//保存牌型结构
gameclass.kwxtable.prototype.keepcardStruct = function(MyCards)
{
    var cardsArr = [];
    for(var i = 0; i < 38; i++)
    {
        var num = 0;
        for(var j = 0; j < MyCards.length; j++)
        {
            if (i == MyCards[j])
            { num += 1;  cardsArr[i] = num; }
            else { cardsArr[i] = num; }
        }
    }
    return cardsArr;
}
//保存胡牌结构
gameclass.kwxtable.prototype.keepHucardStruct = function(huMyCards,huCard)
{
    var cardsArr = [];
    var len = Math.floor(huMyCards.length/3);

    cardsArr = this.keepcardStruct(huMyCards);
    //去掉做将的牌
    this.jiangCardLiang = 0;
    for(var j = 0 ; j < cardsArr.length; j++)
    {
        var clonecardsArr = gameclass.clone(cardsArr);
        if(clonecardsArr[j] >= 2)
        {
            this.hucardStruct = [[],[],[],[],[],[]];
            this.liangcardArr = [[],[],[]];
            clonecardsArr[j] -= 2;

            //if(j == huCard && (cardsArr[j]==2||cardsArr[j]==4)) this.jiangCardLiang = j;
            if(j == huCard) this.jiangCardLiang = j; // 胡将必亮将
            //this.jiangCardLiang = j;
            var ishu = this.isHuPai(clonecardsArr,huCard,len,true,true);

            if(ishu) {
                if(j == huCard && (cardsArr[j]==2||cardsArr[j]==4)) this.liangcardArr[0].push(j);
                if(j == huCard) this.liangcardArr[0].push(j);
                this.hucardStruct[len].push(j);
                this.hucardStruct[len].push(j);
                this.hucardStruct[len+1].push(huCard);
                this.hucardStructArr.push(this.hucardStruct);
                this.liangcardStructArr.push(this.liangcardArr);
                len = Math.floor(huMyCards.length/3)
            }
        }
    }
}
//检查胡牌
gameclass.kwxtable.prototype.isHuPai = function(cardsArr,huCard,len,bool,jiang)
{
    var index = 0;
    var sum = this.Remain(cardsArr);
    if(sum == 0) return true;
    for(var  i = 0; i < 38; i++)
    {
        if (cardsArr[i] != 0)
        {
            index = 0;
            //   3张组合(刻子)
            if(cardsArr[i] >= 3)
            {
                cardsArr[i]   -=   3;

                if (huCard != 100) {
                    if (i == huCard) this.liangcardArr[1].push(i);
                    index = len - Math.floor(sum/3);

                    if (this.hucardStruct[index].length == 0 && i != 0){
                        this.hucardStruct[index].push(i);
                        this.hucardStruct[index].push(i);
                        this.hucardStruct[index].push(i);
                    }
                }
                if(this.isHuPai(cardsArr,huCard,len,bool,jiang)) return   true;
                if(this.Remain(cardsArr) <= 3 && huCard != 100)   return false;
                cardsArr[i]   +=   3;
            }
            //   2张组合(将牌)
            if(!jiang && cardsArr[i] >= 2)
            {
                jiang   =   true;
                cardsArr[i]   -=   2;

                if(this.isHuPai(cardsArr,huCard,len,bool,jiang))   return   true;
                cardsArr[i]   +=   2;
                jiang   =   false;
            }
            if(i > 30) return  false;
            //   顺牌组合
            if(i%10 != 8 && i%10 != 9 && cardsArr[i+1] && cardsArr[i+2])
            {
                cardsArr[i]--;
                cardsArr[i+1]--;
                cardsArr[i+2]--;

                if (huCard != 100)
                {
                    if (bool && (i == huCard || i+1 == huCard || i+2 == huCard))
                        //&& this.jiangCardLiang != i && i+1 != this.jiangCardLiang && i+2 != this.jiangCardLiang)
                    { // 这里可能会出问题（从前遍历）
                        bool = false;
                        if(i != huCard) this.liangcardArr[2].push(i);
                        if(i+1 != huCard) this.liangcardArr[2].push(i+1);
                        if(i+2 != huCard) this.liangcardArr[2].push(i+2);
                    }
                    index = len - Math.floor(sum/3);
                    //cc.log(bool,huCard,i,i+1,i+2,"shunzi")
                    if (this.hucardStruct[index].length == 0 && i != 0){
                        this.hucardStruct[index].push(i);
                        this.hucardStruct[index].push(i+1);
                        this.hucardStruct[index].push(i+2);
                    }
                }
                //cc.log(i,i+1,i+2,"shunzi")
                if(this.isHuPai(cardsArr,huCard,len,bool,jiang))   return  true;
                if(this.Remain(cardsArr) <= 3 && huCard != 100)    return false;
                cardsArr[i]++;
                cardsArr[i+1]++;
                cardsArr[i+2]++;
            }
        }
    }
    return false;
}
//   检查剩余牌数
gameclass.kwxtable.prototype.Remain = function(cardsArr)
{
    var sum = 0;
    for(var i =0;i < 38; i ++){
        sum += cardsArr[i];
    }
    return sum;
}
//从A数组中删除B数组中已有的元素
gameclass.kwxtable.prototype.delAarrFromBarr = function(AcardsArr,BcardsArr)
{
    var cloneAcardsArr = gameclass.clone(AcardsArr);
    var cloneBcardsArr = gameclass.clone(BcardsArr);
    var delindex = [];
    for (var delhand = 0; delhand < cloneAcardsArr.length; delhand++) {
        for (var ideljuzi = 0; ideljuzi < cloneBcardsArr.length; ideljuzi++) {
            if (cloneBcardsArr[ideljuzi] != 0 && cloneAcardsArr[delhand] == cloneBcardsArr[ideljuzi]) {
                cloneBcardsArr[ideljuzi] = 0;
                cloneAcardsArr[delhand] = 0;
                delindex.push(delhand);
            }
        }
    }
    delindex.sort(function(a,b){return a-b});

    cloneAcardsArr = gameclass.clone(AcardsArr);
    for(var _ddd = 0; _ddd < delindex.length; _ddd++) {
        cloneAcardsArr.splice(delindex[_ddd]-_ddd,1);
    }
    return cloneAcardsArr;
}
//整理出多余的card
gameclass.kwxtable.prototype.zhengliArr = function(tempArr)
{
    var cardArray = [];
    for(var m = 0; m < tempArr.length; m++)
    {
        for(var n = 0; n < tempArr[m].length; n++)
        {
            for(var k = 0; k < tempArr[m][n].length; k++){
                var temp = 0;
                for(var _i = 0; _i < cardArray.length; _i++)
                {
                    if (tempArr[m][n][k] == cardArray[_i])  temp += 1;
                }
                if (cardArray.length <= 0 || temp == 0) {
                    //这里可能会加不上对子
                    cardArray.push(tempArr[m][n][k]);
                }
            }
        }
    }
    return cardArray;
}
//数量最多的取出
gameclass.kwxtable.prototype.getMaxCardnum = function(nojuziArr)
{
    var keepArr = [];  var addliangcard = [];
    for(var i = 0; i < 38; i++)  keepArr[i] = 0;
    for(var m = 0; m < nojuziArr.length; m++)
    {
        for(var n = 0; n < nojuziArr[m].length; n++)
        {
            var num = 0; var temp = 0;
            for(var k = 0; k < nojuziArr[m][n].length; k++)
            {
                for(var j = 0; j < keepArr.length; j++)
                {
                    if (j == nojuziArr[m][n][k])
                    {
                        if (temp == j)  {num += 1;}
                        else { temp = j ; num = 1;}
                        if (num > keepArr[j])  keepArr[j] = num ;
                    }
                }
            }
        }
    }

    for(var ok = 0 ; ok < keepArr.length; ok++)
    {
        if (keepArr[ok] > 0)
        {
            for(var ye = 0; ye < keepArr[ok]; ye++)   addliangcard.push(ok);
        }
    }
    return addliangcard;
}

//亮牌规则检测：手牌是否成一句话 ，亮出的牌+胡牌是否成一句话 jiang = false则要遍历将
gameclass.kwxtable.prototype.liangAndHandcheck = function(huCardsArr, tingcardsArr, cardlArray, jiang) {
    var isYijuhua = false; var temphucard = 100;
    var ishuHand = false; var ishuLiang = false;  var liangcardsArr = [];

    var handcardsArr = this.keepcardStruct(tingcardsArr);
    var tempcardlArray = gameclass.clone(cardlArray);
    //if (jiang) temphucard = -100;
    if (tingcardsArr.length == 0)   ishuHand = true;
    else   ishuHand = this.isHuPai(handcardsArr, temphucard, 0, true, !jiang); // 将在手上否

    for (var kk = 0; kk < huCardsArr.length; kk++) {
        tempcardlArray.push(huCardsArr[kk]);
        //liangcardsArr = [];
        liangcardsArr = this.keepcardStruct(tempcardlArray);
        ishuLiang = this.isHuPai(liangcardsArr, temphucard, 0, true, jiang); //
        tempcardlArray.splice(-1, 1);
        if (!ishuLiang) break;
    }

    if (ishuHand && ishuLiang ) isYijuhua = true;
    return isYijuhua;
}
//亮出的牌做遍历检测是否都成一句话（双保险）
gameclass.kwxtable.prototype.liangPaicheck = function(cctingcardArr)
{
    var cardliaArr = [];
    var compare = []; var tempArr = []; var allarr = [];
    var hucount = this.hucardStructArr.length;
    for(var i = 0; i < hucount; i++)
    {
        for(var j = 0; j < this.hucardStructArr[i].length; j++)
        {
            if (this.hucardStructArr[i][j].length > 1)
            {
                var threehe = 0; var temp = 0;
                for(var k = 0; k < this.hucardStructArr[i][j].length; k++)
                {
                    if (this.hucardStructArr[i][j][0] == this.hucardStructArr[i][j][1]) temp = 100; //kezi or jiang
                    threehe =  threehe + this.hucardStructArr[i][j][k] + temp;
                    if(k == this.hucardStructArr[i][j].length-1)
                        allarr.push(threehe);
                }
            }
        }
    }
    var len = allarr.length/hucount;

    var cloneallarr = gameclass.clone(allarr);
    for(var i = 0; i < len; i++)
    {
        var flag = 0;var ttp = 0;
        for(var j = 0; j < cloneallarr.length; j++)
        {
            if(allarr[i] == cloneallarr[j])
            {
                if (ttp != Math.ceil((j+1)/len))
                {
                    ttp = Math.ceil((j+1)/len);
                    flag += 1;
                }
                if(flag == hucount)
                {
                    cloneallarr[j] = 0;
                    compare.push(allarr[i]);
                    break;
                }
            }
        }
    }
    for(var j = 0; j < compare.length; j++)
    {
        for(var i = 0; i < this.hucardStructArr[0].length; i++)
        {
            if (this.hucardStructArr[0][i].length > 1)
            {
                var tt = 0; var thr = 0; var fg = false;
                for(var k = 0; k < this.hucardStructArr[0][i].length; k++)
                {
                    if (this.hucardStructArr[0][i][0] == this.hucardStructArr[0][i][1]) tt = 100; //peng
                    thr =  thr + this.hucardStructArr[0][i][k] + tt;
                    if(k == this.hucardStructArr[0][i].length-1)
                    {
                        if(compare[j] == thr)
                        {
                            for(var h = 0; h < this.hucardStructArr[0][i].length; h++)
                                cardliaArr.push(this.hucardStructArr[0][i][h]);
                            fg = true;
                            break;
                        }
                    }
                }
                if (fg)  break;
            }

        }
    }
    cardliaArr = this.delAarrFromBarr(cctingcardArr,cardliaArr);

    return cardliaArr;
}
//----------------------------------fsh--------------------------------------

// 显示亮牌图标
gameclass.kwxtable.prototype.DisplayLiangPng = function(stepCard, iClickBtn) {
    //var _this = this;
    for(var iStep=0; iStep<this.liangArray.length; iStep++){
        if(stepCard==this.liangArray[iStep].daTingCard){
            //----------------------------------fsh--------------------------------------

            var cardlArray = [];
            var huCardsArr = [];
            var tingcardsArr =[];
            var opttingcardArr = [];
            this.liangcardArr = [[],[],[],[]];
            this.hucardStruct = [[],[],[],[],[],[]];
            huCardsArr = this.liangArray[iStep].huCards;
            tingcardsArr = this.getTingCards(stepCard);
            var temdel = [];
            for(var delo = 0; delo < tingcardsArr.length; delo++)
            {
                if(tingcardsArr[delo] == 0) {
                    temdel.push(delo);
                }
            }
            temdel.sort(function(a,b){return a-b});
            for(var ddd = 0; ddd < temdel.length; ddd++) {
                tingcardsArr.splice(temdel[ddd]-ddd,1);
            }
            var cctingcardArr = gameclass.clone(tingcardsArr);
            opttingcardArr = gameclass.clone(tingcardsArr);
            this.quanzhongjiang = 0;
            // 1，根据胡什么牌，亮相关的牌
            var isqidui = this.getHuCards(opttingcardArr, huCardsArr);

            if(isqidui) {
                cardlArray = [];
                for(var qd = 0; qd < opttingcardArr.length; qd++)
                {
                    if (opttingcardArr[qd] == huCardsArr[0])
                        cardlArray.push(opttingcardArr[qd]);
                }
                if(huCardsArr.length >= 2) cardlArray = tingcardsArr;
            }
            else
            {
                // 2, 去掉重复的亮牌
                cardlArray = this.zhengliArr(this.liangcardStructArr);

                // 3，要胡的牌亮四归一(碰的没算)
                var sgycards = [];
                for(var sgy = 0; sgy < huCardsArr.length; sgy++)
                {
                    var cardArrObj = [];
                    var myHandCards = this.getTingCards(stepCard);
                    cardArrObj = this.keepcardStruct(myHandCards);

                    for(var obj = 0; obj < cardArrObj.length; obj++)
                    {
                        if(cardArrObj[obj] == 3 && obj == huCardsArr[sgy])
                        {
                            sgycards.push(huCardsArr[sgy]);
                        }
                    }
                }
                for(var add = 0; add < sgycards.length; add++)
                {
                    cardlArray.push(sgycards[add]);
                }

                //亮牌成立条件：手牌成句，并且亮牌加任意胡的牌成句
                for (var odel = 0; odel < cardlArray.length; odel++) {
                    for (var del = 0; del < tingcardsArr.length; del++) {
                        if (tingcardsArr[del] == cardlArray[odel]) {
                            tingcardsArr.splice(del, 1);//从听牌中初步删除亮牌
                            break;
                        }
                    }
                }
                var cloneCardlArr = gameclass.clone(cardlArray);
                var isYijuhua = false;//isYijuhua为true才是都成句
                isYijuhua = this.liangAndHandcheck(huCardsArr,tingcardsArr,cardlArray,true);// 将在手上
                if(!isYijuhua) isYijuhua = this.liangAndHandcheck(huCardsArr,tingcardsArr,cardlArray,false);// 将不在手上
                if (!isYijuhua)
                {
                    //4 ,找出手牌不成句的亮出
                    var nojuziArr = [[], [], [], [], [], [], [], [], []];
                    for (var ihu = 0; ihu < this.hucardStructArr.length; ihu++)
                    {
                        //cc.log(ihu,"-----------begin----------------");
                        var flag = false; //var flg = false;
                        var juziArr = [];
                        var tempnojuziArr = [];
                        var hlen = this.hucardStructArr[ihu].length;
                        var huc = this.hucardStructArr[ihu][hlen-1][0];
                        var jiangc = this.hucardStructArr[ihu][hlen-2][0];
                        for (var _cc = 0; _cc < tingcardsArr.length; _cc++)
                        {
                            tempnojuziArr.push(tingcardsArr[_cc]);
                        }
                        //for(var ji = 0 ; ji < cardlArray.length; ji++)
                        //{
                        //    if(cardlArray[ji] == jiangc) {flg = true;break;}
                        //}

                        for (var ijuzi = 0; ijuzi < hlen; ijuzi++) {
                            //碰到复杂句型组合时这里有可能遍历出错（只能通过后面检测去纠正了）
                            var juzilen = this.hucardStructArr[ihu][ijuzi].length;
                            if (!flag)
                            {
                                for(var delhu =  0; delhu < juzilen; delhu++)
                                {
                                    if((this.hucardStructArr[ihu][ijuzi][delhu] == huc && jiangc != huc)
                                        ||(this.hucardStructArr[ihu][ijuzi][delhu] == jiangc && this.hucardStructArr[ihu][ijuzi].length == 2 && jiangc == huc))
                                    //if(this.hucardStructArr[ihu][ijuzi][delhu] == huc && jiangc != huc)
                                    //if(this.hucardStructArr[ihu][ijuzi][delhu] == jiangc && this.hucardStructArr[ihu][ijuzi].length == 2 && jiangc == huc)
                                    {
                                        flag = true;  break; //cc.log(this.hucardStructArr[ihu][ijuzi])
                                    }
                                    //if(this.hucardStructArr[ihu][ijuzi][delhu] == huc){flag = true;  break; }
                                }
                                if (flag) continue;
                            }
                            //cc.log(tempnojuziArr);
                            var count = 0;  var idx1 = 0;var idx2 = 0;var idx3 = 0;
                            var juzicloneArr = gameclass.clone(this.hucardStructArr[ihu][ijuzi]);
                            //for (var ihand = tempnojuziArr.length-1; ihand >= 0; ihand--)
                            for (var ihand = 0; ihand < tempnojuziArr.length; ihand++)
                            {
                                for (var three = 0; three < juzilen; three++)
                                {
                                    if (juzilen > 1 && juzicloneArr[three] == tempnojuziArr[ihand] && juzicloneArr[three] != 0)
                                    {
                                        count += 1;
                                        if(count == 1) idx1 = ihand;
                                        if(count == 2) idx2 = ihand;
                                        if(count == 3) idx3 = ihand;
                                        if (count == juzilen)
                                        {
                                            if(juzilen == 2 && jiangc == tempnojuziArr[ihand] && jiangc == huc)
                                            {
                                                count = 3;
                                                break;
                                            }
                                            tempnojuziArr[idx1] = 0;
                                            tempnojuziArr[idx2] = 0;
                                            if(count == 3) tempnojuziArr[idx3] = 0;
                                            for (var needdel = 0; needdel < juzilen; needdel++)
                                            {
                                                juziArr.push(this.hucardStructArr[ihu][ijuzi][needdel]);
                                                //cc.log(this.hucardStructArr[ihu][ijuzi][needdel])
                                            }
                                        }
                                        //if(juzilen == 2) count = 3;
                                        juzicloneArr[three] = 0;
                                        break;
                                    }
                                }
                                if(count == 3) break;
                            }
                        }

                        var clonetingcardsArr = this.delAarrFromBarr(tingcardsArr,juziArr);
                        clonetingcardsArr.sort(function(a,b){return a-b});
                        nojuziArr[ihu].push(clonetingcardsArr);
                        juziArr = [];
                    }

                    var addliangcard = [];
                    addliangcard = this.getMaxCardnum(nojuziArr);

                    for (var alc = 0; alc < addliangcard.length; alc++)
                    {
                        cardlArray.push(addliangcard[alc]);
                    }
                    var clonetingcardsArr1 = this.delAarrFromBarr(tingcardsArr,addliangcard);

                    //5,检测亮出的牌和任意胡牌组合是否成一句话
                    isYijuhua = this.liangAndHandcheck(huCardsArr,clonetingcardsArr1,cardlArray,true);// 将在手上
                    if(!isYijuhua) isYijuhua = this.liangAndHandcheck(huCardsArr,clonetingcardsArr1,cardlArray,false);// 将不在手上

                    //如果还不能成一句话，无语了，改成下面的亮牌遍历
                    if(!isYijuhua){
                        //先把权重的将亮出去(将可能需要先亮出去)
                        if(this.quanzhongjiang > 0){
                            cardlArray.push(this.quanzhongjiang);
                            cardlArray.push(this.quanzhongjiang);
                            clonetingcardsArr1 = this.delAarrFromBarr(clonetingcardsArr1,[this.quanzhongjiang,this.quanzhongjiang]);
                        }
                        isYijuhua = this.liangAndHandcheck(huCardsArr,clonetingcardsArr1,cardlArray,false);// 将不在手上
                        if(!isYijuhua)
                            cardlArray = this.liangPaicheck(cctingcardArr);
                    }
                }
                //6,卡5亮牌
                for(var kwu = 0; kwu < huCardsArr.length; kwu++)
                {
                    var hukwxcard = huCardsArr[kwu];
                    if(hukwxcard%10 == 5)
                    {
                        for(var ihul = 0; ihul < this.hucardStructArr.length;ihul++)
                        {
                            for(var ihu = 0; ihu < this.hucardStructArr[ihul].length;ihu++)
                            {
                                if(this.hucardStructArr[ihul][ihu].length > 2)
                                {
                                    if (this.hucardStructArr[ihul][ihu][0] != this.hucardStructArr[ihul][ihu][1])
                                    {
                                        var he = this.hucardStructArr[ihul][ihu][0] + this.hucardStructArr[ihul][ihu][1] + this.hucardStructArr[ihul][ihu][2];
                                        if (he == hukwxcard*3)
                                        {
                                            var handcnum1 = false;var handcnum2 = false;var handcnum3 = false;
                                            //此时亮牌中是否有已4 6；
                                            for(var relia = 0; relia < cardlArray.length;relia++)
                                            {
                                                if(hukwxcard-1 == cardlArray[relia]) handcnum1 = true;
                                                if(hukwxcard+1 == cardlArray[relia]) handcnum3 = true;
                                            }
                                            if(handcnum1 && handcnum3) break;

                                            //此时手牌是否有456；
                                            handcnum1 = false; handcnum3 = false;
                                            var handcards = this.delAarrFromBarr(cctingcardArr,cardlArray);
                                            for(var rehand = 0; rehand < handcards.length;rehand++)
                                            {
                                                if(hukwxcard-1 == handcards[rehand]) handcnum1 = true;
                                                if(hukwxcard == handcards[rehand]) handcnum2 = true;
                                                if(hukwxcard+1 == handcards[rehand]) handcnum3 = true;
                                            }
                                            if (handcnum1 && handcnum2 && handcnum3)
                                            {
                                                cardlArray.push(hukwxcard-1);
                                                cardlArray.push(hukwxcard);
                                                cardlArray.push(hukwxcard+1);
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.hucardStructArr = [];
            this.liangcardStructArr = [];
            //----------------------------------fsh-end-------------------------------------
            /////////////////////////////////////////
            // 上面都是计算要亮什么牌，这里才是真正在亮的牌上加上图标。
            cardlArray.sort(function(a,b){return a-b});

            var cardlArrayClone = gameclass.clone(cardlArray);

            // 先看起的牌是否能亮
            if(this.btnMyCards[13]){
                var iHave = this.HaveTheCard(cardlArrayClone, this.drawCard);
                if(iHave != -1 && iClickBtn != 13){
                    if (!this.btnMyCards[13].getChildByName("liangPng")) {
                        var spLiang = new cc.Sprite(res.png_liang);
                        spLiang.setAnchorPoint(1, 0);
                        spLiang.setPosition(75, 3);
                        this.btnMyCards[13].addChild(spLiang, 2, "liangPng");
                        //this.btnMyCards[13].setColor(cc.color(170, 150, 60));
                        this.btnMyCards[13].getChildByTag(1002).setVisible(true);
                    }
                    cardlArrayClone.splice(iHave, 1);
                }
                else {
                    var liangpng = this.btnMyCards[13].getChildByName("liangPng");
                    if(liangpng)
                        liangpng.removeFromParent();

                    if(this.btnMyCards[13].getChildByName("tingPng")
                        && this.HaveTheCard(this.wantCards[1], this.drawCard)==-1
                        && this.HaveTheCard(this.wantCards[2], this.drawCard)==-1){
                        //this.btnMyCards[13].setColor(cc.color(255,255,255));
                        this.btnMyCards[13].getChildByTag(1002).setVisible(false);
                    } else {
                        //this.btnMyCards[13].setColor(cc.color(128, 128, 128));
                        this.btnMyCards[13].getChildByTag(1002).setVisible(true);
                    }
                }
            }

            var iCardl = 0;
            for (var k=0; k<this.myCards.length; k++) {
                if(this.myCards[k] == 0)
                    continue;

                if (this.myCards[k] == cardlArrayClone[iCardl] && k!=iClickBtn)
                {
                    iCardl++;
                    if (!this.btnMyCards[k].getChildByName("liangPng")){
                        var spLiang = new cc.Sprite(res.png_liang);
                        spLiang.setAnchorPoint(1,0);
                        spLiang.setPosition(75, 3);
                        this.btnMyCards[k].addChild(spLiang, 2, "liangPng");
                        //this.btnMyCards[k].setColor(cc.color(170,150,60));
                        this.btnMyCards[k].getChildByTag(1002).setVisible(true);
                    }
                }
                else{
                    var liangpng = this.btnMyCards[k].getChildByName("liangPng");
                    if(liangpng)
                        liangpng.removeFromParent();

                    if(this.btnMyCards[k].getChildByName("tingPng")
                        && this.HaveTheCard(this.wantCards[1], this.myCards[k])==-1
                        && this.HaveTheCard(this.wantCards[2], this.myCards[k])==-1)
                        //this.btnMyCards[k].setColor(cc.color(255,255,255));
                        this.btnMyCards[k].getChildByTag(1002).setVisible(false);
                    else
                        //this.btnMyCards[k].setColor(cc.color(128,128,128));
                        this.btnMyCards[k].getChildByTag(1002).setVisible(true);

                }
            }

            this.wantArray = this.liangArray[iStep].huCards;
            this.cardliangArray = cardlArray;
        }
    }

    // 点起的牌变亮。
    //this.btnMyCards[iClickBtn].setColor(cc.color(255,255,255));
    this.btnMyCards[iClickBtn].getChildByTag(1002).setVisible(false);
};

// 收到碰/杠牌之后的显示
gameclass.kwxtable.prototype.OnPengGang = function(penggangInfo, isPeng) {
    if(this.tuoguan){//金币场托管
        this.HideOperator();
    }
    if(isPeng){
        mod_sound.playeffect(g_music.peng, false);
    }
    else{
        mod_sound.playeffect(g_music.gang, false);
    }
    ccui.helper.seekWidgetByName(this.node, "pointer").setVisible(false);

    //if(isPeng)
    //    this.mod_kwx.uid_draw = penggangInfo.uid;

    for (var ChairNum=0; ChairNum<3; ChairNum++) {
        if (this.mod_kwx.chairinfo[ChairNum].uid == penggangInfo.uid) {
            this.showArrow(ChairNum);
            var spineBoy;
            var removeSprite = function(trackindex){
                if(spineBoy){
                    //cc.log("trackindex=",trackindex,spineBoy)
                    //spineBoy.clearTrack(trackindex);
                    spineBoy.removeFromParent();
                    spineBoy = null;
                }
            }
            switch (ChairNum) {
                // 自己
                case 0:
                    var penggangNode = {
                        "penggang": isPeng,
                        "card": penggangInfo.card,
                    };
                    this.myPengGang.push(penggangNode);
                    var mycardposx = this.myFirstCardPointX;
                    var cardwd = 76;//this.btnMyCards[12].getContentSize().width;
                    mycardposx += (this.myPengGang.length-1)*(3*cardwd+8);
                    // 3张碰的牌，4张杠的牌
                    for (var j=0; j<3; j++){
                        var spPengCard;
                        // 碰或明杠
                        if (isPeng || penggangInfo.view){
                            spPengCard = this.createpenggangCard(false,penggangInfo.card,0,1);
                        }
                        // 暗杠
                        else{
                            spPengCard = this.createpenggangCard(false,0,0,4);
                        }

                        // 碰牌的起点
                        spPengCard.setPosition(cc.p(mycardposx + cardwd*0.5, this.myFirstCardPointY + spPengCard.getContentSize().height*0.5));
                        mycardposx += cardwd;
                        spPengCard.setTag(this.cleanTag++);
                        this.node.addChild(spPengCard);
                        // 如果是杠，就叠加一张
                        if(!isPeng && j==1){
                            var spGangCard = this.createpenggangCard(false,penggangInfo.card,0,1);
                            // 碰牌的起点
                            spGangCard.setPosition(cardwd*0.5, 23 + spPengCard.getContentSize().height*0.5);
                            spPengCard.addChild(spGangCard);
                        }
                    }

                    // 暗杠得加一张牌。
                    var AnGangJia;

                    // 如果可以杠可以碰，点的碰则有张手牌不置0。
                    var iPengPai = 0;

                    // 手牌中将碰杠的牌置0
                    for (var k=0; k<this.myCards.length; k++) {
                        if (this.myCards[k] == penggangInfo.card)
                        {
                            this.myCards[k] = 0;
                            iPengPai++;

                            if (!penggangInfo.view)
                                AnGangJia = k;

                            // 碰的情况下，两张牌置0就可以了。
                            if(isPeng && iPengPai == 2)
                                break;
                        }
                    }
                    // 暗杠一定是起了牌之后的，所以要处理起的牌。
                    if (!isPeng && !penggangInfo.view){

                         //如果起的牌是杠牌，则置为0
                        if(this.drawCard == penggangInfo.card)
                            this.drawCard = 0;

                        // 如果起的牌不是杠牌，会多一张牌，用一种杠牌保存，
                        // 相当于一种形式的把起的牌收入牌堆。
                        else
                            this.myCards[AnGangJia] = this.drawCard;

                        if(this.btnMyCards[13])
                            this.btnMyCards[13].setVisible(false);
                    }else{
                        this.drawCard = 0;
                    }

                    // 刷新手牌显示
                    this.myCards.sort(function (a, b) {
                        return a - b;
                    });

                    mycardposx += 8;
                    // 显示亮的牌
                    for(var iL=0; iL<this.spLiangCardsArray.length; iL++){
                        this.spLiangCardsArray[iL].setPosition(cc.p(mycardposx + cardwd*0.5, this.myFirstCardPointY + this.spLiangCardsArray[iL].getContentSize().height*0.5));
                        mycardposx += cardwd;
                    }

                    for (var l = 0; l<this.myCards.length; l++) {
                        //cc.log(l,this.myCards[l],this.btnMyCards[l]);
                        //cc.log(mycardposx,this.myCards.length,this.btnMyCards.length);
                        // myCards为0是碰和杠的牌。
                        if (this.myCards[l] == 0){
                            this.btnMyCards[l].setVisible(false);
                        }
                        else
                        {
                            var cardPath = this.plistCardnumToResString(this.myCards[l]);
                            if(!this.btnMyCards[l].getChildByTag(1001))
                                this.btnMyCards[l].loadTextures(cardPath, cardPath, cardPath,ccui.Widget.PLIST_TEXTURE);
                            else
                                this.btnMyCards[l].getChildByTag(1001).setSpriteFrame(cardPath);

                            this.btnMyCards[l].setPosition(cc.p(mycardposx,this.myFirstCardPointY));
                            mycardposx += cardwd;
                            this.btnMyCards[l].setVisible(true);
                            if(this.bStatusLiang)
                                this.btnMyCards[l].getChildByTag(1002).setVisible(true);
                                //this.btnMyCards[l].setColor(cc.color(128,128,128));
                        }
                    }
                    //cc.log(mycardposx);
                    this.drawcardposX = mycardposx;
                    //if(!this.btnMyCards[13]) this.btnMyCards[13].setPositionX(mycardposx+10);

                    var nodeOperate =  ccui.helper.seekWidgetByName(this.node, "locator_my");
                    var sprOperate = new cc.Sprite.create();

                    // 碰牌后，判断是否可以亮牌
                    if(isPeng){
                        this.drawcardposX = mycardposx - cardwd;
                        this.IsTing();

                        // 亮牌，剩余张数小于等于12不能亮牌。
                        if(this.liangArray.length != 0 && (!(this.cardnum<12 &&  parseInt(this.mod_kwx.roominfo.param1)%10 == 1))){
                            this.DisplayTingPng();
                            var btn = ccui.helper.seekWidgetByName(this.node, "liang");
                            btn.setLocalZOrder(999);
                            btn.setVisible(true);
                            //btn.setBright(false);
                            btn.addTouchEventListener(this.clickOperatorBtn);
                        }

                        var bDouHu = true;
                        // 有别人亮牌的胡牌，则置为不可用
                        for(var iMyCard=0; iMyCard<this.myCards.length; iMyCard++){
                            if(this.myCards[iMyCard] == 0)
                                continue;
                            else if(this.HaveTheCard(this.wantCards[1], this.myCards[iMyCard])!=-1
                                || this.HaveTheCard(this.wantCards[2], this.myCards[iMyCard])!=-1 ){
                                this.btnMyCards[iMyCard].setEnabled(false);
                                //this.btnMyCards[iMyCard].setColor(cc.color(128,128,128));
                                this.btnMyCards[iMyCard].getChildByTag(1002).setVisible(true);
                            }
                            else {
                                //this.btnMyCards[iMyCard].setColor(cc.color(255,255,255));
                                this.btnMyCards[iMyCard].getChildByTag(1002).setVisible(false);
                                this.btnMyCards[iMyCard].setEnabled(true);
                                bDouHu = false;
                            }
                        }

                        // 如果手上的牌别人都胡，就让他随便打吧。。
                        if(bDouHu){
                            for(var iMyCard=0; iMyCard<this.myCards.length; iMyCard++) {
                                if (this.myCards[iMyCard] == 0)
                                    continue;
                                else {
                                    //this.btnMyCards[iMyCard].setColor(cc.color(255,255,255));
                                    this.btnMyCards[iMyCard].getChildByTag(1002).setVisible(false);
                                    this.btnMyCards[iMyCard].setEnabled(true);
                                }
                            }
                        }
                        sprOperate.setTexture(res.record_peng);
                        //spineBoy = new sp.SkeletonAnimation(res.mjpeng_txjson, res.mjpeng_txatlas);
                        //spineBoy.setAnimation(119, 'animation', false);
                        //spineBoy.setEndListener(removeSprite);
                        //nodeOperate.addChild(spineBoy);
                    }
                    else{
                        sprOperate.setTexture(res.record_gang);
                        //if(penggangInfo.view){
                        //    spineBoy = new sp.SkeletonAnimation(res.mjmingang_txjson, res.mjmingang_txatlas);
                        //    spineBoy.setAnimation(120, 'animation', false);
                        //    spineBoy.setEndListener(removeSprite);
                        //    nodeOperate.addChild(spineBoy);
                        //}else{
                        //    var spineBoy = new sp.SkeletonAnimation(res.mjangang_txjson, res.mjangang_txatlas);
                        //    spineBoy.setAnimation(121, 'animation', false);
                        //    spineBoy.setEndListener(removeSprite);
                        //    nodeOperate.addChild(spineBoy);
                        //}
                    }

                    nodeOperate.addChild(sprOperate);
                    sprOperate.runAction(cc.scaleTo(0.7, 1.25));
                    sprOperate.runAction(cc.fadeOut(0.7));
                    break;

                // 下家（右侧）
                case 1:
                    var penggangNode = {
                        "penggang": isPeng,
                        "card": penggangInfo.card,
                    };
                    this.rightPengGang.push(penggangNode);

                    // 显示碰的牌

                    // 只本次碰杠的牌即可。不需要遍历之前的显示。
                    var j = this.rightPengGang.length-1;

                    // 每个碰牌有3张
                    for (var k=0; k<3; k++){
                        //var spRightCards = ccui.helper.seekWidgetByTag(this.node, 1200 + k + (j * 3));
                        var spRightCards = this.node.getChildByTag(1200 + k + (j * 3));

                        // 碰或明杠
                        if (isPeng || penggangInfo.view) {
                            this.createpenggangCard(spRightCards,this.rightPengGang[j].card,1,1);
                        }
                        // 暗杠
                        else{
                            this.createpenggangCard(spRightCards,0,1,4);
                            this.node.getChildByTag(1200 + 13).setVisible(false);
                        }

                        // 杠在上面加一张子显示
                        if (!(this.rightPengGang[j].penggang) && k==1){
                            var spCard = this.createpenggangCard(false,this.rightPengGang[j].card,1,1);
                            spCard.setPosition(spCard.getContentSize().width*0.5, 10+spCard.getContentSize().height*0.5);
                            spCard.setLocalZOrder(20);
                            spCard.setTag(this.cleanTag++);
                            spRightCards.addChild(spCard);
                        }
                    }
                    var nodeOperate =  ccui.helper.seekWidgetByName(this.node, "locator_right");
                    var sprOperate = cc.Sprite.create();

                    // 如果是碰，手牌加上一张。
                    if (isPeng){
                        var spBackRight = this.node.getChildByTag(1200 + 13);
                        spBackRight.setVisible(true);
                        sprOperate.setTexture(res.record_peng);
                        this.seenCardsArray.push(penggangInfo.card, penggangInfo.card);
                        //spineBoy = new sp.SkeletonAnimation(res.mjpeng_txjson, res.mjpeng_txatlas);
                        //spineBoy.setAnimation(119, 'animation', false);
                        //spineBoy.setEndListener(removeSprite);
                        //nodeOperate.addChild(spineBoy);
                    }
                    else{
                        sprOperate.setTexture(res.record_gang);
                        // 明杠
                        if(penggangInfo.view){
                            this.seenCardsArray.push(penggangInfo.card, penggangInfo.card, penggangInfo.card);

                            //spineBoy = new sp.SkeletonAnimation(res.mjmingang_txjson, res.mjmingang_txatlas);
                            //spineBoy.setAnimation(120, 'animation', false);
                            //spineBoy.setEndListener(removeSprite);
                            //nodeOperate.addChild(spineBoy);

                        }
                        // 暗杠
                        else{
                            this.seenCardsArray.push(penggangInfo.card, penggangInfo.card, penggangInfo.card, penggangInfo.card);

                            //spineBoy = new sp.SkeletonAnimation(res.mjangang_txjson, res.mjangang_txatlas);
                            //spineBoy.setAnimation(121, 'animation', false);
                            //spineBoy.setEndListener(removeSprite);
                            //nodeOperate.addChild(spineBoy);

                        }

                        if(this.deskliangCards){
                            if(this.deskliangCards[1]){
                                var rightBeginCard = this.rightPengGang.length * 3;
                                for(var jCardl=0; jCardl<this.deskliangCards[1].length; jCardl++){
                                    var spRightCards = this.node.getChildByTag(1200 + jCardl + rightBeginCard);
                                    //spRightCards.setTexture(this.CardnumToRes(this.deskliangCards[1][jCardl], 1));
                                    //spRightCards.initWithSpriteFrameName(this.CardnumToRes(this.deskliangCards[1][jCardl], 1));
                                    this.createpenggangCard(spRightCards,this.deskliangCards[1][jCardl],1,2);
                                }
                            }
                        }
                    }
                    nodeOperate.addChild(sprOperate);
                    sprOperate.runAction(cc.scaleTo(0.7, 1.25));
                    sprOperate.runAction(cc.fadeOut(0.7));

                    var lianglen = 0;
                    if(this.deskliangCards){
                        if(this.deskliangCards[1]){
                            lianglen = this.deskliangCards[1].length;
                        }
                    }
                    var pengganglen = this.rightPengGang.length;
                    this.kwxResetPos(1, pengganglen, lianglen);
                    break;

                // 上家（左侧）
                case 2:
                    var penggangNode = {
                        "penggang": isPeng,
                        "card": penggangInfo.card,
                    };
                    this.leftPengGang.push(penggangNode);

                    // 显示碰的牌
                    // 只本次碰杠的牌即可。不需要遍历之前的显示。
                    var j = this.leftPengGang.length-1;
                    // 每个碰牌有3张
                    for (var k=0; k<3; k++){
                        var spLeftCards = this.node.getChildByTag(1300 + k + (j * 3));
                        // 碰或明杠
                        if (isPeng || penggangInfo.view) {
                            this.createpenggangCard(spLeftCards,this.leftPengGang[j].card,2,1);
                        }
                        // 暗杠
                        else{
                            this.createpenggangCard(spLeftCards,0,2,4);
                            this.node.getChildByTag(1300 + 13).setVisible(false);
                        }

                        // 杠在上面加一张子显示
                        if (!(this.leftPengGang[j].penggang) && k==1){
                            var spCard = this.createpenggangCard(false,this.leftPengGang[j].card,2,1);
                            spCard.setPosition(spCard.getContentSize().width*0.5, 10+spCard.getContentSize().height*0.5);
                            spCard.setLocalZOrder(20);
                            spLeftCards.addChild(spCard);
                        }
                    }
                    var nodeOperate =  ccui.helper.seekWidgetByName(this.node, "locator_left");
                    var sprOperate = cc.Sprite.create();

                    // 如果是碰，手牌加上一张。
                    if (isPeng) {
                        var spBackLeft = this.node.getChildByTag(1300 + 13);
                        spBackLeft.setVisible(true);
                        sprOperate.setTexture(res.record_peng);
                        this.seenCardsArray.push(penggangInfo.card, penggangInfo.card);
                        //spineBoy = new sp.SkeletonAnimation(res.mjpeng_txjson, res.mjpeng_txatlas);
                        //spineBoy.setAnimation(119, 'animation', false);
                        //spineBoy.setEndListener(removeSprite);
                        //nodeOperate.addChild(spineBoy);
                    }
                    else{
                        sprOperate.setTexture(res.record_gang);
                        // 明杠
                        if(penggangInfo.view){
                            this.seenCardsArray.push(penggangInfo.card, penggangInfo.card, penggangInfo.card);
                            //spineBoy = new sp.SkeletonAnimation(res.mjmingang_txjson, res.mjmingang_txatlas);
                            //spineBoy.setAnimation(120, 'animation', false);
                            //spineBoy.setEndListener(removeSprite);
                            //nodeOperate.addChild(spineBoy);
                        }
                        // 暗杠
                        else{
                            this.seenCardsArray.push(penggangInfo.card, penggangInfo.card, penggangInfo.card, penggangInfo.card);
                            //spineBoy = new sp.SkeletonAnimation(res.mjangang_txjson, res.mjangang_txatlas);
                            //spineBoy.setAnimation(121, 'animation', false);
                            //spineBoy.setEndListener(removeSprite);
                            //nodeOperate.addChild(spineBoy);
                        }

                        if(this.deskliangCards){
                            if(this.deskliangCards[2]){
                                var leftBeginCard = this.leftPengGang.length * 3;
                                for(var jCardl=0; jCardl<this.deskliangCards[2].length; jCardl++){
                                    var spBackLeft = this.node.getChildByTag(1300 + jCardl + leftBeginCard);
                                    this.createpenggangCard(spBackLeft,this.deskliangCards[2][jCardl],2,2);
                                }
                            }
                        }
                    }
                    nodeOperate.addChild(sprOperate);
                    sprOperate.runAction(cc.scaleTo(0.7, 1.25));
                    sprOperate.runAction(cc.fadeOut(0.7));

                    var lianglen = 0;
                    if(this.deskliangCards){
                        if(this.deskliangCards[2]){
                            lianglen = this.deskliangCards[2].length;
                        }
                    }
                    var pengganglen = this.leftPengGang.length;
                    this.kwxResetPos(2, pengganglen, lianglen);
                    break;
            }
        }
    }

    // 暗杠不需要捡起打出去的牌。
    if (isPeng || penggangInfo.view) {
        this.lastPlayedCard.setVisible(false);
        this.deskCardsNum[this.lastChairNum]--;
    }
};

// 隐藏碰杠胡按钮
gameclass.kwxtable.prototype.HideOperator = function(operatorInfo) {
    for (var i = 18; i < 22; i++)
    {
        //var btn = ccui.helper.seekWidgetByTag(this.node, i);
        var btn = this.node.getChildByTag(i);
        btn.setVisible(false);
    }

    this.spDisplayPeng.setVisible(false);

    if(this.spDisplayGang){
        for(var i = 0; i < this.spDisplayGang.length; i++)
        {
            this.node.removeChild(this.spDisplayGang[i]);
        }
        this.spDisplayGang = null;
    }
};

// 碰杠胡  注：lvxin觉得这个写代码的有神经病
gameclass.kwxtable.prototype.OnOperator = function(operatorInfo) {
    // 碰杠的时候，不能点牌
    for(var i=0; i<this.myCards.length; i++){
        if(this.myCards[i]!=0) {
            //this.btnMyCards[i].setColor(cc.color(128,128,128));
            this.btnMyCards[i].getChildByTag(1002).setVisible(true);
            this.btnMyCards[i].setEnabled(false);
        }
    }
    if(this.btnMyCards[13] && this.btnMyCards[13].isEnabled()){
        //this.btnMyCards[i].setColor(cc.color(128,128,128));
        this.btnMyCards[i].getChildByTag(1002).setVisible(true);
        this.btnMyCards[i].setEnabled(false);
    }

    var btng = ccui.helper.seekWidgetByName(this.node, "guo");
    btng.setVisible(true);
    btng.setLocalZOrder(999);
    btng.addTouchEventListener(this.clickOperatorBtn);
    this.opertorcount = 0;
    if (operatorInfo.peng)
    {
        var btnp = ccui.helper.seekWidgetByName(this.node, "peng");
        btnp.setVisible(true);
        btnp.setLocalZOrder(999);
        btnp.addTouchEventListener(this.clickOperatorBtn);
        this.createpenggangCard(this.spDisplayPeng,this.mod_kwx.laststepcard,0,1);
        this.spDisplayPeng.setLocalZOrder(1002);
        this.spDisplayPeng.setPosition(cc.p(btnp.getPositionX(), btnp.getPositionY() +135));
        this.spDisplayPeng.setVisible(true);
        this.opertorcount += 1;
    }

    if (operatorInfo.gang == 1)
    {
        if(this.mod_kwx.laststepcard == 0) this.doGang(true);
        else this.doGang(false);
        this.opertorcount += 1;
    }

    if (operatorInfo.hu)
    {
        var btnh = ccui.helper.seekWidgetByName(this.node, "hu");
        btnh.setPositionX(715-this.opertorcount*130);
        btnh.setVisible(true);
        btnh.setLocalZOrder(999);
        btnh.addTouchEventListener(this.clickOperatorBtn);
    }
}

// 查找数组中有几个值
gameclass.kwxtable.prototype.SumInArray = function(arrayNums, num) {
    var sum = 0;
    for(var i=0; i<arrayNums.length; i++){
        if (num == arrayNums[i])
            sum++;
    }
    return sum;
}

// 查找是否有某张牌
gameclass.kwxtable.prototype.HaveTheCard = function(cardsArray, card) {
    if(!cardsArray)
        return -1;
    for(var i=0; i<cardsArray.length; i++){
        if (card == cardsArray[i])
            return i;
    }
    return -1;
}

// 把3个的都删掉
gameclass.kwxtable.prototype.RemoveSanGe = function(cardsArray) {

    var cards = gameclass.clone(cardsArray);

    for(var i=0; i<=cards.length-3; i++){
        if((cards[i] == cards[i+1]) && (cards[i] == cards[i+2]))
            cards.splice(i,3);
    }
    if(cards.length == 3) {
        if((cards[0] == cards[1]) && (cards[i] == cards[2]))
            cards = [];
    }
    return cards;
}

// 如果12张是6对，那就是七对听胡
gameclass.kwxtable.prototype.IsLiuDui = function(cardsArray) {
    //cc.log(cardsArray);
    for(var i=0; i<12; i=i+2){
        if (cardsArray[i]!=cardsArray[i+1])
            return false;
    }

    return true;
}


// 都是坎的递归
gameclass.kwxtable.prototype.IsDouShiKan = function(cards, icard) {

    //cc.log(icard + "是否都是坎？" + cards);

    // 没有牌，表示也是坎。
    if(cards.length == 0)
        return true;

    // 遍历去掉任意一坎，剩下的牌是否能够都是坎
    // 无外乎两种坎，不是一样，就是一句话。
    // 每个牌型数组都要试这2种情况。
    var TryCards = gameclass.clone(cards);

    if ((TryCards[0]==TryCards[1]) && (TryCards[0]==TryCards[2])){
        var TryCards_SanGe = gameclass.clone(TryCards);
        TryCards_SanGe.splice(0,3);

        // 如果去掉的有这一张，说明这一坎是要亮的。
        if(TryCards[0] == icard){
            this.kanLiangCards.push(TryCards[0], TryCards[0]);
        }

        if(TryCards_SanGe.length == 0){
            return true;
        }

        if (this.IsDouShiKan(TryCards_SanGe, icard)){
            //if (icard && (this.HaveTheCard(TryCards, icard)!=-1))
            return true;
        }
    }

    // 一坎牌的第2个、第3个。
    var kan_2 = this.HaveTheCard(TryCards, TryCards[0]+1);
    var kan_3 = this.HaveTheCard(TryCards, TryCards[0]+2);
    //cc.log(kan_2, kan_3);

    if((kan_2!=-1) && (kan_3!=-1)){
        var TryCards_YiJu = gameclass.clone(TryCards);
        TryCards_YiJu.splice(kan_3, 1);
        TryCards_YiJu.splice(kan_2, 1);
        TryCards_YiJu.splice(0, 1);

        // 如果去的有这一张，说明这一坎是要亮的。
        if(TryCards[0] == icard || TryCards[kan_2] == icard || TryCards[kan_3] == icard){
            if(TryCards[0] == icard){
                if(this.HaveTheCard(this.kanLiangCards, TryCards[kan_2])==-1)
                    this.kanLiangCards.push(TryCards[kan_2])
                if(this.HaveTheCard(this.kanLiangCards, TryCards[kan_3])==-1)
                    this.kanLiangCards.push(TryCards[kan_3])
            }
            else if(TryCards[kan_2] == icard){
                if(this.HaveTheCard(this.kanLiangCards, TryCards[0])==-1)
                    this.kanLiangCards.push(TryCards[0])
                if(this.HaveTheCard(this.kanLiangCards, TryCards[kan_3])==-1)
                    this.kanLiangCards.push(TryCards[kan_3])
            }
            else{
                if(this.HaveTheCard(this.kanLiangCards, TryCards[0])==-1)
                    this.kanLiangCards.push(TryCards[0])
                if(this.HaveTheCard(this.kanLiangCards, TryCards[kan_2])==-1)
                    this.kanLiangCards.push(TryCards[kan_2])
            }
        }

        if(TryCards_YiJu.length == 0){
            return true;
        }

        if (this.IsDouShiKan(TryCards_YiJu, icard)){
            return true;
        }
    }
    return false;

}

// 打出和胡的结构
gameclass.kwxtable.prototype.PushLiangArray = function(daChu, hu, liang, jiang) {
    //cc.log(liang);
    liang.sort(function(a,b){
        return a-b});

    var i=0;
    for(i; i<this.liangArray.length; i++){

        if(this.liangArray[i].daTingCard == daChu){

            if(this.HaveTheCard(this.liangArray[i].huCards, hu)==-1){
                this.liangArray[i].huCards.push(hu);
            }

            // 如果hu是7，8，9，huCards里面已经有了1、4，2、5，3、6。那需要把中间的4、5、6也亮出来。
            if(hu%10>6
                && (this.HaveTheCard(this.liangArray[i].huCards, hu-3)!=-1)
                && (this.HaveTheCard(this.liangArray[i].huCards, hu-6)!=-1)){
                liang.push(hu-3);
            }

            var obj = new Object();
            obj.liangCards = new Array();
            for (var iLiang = 0; iLiang < liang.length; iLiang++) {
                // 如果一次传进来3个一样的，则亮出去。
                if (liang[iLiang] == liang[iLiang+1] && liang[iLiang] == liang[iLiang+2]){
                    //cc.log("三个一样" + liang[iLiang]);
                    obj.liangCards.push(liang[iLiang], liang[iLiang], liang[iLiang]);
                }

                // 亮一对需要都加进去。
                else if(liang[iLiang] == liang[iLiang+1])
                    obj.liangCards.push(liang[iLiang], liang[iLiang]);

                // 对于先压入3、4，后压入4、6，则只压入1个4。
                else if(this.HaveTheCard(obj.liangCards, liang[iLiang])==-1){
                    obj.liangCards.push(liang[iLiang]);
                }
            }

            if(jiang){
                obj.jiangCard = jiang;
            }

            // 全亮
            if(this.bAllLiang){
                obj.liangCards = this.myCards;
            }

            this.liangArray[i].objLiangs.push(obj);

            break;
        }
    }
    if(i == this.liangArray.length){
        var obj = new Object();
        obj.daTingCard = daChu;
        obj.huCards = new Array();
        obj.huCards.push(hu);
        var objLiang = new Object();
        objLiang.liangCards = new Array();
        objLiang.liangCards = liang;
        objLiang.jiangCard = jiang;
        obj.objLiangs = new Array();
        this.liangArray.push(obj);
    }

}

// 是否听牌
gameclass.kwxtable.prototype.IsTing = function(cardsArray_shoudong) {

    // 打什么胡什么的数组。
    // var obj = new Object();
    // obj.daTingCard = 0;
    // obj.huCards = new Array();
    this.liangArray = [];
    this.bAllLiang = false;

    // 存下除去碰杠之后的手牌
    var cards = new Array();

    if(cardsArray_shoudong)
        cards = cardsArray_shoudong;
    else {
        for (var i=0; i<this.myCards.length; i++){
            if (this.myCards[i]){
                cards.push(this.myCards[i]);
            }
        }
        if(this.drawCard)
            cards.push(this.drawCard);
    }
    cards.sort(function(a,b){
        return a-b});

    //cc.log(cards);
    var DaChuCard = 0;

    // 尝试打掉一张能否听胡
    for(var j=0; j<cards.length; j++){

        // 如果遍历打出的牌与上一张一样，则省掉这次遍历
        if(DaChuCard == cards[j]) {
            continue;
        }

        DaChuCard = cards[j];

        var tryCards = gameclass.clone(cards);
        tryCards.splice(j,1);

        var bHuQidui = false;
        var cardQiDui;
        // 判断七对
        for(var iQd=0; iQd<tryCards.length; iQd++){
            //去掉一张剩下6对就是7对
            var tryQiDui = gameclass.clone(tryCards);
            tryQiDui.splice(iQd, 1);

            if (this.myPengGang.length==0  && this.IsLiuDui(tryQiDui)){
                var liangCards = new Array();
                liangCards.push(tryCards[iQd]);
                // 如果是掉豪华七对，需要亮3张
                if(this.SumInArray(tryCards, tryCards[iQd]))
                    liangCards.push(tryCards[iQd], tryCards[iQd]);

                this.PushLiangArray(DaChuCard, tryCards[iQd], liangCards);
                bHuQidui = true;
                cardQiDui = tryCards[iQd];
            }
        }

        // 两种判断，有一对将的情况，有且仅有2个单牌，且能凑坎才能听。
        for(var k=0; k<tryCards.length-1; k++){

            var tryHasJiang = gameclass.clone(tryCards);

            if(tryHasJiang[k] == tryHasJiang[k+1]){
                //cc.log("做将" + tryHasJiang[k]);
                tryHasJiang.splice(k, 2);
            }
            else{
                //cc.log("不是一对将，跳过。");
                continue;
            }


            // 分花色查找单牌
            var ziArray = new Array();
            var tongArray = new Array();
            var tiaoArray = new Array();
            for(var iCard=0; iCard<tryHasJiang.length; iCard++){
                if(tryHasJiang[iCard] > 30)
                    ziArray.push(tryHasJiang[iCard]);
                else if (tryHasJiang[iCard] > 10)
                    tongArray.push(tryHasJiang[iCard]);
                else
                    tiaoArray.push(tryHasJiang[iCard]);
            }

            // 去掉了一对将，除了坎就是两张单牌。
            // 如果是中发白，在有一对将的情况下，必须是一对才能听。
            var danpai;
            danpai = this.RemoveSanGe(ziArray);
            if (danpai.length == 1 || danpai.length == 3){
                //cc.log("有一对将，风牌单张不能听。");
                continue;
            }

            else if(danpai.length == 2 && danpai[0] != danpai[1]){
                //cc.log("wwwwwwwwwwwwwwwwwwwwwww");
                continue;
            }

            // 如果中发白有2个单张，筒条不能有单张。
            if(danpai.length == 2){
                // 张数都不对就不用想了
                if(tiaoArray.length%3 != 0 || tongArray.length%3 != 0){
                    //cc.log("风2张，条筒张数不对。");
                    continue;
                }

                // 必须条和筒都成坎，就是听胡了。
                if(this.IsDouShiKan(tiaoArray) && this.IsDouShiKan(tongArray)){
                    var liangCards = new Array(danpai[0], danpai[0]);

                    // 如果还能胡七对，全部都亮。如果同一张牌可以胡7对可以胡别的，则只胡7对。
                    if(bHuQidui && cardQiDui!=danpai[0])
                        this.bAllLiang = true;
                    this.PushLiangArray(DaChuCard, danpai[0], liangCards, tryCards[k]);
                    //return true;
                }

                else{
                    continue;
                }
            }

            // 如果风牌没有单张，可以允许条或筒，同种有2个单张。
            if(danpai.length == 0){
                // 张数都不对就不用想了
                if(!((tiaoArray.length%3 == 2 && tongArray.length%3 == 0)
                    || (tiaoArray.length%3 == 0 && tongArray.length%3 == 2))){
                    continue;
                }

                // 条都是坎，筒必须是坎再加2张。
                if(tiaoArray.length%3 == 0 && this.IsDouShiKan(tiaoArray)){

                    // 枚举9张筒牌看是否都是坎
                    for(var iTong=11; iTong<20; iTong++){
                        var huTongArray = gameclass.clone(tongArray);
                        huTongArray.push(iTong);
                        huTongArray.sort(function(a,b){
                            return a-b});

                        this.kanLiangCards = [];
                        if (this.IsDouShiKan(huTongArray, iTong)){

                            // 这张牌可以凑成不止一坎，需要分情况处理下。
                            if(this.kanLiangCards.length>2)
                            {
                                var kLength = this.kanLiangCards.length;
                                // 如果胡的牌和亮的牌一样，说明存在四归的情况
                                if(this.HaveTheCard(this.kanLiangCards, iTong)!=-1){
                                    this.kanLiangCards.push(iTong);
                                }
                                // 12345，凑个3的话，会认为12和45都是要亮的坎。
                                // 这种情况只亮胡牌中间的。
                                // 也有可能是67889，缺个7，会认为68、89都是要亮的坎。
                                else if(iTong%10 <= 3){
                                    this.kanLiangCards.splice(0, kLength-2);
                                }
                                else if(iTong%10 >= 6){
                                    this.kanLiangCards.splice(kLength-1, kLength-2);
                                }
                                else {
                                    // 卡五星的情况
                                    if(iTong == 15
                                        &&(this.HaveTheCard(this.kanLiangCards, 14)!=-1)
                                        &&(this.HaveTheCard(this.kanLiangCards, 16)!=-1)){

                                        // 如果有3，亮牌就加上4、5
                                        // 牌型34456
                                        if(this.HaveTheCard(this.kanLiangCards, 13)!=-1)
                                            this.kanLiangCards.push(14, 15);

                                        // 如果有7，就加上5、6
                                        // 牌型45667
                                        if(this.HaveTheCard(this.kanLiangCards, 17)!=-1)
                                            this.kanLiangCards.push(15, 16);
                                    }
                                    else{
                                        for(var iKL=0; iKL<this.kanLiangCards.length; iKL++){

                                            // 还有23345，会认为23，35都是坎。会亮235，去掉单独的。
                                            if (this.HaveTheCard(this.kanLiangCards, this.kanLiangCards[iKL]+1) == -1
                                                && this.HaveTheCard(this.kanLiangCards, this.kanLiangCards[iKL]-1) == -1) {
                                                this.kanLiangCards.splice(iKL, 1);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            // 如果还能胡七对，全部都亮。如果同一张牌可以胡7对可以胡别的，则只胡7对。
                            if(bHuQidui && cardQiDui!=iTong)
                                this.bAllLiang = true;
                            if(bHuQidui && cardQiDui==iTong){
                                this.kanLiangCards = new Array(iTong);
                            }
                            this.PushLiangArray(DaChuCard, iTong, this.kanLiangCards, tryCards[k]);
                            //return true;
                        }
                    }
                    continue;
                }


                // 筒都是坎，条必须是坎再加2张。
                if(tongArray.length%3 == 0 && this.IsDouShiKan(tongArray)){

                    // 枚举9张条牌看是否都是坎
                    for(var iTiao=1; iTiao<10; iTiao++){
                        var huTiaoArray = gameclass.clone(tiaoArray);
                        huTiaoArray.push(iTiao);
                        huTiaoArray.sort(function(a,b){
                            return a-b});

                        this.kanLiangCards = [];
                        if (this.IsDouShiKan(huTiaoArray, iTiao)){

                            if(this.kanLiangCards.length > 2)
                            {
                                var kLength = this.kanLiangCards.length;
                                if(this.HaveTheCard(this.kanLiangCards, iTiao)!=-1) {
                                    this.kanLiangCards.push(iTiao);
                                }
                                else if(iTiao <= 3){
                                    this.kanLiangCards.splice(0, kLength-2);
                                }
                                else if(iTiao >= 6){
                                    this.kanLiangCards.splice(kLength-1, kLength-2);
                                }
                                else {
                                    for(var iKL=0; iKL<kLength; iKL++){
                                        // 卡五星的情况
                                        if(iTiao == 5
                                            &&(this.HaveTheCard(this.kanLiangCards, 4)!=-1)
                                            &&(this.HaveTheCard(this.kanLiangCards, 6)!=-1)){

                                            // 如果有3，亮牌就加上4、5
                                            if(this.HaveTheCard(this.kanLiangCards, 3)!=-1)
                                                this.kanLiangCards.push(4, 5);

                                            // 如果有7，就加上5、6
                                            if(this.HaveTheCard(this.kanLiangCards, 7)!=-1)
                                                this.kanLiangCards.push(5, 6);
                                        }
                                        else if ((this.HaveTheCard(this.kanLiangCards, this.kanLiangCards[iKL]+1) == -1)
                                            && (this.HaveTheCard(this.kanLiangCards, this.kanLiangCards[iKL]-1) == -1)){
                                            this.kanLiangCards.splice(iKL, 1);
                                            break;
                                        }
                                    }
                                }
                            }
                            // 如果还能胡七对，全部都亮。如果同一张牌可以胡7对可以胡别的，则只胡7对。
                            if(bHuQidui && cardQiDui!=iTiao)
                                this.bAllLiang = true;
                            if(bHuQidui && cardQiDui==iTiao){
                                this.kanLiangCards = new Array(iTiao);
                            }
                            this.PushLiangArray(DaChuCard, iTiao, this.kanLiangCards, tryCards[k]);
                            //return true;
                        }
                    }

                    continue;
                }

                //cc.log("风牌没问题。筒条张数虽然对，但不能听。")
                continue;
            }
        }

        //cc.log("再试试单吊将");
        var dandiaojiang = 0;

        // 去掉将不能听，或者没有将。
        // 则是单调将，只能有1个单牌。
        for(var k=0; k<tryCards.length; k++){
            var tryNeedJiang = gameclass.clone(tryCards);

            //cc.log("单吊将" + tryNeedJiang[k]);
            tryNeedJiang.splice(k, 1);

            // 分花色查找单牌
            var ziArray = new Array();
            var tongArray = new Array();
            var tiaoArray = new Array();
            for(var iCard=0; iCard<tryNeedJiang.length; iCard++){
                if(tryNeedJiang[iCard] > 30)
                    ziArray.push(tryNeedJiang[iCard]);
                else if (tryNeedJiang[iCard] > 10)
                    tongArray.push(tryNeedJiang[iCard]);
                else
                    tiaoArray.push(tryNeedJiang[iCard]);
            }

            // 风牌要么成坎，要么只有1张单牌
            var danpai;
            danpai = this.RemoveSanGe(ziArray);
            if (danpai.length != 0) {
                //cc.log("两张风的单牌。");
                continue;
            }

            // 筒和条必须成坎
            else {
                if(tiaoArray.length%3 != 0 || tongArray.length%3 != 0){
                    //cc.log("风牌单张，条筒张数不对。");
                    continue;
                }

                if(this.IsDouShiKan(tongArray) && this.IsDouShiKan(tiaoArray)){
                    var liangCards = new Array();
                    liangCards.push(tryCards[k]);

                    // 如果单调的将，也在前面的一个坎里。那说明是4445这样的情况。
                    // 这种情况说明将有3个牌，把3个将都加进去。
                    // 必须是最后一个亮牌结构有
                    if((this.liangArray.length!=0) && (this.liangArray[this.liangArray.length-1].daTingCard == DaChuCard)){
                        for(var iObj=0; iObj<this.liangArray[this.liangArray.length-1].objLiangs.length; iObj++){
                            if(this.HaveTheCard(this.liangArray[this.liangArray.length-1].objLiangs[iObj].liangCards, tryCards[k])!=-1){
                                var liangJiang = this.liangArray[this.liangArray.length-1].objLiangs[iObj].jiangCard;
                                liangCards.push(liangJiang, liangJiang, liangJiang);
                            }
                            // 如果单调将不止1个，则压入2个单调的。
                            if(this.SumInArray(tryCards, tryCards[k])>1){
                                liangCards.push(tryCards[k], tryCards[k]);
                            }
                        }
                    }

                    // 如果还能胡七对，全部都亮。如果同一张牌可以胡7对可以胡别的，则只胡7对。
                    if(bHuQidui && cardQiDui!=tryCards[k])
                        this.bAllLiang = true;

                    // 如果前一个单调将比后一个小3，则压入中间2张牌。
                    if(dandiaojiang && tryCards[k] - dandiaojiang == 3) {
                        liangCards.push(tryCards[k]-2, tryCards[k]-1);
                    }
                    this.PushLiangArray(DaChuCard, tryCards[k], liangCards);
                    dandiaojiang = tryCards[k];
                    //return true;
                }

                continue;
            }
        }
    }
};

// 处理起牌(单张牌)
gameclass.kwxtable.prototype.OnDrawCard = function(uid, card, hu, gang) {
    for (var i = 0; i < 3; i++) {
        if (this.mod_kwx.chairinfo[i].uid == uid) {
            switch (i) {
                // 起牌的是自己
                case 0:
                    this.drawCard = card;//31;//
                    var bDouHu = true;
                    if (card) {
                        this.seenCardsArray.push(card);
                        this.showArrow(0);
                        // 第一次起牌时，需要创建控件
                        if (!this.btnMyCards[13]) {
                            var btnTakeCard = this.CreateCard(this.drawCard);
                            //btnTakeCard.setAnchorPoint(cc.p(0, 0));
                            // LA 20161216 起牌坐标
                            btnTakeCard.setPosition(this.drawcardposX +8, this.myFirstCardPointY);
                            this.btnMyCards[13] = btnTakeCard;
                            this.btnMyCards[13].setTag(113);
                            this.node.addChild(this.btnMyCards[13]);
                        }
                        else {
                            var cardPath = this.plistCardnumToResString(this.drawCard);
                            //this.btnMyCards[13].loadTextures(cardPath, cardPath, cardPath,ccui.Widget.PLIST_TEXTURE);
                            this.btnMyCards[13].getChildByTag(1001).setSpriteFrame(cardPath);
                            this.btnMyCards[13].setPosition(this.drawcardposX +8,this.myFirstCardPointY);
                        }

                        this.btnMyCards[13].addTouchEventListener(this.clickMyCardBtn);
                        this.isQipai = true;
                        this.btnMyCards[13].setVisible(true);

                        // 有别人亮牌的胡牌，则置为不可用
                        if (this.HaveTheCard(this.wantCards[1], this.drawCard) != -1 || this.HaveTheCard(this.wantCards[2], this.drawCard) != -1) {
                            //this.btnMyCards[13].setColor(cc.color(128, 128, 128));
                            this.btnMyCards[13].getChildByTag(1002).setVisible(true);
                            this.btnMyCards[13].setEnabled(false);
                        }
                        else if (!this.bStatusLiang) {
                            bDouHu = false;
                            //this.btnMyCards[13].setColor(cc.color(255, 255, 255));
                            this.btnMyCards[13].getChildByTag(1002).setVisible(false);
                            this.btnMyCards[13].setEnabled(true);
                        }
                    }

                    for(var iMyCard=0; iMyCard<this.myCards.length; iMyCard++){
                        if(this.myCards[iMyCard] == 0)
                            continue;
                        else if (this.HaveTheCard(this.wantCards[1], this.myCards[iMyCard])!=-1 || this.HaveTheCard(this.wantCards[2], this.myCards[iMyCard])!=-1){
                            //cc.log(this.wantCards[1], this.wantCards[2]);
                            //this.btnMyCards[iMyCard].setColor(cc.color(128,128,128));
                            this.btnMyCards[iMyCard].getChildByTag(1002).setVisible(true);
                            this.btnMyCards[iMyCard].setEnabled(false);
                        }
                        else if(!this.bStatusLiang){
                            //this.btnMyCards[iMyCard].setColor(cc.color(255,255,255));
                            this.btnMyCards[iMyCard].getChildByTag(1002).setVisible(false);
                            this.btnMyCards[iMyCard].setEnabled(true);
                            bDouHu = false;
                        }
                    }

                    // 如果手上的牌别人都胡，就让他随便打吧。。
                    if(bDouHu&&!this.bStatusLiang){
                        for(var iMyCard=0; iMyCard<this.myCards.length; iMyCard++) {
                            if (this.myCards[iMyCard] == 0)
                                continue;
                            else {
                                //this.btnMyCards[iMyCard].setColor(cc.color(255,255,255));
                                this.btnMyCards[iMyCard].getChildByTag(1002).setVisible(false);
                                this.btnMyCards[iMyCard].setEnabled(true);
                            }
                        }
                        if(this.btnMyCards[13])
                        {
                            //this.btnMyCards[13].setColor(cc.color(255, 255, 255));
                            this.btnMyCards[13].getChildByTag(1002).setVisible(false);
                            this.btnMyCards[13].setEnabled(true);
                        }
                    }

                    // 先弹出过、杠、胡等提示，点过后再弹出亮。
                    var bOperator = false;
                    // LA 20161224 擦杠的情况需要客户端判断
                    //金币场托管状态不擦杠
                    if(this.cardnum > 0 && !this.tuoguan){
                        for (var j=0; j<this.myPengGang.length; j++ ){

                            if (this.drawCard == this.myPengGang[j].card ){
                                if(this.HaveTheCard(this.wantCards[1], this.drawCard)==-1 && this.HaveTheCard(this.wantCards[2], this.drawCard)==-1)
                                {
                                    this.doGang(true);
                                    //this.isCaGang = true;
                                    bOperator = true;
                                    this.opertorcount += 1;
                                }
                                break;
                            }
                        }
                    }
                    // 起牌可能传过来杠和胡
                    //if (gang && !this.isCaGang)
                    if (gang == 1)
                    {
                        if(this.isQipai)
                            this.doGang(true);
                        else
                            this.doGang(false);
                        bOperator = true;
                        this.opertorcount += 1;
                    }
                    if (hu)
                    {
                        var btn = ccui.helper.seekWidgetByName(this.node, "guo");
                        btn.setVisible(true);
                        btn.setLocalZOrder(999);
                        btn.addTouchEventListener(this.clickOperatorBtn);

                        // 胡不能点牌，必须先点过。
                        for(var i=0; i<this.myCards.length; i++){
                            if(this.myCards[i]!=0) {
                                //this.btnMyCards[i].setColor(cc.color(128,128,128));
                                this.btnMyCards[i].getChildByTag(1002).setVisible(true);
                                this.btnMyCards[i].setEnabled(false);
                            }
                        }
                        if(this.btnMyCards[13] && this.btnMyCards[13].isEnabled()){
                            //this.btnMyCards[i].setColor(cc.color(128,128,128));
                            this.btnMyCards[i].getChildByTag(1002).setVisible(true);
                            this.btnMyCards[i].setEnabled(false);
                        }

                        btn = ccui.helper.seekWidgetByName(this.node, "hu");
                        btn.setPositionX(715-this.opertorcount*130);
                        btn.setVisible(true);
                        btn.setLocalZOrder(999);
                        btn.addTouchEventListener(this.clickOperatorBtn);
                        bOperator = true;
                    }
                    // 胡和杠点过才显示亮。
                    if(!this.bStatusLiang && !bOperator){
                        this.IsTing();
                        // 亮牌
                        if((!(this.cardnum<12 &&  parseInt(this.mod_kwx.roominfo.param1)%10 == 1)) && this.liangArray.length != 0){
                            this.DisplayTingPng();
                            var btn = ccui.helper.seekWidgetByName(this.node, "liang");
                            btn.setLocalZOrder(999);
                            btn.setVisible(true);
                            //btn.setBright(false);
                            btn.addTouchEventListener(this.clickOperatorBtn);
                        }
                    }

                    if(this.bStatusLiang && this.btnMyCards[13]){
                        //this.btnMyCards[13].setColor(cc.color(128,128,128));
                        this.btnMyCards[13].getChildByTag(1002).setVisible(true);
                        if (!bOperator){
                        //if(!this.bGang){
                            var _this = this;
                            this.btnMyCards[13].runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(function () {
                                _this.GameStep(113);
                            })));
                        }
                    }
                    break;

                // 起牌的是右手
                case 1:
                    this.isQipai = false;
                    this.node.getChildByTag(1200 + 13).setVisible(true);
                    this.showArrow(1);
                    break;
                // 起牌的是左手
                case 2:
                    this.isQipai = false;
                    this.node.getChildByTag(1300 + 13).setVisible(true);
                    this.showArrow(2);
                    break;
            }
        }
    }
    ccui.helper.seekWidgetByName(this.node, "roomcardnum").setString("剩牌: "+this.cardnum-- + "张");

};
//出牌玩家指向
gameclass.kwxtable.prototype.showArrow = function(ChairNum) {
    var str = ""; var _posint = cc.p(75,25);
    if(ChairNum == 0) { str = res.pointToSelf; _posint = cc.p(75.5,30); }
    if(ChairNum == 1) { str = res.pointToNext; _posint = cc.p(120,75.5); }
    if(ChairNum == 2) { str = res.pointToPrev; _posint = cc.p(30,75.5); }
    var point = ccui.helper.seekWidgetByName( this.node, "arrow" );
    point.setTexture( str );
    point.setPosition(_posint);
    point.runAction(cc.repeatForever(cc.blink(1.2,1)));
};

//最后出的那张牌指向
gameclass.kwxtable.prototype.setPointer = function ( pai, who ) {
    var pointer = ccui.helper.seekWidgetByName( this.node, "pointer" );
    pointer.stopAllActions();
    pointer.x   = pai.x;
    pointer.y   = pai.y + pai.height * 0.5;
    pointer.setVisible( true );
    pointer.setLocalZOrder ( 30 );
    var action  = cc.repeatForever( cc.sequence(
            cc.spawn(cc.moveTo(0.5, cc.p(pointer.x, pointer.y + 2.5)), cc.fadeTo(0.5, 255)),
            cc.spawn(cc.moveTo(0.5, cc.p(pointer.x, pointer.y - 2.5)), cc.fadeTo(0.5, 100))
        )
    );
    pointer.runAction( action );
};
// 显示每一张打出来的牌。
gameclass.kwxtable.prototype.StepCard = function(ChairNum, cardNum, _sound,isconnect) {
    var sprPlayedCard = this.createpenggangCard(false,cardNum,ChairNum,3);
    var strcardnum = "s"+ cardNum;
    if(_sound && g_music[strcardnum])
        mod_sound.playeffect(g_music[strcardnum],false);

    if(ChairNum != 0)
        this.seenCardsArray.push(cardNum);

    // 打出牌的坐标
    var node_played;
    var played_beginPosition;
    // ChairNum，座位序号。
    switch (ChairNum){
        // 自己的出牌
        case 0:
            node_played = ccui.helper.seekWidgetByName(this.node, "locator_myplayed");
            played_beginPosition = node_played.getPosition();

            // 如果出牌一行多于10，则换第二行出牌。
            var localorder = 1; var offset = 0;
            if(Math.floor(this.deskCardsNum[0] / 10)  > 0) {
                localorder = 0; offset = 10;
            }
            var posx = played_beginPosition.x + sprPlayedCard.getContentSize().width * (this.deskCardsNum[0] % 10);
            var posy = played_beginPosition.y +sprPlayedCard.getContentSize().height*0.5 + Math.floor(this.deskCardsNum[0] * 0.1) * sprPlayedCard.getContentSize().height - offset;
            sprPlayedCard.setLocalZOrder(localorder);
            sprPlayedCard.setPosition(posx, posy);
            if(_sound) this.setPointer( sprPlayedCard, 0 );
            break;

        // 下家（右）的出牌
        case 1:
            node_played = ccui.helper.seekWidgetByName(this.node, "locator_rightplayed");
            played_beginPosition = node_played.getPosition();

            // 如果出牌一行多于10，则换第二行出牌。
            sprPlayedCard.setPosition(played_beginPosition.x - Math.floor(this.deskCardsNum[1] / 10) * sprPlayedCard.getContentSize().width,
                played_beginPosition.y + 29 * (this.deskCardsNum[1] % 10));

            // 右手的牌需要往下显示，所以需要设置图层。
            sprPlayedCard.setLocalZOrder(10 - this.deskCardsNum[1] % 10);

            // 如果是碰了之后打牌，因为没起牌，需要把最后一张（专门碰牌位置的显示牌）隐藏。
            if(!isconnect) this.node.getChildByTag(1200 +13).setVisible(false);
            if(_sound) this.setPointer( sprPlayedCard, 1 );
            break;

        // 上家（左）的出牌
        case 2:
            node_played = ccui.helper.seekWidgetByName(this.node, "locator_leftplayed");
            played_beginPosition = node_played.getPosition();

            // 如果出牌一行多于10，则换第二行出牌。
            sprPlayedCard.setPosition(played_beginPosition.x + Math.floor(this.deskCardsNum[2] / 10) * sprPlayedCard.getContentSize().width,
                played_beginPosition.y - 29 * (this.deskCardsNum[2] % 10));

            // 如果是碰了之后打牌，因为没起牌，需要把最后一张（专门碰牌位置的显示牌）隐藏。
            if(!isconnect) this.node.getChildByTag(1300 +13).setVisible(false);
            if(_sound) this.setPointer( sprPlayedCard, 2 );
            break;
    }

    sprPlayedCard.setTag(this.cleanTag++);
    this.node.addChild(sprPlayedCard);
    if(_sound){
        this.lastPlayedCard = sprPlayedCard;
        this.lastChairNum = ChairNum;
    }
    this.deskCardsNum[ChairNum]++;
}

// 通过号码，找到对应牌的资源
gameclass.kwxtable.prototype.plistCardnumToResString = function(cardNum) {

    var strcard = "card_" + cardNum;
    return strcard+".png";
};
// 创建自己的手牌(仅限可操作的牌)
gameclass.kwxtable.prototype.CreateCard = function(cardNum) {
    var onecard = this.plistCardnumToResString(cardNum);
    var buttonCard = new ccui.Button();
    buttonCard.anchorX = 0;
    buttonCard.anchorY = 0;
    //cc.log(onecard,"dsaf");
    buttonCard.loadTextures("bg0_p0_hand_f.png", "bg0_p0_hand_f.png", "bg0_p0_hand_f.png", ccui.Widget.PLIST_TEXTURE);
    var childsprite = new cc.Sprite();
    childsprite.initWithSpriteFrameName(onecard);
    childsprite.anchorX = 0;
    childsprite.anchorY = 0;
    childsprite.setPosition(cc.p(2.5,1));
    childsprite.setTag(1001);
    buttonCard.addChild(childsprite);

    var childcardzz = new cc.Sprite(res.kwx_cardzz);
    childcardzz.anchorX = 0;
    childcardzz.anchorY = 0;
    childcardzz.setTag(1002);
    childcardzz.setVisible(false);
    buttonCard.addChild(childcardzz);

    return buttonCard;
};

//创建精灵card或替换纹理(碰杠打出的牌) (cardtype=0表示手牌，1表示碰杠，2表示亮的，3表示打出去的,4表示暗杠趴着的)
gameclass.kwxtable.prototype.createpenggangCard = function(isSprite,cardNum,chair,cardtype) {
    var sprcard = isSprite; var _anchor = 0.5; var offsetx = 0; var offsety = 0;
    var bgcardpng = "";//牌面背景
    var strcardpng = "";//牌面牌值
    //if(cardtype == 4)cc.log(cardNum, chair,cardtype);
    if(cardNum > 0) {
        //有值
        if (chair == 0) {
            if(cardtype == 3)
                strcardpng = "p4_";
            else
                strcardpng = "";
        }
        else if (chair == 1) strcardpng = "p3_";
        else if (chair == 2) strcardpng = "p1_";
        strcardpng += "card_" + cardNum;
        strcardpng += ".png";
    }
    //显示背景图
    if (chair == 0) {
        //_anchor = 0;
        offsetx = 38;  offsety = 60+13;
        if(cardtype == 4){
            bgcardpng = "bg0_p0_oper_b.png";//自己暗杠趴着的牌
        } else if(cardtype == 3){
            bgcardpng = "bg0_p0_push_f.png";
            offsetx = 18; offsety = 32;
        } else{
            bgcardpng = "bg0_p0_oper_f.png";
        }
    }
    else if (chair == 1){
        offsetx = 23; offsety = 27;
        if(cardtype == 0)
            bgcardpng = "bg0_p1_hand_b.png";//右手手牌
        else if(cardtype == 4)
            bgcardpng = "bg0_p1_oper_b.png";//右手暗杠趴着的牌
        else
            bgcardpng = "bg0_p1_oper_f.png";//右手碰.杠.打出去牌
    }
    else if (chair == 2){
        offsetx = 23; offsety = 27;
        if(cardtype == 0)
            bgcardpng = "bg0_p3_hand_b.png";//左手手牌
        else if(cardtype == 4)
            bgcardpng = "bg0_p1_oper_b.png";//左手暗杠趴着的牌
        else
            bgcardpng = "bg0_p1_oper_f.png";//左手碰.杠.打出去牌
    }
    //cc.log(strcardpng,bgcardpng);
    if(!sprcard){
        sprcard = new cc.Sprite();
        sprcard.initWithSpriteFrameName(bgcardpng);
        var childsprite = new cc.Sprite();
        if(cardNum > 0){
            childsprite.initWithSpriteFrameName(strcardpng);
        }
        childsprite.setPosition(cc.p(offsetx,offsety));
        childsprite.setTag(999);
        sprcard.addChild(childsprite);
    }else{
        sprcard.initWithSpriteFrameName(bgcardpng);
        sprcard.getChildByTag(999).setVisible(true);
        if(cardNum > 0)
            sprcard.getChildByTag(999).initWithSpriteFrameName(strcardpng);
        else
            sprcard.getChildByTag(999).setVisible(false);
    }
    return sprcard;
};

//收到服务端打牌消息后处理自己的手牌
gameclass.kwxtable.prototype.DisposeCard = function(cardnum)
{
    var _this = this;
    if(this.bStatusLiang){
        _this.drawCard = 0;
    }
    else
    {
        _this.myCards.push(_this.drawCard);
        for (var i = 0; i < _this.myCards.length; i++) {
            if (_this.myCards[i] == cardnum) {
                _this.myCards.splice(i, 1);
                break;
            }
        }

        _this.myCards.sort(function (a, b) {
            return a - b
        });

        // 起的牌重新排序
        //cc.log(_this.myCards);
        var pgcount = 0; var mycardposx = _this.myFirstCardPointX;
        for (var i = 0; i < _this.myCards.length; i++) {

            if (_this.myCards[i] != 0) {
                var cardPath = this.plistCardnumToResString(_this.myCards[i]);
                //_this.btnMyCards[i].loadTextures(cardPath, cardPath, cardPath,ccui.Widget.PLIST_TEXTURE);
                //cc.log(cardPath)
                _this.btnMyCards[i].getChildByTag(1001).setSpriteFrame(cardPath);
                _this.btnMyCards[i].setPosition( mycardposx, _this.myFirstCardPointY);
                mycardposx += 76;
            }
            else {
                pgcount += 1;
                //mycardposx = Math.ceil(pgcount/3)*(3*76+8) + _this.myFirstCardPointX;
                mycardposx += 76;
                if(pgcount%3 == 0) mycardposx += 8;
                _this.btnMyCards[i].setVisible(false);
            }
        }

        var btn = ccui.helper.seekWidgetByName(_this.node, "liang");
        btn.setLocalZOrder(999);
        btn.setVisible(false);
        btn = ccui.helper.seekWidgetByName(_this.node, "quxiaoliang");
        btn.setLocalZOrder(999);
        btn.setVisible(false);
        btn = ccui.helper.seekWidgetByName(_this.node, "shoudongliang");
        btn.setLocalZOrder(999);
        btn.setVisible(false);
        var notifynode = ccui.helper.seekWidgetByName(_this.node, "notifynode0");
        notifynode.removeAllChildren();

        if(this.isLiang){
            this.isLiang = false;
            this.bShouDongLiang = false;
            this.cardliangArray = [];
        }
    }
    // 起牌位置不显示。
    if(_this.btnMyCards[13]){
        _this.btnMyCards[13].setVisible(false);
    }

    //// 亮牌打牌后状态还原
    if(!this.bStatusLiang){
        for(var iBtn=0; iBtn<=13; iBtn++){
            if(this.btnMyCards[iBtn]){
                this.btnMyCards[iBtn].setEnabled(true);
                //this.btnMyCards[iBtn].setColor(cc.color(255,255,255));
                if(this.btnMyCards[iBtn].getChildByTag(1002)) this.btnMyCards[iBtn].getChildByTag(1002).setVisible(false);
                var liangpng = this.btnMyCards[iBtn].getChildByName("liangPng");
                if(liangpng) liangpng.removeFromParent();
                var tingPng = this.btnMyCards[iBtn].getChildByName("tingPng");
                if(tingPng) tingPng.removeFromParent();
                //this.btnMyCards[iBtn].removeAllChildren();
            }
        }
    }
}
// 打牌
gameclass.kwxtable.prototype.GameStep = function(tag) {

    var _this = this;
    var stepCard;

    var data;
    if (tag - 100 == 13)    // 起的牌直接打了。
    {
        stepCard = _this.drawCard;
        data = {"card":_this.drawCard};
    }
    else        // 打出已有的牌，把起的牌收起来。
    {
        data = {"card": _this.myCards[tag - 100]};
        stepCard = _this.myCards[tag - 100];
    }

    //_this.game.uimgr.showui("gameclass.msgboxui").setString("_this.isQipai="+_this.isQipai);
    if(!_this.isQipai) return;

    if(this.isLiang){
        data = {"cardl":this.cardliangArray,
            "want":this.wantArray,
            "card":stepCard,};
        _this.mod_kwx.RequestView(data);
    }
    else {
        _this.mod_kwx.ongamestep(data);
    }
    //金币场打牌不用立即执行
    if(_this.mod_kwx.roominfo.type < gameclass.gamegoldkwx){
        _this.isQipai = false;
        _this.DisposeCard(stepCard);
        _this.StepCard(0, stepCard,true);
    }
}

gameclass.kwxtable.prototype.share = function(){
    var info = this.mod_kwx.roominfo;
    var title = "";
    var txt = info.maxstep + "局,";//"房号:" + info.roomid + ","+
    if (parseInt(info.param1/100000%10) == 0) txt += "8番封顶," ; else txt += "16番封顶," ;
    //if (parseInt(info.param1/10000%10) == 0) txt += "不漂," ; else txt += "选漂," ;
    if (Math.floor(info.param1/100000000)%10 == 1) txt += "卡五4番,";
    if (parseInt(info.param1/10000000%10) == 1) txt += "碰胡/杠开4番, ";
    switch (info.type){
        case 2:
            title = "孝感";
            if (parseInt(info.param1/1000%10) == 1) txt += "数坎,";
            if (parseInt(info.param2/10%10) == 1) txt += "对亮对番, ";
            break;
        case 3:
            title = "襄阳";
            if (parseInt(info.param1%10) == 1) {
                txt += "全频道,";
                if (parseInt(info.param1/10%10) == 1) txt += "查大叫,";
            }
            else txt += "半频道,";
            break;
        case 4:
            title = "十堰";
            if (parseInt(info.param2/100%10) == 1) txt += "上楼,";
            if (parseInt(info.param1%10) == 1) {
                txt += "全频道,";
                if (parseInt(info.param1/10%10) == 1) txt += "查大叫,";
            }
            else txt += "半频道,";
            break;
        case 5:
            title = "随州";
            break;
        case 13:
            title = "宜城";
            if (parseInt(info.param2%10) == 1) txt += "跑恰摸八,";
            break;
        case 14:
            title = "应城";
            break;
    }
    if (parseInt(info.param1/100%10) == 0)  txt += "不买马,";
    else{
        if (parseInt(info.param1/1000000%10) == 0) txt += "亮倒自摸买马,"; else txt += "自摸买马,"
        if(parseInt(info.param1/100)%10 == 1) txt += "独马,"; else txt += "六马,";
    }
    //txt += " ...";
    //cc.log(txt)
    title += "玩法-房号["+ info.roomid +"]";
    if (parseInt(info.param1/10000%10) == 0) title += "-不漂" ; else title += "-选漂" ;
    gameclass.mod_platform.invitefriend(txt,info.roomid, title); //txt,roomId,title
};

gameclass.kwxtable.prototype.init = function(){
    this.node = this.game.uimgr.createnode(res.kwxtable,true);
    this.node.setTag(1025);
    this.node.setPosition((cc.winSize.width - this.node.getContentSize().width)/2,0);

    this.addChild(this.node);

    this.kougoldtxt = ccui.helper.seekWidgetByName(this.node, "kougoldtxt");

    var btn_layer = new gameclass.btn_setLayer(this.node,this.game);
    if(this.mod_kwx.roominfo.type >= gameclass.gamegoldkwx) {
        btn_layer.setgoldtype(gameclass.gamegoldkwx);
    }
    this.node.addChild(btn_layer);
    btn_layer.setLocalZOrder(999);

    this.safeLayer = new gameclass.checkSafeLayer(this.node,this.game,ccui.helper.seekWidgetByName(btn_layer,"btn_safe"));
    this.safeLayer.setName("safeLayer");
    this.node.addChild(this.safeLayer);

    this.countdown = ccui.helper.seekWidgetByName( this.node, "countdown" );
    this.curtime = 0;

    var _this = this;
    var exitroomfun = function () {
        var strmsg = "是否想要解散房间？";
        _this.game.uimgr.showui("gameclass.msgboxui");
        if(_this.mod_kwx.roominfo.type >= gameclass.gamegoldkwx) strmsg = "是否想要退出房间？";
        _this.game.uimgr.uis["gameclass.msgboxui"].setString(strmsg,function(){
            _this.mod_kwx.dissmissroom();
            if ( _this.mod_kwx.roominfo.person.length <= 2 ) {
                _this.game.uimgr.closeui("gameclass.kwxtable");
                //_this.game.uimgr.showui("gameclass.hallui");
            }
        });
    };


    //gameclass.createbtnpress(this.node, "exitRoom", exitroomfun);
    if(_this.mod_kwx.roominfo.type >= gameclass.gamegoldkwx){
        ccui.helper.seekWidgetByName(_this.node, "invitebtn").setVisible(false);
        ccui.helper.seekWidgetByName(_this.node, "distroyroom").setVisible(false);
        gameclass.createbtnpress(_this.node, "distroyroom_g", exitroomfun);
    }else{
        //ccui.helper.seekWidgetByName(_this.node, "ready_btn").setVisible(false);
        ccui.helper.seekWidgetByName(_this.node, "distroyroom_g").setVisible(false);
        gameclass.createbtnpress(_this.node, "distroyroom", exitroomfun);
    }

    //gameclass.createbtnpress(this.node, "roomInfo", function () {
    //    //btnout.setVisible(true);
    //    //btnin.setVisible(false);
    //    //var act = cc.sequence(cc.moveBy(0.2,cc.p(450, 0)));
    //    //var layer = ccui.helper.seekWidgetByName(_this.node, "roomInfo");
    //    //layer.stopAllActions();
    //    //layer.runAction(act);
    //    //    var card = [17,17,17,17,32,32,32,33,33,33,19,19,19,5];
    //        var card = [13,13,15,15,15,13,17,17,17,15,18,18,18,3];
    //        //var card = [33,33,33,5,5,6,6,7,7,8,8,8,9,3];
    //        _this.mod_kwx.Testcard({"card":card});
    //        _this.mod_kwx.sendGamePing(false);
    //});

    gameclass.createbtnpress(this.node, "invitebtn", function () {
        _this.share();
        if(window.wx)
        {
            _this.sharelayer.setVisible(true);
        }
    });
    gameclass.createbtnpress(this.node, "ready_btn", function () {
        _this.mod_kwx.gameready();
    });
    // 网络延时
    var textDelay = ccui.helper.seekWidgetByName(_this.node, "network");
    if (gameclass.delaytime < 200)
        textDelay.setColor(cc.color.GREEN);
    else if (gameclass.delaytime < 500)
        textDelay.setColor(cc.color.YELLOW);
    else
        textDelay.setColor(cc.color.RED);

    textDelay.setString("延迟：" + gameclass.delaytime);

    var showipinfo = function(sender,type){
        //if(ccui.Widget.TOUCH_ENDED) return;
        //if(sender.index == 0) return;
        if(_this.mod_kwx.begin == 0){
             if (ccui.Widget.TOUCH_BEGAN == type) {
                 sender.userInfoBg.setVisible(true);
            } else if (ccui.Widget.TOUCH_ENDED == type) {
                 sender.userInfoBg.setVisible(false);
            } else if (ccui.Widget.TOUCH_CANCELED == type) {
                 sender.userInfoBg.setVisible(false);
            }
        }else{
            if(ccui.Widget.TOUCH_ENDED == type){
                var _chair = sender.index;
                if(sender.index == 3){
                    _chair = 2;
                }
                var playerdata = _this.mod_kwx.getplayerdata(_chair);
                _this.game.uimgr.showui("gameclass.chatMicLayer").setPlayerInfo(playerdata,_this.mod_kwx,sender.index);
            }
        }
    }

    for(var i = 0;i < 4;i++){
        if(i == 2) continue;
        var btn = ccui.helper.seekWidgetByName(this.node,"cBtn"+i);
        btn.index = i;
        var userInfoBg = ccui.helper.seekWidgetByName(this.node,"userinfobg"+i);
        btn.userInfoBg = userInfoBg;
        btn.addTouchEventListener(showipinfo);
    }

    for (var i = 0;i < 3; i++){
        var data = {};

        // 界面上有4个人，显示为最后1人。
        var j = i;
        if (i == 2)
            j = 3;

        data.head = ccui.helper.seekWidgetByName(this.node, "head" + j);
        data.playername = ccui.helper.seekWidgetByName(this.node, "playername" + j);
        data.playerscore = ccui.helper.seekWidgetByName(this.node, "playerscore" + j);
        data.headBg = ccui.helper.seekWidgetByName(data.head,"headBg");
        data.idText = ccui.helper.seekWidgetByName(data.head,"id");
        data.ipText = ccui.helper.seekWidgetByName(data.head,"ip");
        data.off_line = ccui.helper.seekWidgetByName(data.head,"off_line");
        data.off_line.setVisible(false);
        data.uid = 0;
        data.piao = -1;
        this.players[i] = data;
        //cc.log(this.players[i]);
    }
    var piaopanel = ccui.helper.seekWidgetByName(this.node, "Panel_piao");

    for(var i=0; i<3; i++){
        var btn = ccui.helper.seekWidgetByName(piaopanel, "jp" + i);
        btn.addTouchEventListener(this.clickJiaPiaoBtn.bind(this));
    }
};
//获取玩法
gameclass.kwxtable.prototype.getFKWFInfo = function () {
    var txt = "";
    var vParam1 = this.mod_kwx.roominfo.param1;
    var vParam2 = this.mod_kwx.roominfo.param2;
    switch (this.mod_kwx.roominfo.type){
        case 2:
            txt = "孝感玩法: ";
            break;
        case 3:
            txt = "襄阳玩法: ";
            break;
        case 4:
            txt = "十堰玩法: ";
            break;
        case 5:
            txt = "随州玩法: ";
            break;
        case 13:
            txt = "宜城玩法: ";
            break;
        case 14:
            txt = "应城玩法: ";
            break;
        default:
            //txt = "金币场玩法: ";
            break;
    }
    if (parseInt(vParam1/100000%10) == 0) txt += "8番封顶," ; else txt += "16番封顶," ;
    if (parseInt(vParam1/10000%10) == 0) txt += "不漂," ; else txt += "自选加漂," ;
    if (Math.floor(vParam1/100000000)%10 == 1) txt += "卡X4,";  else txt += "卡X2," ;
    if (parseInt(vParam1/10000000%10) == 1) txt += "碰碰X4,杠上开X4, "; else txt += "碰碰X2,杠上开X2, ";
    switch (this.mod_kwx.roominfo.type){
        case 2:
            if (parseInt(vParam1/1000%10) == 1) txt += "数坎,";
            if (parseInt(vParam2/10%10) == 1) txt += "对亮对番, "; //else txt += "无对亮对番, ";
            break;
        case 3:
            if (parseInt(vParam1%10) == 1) {
                txt += "全频道,";
                if (parseInt(vParam1/10%10) == 1) txt += "查大叫,";
            }
            else txt += "半频道,";
            break;
        case 4:
            if (parseInt(vParam2/100%10) == 1) txt += "上楼,";
            if (parseInt(vParam1%10) == 1) {
                txt += "全频道,";
                if (parseInt(vParam1/10%10) == 1) txt += "查大叫,";
            }
            else txt += "半频道,";
            break;
        case 5:
            break;
        case 13:
            if (parseInt(vParam2%10) == 1) txt += "跑恰摸八,";
            break;
        case 14:
            break;
    }
    if (parseInt(vParam1/100%10) == 0)  txt += "不买马,";
    else{
        if (parseInt(vParam1/1000000%10) == 0) txt += "亮倒自摸买马,"; else txt += "自摸买马,"
        if(parseInt(vParam1/100)%10 == 1) txt += "独马,"; else txt += "六马,";
    }
    return txt;
};
gameclass.kwxtable.prototype.getGoldWFInfo = function () {
    //买马玩法：16番封顶；自选加漂；数坎；卡X4；碰碰X4；杠上开X4；亮倒买马
    //不买马玩法：16番封顶；自选加漂；数坎；卡X4；碰碰X4；杠上开X4
    //全频道买马玩法：8番封顶；自选加漂；卡X2；碰碰X2；杠上开X2；亮倒买马
    //全频道不买马玩法：8番封顶；自选加漂；卡X2；碰碰X2；杠上开X2
    //上楼玩法：8番封顶；自选加漂；卡X4；碰碰X2；杠上开X2；海底捞X2
    var txt = "";
    var goldtype = (this.mod_kwx.roominfo.type - gameclass.gamegoldkwx)%10;
    switch (goldtype){
        case 0:
            txt = "买马玩法：16番封顶,自选加漂,数坎,卡X4,碰碰X4,杠上开X4,亮倒买马";
            break;
        case 1:
            txt = "不买马玩法：16番封顶,自选加漂,数坎,卡X4,碰碰X4,杠上开X4";
            break;
        case 2:
            txt = "全频道买马玩法：8番封顶,自选加漂,卡X2,碰碰X2,杠上开X2,亮倒买马";
            break;
        case 3:
            txt = "全频道不买马玩法：8番封顶,自选加漂,卡X2；碰碰X2,杠上开X2";
            break;
        case 4:
            txt = "上楼玩法：8番封顶,自选加漂,卡X4,碰碰X2,杠上开X2,海底捞X2";
            break;
    }
    return txt;
};
gameclass.kwxtable.prototype.Onroominfo = function () {
    var _this = this;
    _this.refplayerinfo();
    var vParam1 = _this.mod_kwx.roominfo.param1;
    var txt = "";
    if(_this.mod_kwx.roominfo.type < gameclass.gamegoldkwx)
        txt = _this.getFKWFInfo();
    else
        txt = _this.getGoldWFInfo();

    ccui.helper.seekWidgetByName(_this.node, "kwxtext").setString(txt);

    // 是否加漂
    var kwxinfopiao = parseInt(vParam1 / 10000)  % 10;

    if(kwxinfopiao){
        _this.mod_kwx.isJiaPiao = true;
    }
};

gameclass.kwxtable.prototype.showpiao = function () {
    ccui.helper.seekWidgetByName(this.node, "Panel_piao").setVisible(true);
    this.kougoldtxt.setVisible(true);
    this.kougoldtxt.setString("本场每局消耗 "+Math.ceil(this.mod_kwx.roominfo.golddifen*0.3)+" 金币");
};
gameclass.kwxtable.prototype.clickJiaPiaoBtn = function (sender, type) {
    if(type == ccui.Widget.TOUCH_ENDED){
            // 通过逻辑标签来区分点的什么按钮
        switch (sender.getTag()){
            case 206:
                this.mod_kwx.OnSendPiaoBet(0);
                break;
            case 208:
                this.mod_kwx.OnSendPiaoBet(1);
                break;
            case 210:
                this.mod_kwx.OnSendPiaoBet(2);
                break;
        }
        ccui.helper.seekWidgetByName(this.node, "Panel_piao").setVisible(false);
        this.kougoldtxt.setVisible(false);
    }
};
gameclass.kwxtable.prototype.setreadybtn = function (bool) {
    var ready_btn = this.node.getChildByName("ready_btn");
    ready_btn.setVisible(bool);
};

// 刷新玩家信息。
gameclass.kwxtable.prototype.refplayerinfo = function() {

    // 自己固定在中间，根据自己在玩家队列中的顺序，需要调整顺序。
    for (var i = 0;i < 3;i++){

        var playerdata = this.mod_kwx.getplayerdata(i);

        var has = playerdata != null;

        //cc.log(i,playerdata);
        this.players[i].head.setVisible(has);
        if (has) {
            //cc.log(i,playerdata.param);
            //this.players[i].head.setString(playerdata.name);
            //gameclass.mod_base.showtximg(this.players[i].head, playerdata.imgurl, 29, -40 );
            gameclass.mod_base.showtximg(this.players[i].headBg, playerdata.imgurl, 0,0);
            this.players[i].playername.setString(playerdata.name);
			this.players[i].idText.setString("ID:"+playerdata.uid);
            this.players[i].ipText.setString("IP:"+playerdata.ip);
            this.players[i].off_line.setVisible(!playerdata.line);
            this.players[i].head_url = playerdata.imgurl || "";
            this.players[i].uid = playerdata.uid;
            if(this.mod_kwx.roominfo.type >= gameclass.gamegoldkwx){
                this.players[i].playerscore.setString(""+gameclass.changeShow(playerdata.param));
            }
        }
    }
};
gameclass.kwxtable.prototype.kwxdaojishi = function () {
    this.curtime -= 1;
    if(this.curtime >= 0) this.countdown.setString(this.curtime);
    else{
        this.countdown.setVisible(false);
    }
};
gameclass.kwxtable.prototype.kwxtuoguantime = function (msgdata) {
    //cc.log(msgdata);
    this.curtime = msgdata.time;
    this.countdown.setString(this.curtime);
    this.countdown.setVisible(true);
};
//重新设置左右手牌位置
gameclass.kwxtable.prototype.kwxResetPos = function(chair,pglen,lianglen) {
    if(chair == 0) {
    }else{
        var ctag = 0; var beginposx = 0; var beginposy = 0; var rt = 0;
        var lens = pglen * 3 + lianglen;
        if (chair == 1) {
            ctag = 1200;
            beginposx = 1000;
            beginposy = 232-(lens*6+(pglen+Math.ceil(lianglen/20))*20)*0.5;
        }
        else if (chair == 2) {
            ctag = 1300;
            beginposx = 150;
            beginposy = 528+(lens*6+(pglen+Math.ceil(lianglen/20))*20)*0.5;//碰杠后位置自适应
        }
        for (var i = 0; i < 13; i++) {
            var cards = this.node.getChildByTag(ctag + i);
            if (chair == 1) cards.setPosition(beginposx, beginposy+rt);
            else if (chair == 2) cards.setPosition(beginposx, beginposy-rt);
            if(i < lens) {
                rt += 29;
                if(i > 0){
                    if((i+1)%3 == 0 && i < pglen*3) {
                        rt += 15;
                        if((i+1)==lens && pglen*3 == lens){
                            rt += 4;//碰牌和手牌需要 相隔19个像素
                        }
                    }
                    else if(i == lens-1){
                        rt += 19;
                    }
                }
            }
            else {
                rt += 23;
            }
        }
        if (chair == 1) this.node.getChildByTag(ctag + 13).setPosition(beginposx, beginposy + rt + 33);
        else if (chair == 2) this.node.getChildByTag(ctag + 13).setPosition(beginposx, beginposy - rt - 33);
    }
};
gameclass.kwxtable.prototype.kwxtableping = function() {
    var _this = this;
    _this.pingnum += 1;
    if(_this.pingnum < 5){
        return;
    }
    else{
        _this.mod_kwx.sendGamePing(_this.pingflag);
        _this.pingnum = 0;
        _this.pingflag = false;
    }
};

gameclass.kwxtable.prototype.checkSafe = function(people){
    this.safeLayer.checkSafe(people);
};

gameclass.kwxtable.prototype.userLineOut =  function(index,data){

    if(data.line)
        this.players[index].off_line.setVisible(false);
    else
        this.players[index].off_line.setVisible(true);
    gameclass.mod_base.showtximg(this.players[index].headBg, this.players[index].head_url, 0, 0,"",!data.line);
    //gameclass.mod_base.showtximg(this.playerHeads[index].head_img, data.imgurl, 0, 0 , null ,true);
};