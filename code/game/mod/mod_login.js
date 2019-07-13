/**
 * Created by yang on 2016/11/9.
 */



gameclass.mod_login = gameclass.mod_base.extend({
    data: null,
    logindata: null,
    roomdata: null,
    islogin: null,
    ctor: function () {
        this.islogin = false;
    }
});

gameclass.mod_login.prototype.getserverver = function (func) {

    var data = {};
    var _this = this;
    this.getver("", data, function (retdata, temp, recvdata) {
        func(retdata)
    });
}
/**
 * 设置登录数据
 * @param openid
 */
gameclass.mod_login.prototype.setLoginData = function (card, gold) {
    this.logindata.card = card;
    this.logindata.gold = gold;
    if (this.logindata.card < 0) {
        this.logindata.card = 0;
    }
    if (this.logindata.gold < 0) {
        this.logindata.gold = 0;
    }

    this.game.uimgr.updateUIMsg("updcard");
};

//是否显示招募信息
gameclass.mod_login.prototype.isOpenInvite = function () {
    var date = new Date();
    var curDay = Number(date.Format("dd"));
    var openInvite = false;
    if (!cc.sys.localStorage.getItem("loginDay")) {
        openInvite = true;
    } else {
        var data = cc.sys.localStorage.getItem("loginDay");
        var lastLoginDay = JSON.parse(data).day;
        if (curDay != lastLoginDay) {
            openInvite = true;
        } else {
            openInvite = false;
        }
    }
    cc.sys.localStorage.setItem("loginDay", JSON.stringify({"day": curDay}));
    return openInvite;
};

gameclass.mod_login.prototype.getTokey = function (func) {
    this.sendhttp('createtoken', {"uid": this.logindata.uid, "unionid":mod_userdefault.globaldata.code}, function (retdata, temp, recvdata) {
        cc.log(retdata);
        if (retdata.token) {
            if (func) func(retdata.token);
        }
    });
};

//获取金币场游戏人数
gameclass.mod_login.prototype.getGoldGameNum = function (func) {
    this.sendhttp('getgamenum', {}, function (retdata, temp, recvdata) {
        if (func) {
            func(retdata);
        }
    });
};

