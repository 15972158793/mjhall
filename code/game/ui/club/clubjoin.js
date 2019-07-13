/**
 * Created by Administrator on 2017/7/18.
 */
gameclass.clubjoin = gameclass.baseui.extend({
    node:null,
    clubslist:[],
    tabview:null,
    ctor: function () {
        this._super();
    },

    show: function () {
        this.node = this.game.uimgr.createnode(res.julebu_clubjoin, true);
        this.addChild(this.node);
        var _this = this;
        gameclass.createbtnpress(this.node, "closeBtn", function () {
            _this.game.uimgr.closeui("gameclass.clubjoin");
            //_this.game.uimgr.showui("gameclass.clubinfosmyself");
        });

        var _input = ccui.helper.seekWidgetByName(this.node, "inputsearch");
        gameclass.createbtnpress(this.node, "btn_search", function () {
            var searchkey = _input.getString();
            if(searchkey == ""){
                _this.node.removeChild(_this.tabview);
                _this.tabview = new clubTableview(_this.game,_this.clubslist,1);
                _this.node.addChild(_this.tabview);
                return;
            }
            for(var i = 0 ; i < _this.clubslist.length; i++){
                if(searchkey == _this.clubslist[i].clubname || parseInt(searchkey.trim()) == _this.clubslist[i].clubid){
                    _this.node.removeChild(_this.tabview);
                    var tempArr = [];
                    tempArr.push(_this.clubslist[i]);
                    _this.tabview = new clubTableview(_this.game,tempArr,1);
                    _this.node.addChild(_this.tabview);
                    break;
                }
            }
        });
    },

    clubJoinTableview:function(cluballinfos){
        this.clubslist = this.game.modmgr.mod_center.mod_club.allclubs;
        this.tabview = new clubTableview(this.game,cluballinfos,1);
        this.node.addChild(this.tabview);
    },
});
