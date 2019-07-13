/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_sdb = gameclass.mod_base.extend({
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
    isend:false,
    endinfo:null,
    gamestate:null,
    score:null,
    ongamedealer:null,
    chatlst:null,
    ctor:function () {
        this.isover = false;
        this.isend = false;
        this.gamestate = 0;
        this.chatlst = [];
    }
});

gameclass.mod_sdb.prototype.entergame = function(_roominfo,_mywebsocket){
    //{\"roomid\":351846,\"person\":[{\"openid\":\"59ef6e332117175342041f0e5e90dace\",\"name\":\"游客\",\"imgurl\":\"\",\
    // "ip\":\"221.234.240.2\",\"line\":true}],\"time\":0,\"agree\":[]}"}
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;
    this.updateroominfo(this.roominfo);

    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws,data) {
        //cc.log(data);
        switch (data.msghead){
            case "roominfo":

                // _this.updateroominfo(data.msgdata);
                //_this.onupdateroominfo(data.msgdata);

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
            case "gametenhalfbegin":
                _this.isend = false;
                cc.log("gametenhalfbegin");
                _this.gameBegin(data.msgdata);
                _this.view.safeLayer.btn_safe.setVisible(false);
                break;

            case "gametenhalfplay":

                _this.curPlayerUid = data.msgdata.curstep;
                var curIndex = _this.getPlayerIndexById(data.msgdata.curstep);
                var sendIndex =  _this.getPlayerIndexById(data.msgdata.uid);

                if(curIndex !== sendIndex){//换玩家了
                    _this.view.haveCard_Btn.setEnabled(false);
                    _this.view.haveCard_Btn.setBright(false);
                    _this.view.dontCard_Btn.setEnabled(false);
                    _this.view.dontCard_Btn.setBright(false);
                    mod_sound.playeffect(g_music.sdb_dontCard,false);
                    _this.view.setCurPlayer( curIndex );
                    if(data.msgdata.curstep != _this.bankerUid){
                        _this.view.openBetLayout();
                    }else {
                        if(curIndex == 0){
                            _this.view.haveCard_Btn.setEnabled(true);
                            _this.view.haveCard_Btn.setBright(true);
                            _this.view.dontCard_Btn.setEnabled(true);
                            _this.view.dontCard_Btn.setBright(true);
                        }
                    }

                }

                if(data.msgdata.card.length > 1 && curIndex == sendIndex){
                    mod_sound.playeffect(g_music.sdb_wantCard,false);
                }
                var cardType = -1;
                //是否需要计算牌型
                if( data.msgdata.card[0] > 0 ){
                    cardType = gameclass.mod_sdb.bombComputer( data.msgdata.card );
                    //判断是自己
                    if(curIndex == 0 ){
                        if(curIndex == sendIndex){
                            _this.view.haveCard_Btn.setEnabled(cardType === 1);
                            _this.view.haveCard_Btn.setBright(cardType === 1);
                        }
                    }
                    if( cardType !== 1 && ( sendIndex !== 0 && sendIndex !== _this.bankerUid) ){
                        _this.view.runPlayerEndAction(sendIndex);
                        // alert('闲家大牌');
                        //要亮闲家牌了
                        /***
                         *  大家来填空
                         *
                         * **/
                    }

                }

                //发牌
                _this.view.sendCards( sendIndex , data.msgdata.card , function(){
                    if( data.msgdata.card[0] > 0 &&  curIndex == 0 && curIndex == sendIndex && cardType == 0){
                        _this.view.runSelfCardType();
                    }
                    if(sendIndex == 0 && curIndex !== sendIndex){
                        _this.view.runSelfCardType();
                    }

                } );

                break;
            case "gametenhalfend":
                _this.isend = true;
                _this.isReady = false;
                for(var  i = 0 ; i < data.msgdata.info.length ;i++){
                    for(var j=0;j<_this.persons.length ; j++){
                        if(_this.persons[j] && data.msgdata.info[i].uid == _this.persons[j].uid ){
                            data.msgdata.info[i].name = _this.persons[j].name;
                            data.msgdata.info[i].head =  _this.persons[j].imgurl;
                        }
                    }

                }
                var arr = _this.offsetPlayer(data.msgdata.info);
                _this.view.gameEnd(arr,data.msgdata.info,_this.roominfo);
                for(var j=0;j<_this.persons.length ; j++){
                    if(_this.persons[j]  ){
                        _this.persons[j].ready = false;
                    }
                }

                break;

            case "gametenhalfbye":
                _this.isover=true;
                _this.mywebsocket.onclosefunc = null;

                for(var  i = 0 ; i < data.msgdata.info.length ;i++){
                    for(var j=0;j<_this.persons.length ; j++){
                        if(_this.persons[j] && data.msgdata.info[i].uid == _this.persons[j].uid ){
                            data.msgdata.info[i].name = _this.persons[j].name;
                            data.msgdata.info[i].head =  _this.persons[j].imgurl;
                        }
                    }
                }
                _this.endinfo = data.msgdata.info;
                if (_this.endinfo){
                    if(_this.isend && _this.roominfo.step == _this.roominfo.maxStep){}
                    else {
                        _this.view.gameBye();
                    }
                }
                _this.isend = false;
                break;

            case "gametenhalfinfo":

                _this.isend = false;
                _this.updateGameInfo(data.msgdata);
                if(data.msgdata.begin){
                    _this.view.safeLayer.btn_safe.setVisible(false);
                }

                break;
            case "gamebets":

                cc.log("gamebets");
                //cc.log(data.msgdata);
                _this.view.showBetImg(_this.getPlayerIndexById(data.msgdata.uid),data.msgdata.bets ,data.msgdata.card );

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
                _this.ongamedealer(false);
                break;

            case "chatroom":
                _this.chatlst[_this.chatlst.length] = data.msgdata;

                if (_this.game.uimgr.uis["gameclass.chatui"])
                    _this.game.uimgr.uis["gameclass.chatui"].pushstr(data.msgdata);
                _this.getPlayerIndexById(data.msgdata.uid);
                _this.view.onChat(_this.getPlayerIndexById(data.msgdata.uid),data.msgdata);

                break;
            case "lineperson":
            case "gameline":
                var curIndex = _this.getPlayerIndexById(data.msgdata.uid);
                //cc.log(curIndex)
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
        }
    });
};

