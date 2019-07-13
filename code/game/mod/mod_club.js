/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_club = gameclass.mod_base.extend({
    mod_center: null,
    myselfclubs: null,
    myselfclubsid: null,
    myapplyclubsid: null,
    allclubs: null,
    //chooseStates:null,//这个根据俱乐部id而不同
    clubmanagerinfo: null,
    choosegames: null,
    choosegametype: null,
    hallkfinfo: null,
    ctor: function () {
        this.choosegames = ["卡五星", "拼三张", "牛牛", "斗地主", "牛元帅", "拼天九", "推筒子", "十点半", "跑得快", "扫雷"];
        this.choosegametype = [[gameclass.gamekwx, gameclass.gamekwx1, gameclass.gamekwx2, gameclass.gamekwx3, gameclass.gamekwx4, gameclass.gamekwx5],
            [gameclass.gameszp, gameclass.gameszp_fk], [gameclass.gameniuniu, gameclass.gamejxnn], [gameclass.gameddz, gameclass.gamelzddz],
            [gameclass.gamenys,gameclass.gamebrnys,gameclass.gamezynys,gameclass.gamegdnys,gameclass.gamesznys], [gameclass.gameptj],
            [gameclass.gamettz],[gameclass.gamesdb], [0], [gameclass.gamenxs]];
    }
});

