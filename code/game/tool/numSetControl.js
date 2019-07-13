/**
 * 设置数值面板控制器，构造函数中传入的node的孩子命名必须规范，参考wzqSetScore
 * @type {Function}
 */
gameclass.numSetControl = gameclass.numSetSimpleCtr.extend({
    //关闭按钮
    _closeBtn: null,
    //确定按钮
    _okBtn: null,
    //确定按钮回调
    _okBtnCallback: null,
    ctor: function (node, isImgShow, maxLen) {
        this._super(node, isImgShow, maxLen);
    },
    init: function () {
        this._super();
        this._okBtn = this._operateLayer.getChildByName("okBtn");
        this._closeBtn = this._operateLayer.getChildByName("backBtn");
    },
    initListen: function () {
        this._super();
        this._closeBtn.addTouchEventListener(this.clickCloseHandle, this);
        this._okBtn.addTouchEventListener(this.clickOkHandle, this);
    },
    clickCloseHandle: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;

        cc.eventManager.dispatchCustomEvent(this._EVENT_CLOSE, {});
    },
    clickOkHandle: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;

        if(this._okBtnCallback){
            this._okBtnCallback(this.getNumber());
        }else{
            cc.eventManager.dispatchCustomEvent(this._EVENT_OK, {number: this.getNumber()});
        }
    },
});
/**
 * 默认最大长度
 * @type {number}
 */
gameclass.numSetControl.defaultMaxLen = 6;
/**
 * 关闭默认事件名
 * @type {string}
 */
gameclass.NUMSET_CLOSE_DEFAULT = "gameclass.NUMSET_CLOSE_DEFAULT";
/**
 * 确认默认事件名
 * @type {string}
 */
gameclass.NUMSET_OK_DEFAULT = "gameclass.NUMSET_OK_DEFAULT";
/**
 * 已填满默认事件名
 * @type {string}
 */
gameclass.NUMSET_FULL_DEFAULT = "gameclass.NUMSET_FULL_DEFAULT";