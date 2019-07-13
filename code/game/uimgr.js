
gameclass.uimgr  = cc.Class.extend({
    uis:null,
    game:null,
    loading:false,
    ctor:function () {
        this.uis = {};
    },
    setgame:function(_game){
        this.game = _game;
    }
});

gameclass.uimgr.prototype.gettmepparent = function(){
    return this._gettmepparent;
};

gameclass.uimgr.prototype.showload = function(show){
    if(this.loading == show) {
        return;
    }

    this.loading = show;
    if(show) {
        var animlayer = new ccui.Layout();
        animlayer.setAnchorPoint(0.5, 0.5);
        animlayer.setContentSize(1136, 640);
        animlayer.setPosition(1136 / 2, 320);
        animlayer.setTouchEnabled(true);

        var loadingAnim = new sp.SkeletonAnimation(res.loadingJson, res.loadingAtlas);
        loadingAnim.setAnimation(0, 'animation', true);
        loadingAnim.setAnchorPoint(0.5, 0.5);
        loadingAnim.setPosition(1136 / 2, 320);
        animlayer.addChild(loadingAnim);
        animlayer.setTag(9999);
        this._gettmepparent.addChild(animlayer);
    } else {
        this._gettmepparent.removeChildByTag(9999);
    }
};

gameclass.uimgr.prototype.showui = function(name,close,parent,screen,$uiName){//screen:0或undefined横屏 1竖屏 2不变(跟原先一样，之前是横屏就是横屏，竖屏就是竖屏)
    cc.log("========",name);
    var uiName = name;
    if($uiName){
        uiName = $uiName;
    }
    if(screen == null) {
        gameclass.mod_platform.swicthscreen(gameclass.mod_platform.screenType);
    } else {
        gameclass.mod_platform.swicthscreen(screen);
    }
    this._gettmepparent = parent;
    if (this._gettmepparent == null) {
        this._gettmepparent = cc.director.getRunningScene();
    }

    var _ui = this.uis[uiName];
    if (_ui != null && close == false){
        return _ui;
    }
    if (_ui != null && close != false){
        this.closeui(uiName);
    }
    /*  var ui =
    var s = "var temp = new " + name + "();" +
        "game.uimgr.gettmepparent().addChild(temp);" +
        "uimgr.uis[\"" + name + "\"] = temp;";*/
    var ui = eval("new " + name + "();");
    this.gettmepparent().addChild(ui);
    this.uis[uiName] = ui;
    this.uis[uiName].setgame(this.game);
    this.uis[uiName].show();
    return this.uis[uiName];
};

gameclass.uimgr.prototype.createnode = function(filename,resize,showType,centernodename,func){
    // cc.log(filename);
    var ret = null;
    /*if(cc.sys.isNative) {
        filename = filename.replace(".json",".csb");
        //ret = ccs.GUIReader.getInstance().widgetFromBinaryFile(filename);
        ret = ccs.CSLoader.createNode(filename);
    }else*/
        ret = ccs.csLoader.createNode(filename);

    if(true == resize){
        var size=  cc.director.getVisibleSize();

        ret.setContentSize(size.width,size.height);

        ccui.helper.doLayout(ret);

        if(centernodename != null){
            var centernode = ret.getChildByName(centernodename);
            this.centernode(centernode);
        }
    }

    if (ret != null)
    {
        showType = showType || 0;
        var ani = null;
        if(showType){
            ret.setAnchorPoint(0.5,0.5);
            ret.setScale(0.3);
            //ani = cc.scaleTo(0.1,1,1);
            ani = cc.sequence(cc.scaleTo(0.1, 1.1, 1.1),cc.scaleTo(0.05, 1, 1),cc.callFunc(function(sender) {
                if(func != null) {
                    func();
                }
            }));
            ret.setPosition(cc.winSize.width/2,cc.winSize.height/2);
            ret.runAction((ani));
        } else{
            //ret.setOpacity(128);
            //ani = cc.sequence(cc.fadeTo(0, 128),cc.fadeTo(0.3, 255),cc.callFunc(function(sender){
            //
            //}));
        }
        //ret.runAction((ani));
        ret.setTag(10000);
    }
    return ret;
};

gameclass.uimgr.prototype.closeui = function(name, close){
    if(this.uis[name] != null){
        this.closeani(this.uis[name], close);
        this.uis[name] = null;
    }
};

gameclass.uimgr.prototype.closeallui = function(close){
    for(var key in this.uis) {
        if(this.uis[key] == null) {
            continue;
        }
        this.closeani(this.uis[key], close);
        this.uis[key] = null;
    }
};

gameclass.uimgr.prototype.hasui = function(name) {
    return this.uis[name] != null;
};

gameclass.uimgr.prototype.centernode = function (node) {
    if(node == null) {
        cc.log("centernode is null");
        return;
    }
    node.setPosition((cc.winSize.width - node.getContentSize().width)/2,0)
};

gameclass.uimgr.prototype.closeani = function(ui, close){
    ui.destroy();
    ui.removeFromParent();
    //if(close) {
    //    ui.destroy();
    //    ui.getParent().removeChild(ui,false);
    //    return;
    //}
    //
    //var node = ui.getChildByTag(10000);
    //if(node != null){
    //    ui.destroy();
    //    ui.getParent().removeChild(ui,false);
    //    //var ani = cc.sequence(cc.fadeOut(0.3),cc.callFunc(function(sender){
    //    //
    //    //}))
    //    //node.runAction(ani);
    //}else
    //    ui.getParent().removeChild(ui,false);
};

gameclass.uimgr.prototype.updateUIMsg = function(msgtype) {
    for(var key in this.uis) {
        if(this.uis[key] == null) {
            continue;
        }

        if(this.uis[key].updateUIMsg(msgtype)) {
            break;
        }
    }
};

