var clubTableview = cc.Layer.extend({
    _tableView: null,
    game: null,
    listinfos: [],
    cellLen: 10,
    uitype: 0,//0自己所在俱乐部  1加入俱乐部列表  2大厅信息  3俱乐部成员 4群主开房列表
    ctor: function (_game, _infos, uitype) {
        this._super();
        this.game = _game;
        this.listinfos = _infos;
        this.cellLen = _infos.length;
        this.uitype = uitype;
        this.init();
    },

    init: function () {
        var winSize;
        var posx = 0;
        var posy = 0;
        if (this.uitype == 0) {
            winSize = cc.size(1136, 525);
            posx = 0;
            posy = 20;
        }
        else if (this.uitype == 1) {
            winSize = cc.size(1054, 350);
            posx = 47;
            posy = 50;
        }
        else if (this.uitype == 2) {//2大厅信息
            winSize = cc.size(1054, 525);
            posx = 0;
            posy = 20;
        } else if (this.uitype == 3 || this.uitype == 7 || this.uitype == 8) {//申请列表、消息列表
            winSize = cc.size(1054, 340);
            posx = 0;
            posy = 0;
        }
        else if (this.uitype == 4) {
            winSize = cc.size(682, 300);
            posx = 16;
            posy = 40;
        }
        else if (this.uitype == 5) {
            winSize = cc.size(1054, 450);
            posx = 47;
            posy = 50;
        }
        else if (this.uitype == 6) {
            winSize = cc.size(1054, 525);
            posx = -10;
            posy = 20;
        }
        this._tableView = new cc.TableView(this, winSize);
        this._tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this._tableView.x = posx;
        this._tableView.y = posy;
        this._tableView.setDelegate(this);
        if (this.uitype == 2) {
            this._tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_BOTTOMUP);
        } else {
            this._tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        }
        this.addChild(this._tableView);
        //this._tableView.reloadData();

        return true;
    },
    tableCellSizeForIndex: function (table, idx) {
        if (this.uitype == 2 || this.uitype == 6) {
            return cc.size(150, 175);
        } else if (this.uitype == 3 || this.uitype == 7) {
            return cc.size(150, 120);
        } else if (this.uitype == 8) {
            return cc.size(150, 50);
        }
        return cc.size(150, 150);
    },

    tableCellAtIndex: function (table, idx) {
        //var strValue = idx.toFixed(0);
        var cell;
        if (this.uitype == 0 || this.uitype == 1) {
            //0自己所在俱乐部  1申请加入俱乐部列表
            cell = this.setmyselfclub(table, idx);
        } else if (this.uitype == 2) {
            //2大厅信息
            cell = this.setclubhallinfo(table, idx);
        } else if (this.uitype == 3) {
            //3申请列表
            cell = this.applylistfun(table, idx);
        }
        else if (this.uitype == 4) {
            //4开房
            // cell = this.setclubkf(table, idx);
            //已废除
        }
        else if (this.uitype == 5) {
            //5俱乐部成员头像
            cell = this.setclubplayershead(table, idx);
            //已废除
        }
        else if (this.uitype == 6) {
            //6俱乐部战绩
            cell = this.setclubzhanji(table, idx);
        }
        else if (this.uitype == 7) {
            //6俱乐部成员进出消息
            cell = this.setclubpermsg(table, idx);
        } else if (this.uitype == 8) {
            cell = this.setStatistics(table, idx);
        }
        return cell;
    },

    tableCellTouched: function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
        // if (this.uitype == 0) {
        //     var index = parseInt(cell.getIdx());
        //
        //     var tempArr = this.game.modmgr.mod_center.mod_club.myselfclubsid;
        //
        //     this.game.modmgr.mod_center.mod_club.sendEnterclub(tempArr[index]);
        // }
    },
    insertCellAtIndex: function (idx) {
    },
    updateCellAtIndex: function (idx) {
        this._tableView.updateCellAtIndex(idx);
    },
    numberOfCellsInTableView: function (table) {
        return this.cellLen;
    },
    /**
     * 设置俱乐部列表
     * @param item
     * @param idx
     */
    setRankItem: function (item, idx) {
        var icon = ccui.helper.seekWidgetByName(item, "img");
        var iconIndex = this.listinfos[idx].icon == "" ? 0 : parseInt(this.listinfos[idx].icon);
        icon.setTexture(res["clubIcon" + iconIndex])

        var _this = this;
        ccui.helper.seekWidgetByName(item, "nameTxt").setString(this.listinfos[idx].clubname);
        ccui.helper.seekWidgetByName(item, "idTxt").setString(this.listinfos[idx].clubid);
        ccui.helper.seekWidgetByName(item, "numTxt").setString(this.listinfos[idx].personcount);
        ccui.helper.seekWidgetByName(item, "noteTxt").setString(this.listinfos[idx].notice);
        // cc.log("this.listinfos[idx].clubname=" + this.listinfos[idx].clubname + ",this.listinfos[idx].notice=" + this.listinfos[idx].notice)
        var operateBtn = ccui.helper.seekWidgetByName(item, "operateBtn");
        operateBtn.clubData = this.listinfos[idx];
        for (var i = 0; i < operateBtn.getChildrenCount(); i++) {
            var stateIcon = operateBtn.getChildren()[i];
            var stateIconName = stateIcon.getName();
            if (this.listinfos[idx].isOperate == stateIconName.slice(stateIconName.length - 1, stateIconName.length)) {
                stateIcon.setVisible(true)
            } else {
                stateIcon.setVisible(false);
            }
        }
        operateBtn.addTouchEventListener(function (sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED) return;
            if (sender.clubData.isOperate == 0) {
                _this.game.modmgr.mod_center.mod_club.sendEnterclub(sender.clubData.clubid);
                // _this.game.uimgr.showui("gameclass.clubmanger");
                // this.game.uimgr.uis["gameclass.clubmanger"].setui(true, false);
                // _this.game.uimgr.uis["gameclass.clubmanger"].updateView(sender.clubData);
                // _this.game.uimgr.uis["gameclass.clubmanger"].updatePanelShow(1);
            } else if (sender.clubData.isOperate == 1) {
                //撤销申请
                _this.game.modmgr.mod_center.mod_club.sendcancelapply(sender.clubData.clubid);
            } else {
                //申请加入
                _this.game.modmgr.mod_center.mod_club.sendclubapply(sender.clubData.clubid);
            }
        }, this);
    },
    //0自己所在俱乐部 1
    setmyselfclub: function (table, idx) {
        var cell = table.dequeueCell();
        var clubid = this.listinfos[idx].clubid;
        var label;
        if (!cell) {
            cell = new cc.TableViewCell();
            var item = this.game.uimgr.createnode(res.julebu_rankItem, true);
            cell.addChild(item, 0, 100);
            this.setRankItem(item, idx);
        } else {
            var item = cell.getChildByTag(100);
            this.setRankItem(item, idx);
        }
        return cell;
    },
    /**
     * 设置房间列表
     * @param item
     * @param idx
     */
    setRoomItem: function (item, idx) {
        var icon = ccui.helper.seekWidgetByName(item, "gameImg");
        var mainType = gameclass.getGameMainType(this.listinfos[idx].gameType);
        icon.setTexture(res["jublebu_" + mainType])

        ccui.helper.seekWidgetByName(item, "titleTxt").setString(this.listinfos[idx].name + " " + "房间号:" + this.listinfos[idx].roomid + " " + this.listinfos[idx].time);
        ccui.helper.seekWidgetByName(item, "detailTxt").setString(this.listinfos[idx].wanfa);

        var notStartBtn = ccui.helper.seekWidgetByName(item, "notStartBtn");
        var playingBtn = ccui.helper.seekWidgetByName(item, "playingBtn");
        if (this.listinfos[idx].state == 0) {
            //未开始，可加入
            notStartBtn.setVisible(true);
            playingBtn.setVisible(false);
        } else {
            //已开始，不可加入
            notStartBtn.setVisible(false);
            playingBtn.setVisible(true);
        }
        playingBtn.setTouchEnabled(false);

        var notStartBtn = ccui.helper.seekWidgetByName(item, "notStartBtn");
        notStartBtn.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                this.game.modmgr.mod_login.joinwithroomid(this.listinfos[idx].roomid);

                if (this.game.uimgr.uis["gameclass.clubmanger"]) {
                    this.game.uimgr.uis["gameclass.clubmanger"].leaveClubHandle();
                }
            }
        }, this);
    },
    //2俱乐部大厅
    setclubhallinfo: function (table, idx) {
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new cc.TableViewCell();
            var item = this.game.uimgr.createnode(res.julebu_roomListItem, true);
            cell.addChild(item, 0, 100);
            this.setRoomItem(item, idx);
        } else {
            var item = cell.getChildByTag(100);
            this.setRoomItem(item, idx);
        }
        return cell;
    },
    setApplyListItem: function (item, idx) {
        ccui.helper.seekWidgetByName(item, "nameTxt").setString(this.listinfos[idx].name);
        ccui.helper.seekWidgetByName(item, "idTxt").setString(this.listinfos[idx].uid);
        ccui.helper.seekWidgetByName(item, "timeTxt").setString(this.listinfos[idx].time);
        ccui.helper.seekWidgetByName(item, "infoTxt").setString(this.listinfos[idx].name + "申请加入俱乐部");
        gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(item, "headImg"), this.listinfos[idx].head, 0, 0, "im_headbg2");

        var okBtn = ccui.helper.seekWidgetByName(item, "okBtn");
        var cancelBtn = ccui.helper.seekWidgetByName(item, "cancelBtn");

        okBtn.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                var data = {"cid": this.listinfos[idx].clubid, "uid": this.listinfos[idx].uid, "bool": true};
                this.game.modmgr.mod_center.mod_club.sendAgreeaplye(data);
            }
        }, this);
        cancelBtn.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                var data = {"cid": this.listinfos[idx].clubid, "uid": this.listinfos[idx].uid, "bool": false};
                this.game.modmgr.mod_center.mod_club.sendAgreeaplye(data);
            }
        }, this);
    },
    //3申请
    applylistfun: function (table, idx) {
        //"clubid":this.clubid, "head":applys[i].head, "name":applys[i].name, "uid":applys[i].uid,  "time":applys[i].time
        var cell = table.dequeueCell();
        var clubid = this.listinfos[idx].clubid;
        var label;
        if (!cell) {
            cell = new cc.TableViewCell();

            var item = this.game.uimgr.createnode(res.julebu_applyListItem, true);
            cell.addChild(item, 0, 100);
            this.setApplyListItem(item, idx);
        } else {
            var item = cell.getChildByTag(100);
            this.setApplyListItem(item, idx);
        }
        return cell;
    },
    //4俱乐部群开房
    setclubkf: function (table, idx) {
        var cell = table.dequeueCell();
        var clubid = this.listinfos[idx].clubid;
        var label;
        var png = "";
        if (!cell) {
            cell = new cc.TableViewCell();
            var sprite = new cc.Sprite(res.julebu_kfcellbg);
            sprite.anchorX = 0;
            sprite.anchorY = 0;
            sprite.x = 0;
            sprite.y = 0;
            cell.addChild(sprite);

            png = "jublebu_" + this.listinfos[idx].iconpng;
            label = new cc.Sprite(res[png]);
            label.x = 60;
            label.y = 70;
            label.setTag(100);
            cell.addChild(label);

            label = new ccui.Text(this.listinfos[idx].gamename, "res/Font/FZY4JW_0569.TTF", 28, cc.size(20, 30));
            label.anchorX = 0;
            label.setPosition(cc.p(125, 100));
            label.setTag(101);
            cell.addChild(label);

            label = new ccui.Text("（扣群主房卡）", "res/Font/FZY4JW_0569.TTF", 24, cc.size(20, 26));
            label.anchorX = 0;
            label.setPosition(cc.p(210, 100));
            cell.addChild(label);

            label = new ccui.Text(this.listinfos[idx].lastwanfa, "res/Font/FZY4JW_0569.TTF", 18, cc.size(100, 66));
            label.anchorX = 0;
            label.anchorY = 1;
            label.setPosition(cc.p(125, 80));
            label.setTag(102);
            cell.addChild(label);

            label = new ccui.Button();
            label.idx = idx;
            label.loadTextures(res.jublebu_setkfbtn, "", "");
            label.setPosition(cc.p(600, 100));
            label.setTag(103);
            cell.addChild(label);
            label.setTouchEnabled(true);
            label.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    sender.setTouchEnabled(false);
                    this.game.uimgr.closeui("gameclass.clubcellPanel");
                    if (this.listinfos[sender.idx].createui == 9) {
                        this.game.uimgr.showui("gameclass.createKwxRoomUi", null, null, null, "gameclass.createroomui");
                        this.game.uimgr.uis["gameclass.createroomui"].setclubid(clubid);
                    } else {
                        this.game.uimgr.showui("gameclass.createroomui");
                        // this.game.uimgr.uis["gameclass.createroomui"].setGameType(this.listinfos[sender.idx].createui, clubid);
                    }
                }
            }, this);
            label = new ccui.Button();
            label.idx = idx;
            label.loadTextures(res.julebu_kfbtn, "", "");
            label.setPosition(cc.p(600, 40));
            label.setTag(104);
            cell.addChild(label);
            label.setTouchEnabled(true);
            label.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    sender.setTouchEnabled(false);
                    //cc.log(sender.idx,this.listinfos)
                    this.game.uimgr.closeui("gameclass.clubcellPanel");
                    if (this.listinfos[sender.idx].kfmsg == 0) {
                        if (this.listinfos[sender.idx].createui == 9) {
                            this.game.uimgr.showui("gameclass.createKwxRoomUi", null, null, null, "gameclass.createroomui");
                            this.game.uimgr.uis["gameclass.createroomui"].setclubid(clubid);
                        } else {
                            this.game.uimgr.showui("gameclass.createroomui");
                            this.game.uimgr.uis["gameclass.createroomui"].setGameType(this.listinfos[sender.idx].createui, clubid);
                        }
                    } else {
                        this.game.modmgr.mod_center.mod_club.sendclubkaifang(this.listinfos[sender.idx].kfmsg);
                    }
                }
            }, this);

        } else {
            label = cell.getChildByTag(100);
            png = "jublebu_" + this.listinfos[idx].iconpng;
            label.setTexture(res[png]);
            label = cell.getChildByTag(101);
            label.setString(this.listinfos[idx].gamename);
            label = cell.getChildByTag(102);
            label.setString(this.listinfos[idx].lastwanfa);
            label = cell.getChildByTag(103);
            label.idx = idx;
            label = cell.getChildByTag(104);
            label.idx = idx;
        }
        return cell;
    },
    //5成员头像
    setclubplayershead: function (table, idx) {
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new cc.TableViewCell();
        } else {

        }
        return cell;
    },
    //俱乐部战绩显示更新
    setRecordItem: function (item, idx) {
        ccui.helper.seekWidgetByName(item, "modeTxt").setString(this.listinfos[idx].wanfa);
        ccui.helper.seekWidgetByName(item, "roomIdTxt").setString(this.listinfos[idx].roomid);
        ccui.helper.seekWidgetByName(item, "timeTxt").setString(this.listinfos[idx].time1 + " " + this.listinfos[idx].time2);

        var recordUserLen = this.listinfos[idx].perlist.length;
        var len = 5;
        for (var i = 0; i < len; i++) {
            var user = ccui.helper.seekWidgetByName(item, "user" + i);
            if (i < recordUserLen) {
                user.setVisible(true);
                ccui.helper.seekWidgetByName(user, "nameTxt").setString(this.listinfos[idx].perlist[i].name);
                gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(user, "headImg"), this.listinfos[idx].perlist[i].head, 0, 0, "im_headbg2");

                var labela = ccui.helper.seekWidgetByName(user, "scoreTxt");
                var score = this.listinfos[idx].perlist[i].score;
                var colors;
                var plus = "";
                if (score < 0) {
                    colors = cc.color(204, 51, 51, 255);
                } else if (score > 0) {
                    plus = "+";
                    colors = cc.color(86, 178, 253, 255);
                } else {
                    plus = "+";
                    colors = cc.color(86, 178, 253, 255);
                }
                labela.setColor(colors);
                labela.setString(plus + score);
            } else {
                user.setVisible(false);
            }
        }
    },
    //6战绩
    setclubzhanji: function (table, idx) {
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new cc.TableViewCell();
            var item = this.game.uimgr.createnode(res.julebu_recordItem, true);
            cell.addChild(item, 0, 300);
            this.setRecordItem(item, idx);
        } else {
            var item = cell.getChildByTag(300);
            this.setRecordItem(item, idx);
        }
        return cell;
    },
    //消息通知-俱乐部动态
    setClubDynamic: function (item, idx) {
        ccui.helper.seekWidgetByName(item, "nameTxt").setString(this.listinfos[idx].name);
        ccui.helper.seekWidgetByName(item, "idTxt").setString(this.listinfos[idx].uid);
        ccui.helper.seekWidgetByName(item, "timeTxt").setString(this.listinfos[idx].time);
        ccui.helper.seekWidgetByName(item, "infoTxt").setString(this.listinfos[idx].event);
        gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(item, "headImg"), this.listinfos[idx].head, 0, 0, "im_headbg2");
    },
    //7成员进出消息
    setclubpermsg: function (table, idx) {
        var cell = table.dequeueCell();
        var clubid = this.listinfos[idx].clubid;
        var label;
        var png = "";
        if (!cell) {
            cell = new cc.TableViewCell();
            var item = this.game.uimgr.createnode(res.julebu_dynamic, true);
            cell.addChild(item, 0, 700);
            this.setClubDynamic(item, idx);
        } else {
            var item = cell.getChildByTag(700);
            this.setClubDynamic(item, idx);
        }
        return cell;
    },
    //数据统计单元显示更新
    setStatisticsItem: function (item, idx) {
        ccui.helper.seekWidgetByName(item, "timeTxt").setString(this.listinfos[idx].year + "-" + this.listinfos[idx].month + "-" + this.listinfos[idx].day);
        ccui.helper.seekWidgetByName(item, "consumeTxt").setString(this.listinfos[idx].num);
    },
    //数据统计
    setStatistics: function (table, idx) {
        var cell = table.dequeueCell();
        var clubid = this.listinfos[idx].clubid;
        var label;
        var png = "";
        if (!cell) {
            cell = new cc.TableViewCell();
            var item = this.game.uimgr.createnode(res.julebu_statistics, true);
            cell.addChild(item, 0, 800);
            this.setStatisticsItem(item, idx);
        } else {
            var item = cell.getChildByTag(800);
            this.setStatisticsItem(item, idx);
        }
        return cell;
    },
});