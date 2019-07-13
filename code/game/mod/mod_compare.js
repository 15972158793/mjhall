/**
 * Created by my on 2016/3/3.
 */

mod_compare = {};

mod_compare.TYPE_WUXIAONIU = 400;
mod_compare.TYPE_WUHUANIU = 300;
mod_compare.TYPE_4ZHA = 200;
mod_compare.TYPE_NIUNIU = 100;
mod_compare.TYPE_YOUNIU = 90;
mod_compare.TYPE_MEINIU = 0;

var ts = [72,13,112,74,33];


mod_compare.gettypestr = function (cards) {  

    cards = mod_compare.cardsort(cards);
    cards = mod_compare.covertato1(cards);
    var type = mod_compare.get_cardlisttype(cards);

    if(type == mod_compare.TYPE_WUXIAONIU){
        return "五小牛";
    }else if(type == mod_compare.TYPE_WUHUANIU){
        return "五花牛";
    }else if(type == mod_compare.TYPE_4ZHA){
        return "4炸";
    }else if(type == mod_compare.TYPE_NIUNIU){
        return "牛牛";
    }else if(type >= mod_compare.TYPE_YOUNIU){
        return "牛" + (type - mod_compare.TYPE_YOUNIU);
    }
    return "没牛";
};

mod_compare.gettype = function (_cards,lst) {

   var cards = [];
    for (var i=0;i < 5;i++){
        cards[i] = _cards[i];
    }
    cards = mod_compare.cardsort(cards);
    var tempcards = mod_compare.covertato1(cards);
    var ret = [];
    var type = mod_compare.get_cardlisttype(tempcards,ret);

    for (var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++) {
            if (_cards[i] == cards[j] && ret[j]){
                lst[i] = true;
                break;
            }
        }
    }

    return type;
};

mod_compare.cardsort = function(cards){

    cards = cards.sort(function(a,b){
        return a < b
    });

    return cards;
};

mod_compare.covertato1 = function(cards){
    var ret=[];
    for (var i = 0; i < cards.length; ++i) {
        var t1 = cards[i]%10;
        var p1 = Math.floor(cards[i]/10);
        ret[i] = {}
        ret[i].t = t1;
        ret[i].p = p1;
        ret[i].card = cards[i];

    };

    return ret;
};

mod_compare.is_5xiaoniu = function(cards){
    for (var i = 0; i < cards.length; ++i) {
        if(cards[i]["p"] >= 5)
            return false;
    }
    if (cards[0]["p"] + cards[1]["p"] + cards[2]["p"] + cards[3]["p"] + cards[4]["p"] <= 10)
        return true;
    return false;
};

mod_compare.is_5huaniu = function(cards){
    for (var i = 0; i < cards.length; ++i) {
        if(cards[i]["p"] <= 10)
            return false;
    }
    return true;
};

mod_compare.get_cardnumcount = function (card,cards) {
    var count = 0
    for (var i = 0; i < cards.length; ++i) {
        if (cards[i]["p"] == card["p"]) {
            count = count + 1;
        }
    }
    return count;
};

mod_compare.is_4zha = function(cards,lst){
    var ret = false;
    var card;
    if (cards[0]["p"] == cards[1]["p"]){
        card  = cards[0];
        ret = mod_compare.get_cardnumcount(cards[0],cards) == 4;
    } else{
        card  = cards[1];
        ret =  mod_compare.get_cardnumcount(cards[1],cards) == 4;
    }


    if (ret){

        for (var i = 0; i < 5; i++){
            if (card != cards[i]){
                lst[i] = false;
            }
        }
    }

    return ret
};

mod_compare.is_niuniu = function(cards){
    var coutnum = 0
    for (var i = 0; i < cards.length; ++i) {
        if (cards[i]["p"] > 10)
            coutnum += 10;
        else
            coutnum += cards[i]["p"];
    }
    return coutnum%10 == 0;
};

