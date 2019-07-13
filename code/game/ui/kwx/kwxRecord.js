/**
 * Created by Leon on 2017/1/17.
 */

gameclass.kwxRecord = gameclass.baseui.extend({
    node: null,
    FirstCardPoint: null,
    stepUid:    null,
    spCardsArray:   null,
    handCardsArray:  null,
    stepCards: null,
    played_beginPosition:   null,
    deskCardsNum:   null,
    penggang:   null,
    lastOrderNum:   null,
    lastPlayedCard: null,
    bPause:  null,
    stepCurrentNum: null,
    liangArray: null,
    liangSpriteArray: null,
    record_maxnum:0,
    record_curid:0,
    speed:0,
    otherCards:null,
    cardwidth:0,
    ctor: function () {
        this._super();
        this.FirstCardPoint = [[260,30],[900,120],[150,500]];
        this.played_beginPosition = [[325,120],[820,180],[230,440]];
        this.stepUid = [];
        this.spCardsArray = [[],[],[]];
        this.handCardsArray = [[],[],[]];
        this.stepCards = [];
        this.deskCardsNum = [[],[],[]];
        this.penggang = [[],[],[]];
        this.lastOrderNum = -1;
        this.bPause = false;
        this.stepCurrentNum = 0;
        this.liangArray = [[],[],[]];
        this.liangSpriteArray = [[],[],[]];
        this.otherCards = [[],[],[]];
        this.cardwidth = 29;
    },
    show: function () {
        var _this = this;
        this.speed = 1;
        this.removeAllChildren();
        this.node = this.game.uimgr.createnode( res.kwxRecordjson, true );
        this.node.setContentSize(1080,540);
        this.addChild( this.node );
        cc.spriteFrameCache.addSpriteFrames(res.mjcardsplist);
        // 播放
        var btn = ccui.helper.seekWidgetByName(this.node, "playbtn");
        btn.addTouchEventListener(this.clickPlay.bind(this));

        // 后退 (重新开始当前局)
        var btn_houTui = ccui.helper.seekWidgetByName(this.node, "btn_houTui");
        btn_houTui.addTouchEventListener(this.clickHt.bind(this));

        // 前进
        var btn_qianJin = ccui.helper.seekWidgetByName(this.node, "btn_qianJin");
        btn_qianJin.addTouchEventListener(this.clickQj.bind(this));

        // 上一局
        var btn_shangJu = ccui.helper.seekWidgetByName(this.node, "btn_shangJu");
        btn_shangJu.setEnabled(true);
        btn_shangJu.addTouchEventListener(this.clickSj.bind(this));

        // 下一局
        var btn_xiaJu = ccui.helper.seekWidgetByName(this.node, "btn_xiaJu");
        btn_xiaJu.setEnabled(true);
        btn_xiaJu.addTouchEventListener(this.clickXj.bind(this));

        //关闭战绩
        btn = ccui.helper.seekWidgetByName(this.node, "close");
        btn.addTouchEventListener(this.clickClose.bind(this));

        for(var dN=0; dN<3; dN++)
            this.deskCardsNum[dN] = 0;
    },
    setmod: function (mod,curBureauid,roomMax) {
        //cc.log(record_info);
        this.mod_record = mod;
        this.record_curid = curBureauid;
        cc.log(this.record_curid);
        this.record_maxnum = roomMax;
        this.showdata(curBureauid);
    }
});

