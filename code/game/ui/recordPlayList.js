/**
 * Created by Administrator on 2017/3/11 0011.
 */



gameclass.recordPlayList = gameclass.baseui.extend({
    mod_record: null,
    recordRoomid: null,
    slectIndex: 0,
    index: 0,

    ctor: function () {
        this._super();
        this.tb_niuniu = [];
    },

    show: function () {
        var _this = this;
        this.node = this.game.uimgr.createnode(res.RecordReplayList, true ,1, null, function() {
            _this.mod_record = new gameclass.mod_record();
            _this.mod_record.setgame(_this.game);

            _this.mod_record.setCurUserid(_this.game.modmgr.mod_login.logindata.uid);

            _this.gameList = ccui.helper.seekWidgetByName(_this.node, "ListView_1");
            _this.layout_recordCode = ccui.helper.seekWidgetByName(_this.node, "layout_recordCode");
            _this.layout_recordCode.setVisible(false);
            _this.inputCode = ccui.helper.seekWidgetByName(_this.layout_recordCode, "input_recordCode");

            _this.tb_niuniu[0] = ccui.helper.seekWidgetByName(_this.node, "reCordBtnPanel_1");
            _this.tb_niuniu[1] = ccui.helper.seekWidgetByName(_this.node, "reCordBtnPanel_2");
            _this.tb_niuniu[2] = ccui.helper.seekWidgetByName(_this.node, "reCordBtnPanel_3");
            _this.tb_niuniu[3] = ccui.helper.seekWidgetByName(_this.node, "reCordBtnPanel_4");
            _this.tb_niuniu[4] = ccui.helper.seekWidgetByName(_this.node, "reCordBtnPanel_5");
            _this.tb_niuniu[5] = ccui.helper.seekWidgetByName(_this.node, "reCordBtnPanel_6");
            _this.tb_niuniu[6] = ccui.helper.seekWidgetByName(_this.node, "reCordBtnPanel_7");
            _this.tb_niuniu[7] = ccui.helper.seekWidgetByName(_this.node, "reCordBtnPanel_8");

            for (var i = 0; i < _this.tb_niuniu.length; i++) {
                _this.tb_niuniu[i].addTouchEventListener(_this.clickBtn.bind(_this));
            }
            //add by lish-2017-10-25
            //ccui.helper.seekWidgetByName(this.node, "btn_otherRecord").setVisible(false);
            //查看他人回放
            gameclass.createbtnpress(_this.node, "btn_otherRecord", function () {
                _this.layout_recordCode.setVisible(true);
            });

            gameclass.createbtnpress(_this.layout_recordCode, "btn_ok", function () {
                var inputContent = _this.inputCode.getString();
                var gameType = 0, roomid = 0, uid = 0;
                if (inputContent.length == 15) {//斗地主 -- 牛牛 回放码15位
                    gameType = inputContent.substring(0, 1);
                    roomid = inputContent.substring(1, 9);
                    uid = inputContent.substring(9, 15);
                    //cc.log(inputContent,gameType,roomid,uid);
                    if (gameType == gameclass.gameddz || gameType == gameclass.gamelzddz) {//斗地主回放码处理
                        _this.mod_record.setCurBureauid(Number(roomid));
                        _this.mod_record.setCurUserid(Number(uid));
                        _this.mod_record.setCurGameid(Number(gameType));
                        _this.game.uimgr.showui("gameclass.ddzrecord").setMod(_this.mod_record);
                        _this.game.uimgr.closeui("gameclass.hallui");
                    } else if (gameType == gameclass.gameniuniu) { //牛牛回放码处理
                        var data = {type: Number(gameType), uid: Number(uid)};
                        var nn_roomid = inputContent.substring(1, 7);
                        var s_data = null;
                        _this.mod_record.getRecordListStatic(gameclass.gameniuniu, data, function () {
                            cc.each(_this.mod_record.s_data, function (o, i) {
                                //cc.log(o, i);
                                if (i == nn_roomid) {
                                    s_data = o;
                                }
                            });
                            if (s_data) {
                                _this.game.uimgr.showui("gameclass.niuniurecord").showRecord_nn(s_data.ot, s_data.children, s_data.time);
                                _this.game.uimgr.closeui("gameclass.hallui");
                            }
                        });

                    } else if (gameType == gameclass.gameptj) { //牛牛回放码处理
                        var data = {type: Number(gameType), uid: Number(uid)};
                        var nn_roomid = inputContent.substring(1, 7);
                        var s_data = null;
                        _this.mod_record.getRecordListStatic(gameclass.gameptj, data, function () {
                            cc.each(_this.mod_record.s_data, function (o, i) {
                                //cc.log(o, i);
                                if (i == nn_roomid) {
                                    s_data = o;
                                }
                            });
                            if (s_data) {
                                _this.game.uimgr.showui("gameclass.ptjrecord").showRecord_nn(s_data.ot, s_data.children, s_data.time);
                                _this.game.uimgr.closeui("gameclass.hallui");
                            }
                        });

                    } else {
                        _this.showToast("数据错误!");
                    }
                } else if (inputContent.length == 16) {//十点半回放码16位
                    gameType = inputContent.substring(0, 2);
                    uid = inputContent.substring(10, 16);
                    if (gameType == gameclass.gamesdb) {//十点半回放码处理
                        var data = {type: Number(gameType), uid: Number(uid)};
                        var nn_roomid = inputContent.substring(2, 8);
                        var s_data = null;
                        _this.mod_record.getRecordListStatic(gameclass.gamesdb, data, function () {
                            cc.each(_this.mod_record.s_data, function (o, i) {
                                //cc.log(o, i);
                                if (i == nn_roomid) {
                                    s_data = o;
                                }
                            });
                            if (s_data) {
                                _this.game.uimgr.showui("gameclass.niuniurecord").showRecord_nn(s_data.ot, s_data.children, s_data.time);
                                _this.game.uimgr.closeui("gameclass.hallui");
                            }
                        });
                    } else {
                        _this.showToast("数据错误!");
                    }
                } else {
                    _this.showToast("输入有误，请重新输入!");
                }
            });

            gameclass.createbtnpress(_this.layout_recordCode, "btn_colse_0", function () {
                _this.layout_recordCode.setVisible(false);
            });

            gameclass.createbtnpress(_this.node, "btn_colse", function () {
                _this.game.uimgr.closeui("gameclass.recordPlayList");
            });

            _this.clickBtn(_this.tb_niuniu[7], ccui.Widget.TOUCH_ENDED);
        });
        this.addChild(this.node);
    },
    clickBtn: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if (sender.getChildByName("tb_normalBtn").isVisible()) return;
                var senderName = sender.getName().charAt(sender.getName().length - 1);
                //ListView
                this.gameList.removeAllItems();
                switch (Number(senderName)) {
                    case 1:
                        this.showNiuNiuRecord();
                        break;
                    case 2:
                        this.showZjHRecord();
                        break;
                    case 3:
                        this.showDDZRecord();
                        break;
                    case 4:
                        this.showSDBRecord();
                        break;
                    case 5:
                        this.showTTZRecord();
                        break;
                    case 6:
                        this.showPTJRecord();
                        break;
                    case 7:
                        this.showSLRecord();
                        break;
                    case 8:
                        this.showKwxRecord();
                }
                var childArr = sender.getParent().getChildren();
                for (var i = 0; i < childArr.length; i++) {
                    childArr[i].getChildByName("tb_normalBtn").setVisible(false);
                }
                sender.getChildByName("tb_normalBtn").setVisible(true);
                break;
        }
    },
    showDDZRecord: function () {
        this.slectIndex = 2;
        var data = {uid: this.game.modmgr.mod_login.logindata.uid};
        this.showRecordList(data, gameclass.gameddz);
    },
    showSDBRecord: function () {
        this.slectIndex = 3;
        var data = {type: gameclass.gamesdb, uid: this.game.modmgr.mod_login.logindata.uid};
        this.showRecordList(data, gameclass.gamesdb);
    },
    showZjHRecord: function () {
        this.slectIndex = 1;
        var data = {type: gameclass.gameszp, uid: this.game.modmgr.mod_login.logindata.uid};
        this.showRecordList(data, gameclass.gameszp);
    },
    showNiuNiuRecord: function () {
        this.slectIndex = 0;
        var data = {type: gameclass.gameniuniu, uid: this.game.modmgr.mod_login.logindata.uid};
        this.showRecordList(data, gameclass.gameniuniu);
    },
    showTTZRecord: function () {
        this.slectIndex = 4;
        var data = {type: gameclass.gamettz, uid: this.game.modmgr.mod_login.logindata.uid};
        this.showRecordList(data, gameclass.gamettz);
    },
    showPTJRecord: function () {
        this.slectIndex = 5;
        var data = {type: gameclass.gameptj, uid: this.game.modmgr.mod_login.logindata.uid};
        this.showRecordList(data, gameclass.gameptj);
    },
    showSLRecord: function () {
        this.slectIndex = 6;
        var data = {type: gameclass.gamenxs, uid: this.game.modmgr.mod_login.logindata.uid};
        this.showRecordList(data, gameclass.gamenxs);
    },
    showKwxRecord: function () {
        this.slectIndex = 7;
        var data = {type: gameclass.gamekwx, uid: this.game.modmgr.mod_login.logindata.uid};
        this.showRecordList(data, gameclass.gamekwx);
    },

    showToast: function (_text) {
        if (this.node.getChildByTag(123456)) {
            return;
        }
        var _this = this;
        _this.node.removeChildByTag(123456);
        var node = new cc.Sprite(res.img_input);
        node.setPosition(this.node.getContentSize().width / 2, 100);
        node.setOpacity(160);
        node.setTag(123456);
        var text = new cc.LabelTTF(_text, "Arial", 25);
        text.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
        node.addChild(text);
        _this.node.addChild(node);
        _this.scheduleOnce(function () {
            _this.node.removeChildByTag(123456);
        }, 3);

    },
    //游戏类型请求数据
    showRecordList: function (data, type) {
        var _this = this;
        _this.mod_record.getRecordList(type, data, function (mydata) {
            _this.showData(type);
        });

    },
    getDate: function (date) {
        var d = new Date(date * 1000);    //根据时间戳生成的时间对象
        var date = (d.getFullYear()) + "-" +
            (d.getMonth() + 1) + "-" +
            (d.getDate()) + " " +
            (d.getHours()) + ":" +
            (d.getMinutes());
        //(d.getSeconds());
        return date;
    },

    showData: function (tp) {
        var _this = this;
        cc.log("getRecordData:" + this.mod_record.s_data);
        var gameStr = ["牛牛", "炸金花", "斗地主", "十点半", "推筒子", "拼天九", "扫雷", "卡五星"];
        var data = this.changeStyle(this.mod_record.s_data);

        for (var i = 0; i < data.length; i++) {
            var infoObj = data[i];
            var listCell = this.game.uimgr.createnode(res.recordListCell, true).getChildByName("Panel_1");
            listCell.removeFromParent(false);
            this.gameList.pushBackCustomItem(listCell);
            ccui.helper.seekWidgetByName(listCell, "roomid_text").setString("房间号:" + data[i].roomid);
            if (infoObj.maxstep) {
                var jushu = String(infoObj.children.length) + "/" + infoObj.maxstep;
                ccui.helper.seekWidgetByName(listCell, "jushuText").setString("局数:" + jushu);
            } else {
                ccui.helper.seekWidgetByName(listCell, "jushuText").setVisible(false);
            }
            ccui.helper.seekWidgetByName(listCell, "time_text").setString("时间:" + this.getDate(infoObj.children[0].time));
            ccui.helper.seekWidgetByName(listCell, "wanfa").setString(gameStr[this.slectIndex]);

            //显示玩家信息
            var infos = {};
            if (tp == gameclass.gameddz || tp == gameclass.gamelzddz || tp == gameclass.gameszp || tp == gameclass.gamekwx)
                infos = infoObj.children[0].person;
            else
                infos = infoObj.children[0].info;
            var len = infos.length;

            for (var j = 0; j < 5; j++) {
                var playerNode = ccui.helper.seekWidgetByName(listCell, "player" + j);
                playerNode.setVisible(j < len);
                if (j > len - 1) continue;
                var head = playerNode.getChildByName("icon");
                if (infos[j].head) gameclass.mod_base.showtximg(head, infos[j].head, 0, 0, "im_headbg2");
                playerNode.getChildByName("playerName").setString(infos[j].name);

                //var total = 0;
                //if (tp == gameclass.gameddz || tp == gameclass.gamelzddz || tp == gameclass.gameszp) {
                //    if (infos[j].score) total = infos[j].score;
                //} else {
                //    if (infos[j].total) total = infos[j].total;
                //}
                var _total = infos[j].total;
                //if(!_total) _total = infos[j].score;
                playerNode.getChildByName("score").setString(_total);
            }

            var btn_check = ccui.helper.seekWidgetByName(listCell, "Btn_chakan");
            btn_check.roomid = data[i].roomid;
            btn_check.addTouchEventListener(_this.touchEvent, _this);
        }
    },

    changeStyle: function (obj) {
        var tmp = [];
        for (var i in obj) {
            obj[i].roomid = Number(i);
            tmp.push(obj[i]);
        }
        tmp.sort(function (a, b) {
            return a.time < b.time;
        })
        return tmp;
    },

    touchEvent: function (sender, type) {
        var _this = this;
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                //cc.log("Touch Up"+sender.roomid);
                _this.mod_record.setCurRoomid(sender.roomid);
                _this.game.uimgr.showui("gameclass.recordBureau").setMod(_this.mod_record);
                _this.game.uimgr.closeui("gameclass.recordPlayList");
                break;
            default:
                break;
        }
    },
});