/**
 * Created by Administrator on 2018-1-3.
 */

gameclass.pdkTable = gameclass.baseui.extend({
    playerHeads:null,
    zhuangjiaIndex:null,//当前出牌人的座位号
    logoSp:null,
    timer:-1,//3秒计时的一个变量
    hasSend:true,
    myTrust:false,
    isFirstTips:true,

    ctor: function () {
        this._super();
        this.playerHeads = [];//保存玩家节点的数组
        this.savebefCard = [];
    },

    show:function(){
        cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
        cc.spriteFrameCache.addSpriteFrames(res.alarmplist);

        this.node = this.game.uimgr.createnode(res.pdkTable,true);
        this.node.setTag(666);
        this.addChild(this.node);

        //按钮层
        var btn_layer = new gameclass.btn_setLayer(this.node,this.game);
        this.node.addChild(btn_layer);
        btn_layer.setgoldtype(gameclass.gamegoldPDK);

        this.safeLayer = new gameclass.checkSafeLayer(this.node,this.game,ccui.helper.seekWidgetByName(btn_layer,"btn_safe"));
        this.safeLayer.setName("safeLayer");
        this.node.addChild(this.safeLayer);


        this.btn_start = ccui.helper.seekWidgetByName(this.node,"btn_start");
        this.outControlLayer = ccui.helper.seekWidgetByName(this.node,"chuPaiLayer");
        this.outControlLayer.setVisible(false);

        this.btn_changeTable = ccui.helper.seekWidgetByName(this.node,"btn_changeTable");

        this.clock = ccui.helper.seekWidgetByName(this.node,"clock");
        this.time = this.clock.getChildByName("time");
        this.time.ignoreContentAdaptWithSize(true);
        this.clock.setVisible(false);

        this.tuoguanLayer = ccui.helper.seekWidgetByName(this.node,"tuoguanmask");
        this.tuoguanLayer.setVisible(false);

        this.btn_buchu = ccui.helper.seekWidgetByName(this.node,"btn_buchu");
        this.btn_buchu.setVisible(false);
        this.rankTool = new gameclass.mod_ranking();
        this.node.update= this.updateTime.bind(this);
        this.node.scheduleUpdate();
    },

    setmod: function (_mod) {
        this.mod_pdk = _mod;
        this.mod_pdk.bindUI(this);
        this.tool_cardType = new gameclass.pdk_cardType();
        var _this = this;
        var showipinfo = function(sender,type){
            if(ccui.Widget.TOUCH_ENDED == type){
                var playerdata = _this.mod_pdk.persons[sender.index];
                _this.rankTool.getPlayerInfo(playerdata.uid,function(retdata){
                    playerdata.sign = retdata.sign;
                    _this.game.uimgr.showui("gameclass.chatMicLayer").setPlayerInfo(playerdata,_this.mod_pdk,sender.index);
                })
            }
        }
        for(var i = 0; i < 3;i++){
            ccui.helper.seekWidgetByName(this.node,"playerHead"+i).setVisible(false);
        }
        //创建玩家
        for(var i = 0;i < this.mod_pdk.maxNum ;i++){
            this.playerHeads[i] = new gameclass.pdkPlayer(
                ccui.helper.seekWidgetByName(this.node,"playerHead"+i),
                i,
                this.node,
                this
            )
            this.playerHeads[i].node.index = i;
            this.playerHeads[i].node.addTouchEventListener(showipinfo);
        }

        gameclass.createbtnpress(this.node, "btn_start", function () {
            _this.mod_pdk.sendGameReady();
            _this.btn_start.setVisible(false);
        });
        //不出牌
        gameclass.createbtnpress(this.node, "btn_buchu", function () {
            _this.hasSend = true;
            _this.mod_pdk.sendCard([]);
            _this.btn_buchu.setVisible(false);
            _this.outControlLayer.setVisible(false);
        });
        //出牌
        gameclass.createbtnpress(this.node, "btn_chupai", function () {
            _this.isFirstTips = true;
            var canout = _this.checkCanOut(_this.playerHeads[0].willSendCard);
            if(canout){
                _this.mod_pdk.sendCard(_this.playerHeads[0].willSendCard);
            }else{
                _this.showToast("牌型错误");
            }
        });
        //提示
        gameclass.createbtnpress(this.node, "btn_tishi", function () {
            //! 将原来的提示清理
            var copyWillSendCard = _this.playerHeads[0].willSendCard.slice(0);
            _this.playerHeads[0].willSendCard.length = 0;
            cc.each(_this.playerHeads[0].curCards , function(o,i){
                var target = _this.playerHeads[0].cardsNode.getChildByTag(o.id);
                if(target.isup){
                    target.setPositionY(target.getPositionY() - 20);
                    target.isup = false;
                }
            });
            var befcards = [];

            if(_this.zhuangjiaIndex != 0){
                befcards = _this.savebefCard.slice(0,_this.savebefCard.length);
            }
            //test
            //befcards = [31,32,33,41,42,43,61,62,73,81];
            //testend

            //! 复制手牌
            var copyhandcards = [];
            for(var i =  0;i < _this.playerHeads[0].curCards.length;i++) {
                copyhandcards[i] = _this.playerHeads[0].curCards[i].id;
            }

            var handcards = copyhandcards.slice(0,copyhandcards.length);

            var tipscard = [];
            if(_this.isFirstTips) {
                tipscard = _this.tool_cardType.tipsCard(copyhandcards, befcards);
                if(!tipscard || tipscard.length == 0){
                    _this.showToast("没有牌大过上家");
                    return;
                }else{
                    _this.isFirstTips = false;
                }
            }else {
                tipscard = _this.tool_cardType.tipsCard(copyhandcards, copyWillSendCard);
                if (!tipscard || tipscard.length == 0) {
                    _this.isFirstTips = true;
                }
            }
            tipscard.sort(function(a, b){
                return b - a});
            _this.tipsSelectCards(tipscard,handcards);
        });
        //换桌
        gameclass.createbtnpress( this.node, "btn_changeTable", function () {
            _this.mod_pdk.roominfo.goldchang = true;
            _this.mod_pdk.dissmissroom();
        });
        //取消托管
        gameclass.createbtnpress( this.node, "canceltuoguan", function () {
            _this.mod_pdk.sendcanceltuoguang(false);
        });
    },
    checkCanOut:function(_willSendCard){
        var checkCards = this.transMinCard(_willSendCard);
        var check = false;
        //test
        //this.zhuangjiaIndex = 1;
        //
        if(this.zhuangjiaIndex == 0) {
            var hitCard = this.tool_cardType.check(checkCards);
            var canout = this.checkCard(hitCard,checkCards);
            if(canout && hitCard != 0) {
                check = true;
            }
        }else{
            var befcards = this.savebefCard.slice(0);
            //test
            //befcards = [31,32,33,41,42,43,61,62,71];
            //testend
            var checkCards2 = this.transMinCard(befcards);
            var perssCard = this.tool_cardType.compare(checkCards,checkCards2);
            //检测三带或者飞机张数是否匹配
            var canout = this.checkCard(perssCard,checkCards);
            if (canout &&  perssCard.result != -1 && perssCard.value != -1) {
                check = true;
            }
        }
        return check;
    },

    checkCanAllOut:function(){
        var tmp = [];
        var resultObj = {'check':false,'card':[]};
        for(var i = 0;i < this.playerHeads[0].curCards.length;i++){
            tmp.push(this.playerHeads[0].curCards[i].id);
        }
        var check = this.checkCanOut(tmp);
        resultObj = {'check':check,'card':tmp};

        //检测是否有四带
        var res = this.tool_cardType.check(this.transMinCard(resultObj.card));
        if(res.type == this.tool_cardType.CARDTYPE.sidai){
            resultObj.check = false;
        }
        return resultObj;
    },

    checkSafe:function(people){
        this.safeLayer.checkSafe(people);
    },

    checkCard:function(cards,checkCards){
        var canOut = true;
        var countMax;
        if(cards.type == this.tool_cardType.CARDTYPE.sandai || cards.type == this.tool_cardType.CARDTYPE.feiji || cards.type == this.tool_cardType.CARDTYPE.sidai){
            countMax = 5;
            if(cards.type == this.tool_cardType.CARDTYPE.feiji) {
                if(cards.res){
                    countMax = cards.res.count*5;
                }else{
                    countMax =cards.value.count*5;
                }
            } else if(cards.type == this.tool_cardType.CARDTYPE.sidai){
                countMax = 6;
            }
            if(this.playerHeads[0].curCards.length >= countMax ){
                if(checkCards.length != countMax){
                    canOut = false;
                }
            }else{
                if(this.playerHeads[0].curCards.length != checkCards.length){
                    canOut = false;
                }
            }
        }
        return canOut;
    },

    //因为玩法是必须管,所以每次轮到自己出牌的时候。都要检测..
    checkNeedOut:function(){
        var sure = false;
        //! 复制手牌
        var copyhandcards = [];
        for(var i =  0;i < this.playerHeads[0].curCards.length;i++) {
            copyhandcards[i] = this.playerHeads[0].curCards[i].id;
        }
        var befcard = this.savebefCard.slice(0);
        var tipscard = this.tool_cardType.tipsCard(copyhandcards, befcard);
        if(tipscard && tipscard.length > 0){
            sure = true;
        }
        //test
        //sure = false;
        //testend

        if(!sure){
            this.outControlLayer.setVisible(false);
            this.btn_buchu.setVisible(true);
            this.hasSend = false;
            this.timer = 3;
        }else{
            this.outControlLayer.setVisible(true);
        }
    },

    showFirstLogo:function(curIndex){
        this.logoSp = new cc.Sprite(res.pdkFirstLogo);
        this.logoSp.setAnchorPoint(1,1);
        var parentNode = null;
        if(curIndex == 0){
            parentNode = this.playerHeads[0].cardsNode.getChildren()[15];
        }else{
            parentNode =  new cc.Sprite();
            parentNode.setPosition(this.playerHeads[curIndex].orginalOutPos);
            parentNode.initWithSpriteFrameName("card_3c.png");
            parentNode.setTag(888);
            this.node.addChild(parentNode);
        }
        parentNode.addChild(this.logoSp);
        this.logoSp.setPosition(parentNode.width-5,parentNode.height-5);

    },

    getTime:function(time){
        this.clock.setVisible(true);
        this.overTime = parseInt(new Date().getTime()) + time*1000;
    },

    //选中提示的牌
    tipsSelectCards:function(_tipscard){
        var handCard = this.playerHeads[0].curCards;
        for(var i = 0; i < _tipscard.length; i++) {
            for(var j = 0; j < handCard.length; j++) {
                if(_tipscard[i] == 14) {
                    _tipscard[i] = 1;
                } else if(_tipscard[i] == 20) {
                    _tipscard[i] = 2;
                } else if(_tipscard[i] >= 1000) {
                    _tipscard[i] /= 10;
                }
                if(_tipscard[i] != parseInt(handCard[j].id / 10)) {
                    continue;
                }
                var target = this.playerHeads[0].cardsNode.getChildByTag(handCard[j].id);
                if(target.isup) {
                    continue;
                }
                this.playerHeads[0].willSendCard.push(target.getTag());
                target.setPositionY(target.getPositionY() + 20);
                target.isup = true;
                break;
            }
        }
    },

    transCardtoNum:function ( _cards ) {
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
    },
    showLastSendCard:function(_index,card){
        this.savebefCard = card;
        this.playerHeads[_index].showOutPoke(card);
    },
    onReady:function(_index){
        this.playerHeads[_index].onReady();
        for(var i = 0;i < this.mod_pdk.maxNum;i++){
            this.playerHeads[_index].cardsNode.removeAllChildren();
        }
    },
    onTuoguan:function(bool){
        this.myTrust = bool;
        this.tuoguanLayer.setVisible(bool);
    },
    //userLineOut:function(index,data){
    //    gameclass.mod_base.showtximg(this.playerHeads[index].head_img, data.imgurl, 0, 0,"",true);
    //},

    updatePlayerinfo: function (data) {
        var _this = this;
        cc.each(data, function (o, i) {
            if (o) {
                _this.playerHeads[i].setBaseInfo({
                    name: o.name,
                    head: o.imgurl,
                    uip  : o.ip,
                    uid  : o.uid,
                    sex: o.sex,
                    address  : o.address,
                    ready : o.ready || false,
                    line  :o.line,
                    total : (_this.mod_pdk.begin) ? o.total : o.param,
                });
                _this.playerHeads[i].setVisible(true);
            } else {
                _this.playerHeads[i].setVisible(false);
            }
        });
        if(this.playerHeads[0].ready){
            this.btn_start.setVisible(false);
        }
    },

    gameReady:function(playerInfo){
        this.btn_start.setVisible(false);
        this.btn_changeTable.setVisible(false);
        for(var i = 0;i < this.mod_pdk.maxNum;i++){
            this.playerHeads[i].initShow();
            this.playerHeads[i].outNode.removeAllChildren(true);
            this.playerHeads[i].showCardLen(playerInfo[i].card.length);
            if(playerInfo[i]){
                this.playerHeads[i].setVisible(true);
                this.playerHeads[i].stateImg.setVisible(false);
                this.playerHeads[i].score_text.setString(playerInfo[i].total);
            }else{
                this.playerHeads[i].setVisible(false);
            }
        }
    },

    startGame:function(curIndex,dealArr){
        this.showControlTime(curIndex);
        this.zhuangjiaIndex = curIndex;
        this.safeLayer.btn_safe.setVisible(false);
        this.onDealCards(dealArr);
        if(curIndex == 0){
            this.outControlLayer.setVisible(true);
            var result = this.checkCanAllOut();
            if(result.check){
                this.sendCard(result.card);
            }
        }
        this.node.scheduleOnce(function(){
            this.showFirstLogo(curIndex);
        }.bind(this),0.8);
        for(var i = 0;i < this.mod_pdk.maxNum;i++){
            if(i == curIndex) this["roler"+i].setAnimation(0,"sikao",true);
            else this["roler"+i].setAnimation(0,"daiji",false);
        }
    },

    //发牌
    onDealCards: function(_arr) {
        for(var i = 0; i < this.mod_pdk.maxNum;i++){
            this.playerHeads[i].dealCards(_arr[i]);
            this.playerHeads[i].handsNum.setString("剩余张数:"+_arr[i].length);
        }
    },

    onSendCard:function(controlIndex,sendIndex,cards){
        this.outControlLayer.setVisible(controlIndex == 0);
        //删除首出DEMO
        if(this.logoSp != null){
            this.logoSp.removeFromParent(true);
            this.logoSp = null;
        }
        if(this.node.getChildByTag(888)){
            this.node.getChildByTag(888).removeFromParent(true);
        }
        var type = 0;
        if(cards.length > 0){
            this.savebefCard = cards;
            this.zhuangjiaIndex = sendIndex;
            cc.log("庄家:"+this.zhuangjiaIndex);

            var checkCards = this.transMinCard(cards);
            var hitCard = this.tool_cardType.check(checkCards,this.playerHeads[0].curCards);
            this.playRes(hitCard.type,hitCard.value,sendIndex);
            type = hitCard.type;
            if(type == this.tool_cardType.CARDTYPE.zhadan){
                //炸弹及时飘分
                for(var i = 0;i < this.mod_pdk.maxNum;i++){
                    if(i==sendIndex){
                        gameclass.showYSText(this.mod_pdk.difen * 10,this.playerHeads[i].node.getPosition(),this.node);
                    }else{
                        gameclass.showYSText(-this.mod_pdk.difen * 5,this.playerHeads[i].node.getPosition(),this.node);
                    }
                }
            }
        }else{
            //mod_sound.playeffect(g_music["Man_buyao"]);
        }
        if(sendIndex == this.zhuangjiaIndex){
            for(var i = 0;i < this.mod_pdk.maxNum;i++){
                this.playerHeads[i].stateImg.setVisible(false);
            }
        }
        this.playerHeads[controlIndex].outNode.removeAllChildren();
        this.playerHeads[sendIndex].onSendCard(cards,type);

        //打牌时候切换动作
        for(var i = 0;i < this.mod_pdk.maxNum;i++){
            if(i == controlIndex) this["roler"+i].setAnimation(0,"sikao",true);
            else this["roler"+i].setAnimation(0,"daiji",false);
        }
        this.showControlTime(controlIndex);
        if(controlIndex == 0){
            this.isFirstTips = true;
            var result = this.checkCanAllOut();
            if(result.check){
                this.mod_pdk.sendCard(result.card);
                return;
            }
            if(this.zhuangjiaIndex != 0 && !this.myTrust){
                this.checkNeedOut();
            }
        }
    },

    onSimpleEnd:function(data){
        this.outControlLayer.setVisible(false);
        this.btn_buchu.setVisible(false);
        this.btn_start.setVisible(true);
        this.btn_changeTable.setVisible(true);
        this.tuoguanLayer.setVisible(false);
        this.clock.setPosition(568,320);
        this.hasSend = true;
        this.timer = -1;

        var winPos;
        var winIndex = -1;
        var _this = this;
        for(var i = 0;i < this.mod_pdk.maxNum;i++){
            if(data[i].score > 0){
                winPos = this.playerHeads[i].node.getPosition();
                winIndex = i;
                break;
            }
        }

        for(var i = 0;i < this.mod_pdk.maxNum;i++){
            this.playerHeads[i].initShow();
            //赢的人打出的牌不删除
            if(i != winIndex){
                this.playerHeads[i].outNode.removeAllChildren();
                this["roler"+i].setAnimation(0,"daiji",true);
            }else{
                this["roler"+i].setAnimation(0,"qingzhu",true);
            }
            this.playerHeads[i].initData();
            this.playerHeads[i].showEndPoke(this.playerHeads[i].cardsNode,data[i].card);

            if(data[i].score < 0){
                var sp=new goldSpLayer(res.niuniuAnimateGold,Math.abs(data[i].score),0.5,0,winPos,this.playerHeads[i].node.getPosition());
                this.node.addChild(sp);
            }
        }
        //飘分
        this.node.scheduleOnce(function(){
            for(var i = 0;i < _this.mod_pdk.maxNum;i++){
                gameclass.showYSText(data[i].score,_this.playerHeads[i].node.getPosition(),_this.node);
                _this.playerHeads[i].reflashScore(data[i].total);
            }
        },1)
    },

    setRoominfo:function(people){
        if(people == 3 ) return;
        ccui.helper.seekWidgetByName(this.node,"ruleText").setString("16张玩法  2人  能管必出  关门")
    },

    reflashScore:function(_scoreArr){
        for(var i = 0;i < this.mod_pdk.maxNum;i++){
            this.playerHeads[i].reflashScore(_scoreArr[i]);
        }
    },

    reflashAllMoeny:function(data){
        for(var i = 0;i < data.info.length;i++){
            var index = this.mod_pdk.getPlayerIndexById(data.info[i].uid);
            this.playerHeads[index].reflashScore(data.info[i].total);
        }
    },

    showControlTime:function(index){
        if(index >= 0){
            var posArr = [cc.p(300,210),cc.p(960,420),cc.p(172,420)];
            this.clock.setVisible(true);
            this.clock.setPosition(posArr[index]);
        }else{
            this.clock.setVisible(false);
        }
    },

    //setNoOutState:function(_bool){
    //    this.btn_buchu.setBright(_bool);
    //    this.btn_buchu.setEnabled(_bool);
    //},

    createCardUI:function(num,type){
        var point = num;
        //显示A和2
        if(point > 13 && point < 16){
            point -= 13;
        }
        var spr =  new cc.Sprite();
        spr.initWithSpriteFrameName("card_" + point +  type + ".png");
        spr.setAnchorPoint(cc.p(0.5,0.5));
        return spr;
    },

    transMinCard:function(_arrCards){
        var checkCards = [];
        for(var i =0;i < _arrCards.length; i++){
            checkCards[i]= Math.floor(_arrCards[i]/10);
            if(checkCards[i] < 3){
                checkCards[i] += 13;
            }
        }
        return checkCards;
    },

    showToast:function(_text){
        if(!this.node.getChildByTag(123456)){
            var node = new cc.Sprite(res.pdktishiBg);
            node.setPosition(this.node.getContentSize().width / 2,this.playerHeads[0].cardsNode.getPositionY());
            node.setTag(123456);
            var text = new cc.LabelTTF(_text, "Arial", 30);
            text.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
            node.addChild(text);
            text.setTag(1);
            this.node.addChild(node);
        }else{
            this.node.getChildByTag(123456).setVisible(true);
        }
        var actNode = this.node.getChildByTag(123456);
        actNode.setOpacity(255);
        actNode.getChildByTag(1).setOpacity(255);
        actNode.runAction(cc.sequence(cc.delayTime(1),cc.fadeOut(1)));
        actNode.getChildByTag(1).runAction(cc.sequence(cc.delayTime(1),cc.fadeOut(1)));
        actNode.getChildByTag(1).setString(_text);
    },

    chatshowinfo:function(index,data){
        cc.log("!!!!!!!!!!!!!!!!",data.type);
        if(data.type == 4){
            var sendIndex = this.mod_pdk.getPlayerIndexById(data.uid);
            var hitIndex = this.mod_pdk.getPlayerIndexById(JSON.parse(data.chat).hitUid);
            var _senderObj = JSON.parse(data.chat);
            mod_sound.playeffect(g_music["magic"+_senderObj.type],false);
            var _animateNode=new cc.Node();
            _animateNode.setScale(0.8);
            _senderObj.type+=1;
            var sucAnim = new sp.SkeletonAnimation(g_magic_chat["magic_chat_"+_senderObj.type+"_1_json"], g_magic_chat["magic_chat_"+_senderObj.type+"_1_atlas"]);
            sucAnim.setAnimation(0, 'animation', false);
            sucAnim.setAnchorPoint(0.5,0.5);
            _animateNode.addChild(sucAnim);
            var senderPos = this.playerHeads[sendIndex].node.getPosition();
            _animateNode.setPosition(senderPos.x,senderPos.y+160);
            var hitPos = this.playerHeads[hitIndex].node.getPosition();
            this.node.addChild(_animateNode);
            _animateNode.runAction(cc.sequence(cc.delayTime(1),cc.spawn(cc.rotateTo(0.5,360),cc.moveTo(0.5,cc.p(hitPos.x,hitPos.y+160))),cc.callFunc(function(_animateNode,sucAnim){
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
            this.playerHeads[index].onChat(data);
        }
    },

    playRes:function(soundType,value,sendIndex){
        var pos = cc.p(this.playerHeads[sendIndex].outNode.getPositionX(),this.playerHeads[sendIndex].outNode.getPositionY()-20);
        switch (soundType){
            case this.tool_cardType.CARDTYPE.danzhang:
                mod_sound.playeffect(g_music["Man_"+value],false);
                break;
            case this.tool_cardType.CARDTYPE.duizi:
                mod_sound.playeffect(g_music["Man_dui"+value],false);
                break;
            case this.tool_cardType.CARDTYPE.zhadan:
                mod_sound.playeffect(g_music["Man_zhadan"],false);
                this.createSpine('zhadan',cc.p(1136/2,320),'animation',false,0.8);
                break;
            case this.tool_cardType.CARDTYPE.liandui:
                mod_sound.playeffect(g_music["Man_liandui"],false);
                this.createSpine('shunziduizi',pos,'liandui',false,0.8);
                break;
            case this.tool_cardType.CARDTYPE.shunzi:
                mod_sound.playeffect(g_music["Man_shunzi"],false);
                this.createSpine('shunziduizi',pos,'shunzi',false,0.8);
                break;
            case 20:
                //this.playAnim("chun",1,3,0.5);
                //this.playAnim("spring/upflower/huaban_",1,13,0.15);
            default:
                break;
        }
    },

    createSpine:function(nameStr,pos,_animation,_loop,_scaleNum,_parentNode){
        if(!this[nameStr]){
            this[nameStr] = new sp.SkeletonAnimation(res[nameStr+"Json"], res[nameStr+"Atlas"]);
            if(!_parentNode){
                _parentNode = this.node;
            }
            if(_scaleNum != null){
                this[nameStr].setScale(_scaleNum);
            }
            _parentNode.addChild(this[nameStr]);
            if(nameStr == "roler1"){
                this[nameStr].setScaleX(-0.8);
            }
            this[nameStr].setAnchorPoint(0.5,0.5);
        }else{
            this[nameStr].setVisible(true);
        }
        if(pos){
            this[nameStr].setPosition(pos);
        }
        this[nameStr].setAnimation(0,_animation,_loop);
    },

    updateTime:function(dt){
        var curTime = this.overTime - parseInt(new Date().getTime());
        this.curTime = Math.ceil(curTime/1000);
        this.time.setString(this.curTime < 10 ? "0" + this.curTime : this.curTime);
        if(this.curTime <= 0){
            this.clock.setVisible(false);
        }

        if(this.timer > 0 && !this.hasSend && this.mod_pdk.begin){
            this.timer -= dt;
        }
        if(this.timer <= 0 && this.mod_pdk.begin){
            if(!this.hasSend){
                this.mod_pdk.sendCard([]);
                this.btn_buchu.setVisible(false);
                this.outControlLayer.setVisible(false);
                this.hasSend = true;
            }
        }
    },
});
