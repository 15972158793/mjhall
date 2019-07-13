gameclass.playMenuLayer = cc.Layer.extend({
    _EVENT_DISMISS:"EVENT_DISMISS",
    ctor:function (_game) {
        this._super();
        this.game = _game;

        this.show();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.playMenuView,true);
        this.addChild(this.node);
        // var btn_closeCaidan = ccui.helper.seekWidgetByName(this.node,"btn_exitCaidan");
        // btn_closeCaidan.setVisible(false);

        this.zhankai = false;

        var _this=this;

        gameclass.createbtnpress(this.node, "btn_bangzhu", function () {

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
        gameclass.createbtnpress(this.node, "btn_jiesan", function () {
            cc.eventManager.dispatchCustomEvent(_this._EVENT_DISMISS, {});
        });
    },
});
gameclass.playMenuLayer.prototype.getWidth = function () {
      if(this.node.getChildrenCount() > 0){
          var child = this.node.getChildren()[0];
          return child.getContentSize().width;
      }
      return 0;
};
gameclass.playMenuLayer.prototype.getHeight = function () {
    if(this.node.getChildrenCount() > 0){
        var child = this.node.getChildren()[0];
        return child.getContentSize().height;
    }
    return 0;
};
