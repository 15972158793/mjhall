/**
 * Created by yang on 2016/11/21.
 */

gameclass.buycardui = gameclass.baseui.extend({
    sprite: null,
    node:null,
    curPage:0,

    ctor: function () {
        this._super();
    },
    show:function(){

        this.node = this.game.uimgr.createnode(res.buycardui,true,1);

        this.addChild(this.node);
        this.wchat = ccui.helper.seekWidgetByName(this.node,"copyText1");

        var _this = this;

        gameclass.createbtnpress(this.node, "backBtn", function () {
            _this.game.uimgr.closeui("gameclass.buycardui");
        });
        gameclass.createbtnpress(this.node, "copy_btn1", function () {
            var str=ccui.helper.seekWidgetByName(_this.node,"copyText1").getString();
            gameclass.mod_platform.copyStr(str);
        });
        var wchat = ccui.helper.seekWidgetByName(this.node, "wchat");
        if(gameclass.test == "true"){
            wchat.setVisible(false);
        } else {
            wchat.setVisible(true);
        }
        this.pageLayout = ccui.helper.seekWidgetByName(_this.node,"Panel_1");
        this.pageLayout.setSwallowTouches(false);

        gameclass.createbtnpress(this.node, "btn_que", function () {
            _this.pageLayout.setVisible(true);
            _this.pageLayout.setLocalZOrder(ccui.helper.seekWidgetByName(_this.node,"bg").getLocalZOrder()+1);
            _this.pageLayout.setSwallowTouches(true);
        });

        gameclass.createbtnpress(this.node, "btn_close", function () {
            _this.pageLayout.setVisible(false);
            _this.pageLayout.setLocalZOrder(ccui.helper.seekWidgetByName(_this.node,"bg").getLocalZOrder()-1);
            _this.pageLayout.setSwallowTouches(false);
        });

        this.dianArr = [];
        for(var i = 0;i < 4;i++){
            this.dianArr.push(ccui.helper.seekWidgetByName(this.node,"dian"+i));
        }
        this.updateareainfo();
        this.addClickEvent();
    },

    addClickEvent:function(){
        var picArr = [res.pageOne,res.pageTwo,res.pageThree,res.pageFour];
        var layOut = ccui.helper.seekWidgetByName(this.node,"Panel_1");
        var _this = this;
        var beginPos = null;
        var moving = false;
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:function(touch,event){
                beginPos = touch.getLocation();
                return true;
            },

            onTouchMoved:function(touch,event){
                if(moving) return false;
                var pos = touch.getLocation();
                if(pos.x - beginPos.x > 5){
                    //cc.log(_this.curPage);
                    if(_this.curPage > 0){
                        moving = true;
                        _this.curPage--;
                        layOut.getChildByName("showPic").loadTexture(picArr[_this.curPage],ccui.Widget.LOCAL_TEXTURE);
                        _this.changeShow(_this.curPage);
                        return true;
                    }else{
                        return false;
                    }
                }
                else if(pos.x - beginPos.x < -5){
                    //cc.log(_this.curPage);
                    if(_this.curPage < 3 ){
                        moving = true;
                        _this.curPage++;
                        layOut.getChildByName("showPic").loadTexture(picArr[_this.curPage],ccui.Widget.LOCAL_TEXTURE);
                        _this.changeShow(_this.curPage);
                        return true;
                    }else{
                        return false;
                    }
                }
                return true;
            },
            onTouchEnded:function(touch){
                moving = false;
                return true;
            },
            onTouchCancelled:function(touch){
                moving = false;
                return true;
            },
        }),layOut);
    },

    changeShow:function(_page){
        for(var i =0;i<this.dianArr.length;i++){
            if(_page == i){
                this.dianArr[i].loadTexture(res.selectDian,ccui.Widget.LOCAL_TEXTURE);
            }else{
                this.dianArr[i].loadTexture(res.unselectDian,ccui.Widget.LOCAL_TEXTURE);
            }
        }
    },

    updateareainfo: function () {
        //if(this.game.modmgr.mod_center.areainfo == null) {
        //    this.wchat.setString("asnn999");
        //    return;
        //}else{
        //    if(this.game.modmgr.mod_center.areainfo.wchat == ""){
        //        this.wchat.setString("asnn999");
        //    }else{
        //        this.wchat.setString(this.game.modmgr.mod_center.areainfo.wchat);
        //    }
        //}
        this.wchat.setString("傲世娱乐");
    },
});