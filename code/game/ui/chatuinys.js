/**
 * Created by yang on 2016/11/28.
 */
gameclass.chatuinys = gameclass.baseui.extend({
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
        this.node = this.game.uimgr.createnode(res.chatnys,true);

        this.chat_cy[0] = ccui.helper.seekWidgetByName(this.node, "chat_cy1");
        this.chat_cy[1] = ccui.helper.seekWidgetByName(this.node, "chat_cy2");
        this.chat_bq[0] = ccui.helper.seekWidgetByName(this.node, "chat_bq1");
        this.chat_bq[1] = ccui.helper.seekWidgetByName(this.node, "chat_bq2");

        this.tb_cyy = ccui.helper.seekWidgetByName(this.node, "cyy");
        this.tb_qb = ccui.helper.seekWidgetByName(this.node, "qb");

        this.addChild(this.node);

        this.showCYY();

        gameclass.createbtnpress(this.node, "bg", function () {
            _this.game.uimgr.closeui("gameclass.chatuinys");
        });

        gameclass.createbtnpress(this.node, "Button_4", function () {
            var text = ccui.helper.seekWidgetByName(_this.node, "input").getString();
            if(text == "") {
                return;
            }
            _this.mod_game.chat(1, text);
            _this.game.uimgr.closeui("gameclass.chatuinys");
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
                    _this.mod_game.chat(1, g_chatstr_nys[sender.getTag()-1]);
                    _this.game.uimgr.closeui("gameclass.chatuinys");
                    break;
            }
        };

        for(var i = 1; i <= 12; i++) {
            var chat = ccui.helper.seekWidgetByName(this.tb_cyy, "chat_" + i.toString());
            chat.setTag(i);
            chat.addTouchEventListener(clickchat);
        }

        var clickbq = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.log("22222");
                    _this.mod_game.chat(2, (sender.getTag()).toString());
                    _this.game.uimgr.closeui("gameclass.chatuinys");
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