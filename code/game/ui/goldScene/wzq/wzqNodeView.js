gameclass.wzqNodeView = cc.Sprite.extend({
    _imgUrlArr:[],
    _img:null,
    _chessImg:null,
    _horIndex:-1,
    _verIndex:-1,
    _status:-1,
    //棋子图片
    //落子事件名
    _EVENT_PUSH_CHESS:"EVENT_PUSH_CHESS",
    ctor: function (imgUrlArr) {
        this._super();
        this._imgUrlArr = imgUrlArr;
        this.init();
        this.initView();
        this.initListen();
        this.initialize();
    },
    init: function () {
        this._img = new ccui.ImageView(res.wzqChessArea);
        this._chessImg = new cc.Sprite();
    },
    initView: function () {
        this.addChild(this._img);
        this.addChild(this._chessImg);
    },
    initListen: function () {
        this._img.addTouchEventListener(this.nodeClickHandle, this);
    },
    initialize: function () {
        this._img.setTouchEnabled(true);
        this.setStatus(gameclass.wzqNodeView.STATUS_0);
    },
    nodeClickHandle:function (sender, type) {
        if(type != ccui.Widget.TOUCH_ENDED)return;
        // cc.log("nodeClickHandle:" + this._horIndex + "," + this._verIndex);
        if(this._horIndex < 0)return;
        if(this._verIndex < 0)return;
        if(this._status != gameclass.wzqNodeView.STATUS_0)return;

        // cc.log("nodeClickHandle:" + this._horIndex + "," + this._verIndex);
        cc.eventManager.dispatchCustomEvent(this._EVENT_PUSH_CHESS, {horIndex:this._horIndex, verIndex:this._verIndex});
    },
    drawUpdate:function () {
        var imgUrl = this._imgUrlArr[this._status];
        if(!imgUrl)return;

        this._chessImg.setTexture(imgUrl);
    },
});
/**
 * 更新棋子锚点
 * @param status
 */
gameclass.wzqNodeView.prototype.updateChessAnchor = function (p) {
    this._chessImg.setAnchorPoint(p);
}
/**
 * 设置棋子状态
 */
gameclass.wzqNodeView.prototype.setStatus = function (status) {
    // cc.log("setStatus:" + status);

    this._status = status;
    if(this._status == gameclass.wzqNodeView.STATUS_0){
        this._img.setTouchEnabled(true);
    }else{
        this._img.setTouchEnabled(false);
    }

    this.drawUpdate();
};
//状态-无子
gameclass.wzqNodeView.STATUS_0 = 0;
//状态-黑子
gameclass.wzqNodeView.STATUS_1 = 1;
//状态-白子
gameclass.wzqNodeView.STATUS_2 = 2;