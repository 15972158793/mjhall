/**
 * Created by Administrator on 2017/7/18.
 */
gameclass.clubcreate = gameclass.baseui.extend({
    node: null,
    gametypeArr: [],
    ctor: function () {
        this._super();
        this.gametypeArr = [];
    },
    control: function (node, game) {
        this.node = node;
        this.game = game;
        this._noticeTxt = ccui.helper.seekWidgetByName(this.node, "noteTxt");
        this._nameTxt = ccui.helper.seekWidgetByName(this.node, "nameTxt");
        var _this = this;
        gameclass.createbtnpress(_this.node, "okBtn", function () {
            var nameStr = _this._nameTxt.getString();
            if (nameStr == "") {
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("请输入俱乐部名称!");
                return
            }
            _this.game.modmgr.mod_center.mod_club.sendclubcreate(nameStr, _this.gametypeArr, _this._setBtnControl._selectIndex, _this._headBtnControl._selectIndex, _this._noticeTxt.getString())
        });
        this._setBtnControl = new gameclass.buttonGroupControl();
        this._setBtnControl.createStand(ccui.helper.seekWidgetByName(_this.node, "cardSetBtnContain"), 2);
        this._setBtnControl.setSelectIndex(0);
        this._headBtnControl = new gameclass.buttonGroupControl();
        this._headBtnControl.createStand(ccui.helper.seekWidgetByName(_this.node, "headBtnContain"), 4);
        this._headBtnControl.setSelectIndex(0)
    },
    show: function () {

    },
    destroy:function () {
        this._setBtnControl.destroy();
        this._headBtnControl.destroy();
    },
});
