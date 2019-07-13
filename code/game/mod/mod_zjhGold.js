gameclass.mod_zjhGold = gameclass.mod_zjhFk.extend({
    personMine: null,
    isLook:true,
    /**
     * 跟注、加注、弃牌、看牌、搓牌、比牌当前播放的声音在声音总长度（见gameclass.mod_zjhGold.SOUND_GEN_NUM）中的索引
     */
    _soundGenIndex: 0,
    _soundJiaIndex: 0,
    _soundQiIndex: 0,
    _soundKanIndex: 0,
    _soundCuoIndex: 0,
    _soundBiIndex: 0,
    //允许看牌的轮次
    _canKanRound:0,
    //允许比牌的轮次
    _canBiRound:0,
    ctor: function () {
        this._super();
    },
    setgame: function (_game) {
        this._super(_game);

        this._soundGenIndex = -1;
        this._soundJiaIndex = -1;
        this._soundQiIndex = -1;
        this._soundKanIndex = -1;
        this._soundCuoIndex = -1;
        this._soundBiIndex = -1;

    },
    updateroominfo: function (roominfo) {
        this.personMine = {
            "uid": this.game.modmgr.mod_login.logindata.uid,
            "name": this.game.modmgr.mod_login.logindata.name,
            "imgurl": this.game.modmgr.mod_login.logindata.imgurl,
            "sex": this.game.modmgr.mod_login.logindata.sex,
            "ip": this.game.modmgr.mod_login.logindata.ip,
            "line": true,
            "address": "",
            "longitude": "",
            "latitude": "",
            "param": 1
        };

        this._super(roominfo);

        if (this.roominfo.person == null) {
            this.roominfo.person = [this.personMine];
        } else {
            this.roominfo.person = this.addPerson(this.roominfo.person, this.personMine);
        }

        this.countServerChair();

        this.synNiuniuino();

        // cc.log(this.roominfo.person);

        if (this.isJingDian()) {
            this._canKanRound = gameclass.mod_zjhGold.CLASSIC_MEN_RUOND;
            this._canBiRound = gameclass.mod_zjhGold.CLASSIC_BI_RUOND;
        }else{
            this._canKanRound = gameclass.mod_zjhGold.MEN_ROUND;
            this._canBiRound = gameclass.mod_zjhGold.BI_RUOND;
        }
    },
    updategameniuniuinfo: function (gameniuniuinfo) {
        var infoMine = {
            "uid": this.game.modmgr.mod_login.logindata.uid,
            "name": this.game.modmgr.mod_login.logindata.name,
            "open": false,
            "discard": false,
            "lose": false,
            "card": [],
            "bets": 0,
            "allbets": 0,
            "dealer": false,
            "score": 0,
            "baozi": 0,
            "total": this.game.modmgr.mod_login.logindata.gold
        };


        if(this.gameniuniuinfo && !this.gameniuniuinfo.begin){
            this.isLook = false;
        }
        if (gameniuniuinfo.info.length == 0) {
            gameniuniuinfo.info = [infoMine];
            this.isLook = true;
        }else{
            this.gameniuniuinfo = gameniuniuinfo;
            var mineInfo = this.getOtherdataFromUid(this.game.modmgr.mod_login.logindata.uid);
            if(!mineInfo){
                gameniuniuinfo.info.push(infoMine);
                this.isLook = true;
            }
        }

        this.synGamePerson();

        this._super(gameniuniuinfo);
    },
    gamexyzjhinfoHandle: function (data) {
        this._super(data);

        this.view._timerControl.startCount(data.msgdata.time);
    },
    gamebetsHandle: function (data) {
        this._super(data);

        var serverIndex = this.getPlayerIndexById(data.msgdata.uid);
        var sceneIndex = this.getSceneIndexFromS(serverIndex);
        var playerView = this.view.players[sceneIndex];
        var playerHead = playerView.iconback;
        playerView.cooldown.setVisible(false);
        this.view.clearProgress(playerView.head);
        if (sceneIndex == 0 || sceneIndex == 3 || sceneIndex == 4) {
            playerHead.runAction(cc.sequence(cc.moveTo(0.3, playerView.iconPosX + 20, playerView.iconPosY), cc.moveTo(0.3, playerView.iconPosX, playerView.iconPosY)))
        } else {
            playerHead.runAction(cc.sequence(cc.moveTo(0.3, playerView.iconPosX - 20, playerView.iconPosY), cc.moveTo(0.3, playerView.iconPosX, playerView.iconPosY)))
        }
        if (data.msgdata.bets == gameclass.mod_zjh.BET_TYPE_1) {
            this.view.players[sceneIndex].betTxt.setString(gameclass.mod_zjh.BET_TYPE_1_NAME + ":" + data.msgdata.addpoint);
        } else if (data.msgdata.bets >= gameclass.mod_zjh.BET_TYPE_2) {
            this.view.players[sceneIndex].betTxt.setString(gameclass.mod_zjh.BET_TYPE_2_NAME + ":" + data.msgdata.addpoint);
        } else {
            this.view.players[sceneIndex].betTxt.setString("");
        }
        this.showYSText(-data.msgdata.addpoint,this.view.players[sceneIndex].head.getPosition(),this.view.node, 0);
        this.turnCheck();

        var curUserData = this.getOtherdataFromUid(this.gameniuniuinfo.curop);

        this.view.refreshStep();

        //this.gameniuniuinfo.info[serverIndex].total -= data.msgdata.addpoint;
        this.view.updatePersonGold();
    },
    updateUserCard:function (uid) {
        var serverIndex = this.getPlayerIndexById(uid);
        var sceneIndex = this.getSceneIndexFromS(serverIndex);
        this.view.players[sceneIndex].cards.setVisible(true);
        this.view.updateHandCard(this.view.players[sceneIndex].cards, this.gameniuniuinfo.info[serverIndex].card, sceneIndex);
        if (this.gameniuniuinfo.begin && this.gameniuniuinfo.info[serverIndex].discard || this.gameniuniuinfo.info[serverIndex].lose) {
            for (var j = 0; j < this.view.players[sceneIndex].cards.getChildrenCount(); j++) {
                var card = this.view.players[sceneIndex].cards.getChildren()[j];
                card.setColor(cc.color(111, 111, 111, 255));
                if (this.gameniuniuinfo.info[serverIndex].uid == this.game.modmgr.mod_login.logindata.uid) {
                    card.setScale(0.8);
                }
            }
            this.view.addCardStatue(this.view.players[sceneIndex].cards, res.qipaiLogo, sceneIndex);
            if(this.gameniuniuinfo.info[serverIndex].discard && sceneIndex == 0){
                //自己弃牌
                var statusS = this.view.players[sceneIndex].cards.getChildren()[this.view.players[sceneIndex].cards.getChildrenCount() - 1];
                statusS.setPosition(cc.p(86.73, -10));
            }
        }else if(this.gameniuniuinfo.begin && this.gameniuniuinfo.info[serverIndex].open && this.gameniuniuinfo.info[serverIndex].uid != this.game.modmgr.mod_login.logindata.uid){
            this.view.addCardStatue(this.view.players[sceneIndex].cards, res.kanpaiLogo, sceneIndex);
        }
    },
    gameZjhbeginHandle: function (data) {
        this.gameniuniuinfo.begin = true;
        this.view.startBetHandle();
        this.view.startBtnVisibleCheck();

        var _this = this;
        gameclass.showStartAnim(this.view);
        this.view.scheduleOnce(function () {
            _this.gamexyzjhbeginHandle(data);
        }, 2);
        this.turnCheck();
    },
    playBetSound: function (data) {
        this.playSoundHandle(data.msgdata.bets, data.msgdata.uid);
    },
    playDiscardSound:function (data) {
        this.playSoundHandle(gameclass.mod_zjh.QIPAI_TYPE, data.msgdata.uid);
    },
    playKanSound:function (data) {
        this.playSoundHandle(data.msgdata.type, data.msgdata.uid);
    },
    playBiSound:function (data) {
        this.playSoundHandle(gameclass.mod_zjh.BIPAI_TYPE, data.msgdata.uid);
    },
    getMsgHandle: function (ws, data) {
        this._super(ws, data);

        switch (data.msghead) {
            case "gametime":
                this.view._timerControl.startCount(data.msgdata.time);
                break;
            case "gamezjhinfo":
                this.readylist = data.msgdata.ready;
                this.gamexyzjhinfoHandle(data);
                this.view.checkSafe(this.roominfo.person);
                if(data.msgdata.begin){
                    this.view.safeLayer.btn_safe.setVisible(false);
                }
                break;
            case "roomseat":
                this.roomSeatHandle(data.msgdata);
                this.view.refplayerinfo();
                this.view.checkSafe(data.msgdata.person);
                break;
            case "gamegoldtotal":
                this.updateGold(data.msgdata.info);
                break;
            case "gamezjhbegin":
                this.readylist = data.msgdata.ready;
                this.gamexyzjhbeginHandle(data);
                // this.gameZjhbeginHandle(data);
                break;
            case "gameniuniuend":

                this.resetData();
                this.gamexyzjhendHandle(data);
                break;
        }
    },
});