/*
 * gametenhalfbegin data
 * */

gameclass.mod_sdb.prototype.gameBegin  =function(data){

    if(!data.begin){
        return false;
    }
    //cc.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk" , this.isReady);
    this.gameStart = this.isReady = true;

    this.roominfo.step += 1;
    this.curPlayerUid = data.curstep;
    this.view.setCurPlayer(this.getPlayerIndexById(data.curstep));
    var playerInfo  =  this.offsetPlayer(data.info);
    this.bankerUid = 0;
    for(var i=0; i<playerInfo.length; i++){
        if(playerInfo[i] && playerInfo[i].dealer){
            this.bankerUid = playerInfo[i].uid;
        }
    }

    this.view.gameReady(playerInfo,this.roominfo);
    //this.banker =
}


/*
 * 发送玩家选择的倍数
 * */
gameclass.mod_sdb.prototype.setPlayerBet  =function(bet){
    var data = {
        uid:this.curPlayerUid,
        bets:bet,
    };
    this.mywebsocket.send("gamebets",data);
}

/*
 * 发送玩家是否选择要牌
 * */
gameclass.mod_sdb.prototype.askCards =function(bAsk){

    var data = {
        type:bAsk ? 0 : 1
    };
    this.mywebsocket.send("gameplay",data) ;
}


gameclass.mod_sdb.prototype.getPlayerIndexById  =function(uid){
    for(var i = 0; i< this.persons.length; i++){
        if(this.persons[i] && this.persons[i].uid == uid){
            return i;
        }
    }
}


gameclass.mod_sdb.prototype.bindUI = function(ui) {
    this.view = ui;
}
gameclass.mod_sdb.prototype.updateroominfo = function(roominfo) {

    this.roominfo = {
        agree:roominfo.agree,
        maxStep:roominfo.maxstep,
        bankerType:parseInt(roominfo.param1/100),           //房主庄或赢家庄
        mulripleType:parseInt((roominfo.param1/10)%10),
        betType:parseInt(roominfo.param1%10),               //十点半x2或十点半x3
        roomid:roominfo.roomid,
        step:roominfo.step,
        time:roominfo.time,
        type:roominfo.type,
        person:roominfo.person
    };

    //cc.log(this.roominfo);

    this.persons =  roominfo.person;
    this.getCurPlayerIndex(this.persons,this.game.modmgr.mod_login.logindata.uid);
    this.persons  =  this.offsetPlayer(this.persons);
    if (this.roominfo.time != 0){
        this.game.uimgr.showui("gameclass.exitroom",false);
        this.game.uimgr.uis["gameclass.exitroom"].setData(this,this.roominfo);
    }
};

gameclass.mod_sdb.prototype.joinRoomInfo = function(data){
    //cc.log('joinRoomInfo');
    //cc.log(data.person);
    this.roominfo.person = data.person;
    this.getCurPlayerIndex( data.person,this.game.modmgr.mod_login.logindata.uid);
    data = this.offsetPlayer(data.person);
    this.view.checkSafe(this.roominfo.person);

    for(var i=0 ;i< data.length ;i++ ){
        for(var j=0 ;j<  this.persons.length ;j++){
            if(this.persons[j] && data[i] &&  data[i].uid ==  this.persons[j].uid ){
                data[i].ready = this.persons[j].ready;
                //cc.log( i + ":::::::::::::" + this.persons[j].ready);
            }
        }
    }
    for(var i=0 ;i< data.length ;i++ ){
        if(data[i]){
            if(!data[i].ready){
                data[i].ready = false;
            }
            if(this.isReady){
                data[i].ready = false;
            }
        }
    }
    this.persons = data;

    this.view.updatePlayerinfo(this.persons);
    this.view.refreshStep(this.roominfo);
};

gameclass.mod_sdb.prototype.isEnd = function(){
    return this.roominfo.step >= this.roominfo.maxStep;
}

