/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_jxnn = gameclass.mod_base.extend({
    roominfo:null,
    mywebsocket:null,
    serverchair:null,
    selfdata:null,
    isover:null,
    endinfo:null,
    gamestate:null,
    score:null,
    chatlst:null,
    uid:null,
    ctor:function () {
        this.isover = false;
        this.gamestate = 0;
        this.chatlst = [];
    }
});

gameclass.mod_jxnn.prototype.entergame = function(_roominfo,_mywebsocket){
    //{\"roomid\":351846,\"person\":[{\"openid\":\"59ef6e332117175342041f0e5e90dace\",\"name\":\"游客\",\"imgurl\":\"\",\
    // "ip\":\"221.234.240.2\",\"line\":true}],\"time\":0,\"agree\":[]}"}
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;
    this.updateroominfo(this.roominfo);
    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws,data) {
        cc.log(data);
        switch (data.msghead){
            case "roominfo":
                _this.updateroominfo(data.msgdata);
                _this.view.updataRoomUserInfo();
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
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房卡不足");
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
            case "gameniuniubye":
                _this.endinfo = data.msgdata.info;
                if (_this.endinfo != null){
                    _this.isover = true;
                    _this.mywebsocket.onclosefunc = null;

                    _this.view.onGameNiuNiuBye(data);
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
                for(var i=0;i<_this.gameniuniuinfo.info.length;i++){
                    if(_this.gameniuniuinfo.info[i].uid==data.msgdata.uid){
                        _this.gameniuniuinfo.info[i].ready = true;
                        break;
                    }

                }
                _this.ready(data.msgdata.uid);

                //_this.view.onGameReady(data.msgdata.uid);
                break;
            case "gameniuniujxbegin":
                cc.log("gameniuniujxbegin");
                _this.roominfo.step += 1;
                _this.gamestate = 1;
                _this.gameniuniuinfo=data.msgdata;
                _this.updategameniuniuinfo(data.msgdata);

                _this.view.updataRoomUserInfo();
                _this.view.onGameNiuNiuBegin(data.msgdata);
                _this.view.runJuShuAction();
                if(_this.roominfo.step == 1){
                    _this.view.checkSafe(_this.roominfo.person);
                }
                _this.view.safeLayer.btn_safe.setVisible(false);
                /*
                 * msgdata =
                 {
                 begin bool = 是否开始
                 ready []string = 准备的人,begin = false的时候有用
                 info []node = 游戏数据，begin = true的时候有用
                 }

                 * */
                break;
            case "gameniuniujxinfo":
                cc.log("gameniuniujxinfo");
                cc.log(data.msgdata);
                _this.updategameniuniuinfo(data.msgdata);
                _this.view.onGameNiuniuInfo(data.msgdata);
                _this.view.updataRoomUserInfo();
                _this.view.checkSafe(_this.roominfo.person);
                /*
                 msgdata =
                 {
                 begin bool = 是否开始
                 ready []string = 准备的人,begin = false的时候有用
                 info []node = 游戏数据，begin = true的时候有用
                 }

                 * */
                //没开始直接把自己设为准备状态
                if(!data.msgdata.begin){

                }
                break;
            case "gamebets":
                cc.log("gamebets");

                for(var i = 0;i < 5;i++){
                    if (i < _this.gameniuniuinfo.info.length){
                        if (data.msgdata.uid == _this.gameniuniuinfo.info[i].uid){
                            _this.gameniuniuinfo.info[i].bets = data.msgdata.bets;
                        }
                    }
                }
                if(data.msgdata.uid == _this.uid){
                    _this.view.isGameBetShow(false);
                }
                _this.view.onGameBets(data.msgdata,_this.roominfo.person.length);
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
            case "gameniuniuend":
                _this.gamestate = 2;
                cc.log("gameniuniuend");
                _this.gameniuniuinfo=data.msgdata;
                for(var i=0;i<_this.gameniuniuinfo.info.length;i++){
                    _this.view.onGameShowUserCard(_this.gameniuniuinfo.info[i]);
                }
                //清理数据
                for (var i =0;i < _this.roominfo.person.length; i++){
                    _this.roominfo.person[i].ready = false;
                    _this.roominfo.person[i].robdeal = -1;
                    _this.roominfo.person[i].bets=0;
                    _this.gameniuniuinfo.info[i].ready=false;
                    _this.gameniuniuinfo.info[i].robdeal=-1;
                    _this.gameniuniuinfo.info[i].bets=0;
                }
                _this.updategameniuniuinfo(_this.gameniuniuinfo);
                _this.view.onGameNiuNiuEnd(data.msgdata);
                /*
                 * msghead = "gameniuniuend"
                 msgdata =
                 {
                 info []node
                 }

                 刚忘了写node的结构，这个和gameniuniuinfo里的node是一样的
                 node
                 {
                 openid   string
                 card    []int    //! 手牌，未结算的时候，其他人最后一张牌是0
                 bets int //! 下注
                 dealer bool  //! 是否是庄家
                 score  int   //! 这局结算分数
                 }

                 * */
                break;
            case "gameniuniucard":
                _this.ongameniuniucard(data.msgdata.card, data.msgdata.all);
                if(data.msgdata.all != null && cc.isArray(data.msgdata.all)){
                    _this.view.onGameSnedAllCard(data.msgdata.all);
                }else{
                        _this.view.onGameSendOtherCard(data.msgdata.card);//扣2张模式  第一次叫分补第4张牌
                }
                break;
            case "gameview":
                data.msgdata.view=true;
                _this.view.onGameShowUserCard(data.msgdata);
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
                _this.rob(data.msgdata.uid,data.msgdata.score);
                _this.view.onGameDeal(data.msgdata);
                if(data.msgdata.uid == _this.uid){
                    _this.view.isShowQiangZhuang(false);
                }
                break;
            case "gamedealer":
                // for (var i =0;i < _this.gameniuniuinfo.info.length; i++){
                //     if(_this.gameniuniuinfo.info[i].uid == data.msgdata.uid){
                //         _this.gameniuniuinfo.info[i].dealer = true;
                //         if(_this.gameniuniuinfo.info[i].robdeal<=0){
                //             var _obj={uid:data.msgdata.uid,score:1};
                //             _this.rob(_obj.uid,_obj.score);
                //             _this.view.onGameDeal(_obj);
                //         }
                //         break;
                //     }
                // }
                var isRanDomZhuang=false;
                for (var i =0;i < _this.gameniuniuinfo.info.length; i++){
                    if(_this.gameniuniuinfo.info[i].uid == data.msgdata.uid){
                        _this.gameniuniuinfo.info[i].dealer = true;
                        if(_this.gameniuniuinfo.info[i].robdeal<=0){
                            isRanDomZhuang=true;
                            _this.view.randomZhuangBlink(data.msgdata);
                            var _obj={uid:data.msgdata.uid,card:1};
                            _this.view.onGameDeal(_obj);
                        }
                        break;
                    }
                }
                if(!isRanDomZhuang);
                _this.view.onGameDealer(data.msgdata);
                break;
            case "chatroom":
                _this.chatlst[_this.chatlst.length] = data.msgdata;

                if (_this.game.uimgr.uis["gameclass.chatui"])
                    _this.game.uimgr.uis["gameclass.chatui"].pushstr(data.msgdata);


                _this.view.onchat( data.msgdata);
                break;
            case "lineperson":
                for (var i =0;i < _this.roominfo.person.length; i++){
                    if(_this.roominfo.person[i].uid == data.msgdata.uid){
                        _this.roominfo.person[i].ip = "";
                        _this.game.uimgr.uis["gameclass.niuniutable"].resetIcon(data.msgdata.uid);
                        break;
                    }
                }
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

gameclass.mod_jxnn.prototype.updateroominfo = function(roominfo) {
    this.uid = this.game.modmgr.mod_login.logindata.uid;
    this.roominfo = roominfo;
    for (var i =0;i < this.roominfo.person.length; i++){
        this.roominfo.person[i].ready = false;
        this.roominfo.person[i].robdeal = -1;

        if (this.roominfo.person[i].uid == this.uid){
            this.serverchair = i;
            this.selfdata = this.roominfo.person[i];
        }
    }

    if (this.gameniuniuinfo!=null){
        this.updategameniuniuinfo(this.gameniuniuinfo);
    }
};

gameclass.mod_jxnn.prototype.updategameniuniuinfo = function(gameniuniuinfo) {
    this.gameniuniuinfo = gameniuniuinfo;

    var ZhuangInex=-1;
    for(var i=0;i<this.gameniuniuinfo.info.length;i++) {
        if(this.gameniuniuinfo.info[i].dealer){
            ZhuangInex=i;
        }
    }
    for(var i=0;i<this.gameniuniuinfo.info.length;i++){
        if(this.gameniuniuinfo.info[i].ready){
            this.ready(this.gameniuniuinfo.info[i].uid);
        }else{
            this.gameniuniuinfo.info[i].ready=false;
        }
        if(this.gameniuniuinfo.info[i].robdeal>=0) {
            if(ZhuangInex==-1||ZhuangInex==i)
            this.rob(this.gameniuniuinfo.info[i].uid,this.gameniuniuinfo.info[i].robdeal);
        }
    }
    // if (this.gameniuniuinfo.ready != null) {
    //     for (var i = 0; i < this.gameniuniuinfo.ready.length; i++) {
    //         this.ready(this.gameniuniuinfo.ready[i]);
    //     }
    //
    //     for (var i = 0; i < this.gameniuniuinfo.deal.length; i++) {
    //         this.rob(this.gameniuniuinfo.deal[i].uid,this.gameniuniuinfo.deal[i].ok);
    //     }
    // }else{
    //     for (var i =0;i < this.roominfo.person.length; i++){
    //         this.roominfo.person[i].ready = false;
    //         this.roominfo.person[i].rob = 0;
    //     }
    // }

};

gameclass.mod_jxnn.prototype.ready = function(uid) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            this.roominfo.person[i].ready = true;
        }
    }
};

