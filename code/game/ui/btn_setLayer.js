/**
 * Created by Administrator on 2017/7/18.
 */
gameclass.btn_setLayer = gameclass.baseui.extend({
    uiParent:null,
    game:null,
    goldtype:0,
    ctor: function (_node,_game) {
        this._super();
        this.uiParent = _node;
        this.game = _game;
        this.goldtype = 0;
        this.show();
    },
    setgoldtype: function (goldtype) {
        this.goldtype = goldtype;
        var quik = ccui.helper.seekWidgetByName(this.node, "btn_jiesan");
        if(this.goldtype >= 10000){
            var quiksp = ccui.helper.seekWidgetByName(quik, "sp");
            quiksp.loadTexture(res.btn_quitExit);

            ccui.helper.seekWidgetByName(this.node,"btn_shop").setVisible(true);
            ccui.helper.seekWidgetByName(this.node,"btn_xiaoxi").setPositionY(205);
            if(this.uiParent.getTag() == 1025) {
                ccui.helper.seekWidgetByName(this.node,"btn_xiaoxi").setPositionY(250);
            }

            //var jiesan_texture = ccui.helper.seekWidgetByName(this.node,"btn_huanfu").getChildByName("sp");
            //jiesan_texture.loadTexture(res.btn_quchu);

            var _this= this;
            cc.log(this.goldtype);
            if((this.goldtype >= 20000 && this.goldtype < 30000 || this.goldtype == 80000 )){
                var btn_huanfu = ccui.helper.seekWidgetByName(this.node,"btn_huanfu");
                gameclass.createbtnpress(this.node,"btn_huanfu",function(){
                    _this.game.uimgr.showui("gameclass.bank").setEnterance(1);
                })
                btn_huanfu.getChildByName("sp").loadTexture(res.btn_quqian);
            }
        }
    },
    setBtnXSPos:function(){
        ccui.helper.seekWidgetByName(this.node,"btn_xiaoxi").setPosition(1000,140);
    },
    _setModeGame:function(){
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.btn_layerJson,true);
        this.addChild(this.node);
        var btn_closeCaidan = ccui.helper.seekWidgetByName(this.node,"btn_exitCaidan");
        btn_closeCaidan.setVisible(false);

        var btn_shop = ccui.helper.seekWidgetByName(this.node,"btn_shop");
        btn_shop.setVisible(false);

        var helpnode = ccui.helper.seekWidgetByName(this.uiParent, "closeinfo");
        this.zhankai = false;



        var _this=this;
        //卡五星的按钮上移
        if(this.uiParent.getTag() == 1025){
            ccui.helper.seekWidgetByName(this.node,"mic").setPositionY(180);
        }

        gameclass.createbtnpress(this.node, "btn_bangzhu", function () {
            //斗地主点帮助按钮没反应
            if(_this.uiParent.getTag() == 9876){
                return;
            }
            if(helpnode) helpnode.setVisible(true);
            _this.btn_exitCaidan();
        });

        if(helpnode){
            helpnode.addTouchEventListener(function(sender,type){
                if(type == ccui.Widget.TOUCH_ENDED){
                    helpnode.setVisible(false);
                }
            });
        }

        gameclass.createbtnpress(this.node, "btn_caidan", function () {
            if(_this.zhankai) return;
            _this.zhankai = true;
            ccui.helper.seekWidgetByName(_this.node,"spIconMusic").setVisible(!mod_sound.getMusicVolume());
            ccui.helper.seekWidgetByName(_this.node,"spIconEffect").setVisible(!mod_sound.getEffectsVolume());
            ccui.helper.seekWidgetByName(_this.node,"btn_list").runAction(cc.sequence(cc.moveTo(0.3,cc.p(140,320)),cc.callFunc(function(){
                btn_closeCaidan.setVisible(true);
            })))
        });
        gameclass.createbtnpress(this.node, "btn_exitCaidan", function () {
            _this.btn_exitCaidan();
        });
        gameclass.createbtnpress(_this.node, "btn_yinyue", function (sender) {
            var ms = mod_sound.getMusicVolume();
            var _percent = 0;
            if ( !ms)  _percent = 0.5;
            else _percent = 0;
            ccui.helper.seekWidgetByName(_this.node,"spIconMusic").setVisible(ms);
            mod_sound.setMusicVolume(_percent);
        });
        gameclass.createbtnpress(_this.node, "btn_yinxiao", function (sender) {
            var ms = mod_sound.getEffectsVolume();
            var _percent = 0;
            if ( !ms) _percent = 0.5;
            else _percent = 0;
            ccui.helper.seekWidgetByName(_this.node,"spIconEffect").setVisible(ms);
            mod_sound.setEffectsVolume(_percent);
        });
        gameclass.createbtnpress(this.node, "btn_xiaoxi", function () {
            _this.mod_game=gameclass.mod_platform.game.modmgr.mod_login.getfirstgame();
            if(!_this.mod_game)return;
            if(_this.uiParent.getTag() == 30000){
                _this.game.uimgr.showui("gameclass.chatuinys");
                _this.game.uimgr.uis["gameclass.chatuinys"].setmod(_this.mod_game);
                return;
            }
            _this.game.uimgr.showui("gameclass.chatuinew");
            _this.game.uimgr.uis["gameclass.chatuinew"].setmod(_this.mod_game);
        });
        gameclass.createbtnpress(this.node, "btn_jiesan", function () {
            _this.mod_game=gameclass.mod_platform.game.modmgr.mod_login.getfirstgame();
            if(!_this.mod_game)return;
            _this.game.uimgr.showui("gameclass.msgboxui");
            var strmsg = "是否想要解散房间？";
            if(_this.goldtype >= gameclass.gamegoldkwx) {
                strmsg = "是否想要退出房间？";
            }
            _this.game.uimgr.uis["gameclass.msgboxui"].setString(strmsg,function(){
                if(_this.game.modmgr.mod_login.mod_game.view && _this.game.modmgr.mod_login.mod_game.view.gametype == gameclass.gameszpbaofang
                        && _this.game.modmgr.mod_login.mod_game.roominfo.host == _this.game.modmgr.mod_login.logindata.uid) {
                    //! 房主任何时候都能解散
                    _this.game.modmgr.mod_login.mod_game.gameend();
                }else{
                    _this.mod_game.dissmissroom();
                }
            });
        });

        gameclass.createbtnpress(this.node, "btn_safe", function () {
            _this.mod_game=gameclass.mod_platform.game.modmgr.mod_login.getfirstgame();
            if(!_this.mod_game)return;
            var people = _this.mod_game.roominfo.person;
            var linePeople = [];
            for(var i = 0;i < people.length;i++){
                if(people[i].line) linePeople.push(people[i]);
            }
            _this.uiParent.getChildByName("safeLayer").safeBtncallFunc(linePeople);
        });

        gameclass.createbtnpress(this.node, "btn_shop", function () {
            _this.game.uimgr.showui("gameclass.goldShop");
        });

        this.initMicView();
    },
    btn_exitCaidan:function(){
        if(!this.zhankai) return;
        var _this=this;
        ccui.helper.seekWidgetByName(this.node,"btn_list").runAction(cc.sequence(cc.moveTo(0.3,cc.p(-130,320)),cc.callFunc(function(){
            _this.zhankai = false;
            ccui.helper.seekWidgetByName(_this.node,"btn_exitCaidan").setVisible(false);
        })))
    },

    initMicView:function() {
        var _this = this;

        var mic = ccui.helper.seekWidgetByName(_this.node, "mic");
        var miclayer = ccui.helper.seekWidgetByName(_this.node, "micLayer");
        miclayer.setVisible(false);
        var anim = new sp.SkeletonAnimation(res.voiceJson, res.voiceAtlas);
        anim.setPosition(64,64);
        anim.setScale(0.7);
        miclayer.addChild(anim);
        anim.setAnimation(0, 'animation', true);

        var oldvnum = mod_sound.getEffectsVolume();
        var oldmnum = mod_sound.getMusicVolume();
        mic.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    oldvnum = mod_sound.getEffectsVolume();
                    oldmnum = mod_sound.getMusicVolume();
                    mod_sound.setEffectsVolume(0.0);
                    mod_sound.setMusicVolume(0.0);
                    miclayer.setVisible(true);
                    gameclass.mod_platform.begmic();
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    miclayer.setVisible(false);
                    gameclass.mod_platform.endmic();
                    mod_sound.setEffectsVolume(Number(oldvnum));
                    mod_sound.setMusicVolume(Number(oldmnum));
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    miclayer.setVisible(false);
                    gameclass.mod_platform.cancelmic();
                    mod_sound.setEffectsVolume(Number(oldvnum));
                    mod_sound.setMusicVolume(Number(oldmnum));
                    break;
            }
        });
    }
});