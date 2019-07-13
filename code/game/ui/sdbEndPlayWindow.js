/**
 * Created by Administrator on 2017/3/17.
 */


/*
*  十点半单局结算cell 管理类
* */
gameclass.sdbEndPlayWindowCell = cc.Class.extend({
    node:null,
    index:null,
    head_Img:null,
    name_Text:null,
    id_Text:null,
    cards_Type_Img:null,
    banker_Img:null,
    score_Text:null,
    cards_Layout:null,
    roomid_text:null,
    step_text:null,
    time_text:null,
    ctor: function (node,index) {
        this.node = node;
        this.index= index;
        this.head_Img        = this.node.getChildByName('head_Img');
        this.name_Text       = this.node.getChildByName('name_Text');
        this.id_Text         = this.node.getChildByName('id_Text');
        this.cards_Type_Img  = ccui.helper.seekWidgetByName(this.node,"cards_Type_Img");
        this.banker_Img      = this.node.getChildByName('banker_Img');
        this.score_Text      = this.node.getChildByName('score_Text');
        this.cards_Layout    = this.node.getChildByName('cards_Layout');
        this.node.setVisible(false);
    },

    setBaseInfo:function(data){
        data = data || {};
        this.name_Text.setString(data.name || '');
        this.id_Text.setString("ID：" + data.id || '');
        var score =  parseInt(data.score)  || 0;

        /*if(score < 0){
            //this.score_Text.setTextColor(cc.color(255,0,0));
        }else{
            score = '+' + score;
        }*/
        this.score_Text.setString(score);
        this.sendCards(data.cards);
        this.banker_Img.setVisible( data.banker || false );
        var card_Type = this.bombComputer(data.cards);
        gameclass.mod_base.showtximg(this.head_Img, data.head, 0, 0,"im_headbg2");

        switch (card_Type){
            case 0 :
                this.cards_Type_Img.setTexture(res.sdbBoom);
                break;
            case 1 :
                this.cards_Type_Img.setTexture(res.sdbTall);
                break;
            case 2 :
                this.cards_Type_Img.setTexture(res.sdbSdb);
                break;
            case 3 :
                this.cards_Type_Img.setTexture(res.sdbfiveSmall);
                break;
            case 4 :
                this.cards_Type_Img.setTexture(res.sdbhwx);
                break;
            case 5 :
                this.cards_Type_Img.setTexture(res.sdbKing);
                break;
        }
    },
bombComputer : function(cards){

    var point = 0;
    for( var i =0 ;i<  cards.length ; i++){
        var temp =  parseInt( cards[i] / 10);
        temp = temp > 10 ? 0.5 : temp;
        point +=temp;
    }
    var type = 0;  // 0 :爆牌  1：高牌   2：十点半  3: 五小  4：花五小  5：天王
    if( point >= 11 ){
        type = 0;;
    }else if(point <= 10 && cards.length < 5){
        type = 1;
    }else if(point > 10  &&  cards.length < 5){
        type = 2;
    }else if(point >= 3  && point <= 10 &&  cards.length == 5){
        type = 3;
    }else if(point < 3 && cards.length == 5 ){
        type = 4;
    }else if(point > 10 && cards.length == 5 ){
        type = 5;
    }
    return type;
},

    /*
     * 循环发牌
     * */
    sendCards: function(cards) {
        var widthNum=null;
        if(cards.length%2==1){
            for (var i = 0; i < cards.length; i++) {
                var midNum=(cards.length+1)/2;
                var sp = this.createCard(cards[i]);
                sp.setScale(0.5);
                sp.setPositionX(30 * (i-midNum)+this.cards_Layout.width/2);
                this.cards_Layout.addChild(sp);
            }
        }else if(cards.length%2==0){
            for (var i = 0; i < cards.length; i++) {
                var midNum=(cards.length-1)/2;
                var sp = this.createCard(cards[i]);
                sp.setScale(0.5);
                sp.setPositionX(30 * (i-midNum)+this.cards_Layout.width/2);
                this.cards_Layout.addChild(sp);
            }
        }

    },
    /*
     * 创建牌
     * */
    createCard : function(card) {
        var abcd = ["a","d","b","c"];
        var point = Math.floor(card/10);
        var type = card%10;
        var spr = cc.Sprite.create();
        if (card <= 0){
            spr.setTexture(res.pokerBei);
        }else{
            spr.initWithSpriteFrameName("card_" + point +  abcd[type - 1]+ ".png");
        }
        spr.setAnchorPoint(cc.p(0 , 0));
        spr.setPositionY(20);
        return spr;
    },

});

/*
* 十点半单局结算面板
* */
gameclass.sdbEndPlayWindow = gameclass.baseui.extend({
    parentUI:null,
    cells:null,
    roomId_text:null,
    juNum_text:null,
    ctor: function () {

        this._super();
        this.cells = [];
    },
    show:function(){
        var _this = this;
        this.node = this.game.uimgr.createnode(res.sdbEndPlayWindow,true);

        this.roomId_text =  ccui.helper.seekWidgetByName(this.node, "roomId");
        this.juNum_text = ccui.helper.seekWidgetByName(this.node, "juNum");


        var titiletime = ccui.helper.seekWidgetByName(this.node, "time");
        var reftime = function () {
            var myDate = new Date();
            var str = myDate.Format("yyyy-MM-dd hh:mm");
            titiletime.setString(str);
        };
        reftime();


        this.node.setPosition((cc.winSize.width - this.node.getContentSize().width)/2,0);
        this.addChild(this.node);
        for (var i = 0;i < 5; i++){
            this.cells[i] = new gameclass.sdbEndPlayWindowCell( ccui.helper.seekWidgetByName(this.node, "cell_" + i),i,this.node);
        }
        gameclass.createbtnpress(this.node, "next_Btn", function () {
            _this.parentUI.gameNext();
        });
        gameclass.createbtnpress(this.node, "share_Btn", function () {

        });

    },
    setParentUI:function(cl){
        this.parentUI = cl;
        return this;
    },
    setInfo:function(info,roominfo){
        var _this = this;

        this.roomId_text.setString("房间号：" + roominfo.roomid);
        this.juNum_text.setString("局数:" + roominfo.step + "/" +roominfo.maxStep);
        cc.each(info,function(o,i){
            if(o){

                _this.cells[i].setBaseInfo({
                    name   : o.name,
                    id     : o.uid,
                    score  : o.score,
                    cards  : o.card,
                    head   : o.head,
                    banker : o.dealer
                });
                _this.cells[i].node.setVisible(true);
            }
        });
    }


  /* setmod: function (_mod) {
        this.mod_sdb = _mod;
        this.mod_sdb.bindUI(this);
     },*/


});