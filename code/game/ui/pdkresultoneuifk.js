/**
 * Created by yang on 2016/11/14.
 */
gameclass.pdkresultoneui = gameclass.baseui.extend({
    sprite: null,
    node: null,
    mod_pdk: null,
    pdktable: null,
    //m_touchListener:null,
    jifen: null,
    ctor: function () {
        this._super();
        /*var touchListener = {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches: true,
         onTouchBegan: this.onTouchBegan
         };
         cc.eventManager.addListener(touchListener, this);
         this.m_touchListener = touchListener;*/
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.pdkresultoneui, true);
        this.addChild(this.node);
    },

    setniuniumod: function (tabledata, mod_pdk, data,table,niao) {

        this.mod_pdk = mod_pdk;
        this.pdktable = table;
        var _this = this;

        ccui.helper.seekWidgetByName(this.node, "jiesuan_btn_close").setVisible(false);
        gameclass.createbtnpress(this.node, "jiesuan_btn_close", function () {
            callBack();
        });
        gameclass.createbtnpress(this.node, "jiesuan_btn_Ready", function () {
            callBack();

        });
        gameclass.createbtnpress(this.node, "jiesuan_btn_shaer", function () {

        });

        //var jifen = _this.pdktable.difen;
        //var RoomCount = _this.pdktable.RoomMax - this.pdktable.RoomMin;
        var strDZ = "res/ui/newniuniu_1221/btn_dizhu@2x.png";
        var failed = "res/ui/newniuniu_1221/jiesuan_bg2@2x.png";

        //ccui.helper.seekWidgetByName(this.node, "jiesuan_text_difen").setString("本局底分："+tabledata.difen);
        //ccui.helper.seekWidgetByName(this.node, "jiesuan_text_jushu").setString("剩余局数："+tabledata.RoomCount);
        //ccui.helper.seekWidgetByName(this.node, "jiesuan_text_roomnum").setString("房间号："+_this.mod_pdk.roomnum);

        //var myDate = new Date();
        //var str = myDate.Format("MM/dd hh:mm");
        //ccui.helper.seekWidgetByName(this.node, "jiesuan_text_date").setString(str.toString());

        /*var isDZwin = false;
         var meIsDZ = false;
         for (var i = 0;i < data.length; i++) {
         if (data[i].dealer) {
         isDZwin = data[i].card.length == 0;
         meIsDZ = data[i].uid == _this.mod_pdk.uid;
         }

         }
         if((meIsDZ && isDZwin) || (!meIsDZ && !isDZwin)){

         }*/
        var iswin = false;
        for (var i = 0; i < data.length; i++) {
            if (data[i].uid == _this.mod_pdk.uid && data[i].card.length == 0) {
                iswin = true;
            }
        }

        if (!iswin) {
            var title = ccui.helper.seekWidgetByName(this.node, "winorlose");
            title.setTexture(res.ptj_losetitle);
            var endbg = ccui.helper.seekWidgetByName(this.node, "endbg");
            endbg.loadTexture(res.pdk_losebg1);
        }
        for (var i = 0; i < 4; i++) {
            var playerbg = ccui.helper.seekWidgetByName(this.node, "playerbg" + i);
            if (!iswin) {
                playerbg.loadTexture(res.pdk_losebg2);
            }
            if (i >= data.length) ccui.helper.seekWidgetByName(playerbg, "Panel_1").setVisible(false);
        }


        //var head = [];
        for (var i = 0; i < data.length; i++) {
            var node = ccui.helper.seekWidgetByName(this.node, "cardnode" + i);
            table.showoneendcard(data[i].card, node);

            ccui.helper.seekWidgetByName(this.node, "cardnum" + i).setString(data[i].card.length);
            ccui.helper.seekWidgetByName(this.node, "niao" + i).setVisible(false);
            if(niao == data[i].uid){
                ccui.helper.seekWidgetByName(this.node, "niao" + i).setVisible(true);
            }
            ccui.helper.seekWidgetByName(this.node, "jiesuan_text_boom" + i).ignoreContentAdaptWithSize(true);
            ccui.helper.seekWidgetByName(this.node, "jiesuan_text_scorezheng" + i).ignoreContentAdaptWithSize(true);
            ccui.helper.seekWidgetByName(this.node, "jiesuan_text_scorefu" + i).ignoreContentAdaptWithSize(true);
            ccui.helper.seekWidgetByName(this.node, "jiesuan_text_boom" + i).setString(data[i].boom);


            /*head[i] = ccui.helper.seekWidgetByName(this.node, "jiesuan_image_head" + i);
             icon:this.mod_pdk.roominfo.person[i].imgurl,
             uid:this.mod_pdk.roominfo.person[i].uid,
             name:this.mod_pdk.roominfo.person[i].name,
             gameclass.mod_base.showtximg(head[i],playerdata.imgurl,0,0,"im_headbg2");*/
            ccui.helper.seekWidgetByName(this.node, "jiesuan_text_name" + i).setString(data[i].name);
            ccui.helper.seekWidgetByName(this.node, "jiesuan_text_id" + i).setString("ID : " + data[i].uid);
            if (data[i].curscore > 0) {
                ccui.helper.seekWidgetByName(this.node, "fuhao" + i).initWithFile(res.zhenghao);
                ccui.helper.seekWidgetByName(this.node, "jiesuan_text_scorezheng" + i).setString(data[i].curscore);
                ccui.helper.seekWidgetByName(this.node, "jiesuan_text_scorefu" + i).setVisible(false);
            } else if (data[i].curscore < 0) {
                ccui.helper.seekWidgetByName(this.node, "fuhao" + i).initWithFile(res.fuhao);
                ccui.helper.seekWidgetByName(this.node, "jiesuan_text_scorefu" + i).setString(-data[i].curscore);
                ccui.helper.seekWidgetByName(this.node, "jiesuan_text_scorezheng" + i).setVisible(false);
            } else {
                ccui.helper.seekWidgetByName(this.node, "fuhao" + i).setVisible(false);
                ccui.helper.seekWidgetByName(this.node, "jiesuan_text_scorefu" + i).setString(0);
                ccui.helper.seekWidgetByName(this.node, "jiesuan_text_scorezheng" + i).setVisible(false);
            }

            //ccui.helper.seekWidgetByName(this.node, "zhadan" + i).setString("炸弹: "+data[i].boom);
            //ccui.helper.seekWidgetByName(this.node, "shengpai" + i).setString("剩牌: "+data[i].card.length);
            //gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(this.node, "jiesuan_image_head" + i), data[i].icon, 0, 0, "im_headbg2");
            /*if (data[i].dealer) {
             ccui.helper.seekWidgetByName(this.node, "jiesuan_image_dz" + i).setTexture(strDZ);
             }
             if(data[i].isdouble == 2){
             ccui.helper.seekWidgetByName(this.node, "jiesuan_image_double" + i).setTexture(res.spr_double2);
             }*/
        }

        var callBack = function () {
            _this.game.uimgr.closeui("gameclass.pdkresultoneui");
            if (_this.mod_pdk.isover) {
                _this.game.uimgr.showui("gameclass.pdkresultui").setData(_this.mod_pdk,_this.pdktable);
                return;
            }
            _this.mod_pdk.gameready();

        };

    },
});

