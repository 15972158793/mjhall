/**
 * Created by Administrator on 2017-11-15.
 */

gameclass.sxdbTable = gameclass.baseui.extend({
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
    beautyNum:300000,
    gameBegin:false,
    saveZhuangInfo:null,
    canBet:false,

    resultAcount:0,
    isRunning:false,
    gameStyle:0,

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
        this.selectBet = 0;
        this.needZhuangMoney = 0;
        this.needSeatMoney = 0;
        this.talkPos = [];
        this.wanText = [];
        this.seziSp = [];
        //每个格子里筹码的上限
        this.curChipNum = [];
        this.maxChipNum = [];
    },

    setmod: function (mod_game) {
        this.mod_king = mod_game;
        this.mod_king.bindUi(this);
        this.init();
    },

    show:function(){
        cc.spriteFrameCache.addSpriteFrames(res.chipPlist);
        this.node = this.game.uimgr.createnode(res.sxdbTable,true);
        this.addChild(this.node);
        this.batchSP = cc.SpriteBatchNode.create(res.chippng);
        this.node.addChild(this.batchSP);

        this.node.scheduleUpdate();
        this.node.update= this.updateTime.bind(this);

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
        this.winName.setColor(cc.color(175,156,133));
        this.winLayout.addChild(this.winName);

        this.start = ccui.helper.seekWidgetByName(this.node,"start");
        this.start.setVisible(false);
        this.startIMG = ccui.helper.seekWidgetByName(this.node,"startIMG");

        // this.clock = ccui.helper.seekWidgetByName(this.node,"clock");
        // this.clock.setVisible(true);
        // this.time = this.clock.getChildByName("time");
        // this.time.ignoreContentAdaptWithSize(true);

        this._timeContain = ccui.helper.seekWidgetByName(this.node,"readyMovie");
        this._timerControl = new gameclass.timeTextControl(this._timeContain, res.goldTimeBar);


        this.trendList = ccui.helper.seekWidgetByName(this.node,"ListView_1");
        this.playerList = ccui.helper.seekWidgetByName(this.node,"wuzuo_list");
        this.resultNode = ccui.helper.seekWidgetByName(this.node,"resultNode");
        this.resultNode.setVisible(false);

        this.rankTool = new gameclass.mod_ranking();
        for(var i = 0;i < 9;i++){
            this.talkPos[i] = ccui.helper.seekWidgetByName(this.node,"talkposNode").getChildren()[i].getPosition();
        }
        this.btn_xuya = ccui.helper.seekWidgetByName(this.node,"btn_bets5");
        this.helpNode = ccui.helper.seekWidgetByName(this.node,"helpInfo");
        this.helpNode.setVisible(false);
        this.nextLayout = ccui.helper.seekWidgetByName(this.node,"nextLayout");
        this.nextLayout.setVisible(false);
        mod_sound.playbmg(g_music["ybao_bg"],true);
        this.maskChipLayer = ccui.helper.seekWidgetByName(this.node,"maskChipLayer");
        this.maskChipLayer.setVisible(false);

        //跑马灯块
        this.runBlocks = [];
        this.runLayer =  ccui.helper.seekWidgetByName(this.node,"runLayer");
        for(var i = 0;i < this.runLayer.getChildrenCount();i++){
            //var block = ccui.helper.seekWidgetByName(this.runLayer,"runP"+i);
            var block = this.runLayer.getChildren()[i];
            block.setVisible(false);
            this.runBlocks.push(block);
        }
        //初始化最大筹码各个方格内最大筹码个数
        this.betsLayer = ccui.helper.seekWidgetByName(this.node,"betsLayer");
    },

    init:function(){
        this.myMoneyText = ccui.helper.seekWidgetByName(this.node,"gold");
        this.btn_shangzhuang = ccui.helper.seekWidgetByName(this.node,"btn_shangzhuang");
        this.btn_xiazhuang = ccui.helper.seekWidgetByName(this.node,"btn_xiazhuang");
        this.initShow();
    },

    getTime:function(time){
        //this.clock.setVisible(true);
        this._timeContain.setVisible(true);
        this.overTime = parseInt(new Date().getTime()) + time*1000;
    },

    updateroominfo:function(data){
        cc.log("somethings is very fan");
        this.betsArr = [100,500,1000,5000,10000]

        //选择筹码按钮
        var _this = this;
        for(var i = 0;i < ccui.helper.seekWidgetByName(this.node,"clickLayer").getChildrenCount();i++){
            this.btn_bets[i] = ccui.helper.seekWidgetByName(this.node,"clickLayer").getChildren()[i];
            // if(i<=4){
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
                    _this.setBetImg();
                }else{
                    if(_this.mod_king.logindata.uid == _this.saveZhuangInfo.uid){
                        gameclass.showText("庄家不能下注!");
                        return;
                    }
                    if(!_this.canBet){
                        gameclass.showText("请等待下一局开始");
                        return;
                    }
                    _this.mod_king.sendLastBets();
                    sender.setEnabled(false);
                    sender.setBright(false);
                }
            })
        }

        //设置筹码的TEXT
        // for(var i = 0;i < 5;i++){
        //     //this.btn_bets[i].getChildren()[0].setString(this.betsArr[i]);
        //     this.btn_bets[i].loadTextureNormal(res["betchip"+this.betsArr[i]],ccui.Widget.LOCAL_TEXTURE);
        // }

        this.myGold = data.total;
        this.recordArr = data.trend;
        this.initMyInfo(data.total);
        this.initSeatInfo(data.info);
        this.initZhuangInfo(data.dealer);
        this.checkZhuangBTN(data.isdeal);
        this.setBetImg();
        this._timerControl.startCount(data.time);
        this.getTime(data.time);
        if(data.time <= 16){
            this.gameBegin = true;
            this.initTableBet(data.bets);
            var acount = parseInt(data.time / 5);
            cc.log("made 1");
            this.playBetsMusic(acount);
        }else{
            this.gameBegin = false;
            this.nextLayout.setVisible(true);
        }

        var randomNum = parseInt(Math.random()*10);
        this.startFree(randomNum,1);

        this.canBet = (data.time <= 16);
        this.seatPlayer = data.info;
        this.seatPlayer.push(data.dealer);
        for(var i = 0;i < this.betsLayer.getChildrenCount();i++){
            this.reflashBet(i,data.bets[i]);
        }
    },

    initRecord:function(){
        //this.trendList.removeAllChildren();
        //this.trendList.setScrollBarEnabled(false);
        //for(var i = 0;i < this.recordArr.length;i++){
        //    var result = this.recordArr[i].type;
        //    var sp = new cc.Sprite(res["record"+result]);
        //    var widget = new ccui.Layout();
        //    widget.setContentSize(sp.width,sp.height);
        //    widget.addChild(sp);
        //    sp.setPosition(widget.width/2,widget.height/2);
        //    this.trendList.pushBackCustomItem(widget);
        //}
    },

    initMyInfo:function(total){
        var head = ccui.helper.seekWidgetByName(this.node,"myIcon");
        gameclass.mod_base.showtximg(head,this.mod_king.logindata.imgurl, 0, 3,"im_headbg5", false);
        ccui.helper.seekWidgetByName(this.node,"name").setString(this.mod_king.logindata.name || "游客");
        ccui.helper.seekWidgetByName(this.node,"gold").setString(gameclass.changeShow(total));
    },

    initSeatInfo:function(playerInfo){
        for(var i = 0;i < playerInfo.length;i++){
            if(playerInfo[i].uid > 0){
                this.headNodeArr[i].setVisible(true);
                var head = this.headNodeArr[i].getChildByName("headBg");
                gameclass.mod_base.showtximg(head,playerInfo[i].head, 0, 0,"im_headbg5", false);
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
        chipArr = [10000,5000,1000,500,100];
        //var chipArr = this.betsArr.slice(0).reverse();
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
    initZhuangInfo:function(zhuangInfo){
        this.zhuangInfo = zhuangInfo;
        this.saveZhuangInfo = zhuangInfo;//显示数据
        gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(this.node,"zhuangIcon"),
            zhuangInfo.uid?zhuangInfo.head:"res/im_headbg13.png", 0, 0,"im_headbg5", false);
        ccui.helper.seekWidgetByName(this.node,"zhuangName").setString(zhuangInfo.name || "小倩");
        ccui.helper.seekWidgetByName(this.node,"zhuangMoney").setString(gameclass.changeShow(zhuangInfo.total));
        ccui.helper.seekWidgetByName(this.node,"zhuangIcon_sprite").setZOrder(9999);
    },
    getZhuanginfo:function(data){
        this.isRefalshZhuang = true;
        this.zhuangInfo = data;
    },
    onSeat:function(data){
        if(data.uid > 0){
            this.seatPlayer[data.index] = data;
            this.headNodeArr[data.index].setVisible(true);
            gameclass.mod_base.showtximg(this.headNodeArr[data.index].getChildByName("headBg"),data.head,0,0,"im_headbg4",false);
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
        var data = this.zhuangInfo;
        this.saveZhuangInfo = data;
        ccui.helper.seekWidgetByName(this.node,"zhuangIcon").setVisible(true);
        gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(this.node,"zhuangIcon"),
            data.uid?data.head:"res/im_headbg13.png", 0, 0,"im_headbg5", false);
        ccui.helper.seekWidgetByName(this.node,"zhuangName").setString(data.name || "小倩");
        ccui.helper.seekWidgetByName(this.node,"zhuangMoney").setString(gameclass.changeShow(data.total));
        if(data.uid != this.mod_king.logindata.uid){
            this.btn_shangzhuang.setVisible(true);
            this.btn_xiazhuang.setVisible(false);
        }else{
            this.btn_shangzhuang.setVisible(false);
            this.btn_xiazhuang.setVisible(true);
        }
    },
    onEnd:function(data){
        //data.result = 14;
        this.result = data.result;
        cc.log("结果：",this.result);
        this.gameType = this.getResultType(data.result);
        this.rewardArr = this.getRewardIndex(this.gameType);
        cc.log(this.rewardArr);
        this.windata = data;
        this.gameBegin = false;
        //统计闲家一共赢多少钱
        this.allWin = 0;
        for(var i = 0;i < this.endSeatState.length;i++){
            if(this.endSeatState[i].uid != 0 && this.endSeatState[i].uid != this.saveZhuangInfo.uid){
                if(this.endSeatState[i].win > 0){
                    this.allWin += this.endSeatState[i].win;
                }
            }
        }
        var numofturns = 3;
        var step = numofturns * this.runBlocks.length;

        this.noticeAnim(0,function(){
            this.setRunParame(this.freeParamas.curIndex,step + data.result , 0.4 );
            this.gameStyle = 1;
            this.isRunning = true;
        }.bind(this));
    },

    showBlink:function(){
        var _this = this;
        for(var i = 0;i < this.rewardArr.length;i++ ){
            var sp = this.betsLayer.getChildren()[this.rewardArr[i]].getChildByName("light");
            sp.setVisible(true);
            sp.runAction(cc.sequence(cc.blink(1.5,3),cc.callFunc(function(sender){
                sender.setVisible(false);
            },sp)))
        }
        this.node.runAction(cc.sequence(cc.delayTime(1.5),cc.callFunc(function(){
            _this.endFiyChip();
        })))

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
                sp.setChipMove(0.5,sp.getPosition(),zhuangPos,1);
            }else{
                sp.runAction(cc.sequence(cc.delayTime(0.5),cc.moveTo(0.5,cc.p(1136/2,320)),cc.callFunc(function(sender){
                    sender.removeFromParent();
                },sp)))
            }
        }
        var _this=this;
        //金币飞向坐着的人
        this.node.scheduleOnce(function(){
            cc.log(_this.endSeatState)
            for(var i = 0;i < _this.endSeatState.length;i++){
                if(_this.endSeatState[i].win > 0 && _this.endSeatState[i].uid != 0 && _this.endSeatState[i].uid != _this.saveZhuangInfo.uid){
                    var chiar = _this.getPlayerIndexByID(_this.endSeatState[i].uid);
                    var arr = _this.createJiaChip(_this.endSeatState[i].win);
                    var endPos = _this.getheadPos(chiar);
                    _this.flyToHead(arr,endPos,_this.endSeatState[i].win);
                }
            }
            //创建一坨飞向游客的筹码
            var total = 0;
            for(var i = 0;i < _this.rewardArr.length;i++){
                total += Number(_this.everyBoxBet[_this.rewardArr[i]]);
            }
            if(total > 0){
                var endPos = cc.p(0,320);
                for(var i = 0;i < 20;i++){
                    var sp = new cc.Sprite();
                    sp.initWithSpriteFrameName("chip"+1000+".png");
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
                    headNode.getChildren()[1].getChildren()[1].setString(gameclass.changeShow(_this.endSeatState[i].total));
                }
                if(_this.endSeatState[i].uid == _this.mod_king.logindata.uid){
                    _this.myGold = _this.endSeatState[i].total;
                    _this.reflashMyMoeny();
                    _this.setBetImg();
                }
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
        for(var i = 0;i < Math.ceil(win*10/this.allWin);i++){
            var sp = new gameclass.bzwChip("chip",1000);
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
        this.myMoneyText.setString(gameclass.changeShow(this.myGold));
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
        for(var i = 0;i  < this.betsLayer.getChildrenCount();i++){
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
            this.game.uimgr.uis["wzuisxdb"].showDataInfo(data.info);
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
        this.gameBegin = true;
        this.nextLayout.setVisible(false);
        this.setBetImg();
        for(var i = 0; i < this.betsLayer.getChildrenCount();i++){
            this.everyBoxBet[i] = 0;
            this.showBetText[i].setString("0");
            this.wanText[i].setVisible(false);
            this.curChipNum[i] = 0;
        }
        this._timeContain.setVisible(true);
        this._timerControl.startCount(16);
        //this.clock.setVisible(true);
        cc.log("made 2:");
        this.playBetsMusic(2);
        this.noticeAnim(1,function(){
            this.canBet = true;
            this.btn_xuya.setEnabled(true);
            this.btn_xuya.setBright(true);
        }.bind(this))
    },

    noticeAnim:function(type,func){
        this.start.setVisible(true);
        //买定离手
        if(type == 0){
            this.startIMG.setTexture(res.mdls);
            //this.clock.setVisible(false);
            this._timeContain.setVisible(false);
            this.canBet = false;
            if(this.saveZhuangInfo.sex != 1 || this.saveZhuangInfo.uid == 0){
                mod_sound.playeffect(g_music["brttz_mdls"],false);
            }else{
                mod_sound.playeffect(g_music["kpTip"],false);
            }
        }else{
            //this.clock.setVisible(true);
            this._timeContain.setVisible(true);
            this.endSeatState = [];
            this.startIMG.setTexture(res.qxz);
            if(this.saveZhuangInfo.sex != 1 || this.saveZhuangInfo.uid == 0){
                mod_sound.playeffect(g_music["brttz_xztip"],false);
            }else{
                mod_sound.playeffect(g_music["xzTip"],false);
            }
            for(var i = 0;i < this.betsLayer.getChildrenCount();i++){
                var sp = this.btn_sendBets[i].getChildByName("light");
                sp.setVisible(true);
                sp.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(sender){
                    sender.setVisible(false);
                }.bind(this),sp)));
            }
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
        //坐下
        for(var i = 0;i < 8;i++){
            this.chairNodeArr[i] = ccui.helper.seekWidgetByName(this.node,"chiarNode").getChildren()[i];
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
            })
        }
        //点击桌台下注按钮
        for(var i = 0;i < this.betsLayer.getChildrenCount();i++){
            this.btn_sendBets[i] = this.betsLayer.getChildren()[i];
            if(i==0 || i == 1){
                this.maxChipNum[i] = 40;
            }else if(i < 10){
                this.maxChipNum[i] = 25;
            }else this.maxChipNum[i] = 50;
            this.curChipNum[i] = 0;
            this.btn_sendBets[i].getChildByName("light").setVisible(false);

            this.showBetText[i] = this.btn_sendBets[i].getChildByName("betsNum");
            this.showBetText[i].ignoreContentAdaptWithSize(true);
            this.wanText[i] = this.btn_sendBets[i].getChildByName("wan");
            this.wanText[i].setVisible(false);
            this.btn_sendBets[i].index = i;

            this.btn_sendBets[i].addTouchEventListener(function(sender,type){
                if(type != ccui.Widget.TOUCH_ENDED) return;
                if(_this.mod_king.logindata.uid == _this.saveZhuangInfo.uid){
                    gameclass.showText("庄家不能下注");
                    return;
                }
                if(!_this.canBet){
                    gameclass.showText("请等待下一局开始");
                    return;
                }
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                _this.addMask(0.15);
                //点的效果
                var sp = sender.getChildByName("light");
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
            if(gameclass.test == "true") {  //! 测试环境
                _this.game.uimgr.showui("gameclass.goldShoptest");
            } else {
                _this.game.uimgr.showui("gameclass.goldShop");
            }
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
        this.btn_exit = btn_closeCaidan;
        btn_closeCaidan.setVisible(false);
        gameclass.createbtnpress(this.node, "btn_caidan", function () {
            // ccui.helper.seekWidgetByName(_this.node,"btn_bangzhu").setTouchEnabled(false);
            // ccui.helper.seekWidgetByName(_this.node,"btn_bangzhu").setBright(false);
            if(_this.zhankai) return;
            _this.zhankai = true;
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
                _this.game.uimgr.showui("wzuisxdb").setBaseInfo(function(){
                    _this.mod_king.sendWuzuo();
                    ccui.helper.seekWidgetByName(_this.node,"btn_wuzuo").setTouchEnabled(true);
                },_this.node,_this);
            }else{
                _this.game.uimgr.uis["wzuisxdb"].closewz();
            }
        });
        gameclass.createbtnpress(this.node, "btn_xiazhuang", function () {
            _this.mod_king.sendDownDeal();
        });
        // gameclass.createbtnpress(this.node, "btn_bangzhu", function () {
        //     _this.helpNode.setVisible(true);
        //     _this.btn_exitCaidan();
        // });
        gameclass.createbtnpress(this.node, "helpInfo", function () {
            _this.helpNode.setVisible(false);
        });
        gameclass.createbtnpress(this.node, "zhuangIcon", function () {
            var isSystem = false;
            if(_this.saveZhuangInfo.uid == 0){
                isSystem = true;
            }
            _this.getPlayerInfo(_this.saveZhuangInfo,_this.mod_king,isSystem);
        });

        gameclass.createbtnpress(this.node,"btn_huanfu",function(){
            _this.game.uimgr.showui("gameclass.bank").setEnterance(1);
        });
        gameclass.createbtnpress(this.node, "btn_zoushi", function () {
            var zoushiArr = _this.getzoushiArr();
            _this.game.uimgr.showui("gameclass.sxdbRecord").setBaseinfo(zoushiArr);
        });

        gameclass.createbtnpress(this.node, "btn_bangzhu", function () {
            _this.helpNode.setVisible(true);
            _this.btn_exitCaidan();
        });
        gameclass.createbtnpress(this.node, "helpInfo", function () {
            _this.helpNode.setVisible(false);
        });
        gameclass.createbtnpress(this.node,"btn_help",function(){
            _this.helpNode.setVisible(true);
            _this.btn_exitCaidan();
        })
    },

    getzoushiArr:function(){
        var tmp = [];
        for(var i = 0; i < this.recordArr.length;i++){
            if(this.recordArr[i] != 7 && this.recordArr[i] != 21){
                var zoushinum = this.getResultType(this.recordArr[i]);
                tmp.push(zoushinum);
            }else{
                tmp.push(this.recordArr[i] * 100);
            }
        }
        return tmp;
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

    playBetsMusic:function(totalTimes){
        var count = 1;
        var _this = this;
        var callBack = function(){
            if(count >= totalTimes){
                _this.unschedule(callBack);
            }
            if(_this.saveZhuangInfo.sex != 1 || _this.saveZhuangInfo.uid == 0){
                var randomNum = parseInt(Math.random()*7);
                mod_sound.playeffect(g_music["brttz_xz"+randomNum],false);
            }else{
                var randomNum = parseInt(Math.random()*6);
                mod_sound.playeffect(g_music["xz"+randomNum],false);
            }
            count++;
        }
        this.schedule(callBack,5);
    },

    getPlayerInfo:function(data,mod_game,isSystem){
        if(data.uid == 0){
            this.game.uimgr.showui("gameclass.chatMicLayer").setSXDBinfo(data,mod_game,isSystem);
        }else{
            this.rankTool.getPlayerInfo(data.uid,function(retdata){
                data.sign = retdata.sign;
                this.game.uimgr.showui("gameclass.chatMicLayer").setSXDBinfo(data,mod_game,isSystem);
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
        this.betsArr = [100,500,1000,5000,10000];

        for(var i = 0;i < 5;i++){
            if(i == this.selectBet){
                this.btn_bets[i].getChildByName("light").setVisible(true);
            }else{
                this.btn_bets[i].getChildByName("light").setVisible(false);
            }
            //this.btn_bets[i].loadTextureNormal(res["betchip"+this.betsArr[i]],ccui.Widget.LOCAL_TEXTURE);
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

    checkZhuangBTN:function(_isdeal){
        this.btn_shangzhuang.setVisible(!_isdeal);
        this.btn_xiazhuang.setVisible(_isdeal);
    },

    shangxiaZhuang:function(data){
        if(data.type == 0){
            this.game.uimgr.showui("szui").setBaseInfo(data);
            this.btn_shangzhuang.setVisible(false);
            this.btn_xiazhuang.setVisible(true);
        } else{
            this.btn_shangzhuang.setVisible(true);
            this.btn_xiazhuang.setVisible(false);
        }
    },

    updateTime:function(dt){
        this._timerControl.update();

        var curTime = this.overTime - parseInt(new Date().getTime());
        this.curTime = Math.ceil(curTime/1000);
        //this.time.setString(this.curTime < 10 ? "0" + this.curTime : this.curTime);
        //cc.log(this.curTime);
        if(this.curTime <= 0){
            //this.clock.setVisible(false);
            this._timeContain.setVisible(false);
        }
        switch (this.gameStyle){
            case 0:
                this.onFreeRun(dt);
                break;
            case 1:
                this.onGameRun(dt);
                break;
            default:
                break;
        }

        if(this.gameBegin) return;
        if(curTime / 1000 < 15){
            this.startGame();
        }
    },

    startFree:function (startIndex ,speed) {
        this.freeParamas = {
            startIndex:startIndex,
            curIndex:startIndex,
            speed:speed,
            dtTime:0
        };
        this.gameStyle = 0;
    },

    setRunParame:function (startIndex , endIndex  ,speed) {
        this.runParamas = {
            startIndex:startIndex,
            curIndex:startIndex,
            endIndex:endIndex,
            speed:speed,
            dtTime:0,
            isStart:false,
        }
    },

    onFreeRun:function (dt) {
        this.freeParamas.dtTime += dt;
        if(this.freeParamas.dtTime < this.freeParamas.speed){return;}
        this.freeParamas.dtTime = 0;

        var param = this.freeParamas;

        for(var i = 0;i < this.runBlocks.length;i++){
            this.runBlocks[i].setVisible(false);
        }
        var cur = param.curIndex % (this.runBlocks.length);
        var showArr = [];
        for(var i = 0; i < 4 ; i++){
            var index =  cur + i * this.runBlocks.length / 4;
            index = index %  this.runBlocks.length;
            showArr.push( index ) ;
        }

        for(var i = 0; i < showArr.length; i++){
            this.runBlocks[showArr[i]].setVisible(true);
        }
        param.curIndex++;
        param.curIndex = param.curIndex % (this.runBlocks.length);
    },

    onGameRun:function (dt) {
        this.runParamas.dtTime += dt;
        if(this.runParamas.dtTime < this.runParamas.speed){return;}
        this.runParamas.dtTime = 0;
        var param = this.runParamas;
        if(!param.isStart){
            param.isStart = true;
            param.loop = false;
        }
        for(var i = 0;i < this.runBlocks.length;i++){
            this.runBlocks[i].setVisible(false);
        }
        if(param.curIndex >= param.endIndex){
            this.startResult();
        }
        var showArr = [];
        var cur = param.curIndex % (this.runBlocks.length);
        var step = param.curIndex - param.startIndex;
        showArr.push(cur);
        if(step > 0 ){
            var after =  cur - 1 < 0  ? this.runBlocks.length - 1 : cur - 1;
            showArr.push(after);
        }
        if(step > 1 ){
            var after =  cur - 2 < 0  ? this.runBlocks.length - 2 : cur - 2;
            showArr.push(after);
        }
        if(step > 2 ){
            var after =  cur - 3 < 0  ? this.runBlocks.length - 3 : cur - 3;
            showArr.push(after);
        }
        if(step > 3 ){
            var after =  cur - 4 < 0  ? this.runBlocks.length - 4 : cur - 4;
            if(!param.loop && param.isStart && !param.end){
                param.loop = true;
            }
            showArr.push(after);
        }
        if(step > 2 && param.speed > 0.01){
            param.speed /= 2;
        }
        step = param.endIndex - param.curIndex;

        if(param.isStart &&  !param.loop && !param.isStartm){
            cc.audioEngine.stopAllEffects();
            param.isStartm = true;
            mod_sound.playeffect(g_music["sxdb_startRun"]);
        }
        if(param.isStart &&  param.loop && !param.loopm){
            cc.audioEngine.stopAllEffects();
            mod_sound.playeffect(g_music["sxdb_loopRun"],true);
            param.loopm = true;
        }

        if(param.end  && param.loop){
            param.loop = false;
            cc.audioEngine.stopAllEffects();
            mod_sound.playeffect(g_music["sxdb_endRun"]);
        }

        if(step < 5 ){
            param.speed  = 0.5;
            param.end = true;
            showArr.pop();
        }
        if(step < 4 ){
            showArr.pop();
        }
        if(step < 3 ){
            showArr.pop();
        }
        if(step < 2 ){
            showArr.pop();
        }
        for(var i = 0;i < showArr.length;i++){
            this.runBlocks[ showArr[i]].setVisible(true);
        }
        param.curIndex++;
    },

    startResult:function(){
        var _this = this;
        this.resultAcount++;
        var startIndex = (this.runParamas.curIndex) % this.runBlocks.length;
        this.gameStyle = 2;
        //不延迟停止最后的一声没有
        this.node.scheduleOnce(function(){
            mod_sound.stopAllEffects();
        },0.3);
        //播放动画和算分
        var seq =  cc.sequence(cc.blink(1,3),cc.delayTime(1) ,new cc.CallFunc(function () {
            this.startFree( this.runParamas.curIndex ,1);
            this.resultAcount = 0;
            this.isRunning = false;
            //播放输赢动画
            this.showBlink();
            //=========
            cc.log(this.result);
            if(this.result == 7){
                this.createSpine("ebgendAnim1",cc.p(1136/2,320));
            }else if(this.result == 21){
                this.createSpine("ebgendAnim2",cc.p(1136/2,320));
            }else{
                this.showmjAnim();
                if (_this.saveZhuangInfo.sex == 1) {
                    if(this.gameType >= 1 && this.gameType <= 9){
                        mod_sound.playeffect(g_music["nansound_2"+this.gameType],false);
                    }
                } else {
                    if(this.gameType >= 1 && this.gameType <= 9){
                        mod_sound.playeffect(g_music["nvsound_1"+this.gameType],false);
                    }
                }

            }
            //改变战绩数据
            this.recordArr.pop();
            this.recordArr.unshift(this.result);
        },this));
        this.runBlocks[startIndex  % this.runBlocks.length ].runAction(seq);
    },

    showmjAnim:function(){
        this.resultNode.setVisible(true);
        this.resultNode.setScale(0.3);
        cc.log(this.gameType);
        //ccui.helper.seekWidgetByName(this.resultNode,"mjtext").setTexture(res["resultType"+this.gameType]);
        this.resultNode.setTexture(res["resultType"+this.gameType]);
        this.resultNode.runAction(cc.sequence(cc.scaleTo(0.3,1.1,1.1),cc.scaleTo(0.05,1,1),cc.delayTime(0.5),cc.callFunc(function(sender){
            sender.setVisible(false);
        }.bind(this),this.resultNode)));
    },

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

    getResultType:function(result){
        //if(result != 7 && result != 21){
        //
        //}else{
        //    return result*100;
        //}

        var type = -1;
        //0为奔驰*100  1奔驰  2古驰 3爱马仕 4阿玛尼 5圣罗兰 6LV 7Dior 8香奈儿 9劳力士
        if(result == 0) type = 0;
        else if(result == 14) type = 1;
        else if(result == 1 || result == 2 || result == 3) type = 5;
        else if(result == 4 || result == 5 || result == 6) type = 3;
        else if(result == 8 || result == 9 || result == 10) type = 2;
        else if(result == 11 || result == 12 || result == 13) type = 4;
        else if(result == 15 || result == 16 || result == 17) type = 9;
        else if(result == 18 || result == 19 || result == 20) type = 7;
        else if(result == 22 || result == 23 || result == 24) type = 6;
        else if(result == 25 || result == 26 || result == 27) type = 8;
        return type;
    },

    getRewardIndex:function(gametype){
        var rewardIndex = [];
        if(this.result == 7 || this.result == 21){
            if(this.result == 7){
                rewardIndex = [];
            }else{
                rewardIndex = [0,1,2,3,4,5,6,7,8,9,10];
            }
            return rewardIndex;
        }
        if(gametype == 0 || gametype == 1) rewardIndex.push(10);
        else if(gametype <= 5 && gametype >= 2) rewardIndex.push(1);
        else if(gametype <= 9 && gametype >= 6) rewardIndex.push(0);
        if(gametype == 6) rewardIndex.push(2);
        else if(gametype == 7) rewardIndex.push(3);
        else if(gametype == 8) rewardIndex.push(6);
        else if(gametype == 9) rewardIndex.push(7);
        else if(gametype == 2) rewardIndex.push(4);
        else if(gametype == 3) rewardIndex.push(5);
        else if(gametype == 4) rewardIndex.push(8);
        else if(gametype == 5) rewardIndex.push(9);
        return rewardIndex;
    },

    destroy:function() {
        cc.audioEngine.stopAllEffects();
    },
});

gameclass.sxdbRecord = gameclass.baseui.extend({
    node:null,

    ctor:function(){
        this._super();
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.sxdbRecord,true);
        this.addChild(this.node);

        gameclass.createbtnpress(this.node,"Panel_1",function(){
            this.game.uimgr.closeui("gameclass.sxdbRecord");
        }.bind(this))
    },
    setBaseinfo:function(data){
        cc.log(data);
        //data = [7, 8, 5, 5, 6, 6, 4, 5, 4, 6, 700, 2100, 9, 0, 1, 3, 6, 9, 6, 9]
        for(var i = 0; i < data.length;i++){
            var _node = ccui.helper.seekWidgetByName(this.node,"zoushiBg").getChildren()[i]//.getChildByName("mjtext");
           // if(data[i] < 100){
                _node.setTexture(res["recordType"+data[i]]);
            // }else{
            //     _node.getParent().setVisible(false);
            //     var newsp = new cc.Sprite(res["ts_logo"+data[i]]);
            //     newsp.setPosition(_node.getParent().getPosition());
            //     ccui.helper.seekWidgetByName(this.node,"zoushiBg").addChild(newsp);
            // }
            // if(data[i] == 0 || data[i] == 1){//logo缩小
            //     _node.setScale(_node.getScale()*0.5);
            // }


        }
    },
})

var wzuisxdb = gameclass.baseui.extend({
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.bzwWz, true);
        this.addChild(this.node);
        this.playerList = ccui.helper.seekWidgetByName(this.node,"wuzuo_list");
    },
    closewz:function(){
        var _this = this;
        this.playerList.runAction(cc.sequence(cc.moveTo(0.3,cc.p(0,0)),cc.callFunc(function(){
            ccui.helper.seekWidgetByName(_this.parentUI,"btn_wuzuo").loadTextureNormal(res.onlineList,ccui.Widget.LOCAL_TEXTURE);
            ccui.helper.seekWidgetByName(_this.parentUI,"btn_wuzuo").setTouchEnabled(true);
            _this.game.uimgr.closeui("wzuisxdb");
            _this.parent.zhankai1 = false;
            _this.parent.btn_exit.setVisible(false);
            _this.playerList.removeAllItems();
        })));
        ccui.helper.seekWidgetByName(this.parentUI,"btn_wuzuo").runAction(cc.moveTo(0.3,cc.p(0,320)));
    },
    setBaseInfo:function(func,parentUI,parent){
        var _this = this;
        this.parentUI = parentUI;
        this.parent = parent;
        this.playerList.runAction(cc.sequence(cc.moveTo(0.3,cc.p(321,0)),cc.callFunc(function(){
            ccui.helper.seekWidgetByName(parentUI,"btn_wuzuo").loadTextureNormal(res.onlineList,ccui.Widget.LOCAL_TEXTURE);
            func();
        })))
        ccui.helper.seekWidgetByName(parentUI,"btn_wuzuo").runAction(cc.moveTo(0.3,cc.p(321,320)));
    },

    showDataInfo:function(data){
        var _this = this;
        for(var i = 0;i < data.length;i++){
            var infoObj = data[i];
            var listCell = this.game.uimgr.createnode(res.bzwWzCell, true).getChildByName("Panel_1");
            listCell.removeFromParent();
            listCell.setTag(2000+i);
            this.playerList.pushBackCustomItem(listCell);
            gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(listCell,"wuzuoIcon"),infoObj.head,0,0,"im_headbg9",false);
            ccui.helper.seekWidgetByName(listCell,"name").setString(infoObj.name);
            ccui.helper.seekWidgetByName(listCell,"gold").setString(gameclass.changeShow(infoObj.total));
            listCell.addTouchEventListener(function(sender,type){
                if(type != ccui.Widget.TOUCH_ENDED) return;
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                _this.parent.rankTool.getPlayerInfo(data[sender.getTag()-2000].uid,function(retdata){
                    if(retdata){
                        retdata.name = data[sender.getTag()-2000].name;
                        retdata.head = data[sender.getTag()-2000].head;
                    }
                    _this.game.uimgr.showui("gameclass.rankingPlayerInfo").setBaseInfo(retdata);
                })
            })
        }
    },
});







