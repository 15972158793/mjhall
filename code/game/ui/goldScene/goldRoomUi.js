/**
 * 金币场房间选择界面
 */
gameclass.goldRoomUi = gameclass.baseui.extend({
    //TAB列表
    listView: null,
    //房间按钮容器
    roomBtnContain: null,
    //返回按钮
    backBtn: null,
    //抬头游戏名
    gameNameImg: null,
    //标准TAB按钮
    btnStyle: null,
    //游戏基本数据
    gamesData: [
        {
            gameType: gameclass.gamekwx,
            gameSubType: [gameclass.gamekwx, gameclass.gamekwx1, gameclass.gamekwx2, gameclass.gamekwx3, gameclass.gamekwx4, gameclass.gamekwx5],
            gameNameIcon: res.kwxNameIcon,
            modIconArr: [
                [res.kwx0_0, res.kwx0_1],
                [res.kwx1_0, res.kwx1_1],
                [res.kwx2_0, res.kwx2_1],
                [res.kwx3_0, res.kwx3_1],
                [res.kwx4_0, res.kwx4_1]
            ]
        },
        {
            gameType: gameclass.gamewzq,
            gameSubType: [gameclass.gamewzq],
            gameNameIcon: res.kwxNameIcon,
            modIconArr: []
        },
        {
            gameType: gameclass.gameszp,
            gameSubType: [gameclass.gameszp, gameclass.gameszp_fk],
            gameNameIcon: res.szpNameIcon,
            modIconArr: [
                [res.szp0_0, res.szp0_1],
                [res.szp1_0, res.szp1_1]
            ]
        },
        {
            gameType: gameclass.gamenys,
            gameSubType: [gameclass.gamenys, gameclass.gamenys],
            gameNameIcon: res.nysNameIcon,
            modIconArr: [
                [res.nys0_0, res.nys0_1],
                [res.nys1_0, res.nys1_1],
                [res.nys2_0, res.nys2_1],
            ]
        },
        {
            gameType: gameclass.gamegoldPtj,
            gameSubType: [gameclass.gamegoldPtj, gameclass.gamegoldPtj],
            gameNameIcon: res.ptjTabNameIcon,
            modIconArr: [
                [res.ptjDaTabNameIcon2, res.ptjDaTabNameIcon1],
                [res.ptjxiaoTabNameIcon2, res.ptjxiaoTabNameIcon1]
            ]
        },
        {
            gameType: gameclass.gamegoldTTZ,
            gameSubType: [gameclass.gamegoldTTZ, gameclass.gamegoldTTZ],
            gameNameIcon: res.ttzTabNameIcon,
            modIconArr: [
                [res.ttzDaTabNameIcon2, res.ttzDaTabNameIcon1]
            ]
        },
        {
            gameType:gameclass.gamegoldPDK,
            gameSubType:[gameclass.gamegoldPDK],
            gameNameIcon: res.pdkTabNameIcon,
            modIconArr:[
                //[res.pdk0_0, res.pdk0_1],
                [res.pdk1_0, res.pdk1_1],
            ],
        }
    ],
    //tab按钮组件控制器
    btnGroupCtr: null,
    //当前游戏类型
    curGameType: 0,
    //tab索引
    curTabIndex: 0,
    //房间按钮列表
    roomBtnArr: null,
    //房间按钮区域
    _rooBtnRec: null,
    ctor: function () {
        this._super();
    },
    show: function () {
        this.init();
        this.initView();
        this.initListen();
        this.initialize();
    },
    init: function () {
        var _this = this;
        this.btnGroupCtr = new gameclass.buttonGroupControl();
        this.btnGroupCtr._BTN_CLICK = gameclass.GOLD_ROOM_TABBTN_CLICK;
        this.node = this.game.uimgr.createnode(res.goldCreateRoomjson, true);
        var title = this.node.getChildByName("title");
        this.backBtn = title.getChildByName("backBtn");
        this.gameNameImg = title.getChildByName("gameNameIcon");
        this.listView = this.node.getChildByName("ListView_1");
        this.btnStyle = this.listView.getChildByName("btnStyle");
        var rightPanel = this.node.getChildByName("rightPanel");

        var mask = rightPanel.getChildByName("btnMask");
        this.roomBtnContain = mask.getChildByName("btnContain");
        this.roomBtnArr = [];
        var roomBtnLen = 6;
        for (var i = 0; i < roomBtnLen; i++) {
            var btn = this.roomBtnContain.getChildByName("Button_" + i);
            btn.getChildren()[0].setVisible(false);
            btn.btntype = i;
            this.roomBtnArr.push(btn);
        }

        this.listView.removeAllChildren();
        this.game.modmgr.mod_login.getGoldGameNum(function (data) {
            _this.roomInfodata = data.info;
            // cc.log(data);
            _this.showGamePeople();
        })
    },
    initView: function () {
        this.addChild(this.node);
    },
    initListen: function () {
        this.backBtn.addTouchEventListener(this.backHandle.bind(this));
        cc.eventManager.addCustomListener(gameclass.GOLD_ROOM_TABBTN_CLICK, this.btnGroupClickHandle.bind(this));

        var len = this.roomBtnArr.length;
        for (var i = 0; i < len; i++) {
            var btn = this.roomBtnArr[i];
            btn.addTouchEventListener(this.roomBtnClick.bind(this));
        }
    },
    initialize: function () {

    },
    clearListen: function () {
        cc.eventManager.removeCustomListeners(gameclass.GOLD_ROOM_TABBTN_CLICK);
    },
    // /**
    //  * 房间按钮动画
    //  */
    // playRoomBtnMovie: function () {
    //     this.roomBtnContain.setPositionY(-this.roomBtnContain.getContentSize().height);
    //     this.roomBtnContain.runAction(cc.moveTo(0.2, 0, 0));
    // },
    /**
     * tab按钮点击处理
     */
    btnGroupClickHandle: function (event) {
        // cc.log("clickIndex=" + event.getUserData().index);
        var obj;
        var localStr = cc.sys.localStorage.getItem(gameclass.hallGoldui.storageKey);
        if (localStr) {
            obj = JSON.parse(localStr);
        } else {
            obj = {};
        }

        // this.playRoomBtnMovie();

        obj["game" + this.curGameType] = event.getUserData().index;
        this.curTabIndex = obj["game" + this.curGameType];
        cc.sys.localStorage.setItem(gameclass.hallGoldui.storageKey, JSON.stringify(obj));
        this.btn_callBack();
    },
    /**
     * 房间按钮点击事件处理
     */
    roomBtnClick: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;
        this.roomBtnClickSub(sender.btntype);
    },
    roomBtnClickSub: function (btntype) {
        // cc.log("gameType="+this.curGameType+",tabIndex="+this.curTabIndex);
        var realGameType;
        var len = this.gamesData.length;
        for (var i = 0; i < len; i++) {
            var ob = this.gamesData[i];
            if (ob.gameType == this.curGameType) {

                if (this.curGameType == gameclass.gamekwx) {
                    realGameType = gameclass.gamegoldkwx + btntype * 10 + this.curTabIndex;
                } else if (this.curGameType == gameclass.gameszp) {
                    realGameType = gameclass.gamegoldszp + btntype * 10 + this.curTabIndex;
                } else if (this.curGameType == gameclass.gamenys) {
                    realGameType = gameclass.gameGoldNiu + btntype * 10 + this.curTabIndex;
                } else if (this.curGameType == gameclass.gamegoldPtj) {
                    realGameType = gameclass.gamegoldPtj + btntype * 10 + this.curTabIndex;
                } else if (this.curGameType == gameclass.gamegoldTTZ)  {
                    realGameType = gameclass.gamegoldTTZ + btntype * 10 + 1;//暂时写死为1
                } else if (this.curGameType == gameclass.gamegoldPDK)  {
                    //var select = (this.curTabIndex == 0 ? 1: 0);
                    realGameType = this.curGameType + btntype * 10 + 0;
                }
                cc.log("游戏:"+realGameType);
                this.game.modmgr.mod_login.creategoldroom(realGameType);
                break;
            }
        }
    },
    /**
     * tab按钮入场动画
     */
    showBtnListMovie: function () {
        var oldX;
        var len = this.listView.getChildrenCount();
        for (var i = 0; i < len; i++) {
            var child = this.listView.getChildren()[i];
            oldX = child.getPositionX();
            // cc.log(i + ":x=" + child.getPositionX() + ",y=" + child.getPositionY())
            child.setPositionX(oldX - child.getContentSize().width);
            child.runAction(cc.sequence(cc.delayTime(i * 0.05), cc.moveTo(0.1, oldX, child.getPositionY())));
        }
    },

    /**
     * 根据游戏类型更新显示
     * @param gameType
     */
    updateGameView: function (gameType) {
        this.curGameType = gameType;
        this.curTabIndex = 0;
        cc.log("goldRoomUi updateGameView gameType=" + gameType);

        var len = this.gamesData.length;
        for (var i = 0; i < len; i++) {
            var ob = this.gamesData[i];
            if (ob.gameType == this.curGameType) {
                this.updateTitle(ob.gameNameIcon);
                this.updateModeBtnList(ob.modIconArr);
                break;
            }
        }

        this.showBtnListMovie();

        var localStr = cc.sys.localStorage.getItem(gameclass.hallGoldui.storageKey);
        if (localStr) {
            var obj = JSON.parse(localStr);
            if (obj["game" + this.curGameType]) {
                this.curTabIndex = obj["game" + this.curGameType];
                this.btnGroupCtr.setSelectIndex(this.curTabIndex);
            }
        }
    },
    /**
     * 更新房间显示数据
     */
    updateRoomView: function (data) {
        //wait handle
    },
    updateTitle: function (imgUrl) {
        this.gameNameImg.setTexture(imgUrl);
        this.gameNameImg.setPositionX((cc.winSize.width - this.gameNameImg.getContentSize().width) / 2);
    },
    /**
     * 更新游戏玩法按钮列表
     * @param iconArr
     */
    updateModeBtnList: function (iconArr) {
        this.listView.removeAllChildren();
        var btnControlArr = [];
        var len = iconArr.length;
        for (var i = 0; i < len; i++) {
            var btnIconArr = iconArr[i];
            var btn = this.btnStyle.clone();
            var bgNormal = btn.getChildByName("bgNormal");
            var bgSelect = btn.getChildByName("bgSelect");
            this.addTextToBtn(bgNormal, btnIconArr[0]);
            this.addTextToBtn(bgSelect, btnIconArr[1]);
            btn.setName("btn" + i);
            // this.listView.insertCustomItem(btn, i);
            this.listView.addChild(btn);
            btnControlArr.push(new gameclass.baseButtonControl(btn, ["bgNormal"], ["bgSelect"]));
        }


        this.listView.doLayout();
        this.listView.setScrollBarEnabled(false);


        this.btnGroupCtr.initData(btnControlArr);
        this.btnGroupCtr.setSelectIndex(0);
    },
    addTextToBtn: function (btn, imgUrl) {
        var sp = new cc.Sprite(imgUrl);
        sp.setAnchorPoint(cc.p(0, 0));
        btn.addChild(sp);
        sp.setPosition(cc.p((btn.getContentSize().width - sp.getContentSize().width) / 2, (btn.getContentSize().height - sp.getContentSize().height) / 2))
        return sp;
    },
    /**
     * 根据数据更新显示
     * @param data
     */
    updateData: function (data) {
        //wait handle
    },
    /**
     * 返回按钮点击事件处理
     * @param sender
     * @param type
     */
    backHandle: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;
        this.listView.removeAllChildren();
        this.game.uimgr.closeui("gameclass.goldRoomUi");
    },
    destroy: function () {
        this.clearListen();
    },

    btn_callBack: function () {
        var selectIndex = 0;
        if (this.curGameType == 2) {//卡五星
            selectIndex = 10000 + this.curTabIndex;
        } else if (this.curGameType == 65) {// 牛元帅
            selectIndex = 30000 + this.curTabIndex;
        } else if (this.curGameType == 7) {
            selectIndex = 20000 + this.curTabIndex;
        } else if (this.curGameType == gameclass.gamegoldPtj) {
            selectIndex = gameclass.gamegoldPtj + this.curTabIndex;
        }else if (this.curGameType == gameclass.gamegoldTTZ) {
            selectIndex = gameclass.gamegoldTTZ + 1;
        }else if(this.curGameType == gameclass.gamegoldPDK){
            selectIndex = gameclass.gamegoldPDK;
        }
        var info = this.roomInfodata;
        for (var i = 0; i < 6; i++) {
            var showText = ccui.helper.seekWidgetByName(this.node, "Button_" + i).getChildren()[0];
            showText.setVisible(true);
            showText.setTextColor(cc.color(0, 255, 0));
            showText.setString("流畅");
            for (var j = 0; j < info.length; j++) {
                if (info[j].gametype == selectIndex + i * 10) {
                    if (info[j].num <= 0) {
                        showText.setTextColor(cc.color(0, 255, 0));
                        showText.setString("流畅");
                    } else if (info[j].num <= 20) {
                        showText.setTextColor(cc.color(255, 255, 0));
                        showText.setString("火热");
                    } else if (info[j].num <= 50) {
                        showText.setTextColor(cc.color(255, 255, 0));
                        showText.setString("拥挤");
                    } else {
                        showText.setTextColor(cc.color(255, 0, 0));
                        showText.setString("爆满");
                    }
                    break;
                }
            }
        }
    },

    showGamePeople: function () {
        this.btn_callBack();
    }
});
/**
 * TAB按钮点击事件名
 * @type {string}
 */
gameclass.GOLD_ROOM_TABBTN_CLICK = "gameclass.GOLD_ROOM_TABBTN_CLICK";


