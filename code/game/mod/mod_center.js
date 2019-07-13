/**
 * Created by yang on 2016/11/18.
 */

gameclass.mod_center = gameclass.mod_base.extend({
    data:null,
    gateIp:null,
    gonggao:null,
    areainfo:null,
    notice:null,
    hasread:null,
    isClickPYQ:null,
    mod_club:null,
    reconnect:false,     //! 是否重连
    websocket:null,
    ctor:function () {
        this.gonggao = "";
        this.isClickPYQ=false;
        this.mod_club = new gameclass.mod_club();
        cc.log(this.mod_club);
    },
    setgame:function(_game){
        this.game = _game;
        this.mod_club.setgame(_game);
    },
});

gameclass.mod_center.prototype.disconnect = function() {
    if(this.websocket == null) {
        return;
    }

    //! 手动断开就不重连
    this.reconnect = false;
    this.websocket.close();
    this.websocket = null;
};

gameclass.mod_center.prototype.connect = function(ip){
    if(this.websocket != null) {
        return;
    }

    var _this = this;
    _this.reconnect = true;
    this.websocket = gameclass.newwebsocket(this.game,ip, function (ws) {

    },function (ws) {
        cc.log("open");
        gameclass.mapinfo = gameclass.mod_platform.getmapinfo();
        var data = {"uid":_this.game.modmgr.mod_login.logindata.uid,"openid":_this.game.modmgr.mod_login.logindata.openid,"mapinfo":gameclass.mapinfo,"group":1};
        ws.send("setuid",data);

        _this.mywebsocket = ws;

    }, function (ws,data) {
        // cc.log("mod_center getMsg--->" + data.msghead);
        if(data.msghead == "notice"){
            // cc.log(data.msgdata.context);
            _this.gonggao = data.msgdata.context;
            if ( _this.game.uimgr.uis["gameclass.hallui"] != null){
                _this.game.uimgr.uis["gameclass.hallui"].updategonggao();
            }
            if ( _this.game.uimgr.uis["gameclass.hallGoldui"] != null){
                _this.game.uimgr.uis["gameclass.hallGoldui"].updategonggao();
            }
        } else if(data.msghead == "areainfo") {
            _this.areainfo = JSON.parse(data.msgdata.context);
            // cc.log(_this.areainfo);
            if ( _this.game.uimgr.uis["gameclass.hallui"] != null){
                _this.game.uimgr.uis["gameclass.hallui"].updateareainfo();
            }
        } else if(data.msghead == "noticeinfo") {
            _this.notice = data.msgdata.info;
            _this.hasread = data.msgdata.read;
            //if ( _this.game.uimgr.uis["gameclass.hallui"] != null){
            //    _this.game.uimgr.uis["gameclass.hallui"].updateMailPoint();
            //}
            _this.game.uimgr.updateUIMsg("noticeinfo");
            // cc.log(_this.notice);
        } else if (data.msghead == "joingoldfail") {
            _this.game.uimgr.showui("gameclass.msgboxui");
            _this.game.uimgr.uis["gameclass.msgboxui"].setString("金币不足");
        } else if(data.msghead == "userbase") {
            _this.game.modmgr.mod_userbase.setData(data.msgdata);
        } else if(data.msghead == "updatemoney") {
            _this.game.modmgr.mod_userbase.userbase.money = data.msgdata.gold;
            _this.game.modmgr.mod_userbase.userbase.gem = data.msgdata.gem;
            _this.game.modmgr.mod_userbase.userbase.charm = data.msgdata.charm;
            _this.game.uimgr.updateUIMsg("updatemoney");
        } else {
            _this.mod_club.onMsg(data);
        }
    }, function () {
        cc.log("onerrorfunc");
    }, function () {
        cc.log("onclosefunc");
        if(_this.reconnect) {
            _this.websocket = null;
            var seq = cc.sequence(cc.delayTime(1),cc.callFunc(function(){
                _this.connect(ip);
            }));
            cc.director.getRunningScene().runAction(seq);
        }
    }, null);
};

