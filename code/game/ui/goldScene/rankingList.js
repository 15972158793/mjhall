/**
 * Created by Administrator on 2017-11-3.
 */

gameclass.rankingVer = gameclass.rankingVer || 0;
gameclass.rankingdata = gameclass.rankingdata || {};


gameclass.mod_ranking = gameclass.mod_base.extend({
    rankData:null,
    playerData:null,

    ctor:function(){

    },

    getRankingInfo:function(func){
        var _this = this;
        this.sendhttp("gettop",gameclass.rankingVer,function(retdata,temp,recvdata){
            //cc.log(retdata);
            if(gameclass.rankingVer == retdata.ver){
                _this.rankData = gameclass.rankingdata;
            }else{
                gameclass.rankingVer = retdata.ver;
                gameclass.rankingdata =retdata.info;
                _this.rankData = retdata.info;
            }
            if(func){
                func();
            }
        })
    },

    getPlayerInfo:function(uid,func){
        var _this = this;
        this.sendhttp('getextrainfo',{"uid":uid},function(retdata,temp,recvdata){
            //cc.log(retdata);
            if(func){
                func(retdata);
            }
        })
    }
});

gameclass.CustomTableViewCell = cc.TableViewCell.extend({
    draw: function (ctx) {
        this._super(ctx);
    }
});

gameclass.rankingTableView = cc.Layer.extend({
    ctor:function(_game,_rankdata){
        this._super();
        this.game = _game;
        this.rankData = _rankdata;
        //cc.log(this.rankData);
        this.init();
    },
    init:function(){
        var tableView = new cc.TableView(this,cc.size(750,385));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);

        //设置委托
        tableView.setDelegate(this);

        //填充方式
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(tableView);
        //更新tableview
        tableView.reloadData();
        return true;
    },
    tableCellTouched: function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
        var _this = this;
        var tool = new gameclass.mod_ranking();
        tool.getPlayerInfo(_this.rankData[cell.getIdx()].uid,function(retdata){
            if(retdata){
                retdata.name = _this.rankData[cell.getIdx()].name;
                retdata.head = _this.rankData[cell.getIdx()].head;
            }
            _this.game.uimgr.showui("gameclass.rankingPlayerInfo").setBaseInfo(retdata);
        })
    },
    //设置cell大小
    tableCellSizeForIndex: function (table, idx) {
        return cc.size(732, 96);
    },
    //设置cell个数
    numberOfCellsInTableView: function (table) {
        return 50;
    },
    //添加Cell
    tableCellAtIndex: function (table, idx) {
        var strValue = Number(idx.toFixed(0))+1;

        //获得一个cell，滑动cell的时候会执行这个方法，把没有显示（没渲染）的cell拿过来，更改内容，为了减小内存的开销
        var cell = table.dequeueCell();
        var label;
        var _this = this;
        if (!cell) {
            cc.log("newnew");
            cc.log(strValue);
            cell = new gameclass.CustomTableViewCell();
            //添加背景图片
            label = new cc.Sprite(res.rankCellBg);
            label.setAnchorPoint(0.5,0.5);
            label.setPosition(366,48);
            label.setTag(1000);
            cell.addChild(label);
            // 添加排名文本
            label = new ccui.Text(strValue,res.cuFont,30,cc.size(50,30));
            label.setAnchorPoint(0.5,0.5);
            label.setPosition(60,48);
            label.setTag(1001);
            cell.addChild(label);

            //头像
            label = new cc.Sprite(res.playerHead);
            gameclass.mod_base.showtximg(label,this.rankData[idx].head,0,0,"im_headbg2");
            label.setPosition(202.7,49.4);
            label.setTag(1002);
            cell.addChild(label);
            //名字
            label = new ccui.Text(this.rankData[idx].name,res.cuFont,20,cc.size(200,20));
            label.setAnchorPoint(0,0);
            label.setPosition(250,55);
            label.setTag(1003);
            cell.addChild(label);
            //id
            label = new ccui.Text(this.rankData[idx].uid,res.cuFont,20,cc.size(190,20));
            label.setAnchorPoint(0,0);
            label.setPosition(250,22);
            label.setTag(1004);
            cell.addChild(label);
            //金钱
            label = new ccui.TextAtlas(this.rankData[idx].gold,"res/ui/goldRankingList/yyjb_font2.png",22,28,".");
            label.ignoreContentAdaptWithSize(true);
            label.setAnchorPoint(1,0.5);
            label.setPosition(700,47);
            label.setTag(1005);
            cell.addChild(label);

            //var textNode = new ccui.Layout();
            //textNode.setPosition(cell.getChildByTag(1001).getPosition());
            //textNode.setTag(1006);
            //textNode.setVisible(false);
            //cell.addChild(textNode);
            //
            //var orderNum = cell.getChildByTag(1001).getString();
            //
            //if(orderNum > 45 && orderNum < 49){
            //    var sucAnim = new sp.SkeletonAnimation(res["jsonCup"+(orderNum-45)],
            //        res["atlasCup"+(orderNum-45)]);
            //    sucAnim.setAnimation(0, 'animation', true);
            //    textNode.addChild(sucAnim);
            //}
            //
            //if(orderNum < 4){
            //    cell.getChildByTag(1001).setVisible(false);
            //    cell.getChildByTag(1006).setVisible(true);
            //}else{
            //    cell.getChildByTag(1006).setVisible(false);
            //    cell.getChildByTag(1001).setVisible(true);
            //}
        } else {
            //更改排名信息
            label = cell.getChildByTag(1001);
            label.setString(strValue);
            label = cell.getChildByTag(1002);
            gameclass.mod_base.showtximg(label,this.rankData[idx].head,0,0,"im_headbg2");
            label = cell.getChildByTag(1003);
            label.setString(this.rankData[idx].name);
            label = cell.getChildByTag(1004);
            label.setString(this.rankData[idx].uid);
            label = cell.getChildByTag(1005);
            label.setString(this.rankData[idx].gold);

            //var orderNum = cell.getChildByTag(1001).getString();
            //
            //if(orderNum < 4){
            //    cell.getChildByTag(1001).setVisible(false);
            //    cell.getChildByTag(1006).setVisible(true);
            //}else{
            //    cell.getChildByTag(1006).setVisible(false);
            //    cell.getChildByTag(1001).setVisible(true);
            //}
        }

        return cell;
    },
})


