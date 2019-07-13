gameclass.cuoPaiOneLayer = gameclass.baseui.extend({
    spriteUrl:null,
    _sp:null,
    forntPanel:null,
    backPanel:null,
    _back:null,
    _isCanTouch:null,
    _lastPos:null,
    _isAddEvent:null,
    openTimes: 0,
    isMoveEnd: 1,
    ctor: function () {
        this._super();
        this.UiNode=null;
        this._isCanTouch=true;
    },
    show: function () {
        this.addClickEvent();
    },
    setData:function (spriteUrl) {
        //半透黑背景
        this._bgFrame = cc.LayerColor(cc.color(0,0,0,180));
        this._bgFrame.setContentSize(cc.size(1280,720));
        this.addChild(this._bgFrame,0);
        this.spriteUrl=spriteUrl;
        this.sY = 142;//牌平铺初始值
        this.eY = 650;//牌平铺最大值
        this.sPosY = 0;//touch初始值
        this.ePosY = 0;//touch结束值
        var size = cc.winSize;
        //牌的正面和背面
        this.sprite = new cc.Sprite();
        this.sprite.setSpriteFrame("poker_"+this.spriteUrl);
        this.sprite.setRotation(90);
        this.sprite.setAnchorPoint(cc.p(0.5,0.15));
        this.sprite.setPosition(cc.p(size.width/2-169,size.height/4+128));
        this.maskLayer = new cc.Sprite(res.maskLayer);
        this.maskLayer.setPosition(cc.p(180,240.5));
        this.sprite.addChild(this.maskLayer);

        this.sprite1 = new cc.Sprite(res.nn331_beimian_big);
        this.sprite1.setAnchorPoint(cc.p(0.5,0.15));
        this.sprite1.setPosition(cc.p(size.width/2,size.height/4));

        var nodeGrid = new cc.NodeGrid();
        this.pageTurn = cc.Grid3D.create(cc.size(2, 500));
        this.pageTurn.calculateHorizontalVertexPoints(this.sY,2);
        this.pageTurn.setActive(true);
        nodeGrid.setGrid(this.pageTurn);
        nodeGrid.addChild(this.sprite);
        nodeGrid.setAnchorPoint(cc.p(0.5,0.5));

        var nodeGrid1 = new cc.NodeGrid();
        this.pageTurn1 = cc.Grid3D.create(cc.size(2, 500));
        this.pageTurn1.calculateHorizontalVertexPoints(this.sY,1);
        this.pageTurn1.setActive(true);
        nodeGrid1.setGrid(this.pageTurn1);
        nodeGrid1.addChild(this.sprite1);
        nodeGrid1.setAnchorPoint(cc.p(0.5,0.5));


        this.pailayer = new cc.Layer();
        this.addChild(this.pailayer);
        this.pailayer.addChild(nodeGrid1);
        this.pailayer.addChild(nodeGrid);
        this.pailayer.setPosition(cc.p(0,0))

        cc.director.setDepthTest(true);
    },
    addClickEvent:function(){
        _this = this;
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
            onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件处理回调函数
                cc.director.setDepthTest(true);
                _this.mPosY = touch.getLocation().y
                _this.unscheduleUpdate(); //移除schedule
                return true;
            },
            onTouchMoved: function (touch, event) {         //实现onTouchMoved事件处理回调函数, 触摸移动时触发
                if(_this.isMoveEnd != 1)return;
                var touchY =  (touch.getLocation().y - _this.mPosY + _this.sY)*1.3;
                if(touchY < _this.sY||touchY > _this.eY){
                    return;
                }
                _this.ePosY = touchY;
                _this.pageTurn.calculateHorizontalVertexPoints(touchY,2);
                _this.pageTurn1.calculateHorizontalVertexPoints(touchY,1);
                //搓动牌到0.6时，自动摊开
                var per = (_this.ePosY - _this.sY)/(_this.eY - _this.sY)
                if(per > 0.6){
                    _this.isMoveEnd = 2;
                    _this.unscheduleUpdate(); //移除schedule
                    _this.scheduleUpdate();
                }
            },
            onTouchEnded: function (touch, event) {         // 实现onTouchEnded事件处理回调函数
                var per = (_this.ePosY - _this.sY)/(_this.eY - _this.sY)
                if(per < 0.6){
                    _this.scheduleUpdate(); //开启每帧调用，对应update
                }
            },
            onTouchCancelled:function(){

            }
        });
        cc.eventManager.addListener(listener1, this);
    },
    update : function() {
        //牌没翻开，回位。
        if(this.isMoveEnd == 1){
            this.ePosY -= 20;
            this.pageTurn.calculateHorizontalVertexPoints(this.ePosY,2);
            this.pageTurn1.calculateHorizontalVertexPoints(this.ePosY,1);
            if(this.ePosY <= this.sY){
                this.pageTurn.calculateHorizontalVertexPoints(this.sY,2);
                this.pageTurn1.calculateHorizontalVertexPoints(this.sY,1);
                this.unscheduleUpdate(); //移除schedule
            }
        }
        //牌摊开
        if(this.isMoveEnd == 2){
            if(this.openTimes == 0 || this.openTimes == 2){
                this.pageTurn.calculateHorizontalVertexPoints1(420,2);
                this.pageTurn1.calculateHorizontalVertexPoints1(420,1);
                this.pailayer.setPosition(cc.p(0,55));
            }else if(this.openTimes == 3||this.openTimes == 4){
                this.pageTurn.calculateHorizontalVertexPoints1(370,2);
                this.pageTurn1.calculateHorizontalVertexPoints1(370,1);
                this.pailayer.setPosition(cc.p(0,146));
            }else if(this.openTimes == 5){
                this.isMoveEnd = 3
                this.pageTurn.calculateHorizontalVertexPoints1(0,2);
                this.pageTurn1.calculateHorizontalVertexPoints1(0,1);
                this.pailayer.setPosition(cc.p(0,0));
                //_this.sprite1.setPosition(cc.p(size.width/2,-100));
                this.sprite.setScaleX(-1);
                this.sprite1.setVisible(false);
                this.unscheduleUpdate(); //移除schedule
                this.scheduleUpdate();
            }
            this.openTimes++
        }
        //档牌显示
        if(this.isMoveEnd == 3){
            this.maskLayer.runAction(new cc.Sequence( new cc.FadeOut(0.5) ,new cc.DelayTime(1) ,  new cc.CallFunc(function () {
                this.unscheduleUpdate(); //移除schedule
                this.reSetPos();
            },this)));
        }
    },
    reSetPos:function () {
        var that=this;
        this.removeAllChildren(true);
        var sprite=new cc.Sprite()
        sprite.setSpriteFrame("poker_"+this.spriteUrl);
        sprite.setRotation(90);
        sprite.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        this.addChild(sprite);
        sprite.runAction(cc.sequence(cc.rotateTo(0.2,0),cc.scaleTo(0.5,0.25),cc.delayTime(0.25),cc.moveBy(0.25,cc.p(0,-380))));
        this._isCanTouch=false;
        this.scheduleOnce(function(){
            if(that.game.uimgr.uis["gameclass.nystable"]){
                that.game.uimgr.uis["gameclass.nystable"].showCuoPaiOneLayer(false,that.spriteUrl);
            }
            if(that.game.uimgr.uis["gameclass.goldNysTable"]){
                that.game.uimgr.uis["gameclass.goldNysTable"].showCuoPaiOneLayer(false,that.spriteUrl);
            }
        },1.2)
    },
    onExit:function(){
        this._super();
        cc.director.setDepthTest(false);
    },
    destoryThis:function(){
    }
});