gameclass.kwxRecord.prototype.showdata = function (curBureauid){

    ccui.helper.seekWidgetByName(this.node, "record_id").setString("战绩回放码：" + curBureauid.toString()
        + this.game.modmgr.mod_login.logindata.uid.toString());
    var _junumstr = curBureauid.toString().slice(-2);
    ccui.helper.seekWidgetByName(this.node, "numJu").setString("第"+_junumstr+"局");

    var _this = this;
    this.mod_record.setCurBureauid(curBureauid);
    this.mod_record.setCurUserid(this.game.modmgr.mod_login.logindata.uid);
    this.mod_record.getRecordBureau(function(data){
        //cc.log(data);
        var datas = JSON.parse(data.info);
        for(var i=0; i< datas.person.length; i++){
            _this.handCardsArray[i] = datas.person[i].card;
            _this.handCardsArray[i].sort(function(a,b){return a-b});

            _this.stepUid[i] = datas.person[i].uid;
            _this.penggang[i] = [];
            _this.liangArray[i] = [];
            _this.liangSpriteArray[i] = [];

            var userhead = ccui.helper.seekWidgetByName(_this.node, "userhead" + i);
            var username = datas.person[i].name;
            var userscore = datas.person[i].score;
            if(username == "")
                username = "游客";

            userhead.getChildByName("username").setString(username);
            userhead.getChildByName("userscore").setString(userscore);
            for(var j=0; j<=13; j++){
                //var spCard = cc.Sprite.create();
                //_this.spCardsArray[i][j] = spCard;
                //_this.node.addChild(_this.spCardsArray[i][j]);
                var spCard;
                if(j==13){
                    spCard = _this.createZJCards(i,1,false);
                }else{
                    //spCard.setTexture(_this.CardnumToRes(_this.handCardsArray[i][j], i));
                    spCard = _this.createZJCards(i,_this.handCardsArray[i][j],false);
                }
                //spCard.setAnchorPoint(0,0);

                if(i==0){
                    spCard.setPosition(35 * j + _this.FirstCardPoint[i][0], _this.FirstCardPoint[i][1]);
                }

                else if(i==1){
                    spCard.setLocalZOrder(20-j);
                    spCard.setPosition(_this.FirstCardPoint[i][0], _this.cardwidth * j + _this.FirstCardPoint[i][1]);
                }

                else {
                    spCard.setLocalZOrder(j);
                    spCard.setPosition(_this.FirstCardPoint[i][0], _this.FirstCardPoint[i][1] - _this.cardwidth * j);
                }
                _this.spCardsArray[i][j] = spCard;
                _this.node.addChild(_this.spCardsArray[i][j]);
            }
        }
        _this.stepCards = datas.step;
        _this.ReplayStep(0);
    });
};

/*暂停、开始*/
gameclass.kwxRecord.prototype.clickPlay = function (sender, type) {

    switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            sender.setBright(this.bPause);
            this.bPause = !this.bPause;

            if(!this.bPause){
                this.ReplayStep(this.stepCurrentNum);
            }
            break;
    }
}

/*前进*/
gameclass.kwxRecord.prototype.clickQj = function (sender, type) {

    switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            this.speed=0.5;
            break;
    }
}

/*后退== 重新开始*/
gameclass.kwxRecord.prototype.clickHt = function (sender, type) {

    switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            this.node.stopAllActions();
             this.clearAllCards();
             this.showdata(this.record_curid);
            //modify by lish-2017-10-25
            //this.clearAllCards();
            //this.setmod(this.alldata[this.curIndex]);
            //modify end
            break;
    }
}

/*下一局*/
gameclass.kwxRecord.prototype.clickXj = function (sender, type) {

    switch (type) {
        case ccui.Widget.TOUCH_ENDED:
             //sender.setEnabled(false);
            // var uid = this.game.modmgr.mod_login.logindata.uid;
            this.record_curid += 1;
            //cc.log(this.record_curid);
             var maxJu = this.record_maxnum;
             var _junum = parseInt(this.record_curid.toString().slice(-2));

              if(maxJu < _junum){
                 this.record_curid = this.record_curid-maxJu;
              }
             //cc.log(this.handCardsArray);
             this.clearAllCards();
            //cc.log(this.record_curid);
            this.showdata(this.record_curid);

            //modify by lish-2017-10-25
            //this.curIndex = this.curIndex+1;
            //if( this.curIndex >= this.alldata.length) this.curIndex = 0;
            //if(this.alldata[this.curIndex]) {
            //    this.clearAllCards();
            //    this.setmod(this.alldata[this.curIndex]);
            //}
            //modify end
            break;
    }
}

