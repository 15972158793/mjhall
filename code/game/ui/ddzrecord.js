/**
 * Created by Administrator on 2017/3/10 0010.
 */


gameclass.ddzrecord = gameclass.baseui.extend({
    node:null,
    players:null,
    steps:null,
    roomid_text:null,
    time_text:null,
    curRecord_text:null,
    headNodes:null,
    stepIndex : 0,
    razzCard:0,
    pauseBtn:null,
    isPause:false,
    speed:1.5,
    ctor: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
    },

    show: function () {
        this.node = this.game.uimgr.createnode(res.ddzRecordjson,true);
        this.addChild(this.node);
        var _this = this;

        //var recorlist = ccui.helper.seekWidgetByName(this.node, "ListView_recordlist");
        _this.roomid_text = ccui.helper.seekWidgetByName(this.node, "roomnum");
        _this.roomid_text.setString("");
        _this.time_text = ccui.helper.seekWidgetByName(this.node, "time");
        _this.time_text.setString("");
        _this.curRecord_text = ccui.helper.seekWidgetByName(this.node, "curRecord");
        gameclass.createbtnpress(this.node, "btn_colse", function () {
            _this.unscheduleAllCallbacks();
            _this.game.uimgr.showui("gameclass.hallui");
            _this.game.uimgr.closeui("gameclass.ddzrecor");

        });
        gameclass.createbtnpress(this.node, "btn_pause", function (sender) {
            _this.isPause =  !_this.isPause;
            cc.log(_this.isPause);
            sender.loadTextureNormal(_this.isPause?res.btn_bofang:res.btn_zanting);//(!_this.isPause ? "暂停" : "播放" );
        });
        gameclass.createbtnpress(this.node, "btn_shangJu", function () {
            _this.playerNextRecord(-1);

        });
        gameclass.createbtnpress(this.node, "btn_houTui", function () {
            _this.playerNextRecord(0);
        });
        gameclass.createbtnpress(this.node, "btn_qianJin", function () {
            _this.unscheduleAllCallbacks();
            _this.speed = _this.speed < 1?1.5:0.8;
            _this.startReplay(_this.speed);

        });
        gameclass.createbtnpress(this.node, "btn_xiaJu", function () {
            _this.playerNextRecord(1);
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

        _this.headNodes = [];
        for(var i = 0;i<3;i++){
            var node =  ccui.helper.seekWidgetByName(this.node, "head"+i);
            _this.headNodes[i] = {
                root:node,
                headImg: ccui.helper.seekWidgetByName( node , "headbg"),
                nameText: ccui.helper.seekWidgetByName( node , "playername"),
                jifenText: ccui.helper.seekWidgetByName( node , "jifenText"),
                //cardCountText: ccui.helper.seekWidgetByName( node , "alarmcount"),
                isDizhu: ccui.helper.seekWidgetByName( node , "isdizhu"),
                userCardNode: ccui.helper.seekWidgetByName(this.node, "notifynode"+i),
                hitoutCardNode: ccui.helper.seekWidgetByName(this.node, "hitoutCardView"+i),
            };

        }
        _this.headNodes[1].isDizhu.setPositionX(20);
    },
    share:function(url){
        gameclass.mod_platform.wxsharelink("斗地主结算","战绩",url);
    },
    setMod:function(mod){
        this.mod_record = mod;
        var _this = this;
        this.mod_record.getRecordBureau(function(datas){
            cc.log(datas);
            if(!datas)return;

            _this.players = datas.person;
            _this.players = _this.offsetPlayer(datas.person,_this.mod_record.curUserid);
            _this.razzCard = datas.razz;
            _this.steps = datas.step;
            _this.roomid_text.setString("房号:"+parseInt(datas.roomid/100));
            _this.time_text.setString(_this.getDate(datas.time).toString());
            var cur = datas.roomid+"";
            var spCur = parseInt(cur.substring(cur.length - 2,cur.length));//cur.split("");
            _this.curRecord_text.setString("第 "+spCur+" 局");
            _this.initPlayer();
            _this.startReplay(_this.speed);
        });

    },

    playerNextRecord:function(cur){
        //var nextRecordUid = this.mod_record.curBureauid+1;//type:this.curBureauid,
        this.stepIndex = 0;
        if(this.steps){
            this.steps.length = 0;
        }
        this.unscheduleAllCallbacks();
        for(var i = 0;i<3;i++){
            if( i == 0){
                this.headNodes[0].userCardNode.setPositionX(340);
            }else if(i == 1){
                this.headNodes[1].userCardNode.setPositionY(160);
            }else if( i == 2){
                this.headNodes[2].userCardNode.setPositionY(480);
            }
            this.headNodes[i].userCardNode.removeAllChildren();
            this.headNodes[i].hitoutCardNode.removeAllChildren();
        }
        this.mod_record.setCurBureauid(this.mod_record.curBureauid+cur);
        this.setMod(this.mod_record);
    },
    getDate:function(date){
        var d = new Date(date * 1000);    //根据时间戳生成的时间对象
        var date = (d.getFullYear()) + "-" +
            (d.getMonth() + 1) + "-" +
            (d.getDate()) + " " +
            (d.getHours()) + ":" +
            (d.getMinutes()) + ":" +
            (d.getSeconds());
        return date;
    },
    offsetPlayer:function(arr,uid){
        var player = [];
        var curIndex = 0;
        for(var x = 0;x< arr.length;x++){
            if(arr[x].uid == uid){
                curIndex = x;
                break;
            }
        }
        for (var x= 0;x< arr.length;x++ ){
            player[(3 + x - curIndex) %3 ] = arr[x];
        }

        return player;
    },


    initPlayer:function(){
        var _this = this;
        for(var i = 0;i<3;i++){
            var player = this.players[i];
            gameclass.mod_base.showtximg(this.headNodes[i].headImg,player.head,0,0,"im_headbg2");
            this.headNodes[i].nameText.setString(player.name);
            this.headNodes[i].jifenText.setString(player.score);
            //this.headNodes[i].cardCountText.setString(player.card.length);
            this.headNodes[i].isDizhu.setTexture(player.card.length > 17? res.btn_dizhu:res.btn_nongmin);
            player.card =  this.transCardtoNum(player.card);
            var razzArr = this.sortWildCard(player.card);
            var cardSprArr = this.initPlayerCard(razzArr ,i);
            var spsize = cardSprArr[0].getContentSize();
            _this.headNodes[i].userCardNode.setContentSize(cardSprArr.length * 25 + spsize.width , spsize.height);
            cc.each(cardSprArr , function(o){
                _this.headNodes[i].userCardNode.addChild(o);
            });
        }
    },
    //找到癞子拿出来 和原来的数组组成新的数组
    sortWildCard : function(_cardArr){
        var wildIndex = 0;
        var cardArr = [];
        for(var i = 0;i<_cardArr.length;i++){
            if(parseInt(_cardArr[i].id / 10) == this.razzCard){
                _cardArr[i].wild = true;
                cardArr[cardArr.length] = _cardArr[i];
                _cardArr[i] = null;
                //_cardArr.splice(i,1);
            }else{
                _cardArr[i].wild = false;
            }
        }
        var cardConcat = cardArr.concat(_cardArr);
        var newArr = [];
        for(var i = 0;i< cardConcat.length;i++){
            if(cardConcat[i]){
                newArr[wildIndex] = cardConcat[i];
                wildIndex++;
            }
        }
        cc.log(newArr);
        return newArr;
    },
    startReplay:function(delay){
        var _this = this;
        this.schedule(function(){

            if(_this.isPause){return}

            _this.updateData(_this.steps[_this.stepIndex]);
            _this.stepIndex ++;
            if(_this.stepIndex >= _this.steps.length || _this.stepIndex <= 0){
                _this.unscheduleAllCallbacks();
            }
        }, delay);
    },

    initPlayerCard:function(_cards,index){
        var aarr = [];
        for (var k = 0; k < _cards.length; k++) {
            var tmpCardData = _cards[k];
            var sp = this.createCardUI(tmpCardData.card , tmpCardData.type);
            switch (index) {
                case 0:
                    sp.setPosition(25 * k, 0);
                    break;
                case 1:
                    sp.setRotation(-90);
                    sp.setPosition(0, 20 * k);
                    break;
                case 2:
                    sp.setRotation(90);
                    sp.setPosition(0, -20 * k);
                    break;
            }
            sp.setScale(0.8);
            sp.setTag(tmpCardData.id);
            if(tmpCardData.wild){
                var wildtag = new cc.Sprite(res.rogue);
                wildtag.setPosition(20 ,65);
                wildtag.setScale(0.8);
                sp.addChild(wildtag);
            }
            aarr.push(sp);
            //this.headNodes[index].userCardNode.addChild(sp);
        }
        return aarr;

    },
    removeHandcard:function(_cards,index){
        var _this = this;
        cc.each(_cards,function(o,i){
            _this.headNodes[index].userCardNode.removeChildByTag(o);
        });

        var cards = this.headNodes[index].userCardNode.getChildren();
        var HandCardcount = this.headNodes[index].userCardNode.getChildrenCount();
        cc.each(cards,function(sp,k){
            switch (index) {
                case 0:
                    sp.setPosition( 25 * k, 0);
                    break;
                case 1:
                    sp.setPosition(0, 20 * k);
                    sp.setRotation(-90);
                    break;
                case 2:
                    sp.setRotation(90);
                    sp.setPosition(0, -k *20);
                    break;
            }

        });
        switch (index) {
            case 0:
                this.headNodes[index].userCardNode.setPositionX(this.headNodes[index].userCardNode.getPositionX()+_cards.length * 25 / 2);
                break;
            case 1:
                this.headNodes[index].userCardNode.setPositionY(this.headNodes[index].userCardNode.getPositionY()+_cards.length * 20 / 2);
                break;
            case 2:
                this.headNodes[index].userCardNode.setPositionY(this.headNodes[index].userCardNode.getPositionY()-_cards.length * 20 / 2);
                break;
        }

    },
    initPlayerAbscard:function(_cards,index){
        var aarr = [];
        for (var k = 0; k < _cards.length; k++) {
            var tmpCardData = _cards[k];
            var sp = this.createVirtualCardUI(tmpCardData.card , tmpCardData.type);
            switch (index) {
                case 0:
                    sp.setPosition(-_cards.length * 20 / 2 + k * 20, 0);
                    break;
                case 1:
                    sp.setRotation(0);
                    sp.setPosition( -_cards.length * 20 + k * 20 ,0);
                    break;
                case 2:
                    sp.setRotation(0);
                    sp.setPosition(20 * k, 0);
                    break;
            }
            sp.setScale(0.7);
            sp.setTag(tmpCardData.id);
            aarr.push(sp);
            //this.headNodes[index].userCardNode.addChild(sp);
        }
        return aarr;

    },
    createVirtualCardUI:function (num,type) {

        if(type == "e"){
            var spr = this.createCardUI(num,"b");
            var wildtag = new cc.Sprite(res.rogue);
            wildtag.setPosition(20 ,65);
            wildtag.setScale(0.8);
            spr.addChild(wildtag);
            return spr;
        }else{
            return this.createCardUI(num,type);
        }

    },
    createCardUI : function (num,type) {

        var point = num;
        if(point > 13 && point < 16){
            point -= 13;
        }
        var spr =  cc.Sprite.create();
        if (point == 100) {
            //spr.loadTextureNormal("card_joker_gray.png",ccui.Widget.PLIST_TEXTURE);
            spr.initWithSpriteFrameName("card_joker_gray.png");
        }else if(point == 200){
            //spr.loadTextureNormal("card_joker.png",ccui.Widget.PLIST_TEXTURE);
            spr.initWithSpriteFrameName("card_joker.png");
        }else{
            //spr.loadTextureNormal("card_" + point +  type + ".png" ,ccui.Widget.PLIST_TEXTURE );
            spr.initWithSpriteFrameName("card_" + point +  type + ".png");
        }
        spr.setAnchorPoint(cc.p(0.5,0.5));
        return spr;

    },
    transCardtoNum:function ( _cards ) {
            var abcd = ["a","d","b","c","e"];
            var arr = [];

            for(var x =0;x< _cards.length ; x++){
                var point = Math.floor(_cards[x]/10);
                var type = _cards[x] % 10;
                if(point < 3){
                    point+=13;
                }

                type = abcd[type -1];
                arr.push({
                    'card':point,
                    'type':type,
                    'id':_cards[x],
                });
            }
        arr.sort(function(a,b){
            //cc.log(a,b);
            return a.card > b.card ? -1 : 1;
        });
        return arr;
    },

    updateData : function(steps){
        cc.log(steps);
        if(!steps){
            return;
        }
        var _this = this;
        var playerIndex = -1;
        for(var i =0;i<this.players.length;i++){
            if(steps.uid == this.players[i].uid){
                playerIndex = i;
                break;
            }
        }

        _this.headNodes[playerIndex].hitoutCardNode.removeAllChildren();

        var cardsp  =  this.transCardtoNum(steps.abscard);

        var cardSprArr = this.initPlayerAbscard(cardsp ,playerIndex);

        if(cardSprArr.length < 1){
            _this.headNodes[playerIndex].hitoutCardNode.runAction(
                cc.sequence(cc.delayTime(0.2),cc.callFunc(function(){
                    var nobigger = new cc.Sprite('res/niuniuRes/btn_no_bigger.png');
                    var x = playerIndex == 1 ? -20:0;
                    nobigger.setPosition(x,0);
                    _this.headNodes[playerIndex].hitoutCardNode.addChild(nobigger);
                }))

            );
        }

        _this.removeHandcard(steps.card,playerIndex);
        cc.each(cardSprArr , function(o){

            _this.headNodes[playerIndex].hitoutCardNode.addChild(o);
        });
        cc.log(steps.card);

    },

});