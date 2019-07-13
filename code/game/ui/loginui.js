/**
 * Created by yang on 2016/11/9.
 */

gameclass.loginui = gameclass.baseui.extend({
    sprite: null,
    node:null,
    agreement:null,
    check:null,
    touchAnim:null,
    ctor: function () {
        this._super();
    },
    show:function(){
        //this.ani = new gameclass.animation();
        //this.ani.Init(res.dragonAn_10_Plist, "dragonAnimation_10", 10, 0.1, false, function() {
        //    cc.log("ani is over");
        //});
        //this.addChild(this.ani);
        //this.ani.setPosition(500, 500);
        //return;
        this.node = this.game.uimgr.createnode(res.loginui_loginpngpjson,true);
        if(cc.sys.localStorage.getItem("saveSetting")){
            var settingInfo = cc.sys.localStorage.getItem("saveSetting");
            settingInfo = JSON.parse(settingInfo);

            mod_sound.setMusicVolume(settingInfo.yinyue);
            mod_sound.setEffectsVolume(settingInfo.yinxiao);
        }else{
            mod_sound.setMusicVolume(0.25);
            mod_sound.setEffectsVolume(0.25);
        }
        var panel=new ccui.Layout();
        panel.setLocalZOrder(9999);
        cc.director.getRunningScene().addChild(panel);
        panel.setContentSize(cc.winSize.width,cc.winSize.height);

        this.touchAnim = new sp.SkeletonAnimation(res.touchAnimatejson, res.touchAnimateatlas);
        this.touchAnim.setAnimation(0, 'animation', false);
        this.touchAnim.setAnchorPoint(0.5,0.5);
        panel.addChild(this.touchAnim);
        this.touchAnim.setVisible(false);
        var _this=this;
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan:function(touch,event){
                if(g_isgame) return;
                _this.touchAnim.setOpacity(255);
                _this.touchAnim.setVisible(true);
                _this.touchAnim.setPosition(touch.getLocation());
                _this.touchAnim.setAnimation(0, 'animation', false);
                return true;
            },
            onTouchMoved:function(touch,event){
            },
            onTouchEnded:function(touch){
            },
        }),panel);
        //var sten = new cc.Sprite();
        //sten.initWithFile("res/ui/niuniunew/logo_saoguang.png");
        //var clipnode = gameclass.mod_base.cliper("res/ui/niuniunew/title1.png");
        //clipnode.setPosition(cc.p(568.00, 404.03));
        //this.node.addChild(clipnode);
        //clipnode.addChild(sten);
        //sten.setPosition(cc.p(-40.02 - 568 / 2, 0));
        //var act = cc.repeatForever(cc.sequence(cc.moveTo(2, cc.p(610, 0)), cc.moveTo(0,cc.p(-40.02 - 568 / 2, 0))));
        //sten.runAction(act);

        //var action = ccs.load(res.loginui_loginpngpjson).action;
        //this.node.runAction(action);
        //action.gotoFrameAndPlay(0, 80, true);

        if(window.wx) {
            gameclass.mod_platform.wxshare("傲世娱乐", 0, "大家一起过来玩de吧。")
        }

        this.addChild(this.node);

        //this.game.uimgr.showui("gameclass.inputcode");
        this.check = ccui.helper.seekWidgetByName(this.node, "CheckType0");
        this.check.setSelected(true);
        this.agreement = ccui.helper.seekWidgetByName(this.node, "agreement");


        var _login=ccui.helper.seekWidgetByName(this.node,"logo");
        var _loginName=ccui.helper.seekWidgetByName(this.node,"logoName");
        // var light=ccui.helper.seekWidgetByName(this.node, "guang");
        // this.node.addChild(clipping.getClipnode(_loginName,light,1.5,{x1:-700,x2:700}));

        var sucAnim = new sp.SkeletonAnimation(res.login_animate_json, res.login_animate_atlas);
        sucAnim.setAnimation(0, 'animation', true);
        sucAnim.setAnchorPoint(0.5,0.5);
        sucAnim.setPosition(cc.winSize.width*0.5,cc.winSize.height*0.5);
        this.node.addChild(sucAnim);
        sucAnim.setLocalZOrder(1000);
        // this.scheduleOnce(function () {
        //     sucAnim.setVisible(false);
        // },1.466 * 2);

        var clickMent = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    _this.game.uimgr.showui("gameclass.agreement");
                    break;
            }
        }
        this.agreement.addTouchEventListener(clickMent);

        var guestBtn = ccui.helper.seekWidgetByName(this.node, "guestBtn");
        guestBtn.setVisible(false);
        //guestBtn.setVisible(true);
        var wxBtn = ccui.helper.seekWidgetByName(this.node, "wxBtn");
        //wxBtn.setVisible(false);
        var codeinput = ccui.helper.seekWidgetByName(this.node, "codeinput");
        var version = ccui.helper.seekWidgetByName(this.node, "version");

        mod_sound.playbmg(g_music.bmg,true);

        if(gameclass.test == "true") {  //! 测试环境
            wxBtn.setVisible(false)
            guestBtn.setVisible(true)
        } else {
            if(cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS){ //! ios判断
                gameclass.mod_platform.startmap();
            }
        }

        var _this = this;

        if(cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_ANDROID) {
            codeinput.setVisible(false);
            version.setVisible(true);
        } else {
            codeinput.setVisible(true);
            version.setVisible(false);
        }

        version.setString("当前版本:" + gameclass.version);
        ////===========test=============
        //if(cc.sys.isNative){
        //codeinput.setVisible(true);
        //guestBtn.setVisible(true);
        //wxBtn.setVisible(false);
        //}
        ////====================
        var clickGuest = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    if(!_this.check.isSelected()) {
                        _this.game.uimgr.showui("gameclass.msgboxui");
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("请先同意用户协议");
                        return;
                    }
                    _this.game.modmgr.mod_login.guestlogin(codeinput.getString());
                    break;
            }
        }

        guestBtn.addTouchEventListener(clickGuest);

        var clickwxBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    if(!_this.check.isSelected()) {
                        _this.game.uimgr.showui("gameclass.msgboxui");
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("请先同意用户协议");
                        return;
                    }
                    if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)
                    {
                        if (mod_userdefault.globaldata.code != "" && (new Date()).getTime() - mod_userdefault.globaldata.time < 86400000 * 7) { //! 有这个记录
                            _this.game.modmgr.mod_login.wxlogin("", false)
                        } else {
                            mod_userdefault.globaldata.code = ""
                            gameclass.mod_platform.loginwx();
                        }
                    }
                    else
                    {
                        if (cc.sys.os == cc.sys.OS_WINDOWS){
                            if(cc.sys.isNative){
                                _this.game.modmgr.mod_login.guestlogin(codeinput.getString());
                            }else{
                                var _code = (function(name) {
                                    var r = null;
                                    if(window && window.location){
                                        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                                        var r = window.location.search.substr(1).match(reg);
                                    }
                                    if (r != null) return unescape(r[2]); return null;
                                })("code");
                                _code = _code || codeinput.getString();
                                _this.game.modmgr.mod_login.guestlogin(_code);
                            }

                        }else if (code != null){
                            _this.game.modmgr.mod_login.wxlogin(code, false);
                        }else{
                            _this.game.modmgr.mod_login.guestlogin(codeinput.getString());
                        }
                    }
                    break;
            }
        };

        wxBtn.addTouchEventListener(clickwxBtn);

        //! 返回了登陆界面
        this.game.modmgr.mod_center.disconnect();
    },
    showGuest:function () {
        var guestBtn = ccui.helper.seekWidgetByName(this.node, "guestBtn");
        guestBtn.setVisible(true);
    }
    
});