gameclass.mod_club.prototype.onMsg = function (data) {
    //cc.log(data);
    this.mod_center = this.game.modmgr.mod_center;
    //cc.log("getMsg-----club----->" + data.msghead + "||data=" + JSON.stringify(data.msgdata));
    switch (data.msghead) {
        case "myclubinfo":
            this.myselfclubs = [];
            this.myselfclubsid = [];
            this.myapplyclubsid = data.msgdata.apply;
            if (!this.myapplyclubsid) this.myapplyclubsid = [];
            if (data.msgdata.info) {
                for (var i = 0; i < data.msgdata.info.length; i++) {
                    this.myselfclubsid.push(data.msgdata.info[i].id);
                    var obj = {
                        clubname: data.msgdata.info[i].name,
                        clubgamechoose: this.getgameNamesbyTypes(data.msgdata.info[i].game, 1),
                        clubgamename: this.getgameNamesbyTypes(data.msgdata.info[i].game, 0),
                        clubid: data.msgdata.info[i].id,
                        personcount: data.msgdata.info[i].num,
                        notice: data.msgdata.info[i].notice,
                        icon: data.msgdata.info[i].icon
                    };
                    this.myselfclubs.push(obj);
                }
            }
            if(this.game.uimgr.uis["gameclass.clubinfosmyself"]){
                this.game.uimgr.uis["gameclass.clubinfosmyself"].clubJoinTableview();
            }
            break;
        case "getclublist":
            this.allclubs = [];
            if (data.msgdata.info) {
                for (var i = 0; i < data.msgdata.info.length; i++) {
                    var obj = {
                        clubname: data.msgdata.info[i].name,
                        clubgamename: this.getgameNamesbyTypes(data.msgdata.info[i].game, 0),//data.msgdata.info[i].notice,
                        clubid: data.msgdata.info[i].id,
                        personcount: data.msgdata.info[i].num,
                        isOperate: 2,
                        notice: data.msgdata.info[i].notice,
                        icon: data.msgdata.info[i].icon
                    };
                    this.allclubs.push(obj);
                }
                if(this.game.uimgr.uis["gameclass.clubinfosmyself"]){
                    this.game.uimgr.uis["gameclass.clubinfosmyself"].clubJoinTableview();
                }
            }
            //cc.log(this.allclubs);
            break;
        case "clubapply": //申请俱乐部成功
            for(var i = 0;i<this.allclubs.length;i++){
                var ob = this.allclubs[i];
                if(ob.clubid == data.msgdata.clubid){
                    ob.isOperate = 1;
                    this.game.uimgr.uis["gameclass.clubinfosmyself"].updateSingleInfo(ob, i);
                    break;
                }
            }
            gameclass.showText("加入申请已发送");

            this.myapplyclubsid.push(data.msgdata.clubid);
            break;
        case "clubunapply"://取消申请成功
            for(var i = 0;i<this.allclubs.length;i++){
                var ob = this.allclubs[i];
                if(ob.clubid == data.msgdata.clubid){
                    ob.isOperate = 2;
                    this.game.uimgr.uis["gameclass.clubinfosmyself"].updateSingleInfo(ob, i);
                    break;
                }
            }


            for (var i = 0; i < this.myapplyclubsid.length; i++) {
                if (this.myapplyclubsid[i] == data.msgdata.clubid) {
                    this.myapplyclubsid.splice(i, 1);
                    break;
                }
            }
            break;
        case "clubcreate"://创建俱乐部成功

            this.clubmanagerinfo = data.msgdata;

            // this.game.uimgr.showui("gameclass.clubSingleHall");
            // this.game.uimgr.uis["gameclass.clubSingleHall"].setclubid(data.msgdata.id);
            this.game.modmgr.mod_center.mod_club.sendclubchat(data.msgdata.id);

            this.game.uimgr.uis["gameclass.clubinfosmyself"].switchTabIndex(0);
            this.game.uimgr.showui("gameclass.clubmanger");
            this.game.uimgr.uis["gameclass.clubmanger"].setmenberinfos(data.msgdata, false);
            this.game.uimgr.uis["gameclass.clubmanger"].updateView(data.msgdata);
            this.game.uimgr.uis["gameclass.clubmanger"].updatePanelShow(3);

            this.myselfclubsid.push(data.msgdata.id);
            var obj = {
                clubname: data.msgdata.name,
                clubgamechoose: this.getgameNamesbyTypes(data.msgdata.game, 1),
                clubgamename: this.getgameNamesbyTypes(data.msgdata.game, 0),
                clubid: data.msgdata.id,
                personcount: 1
            };
            this.myselfclubs.push(obj);
            if (this.game.uimgr.uis["gameclass.clubinfosmyself"]) {
                this.game.uimgr.uis["gameclass.clubinfosmyself"].addTableview(this.myselfclubs);
            }
            break;
        case "clubinfo"://进入俱乐部(俱乐部信息界面或说成员信息功能管理)
            this.clubmanagerinfo = data.msgdata;
            //this.game.uimgr.closeui("gameclass.clubinfosmyself");
            // this.game.uimgr.showui("gameclass.clubSingleHall");
            //
            // this.game.uimgr.uis["gameclass.clubSingleHall"].setclubid(this.clubmanagerinfo.id);
            this.game.uimgr.showui("gameclass.clubmanger");
            this.game.uimgr.uis["gameclass.clubmanger"].setmenberinfos(data.msgdata, false);
            this.game.uimgr.uis["gameclass.clubmanger"].updateView(data.msgdata);
            this.game.uimgr.uis["gameclass.clubmanger"].updatePanelShow(1);


            this.game.modmgr.mod_center.mod_club.sendclubchat(this.clubmanagerinfo.id);
            this.game.modmgr.mod_center.mod_club.sendeventlist(this.clubmanagerinfo.id);
            // this.game.modmgr.mod_center.mod_club.sendclubfight(this.clubmanagerinfo.id);
            break;
        case "addroomchat"://俱乐部里收到开房的广播消息
            if (this.game.modmgr.mod_login.logindata.uid == data.msgdata.info.uid) {
                this.game.uimgr.closeui("gameclass.clubcellPanel");
                this.game.uimgr.closeui("gameclass.createroomui");
            }
            if(this.hallkfinfo){
                this.hallkfinfo.push(data.msgdata.info);
            }
            if(this.game.uimgr.uis["gameclass.clubmanger"]){
                this.game.uimgr.uis["gameclass.clubmanger"]._roomListControl.addHallTableview(this.hallkfinfo);
            }
            // this.game.uimgr.uis["gameclass.clubSingleHall"].addHallTableview(this.hallkfinfo);
            break;
        case "delroomchat"://俱乐部里收到开房关闭的广播消息
            if(this.game.uimgr.uis["gameclass.clubmanger"] && this.game.uimgr.uis["gameclass.clubmanger"]._clubData && this.game.uimgr.uis["gameclass.clubmanger"]._clubData.id == data.msgdata.clubid){
                if(this.hallkfinfo){
                    for(var i = 0;i<this.hallkfinfo.length;i++){
                        var fang = this.hallkfinfo[i];
                        if(fang.roomid == data.msgdata.roomid){
                            this.hallkfinfo.splice(i, 1);
                            this.game.uimgr.uis["gameclass.clubmanger"]._roomListControl.addHallTableview(this.hallkfinfo);
                            break;
                        }
                    }
                }
            }
            break;
        case "stateroomchat"://俱乐部里收到房间状态改变广播消息
            if(this.game.uimgr.uis["gameclass.clubmanger"] && this.game.uimgr.uis["gameclass.clubmanger"]._clubData && this.game.uimgr.uis["gameclass.clubmanger"]._clubData.id == data.msgdata.clubid){
                if(this.hallkfinfo){
                    for(var i = 0;i<this.hallkfinfo.length;i++){
                        var fang = this.hallkfinfo[i];
                        if(fang.roomid == data.msgdata.roomid){
                            this.hallkfinfo[i].state = 1;
                            this.game.uimgr.uis["gameclass.clubmanger"]._roomListControl.addHallTableview(this.hallkfinfo);
                            break;
                        }
                    }
                }
            }
            break;
        case "clubroomchat"://得到俱乐部里的广播消息
            this.hallkfinfo = data.msgdata.info;
            if (!this.hallkfinfo) this.hallkfinfo = [];
            // this.game.uimgr.uis["gameclass.clubSingleHall"].addHallTableview(this.hallkfinfo);
            if(this.game.uimgr.uis["gameclass.clubmanger"]){
                this.game.uimgr.uis["gameclass.clubmanger"]._roomListControl.addHallTableview(this.hallkfinfo);
            }
            break;
        case "clubroomlist"://（群主查看）俱乐部里开房记录

            break;
        case "clubmember"://群主处理 是否允许加入俱乐部
            //data.msgdata.id  data.msgdata.member  data.msgdata.apply
            //for(var i = 0 ; i < this.myselfclubs.length; i++){
            //    if(this.myselfclubs[i].id == data.msgdata.id){
            //        this.myselfclubs[i].personcount += 1;
            //        break;
            //    }
            //}
            this.clubmanagerinfo.member = data.msgdata.member;
            this.game.uimgr.uis["gameclass.clubmanger"].setmenberinfos(this.clubmanagerinfo, true);

            var clubkfinfos = [];
            if (data.msgdata.apply) {
                var temp = data.msgdata.apply;
                if (!temp) temp = [];
                for (var i = 0; i < temp.length; i++) {
                    var obj = {
                        "clubid": data.msgdata.id,
                        "head": temp[i].head,
                        "name": temp[i].name,
                        "uid": temp[i].uid,
                        "time": staticFunction.getStandardTime(temp[i].time)
                    };
                    clubkfinfos.push(obj);
                }
            }
            var obj1 = {
                "clubid": data.msgdata.id,
                "data": clubkfinfos
            }
            this.game.uimgr.uis["gameclass.clubcellPanel"].setcurcell(3, obj1);

            for (var k = 0; k < this.myselfclubs.length; k++) {
                if (this.myselfclubs[k].clubid == data.msgdata.id) {
                    this.myselfclubs[k].personcount = data.msgdata.member.length;
                    break;
                }
            }

            break;
        case "clubmode"://俱乐部消耗房卡模式设置
            if(this.game.uimgr.uis["gameclass.clubmanger"]){
                this.game.uimgr.uis["gameclass.clubmanger"].setfreemode(data.msgdata.mode);
                //cc.log(data.msgdata,this.clubmanagerinfo);
                this.clubmanagerinfo.mode = data.msgdata.mode;
                gameclass.showText("成功修改俱乐部开房模式");
                this.game.uimgr.closeui("gameclass.clubcellPanel");
                if(this.game.uimgr.uis["gameclass.clubmanger"]._clubData.id == data.msgdata.id){
                    this.game.uimgr.uis["gameclass.clubmanger"]._clubData.mode = data.msgdata.mode;
                    this.game.uimgr.uis["gameclass.clubmanger"].updateView(this.game.uimgr.uis["gameclass.clubmanger"]._clubData);
                }
            }

            break;
        case "clubgame"://俱乐部游戏设置
            for (var i = 0; i < this.myselfclubs.length; i++) {
                if (this.myselfclubs[i].clubid == data.msgdata.id) {
                    this.myselfclubs[i].clubgamechoose = this.getgameNamesbyTypes(data.msgdata.game, 1),
                        this.myselfclubs[i].clubgamename = this.getgameNamesbyTypes(data.msgdata.game, 0);
                    gameclass.showText("设置成功");
                    this.game.uimgr.closeui("gameclass.clubcellPanel");
                    break;
                }
            }
            break;
        case "clubname"://俱乐部名称修改
            for (var i = 0; i < this.myselfclubs.length; i++) {
                if (this.myselfclubs[i].clubid == data.msgdata.id) {
                    this.myselfclubs[i].clubname = data.msgdata.name;
                    gameclass.showText("成功修改俱乐部名称");
                    this.game.uimgr.closeui("gameclass.clubcellPanel");
                    break;
                }
            }
            if(this.game.uimgr.uis["gameclass.clubmanger"]._clubData.id == data.msgdata.id){
                this.game.uimgr.uis["gameclass.clubmanger"]._clubData.name = data.msgdata.name;
                this.game.uimgr.uis["gameclass.clubmanger"].updateView(this.game.uimgr.uis["gameclass.clubmanger"]._clubData);
                gameclass.showText("成功修改俱乐部名称");
            }
            break;
        case "clubeventlist":
            var obj = {
                "clubid": data.msgdata.id,
                "data": data.msgdata.info
            }
            if(this.game.uimgr.uis["gameclass.clubcellPanel"]){
                this.game.uimgr.uis["gameclass.clubcellPanel"].setcurcell(4, obj);
            }
            // if(data.msgdata.info.length > 0 && this.game.uimgr.uis["gameclass.clubmanger"] && this.game.uimgr.uis["gameclass.clubmanger"]._clubData && this.game.uimgr.uis["gameclass.clubmanger"]._clubData.id == data.msgdata.id){
            //     this.game.uimgr.uis["gameclass.clubmanger"].setMsgRed(true);
            // }
            break;
        case "clubcostcard":
            if(this.game.uimgr.uis["gameclass.clubmanger"] && this.game.uimgr.uis["gameclass.clubmanger"]._clubData && this.game.uimgr.uis["gameclass.clubmanger"]._clubData.id == data.msgdata.clubid){
                this.game.uimgr.uis["gameclass.clubcellPanel"].setcurcell(8, data.msgdata.info);
            }
            break;
        case "clubapplylist":
            var clubapplyinfos = [];
            if (data.msgdata.info) {
                for (var i = 0; i < data.msgdata.info.length; i++) {
                    var obj = {
                        "clubid": data.msgdata.id,
                        "head": data.msgdata.info[i].head,
                        "name": data.msgdata.info[i].name,
                        "uid": data.msgdata.info[i].uid,
                        "time":staticFunction.getStandardTime(data.msgdata.info[i].time)
                    };
                    clubapplyinfos.push(obj);
                }
            }
            var obj1 = {
                "clubid": data.msgdata.id,
                "data": clubapplyinfos
            }
            this.game.uimgr.showui("gameclass.clubcellPanel");
            this.game.uimgr.uis["gameclass.clubcellPanel"].setcurcell(3, obj1);
            break;
        case "clubroomresult":
            var clubzjinfos = [];
            if (data.msgdata.info) {
                for (var i = 0; i < data.msgdata.info.length; i++) {
                    var perlist = [];
                    for (var k = 0; k < data.msgdata.info[i].info.length; k++) {
                        var per = {
                            "name": data.msgdata.info[i].info[k].name,
                            "head": data.msgdata.info[i].info[k].head,
                            "score": data.msgdata.info[i].info[k].score,
                            "uid": data.msgdata.info[i].info[k].uid
                        }
                        //cc.log(per);
                        perlist.push(per);
                    }
                    //cc.log(perlist);
                    var wanfa = "玩法: ";
                    // wanfa += this.game.uimgr.uis["gameclass.clubSingleHall"].allshare(data.msgdata.info[i], false);
                    wanfa += this.game.uimgr.uis["gameclass.clubmanger"]._roomListControl.allshare(data.msgdata.info[i], false);
                    var obj = {
                        "roomid": data.msgdata.info[i].roomid,
                        // "gamename": this.game.uimgr.uis["gameclass.clubSingleHall"].getgameNamebytype(data.msgdata.info[i].gametype),
                        "gamename": this.game.uimgr.uis["gameclass.clubmanger"]._roomListControl.getgameNamebytype(data.msgdata.info[i].gametype),
                        "time1": this.getzhanjiDate(data.msgdata.info[i].time, 1),
                        "time2": this.getzhanjiDate(data.msgdata.info[i].time, 2),
                        "num": data.msgdata.info[i].num,
                        //"param1":data.msgdata.info[i].param1,
                        //"param2":data.msgdata.info[i].param2,
                        //"maxstep":data.msgdata.info[i].maxstep,
                        "wanfa": wanfa,
                        "perlist": perlist,
                    };
                    clubzjinfos.push(obj);
                }
            }
            if(this.game.uimgr.uis["gameclass.clubmanger"]){
                this.game.uimgr.uis["gameclass.clubmanger"]._recordControl.addzhanjiTableview(clubzjinfos);
            }
            // this.game.uimgr.uis["gameclass.clubzhanji"].addzhanjiTableview(clubzjinfos);
            break;
        case "clubexit"://退出俱乐部
            for (var i = 0; i < this.myselfclubs.length; i++) {
                if (this.myselfclubs[i].clubid == data.msgdata.id) {
                    this.myselfclubs[i].personcount -= 1;
                    if (this.game.modmgr.mod_login.logindata.uid == data.msgdata.uid) {
                        //在俱乐部界面里就关闭界面
                        this.game.uimgr.closeui("gameclass.clubcellPanel");
                        this.game.uimgr.closeui("gameclass.clubpersons");
                        this.game.uimgr.closeui("gameclass.clubmanger");
                        if (this.game.uimgr.uis["gameclass.clubSingleHall"])
                            this.game.uimgr.uis["gameclass.clubSingleHall"].setclubid(0);
                        this.game.uimgr.closeui("gameclass.clubSingleHall");
                        this.game.uimgr.closeui("gameclass.clubinfosmyself");
                        this.myselfclubs.splice(i, 1);
                        this.myselfclubsid.splice(i, 1);
                        this.game.uimgr.showui("gameclass.msgboxui");
                        this.game.uimgr.uis["gameclass.msgboxui"].setString("您已不是俱乐部成员!");
                    }
                    else {
                        //自己不是被提出的人就刷新俱乐部成员信息（好像只有群主才会收到）
                        for (var k = 0; k < this.clubmanagerinfo.member.length; k++) {
                            if (this.clubmanagerinfo.member[k].uid == data.msgdata.uid) {
                                this.clubmanagerinfo.member.splice(k, 1);
                                if (this.game.uimgr.uis["gameclass.clubpersons"])
                                    this.game.uimgr.uis["gameclass.clubpersons"].hidetirentip(this.clubmanagerinfo.member, data.msgdata.id, true);
                                if (this.game.uimgr.uis["gameclass.clubmanger"])
                                    this.game.uimgr.uis["gameclass.clubmanger"].setmenberinfos(this.clubmanagerinfo, true);
                                break;
                            }
                        }
                    }
                    break;
                }
            }
            //cc.log(this.clubmanagerinfo)
            break;
        //解散俱乐部
        case "clubdissmiss":
            if(this.game.uimgr.uis["gameclass.clubmanger"]._clubData.id == data.msgdata.clubid){
                this.game.uimgr.closeui("gameclass.clubmanger");
                gameclass.showText("您当前所在俱乐部已被群主解散!");
            }
            break;
    }
};

