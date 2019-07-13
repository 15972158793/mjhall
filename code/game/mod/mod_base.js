/**
 * Created by my on 2016/4/12.
 */

gameclass.servertype = 1;//1正式服 2测试服
gameclass.clientver = 3000;
gameclass.version = "v3.0.6";

gameclass.gameniuniu = 1;
gameclass.gameddz = 6;
gameclass.gameszp = 7;
gameclass.gameszp_fk = 25;
gameclass.gamelzddz = 8;
gameclass.gamesdb = 10;
gameclass.gamechg = 11;//吃火锅（没用到）
gameclass.gamettz = 17;
gameclass.gameptj = 19;
gameclass.gamenxs = 36;//扫雷
gameclass.gamejxnn = 16;//江西牛牛
gameclass.gamenys = 65;//牛元帅  看牌上庄
gameclass.gamekwx = 2;  //孝感卡五星
gameclass.gamekwx1 = 3; //襄阳卡五星
gameclass.gamekwx2 = 4; //十堰卡五星
gameclass.gamekwx3 = 5; //随州卡五星
gameclass.gamekwx4 = 13;    //宜城卡五星
gameclass.gamekwx5 = 14;    //应城卡五星
gameclass.gamewzq = 77; //五子棋
gameclass.gamebrnys = 66;//牛元帅 8人明牌抢庄
gameclass.gamezynys = 67;//牛元帅 自由抢庄
gameclass.gamegdnys = 68;//牛元帅 固定庄家
gameclass.gamesznys = 69;//牛元帅 牛牛上庄
gameclass.gamepdkjd = 100;//跑得快经典
gameclass.gamepdk15 = 101;//跑得快15张玩法
gameclass.gamepdklz = 102;//跑得快癞子玩法
gameclass.gameszpbaofang = 1000; //三张牌包厢
gameclass.gameTBBF = 2000; //! 骰宝包房
gameclass.gamegoldkwx = 10000; //卡五星大于等于10000，小于20000
gameclass.gamegoldszp = 20000; //卡五星大于等于20000，小于30000
gameclass.gameGoldNiu = 30000;
gameclass.gameBZW = 40000;
gameclass.gamegoldPtj = 50000;
gameclass.gamegoldEBG = 60000;
gameclass.gamegoldTTZ = 70000;
gameclass.gamegoldPDK = 80000;//金币场跑得快
gameclass.gamegoldsxdb = 90000;//金币场名品汇
gameclass.gamegoldLHD = 100001;//龙虎斗
gameclass.gamegoldYYBF = 110001;//一夜暴富
gameclass.gamegoldYSZ = 120000;//摇塞子
gameclass.gamegoldRacing = 130001;//! 赛马
gameclass.gamegoldTB = 140000140000;//! 单双
gameclass.gameToubao = 140000;//! 骰宝
gameclass.gameDragon = 160000;//龙珠探宝
gameclass.gameDxtb = 170000;//地穴探宝
gameclass.gameFpj = 180000;//! 翻牌机
gameclass.gamepdk = 78;//! 房卡跑的快
gameclass.gameFish = 250000;//! 3D捕鱼

gameclass.mapinfo = null;
gameclass.battery = 100;
gameclass.area = 0; //! 地区

gameclass.ruleLocalStorageHead = "yypklastStorage";

var setservertype = function (type) {
    gameclass.servertype = type;
    if (gameclass.servertype == 1) {
        // gameclass.baseurl = "jyqp.hbyouyou.com:8031";
        gameclass.baseurl = "asyl.190youxi.com:8031";
        // gameclass.baseurl = "jyqp.hbyouyou.com:8031";
         //gameclass.baseurl = "192.168.0.110:8031";
        gameclass.imgurl = "image.hbyouyou.com/youyou.image/Index/proxyIcon";
    } else if (gameclass.servertype == 2) {
        // gameclass.baseurl = "120.26.163.168:2031";
        //gameclass.baseurl = "120.26.163.168:3031";
         gameclass.baseurl = "asyl.190youxi.com:8031";
        //gameclass.baseurl = "120.24.215.214:3331";
        //gameclass.baseurl = "192.168.0.109:8031";
        //gameclass.baseurl = "qjb.syot.cn:8031";
        // gameclass.baseurl = "192.168.1.235:8031";
        //gameclass.baseurl = "192.168.0.110:8031";
        gameclass.imgurl = "image.hbyouyou.com/youyou.image/Index/proxyIcon";
    }
};
setservertype(gameclass.servertype);

