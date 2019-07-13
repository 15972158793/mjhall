/**
 * Created by Administrator on 2017-10-30.
 */

gameclass.chatMicLayer_sl = gameclass.baseui.extend({
    gameMod:null,
    playerData:null,
    ctor: function () {
        this._super();
        this.gameMod=null;
        this.playerData=null;
    },

    show: function () {
        this.node = this.game.uimgr.createnode(res.chatMicLayer_sl,true);
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
                _this.game.uimgr.closeui("gameclass.chatMicLayer_sl");
            }
        })
    },
    setBZWinfo:function(data,gameMod,isSystem){
        var copyData = gameclass.clone(data);
        if(isSystem){
            copyData.name = "老炮王";
            copyData.uid = 100000;
            copyData.ip = "666.66.66.66";
            copyData.address = "地址未知";
            copyData.head = "res/im_headbg8.png";
            copyData.sign = "哈哈哈哈哈,鸿运当头赶也赶不走!";
            copyData.sex = 1;
        }
        this.showBaseInfo(copyData,gameMod,1);
        this.sendTalk();
    },

    setPlayerInfo:function (data,gameMod,index) {
        this.gameMod=gameMod;
        this.playerData=data;
        var name=data.name||"游客";
        this.playerName.setString(name);
        this.Id_text.setString(data.uid);
        this.Ip_text.setString(data.ip);
        this.adr_text.setString(data.address);

        gameclass.mod_base.showtximg(this.playerIcon, data.imgurl, 0, 0,"im_headbg6");

        if(index == 0) return;
        var _this = this;
        var migicArr=ccui.helper.seekWidgetByName(this.node,"lookListView").getChildren();
        for(var i=0;i<migicArr.length;i++){
            migicArr[i].setTag(i);
            migicArr[i].addTouchEventListener(function(sender,type){
                if(type==ccui.Widget.TOUCH_ENDED){
                    if(_this.gameMod&&_this.playerData)
                        var _sendObj={};
                    _sendObj.type=sender.getTag();
                    _sendObj.hitUid=_this.playerData.uid;
                    _this.gameMod.chat(4,JSON.stringify(_sendObj));
                    _this.game.uimgr.closeui("gameclass.chatMicLayer_sl");
                }
            })
        }
    }
});