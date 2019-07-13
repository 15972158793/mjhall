/**
 * Created by Administrator on 2017-11-15.
 */

gameclass.toubaoTablenew = gameclass.baseui.extend({
    node:null,
    chairNodeArr:null,
    btn_bets:null,
    btn_sendBets:null,
    btn_sendKill:null,
    spr_kill:null,
    con_kill:null,  //存储当前谁杀了
    head_kill:null,
    selectBet:null,//当前选择的单注
    headNodeArr:null,
    zhankai:false,
    zhankai1:false,
    seatPlayer:null,
    isOnSeat:null,//自己是否在座位上
    showBetText:null,
    everyBoxBet:null,
    myGold:0,
    allWin:0,
    endSeatState:null,
    isRefalshZhuang:false,
    talkPos:null,
    beautyNum:300000,
    gameBegin:false,
    killBegin:false,
    saveZhuangInfo:null,
    canBet:false,
    xysz:null,
    killinfo:null,
    bffirst:true,
    haveRob:false,

    ctor: function () {
        this._super();
        this.chairNodeArr = [];
        this.btn_bets = [];
        this.btn_sendBets = [];
        this.btn_sendKill = [];
        this.spr_kill = [];
        this.con_kill = [];
        this.head_kill = [];
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
        this.xyszSp = [];
        this.xysz = [];
        this.myBet = [0,0];
        this.killinfo = [0,0];
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
        this.mod_king = mod_game;
        this.mod_king.bindUi(this);
        this.init();
    },

    show:function(){
        cc.spriteFrameCache.addSpriteFrames(res.chipPlist);
        //cc.spriteFrameCache.addSpriteFrames(res.tb_killPlist);
        this.node = this.game.uimgr.createnode(res.goldToubaonew,true);
        this.addChild(this.node);
        this.batchSP = cc.SpriteBatchNode.create(res.chippng);
        this.node.addChild(this.batchSP);

        this.betsLayer = ccui.helper.seekWidgetByName(this.node,"betsLayer");
        this.killBetsLayer = ccui.helper.seekWidgetByName(this.node,"killBetsLayer");
        this.killNode = ccui.helper.seekWidgetByName(this.node,"killNode");

        for(var i = 0;i < this.killNode.getChildrenCount();i++){
            var kill_node = this.killNode.getChildren()[i];
            this.spr_kill[i] = ccui.helper.seekWidgetByName(kill_node,"kill");

            this.head_kill[i] = ccui.helper.seekWidgetByName(kill_node,"headBg");
        }

        for (var i=0;i<2;i++) {
            var btn = this.killBetsLayer.getChildren()[i];
            btn.getChildren()[1].setString("0");
            btn.getChildren()[1].ignoreContentAdaptWithSize(true);
            btn.getChildren()[0].setVisible(false);
            btn.getChildren()[0].ignoreContentAdaptWithSize(true);
        }

        for(var i=0;i<2;i++){
            this.con_kill[i] = false;
        }

        this.node.scheduleUpdate();
        this.node.update= this.updateTime.bind(this);

        this.clock = new sp.SkeletonAnimation(res.jsontouzhong, res.atlastouzhong);
        this.clock.setAnchorPoint(0.5, 0.5);
        this.clock.setPosition(583,1062);
        this.clock.setVisible(false);
        this.node.addChild(this.clock);

        //大赢家头像
        this.winLayout = new ccui.Layout();
        this.winLayout.setAnchorPoint(0.5,0.5);
        this.winLayout.setPosition(0,0);
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
        // this.baoziAnim = new sp.SkeletonAnimation(res.jsonbaozi, res.atlasbaozi);
        // this.baoziAnim.setPosition(320,568);
        // this.node.addChild(this.baoziAnim);
        // this.baoziAnim.setVisible(false);

        this.start = ccui.helper.seekWidgetByName(this.node,"start");
        this.start.setVisible(false);
        this.startIMG = ccui.helper.seekWidgetByName(this.node,"startIMG");

        this.zhong = ccui.helper.seekWidgetByName(this.node,"clock");
        this.zhong.setVisible(true);

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
        this.roomnum=ccui.helper.seekWidgetByName(this.node,"roomnum");
        this.roomnum.ignoreContentAdaptWithSize(true);
        this.roomnum.setPosition(300,967.89);
        this.roomnum.setVisible(false);

        for(var i = 0;i < 2;i++){
            this.seziSp[i] = ccui.helper.seekWidgetByName(this.node,"sezi"+i);
            this.seziSp[i].setVisible(false);

            this.xyszSp[i] = ccui.helper.seekWidgetByName(this.node,"xysz"+i);
            this.xyszSp[i].setVisible(false);
        }
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
        cc.log("得到时间: this.overTime = ",this.overTime,time,this.gameBegin);
        if(this.mod_king.roominfo.type==gameclass.gameTBBF){
            if(this.gameBegin && time>21){
                this.killBegin=false;
                this.gameBegin=false;
                for (var i=0;i<2;i++) {
                    this.btn_sendKill[i].setVisible(false);
                }
                this._timeContain.setVisible(true);
                this._timerControl.startCount(time);
            }
        }else{
            if (time>22){
                this._timeContain.setVisible(false);
            }else{
                this._timeContain.setVisible(true);
                this._timerControl.startCount(time);
            }
        }

    },

    updateroominfo:function(data){
        cc.log("更新房间信息updateroominfo ===========");
        this.gameType = this.mod_king.roominfo.type;

        if(this.gameType==gameclass.gameTBBF){
            this.roomnum.setString("包厢号:"+this.mod_king.roominfo.roomid);
            this.roomnum.setVisible(true);
        }else{
            this.roomnum.setVisible(false);
        }


        this.betsArr = [100,500,1000,5000,10000];
        // if(this.myGold >= 10000){
        //     this.betsArr = [50,100,200,500,1000];
        // }

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
            if(i<=4){
                this.btn_bets[i].getChildren()[0].ignoreContentAdaptWithSize(true);
            }
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

        this.killBetsLayer = ccui.helper.seekWidgetByName(this.node,"killBetsLayer");
        this.killNode = ccui.helper.seekWidgetByName(this.node,"killNode");
        for(var i = 0;i < this.killNode.getChildrenCount();i++){
            this.btn_sendKill[i] = this.killNode.getChildren()[i];
            this.btn_sendKill[i].index = i;
            this.btn_sendKill[i].addTouchEventListener(function(sender,type){
                if(type != ccui.Widget.TOUCH_ENDED) return;
                if(_this.mod_king.logindata.uid == _this.saveZhuangInfo.uid){
                    gameclass.showText("庄家不能杀");
                    return;
                }

                // if(!_this.killBegin){
                //     //gameclass.showText("还没到杀的时间");
                //     return;
                // }

                _this.mod_king.sendKill(sender.index);
            })
        }

        //设置筹码的TEXT
        for(var i = 0;i < 5;i++){
            this.btn_bets[i].getChildren()[0].setString(this.betsArr[i]);
            this.btn_bets[i].loadTextureNormal(res["betchip"+this.betsArr[i]/10],ccui.Widget.LOCAL_TEXTURE);
        }
        //data.lucky=[1,2];
        this.xysz=data.lucky;
        this.showxysz(this.xysz);

        this.myGold = data.total;
        this.recordArr = [];
        this.changeRecordArr(data.trend);
        this.initMyInfo(data.total);
        this.setBetImg();
        this.initSeatInfo(data.seat);
        this.initZhuangInfo(data.dealer);
        this.initRecord();
        this.checkZhuangBTN(data.isdeal);
        this._timerControl.startCount(data.time);
        this.getTime(data.time);
        if(data.time <= 22){
            this.gameBegin = true;
            cc.log(data.bets);
            this.initTableBet(data.bets);
            var acount = parseInt(data.time / 5);
            this.playBetsMusic(acount);

        }else{
            this.gameBegin = false;
            this.zhong.setVisible(false);
            this.nextLayout.setVisible(true);
        }
        this.canBet = (data.time <= 22&&data.time>5);
        this.seatPlayer = data.seat;
        this.seatPlayer.push(data.dealer);
        for(var i = 0;i < this.betsLayer.getChildrenCount();i++){
            this.reflashBet(i,data.bets[i]);

            this.myBet[i] = data.mybets[i];

            ccui.helper.seekWidgetByName(this.btn_sendBets[i],"mybet").setString(this.myBet[i]);
            //ccui.helper.seekWidgetByName(this.btn_sendBets[i],"mywan").setVisible(true);
        }

        if (data.time <= 5 && data.time>0){
            this.killBegin = true;
            this.killinfo[0] = data.kill[0].uid;
            this.killinfo[1] = data.kill[1].uid;
            this.showKillPlayer(data.kill);
        }else{
            for (var k = 0;k<2;k++) {
                var btn = this.killBetsLayer.getChildren()[k];
                btn.getChildren()[1].setString("0");
                btn.getChildren()[0].setVisible(false);

                this.btn_sendKill[k].setVisible(false);
            }
        }
    },

    //显示幸运数
    showxysz:function(arr){
        for(var i = 0;i < arr.length;i++){
            this.xyszSp[i].setTexture(res["dian"+arr[i]]);
            this.xyszSp[i].setVisible(true);
            this.xyszSp[i].setScale(0.75);
        }
    },

    //刷新杀得玩家
    showKillPlayer:function(kill){
        if(this.bffirst){
            return;
        }
        for (var i =0;i<kill.length;i++){
            this.btn_sendKill[i].setVisible(true);
            if (kill[i].uid==0){
                var btn = this.killBetsLayer.getChildren()[i];
                btn.getChildren()[1].setString("0");
                btn.getChildren()[0].setVisible(false);
                // var animFrames = [];
                // for (var j = 1; j < 12; j++) {
                //     var str = "tb_kill" + j+".png";
                //     var frame = cc.spriteFrameCache.getSpriteFrame(str);
                //     animFrames.push(frame);
                // }
                //
                // var animation = new cc.Animation(animFrames,0.1);
                // var animate = cc.animate(animation);
                // this.spr_kill[i].runAction(animate.repeatForever());
            }else{
                //显示玩家头像
                // this.headNodeArr[i].setVisible(true);
                //var head = this.headNodeArr[i].getChildByName("headBg");
                gameclass.mod_base.showtximg(this.head_kill[i],kill[i].head, 0, 4,"im_headbg12", false);
                this.con_kill[i] = true;
                this.spr_kill[i].setVisible(false);

                var str = this.showBetText[i].getString();
                var allnum = Number(str);           //要改万字
                if (allnum!=0) {
                    var btn = this.killBetsLayer.getChildren()[i];
                    btn.getChildren()[1].setString(allnum);
                    //btn.getChildren()[0].setVisible(true);
                }else{
                    var btn = this.killBetsLayer.getChildren()[i];
                    btn.getChildren()[1].setString("0");
                    btn.getChildren()[0].setVisible(false);
                }
                cc.log("allnum 372   : ",allnum);

                var chipArr = this.getChipArr(allnum);
                for(var j = 0;j < chipArr.length;j++){
                    this.createChip(chipArr[j],(i+1)*10);
                }
            }
        }
    },

    //抢到杀得玩家坐下
    killseat:function(data){
        cc.log("=-=-=-=-=-=",data);
        this.killinfo[data.type] = data.uid;
        this.con_kill[data.type] = true;
        this.spr_kill[data.type].setVisible(false);
        gameclass.mod_base.showtximg(this.head_kill[data.type],data.head, 0, 4,"im_headbg12", false);

        var str = this.showBetText[data.type].getString();
        var allnum = Number(str);           //要改万字
        cc.log("杀得总钱数：",allnum);
        if (allnum!=0){
            var btn = this.killBetsLayer.getChildren()[data.type];
            btn.getChildren()[1].setString(allnum);
            //btn.getChildren()[0].setVisible(true);

            var chair = -1;//-1表示无座玩家飞金币的位置
            if(data.uid == this.mod_king.logindata.uid){
                chair = -2;//-2表示自己头像飞金币的位置
            }else{
                for(var i = 0;i < this.seatPlayer.length;i++){
                    if(data.uid == this.seatPlayer[i].uid && data.uid != this.mod_king.logindata.uid ){
                        chair = i;
                        break;
                    }
                }
            }

            this.fiyChip(chair,(data.type+1)*10,allnum*100);
        }
    },

    changeRecordArr:function(arr){
        cc.log("=========12",arr);
        if(arr==null){
            return;
        }
        //cc.log("arr = ",arr);
        for(var i = 0;i < arr.length;i++){
            this.recordArr[i] = {"point":[],"total":0,"type":0};
            this.recordArr[i].point = arr[i];
            for(var j = 0;j < 3;j++){
                this.recordArr[i].total += arr[i][j];
            }
            this.recordArr[i].type = this.getGameType(arr[i]);
        }
    },

    initRecord:function(){
        cc.log("===========66",this.recordArr,this.recordArr.length);
        if(this.recordArr.length==0){
            return;
        }
        this.trendList.removeAllChildren();
        this.trendList.setScrollBarEnabled(false);
        var len=this.recordArr.length;
        if(len>8){
            len=8;
        }
        for(var i = 0;i < len;i++){
            var result = this.recordArr[i].type;
            //cc.log("result type = ",result);
            var sp = new cc.Sprite(res["yszrecord"+result]);
            var widget = new ccui.Layout();
            widget.setContentSize(64,64);
            widget.addChild(sp);
            sp.setPosition(widget.width/2+5,widget.height/2);
            this.trendList.pushBackCustomItem(widget);
        }
    },

    initMyInfo:function(total){
        var head = ccui.helper.seekWidgetByName(this.node,"myIcon");
        gameclass.mod_base.showtximg(head,this.mod_king.logindata.imgurl, 5, 4,"im_headbg12", false);
        ccui.helper.seekWidgetByName(this.node,"name").setString(this.mod_king.logindata.name || "游客");
        ccui.helper.seekWidgetByName(this.node,"gold").setString(gameclass.changeShow(total));
    },

    initSeatInfo:function(playerInfo){
        cc.log("玩家信息： ",playerInfo);
        for(var i = 0;i < playerInfo.length;i++){
            if(playerInfo[i].uid > 0){
                this.headNodeArr[i].setVisible(true);
                var head = this.headNodeArr[i].getChildByName("headBg");
                gameclass.mod_base.showtximg(head,playerInfo[i].head, 0, 4,"im_headbg12", false);
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
        cc.log("betsArr = ",betsArr);
        for(var i = 0;i < 2 ;i++){//betsArr.length
            if (betsArr[i]==0){
                this.everyBoxBet[i] = betsArr[i];
                this.reflashBet(i,this.everyBoxBet[i]);
            }else {
                this.everyBoxBet[i] = betsArr[i];
                this.reflashBet(i,this.everyBoxBet[i]);
            }

            if (betsArr[i]==0){
                var chipArr = this.getChipArr(betsArr[i]);
            }else {
                var chipArr = this.getChipArr(gameclass.changeShow(betsArr[i]));
            }

            for(var j = 0;j < chipArr.length;j++){
                this.createChip(chipArr[j],i);
            }
        }
    },
    reflashBet:function(index,_bet){
        cc.log("index= ",index,_bet);
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
        cc.log("allchip =",allChip);
        var resultArr = [];
        var chipArr = [100.00,50.00,10.00,5.00,1.00];

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
        var chipSp = new gameclass.bzwChip("chip",num*100);
        chipSp.index = index;
        this.curChipNum[index]++;
        chipSp.setTag(index*1000 + this.curChipNum[index]);
        var pos = this.getRandomPos(index);
        chipSp.setPosition(pos);
        if(index>=10){
            this.killLayer.addChild(chipSp);
        }else {
            this.chipLayer.addChild(chipSp);
        }
        //this.chipLayer.addChild(chipSp);
        return chipSp;
    },

    getRandomPos:function(index){
        var parentNode;
        if(index>=10){
            parentNode = this.killBetsLayer.getChildren()[index/10-1];
        }else {
            parentNode = this.betsLayer.getChildren()[index];
        }

        var _pos = parentNode.getPosition();
        var _posX = _pos.x + (Math.random()-0.5)*(parentNode.getContentSize().width)*0.5;
        var _posY = _pos.y + (Math.random()-0.5)*(parentNode.getContentSize().height)*0.5;
        return cc.p(_posX,_posY);
    },
    initZhuangInfo:function(zhuangInfo){
        this.zhuangInfo = zhuangInfo;
        if(this.mod_king.roominfo.type==gameclass.gameTBBF){
            if(zhuangInfo.uid>0 ){
                this.waitImg.setVisible(false);
                this.haveRob=true;
            }else {
                this.waitImg.setVisible(true);
                this.haveRob=false;
            }
        }
        this.saveZhuangInfo = zhuangInfo;//显示数据
        if(this.mod_king.roominfo.type==gameclass.gameTBBF){
            var headbg=ccui.helper.seekWidgetByName(this.node,"zhuangIcon");
            if(zhuangInfo.uid){
                gameclass.mod_base.showtximg(headbg, zhuangInfo.head, 0, 4,"im_headbg12", false);
            }else {
                if(headbg.getChildByTag(1231)){
                    headbg.removeChildByTag(1231);
                }
            }
            ccui.helper.seekWidgetByName(this.node,"zhuangName").setString(zhuangInfo.name || "无人坐庄");
            if(zhuangInfo.total>0){
                ccui.helper.seekWidgetByName(this.node,"zhuangMoney").setString(gameclass.changeShow(zhuangInfo.total));
            }else {
                ccui.helper.seekWidgetByName(this.node,"zhuangMoney").setString("---");
            }

        }else {
            gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(this.node,"zhuangIcon"),
                zhuangInfo.uid?zhuangInfo.head:"res/im_headbg8.png", 0, 4,"im_headbg12", false);
            ccui.helper.seekWidgetByName(this.node,"zhuangName").setString(zhuangInfo.name || "老炮王");
            ccui.helper.seekWidgetByName(this.node,"zhuangMoney").setString(gameclass.changeShow(zhuangInfo.total));
        }
    },
    getZhuanginfo:function(data){
        this.isRefalshZhuang = true;
        this.zhuangInfo = data;
        this.xysz = data.lucky;
        if(this.mod_king.roominfo.type==gameclass.gameTBBF && data.uid>0){
            this.reflashZhuangInfo();//更新庄的信息。可能换人了
        }
    },
    onSeat:function(data){
        if(data.uid > 0){
            this.seatPlayer[data.index] = data;
            this.headNodeArr[data.index].setVisible(true);
            gameclass.mod_base.showtximg(this.headNodeArr[data.index].getChildByName("headBg"),data.head,0,4,"im_headbg12",false);
            ccui.helper.seekWidgetByName(this.headNodeArr[data.index],"playerName").setString(data.name);
            ccui.helper.seekWidgetByName(this.headNodeArr[data.index],"playerMoney").setString(gameclass.changeShow(data.total));
            //ccui.helper.seekWidgetByName(this.headNodeArr[data.index],"beautyLogo").setVisible(data.total>=this.beautyNum);
            //this.refalshKuang(this.headNodeArr[data.index],data.total);
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
        if(this.mod_king.roominfo.type==gameclass.gameTBBF){
            if(data.uid>0 ){
                this.waitImg.setVisible(false);
                this.haveRob=true;
            }else {
                this.waitImg.setVisible(true);
                this.haveRob=false;
            }
        }
        this.saveZhuangInfo = data;
        ccui.helper.seekWidgetByName(this.node,"zhuangIcon").setVisible(true);
        if(this.mod_king.roominfo.type==gameclass.gameTBBF){
            var headbg=ccui.helper.seekWidgetByName(this.node,"zhuangIcon");
            if(data.uid){
                gameclass.mod_base.showtximg(headbg, data.head, 0, 4,"im_headbg12", false);
            }else {
                if(headbg.getChildByTag(1231)){
                    headbg.removeChildByTag(1231);
                }
            }
            ccui.helper.seekWidgetByName(this.node,"zhuangName").setString(data.name || "无人坐庄");
            if(data.total>0){
                ccui.helper.seekWidgetByName(this.node,"zhuangMoney").setString(gameclass.changeShow(data.total));
            }else {
                ccui.helper.seekWidgetByName(this.node,"zhuangMoney").setString("---");
            }
        }else {
            gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(this.node,"zhuangIcon"),
                data.uid?data.head:"res/im_headbg8.png", 0, 4,"im_headbg12", false);
            ccui.helper.seekWidgetByName(this.node,"zhuangName").setString(data.name || "老炮王");
            ccui.helper.seekWidgetByName(this.node,"zhuangMoney").setString(gameclass.changeShow(data.total));
        }
        //ccui.helper.seekWidgetByName(this.node,"zhuangbeautyLogo").setVisible(data.total >= this.beautyNum);
        //this.refalshKuang(this.node,data.total,1);
        if(data.uid != this.mod_king.logindata.uid){
            this.btn_shangzhuang.setVisible(true);
            this.btn_xiazhuang.setVisible(false);
        }else{
            this.btn_shangzhuang.setVisible(false);
            this.btn_xiazhuang.setVisible(true);
        }
        this.showxysz(this.xysz);//更新筛子
    },
    //动画时间
    //结束动画:买定离手动画1S, 钟移动到中间0.3s,1.3S钟开钟时间,开甩子1.5S,钱飞到庄时间0.5 ,等飞玩庄,金币飞到玩家0.5s,大赢家动画2S,一共7S钟.
    //开局动画:请下注动画1S,摇种1.2S钟。一共2.2S
    onEnd:function(data){
        var _this = this;
        // data.result[0]=this.xysz[0];
        // data.result[1]=this.xysz[1];

        this.rewardArr = this.getRewardIndex(data.result);
        this.resultsz = data.result;

        cc.log("data.result = ",data.result);
        cc.log("this.rewardarr = ",this.rewardArr);
        this.gameResult = this.getGameType(data.result);
        var result = {"point":data.result,"total":data.result[0]+data.result[1],"type":this.gameResult};
        this.windata = data;
        var seziFlyPos = this.rewardArr[this.rewardArr.length - 1];
        cc.log("seziflypos = ",seziFlyPos);
        this.gameBegin = false;
        this.killBegin = false;
        // data.result[0] = this.xysz[0];
        // data.result[1] = this.xysz[1];


        for(var i=0;i<2;i++){
            if (this.con_kill[i]==false){
                this.spr_kill[i].stopAllActions();
                this.spr_kill[i].setTexture(res["sprkill"+i]);
                //this.btn_sendKill[i].setVisible(false);
            }
        }


        this.allWin = 0;
        //统计闲家一共赢多少钱
        for(var i = 0;i < this.endSeatState.length;i++){
            if(this.endSeatState[i].uid != 0 && this.endSeatState[i].uid != this.saveZhuangInfo.uid){
                if(this.endSeatState[i].win > 0){
                    this.allWin += this.endSeatState[i].win;
                }
            }
        }
        this.noticeAnim(0,function(){
            _this.zhong._scale = 2.5;
            _this.zhong.runAction(cc.sequence(cc.spawn(cc.moveTo(0.3,cc.p(320,568)),cc.scaleTo(0.3,1,1)),cc.callFunc(function(){
                _this.zhong.setVisible(false);
                var sp1 = _this.createSpine(1);
                var sp2 = _this.createSpine(2);
                _this.node.addChild(sp2);
                _this.node.addChild(sp1);
                _this.showSezi(data.result,seziFlyPos);
                _this.showPointAnim(data.result);
                var node = _this.betsLayer.getChildren()[seziFlyPos];
                var difx = node.getContentSize().width*0.27;
                var startPosX = node.getPositionX() - difx;
                mod_sound.playeffect(g_music["openCup0"],false);
                _this.node.scheduleOnce(function(){
                    if(sp1) sp1.removeFromParent();
                    if(sp2) sp2.removeFromParent();
                    if(_this.recordArr.length>=8){
                        _this.recordArr.pop();
                    }
                    _this.recordArr.unshift(result);
                    _this.initRecord();
                    var isplay = false;
                    for(var i = 0;i < 2;i++){
                        var spsezi = _this.seziSp[i];
                        var endPos = cc.p(startPosX + difx * i, node.getPositionY());
                        if(spsezi){
                            spsezi.runAction(cc.sequence(cc.spawn(cc.moveTo(0.5,endPos),cc.scaleTo(0.5,0.5,0.5)),cc.callFunc(function(sender){
                                if(!isplay){
                                    _this.showBlink();
                                    isplay = true;
                                }
                                sender.runAction(cc.sequence(cc.delayTime(0.5),cc.fadeTo(0.5,150),cc.callFunc(function(sender){
                                    sender.setVisible(false);
                                },sender)))
                            },spsezi)));
                        }
                    }

                    // if ((data.result[0]==_this.xysz[0]&&data.result[1]==_this.xysz[1])||(data.result[1]==_this.xysz[0]&&data.result[0]==_this.xysz[1])){//结果是幸运数字
                    //     var sp = new cc.Sprite(res.png_xysz);
                    //     _this.addChild(sp);
                    //     sp.setPosition(140,880);
                    //     sp.setScale(5.0);
                    //     sp.setTag(6661);
                    //     sp.runAction(cc.sequence(cc.spawn(cc.moveTo(0.3,cc.p(470,880)),cc.scaleTo(0.3,1)),cc.delayTime(1.5),cc.callFunc(function(sender){
                    //         sender.setVisible(false);
                    //         _this.removeChildByTag(6661);
                    //     },sp)));
                    // }

                    var total = data.result[0] + data.result[1];
                    //if(data.result[0] == data.result[1] ){
                    // mod_sound.playeffect(g_music["baozi_dice"+total],false);
                    // _this.baoziAnim.setVisible(true);
                    // _this.baoziAnim.setAnimation(0, 'baozi', false);
                    // _this.baoziAnim.setCompleteListener(function(){
                    //     _this.baoziAnim.setVisible(false);
                    // })
                    //}else{
                    cc.log("声音：",total);
                    mod_sound.playeffect(g_music["diceds"+total],false);
                    //}
                },1.3333);
            })))
        })
    },
    getGameType:function(arr){
        // if(arr[0] == arr[1] ){
        //     return 1;
        // }else
        if((arr[0]+arr[1])%2== 0){
            return 1;
        }else{
            return 0;
        }
    },
    showPointAnim:function(arr){

        var totalPoint = arr[0]+arr[1];
        var type = this.getGameType(arr);
        for(var i = 0;i < 2;i++){
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
                _this.resultNode.getChildren()[2].ignoreContentAdaptWithSize(true);
                _this.resultNode.getChildren()[2].loadTexture(res["tbresult"+type],ccui.Widget.LOCAL_TEXTURE);
                _this.resultNode.getChildren()[2].setPositionX(_this.resultNode.getChildren()[1].getPositionX()+
                    _this.resultNode.getChildren()[1].width/2 + 10 +_this.resultNode.getChildren()[2].width/2);
                _this.resultNode.getChildren()[2].setScale(0.2);
                _this.resultNode.getChildren()[2].setVisible(true);
                _this.resultNode.setVisible(true);
                _this.resultNode.getChildren()[2].runAction(cc.sequence(cc.scaleTo(0.6,1.2,1.2),cc.scaleTo(0.2,1,1),cc.delayTime(1),
                    cc.callFunc(function(){
                        _this.resultNode.setVisible(false);
                    })
                ))
            })))
        })))

    },
    showSezi:function(arr,index){
        for(var i = 0;i < arr.length;i++){
            var pos = cc.p(280+70*i,568);
            this.seziSp[i].setTexture(res["dian"+arr[i]]);
            this.seziSp[i].setPosition(pos);
            this.seziSp[i].setVisible(true);
            this.seziSp[i].setScale(1);
            this.seziSp[i].setOpacity(255);
        }
    },
    showBlink:function(){
        var _this = this;
        var isPlay = false;
        for(var i = 0;i < this.rewardArr.length;i++ ){
            var sp = this.betsLayer.getChildren()[this.rewardArr[i]].getChildByTag(1111);
            sp.setVisible(true);
            sp.runAction(cc.sequence(cc.blink(1,3),cc.callFunc(function(sender){
                if(!isPlay){
                    _this.endFiyChip();
                    isPlay = true;
                }
                sender.setVisible(false);
            },sp)))
        }
    },

    endFiyChip:function(){
        var _this = this;
        var zhuangPos = ccui.helper.seekWidgetByName(this.node,"zhuangIcon").getPosition();
        var a = 0;
        var b = 0;
        for(var i = 0;i < this.chipLayer.getChildrenCount();i++){
            var sp = this.chipLayer.getChildren()[i];
            if(this.rewardArr.indexOf(sp.index) < 0){
                var flypos = zhuangPos;
                cc.log("杀------",this.killinfo[sp.index],sp.index);
                if (this.killinfo[sp.index]!=0){
                    if (sp.index==0){
                        flypos = cc.p(214,316);
                    }else{
                        flypos = cc.p(433,316);
                    }
                }else {
                    if ((this.xysz[0]==this.resultsz[0]&&this.xysz[1]==this.resultsz[1])||(this.xysz[1]==this.resultsz[0]&&this.xysz[0]==this.resultsz[1]))
                    {
                        var allvalue = this.xysz[0]+this.xysz[1];
                        var ds = allvalue%2;
                        if ((sp.index==1&&ds==0)||(sp.index==0&&ds!=0)){    //和幸运数字一样的退回去
                            flypos = cc.p(-10,568);
                        }
                    }
                }

                if(a == 0){
                    mod_sound.playeffect(g_music["flycoins"]);
                }
                a++;
                sp.setChipMove(0.5,sp.getPosition(),flypos,1);
            }else{
                sp.runAction(cc.sequence(cc.delayTime(0.5),cc.moveTo(0.5,cc.p(320,568)),cc.callFunc(function(sender){
                    sender.removeFromParent();
                },sp)))
            }
        }

        //杀得分数飞向位置
        var dsresult = (this.resultsz[0]+this.resultsz[1])%2;       //结果为双是1
        if (dsresult==0){
            dsresult =1;
        }else{
            dsresult =0
        }
        for(var i = 0;i < this.killLayer.getChildrenCount();i++){
            var sp = this.killLayer.getChildren()[i];
            var conindex = (sp.index/10)-1;
            if(conindex != dsresult){      //杀得人赢了
                var flypos;
                if (conindex==0){          //杀单赢
                    flypos = cc.p(205,200);
                }else{
                    flypos = cc.p(410,200);
                }

                sp.setChipMove(0.5,sp.getPosition(),flypos,1);
            }else{
                var flypos = cc.p(-10,568);

                if ((this.xysz[0]==this.resultsz[0]&&this.xysz[1]==this.resultsz[1])||(this.xysz[1]==this.resultsz[0]&&this.xysz[0]==this.resultsz[1]))
                {
                    //开幸运数字，杀得人的钱给庄家
                    flypos = zhuangPos;
                }
                sp.setChipMove(0.5,sp.getPosition(),flypos,1);
            }
        }


        var _this=this;
        //金币飞向坐着的人
        this.node.scheduleOnce(function(){
            for(var i = 0;i < _this.endSeatState.length;i++){
                if(_this.endSeatState[i].win > 0 && _this.endSeatState[i].uid != 0 && _this.endSeatState[i].uid != _this.saveZhuangInfo.uid){
                    var chiar = _this.getPlayerIndexByID(_this.endSeatState[i].uid);
                    var arr = _this.createJiaChip(_this.endSeatState[i].win);
                    var endPos = _this.getheadPos(chiar);
                    if(chiar<4){
                        endPos.x+=100;
                    }else if(chiar<=7){
                        endPos.x-=100;
                    }
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
                var endPos = cc.p(0,568);
                for(var i = 0;i < 20;i++){
                    //var sp = new cc.Sprite(res["chip100"]);
                    var sp = new cc.Sprite();
                    sp.initWithSpriteFrameName("chip"+100+".png");
                    sp.setPosition(320+(Math.random()-0.5)*(_this.chipLayer.width)*0.2,568+(Math.random()-0.5)*(_this.chipLayer.height)*0.2);
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
                    //ccui.helper.seekWidgetByName(headNode,"zhuangbeautyLogo").setVisible(_this.endSeatState[i].total >= _this.beautyNum);
                    //_this.refalshKuang(headNode,_this.endSeatState[i].total,1);
                }else if(chair >= 0){
                    headNode = _this.headNodeArr[chair];
                    _this.seatPlayer[chair].total = _this.endSeatState[i].total;
                    //ccui.helper.seekWidgetByName(headNode,"beautyLogo").setVisible(_this.endSeatState[i].total >= _this.beautyNum);
                    //_this.refalshKuang(headNode,_this.endSeatState[i].total);
                }
                //刷新桌面上人的金币显示
                if(headNode){
                    cc.log("有bug：chair = ",chair);
                    headNode.getChildren()[1].getChildren()[1].setString(gameclass.changeShow(_this.endSeatState[i].total));
                }
                if(_this.endSeatState[i].uid == _this.mod_king.logindata.uid){
                    _this.myGold = _this.endSeatState[i].total;
                    _this.reflashMyMoeny();
                    _this.setBetImg();
                }
                if(_this.endSeatState[i].uid == _this.saveZhuangInfo.uid){
                    if(_this.endSeatState[i].total > 0){
                        var randomNum = parseInt(Math.random()*3);
                        mod_sound.playeffect(g_music["laugh"+randomNum],false);
                    }else if(_this.endSeatState[i].total < 0){
                        var randomNum = parseInt(Math.random()*2);
                        mod_sound.playeffect(g_music["lose"+randomNum],false);
                    }
                }
            }
            //大赢家动画
            _this.node.scheduleOnce(function(){
                if(_this.windata.uid != 0 && _this.windata.uid != _this.saveZhuangInfo.uid){
                    var chair = _this.getPlayerIndexByID(_this.windata.uid);
                    cc.log("chair = ",chair);
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
        this.winLayout.setPosition(320,568);
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

    getRewardIndex:function(arr){
        var rewardArr = [];
        var totalNum = 0;
        for(var i = 0;i < arr.length;i++){
            totalNum += arr[i];
        }
        // if(arr[0] == arr[1]){
        //     rewardArr.push(2);
        // }else{
        if (totalNum%2==0){
            rewardArr.push(1);
        }else{
            rewardArr.push(0);
        }

        // if(totalNum >= 2){
        //     rewardArr.push(totalNum);
        // }

        // for(var i = 0;i < rewardArr.length;i++){
        //     if(rewardArr[i] == 17){
        //         rewardArr.splice(i,1);
        //     }
        // }
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
        if(data.uid == this.saveZhuangInfo.uid){
            ccui.helper.seekWidgetByName(this.node,"zhuangMoney").setString(gameclass.changeShow(data.total));
            //ccui.helper.seekWidgetByName(this.node,"zhuangbeautyLogo").setVisible(data.total >= this.beautyNum);
            //this.refalshKuang(this.headNodeArr[i],data.total,1);
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
            //ccui.helper.seekWidgetByName(this.btn_sendBets[data.index],"mywan").setVisible(true);

        }else{
            for(var i = 0;i < this.seatPlayer.length;i++){
                if(data.uid == this.seatPlayer[i].uid && data.uid != this.mod_king.logindata.uid ){
                    chair = i;
                    break;
                }
            }
        }
        //刷新座位上玩家的钱
        cc.log("数据信息： ",data);
        cc.log("玩家座位长度：",this.seatPlayer.length,chair,this.seatPlayer[6]);
        for(var i = 0;i < this.headNodeArr.length;i++){
            if(data.uid == this.seatPlayer[i].uid){
                var moneyText = ccui.helper.seekWidgetByName(this.headNodeArr[i],"playerMoney");
                moneyText.setString(gameclass.changeShow(data.total));
                this.seatPlayer[i].total = data.total;
                finduid = true;
                //ccui.helper.seekWidgetByName(this.headNodeArr[i],"beautyLogo").setVisible(data.total >= this.beautyNum)
                //this.refalshKuang(this.headNodeArr[i],data.total);
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
            var difx = (index < 4 ? 2 : -2);
            var act = cc.moveBy(0.1,difx,0);
            this.headNodeArr[index].runAction(cc.sequence(act,act.reverse(),cc.callFunc(function(sender){
                sender.isActing = false;
            },this.headNodeArr[index])))
        }

    },

    //续压
    onLastBets:function(data){
        for(var i = 0;i < 2;i++){
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
            this.game.uimgr.uis["wzuitb"].showDataInfo(data.info);
        }
    },
    onBalance:function(data){
        this.endSeatState.push(data);
    },
    fiyChip:function(chair,index,gold){
        var _this = this;
        var chipArr = this.getChipArr(gold/100);
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
        cc.log("============开始游戏!");
        this.reflashZhuangInfo();//更新庄的信息。可能换人了
        //this.showxysz(this.xysz);//更新筛子
        this.isRefalshZhuang = false;
        this.gameBegin = true;
        this._timeContain.setVisible(true);
        this._timerControl.startCount(22);
        this.nextLayout.setVisible(false);
        this.setBetImg();

        for(var i = 0; i < 2;i++){
            this.everyBoxBet[i] = 0;
            this.showBetText[i].setString("0");
            this.wanText[i].setVisible(false);
            this.curChipNum[i] = 0;

            this.killinfo[i] = 0;
            this.myBet[i] = 0;
            ccui.helper.seekWidgetByName(this.btn_sendBets[i],"mywan").setVisible(false);
            ccui.helper.seekWidgetByName(this.btn_sendBets[i],"mybet").setString("0");

        }

        for (var i=0;i<2;i++) {
            this.con_kill[i] = false;

            this.spr_kill[i].stopAllActions();
            this.spr_kill[i].setTexture(res["sprkill"+i]);
            this.btn_sendKill[i].setVisible(false);
            var btn = this.killBetsLayer.getChildren()[i];
            btn.getChildren()[1].setString("0");
            btn.getChildren()[0].setVisible(false);


            this.spr_kill[i].setVisible(true);
            this.head_kill[i].removeAllChildren();
        }
        this.playBetAnim();//开局动画
    },

    only_end:function(){
        this.reflashZhuangInfo();//更新庄的信息。可能换人了
        this.isRefalshZhuang = false;
        this.gameBegin = true;
        this.nextLayout.setVisible(false);

        for(var i = 0; i < 2;i++){
            this.everyBoxBet[i] = 0;
            this.showBetText[i].setString("0");
            this.wanText[i].setVisible(false);
            this.curChipNum[i] = 0;

            this.killinfo[i] = 0;
            this.myBet[i] = 0;
            ccui.helper.seekWidgetByName(this.btn_sendBets[i],"mywan").setVisible(false);
            ccui.helper.seekWidgetByName(this.btn_sendBets[i],"mybet").setString("0");

        }

        for (var i=0;i<2;i++) {
            this.con_kill[i] = false;

            this.spr_kill[i].stopAllActions();
            this.spr_kill[i].setTexture(res["sprkill"+i]);
            this.btn_sendKill[i].setVisible(false);
            var btn = this.killBetsLayer.getChildren()[i];
            btn.getChildren()[1].setString("0");
            btn.getChildren()[0].setVisible(false);


            this.spr_kill[i].setVisible(true);
            this.head_kill[i].removeAllChildren();
        }
    },

    playBetAnim:function(){
        this.clock.setVisible(true);
        this.clock.setPosition(320,568);
        this.clock.setAnimation(0, 'touzhong01', false);
        var _this = this;
        mod_sound.playeffect(g_music["roll"],false);
        this.playBetsMusic(3);

        this.clock.setCompleteListener(function(){
            _this.zhong.setVisible(true);
            //_this.zhong.y = 320;
            _this.clock.setPosition(320,568);
            _this.zhong._scale = 2.5;
            _this.zhong.runAction(cc.spawn(cc.moveTo(0.5,cc.p(583,1062)),cc.scaleTo(1,1,1)));
            _this.clock.setVisible(false);
            _this.noticeAnim(1,function(){
                _this.btn_xuya.setEnabled(true);
                _this.btn_xuya.setBright(true);
                _this.canBet = true;
            })
        })
    },

    noticeAnim:function(type,func){
        this.start.setVisible(true);

        cc.log("买定离手：",type);
        //买定离手
        if(type == 0){
            this.startIMG.setTexture(res.mdls);
            this._timeContain.setVisible(false);
            this.canBet = false;
            mod_sound.playeffect(g_music["kpTip"],false);
        }else{
            this.endSeatState = [];
            this._timeContain.setVisible(true);
            this.startIMG.setTexture(res.qxz);
            mod_sound.playeffect(g_music["xzTip"],false);
            for(var i = 0;i < 2;i++){
                var sp = this.btn_sendBets[i].getChildByTag(1111);
                sp.setVisible(true);
                sp.runAction(cc.sequence(cc.delayTime(1.5),cc.callFunc(function(sender){
                    sender.setVisible(false);
                },sp)));
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

    waitcallback:function (dt) {
        var _this=this;
        if(_this.haveRob) {
            return;
        }

        if(_this.cishu>3){
            for(var i = 1;i <4;i++){
                ccui.helper.seekWidgetByName(_this.waitImg, "Image_10" + i).setVisible(false);
            }
            _this.cishu=1;
        }else {
            ccui.helper.seekWidgetByName(_this.waitImg, "Image_10" + _this.cishu).setVisible(true);
            _this.cishu+=1;
        }
    },

    initShow:function(){
        var _this = this;
        if(this.mod_king.roominfo.type==gameclass.gameTBBF){
            this.waitImg = ccui.helper.seekWidgetByName(this.node,"Image_wait");
            this.waitImg.setVisible(true);
            this.cishu=1;
            this.schedule(this.waitcallback, 0.5);
        }

        this.chipLayer = ccui.helper.seekWidgetByName(this.node,"chipLayer");
        this.killLayer = ccui.helper.seekWidgetByName(this.node,"killLayer");
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
        }
        //点击桌台下注按钮
        for(var i = 0;i < this.betsLayer.getChildrenCount();i++){
            this.btn_sendBets[i] = this.betsLayer.getChildren()[i];
            var sp = null;
            if(i==0 || i==1){
                sp = new cc.Sprite(res.shanglight);
            }else if(i<5){
                sp = new cc.Sprite(res.zhonglight);
            }else{
                sp = new cc.Sprite(res.xialight);
            }
            this.btn_sendBets[i].addChild(sp);
            sp.setLocalZOrder(-10);
            sp.setTag(1111);
            sp.setPosition(this.btn_sendBets[i].width/2,this.btn_sendBets[i].height/2);
            //sp.setPosition(0,0)
            sp.setVisible(false);

            this.showBetText[i] = this.btn_sendBets[i].getChildByName("betsNum");
            this.showBetText[i].ignoreContentAdaptWithSize(true);
            this.wanText[i] = this.btn_sendBets[i].getChildByName("wan");
            this.wanText[i].setVisible(false);
            this.btn_sendBets[i].index = i;

            ccui.helper.seekWidgetByName(this.btn_sendBets[i],"mybet").ignoreContentAdaptWithSize(true);
            ccui.helper.seekWidgetByName(this.btn_sendBets[i],"mywan").setVisible(false);

            this.btn_sendBets[i].addTouchEventListener(function(sender,type){
                if(type != ccui.Widget.TOUCH_ENDED) return;
                // cc.log("=======212",_this.saveZhuangInfo,_this.saveZhuangInfo.uid);
                // if(!_this.saveZhuangInfo.uid){
                //     gameclass.showText("当前无庄家！");
                //     return;
                // }
                if(_this.mod_king.logindata.uid == _this.saveZhuangInfo.uid){
                    gameclass.showText("庄家不能下注");
                    return;
                }
                if(!_this.canBet&&!_this.killBegin){
                    gameclass.showText("请等待下一局开始");
                    return;
                }
                // if(_this.killBegin){
                //     //gameclass.showText("现在是杀得时间");
                //     return;
                // }
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                _this.addMask(0.15);

                //点的效果
                var sp = sender.getChildByTag(1111);
                sp.setVisible(true);
                sp.runAction(cc.sequence(cc.fadeTo(0.15,150),cc.callFunc(function(sender){
                    sender.setVisible(false);
                    sender.setOpacity(255);
                },sp)));

                _this.mod_king.sendBets(sender.index, _this.betsArr[_this.selectBet]);
            })
        }

        for(var i = 0;i < this.killNode.getChildrenCount();i++){
            this.btn_sendKill[i] = this.killNode.getChildren()[i];
            this.btn_sendKill[i].index = i;
            this.btn_sendKill[i].addTouchEventListener(function(sender,type){
                if(type != ccui.Widget.TOUCH_ENDED) return;
                if(_this.mod_king.logindata.uid == _this.saveZhuangInfo.uid){
                    gameclass.showText("庄家不能杀");
                    return;
                }

                // if(!_this.killBegin){
                //     //gameclass.showText("还没到杀的时间");
                //     return;
                // }

                _this.mod_king.sendKill(sender.index);
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
        //ccui.helper.seekWidgetByName(this.node,"btn_jiesan").getChildByName("sp").loadTexture(res.btn_quitExit,ccui.Widget.LOCAL_TEXTURE);
        //商城
        gameclass.createbtnpress(this.node,"btn_shop",function(){
            if(gameclass.test == "true") {  //! 测试环境
                _this.game.uimgr.showui("gameclass.goldShoptest");
            } else {
                _this.game.uimgr.showui("gameclass.goldShop");
            }
        });

        var invitebtn=ccui.helper.seekWidgetByName(this.node,"invitebtn");
        if(this.mod_king.roominfo.type==gameclass.gameTBBF){
            invitebtn.setVisible(true);
        }else {
            invitebtn.setVisible(false);
        }
        gameclass.createbtnpress(this.node, "invitebtn", function () {
            _this.share();
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
            if(_this.zhankai) return;
            _this.zhankai = true;
            ccui.helper.seekWidgetByName(_this.node,"btn_caidan").setTouchEnabled(false);
            ccui.helper.seekWidgetByName(_this.node,"spIconMusic").setVisible(!mod_sound.getMusicVolume());
            ccui.helper.seekWidgetByName(_this.node,"spIconEffect").setVisible(!mod_sound.getEffectsVolume());
            ccui.helper.seekWidgetByName(_this.node,"btn_list").runAction(cc.sequence(cc.moveTo(0.3,cc.p(277,810)),cc.callFunc(function(){
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
                _this.game.uimgr.showui("wzuitb").setBaseInfo(function(){
                    _this.mod_king.sendWuzuo();
                    ccui.helper.seekWidgetByName(_this.node,"btn_wuzuo").setTouchEnabled(true);
                },_this.node,_this);
            }else{
                //if(!_this.zhankai1) return;
                //ccui.helper.seekWidgetByName(_this.node,"btn_wuzuo").setTouchEnabled(false);
                _this.game.uimgr.uis["wzuitb"].closewz();
            }
        });
        gameclass.createbtnpress(this.node, "btn_more", function () {
            _this.game.uimgr.showui("tbRecordUi").setBaseInfo(_this.recordArr);
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
        //gameclass.createbtnpress(this.node, "buygold", function () {
        //    _this.game.uimgr.showui("gameclass.goldShop");
        //});
        gameclass.createbtnpress(this.node, "zhuangIcon", function () {
            var isSystem = false;
            if(_this.saveZhuangInfo.uid == 0){
                isSystem = true;
            }
            _this.getPlayerInfo(_this.saveZhuangInfo,_this.mod_king,isSystem);
            //_this.game.uimgr.showui("gameclass.chatMicLayer").setBZWinfo(_this.zhuangInfo,_this.mod_king,isSystem);
        });

        gameclass.createbtnpress(this.node,"btn_huanfu",function(){
            _this.game.uimgr.showui("gameclass.bank").setEnterance(1);
        });

        this.initMicView();
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
            var randomNum = parseInt(Math.random()*5);
            mod_sound.playeffect(g_music["xz"+randomNum],false);
            count++;
        }
        this.schedule(callBack,5);
    },

    share:function () {
        var shareText = "";
        shareText += "单双,房号[" + this.mod_king.roominfo.roomid + "],";
        cc.log(shareText);
        gameclass.mod_platform.invitefriend(shareText, this.mod_king.roominfo.roomid, "傲世娱乐单双-" + this.mod_king.roominfo.roomid + "-");
    },

    getPlayerInfo:function(data,mod_game,isSystem){
        if(data.uid == 0){
            this.game.uimgr.showui("gameclass.chatMicLayerBZW",null,null,1).setBZWinfo(data,mod_game,isSystem);
        }else{
            this.rankTool.getPlayerInfo(data.uid,function(retdata){
                data.sign = retdata.sign;
                cc.log("data = ",data,"issystem = ",isSystem);
                this.game.uimgr.showui("gameclass.chatMicLayerBZW",null,null,1).setBZWinfo(data,mod_game,isSystem);
            })
        }

        // if(data.uid == 0){
        //     // this.game.uimgr.showui("gameclass.chatMicLayer_sl",null,null,1).setBZWinfo(data,mod_game,isSystem);
        // }else{
        //     this.rankTool.getPlayerInfo(data.uid,function(retdata){
        //         data.sign = retdata.sign;
        //         // this.game.uimgr.showui("gameclass.chatMicLayer_sl",null,null,1).setBZWinfo(data,mod_game,isSystem);
        //     })
        // }
    },

    onchat:function(data){
        var _this = this;
        cc.log("data : ",data);
        if(data.type == 1){
            var playerData = this.getPlayerDataByUid(data.uid);
            cc.log("玩家信息：",data.uid,playerData);
            var talkArr = (playerData.sex == 0 ? g_chatstr_bzw_man : g_chatstr_bzw_woman);
            var str = (playerData.sex == 0 ? "nan" : "nv");
            for(var i = 0;i < talkArr.length;i++){
                if(talkArr[i] == data.chat){
                    mod_sound.playeffect(g_music[str+(i+1)],false);
                }
            }
        }

        var chair = this.getPlayerChairID(data.uid);
        cc.log("chair:",chair);
        if(chair == 1000){
            chair = 8;
        }
        var talkPos = _this.talkPos[chair];
        cc.log("位置",talkPos);
        var arr = [
            res.chatbg_ld,
            res.chatbg_rd,
            res.chatbg_ud1,
        ];
        cc.log("data.type = ",data.type);
        if(data.type < 4){
            var _node = new ccui.Layout();
            var s9 = null;
            if (data.type == 1) {
                s9 = new cc.Scale9Sprite(arr[parseInt(chair/3)]);
                s9.setCapInsets(cc.rect(60, 20, 10, 10));
                s9.setAnchorPoint(cc.p(0, 0));
                _node.addChild(s9);

                var helloLabel = new cc.LabelTTF(data.chat, "Arial", 36);
                helloLabel.setAnchorPoint(cc.p(0, 0));
                helloLabel.setColor(cc.color(33, 111, 75));
                helloLabel.setPosition(cc.p(15, 20));
                if(chair == 8) {
                    helloLabel.setPosition(15, 10);
                    var height = helloLabel.getContentSize().height;
                    var width = helloLabel.getContentSize().width;
                    if(width >= 280) {
                        helloLabel.setDimensions(cc.size(280, height * 2));
                    }
                }
                _node.addChild(helloLabel);
                s9.setContentSize(helloLabel.getContentSize().width + 30, helloLabel.getContentSize().height + 30);
            } else if (data.type == 2) {
                var index = Number(data.chat);
                var spine = new sp.SkeletonAnimation(g_chat_expression["expression"+index+"_json"],g_chat_expression["expression"+index+"_atlas"]);
                spine.setAnimation(0, 'animation', false);
                spine.setAnchorPoint(0.5, 0.5);

                s9 = new ccui.Layout();
                s9.setContentSize(110, 100);
                s9.setBackGroundImage(arr[parseInt(chair/3)]);
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


            if(chair >= 0 && chair <= 2){
                _node.setPosition(talkPos);
            }else if(chair >= 3 && chair <= 5){
                _node.setPosition(talkPos.x -  s9.width, talkPos.y);
            }else{
                _node.setPosition(talkPos.x,talkPos.y-s9.height);
            }
            this.node.addChild(_node);
            _node.setAnchorPoint(cc.p(0, 0));
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
            var headnode = ccui.helper.seekWidgetByName(this.node,"headNode");
            if(this.headNodeArr[index]){
                endPos = cc.p(this.headNodeArr[index].getPositionX()+headnode.getPositionX(),this.headNodeArr[index].getPositionY()+headnode.getPositionY());
            }else {
                endPos = cc.p(-50,568);
            }
        }else if(index == -1){//无座玩家
            endPos = cc.p(-50,568);
        }else if(index == -2){//自己位置
            var myicon = ccui.helper.seekWidgetByName(this.node,"Image_3");
            //var coin = ccui.helper.seekWidgetByName(myicon,"gold");
            endPos = myicon.getPosition();
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
        ccui.helper.seekWidgetByName(this.node,"btn_list").runAction(cc.sequence(cc.moveTo(0.3,cc.p(-130,810)),cc.callFunc(function(){
            _this.zhankai = false;
            _this.btn_exit.setVisible(false);
            ccui.helper.seekWidgetByName(_this.node,"btn_caidan").setTouchEnabled(true);
        })))
    },

    setBetImg:function(){
        for(var i = 0;i < 5;i++){
            if(i == this.selectBet){
                this.btn_bets[i].setScale(1.2);
                this.btn_bets[i].setPositionY(50);
            }else{
                this.btn_bets[i].setScale(1);
                this.btn_bets[i].setPositionY(40);
            }
            this.btn_bets[i].getChildByName("light").setVisible(i==this.selectBet);
            this.btn_bets[i].loadTextureNormal(res["betchip"+this.betsArr[i]/10],ccui.Widget.LOCAL_TEXTURE);

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

    createSpine:function(type){
        var arr = ["touzhong01","touzhong02a","touzhong02b"];
        var spineType = [20,21,22];
        var spine = new sp.SkeletonAnimation(res.jsontouzhong, res.atlastouzhong);
        spine.setAnimation(spineType[type],arr[type],false);
        spine.setAnchorPoint(0.5, 0.5);
        spine.setPosition(320,568);
        return spine;
    },

    checkZhuangBTN:function(_isdeal){
        this.btn_shangzhuang.setVisible(!_isdeal);
        this.btn_xiazhuang.setVisible(_isdeal);
    },

    shangxiaZhuang:function(data){
        if(data.type == 0){
            this.game.uimgr.showui("szuiTB").setBaseInfo(data);
            this.btn_shangzhuang.setVisible(false);
            this.btn_xiazhuang.setVisible(true);
        } else{
            this.btn_shangzhuang.setVisible(true);
            this.btn_xiazhuang.setVisible(false);
            if(this.mod_king.roominfo.type==gameclass.gameTBBF){
                cc.log("==========6788");
                if(this.gameBegin == false){
                    this.isRefalshZhuang = true;
                }
                this.reflashZhuangInfo();//更新庄的信息。可能换人了
            }
        }
    },

    updateTime:function(){
        this._timerControl.update();

        var curTime = this.overTime - parseInt(new Date().getTime());
        this.curTime = Math.ceil(curTime/1000);
        if(this.curTime <= 0){
            this._timeContain.setVisible(false);
        }
        //cc.log("当前时间2222================：this.curTime = ",this.curTime);
        /*
        * 当前时间小于5秒，开始杀
        * if(curTime /1000<5){
        *       播个动画，提醒一下
        * }
        *
        *
        * */
        if(this.killBegin) return;
        if (curTime / 1000 <= 5 && curTime/1000>0){
            cc.log("播放杀得动画");
            this.killAnimation();
        }

        if(this.gameBegin) return;
        // cc.log("当前时间1111：this.curTime = ",this.curTime);
        // if (curTime / 1000 < 22){
        //     cc.log("当前的一堆时间：",this.overTime,parseInt(new Date().getTime()),this.gameBegin);
        // }
        if(curTime / 1000 <= 22){
            if(this.mod_king.roominfo.type==gameclass.gameTBBF && curTime / 1000<=0){
                if(curTime / 1000 <= -8){
                    this.only_end();
                }
                return;
            }else {
                this.startGame();
            }
        }else if(this.mod_king.roominfo.type==gameclass.gameTBBF  && this.bffirst){
            this.bffirst=false;
            this.gameBegin = false;
            this.zhong.setVisible(false);
            //this.nextLayout.setVisible(true);
        }
    },

    killAnimation:function(){
        this.killBegin = true;
        this.canBet = false;
        for(var i=0;i<2;i++){
            this.btn_sendKill[i].setVisible(true);
        }

        // var animFrames = [];
        // for (var i = 1; i < 12; i++) {
        //     var str = "tb_kill" + i+".png";
        //     var frame = cc.spriteFrameCache.getSpriteFrame(str);
        //     animFrames.push(frame);
        // }
        //
        // var animation = new cc.Animation(animFrames,0.1);
        // var animate = cc.animate(animation);
        // this.spr_kill[0].runAction(animate.repeatForever());
        //
        // var animation1 = new cc.Animation(animFrames,0.1);
        // var animate1 = cc.animate(animation1);
        // this.spr_kill[1].runAction(animate1.repeatForever());
    },

    initMicView:function() {
        var _this = this;
        if(this.mod_king.roominfo.type!=gameclass.gameTBBF){
            ccui.helper.seekWidgetByName(_this.node, "btn_mic").setVisible(false);
            ccui.helper.seekWidgetByName(_this.node, "micLayer").setVisible(false);
            return;
        }

        var mic = ccui.helper.seekWidgetByName(_this.node, "btn_mic");
        mic.setVisible(true);
        var miclayer = ccui.helper.seekWidgetByName(_this.node, "micLayer");
        miclayer.setVisible(false);
        var anim = new sp.SkeletonAnimation(res.voiceJson, res.voiceAtlas);
        anim.setPosition(64,64);
        anim.setScale(0.7);
        miclayer.addChild(anim);
        anim.setAnimation(0, 'animation', true);

        var oldvnum = mod_sound.getEffectsVolume();
        var oldmnum = mod_sound.getMusicVolume();
        mic.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    oldvnum = mod_sound.getEffectsVolume();
                    oldmnum = mod_sound.getMusicVolume();
                    mod_sound.setEffectsVolume(0.0);
                    mod_sound.setMusicVolume(0.0);
                    miclayer.setVisible(true);
                    gameclass.mod_platform.begmic();
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    miclayer.setVisible(false);
                    gameclass.mod_platform.endmic();
                    mod_sound.setEffectsVolume(Number(oldvnum));
                    mod_sound.setMusicVolume(Number(oldmnum));
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    miclayer.setVisible(false);
                    gameclass.mod_platform.cancelmic();
                    mod_sound.setEffectsVolume(Number(oldvnum));
                    mod_sound.setMusicVolume(Number(oldmnum));
                    break;
            }
        });
    },

    destroy: function () {
        this._timerControl.destroy();
    },
});

var wzuitb = gameclass.baseui.extend({
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.yszWz, true);
        this.addChild(this.node);
        this.playerList = ccui.helper.seekWidgetByName(this.node,"wuzuo_list");
    },
    closewz:function(){
        var _this = this;
        this.playerList.runAction(cc.sequence(cc.moveTo(0.3,cc.p(0,0)),cc.callFunc(function(){
            ccui.helper.seekWidgetByName(_this.parentUI,"btn_wuzuo").loadTextureNormal(res.openList,ccui.Widget.LOCAL_TEXTURE);
            ccui.helper.seekWidgetByName(_this.parentUI,"btn_wuzuo").setTouchEnabled(true);
            _this.game.uimgr.closeui("wzuitb");
            _this.parentPtr.zhankai1 = false;
            _this.parentPtr.btn_exit.setVisible(false);
            _this.playerList.removeAllItems();
        })));
        ccui.helper.seekWidgetByName(this.parentUI,"btn_wuzuo").runAction(cc.moveTo(0.3,cc.p(0,957.40)));
    },
    setBaseInfo:function(func,parentUI,parent){
        var _this = this;
        this.parentUI = parentUI;
        this.parentPtr = parent;
        this.playerList.runAction(cc.sequence(cc.moveTo(0.3,cc.p(321,0)),cc.callFunc(function(){
            ccui.helper.seekWidgetByName(parentUI,"btn_wuzuo").loadTextureNormal(res.closeList,ccui.Widget.LOCAL_TEXTURE);
            func();
        })))
        ccui.helper.seekWidgetByName(parentUI,"btn_wuzuo").runAction(cc.moveTo(0.3,cc.p(319,957.40)));
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
                // if(type != ccui.Widget.TOUCH_ENDED) return;
                // mod_sound.playeffect(g_music["selectItemMp3"], false);
                // _this.parentPtr.rankTool.getPlayerInfo(data[sender.getTag()-2000].uid,function(retdata){
                //     if(retdata){
                //         retdata.name = data[sender.getTag()-2000].name;
                //         retdata.head = data[sender.getTag()-2000].head;
                //     }
                //     _this.game.uimgr.showui("gameclass.rankingPlayerInfoBZW").setBaseInfo(retdata);
                // })
            })
        }
    },
});

var szuiTB = gameclass.baseui.extend({
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.yszSZ, true);
        this.addChild(this.node);
    },

    setBaseInfo:function(data){
        var szList = ccui.helper.seekWidgetByName(this.node,"ListView_1");
        szList.removeAllChildren();

        var bg = this.node.getChildByName("Panel_2");
        var _this = this;
        bg.addTouchEventListener(function(sender,type){
            if(type != ccui.Widget.TOUCH_ENDED) return;
            _this.game.uimgr.closeui("szuiTB");
        })

        for(var i = 0;i < data.info.length;i++){
            var listCell = this.game.uimgr.createnode(res.bzwSZcell, true).getChildByName("Panel_1");
            listCell.removeFromParent(false);
            szList.pushBackCustomItem(listCell);
            var infoObj = data.info[i];
            ccui.helper.seekWidgetByName(listCell,"playerName").setString(infoObj.name);
            ccui.helper.seekWidgetByName(listCell,"playerMoney").setString(infoObj.total);
            ccui.helper.seekWidgetByName(listCell,"playerIndex").setString(i+1);
            if(infoObj.uid == this.game.modmgr.mod_login.logindata.uid){
                ccui.helper.seekWidgetByName(listCell,"playerName").setTextColor(cc.color(255, 0, 0));
                ccui.helper.seekWidgetByName(listCell,"playerMoney").setTextColor(cc.color(255, 0, 0));
                ccui.helper.seekWidgetByName(listCell,"playerIndex").setTextColor(cc.color(255, 0, 0));
            }

        }
    }
});

var tbRecordUi = gameclass.baseui.extend({
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.yszRecord, true);
        this.addChild(this.node);
        this.zoushiList = ccui.helper.seekWidgetByName(this.node,"zoushiList");

        var _this = this;
        ccui.helper.seekWidgetByName(this.node,"Panel_1").addTouchEventListener(function(sender,type){
            if(type != ccui.Widget.TOUCH_ENDED) return;
            _this.game.uimgr.closeui("tbRecordUi");
        })
    },
    setBaseInfo:function(data){
        this.zoushiList.removeAllChildren();
        for(var i = 0;i < data.length;i++){
            var infoObj = data[i];
            var listCell = this.game.uimgr.createnode(res.bzwRecordCell, true).getChildByName("bg");
            listCell.removeFromParent(false);
            this.zoushiList.pushBackCustomItem(listCell);
            listCell.getChildByName("Sp2").setVisible(false);
            for(var j = 0;j < 2;j++){
                listCell.getChildByName("Sp"+j).setTexture(res["IMGdian" + data[i].point[j]]);
            }
            //listCell.getChildByName("point").setTexture(res["showdian" + data[i].total]);
            listCell.getChildByName("point").setVisible(false);
            listCell.getChildByName("type").setTexture(res["yszrecord" + data[i].type]);
        }
    },
})
