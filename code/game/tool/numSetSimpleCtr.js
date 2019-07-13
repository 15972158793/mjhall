/**
 * 设置数值面板控制器，构造函数中传入的node的孩子命名必须规范，参考wzqSetScore
 * @type {Function}
 */
gameclass.numSetSimpleCtr = cc.Class.extend({
    _node: null,
    //显示的数值是否是图片，如果否，则是文本
    _isImgShow: false,
    //可输入长度
    _maxLen: -1,
    //重置按钮
    _resetBtn: null,
    //删除按钮
    _delBtn: null,
    //已选数字列表
    _numArr: null,
    //当前待填数字索引
    _curFillIndex: -1,
    //0-9按钮列表
    _numBtnArr: null,
    //显示的数值背景列表
    _numBgArr: null,
    //显示的数值容器
    _numShowContain: null,
    //控制层
    _operateLayer: null,
    //关闭事件名
    _EVENT_CLOSE: gameclass.NUMSET_CLOSE_DEFAULT,
    //确认事件名
    _EVENT_OK: gameclass.NUMSET_OK_DEFAULT,
    //已填满事件名
    _EVENT_FULL: gameclass.NUMSET_FULL_DEFAULT,
    //填满了数字回调
    _fillFullCallback: null,
    ctor: function (node, isImgShow, maxLen) {
        this._node = node;
        this._isImgShow = isImgShow;
        this._maxLen = maxLen;
        this.init();
        this.initView();
        this.initListen();
        this.initialize();
    },
    init: function () {
        if (!this._maxLen) {
            this._maxLen = gameclass.numSetControl.defaultMaxLen;
        }
        this._curFillIndex = 0;

        this._operateLayer = this._node.getChildByName("operateLayer");
        var dynamicLayer = this._node.getChildByName("dynamicLayer");
        this.staticLayer = this._node.getChildByName("staticLayer");

        this._resetBtn = this._operateLayer.getChildByName("cs");
        this._delBtn = this._operateLayer.getChildByName("sc");

        this._numShowContain = new ccui.Layout();
        this._numBgArr = new Array(this._maxLen);
        this._numArr = new Array(this._maxLen);
        this._numBtnArr = new Array(10);
        var btn;
        for (var i = 0; i < 10; i++) {
            btn = this._operateLayer.getChildByName("btn" + i);
            this._numBtnArr[i] = btn;
        }
        for (var i = 0; i < this._maxLen; i++) {
            this._numArr[i] = "";
        }
    },
    initView: function () {
        this._node.addChild(this._numShowContain);

        var numShowChild;
        for (var i = 0; i < this._maxLen; i++) {
            this._numBgArr[i] = this.staticLayer.getChildByName("num" + i);
            if (this._isImgShow) {
                numShowChild = new cc.Sprite();
            } else {
                numShowChild = new ccui.Text();
            }
            this._numShowContain.addChild(numShowChild);
        }
    },
    initListen: function () {
        var len = this._numBtnArr.length;
        for (var i = 0; i < len; i++) {
            this._numBtnArr[i].addTouchEventListener(this.clickNumHandle, this);
        }
        this._resetBtn.addTouchEventListener(this.clickResetHandle, this);
        this._delBtn.addTouchEventListener(this.clickDelHandle, this);
    },
    initialize: function () {

    },
    clickNumHandle: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;

        var name = sender.getName();
        this.updateNext(name.substr(3, name.length - 1));
    },
    updateNext: function (num) {
        if (this._curFillIndex >= this._maxLen) return;

        if (this._curFillIndex < 0) {
            this._curFillIndex = 0;
        }

        this.updateNumChild(this._curFillIndex, num);

        this._curFillIndex++;

        if (this._curFillIndex >= this._maxLen) {
            if(this._fillFullCallback){
                this._fillFullCallback(this.getNumber());
            }else{
                cc.eventManager.dispatchCustomEvent(this._EVENT_FULL, {number: this.getNumber()});
            }
        }
    },
    clickResetHandle: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;

        this.resetNumber();
    },
    clickDelHandle: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;

        if (this._curFillIndex <= 0) return;

        this.updateNumChild(this._curFillIndex - 1, -1);

        this._curFillIndex--;
    },
    getNumber: function () {
        var str = "";
        for (var i = 0; i < this._maxLen; i++) {
            str += this._numArr[i];
        }
        if (str == "") return 0;
        // cc.log("str=="+str);
        var number = parseInt(str);
        // cc.log("number=="+number);

        if (number == 0) return 0;

        return number;
    },
    updateNumChild: function (index, num) {
        if (!this._numShowContain) return;
        var numShowChild = this._numShowContain.getChildren()[index];
        if (num < 0) {
            this._numArr[index] = "";
            if (this._isImgShow) {
                numShowChild.setTextureRect(cc.rect(0, 0, 0, 0));
            } else {
                numShowChild.setString("");
            }
        } else {
            this._numArr[index] = num;
            if (this._isImgShow) {
                numShowChild.setTexture(res["wzqNum" + num]);
            } else {
                numShowChild.setString(num.toString());
            }
        }

        numShowChild.setPosition(this._numBgArr[index].getPosition());
    },
    destroy:function () {
        this._node = null;
        this._resetBtn = null;
        this._delBtn = null;
        this._numArr = null;
        this._numBtnArr = null;
        this._numBgArr = null;
        this._numShowContain = null;
        this._operateLayer = null;
        this._fillFullCallback = null;
    }
});
gameclass.numSetSimpleCtr.prototype.resetNumber = function () {
    for (var i = 0; i < this._maxLen; i++) {
        this.updateNumChild(i, -1);
    }
    this._curFillIndex = 0;
};