/**
 * Created by Administrator on 2017/7/18.
 */
gameclass.clubSingleHall = gameclass.baseui.extend({
    _clubData:null,
    node:null,
    clubid:0,
    tabview:null,
    game:null,
    ctor: function ($node, game) {
        this.node = $node;
        this.game = game;
        this._super();

    },
    setclubid:function(cid){
        this.clubid = cid;
    },
    getclubid:function(){
        return this.clubid;
    },
    updateView: function (clubData) {
        this._clubData = clubData;
        this.setclubid(this._clubData.id);
    },
    show: function () {

    },
    addHallTableview:function(infos){
        var cluballinfos = [];
        if(infos) {
            for(var i = 0 ; i < infos.length; i++){
                var obj ={
                    "gameType":infos[i].gametype,
                    "name":"["+this.getgameNamebytype(infos[i].gametype)+"]",
                    "roomid":infos[i].roomid,
                    "wanfa":"玩法:" + this.allshare(infos[i],false),
                    "time":this.getDate(infos[i].time),
                    "state":parseInt(infos[i].state)
                }
                cluballinfos.push(obj);
            }
            this.node.removeAllChildren();
            this.tabview = new clubTableview(this.game,cluballinfos,2);
            this.node.addChild(this.tabview);
        }
    },
    //根据游戏类型得到游戏名称
    getgameNamebytype: function (gametype) {
        var gamename = "";
        var choosegames = this.game.modmgr.mod_center.mod_club.choosegames;
        var choosegametype = this.game.modmgr.mod_center.mod_club.choosegametype;
        for(var i = 0; i < choosegametype.length; i++){
            for(var j = 0; j < choosegametype[i].length; j++){
                if(choosegametype[i][j] == gametype){
                    gamename = choosegames[i];
                    return gamename;
                }
            }
        }
    },

    getDate:function(date){
        var d = new Date(date * 1000);
        var hour = d.getHours();
        if(hour < 10) hour = "0"+hour;
        var min = d.getMinutes();
        if(min < 10) min = "0"+min;
        var sec = d.getSeconds();
        if(sec < 10) sec = "0"+sec;
        var date = (d.getFullYear()) + "-" +
            (d.getMonth() + 1) + "-" +
            (d.getDate()) + " " +
            hour + ":" +
            min + ":" +
            sec;
        return date;
    },
    //玩法说明文字
    allshare:function(info,bool){
        var str = "";
        if(info.gametype == gameclass.gameszp_fk){
            str = this.pszfkshare(info,bool);
        }else if(info.gametype == gameclass.gameszp){
            str = this.pszshare(info,bool);
        }else if(info.gametype == gameclass.gameniuniu){
            str = this.niuniushare(info,bool);
        }else if(info.gametype == gameclass.gamejxnn){
            str = this.jxnnshare(info,bool);
        }else if(info.gametype == gameclass.gameddz || info.gametype == gameclass.gamelzddz){
            str = this.ddzshare(info,bool);
        }else if(info.gametype == gameclass.gameptj){
            str = this.ptjshare(info,bool);
        }else if(info.gametype == gameclass.gamettz){
            str = this.ttzshare(info,bool);
        }else if(info.gametype == gameclass.gamenxs){
            str = this.saoleishare(info,bool);
        }else if(info.gametype == gameclass.gamesdb){
            str = this.sdbshare(info,bool);
        }else if(info.gametype == gameclass.gamenys || info.gametype == gameclass.gamebrnys || info.gametype == gameclass.gamezynys
            || info.gametype == gameclass.gamegdnys || info.gametype == gameclass.gamesznys){
            str = this.nysshare(info,bool);
        }else if(info.gametype == gameclass.gamekwx||info.gametype == gameclass.gamekwx1||info.gametype == gameclass.gamekwx2
            ||info.gametype == gameclass.gamekwx3||info.gametype == gameclass.gamekwx4||info.gametype == gameclass.gamekwx5){
            str = this.kwxshare(info,bool);
        }
        str += "一共"+ info.maxstep +"局";
        //cc.log(str);
        return str;
    },
    nysshare: function(info,bool){
        var str = "";
        if(info.gametype == gameclass.gamenys) str = "看牌抢庄,";
        else if(info.gametype == gameclass.gamebrnys) str = "八人明牌,";
        else if(info.gametype == gameclass.gamezynys) str = "自由抢庄,";
        else if(info.gametype == gameclass.gamegdnys) str = "固定庄家,";
        else if(info.gametype == gameclass.gamesznys) str = "牛牛上庄,";
        //if(info.param1 %10 == 0) str += "可搓牌,";
        if(info.param1 %10 == 1) {str += "下注限制,";}

        if(parseInt(info.param1 / 10) %10 == 1) {str += "禁止搓牌,";}

        if(info.param2 %10 == 1) {str += "游戏开始后禁止加入,";}

        if(parseInt(info.param1 / 100) %10 == 1) {str += "推注5分,";}
        else if(parseInt(info.param1 / 100) %10 == 2) {str += "推注10分,";}
        else if(parseInt(info.param1 / 100) %10 == 3) {str += "推注15分,";}

        if(parseInt(info.param1 / 1000) %10 == 0) {str += "手动开始,";}
        else if(parseInt(info.param1 / 1000) %10 == 1) {str += "满4人开,";}
        else if(parseInt(info.param1 / 1000) %10 == 2) {str += "满5人开,";}
        else if(parseInt(info.param1 / 1000) %10 == 3) {str += "满6人开,";}

        if(info.gametype == gameclass.gamenys || info.gametype == gameclass.gamebrnys){
            str += "最大抢庄"+parseInt(info.param1 / 10000) %10+"倍,";
        }else if(info.gametype == gameclass.gamegdnys){
            if(parseInt(info.param1 / 10000) %10 == 1) {str += "上庄分数无,";}
            else if(parseInt(info.param1 / 10000) %10 == 2) {str += "上庄分数300,";}
            else if(parseInt(info.param1 / 10000) %10 == 3) {str += "上庄分数450,";}
            else if(parseInt(info.param1 / 10000) %10 == 4) {str += "上庄分数600,";}
        }

        if(parseInt(info.param2 / 10) %10 == 1) {str += "顺金牛(10倍),";}
        if(parseInt(info.param2 / 100) %10 == 1) {str += "炸弹牛(8倍),";}
        if(parseInt(info.param2 / 1000) %10 == 1) {str += "葫芦牛(7倍),";}
        if(parseInt(info.param2 / 10000) %10 == 1) {str += "五小牛(6倍),";}
        if(parseInt(info.param2 / 100000) %10 == 1) {str += "同花牛(6倍),";}
        if(parseInt(info.param2 / 1000000) %10 == 1) {str += "五花牛(5倍),";}
        if(parseInt(info.param2 / 10000000) %10 == 1) {str += "顺子牛(5倍),";}

        if(parseInt(info.param1 / 100000) %10 == 0) str += "翻倍规则：牛牛x3 牛九x2 牛八x2,";
        else if(parseInt(info.param1 / 100000) %10 == 1) str += "翻倍规则：牛牛x4 牛九x3 牛八x2 牛七x2,";

        if(parseInt(info.param1 / 1000000) %10 == 0) str += "底分：1/2,";
        else if(parseInt(info.param1 / 1000000) %10 == 1) str += "底分：2/4,";
        else if(parseInt(info.param1 / 1000000) %10 == 2) str += "底分：3/6,";
        else if(parseInt(info.param1 / 1000000) %10 == 3) str += "底分：4/8,";
        else if(parseInt(info.param1 / 1000000) %10 == 4) str += "底分：5/10,";

        return str;
    },
    pszshare: function(info,bool){
        var str = "经典三张,";
        if(info.param1 %10 == 0) str += "50分封顶,";
        else if(info.param1 %10 == 1) str += "100分封顶,";

        if (parseInt(info.param1 / 10) %10 == 0) str += "豹子无奖励,";
        else if(parseInt(info.param1 / 10) %10 == 1) str += "豹子奖励5分,";
        else if(parseInt(info.param1 / 10) %10 == 2) str += "豹子奖励10分,";

        if (parseInt(info.param1 / 100) %10 == 0) str += "轮庄模式,";
        else if(parseInt(info.param1 / 100) %10 == 1) str += "赢家庄,";
        return str;
    },
    pszfkshare: function(info,bool){
        var str = "疯狂三张,";
        str += (parseInt(info.param1 / 10) %10)*5+"轮封顶,";
        if (info.param1 % 10 == 1) str += "比大小,";
        else if(info.param1 % 10 == 2) str += "比花色,";
        else if(info.param1 % 10 == 3) str += "全比,";

        if(info.param2 % 10 == 1) { str+= "豹子额外奖励,";  }

        if(parseInt(info.param2 / 10) %10 == 1) {str+= "比牌双倍开,";  }

        if(parseInt(info.param2 / 100) %10 == 1) {str += "解散局算分,";  }

        str += parseInt(info.param1 / 100) %10 +"轮比牌,";
        if(parseInt(info.param1 / 1000) %10 == 0) str += "不闷牌,";
        else if(parseInt(info.param1 / 1000) %10 == 1) str += "2轮闷牌,";
        else if(parseInt(info.param1 / 1000) %10 == 2) str += "3轮闷牌,";
        else if(parseInt(info.param1 / 1000) %10 == 3) str += "5轮闷牌,";
        return str;
    },
    kwxshare: function (info,bool) {
        var txt = "";
        switch (info.gametype){
            case 2:
                txt = "孝感玩法,";
                if (parseInt(info.param1/1000)%10 == 1) {txt += "数坎,";}
                if (parseInt(info.param2/10)%10 == 1) {txt += "对亮对番, ";}
                break;
            case 3:
                txt = "襄阳玩法,";
                if (parseInt(info.param1)%10 == 1) {
                    txt += "全频道,";
                    if (parseInt(info.param1/10)%10 == 1) {txt += "查大叫,";}
                }
                else txt += "半频道,";
                break;
            case 4:
                txt = "十堰玩法,";
                if (parseInt(info.param2/100)%10 == 1) {txt += "上楼,";}
                if (parseInt(info.param1)%10 == 1) {
                    txt += "全频道,";
                    if (parseInt(info.param1/10)%10 == 1) {txt += "查大叫,";}
                }
                else txt += "半频道,";
                break;
            case 5:
                txt = "随州玩法,";
                break;
            case 13:
                txt = "宜城玩法,";
                if (parseInt(info.param2)%10 == 1) {txt += "跑恰摸八,";}
                break;
            case 14:
                txt = "应城玩法,";
                break;
        }
        if (parseInt(info.param1/10000%10) == 0) txt += "不漂," ; else txt += "选漂," ;

        if (parseInt(info.param1/100000)%10 == 0) txt += "8番封顶," ; else txt += "16番封顶," ;

        if (parseInt(info.param1/100000000)%10 == 1) {
            txt += "卡五4番,";
        }

        if (parseInt(info.param1/10000000)%10 == 1) {
            txt += "碰胡/杠开4番, ";
        }

        if (parseInt(info.param1/100%10) == 0)  {
            txt += "不买马,";
        }
        else{
            if (parseInt(info.param1/1000000%10) == 0) txt += "亮倒自摸买马,"; else txt += "自摸买马,"
            if(parseInt(info.param1/100)%10 == 1) txt += "独马,"; else txt += "六马,";
        }

        return txt;
    },
    ddzshare:function(info,bool){
        var str = "经典玩法,";
        if(info.gametype == gameclass.gamelzddz) {
            str = "癞子玩法,"
            if (info.param1 % 10 == 0) str += "5炸封顶,";
            else str += "炸不封顶,";
        }else{
            if (info.param1 % 10 == 0) str += "3炸封顶,";
            else if (info.param1 % 10 == 1) str += "4炸封顶,";
            else if (info.param1 % 10 == 2) str += "5炸封顶,";
        }
        if(parseInt(info.param1 / 10) %10 == 0) str += "叫分,";
        else if (parseInt(info.param1 / 10) %10 == 1) str += "不叫分,";

        if(parseInt(info.param1 / 100) %10 == 0) str += "双王可拆,";
        else if (parseInt(info.param1 / 100) %10 == 1) str += "双王不可拆,";

        //if(parseInt(info.param1 / 1000) %10 == 0) str += "不可加倍,";
        if (parseInt(info.param1 / 1000) %10 == 1) str += "可选加倍,";

        return str;
    },
    ptjshare: function(info,bool){
        var shareText = "大天九,";
        if(info.param1%10 == 0) shareText += "大牌九,";
        else if(info.param1%10 == 1) shareText += "小牌九,";
        else if(info.param1%10 == 2) shareText += "加锅牌九,";

        if(parseInt(info.param1/100)%10 == 0) shareText += "两道杠,";
        else if(parseInt(info.param1/100)%10 == 1) shareText += "三道杠,";

        if(info.param2%10 == 1) shareText += "炸弹,";
        if(parseInt(info.param2/10)%10 == 1) shareText += "地九娘娘,";
        if(parseInt(info.param2/100)%10 == 1) shareText += "鬼子,";
        if(parseInt(info.param2/1000)%10 == 1) shareText += "天九王,";

        if(parseInt(info.param1/1000)%10 == 0) shareText += "每次选分,";
        else if(parseInt(info.param1 / 1000) %10 == 1) shareText += "固定选1分,";
        else if(parseInt(info.param1 / 1000) %10 == 2) shareText += "固定选2分,";
        else if(parseInt(info.param1 / 1000) %10 == 3) shareText += "固定选5分,";
        else if(parseInt(info.param1 / 1000) %10 == 4) shareText += "固定选8分,";
        else if(parseInt(info.param1 / 1000) %10 == 5) shareText += "固定选10分,";

        if(parseInt(info.param1/10)%10 == 0) shareText += "抢庄模式,";
        else if(parseInt(info.param1/10)%10 == 1) shareText += "轮庄模式,";
        else if(parseInt(info.param1/10)%10 == 2) shareText += "霸王庄,";

        return shareText;
    },
    ttzshare: function(info,bool){
        var str = "推筒子,";
        if(parseInt(info.param1 / 10) %10 == 0) str += "轮庄,";
        else if(parseInt(info.param1 / 10) %10 == 1) str += "连庄,";
        else if(parseInt(info.param1 / 10) %10 == 2) str += "霸王庄,";

        if(info.param1 %10 == 0) str += "每次选分,";
        else if(info.param1 %10 == 1) str += "固定选3分,";
        else if(info.param1 %10 == 2) str += "固定选5分,";
        else if(info.param1 %10 == 3) str += "固定选7分,";
        return str;
    },
    niuniushare: function(info,bool){
        var str = "自由抢庄,";
        if(parseInt(info.param1 / 10) %10 == 0) str += "扣一张,";
        else if(parseInt(info.param1 / 10) %10 == 1)  str += "全扣,";
        else if(parseInt(info.param1 / 10) %10 == 2) str += "扣两张,";

        if(info.param1 % 10 == 0) str += "轮庄模式,";
        else if(info.param1 % 10 == 1) str += "抢庄模式,";
        else if(info.param1 % 10 == 2) str += "连庄模式,";
        else if(info.param1 % 10 == 3) str += "赢家庄,";
        return str;
    },
    jxnnshare: function (info,bool) {
        var str = "";

        var _type = info.param1 % 10;

        if(_type == 0) str = "看牌抢庄,";
        else if(_type == 1) str = "通比牛牛,";
        else if(_type == 2) str = "房主当庄,";
        else if(_type == 3) str = "轮流当庄,";

        str += info.param2+"人玩,";

        if(_type == 0) {
            if (parseInt(info.param1 / 10) %10 == 0) str += "扣一张,";
            else if (parseInt(info.param1 / 10) %10 == 1) str += "扣两张,";
        }
        else{
            if (parseInt(info.param1 / 10) %10 == 0) str += "1倍,";
            else if (parseInt(info.param1 / 10) %10 == 1) str += "3倍,";
            else if (parseInt(info.param1 / 10) %10 == 2) str += "5倍,";
            else if (parseInt(info.param1 / 10) %10 == 3) str += "自选加倍,";
        }
        if(parseInt(info.param1 / 100) %10 == 1) str += "有王,";
        else if(parseInt(info.param1 / 100) %10 == 0) str += "无王,";

        return str;
    },
    saoleishare: function (info,bool) {
        var str = "扫雷,";
        if(parseInt(info.param1 / 10) %10 == 0) str += "房主埋雷,";
        else if(parseInt(info.param1 / 10) %10 == 1)  str += "自由埋雷,";

        str += "地雷分值"+info.param2+","
        return str;
    },
    sdbshare: function (info,bool) {
        var str = "十点半,";
        if(parseInt(info.param1 / 100) %10 == 0) str += "房主庄,";
        else if(parseInt(info.param1 / 100) %10 == 1)  str += "赢家庄,";
        return str;
    },
});
