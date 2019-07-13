/*
    Create by Geshuangqi on 20180504
* */
gameclass.dxtbTable = gameclass.baseui.extend({
    node:null,
    curbets:100,
    begin:false,
    personinfo:null,
    remain_ci:8,
    ctor:function () {
        this._super();
    },

    setmod:function (mod_game) {
        this.mod_game = mod_game;
        this.mod_game.bindUi(this);
        this.init();
    },

    show:function(){
        var _this = this;
        mod_sound.stopallsound();
        cc.spriteFrameCache.addSpriteFrames(res.dfh_fireList);
        this.node = this.game.uimgr.createnode(res.dxtbTable,true);
        this.addChild(this.node);

        this.BG = ccui.helper.seekWidgetByName(this.node,"BG");
        this.lightPanel = ccui.helper.seekWidgetByName(this.node,"win_light_layout");
        for (var i=0;i<this.lightPanel.getChildren().length;i++){
            this.lightPanel.getChildren()[i].index = i+1;
            this.lightPanel.getChildren()[i].setVisible(false);
        }

        this.walkPanel = ccui.helper.seekWidgetByName(this.node,"walknode");
        for (var i=0;i<this.walkPanel.getChildren().length;i++){
            this.walkPanel.getChildren()[i].index = i;
        }

        this.coinPanel = ccui.helper.seekWidgetByName(this.node,"coin_layout");
        for (var i=0;i<this.coinPanel.getChildren().length;i++){
            this.coinPanel.getChildren()[i].index = this.coinPanel.getChildren()[i].getTag()-1;
            //cc.log("金钱的下标：",i,this.coinPanel.getChildren()[i].index);
        }

        this.zhizhen = ccui.helper.seekWidgetByName(this.node,"zhen");
        this.Person = ccui.helper.seekWidgetByName(this.node,"Person");
        this.Person.setVisible(false);
        this.Person.index = 0;

        //死亡的图片
        this.deathperson = ccui.helper.seekWidgetByName(this.node,"person_panel");
        this.deathperson.setVisible(false);
        this.redpanel = ccui.helper.seekWidgetByName(this.node,"redlight_panel");
        this.deathred = ccui.helper.seekWidgetByName(this.node,"deathredlight");
        this.redpanel.setVisible(false);
        this.deathsx = ccui.helper.seekWidgetByName(this.node,"sx_panel");
        this.deathfd = ccui.helper.seekWidgetByName(this.node,"fd_panel");
        this.deathlf_eft = ccui.helper.seekWidgetByName(this.node,"deathlf_eft");
        this.deathlf_eft.setVisible(false);
        this.mubei = ccui.helper.seekWidgetByName(this.node,"mubei");
        this.mubei.setVisible(false);
        this.mubei.setScale(0.1);

        this.dong = ccui.helper.seekWidgetByName(this.node,"spr_dong");
        this.dong.setVisible(false);

        this.guangzhu = ccui.helper.seekWidgetByName(this.node,"guangzhu");
        this.guangzhu.setVisible(false);
        this.hook =  ccui.helper.seekWidgetByName(this.node,"hook");
        this.hook.setVisible(false);

        this.bgresult = ccui.helper.seekWidgetByName(this.node,"spr_result");
        this.bgresult.setVisible(false);

        this.fire = ccui.helper.seekWidgetByName(this.node,"fire");
        this.fire.setVisible(false);
        this.fire.setScale(0.2);

        this.start  = ccui.helper.seekWidgetByName(this.node,"btn_start0");
        this.start.addTouchEventListener(function (sender,type) {
            if(type != ccui.Widget.TOUCH_ENDED) return;
            mod_sound.playeffect(g_music["selectItemMp3"], false);
            if(!_this.begin){
                var gold = Number(_this.mycoin.getString());
                if (gold<_this.curbets){
                    gameclass.showText("您没钱了!");
                    return
                }

                ccui.helper.seekWidgetByName(_this.start,"img_begin").setVisible(false);
                ccui.helper.seekWidgetByName(_this.start,"img_zhi").setVisible(true);
                _this.begin = true;
                _this.txtwingold.setString(0);
                _this.bgresult.setVisible(false);
                _this.mod_game.sendStart(_this.curbets);

                _this.fire.setVisible(true);
                _this.fire.runAction(cc.sequence(cc.scaleTo(0.6,1),cc.callFunc(function () {
                    _this.fire.setVisible(false);
                    var huo = new gameclass.animation();
                    cc.log("hehehe0");
                    huo.Init(res["dfh_fireList"], "dfh_huo", 3, 0.1, true, function () {
                    });
                    huo.setAnchorPoint(cc.p(0.5,0));
                    huo.setPosition(63,594);
                    huo.setTag(1111);
                    _this.BG.addChild(huo);
                })));

            }else{
                _this.start.setTouchEnabled(false);
                _this.start.setBright(false);
                _this.mod_game.sendZhi(_this.curbets);
            }
        });



    },

    init:function () {
        var _this = this;

        this.mycoin = ccui.helper.seekWidgetByName(this.node,"txt_mycoin");
        this.txtwingold = ccui.helper.seekWidgetByName(this.node,"txt_wingold");
        this.txtwingold.setString(0);

        this.txt_remain = ccui.helper.seekWidgetByName(this.node,"txt_remain");
        this.txt_remain.setString(8);

        this.helpNode = ccui.helper.seekWidgetByName(this.node,"helpInfo");
        this.helpNode.setVisible(false);

        this.mybets = ccui.helper.seekWidgetByName(this.node,"txt_bets");
        this.mybets.setString(this.curbets);
        this.btn_jiabets = ccui.helper.seekWidgetByName(this.node,"btn_jia");
        this.btn_jianbets = ccui.helper.seekWidgetByName(this.node,"btn_jian");
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
        gameclass.createbtnpress(this.node,"btn_huanfu",function(){
            _this.game.uimgr.showui("gameclass.bank").setEnterance(1);
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
                _this.mod_game.dissmissroom();
            });
        });
        gameclass.createbtnpress(this.node, "btn_bangzhu", function () {
            _this.helpNode.setVisible(true);
            _this.btn_exitCaidan();
        });
        gameclass.createbtnpress(this.node, "helpInfo", function () {
            _this.helpNode.setVisible(false);
        });

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


    updateroominfo:function(data){
        cc.log("gameinfo:",data);
        var _this = this;
        this.updatePersonInfo(data.person)
        this.Person.index = data.index+1;
        this.Person.setPosition(this.walkPanel.getChildren()[this.Person.index].getPosition());
        this.txt_remain.setString(data.remaining);
        this.begin = data.begin;
        if(this.begin){
            ccui.helper.seekWidgetByName(this.start,"img_begin").setVisible(false);
            ccui.helper.seekWidgetByName(this.start,"img_zhi").setVisible(true);
            var huo = new gameclass.animation();
            huo.Init(res["dfh_fireList"], "dfh_huo", 3, 0.1, true, function () {
            });
            huo.setAnchorPoint(cc.p(0.5,0));
            huo.setPosition(63,594);
            huo.setTag(1111);
            this.BG.addChild(huo);
        }
    },

    updatePersonInfo:function (data) {
        this.updateMyGold(data.total);
    },

    //开始
    updateMyGold:function (gold) {
        this.mubei.setVisible(false);
        this.mubei.setScale(0.1);
        this.Person.setVisible(true);
        this.zhizhen.setRotation(180);

        for (var i=0;i<this.lightPanel.getChildren().length;i++){
            this.lightPanel.getChildren()[i].setVisible(false);
        }
        for (var i=0;i<this.coinPanel.getChildren().length;i++){
            this.coinPanel.getChildren()[i].setVisible(true);
        }

        this.mycoin.setString(gold);
        this.txt_remain.setString(8);
    },

    //得到到1的剩下度数
    getyudu:function (du) {
        var i=1;
        while((360*i+180)<du){
            i++;
        }
        return (360*i+180-du);
    },
    //转
    zhuan:function (num) {
        var _this = this;
        mod_sound.playeffect(g_music["dfh_zhuan"]);
        var curdu  = this.zhizhen.getRotation();
        while(curdu>=360){
            curdu-= 360;
            this.zhizhen.setRotation(curdu);
        }
        var yudu = this.getyudu(curdu);
        var targetdu = curdu+(num-1)*60+yudu;
        this.zhizhen.num = num;
        this.zhizhen.runAction(cc.sequence(cc.rotateTo(1,360*2+targetdu),cc.delayTime(0.5),cc.callFunc(function (sender) {
            _this.personWalk(sender.num);
        })));
    },

    judgelight:function () {
        for (var i=0;i<this.coinPanel.getChildren().length;i++){
            if (this.coinPanel.getChildren()[i].index<=(this.Person.index-1)){
                this.coinPanel.getChildren()[i].setVisible(false);
                for (var j=0;j<=this.coinPanel.getChildren()[i].index;j++){
                    this.lightPanel.getChildren()[j].setVisible(true);
                }
            }
        }
    },

    judegeDiaosi:function () {   //吊死
        if (this.remain_ci==0){
            var a = this.Person.index;
            if (a==2||a==5||a==8||a==11||a==13||a==17||a==19||a==22||a==25||a==29||a==34||a==39||a==40){
                return false;
            }else{
                return true
            }
        }else{
            return false;
        }
        return false;
    },

    //人物移动
    personWalk:function (num) {
        cc.log("num = ",num);
        var _this = this;
        if (num == 0){
            if(!_this.begin) {      //结束
                ccui.helper.seekWidgetByName(_this.start,"img_begin").setVisible(true);
                ccui.helper.seekWidgetByName(_this.start,"img_zhi").setVisible(false);
                this.bgresult.setVisible(true);
                this.BG.removeChildByTag(1111);
                this.fire.setScale(0.2);
                if (this.Person.index!=48){     //死亡动画

                    if (this.judegeDiaosi()){
                        mod_sound.playeffect(g_music["dfh_deathup"]);
                        this.Person.setVisible(false);
                        this.deathperson.setVisible(true);
                        this.deathperson.setPosition(this.Person.getPosition());

                        this.hook.setVisible(true);
                        this.hook.setPosition(this.Person.getPosition());
                        this.hook.setPositionY(640);
                        this.hook.runAction(cc.sequence(cc.moveTo(0.2,cc.p(_this.Person.getPositionX(),_this.Person.getPositionY())),cc.spawn(cc.callFunc(function () {
                            _this.deathperson.runAction(cc.sequence(cc.delayTime(0.1),cc.moveTo(1.2, cc.p(_this.Person.getPositionX(), 1200)), cc.callFunc(function () {
                                _this.deathperson.setVisible(false);
                            })));
                        }),cc.moveTo(1.3,cc.p(_this.Person.getPositionX(), 1200))),cc.callFunc(function () {
                            _this.hook.setVisible(false);
                        })));



                        this.guangzhu.setVisible(true);
                        this.guangzhu.setPosition(this.Person.getPosition());
                        this.guangzhu.runAction(cc.sequence(cc.blink(1.2,5),cc.callFunc(function () {
                            _this.guangzhu.setVisible(false);
                            _this.start.setTouchEnabled(true);
                            _this.start.setBright(true);
                        })));
                    }else {
                        //调到坟墓动画
                        mod_sound.playeffect(g_music["dfh_deathdown"]);
                        this.Person.setVisible(false);
                        this.deathperson.setVisible(true);
                        this.deathperson.setPosition(this.Person.getPosition());

                        this.deathlf_eft.setVisible(true);
                        var lfpos = cc.p(this.Person.getPositionX() + 2, this.Person.getPositionY() - 11);
                        this.deathlf_eft.setPosition(lfpos);
                        this.deathfd.runAction(cc.sequence(cc.spawn(cc.sequence(cc.scaleTo(0.3, 1.3),cc.delayTime(0.2),cc.scaleTo(0.3, 1.6)), cc.callFunc(function () {
                            _this.deathsx.runAction(cc.sequence(cc.scaleTo(0.3, 0.77),cc.delayTime(0.2),cc.scaleTo(0.3, 0.625)));
                        })), cc.callFunc(function () {

                            var person = _this.deathperson.getChildren()[0];
                            person.runAction(cc.sequence(cc.moveTo(0.8, cc.p(person.getPositionX(), -200)), cc.callFunc(function (sender) {
                                _this.deathperson.setVisible(false);
                                sender.setPositionY(11.47);
                            })));

                            _this.redpanel.setVisible(true);
                            var posredlight = cc.p(_this.Person.getPositionX(), _this.Person.getPositionY() - 30);
                            _this.redpanel.setPosition(posredlight);

                            var posdong = cc.p(_this.Person.getPositionX()+6, _this.Person.getPositionY() - 4);
                            _this.dong.setVisible(true)
                            _this.dong.setPosition(posdong);

                            _this.redpanel.runAction(cc.sequence(cc.spawn(cc.moveTo(0.8,cc.p(_this.redpanel.getPositionX(),_this.redpanel.getPositionY()-133)),cc.callFunc(function () {
                                _this.deathred.runAction(cc.moveTo(0.8,cc.p(_this.deathred.getPositionX(),133)));
                            })),cc.callFunc(function () {
                                _this.redpanel.setVisible(false);
                                _this.redpanel.setPosition(cc.p(_this.redpanel.getPositionX(),_this.redpanel.getPositionY()+133));
                                _this.deathred.setPosition(cc.p(_this.deathred.getPositionX(),0));
                                _this.start.setTouchEnabled(true);
                                _this.start.setBright(true);

                                _this.mubei.setVisible(true);
                                _this.mubei.setPosition(_this.Person.getPosition());
                                _this.mubei.runAction(cc.sequence(cc.scaleTo(0.1,1)));
                            }),cc.delayTime(0.2),cc.callFunc(function () {
                                _this.dong.setVisible(false);
                            })));

                            _this.deathlf_eft.setVisible(false);
                            _this.deathfd.setScale(1);
                            _this.deathsx.setScale(1);
                        })));
                    }
                }else{
                    _this.start.setTouchEnabled(true);
                    _this.start.setBright(true);
                }
                if (this.Person.index>=12){//赢
                    this.bgresult.getChildren()[0].setVisible(true);
                    this.bgresult.getChildren()[1].setVisible(false);
                    this.txtwingold.setString(this.personinfo.win);
                    this.mycoin.setString(this.personinfo.total);
                }else{
                    this.bgresult.getChildren()[1].setVisible(true);
                    this.bgresult.getChildren()[0].setVisible(false);
                }

            }else{
                _this.start.setTouchEnabled(true);
                _this.start.setBright(true);
            }

            return;
        }else{
            var pos = _this.walkPanel.getChildren()[_this.Person.index+1].getPosition();
            _this.Person.index++;
            mod_sound.playeffect(g_music["dfh_walk"]);
            this.Person.num = num;
            this.Person.runAction(cc.sequence(cc.jumpTo(0.2,pos,50,1),cc.delayTime(0.1),cc.callFunc(function () {
                _this.judgelight();
                _this.personWalk(_this.Person.num-1);
            })));

        }
    },

    //开始探宝
    startFindGold:function (data) {
        var _this = this;
        this.remain_ci = data.remaining;
        this.txt_remain.setString(this.remain_ci);
        this.zhuan(data.ds);
    },

    gameOnEnd:function (data) {
        cc.log("游戏结束信息：", data);
        var _this = this;
        this.begin = false;
        this.personinfo = data.person;
    },
});
