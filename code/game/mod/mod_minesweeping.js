gameclass.mod_minesweeping = gameclass.mod_base.extend({
    roominfo:null,
    mywebsocket:null,
    ongameready:null,
    ongamecompare:null,
    onupdateroominfo:null,
    serverchair:null,
    ongameview:null,
    isover:null,
    isoneover:false,
    endinfo:null,
    gamestate:0,//0：准备 1：埋雷  2：扫雷
    score:null,
    chatlst:null,
    persons:null,
    beginchair:0,
    byeData:null,
    view:null,
    ready:null,
    curUser:-1,
    ctor:function () {
        this._isThisGameOver = false;
        this.isover = false;
        this.gamestate = 0;
        this.chatlst = [];

    }
});

gameclass.mod_minesweeping.prototype.entergame = function(_roominfo,_mywebsocket) {
    this.selfuid = this.game.modmgr.mod_login.logindata.uid;
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;
    this.updateroominfo(this.roominfo);
    var _this = this;

    this.mywebsocket.setonmsgfunc(function (ws,data) {
        cc.log("saolei_msg---" + "head:" + data.msghead);
        switch (data.msghead){
            case "roominfo":
                //cc.log("roominfo");
                _this.joinRoomInfo(data.msgdata);
                break;
            case "joinroomfail":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.dissmissroom();
                _this.game.uimgr.showui("gameclass.msgboxui");
                switch (data.msgdata.result) {
                    case 1:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已解散");
                        break;
                    case 2:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已满员");
                        break;
                    default:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房间错误");
                        break;
                }
                break;
            case "exitroom":
                _this.game.uimgr.closeui("gameclass.minesweepingexit");
                if (!_this.isover){
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                }
                //_this.view.onExitroom(data.msgdata);
                //else{
                //    _this.game.uimgr.closeui("gameclass.ttzresultoneui");
                //    _this.game.uimgr.closeui("gameclass.ttzallresultui");
                //    _this.game.uimgr.showui("gameclass.ttzallresultui").setmodttz( _this.byeData);
                //}
                break;
            case "tickroom":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.backlogin();
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                break;
            case "gameready":
                cc.log("gameready");
                _this.ready(data.msgdata.uid);

                break;

            case "dissmissroom":
                _this.game.uimgr.closeui("gameclass.minesweepingexit");
                _this.game.uimgr.showui("gameclass.minesweepingexit",false,null,1);
                _this.game.uimgr.uis["gameclass.minesweepingexit"].setData(_this,data.msgdata);
                break;
            case "nodissmissroom":
                _this.game.uimgr.closeui("gameclass.minesweepingexit");
                var n = _this.game.uimgr.createnode(res.minesweepingmsg,true);
                gameclass.createbtnpress(n,"bg",function () {
                    n.removeFromParent(true);
                });
                _this.view.addChild(n);
                break;
            case "chatroom":
                _this.chatlst[_this.chatlst.length] = data.msgdata;

                if (_this.game.uimgr.uis["gameclass.chatui"])
                    _this.game.uimgr.uis["gameclass.chatui"].pushstr(data.msgdata);
                //_this.getchairbyuid(data.msgdata.uid);
                _this.view.onChat(data.msgdata);

                break;
            case "lineperson":
            //case "gameline":
                if(_this.gamestate == 1 || _this.gamestate == 2){
                    var curIndex = _this.getchairbyuid(data.msgdata.uid);
                    _this.roominfo.person[curIndex].line = false;
                    _this.view.userLineOut(curIndex,_this.roominfo.person[curIndex]);
                }
                break;
            case "gameSaoLeiinfo":
                _this.isoneover = false;
                if(data.msgdata.begin){
                    _this.gamestate = 1;
                }
                _this.updateGameInfo(data.msgdata);
                break;

            case "gameSaoLeiend":
                _this._isThisGameOver = true;
                _this.gameInfo.ready = [];
                _this.view.showOneResult(data.msgdata);
                // _this.view.scheduleOnce(function () {
                //     if(parseInt(_this.roominfo.param1 / 10) === 1){//自由埋雷
                //         _this.view.newTurn();
                //     } else {//房主埋雷
                //         _this.view.updateGameState(1);
                //     }
                //
                // },2);

                break;
            case "gamesetboom":
                _this.view.onSetBoom(data.msgdata);
                break;
            case "gamegetboom":
                _this.view.onGetBoom(data.msgdata);
                break;
            case "gameSaoLeibye":
                _this.game.uimgr.closeui("gameclass.minesweepingexit");
                _this.isover=true;
                _this.gamestate = -1;
                _this.endinfo = data.msgdata.info;
                _this.mywebsocket.onclosefunc = null;
                _this.view.onGameMineSweepingBye(data.msgdata);
                break;

            case "gameSaoLeibegin":
                _this._isThisGameOver = false;
                break;
            case "gamestartdealer":
                break;
            case "gamestatechange":
                _this.view.updateGameState(data.msgdata.gamestate,data.msgdata);
                break;
            case "gamesldealer":
                _this.view.continueMailei(data.msgdata);
                break;
            case "gameline":
                var curIndex = _this.getchairbyuid(data.msgdata.uid);
                //if(_this.gamestate == 1 || _this.gamestate == 2){
                    if(curIndex || curIndex === 0)
                        _this.view.userLineOut(curIndex,data.msgdata);
                    break;
                //}
        }
    });
};

