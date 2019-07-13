/**
 * Created by Administrator on 2017-11-4.
 */


gameclass.goldZhanji = gameclass.baseui.extend({
    node:null,
    mod_record:null,
    ctor: function () {
        this._super();
    },

    show:function(){
        cc.spriteFrameCache.addSpriteFrames(res.cardsplist);
        this.node = this.game.uimgr.createnode(res.goldzhanji,true);
        this.addChild(this.node);

        var _this = this;
        gameclass.createbtnpress(this.node, "backBtn", function () {
            _this.game.uimgr.closeui("gameclass.goldZhanji");
        });
        //ccui.helper.seekWidgetByName(this.node,"none_zj").setVisible(false);

        this.gameList = ccui.helper.seekWidgetByName(this.node,"ListView_1");

        _this.mod_record = new gameclass.mod_record();
        _this.mod_record.setgame(_this.game);
        _this.mod_record.setCurUserid(_this.game.modmgr.mod_login.logindata.uid);
        _this.sendGoldRecord();
    },
    sendGoldRecord: function () {
        var data = {"type": gameclass.gamegoldkwx, "uid": this.game.modmgr.mod_login.logindata.uid};
        var _this = this;
        _this.mod_record.getRecordList(gameclass.gamegoldkwx, data, function (datas) {
            ccui.helper.seekWidgetByName(_this.node,"none_zj").setVisible(false);
            _this.showData(datas);
        });
    },
    showData: function (datas) {
        cc.log(datas);
        var allinfos = [];
        for(var i = 0 ;i  < datas.length; i++) {
            var obj = {
                "gamename":this.getNameByGametype(datas[i].gametype),
                "gametype":datas[i].gametype,
                "timeny":this.getzhanjiDate(datas[i].time,1),//年月
                "timesf":this.getzhanjiDate(datas[i].time,2),//时分
                "playerinfoArr":datas[i].info,
            };
            allinfos.push(obj);
        }
        this.setBaseInfo(allinfos);
    },
    getNameByGametype: function (_gametype) {
        var gamename = "";
        if(_gametype >= gameclass.gamegoldkwx && _gametype < gameclass.gamegoldszp){
            gamename = "卡五星";
            var temptype = (_gametype - gameclass.gamegoldkwx)%10;
            if(temptype == 0)
                gamename += "不买马";
            else if(temptype == 1)
                gamename += "买马";
            else if(temptype == 2)
                gamename += "全频道买马";
            else if(temptype == 3)
                gamename += "全频道不买马";
            else if(temptype == 4)
                gamename += "上楼玩法";
        }else if(_gametype >= gameclass.gamegoldszp && _gametype < gameclass.gameGoldNiu){
            gamename = staticString.gamePszName;
        }else if(_gametype >= gameclass.gameGoldNiu && _gametype < gameclass.gameBZW){
            gamename = staticString.gameNysName;
        }else if(_gametype == gameclass.gameBZW){
            gamename = staticString.gameBzwName;
        }else if(_gametype == 77){
            gamename = staticString.gameWzqName;
        } else if(_gametype >= gameclass.gamegoldPtj && _gametype < gameclass.gamegoldPtj+10000){
            if(_gametype%10 == 0)
                gamename = staticString.gamePtjdaName;
            else
                gamename = staticString.gamePtjxiaoName;
        } else if(_gametype >= gameclass.gamegoldEBG && _gametype < gameclass.gamegoldEBG+10000){
            gamename = staticString.gamebrttzName;
        }else if(_gametype >= gameclass.gamegoldTTZ && _gametype < gameclass.gamegoldTTZ+10000){
            gamename = staticString.gameTtzName;
        }else if(_gametype >= gameclass.gamegoldPDK && _gametype < gameclass.gamegoldPDK + 10000){
            gamename = staticString.gamePdkName;
        }else if(_gametype == gameclass.gamegoldYSZ){
            gamename = staticString.gamegYSZName;
        }else if(_gametype == gameclass.gamegoldsxdb){//名品汇
            gamename = staticString.gameSxdbName;
        }else if(_gametype == gameclass.gamegoldLHD){//龙虎斗
            gamename = staticString.gameLhdName;
        }else if(_gametype == gameclass.gamegoldYYBF){//一夜暴富
            gamename = staticString.gamegYybfName;
        }else if(_gametype == gameclass.gameDragon){//龙珠探宝
            gamename = staticString.gameDragonName;
        }else if(_gametype == gameclass.gameDxtb){//地穴探宝
            gamename = staticString.gameDxtbName;
        }else if(_gametype == gameclass.gameFpj){//! 翻牌机
            gamename = staticString.gameFpjName;
        }else if(_gametype == gameclass.gameTBBF){
            gamename = staticString.gameToubaoName;
        }else if(_gametype == gameclass.gameToubao){
            gamename = staticString.gameToubaoName;
        }
        return gamename;
    },
    getzhanjiDate:function(dates,tpye){
        var d = new Date(dates * 1000);
        var date = "";
        if(tpye == 1){
            date = d.getFullYear() + "-"+(d.getMonth() + 1)+"-" +d.getDate();
        }
        else if(tpye == 2){
            var hour = d.getHours();
            if(hour < 10) hour = "0"+hour;
            var min = d.getMinutes();
            if(min < 10) min = "0"+min;
            var second = d.getSeconds();
            if(second < 10) second = "0"+second;
            date = hour + ":" +min + ":"+second;
        }
        return date;
    },

    setBaseInfo:function(data){
        if(data.length == 0){
            ccui.helper.seekWidgetByName(this.node,"none_zj").setVisible(true);
            return;
        }
        cc.log(data);
        var _this = this;
        for(var i = 0;i < data.length;i++){
            var infoObj = data[i];
            var listCell = this.game.uimgr.createnode(res.goldzhanjicell, true).getChildByName("Panel_1");
            listCell.removeFromParent(false);
            this.gameList.pushBackCustomItem(listCell);

            ccui.helper.seekWidgetByName(listCell,"gameType").setString(infoObj.gamename);
            ccui.helper.seekWidgetByName(listCell,"gameDate").setString(infoObj.timeny);
            ccui.helper.seekWidgetByName(listCell,"gameTime").setString(infoObj.timesf);

            var len = infoObj.playerinfoArr.length;
            listCell.getChildByName("playerNode").setTouchEnabled(len > 6);
            var list = listCell.getChildByName("playerNode");
            for (var j = 7; j >= 0; j--) {
                if(j > len-1) {
                    list.removeItem(j);
                    continue;
                };
                var index = (len-1) - j;
                var playerNode = ccui.helper.seekWidgetByName(listCell, "head" + index);
                gameclass.mod_base.showtximg(playerNode, infoObj.playerinfoArr[index].head, 0, 0, "im_headbg2");
                playerNode.getChildByName("playerName").setString(infoObj.playerinfoArr[index].name);
                playerNode.getChildByName("playerScore").setString(infoObj.playerinfoArr[index].score);
                if(infoObj.playerinfoArr[index].score < 0){
                    playerNode.getChildByName("playerScore").setTextColor(cc.color(255,165,0));
                }else{
                    playerNode.getChildByName("playerScore").setString("+" + infoObj.playerinfoArr[index].score);
                }
                playerNode.uid = infoObj.playerinfoArr[index].uid;
                playerNode.name = infoObj.playerinfoArr[index].name;
                playerNode.head = infoObj.playerinfoArr[index].head;
                playerNode.addTouchEventListener(function(sender,type){
                    if(type == ccui.Widget.TOUCH_ENDED){
                        var tool = new gameclass.mod_ranking();
                        tool.getPlayerInfo(sender.uid,function(retdata){
                            if(retdata){
                                retdata.name = sender.name;
                                retdata.head = sender.head;
                            }
                            _this.game.uimgr.showui("gameclass.rankingPlayerInfo").setBaseInfo(retdata);
                        })
                    }
                });
            }

            if(infoObj.gametype>=40000 && infoObj.gametype < 50000){
                if(!infoObj.playerinfoArr[0].result) continue;
                ccui.helper.seekWidgetByName(listCell,"gameType").setString("豹子王");
                listCell.getChildByName("bzwNode").setVisible(true);
                var str = "";
                var len = infoObj.playerinfoArr[0].bets.length;
                var bets = false;
                var betTotal = 0;
                var index = 0;
                for(var aa = 0;aa < len;aa++){
                    if(infoObj.playerinfoArr[0].bets[aa] > 0){
                        betTotal++;
                    }
                }

                for(var m = 0;m < len;m++){
                    if(infoObj.playerinfoArr[0].bets[m] > 0){
                        bets = true;
                        index++;
                        if(m == 0) str += ("小x"+infoObj.playerinfoArr[0].bets[m]);
                        else if(m==2) str += ("豹子x"+infoObj.playerinfoArr[0].bets[m]);
                        else if(m==1) str += ("大x"+infoObj.playerinfoArr[0].bets[m]);
                        else{
                            str += ( (m) +"点x"+infoObj.playerinfoArr[0].bets[m]);
                        }
                        if(index < betTotal){
                            str += ",";
                        }else{
                            str += "."
                        }
                    }
                }
                ccui.helper.seekWidgetByName(listCell,"state").setString(str);
                if(!bets){
                    ccui.helper.seekWidgetByName(listCell,"state").setString("您这把当庄");
                }
                for(var n = 0;n < infoObj.playerinfoArr[0].result.length;n++){
                    ccui.helper.seekWidgetByName(listCell,"sz"+n).loadTexture(res["IMGdian" + infoObj.playerinfoArr[0].result[n]],ccui.Widget.LOCAL_TEXTURE);
                }

            }else if(infoObj.gametype>=120000 && infoObj.gametype < 130000){
                if(!infoObj.playerinfoArr[0].result) continue;
                ccui.helper.seekWidgetByName(listCell,"gameType").setString("骰宝");
                listCell.getChildByName("bzwNode").setVisible(true);
                var str = "";
                var len = infoObj.playerinfoArr[0].bets.length;
                var bets = false;
                var betTotal = 0;
                var index = 0;
                for(var aa = 0;aa < len;aa++){
                    if(infoObj.playerinfoArr[0].bets[aa] > 0){
                        betTotal++;
                    }
                }

                for(var m = 0;m < len;m++){
                    if(infoObj.playerinfoArr[0].bets[m] > 0){
                        bets = true;
                        index++;
                        if(m == 0) str += ("单x"+infoObj.playerinfoArr[0].bets[m]);
                        else if(m==1) str += ("豹子x"+infoObj.playerinfoArr[0].bets[m]);
                        else if(m==2) str += ("双x"+infoObj.playerinfoArr[0].bets[m]);
                        else{
                            str += ( (m+1) +"点x"+infoObj.playerinfoArr[0].bets[m]);
                        }
                        if(index < betTotal){
                            str += ",";
                        }else{
                            str += "."
                        }
                    }
                }
                ccui.helper.seekWidgetByName(listCell,"state").setString(str);
                if(!bets){
                    ccui.helper.seekWidgetByName(listCell,"state").setString("您这把当庄");
                }
                for(var n = 0;n < infoObj.playerinfoArr[0].result.length;n++){
                    ccui.helper.seekWidgetByName(listCell,"sz"+n).loadTexture(res["IMGdian" + infoObj.playerinfoArr[0].result[n]],ccui.Widget.LOCAL_TEXTURE);
                }
                ccui.helper.seekWidgetByName(listCell,"sz2").setVisible(false);
            } else{
                listCell.getChildByName("bzwNode").setVisible(false);
            }
            if(infoObj.gametype>=60000 && infoObj.gametype < 70000){//百人推筒子
                listCell.getChildByName("brttzNode").setVisible(true);
                var len = infoObj.playerinfoArr[0].bets.length;
                var bets = true;
                var strArr = ["顺门x","天门x","地门x"];

                for(var m = 0;m < len;m++){
                    if(infoObj.playerinfoArr[0].bets[m] > 0){
                        bets = false;
                    }
                    ccui.helper.seekWidgetByName(listCell,"state"+m).setString(strArr[m]+infoObj.playerinfoArr[0].bets[m]);
                }
                ccui.helper.seekWidgetByName(listCell,"state").setString(str);
                if(bets){
                    for(var m = 0;m < 3;m++){
                        ccui.helper.seekWidgetByName(listCell,"state"+m).setVisible(false);
                    }
                }
                ccui.helper.seekWidgetByName(listCell,"zhuang").setVisible(bets);
                for(var n = 0;n < infoObj.playerinfoArr[0].result.length;n++){
                    var resultNode = ccui.helper.seekWidgetByName(listCell,"result"+n);
                    var resPath = this.getRewardType(infoObj.playerinfoArr[0].result[n][0],infoObj.playerinfoArr[0].result[n][1]);
                    ccui.helper.seekWidgetByName(resultNode,"type").setTexture(resPath);
                    for(var k = 0;k < 2;k++){
                        ccui.helper.seekWidgetByName(resultNode,"flower"+k).loadTexture(res["ttz_card_"+infoObj.playerinfoArr[0].result[n][k]],ccui.Widget.LOCAL_TEXTURE);
                    }
                }
            }
            //一夜暴富
            if(infoObj.gametype >= 110000 && infoObj.gametype < 120000){
                listCell.getChildByName("yybfNode").setVisible(true);
                ccui.helper.seekWidgetByName(listCell,"yybfstate").setString("您的下注:"+infoObj.playerinfoArr[0].bets+",您的收益"+infoObj.playerinfoArr[0].score);
            }
            //龙虎斗
            if(infoObj.gametype >= 100000 && infoObj.gametype < 110000){
                listCell.getChildByName("lhdNode").setVisible(true);
                if (infoObj.playerinfoArr[0].result.length>=2){
                    var longtexture = this.getCardUrlByNum(infoObj.playerinfoArr[0].result[0]);
                    var hutexture = this.getCardUrlByNum(infoObj.playerinfoArr[0].result[1]);
                    ccui.helper.seekWidgetByName(listCell,"longimg").loadTexture(longtexture,ccui.Widget.PLIST_TEXTURE);
                    ccui.helper.seekWidgetByName(listCell,"longimg").setScale(0.7);
                    ccui.helper.seekWidgetByName(listCell,"huimg").loadTexture(hutexture,ccui.Widget.PLIST_TEXTURE);
                    ccui.helper.seekWidgetByName(listCell,"huimg").setScale(0.7);
                }
                var str = "";
                for(var m = 0;m < infoObj.playerinfoArr[0].bets.length;m++){
                    if (infoObj.playerinfoArr[0].bets[m]>0){
                        if(0 == m){
                            str += ("龙x"+infoObj.playerinfoArr[0].bets[m]);
                        }else if(1 == m){
                            str += (" 虎x"+infoObj.playerinfoArr[0].bets[m]);
                        }else if(2 == m){
                            str += (" 和x"+infoObj.playerinfoArr[0].bets[m]);
                        }
                    }
                }
                ccui.helper.seekWidgetByName(listCell,"lhdstate").setString(str);
            }
            //神仙夺宝
            if(infoObj.gametype >= 90000 && infoObj.gametype < 100000){
                listCell.getChildByName("sxdbNode").setVisible(true);
                var str = "";
                var len = infoObj.playerinfoArr[0].bets.length;
                var bets = false;
                var betTotal = 0;
                var index = 0;
                for(var aa = 0;aa < infoObj.playerinfoArr[0].bets.length;aa++){
                    if(infoObj.playerinfoArr[0].bets[aa] > 0){
                        betTotal++;
                    }
                }

                var strArr = ["金标x","银标x","LVx","Diorx","古驰x","爱马仕x","香奈儿x","劳力士x","阿玛尼x","圣罗兰x","奔驰x"];

                for(var m = 0;m < infoObj.playerinfoArr[0].bets.length;m++){
                    if(infoObj.playerinfoArr[0].bets[m] > 0){
                        bets = true;
                        index++;
                        str += (strArr[m]+infoObj.playerinfoArr[0].bets[m]);
                        if(index < betTotal){
                            str += ",";
                        }else{
                            str += "."
                        }
                    }
                }
                cc.log(str);
                ccui.helper.seekWidgetByName(listCell,"sxdbstate").setString(str);
                if(!bets){
                    ccui.helper.seekWidgetByName(listCell,"sxdbstate").setString("您这把当庄");
                }
                var sxdbresult = this.getResultType(infoObj.playerinfoArr[0].result);
                if(sxdbresult == 700 || sxdbresult == 2100){
                    // ccui.helper.seekWidgetByName(listCell,"mjbg").setVisible(false);
                    // ccui.helper.seekWidgetByName(listCell,"tx").setVisible(true);
                    // ccui.helper.seekWidgetByName(listCell,"tx").setTexture(res["zjt"+sxdbresult]);
                    ccui.helper.seekWidgetByName(listCell,"mjbg").setTexture(res["recordType"+sxdbresult]);
                }else{
                    ccui.helper.seekWidgetByName(listCell,"mjbg").setTexture(res["recordType"+sxdbresult]);
                }
            }
        }
    },
    getCardUrlByNum:function (card) {
        var abcd = ["a","d","b","c"];
        var point = Math.floor(card/10);
        var type = card%10;
        var cardUrl="";
        if (!card||card<0){
            cardUrl=res.pokerBei;
        }else{
            if(card==1000){
                cardUrl="card_joker_gray.png";
            }else if(card==2000){
                cardUrl="card_joker.png";
            }else{
                cardUrl = "card_" + point +  abcd[type - 1]+ ".png";
            }
        }
        return cardUrl;
    },
//神仙夺宝
    getResultType:function(result){
        if(result != 7 && result != 21){
            var type = -1;
            //0为奔驰*100  1奔驰  2古驰 3爱马仕 4阿玛尼 5圣罗兰 6LV 7Dior 8香奈儿 9劳力士
            if(result == 0) type = 0;
            else if(result == 14) type = 1;
            else if(result == 1 || result == 2 || result == 3) type = 5;
            else if(result == 4 || result == 5 || result == 6) type = 3;
            else if(result == 8 || result == 9 || result == 10) type = 2;
            else if(result == 11 || result == 12 || result == 13) type = 4;
            else if(result == 15 || result == 16 || result == 17) type = 9;
            else if(result == 18 || result == 19 || result == 20) type = 7;
            else if(result == 22 || result == 23 || result == 24) type = 6;
            else if(result == 25 || result == 26 || result == 27) type = 8;
            return type;
        }else{
            return result*100;
        }
    },
    getRewardType:function(cardnum1,cardnum2){
        var respath = "";
        if(cardnum1 == cardnum2){
            if(cardnum1 == 37){
                respath = res.ttz_stzz;
            }
            else{
                respath = res.ttz_baozi;
            }
        }
        else{
            var tts = cardnum1 + cardnum2;
            var strname = "";
            if(tts == 30){
                if(cardnum1 == 12 || cardnum2 == 12){
                    respath = res.ttz_ebg;
                }else{
                    respath = res.ttz_nod;
                }
            }
            else if(tts >= 48) {
                tts = (tts-37-10)*10+5;
                strname = "ttz_img"+tts;
                respath = res[strname];
            }
            else{
                if(tts < 30) tts = tts-20;
                else tts = tts-30;
                strname = "ttz_img"+tts*10;
                respath = res[strname];
            }
        }
        return respath;
    },







    updateUIMsg : function(msgtype) {

    },

})