mod_compare.is_youniu = function (_cards,lst) {
    var cards = [];
    for (var i = 0; i < _cards.length; ++i){
        cards[i] = _cards[i];
        if (cards[i]["p"] > 10)
            cards[i]["p"] = 10;
    }

    for (var x1 = 0; x1 < 3; ++x1)
        for (var x2 = x1+1; x2 < 4; ++x2)
            for (var x3 = x2+1; x3 < 5; ++x3)
                if ((cards[x1]["p"] + cards[x2]["p"] + cards[x3]["p"])%10 == 0) {
                    lst[x1] = true;
                    lst[x2] = true;
                    lst[x3] = true;
                    return true;
                }
    return false;
};

mod_compare.get_cardlisttype = function(cards,lst){
    for(var i = 0; i <5; i++){
        lst[i] = true;
    }
    if (mod_compare.is_5xiaoniu(cards))
        return mod_compare.TYPE_WUXIAONIU;
    if (mod_compare.is_5huaniu(cards))
        return mod_compare.TYPE_WUHUANIU;
    if(mod_compare.is_4zha(cards,lst))
        return mod_compare.TYPE_4ZHA;

    for(var i = 0; i <5; i++){
        lst[i] = false;
    }

    if(mod_compare.is_youniu(cards,lst)) {
        if (mod_compare.is_niuniu(cards)) {
            for(var i = 0; i <5; i++){
                lst[i] = true;
            }
            return mod_compare.TYPE_NIUNIU;
        }
        else
            return mod_compare.TYPE_YOUNIU + (cards[0]["p"] + cards[1]["p"] + cards[2]["p"] + cards[3]["p"] + cards[4]["p"]) % 10;
    }

    for(var i = 0; i <5; i++){
        lst[i] = false;
    }
    return mod_compare.TYPE_MEINIU;
};

mod_compare.cmpsamecardtype = function(card1,card2) {
    for (var x = 0; x < 5; ++x) {
        if (card1[4 - x]["p"] > card2[4 - x]["p"])
            return true;
        if(card1[4 - x]["p"] < card2[4 - x]["p"])
            return false;
    }

    for (var x = 0; x < 5; ++x) {
        if (card1[4 - x]["t"] > card2[4 - x]["t"])
            return true;
        if (card1[4 - x]["t"] < card2[4 - x]["t"])
            return false;
    }
    return false
};

mod_compare.compare = function(_card1,_card2){
    _card1 = mod_compare.cardsort(_card1);
    _card2 = mod_compare.cardsort(_card2);

    card1 = mod_compare.covertato1(_card1);
    card2 = mod_compare.covertato1(_card2);

    type1 = mod_compare.get_cardlisttype(card1);
    type2 = mod_compare.get_cardlisttype(card2);

    if(type1 > type2)
        return true;
    if(type1 == type2)
        return mod_compare.cmpsamecardtype(card1,card2);
    else
        return false;
};


mod_compare.isNiu = function(_card){
    var sum = 0;
    for(var i = 0;i<_card.length;i++){
        if(parseInt(_card[i]/10) >= 10){
            sum += 10;
            continue;
        }
        sum += parseInt(_card[i]/10);
    }
    if(sum !=0 && sum % 10 == 0 ){
        cc.log("true");
        return true;
    }
    cc.log("false");
    return false;
};
mod_compare.countNiu = function(_card){
    var niuCount = 0;
    for(var i = 0;i<_card.length;i++){
        if(parseInt(_card[i]/10) >= 10){
            niuCount += 10;
            continue;
        }
        niuCount += parseInt(_card[i]/10);
    }
    if(niuCount < 10){
        return mod_compare.TYPE_YOUNIU + niuCount;
    }
    niuCount = niuCount % 10;
    return mod_compare.TYPE_YOUNIU + niuCount;
};


mod_compare.tipsMeiNiu = function(_card){
    var result = [];
    return result;
};

