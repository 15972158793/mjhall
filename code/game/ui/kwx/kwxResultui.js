/**
 * Created by yang on 2016/11/17.
 */

gameclass.kwxResultui = gameclass.baseui.extend({
    sprite: null,
    node:null,
    sharelayer:null,
    chulitu:null,
    shareing:null,
    round:null,
    curtime:null,
    mod_kwx:null,
    ctor: function () {
        this._super();
        this.shareing = false;
    },

    show:function(){
        var _this = this;
        this.node = this.game.uimgr.createnode( res.kwxResultui, true );
        this.addChild(this.node);

        for ( var i = 0; i < 3; ++i ) {
            var node = ccui.helper.seekWidgetByName( this.node, "win" + i );
            node.setVisible( false );
        }

        for ( var i = 0; i < 3; ++i ) {
            var node = ccui.helper.seekWidgetByName( this.node, "pao" + i );
            node.setVisible( false );
        }
        //返回
        gameclass.createbtnpress( this.node, "back", function () {
            _this.game.uimgr.closeui( "gameclass.kwxResultui" );
            _this.game.uimgr.closeui( "gameclass.kwxtable");
            _this.game.uimgr.showui( "gameclass.hallui" );
        });

        //分享
        gameclass.createbtnpress( this.node, "share", function () {
            gameclass.mod_platform.savescreen( function( url ){
                if ( window.wx )
                {
                    url = JSON.parse(url);

                    if(url.error == 0){
                        _this.share(url.url);
                        //_this.chulitu.setString( "处理完成" );
                    }

                    //_this.shareing = false;
                }
            },function(){
                if(window.wx) {
                    _this.sharelayer.setVisible(true);
                }
            });

            if(window.wx)
            {
                //_this.chulitu.setString("图片正在处理中");
                //_this.shareing = true;
            }
        });

        /*var _this = this;
        this.sharelayer =  ccui.helper.seekWidgetByName(this.node, "sharelayer");
        this.sharelayer.setVisible(false);
        this.chulitu = ccui.helper.seekWidgetByName(this.node, "chulitu");
        this.round   = ccui.helper.seekWidgetByName(this.node, "round");
        this.curtime = ccui.helper.seekWidgetByName(this.node, "curtime");

        var myDate = new Date();
        var str = myDate.Format("MM:dd hh:mm");

        this.curtime.setString("当前时间:" + str);

        gameclass.createbtnpress(this.node, "sharelayer", function () {
            //if (!_this.shareing)
                _this.sharelayer.setVisible(false);
        });

        this.addChild(this.node);

        //返回
        gameclass.createbtnpress(this.node, "back", function () {
            _this.game.uimgr.closeui("gameclass.kwxResultui");
            _this.game.uimgr.showui("gameclass.hallui");
        });

        //分享
        gameclass.createbtnpress(this.node, "share", function () {
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
        });*/
    },

    setData:function( mod_kwx ){
        this.mod_kwx = mod_kwx;
        var data = this.mod_kwx.gamebyekwxinfo;
        var node = ccui.helper.seekWidgetByName( this.node, "infoLeft" );
        node.setString( "房间号:" + this.mod_kwx.roominfo.roomid );

        var myDate = new Date();
        var time   = myDate.Format( "yyyy-MM-dd hh:mm" );

        node = ccui.helper.seekWidgetByName( this.node, "infoRight" );
        node.setString( time );
        node = ccui.helper.seekWidgetByName( this.node, "maxstep_Text" );
        node.setString("局数:" + this.mod_kwx.roominfo.step + "/" + this.mod_kwx.roominfo.maxstep);
        var Title;
        switch ( this.mod_kwx.roominfo.type ) {
            case 2:
                Title = "孝感卡五星";
                break;
            case 3:
                Title = "襄阳卡五星";
                break;
            case 4:
                Title = "十堰卡五星";
                break;
            case 5:
                Title = "随州卡五星";
                break;
            case 13:
                Title = "宜城卡五星";
                break;
            case 14:
                Title = "应城卡五星";
                break;
        }
        ccui.helper.seekWidgetByName( this.node, "quyuwanfa" ).setString( Title );
        if(data.info && data.info.length >= 3){
            for ( var i = 0; i < data.info.length; ++i ) {
                if(this.mod_kwx.roominfo.person[i])
                {
                    node = ccui.helper.seekWidgetByName(this.node, "nick" + i);
                    node.setString(this.mod_kwx.roominfo.person[i].name);
                    node = ccui.helper.seekWidgetByName(this.node, "head" + i);
                    gameclass.mod_base.showtximg(node.getChildByName("headImg"), this.mod_kwx.roominfo.person[i].imgurl, 0, 0);
                }
                var item = data.info[i];
                if(item){
                    if(item.uid)
                    {
                        node = ccui.helper.seekWidgetByName( this.node, "id" + i );
                        node.setString( "ID:"+item.uid );
                    }
                    if(item.zm)
                    {
                        node = ccui.helper.seekWidgetByName( this.node, "zm" + i );
                        node.setString( item.zm.toString() );
                    }
                    if(item.jp)
                    {
                        node = ccui.helper.seekWidgetByName( this.node, "jp" + i );
                        node.setString( item.jp.toString() );
                    }
                    if(item.dp)
                    {
                        node = ccui.helper.seekWidgetByName( this.node, "dp" + i );
                        node.setString( item.dp.toString() );
                    }
                    if(item.ag)
                    {
                        node = ccui.helper.seekWidgetByName( this.node, "ag" + i );
                        node.setString( item.ag.toString() );
                    }
                    if(item.mg)
                    {
                        node = ccui.helper.seekWidgetByName( this.node, "mg" + i );
                        node.setString( item.mg.toString() );
                    }
                    if(item.pi)
                    {
                        node = ccui.helper.seekWidgetByName( this.node, "pi" + i );
                        node.setString( item.pi.toString() );
                    }
                    if(item.score || item.score == 0)
                    {
                        node = ccui.helper.seekWidgetByName( this.node, "count" + i );
                        node.setString( item.score );
                    }
                    if ( item.score < 0 ) {
                        //node.setColor(cc.color(58,221,0));    //负分显示绿色
                    }
                }
            }

            //显示大赢家
            var score0 = data.info[0].score;
            var score1 = data.info[1].score;
            var score2 = data.info[2].score;
            if ( score0 == 0 && score1 == 0 && score2 == 0 ) {

            } else {
                //if(score0 < 0) score0 = 0;
                //if(score1 < 0) score1 = 0;
                //if(score2 < 0) score2 = 0;
                var scoreAry = [score0, score1, score2];
                scoreAry.sort(function(a,b){ return a-b});
                switch( scoreAry[2] ) {
                    case score0:
                        ccui.helper.seekWidgetByName( this.node, "win" + 0 ).setVisible( true );
                        break;
                    case score1:
                        ccui.helper.seekWidgetByName( this.node, "win" + 1 ).setVisible( true );
                        break;
                    case score2:
                        ccui.helper.seekWidgetByName( this.node, "win" + 2 ).setVisible( true );
                        break;
                }
            }

            //显示最佳炮手
            var dp0 = data.info[0].dp;
            var dp1 = data.info[1].dp;
            var dp2 = data.info[2].dp;
            if ( dp0 == 0 && dp1 == 0 && dp2 == 0 ) {

            } else {
                var dpAry = [dp0, dp1, dp2];
                dpAry.sort(function(a,b){ return a-b});
                switch( dpAry[2] ) {
                    case dp0:
                        ccui.helper.seekWidgetByName( this.node, "pao" + 0 ).setVisible( true );
                        break;
                    case dp1:
                        ccui.helper.seekWidgetByName( this.node, "pao" + 1 ).setVisible( true );
                        break;
                    case dp2:
                        ccui.helper.seekWidgetByName( this.node, "pao" + 2 ).setVisible( true );
                        break;
                }
            }
        }
    }
});

gameclass.kwxResultui.prototype.share = function( url ){
    gameclass.mod_platform.wxsharelink( "卡五星结算", "战绩", url );
};