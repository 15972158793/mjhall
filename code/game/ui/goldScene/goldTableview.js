
//var goldTableview = cc.Layer.extend({
//    //game:null,
//    listinfos:[],
//    cellLen:10,
//    uitype:0,//0自己所在俱乐部  1加入俱乐部列表  2大厅信息  3俱乐部成员 4群主开房列表
//    _game:null,
//    _mod:null,
//    ctor:function (_infos,uitype) {
//        this._super();
//        //this.game = _game;
//        this.listinfos = _infos;
//        cc.log(this.listinfos);
//        this.cellLen = _infos.length;
//        this.uitype = uitype;
//        this.init();
//    },
//    setGame:function (game, mod) {
//        this._game = game;
//        this._mod = mod;
//    },
//    init:function () {
//        var winSize; var posx = 0;  var posy = 0;
//        if(this.uitype == 0) {
//            winSize = cc.size(1100, 450);
//            posx = 18;
//            posy = 50;
//        }
//        //cc.log(this)
//        var tableView = new cc.TableView(this, winSize);
//        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
//        tableView.x = posx;
//        tableView.y = posy;
//        tableView.setDelegate(this);
//
//        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
//
//        this.addChild(tableView);
//
//        return true;
//    },
//    tableCellSizeForIndex:function (table, idx) {
//        return cc.size(150, 150);
//    },
//
//    tableCellAtIndex:function (table, idx) {
//        var cell;
//        if(this.uitype == 0){
//            cell = this.setmyselfzj(table,idx);
//        }
//        return cell;
//    },
//
//    tableCellTouched:function (table, cell) {
//        cc.log("cell touched at index: " + cell.getIdx());
//
//    },
//    insertCellAtIndex: function (idx) {
//    },
//    updateCellAtIndex:function (idx) {
//    },
//    numberOfCellsInTableView:function (table) {
//        return this.cellLen;
//    },
//    //0战绩
//    setmyselfzj: function (table,idx) {
//        var _this =this;
//        var cell = table.dequeueCell();
//        var label;
//        if (!cell) {
//            cell = new cc.TableViewCell();
//            var sprite = new cc.Sprite(res.goldzhanjcellbg);
//            sprite.anchorX = 0;
//            sprite.anchorY = 0;
//            sprite.setPosition(cc.p(0,0));
//            cell.addChild(sprite);
//            //cc.log(this.listinfos);
//            label = new ccui.Text(this.listinfos[idx].gamename, "res/Font/FZY4JW_0569.TTF", 24,cc.size(20, 26));
//            //label.anchorX = 0;
//            label.setPosition(cc.p(110,100));
//            label.setTag(90);
//            cell.addChild(label);
//
//            label = new ccui.Text(this.listinfos[idx].timeny, "res/Font/FZY4JW_0569.TTF", 24,cc.size(20, 26));
//            //label.anchorX = 0;
//            label.setPosition(cc.p(110,70));
//            label.setTag(91);
//            cell.addChild(label);
//
//            label = new ccui.Text(this.listinfos[idx].timesf, "res/Font/FZY4JW_0569.TTF", 24,cc.size(20, 26));
//            //label.anchorX = 0;
//            label.setPosition(cc.p(110,30));
//            label.setTag(92);
//            cell.addChild(label);
//
//            var lenp = this.listinfos[idx].playerinfoArr.length;
//            var bool = true;
//
//            for(var k=0; k<5; k++){//最多时有5个
//                label = new ccui.ImageView(res.headbgkuang);
//                label.setTouchEnabled(true);
//                label.setTag(300+k);
//                if(k<lenp){
//                    bool = true;
//                    if(this.listinfos[idx].playerinfoArr[k].head != "")
//                        gameclass.mod_base.showtximg(label, this.listinfos[idx].playerinfoArr[k].head, 0, 0);
//                }else{
//                    bool = false;
//                }
//                label.setPosition(cc.p(270+k*170,75));
//                label.setVisible(bool);
//                cell.addChild(label);
//
//                var namep = "";
//                if(bool) {
//                    namep = this.listinfos[idx].playerinfoArr[k].name;
//
//                    label.name = namep;
//                    label.head = this.listinfos[idx].playerinfoArr[k].head;
//                    label.uid = this.listinfos[idx].playerinfoArr[k].uid;
//                }
//                label.addTouchEventListener(function(sender,type){
//                    if(type == ccui.Widget.TOUCH_ENDED){
//                        var tool = new gameclass.mod_ranking();
//                        tool.getPlayerInfo(sender.uid,function(retdata){
//                            if(retdata){
//                                retdata.name = sender.name;
//                                retdata.head = sender.head;
//                            }
//                            _this._game.uimgr.showui("gameclass.rankingPlayerInfo").setBaseInfo(retdata);
//                        })
//                    }
//                });
//
//                label = new ccui.Text(namep, "res/Font/FZY4JW_0569.TTF", 24,cc.size(20, 26));
//                label.setPosition(cc.p(270+k*170,20));
//                label.setTag(100+k);
//                label.setVisible(bool);
//                cell.addChild(label);
//
//                var score = 0;
//                if(bool) score = this.listinfos[idx].playerinfoArr[k].score;
//                var strtxt = ""+score; var colo = cc.color(0,255,255,255);
//                if(score > 0) {
//                    strtxt = "+"+score;
//                    colo = cc.color(255,255,83,255);
//                }
//                label = new ccui.Text(strtxt, "res/Font/FZY4JW_0569.TTF", 28, cc.size(20, 26));
//                label.setPosition(cc.p(315+k*170, 70));
//                label.setTextColor(colo);
//                label.anchorX = 0;
//                label.setTag(200+k);
//                label.setVisible(bool);
//                cell.addChild(label);
//
//                var str = "";
//                for(var m = 0;m < this.listinfos[idx].playerinfoArr[0].bets.length;m++){
//                    if(this.listinfos[idx].playerinfoArr[0].bets[m] > 0){
//                        if(m == 0) str += ("小压"+this.listinfos[idx].playerinfoArr[0].bets[m]+",");
//                        else if(m==1) str += ("豹子压"+this.listinfos[idx].playerinfoArr[0].bets[m]+",");
//                        else if(m==2) str += ("大压"+this.listinfos[idx].playerinfoArr[0].bets[m]+",");
//                        else{
//                            str += ( (m+1) +"点压"+this.listinfos[idx].playerinfoArr[0].bets[m]+",");
//                        }
//                    }
//                }
//                cc.log(str);
//                var label = new cc.LabelTTF(str,"Arial",20);
//                label.setDimensions(650,70);
//                label.setAnchorPoint(0,1);
//                label.setPosition(450,80);
//                label.setTag(400+k);
//                cell.addChild(label);
//
//
//                if(this.listinfos[idx].playerinfoArr[0].bets){
//
//                }
//                if(this.listinfos[idx].playerinfoArr[0].result){
//                    for(var n = 0;n < this.listinfos[idx].playerinfoArr[0].result.length;n++){
//                        var sp = new cc.Sprite(res["IMGdian" + this.listinfos[idx].playerinfoArr[0].result[n]]);
//                        sp.setScale(0.6);
//                        sp.setTag(500+k);
//                        sp.setPosition(450+n*sp.width*0.6,100);
//                        cell.addChild(sp);
//                    }
//                }
//            }
//        } else {
//            label = cell.getChildByTag(90);
//            label.setString(this.listinfos[idx].gamename);
//            label = cell.getChildByTag(91);
//            label.setString(this.listinfos[idx].timeny);
//            label = cell.getChildByTag(92);
//            label.setString(this.listinfos[idx].timesf);
//
//            var lenp = this.listinfos[idx].playerinfoArr.length;
//            var bool = true;
//            for(var i = 0 ;i < 5; i++) {
//                label = cell.getChildByTag(300+i);
//                if(i<lenp) {
//                    bool = true;
//                    label.setTouchEnabled(true);
//                    label.name = this.listinfos[idx].playerinfoArr[i].name;
//                    label.head = this.listinfos[idx].playerinfoArr[i].head;
//                    label.uid = this.listinfos[idx].playerinfoArr[i].uid;
//
//                }else{
//                    bool = false;
//                }
//                if(bool && this.listinfos[idx].playerinfoArr[i].head != "")
//                    gameclass.mod_base.showtximg(label, this.listinfos[idx].playerinfoArr[i].head, 0, 0);
//                label.setVisible(bool);
//
//                label = cell.getChildByTag(100+i);
//                label.setVisible(bool);
//                if(bool) label.setString(this.listinfos[idx].playerinfoArr[i].name);
//                label = cell.getChildByTag(200+i);
//                var score = 0;
//                if(bool) score = this.listinfos[idx].playerinfoArr[i].score;
//                var strtxt = ""+score; var colo = cc.color(0,255,255,255);
//                if(score > 0) {
//                    strtxt = "+"+score;
//                    colo = cc.color(255,255,83,255);
//                }
//                label.setTextColor(colo);
//                label.setString(strtxt);
//                label.setVisible(bool);
//
//
//                if(this.listinfos[idx].playerinfoArr[0].bets){
//                    label = cell.getChildByTag(400+i);
//                    label.setVisible(bool);
//                    if(bool) {
//                        var str = "";
//                        for(var m = 0;m < this.listinfos[idx].playerinfoArr[0].bets.length;m++){
//                            if(this.listinfos[idx].playerinfoArr[0].bets[m] > 0){
//                                if(m == 0) str += ("小压"+this.listinfos[idx].playerinfoArr[0].bets[m]+",");
//                                else if(m==1) str += ("豹子压"+this.listinfos[idx].playerinfoArr[0].bets[m]+",");
//                                else if(m==2) str += ("大压"+this.listinfos[idx].playerinfoArr[0].bets[m]+",");
//                                else{
//                                    str += ( (m+1) +"点压"+this.listinfos[idx].playerinfoArr[0].bets[m]+",");
//                                }
//                            }
//                        }
//                    }
//                    label.setString(str);
//                }
//                //if(this.listinfos[idx].playerinfoArr[0].result){
//                //    for(var n = 0;n < this.listinfos[idx].playerinfoArr[0].result.length;n++){
//                //        var sp = new cc.Sprite(res["IMGdian" + this.listinfos[idx].playerinfoArr[0].result[n]]);
//                //        sp.setScale(0.6);
//                //        sp.setPosition(450+n*sp.width*0.6,100);
//                //        cell.addChild(sp);
//                //    }
//                //}
//
//
//            }
//        }
//        return cell;
//    },
//
//
//});