gameclass.mod_sdb.bombComputer = function(cards){

    var point = 0;
    for( var i =0 ;i<  cards.length ; i++){
        var temp =  parseInt( cards[i] / 10);
        temp = temp > 10 ? 0.5 : temp;
        point +=temp;
    }
    var type = 0;  // 0 :爆牌  1：高牌   2：十点半  3: 五小  4：花五小  5：天王
    if( point >= 11 ){
        type = 0;;
    }else if(point <= 10 && cards.length < 5){
        type = 1;
    }else if(point > 10  &&  cards.length < 5){
        type = 2;
    }else if(point >= 3  && point <= 10 &&  cards.length == 5){
        type = 3;
    }else if(point < 3 && cards.length == 5 ){
        type = 4;
    }else if(point > 10 && cards.length == 5 ){
        type = 5;
    }
    return type;
}

/*
 *通过ID 找到索引位置
 * */
gameclass.mod_sdb.prototype.getCurPlayerIndex = function(arr,uid){

    for(var x = 0;x<  5 ;x++){
        if(!arr[x]){
            continue;
        }
        if(arr[x].uid == uid){
            this.curPlayerIndex = x;
            break;
        }
    }
    return this.curPlayerIndex;
}

/*
 * 将进房间的玩家 顺序排序
 * */
gameclass.mod_sdb.prototype.offsetPlayer = function(arr){
    var player = [];

    for (var x= 0;x< 5 ;x++ ){
        player[(5 + x - this.curPlayerIndex) %5 ] = arr[x] ? arr[x] : null ;
    }
    return player;
}


gameclass.mod_sdb.prototype.updateGameInfo = function(gameInfo) {
    this.gameInfo = gameInfo;
    var _this=this;
    this.view.checkSafe(this.roominfo.person);
    if(this.gameInfo.ready.length > 0 ){
        cc.each(this.gameInfo.ready,function(o){
            var index = _this.getPlayerIndexById(o);
            if(_this.persons[index]){
                _this.persons[index].ready = true;
            }

        });
    }else{
        for(var  i = 0; i< this.persons.length ; i++){
            if( this.persons[i]){
                this.persons[i].ready = false;
            }
        }
    }
    this.view.updatePlayerinfo(this.persons);
    this.view.setRoomInfo(this.roominfo);
    if(gameInfo.begin || this.roominfo.step !== 0 ){
        this.reconnection();
        return;
    }

};

gameclass.mod_sdb.prototype.reconnection = function(){

    if(this.gameInfo.begin){
        for(var  i = 0; i< this.persons.length ; i++){
            if( this.persons[i]){
                this.persons[i].ready = false;
            }
        }
        this.roominfo.step --;
        this.gameBegin(this.gameInfo);
    }else {
        var playerInfo  =  this.offsetPlayer(this.gameInfo.info);
        this.bankerUid = 0;
        for(var i=0; i<playerInfo.length; i++){
            if(playerInfo[i] && playerInfo[i].dealer){
                this.bankerUid = playerInfo[i].uid;
            }
        }
        this.view.reconnection(playerInfo,this.roominfo , this.persons);
    }


};





gameclass.mod_sdb.prototype.ready = function(uid) {


    for (var i =0;i < this.persons.length; i++){
        if (this.persons[i] && this.persons[i].uid == uid){
            this.persons[i].ready = true;
            this.view.showReady(i);
        }
    }

};

gameclass.mod_sdb.prototype.rob = function(uid,ok) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            if (ok)
                this.roominfo.person[i].rob = 1;
            else
                this.roominfo.person[i].rob = 2;
        }
    }
};

gameclass.mod_sdb.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_sdb.prototype.gameready = function() {
    var data = {};
    this.mywebsocket.send("gameready",data);
};



gameclass.mod_sdb.prototype.gamebets = function(num) {


    var data = {"bets":Number(num)};
    this.mywebsocket.send("gamebets",data);
};

gameclass.mod_sdb.prototype.gamecompare = function(index) {

    playerdata = this.getplayerdata(index)
    if (index >0 && playerdata != null){
        var destuid = playerdata.uid;
        var data = {"destuid":Number(destuid)};
        this.mywebsocket.send("gamecompare",data);
    }

};

gameclass.mod_sdb.prototype.gameview = function() {
    var data = {};
    this.mywebsocket.send("gameview",data);
};

gameclass.mod_sdb.prototype.gameend = function() {
    var data = {};
    this.mywebsocket.send("gameend",data);
};

gameclass.mod_sdb.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};

gameclass.mod_sdb.prototype.gamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_sdb.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};


gameclass.mod_sdb.prototype.getserverchair = function(cur) {
    return (this.serverchair + cur )%5;
};


gameclass.mod_sdb.prototype.getplayerdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair > this.roominfo.person.length) {
        return
    }

    return this.roominfo.person[serverchair];
};

gameclass.mod_sdb.prototype.getplayerdatabyuid = function(uid) {

    for(var i = 0;i < this.roominfo.person.length; i++ ){
        if(this.roominfo.person[i].uid == uid){
            return this.roominfo.person[i];
        }
    }
};