//---------------------------单独写可以快速看到具体消息头---------------------------------
//得到俱乐部列表
gameclass.mod_club.prototype.sendgetclubs = function () {
    if (this.mod_center.mywebsocket == null) {
        return;
    }
    var data = {};
    this.mod_center.mywebsocket.send("getclublist", data);
};
//申请俱乐部
gameclass.mod_club.prototype.sendclubapply = function (cid) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    var data = {"clubid": cid};
    this.mod_center.mywebsocket.send("clubapply", data);
};
//取消申请俱乐部
gameclass.mod_club.prototype.sendcancelapply = function (cid) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    var data = {"clubid": cid};
    this.mod_center.mywebsocket.send("clubunapply", data);
};
/**
 * 创建俱乐部
 * @param cname 俱乐部名称
 * @param cgamelist
 * @param roomCardSetIndex 房卡设置索引
 * @param iconIndex 头像索引
 * @param notice    公告
 */
gameclass.mod_club.prototype.sendclubcreate = function (cname, cgamelist, roomCardSetIndex, iconIndex, notice) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    // var data = {"name": cname, "game": cgamelist, "mode": roomCardSetIndex, "icon": iconIndex+"", "notice": notice};
    var data = {"name": cname, "mode": roomCardSetIndex, "icon": iconIndex+"", "notice": notice};
    this.mod_center.mywebsocket.send("clubcreate", data);
};
//进入俱乐部
gameclass.mod_club.prototype.sendEnterclub = function (cid) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }
    var data = {"clubid": cid};
    this.mod_center.mywebsocket.send("clubenter", data);
};
//请求退出或加入成员信息
gameclass.mod_club.prototype.sendeventlist = function (cid) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }
    var data = {"clubid": cid};
    this.mod_center.mywebsocket.send("clubeventlist", data);
};
//请求数据统计信息
gameclass.mod_club.prototype.sendStatistics = function (cid) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }
    var data = {"clubid": cid};
    this.mod_center.mywebsocket.send("clubcostcard", data);
};
//获取申请列表
gameclass.mod_club.prototype.sendapplylist = function (cid) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }
    var data = {"clubid": cid};
    this.mod_center.mywebsocket.send("clubapplylist", data);
};

