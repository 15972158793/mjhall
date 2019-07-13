/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_goldNys = gameclass.mod_base.extend({
    roominfo:null,
    mywebsocket:null,
    serverchair:null,
    selfdata:null,
    isover:null,
    simpleOver:null,
    endinfo:null,
    gamestate:null,
    score:null,
    chatlst:null,
    uid:null,
    messageTime:null,
    socketArr:null,
    timestamp:null,

    ctor:function () {
        this.isover = false;
        this.gamestate = 0;
        this.chatlst = [];
        this.messageTime = [];
        this.socketArr = [];
        this._Headarr=["gamempqzbegin","gamedeal","gamedealer","gamebets","gamempqzend"];
        this.timestamp=0;
    }
});

gameclass.mod_goldNys.prototype.entergame = function(_roominfo,_mywebsocket){
    this.mywebsocket = _mywebsocket;
    this.updateroominfo(_roominfo);
    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws,data) {
        cc.log("---->"+data.msghead);
        //if(data.msghead == "gamempqzbegin"){
        //    _this.messageTime = [];
        //}
        //if(data.msghead == "gamempqzbegin" || data.msghead == "gamempqzcard" || data.msghead == "gamempqzend"){
        //    _this.messageTime.push(_this.view.timer);
        //    cc.log(_this.messageTime);
        //}
        //cc.log(_this.messageTime);

        //var nowtimestamp = _this.view.updataTimer;
        //cc.log(nowtimestamp);
        //if(_this.socketArr.indexOf(data.msghead)<0&&_this._Headarr.indexOf(data.msghead)>-1){
        //    _this.socketArr.push(data.msghead);
        //    if(Math.abs(_this.timestamp-nowtimestamp)<0.1){
        //        _this.checkIsReConnect();
        //    }
        //    if(_this._Headarr.indexOf(data.msghead)>-1){
        //        _this.timestamp=nowtimestamp;
        //    }
        //    _this.socketArr.splice(0,_this.socketArr.length-1);
        //}

        switch (data.msghead){
            case "gametime":
                _this.view._timerControl.startCount(data.msgdata.time);
                break;
            case "gamegoldtotal":
                _this.view.reflashAllMoeny(data.msgdata.info);
                break;
            case "roominfo":
                cc.log(data.msgdata);
                _this.updateroominfo(data.msgdata);
                _this.view.checkSafe(data.msgdata.person);
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
                if(_this.serverchair||_this.serverchair==0) {
                    _this.game.uimgr.closeui("gameclass.exitroom");
                    if (!_this.isover) {
                        _this.mywebsocket.onclosefunc = null;
                        _this.game.modmgr.mod_login.dissmissroom();
                    }
                }else {
                    _this.game.uimgr.closeui("gameclass.exitroom");
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
                for(var i=0;i<_this.roominfo.person.length;i++){
                    if(_this.roominfo.person[i].uid==data.msgdata.uid){
                        _this.roominfo.person[i].ready = true;
                        _this.view.onGameReady(data.msgdata.uid);
                        if(data.msgdata.uid==_this.uid){
                            _this.view.payScore.setVisible(false);
                            _this.view.isGameReadyShow(false);
                        }
                        break;
                    }
                }
                break;
            case "gamempqzbegin":
                cc.log(data.msgdata);
                _this.roominfo.step += 1;
                _this.roominfo.state = 1;
                _this.updatePlayerinfo(data.msgdata,true);
                _this.view.onGameNiuNiuBegin(data.msgdata);
                _this.view.runJuShuAction();
                _this.view.safeLayer.btn_safe.setVisible(false);
                break;
            case "gamegoldnninfo":
                cc.log(data.msgdata);
                _this.updatePlayerinfo(data.msgdata);
                _this.view._timerControl.startCount(data.msgdata.time);
                _this.view.checkSafe(_this.roominfo.person);
                if(data.msgdata.begin){
                    _this.view.safeLayer.btn_safe.setVisible(false);
                }
                break;
            case "gamebets":
                for(var i=0;i<_this.roominfo.person.length;i++){
                    if(_this.roominfo.person[i].uid==data.msgdata.uid){
                        _this.roominfo.person[i].bets = data.msgdata.bets;
                        _this.view.onGameBets(data.msgdata);
                        if(data.msgdata.uid==_this.uid){
                            _this.view.isGameBetsShow(false);
                        }
                        break;
                    }
                }
                break;
            case "gamempqzend":
                var _isViewArr=[];
                for(var i=0;i<_this.roominfo.person.length;i++){
                    _isViewArr[i]=_this.roominfo.person[i].view;
                }
                _this.updateroominfo(data.msgdata);
                _this.roominfo.state = 0;
                _this.view.onGameNiuNiuEnd(data.msgdata);
                for(var i=0;i<_this.roominfo.person.length;i++){
                    if(!_isViewArr[i]){
                        _this.view.onGameShowUserCard(_this.roominfo.person[i]);
                    }
                }

                break;
            case "roomseat":
                cc.log(data.msgdata);
                _this.updateroominfo(data.msgdata);
                _this.view.checkSafe(data.msgdata.person);
                break;
            case "gamempqzseat":
                _this.updatePlayerinfo(data.msgdata,true);
                break;
            case "gamempqzcard":
                cc.log(data.msgdata);
                _this.roominfo.state = 3;
                _this.view.stateImg.loadTexture(res.niuniuState3,ccui.Widget.LOCAL_TEXTURE);

                if(_this.view.gameType == 0 || _this.view.gameType == 2){
                    var playerdata=_this.getplayerdata(0);
                    for(var i=0;i < data.msgdata.card.length;i++){
                        playerdata.card[4-i]=data.msgdata.card[i];
                    }
                }else{
                    for(var i = 0;i < 5;i++){
                        var playerdata=_this.getplayerdata(i);
                        if(playerdata){
                            playerdata.card = data.msgdata.card;
                        }
                    }
                    _this.view.sendCard(data.msgdata.card);
                }

                break;
            case "gameview":
                cc.log(data.msgdata);
                data.msgdata.view=true;
                for(var i=0;i<_this.roominfo.person.length;i++){
                    if(_this.roominfo.person[i].uid==data.msgdata.uid){
                        _this.roominfo.person[i].view=true;
                        if(data.msgdata.uid==_this.uid){
                            _this.view.isShowLiangLayer(false);
                        }
                        break;
                    }
                }
                _this.view.onGameShowUserCard(data.msgdata);
                break;
            case "dissmissroom":
                if(_this.serverchair||_this.serverchair==0) {
                    _this.game.uimgr.closeui("gameclass.exitroom");
                    _this.game.uimgr.showui("gameclass.exitroom", false);
                    _this.game.uimgr.uis["gameclass.exitroom"].setData(_this, data.msgdata);
                }
                break;
            case "nodissmissroom":
                if(_this.serverchair||_this.serverchair==0){
                    _this.game.uimgr.closeui("gameclass.exitroom");
                    _this.game.uimgr.showui("gameclass.msgboxui");
                    _this.game.uimgr.uis["gameclass.msgboxui"].setString("有人不同意解散房间");
                }
                break;
            case "gamedeal":
                for(var i=0;i<_this.roominfo.person.length;i++){
                    if(_this.roominfo.person[i].uid==data.msgdata.uid){
                        _this.roominfo.person[i].robdeal = data.msgdata.score;
                        _this.view.onGameDeal(data.msgdata);
                        if(data.msgdata.uid==_this.uid){
                            _this.view.isShowQiangZhuang(false);
                        }
                        break;
                    }
                }
                break;
            case "gamedealer":
                _this.roominfo.state = 2;
                //_this.view.unscheduleAllCallbacks();
                _this.view._timeContain.setVisible(false);
                var isRanDomZhuang=false;
                var zhuangIndex=-1;
                for(var i =0;i < _this.roominfo.person.length; i++){
                    if(_this.roominfo.person[i].uid == data.msgdata.uid){
                        zhuangIndex=i;
                        break;
                    }
                }

                _this.roominfo.person[zhuangIndex].dealer = true;
                var _callBack=function(){
                    if(_this.roominfo.person[zhuangIndex].robdeal<=0){
                        var _obj={uid:data.msgdata.uid,card:1};
                        _this.roominfo.person[zhuangIndex].robdeal = 1;
                        _this.view.onGameDeal(_obj);
                    }
                }
                var _isRondom=false;
                for(var i =0;i < _this.roominfo.person.length; i++){
                    if(i != zhuangIndex &&_this.roominfo.person[i].robdeal==_this.roominfo.person[zhuangIndex].robdeal){
                        _isRondom=true;
                        _this.view.randomZhuangBlink(data.msgdata,_callBack);
                        isRanDomZhuang=true;
                        break;
                    }
                }
                if(!_isRondom){
                    _callBack();
                }
                if(!isRanDomZhuang){
                    _this.view.onGameDealer(data.msgdata);
                }
                break;
            case "gamempqzopen":
                cc.log(data.msgdata);
                var playerdata=_this.getplayerdata(0);
                playerdata.card = data.msgdata.card;
                _this.view.showOpenCard(data.msgdata);
                break;
            case "chatroom":
                _this.chatlst[_this.chatlst.length] = data.msgdata;
                _this.view.onchat( data.msgdata);
                break;
            case "lineperson":
                if(!_this.roominfo.person)return;
                for (var i =0;i < _this.roominfo.person.length; i++){
                    if(_this.roominfo.person[i].uid == data.msgdata.uid){
                        _this.roominfo.person[i].ip = "";
                        _this.game.uimgr.uis["gameclass.goldNysTable"].resetIcon(data.msgdata.uid);
                        break;
                    }
                }
                break;

            case "gameline":
                var curIndex = _this.getPlayerIndexById(data.msgdata.uid);
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
        }
    });
};