gameclass.mod_login.prototype.guestlogin = function (openid) {
    cc.log("guestlogin..............");
    gameclass.servertype = 2;
    setservertype(gameclass.servertype);
    gameclass.clientver = 0;

    if (openid != null && openid != "") {
        mod_userdefault.globaldata.code = openid;
    }
    var data = {"code": mod_userdefault.globaldata.code, "ver": gameclass.clientver};
    var _this = this;

    _this.game.uimgr.showload(true);

    this.sendhttp("loginYK", data, function (retdata, temp, recvdata) {
        if (recvdata.msghead == "loginfail") {
            gameclass.servertype = 2;//1正式服 2测试服
            gameclass.clientver = 0;
            _this.game.modmgr.mod_login.guestlogin(openid);
        } else {
            _this.logindata = retdata;
            cc.log(_this.logindata);
            _this.setLoginData(retdata.card - retdata.gold, retdata.gold);
            mod_userdefault.globaldata.code = retdata.openid;
            mod_userdefault.writeglobaljson();
            gameclass.mod_platform.sendGetBattery();

            if (retdata.room == 0) {
                _this.game.uimgr.showload(false);
                _this.game.uimgr.closeallui(true);

                _this.showHall();
            } else {
                _this.jionroom(retdata.ip, retdata.room);
            }
            _this.game.modmgr.mod_center.connect("ws://" + retdata.center);
        }
    });
};
gameclass.mod_login.prototype.showHall = function () {
    var loginSetStorage = staticFunction.getStorage(gameclass.gameStorageKey, gameclass.loginSetKey);
    if (loginSetStorage == null) {
        if (gameclass.LOGIN_TO_ROOM_DEFAULT == gameclass.TAB_LOGIN_TO_GOLD) {
            this.game.uimgr.showui("gameclass.hallGoldui");
        } else {
            this.game.uimgr.showui("gameclass.hallui");
        }
    } else if (parseInt(loginSetStorage) == gameclass.TAB_LOGIN_TO_GOLD) {
        this.game.uimgr.showui("gameclass.hallGoldui");
    } else {
        this.game.uimgr.showui("gameclass.hallui");
    }

    //if(gameclass.test == "false") { //! 不是审核模式
    //    this.game.uimgr.showui("gameclass.goldScwelcome");
    //}
}
gameclass.mod_login.prototype.wxlogin = function (code, isfrist) {
    cc.log("wxlogin..............");
    var type = 3;
    if (!cc.sys.isNative) {
        type = 1;
    }

    var op = "loginWX";
    if (mod_userdefault.globaldata.code != "") {
        code = mod_userdefault.globaldata.code;
        op = "loginOP";
    }

    var data = {"code": code, "type": type, "ver": gameclass.clientver};
    var _this = this;

    if (!isfrist) {
        _this.game.uimgr.showload(true);
    }

    this.sendhttp(op, data, function (retdata, temp, recvdata) {
        cc.log("getMsg-----login----->" + recvdata.msghead + "||data=" + JSON.stringify(recvdata.msgdata));
        if (recvdata.msghead == "loginfail") {
            gameclass.servertype = 2//1正式服 2测试服
            gameclass.clientver = 0;
            _this.game.modmgr.mod_login.guestlogin("");
        } else {
            _this.logindata = retdata;
            _this.setLoginData(retdata.card - retdata.gold, retdata.gold);
            if (mod_userdefault.globaldata.code != retdata.openid) {
                mod_userdefault.globaldata.code = retdata.openid;
                mod_userdefault.globaldata.time = (new Date()).getTime();
                mod_userdefault.writeglobaljson();
            }
            _this.islogin = true;
            g_islogin = true;
            gameclass.mod_platform.sendGetBattery();

            if (retdata.room == 0) {
                _this.game.uimgr.showload(false);
                _this.game.uimgr.closeallui(true);

                _this.showHall();
            } else {
                _this.jionroom(retdata.ip, retdata.room);
            }
            _this.game.modmgr.mod_center.connect("ws://" + retdata.center);

        }
    });
};

gameclass.mod_login.prototype.setMyInfo = function (data, func) {
    this.sendhttp('setextrainfo', data, function (retdata, temp, recvdata) {
        cc.log(retdata);
        if (func) {
            func(retdata);
        }
    });
};

gameclass.mod_login.prototype.replaceCard = function (data, func) {
    this.sendhttp('card2gold', data, function (retdata, temp, recvdata) {
        cc.log("222")
    });
};

gameclass.mod_login.prototype.creategoldroom = function (gametype, num) {
    var _num = 1;
    if (num) _num = num;
    cc.log("gametypechuanru"+gametype);
    var data = {"uid": this.logindata.uid, "type": gametype, "num": _num, "unionid":mod_userdefault.globaldata.code};
    var _this = this;

    var checkCanCreate = _this.checkCanCreate(gametype);
    checkCanCreate = true;
    if (checkCanCreate) {
        this.game.uimgr.showload(true);
        this.sendhttp("fastjoin", data, function (retdata, temp, recvdata) {
            if (retdata.card) {
                _this.setLoginData(retdata.card - retdata.gold, retdata.gold);
            }
            _this.jionroom(retdata.ip, retdata.room);
        });
    } else {
        _this.game.uimgr.showui("gameclsss.hallui");
    }
};

gameclass.mod_login.prototype.checkCanCreate = function (gametype) {
    var checkArr = [1000, 4000, 2000, 6000, 20000, 10000];
    var slectType = parseInt(gametype / 10 % 10);
    var loginData = this.game.modmgr.mod_login.logindata;
    if (loginData.gold >= checkArr[slectType]) {
        return true;
    } else {
        return false;
    }
};


gameclass.mod_login.prototype.createroom = function (gameid, num, param1, param2) {
    var data = {"uid": this.logindata.uid, "type": gameid, "num": num, "param1": param1, "param2": param2, "unionid":mod_userdefault.globaldata.code};
    var _this = this;

    _this.game.uimgr.showload(true);

    this.sendhttp("create", data, function (retdata, temp, recvdata) {
        if (retdata.card) {
            _this.setLoginData(retdata.card - retdata.gold, retdata.gold);
        }

        _this.jionroom(retdata.ip, retdata.room);
    });
};

