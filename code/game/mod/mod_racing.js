gameclass.mod_racing = gameclass.mod_base.extend({
    ctor:function () {

    },
    entergame:function(_roominfo,_ws){
        this.logindata = this.game.modmgr.mod_login.logindata;
        this.mywebsocket = _ws;
        cc.log(_roominfo);
        this.roominfo = _roominfo;

        var _this = this;
        _this.mywebsocket.setonmsgfunc(function (ws,data) {
            cc.log("RECV_DATA",data);
            switch (data.msghead){
                case "gamegoldsaimainfo":
                    _this.view.updateroominfo(data.msgdata);
                    break;
                case "gametime":
                    _this.view._timerControl.startCount(data.msgdata.time);
                    _this.view.getTime(data.msgdata.time);
                    break;
                case "gamegoldsaimabets":
                    _this.view.onPlayerBet(data.msgdata);
                    break;
                case "gamegoldtotal":
                    _this.view.reflashPlayerMoney(data.msgdata);
                    break;
                //case "gamegoldlhdbalance":
                //    _this.view.onBalance(data.msgdata);
                //    break;
                case "gamegoldsaimaend":
                    _this.view.onEnd(data.msgdata);
                    break;
                case "gamegoldsaimagoon":
                    _this.view.onLastBets(data.msgdata);
                    break;
                case "exitroom":
                    _this.game.uimgr.closeui("gameclass.exitroom");
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                    break;
                case "tickroom":
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.backlogin();
                    _this.game.uimgr.showui("gameclass.msgboxui");
                    _this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                    break;
                case "gameplayerlist":
                    _this.view.getplayerListData(data.msgdata);
                    break;
                //case "lineperson":
                //    if(_this.gamestate == 1){
                //        var curIndex = _this.getPlayerIndexById(data.msgdata.uid);
                //        _this.view.userLineOut(curIndex,_this.persons[curIndex]);
                //    }
            }
        });
    },

    bindUi:function(view){
        this.view = view;
    },

    //============================给服务器发消息=======================
    sendBets:function(_pos,_gold){
        var data = {"index":_pos,"gold":_gold}
        this.mywebsocket.send("gamebzwbets",data);
    },
    sendLastBets:function(){
        this.mywebsocket.send("gamebzwgoon",{});
    },
    dissmissroom:function(num){
        var data = {type:num};
        this.mywebsocket.send("dissmissroom",data);
    },
    sendWuzuo:function(){
        this.mywebsocket.send("gameplayerlist",{});
    },
    sendPlayerRecord:function(){
        this.mywebsocket.send("gamehistory",{});
    },
    sendRankLisk:function(){
        this.mywebsocket.send("gamerating",{});
    },
//============================收到服务器消息=======================
    //有玩家坐下
    onSeat:function(uid,chair){
        var playerData = this.getPlayerDataById(uid);
        this.view.onSeat(uid,playerData);
    },
    //更新桌面上下注信息
    onGetAllBets:function(data){
        this.view.updatePlayerBets(data.gold);
    },
    //获取上次压住信息
    onGetXuyaInfo:function(data){

    },
});
