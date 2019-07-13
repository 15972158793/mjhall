/**
 * 金币场一个游戏玩法选择界面（长排列）
 */
gameclass.goldRPrevLongUi = gameclass.baseui.extend({
    node: null,
    touchAnim: null,
    topControl: null,
    _gameType: -1,
    _centerBindNode: null,
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.goldCRPrevType1json, true);
        var panel = new ccui.Layout();
        panel.setLocalZOrder(2222);
        this.addChild(panel);
        panel.setContentSize(cc.winSize.width, cc.winSize.height);

        this._centerBindNode = ccui.helper.seekWidgetByName(this.node, "centerBindNode");
        var len = this._centerBindNode.getChildrenCount();
        for (var i = 0; i < len; i++) {
            var btn = this._centerBindNode.getChildren()[i];
            btn.index = i;
            btn.addTouchEventListener(this.selectWayHandle, this);
        }

        this.topControl = new gameclass.goldRPrevTopCtr(ccui.helper.seekWidgetByName(this.node, "topBindNode"), this.game);

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

        this.addChild(this.node);
    },
    /**
     * 选择玩法
     */
    selectWayHandle: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;
        var obj = staticFunction.getStorages(gameclass.hallGoldui.storageKey);
        obj["game" + this._gameType] = sender.index;
        staticFunction.setStorages(gameclass.hallGoldui.storageKey, obj);

        // this.game.uimgr.closeui("gameclass.goldRPrevUi");
        this.game.uimgr.showui("gameclass.goldRoomUi").updateGameView(this._gameType);
    },
    /**
     * 根据游戏类型更新显示
     * @param gameType
     */
    updateGameView: function (gameType) {
        this._gameType = gameType;
        // cc.log("goldRoomPrevLongUi updateGameView gameType=" + gameType);
        this.topControl.updateGameView(gameType);

        this.updatePlayWay();


    },
    /**
     * 更新玩法列表
     */
    updatePlayWay: function () {
        var urlArr;
        if (this._gameType == gameclass.gamekwx) {
            urlArr = ["kwxWay_0", "kwxWay_1", "kwxWay_2", "kwxWay_3", "kwxWay_4"];
        } else {
            return;
        }

        var len = urlArr.length;
        for (var i = 0; i < len; i++) {
            var btn = this._centerBindNode.getChildren()[i];
            var iconSp = btn.getChildren()[0];
            iconSp.setTexture(res[urlArr[i]]);
        }
    },
    update: function () {
        this.topControl.update();
    },
    destroy: function () {
        this.topControl.destroy();
    },
    updateUIMsg: function (msgtype) {
        if (msgtype == "updcard") {
            this.update();
        }

        return false;
    },
});