gameclass.mod_base = cc.Class.extend({
    data: null,
    game: null,
    ctor: function () {
        this._super();
    },
    setgame: function (_game) {
        this.game = _game;
    },
});

gameclass.mod_base.prototype.getver = function (head, data, func, clientdata) {
    var response = {"msghead": head, "msgdata": JSON.stringify(data)};
    var jsonData = JSON.stringify(response);
    //cc.log(jsonData);
    var _this = this;
    PostURL("http://" + gameclass.baseurl + "/versionmsg", "", function (str) {
        //cc.log(str);
        if (func != null) {
            var serverver = Number(str);

            if (serverver < gameclass.clientver) {

            }
            func(serverver < gameclass.clientver, clientdata);

        }
        // {"msghead":"login","msgsign":"","msgdata":"{\"openid\":\"0f7c62d9876a875f0a60503319b3b8e0\",\"name\":\"游客\",\"imgurl\":\"\",\"card\":8,\"ip\":\"\",\"room\":0}"}
        //{"msghead":"login","msgsign":"","msgdata":"{\"openid\":\"0f7c62d9876a875f0a60503319b3b8e0\",\"name\":\"游客\",\"imgurl\":\"\",\"card\":7,\"ip\":\"http://120.24.215.214:8091/servermsg\",\"room\":150005}"}
    });
};

gameclass.mod_base.prototype.sendhttp = function (head, data, func) {
    var response = {"msghead": head, "msgdata": JSON.stringify(data)};
    var jsonData = JSON.stringify(response);
    cc.log("sendHttp::::::" + jsonData);
    var _this = this;
    // LA 20161213 网络延时
    var timesend = ((new Date()).valueOf()).toString();
    PostURL("http://" + gameclass.baseurl + "/loginmsg?" + encodeURI("msgdata=" + jsonData), "", function (str) {
        // 网络延时
        gameclass.delaytime = ((new Date()).valueOf()).toString() - timesend;
        //cc.log(str);
        if (func != null) {
            var recvdata = JSON.parse(str);
            var msgsign = JSON.parse(recvdata.msgsign);
            if (msgsign.encode && msgsign.encode == 1) {
                var data = new Uint8Array(BASE64.decoder(recvdata.msgdata));
                recvdata.msgdata = Bytes2Str(pako.inflate(data));
                //cc.log("httpRespon::::::" + recvdata.msgdata);
            }
            if (recvdata.msghead == "err") {
                _this.game.uimgr.showload(false);
                _this.game.uimgr.showui("gameclass.msgboxui");
                var data = JSON.parse(recvdata.msgdata);
                if (data.info.toString() == "当前版本号过低，请下载最新版本进行游戏") {
                    _this.game.uimgr.uis["gameclass.msgboxui"].setString(data.info, function () {
                        gameclass.mod_platform.openurl(gameclass.download);
                    });
                } else {
                    _this.game.uimgr.uis["gameclass.msgboxui"].setString(data.info);
                }
            } else if(recvdata.msghead == "updcard") {
                cc.log("http:::updcard");
                var data = JSON.parse(recvdata.msgdata);
                _this.game.modmgr.mod_login.setLoginData(data.card - data.gold, data.gold)
            } else {
                func(JSON.parse(recvdata.msgdata), "", recvdata);
            }
        }
        // {"msghead":"login","msgsign":"","msgdata":"{\"openid\":\"0f7c62d9876a875f0a60503319b3b8e0\",\"name\":\"游客\",\"imgurl\":\"\",\"card\":8,\"ip\":\"\",\"room\":0}"}
        //{"msghead":"login","msgsign":"","msgdata":"{\"openid\":\"0f7c62d9876a875f0a60503319b3b8e0\",\"name\":\"游客\",\"imgurl\":\"\",\"card\":7,\"ip\":\"http://120.24.215.214:8091/servermsg\",\"room\":150005}"}
    }, null, function (str) {
        _this.game.uimgr.showui("gameclass.msgboxui");
        _this.game.uimgr.uis["gameclass.msgboxui"].setString("网络连接失败,请检查网络是否通畅");
    });
};