gameclass.mod_goldNys.prototype.updateroominfo = function(roominfo) {
    this.uid = this.game.modmgr.mod_login.logindata.uid;
    this.roominfo=this.roominfo||{};

    for(var i in roominfo){
        if(i=="person"){
            if(roominfo["person"]){
                this.roominfo["person"] = this.roominfo["person"]||[];
                for(var j=0;j < roominfo["person"].length;j++){

                    this.roominfo["person"][j]=this.roominfo["person"][j]||{};
                    for(var k in roominfo["person"][j]){
                        this.roominfo["person"][j][k]=roominfo["person"][j][k];
                        this.roominfo["person"][j]["seat"] = j;
                    }
                }
                while (this.roominfo["person"].length > roominfo["person"].length){
                    var obj=this.roominfo["person"].pop();
                    delete obj;
                }
            }else{
                this.roominfo["person"]=[];
            }
        }else if(i=="info"){
            for(var j=0;j < roominfo["info"].length;j++){
                this.roominfo["person"][j]=this.roominfo["person"][j]||{};
                for(var k in roominfo["info"][j]){
                    this.roominfo["person"][j][k]=roominfo["info"][j][k];
                }
            }
        }else{
            this.roominfo[i]=roominfo[i];
        }
    }
    if(!this.roominfo.person)return;
    for (var i = 0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == this.uid){
            this.serverchair = i;
            this.selfdata = this.roominfo.person[i];
        }
    }
    //cc.log("serverchair:"+this.serverchair);
    this.persons  =  this.offsetPlayer(this.roominfo.person);
    if(this.view)
        this.view.updataRoomUserInfo();
};

