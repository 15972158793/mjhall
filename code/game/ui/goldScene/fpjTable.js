gameclass.fpjTable = gameclass.baseui.extend({
    node:null,
    cardPos:null,
    beishu:null,
    cardList:null,
    saveList:null,
    changeList:null,
    gameBegin:false,
    isEnd:false,
    mygold:-1,

    isFP:false,     //! 是否翻牌
    curCard:null,   //! 当前牌
    curScale:1.3,       //! 当前大小
    curTexture:"",    //! 当前贴图
    curState:false,

    ishuan:false,
    isdouble:false,
    isoffline:false,

    isfanpai:false,

    templist:null,


    ctor: function () {
        this._super();
        this.changeList = [];
        this.saveList = [];
        this.cardList = [];
        this.cardPos = [];
        this.templist= [];
        //this.mygold=0;
        this.beishu = [100,50,30,20,10,5,5,3,2,1];
    },

    show:function(){
        this.node = this.game.uimgr.createnode(res.fpjTable,true);
        this.addChild(this.node);

        var _this=this;
        //! 牌资源
        cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist1);
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist2);
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist3);

        //牌的图层
        this.cardLayer = new cc.Node();
        this.cardLayer.setPosition(0,0);
        this.node.addChild(this.cardLayer,0);

        //! 控件
        this.btn_reduce = ccui.helper.seekWidgetByName(this.node,"btn_reduce");
        this.btn_add = ccui.helper.seekWidgetByName(this.node,"btn_add");
        this.btn_double = ccui.helper.seekWidgetByName(this.node,"btn_double");
        this.btn_change = ccui.helper.seekWidgetByName(this.node,"btn_change");
        this.btn_open = ccui.helper.seekWidgetByName(this.node,"btn_open");
        this.btn_end = ccui.helper.seekWidgetByName(this.node,"btn_end");
        this.myMoneyText = ccui.helper.seekWidgetByName(this.node,"gold");
        this.Text_yafen = ccui.helper.seekWidgetByName(this.node,"Text_yafen");
        this.Text_win = ccui.helper.seekWidgetByName(this.node,"Text_win");
        this.Text_need = ccui.helper.seekWidgetByName(this.node,"Text_need");

        //mod_sound.playeffect(g_music[""],true);
        mod_sound.playbmg(g_music["fpjbem"],true);
        for (var i = 0;i < 5;i++){
            this.cardPos[i] = ccui.helper.seekWidgetByName(this.node,"Node_"+(i+1)).getPosition();
        }

        for (var i = 0;i < 5;i++){
            var btn=ccui.helper.seekWidgetByName(this.node,"Button_"+(i+1));
            btn.getChildren()[0].setVisible(false);
            btn.setTag(100+i);
            btn.addTouchEventListener(function(sender,type){
                if (_this.isfanpai==true){
                    return;
                }
                if(type != ccui.Widget.TOUCH_ENDED) return;
                if (!_this.gameBegin){
                    return;
                }
                if(_this.isWin){
                    return;
                }
                if(_this.saveList[sender.getTag()-100]==0){
                    var save=ccui.helper.seekWidgetByName(_this.cardLayer.getChildren()[sender.getTag()-100],"save");
                    if (save){
                        save.setVisible(true);
                    }
                    _this.saveList[sender.getTag()-100]=_this.cardList[sender.getTag()-100];
                }else{
                    //sender.getChildren()[0].setVisible(false);
                    var save=ccui.helper.seekWidgetByName(_this.cardLayer.getChildren()[sender.getTag()-100],"save");
                    if (save){
                        save.setVisible(false);
                    }
                    _this.saveList[sender.getTag()-100]=0;
                }
                cc.log("chairnode..................................111", _this.saveList);
            });
        }

        //! 初始化事件
        gameclass.createbtnpress( this.node, "btn_reduce", function () {
            if (_this.isfanpai==true){
                return;
            }
            var bet=_this.Text_yafen.getString();
            if (bet>100){
                bet=bet*1-100;
                _this.updatebeishu(bet);
                _this.btn_add.setBright(true);
                _this.btn_add.setTouchEnabled(_this.btn_add.isBright());
            }else{
                _this.btn_reduce.setBright(false);
                _this.btn_reduce.setTouchEnabled(_this.btn_reduce.isBright());
                //gameclass.showText("请输入100的整数倍！");
            }
            _this.Text_yafen.setString(bet);
        });

        gameclass.createbtnpress( this.node, "btn_add", function () {
            if (_this.isfanpai==true){
                return;
            }
            var bet=_this.Text_yafen.getString();
            if (bet<1000){
                bet=bet*1+100;
                _this.updatebeishu(bet);
                _this.btn_reduce.setBright(true);
                _this.btn_reduce.setTouchEnabled(_this.btn_reduce.isBright());
            }else{
                _this.btn_add.setBright(false);
                _this.btn_add.setTouchEnabled(_this.btn_add.isBright());
            }
            _this.Text_yafen.setString(bet);
        });

        gameclass.createbtnpress( this.node, "btn_change", function () {
            if (_this.isfanpai==true){
                return;
            }
            if (!_this.gameBegin){
                return
            }
            _this.changeList=[];
            var num=0;
            for(var i = 0;i <_this.saveList.length;i++){
                if(_this.saveList[i]==0){
                    _this.changeList[num]=_this.cardList[i];
                    num++
                }
            }

            _this.btn_end.setVisible(false);
            var bet=_this.Text_yafen.getString();
            _this.mod_fpj.sendChange(bet*1,_this.changeList);
        });

        gameclass.createbtnpress( this.node, "btn_end", function () {
            if (_this.isfanpai==true){
                return;
            }
            if(_this.btn_change.isVisible()){
                var card=[];
                _this.mod_fpj.sendChange(100,card);
            }

            if (_this.btn_double.isVisible()){
                _this.mod_fpj.sendDouble(0);
            }

            _this.isEnd=true;
            _this.isoffline=false;
            _this.refBtn(11);
            _this.game.uimgr.closeui("fpjDoubleUi");
        });

        gameclass.createbtnpress( this.node, "btn_open", function () {
            if (_this.isfanpai==true){
                return;
            }
            var bet=_this.Text_yafen.getString();
            _this.mod_fpj.sendBets(bet*1);
        });

        gameclass.createbtnpress(this.node, "btn_double", function () {
            if (_this.isfanpai==true){
                return;
            }
            _this.btn_end.setVisible(false);
            _this.game.uimgr.showui("fpjDoubleUi");
            _this.game.uimgr.uis["fpjDoubleUi"].setBaseInfo(_this.mod_fpj);
        });

        gameclass.createbtnpress(this.node, "btn_help", function () {
            if (_this.isfanpai==true){
                return;
            }
            _this.game.uimgr.showui("fpjHelpUi");
        });

        gameclass.createbtnpress(this.node, "btn_exit", function () {
            if (_this.isfanpai==true){
                return;
            }
            _this.game.uimgr.showui("gameclass.msgboxui");
            var strmsg = "是否想要退出游戏？";
            _this.game.uimgr.uis["gameclass.msgboxui"].setString(strmsg,function(){
                _this.mod_fpj.dissmissroom();
            });
        });
    },

    setmod: function (mod_game) {
        this.mod_fpj = mod_game;
        this.mod_fpj.bindUi(this);
    },

    updateroominfo:function(data){
        this.gameType = this.mod_fpj.roominfo.type;

        var _this = this;
        this.initMyInfo(data);

        this.initCard();
        this.gameBegin = data.begin;
        if (data.begin==true){
            this.isoffline=true;
            this.ishuan=data.ishuan;
            this.isdouble=data.isdouble;
            this.onGameBegin(data)
        }else if(data.begin==false){
            this.refBtn(1);
        }
    },

    initMyInfo:function(data){
        this.myMoneyText.setString(data.person.total);
        this.Text_yafen.setString(data.bet);
        this.Text_win.setString(0);

        this.btn_reduce.setBright((data.bet/100)>1);
        this.btn_reduce.setTouchEnabled(this.btn_reduce.isBright());

        this.btn_add.setBright((data.bet/100)<10);
        this.btn_add.setTouchEnabled(this.btn_add.isBright());
        this.updatebeishu(data.bet);

        this.myMoneyText.ignoreContentAdaptWithSize(true);
    },

    initCard:function(){
        this.cardLayer.removeAllChildren();
        for (var i=0;i<this.cardPos.length;i++){
            var cardback = this.crateBtnCard();
            cardback.setPosition(this.cardPos[i]);
            cardback.setTag(100+i);
            cardback.setScale(1.3);
            this.cardLayer.addChild(cardback);
        }
    },

    onGameBegin:function(data){
        var _this=this;
        this.gameBegin = true;
        this.isEnd=false;

        this.btn_add.setBright(false);
        this.btn_add.setTouchEnabled(this.btn_add.isBright());
        this.btn_reduce.setBright(false);
        this.btn_reduce.setTouchEnabled(this.btn_reduce.isBright());
        this.btn_open.setVisible(false);

        // this.doublenum = data.doublenum;
        // this.isdouble = data.isdouble;
        // this.ishuan = data.ishuan;
        for (var i=0;i<this.cardPos.length;i++) {
            var btn=ccui.helper.seekWidgetByName(this.node,"Button_"+(i+1));
            btn.getChildren()[0].setVisible(false);
            this.cardList[i] = data.result[i];
            this.saveList[i] = 0;
        }


        this.isfanpai=true;
        this.showCard(data.result);

        this.node.scheduleOnce(function() {
            //! 0-没有奖 1-10以上对子 2-两对 3-三条 4-顺子 5-同花 6-葫芦 7-四条 8-同花顺 9-同花大顺 10-五条
            if(data.cardtype>0){
                if(data.cardtype<10){
                    mod_sound.playbmg(g_music["fpjsound"+data.cardtype],false);
                    //mod_sound.playbmg(g_music["fpjwinMuisc"],false);
                }

                _this.isWin=true;
                _this.game.uimgr.showui("fpjWinUi");
                _this.game.uimgr.uis["fpjWinUi"].setBaseInfo(data.cardtype,data.result);
                _this.refBtn(5);
            } else if(_this.isdouble==true){
                _this.isWin=true;
                _this.refBtn(5);
            } else {
                _this.isWin=false;

                _this.refBtn(6);
            }

            _this.btn_end.setVisible(true);
            _this.reflashMyMoeny(data);
            _this.isfanpai=false;
        },1.5);
    },

    updateHandcard:function(data){
        var _this=this;
        var temp=[];
        for (var i=0;i<this.saveList.length;i++){
            temp[i]=this.saveList[i];
        }
        for (var i=0;i<this.cardPos.length;i++){
            this.cardList[i] = data.result[i];
            this.saveList[i]=0;
        }

        for (var i=0;i<this.cardLayer.getChildrenCount();i++){
            ccui.helper.seekWidgetByName(this.cardLayer.getChildren()[i],"save").setVisible(false);
        }

        this.isfanpai=true;
        this.showCard(data.result,temp);

        this.node.scheduleOnce(function() {
            //! 0-没有奖 1-10以上对子 2-两对 3-三条 4-顺子 5-同花 6-葫芦 7-四条 8-同花顺 9-同花大顺 10-五条
            if(data.cardtype>0){
                if(data.cardtype<10){
                    mod_sound.playbmg(g_music["fpjsound"+data.cardtype],false);
                    //mod_sound.playbmg(g_music["fpjwinMuisc"],false);
                }
                _this.isWin=true;
                _this.game.uimgr.showui("fpjWinUi");
                _this.game.uimgr.uis["fpjWinUi"].setBaseInfo(data.cardtype,data.result);
                _this.refBtn(9);
            }else {
                _this.isWin=false;

                _this.refBtn(10);
            }

            _this.reflashMyMoeny(data);
            _this.isfanpai=false;
        },1.5);
    },

    handledouble:function(data){
        this.reflashMyMoeny(data);
        this.game.uimgr.uis["fpjDoubleUi"].updateInfo(data);

        this.refBtn(4);
    },

    getCardUrlByNum:function (card) {
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
    },

    updatebeishu:function(bet){
        for (var i = 0;i < 10;i++){
            ccui.helper.seekWidgetByName(this.node,"Panel_1").getChildren()[i].setString(bet*this.beishu[i]);
        }
    },

    showCard:function (cardarr,templist) {
        this.refBtn(12);
        if (templist){
            //! 换牌
            for (var i=0;i< templist.length;i++){
                if(templist[i]==0){
                    this.openPokerAction(this.cardLayer.getChildren()[i],this.getCardUrlByNum(cardarr[i]),templist);
                    break;
                }
            }
        }else {
            //! 开牌
            this.openPokerAction(this.cardLayer.getChildren()[0],this.getCardUrlByNum(cardarr[0]));
        }
    },
    openPokerAction:function (card,texture,templist) {
        if(!card)return;
        this.templist=templist;
        var scaleXIndex=1.3;
        // var offset=0.15;
        //var _pos=card.getPosition();
        card.setScale(scaleXIndex,1.3);
        var _this = this;
        this.isFP = true;
        this.curCard = card;
        this.curScale = 1.3;
        this.curTexture = texture;
        this.curState = false;
        this.schedule(this.FPCallBack, 0.015);
        // var callBack=function(){
        //     scaleXIndex-=offset;
        //     card.setScale(scaleXIndex,1.3);
        //     if(Math.abs(scaleXIndex-0)<offset){
        //         offset=-offset;
        //         card.loadTextures(texture,texture,texture,ccui.Widget.PLIST_TEXTURE);
        //     }
        // }
        // card.schedule(callBack,0.0015);
    },

    FPCallBack:function (dt) {
        if(!this.isFP) {
            return;
        }

        cc.log("11111");

        var offset=0.15;
        this.curScale += (this.curState ? 1 : -1) * offset;
        if(this.curScale <= 0) {
            this.curCard.loadTextures(this.curTexture, this.curTexture, this.curTexture, ccui.Widget.PLIST_TEXTURE);
            this.curScale = -this.curScale;
            this.curState = true;
        }
        this.curCard.setScale(this.curScale,1.3);
        if(this.curScale >= 1.3){
            this.curCard.setScale(1.3,1.3);
            //this.curCard.setPosition(_pos);
            this.curCard.removeAllChildren();
            var spSave = new cc.Sprite(res.fpjsave);
            spSave.setAnchorPoint(1,1);
            spSave.setPosition(86,116.5);
            spSave.setName("save");
            spSave.setVisible(false);
            spSave.setLocalZOrder(999);
            this.curCard.addChild(spSave);

            this.isFP = false;

            var _this = this;
            _this.scheduleOnce(function(){
                if (_this.templist){
                    if(_this.curCard.getTag() == 100 ) {
                        if (_this.templist[1]==0){
                            _this.openPokerAction(_this.cardLayer.getChildren()[1],_this.getCardUrlByNum(_this.cardList[1]),_this.templist);
                        }else if(_this.templist[2]==0){
                            _this.openPokerAction(_this.cardLayer.getChildren()[2],_this.getCardUrlByNum(_this.cardList[2]),_this.templist);
                        }else if(_this.templist[3]==0){
                            _this.openPokerAction(_this.cardLayer.getChildren()[3],_this.getCardUrlByNum(_this.cardList[3]),_this.templist);
                        }else if(_this.templist[4]==0){
                            _this.openPokerAction(_this.cardLayer.getChildren()[4],_this.getCardUrlByNum(_this.cardList[4]));
                        }
                    } else if(_this.curCard.getTag() == 101 ){
                        if(_this.templist[2]==0){
                            _this.openPokerAction(_this.cardLayer.getChildren()[2],_this.getCardUrlByNum(_this.cardList[2]),_this.templist);
                        }else if(_this.templist[3]==0){
                            _this.openPokerAction(_this.cardLayer.getChildren()[3],_this.getCardUrlByNum(_this.cardList[3]),_this.templist);
                        }else if(_this.templist[4]==0){
                            _this.openPokerAction(_this.cardLayer.getChildren()[4],_this.getCardUrlByNum(_this.cardList[4]));
                        }
                    } else if(_this.curCard.getTag() == 102 ){
                        if(_this.templist[3]==0){
                            _this.openPokerAction(_this.cardLayer.getChildren()[3],_this.getCardUrlByNum(_this.cardList[3]),_this.templist);
                        }else if(_this.templist[4]==0){
                            _this.openPokerAction(_this.cardLayer.getChildren()[4],_this.getCardUrlByNum(_this.cardList[4]));
                        }
                    } else if(_this.curCard.getTag() == 103 && _this.templist[4]==0){
                        _this.openPokerAction(_this.cardLayer.getChildren()[4],_this.getCardUrlByNum(_this.cardList[4]));
                    }
                }else {
                    if(_this.curCard.getTag() == 100) {
                        _this.openPokerAction(_this.cardLayer.getChildren()[1],_this.getCardUrlByNum(_this.cardList[1]));
                    } else if(_this.curCard.getTag() == 101){
                        _this.openPokerAction(_this.cardLayer.getChildren()[2],_this.getCardUrlByNum(_this.cardList[2]));
                    } else if(_this.curCard.getTag() == 102){
                        _this.openPokerAction(_this.cardLayer.getChildren()[3],_this.getCardUrlByNum(_this.cardList[3]));
                    } else if(_this.curCard.getTag() == 103){
                        _this.openPokerAction(_this.cardLayer.getChildren()[4],_this.getCardUrlByNum(_this.cardList[4]));
                    }
                }
            }, 0.001);
        }
    },

    crateBtnCard:function (card) {
        var abcd = ["a","d","b","c"];
        var point = Math.floor(card/10);
        var type = card%10;
        cc.log("======88==point,type",point,type)
        var sprButton = null;
        if (!card||card<0){
            sprButton = new ccui.Button(res.pokerBei,res.pokerBei,res.pokerBei);
            sprButton.setTouchEnabled(false);
        } else if(card==1000){
            var pngPath = "card_joker_gray.png";
            sprButton = new ccui.Button(pngPath,pngPath,pngPath,ccui.Widget.PLIST_TEXTURE);
            sprButton.setTouchEnabled(true);
        } else if(card==2000){
            var pngPath = "card_joker.png";
            sprButton = new ccui.Button(pngPath,pngPath,pngPath,ccui.Widget.PLIST_TEXTURE);
            sprButton.setTouchEnabled(true);
        } else{
            var pngPath = "card_" + point +  abcd[type - 1]+ ".png";
            sprButton = new ccui.Button(pngPath,pngPath,pngPath,ccui.Widget.PLIST_TEXTURE);
            sprButton.setTouchEnabled(true);
        }
        sprButton.setAnchorPoint(0.5,0.5);
        return sprButton;
    },

    onEnd:function(data){
        this.gameBegin = false;
        this.isWin=false;

        this.refBtn(7);
        this.mygold = data.total;
        if(this.isEnd) {
            this.endMyMoney();
        }
    },

    reflashMyMoeny:function(data){
        if (data.total){
            this.myMoneyText.setString(data.total);
            this.mygold=data.total;
        }

        if (data.curbet){
            this.Text_win.setString(data.curbet);
        }else {
            this.Text_win.setString(0);
        }
    },

    endMyMoney:function () {
        if(this.mygold == -1) {
            return;
        }

        this.myMoneyText.setString(this.mygold);
        this.Text_win.setString(0);
        this.mygold = -1;
    },

    refBtn:function(type){
        var _this=this;
        //! 进房间
        if (type==1){
            this.btn_open.setVisible(true);
            this.btn_change.setVisible(false);
            this.Text_need.ignoreContentAdaptWithSize(true);
            this.Text_need.setVisible(false);
            this.btn_end.setVisible(false);
            this.btn_double.setVisible(false);

        } else if(type==4){//! 加倍后
            this.btn_double.setVisible(false);
        }else if(type==5){//! begin后中奖
            this.btn_change.setVisible(false);
            this.Text_need.setVisible(false);
            if(this.isoffline==true){
                if(this.isdouble==true){
                    this.btn_double.setVisible(true);
                }else {
                    this.btn_double.setVisible(false);
                }
            }else {
                this.btn_double.setVisible(true);
            }
            this.isdouble=false;

        }else if(type==6){//! begin后未中奖
            if(this.isoffline==true){
                if(this.ishuan==true){
                    this.btn_change.setVisible(true);
                    this.Text_need.setString("消耗:"+this.Text_yafen.getString()+"金币")
                    this.Text_need.setVisible(true);
                }else {
                    this.btn_change.setVisible(false);
                    this.Text_need.setString("消耗:"+this.Text_yafen.getString()+"金币")
                    this.Text_need.setVisible(false);
                }
            }else {
                this.btn_change.setVisible(true);
                this.Text_need.setString("消耗:"+this.Text_yafen.getString()+"金币")
                this.Text_need.setVisible(true);
            }

            this.btn_double.setVisible(false);
            this.ishuan=false;


        }else if(type==7){//! end以后
            this.btn_change.setVisible(false);
            this.btn_double.setVisible(false);
            if(!this.isEnd){
                this.btn_end.setVisible(true);
                this.btn_open.setVisible(false);
            }
            this.Text_need.setVisible(false);

            // this.node.scheduleOnce(function() {
            //     _this.initCard();
            // },0.5);

        }else if(type==9){//! 换牌后中奖
            this.btn_open.setVisible(false);
            this.btn_end.setVisible(true);
            this.btn_change.setVisible(false);
            this.btn_double.setVisible(true);
            this.Text_need.setVisible(false);
        }else if(type==10){//! 换牌后未中奖
            //this.btn_open.setVisible(true);
            this.btn_end.setVisible(true);
            this.btn_change.setVisible(false);
            this.btn_double.setVisible(false);
            this.Text_need.setVisible(false);

            // this.node.scheduleOnce(function() {
            //     _this.initCard();
            // },1);
        }else if(type==11){//! 手动end
            this.btn_end.setVisible(false);
            this.btn_open.setVisible(true);

            this.btn_add.setBright(true);
            this.btn_add.setTouchEnabled(this.btn_add.isBright());
            this.btn_reduce.setBright(true);
            this.btn_reduce.setTouchEnabled(this.btn_reduce.isBright());

            this.initCard();
            this.endMyMoney();
        }else if(type==12){
            this.Text_need.setVisible(false);
            this.btn_double.setVisible(false);
            this.btn_change.setVisible(false);
            this.btn_open.setVisible(false);
            this.btn_end.setVisible(false);
        }
    },

    destroy:function() {
        cc.audioEngine.stopAllEffects();
    },
});