gameclass.mod_base.loadicon = function (url, callback, target) {

    if (!cc.sys.isNative) {
        //http://120.24.215.214:9999/getimage?image=aHR0cDovL3d4LnFsb2dvLmNuL21tb3Blbi9GWmNUUHA2UDRnbEN3OHRHWnJpYWljSGljUFBheU5RM2daRTYzVWxjWWlhdVdHcnViaWNhSVpkWkRyN1RHNEtIaWJFaWNLbFZQOThiSzgxWkpldWlhRVFreGF6dlZrNXo5U290cmlja2ljLzA=
        //url = "http://" + gameclass.imgurl  + "/getimage?size=96&img=" + gameclass.base64.encoder(url);
        if (gameclass.servertype == 1) {
            url = "http://" + gameclass.imgurl + "/getimage?size=96x96&img=" + encodeURI(url);
        } else if (gameclass.servertype == 2) {
            url = "res/im_headbg4.png";//"http://" + gameclass.imgurl  + "/getimage?img=" + gameclass.base64.encoder(url);
        }

    }
    else {

    }
    target.retain();
    // cc.log("mod_base.loadicon");
    cc.loader.loadImg(url, {isCrossOrigin: true}, function (res, tex) {
        // cc.log("download ok");

        //cc.log("res:" + typeof(res));
        //cc.log("tex:" + typeof(tex));
        if (typeof(tex) != "undefined" && tex != null && callback != null) {

            if (!cc.sys.isNative) {
                var texture2d = new cc.Texture2D();
                texture2d.initWithElement(tex);
                texture2d.handleLoadedTexture();

                callback(texture2d, target);
            }
            else {
                callback(tex, target);
            }

            //cc.textureCache.removeTexture(tex);
        } else if (typeof(res) != "undefined") {
            cc.log("res:" + res);
        }
        target.release();
        //cc.textureCache.removeTexture(tex);

    });
};

gameclass.mod_base.cliper = function (name) {
    //创建一个遮罩的模板
    var sten = new cc.Sprite();
    sten.initWithFile(name);
    //创建一个ClippingNode 并设置一些基础属性 容器宽高与模板有关
    var clipnode = new cc.ClippingNode();
    clipnode.attr({
        stencil: sten,
        anchorX: 0.5,
        anchorY: 0.5,
        alphaThreshold: 0.8,//设置裁剪透明值阀值 默认值为1 等于1時 alpha = 0的部分也被裁剪
    });
    clipnode.setCascadeOpacityEnabled(true);
    clipnode.setPosition(cc.p(sten.getContentSize().width, sten.getContentSize().height));
    return clipnode;
};

