gameclass.mod_goldttz = gameclass.mod_base.extend({
    roominfo:null,
    mywebsocket:null,
    ongameready:null,
    ongamebets:null,
    ongamecompare:null,
    onupdateroominfo:null,
    serverchair:null,
    selfdata:null,
    ongameview:null,
    isover:null,
    isoneover:false,
    endinfo:null,
    gamestate:0,
    score:null,
    chatlst:null,
    persons:null,
    beginchair:0,
    isviewer:false,
    ctor:function () {
        this.isover = false;
        this.gamestate = 0;
        this.chatlst = [];
    }
});

gameclass.mod_goldttz.prototype.entergame = function(_roominfo,_mywebsocket){

    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;
    this.updateroominfo(this.roominfo);
    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws,data) {
        cc.log(data.msghead);
        cc.log(data.msgdata);
        switch (data.msghead){
            case "roominfo":
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
                _this.game.uimgr.closeui("gameclass.exitroom");
                if (!_this.isover){
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                }
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
                // _this.ongameready(data);

                break;
            case "dissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.exitroom",false);
                _this.game.uimgr.uis["gameclass.exitroom"].setData(_this,data.msgdata);
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
                //_this.getchairbyuid(data.msgdata.uid);
                _this.view.onChat(_this.getchairbyuid(data.msgdata.uid),data.msgdata);

                break;
            case "lineperson":
                //if(_this.gamestate == 1){
                //    var curIndex = _this.getchairbyuid(data.msgdata.uid);
                //    _this.view.userLineOut(curIndex,_this.persons[curIndex]);
                //}
                break;
            case "gametime":
                _this.view.setshowdaojishi(data.msgdata.time);
                break;
            case "roomseat":
                //cc.log("roomseat",data.msgdata);
                _this.updateGameInfo(data.msgdata.person);
                break;
            case "gamegoldttzinfo":
                _this.reroominfo = data.msgdata;
                if(data.msgdata.begin) {
                    _this.beginchair = 2;
                    _this.updateViewerInfo(data.msgdata.info);
                    _this.view.updatePlayerinfo(true);
                    _this.view.showtouzi(data.msgdata,false);
                }else{
                    if(data.msgdata.info){
                        for(var i = 0 ;i < data.msgdata.info.length; i++){
                            if(data.msgdata.info[i].ready && data.msgdata.info[i].uid == _this.game.modmgr.mod_login.logindata.uid){
                                _this.ready(data.msgdata.info[i].uid);
                            }
                        }
                    }
                    _this.view.updatePlayerinfo(true);
                    if(data.msgdata.card && data.msgdata.card.length == 10)
                        _this.view.showtouzi(data.msgdata,false);
                }
                _this.isoneover = false;
                _this.gamestate = data.msgdata.state;
                if(data.msgdata.time)
                    _this.view.setshowdaojishi(data.msgdata.time);
                break;
            case "gameready":

                break;
            case "gamegoldttzbegin":
                //if(data.msgdata.begin)
                _this.gamestate = 1;
                _this.beginchair = _this.getchairbyuid(data.msgdata.info[0].uid);
                _this.view.showtouzi(data.msgdata,true);
                //_this.view.dealCard(data.msgdata);
                _this.view.safeLayer.btn_safe.setVisible(false);
                //_this.isoneover = false;
                break;
            case "gamedeal":
                //_this.rob(data.msgdata.uid,data.msgdata.score);
                _this.view.robzhuang(data.msgdata.uid,data.msgdata.score);
                break;
            case "gamedealer":
                //_this.rob(data.msgdata.uid,data.msgdata.score);
                _this.gamestate = 2;
                _this.view.robzhuangsus(data.msgdata);
                break;
            case "gamegoldttzcard":
                _this.gamestate = 3;
                _this.view.showmycard(data.msgdata);
                break;
            case "gamebets":
                _this.view.showgamebets(data.msgdata);
                break;
            case "gameview":
                _this.view.findAllcards(data.msgdata,true);
                break;
            case "gamegoldttzend":
                _this.isoneover = true;
                _this.gamestate = 0;
                _this.view.resultOnend(data.msgdata);
                break;
            case "gamegoldtotal":
                _this.view.refreshgold(data.msgdata);
                break;
            case "gameline":
                cc.log("gameline")
                var curIndex = _this.getchairbyuid(data.msgdata.uid);
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
        }
    });
};

gameclass.mod_goldttz.prototype.bindUI = function(ui) {
    this.view = ui;
}

