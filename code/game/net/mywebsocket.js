/**
 * Created by yang on 2016/11/10.
 */

gameclass.websocket = cc.Class.extend({
    url:null,
    openfunc:null,
    onmsgfunc:null,
    onerrorfunc:null,
    onclosefunc:null,
    onpingfunc:null,
    ws:null,
    curservrtime:null,
    curclienttime:null,
    game:null,
    ctor: function () {
        this.curservrtime = 0;
        this.curclienttime = 0;
    },setgame:function(_game){
        this.game = _game;
    }
});

gameclass.websocket.prototype.getcurservertime = function(){
    return this.curservrtime + (Math.floor(new Date().getTime()/1000) - this.curclienttime);
};

gameclass.websocket.prototype.close = function(){
    this.ws.close();
};

gameclass.websocket.prototype.init = function(url,openfunc,onmsgfunc,onerrorfunc,onclosefunc,onpingfunc){
    this.url = url;
    this.openfunc = openfunc;
    this.onmsgfunc = onmsgfunc;
    this.onerrorfunc = onerrorfunc;
    this.onclosefunc = onclosefunc;
    this.onpingfunc = onpingfunc;

    this.ws = null;
    //if (!cc.sys.isNative) {
    this.ws = new WebSocket(this.url);
    /*}else{
     this._wsiError = new MySocket(url);
     }*/
    this.ws.binaryType = "arraybuffer";
    var _this = this;
    this.ws.onopen = function(evt) {
        cc.log("websocket open...");
        if (_this.openfunc != null) {
            _this.openfunc(_this,evt);
        }
    };
    this.ws.onmessage = function(evt) {
        //cc.log("onmessage");
        if (_this.onmsgfunc != null) {
            var u8a = new Uint8Array(evt.data);
            var str = Bytes2Str(u8a);
            //cc.log(str);

            var recvdata = JSON.parse(str);

            var msgsign = JSON.parse(recvdata.msgsign);

            _this.curservrtime = msgsign.time;
            _this.curclienttime = Math.floor(new Date().getTime()/1000);

            if(msgsign.encode && msgsign.encode == 1) {
                var data = new Uint8Array(BASE64.decoder(recvdata.msgdata));
                recvdata.msgdata = Bytes2Str(pako.inflate(data));
            }
            //cc.log("getMsg-----socket----->" + recvdata.msgdata);
            if(recvdata.msghead != "gameping"){
                //cc.log(recvdata.msgdata.toString());
                //cc.log(recvdata);
                //cc.log("====================");
                //cc.log(recvdata.msgdata.toString());
            }

            if (recvdata.msghead == "err"){
                var data = JSON.parse(recvdata.msgdata);
                if(data.info.length > 0) {
                    _this.game.uimgr.closeui("gameclass.inputcode2");
                    _this.game.uimgr.showui("gameclass.msgboxui");
                    if(data.info == "您的金币不足，请前往充值。") {
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString(data.info, function () {
                            _this.game.uimgr.showui("gameclass.goldShop");
                        });
                    } else {
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString(data.info);
                    }
                }
            } else if(recvdata.msghead == "warning") {
                var data = JSON.parse(recvdata.msgdata);
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString(data.info, function () {
                });
            } else if(recvdata.msghead == "updcard") {
                var data = JSON.parse(recvdata.msgdata);
                // cc.log(data);
                _this.game.modmgr.mod_login.setLoginData(data.card - data.gold, data.gold)
            } else if(recvdata.msghead == "gameping") {
                if(_this.onpingfunc != null) {
                    recvdata.msgdata = JSON.parse(recvdata.msgdata);
                    _this.onpingfunc(_this, recvdata);
                }
            } else {
                recvdata.msgdata = JSON.parse(recvdata.msgdata);
                _this.onmsgfunc(_this, recvdata);
            }
        }
    };
    this.ws.onerror = function(evt) {
        cc.log("websocket Error was fired");
        //self._errorStatus.setString("an error was fired");
        if (_this.onerrorfunc != null) {
            _this.onerrorfunc(_this,evt,_this.ws);
        }
    };
    this.ws.onclose = function(evt) {
        cc.log("_wsiError websocket instance closed.");
        //self._wsiError = null;
        if (_this.onclosefunc != null) {
            _this.onclosefunc(_this,evt);
        }
    };
    return  this;
};

gameclass.websocket.prototype.setonmsgfunc = function (onmsgfunc) {
    this.onmsgfunc = onmsgfunc;
};

gameclass.websocket.prototype._send = function (str) {
    this.ws.send(str);
};


gameclass.websocket.prototype.send = function (head,data) {
    var response ={"msghead":head,"msgdata":JSON.stringify(data)};
    var jsonData = JSON.stringify(response);
    cc.log("sendMsg--------->" + jsonData);
    this._send(jsonData);
};

gameclass.newwebsocket = function(_game,url,preinit,openfunc,onmsgfunc,onerrorfunc,onclosefunc,onpingfunc){
    cc.log("create socket ip=============" + url);
    var websocket =  new gameclass.websocket;
    websocket.setgame(_game);

    if (preinit != null){
        preinit(websocket);
    }
    websocket.init(url,openfunc,onmsgfunc,onerrorfunc,onclosefunc,onpingfunc);
    return websocket;
}