gameclass.mod_zjhGold.prototype.resetData = function () {
    if(this.gameniuniuinfo){
        this.gameniuniuinfo.begin = false;
        this.readylist = [];
        var len = this.gameniuniuinfo.info.length;
        for(var i = 0;i<len;i++){
            var info = this.gameniuniuinfo.info[i];
            info.open = false;
            info.discard = false;
            info.lose = false;
            info.card = [];
        }
    }
}
/**
 * 更新金币数据
 * @param persons
 * @param addPerson
 */
gameclass.mod_zjhGold.prototype.updateGold = function (arr) {
    //this.gameniuniuinfo.info = [];
    var len = this.roominfo.person.length;

    if (len != arr.length) {
        throw new Error("更新金币数据时，获取到金币用户数量有误!");
    }

    for (var i = 0; i < len; i++) {
        var person = this.roominfo.person[i];
        for (var j = 0; j < arr.length; j++) {
            var gold = arr[j];
            if (gold.uid == person.uid) {
                this.gameniuniuinfo.info[i].total = arr[j].total;
            }
        }
    }
    // cc.log( this.gameniuniuinfo.info);

    this.view.updatePersonGold();
}
/**
 * 添加用户
 * @param roominfo
 * @param person
 * @return {*}
 */
gameclass.mod_zjhGold.prototype.addPerson = function (persons, addPerson) {
    var len = persons.length;
    var isHas = false;
    for (var i = 0; i < len; i++) {
        var person = persons[i];
        if (person.uid == addPerson.uid) {
            //person.ready = this.getInfoReady(person.uid);
            isHas = true;
            break;
        }
    }
    if (!isHas) {
        persons.push(addPerson);
    }
    return persons;
}
/**
 * 获取用户是否已准备
 * @param uid
 * @return {boolean}
 */