//! 加倍ui
var fpjDoubleUi = gameclass.baseui.extend({
    ctor: function () {
        this._super();
    },

    show: function () {
        this.node = this.game.uimgr.createnode(res.fpjDouble, true);
        this.addChild(this.node);

        this.isbig=0;
        var _this = this;
        cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist1);
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist2);
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist3);

        this.Img_win = ccui.helper.seekWidgetByName(this.node,"Image_win");
        this.Img_lose = ccui.helper.seekWidgetByName(this.node,"Image_lose");
        this.btn_big = ccui.helper.seekWidgetByName(this.node,"btn_big");
        this.btn_small = ccui.helper.seekWidgetByName(this.node,"btn_small");

        this.Img_win.setVisible(false);
        this.Img_lose.setVisible(false);

        gameclass.createbtnpress( this.node, "btn_exit", function () {
            //_this.mod.sendDouble(0);
            _this.mod.view.btn_end.setVisible(true);
            _this.game.uimgr.closeui("fpjDoubleUi");
        });

        gameclass.createbtnpress( this.node, "btn_big", function () {
            _this.mod.sendDouble(2);
            _this.isbig=2;
            _this.btn_big.setBright(false);
            _this.btn_big.setTouchEnabled(_this.btn_big.isBright());
            _this.btn_small.setBright(false);
            _this.btn_small.setTouchEnabled(_this.btn_small.isBright());
        });

        gameclass.createbtnpress( this.node, "btn_small", function () {
            _this.mod.sendDouble(1);
            _this.isbig=1;
            _this.btn_big.setBright(false);
            _this.btn_big.setTouchEnabled(_this.btn_big.isBright());
            _this.btn_small.setBright(false);
            _this.btn_small.setTouchEnabled(_this.btn_small.isBright());
        });
    },

    setBaseInfo:function(mod){
        this.mod=mod;
    },

    updateInfo:function(data){
        var _this=this;
        ccui.helper.seekWidgetByName(this.node,"Image_1").loadTexture(_this.getCardUrlByNum(data.card),ccui.Widget.PLIST_TEXTURE);
        if (Math.floor(data.card/10)==200 || Math.floor(data.card/10)==100){
            this.Img_win.setVisible(true);
        }else if(((Math.floor(data.card/10)>8 || Math.floor(data.card/10)==1) && this.isbig==2) || (Math.floor(data.card/10)<=8 && Math.floor(data.card/10)!=1 && this.isbig==1)){
            this.Img_win.setVisible(true);
        }else if((Math.floor(data.card/10)<=8 && Math.floor(data.card/10)!=1 && this.isbig==2) || ((Math.floor(data.card/10)>8 || Math.floor(data.card/10)==1) && this.isbig==1)){
            this.Img_lose.setVisible(true);
        }

        // this.node.scheduleOnce(function() {
        //     _this.game.uimgr.closeui("fpjDoubleUi");
        // },1);
    },

    getCardUrlByNum:function (card) {
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
    },

});

