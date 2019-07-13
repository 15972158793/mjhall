/**
 * Created by yang on 2016/11/11.
 */

gameclass.mod_platform = {};
gameclass.mod_platform.game = null;

gameclass.mod_platform.loginwx = function(){

    if (!cc.sys.isNative) {
    }
    else{

        if (cc.sys.os == cc.sys.OS_WINDOWS) {

        }else if(cc.sys.os == sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "loginwx", "(Ljava/lang/String;)V", "");

        }else if(cc.sys.os == sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", "LoginWx");
        }
        else
        {

        }
    }
};

gameclass.mod_platform.startmap = function(){
    if (!cc.sys.isNative) {
    }
    else{
        if (cc.sys.os == cc.sys.OS_WINDOWS) {

        }else if(cc.sys.os == sys.OS_ANDROID){
        }else if(cc.sys.os == sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", "StartMap");
        }
        else
        {

        }
    }
};

gameclass.mod_platform.getmapinfo = function(){
    if (!cc.sys.isNative) {
        return "";
    }
    else{
        if(gameclass.test == "true") {
            return "";
        }

        if(cc.sys.os == sys.OS_ANDROID){
            return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "getMapInfo", "()Ljava/lang/String;");
        }else if(cc.sys.os == sys.OS_IOS){
            return jsb.reflection.callStaticMethod("NativeOcClass", "getMapInfo");
        }
    }

    return "";
};


gameclass.mod_platform.sendGetBattery = function(){
    if (cc.sys.os == cc.sys.OS_WINDOWS) {

    }else if(cc.sys.os == cc.sys.OS_ANDROID){
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "getBattery", "()V");
    }else if(cc.sys.os == sys.OS_IOS){
        jsb.reflection.callStaticMethod("NativeOcClass", "getBattery");
    }
    else
    {

    }
};

gameclass.mod_platform.getBattery = function(_num){
    gameclass.battery = _num;
    //gameclass.mod_platform.game.uimgr.showui("gameclass.msgboxui");
    //gameclass.mod_platform.game.uimgr.showui("gameclass.msgboxui").setString("电量:"+ gameclass.battery);

    if(!g_isgame) return;
    var mod_game = gameclass.mod_platform.game.modmgr.mod_login.getfirstgame();
    var node = mod_game.view.node;
    if(g_ShowBattery){
        var dianchi = ccui.helper.seekWidgetByName(node,"dianchi");
        dianchi.setPercent(_num);
    }
};

gameclass.mod_platform.invitefriend = function(txt,roomId,title){
    //cc.log(txt,roomId,title);
    if (!cc.sys.isNative) {
        gameclass.mod_platform.wxshare(txt,roomId,title);
    }
    else{

        if (cc.sys.os == cc.sys.OS_WINDOWS) {

        }else if(cc.sys.os == sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "InviteFriend", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", txt.toString(),roomId.toString(),title.toString());

        }else if(cc.sys.os == sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", "Invite:Roomid:Title:", txt.toString(),roomId.toString(),title.toString());
            //jsb.reflection.callStaticMethod("NativeOcClass", "callNativeUIWithTitle:andContent:", "cocos2d-js", jsb.fileUtils.getWritablePath());
        }
        else
        {

        }
    }

};
gameclass.mod_platform.onMessaegResp=function (transaction) {
    if(this.game.modmgr.isClickPYQ){
        this.game.modmgr.mod_center.shareOkCallBack();
        if(ccui.helper.seekWidgetByName(this.game.uimgr.uis["gameclass.hallui"].node,"showShareImg")){
            ccui.helper.seekWidgetByName(this.game.uimgr.uis["gameclass.hallui"].node,"showShareImg").setVisible(true);
        }
    }
};
gameclass.mod_platform.invitefriendSpoons = function(txt,roomId,title){
    this.game.modmgr.isClickPYQ=true;
    if (!cc.sys.isNative) {
        gameclass.mod_platform.wxshare(txt,roomId,title);
    }
    else{

        if (cc.sys.os == cc.sys.OS_WINDOWS) {

        }else if(cc.sys.os == sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "InviteFriendSpoons", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", txt.toString(),roomId.toString(),title.toString());

        }else if(cc.sys.os == sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", "InviteSpoons:Roomid:Title:", txt.toString(),roomId.toString(),title.toString());
        }
        else
        {

        }
    }
};

