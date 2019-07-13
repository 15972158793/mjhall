/*
    Create by Geshuangqi on 20180423
* */

gameclass.mod_dragon = gameclass.mod_base.extend({
    ctor:function () {

    },

    entergame:function(_roominfo,_ws){
        this.logindata = this.game.modmgr.mod_login.logindata;
        this.mywebsocket = _ws;
        this.roominfo = _roominfo;

        var _this = this;
        _this.mywebsocket.setonmsgfunc(function (ws,data) {
            //cc.log("LVXIN_DATA",data);
            switch (data.msghead){
                case "gamelzdbinfo":
                    _this.view.updateroominfo(data.msgdata);
                    break;
                case "gamelzdbend":
                    _this.view.gameOnEnd(data.msgdata);
                    break;
                case "exitroom":
                    _this.game.uimgr.closeui("gameclass.exitroom");
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                    break;
            }
        });

    },


    bindUi:function(view){
        this.view = view;
    },

    //============================给服务器发消息=======================
    dissmissroom:function(num){
        var data = {type:num};
        this.mywebsocket.send("dissmissroom",data);
    },

    sendStart:function(gold){
        var data = {"bets":gold}
        this.mywebsocket.send("lzdbstart",data);
    },


});