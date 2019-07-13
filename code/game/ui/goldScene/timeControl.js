/**
 * 倒数计时器 将barUrl添加到layout上
 * @type {Function}
 */
gameclass.timeControl = cc.Class.extend({
    _layout: null,
    _barUrl: null,
    _timer: null,
    //_proAction: null,
    _isRun:false,
    _maxTime:0,
    _overTime:0,
    ctor: function (layout, barUrl) {
        this._layout = layout;
        this._barUrl = barUrl;
        this.init();
        this.initView();
        this.initialize();
    },
    init: function () {
        this._isRun = false;
        //this._proAction = cc.progressFromTo(0.1, 100, 0);
        this._timer = new cc.ProgressTimer(new cc.Sprite(this._barUrl));
        this._timer.type = cc.ProgressTimer.TYPE_RADIAL;
        this._timer.setReverseDirection(true);
    },
    initView: function () {
        this._layout.addChild(this._timer);
    },
    initialize: function () {
        this._layout.setVisible(false);
    },
    startCount: function (num) {
        if(num == 0) {
            this._isRun = false;
            this.stopCount();
            return;
        }

        this._isRun = true;
        this._layout.setVisible(true);
        this._maxTime = num*1000;
        this._overTime = parseInt(new Date().getTime()) + num*1000;
        this._timer.setPercentage(100);
        //this._proAction.setDuration(num);
		//this._timer.stopAllActions();
        //this._timer.runAction(this._proAction)
    },
    stopCount: function () {
        this.initialize();
        //this._timer.stopAllActions();
    },
    update: function () {

    },
    destroy:function () {
        this._isRun = false;
        //this._proAction = null;
        this.stopCount();
        this._layout.removeChild(this._timer);
    },
});