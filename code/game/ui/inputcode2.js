/**
 * Created by yang on 2016/11/16.
 */

gameclass.inputcode2 = gameclass.baseui.extend({
    sprite: null,
    node:null,
    arrnum:null,
    ctor: function () {
        this._super();
        this.arrnum = [];

        for (var i = 0; i < 6;i++){
            this.arrnum[i] = -1;
        }
    },
    show:function(){
        this.node = this.game.uimgr.createnode(res.jionroomui2,true);

        this.addChild(this.node);

        this.game.modmgr.mod_center.code("A");

        var _this = this;
        gameclass.createbtnpress(this.node, "backBtn", function () {
            _this.game.uimgr.closeui("gameclass.inputcode2");
        });

        gameclass.createbtnpress(this.node, "Panel_1_0", function () {
            _this.game.uimgr.closeui("gameclass.inputcode2");
        });

        gameclass.createbtnpress(this.node, "cs", function () {
            _this.cleanup();
        });

        gameclass.createbtnpress(this.node, "sc", function () {
            _this.cleanupback();
        });

        for (var i = 0;i < 10;i ++){

            gameclass.createbtnpress(this.node, "btn" + (i).toString(), function (btn,_null,data) {
                _this.pressnum(data);
            },function(){

            },function(){

            },i);
        }

        for (var i = 0; i < 6;i++) {
            if (this.arrnum[i]  < 0 ){
                ccui.helper.seekWidgetByName(this.node, "" + (i+1).toString()).setString("");
            }else{
                ccui.helper.seekWidgetByName(this.node, "" + (i+1).toString()).setString(this.arrnum[i].toString());
            }
        }

    },
    pressnum:function(num){
        for (var i = 0; i < 6;i++){
            if (this.arrnum[i] == -1){
                this.arrnum[i] = num;

                if (i == 5){

                    var tem = 0;
                    for (var j = 0; j < 6;j++){
                        tem += this.arrnum[j];
                        if (j < 5){
                            tem *= 10;
                        }
                    }
                    this.game.modmgr.mod_center.code(tem.toString());
                    this.game.uimgr.closeui("gameclass.inputcode2");
                    //this.game.modmgr.mod_login.joinwithroomid(Number(tem));

                }
                break;
            }
        }
        for (var i = 0; i < 6;i++) {
            if (this.arrnum[i]  < 0 ){
                ccui.helper.seekWidgetByName(this.node, "" + (i+1).toString()).setString("");
            }else{
                ccui.helper.seekWidgetByName(this.node, "" + (i+1).toString()).setString(this.arrnum[i].toString());
            }
        }
    },
    cleanup:function(){
        for (var i = 0; i < 6;i++){
            this.arrnum[i] = -1;
        }
        for (var i = 0; i < 6;i++) {
            if (this.arrnum[i]  < 0 ){
                ccui.helper.seekWidgetByName(this.node, "" + (i+1).toString()).setString("");
            }else{
                ccui.helper.seekWidgetByName(this.node, "" + (i+1).toString()).setString(this.arrnum[i].toString());
            }
        }
    },
    cleanupback:function(){
        for (var i = 5; i >= 0;i--){
            if (this.arrnum[i] >= 0){
                this.arrnum[i] = -1;
                break;
            }
        }
        for (var i = 0; i < 6;i++) {
            if (this.arrnum[i]  < 0 ){
                ccui.helper.seekWidgetByName(this.node, "" + (i+1).toString()).setString("");
            }else{
                ccui.helper.seekWidgetByName(this.node, "" + (i+1).toString()).setString(this.arrnum[i].toString());
            }
        }
    }
});