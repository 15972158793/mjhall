/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_goldWzq = gameclass.mod_base.extend({
    roominfo: null,
    mywebsocket: null,
    ongameready: null,
    ongamebets: null,
    ongamecompare: null,
    onupdateroominfo: null,
    serverchair: null,
    selfdata: null,
    ongameview: null,
    isover: null,
    isend: false,
    endinfo: null,
    gamestate: null,
    score: null,
    ongamedealer: null,
    chatlst: null,
    //操作用户索引
    turnIndex:-1,
    ctor: function () {
        this.isover = false;
        this.isend = false;
        this.gamestate = 0;
        this.chatlst = [];
    }
});

gameclass.mod_goldWzq.prototype.onroominfo = function (_roominfo, _mywebsocket) {


};
gameclass.mod_goldWzq.prototype.entergame = function (_roominfo, _mywebsocket) {
    //{\"roomid\":351846,\"person\":[{\"openid\":\"59ef6e332117175342041f0e5e90dace\",\"name\":\"游客\",\"imgurl\":\"\",\
    // "ip\":\"221.234.240.2\",\"line\":true}],\"time\":0,\"agree\":[]}"}
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;
    this.updateroominfo(this.roominfo);
    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws, data) {
        cc.log("getMsg-----wzq----->" + data.msghead + "||data=" + JSON.stringify(data.msgdata));
        switch (data.msghead) {
            case "roominfo":
                // _this.updateroominfo(data.msgdata);
                //_this.onupdateroominfo(data.msgdata);

                _this.joinRoomInfo(data.msgdata.person);
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
                _this.game.uimgr.closeui("gameclass.exitroom");
                if (!_this.isover) {
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                }
                break;
            case "tickroom":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.backlogin();
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                break;
            case "gameready":
                // cc.log("gameready");
                _this.ready(data.msgdata.uid);
                // _this.ongameready(data);
                break;
            case "gamewzqinfo":
                _this.updateGameInfo(data.msgdata);
                break;
            case "gamewzqbegin":
                _this.view.chessControl.initRoad();
                _this.joinRoomInfo(_this.persons);
                _this.updateGameInfo(data.msgdata);
                break;
            case "gamewzqend":
                _this.gameEndHandle(data.msgdata)
                break;
            case "gamewzqstep":
                _this.pushRespons(data.msgdata);
                break;
            case "gamebets":

                // cc.log("gamebets");
                //cc.log(data.msgdata);
                // _this.view.showBetImg(_this.getPlayerIndexById(data.msgdata.uid), data.msgdata.bets, data.msgdata.card);
                _this.view.updateScore(data.msgdata.bets);
                break;
            case "dissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.exitroom", false);
                _this.game.uimgr.uis["gameclass.exitroom"].setData(_this, data.msgdata);
                break;
            case "nodissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("有人不同意解散房间");
                break;
            case "chatroom":
                _this.chatlst[_this.chatlst.length] = data.msgdata;

                if (_this.game.uimgr.uis["gameclass.chatui"])
                    _this.game.uimgr.uis["gameclass.chatui"].pushstr(data.msgdata);
                _this.getPlayerIndexById(data.msgdata.uid);
                _this.view.onChat(_this.getPlayerIndexById(data.msgdata.uid), data.msgdata);

                break;
            case "lineperson":
                //cc.log("lineperson[][][][]==>");
                //cc.log(data.msgdata);
                var index = _this.getPlayerIndexById(data.msgdata.uid);

                if (index || index === 0) { //开始后掉线
                    _this.view.userLineOut(index, _this.persons[index]);
                }

                //cc.log(_this.roominfo);

                break;
        }
    });
};
/*
 * gametenhalfbegin data
 * */