gameclass.rankingList = gameclass.baseui.extend({
    node:null,

    ctor: function () {
        this._super();
    },

    show:function(){
        var _this = this;
        this.node = this.game.uimgr.createnode(res.rankingList, true, 1, null, function(){
            _this.rankingList = ccui.helper.seekWidgetByName(_this.node,"ListView_1");
            gameclass.createbtnpress(_this.node, "btn_close", function () {
                _this.game.uimgr.closeui("gameclass.rankingList");
            });

            gameclass.createbtnpress(_this.node,"buygold",function(){
                _this.game.uimgr.showui("gameclass.goldShop");
            })

            gameclass.createbtnpress(_this.node,"btn_addVance",function(){
                _this.game.uimgr.showui("gameclass.goldShop");
            })

            var myIcon = ccui.helper.seekWidgetByName(_this.node,"myIcon");
            var logindata = _this.game.modmgr.mod_login.logindata;
            gameclass.mod_base.showtximg(myIcon,logindata.imgurl,0,0,"im_headbg2",false);
            ccui.helper.seekWidgetByName(_this.node,"gold").setString(gameclass.changeShow(logindata.gold));

            var goldLogo = ccui.helper.seekWidgetByName(_this.node,"goldNode");
            var sucAnim = new sp.SkeletonAnimation(res.jsongold, res.atlasgold);
            sucAnim.setAnimation(0, 'animation', true);
            sucAnim.setAnchorPoint(0.5, 0.5);
            sucAnim.setPosition(goldLogo.width * 0.5, goldLogo.height * 0.5);
            goldLogo.addChild(sucAnim);

            _this.mod_rank = new gameclass.mod_ranking();
            _this.mod_rank.setgame(_this.game);
            _this.mod_rank.getRankingInfo(function(){
                _this.showRankingList();
                //var table = new gameclass.rankingTableView(_this.game,_this.mod_rank.rankData);
                //table.setPosition(193,147);
                //table.setContentSize(750,385);
                //_this.node.addChild(table);
            });
        });
        this.addChild(this.node);
    },

    showRankingList:function(){
        if(!this.mod_rank.rankData) {
            return;
        }
        var _this = this;
        var data = this.mod_rank.rankData;
        var count = 1;
        for(var i = 0;i < data.length; i++){
            var listCell = this.game.uimgr.createnode(res.rankingCell,true).getChildByName("bg");
            listCell.removeFromParent();
            this.rankingList.pushBackCustomItem(listCell);

            var rankText = ccui.helper.seekWidgetByName(listCell,"rankNum");
            rankText.setString(count);
            if(count <= 3){
                rankText.setVisible(false);

                var textNode = new cc.Node();
                textNode.setPosition(rankText.getPosition());
                listCell.addChild(textNode);

                var sucAnim = new sp.SkeletonAnimation(res["jsonCup"+count], res["atlasCup"+count]);
                sucAnim.setAnimation(0, 'animation', true);
                textNode.addChild(sucAnim);
            }
            count++;
            var icon = ccui.helper.seekWidgetByName(listCell,"icon");
            listCell.name = data[i].name;
            listCell.uid = data[i].uid;
            listCell.head = data[i].head;
            gameclass.mod_base.showtximg(icon, data[i].head, 0, 0, "im_headbg2");
            icon.getChildByName("name").setString(data[i].name);
            icon.getChildByName("id").setString("ID:"+data[i].uid);
            ccui.helper.seekWidgetByName(listCell,"money").ignoreContentAdaptWithSize(true);
            ccui.helper.seekWidgetByName(listCell,"money").setString(data[i].gold);

            listCell.addTouchEventListener(function(sender,type){
                if(type == ccui.Widget.TOUCH_ENDED){
                    _this.mod_rank.getPlayerInfo(sender.uid,function(retdata){
                        if(retdata){
                            retdata.name = sender.name;
                            retdata.head = sender.head
                        }
                        _this.game.uimgr.showui("gameclass.rankingPlayerInfo").setBaseInfo(retdata);
                    })
                }
            });
        }
    },
    updateUIMsg : function(msgtype) {
        if(msgtype == "updcard") {
            ccui.helper.seekWidgetByName(this.node, "gold").setString(gameclass.changeShow(this.game.modmgr.mod_login.logindata.gold));
        }
    },
});

