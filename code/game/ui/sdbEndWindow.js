/**
 * Created by Administrator on 2017/3/18.
 */

/**
 * Created by Administrator on 2017/3/17.
 */


/*
 *  十点半总结算cell 管理类
 * */
gameclass.sdbEndWindowCell = cc.Class.extend({
    node:null,
    index:null,
    head_Img:null,
    name_Text:null,
    id_Text:null,
    houseOwner_Img:null,
    bankerCount_Text:null,
    winCount_Text:null,
    kingCount_Text:null,
    fiveSmallCount_Text:null,
    tenHalfCount_Text:null,
    boomCount_Text:null,
    score_Text:null,
    winner_Img:null,

    ctor: function (node,index) {
        this.node = node;
        this.index= index;
        this.head_Img             = this.node.getChildByName('head_Img');
        this.name_Text            = this.node.getChildByName('name_Text');
        this.id_Text              = this.node.getChildByName('id_Text');
        this.houseOwner_Img       = this.node.getChildByName('houseOwner_Img');
        this.bankerCount_Text     = this.node.getChildByName('bankerCount_Text');
        this.winCount_Text        = this.node.getChildByName('winCount_Text');
        this.kingCount_Text       = this.node.getChildByName('kingCount_Text');
        this.fiveSmallCount_Text  = this.node.getChildByName('fiveSmallCount_Text');
        this.tenHalfCount_Text    = this.node.getChildByName('tenHalfCount_Text');
        this.boomCount_Text       = this.node.getChildByName('boomCount_Text');
        this.score_Text           = this.node.getChildByName('score_Text');
        this.winner_Img           = this.node.getChildByName('winner_Img');
        this.node.setVisible(false);
    },

    setBaseInfo:function(data){

        data = data || {};
        this.name_Text.setString(data.name || '');
        this.id_Text.setString("ID：" + data.id || '');
        this.bankerCount_Text.setString("坐庄次数：" + data.bankerCount || '0');
        this.winCount_Text.setString("胜利次数：" + data.winCount || '0');
        this.kingCount_Text.setString("天王次数：" + data.kingCount || '0');
        this.fiveSmallCount_Text.setString("五小次数：" + data.fiveSmallCount || '0');
        this.boomCount_Text.setString("爆牌次数：" + data.boomCount || '0');
        this.tenHalfCount_Text.setString("十点半：" + data.tenHalfCount || '0');

        this.houseOwner_Img.setVisible(data.houseOwner_Img);
        this.winner_Img.setVisible(data.winner_Img);


        var score =  parseInt(data.score)  || 0;
        /*if(score > 0){
         this.score_Text.setTextColor(cc.color(255,0,0));
         }*/
        this.score_Text.setString(score);
        gameclass.mod_base.showtximg(this.head_Img, data.head, 0, 0,"im_headbg2");
        // this.houseOwner_Img.setVisible( data.houseOwner || false );
    },

});

/*
 * 十点半总结算面板
 * */
gameclass.sdbEndWindow = gameclass.baseui.extend({
    parentUI:null,
    cells:null,
    roomid_Text:null,
    round_Text:null,
    ctor: function () {

        this._super();
        this.cells = [];
    },
    show:function(){
        var _this = this;
        this.node = this.game.uimgr.createnode(res.sdbEndWindow,true);
        this.node.setPosition((cc.winSize.width - this.node.getContentSize().width)/2,0);
        this.addChild(this.node);
        this.roomid_Text =  ccui.helper.seekWidgetByName(this.node, "roomid");
        this.round_Text = ccui.helper.seekWidgetByName(this.node, "round");

        var titiletime =  ccui.helper.seekWidgetByName(this.node, "curtime");
        var reftime = function () {
            var myDate = new Date();
            var str = myDate.Format("MM-dd hh:mm");
            titiletime.setString(str);
        };
        reftime();
        for (var i = 0;i < 5; i++){
            this.cells[i] = new gameclass.sdbEndWindowCell( ccui.helper.seekWidgetByName(this.node, "outCell_" + i),i,this.node);
        }
        gameclass.createbtnpress(this.node, "quit_Btn", function () {
            _this.game.uimgr.closeui("gameclass.sdbEndWindow");
            _this.game.uimgr.closeui("gameclass.sdbtable");
            _this.game.uimgr.showui("gameclass.hallui");
        });
        gameclass.createbtnpress(this.node, "share_Btn", function () {
            gameclass.mod_platform.savescreen(function(url){
                if(window.wx)
                {
                    //alert(url);
                    url = JSON.parse(url);

                    if(url.error == 0){
                        _this.share(url.url);
                        _this.chulitu.setString("处理完成");
                    }

                    _this.shareing = false;
                    //_this.sharelayer.setVisible(true);
                }
            },function(){
                if(window.wx) {
                    _this.sharelayer.setVisible(true);
                }
            });

            if(window.wx)
            {
                _this.chulitu.setString("图片正在处理中");
                //_this.sharelayer.setVisible(true);
                _this.shareing = true;
            }
        });

    },

    share : function(url){
        gameclass.mod_platform.wxsharelink("结算","战绩",url);
    },


    setParentUI:function(cl){
        this.parentUI = cl;
        return this;
    },


    setInfo:function(sdbmod){
        var _this = this;

        this.roomid_Text.setString("十点半房间号：" + sdbmod.roominfo.roomid);
        this.round_Text.setString("局数:" + sdbmod.roominfo.step + "/" +sdbmod.roominfo.maxStep);
        var arr=[];
        cc.each(sdbmod.endinfo,function(o,i){
            arr.push({index:i,score:o.score});
        });
        arr=arr.sort(function(a,b){
            return b.score - a.score;
        });

        var winer = [];
        winer.push(arr[0].index);
        for(var i = 1 ; i<arr.length ; i++){

            if(arr[0].score == arr[i].score && arr[i].score > 0){
                winer.push(arr[i].index);
            }
        }


        cc.each(sdbmod.endinfo,function(o,i){

            if(o){
                _this.cells[i].setBaseInfo({
                    name           : o.name,
                    head           : o.head,
                    id             : o.uid,
                    score          : o.score,
                    bankerCount    : o.deal,
                    winCount       : o.win,
                    kingCount      : o.tw,
                    fiveSmallCount : o.wx,
                    boomCount      : o.lose,
                    houseOwner_Img : i == 0 ? true:false,
                    winner_Img     : (winer.indexOf(i)>-1 && arr[i].score > 0) ? true:false,
                    tenHalfCount   : o.sdb

                });
                _this.cells[i].node.setVisible(true);
            }
        });
    },


    /* setmod: function (_mod) {
     this.mod_sdb = _mod;
     this.mod_sdb.bindUI(this);
     },*/


});