gameclass.mod_goldttz.prototype.updateViewerInfo = function(personinfo) {
    var myselfinfo = this.game.modmgr.mod_login.logindata;
    this.isviewer = true; //自己是否是旁观者
    for(var i = 0 ; i < personinfo.length; i++){
        if(personinfo[i].uid == myselfinfo.uid){
            this.isviewer = false;
        }
        for(var m = 0; m < this.persons.length; m++){
            if(this.persons[m] && this.persons[m].uid == personinfo[i].uid){
                this.persons[m].dealer = personinfo[i].dealer;
            }
        }
    }
    if(this.isviewer){
        var obj = {
            "address":"",
            "ip":myselfinfo.ip,
            "imgurl":myselfinfo.imgurl,
            "param":myselfinfo.gold,
            "score":myselfinfo.gold,
            "sex":myselfinfo.sex,
            "name":myselfinfo.name,
            "uid":myselfinfo.uid,
            "line":true,
            "dealer":false,
        }
        //cc.log(this.roominfo.person)
        this.roominfo.person.push(obj);
        this.getCurPlayerIndex(this.roominfo.person,myselfinfo.uid);
        this.persons = [];
        this.persons  =  this.offsetPlayer(this.roominfo.person);
    }
}
gameclass.mod_goldttz.prototype.updateroominfo = function(roominfo) {

    this.roominfo = {
        agree:roominfo.agree,
        maxStep:roominfo.maxstep,
        bankerType:parseInt(roominfo.param1/10),
        scoreType:parseInt((roominfo.param1)%10),
        selcscore:parseInt(roominfo.param1%100),
        roomid:roominfo.roomid,
        step:roominfo.step,
        time:roominfo.time,
        type:roominfo.type,
        person:roominfo.person
    };

    if(roominfo.person && roominfo.person.length > 0){
        var myselfinfo = this.game.modmgr.mod_login.logindata;
        this.getCurPlayerIndex(roominfo.person,myselfinfo.uid);
        this.persons  =  this.offsetPlayer(roominfo.person);
        for(var j=0 ;j<  this.persons.length ;j++){
            if(this.persons[j]){
                this.persons[j].score = this.persons[j].param;
            }
        }
    }
};

gameclass.mod_goldttz.prototype.joinRoomInfo = function(data){
    this.roominfo.person = data.person;
    this.view.checkSafe(data.person);
    this.getCurPlayerIndex( data.person,this.game.modmgr.mod_login.logindata.uid);
    this.persons = this.offsetPlayer(data.person);
    this.view.updatePlayerinfo(false);
};

/*
 *通过ID 找到索引位置
 * */
gameclass.mod_goldttz.prototype.getCurPlayerIndex = function(arr,uid){

    for(var x = 0;x<  5 ;x++){
        if(!arr[x]){
            continue;
        }
        if(arr[x].uid == uid){
            this.curPlayerIndex = x;
            break;
        }
    }
}

/*
 * 将进房间的玩家 顺序排序
 * */
gameclass.mod_goldttz.prototype.offsetPlayer = function(arr){
    var player = [];

    for (var x= 0;x< 5 ;x++ ){
        player[(5 + x - this.curPlayerIndex) %5 ] = arr[x] ? arr[x] : null ;
    }
    return player;
}

gameclass.mod_goldttz.prototype.updateGameInfo = function(_person) {
    var _this = this;
    _this.view.checkSafe(_person);

    var myselfinfo = _this.game.modmgr.mod_login.logindata;
    _this.getCurPlayerIndex(_person,myselfinfo.uid);
    _this.persons  =  _this.offsetPlayer(_person);
    for(var j=0 ;j < _this.persons.length ;j++){
        if(_this.persons[j]){
            _this.persons[j].score = _this.persons[j].param;
        }
    }
    if(_this.reroominfo && _this.reroominfo.info && !_this.reroominfo.begin){
        for(var i = 0 ;i < _this.reroominfo.info.length; i++){
            if(_this.reroominfo.info[i].ready){
                _this.ready(_this.reroominfo.info[i].uid);
            }
        }
    }
    _this.view.updatePlayerinfo(true);
};

gameclass.mod_goldttz.prototype.ready = function(uid) {

    for (var i =0;i < this.persons.length; i++){
        if (this.persons[i] && this.persons[i].uid == uid){
            this.persons[i].ready = true;
            this.view.showReady(i);
        }
    }
};

gameclass.mod_goldttz.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_goldttz.prototype.gameview = function() {
    this.mywebsocket.send("gameview");
};

gameclass.mod_goldttz.prototype.gameready = function() {
    var data = {};
    this.isviewer = false;
    this.mywebsocket.send("gameready",data);
};

gameclass.mod_goldttz.prototype.gameend = function() {
    var data = {};
    this.mywebsocket.send("gameend",data);
};

gameclass.mod_goldttz.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};

gameclass.mod_goldttz.prototype.gamedeal = function(b) {
    var data = {"score":b};
    this.mywebsocket.send("gamedealer",data);
};

gameclass.mod_goldttz.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};

gameclass.mod_goldttz.prototype.sendselectscore = function(type) {
    var data = {"bets":type};
    this.mywebsocket.send("gamebets",data);
};

gameclass.mod_goldttz.prototype.sendnext = function() {
    var data = {};
    this.mywebsocket.send("gameTnext",data);
};


gameclass.mod_goldttz.prototype.getserverchair = function(cur) {
    return (this.serverchair + cur )%5;
};

gameclass.mod_goldttz.prototype.getplayerdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair > this.roominfo.person.length) {
        return;
    }

    return this.roominfo.person[serverchair];
};
gameclass.mod_goldttz.prototype.getchairbyuid = function(uid) {
    for(var i = 0 ; i < this.persons.length; i++){
        if(this.persons[i]){
            if(this.persons[i].uid == uid){
                return i;
            }
        }
    }
    return -1;
};
gameclass.mod_goldttz.prototype.getpersonbyuid = function(uid) {
    for(var i = 0 ; i < this.persons.length; i++){
        if(this.persons[i]){
            if(this.persons[i].uid == uid){
                return this.persons[i];
            }
        }
    }
    return null;
};