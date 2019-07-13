/**
 * Created by Administrator on 2017/8/15.
 */
gameclass.cuoPaiLayer = gameclass.baseui.extend({
    spriteUrl:null,
    spwidth:null,
    spheight:null,
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.cuoPaiLayer,true);
        this.addChild(this.node);

    },
    setData:function (spriteUrl) {
        this.spriteUrl=spriteUrl;
        for(var i=0;i<spriteUrl.length;i++){
            var _sp=new cc.Sprite();
            _sp.setSpriteFrame("poker_"+spriteUrl[i]);
            _sp.setPosition(cc.winSize.width/2+i*10,cc.winSize.height/2);
            this.node.getChildByName("panelLayer").addChild(_sp);
        }
        this.addClickEvent();
    },
    addClickEvent:function(){
        var _this=this;
        var touchTarget=null;
        var isTouchArr=[];
        var childrenArr=this.node.getChildByName("panelLayer").getChildren();
        for(var i=0;i<childrenArr.length;i++){
            isTouchArr[i]=false;
        }
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var _node=event.getCurrentTarget();
                var childrenArr=_node.getChildren();
                for(var i=childrenArr.length-1;i>=0;i--){
                   var _rect=cc.rect(0,0,childrenArr[i].width,childrenArr[i].height);
                   var pos=childrenArr[i].convertToNodeSpace(touch.getLocation());
                   if(cc.rectContainsPoint(_rect,pos)){
                       touchTarget=childrenArr[i];
                       return true;
                   }
                }
                return false;
            },
            onTouchMoved:function(touch,event){
                var delta=touch.getDelta();
                var pos=cc.p(touchTarget.x+delta.x,touchTarget.y+delta.y);
                touchTarget.setPosition(pos);
            },
            onTouchEnded:function(touch,event){
               var index=childrenArr.indexOf(touchTarget);
                isTouchArr[index]=true;
                for(var i=childrenArr.length-1;i>0;i--){
                    if(!isTouchArr[i]) return false;
                }
                _this._reSetPos();
            },
            onTouchCancel:function(touch,event){
                var index=childrenArr.indexOf(touchTarget);
                isTouchArr[index]=true;
                for(var i=childrenArr.length-1;i>0;i--){
                    if(!isTouchArr[i]) return false;
                }
                _this._reSetPos();
            }
        }),this.node.getChildByName("panelLayer"));
    },
    _reSetPos:function () {
        var childrenArr=this.node.getChildByName("panelLayer").getChildren();
        var that=this;
        this.node.scheduleOnce(function(){
            that.game.uimgr.uis["gameclass.nystable"].showCuoPaiLayer(false,that.spriteUrl);
        },1)
        childrenArr[0].runAction(cc.sequence(cc.moveTo(0.4,cc.p(cc.winSize.width/2-200,cc.winSize.height/2)),cc.rotateTo(0.4,-30),cc.delayTime(0.2)));
        childrenArr[1].runAction(cc.sequence(cc.moveTo(0.4,cc.p(cc.winSize.width/2-100,cc.winSize.height/2)),cc.rotateTo(0.4,-15),cc.delayTime(0.2)));
        childrenArr[2].runAction(cc.sequence(cc.moveTo(0.4,cc.p(cc.winSize.width/2,cc.winSize.height/2)),cc.rotateTo(0.4,0),cc.delayTime(0.2)));
        childrenArr[3].runAction(cc.sequence(cc.moveTo(0.4,cc.p(cc.winSize.width/2+100,cc.winSize.height/2)),cc.rotateTo(0.4,15),cc.delayTime(0.2)));
        childrenArr[4].runAction(cc.sequence(cc.moveTo(0.4,cc.p(cc.winSize.width/2+200,cc.winSize.height/2)),cc.rotateTo(0.4,30),cc.delayTime(0.2)));
    },

    destoryThis:function(){
    }
});