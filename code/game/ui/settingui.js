/**
 * Created by yang on 2016/11/11.
 */

gameclass.settingui = gameclass.baseui.extend({
    sprite: null,
    node:null,
    musicSlider:null,
    soundSlider:null,
    btn_change:null,
    btn_ok:null,

    sliderMusic:null,
    sliderEffects:null,
    //tab按钮组件控制器
    btnGroupCtr: null,
    ctor: function () {
        this._super();


    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.setting,true,1);
        this.musicSlider = ccui.helper.seekWidgetByName(this.node, "musicSlider");
        this.soundSlider = ccui.helper.seekWidgetByName(this.node, "effectSlider");
        this.addChild(this.node);
        var _this = this;
        gameclass.createbtnpress(this.node, "root", function () {
            _this.game.uimgr.closeui("gameclass.settingui");
        });

        gameclass.createbtnpress(this.node, "exitLogin", function () {
            var obj = {"yinyue":_this.sliderMusic,
                "yinxiao":_this.sliderEffects}
            obj = JSON.stringify(obj);

            //cc.log("����:"+obj);

            _this.saveSetting(obj);
            _this.game.uimgr.closeui("gameclass.settingui");
        });

        //gameclass.createbtnpress(this.node, "ok", function () {
        //    var obj = {"yinyue":_this.sliderMusic,
        //        "yinxiao":_this.sliderEffects}
        //    obj = JSON.stringify(obj);
        //
        //    //cc.log("����:"+obj);
        //
        //    _this.saveSetting(obj);
        //    _this.game.uimgr.closeui("gameclass.settingui");
        //});

        this.btn_change = ccui.helper.seekWidgetByName(this.node, "change");
        this.btn_change.setVisible(false);
        //this.btn_ok = ccui.helper.seekWidgetByName(this.node,"ok");
        gameclass.createbtnpress(this.node, "change", function () {
            mod_userdefault.globaldata.code = "";
            mod_userdefault.writeglobaljson();

            //_this.game.uimgr.showui("gameclass.loginui");
            //_this.game.uimgr.closeui("gameclass.hallui");
            //_this.game.uimgr.closeui("gameclass.settingui");
            _this.game.modmgr.mod_login.backlogin();
        });

        var sliderEventbeijingmusic =  function (sender, type) {
            switch (type) {
                case ccui.Slider.EVENT_PERCENT_CHANGED:
                    var slider = sender;
                    var percent = slider.getPercent();
                    var _percent = percent.toFixed(0) / 100;
                    _this.sliderMusic = _percent;
                    mod_sound.setMusicVolume(_percent);

                    break;
                default:
                    break;
            }
        };

        var sliderEventgamesond = function (sender, type) {
            switch (type) {
                case ccui.Slider.EVENT_PERCENT_CHANGED:
                    var slider = sender;
                    var percent = slider.getPercent();
                    _this.sliderEffects = percent;
                    //cc.log("Percent.........." + percent.toFixed(0));
                    var _percent = percent.toFixed(0) / 100;
                    _this.sliderEffects = _percent;
                    mod_sound.setEffectsVolume(_percent);

                    break;
                default:
                    break;
            }
        };
        this.sliderMusic =  mod_sound.getMusicVolume();
        this.sliderEffects = mod_sound.getEffectsVolume();


        this.musicSlider.setPercent(this.sliderMusic * 100);
        this.musicSlider.addEventListener(sliderEventbeijingmusic);
        this.soundSlider.setPercent(this.sliderEffects * 100);
        this.soundSlider.addEventListener(sliderEventgamesond);

        this.btnGroupCtr = new gameclass.buttonGroupControl();
        this.btnGroupCtr._BTN_CLICK = gameclass.LOGIN_SET_TABBTN_CLICK;

        var goldBtn = ccui.helper.seekWidgetByName(this.node, "goldBtn");
        var fkBtn = ccui.helper.seekWidgetByName(this.node, "fkBtn");
        var btnControlArr = this.btnGroupCtr.switchBtnControl([goldBtn, fkBtn],["normal"],["select"]);
        this.btnGroupCtr.initData(btnControlArr);
        var loginSetStorage = staticFunction.getStorage(gameclass.gameStorageKey, gameclass.loginSetKey);
        if(loginSetStorage == null){
            this.btnGroupCtr.setSelectIndex(gameclass.LOGIN_TO_ROOM_DEFAULT);
        }else{
            this.btnGroupCtr.setSelectIndex(parseInt(loginSetStorage));
        }
        cc.eventManager.addCustomListener(gameclass.LOGIN_SET_TABBTN_CLICK, this.btnGroupClickHandle.bind(this));
    },
    /**
     * tab按钮点击处理
     */
    btnGroupClickHandle: function (event) {
        // cc.log("clickIndex=" + event.getUserData().index);
        var obj = staticFunction.getStorages(gameclass.gameStorageKey);
        obj[gameclass.loginSetKey] = event.getUserData().index;
        staticFunction.setStorages(gameclass.gameStorageKey, obj);
    },
    saveSetting:function(_obj){
        cc.sys.localStorage.setItem("saveSetting",_obj);
    },

    getSetting:function(){
        return cc.sys.localStorage.getItem("saveSetting");
    },
    destroy: function () {
        cc.eventManager.removeCustomListeners(gameclass.LOGIN_SET_TABBTN_CLICK);
    },
});

gameclass.settingui.gmusic = 25;
gameclass.settingui.gamesound = 25;
//游戏本地缓存键值
gameclass.gameStorageKey = "gameStorageKey";
//登录设置（0-进入金币场；1-进入房卡场）
gameclass.loginSetKey = "loginSetKey";
//界面TAB按钮组件
gameclass.LOGIN_SET_TABBTN_CLICK = "gameclass.LOGIN_SET_TABBTN_CLICK";
//登录进金币场TAB索引
gameclass.TAB_LOGIN_TO_GOLD = 0;
//登录进房卡场TAB索引
gameclass.TAB_LOGIN_TO_ROOM_CARD = 1;
/**
 * 登录后默认场景（0-金币场；1-房卡场）
 * @type {number}
 */
gameclass.LOGIN_TO_ROOM_DEFAULT = 0;