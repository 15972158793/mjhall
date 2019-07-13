/**
 * Created by Administrator on 2017-11-15.
 */

gameclass.erbagangTable = gameclass.baseui.extend({
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
    everyBoxBet:null,
    myGold:0,
    endSeatState:null,
    isRefalshZhuang:false,
    talkPos:null,
    gameBegin:false,
    saveZhuangInfo:null,
    isOnRobList:false,//是否在上庄列表
    //beautyNum:300000,

    ctor: function () {
        this._super();
        this.chairNodeArr = [];
        this.btn_bets = [];
        this.btn_sendBets = [];
        this.headNodeArr = [];
        this.seatPlayer = [];
        this.showBetText = [];
        this.everyBoxBet = [];
        this.endSeatState = [];
        this.resultPointSp = [];
        this.resultBeiLvSp = [];
        this.selectBet = 0;
        this.needZhuangMoney = 0;
        this.needSeatMoney = 0;
        this.talkPos = [];
        this.wanText = [];
        this.cardNode = [];
        this.myBet = [0,0,0];
        this.seatAngle = [];
        //每个格子里筹码的上限
        this.curChipNum = [];
        this.maxChipNum = [];
        for(var i = 0;i < 3;i++){
            this.maxChipNum[i] = 100;
            this.curChipNum[i] = 0;
        }
        //存储位置的牌
        this.cardSpArr = [];
        for(var i = 0;i < 4;i++){
            this.cardSpArr[i] = [];
        }
    },

    setmod: function (mod_game) {
        this.mod_king = mod_game;
        this.mod_king.bindUi(this);

        //选择筹码按钮
        var _this = this;
        for(var i = 0;i < ccui.helper.seekWidgetByName(this.node,"clickLayer").getChildrenCount();i++){
            this.btn_bets[i] = ccui.helper.seekWidgetByName(this.node,"clickLayer").getChildren()[i];
            if(i<=4){
                this.btn_bets[i].getChildren()[0].ignoreContentAdaptWithSize(true);
            }
            this.btn_bets[i].index = i;
            this.btn_bets[i].addTouchEventListener(function(sender,type){
                if(type != ccui.Widget.TOUCH_ENDED) return;
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                var zhuangIcon =  ccui.helper.seekWidgetByName(_this.node,"zhuangIcon");
                if(sender.index <= 4){
                    _this.selectBet = sender.index;
                    _this.setBetImg();
                }else{
                    if(_this.mod_king.logindata.uid == _this.saveZhuangInfo.uid){
                        gameclass.showText("庄家不能下注!");
                        return;
                    }
                    if(!_this.gameBegin){
                        gameclass.showText("请等待下一局开始");
                        return;
                    }
                    _this.mod_king.sendLastBets();
                    sender.setEnabled(false);
                    sender.setBright(false);
                }
            })
        }

        var _this = this;
        this.chipLayer = ccui.helper.seekWidgetByName(this.node,"chipLayer");
        //坐下
        for(var i = 0;i < 12;i++){
            this.chairNodeArr[i] = ccui.helper.seekWidgetByName(this.node,"chairNode").getChildren()[i];
            this.chairNodeArr[i].isActing = false;
            this.headNodeArr[i] = ccui.helper.seekWidgetByName(this.node,"headNode").getChildren()[i];
            this.headNodeArr[i].setVisible(false);
            this.headNodeArr[i].setTag(1000+i);
            this.chairNodeArr[i].setTag(10000+i);
            this.chairNodeArr[i].addTouchEventListener(function(sender,type){
                if(type != ccui.Widget.TOUCH_ENDED) return;
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                if(_this.myGold >= _this.needSeatMoney){
                    _this.mod_king.sendSeat(sender.getTag()-10000);
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
                    _this.mod_king.sendSeat(sender.getTag()-1000);
                    return;
                }
                _this.getPlayerInfo(_this.seatPlayer[sender.getTag()-1000],_this.mod_king,false);
                //_this.game.uimgr.showui("gameclass.chatMicLayer").setBZWinfo(_this.seatPlayer[sender.getTag()-1000],_this.mod_king,false);
            })
            this.seatAngle[i] = cc.p(1136/2-this.headNodeArr[i].getPositionX(),320-this.headNodeArr[i].getPositionY());
        }
        //点击桌台下注按钮
        for(var i = 0;i < this.betsLayer.getChildrenCount();i++){
            this.btn_sendBets[i] = this.betsLayer.getChildren()[i];
            var sp = new cc.Sprite(res.ebgClick);
            this.btn_sendBets[i].addChild(sp);
            sp.setLocalZOrder(-10);
            sp.setTag(1111);
            sp.setPosition(this.btn_sendBets[i].width/2,this.btn_sendBets[i].height/2);
            sp.setVisible(false);

            this.showBetText[i] = this.btn_sendBets[i].getChildByName("betsNum");
            this.showBetText[i].ignoreContentAdaptWithSize(true);
            this.wanText[i] = this.btn_sendBets[i].getChildByName("wan");
            this.wanText[i].setVisible(false);
            this.btn_sendBets[i].index = i;
            this.resultBeiLvSp[i] = this.btn_sendBets[i].getChildByName("bei");
            this.resultBeiLvSp[i].setVisible(false);
            for(var j = 0;j < this.resultBeiLvSp[i].getChildrenCount();j++){
                this.resultBeiLvSp[i].getChildren()[j].setVisible(false);
                if(j==1) {
                    this.resultBeiLvSp[i].getChildren()[j].ignoreContentAdaptWithSize(true);
                }
            }
            ccui.helper.seekWidgetByName(this.btn_sendBets[i],"mybet").ignoreContentAdaptWithSize(true);

            this.btn_sendBets[i].addTouchEventListener(function(sender,type){
                if(type != ccui.Widget.TOUCH_ENDED) return;
                if(_this.mod_king.logindata.uid == _this.saveZhuangInfo.uid){
                    gameclass.showText("庄家不能下注");
                    return;
                }
                if(!_this.gameBegin){
                    gameclass.showText("请等待下一局开始");
                    return;
                }
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                _this.addMask(0.15);
                //点的效果
                var sp = sender.getChildByTag(1111);
                sp.setVisible(true);
                sp.runAction(cc.sequence(cc.fadeTo(0.15,150),cc.callFunc(function(sender){
                    sender.setVisible(false);
                    sender.setOpacity(255);
                },sp)));
                _this.mod_king.sendBets(sender.index,_this.betsArr[_this.selectBet]);
            })
        }

        //上下庄
        gameclass.createbtnpress(this.node,"btn_shangzhuang",function(){
            if(_this.myGold >= _this.needZhuangMoney){
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("是否确定上庄？",function(){
                    _this.mod_king.sendRobZhuang();
                });

            }else{
                gameclass.showText("金币必须大于50W才能上庄!");
            }
        });
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
                _this.mod_king.dissmissroom();
            });
        });
        var btn_closeCaidan = ccui.helper.seekWidgetByName(this.node,"btn_exitCaidan");
        btn_closeCaidan.setVisible(false);
        this.btn_exit = btn_closeCaidan;
        gameclass.createbtnpress(this.node, "btn_caidan", function () {
            if(_this.zhankai) return;
            ccui.helper.seekWidgetByName(_this.node,"btn_caidan").setTouchEnabled(false);
            ccui.helper.seekWidgetByName(_this.node,"spIconMusic").setVisible(!mod_sound.getMusicVolume());
            ccui.helper.seekWidgetByName(_this.node,"spIconEffect").setVisible(!mod_sound.getEffectsVolume());
            ccui.helper.seekWidgetByName(_this.node,"btn_list").runAction(cc.sequence(cc.moveTo(0.3,cc.p(277,320)),cc.callFunc(function(){
                _this.zhankai = true;
                btn_closeCaidan.setVisible(true);
                _this.btn_exit.setTouchEnabled(true);
            })))
        });
        gameclass.createbtnpress(this.node, "btn_exitCaidan", function () {
            _this.btn_exitCaidan();
        });
        gameclass.createbtnpress(this.node, "btn_xiaoxi", function () {
            var chair = _this.getPlayerChairID(_this.mod_king.logindata.uid);
            if(chair >= 0){
                _this.game.uimgr.showui("gameclass.chatuinew");
                _this.game.uimgr.uis["gameclass.chatuinew"].setBZWmod(_this.mod_king,_this.mod_king.logindata.sex);
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
                    _this.mod_king.sendWuzuo();
                    ccui.helper.seekWidgetByName(_this.node,"btn_wuzuo").setTouchEnabled(true);
                },_this.node,_this);
            }else{
                //if(!_this.zhankai1) return;
                //ccui.helper.seekWidgetByName(_this.node,"btn_wuzuo").setTouchEnabled(false);
                _this.game.uimgr.uis["wzui"].closewz();
            }
        });
        gameclass.createbtnpress(this.node, "btn_xiazhuang", function () {
            _this.mod_king.sendDownDeal();
        });
        gameclass.createbtnpress(this.node, "btn_bangzhu", function () {
            _this.helpNode.setVisible(true);
            _this.btn_exitCaidan();
        });
        gameclass.createbtnpress(this.node, "helpInfo", function () {
            _this.helpNode.setVisible(false);
        });
        gameclass.createbtnpress(this.node, "btn_shop", function () {
            _this.game.uimgr.showui("gameclass.goldShop");
        });

        ccui.helper.seekWidgetByName(this.node,"zhuangIcon").addTouchEventListener(function(sender,type){
            if(type != ccui.Widget.TOUCH_ENDED) return;
            _this.addMask(1);
            var isSystem = false;
            if(_this.saveZhuangInfo.uid == 0){
                isSystem = true;
            }
            _this.getPlayerInfo(_this.saveZhuangInfo,_this.mod_king,isSystem);

        })
        gameclass.createbtnpress(this.node,"btn_huanfu",function(){
            _this.game.uimgr.showui("gameclass.bank").setEnterance(1);
        })

        gameclass.createbtnpress(this.node,"btn_zoushi",function(){
            _this.game.uimgr.showui("ebgRecordUi").setBaseInfo(_this.recordArr);
        })
        gameclass.createbtnpress(this.node,"btn_help",function(){
            _this.helpNode.setVisible(true);
            _this.btn_exitCaidan();
        })
    },

    show:function(){
        cc.spriteFrameCache.addSpriteFrames(res.ebgchipPlist);
        cc.spriteFrameCache.addSpriteFrames(res.ebgdianPlist);
        this.node = this.game.uimgr.createnode(res.erbagangTable,true);
        this.addChild(this.node);
        this.batchSP = cc.SpriteBatchNode.create(res.ebgchipPng);
        this.node.addChild(this.batchSP);
        this.betsLayer = ccui.helper.seekWidgetByName(this.node,"betsLayer");

        this.clockSpine = new sp.SkeletonAnimation(res.jsontouzhong, res.atlastouzhong);
        this.clockSpine.setAnchorPoint(0.5, 0.5);
        this.clockSpine.setPosition(1136/2,320);
        this.clockSpine.setVisible(false);
        this.node.addChild(this.clockSpine);

        //大赢家头像
        this.winLayout = new ccui.Layout();
        this.winLayout.setAnchorPoint(0.5,0.5);
        this.winLayout.setPosition(1136/2,320);
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
        this.winName.setColor(cc.color(255,255,255));
        this.winLayout.addChild(this.winName);


        this.start = ccui.helper.seekWidgetByName(this.node,"start");
        this.start.setVisible(false);
        this.startIMG = ccui.helper.seekWidgetByName(this.node,"startIMG");


        this.clock = ccui.helper.seekWidgetByName(this.node,"clock");
        this.clock.setVisible(true);
        this.time = this.clock.getChildByName("time");
        this.time.ignoreContentAdaptWithSize(true);


        this.rankTool = new gameclass.mod_ranking();
        //this.btn_xuya = ccui.helper.seekWidgetByName(this.node,"btn_bets5");
        this.helpNode = ccui.helper.seekWidgetByName(this.node,"helpInfo");
        this.helpNode.setVisible(false);
        this.nextLayout = ccui.helper.seekWidgetByName(this.node,"nextLayout");
        this.nextLayout.setVisible(false);
        mod_sound.playbmg(g_music["brttz_bg"],true);
        this.maskChipLayer = ccui.helper.seekWidgetByName(this.node,"maskChipLayer");
        this.maskChipLayer.setVisible(false);

        this.myMoneyText = ccui.helper.seekWidgetByName(this.node,"gold");
        this.btn_shangzhuang = ccui.helper.seekWidgetByName(this.node,"btn_shangzhuang");
        this.btn_xiazhuang = ccui.helper.seekWidgetByName(this.node,"btn_xiazhuang");

        this.demoNodeArr = [];
        for(var i = 0;i < 4;i++){
            this.cardNode[i] = ccui.helper.seekWidgetByName(this.node,"cardNode"+i);
            this.resultPointSp[i] = this.cardNode[i].getChildByName("dian");
            this.resultPointSp[i].setVisible(false);
            this.demoNodeArr[i] = ccui.helper.seekWidgetByName(this.node,"demoNode"+i);
            this.demoNodeArr[i].setVisible(false);
        }

        this.orginalPos = this.demoNodeArr[0].getPosition();
        //聊天
        this.talkPos = [];
        for(var i = 0;i < 13;i++){
            this.talkPos[i] = ccui.helper.seekWidgetByName(this.node,"talkposNode").getChildren()[i].getPosition();
        }

        if(!cc.sys.localStorage.getItem("enterTip")){
            //本地记录。第一次进来会提示helpNode
            cc.sys.localStorage.setItem("enterTip", JSON.stringify({"save": 1}));
            this.helpNode.setVisible(true);
        }

        this.node.update= this.updateTime.bind(this);
        this.node.scheduleUpdate();
    },
    getPlayerInfo:function(data,mod_game,isSystem){
        if(data.uid == 0){
            this.game.uimgr.showui("gameclass.chatMicLayer").setBRTTZinfo(data,mod_game,isSystem);
        }else{
            this.rankTool.getPlayerInfo(data.uid,function(retdata){
                data.sign = retdata.sign;
                this.game.uimgr.showui("gameclass.chatMicLayer").setBRTTZinfo(data,mod_game,isSystem);
            })
        }
    },
    getTime:function(time){
        this.clock.setVisible(true);
        this.overTime = parseInt(new Date().getTime()) + time*1000;
    },
    updateroominfo:function(data){
        this.myGold = data.total;
        //cc.log(this.mod_king.roominfo.type);
        this.betsArr = [10,20,50,100,200];
        if(this.myGold >= 10000){
            this.betsArr = [50,100,200,500,1000];
        }
        //设置筹码的TEXT
        for(var i = 0;i < 5;i++){
            this.btn_bets[i].getChildren()[0].setString(this.betsArr[i]);
            this.btn_bets[i].loadTextureNormal(res["betchip"+this.betsArr[i]],ccui.Widget.LOCAL_TEXTURE);
        }
        this.recordArr = data.trend;
        this.nextArr = data.result;
        this.initMyInfo(data.total);
        this.setBetImg();
        this.initSeatInfo(data.info);
        this.initZhuangInfo(data.dealer);
        this.checkZhuangBTN(data.isdeal);
        this.getTime(data.time);
        this.playBetsMusic();
        if(data.time <= 21){
            this.gameBegin = true;
            ccui.helper.seekWidgetByName(this.node,"clickLayer").setPositionY(30);
            this.initTableCard(data.result);
            this.initTableBet(data.bets);
        }else{
            ccui.helper.seekWidgetByName(this.node,"clickLayer").setPositionY(10);
            this.gameBegin = false;
            this.nextLayout.setVisible(true);
        }
        this.seatPlayer = data.info;
        for(var i = 0;i < this.betsLayer.getChildrenCount();i++){
            this.reflashBet(i,data.bets[i]);
            this.myBet[i] = data.bets[i];
            ccui.helper.seekWidgetByName(this.btn_sendBets[i],"mybet").setString(this.myBet[i]);
        }
    },
    initTableCard:function(card){
        for(var i = 0;i < card.length;i++){
            for(var j = 0;j < 2;j++){
                this.cardSpArr[i][j] = this.createCard(card[i][j],!j);
                if(j == 0) this.cardSpArr[i][j].setPositionX(-45);
                else this.cardSpArr[i][j].setPositionX(45);
                this.cardNode[i].addChild(this.cardSpArr[i][j]);
            }
        }
    },
    initMyInfo:function(total){
        var head = ccui.helper.seekWidgetByName(this.node,"myIcon");
        gameclass.mod_base.showtximg(head,this.mod_king.logindata.imgurl, -4 , 0,"im_headbg9", false);
        ccui.helper.seekWidgetByName(this.node,"name").setString(this.mod_king.logindata.name || "游客");
        ccui.helper.seekWidgetByName(this.node,"gold").setString(gameclass.changeShow(total));
    },
    initSeatInfo:function(playerInfo){
        for(var i = 0;i < playerInfo.length;i++){
            if(playerInfo[i].uid > 0){
                this.headNodeArr[i].setVisible(true);
                var head = this.headNodeArr[i].getChildByName("headBg");
                gameclass.mod_base.showtximg(head,playerInfo[i].head, -4, 0,"im_headbg9", false);
                ccui.helper.seekWidgetByName(this.headNodeArr[i],"playerName").setString(playerInfo[i].name);
                ccui.helper.seekWidgetByName(this.headNodeArr[i],"playerMoney").setString(gameclass.changeShow(playerInfo[i].total));
            }else{
                this.headNodeArr[i].setVisible(false);
            }
        }
    },
    initTableBet:function(betsArr){
        for(var i = 0;i < betsArr.length;i++){
            this.everyBoxBet[i] = betsArr[i];
            this.reflashBet(i,this.everyBoxBet[i]);
            var chipArr = this.getChipArr(betsArr[i]);
            for(var j = 0;j < chipArr.length;j++){
                this.createChip(chipArr[j],i);
            }
        }
    },
    reflashBet:function(index,_bet){
        if(_bet >= 10000){
            this.wanText[index].setVisible(true);
            var money = (_bet - _bet%1000)/10000;
            this.showBetText[index].setString(money);
        }else{
            this.wanText[index].setVisible(false);
            this.showBetText[index].setString(_bet);
        }
    },

    getChipArr:function(allChip){
        var resultArr = [];
        var chipArr = [1000,500,200,100,50,20,10];

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
        var chipSp = new gameclass.bzwChip("ebgchip",num);
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
    initZhuangInfo:function(zhuangInfo){
        this.zhuangInfo = zhuangInfo;
        this.saveZhuangInfo = zhuangInfo;//显示数据
        gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(this.node,"zhuangIcon"),
            zhuangInfo.uid?zhuangInfo.head:"res/im_headbg11.png", -6, -9 ,"im_headbg12", false);
        ccui.helper.seekWidgetByName(this.node,"zhuangName").setString(zhuangInfo.name || "小仙女");
        ccui.helper.seekWidgetByName(this.node,"zhuangMoney").setString(gameclass.changeShow(zhuangInfo.total));
    },
    getZhuanginfo:function(data){
        this.isRefalshZhuang = true;
        this.zhuangInfo = data;
    },
    onSeat:function(data){
        if(data.uid > 0){
            this.seatPlayer[data.index] = data;
            this.headNodeArr[data.index].setVisible(true);
            gameclass.mod_base.showtximg(this.headNodeArr[data.index].getChildByName("headBg"),data.head, -4 ,0,"im_headbg9",false);
            ccui.helper.seekWidgetByName(this.headNodeArr[data.index],"playerName").setString(data.name);
            ccui.helper.seekWidgetByName(this.headNodeArr[data.index],"playerMoney").setString(gameclass.changeShow(data.total));
        }else{
            this.seatPlayer[data.index].uid = 0;
            this.headNodeArr[data.index].setVisible(false);
        }
    },
    reflashZhuangInfo:function(){
        if(!this.isRefalshZhuang){
            return;
        }
        var zhuangIcon = ccui.helper.seekWidgetByName(this.node,"zhuangIcon");
        //this.createSpine("ebgzc",cc.p(zhuangIcon.getPositionX(),zhuangIcon.getPositionY()-320));
        var data = this.zhuangInfo;
        this.saveZhuangInfo = data;
        gameclass.mod_base.showtximg(zhuangIcon, data.uid?data.head:"res/im_headbg11.png", -6 , -9 ,"im_headbg12", false);
        ccui.helper.seekWidgetByName(this.node,"zhuangName").setString(data.name || "小仙女");
        ccui.helper.seekWidgetByName(this.node,"zhuangMoney").setString(gameclass.changeShow(data.total));

        if(data.uid != this.mod_king.logindata.uid){//如果我不是上庄的人
            if(this.isOnRobList){
                this.btn_shangzhuang.setVisible(false);
                this.btn_xiazhuang.setVisible(true);
            }else{
                this.btn_shangzhuang.setVisible(true);
                this.btn_xiazhuang.setVisible(false);
            }
        }else{
            this.btn_shangzhuang.setVisible(false);
            this.btn_xiazhuang.setVisible(true);
        }
    },
    createCard:function(card,up) {
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
        return cardSprite;
    },
    openPokerAction:function(card,texture1,texture2,_callBack){
        mod_sound.playeffect(g_music["brttz_opencard"],false);
        var scaleXIndex=1;
        var offset=0.15;
        if(!card) return;//长时间挂在后台可能会报错
        var _pos=card.getPosition();
        card.setScale(scaleXIndex,1);
        var that=this;
        var callBack=function(dt){
            scaleXIndex-=offset;
            card.setScale(scaleXIndex,1);
            if(Math.abs(scaleXIndex-0)<offset){
                offset=-offset;
                card.setTexture(texture1);
                card.getChildByTag(1).setVisible(true);
                card.getChildByTag(1).setTexture(texture2);
            }
            if(scaleXIndex>1){
                card.setPosition(_pos);
                card.unschedule(callBack);
                card.setScale(1);
                if(_callBack){
                    _callBack();
                }
            }
        }
        card.schedule(callBack,0.016);
    },
    showdiannum:function(index) {
        this.resultPointSp[index].setVisible(true);
        this.resultPointSp[index].setTexture(this.resArr[index]);
        this.resultPointSp[index].setScale(3);
        var _this = this;
        this.resultPointSp[index].runAction(cc.sequence(cc.scaleTo(0.5,1,1),cc.callFunc(function(sender){
            if(index == 3){
                var state = _this.getZhuangEndState();
                if(state > 0){
                    _this.createSpine("ebgendAnim"+state,cc.p(1136/2,320));
                    //mod_sound.playeffect(g_music["brttz_endsound"+state],false);
                }
            }
            _this.showPointAnim(index);
        },this.resultPointSp[index])));
    },
    checkWinIndex:function(){
        var winArr = [];
        for(var i = 1;i < 4;i++){
            this.recordArr[i-1].pop();

            if(this.endResultArr[i] > this.endResultArr[0] ){
                winArr.push(i-1);
                this.recordArr[i-1].unshift(1);
            }else if(this.endResultArr[i] == this.endResultArr[0]){
                if(this.endResultArr[i] == 400){
                    if(this.windata.result[i][0] > this.windata.result[0][0] ){
                        winArr.push(i-1);
                        this.recordArr[i-1].unshift(1);
                    }else{
                        this.recordArr[i-1].unshift(0);
                    }
                }else{
                    this.recordArr[i-1].unshift(0);
                }
            }else{
                this.recordArr[i-1].unshift(0);
            }
        }
        return winArr;
    },
    //动画时间
    onEnd:function(data){
        //data.result = [[14,14],[11,12],[15,15],[13,13]];
        this.endResultArr = [];
        this.resArr = [];
        this.openTimeArr = [];
        this.nextArr = data.next;
        this.windata = data;
        this.allWin = 0;
        var _this = this;
        this.finishNum = 0;
        this.gameBegin = false;
        //统计闲家一共赢多少钱
        for(var i = 0;i < this.endSeatState.length;i++){
            if(this.endSeatState[i].uid != 0 && this.endSeatState[i].uid != this.saveZhuangInfo.uid){
                if(this.endSeatState[i].win > 0){
                    this.allWin += this.endSeatState[i].win;
                }
            }
        }
        //
        for(var i = 0;i < 4;i++){
            this.getRewardType(data.result[i][0],data.result[i][1]);
        }
        //
        this.rewardArr = this.checkWinIndex();

        var callBack = function(){
            if(_this.finishNum >= 4){
                _this.showBlink(_this.rewardArr,function(){
                    _this.endFiyChip();
                });
            }else{
                var sp = _this.cardSpArr[_this.finishNum][1];
                _this.openPokerAction(sp, res.ttz_bg_frontcard,res["ttz_card_"+data.result[_this.finishNum][1]],function(){
                    _this.node.runAction(cc.sequence(cc.delayTime(0.6),cc.callFunc(function(){
                        _this.openTimeArr.push(new Date().getTime());
                        var canPlay = _this.checkIsPlay(_this.openTimeArr,0.5);
                        if(canPlay){
                            _this.showdiannum(_this.finishNum);
                            _this.finishNum++;
                            callBack();
                        }
                    })))
                });
            }
        }
        this.noticeAnim(0,callBack);
    },

    //nameStr:骨骼动画的名称,pos:加到父节点的位置
    //有的骨骼动画已经设置好位置。就不用设置位置
    createSpine:function(nameStr,pos){
        if(!this[nameStr]){
            this[nameStr] = new sp.SkeletonAnimation(res[nameStr+"json"], res[nameStr+"atlas"]);
            this.node.addChild(this[nameStr]);
            if(pos){
                this[nameStr].setPosition(pos);
            }
        }else{
            this[nameStr].setVisible(true);
        }
        this[nameStr].setAnimation(0, 'animation', false);
        var _this = this;
        this[nameStr].setEndListener(function(){
            _this[nameStr].setVisible(false);
        })
    },

    getZhuangEndState:function(){
        var endstate = 0;
        if(this.rewardArr.length == 0){
            endstate = 1;
        }else if(this.rewardArr.length == 3){
            endstate = 2;
        }
        return endstate;
    },

    getRewardType:function(cardnum1,cardnum2){
        var respath = "";
        if(cardnum1 == cardnum2){
            if(cardnum1 == 37){
                respath = res.ttz_stzz;
                this.endResultArr.push(500);
            }
            else{
                respath = res.ttz_baozi;
                this.endResultArr.push(400);
            }
        }
        else{
            var tts = cardnum1 + cardnum2;
            var strname = "";
            if(tts == 30){
                if(cardnum1 == 12 || cardnum2 == 12){
                    respath = res.ttz_ebg;
                    this.endResultArr.push(300);
                }else{
                    respath = res.ttz_nod;
                    this.endResultArr.push(0);
                }
            }
            else if(tts >= 48) {
                tts = (tts-37-10)*10+5;
                strname = "ttz_img"+tts;
                respath = res[strname];
                this.endResultArr.push(tts);
            }
            else{
                if(tts < 30) tts = tts-20;
                else tts = tts-30;
                strname = "ttz_img"+tts*10;
                respath = res[strname];
                this.endResultArr.push(tts*10);
            }
        }
        this.resArr.push(respath);
    },

    showPointAnim:function(index){
        if(index == 0) return;
        var play = false;
        for(var i = 0;i < this.rewardArr.length;i++){
            if(index-1 == this.rewardArr[i] ){
                play = true;
            }
        }
        if(!play) return;
        var num = this.endResultArr[index];
        var bei = 0;
        if(num == 500) bei = 20;
        else if(num == 400) bei = 15;
        else if(num == 300) bei = 12;
        else {
            bei = parseInt(num/10);
        }
        this.resultBeiLvSp[index-1].setVisible(true);
        this.resultNode = this.resultBeiLvSp[index-1];
        this.resultNode.setVisible(true);
        this.resultNode.getChildren()[0].setVisible(true);
        this.resultNode.getChildren()[0].setScale(0.2);
        var _this = this;
        this.resultNode.getChildren()[0].runAction(cc.sequence(cc.scaleTo(0.2,1,1),cc.callFunc(function(){
            _this.resultNode.getChildren()[1].setVisible(true);
            _this.resultNode.getChildren()[1].setScale(0.2);
            _this.resultNode.getChildren()[1].setString(bei);
            _this.resultNode.getChildren()[1].setPositionX(_this.resultNode.getChildren()[0].getPositionX() + _this.resultNode.getChildren()[0].width/2+20);
            _this.resultNode.getChildren()[1].runAction(cc.sequence(cc.scaleTo(0.3,1.2,1.2),cc.scaleTo(0.1,1,1),cc.callFunc(function(){
                _this.resultNode.getChildren()[2].setVisible(true);
                _this.resultNode.getChildren()[2].setPositionX(_this.resultNode.getChildren()[1].getPositionX()+
                    _this.resultNode.getChildren()[1].width/2 +_this.resultNode.getChildren()[2].width/2+10);
            })));
        })))
    },

    showBlink:function(winArr,func){
        var _this = this;
        if(winArr.length == 0){
            func();
            return;
        }
        var play = false;
        for(var i = 0;i < winArr.length;i++ ){
            var sp = this.betsLayer.getChildren()[winArr[i]].getChildByTag(1111);
            sp.setVisible(true);
            sp.runAction(cc.sequence(cc.blink(1,3),cc.callFunc(function(sender){
                if(!play){
                    play = true;
                    func();
                }
                sender.setVisible(false);
            },sp)))
        }
    },

    endFiyChip:function(){
        var _this = this;
        var zhuangPos = ccui.helper.seekWidgetByName(this.node,"zhuangIcon").getPosition();
        var a = 0;
        for(var i = 0;i < this.chipLayer.getChildrenCount();i++){
            var sp = this.chipLayer.getChildren()[i];
            if(this.rewardArr.indexOf(sp.index) < 0){
                if(a == 0){
                    mod_sound.playeffect(g_music["flycoins"]);
                }
                a++;
                sp.setChipMove(0.5,sp.getPosition(),zhuangPos,1);//飞向庄家
            }else{
                sp.runAction(cc.sequence(cc.delayTime(0.5),cc.moveTo(0.5,cc.p(1136/2,320)),cc.callFunc(function(sender){//移动到桌子中间
                    sender.removeFromParent();
                },sp)))
            }
        }
        var _this=this;

        this.node.scheduleOnce(function(){
            //金币飞向坐着的人
            for(var i = 0;i < _this.endSeatState.length;i++){
                if(_this.endSeatState[i].win > 0 && _this.endSeatState[i].uid != 0 && _this.endSeatState[i].uid != _this.saveZhuangInfo.uid){
                    var chiar = _this.getPlayerIndexByID(_this.endSeatState[i].uid);
                    var arr = _this.createJiaChip(_this.endSeatState[i].win);
                    var endPos = _this.getheadPos(chiar);
                    _this.flyToHead(arr,endPos,_this.endSeatState[i].win);
                }
            }
            //金币飞向游客
            var total = 0;
            for(var i = 0;i < _this.rewardArr.length;i++){
                total += Number(_this.everyBoxBet[_this.rewardArr[i]]);
            }
            if(total > 0){
                var endPos = cc.p(0,320);
                for(var i = 0;i < 20;i++){
                    var sp = new cc.Sprite();
                    sp.initWithSpriteFrameName("ebgchip"+100+".png");
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
                if(chair == 1000){
                    headNode = ccui.helper.seekWidgetByName(_this.node,"zhuangIcon");
                }else if(chair >= 0){
                    headNode = _this.headNodeArr[chair];
                    _this.seatPlayer[chair].total = _this.endSeatState[i].total;
                }
                //刷新桌面上人的金币显示
                if(headNode){
                    if(chair == 1000)
                        headNode.getChildren()[1].setString(gameclass.changeShow(_this.endSeatState[i].total));
                    else
                        headNode.getChildren()[1].getChildren()[1].setString(gameclass.changeShow(_this.endSeatState[i].total));
                }
                if(_this.endSeatState[i].uid == _this.mod_king.logindata.uid){
                    _this.myGold = _this.endSeatState[i].total;
                    _this.reflashMyMoeny();
                    _this.setBetImg();
                }
                //播放庄输赢音效
                if(_this.endSeatState[i].uid == _this.saveZhuangInfo.uid){
                    if(_this.saveZhuangInfo.sex != 1 || _this.saveZhuangInfo.uid == 0){
                        if(_this.endSeatState[i].total > 0){
                            var randomNum = parseInt(Math.random()*2);
                            mod_sound.playeffect(g_music["brttz_laugh"+randomNum],false);
                        }else if(_this.endSeatState[i].total < 0){
                            mod_sound.playeffect(g_music["brttz_lose"],false);
                        }
                    }else{
                        if(_this.endSeatState[i].total > 0){
                            var randomNum = parseInt(Math.random()*3);
                            mod_sound.playeffect(g_music["laugh"+randomNum],false);
                        }else if(_this.endSeatState[i].total < 0){
                            var randomNum = parseInt(Math.random()*2);
                            mod_sound.playeffect(g_music["lose"+randomNum],false);
                        }
                    }

                }
            }

            //大赢家动画
            _this.node.scheduleOnce(function(){
                if(_this.windata.uid != 0 && _this.windata.uid != _this.saveZhuangInfo.uid){
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
        for(var i = 0;i < Math.ceil(win*5/this.allWin);i++){
            var sp = new gameclass.bzwChip("ebgchip",100);
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

    //跟据ID获取12个座位上人的座位号
    getPlayerChairID:function(uid){
        for(var i = 0;i < this.seatPlayer.length;i++){
            //座位上的位置
            if(uid == this.seatPlayer[i].uid && uid != this.saveZhuangInfo.uid){
                return i;
            }
            //庄位置
            if(uid == 0 || uid == this.saveZhuangInfo.uid){
                return 1000;
            }
        }
        //游客位置
        return -1;
    },

    getPlayerIndexByID:function(uid){
        for(var i = 0;i < this.seatPlayer.length;i++){
            //座位上的位置
            if(uid == this.seatPlayer[i].uid && uid != this.saveZhuangInfo.uid && uid != this.mod_king.logindata.uid){
                return i;
            }
            //庄位置
            if(uid == 0 || uid == this.saveZhuangInfo.uid){
                return 1000;
            }
            //自己头像位置
            if(uid == this.mod_king.logindata.uid){
                return -2;
            }
        }
        //游客位置
        return -1;
    },

    reflashMyMoeny:function(){
        this.myMoneyText.setString(this.myGold);
    },
    reflashPlayerMoney:function(data){
        for(var i = 0;i < this.seatPlayer.length;i++){
            if(data.uid == this.seatPlayer[i].uid){
                this.seatPlayer[i].total = data.total;
                ccui.helper.seekWidgetByName(this.headNodeArr[i],"playerMoney").setString(gameclass.changeShow(data.total));
                break;
            }
        }
        if(data.uid == this.saveZhuangInfo.uid){
            ccui.helper.seekWidgetByName(this.node,"zhuangMoney").setString(gameclass.changeShow(data.total));
        }else if(data.uid == this.mod_king.logindata.uid){
            this.myGold = data.total;
            ccui.helper.seekWidgetByName(this.node,"gold").setString(gameclass.changeShow(data.total));
        }
    },
    onPlayerBet:function(data){
        if(data.gold == 0) return;
        var chair = -1;//-1表示无座玩家飞金币的位置
        if(data.uid == this.mod_king.logindata.uid){
            chair = -2;//-2表示自己头像飞金币的位置
            this.myGold -= data.gold;
            this.reflashMyMoeny();
            this.setBetImg();
            this.myBet[data.index] += data.gold;
            ccui.helper.seekWidgetByName(this.btn_sendBets[data.index],"mybet").setString(this.myBet[data.index]);
        }else{
            for(var i = 0;i < this.seatPlayer.length;i++){
                if(data.uid == this.seatPlayer[i].uid && data.uid != this.mod_king.logindata.uid ){
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
                break;
            }
        }
        this.fiyChip(chair,data.index,data.gold);
        this.everyBoxBet[data.index] += data.gold;
        this.reflashBet(data.index,this.everyBoxBet[data.index]);

        var index = this.getPlayerChairID(data.uid);
        if(index < 0) return;
        if(this.headNodeArr[index].isActing) return;
        this.headNodeArr[index].isActing = true;
        var normal = cc.pNormalize(this.seatAngle[i]);
        var act = cc.moveBy(0.1,cc.p(30*normal.x,30*normal.y));
        this.headNodeArr[index].runAction(cc.sequence(act,act.reverse(),cc.callFunc(function(sender){
            sender.isActing = false;
        },this.headNodeArr[index])));
    },

    //续压
    onLastBets:function(data){
        for(var i = 0;i  < 3;i++){
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
    fiyChip:function(chair,index,gold){
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
        this.reflashZhuangInfo();//更新庄的信息。可能换人了
        this.isRefalshZhuang = false;
        this.nextLayout.setVisible(false);
        this.gameBegin = true;
        this.setBetImg();
        this.endSeatState = [];
        for(var i = 0; i < 3;i++){
            this.everyBoxBet[i] = 0;
            this.showBetText[i].setString("0");
            this.wanText[i].setVisible(false);
            this.curChipNum[i] = 0;
            this.myBet[i] = 0;
            ccui.helper.seekWidgetByName(this.btn_sendBets[i],"mybet").setString("0");
            for(var j = 0;j < 3;j++){
                this.resultBeiLvSp[i].setVisible(false);
                this.resultBeiLvSp[i].getChildren()[j].setVisible(false);
            }
        }
        for(var i = 0;i < 4;i++){
            for(var j = 0;j<2;j++){
                if(this.cardSpArr[i][j]){
                    this.cardSpArr[i][j].setVisible(false);
                    this.cardSpArr[i][j].setTexture(res.ttz_bg_backcard);
                    this.cardSpArr[i][j].getChildByTag(1).setVisible(false);
                }
                this.cardNode[i].getChildByName("dian").setVisible(false);
            }
        }
        this.openTimeArr = [];
        this.dealCardAnim();//开局动画
    },

    dealCardAnim:function(){
        var _this = this;
        //this.dealfinishNum = 0;
        var startPos = _this.node.convertToNodeSpace(_this.orginalPos);
        var endPos = [];
        var play = false;

        //可能
        var saveArr = this.nextArr.slice(0);

        for(var i = 0;i < 4;i++){
            this.demoNodeArr[i].setVisible(true);
            this.demoNodeArr[i].index = i;
            endPos[i] = cc.p(_this.cardNode[i].getPositionX()-45,_this.cardNode[i].getPositionY());
            _this.demoNodeArr[i].runAction(cc.sequence(cc.spawn(cc.scaleTo(0.2,0.8,0.8),cc.moveTo(0.2,endPos[i])),cc.callFunc(function(sender){
                sender.setVisible(false);
                sender.setPosition(_this.orginalPos);
                sender.setScale(0.4);

                if(_this.cardSpArr[sender.index].length > 0){
                    for(var k = 0;k < 2;k++){
                        _this.cardSpArr[sender.index][k].setVisible(true);
                        if(k==0) _this.cardSpArr[sender.index][k].setPosition(-45,0);
                        else _this.cardSpArr[sender.index][k].setPosition(-45,18);
                    }
                }else{
                    for(var k = 0;k < 2;k++){
                        var sp = _this.createCard(0,0);
                        if(k==0) sp.setPosition(-45,0);
                        else sp.setPosition(-45,18);
                        _this.cardSpArr[sender.index][k] = sp;
                        _this.cardNode[sender.index].addChild(sp);
                    }
                }


                _this.node.runAction(cc.sequence(cc.delayTime(0.3),cc.callFunc(function(){
                    _this.cardSpArr[sender.index][1].runAction(cc.sequence(cc.moveTo(0.2,cc.p(45,0)),cc.callFunc(function(){
                        _this.openPokerAction(_this.cardSpArr[sender.index][0],res.ttz_bg_frontcard,
                            res["ttz_card_"+saveArr[sender.index][0]],function(){
                                if(!play){
                                    _this.noticeAnim(1);
                                    play = true;
                                }
                            })
                    })))
                })))

            },_this.demoNodeArr[i])));
        }
    },


    //切后台的处理
    checkIsPlay:function(arr,checkTime){
        var len = arr.length;
        var canPlay = true;
        if(len > 1){
            canPlay = false;
            //cc.log((arr[len-1]-arr[len-2])/1000);
            if((arr[len-1]-arr[len-2])/1000 > checkTime){
                canPlay = true;
            }
        }
        return canPlay;
    },

    noticeAnim:function(type,func){
        this.start.setVisible(true);
        //买定离手
        if(type == 0){
            this.startIMG.setTexture(res.ebgmdls);
            this.clock.setVisible(false);
            if(this.saveZhuangInfo.sex != 1 || this.saveZhuangInfo.uid == 0){
                mod_sound.playeffect(g_music["brttz_mdls"],false);
            }else{
                mod_sound.playeffect(g_music["kpTip"],false);
            }
            ccui.helper.seekWidgetByName(this.node,"clickLayer").setPositionY(10);
        }else{
            this.clock.setVisible(true);
            this.startIMG.setTexture(res.ebgqxz);
            if(this.saveZhuangInfo.sex != 1 || this.saveZhuangInfo.uid == 0){
                mod_sound.playeffect(g_music["brttz_xztip"],false);
            }else{
                mod_sound.playeffect(g_music["xzTip"],false);
            }
            ccui.helper.seekWidgetByName(this.node,"clickLayer").setPositionY(30);
            for(var i = 0;i < 3;i++){
                var sp = this.btn_sendBets[i].getChildByTag(1111);
                sp.setVisible(true);
                sp.runAction(cc.sequence(cc.delayTime(1.5),cc.callFunc(function(sender){
                    sender.setVisible(false);
                },sp)));
            }
        }
        this.startIMG.x = 23;
        var _this = this;
        this.startIMG.runAction(cc.sequence(cc.moveTo(0.2,cc.p(231,66)),cc.scaleTo(0.15,1.2,1.2),
            cc.scaleTo(0.15,1,1),cc.moveTo(0.2,cc.p(438,66)),cc.callFunc(function(){
                _this.start.setVisible(false);
                if(func) func();
            })));
    },

    checkIsOnSeat:function(){
        var isOnSeat = false;
        for(var i = 0;i < this.seatPlayer.length;i++ ){
            if(this.seatPlayer[i].uid == this.mod_king.logindata.uid){
                isOnSeat = true;
                break;
            }
        }
        return isOnSeat;
    },

    playBetsMusic:function(){
        var _this = this;
        var callBack = function(){
            if(_this.curTime > 22){
                return;
            }
            if(_this.saveZhuangInfo.sex != 1 || _this.saveZhuangInfo.uid == 0){
                var randomNum = parseInt(Math.random()*7);
                mod_sound.playeffect(g_music["brttz_xz"+randomNum],false);
            }else{
                var randomNum = parseInt(Math.random()*6);
                mod_sound.playeffect(g_music["xz"+randomNum],false);
            }
        }
        this.schedule(callBack,5);
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
            chair = 12;
        }
        var talkPos = _this.talkPos[chair];
        var arr = [
            res.chatbg_rd,res.chatbg_rd,res.chatbg_rd,res.chatbg_rd,
            res.chatbg_ud,res.chatbg_ud,res.chatbg_ud1,res.chatbg_ud1,
            res.chatbg_ld,res.chatbg_ld,res.chatbg_ld,res.chatbg_ld,
            res.chatbg_ud1
        ];
        if(data.type < 4){
            var _node = new ccui.Layout();
            var s9 = null;
            if (data.type == 1) {
                s9 = new cc.Scale9Sprite(arr[chair]);
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
                var spine = new sp.SkeletonAnimation(g_chat_expression["expression"+index+"_json"],g_chat_expression["expression"+index+"_atlas"]);
                spine.setAnimation(0, 'animation', false);
                spine.setAnchorPoint(0.5, 0.5);

                s9 = new ccui.Layout();
                s9.setContentSize(110, 100);
                s9.setBackGroundImage(arr[chair]);
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
            if (chair >= 0 && chair < 6) {
                _node.setPosition(talkPos.x -  s9.width, talkPos.y);
            } else{
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
        }else if(index == 1000){//庄位置
            endPos = ccui.helper.seekWidgetByName(this.node,"zhuangIcon").getPosition();
        }
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

    setBetImg:function(){
        if(this.myGold >= 10000){
            this.betsArr = [50,100,200,500,1000];
        }else{
            this.betsArr = [10,20,50,100,200];
        }
        for(var i = 0;i < 5;i++){
            if(i == this.selectBet){
                this.btn_bets[i].setScale(1.2);
                this.btn_bets[i].setPositionY(50);
            }else{
                this.btn_bets[i].setScale(1);
                this.btn_bets[i].setPositionY(40);
            }
            this.btn_bets[i].getChildByName("guang").setVisible(i==this.selectBet);
            this.btn_bets[i].loadTextureNormal(res["betchip"+this.betsArr[i]],ccui.Widget.LOCAL_TEXTURE);
            this.btn_bets[i].getChildren()[0].setString(this.betsArr[i]);
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
        if(chair>=0 && chair != 1000){
            return this.seatPlayer[chair];
        }else if(chair == 1000){
            return this.saveZhuangInfo;
        }
    },

    checkZhuangBTN:function(_isdeal){
        this.btn_shangzhuang.setVisible(!_isdeal);
        this.btn_xiazhuang.setVisible(_isdeal);
    },

    shangxiaZhuang:function(data){
        if(data.type == 0){//上庄
            this.game.uimgr.showui("szui").setBaseInfo(data);
            this.isOnRobList = true;
            this.btn_shangzhuang.setVisible(false);
            this.btn_xiazhuang.setVisible(true);
        } else{//下庄
            this.isOnRobList = false;
            this.btn_shangzhuang.setVisible(true);
            this.btn_xiazhuang.setVisible(false);
        }
    },

    updateTime:function(){
        var curTime = this.overTime - parseInt(new Date().getTime());
        this.curTime = Math.ceil(curTime/1000);
        this.time.setString(this.curTime < 10 ? "0" + this.curTime : this.curTime);
        if(this.curTime <= 0){
            this.clock.setVisible(false);
        }

        if(this.gameBegin) return;
        if(curTime / 1000 < 21){
            this.startGame();
        }
    },

});

var ebgRecordUi = gameclass.baseui.extend({
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.ebgRecord, true);
        this.addChild(this.node);

        var _this = this;
        ccui.helper.seekWidgetByName(this.node,"Panel_1").addTouchEventListener(function(sender,type){
            if(type != ccui.Widget.TOUCH_ENDED) return;
            _this.game.uimgr.closeui("ebgRecordUi");
        })
    },
    setBaseInfo:function(data){
        for(var i = 0;i < data.length;i++){
            for(var j = 0;j < 8;j++){
                var sp = ccui.helper.seekWidgetByName(this.node,"bg").getChildren()[i].getChildren()[j];
                if(data[i][j] == 0) sp.setTexture(res.ebglose);
            }
        }
    },
})




