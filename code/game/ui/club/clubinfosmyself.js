/**
 * Created by Administrator on 2017/7/18.
 */
gameclass.clubinfosmyself = gameclass.baseui.extend({
    node: null,
    //tab按钮组件控制器
    titleBtnGroupCtr: null,
    //俱乐部排名
    _tabview_panel: null,
    //创建俱乐部
    _create_panel: null,
    _createControl:null,
    //加入俱乐部
    _join_panel: null,
    _joinNumCtr: null,
    ctor: function () {
        this._super();
    },

    show: function () {
        this.node = this.game.uimgr.createnode(res.julebu_infolist, true, 1);
        this.addChild(this.node);
        this._tabview_panel = ccui.helper.seekWidgetByName(this.node, "tabview_panel");
        this._create_panel = ccui.helper.seekWidgetByName(this.node, "create_panel");
        this._join_panel = ccui.helper.seekWidgetByName(this.node, "join_panel");
        this._createControl = new gameclass.clubcreate();
        this._createControl.control(this._create_panel, this.game);
        var _this = this;
        gameclass.createbtnpress(this.node, "closeBtn", function () {
            _this.game.uimgr.showui("gameclass.hallui")
            _this.game.uimgr.closeui("gameclass.clubinfosmyself");
        });

        this._joinNumCtr = new gameclass.numSetSimpleCtr(ccui.helper.seekWidgetByName(this.node, "join_panel"), true, 6);
        this._joinNumCtr._fillFullCallback = function (number) {
            _this.game.modmgr.mod_center.mod_club.sendclubapply(number);
        };

        var rankBtn = ccui.helper.seekWidgetByName(this.node, "rankBtn");
        var createBtn = ccui.helper.seekWidgetByName(this.node, "createBtn");
        var joinBtn = ccui.helper.seekWidgetByName(this.node, "joinBtn");
        this.titleBtnGroupCtr = new gameclass.buttonGroupControl(function (index) {
            _this.updateTabShow(index);
        });
        var btnControlArr = this.titleBtnGroupCtr.switchBtnControl([rankBtn, createBtn, joinBtn], ["normal"], ["select"]);
        this.titleBtnGroupCtr.initData(btnControlArr);

        this.switchTabIndex(0);
    },
    switchTabIndex:function (index) {
        this.titleBtnGroupCtr.setSelectIndex(index);

        this.updateTabShow(index);
    },
    updateTabShow: function (index) {
        this._tabview_panel.setVisible(false);
        this._create_panel.setVisible(false);
        this._join_panel.setVisible(false);
        if (index == 0) {
            this._tabview_panel.setVisible(true);
        } else if (index == 1) {
            this._create_panel.setVisible(true);
        } else {
            this._join_panel.setVisible(true);
        }
    },
    clubJoinTableview: function () {
        this.updateAllClubOperate();
        this.addTableview(this.game.modmgr.mod_center.mod_club.allclubs);
    },
    //根据申请列表(this.myapplyclubsid)更新全部俱乐部信息，排序
    updateAllClubOperate:function () {
        var mineArr = [], otherArr = [];
        for (var i = 0; i < this.game.modmgr.mod_center.mod_club.allclubs.length; i++) {
            this.game.modmgr.mod_center.mod_club.allclubs[i].isOperate = 2;//自己的0，已申请的1，未申请的2
            var isFind = false;
            for (var k = 0; k < this.game.modmgr.mod_center.mod_club.myselfclubsid.length; k++) {
                if (this.game.modmgr.mod_center.mod_club.allclubs[i].clubid == this.game.modmgr.mod_center.mod_club.myselfclubsid[k]) {
                    this.game.modmgr.mod_center.mod_club.allclubs[i].isOperate = 0;
                    mineArr.push(this.game.modmgr.mod_center.mod_club.allclubs[i]);
                    isFind = true;
                    break;
                }
            }
            if(!isFind){
                otherArr.push(this.game.modmgr.mod_center.mod_club.allclubs[i]);
            }
            for (var k = 0; k < this.game.modmgr.mod_center.mod_club.myapplyclubsid.length; k++) {
                if (this.game.modmgr.mod_center.mod_club.allclubs[i].clubid == this.game.modmgr.mod_center.mod_club.myapplyclubsid[k]) {
                    this.game.modmgr.mod_center.mod_club.allclubs[i].isOperate = 1;
                    break;
                }
            }
        }

        mineArr.sort(this.clubSortPersonCount);
        otherArr.sort(this.clubSortPersonCount);
        // cc.log("allClubLength==="+this.game.modmgr.mod_center.mod_club.allclubs.length);
        this.game.modmgr.mod_center.mod_club.allclubs = mineArr.concat(otherArr);
        // cc.log("allClubLength======"+this.game.modmgr.mod_center.mod_club.allclubs.length);
    },
    clubSortPersonCount:function (obA, obB) {
        return obB.personcount - obA.personcount;
    },
    addTableview: function (cluballinfos) {
        if (cluballinfos) {
            var len = cluballinfos.length;
            if (len > 0) {
                this._tabview_panel.removeAllChildren();
                var tabview = new clubTableview(this.game, cluballinfos, 0);
                this._tabview_panel.addChild(tabview);
            }
        }
    },
    updateSingleInfo: function (info, index) {
        if (this._tabview_panel.getChildrenCount() == 0) return;
        var tabview = this._tabview_panel.getChildren()[0];
        tabview.listinfos[index] = info;
        tabview.updateCellAtIndex(index);
    },
    destroy: function () {
        this._createControl.destroy();
        this._joinNumCtr.destroy();

        cc.log("clubinfosmyself destroy...");
    },
});

