/**
 * Created by yang on 2016/11/28.
 */
gameclass.chatuinew = gameclass.baseui.extend({
    sprite: null,
    node:null,
    chat_cy:[],
    chat_bq:[],
    tb_cyy:null,
    tb_qb:null,
    mod_game:null,
    ctor: function () {
        this._super();
    },
    show:function(){
        var _this = this;
        this.node = this.game.uimgr.createnode(res.chatui,true);

        this.chat_cy[0] = ccui.helper.seekWidgetByName(this.node, "chat_cy1");
        this.chat_cy[1] = ccui.helper.seekWidgetByName(this.node, "chat_cy2");
        this.chat_bq[0] = ccui.helper.seekWidgetByName(this.node, "chat_bq1");
        this.chat_bq[1] = ccui.helper.seekWidgetByName(this.node, "chat_bq2");

        this.tb_cyy = ccui.helper.seekWidgetByName(this.node, "cyy");
        this.tb_qb = ccui.helper.seekWidgetByName(this.node, "qb");

        this.addChild(this.node);

        this.showCYY();

        gameclass.createbtnpress(this.node, "bg", function () {
            _this.game.uimgr.closeui("gameclass.chatuinew");
        });

        gameclass.createbtnpress(this.node, "Button_4", function () {
            var text = ccui.helper.seekWidgetByName(_this.node, "input").getString();
            if(text == "") {
                return;
            }
            _this.mod_game.chat(1, text);
            _this.game.uimgr.closeui("gameclass.chatuinew");
        });

        var clickcyy = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    _this.showCYY();
                    break;
            }
        };
        this.chat_cy[1].addTouchEventListener(clickcyy);

        var clickbq = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    _this.showBQ();
                    break;
            }
        };
        this.chat_bq[1].addTouchEventListener(clickbq);

        var clickchat = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    //_this.mod_game.chat(1, g_chatstr[sender.getTag() - 1]);
                    _this.mod_game.chat(1,sender.getString());
                    _this.game.uimgr.closeui("gameclass.chatuinew");
                    break;
            }
        };

        for(var i = 1; i <= 9; i++) {
            var chat = ccui.helper.seekWidgetByName(this.tb_cyy, "chat_" + i.toString());
            chat.setTag(i);
            chat.addTouchEventListener(clickchat);
        }

        var clickbq = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    _this.mod_game.chat(2, sender.getTag().toString());
                    _this.game.uimgr.closeui("gameclass.chatuinew");
                    break;
            }
        };

        for(var i = 0; i <= 19; i++) {
            var bq = ccui.helper.seekWidgetByName(this.tb_qb, "box" + i);
            bq.setTag(i);
            bq.addTouchEventListener(clickbq);
        }
    },
    setmod:function(_mod_game){
        var _this = this;
        this.mod_game = _mod_game;
    },

    setBZWmod:function(_mod_game,sex){
        var _this = this;
        this.mod_game = _mod_game;

        var talkArr = (sex == 0 ? g_chatstr_bzw_man : g_chatstr_bzw_woman);

        for(var i = 1; i <= 9; i++) {
            var chat = ccui.helper.seekWidgetByName(this.tb_cyy,"chat_"+i);
            chat.setVisible(i<7);
            if(chat>=7) continue;
            chat.setString(talkArr[i-1]);
        }
    },

    getSex:function(sex){
        if(sex == 1 || sex == 2){
            return sex-1;
        }else{
            return 0;
        }
    },

    //! 显示常用于
    showCYY:function() {
        this.chat_cy[0].setVisible(true);
        this.chat_cy[1].setVisible(false);
        this.chat_bq[0].setVisible(false);
        this.chat_bq[1].setVisible(true);

        this.tb_cyy.setVisible(true);
        this.tb_qb.setVisible(false);
    },

    //! 显示表情
    showBQ:function() {
        this.chat_cy[0].setVisible(false);
        this.chat_cy[1].setVisible(true);
        this.chat_bq[0].setVisible(true);
        this.chat_bq[1].setVisible(false);

        this.tb_cyy.setVisible(false);
        this.tb_qb.setVisible(true);
    },
});