/*上一局*/
gameclass.kwxRecord.prototype.clickSj = function (sender, type) {
    switch (type) {
        case ccui.Widget.TOUCH_ENDED:
             //sender.setEnabled(false);
             //var uid = _this.game.modmgr.mod_login.logindata.uid;
            this.record_curid -= 1;
             var maxJu = this.record_maxnum;
             var _junum = parseInt(this.record_curid.toString().slice(-2));
             if(_junum < 1){
                 this.record_curid = this.record_curid+maxJu;
             }
             //cc.log(this.handCardsArray);
             this.clearAllCards();
             this.showdata(this.record_curid);

            //modify by lish-2017-10-25
            //this.curIndex = this.curIndex-1;
            //if(this.curIndex < 0) this.curIndex = this.alldata.length-1;
            //if(this.alldata[this.curIndex]) {
            //    this.clearAllCards();
            //    //cc.log(this.alldata[this.curIndex],this.curIndex);
            //    this.setmod(this.alldata[this.curIndex]);
            //}
            //modify end

            break;
    }
};
gameclass.kwxRecord.prototype.clickClose = function (sender, type) {

    switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            this.bPause = true;
            this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
                this.game.uimgr.showui("gameclass.hallui");
                this.game.uimgr.closeui("gameclass.kwxRecord");
                // this.game.uimgr.showui("gameclass.replayInfoUi");
            })));

            break;
    }
};


