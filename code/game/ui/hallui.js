/**
 * Created by yang on 2016/11/9.
 */


gameclass.hallui = gameclass.baseui.extend({
    sprite: null,
    node: null,
    wchat: null,
    p_mail: null,
    btn_jinbi: null,
    touchAnim: null,
    clubid: 0,
    clubRoomIndex: 0,
    ctor: function () {
        this._super();
        this.clubid = 0;
        this.clubRoomIndex = 0;
    },
    show: function () {
        //if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS) {
        //    cc.spriteFrameCache.removeUnusedSpriteFrames();
        //    cc.textureCache.removeUnusedTextures();
        //}
        cc.spriteFrameCache.addSpriteFrames(res.shi_sanshuiplist);

        this.node = this.game.uimgr.createnode(res.halluijson, true);

        if (gameclass.test == "true") {
            ccui.helper.seekWidgetByName(this.node, "btnHuoDong").setVisible(false);
        }

        var panel = new ccui.Layout();
        panel.setLocalZOrder(2222);
        this.addChild(panel);
        panel.setContentSize(cc.winSize.width, cc.winSize.height);

        // this.touchAnim = new sp.SkeletonAnimation(res.touchAnimatejson, res.touchAnimateatlas);
        // this.touchAnim.setAnimation(0, 'animation', false);
        // this.touchAnim.setAnchorPoint(0.5, 0.5);
        // panel.addChild(this.touchAnim);
        // this.touchAnim.setVisible(false);
        var _this = this;
        // cc.eventManager.addListener(cc.EventListener.create({
        //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //     swallowTouches: false,
        //     onTouchBegan: function (touch, event) {
        //         _this.touchAnim.setOpacity(255);
        //         _this.touchAnim.setVisible(true);
        //         _this.touchAnim.setPosition(touch.getLocation());
        //         _this.touchAnim.setAnimation(0, 'animation', false);
        //         return true;
        //     },
        //     onTouchMoved: function (touch, event) {
        //     },
        //     onTouchEnded: function (touch) {
        //     },
        // }), panel);


        if (window.wx) {
            gameclass.mod_platform.wxshare("傲世娱乐", 0, "大家一起过来玩吧。")
        }

        this.p_mail = ccui.helper.seekWidgetByName(this.node, "mail_d");
        this.p_mail.setVisible(this.game.modmgr.mod_center.isViewMailPoint());

        this.addChild(this.node);

        var _this = this;

        //商城
        gameclass.createbtnpress(this.node, "btnHuoDong", function () {

            //////////////////////del at 20180228/////////////////////////
            var name = encodeURI(_this.game.modmgr.mod_login.logindata.name);
            cc.sys.openURL("http://asyl.190youxi.com/asqp_host/Pay/MobilePay/index/uid/" + _this.game.modmgr.mod_login.logindata.uid + "/nickname/" + name);
            ////////////////////////////////////////////////////////////

            //_this.game.uimgr.showui("gameclass.goldShop");
        });

        //this.btn_jinbi = ccui.helper.seekWidgetByName(this.node, "btn_jinbi");
        //this.btn_jinbi.setVisible(false);
        //if(gameclass.servertype == 1) {
        //    this.btn_jinbi.setVisible(false);
        //} else {
        //    this.btn_jinbi.setVisible(true);
        //    gameclass.createbtnpress(this.node, "btn_jinbi", function () {
        //        _this.game.uimgr.showui("gameclass.goldhall");
        //        _this.game.uimgr.closeui("gameclass.hallui");
        //    });
        //}

        var hallPanel = ccui.helper.seekWidgetByName(this.node, "hallPanel");
        hallPanel.setVisible(true);
        var hallPanel1 = ccui.helper.seekWidgetByName(this.node, "hallPanel1");
        hallPanel1.setVisible(false);
        this.wchat = ccui.helper.seekWidgetByName(this.node, "hallWeiXinText");
      //  var btn_right = ccui.helper.seekWidgetByName(this.node, "btn_right");
        //var btn_left = ccui.helper.seekWidgetByName(this.node, "btn_left");
      //  btn_left.setVisible(false);

        var grilPanel = ccui.helper.seekWidgetByName(this.node, "grilSp");
        var grilAnim = new sp.SkeletonAnimation(res.grilAnimatejson, res.grilAnimateatlas);
        grilAnim.setAnimation(0, 'animation', true);
        grilAnim.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        grilPanel.addChild(grilAnim);
        grilAnim.setVisible(true);

        grilPanel.getChildByName("touchGrilBtn").addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                // cc.log("touGril");
                cc.audioEngine.stopAllEffects();
                mod_sound.playeffect(g_music["touchGrilMp3"], false);
            }
        });

        // hallPanel.addChild(clipping.getClipnode(_this.ready_Btn,this.Light,2));
        var levelUpJson = ccs.load(res.halluijson);
        // levelUpJson.node;
        this.action = levelUpJson.action;
        this.node.runAction(this.action);
        //cocosStudio执行帧数
        this.action.gotoFrameAndPlay(0, 30, true);
        var _obj = null;
        var localStr = cc.sys.localStorage.getItem(gameclass.ruleLocalStorageHead);
        if (localStr) _obj = JSON.parse(localStr);
        var wanfaImg = ccui.helper.seekWidgetByName(this.node, "wanfaImg");
        wanfaImg.setVisible(true);
        wanfaImg.removeAllChildren(true);
        var _sp = null;
        if (!_obj) _sp = new cc.Sprite(res.wanfaImg0);
        else {
            // cc.log("_obj.panel=" + _obj.panel);
            _sp = new cc.Sprite(res["wanfaImg" + (Number(_obj.panel) + 1)]);
        }
        _sp.setPosition(wanfaImg.width / 2, wanfaImg.height / 2);
        wanfaImg.addChild(_sp);
        var animatePanel = ccui.helper.seekWidgetByName(this.node, "animatePanel");
        var sucAnim = new sp.SkeletonAnimation(res.hall_animate_json, res.hall_animate_atlas);
        sucAnim.setAnimation(0, 'animation', true);
        sucAnim.setAnchorPoint(0.5, 0.5);
        sucAnim.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        animatePanel.addChild(sucAnim);
        sucAnim.setVisible(true);

        var createBtn = ccui.helper.seekWidgetByName(this.node, "createRoom");
        var sucAnim = new sp.SkeletonAnimation(res.createAnimatejson, res.createAnimateatlas);
        sucAnim.setAnimation(0, 'animation', true);
        sucAnim.setAnchorPoint(0.5, 0.5);
        sucAnim.setPosition(createBtn.width * 0.5, createBtn.height * 0.5);
        createBtn.addChild(sucAnim);
        sucAnim.setVisible(true);

        var joinBtn = ccui.helper.seekWidgetByName(this.node, "joinRoom");
        var sucAnim = new sp.SkeletonAnimation(res.joinAnimatejson, res.joinAnimateatlas);
        sucAnim.setAnimation(0, 'animation', true);
        sucAnim.setAnchorPoint(0.5, 0.5);
        sucAnim.setPosition(joinBtn.width * 0.5, joinBtn.height * 0.5);
        joinBtn.addChild(sucAnim);
        sucAnim.setVisible(true);

        if (gameclass.test == "true") {
            ccui.helper.seekWidgetByName(this.node, "gonggao").setVisible(false);
        }

        var xinpinBtn = ccui.helper.seekWidgetByName(this.node, "btn_createItem4");
        var xinpinAnim = new sp.SkeletonAnimation(res.xinpinAnimatejson, res.xinpinAnimateatlas);
        xinpinAnim.setAnimation(0, 'animation', true);
        //xinpinAnim.setAnchorPoint(1,1);
        xinpinAnim.setPosition(xinpinBtn.width - 50, xinpinBtn.height - 65);
        xinpinBtn.addChild(xinpinAnim);
        xinpinAnim.setVisible(true);

        var createBg = ccui.helper.seekWidgetByName(this.node, "createBg");
        var goldSceneBtn = ccui.helper.seekWidgetByName(this.node, "goldSceneBtn");
        var clubSceneBtn = ccui.helper.seekWidgetByName(this.node, 'clubSceneBtn');

        var sucAnim = new sp.SkeletonAnimation(res.jinbichangAnimatejson, res.jinbichangAnimateatlas);
        sucAnim.setAnimation(0, 'animation', true);
        sucAnim.setAnchorPoint(0.5, 0.5);
        sucAnim.setPosition(goldSceneBtn.width * 0.5, goldSceneBtn.height * 2 / 3);
        goldSceneBtn.addChild(sucAnim);
        sucAnim.setVisible(true);

        //大厅改版
        var quitBtn = ccui.helper.seekWidgetByName(_this.node, "quitBtn");
        quitBtn.setVisible(false);
        quitBtn.setTouchEnabled(false);

        var clubAni = new sp.SkeletonAnimation(res.julebuAnimatejson, res.julebuAnimateatlas);
        clubAni.setAnimation(0, 'animation', true);
        clubAni.setAnchorPoint(0.5, 0.5);
        clubAni.setPosition(clubSceneBtn.width * 0.5, clubSceneBtn.height / 2 - 10);
        clubSceneBtn.addChild(clubAni);
        //end

        joinBtn.x += 400;
        createBtn.x += 400;
        createBg.x += 400;
        goldSceneBtn.x += 400;
        clubSceneBtn.x += 400;

        joinBtn.runAction(cc.moveBy(0.3, cc.p(-400, 0)).easing(cc.easeBackIn()));
        createBtn.runAction(cc.moveBy(0.3, cc.p(-400, 0)).easing(cc.easeBackIn()));
        createBg.runAction(cc.moveBy(0.3, cc.p(-400, 0)).easing(cc.easeBackIn()));
        goldSceneBtn.runAction(cc.moveBy(0.3, cc.p(-400, 0)).easing(cc.easeBackIn()));
        clubSceneBtn.runAction(cc.moveBy(0.3, cc.p(-400, 0)).easing(cc.easeBackIn()));

        var upBg = ccui.helper.seekWidgetByName(this.node, "upbg");
        upBg.y += 400;
        upBg.runAction(cc.moveBy(0.3, cc.p(0, -400)).easing(cc.easeBackIn()));

        var pmdbbg = ccui.helper.seekWidgetByName(this.node, "Image_1");
        pmdbbg.x -= 400;
        pmdbbg.runAction(cc.moveBy(0.3, cc.p(400, 0)).easing(cc.easeBackIn()));

        var gonggao = ccui.helper.seekWidgetByName(this.node, "gonggao");
        gonggao.x -= 400;
        gonggao.runAction(cc.moveBy(0.3, cc.p(400, 0)).easing(cc.easeBackIn()));

        //var isOpenInvite = _this.game.modmgr.mod_login.isOpenInvite();
        //if(isOpenInvite){
        //    this.node.scheduleOnce(function(){
        //        _this.game.uimgr.showui("gameclass.zhaomu");
        //    },0.4);
        //}

        createBtn.addTouchEventListener(function (sender, type) {
            if (ccui.Widget.TOUCH_BEGAN == type) {
                sender.setScale(1.1);
            } else if (ccui.Widget.TOUCH_ENDED == type) {
                sender.setScale(1);
                var localStr = cc.sys.localStorage.getItem(gameclass.ruleLocalStorageHead);
                var _obj = null;
                if (localStr) _obj = JSON.parse(localStr);
                if (!_obj) {
                    _this._showPanel2(true);
                } else {
                    if (_obj.panel == gameclass.hallui.INDEX_KAWUXIN) {
                        _this.game.uimgr.showui("gameclass.createKwxRoomUi", null, null, null, "gameclass.createroomui");
                    } else {
                        _this.game.uimgr.showui("gameclass.createroomui");
                        _this.game.uimgr.uis["gameclass.createroomui"].setGameType(Number(_obj.panel));
                    }
                    _this.btnCallBack(sender);
                }
            } else if (ccui.Widget.TOUCH_CANCELED == type) {
                sender.setScale(1);
            }
        });

        gameclass.createbtnpress(this.node, "btn_createChange", function () {
            _this._showPanel2(true);
        });
        gameclass.createbtnpress(this.node, "btn_tuijianren", function () {
            ////////////////////////del at 20180301///////////////
            //////////////////add at 20180301 tl/////////////////////////////
            _this.game.modmgr.mod_login.getTokey(function(_token){
                cc.sys.openURL("http://asyl.190youxi.com/asqp_ht/index/auth/token/"+_token);
            })
            ///////////////////////////////////////////////////////////
        });

        gameclass.createbtnpress(this.node, "hall_copyBtn", function () {
            var str = ccui.helper.seekWidgetByName(_this.node, "hallWeiXinText").getString();
            gameclass.mod_platform.copyStr(str);
        });
        gameclass.createbtnpress(this.node, "quitBtn", function () {
            _this.game.uimgr.showui("gameclass.msgboxui");
            _this.game.uimgr.uis["gameclass.msgboxui"].setString("确定退出游戏吗?", function () {
                _this.game.modmgr.mod_login.backlogin();
            });
            _this.btnCallBack(ccui.helper.seekWidgetByName(_this.node, "quitBtn"));
        });
        //gameclass.createbtnpress(this.node, "btn_right", function () {
        //    hallPanel1.getChildByName("itemPanel").x -= cc.winSize.width;
        //    btn_right.setVisible(false);
        //    btn_left.setVisible(true);
        //});
        //gameclass.createbtnpress(this.node, "btn_left", function () {
        //    hallPanel1.getChildByName("itemPanel").x += cc.winSize.width;
        //    btn_right.setVisible(true);
        //    btn_left.setVisible(false);
        //});

        var input = ccui.helper.seekWidgetByName(this.node, "TextField_1");
        var head = ccui.helper.seekWidgetByName(this.node, "headback");

        gameclass.mod_base.showtximg(head, this.game.modmgr.mod_login.logindata.imgurl, 0, 0, "im_headbg2");
        //head.setOpacity(0);
        var name = ccui.helper.seekWidgetByName(this.node, "name");
        var id = ccui.helper.seekWidgetByName(this.node, "id");
        var card = ccui.helper.seekWidgetByName(this.node, "money");
        name.setString(this.game.modmgr.mod_login.logindata.name);
        //name.setString("这是一个超长的名字字符的名字字符");
        id.setString("ID:" + this.game.modmgr.mod_login.logindata.uid);
        card.setString(this.game.modmgr.mod_login.logindata.card);

        var gold = ccui.helper.seekWidgetByName(this.node, "gold");
        var text = gameclass.changeShow(this.game.modmgr.mod_login.logindata.gold);
        gold.setString(text);

        var joinBtn = ccui.helper.seekWidgetByName(this.node, "joinRoom");
        joinBtn.addTouchEventListener(function (sender, type) {
            if (ccui.Widget.TOUCH_BEGAN == type) {
                sender.setScale(1.1);
            } else if (ccui.Widget.TOUCH_ENDED == type) {
                sender.setScale(1);
                _this.game.uimgr.showui("gameclass.jionroomui");
                _this.btnCallBack(sender);
            } else if (ccui.Widget.TOUCH_CANCELED == type) {
                sender.setScale(1);
            }
        });

        gameclass.createbtnpress(this.node, "backPanelBtn", function () {
            if (_this.clubid > 0) {
                this.game.uimgr.closeui("gameclass.hallui");
            }
            _this._showPanel2(false);
        });
        var _childItemPanelArr = ccui.helper.seekWidgetByName(this.node, "itemPanel").getChildren();
        for (var i = 0; i < _childItemPanelArr.length; i++) {
            // if(i==4){
            //     _childItemPanelArr[i].setTag(5);
            // }else if(i==5){
            //     _childItemPanelArr[i].setTag(6);
            // } else if(i==6){
            //     _childItemPanelArr[i].setTag(7);
            // } else if(i==7){
            //     _childItemPanelArr[i].setTag(8);
            // } else if(i==8){
            //     _childItemPanelArr[i].setTag(9);
            // } else{
                _childItemPanelArr[i].setTag(i);
            //}

            // cc.log("i------------" + i);
            _childItemPanelArr[i].addTouchEventListener(function (sender, type) {

                if (ccui.Widget.TOUCH_ENDED == type) {
                    var _tag = sender.getTag();

                    // cc.log("_tag=" + _tag + ",type=" + type);
                    // if(_tag==10){
                    //     sender.setVisible(false);
                    //     var sec = new gameclass.animation();
                    //     sec.Init(res["shi_sanshuiplist"], "shisan", 4, 0.05, false, function () {
                    //     });
                    //     sec.setAnchorPoint(0.5,0.5);
                    //     var btnAnimatePanel = ccui.helper.seekWidgetByName(_this.node, "btnAnimatePanel");
                    //     var worldPos = sender.getParent().convertToWorldSpace(sender.getPosition());
                    //     var _pos = btnAnimatePanel.convertToNodeSpace(worldPos);
                    //     _pos.y -= 25;
                    //     sec.setPosition(_pos);
                    //     //huo.setTag(1111);
                    //     btnAnimatePanel.addChild(sec);
                    // }else {
                    //    sender.setVisible(false);
                    //    var sucAnim = new sp.SkeletonAnimation(res["btnAnimatejson" + _tag], res["btnAnimateatlas" + _tag]);
                    //    sucAnim.setAnchorPoint(0.5, 0.5);
                    //    var btnAnimatePanel = ccui.helper.seekWidgetByName(_this.node, "btnAnimatePanel");
                    //    var hallPanel1 = ccui.helper.seekWidgetByName(_this.node, "hallPanel1");
                    //    var worldPos = sender.getParent().convertToWorldSpace(sender.getPosition());
                    //    var _pos = btnAnimatePanel.convertToNodeSpace(worldPos);
                    //    _pos.y -= 25;
                    //    sucAnim.setPosition(_pos);
                    //    btnAnimatePanel.addChild(sucAnim);
                    //
                    //    sucAnim.setAnimation(0, 'animation', false);
                    //    sucAnim.setVisible(true);
                    //}

                    mod_sound.playeffect(g_music["unselectMp3"], false);
                    _this.scheduleOnce(function () {
                        if (_tag == gameclass.hallui.INDEX_KAWUXIN) {
                            _this.game.uimgr.showui("gameclass.createKwxRoomUi", null, null, null, "gameclass.createroomui");
                            if (_this.clubid > 0) {
                                this.game.uimgr.uis["gameclass.createroomui"].setclubid(_this.clubid, _this.clubRoomIndex);
                            }
                        } else {
                            _this.game.uimgr.showui("gameclass.createroomui");
                            _this.game.uimgr.uis["gameclass.createroomui"].setGameType(_tag, _this.clubid, _this.clubRoomIndex);
                        }

                        var btnAnimatePanel = ccui.helper.seekWidgetByName(_this.node, "btnAnimatePanel");
                        btnAnimatePanel.removeAllChildren(true);
                        sender.setVisible(true);
                    }, 1)
                }
            })
        }

        ccui.helper.seekWidgetByName(this.node, "btn_ZhanJi").addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                _this.game.uimgr.showui("gameclass.recordPlayList");
                _this.btnCallBack(sender);
            }
        });
        ccui.helper.seekWidgetByName(this.node, "btnMessage").addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                _this.game.uimgr.showui("gameclass.mail");
                _this.btnCallBack(sender);
            }
        });
        ccui.helper.seekWidgetByName(this.node, "share").addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                _this.game.uimgr.showui("gameclass.gameShare");
                _this.btnCallBack(sender);
            }
        });
        ccui.helper.seekWidgetByName(this.node, "btnSetting").addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                _this.game.uimgr.showui("gameclass.settingui");
                _this.game.uimgr.uis["gameclass.settingui"].btn_change.setVisible(true);
                _this.btnCallBack(sender);
            }
        });
        // ccui.helper.seekWidgetByName(this.node, "buyroomcard").addTouchEventListener(function (sender, type) {
        //     if (type == ccui.Widget.TOUCH_ENDED) {
        //         if (gameclass.test == "true") {
        //             _this.game.uimgr.showui("gameclass.auditLayer");
        //         } else {
         //            _this.game.uimgr.showui("gameclass.buycardui");
        //         }
        //         _this.btnCallBack(sender);
        //     }
        // });
        var check = ccui.helper.seekWidgetByName(this.node, "check");
        var actuallyBg = ccui.helper.seekWidgetByName(this.node, "actually");
        check.addTouchEventListener(function (sender, type) {
            actuallyBg.getChildByName('actuallyMoney').setString("当前金币:" + _this.game.modmgr.mod_login.logindata.gold);
            if (type == ccui.Widget.TOUCH_BEGAN) {
                actuallyBg.setVisible(true);
            } else if (type == ccui.Widget.TOUCH_ENDED) {
                actuallyBg.setVisible(false);
            } else if (type == ccui.Widget.TOUCH_CANCELED) {
                actuallyBg.setVisible(false);
            }
        });
        gameclass.createbtnpress(this.node, "buygold", function () {
            _this.game.uimgr.showui("gameclass.goldShop");
        });
        gameclass.createbtnpress(this.node, "headback", function () {
            _this.game.uimgr.showui("gameclass.personalSetLayer").setBaseInfo();
            //var layout = new gameclass.cuoPLayer([11,12,13,14,32]);
            //_this.node.addChild(layout);
        });

        this.updategonggao();
        this.updateareainfo();

        this.schedule(function () {
            this.game.modmgr.mod_center.getmapinfo();
        }, 1);

        if (g_will_room != 0) {
            _this.game.modmgr.mod_login.joinwithroomid(g_will_room);
            g_will_room = 0;
        }

        goldSceneBtn.addTouchEventListener(function (sender, type) {
            if (ccui.Widget.TOUCH_BEGAN == type) {
                sender.setScale(1.1);
            } else if (ccui.Widget.TOUCH_ENDED == type) {
                sender.setScale(1);
                _this.game.uimgr.showui("gameclass.hallGoldui");
            } else if (ccui.Widget.TOUCH_CANCELED == type) {
                sender.setScale(1);
            }
        });

        clubSceneBtn.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                _this.game.uimgr.showui("gameclass.clubinfosmyself");
                _this.game.modmgr.mod_center.mod_club.sendgetclubs();
                _this.btnCallBack(sender);
                // _this.game.uimgr.showui("gameclass.msgboxui");
                // _this.game.uimgr.uis["gameclass.msgboxui"].setString("俱乐部维护中...");
            }
        });

        //招募
    },
    btnCallBack: function (_btnNode) {
        _btnNode.setTouchEnabled(false);
        _btnNode.runAction(cc.sequence(cc.delayTime(0.15), cc.callFunc(function () {
            _btnNode.setTouchEnabled(true);
        })))
    },
    /**
     * 创建房间
     * @param index 游戏索引
     * @param isDefaultCreate 是否按该游戏默认设置立即创建。如果是否，则弹出创建房间设置界面
     */
    createRoom: function (index, isDefaultCreate) {
        if (index == gameclass.hallui.INDEX_KAWUXIN) {
            _this.game.uimgr.showui("gameclass.createKwxRoomUi", null, null, null, "gameclass.createroomui");
        } else {
            _this.game.uimgr.showui("gameclass.createroomui");
        }
        if (isDefaultCreate) {
            _this.game.uimgr.showui("gameclass.createroomui");
            _this.game.uimgr.uis["gameclass.createroomui"].setVisible(false);
            _this.game.uimgr.uis["gameclass.createroomui"]._btnOkCallBack(_str);
        } else {
            _this.game.uimgr.uis["gameclass.createroomui"].setGameType(index);
        }
    },
    setclubid: function (cid, setRoomIndex) {
        this.clubid = cid;
        this.clubRoomIndex = setRoomIndex;
        this._showPanel2(true);
    },
    _showPanel2: function (_isShow) {
        var hallPanel = ccui.helper.seekWidgetByName(this.node, "hallPanel");
        hallPanel.setVisible(!_isShow);
        var hallPanel1 = ccui.helper.seekWidgetByName(this.node, "hallPanel1");
        hallPanel1.setVisible(_isShow);
    },
    update: function () {
        var card = ccui.helper.seekWidgetByName(this.node, "money");
        card.setString(this.game.modmgr.mod_login.logindata.card);

        var gold = ccui.helper.seekWidgetByName(this.node, "gold");
        var text = gameclass.changeShow(this.game.modmgr.mod_login.logindata.gold);
        gold.setString(text);
    },
    updategonggao: function () {
        var gg = ccui.helper.seekWidgetByName(this.node, "pmdInfo");
        gg.setString(this.game.modmgr.mod_center.gonggao);
        gg.ignoreContentAdaptWithSize(true);

        //gg.setPosition(cc.p(666,16));

        gg.stopAllActions();
        var act = cc.repeatForever(cc.sequence(cc.moveTo(20, cc.p(0 - gg.getContentSize().width, gg.getPosition().y)), cc.moveTo(0, cc.p(ccui.helper.seekWidgetByName(this.node, "pmdBack").getContentSize().width, gg.getPosition().y))));
        gg.runAction(act);
    },
    updateareainfo: function () {
        //if (this.game.modmgr.mod_center.areainfo == null) {
        //    this.wchat.setString("asnn999");
        //    return;
        //} else {
        //    if (this.game.modmgr.mod_center.areainfo.wchat == "") {
        //        this.wchat.setString("asnn999");
        //    } else {
        //        this.wchat.setString(this.game.modmgr.mod_center.areainfo.wchat);
        //    }
        //}
        this.wchat.setString("傲世娱乐");
        //this.wchat.setString(this.game.modmgr.mod_center.areainfo.wchat);
        //this.wchat.ignoreContentAdaptWithSize(true);
    },
    updateMailPoint: function () {
        this.p_mail.setVisible(this.game.modmgr.mod_center.isViewMailPoint());
    },
    updateUIMsg: function (msgtype) {
        if (msgtype == "updcard") {
            this.update();
        } else if (msgtype == "noticeinfo") {
            this.updateMailPoint();
        }
        return false;
    },
    //招募
    destroy: function () {
        //cc.log("hallui destroy...");
    },
});

/**
 * 卡五星按钮索引
 * @type {number}
 */
gameclass.hallui.INDEX_KAWUXIN = 9;