/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_kwx = gameclass.mod_base.extend({
    roominfo:null,
    mywebsocket:null,
    ongameready:null,
    ongamekwxbegin:null,
    dealCards:null,
    ongamekwxinfo:null,
    ongamebets:null,
    ongameniuniuend:null,
    onupdateroominfo:null,
    serverchair:null,
    selfdata:null,
    ongameniuniucardui:null,
    ongameview:null,
    isover:null,
    isend:false,
    endinfo:null,
    begin:null,
    score:null,
    ongamedealer:null,
    onchat:null,
    chatlst:null,
    chairinfo:null,  // uid在牌桌中的序号。
    order:null, // 自己在牌桌中的序号。
    gamekwxend_info:null,   // 一盘结束的服务器信息
    //uid_draw:null,  // 摸牌人的uid
    laststepcard:null,      // 上一张打出牌的号码。
    isJiaPiao:null,
    jsonfile:null,
    gamekwxinfo:null,
    gamebyekwxinfo:null,
    //uid_step:null,  // 打牌人的uid
    ctor:function () {
        this.isend = false;
        this.isover = false;
        this.begin = 0;
        this.chatlst = [];
        this.isJiaPiao = false;

        this.jsonfile = [];
        this.jsonfile = ["平胡","卡五星","碰碰胡", "明四归一", "杠上开", "杠上炮", "亮牌",
            "清一色", "七对", "暗四归一", "全求人", "小三元",  "豪华七对",  "大三元", "双豪华七对",
            "双暗四归一", "自摸","点炮","对亮对番","买马", "漂", "数坎","抢杠","海底捞","海底炮","上楼","跑恰摸八"];
    }
});

