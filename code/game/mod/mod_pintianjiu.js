/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_ptj = gameclass.mod_base.extend({
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
    gamestate:0,
    score:null,
    chatlst:null,
    persons:null,
    beginchair:0,
    byeData:null,
    mysex:0,
    curPlayerIndex:0,
    isfangzhu:false,
    ctor:function () {
        this.isover = false;
        this.gamestate = 0;
        this.mysex = 0;
        this.curPlayerIndex = 0;
        this.chatlst = [];
    }
});

gameclass.mod_ptj.prototype.entergame = function(_roominfo,_mywebsocket){
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;
    this.updateroominfo(this.roominfo);
    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws,data) {
        cc.log("msghead = "+data.msghead,data.msgdata);
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
                //_this.game.uimgr.showui("gameclass.msgboxui");
                //_this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                break;
            case "gameready":
                cc.log("gameready");
                _this.ready(data.msgdata.uid);

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
            case "gameptjinfo":
                _this.isoneover = false;
                //cc.log("gameptjinfo",_this.roominfo);
                if(data.msgdata.begin){
                    _this.gamestate = 1;
                    _this.view.safeLayer.btn_safe.setVisible(false);
                }
                if(_this.roominfo.step > 1){
                    _this.view.invitebtn.setVisible(false);
                }
                _this.beginchair = 6;
                cc.log("gameptjinfo",data.msgdata);
                _this.updateGameInfo(data.msgdata);
                _this.view.onbegin(data.msgdata);
                break;
            case "gameptjbegin":
                _this.isoneover = false;
                _this.gamestate = 1;
                _this.view.cleartable(true);
                _this.view.showtablecard(data.msgdata);
                _this.view.safeLayer.btn_safe.setVisible(false);
                break;
            case "gameptjcard":
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
                _this.view.robzhuangsus(data.msgdata.uid);
                break;
            case "gameview":
                var chair = _this.getchairbyuid(data.msgdata.uid);
                if(chair > 0){
                    _this.view.showplayerkaipai(chair);
                }
                break;
            case "gameptjend":
                _this.isoneover = true;
                _this.gamestate = 0;
                _this.view.resultOnend(data.msgdata);
                break;
            case "gameptjbye":
                _this.isover=true;
                _this.gamestate = 0;
                _this.mywebsocket.onclosefunc = null;
                if(data.msgdata.info && data.msgdata.info.length > 0){
                    _this.byeData = _this.view.resultdata(data.msgdata);
                    if(_this.isoneover && _this.roominfo.step == _this.roominfo.maxStep){
                    }else {
                        _this.game.uimgr.showui("gameclass.ptjallresultui").setmodttz(_this.roominfo.person, _this.byeData);
                    }
                }
                break;
            case "gameline":
                var curIndex = _this.getchairbyuid(data.msgdata.uid);
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
        }
    });
};

gameclass.mod_ptj.prototype.bindUI = function(ui) {
    this.view = ui;
    if(this.isfangzhu) this.view.showreadybtn();
}
gameclass.mod_ptj.prototype.updateroominfo = function(roominfo) {

    this.roominfo = {
        param1:roominfo.param1,
        param2:roominfo.param2,
        agree:roominfo.agree,
        maxStep:roominfo.maxstep,
        tianjiu:parseInt(roominfo.param1/10),
        bankerType:parseInt((roominfo.param1)%10),
        shangdao:parseInt(roominfo.param1%100),
        selcscore:parseInt(roominfo.param1%1000),
        roomid:roominfo.roomid,
        step:roominfo.step,
        time:roominfo.time,
        type:roominfo.type,
        person:roominfo.person
    };

    //cc.log(this.roominfo);

    this.persons =  roominfo.person;
    if(roominfo.person && roominfo.person.length > 0){
        this.getCurPlayerIndex(this.persons,this.game.modmgr.mod_login.logindata.uid);
        this.persons  =  this.offsetPlayer(roominfo);
        if (this.roominfo.time != 0){
            this.game.uimgr.showui("gameclass.exitroom",false);
            this.game.uimgr.uis["gameclass.exitroom"].setData(this,this.roominfo);
        }
    }
};

