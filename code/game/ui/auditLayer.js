/**
 * Created by Administrator on 2017-9-23.
 */



gameclass.auditLayer = gameclass.baseui.extend({
    ctor:function(){
        this._super();
    },

    show:function(){
        this.node = this.game.uimgr.createnode(res.auditLayer,true,1);
        this.addChild(this.node);

        var _this = this;
        gameclass.createbtnpress(this.node, "backBtn", function () {
            _this.game.uimgr.closeui("gameclass.auditLayer");
        });

        gameclass.createbtnpress(this.node, "buybtn", function () {
            cc.log("1111");
            gameclass.mod_platform.buy();
        });
    },
})