gameclass.mod_minesweeping.prototype.ready = function(uid) {

    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i] && this.roominfo.person[i].uid == uid){
            this.gameInfo.ready.push(uid);
            this.view.showReady(i);
        }
    }
};

gameclass.mod_minesweeping.prototype.joinRoomInfo = function(data){
    this.roominfo = data;
    var info = [];
    var ready = [];
    for(var i = 0; i < data.person.length; i++){
        if(!this.gameInfo.info[i]){
            info[i] = {uid:data.person[i].uid};
            continue;
        }

        if(gameclass.contains(this.gameInfo.ready,data.person[i].uid)){
            ready.push(data.person[i].uid);
        }

        for(var j = 0; j < this.gameInfo.info.length; j++){
            if(data.person[i].uid == this.gameInfo.info[j].uid){
                info[i] = this.gameInfo.info[j];
            }
        }

    }

    this.gameInfo.ready = ready;

    this.gameInfo.info = info;

    this.view.updatePlayerinfo(false);
};

/*
 *通过ID 找到索引位置
 * */
gameclass.mod_minesweeping.prototype.getCurPlayerIndex = function(arr,uid){

    for(var x = 0;x < gameclass.minesweepingtable.MAX_PLAYER ;x++){
        if(!arr[x]){
            continue;
        }
        if(arr[x].uid == uid){
            this.curPlayerIndex = x;
            break;
        }
    }
};
/*
 * 将进房间的玩家 顺序排序
 * */
gameclass.mod_minesweeping.prototype.offsetPlayer = function(arr){
    var player = [];

    for (var x= 0;x< gameclass.minesweepingtable.MAX_PLAYER ;x++ ){
        player[(gameclass.minesweepingtable.MAX_PLAYER + x - this.curPlayerIndex) % gameclass.minesweepingtable.MAX_PLAYER ] = arr[x] ? arr[x] : null ;
    }
    return player;
};

function contains(arr,item) {
    for(var i = 0; i < arr.length; i++){
        if(arr[i] == item) return true;
    }
    return false;
}

gameclass.mod_minesweeping.prototype.updateGameInfo = function(gameInfo) {
    this.gameInfo = gameInfo;

    for(var i = 0; i < this.roominfo.person.length; i++){
        this.gameInfo.info[i] = this.gameInfo.info[i] || {uid:this.roominfo.person[i].uid};
    }

    this.view.updatePlayerinfo(true);
    this.view.setRoomInfo(this.gameInfo);

    if (this.roominfo.time != 0){
        this.game.uimgr.showui("gameclass.minesweepingexit",false,null,1);

        this.game.uimgr.uis["gameclass.minesweepingexit"].setData(this,this.roominfo);
    }
};

gameclass.mod_minesweeping.prototype.bindUI = function (ui) {
    this.view = ui;
};

gameclass.mod_minesweeping.prototype.updateroominfo = function(roominfo){
    this.roominfo = roominfo;
    this.isOwner = this.roominfo.person[0].uid === this.selfuid;
    this.isFree = parseInt(this.roominfo.param1 / 10) ? true : false;
    this.total = (this.roominfo.param1 % 10) ? 10 : 5;
    this.difen = this.roominfo.param2;

};

gameclass.mod_minesweeping.prototype.senddissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_minesweeping.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_minesweeping.prototype.gameready = function() {
    var data = {};
    this.mywebsocket.send("gameready",data);
};

gameclass.mod_minesweeping.prototype.dadi = function(baodi) {
    var type = baodi ? 2 : 1;
    var data = {"type":type};
    this.mywebsocket.send("gameplay",data);
};

gameclass.mod_minesweeping.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};

gameclass.mod_minesweeping.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};


gameclass.mod_minesweeping.prototype.getserverchair = function(cur) {
    return (this.serverchair + cur )%5;
};

gameclass.mod_minesweeping.prototype.getplayerdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair > this.roominfo.person.length) {
        return
    }

    return this.roominfo.person[serverchair];
};
gameclass.mod_minesweeping.prototype.getchairbyuid = function(uid) {
    for(var i = 0 ; i < this.roominfo.person.length; i++){
        if(this.roominfo.person[i]){
            if(this.roominfo.person[i].uid == uid){
                return i;
            }
        }
    }
    return -1;
};
gameclass.mod_minesweeping.prototype.getpersonbyuid = function(uid) {
    for(var i = 0 ; i < this.roominfo.person.length; i++){
        if(this.roominfo.person[i]){
            if(this.roominfo.person[i].uid == uid){
                return this.roominfo.person[i];
            }
        }
    }
    return null;
};

// gameclass.mod_niuniu.prototype.chat = function(type,info) {
//     var data = {"type":type,"chat":info};
//     this.mywebsocket.send("chatroom",data);
// };

gameclass.mod_minesweeping.prototype.gamesldealer = function(type) {
    var data = {"Type":type};
    this.mywebsocket.send("gamesldealer",data);
};

gameclass.mod_minesweeping.prototype.setBoom = function(pos) {
    var data = {"Pos":pos};
    this.mywebsocket.send("gamesetboom",data);
};

// gameclass.mod_minesweeping.prototype.setBoom = function(pos) {
//     var data = {"Pos":type};
//     this.mywebsocket.send("gamesetboom",data);
// };

gameclass.mod_minesweeping.prototype.getBoom = function(pos) {
    var data = {};
    this.mywebsocket.send("gamegetboom",data);
};