// 打牌流程
gameclass.kwxRecord.prototype.ReplayStep = function(stepNum) {

    if (stepNum >= this.stepCards.length)
        return;

    if (this.bPause)
       return;

    this.stepCurrentNum = stepNum;

    var orderNum = this.UidToOrder(this.stepCards[stepNum].uid);
    //cc.log(orderNum);
    switch (this.stepCards[stepNum].type){
        // 起牌
        case 0:
            //this.spCardsArray[orderNum][13].setTexture(this.CardnumToRes(this.stepCards[stepNum].card, orderNum));
            this.createZJCards(orderNum,this.stepCards[stepNum].card,this.spCardsArray[orderNum][13]);
            this.handCardsArray[orderNum].push(this.stepCards[stepNum].card[0]);
            this.spCardsArray[orderNum][13].setVisible(true);
            break;

        // 出牌
        case 1:
            // 如果碰了牌，最后一张不是13
            this.spCardsArray[orderNum][13].setVisible(false);

            //var sprPlayedCard = cc.Sprite.create();
            //sprPlayedCard.setTexture(this.CardnumToRes(this.stepCards[stepNum].card, orderNum));
            //sprPlayedCard.setAnchorPoint(0,0);
            var sprPlayedCard = this.createZJCards(orderNum,this.stepCards[stepNum].card,false);
            this.otherCards[orderNum].push(sprPlayedCard);
            if(orderNum == 0){
                //sprPlayedCard.setScale(0.8);
                sprPlayedCard.setPosition(this.played_beginPosition[0][0] + sprPlayedCard.getContentSize().width * (this.deskCardsNum[0] % 10),
                    this.played_beginPosition[0][1] + Math.floor(this.deskCardsNum[0] / 10) * sprPlayedCard.getContentSize().height);
            }
            else if(orderNum == 1){
                sprPlayedCard.setPosition(this.played_beginPosition[1][0] - Math.floor(this.deskCardsNum[1] / 10) * sprPlayedCard.getContentSize().width,
                    this.played_beginPosition[1][1] + this.cardwidth * (this.deskCardsNum[1] % 10));
                sprPlayedCard.setLocalZOrder(20 - this.deskCardsNum[1] % 10);
            }
            else if(orderNum == 2){
                sprPlayedCard.setPosition(this.played_beginPosition[2][0] + Math.floor(this.deskCardsNum[2] / 10) * sprPlayedCard.getContentSize().width,
                    this.played_beginPosition[2][1] - this.cardwidth * (this.deskCardsNum[2] % 10));
            }

            this.node.addChild(sprPlayedCard);
            this.deskCardsNum[orderNum]++;
            this.lastPlayedCard = sprPlayedCard;
            this.ReSortHandCards(orderNum, this.stepCards[stepNum].card);
            this.lastOrderNum = orderNum;

            break;

        // 碰牌
        case 2:
            this.lastPlayedCard.setVisible(false);
            this.deskCardsNum[this.lastOrderNum]--;

            var penggangNode = {
                "isPeng": true,
                "card": this.stepCards[stepNum].card[0],
            };
            this.penggang[orderNum].push(penggangNode);

            // 手牌中将碰杠的牌置0
            var cardOrder = this.CardnumInArray(this.handCardsArray[orderNum], this.stepCards[stepNum].card[0]);

            this.handCardsArray[orderNum][cardOrder] = 0;
            this.handCardsArray[orderNum][cardOrder+1] = 0;
            this.handCardsArray[orderNum].push(0);

            var nodeOperate =  ccui.helper.seekWidgetByName(this.node, "playednode" + orderNum);
            var sprOperate = new cc.Sprite.create(res.record_peng);
            nodeOperate.addChild(sprOperate);
            sprOperate.runAction(cc.scaleTo(0.7, 1.25));
            sprOperate.runAction(cc.fadeOut(0.7));

            // 3张碰的牌
            for (var j=0; j<3; j++){
                //var spPengCard = cc.Sprite.create();
                //spPengCard.setTexture(this.CardnumToRes(this.stepCards[stepNum].card, orderNum));
                //spPengCard.setAnchorPoint(0,0);
                var spPengCard = this.createZJCards(orderNum,this.stepCards[stepNum].card,false);

                this.otherCards[orderNum].push(spPengCard);
                if(orderNum == 0) {
                    //spPengCard.setScale(0.8);
                    spPengCard.setPosition(spPengCard.getContentSize().width * (j + (this.penggang[0].length -1) * 3.5)
                        + this.FirstCardPoint[0][0], this.FirstCardPoint[0][1]);
                }
                else if(orderNum == 1){
                    spPengCard.setPosition(this.FirstCardPoint[1][0],
                        this.FirstCardPoint[1][1] + this.cardwidth * (j + (this.penggang[1].length - 1) * 3.5));
                    spPengCard.setLocalZOrder(20 - (this.penggang[1].length * 3 + j));
                }
                else {
                    spPengCard.setPosition(this.FirstCardPoint[2][0],
                        this.FirstCardPoint[2][1] - this.cardwidth * (j + (this.penggang[2].length - 1) * 3.5));
                    spPengCard.setLocalZOrder(this.penggang[2].length * 3 + j);
                }
                this.node.addChild(spPengCard);
            }

            this.spCardsArray[orderNum][13].setVisible(true);
            this.ReSortHandCards(orderNum);

            break;

        // 亮牌
        case 3:
            for(var iCard=0; iCard<this.stepCards[stepNum].card.length; iCard++){
                this.liangArray[orderNum].push(this.stepCards[stepNum].card[iCard]);
            }

            // 亮牌置0
            var iCardl = 0;
            for (var k=0; k<this.handCardsArray[orderNum].length; k++) {
                if (this.handCardsArray[orderNum][k] == this.stepCards[stepNum].card[iCardl]) {
                    this.handCardsArray[orderNum][k] = 0;

                    if (iCardl != this.stepCards[stepNum].card.length - 1)
                        iCardl++;
                    else
                        break;
                }
            }

            var nodeOperate =  ccui.helper.seekWidgetByName(this.node, "playednode" + orderNum);
            var sprOperate = new cc.Sprite.create(res.record_liang);
            nodeOperate.addChild(sprOperate);
            nodeOperate.setLocalZOrder(100);
            sprOperate.runAction(cc.scaleTo(0.7, 1.25));
            sprOperate.runAction(cc.fadeOut(0.7));

            for(var j=0; j<this.liangArray[orderNum].length; j++){
                //this.liangSpriteArray[orderNum][j] = cc.Sprite.create();
                //this.liangSpriteArray[orderNum][j].setTexture(this.CardnumToRes(this.liangArray[orderNum][j], orderNum));
                //this.liangSpriteArray[orderNum][j].setAnchorPoint(cc.p(0,0));
                this.liangSpriteArray[orderNum][j] = this.createZJCards(orderNum,this.liangArray[orderNum][j],false);
                this.liangSpriteArray[orderNum][j].setColor(cc.color(170,150,60));

                switch (orderNum){
                    case 0:
                        //this.liangSpriteArray[orderNum][j].setScale(0.8);
                        this.liangSpriteArray[orderNum][j].setPosition(this.liangSpriteArray[orderNum][j].getContentSize().width *
                            (j + (this.penggang[0].length) * 3.5) + this.FirstCardPoint[0][0], this.FirstCardPoint[0][1]);
                        break;
                    case 1:
                        this.liangSpriteArray[orderNum][j].setPosition(this.FirstCardPoint[1][0],
                            this.FirstCardPoint[1][1] + this.cardwidth * (j + (this.penggang[1].length) * 3.5));
                        this.liangSpriteArray[orderNum][j].setLocalZOrder(20 - j);
                        break;
                    case 2:
                        this.liangSpriteArray[orderNum][j].setPosition(this.FirstCardPoint[2][0],
                            this.FirstCardPoint[2][1] - this.cardwidth * (j + (this.penggang[2].length) * 3.5));
                        this.liangSpriteArray[orderNum][j].setLocalZOrder(j);
                        break;
                }

                this.node.addChild(this.liangSpriteArray[orderNum][j]);
            }
            this.ReSortHandCards(orderNum);

            break;

        // 胡牌
        case 4:

            var nodeOperate =  ccui.helper.seekWidgetByName(this.node, "playednode" + orderNum);
            var sprOperate = new cc.Sprite.create(res.record_hu);
            nodeOperate.addChild(sprOperate);
            nodeOperate.setLocalZOrder(100);
            sprOperate.runAction(cc.scaleTo(0.7, 1.25));
            sprOperate.runAction(cc.fadeOut(0.7));

            break;

        // 暗杠
        case 5:
            var penggangNode = {
                "isPeng": false,
                "card": this.stepCards[stepNum].card[0],
            };
            this.penggang[orderNum].push(penggangNode);

            // 手牌中将碰杠的牌置0
            for(var iAg=0; iAg<4; iAg++){
                var cardOrder = this.CardnumInArray(this.handCardsArray[orderNum], this.stepCards[stepNum].card[0]);
                // 暗杠会多一张牌，把第14张牌去掉。
                if(iAg == 3){
                    this.handCardsArray[orderNum][cardOrder] = this.handCardsArray[orderNum][13];
                    this.handCardsArray[orderNum].pop();
                }
                else
                    this.handCardsArray[orderNum][cardOrder] = 0;
            }

            var nodeOperate =  ccui.helper.seekWidgetByName(this.node, "playednode" + orderNum);
            var sprOperate = new cc.Sprite.create(res.record_gang);
            nodeOperate.addChild(sprOperate);
            nodeOperate.setLocalZOrder(100);
            sprOperate.runAction(cc.scaleTo(0.7, 1.25));
            sprOperate.runAction(cc.fadeOut(0.7));

            for (var j=0; j<3; j++){
                //var spGangCard = cc.Sprite.create();
                var spGangCard = this.createZJCards(orderNum,0,false);
                switch (orderNum){
                    case 0:
                        //spGangCard.setTexture(res.M_bootom_up);//"e_mj_b_up.png"
                        //spGangCard.setScale(0.8);
                        spGangCard.setPosition(spGangCard.getContentSize().width * (j + (this.penggang[0].length -1) * 3.5)
                            + this.FirstCardPoint[0][0], this.FirstCardPoint[0][1]);
                        break;
                    case 1:
                        //spGangCard.setTexture(res.M_bootom_right);
                        spGangCard.setPosition(this.FirstCardPoint[1][0],
                            this.FirstCardPoint[1][1] + this.cardwidth * (j + (this.penggang[1].length - 1) * 3.5));
                        spGangCard.setLocalZOrder(20 - (this.penggang[1].length * 3 + j));
                        break;
                    case 2:
                        //spGangCard.setTexture(res.M_bootom_left);
                        spGangCard.setPosition(this.FirstCardPoint[2][0],
                            this.FirstCardPoint[2][1] - this.cardwidth * (j + (this.penggang[2].length - 1) * 3.5));
                        spGangCard.setLocalZOrder(this.penggang[2].length * 3 + j);
                        break;
                }
                spGangCard.setAnchorPoint(0,0);
                this.node.addChild(spGangCard);
                this.otherCards[orderNum].push(spGangCard);
                // 杠在上面加一张子显示
                if (j==1){
                    //var spCard = cc.Sprite.create();
                    //spCard.setTexture(this.CardnumToRes(this.stepCards[stepNum].card, orderNum));
                    //spCard.setAnchorPoint(0,0);
                    //if (orderNum == 0) spCard.setScale(0.8);
                    var spCard = this.createZJCards(orderNum,this.stepCards[stepNum].card,false);
                    spCard.setPosition(spGangCard.getPositionX(), spGangCard.getPositionY()+10);
                    spCard.setLocalZOrder(20);
                    this.node.addChild(spCard);
                    this.otherCards[orderNum].push(spCard);
                }
            }
            this.ReSortHandCards(orderNum);

            break;

        // 明杠
        case 6:
            this.lastPlayedCard.setVisible(false);
            this.deskCardsNum[this.lastOrderNum]--;

            var penggangNode = {
                "isPeng": false,
                "card": this.stepCards[stepNum].card[0],
            };
            this.penggang[orderNum].push(penggangNode);

            // 手牌中将杠的牌置0
            var cardOrder = this.CardnumInArray(this.handCardsArray[orderNum], this.stepCards[stepNum].card[0]);
            this.handCardsArray[orderNum][cardOrder] = 0;
            this.handCardsArray[orderNum][cardOrder+1] = 0;
            this.handCardsArray[orderNum][cardOrder+2] = 0;

            var nodeOperate =  ccui.helper.seekWidgetByName(this.node, "playednode" + orderNum);
            var sprOperate = new cc.Sprite.create(res.record_gang);
            nodeOperate.addChild(sprOperate);
            nodeOperate.setLocalZOrder(100);
            sprOperate.runAction(cc.scaleTo(0.7, 1.25));
            sprOperate.runAction(cc.fadeOut(0.7));

            // 4张明杠的牌
            for (var j=0; j<3; j++){
                //var spGangCard = cc.Sprite.create();
                //spGangCard.setTexture(this.CardnumToRes(this.stepCards[stepNum].card, orderNum));
                //spGangCard.setAnchorPoint(cc.p(0,0));
                var spGangCard = this.createZJCards(orderNum,this.stepCards[stepNum].card,false);

                if(orderNum == 0) {
                    //spGangCard.setScale(0.8);
                    spGangCard.setPosition(spGangCard.getContentSize().width * (j + (this.penggang[0].length -1) * 3.5)
                        + this.FirstCardPoint[0][0], this.FirstCardPoint[0][1]);
                }
                else if(orderNum == 1){
                    spGangCard.setPosition(this.FirstCardPoint[1][0],
                        this.FirstCardPoint[1][1] + this.cardwidth * (j + (this.penggang[1].length - 1) * 3.5));
                    spGangCard.setLocalZOrder(20 - (this.penggang[1].length * 3 + j));
                }
                else {
                    spGangCard.setPosition(this.FirstCardPoint[2][0],
                        this.FirstCardPoint[2][1] - this.cardwidth * (j + (this.penggang[2].length - 1) * 3.5));
                    spGangCard.setLocalZOrder(this.penggang[2].length * 3 + j);
                }
                this.node.addChild(spGangCard);
                this.otherCards[orderNum].push(spGangCard);
                if (j==1){
                    //var spCard = cc.Sprite.create();
                    //if(orderNum == 0)  spCard.setScale(0.8);
                    //spCard.setTexture(this.CardnumToRes(this.stepCards[stepNum].card, orderNum));
                    //spCard.setAnchorPoint(0,0);
                    var spCard = this.createZJCards(orderNum,this.stepCards[stepNum].card,false);
                    spCard.setPosition(spGangCard.getPositionX(), spGangCard.getPositionY()+10);
                    spCard.setLocalZOrder(20);
                    this.node.addChild(spCard);
                    this.otherCards[orderNum].push(spCard);
                }
            }

            this.ReSortHandCards(orderNum);
            break;

        case 7:
            // 起到擦杠的牌删掉
            this.handCardsArray[orderNum].pop();

            var nodeOperate =  ccui.helper.seekWidgetByName(this.node, "playednode" + orderNum);
            var sprOperate = new cc.Sprite.create(res.record_gang);
            nodeOperate.addChild(sprOperate);
            nodeOperate.setLocalZOrder(100);
            sprOperate.runAction(cc.scaleTo(0.7, 1.25));
            sprOperate.runAction(cc.fadeOut(0.7));

            for (var iPg = 0; iPg < this.penggang[orderNum].length; iPg++) {
                if (this.stepCards[stepNum].card == this.penggang[orderNum][iPg].card) {
                    this.spCardsArray[orderNum][13].setVisible(false);

                    // 把擦杠的牌显示到碰牌的上面。
                    //var spGangCard = cc.Sprite.create();
                    //spGangCard.setTexture(this.CardnumToRes(this.stepCards[stepNum].card, orderNum));
                    //spGangCard.setAnchorPoint(0, 0);
                    var spGangCard = this.createZJCards(orderNum,this.stepCards[stepNum].card,false);
                    this.node.addChild(spGangCard);
                    this.otherCards[orderNum].push(spGangCard);
                    // 置碰为杠
                    this.penggang[orderNum][iPg].isPeng = false;

                    switch (orderNum){
                        case 0:
                            spGangCard.setPosition(spGangCard.getContentSize().width * (1 + iPg * 3.5)
                                + this.FirstCardPoint[orderNum][0], this.FirstCardPoint[orderNum][1]);
                            break;
                        case 1:
                            spGangCard.setPosition(this.FirstCardPoint[orderNum][0], this.FirstCardPoint[1][1] + (15 + this.cardwidth * 3) * iPg + this.cardwidth + 10);
                            spGangCard.setLocalZOrder(20);

                            break;
                        case 2:
                            spGangCard.setPosition(this.FirstCardPoint[orderNum][0], this.FirstCardPoint[orderNum][1] - ((15 + this.cardwidth * 3) * iPg + this.cardwidth - 10));
                            spGangCard.setLocalZOrder(20);
                            break;
                    }
                }
            }
            break;
    }

    var _this = this;
    this.node.runAction(cc.sequence(cc.delayTime(_this.speed), cc.callFunc(function () {
        _this.stepCurrentNum += 1;
        _this.ReplayStep(_this.stepCurrentNum);
    })));

};

