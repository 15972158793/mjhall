gameclass.wzqJoinRoomUi = gameclass.baseui.extend({
    _node:null,
    _setControl:null,
    ator:function () {
        this._super();
    },
    show:function () {
        this.init();
        this.initView();
        this.initListen();
        this.initialize();
    },
    init:function () {
        this._node = this.game.uimgr.createnode(res.wzqJoinRoomUi, true);
    },
    initView:function () {
        this.addChild(this._node);
    },
    sethideokBtn:function(){
        cc.log("33333333333333333333333333",res.baofangszptitle)
        ccui.helper.seekWidgetByName(this._node, "okBtn").setVisible(false);
        ccui.helper.seekWidgetByName(this._node, "Image_1").setVisible(false);
        ccui.helper.seekWidgetByName(this._node, "titleImg").loadTexture(res.baofangdstitlenys);
    },
    sethideokBtnds:function(){
        cc.log("1222222222222222222222222221",res.baofangdstitle)
        ccui.helper.seekWidgetByName(this._node, "okBtn").setVisible(false);
        ccui.helper.seekWidgetByName(this._node, "Image_1").setVisible(false);
        ccui.helper.seekWidgetByName(this._node, "titleImg").loadTexture(res.baofangdstitle);
        ccui.helper.seekWidgetByName(this._node, "titleImg").ignoreContentAdaptWithSize(true);
    },
    sethideokBtnnys:function(){
        cc.log("11111111111111111111111111111111111111111111111",res.baofangdstitlenys)
        ccui.helper.seekWidgetByName(this._node, "okBtn").setVisible(false);
        ccui.helper.seekWidgetByName(this._node, "Image_1").setVisible(false);
        ccui.helper.seekWidgetByName(this._node, "titleImg").loadTexture(res.baofangdstitlenys);
        ccui.helper.seekWidgetByName(this._node, "titleImg").ignoreContentAdaptWithSize(true);
    },
    initListen:function () {
        cc.eventManager.addCustomListener(gameclass.WZQ_JOIN_ROOM_CLOSE, this.closeHandle.bind(this));
        cc.eventManager.addCustomListener(gameclass.WZQ_CREAT_ROOM, this.createHandle.bind(this));
        cc.eventManager.addCustomListener(gameclass.WZQ_JOIN_ROOM, this.joinHandle.bind(this));
    },
    initialize:function () {
        this._setControl = new gameclass.numSetControl(this._node, true, 6);
        this._setControl._EVENT_FULL = gameclass.WZQ_JOIN_ROOM;
        this._setControl._EVENT_OK = gameclass.WZQ_CREAT_ROOM;
        this._setControl._EVENT_CLOSE = gameclass.WZQ_JOIN_ROOM_CLOSE;
    },
    createHandle: function (event) {
        this.game.modmgr.mod_login.createroom(gameclass.gamewzq, 1, 0, 0);
    },
    joinHandle: function (event) {
        this._setControl.resetNumber();
        this.game.modmgr.mod_login.joinwithroomid(event.getUserData().number);
    },
    closeHandle: function () {
        this.game.uimgr.closeui("gameclass.jionroomui");
    },
    destroy: function () {
        // cc.log("wzqJoinRoomUi destroy...");

        cc.eventManager.removeCustomListeners(gameclass.WZQ_JOIN_ROOM_CLOSE);
        cc.eventManager.removeCustomListeners(gameclass.WZQ_CREAT_ROOM);
        cc.eventManager.removeCustomListeners(gameclass.WZQ_JOIN_ROOM);
    }
});
/**
 * 关闭面板事件名
 * @type {string}
 */
gameclass.WZQ_JOIN_ROOM_CLOSE = "gameclass.WZQ_JOIN_ROOM_CLOSE";
/**
 * 创建房间事件名
 * @type {string}
 */
gameclass.WZQ_CREAT_ROOM = "gameclass.WZQ_CREAT_ROOM";
/**
 * 加入房间事件名
 * @type {string}
 */
gameclass.WZQ_JOIN_ROOM = "gameclass.WZQ_JOIN_ROOM";