//离开俱乐部（不是退出，只是关闭俱乐部界面）无返回消息的
gameclass.mod_club.prototype.sendLeaveclub = function (cid) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    var data = {"clubid": cid};
    this.mod_center.mywebsocket.send("clubleave", data);
};
//退出或是踢出俱乐部
gameclass.mod_club.prototype.sendExitclub = function (cid, uid) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    var data = {"clubid": cid, "uid": uid};
    this.mod_center.mywebsocket.send("clubexit", data);
};
//群主处理加入俱乐部的申请
gameclass.mod_club.prototype.sendAgreeaplye = function (msgdata) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    var data = {"clubid": msgdata.cid, "uid": msgdata.uid, "agree": msgdata.bool};
    this.mod_center.mywebsocket.send("cluborder", data);
};
//俱乐部开房啦
gameclass.mod_club.prototype.sendclubkaifang = function (msgdata) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    var data = {
        "clubid": msgdata.clubid,
        "gametype": msgdata.gametype,
        "param1": msgdata.param1,
        "param2": msgdata.param2,
        "num": msgdata.num
    };
    this.mod_center.mywebsocket.send("clubroom", data);
};
//获取俱乐部聊天记录
gameclass.mod_club.prototype.sendclubchat = function (cid) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    var data = {"clubid": cid};
    this.mod_center.mywebsocket.send("clubroomchat", data);
};
//得到开房记录(这个纪录只给群主看)
gameclass.mod_club.prototype.sendclubkfRecord = function (cid) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    var data = {"clubid": cid};
    this.mod_center.mywebsocket.send("clubroomlist", data);
};
//群主设置开房模式 mode int //! 0只能主席开房   1任何人都能开房
gameclass.mod_club.prototype.sendchangefree = function (cid, mode) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    var data = {"clubid": cid, "mode": mode};
    this.mod_center.mywebsocket.send("clubmode", data);
};
//群主设置游戏模式
gameclass.mod_club.prototype.sendchangegametype = function (cid, gametypeArr) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    var data = {"clubid": cid, "game": gametypeArr};
    this.mod_center.mywebsocket.send("clubgame", data);
};
//群主修改俱乐部名称
gameclass.mod_club.prototype.sendchangecname = function (cid, cname) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    var data = {"clubid": cid, "name": cname};
    this.mod_center.mywebsocket.send("clubname", data);
};
//群主修改俱乐部公告
gameclass.mod_club.prototype.sendchangecNotice = function (cid, notice) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    var data = {"clubid": cid, "notice": notice};
    this.mod_center.mywebsocket.send("clubnotice", data);
};
//群主修改俱乐部头像
gameclass.mod_club.prototype.sendchangecHead = function (cid, icon) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    var data = {"clubid": cid, "icon": icon.toString()};
    this.mod_center.mywebsocket.send("clubicon", data);
};

