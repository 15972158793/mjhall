/**
 * Created by Administrator on 2018-1-3.
 */

gameclass.mod_pdk = gameclass.mod_base.extend({
    myUid:0,
    maxNum:0,//游戏开始时候的人数
    begin:false,

    ctor:function () {
        this.begin = false;
    },

    bindUI : function(ui) {
        this.view = ui;
    },

    //服务器返回的消息
    entergame:function (_roominfo,_mywebsocket) {
        this.roominfo = _roominfo;
        cc.log(_roominfo);
        this.mywebsocket = _mywebsocket;
        this.myUid = this.game.modmgr.mod_login.logindata.uid;
        this.updateroominfo(this.roominfo);
        var difenArr = [50,100,200,300,500,1000];
        this.difen = difenArr[parseInt((this.roominfo.type-80000)/10)%10];
        cc.log("底分:"+this.difen);
        this.maxNum = (this.roominfo.type % 10 == 1 ? 2: 3);
        cc.log("游戏人数:"+this.maxNum);

        var _this = this;
        _this.mywebsocket.setonmsgfunc(function (ws,data) {
            cc.log("LVXIN_DATA",data);
            switch (data.msghead){
                case "gamegoldpdkinfo":
                    _this.updateGameInfo(data.msgdata);
                    _this.view.checkSafe(_this.roominfo.person);
                    if(data.msgdata.begin){
                        _this.view.safeLayer.btn_safe.setVisible(false);
                    }
                    _this.view.getTime(data.msgdata.time);
                    break;
                case "gamegoldpdkbegin":
                    _this.begin = true;
                    _this.gameBegin(data.msgdata);
                    _this.updateGameInfo(_this.roominfo);
                    var curIndex = _this.getPlayerIndexById(data.msgdata.curstep);
                    var dealArr = [];
                    var msgInfo =  _this.offsetPlayer(data.msgdata.info);
                    for(var i = 0;i < _this.maxNum;i++){
                        dealArr.push( msgInfo[i].card);
                    }
                    _this.view.startGame(curIndex,dealArr);
                    break;
                case "gametime":
                    _this.view.getTime(data.msgdata.time);
                    break;
                case "gamegoldpdkstep":
                    _this.onSendCard(data.msgdata);
                    break;
                case "roominfo":
                    _this.updateroominfo(data.msgdata);
                    _this.view.updatePlayerinfo(_this.persons);
                    _this.view.checkSafe(data.msgdata.person);
                    break;
                case "joinroomfail":
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                    break;
                case "exitroom":
                    _this.game.uimgr.closeui("gameclass.exitroom");
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                    break;
                case "tickroom":
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.backlogin();
                    _this.game.uimgr.showui("gameclass.msgboxui");
                    _this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                    break;
                case "gameready":
                    _this.onReady(data.msgdata);
                    break;
                case "gamegoldpdkend":
                    _this.begin = false;
                    _this.onSimpleEnd(data.msgdata);
                    break;
                case "dissmissroom":
                    _this.game.uimgr.closeui("gameclass.exitroom");
                    _this.game.uimgr.showui("gameclass.exitroom");
                    _this.game.uimgr.uis["gameclass.exitroom"].setData(_this,data.msgdata);
                    break;
                case "nodissmissroom":
                    _this.game.uimgr.closeui("gameclass.exitroom");
                    _this.game.uimgr.showui("gameclass.msgboxui");
                    _this.game.uimgr.uis["gameclass.msgboxui"].setString("有人不同意解散房间");
                    break;
                case "chatroom":
                    var curTalkIndex = _this.getPlayerIndexById(data.msgdata.uid);
                    _this.view.chatshowinfo(curTalkIndex,data.msgdata);
                    break;
                case "lineperson":
                    //if(_this.gamestate == 1){
                    //    var curIndex = _this.getPlayerIndexById(data.msgdata.uid);
                    //    _this.view.userLineOut(curIndex,_this.persons[curIndex]);
                    //}
                    break;
                case "gametrust":
                    _this.onTuoguan(data.msgdata);
                    break;
                case "gamegoldtotal":
                    _this.view.reflashAllMoeny(data.msgdata);
                    break;
            }
        });
    },

    //==============================给服务端发消息====================================
    sendGameReady : function() {
        this.mywebsocket.send("gameready",{});
    },

    dissmissroom:function(num){
        var data = {};
        if(this.roominfo.step == 0){
            data={type:num};
        }
        this.mywebsocket.send("dissmissroom",data);
    },

    nodissmissroom:function(){
        var data = {};
        this.mywebsocket.send("nodissmissroom",data);
    },

    sendBets:function(_bets){
        var data = {"bets":Number(_bets)};
        this.mywebsocket.send("gamebets",data);
    },

    sendCard:function(data){
        var data = {"cards":data};
        cc.log("出牌")
        cc.log(data);
        this.mywebsocket.send("gamesteps",data);
    },

    sendcanceltuoguang:function(bool) {
        this.mywebsocket.send("gametrust", {"ok":bool});
    },

    chat:function(type,info){
        var data = {"type":type,"chat":info};
        this.mywebsocket.send("chatroom",data);
    },

    //============================接受服务端消息==========================================
    //有人准备
    onReady:function(data){
        this.roominfo.person[this.getSeverChairById(data.uid)].ready = true;
        var index = this.getPlayerIndexById(data.uid);
        this.view.onReady(index);
    },

    //自己托管
    onTuoguan:function(data){
        this.view.onTuoguan(data.ok);
    },

    //有人出牌
    onSendCard:function(data){
        var controlIndex = this.getPlayerIndexById(data.curstep);
        var sendIndex = this.getPlayerIndexById(data.uid);
        this.view.onSendCard(controlIndex,sendIndex,data.cards);
    },

    //单局结束
    onSimpleEnd:function(data){
        for(var i = 0;i < this.maxNum;i++){
            if(this.roominfo.person[i]){
                this.roominfo.person[i].ready = false;
            }
        }
        this.persons = this.offsetPlayer(this.roominfo.person);
        var info = this.offsetPlayer(data.info);
        this.view.onSimpleEnd(info);
    },

    //======================================================================================
    updateroominfo : function(roominfo) {
        this.getCurPlayerIndex(roominfo.person,this.myUid);
        for(var i in roominfo){
            if(i=="person"){
                if(roominfo["person"]){
                    if (this.roominfo["person"].length > roominfo["person"].length){
                        for(var m = 0; m < this.roominfo["person"].length;m++){
                            var count = 0;
                            for(var mm = 0;mm < roominfo["person"].length;mm++){
                                if(this.roominfo["person"][m].uid == roominfo["person"][mm].uid){
                                    break;
                                }else{
                                    count++;
                                }
                                if( count == roominfo["person"].length){
                                    this.roominfo["person"].splice(m,1);
                                }
                            }
                        }
                    }
                    this.roominfo["person"] = this.roominfo["person"]||[];
                    for(var j=0;j < roominfo["person"].length;j++){
                        this.roominfo["person"][j]=this.roominfo["person"][j]||{};
                        for(var k in roominfo["person"][j]){
                            this.roominfo["person"][j][k]=roominfo["person"][j][k];
                        }
                    }
                }else{
                    this.roominfo["person"]=[];
                }
            }else{
                this.roominfo[i]=roominfo[i];
            }
        }
        this.persons  =  this.offsetPlayer(this.roominfo.person);
        cc.log(this.persons);
    },

    updateGameInfo : function(gameInfo) {
        this.gameInfo = gameInfo;
        if(this.gameInfo.info && this.gameInfo.info.length > 0){
            for(var i = 0;i < this.roominfo.person.length;i++){
                for(var j = 0;j < this.gameInfo.info.length;j++){
                    if(this.gameInfo.info[i].uid == this.roominfo.person[j].uid){
                        this.roominfo.person[i].ready = this.gameInfo.info[i].ready;
                        break;
                    }
                }
            }
        }
        this.persons  =  this.offsetPlayer(this.roominfo.person);
        //cc.log(this.persons);
        this.view.updatePlayerinfo(this.persons);
        this.view.setRoominfo(this.maxNum);
        if(this.gameInfo.begin != null){
            this.begin = this.gameInfo.begin;
        }
        if(gameInfo.begin){
            this.gameBegin(gameInfo);
            this.handerGameInfo(gameInfo);
        }
    },

    gameBegin : function(data){
        var playerInfo  =  this.offsetPlayer(data.info);
        this.view.gameReady(playerInfo);
    },

    //通过ID 找到索引位置
    getCurPlayerIndex : function(arr,uid){
        for(var x = 0; x < arr.length ;x++){
            if(!arr[x]){
                continue;
            }
            if(arr[x].uid == uid){
                this.curPlayerIndex = x;
                break;
            }
        }
        return this.curPlayerIndex;
    },

    //将进房间的玩家 顺序排序
    offsetPlayer : function(arr){
        var player = [];
        for (var x = 0;x < this.maxNum ; x++ ){
            player[(this.maxNum + x - this.curPlayerIndex) % this.maxNum ] = arr[x] ? arr[x] : null ;
        }
        return player;
    },
    //根据UID获取玩家信息
    getplayerdatabyuid:function(uid){
        for(var i = 0;i < this.roominfo.person.length; i++ ){
            if(this.roominfo.person[i].uid == uid){
                return this.roominfo.person[i];
            }
        }
    },
    //根据玩家的UID获取玩家座位号
    getPlayerIndexById  :function(uid){
        for(var i = 0; i < this.persons.length; i++){
            if(this.persons[i] && this.persons[i].uid == uid){
                return i;
            }
        }
    },
    //获取服务器位置
    getSeverChairById:function(uid){
        for(var i = 0;i < this.roominfo.person.length;i++){
            if(this.roominfo.person[i].uid == uid){
                return i;
            }
        }
    },

    //处理断线重连游戏数据
    handerGameInfo:function(data){
        var msgInfo =  this.offsetPlayer(data.info);
        var handCard = [];
        for(var i = 0;i < this.maxNum;i++){
            handCard.push(msgInfo[i].card);
        }
        this.view.onDealCards(handCard);
        var controlIndex = this.getPlayerIndexById(data.curstep);
        var lastSendIndex = -1;
        //如果存在上一个打牌的人
        if(data.befstep > 0){
            lastSendIndex = this.getPlayerIndexById(data.befstep);
            if(controlIndex != lastSendIndex){
                this.view.showLastSendCard(lastSendIndex,data.lastcard);
            }
        }else{
            lastSendIndex = 0;
        }
        this.view.zhuangjiaIndex = lastSendIndex;
        this.view.showControlTime(this.getPlayerIndexById(data.curstep));
        this.view.tuoguanLayer.setVisible(msgInfo[0].trust);
        this.view.myTrust = msgInfo[0].trust;
        if(controlIndex == 0){
            this.view.outControlLayer.setVisible(true);
            //var bool = (controlIndex==lastSendIndex);
            //this.view.setNoOutState(!bool);
            if(this.view.zhuangjiaIndex != 0 && !this.view.myTrust){
                this.view.checkNeedOut();
            }
        }

    },
});
