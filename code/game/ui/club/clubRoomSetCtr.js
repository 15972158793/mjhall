/**
 * 开设包房
 * @type {Function}
 */
gameclass.clubRoomSetCtr = cc.Class.extend({
    _btnContain: null,
    _roomContain: null,
    _roomItemCtrArr: null,
    game: null,
    _clubData: null,
    _ismanager:false,
    ctor: function (panel, $game) {
        this.game = $game;
        this._btnContain = ccui.helper.seekWidgetByName(panel, "btnContain");
        this._roomContain = ccui.helper.seekWidgetByName(panel, "roomContain");

        this._roomItemCtrArr = [];
        var roomItem;
        var btn;
        for (var i = 0; i < this._roomContain.getChildrenCount(); i++) {
            roomItem = this._roomContain.getChildren()[i];
            roomItem.setVisible(false);
            this._roomItemCtrArr.push(new gameclass.clubRoomSetItemCtr(roomItem, this.game, i));

            btn = this._btnContain.getChildren()[i];
            btn.index = i;
            btn.addTouchEventListener(function (sender, type) {
                if(type != ccui.Widget.TOUCH_ENDED)return;
                // this.game.uimgr.uis["gameclass.hallui"].setLocalZOrder(4);
                if(this._ismanager){
                    this.game.uimgr.showui("gameclass.hallui").setclubid(this._clubData.id, sender.index);
                }else{
                    gameclass.showText("你没有权限");
                }
            }, this);
        }
    },
    updateView: function (clubData, ismanager) {
        this._clubData = clubData;
        this._ismanager = ismanager;
        var gameLen = this._clubData.game.length;
        var roomItem;
        for (var i = 0; i < this._btnContain.getChildrenCount(); i++) {
            if (i < gameLen && this._clubData.game[i] != null && this._clubData.game[i].gametype > 0) {
                this._btnContain.getChildren()[i].setVisible(false);
                roomItem = this._roomContain.getChildren()[i];
                roomItem.setVisible(true);
                this._roomItemCtrArr[i].updateView(this._clubData, this._ismanager);
            } else {
                this._btnContain.getChildren()[i].setVisible(true);
                this._roomContain.getChildren()[i].setVisible(false);
            }
        }
    },
    destroy: function () {
        this._roomItemCtrArr = [];
    },
});