mod_compare.tipsWHN_WXN = function(_card){
    var result = [];
    for(var i = 0;i<_card.length;i++){
        result.push(_card[i].card);
        if(result.length == 3){
            return result;
        }
    }
    return [];
};

mod_compare.tips4ZHA = function(_card){
    var result = [];
    var zha = 0;
    for(var i = 0;i<_card.length-1;i++){
        if(_card[i].p == _card[i+1].p){
            zha = _card[i].p;
            break;
        }
    }
    for(var i = 0;i<_card.length;i++){
        if(_card[i].p == zha){
            result.push(_card[i].card);
        }
        if(result.length == 3){
            return result;
        }
    }
    return [];
};
mod_compare.tipsGetTenCount = function(_card){
    var tenCount = 0;
    for(var i = 0;i<_card.length;i++){
        if(_card[i].p >= 10){
            tenCount++;
        }
    }
    return tenCount;
};
mod_compare.tipsNIUNIU = function(_card){
    var result = [];
    var tenCount = mod_compare.tipsGetTenCount(_card);

    if(tenCount == 1){
        var ten = false, h1 = false;
        for (var i = 0; i < _card.length; i++) {
            for (var j = 0; j < _card.length; j++) {
                if (_card[i].p >= 10 && !ten) {
                    result.push(_card[i].card);
                    ten = true;
                }
                if (_card[i].p + _card[j].p == 10 && i != j && !h1) {
                    result.push(_card[i].card);
                    result.push(_card[j].card);
                    h1 = true;
                }
                if (result.length == 3) {
                    return result;
                }
            }
        }
    }else{
        for (var x1 = 0; x1 < 3; ++x1)
            for (var x2 = x1+1; x2 < 4; ++x2)
                for (var x3 = x2+1; x3 < 5; ++x3)
                    if ((_card[x1].p + _card[x2].p + _card[x3].p) % 10 == 0) {
                        result.push(_card[x1].card);
                        result.push(_card[x2].card);
                        result.push(_card[x3].card);
                        return result;
                    }
    }

    return [];
};
mod_compare.tipsNIUCount = function(_card){
    var result = [];
    for (var x1 = 0; x1 < 3; ++x1)
        for (var x2 = x1+1; x2 < 4; ++x2)
            for (var x3 = x2+1; x3 < 5; ++x3)
                if ((_card[x1].p + _card[x2].p + _card[x3].p) % 10 == 0) {
                    result.push(_card[x1].card);
                    result.push(_card[x2].card);
                    result.push(_card[x3].card);
                    return result;
                }
};
mod_compare.tipsMeiNiu = function(_card){
    var result = [];
    result.push(_card[0].card);
    result.push(_card[1].card);
    result.push(_card[2].card);
    return result;
};
mod_compare.tipsNiu = function(_card) {
    cc.log(_card);
    var lst = [];
    _card = mod_compare.cardsort(_card);
    var cardObj = mod_compare.covertato1(_card);
    var type = mod_compare.get_cardlisttype(cardObj, lst);
    cc.log(type);
    var result = [];
    if(type == mod_compare.TYPE_MEINIU){
        result = mod_compare.tipsMeiNiu(cardObj);
    }else if(type == mod_compare.TYPE_WUXIAONIU || type == mod_compare.TYPE_WUHUANIU){
        result =  mod_compare.tipsWHN_WXN(cardObj);
    }else if(type == mod_compare.TYPE_4ZHA){
        result =  mod_compare.tips4ZHA(cardObj);
    }else if(type == mod_compare.TYPE_NIUNIU){
        result =  mod_compare.tipsNIUNIU(cardObj);
    }else if(type >90 && type < 100){
        result =  mod_compare.tipsNIUCount(cardObj);
    }else if(type == mod_compare.TYPE_MEINIU){
        result =  mod_compare.tipsMeiNiu(cardObj);
    }

    return result;
};


//cc.log(mod_compare.gettypestr(ts));