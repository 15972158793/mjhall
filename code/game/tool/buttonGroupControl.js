/**
 * tab按钮组控制器
 * @type {Function}
 */
gameclass.buttonGroupControl = cc.Class.extend({
    _callback:null,
    _btnControlArr: null,
    _selectIndex:0,
    //按钮点击事件名
    _BTN_CLICK:"BTN_CLICK",
    ctor: function (callback) {
        this._callback = callback;
    },
    initListen: function () {
        if (!this._btnControlArr) return;

        var len = this._btnControlArr.length;
        for (var i = 0; i < len; i++) {
            var btnControl = this._btnControlArr[i];
            var btn = btnControl._btnNode;
            btn.addTouchEventListener(this.btnClickHandle.bind(this));
        }
    },
    initData: function ($btnControlArr) {
        this._btnControlArr = $btnControlArr;

        this.initListen();
    },
    setSelectIndex:function (index) {
        this._selectIndex = index;
        this.updateSelect();
    },
    updateSelect:function () {
        var len = this._btnControlArr.length;
        for (var i = 0; i < len; i++) {
            var btnControl = this._btnControlArr[i];
            var btn = btnControl._btnNode;
            if(i === this._selectIndex){
                btnControl.setSelect(true);
            }else{
                btnControl.setSelect(false);
            }
        }
    },
    btnClickHandle: function (sender, type) {
        if(type != ccui.Widget.TOUCH_ENDED)return;
        var len = this._btnControlArr.length;
        for (var i = 0; i < len; i++) {
            var btnControl = this._btnControlArr[i];
            var btn = btnControl._btnNode;
            if(btn === sender && !btnControl._isSelect){
                this.setSelectIndex(i);
                if(this._callback){
                    this._callback(i);
                }else{
                    cc.eventManager.dispatchCustomEvent(this._BTN_CLICK, {index:i});
                }
                break;
            }
        }
    },
    destroy: function () {
        this._btnControlArr = null;
    }
});
gameclass.buttonGroupControl.prototype.switchBtnControl = function(btnArr, normalArr, selectArr){
    var btnControlArr = [];
    var len = btnArr.length;
    for(var i = 0;i<len;i++){
        var btnControl = new gameclass.baseButtonControl(btnArr[i], normalArr, selectArr);
        btnControlArr.push(btnControl);
    }
    return btnControlArr;
}
gameclass.buttonGroupControl.prototype.createStand = function(parent, len){
    var btnControlArr = [];
    for(var i = 0;i<len;i++){
        var btn = parent.getChildByName("btn"+i);
        btnControlArr.push(new gameclass.baseButtonControl(btn, ["normal"], ["select"]));
    }
    this.initData(btnControlArr);
}