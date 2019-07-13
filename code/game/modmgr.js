/**
 * Created by yang on 2016/11/9.
 */


gameclass.modmgr  = cc.Class.extend({
    data:null,
    game:null,
    ctor:function () {

    },
    setgame:function(_game){
        this.game = _game;

        this.mod_login = new gameclass.mod_login;
        this.mod_login.setgame(_game);

        this.mod_center = new gameclass.mod_center;
        this.mod_center.setgame(_game);

        this.mod_userbase = new gameclass.mod_userbase;
        this.mod_userbase.setgame(_game);
    }
});