gameclass.mod_kwx.prototype.entergame = function(_roominfo,_mywebsocket){
    //{\"roomid\":351846,\"person\":[{\"openid\":\"59ef6e332117175342041f0e5e90dace\",\"name\":\"游客\",\"imgurl\":\"\",\
    // "ip\":\"221.234.240.2\",\"line\":true}],\"time\":0,\"agree\":[]}"}
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;

    this.updateroominfo(this.roominfo);

    var _this = this;

    this.mywebsocket.setonmsgfunc(function (ws,data) {
    //this.mywebsocket.onmsgfunc = function (ws,data) {
    //    cc.log("getMsg-----kwx----->",data);
        switch (data.msghead){
            case "roominfo":
                cc.log("roominfo");
                _this.updateroominfo(data.msgdata);
                _this.onupdateroominfo();
                _this.view.checkSafe(data.msgdata.person);
                break;
            case "joinroomfail":
                cc.log("joinroomfail");
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.dissmissroom();
                break;
            case "exitroom":
                cc.log("exitroom")//this.isend
                _this.game.uimgr.closeui("gameclass.exitroom");
                if (!_this.isover){
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                }
                break;
            case "tickroom":
                cc.log("tickroom");
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.backlogin();
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                break;
            case "gameready":
                cc.log("gameready");
                _this.isover = false;
                break;
            case "gamekwxbegin":
                cc.log("gamekwxbegin");
                this.isend = false;
                for (var i =0;i < data.msgdata.info.length; i++){
                    if(_this.game.modmgr.mod_login.logindata.uid == data.msgdata.info[i].uid){
                        if(_this.roominfo.type >= gameclass.gamegoldkwx && data.msgdata.info[i].piao < 0){
                            _this.kwxgoldchangpiao();//金币场强制加漂
                        }
                        if(data.msgdata.info[i].trust){
                            _this.game.uimgr.closeui("gameclass.kwxGoldResultui");
                            _this.ResetKwxDesk();
                            _this.kwxtuoguan(true);
                            break;
                        }
                    }
                }
                _this.begin = 1;
                if(_this.roominfo.step < _this.roominfo.maxstep) _this.roominfo.step += 1;
                //_this.updategamekwxinfo(data.msgdata);
                _this.ongamekwxbegin(data.msgdata,true);
                _this.dealCards(data.msgdata);

                //如果是金币场，最后会收到roominfo消息,会提示安全框,如果是房卡场，最后一个人不会收到info,做判断
                if(_this.roominfo.type < 10000){
                    if(_this.roominfo.step == 1){
                        _this.view.checkSafe(_this.roominfo.person);
                    }
                }
                _this.view.safeLayer.btn_safe.setVisible(false);
                break;
            case "gamekwxinfo":
                //cc.log("gamekwxinfo",data.msgdata,_this.roominfo.type);// 断线重连
                this.isend = false;
                _this.begin = (data.msgdata.begin?1:0);
                //_this.updategamekwxinfo(data.msgdata);
                _this.ongamekwxinfo(data.msgdata);
                _this.view.checkSafe(_this.roominfo.person);

                if(data.msgdata.begin){
                    _this.view.safeLayer.btn_safe.setVisible(false);
                    _this.ongamekwxbegin(data.msgdata,false);
                    _this.RedisplayDesk(data.msgdata);
                    //_this.dealCards(data.msgdata);

                    for (var i =0;i < data.msgdata.info.length; i++){
                        if(_this.game.modmgr.mod_login.logindata.uid == data.msgdata.info[i].uid){
                            if(_this.roominfo.type >= gameclass.gamegoldkwx && data.msgdata.info[i].piao < 0){
                                _this.kwxgoldchangpiao();//金币场强制加漂
                            }
                            if(data.msgdata.info[i].trust){
                                _this.kwxtuoguan(true);//托管
                                break;
                            }
                        }
                    }
                }
                // begin = false并且你的ready是false的时候弹结算界面。
                else {
                    if(data.msgdata.info){
                        for (var i =0;i < data.msgdata.info.length; i++){
                            if(_this.game.modmgr.mod_login.logindata.uid == data.msgdata.info[i].uid){
                                if(data.msgdata.info[i].ready == false){
                                    _this.gamekwxend_info = data;
                                    if(_this.roominfo.type >= gameclass.gamegoldkwx){
                                        //金币场
                                        //_this.view.setreadybtn(true);
                                    }else {
                                        _this.kwxEnd();
                                    }
                                    break;
                                }else {
                                    //if (_this.roominfo.type >= gameclass.gamegoldkwx) {
                                        //金币场
                                        //_this.view.setreadybtn(false);
                                    //}
                                }
                            }
                        }
                    }
                }

                break;

            // 服务器广播加漂信息
            case "gamebets":
                cc.log("gamebets");
                _this.ongame_betpiao(data.msgdata);
                break;
            case "gameview":
                cc.log("gameview");
                _this.ongameview();
                break;
            case "dissmissroom":
                cc.log("dissmissroom");
                // 关闭前一个框，不关的话可能导致叠加。
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.exitroom",false);
                _this.game.uimgr.uis["gameclass.exitroom"].setData(_this,data.msgdata);
                break;
            case "nodissmissroom":
                cc.log("nodissmissroom");
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("有人不同意解散房间");
                break;
            case "gamedeal":
                cc.log("gamedeal");
                _this.rob(data.msgdata.uid,data.msgdata.ok);
                _this.ongamedealer(false);
                break;
            case "gamedealer":
                cc.log("gamedealer");
                for (var i =0;i < _this.gamekwxinfo.info.length; i++){
                    if(_this.gamekwxinfo.info[i].uid == data.msgdata.uid){
                        _this.gamekwxinfo.info[i].dealer = true;
                        _this.rob(data.msgdata.uid,true);
                    }
                }
                _this.ongamedealer(true);
                break;
            case "chatroom":
                //cc.log("chatroom");
                _this.chatlst[_this.chatlst.length] = data.msgdata;
                _this.chatshowinfo(data.msgdata);
                if (_this.game.uimgr.uis["gameclass.chatui"]) {
                    _this.game.uimgr.uis["gameclass.chatui"].pushstr(data.msgdata);
                }
                //if(_this.onchat){
                //    _this.onchat( data.msgdata);
                //}
                break;

            case "gamekwxstep":
                cc.log("gamekwxstep");
                _this.DisplayStepCard(data.msgdata);
                break;

            // 起牌
            case "gamekwx_draw":
                cc.log("gamekwx_draw");
                _this.DrawCard(data.msgdata);
                break;

            // 是否进行碰杠胡操作
            case "gamekwx_operator":
                cc.log("gamekwx_operator");
                _this.KwxOperator(data.msgdata);
                break;

            // 有人碰
            case "gamekwx_peng":
                cc.log("gamekwx_peng");
                _this.KwxPeng(data.msgdata);
                break;

            // 有人杠
            case "gamekwx_gang":
                cc.log("gamekwx_gang");
                _this.KwxGang(data.msgdata);
                break;

            // 有人擦杠
            case "gamekwx_cagang":
                _this.KwxCagang(data.msgdata);
                break;

            // 有人亮牌
            case "gamekwxview":
                cc.log("gamekwxviewcard");
                _this.kwxView(data.msgdata);
                break;

            // 杀马
            case "gamekwx_kill":
                _this.kwxKillMa(data.msgdata);
                break;
            case "gamekwxend":
                cc.log("gamekwxend");
                _this.isend = true;
                _this.gamekwxend_info = data;
                _this.begin = 0;
                _this.kwxEnd();
                break;
            //总结算
            case "gamekwxbye":
                cc.log("gamekwxbye",_this.isend);
                _this.isover = true;
                _this.gamebyekwxinfo = data.msgdata;
                if(_this.isend  && _this.roominfo.step == _this.roominfo.maxstep){
                }else{
                    _this.kwxAllEnd(data.msgdata);
                }
                _this.mywebsocket.onclosefunc = null;
                break;
            //离线
            case "lineperson":
                //_this.offline(data.msgdata);
                break;
            case "gamekwx_total":
                    _this.changetotal(data.msgdata);
                break;
            case "gameping":
                _this.kwxtablepingflag();
                break;
            case "gameline":
                var curIndex = _this.getPlayerIndexById(data.msgdata.uid);
                //cc.log(curIndex)
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
            //----------------------------金币场-----------------
            case "gametrust":
                cc.log("gametrust")
                _this.kwxtuoguan(data.msgdata.ok);
                break;
            case "gametime":
                cc.log("gametime")
                _this.view.kwxtuoguantime(data.msgdata);
                break;
        }
    });
};