// 手牌重新排列
gameclass.kwxRecord.prototype.ReSortHandCards = function(orderNum, stepCard) {

    // 删掉打出去的牌。
    if(stepCard)
        this.handCardsArray[orderNum].splice(this.CardnumInArray(this.handCardsArray[orderNum], stepCard), 1);

    this.handCardsArray[orderNum].sort(function(a,b){return a-b});

    // 亮的牌可能也要重牌坐标
    for(var j=0; j<this.liangSpriteArray[orderNum].length; j++){
        switch (orderNum){
            case 0:
                this.liangSpriteArray[orderNum][j].setPosition(35 * (this.penggang[orderNum].length * 3.5 + j)
                    + this.FirstCardPoint[orderNum][0], this.FirstCardPoint[orderNum][1]);
                break;
            case 1:
                this.liangSpriteArray[orderNum][j].setPosition(this.FirstCardPoint[orderNum][0], this.cardwidth * j
                    + this.FirstCardPoint[orderNum][1] + (15 + this.cardwidth * 3) * this.penggang[orderNum].length);
                break;
            case 2:
                this.liangSpriteArray[orderNum][j].setPosition(this.FirstCardPoint[orderNum][0], this.FirstCardPoint[orderNum][1]
                    - this.cardwidth * j - (15 + this.cardwidth * 3) * this.penggang[orderNum].length);
                break;
        }
    }

    var iHand = 0;
    for(var i=0; i<14; i++){
        if(this.handCardsArray[orderNum][i]){
            //this.spCardsArray[orderNum][i].setTexture(this.CardnumToRes(this.handCardsArray[orderNum][i], orderNum));
            this.createZJCards(orderNum,this.handCardsArray[orderNum][i],this.spCardsArray[orderNum][i]);
            switch (orderNum){
                case 0:
                    this.spCardsArray[orderNum][i].setPosition(35 * (iHand + this.penggang[orderNum].length * 3.5 + this.liangArray[orderNum].length)
                        + this.FirstCardPoint[orderNum][0], this.FirstCardPoint[orderNum][1]);
                    break;
                case 1:
                    this.spCardsArray[orderNum][i].setPosition(this.FirstCardPoint[orderNum][0], this.cardwidth * (iHand + this.liangArray[orderNum].length)
                        + this.FirstCardPoint[orderNum][1] + (15 + this.cardwidth * 3) * this.penggang[orderNum].length);
                    break;
                case 2:
                    this.spCardsArray[orderNum][i].setPosition(this.FirstCardPoint[orderNum][0], this.FirstCardPoint[orderNum][1]
                        - this.cardwidth * (iHand + this.liangArray[orderNum].length) - (15 + this.cardwidth * 3) * this.penggang[orderNum].length);
                    break;
            }
            iHand++;
        }
        else
            this.spCardsArray[orderNum][i].setVisible(false);
    }

    // 如果是13张手牌情况下的排序，则把第14张牌也设一下坐标
    if(this.handCardsArray[orderNum].length == 13){
        switch (orderNum){
            case 0:
                this.spCardsArray[orderNum][13].setPosition(35 * (iHand + this.penggang[0].length* 3.5 + this.liangArray[orderNum].length)
                    + this.FirstCardPoint[orderNum][0], this.FirstCardPoint[orderNum][1]);
                break;
            case 1:
                this.spCardsArray[orderNum][13].setPosition(this.FirstCardPoint[orderNum][0], this.cardwidth * (iHand + this.liangArray[orderNum].length)
                    + this.FirstCardPoint[orderNum][1] + + (15 + this.cardwidth * 3) * this.penggang[orderNum].length);
                break;
            case 2:
                this.spCardsArray[orderNum][13].setPosition(this.FirstCardPoint[orderNum][0], this.FirstCardPoint[orderNum][1]
                    - this.cardwidth * (iHand + this.liangArray[orderNum].length) - (15 + this.cardwidth * 3) * this.penggang[orderNum].length);
                break;
        }
    }

}
//
// 查找是某张牌的序号
gameclass.kwxRecord.prototype.CardnumInArray = function(cardsArray, card) {
    //cc.log(cardsArray,card)
    for(var i=0; i<cardsArray.length; i++){
        if (card == cardsArray[i])
            return i;
    }
    return -1;
}

