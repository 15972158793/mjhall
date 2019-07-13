/**
 * Created by yang on 2016/11/16.
 */

gameclass.agreement = gameclass.baseui.extend({
    node:null,
    ctor: function () {
        this._super();
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.agreementjson,true);

        this.addChild(this.node);

        var _this = this;
        gameclass.createbtnpress(this.node, "close", function () {
            _this.game.uimgr.closeui("gameclass.agreement");
        });
    },
});