gameclass.mod_login.prototype.joinwithroomid = function (roomid) {
    var data = {"uid": this.logindata.uid, "group": -1, "roomid": Number(roomid), "unionid":mod_userdefault.globaldata.code};
    var _this = this;

    _this.game.uimgr.showload(true);

    this.sendhttp("join", data, function (retdata, temp, recvdata) {
        _this.jionroom(retdata.ip, retdata.room);

    });
};

gameclass.mod_login.prototype.jionroom = function (ip, roomid, times) {
    var _this = this;

    if (times == null) {
        times = 5;
    }

    this.getroominfo("ws://" + ip, roomid, function (ws, data) {
        cc.log("getMsg-----login----->" + data.msghead + "||data=" + JSON.stringify(data.msgdata));
        switch (data.msghead) {
            case "roominfo":
                _this.game.uimgr.showload(false);
                _this.game.uimgr.closeallui(true);
                g_isgame = true;

                if (data.msgdata.type == gameclass.gameniuniu) {
                    _this.createniuniu(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gameszp) {
                    _this.createzjh(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gameddz) {
                    _this.createddz(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gamelzddz) {
                    _this.createddz_wild(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gamesdb) {
                    _this.createsdb(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gamettz) {
                    _this.createttz(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gameptj) {
                    _this.createptj(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gameszp_fk) {
                    _this.createzjhfk(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gamenxs) {
                    _this.createsaolei(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gamejxnn) {
                    _this.createjxnn(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gameszpbaofang) {
                    _this.createzjhfk(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gamenys||data.msgdata.type == gameclass.gamebrnys||data.msgdata.type == gameclass.gamesznys||
                    data.msgdata.type == gameclass.gamegdnys||data.msgdata.type == gameclass.gamezynys)
                {
                    _this.createnys(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gamewzq) {
                    _this.createWzq(data.msgdata, ws);
                } else if (data.msgdata.type >= gameclass.gameBZW && data.msgdata.type < 50000){//这里豹子王是40001，所以不能加10000
                    _this.createBZW(data.msgdata, ws);
                } else if (data.msgdata.type == 2 || data.msgdata.type == 3 || data.msgdata.type == 4 || data.msgdata.type == 5
                    || data.msgdata.type == 13 || data.msgdata.type == 14) {
                    _this.createkwxroom(data.msgdata, ws);
                } else if (data.msgdata.type >= gameclass.gamegoldkwx && data.msgdata.type < gameclass.gamegoldkwx + 10000) {
                    _this.createkwxroom(data.msgdata, ws);
                } else if (data.msgdata.type >= gameclass.gamegoldszp && data.msgdata.type < gameclass.gamegoldszp + 10000) {
                    _this.createzjhfk(data.msgdata, ws);
                } else if (data.msgdata.type >= gameclass.gameGoldNiu && data.msgdata.type < gameclass.gameGoldNiu + 10000) {
                    _this.createGoldNiu(data.msgdata, ws);
                } else if (data.msgdata.type >= gameclass.gamegoldPtj && data.msgdata.type < gameclass.gamegoldPtj + 10000){
                    _this.createGoldptj(data.msgdata, ws);
                } else if (data.msgdata.type >= gameclass.gamegoldEBG && data.msgdata.type < gameclass.gamegoldEBG + 10000){
                    _this.createEBG(data.msgdata, ws);
                } else if (data.msgdata.type >= gameclass.gamegoldTTZ && data.msgdata.type < gameclass.gamegoldTTZ + 10000){
                    _this.createGoldTzz(data.msgdata, ws);
                } else if(data.msgdata.type >= gameclass.gamegoldPDK && data.msgdata.type < gameclass.gamegoldPDK + 10000){
                    _this.createPDK(data.msgdata, ws);
                }else if(data.msgdata.type == gameclass.gamegoldLHD){
                    _this.createLHD(data.msgdata, ws);
                }else if(data.msgdata.type == gameclass.gamegoldYYBF){
                    _this.createYYBF(data.msgdata, ws);
                }else if(data.msgdata.type >= gameclass.gamegoldsxdb && data.msgdata.type < gameclass.gamegoldsxdb + 10000){
                    _this.createSXDB(data.msgdata, ws);
                }else if (data.msgdata.type == gameclass.gamegoldYSZ ){
                    _this.createYSZ(data.msgdata, ws);
                }else if (data.msgdata.type == gameclass.gameDragon){   //龙珠探宝
                    _this.createDragon(data.msgdata, ws);
                }else if (data.msgdata.type == gameclass.gameDxtb){   //地穴探宝
                    _this.createDxtb(data.msgdata, ws);
                }else if (data.msgdata.type == gameclass.gameFpj){   //! 翻牌机
                    _this.createFpj(data.msgdata, ws);
                }else if(data.msgdata.type == gameclass.gamepdk){
                    _this.createpdkfk(data.msgdata, ws);
                }else if(data.msgdata.type == gameclass.gamegoldTB){
                    _this.createTB(data.msgdata, ws);
                }else if(data.msgdata.type == gameclass.gamegoldRacing){
                    _this.createRacing(data.msgdata, ws);
                }else if(data.msgdata.type == gameclass.gameToubao){
                    _this.createTBnew(data.msgdata, ws);
				}else if(data.msgdata.type == gameclass.gameFish){
                    _this.createFishing(data.msgdata, ws);
                }else if(data.msgdata.type == gameclass.gameTBBF){
                    _this.createTBnew(data.msgdata, ws);
                }
                else {
                    ws.onclosefunc = null;
                    _this.dissmissroom();
                    _this.game.uimgr.showui("gameclass.msgboxui");
                    _this.game.uimgr.uis["gameclass.msgboxui"].setString("您在傲世娱乐麻将的房间中,请先登录傲世娱乐麻将退出房间");
                }
                break;
            case "joinroomfail":
                ws.onclosefunc = null;
                _this.dissmissroom();
                _this.game.uimgr.showui("gameclass.msgboxui");
                switch (data.msgdata.result) {
                    case 1:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已解散");
                        break;
                    case 2:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已满员");
                        break;
                    case 4:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房卡不足");
                        break;
                    default:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房间错误");
                        break;
                }
                break;
        }
    })
};

gameclass.mod_login.prototype.getroominfo = function (ip, roomid, func, times) {
    var _this = this;
    gameclass.newwebsocket(this.game, ip, function (ws) {

    }, function (ws) {
        cc.log("mod_login open send joinroom ↓");
        //var data = {"uid":_this.logindata.uid, "roomid":roomid,"serverid":sid,"minfo":gameclass.mod_platform.getmapinfo()};
        var data = {"uid": _this.logindata.uid, "roomid": roomid, "minfo": gameclass.mod_platform.getmapinfo(), "unionid":mod_userdefault.globaldata.code};
        ws.send("joinroom", data);
    }, function (ws, data) {
        cc.log("mod_login onmsng ↓");
        func(ws, data);
    }, function () {
        cc.log("mod_login onerrorfunc");
    }, function () {
        cc.log("mod_login onclosefunc");
        _this.backlogin();
    });
};

gameclass.mod_login.prototype.createniuniu = function (_roominfo, _mysocket) {
    var mod_niuniu = new gameclass.mod_niuniu;
    g_ShowBattery = true;
    this.game.uimgr.showui("gameclass.niuniutable");

    mod_niuniu.setgame(this.game);
    mod_niuniu.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.niuniutable"].setmod(mod_niuniu);

    //this.gamelst[this.gamelst.length] = mod_niuniu;
    this.mod_game = mod_niuniu;

};

gameclass.mod_login.prototype.createzjh = function (_roominfo, _mysocket) {
    var mod_zjh = new gameclass.mod_zjh;
    g_ShowBattery = true;
    this.game.uimgr.showui("gameclass.zjhtable");
    mod_zjh.setgame(this.game);
    mod_zjh.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.zjhtable"].setmod(mod_zjh);

    //this.gamelst[this.gamelst.length] = mod_zjh;
    this.mod_game = mod_zjh;

};

gameclass.mod_login.prototype.createzjhfk = function (_roominfo, _mysocket) {
    var mod_zjh;
    g_ShowBattery = true;
    if (_roominfo.type == gameclass.gameszp_fk) {
        mod_zjh = new gameclass.mod_zjhFk;
        this.game.uimgr.showui("gameclass.zjhtablefk");
    } else if (_roominfo.type == gameclass.gameszpbaofang) {
        mod_zjh = new gameclass.mod_zjhGold;
        this.game.uimgr.showui("gameclass.zjhtableGoldBF", null, null, null, "gameclass.zjhtablefk");
        this.game.uimgr.uis["gameclass.zjhtablefk"].setbftype(_roominfo.type);
    } else {
        mod_zjh = new gameclass.mod_zjhGold;
        this.game.uimgr.showui("gameclass.zjhtableGold", null, null, null, "gameclass.zjhtablefk");
    }

    mod_zjh.setgame(this.game);
    mod_zjh.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.zjhtablefk"].setmod(mod_zjh);

    //this.gamelst[this.gamelst.length] = mod_zjh;
    this.mod_game = mod_zjh;
},


gameclass.mod_login.prototype.createddz = function (_roominfo, _mysocket) {
    var mod_ddzhu = new gameclass.mod_ddzhu;
    g_ShowBattery = true;
    this.game.uimgr.showui("gameclass.ddzhutable");

    // cc.log("------------------------------------------------");
    // cc.log("ddzhutable");
    // cc.log("------------------------------------------------");
    mod_ddzhu.setgame(this.game);
    mod_ddzhu.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.ddzhutable"].setmod(mod_ddzhu);

    //this.gamelst[this.gamelst.length] = mod_ddzhu;
    this.mod_game = mod_ddzhu;
};

gameclass.mod_login.prototype.createddz_wild = function (_roominfo, _mysocket) {
    var mod_ddzhu = new gameclass.mod_ddzhu;
    g_ShowBattery = true;
    this.game.uimgr.showui("gameclass.ddzhutable_wild");

    mod_ddzhu.setgame(this.game);
    mod_ddzhu.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.ddzhutable_wild"].setmod(mod_ddzhu);

    //this.gamelst[this.gamelst.length] = mod_ddzhu;
    this.mod_game = mod_ddzhu;
};

gameclass.mod_login.prototype.createsdb = function (_roominfo, _mysocket) {
    var mod = new gameclass.mod_sdb;
    g_ShowBattery = true;
    this.game.uimgr.showui("gameclass.sdbtable");

    mod.setgame(this.game);
    mod.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.sdbtable"].setmod(mod);

    //this.gamelst[this.gamelst.length] = mod_zjh;
    this.mod_game = mod;
};

gameclass.mod_login.prototype.createsaolei = function (_roominfo, _mysocket) {
    var mod = new gameclass.mod_minesweeping;
    g_ShowBattery = false;
    this.game.uimgr.showui("gameclass.minesweepingtable", false, null, 1);

    mod.setgame(this.game);
    mod.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.minesweepingtable"].setmod(mod);

    //this.gamelst[this.gamelst.length] = mod_zjh;
    this.mod_game = mod;
};

//gameclass.mod_login.prototype.createeat = function (_roominfo, _mysocket) {
//    var mod = new gameclass.mod_eat;
//    this.game.uimgr.showui("gameclass.eatTable");
//
//    mod.setgame(this.game);
//    mod.entergame(_roominfo, _mysocket);
//    this.game.uimgr.uis["gameclass.eatTable"].setmod(mod);
//
//    //this.gamelst[this.gamelst.length] = mod_zjh;
//    this.mod_game = mod;
//};

gameclass.mod_login.prototype.createptj = function (_roominfo, _mysocket) {
    g_ShowBattery = true;
    var mod_ptj = new gameclass.mod_ptj;
    this.game.uimgr.showui("gameclass.pintianjiutable");

    mod_ptj.setgame(this.game);
    mod_ptj.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.pintianjiutable"].setmod(mod_ptj);

    this.mod_game = mod_ptj;
};
gameclass.mod_login.prototype.createGoldptj = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_goldptj = new gameclass.mod_goldptj;
    this.game.uimgr.showui("gameclass.goldpintianjiutable");

    mod_goldptj.setgame(this.game);
    mod_goldptj.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.goldpintianjiutable"].setmod(mod_goldptj);

    this.mod_game = mod_goldptj;
};
gameclass.mod_login.prototype.createEBG = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_goldptj = new gameclass.mod_erbagang;
    this.game.uimgr.showui("gameclass.erbagangTable");

    mod_goldptj.setgame(this.game);
    mod_goldptj.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.erbagangTable"].setmod(mod_goldptj);

    this.mod_game = mod_goldptj;
};
gameclass.mod_login.prototype.createYSZ = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_yaosaizi;
    this.game.uimgr.showui("gameclass.goldYszTable", false, null, 1);

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.goldYszTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};

gameclass.mod_login.prototype.createDragon = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_dragon;
    this.game.uimgr.showui("gameclass.dragonTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.dragonTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};

gameclass.mod_login.prototype.createDxtb = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_dxtb;
    this.game.uimgr.showui("gameclass.dxtbTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.dxtbTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};


gameclass.mod_login.prototype.createFpj = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_goldfpj;
    this.game.uimgr.showui("gameclass.fpjTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.fpjTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};

gameclass.mod_login.prototype.createpdkfk = function(_roominfo,_mysocket) {
    g_ShowBattery = true;
    var mod_pdkfk = new gameclass.mod_pdkfk;

    this.game.uimgr.showui("gameclass.pdktableFk");
    // this.game.uimgr.closeui("gameclass.hallui");
    // this.game.uimgr.closeui("gameclass.jionroomui");


    mod_pdkfk.setgame(this.game);
    mod_pdkfk.entergame(_roominfo,_mysocket);

    this.game.uimgr.uis["gameclass.pdktableFk"].setmod(mod_pdkfk);

    //this.gamelst[this.gamelst.length] = mod_niuniu;
    this.mod_game = mod_pdkfk;
};

gameclass.mod_login.prototype.createTB = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_toubao;
    this.game.uimgr.showui("gameclass.toubaoTable", false, null, 1);

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.toubaoTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};
gameclass.mod_login.prototype.createFishing = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_fish;
    this.game.uimgr.showui("gameclass.goldFishTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.goldFishTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};
gameclass.mod_login.prototype.createTBnew = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_toubaonew;
    this.game.uimgr.showui("gameclass.toubaoTablenew", false, null, 1);

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.toubaoTablenew"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};

gameclass.mod_login.prototype.createRacing = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_racing;
    this.game.uimgr.showui("gameclass.goldracingtable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.goldracingtable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};

gameclass.mod_login.prototype.createSXDB = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_sxdb;
    this.game.uimgr.showui("gameclass.sxdbTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.sxdbTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};
//createYYBF
gameclass.mod_login.prototype.createYYBF = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_yybf;
    this.game.uimgr.showui("gameclass.goldyybftable");
    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.goldyybftable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};
//createLHD
gameclass.mod_login.prototype.createLHD = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_lhd;
    this.game.uimgr.showui("gameclass.longhudouTable");
    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.longhudouTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};
gameclass.mod_login.prototype.createPDK = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_goldptj = new gameclass.mod_pdk;
    this.game.uimgr.showui("gameclass.pdkTable");

    mod_goldptj.setgame(this.game);
    mod_goldptj.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.pdkTable"].setmod(mod_goldptj);

    this.mod_game = mod_goldptj;
};


gameclass.mod_login.prototype.createGoldTzz = function (_roominfo, _mysocket) {
    g_ShowBattery = true;
    var mod_goldttz = new gameclass.mod_goldttz;
    this.game.uimgr.showui("gameclass.goldtuitongzitable");

    mod_goldttz.setgame(this.game);
    mod_goldttz.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.goldtuitongzitable"].setmod(mod_goldttz);

    this.mod_game = mod_goldttz;
};

gameclass.mod_login.prototype.createttz = function (_roominfo, _mysocket) {
    g_ShowBattery = true;
    var mod_ttz = new gameclass.mod_ttz;
    this.game.uimgr.showui("gameclass.tuitongzitable");

    mod_ttz.setgame(this.game);
    mod_ttz.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.tuitongzitable"].setmod(mod_ttz);

    this.mod_game = mod_ttz;
};
gameclass.mod_login.prototype.createjxnn = function (_roominfo, _mysocket) {
    g_ShowBattery = true;
    var mod_niuniu = new gameclass.mod_jxnn;
    this.game.uimgr.showui("gameclass.jxnntable");

    mod_niuniu.setgame(this.game);
    mod_niuniu.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.jxnntable"].setmod(mod_niuniu);

    this.mod_game = mod_niuniu;
};
gameclass.mod_login.prototype.createnys = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_nys = new gameclass.mod_nys;

    this.game.uimgr.showui("gameclass.nystable");

    mod_nys.setgame(this.game);
    mod_nys.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.nystable"].setmod(mod_nys);

    this.mod_game = mod_nys;
};
gameclass.mod_login.prototype.createkwxroom = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_kwx = new gameclass.mod_kwx;
    this.game.uimgr.showui("gameclass.kwxtable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_kwx.setgame(this.game);
    mod_kwx.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.kwxtable"].setmod(mod_kwx);
    this.mod_game = mod_kwx;
};

gameclass.mod_login.prototype.createGoldNiu = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_goldNys();
    this.game.uimgr.showui("gameclass.goldNysTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.goldNysTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};

gameclass.mod_login.prototype.createBZW = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_leopardKing;
    this.game.uimgr.showui("gameclass.leopardKingTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.leopardKingTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};


gameclass.mod_login.prototype.createWzq = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_goldWzq = new gameclass.mod_goldWzq;
    this.game.uimgr.showui("gameclass.wzqGoldTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_goldWzq.setgame(this.game);
    mod_goldWzq.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.wzqGoldTable"].setmod(mod_goldWzq);
    mod_goldWzq.onroominfo(_roominfo);

    // this.gamelst[this.gamelst.length] = mod_goldWzq;
    // modkwx = mod_goldWzq;

    this.mod_game = mod_goldWzq;
};
gameclass.mod_login.prototype.dissmissroom = function () {
    g_isgame = false;
    g_will_room = 0;
    g_ShowBattery = false;
    this.game.uimgr.closeallui(true);
    mod_sound.stopbmg(g_music["ybao_bg"]);
    mod_sound.playbmg(g_music["bmg"],true);
    //cc.log(this.mod_game.roominfo.type);
    var bo = 0;//0普通的退到总大厅,1金币场换桌，2金币场退到金币大厅
    if(this.mod_game == null || this.mod_game.roominfo == null) {
        bo = 2;
    } else {
        if(this.mod_game.roominfo.type >= gameclass.gamegoldkwx || this.mod_game.roominfo.type == gameclass.gamewzq || this.mod_game.roominfo.type == gameclass.gameszpbaofang || this.mod_game.roominfo.type == gameclass.gameTBBF) {
            if (this.mod_game.roominfo.goldchang) {
                bo = 1;
            } else {
                bo = 2;
            }
        }
    }
    if (bo == 1) {
        this.game.uimgr.showload(true);
        this.creategoldroom(this.mod_game.roominfo.type, this.mod_game.roominfo.roomid);
    } else {
        this.game.uimgr.showui("gameclass.hallui", null, null, 0);
        if (bo == 2) {
            this.game.uimgr.showui("gameclass.hallGoldui", null, null, 0);
        }
    }
};

gameclass.mod_login.prototype.backlogin = function (type) {
    g_isgame = false;
    g_islogin = false;
    g_will_room = 0;
    g_ShowBattery = false;

    if (this.game.modmgr.mod_center.myGatewebsocket) {
        this.game.modmgr.mod_center.myGatewebsocket.ws.close();
        this.game.modmgr.mod_center.myGatewebsocket = null;
    }
    cc.log("ssssssssss");
    cc.log(type);
    this.game.uimgr.closeallui(true);
    this.game.uimgr.showui("gameclass.loginui",null,null,0);

    if (type != null && type > 0) {
        var str = [
            "网络连接超时",
            "网络连接错误"
        ]

        this.game.uimgr.showui("gameclass.msgboxui");
        this.game.uimgr.uis["gameclass.msgboxui"].setString(str[type - 1]);
    }
};

gameclass.mod_login.prototype.getfirstgame = function () {

    return this.mod_game;

};