gameclass.mod_kwx.prototype.getPlayerIndexById  =function(uid){
    for(var i = 0; i< this.persons.length; i++){
        if(this.persons[i] && this.persons[i].uid == uid){
            return i;
        }
    }
};

gameclass.mod_kwx.prototype.ongamekwxend = function(){
    this.game.uimgr.showui("gameclass.kwxResultoneui").setkwxmod(this);
};

gameclass.mod_kwx.prototype.updateroominfo = function(roominfo) {

    this.roominfo = roominfo;

    //cc.log(this.roominfo);

    if(this.roominfo.type >= gameclass.gamegoldkwx){
        var temptype = parseInt((this.roominfo.type - gameclass.gamegoldkwx)/10);
        if(temptype == 0){
            this.roominfo.golddifen = 50;
        }
        else if(temptype == 1){
            this.roominfo.golddifen = 100;
        }
        else if(temptype == 2){
            this.roominfo.golddifen = 200;
        }
        else if(temptype == 3){
            this.roominfo.golddifen = 300;
        }
        else if(temptype == 4){
            this.roominfo.golddifen = 500;
        }
        else if(temptype == 5){
            this.roominfo.golddifen = 1000;
        }
    }

    for (var i =0;i < this.roominfo.person.length; i++){
        this.roominfo.person[i].ready = false;
        this.roominfo.person[i].rob = 0;

        if (this.roominfo.person[i].uid == this.game.modmgr.mod_login.logindata.uid){
            this.serverchair = i;
            this.selfdata = this.roominfo.person[i];
        }
    }

    this.persons = this.offsetPlayer(this.roominfo.person);

};
/*
 * 将进房间的玩家 顺序排序
 * */
gameclass.mod_kwx.prototype.offsetPlayer = function(arr){
    var player = [];
    for(var i = 0;i < arr.length; i++ ){
        if(arr[i]!=null && arr[i].uid == this.game.modmgr.mod_login.logindata.uid) {
            this.order = i;
            break;
        }
    }
    //cc.log(arr,this.order);
    for (var x= 0;x< 3 ;x++ ){
        player[(3 + x - this.order) %3 ] = arr[x] ? arr[x] : null ;
    }
    return player;
};

gameclass.mod_kwx.prototype.ready = function(uid) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            this.roominfo.person[i].ready = true;
        }
    }
};

gameclass.mod_kwx.prototype.rob = function(uid,ok) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            if (ok)
                this.roominfo.person[i].rob = 1;
            else
                this.roominfo.person[i].rob = 2;
        }
    }
};

gameclass.mod_kwx.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_kwx.prototype.gameready = function() {
    var data = {};
    this.mywebsocket.send("gameready",data);
    this.ResetKwxDesk();
};

gameclass.mod_kwx.prototype.gameniuniubegin = function() {
    var data = {};
    this.mywebsocket.send("gameniuniubegin",data);
};

// 加漂
gameclass.mod_kwx.prototype.OnSendPiaoBet = function(num) {
    var data = {"bets":num};
    this.mywebsocket.send("gamebets",data);
};

gameclass.mod_kwx.prototype.gameview = function() {
    var data = {};
    this.mywebsocket.send("gameview",data);
};

gameclass.mod_kwx.prototype.gameend = function() {
    var data = {};
    this.mywebsocket.send("gameend",data);
};

gameclass.mod_kwx.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};

