/**
 * Created by Administrator on 2017/7/18.
 */
gameclass.clubzhanji = gameclass.baseui.extend({
    node:null,
    game:null,
    ctor: function ($node, game) {
        this.node = $node;
        this.game = game;
        this._super();
    },

    show: function () {

    },
    addzhanjiTableview:function(clubzjinfos){
        var tabview = new clubTableview(this.game,clubzjinfos,6);
        this.node.addChild(tabview);
    },
});
