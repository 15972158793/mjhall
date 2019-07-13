/**
 * Created by Administrator on 2017/7/18.
 */
/**
 * Created by Administrator on 2017/3/11 0011.
 */



gameclass.gameRule = gameclass.baseui.extend({
    mod_record:null,
    recordRoomid:null,
    index: 0,

    ctor: function () {
        this._super();
    },

    show: function () {
        this.node = this.game.uimgr.createnode(res.gameRuleJson,true);
        this.addChild(this.node);
        var _this=this;
        gameclass.createbtnpress(this.node, "closeBtn", function () {
            _this.game.uimgr.closeui("gameclass.gameRule");
        });
    },
});