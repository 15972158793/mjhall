/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_ddzhu = gameclass.mod_base.extend({
    roominfo:null,
    mywebsocket:null,
    ongameready:null,
    ongameDDZbegin:null,//斗地主开始
    ongameddzstep:null,//下一次出牌玩家
    ongameddzbye:null,
    ongameDDZend:null,//斗地主结束
    ongamebets:null,
    ongameDouble:null,//加倍消息
    onupdateroominfo:null,
    serverchair:null,
    selfdata:null,
    ongameview:null,
    isover:null,
    endinfo:null,
    gamestate:null,
    score:null,
    ongamedealer:null,
    onDDZgamedealer:null,
    onUpdateDifen:null,
    onchat:null,
    chatlst:null,
    uid:null,
    nameArr:[],
    uidArr:[],
    maxStep:null,
    minStep:null,
    roomnum:null,
    CreateRoomType:null,
    GameType:null,
    isReconne:false,
    chaiwang:null,
    isdouble:null,

    isend:false,
    ctor:function () {
        this.isover = false;
        this.isend = false;
        this.gamestate = 0;
        this.chatlst = [];
    },

    bindUI : function(ui) {
        this.view = ui;
    },
});
gameclass.mod_ddzhu.prototype.entergame = function(_roominfo,_mywebsocket){
    //{\"roomid\":351846,\"person\":[{\"openid\":\"59ef6e332117175342041f0e5e90dace\",\"name\":\"游客\",\"imgurl\":\"\",\
    // "ip\":\"221.234.240.2\",\"line\":true}],\"time\":0,\"agree\":[]}"}
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;

    var tmpe = _roominfo.param1;

    this.chaiwang = (parseInt(tmpe / 100 % 10) == 0);
    this.isdouble = (parseInt(tmpe / 1000 % 10) == 1);
    //cc.log(this.chaiwang);
    //cc.log(this.isdouble);
    if( !this.chaiwang ){
        tmpe -= 100;
    }
    if( this.isdouble ){
        tmpe -= 1000;
    }
    //cc.log(tmpe);
    if(tmpe == 0 || tmpe == 1 || tmpe == 2 || tmpe == 10 || tmpe == 11 || tmpe == 12){
        this.CreateRoomType = tmpe;
    }else{
        this.CreateRoomType = 0;
    }

    this.GameType = _roominfo.type;//6：经典斗地主  8：癞子斗地主
    this.updateroominfo(this.roominfo);
    var _this = this;

    this.mywebsocket.setonmsgfunc(function (ws,data) {
        cc.log(data.msghead);
        switch (data.msghead){
            case "login":
                //cc.log("switch login");
            case "gameddzinfo":
                _this.isend = false;
                if(_this.roominfo.type == 6){
                    _this.mainUI.laidipaikuang.setVisible(false);
                }
                if(data.msgdata.begin) {
                    _this.ongameDDZbegin(data.msgdata);
                }
                else if(data.msgdata.dzcard.length > 0 && !data.msgdata.begin ){
                    for(var i = 0 ; i< data.msgdata.info.length ;i++){
                        if(data.msgdata.info[i].ready){
                            _this.ready(data.msgdata.info[i].uid);
                            if( data.msgdata.info[i].uid == _this.uid){
                                _this.ongameready();
                            }
                        }

                    }
                    //cc.log("gameddzinfo---------------------");

                    _this.mainUI.RoomMin = _this.minStep+1;
                    if(_this.mainUI.RoomMin > 1){
                        _this.mainUI.invitebtn.setVisible(false);
                    }
                    //_this.mainUI.updateStepText();
                    _this.mywebsocket.send("gameready",{});
                }
                _this.view.checkSafe(_this.roominfo.person);
                if(data.msgdata.begin){
                    _this.view.safeLayer.btn_safe.setVisible(false);
                    _this.view.showProgress(data.msgdata.curstep);
                }
                break;
            case "gamedouble":
                _this.ongameDouble(data.msgdata);
                    break;
            case "joinroom":
                break;
            case "gameddzbegin":
                _this.isend = false;
                _this.gamestate = 1;
                _this.ongameDDZbegin(data.msgdata);
                //防止最后一个人进来没检测同IP
                if(_this.roominfo.step == 0){
                    _this.view.checkSafe(_this.roominfo.person);
                }
                _this.view.safeLayer.btn_safe.setVisible(false);
                break;
            case "gameddzstep":
                //cc.log("轮换");
                _this.ongameddzstep(data.msgdata);
                _this.view.showProgress(data.msgdata.curstep);
                break;
            case "gameddzbye":
                _this.isover = true;
                _this.mywebsocket.onclosefunc = null;
                _this.endinfo = data.msgdata;
                if (_this.endinfo){
                    if(_this.isend && _this.roominfo.step == _this.roominfo.maxstep){}
                    else {
                        _this.ongameddzbye(_this.endinfo);
                    }
                }
                _this.isend = false;
                break;
            case "roominfo":
                _this.updateroominfo(data.msgdata);
                _this.onupdateroominfo(data.msgdata);
                //cc.log(data.msgdata);
                _this.view.checkSafe(data.msgdata.person);
                break;
            case "joinroomfail":
                _this.isend = false;
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
                _this.mywebsocket.onclosefunc = null;
                if (!_this.isover){
                    //cc.log("exitroom isover");
                    _this.isover = false;
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
                //cc.log("gameready");

                //_this.gameniuniuinfo.ready[_this.gameniuniuinfo.ready.length] = data.msgdata.uid;

                _this.ready(data.msgdata.uid);

                _this.ongameready();

                break;
            case "gamebets":
                //cc.log("gamebets");

                /*for(var i = 0;i < 3;i++){
                    if (i < _this.gameniuniuinfo.info.length){
                        if (data.msgdata.uid == _this.gameniuniuinfo.info[i].uid){
                            _this.gameniuniuinfo.info[i].bets = data.msgdata.bets;
                        }
                    }
                }*/

                _this.ongamebets(data.msgdata);
                /*
                 msghead = "gamebets"
                 msgdata = {bets int}
                 客户端发送下注消息,bets为下注数量
                 收到的回复可能两种
                 1.
                 msghead = "gamebets"
                 msgdata = {openid string, bets int}
                 * */

                break;
            case "gameddzend":
                _this.isend = true;
                _this.gamestate = 2;
                _this.ongameDDZend(data.msgdata,false);

                break;
            case "gameview":
                _this.ongameview();
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
            case "gamedeal":
                _this.rob(data.msgdata.uid,data.msgdata.ok);
                //("gamedeal uid="+data.msgdata.uid);
                _this.ongamedealer(false,data.msgdata.uid);
                break;
            case "gamedealer":
                _this.onUpdateDifen(data.msgdata);
                _this.onDDZgamedealer(data.msgdata.card,data.msgdata.uid,data.msgdata.razz);
                mod_sound.playeffect(g_music["Man_Rob1"], false);//抢地主
                break;
            case "chatroom":
                cc.log("recv cha msg",data.msgdata);
                _this.chatlst[_this.chatlst.length] = data.msgdata;

                if (_this.game.uimgr.uis["gameclass.chatui"])
                    _this.game.uimgr.uis["gameclass.chatui"].pushstr(data.msgdata);

                if(_this.onchat){
                    _this.onchat( data.msgdata);
                }
                break;
            case "lineperson":
                for (var i =0;i < _this.roominfo.person.length; i++){
                    if(_this.roominfo.person[i].uid == data.msgdata.uid){
                        _this.roominfo.person[i].ip = "";
                        if(_this.game.uimgr.uis["gameclass.ddzhutable"] != null) {
                            _this.game.uimgr.uis["gameclass.ddzhutable"].resetIcon(data.msgdata.uid);
                        } else {
                            _this.game.uimgr.uis["gameclass.ddzhutable_wild"].resetIcon(data.msgdata.uid);
                        }
                        break;
                    }
                }
                //_this.view.safeLayer.safeBtncallFunc(_this.roominfo.person);
                break;

            case "gameline":
                var curIndex = _this.getPlayerIndexById(data.msgdata.uid);
                //cc.log(curIndex)
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
        }
    });
};

gameclass.mod_ddzhu.prototype.updateroominfo = function(roominfo) {

    this.uid = this.game.modmgr.mod_login.logindata.uid;

    this.roominfo = roominfo;
    this.maxStep = this.roominfo.maxstep;
    this.minStep = this.roominfo.step;
    this.roomnum = this.roominfo.roomid;
    //cc.log("maxstep="+this.roominfo.maxstep);
    //cc.log("minStep="+this.roominfo.step);
    for (var i =0;i < this.roominfo.person.length; i++){
        this.nameArr[i] = this.roominfo.person[i].name;
        this.uidArr[i] = this.roominfo.person[i].uid;

        if (this.roominfo.person[i].uid == this.game.modmgr.mod_login.logindata.uid){
            this.serverchair = i;
            this.selfdata = this.roominfo.person[i];
        }
    }

    if (this.gameniuniuinfo!=null){
        this.updategameniuniuinfo(this.gameniuniuinfo);
    }
};

gameclass.mod_ddzhu.prototype.updategameniuniuinfo = function(gameniuniuinfo) {
    this.gameniuniuinfo = gameniuniuinfo;

    //this.ready = this.gameniuniuinfo.ready;
    if (this.gameniuniuinfo.ready != null) {
        for (var i = 0; i < this.gameniuniuinfo.ready.length; i++) {
            this.ready(this.gameniuniuinfo.ready[i]);
        }

        for (var i = 0; i < this.gameniuniuinfo.deal.length; i++) {
            this.rob(this.gameniuniuinfo.deal[i].uid,this.gameniuniuinfo.deal[i].ok);
        }
    }else{
        for (var i =0;i < this.roominfo.person.length; i++){
            this.roominfo.person[i].ready = false;
            this.roominfo.person[i].rob = 0;
        }
    }
};

gameclass.mod_ddzhu.prototype.ready = function(uid) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            this.roominfo.person[i].ready = true;
        }
    }
};