gameclass.mod_goldWzq.prototype.gameBegin = function (data) {

    if (!data.begin) {
        return false;
    }
    //cc.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk" , this.isReady);
    this.gameStart = this.isReady = true;

    this.roominfo.step += 1;
    this.curPlayerUid = data.curstep;
    this.view.setCurPlayer(this.getPlayerIndexById(data.curstep));
    var playerInfo = this.offsetPlayer(data.info);
    this.bankerUid = 0;
    for (var i = 0; i < playerInfo.length; i++) {
        if (playerInfo[i] && playerInfo[i].dealer) {
            this.bankerUid = playerInfo[i].uid;
        }
    }

    this.view.gameReady(playerInfo, this.roominfo);
    //this.banker =
}


/*
 * 发送玩家选择的倍数
 * */
gameclass.mod_goldWzq.prototype.setPlayerBet = function (bet) {
    var data = {
        uid: this.curPlayerUid,
        bets: bet,
    };
    this.mywebsocket.send("gamebets", data);
}

/*
 * 发送玩家是否选择要牌
 * */
gameclass.mod_goldWzq.prototype.askCards = function (bAsk) {

    var data = {
        type: bAsk ? 0 : 1
    };
    this.mywebsocket.send("gameplay", data);
}


gameclass.mod_goldWzq.prototype.getPlayerIndexById = function (uid) {
    for (var i = 0; i < this.persons.length; i++) {
        if (this.persons[i] && this.persons[i].uid == uid) {
            return this.getUserViewIndex(i);
            // return i;
        }
    }
}


gameclass.mod_goldWzq.prototype.bindUI = function (ui) {
    this.view = ui;
}

gameclass.mod_goldWzq.prototype.joinRoomInfo = function (data) {
    this.roominfo.person = data;
    this.getCurPlayerIndex(data, this.game.modmgr.mod_login.logindata.uid);
    // data = this.offsetPlayer(data);
    this.view.checkSafe(this.roominfo.person);
    this.persons = data;

    this.view.updatePlayerinfo(this.persons);
};

gameclass.mod_goldWzq.prototype.isEnd = function () {
    return this.roominfo.step >= this.roominfo.maxStep;
}

gameclass.mod_goldWzq.bombComputer = function (cards) {

    var point = 0;
    for (var i = 0; i < cards.length; i++) {
        var temp = parseInt(cards[i] / 10);
        temp = temp > 10 ? 0.5 : temp;
        point += temp;
    }
    var type = 0;  // 0 :爆牌  1：高牌   2：十点半  3: 五小  4：花五小  5：天王
    if (point >= 11) {
        type = 0;
        ;
    } else if (point <= 10 && cards.length < 5) {
        type = 1;
    } else if (point > 10 && cards.length < 5) {
        type = 2;
    } else if (point >= 3 && point <= 10 && cards.length == 5) {
        type = 3;
    } else if (point < 3 && cards.length == 5) {
        type = 4;
    } else if (point > 10 && cards.length == 5) {
        type = 5;
    }
    return type;
}

/*
 *通过ID 找到索引位置
 * */
gameclass.mod_goldWzq.prototype.getCurPlayerIndex = function (arr, uid) {

    for (var x = 0; x < gameclass.mod_goldWzq.USER_NUM; x++) {
        if (!arr[x]) {
            continue;
        }
        if (arr[x].uid == uid) {
            this.curPlayerIndex = x;
            break;
        }
    }
    return this.curPlayerIndex;
}

/*
 * 将进房间的玩家 顺序排序
 * */
gameclass.mod_goldWzq.prototype.offsetPlayer = function (arr) {
    // var player = [];
    // var tmp = 0;
    // for (var x = 0; x < gameclass.mod_goldWzq.USER_NUM; x++) {
    //     tmp = (gameclass.mod_goldWzq.USER_NUM + x - this.curPlayerIndex) % gameclass.mod_goldWzq.USER_NUM;
    //     cc.log("i:" + x + ",tmp=====" + tmp);
    //     player[tmp] = arr[x] ? arr[x] : null;
    // }
    // return player;
    return arr;
}
/**
 * 根据服务器索引获取视图用户索引
 * @param serverIndex
 * @return {number}
 */
