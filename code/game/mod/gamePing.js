/**
 * Created by Administrator on 2017-9-21.
 */



gameclass.gameping = cc.Class.extend({
    game:null,
    node:null,
    gameScoket:null,
    pingnum:0,
    pingflag:true,
    pause:false,

    ctor:function(_game,_gameSocket){
        this.game = _game;
        this.gameScoket = _gameSocket;
        //this.init();

        var _this = this;
        var func = cc.repeatForever(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            //cc.log("222")
            _this.kwxtableping();
        })));
        game.helloWorld.runAction(func);
    },

    //init:function(){
    //    var _this = this;
    //    this.gameScoket.setonmsgfunc(function(ws,data){
    //        switch (data.msghead){
    //            case "gameping":
    //                _this.kwxtablepingflag();
    //                //_this.pingnum = 0;
    //                break;
    //        }
    //    })
    //},

    kwxtableping:function() {
        if(this.pause) {   //! ��ͣping
            return;
        }

        var _this = this;
        _this.pingnum += 1;
        if(_this.pingnum < 5){
            return;
        }
        else{
            //cc.log("sendGamePing1111");
            _this.sendGamePing(this.pingflag);
            _this.pingnum = 0;
            _this.pingflag = false;
        }
    },

    kwxtablepingflag:function(){
        //cc.log("recive11111111");
        this.pingflag = true;
    },

    sendGamePing:function(bool){
        if(bool){
            if(this.gameScoket) this.gameScoket.send("gameping",{});
        }
        else{
            cc.log("ssssssssssssssssssss");
            this.game.modmgr.mod_login.backlogin(1);
        }
    },

})