//战绩
gameclass.mod_club.prototype.sendclubfight = function (cid) {
    if (this.mod_center.mywebsocket == null) {
        return;
    }

    var data = {"clubid": cid};
    this.mod_center.mywebsocket.send("clubroomresult", data);
};
//根据游戏类型得到游戏序号
gameclass.mod_club.prototype.getgameIndexbytype = function (gametype) {
    var gameindex = "";
    var choosegametype = this.choosegametype;
    for (var i = 0; i < choosegametype.length; i++) {
        for (var j = 0; j < choosegametype[i].length; j++) {
            if (choosegametype[i][j] == gametype) {
                gameindex = i;
                return gameindex;
            }
        }
    }
};

//根据游戏类型和cardnum得到游戏最大局数
gameclass.mod_club.prototype.getmaxstepbycardnum = function (gametype, cardnum) {
    var maxstep = 0;
    if (cardnum == 1) {
        if (gametype == gameclass.gamenxs) maxstep = 5;

        else if (gametype == gameclass.gameptj) maxstep = 12;

        else if (gametype == gameclass.gamenys || gametype == gameclass.gamebrnys || gametype == gameclass.gamezynys || gametype == gameclass.gamegdnys
            || gametype == gameclass.gamesznys || gametype == gameclass.gameniuniu || gametype == gameclass.gamejxnn) maxstep = 10;

        else if (gametype == gameclass.gameszp || gametype == gameclass.gameszp_fk || gametype == gameclass.gameddz ||
            gametype == gameclass.gamelzddz || gametype == gameclass.gamesdb) maxstep = 6;

        else if (gametype == gameclass.gamettz || gametype == gameclass.gamekwx || gametype == gameclass.gamekwx1 ||
            gametype == gameclass.gamekwx2 || gametype == gameclass.gamekwx3 || gametype == gameclass.gamekwx4
            || gametype == gameclass.gamekwx5) maxstep = 8;
    }
    else if (cardnum == 2) {
        if (gametype == gameclass.gamenxs) maxstep = 10;

        else if (gametype == gameclass.gameptj) maxstep = 24;

        else if (gametype == gameclass.gamenys || gametype == gameclass.gamebrnys || gametype == gameclass.gamezynys || gametype == gameclass.gamegdnys
            || gametype == gameclass.gamesznys || gametype == gameclass.gameniuniu || gametype == gameclass.gamejxnn) maxstep = 20;

        else if (gametype == gameclass.gameszp || gametype == gameclass.gameszp_fk || gametype == gameclass.gameddz
            || gametype == gameclass.gamelzddz || gametype == gameclass.gamesdb) maxstep = 12;

        else if (gametype == gameclass.gamettz || gametype == gameclass.gamekwx || gametype == gameclass.gamekwx1 ||
            gametype == gameclass.gamekwx2 || gametype == gameclass.gamekwx3 || gametype == gameclass.gamekwx4
            || gametype == gameclass.gamekwx5) maxstep = 16;
    }
    else if (cardnum == 3) {
        if (gametype == gameclass.gamejxnn) maxstep = 30;
    }
    return maxstep;
};