// 查找uid在数组中的序号
gameclass.kwxRecord.prototype.UidToOrder = function(uid) {
    for(var i=0; i<this.stepUid.length; i++){
        if (uid == this.stepUid[i])
            return i;
    }
};

// 通过号码，找到对应牌的资源
gameclass.kwxRecord.prototype.createZJCards = function(_chair,cardNum,isSprcard) {
    var sprcard = isSprcard; var chair = _chair;
    //cc.log(chair)
    var offsetx = 0; var offsety = 0;
    var bgcardpng = "";
    var strcardpng = "";
    if(chair == 0) {
        chair = 4;
        if(cardNum == 0)
            bgcardpng = "bg0_p2_oper_b.png";
        else
            bgcardpng = "bg0_p0_push_f.png";
    }else {
        if(chair == 1) chair = 3;
        else if(chair == 2) chair = 1;
        if(cardNum == 0)
            bgcardpng = "bg0_p1_oper_b.png";
        else
            bgcardpng = "bg0_p1_oper_f.png";
    }
    //if (chair == 1) strcardpng = "p3_";//命名 规则有问题
    //if (chair == 2) strcardpng = "p1_";
    strcardpng = "p"+chair+"_card_"+cardNum+".png";
    if(!sprcard){
        sprcard = new cc.Sprite();
        sprcard.initWithSpriteFrameName(bgcardpng);
        offsetx = sprcard.getContentSize().width*0.5;
        offsety = sprcard.getContentSize().height*0.5 + 6;
        var childsprite = new cc.Sprite();
        if (cardNum > 0) {
            childsprite.initWithSpriteFrameName(strcardpng);
        }

        childsprite.setPosition(cc.p(offsetx,offsety));
        childsprite.setTag(999);
        sprcard.addChild(childsprite);
    }else {
        sprcard.initWithSpriteFrameName(bgcardpng);
        sprcard.getChildByTag(999).setVisible(true);
        if(cardNum > 0)
            sprcard.getChildByTag(999).initWithSpriteFrameName(strcardpng);
        else
            sprcard.getChildByTag(999).setVisible(false);
    }
    return sprcard;
};
gameclass.kwxRecord.prototype.clearAllCards = function(cardArr)
{
    this.clearCards(this.spCardsArray);
    this.clearCards(this.liangSpriteArray);
    this.clearCards(this.otherCards);
    this.stepUid = [];
    this.spCardsArray = [[],[],[]];
    this.handCardsArray = [[],[],[]];
    this.stepCards = [];
    this.deskCardsNum = [[],[],[]];
    this.penggang = [[],[],[]];
    this.lastOrderNum = -1;
    this.bPause = false;
    this.stepCurrentNum = 0;
    this.liangArray = [[],[],[]];
    this.liangSpriteArray = [[],[],[]];
    this.otherCards = [[],[],[]];
};
//清空牌
gameclass.kwxRecord.prototype.clearCards = function(cardArr)
{
    for(var k = 0 ; k < cardArr.length; k++)
    {
        for(var i = 0 ; i < cardArr[k].length; i++)
        {
            if (cardArr[k][i])
            {
                cardArr[k][i].removeFromParent();
            }
        }
    }
};
