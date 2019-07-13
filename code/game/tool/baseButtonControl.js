/**
 * 按钮控制器
 * @type {Function}
 */
gameclass.baseButtonControl = cc.Class.extend({
    _btnNode: null,
    _normalChildArr: null,
    _selectChildArr: null,
    _isSelect:false,
    /**
     * 构造函数
     * @param $btnNode 按钮node
     * @param $normalChildArr 按钮node中正常状态下待处理的孩子名列表
     * @param $selectChildArr 按钮node中按下状态下待处理的孩子名列表
     */
    ctor: function ($btnNode, $normalChildArr, $selectChildArr) {
        // this._super();

        this._btnNode = $btnNode;
        this._normalChildArr = $normalChildArr;
        this._selectChildArr = $selectChildArr;
        this._isSelect = false;
    },
    /**
     * 根据选中状态，处理所有孩子的显示状态
     * @param isSelect 是否选中
     */
    setSelect: function (isSelect) {
        this._isSelect = isSelect;
        var normalLen = this._normalChildArr.length;
        for(var i = 0;i<normalLen;i++){
            var child = this._btnNode.getChildByName(this._normalChildArr[i]);
            if(!child)continue;
            child.setVisible(!isSelect);
        }
        var selectLen = this._selectChildArr.length;
        for(var i = 0;i<selectLen;i++){
            var child = this._btnNode.getChildByName(this._selectChildArr[i]);
            if(!child)continue;
            child.setVisible(isSelect);
        }
    },
    destroy:function () {
        this._btnNode = null;
        this._normalChildArr = null;
        this._selectChildArr = null;
        this._isSelect = false;
    }
});