gameclass.mod_ptj.prototype.joinRoomInfo = function(data){
    this.roominfo.person = data.person;
    this.roominfo.param1 = data.param1;
    this.getCurPlayerIndex( data.person,this.game.modmgr.mod_login.logindata.uid);
    var players = this.offsetPlayer(data);
    this.view.checkSafe(this.roominfo.person);

    for(var i=0 ;i< players.length ;i++ ){
        for(var j=0 ;j<  this.persons.length ;j++){
            if(this.persons[j] && players[i] &&  players[i].uid ==  this.persons[j].uid ){
                players[i].ready = this.persons[j].ready;
            }
        }
    }
    for(var i=0 ;i< players.length ;i++ ){
        if(players[i]){
            if(!players[i].ready){
                players[i].ready = false;
            }
            if(this.isReady){
                players[i].ready = false;
            }
        }
    }
    this.persons = players;
    this.view.updatePlayerinfo(false);
};

/*
 *通过ID 找到索引位置
 * */
gameclass.mod_ptj.prototype.getCurPlayerIndex = function(arr,uid){

    for(var x = 0;x<  5 ;x++){
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
gameclass.mod_ptj.prototype.offsetPlayer = function(roominfop){
    var arr = roominfop.person;
    var player = [];
    if(roominfop.host == this.game.modmgr.mod_login.logindata.uid){
        //this.view.showreadybtn();
        this.isfangzhu = true;
    }else{
        this.isfangzhu = false;
        this.gameready();
    }
    for (var x= 0;x< 4 ;x++ ){
        player[(4 + x - this.curPlayerIndex) %4 ] = arr[x] ? arr[x] : null ;
    }
    return player;
};

gameclass.mod_ptj.prototype.updateGameInfo = function(gameInfo) {
    this.gameInfo = gameInfo;
    var _this = this;
    this.view.checkSafe(this.roominfo.person);

    if(this.gameInfo.info.length > 0 ){
        cc.each(this.gameInfo.info,function(o){
            var index = _this.getchairbyuid(o.uid);
            if(_this.persons[index]){
                _this.persons[index].ready = o.ready;
                _this.persons[index].deal = o.dealer;
                _this.persons[index].score = o.total;
            }
        });
    }else{
        for(var  i = 0; i< this.persons.length ; i++){
            if( this.persons[i]){
                this.persons[i].ready = false;
            }
        }
    }
    this.view.updatePlayerinfo(true);
    this.view.setRoomInfo(this.gameInfo.begin);
};

gameclass.mod_ptj.prototype.ready = function(uid) {

    for (var i =0;i < this.persons.length; i++){
        if (this.persons[i] && this.persons[i].uid == uid){
            this.persons[i].ready = true;
            this.view.showReady(i);
        }
    }
};

gameclass.mod_ptj.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_ptj.prototype.gameready = function(bool) {
    var data = {};
    if(this.roominfo.person.length > 1){
        this.mywebsocket.send("gameready",data);
    }
};

gameclass.mod_ptj.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};
//发送抢庄
gameclass.mod_ptj.prototype.sendgamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_ptj.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};
//发送下注
gameclass.mod_ptj.prototype.sendselectscore = function(type) {
    var data = {"bets":type};
    this.mywebsocket.send("gamebets",data);
};

//发送亮牌
gameclass.mod_ptj.prototype.sendview = function(viewArr) {
    var data = {"view":viewArr};
    this.mywebsocket.send("gameptjview",data);
};



gameclass.mod_ptj.prototype.getserverchair = function(cur) {
    return (this.serverchair + cur )%5;
};

gameclass.mod_ptj.prototype.getplayerdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair > this.roominfo.person.length) {
        return
    }

    return this.roominfo.person[serverchair];
};
gameclass.mod_ptj.prototype.getchairbyuid = function(uid) {
    for(var i = 0 ; i < this.persons.length; i++){
        if(this.persons[i]){
            if(this.persons[i].uid == uid){
                return i;
            }
        }
    }
    return -1;
};
gameclass.mod_ptj.prototype.getpersonbyuid = function(uid) {
    for(var i = 0 ; i < this.persons.length; i++){
        if(this.persons[i]){
            if(this.persons[i].uid == uid){
                return this.persons[i];
            }
        }
    }
    return null;
};