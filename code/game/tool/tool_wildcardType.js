var gameclass = gameclass || {};

gameclass.tool_wildcardType = gameclass.tool_cardType.extend({
    razznum:0,
    razz:0,
    currazz:[],
    ctor:function () {

    },
    build:function (cards) {

        var ar =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for(var x=0; x<cards.length;x++){
            var index = cards[x];
            if(index == 100){
                index = 13;
            }else if(index == 200){
                index = 14;
            }else {
                index -= 3;
            }

            ar[ index ]++;
        }
        return ar;
    },
    checkW:function(cardsArr,wildCard){
        //cc.log("出牌检测"+cardsArr);

        if(cardsArr.length < 1){
            return 0;
        }
        if(wildCard == 100 || wildCard == 200){
            return 0;
        }
        if(wildCard == 1 ){
            wildCard = 14;
        }
        if(wildCard == 2 ){
            wildCard = 15;
        }
        wildCard -= 3;
        if(wildCard < 0 || wildCard > 12){
            return 0;
        }
        var cards = this.build(cardsArr);

        var funcs = [
            this.isDanZhangW.bind(this),
            this.isDuiZiW.bind(this),
            this.isSanZhangW.bind(this),
            this.isZhaDanW.bind(this),
            this.isSanDaiYiW.bind(this),
            this.isSanDaiErW.bind(this),
            this.isLianDuiW.bind(this),
            this.isShunZiW.bind(this),
            this.isSiDaiErDanW.bind(this),
            this.isSiDaiErDuiW.bind(this),
            this.isFeiJiW.bind(this),
            this.isDanFeiW.bind(this),
            this.isShuangFeiW.bind(this),
            this.isHuoJianW.bind(this)
        ];
        var resArr = [];
        var res = 0;
        for(var i=0;i< funcs.length ; i++) {
            if(funcs[i]){
                res =  funcs[i](cards,cardsArr.length,wildCard);
                if(res){
                    resArr.push(res);
                }
            }
        }
        res = resArr.length > 0?resArr:0;
        /*cc.log("返回出牌类型");
          cc.log(res);*/
        return res;
    },

    transformToCardArr:function(res){
        //cc.log(res);
        var abscards = [];
        switch(res.type){
            case this.CARDTYPE.danzhang:
                for(var i = res.value;i <= res.value;i++){
                        abscards.push(i);
                }
                break;
            case this.CARDTYPE.duizi:
                for(var i = res.value;i <= res.value;i++){
                    for(var j =0;j<2;j++){
                        abscards.push(i);
                    }
                }
                break;
            case this.CARDTYPE.sanzhang:
                for(var i = res.value;i <= res.value;i++){
                    for(var j =0;j<3;j++){
                        abscards.push(i);
                    }
                }
                break;
            case this.CARDTYPE.zhadan:
                for(var i = res.value;i <= res.value;i++){
                    for(var j =0;j<4;j++){
                        abscards.push(i);
                    }
                }
                break;
            case this.CARDTYPE.sandaiyi:
                for(var i = res.value;i <= res.value;i++){
                    for(var j =0;j<3;j++){
                        abscards.push(i);
                        if(j == 2){
                            abscards.push(res.d1);
                        }
                    }
                }
                break;
            case this.CARDTYPE.sandaier:
                for(var i = res.value;i <= res.value;i++){
                    for(var j =0;j<3;j++){
                        abscards.push(i);
                        if(j == 2){
                            abscards.push(res.d1);
                            abscards.push(res.d1);
                        }
                    }
                }
                break;
            case this.CARDTYPE.liandui:
                for(var i = res.value.min;i <= res.value.max;i++){
                    for(var j =0;j<2;j++){
                        abscards.push(i);
                    }
                }
                break;
            case this.CARDTYPE.shunzi:
                for(var i = res.value.min;i <= res.value.max;i++){
                        abscards.push(i);
                }
                break;
            case this.CARDTYPE.sidaierdan:
                for(var i = res.value;i <= res.value;i++){
                    for(var j =0;j<4;j++){
                        abscards.push(i);
                        if(j == 3){
                            abscards.push(res.d1);
                            abscards.push(res.d2);
                        }
                    }

                }
                break;
            case this.CARDTYPE.sidaierdui:
                for(var i = res.value;i <= res.value;i++){
                    for(var j =0;j<4;j++){
                        abscards.push(i);
                        if(j == 3) {
                            abscards.push(res.d1);
                            abscards.push(res.d1);
                            abscards.push(res.d2);
                            abscards.push(res.d2);
                        }
                    }

                }
                break;
            case this.CARDTYPE.feiji:
                for(var i = res.value.min;i <= res.value.max;i++){
                    for(var j =0;j<3;j++){
                        abscards.push(i);
                    }
                }
                break;
            case this.CARDTYPE.danfei:
                for(var i = res.value.min;i <= res.value.max;i++){
                    for(var j =0;j<3;j++){
                        abscards.push(i);
                    }
                }
                for(var i = 0;i < res.d1.length;i++){
                        abscards.push(res.d1[i]);
                }
                break;
            case this.CARDTYPE.shuangfei:
                for(var i = res.value.min;i <= res.value.max;i++){
                    for(var j =0;j<3;j++){
                        abscards.push(i);
                    }
                }

                for(var i = 0;i < res.d2.length;i++){
                    for(var j = 0;j<2;j++){
                        abscards.push(res.d2[i]);
                    }
                }
                break;
            case this.CARDTYPE.huojian:
                abscards.push(1000);
                abscards.push(2000);
                break;
            default:
                break;
        }
        return abscards;
    },

    //------------压牌检测
    compareW:function(pressCards,befCards,wildCard,pressHasWild,befHasWild){
        cc.log("pressCards="+pressCards+"\nbefCards="+befCards+"\nwildCard="+wildCard+"\npressHasWild="+pressHasWild+"\nbefHasWild="+befHasWild);

        var befCards = this.check(befCards);//拿到上家的觉得牌型
        cc.log("---------------上家出的牌------------111");
        cc.log(befCards);
        if(befCards == 0){
            return 0;
        }

        var pressCards = this.checkW(pressCards,wildCard);
        cc.log("---------------压牌-----------------111");
        cc.log(pressCards);
        if(pressCards == 0){
            return 0;
        }

        var res = [];
        for (var i = 0; i < pressCards.length; i++) {
            for (var j = 0; j < pressCards[i].length; j++) {
                if (this.compareSize(pressCards[i][j], befCards, pressHasWild, befHasWild)) {
                    res.push(pressCards[i][j]);
                }
            }

        }

        var absRes = [];
        var arr = [];
        for(var i = 0;i<res.length;i++){
            var ff = false;
            for (var j = 0; j<arr.length; j++) {
                if (arr[j] == res[i].type) {
                    ff = true;
                    break;
                }
            }
            if (!ff) arr.push(res[i].type);
        }

        for(var j = 0; j<arr.length; j++){
            var ff = false;
            var xxx = [];
            for (var i = 0;i<res.length;i++) {
                if(arr[j] == res[i].type) {
                    xxx.push(res[i]);
                }
            }
            absRes.push(xxx);
        }
        cc.log(absRes);
        //cc.log(res);
        if(absRes.length > 0){
            return absRes;
        }
        return 0;
    },
    compareSize:function(res1,res2,_pressHasWild,_befHasWild){
        cc.log(res1,res2,_pressHasWild,_befHasWild);
        if(res1.type == this.CARDTYPE.huojian){
            return true;
        }
        if(res1.type == this.CARDTYPE.zhadan){
            if(res2.type != this.CARDTYPE.zhadan && res2.type != this.CARDTYPE.huojian ){
                return true;
            }else if(res2.type == this.CARDTYPE.zhadan){
                if(_pressHasWild == _befHasWild){//两个炸弹都是硬炸
                    return res1.value > res2.value;
                }else {
                    return !_pressHasWild;
                }
                //return _pressHasWild == _befHasWild?res1.value > res2.value:_befHasWild;
            }
        }
        if(res1.type != res2.type ){
            return false;
        }
        switch (res1.type){
            case this.CARDTYPE.danzhang:
            case this.CARDTYPE.duizi:
            case this.CARDTYPE.sanzhang:
            //case this.CARDTYPE.zhadan:
            case this.CARDTYPE.sandaiyi:
            case this.CARDTYPE.sandaier:
                if(res1.value > res2.value){
                    return true;
                }
                break;
            case this.CARDTYPE.liandui:
                if(res1.value.min > res2.value.min){
                    return true;
                }
                break;
            case this.CARDTYPE.shunzi:
                if( res1.value.count != res2.value.count)
                    return false;
                if(res1.value.min > res2.value.min){
                    return true;
                }
                break;
            case this.CARDTYPE.sidaierdan:
            case this.CARDTYPE.sidaierdui:
                if(res1.value > res2.value){
                    return true;
                }
                break;
            case this.CARDTYPE.feiji:
            case this.CARDTYPE.danfei:
            case this.CARDTYPE.shuangfei:
                if(res1.value.min > res2.value.min){
                    return true;
                }
                //return res1.value.min > res2.value.min? 1:-1;
                break;
            default:
                break;
        }
        return false;
    },

    //癞子玩法 匹配牌
    /**
     * 判断单牌
     */
    isDanZhangW:function (cards , size ) {
        if (size != 1) {
            return 0;
        }
        var arr = [];
        var res = this.isDanZhang(cards , size );

        if(res){
            arr.push(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },
    /**
     * 判断对子
     **/
    isDuiZiW:function (cards , size , wildCard) {
        if(size != 2){
            return 0;
        }
        if(cards[13] > 0 || cards[14] > 0){
            return 0;
        }
        var arr = [];
        var res = this.isDuiZi(cards , size );
        if(res){
            arr.push(res) ;
        }
        res = this.matchCard(cards,size,wildCard,this.isDuiZiW.bind(this) , this.isDuiZi.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;

    },
    /**
     * 判断是否三张
     **/
    isSanZhangW:function (cards , size,wildCard) {
        if(size != 3){
            return 0;
        }
        var arr = [];
        var res = this.isSanZhang(cards , size );
        if(res){
            arr.push(res) ;
        }

        /*var cpCards = cards.slice(0 , cards.length);
        if(cpCards[wildCard]){
            cpCards[wildCard]--;
            cc.log("cpCards[wildCard]"+cpCards[wildCard]+",wildCard="+wildCard);
            for (var j = 0; j < cpCards.length; j++) {
                if(j==wildCard){continue;}
                cc.log("j="+j);
                var tmpCards = cpCards.slice(0, cpCards.length);
                cc.log("cpCards="+cpCards);
                tmpCards[j]++;
                cc.log("tmpCards="+tmpCards);
                if(cpCards[wildCard] > 0){
                    cc.log("qqqq111");
                    res = this.isSanZhangW(tmpCards , size , wildCard);
                    cc.log("qqqq222");
                }else {
                    cc.log("qqqq333");
                    res = this.isSanZhang(tmpCards , size);
                    cc.log("qqqq444");
                }
                cc.log("qqqq555");
                if(res){return res;}
            }
        }*/
        res = this.matchCard(cards,size,wildCard,this.isSanZhangW.bind(this) , this.isSanZhang.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },

    /**
     * 判断炸弹
     **/
    isZhaDanW:function (cards,size,wildCard) {
        if(size != 4){
            return 0;
        }
        var arr = [];
        var res = this.isZhaDan(cards , size );
        if(res){
            arr.push(res) ;
            cc.log(arr);
        }
        res = this.matchCard(cards,size,wildCard,this.isZhaDanW.bind(this) , this.isZhaDan.bind(this));
        if(res){
            arr = arr.concat(res) ;
            cc.log(arr);
        }
        return arr.length > 0 ? arr : 0;
    },
    /**
     * 判断三带1
     **/
    isSanDaiYiW:function (cards , size,wildCard) {
        if(size != 4){
            return 0;
        }

        var arr = [];
        var res = this.isSanDaiYi(cards,size);
        if(res){
            arr.push(res) ;
        }
        res = this.matchCard(cards,size,wildCard,this.isSanDaiYiW.bind(this) , this.isSanDaiYi.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },
    /**
     * 判断三带2
     **/
    isSanDaiErW:function (cards , size , wildCard) {
        cc.log("isSanDaiErW");
        if(size != 5){
            return 0;
        }
        var arr = [];
        var res = this.isSanDaiEr(cards,size);
        if(res){
            arr.push(res) ;
        }
        res = this.matchCard(cards,size,wildCard, this.isSanDaiErW.bind(this) , this.isSanDaiEr.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },

    /*递归匹配牌型*/
    matchCard:function(cards,size,wildCard,func,func2){

        var res = 0;
        var resultArr = [];
        var cpCards = cards.slice(0 , cards.length);
        if(cpCards[wildCard]){
            cpCards[wildCard]--;
            for (var i = cpCards.length-3; i >= 0; i--) {
                if(i==wildCard){continue;}
                var tmpCards = cpCards.slice(0, cpCards.length);
                tmpCards[i]++;
                if(cpCards[wildCard] > 0){
                    res = func(tmpCards, size ,wildCard);
                }else {
                    res = func2(tmpCards, size );
                }
                if(res){
                    if( cc.isArray(res) ){

                        resultArr = resultArr.concat(res);
                    }else {
                        resultArr.push(res);
                    }
                }
            }
            return resultArr.length>0?resultArr:0;
        }

    },

    /**
     * 判断连队
     **/
    isLianDuiW:function (cards , size ,wildCard) {
        if(size < 5){
            return 0;
        }
        var arr = [];
        var res = this.isLianDui(cards,size);
        if(res){
            arr.push(res);
        }
        res = this.matchCard(cards,size,wildCard, this.isLianDuiW.bind(this) , this.isLianDui.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },
    /**
     * 判断顺子
     **/
    isShunZiW:function (cards , size,wildCard) {
        if(size < 5){
            return 0;
        }
        var arr = [];
        var res = this.isShunZi(cards,size);
        if(res){
            arr.push(res);
        }
        res = this.matchCard(cards,size,wildCard, this.isShunZiW.bind(this) , this.isShunZi.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },
    /*
     * 判断四带二单
     * */
    isSiDaiErDanW:function(cards , size ,wildCard){
        if(size != 6){
            return 0;
        }
        var arr = [];
        var res = this.isSiDaiErDan(cards,size);
        if(res){
            arr.push(res);
        }
        res = this.matchCard(cards,size,wildCard, this.isSiDaiErDanW.bind(this) , this.isSiDaiErDan.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },
    /*
     * 判断四带二对
     * */
    isSiDaiErDuiW:function(cards , size,wildCard){
        if(size != 8){
            return 0;
        }
        var arr = [];
        var res = this.isSiDaiErDui(cards,size);
        if(res){
            arr.push(res) ;
        }
        res = this.matchCard(cards,size,wildCard, this.isSiDaiErDuiW.bind(this) , this.isSiDaiErDui.bind(this));
        if(res){
            arr = arr.concat(res) ;

        }
        return arr.length > 0 ? arr : 0;
    },
    /**
     * 判断飞机
     **/
    isFeiJiW:function (cards , size, wildCard) {
        if(size < 6 || size > 18){
            return 0;
        }
        var arr = [];
        var res = this.isFeiJi(cards,size);
        if(res){
            arr.push(res) ;
        }
        res = this.matchCard(cards,size,wildCard, this.isFeiJiW.bind(this) , this.isFeiJi.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },
    /**
     * 判断飞机带单...
     **/
    isDanFeiW:function (cards , size, wildCard) {
        if(size < 8 ){
            return 0;
        }
        var arr = [];
        var res = this.isDanFei(cards,size);
        if(res){
            arr.push(res) ;
        }
        res = this.matchCard(cards,size,wildCard, this.isDanFeiW.bind(this) , this.isDanFei.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },
    /**
     * 判断飞机带对...
     **/
    isShuangFeiW:function (cards , size ,wildCard) {
        if(size < 10 ){
            return 0;
        }
        var arr = [];
        var res = this.isShuangFei(cards,size);
        if(res){
            arr.push(res) ;
        }
        res = this.matchCard(cards,size,wildCard, this.isShuangFeiW.bind(this) , this.isShuangFei.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;

    },

    /**
     * 判断火箭
     **/
    isHuoJianW:function (cards , size) {
        if(size != 2){
            return 0;
        }
        var arr = [];
        var res = {};
        if(cards[cards.length - 1] == 1 && cards[cards.length - 2] == 1){
            res = {type:this.CARDTYPE.huojian};
            arr.push(res);
        }
        return arr.length > 0 ? arr : 0;
    },
    getCardTypeString:function(cardtype){
        var str = "";
        switch (cardtype){
            case this.CARDTYPE.danzhang:
                str = "单张";
                break;
            case this.CARDTYPE.duizi:
                str = "对子";
                break;
            case this.CARDTYPE.sanzhang:
                str = "三张";
                break;
            case this.CARDTYPE.zhadan:
                str = "炸弹";
                break;
            case this.CARDTYPE.sandaiyi:
            case this.CARDTYPE.sandaier:
                str = "三带一";
                break;
            case this.CARDTYPE.liandui:
                str = "连对";
                break;
            case this.CARDTYPE.shunzi:
                str = "顺子";
                break;
            case this.CARDTYPE.sidaierdan:
            case this.CARDTYPE.sidaierdui:
                str = "四带二";
                break;
            case this.CARDTYPE.feiji:
            case this.CARDTYPE.danfei:
            case this.CARDTYPE.shuangfei:
                str = "飞机";
                break;
            case this.CARDTYPE.huojian:
                break;
        }
        return str;
    },

    //! 得到一张牌
    getOneCard:function(oneCard, twoCard, threeCard, fourCard, card, num, sun) {
        if(num == null || num <= 0) {
            num = 1;
        }
        if(sun == null) {
            sun = false;
        }
        var outCards = [];

        for(var i = 0; i < oneCard.length; i++) {
            if(this.getRazzCard(oneCard[i], num == 1 ? 1 : 0) > card) {
                outCards[outCards.length] = oneCard[i];
                if(outCards.length >= num && !sun) {
                    return outCards;
                }
            }
        }

        for(var i = 0; i < twoCard.length; i++) {
            if(this.getRazzCard(twoCard[i], num == 1 ? 2 : 0) > card) {
                outCards[outCards.length] = twoCard[i];
                if(outCards.length >= num && !sun) {
                    return outCards;
                }
            }
        }

        for(var i = 0; i < threeCard.length; i++) {
            if(this.getRazzCard(threeCard[i], num == 1 ? 3 : 0) > card) {
                outCards[outCards.length] = threeCard[i];
                if(outCards.length >= num && !sun) {
                    return outCards;
                }
            }
        }

        if(sun) { //! 顺子拆炸弹
            for(var i = 0; i < fourCard.length; i++) {
                if(fourCard[i] > card) {
                    outCards[outCards.length] = fourCard[i];
                }
            }
        }

        if(sun && outCards.length >= num) {
            outCards.sort(function(a, b){
                return a - b});
            var index = -1;
            var find = true;
            for(var i = 0; i < outCards.length; i++) {
                find = true;
                for(var j = 1; j < num; j++) {
                    if(i + j >= outCards.length) {
                        find = false;
                        break;
                    }
                    if(outCards[i + j] - outCards[i + j - 1] != 1) {
                        find = false;
                        break;
                    }
                }
                if(find) {
                    index = i;
                    break;
                }
            }
            if(index == -1) {
                return null
            }
            var lastCards = [];
            for(var i = index; i < num + index; i++) {
                lastCards[i - index] = outCards[i];
            }
            return lastCards;
        }

        return null;
    },

    //! 得到两张牌
    getTwoCard:function(oneCard, twoCard, threeCard, fourCard, card, num, sun) {
        if(num == null || num <= 0) {
            num = 1;
        }
        if(sun == null) {
            sun = false;
        }
        var lastCards = [];

        for(var i = 0; i < twoCard.length; i++) {
            if(this.getRazzCard(twoCard[i], num == 1 ? 2 : 0) > card) {
                lastCards[lastCards.length] = twoCard[i];
                lastCards[lastCards.length] = twoCard[i];
                if(lastCards.length / 2 >= num && !sun) {
                    return lastCards;
                }
            }
        }

        for(var i = 0; i < threeCard.length; i++) {
            if (this.getRazzCard(threeCard[i], num == 1 ? 3 : 0) > card) {
                lastCards[lastCards.length] = threeCard[i];
                lastCards[lastCards.length] = threeCard[i];
                if(lastCards.length / 2 >= num && !sun) {
                    return lastCards;
                }
            }
        }

        if(sun) { //! 顺子拆炸弹
            for(var i = 0; i < fourCard.length; i++) {
                if (fourCard[i] > card) {
                    lastCards[lastCards.length] = fourCard[i];
                    lastCards[lastCards.length] = fourCard[i];
                }
            }
        }

        if(sun && lastCards.length >= num * 2) {
            lastCards.sort(function(a, b){
                return a - b});
            var index = -1;
            var find = true;
            for(var i = 0; i < lastCards.length; i+=2) {
                find = true;
                for(var j = 1; j < num; j++) {
                    if(i + j * 2 >= lastCards.length) {
                        find = false;
                        break;
                    }
                    if(lastCards[i + j * 2] - lastCards[i + (j - 1) * 2] != 1) {
                        find = false;
                        break;
                    }
                }
                if(find) {
                    index = i;
                    break;
                }
            }
            if(index == -1) {
                return null
            }
            var outCards = [];
            for(var i = index; i < num * 2 + index; i++) {
                outCards[i - index] = lastCards[i];
            }
            return outCards;
        }

        return null;
    },

    //! 得到三张牌
    getThreeCard:function(oneCard, twoCard, threeCard, fourCard, card, num, sun) {
        if(num == null || num <= 0) {
            num = 1;
        }
        if(sun == null) {
            sun = false;
        }
        var lastCards = [];

        for(var i = 0; i < threeCard.length; i++) {
            if (this.getRazzCard(threeCard[i], num == 1 ? 3 : 0) > card) {
                lastCards[lastCards.length] = threeCard[i];
                lastCards[lastCards.length] = threeCard[i];
                lastCards[lastCards.length] = threeCard[i];
                if(lastCards.length / 3 >= num && !sun) {
                    return lastCards;
                }
            }
        }

        if(sun) { //! 顺子拆炸弹
            for(var i = 0; i < fourCard.length; i++) {
                if (fourCard[i] > card) {
                    lastCards[lastCards.length] = fourCard[i];
                    lastCards[lastCards.length] = fourCard[i];
                    lastCards[lastCards.length] = fourCard[i];
                }
            }
        }

        if(sun && lastCards.length >= num * 3) {
            lastCards.sort(function(a, b){
                return a - b});
            var index = -1;
            var find = true;
            for(var i = 0; i < lastCards.length; i+=3) {
                find = true;
                for(var j = 1; j < num; j++) {
                    if(i + j * 3 >= lastCards.length) {
                        find = false;
                        break;
                    }
                    if(lastCards[i + j * 3] - lastCards[i + (j - 1) * 3] != 1) {
                        find = false;
                        break;
                    }
                }
                if(find) {
                    index = i;
                    break;
                }
            }
            if(index == -1) {
                return null
            }
            var outCards = [];
            for(var i = index; i < num * 3 + index; i++) {
                outCards[i - index] = lastCards[i];
            }
            return outCards;
        }

        return null;
    },

    //! 得到四张牌
    getFourCard:function(fourCard, card) {
        var lastCards = [];

        for(var i = 0; i < fourCard.length; i++) {
            if (this.getRazzCard(fourCard[i], 4) > card) {
                lastCards[0] = lastCards[1] = lastCards[2] = lastCards[3] = fourCard[i];
                return lastCards;
            }
        }

        return null;
    },

    //! 得到转化的牌
    getRazzCard:function(card, num) {
        if(num == 0) {
            return card;
        }
        if(this.currazz.length < num) {
            return card
        }
        for(var i = 0; i < this.currazz.length; i++) {
            if(this.currazz[i] == card) {
                num--;
                if(num <= 0) {
                    return this.razz
                }
            }
        }
        return card;
    },

    //! 得到可以出的牌
    getLastCard:function(handCards, stepCards, curRazz, stepRazz) {
        var lastCards = [];
        this.currazz = curRazz;
        //! 分析
        var oneCard = [];
        var twoCard = [];
        var threeCard = [];
        var fourCard = [];
        var rocket = this.analyseCard(handCards, oneCard, twoCard, threeCard, fourCard);
        var _oneCard = [];
        var _twoCard = [];
        var _threeCard = [];
        var _fourCard = [];
        var _rocket = this.analyseCard(stepCards, _oneCard, _twoCard, _threeCard, _fourCard);
        //! 没出牌
        if(stepCards.length == 0) {
            if(oneCard.length > 0) {
                lastCards[0] = oneCard[0];
                return lastCards;
            } else if(twoCard.length > 0) {
                lastCards[0] = lastCards[1] = twoCard[0];
                return lastCards;
            } else if(threeCard.length > 0) {
                lastCards[0] = lastCards[1] = lastCards[2] = threeCard[0];
                return lastCards;
            } else if(fourCard.length > 0) {
                lastCards[0] = lastCards[1] = lastCards[2] = lastCards[3] = fourCard[0];
                return lastCards;
            }
        }

        if(_rocket) {
            return lastCards
        }

        //! 单张
        if(stepCards.length == 1) {
            var deal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, stepCards[0]);
            if(deal != null) {
                return deal;
            }
        }

        //! 对子 和 双王
        if(stepCards.length == 2) {
            var deal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, stepCards[0]);
            if(deal != null) {
                return deal;
            }
        }

        //! 3张
        if(stepCards.length == 3) {
            var deal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, stepCards[0]);
            if(deal != null) {
                return deal;
            }
        }

        //! 4张
        var boom = false;
        if(stepCards.length == 4) {
            //! 炸弹
            if(stepCards[0] == stepCards[1] && stepCards[2] == stepCards[3] && stepCards[0] == stepCards[3]) {
                boom = true;
                if(stepRazz == 0) { //! 硬炸
                    var fourdeal = this.getFourCard(fourCard, stepCards[0])
                    if(fourdeal != null) {
                        if(curRazz.length == 0) {
                            return fourdeal;
                        }
                        if(fourdeal[0] == this.razz) {
                            return fourdeal;
                        }
                    }
                } else { //! 软炸
                    for(var i = 2; i <= 14; i++) {
                        var fourdeal = this.getFourCard(fourCard, i)
                        if(fourdeal == null) {
                            continue
                        }
                        if(fourdeal[0] == this.razz) {
                            return fourdeal;
                        }
                        if(fourdeal[0] > stepCards[0]) {
                            return fourdeal;
                        }
                        if(this.getRazzCard(fourdeal[0], 1) == fourdeal[0]) {
                            return fourdeal;
                        }
                    }
                }

                //cc.log(fourCard);
                //cc.log(stepCards[0]);

            } else {
                //! 3带1
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0]);
                if(threedeal != null) {
                    this.costCard(threeCard, threedeal, 3);
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0);
                    if(onedeal != null) {
                        threedeal[3] = onedeal[0];
                        return threedeal;
                    }
                }
            }
        }

        if(stepCards.length == 5) {
            if(_threeCard.length > 0 && _twoCard.length > 0) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0]);
                if(threedeal != null) {
                    this.costCard(threeCard, threedeal, 3);
                    var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, 0);
                    if(twodeal != null) {
                        threedeal[3] = threedeal[4] = twodeal[0];
                        return threedeal;
                    }
                }
            }
        }

        if(stepCards.length >= 5) {
            if(_oneCard.length == stepCards.length) { //! 顺子
                var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, _oneCard[0], _oneCard.length, true);
                if(onedeal != null) {
                    return onedeal;
                }
            } else if(_twoCard.length == stepCards.length / 2) {
                var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, _twoCard[0], _twoCard.length, true);
                if(twodeal != null) {
                    return twodeal;
                }
            } else if(_threeCard.length == stepCards.length / 3) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
                if(threedeal != null) {
                    return threedeal;
                }
            } else if(_fourCard.length == 0 && _threeCard.length == _oneCard.length && _twoCard.length == 0) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
                if(threedeal != null) {
                    this.costCard(threeCard, threedeal, 3);
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, _threeCard.length);
                    if(onedeal != null) {
                        for(var i = 0; i < onedeal.length; i++) {
                            threedeal[threedeal.length + i] = onedeal[i];
                        }
                        return threedeal;
                    }
                }
            } else if(_fourCard.length == 0 && _threeCard.length == _twoCard.length && _oneCard.length == 0) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
                if(threedeal != null) {
                    var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, 0, _threeCard.length);
                    if(twodeal != null) {
                        this.costCard(threeCard, threedeal, 3);
                        for(var i = 0; i < twodeal.length; i++) {
                            threedeal[threedeal.length + i] = twodeal[i];
                        }
                        return threedeal;
                    }
                }
            } else if(_fourCard.length == 0 && _threeCard.length == (_oneCard.length + _twoCard.length)) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
                if(threedeal != null) {
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, _threeCard.length);
                    if(onedeal != null) {
                        this.costCard(threeCard, threedeal, 3);
                        for(var i = 0; i < onedeal.length; i++) {
                            threedeal[threedeal.length + i] = onedeal[i];
                        }
                        return threedeal;
                    }
                }
            }  else if(_fourCard.length == 1 && _oneCard.length == 2 && _threeCard.length == 0 && _twoCard.length == 0) {
                var fourdeal = this.getFourCard(fourCard, _fourCard[0]);
                if(fourdeal != null) {
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, 2);
                    if(onedeal != null) {
                        fourdeal[4] = onedeal[0];
                        fourdeal[5] = onedeal[1];
                        return fourdeal;
                    }
                }
            } else if(_fourCard.length == 1 && _twoCard.length == 1 && _threeCard.length == 0 && _oneCard.length == 0) {
                var fourdeal = this.getFourCard(fourCard, _fourCard[0]);
                if(fourdeal != null) {
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, 2);
                    if(onedeal != null) {
                        fourdeal[4] = onedeal[0];
                        fourdeal[5] = onedeal[1];
                        return fourdeal;
                    }
                }
            } else if(_fourCard.length == 1 && _twoCard.length == 2 && _threeCard.length == 0 && _oneCard.length == 0) {
                var fourdeal = this.getFourCard(fourCard, _fourCard[0]);
                if(fourdeal != null) {
                    var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, 0, 2);
                    if(twodeal != null) {
                        fourdeal[4] = fourdeal[5] = twodeal[0];
                        fourdeal[6] = fourdeal[7] = twodeal[2];
                        return fourdeal;
                    }
                }
            }
        }

        if(!boom) {
            for(var i = 0; i < fourCard.length; i++) {
                cc.log("boom fourCard="+fourCard[i]);
                lastCards[0] = lastCards[1] = lastCards[2] = lastCards[3] = fourCard[i];
                cc.log("lastCards[0]="+lastCards[0]);
                return lastCards;
            }
        }

        if(rocket) {
            lastCards[0] = 1000;
            lastCards[1] = 2000;
            return lastCards;
        }

        return new Array();
    },

    //! 将手牌复制并放入癞子
    getHandCards:function(handCards, card) {
        var outCards = [];
        for(var i = 0; i < handCards.length; i++) {
            outCards[i] = handCards[i];
        }
        if(card != null) {
            outCards[outCards.length] = card;
            outCards.sort(function(a, b){
                return a - b});
        }

        return outCards;
    },

    getCurRazz:function(currazz, card) {
        var outCards = [];
        for(var i = 0; i < currazz.length; i++) {
            outCards[i] = currazz[i];
        }
        outCards[outCards.length] = card;

        return outCards;
    },

    //! 递归尝试放入癞子
    getOutCards:function(handCards, stepCards, razznum, steprazz, currazz) {
        razznum--;
        for(var i = 3; i <= 14; i++) {
            var outCard = this.getHandCards(handCards, i);
            var curRazz = this.getCurRazz(currazz, i);
            if(razznum == 0) {
                var lastCard = this.getLastCard(outCard, stepCards, curRazz, steprazz);
                if(lastCard.length > 0) {
                    return lastCard;
                }
            } else {
                var lastCard = this.getOutCards(outCard, stepCards, razznum, steprazz, curRazz);
                if(lastCard != null && lastCard.length > 0) {
                    return lastCard;
                }
            }
        }
        var outCard = this.getHandCards(handCards, 20);
        var curRazz = this.getCurRazz(currazz, 20);
        if(razznum == 0) {
            var lastCard = this.getLastCard(outCard, stepCards, curRazz, steprazz);
            if(lastCard.length > 0) {
                return lastCard;
            }
        } else {
            var lastCard = this.getOutCards(outCard, stepCards, razznum, steprazz, curRazz);
            if(lastCard != null && lastCard.length > 0) {
                return lastCard;
            }
        }
        return null;
    },

    //! 将最后的牌转成有癞子的牌
    transformLastCard:function(handCards, lastCard, abscards) {
        for(var i = 0; i < lastCard.length; i++) {
            abscards[i] = lastCard[i];
            var find = false;
            for(var j = 0; j < handCards.length; j++) {
                if(handCards[j] == lastCard[i]) {
                    handCards.splice(j, 1);
                    find = true;
                    break;
                }
            }
            if(!find) {
                lastCard[i] = this.razz;
            }
        }
        return lastCard;
    },

    //! 提示
    //! handCards手牌
    //! stepCards上家出的牌,若上家是你自己或者你第一个出牌，stepCards传个长度为0的数组,请传绝对牌型
    //! razz为癞子,癞不要传花色
    //! stepRazz为上家的癞子,若无癞子传0,有癞子传非0即可,主要用以判断软炸
    //! 注意函数内会改变handCards和stepCards，因此务必传入内存拷贝的数据。
    //! 返回一个数组,数组内没有花色
    //! 返回值是一个数组。。告诉你哪些牌被弹出来。。数组不带花色。。
    //! 比如弹出4个8.。数组是[8, 8, 8, 8]不是[81, 82, 83, 84]。
    //! 返回绝对牌型
    tipsCard:function(handCards, stepCards, stepRazz, razz, abscards) {//!
        if(razz == 1) {
            this.razz = 14;
        } else if(razz == 2) {
            this.razz = 20;
        } else {
            this.razz = razz;
        }
        //! 癞子数量
        this.razznum = 0;

        for(var i = 0; i < handCards.length;) {
            if(handCards[i] == 1000 || handCards[i] == 2000) {
                i++;
                continue;
            }
            handCards[i] = parseInt(handCards[i] / 10);
            if(handCards[i] == 1) {
                handCards[i] = 14;
            } else if(handCards[i] == 2) {
                handCards[i] = 20;
            }

            if(handCards[i] == this.razz) {
                handCards.splice(i, 1);
                this.razznum++;
            } else {
                i++;
            }
        }
        cc.log("Tool--tipsCard="+handCards);
        handCards.sort(function(a, b){
            return a - b});

        for(var i = 0; i < stepCards.length; i++) {
            if(stepCards[i] == 1000 || stepCards[i] == 2000) {
                continue;
            }
            stepCards[i] = parseInt(stepCards[i] / 10);
            if(stepCards[i] == 1) {
                stepCards[i] = 14;
            } else if(stepCards[i] == 2) {
                stepCards[i] = 20;
            }
        }
        stepCards.sort(function(a, b){
            return a - b});

        var nblastCard = this.getLastCard(this.getHandCards(handCards), stepCards, [], stepRazz);
        if(nblastCard.length == 2 && nblastCard[0] == 1000 && nblastCard[1] == 2000) { //! 火箭

        } else if(nblastCard.length == 4 && nblastCard[0] == nblastCard[1] && nblastCard[0] == nblastCard[2] && nblastCard[0] == nblastCard[3]) { //! 硬炸

        } else if(nblastCard.length > 0) { //! 不是火箭和硬炸
            for(var i = 0; i < nblastCard.length; i++) {
                abscards[i] = nblastCard[i];
            }
            return nblastCard;
        }

        if(this.razznum > 0) {
            var lastCard = this.getOutCards(handCards, stepCards, 1, stepRazz, []);
            if(lastCard != null) {
                return this.transformLastCard(handCards, lastCard, abscards);
            }
            this.razznum--;
        }

        if(this.razznum > 0) {
            var lastCard = this.getOutCards(handCards, stepCards, 2, stepRazz, []);
            if(lastCard != null) {
                return this.transformLastCard(handCards, lastCard, abscards);
            }
            this.razznum--;
        }

        if(this.razznum > 0) {
            var lastCard = this.getOutCards(handCards, stepCards, 3, stepRazz, []);
            if(lastCard != null) {
                return this.transformLastCard(handCards, lastCard, abscards);
            }
            this.razznum--;
        }

        if(this.razznum > 0) {
            var lastCard = this.getOutCards(handCards, stepCards, 4, stepRazz, []);
            if(lastCard != null) {
                return this.transformLastCard(handCards, lastCard, abscards);
            }
            this.razznum--;
        }

        if(nblastCard.length > 0) { //! 不是火箭和硬炸
            for(var i = 0; i < nblastCard.length; i++) {
                abscards[i] = nblastCard[i];
            }
            return nblastCard;
        }

        return new Array();
    },
});

gameclass.tool_wildcardType.create = function(){

    return new gameclass.tool_wildcardType();
}
/*
var cd = new gameclass.tool_cardType();
var res = cd.isHuoJian([100,200]);
cc.log( "fhz:" );
cc.log(  res);*/