gameclass.mod_zjhGold.prototype.getInfoReady = function (uid) {
    return this.isReady(uid);
    //if(!this.gameniuniuinfo || !this.gameniuniuinfo.ready)return false;
    //for(var j = 0;j<this.gameniuniuinfo.ready.length;j++){
    //    var readyUid = this.gameniuniuinfo.ready[j];
    //    if(uid == readyUid){
    //        return true;
    //    }
    //}
    //return false;
}
gameclass.mod_zjhGold.prototype.roomSeatHandle = function (data) {
    // cc.log(this.gameniuniuinfo.ready);

    var isHasMine = false;
    var newPerson = [];
    for (var i = 0; i < data.person.length; i++) {
        var seatPerson = data.person[i];
        if (seatPerson.uid == this.game.modmgr.mod_login.logindata.uid) {
            isHasMine = true;
        }
        for (var j = 0; j < this.roominfo.person.length; j++) {
            var existPerson = this.roominfo.person[j];
            if (existPerson.uid == seatPerson.uid) {
                //seatPerson.ready = existPerson.ready;
                break;
            }
        }
        newPerson.push(seatPerson);
    }
    if (!isHasMine) {
        this.isLook = true;
        newPerson = this.addPerson(newPerson, this.personMine);
    }else{
        this.isLook = false;
    }

    this.roominfo.person = newPerson;

    this.synNiuniuino();

    // cc.log("mod_zjhFkGold roomSeatHandle personLength===="+this.roominfo.person.length);
    this.countServerChair();
}
gameclass.mod_zjhGold.prototype.synGamePerson = function () {
    if(!this.gameniuniuinfo || !this.gameniuniuinfo.info)return;

    var len = this.gameniuniuinfo.info.length;
    var personLen = this.roominfo.person.length;
    for(var i = 0;i<len;i++){
        var info = this.gameniuniuinfo.info[i];
        for(var j = 0;j<personLen;j++){
            var person = this.roominfo.person[j];
            if(person.uid == info.uid){
                info.name = person.name;
                break;
            }
        }
    }
}
/**
 * roominfo.person刷新，同步到gameniuniuinfo
 */