gameclass.rankingPlayerInfo = gameclass.baseui.extend({
    node:null,

    ctor: function () {
        this._super();
    },

    show:function(){
        this.node = this.game.uimgr.createnode(res.rankingPlayerInfo,true);
        this.addChild(this.node);

        var _this = this;
        gameclass.createbtnpress(this.node, "Panel_1", function () {
            _this.game.uimgr.closeui("gameclass.rankingPlayerInfo");
        });
    },

    setBaseInfo:function(data){
        var icon = ccui.helper.seekWidgetByName(this.node,"icon");
        gameclass.mod_base.showtximg(icon, data.head, 0, 0, "im_headbg2");
        if(data.name == ""){
            data.name = "游客";
        }
        icon.getChildByName("name").setString(data.name);
        icon.getChildByName("id").setString("ID:"+data.uid);
        var sex = this.getSex(data.sex);
        icon.getChildByName("sex").setString(sex == 0 ? "男":"女");
        if(data.sign == ""){
            data.sign = "这家伙很懒，什么都没留下!"
        }
        ccui.helper.seekWidgetByName(this.node,"qianmin").setString(data.sign );
    },

    getSex:function(sex){
        if(sex == 1 || sex == 2){
            return sex-1;
        }else{
            return 0;
        }
    },
})


