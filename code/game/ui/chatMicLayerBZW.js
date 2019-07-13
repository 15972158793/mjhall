
gameclass.chatMicLayerBZW = gameclass.baseui.extend({
    gameMod:null,
    playerData:null,
    ctor: function () {
        this._super();
        this.gameMod=null;
        this.playerData=null;
    },

    show: function () {
        this.node = this.game.uimgr.createnode(res.chatMicLayerBzw,true);
        this.addChild(this.node);
        var _this=this;
        var backBtn=ccui.helper.seekWidgetByName(this.node,"Panel_1");
        this.playerName=ccui.helper.seekWidgetByName(this.node,"name");
        this.Id_text=ccui.helper.seekWidgetByName(this.node,"uid_Text");
        this.Ip_text=ccui.helper.seekWidgetByName(this.node,"uip_Text");
        this.adr_text=ccui.helper.seekWidgetByName(this.node,"address_Text");
        this.sexLogo = ccui.helper.seekWidgetByName(this.node,"sexLogo");
        this.playerIcon=ccui.helper.seekWidgetByName(this.node,"icon");
        this.signNode = ccui.helper.seekWidgetByName(this.node,"sign");
        backBtn.addTouchEventListener(function(sender,type){
            if(type==ccui.Widget.TOUCH_ENDED){
                _this.game.uimgr.closeui("gameclass.chatMicLayerBZW");
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
        var copyData = gameclass.clone(data);
        if(isSystem){
            copyData.name = "老炮王";
            copyData.uid = 100000;
            copyData.ip = "666.66.66.66";
            copyData.address = "地址未知";
            copyData.head = "res/im_headbg8.png";
            copyData.sign = "奖池透明，绝不杀分，坚决维护玩家和代理的利益！";
            copyData.sex = 1;
        }
        this.showBaseInfo(copyData,gameMod,1);
        this.sendTalk();
    },

    setBRTTZinfo:function(data,gameMod,isSystem){
        var copyData = gameclass.clone(data);
        if(isSystem){
            copyData.name = "小倩";
            copyData.uid = 100001;
            copyData.ip = "555.55.55.55";
            copyData.address = "地址未知";
            copyData.head = "res/im_headbg11.png";
            copyData.sign = "奖池透明，绝不杀分，坚决维护玩家和代理的利益！";
            copyData.sex = 2;
        }
        this.showBaseInfo(copyData,gameMod,1);
        this.sendTalk();
    },

    setSXDBinfo:function(data,gameMod,isSystem){
        var copyData = gameclass.clone(data);
        if(isSystem){
            copyData.name = "小倩";
            copyData.uid = 100002;
            copyData.ip = "222.22.22.22";
            copyData.address = "地址未知";
            copyData.head = "res/im_headbg13.png";
            copyData.sign = "奖池透明，绝不杀分，坚决维护玩家和代理的利益！";
            copyData.sex = 2;
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
        var sign = data.sign;
        if(!sign || sign == "") sign = "这家伙很懒,什么都没留下！";
        this.signNode.setString(sign);
        var sex = data.sex ;
        if(sex != 1){
            sex = 2;
        }
        this.sexLogo.setTexture(res["sex"+(sex-1)]);
        this.playerName.ignoreContentAdaptWithSize(true);
        this.sexLogo.setPosition(this.playerName.getPositionX()+this.playerName.getContentSize().width+this.sexLogo.width/2+10,
            this.playerName.getPositionY());


        var _this = this;
        var btn_report = ccui.helper.seekWidgetByName(this.node,"Button_1");
        btn_report.setVisible(!(_this.game.modmgr.mod_login.logindata.uid == data.uid));
        btn_report.addTouchEventListener(function(sender,type){
            if(type == ccui.Widget.TOUCH_ENDED){
                _this.game.uimgr.showui("gameclass.reportTB").setBaseInfo(data.uid);
                _this.game.uimgr.closeui("gameclass.chatMicLayerBZW");
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
                    if(_sendObj.hitUid == 100000 || _sendObj.hitUid == 100001 || _sendObj.hitUid == 100002){
                        _sendObj.hitUid = 0;
                    }
                    _this.gameMod.chat(4,JSON.stringify(_sendObj));
                    _this.game.uimgr.closeui("gameclass.chatMicLayerBZW");
                }
            })
        }
    },

});