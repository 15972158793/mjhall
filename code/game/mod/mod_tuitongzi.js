gameclass.mod_ttz = gameclass.mod_base.extend({
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
    gamestate:null,
    score:null,
    ongamedealer:null,
    chatlst:null,
    persons:null,
    beginchair:0,
    byeData:null,
    ctor:function () {
        this.isover = false;
        this.gamestate = 0;
        this.chatlst = [];
    }
});

gameclass.mod_ttz.prototype.entergame = function(_roominfo,_mywebsocket){

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
            case "gameTsz":
               _this.beginchair = _this.getchairbyuid(data.msgdata.uid);
                _this.view.showtouzi(data.msgdata.num);
                break;
            case "gameTinfo":
                _this.isoneover = false;
                _this.updateGameInfo(data.msgdata);
                if(data.msgdata.begin){
                    _this.view.safeLayer.btn_safe.setVisible(false);
                }
                break;
            case "gamebegin":
                _this.isoneover = false;
                //if(data.msgdata.begin)
                _this.gamestate = 1;
                _this.view.dealCard(data.msgdata);
                _this.view.safeLayer.btn_safe.setVisible(false);
                break;
            case "gameTend":
                _this.isoneover = true;
                _this.view.resultOnend(data.msgdata);
                break;
            case "gameTbye":
                _this.isover=true;
                _this.mywebsocket.onclosefunc = null;
                _this.byeData = _this.view.resultdata(data.msgdata);
                if(_this.isoneover && _this.roominfo.step == _this.roominfo.maxStep){
                }else {
                    _this.game.uimgr.showui("gameclass.ttzallresultui").setmodttz(_this.roominfo.person, _this.byeData);
                }
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

gameclass.mod_ttz.prototype.bindUI = function(ui) {
    this.view = ui;
}
gameclass.mod_ttz.prototype.updateroominfo = function(roominfo) {

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

    cc.log(this.roominfo);

    this.persons =  roominfo.person;
    this.getCurPlayerIndex(this.persons,this.game.modmgr.mod_login.logindata.uid);
    this.persons  =  this.offsetPlayer(this.persons);
    if (this.roominfo.time != 0){
        this.game.uimgr.showui("gameclass.exitroom",false);
        this.game.uimgr.uis["gameclass.exitroom"].setData(this,this.roominfo);
    }
};

gameclass.mod_ttz.prototype.joinRoomInfo = function(data){
    cc.log(data.person);
    this.roominfo.person = data.person;
    this.getCurPlayerIndex( data.person,this.game.modmgr.mod_login.logindata.uid);
    var players = this.offsetPlayer(data.person);
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
gameclass.mod_ttz.prototype.getCurPlayerIndex = function(arr,uid){

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
gameclass.mod_ttz.prototype.offsetPlayer = function(arr){
    var player = [];

    for (var x= 0;x< 5 ;x++ ){
        player[(5 + x - this.curPlayerIndex) %5 ] = arr[x] ? arr[x] : null ;
    }
    return player;
}

gameclass.mod_ttz.prototype.updateGameInfo = function(gameInfo) {
    this.gameInfo = gameInfo;
    //cc.log(gameInfo);
    var _this = this;
    this.view.checkSafe(this.roominfo.person);
    var dealeruid = 0;

    if(this.gameInfo.info.length > 0 ){
        cc.each(this.gameInfo.info,function(o){
            var index = _this.getchairbyuid(o.uid);
            if(_this.persons[index]){
                _this.persons[index].ready = o.ready;
                _this.persons[index].deal = o.deal;
                _this.persons[index].score = o.score;
            }
            if(o.deal) dealeruid = o.uid;
        });
    }else{
        for(var  i = 0; i< this.persons.length ; i++){
            if( this.persons[i]){
                this.persons[i].ready = false;
            }
        }
        dealeruid = this.roominfo.person[0].uid
    }
    this.view.setRoomInfo(dealeruid);
    this.view.ongamebegin(this.gameInfo);
    this.view.updatePlayerinfo(true);
};

gameclass.mod_ttz.prototype.ready = function(uid) {

    for (var i =0;i < this.persons.length; i++){
        if (this.persons[i] && this.persons[i].uid == uid){
            this.persons[i].ready = true;
            this.view.showReady(i);
        }
    }
};

gameclass.mod_ttz.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_ttz.prototype.gameready = function(bool) {
    var data = {};
    this.mywebsocket.send("gameready",data);

    if(bool) this.view.nextju();
};

gameclass.mod_ttz.prototype.gameend = function() {
    var data = {};
    this.mywebsocket.send("gameend",data);
};

gameclass.mod_ttz.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};

gameclass.mod_ttz.prototype.gamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_ttz.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};

gameclass.mod_ttz.prototype.sendselectscore = function(type) {
    var data = {"score":type};
    this.mywebsocket.send("ChoiceScore",data);
};

gameclass.mod_ttz.prototype.sendnext = function() {
    var data = {};
    this.mywebsocket.send("gameTnext",data);
};


gameclass.mod_ttz.prototype.getserverchair = function(cur) {
    return (this.serverchair + cur )%5;
};

gameclass.mod_ttz.prototype.getplayerdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair > this.roominfo.person.length) {
        return
    }

    return this.roominfo.person[serverchair];
};
gameclass.mod_ttz.prototype.getchairbyuid = function(uid) {
    for(var i = 0 ; i < this.persons.length; i++){
        if(this.persons[i]){
            if(this.persons[i].uid == uid){
                return i;
            }
        }
    }
    return -1;
};
gameclass.mod_ttz.prototype.getpersonbyuid = function(uid) {
    for(var i = 0 ; i < this.persons.length; i++){
        if(this.persons[i]){
            if(this.persons[i].uid == uid){
                return this.persons[i];
            }
        }
    }
    return null;
};