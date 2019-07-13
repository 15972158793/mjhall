/**
 * Created by yang on 2016/11/9.
 */

if(!g_will_room) {
    var g_will_room = 0;
}
if(!g_islogin) {
    var g_islogin = false;
}
if(!g_isgame) {
    var g_isgame = false;
}

if(!g_iscuopai) {
    var g_iscuopai = false;
}

if(!g_ShowBattery){
    var g_ShowBattery = true;
}

var gameclass = gameclass || {};

gameclass.game = cc.Class.extend({
    modmgr:null,
    uimgr:null,
    ctor:function () {
        this.init();
    }
});

gameclass.game.prototype.init = function(){
    this.modmgr = new gameclass.modmgr;
    this.uimgr = new gameclass.uimgr;
    this.modmgr.setgame(this);
    this.uimgr.setgame(this);
    gameclass.mod_platform.game = this;
};
gameclass.clone = function (obj) {
    var o;
    if (typeof obj == "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(gameclass.clone(obj[i]));
                }
            } else {
                o = {};
                for (var j in obj) {
                    o[j] = gameclass.clone(obj[j]);
                }
            }
        }
    } else {
        o = obj;
    }
    return o;
};
gameclass.getGameMainType = function (gameType) {
    var result = gameType;
    if(gameType == gameclass.gameszp_fk){
        result = gameclass.gameszp;
    }else if(gameType == gameclass.gamelzddz){
        result = gameclass.gameddz;
    }else if(gameType == gameclass.gamejxnn){
        result = gameclass.gameniuniu;
    }else if(gameType == gameclass.gamebrnys || gameType == gameclass.gamezynys || gameType == gameclass.gamegdnys || gameType == gameclass.gamesznys){
        result = gameclass.gamenys;
    }else if(gameType == gameclass.gamekwx1 || gameType == gameclass.gamekwx2 || gameType == gameclass.gamekwx3 || gameType == gameclass.gamekwx4 || gameType == gameclass.gamekwx5){
        result = gameclass.gamekwx;
    }
    return result;
}
/**
 * 根据游戏类型获取游戏名
 * @param gameType
 * @return {string}
 */
gameclass.getGameName = function (gameType) {
    gameType = gameclass.getGameMainType(gameType);
    var result = "";
    if(gameType == gameclass.gamekwx){
        result = staticString.gameKwxName;
    }else if(gameType == gameclass.gameszp){
        result = staticString.gamePszName;
    }else if(gameType == gameclass.gameniuniu){
        result = staticString.gameNnName;
    }else if(gameType == gameclass.gameddz){
        result = staticString.gameDdzName;
    }else if(gameType == gameclass.gamenys){
        result = staticString.gameNysName;
    }else if(gameType == gameclass.gameptj){
        result = staticString.gamePtjName;
    }else if(gameType == gameclass.gamettz){
        result = staticString.gameTtzName;
    }else if(gameType == gameclass.gamesdb){
        result = staticString.gameSdbName;
    }else if(gameType == gameclass.gamenxs){
        result = staticString.gameSlName;
    }
    return result;
};
gameclass.createbtnpress = function (node,name, endfunc,begin,cansel,data) {

    var btn = ccui.helper.seekWidgetByName(node, name);
    if(btn){
        return gameclass.createbtnpressSub(btn, endfunc,begin,cansel,data);

    }else{
        cc.log("btnbtn:"+name + " not found");
    }

};
gameclass.createbtnpressSub = function (btnNode, endfunc,begin,cansel,data) {
    var btnFunc = function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if (endfunc != null) {
                    endfunc(sender,type,data);
                }
                var child = btnNode.getChildByTag(1231);
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                if(child != null) {
                    child.setScale(1);
                }
                break;
            case ccui.Widget.TOUCH_BEGAN:
                if (begin != null){
                    begin(sender,type,data);
                }
                var child = btnNode.getChildByTag(1231);
                if(child != null) {
                    child.setScale(1.1);
                }
                break;
            case ccui.Widget.TOUCH_CANCELED:
                if (cansel != null){
                    cansel(sender,type,data);
                }
                var child = btnNode.getChildByTag(1231);
                if(child != null) {
                    child.setScale(1);
                }
                break;
        }
    };
    btnNode.addTouchEventListener(btnFunc);
    return btnNode;
};

