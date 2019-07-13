/**
 * Created by Administrator on 2017-11-9.
 */


gameclass.zhaomu = gameclass.baseui.extend({
    node:null,

    ctor: function () {
        this._super();
    },
    show:function() {
        var _this = this;
        this.node = this.game.uimgr.createnode(res.zhaomu, true);

        this.addChild(this.node);

        var _root = ccui.helper.seekWidgetByName(this.node,"Panel_1");
        _root.addTouchEventListener(function(){
            _this.game.uimgr.closeui("gameclass.zhaomu");
        });
    },
});