gameclass.mod_zjhGold.prototype.synNiuniuino = function () {
    if(this.gameniuniuinfo && this.gameniuniuinfo.info){
        var infoArr = [];
        var len = this.roominfo.person.length;
        for(var i = 0;i<len;i++){
            var user = this.roominfo.person[i];
            //user.ready = this.getInfoReady(user.uid);
            var isHas = false;
            for(var j = 0;j<this.gameniuniuinfo.info.length;j++){
                var info = this.gameniuniuinfo.info[j];
                if(info.uid == user.uid){
                    info.name = user.name;
                    infoArr.push(info);
                    isHas = true;
                    break;
                }
            }
            if(!isHas){
                infoArr.push({
                    "uid": user.uid,
                    "name": user.name,
                    "open": false,
                    "discard": false,
                    "lose": false,
                    "card": [],
                    "bets": 0,
                    "allbets": 0,
                    "dealer": false,
                    "score": 0,
                    "baozi": 0,
                    "total": user.param
                });
            }
        }
        this.gameniuniuinfo.info = infoArr;
    }
}
gameclass.mod_zjhGold.prototype.turnCheck = function () {
    if(this.gameniuniuinfo.curop == this.game.modmgr.mod_login.logindata.uid){
        this.view.onTurnHandle(true);
    }else{
        this.view.onTurnHandle(false);
    }
}
/**
 * 根据UID，处理游戏音效
 * @param type
 * @param uid
 */
gameclass.mod_zjhGold.prototype.playSoundHandle = function (type, uid) {
    for (var i = 0; i < this.roominfo.person.length; i++) {
        if (this.roominfo.person[i].uid == uid) {
            if(type == gameclass.mod_zjh.CUOPAI_TYPE){
                if(uid == this.game.modmgr.mod_login.logindata.uid) {
                    //自己搓牌才播放音效
                    mod_sound.playeffect(this.getNextSoundUrl(type, this.roominfo.person[i].sex), false);
                }
            }else{
                mod_sound.playeffect(this.getNextSoundUrl(type, this.roominfo.person[i].sex), false);
            }
        }
    }
}
/**
 * 跟注，加注飘分
 * @param _score
 * @param _startPos
 * @param _parentNode
 * @param delayTime
 */
gameclass.mod_zjhGold.prototype.showYSText = function(_score,_startPos,_parentNode, delayTime){
    var node = new gameclass.piaofen(_score);
    node.setPosition(_startPos);
    _parentNode.addChild(node);
    node.runAction(cc.sequence(cc.delayTime(delayTime),cc.moveBy(0.5,cc.p(0,50)),cc.callFunc(function(sender){
        sender.removeFromParent(true);
        sender = null;
    })))
};
/**
 * 是否经典场
 */
gameclass.mod_zjhGold.prototype.isJingDian = function () {
    var result = false;
    if (this.roominfo.type % 2 == 0) {
        result = true;
    }
    return result;
}
gameclass.mod_zjhGold.prototype.traceUserInfo = function () {
    // if(!this.gameniuniuinfo || !this.gameniuniuinfo.info)return;
    // var len = this.gameniuniuinfo.info.length;
    // for(var i = 0;i<len;i++){
    //     var info = this.gameniuniuinfo.info[i];
    //     cc.log("i:"+i+",name="+info.name+",uid="+info.uid);
    // }
    // cc.log("traceGameniuniuinfo complete...");
}
gameclass.mod_zjhGold.prototype.tracePersons = function () {
    // if(!this.roominfo || !this.roominfo.person)return;
    // var len = this.roominfo.person.length;
    // for(var i = 0;i<len;i++){
    //     var info = this.roominfo.person[i];
    //     cc.log("i:"+i+",name="+info.name+",uid="+info.uid);
    // }
    // cc.log("traceroomPerson complete...");
}
gameclass.mod_zjhGold.prototype.gameend = function () {
    var data = {};
    this.mywebsocket.send("gameend", data);
};
/**
 * 根据类型获取下一个音效
 * @param type
 * @param isMale
 * @return {*}
 */
