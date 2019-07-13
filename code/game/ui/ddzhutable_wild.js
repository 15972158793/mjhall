/**
 * Created by Administrator on 2017/2/22 0022.
 */
gameclass.ddzhutable_wild = gameclass.ddzhutable.extend({
    wildCard:null,
    selLayer:null,
    selBtn_OK:null,
    selBtn_Cancel:null,
    selCardScroll:null,
    virtualbefCard:null,
    fiveBoom:null,
    tipsCard:null,
    absCards:null,
    lastCards:null,
    useRazz:0,
    setmod: function (_mod) {
        this._super(_mod);
        this.tipsCard = new gameclass.tool_wildcardType();
        this.selLayer = ccui.helper.seekWidgetByName(this.node, "selLayer");
        this.selCardScroll = ccui.helper.seekWidgetByName(this.selLayer, "selcardscroll");
        cc.log(this.selCardScroll);
        this.selBtn_Cancel = ccui.helper.seekWidgetByName(this.selLayer, "selcardcancel");
        this.selBtn_OK = ccui.helper.seekWidgetByName(this.selLayer, "selcardok");
        this.bindEvent();
    },
    bindEvent:function(){
        var _this = this;
        this.selBtn_OK.addTouchEventListener(function(sender,type){
            if(type == ccui.Widget.TOUCH_ENDED){
                _this.onSelOk();
            }
        });
        this.selBtn_Cancel.addTouchEventListener(function(sender,type){
            if(type == ccui.Widget.TOUCH_ENDED){
                _this.onSelCancel();
            }
        });
    },
    onSelCancel:function(){
        this.selCardScroll.removeAllChildren();
        this.selLayer.setVisible(false);
    },
    onSelOk:function(){
        if(!this.preAbsCard){
            return true;
        }
        var tmpeabscard = [];
        cc.each(this.preAbsCard,function(o,i){
            tmpeabscard[i] = o.id;
        });
        this.mod_ddzhu.gamesteps_wild(this.willSendCard,tmpeabscard);
        this.onSelCancel();
    },
    onDDZgamedealer:function (DZcard,DZuid,rezz,noadd) {
        this._super(DZcard,DZuid,rezz,noadd);
        this.wildCard = rezz;
        this.createWildAction(this.wildCard);
    },
    createWildAction:function (_wildCard) {
        var _this = this;
        var wildBg = new cc.Sprite(res.img_laizi_bg);
        wildBg.setPosition(cc.winSize.width / 2 , cc.winSize.height / 2 + 100);
        wildBg.setTag(11110);
        _this.addChild(wildBg);
        var mySprite1 = new cc.Sprite(res.pokerBei);
        mySprite1.setPosition(wildBg.getContentSize().width / 2 , wildBg.getContentSize().height / 2 - 50);
        mySprite1.setScale(0.0);
        wildBg.addChild(mySprite1);

        var openCard = cc.callFunc(function () {
            var wildArr =[];
            wildArr[0] =  parseInt(_wildCard+"1");
            var wildCard = _this.transCardtoNum(wildArr);
            var spr = _this.createCardUI(wildCard[0].card, wildCard[0].type);
            spr.setPosition(mySprite1.getContentSize().width / 2, mySprite1.getContentSize().height / 2);
            mySprite1.addChild(spr);

        });

        var destroyCard = cc.callFunc(function () {
            _this.removeChildByTag(11110);
        });
        var reCreateCard = cc.callFunc(function () {
            var wildArr =[];
            wildArr[0] =  parseInt(_wildCard+"1");
            var wildCard = _this.transCardtoNum(wildArr);
            var spr = _this.createCardUI(wildCard[0].card, wildCard[0].type);
            spr.setScale(0.45);
            spr.setPosition(_this.laidipaiKuang.getContentSize().width/2, _this.laidipaiKuang.getContentSize().height / 2);
            _this.laidipaiKuang.addChild(spr);

            var rogueTag = new cc.Sprite(res.rogue);
            rogueTag.setPosition(20 , 65);
            rogueTag.setScale(0.8);
            spr.addChild(rogueTag);
            _this.updateHandCardUI();
        });
        var scaleTo = cc.scaleTo(1.0, 1.0);
        var rotateTo = cc.rotateTo(1.0 ,0);
        //var moveTo = cc.moveTo(1.5, cc.p(_this.dipaikuang.getPositionX() + mySprite1.getContentSize().width / 2 - 2,_this.dipaikuang.getPositionY()));
        mySprite1.runAction(cc.sequence(scaleTo,openCard,rotateTo,destroyCard,reCreateCard));
    },
    //找到癞子拿出来 和原来的数组组成新的数组
    sortWildCard : function(_cardArr){
        var wildIndex = 0;
        var cardArr = [];
        for(var i = 0;i<_cardArr.length;i++){
            var parescard = parseInt(_cardArr[i].id / 10);
            if(parescard == this.wildCard){
                _cardArr[i].wild = true;
                cardArr[cardArr.length] = _cardArr[i];
                _cardArr[i] = null;
                //_cardArr.splice(i,1);
            }else{
                _cardArr[i].wild = false;
            }
        }
        var cardConcat = cardArr.concat(_cardArr);
        var newArr = [];
        for(var i = 0;i< cardConcat.length;i++){
            if(cardConcat[i]){
                newArr[wildIndex] = cardConcat[i];
                wildIndex++;
            }
        }
        return newArr;
    },

    /*
     *  更新手牌UI
     * */

    updateHandCardUI : function (isMoveCard) {
        var _this = this;
        _this.willSendCard = [];
        var _cards = _this.sortWildCard(_this.handCard);
        cc.log(_cards);
        _this.handCard = _cards;

        _this.players[0].cards.removeAllChildren();
        for (var k = 0; k < _cards.length; k++) {
            var tmpCardData = _cards[k];
            var sp = _this.createCardUI(tmpCardData.card , tmpCardData.type);
            if(isMoveCard){
                /*sp.setPosition(_this.players[0].cards.getPositionX() -  cc.winSize.width + x, 0);
                sp.runAction(cc.moveBy(0.8, 50 * k, 0));*/

                sp.setPosition(0, 0);
                sp.runAction(cc.moveBy(0.8, -_cards.length * 25 + (50 * k) + 25, 0));
            }else{
                sp.setPosition(-_cards.length * 25 + (50 * k) + 25, 0);
            }
            sp.setTag(tmpCardData.id);
            sp.setScale(1.4);
            _this.players[0].cards.addChild(sp);
            if(tmpCardData.wild){
                var wildtag = new cc.Sprite(res.rogue);
                //roguetag.setPosition(roguetag.getContentSize().width / 2 ,sp.getContentSize().height -  roguetag.getContentSize().height);
                wildtag.setPosition(20 ,65);
                wildtag.setScale(0.8);
                sp.addChild(wildtag);
            }
        }
        _this.createMyEventListener();
        this.isFirstTips = true;
    },
    setScorelimit:function(limit){
        this.fiveBoom = limit==0? 0:1;

        this.fiveBoom = this.fiveBoom<0? 0:this.fiveBoom;

        var maxBoom = [5,5];

        this.maxBoom = maxBoom[this.fiveBoom];
    },
    countDifen:function(boom,bets){//1炸 底分1  3炸上限
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
        if(this.fiveBoom) {
            //追加计算
            difen += otherBoom * bets;
        }
        return difen;
    },
    // crateDZcard : function(cardarr) {
    //     for(var i = 0;i<3;i++) {
    //         var spr = cc.Sprite.create();
    //         spr = this.createCardUI(cardarr[i].card, cardarr[i].type);
    //         spr.setScale(0.45);
    //         spr.setPosition(this.dipaikuang.getContentSize().width / 2 + (28 * i) - 28,this.dipaikuang.getContentSize().height / 2);
    //         this.dipaikuang.addChild(spr);
    //     }
    // },
    //是否是硬炸
    hasWildCard:function(__cards){
        var bHas = false;
        cc.each(__cards,function(o,i){
            if(o == 14){
                o = 1;
            }else if(o == 15){
                o = 2;
            }
            if(o == this.wildCard){
                bHas = true;
                return false;
            }
        },this);
        return bHas;
    },
    isPass:function(__cards){
        var bHas = true;
        cc.each(__cards,function(o,i){
            if(parseInt(o/10) == this.wildCard){
                bHas = false;
                return false;
            }
        },this);
        return bHas;
    },
    passCard:function(){
        this.isFirstTips = true;
        var nullCard = [];
        this.mod_ddzhu.gamesteps_wild(nullCard,nullCard);
    },
    getBefWild:function(){
        var count = 0;
        cc.each(this.virtualbefCard,function(o,i){
            if(parseInt(o/10) == this.wildCard){
                count = 1;
            }
        },this);
        cc.log(count);
        return count;
    },
    getWildCount:function(){
        var count = 0;
        cc.each(this.virtualbefCard,function(o,i){
            if(parseInt(o/10) == this.wildCard){
                count ++;
            }
        },this);
        cc.log(count);
        return count;
    },
    btn_tishifunc:function(){
        var _this = this;
        cc.log("---------tishi--------");
        //cc.log("_this.savebefCard"+_this.savebefCard);
        if(_this.curStep != _this.mod_ddzhu.uid) {
            return;
        }

        //! 将原来的提示清理
        _this.willSendCard.length = 0;
        cc.each(_this.handCard , function(o,i){
            var target = _this.players[0].cards.getChildByTag(o.id);
            if(target.isup){
                target.setPositionY(target.getPositionY() - 20);
                target.isup = false;
            }
        });

        //! 复制手牌
        var copyhandcards = [];
        for(var i =  0;i < _this.handCard.length;i++) {
            copyhandcards[i] = _this.handCard[i].id;
        }

        if(_this.isFirstTips) {
            //! 复制上一家出的牌
            var befcards = [];
            if(_this.zhuangJia != _this.mod_ddzhu.uid){
                for(var i =  0;i < _this.savebefCard.length;i++) {
                    befcards[i] = _this.savebefCard[i];
                }
            }

            _this.absCards = [];
            _this.lastCards = _this.tipsCard.tipsCard(copyhandcards, befcards, _this.getBefWild(), _this.wildCard, _this.absCards);
            cc.log("_this.lastCards");
            cc.log(_this.lastCards);
            if(_this.lastCards.length == 0 || !_this.lastCards){
                //_this.passCard();
                _this.showToast("没有牌大过大家");
                return;
            }else{
                _this.isFirstTips = false;
            }
            this.useRazz = (_this.lastCards.toString() == _this.absCards.toString() ? 0 : 1);
        } else {
            //! 复制上一家出的牌
            var befcards = [];
            for(var i =  0;i < _this.absCards.length;i++) {
                if(_this.absCards[i] < 1000) {
                    befcards[i] = _this.absCards[i] * 10;
                } else {
                    befcards[i] = _this.absCards[i];
                }
            }
            _this.absCards = [];
            var tipscard = _this.tipsCard.tipsCard(copyhandcards, befcards, this.useRazz, _this.wildCard, _this.absCards);
            cc.log("_this.tipscard");
            cc.log(tipscard);
            if(tipscard.toString() == _this.lastCards.toString()) {
                _this.lastCards = [];
            } else {
                _this.lastCards = tipscard;
                this.useRazz = (_this.lastCards.toString() == _this.absCards.toString() ? 0 : 1);
            }
        }

        //! 出不了任何牌
        if(_this.lastCards.length == 0) {
            _this.isFirstTips = true;
            return;
        }

        _this.tipsSelectCards(_this.lastCards);

    },
    ongamebets : function(data,noadd){
        this._super(data,noadd);
        ccui.helper.seekWidgetByName(this.gamebets, "gamebets2").setVisible(false);
        this.gamebets.setPositionX(cc.winSize.width / 2 + 75);
    },
    //选中提示的牌
    tipsSelectCards:function(_tipscard){
        for(var i = 0; i < _tipscard.length; i++) {
            for(var j = 0; j < this.handCard.length; j++) {
                if(_tipscard[i] == 14) {
                    _tipscard[i] = 1;
                } else if(_tipscard[i] == 20) {
                    _tipscard[i] = 2;
                } else if(_tipscard[i] >= 1000) {
                    _tipscard[i] /= 10;
                }
                if(_tipscard[i] != parseInt(this.handCard[j].id / 10)) {
                    continue;
                }

                var target = this.players[0].cards.getChildByTag(this.handCard[j].id);
                if(target.isup) {
                    continue;
                }

                this.willSendCard.push(target.getTag());
                target.setPositionY(target.getPositionY() + 20);
                target.isup = true;
                break;
            }
        }
    },
    isObjectValueEqual:function (obj1, obj2) {
        if(obj1.type != obj2.type){
            return false;
        }
        var obja = this.tipsCard.transformToCardArr(obj1);
        var objb = this.tipsCard.transformToCardArr(obj2);
        if(obja.sort().toString() == objb.sort().toString() /*|| obj1.type == 5 || obj1.type == 6||obj1.type == 9 || obj1.type == 10||obj1.type == 12 || obj1.type == 13*/){
            return true;
        }
        cc.log(obja);
        cc.log(objb);
    },

    findMaxAndMin:function(objArr) {

        var arr = [];

        if (!cc.isArray(objArr)) {
            cc.log("xxxxxxxxxx");
            arr.push(objArr);
            return arr;
        }
        var type = objArr[0].type;

        switch (type) {
            case 7:
            case 8:
            case 11:
            case 12:
            case 13:
                objArr = objArr.sort(function (a, b) {
                    return a.value.max - b.value.max;
                });
                break;
            default:
                objArr = objArr.sort(function (a, b) {
                    return a.value - b.value;
                });
                break
        }
        cc.log(objArr);
        var minObj = objArr[0];
        var maxObj = objArr[objArr.length - 1];
        arr.push(maxObj);

        if((minObj.value || minObj.value === 0) &&  (maxObj.value || maxObj.value ===0) ){

            if(!cc.isObject(maxObj.value) && !cc.isObject(minObj.value) && minObj.value !== maxObj.value ){
                arr.push(minObj);
            }else if( minObj.value.max &&  maxObj.value.max && minObj.value.max !== maxObj.value.max){
                arr.push(minObj);
            }

        }

        return arr;

    },



    removeSame:function(objArr){

        var allArr = [];
        for(var i = 0;i<objArr.length;i++) {
            cc.log(objArr[i]);
            var temp = this.findMaxAndMin(objArr[i]);
            allArr = allArr.concat(temp);
        }

        return allArr;

    },
    btn_chupaifunc:function(){
        var _this = this;
        cc.log("curStep=="+_this.curStep);
        cc.log("_this.mod_ddzhu.uid=="+_this.mod_ddzhu.uid);
        cc.log("zhuangJia=="+_this.zhuangJia);
        if(_this.curStep != _this.mod_ddzhu.uid) {
            return;
        }
        cc.log("willSendCard" + this.willSendCard);
        _this.isFirstTips = true;
        //将牌转为 0 - 15
        var CheckCards = this.transMinCard(this.willSendCard);
        //是否可以拆王
        var chaiwang = _this.chaiWang(this.willSendCard);
        if(chaiwang) {
            _this.showToast("当前玩法不能拆王");
            return;
        }
        var ispass = this.isPass(this.willSendCard);
        if(_this.zhuangJia == this.mod_ddzhu.uid) {//庄家随意出牌
            //获得较大牌型
            var hitCard = _this.tipsCard.checkW(CheckCards, this.wildCard);
            cc.log("111111111111111");
            cc.log(hitCard);
            cc.log(hitCard.length);
            if (hitCard != 0) {
                //for(var i = 0;i<hitCard.length;i++){
                    hitCard = _this.removeSame(hitCard);
                    cc.log(hitCard);
                //}

                //没用癞子的情况下 直接出牌
                if(ispass){
                    _this.mod_ddzhu.gamesteps_wild(this.willSendCard,this.willSendCard);
                    return;
                }
                //获得较小牌型
                //var hitCard2 = _this.tipsCard_2.checkW(CheckCards, this.wildCard);
                //cc.log("222222222222222");
                //cc.log(hitCard2);
                //比较较大牌型和较小牌型，不相同则放进一个新的对象数组
                //hitCard = _this.removeSame(hitCard,hitCard2);
                //cc.log("333333333333333");
                //cc.log(hitCard);
                //匹配出多种牌型的情况下  列出来
                if (hitCard.length > 1) {
                    _this.showSelCard(hitCard);
                    return;
                }
                //只有一种牌 并带有癞子的情况下
                //类型转点数
                var cardpoint = _this.tipsCard.transformToCardArr(hitCard[0]);
                //点数转牌ID
                var Abscards = this.convertAbscards(cardpoint, this.willSendCard);
                _this.mod_ddzhu.gamesteps_wild(this.willSendCard, Abscards);
            }else{
                _this.showToast("牌型错误");
            }
        }else{//压牌
            //判断是否软硬炸
            var pressHasWild = this.hasWildCard(CheckCards);
            cc.log(pressHasWild);
            var befVirtualCard = this.transMinCard(this.virtualbefCard);
            cc.log(befVirtualCard);
            var befHasWild = this.hasWildCard(befVirtualCard);
            cc.log(befHasWild);
            var checkCards2 = this.transMinCard(this.savebefCard);
            var perssCard = _this.tipsCard.compareW(CheckCards,checkCards2,this.wildCard,pressHasWild,befHasWild);

            cc.log("perssCard");
            cc.log(perssCard);
            if (perssCard != 0) {
                if(ispass){
                    _this.mod_ddzhu.gamesteps_wild(this.willSendCard,this.willSendCard);
                    return;
                }
                perssCard = _this.removeSame(perssCard);
                cc.log(perssCard);
                //cc.log(perssCard);
                //var perssCard2 = _this.tipsCard_2.compareW(CheckCards, this.wildCard);
                //perssCard = _this.removeSame(hitCard,perssCard2);
                if (perssCard.length > 1) {
                    _this.showSelCard(perssCard);
                    return;
                }
                var cardpoint = _this.tipsCard.transformToCardArr(perssCard[0]);
                //点数转牌ID
                var Abscards = this.convertAbscards(cardpoint, this.willSendCard);
                _this.mod_ddzhu.gamesteps_wild(this.willSendCard, Abscards);
            }else{
                _this.showToast("牌型错误");
            }
        }

    },

    ongameddzstep:function (stepData,noadd) {
        var _this = this;
        cc.log("abscards="+stepData.abscards);
        cc.log("cards="+stepData.cards);
        cc.log("stepData.uid="+stepData.uid);
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
            if (_this.curStep == _this.players[i].data.uid)
                _this.players[i].outCards.removeAllChildren();
        }

        //判断压牌
        if( cc.isArray(stepData.abscards)){
            if(stepData.abscards.length > 0) {
                var CheckCards = _this.transMinCard(stepData.abscards);
                var hitCard = _this.tool_cardType.check(CheckCards);
                _this.playRes(hitCard.type, hitCard.value);
                _this.savebefCard = stepData.abscards;
                _this.virtualbefCard = stepData.cards;
                //庄家移位
                _this.zhuangJia = stepData.uid;
                //显示压的牌
                _this.updateHitOutcard(stepData.uid, stepData.abscards);
                if (!noadd) {
                    if (hitCard.type == 14 || hitCard.type == 4) {//14为火箭 4为炸弹
                        _this.curBoom++;
                        _this.difen = _this.countDifen(_this.curBoom, _this.bets);
                        _this.fsk_difen.setString("底分：" + _this.difen);
                    }
                }
            }else{
                if(!noadd) {
                    mod_sound.playeffect(g_music["Man_buyao"], false);
                    _this.updateHitOutcard(stepData.uid, stepData.abscards);
                }
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
    },
    /*
     * 跟新压牌的显示界面
     * */
    updateHitOutcard:function(zhuangjia_uid,_cards) {
        var befCard =_cards;
        //this.hitoutCardView.removeAllChildren();
        _cards = this.transCardtoAbs(befCard);
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
            var sp = this.createVirtualCardUI(tmpCardData.card , tmpCardData.type);
            if(befuid == 1){
                sp.setPosition(-_cards.length * 20 + (25 * i) + 20,0);
            }else if(befuid == 2){
                sp.setPosition(25 * i ,0);
            }else{
                sp.setPosition(-_cards.length * 20  / 2 + (25 * i),0);
            }
            sp.setScale(0.80);
            this.players[befuid].outCards.addChild(sp);
        }

    },
    transCardtoAbs:function ( _cards ) {
        var abcd = ["a","d","b","c","e"];
        var arr = [];
        for(var x =0;x< _cards.length ; x++){
            var point = Math.floor(_cards[x]/10);
            var type = _cards[x] % 10;
            if(point < 3){
                point+= 13;
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
    createVirtualCardUI:function (num,type) {

        if(type == "e"){
            var spr = this.createCardUI(num,"b");
            var wildtag = new cc.Sprite(res.rogue);
            //roguetag.setPosition(roguetag.getContentSize().width / 2 ,sp.getContentSize().height -  roguetag.getContentSize().height);
            wildtag.setPosition(20 ,65);
            wildtag.setScale(0.8);
            spr.addChild(wildtag);
            return spr;
        }else{
            return this.createCardUI(num,type);
        }

    },
    onSelCardTouch:function(sender,type){
        if(type !== ccui.Widget.TOUCH_ENDED){
            return;
        }
        cc.each(this.selCardScroll.getChildren(),function(o,i){
            o.removeBackGroundImage();
        });
        sender.setBackGroundImage("res/niuniuRes/selcell_bg.png");
        this.preAbsCard = sender.wildCard;

    },


    showSelCard:function(hitCard){
        this.preAbsCard = null;
        var convertAbscards = [];
        var row = 0;

        for (var i = 0; i < hitCard.length; i++) {
            if (i % 2 == 0) {
                row++;
            }
        }
        cc.log(this.selCardScroll);
        var scrollSize = this.selCardScroll.getContentSize();
        this.selCardScroll.setInnerContainerSize(cc.size(scrollSize.width,row * 100));//72为一张牌高度的0.6倍
        scrollSize = this.selCardScroll.getInnerContainerSize();
        row = 0;

        var sprWidth = 0, sprHeight = 0;
        for (var i = 0; i < hitCard.length; i++) {
            var cardtype = this.tipsCard.getCardTypeString(hitCard[i].type);
            var tmpeLayer = new ccui.Layout();
            tmpeLayer.setBackGroundImageScale9Enabled(true);
            if (i % 2 == 0) {
                row++;
            }
            var Abscards = this.tipsCard.transformToCardArr(hitCard[i]);
            //cc.log("Abscards" + Abscards);
            convertAbscards = this.convertAbscards(Abscards, this.willSendCard);
            var wildCard = this.transCardtoAbs(convertAbscards);

            for (var j = 0; j < wildCard.length; j++) {
                var spr = this.createVirtualCardUI(wildCard[j].card, wildCard[j].type);
                if (sprHeight == 0) {
                    sprHeight = spr.getContentSize().height * 0.6;
                    sprWidth = spr.getContentSize().width * 0.6;
                }
                spr.setAnchorPoint(0.0, 0.0);
                spr.setPosition(16 * j + 10, 10);
                spr.setScale(0.6);
                tmpeLayer.addChild(spr);
            }
            var arrLength = Abscards.length - 1;
            var tmpeLayerWidth = 16 * arrLength + sprWidth + 20;/*width + sprWidth + 10;*/
            tmpeLayer.wildCard = wildCard;
            tmpeLayer.setContentSize(tmpeLayerWidth/*(scrollSize.width - 100) / 2*/, sprHeight + 20);
            tmpeLayer.setPosition(i % 2 == 0 ? 50 : (scrollSize.width + 100) / 2, scrollSize.height - (sprHeight + 20) * row);
            tmpeLayer.setTouchEnabled(true);
            tmpeLayer.addTouchEventListener(this.onSelCardTouch.bind(this));

            var img_jiaobiao = new cc.Sprite(res.img_jiaobiao);
            img_jiaobiao.setPosition(img_jiaobiao.getContentSize().width / 2 + 10, img_jiaobiao.getContentSize().height / 2 + 10);
            //img_jiaobiao.setAnchorPoint(0, 0);
            tmpeLayer.addChild(img_jiaobiao);

            var ttf2 = new cc.LabelTTF(cardtype, "Arial", 20);
            ttf2.x = img_jiaobiao.getContentSize().width / 2;
            ttf2.y = img_jiaobiao.getContentSize().height / 2;
            //ttf2.setAnchorPoint(0.0, 0.0);
            img_jiaobiao.addChild(ttf2);
            this.selCardScroll.addChild(tmpeLayer);

            //cc.log(scroll);
        }


        //this.selLayer.setScale(1.2,1);
        this.selLayer.setVisible(true);
    },
    convertAbscards:function(abscards,selCard){
        //cc.log("abscards"+abscards);
        //cc.log("selCard"+selCard);
        var convertLast = [];
        for(var i = 0;i<abscards.length;i++){/*尾数5代表要标记为癞子的牌,这里除大小王外先 默认转为需要标记癞子*/
            if(abscards[i] == 11) {
                convertLast[i] = 15;
            }else if(abscards[i] == 12){
                convertLast[i] = 25;
            }else if(abscards[i] == 13) {
                convertLast[i] = 1000;
            }else if(abscards[i] == 14){
                convertLast[i] = 2000;
            }else{
                convertLast[i] = ((abscards[i] + 3) * 10 + 5);
            }
        }
        var tag = [];
        for(var i = 0;i<convertLast.length;i++){
            for(var j = 0;j<selCard.length;j++){/*用实数去匹配，如果相同，把标记的癞子牌替换*/
                if( tag.indexOf(j) < 0 && parseInt(convertLast[i]/10) == parseInt(selCard[j]/10) && parseInt(selCard[j]/10) != this.wildCard){
                    convertLast[i] = selCard[j];//(this.willSendCard[i]);
                    tag.push(j);
                    break;
                }
            }
        }
        //return [11,12,13,14,21,22,23,24,31,32,33,34,41,42,43,44,51,52,53,54];
        //cc.log("convertLast="+convertLast);
        return convertLast;
    },
    resetDDZNext:function(){
        this._super();
        this.removeChildByTag(11111);//删除癞子底牌
        this.wildCard = 0;
    },

});
