/*
    Create by Geshuangqi on 20180423
* */

gameclass.mod_dxtb = gameclass.mod_base.extend({
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
                case "gamedfwinfo":
                    _this.view.updateroominfo(data.msgdata);
                    break;
                case "gamedfwend":
                    _this.view.gameOnEnd(data.msgdata);
                    break;
                case "exitroom":
                    _this.game.uimgr.closeui("gameclass.exitroom");
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                    break;
                case "gamedfwsz":
                    _this.view.startFindGold(data.msgdata);
                    break;
                case "gamedfwbet":
                    cc.log("开始：",data.msgdata);
                    _this.view.Person.index = 0;
                    _this.view.Person.setPosition(_this.view.walkPanel.getChildren()[0].getPosition());
                    _this.view.updateMyGold(data.msgdata.total);
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
        this.mywebsocket.send("gamebets",data);
    },

    sendZhi:function(){
        this.mywebsocket.send("gamezhi");
    },

});