/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_goldptj = gameclass.mod_base.extend({
    roominfo:null,
    reroominfo:null,
    mywebsocket:null,
    ongameready:null,
    ongamecompare:null,
    onupdateroominfo:null,
    serverchair:null,
    ongameview:null,
    isoneover:false,
    endinfo:null,
    score:null,
    chatlst:null,
    persons:null,
    beginchair:0,
    byeData:null,
    mysex:0,
    curPlayerIndex:0,
    isfangzhu:false,
    isviewer:false,
    gamestate:0,
    ctor:function () {
        this.isover = false;
        this.mysex = 0;
        this.curPlayerIndex = 0;
        this.chatlst = [];
    }
});

gameclass.mod_goldptj.prototype.entergame = function(_roominfo,_mywebsocket){
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;
    this.updateroominfo(this.roominfo);
    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws,data) {
        //cc.log("msghead = "+data.msghead,data.msgdata);
        switch (data.msghead){
            case "roominfo":
                //cc.log("roominfo");
                _this.joinRoomInfo(data.msgdata);
                break;
            case "gametime":
                _this.view.setshowdaojishi(data.msgdata.time);
                break;
            case "gameready":
                cc.log("gameready");
                _this.ready(data.msgdata.uid);
                //if(data.msgdata.uid == _this.game.modmgr.mod_login.logindata.uid) _this.isviewer = false;
                break;
            case "gameptjinfo":
                _this.isoneover = false;
                _this.reroominfo = data.msgdata;

                if(data.msgdata.begin) {
                    _this.beginchair = 2;
                    _this.updateViewerInfo(data.msgdata.info);
                    _this.view.updatePlayerinfo(true);
                    _this.view.showtablecard(data.msgdata, false);
                }else{
                    if(data.msgdata.info){
                        for(var i = 0 ;i < data.msgdata.info.length; i++){
                            if(data.msgdata.info[i].ready && data.msgdata.info[i].uid == _this.game.modmgr.mod_login.logindata.uid){
                                _this.ready(data.msgdata.info[i].uid);
                            }
                        }
                    }
                    _this.view.updatePlayerinfo(true);
                }
                _this.gamestate = data.msgdata.state;
                if(data.msgdata.time)
                    _this.view.setshowdaojishi(data.msgdata.time);
                break;
            case "roomseat":
                //cc.log("roomseat",data.msgdata);
                _this.updateGameInfo(data.msgdata.person);
                break;
            case "gameptjbegin":
                _this.isoneover = false;
                _this.gamestate = 1;//抢庄中
                _this.view.cleartable();
                _this.view.showtablecard(data.msgdata,true);
                _this.view.safeLayer.btn_safe.setVisible(false);
                break;
            case "gameptjcard":
                _this.gamestate = 3;
                //_this.beginchair = (data.msgdata.sz[0] + data.msgdata.sz[1] - 2)%2;
                _this.beginchair = data.msgdata.sz[0] + data.msgdata.sz[1];
                _this.view.showtouzicard(data.msgdata);
                break;
            case "gamebets":
                //data.msgdata// uid int //bets int
                _this.view.showbets(data.msgdata);
                break;
            //广播uid抢庄（只有在抢庄模式才发）
            case "gamedeal":
                //data.msgdata
                _this.view.robzhuang(data.msgdata.uid,data.msgdata.ok);
                break;
            //广播谁成为庄家（只有在抢庄模式才发）
            case "gamedealer":
                _this.gamestate = 2;
                _this.view.robzhuangsus(data.msgdata.uid);
                break;
            case "gameview":
                var chair = _this.getchairbyuid(data.msgdata.uid);
                //if(chair > 0){
                    _this.view.showplayerkaipai(chair);
                //}
                break;
            case "gameptjend":
                _this.isoneover = true;
                _this.gamestate = 0;
                _this.view.resultOnend(data.msgdata);
                break;
            case "gamegoldtotal":
                _this.view.refreshgold(data.msgdata);
                break;
            case "gameline":
                var curIndex = _this.getchairbyuid(data.msgdata.uid);
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
            case "lineperson":
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
                break;
            case "tickroom":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.backlogin();
                break;
        }
    });
};

