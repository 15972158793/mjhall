gameclass.playMenuCtr = cc.Class.extend({
    //显示按钮
    _btn: null,
    //隐藏按钮
    _hideBtn: null,
    //待显示的层
    _layer: null,
    //隐藏位置
    _hidePos: null,
    //显示位置
    _showPos: null,
    //是否显示
    _isShow: true,
    ctor: function (btn, layer, hidePos, showPos) {
        this._btn = btn;
        this._layer = layer;
        this._hidePos = hidePos;
        this._showPos = showPos;
        this.init();
        this.initView();
        this.initListen();
        this.initialize();
    },
    init: function () {
        this._hideBtn = new ccui.Layout();
    },
    initView: function () {
        if (this._layer.getParent()) {
            this._layer.getParent().addChild(this._hideBtn);
        }
    },
    initListen: function () {
        this._btn.addTouchEventListener(this.btnClickHandle, this);
        this._hideBtn.addTouchEventListener(this.hideHandle, this);
    },
    initialize: function () {
        this._hideBtn.setLocalZOrder(1);
        this._layer.setLocalZOrder(2);
        this._btn.setLocalZOrder(3);

        this._hideBtn.setTouchEnabled(true);
        this._hideBtn.setContentSize(cc.winSize);
        this.hideComplet();

    },
    btnClickHandle: function (sender, type) {
        if(type != ccui.Widget.TOUCH_ENDED)return;
        if (this._isShow) return;

        this._isShow = true;
        this._layer.runAction(cc.sequence(
            cc.moveTo(0.3, this._showPos),
            cc.callFunc(this.showComplete.bind(this))));
    },
    /**
     * 完成显示动作处理
     */
    showComplete:function () {
        // cc.log("showComplete");
        this._isShow = true;
        this._layer.setPosition(this._showPos);
        this._hideBtn.setVisible(true);
    },
    hideHandle: function (sender, type) {
        if(type != ccui.Widget.TOUCH_ENDED)return;

        if (!this._isShow) return;

        this._isShow = false;
        this._layer.runAction(cc.sequence(
            cc.moveTo(0.3, this._hidePos),
            cc.callFunc(this.hideComplet.bind(this))));
    },
    hideComplet:function () {
        // cc.log("hideComplete");
        this._isShow = false;
        this._layer.setPosition(this._hidePos);
        this._hideBtn.setVisible(false);
    }
});