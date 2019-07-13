/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_zjhFk = gameclass.mod_base.extend({
    roominfo: null,
    mywebsocket: null,
    ongameready: null,
    ongameniuniubegin: null,
    ongameniuniuinfo: null,
    ongamebets: null,
    ongamecompare: null,
    ongameniuniuend: null,
    onupdateroominfo: null,
    serverchair: null,
    selfdata: null,
    ongameniuniucardui: null,
    ongameview: null,
    isover: null,
    endinfo: null,
    gamestate: null,
    score: null,
    ongamedealer: null,
    onchat: null,
    chatlst: null,
    gamewaittime: null,
    prepoint: null,
    readylist:null,
    ctor: function () {
        this.isover = false;
        this.gamestate = 0;
        this.chatlst = [];
    },

    bindUI: function (ui) {
        this.view = ui;
    },
});

//! uid是否准备
gameclass.mod_zjhFk.prototype.isReady = function (uid) {
    if(this.readylist == null) {
        return false;
    }

    for(var i = 0; i < this.readylist.length; i++) {
        if(this.readylist[i] == uid) {
            return true;
        }
    }

    return false;
}

//! 加入准备
gameclass.mod_zjhFk.prototype.addReady = function (uid) {
    if(this.readylist == null) {
        return;
    }

    for(var i = 0; i < this.readylist.length; i++) {
        if(this.readylist[i] == uid) {
            return;
        }
    }

    this.readylist.push(uid);
}

//! 删除准备
gameclass.mod_zjhFk.prototype.resetReady = function (info) {
    if(this.readylist == null) {
        return;
    }

    for(var i = 0; i < this.readylist.length;) {
        var find = false;
        for(var j = 0; j < info.length; j++) {
            if(this.readylist[i] == info[j].uid) {
                find = true;
                break;
            }
        }
        if(find) {
            i++;
        } else {
            this.readylist.splice(i, 1);
        }
    }
}