gameclass.mod_jxnn.prototype.rob = function(uid,num) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            this.roominfo.person[i].robdeal = num;
            this.gameniuniuinfo.info[i].robdeal=num;
            var _obj={};
            _obj.uid=uid;
            _obj.score=num;
            this.view.onGameDeal(_obj);
        }
    }
};

gameclass.mod_jxnn.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_jxnn.prototype.gameready = function() {
    var data = {};
    this.mywebsocket.send("gameready",data);
};

gameclass.mod_jxnn.prototype.gameniuniubegin = function() {
    var data = {};
    this.mywebsocket.send("gameniuniubegin",data);
};
gameclass.mod_jxnn.prototype.bindUI = function(ui) {
    this.view = ui;
}

gameclass.mod_jxnn.prototype.gamebets = function(num) {

    for(var i = 0;i < 5;i++){
        if (i < this.gameniuniuinfo.info.length){
            if (this.uid == this.gameniuniuinfo.info[i].uid){
                this.gameniuniuinfo.info[i].bets = num;
            }
        }
    }

    var data = {"bets":Number(num)};
    this.mywebsocket.send("gamebets",data);
};
gameclass.mod_jxnn.prototype.gamedealer = function(num) {

    for(var i = 0;i < 5;i++){
        if (i < this.gameniuniuinfo.info.length){
            if (this.uid == this.gameniuniuinfo.info[i].uid){
                this.gameniuniuinfo.info[i].robdeal = num;
            }
        }
    }

    var data = {"score":Number(num)};
    this.mywebsocket.send("gamedealer",data);
};
gameclass.mod_jxnn.prototype.gameview = function(num,arrcard) {
    var data = {type:num,view:arrcard};
    this.mywebsocket.send("gameview",data);
};