//! 帮助ui
var fpjHelpUi = gameclass.baseui.extend({
    ctor: function () {
        this._super();
    },

    show: function () {
        this.node = this.game.uimgr.createnode(res.fpjHelp, true);
        this.addChild(this.node);

        var _this = this;
        gameclass.createbtnpress( this.node, "btn_exit", function () {
            _this.game.uimgr.closeui("fpjHelpUi");
        });
    },

    setBaseInfo:function(data){
        //var _this = this
    },
});

//! 加倍ui
var fpjWinUi = gameclass.baseui.extend({
    ctor: function () {
        this._super();
    },

    show: function () {
        this.node = this.game.uimgr.createnode(res.fpjWin, true);
        this.addChild(this.node);

        var _this = this;
        cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist1);
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist2);
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist3);

        gameclass.createbtnpress( this.node, "Button_1", function () {
            _this.game.uimgr.closeui("fpjWinUi");
        });
    },

    setBaseInfo:function(type,card){
        var _this = this;
        ccui.helper.seekWidgetByName(this.node,"Image_7").loadTexture(res["fpjType"+type],ccui.Widget.LOCAL_TEXTURE);
        ccui.helper.seekWidgetByName(this.node,"Image_7").ignoreContentAdaptWithSize(true);

        for(var i = 0;i < 5;i++){
            ccui.helper.seekWidgetByName(this.node,"Image_"+(i+2)).loadTexture(_this.getCardUrlByNum(card[i]),ccui.Widget.PLIST_TEXTURE);
        }
    },

    getCardUrlByNum:function (card) {
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
    },
});