gameclass.mod_zjhFk.prototype.getMsgHandle = function (ws, data) {
    var _this = this;
    cc.log("getMsg-----zjh----->" + data.msghead + "||data=" + JSON.stringify(data.msgdata));
    switch (data.msghead) {
        case "roominfo":
            _this.resetReady(data.msgdata.person);
            _this.updateroominfo(data.msgdata);
            _this.onupdateroominfo(data.msgdata);
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
            _this.game.uimgr.closeui("gameclass.exitroom");
            if (!_this.isover) {

                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.dissmissroom();
            }
            break;
        case "gamexyzjhbye":

            _this.endinfo = data.msgdata.info;
            if (_this.endinfo != null) {
                _this.isover = true;
                _this.mywebsocket.onclosefunc = null;

                _this.ongameniuniuend(data, true);
            }

            break;
        case "tickroom":
            _this.mywebsocket.onclosefunc = null;
            _this.game.modmgr.mod_login.backlogin();
            _this.game.uimgr.showui("gameclass.msgboxui");
            _this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
            break;
        case "gameready":
            _this.addReady(data.msgdata.uid);
            _this.view.reset();
            _this.ready(data.msgdata.uid);
            _this.ongameready(data);
            //cc.log("准备:", _this.readylist);
            break;
        case "gamexyzjhbegin":
            _this.readylist = data.msgdata.ready;
            _this.gamexyzjhbeginHandle(data);
            break;
        case "gamexyzjhinfo":
            _this.readylist = data.msgdata.ready;
            _this.gamexyzjhinfoHandle(data);
            break;
        case "gamecompare":
            for (var i = 0; i < 5; i++) {
                if (i < _this.gameniuniuinfo.info.length) {
                    if (data.msgdata.uid == _this.gameniuniuinfo.info[i].uid) {
                        _this.gameniuniuinfo.info[i].bets = data.msgdata.addpoint;
                        _this.gameniuniuinfo.info[i].allbets = data.msgdata.allbets;
                    }

                    if (data.msgdata.destuid == _this.gameniuniuinfo.info[i].uid && data.msgdata.win) {
                        _this.gameniuniuinfo.info[i].lose = true
                    }

                    if (data.msgdata.uid == _this.gameniuniuinfo.info[i].uid && !data.msgdata.win) {
                        _this.gameniuniuinfo.info[i].lose = true
                    }
                }
            }

            _this.playBiSound(data);

            _this.gameniuniuinfo.curop = data.msgdata.opuid;
            _this.gameniuniuinfo.round = data.msgdata.round;//轮数
            _this.gameniuniuinfo.point = data.msgdata.point;//单注
            _this.gameniuniuinfo.allpoint = data.msgdata.allpoint;//总注
            _this.ongamecompare(data.msgdata);
            break;
        case "gamediscard":
            for (var i = 0; i < 5; i++) {
                if (i < _this.gameniuniuinfo.info.length) {
                    if (data.msgdata.uid == _this.gameniuniuinfo.info[i].uid) {
                        _this.gameniuniuinfo.info[i].discard = true
                    }
                }
            }
            _this.playDiscardSound(data);
            _this.gameniuniuinfo.curop = data.msgdata.opuid;
            _this.gameniuniuinfo.round = data.msgdata.round;
            // cc.log("discard............");
            _this.ongamebets();
            _this.discardHandle(data.msgdata);
            break;
        case "gamebets":
            _this.gamebetsHandle(data);
            break;
        case "gamexyzjhend":
            _this.gamexyzjhendHandle(data);
            break;
        case "gameniuniucard":
            _this.ongameniuniucard(data.msgdata.card, data.msgdata.all);
            _this.ongameniuniucardui();
            break;
        case "gameview":
            //if ( data.msgdata.uid  == _this.game.modmgr.mod_login.logindata.uid){

            for (var i = 0; i < _this.gameniuniuinfo.info.length; i++) {
                if (_this.gameniuniuinfo.info[i].uid == data.msgdata.uid) {
                    _this.gameniuniuinfo.info[i].card = data.msgdata.card;
                    _this.gameniuniuinfo.info[i].open = true;
                }
            }

            _this.playKanSound(data);

            //}
            _this.ongameview(data.msgdata.uid, data.msgdata.card, data.msgdata.type);
            break;
        case "dissmissroom":
            _this.game.uimgr.closeui("gameclass.exitroom");
            _this.game.uimgr.showui("gameclass.exitroom", false);
            _this.game.uimgr.uis["gameclass.exitroom"].setData(_this, data.msgdata);
            break;
        case "nodissmissroom":
            _this.game.uimgr.closeui("gameclass.exitroom");
            _this.game.uimgr.showui("gameclass.msgboxui");
            _this.game.uimgr.uis["gameclass.msgboxui"].setString("有人不同意解散房间");
            break;
        case "gamedeal":
            _this.rob(data.msgdata.uid, data.msgdata.ok);
            _this.ongamedealer(false);
            break;
        case "gamedealer":
            for (var i = 0; i < _this.gameniuniuinfo.info.length; i++) {
                if (_this.gameniuniuinfo.info[i].uid == data.msgdata.uid) {
                    _this.gameniuniuinfo.info[i].dealer = true;
                    _this.rob(data.msgdata.uid, true);
                }
            }
            _this.ongamedealer(true);
            break;
        case "chatroom":
            _this.chatlst[_this.chatlst.length] = data.msgdata;

            if (_this.game.uimgr.uis["gameclass.chatui"])
                _this.game.uimgr.uis["gameclass.chatui"].pushstr(data.msgdata);

            if (_this.onchat) {
                _this.onchat(data.msgdata);
            }
            break;
        case "lineperson":
            for (var i = 0; i < _this.roominfo.person.length; i++) {
                if (_this.roominfo.person[i].uid == data.msgdata.uid) {
                    _this.roominfo.person[i].ip = "";
                    // cc.log("lineperson");
                    _this.game.uimgr.uis["gameclass.zjhtablefk"].resetIcon(data.msgdata.uid);
                    break;
                }
            }
            break;
        case "gamewaittime":
            if (_this.gamewaittime) {
                _this.gamewaittime(data.msgdata);
            }
            break;
        case "gameline":
            var curIndex = _this.getPlayerIndexById(data.msgdata.uid);
            //cc.log(curIndex)
            if (curIndex || curIndex === 0)
                _this.view.userLineOut(curIndex, data.msgdata);
            break;
    }
}
gameclass.mod_zjhFk.prototype.discardHandle = function (data) {

}
gameclass.mod_zjhFk.prototype.gamexyzjhendHandle = function (data) {
    var _this = this;

    _this.gameniuniuinfo.round = data.msgdata.round;
    _this.gameniuniuinfo.point = data.msgdata.point;
    _this.gameniuniuinfo.allpoint = data.msgdata.allpoint;

    for (var i = 0; i < _this.roominfo.person.length; i++) {
        //_this.roominfo.person[i].ready = false;
        _this.roominfo.person[i].rob = 0;
    }
    //_this.gameniuniuinfo.ready = [];

    _this.gamestate = 2;
    // cc.log("gameniuniuend");
    _this.gameniuniuinfo.info = data.msgdata.info;
    _this.updategameniuniuinfo(_this.gameniuniuinfo);
    _this.ongameniuniuend(data, false);
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
}
gameclass.mod_zjhFk.prototype.gamexyzjhbeginHandle = function (data) {
    var _this = this;

    _this.gameniuniuinfo.curop = data.msgdata.opuid;
    _this.gameniuniuinfo.round = data.msgdata.round;//轮数
    _this.gameniuniuinfo.point = data.msgdata.point;//单注
    _this.gameniuniuinfo.allpoint = data.msgdata.allpoint;//总注
    _this.prepoint = _this.gameniuniuinfo.point;

    // cc.log("gamexyzjhbegin");
    _this.roominfo.step += 1;
    for (var i = 0; i < 5; i++) {
        if (i < _this.gameniuniuinfo.info.length) {
            _this.gameniuniuinfo.info[i].bets = 0;
        }
    }
    _this.gamestate = 1;
    _this.updategameniuniuinfo(data.msgdata);
    _this.ongameniuniubegin(data);
    //_this.view.checkSafe(_this.roominfo.person);
    _this.view.safeLayer.btn_safe.setVisible(false);

    /*
     * msgdata =
     {
     begin bool = 是否开始
     ready []string = 准备的人,begin = false的时候有用
     info []node = 游戏数据，begin = true的时候有用
     }

     * */
}
gameclass.mod_zjhFk.prototype.gamexyzjhinfoHandle = function (data) {
    var _this = this;

    // cc.log("gamexyzjhinfo");
    _this.updategameniuniuinfo(data.msgdata);
    _this.prepoint = _this.gameniuniuinfo.point;
    _this.ongameniuniuinfo(_this.gameniuniuinfo);
    if (data.msgdata.begin) {
        _this.view.getChipArr(data.msgdata.allpoint);
    }
    _this.view.checkSafe(_this.roominfo.person);
    if (data.msgdata.begin) {
        _this.view.safeLayer.btn_safe.setVisible(false);
    }
    /*
     msgdata =
     {
     begin bool = 是否开始
     ready []string = 准备的人,begin = false的时候有用
     info []node = 游戏数据，begin = true的时候有用
     }

     * */
}
/**
 * 播放看牌音效
 * @param data
 */
