/**
 * Created by yang on 2016/11/9.
 */
//单选item tag设置为0 复选设置为1 +—类型的设置为2 杂项设置为100
// 下拉窗的checkBox设置为3 自定义输入的设置为4
gameclass.createroomui = gameclass.baseui.extend({
    sprite: null,
    node:null,
    defaultSelectArr:null,
    nowWanFaIndex:null,
    nowSelectIndex:null,
    labelSelectColor:null,
    labelUnSelectColor:null,
    beiShuArr:null,
    beiShuIndexArr:null,
    zhuangShiConfigArr:null,
    localStorageHead:null,
    lastRoomStorage:null,
    nowPanel:null,
    gameid:null,
    isclubid:0,
    clubRoomIndex:0,
    ctor: function () {
        this._super();
        this.isclubid = 0;
        this.clubRoomIndex = 0;
        this.totalLocalStorageHead="yypk_"+gameclass.version;
        this.gameid=[[gameclass.gameptj,gameclass.gameptj],
            [gameclass.gameszp,gameclass.gameszp_fk],
            [gameclass.gameniuniu,gameclass.gamejxnn,gameclass.gamejxnn,gameclass.gamejxnn,gameclass.gamejxnn],
            [gameclass.gameddz,gameclass.gamelzddz],
            [gameclass.gamepdk,gameclass.gamepdk15,gameclass.gamepdklz],
            [gameclass.gamesdb],
            [gameclass.gamettz],
            [gameclass.gamenxs],
            [gameclass.gamezynys,gameclass.gamenys,gameclass.gamebrnys],
        [],
        [gameclass.gamenys]]
        this.lastRoomStorage=gameclass.ruleLocalStorageHead;
        this.labelSelectColor=cc.color(250,113,230);
        this.labelUnSelectColor=cc.color(255,255,255);
        this.beiShuIndexArr=[];
        this.nowPanel=null;

        //初始值配置文件有时间再写换成表格配置
        this.totalConfig=[
            [
                [[1,0],[1,0],[1,0,1,1],[1,0,0],[1,0],[1,0,0,0,0]],
                [[1,0],[1,0],[1,0,1,1],[1,0,0],[1,0],[1,0,0,0,0]]
            ],
            [
                [[1,0],[1,0],[1,0],[1,0,0]],
                [[1,0],[1,0,0],[1,1,1,0],[1,0,0],[1,0,0],[1,0,0,0]]
            ],
            [
                [[1,0],[1,0,0,0],[1,0,0]],
                [[1,0,0,0],[1,0,0,0],[1,0],[1,0]],
                [[1,0,0,0],[1,0,0,0],[1,0],[1,0,0,0,0,0,0,0]],
                [[1,0,0,0],[1,0,0,0],[1,0],[1,0,0,0,0,0,0,0]],
                [[1,0,0,0],[1,0,0,0],[1,0],[1,0,0,0,0,0,0,0]]
            ],
            [
                [[1,0],[1,0],[1,1],[1,0,0]],
                [[1,0],[1,0],[1,1],[1,0]]
            ],
            [
                [[1,0],[1,0,0],[1,0],[1],[1,0],[0,0,0]],
                [[1,0],[1,0,0],[1,0],[1],[1,0],[0,0,0]],
                [[1,0],[1,0,0],[1,0],[1,0],[1,0,0]]
            ],
            [
                [[1,0],[1,0]]
            ],
            [
                [[1,0],[1,0,0],[1,0],[1,0,0]],
            ],
            [
                [[1,0],[1,0],[1],[1]],
            ],
            [

               [[1,0],[1,0,0,0,0],[1,0,0,0],[0,0,1,0],[0,1],[1,1,1,1,1,1,1],[0,0]],
                [[1,0],[1,0,0,0,0],[1,0,0,0],[0,0,1,0],[0,0,0,1],[0,1],[1,1,1,1,1,1,1],[0,0]],
                [[1,0],[1,0,0,0,0],[1,0,0,0],[0,0,1,0],[0,1],[1,1,1,1,1,1,1],[0,0,0]],
                [[1,0],[1,0,0,0,0],[1,0,0,0],[0,0,1,0],[0,0,0,1],[0,1],[1,1,1,1,1,1,1],[0,0,0]],
                [[1,0],[1,0,0,0,0],[1,0,0,0],[0,0,1,0],[0,0,0,1],[0,1],[1,1,1,1,1,1,1],[0,0,0]],

            ],
        ];
        //用来存tag为2的item 的可选数组
        this.beiShuArr=[,,,,,,,[[10,20,30,40,50,60,70,80,90,100,150,200]]]
    },
    show:function(){
    },
    _btnOkCallBack:function(selectIndexArr){
        mod_sound.playeffect(g_music["selectItemMp3"], false);
        var _obj=null;
        var localStr= cc.sys.localStorage.getItem(this.lastRoomStorage);
        if(localStr) _obj=JSON.parse(localStr);
        if(this.nowSelectIndex==null&&_obj){
            this.nowSelectIndex=_obj.item;
            this.nowWanFaIndex=_obj.panel;
            selectIndexArr=JSON.parse(cc.sys.localStorage.getItem(this.totalLocalStorageHead+this.nowWanFaIndex+"selectBox"+this.nowSelectIndex+"IndexObj"));
        }

        this.saveData(this.nowSelectIndex,JSON.stringify(selectIndexArr));
        //因为拼天九上道发0.不上道发1
        //if(Number(this.nowWanFaIndex) == 0){
        //    if(selectIndexArr[1][0] == 1) selectIndexArr[1][0] = 0;
        //    else if(selectIndexArr[1][0] == 0) selectIndexArr[1][0]= 1;
        //    if(selectIndexArr[2][0] == 1) selectIndexArr[2][0] = 0;
        //    else if(selectIndexArr[2][0] == 0) selectIndexArr[2][0]= 1;
        //}
        if(Number(this.nowWanFaIndex) == 3){
            if(selectIndexArr[2][0] == 1) selectIndexArr[2][0] = 0;
            else if(selectIndexArr[2][0] == 0) selectIndexArr[2][0]= 1;
        }
        this._parseRule(selectIndexArr);

        var _obj={panel:this.nowWanFaIndex,item:this.nowSelectIndex};
        cc.sys.localStorage.setItem(this.lastRoomStorage,JSON.stringify(_obj));
    },
    //规则解析
    _parseRule:function(selectIndexArr){
        cc.log("22222222222222222222222222",this);
       var _gameType=this.nowWanFaIndex; //游戏大类型 比如牛牛
       var _itemType=this.nowSelectIndex;//游戏小类型 比如看牌抢庄
        cc.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",_gameType)
        cc.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",_itemType)
        var roomId=this.gameid[_gameType][_itemType];
        var cardNum=null;
        var param1=null;
        var param2=null;
        var findFristNumInArr=function(_arr){
            for(var i=0;i<_arr.length;i++){
                if(_arr[i]) return i;
            }
        }
        if(_gameType==0){
            //if(_itemType==0){
                cardNum = findFristNumInArr(selectIndexArr[0])+1;
                var score = 0;
                if(selectIndexArr[4][1]){
                    score = findFristNumInArr(selectIndexArr[5])+1;
                }
                param1 = parseInt(this.nowSelectIndex) + findFristNumInArr(selectIndexArr[3])*10+findFristNumInArr(selectIndexArr[1])*100+score*1000; //selectIndexArr[2][0]
                param2 = selectIndexArr[2][0] + selectIndexArr[2][1]*10 + selectIndexArr[2][2]*100 + selectIndexArr[2][3]*1000;
            //}
        }else if(_gameType==1){
            if(_itemType==0){
                cardNum = findFristNumInArr(selectIndexArr[0])+1;
                param1 =findFristNumInArr(selectIndexArr[2])+findFristNumInArr(selectIndexArr[3])*10+findFristNumInArr(selectIndexArr[1])*100;
            }else if(_itemType==1){
                cardNum = findFristNumInArr(selectIndexArr[0])+1;
                param1 =findFristNumInArr(selectIndexArr[1])+1+(findFristNumInArr(selectIndexArr[3])+1)*10+(findFristNumInArr(selectIndexArr[4])+1)*100+(findFristNumInArr(selectIndexArr[5]))*1000;
                param2 = selectIndexArr[2][0]+selectIndexArr[2][1]*10+selectIndexArr[2][2]*100+selectIndexArr[2][3]*1000;
            }
        }else if(_gameType==2){
            //cc.log(selectIndexArr[0])
            if(_itemType==0){
                cardNum = findFristNumInArr(selectIndexArr[0])+1;
                param1 = findFristNumInArr(selectIndexArr[1])+findFristNumInArr(selectIndexArr[2])*10;
            }else if(_itemType==1){
                cardNum = findFristNumInArr(selectIndexArr[0])+1;//(findFristNumInArr(selectIndexArr[0])+1)*2==8?5:(findFristNumInArr(selectIndexArr[0])+1)*2;
                param1 = findFristNumInArr(selectIndexArr[3])*10+findFristNumInArr(selectIndexArr[2])*100+0;
                param2 = findFristNumInArr(selectIndexArr[1])+2;
            }else if(_itemType==2){
                cardNum = findFristNumInArr(selectIndexArr[0])+1;//(findFristNumInArr(selectIndexArr[0])+1)*2==8?5:(findFristNumInArr(selectIndexArr[0])+1)*2;
                param1 = findFristNumInArr(selectIndexArr[3])*10+findFristNumInArr(selectIndexArr[2])*100+3;
                param2 = findFristNumInArr(selectIndexArr[1])+2;
            }else if(_itemType==3){
                cardNum = findFristNumInArr(selectIndexArr[0])+1;//(findFristNumInArr(selectIndexArr[0])+1)*2==8?5:(findFristNumInArr(selectIndexArr[0])+1)*2;
                param1 = findFristNumInArr(selectIndexArr[3])*10+findFristNumInArr(selectIndexArr[2])*100+2;
                param2 = findFristNumInArr(selectIndexArr[1])+2;
            }else if(_itemType==4){
                cardNum = findFristNumInArr(selectIndexArr[0])+1;//(findFristNumInArr(selectIndexArr[0])+1)*2==8?5:(findFristNumInArr(selectIndexArr[0])+1)*2;
                param1 = findFristNumInArr(selectIndexArr[3])*10+findFristNumInArr(selectIndexArr[2])*100+1;
                param2 = findFristNumInArr(selectIndexArr[1])+2;
            }
        }else if(_gameType==3) {
            if (_itemType == 0) {
                cardNum = findFristNumInArr(selectIndexArr[0])+1;
                //cc.log(selectIndexArr)
                param1 = findFristNumInArr(selectIndexArr[3]) + findFristNumInArr(selectIndexArr[1]) * 10 + selectIndexArr[2][0] * 100 + selectIndexArr[2][1] * 1000;
            } else if (_itemType == 1) {
                cardNum = findFristNumInArr(selectIndexArr[0])+1;
                param1 = findFristNumInArr(selectIndexArr[3]) + findFristNumInArr(selectIndexArr[1]) * 10 + selectIndexArr[2][0] * 100 + selectIndexArr[2][1] * 1000;
            }
        }else if(_gameType==4) {//跑得快
            if (_itemType == 0) {
                cc.log("======88",selectIndexArr);
                cardNum = findFristNumInArr(selectIndexArr[0])+1;
                //! 两人玩法，首出黑桃三无效
                if (findFristNumInArr(selectIndexArr[1])==1){
                    selectIndexArr[3][0]=0;
                }
                param1=findFristNumInArr(selectIndexArr[1])*10000 + selectIndexArr[3][0]+selectIndexArr[3][1]*10 + selectIndexArr[3][2]*100 + (findFristNumInArr(selectIndexArr[2])==0?1:0)*1000;
                //param2=findFristNumInArr(selectIndexArr[1]);
                param2=0;
            }
        }else if(_gameType==5){
            if (_itemType == 0) {
                cardNum = findFristNumInArr(selectIndexArr[0])+1;
                param1 = findFristNumInArr(selectIndexArr[1])*100;
            }
        }else if(_gameType==6){//推筒子
            cc.log("======8899",selectIndexArr);
            if(_itemType==0){
                cardNum = findFristNumInArr(selectIndexArr[0])+1;

                var strgewei = findFristNumInArr(selectIndexArr[2]);
                if(strgewei == 1){
                    strgewei = findFristNumInArr(selectIndexArr[3])+1;
                }
                param1 = strgewei+findFristNumInArr(selectIndexArr[1])*10;//+findFristNumInArr(selectIndexArr[3])*100;
            }
        }else if(_gameType==7){
            if (_itemType == 0) {
                cardNum = findFristNumInArr(selectIndexArr[0]) + 1;
                param1 = findFristNumInArr(selectIndexArr[0]) + findFristNumInArr(selectIndexArr[1]) * 10 ;
                //cc.log(this.beiShuArr[_gameType],selectIndexArr[3][0]);
                param2 = this.beiShuArr[_gameType][0][selectIndexArr[3][0]-1];
            }
        }else if(_gameType==8){//牛元帅
            //if (_itemType == 0) {
            //    cardNum = findFristNumInArr(selectIndexArr[0]) + 1;
            //    param1 = selectIndexArr[6][1]*10+findFristNumInArr(selectIndexArr[3])*100+findFristNumInArr(selectIndexArr[2])*1000+findFristNumInArr(selectIndexArr[4])*100000+findFristNumInArr(selectIndexArr[1])*1000000;
            //    param2 = selectIndexArr[6][0]+selectIndexArr[5][6]*10+selectIndexArr[5][5]*100+selectIndexArr[5][4]*1000+selectIndexArr[5][3]*10000+selectIndexArr[5][2]*100000+selectIndexArr[5][1]*1000000+selectIndexArr[5][0]*10000000;
            //}else if (_itemType == 1) {
            //    cardNum = findFristNumInArr(selectIndexArr[0]) + 1;
            //    param1 = selectIndexArr[7][1]*10+findFristNumInArr(selectIndexArr[3])*100+findFristNumInArr(selectIndexArr[2])*1000+(findFristNumInArr(selectIndexArr[4])+1)*10000+findFristNumInArr(selectIndexArr[5])*100000+findFristNumInArr(selectIndexArr[1])*1000000;
            //    param2 = selectIndexArr[7][0]+selectIndexArr[6][6]*10+selectIndexArr[6][5]*100+selectIndexArr[6][4]*1000+selectIndexArr[6][3]*10000+selectIndexArr[6][2]*100000+selectIndexArr[6][1]*1000000+selectIndexArr[6][0]*10000000;
            //}else
            if (_itemType == 0) {
                cardNum = findFristNumInArr(selectIndexArr[0]) + 1;
                param1 = selectIndexArr[6][2]+selectIndexArr[6][1]*10+findFristNumInArr(selectIndexArr[3])*100+findFristNumInArr(selectIndexArr[2])*1000+findFristNumInArr(selectIndexArr[4])*100000+findFristNumInArr(selectIndexArr[1])*1000000;
                param2 = selectIndexArr[6][0]+selectIndexArr[5][6]*10+selectIndexArr[5][5]*100+selectIndexArr[5][4]*1000+selectIndexArr[5][3]*10000+selectIndexArr[5][2]*100000+selectIndexArr[5][1]*1000000+selectIndexArr[5][0]*10000000;
            }else if (_itemType == 1) {
                cardNum = findFristNumInArr(selectIndexArr[0]) + 1;
                param1 = selectIndexArr[7][2]+selectIndexArr[7][1]*10+findFristNumInArr(selectIndexArr[3])*100+findFristNumInArr(selectIndexArr[2])*1000+(findFristNumInArr(selectIndexArr[4])+1)*10000+findFristNumInArr(selectIndexArr[5])*100000+findFristNumInArr(selectIndexArr[1])*1000000;
                param2 = selectIndexArr[7][0]+selectIndexArr[6][6]*10+selectIndexArr[6][5]*100+selectIndexArr[6][4]*1000+selectIndexArr[6][3]*10000+selectIndexArr[6][2]*100000+selectIndexArr[6][1]*1000000+selectIndexArr[6][0]*10000000;
            }else if (_itemType == 2) {
                cardNum = findFristNumInArr(selectIndexArr[0]) + 1;
                param1 = selectIndexArr[7][2]+selectIndexArr[7][1]*10+findFristNumInArr(selectIndexArr[3])*100+findFristNumInArr(selectIndexArr[2])*1000+(findFristNumInArr(selectIndexArr[4])+1)*10000+findFristNumInArr(selectIndexArr[5])*100000+findFristNumInArr(selectIndexArr[1])*1000000;
                param2 = selectIndexArr[7][0]+selectIndexArr[6][6]*10+selectIndexArr[6][5]*100+selectIndexArr[6][4]*1000+selectIndexArr[6][3]*10000+selectIndexArr[6][2]*100000+selectIndexArr[6][1]*1000000+selectIndexArr[6][0]*10000000;
            }
        } else if(_gameType==10){//卡五星
            if (_itemType == 0) {
                //cc.log(selectIndexArr);
                cardNum = findFristNumInArr(selectIndexArr[0]) + 1;
                param1 = findFristNumInArr(selectIndexArr[2]) * 10000000 + findFristNumInArr(selectIndexArr[3]) * 1000000 + (findFristNumInArr(selectIndexArr[4])+1)*100000 + selectIndexArr[5][0] * 10000 + selectIndexArr[5][1] * 1000 + selectIndexArr[5][2] * 100 + selectIndexArr[6][0] * 10 + selectIndexArr[6][2];
                param2 = findFristNumInArr(selectIndexArr[1]) * 10 + selectIndexArr[6][1];
            }
        }
        cc.log("111111111111111",_itemType)
        cc.log("cardNum=" +cardNum + ",param1=" + param1 + ",param2=" + param2);
        if(this.isclubid > 0){
            // var data = {"cid":this.isclubid,"gametype":roomId,"param1":param1,"param2":param2,"card":cardNum};
            // this.game.modmgr.mod_center.mod_club.sendclubkaifang(data);
            //保存开房记录
            // var recordinfo = {
            //     "gametype":roomId,
            //     "card":cardNum,
            //     "maxstep":this.game.modmgr.mod_center.mod_club.getmaxstepbycardnum(roomId,cardNum),
            //     "param1":param1,
            //     "param2":param2
            // };
            // staticFunction.setStorage(gameclass.clubStorageKey, this.isclubid + "-" + roomId + "-" + this.clubRoomIndex, recordinfo);
            // cc.sys.localStorage.setItem("clubgame"+this.game.modmgr.mod_center.mod_club.getgameIndexbytype(roomId),JSON.stringify(recordinfo));
            this.game.uimgr.closeui("gameclass.createroomui");
            this.game.uimgr.closeui("gameclass.hallui");
            //gametype, param1, param2, num, $roomIndex
            this.game.uimgr.uis["gameclass.clubmanger"].setClubRoom(roomId, param1, param2, cardNum, this.clubRoomIndex);
        }else if(_gameType==4){
            this.game.modmgr.mod_login.createroom(roomId,cardNum,param1,param2);
        } else{
            this.game.modmgr.mod_login.createroom(roomId,cardNum,param1,param2);
        }
    },
    /**
     * 从本地存储还原为数组
     */
    coverRuleSaveString:function (str) {
        var result = [];
        var strArr = str.split("|");
        for(var i = 0;i<strArr.length;i++){
            result[i] = [];
            var subStr = strArr[i];
            var subStrArr = subStr.split(",");
            for(var j = 0;j<subStrArr.length;j++){
                result[i][j] = subStrArr[j];
            }
        }
        return result;
    },
    /**
     * 根据选择获取储存的字符串
     * @param selectIndexArr
     */
    getRuleSaveString:function (selectIndexArr) {
        var result = "";
        var len = selectIndexArr.length;
        for(var i = 0;i<len;i++){
            var subArr = selectIndexArr[i];
            if(i == len - 1){
                result = result + subArr.toString();
            }else{
                result = result + subArr.toString() + "|";
            }
        }
        return result;
    },
    _init:function(_index){
        cc.log("11111111111111",_index);
        var _this = this;
        this.node = this.game.uimgr.createnode(res["createroomjson"+_index],true,1);
        this.addChild(this.node);

        var mainPanel=ccui.helper.seekWidgetByName(this.node,"Panel_1");
        mainPanel.addTouchEventListener(function(sender, type){
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    mod_sound.playeffect(g_music["selectGameMp3"], false);
                    break;
            }
        })
        var backBtn = ccui.helper.seekWidgetByName(this.node, "backBtn");
        backBtn.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    mod_sound.playeffect(g_music["selectItemMp3"], false);
                    _this.game.uimgr.closeui("gameclass.createroomui");
                    break;
            }
        });
        var okBtn = ccui.helper.seekWidgetByName(this.node, "okBtn");
        okBtn.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    sender.setTouchEnabled(false);
                    sender.runAction(cc.sequence(cc.delayTime(1.0),cc.callFunc(function(){
                        sender.setTouchEnabled(true);
                    })))
                    var _panelChildArr=ccui.helper.seekWidgetByName(_this.nowPanel,"rulePanel").getChildren();
                    var panel=_panelChildArr[_this.nowSelectIndex];
                    var selectIndexArr=[];
                    var panelItemArr=panel.getChildren();
                    for(var i=0;i<panelItemArr.length;i++){
                        selectIndexArr[i]=[];
                        if(panelItemArr[i].getName()=="touchPanelCallBoxCallPanel") continue;
                        var checkBoxArr=panelItemArr[i].getChildren();
                        for(var j=0;j<checkBoxArr.length;j++){
                            if(checkBoxArr[j].getTag()==0||checkBoxArr[j].getTag()==1){
                                if(checkBoxArr[j].getChildByName("Check").isSelected()){
                                    selectIndexArr[i][j]=1;
                                    //if(i!=1) selectIndexArr[i][j] = 1;
                                    //else selectIndexArr[i][j] = 0;
                                }else{
                                    selectIndexArr[i][j]=0;
                                    //if(i!=1) selectIndexArr[i][j] = 0;
                                    //else selectIndexArr[i][j] = 1;
                                }
                            }else if(checkBoxArr[j].getTag()==2){
                                if(!checkBoxArr[j].getChildByName("Check")||checkBoxArr[j].getChildByName("Check").isSelected()){
                                    selectIndexArr[i][j]=checkBoxArr[j]._nowSelectIndex;
                                }else{
                                    selectIndexArr[i][j]=0;
                                }
                            }else if(checkBoxArr[j].getTag()==4){
                                if(!checkBoxArr[j].getChildByName("Check"))continue;
                                if(checkBoxArr[j].getChildByName("Check").isSelected()){
                                    selectIndexArr[i][j]=ccui.helper.seekWidgetByName(checkBoxArr[j],"editBox").getString();
                                }else{
                                    selectIndexArr[i][j]=0;
                                }
                            }else if(checkBoxArr[j].getTag()==5){
                                    selectIndexArr[i]=checkBoxArr[j].selectArr;
                            }
                        }
                    }
                    _this._btnOkCallBack(selectIndexArr);
            }
        });
    },
    //注册事件
    setGameType:function (_index,clubid,$clubRoomIndex) {
        this.isclubid = 0;
        if(clubid > 0) this.isclubid = clubid;
        if($clubRoomIndex > 0)this.clubRoomIndex = $clubRoomIndex;
        this._init(_index);
        //if(_index==4){
        //    this.game.uimgr.showui("gameclass.msgboxui");
        //    this.game.uimgr.uis["gameclass.msgboxui"].setString("游戏开发中!!");
        //    ccui.helper.seekWidgetByName(this.node, "okBtn").setVisible(false);
        //    return;
        //}
        if(_index === 7) {
            ccui.helper.seekWidgetByName(this.node,"checkbtn").addTouchEventListener(function(sender,type){
                switch (type) {
                    case ccui.Widget.TOUCH_BEGAN:
                        sender.getChildByName("tips").setVisible(true);
                        break;
                    case ccui.Widget.TOUCH_ENDED:
                        sender.getChildByName("tips").setVisible(false);
                        break;
                    case ccui.Widget.TOUCH_CANCELED:
                        sender.getChildByName("tips").setVisible(false);
                        break;
                }
            })
        }
        var _this=this;
        this.nowWanFaIndex=_index;
        this.defaultSelectArr=this.totalConfig[_index];
        this.beiShuIndexArr=[];
        this.localStorageHead=this.totalLocalStorageHead+_index;
        var _childPanel=ccui.helper.seekWidgetByName(this.node,"panelLayer").getChildren();

        for(var i=0;i<_childPanel.length;i++){
            _childPanel[i].setVisible(false);
        }
        this.nowPanel=_childPanel[0];
        this.nowPanel.setVisible(true);
        var _btnChildArr=ccui.helper.seekWidgetByName(this.nowPanel,"ListView_1").getChildren();
        var _panelChildArr=ccui.helper.seekWidgetByName(this.nowPanel,"rulePanel").getChildren();
        for(var i=0;i<_btnChildArr.length;i++){
            _btnChildArr[i].addTouchEventListener(this.btnCallBack,this);
        }
        for(var i=0;i<_panelChildArr.length;i++){
            var _everyPanelArr=_panelChildArr[i].getChildren();
            var _lostrogeStr=cc.sys.localStorage.getItem(this.localStorageHead+"selectBox"+i+"IndexObj");
           if(!_lostrogeStr){
                cc.sys.localStorage.setItem(this.localStorageHead+"selectBox"+i+"IndexObj",JSON.stringify(this.defaultSelectArr[i]));
            }
            for(var j=0;j<_everyPanelArr.length;j++){
                var touchPanelCallBoxCallPanel=ccui.helper.seekWidgetByName(_everyPanelArr[j],"touchPanelCallBoxCallPanel");
                if(touchPanelCallBoxCallPanel){
                    var touchPanelCallBoxCallPanelArr=touchPanelCallBoxCallPanel.getChildren();
                    for(var m=0;m<touchPanelCallBoxCallPanelArr.length;m++){
                        var _itemArr=touchPanelCallBoxCallPanelArr[m].getChildByName("bg").getChildren();
                        for(var k=0;k<_itemArr.length;k++){
                            _itemArr[k].addTouchEventListener(this.checkBoxCallBack.bind(this));
                        }
                        touchPanelCallBoxCallPanelArr[m].setVisible(false);
                        touchPanelCallBoxCallPanelArr[m]._itemArr=_itemArr;
                        touchPanelCallBoxCallPanelArr[m]._everyPanelArr=_everyPanelArr;
                        touchPanelCallBoxCallPanelArr[m].addTouchEventListener(function(sender,type){
                            switch (type) {
                                case ccui.Widget.TOUCH_ENDED:
                                    var returnArr=[];
                                    var _itemArr=sender._itemArr;
                                    var _everyPanelArr=sender._everyPanelArr;
                                    for(var j=0;j<_itemArr.length;j++) {
                                        if (_itemArr[j].getTag() == 0 || _itemArr[j].getTag() == 1) {
                                            if (_itemArr[j].getChildByName("Check").isSelected()) {
                                                returnArr[j] = 1;
                                            } else {
                                                returnArr[j] = 0;
                                            }
                                        }
                                    }
                                    _everyPanelArr[sender.getTag()].getChildren()[0].selectArr=returnArr;
                                    sender.setVisible(false);
                                    var _checkBoxArr=sender.getChildByName("bg").getChildren();
                                    var _str="";
                                    var length=0;
                                    for(var i=0;i<_checkBoxArr.length;i++){
                                        if(_checkBoxArr[i].getChildByName("Check").isSelected()){
                                            if(length==0){
                                                _str=_checkBoxArr[i].getChildByName("TextLabel").getString();
                                            }else if(length == _checkBoxArr.length-1){
                                                _str="全部选择";
                                            } else{
                                                _str="部分选择";
                                            }
                                            length++;
                                        }
                                    }
                                    ccui.helper.seekWidgetByName( _panelChildArr[_this.nowSelectIndex].getChildren()[sender.getTag()].getChildren()[0],"ruleText").setString(_str);
                                    break;
                            }

                        })
                    }
                }
                if(_everyPanelArr[j].getName()=="touchPanelCallBoxCallPanel") continue;
                var _checkBoxArr = _everyPanelArr[j].getChildren();
                if(_index == 8 && clubid > 0 && j == 1) _checkBoxArr[1].setVisible(false);
                for (var k = 0; k < _checkBoxArr.length; k++) {
                    //cc.log("==========" + _checkBoxArr[k].getTag());
                    if(_checkBoxArr[k].getTag()==10){
                        _checkBoxArr[k].addTouchEventListener(function(sender,type){
                            switch (type) {
                                case ccui.Widget.TOUCH_BEGAN:
                                    sender.getChildByName("tips").setVisible(true);
                                    break;
                                case ccui.Widget.TOUCH_ENDED:
                                     sender.getChildByName("tips").setVisible(false);
                                    break;
                                case ccui.Widget.TOUCH_CANCELED:
                                    sender.getChildByName("tips").setVisible(false);
                                    break;
                            }
                        })
                        continue;
                    }
                    if(_checkBoxArr[k].getTag()==5){
                        _checkBoxArr[k].parentIndex=j;
                        _checkBoxArr[k].addTouchEventListener(function(sender,type){
                            switch (type) {
                                case ccui.Widget.TOUCH_ENDED:
                                   var callBaclPanel = ccui.helper.seekWidgetByName(_panelChildArr[_this.nowSelectIndex],"touchPanelCallBoxCallPanel");
                                    callBaclPanel.setVisible(true)
                                   ccui.helper.seekWidgetByName(callBaclPanel,"touchPanelCallBox"+sender.parentIndex).setVisible(true);
                                    break;
                            }
                        })
                    }
                    if(_checkBoxArr[k].getChildByName("Check")){
                        _checkBoxArr[k].addClickEventListener(this.checkBoxCallBack.bind(this));
                        this.changeCheckState(false,_checkBoxArr[k]);
                    }
                    if(_checkBoxArr[k].getChildByName("TextLabel")) _checkBoxArr[k].getChildByName("TextLabel").setColor(this.labelUnSelectColor);
                    if(_checkBoxArr[k].getTag()==0||_checkBoxArr[k].getTag()==1){
                    }else if(_checkBoxArr[k].getTag()==2){
                        this.changeCheckState(false,_checkBoxArr[k]);
                        ccui.helper.seekWidgetByName(_checkBoxArr[k],"btn_add").addClickEventListener(this.btnChangeBei.bind(this));
                        ccui.helper.seekWidgetByName(_checkBoxArr[k],"btn_sub").addClickEventListener(this.btnChangeBei.bind(this));
                    }else if(_checkBoxArr[k].getTag()==4){
                        var _editBox=ccui.helper.seekWidgetByName(_checkBoxArr[k],"editBox");
                        _editBox.addEventListener(function(sender,eventType){
                            //cc.log(eventType);
                            if(eventType==ccui.TextField.EVENT_ATTACH_WITH_IME){
                                that.checkBoxCallBack(sender.getParent().getParent());
                            }
                            if(eventType==ccui.TextField.EVENT_DELETE_BACKWARD){
                                if(!Number(sender.getString())||Number(sender.getString())>99999999){
                                    cc.log("输入有误!");
                                    sender.setString("");
                                }else if(that.nowSelectIndex==3&&Number(sender.getString())<10000000){
                                    cc.log("输入有误!");
                                    sender.setString("");
                                }else{
                                    var otherNum=that.editBoxGetNumByInputNum(Number(sender.getString()));
                                    var otherStr=ccui.helper.seekWidgetByName(sender.getParent().getParent(),"otherLabel");
                                    if(otherStr)
                                        otherStr.setString(otherNum+otherStr.getString());
                                }
                            }
                        },this);
                    }
                }
            }
        }
        this.showGame();
    },
    editBoxGetNumByInputNum:function(_num){

    },
    saveData:function (_index,Data) {
        cc.sys.localStorage.setItem(this.localStorageHead+"selectBtnIndex",_index);
        cc.sys.localStorage.setItem(this.localStorageHead+"selectBox"+_index+"IndexObj",Data);
    },
    //左侧玩法按钮的回调事件
    btnCallBack:function (sender,type) {
        if(type==ccui.Widget.TOUCH_ENDED){
            mod_sound.playeffect(g_music["selectItemMp3"], false);
            var _btnChildArr=ccui.helper.seekWidgetByName(this.nowPanel,"ListView_1").getChildren();
            var _index=_btnChildArr.indexOf(sender);
            this._changeBtnShow(_index);
        }
    },
    btnChangeBei:function(sender){
        mod_sound.playeffect(g_music["selectItemMp3"], false);
        var name=sender.getName();
        if(name=="btn_add"){
            this.beiShuIndexArr[this.nowWanFaIndex][this.nowSelectIndex]++;
            if(this.beiShuIndexArr[this.nowWanFaIndex][this.nowSelectIndex]>this.beiShuArr[this.nowWanFaIndex][this.nowSelectIndex].length){
                this.beiShuIndexArr[this.nowWanFaIndex][this.nowSelectIndex]-=this.beiShuArr[this.nowWanFaIndex][this.nowSelectIndex].length;
            }
        }else if(name=="btn_sub"){
            this.beiShuIndexArr[this.nowWanFaIndex][this.nowSelectIndex]--;
            if(this.beiShuIndexArr[this.nowWanFaIndex][this.nowSelectIndex]<=0){
                this.beiShuIndexArr[this.nowWanFaIndex][this.nowSelectIndex]+=this.beiShuArr[this.nowWanFaIndex][this.nowSelectIndex].length;
            }
        }
        sender.getParent().getChildByName("num").setString(this.beiShuArr[this.nowWanFaIndex][this.nowSelectIndex][this.beiShuIndexArr[this.nowWanFaIndex][this.nowSelectIndex]-1]);
        sender.getParent()._nowSelectIndex=this.beiShuIndexArr[this.nowWanFaIndex][this.nowSelectIndex];
    },
    _changeBtnShow:function (_index) {
        var _btnChildArr=ccui.helper.seekWidgetByName(this.nowPanel,"ListView_1").getChildren();
        var _panelChildArr=ccui.helper.seekWidgetByName(this.nowPanel,"rulePanel").getChildren();
        if(!_panelChildArr[_index]){
            this.game.uimgr.showui("gameclass.msgboxui");
            this.game.uimgr.uis["gameclass.msgboxui"].setString("游戏开发中!");
            return;
        }
        for(var i=0;i<_btnChildArr.length;i++){
            _btnChildArr[i].getChildByName("tb_normal").setVisible(true);
            _btnChildArr[i].getChildByName("tb_select").setVisible(false)
        }
        for(var i=0;i<_panelChildArr.length;i++){
            _panelChildArr[i].setVisible(false);
        }
        _btnChildArr[_index].getChildByName("tb_normal").setVisible(false);
        _btnChildArr[_index].getChildByName("tb_select").setVisible(true);
        this.nowSelectIndex=_index;
        _panelChildArr[_index].setVisible(true);
    },
    checkBoxCallBack:function (sender,type) {
        if((type||type==0)&&type!=ccui.Widget.TOUCH_ENDED)return;
        mod_sound.playeffect(g_music["selectItemMp3"], false);
        var childArr = sender.getParent().getChildren();
        if (sender.getTag() == 1){
            if(sender.getChildByName("Check").isSelected()){
                this.changeCheckState(false,sender);
            }else{
                this.changeCheckState(true,sender);
            }
        }else{
            for (var i = 0; i < childArr.length; i++) {
                this.changeCheckState(false,childArr[i]);
            }
            this.changeCheckState(true,sender);
            //this.teshucheckout(sender);
        }
    },
    teshucheckout:function(sender){
        //cc.log(this.nowSelectIndex);
        //if(this.nowWanFaIndex == 2 && this.nowSelectIndex > 0){
        //    if(sender.getParent().getString().trim()=="人数"){
        //        var flag = false;
        //        if(sender.getChildByName("Check").isSelected()){
        //            if(sender.getChildByName("TextLabel").getString().trim() == "5人"){
        //                flag = true;
        //            }
        //        }
        //        var jushuParent = sender.getParent().getParent().getChildren();
        //        var jushuChildren = jushuParent[0].getChildren();
        //        jushuChildren[3].setVisible(flag);
        //    }
        //}
        // if(this.nowWanFaIndex == 8 && sender.getTag() == 0){
        //     var _fangkaNum = 1;
        //     if(sender.getChildByName("Check").isSelected()){
        //         if(sender.getChildByName("TextLabel").getString().trim() == "20局"){
        //             _fangkaNum = 2;
        //         }
        //     }
        //     if(sender.getParent().getString().trim()=="选择局数"){
        //         var fangkaParent = sender.getParent().getParent().getChildren();
        //         var fangkaChildren = fangkaParent[1].getChildren()
        //         for (var i = 0; i < fangkaChildren.length; i++) {
        //             var str = "";
        //             if(i == 0) str = "房主支付 (          x"+3*_fangkaNum+")";
        //             else str = "AA支付(每人          x"+1*_fangkaNum+")";
        //             fangkaChildren[i].getChildByName("TextLabel").setString(str);
        //         }
        //     }
        // }
    },
    //设置初始化显示
    showGame:function(){
        var _index=cc.sys.localStorage.getItem(this.localStorageHead+"selectBtnIndex");
        var _panelChildArr=ccui.helper.seekWidgetByName(this.nowPanel,"rulePanel").getChildren();
        if(!_index){
            cc.sys.localStorage.setItem(this.localStorageHead+"selectBtnIndex",0);
            _index=0;
        }
        this._changeBtnShow(_index);
        for(var i=0;i<_panelChildArr.length;i++){
            var _selectObj=JSON.parse(cc.sys.localStorage.getItem(this.localStorageHead+"selectBox"+i+"IndexObj"));
            var _everyPanelArr=_panelChildArr[i].getChildren();
            for(var j=0;j<_everyPanelArr.length;j++){
                if(_everyPanelArr[j].getName()=="touchPanelCallBoxCallPanel") continue;
                var _checkBoxArr=_everyPanelArr[j].getChildren();
                if(_checkBoxArr[0].getTag()==5){
                    var target=_checkBoxArr[0];
                    _checkBoxArr[0].selectArr=_selectObj[j];
                    _checkBoxArr=ccui.helper.seekWidgetByName(_panelChildArr[i],"touchPanelCallBox"+j).getChildByName("bg").getChildren();
                    var _str="";
                    var length=0;
                    for(var h=0;h<_selectObj[j].length;h++){
                        if(_selectObj[j][h]){
                            if(length==0){
                                _str=_checkBoxArr[h].getChildByName("TextLabel").getString();
                            }else if(length == _checkBoxArr.length-1){
                                _str="全部选择";
                            } else{
                                _str="部分选择";
                            }
                            length++;
                        }
                    }
                    ccui.helper.seekWidgetByName(target,"ruleText").setString(_str);
                }
                for(var m=0;m<_checkBoxArr.length;m++){
                    if(!_selectObj[j][m]){
                        this.changeCheckState(false,_checkBoxArr[m]);
                        continue;
                    }
                    this.changeCheckState(true,_checkBoxArr[m]);
                    if(_checkBoxArr[m].getTag()==2){
                        this.beiShuIndexArr[this.nowWanFaIndex]=[];
                        this.beiShuIndexArr[this.nowWanFaIndex][this.nowSelectIndex]=_selectObj[j][m];
                        _checkBoxArr[m]._nowSelectIndex=_selectObj[j][m];
                        ccui.helper.seekWidgetByName(_checkBoxArr[m],"num").setString(this.beiShuArr[this.nowWanFaIndex][this.nowSelectIndex][this.beiShuIndexArr[this.nowWanFaIndex][this.nowSelectIndex]-1])
                    }else if(_checkBoxArr[m].getTag()==4){
                        ccui.helper.seekWidgetByName(_checkBoxArr[m],"editBox").setString(_selectObj[j][m]);
                        var _numstr=this.editBoxGetNumByInputNum(_selectObj[j][m]);
                        if(ccui.helper.seekWidgetByName(_checkBoxArr[m],"otherLabel"))
                            ccui.helper.seekWidgetByName(_checkBoxArr[m],"otherLabel").setString(_numstr+ccui.helper.seekWidgetByName(_checkBoxArr[m],"otherLabel").getString());
                    }
                }
            }
        }
    },
    changeCheckState:function (_isshow,_sender) {
        if(_isshow) var _labelColor=this.labelSelectColor;
        else _labelColor=this.labelUnSelectColor;

        //if(this.nowWanFaIndex==0){
        //    var panel=_sender.getParent().getParent();
        //    var panelItem=_sender.getParent();
        //    var _selectItemIndex=panel.getChildren().indexOf(panelItem);
        //    if(_selectItemIndex==2){
        //        var _selectCheckIndex=panelItem.getChildren().indexOf(_sender);
        //        if(_selectCheckIndex  == 0 || _selectCheckIndex  == 1){
        //            panelItem.getChildren()[2].getChildByName("Check").setSelected(true);
        //            panelItem.getChildren()[2].getChildByName("TextLabel").setColor(this.labelSelectColor);
        //            panelItem.getChildren()[3].getChildByName("Check").setSelected(true);
        //            panelItem.getChildren()[3].getChildByName("TextLabel").setColor(this.labelSelectColor);
        //        }else{
        //            if(panelItem.getChildren()[0].getChildByName("Check").isSelected() || panelItem.getChildren()[1].getChildByName("Check").isSelected())
        //                return;
        //        }
        //    }
        //}
        if(_sender.getChildByName("Check"))_sender.getChildByName("Check").setSelected(_isshow);
        if(_sender.getChildByName("TextLabel"))_sender.getChildByName("TextLabel").setColor(_labelColor);
        //cc.log(this.nowSelectIndex, this.nowWanFaIndex)
        //if(this.nowSelectIndex==0&&this.nowWanFaIndex==0){
        if(this.nowWanFaIndex==0){
            var panel=_sender.getParent().getParent();
            var panelItem=_sender.getParent();
            var _selectItemIndex=panel.getChildren().indexOf(panelItem);
            var _selectCheckIndex=panelItem.getChildren().indexOf(_sender);
            if(_selectItemIndex==4&&_isshow){
                panel.getChildren()[5].setVisible(_selectCheckIndex);
            }
        }else if(this.nowSelectIndex==0&&this.nowWanFaIndex==6){
            var panel=_sender.getParent().getParent();
            var panelItem=_sender.getParent();
            var _selectItemIndex=panel.getChildren().indexOf(panelItem);
            var _selectCheckIndex=panelItem.getChildren().indexOf(_sender);
            if(_selectItemIndex==2&&_isshow){
                panel.getChildren()[3].setVisible(_selectCheckIndex);
            }
        }else if(this.nowWanFaIndex==4){
            var panel=_sender.getParent().getParent();

            var _IndexSe = 6;//! 取不为0和1
            var panelchren=_sender.getParent().getParent().getChildren();
            if(panelchren.length==4){//! 经典玩法
                var itemChilrenSe = panelchren[1].getChildren();//! 人数选择
                for (var k = 0; k < 2; k++) {
                    if (itemChilrenSe[k].getChildByName("Check").isSelected()) {
                        _IndexSe = k;
                        break;
                    }
                }
            }

            if(_IndexSe==1){
                panel.getChildren()[3].getChildren()[0].setEnabled(false);
                panel.getChildren()[3].getChildren()[0].setBright(false);
                panel.getChildren()[3].getChildren()[0].getChildByName("Check").setSelected(false);
                panel.getChildren()[3].getChildren()[0].getChildByName("TextLabel").setColor(this.labelUnSelectColor);
            }else if(_IndexSe==0){
                panel.getChildren()[3].getChildren()[0].setEnabled(true);
                panel.getChildren()[3].getChildren()[0].setBright(true);
            }
        }
        this.teshucheckout(_sender);
    },
    destroy:function () {
        // cc.log("create roomUi destroy...");
    }
});