gameclass.mod_goldptj.prototype.bindUI = function(ui) {
    this.view = ui;
}
gameclass.mod_goldptj.prototype.updateroominfo = function(roominfo) {
    var paijiutype = roominfo.type%10; //0大天九，1小天九
    this.roominfo = {
        param1:100+paijiutype,
        param2:1100,//金币场默认鬼子天九为11，炸弹和第九娘娘为00
        agree:roominfo.agree,
        maxStep:roominfo.maxstep,
        tianjiu:paijiutype,
        bankerType:0,
        shangdao:1,//1三道
        selcscore:0,
        roomid:roominfo.roomid,
        step:roominfo.step,
        time:roominfo.time,
        type:roominfo.type,
        person:roominfo.person
    };
    //cc.log(this.roominfo);
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
//有人离开房间时会收到
gameclass.mod_goldptj.prototype.joinRoomInfo = function(data){
    this.roominfo.person = data.person;
    //this.roominfo.param1 = data.param1;
    this.view.checkSafe(data.person);
    this.getCurPlayerIndex( data.person,this.game.modmgr.mod_login.logindata.uid);
    this.persons = this.offsetPlayer(data.person);
    this.view.updatePlayerinfo(false);
};

/*
 *通过ID 找到索引位置
 * */
gameclass.mod_goldptj.prototype.getCurPlayerIndex = function(arr,uid){

    for(var x = 0;x <  4 ;x++){
        if(!arr[x]){
            continue;
        }
        if(arr[x].uid == uid){
            this.curPlayerIndex = x;
            this.mysex = arr[x].sex;
            break;
        }
    }
}
/*
 * 将进房间的玩家 顺序排序
 * */
gameclass.mod_goldptj.prototype.offsetPlayer = function(arr){
    var player = [];
    for (var x = 0;x < 4 ;x++ ){
        player[(4 + x - this.curPlayerIndex) %4 ] = arr[x] ? arr[x] : null ;
    }
    return player;
};
gameclass.mod_goldptj.prototype.updateViewerInfo = function(personinfo) {
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
gameclass.mod_goldptj.prototype.updateGameInfo = function(_person) {
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

gameclass.mod_goldptj.prototype.ready = function(uid) {
    //cc.log(uid,this.persons);
    for (var i =0;i < this.persons.length; i++){
        if (this.persons[i] && this.persons[i].uid == uid){
            this.persons[i].ready = true;
            this.view.showReady(i);
        }
    }
};

gameclass.mod_goldptj.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_goldptj.prototype.gameready = function() {
    var data = {};
    this.isviewer = false;
    this.mywebsocket.send("gameready",data);
};

gameclass.mod_goldptj.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};
//发送抢庄
gameclass.mod_goldptj.prototype.sendgamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_goldptj.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};
//发送下注
gameclass.mod_goldptj.prototype.sendselectscore = function(type) {
    var data = {"bets":type};
    this.mywebsocket.send("gamebets",data);
};

//发送亮牌
gameclass.mod_goldptj.prototype.sendview = function(viewArr) {
    var data = {"view":viewArr};
    this.mywebsocket.send("gameptjview",data);
};



gameclass.mod_goldptj.prototype.getserverchair = function(cur) {
    return (this.serverchair + cur )%5;
};

gameclass.mod_goldptj.prototype.getplayerdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair > this.roominfo.person.length) {
        return
    }

    return this.roominfo.person[serverchair];
};
gameclass.mod_goldptj.prototype.getchairbyuid = function(uid) {
    for(var i = 0 ; i < this.persons.length; i++){
        if(this.persons[i]){
            if(this.persons[i].uid == uid){
                return i;
            }
        }
    }
    return -1;
};
gameclass.mod_goldptj.prototype.getpersonbyuid = function(uid) {
    for(var i = 0 ; i < this.persons.length; i++){
        if(this.persons[i]){
            if(this.persons[i].uid == uid){
                return this.persons[i];
            }
        }
    }
    return null;
};