/**
 * Created by Administrator on 2017/3/23 0023.
 */
gameclass.niuniurecord = gameclass.baseui.extend({
    node: null,
    players: null,
    steps: null,
    roomid_text: null,
    time_text: null,
    headNodes: null,
    stepIndex: 0,
    razzCard: 0,
    pauseBtn: null,
    isPause: false,
    curRoomid:0,
    curIndex:1,
    notifynode:[],
    userData:null,
    timer:null,
    isPause:null,
    ctor: function () {
        this._super();
        this.isPause=false;
        this.scheduleUpdate();
        cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
    },

    show: function () {
        this.node = this.game.uimgr.createnode(res.nnRecordjson,true);
        this.addChild(this.node);
        var _this = this;
        gameclass.createbtnpress(this.node, "btn_colse", function () {
            _this.unscheduleAllCallbacks();
            _this.game.uimgr.showui("gameclass.hallui");
            _this.game.uimgr.closeui("gameclass.niuniurecord");
        });
        gameclass.createbtnpress(this.node, "btn_pause", function (sender) {
            _this.isPause =  !_this.isPause;
            //cc.log(_this.isPause);
            sender.loadTextureNormal(_this.isPause?res.btn_zanting:res.btn_bofang);//(!_this.isPause ? "暂停" : "播放" );
        });
        gameclass.createbtnpress(this.node, "btn_houTui", function () {
            _this.timer=_this.timer-1;
            if(_this.timer<0)_this.timer=0;
        });
        gameclass.createbtnpress(this.node, "btn_qianJin", function () {
            _this.timer=_this.timer+1;
        });
        gameclass.createbtnpress(this.node, "btn_xiaJu", function () {
            _this.curRoomid = _this.curRoomid+1;
            var len = 0;
            if(_this.userData.curGameid && _this.userData.curGameid == 7){
                len=_this.userData[parseInt(_this.curRoomid/100)].children.length;
            }
            else len = _this.userData.length;
            if(_this.curRoomid%100 > len)  _this.curRoomid = parseInt(_this.curRoomid/100)*100 + 1;
            _this.showPlayerNext(_this.curRoomid);
        });
        gameclass.createbtnpress(this.node, "btn_shangJu", function () {
            //cc.log(_this.curRoomid);
            _this.curRoomid = _this.curRoomid-1;
            var len = 0;
            if(_this.userData.curGameid && _this.userData.curGameid == 7) {
                len=_this.userData[parseInt(_this.curRoomid/100)].children.length;
            }
            else len = _this.userData.length;
            if(_this.curRoomid%100 < 1)  _this.curRoomid = parseInt(_this.curRoomid/100)*100 + len;
            _this.showPlayerNext(_this.curRoomid);
        });
        gameclass.createbtnpress(this.node, "btn_share", function () {
            gameclass.mod_platform.savescreen(function(url){
                if(window.wx)
                {
                    //alert(url);
                    url = JSON.parse(url);

                    if(url.error == 0){
                        _this.share(url.url);
                    }
                }
            });
        });
    },
    showPlayerNext:function(curRoomid){
        if(!this.userData){
            return;
        }
        if(curRoomid < 10000000){
            this.showToast("数据错误!");
            return;
        }
        this.curIndex=curRoomid%100;

        this.showRecord_nn(curRoomid,this.userData);
    },

    showRecord_nn:function(curRoomid,data,curTime){

        if(!data){
            this.game.uimgr.showui("gameclass.hallui");
            this.game.uimgr.closeui("gameclass.niuniurecord");
            return;
        }
        //if(data&&(!data[parseInt(curRoomid/100)]||!data[parseInt(curRoomid/100)].children[this.curIndex-1])){
        //    this.showToast("未找到战绩!");
        //    return;
        //}
        this.timer=0;
        if(curRoomid < 10000000){
            this.showToast("数据错误!");
            return;
        }
        this.curRoomid = curRoomid;
        this.curTime = curTime?curTime:this.curTime;
        if(this.userData == null){
            this.userData = data;
        }
        ccui.helper.seekWidgetByName(this.node, "roomnum").setString("房间号:"+parseInt(curRoomid/100));
        ccui.helper.seekWidgetByName(this.node, "roomnum_0").setString(this.getDate(this.curTime));
        var cur = curRoomid+"";
        this.curIndex = parseInt(cur.substring(cur.length - 2,cur.length));//spCur[spCur.length-1];
        ccui.helper.seekWidgetByName(this.node, "curround").setString("第 "+this.curIndex+" 局");

        this.showPlayer(data,this.curIndex);
    },
    showToast:function(_text){
        if(this.node.getChildByTag(123456)){
            return;
        }
        var _this = this;
        _this.node.removeChildByTag(123456);
        var node = new cc.Sprite(res.img_input);
        node.setPosition(this.node.getContentSize().width / 2,100);
        node.setOpacity(160);
        node.setTag(123456);
        var text = new cc.LabelTTF(_text, "Arial", 25);
        text.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
        node.addChild(text);
        _this.node.addChild(node);
        _this.scheduleOnce(function(){
            _this.node.removeChildByTag(123456);
        }, 3);

    },
    showPlayer:function(data,index){
        //cc.log(data,index,data.curGameid);
        if(data.curGameid == 7){
            this.showZJHPlayer(data,index);
            return;
        }
        if(!data){
            return;
        }
        for (var i = 0;i < data.length; i++){
            if(data[i].roomid%100 == index) {
                for(var j = 0;j<data[i].info.length;j++) {
                    var head = ccui.helper.seekWidgetByName(this.node, "head" + j);
                    head.setVisible(true);
                    ccui.helper.seekWidgetByName(head, "zhuang" + j).setVisible(data[i].info[j].dealer);
                    ccui.helper.seekWidgetByName(this.node, "notifynode" + j).removeAllChildren(true);
                    for (var k = 0; k < data[i].info[j].card.length; k++) {
                        var cardSpr = this.cratecard(data[i].info[j].card[k]);
                        cardSpr.setPosition(k * 30 - 50, 0);
                        this.notifynode[j] = ccui.helper.seekWidgetByName(this.node, "notifynode" + j);
                        this.notifynode[j].addChild(cardSpr);
                    }
                    if( data.curGameid == 7 ) {
                        ccui.helper.seekWidgetByName(head, "stateText").setVisible(false);
                        ccui.helper.seekWidgetByName(head, "zjhTotalBet").setVisible(false);
                    }
                    ccui.helper.seekWidgetByName(head, "bei" + j).setString("倍数*" + data[i].info[j].bets);
                    ccui.helper.seekWidgetByName(head, "playerid" + j).setString(data[i].info[j].uid);
                    ccui.helper.seekWidgetByName(head, "playerscore" + j).setString(data[i].info[j].score);
                    ccui.helper.seekWidgetByName(head, "playername" + j).setString(data[i].info[j].name?data[i].info[j].name:"err");
                    gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(head, "icon" + j), data[i].info[j].head, 0, 0, "im_headbg2");
                }
            }
        }
    },
    showZJHPlayer:function(data,index){
        var dataArr=data[parseInt(this.curRoomid/100)+""];
        for (var i = 0;i < dataArr.children.length; i++){
            if(dataArr.children[i].roomid%100 == index) {
                for(var j = 0;j<dataArr.children[i].person.length;j++) {
                    var head = ccui.helper.seekWidgetByName(this.node, "head" + j);
                    head.setVisible(true);
                    ccui.helper.seekWidgetByName(head, "zhuang" + j).setVisible(dataArr.children[i].person[j].dealer);
                    for (var k = 0; k < dataArr.children[i].person[j].card.length; k++) {
                        var cardSpr = this.cratecard(dataArr.children[i].person[j].card[k]);
                        cardSpr.setPosition(k * 30 - 50, 0);
                        this.notifynode[j] = ccui.helper.seekWidgetByName(this.node, "notifynode" + j);
                        this.notifynode[j].addChild(cardSpr);
                    }

                    ccui.helper.seekWidgetByName(head, "zjhTotalBet").setVisible(true);
                    ccui.helper.seekWidgetByName(head, "bei"+j).setVisible(false);
                    ccui.helper.seekWidgetByName(head, "zjhTotalBet").setString("下注总分：1");
                    ccui.helper.seekWidgetByName(head, "stateText").setVisible(false);
                    ccui.helper.seekWidgetByName(head, "playerid" + j).setString(dataArr.children[i].person[j].uid);
                    ccui.helper.seekWidgetByName(head, "playerscore" + j).setString(dataArr.children[i].person[j].score);
                    ccui.helper.seekWidgetByName(head, "playername" + j).setString(dataArr.children[i].person[j].name?dataArr.children[i].person[j].name:"err");
                    gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(head, "icon" + j), dataArr.children[i].person[j].head, 0, 0, "im_headbg2");
                }
            }
        }
        this.timer=0;
    },
    cratecard : function(card) {
        var abcd = ["a","d","b","c"];

        var point = Math.floor(card/10);
        var type = card%10;
        var spr = cc.Sprite.create();
        if (card <= 0){
            spr.initWithSpriteFrameName("pukebeimian.png");
        }else{
            spr.initWithSpriteFrameName("card_" + point +  abcd[type - 1]+ ".png");
        }
        spr.setAnchorPoint(cc.p(0.5,0.5));


        return spr;
    },
    getDate:function(date){
        var d = new Date(date * 1000);    //根据时间戳生成的时间对象
        var hour = d.getHours();
        if(hour < 10) hour = "0"+hour;
        var min = d.getMinutes();
        if(min < 10) min = "0"+min;
        var sec = d.getSeconds();
        if(sec < 10) sec = "0"+sec;
        var date = //(d.getFullYear()) + "-" +
            (d.getMonth() + 1) + "-" +
            (d.getDate()) + " " +
            hour + ":" +
            min + ":" +
            sec;
        return date;
    },
    share:function(url){
        gameclass.mod_platform.wxsharelink("牛牛结算","战绩",url);
    },
    update:function (dt) {
        if(this.timer==null) return;
        if(!this.isPause){
            this.timer+=dt;
        }
        var num=parseInt(this.timer);
        if(!this.userData||!this.userData[parseInt(this.curRoomid/100)+""])return;
        var dataArr=this.userData[parseInt(this.curRoomid/100)+""];
        for (var i = 0;i < dataArr.children.length; i++){
            if(dataArr.children[i].roomid%100 == this.curIndex) {
                for(var j = 0;j<dataArr.children[i].person.length;j++){
                    var head = ccui.helper.seekWidgetByName(this.node, "head" + j);
                    ccui.helper.seekWidgetByName(head, "stateText").setVisible(false);
                    if(num>=dataArr.children[i].step.length-1){
                        num=dataArr.children[i].step.length-1;
                        this.timer=dataArr.children[i].step.length-1;
                    }
                    if(dataArr.children[i].step[num].type<1000){
                        ccui.helper.seekWidgetByName(head, "zjhTotalBet").setVisible(false);
                    }
                    if(dataArr.children[i].person[j].uid==dataArr.children[i].step[num].uid){
                        ccui.helper.seekWidgetByName(head, "stateText").setVisible(true);
                        ccui.helper.seekWidgetByName(head, "zjhTotalBet").setVisible(true);
                        if(dataArr.children[i].step[num].type<1000) {
                            ccui.helper.seekWidgetByName(head, "zjhTotalBet").setString("下注总分：" + dataArr.children[i].step[num].bets);
                        }
                        var _str="";
                        if(dataArr.children[i].step[num].type==-1){
                            _str="弃牌";
                        }else if(dataArr.children[i].step[num].type==0){
                            _str="看牌";
                        }else if(dataArr.children[i].step[num].type==1){
                            _str="跟注";
                        }else if(dataArr.children[i].step[num].type==2){
                            _str="加注";
                        }else{
                            if(dataArr.children[i].step[num].bets<=0){
                                _str="比牌输";
                            }else{
                                _str="比牌赢";
                            }
                        }
                        ccui.helper.seekWidgetByName(head, "stateText").setString(_str);
                    }
                }
            }
        }
    }
});