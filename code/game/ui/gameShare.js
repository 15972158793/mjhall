/**
 * Created by Administrator on 2017/7/18.
 */
gameclass.gameShare = gameclass.baseui.extend({
    mod_record:null,
    recordRoomid:null,
    index: 0,

    ctor: function () {
        this._super();
    },

    show: function () {
        this.node = this.game.uimgr.createnode(res.gameShareJson,true,1);
        this.addChild(this.node);
        var _this=this;
        gameclass.createbtnpress(this.node, "closeBtn", function () {
            _this.game.uimgr.closeui("gameclass.gameShare");
        });
        gameclass.createbtnpress(this.node, "wxShareBtn", function () {
            gameclass.mod_platform.invitefriend("", "http://120.24.215.214/down/", "傲世娱乐，最好玩的棋牌游戏平台，快一起来玩吧！");
        });
        gameclass.createbtnpress(this.node, "pyqShareBtn", function () {
            gameclass.mod_platform.invitefriendSpoons("", "http://120.24.215.214/down/", "傲世娱乐，最好玩的棋牌游戏平台，快一起来玩吧！");
        });
    },
});
