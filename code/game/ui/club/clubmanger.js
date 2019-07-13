/**
 * Created by Administrator on 2017/7/18.
 */
gameclass.clubmanger = gameclass.baseui.extend({
    node: null,
    clubid: 0,
    ismanger: false,//是否为俱乐部群主
    iscomopen: true,//是否正常流程打开
    freemode: 0,
    member: null,
    //俱乐部名称
    _nameTxt: null,
    //俱乐部ID
    _idTxt: null,
    //左侧TAB按钮控制器
    _tabControl: null,
    //开设包房子面板
    _roomSetPanel: null,
    _roomSetControl: null,
    //房间列表子面板
    _roomListPanel: null,
    _roomListControl: null,
    //俱乐部战绩子面板
    _recordListPanel: null,
    _recordControl: null,
    //俱乐部管理子面板
    _managerPanel: null,
    //俱乐部信息
    _clubData: null,
    //当前设置的俱乐部房间索引
    _setClubRoomIndex: 0,
    //申请红点
    _applyRedIcon: null,
    //消息红点
    _messageRedIcon: null,
    //俱乐部管理红点
    _manageRedIcon: null,
    _isApplyRed: false,
    _isMsgRed: false,
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.julebu_clubmanger, true);
        this.addChild(this.node);

        var _this = this;
        this._nameTxt = ccui.helper.seekWidgetByName(this.node, "nameTxt");
        this._idTxt = ccui.helper.seekWidgetByName(this.node, "idTxt");
        this._roomSetPanel = ccui.helper.seekWidgetByName(this.node, "roomSetPanel");
        this._roomListPanel = ccui.helper.seekWidgetByName(this.node, "roomListPanel");
        this._recordListPanel = ccui.helper.seekWidgetByName(this.node, "recordListPanel");
        this._applyRedIcon = ccui.helper.seekWidgetByName(this.node, "applyRedIcon");
        this._messageRedIcon = ccui.helper.seekWidgetByName(this.node, "messageRedIcon");
        this._manageRedIcon = ccui.helper.seekWidgetByName(this.node, "manageRedIcon");

        this._roomSetControl = new gameclass.clubRoomSetCtr(this._roomSetPanel, this.game);
        this._roomListControl = new gameclass.clubSingleHall(this._roomListPanel.getChildByName("listContain"), this.game);
        this._recordControl = new gameclass.clubzhanji(this._recordListPanel.getChildByName("listContain"), this.game);

        this._managerPanel = ccui.helper.seekWidgetByName(this.node, "managerPanel");
        this._tabControl = new gameclass.buttonGroupControl(function (index) {
            _this.updatePanelShow(index);
        });
        this._tabControl.createStand(ccui.helper.seekWidgetByName(this.node, "tabListView"), 4);
        this._tabControl.setSelectIndex(1);


        this.updatePanelShow(1);

        this._isApplyRed = false;
        this._isMsgRed = false;

        this.setApplyRed(this._isApplyRed);
        this.setMsgRed(this._isMsgRed);

        // _this.setredtip(false);

        gameclass.createbtnpress(this.node, "closeBtn", function () {
            _this.leaveClubHandle();
        });

        gameclass.createbtnpress(this.node, "btn_clearmessage", function () {
            _this.game.modmgr.mod_center.mod_club.hallkfinfo = [];
            var temparr = [];
            // _this.game.uimgr.uis["gameclass.clubSingleHall"].addHallTableview(temparr);
        });
        gameclass.createbtnpress(this.node, "btn_member", function () {
            _this.game.uimgr.showui("gameclass.clubpersons");
            _this.game.uimgr.uis["gameclass.clubpersons"].showplayers(_this.member, _this.clubid, _this.ismanger);
        });
        //微信邀请
        gameclass.createbtnpress(this.node, "btn_invite", function () {
            // if (window.wx) {
            //     _this.game.uimgr.showui("gameclass.gameShare");
            _this.game.uimgr.showui("gameclass.clubcellPanel");
            _this.game.uimgr.uis["gameclass.clubcellPanel"]._clubData = _this._clubData;
            var obj = {
                "clubid": _this.clubid,
            }
            _this.game.uimgr.uis["gameclass.clubcellPanel"].setcurcell(9, obj);
            // }
        });
    },
    leaveClubHandle: function () {
        this.game.modmgr.mod_center.mod_club.sendLeaveclub(this._clubData.id);
        this.game.uimgr.closeui("gameclass.clubmanger");
    },
    updatePanelShow: function (index) {
        this._tabControl.setSelectIndex(index);
        this._roomSetPanel.setVisible(false);
        this._roomListPanel.setVisible(false);
        this._recordListPanel.setVisible(false);
        this._managerPanel.setVisible(false);
        if (index == 0) {
            this._roomSetPanel.setVisible(true);
        } else if (index == 1) {
            this._roomListPanel.setVisible(true);
        } else if (index == 2) {
            this._recordListPanel.setVisible(true);
            this.game.modmgr.mod_center.mod_club.sendclubfight(this._clubData.id);
        } else {
            this._managerPanel.setVisible(true);
        }
    },
    updateView: function (clubData) {
        this._clubData = clubData;
        this._nameTxt.setString(this._clubData.name);
        this._idTxt.setString(this._clubData.id);

        this._roomSetControl.updateView(this._clubData, this.ismanger);
        this._roomListControl.updateView(this._clubData);
    },
    setfreemode: function (mode) {
        this.freemode = mode;
    },
    setmenberinfos: function (msg, iscom) {
        //cc.log(msg);
        this.clubid = msg.id;
        this.ismanger = false;
        this.freemode = msg.mode; //消费房卡模式
        var myuid = this.game.modmgr.mod_login.logindata.uid;
        this.member = msg.member;
        var len = msg.member.length;
        for (var i = 0; i < len; i++) {
            if (myuid == msg.member[i].uid && msg.member[i].job == 0) {
                this.ismanger = true;//群主必须在第一个
            }
            if (i > 0 && this.ismanger) break;
        }
        this.setui(this.ismanger, iscom);
    },
    // setredtip: function (bool) {
    //     ccui.helper.seekWidgetByName(this.node, "redtips").setVisible(bool);
    // },
    setApplyRed: function (isApplyRed) {
        this._isApplyRed = isApplyRed;
        this._applyRedIcon.setVisible(isApplyRed);

        this.setManageRed();
    },
    setMsgRed: function (isMsgRed) {
        this._isMsgRed = isMsgRed;
        this._messageRedIcon.setVisible(this._isMsgRed);

        this.setManageRed();
    },
    setManageRed: function () {
        if (this._isApplyRed || this._isMsgRed) {
            this._manageRedIcon.setVisible(true);
        } else {
            this._manageRedIcon.setVisible(false);
        }
    },
    setui: function (flag, iscomm) {
        this.ismanger = flag;
        var _this = this;
        if (!this.ismanger) {
            //退出俱乐部
            gameclass.createbtnpress(this.node, "btn_qiutclub", function () {
                _this.game.modmgr.mod_center.mod_club.sendExitclub(_this.clubid, 0);
            });
        } else {
            // if (_this.game.modmgr.mod_center.mod_club.clubmanagerinfo.red == 1 && _this.game.modmgr.mod_center.mod_club.myapplyclubsid.length > 0)
            if (_this.game.modmgr.mod_center.mod_club.clubmanagerinfo.red == 1) {
                this.setApplyRed(true);
            }
            // _this.setredtip(true);

            ccui.helper.seekWidgetByName(this.node, "createsusstip").setVisible(!iscomm);
            ccui.helper.seekWidgetByName(this.node, "btn_qiutclub").setVisible(false);
            //解散俱乐部
            gameclass.createbtnpress(this.node, "btn_distroyclub", function () {
                _this.game.uimgr.showui("gameclass.msgboxui").setString("是否确定要解散俱乐部？", function () {
                    _this.game.modmgr.mod_center.mod_club.sendExitclub(_this.clubid, 0);
                });
            });
            //修改名称
            gameclass.createbtnpress(this.node, "btn_changename", function () {
                //cc.log("5555555555552225");
                _this.game.uimgr.showui("gameclass.clubcellPanel");
                var obj = {
                    "clubid": _this.clubid,
                }
                _this.game.uimgr.uis["gameclass.clubcellPanel"].setcurcell(0, obj);
            });
            //修改公告
            gameclass.createbtnpress(this.node, "btn_changeNotice", function () {
                //cc.log("5555555555552225");
                _this.game.uimgr.showui("gameclass.clubcellPanel");
                var obj = {
                    "clubid": _this.clubid,
                }
                _this.game.uimgr.uis["gameclass.clubcellPanel"].setcurcell(6, obj);
            });
            //修改头像
            gameclass.createbtnpress(this.node, "btn_changeIcon", function () {
                //cc.log("5555555555552225");
                _this.game.uimgr.showui("gameclass.clubcellPanel");
                _this.game.uimgr.uis["gameclass.clubcellPanel"]._clubData = _this._clubData;
                var obj = {
                    "clubid": _this.clubid,
                }
                _this.game.uimgr.uis["gameclass.clubcellPanel"].setcurcell(7, obj);
            });
            //房卡设置
            gameclass.createbtnpress(this.node, "btn_fkset", function () {
                _this.game.uimgr.showui("gameclass.clubcellPanel");
                var obj = {
                    "clubid": _this.clubid,
                    "data": _this.freemode
                }
                _this.game.uimgr.uis["gameclass.clubcellPanel"].setcurcell(2, obj);

            });
            //申请列表
            gameclass.createbtnpress(this.node, "btn_applylist", function () {
                _this.game.modmgr.mod_center.mod_club.sendapplylist(_this.clubid);
            });
            //消息通知
            gameclass.createbtnpress(this.node, "btn_message", function () {
                _this.game.uimgr.showui("gameclass.clubcellPanel");
                var obj = {
                    "clubid": _this.clubid,
                }
                _this.game.modmgr.mod_center.mod_club.sendeventlist(_this.clubid);
            });
            //数据统计
            gameclass.createbtnpress(this.node, "btn_statisstics", function () {
                _this.game.uimgr.showui("gameclass.clubcellPanel");
                _this.game.uimgr.uis["gameclass.clubcellPanel"]._clubData = _this._clubData;
                var obj = {
                    "clubid": _this.clubid,
                }
                cc.log("wait send club statistics to server........");
                _this.game.modmgr.mod_center.mod_club.sendStatistics(_this.clubid);
            });
        }
    },
    destroy: function () {
        // cc.log("clubmanager destroy...");

        this.game.modmgr.mod_center.mod_club.sendgetclubs();

        this._roomSetControl.destroy();
    },
});
/**
 * 开设包房-游戏列表设置
 * @param $gameType
 */
gameclass.clubmanger.prototype.setClubRoom = function (gametype, param1, param2, num, $roomIndex) {
    this._clubData.game[$roomIndex] = {"gametype": gametype, "param1": param1, "param2": param2, "num": num};

    this.game.modmgr.mod_center.mod_club.sendchangegametype(this._clubData.id, this._clubData.game);
    this._roomSetControl.updateView(this._clubData, this.ismanger);
};

//俱乐部本地缓存键值
gameclass.clubStorageKey = "clubStorageKey";