//gameclass.mod_goldNys.prototype.checkIsReConnect = function () {
//    if(this.view.gametype == 0){
//        if(this.socketArr[0]=="gamedeal" && this.socketArr[0]=="gamedealer") return false;
//    }
//    var _isreflashIndex=0;
//    for(var i=0;i< this.socketArr.length;i++){
//        if(this._Headarr.indexOf(this.socketArr[i]) > -1){
//            _isreflashIndex++;
//        }
//    }
//    if(_isreflashIndex > 1)  {
//        this.view.updataRoomUserInfo();
//        this.view.updatePlayerShow()
//    }
//}

gameclass.mod_goldNys.prototype.updatePlayerinfo = function(gameniuniuinfo,isNotConnect) {
    for(var i in gameniuniuinfo){
        if(i=="info"){
            for(var j=0;j<gameniuniuinfo["info"].length;j++){
                var _obj=gameniuniuinfo["info"][j];
                for(var m in _obj){
                    this.roominfo.person[j][m]=_obj[m];
                }
            }
        }else{
            this.roominfo[i]=gameniuniuinfo[i];
        }
    }
    if(this.roominfo.person){
        for(var i=0;i<this.roominfo.person.length;i++){
            if(this.roominfo.person[i].uid==this.uid){
                if(this.roominfo.state==0 &&!this.roominfo.person[i].ready){
                    if(this.serverchair==0&&this.roominfo.step==0){
                        //this.view.changeBeginShow();
                    }else{
                        this.view.isGameReadyShow(true);
                    }
                    break;
                }
            }
        }
    }
    this.view.updataRoomUserInfo();
    ////cc.log(this.serverchair,this.roominfo.state);
    if(!isNotConnect){
        this.view.updatePlayerShow();
    }
};
gameclass.mod_goldNys.prototype.ready = function(uid) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            this.roominfo.person[i].ready = true;
        }
    }
};