gameclass.mod_platform.begmic = function(){
    if (!cc.sys.isNative) {
    }
    else {

        if (cc.sys.os == cc.sys.OS_WINDOWS) {

        }else if(cc.sys.os == sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "BeginMic", "(Ljava/lang/String;)V",jsb.fileUtils.getWritablePath() );

        }else if(cc.sys.os == sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", "BegMic");
        }
        else
        {

        }
    }
};

gameclass.mod_platform.endmic = function(){
    if (!cc.sys.isNative) {
    }
    else{

        if (cc.sys.os == cc.sys.OS_WINDOWS) {

        }else if(cc.sys.os == sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "EndMic", "(Ljava/lang/String;)V",jsb.fileUtils.getWritablePath());

        }else if(cc.sys.os == sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", "EndMic");
        }
        else
        {

        }
    }
};

gameclass.mod_platform.cancelmic = function(){
    if (!cc.sys.isNative) {
    }
    else{

        if (cc.sys.os == cc.sys.OS_WINDOWS) {

        }else if(cc.sys.os == sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "CancelMic", "(Ljava/lang/String;)V",jsb.fileUtils.getWritablePath());

        }else if(cc.sys.os == sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", "CancelMic");
        }
        else
        {

        }
    }
};

gameclass.mod_platform.savescreen = function(callfunc){

    if (!cc.sys.isNative) {

        var _winSize = cc.director.getWinSize();
        cc.log("web images saved!");
        cc.log(_winSize.width, _winSize.height);
       /* var target = new cc.RenderTexture(winSize.width, winSize.height,cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
        target.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        target.beginWithClear(0, 0, 0, 0);
        target.begin();
        cc.director.getRunningScene().visit();
        target.end();*/
        /*var gameCanvas = document.getElementById("gameCanvas");
        var c22 = document.getElementById("gameCanvas2");
        var c2 = c22.getContext("2d");
        var gl = gameCanvas.getContext("webgl");

        var pixels = new Uint8ClampedArray(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
        gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

        var imagedata = c2.createImageData(gl.drawingBufferWidth, gl.drawingBufferHeight);
        imagedata.data = pixels;
        c2.putImageData(imagedata,110,110);*/
        //console.log(pixels); // Uint8Array

        //var e = target._texture.getHtmlElementObj();


        /*var webgl = gameCanvas.getContext('webgl');
        var data =   webgl.getImageData(0,0,500,500);
        var imgstr =  target._texture.image;*/
        var gameCanvas = document.getElementById("gameCanvas");
        var lins = null;
        var savescene = function(){
            cc.eventManager.removeListener(lins);

            //if(ondrawover){
            //    ondrawover();
            //}

            var imgstr= gameCanvas.toDataURL("image/png");

            var data = {"imgstr":imgstr};
            PostURL("http://game.hbyouyou.com/youyou.image/Index/uploadBase64Image",JSON.stringify(data), function (url) {
                //PostURL("http://192.168.0.110:9900/Index/uploadBase64Image",JSON.stringify(data), function (url) {
                if(callfunc != null){
                    callfunc(url)
                }
            });
        };
        lins = cc.eventManager.addCustomListener(cc.Director.EVENT_AFTER_DRAW, savescene);
    }
    else{

        var winSize = cc.director.getWinSize();

        var target = new cc.RenderTexture(winSize.width, winSize.height,cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
        target.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        //target.beginWithClear(0, 0, 0, 0);
        target.begin();
        cc.director.getRunningScene().visit();
        target.end();

        var path = "share.jpg";
        target.saveToFile(path, cc.IMAGE_FORMAT_JPEG);
        cc.log("images saved!");

        var act = cc.sequence(cc.delayTime(1.1),cc.callFunc(function(){

            if (cc.sys.os == cc.sys.OS_WINDOWS) {

            }else if(cc.sys.os == sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "SharePic", "(Ljava/lang/String;)V",jsb.fileUtils.getWritablePath() + path );

            }else if(cc.sys.os == sys.OS_IOS){
                jsb.reflection.callStaticMethod("NativeOcClass", "Share:",jsb.fileUtils.getWritablePath() + path );
                //jsb.reflection.callStaticMethod("NativeOcClass", "callNativeUIWithTitle:andContent:", "cocos2d-js", jsb.fileUtils.getWritablePath());
            }
            else
            {

            }
        }));

        cc.director.getRunningScene().runAction(act);

    }

};

