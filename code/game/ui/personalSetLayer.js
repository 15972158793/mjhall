/**
 * Created by Administrator on 2017-11-4.
 */

gameclass.personalSetLayer = gameclass.baseui.extend({
    node:null,

    ctor: function () {
        this._super();
    },

    show:function(){
        this.node = this.game.uimgr.createnode(res.personalSetLayer,true);
        this.addChild(this.node);

        var _this = this;
        gameclass.createbtnpress(this.node, "btn_close", function () {
            _this.game.uimgr.closeui("gameclass.personalSetLayer");
        });

        gameclass.createbtnpress(this.node, "btn_ok", function () {
            var data = {"uid":this.game.modmgr.mod_login.logindata.uid,"sex":_this.sex,
                "sign":ccui.helper.seekWidgetByName(_this.node,"TextField_2").getString(), "unionid":mod_userdefault.globaldata.code};
            this.game.modmgr.mod_login.setMyInfo(data,function(mydata){
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.closeui("gameclass.personalSetLayer");
                if(mydata == ""){
                    _this.game.uimgr.uis["gameclass.msgboxui"].setString("设置失败");
                }else{
                    _this.game.uimgr.uis["gameclass.msgboxui"].setString("设置成功");
                    _this.game.modmgr.mod_login.logindata.sex = _this.sex;
                    _this.game.modmgr.mod_login.logindata.sign = ccui.helper.seekWidgetByName(_this.node,"TextField_2").getString();
                }
            });
        });
    },

    setBaseInfo:function(){
        var data = this.game.modmgr.mod_login.logindata;
        var icon = ccui.helper.seekWidgetByName(this.node,"icon");
        gameclass.mod_base.showtximg(icon, data.imgurl, 0, 0, "im_headbg2");
        icon.getChildByName("name").setString(data.name);
        icon.getChildByName("id").setString("ID:"+data.uid);
        this.sex = data.sex;

        var check0 = ccui.helper.seekWidgetByName(this.node,"CheckBox0");
        var check1 = ccui.helper.seekWidgetByName(this.node,"CheckBox1");
        var _this = this;
        var ref = function(){
            check0.setSelected(_this.sex == 0 || _this.sex == 1);
            check1.setSelected(_this.sex == 2);
        }

        check0.addEventListener(function(sender,type){
            _this.sex = 1;
            ref();
        })
        check1.addEventListener(function(sender,type){
            _this.sex = 2;
            ref();
        })

        ref();

        ccui.helper.seekWidgetByName(this.node,"TextField_2").setString(data.sign);
    },

});
