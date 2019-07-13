/**
 * Created by Administrator on 2017/7/18.
 */
gameclass.clubcellPanel = gameclass.baseui.extend({
    node: null,
    clubid: 0,
    panels: [],
    chooseStates: [],
    _clubData: null,
    _headBtnControl: null,
    _closeBtnDefaulX:0,
    ctor: function () {
        this._super();
    },

    show: function () {
        this.node = this.game.uimgr.createnode(res.julebu_clubcells, true, 1);
        this.addChild(this.node);
        var _this = this;
        gameclass.createbtnpress(this.node, "closeBtn", function () {
            _this.game.uimgr.closeui("gameclass.clubcellPanel");
        });
        var closeBtn = ccui.helper.seekWidgetByName(this.node, "closeBtn");
        this._closeBtnDefaulX = closeBtn.getPositionX();
        this.panels[0] = ccui.helper.seekWidgetByName(this.node, "setclubname");
        this.panels[1] = ccui.helper.seekWidgetByName(this.node, "setclubgame");
        this.panels[2] = ccui.helper.seekWidgetByName(this.node, "setfangka");
        this.panels[3] = ccui.helper.seekWidgetByName(this.node, "applylist");
        this.panels[4] = ccui.helper.seekWidgetByName(this.node, "setmessage");
        this.panels[5] = ccui.helper.seekWidgetByName(this.node, "tips");
        this.panels[6] = ccui.helper.seekWidgetByName(this.node, "setclubNotice");
        this.panels[7] = ccui.helper.seekWidgetByName(this.node, "setclubIcon");
        this.panels[8] = ccui.helper.seekWidgetByName(this.node, "statistics");
        this.panels[9] = ccui.helper.seekWidgetByName(this.node, "weiXinInvite");
        for (var i = 0; i < 10; i++) {
            this.panels[i].setVisible(false);
        }
    },
    setcurcell: function (idx, datas) {
        this.clubid = datas.clubid;
        var _this = this;
        _this.panels[idx].setVisible(true);

        cc.log("club manager:idx=" + idx);

        if (idx == 0) {   //修改名称
            gameclass.createbtnpress(_this.node, "surename", function () {
                var clubname = ccui.helper.seekWidgetByName(_this.node, "inputclubname").getString();
                if (clubname == "") {
                    _this.game.uimgr.showui("gameclass.msgboxui");
                    _this.game.uimgr.uis["gameclass.msgboxui"].setString("请输入俱乐部名称!");
                    return;
                }
                _this.game.modmgr.mod_center.mod_club.sendchangecname(_this.clubid, clubname);
            });
        } else if (idx == 1) { //修改游戏
            //已废除
        } else if (idx == 2) { //修改房卡模式
            _this.checkfkmode(datas.data);
        } else if (idx == 3) {//请求列表(申请列表)
            _this.getapplylist(datas.data);
        } else if (idx == 4) { //消息列表
            _this.showclubquikmsg(datas.data);
        } else if (idx == 5) {

        } else if (idx == 6) { //修改公告
            _this.modifyNotice(datas.data);
        } else if (idx == 7) { //修改头像
            _this.modifyClubIcon();
        } else if (idx == 8) { //数据统计
            _this.statistics(datas);
        } else if (idx == 9) { //微信邀请
            _this.wxInvite();
        }
        var closeBtn = ccui.helper.seekWidgetByName(this.node, "closeBtn");
        if(idx == 3 || idx == 4 || idx == 8 || idx == 9){
            closeBtn.setPositionX(this._closeBtnDefaulX + 20);
        }else{
            closeBtn.setPositionX(this._closeBtnDefaulX);
        }
    },
    wxInvite: function () {
        var _this = this;
        gameclass.createbtnpress(this.node, "inviteFriendBtn", function () {
            gameclass.mod_platform.invitefriend("", "http://120.24.215.214/down/", "傲世娱乐，最好玩的棋牌游戏平台，快一起来玩吧！");
        });
        gameclass.createbtnpress(this.node, "inviteCircleBtn", function () {
            gameclass.mod_platform.invitefriendSpoons("", "http://120.24.215.214/down/", "傲世娱乐，最好玩的棋牌游戏平台，快一起来玩吧！");
        });
    },
    statistics: function (infos) {
        var _node = ccui.helper.seekWidgetByName(this.node, "statisticsContain");
        _node.removeAllChildren();
        var tabview = new clubTableview(this.game, infos, 8);
        _node.addChild(tabview);
    },
    modifyNotice: function () {
        var _this = this;
        gameclass.createbtnpress(_this.node, "sureNotice", function () {
            var notice = ccui.helper.seekWidgetByName(_this.node, "noticeTxt").getString();
            if (notice == "") {
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("请输入公告信息!");
                return;
            }
            // cc.log("wait to send modify clubNotice to server........");
            _this.game.uimgr.closeui("gameclass.clubcellPanel");
            _this.game.modmgr.mod_center.mod_club.sendchangecNotice(_this.clubid, notice);
        });
    },
    modifyClubIcon: function () {
        var _this = this;
        this._headBtnControl = new gameclass.buttonGroupControl();
        this._headBtnControl.createStand(ccui.helper.seekWidgetByName(_this.node, "headBtnContain"), 4);
        this._headBtnControl.setSelectIndex(parseInt(_this._clubData.icon));
        gameclass.createbtnpress(_this.node, "sureClubIcon", function () {
            _this.game.uimgr.closeui("gameclass.clubcellPanel");
            _this.game.modmgr.mod_center.mod_club.sendchangecHead(_this.clubid, _this._headBtnControl._selectIndex);
            // cc.log("wait to send modify clubIcon to server..........");
        });
    },
    matchgametype: function () {
        var gameTypes = [];
        var choosegametype = this.game.modmgr.mod_center.mod_club.choosegametype;

        for (var i = 0; i < this.chooseStates.length; i++) {
            if (this.chooseStates[i] == 1) {
                for (var k = 0; k < choosegametype[i].length; k++) {
                    //cc.log(choosegametype[i]);
                    gameTypes.push(choosegametype[i][k]);
                }
            }
        }
        return gameTypes;
    },
    //select 0表示选择上  1表示选择下
    checkfkmode: function (select) {
        var fkmode = select;
        var Text_1 = ccui.helper.seekWidgetByName(this.node, "Text_1");
        var Text_2 = ccui.helper.seekWidgetByName(this.node, "Text_2");
        var CheckBox_1 = ccui.helper.seekWidgetByName(this.node, "CheckBox_1");
        var CheckBox_2 = ccui.helper.seekWidgetByName(this.node, "CheckBox_2");
        var choose = function (selector, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                //selector.setBright(false);
                if (selector.flag == 1) {
                    fkmode = 0;
                    CheckBox_2.setTouchEnabled(true);
                    CheckBox_2.setSelected(false);
                    Text_1.setColor(cc.color(255, 102, 204, 255));
                    Text_2.setColor(cc.color(255, 255, 255, 255));
                } else if (selector.flag == 2) {
                    fkmode = 1;
                    CheckBox_1.setTouchEnabled(true);
                    CheckBox_1.setSelected(false);
                    Text_1.setColor(cc.color(255, 255, 255, 255));
                    Text_2.setColor(cc.color(255, 102, 204, 255));
                }
                selector.setTouchEnabled(false);
            }
        };
        var bool = false;
        if (select == 1) {
            bool = true;
            Text_1.setColor(cc.color(255, 255, 255, 255));
            Text_2.setColor(cc.color(255, 102, 204, 255));
        } else {
            Text_1.setColor(cc.color(255, 102, 204, 255));
            Text_2.setColor(cc.color(255, 255, 255, 255));
        }
        CheckBox_1.setSelected(!bool);
        CheckBox_1.setTouchEnabled(bool);
        CheckBox_1.flag = 1;
        CheckBox_1.addTouchEventListener(choose);
        CheckBox_2.setSelected(bool);
        CheckBox_2.setTouchEnabled(!bool);
        CheckBox_2.flag = 2;
        CheckBox_2.addTouchEventListener(choose);
        var _this = this;
        gameclass.createbtnpress(this.node, "sureusefk", function () {
            //cc.log(fkmode);
            _this.game.modmgr.mod_center.mod_club.sendchangefree(_this.clubid, fkmode);
        });
    },
    addKaifangTableview: function (gamestate) {

    },
    getapplylist: function (applys) {
        if (applys.length == 0) this.game.uimgr.uis["gameclass.clubmanger"].setApplyRed(false);
        var _node = ccui.helper.seekWidgetByName(this.node, "applyListContain");
        _node.removeAllChildren();
        var tabview = new clubTableview(this.game, applys, 3);
        _node.addChild(tabview);
    },
    //消息
    showclubquikmsg: function (infos) {
        for (var i = 0; i < infos.length; i++) {
            infos[i].time = staticFunction.getStandardTime(infos[i].time);
            // infos[i].time = this.game.uimgr.uis["gameclass.clubSingleHall"].getDate(infos[i].time);
        }
        var _node = ccui.helper.seekWidgetByName(this.node, "dynamicContain");
        _node.removeAllChildren();
        var tabview = new clubTableview(this.game, infos, 7);
        _node.addChild(tabview);
    },
});