gameclass.mod_ddzhu.prototype.getPlayerIndexById = function(uid){
    for(var i = 0; i<  this.roominfo.person.length; i++){
        if(this.roominfo.person[i] && this.roominfo.person[i].uid == uid){
            return i;
        }
    }
};

gameclass.mod_ddzhu.prototype.rob = function(uid,ok) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            if (ok)
                this.roominfo.person[i].rob = 1;
            else
                this.roominfo.person[i].rob = 2;
        }
    }
};

gameclass.mod_ddzhu.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_ddzhu.prototype.gameready = function(ready) {
    var data = {};
    this.mywebsocket.send("gameready",data);
};
gameclass.mod_ddzhu.prototype.gamesteps = function(cards) {
    var data = {"cards":cards};
    this.mywebsocket.send("gamesteps",data);
};
gameclass.mod_ddzhu.prototype.gamesteps_wild = function(cards,abscards) {
    var data = {"cards":cards,"abscards":abscards};
    this.mywebsocket.send("gamesteps",data);
};
gameclass.mod_ddzhu.prototype.gameniuniubegin = function() {
    var data = {};
    this.mywebsocket.send("gameniuniubegin",data);
};


gameclass.mod_ddzhu.prototype.gamebets = function(num) {

    /*for(var i = 0;i < 4;i++){
        if (i < this.gameniuniuinfo.info.length){
            if (this.game.modmgr.mod_login.logindata.uid == this.gameniuniuinfo.info[i].uid){
                this.gameniuniuinfo.info[i].bets = num;
            }
        }
    }*/

    var data = {"bets":Number(num)};
    this.mywebsocket.send("gamebets",data);
};
//是否加倍消息
gameclass.mod_ddzhu.prototype.gamedouble = function(isdouble) {
    var data = {"double":isdouble};
    this.mywebsocket.send("gamedouble",data);
};
gameclass.mod_ddzhu.prototype.gameview = function() {
    var data = {};
    this.mywebsocket.send("gameview",data);
};

