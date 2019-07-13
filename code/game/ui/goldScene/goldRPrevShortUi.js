/**
 * 金币场一个游戏玩法选择界面（短排列，美女，右侧菜单）
 */
gameclass.goldRPrevShortUi = gameclass.baseui.extend({
    node: null,
    touchAnim: null,
    topControl: null,
    _gameType: -1,
    _btnContain: null,
    //tab按钮组件控制器
    btnGroupCtr: null,
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.goldCRPrevType0json, true);
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

        this.addChild(this.node);

        this.topControl = new gameclass.goldRPrevTopCtr(ccui.helper.seekWidgetByName(this.node, "topBindNode"), this.game);
        this._btnContain = ccui.helper.seekWidgetByName(this.node, "btnContain");
        ccui.helper.seekWidgetByName(this.node, "baofang").setVisible(false);
        //var girlSp = ccui.helper.seekWidgetByName(this.node, "girlSp");
        //var sucAnim = new sp.SkeletonAnimation(res.goldRoomMvJson, res.goldRoomMvAtlas);
        //sucAnim.setAnimation(0, 'animation', true);
        //sucAnim.setAnchorPoint(0.5, 0.5);
        //sucAnim.setPosition(girlSp.width * 0.5, girlSp.height * 0.5);
        //girlSp.addChild(sucAnim);
        //sucAnim.setVisible(true);
        this.btnGroupCtr = new gameclass.buttonGroupControl();
        this.btnGroupCtr._BTN_CLICK = gameclass.ROOM_WAY_TABBTN_CLICK;
        // var rightNode = ccui.helper.seekWidgetByName(this.node, "rightBindNode");
        // var chargeBtn = rightNode.getChildByName("chargeBtn");
        // var setBtn = rightNode.getChildByName("setBtn");
        // var inviteBtn = rightNode.getChildByName("inviteBtn");
        // var btnControlArr = this.btnGroupCtr.switchBtnControl([chargeBtn, setBtn, inviteBtn], ["normal"], ["select"]);
        // this.btnGroupCtr.initData(btnControlArr);
        // this.btnGroupCtr.setSelectIndex(0);
        // cc.eventManager.addCustomListener(gameclass.ROOM_WAY_TABBTN_CLICK, this.btnGroupClickHandle.bind(this));
    },
    setgirlAnim:function(gameType){
        var girlSp = ccui.helper.seekWidgetByName(this.node, "girlSp");
        if(gameType == gameclass.gameszp){
            var createbf = function(){
                cc.log("createbfroomui")
                this.game.uimgr.showui("gameclass.createbfroomui").setGameType(0);
            };
            var joinbf = function(){
                this.game.uimgr.showui("gameclass.wzqJoinRoomUi", null, null, null, "gameclass.jionroomui").sethideokBtn();
            };
            girlSp.setVisible(false);
            this._btnContain.setPosition(cc.p(-312,0));
            var baofang = ccui.helper.seekWidgetByName(this.node, "baofang");
            baofang.setVisible(false);
            // gameclass.createbtnpress(baofang, "createbf", createbf);
            // gameclass.createbtnpress(baofang, "joinbf", joinbf);
        }else if(gameType == gameclass.gameToubao){
            var createbf = function(){
                this.game.modmgr.mod_login.createroom(gameclass.gameTBBF,1,0,0);
                //this.game.uimgr.showui("gameclass.createbfroomui").setGameType(0);
            };
            var joinbf = function(){
                this.game.uimgr.showui("gameclass.wzqJoinRoomUi", null, null, null, "gameclass.jionroomui").sethideokBtnds();
            };
            girlSp.setVisible(false);
            this._btnContain.setPosition(cc.p(-312,0));
            var baofang = ccui.helper.seekWidgetByName(this.node, "baofang");
            baofang.setVisible(true);
            gameclass.createbtnpress(baofang, "createbf", createbf);
            gameclass.createbtnpress(baofang, "joinbf", joinbf);
        } else if(gameType == gameclass.gamenys){

            var createbf = function(){
              //  this.game.uimgr.showui("gameclass.createroomui").setGameType();
              // this.game.uimgr.showui("gameclass.createKwxRoomUi", null, null, null, "gameclass.createroomui");
               // this.game.uimgr.showui("gameclass.createroomui");
                this.game.uimgr.showui("gameclass.createroomui");
                this.game.uimgr.uis["gameclass.createroomui"].setGameType(Number(8));
            };
            var joinbf = function(){

                this.game.uimgr.showui("gameclass.wzqJoinRoomUi", null, null, null, "gameclass.jionroomui").sethideokBtn();
            };
            girlSp.setVisible(false);
            this._btnContain.setPosition(cc.p(-312,0));
            var baofang = ccui.helper.seekWidgetByName(this.node, "baofang");
            baofang.setVisible(true);
            gameclass.createbtnpress(baofang, "createbf", createbf);
            gameclass.createbtnpress(baofang, "joinbf", joinbf);
        } else{
            girlSp.setVisible(true);
            var sucAnim = new sp.SkeletonAnimation(res.goldRoomMvJson, res.goldRoomMvAtlas);
            sucAnim.setAnimation(0, 'animation', true);
            sucAnim.setAnchorPoint(0.5, 0.5);
            sucAnim.setPosition(girlSp.width * 0.5, girlSp.height * 0.5);
            girlSp.addChild(sucAnim);
        }
    },
    // /**
    //  * tab按钮点击处理
    //  */
    // btnGroupClickHandle: function (event) {
    //     cc.log("clickIndex=" + event.getUserData().index);
    //
    // },
    /**
     * 选择玩法
     */
    selectWayHandle: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;
        var obj = staticFunction.getStorages(gameclass.hallGoldui.storageKey);
        obj["game" + this._gameType] = sender.index;
        staticFunction.setStorages(gameclass.hallGoldui.storageKey, obj);
        cc.log(this._gameType);
        // this.game.uimgr.closeui("gameclass.goldRPrevUi");
        this.game.uimgr.showui("gameclass.goldRoomUi").updateGameView(this._gameType);
    },
    /**
     * 根据游戏类型更新显示
     * @param gameType
     */
    updateGameView: function (gameType) {
        this._gameType = gameType;
        cc.log(this._gameType);
        this.topControl.updateGameView(gameType);

        this.updatePlayWay();

        var len = this._btnContain.getChildrenCount();
        var _this = this;

        for (var i = 0; i < len; i++) {
            var btn = this._btnContain.getChildren()[i];
            btn.index = i;
            if(this._gameType != gameclass.gameBZW && this._gameType != gameclass.gamegoldEBG){
                if(this._gameType == gameclass.gameToubao){
                    btn.addTouchEventListener(function(sender,type){
                        if(type != ccui.Widget.TOUCH_ENDED) return;
                        _this.game.modmgr.mod_login.creategoldroom(_this._gameType);
                    })
                }else{
                    btn.addTouchEventListener(this.selectWayHandle, this);
                }
            } else{
                btn.addTouchEventListener(function(sender,type){
                    if(type != ccui.Widget.TOUCH_ENDED) return;
                    var type = _this._gameType + sender.index;
                    if(type == 60000) type = 60001;
                    else if(type == 60001) type = 60000;
                    _this.game.modmgr.mod_login.creategoldroom(type);
                })
            }
        }
    },
    /**
     * 更新玩法列表
     */
    updatePlayWay: function () {
        var urlArr;
        var showType = 0;
        if (this._gameType == gameclass.gameszp) {
            urlArr = ["szpWay_0", "szpWay_1"];
            showType = 2;
        } else if (this._gameType == gameclass.gamenys) {
            urlArr = ["nysWay_0", "nysWay_1","nysWay_2"];
            showType = 1;
        } else if (this._gameType == gameclass.gamegoldPtj) {
            urlArr = ["ptjWay_0", "ptjWay_1"];
        } else if (this._gameType == gameclass.gameBZW){
            urlArr = ["bzwWay_1","bzwWay_0"];
        } else if (this._gameType == gameclass.gamegoldEBG){
            urlArr = ["ebgWay_1","ebgWay_0"];
        } else if (this._gameType == gameclass.gameToubao){
           urlArr = ["dsWay_0"];
            showType = 3;
        } else {
            return;
        }

        var len = urlArr.length;
        var posArr = [
            [537.60,874.68],
            [443.81,706.91,970],
            [637.60,1124.68],
            [737.60]
        ]

        for (var i = 0; i < len; i++) {
            var btn = this._btnContain.getChildren()[i];
            btn.setVisible(i<len);
            btn.setPositionX(posArr[showType][i]);
            var iconSp = btn.getChildren()[0];
            iconSp.setTexture(res[urlArr[i]]);
        }

        if(showType==3){
            this._btnContain.getChildren()[1].setVisible(false);
        }
    },
    update: function () {
        this.topControl.update();
    },
    destroy: function () {
        this.topControl.destroy();
        cc.eventManager.removeCustomListeners(gameclass.ROOM_WAY_TABBTN_CLICK);
    },
    updateUIMsg: function (msgtype) {
        if (msgtype == "updcard") {
            this.update();
        }

        return false;
    },
});
//界面TAB按钮组件
gameclass.ROOM_WAY_TABBTN_CLICK = "gameclass.ROOM_WAY_TABBTN_CLICK";