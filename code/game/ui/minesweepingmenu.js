gameclass.minesweepingmenu = gameclass.baseui.extend({
    mod:null,
    ctor:function(){
        this._super();
    },

    show:function(){

        this.node = this.game.uimgr.createnode(res.minesweepingmenu,true);
        this.node.setPosition((cc.winSize.width - this.node.getContentSize().width)/2,0);
        this.addChild(this.node);


    },

    close:function () {
        var _this = this;
        var panel = ccui.helper.seekWidgetByName(_this.node,"Image_1");
        panel.stopAllActions();
        panel.runAction(cc.sequence(cc.moveTo(0.5,-panel.getContentSize().width,0),cc.callFunc(function () {
            _this.game.uimgr.closeui("gameclass.chatuisl");
        })));
    },

    setData:function (mod) {
        var _this = this;
        this.mod = mod;
        ccui.helper.seekWidgetByName(this.node,"tv_room").setString("房间号：" + this.mod.roominfo.roomid);
        var mv = mod_sound.getMusicVolume();
        ccui.helper.seekWidgetByName(this.node,"cb_music").setSelected(mv !== 0);
        var ev = mod_sound.getEffectsVolume();
        ccui.helper.seekWidgetByName(this.node,"cb_effect").setSelected(ev !== 0);
        ccui.helper.seekWidgetByName(this.node,"cb_music").addTouchEventListener(function (sender,type) {

            if(type != ccui.Widget.TOUCH_ENDED){
                return;
            }


            if(mod_sound.getMusicVolume() > 0){
                mod_sound.setMusicVolume(0);
            } else {
                mod_sound.setMusicVolume(0.5);
            }

        });
        ccui.helper.seekWidgetByName(this.node,"cb_effect").addTouchEventListener(function (sender,type) {
            if(type != ccui.Widget.TOUCH_ENDED){
                return;
            }
            mod_sound.playeffect(g_music["selectItemMp3"], false);

            if(mod_sound.getEffectsVolume() > 0){
                mod_sound.setEffectsVolume(0);
            } else {
                mod_sound.setEffectsVolume(0.5);
            }

        });

        ccui.helper.seekWidgetByName(this.node,"panel_bg").addTouchEventListener(function (sender,type) {
            if(type != ccui.Widget.TOUCH_ENDED){
                return;
            }
            mod_sound.playeffect(g_music["selectItemMp3"], false);

            _this.game.uimgr.closeui("gameclass.minesweepingmenu");
        });

        ccui.helper.seekWidgetByName(this.node,"btn_exit").addTouchEventListener(function (sender,type) {
            if(type != ccui.Widget.TOUCH_ENDED){
                return;
            }
            mod_sound.playeffect(g_music["selectItemMp3"], false);
            _this.mod.senddissmissroom();
            _this.game.uimgr.closeui("gameclass.minesweepingmenu");
        });

        ccui.helper.seekWidgetByName(this.node,"tv_rule").addTouchEventListener(function (sender,type) {
            if(type != ccui.Widget.TOUCH_ENDED){
                return;
            }
            mod_sound.playeffect(g_music["selectItemMp3"], false);

            var n = _this.game.uimgr.createnode(res.minesweepingrule,true);
            _this.node.getParent().getParent().addChild(n);

            ccui.helper.seekWidgetByName(n,"panel_bg").addTouchEventListener(function (sender,type) {
                if(type != ccui.Widget.TOUCH_ENDED){
                    return;
                }
                mod_sound.playeffect(g_music["selectItemMp3"], false);

                n.removeFromParent(true);
            });

            _this.game.uimgr.closeui("gameclass.minesweepingmenu");
        });
    }
});