gameclass.mod_goldWzq.prototype.getUserViewIndex = function(serverIndex){
    return (gameclass.mod_goldWzq.USER_NUM + serverIndex - this.curPlayerIndex) % gameclass.mod_goldWzq.USER_NUM;
};

gameclass.mod_goldWzq.prototype.nextTurn = function(){
    this.turnIndex ++;
    if(this.turnIndex >= this.roominfo.person.length){
        this.turnIndex = 0;
    }
    this.view.updateTurn(this.turnIndex, this.gameInfo.begin);
};

gameclass.mod_goldWzq.prototype.gameEndHandle = function (data) {
    this.gameInfo.begin = false;

    var len = this.roominfo.person.length;
    for(var  i = 0;i<len;i++){
        var person = this.roominfo.person[i];
        if(person.uid == data.winer){
            person.param = person.param + data.gold;
        }else{
            person.param = person.param - data.gold;
        }
    }
    this.view.updatePlayerinfo(this.roominfo.person);
    this.view.gameEnd(data);

}
gameclass.mod_goldWzq.prototype.updateGameInfo = function (gameInfo) {
    this.gameInfo = gameInfo;
    var _this = this;
    // this.view.checkSafe(this.roominfo.person);
    // if (this.gameInfo.ready.length > 0) {
    //     cc.each(this.gameInfo.ready, function (o) {
    //         var index = _this.getPlayerIndexById(o);
    //         if (_this.persons[index]) {
    //             _this.persons[index].ready = true;
    //         }
    //
    //     });
    // } else {
    //     for (var i = 0; i < this.persons.length; i++) {
    //         if (this.persons[i]) {
    //             this.persons[i].ready = false;
    //         }
    //     }
    // }
    this.view.updatePlayerinfo(this.persons);
    this.view.updateGameInfo(gameInfo);



    var len = this.roominfo.person.length;
    for(var i = 0;i<len;i++){
        var person = this.roominfo.person[i];
        if(person.uid == gameInfo.curstep){
            this.turnIndex = i;
            break;
        }
    }
    this.view.updateTurn(this.turnIndex, this.gameInfo.begin);

};
gameclass.mod_goldWzq.prototype.updateroominfo = function (roominfo) {
    this.roominfo = roominfo;
    // this.roominfo = {
    //     agree:roominfo.agree,
    //     maxStep:roominfo.maxstep,
    //     bankerType:parseInt(roominfo.param1/100),           //房主庄或赢家庄
    //     mulripleType:parseInt((roominfo.param1/10)%10),
    //     betType:parseInt(roominfo.param1%10),               //十点半x2或十点半x3
    //     roomid:roominfo.roomid,
    //     step:roominfo.step,
    //     time:roominfo.time,
    //     type:roominfo.type,
    //     person:roominfo.person
    // };

    //cc.log(this.roominfo);

    this.persons = roominfo.person;
    this.getCurPlayerIndex(this.persons, this.game.modmgr.mod_login.logindata.uid);
    // this.persons = this.offsetPlayer(this.persons);
    if (this.roominfo.time != 0) {
        this.game.uimgr.showui("gameclass.exitroom", false);
        this.game.uimgr.uis["gameclass.exitroom"].setData(this, this.roominfo);
    }
};
gameclass.mod_goldWzq.prototype.reconnection = function () {

    if (this.gameInfo.begin) {
        for (var i = 0; i < this.persons.length; i++) {
            if (this.persons[i]) {
                this.persons[i].ready = false;
            }
        }
        this.roominfo.step--;
        this.gameBegin(this.gameInfo);
    } else {
        var playerInfo = this.offsetPlayer(this.gameInfo.info);
        this.bankerUid = 0;
        for (var i = 0; i < playerInfo.length; i++) {
            if (playerInfo[i] && playerInfo[i].dealer) {
                this.bankerUid = playerInfo[i].uid;
            }
        }
        this.view.reconnection(playerInfo, this.roominfo, this.persons);
    }


};