//精灵变灰函数
gameclass.mod_base.createGraySprite = function (sprite, texture) {
//判断运行的平台是不是浏览器
    var isHtml5 = (typeof document !== 'undefined');

    if (isHtml5) {
        // cc.log("isHtml5");
        var canvas = document.createElement('canvas');
        var image = texture.getHtmlElementObj();

//将图片的高宽赋值给画布
        canvas.width = image.width;
        canvas.height = image.height;

//获得二维渲染上下文
        if (canvas.getContext) {//为了安全起见，先判断浏览器是否支持canvas
            var context = canvas.getContext("2d");
            context.drawImage(image, 0, 0);//将得到的image图像绘制在canvas对象中
            var canvasData = context.getImageData(0, 0, canvas.width, canvas.height);//返回ImageData对象


// 填充灰色【读取像素值和实现灰度计算】
            for (var x = 0; x < canvasData.width; x++) {
                for (var y = 0; y < canvasData.height; y++) {
// Index of the pixel in the array
                    var idx = (x + y * canvasData.width) * 4;
                    var r = canvasData.data[idx + 0];
                    var g = canvasData.data[idx + 1];
                    var b = canvasData.data[idx + 2];
// 灰度的计算
                    var gray = .299 * r + .587 * g + .114 * b;
// assign gray scale value
                    canvasData.data[idx + 0] = gray; // Red channel
                    canvasData.data[idx + 1] = gray; // Green channel
                    canvasData.data[idx + 2] = gray; // Blue channel
//canvasData.data[idx + 3] = 255; // Alpha channel
// 新增黑色边框
                    if (x < 8 || y < 8 || x > (canvasData.width - 8) || y > (canvasData.height - 8)) {
                        canvasData.data[idx + 0] = 0;
                        canvasData.data[idx + 1] = 0;
                        canvasData.data[idx + 2] = 0;
                    }
                }
            }
            context.putImageData(canvasData, 0, 0); // 处理完成的数据重新载入到canvas二维对象中


            var tempTexture = new cc.Texture2D();
            tempTexture.initWithElement(canvas);
            tempTexture.handleLoadedTexture();

            sprite.initWithTexture(tempTexture);
            return;
        }
    }

//使用shader方式实现图片变灰（适用于app和浏览器不支持canvas的情况）
    if (!cc.GLProgram.createWithByteArrays) {
        cc.GLProgram.createWithByteArrays = function (vert, frag) {
            var shader = new cc.GLProgram();
            shader.initWithVertexShaderByteArray(vert, frag);
            shader.link();
            shader.updateUniforms();
            setTimeout(function () {
                shader.link();
                shader.updateUniforms();
            }, 0);
            return shader;
        }
    }


    var SHADER_POSITION_GRAY_FRAG =
        "varying vec4 v_fragmentColor;\n" +
        "varying vec2 v_texCoord;\n" +
        (isHtml5 ? "uniform sampler2D CC_Texture0;\n" : "") +
        "void main()\n" +
        "{\n" +
        "    vec4 v_orColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n" +
        "    float gray = dot(v_orColor.rgb, vec3(0.299, 0.587, 0.114));\n" +
        "    gl_FragColor = vec4(gray, gray, gray, v_orColor.a);\n" +
        "}\n";


    var SHADER_POSITION_GRAY_VERT =
        "attribute vec4 a_position;\n" +
        "attribute vec2 a_texCoord;\n" +
        "attribute vec4 a_color;\n" +
        "\n" +
        "varying vec4 v_fragmentColor;\n" +
        "varying vec2 v_texCoord;\n" +
        "\n" +
        "void main()\n" +
        "{\n" +
        "gl_Position = " + (isHtml5 ? "(CC_PMatrix * CC_MVMatrix)" : "CC_PMatrix") + " * a_position;\n" +
        "v_fragmentColor = a_color;\n" +
        "v_texCoord = a_texCoord;\n" +
        "}";


    sprite.initWithTexture(texture);
    var shader = cc.GLProgram.createWithByteArrays(SHADER_POSITION_GRAY_VERT, SHADER_POSITION_GRAY_FRAG);
    shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
    shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
    shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
    sprite.setShaderProgram(shader);
    cc.log("setShaderProgram");
};

gameclass.mod_base.showtximg = function (perent, url, x, y, name, gray) {
    if (url == "") {
        //url = "res/HelloWorld.png";
        url = "http://wx.qlogo.cn/mmopen/FZcTPp6P4glCw8tGZriaicHicPPayNQ3gZE63UlcYiauWGrubicaIZdZDr7TG4KHibEicKlVP98bK81ZJeuiaEQkxazvVk5z9Sotrickic/0";
    }
    if (!name) {
        name = "im_headbg2";
    }
    if (!gray) {
        gray = false;
    }
    var clipnode = gameclass.mod_base.cliper("res/" + name + ".png");

    //clipnode.setPosition(cc.p(37,37));

    if(perent.getChildByTag(1231)){
        perent.removeChildByTag(1231);
    }
    perent.addChild(clipnode);
    clipnode.setTag(1231);
    clipnode.setAnchorPoint(cc.p(0, 0));
    var bo2 = new cc.Sprite();//(mod_base.userdata.photo);
    gameclass.mod_base.loadicon(url, function (tex, target) {
        var size = tex.getContentSize();
        bo2.setScale(perent.getContentSize().width / size.width);
        if (gray) {
            gameclass.mod_base.createGraySprite(target, tex);
        } else {
            target.initWithTexture(tex);
        }


        bo2.setAnchorPoint(cc.p(0.5, 0.5));
        bo2.setPosition(cc.p(0, 0));

        if (x != null) {
            clipnode.setPosition(cc.p(perent.getContentSize().width / 2 + x, perent.getContentSize().height / 2 + y));
        } else {
            clipnode.setPosition(cc.p(perent.getContentSize().width / 2, perent.getContentSize().height / 2));
        }


    }, bo2);
    bo2.setAnchorPoint(cc.p(0.5, 0.5));
    bo2.setPosition(cc.p(0, 0));
    //bo2.setScale(perent.getContentSize().width / bo2.getContentSize().width);

    clipnode.addChild(bo2);

    return clipnode;
};


