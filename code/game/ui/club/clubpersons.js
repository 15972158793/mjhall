/**
 * Created by Administrator on 2017/7/18.
 */
gameclass.clubpersons = gameclass.baseui.extend({
    node:null,
    clubid:0,
    ismanger:false,
    tichu_panel:null,
    _memberListView:null,
    ctor: function () {
        this._super();
    },
    show: function () {
        this.node = this.game.uimgr.createnode(res.julebu_clubpersons, true);
        this.addChild(this.node);

        this._memberListView = ccui.helper.seekWidgetByName(this.node, "memberListView");
        this._memberListView.setScrollBarEnabled(false);

        var _this = this;
        gameclass.createbtnpress(this.node, "closeBtn", function () {
            _this.game.uimgr.closeui("gameclass.clubpersons");
        });
        this.tichu_panel = ccui.helper.seekWidgetByName(this.node, "tichu_panel");
        this.tichu_panel.setVisible(false);
        this.tichu_panel.addTouchEventListener(function(sender,type){
            if(type == ccui.Widget.TOUCH_ENDED){
                _this.tichu_panel.setVisible(false);
            }
        });
    },
    showtirentip: function (pname , uid, imgurl) {
        this.tichu_panel.setVisible(true);//
        ccui.helper.seekWidgetByName(this.tichu_panel, "pname").setString(pname);
        ccui.helper.seekWidgetByName(this.tichu_panel, "puid").setString("ID: "+uid);

        gameclass.mod_base.showtximg(ccui.helper.seekWidgetByName(this.tichu_panel, "Image_21"), imgurl, 0, 0);

        var _this = this;
        var tichu_btn = ccui.helper.seekWidgetByName(this.tichu_panel, "tichu_btn");
        tichu_btn.addTouchEventListener(function(sender,type){
            if(type == ccui.Widget.TOUCH_ENDED){
                _this.game.modmgr.mod_center.mod_club.sendExitclub(_this.clubid,uid)
            }
        });
        if(this.ismanger){
            if(uid == this.game.modmgr.mod_login.logindata.uid){
                tichu_btn.setVisible(false);
            }
        }else{
            tichu_btn.setVisible(false);
        }
    },
    hidetirentip: function (members,cid,ismanger) {
        this.tichu_panel.setVisible(false);
        this.showplayers(members,cid,ismanger);
    },
    showplayers: function (members, cid, ismanger) {
        this.clubid = cid;
        this.ismanger = ismanger;
        var _pnodes = [];  var pers8 = [];
        var len = members.length;
        // len = parseInt(Math.random() * 50);
        // len = 51;

        for(var i = 0 ; i < len; i++){
            var obj = {
                "head":members[i].head,
                "name":members[i].name,
                "uid":members[i].uid
            }
            pers8.push(obj);
            var col = (i+1)%8;
            if(i == len-1) {
                _pnodes.push(pers8);
            }
            else if(col == 0){
                _pnodes.push(pers8);
                pers8 = [];
            }
        }
        this.addTableview(_pnodes);
    },
    addTableview:function(pnodes){
        //cc.log(pnodes);
        // var _node = ccui.helper.seekWidgetByName(this.node, "person_panel")
        // _node.removeAllChildren();
        // var tabview = new clubTableview(this.game,pnodes,5);
        // _node.addChild(tabview);

        this._memberListView.removeAllChildren();
        var len = pnodes.length;
        for(var i = 0;i<len;i++){
            var horDatas = pnodes[i];
            var horContain = new ccui.Layout();
            this._memberListView.addChild(horContain);
            horContain.setContentSize(cc.size(1036, 150))
            for(var j = 0;j<horDatas.length;j++){
                var obj = horDatas[j];
                var item = this.game.uimgr.createnode(res.julebu_memberItem, true);
                var headImg = item.getChildByName("headImg");
                headImg.setTouchEnabled(true);
                headImg.setSwallowTouches(false);
                headImg.name = obj.name;
                headImg.uid = obj.uid;
                headImg.head = obj.head;
                headImg.addTouchEventListener(function (sender, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        this.showtirentip(sender.name, sender.uid, sender.head);
                    }
                }, this);
                var nameTxt = item.getChildByName("nameTxt");
                var idTxt = item.getChildByName("idTxt");
                gameclass.mod_base.showtximg(headImg, obj.head.toString(), 0, 0, "im_headbg5");
                nameTxt.setString(obj.name);
                idTxt.setString(obj.uid);
                horContain.addChild(item);
                item.setPositionX(j * 130);
            }
        }
        this._memberListView.doLayout();
    },
});