gameclass.mod_center.prototype.connectGate = function(ip,funclogin){
    // cc.log("11111111");
    if (this.gateip== null){
        this.gateip = ip;
    }else{
        return ;
    }
    // cc.log("2222222");
    var _this = this;
    cc.log("gateip:"+ip);
    gameclass.newwebsocket(this.game,ip,
        function (ws) {
        },
        function (ws) {
            cc.log("gateopen");
            _this.myGatewebsocket = ws;
            if(!_this.gameping){
                _this.gameping = new gameclass.gameping(_this.game,_this.myGatewebsocket);
            } else {
                _this.gameping.gameScoket = _this.myGatewebsocket;
                _this.gameping.pause = false;
                _this.gameping.pingnum = 0;
                _this.gameping.pingflag = true;
            }
            if(funclogin){
                funclogin();
            }
        },
        function (ws,data){
            cc.log("gateonmsng");
            if(data.msghead == "gameping"){
                cc.log("gameping");
            }
        },
        function (ws,data){
            cc.log("gateonerrorfunc");
            _this.gateip = null;
            _this.gameping.pause = true;
            this.game.modmgr.mod_login.backlogin(2);    //! 连接断开回到登陆界面
        },
        function(){
            cc.log("gateonclosefunc");
            _this.gateip = null;
            _this.gameping.pause = true;
            this.game.modmgr.mod_login.backlogin(2);    //! 连接断开回到登陆界面
        },
        function (ws,data){
            _this.gameping.kwxtablepingflag();
        }
    )
};

gameclass.mod_center.prototype.iospay = function(re) {
    var data = {"receipt":re,"sandbox":false};
    this.mywebsocket.send("charge",data);
};

gameclass.mod_center.prototype.code = function(code) {
    var data = {"code":code};
    this.mywebsocket.send("code",data);
};

gameclass.mod_center.prototype.getmapinfo = function(code) {
    if(!cc.sys.isNative) {
        return
    }
    if(gameclass.clientver == 0) {
        return
    }
    if(gameclass.mapinfo != null && gameclass.mapinfo != "") {
        return;
    }
    gameclass.mapinfo = gameclass.mod_platform.getmapinfo();
    if(gameclass.mapinfo != null && gameclass.mapinfo != "") {
        var data = {"mapinfo":gameclass.mapinfo};
        this.mywebsocket.send("setmapinfo",data);
    }
};

//! 是否显示邮件小红点
gameclass.mod_center.prototype.isViewMailPoint = function() {
    if(this.notice == null) {
        return false;
    }

    if(this.notice.length == 0) {
        return false;
    }

    if(this.hasread == null) {
        return this.notice.length > 0;
    }

    //我们只管最后一个邮件读没读。读了。显示小红点。没读。不显示
    var len = this.notice.length;
    var show = true;
    for(var i = 0;i < this.hasread.length;i++){
        if(this.notice[len-1].id == this.hasread[i]){
            show = false;
        }
    }
    return show;


    //cc.log(this.hasread);
    //for(var i = 0; i < this.notice.length; i++) {
    //    var find = false;
    //    for(var j = 0; j < this.hasread.length; j++) {
    //        if(this.notice[i].id == this.hasread[j]) {
    //            find = true;
    //            break;
    //        }
    //    }
    //    if(!find) {
    //        return true;
    //    }
    //}
    //return false;
};

gameclass.mod_center.prototype.sendReadMail = function(id) {
    if(this.mywebsocket == null) {
        return;
    }

    if(this.hasread == null) {
        return
    }

    for(var i = 0; i < this.hasread.length; i++) {
        if(this.hasread[i] == id) {
            return;
        }
    }

    this.hasread.push(id);

    var data = {"id":id};
    this.mywebsocket.send("readmail",data);

    if ( this.game.uimgr.uis["gameclass.hallui"] != null){
        this.game.uimgr.uis["gameclass.hallui"].updateMailPoint();
    }
    if( this.game.uimgr.uis["gameclass.hallGoldui"] != null){
        this.game.uimgr.uis["gameclass.hallGoldui"].updateMailPoint();
    }
};

//! 购买
gameclass.mod_center.prototype.buyItem = function(id) {
    if(this.mywebsocket == null) {
        return;
    }

    var data = {"id":id};
    this.mywebsocket.send("buyitem",data);
};

//! 加入金币场
gameclass.mod_center.prototype.joinGoldRoom = function(roomid) {
    if(this.mywebsocket == null) {
        return;
    }

    var data = {"roomid":roomid};
    this.mywebsocket.send("joingoldroom", data);
};
gameclass.mod_center.prototype.shareOkCallBack=function () {
    // this.game.uimgr.showui("gameclass.msgboxui");
    // this.game.uimgr.uis["gameclass.msgboxui"].setString("分享成功");
    var data={id:1};
    this.mywebsocket.send("shareOK",data);
};
gameclass.mod_center.prototype.reportPlayer = function(uid,type,str){
    var data = {"uid":uid,"type":type,"dec":str};
    this.mywebsocket.send("report",data);
};