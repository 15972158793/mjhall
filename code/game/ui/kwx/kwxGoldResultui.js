/**
 * Created by yang on 2016/11/14.
 */
gameclass.kwxGoldResultui = gameclass.baseui.extend({
    sprite: null,
    node:null,
    mod_kwx:null,
    kwxtable:null,
    ctor: function () {
        this._super();
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.kwxGoldend,true);

        this.addChild(this.node);

        cc.spriteFrameCache.addSpriteFrames(res.mjcardsplist);
    },
    setkwxmod: function (_mod_kwx) {

        this.mod_kwx = _mod_kwx;
        var _this = this;

        gameclass.createbtnpress( this.node, "sendReady", function (sender, type) {
            _this.game.uimgr.closeui("gameclass.kwxGoldResultui");
            _this.mod_kwx.sendcanceltuoguang(false);
            _this.mod_kwx.ResetKwxDesk();
            _this.mod_kwx.view.showpiao();
            sender.setEnabled(false);
        });
        gameclass.createbtnpress( this.node, "tuichubtn", function () {
            _this.mod_kwx.dissmissroom();
            //_this.game.uimgr.closeui("gameclass.kwxtable");
        });
        gameclass.createbtnpress( this.node, "changetab", function () {
            _this.mod_kwx.roominfo.goldchang = true;
            _this.mod_kwx.dissmissroom();
        });

        var endinfo = _this.mod_kwx.gamekwxend_info.msgdata;

        //cc.log(endinfo);

        ccui.helper.seekWidgetByName(_this.node, "Text_1").setString("底分: "+_this.mod_kwx.roominfo.golddifen);

        // 荒庄、点炮、自摸
        var tempa = 0; //0荒庄，1点炮，2自摸
        if(!endinfo.hz){
            for(var i = 0; i < endinfo.info.length; i++){
                if(endinfo.info[i].so_card < 0){
                    tempa += 1;
                }
            }
        }
        //cc.log(tempa)
        // 结算中显示的3个人
        for(var i=0; i<3; i++){
            var name = ccui.helper.seekWidgetByName(_this.node, "playername" + i);
            var pdata = _this.mod_kwx.getplayerdatabyuid(endinfo.info[i].uid);
            //cc.log(pdata)
            if(pdata) name.setString(pdata.name);

            var headpng = ccui.helper.seekWidgetByName(_this.node, "headpng" + i);
            if(pdata && pdata.imgurl != "")
                gameclass.mod_base.showtximg(headpng, pdata.imgurl, 0, 0);

            var sprHu = ccui.helper.seekWidgetByName(this.node, "hu" + i);
            sprHu.setVisible(false);

            var score = ccui.helper.seekWidgetByName(this.node, "score" + i);
            var zongfen = endinfo.info[i].so_card + endinfo.info[i].so_gang + endinfo.info[i].so_other;
            var fuhao = ""+zongfen;
            if(zongfen > 0) fuhao = "+"+zongfen;
            else score.setTextColor(cc.color(0,255,255,255));
            score.setString(fuhao);
            //cc.log("zongfen++++++++++++++++++++++",zongfen);
            if(zongfen < 0 && endinfo.info[i].uid == _this.game.modmgr.mod_login.logindata.uid) ccui.helper.seekWidgetByName(this.node, "Sprite_7").setTexture(res.kwxlose);

            if(tempa == 0){
                sprHu.setVisible(true);
                if(zongfen < 0){
                    sprHu.setTexture(res.resultpeihu);
                }else{
                    sprHu.setTexture(res.resulthuangz);
                }
            }
            else if(tempa == 2 && endinfo.info[i].so_card > 0) {
                sprHu.setVisible(true);
                //sprHu.setTexture(res.resultzimo);
            }
            else if(tempa == 1) {
                if(endinfo.info[i].so_card > 0){
                    sprHu.setVisible(true);
                    sprHu.setTexture(res.resulthu);
                }else if(endinfo.info[i].so_card < 0){
                    sprHu.setVisible(true);
                    sprHu.setTexture(res.resultdianpao);
                }
            }

            var playercard_node = ccui.helper.seekWidgetByName(this.node, "playerbg" + i);
            var posX = 70;

            var cards_info = endinfo.info[i].card;

            // 碰牌
            for(var iPeng = 0; iPeng < cards_info.cardp.length; iPeng++){

                for(var j=0; j<3; j++){
                    var sprCard = this.DisplayCard(cards_info.cardp[iPeng]);
                    sprCard.setPositionX(posX);
                    playercard_node.addChild(sprCard);
                    posX+= sprCard.getContentSize().width;
                }
            }

            // 如果没有碰牌，不空格
            if(cards_info.cardp.length)
                posX+= 10;

            // 服务端传了明杠、暗杠、擦杠三种过来。。。先一个个的取，不知道后面会不会做区分。
            var dispayGangArray = new Array(cards_info.cardmg, cards_info.cardag, cards_info.cardcg);

            // 杠牌的3种
            for(var gangType=0; gangType<3; gangType++){

                // 每种杠里有几个
                for(var iGang = 0; iGang < dispayGangArray[gangType].length; iGang++){
                    for(var j=0; j<4; j++){
                        var sprCard = this.DisplayCard(dispayGangArray[gangType][iGang]);
                        //sprCard.setScale(0.7);
                        sprCard.setPositionX(posX);
                        playercard_node.addChild(sprCard);
                        posX+= sprCard.getContentSize().width;
                    }
                }
            }

            // 如果没有杠，不空格
            if(cards_info.cardmg.length || cards_info.cardag.length || cards_info.cardcg.length)
                posX+= 10;

            // 亮牌
            for(var iLiangCard=0; iLiangCard<cards_info.cardl.length; iLiangCard++){
                var sprCard = this.DisplayCard(cards_info.cardl[iLiangCard]);
                //sprCard.setScale(0.7);
                sprCard.setPositionX(posX);
                playercard_node.addChild(sprCard);
                posX+= sprCard.getContentSize().width;
            }

            // 手牌
            var HandCards = cards_info.card1;
            HandCards.sort(function (a, b) {
                return a - b;
            });

            for(var iHandCard = 0; iHandCard < HandCards.length; iHandCard++){
                var sprCard = this.DisplayCard(HandCards[iHandCard]);
                //sprCard.setScale(0.7);
                sprCard.setPositionX(posX);
                playercard_node.addChild(sprCard);
                posX+= sprCard.getContentSize().width;
            }

            posX+= 10;

            if(!endinfo.hz){
                // 胡牌的人
                if (endinfo.info[i].hu > 0){
                    //sprHu.setVisible(true);
                    var hucard = 1; //var zmordp = 0;
                    //自摸还是点炮
                    //for(var mm = 0; mm < endinfo.info[i].state.length; mm++)
                    //{
                    //    if (endinfo.info[i].state[mm].id == 17) zmordp = 1;
                    //}
                    hucard = this.mod_kwx.laststepcard;
                    var sprCard = this.DisplayCard(hucard);
                    //sprCard.setScale(0.7);
                    sprCard.setPositionX(posX);
                    playercard_node.addChild(sprCard);
                }
            }

            var strDesc = "";
            var state = endinfo.info[i].state;
            if (state){
                for(var huty = 0; huty < state.length; huty++)
                {
                    var huid = state[huty].id; var srt = " x"
                    if(huid >= 20)
                    {
                        srt = " +";
                        if(huid == 31 || huid == 32){
                            huid = huid - 10 ;//飘//数坎
                        }
                        else if(huid == 37 || huid == 38 || huid == 39 || huid == 40 || huid == 41) {
                            if(huid != 41) srt = " x";
                            huid = huid - 14;//抢杠 //海底捞 // 海底炮 // 上楼 // 跑恰摸八
                        }
                    }
                    strDesc += this.mod_kwx.jsonfile[huid-1] + srt + state[huty].score + "   "
                }
            }
            var desc = ccui.helper.seekWidgetByName(this.node, "desc" + i);
            desc.setString(strDesc);
        }

        var maima = ccui.helper.seekWidgetByName(this.node, "maima");
        var maPosX = 70;
        // 马
        for(var iMa = 0; iMa < endinfo.ma.length; iMa++){
            var sprMa = this.DisplayCard(endinfo.ma[iMa]);
            maPosX+= sprMa.getContentSize().width;
            //sprMa.setScale(1);
            sprMa.setPosition(maPosX,10);
            maima.addChild(sprMa);
        }

        //var round = ccui.helper.seekWidgetByName(this.node, "round");
        //round.setString("局数:" + this.mod_kwx.roominfo.step +"/" + this.mod_kwx.roominfo.maxstep);
        //ccui.helper.seekWidgetByName(this.node, "roomnum").setString("房间号：" + this.mod_kwx.roominfo.roomid);

        var t = JSON.parse(_this.mod_kwx.gamekwxend_info.msgsign);
        var resultTime = new Date(t.time * 1000);
        var curtime = ccui.helper.seekWidgetByName(this.node, "curtime");
        curtime.setString(resultTime.Format("MM-dd hh:mm"));
    }
});

// 显示牌型结果
gameclass.kwxGoldResultui.prototype.DisplayCard = function(cardNum) {
    var sprcard;
    var offsetx = 0; var offsety = 0;
    var bgcardpng = "";
    if(cardNum == 0)
        bgcardpng = "bg0_p2_oper_b.png";
    else
        bgcardpng = "bg0_p0_push_f.png";

    var sprcard = new cc.Sprite();
    sprcard.initWithSpriteFrameName(bgcardpng);
    offsetx = sprcard.getContentSize().width*0.5;
    offsety = sprcard.getContentSize().height*0.5 + 6;
    if (cardNum > 0) {
        var strcardpng = "p4_card_"+cardNum+".png";
        var childsprite = new cc.Sprite();
        childsprite.initWithSpriteFrameName(strcardpng);
        childsprite.setPosition(cc.p(offsetx,offsety));
        sprcard.addChild(childsprite);
    }
    return sprcard;
}
