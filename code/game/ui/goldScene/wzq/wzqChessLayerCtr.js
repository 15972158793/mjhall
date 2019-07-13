/**
 * 棋盘显示控制器
 * @type {Function}
 */
gameclass.wzqChessLayerCtr = cc.Class.extend({
    _layer:null,
    //棋子模型
    _styleImg:null,
    //横向间距
    _horDis:0,
    //纵向间距
    _verDis:0,
    //棋子列表
    _chessImgArr:null,
    //游戏视图
    _wzqMode:null,
    ctor:function (layer) {
        this._layer = layer;
        this.init();
        this.initView();
        this.initListen();
        this.initialize();
    },
    init: function () {
        this._styleImg = this._layer.getChildByName("chessStyle");
        var horImg = this._layer.getChildByName("horStand");
        var verImg = this._layer.getChildByName("verStand");
        this._horDis = horImg.getPositionX();
        this._verDis = verImg.getPositionY();

        this._chessImgArr = [];
    },
    initView: function () {
        this._layer.removeAllChildren();

        for(var i = 0;i<gameclass.wzqChessLayerCtr.HOR_ROAD_NUM;i++){
            this._chessImgArr[i] = new Array(gameclass.wzqChessLayerCtr.VER_ROAD_NUM);
            for(var j = 0;j<gameclass.wzqChessLayerCtr.VER_ROAD_NUM;j++){
                var chessNodeView = new gameclass.wzqNodeView([res.wzqChessArea, res.wzqChessBlack, res.wzqChessWhite]);
                chessNodeView.updateChessAnchor(this._styleImg.getAnchorPoint());
                chessNodeView._EVENT_PUSH_CHESS = gameclass.WZQ_PUSH_CHESS;
                chessNodeView._horIndex = i;
                chessNodeView._verIndex = j;
                this._layer.addChild(chessNodeView);
                this._chessImgArr[i][j] = chessNodeView;
                chessNodeView.setPosition(cc.p(i * this._horDis, j * this._verDis));
            }
        }
    },
    initListen: function () {
        cc.eventManager.addCustomListener(gameclass.WZQ_PUSH_CHESS, this.requestPushChess.bind(this));
    },
    initialize: function () {

    },
    requestPushChess:function (event) {
        if(!this._wzqMode)return;
        if(!this._wzqMode.gameInfo)return;
        if(!this._wzqMode.gameInfo.begin)return;

        var person;
        var len = this._wzqMode.roominfo.person.length;
        for(var i = 0;i<len;i++){
            person = this._wzqMode.roominfo.person[i];
            if(person.uid == this._wzqMode.game.modmgr.mod_login.logindata.uid && i == this._wzqMode.turnIndex){
                // cc.log("requestPushChess:" + event.getUserData().horIndex + "," + event.getUserData().verIndex);
                this._wzqMode.requestPushChess(event.getUserData().horIndex, event.getUserData().verIndex);
            }
        }
    },
    updateNode:function (horIndex, verIndex, status) {
        this._chessImgArr[horIndex][verIndex].setStatus(status);
    },
});
/**
 * 初始化棋盘
 * @param mod
 */
gameclass.wzqChessLayerCtr.prototype.initRoad = function(){
    for(var i = 0;i<gameclass.wzqChessLayerCtr.HOR_ROAD_NUM;i++){
        for(var j = 0;j<gameclass.wzqChessLayerCtr.VER_ROAD_NUM;j++){
            this.updateNode(i, j, gameclass.wzqNodeView.STATUS_0);
        }
    }
};
gameclass.wzqChessLayerCtr.prototype.setmod = function(mod){
    this._wzqMode = mod;
}
gameclass.wzqChessLayerCtr.prototype.destroy = function(){
    cc.eventManager.removeCustomListeners(gameclass.WZQ_PUSH_CHESS);
};
/**
 * 更新棋路
 * @param board
 */
gameclass.wzqChessLayerCtr.prototype.updateRoad = function (road) {
    this.updateNode(road.w, road.h, road.zi);
};
/**
 * 更新棋盘显示
 * @param board
 */
gameclass.wzqChessLayerCtr.prototype.updateRoads = function (board) {
    var len = board.length;
    for(var i = 0;i<len;i++){
        var subArr = board[i];
        var subLen = subArr.length;
        for(var j = 0;j<subLen;j++){
            if(this._chessImgArr[i][j]){
                this.updateNode(i, j, subArr[j]);
            }
        }
    }
};
//落子事件名
gameclass.WZQ_PUSH_CHESS = "gameclass.WZQ_PUSH_CHESS";
//横向路数
gameclass.wzqChessLayerCtr.HOR_ROAD_NUM = 15;
//纵向路数
gameclass.wzqChessLayerCtr.VER_ROAD_NUM = 15;