//飘字提示
gameclass.showText=function(_str){
    var textBg=new cc.Sprite(res.tips_bg);
    textBg.setPosition(cc.winSize.width*0.5, cc.winSize.height*0.5);
    cc.director.getRunningScene().addChild(textBg, 100000);
    var label=new cc.LabelTTF(_str,"res/Font/FZY4JW_0569.TTF",30);
    label.setPosition(textBg.width*0.5, textBg.height*0.55);
    textBg.addChild(label);
    var ani = cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.05, 1, 1), cc.delayTime(0.6), cc.moveBy(0.6, 0, 150), cc.callFunc(function(sender) {
        textBg.removeFromParent(true);
    }));
    textBg.runAction(ani);
    //textBg.scheduleOnce(function(){
    //    textBg.removeFromParent(true);
    //},1)
};

//艺术字体飘分  type可以缩放
gameclass.showYSText = function(_score,_startPos,_parentNode,type){
    var node = new gameclass.piaofen(_score);
    if(type==1){
        node.setScale(0.7);
    }
    node.setPosition(_startPos);
    _parentNode.addChild(node);
    node.runAction(cc.sequence(cc.delayTime(1),cc.moveBy(0.5,cc.p(0,50)),cc.callFunc(function(sender){
        sender.removeFromParent(true);
        sender = null;
    })))
};
gameclass.showFSText = function(_score,_startPos,_parentNode,type){
    var node = new gameclass.piaofen(_score);
    var baseScale = 1.0;
    if(1 == type){
        baseScale = 0.7
    }else if(2 == type){
        baseScale = 0.5;
    }
    var actScale = baseScale + 0.1;
    node.setScale(baseScale);
    node.setPosition(_startPos);
    _parentNode.addChild(node);
    node.runAction(cc.sequence(cc.delayTime(0.8),cc.scaleTo(0.15, actScale, actScale),
        cc.scaleTo(0.15, baseScale, baseScale),cc.callFunc(function(sender){
            sender.removeFromParent(true);
            sender = null;
        })))
};
//开局动画
gameclass.showStartAnim = function(_parentNode){
    var node = new gameclass.startAnim();
    node.setPosition(1136/2,320);
    _parentNode.addChild(node);
};

//转换金钱显示模式
gameclass.changeShow = function(_money){
    if(_money >= 10000){
        return (_money - _money%1000)/10000 + "万";
    }
    return _money;
};

//本地存储
gameclass.saveLocalData = function(_saveName,_obj){
    var obj = JSON.stringify(_obj);
    cc.sys.localStorage.setItem(_saveName,_obj);
};

//本地取
gameclass.getLocalData = function(_saveName){
    var data = cc.sys.localStorage.getItem(_saveName);
    if(!data){
        return null;
    }else{
        return JSON.parse(data);
    }
};