gameclass.mod_kwx.prototype.gamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_kwx.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};


gameclass.mod_kwx.prototype.getserverchair = function(cur) {
    return (this.serverchair + cur )%3;
};


gameclass.mod_kwx.prototype.getplayerdata = function(cur) {

    // LA 20161214 其实就是正确的位置获得正确的人，也就是一个次序问题。
    var desk = new Array();
    //order;  // 自己在列表中的序号
    //for(var i = 0;i < this.roominfo.person.length; i++ ){
    //
    //    if(this.roominfo.person[i]!=null && this.roominfo.person[i].uid == this.game.modmgr.mod_login.logindata.uid) {
    //        this.order = i;
    //        break;
    //    }
    //}

    //cc.log(this.order,this.roominfo.person)
    this.chairinfo = new Array();
    for (var i=0; i<3; i++)
    {
        var obj = new Object();
        obj.uid =0;
        obj.order = 0;
        obj.totalscore = 0;
        this.chairinfo.push(obj);
    }

    // 把自己的序号（也就是order）置为0。其他人取余，相应往后排。
    for (var j=0; j < this.roominfo.person.length; j++ ){
        desk[(3 + j - this.order) % 3] = this.roominfo.person[j];
        this.chairinfo[(3 + j - this.order) %3].order = j;  // 消息中的次序
    }

    // 这里需要注意的是：person里的次序是先后入座的顺序。desk是每个客户端显示的次序，自己永远是0，其他人根据person次序调整。
    // 座位号与uid的关联
    for (var k=0; k<3; k++)
    {
        if (desk[k] == null)
            continue;
        this.chairinfo[k].uid = desk[k].uid;
    }
    return desk[cur];
};

gameclass.mod_kwx.prototype.getplayerdatabyuid = function(uid) {

    for(var i = 0;i < this.roominfo.person.length; i++ ){
        if(this.roominfo.person[i].uid == uid){
            return this.roominfo.person[i];
        }
    }
    return null;
};
gameclass.mod_kwx.prototype.getplayerchair = function(uid) {

    for(var i = 0;i < this.chairinfo.length; i++ ){
        if(this.chairinfo[i]!=null && this.chairinfo[i].uid == uid) {
            return i;
        }
    }
};

gameclass.mod_kwx.prototype.getplayerotherdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair > this.gamekwxinfo.info.length) {
        return
    }

    return this.gamekwxinfo.info[serverchair];
};

gameclass.mod_kwx.prototype.ongameniuniucard = function(card) {
    for (var i =0;i < this.gamekwxinfo.info.length; i++){

        if (this.gamekwxinfo.info[i].uid == this.game.modmgr.mod_login.logindata.uid){
            this.gamekwxinfo.info[i].card[4] = card;
        }
    }
};

gameclass.mod_kwx.prototype.getplayernum = function() {
    return this.gamekwxinfo.info.length;
};

gameclass.mod_kwx.prototype.ongamestep = function(data) {
    this.mywebsocket.send("gamestep",data);
};

gameclass.mod_kwx.prototype.OnSendGuo = function() {
    this.mywebsocket.send("gameguo", {});
};

gameclass.mod_kwx.prototype.OnSendPeng = function() {
    this.mywebsocket.send("gamepeng", {});
};

gameclass.mod_kwx.prototype.OnSendGang = function(data) {
    this.mywebsocket.send("gamegang", data);
};

gameclass.mod_kwx.prototype.OnSendCagang = function(data) {
    this.mywebsocket.send("gamecagang", data);
};

gameclass.mod_kwx.prototype.OnSendHu = function() {
    this.mywebsocket.send("gamehu", {});
};

gameclass.mod_kwx.prototype.RequestView = function(data) {
    this.mywebsocket.send("gamekwxview", data);
};
gameclass.mod_kwx.prototype.Testcard = function(data) {
    this.mywebsocket.send("gamekwxneed", data);
};

gameclass.mod_kwx.prototype.sendGamePing = function(bool) {
    if(bool){
        if(this.mywebsocket) this.mywebsocket.send("gameping",{});
    }
    else{
        // this.gameSocketClose(false);
    }
};
gameclass.mod_kwx.prototype.gameSocketClose = function(bool) {
    if(bool)this.mywebsocket.ws.onclosefunc = null;
    this.mywebsocket.ws.close();
};


gameclass.mod_kwx.prototype.bindUI = function(ui) {
    this.view = ui;
};
gameclass.mod_kwx.prototype.sendcanceltuoguang = function(bool) {
    this.mywebsocket.send("gametrust", {"ok":bool});
};