/**
 * Created by Administrator on 2017-11-12.
 */


gameclass.cuoPLayer = ccui.Layout.extend({
    pokeArr:null,

    beginPos:null,
    beginAngel:null,
    isEnd:null,
    timer:null,

    ctor:function(_pokerArr,callfunc){
        this._super();
        this.pokeArr = _pokerArr;
        this.callBack = callfunc;
        this.setContentSize(1136,640);
        var bg = new cc.LayerColor(cc.color(0,0,0,180));
        bg.setContentSize(cc.size(1136,640));
        this.addChild(bg,0);
        this.setTouchEnabled(true);
        this.initShow();
        this.isEnd  = false;
        this.timer = 0;

        this.scheduleUpdate();
        this.update = this.update.bind(this);
    },

    initShow:function(){
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist1);
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist2);
        cc.spriteFrameCache.addSpriteFrames(res.cardsBigplist3);

        for(var i = 0;i < this.pokeArr.length;i++){
            var pokerSp = this.createCard(this.pokeArr[i]);
            pokerSp.setContentSize(360,480);
            pokerSp.setPosition(1136/2-180,-100);
            pokerSp.setAnchorPoint(cc.p(0, 0));
            pokerSp.setTag(i+100);
            this.addChild(pokerSp);
            pokerSp.setTouchEnabled(true);
            pokerSp.addTouchEventListener(this.onPokerTouch.bind(this));
        }
    },

    onPokerTouch:function(sender,type){
        if(this.isEnd) return;
        if(type == ccui.Widget.TOUCH_BEGAN){
            this.beginPos = sender.getTouchBeganPosition();
            this.localPos = sender.convertToNodeSpace(this.beginPos);
            //cc.log(this.localPos);
            this.beginAngel = sender.getRotation();

        }else if(type == ccui.Widget.TOUCH_MOVED){
            var moveX = sender.getTouchMovePosition().x - this.beginPos.x;
            var difAngle =  this.getAngle(cc.p(moveX, this.beginPos.y)) ;

            if(this.beginAngel + difAngle < 0) {
                return false;
            }
            if(this.beginAngel + difAngle > 45){
                return false;
            }
            sender.setRotation(this.beginAngel + difAngle);

        }else if(type == ccui.Widget.TOUCH_ENDED){

        }else if(type == ccui.Widget.TOUCH_CANCELED){

        }
    },

    getAngle:function(pos){
        var angle2 = (Math.atan(pos.x/pos.y))*180/Math.PI;
        return angle2;
    },

    createCard:function (card) {
        var abcd = ["a", "d", "b", "c"];
        var point = Math.floor(card / 10);
        var type = card % 10;
        var spr = new ccui.ImageView("poker_card_"+point+abcd[type-1]+".png",ccui.Widget.PLIST_TEXTURE);
        return spr;
    },

    showEndCard:function(){
        var _this = this;
        var angleArr = [-30,-15,0,15,30];
        for(var i = 4;i >=0 ;i--){
            var node = this.getChildByTag(100+i);
            node.runAction(cc.sequence(cc.rotateTo(0.5,angleArr[i]),cc.delayTime(1.5),cc.callFunc(function(){
                _this.removeFromParent(true);
                _this.callBack();
            })));
        }
    },

    update:function(dt){
        if(this.getChildByTag(101).getRotation() > 15 || this.timer > 7 ){
            this.isEnd = true;
            this.showEndCard();
            this.unscheduleUpdate();
        }
        this.timer += dt;
    }



})
