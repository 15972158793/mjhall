/**
 * Created by Administrator on 2017-11-15.
 */

gameclass.longhudouTable = gameclass.baseui.extend({
    node:null,
    chairNodeArr:null,
    btn_bets:null,
    btn_sendBets:null,
    selectBet:null,//当前选择的单注
    headNodeArr:null,
    zhankai:false,
    zhankai1:false,
    seatPlayer:null,
    isOnSeat:null,//自己是否在座位上
    showBetText:null,
    myBetText:null,
    everyBoxBet:null,
    everyMyBets:null,
    myGold:0,
    endSeatState:null,
    // isRefalshZhuang:false,
    talkPos:null,
    cardPos:null,
    cardLayer:null,
    // beautyNum:300000,
    gameBegin:false,
    //saveZhuangInfo:null,
    allWin:0,
    canBet:false,
    totalRecord:48,
    totalArea:3,

    ctor: function () {
        this._super();
        this.chairNodeArr = [];
        this.btn_bets = [];
        this.btn_sendBets = [];
        this.headNodeArr = [];
        this.seatPlayer = [];
        this.showBetText = [];
        this.myBetText = [];
        this.everyBoxBet = [];
        this.everyMyBets = [];
        this.endSeatState = [];
        this.selectBet = 0;
        // this.needZhuangMoney = 0;
        this.needSeatMoney = 0;
        this.talkPos = [];
        this.wanText = [];
        this.seziSp = [];
        this.cardPos = [];
        //每个格子里筹码的上限
        this.curChipNum = [];
        this.maxChipNum = [];
        for(var i = 0;i < 17;i++){
            if(i < 3){
                this.maxChipNum[i] = 50;
            }else{
                this.maxChipNum[i] = 30;
            }
            this.curChipNum[i] = 0;
        }
    },

    setmod: function (mod_game) {
        this.mod_lhd = mod_game;
        this.mod_lhd.bindUi(this);
        this.init();
    },

    show:function(){
        cc.spriteFrameCache.addSpriteFrames(res.chipPlist);
        cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
        this.node = this.game.uimgr.createnode(res.longhudou,true);
        this.addChild(this.node);
        this.batchSP = cc.SpriteBatchNode.create(res.chippng);
        this.node.addChild(this.batchSP);

        this.betsLayer = ccui.helper.seekWidgetByName(this.node,"betsLayer");

        this.node.scheduleUpdate();
        this.node.update= this.updateTime.bind(this);

        // this.clock = new sp.SkeletonAnimation(res.jsontouzhong, res.atlastouzhong);
        // this.clock.setAnchorPoint(0.5, 0.5);
        // this.clock.setPosition(485,930);
        // this.clock.setVisible(false);
        // this.node.addChild(this.clock);

        //牌的图层
        this.cardLayer = new cc.Node();
        this.cardLayer.setPosition(0,0);
        this.node.addChild(this.cardLayer,0);
        //大赢家头像
        this.winLayout = new ccui.Layout();
        this.winLayout.setAnchorPoint(0.5,0.5);
        this.winLayout.setPosition(320,1136/2);
        this.winLayout.setContentSize(357,302);
        this.winLayout.setVisible(false);
        this.win1 = new cc.Sprite(res.dayingjia);
        this.win1.setAnchorPoint(0.5,0.5);
        this.win1.setPosition(this.winLayout.width/2,this.winLayout.height/2);
        this.winLayout.addChild(this.win1);
        this.winerHead = new ccui.Layout();
        this.winerHead.setAnchorPoint(0.5,0.5);
        this.winerHead.setContentSize(152,135);
        this.winerHead.setPosition(163.7,175.7);
        this.winLayout.addChild(this.winerHead);
        this.node.addChild(this.winLayout);
        this.win2 = new sp.SkeletonAnimation(res.jsondayingjia02, res.atlasdayingjia02);
        this.win2.setAnchorPoint(0.5, 0.5);
        this.win2.setPosition(cc.p(165,150));
        this.winLayout.addChild(this.win2);
        this.winName = new cc.LabelTTF("游客","Arial",25);
        this.winName.setPosition(165,82);
        this.winName.setColor(cc.color(175,156,133));
        this.winLayout.addChild(this.winName);
        //豹子动画
        this.baoziAnim = new sp.SkeletonAnimation(res.jsonbaozi, res.atlasbaozi);
        this.baoziAnim.setPosition(1136/2,320);
        this.node.addChild(this.baoziAnim);
        this.baoziAnim.setVisible(false);

        this.start = ccui.helper.seekWidgetByName(this.node,"start");
        this.start.setVisible(false);
        this.startIMG = ccui.helper.seekWidgetByName(this.node,"startIMG");

        // this.zhong = ccui.helper.seekWidgetByName(this.node,"clock");
        // this.zhong.setVisible(true);

        this.trendList = ccui.helper.seekWidgetByName(this.node,"ListView_1");
        this.playerList = ccui.helper.seekWidgetByName(this.node,"wuzuo_list");
        this.resultNode = ccui.helper.seekWidgetByName(this.node,"resultNode");
        this.resultNode.setVisible(false);

        this.rankTool = new gameclass.mod_ranking();
        for(var i = 0;i < 9;i++){
            this.talkPos[i] = ccui.helper.seekWidgetByName(this.node,"talkposNode").getChildren()[i].getPosition();
        }
        for (var i = 0;i < 2;i++){
            this.cardPos[i] = ccui.helper.seekWidgetByName(this.node,"cardNode").getChildren()[i].getPosition();
        }
        this.btn_xuya = ccui.helper.seekWidgetByName(this.node,"btn_bets5");
        this.helpNode = ccui.helper.seekWidgetByName(this.node,"helpInfo");
        this.helpNode.setZOrder(10000)
        this.helpNode.setVisible(false);
        this.nextLayout = ccui.helper.seekWidgetByName(this.node,"nextLayout");
        this.nextLayout.setVisible(false);
        mod_sound.playbmg(g_music["lhdbgm"],true);
        this.maskChipLayer = ccui.helper.seekWidgetByName(this.node,"maskChipLayer");
        this.maskChipLayer.setVisible(false);

        // for(var i = 0;i < 3;i++){
        //     this.seziSp[i] = ccui.helper.seekWidgetByName(this.node,"sezi"+i);
        //     this.seziSp[i].setVisible(false);
        // }
    },

    init:function(){
        this._timeContain = ccui.helper.seekWidgetByName(this.node,"readyMovie");
        this._timerControl = new gameclass.timeTextControl(this._timeContain, res.goldTimeBar);
        this.myMoneyText = ccui.helper.seekWidgetByName(this.node,"gold");
        this.btn_shangzhuang = ccui.helper.seekWidgetByName(this.node,"btn_shangzhuang");
        this.btn_xiazhuang = ccui.helper.seekWidgetByName(this.node,"btn_xiazhuang");
        this.initShow();
    },

    getTime:function(time){
        this.overTime = parseInt(new Date().getTime()) + time*1000;
    },

    updateroominfo:function(data){
        this.gameType = this.mod_lhd.roominfo.type;
        cc.log("gametype = ",this.gameType);
        this.betsArr = [100,500,1000,5000,10000];

        //选择筹码按钮
        var _this = this;
        for(var i = 0;i < ccui.helper.seekWidgetByName(this.node,"clickLayer").getChildrenCount();i++){
            this.btn_bets[i] = ccui.helper.seekWidgetByName(this.node,"clickLayer").getChildren()[i];
            // if(i<=4){
            //     //var text = new cc.Sprite(res["bzwfen"+i]);
            //     var text = new cc.LabelTTF(this.betsArr[i],"Arial",25);
            //     text.setPosition(this.btn_bets[i].getContentSize().width/2,this.btn_bets[i].getContentSize().height/2);
            //     this.btn_bets[i].addChild(text);
            // }
            this.btn_bets[i].index = i;
            this.btn_bets[i].addTouchEventListener(function(sender,type){
                if(type != ccui.Widget.TOUCH_ENDED) return;
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                if(sender.index <= 4){
                    _this.selectBet = sender.index;
                    _this.setBetImg();//设置按钮可见度
                }else{//!续跟
                    if(!_this.canBet){
                        gameclass.showText("请等待下一局开始");
                        return;
                    }
                    _this.mod_lhd.sendLastBets();
                    sender.setEnabled(false);
                    sender.setBright(false);
                }
            })
        }

        this.myGold = data.total;//个人金币总量
        this.recordArr = [];
        this.changeRecordArr(data.trend);
        this.initMyInfo(data.total);
        this.setBetImg();
        this.initSeatInfo(data.info);
        /////////////////////////////////////tl del at 20180305///////////////////////
        //this.initZhuangInfo(data.dealer);
        // this.checkZhuangBTN(data.isdeal);
        ///////////////////////////////////////////////////////////////////////////////
        this.initRecord();
        this.initCard();
        this._timerControl.startCount(data.time);
        this.getTime(data.time);
        if(data.time <= 22){
            this.gameBegin = true;
            cc.log(data.bets);
            this.initTableBet(data.bets);
            //var acount = parseInt(data.time / 5);
            //this.playBetsMusic(acount);
        }else{
            this.gameBegin = false;
            //this.zhong.setVisible(false);
            this.nextLayout.setVisible(true);
        }
        this.canBet = (data.time <= 22);
        this.seatPlayer = data.info;
        /////////////////////////////////////tl del at 20180306///////////////////////
        cc.log(this.seatPlayer)
        //this.seatPlayer.push(data.dealer);
        //////////////////////////////////////////////////////////////////////////////
        for(var i = 0;i < this.betsLayer.getChildrenCount();i++){
            this.reflashBet(i,data.bets[i],0);
        }
    },


    changeRecordArr:function(arr){
        for(var i = 0;i < arr.length;i++){
            this.recordArr[i] = {"result":0};
            this.recordArr[i].result = arr[i];
        }
    },

    endRecordAnim:function () {
        var _this = this;
        if (this.trendList.getChildrenCount() > 9){
            var dis = this.trendList.getChildren()[2].getPositionX() - this.trendList.getChildren()[1].getPositionX();
            cc.log("移动长度",this.trendList.getChildrenCount(),dis,this.recordArr);
            for(var i=0;i<this.trendList.getChildrenCount();i++){
                var spm = this.trendList.getChildren()[i];
                spm.runAction(cc.moveTo(0.2,cc.p(spm.getPositionX()+dis,spm.getPositionY())));
            }
            for (var i=0;i< this.trendList.getChildrenCount() - 10;i++){
                 this.trendList.removeLastItem();
            }
        }
        // var result = _this.gameResult;
        // var sp = new cc.Sprite(res["lhdrecord"+result]);
        // var widget = new ccui.Layout();
        // widget.setContentSize(sp.width,sp.height);
        // widget.addChild(sp);
        // sp.setPosition(widget.width/2,widget.height/2);
        // this.node.scheduleOnce(function(){
        //     _this.trendList.insertCustomItem(widget,0);
        // },0.22)
        this.node.scheduleOnce(function(){
            _this.initRecord();
        },0.22)

    },
    initRecord:function(){
        this.trendList.removeAllChildren();
        this.trendList.setScrollBarEnabled(false);
        var recLength = (this.recordArr.length>10)?10:this.recordArr.length;
        cc.log("初始化记录",recLength,this.recordArr.length,this.recordArr);
        for(var i = 0;i < recLength;i++){
            var result = this.recordArr[i].result;
            var sp = new cc.Sprite(res["lhdrecord"+result]);
            var widget = new ccui.Layout();
            widget.setContentSize(sp.width,sp.height);
            widget.addChild(sp);
            sp.setPosition(widget.width/2,widget.height/2);
            this.trendList.pushBackCustomItem(widget);
        }
    },
    initCard:function(){
        this.cardLayer.removeAllChildren();
        for (var i=0;i<this.cardPos.length;i++){
            // var cardBack = new cc.Sprite(res.pokerBei);
            var cardback = this.crateBtnCard()
            cardback.setPosition(this.cardPos[i]);
            this.cardLayer.addChild(cardback);
        }
    },
    showCard:function (cardarr) {
        this.cardLayer.getChildren()[0].setTag(1000 + cardarr[1]);
        this.cardLayer.getChildren()[1].setTag(999);
        this.openPokerAction(this.cardLayer.getChildren()[0],this.getCardUrlByNum(cardarr[0]),parseInt(cardarr[0]/10));
    },
    openPokerAction:function (card,texture,music) {
        _this = this
        if(!card)return;
        var scaleXIndex=1;
        var offset=0.1;
        var _pos=card.getPosition();
        card.setScale(1,1);
        card.setScale(scaleXIndex,1);
        var _this = this;
        var callBack=function(dt){
            scaleXIndex-=offset;
            card.setScale(scaleXIndex,1);
            if(Math.abs(scaleXIndex-0)<offset){
                offset=-offset;
                card.loadTextures(texture,texture,texture,ccui.Widget.PLIST_TEXTURE);
            }
            if(scaleXIndex>=1){
                card.setScale(1,1);
                card.setPosition(_pos);
                card.unschedule(callBack);

                //! 语音
                // var musicIndex = 0
                // if (music >=3){
                //     musicIndex = music -3
                // }else {
                //     musicIndex = music +10
                // }
                mod_sound.playeffect(g_music.ttzdealsd,false);
                mod_sound.playeffect(g_music["lhdeffect"+music],false);
                _this.node.scheduleOnce(function(dt) {
                    if(card.getTag() >= 1000) {
                        _this.openPokerAction(_this.cardLayer.getChildren()[1],_this.getCardUrlByNum(card.getTag() - 1000),parseInt((card.getTag() - 1000)/10));
                    } else {
                        cc.log("第二张牌结束");
                        //播放输赢音效
                        _this.showBlink()
                    }
                }, 1.1);
            }
        }
        card.schedule(callBack,0.016);
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
    crateBtnCard:function (card) {
        var abcd = ["a","d","b","c"];
        var point = Math.floor(card/10);
        var type = card%10;
        var sprButton = null;
        var laiSp=null;
        if (!card||card<0){
            sprButton = new ccui.Button(res.pokerBei,res.pokerBei,res.pokerBei);
            sprButton.setTouchEnabled(false);
        }else{
            //var pngPath ="";
            //if(card==1000){
            //    pngPath="card_joker_gray.png";
            //    laiSp=new cc.Sprite(res.daLaiSp);
            //}else if(card==2000){
            //    laiSp=new cc.Sprite(res.xiaoLaiSp);
            //    pngPath="card_joker.png";
            //}else{
            //
            //}
            var pngPath = "card_" + point +  abcd[type - 1]+ ".png";
            sprButton = new ccui.Button(pngPath,pngPath,pngPath,ccui.Widget.PLIST_TEXTURE);
            sprButton.setTouchEnabled(true);
            if(laiSp){
                laiSp.setPosition(sprButton.width/2,sprButton.height);
                sprButton.addChild(laiSp);
            }
        }
        sprButton.setAnchorPoint(0.5,0.5);
        return sprButton;
    },
    initMyInfo:function(total){
        var head = ccui.helper.seekWidgetByName(this.node,"myIcon");
        gameclass.mod_base.showtximg(head,this.mod_lhd.logindata.imgurl, 0, 0,"im_headbg5", false);
        ccui.helper.seekWidgetByName(this.node,"name").setString(this.mod_lhd.logindata.name || "游客");
        ccui.helper.seekWidgetByName(this.node,"gold").setString(gameclass.changeShow(total));
        ccui.helper.seekWidgetByName(this.node,"gold").ignoreContentAdaptWithSize(true);
    },

    initSeatInfo:function(playerInfo){
        for(var i = 0;i < playerInfo.length;i++){
            if(playerInfo[i].uid > 0){
                this.headNodeArr[i].setVisible(true);
                var head = this.headNodeArr[i].getChildByName("headBg");
                gameclass.mod_base.showtximg(head,playerInfo[i].head, 0, 0,"im_headbg5", false);
                ccui.helper.seekWidgetByName(this.headNodeArr[i],"playerName").setString(playerInfo[i].name);
                ccui.helper.seekWidgetByName(this.headNodeArr[i],"playerMoney").setString(gameclass.changeShow(playerInfo[i].total));
                //ccui.helper.seekWidgetByName(this.headNodeArr[i],"beautyLogo").setVisible(playerInfo[i].total>=this.beautyNum);
                //this.refalshKuang(this.headNodeArr[i],playerInfo[i].total);
            }else{
                this.headNodeArr[i].setVisible(false);
            }
        }
    },

    refalshKuang:function(_node,total,type){
        //var beautyLogo = ccui.helper.seekWidgetByName(_node,"beautyLogo");
        //if(type == 1){
        //    beautyLogo = ccui.helper.seekWidgetByName(_node,"zhuangbeautyLogo");
        //}
        //beautyLogo.setVisible(total >= this.beautyNum);
        //if(total < this.beautyNum) return;
        //var parentNode = beautyLogo.getParent();
        //if(total >= 1000000){
        //    beautyLogo.setContentSize(70,80);
        //    beautyLogo.setPosition(parentNode.width/2,parentNode.height*3/5);
        //    beautyLogo.loadTexture(res.bzwKuang0,ccui.Widget.LOCAL_TEXTURE);
        //}else{
        //    beautyLogo.setContentSize(67,67);
        //    beautyLogo.setPosition(parentNode.width/2,parentNode.height/2);
        //    beautyLogo.loadTexture(res.bzwKuang1,ccui.Widget.LOCAL_TEXTURE);
        //}
    },


    initTableBet:function(betsArr){
        for(var i = 0;i < betsArr.length;i++){//参数是数组
            this.everyBoxBet[i] = betsArr[i];
            this.everyMyBets[i] = 0;
            this.reflashBet(i,this.everyBoxBet[i],this.everyMyBets[i]);
            var chipArr = this.getChipArr(betsArr[i]);
            for(var j = 0;j < chipArr.length;j++){
                this.createChip(chipArr[j],i);
            }
        }
    },
    reflashBet:function(index,_bet,mybets){
            var money = _bet
            this.wanText[index].setVisible(false);
            this.showBetText[index].setString(money);
            if (mybets > 0){
                this.myBetText[index].setString(mybets);
            }else {
                this.myBetText[index].setString("0");
            }
    },

    getChipArr:function(allChip){
        var resultArr = [];
        var chipArr = [];
        chipArr = [10000,5000,1000,500,100];
        var index = 0;
        var digui = function(){
            if(allChip == 0) return resultArr;
            if(allChip >= chipArr[index]){
                allChip -= chipArr[index];
                resultArr.push(chipArr[index]);
            }else{
                index++;
                digui();
            }
            if(allChip > 0){
                digui();
            }
        }
        digui();
        return resultArr;
    },
    createChip:function(num,index){
        //var chipSp = new cc.Sprite();
        //chipSp.initWithSpriteFrameName("chip"+num+".png");
        var chipSp = new gameclass.bzwChip("chip",num);
        chipSp.index = index;
        this.curChipNum[index]++;
        chipSp.setTag(index*1000 + this.curChipNum[index]);
        var pos = this.getRandomPos(index);
        chipSp.setPosition(pos);
        this.chipLayer.addChild(chipSp);
        return chipSp;
    },

    getRandomPos:function(index){
        var parentNode = this.betsLayer.getChildren()[index];
        var _pos = parentNode.getPosition();
        var _posX = _pos.x + (Math.random()-0.5)*(parentNode.getContentSize().width)*0.7;
        var _posY = _pos.y + (Math.random()-0.5)*(parentNode.getContentSize().height)*0.7;
        return cc.p(_posX,_posY);
    },
    /////////////////tl del at 20180305/////////////////////////////////////////////////////////
    // initZhuangInfo:function(zhuangInfo){
    //     this.zhuangInfo = zhuangInfo;
    //     this.saveZhuangInfo = zhuangInfo;//显示数据
    //     gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(this.node,"zhuangIcon"),
    //         zhuangInfo.uid?zhuangInfo.head:"res/im_headbg8.png", 0, 0,"im_headbg4", false);
    //     ccui.helper.seekWidgetByName(this.node,"zhuangName").setString(zhuangInfo.name || "老炮王");
    //     ccui.helper.seekWidgetByName(this.node,"zhuangMoney").setString(gameclass.changeShow(zhuangInfo.total));
    //     //ccui.helper.seekWidgetByName(this.node,"zhuangbeautyLogo").setVisible(zhuangInfo.total >= this.beautyNum);
    //     //this.refalshKuang(this.node,zhuangInfo.total,1);
    //     //ccui.helper.seekWidgetByName(this.node,"zhuangbeautyLogo").setLocalZOrder(1000);
    // },

    // getZhuanginfo:function(data){
    //     this.isRefalshZhuang = true;
    //     this.zhuangInfo = data;
    // },
    ///////////////////////////////////////////////////////////////////////////////////
    onSeat:function(data){
        if(data.uid > 0){
            this.seatPlayer[data.index] = data;
            this.headNodeArr[data.index].setVisible(true);
            gameclass.mod_base.showtximg(this.headNodeArr[data.index].getChildByName("headBg"),data.head,0,0,"im_headbg5",false);
            ccui.helper.seekWidgetByName(this.headNodeArr[data.index],"playerName").setString(data.name);
            ccui.helper.seekWidgetByName(this.headNodeArr[data.index],"playerMoney").setString(gameclass.changeShow(data.total));
            //ccui.helper.seekWidgetByName(this.headNodeArr[data.index],"beautyLogo").setVisible(data.total>=this.beautyNum);
            //this.refalshKuang(this.headNodeArr[data.index],data.total);
        }else{
            this.seatPlayer[data.index].uid = 0;
            this.headNodeArr[data.index].setVisible(false);
        }
    },
    /////////////////////////////////////tl del at 20180306///////////////////////
    // reflashZhuangInfo:function(){
    //     if(!this.isRefalshZhuang){
    //         return;
    //     }
    //     var data = this.zhuangInfo;
    //     //this.saveZhuangInfo = data;
    //     ccui.helper.seekWidgetByName(this.node,"zhuangIcon").setVisible(true);
    //     gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(this.node,"zhuangIcon"),
    //         data.uid?data.head:"res/im_headbg8.png", 0, 0,"im_headbg4", false);
    //     ccui.helper.seekWidgetByName(this.node,"zhuangName").setString(data.name || "老炮王");
    //     ccui.helper.seekWidgetByName(this.node,"zhuangMoney").setString(gameclass.changeShow(data.total));
    //     //ccui.helper.seekWidgetByName(this.node,"zhuangbeautyLogo").setVisible(data.total >= this.beautyNum);
    //     //this.refalshKuang(this.node,data.total,1);
    //     if(data.uid != this.mod_lhd.logindata.uid){
    //         this.btn_shangzhuang.setVisible(true);
    //         this.btn_xiazhuang.setVisible(false);
    //     }else{
    //         this.btn_shangzhuang.setVisible(false);
    //         this.btn_xiazhuang.setVisible(true);
    //     }
    // },
    //////////////////////////////////////////////////////////////////////////////
    //动画时间
    //结束动画:买定离手动画1S, 钟移动到中间0.3s,1.3S钟开钟时间,开甩子1.5S,钱飞到庄时间0.5 ,等飞玩庄,金币飞到玩家0.5s,大赢家动画2S,一共7S钟.
    //开局动画:请下注动画1S,摇种1.2S钟。一共2.2S
    onEnd:function(data){
        this.rewardArr = this.getRewardIndex(data.result);
        this.gameResult = this.getGameType(data.result);
        var result = {"result":this.gameResult};
        this.windata = data;
        //var seziFlyPos = this.rewardArr[this.rewardArr.length - 1];
        //cc.log("seziflypos = ",seziFlyPos);
        this.gameBegin = false;
        var _this = this;
        this.allWin = 0;
        //统计闲家一共赢多少钱
        for(var i = 0;i < this.endSeatState.length;i++){
            if(this.endSeatState[i].uid != 0){
                if(this.endSeatState[i].win > 0){
                    this.allWin += this.endSeatState[i].win;
                }
            }
        }
        this.noticeAnim(0,function(){
            _this.showCard(data.result);
            //_this.showBlink();//清除筹码,播放大赢家动画
            // _this.zhong._scale = 2.5;
            // _this.zhong.runAction(cc.sequence(cc.spawn(cc.moveTo(0.3,cc.p(568,320)),cc.scaleTo(0.3,1,1)),cc.callFunc(function(){
            //     _this.zhong.setVisible(false);
            //     var sp1 = _this.createSpine(1);
            //     var sp2 = _this.createSpine(2);
            //     _this.node.addChild(sp2);
            //     _this.node.addChild(sp1);
            //     _this.showPointAnim(data.result);//结束动画
            //     mod_sound.playeffect(g_music["openCup0"],false);
            //     _this.node.scheduleOnce(function(){
            //         if(sp1) sp1.removeFromParent();
            //         if(sp2) sp2.removeFromParent();
            //         _this.recordArr.pop();
            //         _this.recordArr.unshift(result);
            //         _this.initRecord();
            //         var total = 10
            //         if(data.result[0] == data.result[1] ){
            //             mod_sound.playeffect(g_music["baozi"],false);
            //             _this.baoziAnim.setVisible(true);
            //             _this.baoziAnim.setAnimation(0, 'baozi', false);
            //             _this.baoziAnim.setCompleteListener(function(){
            //                 _this.baoziAnim.setVisible(false);
            //             })
            //         }else{
            //             mod_sound.playeffect(g_music["dice"+total],false);
            //         }
            //     },1.3333);
            // })))
        })
    },
    getGameType:function(arr){
        var card1 = parseInt(arr[0]/10);
        var card2 = parseInt(arr[1]/10);
        if(card1 == card2){
            return 2;
        }else if(card1 > card2){
            return 0;
        }else{
            return 1;
        }
    },
    showPointAnim:function(arr){
        this.resultNode.setVisible(true);
        var totalPoint = arr[0]+arr[1]+arr[2];
        var type = this.getGameType(arr);
        for(var i = 0;i < 3;i++){
            this.resultNode.getChildren()[i].setVisible(false);
            this.resultNode.getChildren()[i].ignoreContentAdaptWithSize(true);
        }

        this.resultNode.getChildren()[0].setVisible(true);
        this.resultNode.getChildren()[0].setScale(0.2);
        this.resultNode.getChildren()[0].setString(totalPoint);
        var _this = this;
        this.resultNode.getChildren()[0].runAction(cc.sequence(cc.scaleTo(0.8,1,1),cc.callFunc(function(){
            _this.resultNode.getChildren()[1].setVisible(true);
            _this.resultNode.getChildren()[1].setPositionX(_this.resultNode.getChildren()[0].getPositionX() + _this.resultNode.getChildren()[0].width/2+20);
            _this.resultNode.getChildren()[1].runAction(cc.sequence(cc.delayTime(0.3),cc.callFunc(function(){
                _this.resultNode.getChildren()[2].setVisible(true);
                _this.resultNode.getChildren()[2].ignoreContentAdaptWithSize(true);
                _this.resultNode.getChildren()[2].loadTexture(res["result"+type],ccui.Widget.LOCAL_TEXTURE);
                _this.resultNode.getChildren()[2].setPositionX(_this.resultNode.getChildren()[1].getPositionX()+
                    _this.resultNode.getChildren()[1].width/2 + 10 +_this.resultNode.getChildren()[2].width/2);
                _this.resultNode.getChildren()[2].setScale(0.2);
                _this.resultNode.getChildren()[2].runAction(cc.sequence(cc.scaleTo(0.6,1.2,1.2),cc.scaleTo(0.2,1,1),cc.delayTime(1),
                    cc.callFunc(function(){
                        _this.resultNode.setVisible(false);
                    })
                ))
            })))
        })))

    },
    showSezi:function(arr,index){
        //for(var i = 0;i < arr.length;i++){
        //    var sp = new cc.Sprite(res["dian"+arr[i]]);
        //    var pos = this.betsLayer.getChildren()[index].convertToNodeSpace(cc.p(480+70*i,280));
        //    sp.setPosition(pos);
        //    sp.setTag(2000+i);
        //    sp.setLocalZOrder(10000);
        //    this.betsLayer.getChildren()[index].addChild(sp);
        //}

        // for(var i = 0;i < arr.length;i++){
        //     //var pos = this.betsLayer.getChildren()[index].convertToNodeSpace(cc.p(480+70*i,280));
        //     var pos = cc.p(480+70*i,280);
        //     this.seziSp[i].setTexture(res["dian"+arr[i]]);
        //     this.seziSp[i].setPosition(pos);
        //     this.seziSp[i].setVisible(true);
        //     this.seziSp[i].setScale(1);
        //     this.seziSp[i].setOpacity(255);
        // }
    },
    showBlink:function(){
        var _this = this;
        if (_this.rewardArr.length<=0){
            _this.recordArr[0] = 2
            return
        }
        var spindex = _this.rewardArr[0]
        var isPlay = false;
        var sp = _this.endLayer.getChildren()[spindex];
        sp.runAction(cc.sequence(cc.blink(1,3),cc.callFunc(function(sender){
            mod_sound.playeffect(g_music["lhdresult"+_this.gameResult],false);

            var result = {"result":_this.gameResult};
            _this.recordArr.pop();//删除最后
            _this.recordArr.unshift(result);//像头添加

            var spimg =new cc.Sprite(res["lhdrecord"+_this.gameResult]);
            spimg.setPosition(_this.betsLayer.getChildren()[_this.gameResult].getPosition());
            _this.node.addChild(spimg);
            var newpos =  ccui.helper.seekWidgetByName(_this.node,"ListView_1").getPosition();
            spimg.runAction(cc.sequence(cc.scaleTo(0.3,1.5,1.5), cc.scaleTo(0.3,1,1),cc.moveTo(1, newpos), cc.callFunc(function () {
                // _this.initRecord();
                _this.endRecordAnim();
                _this.node.removeChild(spimg);
            })));

            if(!isPlay){
                _this.endFiyChip();//清空筹码播放大赢家
                isPlay = true;
                }
                sender.setVisible(false);
            },sp)))
       // _this.endFiyChip();
        //var isPlay = false;
        // for(var i = 0;i < this.rewardArr.length;i++ ){
        //     var sp = this.betsLayer.getChildren()[this.rewardArr[i]].getChildByTag(1111);
        //     sp.setVisible(true);
        //     sp.runAction(cc.sequence(cc.blink(1,3),cc.callFunc(function(sender){
        //         if(!isPlay){
        //             _this.endFiyChip();
        //             isPlay = true;
        //         }
        //         sender.setVisible(false);
        //     },sp)))
        // }
    },

    endFiyChip:function(){
        var _this = this;
        //var zhuangPos = ccui.helper.seekWidgetByName(this.node,"zhuangIcon").getPosition();
        var a = 0;
        var b = 0;
        for(var i = 0;i < this.chipLayer.getChildrenCount();i++){
            var sp = this.chipLayer.getChildren()[i];
            if(this.rewardArr.indexOf(sp.index) < 0){
                if(a == 0){
                    mod_sound.playeffect(g_music["flycoins"]);
                }
                a++;
                sp.setChipMove(0.5,sp.getPosition(),sp.getPosition(),1);
            }else{
                sp.runAction(cc.sequence(cc.delayTime(0.5),cc.moveTo(0.5,cc.p(1136/2,320)),cc.callFunc(function(sender){
                    sender.removeFromParent();
                },sp)))
            }
        }
        var _this=this;
        //金币飞向坐着的人
        // cc.log("金币飞向坐着的人",_this.endSeatState);
        this.node.scheduleOnce(function(){
            for(var i = 0;i < _this.endSeatState.length;i++){
                if(_this.endSeatState[i].win > 0 && _this.endSeatState[i].uid != 0 /*&& _this.endSeatState[i].uid != _this.saveZhuangInfo.uid*/){
                    var chiar = _this.getPlayerIndexByID(_this.endSeatState[i].uid);
                    var arr = _this.createJiaChip(_this.endSeatState[i].win);
                    var endPos = _this.getheadPos(chiar);
                    // cc.log("金币飞向坐着的人",_this.endSeatState[i].uid,chiar,arr,endPos);
                    _this.flyToHead(arr,endPos,_this.endSeatState[i].win);
                }
            }
            //创建一坨飞向游客的筹码
            //先判断除了我自己。还有没有其余的无座玩家,有的话就飞
            var total = 0;
            for(var i = 0;i < _this.rewardArr.length;i++){
                total += Number(_this.everyBoxBet[_this.rewardArr[i]]);
            }
            if(total > 0){
                var endPos = cc.p(0,320);
                for(var i = 0;i < 20;i++){
                    //var sp = new cc.Sprite(res["chip100"]);
                    var sp = new cc.Sprite();
                    sp.initWithSpriteFrameName("chip"+100+".png");
                    sp.setPosition(1136/2+(Math.random()-0.5)*(_this.chipLayer.width)*0.2,320+(Math.random()-0.5)*(_this.chipLayer.height)*0.2);
                    _this.chipLayer.addChild(sp);
                    sp.runAction(cc.sequence(cc.moveTo(0.5,endPos),cc.callFunc(function(sender){
                        sender.removeFromParent();
                    },sp)));
                }
            }
            for(var i = 0;i < _this.endSeatState.length;i++){
                var chair = _this.getPlayerChairID(_this.endSeatState[i].uid);
                var headNode = null;
                if(chair >= 0){
                    headNode = _this.headNodeArr[chair];
                    _this.seatPlayer[chair].total = _this.endSeatState[i].total;
                    //ccui.helper.seekWidgetByName(headNode,"beautyLogo").setVisible(_this.endSeatState[i].total >= _this.beautyNum);
                    //_this.refalshKuang(headNode,_this.endSeatState[i].total);
                }
                //刷新桌面上人的金币显示
                if(headNode){
                    headNode.getChildren()[1].getChildren()[1].setString(gameclass.changeShow(_this.endSeatState[i].total));
                }
                if(_this.endSeatState[i].uid == _this.mod_lhd.logindata.uid){
                    _this.myGold = _this.endSeatState[i].total;
                    _this.reflashMyMoeny();
                    _this.setBetImg();
                }
                /////////////////////////////////////tl del at 20180306///////////////////////
                // if(_this.endSeatState[i].uid == _this.saveZhuangInfo.uid){
                //     if(_this.endSeatState[i].total > 0){
                //         var randomNum = parseInt(Math.random()*3);
                //         mod_sound.playeffect(g_music["laugh"+randomNum],false);
                //     }else if(_this.endSeatState[i].total < 0){
                //         var randomNum = parseInt(Math.random()*2);
                //         mod_sound.playeffect(g_music["lose"+randomNum],false);
                //     }
                // }
                //////////////////////////////////////////////////////////////////////////////////
            }
            //大赢家动画
            _this.node.scheduleOnce(function(){
                if(_this.windata.uid != 0 /*&& _this.windata.uid != _this.saveZhuangInfo.uid*/){
                    var chair = _this.getPlayerIndexByID(_this.windata.uid);
                    _this.playWinAnim(chair);
                }
            },0.5)
        },1)
    },

    flyToHead:function(_nodeArr,endPos,win){
        var isplay = false;
        var _this = this;
        for(var j =0;j < _nodeArr.length;j++){
            _nodeArr[j].setChipMove(0.5,_nodeArr[j].getPosition(),endPos,1,function(){
                if(!isplay){
                    isplay = true;
                    gameclass.showYSText(win,endPos,_this.node,1);
                }
            });

        }
    },

    createJiaChip:function(win){
        var chipSpArr = [];
        cc.log( "000000000000",this.allWin,win);
        for(var i = 0;i < Math.ceil(win*10/this.allWin);i++){
            var sp = new gameclass.bzwChip("chip",100);
            sp.setPosition(1136/2+(Math.random()-0.5)*(this.chipLayer.width)*0.2,320+(Math.random()-0.5)*(this.chipLayer.height)*0.2);
            this.chipLayer.addChild(sp);
            chipSpArr.push(sp);
        }
        return chipSpArr;
    },

    playWinAnim:function(chair){
        var _this = this;
        this.winLayout.setScale(0.1);
        this.winLayout.setVisible(true);
        this.winLayout.setPosition(1136/2,320);
        gameclass.mod_base.showtximg(this.winerHead,this.windata.head,0,0,"im_headbg7",false);
        this.winName.setString(this.windata.name);
        mod_sound.playeffect(g_music["openCup1"],false);
        this.winLayout.runAction(cc.sequence(cc.scaleTo(0.5,1,1),cc.callFunc(function(){
            _this.win2.setVisible(true);
            _this.win2.setAnimation(0, 'animation', false);
            var endPos = _this.getheadPos(chair);
            _this.winLayout.runAction(cc.sequence(cc.delayTime(1),cc.spawn(cc.moveTo(0.5,endPos),cc.scaleTo(0.5,0.2,0.2)),cc.callFunc(function(){
                _this.winLayout.setVisible(false);
            })))
        })))
    },

    //跟据ID获取8个座位上人的座位号
    getPlayerChairID:function(uid){
        for(var i = 0;i < this.seatPlayer.length;i++){
            //座位上的位置
            if(uid == this.seatPlayer[i].uid/* && uid != this.saveZhuangInfo.uid*/){
                return i;
            }
            // //庄位置
            // if(uid == 0 || uid == this.saveZhuangInfo.uid){
            //     return 1000;
            // }
        }
        //游客位置
        return -1;
    },

    getPlayerIndexByID:function(uid){
        for(var i = 0;i < this.seatPlayer.length;i++){
            //座位上的位置
            if(uid == this.seatPlayer[i].uid &&/* uid != this.saveZhuangInfo.uid &&*/ uid != this.mod_lhd.logindata.uid){
                return i;
            }
            // //庄位置
            // if(uid == 0 || uid == this.saveZhuangInfo.uid){
            //     return 1000;
            // }
            //自己头像位置
            if(uid == this.mod_lhd.logindata.uid){
                return -2;
            }
        }
        //游客位置
        return -1;
    },

    getRewardIndex:function(arr){
        var rewardArr = [];
        var card1 = parseInt(arr[0]/10);
        var card2 = parseInt(arr[1]/10);
        if(card1 == card2){
            rewardArr.push(2);
        }else if (card1 > card2){
            rewardArr.push(0);
        }else if(card1 < card2){
            rewardArr.push(1);
        }
        return rewardArr;
    },
    reflashMyMoeny:function(){
        this.myMoneyText.setString(gameclass.changeShow(this.myGold));
    },
    reflashPlayerMoney:function(data){
        for(var i = 0;i < this.seatPlayer.length;i++){
            if(data.uid == this.seatPlayer[i].uid){
                this.seatPlayer[i].total = data.total;
                ccui.helper.seekWidgetByName(this.headNodeArr[i],"playerMoney").setString(gameclass.changeShow(data.total));
                //ccui.helper.seekWidgetByName(this.headNodeArr[i],"beautyLogo").setVisible(data.total >= this.beautyNum);
                //this.refalshKuang(this.headNodeArr[i],data.total);
                break;
            }
        }
        if(data.uid == this.mod_lhd.logindata.uid){
            this.myGold = data.total;
            ccui.helper.seekWidgetByName(this.node,"gold").setString(gameclass.changeShow(data.total));
        }
    },
    onPlayerBet:function(data){
        if(data.gold == 0) return;
        var chair = -1;//-1表示无座玩家飞金币的位置
        if(data.uid == this.mod_lhd.logindata.uid){
            chair = -2;//-2表示自己头像飞金币的位置
            this.myGold -= data.gold;
            this.reflashMyMoeny();
            this.setBetImg();
        }else{
            for(var i = 0;i < this.seatPlayer.length;i++){
                if(data.uid == this.seatPlayer[i].uid && data.uid != this.mod_lhd.logindata.uid ){
                    chair = i;
                    break;
                }
            }
        }
        //刷新座位上玩家的钱
        for(var i = 0;i < this.seatPlayer.length;i++){
            if(data.uid == this.seatPlayer[i].uid){
                var moneyText = ccui.helper.seekWidgetByName(this.headNodeArr[i],"playerMoney");
                moneyText.setString(gameclass.changeShow(data.total));
                this.seatPlayer[i].total = data.total;
                //ccui.helper.seekWidgetByName(this.headNodeArr[i],"beautyLogo").setVisible(data.total >= this.beautyNum)
                //this.refalshKuang(this.headNodeArr[i],data.total);
                break;
            }
        }
        this.fiyChip(chair,data.index,data.gold);
        this.everyBoxBet[data.index] += data.gold;
        if (data.uid == this.mod_lhd.logindata.uid){
            cc.log("aaaaaaaaaaa",this.everyMyBets,data.index,data.gold);
            this.everyMyBets[data.index] += data.gold;
            cc.log("aaaaaaaaaaa",this.everyMyBets,this.everyBoxBet);
        }
        this.reflashBet(data.index,this.everyBoxBet[data.index],this.everyMyBets[data.index]);

        var index = this.getPlayerChairID(data.uid);
        if(index >=0 && index < 8){
            if(this.headNodeArr[index].isActing) return;
            this.headNodeArr[index].isActing = true;
            var difx = (index < 4 ? 30 : -30);
            var act = cc.moveBy(0.1,difx,0);
            this.headNodeArr[index].runAction(cc.sequence(act,act.reverse(),cc.callFunc(function(sender){
                sender.isActing = false;
            },this.headNodeArr[index])))
        }

    },

    //续压
    onLastBets:function(data){
         var  _this = this
        for(var i = 0;i  < _this.totalArea;i++){
            var mydata = {};
            mydata.gold = data.gold[i];
            mydata.uid = data.uid;
            mydata.total = data.total;
            mydata.index = i;
            this.onPlayerBet(mydata);
        }
    },
    getplayerListData:function(data){
        if(data && data.info && data.info.length > 0){
            this.game.uimgr.uis["wzui"].showDataInfo(data.info);
        }
    },
    onBalance:function(data){
        this.endSeatState.push(data);
    },
    fiyChip:function(chair,index,gold){//位置区域金币
        var _this = this;
        var chipArr = this.getChipArr(gold);
        for(var i = 0;i < chipArr.length;i++){
            var chipSp = this.createChip(chipArr[i],index);
            var startPos = this.getheadPos(chair);
            var endPos = this.getRandomPos(index);
            chipSp.setPosition(startPos);
            var willDeleteTarget = null;
            if(_this.curChipNum[index] > _this.maxChipNum[index]){
                willDeleteTarget = _this.chipLayer.getChildByTag(1000*index+(_this.curChipNum[index]-_this.maxChipNum[index]));
            }
            chipSp.setChipMove(0.3,startPos,endPos,0,function(){

            },willDeleteTarget);
        }
    },

    startGame:function(){
        //this.reflashZhuangInfo();//更新庄的信息。可能换人了
       // this.isRefalshZhuang = false;
        this.gameBegin = true;
        this._timeContain.setVisible(true);
        this.nextLayout.setVisible(false);
        this.setBetImg();
        for(var i = 0; i < this.betsLayer.getChildrenCount();i++){
            this.everyBoxBet[i] = 0;
            this.everyMyBets[i] = 0;
            this.showBetText[i].setString("0");
            this.wanText[i].setVisible(false);
            this.myBetText[i].setString("0");
            this.curChipNum[i] = 0;
        }
        this.playBetAnim();//开局动画
    },

    playBetAnim:function(){//开局动画
        // this.clock.setVisible(true);
        // this.clock.setPosition(485,930);
        // this.clock.setAnimation(0, 'touzhong01', false);
        var _this = this;
       // mod_sound.playeffect(g_music["roll"],false);
        //this.playBetsMusic(3);//下注音效
       // this.cardLayer.removeAllChildren();
/////////////////////////////////////tl add at 20180306///////////////////////
        _this.noticeAnim(1,function(){
            //添加发牌动画
            _this.sendcardAnim()
            _this.btn_xuya.setEnabled(true);
            _this.btn_xuya.setBright(true);
            _this.canBet = true;
        })
        /////////////////////////////////////tl del at 20180306///////////////////////
        // this.clock.setCompleteListener(function(){
        //     _this.zhong.setVisible(true);
        //     _this.zhong.y = 320;
        //     _this.zhong._scale = 2.5;
        //     _this.zhong.runAction(cc.spawn(cc.moveTo(0.5,cc.p(485,930)),cc.scaleTo(1,1,1)));
        //     _this.clock.setVisible(false);
        //     _this.noticeAnim(1,function(){
        //         _this.btn_xuya.setEnabled(true);
        //         _this.btn_xuya.setBright(true);
        //         _this.canBet = true;
        //     })
        // })
        ////////////////////////////////////////////////////////////////////
    },
    sendcardAnim:function(){
        this.cardLayer.removeAllChildren();
        var winSize = cc.director.getWinSize();
        for (var i=0;i<2;i++){
            var card = this.crateBtnCard();
            card.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
            card.setVisible(true)
            this.cardLayer.addChild(card);
        }
        var _this = this;
        this.cardLayer.getChildren()[0].runAction(cc.sequence(cc.moveTo(0.35,cc.p(this.cardPos[0])),cc.callFunc(function(){
            mod_sound.playeffect(g_music["game_fapai"],false);
            _this.cardLayer.getChildren()[1].runAction(cc.sequence(cc.moveTo(0.35,cc.p(_this.cardPos[1])),cc.callFunc(function(){
                mod_sound.playeffect(g_music["game_fapai"],false);
                _this.initCard()
            })))
            })));
    },
    noticeAnim:function(type,func){
        this.start.setVisible(true);
        //买定离手
        if(type == 0){
            this.startIMG.setTexture(res.lhdxzjs);
            this._timeContain.setVisible(false);
            this.canBet = false;
            mod_sound.playeffect(g_music["brttz_mdls"],false);
        }else{
            this.endSeatState = [];
            this.startIMG.setTexture(res.lhdksxz);
            mod_sound.playeffect(g_music["brttz_xztip"],false);
            // for(var i = 0;i < this.betsLayer.getChildrenCount();i++){
            //     var sp = this.btn_sendBets[i].getChildByTag(1111);
            //     sp.setVisible(true);
            //     sp.runAction(cc.sequence(cc.delayTime(1.5),cc.callFunc(function(sender){
            //         sender.setVisible(false);
            //     },sp)));
            // }
        }
        this.startIMG.x = 160;
        var _this = this;
        this.startIMG.runAction(cc.sequence(cc.moveTo(0.35,cc.p(478,53)),cc.scaleTo(0.15,1.2,1.2),
            cc.scaleTo(0.15,1,1),cc.moveTo(0.35,cc.p(850,53)),cc.callFunc(function(){
                _this.start.setVisible(false);
                if(func) func();
            })));
    },

    initShow:function(){
        var _this = this;
        this.chipLayer = ccui.helper.seekWidgetByName(this.node,"chipLayer");
        this.endLayer = ccui.helper.seekWidgetByName(this.node,"endLayer");
        //坐下
        for(var i = 0;i < 8;i++){
            this.chairNodeArr[i] = ccui.helper.seekWidgetByName(this.node,"chiarNode").getChildren()[i];
            this.chairNodeArr[i].isActing = false;
            this.headNodeArr[i] = ccui.helper.seekWidgetByName(this.node,"headNode").getChildren()[i];
            this.headNodeArr[i].setVisible(false);
            this.headNodeArr[i].setTag(1000+i);
            ccui.helper.seekWidgetByName(this.headNodeArr[i],"beautyLogo").setVisible(false);
            ccui.helper.seekWidgetByName(this.headNodeArr[i],"beautyLogo").setLocalZOrder(1000);
            this.chairNodeArr[i].setTag(10000+i);
            this.chairNodeArr[i].addTouchEventListener(function(sender,type){
                cc.log("chairnode......................................")
                if(type != ccui.Widget.TOUCH_ENDED) return;
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                if(_this.myGold >= _this.needSeatMoney){
                    _this.mod_lhd.sendSeat(sender.getTag()-10000);
                }else{
                    gameclass.showText("金币必须大于30W才能坐下！");
                }
            });
            this.headNodeArr[i].addTouchEventListener(function(sender,type){
                if(type != ccui.Widget.TOUCH_ENDED) return;
                _this.addMask(1);
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                var isOnSeat = _this.checkIsOnSeat();
                if(_this.myGold > _this.seatPlayer[sender.getTag()-1000].total && !isOnSeat){
                    _this.mod_lhd.sendSeat(sender.getTag()-1000);
                    return;
                }
                _this.getPlayerInfo(_this.seatPlayer[sender.getTag()-1000],_this.mod_lhd,false);
                //_this.game.uimgr.showui("gameclass.chatMicLayer").setBZWinfo(_this.seatPlayer[sender.getTag()-1000],_this.mod_lhd,false);
            })
        }
        //点击桌台下注按钮
        for(var i = 0;i < this.betsLayer.getChildrenCount();i++){
            this.btn_sendBets[i] = this.betsLayer.getChildren()[i];
            // var sp = null;
            // if(i==0 || i==1){
            //     sp = new cc.Sprite(res.danshuangImg);
            // }else if(i ==2){
            //     sp = new cc.Sprite(res.greenImg);
            // }else{
            //     sp = new cc.Sprite(res.yellowImg);
            // }
            // this.btn_sendBets[i].addChild(sp);
            // sp.setLocalZOrder(-10);
            // sp.setTag(1111);
            // sp.setPosition(this.btn_sendBets[i].width/2,this.btn_sendBets[i].height/2);
            // sp.setVisible(false);

            this.showBetText[i] = this.btn_sendBets[i].getChildByName("betsNum");
            this.showBetText[i].ignoreContentAdaptWithSize(true);
            this.wanText[i] = this.btn_sendBets[i].getChildByName("wan");
            this.wanText[i].setVisible(false);
            this.myBetText[i] = this.btn_sendBets[i].getChildByName("mybets");
            this.myBetText[i].ignoreContentAdaptWithSize(true);


            this.btn_sendBets[i].index = i;

            this.btn_sendBets[i].addTouchEventListener(function(sender,type){
                if(type != ccui.Widget.TOUCH_ENDED) return;
                /////////////////////////////////////tl del at 20180306///////////////////////
                // if(_this.mod_lhd.logindata.uid == _this.saveZhuangInfo.uid){
                //     gameclass.showText("庄家不能下注");
                //     return;
                // }
                //////////////////////////////////////////////////////////////////////////////
                if(!_this.canBet){
                    gameclass.showText("请等待下一局开始");
                    return;
                }
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                _this.addMask(0.15);

                cc.log("---------",sender);
                //点的效果
                // var sp = sender.getChildByTag(1111);
                // sp.setVisible(true);
                // sp.runAction(cc.sequence(cc.fadeTo(0.15,150),cc.callFunc(function(sender){
                //     sender.setVisible(false);
                //     sender.setOpacity(255);
                // },sp)));
                var betIndxe = sender.index % 3;
                _this.mod_lhd.sendBets(betIndxe,_this.betsArr[_this.selectBet]);
            })
        }

        //上下庄
        // gameclass.createbtnpress(this.node,"btn_shangzhuang",function(){
        //     if(_this.myGold >= _this.needZhuangMoney){
        //         _this.game.uimgr.showui("gameclass.msgboxui");
        //         _this.game.uimgr.uis["gameclass.msgboxui"].setString("是否确定上庄？",function(){
        //             _this.mod_lhd.sendRobZhuang();
        //         });
        //
        //     }else{
        //         gameclass.showText("金币必须大于50W才能上庄!");
        //     }
        // });
        //退出游戏按钮
        ccui.helper.seekWidgetByName(this.node,"btn_jiesan").getChildByName("sp").loadTexture(res.btn_quitExit,ccui.Widget.LOCAL_TEXTURE);
        //商城
        gameclass.createbtnpress(this.node,"btn_shop",function(){
            _this.game.uimgr.showui("gameclass.goldShop");
        });
        gameclass.createbtnpress(_this.node, "btn_yinyue", function (sender) {
            var ms = mod_sound.getMusicVolume();
            var _percent = 0;
            if ( !ms)  _percent = 0.5;
            else _percent = 0;
            ccui.helper.seekWidgetByName(_this.node,"spIconMusic").setVisible(ms);
            mod_sound.setMusicVolume(_percent);
        });
        gameclass.createbtnpress(_this.node, "btn_yinxiao", function (sender) {
            var ms = mod_sound.getEffectsVolume();
            var _percent = 0;
            if ( !ms) _percent = 0.5;
            else _percent = 0;
            ccui.helper.seekWidgetByName(_this.node,"spIconEffect").setVisible(ms);
            mod_sound.setEffectsVolume(_percent);
        });
        gameclass.createbtnpress(this.node, "btn_jiesan", function () {
            _this.game.uimgr.showui("gameclass.msgboxui");
            var strmsg = "是否想要退出房间？";
            _this.game.uimgr.uis["gameclass.msgboxui"].setString(strmsg,function(){
                _this.mod_lhd.dissmissroom();
            });
        });
        var btn_closeCaidan = ccui.helper.seekWidgetByName(this.node,"btn_exitCaidan");
        this.btn_exit = btn_closeCaidan;
        btn_closeCaidan.setVisible(false);
        gameclass.createbtnpress(this.node, "btn_caidan", function () {
            if(_this.zhankai) return;
            _this.zhankai = true;
            ccui.helper.seekWidgetByName(_this.node,"btn_caidan").setTouchEnabled(false);
            ccui.helper.seekWidgetByName(_this.node,"spIconMusic").setVisible(!mod_sound.getMusicVolume());
            ccui.helper.seekWidgetByName(_this.node,"spIconEffect").setVisible(!mod_sound.getEffectsVolume());
            ccui.helper.seekWidgetByName(_this.node,"btn_list").runAction(cc.sequence(cc.moveTo(0.3,cc.p(280,320)),cc.callFunc(function(){
                _this.zhankai = true;
                btn_closeCaidan.setVisible(true);
                _this.btn_exit.setTouchEnabled(true);
            })))
        });
        gameclass.createbtnpress(this.node, "btn_exitCaidan", function () {
            _this.btn_exitCaidan();
        });
        gameclass.createbtnpress(this.node, "btn_xiaoxi", function () {
            var chair = _this.getPlayerChairID(_this.mod_lhd.logindata.uid);
            if(chair >= 0){
                _this.game.uimgr.showui("gameclass.chatuinew");
                _this.game.uimgr.uis["gameclass.chatuinew"].setBZWmod(_this.mod_lhd,_this.mod_lhd.logindata.sex);
            }else{
                gameclass.showText("只有在座位上的人才能聊天");
            }
        });
        gameclass.createbtnpress(this.node, "btn_wuzuo", function () {
            ccui.helper.seekWidgetByName(_this.node,"btn_wuzuo").setTouchEnabled(false);
            if(!_this.zhankai1){
                _this.zhankai1 = true;
                btn_closeCaidan.setVisible(true);
                _this.game.uimgr.showui("wzui").setBaseInfo(function(){
                    _this.mod_lhd.sendWuzuo();
                    ccui.helper.seekWidgetByName(_this.node,"btn_wuzuo").setTouchEnabled(true);
                    ccui.helper.seekWidgetByName(_this.node,"btn_wuzuo").setVisible(true);
                },_this.node,_this);
            }else{
                if(!_this.zhankai1) return;
                ccui.helper.seekWidgetByName(_this.node,"btn_wuzuo").setTouchEnabled(false);
                _this.game.uimgr.uis["wzui"].closewz();
            }
        });
        /////////////////////////////////////tl del at 20180306///////////////////////
        gameclass.createbtnpress(this.node, "btn_more", function () {
            _this.game.uimgr.showui("lhdRecordUi").setBaseInfo(_this.recordArr);
        });
        // gameclass.createbtnpress(this.node, "btn_xiazhuang", function () {
        //     _this.mod_lhd.sendDownDeal();
        // });
        //////////////////////////////////////////////////////////////////////////////
        gameclass.createbtnpress(this.node, "btn_bangzhu", function () {
            _this.helpNode.setVisible(true);
            _this.btn_exitCaidan();
        });
        gameclass.createbtnpress(this.node, "helpInfo", function () {
            _this.helpNode.setVisible(false);
        });
        //gameclass.createbtnpress(this.node, "buygold", function () {
        //    _this.game.uimgr.showui("gameclass.goldShop");
        //});
        /////////////////////////////////////tl del at 20180306///////////////////////
        // gameclass.createbtnpress(this.node, "zhuangIcon", function () {
        //     var isSystem = false;
        //     if(_this.saveZhuangInfo.uid == 0){
        //         isSystem = true;
        //     }
        //     _this.getPlayerInfo(_this.saveZhuangInfo,_this.mod_lhd,isSystem);
        //     //_this.game.uimgr.showui("gameclass.chatMicLayer").setBZWinfo(_this.zhuangInfo,_this.mod_lhd,isSystem);
        // });
        //////////////////////////////////////////////////////////////////////////////

        gameclass.createbtnpress(this.node,"btn_huanfu",function(){
            _this.game.uimgr.showui("gameclass.bank").setEnterance(1);
        })
    },

    checkIsOnSeat:function(){
        var isOnSeat = false;
        for(var i = 0;i < this.seatPlayer.length;i++ ){
            if(this.seatPlayer[i].uid == this.mod_lhd.logindata.uid){
                isOnSeat = true;
                break;
            }
        }
        return isOnSeat;
    },

    playBetsMusic:function(totalTimes){
        var count = 1;
        var _this = this;
        var callBack = function(){
            if(count >= totalTimes){
                _this.unschedule(callBack);
            }
            var randomNum = parseInt(Math.random()*6);
            mod_sound.playeffect(g_music["xz"+randomNum],false);
            count++;
        }
        this.schedule(callBack,5);
    },

    getPlayerInfo:function(data,mod_game,isSystem){
        if(data.uid == 0){
            this.game.uimgr.showui("gameclass.chatMicLayer").setBZWinfo(data,mod_game,isSystem);
        }else{
            this.rankTool.getPlayerInfo(data.uid,function(retdata){
                data.sign = retdata.sign;
                this.game.uimgr.showui("gameclass.chatMicLayer").setBZWinfo(data,mod_game,isSystem);
            })
        }
    },

    onchat:function(data){
        var _this = this;
        if(data.type == 1){
            var playerData = this.getPlayerDataByUid(data.uid);
            var talkArr = (playerData.sex == 0 ? g_chatstr_bzw_man : g_chatstr_bzw_woman);
            var str = (playerData.sex == 0 ? "nan" : "nv");
            for(var i = 0;i < talkArr.length;i++){
                if(talkArr[i] == data.chat){
                    mod_sound.playeffect(g_music[str+(i+1)],false);
                }
            }
        }

        var chair = this.getPlayerChairID(data.uid);
        if(chair == 1000){
            chair = 8;
        }
        var talkPos = _this.talkPos[chair];
        var arr = [
            res.chatbg_ld,
            res.chatbg_rd,
            res.chatbg_ud1,
        ];
        if(data.type < 4){
            var _node = new ccui.Layout();
            var s9 = null;
            if (data.type == 1) {
                s9 = new cc.Scale9Sprite(arr[parseInt(chair/4)]);
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
                //s9.setBackGroundImage(arr[parseInt(chair/4)]);
                //s9.setBackGroundImageScale9Enabled(true);
                //spr.setPosition(0.5 * s9.getContentSize().width, 0.5 * s9.getContentSize().height + 5);
                //s9.addChild(spr);
                //_node.addChild(s9);

                var spine = new sp.SkeletonAnimation(g_chat_expression["expression"+index+"_json"],g_chat_expression["expression"+index+"_atlas"]);
                spine.setAnimation(0, 'animation', false);
                spine.setAnchorPoint(0.5, 0.5);

                s9 = new ccui.Layout();
                s9.setContentSize(110, 100);
                s9.setBackGroundImage(arr[parseInt(chair/4)]);
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
            if (chair >= 4 && chair < 8) {
                _node.setPosition(talkPos.x -  s9.width, talkPos.y);
            } else if(chair >= 0 && chair < 4) {
                _node.setPosition(talkPos);
            }else if(chair == 8){
                _node.setPosition(talkPos);
            }
            this.node.addChild(_node);
            var seq = cc.sequence(cc.delayTime(2), cc.callFunc(function () {
                _node.removeFromParent(true);
            }));
            _node.runAction(seq);
        }
        else{
            if(data.uid == JSON.parse(data.chat).hitUid){
                return;
            }
            var sendIndex = this.getPlayerIndexByID(data.uid);
            var hitIndex = this.getPlayerIndexByID(JSON.parse(data.chat).hitUid);
            var _senderObj = JSON.parse(data.chat);
            mod_sound.playeffect(g_music["magic"+_senderObj.type],false);
            var _animateNode=new cc.Node();
            _animateNode.setScale(0.8);
            _senderObj.type += 1;
            var sucAnim = new sp.SkeletonAnimation(g_magic_chat["magic_chat_"+_senderObj.type+"_1_json"], g_magic_chat["magic_chat_"+_senderObj.type+"_1_atlas"]);
            sucAnim.setAnimation(30, 'animation', false);
            sucAnim.setAnchorPoint(0.5,0.5);
            _animateNode.addChild(sucAnim);
            var senderPos = this.getheadPos(sendIndex);
            _animateNode.setPosition(senderPos.x,senderPos.y);
            var hitPos = this.getheadPos(hitIndex);
            this.node.addChild(_animateNode);
            _animateNode.runAction(cc.sequence(cc.delayTime(1),cc.spawn(cc.rotateTo(0.5,360),cc.moveTo(0.5,hitPos)),cc.callFunc(function(_animateNode,sucAnim){
                sucAnim.clearTrack(30);
                sucAnim.removeFromParent(true);
                var sucAnim1 = new sp.SkeletonAnimation(g_magic_chat["magic_chat_"+_senderObj.type+"_2_json"], g_magic_chat["magic_chat_"+_senderObj.type+"_2_atlas"]);
                sucAnim1.setAnimation(31, 'animation', false);
                sucAnim1.setAnchorPoint(0.5,0.5);
                _animateNode.addChild(sucAnim1);
                _animateNode.scheduleOnce(function(){
                    sucAnim1.clearTrack(31);
                    _animateNode.removeFromParent(true)
                },1)
            },_animateNode,sucAnim)))
        }
    },

    getheadPos:function(index){
        var endPos = null;
        if(index >= 0 && index != 1000){//座位上的人
            endPos = this.headNodeArr[index].getPosition();
        }else if(index == -1){//无座玩家
            endPos = cc.p(-50,320);
        }else if(index == -2){//自己位置
            endPos = ccui.helper.seekWidgetByName(this.node,"myIcon").getPosition();
        }
        // else if(index == 1000){//庄位置
        //     endPos = ccui.helper.seekWidgetByName(this.node,"zhuangIcon").getPosition();
        // }
        return endPos;
    },

    addMask:function(_time){
        this.maskChipLayer.setVisible(true);
        this.maskChipLayer.runAction(cc.sequence(cc.delayTime(_time),cc.callFunc(function(sender){
            sender.setVisible(false);
        },this.maskChipLayer)));
    },

    btn_exitCaidan:function(){
        if(!this.zhankai) return;
        var _this=this;
        this.btn_exit.setTouchEnabled(false);
        ccui.helper.seekWidgetByName(this.node,"btn_list").runAction(cc.sequence(cc.moveTo(0.3,cc.p(-130,320)),cc.callFunc(function(){
            _this.zhankai = false;
            _this.btn_exit.setVisible(false);
            ccui.helper.seekWidgetByName(_this.node,"btn_caidan").setTouchEnabled(true);
        })))
    },

    setBetImg:function(){//根据金币数量设置投注按钮是否可见
        for(var i = 0;i < 5;i++){
            //////////////////20180301  gg change

            if(i == this.selectBet){
                this.btn_bets[i].loadTextureNormal(res.lhdSlectImg,ccui.Widget.LOCAL_TEXTURE);
            }else{
                this.btn_bets[i].loadTextureNormal(res.lhdNormalImg,ccui.Widget.LOCAL_TEXTURE);
            }

            /////////////////
            if(this.myGold < this.betsArr[i]){
                this.btn_bets[i].setTouchEnabled(false);
                this.btn_bets[i].setBright(false);
            }else{
                this.btn_bets[i].setTouchEnabled(true);
                this.btn_bets[i].setBright(true);
            }
        }
    },

    getPlayerDataByUid:function(uid){
        var chair = this.getPlayerChairID(uid);
        if(chair>=0){
            return this.seatPlayer[chair];
        }
    },

    // createSpine:function(type){
    //     var arr = ["touzhong01","touzhong02a","touzhong02b"];
    //     var spineType = [20,21,22];
    //     var spine = new sp.SkeletonAnimation(res.jsontouzhong, res.atlastouzhong);
    //     spine.setAnimation(spineType[type],arr[type],false);
    //     spine.setAnchorPoint(0.5, 0.5);
    //     spine.setPosition(1136/2,320);
    //     return spine;
    // },

    // checkZhuangBTN:function(_isdeal){
    //     this.btn_shangzhuang.setVisible(!_isdeal);
    //     this.btn_xiazhuang.setVisible(_isdeal);
    // },

    // shangxiaZhuang:function(data){
    //     if(data.type == 0){
    //         this.game.uimgr.showui("szui").setBaseInfo(data);
    //         this.btn_shangzhuang.setVisible(false);
    //         this.btn_xiazhuang.setVisible(true);
    //     } else{
    //         this.btn_shangzhuang.setVisible(true);
    //         this.btn_xiazhuang.setVisible(false);
    //     }
    // },

    updateTime:function(){
        this._timerControl.update();

        var curTime = this.overTime - parseInt(new Date().getTime());
        this.curTime = Math.ceil(curTime/1000);
        if(this.gameBegin) return;
        if(curTime / 1000 < 22){
            this.startGame();
        }
    },

    destroy: function () {
        this._timerControl.destroy();
    },
});

var lhdRecordUi = gameclass.baseui.extend({
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.lhdRecord, true);
        this.addChild(this.node);
        this.zoushiList = ccui.helper.seekWidgetByName(this.node,"zoushiList");
        this.ludanArr = ccui.helper.seekWidgetByName(this.node,"Panel_3");

        var _this = this;
        ccui.helper.seekWidgetByName(this.node,"Panel_1").addTouchEventListener(function(sender,type){
            if(type != ccui.Widget.TOUCH_ENDED) return;
            _this.game.uimgr.closeui("lhdRecordUi");
        })
    },
    setBaseInfo:function(data){
        var _this = this
        this.zoushiList.removeAllChildren();
        var totallength = data.length;
        if (totallength > 20){
            totallength = 20
        }
        var longwin = 0
        var huwin = 0
        for (var i = 0;i < totallength;i++){
            if (0 == data[i].result){
                longwin++
            }else if (1 == data[i].result){
                huwin++
            }
        }
        ccui.helper.seekWidgetByName(_this.node,"longwin").setString(longwin/20 * 100 + "% ");
        ccui.helper.seekWidgetByName(_this.node,"huwin").setString(huwin/20 * 100 + "% ");
        for(var i = 0;i < totallength;i+=2){
            var panel = this.game.uimgr.createnode(res.lhdRecordCell, true).getChildByName("bg");
            for (var j = 0; j < panel.getChildrenCount(); j++){
                var listCell = panel.getChildren()[j];
                if(i + j >= totallength) {
                    listCell.setVisible(false);
                    break;
                }
                var infoObj = data[i + j];
                listCell.setTexture(res["lhdrecord" + infoObj.result]);
            }
            panel.removeFromParent(false);
            _this.zoushiList.pushBackCustomItem(panel);
        }

        var indexData = 0
        for (var i=0;i<_this.ludanArr.getChildrenCount();i++){
            if (indexData >= data.length){
                break;
            }
            var listcell = _this.ludanArr.getChildren()[i]
            for(var j=0;j<listcell.getChildrenCount();j++){
                if (indexData >= data.length){
                    break;
                }
                if (indexData >0){
                    if((data[indexData].result != 2)){
                        if ((data[indexData].result != data[indexData-1].result)&&(j>0)){
                            break
                        }else {
                            listcell.getChildren()[j].loadTexture(res["lhdrescolor" + data[indexData].result]);
                            listcell.getChildren()[j].setVisible(true);
                            indexData++;
                        }
                    }else {
                        var henum = ccui.helper.seekWidgetByName(listcell.getChildren()[j-1],"Text_1");
                        henum.setString((parseInt(henum.getString())+1));
                        henum.setVisible(true);
                        indexData++;
                    }
                }else {
                    if (2 != data[indexData].result){
                        listcell.getChildren()[j].loadTexture(res["lhdrescolor" + data[indexData].result]);
                        listcell.getChildren()[j].setVisible(true);
                    }
                    indexData++;
                }
            }
        }
    },
})