gameclass.mod_zjhFk.prototype.playKanSound = function (data) {
    var _this = this;
    for (var i = 0; i < _this.roominfo.person.length; i++) {
        if (_this.roominfo.person[i].uid == data.msgdata.uid) {
            if (_this.roominfo.person[i].sex != 0) {
                mod_sound.playeffect(g_music.f_see, false);
            } else {
                mod_sound.playeffect(g_music.m_see, false);
            }
        }
    }
}
/**
 * 播放比牌音效
 * @param data
 */
gameclass.mod_zjhFk.prototype.playBiSound = function (data) {
    mod_sound.playeffect(g_music.fire, false);
}
/**
 * 播放弃牌音效
 * @param data
 */
gameclass.mod_zjhFk.prototype.playDiscardSound = function (data) {
    var _this = this;
    for (var i = 0; i < _this.roominfo.person.length; i++) {
        if (_this.roominfo.person[i].uid == data.msgdata.uid) {
            if (_this.roominfo.person[i].sex != 0) {
                mod_sound.playeffect(g_music.f_giveup, false);
            } else {
                mod_sound.playeffect(g_music.m_giveup, false);
            }
        }
    }
}
/**
 * 播放跟注等音效
 * @param data
 */
gameclass.mod_zjhFk.prototype.playBetSound = function (data) {
    var _this = this;
    for (var i = 0; i < _this.roominfo.person.length; i++) {
        if (_this.roominfo.person[i].uid == data.msgdata.uid) {

            if (data.msgdata.point == _this.prepoint) {
                if (_this.roominfo.person[i].sex != 0) {
                    mod_sound.playeffect(g_music.f_follow1, false);
                } else {
                    mod_sound.playeffect(g_music.m_follow1, false);
                }
            } else {
                if (_this.roominfo.person[i].sex != 0) {
                    mod_sound.playeffect(g_music.f_add, false);
                } else {
                    mod_sound.playeffect(g_music.m_add, false);
                }
                _this.prepoint = data.msgdata.point;
            }

        }
    }
}
gameclass.mod_zjhFk.prototype.gamebetsHandle = function (data) {
    var _this = this;
    // cc.log("gamebets");
    // -1表示弃牌 0表示看牌 1表示跟住 2表示加注

    for (var i = 0; i < 5; i++) {
        if (i < _this.gameniuniuinfo.info.length) {
            if (data.msgdata.uid == _this.gameniuniuinfo.info[i].uid) {
                _this.gameniuniuinfo.info[i].bets = data.msgdata.addpoint;
                if(_this.roominfo.type >= gameclass.gamegoldszp||_this.roominfo.type==gameclass.gameszpbaofang) {
                    _this.gameniuniuinfo.info[i].total = data.msgdata.allbets;
                } else {
                    _this.gameniuniuinfo.info[i].allbets = data.msgdata.allbets;
                }
            }
        }
    }

    _this.playBetSound(data);

    _this.gameniuniuinfo.curop = data.msgdata.opuid;
    _this.gameniuniuinfo.round = data.msgdata.round;
    _this.gameniuniuinfo.point = data.msgdata.point;
    _this.gameniuniuinfo.allpoint = data.msgdata.allpoint;
    _this.ongamebets(data.msgdata.uid);
    /*
     msghead = "gamebets"
     msgdata = {bets int}
     客户端发送下注消息,bets为下注数量
     收到的回复可能两种
     1.
     msghead = "gamebets"
     msgdata = {openid string, bets int}

     * */
}
gameclass.mod_zjhFk.prototype.entergame = function (_roominfo, _mywebsocket) {
    //{\"roomid\":351846,\"person\":[{\"openid\":\"59ef6e332117175342041f0e5e90dace\",\"name\":\"游客\",\"imgurl\":\"\",\
    // "ip\":\"221.234.240.2\",\"line\":true}],\"time\":0,\"agree\":[]}"}
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;

    this.updateroominfo(this.roominfo);

    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws, data) {
        _this.getMsgHandle(ws, data);
    });
};

