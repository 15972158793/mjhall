/**
 * Created by Administrator on 2017-11-7.
 */


gameclass.piaofen = cc.Node.extend({

    ctor:function(_score){

        this._super();

        var mycsd = null;
        var logo = null;
        if(_score > 0){
            mycsd = ccs.load(res.winGold);
            logo = new cc.Sprite(res.jiaLogo);
        }else{
            _score = -_score;
            mycsd = ccs.load(res.lostGold);
            logo  = new cc.Sprite(res.jianLogo);
        }

        this.node = mycsd.node;
        this.addChild(this.node);
        var text = this.node.getChildByName("text");
        text.setString(_score);
        text.ignoreContentAdaptWithSize(true);
        text.runAction(cc.fadeTo(1,200));

        //加减号
        logo.setPositionX(-(text.getContentSize().width/2 + logo.getContentSize().width/2));
        this.addChild(logo);

    },

})
