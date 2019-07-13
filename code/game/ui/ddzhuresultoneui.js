/**
 * Created by yang on 2016/11/14.
 */
gameclass.ddzhuresultoneui = gameclass.baseui.extend({
    sprite: null,
    node:null,
    mod_ddzhu:null,
    ddzhutable:null,
    //m_touchListener:null,
    jifen:null,
    ctor: function () {
        this._super();

    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.ddzhuresultoneui,true);

        this.addChild(this.node);
    },

    setniuniumod: function (tabledata,mod_ddzhu,data) {

        this.mod_ddzhu = mod_ddzhu;
        var _this = this;

        var callBack = function(){
            _this.game.uimgr.closeui("gameclass.ddzhuresultoneui");
            if(_this.mod_ddzhu.isover){
                _this.game.uimgr.closeui("gameclass.ddzhutable_wild");
                _this.game.uimgr.closeui("gameclass.ddzhutable");
                _this.game.uimgr.showui("gameclass.ddzhuresultui");
                _this.game.uimgr.uis["gameclass.ddzhuresultui"].setData(_this.mod_ddzhu);
                return;
            }
            _this.mod_ddzhu.gameready();
        };
        gameclass.createbtnpress(this.node, "jiesuan_btn_Ready", function () {
            callBack();
        });
        //gameclass.createbtnpress(this.node, "jiesuan_btn_shaer", function () {
        //
        //});

        _this.bg = ccui.helper.seekWidgetByName(this.node, "bg_0");

        ccui.helper.seekWidgetByName(this.node, "jiesuan_text_difen").setString("本局底分："+tabledata.difen);
        ccui.helper.seekWidgetByName(this.node, "jiesuan_text_jushu").setString("剩余局数："+tabledata.RoomCount);
        ccui.helper.seekWidgetByName(this.node, "jiesuan_text_roomnum").setString("房间号："+_this.mod_ddzhu.roomnum);

        var myDate = new Date();
        var str = myDate.Format("MM/dd hh:mm");
        ccui.helper.seekWidgetByName(this.node, "jiesuan_text_date").setString(str.toString());

        var isDZwin = false;
        var meIsDZ = false;
        for (var i = 0;i < data.length; i++) {
            if (data[i].dealer) {
                isDZwin = data[i].card.length == 0;
                meIsDZ = data[i].uid == _this.mod_ddzhu.uid;
            }

        }
        if((meIsDZ && isDZwin) || (!meIsDZ && !isDZwin)){
        }else{
            var infoPanel=ccui.helper.seekWidgetByName(this.node,"infoPanel");
            var playerPanelArr=ccui.helper.seekWidgetByName(this.node,"playerPanel").getChildren();
            infoPanel.setBackGroundImage(res.ptj_losebg);
            for(var i=0;i<playerPanelArr.length;i++){
                playerPanelArr[i].setBackGroundImage(res.ptj_losebg);
            }
            _this.bg.loadTexture(res.ddzLostBg, ccui.Widget.LOCAL_TEXTURE);
        }
        var playerPanelArr=ccui.helper.seekWidgetByName(this.node,"playerPanel").getChildren();
        for (var i = 0;i < data.length; i++) {
            ccui.helper.seekWidgetByName(playerPanelArr[i], "jiesuan_text_name").setString(data[i].name);
            ccui.helper.seekWidgetByName(playerPanelArr[i], "jiesuan_text_id").setString(data[i].uid);
            ccui.helper.seekWidgetByName(playerPanelArr[i], "jiesuan_text_score").setString(data[i].score);
            gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(playerPanelArr[i], "jiesuan_image_head"),data[i].icon,0,0,"im_headbg2");
            if (data[i].dealer) {
                ccui.helper.seekWidgetByName(playerPanelArr[i], "jiesuan_image_dz").setTexture(res.btn_dizhu);
            }
            if(data[i].isdouble == 2){
                ccui.helper.seekWidgetByName(playerPanelArr[i], "jiesuan_image_double").setTexture(res.spr_double2);
            }
        }


    }
});