gameclass.mod_zjhFk.prototype.updateroominfo = function (roominfo) {
    this.roominfo = roominfo;
    this.roominfo.wanfa = roominfo.param1 % 10;
    this.roominfo.extraReward = roominfo.param2 % 10;
    this.roominfo.bishuangbei = parseInt((roominfo.param2 / 10 ) % 10);
    this.roominfo.zidongqipai = parseInt((roominfo.param2 / 1000) % 10);

    this.countServerChair();
    if(this.roominfo.person){
        for (var i = 0; i < this.roominfo.person.length; i++) {
            //this.roominfo.person[i].ready = false;
            this.roominfo.person[i].rob = 0;
        }
    }


    // cc.log("mod_zjhFk updateroominfo personLength===="+this.roominfo.person.length);

    if (this.gameniuniuinfo != null) {
        this.updategameniuniuinfo(this.gameniuniuinfo);
    }
};

gameclass.mod_zjhFk.prototype.countServerChair = function () {
    if (!this.roominfo.person) return;
    for (var i = 0; i < this.roominfo.person.length; i++) {
        if (this.roominfo.person[i].uid == this.game.modmgr.mod_login.logindata.uid) {
            this.serverchair = i;
            this.selfdata = this.roominfo.person[i];
            break;
        }
    }
}
gameclass.mod_zjhFk.prototype.getserverchair = function (cur) {
    return (this.serverchair + cur ) % 5;
};
/**
 * 根据服务器座位索引，获取场景座位索引
 * @param serverIndex
 * @return {number}
 */
gameclass.mod_zjhFk.prototype.getSceneIndexFromS = function (serverIndex) {
    return (5 + serverIndex - this.serverchair ) % 5;
};
gameclass.mod_zjhFk.prototype.updategameniuniuinfo = function (gameniuniuinfo) {
    this.gameniuniuinfo = gameniuniuinfo;

    //this.ready = this.gameniuniuinfo.ready;
    if (this.gameniuniuinfo.ready != null) {
        for (var i = 0; i < this.gameniuniuinfo.ready.length; i++) {
            this.ready(this.gameniuniuinfo.ready[i]);
        }

    } else {
        for (var i = 0; i < this.roominfo.person.length; i++) {
            //this.roominfo.person[i].ready = false;
            this.roominfo.person[i].rob = 0;
        }
    }

};

gameclass.mod_zjhFk.prototype.ready = function (uid) {
    this.addReady(uid);
    //for (var i = 0; i < this.roominfo.person.length; i++) {
    //    if (this.roominfo.person[i].uid == uid) {
    //        this.roominfo.person[i].ready = true;
    //    }
    //}
};