gameclass.mod_jxnn.prototype.gameend = function() {
    var data = {};
    this.mywebsocket.send("gameend",data);
};

gameclass.mod_jxnn.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};

gameclass.mod_jxnn.prototype.gamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_jxnn.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};


gameclass.mod_jxnn.prototype.getserverchair = function(cur) {
    // cc.log(this.serverchair,cur );
    return (this.serverchair + cur )%5;
};

gameclass.mod_jxnn.prototype.getplayerdata = function(cur) {
    //cc.log("mod_niuniu roominfo");
    //cc.log(this.roominfo);
    var serverchair = this.getserverchair(cur);
    if (serverchair >= 5) {
        serverchair-=5;
    }
    return this.roominfo.person[serverchair];
};

gameclass.mod_jxnn.prototype.getplayerdatabyuid = function(uid) {

    for(var i = 0;i < this.roominfo.person.length; i++ ){
        if(this.roominfo.person[i].uid == uid){
            return this.roominfo.person[i];
        }
    }
};

gameclass.mod_jxnn.prototype.getplayerotherdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair >= this.gameniuniuinfo.info.length) {
        return
    }

    return this.gameniuniuinfo.info[serverchair];
};

gameclass.mod_jxnn.prototype.ongameniuniucard = function(cardArr, all) {
    for (var i =0;i < this.gameniuniuinfo.info.length; i++){

        if (this.gameniuniuinfo.info[i].uid == this.uid){
            for(var j=0;j<cardArr.length;j++){
                this.gameniuniuinfo.info[i].card.push(cardArr[j]);
            }
            if (all) {
                this.gameniuniuinfo.info[i].card = all;
            }
            break;
        }
    }
};

gameclass.mod_jxnn.prototype.getplayernum = function() {
    return this.gameniuniuinfo.info.length;
};

gameclass.mod_jxnn.prototype.getPlayerIndexById  =function(uid){
    for(var i = 0; i< this.roominfo.person.length; i++){
        if(this.roominfo.person[i] && this.roominfo.person[i].uid == uid){
            return i;
        }
    }
}


