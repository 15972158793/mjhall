/**
 * Created by Administrator on 2017/7/18.
 */
gameclass.chatMicLayer = gameclass.baseui.extend({
    gameMod:null,
    playerData:null,
    ctor: function () {
        this._super();
        this.gameMod=null;
        this.playerData=null;
    },

    show: function () {
        this.node = this.game.uimgr.createnode(res.chatMicLayer,true);
        this.addChild(this.node);
        var _this=this;
        var backBtn=ccui.helper.seekWidgetByName(this.node,"Panel_1");
        this.playerName=ccui.helper.seekWidgetByName(this.node,"name");
        this.Id_text=ccui.helper.seekWidgetByName(this.node,"uid_Text");
        this.Ip_text=ccui.helper.seekWidgetByName(this.node,"uip_Text");
        this.adr_text=ccui.helper.seekWidgetByName(this.node,"address_Text");
        this.playerIcon=ccui.helper.seekWidgetByName(this.node,"icon");
        backBtn.addTouchEventListener(function(sender,type){
            if(type==ccui.Widget.TOUCH_ENDED){
                _this.game.uimgr.closeui("gameclass.chatMicLayer");
            }
        })


    },

    setPlayerInfo:function (data,gameMod,index) {
        this.showBaseInfo(data,gameMod,0);
        if(index == 0) return;
        this.sendTalk();
    },
    //豹子王和其他游戏不一样。单独写
    setBZWinfo:function(data,gameMod,isSystem){
        cc.log(data);
        var copyData = gameclass.clone(data);
        if(isSystem){
            copyData.name = "老炮王";
            copyData.uid = 100000;
            copyData.ip = "666.66.66.66";
            copyData.address = "地址未知";
            copyData.head = "res/im_headbg8.png";
        }
        this.showBaseInfo(copyData,gameMod,1);
        this.sendTalk();
    },

    showBaseInfo:function(data,gameMod,type){
        this.gameMod=gameMod;
        this.playerData=data;
        var name=data.name||"游客";
        this.playerName.setString(name);
        this.Id_text.setString("ID:"+data.uid);
        this.Ip_text.setString(data.ip || "IP未知");
        this.adr_text.setString(data.address || "地址未知");
        this.showPlayerSign(data.uid);

        var _this = this;
        var btn_report = ccui.helper.seekWidgetByName(this.node,"Button_1");
        btn_report.setVisible(!(_this.game.modmgr.mod_login.logindata.uid == data.uid));
        btn_report.addTouchEventListener(function(sender,type){
            if(type == ccui.Widget.TOUCH_ENDED){
                _this.game.uimgr.showui("gameclass.report").setBaseInfo(data.uid);
                _this.game.uimgr.closeui("gameclass.chatMicLayer");
            }
        })
        if(type == 0){
            gameclass.mod_base.showtximg(this.playerIcon, data.imgurl, 0, 0,"im_headbg6");
        }else{
            gameclass.mod_base.showtximg(this.playerIcon, data.head, 0, 0,"im_headbg6");
        }

    },


    sendTalk:function(){
        var migicArr=ccui.helper.seekWidgetByName(this.node,"lookListView").getChildren();
        var _this = this;
        for(var i=0;i<migicArr.length;i++){
            migicArr[i].setTag(i);
            migicArr[i].addTouchEventListener(function(sender,type){
                if(type==ccui.Widget.TOUCH_ENDED){
                    if(_this.gameMod && _this.playerData)
                        var _sendObj={};
                    _sendObj.type=sender.getTag();
                    _sendObj.hitUid= _this.playerData.uid;
                    if(_sendObj.hitUid == 100000){
                        _sendObj.hitUid = 0;
                    }
                    _this.gameMod.chat(4,JSON.stringify(_sendObj));
                    _this.game.uimgr.closeui("gameclass.chatMicLayer");
                }
            })
        }
    },

    showPlayerSign:function(uid){
        if(uid == 100000) {
            ccui.helper.seekWidgetByName(this.node,"sign").setString("哈哈哈哈哈,鸿运当头赶也赶不走!");
            return;
        };
        if(uid == this.game.modmgr.mod_login.logindata.uid){
            var sign =  this.game.modmgr.mod_login.logindata.sign;
            if(sign == "")
                sign = "这家伙很懒,什么都没留下！"
            ccui.helper.seekWidgetByName(this.node,"sign").setString(sign);
        }else{
            var tool = new gameclass.mod_ranking();
            var _this = this;
            tool.getPlayerInfo(uid,function(retdata){
                var sign = retdata.sign;
                if(sign == "")
                    sign = "这家伙很懒,什么都没留下！"
                ccui.helper.seekWidgetByName(_this.node,"sign").setString(sign);
            })
        }
    },

});