gameclass.mod_zjhFk.prototype.rob = function (uid, ok) {
    for (var i = 0; i < this.roominfo.person.length; i++) {
        if (this.roominfo.person[i].uid == uid) {
            if (ok)
                this.roominfo.person[i].rob = 1;
            else
                this.roominfo.person[i].rob = 2;
        }
    }
};

gameclass.mod_zjhFk.prototype.dissmissroom = function () {
    var data = {};
    this.mywebsocket.send("dissmissroom", data);
};

gameclass.mod_zjhFk.prototype.gameready = function () {
    var data = {};
    this.mywebsocket.send("gameready", data);
};

gameclass.mod_zjhFk.prototype.gameniuniubegin = function () {
    var data = {};
    this.mywebsocket.send("gameniuniubegin", data);
};


gameclass.mod_zjhFk.prototype.gamebets = function (num) {

    /*for(var i = 0;i < 5;i++){
     if (i < this.gameniuniuinfo.info.length){
     if (this.game.modmgr.mod_login.logindata.uid == this.gameniuniuinfo.info[i].uid){
     this.gameniuniuinfo.info[i].bets = num;
     }
     }
     }*/

    var data = {"bets": Number(num)};
    this.mywebsocket.send("gamebets", data);
};
gameclass.mod_zjhFk.prototype.gamebfallbets = function (num) {
    var data = {"bets": Number(num)};
    this.mywebsocket.send("gameallbets", data);
};

gameclass.mod_zjhFk.prototype.gamecompare = function (index) {

    playerdata = this.getplayerdata(index)
    if (index > 0 && playerdata != null) {
        var destuid = playerdata.uid;
        var data = {"destuid": Number(destuid)};
        this.mywebsocket.send("gamecompare", data);
    }

};

gameclass.mod_zjhFk.prototype.gameview = function () {
    var data = {};
    this.mywebsocket.send("gameview", data);
};

gameclass.mod_zjhFk.prototype.gameend = function () {
    var data = {};
    this.mywebsocket.send("gameend", data);
};

gameclass.mod_zjhFk.prototype.nodissmissroom = function () {
    var data = {};
    this.mywebsocket.send("nodissmissroom", data);
};

gameclass.mod_zjhFk.prototype.gamedeal = function (b) {
    var data = {"ok": b};
    this.mywebsocket.send("gamedeal", data);
};

gameclass.mod_zjhFk.prototype.chat = function (type, info) {
    var data = {"type": type, "chat": info};
    this.mywebsocket.send("chatroom", data);
};
gameclass.mod_zjhFk.prototype.getplayerdata = function (cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair > this.roominfo.person.length) {
        return
    }

    return this.roominfo.person[serverchair];
};

gameclass.mod_zjhFk.prototype.getplayerdatabyuid = function (uid) {

    for (var i = 0; i < this.roominfo.person.length; i++) {
        if (this.roominfo.person[i].uid == uid) {
            return this.roominfo.person[i];
        }
    }
};

gameclass.mod_zjhFk.prototype.getplayerotherdata = function (cur) {
    var serverchair = this.getserverchair(cur);

    if (!this.gameniuniuinfo || serverchair >= this.gameniuniuinfo.info.length) {
        return
    }

    return this.gameniuniuinfo.info[serverchair];
};
/**
 * 根据UID寻找用户数据
 * @param uid
 */
gameclass.mod_zjhFk.prototype.getOtherdataFromUid = function (uid) {
    if (!this.gameniuniuinfo) return null;
    var len = this.gameniuniuinfo.info.length;
    for (var i = 0; i < len; i++) {
        var info = this.gameniuniuinfo.info[i];
        if (info.uid == uid) {
            return info;
        }
    }
    return null;
}
gameclass.mod_zjhFk.prototype.ongameniuniucard = function (card, all) {
    for (var i = 0; i < this.gameniuniuinfo.info.length; i++) {

        if (this.gameniuniuinfo.info[i].uid == this.game.modmgr.mod_login.logindata.uid) {
            this.gameniuniuinfo.info[i].card[4] = card;
            if (all) {
                this.gameniuniuinfo.info[i].card = all;
            }
            break;
        }
    }
};

gameclass.mod_zjhFk.prototype.getplayernum = function () {
    return this.gameniuniuinfo.info.length;
};

gameclass.mod_zjhFk.prototype.getPlayerIndexById = function (uid) {
    for (var i = 0; i < this.roominfo.person.length; i++) {
        if (this.roominfo.person[i] && this.roominfo.person[i].uid == uid) {
            return i;
        }
    }
}


