var gameclass = gameclass || {};
gameclass.tool_pdkcardType = cc.Class.extend({
    CARDTYPE:{
        danzhang:1,
        duizi:2,
        sanzhang:3,
        zhadan:4,
        sandaiyi:5,
        sandaier:6,
        liandui:7,
        shunzi:8,
        sidaierdan:9,
        sidaierdui:10,
        feiji:11,
        danfei:12,
        shuangfei:13,
        huojian:14,
        sidaisan:15,
    },
    ctor:function () {

    },

    check:function(cardsArr,cardCount){
        //cc.log("出牌检测"+cardsArr);
        if(cardsArr.length < 1){
            return 0;
        }
        var cards = this.build(cardsArr);
        cc.log(cards);
        var funcs = [
            this.isDanZhang.bind(this),
            this.isDuiZi.bind(this),
            //this.isSanZhang.bind(this),
            this.isZhaDan.bind(this),
            this.isSanDaiYi.bind(this),
            this.isSanDaiEr.bind(this),
            this.isLianDui.bind(this),
            this.isShunZi.bind(this),
            //this.isSiDaiErDan.bind(this),
            //this.isSiDaiErDui.bind(this),
            this.isSiDaiSan.bind(this),
            this.isFeiJi.bind(this),
            //this.isDanFei.bind(this),
            this.isShuangFei.bind(this),
            this.isHuoJian.bind(this)
        ];

        var res = 0;
        for(var i=0;i< funcs.length ; i++) {
            if(funcs[i]){
                res =  funcs[i](cards,cardsArr.length,cardCount);
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
    //------------压牌检测
    compare:function(pressCards,befCards){
        cc.log("pressCards="+pressCards+",befCards="+befCards);
        var res1 = this.check(pressCards);
        cc.log("---------------压牌-----------------000");
        cc.log(res1);
        if(res1 == 0){
            return {value:-1};
        }

        var res2 = this.check(befCards);
        cc.log("---------------上家出的牌------------000");
        cc.log(res2);
        if(res2 == 0){
            return {value:-1};
        }

        if(res1.type == this.CARDTYPE.huojian){
            return {type:this.CARDTYPE.huojian,value:1};
        }
        if(res1.type == this.CARDTYPE.zhadan){
            if(res2.type != this.CARDTYPE.zhadan && res2.type != this.CARDTYPE.huojian ){
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
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.duizi:
                return {
                    type:this.CARDTYPE.duizi,
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.sanzhang:
                return {
                    type:this.CARDTYPE.sanzhang,
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            //case this.CARDTYPE.zhadan:
            case this.CARDTYPE.sandaiyi:
                return {
                    type:this.CARDTYPE.sandaiyi,
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.sandaier:
                return {
                    type:this.CARDTYPE.sandaier,
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.liandui:
                return {
                    type:this.CARDTYPE.liandui,
                    value:res1.value.min > res2.value.min? 1:-1,
                    res:res1.value.min
                };
            case this.CARDTYPE.shunzi:
                if( res1.value.count != res2.value.count)
                    return -1;
                return {
                    type:this.CARDTYPE.shunzi,
                    value:res1.value.min > res2.value.min? 1:-1,
                    res:res1.value.min
                };
                break;
            case this.CARDTYPE.sidaierdan:
                return {
                    type:this.CARDTYPE.sidaierdan,
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
            case this.CARDTYPE.sidaierdui:
                return {
                    type:this.CARDTYPE.sidaierdui,
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.sidaisan:
                return {
                    type:this.CARDTYPE.sidaisan,
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.feiji:
                return {
                    type:this.CARDTYPE.feiji,
                    value:res1.value.min > res2.value.min? 1:-1,
                    res:res1.value.min
                };
            case this.CARDTYPE.danfei:
                return {
                    type:this.CARDTYPE.danfei,
                    value:res1.value.min > res2.value.min? 1:-1,
                    res:res1.value.min
                };
            case this.CARDTYPE.shuangfei:
                return {
                    type:this.CARDTYPE.shuangfei,
                    value:res1.value.min > res2.value.min? 1:-1,
                    res:res1.value.min
                };
                //return res1.value.min > res2.value.min? 1:-1;
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
    isDanZhang:function (cards , size , cardCount ) {

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
    isDuiZi:function (cards , size , cardCount ) {
        if(size != 2){
            return 0;
        }
        // var data = this.build(cards);
        var d2 = false;
        for(var x=0; x<cards.length;x++){
            if(cards[x] == 2){
                return {type:this.CARDTYPE.duizi,value:x};
            }
        }
        return 0;
    },
    /**
     * 判断是否三张
     **/
    isSanZhang:function (cards , size , cardCount ) {
        if(size != 3){
            return 0;
        }
        //var data = this.build(cards );
        var d2 = false;
        for(var x =0; x<cards.length; x++){
            if(cards[x] == 3){
                if(cardCount > 3)
                {
                    return 0;
                }
                return  {type:this.CARDTYPE.sanzhang , value:x};
            }
        }
        return 0;
    },
    /**
     * 判断炸弹
     **/
    isZhaDan:function (cards,size , cardCount ) {
        if(size != 4){
            return 0;
        }
        //var data = this.build(cards);
        var d2 = false;
        for(var x =0; x<cards.length; x++){
            if(cards[x] == 4){
                /*cc.log("isZhaDan");
                cc.log(x);*/
                return {type:this.CARDTYPE.zhadan , value:x};
            }
        }
        return 0;
    },
    /**
     * 判断三带1
     **/
    isSanDaiYi:function (cards , size , cardCount ) {
        if(size != 4){
            return 0;
        }
        //cc.log(cards);
        var d1 = 0 , d3 = 0 , vd3 = -1;
        var child = 0;
        for(var x =0; x<cards.length; x++){
            if(cards[x] == 3){
                vd3 = x;
                d3++;
            }
            if(cards[x] == 1){
                child = x;
                d1++;
            }
        }
        if(d3 == 1 && d1 == 1){
            if(cardCount > 4)
            {
                return 0;
            }
            return {type:this.CARDTYPE.sandaiyi , value:vd3,d1:child};
        }
        return 0;
    },
    /**
     * 判断三带2
     **/
    isSanDaiEr:function (cards , size , cardCount ) {
        //cc.log("isSanDaiEr");
        if(size != 5){
            return 0;
        }
        //var data = this.build(cards);

        var d2 = 0 , d3 = 0, vd3=-1;
        var child1 = 0,child2 = 0;
        for(var x = 0;x<cards.length;x++){
            if(cards[x] == 3){
                vd3 = x;
                d3++;
            }
            if(cards[x] == 1){
                if(child1 == 0){
                    child1 = x;
                }else{
                    child2 = x;
                }
                d2 ++;
            }
            if(cards[x] == 2){
                child1 = x;
                child2 = x;
                d2+=2;
            }
        }
        if(d3 == 1 && d2 == 2){
            return  {type:this.CARDTYPE.sandaier , value:vd3,d1:child1,d2:child2};
        }
        return 0;
    },

    /*
     * 判断是不是连续的
     * */
    isContinuation:function(data){
        if(data[12] > 0 || data[13] > 0 || data[14] > 0){//2，13小王， 14大王 不计算在连续之内
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

        for(var i = min ;i<=max;i++){
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

    /*
     * 判断是不是连续的(飞机)
     * */
    feijiisContinuation:function(data){
        if(data[12] > 0 || data[13] > 0 || data[14] > 0){//2，13小王， 14大王 不计算在连续之内
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

        var tmpmin=0;
        var tmpmax=0;
        var num=0;
        var tmparr=[[]];
        for(var i = min ;i<=max;i++){
            if(data[i] != 0){
                if(num==0){
                    tmpmin=i;
                }
                num++;
                if(i==max){
                    if(num<2){
                        return 0;
                    }else{
                        tmpmax=i;
                        for(var j=0;j<tmparr.length;j++){
                            if(tmparr[j][0]!=0 || tmparr[j][1]!=0){
                                tmparr[j][0]=tmpmin;
                                tmparr[j][1]=tmpmax;
                                tmparr[j][2]=num;
                            }
                        }
                    }
                }
            }
            else
            {
                if(num>1){
                    tmpmax=i-1;
                    for(var j=0;j<tmparr.length;j++){
                        if(tmparr[j][0]!=0 || tmparr[j][1]!=0){
                            tmparr[j][0]=tmpmin;
                            tmparr[j][1]=tmpmax;
                            tmparr[j][2]=num;
                        }
                    }
                    num=0;
                }else{
                    num=0;
                }
            }
        }
        var maxarr=[0,0,0];
        for(var i=0;i<tmparr.length;i++){
            if(tmparr[i][2]>maxarr[2]){
                maxarr=tmparr[i];
            }
        }
        //var max1=tmp[0];
        //for(var i=0;i<tmp.length;i++)
        //{
        //    if(tmp[i]>=max1)
        //    {
        //        max1=tmp[i];
        //        min=tmpmin[i];
        //        max=min+max1-1;
        //    }
        //}
        //if(max-min+1<2)return 0;

        return {
            min:maxarr[0],
            max:maxarr[1],
            count:maxarr[2]
        };

    },
    /**
     * 判断连队
     **/
    isLianDui:function (cards , size , cardCount ) {
        if(size < 4){
            return 0;
        }
        // var data = this.build(cards);
        for(var i = 0; i<cards.length ; i++){
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
    isShunZi:function (cards , size , cardCount ) {
        if(size < 5){
            return 0;
        }
        //var data = this.build(cards);
        for(var i = 0; i<cards.length ; i++){
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
    /*
     * 判断四带二单
     * */
    isSiDaiErDan:function(cards , size , cardCount ){
        if(size != 6){
            return 0;
        }
        //var data = this.build(cards);

        var d1 = 0, d2 = 0 , d4 = 0 ,v1=-1,v2=-1, vd4 = -1 ;
        var child1 = 0,child2 = 0;
        for(var x =0; x<cards.length; x++){
            if(cards[x] == 4){
                vd4 = x;
                d4++;
            }
            if(cards[x] == 1){
                if(child1 == 0){
                    child1 = x;
                }else{
                    child2 = x;
                }
                d1 ++;
            }

            if(cards[x] == 2){
                child1 = x;
                child2 = x;
                d1 += 2;
            }
        }
        if(d4 == 1 && d1 == 2){
            return {type:this.CARDTYPE.sidaierdan , value:vd4,d1:child1,d2:child2};
        }
        return 0;

    },
    /*
     * 判断四带二对
     * */
    isSiDaiErDui:function(cards , size , cardCount ){
        if(size != 8){
            return 0;
        }
        // var data = this.build(cards);

        var d1 = 0, d2 = 0 ,  d4 = 0, vd4 = -1;
        var child1 = 0,child2 = 0;
        for(var x =0; x<cards.length; x++){
            if(cards[x] == 4){
                vd4 = x;
                d4++;
            }
            if(cards[x] == 2){

                if(d1 == 0){
                    child1 = x;
                    d1++;
                }else{
                    child2 = x;
                    d2++;
                }
            }
        }
        if(d4 == 1 && d1 == 1 && d2 ==1){
            return {type:this.CARDTYPE.sidaierdui , value:vd4,d1:child1,d2:child2};
        }
        return 0;
    },

    /*
     * 判断四带三
     * */
    isSiDaiSan:function(cards , size , cardCount ){
        if(size != 7){
            return 0;
        }
        // var data = this.build(cards);

        var d1 = 0, d2 = 0 , d3 = 0 ,  d4 = 0, vd4 = -1;
        var child1 = 0,child2 = 0,child3 = 0;
        for(var x =0; x<cards.length; x++){
            if(cards[x] == 4){
                vd4 = x;
            }
        }
        if(vd4==1)return {type:this.CARDTYPE.sidaisan , value:vd4};

        return 0;
    },

    /**
     * 判断飞机
     **/
    isFeiJi:function (cards , size , cardCount ) {
        if(size < 6){
            return 0;
        }
        //var data = this.build(cards);
        for(var i = 0; i<cards.length ; i++){
            if(cards[i] != 0 && cards[i] != 3){
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

        return {type:this.CARDTYPE.feiji,value : res};

    },
    /**
     * 判断飞机带N张...
     **/
    isDanFei:function (cards , size , cardCount ) {
        if(size < 8 ){
            return 0;
        }
        // var data = this.build(cards);
        var d1 = 0, d3 =0;
        var child = [];
        var temp =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for(var i=0;i<cards.length ;i++) {
            if (cards[i] == 3) {
                temp[i] = 3;
                d3++;
            } else {
                for(var j = 0;j<cards[i];j++){
                    child.push(i);
                }
                d1 += cards[i];
            }
        }

        var res = this.feijiisContinuation(temp);
        for(var i=0;i<temp.length;i++)
        {
            if(temp[i]==3 && (i<res.min || i>res.max))
            {
                for(var j = 0;j<temp[i];j++){
                    child.push(i);
                }
                d1 += temp[i];
                d3-=1;
            }
        }
        if(d3 != d1){
            return 0;
        }
        if(res == 0){
            return 0;
        }

        return {type:this.CARDTYPE.danfei,value : res,d1:child};

    },
    /**
     * 判断飞机带N*2张...
     **/
    isShuangFei:function (cards , size , cardcount) {
        if(size < 10 && size != cardcount){
            return 0;
        }
        //var data = this.build(cards);
        var d2 = 0, d3 = 0, d1=0,d4=0;
        var derr = 0;
        var temp =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var child = [];
        for(var i=0;i<cards.length ;i++) {
            if(cards[i] == 4)
            {
                return 0;
                //temp[i] = 4;
                d4++;
                child.push(i);
            } else if (cards[i] == 3) {
                temp[i] = 3;
                d3++;
            }else if(cards[i] == 2){
                d2++;
                child.push(i);
            }else if(cards[i] == 1){
                d1++;
                child.push(i);
            }
        }

        var res = this.feijiisContinuation(temp);
        for(var i=0;i<temp.length;i++)
        {
            if(temp[i]==3 && (i<res.min || i>res.max))
            {
                for(var j = 0;j<temp[i];j++){
                    child.push(i);
                }
                d1 += temp[i];
                d3-=1;
            }
        }
        if(size==cardcount){

        }
        else if(d3*2 != d2*2+d1+d4*4){
            return 0;
        }

        //var res = this.isContinuation(temp);
        if(res == 0){
            return 0;
        }

        return {type:this.CARDTYPE.shuangfei,value : res,d2:child};

    },
    //isShuangFei:function (cards , size , cardCount ) {
    //    if(size < 10 ){
    //        return 0;
    //    }
    //    //var data = this.build(cards);
    //    var d2 = 0, d3 =0;
    //    var temp =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    //    var child = [];
    //    for(var i=0;i<cards.length ;i++) {
    //        if (cards[i] == 3) {
    //            temp[i] = 3;
    //            d3++;
    //        } else{
    //            for(var j = 0;j<cards[i];j++){
    //                child.push(i);
    //            }
    //            d2 += cards[i];
    //        }
    //    }
    //
    //    var res = this.feijiisContinuation(temp);
    //    for(var i=0;i<temp.length;i++)
    //    {
    //        if(temp[i]==3 && (i<res.min || i>res.max))
    //        {
    //            for(var j = 0;j<temp[i];j++){
    //                child.push(i);
    //            }
    //            d2 += temp[i];
    //            d3-=1;
    //        }
    //    }
    //    if(d3*2 != d2){
    //        return 0;
    //    }
    //    if(res == 0){
    //        return 0;
    //    }
    //
    //    return {type:this.CARDTYPE.shuangfei,value : res,d2:child};
    //
    //},

    /**
     * 判断火箭
     **/
    isHuoJian:function (cards , size , cardCount ) {
        if(size != 2){
            return 0;
        }
        //var data = this.build(cards);

        if(cards[cards.length - 1] == 1 && cards[cards.length - 2] == 1){
            return {type:this.CARDTYPE.huojian};
        }

        return 0;
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
        var clownCard = [];
        var rocket = false;

        for(var i = 0; i < handCards.length; i++) {
            if(handCards[i] == 1000 || handCards[i] == 2000) {
                clownCard[clownCard.length] = handCards[i];
                continue;
            }
            //索引为牌的大小。值为牌的数量
            if(numCard.hasOwnProperty(handCards[i])) {
                numCard[handCards[i]]++;
                //如果有的话，对应的牌的数量加1
            } else {
                //如果没有的话，对应的牌的数量为1
                numCard[handCards[i]] = 1;
            }
        }
        //cc.log("numCard");
        //cc.log(numCard);
        //var tmpCard =[];

        //数量为1234的牌分别存在数组里
        for(var card in numCard) {
            if (numCard[card] == 1) {
                oneCard[oneCard.length] = parseInt(card);
            } else if (numCard[card] == 2) {
                twoCard[twoCard.length] = parseInt(card);
            } else if (numCard[card] == 3) {
                //tmpCard[tmpCard.length] = parseInt(card);
                threeCard[threeCard.length] = parseInt(card);
            } else if (numCard[card] == 4) {
                fourCard[fourCard.length] = parseInt(card);
                //}
                //}
                //var maxlength=0;
                //var tmplength=0;
                //var index=0;
                //for(var i=0;i<tmpCard.length;i++) {
                //    tmplength++;
                //    if (i>0 && (tmpCard[i]!=tmpCard[i-1]+1)) {
                //        index=i;
                //        if(maxlength<=tmplength)
                //        {
                //            maxlength=tmplength;
                //        }
                //        tmplength=1;
                //    }
                //}
                //for(var i=0;i<tmpCard.length;i++) {
                //    if (i < index || i > index + maxlength - 1) {
                //        threeCardExtra[threeCardExtra.length] = parseInt(tmpCard[i]);
                //    }
                //    else {
                //        threeCard[threeCard.length] = parseInt(tmpCard[i]);
            }
        }
        //判断是否有双王
        if(clownCard.length == 2) {
            rocket = true;
        } else if(clownCard.length == 1){
            oneCard[oneCard.length] = clownCard[0];
        }

        return rocket;
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
                var fourdeal = this.getFourCard(fourCard, stepCards[0])
                if(fourdeal != null) {
                    return fourdeal;
                }
            } else if(_twoCard.length == stepCards.length / 2) {//连对
                var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, _twoCard[0], _twoCard.length, true);
                if(twodeal != null) {
                    return twodeal;
                }
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
            if(_threeCard.length > 0 && (_twoCard.length > 0 || _oneCard.length > 0)) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0]);
                if(threedeal != null) {
                    this.costCard(threeCard, threedeal, 3);
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0,2);
                    //var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, 0);
                    if(onedeal != null) {
                        threedeal[3] = onedeal[0];
                        threedeal[4] = onedeal[1];
                        return threedeal;
                    }
                    //else if(twodeal != null)
                    //{
                    //    threedeal[3] = twodeal[0];
                    //    return threedeal;
                    //}
                }
            }
        }

        if(stepCards.length >= 5) {
            //for(var i = 0;i<_threeCard.length;i++){
            //    if(){
            //
            //    }
            //}
            if(_oneCard.length == stepCards.length) { //! 顺子
                var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, _oneCard[0], _oneCard.length, true);
                cc.log(onedeal);
                if(onedeal != null) {
                    return onedeal;
                }
            } else if(_twoCard.length == stepCards.length / 2) {//连对
                var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, _twoCard[0], _twoCard.length, true);
                if(twodeal != null) {
                    return twodeal;
                }
            }
            //else if(_threeCard.length == stepCards.length / 3) {//飞机不带
            //    var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
            //    if(threedeal != null) {
            //        return threedeal;
            //    }
            //} else if(_threeCard.length == (_oneCard.length*1 + _twoCard.length*2 + _fourCard.length*4)) {//飞机带N张
            //    var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
            //    if(threedeal != null) {
            //        this.costCard(threeCard, threedeal, 3);
            //        var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, _threeCard.length);
            //        if(onedeal != null) {
            //            for(var i = 0; i < onedeal.length; i++) {
            //                threedeal[threedeal.length + i] = onedeal[i];
            //            }
            //            return threedeal;
            //        }
            //    }
            //}
            else if(_threeCard.length*2 == (_oneCard.length*1 + _twoCard.length*2)) {//飞机带N*2张
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
                if(threedeal != null) {
                    this.costCard(threeCard, threedeal, 3);
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, _threeCard.length*2);
                    if(onedeal != null) {
                        for(var i = 0; i < onedeal.length; i++) {
                            threedeal[threedeal.length + i] = onedeal[i];
                        }
                        return threedeal;
                    }
                }
            } else if(_fourCard.length == 1 && _oneCard.length == 2 && _threeCard.length == 0 && _twoCard.length == 0) {
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
            }else if(_fourCard.length == 1 && (_oneCard.length + _twoCard.length*2 + _threeCard.length*3)==3 ) {
                var fourdeal = this.getFourCard(fourCard, _fourCard[0]);
                if(fourdeal != null) {
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, 3);
                    if(onedeal != null) {
                        fourdeal[4] = onedeal[0];
                        fourdeal[5] = onedeal[1];
                        fourdeal[6] = onedeal[2];
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

    //! 提示
    //! handCards手牌
    //! stepCards上家出的牌,若上家是你自己或者你第一个出牌，stepCards传个长度为0的数组
    //! 注意函数内会改变handCards和stepCards，因此务必传入内存拷贝的数据。
    //! 返回一个数组,数组内没有花色
    //! 返回值是一个数组。。告诉你哪些牌被弹出来。。数组不带花色。。
    //! 比如弹出4个8.。数组是[8, 8, 8, 8]不是[81, 82, 83, 84]。
    tipsCard:function(handCards, stepCards) {//!
        for(var i = 0; i < handCards.length; i++) {
            if(handCards[i] == 1000 || handCards[i] == 2000) {
                continue;
            }
            handCards[i] = parseInt(handCards[i] / 10);
            if(handCards[i] == 1) {
                handCards[i] = 14;
            } else if(handCards[i] == 2) {
                handCards[i] = 20;
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
        cc.log("tips handCards="+handCards);
        cc.log("tips stepCards="+stepCards);

        return this.getLastCard(handCards, stepCards);
    },

    getshunzi:function(selCard) {//!
        //var minIndex=0;
        var index=[];
        index[0]=0;
        var direct=false;
        for(var i=0;i<selCard.length;i++)
        {
            if(selCard[i]){
                selCard[i]=parseInt(selCard[i] / 10);
                if(selCard[i]==1){
                    selCard[i]=14;
                }
                if(selCard[i]==2){
                    selCard[i]=15;
                }
            }
        }
        if(selCard[0]<selCard[selCard.length-1]) {
            direct=true;
        }else{
            direct=false;
        }
        selCard.sort(function(a, b){
            return a - b});
        //if(selCard[0] == 2)
        //{
        //    index[0]=1;
        //}
        for(var i=1;i<selCard.length;i++)
        {
            if(i==index[index.length-1]+1)
            {
                if(selCard[i]==15){
                    break;
                }
                if(selCard[i] == selCard[index[index.length-1]] + 1)
                {
                    index[index.length]=i;
                }else if(selCard[i] == selCard[index[index.length-1]]){
                    index[index.length]=i;
                }else{
                    for(var j=0;j<index.length;j++)
                    {
                        if(j>0 && selCard[index[j]] == selCard[index[j-1]])
                        {
                            index.splice(j,1);
                            j--;
                        }
                    }
                    if(index.length>4){
                        break;
                    }
                    index=[];
                    index[0]=i;
                }
            }
        }
        for(var i=0;i<index.length;i++)
        {
            if(i>0 && selCard[index[i]] == selCard[index[i-1]])
            {
                index.splice(i,1);
                i--;
            }
        }
        if(index.length>4)
        {
            if(direct){
                return index;
            }else{
                for(var i=0;i<index.length;i++)
                {
                    index[i]=selCard.length-1-index[i];
                }
                return index;
            }
        }else{
            return 0;
        }
    },
});

gameclass.tool_pdkcardType.create = function(){
    return new gameclass.tool_pdkcardType();
}
/*
var cd = new gameclass.tool_pdkcardType();
var res = cd.isHuoJian([100,200]);
cc.log( "fhz:" );
cc.log(  res);*/
