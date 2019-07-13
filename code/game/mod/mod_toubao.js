gameclass.mod_toubao = gameclass.mod_base.extend({
    ctor:function () {

    },

    entergame:function(_roominfo,_ws){
        this.logindata = this.game.modmgr.mod_login.logindata;
        this.mywebsocket = _ws;
        cc.log(_roominfo);
        this.roominfo = _roominfo;

        var _this = this;
        _this.mywebsocket.setonmsgfunc(function (ws,data) {
            cc.log("LVXIN_DATA",data);
            switch (data.msghead){
                case "gamegoldtbinfo":
                    _this.view.updateroominfo(data.msgdata);
                    break;
                case "gametime":
                    //_this.view._timerControl.startCount(data.msgdata.time);
                    _this.view.getTime(data.msgdata.time);
                    break;
                case "gamegoldtbbets":
                    _this.view.onPlayerBet(data.msgdata);
                    break;
                case "gamegoldtotal":
                    _this.view.reflashPlayerMoney(data.msgdata);
                    break;
                case "gamegoldtbbalance":
                    _this.view.onBalance(data.msgdata);
                    break;
                case "gamegoldtbend":
                    _this.view.onEnd(data.msgdata);
                    break;
                case "gamerob":
                    _this.view.getZhuanginfo(data.msgdata);
                    break;
                case "gamegoldtbseat":
                    _this.view.onSeat(data.msgdata);
                    break;
                case "gamegoldtbkill":
                    cc.log("杀返回的消息 = ",data.msgdata);
                    _this.view.killseat(data.msgdata);
                    break;
                case "gamegoldtbgoon":
                    _this.view.onLastBets(data.msgdata);
                    break;
                //上下庄
                case "gamegoldtbdeal":
                    _this.view.shangxiaZhuang(data.msgdata);
                    break;
                case "gametbdeal":
                    _this.view.shangxiaZhuang(data.msgdata);
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
                case "chatroom":
                    _this.view.onchat( data.msgdata);
                    break;
                case "gameplayerlist":
                    _this.view.getplayerListData(data.msgdata);
                    break;
                case "lineperson":
                    if(_this.gamestate == 1){
                        var curIndex = _this.getPlayerIndexById(data.msgdata.uid);
                        _this.view.userLineOut(curIndex,_this.persons[curIndex]);
                    }
                    break;
            }
        });

    },

    bindUi:function(view){
        this.view = view;
    },

    //============================给服务器发消息=======================
    sendSeat:function(_chair){
        var data = {"index":_chair};
        this.mywebsocket.send("gamebzwseat",data);
    },
    sendKill:function(_killindex){
        var data = {"index":_killindex};
        this.mywebsocket.send("gametbkill",data);
    },
    sendBets:function(_pos,_gold){
        //cc.log(_pos);
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
    sendRobZhuang:function(){
        this.mywebsocket.send("gamerob",{});
    },
    sendWuzuo:function(){
        this.mywebsocket.send("gameplayerlist",{});
    },
    chat:function(type,info) {
        var data = {"type":type,"chat":info};
        this.mywebsocket.send("chatroom",data);
    },
    sendDownDeal:function(){
        this.mywebsocket.send("gameredeal",{});
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

