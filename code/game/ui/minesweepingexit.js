/**
 * Created by yang on 2016/11/10.
 */

gameclass.minesweepingexit = gameclass.baseui.extend({
    node:null,
    pl_agree:null,
    pl_wait:null,
    ctor: function () {
        this._super();
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.msexitroom, true);
        //this.pl_agree = ccui.helper.seekWidgetByName(this.node, "agree");
        this.pl_wait = ccui.helper.seekWidgetByName(this.node, "wait");
        this.okbtn = ccui.helper.seekWidgetByName(this.node, "okbtn");
        this.cancelbtn = ccui.helper.seekWidgetByName(this.node, "cancelbtn");

        this.addChild(this.node);

        var _this = this;

        gameclass.createbtnpress(this.node, "cancelbtn", function () {
            _this.game.uimgr.closeui("gameclass.minesweepingexit");
            _this.mod_niuniu.nodissmissroom();
        });

        gameclass.createbtnpress(this.node, "okbtn", function () {
            _this.mod_niuniu.dissmissroom();
        });
    },

    setData:function(mod_niuniu, data) {
        //"msgdata":"{\"agree\":[100003],\"time\":300}"}

        //var lst = data.agree
        this.mod_niuniu = mod_niuniu;
        var _this = this;

        var lefttime = ccui.helper.seekWidgetByName(this.node, "leftTime");
        var run = cc.repeatForever(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            var servertime = _this.mod_niuniu.mywebsocket.getcurservertime();
            var _time = data.time - servertime;
            if(_time <= 0){
                _time = 0;
            }
            lefttime.setString(_time + "秒后解散房间");
        })));

        lefttime.runAction(run);

        var chair = mod_niuniu.getchairbyuid(data.agree[0]);
        ccui.helper.seekWidgetByName(this.node,"tv_content").setString(mod_niuniu.roominfo.person[chair].name + "申请解散房间，是否同意？");

        for (var i = 0; i < 5; i++){
            // var node = ccui.helper.seekWidgetByName(this.node, "p" + (i + 1).toString());
            // node.setVisible(i < this.mod_niuniu.roominfo.person.length);
            if(i >= this.mod_niuniu.roominfo.person.length) {
                continue;
            }

            var player = this.mod_niuniu.roominfo.person[i];
            cc.log(player);

            // gameclass.mod_base.showtximg(node, player.imgurl, 0, 0, "im_headbg4");
            // ccui.helper.seekWidgetByName(node, "name").setString(player.name);
            // ccui.helper.seekWidgetByName(node, "name").setColor(cc.color(166, 118, 203));
            //var state = ccui.helper.seekWidgetByName(node, "state");
            var find = 0;
            for(var j = 0; j < data.agree.length; j++) {
                if(data.agree[j] == player.uid) {
                    if(j == 0) {
                        find = 2;      //! 申请者
                    } else {
                        find = 1;     //! 同意者
                    }
                }
            }

            // if(find == 0) {
            //     state.setString("(等待中)");
            //     state.setTextColor(cc.color(255, 255, 255));
            // } else if(find == 1) {
            //     state.setString("(同意)");
            //     state.setTextColor(cc.color(0, 255, 36));
            // } else {
            //     state.setString("(申请解散)");
            //     state.setTextColor(cc.color(231, 72, 30));
            // }

            if(player.uid == this.game.modmgr.mod_login.logindata.uid) {
                this.okbtn.setVisible(find == 0);
                this.cancelbtn.setVisible(find == 0);
                this.pl_wait.setVisible(find != 0);
            }
        }
    }
});