var g_will_room = 0;  //! 将要进入的房间
var g_islogin = false; //! 是否登陆
var g_isgame = false;  //! 是否正在游戏
var g_iscuopai = true; //! 是否能搓牌

var g_func_joinRoom = function(roomid){
    if(g_isgame) {
        return;
    }

    if(!g_islogin) {
        g_will_room = Number(roomid);
        return;
    }

    if(gameclass.mod_platform.game.uimgr.hasui("gameclass.hallui")) {  //! 在大厅里,尝试进入游戏
        //! 先关闭可能打开的UI
        gameclass.mod_platform.game.uimgr.closeui("gameclass.createroomui");
        gameclass.mod_platform.game.uimgr.closeui("gameclass.buycardui");
        gameclass.mod_platform.game.uimgr.closeui("gameclass.jionroomui");
        gameclass.mod_platform.game.uimgr.closeui("gameclass.settingui");
        gameclass.mod_platform.game.uimgr.closeui("gameclass.ruleui");
        gameclass.mod_platform.game.uimgr.closeui("gameclass.inputcode2");
        gameclass.mod_platform.game.uimgr.closeui("gameclass.msgboxui");

        gameclass.mod_platform.game.modmgr.mod_login.joinwithroomid(Number(roomid));
    }
};

var AssetsManager = cc.Scene.extend({
    _failCount : 0,
    _am:null,
    _progress:null,
    _percent:0,
    _percentByFile:0,
    _needUpdate:true,
    _load:false,

    run:function(){
        if(!(cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_ANDROID)) {
            this.loadGame();
            return;
        }

        var me = this;

        var node = ccs.csLoader.createNode("res/ui/AssetMgr.json");
        this.ui = node;
        this.addChild(this.ui);
        ccui.helper.doLayout(this.ui);

        var text = ccui.helper.seekWidgetByName(this.ui,'text');
        text.setString("0%");

        this._progress = ccui.helper.seekWidgetByName(this.ui,"jdt");
        this._progress.setPercent(0);

        var storagePath  = me.storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");
        this._am = new jsb.AssetsManager("res/project.manifest", storagePath);
        this._am.retain();

        if (!this._am.getLocalManifest().isLoaded()){
            cc.log("Fail to update assets, step skipped.1111111");
            this.loadGame();
        }else{
            cc.log("Fail to update assets, step skipped.2222222");
            var listener = new jsb.EventListenerAssetsManager(this._am, function(event) {
                cc.log('event.getEventCode='+event.getEventCode());
                switch (event.getEventCode()){
                    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:    //! 本地manifest错误
                        cc.log("No local manifest file found, skip assets update.");
                        me.loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_PROGRESSION: //! 进度
                        me._percent = event.getPercent();
                        me._progress.setPercent(me._percent);
                        text.setString(parseInt(me._percent).toString() + "%");
                        break;
                    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                        cc.log("Fail to download manifest file, update skipped.");
                        me.loadGame();
                        break;
                    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                        cc.log("ALREADY_UP_TO_DATE.");
                        me.loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_FINISHED:
                        cc.log("Update finished.");
                        me._percent = 100;
                        me._progress.setPercent(me._percent);
                        text.setString(parseInt(me._percent).toString() + "%");
                        me.loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_FAILED:
                        cc.log("Update failed. " + event.getMessage());
                        me._failCount++;
                        if (me._failCount < 5) {
                            me._am.downloadFailedAssets();
                        }
                        else {
                            cc.log("Reach maximum fail count, exit update process");
                            me._failCount = 0;
                            me.loadGame();
                        }
                        break;
                    case jsb.EventAssetsManager.ERROR_UPDATING:
                        cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
                        me.loadGame();
                        break;
                    case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                        cc.log(event.getMessage());
                        me.loadGame();
                        break;
                    default:
                        break;
                }
            });
            cc.eventManager.addListener(listener, 1);
            this._am.update();
        }
    },
    loadGame:function(){
        var me = this;
        if(!cc.sys.isNative) {
            me.runGame();
        } else {
            cc.loader.loadJs(["src/game.min.js"], function (err) {
                me.runGame();
            });
        }
    },
    onExit:function(){
        if(this._am != null) {
            this._am.release();
        }
        this._super();
    },
    runGame:function() {
        cc.director.runScene(new HelloWorldScene());
    }
});