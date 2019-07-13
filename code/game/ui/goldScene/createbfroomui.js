/**
 * Created by yang on 2016/11/9.
 */
//单选item tag设置为0 复选设置为1 +—类型的设置为2 杂项设置为100
// 下拉窗的checkBox设置为3 自定义输入的设置为4
gameclass.createbfroomui = gameclass.baseui.extend({
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
    //gameid:null,
    isclubid:0,
    clubRoomIndex:0,
    ctor: function () {
        this._super();
        this.isclubid = 0;
        this.clubRoomIndex = 0;
        this.totalLocalStorageHead="yyjp";
        //this.gameid=[[gameclass.gameptj,gameclass.gameptj],
        //    [gameclass.gameszp,gameclass.gameszp_fk],
        //    [gameclass.gameniuniu,gameclass.gamejxnn,gameclass.gamejxnn,gameclass.gamejxnn,gameclass.gamejxnn],
        //    [gameclass.gameddz,gameclass.gamelzddz],
        //    [],
        //    [gameclass.gamesdb],
        //    [gameclass.gamettz],
        //    [gameclass.gamenxs],
        //    [gameclass.gamesznys,gameclass.gamegdnys,gameclass.gamezynys,gameclass.gamenys,gameclass.gamebrnys],
        //[],
        //[gameclass.gamenys]]
        this.lastRoomStorage="yyjpbf";
        this.labelSelectColor=cc.color(250,113,230);
        this.labelUnSelectColor=cc.color(255,255,255);
        this.beiShuIndexArr=[];
        this.nowPanel=null;

        //初始值配置文件有时间再写换成表格配置
        this.totalConfig=[
            [
                [[0,0,1],[1,0],[1,0,0],[0,0,1],[0,0,0,1],[1,0,0,0,0]],
            ]
        ];
        //用来存tag为2的item 的可选数组
        this.beiShuArr=[,,,,,,,[[10,20,30,40,50,60,70,80,90,100,150,200]]]
    },
    show:function(){
        //param1 type=1000
        //10000000 const TYPE_GOLDZJH_BP = 0  //! 0比大小  1比花色   2全比
        //1000000 const TYPE_GOLDZJH_BZ = 1  //! 豹子是否额外奖励 0否 1是
        //100000 const TYPE_GOLDZJH_SB = 2  //! 比牌双倍开  0否  1是
        //10000 const TYPE_GOLDZJH_PDD = 3 //! 拼到底   0否  1是
        //1000 const TYPE_GOLDZJH_FD = 4  //! 封顶   0,5轮  1,10轮   2,15轮
        //100 const TYPE_GOLDZJH_BL = 5  //! 比牌轮数 0,1轮   1,2轮   2,3轮
        //10 const TYPE_GOLDZJH_MP = 6  //! 闷牌轮数  0不闷  1,2轮   2,3轮   3,4轮
        //0 const TYPE_GOLDZJH_DF = 7  //! 0,50  1,100  2,200   3,500    4,1000(个位↑)
        //const TYPE_GOLDZJH_MAX = 8
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
        this._parseRule(selectIndexArr);

        var _obj={panel:this.nowWanFaIndex,item:this.nowSelectIndex};
        cc.sys.localStorage.setItem(this.lastRoomStorage,JSON.stringify(_obj));
    },
    //规则解析
    _parseRule:function(selectIndexArr){
       var _gameType=this.nowWanFaIndex; //游戏大类型 比如牛牛
       //var _itemType=this.nowSelectIndex;//游戏小类型 比如看牌抢庄
        var roomId=gameclass.gameszpbaofang;//this.gameid[_gameType][_itemType];
        var param1=null;
        var findFristNumInArr=function(_arr){
            for(var i=0;i<_arr.length;i++){
                if(_arr[i]) return i;
            }
        }
        if(_gameType==0){
            var bip = 1;
            if(findFristNumInArr(selectIndexArr[1]) == 1) bip = 0;
            param1 = findFristNumInArr(selectIndexArr[0])*1000+bip*100000+findFristNumInArr(selectIndexArr[1])*10000+findFristNumInArr(selectIndexArr[2])*10000000+
                    findFristNumInArr(selectIndexArr[3])*100+findFristNumInArr(selectIndexArr[4])*10+findFristNumInArr(selectIndexArr[5]);
        }
        cc.log("param1=" + param1);
        this.game.modmgr.mod_login.createroom(roomId,1,param1,0);
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
    _init:function(_index){
        var _this = this;
        this.node = this.game.uimgr.createnode(res.creatRoombaofang,true);
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
                    _this.game.uimgr.closeui("gameclass.createbfroomui");
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
                    })));
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
                                }else{
                                    selectIndexArr[i][j]=0;
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
    setGameType:function (_index) {
        var _this=this;
        this.isclubid = 0;
        this._init(_index);
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
                    if(_checkBoxArr[k].getChildByName("Check")){
                        _checkBoxArr[k].addClickEventListener(this.checkBoxCallBack.bind(this));
                        this.changeCheckState(false,_checkBoxArr[k]);
                    }
                    if(_checkBoxArr[k].getChildByName("TextLabel")) _checkBoxArr[k].getChildByName("TextLabel").setColor(this.labelUnSelectColor);
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
        }
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

    },
    destroy:function () {
        // cc.log("create roomUi destroy...");
    }
});


