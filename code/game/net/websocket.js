


var getwebsocket = function(url,openfunc,onmsgfunc,onerrorfunc,onclosefunc){
    this._wsiError = null;
    //if (!cc.sys.isNative) {
        this._wsiError = new WebSocket(url);
    /*}else{
        this._wsiError = new MySocket(url);
    }*/
    this._wsiError.binaryType = "arraybuffer";
    var _ws = this._wsiError;
    this._wsiError.onopen = function(evt) {
        cc.log("open");

        /*var data = JSON.parse("{\"uid\":513297,\"pground\":1,\"bid\":4}");
        senddata = getdatapacket(RoomCommand.CLIENT_ROOM_LOGIN,data);
        _ws.send(senddata.buffer);*/

        if (openfunc != null) {
            openfunc(evt,_ws);
        }

    };
    this._wsiError.onmessage = function(evt) {

        var b64 = new Base64();
        //cc.log("onmessage    " + b64.decode(evt.data));
        if (onmsgfunc != null) {
            onmsgfunc(evt,_ws,//evt.data);
                b64.decode(evt.data));
        }
    };
    this._wsiError.onerror = function(evt) {
        cc.log("Error was fired");
        //self._errorStatus.setString("an error was fired");
        if (onerrorfunc != null) {
            onerrorfunc(evt,_ws);
        }
    };
    this._wsiError.onclose = function(evt) {
        cc.log("_wsiError websocket instance closed.");
        //self._wsiError = null;
        if (onclosefunc != null) {
            onclosefunc(evt,_ws);
        }
    };

    return  this._wsiError;
};

var wsSendData = function (ws,cmd,data,isu8arr) {
    var senddata = getdatapacket(cmd,data,isu8arr);
    ws.send(senddata.buffer);
};