(function(){
    var BASE64_MAPPING = [
        'A','B','C','D','E','F','G','H',
        'I','J','K','L','M','N','O','P',
        'Q','R','S','T','U','V','W','X',
        'Y','Z','a','b','c','d','e','f',
        'g','h','i','j','k','l','m','n',
        'o','p','q','r','s','t','u','v',
        'w','x','y','z','0','1','2','3',
        '4','5','6','7','8','9','+','/'
    ];

    /**
     *ascii convert to binary
     */
    var _toBinary = function(ascii){
        var binary = new Array();
        while(ascii > 0){
            var b = ascii%2;
            ascii = Math.floor(ascii/2);
            binary.push(b);
        }
        /*
         var len = binary.length;
         if(6-len > 0){
         for(var i = 6-len ; i > 0 ; --i){
         binary.push(0);
         }
         }*/
        binary.reverse();
        return binary;
    };

    /**
     *binary convert to decimal
     */
    var _toDecimal  = function(binary){
        var dec = 0;
        var p = 0;
        for(var i = binary.length-1 ; i >= 0 ; --i){
            var b = binary[i];
            if(b == 1){
                dec += Math.pow(2 , p);
            }
            ++p;
        }
        return dec;
    };

    /**
     *unicode convert to utf-8
     */
    var _toUTF8Binary = function(c , binaryArray){
        var mustLen = (8-(c+1)) + ((c-1)*6);
        var fatLen = binaryArray.length;
        var diff = mustLen - fatLen;
        while(--diff >= 0){
            binaryArray.unshift(0);
        }
        var binary = [];
        var _c = c;
        while(--_c >= 0){
            binary.push(1);
        }
        binary.push(0);
        var i = 0 , len = 8 - (c+1);
        for(; i < len ; ++i){
            binary.push(binaryArray[i]);
        }

        for(var j = 0 ; j < c-1 ; ++j){
            binary.push(1);
            binary.push(0);
            var sum = 6;
            while(--sum >= 0){
                binary.push(binaryArray[i++]);
            }
        }
        return binary;
    };

    var __BASE64 = {
        /**
         *BASE64 Encode
         */
        encoder:function(str){
            var base64_Index = [];
            var binaryArray = [];
            for(var i = 0 , len = str.length ; i < len ; ++i){
                var unicode = str.charCodeAt(i);
                var _tmpBinary = _toBinary(unicode);
                if(unicode < 0x80){
                    var _tmpdiff = 8 - _tmpBinary.length;
                    while(--_tmpdiff >= 0){
                        _tmpBinary.unshift(0);
                    }
                    binaryArray = binaryArray.concat(_tmpBinary);
                }else if(unicode >= 0x80 && unicode <= 0x7FF){
                    binaryArray = binaryArray.concat(_toUTF8Binary(2 , _tmpBinary));
                }else if(unicode >= 0x800 && unicode <= 0xFFFF){//UTF-8 3byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(3 , _tmpBinary));
                }else if(unicode >= 0x10000 && unicode <= 0x1FFFFF){//UTF-8 4byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(4 , _tmpBinary));
                }else if(unicode >= 0x200000 && unicode <= 0x3FFFFFF){//UTF-8 5byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(5 , _tmpBinary));
                }else if(unicode >= 4000000 && unicode <= 0x7FFFFFFF){//UTF-8 6byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(6 , _tmpBinary));
                }
            }

            var extra_Zero_Count = 0;
            for(var i = 0 , len = binaryArray.length ; i < len ; i+=6){
                var diff = (i+6)-len;
                if(diff == 2){
                    extra_Zero_Count = 2;
                }else if(diff == 4){
                    extra_Zero_Count = 4;
                }
                //if(extra_Zero_Count > 0){
                //	len += extra_Zero_Count+1;
                //}
                var _tmpExtra_Zero_Count = extra_Zero_Count;
                while(--_tmpExtra_Zero_Count >= 0){
                    binaryArray.push(0);
                }
                base64_Index.push(_toDecimal(binaryArray.slice(i , i+6)));
            }

            var base64 = '';
            for(var i = 0 , len = base64_Index.length ; i < len ; ++i){
                base64 += BASE64_MAPPING[base64_Index[i]];
            }

            for(var i = 0 , len = extra_Zero_Count/2 ; i < len ; ++i){
                base64 += '=';
            }
            return base64;
        },
        /**
         *BASE64  Decode for UTF-8
         */
        decoder : function(_base64Str){
            var _len = _base64Str.length;
            var extra_Zero_Count = 0;
            /**
             *计算在进行BASE64编码的时候，补了几个0
             */
            if(_base64Str.charAt(_len-1) == '='){
                //alert(_base64Str.charAt(_len-1));
                //alert(_base64Str.charAt(_len-2));
                if(_base64Str.charAt(_len-2) == '='){//两个等号说明补了4个0
                    extra_Zero_Count = 4;
                    _base64Str = _base64Str.substring(0 , _len-2);
                }else{//一个等号说明补了2个0
                    extra_Zero_Count = 2;
                    _base64Str = _base64Str.substring(0 , _len - 1);
                }
            }

            var binaryArray = [];
            for(var i = 0 , len = _base64Str.length; i < len ; ++i){
                var c = _base64Str.charAt(i);
                for(var j = 0 , size = BASE64_MAPPING.length ; j < size ; ++j){
                    if(c == BASE64_MAPPING[j]){
                        var _tmp = _toBinary(j);
                        /*不足6位的补0*/
                        var _tmpLen = _tmp.length;
                        if(6-_tmpLen > 0){
                            for(var k = 6-_tmpLen ; k > 0 ; --k){
                                _tmp.unshift(0);
                            }
                        }
                        binaryArray = binaryArray.concat(_tmp);
                        break;
                    }
                }
            }

            if(extra_Zero_Count > 0){
                binaryArray = binaryArray.slice(0 , binaryArray.length - extra_Zero_Count);
            }

            var unicode = [];
            var unicodeBinary = [];
            for(var i = 0 , len = binaryArray.length ; i < len ; ){
                if(binaryArray[i] == 0){
                    unicode=unicode.concat(_toDecimal(binaryArray.slice(i,i+8)));
                    i += 8;
                }else{
                    var sum = 0;
                    while(i < len){
                        if(binaryArray[i] == 1){
                            ++sum;
                        }else{
                            break;
                        }
                        ++i;
                    }
                    unicodeBinary = unicodeBinary.concat(binaryArray.slice(i+1 , i+8-sum));
                    i += 8 - sum;
                    while(sum > 1){
                        unicodeBinary = unicodeBinary.concat(binaryArray.slice(i+2 , i+8));
                        i += 8;
                        --sum;
                    }
                    unicode = unicode.concat(_toDecimal(unicodeBinary));
                    unicodeBinary = [];
                }
            }
            return unicode;
        }
    };

    gameclass.base64 = __BASE64;
})();