gameclass.mod_goldWzq.prototype.ready = function (uid) {

};

gameclass.mod_goldWzq.prototype.rob = function (uid, ok) {
    for (var i = 0; i < this.roominfo.person.length; i++) {
        if (this.roominfo.person[i].uid == uid) {
            if (ok)
                this.roominfo.person[i].rob = 1;
            else
                this.roominfo.person[i].rob = 2;
        }
    }
};

 gameclass.mod_goldWzq.prototype.dissmissroom = function () {
     this.mywebsocket.send("dissmissroom", {});
 };

gameclass.mod_goldWzq.prototype.requestGiveup = function () {
    this.mywebsocket.send("gamelose", {});
};
gameclass.mod_goldWzq.prototype.requestStart = function () {
    this.mywebsocket.send("gamebegin", {});
};
/**
 * 请求设置学费
 * @param number
 */
gameclass.mod_goldWzq.prototype.requestSetScore = function (number) {
    this.mywebsocket.send("gamebets", {bets:number});
};
/**
 * 请求落子
 * @param horIndex
 * @param verIndex
 */
gameclass.mod_goldWzq.prototype.requestPushChess = function (horIndex, verIndex) {
    var data = {w:horIndex, h:verIndex};
    this.mywebsocket.send("gamewzqstep", data);
};
/**
 * 落子回复
 * @param data
 */
gameclass.mod_goldWzq.prototype.pushRespons = function(data){
    this.view.chessControl.updateRoad(data);

    this.nextTurn();
};
gameclass.mod_goldWzq.prototype.gameready = function () {
    var data = {};
    this.mywebsocket.send("gameready", data);
};


gameclass.mod_goldWzq.prototype.gamebets = function (num) {


    var data = {"bets": Number(num)};
    this.mywebsocket.send("gamebets", data);
};

gameclass.mod_goldWzq.prototype.gamecompare = function (index) {

    playerdata = this.getplayerdata(index)
    if (index > 0 && playerdata != null) {
        var destuid = playerdata.uid;
        var data = {"destuid": Number(destuid)};
        this.mywebsocket.send("gamecompare", data);
    }

};

gameclass.mod_goldWzq.prototype.gameview = function () {
    var data = {};
    this.mywebsocket.send("gameview", data);
};

gameclass.mod_goldWzq.prototype.gameend = function () {
    var data = {};
    this.mywebsocket.send("gameend", data);
};

gameclass.mod_goldWzq.prototype.nodissmissroom = function () {
    var data = {};
    this.mywebsocket.send("nodissmissroom", data);
};

gameclass.mod_goldWzq.prototype.gamedeal = function (b) {
    var data = {"ok": b};
    this.mywebsocket.send("gamedeal", data);
};

gameclass.mod_goldWzq.prototype.chat = function (type, info) {
    var data = {"type": type, "chat": info};
    this.mywebsocket.send("chatroom", data);
};


gameclass.mod_goldWzq.prototype.getserverchair = function (cur) {
    return (this.serverchair + cur ) % gameclass.mod_goldWzq.USER_NUM;
};


gameclass.mod_goldWzq.prototype.getplayerdata = function (cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair > this.roominfo.person.length) {
        return
    }

    return this.roominfo.person[serverchair];
};

gameclass.mod_goldWzq.prototype.getplayerdatabyuid = function (uid) {

    for (var i = 0; i < this.roominfo.person.length; i++) {
        if (this.roominfo.person[i].uid == uid) {
            return this.roominfo.person[i];
        }
    }
};
//游戏人数
gameclass.mod_goldWzq.USER_NUM = 2;
gameclass.mod_goldWzq.GAME_INVALID = "本场对局无效";