//! -----------------------------------------------------------------------------------------

//单选item tag设置为0 复选设置为1 +—类型的设置为2 杂项设置为100
// 下拉窗的checkBox设置为3 自定义输入的设置为4
gameclass.createbfroomuinys = gameclass.baseui.extend({
    node:null,
    labelSelectColor:null,
    labelUnSelectColor:null,
    beiShuArr:null,
    ctor: function () {
        this._super();
        this.labelSelectColor=cc.color(250,113,230);
        this.labelUnSelectColor=cc.color(255,255,255);

        //初始值配置文件有时间再写换成表格配置
        this.totalConfig=[
            [
                [[0,0,1],[1,0,0,0,0]],
            ]
        ];
        //用来存tag为2的item 的可选数组
        this.beiShuArr=[,,,,,,,[[10,20,30,40,50,60,70,80,90,100,150,200]]]
    },
    show:function(){
    },
    _btnOkCallBack:function(selectIndexArr){
        mod_sound.playeffect(g_music["selectItemMp3"], false);
        // var _obj=null;
        //
        // //! 取出
        // var localStr= cc.sys.localStorage.getItem("nys");//取本地缓存，sys系统数据库，localStorage本地缓存区
        // if(localStr) _obj=JSON.parse(localStr);
        //
        // //! 取默认的
        // if(_obj){
        //     selectIndexArr=JSON.parse(cc.sys.localStorage.getItem("nysObj"));
        // }
        //
        // cc.sys.localStorage.setItem("nysObj",JSON.stringify(selectIndexArr));
        //
        // //! 设置
        // var _obj={panel:0,item:0};
        // cc.sys.localStorage.setItem("nys",JSON.stringify(_obj));

        this._parseRule(selectIndexArr);
    },
    //规则解析
    _parseRule:function(selectIndexArr){
     //   var roomId=gameclass.gamenys;
        var param1=null;
        var findFristNumInArr=function(_arr){
            cc.log("___@______",_arr.length);
            for(var i=0;i<_arr.length;i++){
                cc.log("_________@",_arr[i]);
                if(_arr[i]){
                    cc.log("@_________",i);
                    return i;
                }
            }
        }
        param1 = findFristNumInArr(selectIndexArr[0])*1000+findFristNumInArr(selectIndexArr[1])*10000;
cc.log("1111111111111111",selectIndexArr[0])
        if(selectIndexArr[0][0]==1){
            var roomId= 65;
        }else  if(selectIndexArr[0][1]==1){
            var roomId =67;
        }else {
            var roomId =66;
        }
        cc.log("param1=",param1);
        param1=0;
        this.game.modmgr.mod_login.createroom(roomId,1,param1,0);
    },
    _init:function(){
        var _this = this;
        this.node = this.game.uimgr.createnode(res.creatRoombaofangnys,true);
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
                    _this.game.uimgr.closeui("gameclass.createbfroomuinys");
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
                    })));
                    var panel=ccui.helper.seekWidgetByName(_this.node,"bxwf");
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
                                }else{
                                    selectIndexArr[i][j]=0;
                                }
                            }
                        }
                    }
                    cc.log("==========",selectIndexArr);
                    _this._btnOkCallBack(selectIndexArr);
            }
        });
    },
    //注册事件
    setGameType:function () {
        var _this=this;
        this._init();

            var _everyPanelArr=ccui.helper.seekWidgetByName(this.node,"bxwf").getChildren();
            var _lostrogeStr=cc.sys.localStorage.getItem("nysObj");
            if(!_lostrogeStr){
                cc.sys.localStorage.setItem("nysObj",JSON.stringify(this.totalConfig[0][0]));
            }
            for(var j=0;j<_everyPanelArr.length;j++){
                if(_everyPanelArr[j].getName()=="touchPanelCallBoxCallPanel") continue;
                var _checkBoxArr = _everyPanelArr[j].getChildren();
                for (var k = 0; k < _checkBoxArr.length; k++) {
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
                    if(_checkBoxArr[k].getChildByName("Check")){
                        _checkBoxArr[k].addClickEventListener(this.checkBoxCallBack.bind(this));
                        this.changeCheckState(false,_checkBoxArr[k]);
                    }
                    if(_checkBoxArr[k].getChildByName("TextLabel")) _checkBoxArr[k].getChildByName("TextLabel").setColor(this.labelUnSelectColor);
                }
            }
        this.showGame();
    },

    _changeBtnShow:function () {
        var _btnChildArr=ccui.helper.seekWidgetByName(this.node,"ListView_1").getChildren();
        var _panelChildArr=ccui.helper.seekWidgetByName(this.node,"rulePanel").getChildren();
        if(!_panelChildArr[0]){
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
        _btnChildArr[0].getChildByName("tb_normal").setVisible(false);
        _btnChildArr[0].getChildByName("tb_select").setVisible(true);
        _panelChildArr[0].setVisible(true);
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
        }
    },
    //设置初始化显示
    showGame:function(){
        var nnnnn=ccui.helper.seekWidgetByName(this.node,"bxwf");
        this._changeBtnShow();
            var _selectObj=JSON.parse(cc.sys.localStorage.getItem("nysObj"));
            var _everyPanelArr=nnnnn.getChildren();
            for(var j=0;j<_everyPanelArr.length;j++){
                if(_everyPanelArr[j].getName()=="touchPanelCallBoxCallPanel") continue;
                var _checkBoxArr=_everyPanelArr[j].getChildren();
                if(_checkBoxArr[0].getTag()==5){
                    var target=_checkBoxArr[0];
                    _checkBoxArr[0].selectArr=_selectObj[j];
                    _checkBoxArr=ccui.helper.seekWidgetByName(nnnnn,"touchPanelCallBox"+j).getChildByName("bg").getChildren();
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
                        _checkBoxArr[m]._nowSelectIndex=_selectObj[j][m];
                        ccui.helper.seekWidgetByName(_checkBoxArr[m],"num").setString(this.beiShuArr[0][0][_selectObj[j][m]-1])
                    }else if(_checkBoxArr[m].getTag()==4){
                        ccui.helper.seekWidgetByName(_checkBoxArr[m],"editBox").setString(_selectObj[j][m]);
                        if(ccui.helper.seekWidgetByName(_checkBoxArr[m],"otherLabel"))
                            ccui.helper.seekWidgetByName(_checkBoxArr[m],"otherLabel").setString(ccui.helper.seekWidgetByName(_checkBoxArr[m],"otherLabel").getString());
                    }
                }
            }
    },
    changeCheckState:function (_isshow,_sender) {
        if(_isshow) var _labelColor=this.labelSelectColor;
        else _labelColor=this.labelUnSelectColor;
        if(_sender.getChildByName("Check"))_sender.getChildByName("Check").setSelected(_isshow);
        if(_sender.getChildByName("TextLabel"))_sender.getChildByName("TextLabel").setColor(_labelColor);

    },
    destroy:function () {
        // cc.log("create roomUi destroy...");
    }
});