gameclass.mod_platform.onlogin = function(code){

    cc.log("gameclass.mod_platform.onlogin");
    game.modmgr.mod_login.wxlogin(code, true);

};

gameclass.mod_platform.guestlogin = function(code){

    cc.log("gameclass.mod_platform.guestlogin");
    game.modmgr.mod_login.guestlogin(code);

};

gameclass.mod_platform.buy = function(){

    if (!cc.sys.isNative) {
    }
    else{

        if (cc.sys.os == cc.sys.OS_WINDOWS) {

        }else if(cc.sys.os == sys.OS_ANDROID){
            //jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "EndMic", "(Ljava/lang/String;)V",jsb.fileUtils.getWritablePath());

        }else if(cc.sys.os == sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", "Buy");
        }
        else
        {

        }
    }

};

gameclass.mod_platform.onbuy = function(receipt){
    gameclass.mod_platform.game.modmgr.mod_center.iospay(receipt);
};

gameclass.mod_platform.onlog = function(log){
    gameclass.mod_platform.game.uimgr.showui("gameclass.msgboxui");
    gameclass.mod_platform.game.uimgr.uis["gameclass.msgboxui"].setString(log);
};

gameclass.mod_platform.wxshare = function(txt,roomId,title){
    if(window.wx){
        //cc.log(txt);
        //cc.log(roomId);
        //cc.log(title);
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: txt, // 分享描述
            link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2fbe386ef7a40b08&redirect_uri=http%3a%2f%2fcentre.hbyouyou.com%2fUser%2floginNiuniu&response_type=code&scope=snsapi_userinfo&connect_redirect=1#wechat_redirect', // 分享链接
            imgUrl: 'http://game.hbyouyou.com/niuniu/icon.png', // 分享图标

        });
    }
};

gameclass.mod_platform.wxsharelink = function(txt,title,link){
    if(window.wx){

        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: txt, // 分享描述
            link: link, // 分享链接
            imgUrl: 'http://game.hbyouyou.com/niuniu/icon.png', // 分享图标

        });
    }
};


gameclass.mod_platform.openurl = function(url){
    if (!cc.sys.isNative) {
    }
    else {
        cc.Application.getInstance().openURL(url);
    }
};

gameclass.mod_platform.pertocpp = function(){

    if (!cc.sys.isNative) {
    }
    else{

        if (cc.sys.os == cc.sys.OS_WINDOWS) {

        }else if(cc.sys.os == sys.OS_ANDROID){
            //jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "Pertocpp", "(Ljava/lang/String;)V",jsb.fileUtils.getWritablePath());

        }else if(cc.sys.os == sys.OS_IOS){
            //jsb.reflection.callStaticMethod("NativeOcClass", "callNativeUIWithTitle:andContent:", "cocos2d-js", jsb.fileUtils.getWritablePath());
            jsb.reflection.callStaticMethod("NativeOcClass", "Pertocpp");
        }
        else
        {

        }
    }

};

gameclass.mod_platform.upsoundok = function(url){

    if(gameclass.mod_platform.game){
        var mod_game = gameclass.mod_platform.game.modmgr.mod_login.getfirstgame();
        if(mod_game){
            mod_game.chat(3,url);
        }
    }
};

gameclass.mod_platform.playurl = function(url){

    if (cc.sys.os == cc.sys.OS_WINDOWS) {

    }else if(cc.sys.os == sys.OS_ANDROID){
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "Playurl", "(Ljava/lang/String;)V",url);

    }else if(cc.sys.os == sys.OS_IOS){
        jsb.reflection.callStaticMethod("NativeOcClass", "Playurl:",url);
        //jsb.reflection.callStaticMethod("NativeOcClass", "callNativeUIWithTitle:andContent:", "cocos2d-js", jsb.fileUtils.getWritablePath());
    }
    else
    {

    }

};

gameclass.mod_platform.copyStr = function(str){
    if (cc.sys.os == cc.sys.OS_WINDOWS) {

    }else if(cc.sys.os == cc.sys.OS_ANDROID){
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "copyStr", "(Ljava/lang/String;)V", str.toString());
    }else if(cc.sys.os == cc.sys.OS_IOS){
        jsb.reflection.callStaticMethod("NativeOcClass", "copyStr:", str.toString());
    }else
    {

    }
};