gameclass.mod_goldNys.prototype.rob = function(uid,num) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            this.roominfo.person[i].robdeal = num;
            var _obj={};
            _obj.uid=uid;
            _obj.score=num;
            this.view.onGameDeal(_obj);
        }
    }
};

gameclass.mod_goldNys.prototype.dissmissroom = function(num) {
    var data = {};
    if(this.roominfo.step==0){
        data={type:num};
    }
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_goldNys.prototype.gameready = function() {
    var data = {};
    this.mywebsocket.send("gameready",data);
};

gameclass.mod_goldNys.prototype.gameniuniubegin = function() {
    var data = {};
    this.mywebsocket.send("gameniuniubegin",data);
};
gameclass.mod_goldNys.prototype.bindUI = function(ui) {
    this.view = ui;
}

gameclass.mod_goldNys.prototype.gamebets = function(num) {
    var data = {"bets":Number(num)};
    this.mywebsocket.send("gamebets",data);
};
gameclass.mod_goldNys.prototype.gamedealer = function(num) {
    for(var i = 0;i < goldNiuMaxNum;i++){
        if (i < this.roominfo.person.length){
            if (this.uid == this.roominfo.person[i].uid){
                this.roominfo.person[i].robdeal = num;
            }
        }
    }
    var data = {"score":Number(num)};
    this.mywebsocket.send("gamedealer",data);
};
gameclass.mod_goldNys.prototype.gameview = function() {
    this.mywebsocket.send("gameview");
};

gameclass.mod_goldNys.prototype.gameend = function() {
    var data = {};
    this.mywebsocket.send("gameend",data);
};

gameclass.mod_goldNys.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};
gameclass.mod_goldNys.prototype.gameseat = function() {
    var data = {};
    this.mywebsocket.send("gameseat",data);
};
gameclass.mod_goldNys.prototype.gamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_goldNys.prototype.chat = function(type,info,hitUid) {
    var data = {"type":type,"chat":info,"hitUid":hitUid};
    this.mywebsocket.send("chatroom",data);
};

gameclass.mod_goldNys.prototype.sendOpen = function(){
    this.mywebsocket.send("gameopen",{});
};

gameclass.mod_goldNys.prototype.getserverchair = function(cur) {
    // //cc.log(this.serverchair,cur );

    return (this.serverchair + cur ) % goldNiuMaxNum;
};

gameclass.mod_goldNys.prototype.getplayerdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if(this.serverchair != null){
        if(serverchair >= goldNiuMaxNum){
            serverchair -= goldNiuMaxNum;
        }
    }else{
        serverchair = serverchair + this.roominfo.person.length;
        if(serverchair >= goldNiuMaxNum){
            serverchair -= goldNiuMaxNum;
        }
    }
    return this.roominfo.person[serverchair];
};

gameclass.mod_goldNys.prototype.getplayerdatabyuid = function(uid) {

    for(var i = 0;i < this.roominfo.person.length; i++ ){
        if(this.roominfo.person[i].uid == uid){
            return this.roominfo.person[i];
        }
    }
};


