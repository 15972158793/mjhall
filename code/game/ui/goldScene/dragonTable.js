/*
    Create by Geshuangqi on 20180423
* */
gameclass.dragonTable = gameclass.baseui.extend({
    node:null,
    pageArr:null,
    curpage:0,
    gamebegin:false,             //点按钮开始
    turnbegin:false,            //是否开始转动
    turnend:false,            //是否开始结束转动
    dropbegin:false,         //是否开始掉落
    dropend:false,            //是否结束掉落
    reallyStop:null,            //完全停止
    conbytime:0,               //0 表示转动通过时间控制，1 表示下落通过时间控制
    allStop:true,
    itemArr:null,
    speedtime:null,
    overTime:null,
    turntime:4000,     //旋转时间设置
    curbets:100,
    endinfo:null,
    endWinGold:null,
    isdelpic:0,     //是否开始播放图片破碎动画  0 没开始 1 开始了 2破碎完成 3触动完成
    curci:0,         //当前正在进行第几次消除
    curpan:0,       //当前盘数，特殊规则1
    allpan:0,
    stoptime:0,        //暂停时间
    stopstate:false,   //暂停状态
    issprci1:false,         //是否特殊玩法1

    txtscall:false,      //文本金币转动
    curtxtgold:0,       //文本金币
    endtxtgold:0,

    ctor:function () {
      this._super();
      this.pageArr = [];
      this.itemArr = [];
      this.endinfo = [];
      this.speedtime = [];
      this.overTime=[];
      this.turnbegin =[];
      this.reallyStop = [];
      this.turnend =[];
      this.dropend = [];
      this.dropbegin =[];
    },

    setmod:function (mod_game) {
      this.mod_game = mod_game;
      this.mod_game.bindUi(this);
      this.init();
    },

    show:function(){
        cc.spriteFrameCache.addSpriteFrames(res.dragon_itemPlist);
        cc.spriteFrameCache.addSpriteFrames(res.dragonChu_8_Plist);
        for(var i=1;i<=11;i++){
            cc.spriteFrameCache.addSpriteFrames(res["dragonAn_"+i+"_Plist"]);
        }
        mod_sound.stopallsound();
        this.node = this.game.uimgr.createnode(res.dragonTable,true);
        this.addChild(this.node);
        // this.batchSP = cc.SpriteBatchNode.create(res.dragon_itemPng);
        // this.node.addChild(this.batchSP);
        this.node.scheduleUpdate();
        this.node.update= this.updateTime.bind(this);

        var _this = this;

        this.rulenode = ccui.helper.seekWidgetByName(this.node,"rule_node");
        this.rulenode.setVisible(false);
        this.panelBottom = ccui.helper.seekWidgetByName(this.node,"panel_bottom");

        //==============================翻页效果----------------------
        this.btn_leftpage = ccui.helper.seekWidgetByName(this.node,"btn_leftpage");
        this.btn_rightpage = ccui.helper.seekWidgetByName(this.node,"btn_rightpage");
        this.panel_page = ccui.helper.seekWidgetByName(this.node,"panel_page");
        for (var i = 0;i < 4;i++){
            this.pageArr[i] = this.panel_page.getChildren()[i];
            if(i==0){
                this.pageArr[i].loadTexture(res.curpage);
            }
            this.curpage = 0;
        }
        if (this.curpage==0){
            this.btn_leftpage.setTouchEnabled(false);
            this.btn_leftpage.setBright(false);
        }else if (this.curpage==3){
            this.btn_rightpage.setTouchEnabled(false);
            this.btn_rightpage.setBright(false);
        }
        this.btn_leftpage.addTouchEventListener(function (sender,type) {
            if(type != ccui.Widget.TOUCH_ENDED) return;
            mod_sound.playeffect(g_music["dra_click"]);
            _this.curpage--;
            if (_this.curpage==0){
                _this.btn_leftpage.setTouchEnabled(false);
                _this.btn_leftpage.setBright(false);
            }else{
                _this.btn_rightpage.setTouchEnabled(true);
                _this.btn_rightpage.setBright(true);
            }
            _this.pageView.scrollToPage(_this.curpage);
            for (var i = 0;i < 4;i++){
                if (i==_this.curpage){
                    _this.pageArr[i].loadTexture(res.curpage);
                }else{
                    _this.pageArr[i].loadTexture(res.dafaultpage);
                }
            }
        });
        this.btn_rightpage.addTouchEventListener(function (sender,type) {
            if(type != ccui.Widget.TOUCH_ENDED) return;
            mod_sound.playeffect(g_music["dra_click"]);
            _this.curpage++;
            if (_this.curpage==3){
                _this.btn_rightpage.setTouchEnabled(false);
                _this.btn_rightpage.setBright(false);
            }else{
                _this.btn_leftpage.setTouchEnabled(true);
                _this.btn_leftpage.setBright(true);
            }
            _this.pageView.scrollToPage(_this.curpage);
            for (var i = 0;i < 4;i++){
                if (i==_this.curpage){
                    _this.pageArr[i].loadTexture(res.curpage);
                }else{
                    _this.pageArr[i].loadTexture(res.dafaultpage);
                }
            }
        });

        this.pageView = ccui.helper.seekWidgetByName(this.node,"PageView_1");
        //==============================翻页效果end----------------------//

        this.btn_start = ccui.helper.seekWidgetByName(this.node,"btn_start");
        this.btn_start.addTouchEventListener(function (sender,type) {
            if(type != ccui.Widget.TOUCH_ENDED) return;
            if(!_this.allStop&&!_this.gamebegin)return;

            var gold = Number(_this.mycoin.getString());
            if (gold<_this.curbets){
                gameclass.showText("您没钱了!");
                return
            }
            _this.rulenode.setVisible(false);

            if(!_this.gamebegin){
                mod_sound.playeffect(g_music["dra_dianzhuan"]);
                _this.gamebegin = true;
                _this.allStop=false;
                _this.stopstate = false;
                _this.btn_start.setBright(false);
                _this.btn_start.setTouchEnabled(false);

                if (_this.txtscall) {
                    _this.mycoin.setString(_this.endtxtgold);
                    _this.endtxtgold = 0;
                    _this.curtxtgold = 0;
                    _this.txtscall = false;
                }
                _this.mywintxt.setString(0);

                for (var i=0;i<5;i++){
                    _this.speedtime[i]=parseInt(new Date().getTime()+200*i);
                    _this.overTime[i] = parseInt(new Date().getTime()) + _this.turntime+200*i;
                    _this.reallyStop[i]=false;
                }
                _this.mod_game.sendStart(_this.curbets);
                var gold = Number(_this.mycoin.getString());
                _this.mycoin.setString(gold-_this.curbets);
            }else{
                _this.gamebegin = false;
                for (var i=0;i<5;i++){
                    _this.overTime[i] = parseInt(new Date().getTime()) + 200*i;
                }
            }

        });

        for (var i = 0;i<5;i++){
            var panel = ccui.helper.seekWidgetByName(this.node,"bg_frame").getChildren()[i];
            for(var j = 0;j<4;j++){
                this.itemArr[i*4+j]=panel.getChildren()[j];
                this.itemArr[i*4+j].next = 0;                   //为0表示上面有值，不用掉落，1表示移动到上面一个去
            }
        }

    },

    init:function () {
        var _this = this;

        gameclass.createbtnpress(this.node, "btn_set", function () {
            mod_sound.playeffect(g_music["dra_click"]);
            _this.game.uimgr.showui("gameclass.settingui");
            _this.game.uimgr.uis["gameclass.settingui"].btn_change.setVisible(true);
        });

        this.btn_rule = ccui.helper.seekWidgetByName(this.panelBottom,"btn_rule");
        this.btn_rule.addTouchEventListener(function (sender,type) {
            if(type != ccui.Widget.TOUCH_ENDED) return;
            mod_sound.playeffect(g_music["dra_click"]);
            _this.rulenode.setVisible(true);
            _this.showrule();
        });
        this.btn_ruleclose = ccui.helper.seekWidgetByName(this.node,"btn_ruleclose");
        this.btn_ruleclose.addTouchEventListener(function (sender,type) {
            if(type != ccui.Widget.TOUCH_ENDED) return;
            mod_sound.playeffect(g_music["dra_click"]);
            _this.rulenode.setVisible(false);
        });

        this.mycoin = ccui.helper.seekWidgetByName(this.panelBottom,"txt_mycoin");
        this.mybets = ccui.helper.seekWidgetByName(this.panelBottom,"txt_betcoin");
        this.mywintxt =  ccui.helper.seekWidgetByName(this.panelBottom,"txt_mywin");
        this.mywintxt.setString(0);

        this.btn_jiabets = ccui.helper.seekWidgetByName(this.panelBottom,"btn_jia");
        this.btn_jianbets = ccui.helper.seekWidgetByName(this.panelBottom,"btn_jian");
        if (this.curbets==1000){
            this.btn_jiabets.setTouchEnabled(false);
            this.btn_jiabets.setBright(false);
        }else if(this.curbets==100){
            this.btn_jianbets.setTouchEnabled(false);
            this.btn_jianbets.setBright(false);
        }
        this.btn_jiabets.addTouchEventListener(function (sender,type) {
            if(type != ccui.Widget.TOUCH_ENDED) return;
            mod_sound.playeffect(g_music["dra_click"]);
            _this.curbets+=100;
            if (_this.curbets==1000){
                _this.btn_jiabets.setTouchEnabled(false);
                _this.btn_jiabets.setBright(false);
            }
            _this.mybets.setString( _this.curbets);
            _this.btn_jianbets.setTouchEnabled(true);
            _this.btn_jianbets.setBright(true);
            _this.showrule();
        });
        this.btn_jianbets.addTouchEventListener(function (sender,type) {
            if(type != ccui.Widget.TOUCH_ENDED) return;
            mod_sound.playeffect(g_music["dra_click"]);
            _this.curbets-=100;
            if (_this.curbets==100){
                _this.btn_jianbets.setTouchEnabled(false);
                _this.btn_jianbets.setBright(false);
            }
            _this.mybets.setString( _this.curbets);
            _this.btn_jiabets.setTouchEnabled(true);
            _this.btn_jiabets.setBright(true);
            _this.showrule();
        });

        this.spe_shade = ccui.helper.seekWidgetByName(this.node,"spe_shade");
        this.spe_shade.setVisible(false);
        this.bgtopshow   = ccui.helper.seekWidgetByName(this.node,"bg_show");
        this.spe_top = ccui.helper.seekWidgetByName(this.bgtopshow,"spetop");
        this.spe_top.setVisible(false);
        this.spe_paneltop = ccui.helper.seekWidgetByName(this.node,"panel_spe_top");
        this.spe_paneltop.setVisible(false);
        this.spe_imgbottom = ccui.helper.seekWidgetByName(this.panelBottom,"img_spc_bottom");
        this.spe_imgbottom.setVisible(false);

        this.speresult = ccui.helper.seekWidgetByName(this.node,"spe_result");
        this.speresult.setVisible(false);
        this.speresult.index = 0;
        this.txt_allresult=ccui.helper.seekWidgetByName(this.speresult,"txt_speAllresult");

        this.spe_fanhui = ccui.helper.seekWidgetByName(this.speresult,"spe_fanhui");
        this.spe_fanhui.addTouchEventListener(function (sender,type) {
            if(type != ccui.Widget.TOUCH_ENDED) return;
            mod_sound.playeffect(g_music["dra_click"]);
            _this.closespe();
        });

        this.spe_txtonewin = ccui.helper.seekWidgetByName(this.spe_imgbottom,"spe_onewintex");
        this.spe_txtallwin = ccui.helper.seekWidgetByName(this.spe_paneltop,"spe_allwintxt");
        this.spe_txtchance = ccui.helper.seekWidgetByName(this.spe_paneltop,"spe_chancetxt");

        gameclass.createbtnpress(this.node, "btn_exit", function () {
            _this.game.uimgr.showui("gameclass.msgboxui");
            var strmsg = "是否想要退出房间？";
            _this.game.uimgr.uis["gameclass.msgboxui"].setString(strmsg,function(){
                _this.mod_game.dissmissroom();
            });
        });

    },

    showrule:function(){
        var LZDB_PL= [[2,15,80],[2,20,100],[8,25,120],
            [10,30,125],[15,60,150],[15,75,175],
            [20,80,200],[20,100,250],[30,125,500],
        [250,2500,12500]];
        var bets = this.curbets/100;

        for(var i=0;i<10;i++){
            for(var j=0;j<3;j++){
                ccui.helper.seekWidgetByName(this.pageView,"txtrule_"+i+"_"+j).setString((LZDB_PL[i][j]*bets));
            }
        }
    },

    showcsgd:function(){        //乘数轨道
        var length = this.spe_top.getChildren().length;
        for (var i=0;i<length;i++){
            if (i!=(length-1)) {
                this.spe_top.getChildren()[i].setTexture(res["spebets"+(i+2)+"_0"]);
            }else{
                this.spe_top.getChildren()[i].setTexture(res.spebets10_0);
            }
        }
        if(this.curci>=2&&this.curci<10){
            this.spe_top.getChildren()[this.curci-2].setTexture(res["spebets"+this.curci+"_1"]);
        }else if(this.curci==10){
            this.spe_top.getChildren()[length-1].setTexture(res.spebets10_1);
        }
    },

    openspe:function(){
        for(var i=0;i<this.bgtopshow.getChildren().length;i++){
            this.bgtopshow.getChildren()[i].setVisible(false);
        }
        ccui.helper.seekWidgetByName(this.panelBottom,"img_win").setVisible(false);
        this.spe_shade.setVisible(true);
        this.spe_top.setVisible(true);
        this.spe_paneltop.setVisible(true);
        this.spe_imgbottom.setVisible(true);
        for(var i=0;i<this.spe_imgbottom.getChildren().length;i++) {
            this.spe_imgbottom.getChildren()[i].setVisible(true);
        }
        this.spe_txtallwin.setString(0);
        this.spe_txtonewin.setString(0);
        this.spe_txtchance.setString((this.allpan-this.curpan-1));
    },

    closespe:function(){
        ccui.helper.seekWidgetByName(this.panelBottom,"img_win").setVisible(true);
        this.spe_shade.setVisible(true);
        this.bgtopshow.getChildren()[0].setVisible(true);
        this.spe_shade.setVisible(false);
        this.spe_top.setVisible(false);
        this.spe_paneltop.setVisible(false);
        this.spe_imgbottom.setVisible(false);
        this.speresult.setVisible(false);
        this.speresult.index=0;
    },

    initMyInfo:function(){
        var head = ccui.helper.seekWidgetByName(this.node,"head");
        gameclass.mod_base.showtximg(head,this.mod_game.logindata.imgurl, 0, 0,"im_headbg3", false);
        //ccui.helper.seekWidgetByName(this.node,"name").setString(this.mod_king.logindata.name || "游客");
    },

    updateroominfo:function(data){
        cc.log("gameinfo:",data);
        this.updateItem(data.result);
        this.updatePersonInfo(data.person);
    },

    updatePersonInfo:function(personinfo){
        this.mycoin.setString(personinfo.total);

        var coin = personinfo.coin*100;
        if(coin==0){coin = this.curbets;}
        this.mybets.setString(coin);
        this.initMyInfo();
    },

    updateItem:function(arr){
        for(var i=0;i<5;i++){
            for(var j =0;j<4;j++){
                if (j==3){
                    break;
                }
                this.itemArr[i*4+j].loadTexture("dragon_"+(arr[i][j])+"_0"+".png",ccui.Widget.PLIST_TEXTURE);
            }
        }
    },

    showSperesule:function(){
        this.speresult.setVisible(true);
        this.speresult.setScale(0.1);
        this.speresult.runAction(cc.scaleTo(0.2,1,1));
        for(var i=0;i<this.spe_imgbottom.getChildren().length;i++) {
            this.spe_imgbottom.getChildren()[i].setVisible(false);
        }
        var gold = Number(this.spe_txtallwin.getString());
        this.txt_allresult.setString(gold);
    },

    initParma:function(){
        var gold = Number(this.mycoin.getString());
        if (this.endinfo[this.curpan].playerwin!=0 &&this.issprci1==false){
            mod_sound.playeffect(g_music["dra_zhongjiang"]);
            this.curtxtgold = gold;
            this.endtxtgold = this.endinfo[this.curpan].playerwin + gold;
            this.txtscall=true;
        }

        this.initLocalParma();
        this.stopstate = true;
        this.endinfo[this.curpan] = null;
        this.isdelpic = 0;
        this.curci = 0;
        this.curpan++;
        cc.log("当前盘数，总盘数：",this.curpan,this.allpan);
        this.conbytime=0;
        if (this.allpan==this.curpan||this.allpan==0){
            this.allpan=0;
            this.curpan =0;
            this.btn_start.setTouchEnabled(true);
            this.btn_start.setBright(true);
            if(this.issprci1) {
                this.speresult.index = 1;
            }
            this.issprci1=false;
        }

        if(this.issprci1){         //特殊玩法1
            this.showcsgd();
            this.allStop = false;
            this.gamebegin = false;
            for (var i=0;i<5;i++){
                this.speedtime[i]=parseInt(new Date().getTime());
                this.overTime[i] = parseInt(new Date().getTime()) + this.turntime+200*i;
            }
            this.spe_txtonewin.setString(0);
            this.spe_txtchance.setString((this.allpan-this.curpan-1));
        }else{
            this.allStop = true;
            this.gamebegin = false;
        }
    },

    initLocalParma:function(){
        for (var i=0;i<5;i++){
            this.turnbegin[i] = false;
            this.turnend[i] = false;
            this.dropend[i] = false;
            this.dropbegin[i]=false;
            this.reallyStop[i] = false;
        }
    },

    controlByTime:function(){
        if(this.conbytime==0){
            for (var i = 0;i<5;i++){
                if(!this.turnbegin[i]) {
                    var curTime = this.overTime[i] - parseInt(new Date().getTime());
                    if (curTime < this.turntime) {
                        this.turnbegin[i] = true;
                    }
                }else if(!this.turnend[i]){
                    var curTime = this.overTime[i] - parseInt(new Date().getTime());
                    if (curTime < 0) {
                        if (this.endinfo[this.curpan]!=null) {
                            this.turnend[i] = true;
                            for (var j = 0; j < 3; j++) {
                                this.itemArr[i * 4 + j].loadTexture("dragon_" + (this.endinfo[this.curpan].info[this.curci].result[i][j]) + "_0" + ".png", ccui.Widget.PLIST_TEXTURE);
                            }
                        }else{
                            this.overTime[i] = parseInt(new Date().getTime()) + 200*i;
                        }
                    }
                }
            }
        }else if (this.conbytime ==1){
            for(var i=0;i<5;i++){
                if(!this.dropbegin[i]) {
                    var curTime = this.overTime[i] - parseInt(new Date().getTime());
                    if (curTime < 0) {
                        this.dropbegin[i] = true;
                        // for (var j=0;j<3;j++){
                        //     this.itemArr[i * 4 + j].setVisible(true);
                        // }
                    }
                }
            }
        }
    },

    changeArrnext:function(){
        for(var i=0;i<5;i++){
            var m=0;
            var sp=false;
            for(var j=0;j<3;j++){
                if (!sp) {
                    var downfind = j;
                    while (downfind >= 0) {//向下寻找
                        if (this.itemArr[i * 4 + downfind].next == -1) {
                            break;
                        }
                        downfind--;
                    }
                    if (downfind == -1) {
                        this.itemArr[i * 4 + j].next = j;
                        m++;
                        continue
                    }
                }
                sp=true;
                var find = j;
                if(this.itemArr[i*4+find].next!=-1){        //如果自己不为消除的，向上寻找
                    find++;
                }
                while(find<3){      //向上
                    if(this.itemArr[i*4+find].next!=-1){
                        this.itemArr[i*4+find].next=-1
                        break;
                    }
                    find++
                }
                if(find==3){
                    find=find+j-m;
                }else{
                    m++;
                }
                this.itemArr[i*4+j].next = find;

            }
        }
    },

    changeArrPos:function(){
        for(var i=0;i<5;i++){
            for(var j=0;j<3;j++){
                var next = this.itemArr[i*4+j].next;
                cc.log("掉落预先位置：",i,j,next);
                this.itemArr[i*4+j].setPositionY(54+119*next);
            }
        }
    },

    renewNext:function(){
        for(var i=0;i<5;i++){
            for(var j=0;j<4;j++){
                this.itemArr[i*4+j].next=0;
            }
        }
    },

    judgeAllstop:function(){
        var allstop = true;
        for(var i=0;i<5;i++){
            if (!this.reallyStop[i]){
                allstop = false;
                break;
            }
        }
        if(allstop){       //所有的都停下来       初始化参数
            return true;
        }
        return false;
    },

    showWin:function(){
        var pos = this.btn_start.getPosition();
        pos.y+=50;
        if (this.endinfo[this.curpan].special1==-1) {
            //ameclass.showYSText(this.endinfo[this.curpan].info[this.curci].personwin, pos, this.node, 1);
            var gold = Number(this.mywintxt.getString());
            this.mywintxt.setString(this.endinfo[this.curpan].info[this.curci].personwin+gold);
        }else{
            var gold = Number(this.spe_txtonewin.getString());
            this.spe_txtonewin.setString(this.endinfo[this.curpan].info[this.curci].personwin+gold);

            gameclass.showYSText(this.endinfo[this.curpan].info[this.curci].personwin, pos, this.node, 1);

            gold = Number(this.spe_txtallwin.getString());
            this.spe_txtallwin.setString(this.endinfo[this.curpan].info[this.curci].personwin+gold);

        }
    },

    stopjishi:function(dt){
        if (this.stopstate){           //特殊玩法总结果出现，手动点击
            this.stoptime+=dt;
            if (this.stoptime>=2){
                this.stopstate=false;
                this.stoptime=0;
                if (this.speresult.index==1){
                    this.showSperesule();
                }
            }
        }
    },

    Zhuangold:function(){
        if (this.txtscall){
            var s= this.curbets/100;
            this.curtxtgold+=(8*s);

            mod_sound.playeffect(g_music["dra_click"]);
            if (this.curtxtgold>=this.endtxtgold){
                this.mycoin.setString(this.endtxtgold);
                this.curtxtgold=0;
                this.endtxtgold=0;
                this.txtscall = false;
//                this.mywintxt.setString(0);
            }else {
                this.mycoin.setString(this.curtxtgold);
            }
        }
    },

    updateTime:function(dt){
        this.stopjishi(dt);
        this.Zhuangold();
        if (this.allStop||this.stopstate){
            return;
        }

        if(this.isdelpic==2){       //动画破碎只进去一次
            this.showWin();
            this.renewNext();      //初始化next
            var length = this.endinfo[this.curpan].info[this.curci].delicon.length;
            for(var j=0;j<length;j++) {
                var p = parseInt(this.endinfo[this.curpan].info[this.curci].delicon[j] / 10);
                var y = this.endinfo[this.curpan].info[this.curci].delicon[j] % 10;
                this.itemArr[p * 4 + y].setVisible(true);
                this.itemArr[p * 4 + y].next = -1;
            }
            this.curci++;
            if (this.issprci1){
                this.showcsgd();
            }
            this.updateItem(this.endinfo[this.curpan].info[this.curci].result);
            this.changeArrnext();
            this.changeArrPos();
            this.isdelpic = 0;
            this.conbytime = 1;     //开始掉落
            for(var i=0;i<5;i++){
                this.overTime[i] = parseInt(new Date().getTime()) + 300*i;
            }
            return;
        }
        if(this.isdelpic==3){
            var gold = Number(this.mycoin.getString());
            this.mycoin.setString(this.endinfo[this.curpan].playerwin + gold);
            this.initParma();
            this.openspe();
            return;
        }

        this.controlByTime();
        this.updateReset();     //复位

        var allstop = this.judgeAllstop()
        if (allstop){       //所有的都停下来       初始化参数
            //播放破碎
            mod_sound.stopAllEffects();
            mod_sound.playeffect(g_music["dra_zhuanstop"]);
            this.initLocalParma();
            this.conbytime = 2;     //开始掉落
            this.delpicAdd();
            return
        }

        this.updatePostion(dt);
    },

    updateReset:function(){
        //复位
        for(var i=0;i<5;i++){
            if(this.curci == 0) {           //转动复位
                if(this.turnend[i]) {
                    //当第四个精灵移到最上面时候停止
                    var curposy = this.itemArr[i*4+3].getPositionY();
                    if (curposy > -65) {

                    } else {
                        for (var j = 0; j < 4; j++) {
                            this.itemArr[i * 4 + j].setPositionY(54 + j * 119);
                        }
                        this.reallyStop[i] = true;
                    }
                }
            }else{                      //掉落复位
                if(this.dropend[i]){
                    for (var j = 0; j < 3; j++) {
                        this.itemArr[i * 4 + j].setPositionY(54 + j * 119);
                    }
                    this.reallyStop[i] = true;
                }
            }
        }
    },

    updatePostion:function (dt) {
        for (var i = 0; i < 5; i++) {
        //转动位移
            if(this.curci == 0) {
                    var delpos = 1800 * dt;
                    if (this.turnbegin[i] && !this.reallyStop[i]) {
                        for (var j = 0; j < 4; j++) {
                            var curposy = this.itemArr[i * 4 + j].getPositionY();
                            this.itemArr[i * 4 + j].setPositionY(curposy - delpos);

                            if ((curposy - delpos) < -65) {
                                if (this.turnend[i]) {
                                    if (j != 3) {
                                        this.itemArr[i * 4 + j].setPositionY(411);
                                    }
                                } else {
                                    this.itemArr[i * 4 + j].setPositionY(411);
                                    var hadtime = parseInt(new Date().getTime()-this.speedtime[i]);
                                    if (hadtime/1000>=1) {
                                        var sr = parseInt(hadtime / 1000);

                                        if (sr >= 4) {
                                            sr = 0;
                                        }
                                        var pic = parseInt(Math.random() * 11) + 1;
                                        this.itemArr[i * 4 + j].loadTexture("dragon_" + pic + "_" + sr + ".png", ccui.Widget.PLIST_TEXTURE);
                                    }
                                }
                            }
                        }
                    }

            }else{
                //掉落位移
                var speed =1000;
                var delpos = speed* dt;
                if (!this.dropbegin[i]){
                    return;
                }
                var drop=3;
                for (var j = 0; j < 3; j++) {
                    if (this.itemArr[i*4+j].next!=0) {
                        var curposy = this.itemArr[i * 4 + j].getPositionY();
                        if((curposy - delpos)<54+119*j){
                            this.dropend[i]=true;
                        }else{
                            this.itemArr[i * 4 + j].setPositionY(curposy - delpos);
                        }
                    }else{
                        drop--;
                        if (drop==0){
                            this.dropend[i]=true;
                        }
                    }
                }
            }
        }

    },

    delpicAdd:function(){
        var _this = this;
        if(this.isdelpic==1){
            return;
        }

        if(this.endinfo[this.curpan].special1==15){     //特殊玩法1
            this.issprci1 = true;
            mod_sound.playeffect(g_music["dra_freezhuan"]);
            var delicon = this.findfirearr();
            this.endinfo[this.curpan].info[this.curci].delicon=delicon;
            for (var i = 0; i < delicon.length; i++) {
                var p = parseInt(delicon[i] / 10);
                var y = delicon[i] % 10;
                var str = "dragon_"+(this.endinfo[this.curpan].info[this.curci].result[p][y])+"_0"+".png" ;
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                var chuani = new cc.Sprite(frame);
                chuani.index = i;
                chuani.runAction(cc.sequence(cc.blink(1,5),cc.callFunc(function (sender) {
                    var i = sender.index;
                    var m = parseInt(_this.endinfo[_this.curpan].info[_this.curci].delicon[i] / 10);
                    var n = _this.endinfo[_this.curpan].info[_this.curci].delicon[i] % 10;
                    var panel = ccui.helper.seekWidgetByName(_this.node, "bg_frame").getChildren()[m];
                    panel.removeChildByTag(100 * (m + 1) + n);

                    _this.itemArr[m * 4 + n].setVisible(true);
                    _this.isdelpic = 3;
                })));

                var pos = this.itemArr[p * 4 + y].getPosition();
                chuani.setPosition(pos);
                chuani.setTag(100 * (p + 1) + y);
                var panel = ccui.helper.seekWidgetByName(this.node, "bg_frame").getChildren()[p];
                panel.addChild(chuani);

                this.itemArr[p * 4 + y].setVisible(false);
            }
        }else {
            var length = this.endinfo[this.curpan].info[this.curci].delicon.length;
            if (length > 0) {
                this.isdelpic = 1;
            } else {
                //直接停止所有的动画     //没有消除，表示真正的结束
                this.initParma();
                return;
            }

            for (var i = 0; i < length; i++) {
                var p = parseInt(this.endinfo[this.curpan].info[this.curci].delicon[i] / 10);
                var y = this.endinfo[this.curpan].info[this.curci].delicon[i] % 10;
                var str = "dragon_"+(this.endinfo[this.curpan].info[this.curci].result[p][y])+"_0"+".png" ;
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                var chuani = new cc.Sprite(frame);
                chuani.index = i;
                chuani.runAction(cc.sequence(cc.blink(1,5),cc.callFunc(function (sender) {
                        var i = sender.index;
                        var m = parseInt(_this.endinfo[_this.curpan].info[_this.curci].delicon[i] / 10);
                        var n = _this.endinfo[_this.curpan].info[_this.curci].delicon[i] % 10;
                        var strda = "dragonAnimation_" + (_this.endinfo[_this.curpan].info[_this.curci].result[m][n]);

                        var delani = new gameclass.animation();
                        delani.Init(res["dragonAn_" + (_this.endinfo[_this.curpan].info[_this.curci].result[m][n]) + "_Plist"], strda, 10, 0.1, false, function (delani) {
                            delani.removeFromParent();
                            _this.isdelpic = 2;
                        },delani);
                        var pos = cc.p(69.27, 54 + 119 * n);
                        delani.setPosition(pos);
                        var panel = ccui.helper.seekWidgetByName(_this.node, "bg_frame").getChildren()[m];
                        panel.addChild(delani);

                        panel.removeChildByTag(100 * (m + 1) + n);
                })));

                var pos = this.itemArr[p * 4 + y].getPosition();
                chuani.setPosition(pos);
                chuani.setTag(100 * (p + 1) + y);
                var panel = ccui.helper.seekWidgetByName(this.node, "bg_frame").getChildren()[p];
                panel.addChild(chuani);

                this.itemArr[p * 4 + y].setVisible(false);
            }
        }
    },

    findfirearr:function(){
        var delicon=[];
        var m=0;
        for(var i=0;i<5;i++){
            for (var j=0;j<3;j++){
                if (this.endinfo[this.curpan].info[this.curci].result[i][j]==11){
                    delicon[m]=i*10+j;
                    m++;
                }
            }
        }
        return delicon;
    },

    gameOnEnd:function (data) {
        cc.log("游戏结束信息：",data);
        if(data.special1==-1) {
            this.curpan=0;
            this.allpan=0;
            this.endinfo[this.curpan] = data;
            cc.log("=============",this.endinfo);
        }else{
            this.endinfo[this.allpan] = data;
            this.allpan++;
        }
    },

});