gameclass.mod_zjhGold.prototype.getNextSoundUrl = function (type, isMale) {
    var result;
    var prev;
    if (isMale) {
        prev = "m_";
    } else {
        prev = "f_";
    }
    if (type == gameclass.mod_zjh.BIPAI_TYPE) {
        this._soundBiIndex++;
        if (this._soundBiIndex >= gameclass.mod_zjhGold.SOUND_BI_NUM) {
            this._soundBiIndex = 0;
        }
        result = g_music[prev + "b" + this._soundBiIndex];
    } else if (type == gameclass.mod_zjh.CUOPAI_TYPE) {
        this._soundCuoIndex++;
        if (this._soundCuoIndex >= gameclass.mod_zjhGold.SOUND_CUO_NUM) {
            this._soundCuoIndex = 0;
        }
        result = g_music[prev + "c" + this._soundCuoIndex];
    } else if (type == gameclass.mod_zjh.QIPAI_TYPE) {
        this._soundQiIndex++;
        if (this._soundQiIndex >= gameclass.mod_zjhGold.SOUND_QI_NUM) {
            this._soundQiIndex = 0;
        }
        result = g_music[prev + "q" + this._soundQiIndex];
    } else if (type == gameclass.mod_zjh.KANPAI_TYPE) {
        this._soundKanIndex++;
        if (this._soundKanIndex >= gameclass.mod_zjhGold.SOUND_KAN_NUM) {
            this._soundKanIndex = 0;
        }
        result = g_music[prev + "k" + this._soundKanIndex];
    } else if (type == gameclass.mod_zjh.BET_TYPE_1) {
        this._soundGenIndex++;
        if (this._soundGenIndex >= gameclass.mod_zjhGold.SOUND_GEN_NUM) {
            this._soundGenIndex = 0;
        }
        result = g_music[prev + "g" + this._soundGenIndex];
    } else {
        this._soundJiaIndex++;
        if (this._soundJiaIndex >= gameclass.mod_zjhGold.SOUND_JIA_NUM) {
            this._soundJiaIndex = 0;
        }
        result = g_music[prev + "j" + this._soundJiaIndex];
    }
    // cc.log("getNextSoundUrl:type=" + type + ",isMale=" + isMale + ",result============" + result);
    return result;
}
//游戏人数
gameclass.mod_zjh.USER_NUM = 5;
/**
 * 金币房间加注可选倍率
 * @type {[number,number,number,number,number]}
 */
gameclass.mod_zjhGold.SCORE_RATE = [1, 2, 3, 4, 5];
/**
 * 经典和疯狂两种模式下，房间底分列表
 * @type {[null,null]}
 */
gameclass.mod_zjhGold.SCORE_RULE = [
    [50, 100, 200, 300, 500, 1000],
    [50, 100, 200, 300, 500, 1000]
];
/**
 * 入场抽水倍率
 * @type {number}
 */
gameclass.mod_zjh.CONSUME_RATE = 0.5;
/**
 * 比牌type :自定义
 * @type {number}
 */
gameclass.mod_zjh.BIPAI_TYPE = -3;
/**
 * 搓牌type
 * @type {number}
 */
gameclass.mod_zjh.CUOPAI_TYPE = -2;
/**
 * 弃牌type
 * @type {number}
 */
gameclass.mod_zjh.QIPAI_TYPE = -1;
/**
 * 看牌type
 * @type {number}
 */
gameclass.mod_zjh.KANPAI_TYPE = 0;
/**
 * 跟注
 * @type {number}
 */
gameclass.mod_zjh.BET_TYPE_1 = 1;
/**
 * 加注
 * @type {number}
 */
gameclass.mod_zjh.BET_TYPE_2 = 2;
gameclass.mod_zjh.BET_TYPE_1_NAME = "跟注";
gameclass.mod_zjh.BET_TYPE_2_NAME = "加注";
/**
 * 跟注音效数量
 * @type {number}
 */
gameclass.mod_zjhGold.SOUND_GEN_NUM = 4;
/**
 * 加注音效数量
 * @type {number}
 */
gameclass.mod_zjhGold.SOUND_JIA_NUM = 4;
/**
 * 弃牌音效数量
 * @type {number}
 */
gameclass.mod_zjhGold.SOUND_QI_NUM = 4;
/**
 * 看牌音效数量
 * @type {number}
 */
gameclass.mod_zjhGold.SOUND_KAN_NUM = 2;
/**
 * 搓牌音效数量
 * @type {number}
 */
gameclass.mod_zjhGold.SOUND_CUO_NUM = 1;
/**
 * 比牌音效数量
 * @type {number}
 */
gameclass.mod_zjhGold.SOUND_BI_NUM = 1;
/**
 * 疯狂场闷牌轮次
 * @type {number}
 */
gameclass.mod_zjhGold.MEN_ROUND = 3;
/**
 * 疯狂场比牌轮次
 * @type {number}
 */
gameclass.mod_zjhGold.BI_RUOND = 3;
/**
 * 经典场闷牌轮次
 * @type {number}
 */
gameclass.mod_zjhGold.CLASSIC_MEN_RUOND = -1;
/**
 * 经典场比牌轮次
 * @type {number}
 */
gameclass.mod_zjhGold.CLASSIC_BI_RUOND = -1;
