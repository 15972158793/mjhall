/**
 * Created by yang on 2016/11/16.
 */

gameclass.mail = gameclass.baseui.extend({
    node:null,
    context:null,
    title:null,
    img_titles:[],
    ctor: function () {
        this._super();
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.mailjson,true,1);

        this.addChild(this.node);

        var _this = this;
        gameclass.createbtnpress(this.node, "close", function () {
            _this.game.uimgr.closeui("gameclass.mail", true);
        });
        var btnLayerArr=ccui.helper.seekWidgetByName(this.node,"itemPanel").getChildren();
        if ( _this.game.modmgr.mod_center.notice.length == 0 ){
            return;
        }
        for(var i=0;i<btnLayerArr.length;i++){
            btnLayerArr[i].setTag(i);
            btnLayerArr[i].addTouchEventListener(function(sender,type){
                if (ccui.Widget.TOUCH_ENDED== type) {
                    var _tag=sender.getTag();
                    var panelArr=ccui.helper.seekWidgetByName(_this.node,"panel").getChildren();
                    for(var j=0;j<panelArr.length;j++){
                        panelArr[j].setVisible(false);
                    }
                    panelArr[_tag].setVisible(true);

                    if(sender.getTag() == 1){
                        cc.log(_this.game.modmgr.mod_center.notice[_this.game.modmgr.mod_center.notice.length - 1].id);
                        _this.game.modmgr.mod_center.sendReadMail(_this.game.modmgr.mod_center.notice[_this.game.modmgr.mod_center.notice.length - 1].id)
                    }
                }
            })
        }

        var len = _this.game.modmgr.mod_center.notice.length;
        var showContent = _this.game.modmgr.mod_center.notice[len-1].context;
        ccui.helper.seekWidgetByName(this.node,"textStr").setString(showContent);
    },

    setMailTable:function() {
        var panelArr=ccui.helper.seekWidgetByName(this.node,"panel").getChildren();
        panelArr[0].setVisible(false);
        panelArr[1].setVisible(true);
        this.game.modmgr.mod_center.sendReadMail(this.game.modmgr.mod_center.notice[this.game.modmgr.mod_center.notice.length - 1].id);
    }
});