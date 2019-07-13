/**
 * 五子棋用户头像控制
 * @type {Function}
 */
gameclass.wzqUserHeadCtr = cc.Class.extend({
    _headNode:null,
    _index:0,
    _nameTxt:null,
    _idTxt:null,
    _scoreTxt:null,
    _headImg:null,
    _chessImg:null,
    //是否先手
    _isFirstHand:false,
    //是否轮到自己
    _isTurn:false,
    //闪烁动画
    _blinkAction:null,
    ctor:function (headNode, index) {
        this._headNode = headNode;
        this._index = index;
        this.init();
        this.initView();
        this.initListen();
        this.initialize();
    },
    init: function () {
        var dynamicLayer = this._headNode.getChildByName('dynamicLayer');
        this._nameTxt = dynamicLayer.getChildByName('nameTxt');
        this._idTxt = dynamicLayer.getChildByName('idTxt');
        this._scoreTxt = dynamicLayer.getChildByName('scoreTxt');
        this._headImg =  dynamicLayer.getChildByName('headImg');
        this._blinkAction = cc.repeatForever(cc.sequence(cc.fadeTo(0.5, 0), cc.fadeTo(0.5, 255)));

        this._chessImg =  dynamicLayer.getChildByName('chessImg');
    },
    initView: function () {
        var a = cc.MenuItemSprite();
    },
    initListen: function () {

    },
    initialize: function () {

    },
});
gameclass.wzqUserHeadCtr.prototype.setVisible = function (isVisible) {
    this._headNode.setVisible(isVisible);
};
gameclass.wzqUserHeadCtr.prototype.setPosition = function (p) {
    this._headNode.setPosition(p);
};
gameclass.wzqUserHeadCtr.prototype.getPosition = function () {
    return this._headNode.getPosition();
};
gameclass.wzqUserHeadCtr.prototype.getChatPos = function () {
    return this._headImg.getPosition();
};
gameclass.wzqUserHeadCtr.prototype.getGoldPos = function (isVisible) {
    var p = new cc.p(0, 0);
    p.x = this._headNode.getPositionX() + this._scoreTxt.getPositionX() + this._scoreTxt.getContentSize().width;
    p.y = this._headNode.getPositionY() + this._scoreTxt.getPositionY();
    return p;
};
/**
 * 根据房间数据，更新用户显示
 * @param person
 */
gameclass.wzqUserHeadCtr.prototype.setRoomUserInfo = function (person) {
    if(person){
        this.setVisible(true);
        this._idTxt.setString(person.uid || '0');
        this._nameTxt.setString(person.name || staticString.offLine);
        this._scoreTxt.setString(person.param.toString());
        gameclass.mod_base.showtximg(this._headImg , person.imgurl || '', 0, 0 , "im_headbg5", !person.line );
    }else{
        this.setVisible(false);
    }
};
/**
 * 根据游戏数据，更新用户显示
 * @param person
 */
gameclass.wzqUserHeadCtr.prototype.setGameUserInfo = function (gameInfo) {
    this._idTxt.setString(gameInfo.uid || '0');
    this._scoreTxt.setString(gameInfo.total || this._scoreTxt.getString());
    this.setFirstHandle(gameInfo.black);
};
/**
 * 设置是否先手
 * @param isFirstHand
 */
gameclass.wzqUserHeadCtr.prototype.setFirstHandle = function (isFirstHand) {
    // cc.log("setFirstHand::::::::::::::::" + isFirstHand);
    this._isFirstHand = isFirstHand;

    if(this._isFirstHand){
        this._chessImg.setTexture(res.wzqChessBlack);
    }else{
        this._chessImg.setTexture(res.wzqChessWhite);
    }
};
gameclass.wzqUserHeadCtr.prototype.setTurn = function (isTurn) {
    // cc.log("setTurn:::::::"+isTurn);

    this._isTurn = isTurn;
    if(isTurn){
        this._chessImg.runAction(this._blinkAction);
    }else{
        this._chessImg.stopAllActions();
        this._chessImg.runAction(cc.fadeTo(0, 255));
    }
};