gameclass.mod_ddzhu.prototype.gameend = function() {
    var data = {};
    this.mywebsocket.send("gameend",data);
};

gameclass.mod_ddzhu.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};

gameclass.mod_ddzhu.prototype.gamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_ddzhu.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};


gameclass.mod_ddzhu.prototype.getserverchair = function(cur) {
    //cc.log(this.serverchair);
    return (this.serverchair + cur )%3;
};


gameclass.mod_ddzhu.prototype.getplayerdata = function(cur) {
    var serverchair = this.getserverchair(cur);
    //cc.log("serverchair"+serverchair);
    if (serverchair > this.roominfo.person.length) {
        return
    }
    /*cc.log("this.roominfo.person[serverchair]");
    cc.log(this.roominfo.person[serverchair]);*/
    return this.roominfo.person[serverchair];
};

gameclass.mod_ddzhu.prototype.getplayerdatabyuid = function(uid) {

    for(var i = 0;i < this.roominfo.person.length; i++ ){
        if(this.roominfo.person[i].uid == uid){
            return this.roominfo.person[i];
        }
    }
};

gameclass.mod_ddzhu.prototype.getplayerotherdata = function(cur) {
    var serverchair = this.getserverchair(cur);
    if(this.gameniuniuinfo) {
        if (serverchair > this.gameniuniuinfo.info.length) {
            return
        }

        return this.gameniuniuinfo.info[serverchair];
    }
    return;
};

gameclass.mod_ddzhu.prototype.ongameniuniucard = function(card) {
    for (var i =0;i < this.gameniuniuinfo.info.length; i++){

        if (this.gameniuniuinfo.info[i].uid == this.game.modmgr.mod_login.logindata.uid){
            this.gameniuniuinfo.info[i].card[4] = card;
        }
    }
};

gameclass.mod_ddzhu.prototype.getplayernum = function() {
    return this.gameniuniuinfo.info.length;
};