//根据TYPE得到所有游戏名称 getwhat=1选择游戏与否，0选择游戏的名称
gameclass.mod_club.prototype.getgameNamesbyTypes = function (gameTypes, getwhat) {
    var gamestr = "游戏: ";
    var gamechoose = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var isbreak = false;
    //this.chooseStates = [0,0,0,0,0,0,0,0,0,0];
    for (var i = 0; i < this.choosegametype.length; i++) {
        isbreak = false;
        for (var j = 0; j < this.choosegametype[i].length; j++) {
            for (var k = 0; k < gameTypes.length; k++) {
                if (gameTypes[k] == this.choosegametype[i][j]) {
                    gamestr += this.choosegames[i];
                    if (i < gamechoose.length - 1) {
                        gamestr += ", ";
                        if ((i + 1) % 6 == 0) gamestr += "\n      ";
                    }

                    gamechoose[i] = 1;
                    isbreak = true;
                    break;
                }
            }
            if (isbreak) break;
        }
    }
    if (getwhat == 1) return gamechoose;
    else return gamestr;

};
gameclass.mod_club.prototype.getzhanjiDate = function (dates, tpye) {
    var d = new Date(dates * 1000);
    var date = "";
    if (tpye == 1) {
        date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    }
    else if (tpye == 2) {
        var hour = d.getHours();
        if (hour < 10) hour = "0" + hour;
        var min = d.getMinutes();
        if (min < 10) min = "0" + min;
        date = hour + ":" + min
    }
    return date;
};