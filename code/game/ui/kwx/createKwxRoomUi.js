/**
 * Created by yang on 2016/11/9.
 */

gameclass.createKwxRoomUi = gameclass.baseui.extend({
    sprite: null,
    node: null,
    jsonfile: null,
    //add by lish 2017-10-24
    kwxtype: 2,   // 2孝感卡五星、3襄阳卡五星、4 十堰卡五星、5随州卡五星
    num: 1,    // 局数的倍数
    param: [0, 0, 0, 0, 0, 0, 0, 0, 0],  // 参数，9位数。
    param0: [0, 0, 0],
    BaseLocalData: {},
    dataName: ["DIQUWANFA", "XGGUIZI", "XYGUIZI", "SYGUIZI", "SZGUIZI", "YICGUIZI", "YCGUIZI"],
    typeArr: [2, 3, 4, 5, 6, 7],
    clubid:0,
    clubRoomIndex:0,
    //add end
    ctor: function () {
        this._super();
        this.clubid = 0;
        this.clubRoomIndex = 0;
    },
    setclubid: function (cid, $clubRoomIndex) {
        this.clubid = cid;
        this.clubRoomIndex = $clubRoomIndex;
    },
    show: function (isDefaultCreate) {
        this.node = this.game.uimgr.createnode(res.createroomjson9, true);
        this.addChild(this.node);
        var _this = this;

        this.BaseLocalData = {};
        this.dataName = ["DIQUWANFA", "XGGUIZI", "XYGUIZI", "SYGUIZI", "SZGUIZI", "YICGUIZI", "YCGUIZI"];
        _this.BaseLocalData.setItem = function (dataName, DataParam) {
            var baseData = JSON.stringify(DataParam);
            cc.sys.localStorage.setItem(dataName, baseData);
        };
        _this.BaseLocalData.getItem = function (dataName) {
            var baseDataa = cc.sys.localStorage.getItem(dataName);
            baseDataa = JSON.parse(baseDataa);
            return baseDataa;
        };
        this.kwxtype = 2;   // 2孝感卡五星、3襄阳卡五星、4 十堰卡五星、5随州卡五星
        this.num = 1;    // 局数的倍数
        this.param = [0, 0, 0, 0, 0, 0, 0, 0, 0];  // 参数，9位数。
        this.param0 = [0, 0, 0];
        // 对应4种不同玩法，最下一行的选择容器
        var xiaoganPage = ccui.helper.seekWidgetByName(this.node, "page0");
        var xiangyangPage = ccui.helper.seekWidgetByName(this.node, "page1");
        var shiyanPage = ccui.helper.seekWidgetByName(this.node, "page2");
        var yingchenPage = ccui.helper.seekWidgetByName(this.node, "page3");

        // 选择局数
        var xzjs1Btn = ccui.helper.seekWidgetByName(this.node, "xzjs1");
        var xzjs2Btn = ccui.helper.seekWidgetByName(this.node, "xzjs2");
        var fk1Text = ccui.helper.seekWidgetByName(this.node, "fangka1");
        var fk2Text = ccui.helper.seekWidgetByName(this.node, "fangka2");
        // 最大番数
        var zdfs1Btn = ccui.helper.seekWidgetByName(this.node, "zdfs1");
        var zdfs2Btn = ccui.helper.seekWidgetByName(this.node, "zdfs2");
        var max8text = ccui.helper.seekWidgetByName(this.node, "maxfanshu8");
        var max16text = ccui.helper.seekWidgetByName(this.node, "maxfanshu16");
        // 加漂
        var jp1Btn = ccui.helper.seekWidgetByName(this.node, "jp1");
        var jp2Btn = ccui.helper.seekWidgetByName(this.node, "jp2");
        var jp1Text = ccui.helper.seekWidgetByName(this.node, "bujiapiao");
        var jp2Text = ccui.helper.seekWidgetByName(this.node, "xuanjiapiao");
        //卡五星番数
        var kwx1Btn = ccui.helper.seekWidgetByName(this.node, "kwx1");
        var kwxText = ccui.helper.seekWidgetByName(this.node, "kawuxing");
        var ccp1X = kwx1Btn.getPositionX();
        // 碰碰胡
        var pph1Btn = ccui.helper.seekWidgetByName(this.node, "pph1");
        var pphText = ccui.helper.seekWidgetByName(this.node, "pengpHu");
        var ccp2X = pph1Btn.getPositionX();
        //买马
        var bumaimaBtn = ccui.helper.seekWidgetByName(this.node, "bumaima");
        var ccp3Y = bumaimaBtn.getPositionY();
        var nomaP1 = ccui.helper.seekWidgetByName(this.node, "nomatxt");
        var liangdaoBtn = ccui.helper.seekWidgetByName(this.node, "liangdao");
        var ldzmP3 = ccui.helper.seekWidgetByName(this.node, "ldMMtxt");
        var zimoBtn = ccui.helper.seekWidgetByName(this.node, "zimo");
        var ccp4X = zimoBtn.getPositionX();
        var zimoP3 = ccui.helper.seekWidgetByName(this.node, "zimoMMtxt");
        var dumaBtn = ccui.helper.seekWidgetByName(this.node, "duma");
        var dumaP1 = ccui.helper.seekWidgetByName(this.node, "dumatxt");
        var mailiumaBtn = ccui.helper.seekWidgetByName(this.node, "mailiuma");
        var ma6P1 = ccui.helper.seekWidgetByName(this.node, "ma6P1");
        dumaBtn.setVisible(false);
        mailiumaBtn.setVisible(false);
        var ccp3X = mailiumaBtn.getPositionX();
        var ccp4Y = mailiumaBtn.getPositionY();
        // 数坎（孝感玩法）
        var shukan1Btn = ccui.helper.seekWidgetByName(this.node, "shukan");
        var ccp2Y = shukan1Btn.getPositionY();
        var shukanText = ccui.helper.seekWidgetByName(this.node, "shukantxt");
        var dldfBtn = ccui.helper.seekWidgetByName(this.node, "dldf");
        var dldfText = ccui.helper.seekWidgetByName(this.node, "dldftxt");
        //荒庄赔胡==查大叫  全频道(襄阳玩法)
        var quanpindaoBtn = ccui.helper.seekWidgetByName(this.node, "quanpindao1");
        var banpindaoBtn = ccui.helper.seekWidgetByName(this.node, "banpindao1");
        var qpdP1 = ccui.helper.seekWidgetByName(this.node, "qpdP1");
        var bpdP1 = ccui.helper.seekWidgetByName(this.node, "bpdP1");
        var huangzhuang1Btn = ccui.helper.seekWidgetByName(this.node, "chajiao1");
        var huanghp1 = ccui.helper.seekWidgetByName(this.node, "chajiaotxt1");
        //上楼 （十堰玩法）
        var quanpindao2Btn = ccui.helper.seekWidgetByName(this.node, "quanpindao2");
        var qpdP2 = ccui.helper.seekWidgetByName(this.node, "qpdP2");
        var banpindao2Btn = ccui.helper.seekWidgetByName(this.node, "banpindao2");
        var bpdP2 = ccui.helper.seekWidgetByName(this.node, "bpdP2");
        var huangzhuang2Btn = ccui.helper.seekWidgetByName(this.node, "chajiao2");
        var huanghP2 = ccui.helper.seekWidgetByName(this.node, "chajiaotxt2");
        var shanglouBtn = ccui.helper.seekWidgetByName(this.node, "shanglou");
        var shanglouText = ccui.helper.seekWidgetByName(this.node, "shangloutxt");
        //跑恰摸八 （宜城玩法）
        var pqmbBtn = ccui.helper.seekWidgetByName(this.node, "pqmb");
        var pqmbText = ccui.helper.seekWidgetByName(this.node, "pqmbtxt");
        /*
         *       左侧玩法按钮事件     type: 孝感2   襄阳3   十堰4   随州5
         * */
        var PlayBtnArr = [];
        this.typeArr = [2, 3, 4, 5, 6, 7];
        var pageArr = [xiaoganPage, xiangyangPage, shiyanPage, yingchenPage];
        for (var i = 0; i < 6; i++) {
            PlayBtnArr[i] = ccui.helper.seekWidgetByName(this.node, "PlayBtn" + i);
            PlayBtnArr[i].setTag(i);
            PlayBtnArr[i].addTouchEventListener(function (sender, type) {
                switch (type) {
                    case ccui.Widget.TOUCH_ENDED:
                        chooseWanfaBtn(sender);
                        useRecord(_this.kwxtype);
                        break;
                }
            });
        }
        var chooseWanfaBtn = function (wanfaBtn) {
            for (var j = 0; j < PlayBtnArr.length; j++) {
                PlayBtnArr[j].getChildByName("playImg1").setVisible(false);
                // PlayBtnArr[j].getChildByName("playTextBtn").setBright(true);
                if (j < 4) pageArr[j].setVisible(false);
            }
            var tag = wanfaBtn.getTag();
            _this.kwxtype = _this.typeArr[tag];
            wanfaBtn.getChildByName("playImg1").setVisible(true);
            // wanfaBtn.getChildByName("playTextBtn").setBright(false);

            setBtnPositon(tag);
            bumaimaBtn.setVisible(true);
            if (tag == 3) {
                bumaimaBtn.setVisible(false);
                dumaBtn.setVisible(true);
                mailiumaBtn.setVisible(true);
                var status = 0;
                if (liangdaoBtn.isBright() && zimoBtn.isBright()) {
                    status = 1;
                    colorText(status, nomaP1, bumaimaBtn, ldzmP3, liangdaoBtn, zimoP3, zimoBtn);
                    _this.param[2] = 1;
                }
                if (dumaBtn.isBright() && mailiumaBtn.isBright()) {
                    status = 0;
                    colorText(status, dumaP1, dumaBtn, ma6P1, mailiumaBtn);
                    _this.param[6] = 1;
                }
            }
            else if (tag != 3 && tag != 5) {
                if (tag == 1 || tag == 2) {
                    if (!quanpindaoBtn.isBright())
                        huangzhuang1Btn.setVisible(true);
                    else
                        huangzhuang1Btn.setVisible(false);
                    if (!quanpindao2Btn.isBright())
                        huangzhuang2Btn.setVisible(true);
                    else
                        huangzhuang2Btn.setVisible(false);
                }
                if (tag == 4) tag = 3;
                pageArr[tag].setVisible(true);
            }
            if (!bumaimaBtn.isEnabled()) {
                dumaBtn.setVisible(false);
                mailiumaBtn.setVisible(false);
            }
        };
        var setBtnPositon = function (_index) {
            if (_index == 3) {
                pph1Btn.setPositionX(ccp3X);
                liangdaoBtn.setPosition(cc.p(ccp1X, ccp2Y));
                zimoBtn.setPosition(cc.p(ccp3X, ccp2Y));
                dumaBtn.setPosition(cc.p(ccp1X, ccp3Y));
                mailiumaBtn.setPosition(cc.p(ccp3X, ccp3Y));
            }
            else if (_index == 5) {
                pph1Btn.setPositionX(ccp2X);
                bumaimaBtn.setPositionY(ccp2Y);
                liangdaoBtn.setPosition(cc.p(ccp2X, ccp2Y));
                zimoBtn.setPosition(cc.p(ccp4X, ccp2Y));
                dumaBtn.setPosition(cc.p(ccp1X, ccp3Y));
                mailiumaBtn.setPosition(cc.p(ccp2X, ccp3Y));
            }
            else {
                pph1Btn.setPositionX(ccp2X);
                bumaimaBtn.setPositionY(ccp3Y);
                liangdaoBtn.setPosition(cc.p(ccp2X, ccp3Y));
                zimoBtn.setPosition(cc.p(ccp4X, ccp3Y));
                dumaBtn.setPosition(cc.p(ccp1X, ccp4Y));
                mailiumaBtn.setPosition(cc.p(ccp2X, ccp4Y));
            }
        };
        /*
         * 选择的监听  按钮状态 改变字体颜色
         * */
        var pottingfun = function (_btn, _txt, _bool, _color, _str) {
            _btn.setBright(_bool);
            // _txt.setTextColor(_color);
            _txt.setString("");
            _txt.setString(_str);
        };
        var colorText = function (status, t1, b1, t2, b2, t3, b3) {
            var text1 = t1.getString();
            if (b2 != null && t2 != null) {
                var text2 = t2.getString();
                switch (status) {
                    case 0:
                        pottingfun(b1, t1, false, cc.color(195, 51, 19), text1);
                        b2.setEnabled(true);
                        pottingfun(b2, t2, true, cc.color(170, 116, 72), text2);

                        if (t3 != null && b3 != null) {
                            var text3 = t3.getString();
                            b3.setEnabled(true);
                            pottingfun(b3, t3, true, cc.color(170, 116, 72), text3);
                        }
                        break;
                    case 1:
                        b1.setEnabled(true);
                        pottingfun(b1, t1, true, cc.color(170, 116, 72), text1);
                        pottingfun(b2, t2, false, cc.color(195, 51, 19), text2);

                        if (t3 != null && b3 != null) {
                            var text3 = t3.getString();
                            b3.setEnabled(true);
                            pottingfun(b3, t3, true, cc.color(170, 116, 72), text3);
                        }
                        break;

                    case 2:
                        b1.setEnabled(true);
                        pottingfun(b1, t1, true, cc.color(170, 116, 72), text1);
                        pottingfun(b2, t2, true, cc.color(170, 116, 72), text2);

                        if (t3 != null && b3 != null) {
                            var text3 = t3.getString();
                            pottingfun(b3, t3, false, cc.color(195, 51, 19), text3);
                        }
                        break;
                }
            }

            if (t3 == null && b3 == null && t2 == null && b2 == null && b1 == null) {
                // if (status) {
                //     t1.setTextColor(cc.color(195, 51, 19));
                // } else {
                //     t1.setTextColor(cc.color(170, 116, 72));
                // }
                t1.setString("");
                t1.setString(text1);
            }
        };
        var no_liangdao_zimo = function (_status) {
            var status = _status;
            colorText(status, nomaP1, bumaimaBtn, ldzmP3, liangdaoBtn, zimoP3, zimoBtn);
            if (status == 0) _this.param[6] = 0;
            else _this.param[2] = status - 1;
            dumaBtn.setVisible(status);
            mailiumaBtn.setVisible(status);
            if (dumaBtn.isBright() && mailiumaBtn.isBright() && status) {
                status = 0;
                colorText(status, dumaP1, dumaBtn, ma6P1, mailiumaBtn);
                _this.param[6] = 1;
            }
        }
        //记录
        var useRecord = function (wantype) {
            var storeType = _this.BaseLocalData.getItem(_this.dataName[0]);
            //cc.log("useRecord",storeType);
            if (storeType) {
                _this.kwxtype = wantype;
                if (_this.kwxtype == 0) {
                    _this.kwxtype = storeType[0].kwxtype;
                    chooseWanfaBtn(PlayBtnArr[_this.kwxtype - 2]);
                }
                var storeData = _this.BaseLocalData.getItem(_this.dataName[_this.kwxtype - 1]);
                if (storeData) {
                    if (_this.kwxtype > 5) {
                        var ListView_2 = ccui.helper.seekWidgetByName(_this.node, "ListView_2");
                        ListView_2.jumpToBottom();
                    }
                    var temp = 0;
                    colorText(storeData[0].jusu - 1, fk1Text, xzjs1Btn, fk2Text, xzjs2Btn);
                    _this.num = storeData[0].jusu;

                    colorText(storeData[1].fdfansu, max8text, zdfs1Btn, max16text, zdfs2Btn);
                    _this.param[3] = storeData[1].fdfansu;

                    colorText(storeData[2].jiapiao, jp1Text, jp1Btn, jp2Text, jp2Btn);
                    _this.param[4] = storeData[2].jiapiao;

                    colorText(storeData[3].kwxfansu, kwxText);
                    kwx1Btn.isDown = storeData[3].kwxfansu;
                    kwx1Btn.setBright(!storeData[3].kwxfansu);
                    _this.param[0] = storeData[3].kwxfansu;

                    colorText(storeData[4].pphgsk, pphText);
                    pph1Btn.isDown = storeData[4].pphgsk;
                    pph1Btn.setBright(!storeData[4].pphgsk);
                    _this.param[1] = storeData[4].pphgsk;

                    if (storeData[6].nm_dm_lm == 0) no_liangdao_zimo(0);
                    else {
                        no_liangdao_zimo(storeData[5].liangma_zm + 1);
                        if (storeData[6].nm_dm_lm == 2) temp = 1;
                        else temp = 0;
                        colorText(temp, dumaP1, dumaBtn, ma6P1, mailiumaBtn);
                        _this.param[6] = storeData[6].nm_dm_lm;
                    }
                    if (_this.kwxtype == _this.typeArr[0]) {
                        colorText(storeData[7].xg_shukan, shukanText);
                        shukan1Btn.isDown = storeData[7].xg_shukan;
                        shukan1Btn.setBright(!storeData[7].xg_shukan);
                        _this.param[5] = storeData[7].xg_shukan;

                        colorText(storeData[8].xg_dldf, dldfText);
                        dldfBtn.isDown = storeData[8].xg_dldf;
                        dldfBtn.setBright(!storeData[8].xg_dldf);
                        _this.param0[1] = storeData[8].xg_dldf;
                    }
                    else if (_this.kwxtype == _this.typeArr[1]) {
                        colorText(storeData[9].xyorsy_hzph, huanghp1);
                        huangzhuang1Btn.isDown = storeData[9].xyorsy_hzph;
                        huangzhuang1Btn.setBright(!storeData[9].xyorsy_hzph);
                        _this.param[7] = storeData[9].xyorsy_hzph;

                        if (storeData[10].xyorsy_banpindao_q) temp = 0;
                        else temp = 1;
                        colorText(temp, qpdP1, quanpindaoBtn, bpdP1, banpindaoBtn);
                        huangzhuang1Btn.setVisible(storeData[10].xyorsy_banpindao_q);
                        _this.param[8] = storeData[10].xyorsy_banpindao_q;
                    }
                    else if (_this.kwxtype == _this.typeArr[2]) {
                        colorText(storeData[9].xyorsy_hzph, huanghP2);
                        huangzhuang2Btn.isDown = storeData[9].xyorsy_hzph;
                        huangzhuang2Btn.setBright(!storeData[9].xyorsy_hzph);
                        _this.param[7] = storeData[9].xyorsy_hzph;

                        if (storeData[10].xyorsy_banpindao_q) temp = 0;
                        else temp = 1;
                        colorText(temp, qpdP2, quanpindao2Btn, bpdP2, banpindao2Btn);
                        huangzhuang2Btn.setVisible(storeData[10].xyorsy_banpindao_q);
                        _this.param[8] = storeData[10].xyorsy_banpindao_q;

                        colorText(storeData[11].sy_sl, shanglouText);
                        shanglouBtn.isDown = storeData[11].sy_sl;
                        shanglouBtn.setBright(!storeData[11].sy_sl);
                        _this.param0[0] = storeData[11].sy_sl;
                    }
                    else if (_this.kwxtype == _this.typeArr[4]) {
                        colorText(storeData[12].yic_pqmb, pqmbText);
                        pqmbBtn.isDown = storeData[12].yic_pqmb;
                        pqmbBtn.setBright(!storeData[12].yic_pqmb);
                        _this.param0[2] = storeData[12].yic_pqmb;
                    }
                }
            }
        };

        useRecord(0);
        var clickXzju1Btn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    colorText(0, fk1Text, xzjs1Btn, fk2Text, xzjs2Btn);
                    _this.num = 1;
                    break;
            }
        };
        xzjs1Btn.addTouchEventListener(clickXzju1Btn);
        var clickXzju2Btn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    colorText(1, fk1Text, xzjs1Btn, fk2Text, xzjs2Btn);
                    _this.num = 2;
                    break;
            }
        };
        xzjs2Btn.addTouchEventListener(clickXzju2Btn);

        var clickKwx1Btn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (sender.isDown) {
                        sender.isDown = false;

                    } else {
                        sender.isDown = true;
                    }
                    colorText(sender.isDown, kwxText);
                    _this.param[0] = !sender.isDown ? 0 : 1;
                    sender.setBright(!sender.isDown);
                    break;
            }
        };
        kwx1Btn.addTouchEventListener(clickKwx1Btn);

        var clickPph1Btn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (sender.isDown) {
                        sender.isDown = false;
                    } else {
                        sender.isDown = true;
                    }
                    colorText(sender.isDown, pphText);
                    _this.param[1] = !sender.isDown ? 0 : 1;
                    sender.setBright(!sender.isDown);
                    break;
            }
        };
        pph1Btn.addTouchEventListener(clickPph1Btn);

        var clickZdfs1Btn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    var status = 0;
                    colorText(status, max8text, zdfs1Btn, max16text, zdfs2Btn);
                    _this.param[3] = 0;
                    break;
            }
        };
        zdfs1Btn.addTouchEventListener(clickZdfs1Btn);

        var clickZdfs2Btn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    var status = 1;
                    colorText(status, max8text, zdfs1Btn, max16text, zdfs2Btn);
                    _this.param[3] = 1;
                    break;
            }
        };
        zdfs2Btn.addTouchEventListener(clickZdfs2Btn);

        var clickJp1Btn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    var status = 0;
                    colorText(status, jp1Text, jp1Btn, jp2Text, jp2Btn);
                    _this.param[4] = 0;
                    break;
            }
        };
        jp1Btn.addTouchEventListener(clickJp1Btn);
        var clickJp2Btn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    var status = 1;
                    colorText(status, jp1Text, jp1Btn, jp2Text, jp2Btn);
                    _this.param[4] = 1;
                    break;
            }
        };
        jp2Btn.addTouchEventListener(clickJp2Btn);

        var clickShukan1Btn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (sender.isDown) {
                        sender.isDown = false;
                    } else {
                        sender.isDown = true;
                    }
                    colorText(sender.isDown, shukanText);
                    _this.param[5] = !sender.isDown ? 0 : 1;
                    sender.setBright(!sender.isDown);
                    break;
            }
        };
        shukan1Btn.addTouchEventListener(clickShukan1Btn);

        //亮倒-自摸买马
        var clickLiangdaoBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    no_liangdao_zimo(1);
                    break;
            }
        };
        liangdaoBtn.addTouchEventListener(clickLiangdaoBtn);
        var clickZimoBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    no_liangdao_zimo(2);
                    break;
            }
        };
        zimoBtn.addTouchEventListener(clickZimoBtn);
        //不买马
        var clickBumaimaBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    no_liangdao_zimo(0);
                    break;
            }
        };
        bumaimaBtn.addTouchEventListener(clickBumaimaBtn);
        //独马
        var clickDumaBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    var status = 0;
                    colorText(status, dumaP1, dumaBtn, ma6P1, mailiumaBtn);
                    _this.param[6] = 1;
                    break;
            }
        };
        dumaBtn.addTouchEventListener(clickDumaBtn);
        //买6马
        var clickMailiumaBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    var status = 1;
                    colorText(status, dumaP1, dumaBtn, ma6P1, mailiumaBtn);
                    _this.param[6] = 2;
                    break;
            }
        };
        mailiumaBtn.addTouchEventListener(clickMailiumaBtn);
        /*
         * 全 半频道
         * */
        var clickQuanpindaoBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    var status = 0;
                    colorText(status, qpdP1, quanpindaoBtn, bpdP1, banpindaoBtn);
                    colorText(status, qpdP2, quanpindao2Btn, bpdP2, banpindao2Btn);
                    huangzhuang1Btn.setVisible(true);
                    huangzhuang2Btn.setVisible(true);
                    _this.param[8] = 1;
                    break;
            }
        };
        quanpindao2Btn.addTouchEventListener(clickQuanpindaoBtn);
        quanpindaoBtn.addTouchEventListener(clickQuanpindaoBtn);
        var clickBanpindaoBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    var status = 1;
                    colorText(status, qpdP1, quanpindaoBtn, bpdP1, banpindaoBtn);
                    colorText(status, qpdP2, quanpindao2Btn, bpdP2, banpindao2Btn);
                    huangzhuang1Btn.setVisible(false);
                    huangzhuang2Btn.setVisible(false);
                    _this.param[8] = 0;
                    break;
            }
        };
        banpindaoBtn.addTouchEventListener(clickBanpindaoBtn);
        banpindao2Btn.addTouchEventListener(clickBanpindaoBtn);

        var clickHzBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (sender.isDown) {
                        huangzhuang1Btn.isDown = false;
                        huangzhuang2Btn.isDown = false;
                    } else {
                        huangzhuang1Btn.isDown = true;
                        huangzhuang2Btn.isDown = true;
                    }
                    colorText(sender.isDown, huanghp1);
                    colorText(sender.isDown, huanghP2);
                    _this.param[7] = !sender.isDown ? 0 : 1;
                    huangzhuang1Btn.setBright(!sender.isDown);
                    huangzhuang2Btn.setBright(!sender.isDown);
                    break;
            }
        };
        huangzhuang1Btn.addTouchEventListener(clickHzBtn);
        huangzhuang2Btn.addTouchEventListener(clickHzBtn);

        var clickdldfBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (sender.isDown) {
                        sender.isDown = false;
                    } else {
                        sender.isDown = true;
                    }
                    colorText(sender.isDown, dldfText);
                    _this.param0[1] = !sender.isDown ? 0 : 1;
                    sender.setBright(!sender.isDown);
                    break;
            }
        };
        dldfBtn.addTouchEventListener(clickdldfBtn);

        var clickshanglouBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (sender.isDown) {
                        sender.isDown = false;
                    } else {
                        sender.isDown = true;
                    }
                    colorText(sender.isDown, shanglouText);
                    _this.param0[0] = !sender.isDown ? 0 : 1;
                    sender.setBright(!sender.isDown);
                    break;
            }
        };
        shanglouBtn.addTouchEventListener(clickshanglouBtn);

        var clickpqmbBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (sender.isDown) {
                        sender.isDown = false;
                    } else {
                        sender.isDown = true;
                    }
                    colorText(sender.isDown, pqmbText);
                    _this.param0[2] = !sender.isDown ? 0 : 1;
                    sender.setBright(!sender.isDown);
                    break;
            }
        };
        pqmbBtn.addTouchEventListener(clickpqmbBtn);
        /*
        * 给服务器 发送选择的消息
        * */
        var okBtn = ccui.helper.seekWidgetByName(this.node, "okBtn");
        okBtn.setTouchEnabled(true);
        var clickokBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    createHandle();
                    sender.setTouchEnabled(false);
                    break;
            }
        };
        okBtn.addTouchEventListener(clickokBtn);

        var backBtn = ccui.helper.seekWidgetByName(this.node, "backBtn");
        var clickbackBtn = function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    _this.game.uimgr.closeui("gameclass.createroomui");
                    break;
            }
        };
        backBtn.addTouchEventListener(clickbackBtn);

        var createHandle = function () {
            _this.createHandle();
        };

    }
});
gameclass.createKwxRoomUi.prototype.createHandle = function () {
    var _this = this;
    this.game.uimgr.closeui("gameclass.createroomui");

    var param1 = 0;
    var param2 = 0;
    for (var i = 0; i < 9; i++) {
        param1 = param1 * 10 + this.param[i];
    }
    for (var i = 0; i < 3; i++) {
        param2 = param2 * 10 + this.param0[i];
    }

    /**! param1
     const TYPE_KWX = 0  //! 卡五星番数 0两番 1四番
     const TYPE_PPH = 1  //! 碰碰胡/杠上炮番数 0两番 1四番
     const TYPE_DL = 2   //! 0必须亮牌自摸 1自摸即可
     const TYPE_ZDFS = 3 //! 最大番数 0八番 1十六番
     const TYPE_PIAO = 4 //! 是否加飘 0不加飘 1自选加飘
     const TYPE_SK = 5   //! 是否数坎 0不数坎 1数坎
     const TYPE_MM = 6   //! 是否买马 0不买马 1独马 2六马
     const TYPE_PH = 7   //! 是否荒庄赔胡 0不赔胡 1赔胡
     const TYPE_PD = 8   //! 频道 0半频道 1全频道
     const TYPE_MAX = 9
     //! param2
     const TYPE_SL = 0   //! 上楼   0不上楼  1上楼
     const TYPE_DLDF = 1 //! 对亮对番   0不对番  1对番
     const TYPE_PQMM = 2 //! 跑恰摸马   0不  1有
     const TYPE_MAX2 = 3
     */
    if (this.kwxtype == this.typeArr[3] && this.param[6] == 0) this.param[6] = 1;//随州默认独马
    var baseDatatype = [{kwxtype: _this.kwxtype}];
    var baseDataParam = [{jusu: _this.num}, {fdfansu: _this.param[3]}, {jiapiao: _this.param[4]}, {kwxfansu: _this.param[0]}, {pphgsk: _this.param[1]}, {liangma_zm: _this.param[2]}, {nm_dm_lm: _this.param[6]},
        {xg_shukan: _this.param[5]}, {xg_dldf: _this.param0[1]}, {xyorsy_hzph: _this.param[7]}, {xyorsy_banpindao_q: _this.param[8]}, {sy_sl: _this.param0[0]}, {yic_pqmb: _this.param0[2]}];
    //cc.log(param1,param2,param,param0)
    this.BaseLocalData.setItem(this.dataName[0], baseDatatype);
    this.BaseLocalData.setItem(this.dataName[this.kwxtype - 1], baseDataParam);
    var _type = this.kwxtype;
    if (_type == 6) _type = 13;
    else if (_type == 7) _type = 14;

    if(_this.clubid > 0) {
        // var data = {"cid":_this.clubid,"gametype":_type,"param1":param1,"param2":param2,"card":_this.num};
        // _this.game.modmgr.mod_center.mod_club.sendclubkaifang(data);
        //保存俱乐部开房记录
        // var recordinfo = {
        //     "gametype":_type,
        //     "card":_this.num,
        //     "maxstep":this.game.modmgr.mod_center.mod_club.getmaxstepbycardnum(_type,_this.num),
        //     "param1":param1,
        //     "param2":param2
        // };
        // staticFunction.setStorage(gameclass.clubStorageKey, _this.clubid + "-" + _type + "-" + _this.clubRoomIndex, recordinfo);
        // cc.sys.localStorage.setItem("clubgame"+_this.game.modmgr.mod_center.mod_club.getgameIndexbytype(_type),JSON.stringify(recordinfo));

        _this.game.uimgr.closeui("gameclass.createroomui");
        this.game.uimgr.closeui("gameclass.hallui");
        //gametype, param1, param2, num, $roomIndex
        _this.game.uimgr.uis["gameclass.clubmanger"].setClubRoom(_type, param1, param2, _this.num, _this.clubRoomIndex);
    }else{
        _this.game.modmgr.mod_login.createroom(_type, _this.num, param1, param2);
        var _obj = { panel: gameclass.hallui.INDEX_KAWUXIN };
        cc.sys.localStorage.setItem(gameclass.ruleLocalStorageHead, JSON.stringify(_obj));
    }
}