gameclass.mod_platform.onios = function () {
    if (cc.sys.os == cc.sys.OS_WINDOWS) {

    }else if(cc.sys.os == sys.OS_ANDROID){
        //jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "Playurl", "(Ljava/lang/String;)V",url);

    }else if(cc.sys.os == sys.OS_IOS){
        jsb.reflection.callStaticMethod("NativeOcClass", "OnIos");
        //jsb.reflection.callStaticMethod("NativeOcClass", "callNativeUIWithTitle:andContent:", "cocos2d-js", jsb.fileUtils.getWritablePath());
    }
    else
    {

    }
};

gameclass.mod_platform.setbaseinfo = function(info){
    if (!cc.sys.isNative) {
    }
    else{

        if (cc.sys.os == cc.sys.OS_WINDOWS) {

        }else if(cc.sys.os == sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "SetBaseInfo", "(Ljava/lang/String;)V", info.toString());
        }else if(cc.sys.os == sys.OS_IOS){
            jsb.reflection.callStaticMethod("NativeOcClass", "SetBaseInfo:", info.toString());
        }
        else
        {

        }
    }
};

gameclass.mod_platform.screenType = 0;

//! 切换屏幕
gameclass.mod_platform.swicthscreen = function (type) {
    if(type === gameclass.mod_platform.screenType){
        return;
    } else {
        gameclass.mod_platform.screenType = type;
    }
    if (cc.sys.os == cc.sys.OS_WINDOWS) {

    }else if(cc.sys.os == sys.OS_ANDROID){
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "SwitchScreen", "(I)V", type);
    }else if(cc.sys.os == sys.OS_IOS){
        jsb.reflection.callStaticMethod("NativeOcClass", "SwitchScreen:", type.toString());
    }
    else
    {

    }

    var size = cc.view.getFrameSize();
    cc.view.setFrameSize(size.height, size.width);

    if(type == 0) {
        if(cc.sys.isNative) {
            cc.view.setDesignResolutionSize(1136, 640, cc.ResolutionPolicy.SHOW_ALL);
        } else {
            cc.view.setDesignResolutionSize(1136, 640, cc.ResolutionPolicy.SHOW_ALL);
        }
    } else {
        if(cc.sys.isNative) {
            cc.view.setDesignResolutionSize(640, 1136, cc.ResolutionPolicy.SHOW_ALL);
        } else {
            cc.view.setDesignResolutionSize(640, 1136, cc.ResolutionPolicy.SHOW_ALL);
        }
    }
    return;

    if(type == 0) {
        // cc.view.setOrientation(cc.ORIENTATION_LANDSCAPE_LEFT);
        // cc.view.enableAutoFullScreen(true);
        var size = cc.director.getWinSize();
            if(size.width / size.height < 1.4) {
           cc.view.setDesignResolutionSize(1136, 640, cc.ResolutionPolicy.SHOW_ALL);
         } else {
             var fw = size.width / 960;
             var fh = size.height / 640;
             var w = size.width;
             var h = size.height;
             if (fw >= fh) {
                 w = size.width * 640 / size.height;
                 h = 640;
             } else {
                 w = 960;
                 h = 960 * size.height / size.width;
             }

             cc.view.setDesignResolutionSize(w, h, cc.ResolutionPolicy.NO_BORDER);
         }
        // cc.view.resizeWithBrowserSize(true);
    } else {
        //cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);
        //cc.view.enableAutoFullScreen(true);
        // var size = cc.director.getWinSize();
        // if(size.height / size.width < 1.4) {
        cc.view.setDesignResolutionSize(640, 1136, cc.ResolutionPolicy.SHOW_ALL);
        // } else {
        //     var fw = size.width / 640;
        //     var fh = size.height / 960;
        //     var w = size.width;
        //     var h = size.height;
        //     if (fh >= fw) {
        //         w = size.width * 960 / size.height;
        //         h = 960;
        //     } else {
        //         w = 640;
        //         h = 640 * size.height / size.width;
        //     }
        //
        //     cc.view.setDesignResolutionSize(w, h, cc.ResolutionPolicy.NO_BORDER);
        // }
       // cc.view.resizeWithBrowserSize(true);
    }



};

gameclass.mod_platform.chagesize = function (w, h) {
    //if(w > h) {
    //    cc.view.setDesignResolutionSize(1136, 640, cc.ResolutionPolicy.SHOW_ALL);
    //} else {
    //    cc.view.setDesignResolutionSize(640, 1136, cc.ResolutionPolicy.SHOW_ALL);
    //}
};



