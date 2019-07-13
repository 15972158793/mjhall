/**
 * 金币场-场景
 */
gameclass.hallGoldui = gameclass.baseui.extend({
    sprite: null,
    node: null,
    // wchat: null,
    p_mail: null,
    btn_jinbi: null,
    touchAnim: null,
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.hallGolduijson, true);
        var panel = new ccui.Layout();
        panel.setLocalZOrder(2222);
        this.addChild(panel);
        panel.setContentSize(cc.winSize.width, cc.winSize.height);

        this.touchAnim = new sp.SkeletonAnimation(res.touchAnimatejson, res.touchAnimateatlas);
        this.touchAnim.setAnimation(0, 'animation', false);
        this.touchAnim.setAnchorPoint(0.5, 0.5);
        panel.addChild(this.touchAnim);
        this.touchAnim.setVisible(false);
        var _this = this;
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                _this.touchAnim.setOpacity(255);
                _this.touchAnim.setVisible(true);
                _this.touchAnim.setPosition(touch.getLocation());
                _this.touchAnim.setAnimation(0, 'animation', false);
                return true;
            },
            onTouchMoved: function (touch, event) {
            },
            onTouchEnded: function (touch) {
            },
        }), panel);

        this.p_mail = ccui.helper.seekWidgetByName(this.node, "mail_d");

        this.addChild(this.node);

        var _this = this;

        var hallPanel = ccui.helper.seekWidgetByName(this.node, "hallPanel");
        hallPanel.setVisible(true);
        var hallPanel1 = ccui.helper.seekWidgetByName(this.node, "hallPanel1");
        var playList = ccui.helper.seekWidgetByName(this.node,"ListView_2");
        for(var i = 0;i < playList.getChildrenCount();i++){
            for(var j = 0;j < playList.getChildren()[i].getChildrenCount();j++){
                var gameBtn = playList.getChildren()[i].getChildren()[j];
                var gameBtnName = gameBtn.getName().toString();
                gameBtn.addTouchEventListener(this.btnClickHandle.bind(this));
            }
        }
        //var btnLen = hallPanel1.getChildrenCount();
        //for(var i = 0;i<btnLen;i++){
        //    var gameBtn = hallPanel1.getChildren()[i];
        //    var gameBtnName = gameBtn.getName().toString();
        //
        //    gameBtn.addTouchEventListener(this.btnClickHandle.bind(this));
        //}

        var btn_rank = ccui.helper.seekWidgetByName(this.node,"btn_rank");
        gameclass.createbtnpress(this.node, "btn_rank", function () {

            _this.game.uimgr.showui("gameclass.rankingList");
        });

        var levelUpJson = ccs.load(res.hallGolduijson);
        // levelUpJson.node;
        this.action = levelUpJson.action;
        this.node.runAction(this.action);
        //cocosStudio执行帧数
        this.action.gotoFrameAndPlay(0, 30, true);

        gameclass.createbtnpress(this.node, "btnShop", function () {
            _this.game.uimgr.showui("gameclass.goldShop");
        });
        gameclass.createbtnpress(this.node, "btnHuoDong", function () {
            //////////////////add at 20180301 tl/////////////////////////////
            _this.game.modmgr.mod_login.getTokey(function(_token){
                cc.sys.openURL("http://asyl.190youxi.com/asqp_ht/index/auth/token/"+_token);
            })
            ///////////////////////////////////////////////////////////
        });
        //大厅改版
        var clubSceneBtn = ccui.helper.seekWidgetByName(this.node,'btnFk');
        var quitBtn = ccui.helper.seekWidgetByName(this.node,'quitBtn');
        var clubAni = new sp.SkeletonAnimation(res.fangkachangAnimatejson, res.fangkachangAnimateatlas);
        clubAni.setAnimation(0, 'animation', true);
        clubAni.setAnchorPoint(0.5, 0.5);
        clubAni.setPosition(clubSceneBtn.width * 0.5, clubSceneBtn.height / 2 + 13);
        clubSceneBtn.addChild(clubAni);
        quitBtn.setVisible(false);
        quitBtn.setTouchEnabled(false);
        gameclass.createbtnpress(this.node, "btnFk", function () {
            _this.game.uimgr.closeui("gameclass.hallGoldui");
            var loginSetStorage = cc.sys.localStorage.getItem("firstroomtype");
            if(!loginSetStorage){
                _this.game.uimgr.showui("gameclass.hallui");
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("温馨提示:您可在设置中设置默认启动页面", function () {
                });
                cc.sys.localStorage.setItem("firstroomtype", "ok")
            }else{
                _this.game.uimgr.showui("gameclass.hallui");
            }
        });
        //end
        // gameclass.createbtnpress(this.node, "quitBtn", function () {
        //     _this.game.uimgr.closeui("gameclass.hallGoldui");
        // });

        var head = ccui.helper.seekWidgetByName(this.node, "headback");
        gameclass.mod_base.showtximg(head, this.game.modmgr.mod_login.logindata.imgurl, 0, 0, "im_headbg2");

        var name = ccui.helper.seekWidgetByName(this.node, "name");
        var id = ccui.helper.seekWidgetByName(this.node, "id");
        // var card = ccui.helper.seekWidgetByName(this.node, "money");
        name.setString(this.game.modmgr.mod_login.logindata.name);
        //name.setString("这是一个超长的名字字符的名字字符");
        id.setString("ID:" + this.game.modmgr.mod_login.logindata.uid);
        // card.setString(this.game.modmgr.mod_login.logindata.card);

        var gold = ccui.helper.seekWidgetByName(this.node, "gold");
        var text = gameclass.changeShow(this.game.modmgr.mod_login.logindata.gold);
        gold.setString(text);

        gameclass.createbtnpress(this.node, "btnSetting", function () {
            _this.game.uimgr.showui("gameclass.settingui");
            _this.game.uimgr.uis["gameclass.settingui"].btn_change.setVisible(true);
            //_this.tishiCallBack();
        });

        gameclass.createbtnpress(this.node, "headback", function () {
            _this.game.uimgr.showui("gameclass.personalSetLayer").setBaseInfo();
        });

        gameclass.createbtnpress(this.node, "btn_ZhanJi", function () {//战绩
            _this.game.uimgr.showui("gameclass.goldZhanji");
        });

        gameclass.createbtnpress(this.node, "btnMessage", function () {//消息
            _this.game.uimgr.showui("gameclass.mail");
            //_this.chupaiCallBack();
        });
        gameclass.createbtnpress(this.node, "btn_bank", function () {//消息
            _this.game.uimgr.showui("gameclass.bank");
        });
        //this.initTestData();
        this.updategonggao();
        this.updateareainfo();

        var check = ccui.helper.seekWidgetByName(this.node,"check");
        var actuallyBg = ccui.helper.seekWidgetByName(this.node,"actually");
        check.addTouchEventListener(function(sender,type){
            actuallyBg.getChildByName('actuallyMoney').setString("当前金币:"+_this.game.modmgr.mod_login.logindata.gold);
            if(type == ccui.Widget.TOUCH_BEGAN){
                actuallyBg.setVisible(true);
            }else if(type == ccui.Widget.TOUCH_ENDED){
                actuallyBg.setVisible(false);
            }else if(type == ccui.Widget.TOUCH_CANCELED){
                actuallyBg.setVisible(false);
            }
        });
        gameclass.createbtnpress(this.node, "buygold", function () {
            _this.game.uimgr.showui("gameclass.goldShop");
        });

        var btn_shangcheng = ccui.helper.seekWidgetByName(this.node,"btnShop");
        var sucAnim = new sp.SkeletonAnimation(res.shangchengAnimatejson, res.shangchengAnimateatlas);
        sucAnim.setAnimation(0, 'animation', true);
        sucAnim.setAnchorPoint(0.5, 0.5);
        sucAnim.setPosition(btn_shangcheng.width * 0.5, btn_shangcheng.height * 0.5);
        btn_shangcheng.addChild(sucAnim);
        sucAnim.setVisible(true);

        //var btn_psz = ccui.helper.seekWidgetByName(this.node,"Button_7");
        //var sucAnim = new sp.SkeletonAnimation(res.jsonPSZ, res.atlasPSZ);
        //sucAnim.setAnimation(0, 'animation', true);
        //sucAnim.setAnchorPoint(0.5, 0.5);
        //sucAnim.setPosition(btn_psz.width * 0.5, btn_psz.height * 0.5);
        //btn_psz.addChild(sucAnim);
        //sucAnim.setVisible(true);

        var btn_nys = ccui.helper.seekWidgetByName(this.node,"Button_65");
        var sucAnim = new sp.SkeletonAnimation(res.jsonNYS, res.atlasNYS);
        sucAnim.setAnimation(0, 'animation', true);
        sucAnim.setAnchorPoint(0.5, 0.5);
        sucAnim.setPosition(btn_nys.width * 0.5, btn_nys.height * 0.5);
        btn_nys.addChild(sucAnim);
        sucAnim.setVisible(true);

        var goldLogo = ccui.helper.seekWidgetByName(this.node,"goldNode");
        var sucAnim = new sp.SkeletonAnimation(res.jsongold, res.atlasgold);
        sucAnim.setAnimation(0, 'animation', true);
        sucAnim.setAnchorPoint(0.5, 0.5);
        sucAnim.setPosition(goldLogo.width * 0.5, goldLogo.height * 0.5);
        goldLogo.addChild(sucAnim);
        sucAnim.setVisible(true);

        var btnlayout = ccui.helper.seekWidgetByName(this.node,"btn_layout");
        btnlayout.x += 550;
        btnlayout.runAction(cc.moveBy(0.5, cc.p(-550, 0)));

        var has = this.game.modmgr.mod_center.isViewMailPoint();
        this.p_mail.setVisible(has);
        if(has) {
            this.game.uimgr.showui("gameclass.mail");
            this.game.uimgr.uis["gameclass.mail"].setMailTable();
        }
        //让牛元帅女的在图层最上面。别吧手遮住了
        ccui.helper.seekWidgetByName(this.node,"Panel0").setLocalZOrder(999);
        //
        this.tool_cardType = new gameclass.pdk_cardType();
    },
    btnClickHandle:function(sender, type){
        var gameBtn = sender;
        if(type == ccui.Widget.TOUCH_ENDED){
            mod_sound.playeffect(g_music["selectItemMp3"], false);
            var gameBtnName = gameBtn.getName().toString();
            this.showCreateRoomPanel(parseInt(gameBtnName.substr(7, gameBtnName.length - 1)));
        }
    },
    showCreateRoomPanel:function(gameType){
        if(gameType){
            if(gameType == gameclass.gamewzq){
                this.game.uimgr.showui("gameclass.wzqJoinRoomUi", null, null, null, "gameclass.jionroomui");
            }else if(gameType == gameclass.gamekwx){
                this.game.uimgr.showui("gameclass.goldRPrevLongUi", null, null, null, "gameclass.goldRPrevUi").updateGameView(gameType);
            }else if(gameType == gameclass.gameszp || gameType == gameclass.gamenys || gameType == gameclass.gamegoldPtj ){
                var ui = this.game.uimgr.showui("gameclass.goldRPrevShortUi", null, null, null, "gameclass.goldRPrevUi");
                ui.setgirlAnim(gameType);
                ui.updateGameView(gameType);
            } else  if(gameType == gameclass.gameBZW || gameType == gameclass.gamegoldEBG || gameType == gameclass.gamegoldLHD||  gameType == gameclass.gamegoldYYBF|| gameType == gameclass.gamegoldsxdb || gameType == gameclass.gamegoldYSZ || gameType == gameclass.gameDragon|| gameType == gameclass.gameDxtb){
                this.game.modmgr.mod_login.creategoldroom(gameType);
            } else if(gameType == gameclass.gameFpj){
                this.game.modmgr.mod_login.creategoldroom(gameType);
            } else if(gameType == gameclass.gamegoldRacing){
                this.game.modmgr.mod_login.creategoldroom(gameType);
            } else if(gameType == gameclass.gamegoldTB){
                this.game.modmgr.mod_login.creategoldroom(gameType);
			} else if(gameType == gameclass.gameFish){
                this.game.modmgr.mod_login.creategoldroom(gameType);
            } else if(gameType == gameclass.gameToubao){
                var ui = this.game.uimgr.showui("gameclass.goldRPrevShortUi", null, null, null, "gameclass.goldRPrevUi");
                ui.setgirlAnim(gameType);
                ui.updateGameView(gameType);
            }
            //else if(gameType == gameclass.gamegoldTTZ || gameType == gameclass.gamegoldPDK){
            //    this.game.uimgr.showui("gameclass.goldRoomUi").updateGameView(gameType);
            //}
            else{
                this.game.uimgr.showui("gameclass.goldRoomUi").updateGameView(gameType);
            }
        }else{
            //未开放游戏
            this.game.uimgr.showui("gameclass.msgboxui");
            this.game.uimgr.uis["gameclass.msgboxui"].setString(staticString.gameDevelop);
        }
    },

    update: function () {
        var gold = ccui.helper.seekWidgetByName(this.node, "gold");
        var text = gameclass.changeShow(this.game.modmgr.mod_login.logindata.gold);
        gold.setString(text);
    },
    /**
     * 走马灯
     */
    updategonggao: function () {
        var gg = ccui.helper.seekWidgetByName(this.node, "pmdInfo");
        gg.setString(this.game.modmgr.mod_center.gonggao);
        gg.ignoreContentAdaptWithSize(true);


        var mask = ccui.helper.seekWidgetByName(this.node, "pmdBack");

        gg.setPositionX(mask.getContentSize().width);
        //gg.setPosition(cc.p(666,16));

        gg.stopAllActions();
        var act = cc.repeatForever(cc.sequence(cc.moveTo(20, cc.p(0 - gg.getContentSize().width, gg.getPosition().y)), cc.moveTo(0, cc.p(mask.getContentSize().width, gg.getPosition().y))));
        gg.runAction(act);
    },
    updateareainfo: function () {
        // if (this.game.modmgr.mod_center.areainfo == null) {
        //     this.wchat.setString("asnn999");
        //     return;
        // } else {
        //     if (this.game.modmgr.mod_center.areainfo.wchat == "") {
        //         this.wchat.setString("asnn999");
        //     } else {
        //         this.wchat.setString(this.game.modmgr.mod_center.areainfo.wchat);
        //     }
        // }
        //this.wchat.setString("微信公众号:Wbing19831127");
        ////this.wchat.setString(this.game.modmgr.mod_center.areainfo.wchat);
        //this.wchat.ignoreContentAdaptWithSize(true);
    },
    updateMailPoint: function () {
        var has = this.game.modmgr.mod_center.isViewMailPoint();
        this.p_mail.setVisible(has);
        if(has) {
            this.game.uimgr.showui("gameclass.mail");
            this.game.uimgr.uis["gameclass.mail"].setMailTable();
        }
    },


    destroy:function () {
        // cc.log("hallGoldui destroy...")
    },


    updateUIMsg : function(msgtype) {
        if(msgtype == "updcard") {
            this.update();
        }else if(msgtype == "noticeinfo"){
            this.updateMailPoint();
        }

        return false;
    },

    //==================test pdk cardtype============================

    initTestData:function(){
        this.handCard = [41,41,42,43,61];
        this.savebefCard = [31,32,34,35,61,71];
    },

    tishiCallBack:function(){
        var befcards = this.savebefCard.slice(0);
        var handCard = this.handCard.slice(0);
        handCard = this.transCardtoNum(handCard);

        //! 复制手牌
        var copyhandcards = [];
        for(var i =  0;i < handCard.length;i++) {
            copyhandcards[i] = handCard[i].id;
        }

        var card = this.tool_cardType.tipsCard(copyhandcards, befcards);
    },

    chupaiCallBack:function(){
        this.checkCanOut(this.handCard.slice(0));
    },

    checkCanOut:function(_willSendCard){
        var checkCards = this.transMinCard(_willSendCard);
        var check = false;
        var zhuangjiaIndex = 1;
        if(zhuangjiaIndex == 0) {
            var hitCard = this.tool_cardType.check(checkCards);
            var canout = this.checkCard(hitCard,checkCards);
            if(canout && hitCard != 0) {
                check = true;
            }
        }else{
            //test
            var befcards = this.savebefCard.slice(0);
            //testend
            var checkCards2 = this.transMinCard(befcards);
            var perssCard = this.tool_cardType.compare(checkCards,checkCards2);
            //检测三带或者飞机张数是否匹配
            var canout = this.checkCard(perssCard,checkCards);
            if (canout &&  perssCard.result != -1 && perssCard.value != -1) {
                check = true;
            }
        }
        return check;
    },

    checkCard:function(cards,checkCards){
        var canOut = true;
        var countMax;
        if(cards.type == this.tool_cardType.CARDTYPE.sandai || cards.type == this.tool_cardType.CARDTYPE.feiji || cards.type == this.tool_cardType.CARDTYPE.sidai){
            countMax = 5;
            if(cards.type == this.tool_cardType.CARDTYPE.feiji) {
                if(cards.res){
                    countMax = cards.res.count*5;
                }else{
                    countMax =cards.value.count*5;
                }
            } else if(cards.type == this.tool_cardType.CARDTYPE.sidai){
                countMax = 6;
            }
            if(this.handCard.length >= countMax ){
                if(checkCards.length != countMax){
                    canOut = false;
                }
            }else{
                if(this.handCard.length != checkCards.length){
                    canOut = false;
                }
            }
        }
        return canOut;
    },


    transCardtoNum:function(_cards){
        var abcd = ["a","d","b","c"];
        var arr = [];

        for(var x =0;x< _cards.length ; x++){
            var point = Math.floor(_cards[x]/10);
            var type = _cards[x] % 10;
            if(point < 3){
                point+=13;
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

    transMinCard:function(_arrCards){
        var checkCards = [];
        for(var i =0;i < _arrCards.length; i++){
            checkCards[i]= Math.floor(_arrCards[i]/10);
            if(checkCards[i] < 3){
                checkCards[i] += 13;
            }
        }
        return checkCards;
    },

    //==================================================================
});

gameclass.goldScwelcome = gameclass.baseui.extend({
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.goldScwelcome,true);
        this.addChild(this.node);

        var _this = this;

        gameclass.createbtnpress(this.node, "Button_1", function () {
            _this.game.uimgr.closeui("gameclass.goldScwelcome");
        });
    },
});
//金币场本地缓存键值
gameclass.hallGoldui.storageKey = "goldSceneCache";