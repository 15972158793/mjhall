/**
 * Created by yang on 2016/11/9.
 */

gameclass.baseui = cc.Layer.extend({
    sprite: null,
    game:null,
    ctor: function () {
        this._super();
    },
    setgame:function(_game){
        this.game = _game;
    },
    show: function () {

    },
    updateUIMsg:function(msgtype) {
        return false;
    },
    destroy:function () {
        // cc.log("base ui destroy..");
    },
});