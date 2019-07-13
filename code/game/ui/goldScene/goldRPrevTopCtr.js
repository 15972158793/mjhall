/**
 * 金币场一个游戏玩法顶部控制
 */
gameclass.goldRPrevTopCtr = cc.Class.extend({
    node: null,
    game: null,
    touchAnim: null,
    titleIcon: null,
    ctor: function ($node, $game) {
        this.node = $node;
        this.game = $game;
        this.show();
    },
    show: function () {
        var _this = this;

        var head = ccui.helper.seekWidgetByName(this.node, "headback");
        this.titleIcon = ccui.helper.seekWidgetByName(this.node, "gameNameSp");
        gameclass.mod_base.showtximg(head, this.game.modmgr.mod_login.logindata.imgurl, 0, 0, "im_headbg2");

        var name = ccui.helper.seekWidgetByName(this.node, "name");
        var id = ccui.helper.seekWidgetByName(this.node, "id");
        name.setString(this.game.modmgr.mod_login.logindata.name);
        id.setString("ID:" + this.game.modmgr.mod_login.logindata.uid);

        var gold = ccui.helper.seekWidgetByName(this.node, "gold");
        var text = gameclass.changeShow(this.game.modmgr.mod_login.logindata.gold);
        gold.setString(text);

        var goldLogo = ccui.helper.seekWidgetByName(this.node, "goldNode");
        var sucAnim = new sp.SkeletonAnimation(res.jsongold, res.atlasgold);
        sucAnim.setAnimation(0, 'animation', true);
        sucAnim.setAnchorPoint(0.5, 0.5);
        sucAnim.setPosition(goldLogo.width * 0.5, goldLogo.height * 0.5);
        goldLogo.addChild(sucAnim);
        sucAnim.setVisible(true);

        this.updategonggao();

        gameclass.createbtnpress(this.node, "headback", function () {
            _this.game.uimgr.showui("gameclass.personalSetLayer").setBaseInfo();
        });

        gameclass.createbtnpress(this.node, "backBtn", function () {
            _this.game.uimgr.closeui("gameclass.goldRPrevUi");
            _this.game.uimgr.showui("gameclass.hallGoldui");
        });

        var check = ccui.helper.seekWidgetByName(this.node, "check");
        var actuallyBg = ccui.helper.seekWidgetByName(this.node, "actually");
        actuallyBg.setVisible(false);
        check.addTouchEventListener(function (sender, type) {
            actuallyBg.getChildByName('actuallyMoney').setString("当前金币:" + _this.game.modmgr.mod_login.logindata.gold);
            if (type == ccui.Widget.TOUCH_BEGAN) {
                actuallyBg.setVisible(true);
            } else if (type == ccui.Widget.TOUCH_ENDED) {
                actuallyBg.setVisible(false);
            } else if (type == ccui.Widget.TOUCH_CANCELED) {
                actuallyBg.setVisible(false);
            }
        });
        gameclass.createbtnpress(this.node, "buygold", function () {
            _this.game.uimgr.showui("gameclass.goldShop");
        });
    },
    update: function () {
        var gold = ccui.helper.seekWidgetByName(this.node, "gold");
        var text = gameclass.changeShow(this.game.modmgr.mod_login.logindata.gold);
        gold.setString(text);
    },
    /**
     *
     * @param gameType
     */
    updateGameView: function (gameType) {
        // cc.log("goldRoomPrevTopControl updateGameView gameType=" + gameType);
        if (gameType == gameclass.gamekwx) {
            this.titleIcon.setTexture(res.kwxPrevNameIcon);
        } else if (gameType == gameclass.gameszp) {
            this.titleIcon.setTexture(res.szpPrevNameIcon);
        } else if (gameType == gameclass.gamenys) {
            this.titleIcon.setTexture(res.nyxPrevNameIcon);
        } else if (gameType == gameclass.gamegoldPtj) {
            this.titleIcon.setTexture(res.ptjTabNameIcon);
        } else if(gameType == gameclass.gameBZW){
            this.titleIcon.setTexture(res.bzwPrevNameIcon);
        } else if(gameType == gameclass.gamegoldEBG){
            this.titleIcon.setTexture(res.ttzTabNameIcon);
        } else if(gameType == gameclass.gameToubao){
            this.titleIcon.setTexture(res.dsTabNameIcon);
        } else {
            return;
        }

        this.titleIcon.setPositionX(cc.winSize.width / 2);
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

        gg.stopAllActions();
        var act = cc.repeatForever(cc.sequence(cc.moveTo(20, cc.p(0 - gg.getContentSize().width, gg.getPosition().y)), cc.moveTo(0, cc.p(mask.getContentSize().width, gg.getPosition().y))));
        gg.runAction(act);
    },
    destroy: function () {

    },
    updateUIMsg: function (msgtype) {
        if (msgtype == "updcard") {
            this.update();
        }

        return false;
    },
});