/**
 * Created by yang on 2016/11/11.
 */
gameclass.msgboxui = gameclass.baseui.extend({
    sprite: null,
    node:null,
    onok:null,
    ctor: function () {
        this._super();
    },
    show:function(){
    },

    init:function() {
        this.node = this.game.uimgr.createnode(res.msgbox,true,1);

        this.addChild(this.node);

        var _this = this;
        gameclass.createbtnpress(this.node, "Panel_1", function () {
            _this.game.uimgr.closeui("gameclass.msgboxui");
        });

        gameclass.createbtnpress(this.node, "cancelbtn", function () {
            _this.game.uimgr.closeui("gameclass.msgboxui");
        });

        gameclass.createbtnpress(this.node, "okbtn", function () {
            _this.game.uimgr.closeui("gameclass.msgboxui");
            if (_this.onok != null){
                _this.onok();
            }
        });
    },

    setString:function(str,onok){
        if(onok != null) {
            this.init();
            this.onok = onok;
            var msg = ccui.helper.seekWidgetByName(this.node, "msg");
            msg.setString(str);
        } else {
            this.game.uimgr.closeui("gameclass.msgboxui");
            gameclass.showText(str);
        }
    }
});