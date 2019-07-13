/**
 * Created by Administrator on 2017-11-21.
 */

gameclass.report = gameclass.baseui.extend({
    node:null,
    selectType:0,
    btn:null,
    reportUid:null,

    ctor: function () {
        this._super();
        this.btn = [];
    },
    setBaseInfo:function(_uid){
        this.reportUid = _uid;
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.report,true);
        this.addChild(this.node);

        this.inputBox = ccui.helper.seekWidgetByName(this.node,"TextField_1");

        var _this = this;
        gameclass.createbtnpress(this.node, "Panel_1", function () {
            _this.game.uimgr.closeui("gameclass.report");
        });
        this.showStr = ["该玩家与其他玩家斗笼子",""];

        for(var i = 0;i < 2;i++){
            this.btn[i] = ccui.helper.seekWidgetByName(this.node,"btn"+i);
            this.btn[i].index = i;
            this.btn[i].addTouchEventListener(this.myEvent.bind(this));
        }
        this.changeShow();
        
        gameclass.createbtnpress(this.node, "btn_ok", function () {
            _this.game.modmgr.mod_center.reportPlayer(_this.reportUid,_this.selectType,_this.inputBox.getString());
            _this.game.uimgr.showui("gameclass.msgboxui");
            _this.game.uimgr.uis["gameclass.msgboxui"].setString("谢谢您的举报,系统将会核实该玩家的游戏记录");
            _this.game.uimgr.closeui("gameclass.report");
        });
        gameclass.createbtnpress(this.node, "btn_cancell", function () {
            _this.game.uimgr.closeui("gameclass.report");
        });
    },

    myEvent:function(sender,type){
        if(type != ccui.Widget.TOUCH_ENDED) return;
        this.selectType = sender.index;
        this.changeShow();
    },

    changeShow:function(){
        for(var i = 0;i < 2;i++){
            this.btn[i].getChildByName("kuang").setVisible(i==this.selectType);
        }
        this.inputBox.setString(this.showStr[this.selectType]);
    },

});



gameclass.reportTB = gameclass.baseui.extend({
    node:null,
    selectType:0,
    btn:null,
    reportUid:null,

    ctor: function () {
        this._super();
        this.btn = [];
    },
    setBaseInfo:function(_uid){
        this.reportUid = _uid;
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.reportTB,true);
        this.addChild(this.node);

        this.inputBox = ccui.helper.seekWidgetByName(this.node,"TextField_1");

        var _this = this;
        gameclass.createbtnpress(this.node, "Panel_1", function () {
            _this.game.uimgr.closeui("gameclass.reportTB");
        });
        this.showStr = ["该玩家与其他玩家斗笼子",""];

        for(var i = 0;i < 2;i++){
            this.btn[i] = ccui.helper.seekWidgetByName(this.node,"btn"+i);
            this.btn[i].index = i;
            this.btn[i].addTouchEventListener(this.myEvent.bind(this));
        }
        this.changeShow();

        gameclass.createbtnpress(this.node, "btn_ok", function () {
            _this.game.modmgr.mod_center.reportPlayer(_this.reportUid,_this.selectType,_this.inputBox.getString());
            _this.game.uimgr.showui("gameclass.msgboxui");
            _this.game.uimgr.uis["gameclass.msgboxui"].setString("谢谢您的举报,系统将会核实该玩家的游戏记录");
            _this.game.uimgr.closeui("gameclass.reportTB");
        });
        gameclass.createbtnpress(this.node, "btn_cancell", function () {
            _this.game.uimgr.closeui("gameclass.reportTB");
        });
    },

    myEvent:function(sender,type){
        if(type != ccui.Widget.TOUCH_ENDED) return;
        this.selectType = sender.index;
        this.changeShow();
    },

    changeShow:function(){
        for(var i = 0;i < 2;i++){
            this.btn[i].getChildByName("kuang").setVisible(i==this.selectType);
        }
        this.inputBox.setString(this.showStr[this.selectType]);
    },

});
