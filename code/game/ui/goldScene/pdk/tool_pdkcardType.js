var gameclass = gameclass || {};
gameclass.pdk_cardType = cc.Class.extend({
    CARDTYPE:{
        danzhang:1,
        duizi:2,
        //sanzhang:3,
        zhadan:4,
        //sandaiyi:5,//打到最后剩四张牌的时候，才可以三带一,最后三张牌可以只出三带
        //sandaier:6,//
        liandui:7,//两对或者两对以上点数相连的牌
        shunzi:8,//任意五张或五张以上点数相连的牌。2是最大的单张，不能当顺子出。
        //sidaier:9,//点数相同的四张牌+两张单牌或一个对子牌型
        feiji:10,//二个或更多连续的三张牌 + 数量相同的对牌，如：555666+99JJ；也可以带4张单牌，如555666+789J。
        //在有牌的情况下，出555666必须带4张牌，除非牌不够不带或者带少牌
        sandai:11,//
        sidai:12,
    },
    ctor:function () {

    },
    check:function(cardsArr){
        if(cardsArr.length < 1){
            return 0;
        }
        var cards = this.build(cardsArr);
        cc.log(cards);
        var funcs = [
            this.isDanZhang.bind(this),
            this.isDuiZi.bind(this),
            this.isZhaDan.bind(this),
            this.isLianDui.bind(this),
            this.isShunZi.bind(this),
            this.isSanDai.bind(this),
            this.isSiDai.bind(this),
            this.isFeiJi.bind(this)
        ];

        var res = 0;
        for(var i=0;i< funcs.length ; i++) {
            if(funcs[i]){
                res =  funcs[i](cards,cardsArr.length);
                if(res !== 0 ){
                    break;
                }
            }
        }

        /*cc.log("返回出牌类型");
         cc.log(res);*/
        return res;
    },

    build:function (cards) {
        //依次保存3,4,5...K,A,2的个数
        var ar =[0,0,0,0,0,0,0,0,0,0,0,0,0];
        for(var x = 0; x < cards.length;x++){
            var index = cards[x];
            index -= 3;
            ar[ index ]++;
        }
        return ar;
    },
    //------------压牌检测
    compare:function(pressCards,befCards){
        var res1 = this.check(pressCards);
        if(res1 == 0){
            return {value:-1};
        }
        var res2 = this.check(befCards);
        if(res2 == 0){
            return {value:-1};
        }

        if(res1.type == this.CARDTYPE.zhadan){
            if(res2.type != this.CARDTYPE.zhadan){
                return {type:this.CARDTYPE.zhadan,value:1};
            }else if(res2.type == this.CARDTYPE.zhadan){
                if(pressCards[0] > befCards[0]) {
                    return {type:this.CARDTYPE.zhadan,value:1};
                }else{
                    return {value:-1};
                }
            }
        }
        if(res1.type != res2.type ){
            return {value:-1};
        }
        switch (res1.type){
            case this.CARDTYPE.danzhang:
                return {
                    type:this.CARDTYPE.danzhang,
                    result:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.duizi:
                return {
                    type:this.CARDTYPE.duizi,
                    result:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.sandai:
                return {
                    type:this.CARDTYPE.sandai,
                    result:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.liandui:
                if( res1.value.count != res2.value.count)
                    return {value:-1};
                return {
                    type:this.CARDTYPE.liandui,
                    result:res1.value.min > res2.value.min? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.shunzi:
                if( res1.value.count != res2.value.count)
                    return {value:-1};
                return {
                    type:this.CARDTYPE.shunzi,
                    result:res1.value.min > res2.value.min? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.feiji:
                if( res1.value.count < res2.value.count)
                    return {value:-1};
                return {
                    type:this.CARDTYPE.feiji,
                    result:res1.value.min > res2.value.min? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.sidai:
                return {
                    type:this.CARDTYPE.sidai,
                    value:res1.value > res2.value? 1:-1,
                };
                break;
            default:
                return {value:-1};
                break;
        }

    },
    //--------------------压牌检测

    //--------------------提示功能*/

    /**
     * 判断单张
     **/
    isDanZhang:function (cards , size ) {
        if(size != 1){
            return 0;
        }

        for(var i=0; i<cards.length;i++){
            if(cards[i] == 1){
                return {type:this.CARDTYPE.danzhang,value:i};
            }
        }

        return 0;

    },
    /**
     * 判断对子
     **/
    isDuiZi:function (cards , size) {
        if(size != 2){
            return 0;
        }
        for(var x=0; x<cards.length;x++){
            if(cards[x] == 2){
                return {type:this.CARDTYPE.duizi,value:x};
            }
        }
        return 0;
    },
    /**
     * 判断炸弹
     **/
    isZhaDan:function (cards,size) {
        if(size != 4){
            return 0;
        }
        for(var x =0; x<cards.length; x++){
            if(cards[x] == 4){
                return {type:this.CARDTYPE.zhadan , value:x};
            }
        }
        return 0;
    },
    isSanDai:function(cards,size){
        if(size < 3 || size > 5) return 0;
        var head = -1;
        var count = 0;
        for(var i = 0; i < cards.length;i++){
            if(cards[i] == 3){
                head = i;
                count++;
            }
        }
        if(head >= 0 && count > 0){
            return {type:this.CARDTYPE.sandai,value:head};
        }
        return 0;
    },
    isSiDai:function(cards,size){
        if(size < 5) return 0;
        var head = -1;
        for(var i = 0;i < cards.length;i++){
            if(cards[i] == 4){
                head = i;
                break;
            }
        }
        if(head >= 0){
            return {type:this.CARDTYPE.sidai,value:head};
        }
        return 0;
    },
    isFeiJi:function(cards,size){
        if(size < 6){
            return 0;
        }
        var tmp = [0,0,0,0,0,0,0,0,0,0,0,0,0];
        for(var i = 0; i < cards.length ; i++){
            if(cards[i] == 3){
                tmp[i] = 3;
            }
        }
        //判断连续性
        var res = this.isContinuation(tmp);
        if(res == 0){
            return 0;
        }
        if( res.count < 2 ){
            return 0;
        }
        return {type:this.CARDTYPE.feiji,value : res};
    },

    /*
     * 判断是不是连续的
     * */
    isContinuation:function(data){
        if(data[12] > 0){//2不计算在连续之内
            return 0;
        }
        var min = -1, max = -1;
        //找到最小值
        for(var i = 0 ; i< data.length ; i++){
            if( min == -1 && data[i] != 0){
                min = i;
                break;
            }
        }
        if(min < 0){ return 0;}

        //找到最大值
        for(var i = data.length -1 ; i >= 0 ; i--){
            if( max == -1 && data[i] != 0){
                max = i;
                break;
            }
        }
        if(max < 0){ return 0;}

        for(var i = min ;i <= max;i++){
            if(data[i] == 0){
                return 0;
            }
        }

        return {
            min:min,
            max:max,
            count:max - min +1
        };

    },
    /**
     * 判断连队
     **/
    isLianDui:function (cards , size) {
        if(size < 4){
            return 0;
        }
        for(var i = 0; i < cards.length ; i++){
            if(cards[i] != 0 && cards[i] != 2){
                return 0;
            }
        }
        //判断连续性
        var res = this.isContinuation(cards);
        if(res == 0){
            return 0;
        }
        if( res.count < 2 ){
            return 0;
        }
        return { type:this.CARDTYPE.liandui,value : res};
    },
    /**
     * 判断顺子
     **/
    isShunZi:function (cards , size) {
        if(size < 5){
            return 0;
        }
        for(var i = 0; i < cards.length ; i++){
            if(cards[i] != 0 && cards[i] != 1){
                return 0;
            }
        }
        //判断连续性
        var res = this.isContinuation(cards);
        if(res == 0){
            return 0;
        }
        if( res.count < 5 ){
            return 0;
        }
        return {
            type:this.CARDTYPE.shunzi,
            value : res
        };
    },

    //! 得到一张牌
    getOneCard:function(oneCard, twoCard, threeCard, fourCard, card, num, sun) {
        //cc.log(oneCard, twoCard, threeCard, card, num, sun);
        if(num == null || num <= 0) {
            num = 1;
        }
        if(sun == null) {
            sun = false;
        }
        //cc.log(num,sun);
        var outCards = [];

        for(var i = 0; i < oneCard.length; i++) {
            if(oneCard[i] > card) {
                outCards[outCards.length] = oneCard[i];
                if(outCards.length >= num && !sun) {
                    return outCards;
                }
            }
        }

        for(var i = 0; i < twoCard.length; i++) {
            if(twoCard[i] > card) {
                for(var j = 0; j < 2; j++) {
                    outCards[outCards.length] = twoCard[i];
                    if(outCards.length >= num && !sun) {
                        return outCards;
                    }
                    if(sun) { //! 顺子不压入相同的牌
                        break;
                    }
                }
            }
        }

        for(var i = 0; i < threeCard.length; i++) {
            if(threeCard[i] > card) {
                for(var j = 0; j < 3; j++) {
                    outCards[outCards.length] = threeCard[i];
                    if(outCards.length >= num && !sun) {
                        return outCards;
                    }
                    if(sun) { //! 顺子不压入相同的牌
                        break;
                    }
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
            if(twoCard[i] > card) {
                lastCards[lastCards.length] = twoCard[i];
                lastCards[lastCards.length] = twoCard[i];
                if(lastCards.length / 2 >= num && !sun) {
                    return lastCards;
                }
            }
        }

        for(var i = 0; i < threeCard.length; i++) {
            if (threeCard[i] > card) {
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
        cc.log(oneCard, twoCard, threeCard, card, num, sun);
        if(num == null || num <= 0) {
            num = 1;
        }
        if(sun == null) {
            sun = false;
        }
        var lastCards = [];

        for(var i = 0; i < threeCard.length; i++) {
            if (threeCard[i] > card) {
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
            if (fourCard[i] > card) {
                lastCards[0] = lastCards[1] = lastCards[2] = lastCards[3] = fourCard[i];
                return lastCards;
            }
        }
        return null;
    },

    //! 分析
    analyseCard:function(handCards, oneCard, twoCard, threeCard, fourCard) {
        var numCard = [];

        for(var i = 0; i < handCards.length; i++) {
            if(numCard.hasOwnProperty(handCards[i])) {
                numCard[handCards[i]]++;
            } else {
                numCard[handCards[i]] = 1;
            }
        }

        for(var card in numCard) {
            if (numCard[card] == 1) {
                oneCard[oneCard.length] = parseInt(card);
            } else if (numCard[card] == 2) {
                twoCard[twoCard.length] = parseInt(card);
            } else if (numCard[card] == 3) {
                threeCard[threeCard.length] = parseInt(card);
            } else if (numCard[card] == 4) {
                fourCard[fourCard.length] = parseInt(card);
            }
        }
    },

    costCard:function(cards, _card, num) {
        for(var i = 0; i < _card.length; i += num) {
            for(var j = 0; j < cards.length; j++) {
                if(cards[j] == _card[i]) {
                    cards.splice(j, 1);
                    break;
                }
            }
        }
    },

    //! 得到可以出的牌
    getLastCard:function(handCards, stepCards) {
        var lastCards = [];

        //! 分析
        var oneCard = [];
        var twoCard = [];
        var threeCard = [];
        var fourCard = [];
        this.analyseCard(handCards, oneCard, twoCard, threeCard, fourCard);
        var _oneCard = [];
        var _twoCard = [];
        var _threeCard = [];
        var _fourCard = [];
        var res = this.check(stepCards);
        this.analyseCard(stepCards, _oneCard, _twoCard, _threeCard, _fourCard);
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

        //! 4张
        var boom = false;
        if(stepCards.length == 4) {
            //! 炸弹
            if(stepCards[0] == stepCards[1] && stepCards[2] == stepCards[3] && stepCards[0] == stepCards[3]) {
                boom = true;
                var fourdeal = this.getFourCard(fourCard, stepCards[0])
                if(fourdeal != null) {
                    return fourdeal;
                }
            }
            //两连队
            else if(_twoCard.length == stepCards.length / 2){
                var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, _twoCard[0], _twoCard.length, true);
                if(twodeal != null) {
                    return twodeal;
                }
            }
        }

        //检测3张
        if(stepCards.length >= 3){
            if(res.type == this.CARDTYPE.sandai){
                //3个带两个单牌 !!!!但是当手上的牌小于5张时候。也不必要出5张
                var dif = 2;
                if(handCards.length == 4) dif = 1;
                else if(handCards.length == 3) dif = 0;
                if(_threeCard.length > 0){
                    var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0]);
                    if(threedeal != null) {
                        this.costCard(threeCard, threedeal, 3);
                        var resultArr = this.getOtherCard(oneCard, twoCard, threeCard, fourCard,dif);
                        for(var i = 3;i < 3+resultArr.length;i++){
                            threedeal[i] = resultArr[i-3];
                        }
                        cc.log(threedeal);
                        return threedeal;
                    }
                }
            }
            else if(res.type == this.CARDTYPE.feiji){
                var dif = res.value.count * 2;
                if(handCards.length < res.value.count * 5){
                    dif = handCards.length - res.value.count * 3;
                }
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
                if(threedeal != null){
                    this.costCard(threeCard, threedeal, 3);
                    var resultArr = this.getOtherCard(oneCard, twoCard, threeCard, fourCard,dif);
                    threedeal = threedeal.concat(resultArr);
                    return threedeal;
                }
            }
            else if(res.type == this.CARDTYPE.sidai){
                var dif = 2;
                if(handCards.length == 5){
                    dif = 1;
                }
                var fourdeal = this.getFourCard(fourCard, _fourCard[0]);
                if(fourdeal != null) {
                    var resultArr = this.getOtherCard(oneCard, twoCard, threeCard, fourCard,dif);
                    if(resultArr != null) {
                        fourdeal = fourdeal.concat(resultArr);
                        return fourdeal;
                    }
                }
            }
        }

        if(stepCards.length >= 5) {
            if(_oneCard.length == stepCards.length) { //! 顺子
                var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, _oneCard[0], _oneCard.length, true);
                cc.log(onedeal);
                if(onedeal != null) {
                    return onedeal;
                }
            } else if(_twoCard.length == stepCards.length / 2) {//对子
                var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, _twoCard[0], _twoCard.length, true);
                if(twodeal != null) {
                    return twodeal;
                }
            }
        }

        if(!boom) {
            for(var i = 0; i < fourCard.length; i++) {
                lastCards[0] = lastCards[1] = lastCards[2] = lastCards[3] = fourCard[i];
                return lastCards;
            }
        }

        return new Array();
    },

    //sum为要得到牌的总数
    getOtherCard:function(oneCard, twoCard, threeCard, fourCard,sum){
        var resultArr = [];
        var getNum = 0;//已经得到牌的数量
        var index = 0;//是从onCard得到还是twoCard....
        var startNum = 0;
        var tmpArr = [oneCard,twoCard,threeCard,fourCard];
        var callfunc = function(){
            if(index >= tmpArr.length) return;
            if(tmpArr[index].length == 0){
                index++;
            }
            if(getNum < sum){
                if(parseInt(startNum) < tmpArr[index].length * (index+1) ){
                    resultArr.push(tmpArr[index][parseInt(startNum)]);
                    getNum++;
                    startNum += 1/(index+1);
                }else{
                    index++;
                    startNum = 0;
                }
            }else{
                index++;
                startNum = 0;
            }
            callfunc();
        }

        while (getNum < sum){
            callfunc();
        }
        resultArr.sort(function(a,b){
            return a-b;
        })
        return resultArr;
    },

    //! 提示
    //! handCards手牌
    //! stepCards上家出的牌,若上家是你自己或者你第一个出牌，stepCards传个长度为0的数组
    //! 注意函数内会改变handCards和stepCards，因此务必传入内存拷贝的数据。
    //! 返回一个数组,数组内没有花色
    //! 返回值是一个数组。。告诉你哪些牌被弹出来。。数组不带花色。。
    //! 比如弹出4个8.。数组是[8, 8, 8, 8]不是[81, 82, 83, 84]。
    tipsCard:function(handCards, stepCards) {//!
        for(var i = 0; i < handCards.length; i++) {
            handCards[i] = parseInt(handCards[i] / 10);
            if(handCards[i] == 1) {
                handCards[i] = 14;
            } else if(handCards[i] == 2) {
                handCards[i] = 20;
            }
        }
        handCards.sort(function(a, b){
            return a - b});

        for(var i = 0; i < stepCards.length; i++) {
            stepCards[i] = parseInt(stepCards[i] / 10);
            if(stepCards[i] == 1) {
                stepCards[i] = 14;
            } else if(stepCards[i] == 2) {
                stepCards[i] = 20;
            }
        }
        stepCards.sort(function(a, b){
            return a - b});

        return this.getLastCard(handCards, stepCards);
    },
});

gameclass.tool_cardType.create = function(){
    return new gameclass.pdk_cardType();
}
/*
 var cd = new gameclass.tool_cardType();
 var res = cd.isHuoJian([100,200]);
 cc.log( "fhz:" );
 cc.log(  res);*/
