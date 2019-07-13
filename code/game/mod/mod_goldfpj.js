gameclass.mod_goldfpj = gameclass.mod_base.extend({
    ctor:function () {

    },
    entergame:function(_roominfo,_ws){
        this.logindata = this.game.modmgr.mod_login.logindata;
        this.mywebsocket = _ws;
        cc.log(_roominfo);
        this.roominfo = _roominfo;

        var _this = this;
        _this.mywebsocket.setonmsgfunc(function (ws,data) {
            cc.log("RECV_DATA",data.msghead);
            cc.log("RECV_DATA",data.msgdata);
            switch (data.msghead){
                case "gamefpjinfo":
                    _this.view.updateroominfo(data.msgdata);
                    break;
                // case "gametime":
                //     _this.view._timerControl.startCount(data.msgdata.time);
                //     _this.view.getTime(data.msgdata.time);
                //     break;
                case "gamefpjbet":
                    _this.view.reflashMyMoeny(data.msgdata);
                    break;
                case "gametotal":
                    _this.view.reflashMyMoeny(data.msgdata);
                    break;
                // case "gamegoldlhdbalance":
                //     _this.view.onBalance(data.msgdata);
                //     break;
                case "gamefpjend":
                    _this.view.onEnd(data.msgdata);
                    break;
                case "gamefpjdouble":
                    _this.view.handledouble(data.msgdata);
                    break;
                case "gamefpjbegin":
                    _this.view.onGameBegin(data.msgdata);
                    break;
                case "gamefpjhuan":
                    _this.view.updateHandcard(data.msgdata);
                    break;
                // case "gamelhdseat":
                //     _this.view.onSeat(data.msgdata);
                //     break;
                // case "gamelhdgoon":
                //     _this.view.onLastBets(data.msgdata);
                //     break;
                // //上下庄
                // case "gamelhddeal":
                //     _this.view.shangxiaZhuang(data.msgdata);
                //     break;
                case "exitroom":
                    _this.game.uimgr.closeui("gameclass.exitroom");
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                    break;
                // case "tickroom":
                //     _this.mywebsocket.onclosefunc = null;
                //     _this.game.modmgr.mod_login.backlogin();
                //     _this.game.uimgr.showui("gameclass.msgboxui");
                //     _this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                //     break;
            }
        });
    },

    bindUi:function(view){
        this.view = view;
    },

    //============================给服务器发消息=======================
    // sendSeat:function(_chair){
    //     var data = {"index":_chair};
    //     this.mywebsocket.send("gamebzwseat",data);
    // },
    sendBets:function(gold){
        var data = {"bets":gold};
        this.mywebsocket.send("gamebets",data);
    },
    sendChange:function(gold,card){
        var data = {"bet":gold,"hcard":card};
        this.mywebsocket.send("gamefpjhuan",data);
    },

    //! 1-小 2-大 其他-放弃加倍
    sendDouble:function(num){
        var data = {"type":num};
        this.mywebsocket.send("gameplay",data);
    },
    // sendLastBets:function(){
    //     this.mywebsocket.send("gamebzwgoon",{});
    // },
    dissmissroom:function(num){
        var data = {type:num};
        this.mywebsocket.send("dissmissroom",data);
    },
    sendRobZhuang:function(){
        this.mywebsocket.send("gameplay",{});
    },

//============================收到服务器消息=======================
//     //有玩家坐下
//     onSeat:function(uid,chair){
//         var playerData = this.getPlayerDataById(uid);
//         this.view.onSeat(uid,playerData);
//     },
//     //更新桌面上下注信息
//     onGetAllBets:function(data){
//         this.view.updatePlayerBets(data.gold);
//     },
//     //获取上次压住信息
//     onGetXuyaInfo:function(data){
//
//     },
});
