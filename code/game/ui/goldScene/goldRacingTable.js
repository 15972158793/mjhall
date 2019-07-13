gameclass.goldracingtable = gameclass.baseui.extend({
    node:null,
    btn_bets:null,
    btn_sendBets:null,
    selectBet:null,//当前选择的单注
    headNodeArr:null,
    zhankai:false,
    zhankai1:false,
    showMyBet:null,//按钮上我的下注
    showTotalBet:null,//按钮上总下注
    showChance:null,//按钮上赔率
    everyBoxBet:null,//每个区域总下注
    myBets:null,//我的下注每个区域的
    everyChance:null,//每个区域概率
    myGold:0,//个人金币总量
    activeHorse:null,//活跃马匹
    // rankHorse:null,//马匹排名
    gameBegin:false,
    runTrack:false,
    gateOpen:false,
    runTrackOver:false,
    canBet:false,
    totalArea:3,
    starttime:30,
    mapiposition:null,//初始马匹位置
    mapipositionY:null,//初始马匹位置Y
    horseTurened:null,//已经转向的马
    horse:null,
    movedistance:0,
    horsestate0:false,
    horsestate1:false,
    horsestate11:false,
    horsestate12:false,
    horsestate2:false,
    horsestate22:false,
    // turnedOne:false,
    horsestate3:false,
    horsestate31:false,
    horsestate32:false,
    horsestate4:false,
    horsestate5:false,
    horsestate6:false,
    horOneZorder:0,
    // mathSeed:6666,
    randomSeedArr:null,
    // starthorse:null,

    ctor: function () {
        this._super();
        this.btn_bets = [];
        this.btn_sendBets = [];
        this.headNodeArr = [];
        this.showMyBet = [];
        this.showTotalBet = [];
        this.showChance = [];
        this.activeHorse = [];
        this.horseTurened = [];
        this.everyBoxBet = [];
        this.selectBet = 0;
        this.myBets = [];
        this.horse = [];
        this.randomSeedArr = [];
        this.everyChance = [];
        this.mapiposition = [];
        this.mapipositionY = [];
        //每个格子里筹码的上限
        this.curChipNum = [];
        this.maxChipNum = [];
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
        this.mod_racing = mod_game;
        this.mod_racing.bindUi(this);
        this.init();
    },

    show:function(){
        cc.spriteFrameCache.addSpriteFrames(res.chipPlist);
        cc.spriteFrameCache.addSpriteFrames(res.yybfwinroll);
        cc.spriteFrameCache.addSpriteFrames(res.horseplist_1);
        cc.spriteFrameCache.addSpriteFrames(res.horseplist_2);
        cc.spriteFrameCache.addSpriteFrames(res.horseplist_3);
        cc.spriteFrameCache.addSpriteFrames(res.horseplist_4);
        cc.spriteFrameCache.addSpriteFrames(res.horseplist_5);
        cc.spriteFrameCache.addSpriteFrames(res.horseplist_6);
        this.node = this.game.uimgr.createnode(res.goldRacing,true);
        this.addChild(this.node);
        this.batchSP = cc.SpriteBatchNode.create(res.chippng);
        this.node.addChild(this.batchSP);

        this.betsLayer = ccui.helper.seekWidgetByName(this.node,"betsLayer");
        this.totalBetLayer = ccui.helper.seekWidgetByName(this.node,"betsInfo");
        this.endLayer = ccui.helper.seekWidgetByName(this.node,"endInfo");
        this.endLayer.setVisible(false);
        this.node.scheduleUpdate();
        this.node.update= this.updateTime.bind(this);

        this.trackLayer = ccui.helper.seekWidgetByName(this.node,"track_move");
        this.trackItemLayer = ccui.helper.seekWidgetByName(this.node,"track_item");
        this.trackHorseLayer = ccui.helper.seekWidgetByName(this.node,"track_horse");
        this.mapiLayer = ccui.helper.seekWidgetByName(this.node,"mapiLayer");


        var totalHorse = this.mapiLayer.getChildrenCount();
        for (var i=0;i<totalHorse;i++){
            this.horse[i] = this.mapiLayer.getChildren()[totalHorse - i -1];
            this.mapiposition[i] = this.mapiLayer.getChildren()[totalHorse - i -1].getPosition();
            this.mapipositionY[i] = this.mapiLayer.getChildren()[totalHorse - i -1].getPositionY();
        }
        this.horOneZorder = this.horse[0].getZOrder();
        this.allHorseAnim(0,this.horse);
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


        this.endWinHorse = ccui.helper.seekWidgetByName(this.node,"endAnim");
        this.endWinHorse.setVisible(false);
        this.endWinHorseImg1 = ccui.helper.seekWidgetByName(this.node,"winner1IMG");
        this.endWinHorseImg2 = ccui.helper.seekWidgetByName(this.node,"winner2IMG");
        this.winnerHorImg = ccui.helper.seekWidgetByName(this.node,"winnerHorImg");

        this.playerList = ccui.helper.seekWidgetByName(this.node,"wuzuo_list");
        this.trendList = ccui.helper.seekWidgetByName(this.node,"trendLayer");

        this.rankTool = new gameclass.mod_ranking();
        this.btn_xuya = ccui.helper.seekWidgetByName(this.node,"btn_bets5");
        this.helpNode = ccui.helper.seekWidgetByName(this.node,"helpInfo");
        this.helpNode.setZOrder(10000)
        this.helpNode.setVisible(false);
        this.nextLayout = ccui.helper.seekWidgetByName(this.node,"nextLayout");
        this.nextLayout.setVisible(false);
        mod_sound.playbmg(g_music["racingbets"],true);
        this.maskChipLayer = ccui.helper.seekWidgetByName(this.node,"maskChipLayer");
        this.maskChipLayer.setVisible(false);
    },

    init:function(){
        this._timeContain = ccui.helper.seekWidgetByName(this.node,"readyMovie");
        this._timerControl = new gameclass.timeTextControl(this._timeContain, res.goldTimeBar);
        this.myMoneyText = ccui.helper.seekWidgetByName(this.node,"gold");
        this.initShow();
    },

    getTime:function(time){
        this.overTime = parseInt(new Date().getTime()) + time*1000;
        this._timeContain.setVisible(false);
    },

    updateroominfo:function(data){
        this.gameType = this.mod_racing.roominfo.type;
        this.betsArr = [100,200,500,1000,5000];
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
                    _this.mod_racing.sendLastBets();
                    sender.setEnabled(false);
                    sender.setBright(false);
                }
            })
        }
        // for(var i = 0;i < ccui.helper.seekWidgetByName(this.node,"clickLayer").getChildrenCount();i++){
        //     cc.log("输出随机数",this.seededRandom(-200,300))
        // }
        // this.getRandomArr(this.mathSeed);
        this.recordArr = [];
        this.changeRecordArr(data.trend);
        this.initRecord();
        this.myGold = data.total;//个人金币总量
        this.initMyInfo(data.total);
        this.setBetImg();
        this.initHorse(data.active);//初始化三匹马
        this._timerControl.startCount(data.time);
        this.getTime(data.time);
        this.initPL(data.pl);
        if(data.time <= this.starttime){
            this.gameBegin = true;
            this.initTableBet(data.betinfo,data.gametotal);
            this.totalBetLayer.setVisible(true);
            this._timerControl.startCount(data.time);
        }else{
            this.gameBegin = false;
            this.nextLayout.setVisible(true);
            this.totalBetLayer.setVisible(false);
            this._timerControl.startCount(data.time - this.starttime);
        }
        this.canBet = (data.time <= this.starttime);
    },


    addRecordArr:function(hor1,hor2,chance){
        var str = hor1+" - "+hor2+"       "+chance;
        this.recordArr.push(str);
    },

    changeRecordArr:function(arr){
        for(var i = 0;i < arr.length;i++){
            var str = arr[i][0]+" - "+arr[i][1]+"       "+arr[i][2];
            this.recordArr.push(str);
        }
    },

    initRecord:function(){
        for(var i = 0;i < this.trendList.getChildrenCount();i++){
            this.trendList.getChildren()[i].ignoreContentAdaptWithSize(true);
            this.trendList.getChildren()[i].setString(this.recordArr[this.recordArr.length-1-i]);
        }
    },


    initMyInfo:function(total){
        var head = ccui.helper.seekWidgetByName(this.node,"myIcon");
        gameclass.mod_base.showtximg(head,this.mod_racing.logindata.imgurl, 0, 0,"im_headbg5", false);
        ccui.helper.seekWidgetByName(this.node,"name").setString(this.mod_racing.logindata.name || "游客");
        ccui.helper.seekWidgetByName(this.node,"gold").ignoreContentAdaptWithSize(true);
        ccui.helper.seekWidgetByName(this.node,"gold").setString(gameclass.changeShow(total));
    },
    initHorse:function(horarr){
        var horse = ccui.helper.seekWidgetByName(this.node,"horseLayer");
        for(var i = 0;i < horse.getChildrenCount();i++) {
            this.activeHorse[i]= horarr[i];
            var sp = horse.getChildren()[i];
            sp.setString(horarr[i]+"号")
            sp.ignoreContentAdaptWithSize(true);
        }
    },

    initPL:function(chance){//每个区域我的下注，总下注,赔率
        for(var i = 0;i < chance.length;i++){//参数是数组
            this.everyChance[i] = chance[i];
            this.reflashPL(i,this.everyChance[i],chance[i]);
        }
    },
    reflashPL:function(index,chance){//概率
        this.showChance[index].setString("x"+chance);
        if (chance <=10){
            this.showChance[index].setColor(cc.color(252,248,191));
        }else {
            this.showChance[index].setColor(cc.color(255,165,0));
        }
    },
    initTableBet:function(betsArr,totalArr){//每个区域我的下注，总下注,赔率
        for(var i = 0;i < totalArr.length;i++){//参数是数组
            this.everyBoxBet[i] = totalArr[i];
            this.myBets[i] = betsArr[i];
            this.reflashBet(i,this.myBets[i],this.everyBoxBet[i]);
        }
    },
    reflashBet:function(index,_bet,totalbet){//区域，我的，总下注
        if(_bet >= 10000){
            var money = (_bet - _bet%1000)/10000;
            this.showMyBet[index].setString(money+"万");
        }else{
            this.showMyBet[index].setString(_bet);
        }

        if(totalbet >= 10000){
            var money = (totalbet - totalbet%1000)/10000;
            this.showTotalBet[index].setString(money+"万");
        }else{
            this.showTotalBet[index].setString(totalbet);
        }
    },

    onEnd:function(data){
        var _this = this
        this. rewardArr = [0];
        this.endWinInfo(data.rating);
        this.initHorse(data.active);//三匹活跃马
        this.initPL(data.pl);
        this.addRecordArr(data.horse[0],data.horse[1],data.winpl);
        this.initRecord();
        // this.mathSeed = data.rand;
        this.getRandomArr(data.rand);
        mod_sound.stopbmg();
        ccui.helper.seekWidgetByName(this.endLayer,"endwintotal").setString(data.win/10000 + "万");
        ccui.helper.seekWidgetByName(this.endLayer,"endwintotal").ignoreContentAdaptWithSize(true);
        ccui.helper.seekWidgetByName(this.endLayer,"endwinhouse").setString(data.horse[0]+" - "+data.horse[1]);
        ccui.helper.seekWidgetByName(this.endLayer,"endwinhouse").ignoreContentAdaptWithSize(true);
        ccui.helper.seekWidgetByName(this.endLayer,"endwinmul").setString(data.winpl);
        ccui.helper.seekWidgetByName(this.endLayer,"endwinmul").ignoreContentAdaptWithSize(true);
        this.endWinHorseImg1.setTexture(res["racingNum"+data.horse[0]]);
        this.endWinHorseImg2.setTexture(res["racingNum"+data.horse[1]]);
        this.windata = data.horse;
        this.gameBegin = false;
        this.totalBetLayer.setVisible(false);
        this._timeContain.setVisible(false);
        this.endLayer.setVisible(false);
        this.noticeAnim(0,function(){//买定离手
            _this.runTrack = true;
            _this.allHorseAnim(0,_this.horse);
            //_this.endLayer.setVisible(true);
        })
    },
    endWinInfo:function(winarr){
        var rankLayer =  ccui.helper.seekWidgetByName(this.node,"rankEndLayer");
        for (var i = 0;i<rankLayer.getChildrenCount();i++){
            rankLayer.getChildren()[i].setVisible(false);
        }
        if (null == winarr) return;
        for (var i = 0;i<winarr.length;i++){
            var sp = rankLayer.getChildren()[i]
            sp.setVisible(true);
            ccui.helper.seekWidgetByName(sp,"name").setString(winarr[i].name);
            ccui.helper.seekWidgetByName(sp,"gold").setString(winarr[i].win);
            gameclass.mod_base.showtximg(sp,winarr[i].head, 0, 0,"im_headbg5", false);
        }
    },
    reflashMyMoeny:function(){
        this.myMoneyText.setString(gameclass.changeShow(this.myGold));
    },
    onPlayerBet:function(data){
        this.everyBoxBet[data.index] += data.gold;
        if (data.uid == this.mod_racing.logindata.uid){
            this.myBets[data.index] += data.gold;
        }
        this.myGold = data.total;
        this.reflashMyMoeny();
        this.reflashBet(data.index,this.myBets[data.index],this.everyBoxBet[data.index],this.everyChance[data.index]);
    },
    //续压
    onLastBets:function(data){
        for(var i = 0;i  < 15;i++){
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


    startGame:function(){

        cc.log("进入statrgame");
        this.gameBegin = true;
        this.runTrackOver = false;
        this._timeContain.setVisible(true);
        // this._timeContain.stopCount();
        // cc.log(this.curTime);
        this._timerControl.startCount(this.curTime);
        this.nextLayout.setVisible(false);
        this.totalBetLayer.setVisible(true);
        this.endLayer.setVisible(false);
        mod_sound.playbmg(g_music["racingbets"],true);
        //this.trackLayer.setVisible(false);
        this.setBetImg();
        for(var i = 0; i < this.betsLayer.getChildrenCount();i++){
            this.everyBoxBet[i] = 0;
            this.myBets[i] = 0;
            // this.everyChance[i] = 0;
            this.showMyBet[i].setString("0");
            this.showTotalBet[i].setString("0");
            //this.showChance[i].setString("0");
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
    allHorseAnim:function(act,spArr){
        for(var i=0;i<spArr.length;i++){
            this.runHorseAnim(spArr[i],i+1,act);
        }
    },
    runHorseAnim:function(sp,index,act){//马编号，动作0站立 1右跑 2右下 3下 4左下 5左 6冲刺
        var allFrame = [];
        for(var i = 1; i < 9; i++){
            var str = "horse_"+index+"_"+act+i+".png";
            var allf = cc.spriteFrameCache.getSpriteFrame(str);//new cc.SpriteFrame()
            allFrame.push(allf);
        }
        //每隔0.03秒切换一张图片
        var animation = new cc.Animation(allFrame,0.1);
        var animate = new cc.Animate(animation);
        var action = animate.repeatForever();//new cc.RepeatForever(animate)
        sp.stopAllActions();
        sp.runAction(action);
        sp.setVisible(true);
    },
    noticeAnim:function(type,func){
        this.start.setVisible(true);
        //买定离手
        if(type == 0){
            this.startIMG.setTexture(res.mdls);
            // this._timeContain.setVisible(false);
            this.canBet = false;
            //mod_sound.playeffect(g_music["brttz_mdls"],false);
        }else{
            this.startIMG.setTexture(res.qxz);
            //mod_sound.playeffect(g_music["brttz_xztip"],false);
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
        //点击桌台下注按钮
        for(var i = 0;i < this.betsLayer.getChildrenCount();i++){
            this.btn_sendBets[i] = this.betsLayer.getChildren()[i];
            this.showMyBet[i] = this.btn_sendBets[i].getChildByName("betsscore");
            this.showMyBet[i].ignoreContentAdaptWithSize(true);
            this.showTotalBet[i] = this.btn_sendBets[i].getChildByName("betstotal");
            this.showTotalBet[i].ignoreContentAdaptWithSize(true);
            this.showChance[i] = this.btn_sendBets[i].getChildByName("betschance");
            this.showChance[i].ignoreContentAdaptWithSize(true);


            this.btn_sendBets[i].index = i;

            this.btn_sendBets[i].addTouchEventListener(function(sender,type){
                if(type != ccui.Widget.TOUCH_ENDED) return;
                if(!_this.canBet){
                    gameclass.showText("请等待下一局开始");
                    return;
                }
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                _this.addMask(0.15);
                _this.mod_racing.sendBets(sender.index,_this.betsArr[_this.selectBet]);

            })
        }

        //退出游戏按钮
        //ccui.helper.seekWidgetByName(this.node,"btn_jiesan").getChildByName("sp").loadTexture(res.btn_quitExit,ccui.Widget.LOCAL_TEXTURE);
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
                _this.mod_racing.dissmissroom();
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
            ccui.helper.seekWidgetByName(_this.node,"btn_list").runAction(cc.sequence(cc.moveTo(0.3,cc.p(956,320)),cc.callFunc(function(){
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
                    _this.mod_racing.sendWuzuo();
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
            _this.mod_racing.sendPlayerRecord();
        });
        gameclass.createbtnpress(this.node, "btn_rank", function () {
            _this.game.uimgr.showui("yybfRankUi");
            _this.mod_racing.sendRankLisk();
        });
        gameclass.createbtnpress(this.node, "btn_bangzhu", function () {
            _this.helpNode.setVisible(true);
            _this.btn_exitCaidan();
        });
        gameclass.createbtnpress(this.node, "helpInfo", function () {
            _this.helpNode.setVisible(false);
        });
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
        ccui.helper.seekWidgetByName(this.node,"btn_list").runAction(cc.sequence(cc.moveTo(0.3,cc.p(1136,320)),cc.callFunc(function(){
            _this.zhankai = false;
            _this.btn_exit.setVisible(false);
            ccui.helper.seekWidgetByName(_this.node,"btn_caidan").setTouchEnabled(true);
        })))
    },

    setBetImg:function(){//根据金币数量设置投注按钮是否可见
        for(var i = 0;i < 5;i++){
            if(i == this.selectBet){
                this.btn_bets[i].setScale(1);
            }else{
                this.btn_bets[i].setScale(0.8);
            }

            if(this.myGold < this.betsArr[i]){
                this.btn_bets[i].setTouchEnabled(false);
                this.btn_bets[i].setBright(false);
            }else{
                this.btn_bets[i].setTouchEnabled(true);
                this.btn_bets[i].setBright(true);
            }
        }
    },

    updateTime:function(dt){
        this._timerControl.update();
        var curTime = this.overTime - parseInt(new Date().getTime());
        this.curTime = Math.ceil(curTime/1000);
        if (this.runTrack ){

            this.updateHorsePos();
            this.rollLayerAnmi(12);
        }else if(this.runTrackOver){
            this.startGame();
        }
        //cc.log("移动距离",this.movedistance);
        if(this.gameBegin) return;
        if(curTime / 1000 < this.starttime){
            this.startGame();
        }
    },
    updateHorsePos:function () {
        var _this = this;
        if(this.movedistance <= 0){
            this.totalBetLayer.setVisible(false);
        }
        if(this.movedistance<3200 && this.movedistance>=1000&&this.gateOpen){//起步阶段
            if(!this.horsestate0){
                this.horsestate0 = true;
                this.randomHoesePos(300,150);
                this.horse[this.activeHorse[0]-1].runAction(cc.moveTo(1,cc.p(this.horse[this.activeHorse[0]-1].getPositionX()+250,this.horse[this.activeHorse[0]-1].getPositionY())));
            }
        }else if(this.movedistance >= 3200 && !this.horsestate1){//第一阶段并排
            this.horsestate1 = true;
            this.horse[this.activeHorse[0]-1].runAction(cc.sequence(cc.moveTo(0.8,cc.p(this.horse[this.activeHorse[0]-1].getPositionX()-200,this.horse[this.activeHorse[0]-1].getPositionY())), cc.callFunc(function(){
                _this.randomHoesePos(100,400);
                _this.randomHoesePosY(1);
            })));
        }else if(this.movedistance >= 5000 && !this.horsestate11){
            this.horsestate11 = true;
            this.randomHoesePos(200,100);
        } else if(this.movedistance >= 6000 && !this.horsestate12){
            this.horsestate12 = true;
            this.horse[this.activeHorse[1]-1].runAction(cc.sequence(cc.moveTo(0.8,cc.p(this.horse[this.activeHorse[1]-1].getPositionX()+100,this.horse[this.activeHorse[1]-1].getPositionY())), cc.callFunc(function(){
                _this.randomHoesePos(100,200);
            })));
        }else if(this.movedistance >= 8000 && !this.horsestate2){
            this.randomHoesePos(20,0);
            for(var i=0;i<this.horse.length;i++){
                var find = false;
                for(var j=0;j<this.horseTurened.length;j++){
                    if (this.horseTurened[j] == i){
                        find = true;
                        break;
                    }
                }
                if (find){
                    continue;
                }
                if(this.movedistance + this.horse[i].getPositionX()>9300){
                    var sph = this.horse[i];
                    sph.indexHorse = i;
                    this.horseTurened.push(i);
                    this.runHorseAnim(this.horse[i],i+1,2);
                    sph.runAction(cc.sequence(cc.moveTo(0.8,cc.p(1500,sph.getPositionY()-100)), cc.callFunc(function(obj){
                        _this.runHorseAnim(obj,obj.indexHorse+1,3);
                        _this.horseMoveDown(obj,2);
                        if(_this.horseTurened.length>=6){
                            _this.horsestate2 = true;
                            _this.horseTurened = [];
                        }
                    })));
                }
            }
        }else if(this.movedistance >= 8100 && !this.horsestate22){
            this.horsestate22 = true;
            var rank = this.getRankHorse();
            var baseX = this.horse[rank[5]].getPositionX();
            for(var i=0;i<rank.length;i++){
                this.horse[rank[5-i]].setPositionX(baseX+i*30);
            }
        } else if(this.movedistance >= 9400 && !this.horsestate3){
            this.setRightY(5,30);
            for(var i=0;i<this.horse.length;i++){
                var find = false;
                for(var j=0;j<this.horseTurened.length;j++){
                    if (this.horseTurened[j] == i){
                        find = true;
                        break;
                    }
                }
                if (find){
                    continue;
                }
                if(this.horse[i].getPositionY()<600){
                    var sph = this.horse[i];
                    sph.indexHorse = i;
                    this.horseTurened.push(i);
                    this.runHorseAnim(this.horse[i],i+1,4);
                    sph.runAction(cc.sequence(cc.moveTo(1.2,cc.p(800,this.mapipositionY[this.horse.length-1-i])), cc.callFunc(function(obj){
                        _this.runHorseAnim(obj,obj.indexHorse+1,5);
                        if(_this.horseTurened.length>=6){
                            _this.horsestate3 = true;
                            _this.horseTurened = [];
                        }
                    })));
                }
            }
        }else if(this.movedistance >= 9420 && this.horsestate3  && !this.horsestate31){
            this.scheduleOnce(function(){
                this.horsestate31 = true;
            },0.1)
        }else if(this.movedistance >= 9420 && !this.horsestate32){
            this.horsestate32 = true;
            this.scheduleOnce(function(){
                for(var i=0;i<this.horse.length;i++){
                    this.horse[i].runAction(cc.moveTo(1.0,cc.p(this.horse[i].getPositionX(),this.mapipositionY[this.horse.length-1-i])));
                }
            },0.1)
        } else if(this.movedistance >= 9520 && this.movedistance < 10000){//马匹后移
            this.randomHoesePos(20,0);
        }else if(this.movedistance >= 10000 && !this.horsestate4){
            this.horsestate4 = true;
            this.horse[this.activeHorse[1]-1].runAction(cc.sequence(cc.moveTo(0.8,cc.p(this.horse[this.activeHorse[1]-1].getPositionX()-250,this.horse[this.activeHorse[1]-1].getPositionY())), cc.callFunc(function(){
                _this.randomHoesePos(20,0);
            })));
        }else if(this.movedistance >= 12000 && !this.horsestate5){
            this.horsestate5 = true;
            var ranklast = this.getRankHorse();
            var hor1 = this.horse[ranklast[0]];
            hor1.indexHorse = ranklast[0];
            this.runHorseAnim(hor1,hor1.indexHorse+1,6);
            var hor2 = this.horse[ranklast[1]];
            hor2.indexHorse = ranklast[1];
            hor1.runAction(cc.sequence(cc.moveTo(1.1,cc.p(hor1.getPositionX()-400,hor1.getPositionY())), cc.callFunc(function(obj){
                _this.runHorseAnim(obj,obj.indexHorse+1,5);
                _this.randomHoesePos(150,200);
                _this.runHorseAnim(hor2,hor2.indexHorse+1,6);
                hor2.runAction(cc.sequence(cc.moveTo(1.2,cc.p(hor2.getPositionX()-400,hor2.getPositionY())), cc.callFunc(function(obj){
                    _this.runHorseAnim(obj,obj.indexHorse+1,5);
                    // _this.randomHoesePos(100,200);
                })));
            })));
        } else if(this.movedistance >= 14500 && this.movedistance < 14900){
            this.randomHoesePos(20,0);
        }else if(this.movedistance >= 15100 && !this.horsestate6){
            this.horsestate6 = true;
            var hor1 = this.horse[this.windata[0]-1];
            hor1.indexHorse = this.windata[0]-1;
            this.runHorseAnim(hor1,hor1.indexHorse+1,6);
            var hor2 = this.horse[this.windata[1]-1];
            hor2.indexHorse = this.windata[1]-1;
            hor1.runAction(cc.sequence(cc.moveTo(1.5,cc.p(cc.winSize.width-250,hor1.getPositionY())), cc.callFunc(function(obj){
                _this.runHorseAnim(obj,obj.indexHorse+1,5);
                _this.runHorseAnim(hor2,hor2.indexHorse+1,6);
                hor2.runAction(cc.sequence(cc.moveTo(1.5,cc.p(hor1.getPositionX()+100,hor2.getPositionY())), cc.callFunc(function(obj){
                    _this.runHorseAnim(obj,obj.indexHorse+1,5);
                })));
            })));
        }

    },
    getRankHorse:function () {
        var rank = [0,1,2,3,4,5];
        var tmpHor = [];
        for(var i=0;i<this.horse.length;i++){
            tmpHor[i] = this.horse[i].getPositionX();
        }
        // cc.log(tmpHor);
        for(var i=0;i<tmpHor.length;i++){
            for(var j=0;j<tmpHor.length-1-i;j++){
                if(tmpHor[j]< tmpHor[j+1]){
                    var t=tmpHor[j];
                    tmpHor[j]=tmpHor[j+1];
                    tmpHor[j+1]=t;

                    var temp = rank[j];
                    rank[j]=rank[j+1];
                    rank[j+1]=temp;
                }
            }
        }
        return rank;
    },
    setHoesePosY:function (posy,hor1,hor2) {
        var mindis = hor1.getContentSize().width;
        var dis = hor1.getPositionX()-hor2.getPositionX();
        var moveX = hor1.getPositionX();
        if ( dis <mindis){
            moveX = hor2.getPositionX()+mindis+20
        }
        hor1.runAction(cc.moveTo(1.5,cc.p(moveX+150,posy)));
        hor2.runAction(cc.moveTo(1.5,cc.p(hor2.getPositionX()+150,posy)));
    },
    randomHoesePosY:function (state) {//1上三排  2上两排
        var _this = this;
        if(1 == state){//上
            // var rank = this.getRankHorse();
            for (var i=0;i<this.horse.length;i+=2){
                var spHor1 = this.horse[i];
                var spHor2 = this.horse[i+1];
                if (spHor1.getPositionX() < spHor2.getPositionX()){
                    spHor1 = this.horse[i+1];
                    spHor2 = this.horse[i];
                }
                this.setHoesePosY(this.mapipositionY[i/2+1],spHor1,spHor2);
            }
            var horsize = this.horse[0].getContentSize().width;
            // this.scheduleOnce(function(){
            //     for(var i=1;i<rank.length;i++){
            //         _this.horse[rank[i]].runAction(cc.moveTo(0.5,cc.p(_this.horse[rank[i-1]].getPositionX()-horsize/2,_this.horse[rank[i]].getPositionY())));
            //     }
            // },1)

        }else if(2 == state){//上两排

        }
    },
    horseMoveDown:function (horse,speed) {
        horse.runAction(cc.moveTo(speed,cc.p(horse.getPositionX(),horse.getPositionY()-300)));
    },

    getRandomArr : function(mathseed) {
        this.randomSeedArr = []
        for(var i=0;i<this.horse.length;i++){
            // var seed = 0
            // if (i<=0){
            //     seed = this.seededRandom(mathseed);
            // }else {
            //     seed = this.seededRandom(Math.random(1000*this.randomSeedArr[i-1]));
            // }
            var seed = this.seededRandom(mathseed+i*12345);
            seed += 0.25;
            this.randomSeedArr.push(seed);
        }
    },
    seededRandom : function(mathseed) {
        var m_z = 987654321;
        var mask = 0xffffffff;
        var m_w = mathseed;
        m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
        m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
        var result = ((m_z << 16) + m_w) & mask;
        result /= 4294967296;
        return result + 0.5;
    },
    randomHoesePos:function (base,move) {
        for(var i=0;i<this.horse.length;i++){
            var find = false;
            for(var j=0;j<this.horseTurened.length;j++){
                if (this.horseTurened[j] == i){
                    find = true;
                    break;
                }
            }
            if (find){
                continue;
            }
            // var num=Math.round(Math.random()*base);
            var num=Math.round(this.randomSeedArr[i]*base);
            num -= move;
            // var time = Math.random();
            var time = this.randomSeedArr[i];
            time += 0.8;
            // if(time > 1){
            //     time = 1;
            // }
            this.horse[i].runAction(cc.moveTo(time,cc.p(this.horse[i].getPositionX()+num,this.horse[i].getPositionY())));
        }
    },
    setRightY:function (base,move) {
        for(var i=0;i<this.horse.length;i++){
            var find = false;
            for(var j=0;j<this.horseTurened.length;j++){
                if (this.horseTurened[j] == i){
                    find = true;
                    break;
                }
            }
            if (find){
                continue;
            }
            // var num=Math.round(Math.random()*base);
            var num=Math.round(this.randomSeedArr[i]*base);
            num -= move;
            // var time = Math.random();
            var time = this.randomSeedArr[i];
            time += 0.5;
            if(time > 1){
                time = 1;
            }
            this.horse[i].runAction(cc.moveTo(time,cc.p(this.horse[i].getPositionX(),this.horse[i].getPositionY()+num)));
        }
    },
    openGate:function (open) {
        if (open){
            ccui.helper.seekWidgetByName(this.node,"horse_gate_open").setVisible(true);
            ccui.helper.seekWidgetByName(this.node,"horse_gate_close").setVisible(false);
        }else {
            ccui.helper.seekWidgetByName(this.node,"horse_gate_open").setVisible(false);
            ccui.helper.seekWidgetByName(this.node,"horse_gate_close").setVisible(true);
        }
    },
    rollLayerAnmi:function (distance) {
        var _this = this;
        var movedis = distance;
        this.trackLayer.setVisible(true);
        var sp = this.trackLayer;//-8128  -1340
        var sp2 = this.trackItemLayer;
        var spHor = this.trackHorseLayer;
        var gate = ccui.helper.seekWidgetByName(this.node,"horse_gate_open");
        var tracksize = this.trackLayer.getContentSize();
        var winsize = cc.winSize;
        if (sp.getPositionX() > (winsize.width - tracksize.width+50) && -1340 == sp.getPositionY() ){
            sp.setPositionX(sp.getPositionX()-movedis);
            sp2.setPositionX(sp2.getPositionX()-movedis);
            // spHor.setPositionX(spHor.getPositionX()-movedis);
            this.movedistance += movedis
            if (!this.gateOpen){
                spHor.setPositionX(spHor.getPositionX()-movedis);
            }
            if (sp.getPositionX()<= (winsize.width-gate.getPositionX()-400) && !this.gateOpen){
                this.gateOpen = true;
                this.runTrack = false;
                mod_sound.playeffect(g_music["racingstart"],false);
                this.scheduleOnce(function(){
                    _this.runTrack = true;
                    _this.openGate(true);//开门
                    _this.allHorseAnim(1,_this.horse);
                    mod_sound.playbmg(g_music["racingrun"],true);
                },1)
            }
        }else if(sp.getPositionX() <= (winsize.width - tracksize.width+50)&& -1340 == sp.getPositionY()){
            if(this.horsestate2){
                sp.setPositionY(sp.getPositionY()+movedis);
                sp2.setPositionY(sp2.getPositionY()+movedis);
                _this.allHorseAnim(3,_this.horse);
            }
        }else if(sp.getPositionX() <= (winsize.width  - tracksize.width +50)&& sp.getPositionY() > -1340 &&sp.getPositionY() <0 ){
            sp.setPositionY(sp.getPositionY()+movedis);
            sp2.setPositionY(sp2.getPositionY()+movedis);
            this.movedistance += movedis
            for (var i=0;i<this.horse.length;i++){
                if (this.horse[i].getPositionX() < 1320){
                    this.horse[i].setPositionX(1330);
                }
            }
            this.setRightY(20,5);
        }else if(sp.getPositionY() >= 0 && sp.getPositionX() <= (winsize.width  - tracksize.width +50)){
            if(this.horsestate31){
                this.initHorseZorder(1);
                sp.setPositionX(sp.getPositionX()+movedis);
                sp2.setPositionX(sp2.getPositionX()+movedis);
                _this.allHorseAnim(5,_this.horse);
            }
        }else if(sp.getPositionY() >= 0 && sp.getPositionX() > (winsize.width  - tracksize.width +50)&& sp.getPositionX()<0){
            sp.setPositionX(sp.getPositionX()+movedis);
            sp2.setPositionX(sp2.getPositionX()+movedis);
            this.movedistance += movedis
        }else if(sp.getPositionY() >= 0 && sp.getPositionX() >= 0 ){
            // this.endLayer.setVisible(true);
            this.openGate(false);
            this.gateOpen = false;
            this.runTrack = false;
            this.horsestate0 = false;
            this.horsestate1 = false;
            this.horsestate11 = false;
            this.horsestate12 = false;
            this.horsestate2 = false;
            this.horsestate22 = false;
            this.horsestate3 = false;
            this.horsestate31 = false;
            this.horsestate32 = false;
            this.horsestate4 = false;
            this.horsestate5 = false;
            this.horsestate6 = false;
            this.movedistance = 0;
            mod_sound.stopbmg();
            mod_sound.playeffect(g_music["racingwin"], false);
            for (var i=0;i<this.horse.length;i++){
                this.horse[i].stopAllActions();
            }
            this.endWinHorse.setVisible(true);
            this.winnerHorImg.runAction(cc.sequence(cc.moveTo(0.5,cc.p(375,0)),
                cc.scaleTo(0.25,1.2,1.2),cc.scaleTo(0.25,1,1),cc.callFunc(function(){
                    _this.scheduleOnce(function(){
                        _this.endLayer.setVisible(true);
                        _this.endWinHorse.setVisible(false);
                        _this.scheduleOnce(function(){
                            _this.initPosition();
                            _this.runTrackOver = true;//开始新的一局
                        },5)
                    },1)
                })));

            // this.trackLayer.setVisible(false);
        }
    },
    initPosition: function () {
        this.trackLayer.setPosition(0,-1340);//-8128  -1340
        this.trackItemLayer.setPosition(0,-350);
        this.trackHorseLayer.setPosition(0,0);
        for(var i=0;i<this.mapiposition.length;i++){
            this.horse[i].setPosition(this.mapiposition[i]);
            this.horse[i].setPositionX(this.horse[i].getPositionX())
        }
        this.allHorseAnim(0,this.horse);
        this.initHorseZorder(-1);
    },
    initHorseZorder: function (state) {//>0 1下  -1上
        for(var i=0;i<this.horse.length;i++){
            this.horse[i].setZOrder(this.horOneZorder+i*state);
        }
    },
    destroy: function () {
        this._timerControl.destroy();
    },
});

