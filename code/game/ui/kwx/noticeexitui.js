/**
 * Created by zhuzheng on 2017/2/21.
 */
gameclass.noticeexitui = gameclass.baseui.extend({
    sprite: null,
    node:null,
    onok:null,
    ctor: function () {
        this._super();
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.NoticeExit,true);

        this.addChild(this.node);

        var _this = this;
        /*gameclass.createbtnpress(this.node, "Panel_1", function () {
            _this.game.uimgr.closeui("gameclass.msgboxui");
        });*/

        gameclass.createbtnpress(this.node, "cancel", function () {
            _this.game.uimgr.closeui("gameclass.noticeexitui");
        });

        gameclass.createbtnpress(this.node, "ok", function () {
            _this.game.uimgr.closeui("gameclass.noticeexitui");
            if (_this.onok != null){
                _this.onok();
            }
        });


    },
    setString:function(str,onok){
        this.onok = onok;

        //var msg = ccui.helper.seekWidgetByName(this.node, "msg");

        //msg.setString(str);
    }
});