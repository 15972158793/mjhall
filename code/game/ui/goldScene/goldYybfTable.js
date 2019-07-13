/**
 * Created by Administrator on 2017-11-15.
 */

gameclass.goldyybftable = gameclass.baseui.extend({
    node:null,
    btn_bets:null,
    btn_sendBets:null,
    selectBet:null,//当前选择的单注
    headNodeArr:null,
    zhankai:false,
    zhankai1:false,
    // showBetText:null,
    everyBoxBet:null,
    myGold:0,
    betsNum:0,//下注人数
    myBets:0,//我的下注
    totalBets:0,//总下注
    endSeatState:null,
    gameBegin:false,
    endAnmi:false,
    hasWin:false,
    allWin:0,
    canBet:false,
    totalRecord:48,
    totalArea:3,
    //seatPlayer

    ctor: function () {
        this._super();
        this.btn_bets = [];
        this.btn_sendBets = [];
        this.headNodeArr = [];
        // this.showBetText = [];
        this.everyBoxBet = [];
        this.endSeatState = null;
        this.selectBet = 0;
        // this.wanText = [];
        this.myBets = 0;
        this.totalBets = 0;
        //每个格子里筹码的上限
        this.curChipNum = [];
        this.maxChipNum = [];
        for(var i = 0;i < 17;i++){
            if(i < 3){
                this.maxChipNum[i] = 150;
            }else{
                this.maxChipNum[i] = 30;
            }
            this.curChipNum[i] = 0;
        }
    },

    setmod: function (mod_game) {
        this.mod_yybf = mod_game;
        this.mod_yybf.bindUi(this);
        this.init();
    },

    show:function(){
        cc.spriteFrameCache.addSpriteFrames(res.chipPlist);
        cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
        this.node = this.game.uimgr.createnode(res.goldYybf,true);
        this.addChild(this.node);
        this.batchSP = cc.SpriteBatchNode.create(res.chippng);
        this.node.addChild(this.batchSP);

        this.betsLayer = ccui.helper.seekWidgetByName(this.node,"betsLayer");

        this.node.scheduleUpdate();
        this.node.update= this.updateTime.bind(this);

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

        this.start = ccui.helper.seekWidgetByName(this.node,"start");
        this.start.setVisible(false);
        this.startIMG = ccui.helper.seekWidgetByName(this.node,"startIMG");


        this.betsList = ccui.helper.seekWidgetByName(this.node,"ScrollView_1");
        this.playerList = ccui.helper.seekWidgetByName(this.node,"wuzuo_list");
        this.resultNode = ccui.helper.seekWidgetByName(this.node,"resultNode");
        this.resultNode.setVisible(false);

        this.rankTool = new gameclass.mod_ranking();
        this.btn_xuya = ccui.helper.seekWidgetByName(this.node,"btn_bets5");
        this.helpNode = ccui.helper.seekWidgetByName(this.node,"helpInfo");
        this.helpNode.setZOrder(10000)
        this.helpNode.setVisible(false);
        this.winNode = ccui.helper.seekWidgetByName(this.node,"winLayer");
        this.winNode.setVisible(false);
        this.nextLayout = ccui.helper.seekWidgetByName(this.node,"nextLayout");
        this.nextLayout.setVisible(false);
        mod_sound.playbmg(g_music["yybfbgm"],true);
        this.maskChipLayer = ccui.helper.seekWidgetByName(this.node,"maskChipLayer");
        this.maskChipLayer.setVisible(false);

        this.betsList = ccui.helper.seekWidgetByName(this.node,"ListView_1");
        // for(var i = 0;i < 3;i++){
        //     this.seziSp[i] = ccui.helper.seekWidgetByName(this.node,"sezi"+i);
        //     this.seziSp[i].setVisible(false);
        // }
    },

    init:function(){
        this._timeContain = ccui.helper.seekWidgetByName(this.node,"readyMovie");
        this._timerControl = new gameclass.timeTextControl(this._timeContain, res.goldTimeBar);
        this.myMoneyText = ccui.helper.seekWidgetByName(this.node,"gold");
        this.initShow();
    },

    getTime:function(time){
        this.overTime = parseInt(new Date().getTime()) + time*1000;
    },

    updateroominfo:function(data){
        this.gameType = this.mod_yybf.roominfo.type;
        this.betsArr = [100,500,1000,5000,10000];
        this.myBets = data.bets;
        this.totalBets = data.gametotal;
        this.betsNum = data.pernum;
        // cc.log("游戏数据",data,this.myBets,this.totalBets);
        //选择筹码按钮
        var _this = this;
        for(var i = 0;i < ccui.helper.seekWidgetByName(this.node,"clickLayer").getChildrenCount();i++){
            this.btn_bets[i] = ccui.helper.seekWidgetByName(this.node,"clickLayer").getChildren()[i];
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
                    _this.mod_yybf.sendLastBets();
                    sender.setEnabled(false);
                    sender.setBright(false);
                }
            })
        }

        this.myGold = data.total;//个人金币总量
        this.initMyInfo(data.total);
        this.initWinGonggao(data.winname,data.winprob,data.win);
        this.setBetImg();
        this.flushPercent();
        this._timerControl.startCount(data.time);
        this.getTime(data.time);
        if(data.time <= 27){
            this.gameBegin = true;
            // cc.log(data.bets);
            this.initTableBet(data.gametotal);
        }else{
            this.gameBegin = false;
            this.nextLayout.setVisible(true);
        }
        this.canBet = (data.time <= 27);
    },


    changeRecordArr:function(arr){
        for(var i = 0;i < arr.length;i++){
            this.recordArr[i] = {"result":0};
            this.recordArr[i].result = arr[i];
        }
    },

    initRecord:function(){
        this.trendList.removeAllChildren();
        this.trendList.setScrollBarEnabled(false);
        // cc.log("初始化记录",this.recordArr.length,this.recordArr);
        for(var i = 0;i < this.recordArr.length;i++){
            var result = this.recordArr[i].result;
            var sp = new cc.Sprite(res["lhdrecord"+result]);
            var widget = new ccui.Layout();
            widget.setContentSize(sp.width,sp.height);
            widget.addChild(sp);
            sp.setPosition(widget.width/2,widget.height/2);
            this.trendList.pushBackCustomItem(widget);
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
        gameclass.mod_base.showtximg(head,this.mod_yybf.logindata.imgurl, 0, 0,"im_headbg5", false);
        ccui.helper.seekWidgetByName(this.node,"name").setString(this.mod_yybf.logindata.name || "游客");
        ccui.helper.seekWidgetByName(this.node,"gold").ignoreContentAdaptWithSize(true);
        ccui.helper.seekWidgetByName(this.node,"gold").setString(gameclass.changeShow(total));
    },
    initWinGonggao:function(name,chance,total){
        var prob = (chance*100).toFixed(2);
        if (name == ""){
            return
        }
        ccui.helper.seekWidgetByName(this.node,"lastwininfo").setVisible(true);
        ccui.helper.seekWidgetByName(this.node,"winname_0").ignoreContentAdaptWithSize(true);
        ccui.helper.seekWidgetByName(this.node,"winname_1").ignoreContentAdaptWithSize(true);
        ccui.helper.seekWidgetByName(this.node,"winname_2").ignoreContentAdaptWithSize(true);
        ccui.helper.seekWidgetByName(this.node,"winname_2").setString(name);
        ccui.helper.seekWidgetByName(this.node,"winname_0").setString(prob+"%");
        ccui.helper.seekWidgetByName(this.node,"winname_1").setString(total);

    },

    initTableBet:function(betsArr){
            this.everyBoxBet[0] = betsArr;
            var chipArr = this.getChipArr(betsArr);
            for(var j = 0;j < chipArr.length;j++){
                this.createChip(chipArr[j],0);
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


    //动画时间
    //结束动画:买定离手动画1S, 钟移动到中间0.3s,1.3S钟开钟时间,开甩子1.5S,钱飞到庄时间0.5 ,等飞玩庄,金币飞到玩家0.5s,大赢家动画2S,一共7S钟.
    //开局动画:请下注动画1S,摇种1.2S钟。一共2.2S
    onEnd:function(data){
        var _this = this
        this. rewardArr = [0];
        //this.gameResult = this.getGameType(data.result);

        //this.endSeatState.push(data);//添加数据
        this.hasWin = false;
        this.endSeatState = data;
        //this.winNode.setVisible(false);
        // cc.log("结束数据",this.endSeatState,data)
        if (data.uid != 0){
            this.hasWin = true;
        }
        this.windata = data;
        this.gameBegin = false;
        this.endAnmi = true;
        var _this = this;
        this.allWin = 0;
        //统计闲家一共赢多少钱
        this.allWin = data.win
        //this.everyBoxBet[0] = data.win;
        this.noticeAnim(0,function(){//买定离手
            // if (data.uid == 0){
            //     _this.nextLayout.setVisible(true);
            // }
            _this.showBlink(data);//清除筹码,播放大赢家动画
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
    showBlink:function(data){
        var _this = this;
        if (_this.rewardArr.length<=0){
            _this.recordArr[0] = 2
            return
        }
        _this.betsList.removeAllChildren();
        _this.endFiyChip(data);//清空筹码播放大赢家
    },

    endFiyChip:function(data){
        var _this = this;
        var a = 0;
        var b = 0;
        var chipTotal = this.chipLayer.getChildrenCount();
        for(var i = 0;i < chipTotal;i++){
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

        this.node.scheduleOnce(function(){
            //创建一坨飞向游客的筹码
            //先判断除了我自己。还有没有其余的无座玩家,有的话就飞
            var total = data.win;
            if(total > 0){
                var endPos = cc.p(0,320);
                if (data.uid == _this.mod_yybf.logindata.uid ){
                    endPos = _this.getheadPos(-2);
                }
                for(var i = 0;i < 20;i++){
                    var sp = new cc.Sprite();
                    sp.initWithSpriteFrameName("chip"+100+".png");
                    sp.setPosition(1136/2+(Math.random()-0.5)*(_this.chipLayer.width)*0.2,320+(Math.random()-0.5)*(_this.chipLayer.height)*0.2);
                    _this.chipLayer.addChild(sp);
                    sp.runAction(cc.sequence(cc.moveTo(0.5,endPos),cc.callFunc(function(sender){
                        sender.removeFromParent();
                    },sp)));
                }
            }else if(chipTotal > 0){
                var endPos = _this.getheadPos(-2);
                for(var i = 0;i < 20;i++){
                    var sp = new cc.Sprite();
                    sp.initWithSpriteFrameName("chip"+100+".png");
                    sp.setPosition(1136/2+(Math.random()-0.5)*(_this.chipLayer.width)*0.2,320+(Math.random()-0.5)*(_this.chipLayer.height)*0.2);
                    _this.chipLayer.addChild(sp);
                    sp.runAction(cc.sequence(cc.moveTo(0.5,endPos),cc.callFunc(function(sender){
                        sender.removeFromParent();
                    },sp)));
                }
            }
            if (data.uid == _this.mod_yybf.logindata.uid){
                _this.myGold = data.total;
                _this.reflashMyMoeny();
                _this.setBetImg();
            }
            _this.initWinGonggao(data.name,data.prob,data.win);
            if(_this.windata.uid != 0 ){
                _this.winNode.setVisible(true);
                ccui.helper.seekWidgetByName(_this.winNode,"endname").setString(data.name);
                ccui.helper.seekWidgetByName(_this.winNode,"endname").ignoreContentAdaptWithSize(true);
                ccui.helper.seekWidgetByName(_this.winNode,"endtotal").setString(data.win);
            }
            //ccui.helper.seekWidgetByName(_this.node,"roolWin").setVisible(false);
            // //大赢家动画
            // _this.node.scheduleOnce(function(){
            //     if(_this.windata.uid != 0 ){
            //         var chair = _this.getPlayerIndexByID(_this.windata.uid);
            //         _this.playWinAnim(chair);
            //     }
            // },0.5)

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


    getPlayerIndexByID:function(uid){
        //自己头像位置
        if(uid == this.mod_yybf.logindata.uid){
            return -2;
        }
        //游客位置
        return -1;
    },

    reflashMyMoeny:function(){
        this.myMoneyText.setString(gameclass.changeShow(this.myGold));
    },
    reflashPlayerMoney:function(data){
        if(data.uid == this.mod_yybf.logindata.uid){
            this.myGold = data.total;
            ccui.helper.seekWidgetByName(this.node,"gold").setString(gameclass.changeShow(data.total));
        }
    },
    onPlayerBet:function(data){
        if(data.gold == 0) return;
        var chair = -1;//-1表示无座玩家飞金币的位置
        if(data.uid == this.mod_yybf.logindata.uid){
            chair = -2;//-2表示自己头像飞金币的位置
            this.myGold -= data.gold;
            this.reflashMyMoeny();
            this.setBetImg();

            this.myBets = data.perbets;
        }
        this.fiyChip(chair,0,data.gold);
        this.everyBoxBet[0] += data.gold;

        this.betsNum = data.pernum
        this.totalBets = data.gametotal;

        this.flushPercent();

        var textField = data.name+"下注了:"+data.gold;
        var listCell = this.game.uimgr.createnode(res.yybfBetsCell, true).getChildByName("bg");
        listCell.removeFromParent();
        //this.betsList.scrollToPercentVertical(0);
        this.betsList.pushBackCustomItem(listCell);
        ccui.helper.seekWidgetByName(listCell,"info").setString(textField);
        ccui.helper.seekWidgetByName(listCell,"info").ignoreContentAdaptWithSize(true);
        if (this.betsList.getChildrenCount() > 4){
            //this.betsList.scrollToPercentVertical(100,1,true);
            var dis = this.betsList.getChildren()[0].getContentSize().height/2 - this.betsList.getChildren()[this.betsList.getChildrenCount()-1].getPositionY();
            for(var i=0;i<this.betsList.getChildrenCount();i++){
                var sp = this.betsList.getChildren()[i];
                sp.runAction(cc.moveTo(0.5,cc.p(sp.getPositionX(),sp.getPositionY()+dis)));
                // if (sp.getPositionY()>this.betsList.getContentSize().height){
                //     sp.setVisible(false);
                // }
            }
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
            this.game.uimgr.uis["yybfwzui"].showDataInfo(data.info);
        }
    },
    getRankListData:function(data){
        if(data && data.info && data.info.length > 0){
            this.game.uimgr.uis["yybfRankUi"].showDataInfo(data.info);
        }
    },
    getMyRecordData:function(data){
        if(data && data.info && data.info.length > 0){
            this.game.uimgr.uis["yybfRecordUi"].setBaseInfo(data);
        }
    },
    onBalance:function(data){
        //this.endSeatState.push(data);
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
        this.gameBegin = true;
        this._timeContain.setVisible(true);
        this.nextLayout.setVisible(false);
        this.setBetImg();
        this.myBets = 0;
        this.totalBets = 0;
        this.betsNum = 0;
        this.flushPercent();
        for(var i = 0; i < this.betsLayer.getChildrenCount();i++){
            this.everyBoxBet[i] = 0;
            this.curChipNum[i] = 0;
        }
        this.playBetAnim();//开局动画
    },

    playBetAnim:function(){//开局动画
        var _this = this;
        _this.noticeAnim(1,function(){
            _this.btn_xuya.setEnabled(true);
            _this.btn_xuya.setBright(true);
            _this.canBet = true;
        })
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
            this.endSeatState = null;
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
        this.roolLayer = ccui.helper.seekWidgetByName(this.node,"rollLayer");
        //点击桌台下注按钮
        for(var i = 0;i < this.betsLayer.getChildrenCount();i++){
            this.btn_sendBets[i] = this.betsLayer.getChildren()[i];
            // this.showBetText[i] = this.btn_sendBets[i].getChildByName("betsNum");
            // this.showBetText[i].ignoreContentAdaptWithSize(true);
            // this.wanText[i] = this.btn_sendBets[i].getChildByName("wan");
            // this.wanText[i].setVisible(false);


            this.btn_sendBets[i].index = i;

            this.btn_sendBets[i].addTouchEventListener(function(sender,type){
                if(type != ccui.Widget.TOUCH_ENDED) return;
                if(!_this.canBet){
                    gameclass.showText("请等待下一局开始");
                    return;
                }
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                _this.addMask(0.15);
                //cc.log("发送下注数据",_this.selectBet,_this.betsArr,_this.betsArr[_this.selectBet]);

                _this.mod_yybf.sendBets(_this.betsArr[_this.selectBet]);
            })
        }

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
                _this.mod_yybf.dissmissroom();
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
        gameclass.createbtnpress(this.node, "btn_wuzuo", function () {
            ccui.helper.seekWidgetByName(_this.node,"btn_wuzuo").setTouchEnabled(false);
            if(!_this.zhankai1){
                _this.zhankai1 = true;
                btn_closeCaidan.setVisible(true);
                _this.game.uimgr.showui("yybfwzui").setBaseInfo(function(){
                    _this.mod_yybf.sendWuzuo();
                    ccui.helper.seekWidgetByName(_this.node,"btn_wuzuo").setTouchEnabled(true);
                },_this.node,_this);
            }else{
                //if(!_this.zhankai1) return;
                //ccui.helper.seekWidgetByName(_this.node,"btn_wuzuo").setTouchEnabled(false);
                _this.game.uimgr.uis["yybfwzui"].closewz();
            }
        });
        gameclass.createbtnpress(this.node, "btn_record", function () {
            _this.game.uimgr.showui("yybfRecordUi");
            //_this.mod_yybf.bindRecordUi(_this.game.uimgr.uis["yybfRecordUi"]);
            _this.mod_yybf.sendPlayerRecord();
        });
        gameclass.createbtnpress(this.node, "btn_rank", function () {
            _this.game.uimgr.showui("yybfRankUi");
            //_this.mod_yybf.bindRecordUi(_this.game.uimgr.uis["yybfRankUi"]);
            _this.mod_yybf.sendRankLisk();
        });
        gameclass.createbtnpress(this.node, "btn_bangzhu", function () {
            _this.helpNode.setVisible(true);
            _this.btn_exitCaidan();
        });
        gameclass.createbtnpress(this.node, "helpInfo", function () {
            _this.helpNode.setVisible(false);
        });
        gameclass.createbtnpress(this.node, "winLayer", function () {
            _this.winNode.setVisible(false);
        });
        //gameclass.createbtnpress(this.node, "buygold", function () {
        //    _this.game.uimgr.showui("gameclass.goldShop");
        //});

        gameclass.createbtnpress(this.node,"btn_huanfu",function(){
            _this.game.uimgr.showui("gameclass.bank").setEnterance(1);
        })
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


    getheadPos:function(index){
        var endPos = null;
        if(index >= 0 && index != 1000){//座位上的人
            endPos = this.headNodeArr[index].getPosition();
        }else if(index == -1){//无座玩家
            endPos = cc.p(-50,320);
        }else if(index == -2){//自己位置
            endPos = ccui.helper.seekWidgetByName(this.node,"myIcon").getPosition();
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

    setBetImg:function(){//根据金币数量设置投注按钮是否可见
        for(var i = 0;i < 5;i++){
            if(i == this.selectBet){
                this.btn_bets[i].setScale(1.2);
            }else{
                this.btn_bets[i].setScale(1);
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
    rollLayerAnmi:function (distance,dt) {
        this.roolLayer.setVisible(true);
        var movetime = 0.3
        var movedis = distance/movetime *dt;
       for (var i=0;i<this.roolLayer.getChildrenCount();i++){
           var sp = this.roolLayer.getChildren()[i];
           sp.setPositionX(sp.getPositionX()-movedis);
           if (i > 0){
               index = i-1
           }else {
               var index = this.roolLayer.getChildrenCount() - 1;
           }
           var spHead = this.roolLayer.getChildren()[index];
           if (sp.getPositionX()<(0-sp.getContentSize().width/2)){
               if (0 == i){
                   sp.setPositionX(spHead.getPositionX() + 66-movedis);
               }else {
                   sp.setPositionX(spHead.getPositionX() + 66);
               }
           }
       }
       //  var list1 = new Array()
       //  for (var i=0;i<this.roolLayer.getChildrenCount();i++){
       //      list1.push(this.roolLayer.getChildren()[i]);//1~1
       //  }
       //   this.roolLayer.setVisible(true);
       //   var movetime = 0.3
       //   var movedis = distance/movetime *dt;
       //  for (var i=0;i<list1.length;i++){
       //      var sp = list1[i];
       //      sp.setPositionX(sp.getPositionX()-movedis);
       //      if (sp.getPositionX()<(0-sp.getContentSize().width/2)){
       //          sp.setPositionX(list1[list1.length-1].getPositionX() + 66-movedis);
       //          var sp1 = list1.shift()
       //          list1.push(sp1)
       //      }
       //  }
    },
    flushPercent:function(){
        var percent =0;
        if (this.totalBets!=0){
            percent = (this.myBets/this.totalBets)*100;
            percent = percent.toFixed(2);
        }
        if (percent > 100){
            percent = 0.00
        }
        ccui.helper.seekWidgetByName(this.node,"myChance").ignoreContentAdaptWithSize(true);
        ccui.helper.seekWidgetByName(this.node,"myBets").ignoreContentAdaptWithSize(true);
        ccui.helper.seekWidgetByName(this.node,"myChance").setString("概率:"+percent+"%");
        ccui.helper.seekWidgetByName(this.node,"myBets").setString("下注:"+this.myBets);
        ccui.helper.seekWidgetByName(this.node,"onlinenum").setString(this.betsNum);
        ccui.helper.seekWidgetByName(this.node,"jiangchi").setString("当前奖池:"+this.totalBets);

    },
    updateTime:function(dt){
        this._timerControl.update();

        var curTime = this.overTime - parseInt(new Date().getTime());
        this.curTime = Math.ceil(curTime/1000);
        if (this.betsList.getChildrenCount() >5 && curTime / 1000 < 27) {
            this.betsList.scrollToPercentVertical(100,1,true);
        }
        if(this.gameBegin) return;
        if(curTime / 1000 < 27){
            this.startGame();
        }
    },

    destroy: function () {
        this._timerControl.destroy();
    },
});
var yybfRankUi = gameclass.baseui.extend({
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.yybfRank, true);
        this.addChild(this.node);
        this.zoushiList = ccui.helper.seekWidgetByName(this.node,"zoushiList");
        //this.ludanArr = ccui.helper.seekWidgetByName(this.node,"Panel_3");

        var _this = this;
        ccui.helper.seekWidgetByName(this.node,"Panel_1").addTouchEventListener(function(sender,type){
            if(type != ccui.Widget.TOUCH_ENDED) return;
            _this.game.uimgr.closeui("yybfRankUi");
        })
    },
    showDataInfo:function(data){
        var _this = this;
        for(var i = 0;i < data.length;i++){
            var infoObj = data[i];
            var listCell = this.game.uimgr.createnode(res.yybfRankCell, true).getChildByName("bg");
            listCell.removeFromParent();
            this.zoushiList.pushBackCustomItem(listCell);
            gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(listCell,"wuzuoIcon"),infoObj.head,0,0,"im_headbg4",false);
            ccui.helper.seekWidgetByName(listCell,"name").setString(infoObj.name);
            ccui.helper.seekWidgetByName(listCell,"gold").ignoreContentAdaptWithSize(true);
            ccui.helper.seekWidgetByName(listCell,"gold").setString(+infoObj.win);
            if (i<=2){
                ccui.helper.seekWidgetByName(listCell,"rankimg").setVisible(true);
                ccui.helper.seekWidgetByName(listCell,"rankimg").loadTexture(res["yybfrank" + i]);
            }else {
                ccui.helper.seekWidgetByName(listCell,"ranktext").setVisible(true);
                ccui.helper.seekWidgetByName(listCell,"ranktext").setString(i+1);
            }
        }

    },
    timestampToTime:function (timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        // Y = date.getFullYear() + '-';
        // M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        // D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes();
        //s = date.getSeconds();
        return h+m;
    },
})
var yybfRecordUi = gameclass.baseui.extend({
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.yybfRecord, true);
        this.addChild(this.node);
        this.zoushiList = ccui.helper.seekWidgetByName(this.node,"zoushiList");
        //this.ludanArr = ccui.helper.seekWidgetByName(this.node,"Panel_3");

        var _this = this;
        ccui.helper.seekWidgetByName(this.node,"Panel_1").addTouchEventListener(function(sender,type){
            if(type != ccui.Widget.TOUCH_ENDED) return;
            _this.game.uimgr.closeui("yybfRecordUi");
        })
    },
    setBaseInfo:function(data){
        if (null == data.info ){
            return
        }
        var recordArr = data.info;
        var _this = this;
        _this.zoushiList.removeAllChildren();
        for(var i = 0;i < recordArr.length;i++){
            var panel = this.game.uimgr.createnode(res.yybfRecordCell, true).getChildByName("bg");
            ccui.helper.seekWidgetByName(panel,"time").setString(_this.timestampToTime(recordArr[i].time));
            ccui.helper.seekWidgetByName(panel,"time").ignoreContentAdaptWithSize(true);
            ccui.helper.seekWidgetByName(panel,"touzhu").setString(recordArr[i].bets);
            ccui.helper.seekWidgetByName(panel,"chance").setString((recordArr[i].prob*100).toFixed(2)+"%");
            ccui.helper.seekWidgetByName(panel,"jiangchi").setString(recordArr[i].gametotal);
            var peopleWim = recordArr[i].win;
            ccui.helper.seekWidgetByName(panel,"shouyi").setString(peopleWim);
            panel.removeFromParent(false);
            _this.zoushiList.pushBackCustomItem(panel);
        }

    },
    timestampToTime:function (timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    // Y = date.getFullYear() + '-';
    // M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    // D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes();
    //s = date.getSeconds();
    return h+m;
    },
})

var yybfwzui = gameclass.baseui.extend({
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
            ccui.helper.seekWidgetByName(_this.parentUI,"btn_wuzuo").loadTextureNormal(res.openList,ccui.Widget.LOCAL_TEXTURE);
            ccui.helper.seekWidgetByName(_this.parentUI,"btn_wuzuo").setTouchEnabled(true);
            _this.game.uimgr.closeui("yybfwzui");
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
            ccui.helper.seekWidgetByName(parentUI,"btn_wuzuo").loadTextureNormal(res.closeList,ccui.Widget.LOCAL_TEXTURE);
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
            gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(listCell,"wuzuoIcon"),infoObj.head,0,0,"im_headbg5",false);
            ccui.helper.seekWidgetByName(listCell,"name").setString(infoObj.name);
            ccui.helper.seekWidgetByName(listCell,"gold").ignoreContentAdaptWithSize(true);
            ccui.helper.seekWidgetByName(listCell,"gold").setString("下注金额:"+infoObj.bets);
            listCell.addTouchEventListener(function(sender,type){
                //! del at 20180310 hwn
                // if(type != ccui.Widget.TOUCH_ENDED) return;
                // mod_sound.playeffect(g_music["selectItemMp3"], false);
                // _this.parent.rankTool.getPlayerInfo(data[sender.getTag()-2000].uid,function(retdata){
                //     if(retdata){
                //         retdata.name = data[sender.getTag()-2000].name;
                //         retdata.head = data[sender.getTag()-2000].head;
                //     }
                //     _this.game.uimgr.showui("gameclass.rankingPlayerInfo").setBaseInfo(retdata);
                // })
                //! ----
            })
        }
    },
});