gameclass.mod_goldNys.prototype.ongameniuniucard = function(cardArr, all) {
    for (var i =0;i < this.roominfo.person.length; i++){

        if (this.roominfo.person[i].uid == this.uid){
            for(var j=0;j<cardArr.length;j++){
                this.roominfo.person[i].card.push(cardArr[j]);
            }
            if (all) {
                this.roominfo.person[i].card = all;
            }
            break;
        }
    }
};
//炸弹 300
//五花牛 200
//五小牛 100
//没牛 0
//判断牛的方法
gameclass.mod_goldNys.prototype.ongetNiu = function(cardDataArr) {
    //cc.log(cardDataArr);
    //cardDataArr = [101,111,121,131,11];
    var runturnObj={};
    var abcd = ["a","d","b","c"];
    var cardArr=[];
    var type = [];
    for(var i=0;i<cardDataArr.length;i++){
        cardArr[i]=parseInt(cardDataArr[i]/10);
        type[i] = abcd[cardDataArr[i]%10 - 1];
    }
    runturnObj.type=0;
    runturnObj.cardArr=[];
    cardArr.sort(function (a,b) {
        return a-b;
    })
    //======================================
    var aa = 0;
    var bb = 0;
    for(var i = 1;i < 5;i++){
        if(cardArr[i]-cardArr[i-1] == 1){
            aa++;//顺
        }
        if(type[i] == type[i-1]){
            bb++;//同花
        }
    }
    //=========================================
    //顺金牛
    if(aa == 4 && bb == 4){
        runturnObj.type = 800;
        return runturnObj;
    }
    if(cardArr[0] == 1 && cardArr[1] == 10 && cardArr[2] == 11 && cardArr[3] == 12 && cardArr[4] == 13){//1可以和10，J,Q,K成顺子
        runturnObj.type = 200;
        if(bb==4){
            runturnObj.type = 800;
        }
        return runturnObj;
    }
    //炸弹牛
    if(cardArr[0]==cardArr[3]||cardArr[1]==cardArr[4]){
        runturnObj.type = 700;//炸弹
        return runturnObj;
    }
    //葫芦牛。三带二
    if(cardArr[0] == cardArr[2] && cardArr[3] == cardArr[4] && cardArr[2] != cardArr[3]){
        runturnObj.type = 600;
        return runturnObj;
    }
    if(cardArr[0] == cardArr[1] && cardArr[2] == cardArr[4] && cardArr[1] != cardArr[2]){
        runturnObj.type = 600;
        return runturnObj;
    }
    //五小牛
    if(cardArr[4] < 5){
        var _totalNum=0;//五小牛
        for(var i=0;i<cardArr.length;i++){
            _totalNum+=cardArr[i];
        }
        if(_totalNum<=10) {
            runturnObj.type=500;
            return runturnObj;
        }
    }
    //
    if(bb == 4){
        runturnObj.type = 400;//同花牛
        return runturnObj;
    }
    if(cardArr[0] >= 11){//五花牛
        runturnObj.type=300;
        return runturnObj;
    }
    if(aa == 4){
        runturnObj.type = 200;//顺子牛
        return runturnObj;
    }
    //-----------------------------------------------------------

    var _niuArr=[];
    for(var i=0;i<cardArr.length;i++){
        for(var j=i+1;j<cardArr.length;j++){
            for(var k=j+1;k<cardArr.length;k++){
                var num1=cardArr[i]>10?10:cardArr[i];
                var num2=cardArr[j]>10?10:cardArr[j];
                var num3=cardArr[k]>10?10:cardArr[k];
                if((num1+num2+num3)%10==0){
                    _niuArr=[cardArr[i],cardArr[j],cardArr[k]];
                }
            }
        }
    }
    if(!_niuArr.length) return runturnObj;
    runturnObj.cardArr=_niuArr;
    for(var i=0;i<_niuArr.length;i++){
        for(var j=0;j<cardArr.length;j++){
            if(cardArr[j]==_niuArr[i]){
                cardArr[j]=0;
                break;
            }
        }
    }
    var totalNum=0;
    for(var i=0;i<cardArr.length;i++){
        var _num=cardArr[i]>10?10:cardArr[i];
        totalNum+=_num;
    }
    if(totalNum%10==0){
        runturnObj.type=100;
    }else{
        runturnObj.type=totalNum%10+90;
    }
    return runturnObj;
};

gameclass.mod_goldNys.prototype.offsetPlayer = function(arr){
    var player = [];
    for (var x = 0;x < 5 ;x++ ){
        player[(5 + x - this.serverchair) %5 ] = arr[x] ? arr[x] : null ;
    }
    return player;
};

gameclass.mod_goldNys.prototype.getPlayerIndexById  =function(uid){
    for(var i = 0; i< this.persons.length; i++){
        if(this.persons[i] && this.persons[i].uid == uid){
            return i;
        }
    }
};




