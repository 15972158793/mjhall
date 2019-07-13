/**
 * Created by Administrator on 2017-9-22.
 */


gameclass.checkSafeLayer = gameclass.baseui.extend({
    game:null,
    node:null,
    uiParent:null,
    EARTH_RADIUS:6378.137,//赤道半径(单位km)
    WARN_DIS:100,
    SAFE_COLORL:null,
    DANGER_COLOR:null,
    S_UNKNOWN:null,

    savePeopleNum:0,

    ctor:function(_node,_game,_btnsafe){
        this._super();
        this.uiParent = _node;
        this.game = _game;
        this.btn_safe = _btnsafe;

        this.SAFE_COLORL = cc.color(255, 255, 255);
        this.DANGER_COLOR = cc.color(165, 42, 42);

        this.S_UNKNOWN = "未知";

        this.show();
    },

    show:function(){
        this.node = this.game.uimgr.createnode(res.safeLayerJson,true);
        this.addChild(this.node);
        this.node.setVisible(false);
        ccui.helper.seekWidgetByName(this.node, "normal").setVisible(false);
        ccui.helper.seekWidgetByName(this.node, "nonormal").setVisible(false);

        var _this = this;
        gameclass.createbtnpress(_this.node, "btn_exitSafe", function () {
            _this.node.setVisible(false);
        });
    },


    getDisOnEarth:function(lon1, lat1, lon2, lat2){
        var radLat1 = this.rad(lat1);
        var radLat2 = this.rad(lat2);
        var a = radLat1 - radLat2;
        var b = this.rad(lon1) - this.rad(lon2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * this.EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return s;
    },

    rad:function(d){
        return d * Math.PI / 180.0;
    },

    getPeople:function (people, selfUid) {
        var tmp = [];
        for (var i = 0; i < people.length; i++) {
            if (people[i] != 0) {
                //将自己放置在首位
                if (people[i].uid == selfUid) {
                    tmp.unshift(people[i]);
                } else {
                    tmp.push(people[i]);
                }
            }
        }
        return tmp;
    },

    safeCount:function(people, uid){
        var people = this.getPeople(people, uid);
        var len = people.length;
        for (var i = 0; i < len; i++) {
            var compareIp = people[i].ip;
            var compareLongitude = people[i].longitude;
            var compareLatitude = people[i].latitude;
            //test
            //var compareNum = parseInt(Math.random()*2);
            //compareIp = "123";
            //compareLongitude = 32;
            //compareLatitude = 32;
            //test end
            people[i].disArr = new Array();
            people[i].ipWarn = false;
            people[i].disWarn = false;
            for (var j = 0; j < len; j++) {
                //ip安全监测
                var targetIp = people[j].ip;
                //var targetNum = parseInt(Math.random()*2);
                //targetIp = "456";
                if (compareIp == targetIp && i != j) {
                    people[i].ipWarn = true;
                    people[j].ipWarn = true;
                }
                var targetLongitude = people[j].longitude;
                var targetLatitude = people[j].latitude;
                //距离计算及安全监测
                //test
                //targetLongitude = 45;
                //targetLatitude = 45;
                //test end
                if (compareLongitude && targetLongitude) {
                    if( i != j){
                        people[i].disArr[j] = this.getDisOnEarth(compareLongitude, compareLatitude, targetLongitude, targetLatitude);
                        if (people[i].disArr[j] * 1000 < this.WARN_DIS) {
                            people[i].disWarn = true;
                        }
                    }
                }
            }
        }
        return people;
    },

    checkSafe: function (people) {
        if(!people) return;
        this.mod_game=gameclass.mod_platform.game.modmgr.mod_login.getfirstgame();
        //cc.log(this.mod_game);

        people = this.safeCount(people, this.game.modmgr.mod_login.logindata.uid);
        var isDanger = this.baseCheckSafe(people);

        if (isDanger) {
            if(!this.mod_game.begin && this.mod_game.gamestate != 1){//有的游戏是用gameState
                this.btn_safe.setVisible(true);
            }else{
                this.btn_safe.setVisible(false);
            }
            this.btn_safe.loadTextureNormal(res.redSafe, ccui.Widget.LOCAL_TEXTURE);
            //金币场自动弹框
            if(this.goldtype < 10000){
                this.safeBtncallFunc(people);
            }
        } else {
            this.btn_safe.loadTextureNormal(res.blueSafe, ccui.Widget.LOCAL_TEXTURE);
        }
    },

    baseCheckSafe:function(people){
        var len = people.length;

        if(len <= 1)return false;
        for (var i = 0; i < len; i++) {
            if(people[i].ipWarn)return true;
            if(people[i].disWarn)return true;
        }
        return false;
    },

    safeBtncallFunc:function(people){
        people = this.safeCount(people, this.game.modmgr.mod_login.logindata.uid);
        this.showSafeWindow(people);
    },

    showSafeWindow:function(resultArr){
        this.node.setVisible(true);
        if (resultArr.length > 0) {
            var self = resultArr[0];
            var normal = ccui.helper.seekWidgetByName(this.node,"normal");
            normal.setVisible(true);
            for (var i = 0; i < 6; i++) {
                var name = normal.getChildByName("name" + i);
                var ip = normal.getChildByName("ip" + i);
                var disInfo = normal.getChildByName("disInfo" + i);
                var dis = normal.getChildByName("dis" + i);
                name.setVisible(i < resultArr.length);
                ip.setVisible(i < resultArr.length);
                disInfo.setVisible(i < resultArr.length);
                dis.setVisible(i < resultArr.length);
                if (i >= resultArr.length) continue;
                if (resultArr[i].uid == this.game.modmgr.mod_login.logindata.uid) {
                    disInfo.setVisible(false);
                    dis.setVisible(false);
                }
                name.setString("");
                ip.setString("");
                if(resultArr[i].ipWarn){
                    ip.setTextColor(this.DANGER_COLOR);
                    dis.setTextColor(this.DANGER_COLOR);
                }else{
                    ip.setTextColor(this.SAFE_COLORL);
                    dis.setTextColor(this.SAFE_COLORL);
                }
                name.setString(resultArr[i].name);
                ip.setString(resultArr[i].ip);
                if (self.disArr.length >= i) {
                    if (self.disArr[i] > 10) {
                        dis.setString(self.disArr[i] + "km");
                    } else {
                        dis.setString(self.disArr[i] * 1000 + "m");
                    }
                } else {
                    dis.setString(this.S_UNKNOWN);
                }
            }
        } else {
            ccui.helper.seekWidgetByName(this.node, "nonormal").setVisible(true);
        }

    },

})
