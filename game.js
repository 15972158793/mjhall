var MAX_PLAY_LENGTH = 6;
var res = {
    agreementjson:"res/ui/Agreement.json",
    assertui:"res/ui/AssetMgr.json",
    chatui:"res/ui/ChatNew.json",
    //chatsl:"res/ui/ChatSaoLei.json",
    chatnys:"res/ui/ChatNYS.json",
    createroomjson0: "res/ui/CreateRoomWindow0.json",
    createroomjson1: "res/ui/CreateRoomWindow1.json",
    createroomjson2: "res/ui/CreateRoomWindow2.json",
    createroomjson3: "res/ui/CreateRoomWindow3.json",
    createroomjson4: "res/ui/CreateRoomWindow4.json",
    createroomjson5: "res/ui/CreateRoomWindow5.json",
    createroomjson6: "res/ui/CreateRoomWindow6.json",
    createroomjson7: "res/ui/CreateRoomWindow7.json",
    createroomjson8: "res/ui/CreateRoomWindow8.json",
    createroomjson9: "res/ui/CreateRoomWindow9.json",
    createroomjson10: "res/ui/CreateRoomWindow10.json",
    creatRoombaofang:"res/ui/CreatRoombaofang.json",
    creatRoombaofangnys:"res/ui/CreatRoombaofangnys.json",
    exitroom: "res/ui/ExitRoom.json",
    msexitroom: "res/ui/MineSweepingExit.json",
    jionroomui2: "res/ui/Invitecode.json",
  //  buycardui:"res/ui/IOSPayWindow.json",
    jionroomui: "res/ui/JoinRoomWindow.json",
    loginui_loginpngpjson: "res/ui/LoginMenu.json",
    mailjson:"res/ui/Mail.json",
    halluijson: "res/ui/MainWindow.json",
    hallGolduijson: "res/ui/goldScene.json",
    goldScwelcome: "res/ui/goldScwelcome.json",
    //goldCRPrevCenter1json: "res/ui/goldCRPrevCenter1.json",
    //goldCRPrevCenter2json: "res/ui/goldCRPrevCenter2.json",
    //goldCRPrevRightjson: "res/ui/goldCRPrevRight.json",
    //goldCRPrevTopjson: "res/ui/goldCRPrevTop.json",
    goldCRPrevType0json: "res/ui/goldCRPrevType0.json",
    goldCRPrevType1json: "res/ui/goldCRPrevType1.json",
    goldCreateRoomjson: "res/ui/goldCreateRoom.json",
    msgbox: "res/ui/MessageBox.json",
    btn_layerJson:"res/ui/btn_Layer.json",
    RecordBureau:"res/ui/RecordBureau.json",
    gameShareJson:"res/ui/shareLayer.json",
    RecordReplayList:"res/ui/RecordReplayList.json",
    //RecordReplayListCell:"res/ui/RecordReplayListCell.json",
    //RecordBureauCell:"res/ui/RecordBureauCell.json",
    setting: "res/ui/SettingWindow.json",
    //tuitongzitable:"res/ui/TuitongziTable.json",
    //goldtuitongzitable:"res/ui/goldTuitongziTable.json",
    //pintianjiutable:"res/ui/Pingtianjiu.json",
    //goldpintianjiutable:"res/ui/goldPingtianjiu.json",
    //pintianjiugroups:"res/ui/pingtianjiu/groups.json",
    //pintianjiugroups:"res/game/pingtianjiu/ptj_group.json",
    //pintianjiuoneresult:"res/ui/PTJEndPlayWindow.json",
    zjhtablefk:"res/ui/zjhtablefk.json",
    recordListCell:"res/ui/recordListCell.json",
    safeLayerJson:"res/ui/safeLayer.json",
    recordCell:"res/ui/recordCell.json",
    //Ttz_record:"res/ui/Ttz_record.json",
    //Ptj_record:"res/ui/Ptj_record.json",
    auditLayer:"res/ui/auditLayer.json",
    chatMicLayer:"res/ui/lookPlayerLayer.json",
    chatMicLayer_sl:"res/ui/lookPlayerLayer_sl.json",
    rankingList:"res/ui/rankingListLayer.json",
    rankingCell:"res/ui/rankingCell.json",
    rankingPlayerInfo:"res/ui/rankingInfo.json",
    personalSetLayer:"res/ui/personalSetLayer.json",
    goldShop:"res/ui/goldShop.json",
    goldNysTable:"res/ui/goldNysTable.json",
    leopardKingTable:"res/ui/leopardKing.json",
   // dragonTable:"res/ui/Dragon.json",
    goldFishTable:"res/ui/goldfish.json",
    dxtbTable:"res/ui/dafuhao.json",
   // goldYybf:"res/ui/goldyybf.json",
    longhudou:"res/ui/longhudou.json",
    goldRacing:"res/ui/goldRacing.json",
    //goldYsz:"res/ui/goldYszTable.json",
    //yszSZ:"res/ui/yszSZ.json",
    //yszWz:"res/ui/yszWz.json",
    //yszRecord:"res/ui/yszRecord.json",
    lhdRecord:"res/ui/lhdRecord.json",
    lhdRecordCell:"res/ui/lhdRecordCell.json",
    //yybfRecord:"res/ui/yybfRecord.json",
    //yybfRecordCell:"res/ui/yybfRecordCell.json",
    //yybfRank:"res/ui/yybfRank.json",
    //yybfRankCell:"res/ui/yybfRankCell.json",
    //yybfBetsCell:"res/ui/yybfBetsCell.json",
    zhaomu:"res/ui/zhaomu.json",
    //bzwRecord:"res/ui/bzwRecord.json",
    //bzwRecordCell:"res/ui/bzwReacodCell.json",
    //bzwSZ:"res/ui/bzwSZ.json",
    //bzwSZcell:"res/ui/bzwSZcell.json",
    bzwWz:"res/ui/bzwWz.json",
    bzwWzCell:"res/ui/bzwWuzuoCell.json",
    report:"res/ui/reportLayer.json",
    bank:"res/ui/bank.json",
    goldzhanjicell:"res/ui/goldzhanjicell.json",
    erbagangTable:"res/ui/A_erbagang.json",
    ebgRecord:"res/ui/A_ebgRecord.json",
    pdkTable:"res/ui/A_pdkTable.json",
    //sxdbTable:"res/ui/A_sxdbTable.json",
    //sxdbRecord:"res/ui/sxdbRecord.json",
    //fpjTable:"res/ui/gold_fpj.json",
    //fpjDouble:"res/ui/gold_fpjdouble.json",
    //fpjHelp:"res/ui/gold_help.json",
    //fpjWin:"res/ui/gold_fpjwin.json",
    pdktableFk:"res/ui/PdkTable.json",
    pdkresultui:"res/ui/PdkEndWindow.json",
    pdkresultoneui:"res/ui/PdkEndPlayWindow.json",

    loadingJson:"res/roomAnimate/loading.json",
    loadingAtlas:"res/roomAnimate/loading.atlas",
    loadingPng:"res/roomAnimate/loading.png",

    wanfaImg0:"res/niuniuRes/wanfaImg0.png",
    wanfaImg1:"res/niuniuRes/wanfaImg1.png",
    wanfaImg2:"res/niuniuRes/wanfaImg2.png",
    wanfaImg3:"res/niuniuRes/wanfaImg3.png",
    wanfaImg4:"res/niuniuRes/wanfaImg4.png",
    wanfaImg5:"res/niuniuRes/wanfaImg5.png",
    wanfaImg6:"res/niuniuRes/wanfaImg6.png",
    wanfaImg7:"res/niuniuRes/wanfaImg7.png",
    wanfaImg8:"res/niuniuRes/wanfaImg8.png",
    wanfaImg9:"res/niuniuRes/wanfaImg9.png",

    jxnntable: "res/ui/jxnnTable.json",
    nysresultui:"res/ui/nysEndPlayWindow.json",
    nystable: "res/ui/NysTable.json",
    niuniuRoomHelpJson:"res/ui/roomHelpBtnLayer.json",
    ninniutable: "res/ui/NiuniuTable.json",
    zjhtable: "res/ui/ZjhTable.json",
    ddzhutable: "res/ui/DdzhuTable.json",
    zjhresultoneui: "res/ui/ZjhEndPlayWindow.json",
    resultoneui: "res/ui/EndPlayWindow.json",
    resultui:"res/ui/EndWindow.json",

    login_animate_json:"res/logo.json",
    login_animate_png:"res/logo.png",
    login_animate_atlas:"res/logo.atlas",

    hall_animate_json:"res/hall.json",
    hall_animate_png:"res/hall.png",
    hall_animate_atlas:"res/hall.atlas",

    ddzhuresultoneui: "res/ui/DdzEndPlayWindow.json",
    //sdbtable:"res/ui/sdbTable.json",
    //sdbEndPlayWindow:"res/ui/SdbEndPlayWindow.json",
    //sdbEndWindow:"res/ui/SdbEndWindow.json",
    zjhresultui:"res/ui/ZjhEndWindow.json",
    ddzhuresultui:"res/ui/DdzEndWindow.json",

    ddzRecordjson:"res/ui/DdzRecord.json",
    nnRecordjson:"res/ui/NiuNiu_record.json",

    //minesweeping:"res/ui/SaoLeiTable.json",
    //minesweepingbg:"res/ui/SaoLeiBg.json",
    //minesweepingresult2:"res/ui/SaoLeiResult2.json",
    //minesweepingresult:"res/ui/SaoLeiResult.json",
    minesweepingmsg:"res/ui/MessageBoxP.json",
  //  minesweepingdialog:"res/ui/SaoLeiDialog.json",
    minesweepingmenu:"res/ui/MineSweeping_Menu.json",
    minesweepingrule:"res/ui/MineSweepingRule.json",
    cuoPaiLayer:"res/ui/cuoPaiLayer.json",

    tips_bg:"res/niuniu/img_tips_bg.png",
    //动画
    cardsBigplist1: "res/large_poker1.plist",
    cardsBigplist2: "res/large_poker2.plist",
    cardsBigplist3: "res/large_poker3.plist",
    cardsplist: "res/cards.plist",
    cardspng: "res/cards.png",
    ani1list: "res/ani1.plist",
    ani1png: "res/ani1.png",
    niuniuCountPlist:"res/niuniuRes/niuniuCount.plist",
    niuniuCountPng:"res/niuniuRes/niuniuCount.png",
    goldniuniuCountPlist:"res/niuniuRes/goldniuniu.plist",
    goldniuniuCountPng:"res/niuniuRes/goldniuniu.png",
    img_buqiang:"res/niuniuRes/img_buqiang@2x.png",
    img_qiangzhuang:"res/niuniuRes/img_qiangzhuang@2x.png",
    btn_meiniu:"res/niuniuRes/331_btn_meiniu@2x.png",
    btn_youniu:"res/niuniuRes/331_btn_youniu@2x.png",
    btn_dizhu:"res/niuniuRes/btn_dizhu@2x.png",
    //ddzWinBg:"res/niuniuRes/jiassuan_bg1@2x.png",
    ddzLostBg:"res/niuniuRes/jiesuan_bg2@2x.png",
    btn_nongmin:"res/niuniuRes/btn_nongmin@2x.png",
    //斗地主资源图片一般放这里
    bombplist: "res/niuniuRes/anim/bomb.plist",
    bombpng: "res/niuniuRes/anim/bomb.png",
    feijiplist: "res/niuniuRes/anim/feiji.plist",
    feijipng: "res/niuniuRes/anim/feiji.png",
    shunzplist: "res/niuniuRes/anim/shunz.plist",
    shunzpng: "res/niuniuRes/anim/shunz.png",
    lianduilist: "res/niuniuRes/anim/liandui.plist",
    lianduipng: "res/niuniuRes/anim/liandui.png",
    wangzhaplist: "res/niuniuRes/anim/wang_zha.plist",
    wangzhappng: "res/niuniuRes/anim/wang_zha.png",

    spring0plist: "res/niuniuRes/anim/spring0.plist",
    spring0png: "res/niuniuRes/anim/spring0.png",
    alarmplist: "res/niuniuRes/anim/alarm.plist",
    alarmpng: "res/niuniuRes/anim/alarm.png",

    spr_double2:"res/niuniuRes/bei@2x.png",
    spr_double1:"res/niuniuRes/bei@1x.png",
    img_input:"res/niuniuRes/img_input@2x.png",
    img_laizi_bg:"res/niuniuRes/img_laiz2i@2x.png",
    rogue:"res/niuniuRes/roguetag.png",
    zhanji_bg:"res/niuniuRes/zhanji_bg3@2x.png",
    bureau_bg:"res/niuniuRes/bg5@2x.png",
    img_jiaobiao:"res/niuniuRes/img_jiaobiao@2x.png",
    ddzCall0:"res/niuniuRes/call0.png",
    ddzCall1:"res/niuniuRes/call1.png",
    ddzCall2:"res/niuniuRes/call2.png",
    ddzCall3:"res/niuniuRes/call3.png",

    sdb_endBomb:"res/niuniuRes/bomb@2x.png",
    sdb_endGaoPai:"res/niuniuRes/img_gaopai@2x.png",
    sdb_endShiDianBan:"res/niuniuRes/img_shidianban@2x.png",
    sdb_endWuXiao:"res/niuniuRes/img_wuxiao@2x.png",
    sdb_endHuaWuXiao:"res/niuniuRes/img_huawuxiao-@2x.png",
    sdb_endTianWang:"res/niuniuRes/img_tianwang@2x.png",

    showcallScore02:"res/niuniuRes/showcallScore02.png",
    btn_quqian:"res/ui/commonCells/commonPic/inRoomSamePic/btn_quqian@2x.png",

    //ttz
    tousaizi_skeleton:"res/game/tuitongzi/animate/skeleton.atlas",
    tousaizi_json:"res/game/tuitongzi/animate/skeleton.json",
    tousaizi_png:"res/game/tuitongzi/animate/skeleton.png",
    touziplist: "res/game/tuitongzi/ui/touzi.plist",
    touzipng: "res/game/tuitongzi/ui/touzi.png",
    //动画
    //ptjsaizijson:"res/game/pingtianjiu/animate/touzhong.json",
    //ptjsaiziatlas:"res/game/pingtianjiu/animate/touzhong_tex.atlas",
    //ptjsaizipng:"res/game/pingtianjiu/animate/touzhong_tex.png",

    //dileiJ:"res/roomAnimate/dilei.json",
    //dileiA:"res/roomAnimate/dilei.atlas",
    //dileiP:"res/roomAnimate/dilei.png",
    //dileiP1:"res/roomAnimate/dilei2.png",

    //dilei2J:"res/roomAnimate/dilei22.json",
    //dilei2A:"res/roomAnimate/dilei22.atlas",
    //dilei2P:"res/roomAnimate/dilei22.png",

    //btnAnimatejson0:"res/btnAnimate/pintianjiu.json",
    //btnAnimateatlas0:"res/btnAnimate/pintianjiu.atlas",
    //btnAnimatepng0:"res/btnAnimate/pintianjiu.png",
    //
    //btnAnimatejson1:"res/btnAnimate/pinsanzhang.json",
    //btnAnimateatlas1:"res/btnAnimate/pinsanzhang.atlas",
    //btnAnimatepng1:"res/btnAnimate/pinsanzhang.png",

    btnAnimatejson2:"res/btnAnimate/niuniu.json",
    btnAnimateatlas2:"res/btnAnimate/niuniu.atlas",
    btnAnimatepng2:"res/btnAnimate/niuniu.png",

    btnAnimatejson3:"res/btnAnimate/doudizhu.json",
    btnAnimateatlas3:"res/btnAnimate/doudizhu.atlas",
    btnAnimatepng3:"res/btnAnimate/doudizhu.png",

    btnAnimatejson4:"res/btnAnimate/paodekuai.json",
    btnAnimateatlas4:"res/btnAnimate/paodekuai.atlas",
    btnAnimatepng4:"res/btnAnimate/paodekuai.png",

    //btnAnimatejson5:"res/btnAnimate/shidianban.json",
    //btnAnimateatlas5:"res/btnAnimate/shidianban.atlas",
    //btnAnimatepng5:"res/btnAnimate/shidianban.png",
    //
    //btnAnimatejson6:"res/btnAnimate/tuitongzi.json",
    //btnAnimateatlas6:"res/btnAnimate/tuitongzi.atlas",
    //btnAnimatepng6:"res/btnAnimate/tuitongzi.png",

    //btnAnimatejson7:"res/btnAnimate/saolei.json",
    //btnAnimateatlas7:"res/btnAnimate/saolei.atlas",
    //btnAnimatepng7:"res/btnAnimate/saolei.png",

    btnAnimatejson8:"res/btnAnimate/niuyuanshuai.json",
    btnAnimateatlas8:"res/btnAnimate/niuyuanshuai.atlas",
    btnAnimatepng8:"res/btnAnimate/niuyuanshuai.png",

    grilAnimatejson:"res/roomAnimate/beauty.json",
    grilAnimateatlas:"res/roomAnimate/beauty.atlas",
    grilAnimatepng:"res/roomAnimate/beauty.png",

    createAnimatejson:"res/roomAnimate/chuangjianfangjian.json",
    createAnimateatlas:"res/roomAnimate/chuangjianfangjian.atlas",
    createAnimatepng:"res/roomAnimate/chuangjianfangjian.png",

    joinAnimatejson:"res/roomAnimate/jiarufangjian.json",
    joinAnimateatlas:"res/roomAnimate/jiarufangjian.atlas",
    joinAnimatepng:"res/roomAnimate/jiarufangjian.png",

    touchAnimatejson:"res/roomAnimate/shubiaodianji.json",
    touchAnimateatlas:"res/roomAnimate/shubiaodianji.atlas",
    touchAnimatepng:"res/roomAnimate/shubiaodianji.png",

    xinpinAnimatejson:"res/roomAnimate/xinpin.json",
    xinpinAnimateatlas:"res/roomAnimate/xinpin.atlas",
    xinpinAnimatepng:"res/roomAnimate/xinpin.png",

    jinbichangAnimatejson:"res/roomAnimate/jinbichang.json",
    jinbichangAnimateatlas:"res/roomAnimate/jinbichang.atlas",
    jinbichangAnimatepng:"res/roomAnimate/jinbichang.png",

    fangkachangAnimatejson:"res/roomAnimate/fangkachang.json",
    fangkachangAnimateatlas:"res/roomAnimate/fangkachang.atlas",
    fangkachangAnimatepng:"res/roomAnimate/fangkachang.png",

    julebuAnimatejson:"res/roomAnimate/julebu.json",
    julebuAnimateatlas:"res/roomAnimate/julebu.atlas",
    julebuAnimatepng:"res/roomAnimate/julebu.png",

    shangchengAnimatejson:"res/roomAnimate/shangcheng.json",
    shangchengAnimateatlas:"res/roomAnimate/shangcheng.atlas",
    shangchengAnimatepng:"res/roomAnimate/shangcheng.png",

    ttz_bg_frontcard:"res/ui/tuitongzi/ttz_bg_frontcard.png",
    ttz_bg_backcard:"res/ui/tuitongzi/ttz_bg_backcard.png",

    ttz_card_11:"res/game/tuitongzi/ui/ttz_card_11.png",
    ttz_card_12:"res/game/tuitongzi/ui/ttz_card_12.png",
    ttz_card_13:"res/game/tuitongzi/ui/ttz_card_13.png",
    ttz_card_14:"res/game/tuitongzi/ui/ttz_card_14.png",
    ttz_card_15:"res/game/tuitongzi/ui/ttz_card_15.png",
    ttz_card_16:"res/game/tuitongzi/ui/ttz_card_16.png",
    ttz_card_17:"res/game/tuitongzi/ui/ttz_card_17.png",
    ttz_card_18:"res/game/tuitongzi/ui/ttz_card_18.png",
    ttz_card_19:"res/game/tuitongzi/ui/ttz_card_19.png",
    ttz_card_37:"res/game/tuitongzi/ui/ttz_card_37.png",
    ttz_stzz:"res/game/tuitongzi/ui/ttz_stzz.png",
    ttz_baozi:"res/game/tuitongzi/ui/ttz_baozi.png",
    ttz_ebg:"res/game/tuitongzi/ui/ttz_ebg.png",
    ttz_nod:"res/game/tuitongzi/ui/ttz_nod.png",
    ttz_img95:"res/game/tuitongzi/ui/ttz_jiudb.png",
    ttz_img90:"res/game/tuitongzi/ui/ttz_jiud.png",
    ttz_img80:"res/game/tuitongzi/ui/ttz_bad.png",
    ttz_img85:"res/game/tuitongzi/ui/ttz_badb.png",
    ttz_img70:"res/game/tuitongzi/ui/ttz_qid.png",
    ttz_img75:"res/game/tuitongzi/ui/ttz_qidb.png",
    ttz_img65:"res/game/tuitongzi/ui/ttz_liudb.png",
    ttz_img60:"res/game/tuitongzi/ui/ttz_liud.png",
    ttz_img50:"res/game/tuitongzi/ui/ttz_wud.png",
    ttz_img55:"res/game/tuitongzi/ui/ttz_wudb.png",
    ttz_img40:"res/game/tuitongzi/ui/ttz_sid.png",
    ttz_img45:"res/game/tuitongzi/ui/ttz_sidb.png",
    ttz_img35:"res/game/tuitongzi/ui/ttz_sandb.png",
    ttz_img30:"res/game/tuitongzi/ui/ttz_sand.png",
    ttz_img20:"res/game/tuitongzi/ui/ttz_erd.png",
    ttz_img25:"res/game/tuitongzi/ui/ttz_erdb.png",
    ttz_img10:"res/game/tuitongzi/ui/ttz_yid.png",
    ttz_img15:"res/game/tuitongzi/ui/ttz_yidb.png",
    ttz_tongsha:"res/game/tuitongzi/ui/ttz_tongsha.png",
    ttz_tongpei:"res/game/tuitongzi/ui/ttz_tongpei.png",

   ttz_kaipai:"res/ui/tuitongzi/ttz_img_kaipai.png",
    // ttz_bets3:"res/ui/tuitongzi/ttz_img_3fen.png",
    // ttz_bets5:"res/ui/tuitongzi/ttz_img_5fen.png",
    // ttz_bets7:"res/ui/tuitongzi/ttz_img_7fen.png",

    //拼天九
    //ptj_painumplist:"res/game/pingtianjiu/ui/ptj_painum.plist",
    //ptj_painumpng:"res/game/pingtianjiu/ui/ptj_painum.png",
    //ptj_cardshubg:"res/ui/pingtianjiu/ptj_img_back1@2x.png",
    //ptj_cardhengbg:"res/ui/pingtianjiu/ptj_img_back2@2x.png",
    //
    //ptj_Atlasjia:"res/ui/pingtianjiu/ptj_jia@2x.png",
    //
    //ptj_Atlasjian:"res/game/pingtianjiu/ui/ptj_jian@2x.png",
    //ptj_losebg:"res/game/pingtianjiu/ui/ptj_bg_lose@2x.png",
    //ptj_losetitle:"res/game/pingtianjiu/ui/ptj_title_lose@2x.png",
    //
    //ptj_Atlasfont1:"res/ui/pingtianjiu/ptj_font1.png",
    //ptj_Atlasfont2:"res/ui/pingtianjiu/ptj_font2.png",
    //ptj_img_he:"res/ui/pingtianjiu/ptj_img_he@2x.png",
    //ptj_img_lose:"res/ui/pingtianjiu/ptj_img_lose@2x.png",
    //ptj_img_win:"res/ui/pingtianjiu/ptj_img_win@2x.png",

    //newRes
    //zjhfen5: "res/niuniuRes/p1@2x.png",
    //nn331_beimian:"res/ui/inRoomSamePic/yypk_img_pokerBack2@2x.png",
    //pokercard:"res/niuniuRes/pokercard1.png",
    winlogo:"res/ui/zjhCells/zjhPic/bipai/psz_img_win@2x.png",

    loselogo:"res/game/zjh/ui/psz_img_lose@2x.png",

    pokerBei:"res/commonUi/yypk_img_pokerBack2@2x.png",
    img1:"res/niuniuRes/yypk_imh_1fen.png",
    img2:"res/niuniuRes/yypk_imh_2fen.png",
    img3:"res/niuniuRes/yypk_imh_3fen.png",
    img4:"res/niuniuRes/yypk_imh_4fen.png",
    img5:"res/niuniuRes/yypk_imh_5fen.png",
    img6:"res/niuniuRes/yypk_imh_6fen.png",
    img7:"res/niuniuRes/yypk_imh_7fen.png",
    img8:"res/niuniuRes/yypk_imh_8fen.png",
    img9:"res/niuniuRes/yypk_imh_9fen.png",
    img10:"res/niuniuRes/yypk_img_10fen.png",
    chip1:"res/game/zjh/ui/chip1.png",
    chip2:"res/game/zjh/ui/chip2.png",
    chip3:"res/game/zjh/ui/chip3.png",
    chip4:"res/game/zjh/ui/chip4.png",
    chip5:"res/game/zjh/ui/chip5.png",
    chip6:"res/game/zjh/ui/chip6.png",
    chip8:"res/game/zjh/ui/chip8.png",
    chip10:"res/game/zjh/ui/chip10.png",
    chip50:"res/game/zjh/ui/chip50.png",
    chip100:"res/game/zjh/ui/chip100.png",
    chip200:"res/game/zjh/ui/chip200.png",
    chip500:"res/game/zjh/ui/chip500.png",
    chip1000:"res/game/zjh/ui/chip1000.png",
    chip2000:"res/game/zjh/ui/chip2000.png",
    chip5000:"res/game/zjh/ui/chip5000.png",
    chip10000:"res/game/zjh/ui/chip10000.png",

    kanpaiLogo: "res/game/zjh/ui/psz_img_kanpai@2x.png",
    qipaiLogo:"res/game/zjh/ui/psz_img_qipai@2x.png",
    zjhprogress:"res/game/zjh/ui/pt0.png",

    voiceJson:"res/commonAnim/voice.json",
    voiceAtlas:"res/commonAnim/voice.atlas",
    voicePng:"res/commonAnim/voice.png",

    chatbg_ld: "res/commonUi/room/chat_left@2x.png",
    chatbg_rd: "res/commonUi/room/chat_right@2x.png",
    chatbg_ud:"res/commonUi/room/chat_up@2x.png",
    chatbg_ud1:"res/commonUi/room/chat_up1@2x.png",
    progressBar:"res/commonUi/room/yypk_img_timing@2x.png",
    soundopen0: "res/commonUi/room/yypk_img_horn1@2x@2x.png",
    soundopen1:"res/commonUi/room/yypk_img_horn2@2x@2x.png",
    soundopen2:"res/commonUi/room/yypk_img_horn3@2x@2x.png",

    text_saolei:"res/game/saolei/ui/sl_img_saolei@2x.png",
    progress_saolei:"res/game/saolei/ui/ptj_img_jishi@2x.png",
    coin_saolei:"res/game/saolei/ui/yyl_img_gold@2x.png",
    btn_ready:"res/ui/commonCells/commonPic/inRoomSamePic/yypk_btn_ready@2x.png",

    btn_zanting:"res/commonUi/record/hf_btn_stop@2x.png",
    btn_bofang:"res/ui/commonCells/commonPic/recordPic/hf_btn_play@2x.png",

    //pageOne:"res/ui/buyCard/1.png",

    pageTwo:"res/commonUi/buyCard/2.png",
    pageThree:"res/commonUi/buyCard/3.png",
    pageFour:"res/commonUi/buyCard/4.png",

    //unselectDian:"res/ui/buyCard/jy_suolueqiu1.png",
    //selectDian:"res/ui/buyCard/jy_suolueqiu2.png",

    blueSafe:"res/ui/safeLayer/yypk_img_bluews@2x.png",
    redSafe:"res/commonUi/safeLayer/yypk_img_redws@2x.png",

    guangxiao_json: "res/btnAnimate/light/guangxiao.json",
    guangxiao_atlas: "res/btnAnimate/light/guangxiao.atlas",
    guangxiao_png: "res/btnAnimate/light/guangxiao.png",

    maskLayer:"res/maskLayer.png",
    nn331_beimian_big:"res/nn331_beimian_big.png",
    //nn331_beimian:"res/nn331_beimian.png",
    tuoGuang_0:"res/ui/niuniuPic/btn_tuoguan1.png",
    tuoGuang_1:"res/niuniu/btn_tuoguan2.png",


    random_zhuangPng1:"res/niuniu/randomZhuang1.png",
    random_zhuangPng2:"res/niuniu/randomZhuang2.png",
    btn_samllblue:"res/niuniu/btn_samllblue@2x.png",
    btn_smallgreen:"res/niuniu/btn_smallgreen@2x.png",
    select_zhuangPng:"res/game/nys/ui/desktop_player_bg_box4@2x.png",
    img_qiangZhuang0:"res/niuniu/img_bei0@2x.png",
    img_qiangZhuang1:"res/niuniu/img_bei1@2x.png",
    img_qiangZhuang2:"res/niuniu/img_bei2@2x.png",
    img_qiangZhuang3:"res/niuniu/img_bei3@2x.png",
    img_qiangZhuang4:"res/niuniu/img_bei4@2x.png",
    niuniuAnimateGold:"res/niuniu/img_gold@2x.png",
    //cuoPaiOneLayer:"res/ui/cuoPaiOneLayer.json",
    chatMicLayer:"res/ui/lookPlayerLayer.json",
	
	 //---------------------------俱乐部--------------------------
    julebu_infolist:"res/ui/Clubinfomyself.json",
    julebu_clubmanger:"res/ui/Clubmanger.json",
    julebu_clubpersons:"res/ui/ClubPersons.json",
    julebu_clubcells:"res/ui/Clubcells.json",
    julebu_rankItem:"res/ui/clubRankItem.json",
    julebu_recordUser:"res/ui/clubRecordUser.json",
    julebu_recordItem:"res/ui/clubRecordItem.json",
    julebu_roomListItem:"res/ui/clubRoomListItem.json",
    julebu_roomSetItem:"res/ui/clubRoomSetItem.json",
    julebu_applyListItem:"res/ui/clubApplyListItem.json",
    julebu_dynamic:"res/ui/clubDynamic.json",
    julebu_statistics:"res/ui/clubStatistics.json",
    julebu_memberItem:"res/ui/clubMemberItem.json",

    //julebuAnimatejson:"res/roomAnimate/julebu.json",
    //julebuAnimateatlas:"res/roomAnimate/julebu.atlas",
    //julebuAnimatepng:"res/roomAnimate/julebu.png",

    selectbg1:"res/ui/commonCells/commonPic/createPic/yypk_btn_unselect@2x.png",
    selectgou1:"res/ui/commonCells/commonPic/createPic/yypk_btn_select@2x.png",
    headbgkuang:"res/ui/clubres/clubinfo/club_bg_player1.png",
    julebucellbg:"res/ui/clubres/clubinfo/club_bg_infor@2x.png",

    julebu_sqjr:"res/commonUi/club/club_btn_sqjr@2x.png",
    julebu_yisqjr:"res/commonUi/club/club_btn_qxsq@2x.png",
    julebu_yijiesan:"res/commonUi/club/club_img_already@2x.png",
    julebu_kfcellbg:"res/commonUi/club/club_bg_xxtz@2x.png",
    julebu_kfbtn:"res/commonUi/club/club_btn_kf@2x.png",

    jublebu_1:"res/commonUi/club/jy_jxnn.png",
    jublebu_2:"res/commonUi/club/jy_kwx.png",
    jublebu_7:"res/commonUi/club/jy_psz.png",
    jublebu_16:"res/commonUi/club/jy_jxnn.png",
    jublebu_6:"res/commonUi/club/jy_ddz.png",
    jublebu_65:"res/commonUi/club/jy_nys.png",
    jublebu_19:"res/commonUi/club/jy_ptj.png",
    jublebu_17:"res/commonUi/club/jy_ttz.png",
    jublebu_10:"res/commonUi/club/jy_sdb.png",
    jublebu_x1:"res/commonUi/club/jy_pdk.png",
    jublebu_36:"res/commonUi/club/jy_saolei.png",

    jublebu_joinroombtn:"res/commonUi/club/club_btn_joinroom@2x.png",
    jublebu_setkfbtn:"res/commonUi/club/club_btn_shezhi@2x.png",
    jublebu_agreejoin:"res/commonUi/club/yypk_btn_agree@2x.png",
    jublebu_refusejoin:"res/commonUi/club/yypk_btn_refuse@2x.png",
    //俱乐部改版
    clubIcon0:"res/ui/clubres/clubinfo/club_icon1@2x.png",
    clubIcon1:"res/ui/clubres/clubinfo/club_icon2@2x.png",
    clubIcon2:"res/ui/clubres/clubinfo/club_icon3@2x.png",
    clubIcon3:"res/ui/clubres/clubinfo/club_icon4@2x.png",


    //卡五星
    //干掉蛋疼的特效动画
    //mjpeng_txatlas: "res/ui/kwxResource/newkwxres/animations/peng_tx.atlas",
    //mjpeng_txjson: "res/ui/kwxResource/newkwxres/animations/peng_tx.json",
    //mjpeng_txpng: "res/ui/kwxResource/newkwxres/animations/peng_tx.png",
    //mjangang_txatlas: "res/ui/kwxResource/newkwxres/animations/angang_tx.atlas",
    //mjangang_txjson: "res/ui/kwxResource/newkwxres/animations/angang_tx.json",
    //mjangang_txpng: "res/ui/kwxResource/newkwxres/animations/angang_tx.png",
    //mjmingang_txatlas: "res/ui/kwxResource/newkwxres/animations/minggang_tx.atlas",
    //mjmingang_txjson: "res/ui/kwxResource/newkwxres/animations/minggang_tx.json",
    //mjmingang_txpng: "res/ui/kwxResource/newkwxres/animations/minggang_tx.png",
    //mjgangskh_txatlas: "res/ui/kwxResource/newkwxres/animations/gangshangkaihua_tx.atlas",
    //mjgangskh_txjson: "res/ui/kwxResource/newkwxres/animations/gangshangkaihua_tx.json",
    //mjgangskh_txpng: "res/ui/kwxResource/newkwxres/animations/gangshangkaihua_tx.png",
    //mjgangsp_txatlas: "res/ui/kwxResource/newkwxres/animations/gangshangpao_tx.atlas",
    //mjgangsp_txjson: "res/ui/kwxResource/newkwxres/animations/gangshangpao_tx.json",
    //mjgangsp_txpng: "res/ui/kwxResource/newkwxres/animations/gangshangpao_tx.png",
    //mjliang_txatlas: "res/ui/kwxResource/newkwxres/animations/liang_tx.atlas",
    //mjliang_txjson: "res/ui/kwxResource/newkwxres/animations/liang_tx.json",
    //mjliang_txpng: "res/ui/kwxResource/newkwxres/animations/liang_tx.png",
    //mjhu_txatlas: "res/ui/kwxResource/newkwxres/animations/hu_tx.atlas",
    //mjhu_txjson: "res/ui/kwxResource/newkwxres/animations/hu_tx.json",
    //mjhu_txpng: "res/ui/kwxResource/newkwxres/animations/hu_tx.png",
    //mjhu_tx2png: "res/ui/kwxResource/newkwxres/animations/hu_tx2.png",
    wanfaImg10:"res/niuniuRes/wanfaImg10.png",
    kwxtable: "res/ui/kwxTable.json",
    NotifyCard: "res/ui/KwxNotifyCard.json",
    NoticeExit: "res/ui/NoticeExit.json",
    //addbonuschoose:"res/ui/KwxAddBonusChoose.json",
    kwxResultoneui: "res/ui/KwxEndPlayWindow.json",
    kwxResultui: "res/ui/KwxAllEnd.json",
    kwxRecordjson: "res/ui/kwxReplayWindow.json",
    wait_skeleton:"res/kwxAnimation/wait.atlas",
    wait_json:"res/kwxAnimation/wait.json",
    wait_png:"res/kwxAnimation/wait.png",
    waitgold_skeleton:"res/kwxAnimation/goldwait.atlas",
    waitgold_json:"res/kwxAnimation/goldwait.json",
    waitgold_png:"res/kwxAnimation/goldwait.png",
    background_png: "res/ui/kwxResource/png/fangkaxiaobeijing.png",

    gang_scr0: "res/game/kwx/ui/gangf@4x.png",
    gang_scr1: "res/game/kwx/ui/gangf@2x.png",
    gang_scr2: "res/game/kwx/ui/gangf@1x.png",
    gang_scr3: "res/game/kwx/ui/gangz@1x.png",
    gang_scr4: "res/game/kwx/ui/gangz@2x.png",
    gang_scr5: "res/game/kwx/ui/gangz@4x.png",
    gang_scr6: "res/game/kwx/ui/gangz@8x.png",

    pointToSelf: "res/ui/kwxResource/newkwxres/bei.png",

    pointToNext: "res/game/kwx/ui/dong.png",
    pointToPrev: "res/game/kwx/ui/xi.png",
    liangpai_wrong: "res/game/kwx/ui/liangpai_wrong.png",

    btnAnimatejson9:"res/btnAnimate/kawuxing.json",
    btnAnimateatlas9:"res/btnAnimate/kawuxing.atlas",
    btnAnimatepng9:"res/btnAnimate/kawuxing.png",

    mjcardsplist:"res/commonUi/mjcardsplist.plist",
    mjcardspng:"res/commonUi/mjcardsplist.png",

    btn_quitExit:"res/commonUi/room/btn_quitExit@2x.png",

    resulthu:"res/ui/kwxResource/newkwxres/yyjb_img_hu@2x.png",

    resultdianpao:"res/game/kwx/ui/yyjb_img_fangpao@2x.png",
    resulthuangz:"res/game/kwx/ui/yyjb_img_huangz@2x.png",
    resultpeihu:"res/game/kwx/ui/yyjb_img_peihu@2x.png",

    resultzimo:"res/ui/kwxResource/newkwxres/goldjiesuan/yyjb_img_zimo@2x.png",

    iconfenpng:"res/game/kwx/ui/img_fen.png",
    kwx_hubg_tishi:"res/game/kwx/ui/kwx_bg_tishi@2x.png",
    png_ting: "res/game/kwx/ui/kwx_jiaoting.png",
    png_liang: "res/game/kwx/ui/kwx_jiaolia.png",

    kwx_img_hutips:"res/ui/kwxResource/newkwxres/kwx_img_hu@2x.png",
    record_hu: "res/ui/kwxResource/newkwxres/hu.png",
    record_gang: "res/ui/kwxResource/newkwxres/gang.png",
    record_liang: "res/ui/kwxResource/newkwxres/kwx_liang.png",

    record_peng: "res/ui/kwxResource/newkwxres/peng.png",

    kwx_cardzz:"res/game/kwx/ui/kwx_cardzhezhao.png",
    //卡五星金币场
    kwxGoldend:"res/ui/KwxGoldend.json",

    kwxNameIcon:"res/commonUi/glodCreate/yyjb_title_kwx@2x.png",
    kwx0_0:"res/commonUi/glodCreate/yyjb_img_mm2@2x.png",
    kwx0_1:"res/commonUi/glodCreate/yyjb_img_mm1@2x.png",
    kwx1_0:"res/commonUi/glodCreate/yyjb_img_bmm2@2x.png",
    kwx1_1:"res/commonUi/glodCreate/yyjb_img_bmm1@2x.png",
    kwx2_0:"res/commonUi/glodCreate/yyjb_img_qpd2@2x.png",
    kwx2_1:"res/commonUi/glodCreate/yyjb_img_qpd1@2x.png",
    kwx3_0:"res/commonUi/glodCreate/yyjb_img_qpdb2@2x.png",
    kwx3_1:"res/commonUi/glodCreate/yyjb_img_qpdb1@2x.png",
    kwx4_0:"res/commonUi/glodCreate/yyjb_img_slwf2@2x.png",
    kwx4_1:"res/commonUi/glodCreate/yyjb_img_slwf1@2x.png",

    kwxlose:"res/game/kwx/ui/yyjb_img_lose@2x.png",

    //金币场战绩
    goldzhanji: "res/ui/goldZhanji.json",
    goldzhanjcellbg:"res/ui/goldres/yyjb_bg_zhanji@2x.png",
    //common
    playMenuView:"res/ui/playMenuLayer.json",
    goldTimeBar:"res/game/nysgold/ui/ptj_img_jishi@2x.png",
    //五子棋
    goldWzqTable:"res/ui/wzqGoldTable.json",
    wzqSetScore:"res/ui/wzqSetScore.json",
    wzqJoinRoomUi: "res/ui/wzqGoldCreateRoom.json",
    wzqChessArea:"res/ui/wzqResource/wzqChessArea.png",
    wzqChessBlack:"res/ui/wzqResource/yyjb_img_black@2x.png",

    wzqChessWhite:"res/game/wzq/ui/yyjb_img_white@2x.png",

    wzqNum0:"res/ui/wzqResource/goldCreateRoom/yyjb_img_zero@2x.png",
    wzqNum1:"res/ui/wzqResource/goldCreateRoom/yyjb_img_invite@2x.png",
    wzqNum2:"res/ui/wzqResource/goldCreateRoom/yyjb_img_two@2x.png",
    wzqNum3:"res/ui/wzqResource/goldCreateRoom/yyjb_img_three@2x.png",
    wzqNum4:"res/ui/wzqResource/goldCreateRoom/yyjb_img_four@2x.png",
    wzqNum5:"res/ui/wzqResource/goldCreateRoom/yyjb_img_five@2x.png",
    wzqNum6:"res/ui/wzqResource/goldCreateRoom/yyjb_img_six@2x.png",
    wzqNum7:"res/ui/wzqResource/goldCreateRoom/yyjb_img_seven@2x.png",
    wzqNum8:"res/ui/wzqResource/goldCreateRoom/yyjb_img_eight@2x.png",
    wzqNum9:"res/ui/wzqResource/goldCreateRoom/yyjb_img_nine@2x.png",

    //三张牌金币场
    szpNameIcon:"res/game/zjhgold/ui/yyjb_title_psz@2x.png",
    szp0_0:"res/game/zjhgold/ui/yyjb_img_jdwf2@2x.png",
    szp0_1:"res/game/zjhgold/ui/yyjb_img_jdwf1@2x.png",
    szp1_0:"res/game/zjhgold/ui/yyjb_img_fkwf2@2x.png",
    szp1_1:"res/game/zjhgold/ui/yyjb_img_fkwf1@2x.png",

    zjhtableGold:"res/ui/zjhtablefk_gold.json",
    headBorder:"res/ui/commonCells/commonPic/inRoomSamePic/zjh_touxiang.png",

    baofangszptitle:"res/commonUi/glodCreate/yyjp_img_psz@2x_bf.png",
    baofangdstitle:"res/commonUi/goldScene/yyjb_title_ds@2x.png",
    baofangdstitlenys:"res/commonUi/goldScene/yyjb_title_nys@2x.png",

    spineFail_j: "res/commonAnim/fail.json",
    spineFail_a: "res/commonAnim/fail.atlas",
    spineFail_p: "res/commonAnim/fail.png",
    spineWin_j: "res/commonAnim/victory.json",
    spineWin_a: "res/commonAnim/victory.atlas",
    spineWin_p1: "res/commonAnim/victory.png",
    spineWin_p2: "res/commonAnim/victory2.png",
    spinecrown_j: "res/commonAnim/crown.json",
    spinecrown_a: "res/commonAnim/crown.atlas",
    spinecrown_p: "res/commonAnim/crown.png",
    duijukaishi_j:"res/commonAnim/duijukaishi2.json",
    duijukaishi_a:"res/commonAnim/duijukaishi2.atlas",
    duijukaishi_p:"res/commonAnim/duijukaishi2.png",

    //牛元帅金币场
    callBet0:"res/ui/goldNYS/loadRes/nn_img_q0@2x.png",
    callBet2:"res/ui/goldNYS/loadRes/nn_img_q2@2x.png",
    callBet1:"res/game/nysgold/ui/nn_img_q1@2x.png",
    callBet3:"res/game/nysgold/ui/nn_img_q3@2x.png",
    callBet4:"res/game/nysgold/ui/nn_img_q4@2x.png",

    callScore1:"res/game/nysgold/ui/nn_img_b1@2x.png",
    callScore2:"res/game/nysgold/ui/nn_img_b2@2x.png",
    callScore3:"res/game/nysgold/ui/nn_img_b3@2x.png",
    callScore4:"res/game/nysgold/ui/nn_img_b4@2x.png",
    callScore5:"res/game/nysgold/ui/nn_img_b5@2x.png",

    randomLightH:"res/game/nysgold/ui/light1@2x.png",
    randomLightP:"res/game/nysgold/ui/light2@2x.png",

    jsonNiu0: "res/game/nysgold/animate/meiniu.json",
    atlasNiu0: "res/game/nysgold/animate/meiniu.atlas",
    jsonNiu91: "res/game/nysgold/animate/niuyi.json",
    atlasNiu91: "res/game/nysgold/animate/niuyi.atlas",
    jsonNiu92: "res/game/nysgold/animate/niuer.json",
    atlasNiu92: "res/game/nysgold/animate/niuer.atlas",
    jsonNiu93: "res/game/nysgold/animate/niusan.json",
    atlasNiu93: "res/game/nysgold/animate/niusan.atlas",
    jsonNiu94: "res/game/nysgold/animate/niusi.json",
    atlasNiu94: "res/game/nysgold/animate/niusi.atlas",
    jsonNiu95: "res/game/nysgold/animate/niuwu.json",
    atlasNiu95: "res/game/nysgold/animate/niuwu.atlas",
    jsonNiu96: "res/game/nysgold/animate/niuliu.json",
    atlasNiu96: "res/game/nysgold/animate/niuliu.atlas",
    jsonNiu97: "res/game/nysgold/animate/niuqi.json",
    atlasNiu97: "res/game/nysgold/animate/niuqi.atlas",
    jsonNiu98: "res/game/nysgold/animate/niuba.json",
    atlasNiu98: "res/game/nysgold/animate/niuba.atlas",
    jsonNiu99: "res/game/nysgold/animate/niujiu.json",
    atlasNiu99: "res/game/nysgold/animate/niujiu.atlas",
    aaa0:"res/game/nysgold/animate/meiniu.png",
    aaa1:"res/game/nysgold/animate/niuyi.png",
    aaa2:"res/game/nysgold/animate/niuer.png",
    aaa3:"res/game/nysgold/animate/niusan.png",
    aaa4:"res/game/nysgold/animate/niusi.png",
    aaa5:"res/game/nysgold/animate/niuwu.png",
    aaa6:"res/game/nysgold/animate/niuliu.png",
    aaa7:"res/game/nysgold/animate/niuqi.png",
    aaa8:"res/game/nysgold/animate/niuba.png",
    aaa9:"res/game/nysgold/animate/niujiu.png",
    aaa10:"res/game/nysgold/animate/niuniu.png",
    aaa11:"res/game/nysgold/animate/wuhuaniu.png",
    aaa12:"res/game/nysgold/animate/zhadanniu.png",
    aaa13:"res/game/nysgold/animate/wuxiaoniu.png",
    aaa14:"res/game/nysgold/animate/shunjinniu.png",
    aaa15:"res/game/nysgold/animate/tonghuaniu.png",
    aaa16:"res/game/nysgold/animate/shunziniu.png",
    aaa17:"res/game/nysgold/animate/huluniu.png",
    jsonNiu100: "res/game/nysgold/animate/niuniu.json",
    atlasNiu100: "res/game/nysgold/animate/niuniu.atlas",
    jsonNiu700: "res/game/nysgold/animate/zhadanniu.json",
    atlasNiu700: "res/game/nysgold/animate/zhadanniu.atlas",
    jsonNiu300: "res/game/nysgold/animate/wuhuaniu.json",
    atlasNiu300: "res/game/nysgold/animate/wuhuaniu.atlas",
    jsonNiu500: "res/game/nysgold/animate/wuxiaoniu.json",
    atlasNiu500: "res/game/nysgold/animate/wuxiaoniu.atlas",
    jsonNiu600: "res/game/nysgold/animate/huluniu.json",
    atlasNiu600: "res/game/nysgold/animate/huluniu.atlas",
    jsonNiu800: "res/game/nysgold/animate/shunjinniu.json",
    atlasNiu800: "res/game/nysgold/animate/shunjinniu.atlas",
    jsonNiu200: "res/game/nysgold/animate/shunziniu.json",
    atlasNiu200: "res/game/nysgold/animate/shunziniu.atlas",
    jsonNiu400: "res/game/nysgold/animate/tonghuaniu.json",
    atlasNiu400: "res/game/nysgold/animate/tonghuaniu.atlas",

    winGold:"res/ui/winGold.json",
    lostGold:"res/ui/lostGold.json",
    jiaLogo:"res/ui/pingtianjiu/ptj_jia@2x.png",

    jianLogo:"res/game/pingtianjiu/ui/ptj_jian@2x.png",

    startAnim:"res/ui/startAnim.json",

    niuniuState0:"res/game/nysgold/ui/nn_img_waitting@2x.png",
    niuniuState1:"res/game/nysgold/ui/nn_img_qz@2x.png",
    niuniuState2:"res/game/nysgold/ui/nn_img_xz@2x.png",
    niuniuState3:"res/game/nysgold/ui/nn_img_pp@2x.png",
    niuniuState4:"res/game/nysgold/ui/nn_img_ready@2x.png",

    nysoneBetBtnImg:"res/ui/niuniuPic/jxnn_btn_fraction1.png",
    nysQiangZhuangBtnImg:"res/ui/niuniuPic/img_qiang@2x.png",

    jsonStartAnim1:"res/commonAnim/kaishi1.json",
    atlasStartAnim1:"res/commonAnim/kaishi1.atlas",
    pngStartAnim1:"res/commonAnim/kaishi1.png",
    gunzi:"res/commonAnim/gunzi.png",

    nysDifen50:"res/game/nysgold/ui/img_50.png",
    nysDifen100:"res/game/nysgold/ui/img_100.png",
    nysDifen200:"res/game/nysgold/ui/img_200.png",
    nysDifen300:"res/game/nysgold/ui/img_300.png",
    nysDifen500:"res/game/nysgold/ui/img_500.png",
    nysDifen1000:"res/game/nysgold/ui/img_1000.png",
    //=================名品汇=====================
    //onlineList:"res/ui/A_sxdb/online.png",
    //resultType0:"res/game/sxdb/ui/benchi_big0.png",
    //resultType1:"res/game/sxdb/ui/benchi_big1.png",
    //resultType2:"res/game/sxdb/ui/guchi_big2.png",
    //resultType3:"res/game/sxdb/ui/aimashi_big3.png",
    //resultType4:"res/game/sxdb/ui/amani_big4.png",
    //resultType5:"res/game/sxdb/ui/shengluolan_big5.png",
    //resultType6:"res/game/sxdb/ui/lv_big6.png",
    //resultType7:"res/game/sxdb/ui/Dior_big7.png",
    //resultType8:"res/game/sxdb/ui/xiangnaier_big8.png",
    //resultType9:"res/game/sxdb/ui/laolis_big9.png",
    //
    //recordType0:"res/game/sxdb/ui/benchi_xiao0.png",
    //recordType1:"res/game/sxdb/ui/benchi_xiao1.png",
    //recordType2:"res/game/sxdb/ui/guchi_xiao2.png",
    //recordType3:"res/game/sxdb/ui/aimashi_xiao3.png",
    //recordType4:"res/game/sxdb/ui/amani_xiao4.png",
    //recordType5:"res/game/sxdb/ui/shengluolan_xiao5.png",
    //recordType6:"res/game/sxdb/ui/lv_xiao6.png",
    //recordType7:"res/game/sxdb/ui/Dior_xiao7.png",
    //recordType8:"res/game/sxdb/ui/xiangnaier_xiao8.png",
    //recordType9:"res/game/sxdb/ui/laolis_xiao9.png",
    //recordType2100:"res/game/sxdb/ui/img_tp.png",
    //recordType700:"res/game/sxdb/ui/img_ts.png",
    //ts_logo700:"res/game/sxdb/ui/img_ts.png",
    //ts_logo2100:"res/game/sxdb/ui/img_tp.png",
    //=================龙虎斗=====================
    lhdrecord0:"res/commonUi/lhd/ui/long.png",
    lhdrecord1:"res/commonUi/lhd/ui/hu.png",
    lhdrecord2:"res/commonUi/lhd/ui/he.png",
    lhdSlectImg:"res/ui/goldlhd/xugen.png",
    lhdNormalImg:"res/commonUi/lhd/ui/anniu2.png",
    lhdxzjs:"res/commonUi/lhd/ui/xzjs.png",
    lhdksxz:"res/commonUi/lhd/ui/ksxz.png",
    lhdrescolor0:"res/commonUi/lhd/ui/hongquan.png",
    lhdrescolor1:"res/commonUi/lhd/ui/lanquan.png",
    //=================一夜暴富====================
    //yybfrank0:"res/game/goldyybf/di1.png",
    //yybfrank1:"res/game/goldyybf/di2.png",
    //yybfrank2:"res/game/goldyybf/di3.png",

    //=================地穴探宝====================
    //dfh_fireList:"res/game/dafuhao/ui/dfh_huo.plist",
    //dfh_firepng:"res/game/dafuhao/ui/dfh_huo.png",
    //=================翻牌机====================
    //fpjType1:"res/ui/goldfpj/ui/shuang@2x.png",
    //fpjType2:"res/ui/goldfpj/ui/two@2x.png",
    //fpjType3:"res/ui/goldfpj/ui/three@2x.png",
    //fpjType4:"res/ui/goldfpj/ui/four@2x.png",
    //fpjType5:"res/ui/goldfpj/ui/five@2x.png",
    //fpjType6:"res/ui/goldfpj/ui/six@2x.png",
    //fpjType7:"res/ui/goldfpj/ui/seven@2x.png",
    //fpjType8:"res/ui/goldfpj/ui/eight@2x.png",
    //fpjType9:"res/ui/goldfpj/ui/nine@2x.png",
    //fpjType10:"res/ui/goldfpj/ui/ten@2x.png",
    //fpjsave:"res/ui/goldfpj/ui/@2x.png",

    //=================房卡跑的快====================
    pdk_losebg1:"res/ui/xiangjun/game/21-result/xjhy_bg_lose1@2x.png",
    pdk_losebg2:"res/ui/xiangjun/game/21-result/xjhy_bg_lose2@2x.png",
    zhenghao:"res/ui/xiangjun/game/21-result/xjhy_y_jia.png",
    fuhao:"res/ui/xiangjun/game/21-result/xjhy_b_jian.png",
    chatbg_lt: "res/ui/xiangjun/game/21-result/chatbg_lt.png",
    soundopen: "res/ui/xiangjun/game/21-result/soundOpen.png",
    img_input1:"res/ui/xiangjun/game/17-room/xjhy_bg_tishiyu@2x@2x.png",

    //=================十三水====================
    shi_sanshuiplist:"res/btnAnimate/shi_sanshui.plist",
    shi_sanshuipng:"res/btnAnimate/shi_sanshui.png",
    
    //=================龙珠探宝====================
    //curpage:"res/game/dragon/ui/allpage1.png",
    //dafaultpage:"res/game/dragon/ui/allpage.png",
    //dragon_itemPlist:"res/ui/dragon/hall/dragon_item.plist",
    //dragon_itemPng:"res/ui/dragon/hall/dragon_item.png",

    spebets2_0:"res/game/dragon/ui/spebets2_0.png",
    spebets3_0:"res/game/dragon/ui/spebets3_0.png",
    spebets4_0:"res/game/dragon/ui/spebets4_0.png",
    spebets5_0:"res/game/dragon/ui/spebets5_0.png",
    spebets10_0:"res/game/dragon/ui/spebets10_0.png",
    spebets2_1:"res/game/dragon/ui/spebets2_1.png",
    spebets3_1:"res/game/dragon/ui/spebets3_1.png",
    spebets4_1:"res/game/dragon/ui/spebets4_1.png",
    spebets5_1:"res/game/dragon/ui/spebets5_1.png",
    spebets10_1:"res/game/dragon/ui/spebets10_1.png",


    dragonChu_8_Plist:"res/game/dragon/animation/dragonChu_8.plist",
    dragonChu_8_Png:"res/game/dragon/animation/dragonChu_8.png",

    dragonAn_1_Plist:"res/game/dragon/animation/dragonAn_1.plist",
    dragonAn_2_Plist:"res/game/dragon/animation/dragonAn_2.plist",
    dragonAn_3_Plist:"res/game/dragon/animation/dragonAn_3.plist",
    dragonAn_4_Plist:"res/game/dragon/animation/dragonAn_4.plist",
    dragonAn_5_Plist:"res/game/dragon/animation/dragonAn_5.plist",
    dragonAn_6_Plist:"res/game/dragon/animation/dragonAn_6.plist",
    dragonAn_7_Plist:"res/game/dragon/animation/dragonAn_7.plist",
    dragonAn_8_Plist:"res/game/dragon/animation/dragonAn_8.plist",
    dragonAn_9_Plist:"res/game/dragon/animation/dragonAn_9.plist",
    dragonAn_10_Plist:"res/game/dragon/animation/dragonAn_10.plist",
    dragonAn_11_Plist:"res/game/dragon/animation/dragonAn_11.plist",

    dragonAn_1_Png:"res/game/dragon/animation/dragonAn_1.png",
    dragonAn_2_Png:"res/game/dragon/animation/dragonAn_2.png",
    dragonAn_3_Png:"res/game/dragon/animation/dragonAn_3.png",
    dragonAn_4_Png:"res/game/dragon/animation/dragonAn_4.png",
    dragonAn_5_Png:"res/game/dragon/animation/dragonAn_5.png",
    dragonAn_6_Png:"res/game/dragon/animation/dragonAn_6.png",
    dragonAn_7_Png:"res/game/dragon/animation/dragonAn_7.png",
    dragonAn_8_Png:"res/game/dragon/animation/dragonAn_8.png",
    dragonAn_9_Png:"res/game/dragon/animation/dragonAn_9.png",
    dragonAn_10_Png:"res/game/dragon/animation/dragonAn_10.png",
    dragonAn_11_Png:"res/game/dragon/animation/dragonAn_11.png",

    //=================摇塞子=====================
    //baoziImg:"res/game/yaosaizi/ui/bzw_img_green@2x.png",
    //danshuangImg:"res/game/yaosaizi/ui/bzw_img_danshuang@2x.png",
    //yszrecord0:"res/game/yaosaizi/ui/bzw_img_small@2x.png",
    //yszrecord2:"res/game/yaosaizi/ui/tzw_img_bao@2x.png",
    //yszrecord1:"res/game/yaosaizi/ui/bzw_img_big@2x.png",
    //yszresult0:"res/game/yaosaizi/ui/bzw_img_xiao.png",
    //yszresult1:"res/game/yaosaizi/ui/img_bz@2x.png",
    //yszresult2:"res/game/yaosaizi/ui/bzw_img_da.png",

    //=================单双=====================
    //goldToubao:"res/ui/A_toubaoTable.json",
    //goldToubaonew:"res/ui/A_toubaoTablenew.json",
    //chatMicLayerBzw:"res/ui/LookPlayerBZW.json",
    //reportTB:"res/ui/reportLayerTB.json",
    //tb_killPlist:"res/game/toubao/ui/tb_kill.plist",
    //tb_killPng:"res/game/toubao/ui/tb_kill.png",
    //sprkill:"res/game/toubao/ui/kill.png",
    //sprkill0:"res/game/toubao/ui/kill1.png",
    //sprkill1:"res/game/toubao/ui/kill2.png",
    //betlight:"res/game/toubao/ui/bet_light.png",
    //png_xysz:"res/game/toubao/ui/xysz.png",
    //betchiptb50:"res/game/coinRes/betchip5000.png",
    //betchiptb100:"res/game/coinRes/betchip10000.png",
    //betchiptb200:"res/game/coinRes/betchip20000.png",
    //betchiptb500:"res/game/coinRes/betchip50000.png",
    //betchiptb1000:"res/game/coinRes/betchip100000.png",
    //betchiptb5000:"res/game/coinRes/betchip500000.png",
    //tbresult0:"res/game/toubao/ui/tb_img_dan.png",
    //tbresult1:"res/game/toubao/ui/tb_img_shuang.png",

    //=================赛马=====================
    //horsepng_1:"res/ui/goldRacing/horse_1.png",
    //horseplist_1:"res/ui/goldRacing/horse_1.plist",
    //horsepng_2:"res/ui/goldRacing/horse_2.png",
    //horseplist_2:"res/ui/goldRacing/horse_2.plist",
    //horsepng_3:"res/ui/goldRacing/horse_3.png",
    //horseplist_3:"res/ui/goldRacing/horse_3.plist",
    //horsepng_4:"res/ui/goldRacing/horse_4.png",
    //horseplist_4:"res/ui/goldRacing/horse_4.plist",
    //horsepng_5:"res/ui/goldRacing/horse_5.png",
    //horseplist_5:"res/ui/goldRacing/horse_5.plist",
    //horsepng_6:"res/ui/goldRacing/horse_6.png",
    //horseplist_6:"res/ui/goldRacing/horse_6.plist",
    //racingNum1:"res/ui/goldRacing/1.png",
    //racingNum2:"res/game/racing/ui/2.png",
    //racingNum3:"res/game/racing/ui/3.png",
    //racingNum4:"res/game/racing/ui/4.png",
    //racingNum5:"res/game/racing/ui/5.png",
    //racingNum6:"res/game/racing/ui/6.png",
    //yybfwinroll: "res/game/racing/animate/goldyybf_ani.plist",
    //yybfwinrollpng: "res/game/racing/animate/goldyybf_ani.png",

    //=================豹子王=====================
    //betNormalImg:"res/ui/baoziWang/btn_default@2x.png",
    //betCannotImg:"res/ui/baoziWang/btn_grey@2x.png",
    //
    //betSlectImg:"res/game/leopardKing/ui/btn_pitchon@2x.png",
    //mdls:"res/game/leopardKing/ui/bzw_img_leave@2x.png",
    //dian1:"res/game/leopardKing/ui/bzw_img_1p@2x.png",
    //dian2:"res/game/leopardKing/ui/bzw_img_2p@2x.png",
    //dian3:"res/game/leopardKing/ui/bzw_img_3p@2x.png",
    //dian4:"res/game/leopardKing/ui/bzw_img_4p@2x.png",
    //dian5:"res/game/leopardKing/ui/bzw_img_5p@2x.png",
    //dian6:"res/game/leopardKing/ui/bzw_img_6p@2x.png",
    closeList:"res/game/leopardKing/ui/bzw_btn_player2@2x.png",
    //record0:"res/game/leopardKing/ui/bzw_img_small@2x.png",
    //record1:"res/game/leopardKing/ui/tzw_img_bao@2x.png",
    //record2:"res/game/leopardKing/ui/bzw_img_big@2x.png",
    //bzwKuang0:"res/game/leopardKing/ui/seat_head_01@2x.png",
    //
    //qxz:"res/ui/baoziWang/bzw_img_bet@2x.png",
    openList:"res/ui/baoziWang/bzw_btn_player@2x.png",
    //
    //greenImg:"res/game/leopardKing/ui/bzw_img_green@2x.png",
    //redImg:"res/game/leopardKing/ui/bzw_img_red@2x.png",
    //blueImg:"res/game/leopardKing/ui/bzw_img_blue@2x.png",
    //yellowImg:"res/game/leopardKing/ui/bzw_img_yellow@2x.png",
    //result0:"res/game/leopardKing/ui/bzw_img_xiao.png",
    //result2:"res/game/leopardKing/ui/bzw_img_da.png",
    //
    //result1:"res/ui/baoziWang/img_bz@2x.png",
    //
    //IMGdian1:"res/ui/baoziWang/zoushi/bzw_img_1dian@2x.png",
    //showdian4:"res/ui/baoziWang/zoushi/dian4.png",

    //IMGdian2:"res/game/leopardKing/ui/zoushi/bzw_img_2dian@2x.png",
    //IMGdian3:"res/game/leopardKing/ui/zoushi/bzw_img_3dian@2x.png",
    //IMGdian4:"res/game/leopardKing/ui/zoushi/bzw_img_4dian@2x.png",
    //IMGdian5:"res/game/leopardKing/ui/zoushi/bzw_img_5dian@2x.png",
    //IMGdian6:"res/game/leopardKing/ui/zoushi/bzw_img_6dian@2x.png",
    showdian3:"res/game/leopardKing/ui/zoushi/dian3.png",
    showdian5:"res/game/leopardKing/ui/zoushi/dian5.png",
    showdian6:"res/game/leopardKing/ui/zoushi/dian6.png",
    showdian7:"res/game/leopardKing/ui/zoushi/dian7.png",
    showdian8:"res/game/leopardKing/ui/zoushi/dian8.png",
    showdian9:"res/game/leopardKing/ui/zoushi/dian9.png",
    showdian10:"res/game/leopardKing/ui/zoushi/dian10.png",
    showdian11:"res/game/leopardKing/ui/zoushi/dian11.png",
    showdian12:"res/game/leopardKing/ui/zoushi/dian12.png",
    showdian13:"res/game/leopardKing/ui/zoushi/dian13.png",
    showdian14:"res/game/leopardKing/ui/zoushi/dian14.png",
    showdian15:"res/game/leopardKing/ui/zoushi/dian15.png",
    showdian16:"res/game/leopardKing/ui/zoushi/dian16.png",
    showdian17:"res/game/leopardKing/ui/zoushi/dian17.png",
    showdian18:"res/game/leopardKing/ui/zoushi/dian18.png",

    jsondayingjia02:"res/game/leopardKing/animate/dayingjia02.json",
    atlasdayingjia02:"res/game/leopardKing/animate/dayingjia02.atlas",
    pngdayingjia02:"res/game/leopardKing/animate/dayingjia02.png",
    dayingjia:"res/game/leopardKing/animate/dayingjia.png",
    jsonbaozi:"res/game/leopardKing/animate/baozi.json",
    atlasbaozi:"res/game/leopardKing/animate/baozi.atlas",
    pngbaozi:"res/game/leopardKing/animate/baozi.png",
    jsontouzhong:"res/game/leopardKing/animate/touzhong.json",
    atlastouzhong:"res/game/leopardKing/animate/touzhong.atlas",
    pngtouzhong:"res/game/leopardKing/animate/touzhong.png",

    chipPlist:"res/niuniuRes/chip.plist",
    chippng:"res/niuniuRes/chip.png",

    bzwKuang1:"res/ui/baoziWang/seat_head_02@2x.png",

    sex0:"res/commonUi/chatMic/imgMan@2x.png",
    sex1:"res/commonUi/chatMic/imgWoman@2x.png",

    player8Bg:"res/commonUi/room/bg_zhuomian@2x.png",
    //==========================
    nysNameIcon:"res/commonUi/glodCreate/yyjb_title_nys@2x.png",//LSH怎么搞的有重名啊啊啊啊啊啊

    nys0_0:"res/commonUi/glodCreate/yyjb_img_kpqz1@2x.png",
    nys0_1:"res/commonUi/glodCreate/yyjb_img_kpqz2@2x.png",
    nys1_0:"res/commonUi/glodCreate/yyjb_img_kptz1@2x.png",
    nys1_1:"res/commonUi/glodCreate/yyjb_img_kptz2@2x.png",
    nys2_0:"res/commonUi/glodCreate/yyjb_img_brwf1@2x.png",
    nys2_1:"res/commonUi/glodCreate/yyjb_img_brwf2@2x.png",
    pdk0_0:"res/commonUi/glodCreate/yyjb_img_erwf2@2x.png",
    pdk0_1:"res/commonUi/glodCreate/yyjb_img_erwf1@2x.png",
    pdk1_0:"res/commonUi/glodCreate/yyjb_img_srwf2@2x.png",
    pdk1_1:"res/commonUi/glodCreate/yyjb_img_srwf1@2x.png",

    //排行榜
    jsonCup1: "res/roomAnimate/goldRankingList/cup1.json",
    atlasCup1: "res/roomAnimate/goldRankingList/cup1.atlas",
    pngCup1: "res/roomAnimate/goldRankingList/cup1.png",
    jsonCup2: "res/roomAnimate/goldRankingList/cup2.json",
    atlasCup2: "res/roomAnimate/goldRankingList/cup2.atlas",
    pngCup2: "res/roomAnimate/goldRankingList/cup2.png",
    jsonCup3: "res/roomAnimate/goldRankingList/cup3.json",
    atlasCup3: "res/roomAnimate/goldRankingList/cup3.atlas",
    pngCup3: "res/roomAnimate/goldRankingList/cup3.png",

    playerHead:"res/ui/commonCells/commonPic/hallPic/goldScene/yyjb_bg_head1@2x.png",
    rankCellBg:"res/ui/goldRankingList/yyjb_bg_list2@2x.png",
    cuFont:"res/ui/Font/FZY4JW_0569.TTF",

    //商城
    duihuanTitle:"res/commonUi/goldShop/yyjb_title_shop1@2x.png",
    //金币场大厅
    jsonPSZ: "res/roomAnimate/pinsanzhang.json",
    atlasPSZ: "res/roomAnimate/pinsanzhang.atlas",
    pngPSZ: "res/roomAnimate/pinsanzhang.png",
    jsonNYS: "res/roomAnimate/niuyuanshuai2.json",
    atlasNYS: "res/roomAnimate/niuyuanshuai2.atlas",
    pngNYS: "res/roomAnimate/niuyuanshuai2.png",
    jsongold: "res/roomAnimate/jinbitubiao.json",
    atlasgold: "res/roomAnimate/jinbitubiao.atlas",
    pnggold: "res/roomAnimate/jinbitubiao.png",

    szpPrevNameIcon:"res/commonUi/goldScene/yyjb_title_psz@2x.png",
    nyxPrevNameIcon:"res/commonUi/goldScene/yyjb_title_nys@2x.png",//LSH怎么搞的有重名啊啊啊啊啊啊
    kwxPrevNameIcon:"res/commonUi/goldScene/yyjb_title_kwx@2x.png",
    bzwPrevNameIcon:"res/commonUi/goldScene/yyjb_title_bzw@2x.png",
    ttzTabNameIcon:"res/commonUi/goldScene/yyjb_title_ttz1@2x.png",
    ptjTabNameIcon:"res/commonUi/goldScene/yyjb_title_ptj@2x.png",
    pdkTabNameIcon:"res/commonUi/goldScene/yyjb_title_pdk@2x.png",
    dsTabNameIcon:"res/commonUi/goldScene/yyjb_title_ds@2x.png",

    //ttzDaTabNameIcon1:"res/commonUi/glodCreate/yyjb_img_wrwf1@2x.png",
    //ttzDaTabNameIcon2:"res/commonUi/glodCreate/yyjb_img_wrwf2@2x.png",
    //
    //ptjDaTabNameIcon1:"res/commonUi/glodCreate/yyjb_img_dpj1@2x.png",
    //ptjDaTabNameIcon2:"res/commonUi/glodCreate/yyjb_img_dpj2@2x.png",
    //ptjxiaoTabNameIcon1:"res/commonUi/glodCreate/yyjb_img_xpj1@2x.png",
    //ptjxiaoTabNameIcon2:"res/commonUi/glodCreate/yyjb_img_xpj2@2x.png",

    //bzwDaTabNameIcon1:"res/commonUi/glodCreate/yyjb_img_ptc1@2x.png",
    //bzwDaTabNameIcon2:"res/commonUi/glodCreate/yyjb_img_ptc2@2x.png",
    //bzwxiaoTabNameIcon1:"res/commonUi/glodCreate/yyjb_img_fhc1.png",
    //bzwxiaoTabNameIcon2:"res/commonUi/glodCreate/yyjb_img_fhc2@2x.png",

    szpWay_0:"res/ui/commonCells/commonPic/createPic/goldCreate/yyjb_btn_jdwf@2x.png",
    kwxWay_1:"res/ui/commonCells/commonPic/createPic/goldCreate/yyjb_btn_bmmwf.png",

    kwxWay_0:"res/commonUi/glodCreate/yyjb_btn_mmwf.png",
    kwxWay_2:"res/commonUi/glodCreate/yyjb_btn_qpdmm.png",
    kwxWay_3:"res/commonUi/glodCreate/yyjb_btn_qpdbmm.png",
    kwxWay_4:"res/commonUi/glodCreate/yyjb_btn_slwf.png",
    szpWay_1:"res/commonUi/glodCreate/yyjb_btn_gksz@2x.png",
    nysWay_0:"res/commonUi/glodCreate/yyjb_btn_kpqz@2x.png",
    nysWay_1:"res/commonUi/glodCreate/yyjb_btn_zyqz@2x.png",
    nysWay_2:"res/commonUi/glodCreate/yyjb_btn_brmp@2x.png",
    //ptjWay_0:"res/commonUi/glodCreate/yyjb_btn_dpj@2x.png",
    //ptjWay_1:"res/commonUi/glodCreate/yyjb_btn_xpj@2x.png",
    //bzwWay_0:"res/commonUi/glodCreate/btn_ptc@2x.png",
    //bzwWay_1:"res/commonUi/glodCreate/yyjb_btn_fhc@2x.png",
    ebgWay_0:"res/commonUi/glodCreate/yyjb_ebg_ptc@2x.png",
    ebgWay_1:"res/commonUi/glodCreate/yyjb_ebg_fhc@2x.png",
    dsWay_0:"res/commonUi/glodCreate/ds_bairen.png",

    game_coin:"res/ui/goldNYS/nn_img_gold@2x.png",

    goldRoomMvJson:"res/roomAnimate/meinv.json",
    goldRoomMvAtlas:"res/roomAnimate/meinv.atlas",
    goldRoomMvPng:"res/roomAnimate/meinv.png",

    //牛元帅房卡场
    nysDYJ:"res/ui/commonCells/commonPic/simpleEndPic/yyjb_img_dyj@2x.png",
    nysTH:"res/commonUi/end/yyjb_img_th@2x.png",

    txpmd_json:"res/game/nys/animate/txpmd.json",
    txpmd_atlas:"res/game/nys/animate/txpmd.atlas",
    txpmd_png:"res/game/nys/animate/txpmd.png",

    //二八杠
    ebgchipPlist:"res/game/erbagang/ui/ebgchip.plist",
    ebgchipPng:"res/game/erbagang/ui/ebgchip.png",
    ebgdianPlist:"res/game/erbagang/ui/ebgdian.plist",
    ebgdianPng:"res/game/erbagang/ui/ebgdian.png",
    ebglose:"res/game/erbagang/ui/28g_fu.png",
    ebgmdls:"res/game/erbagang/ui/28g_img_leave.png",

    ebgwin:"res/ui/A_erbagang/28g_sheng.png",
    ebgClick:"res/game/erbagang/ui/28g_img_yellow2.png",

    ebgqxz:"res/ui/A_erbagang/28g_img_bet.png",
    betchip10:"res/game/erbagang/ui/betchip10.png",
    betchip20:"res/game/erbagang/ui/betchip20.png",
    betchip50:"res/game/erbagang/ui/betchip50.png",
    betchip100:"res/game/erbagang/ui/betchip100.png",
    betchip200:"res/game/erbagang/ui/betchip200.png",
    betchip500:"res/game/erbagang/ui/betchip500.png",
    betchip1000:"res/game/erbagang/ui/betchip1000.png",

    ebgzcjson:"res/game/erbagang/animate/zc.json",
    ebgzcatlas:"res/game/erbagang/animate/zc.atlas",
    ebgzcpng:"res/game/erbagang/animate/zc.png",

    ebgendAnim1json:"res/game/erbagang/animate/zjts.json",
    ebgendAnim1atlas:"res/game/erbagang/animate/zjts.atlas",
    ebgendAnim1png:"res/game/erbagang/animate/zjts.png",

    ebgendAnim2json:"res/game/erbagang/animate/zjtp.json",
    ebgendAnim2atlas:"res/game/erbagang/animate/zjtp.atlas",
    ebgendAnim2png:"res/game/erbagang/animate/zjtp.png",

    //跑得快
    roler0Json:"res/game/paodekuai/animate/juese01.json",
    roler0Atlas:"res/game/paodekuai/animate/juese01.atlas",
    roler0Png:"res/game/paodekuai/animate/juese01.png",
    roler1Json:"res/game/paodekuai/animate/juese02.json",
    roler1Atlas:"res/game/paodekuai/animate/juese02.atlas",
    roler1Png:"res/game/paodekuai/animate/juese02.png",
    roler2Json:"res/game/paodekuai/animate/juese03.json",
    roler2Atlas:"res/game/paodekuai/animate/juese03.atlas",
    roler2Png:"res/game/paodekuai/animate/juese03.png",

    readyImg:"res/ui/niuniuPic/operate_prepare@2x.png",
    buyaoImg:"res/game/paodekuai/ui/img_buchu.png",
    pdktishiBg:"res/game/paodekuai/ui/brnn_beginbet@2x.png",

    feijiJson:"res/game/paodekuai/animate/feiji.json",
    feiji1Atlas:"res/game/paodekuai/animate/feiji.atlas",
    feiji1Png:"res/game/paodekuai/animate/feiji.png",
    feiji2Png:"res/game/paodekuai/animate/feiji2.png",
    feiji3Png:"res/game/paodekuai/animate/feiji3.png",

    shunziduiziJson:"res/game/paodekuai/animate/shunziduizi.json",
    shunziduiziAtlas:"res/game/paodekuai/animate/shunziduizi.atlas",
    shunziduiziPng:"res/game/paodekuai/animate/shunziduizi.png",

    zhadanJson:"res/game/paodekuai/animate/zhadan.json",
    zhadanAtlas:"res/game/paodekuai/animate/zhadan.atlas",
    zhadanPng:"res/game/paodekuai/animate/zhadan.png",

    pdkFirstLogo:"res/game/paodekuai/ui/img_shouchu.png",
    buyao0_0:"res/game/paodekuai/ui/buyao1.png",
    buyao0_1:"res/game/paodekuai/ui/buyao.png",
    buyao1_0:"res/game/paodekuai/ui/guo1.png",
    buyao1_1:"res/game/paodekuai/ui/guo.png",
    buyao2_0:"res/game/paodekuai/ui/yaobuqi1.png",
    buyao2_1:"res/game/paodekuai/ui/yaobuqi.png",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

var g_magic_chat = {
    magic_chat_1_1_json: "res/btnAnimate/renjidan/renjidan1.json",
    magic_chat_1_1_atlas: "res/btnAnimate/renjidan/renjidan1.atlas",
    magic_chat_1_1_png: "res/btnAnimate/renjidan/renjidan1.png",
    magic_chat_1_2_json: "res/btnAnimate/renjidan/renjidan2.json",
    magic_chat_1_2_atlas: "res/btnAnimate/renjidan/renjidan2.atlas",
    magic_chat_1_2_png: "res/btnAnimate/renjidan/renjidan2.png",
    magic_chat_2_1_json: "res/btnAnimate/tuoxie/tuoxie1.json",
    magic_chat_2_1_atlas: "res/btnAnimate/tuoxie/tuoxie1.atlas",
    magic_chat_2_1_png: "res/btnAnimate/tuoxie/tuoxie1.png",
    magic_chat_2_2_json: "res/btnAnimate/tuoxie/tuoxie2.json",
    magic_chat_2_2_atlas: "res/btnAnimate/tuoxie/tuoxie2.atlas",
    magic_chat_2_2_png: "res/btnAnimate/tuoxie/tuoxie2.png",
    magic_chat_3_1_json: "res/btnAnimate/dianzan/dianzan1.json",
    magic_chat_3_1_atlas: "res/btnAnimate/dianzan/dianzan1.atlas",
    magic_chat_3_1_png: "res/btnAnimate/dianzan/dianzan1.png",
    magic_chat_3_2_json: "res/btnAnimate/dianzan/dianzan2.json",
    magic_chat_3_2_atlas: "res/btnAnimate/dianzan/dianzan2.atlas",
    magic_chat_3_2_png: "res/btnAnimate/dianzan/dianzan2.png",
    magic_chat_4_1_json: "res/btnAnimate/xianwen/xianwen1.json",
    magic_chat_4_1_atlas: "res/btnAnimate/xianwen/xianwen1.atlas",
    magic_chat_4_1_png: "res/btnAnimate/xianwen/xianwen1.png",
    magic_chat_4_2_json: "res/btnAnimate/xianwen/xianwen2.json",
    magic_chat_4_2_atlas: "res/btnAnimate/xianwen/xianwen2.atlas",
    magic_chat_4_2_png: "res/btnAnimate/xianwen/xianwen2.png",
    magic_chat_5_1_json: "res/btnAnimate/xianhua/xianhua1.json",
    magic_chat_5_1_atlas: "res/btnAnimate/xianhua/xianhua1.atlas",
    magic_chat_5_1_png: "res/btnAnimate/xianhua/xianhua1.png",
    magic_chat_5_2_json: "res/btnAnimate/xianhua/xianhua2.json",
    magic_chat_5_2_atlas: "res/btnAnimate/xianhua/xianhua2.atlas",
    magic_chat_5_2_png: "res/btnAnimate/xianhua/xianhua2.png",

};

for (var i in g_magic_chat) {
    g_resources.push(g_magic_chat[i]);
};

var g_chat_expression = {
    expression0_json:"res/expresssion/bishi.json",
    expression0_atlas:"res/expresssion/bishi.atlas",
    expression0_png:"res/expresssion/bishi.png",
    expression1_json:"res/expresssion/bizui.json",
    expression1_atlas:"res/expresssion/bizui.atlas",
    expression1_png:"res/expresssion/bizui.png",
    expression2_json:"res/expresssion/daku.json",
    expression2_atlas:"res/expresssion/daku.atlas",
    expression2_png:"res/expresssion/daku.png",
    expression3_json:"res/expresssion/danu.json",
    expression3_atlas:"res/expresssion/danu.atlas",
    expression3_png:"res/expresssion/danu.png",
    expression4_json:"res/expresssion/daxiao.json",
    expression4_atlas:"res/expresssion/daxiao.atlas",
    expression4_png:"res/expresssion/daxiao.png",
    expression5_json:"res/expresssion/jianxiao.json",
    expression5_atlas:"res/expresssion/jianxiao.atlas",
    expression5_png:"res/expresssion/jianxiao.png",
    expression6_json:"res/expresssion/jingya.json",
    expression6_atlas:"res/expresssion/jingya.atlas",
    expression6_png:"res/expresssion/jingya.png",
    expression7_json:"res/expresssion/lenghan.json",
    expression7_atlas:"res/expresssion/lenghan.atlas",
    expression7_png:"res/expresssion/lenghan.png",
    expression8_json:"res/expresssion/paishou.json",
    expression8_atlas:"res/expresssion/paishou.atlas",
    expression8_png:"res/expresssion/paishou.png",
    expression9_json:"res/expresssion/sexiao.json",
    expression9_atlas:"res/expresssion/sexiao.atlas",
    expression9_png:"res/expresssion/sexiao.png",
    expression10_json:"res/expresssion/shaoxiang.json",
    expression10_atlas:"res/expresssion/shaoxiang.atlas",
    expression10_png:"res/expresssion/shaoxiang.png",
    expression11_json:"res/expresssion/shuizhao.json",
    expression11_atlas:"res/expresssion/shuizhao.atlas",
    expression11_png:"res/expresssion/shuizhao.png",
    expression12_json:"res/expresssion/tushe.json",
    expression12_atlas:"res/expresssion/tushe.atlas",
    expression12_png:"res/expresssion/tushe.png",
    expression13_json:"res/expresssion/tuxue.json",
    expression13_atlas:"res/expresssion/tuxue.atlas",
    expression13_png:"res/expresssion/tuxue.png",
    expression14_json:"res/expresssion/wunai.json",
    expression14_atlas:"res/expresssion/wunai.atlas",
    expression14_png:"res/expresssion/wunai.png",
    expression15_json:"res/expresssion/xiaoku.json",
    expression15_atlas:"res/expresssion/xiaoku.atlas",
    expression15_png:"res/expresssion/xiaoku.png",
    expression16_json:"res/expresssion/xingyun.json",
    expression16_atlas:"res/expresssion/xingyun.atlas",
    expression16_png:"res/expresssion/xingyun.png",
    expression17_json:"res/expresssion/yiwen.json",
    expression17_atlas:"res/expresssion/yiwen.atlas",
    expression17_png:"res/expresssion/yiwen.png",
    expression18_json:"res/expresssion/zaijian.json",
    expression18_atlas:"res/expresssion/zaijian.atlas",
    expression18_png:"res/expresssion/zaijian.png",
    expression19_json:"res/expresssion/zhuakuang.json",
    expression19_atlas:"res/expresssion/zhuakuang.atlas",
    expression19_png:"res/expresssion/zhuakuang.png",
};

for (var i in g_chat_expression) {
    g_resources.push(g_chat_expression[i]);
};



var g_chatstr = ["快点啊，都等的我的花儿都谢了",
    "又断线啦？网络怎么这么差",
    "不要走,决战到天亮",
    "你的牌打得太好了",
    "你是妹妹还是哥哥啊",
    "和你合作真实太愉快了",
    "大家好，很高兴见到各位",
    "各位不好意思，我得离开一下",
    "不要吵了，不要吵了，吵啥嘛吵，专心玩游戏",];

var g_chatstr_sl = ["666，获得了手气王，不要太羡慕！",
    "哎~运气好，没办法！",
    "常在河边走，哪有不中雷！",
    "大伙继续啊，扫雷到底！",
    "哥们快点啊，准备开始啦！",
    "今天这是要发啊，哈哈!",
    "居然断线了，关键时刻掉链子",
    "扫雷不可怕，谁踩谁尴尬！",
    "哟嚯，你怎么又踩雷了！"];

var g_chatstr_nys = [
    "别吵了,别吵了,专心玩游戏",
    "君子报仇下局不晚,这局暂且放过你",
    "同志们,敢不敢火拼一把?",
    "我是庄家,谁敢挑战我?",
    "风水轮流转,这些钱全是我的",
    "哈哈哈,一把推注翻身了",
    "底牌搓出来绝对吓死你们",
    "这次是要牛气冲天啊，牛逼",
    "我加注了,你敢不敢跟?",
    "这样也被我赢了,真是服了",
    "看我通杀全场!",
    "我早就看穿你的牌了,哈哈!"];

var g_chatstr_bzw_man = [
    "兄弟们,敢不敢火拼一把",
    "我是庄家,谁敢挑战我",
    "试试今天的手气",
    "看我大杀四方",
    "君子爱财,取之有道",
    "唉,香油钱都输没了"
];

var g_chatstr_bzw_woman = [
    "姐妹们,敢不敢火拼一把",
    "我是庄家,谁敢挑战我",
    "试试我的手气如何",
    "看我大杀四方",
    "我是高高在上的女皇,呵呵呵呵",
    "唉,真是红颜薄命啊"
];




var g_face = [
    "res/ui/commonCells/commonPic/chatPic/chat_1.png",
    "res/ui/commonCells/commonPic/chatPic/chat_2.png",
    "res/ui/commonCells/commonPic/chatPic/chat_3.png",
    "res/ui/commonCells/commonPic/chatPic/chat_4.png",
    "res/ui/commonCells/commonPic/chatPic/chat_5.png",
    "res/ui/commonCells/commonPic/chatPic/chat_6.png",
    "res/ui/commonCells/commonPic/chatPic/chat_7.png",
    "res/ui/commonCells/commonPic/chatPic/chat_8.png",
    "res/ui/commonCells/commonPic/chatPic/chat_9.png",
    "res/ui/commonCells/commonPic/chatPic/chat_10.png",
    "res/ui/commonCells/commonPic/chatPic/chat_11.png",
    "res/ui/commonCells/commonPic/chatPic/chat_12.png",
    "res/ui/commonCells/commonPic/chatPic/chat_13.png",
    "res/ui/commonCells/commonPic/chatPic/chat_14.png",
    "res/ui/commonCells/commonPic/chatPic/chat_15.png",
    "res/ui/commonCells/commonPic/chatPic/chat_16.png",
    "res/ui/commonCells/commonPic/chatPic/chat_17.png",
    "res/ui/commonCells/commonPic/chatPic/chat_18.png",
    "res/ui/commonCells/commonPic/chatPic/chat_19.png",
    "res/ui/commonCells/commonPic/chatPic/chat_20.png",
];

for(var i = 0;i < g_face.length;i++){
    g_resources.push(g_face[i]);
}


var goldniu_music = {
    niu_100_w: "res/sound/dn_effect/niu_niu_w.mp3",
    niu_700_w: "res/sound/dn_effect/niu_sizha_w.mp3",
    niu_400_w: "res/sound/dn_effect/niu_wuhua_w.mp3",
    niu_500_w: "res/sound/dn_effect/niu_5_s_w.mp3",
};

var g_music = {
    bmg: "res/sound/bgplay.mp3",
    flychips:"res/sound/fly_effect/chips_fly.mp3",
    flycoins:"res/sound/fly_effect/coins_fly.mp3",
    selectGameMp3: "res/sound/selectGame.mp3",
    unselectMp3: "res/sound/unselect.mp3",
    selectItemMp3:"res/sound/selectItem.mp3",
    touchGrilMp3:"res/sound/touchGril.mp3",
    niu_0_w: "res/sound/dn_effect/niu_0_w.mp3",
    niu_91_w: "res/sound/dn_effect/niu_1_w.mp3",
    niu_92_w: "res/sound/dn_effect/niu_2_w.mp3",
    niu_93_w: "res/sound/dn_effect/niu_3_w.mp3",
    niu_94_w: "res/sound/dn_effect/niu_4_w.mp3",
    niu_95_w: "res/sound/dn_effect/niu_5_w.mp3",
    niu_96_w: "res/sound/dn_effect/niu_6_w.mp3",
    niu_97_w: "res/sound/dn_effect/niu_7_w.mp3",
    niu_98_w: "res/sound/dn_effect/niu_8_w.mp3",
    niu_99_w: "res/sound/dn_effect/niu_9_w.mp3",
    niu_100_w: "res/sound/dn_effect/niu_niu_w.mp3",
    niu_700_w: "res/sound/dn_effect/niu_sizha_w.mp3",
    niu_300_w: "res/sound/dn_effect/niu_wuhua_w.mp3",
    niu_500_w: "res/sound/dn_effect/niu_5_s_w.mp3",
    niu_0_m: "res/sound/dn_effect/niu_0_m.mp3",
    niu_91_m: "res/sound/dn_effect/niu_1_m.mp3",
    niu_92_m: "res/sound/dn_effect/niu_2_m.mp3",
    niu_93_m: "res/sound/dn_effect/niu_3_m.mp3",
    niu_94_m: "res/sound/dn_effect/niu_4_m.mp3",
    niu_95_m: "res/sound/dn_effect/niu_5_m.mp3",
    niu_96_m: "res/sound/dn_effect/niu_6_m.mp3",
    niu_97_m: "res/sound/dn_effect/niu_7_m.mp3",
    niu_98_m: "res/sound/dn_effect/niu_8_m.mp3",
    niu_99_m: "res/sound/dn_effect/niu_9_m.mp3",
    niu_100_m: "res/sound/dn_effect/niu_niu_m.mp3",
    niu_700_m: "res/sound/dn_effect/niu_sizha_m.mp3",
    niu_300_m: "res/sound/dn_effect/niu_wuhua_m.mp3",
    niu_500_m: "res/sound/dn_effect/niu_5_s_m.mp3",

    fix_msg_1: "res/sound/fix_msg_1.mp3",
    fix_msg_2: "res/sound/fix_msg_2.mp3",
    fix_msg_3: "res/sound/fix_msg_3.mp3",
    fix_msg_4: "res/sound/fix_msg_4.mp3",
    fix_msg_5: "res/sound/fix_msg_5.mp3",
    fix_msg_6: "res/sound/fix_msg_6.mp3",
    fix_msg_7: "res/sound/fix_msg_7.mp3",
    fix_msg_8: "res/sound/fix_msg_8.mp3",
    fix_msg_9: "res/sound/fix_msg_9.mp3",

    //龍珠多寶
    //dra_freezhuan:"res/sound/dragon/GoldenDragon_freespinbgm.mp3",
    //dra_dianzhuan:"res/sound/dragon/GoldenDragon_spin.mp3",
    //dra_zhuanstop:"res/sound/dragon/GoldenDragon_Reel_Stop.mp3",
    //dra_zhongjiang:"res/sound/dragon/GoldenDragon_win.mp3",
    //dra_getchip:"res/sound/dragon/Getchip.mp3",
    //dra_click:"res/sound/dragon/GoldenDragon_Click.mp3",
    //dra_wild:"res/sound/dragon/GoldenDragon_wild.mp3",
    //
    ////地穴探宝
    //dfh_walk:"res/sound/dxtb/dfh_walk.mp3",
    //dfh_deathdown:"res/sound/dxtb/dfh_deathdown.mp3",
    //dfh_deathup:"res/sound/dxtb/dfh_deathup.mp3",
    //dfh_zhuan:"res/sound/dxtb/dfh_zhuan.mp3",

    //斗地主音效
    Man_0: "res/sound/ddz_effect/Man_0.mp3",
    Man_1: "res/sound/ddz_effect/Man_1.mp3",
    Man_2: "res/sound/ddz_effect/Man_2.mp3",
    Man_3: "res/sound/ddz_effect/Man_3.mp3",
    Man_4: "res/sound/ddz_effect/Man_4.mp3",
    Man_5: "res/sound/ddz_effect/Man_5.mp3",
    Man_6: "res/sound/ddz_effect/Man_6.mp3",
    Man_7: "res/sound/ddz_effect/Man_7.mp3",
    Man_8: "res/sound/ddz_effect/Man_8.mp3",
    Man_9: "res/sound/ddz_effect/Man_9.mp3",
    Man_10: "res/sound/ddz_effect/Man_10.mp3",
    Man_11: "res/sound/ddz_effect/Man_11.mp3",
    Man_12: "res/sound/ddz_effect/Man_12.mp3",
    Man_13: "res/sound/ddz_effect/Man_13.mp3",
    Man_14: "res/sound/ddz_effect/Man_14.mp3",

    Man_dui0: "res/sound/ddz_effect/Man_dui0.mp3",
    Man_dui1: "res/sound/ddz_effect/Man_dui1.mp3",
    Man_dui2: "res/sound/ddz_effect/Man_dui2.mp3",
    Man_dui3: "res/sound/ddz_effect/Man_dui3.mp3",
    Man_dui4: "res/sound/ddz_effect/Man_dui4.mp3",
    Man_dui5: "res/sound/ddz_effect/Man_dui5.mp3",
    Man_dui6: "res/sound/ddz_effect/Man_dui6.mp3",
    Man_dui7: "res/sound/ddz_effect/Man_dui7.mp3",
    Man_dui8: "res/sound/ddz_effect/Man_dui8.mp3",
    Man_dui9: "res/sound/ddz_effect/Man_dui9.mp3",
    Man_dui10: "res/sound/ddz_effect/Man_dui10.mp3",
    Man_dui11: "res/sound/ddz_effect/Man_dui11.mp3",
    Man_dui12: "res/sound/ddz_effect/Man_dui12.mp3",

    Man_tuple0: "res/sound/ddz_effect/Man_tuple0.mp3",
    Man_tuple1: "res/sound/ddz_effect/Man_tuple1.mp3",
    Man_tuple2: "res/sound/ddz_effect/Man_tuple2.mp3",
    Man_tuple3: "res/sound/ddz_effect/Man_tuple3.mp3",
    Man_tuple4: "res/sound/ddz_effect/Man_tuple4.mp3",
    Man_tuple5: "res/sound/ddz_effect/Man_tuple5.mp3",
    Man_tuple6: "res/sound/ddz_effect/Man_tuple6.mp3",
    Man_tuple7: "res/sound/ddz_effect/Man_tuple7.mp3",
    Man_tuple8: "res/sound/ddz_effect/Man_tuple8.mp3",
    Man_tuple9: "res/sound/ddz_effect/Man_tuple9.mp3",
    Man_tuple10: "res/sound/ddz_effect/Man_tuple10.mp3",
    Man_tuple11: "res/sound/ddz_effect/Man_tuple11.mp3",
    Man_tuple12: "res/sound/ddz_effect/Man_tuple12.mp3",

    Man_zhadan: "res/sound/ddz_effect/Man_zhadan.mp3",
    Man_sandaiyi: "res/sound/ddz_effect/Man_sandaiyi.mp3",
    Man_sandaiyidui: "res/sound/ddz_effect/Man_sandaiyidui.mp3",
    Man_shunzi: "res/sound/ddz_effect/Man_shunzi.mp3",
    Man_liandui: "res/sound/ddz_effect/Man_liandui.mp3",
    Man_sidaier: "res/sound/ddz_effect/Man_sidaier.mp3",
    Man_sidailiangdui: "res/sound/ddz_effect/Man_sidailiangdui.mp3",
    Man_feiji: "res/sound/ddz_effect/Man_feiji.mp3",
    Man_wangzha: "res/sound/ddz_effect/Man_wangzha.mp3",
    Man_buyao: "res/sound/ddz_effect/Man_buyao.mp3",
    Man_NoOrder: "res/sound/ddz_effect/Man_NoOrder.mp3",
    Man_Order: "res/sound/ddz_effect/Man_Order.mp3",
    Man_Rob1: "res/sound/ddz_effect/Man_Rob1.mp3",
    Man_bujiabei: "res/sound/ddz_effect/Man_bujiabei.mp3",
    Man_jiabei: "res/sound/ddz_effect/Man_jiabei.mp3",
    Woman_jiabei:"res/sound/ddz_effect/Woman_jiabei.mp3",

    //炸金花
    f_add: "res/sound/zjh_effect/f_add.mp3",
    f_follow1: "res/sound/zjh_effect/f_follow1.mp3",
    f_giveup: "res/sound/zjh_effect/f_giveup.mp3",
    f_see: "res/sound/zjh_effect/f_see.mp3",
    fire: "res/sound/zjh_effect/fire.mp3",
    m_add: "res/sound/zjh_effect/m_add.mp3",
    m_follow1: "res/sound/zjh_effect/m_follow1.mp3",
    m_giveup: "res/sound/zjh_effect/m_giveup.mp3",
    m_see: "res/sound/zjh_effect/m_see.mp3",
    Man_one_card: "res/sound/ddz_effect/Man_one_card.mp3",
    Man_two_card: "res/sound/ddz_effect/Man_two_card.mp3",

    //炸金花金币场
    pleaseBet:"res/sound/zjh_effect/pleaseBet.mp3",
    zjhBg:"res/sound/zjh_effect/zjhBg.mp3",

    //赛马
    racingstart: "res/sound/saima/horse_start.mp3",
    racingrun: "res/sound/saima/horse_run_bgm.mp3",
    racingbets: "res/sound/saima/horse_bet_bg.mp3",
    racingwin: "res/sound/saima/horse_win.mp3",

    /*
    * 十点半
    * */
    sdb_boomCard  : "res/sound/sdb_effect/boomCard.mp3",
    sdb_dealCard  : "res/sound/sdb_effect/dealCard.mp3",
    sdb_dontCard  : "res/sound/sdb_effect/dontCard.mp3",
    sdb_double    : "res/sound/sdb_effect/double.mp3",
    sdb_fiveSmall : "res/sound/sdb_effect/fiveSmall.mp3",
    sdb_hwx       : "res/sound/sdb_effect/hwx.mp3",
    sdb_king      : "res/sound/sdb_effect/king.mp3",
    sdb_tallCard  : "res/sound/sdb_effect/tallCard.mp3",
    sdb_tenHalf   : "res/sound/sdb_effect/tenHalf.mp3",
    sdb_wantCard  : "res/sound/sdb_effect/wantCard.mp3",

    game_fapai : "res/sound/gamefapai.mp3",

    game_ptj_bet:"res/game/pingtianjiu/sound/bet.mp3",
    game_ptj_dealcard:"res/game/pingtianjiu/sound/dealcard.mp3",
    game_ptj_dice:"res/game/pingtianjiu/sound/dice.mp3",
    game_ptj_kaicard:"res/game/pingtianjiu/sound/kaicard.mp3",
    game_ptj_pleasebet:"res/game/pingtianjiu/sound/pleasebet.mp3",
    game_ptj_rocksezi:"res/game/pingtianjiu/sound/rockdice.mp3",

    gold_ring   : "res/sound/bet.mp3",
    sl_suc      : "res/sound/sl_suc.mp3",
    sl_msg_m1   : "res/sound/sl_effect/sl_msg_m1.mp3",
    sl_msg_m2   : "res/sound/sl_effect/sl_msg_m2.mp3",
    sl_msg_m3   : "res/sound/sl_effect/sl_msg_m3.mp3",
    sl_msg_m4   : "res/sound/sl_effect/sl_msg_m4.mp3",
    sl_msg_m5   : "res/sound/sl_effect/sl_msg_m5.mp3",
    sl_msg_m6   : "res/sound/sl_effect/sl_msg_m6.mp3",
    sl_msg_m7   : "res/sound/sl_effect/sl_msg_m7.mp3",
    sl_msg_m8   : "res/sound/sl_effect/sl_msg_m8.mp3",
    sl_msg_m9   : "res/sound/sl_effect/sl_msg_m9.mp3",
    sl_msg_w1   : "res/sound/sl_effect/sl_msg_w1.mp3",
    sl_msg_w2   : "res/sound/sl_effect/sl_msg_w2.mp3",
    sl_msg_w3   : "res/sound/sl_effect/sl_msg_w3.mp3",
    sl_msg_w4   : "res/sound/sl_effect/sl_msg_w4.mp3",
    sl_msg_w5   : "res/sound/sl_effect/sl_msg_w5.mp3",
    sl_msg_w6   : "res/sound/sl_effect/sl_msg_w6.mp3",
    sl_msg_w7   : "res/sound/sl_effect/sl_msg_w7.mp3",
    sl_msg_w8   : "res/sound/sl_effect/sl_msg_w8.mp3",
    sl_msg_w9   : "res/sound/sl_effect/sl_msg_w9.mp3",

    //卡五星
    //bmg: "res/sound/bgm.m4a",
    s1: "res/sound/kwx/1.mp3",
    s2: "res/sound/kwx/2.mp3",
    s3: "res/sound/kwx/3.mp3",
    s4: "res/sound/kwx/4.mp3",
    s5: "res/sound/kwx/5.mp3",
    s6: "res/sound/kwx/6.mp3",
    s7: "res/sound/kwx/7.mp3",
    s8: "res/sound/kwx/8.mp3",
    s9: "res/sound/kwx/9.mp3",
    s11: "res/sound/kwx/11.mp3",
    s12: "res/sound/kwx/12.mp3",
    s13: "res/sound/kwx/13.mp3",
    s14: "res/sound/kwx/14.mp3",
    s15: "res/sound/kwx/15.mp3",
    s16: "res/sound/kwx/16.mp3",
    s17: "res/sound/kwx/17.mp3",
    s18: "res/sound/kwx/18.mp3",
    s19: "res/sound/kwx/19.mp3",
    s31: "res/sound/kwx/31.mp3",
    s32: "res/sound/kwx/32.mp3",
    s33: "res/sound/kwx/33.mp3",
    peng: "res/sound/kwx/peng.mp3",
    gang: "res/sound/kwx/gang.mp3",
    liang: "res/sound/kwx/liang.mp3",
    hu: "res/sound/kwx/hu.mp3",
    zimo: "res/sound/kwx/zimo.mp3",
    //一夜暴富
    //yybfbgm: "res/sound/yybf/dscc40.mp3",
    //龙虎斗
    lhdresult0: "res/sound/lhd/longwin.mp3",
    lhdresult1: "res/sound/lhd/huwin.mp3",
    lhdresult2: "res/sound/lhd/he.mp3",
    lhdbgm: "res/sound/lhd/bgsound.mp3",
    lhdeffect1: "res/sound/lhd/lhdeff1.mp3",
    lhdeffect2: "res/sound/lhd/lhdeff2.mp3",
    lhdeffect3: "res/sound/lhd/lhdeff3.mp3",
    lhdeffect4: "res/sound/lhd/lhdeff4.mp3",
    lhdeffect5: "res/sound/lhd/lhdeff5.mp3",
    lhdeffect6: "res/sound/lhd/lhdeff6.mp3",
    lhdeffect7: "res/sound/lhd/lhdeff7.mp3",
    lhdeffect8: "res/sound/lhd/lhdeff8.mp3",
    lhdeffect9: "res/sound/lhd/lhdeff9.mp3",
    lhdeffect10: "res/sound/lhd/lhdeff10.mp3",
    lhdeffect11: "res/sound/lhd/lhdeff11.mp3",
    lhdeffect12: "res/sound/lhd/lhdeff12.mp3",
    lhdeffect13: "res/sound/lhd/lhdeff13.mp3",
    //豹子王
    //baozi:"res/sound/bzw/baozi.mp3",
    //dice2:"res/sound/bzw/dice2.mp3",
    //dice3:"res/sound/bzw/dice3.mp3",
    //dice4:"res/sound/bzw/dice4.mp3",
    //dice5:"res/sound/bzw/dice5.mp3",
    //dice6:"res/sound/bzw/dice6.mp3",
    //dice7:"res/sound/bzw/dice7.mp3",
    //dice8:"res/sound/bzw/dice8.mp3",
    //dice9:"res/sound/bzw/dice9.mp3",
    //dice10:"res/sound/bzw/dice10.mp3",
    //dice11:"res/sound/bzw/dice11.mp3",
    //dice12:"res/sound/bzw/dice12.mp3",
    //dice13:"res/sound/bzw/dice13.mp3",
    //dice14:"res/sound/bzw/dice14.mp3",
    //dice15:"res/sound/bzw/dice15.mp3",
    //dice16:"res/sound/bzw/dice16.mp3",
    //dice17:"res/sound/bzw/dice17.mp3",
    //baozi_dice3:"res/sound/bzw/baozi_dice3.mp3",
    //baozi_dice6:"res/sound/bzw/baozi_dice6.mp3",
    //baozi_dice9:"res/sound/bzw/baozi_dice9.mp3",
    //baozi_dice12:"res/sound/bzw/baozi_dice12.mp3",
    //baozi_dice15:"res/sound/bzw/baozi_dice15.mp3",
    //baozi_dice18:"res/sound/bzw/baozi_dice18.mp3",

    //! 翻牌机
    //fpjReward: "res/sound/fpj/S_Social_Reward.mp3",
    //fpjbem: "res/sound/fpj/Video_BGM.mp3",
    //fpjwinMuisc: "res/sound/fpj/Video_DoubleSuccess.mp3",
    //fpjsound1: "res/sound/fpj/Video_Voice1.mp3",
    //fpjsound2: "res/sound/fpj/Video_Voice2.mp3",
    //fpjsound3: "res/sound/fpj/Video_Voice3.mp3",
    //fpjsound4: "res/sound/fpj/Video_Voice4.mp3",
    //fpjsound5: "res/sound/fpj/Video_Voice5.mp3",
    //fpjsound6: "res/sound/fpj/Video_Voice6.mp3",
    //fpjsound7: "res/sound/fpj/Video_Voice7.mp3",
    //fpjsound8: "res/sound/fpj/Video_Voice8.mp3",
    //fpjsound9: "res/sound/fpj/Video_Voice9.mp3",

    //! 单双
    //diceds2:"res/sound/toubao/dice2.mp3",
    //diceds3:"res/sound/toubao/dice3.mp3",
    //diceds4:"res/sound/toubao/dice4.mp3",
    //diceds5:"res/sound/toubao/dice5.mp3",
    //diceds6:"res/sound/toubao/dice6.mp3",
    //diceds7:"res/sound/toubao/dice7.mp3",
    //diceds8:"res/sound/toubao/dice8.mp3",
    //diceds9:"res/sound/toubao/dice9.mp3",
    //diceds10:"res/sound/toubao/dice10.mp3",
    //diceds11:"res/sound/toubao/dice11.mp3",
    //diceds12:"res/sound/toubao/dice12.mp3",

    //kpTip:"res/sound/bzw/kpTip.mp3",
    //laugh0:"res/sound/bzw/laugh1.mp3",
    //laugh1:"res/sound/bzw/laugh2.mp3",
    //laugh2:"res/sound/bzw/laugh3.mp3",
    //lose0:"res/sound/bzw/lose1.mp3",
    //lose1:"res/sound/bzw/lose2.mp3",
    //openCup0:"res/sound/bzw/openCup0.mp3",
    openCup1:"res/sound/bzw/openCup1.mp3",
    //xzTip:"res/sound/bzw/xzTip.mp3",
    //ybao_bg:"res/sound/bzw/ybao_bg.mp3",
    //roll:"res/sound/bzw/roll.mp3",
    //xz0:"res/sound/bzw/xz1.mp3",
    //xz1:"res/sound/bzw/xz2.mp3",
    //xz2:"res/sound/bzw/xz3.mp3",
    //xz3:"res/sound/bzw/xz4.mp3",
    //xz4:"res/sound/bzw/xz5.mp3",
    //xz5:"res/sound/bzw/xz6.mp3",
    //xzds0:"res/sound/toubao/xz1.mp3",
    //xzds1:"res/sound/toubao/xz2.mp3",
    //xzds2:"res/sound/toubao/xz3.mp3",
    //xzds3:"res/sound/toubao/xz4.mp3",
    //xzds4:"res/sound/toubao/xz5.mp3",
    //xzds5:"res/sound/toubao/xz6.mp3",

    //ysz_dice3:"res/sound/bzw/ysz_dice3.mp3",
    //ysz_dice4:"res/sound/bzw/ysz_dice4.mp3",
    //ysz_dice5:"res/sound/bzw/ysz_dice5.mp3",
    //ysz_dice6:"res/sound/bzw/ysz_dice6.mp3",
    //ysz_dice7:"res/sound/bzw/ysz_dice7.mp3",
    //ysz_dice8:"res/sound/bzw/ysz_dice8.mp3",
    //ysz_dice9:"res/sound/bzw/ysz_dice9.mp3",
    //ysz_dice10:"res/sound/bzw/ysz_dice10.mp3",
    //ysz_dice11:"res/sound/bzw/ysz_dice11.mp3",
    //ysz_baozi_dice2:"res/sound/bzw/ysz_baozi_dice2.mp3",
    //ysz_baozi_dice4:"res/sound/bzw/ysz_baozi_dice4.mp3",
    //ysz_baozi_dice6:"res/sound/bzw/ysz_baozi_dice6.mp3",
    //ysz_baozi_dice8:"res/sound/bzw/ysz_baozi_dice8.mp3",
    //ysz_baozi_dice10:"res/sound/bzw/ysz_baozi_dice10.mp3",
    //ysz_baozi_dice12:"res/sound/bzw/ysz_baozi_dice12.mp3",
    ysz_kpTip:"res/sound/bzw/ysz_kpTip.mp3",
    ysz_laugh0:"res/sound/bzw/ysz_laugh1.mp3",
    ysz_laugh1:"res/sound/bzw/ysz_laugh2.mp3",
    ysz_laugh2:"res/sound/bzw/ysz_laugh3.mp3",
    ysz_lose0:"res/sound/bzw/ysz_lose1.mp3",
    ysz_lose1:"res/sound/bzw/ysz_lose2.mp3",
    ysz_xzTip:"res/sound/bzw/ysz_xzTip.mp3",
    ysz_xz0:"res/sound/bzw/ysz_xz1.mp3",
    ysz_xz1:"res/sound/bzw/ysz_xz2.mp3",
    ysz_xz2:"res/sound/bzw/ysz_xz3.mp3",
    ysz_xz3:"res/sound/bzw/ysz_xz4.mp3",
    ysz_xz4:"res/sound/bzw/ysz_xz5.mp3",
    ysz_xz5:"res/sound/bzw/ysz_xz6.mp3",

    winMusic:"res/sound/win.mp3",
    loseMusic:"res/sound/lose.mp3",

    //百人推筒子
    brttz_endsound1:"res/sound/brttz/ttz_tongsha.mp3",
    brttz_endsound2:"res/sound/brttz/ttz_tongpei.mp3",
    brttz_opencard:"res/sound/brttz/ttz_card_open.mp3",
    brttz_mdls:"res/sound/brttz/ttz_mdls.mp3",
    brttz_xz0:"res/sound/brttz/ttz_xz1.mp3",
    brttz_xz1:"res/sound/brttz/ttz_xz2.mp3",
    brttz_xz2:"res/sound/brttz/ttz_xz3.mp3",
    brttz_xz3:"res/sound/brttz/ttz_xz4.mp3",
    brttz_xz4:"res/sound/brttz/ttz_xz5.mp3",
    brttz_xz5:"res/sound/brttz/ttz_xz6.mp3",
    brttz_xz6:"res/sound/brttz/ttz_xz7.mp3",
    brttz_xztip:"res/sound/brttz/ttz_xz_tip.mp3",
    brttz_laugh0:"res/sound/brttz/ttz_xj_win.mp3",
    brttz_laugh1:"res/sound/brttz/ttz_xj_win_2.mp3",
    brttz_lose:"res/sound/brttz/ttz_xj_lose.mp3",
    brttz_bg:"res/sound/brttz/ttz_bg.mp3",

    //魔法表情
    magic0:"res/sound/magic_effect/maginc0.mp3",
    magic1:"res/sound/magic_effect/maginc1.mp3",
    magic2:"res/sound/magic_effect/maginc2.mp3",
    magic3:"res/sound/magic_effect/maginc3.mp3",
    magic4:"res/sound/magic_effect/maginc4.mp3",

    //跑得快
    buyao0:"res/sound/pdk/pdk_buyao.mp3",
    buyao1:"res/sound/pdk/pdk_guo.mp3",
    buyao2:"res/sound/pdk/pdk_yaobuqi.mp3",

    //神仙夺宝
    //sxdb_startRun:"res/sound/sxdb_music/sgj_start.mp3",
    //sxdb_loopRun:"res/sound/sxdb_music/sgj_loop.mp3",
    //sxdb_endRun:"res/sound/sxdb_music/sgj_end.mp3",
    //nansound_21:"res/sound/sxdb_music/nansound_21.mp3",
    //nansound_22:"res/sound/sxdb_music/nansound_22.mp3",
    //nansound_23:"res/sound/sxdb_music/nansound_23.mp3",
    //nansound_24:"res/sound/sxdb_music/nansound_24.mp3",
    //nansound_25:"res/sound/sxdb_music/nansound_25.mp3",
    //nansound_26:"res/sound/sxdb_music/nansound_26.mp3",
    //nansound_27:"res/sound/sxdb_music/nansound_27.mp3",
    //nansound_28:"res/sound/sxdb_music/nansound_28.mp3",
    //nansound_29:"res/sound/sxdb_music/nansound_29.mp3",

    //nvsound_11:"res/sound/sxdb_music/nvsound_11.mp3",
    //nvsound_12:"res/sound/sxdb_music/nvsound_12.mp3",
    //nvsound_13:"res/sound/sxdb_music/nvsound_13.mp3",
    //nvsound_14:"res/sound/sxdb_music/nvsound_14.mp3",
    //nvsound_15:"res/sound/sxdb_music/nvsound_15.mp3",
    //nvsound_16:"res/sound/sxdb_music/nvsound_16.mp3",
    //nvsound_17:"res/sound/sxdb_music/nvsound_17.mp3",
    //nvsound_18:"res/sound/sxdb_music/nvsound_18.mp3",
    //nvsound_19:"res/sound/sxdb_music/nvsound_19.mp3",
};

//扎金花金币场
for(var i = 0;i<4;i++){
    //跟牌
    g_music["m_g" + i] = "res/sound/zjh_effect/male/m_g" + i + ".mp3";
    g_music["f_g" + i] = "res/sound/zjh_effect/famale/f_g" + i + ".mp3";
    //加注
    g_music["m_j" + i] = "res/sound/zjh_effect/male/m_j" + i + ".mp3";
    g_music["f_j" + i] = "res/sound/zjh_effect/famale/f_j" + i + ".mp3";
    //弃牌
    g_music["m_q" + i] = "res/sound/zjh_effect/male/m_q" + i + ".mp3";
    g_music["f_q" + i] = "res/sound/zjh_effect/famale/f_q" + i + ".mp3";
    //看牌
    if(i < 2){
        g_music["m_k" + i] = "res/sound/zjh_effect/male/m_k" + i + ".mp3";
        g_music["f_k" + i] = "res/sound/zjh_effect/famale/f_k" + i + ".mp3";
    }
    //搓牌、比牌
    if(i < 1){
        g_music["m_c" + i] = "res/sound/zjh_effect/male/m_c" + i + ".mp3";
        g_music["f_c" + i] = "res/sound/zjh_effect/famale/f_c" + i + ".mp3";
        g_music["m_b" + i] = "res/sound/zjh_effect/male/m_b" + i + ".mp3";
        g_music["f_b" + i] = "res/sound/zjh_effect/famale/f_b" + i + ".mp3";
        g_music["f_b" + i] = "res/sound/zjh_effect/famale/f_b" + i + ".mp3";
    }
}

//豹子王
for(var i = 1;i < 7;i++ ){
    g_music["nan"+i] = "res/sound/bzw/nan"+i+".mp3";
    g_music["nv"+i] = "res/sound/bzw/nv"+i+".mp3";
}

var resnameman = []; resnameman[0] = 0;
var resnamewoman = []; resnamewoman[0] = 0;
for(var i = 1; i < 78; i++){
    resnameman[i] = "res/game/pingtianjiu/sound/man/"+ i+".mp3";
    resnamewoman[i] = "res/game/pingtianjiu/sound/woman/"+ i+".mp3";
    g_resources.push(resnameman[i]);
    g_resources.push(resnamewoman[i]);
};
//推筒子
g_music.ttzdealsd = "res/sound/ttz/TTZ_deal.mp3";
g_resources.push(g_music.ttzdealsd);
for(var k=0;k<24;k++){
    var ttzindex = 100+k*5; //方便了程序，但不方便阅读修改
    g_music["ttz_mansd_"+ttzindex] = "res/sound/ttz/man/ttz_mansd_"+k+".mp3";
    g_music["ttz_womansd_"+ttzindex] = "res/sound/ttz/woman/ttz_womansd_"+k+".mp3";
}
for (var i in g_music) {
    g_resources.push(g_music[i]);
}
for(var i in goldniu_music){
    g_resources.push(goldniu_music[i]);
}


var g_manTalk = [
    "res/sound/PT_M_quyu_0.mp3",
    "res/sound/PT_M_quyu_1.mp3",
    "res/sound/PT_M_quyu_2.mp3",
    "res/sound/PT_M_quyu_3.mp3",
    "res/sound/PT_M_quyu_4.mp3",
    "res/sound/PT_M_quyu_5.mp3",
    "res/sound/PT_M_quyu_6.mp3",
    "res/sound/PT_M_quyu_7.mp3",
    "res/sound/PT_M_quyu_8.mp3",
];


var g_womanTalk = [
    "res/sound/PT_W_quyu_0.mp3",
    "res/sound/PT_W_quyu_1.mp3",
    "res/sound/PT_W_quyu_2.mp3",
    "res/sound/PT_W_quyu_3.mp3",
    "res/sound/PT_W_quyu_4.mp3",
    "res/sound/PT_W_quyu_5.mp3",
    "res/sound/PT_W_quyu_6.mp3",
    "res/sound/PT_W_quyu_7.mp3",
    "res/sound/PT_W_quyu_8.mp3",
];

var nys_manTalk = []; nys_manTalk[0] = 0;
var nys_womanTalk = []; nys_womanTalk[0] = 0
for(var i = 0;i < 12;i++){
    nys_manTalk[i] = ("res/sound/nys_effect/nan/"+(i+1)+".mp3");
    nys_womanTalk[i] = ("res/sound/nys_effect/nv/"+(i+1)+".mp3");
    g_resources.push(nys_manTalk[i]);
    g_resources.push(nys_womanTalk[i]);
}


var g_magic_chat = {
    magic_chat_1_1_json: "res/btnAnimate/renjidan/renjidan1.json",
    magic_chat_1_1_atlas: "res/btnAnimate/renjidan/renjidan1.atlas",
    magic_chat_1_1_png: "res/btnAnimate/renjidan/renjidan1.png",
    magic_chat_1_2_json: "res/btnAnimate/renjidan/renjidan2.json",
    magic_chat_1_2_atlas: "res/btnAnimate/renjidan/renjidan2.atlas",
    magic_chat_1_2_png: "res/btnAnimate/renjidan/renjidan2.png",
    magic_chat_2_1_json: "res/btnAnimate/tuoxie/tuoxie1.json",
    magic_chat_2_1_atlas: "res/btnAnimate/tuoxie/tuoxie1.atlas",
    magic_chat_2_1_png: "res/btnAnimate/tuoxie/tuoxie1.png",
    magic_chat_2_2_json: "res/btnAnimate/tuoxie/tuoxie2.json",
    magic_chat_2_2_atlas: "res/btnAnimate/tuoxie/tuoxie2.atlas",
    magic_chat_2_2_png: "res/btnAnimate/tuoxie/tuoxie2.png",
    magic_chat_3_1_json: "res/btnAnimate/dianzan/dianzan1.json",
    magic_chat_3_1_atlas: "res/btnAnimate/dianzan/dianzan1.atlas",
    magic_chat_3_1_png: "res/btnAnimate/dianzan/dianzan1.png",
    magic_chat_3_2_json: "res/btnAnimate/dianzan/dianzan2.json",
    magic_chat_3_2_atlas: "res/btnAnimate/dianzan/dianzan2.atlas",
    magic_chat_3_2_png: "res/btnAnimate/dianzan/dianzan2.png",
    magic_chat_4_1_json: "res/btnAnimate/xianwen/xianwen1.json",
    magic_chat_4_1_atlas: "res/btnAnimate/xianwen/xianwen1.atlas",
    magic_chat_4_1_png: "res/btnAnimate/xianwen/xianwen1.png",
    magic_chat_4_2_json: "res/btnAnimate/xianwen/xianwen2.json",
    magic_chat_4_2_atlas: "res/btnAnimate/xianwen/xianwen2.atlas",
    magic_chat_4_2_png: "res/btnAnimate/xianwen/xianwen2.png",
    magic_chat_5_1_json: "res/btnAnimate/xianhua/xianhua1.json",
    magic_chat_5_1_atlas: "res/btnAnimate/xianhua/xianhua1.atlas",
    magic_chat_5_1_png: "res/btnAnimate/xianhua/xianhua1.png",
    magic_chat_5_2_json: "res/btnAnimate/xianhua/xianhua2.json",
    magic_chat_5_2_atlas: "res/btnAnimate/xianhua/xianhua2.atlas",
    magic_chat_5_2_png: "res/btnAnimate/xianhua/xianhua2.png",

};

for (var i in g_magic_chat) {
    g_resources.push(g_magic_chat[i]);
}
for(var i in g_womanTalk){
    g_resources.push(g_womanTalk[i]);
}

for(var i in g_manTalk){
    g_resources.push(g_manTalk[i]);
}
/**
 * Created by yang on 2016/11/9.
 */

if(!g_will_room) {
    var g_will_room = 0;
}
if(!g_islogin) {
    var g_islogin = false;
}
if(!g_isgame) {
    var g_isgame = false;
}

if(!g_iscuopai) {
    var g_iscuopai = false;
}

if(!g_ShowBattery){
    var g_ShowBattery = true;
}

var gameclass = gameclass || {};

gameclass.game = cc.Class.extend({
    modmgr:null,
    uimgr:null,
    ctor:function () {
        this.init();
    }
});

gameclass.game.prototype.init = function(){
    this.modmgr = new gameclass.modmgr;
    this.uimgr = new gameclass.uimgr;
    this.modmgr.setgame(this);
    this.uimgr.setgame(this);
    gameclass.mod_platform.game = this;
};
gameclass.clone = function (obj) {
    var o;
    if (typeof obj == "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(gameclass.clone(obj[i]));
                }
            } else {
                o = {};
                for (var j in obj) {
                    o[j] = gameclass.clone(obj[j]);
                }
            }
        }
    } else {
        o = obj;
    }
    return o;
};
gameclass.getGameMainType = function (gameType) {
    var result = gameType;
    if(gameType == gameclass.gameszp_fk){
        result = gameclass.gameszp;
    }else if(gameType == gameclass.gamelzddz){
        result = gameclass.gameddz;
    }else if(gameType == gameclass.gamejxnn){
        result = gameclass.gameniuniu;
    }else if(gameType == gameclass.gamebrnys || gameType == gameclass.gamezynys || gameType == gameclass.gamegdnys || gameType == gameclass.gamesznys){
        result = gameclass.gamenys;
    }else if(gameType == gameclass.gamekwx1 || gameType == gameclass.gamekwx2 || gameType == gameclass.gamekwx3 || gameType == gameclass.gamekwx4 || gameType == gameclass.gamekwx5){
        result = gameclass.gamekwx;
    }
    return result;
}
/**
 * 根据游戏类型获取游戏名
 * @param gameType
 * @return {string}
 */
gameclass.getGameName = function (gameType) {
    gameType = gameclass.getGameMainType(gameType);
    var result = "";
    if(gameType == gameclass.gamekwx){
        result = staticString.gameKwxName;
    }else if(gameType == gameclass.gameszp){
        result = staticString.gamePszName;
    }else if(gameType == gameclass.gameniuniu){
        result = staticString.gameNnName;
    }else if(gameType == gameclass.gameddz){
        result = staticString.gameDdzName;
    }else if(gameType == gameclass.gamenys){
        result = staticString.gameNysName;
    }else if(gameType == gameclass.gameptj){
        result = staticString.gamePtjName;
    }else if(gameType == gameclass.gamettz){
        result = staticString.gameTtzName;
    }else if(gameType == gameclass.gamesdb){
        result = staticString.gameSdbName;
    }else if(gameType == gameclass.gamenxs){
        result = staticString.gameSlName;
    }
    return result;
};
gameclass.createbtnpress = function (node,name, endfunc,begin,cansel,data) {

    var btn = ccui.helper.seekWidgetByName(node, name);
    if(btn){
        return gameclass.createbtnpressSub(btn, endfunc,begin,cansel,data);

    }else{
        cc.log("btnbtn:"+name + " not found");
    }

};
gameclass.createbtnpressSub = function (btnNode, endfunc,begin,cansel,data) {
    var btnFunc = function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if (endfunc != null) {
                    endfunc(sender,type,data);
                }
                var child = btnNode.getChildByTag(1231);
                mod_sound.playeffect(g_music["selectItemMp3"], false);
                if(child != null) {
                    child.setScale(1);
                }
                break;
            case ccui.Widget.TOUCH_BEGAN:
                if (begin != null){
                    begin(sender,type,data);
                }
                var child = btnNode.getChildByTag(1231);
                if(child != null) {
                    child.setScale(1.1);
                }
                break;
            case ccui.Widget.TOUCH_CANCELED:
                if (cansel != null){
                    cansel(sender,type,data);
                }
                var child = btnNode.getChildByTag(1231);
                if(child != null) {
                    child.setScale(1);
                }
                break;
        }
    };
    btnNode.addTouchEventListener(btnFunc);
    return btnNode;
};

//飘字提示
gameclass.showText=function(_str){
    var textBg=new cc.Sprite(res.tips_bg);
    textBg.setPosition(cc.winSize.width*0.5, cc.winSize.height*0.5);
    cc.director.getRunningScene().addChild(textBg, 100000);
    var label=new cc.LabelTTF(_str,"res/Font/FZY4JW_0569.TTF",30);
    label.setPosition(textBg.width*0.5, textBg.height*0.55);
    textBg.addChild(label);
    var ani = cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.05, 1, 1), cc.delayTime(0.6), cc.moveBy(0.6, 0, 150), cc.callFunc(function(sender) {
        textBg.removeFromParent(true);
    }));
    textBg.runAction(ani);
    //textBg.scheduleOnce(function(){
    //    textBg.removeFromParent(true);
    //},1)
};

//艺术字体飘分  type可以缩放
gameclass.showYSText = function(_score,_startPos,_parentNode,type){
    var node = new gameclass.piaofen(_score);
    if(type==1){
        node.setScale(0.7);
    }
    node.setPosition(_startPos);
    _parentNode.addChild(node);
    node.runAction(cc.sequence(cc.delayTime(1),cc.moveBy(0.5,cc.p(0,50)),cc.callFunc(function(sender){
        sender.removeFromParent(true);
        sender = null;
    })))
};
gameclass.showFSText = function(_score,_startPos,_parentNode,type){
    var node = new gameclass.piaofen(_score);
    var baseScale = 1.0;
    if(1 == type){
        baseScale = 0.7
    }else if(2 == type){
        baseScale = 0.5;
    }
    var actScale = baseScale + 0.1;
    node.setScale(baseScale);
    node.setPosition(_startPos);
    _parentNode.addChild(node);
    node.runAction(cc.sequence(cc.delayTime(0.8),cc.scaleTo(0.15, actScale, actScale),
        cc.scaleTo(0.15, baseScale, baseScale),cc.callFunc(function(sender){
            sender.removeFromParent(true);
            sender = null;
        })))
};
//开局动画
gameclass.showStartAnim = function(_parentNode){
    var node = new gameclass.startAnim();
    node.setPosition(1136/2,320);
    _parentNode.addChild(node);
};

//转换金钱显示模式
gameclass.changeShow = function(_money){
    if(_money >= 10000){
        return (_money - _money%1000)/10000 + "万";
    }
    return _money;
};

//本地存储
gameclass.saveLocalData = function(_saveName,_obj){
    var obj = JSON.stringify(_obj);
    cc.sys.localStorage.setItem(_saveName,_obj);
};

//本地取
gameclass.getLocalData = function(_saveName){
    var data = cc.sys.localStorage.getItem(_saveName);
    if(!data){
        return null;
    }else{
        return JSON.parse(data);
    }
};

(function(){
    var BASE64_MAPPING = [
        'A','B','C','D','E','F','G','H',
        'I','J','K','L','M','N','O','P',
        'Q','R','S','T','U','V','W','X',
        'Y','Z','a','b','c','d','e','f',
        'g','h','i','j','k','l','m','n',
        'o','p','q','r','s','t','u','v',
        'w','x','y','z','0','1','2','3',
        '4','5','6','7','8','9','+','/'
    ];

    /**
     *ascii convert to binary
     */
    var _toBinary = function(ascii){
        var binary = new Array();
        while(ascii > 0){
            var b = ascii%2;
            ascii = Math.floor(ascii/2);
            binary.push(b);
        }
        /*
         var len = binary.length;
         if(6-len > 0){
         for(var i = 6-len ; i > 0 ; --i){
         binary.push(0);
         }
         }*/
        binary.reverse();
        return binary;
    };

    /**
     *binary convert to decimal
     */
    var _toDecimal  = function(binary){
        var dec = 0;
        var p = 0;
        for(var i = binary.length-1 ; i >= 0 ; --i){
            var b = binary[i];
            if(b == 1){
                dec += Math.pow(2 , p);
            }
            ++p;
        }
        return dec;
    };

    /**
     *unicode convert to utf-8
     */
    var _toUTF8Binary = function(c , binaryArray){
        var mustLen = (8-(c+1)) + ((c-1)*6);
        var fatLen = binaryArray.length;
        var diff = mustLen - fatLen;
        while(--diff >= 0){
            binaryArray.unshift(0);
        }
        var binary = [];
        var _c = c;
        while(--_c >= 0){
            binary.push(1);
        }
        binary.push(0);
        var i = 0 , len = 8 - (c+1);
        for(; i < len ; ++i){
            binary.push(binaryArray[i]);
        }

        for(var j = 0 ; j < c-1 ; ++j){
            binary.push(1);
            binary.push(0);
            var sum = 6;
            while(--sum >= 0){
                binary.push(binaryArray[i++]);
            }
        }
        return binary;
    };

    var __BASE64 = {
        /**
         *BASE64 Encode
         */
        encoder:function(str){
            var base64_Index = [];
            var binaryArray = [];
            for(var i = 0 , len = str.length ; i < len ; ++i){
                var unicode = str.charCodeAt(i);
                var _tmpBinary = _toBinary(unicode);
                if(unicode < 0x80){
                    var _tmpdiff = 8 - _tmpBinary.length;
                    while(--_tmpdiff >= 0){
                        _tmpBinary.unshift(0);
                    }
                    binaryArray = binaryArray.concat(_tmpBinary);
                }else if(unicode >= 0x80 && unicode <= 0x7FF){
                    binaryArray = binaryArray.concat(_toUTF8Binary(2 , _tmpBinary));
                }else if(unicode >= 0x800 && unicode <= 0xFFFF){//UTF-8 3byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(3 , _tmpBinary));
                }else if(unicode >= 0x10000 && unicode <= 0x1FFFFF){//UTF-8 4byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(4 , _tmpBinary));
                }else if(unicode >= 0x200000 && unicode <= 0x3FFFFFF){//UTF-8 5byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(5 , _tmpBinary));
                }else if(unicode >= 4000000 && unicode <= 0x7FFFFFFF){//UTF-8 6byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(6 , _tmpBinary));
                }
            }

            var extra_Zero_Count = 0;
            for(var i = 0 , len = binaryArray.length ; i < len ; i+=6){
                var diff = (i+6)-len;
                if(diff == 2){
                    extra_Zero_Count = 2;
                }else if(diff == 4){
                    extra_Zero_Count = 4;
                }
                //if(extra_Zero_Count > 0){
                //	len += extra_Zero_Count+1;
                //}
                var _tmpExtra_Zero_Count = extra_Zero_Count;
                while(--_tmpExtra_Zero_Count >= 0){
                    binaryArray.push(0);
                }
                base64_Index.push(_toDecimal(binaryArray.slice(i , i+6)));
            }

            var base64 = '';
            for(var i = 0 , len = base64_Index.length ; i < len ; ++i){
                base64 += BASE64_MAPPING[base64_Index[i]];
            }

            for(var i = 0 , len = extra_Zero_Count/2 ; i < len ; ++i){
                base64 += '=';
            }
            return base64;
        },
        /**
         *BASE64  Decode for UTF-8
         */
        decoder : function(_base64Str){
            var _len = _base64Str.length;
            var extra_Zero_Count = 0;
            /**
             *计算在进行BASE64编码的时候，补了几个0
             */
            if(_base64Str.charAt(_len-1) == '='){
                //alert(_base64Str.charAt(_len-1));
                //alert(_base64Str.charAt(_len-2));
                if(_base64Str.charAt(_len-2) == '='){//两个等号说明补了4个0
                    extra_Zero_Count = 4;
                    _base64Str = _base64Str.substring(0 , _len-2);
                }else{//一个等号说明补了2个0
                    extra_Zero_Count = 2;
                    _base64Str = _base64Str.substring(0 , _len - 1);
                }
            }

            var binaryArray = [];
            for(var i = 0 , len = _base64Str.length; i < len ; ++i){
                var c = _base64Str.charAt(i);
                for(var j = 0 , size = BASE64_MAPPING.length ; j < size ; ++j){
                    if(c == BASE64_MAPPING[j]){
                        var _tmp = _toBinary(j);
                        /*不足6位的补0*/
                        var _tmpLen = _tmp.length;
                        if(6-_tmpLen > 0){
                            for(var k = 6-_tmpLen ; k > 0 ; --k){
                                _tmp.unshift(0);
                            }
                        }
                        binaryArray = binaryArray.concat(_tmp);
                        break;
                    }
                }
            }

            if(extra_Zero_Count > 0){
                binaryArray = binaryArray.slice(0 , binaryArray.length - extra_Zero_Count);
            }

            var unicode = [];
            var unicodeBinary = [];
            for(var i = 0 , len = binaryArray.length ; i < len ; ){
                if(binaryArray[i] == 0){
                    unicode=unicode.concat(_toDecimal(binaryArray.slice(i,i+8)));
                    i += 8;
                }else{
                    var sum = 0;
                    while(i < len){
                        if(binaryArray[i] == 1){
                            ++sum;
                        }else{
                            break;
                        }
                        ++i;
                    }
                    unicodeBinary = unicodeBinary.concat(binaryArray.slice(i+1 , i+8-sum));
                    i += 8 - sum;
                    while(sum > 1){
                        unicodeBinary = unicodeBinary.concat(binaryArray.slice(i+2 , i+8));
                        i += 8;
                        --sum;
                    }
                    unicode = unicode.concat(_toDecimal(unicodeBinary));
                    unicodeBinary = [];
                }
            }
            return unicode;
        }
    };

    gameclass.base64 = __BASE64;
})();

gameclass.title = "傲世娱乐";   //! 标题
gameclass.download = "http://asyl.190youxi.com/asqp/";  //! 下载链接
gameclass.endpoint = "oss-cn-shanghai.aliyuncs.com";  //! 语音
gameclass.keyid = "LTAIxCSQ9HZnByrt";    //! 语音
gameclass.secretid = "vmX4lESfZ52BHY0vQEmHPLIZAIDlmn";    //! 语音
gameclass.bucket = "asqpvoice";
gameclass.test = "false";

var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                var label = event.getCurrentTarget();
                if (cc.KEY.back == keyCode) {
                    // var _msgbox = uimgr.showui("Msgbox");
                    // _msgbox.showmsgbox2(2,jbstring.Getetstring("str137"),function(){
                    if (!cc.sys.isNative) {
                    }
                    else {
                        if (cc.sys.os == sys.OS_IOS) {

                        } else if (cc.sys.os == sys.OS_ANDROID) {
                            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JsCall", "exit", "(Ljava/lang/String;)V", "");
                        }
                        else {

                        }
                    }

                    // });
                    //cc.log("onKeyPressedonKeyPressedonKeyPressedonKeyPressed");
                }

            },
            onKeyReleased: function (keyCode, event) {
                //var label = event.getCurrentTarget();
                //cc.log("onKeyReleasedonKeyReleasedonKeyReleasedonKeyReleasedonKeyReleased");
            }
        }, this);

        return true;
    }
});

var game = null;

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
        var _this = this;
        game = new gameclass.game;
        game.helloWorld = layer;

        getcsvmgr.init();

        game.uimgr.showui("gameclass.loginui");

        gameclass.mod_platform.setbaseinfo(JSON.stringify({"title":gameclass.title, "download":gameclass.download, "endpoint":gameclass.endpoint, "keyid":gameclass.keyid, "secretid":gameclass.secretid, "bucket":gameclass.bucket, "test":gameclass.test}));

        //进入后台
        cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function (event) {
            cc.log("game.EVENT_HIDE!" + g_isgame);
            if (g_isgame) {
                var mysocket = game.modmgr.mod_login.mod_game.mywebsocket;
                var data = {"line": false};
                mysocket.send("gameline", data);
            }
        });

        //恢复显示
        cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function (event) {
            cc.log("game.EVENT_SHOW");

            if (g_isgame) {
                var mysocket = game.modmgr.mod_login.mod_game.mywebsocket;
                var data = {"line": true};
                mysocket.send("gameline", data);
            }
        });

        //var seq = cc.sequence(cc.delayTime(1),cc.callFunc(function () {
        //    gameclass.mod_platform.pertocpp();
        //}));
        //
        //_this.runAction(cc.repeatForever(seq))

    }
});

window.onerror = function (msg, url, l, columnNumber, errorObj) {
//Handle the error here
//     cc.log("......................................................................");
//     cc.log("msg:"+msg);
//     cc.log("file:"+url);
//     cc.log("line:"+l);
//     cc.log("......................................................................");
//     cc.log("debuginfo:" +errorObj.stack);
//     cc.log("......................................................................");
//     //alert("ok");
//     alert(errorObj.stack);
//     return true;
}


Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/* pako 1.0.4 nodeca/pako */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.pako=e()}}(function(){return function e(t,i,n){function a(o,s){if(!i[o]){if(!t[o]){var f="function"==typeof require&&require;if(!s&&f)return f(o,!0);if(r)return r(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var d=i[o]={exports:{}};t[o][0].call(d.exports,function(e){var i=t[o][1][e];return a(i?i:e)},d,d.exports,e,t,i,n)}return i[o].exports}for(var r="function"==typeof require&&require,o=0;o<n.length;o++)a(n[o]);return a}({1:[function(e,t,i){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;i.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var i=t.shift();if(i){if("object"!=typeof i)throw new TypeError(i+"must be non-object");for(var n in i)i.hasOwnProperty(n)&&(e[n]=i[n])}}return e},i.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var a={arraySet:function(e,t,i,n,a){if(t.subarray&&e.subarray)return void e.set(t.subarray(i,i+n),a);for(var r=0;r<n;r++)e[a+r]=t[i+r]},flattenChunks:function(e){var t,i,n,a,r,o;for(n=0,t=0,i=e.length;t<i;t++)n+=e[t].length;for(o=new Uint8Array(n),a=0,t=0,i=e.length;t<i;t++)r=e[t],o.set(r,a),a+=r.length;return o}},r={arraySet:function(e,t,i,n,a){for(var r=0;r<n;r++)e[a+r]=t[i+r]},flattenChunks:function(e){return[].concat.apply([],e)}};i.setTyped=function(e){e?(i.Buf8=Uint8Array,i.Buf16=Uint16Array,i.Buf32=Int32Array,i.assign(i,a)):(i.Buf8=Array,i.Buf16=Array,i.Buf32=Array,i.assign(i,r))},i.setTyped(n)},{}],2:[function(e,t,i){"use strict";function n(e,t){if(t<65537&&(e.subarray&&o||!e.subarray&&r))return String.fromCharCode.apply(null,a.shrinkBuf(e,t));for(var i="",n=0;n<t;n++)i+=String.fromCharCode(e[n]);return i}var a=e("./common"),r=!0,o=!0;try{String.fromCharCode.apply(null,[0])}catch(e){r=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){o=!1}for(var s=new a.Buf8(256),f=0;f<256;f++)s[f]=f>=252?6:f>=248?5:f>=240?4:f>=224?3:f>=192?2:1;s[254]=s[254]=1,i.string2buf=function(e){var t,i,n,r,o,s=e.length,f=0;for(r=0;r<s;r++)i=e.charCodeAt(r),55296===(64512&i)&&r+1<s&&(n=e.charCodeAt(r+1),56320===(64512&n)&&(i=65536+(i-55296<<10)+(n-56320),r++)),f+=i<128?1:i<2048?2:i<65536?3:4;for(t=new a.Buf8(f),o=0,r=0;o<f;r++)i=e.charCodeAt(r),55296===(64512&i)&&r+1<s&&(n=e.charCodeAt(r+1),56320===(64512&n)&&(i=65536+(i-55296<<10)+(n-56320),r++)),i<128?t[o++]=i:i<2048?(t[o++]=192|i>>>6,t[o++]=128|63&i):i<65536?(t[o++]=224|i>>>12,t[o++]=128|i>>>6&63,t[o++]=128|63&i):(t[o++]=240|i>>>18,t[o++]=128|i>>>12&63,t[o++]=128|i>>>6&63,t[o++]=128|63&i);return t},i.buf2binstring=function(e){return n(e,e.length)},i.binstring2buf=function(e){for(var t=new a.Buf8(e.length),i=0,n=t.length;i<n;i++)t[i]=e.charCodeAt(i);return t},i.buf2string=function(e,t){var i,a,r,o,f=t||e.length,l=new Array(2*f);for(a=0,i=0;i<f;)if(r=e[i++],r<128)l[a++]=r;else if(o=s[r],o>4)l[a++]=65533,i+=o-1;else{for(r&=2===o?31:3===o?15:7;o>1&&i<f;)r=r<<6|63&e[i++],o--;o>1?l[a++]=65533:r<65536?l[a++]=r:(r-=65536,l[a++]=55296|r>>10&1023,l[a++]=56320|1023&r)}return n(l,a)},i.utf8border=function(e,t){var i;for(t=t||e.length,t>e.length&&(t=e.length),i=t-1;i>=0&&128===(192&e[i]);)i--;return i<0?t:0===i?t:i+s[e[i]]>t?i:t}},{"./common":1}],3:[function(e,t,i){"use strict";function n(e,t,i,n){for(var a=65535&e|0,r=e>>>16&65535|0,o=0;0!==i;){o=i>2e3?2e3:i,i-=o;do a=a+t[n++]|0,r=r+a|0;while(--o);a%=65521,r%=65521}return a|r<<16|0}t.exports=n},{}],4:[function(e,t,i){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],5:[function(e,t,i){"use strict";function n(){for(var e,t=[],i=0;i<256;i++){e=i;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[i]=e}return t}function a(e,t,i,n){var a=r,o=n+i;e^=-1;for(var s=n;s<o;s++)e=e>>>8^a[255&(e^t[s])];return e^-1}var r=n();t.exports=a},{}],6:[function(e,t,i){"use strict";function n(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}t.exports=n},{}],7:[function(e,t,i){"use strict";var n=30,a=12;t.exports=function(e,t){var i,r,o,s,f,l,d,u,c,h,b,w,m,k,_,g,v,p,x,y,S,E,B,Z,A;i=e.state,r=e.next_in,Z=e.input,o=r+(e.avail_in-5),s=e.next_out,A=e.output,f=s-(t-e.avail_out),l=s+(e.avail_out-257),d=i.dmax,u=i.wsize,c=i.whave,h=i.wnext,b=i.window,w=i.hold,m=i.bits,k=i.lencode,_=i.distcode,g=(1<<i.lenbits)-1,v=(1<<i.distbits)-1;e:do{m<15&&(w+=Z[r++]<<m,m+=8,w+=Z[r++]<<m,m+=8),p=k[w&g];t:for(;;){if(x=p>>>24,w>>>=x,m-=x,x=p>>>16&255,0===x)A[s++]=65535&p;else{if(!(16&x)){if(0===(64&x)){p=k[(65535&p)+(w&(1<<x)-1)];continue t}if(32&x){i.mode=a;break e}e.msg="invalid literal/length code",i.mode=n;break e}y=65535&p,x&=15,x&&(m<x&&(w+=Z[r++]<<m,m+=8),y+=w&(1<<x)-1,w>>>=x,m-=x),m<15&&(w+=Z[r++]<<m,m+=8,w+=Z[r++]<<m,m+=8),p=_[w&v];i:for(;;){if(x=p>>>24,w>>>=x,m-=x,x=p>>>16&255,!(16&x)){if(0===(64&x)){p=_[(65535&p)+(w&(1<<x)-1)];continue i}e.msg="invalid distance code",i.mode=n;break e}if(S=65535&p,x&=15,m<x&&(w+=Z[r++]<<m,m+=8,m<x&&(w+=Z[r++]<<m,m+=8)),S+=w&(1<<x)-1,S>d){e.msg="invalid distance too far back",i.mode=n;break e}if(w>>>=x,m-=x,x=s-f,S>x){if(x=S-x,x>c&&i.sane){e.msg="invalid distance too far back",i.mode=n;break e}if(E=0,B=b,0===h){if(E+=u-x,x<y){y-=x;do A[s++]=b[E++];while(--x);E=s-S,B=A}}else if(h<x){if(E+=u+h-x,x-=h,x<y){y-=x;do A[s++]=b[E++];while(--x);if(E=0,h<y){x=h,y-=x;do A[s++]=b[E++];while(--x);E=s-S,B=A}}}else if(E+=h-x,x<y){y-=x;do A[s++]=b[E++];while(--x);E=s-S,B=A}for(;y>2;)A[s++]=B[E++],A[s++]=B[E++],A[s++]=B[E++],y-=3;y&&(A[s++]=B[E++],y>1&&(A[s++]=B[E++]))}else{E=s-S;do A[s++]=A[E++],A[s++]=A[E++],A[s++]=A[E++],y-=3;while(y>2);y&&(A[s++]=A[E++],y>1&&(A[s++]=A[E++]))}break}}break}}while(r<o&&s<l);y=m>>3,r-=y,m-=y<<3,w&=(1<<m)-1,e.next_in=r,e.next_out=s,e.avail_in=r<o?5+(o-r):5-(r-o),e.avail_out=s<l?257+(l-s):257-(s-l),i.hold=w,i.bits=m}},{}],8:[function(e,t,i){"use strict";function n(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function a(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new _.Buf16(320),this.work=new _.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function r(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=D,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new _.Buf32(we),t.distcode=t.distdyn=new _.Buf32(me),t.sane=1,t.back=-1,z):C}function o(e){var t;return e&&e.state?(t=e.state,t.wsize=0,t.whave=0,t.wnext=0,r(e)):C}function s(e,t){var i,n;return e&&e.state?(n=e.state,t<0?(i=0,t=-t):(i=(t>>4)+1,t<48&&(t&=15)),t&&(t<8||t>15)?C:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=i,n.wbits=t,o(e))):C}function f(e,t){var i,n;return e?(n=new a,e.state=n,n.window=null,i=s(e,t),i!==z&&(e.state=null),i):C}function l(e){return f(e,_e)}function d(e){if(ge){var t;for(m=new _.Buf32(512),k=new _.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(x(S,e.lens,0,288,m,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;x(E,e.lens,0,32,k,0,e.work,{bits:5}),ge=!1}e.lencode=m,e.lenbits=9,e.distcode=k,e.distbits=5}function u(e,t,i,n){var a,r=e.state;return null===r.window&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0,r.window=new _.Buf8(r.wsize)),n>=r.wsize?(_.arraySet(r.window,t,i-r.wsize,r.wsize,0),r.wnext=0,r.whave=r.wsize):(a=r.wsize-r.wnext,a>n&&(a=n),_.arraySet(r.window,t,i-n,a,r.wnext),n-=a,n?(_.arraySet(r.window,t,i-n,n,0),r.wnext=n,r.whave=r.wsize):(r.wnext+=a,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=a))),0}function c(e,t){var i,a,r,o,s,f,l,c,h,b,w,m,k,we,me,ke,_e,ge,ve,pe,xe,ye,Se,Ee,Be=0,Ze=new _.Buf8(4),Ae=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return C;i=e.state,i.mode===X&&(i.mode=W),s=e.next_out,r=e.output,l=e.avail_out,o=e.next_in,a=e.input,f=e.avail_in,c=i.hold,h=i.bits,b=f,w=l,ye=z;e:for(;;)switch(i.mode){case D:if(0===i.wrap){i.mode=W;break}for(;h<16;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(2&i.wrap&&35615===c){i.check=0,Ze[0]=255&c,Ze[1]=c>>>8&255,i.check=v(i.check,Ze,2,0),c=0,h=0,i.mode=F;break}if(i.flags=0,i.head&&(i.head.done=!1),!(1&i.wrap)||(((255&c)<<8)+(c>>8))%31){e.msg="incorrect header check",i.mode=ce;break}if((15&c)!==U){e.msg="unknown compression method",i.mode=ce;break}if(c>>>=4,h-=4,xe=(15&c)+8,0===i.wbits)i.wbits=xe;else if(xe>i.wbits){e.msg="invalid window size",i.mode=ce;break}i.dmax=1<<xe,e.adler=i.check=1,i.mode=512&c?q:X,c=0,h=0;break;case F:for(;h<16;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(i.flags=c,(255&i.flags)!==U){e.msg="unknown compression method",i.mode=ce;break}if(57344&i.flags){e.msg="unknown header flags set",i.mode=ce;break}i.head&&(i.head.text=c>>8&1),512&i.flags&&(Ze[0]=255&c,Ze[1]=c>>>8&255,i.check=v(i.check,Ze,2,0)),c=0,h=0,i.mode=L;case L:for(;h<32;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.head&&(i.head.time=c),512&i.flags&&(Ze[0]=255&c,Ze[1]=c>>>8&255,Ze[2]=c>>>16&255,Ze[3]=c>>>24&255,i.check=v(i.check,Ze,4,0)),c=0,h=0,i.mode=H;case H:for(;h<16;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.head&&(i.head.xflags=255&c,i.head.os=c>>8),512&i.flags&&(Ze[0]=255&c,Ze[1]=c>>>8&255,i.check=v(i.check,Ze,2,0)),c=0,h=0,i.mode=M;case M:if(1024&i.flags){for(;h<16;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.length=c,i.head&&(i.head.extra_len=c),512&i.flags&&(Ze[0]=255&c,Ze[1]=c>>>8&255,i.check=v(i.check,Ze,2,0)),c=0,h=0}else i.head&&(i.head.extra=null);i.mode=j;case j:if(1024&i.flags&&(m=i.length,m>f&&(m=f),m&&(i.head&&(xe=i.head.extra_len-i.length,i.head.extra||(i.head.extra=new Array(i.head.extra_len)),_.arraySet(i.head.extra,a,o,m,xe)),512&i.flags&&(i.check=v(i.check,a,m,o)),f-=m,o+=m,i.length-=m),i.length))break e;i.length=0,i.mode=K;case K:if(2048&i.flags){if(0===f)break e;m=0;do xe=a[o+m++],i.head&&xe&&i.length<65536&&(i.head.name+=String.fromCharCode(xe));while(xe&&m<f);if(512&i.flags&&(i.check=v(i.check,a,m,o)),f-=m,o+=m,xe)break e}else i.head&&(i.head.name=null);i.length=0,i.mode=P;case P:if(4096&i.flags){if(0===f)break e;m=0;do xe=a[o+m++],i.head&&xe&&i.length<65536&&(i.head.comment+=String.fromCharCode(xe));while(xe&&m<f);if(512&i.flags&&(i.check=v(i.check,a,m,o)),f-=m,o+=m,xe)break e}else i.head&&(i.head.comment=null);i.mode=Y;case Y:if(512&i.flags){for(;h<16;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(c!==(65535&i.check)){e.msg="header crc mismatch",i.mode=ce;break}c=0,h=0}i.head&&(i.head.hcrc=i.flags>>9&1,i.head.done=!0),e.adler=i.check=0,i.mode=X;break;case q:for(;h<32;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}e.adler=i.check=n(c),c=0,h=0,i.mode=G;case G:if(0===i.havedict)return e.next_out=s,e.avail_out=l,e.next_in=o,e.avail_in=f,i.hold=c,i.bits=h,N;e.adler=i.check=1,i.mode=X;case X:if(t===Z||t===A)break e;case W:if(i.last){c>>>=7&h,h-=7&h,i.mode=le;break}for(;h<3;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}switch(i.last=1&c,c>>>=1,h-=1,3&c){case 0:i.mode=J;break;case 1:if(d(i),i.mode=ie,t===A){c>>>=2,h-=2;break e}break;case 2:i.mode=$;break;case 3:e.msg="invalid block type",i.mode=ce}c>>>=2,h-=2;break;case J:for(c>>>=7&h,h-=7&h;h<32;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if((65535&c)!==(c>>>16^65535)){e.msg="invalid stored block lengths",i.mode=ce;break}if(i.length=65535&c,c=0,h=0,i.mode=Q,t===A)break e;case Q:i.mode=V;case V:if(m=i.length){if(m>f&&(m=f),m>l&&(m=l),0===m)break e;_.arraySet(r,a,o,m,s),f-=m,o+=m,l-=m,s+=m,i.length-=m;break}i.mode=X;break;case $:for(;h<14;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(i.nlen=(31&c)+257,c>>>=5,h-=5,i.ndist=(31&c)+1,c>>>=5,h-=5,i.ncode=(15&c)+4,c>>>=4,h-=4,i.nlen>286||i.ndist>30){e.msg="too many length or distance symbols",i.mode=ce;break}i.have=0,i.mode=ee;case ee:for(;i.have<i.ncode;){for(;h<3;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.lens[Ae[i.have++]]=7&c,c>>>=3,h-=3}for(;i.have<19;)i.lens[Ae[i.have++]]=0;if(i.lencode=i.lendyn,i.lenbits=7,Se={bits:i.lenbits},ye=x(y,i.lens,0,19,i.lencode,0,i.work,Se),i.lenbits=Se.bits,ye){e.msg="invalid code lengths set",i.mode=ce;break}i.have=0,i.mode=te;case te:for(;i.have<i.nlen+i.ndist;){for(;Be=i.lencode[c&(1<<i.lenbits)-1],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(me<=h);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(_e<16)c>>>=me,h-=me,i.lens[i.have++]=_e;else{if(16===_e){for(Ee=me+2;h<Ee;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(c>>>=me,h-=me,0===i.have){e.msg="invalid bit length repeat",i.mode=ce;break}xe=i.lens[i.have-1],m=3+(3&c),c>>>=2,h-=2}else if(17===_e){for(Ee=me+3;h<Ee;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}c>>>=me,h-=me,xe=0,m=3+(7&c),c>>>=3,h-=3}else{for(Ee=me+7;h<Ee;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}c>>>=me,h-=me,xe=0,m=11+(127&c),c>>>=7,h-=7}if(i.have+m>i.nlen+i.ndist){e.msg="invalid bit length repeat",i.mode=ce;break}for(;m--;)i.lens[i.have++]=xe}}if(i.mode===ce)break;if(0===i.lens[256]){e.msg="invalid code -- missing end-of-block",i.mode=ce;break}if(i.lenbits=9,Se={bits:i.lenbits},ye=x(S,i.lens,0,i.nlen,i.lencode,0,i.work,Se),i.lenbits=Se.bits,ye){e.msg="invalid literal/lengths set",i.mode=ce;break}if(i.distbits=6,i.distcode=i.distdyn,Se={bits:i.distbits},ye=x(E,i.lens,i.nlen,i.ndist,i.distcode,0,i.work,Se),i.distbits=Se.bits,ye){e.msg="invalid distances set",i.mode=ce;break}if(i.mode=ie,t===A)break e;case ie:i.mode=ne;case ne:if(f>=6&&l>=258){e.next_out=s,e.avail_out=l,e.next_in=o,e.avail_in=f,i.hold=c,i.bits=h,p(e,w),s=e.next_out,r=e.output,l=e.avail_out,o=e.next_in,a=e.input,f=e.avail_in,c=i.hold,h=i.bits,i.mode===X&&(i.back=-1);break}for(i.back=0;Be=i.lencode[c&(1<<i.lenbits)-1],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(me<=h);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(ke&&0===(240&ke)){for(ge=me,ve=ke,pe=_e;Be=i.lencode[pe+((c&(1<<ge+ve)-1)>>ge)],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(ge+me<=h);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}c>>>=ge,h-=ge,i.back+=ge}if(c>>>=me,h-=me,i.back+=me,i.length=_e,0===ke){i.mode=fe;break}if(32&ke){i.back=-1,i.mode=X;break}if(64&ke){e.msg="invalid literal/length code",i.mode=ce;break}i.extra=15&ke,i.mode=ae;case ae:if(i.extra){for(Ee=i.extra;h<Ee;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.length+=c&(1<<i.extra)-1,c>>>=i.extra,h-=i.extra,i.back+=i.extra}i.was=i.length,i.mode=re;case re:for(;Be=i.distcode[c&(1<<i.distbits)-1],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(me<=h);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(0===(240&ke)){for(ge=me,ve=ke,pe=_e;Be=i.distcode[pe+((c&(1<<ge+ve)-1)>>ge)],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(ge+me<=h);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}c>>>=ge,h-=ge,i.back+=ge}if(c>>>=me,h-=me,i.back+=me,64&ke){e.msg="invalid distance code",i.mode=ce;break}i.offset=_e,i.extra=15&ke,i.mode=oe;case oe:if(i.extra){for(Ee=i.extra;h<Ee;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.offset+=c&(1<<i.extra)-1,c>>>=i.extra,h-=i.extra,i.back+=i.extra}if(i.offset>i.dmax){e.msg="invalid distance too far back",i.mode=ce;break}i.mode=se;case se:if(0===l)break e;if(m=w-l,i.offset>m){if(m=i.offset-m,m>i.whave&&i.sane){e.msg="invalid distance too far back",i.mode=ce;break}m>i.wnext?(m-=i.wnext,k=i.wsize-m):k=i.wnext-m,m>i.length&&(m=i.length),we=i.window}else we=r,k=s-i.offset,m=i.length;m>l&&(m=l),l-=m,i.length-=m;do r[s++]=we[k++];while(--m);0===i.length&&(i.mode=ne);break;case fe:if(0===l)break e;r[s++]=i.length,l--,i.mode=ne;break;case le:if(i.wrap){for(;h<32;){if(0===f)break e;f--,c|=a[o++]<<h,h+=8}if(w-=l,e.total_out+=w,i.total+=w,w&&(e.adler=i.check=i.flags?v(i.check,r,w,s-w):g(i.check,r,w,s-w)),w=l,(i.flags?c:n(c))!==i.check){e.msg="incorrect data check",i.mode=ce;break}c=0,h=0}i.mode=de;case de:if(i.wrap&&i.flags){for(;h<32;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(c!==(4294967295&i.total)){e.msg="incorrect length check",i.mode=ce;break}c=0,h=0}i.mode=ue;case ue:ye=R;break e;case ce:ye=O;break e;case he:return I;case be:default:return C}return e.next_out=s,e.avail_out=l,e.next_in=o,e.avail_in=f,i.hold=c,i.bits=h,(i.wsize||w!==e.avail_out&&i.mode<ce&&(i.mode<le||t!==B))&&u(e,e.output,e.next_out,w-e.avail_out)?(i.mode=he,I):(b-=e.avail_in,w-=e.avail_out,e.total_in+=b,e.total_out+=w,i.total+=w,i.wrap&&w&&(e.adler=i.check=i.flags?v(i.check,r,w,e.next_out-w):g(i.check,r,w,e.next_out-w)),e.data_type=i.bits+(i.last?64:0)+(i.mode===X?128:0)+(i.mode===ie||i.mode===Q?256:0),(0===b&&0===w||t===B)&&ye===z&&(ye=T),ye)}function h(e){if(!e||!e.state)return C;var t=e.state;return t.window&&(t.window=null),e.state=null,z}function b(e,t){var i;return e&&e.state?(i=e.state,0===(2&i.wrap)?C:(i.head=t,t.done=!1,z)):C}function w(e,t){var i,n,a,r=t.length;return e&&e.state?(i=e.state,0!==i.wrap&&i.mode!==G?C:i.mode===G&&(n=1,n=g(n,t,r,0),n!==i.check)?O:(a=u(e,t,r,r))?(i.mode=he,I):(i.havedict=1,z)):C}var m,k,_=e("../utils/common"),g=e("./adler32"),v=e("./crc32"),p=e("./inffast"),x=e("./inftrees"),y=0,S=1,E=2,B=4,Z=5,A=6,z=0,R=1,N=2,C=-2,O=-3,I=-4,T=-5,U=8,D=1,F=2,L=3,H=4,M=5,j=6,K=7,P=8,Y=9,q=10,G=11,X=12,W=13,J=14,Q=15,V=16,$=17,ee=18,te=19,ie=20,ne=21,ae=22,re=23,oe=24,se=25,fe=26,le=27,de=28,ue=29,ce=30,he=31,be=32,we=852,me=592,ke=15,_e=ke,ge=!0;i.inflateReset=o,i.inflateReset2=s,i.inflateResetKeep=r,i.inflateInit=l,i.inflateInit2=f,i.inflate=c,i.inflateEnd=h,i.inflateGetHeader=b,i.inflateSetDictionary=w,i.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":1,"./adler32":3,"./crc32":5,"./inffast":7,"./inftrees":9}],9:[function(e,t,i){"use strict";var n=e("../utils/common"),a=15,r=852,o=592,s=0,f=1,l=2,d=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],u=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],c=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,i,b,w,m,k,_){var g,v,p,x,y,S,E,B,Z,A=_.bits,z=0,R=0,N=0,C=0,O=0,I=0,T=0,U=0,D=0,F=0,L=null,H=0,M=new n.Buf16(a+1),j=new n.Buf16(a+1),K=null,P=0;for(z=0;z<=a;z++)M[z]=0;for(R=0;R<b;R++)M[t[i+R]]++;for(O=A,C=a;C>=1&&0===M[C];C--);if(O>C&&(O=C),0===C)return w[m++]=20971520,w[m++]=20971520,_.bits=1,0;for(N=1;N<C&&0===M[N];N++);for(O<N&&(O=N),U=1,z=1;z<=a;z++)if(U<<=1,U-=M[z],U<0)return-1;if(U>0&&(e===s||1!==C))return-1;for(j[1]=0,z=1;z<a;z++)j[z+1]=j[z]+M[z];for(R=0;R<b;R++)0!==t[i+R]&&(k[j[t[i+R]]++]=R);if(e===s?(L=K=k,S=19):e===f?(L=d,H-=257,K=u,P-=257,S=256):(L=c,K=h,S=-1),F=0,R=0,z=N,y=m,I=O,T=0,p=-1,D=1<<O,x=D-1,e===f&&D>r||e===l&&D>o)return 1;for(;;){E=z-T,k[R]<S?(B=0,Z=k[R]):k[R]>S?(B=K[P+k[R]],Z=L[H+k[R]]):(B=96,Z=0),g=1<<z-T,v=1<<I,N=v;do v-=g,w[y+(F>>T)+v]=E<<24|B<<16|Z|0;while(0!==v);for(g=1<<z-1;F&g;)g>>=1;if(0!==g?(F&=g-1,F+=g):F=0,R++,0===--M[z]){if(z===C)break;z=t[i+k[R]]}if(z>O&&(F&x)!==p){for(0===T&&(T=O),y+=N,I=z-T,U=1<<I;I+T<C&&(U-=M[I+T],!(U<=0));)I++,U<<=1;if(D+=1<<I,e===f&&D>r||e===l&&D>o)return 1;p=F&x,w[p]=O<<24|I<<16|y-m|0}}return 0!==F&&(w[y+F]=z-T<<24|64<<16|0),_.bits=O,0}},{"../utils/common":1}],10:[function(e,t,i){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],11:[function(e,t,i){"use strict";function n(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}t.exports=n},{}],"/lib/inflate.js":[function(e,t,i){"use strict";function n(e){if(!(this instanceof n))return new n(e);this.options=s.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(t.windowBits>=0&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&0===(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new u,this.strm.avail_out=0;var i=o.inflateInit2(this.strm,t.windowBits);if(i!==l.Z_OK)throw new Error(d[i]);this.header=new c,o.inflateGetHeader(this.strm,this.header)}function a(e,t){var i=new n(t);if(i.push(e,!0),i.err)throw i.msg||d[i.err];return i.result}function r(e,t){return t=t||{},t.raw=!0,a(e,t)}var o=e("./zlib/inflate"),s=e("./utils/common"),f=e("./utils/strings"),l=e("./zlib/constants"),d=e("./zlib/messages"),u=e("./zlib/zstream"),c=e("./zlib/gzheader"),h=Object.prototype.toString;n.prototype.push=function(e,t){var i,n,a,r,d,u,c=this.strm,b=this.options.chunkSize,w=this.options.dictionary,m=!1;if(this.ended)return!1;n=t===~~t?t:t===!0?l.Z_FINISH:l.Z_NO_FLUSH,"string"==typeof e?c.input=f.binstring2buf(e):"[object ArrayBuffer]"===h.call(e)?c.input=new Uint8Array(e):c.input=e,c.next_in=0,c.avail_in=c.input.length;do{if(0===c.avail_out&&(c.output=new s.Buf8(b),c.next_out=0,c.avail_out=b),i=o.inflate(c,l.Z_NO_FLUSH),i===l.Z_NEED_DICT&&w&&(u="string"==typeof w?f.string2buf(w):"[object ArrayBuffer]"===h.call(w)?new Uint8Array(w):w,i=o.inflateSetDictionary(this.strm,u)),i===l.Z_BUF_ERROR&&m===!0&&(i=l.Z_OK,m=!1),i!==l.Z_STREAM_END&&i!==l.Z_OK)return this.onEnd(i),this.ended=!0,!1;c.next_out&&(0!==c.avail_out&&i!==l.Z_STREAM_END&&(0!==c.avail_in||n!==l.Z_FINISH&&n!==l.Z_SYNC_FLUSH)||("string"===this.options.to?(a=f.utf8border(c.output,c.next_out),r=c.next_out-a,d=f.buf2string(c.output,a),c.next_out=r,c.avail_out=b-r,r&&s.arraySet(c.output,c.output,a,r,0),this.onData(d)):this.onData(s.shrinkBuf(c.output,c.next_out)))),0===c.avail_in&&0===c.avail_out&&(m=!0)}while((c.avail_in>0||0===c.avail_out)&&i!==l.Z_STREAM_END);return i===l.Z_STREAM_END&&(n=l.Z_FINISH),n===l.Z_FINISH?(i=o.inflateEnd(this.strm),this.onEnd(i),this.ended=!0,i===l.Z_OK):n!==l.Z_SYNC_FLUSH||(this.onEnd(l.Z_OK),c.avail_out=0,!0)},n.prototype.onData=function(e){this.chunks.push(e)},n.prototype.onEnd=function(e){e===l.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},i.Inflate=n,i.inflate=a,i.inflateRaw=r,i.ungzip=a},{"./utils/common":1,"./utils/strings":2,"./zlib/constants":4,"./zlib/gzheader":6,"./zlib/inflate":8,"./zlib/messages":10,"./zlib/zstream":11}]},{},[])("/lib/inflate.js")});
/* pako 1.0.4 nodeca/pako */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.pako=t()}}(function(){return function t(e,a,i){function n(s,o){if(!a[s]){if(!e[s]){var l="function"==typeof require&&require;if(!o&&l)return l(s,!0);if(r)return r(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var d=a[s]={exports:{}};e[s][0].call(d.exports,function(t){var a=e[s][1][t];return n(a?a:t)},d,d.exports,t,e,a,i)}return a[s].exports}for(var r="function"==typeof require&&require,s=0;s<i.length;s++)n(i[s]);return n}({1:[function(t,e,a){"use strict";function i(t){if(!(this instanceof i))return new i(t);this.options=l.assign({level:w,method:v,chunkSize:16384,windowBits:15,memLevel:8,strategy:p,to:""},t||{});var e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var a=o.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==b)throw new Error(d[a]);if(e.header&&o.deflateSetHeader(this.strm,e.header),e.dictionary){var n;if(n="string"==typeof e.dictionary?h.string2buf(e.dictionary):"[object ArrayBuffer]"===_.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=o.deflateSetDictionary(this.strm,n),a!==b)throw new Error(d[a]);this._dict_set=!0}}function n(t,e){var a=new i(e);if(a.push(t,!0),a.err)throw a.msg||d[a.err];return a.result}function r(t,e){return e=e||{},e.raw=!0,n(t,e)}function s(t,e){return e=e||{},e.gzip=!0,n(t,e)}var o=t("./zlib/deflate"),l=t("./utils/common"),h=t("./utils/strings"),d=t("./zlib/messages"),f=t("./zlib/zstream"),_=Object.prototype.toString,u=0,c=4,b=0,g=1,m=2,w=-1,p=0,v=8;i.prototype.push=function(t,e){var a,i,n=this.strm,r=this.options.chunkSize;if(this.ended)return!1;i=e===~~e?e:e===!0?c:u,"string"==typeof t?n.input=h.string2buf(t):"[object ArrayBuffer]"===_.call(t)?n.input=new Uint8Array(t):n.input=t,n.next_in=0,n.avail_in=n.input.length;do{if(0===n.avail_out&&(n.output=new l.Buf8(r),n.next_out=0,n.avail_out=r),a=o.deflate(n,i),a!==g&&a!==b)return this.onEnd(a),this.ended=!0,!1;0!==n.avail_out&&(0!==n.avail_in||i!==c&&i!==m)||("string"===this.options.to?this.onData(h.buf2binstring(l.shrinkBuf(n.output,n.next_out))):this.onData(l.shrinkBuf(n.output,n.next_out)))}while((n.avail_in>0||0===n.avail_out)&&a!==g);return i===c?(a=o.deflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===b):i!==m||(this.onEnd(b),n.avail_out=0,!0)},i.prototype.onData=function(t){this.chunks.push(t)},i.prototype.onEnd=function(t){t===b&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},a.Deflate=i,a.deflate=n,a.deflateRaw=r,a.gzip=s},{"./utils/common":3,"./utils/strings":4,"./zlib/deflate":8,"./zlib/messages":13,"./zlib/zstream":15}],2:[function(t,e,a){"use strict";function i(t){if(!(this instanceof i))return new i(t);this.options=o.assign({chunkSize:16384,windowBits:0,to:""},t||{});var e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0===(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var a=s.inflateInit2(this.strm,e.windowBits);if(a!==h.Z_OK)throw new Error(d[a]);this.header=new _,s.inflateGetHeader(this.strm,this.header)}function n(t,e){var a=new i(e);if(a.push(t,!0),a.err)throw a.msg||d[a.err];return a.result}function r(t,e){return e=e||{},e.raw=!0,n(t,e)}var s=t("./zlib/inflate"),o=t("./utils/common"),l=t("./utils/strings"),h=t("./zlib/constants"),d=t("./zlib/messages"),f=t("./zlib/zstream"),_=t("./zlib/gzheader"),u=Object.prototype.toString;i.prototype.push=function(t,e){var a,i,n,r,d,f,_=this.strm,c=this.options.chunkSize,b=this.options.dictionary,g=!1;if(this.ended)return!1;i=e===~~e?e:e===!0?h.Z_FINISH:h.Z_NO_FLUSH,"string"==typeof t?_.input=l.binstring2buf(t):"[object ArrayBuffer]"===u.call(t)?_.input=new Uint8Array(t):_.input=t,_.next_in=0,_.avail_in=_.input.length;do{if(0===_.avail_out&&(_.output=new o.Buf8(c),_.next_out=0,_.avail_out=c),a=s.inflate(_,h.Z_NO_FLUSH),a===h.Z_NEED_DICT&&b&&(f="string"==typeof b?l.string2buf(b):"[object ArrayBuffer]"===u.call(b)?new Uint8Array(b):b,a=s.inflateSetDictionary(this.strm,f)),a===h.Z_BUF_ERROR&&g===!0&&(a=h.Z_OK,g=!1),a!==h.Z_STREAM_END&&a!==h.Z_OK)return this.onEnd(a),this.ended=!0,!1;_.next_out&&(0!==_.avail_out&&a!==h.Z_STREAM_END&&(0!==_.avail_in||i!==h.Z_FINISH&&i!==h.Z_SYNC_FLUSH)||("string"===this.options.to?(n=l.utf8border(_.output,_.next_out),r=_.next_out-n,d=l.buf2string(_.output,n),_.next_out=r,_.avail_out=c-r,r&&o.arraySet(_.output,_.output,n,r,0),this.onData(d)):this.onData(o.shrinkBuf(_.output,_.next_out)))),0===_.avail_in&&0===_.avail_out&&(g=!0)}while((_.avail_in>0||0===_.avail_out)&&a!==h.Z_STREAM_END);return a===h.Z_STREAM_END&&(i=h.Z_FINISH),i===h.Z_FINISH?(a=s.inflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===h.Z_OK):i!==h.Z_SYNC_FLUSH||(this.onEnd(h.Z_OK),_.avail_out=0,!0)},i.prototype.onData=function(t){this.chunks.push(t)},i.prototype.onEnd=function(t){t===h.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},a.Inflate=i,a.inflate=n,a.inflateRaw=r,a.ungzip=n},{"./utils/common":3,"./utils/strings":4,"./zlib/constants":6,"./zlib/gzheader":9,"./zlib/inflate":11,"./zlib/messages":13,"./zlib/zstream":15}],3:[function(t,e,a){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;a.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(var i in a)a.hasOwnProperty(i)&&(t[i]=a[i])}}return t},a.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var n={arraySet:function(t,e,a,i,n){if(e.subarray&&t.subarray)return void t.set(e.subarray(a,a+i),n);for(var r=0;r<i;r++)t[n+r]=e[a+r]},flattenChunks:function(t){var e,a,i,n,r,s;for(i=0,e=0,a=t.length;e<a;e++)i+=t[e].length;for(s=new Uint8Array(i),n=0,e=0,a=t.length;e<a;e++)r=t[e],s.set(r,n),n+=r.length;return s}},r={arraySet:function(t,e,a,i,n){for(var r=0;r<i;r++)t[n+r]=e[a+r]},flattenChunks:function(t){return[].concat.apply([],t)}};a.setTyped=function(t){t?(a.Buf8=Uint8Array,a.Buf16=Uint16Array,a.Buf32=Int32Array,a.assign(a,n)):(a.Buf8=Array,a.Buf16=Array,a.Buf32=Array,a.assign(a,r))},a.setTyped(i)},{}],4:[function(t,e,a){"use strict";function i(t,e){if(e<65537&&(t.subarray&&s||!t.subarray&&r))return String.fromCharCode.apply(null,n.shrinkBuf(t,e));for(var a="",i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a}var n=t("./common"),r=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(t){r=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){s=!1}for(var o=new n.Buf8(256),l=0;l<256;l++)o[l]=l>=252?6:l>=248?5:l>=240?4:l>=224?3:l>=192?2:1;o[254]=o[254]=1,a.string2buf=function(t){var e,a,i,r,s,o=t.length,l=0;for(r=0;r<o;r++)a=t.charCodeAt(r),55296===(64512&a)&&r+1<o&&(i=t.charCodeAt(r+1),56320===(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),r++)),l+=a<128?1:a<2048?2:a<65536?3:4;for(e=new n.Buf8(l),s=0,r=0;s<l;r++)a=t.charCodeAt(r),55296===(64512&a)&&r+1<o&&(i=t.charCodeAt(r+1),56320===(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),r++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},a.buf2binstring=function(t){return i(t,t.length)},a.binstring2buf=function(t){for(var e=new n.Buf8(t.length),a=0,i=e.length;a<i;a++)e[a]=t.charCodeAt(a);return e},a.buf2string=function(t,e){var a,n,r,s,l=e||t.length,h=new Array(2*l);for(n=0,a=0;a<l;)if(r=t[a++],r<128)h[n++]=r;else if(s=o[r],s>4)h[n++]=65533,a+=s-1;else{for(r&=2===s?31:3===s?15:7;s>1&&a<l;)r=r<<6|63&t[a++],s--;s>1?h[n++]=65533:r<65536?h[n++]=r:(r-=65536,h[n++]=55296|r>>10&1023,h[n++]=56320|1023&r)}return i(h,n)},a.utf8border=function(t,e){var a;for(e=e||t.length,e>t.length&&(e=t.length),a=e-1;a>=0&&128===(192&t[a]);)a--;return a<0?e:0===a?e:a+o[t[a]]>e?a:e}},{"./common":3}],5:[function(t,e,a){"use strict";function i(t,e,a,i){for(var n=65535&t|0,r=t>>>16&65535|0,s=0;0!==a;){s=a>2e3?2e3:a,a-=s;do n=n+e[i++]|0,r=r+n|0;while(--s);n%=65521,r%=65521}return n|r<<16|0}e.exports=i},{}],6:[function(t,e,a){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],7:[function(t,e,a){"use strict";function i(){for(var t,e=[],a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e}function n(t,e,a,i){var n=r,s=i+a;t^=-1;for(var o=i;o<s;o++)t=t>>>8^n[255&(t^e[o])];return t^-1}var r=i();e.exports=n},{}],8:[function(t,e,a){"use strict";function i(t,e){return t.msg=D[e],e}function n(t){return(t<<1)-(t>4?9:0)}function r(t){for(var e=t.length;--e>=0;)t[e]=0}function s(t){var e=t.state,a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(R.arraySet(t.output,e.pending_buf,e.pending_out,a,t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))}function o(t,e){C._tr_flush_block(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,s(t.strm)}function l(t,e){t.pending_buf[t.pending++]=e}function h(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function d(t,e,a,i){var n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,R.arraySet(e,t.input,t.next_in,n,a),1===t.state.wrap?t.adler=N(t.adler,e,n,a):2===t.state.wrap&&(t.adler=O(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)}function f(t,e){var a,i,n=t.max_chain_length,r=t.strstart,s=t.prev_length,o=t.nice_match,l=t.strstart>t.w_size-ft?t.strstart-(t.w_size-ft):0,h=t.window,d=t.w_mask,f=t.prev,_=t.strstart+dt,u=h[r+s-1],c=h[r+s];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do if(a=e,h[a+s]===c&&h[a+s-1]===u&&h[a]===h[r]&&h[++a]===h[r+1]){r+=2,a++;do;while(h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&r<_);if(i=dt-(_-r),r=_-dt,i>s){if(t.match_start=e,s=i,i>=o)break;u=h[r+s-1],c=h[r+s]}}while((e=f[e&d])>l&&0!==--n);return s<=t.lookahead?s:t.lookahead}function _(t){var e,a,i,n,r,s=t.w_size;do{if(n=t.window_size-t.lookahead-t.strstart,t.strstart>=s+(s-ft)){R.arraySet(t.window,t.window,s,s,0),t.match_start-=s,t.strstart-=s,t.block_start-=s,a=t.hash_size,e=a;do i=t.head[--e],t.head[e]=i>=s?i-s:0;while(--a);a=s,e=a;do i=t.prev[--e],t.prev[e]=i>=s?i-s:0;while(--a);n+=s}if(0===t.strm.avail_in)break;if(a=d(t.strm,t.window,t.strstart+t.lookahead,n),t.lookahead+=a,t.lookahead+t.insert>=ht)for(r=t.strstart-t.insert,t.ins_h=t.window[r],t.ins_h=(t.ins_h<<t.hash_shift^t.window[r+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[r+ht-1])&t.hash_mask,t.prev[r&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=r,r++,t.insert--,!(t.lookahead+t.insert<ht)););}while(t.lookahead<ft&&0!==t.strm.avail_in)}function u(t,e){var a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(_(t),0===t.lookahead&&e===I)return vt;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var i=t.block_start+a;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,o(t,!1),0===t.strm.avail_out))return vt;if(t.strstart-t.block_start>=t.w_size-ft&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.strstart>t.block_start&&(o(t,!1),0===t.strm.avail_out)?vt:vt}function c(t,e){for(var a,i;;){if(t.lookahead<ft){if(_(t),t.lookahead<ft&&e===I)return vt;if(0===t.lookahead)break}if(a=0,t.lookahead>=ht&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ft&&(t.match_length=f(t,a)),t.match_length>=ht)if(i=C._tr_tally(t,t.strstart-t.match_start,t.match_length-ht),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=ht){t.match_length--;do t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart;while(0!==--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else i=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=t.strstart<ht-1?t.strstart:ht-1,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function b(t,e){for(var a,i,n;;){if(t.lookahead<ft){if(_(t),t.lookahead<ft&&e===I)return vt;if(0===t.lookahead)break}if(a=0,t.lookahead>=ht&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=ht-1,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ft&&(t.match_length=f(t,a),t.match_length<=5&&(t.strategy===q||t.match_length===ht&&t.strstart-t.match_start>4096)&&(t.match_length=ht-1)),t.prev_length>=ht&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-ht,i=C._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-ht),t.lookahead-=t.prev_length-1,t.prev_length-=2;do++t.strstart<=n&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart);while(0!==--t.prev_length);if(t.match_available=0,t.match_length=ht-1,t.strstart++,i&&(o(t,!1),0===t.strm.avail_out))return vt}else if(t.match_available){if(i=C._tr_tally(t,0,t.window[t.strstart-1]),i&&o(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return vt}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=C._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<ht-1?t.strstart:ht-1,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function g(t,e){for(var a,i,n,r,s=t.window;;){if(t.lookahead<=dt){if(_(t),t.lookahead<=dt&&e===I)return vt;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=ht&&t.strstart>0&&(n=t.strstart-1,i=s[n],i===s[++n]&&i===s[++n]&&i===s[++n])){r=t.strstart+dt;do;while(i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&n<r);t.match_length=dt-(r-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=ht?(a=C._tr_tally(t,1,t.match_length-ht),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function m(t,e){for(var a;;){if(0===t.lookahead&&(_(t),0===t.lookahead)){if(e===I)return vt;break}if(t.match_length=0,a=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function w(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}function p(t){t.window_size=2*t.w_size,r(t.head),t.max_lazy_match=Z[t.level].max_lazy,t.good_match=Z[t.level].good_length,t.nice_match=Z[t.level].nice_length,t.max_chain_length=Z[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=ht-1,t.match_available=0,t.ins_h=0}function v(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=V,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new R.Buf16(2*ot),this.dyn_dtree=new R.Buf16(2*(2*rt+1)),this.bl_tree=new R.Buf16(2*(2*st+1)),r(this.dyn_ltree),r(this.dyn_dtree),r(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new R.Buf16(lt+1),this.heap=new R.Buf16(2*nt+1),r(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new R.Buf16(2*nt+1),r(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function k(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=Q,e=t.state,e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?ut:wt,t.adler=2===e.wrap?0:1,e.last_flush=I,C._tr_init(e),H):i(t,K)}function y(t){var e=k(t);return e===H&&p(t.state),e}function x(t,e){return t&&t.state?2!==t.state.wrap?K:(t.state.gzhead=e,H):K}function z(t,e,a,n,r,s){if(!t)return K;var o=1;if(e===Y&&(e=6),n<0?(o=0,n=-n):n>15&&(o=2,n-=16),r<1||r>$||a!==V||n<8||n>15||e<0||e>9||s<0||s>W)return i(t,K);8===n&&(n=9);var l=new v;return t.state=l,l.strm=t,l.wrap=o,l.gzhead=null,l.w_bits=n,l.w_size=1<<l.w_bits,l.w_mask=l.w_size-1,l.hash_bits=r+7,l.hash_size=1<<l.hash_bits,l.hash_mask=l.hash_size-1,l.hash_shift=~~((l.hash_bits+ht-1)/ht),l.window=new R.Buf8(2*l.w_size),l.head=new R.Buf16(l.hash_size),l.prev=new R.Buf16(l.w_size),l.lit_bufsize=1<<r+6,l.pending_buf_size=4*l.lit_bufsize,l.pending_buf=new R.Buf8(l.pending_buf_size),l.d_buf=1*l.lit_bufsize,l.l_buf=3*l.lit_bufsize,l.level=e,l.strategy=s,l.method=a,y(t)}function B(t,e){return z(t,e,V,tt,et,J)}function S(t,e){var a,o,d,f;if(!t||!t.state||e>L||e<0)return t?i(t,K):K;if(o=t.state,!t.output||!t.input&&0!==t.avail_in||o.status===pt&&e!==F)return i(t,0===t.avail_out?P:K);if(o.strm=t,a=o.last_flush,o.last_flush=e,o.status===ut)if(2===o.wrap)t.adler=0,l(o,31),l(o,139),l(o,8),o.gzhead?(l(o,(o.gzhead.text?1:0)+(o.gzhead.hcrc?2:0)+(o.gzhead.extra?4:0)+(o.gzhead.name?8:0)+(o.gzhead.comment?16:0)),l(o,255&o.gzhead.time),l(o,o.gzhead.time>>8&255),l(o,o.gzhead.time>>16&255),l(o,o.gzhead.time>>24&255),l(o,9===o.level?2:o.strategy>=G||o.level<2?4:0),l(o,255&o.gzhead.os),o.gzhead.extra&&o.gzhead.extra.length&&(l(o,255&o.gzhead.extra.length),l(o,o.gzhead.extra.length>>8&255)),o.gzhead.hcrc&&(t.adler=O(t.adler,o.pending_buf,o.pending,0)),o.gzindex=0,o.status=ct):(l(o,0),l(o,0),l(o,0),l(o,0),l(o,0),l(o,9===o.level?2:o.strategy>=G||o.level<2?4:0),l(o,zt),o.status=wt);else{var _=V+(o.w_bits-8<<4)<<8,u=-1;u=o.strategy>=G||o.level<2?0:o.level<6?1:6===o.level?2:3,_|=u<<6,0!==o.strstart&&(_|=_t),_+=31-_%31,o.status=wt,h(o,_),0!==o.strstart&&(h(o,t.adler>>>16),h(o,65535&t.adler)),t.adler=1}if(o.status===ct)if(o.gzhead.extra){for(d=o.pending;o.gzindex<(65535&o.gzhead.extra.length)&&(o.pending!==o.pending_buf_size||(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending!==o.pending_buf_size));)l(o,255&o.gzhead.extra[o.gzindex]),o.gzindex++;o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),o.gzindex===o.gzhead.extra.length&&(o.gzindex=0,o.status=bt)}else o.status=bt;if(o.status===bt)if(o.gzhead.name){d=o.pending;do{if(o.pending===o.pending_buf_size&&(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending===o.pending_buf_size)){f=1;break}f=o.gzindex<o.gzhead.name.length?255&o.gzhead.name.charCodeAt(o.gzindex++):0,l(o,f)}while(0!==f);o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),0===f&&(o.gzindex=0,o.status=gt)}else o.status=gt;if(o.status===gt)if(o.gzhead.comment){d=o.pending;do{if(o.pending===o.pending_buf_size&&(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending===o.pending_buf_size)){f=1;break}f=o.gzindex<o.gzhead.comment.length?255&o.gzhead.comment.charCodeAt(o.gzindex++):0,l(o,f)}while(0!==f);o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),0===f&&(o.status=mt)}else o.status=mt;if(o.status===mt&&(o.gzhead.hcrc?(o.pending+2>o.pending_buf_size&&s(t),o.pending+2<=o.pending_buf_size&&(l(o,255&t.adler),l(o,t.adler>>8&255),t.adler=0,o.status=wt)):o.status=wt),0!==o.pending){if(s(t),0===t.avail_out)return o.last_flush=-1,H}else if(0===t.avail_in&&n(e)<=n(a)&&e!==F)return i(t,P);if(o.status===pt&&0!==t.avail_in)return i(t,P);if(0!==t.avail_in||0!==o.lookahead||e!==I&&o.status!==pt){var c=o.strategy===G?m(o,e):o.strategy===X?g(o,e):Z[o.level].func(o,e);if(c!==yt&&c!==xt||(o.status=pt),c===vt||c===yt)return 0===t.avail_out&&(o.last_flush=-1),H;if(c===kt&&(e===U?C._tr_align(o):e!==L&&(C._tr_stored_block(o,0,0,!1),e===T&&(r(o.head),0===o.lookahead&&(o.strstart=0,o.block_start=0,o.insert=0))),s(t),0===t.avail_out))return o.last_flush=-1,H}return e!==F?H:o.wrap<=0?j:(2===o.wrap?(l(o,255&t.adler),l(o,t.adler>>8&255),l(o,t.adler>>16&255),l(o,t.adler>>24&255),l(o,255&t.total_in),l(o,t.total_in>>8&255),l(o,t.total_in>>16&255),l(o,t.total_in>>24&255)):(h(o,t.adler>>>16),h(o,65535&t.adler)),s(t),o.wrap>0&&(o.wrap=-o.wrap),0!==o.pending?H:j)}function E(t){var e;return t&&t.state?(e=t.state.status,e!==ut&&e!==ct&&e!==bt&&e!==gt&&e!==mt&&e!==wt&&e!==pt?i(t,K):(t.state=null,e===wt?i(t,M):H)):K}function A(t,e){var a,i,n,s,o,l,h,d,f=e.length;if(!t||!t.state)return K;if(a=t.state,s=a.wrap,2===s||1===s&&a.status!==ut||a.lookahead)return K;for(1===s&&(t.adler=N(t.adler,e,f,0)),a.wrap=0,f>=a.w_size&&(0===s&&(r(a.head),a.strstart=0,a.block_start=0,a.insert=0),d=new R.Buf8(a.w_size),R.arraySet(d,e,f-a.w_size,a.w_size,0),e=d,f=a.w_size),o=t.avail_in,l=t.next_in,h=t.input,t.avail_in=f,t.next_in=0,t.input=e,_(a);a.lookahead>=ht;){i=a.strstart,n=a.lookahead-(ht-1);do a.ins_h=(a.ins_h<<a.hash_shift^a.window[i+ht-1])&a.hash_mask,a.prev[i&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=i,i++;while(--n);a.strstart=i,a.lookahead=ht-1,_(a)}return a.strstart+=a.lookahead,a.block_start=a.strstart,a.insert=a.lookahead,a.lookahead=0,a.match_length=a.prev_length=ht-1,a.match_available=0,t.next_in=l,t.input=h,t.avail_in=o,a.wrap=s,H}var Z,R=t("../utils/common"),C=t("./trees"),N=t("./adler32"),O=t("./crc32"),D=t("./messages"),I=0,U=1,T=3,F=4,L=5,H=0,j=1,K=-2,M=-3,P=-5,Y=-1,q=1,G=2,X=3,W=4,J=0,Q=2,V=8,$=9,tt=15,et=8,at=29,it=256,nt=it+1+at,rt=30,st=19,ot=2*nt+1,lt=15,ht=3,dt=258,ft=dt+ht+1,_t=32,ut=42,ct=69,bt=73,gt=91,mt=103,wt=113,pt=666,vt=1,kt=2,yt=3,xt=4,zt=3;Z=[new w(0,0,0,0,u),new w(4,4,8,4,c),new w(4,5,16,8,c),new w(4,6,32,32,c),new w(4,4,16,16,b),new w(8,16,32,32,b),new w(8,16,128,128,b),new w(8,32,128,256,b),new w(32,128,258,1024,b),new w(32,258,258,4096,b)],a.deflateInit=B,a.deflateInit2=z,a.deflateReset=y,a.deflateResetKeep=k,a.deflateSetHeader=x,a.deflate=S,a.deflateEnd=E,a.deflateSetDictionary=A,a.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":3,"./adler32":5,"./crc32":7,"./messages":13,"./trees":14}],9:[function(t,e,a){"use strict";function i(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}e.exports=i},{}],10:[function(t,e,a){"use strict";var i=30,n=12;e.exports=function(t,e){var a,r,s,o,l,h,d,f,_,u,c,b,g,m,w,p,v,k,y,x,z,B,S,E,A;a=t.state,r=t.next_in,E=t.input,s=r+(t.avail_in-5),o=t.next_out,A=t.output,l=o-(e-t.avail_out),h=o+(t.avail_out-257),d=a.dmax,f=a.wsize,_=a.whave,u=a.wnext,c=a.window,b=a.hold,g=a.bits,m=a.lencode,w=a.distcode,p=(1<<a.lenbits)-1,v=(1<<a.distbits)-1;t:do{g<15&&(b+=E[r++]<<g,g+=8,b+=E[r++]<<g,g+=8),k=m[b&p];e:for(;;){if(y=k>>>24,b>>>=y,g-=y,y=k>>>16&255,0===y)A[o++]=65535&k;else{if(!(16&y)){if(0===(64&y)){k=m[(65535&k)+(b&(1<<y)-1)];continue e}if(32&y){a.mode=n;break t}t.msg="invalid literal/length code",a.mode=i;break t}x=65535&k,y&=15,y&&(g<y&&(b+=E[r++]<<g,g+=8),x+=b&(1<<y)-1,b>>>=y,g-=y),g<15&&(b+=E[r++]<<g,g+=8,b+=E[r++]<<g,g+=8),k=w[b&v];a:for(;;){if(y=k>>>24,b>>>=y,g-=y,y=k>>>16&255,!(16&y)){if(0===(64&y)){k=w[(65535&k)+(b&(1<<y)-1)];continue a}t.msg="invalid distance code",a.mode=i;break t}if(z=65535&k,y&=15,g<y&&(b+=E[r++]<<g,g+=8,g<y&&(b+=E[r++]<<g,g+=8)),z+=b&(1<<y)-1,z>d){t.msg="invalid distance too far back",a.mode=i;break t}if(b>>>=y,g-=y,y=o-l,z>y){if(y=z-y,y>_&&a.sane){t.msg="invalid distance too far back",a.mode=i;break t}if(B=0,S=c,0===u){if(B+=f-y,y<x){x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}}else if(u<y){if(B+=f+u-y,y-=u,y<x){x-=y;do A[o++]=c[B++];while(--y);if(B=0,u<x){y=u,x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}}}else if(B+=u-y,y<x){x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}for(;x>2;)A[o++]=S[B++],A[o++]=S[B++],A[o++]=S[B++],x-=3;x&&(A[o++]=S[B++],x>1&&(A[o++]=S[B++]))}else{B=o-z;do A[o++]=A[B++],A[o++]=A[B++],A[o++]=A[B++],x-=3;while(x>2);x&&(A[o++]=A[B++],x>1&&(A[o++]=A[B++]))}break}}break}}while(r<s&&o<h);x=g>>3,r-=x,g-=x<<3,b&=(1<<g)-1,t.next_in=r,t.next_out=o,t.avail_in=r<s?5+(s-r):5-(r-s),t.avail_out=o<h?257+(h-o):257-(o-h),a.hold=b,a.bits=g}},{}],11:[function(t,e,a){"use strict";function i(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function n(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new w.Buf16(320),this.work=new w.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function r(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=T,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new w.Buf32(bt),e.distcode=e.distdyn=new w.Buf32(gt),e.sane=1,e.back=-1,Z):N}function s(t){var e;return t&&t.state?(e=t.state,e.wsize=0,e.whave=0,e.wnext=0,r(t)):N}function o(t,e){var a,i;return t&&t.state?(i=t.state,e<0?(a=0,e=-e):(a=(e>>4)+1,e<48&&(e&=15)),e&&(e<8||e>15)?N:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,s(t))):N}function l(t,e){var a,i;return t?(i=new n,t.state=i,i.window=null,a=o(t,e),a!==Z&&(t.state=null),a):N}function h(t){return l(t,wt)}function d(t){if(pt){var e;for(g=new w.Buf32(512),m=new w.Buf32(32),e=0;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(y(z,t.lens,0,288,g,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;y(B,t.lens,0,32,m,0,t.work,{bits:5}),pt=!1}t.lencode=g,t.lenbits=9,t.distcode=m,t.distbits=5}function f(t,e,a,i){var n,r=t.state;return null===r.window&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0,r.window=new w.Buf8(r.wsize)),i>=r.wsize?(w.arraySet(r.window,e,a-r.wsize,r.wsize,0),r.wnext=0,r.whave=r.wsize):(n=r.wsize-r.wnext,n>i&&(n=i),w.arraySet(r.window,e,a-i,n,r.wnext),i-=n,i?(w.arraySet(r.window,e,a-i,i,0),r.wnext=i,r.whave=r.wsize):(r.wnext+=n,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=n))),0}function _(t,e){var a,n,r,s,o,l,h,_,u,c,b,g,m,bt,gt,mt,wt,pt,vt,kt,yt,xt,zt,Bt,St=0,Et=new w.Buf8(4),At=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return N;a=t.state,a.mode===X&&(a.mode=W),o=t.next_out,r=t.output,h=t.avail_out,s=t.next_in,n=t.input,l=t.avail_in,_=a.hold,u=a.bits,c=l,b=h,xt=Z;t:for(;;)switch(a.mode){case T:if(0===a.wrap){a.mode=W;break}for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(2&a.wrap&&35615===_){a.check=0,Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0),_=0,u=0,a.mode=F;break}if(a.flags=0,a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&_)<<8)+(_>>8))%31){t.msg="incorrect header check",a.mode=_t;break}if((15&_)!==U){t.msg="unknown compression method",a.mode=_t;break}if(_>>>=4,u-=4,yt=(15&_)+8,0===a.wbits)a.wbits=yt;else if(yt>a.wbits){t.msg="invalid window size",a.mode=_t;break}a.dmax=1<<yt,t.adler=a.check=1,a.mode=512&_?q:X,_=0,u=0;break;case F:for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(a.flags=_,(255&a.flags)!==U){t.msg="unknown compression method",a.mode=_t;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=_t;break}a.head&&(a.head.text=_>>8&1),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0,a.mode=L;case L:for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.head&&(a.head.time=_),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,Et[2]=_>>>16&255,Et[3]=_>>>24&255,a.check=v(a.check,Et,4,0)),_=0,u=0,a.mode=H;case H:for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.head&&(a.head.xflags=255&_,a.head.os=_>>8),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0,a.mode=j;case j:if(1024&a.flags){for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.length=_,a.head&&(a.head.extra_len=_),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0}else a.head&&(a.head.extra=null);a.mode=K;case K:if(1024&a.flags&&(g=a.length,g>l&&(g=l),g&&(a.head&&(yt=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Array(a.head.extra_len)),w.arraySet(a.head.extra,n,s,g,yt)),512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,a.length-=g),a.length))break t;a.length=0,a.mode=M;case M:if(2048&a.flags){if(0===l)break t;g=0;do yt=n[s+g++],a.head&&yt&&a.length<65536&&(a.head.name+=String.fromCharCode(yt));while(yt&&g<l);if(512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,yt)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=P;case P:if(4096&a.flags){if(0===l)break t;g=0;do yt=n[s+g++],a.head&&yt&&a.length<65536&&(a.head.comment+=String.fromCharCode(yt));while(yt&&g<l);if(512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,yt)break t}else a.head&&(a.head.comment=null);a.mode=Y;case Y:if(512&a.flags){for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_!==(65535&a.check)){t.msg="header crc mismatch",a.mode=_t;break}_=0,u=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=X;break;case q:for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}t.adler=a.check=i(_),_=0,u=0,a.mode=G;case G:if(0===a.havedict)return t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,C;t.adler=a.check=1,a.mode=X;case X:if(e===E||e===A)break t;case W:if(a.last){_>>>=7&u,u-=7&u,a.mode=ht;break}for(;u<3;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}switch(a.last=1&_,_>>>=1,u-=1,3&_){case 0:a.mode=J;break;case 1:if(d(a),a.mode=at,e===A){_>>>=2,u-=2;break t}break;case 2:a.mode=$;break;case 3:t.msg="invalid block type",a.mode=_t}_>>>=2,u-=2;break;case J:for(_>>>=7&u,u-=7&u;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if((65535&_)!==(_>>>16^65535)){t.msg="invalid stored block lengths",a.mode=_t;break}if(a.length=65535&_,_=0,u=0,a.mode=Q,e===A)break t;case Q:a.mode=V;case V:if(g=a.length){if(g>l&&(g=l),g>h&&(g=h),0===g)break t;w.arraySet(r,n,s,g,o),l-=g,s+=g,h-=g,o+=g,a.length-=g;break}a.mode=X;break;case $:
for(;u<14;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(a.nlen=(31&_)+257,_>>>=5,u-=5,a.ndist=(31&_)+1,_>>>=5,u-=5,a.ncode=(15&_)+4,_>>>=4,u-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=_t;break}a.have=0,a.mode=tt;case tt:for(;a.have<a.ncode;){for(;u<3;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.lens[At[a.have++]]=7&_,_>>>=3,u-=3}for(;a.have<19;)a.lens[At[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,zt={bits:a.lenbits},xt=y(x,a.lens,0,19,a.lencode,0,a.work,zt),a.lenbits=zt.bits,xt){t.msg="invalid code lengths set",a.mode=_t;break}a.have=0,a.mode=et;case et:for(;a.have<a.nlen+a.ndist;){for(;St=a.lencode[_&(1<<a.lenbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(wt<16)_>>>=gt,u-=gt,a.lens[a.have++]=wt;else{if(16===wt){for(Bt=gt+2;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_>>>=gt,u-=gt,0===a.have){t.msg="invalid bit length repeat",a.mode=_t;break}yt=a.lens[a.have-1],g=3+(3&_),_>>>=2,u-=2}else if(17===wt){for(Bt=gt+3;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=gt,u-=gt,yt=0,g=3+(7&_),_>>>=3,u-=3}else{for(Bt=gt+7;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=gt,u-=gt,yt=0,g=11+(127&_),_>>>=7,u-=7}if(a.have+g>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=_t;break}for(;g--;)a.lens[a.have++]=yt}}if(a.mode===_t)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=_t;break}if(a.lenbits=9,zt={bits:a.lenbits},xt=y(z,a.lens,0,a.nlen,a.lencode,0,a.work,zt),a.lenbits=zt.bits,xt){t.msg="invalid literal/lengths set",a.mode=_t;break}if(a.distbits=6,a.distcode=a.distdyn,zt={bits:a.distbits},xt=y(B,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,zt),a.distbits=zt.bits,xt){t.msg="invalid distances set",a.mode=_t;break}if(a.mode=at,e===A)break t;case at:a.mode=it;case it:if(l>=6&&h>=258){t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,k(t,b),o=t.next_out,r=t.output,h=t.avail_out,s=t.next_in,n=t.input,l=t.avail_in,_=a.hold,u=a.bits,a.mode===X&&(a.back=-1);break}for(a.back=0;St=a.lencode[_&(1<<a.lenbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(mt&&0===(240&mt)){for(pt=gt,vt=mt,kt=wt;St=a.lencode[kt+((_&(1<<pt+vt)-1)>>pt)],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(pt+gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=pt,u-=pt,a.back+=pt}if(_>>>=gt,u-=gt,a.back+=gt,a.length=wt,0===mt){a.mode=lt;break}if(32&mt){a.back=-1,a.mode=X;break}if(64&mt){t.msg="invalid literal/length code",a.mode=_t;break}a.extra=15&mt,a.mode=nt;case nt:if(a.extra){for(Bt=a.extra;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.length+=_&(1<<a.extra)-1,_>>>=a.extra,u-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=rt;case rt:for(;St=a.distcode[_&(1<<a.distbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(0===(240&mt)){for(pt=gt,vt=mt,kt=wt;St=a.distcode[kt+((_&(1<<pt+vt)-1)>>pt)],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(pt+gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=pt,u-=pt,a.back+=pt}if(_>>>=gt,u-=gt,a.back+=gt,64&mt){t.msg="invalid distance code",a.mode=_t;break}a.offset=wt,a.extra=15&mt,a.mode=st;case st:if(a.extra){for(Bt=a.extra;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.offset+=_&(1<<a.extra)-1,_>>>=a.extra,u-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=_t;break}a.mode=ot;case ot:if(0===h)break t;if(g=b-h,a.offset>g){if(g=a.offset-g,g>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=_t;break}g>a.wnext?(g-=a.wnext,m=a.wsize-g):m=a.wnext-g,g>a.length&&(g=a.length),bt=a.window}else bt=r,m=o-a.offset,g=a.length;g>h&&(g=h),h-=g,a.length-=g;do r[o++]=bt[m++];while(--g);0===a.length&&(a.mode=it);break;case lt:if(0===h)break t;r[o++]=a.length,h--,a.mode=it;break;case ht:if(a.wrap){for(;u<32;){if(0===l)break t;l--,_|=n[s++]<<u,u+=8}if(b-=h,t.total_out+=b,a.total+=b,b&&(t.adler=a.check=a.flags?v(a.check,r,b,o-b):p(a.check,r,b,o-b)),b=h,(a.flags?_:i(_))!==a.check){t.msg="incorrect data check",a.mode=_t;break}_=0,u=0}a.mode=dt;case dt:if(a.wrap&&a.flags){for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=_t;break}_=0,u=0}a.mode=ft;case ft:xt=R;break t;case _t:xt=O;break t;case ut:return D;case ct:default:return N}return t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,(a.wsize||b!==t.avail_out&&a.mode<_t&&(a.mode<ht||e!==S))&&f(t,t.output,t.next_out,b-t.avail_out)?(a.mode=ut,D):(c-=t.avail_in,b-=t.avail_out,t.total_in+=c,t.total_out+=b,a.total+=b,a.wrap&&b&&(t.adler=a.check=a.flags?v(a.check,r,b,t.next_out-b):p(a.check,r,b,t.next_out-b)),t.data_type=a.bits+(a.last?64:0)+(a.mode===X?128:0)+(a.mode===at||a.mode===Q?256:0),(0===c&&0===b||e===S)&&xt===Z&&(xt=I),xt)}function u(t){if(!t||!t.state)return N;var e=t.state;return e.window&&(e.window=null),t.state=null,Z}function c(t,e){var a;return t&&t.state?(a=t.state,0===(2&a.wrap)?N:(a.head=e,e.done=!1,Z)):N}function b(t,e){var a,i,n,r=e.length;return t&&t.state?(a=t.state,0!==a.wrap&&a.mode!==G?N:a.mode===G&&(i=1,i=p(i,e,r,0),i!==a.check)?O:(n=f(t,e,r,r))?(a.mode=ut,D):(a.havedict=1,Z)):N}var g,m,w=t("../utils/common"),p=t("./adler32"),v=t("./crc32"),k=t("./inffast"),y=t("./inftrees"),x=0,z=1,B=2,S=4,E=5,A=6,Z=0,R=1,C=2,N=-2,O=-3,D=-4,I=-5,U=8,T=1,F=2,L=3,H=4,j=5,K=6,M=7,P=8,Y=9,q=10,G=11,X=12,W=13,J=14,Q=15,V=16,$=17,tt=18,et=19,at=20,it=21,nt=22,rt=23,st=24,ot=25,lt=26,ht=27,dt=28,ft=29,_t=30,ut=31,ct=32,bt=852,gt=592,mt=15,wt=mt,pt=!0;a.inflateReset=s,a.inflateReset2=o,a.inflateResetKeep=r,a.inflateInit=h,a.inflateInit2=l,a.inflate=_,a.inflateEnd=u,a.inflateGetHeader=c,a.inflateSetDictionary=b,a.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":3,"./adler32":5,"./crc32":7,"./inffast":10,"./inftrees":12}],12:[function(t,e,a){"use strict";var i=t("../utils/common"),n=15,r=852,s=592,o=0,l=1,h=2,d=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],f=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],_=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],u=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function(t,e,a,c,b,g,m,w){var p,v,k,y,x,z,B,S,E,A=w.bits,Z=0,R=0,C=0,N=0,O=0,D=0,I=0,U=0,T=0,F=0,L=null,H=0,j=new i.Buf16(n+1),K=new i.Buf16(n+1),M=null,P=0;for(Z=0;Z<=n;Z++)j[Z]=0;for(R=0;R<c;R++)j[e[a+R]]++;for(O=A,N=n;N>=1&&0===j[N];N--);if(O>N&&(O=N),0===N)return b[g++]=20971520,b[g++]=20971520,w.bits=1,0;for(C=1;C<N&&0===j[C];C++);for(O<C&&(O=C),U=1,Z=1;Z<=n;Z++)if(U<<=1,U-=j[Z],U<0)return-1;if(U>0&&(t===o||1!==N))return-1;for(K[1]=0,Z=1;Z<n;Z++)K[Z+1]=K[Z]+j[Z];for(R=0;R<c;R++)0!==e[a+R]&&(m[K[e[a+R]]++]=R);if(t===o?(L=M=m,z=19):t===l?(L=d,H-=257,M=f,P-=257,z=256):(L=_,M=u,z=-1),F=0,R=0,Z=C,x=g,D=O,I=0,k=-1,T=1<<O,y=T-1,t===l&&T>r||t===h&&T>s)return 1;for(;;){B=Z-I,m[R]<z?(S=0,E=m[R]):m[R]>z?(S=M[P+m[R]],E=L[H+m[R]]):(S=96,E=0),p=1<<Z-I,v=1<<D,C=v;do v-=p,b[x+(F>>I)+v]=B<<24|S<<16|E|0;while(0!==v);for(p=1<<Z-1;F&p;)p>>=1;if(0!==p?(F&=p-1,F+=p):F=0,R++,0===--j[Z]){if(Z===N)break;Z=e[a+m[R]]}if(Z>O&&(F&y)!==k){for(0===I&&(I=O),x+=C,D=Z-I,U=1<<D;D+I<N&&(U-=j[D+I],!(U<=0));)D++,U<<=1;if(T+=1<<D,t===l&&T>r||t===h&&T>s)return 1;k=F&y,b[k]=O<<24|D<<16|x-g|0}}return 0!==F&&(b[x+F]=Z-I<<24|64<<16|0),w.bits=O,0}},{"../utils/common":3}],13:[function(t,e,a){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],14:[function(t,e,a){"use strict";function i(t){for(var e=t.length;--e>=0;)t[e]=0}function n(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}function r(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}function s(t){return t<256?lt[t]:lt[256+(t>>>7)]}function o(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function l(t,e,a){t.bi_valid>W-a?(t.bi_buf|=e<<t.bi_valid&65535,o(t,t.bi_buf),t.bi_buf=e>>W-t.bi_valid,t.bi_valid+=a-W):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)}function h(t,e,a){l(t,a[2*e],a[2*e+1])}function d(t,e){var a=0;do a|=1&t,t>>>=1,a<<=1;while(--e>0);return a>>>1}function f(t){16===t.bi_valid?(o(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}function _(t,e){var a,i,n,r,s,o,l=e.dyn_tree,h=e.max_code,d=e.stat_desc.static_tree,f=e.stat_desc.has_stree,_=e.stat_desc.extra_bits,u=e.stat_desc.extra_base,c=e.stat_desc.max_length,b=0;for(r=0;r<=X;r++)t.bl_count[r]=0;for(l[2*t.heap[t.heap_max]+1]=0,a=t.heap_max+1;a<G;a++)i=t.heap[a],r=l[2*l[2*i+1]+1]+1,r>c&&(r=c,b++),l[2*i+1]=r,i>h||(t.bl_count[r]++,s=0,i>=u&&(s=_[i-u]),o=l[2*i],t.opt_len+=o*(r+s),f&&(t.static_len+=o*(d[2*i+1]+s)));if(0!==b){do{for(r=c-1;0===t.bl_count[r];)r--;t.bl_count[r]--,t.bl_count[r+1]+=2,t.bl_count[c]--,b-=2}while(b>0);for(r=c;0!==r;r--)for(i=t.bl_count[r];0!==i;)n=t.heap[--a],n>h||(l[2*n+1]!==r&&(t.opt_len+=(r-l[2*n+1])*l[2*n],l[2*n+1]=r),i--)}}function u(t,e,a){var i,n,r=new Array(X+1),s=0;for(i=1;i<=X;i++)r[i]=s=s+a[i-1]<<1;for(n=0;n<=e;n++){var o=t[2*n+1];0!==o&&(t[2*n]=d(r[o]++,o))}}function c(){var t,e,a,i,r,s=new Array(X+1);for(a=0,i=0;i<K-1;i++)for(dt[i]=a,t=0;t<1<<et[i];t++)ht[a++]=i;for(ht[a-1]=i,r=0,i=0;i<16;i++)for(ft[i]=r,t=0;t<1<<at[i];t++)lt[r++]=i;for(r>>=7;i<Y;i++)for(ft[i]=r<<7,t=0;t<1<<at[i]-7;t++)lt[256+r++]=i;for(e=0;e<=X;e++)s[e]=0;for(t=0;t<=143;)st[2*t+1]=8,t++,s[8]++;for(;t<=255;)st[2*t+1]=9,t++,s[9]++;for(;t<=279;)st[2*t+1]=7,t++,s[7]++;for(;t<=287;)st[2*t+1]=8,t++,s[8]++;for(u(st,P+1,s),t=0;t<Y;t++)ot[2*t+1]=5,ot[2*t]=d(t,5);_t=new n(st,et,M+1,P,X),ut=new n(ot,at,0,Y,X),ct=new n(new Array(0),it,0,q,J)}function b(t){var e;for(e=0;e<P;e++)t.dyn_ltree[2*e]=0;for(e=0;e<Y;e++)t.dyn_dtree[2*e]=0;for(e=0;e<q;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*Q]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function g(t){t.bi_valid>8?o(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function m(t,e,a,i){g(t),i&&(o(t,a),o(t,~a)),N.arraySet(t.pending_buf,t.window,e,a,t.pending),t.pending+=a}function w(t,e,a,i){var n=2*e,r=2*a;return t[n]<t[r]||t[n]===t[r]&&i[e]<=i[a]}function p(t,e,a){for(var i=t.heap[a],n=a<<1;n<=t.heap_len&&(n<t.heap_len&&w(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!w(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i}function v(t,e,a){var i,n,r,o,d=0;if(0!==t.last_lit)do i=t.pending_buf[t.d_buf+2*d]<<8|t.pending_buf[t.d_buf+2*d+1],n=t.pending_buf[t.l_buf+d],d++,0===i?h(t,n,e):(r=ht[n],h(t,r+M+1,e),o=et[r],0!==o&&(n-=dt[r],l(t,n,o)),i--,r=s(i),h(t,r,a),o=at[r],0!==o&&(i-=ft[r],l(t,i,o)));while(d<t.last_lit);h(t,Q,e)}function k(t,e){var a,i,n,r=e.dyn_tree,s=e.stat_desc.static_tree,o=e.stat_desc.has_stree,l=e.stat_desc.elems,h=-1;for(t.heap_len=0,t.heap_max=G,a=0;a<l;a++)0!==r[2*a]?(t.heap[++t.heap_len]=h=a,t.depth[a]=0):r[2*a+1]=0;for(;t.heap_len<2;)n=t.heap[++t.heap_len]=h<2?++h:0,r[2*n]=1,t.depth[n]=0,t.opt_len--,o&&(t.static_len-=s[2*n+1]);for(e.max_code=h,a=t.heap_len>>1;a>=1;a--)p(t,r,a);n=l;do a=t.heap[1],t.heap[1]=t.heap[t.heap_len--],p(t,r,1),i=t.heap[1],t.heap[--t.heap_max]=a,t.heap[--t.heap_max]=i,r[2*n]=r[2*a]+r[2*i],t.depth[n]=(t.depth[a]>=t.depth[i]?t.depth[a]:t.depth[i])+1,r[2*a+1]=r[2*i+1]=n,t.heap[1]=n++,p(t,r,1);while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],_(t,e),u(r,h,t.bl_count)}function y(t,e,a){var i,n,r=-1,s=e[1],o=0,l=7,h=4;for(0===s&&(l=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=s,s=e[2*(i+1)+1],++o<l&&n===s||(o<h?t.bl_tree[2*n]+=o:0!==n?(n!==r&&t.bl_tree[2*n]++,t.bl_tree[2*V]++):o<=10?t.bl_tree[2*$]++:t.bl_tree[2*tt]++,o=0,r=n,0===s?(l=138,h=3):n===s?(l=6,h=3):(l=7,h=4))}function x(t,e,a){var i,n,r=-1,s=e[1],o=0,d=7,f=4;for(0===s&&(d=138,f=3),i=0;i<=a;i++)if(n=s,s=e[2*(i+1)+1],!(++o<d&&n===s)){if(o<f){do h(t,n,t.bl_tree);while(0!==--o)}else 0!==n?(n!==r&&(h(t,n,t.bl_tree),o--),h(t,V,t.bl_tree),l(t,o-3,2)):o<=10?(h(t,$,t.bl_tree),l(t,o-3,3)):(h(t,tt,t.bl_tree),l(t,o-11,7));o=0,r=n,0===s?(d=138,f=3):n===s?(d=6,f=3):(d=7,f=4)}}function z(t){var e;for(y(t,t.dyn_ltree,t.l_desc.max_code),y(t,t.dyn_dtree,t.d_desc.max_code),k(t,t.bl_desc),e=q-1;e>=3&&0===t.bl_tree[2*nt[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}function B(t,e,a,i){var n;for(l(t,e-257,5),l(t,a-1,5),l(t,i-4,4),n=0;n<i;n++)l(t,t.bl_tree[2*nt[n]+1],3);x(t,t.dyn_ltree,e-1),x(t,t.dyn_dtree,a-1)}function S(t){var e,a=4093624447;for(e=0;e<=31;e++,a>>>=1)if(1&a&&0!==t.dyn_ltree[2*e])return D;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return I;for(e=32;e<M;e++)if(0!==t.dyn_ltree[2*e])return I;return D}function E(t){bt||(c(),bt=!0),t.l_desc=new r(t.dyn_ltree,_t),t.d_desc=new r(t.dyn_dtree,ut),t.bl_desc=new r(t.bl_tree,ct),t.bi_buf=0,t.bi_valid=0,b(t)}function A(t,e,a,i){l(t,(T<<1)+(i?1:0),3),m(t,e,a,!0)}function Z(t){l(t,F<<1,3),h(t,Q,st),f(t)}function R(t,e,a,i){var n,r,s=0;t.level>0?(t.strm.data_type===U&&(t.strm.data_type=S(t)),k(t,t.l_desc),k(t,t.d_desc),s=z(t),n=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=n&&(n=r)):n=r=a+5,a+4<=n&&e!==-1?A(t,e,a,i):t.strategy===O||r===n?(l(t,(F<<1)+(i?1:0),3),v(t,st,ot)):(l(t,(L<<1)+(i?1:0),3),B(t,t.l_desc.max_code+1,t.d_desc.max_code+1,s+1),v(t,t.dyn_ltree,t.dyn_dtree)),b(t),i&&g(t)}function C(t,e,a){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&a,t.last_lit++,0===e?t.dyn_ltree[2*a]++:(t.matches++,e--,t.dyn_ltree[2*(ht[a]+M+1)]++,t.dyn_dtree[2*s(e)]++),t.last_lit===t.lit_bufsize-1}var N=t("../utils/common"),O=4,D=0,I=1,U=2,T=0,F=1,L=2,H=3,j=258,K=29,M=256,P=M+1+K,Y=30,q=19,G=2*P+1,X=15,W=16,J=7,Q=256,V=16,$=17,tt=18,et=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],at=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],it=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],nt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],rt=512,st=new Array(2*(P+2));i(st);var ot=new Array(2*Y);i(ot);var lt=new Array(rt);i(lt);var ht=new Array(j-H+1);i(ht);var dt=new Array(K);i(dt);var ft=new Array(Y);i(ft);var _t,ut,ct,bt=!1;a._tr_init=E,a._tr_stored_block=A,a._tr_flush_block=R,a._tr_tally=C,a._tr_align=Z},{"../utils/common":3}],15:[function(t,e,a){"use strict";function i(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}e.exports=i},{}],"/":[function(t,e,a){"use strict";var i=t("./lib/utils/common").assign,n=t("./lib/deflate"),r=t("./lib/inflate"),s=t("./lib/zlib/constants"),o={};i(o,n,r,s),e.exports=o},{"./lib/deflate":1,"./lib/inflate":2,"./lib/utils/common":3,"./lib/zlib/constants":6}]},{},[])("/")});

gameclass.csvmgr  = cc.Class.extend({
    csv_item:[],
	csv_fish:[],
    ctor:function () {
    },

    init:function() {
        this.initCsv("res/csv/item.csv", this.csv_item);
		this.initCsv("res/csv/fishid.csv", this.csv_fish);
    },

    CSVToArray : function(strData, strDelimiter) {
        strDelimiter = (strDelimiter || ",");
        var objPattern = new RegExp(
            (
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );
        var arrData = [[]];
        var arrMatches = null;
        while (arrMatches = objPattern.exec( strData )){
            var strMatchedDelimiter = arrMatches[ 1 ];
            if (
                strMatchedDelimiter.length &&
                (strMatchedDelimiter != strDelimiter)
            ){
                arrData.push( [] );
            }
            if (arrMatches[ 2 ]){
                var strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                );
            } else {
                var strMatchedValue = arrMatches[ 3 ];
            }
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }
        return arrData;
    },

    initCsv : function(path, node){
        var _this = this;
        cc.loader.loadTxt(path,function(err,data){
            if(err){
                cc.log(err);
                return;
            }
            var csvArray = _this.CSVToArray(data,",");
            for(var i = 1;i < csvArray.length; i++){
                var rowData = csvArray[i];
                for(var j = 0;j < rowData.length; j++){
                    node[csvArray[i][0] + "_" + csvArray[0][j]] = csvArray[i][j];
                }
            }
            //cc.log(node);
        });
    }
});

var getcsvmgr = new gameclass.csvmgr();
/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(){
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

    var __BASE64 = {
        /**
         *BASE64 Encode
         */
        decoder:function(base64){
            var bufferLength = base64.length * 0.75,
                len = base64.length, i, p = 0,
                encoded1, encoded2, encoded3, encoded4;

            if (base64[base64.length - 1] === "=") {
                bufferLength--;
                if (base64[base64.length - 2] === "=") {
                    bufferLength--;
                }
            }

            var arraybuffer = new ArrayBuffer(bufferLength),
                bytes = new Uint8Array(arraybuffer);

            for (i = 0; i < len; i+=4) {
                encoded1 = lookup[base64.charCodeAt(i)];
                encoded2 = lookup[base64.charCodeAt(i+1)];
                encoded3 = lookup[base64.charCodeAt(i+2)];
                encoded4 = lookup[base64.charCodeAt(i+3)];

                bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
                bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
                bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
            }

            return arraybuffer;
        },
        /**
         *BASE64  Decode for UTF-8
         */
        encoder : function(arraybuffer) {
            var bytes = new Uint8Array(arraybuffer),
                i, len = bytes.length, base64 = "";

            for (i = 0; i < len; i += 3) {
                base64 += chars[bytes[i] >> 2];
                base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
                base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
                base64 += chars[bytes[i + 2] & 63];
            }

            if ((len % 3) === 2) {
                base64 = base64.substring(0, base64.length - 1) + "=";
            } else if (len % 3 === 1) {
                base64 = base64.substring(0, base64.length - 2) + "==";
            }

            return base64;
        }
    };

    window.BASE64 = __BASE64;
})();

var Bytes2Str = function(arr) {
    if(typeof arr === 'string') {
        return arr;
    }
    var str = '',
        _arr = arr;
    for(var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if(v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for(var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
        } else {
            str += String.fromCharCode(_arr[i]);
        }
    }
    return str;
}
var gameclass = gameclass || {};
gameclass.tool_cardType = cc.Class.extend({
    CARDTYPE:{
        danzhang:1,
        duizi:2,
        sanzhang:3,
        zhadan:4,
        sandaiyi:5,
        sandaier:6,
        liandui:7,
        shunzi:8,
        sidaierdan:9,
        sidaierdui:10,
        feiji:11,
        danfei:12,
        shuangfei:13,
        huojian:14,
    },
    ctor:function () {

    },

    check:function(cardsArr){
        //cc.log("出牌检测"+cardsArr);
        if(cardsArr.length < 1){
            return 0;
        }
        var cards = this.build(cardsArr);
        cc.log(cards);
        var funcs = [
            this.isDanZhang.bind(this),
            this.isDuiZi.bind(this),
            this.isSanZhang.bind(this),
            this.isZhaDan.bind(this),
            this.isSanDaiYi.bind(this),
            this.isSanDaiEr.bind(this),
            this.isLianDui.bind(this),
            this.isShunZi.bind(this),
            this.isSiDaiErDan.bind(this),
            this.isSiDaiErDui.bind(this),
            this.isFeiJi.bind(this),
            this.isDanFei.bind(this),
            this.isShuangFei.bind(this),
            this.isHuoJian.bind(this)
        ];

        var res = 0;
        for(var i=0;i< funcs.length ; i++) {
            if(funcs[i]){
                res =  funcs[i](cards,cardsArr.length);
                if(res !== 0 ){
                    break;
                }
            }
        }

        /*cc.log("返回出牌类型");
        cc.log(res);*/
        return res;
    },

    build:function (cards) {

        var ar =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for(var x=0; x<cards.length;x++){
            var index = cards[x];
            if(index == 100){
                index = 13;
            }else if(index == 200){
                index = 14;
            }else {
                index -= 3;
            }

            ar[ index ]++;
        }
        return ar;
    },
    //------------压牌检测
    compare:function(pressCards,befCards){
        cc.log("pressCards="+pressCards+",befCards="+befCards);
        var res1 = this.check(pressCards);
        cc.log("---------------压牌-----------------000");
        cc.log(res1);
        if(res1 == 0){
            return {value:-1};
        }

        var res2 = this.check(befCards);
        cc.log("---------------上家出的牌------------000");
        cc.log(res2);
        if(res2 == 0){
            return {value:-1};
        }

        if(res1.type == this.CARDTYPE.huojian){
            return {type:this.CARDTYPE.huojian,value:1};
        }
        if(res1.type == this.CARDTYPE.zhadan){
            if(res2.type != this.CARDTYPE.zhadan && res2.type != this.CARDTYPE.huojian ){
                return {type:this.CARDTYPE.zhadan,value:1};
            }else if(res2.type == this.CARDTYPE.zhadan){
                if(pressCards[0] > befCards[0]) {
                    return {type:this.CARDTYPE.zhadan,value:1};
                }else{
                    return {value:-1};
                }
            }
        }
        if(res1.type != res2.type ){
            return {value:-1};
        }
        switch (res1.type){
            case this.CARDTYPE.danzhang:
                return {
                    type:this.CARDTYPE.danzhang,
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.duizi:
                return {
                    type:this.CARDTYPE.duizi,
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.sanzhang:
                return {
                    type:this.CARDTYPE.sanzhang,
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            //case this.CARDTYPE.zhadan:
            case this.CARDTYPE.sandaiyi:
                return {
                    type:this.CARDTYPE.sandaiyi,
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.sandaier:
                return {
                    type:this.CARDTYPE.sandaier,
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.liandui:
                return {
                    type:this.CARDTYPE.liandui,
                    value:res1.value.min > res2.value.min? 1:-1,
                    res:res1.value.min
                };
            case this.CARDTYPE.shunzi:
                if( res1.value.count != res2.value.count)
                    return -1;
                return {
                    type:this.CARDTYPE.shunzi,
                    value:res1.value.min > res2.value.min? 1:-1,
                    res:res1.value.min
                };
                break;
            case this.CARDTYPE.sidaierdan:
                return {
                    type:this.CARDTYPE.sidaierdan,
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
            case this.CARDTYPE.sidaierdui:
                return {
                    type:this.CARDTYPE.sidaierdui,
                    value:res1.value > res2.value? 1:-1,
                    res:res1.value
                };
                break;
            case this.CARDTYPE.feiji:
                return {
                    type:this.CARDTYPE.feiji,
                    value:res1.value.min > res2.value.min? 1:-1,
                    res:res1.value.min
                };
            case this.CARDTYPE.danfei:
                return {
                    type:this.CARDTYPE.danfei,
                    value:res1.value.min > res2.value.min? 1:-1,
                    res:res1.value.min
                };
            case this.CARDTYPE.shuangfei:
                return {
                    type:this.CARDTYPE.shuangfei,
                    value:res1.value.min > res2.value.min? 1:-1,
                    res:res1.value.min
                };
                //return res1.value.min > res2.value.min? 1:-1;
                break;
            default:
                return {value:-1};
                break;
        }

    },
    //--------------------压牌检测

    //--------------------提示功能*/

    /**
     * 判断单张
     **/
    isDanZhang:function (cards , size ) {

        if(size != 1){
            return 0;
        }

        for(var i=0; i<cards.length;i++){
            if(cards[i] == 1){

                return {type:this.CARDTYPE.danzhang,value:i};
            }
        }

        return 0;

    },
    /**
     * 判断对子
     **/
    isDuiZi:function (cards , size) {
        if(size != 2){
            return 0;
        }
       // var data = this.build(cards);
        var d2 = false;
        for(var x=0; x<cards.length;x++){
            if(cards[x] == 2){
                return {type:this.CARDTYPE.duizi,value:x};
            }
        }
        return 0;
    },
    /**
     * 判断是否三张
     **/
    isSanZhang:function (cards , size) {
        if(size != 3){
            return 0;
        }
        //var data = this.build(cards );
        var d2 = false;
        for(var x =0; x<cards.length; x++){
            if(cards[x] == 3){
                return  {type:this.CARDTYPE.sanzhang , value:x};
            }
        }
        return 0;
    },
    /**
     * 判断炸弹
     **/
    isZhaDan:function (cards,size) {
        if(size != 4){
            return 0;
        }
        //var data = this.build(cards);
        var d2 = false;
        for(var x =0; x<cards.length; x++){
            if(cards[x] == 4){
                /*cc.log("isZhaDan");
                cc.log(x);*/
                return {type:this.CARDTYPE.zhadan , value:x};
            }
        }
        return 0;
    },
    /**
     * 判断三带1
     **/
    isSanDaiYi:function (cards , size) {
        if(size != 4){
            return 0;
        }
        //cc.log(cards);
        var d1 = 0 , d3 = 0 , vd3 = -1;
        var child = 0;
        for(var x =0; x<cards.length; x++){
            if(cards[x] == 3){
                vd3 = x;
                d3++;
            }
            if(cards[x] == 1){
                child = x;
                d1++;
            }
        }
        if(d3 == 1 && d1 == 1){

            return {type:this.CARDTYPE.sandaiyi , value:vd3,d1:child};
        }
        return 0;
    },
    /**
     * 判断三带2
     **/
    isSanDaiEr:function (cards , size) {
        //cc.log("isSanDaiEr");
        if(size != 5){
            return 0;
        }
        //var data = this.build(cards);

        var d2 = 0 , d3 = 0, vd3=-1;
        var child = 0;
        for(var x = 0;x<cards.length;x++){
            if(cards[x] == 3){
                vd3 = x;
                d3++;
            }
            if(cards[x] == 2){
                child = x;
                d2++;
            }
        }
        if(d3 == 1 && d2 == 1){
            return  {type:this.CARDTYPE.sandaier , value:vd3,d1:child};
        }
        return 0;
    },

    /*
     * 判断是不是连续的
     * */
    isContinuation:function(data){
        if(data[12] > 0 || data[13] > 0 || data[14] > 0){//2，13小王， 14大王 不计算在连续之内
            return 0;
        }

        var min = -1, max = -1;
        //找到最小值
        for(var i = 0 ; i< data.length ; i++){
            if( min == -1 && data[i] != 0){
                min = i;
                break;
            }
        }
        if(min < 0){ return 0;}

        //找到最大值
        for(var i = data.length -1 ; i >= 0 ; i--){
            if( max == -1 && data[i] != 0){
                max = i;
                break;
            }
        }
        if(max < 0){ return 0;}

        for(var i = min ;i<=max;i++){
            if(data[i] == 0){
                return 0;
            }
        }

        return {
            min:min,
            max:max,
            count:max - min +1
        };

    },
    /**
     * 判断连队
     **/
    isLianDui:function (cards , size) {
        if(size < 5){
            return 0;
        }
       // var data = this.build(cards);
        for(var i = 0; i<cards.length ; i++){
            if(cards[i] != 0 && cards[i] != 2){
                return 0;
            }
        }
        //判断连续性
        var res = this.isContinuation(cards);
        if(res == 0){
            return 0;
        }
        if( res.count < 3 ){
            return 0;
        }
        return { type:this.CARDTYPE.liandui,value : res};
    },
    /**
     * 判断顺子
     **/
    isShunZi:function (cards , size) {
        if(size < 5){
            return 0;
        }
        //var data = this.build(cards);
        for(var i = 0; i<cards.length ; i++){
            if(cards[i] != 0 && cards[i] != 1){
                return 0;
            }
        }
        //判断连续性
        var res = this.isContinuation(cards);
        if(res == 0){
            return 0;
        }
        if( res.count < 5 ){
            return 0;
        }
        return {
            type:this.CARDTYPE.shunzi,
            value : res
        };
    },
    /*
     * 判断四带二单
     * */
    isSiDaiErDan:function(cards , size){
        if(size != 6){
            return 0;
        }
        //var data = this.build(cards);

        var d1 = 0, d2 = 0 , d4 = 0 ,v1=-1,v2=-1, vd4 = -1 ;
        var child1 = 0,child2 = 0;
        for(var x =0; x<cards.length; x++){
            if(cards[x] == 4){
                vd4 = x;
                d4++;
            }
            if(cards[x] == 1){
                if(child1 == 0){
                    child1 = x;
                }else{
                    child2 = x;
                }
                d1 ++;
            }

            if(cards[x] == 2){
                child1 = x;
                child2 = x;
                d1 += 2;
            }
        }
        if(d4 == 1 && d1 == 2){
            return {type:this.CARDTYPE.sidaierdan , value:vd4,d1:child1,d2:child2};
        }
        return 0;

    },
    /*
     * 判断四带二对
     * */
    isSiDaiErDui:function(cards , size){
        if(size != 8){
            return 0;
        }
       // var data = this.build(cards);

        var d1 = 0, d2 = 0 ,  d4 = 0, vd4 = -1;
        var child1 = 0,child2 = 0;
        for(var x =0; x<cards.length; x++){
            if(cards[x] == 4){
                vd4 = x;
                d4++;
            }
            if(cards[x] == 2){

                if(d1 == 0){
                    child1 = x;
                    d1++;
                }else{
                    child2 = x;
                    d2++;
                }
            }
        }
        if(d4 == 1 && d1 == 1 && d2 ==1){
            return {type:this.CARDTYPE.sidaierdui , value:vd4,d1:child1,d2:child2};
        }
        return 0;
    },
    /**
     * 判断飞机
     **/
    isFeiJi:function (cards , size) {
        if(size < 6 || size > 18){
            return 0;
        }
        //var data = this.build(cards);
        for(var i = 0; i<cards.length ; i++){
            if(cards[i] != 0 && cards[i] != 3){
                return 0;
            }
        }
        //判断连续性
        var res = this.isContinuation(cards);
        if(res == 0){
            return 0;
        }
        if( res.count < 2 ){
            return 0;
        }

        return {type:this.CARDTYPE.feiji,value : res};

    },
    /**
     * 判断飞机带单...
     **/
    isDanFei:function (cards , size) {
        if(size < 8 ){
            return 0;
        }
       // var data = this.build(cards);
        var d1 = 0, d3 =0;
        var child = [];
        var temp =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for(var i=0;i<cards.length ;i++) {
            if (cards[i] == 3) {
                temp[i] = 3;
                d3++;
            } else {
                for(var j = 0;j<cards[i];j++){
                    child.push(i);
                }
                d1 += cards[i];
            }
        }

        if(d3 != d1){
            return 0;
        }

        var res = this.isContinuation(temp);
        if(res == 0){
            return 0;
        }

        return {type:this.CARDTYPE.danfei,value : res,d1:child};

    },
    /**
     * 判断飞机带对...
     **/
    isShuangFei:function (cards , size) {
        if(size < 10 ){
            return 0;
        }
        //var data = this.build(cards);
        var d2 = 0, d3 =0;
        var derr = 0;
        var temp =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var child = [];
        for(var i=0;i<cards.length ;i++) {
            if (cards[i] == 3) {
                temp[i] = 3;
                d3++;
            } else if(cards[i] == 2){
                d2++;
                child.push(i);
            }else{
                derr+=cards[i];
            }
        }

        if(d3 != d2 || derr> 0 ){
            return 0;
        }

        var res = this.isContinuation(temp);
        if(res == 0){
            return 0;
        }

        return {type:this.CARDTYPE.shuangfei,value : res,d2:child};

    },

    /**
     * 判断火箭
     **/
    isHuoJian:function (cards , size) {
        if(size != 2){
            return 0;
        }
        //var data = this.build(cards);

        if(cards[cards.length - 1] == 1 && cards[cards.length - 2] == 1){
            return {type:this.CARDTYPE.huojian};
        }

        return 0;
    },

    //! 得到一张牌
    getOneCard:function(oneCard, twoCard, threeCard, fourCard, card, num, sun) {
        //cc.log(oneCard, twoCard, threeCard, card, num, sun);
        if(num == null || num <= 0) {
            num = 1;
        }
        if(sun == null) {
            sun = false;
        }
        //cc.log(num,sun);
        var outCards = [];

        for(var i = 0; i < oneCard.length; i++) {
            if(oneCard[i] > card) {
                outCards[outCards.length] = oneCard[i];
                if(outCards.length >= num && !sun) {
                    return outCards;
                }
            }
        }

        for(var i = 0; i < twoCard.length; i++) {
            if(twoCard[i] > card) {
                for(var j = 0; j < 2; j++) {
                    outCards[outCards.length] = twoCard[i];
                    if(outCards.length >= num && !sun) {
                        return outCards;
                    }
                    if(sun) { //! 顺子不压入相同的牌
                        break;
                    }
                }
            }
        }

        for(var i = 0; i < threeCard.length; i++) {
            if(threeCard[i] > card) {
                for(var j = 0; j < 3; j++) {
                    outCards[outCards.length] = threeCard[i];
                    if(outCards.length >= num && !sun) {
                        return outCards;
                    }
                    if(sun) { //! 顺子不压入相同的牌
                        break;
                    }
                }
            }
        }

        if(sun) { //! 顺子拆炸弹
            for(var i = 0; i < fourCard.length; i++) {
                if(fourCard[i] > card) {
                    outCards[outCards.length] = fourCard[i];
                }
            }
        }

        if(sun && outCards.length >= num) {
            outCards.sort(function(a, b){
                return a - b});
            var index = -1;
            var find = true;
            for(var i = 0; i < outCards.length; i++) {
                find = true;
                for(var j = 1; j < num; j++) {
                    if(i + j >= outCards.length) {
                        find = false;
                        break;
                    }
                    if(outCards[i + j] - outCards[i + j - 1] != 1) {
                        find = false;
                        break;
                    }
                }
                if(find) {
                    index = i;
                    break;
                }
            }
            if(index == -1) {
                return null
            }
            var lastCards = [];
            for(var i = index; i < num + index; i++) {
                lastCards[i - index] = outCards[i];
            }
            return lastCards;
        }

        return null;
    },

    //! 得到两张牌
    getTwoCard:function(oneCard, twoCard, threeCard, fourCard, card, num, sun) {
        if(num == null || num <= 0) {
            num = 1;
        }
        if(sun == null) {
            sun = false;
        }
        var lastCards = [];

        for(var i = 0; i < twoCard.length; i++) {
            if(twoCard[i] > card) {
                lastCards[lastCards.length] = twoCard[i];
                lastCards[lastCards.length] = twoCard[i];
                if(lastCards.length / 2 >= num && !sun) {
                    return lastCards;
                }
            }
        }

        for(var i = 0; i < threeCard.length; i++) {
            if (threeCard[i] > card) {
                lastCards[lastCards.length] = threeCard[i];
                lastCards[lastCards.length] = threeCard[i];
                if(lastCards.length / 2 >= num && !sun) {
                    return lastCards;
                }
            }
        }

        if(sun) { //! 顺子拆炸弹
            for(var i = 0; i < fourCard.length; i++) {
                if (fourCard[i] > card) {
                    lastCards[lastCards.length] = fourCard[i];
                    lastCards[lastCards.length] = fourCard[i];
                }
            }
        }

        if(sun && lastCards.length >= num * 2) {
            lastCards.sort(function(a, b){
                return a - b});
            var index = -1;
            var find = true;
            for(var i = 0; i < lastCards.length; i+=2) {
                find = true;
                for(var j = 1; j < num; j++) {
                    if(i + j * 2 >= lastCards.length) {
                        find = false;
                        break;
                    }
                    if(lastCards[i + j * 2] - lastCards[i + (j - 1) * 2] != 1) {
                        find = false;
                        break;
                    }
                }
                if(find) {
                    index = i;
                    break;
                }
            }
            if(index == -1) {
                return null
            }
            var outCards = [];
            for(var i = index; i < num * 2 + index; i++) {
                outCards[i - index] = lastCards[i];
            }
            return outCards;
        }

        return null;
    },

    //! 得到三张牌
    getThreeCard:function(oneCard, twoCard, threeCard, fourCard, card, num, sun) {
        cc.log(oneCard, twoCard, threeCard, card, num, sun);
        if(num == null || num <= 0) {
            num = 1;
        }
        if(sun == null) {
            sun = false;
        }
        var lastCards = [];

        for(var i = 0; i < threeCard.length; i++) {
            if (threeCard[i] > card) {
                lastCards[lastCards.length] = threeCard[i];
                lastCards[lastCards.length] = threeCard[i];
                lastCards[lastCards.length] = threeCard[i];
                if(lastCards.length / 3 >= num && !sun) {
                    return lastCards;
                }
            }
        }

        if(sun) { //! 顺子拆炸弹
            for(var i = 0; i < fourCard.length; i++) {
                if (fourCard[i] > card) {
                    lastCards[lastCards.length] = fourCard[i];
                    lastCards[lastCards.length] = fourCard[i];
                    lastCards[lastCards.length] = fourCard[i];
                }
            }
        }

        if(sun && lastCards.length >= num * 3) {
            lastCards.sort(function(a, b){
                return a - b});
            var index = -1;
            var find = true;
            for(var i = 0; i < lastCards.length; i+=3) {
                find = true;
                for(var j = 1; j < num; j++) {
                    if(i + j * 3 >= lastCards.length) {
                        find = false;
                        break;
                    }
                    if(lastCards[i + j * 3] - lastCards[i + (j - 1) * 3] != 1) {
                        find = false;
                        break;
                    }
                }
                if(find) {
                    index = i;
                    break;
                }
            }
            if(index == -1) {
                return null
            }
            var outCards = [];
            for(var i = index; i < num * 3 + index; i++) {
                outCards[i - index] = lastCards[i];
            }
            return outCards;
        }

        return null;
    },

    //! 得到四张牌
    getFourCard:function(fourCard, card) {
        var lastCards = [];

        for(var i = 0; i < fourCard.length; i++) {
            if (fourCard[i] > card) {
                lastCards[0] = lastCards[1] = lastCards[2] = lastCards[3] = fourCard[i];
                return lastCards;
            }
        }

        return null;
    },

    //! 分析
    analyseCard:function(handCards, oneCard, twoCard, threeCard, fourCard) {
        var numCard = [];
        var clownCard = [];
        var rocket = false;

        for(var i = 0; i < handCards.length; i++) {
            if(handCards[i] == 1000 || handCards[i] == 2000) {
                clownCard[clownCard.length] = handCards[i];
                continue;
            }
            if(numCard.hasOwnProperty(handCards[i])) {
                numCard[handCards[i]]++;
            } else {
                numCard[handCards[i]] = 1;
            }
        }
        //cc.log("numCard");
        //cc.log(numCard);
        for(var card in numCard) {
            if (numCard[card] == 1) {
                oneCard[oneCard.length] = parseInt(card);
            } else if (numCard[card] == 2) {
                twoCard[twoCard.length] = parseInt(card);
            } else if (numCard[card] == 3) {
                threeCard[threeCard.length] = parseInt(card);
            } else if (numCard[card] == 4) {
                fourCard[fourCard.length] = parseInt(card);
            }
        }
        if(clownCard.length == 2) {
            rocket = true;
        } else if(clownCard.length == 1){
            oneCard[oneCard.length] = clownCard[0];
        }

        return rocket;
    },

    costCard:function(cards, _card, num) {
        for(var i = 0; i < _card.length; i += num) {
            for(var j = 0; j < cards.length; j++) {
                if(cards[j] == _card[i]) {
                    cards.splice(j, 1);
                    break;
                }
            }
        }
    },

    //! 得到可以出的牌
    getLastCard:function(handCards, stepCards) {
        var lastCards = [];

        //! 分析
        var oneCard = [];
        var twoCard = [];
        var threeCard = [];
        var fourCard = [];
        var rocket = this.analyseCard(handCards, oneCard, twoCard, threeCard, fourCard);
        var _oneCard = [];
        var _twoCard = [];
        var _threeCard = [];
        var _fourCard = [];
        var _rocket = this.analyseCard(stepCards, _oneCard, _twoCard, _threeCard, _fourCard);
        //! 没出牌
        if(stepCards.length == 0) {
            if(oneCard.length > 0) {
                lastCards[0] = oneCard[0];
                return lastCards;
            } else if(twoCard.length > 0) {
                lastCards[0] = lastCards[1] = twoCard[0];
                return lastCards;
            } else if(threeCard.length > 0) {
                lastCards[0] = lastCards[1] = lastCards[2] = threeCard[0];
                return lastCards;
            } else if(fourCard.length > 0) {
                lastCards[0] = lastCards[1] = lastCards[2] = lastCards[3] = fourCard[0];
                return lastCards;
            }
        }

        if(_rocket) {
            return lastCards
        }

        //! 单张
        if(stepCards.length == 1) {
            var deal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, stepCards[0]);
            if(deal != null) {
                return deal;
            }
        }

        //! 对子 和 双王
        if(stepCards.length == 2) {
            var deal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, stepCards[0]);
            if(deal != null) {
                return deal;
            }
        }

        //! 3张
        if(stepCards.length == 3) {
            var deal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, stepCards[0]);
            if(deal != null) {
                return deal;
            }
        }

        //! 4张
        var boom = false;
        if(stepCards.length == 4) {
            //! 炸弹
            if(stepCards[0] == stepCards[1] && stepCards[2] == stepCards[3] && stepCards[0] == stepCards[3]) {
                boom = true;
                var fourdeal = this.getFourCard(fourCard, stepCards[0])
                if(fourdeal != null) {
                    return fourdeal;
                }
            } else {
                //! 3带1
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0]);
                if(threedeal != null) {
                    this.costCard(threeCard, threedeal, 3);
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0);
                    if(onedeal != null) {
                        threedeal[3] = onedeal[0];
                        return threedeal;
                    }
                }
            }
        }

        if(stepCards.length == 5) {
            if(_threeCard.length > 0 && _twoCard.length > 0) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0]);
                if(threedeal != null) {
                    this.costCard(threeCard, threedeal, 3);
                    var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, 0);
                    if(twodeal != null) {
                        threedeal[3] = threedeal[4] = twodeal[0];
                        return threedeal;
                    }
                }
            }
        }

        if(stepCards.length >= 5) {
            if(_oneCard.length == stepCards.length) { //! 顺子
                var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, _oneCard[0], _oneCard.length, true);
                cc.log(onedeal);
                if(onedeal != null) {
                    return onedeal;
                }
            } else if(_twoCard.length == stepCards.length / 2) {
                var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, _twoCard[0], _twoCard.length, true);
                if(twodeal != null) {
                    return twodeal;
                }
            } else if(_threeCard.length == stepCards.length / 3) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
                if(threedeal != null) {
                    return threedeal;
                }
            } else if(_fourCard.length == 0 && _threeCard.length == _oneCard.length && _twoCard.length == 0) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
                if(threedeal != null) {
                    this.costCard(threeCard, threedeal, 3);
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, _threeCard.length);
                    if(onedeal != null) {
                        for(var i = 0; i < onedeal.length; i++) {
                            threedeal[threedeal.length + i] = onedeal[i];
                        }
                        return threedeal;
                    }
                }
            } else if(_fourCard.length == 0 && _threeCard.length == _twoCard.length && _oneCard.length == 0) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
                if(threedeal != null) {
                    this.costCard(threeCard, threedeal, 3);
                    var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, 0, _threeCard.length);
                    if(twodeal != null) {
                        for(var i = 0; i < twodeal.length; i++) {
                            threedeal[threedeal.length + i] = twodeal[i];
                        }
                        return threedeal;
                    }
                }
            } else if(_fourCard.length == 0 && _threeCard.length == (_oneCard.length + _twoCard.length)) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
                if(threedeal != null) {
                    this.costCard(threeCard, threedeal, 3);
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, _threeCard.length);
                    if(onedeal != null) {
                        for(var i = 0; i < onedeal.length; i++) {
                            threedeal[threedeal.length + i] = onedeal[i];
                        }
                        return threedeal;
                    }
                }
            }  else if(_fourCard.length == 1 && _oneCard.length == 2 && _threeCard.length == 0 && _twoCard.length == 0) {
                var fourdeal = this.getFourCard(fourCard, _fourCard[0]);
                if(fourdeal != null) {
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, 2);
                    if(onedeal != null) {
                        fourdeal[4] = onedeal[0];
                        fourdeal[5] = onedeal[1];
                        return fourdeal;
                    }
                }
            } else if(_fourCard.length == 1 && _twoCard.length == 1 && _threeCard.length == 0 && _oneCard.length == 0) {
                var fourdeal = this.getFourCard(fourCard, _fourCard[0]);
                if(fourdeal != null) {
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, 2);
                    if(onedeal != null) {
                        fourdeal[4] = onedeal[0];
                        fourdeal[5] = onedeal[1];
                        return fourdeal;
                    }
                }
            } else if(_fourCard.length == 1 && _twoCard.length == 2 && _threeCard.length == 0 && _oneCard.length == 0) {
                var fourdeal = this.getFourCard(fourCard, _fourCard[0]);
                if(fourdeal != null) {
                    var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, 0, 2);
                    if(twodeal != null) {
                        fourdeal[4] = fourdeal[5] = twodeal[0];
                        fourdeal[6] = fourdeal[7] = twodeal[2];
                        return fourdeal;
                    }
                }
            }
        }

        if(!boom) {
            for(var i = 0; i < fourCard.length; i++) {
                cc.log("boom fourCard="+fourCard[i]);
                lastCards[0] = lastCards[1] = lastCards[2] = lastCards[3] = fourCard[i];
                cc.log("lastCards[0]="+lastCards[0]);
                return lastCards;
            }
        }

        if(rocket) {
            lastCards[0] = 1000;
            lastCards[1] = 2000;
            return lastCards;
        }

        return new Array();
    },

    //! 提示
    //! handCards手牌
    //! stepCards上家出的牌,若上家是你自己或者你第一个出牌，stepCards传个长度为0的数组
    //! 注意函数内会改变handCards和stepCards，因此务必传入内存拷贝的数据。
    //! 返回一个数组,数组内没有花色
    //! 返回值是一个数组。。告诉你哪些牌被弹出来。。数组不带花色。。
    //! 比如弹出4个8.。数组是[8, 8, 8, 8]不是[81, 82, 83, 84]。
    tipsCard:function(handCards, stepCards) {//!
        for(var i = 0; i < handCards.length; i++) {
            if(handCards[i] == 1000 || handCards[i] == 2000) {
                continue;
            }
            handCards[i] = parseInt(handCards[i] / 10);
            if(handCards[i] == 1) {
                handCards[i] = 14;
            } else if(handCards[i] == 2) {
                handCards[i] = 20;
            }

        }
        cc.log("Tool--tipsCard="+handCards);
        handCards.sort(function(a, b){
            return a - b});

        for(var i = 0; i < stepCards.length; i++) {
            if(stepCards[i] == 1000 || stepCards[i] == 2000) {
                continue;
            }
            stepCards[i] = parseInt(stepCards[i] / 10);
            if(stepCards[i] == 1) {
                stepCards[i] = 14;
            } else if(stepCards[i] == 2) {
                stepCards[i] = 20;
            }
        }
        stepCards.sort(function(a, b){
            return a - b});
        cc.log("tips handCards="+handCards);
        cc.log("tips stepCards="+stepCards);

        return this.getLastCard(handCards, stepCards);
    },
});

gameclass.tool_cardType.create = function(){

    return new gameclass.tool_cardType();
}
/*
var cd = new gameclass.tool_cardType();
var res = cd.isHuoJian([100,200]);
cc.log( "fhz:" );
cc.log(  res);*/
var gameclass = gameclass || {};

gameclass.tool_wildcardType = gameclass.tool_cardType.extend({
    razznum:0,
    razz:0,
    currazz:[],
    ctor:function () {

    },
    build:function (cards) {

        var ar =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for(var x=0; x<cards.length;x++){
            var index = cards[x];
            if(index == 100){
                index = 13;
            }else if(index == 200){
                index = 14;
            }else {
                index -= 3;
            }

            ar[ index ]++;
        }
        return ar;
    },
    checkW:function(cardsArr,wildCard){
        //cc.log("出牌检测"+cardsArr);

        if(cardsArr.length < 1){
            return 0;
        }
        if(wildCard == 100 || wildCard == 200){
            return 0;
        }
        if(wildCard == 1 ){
            wildCard = 14;
        }
        if(wildCard == 2 ){
            wildCard = 15;
        }
        wildCard -= 3;
        if(wildCard < 0 || wildCard > 12){
            return 0;
        }
        var cards = this.build(cardsArr);

        var funcs = [
            this.isDanZhangW.bind(this),
            this.isDuiZiW.bind(this),
            this.isSanZhangW.bind(this),
            this.isZhaDanW.bind(this),
            this.isSanDaiYiW.bind(this),
            this.isSanDaiErW.bind(this),
            this.isLianDuiW.bind(this),
            this.isShunZiW.bind(this),
            this.isSiDaiErDanW.bind(this),
            this.isSiDaiErDuiW.bind(this),
            this.isFeiJiW.bind(this),
            this.isDanFeiW.bind(this),
            this.isShuangFeiW.bind(this),
            this.isHuoJianW.bind(this)
        ];
        var resArr = [];
        var res = 0;
        for(var i=0;i< funcs.length ; i++) {
            if(funcs[i]){
                res =  funcs[i](cards,cardsArr.length,wildCard);
                if(res){
                    resArr.push(res);
                }
            }
        }
        res = resArr.length > 0?resArr:0;
        /*cc.log("返回出牌类型");
          cc.log(res);*/
        return res;
    },

    transformToCardArr:function(res){
        //cc.log(res);
        var abscards = [];
        switch(res.type){
            case this.CARDTYPE.danzhang:
                for(var i = res.value;i <= res.value;i++){
                        abscards.push(i);
                }
                break;
            case this.CARDTYPE.duizi:
                for(var i = res.value;i <= res.value;i++){
                    for(var j =0;j<2;j++){
                        abscards.push(i);
                    }
                }
                break;
            case this.CARDTYPE.sanzhang:
                for(var i = res.value;i <= res.value;i++){
                    for(var j =0;j<3;j++){
                        abscards.push(i);
                    }
                }
                break;
            case this.CARDTYPE.zhadan:
                for(var i = res.value;i <= res.value;i++){
                    for(var j =0;j<4;j++){
                        abscards.push(i);
                    }
                }
                break;
            case this.CARDTYPE.sandaiyi:
                for(var i = res.value;i <= res.value;i++){
                    for(var j =0;j<3;j++){
                        abscards.push(i);
                        if(j == 2){
                            abscards.push(res.d1);
                        }
                    }
                }
                break;
            case this.CARDTYPE.sandaier:
                for(var i = res.value;i <= res.value;i++){
                    for(var j =0;j<3;j++){
                        abscards.push(i);
                        if(j == 2){
                            abscards.push(res.d1);
                            abscards.push(res.d1);
                        }
                    }
                }
                break;
            case this.CARDTYPE.liandui:
                for(var i = res.value.min;i <= res.value.max;i++){
                    for(var j =0;j<2;j++){
                        abscards.push(i);
                    }
                }
                break;
            case this.CARDTYPE.shunzi:
                for(var i = res.value.min;i <= res.value.max;i++){
                        abscards.push(i);
                }
                break;
            case this.CARDTYPE.sidaierdan:
                for(var i = res.value;i <= res.value;i++){
                    for(var j =0;j<4;j++){
                        abscards.push(i);
                        if(j == 3){
                            abscards.push(res.d1);
                            abscards.push(res.d2);
                        }
                    }

                }
                break;
            case this.CARDTYPE.sidaierdui:
                for(var i = res.value;i <= res.value;i++){
                    for(var j =0;j<4;j++){
                        abscards.push(i);
                        if(j == 3) {
                            abscards.push(res.d1);
                            abscards.push(res.d1);
                            abscards.push(res.d2);
                            abscards.push(res.d2);
                        }
                    }

                }
                break;
            case this.CARDTYPE.feiji:
                for(var i = res.value.min;i <= res.value.max;i++){
                    for(var j =0;j<3;j++){
                        abscards.push(i);
                    }
                }
                break;
            case this.CARDTYPE.danfei:
                for(var i = res.value.min;i <= res.value.max;i++){
                    for(var j =0;j<3;j++){
                        abscards.push(i);
                    }
                }
                for(var i = 0;i < res.d1.length;i++){
                        abscards.push(res.d1[i]);
                }
                break;
            case this.CARDTYPE.shuangfei:
                for(var i = res.value.min;i <= res.value.max;i++){
                    for(var j =0;j<3;j++){
                        abscards.push(i);
                    }
                }

                for(var i = 0;i < res.d2.length;i++){
                    for(var j = 0;j<2;j++){
                        abscards.push(res.d2[i]);
                    }
                }
                break;
            case this.CARDTYPE.huojian:
                abscards.push(1000);
                abscards.push(2000);
                break;
            default:
                break;
        }
        return abscards;
    },

    //------------压牌检测
    compareW:function(pressCards,befCards,wildCard,pressHasWild,befHasWild){
        cc.log("pressCards="+pressCards+"\nbefCards="+befCards+"\nwildCard="+wildCard+"\npressHasWild="+pressHasWild+"\nbefHasWild="+befHasWild);

        var befCards = this.check(befCards);//拿到上家的觉得牌型
        cc.log("---------------上家出的牌------------111");
        cc.log(befCards);
        if(befCards == 0){
            return 0;
        }

        var pressCards = this.checkW(pressCards,wildCard);
        cc.log("---------------压牌-----------------111");
        cc.log(pressCards);
        if(pressCards == 0){
            return 0;
        }

        var res = [];
        for (var i = 0; i < pressCards.length; i++) {
            for (var j = 0; j < pressCards[i].length; j++) {
                if (this.compareSize(pressCards[i][j], befCards, pressHasWild, befHasWild)) {
                    res.push(pressCards[i][j]);
                }
            }

        }

        var absRes = [];
        var arr = [];
        for(var i = 0;i<res.length;i++){
            var ff = false;
            for (var j = 0; j<arr.length; j++) {
                if (arr[j] == res[i].type) {
                    ff = true;
                    break;
                }
            }
            if (!ff) arr.push(res[i].type);
        }

        for(var j = 0; j<arr.length; j++){
            var ff = false;
            var xxx = [];
            for (var i = 0;i<res.length;i++) {
                if(arr[j] == res[i].type) {
                    xxx.push(res[i]);
                }
            }
            absRes.push(xxx);
        }
        cc.log(absRes);
        //cc.log(res);
        if(absRes.length > 0){
            return absRes;
        }
        return 0;
    },
    compareSize:function(res1,res2,_pressHasWild,_befHasWild){
        cc.log(res1,res2,_pressHasWild,_befHasWild);
        if(res1.type == this.CARDTYPE.huojian){
            return true;
        }
        if(res1.type == this.CARDTYPE.zhadan){
            if(res2.type != this.CARDTYPE.zhadan && res2.type != this.CARDTYPE.huojian ){
                return true;
            }else if(res2.type == this.CARDTYPE.zhadan){
                if(_pressHasWild == _befHasWild){//两个炸弹都是硬炸
                    return res1.value > res2.value;
                }else {
                    return !_pressHasWild;
                }
                //return _pressHasWild == _befHasWild?res1.value > res2.value:_befHasWild;
            }
        }
        if(res1.type != res2.type ){
            return false;
        }
        switch (res1.type){
            case this.CARDTYPE.danzhang:
            case this.CARDTYPE.duizi:
            case this.CARDTYPE.sanzhang:
            //case this.CARDTYPE.zhadan:
            case this.CARDTYPE.sandaiyi:
            case this.CARDTYPE.sandaier:
                if(res1.value > res2.value){
                    return true;
                }
                break;
            case this.CARDTYPE.liandui:
                if(res1.value.min > res2.value.min){
                    return true;
                }
                break;
            case this.CARDTYPE.shunzi:
                if( res1.value.count != res2.value.count)
                    return false;
                if(res1.value.min > res2.value.min){
                    return true;
                }
                break;
            case this.CARDTYPE.sidaierdan:
            case this.CARDTYPE.sidaierdui:
                if(res1.value > res2.value){
                    return true;
                }
                break;
            case this.CARDTYPE.feiji:
            case this.CARDTYPE.danfei:
            case this.CARDTYPE.shuangfei:
                if(res1.value.min > res2.value.min){
                    return true;
                }
                //return res1.value.min > res2.value.min? 1:-1;
                break;
            default:
                break;
        }
        return false;
    },

    //癞子玩法 匹配牌
    /**
     * 判断单牌
     */
    isDanZhangW:function (cards , size ) {
        if (size != 1) {
            return 0;
        }
        var arr = [];
        var res = this.isDanZhang(cards , size );

        if(res){
            arr.push(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },
    /**
     * 判断对子
     **/
    isDuiZiW:function (cards , size , wildCard) {
        if(size != 2){
            return 0;
        }
        if(cards[13] > 0 || cards[14] > 0){
            return 0;
        }
        var arr = [];
        var res = this.isDuiZi(cards , size );
        if(res){
            arr.push(res) ;
        }
        res = this.matchCard(cards,size,wildCard,this.isDuiZiW.bind(this) , this.isDuiZi.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;

    },
    /**
     * 判断是否三张
     **/
    isSanZhangW:function (cards , size,wildCard) {
        if(size != 3){
            return 0;
        }
        var arr = [];
        var res = this.isSanZhang(cards , size );
        if(res){
            arr.push(res) ;
        }

        /*var cpCards = cards.slice(0 , cards.length);
        if(cpCards[wildCard]){
            cpCards[wildCard]--;
            cc.log("cpCards[wildCard]"+cpCards[wildCard]+",wildCard="+wildCard);
            for (var j = 0; j < cpCards.length; j++) {
                if(j==wildCard){continue;}
                cc.log("j="+j);
                var tmpCards = cpCards.slice(0, cpCards.length);
                cc.log("cpCards="+cpCards);
                tmpCards[j]++;
                cc.log("tmpCards="+tmpCards);
                if(cpCards[wildCard] > 0){
                    cc.log("qqqq111");
                    res = this.isSanZhangW(tmpCards , size , wildCard);
                    cc.log("qqqq222");
                }else {
                    cc.log("qqqq333");
                    res = this.isSanZhang(tmpCards , size);
                    cc.log("qqqq444");
                }
                cc.log("qqqq555");
                if(res){return res;}
            }
        }*/
        res = this.matchCard(cards,size,wildCard,this.isSanZhangW.bind(this) , this.isSanZhang.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },

    /**
     * 判断炸弹
     **/
    isZhaDanW:function (cards,size,wildCard) {
        if(size != 4){
            return 0;
        }
        var arr = [];
        var res = this.isZhaDan(cards , size );
        if(res){
            arr.push(res) ;
            cc.log(arr);
        }
        res = this.matchCard(cards,size,wildCard,this.isZhaDanW.bind(this) , this.isZhaDan.bind(this));
        if(res){
            arr = arr.concat(res) ;
            cc.log(arr);
        }
        return arr.length > 0 ? arr : 0;
    },
    /**
     * 判断三带1
     **/
    isSanDaiYiW:function (cards , size,wildCard) {
        if(size != 4){
            return 0;
        }

        var arr = [];
        var res = this.isSanDaiYi(cards,size);
        if(res){
            arr.push(res) ;
        }
        res = this.matchCard(cards,size,wildCard,this.isSanDaiYiW.bind(this) , this.isSanDaiYi.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },
    /**
     * 判断三带2
     **/
    isSanDaiErW:function (cards , size , wildCard) {
        cc.log("isSanDaiErW");
        if(size != 5){
            return 0;
        }
        var arr = [];
        var res = this.isSanDaiEr(cards,size);
        if(res){
            arr.push(res) ;
        }
        res = this.matchCard(cards,size,wildCard, this.isSanDaiErW.bind(this) , this.isSanDaiEr.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },

    /*递归匹配牌型*/
    matchCard:function(cards,size,wildCard,func,func2){

        var res = 0;
        var resultArr = [];
        var cpCards = cards.slice(0 , cards.length);
        if(cpCards[wildCard]){
            cpCards[wildCard]--;
            for (var i = cpCards.length-3; i >= 0; i--) {
                if(i==wildCard){continue;}
                var tmpCards = cpCards.slice(0, cpCards.length);
                tmpCards[i]++;
                if(cpCards[wildCard] > 0){
                    res = func(tmpCards, size ,wildCard);
                }else {
                    res = func2(tmpCards, size );
                }
                if(res){
                    if( cc.isArray(res) ){

                        resultArr = resultArr.concat(res);
                    }else {
                        resultArr.push(res);
                    }
                }
            }
            return resultArr.length>0?resultArr:0;
        }

    },

    /**
     * 判断连队
     **/
    isLianDuiW:function (cards , size ,wildCard) {
        if(size < 5){
            return 0;
        }
        var arr = [];
        var res = this.isLianDui(cards,size);
        if(res){
            arr.push(res);
        }
        res = this.matchCard(cards,size,wildCard, this.isLianDuiW.bind(this) , this.isLianDui.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },
    /**
     * 判断顺子
     **/
    isShunZiW:function (cards , size,wildCard) {
        if(size < 5){
            return 0;
        }
        var arr = [];
        var res = this.isShunZi(cards,size);
        if(res){
            arr.push(res);
        }
        res = this.matchCard(cards,size,wildCard, this.isShunZiW.bind(this) , this.isShunZi.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },
    /*
     * 判断四带二单
     * */
    isSiDaiErDanW:function(cards , size ,wildCard){
        if(size != 6){
            return 0;
        }
        var arr = [];
        var res = this.isSiDaiErDan(cards,size);
        if(res){
            arr.push(res);
        }
        res = this.matchCard(cards,size,wildCard, this.isSiDaiErDanW.bind(this) , this.isSiDaiErDan.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },
    /*
     * 判断四带二对
     * */
    isSiDaiErDuiW:function(cards , size,wildCard){
        if(size != 8){
            return 0;
        }
        var arr = [];
        var res = this.isSiDaiErDui(cards,size);
        if(res){
            arr.push(res) ;
        }
        res = this.matchCard(cards,size,wildCard, this.isSiDaiErDuiW.bind(this) , this.isSiDaiErDui.bind(this));
        if(res){
            arr = arr.concat(res) ;

        }
        return arr.length > 0 ? arr : 0;
    },
    /**
     * 判断飞机
     **/
    isFeiJiW:function (cards , size, wildCard) {
        if(size < 6 || size > 18){
            return 0;
        }
        var arr = [];
        var res = this.isFeiJi(cards,size);
        if(res){
            arr.push(res) ;
        }
        res = this.matchCard(cards,size,wildCard, this.isFeiJiW.bind(this) , this.isFeiJi.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },
    /**
     * 判断飞机带单...
     **/
    isDanFeiW:function (cards , size, wildCard) {
        if(size < 8 ){
            return 0;
        }
        var arr = [];
        var res = this.isDanFei(cards,size);
        if(res){
            arr.push(res) ;
        }
        res = this.matchCard(cards,size,wildCard, this.isDanFeiW.bind(this) , this.isDanFei.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;
    },
    /**
     * 判断飞机带对...
     **/
    isShuangFeiW:function (cards , size ,wildCard) {
        if(size < 10 ){
            return 0;
        }
        var arr = [];
        var res = this.isShuangFei(cards,size);
        if(res){
            arr.push(res) ;
        }
        res = this.matchCard(cards,size,wildCard, this.isShuangFeiW.bind(this) , this.isShuangFei.bind(this));
        if(res){
            arr = arr.concat(res) ;
        }
        return arr.length > 0 ? arr : 0;

    },

    /**
     * 判断火箭
     **/
    isHuoJianW:function (cards , size) {
        if(size != 2){
            return 0;
        }
        var arr = [];
        var res = {};
        if(cards[cards.length - 1] == 1 && cards[cards.length - 2] == 1){
            res = {type:this.CARDTYPE.huojian};
            arr.push(res);
        }
        return arr.length > 0 ? arr : 0;
    },
    getCardTypeString:function(cardtype){
        var str = "";
        switch (cardtype){
            case this.CARDTYPE.danzhang:
                str = "单张";
                break;
            case this.CARDTYPE.duizi:
                str = "对子";
                break;
            case this.CARDTYPE.sanzhang:
                str = "三张";
                break;
            case this.CARDTYPE.zhadan:
                str = "炸弹";
                break;
            case this.CARDTYPE.sandaiyi:
            case this.CARDTYPE.sandaier:
                str = "三带一";
                break;
            case this.CARDTYPE.liandui:
                str = "连对";
                break;
            case this.CARDTYPE.shunzi:
                str = "顺子";
                break;
            case this.CARDTYPE.sidaierdan:
            case this.CARDTYPE.sidaierdui:
                str = "四带二";
                break;
            case this.CARDTYPE.feiji:
            case this.CARDTYPE.danfei:
            case this.CARDTYPE.shuangfei:
                str = "飞机";
                break;
            case this.CARDTYPE.huojian:
                break;
        }
        return str;
    },

    //! 得到一张牌
    getOneCard:function(oneCard, twoCard, threeCard, fourCard, card, num, sun) {
        if(num == null || num <= 0) {
            num = 1;
        }
        if(sun == null) {
            sun = false;
        }
        var outCards = [];

        for(var i = 0; i < oneCard.length; i++) {
            if(this.getRazzCard(oneCard[i], num == 1 ? 1 : 0) > card) {
                outCards[outCards.length] = oneCard[i];
                if(outCards.length >= num && !sun) {
                    return outCards;
                }
            }
        }

        for(var i = 0; i < twoCard.length; i++) {
            if(this.getRazzCard(twoCard[i], num == 1 ? 2 : 0) > card) {
                outCards[outCards.length] = twoCard[i];
                if(outCards.length >= num && !sun) {
                    return outCards;
                }
            }
        }

        for(var i = 0; i < threeCard.length; i++) {
            if(this.getRazzCard(threeCard[i], num == 1 ? 3 : 0) > card) {
                outCards[outCards.length] = threeCard[i];
                if(outCards.length >= num && !sun) {
                    return outCards;
                }
            }
        }

        if(sun) { //! 顺子拆炸弹
            for(var i = 0; i < fourCard.length; i++) {
                if(fourCard[i] > card) {
                    outCards[outCards.length] = fourCard[i];
                }
            }
        }

        if(sun && outCards.length >= num) {
            outCards.sort(function(a, b){
                return a - b});
            var index = -1;
            var find = true;
            for(var i = 0; i < outCards.length; i++) {
                find = true;
                for(var j = 1; j < num; j++) {
                    if(i + j >= outCards.length) {
                        find = false;
                        break;
                    }
                    if(outCards[i + j] - outCards[i + j - 1] != 1) {
                        find = false;
                        break;
                    }
                }
                if(find) {
                    index = i;
                    break;
                }
            }
            if(index == -1) {
                return null
            }
            var lastCards = [];
            for(var i = index; i < num + index; i++) {
                lastCards[i - index] = outCards[i];
            }
            return lastCards;
        }

        return null;
    },

    //! 得到两张牌
    getTwoCard:function(oneCard, twoCard, threeCard, fourCard, card, num, sun) {
        if(num == null || num <= 0) {
            num = 1;
        }
        if(sun == null) {
            sun = false;
        }
        var lastCards = [];

        for(var i = 0; i < twoCard.length; i++) {
            if(this.getRazzCard(twoCard[i], num == 1 ? 2 : 0) > card) {
                lastCards[lastCards.length] = twoCard[i];
                lastCards[lastCards.length] = twoCard[i];
                if(lastCards.length / 2 >= num && !sun) {
                    return lastCards;
                }
            }
        }

        for(var i = 0; i < threeCard.length; i++) {
            if (this.getRazzCard(threeCard[i], num == 1 ? 3 : 0) > card) {
                lastCards[lastCards.length] = threeCard[i];
                lastCards[lastCards.length] = threeCard[i];
                if(lastCards.length / 2 >= num && !sun) {
                    return lastCards;
                }
            }
        }

        if(sun) { //! 顺子拆炸弹
            for(var i = 0; i < fourCard.length; i++) {
                if (fourCard[i] > card) {
                    lastCards[lastCards.length] = fourCard[i];
                    lastCards[lastCards.length] = fourCard[i];
                }
            }
        }

        if(sun && lastCards.length >= num * 2) {
            lastCards.sort(function(a, b){
                return a - b});
            var index = -1;
            var find = true;
            for(var i = 0; i < lastCards.length; i+=2) {
                find = true;
                for(var j = 1; j < num; j++) {
                    if(i + j * 2 >= lastCards.length) {
                        find = false;
                        break;
                    }
                    if(lastCards[i + j * 2] - lastCards[i + (j - 1) * 2] != 1) {
                        find = false;
                        break;
                    }
                }
                if(find) {
                    index = i;
                    break;
                }
            }
            if(index == -1) {
                return null
            }
            var outCards = [];
            for(var i = index; i < num * 2 + index; i++) {
                outCards[i - index] = lastCards[i];
            }
            return outCards;
        }

        return null;
    },

    //! 得到三张牌
    getThreeCard:function(oneCard, twoCard, threeCard, fourCard, card, num, sun) {
        if(num == null || num <= 0) {
            num = 1;
        }
        if(sun == null) {
            sun = false;
        }
        var lastCards = [];

        for(var i = 0; i < threeCard.length; i++) {
            if (this.getRazzCard(threeCard[i], num == 1 ? 3 : 0) > card) {
                lastCards[lastCards.length] = threeCard[i];
                lastCards[lastCards.length] = threeCard[i];
                lastCards[lastCards.length] = threeCard[i];
                if(lastCards.length / 3 >= num && !sun) {
                    return lastCards;
                }
            }
        }

        if(sun) { //! 顺子拆炸弹
            for(var i = 0; i < fourCard.length; i++) {
                if (fourCard[i] > card) {
                    lastCards[lastCards.length] = fourCard[i];
                    lastCards[lastCards.length] = fourCard[i];
                    lastCards[lastCards.length] = fourCard[i];
                }
            }
        }

        if(sun && lastCards.length >= num * 3) {
            lastCards.sort(function(a, b){
                return a - b});
            var index = -1;
            var find = true;
            for(var i = 0; i < lastCards.length; i+=3) {
                find = true;
                for(var j = 1; j < num; j++) {
                    if(i + j * 3 >= lastCards.length) {
                        find = false;
                        break;
                    }
                    if(lastCards[i + j * 3] - lastCards[i + (j - 1) * 3] != 1) {
                        find = false;
                        break;
                    }
                }
                if(find) {
                    index = i;
                    break;
                }
            }
            if(index == -1) {
                return null
            }
            var outCards = [];
            for(var i = index; i < num * 3 + index; i++) {
                outCards[i - index] = lastCards[i];
            }
            return outCards;
        }

        return null;
    },

    //! 得到四张牌
    getFourCard:function(fourCard, card) {
        var lastCards = [];

        for(var i = 0; i < fourCard.length; i++) {
            if (this.getRazzCard(fourCard[i], 4) > card) {
                lastCards[0] = lastCards[1] = lastCards[2] = lastCards[3] = fourCard[i];
                return lastCards;
            }
        }

        return null;
    },

    //! 得到转化的牌
    getRazzCard:function(card, num) {
        if(num == 0) {
            return card;
        }
        if(this.currazz.length < num) {
            return card
        }
        for(var i = 0; i < this.currazz.length; i++) {
            if(this.currazz[i] == card) {
                num--;
                if(num <= 0) {
                    return this.razz
                }
            }
        }
        return card;
    },

    //! 得到可以出的牌
    getLastCard:function(handCards, stepCards, curRazz, stepRazz) {
        var lastCards = [];
        this.currazz = curRazz;
        //! 分析
        var oneCard = [];
        var twoCard = [];
        var threeCard = [];
        var fourCard = [];
        var rocket = this.analyseCard(handCards, oneCard, twoCard, threeCard, fourCard);
        var _oneCard = [];
        var _twoCard = [];
        var _threeCard = [];
        var _fourCard = [];
        var _rocket = this.analyseCard(stepCards, _oneCard, _twoCard, _threeCard, _fourCard);
        //! 没出牌
        if(stepCards.length == 0) {
            if(oneCard.length > 0) {
                lastCards[0] = oneCard[0];
                return lastCards;
            } else if(twoCard.length > 0) {
                lastCards[0] = lastCards[1] = twoCard[0];
                return lastCards;
            } else if(threeCard.length > 0) {
                lastCards[0] = lastCards[1] = lastCards[2] = threeCard[0];
                return lastCards;
            } else if(fourCard.length > 0) {
                lastCards[0] = lastCards[1] = lastCards[2] = lastCards[3] = fourCard[0];
                return lastCards;
            }
        }

        if(_rocket) {
            return lastCards
        }

        //! 单张
        if(stepCards.length == 1) {
            var deal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, stepCards[0]);
            if(deal != null) {
                return deal;
            }
        }

        //! 对子 和 双王
        if(stepCards.length == 2) {
            var deal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, stepCards[0]);
            if(deal != null) {
                return deal;
            }
        }

        //! 3张
        if(stepCards.length == 3) {
            var deal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, stepCards[0]);
            if(deal != null) {
                return deal;
            }
        }

        //! 4张
        var boom = false;
        if(stepCards.length == 4) {
            //! 炸弹
            if(stepCards[0] == stepCards[1] && stepCards[2] == stepCards[3] && stepCards[0] == stepCards[3]) {
                boom = true;
                if(stepRazz == 0) { //! 硬炸
                    var fourdeal = this.getFourCard(fourCard, stepCards[0])
                    if(fourdeal != null) {
                        if(curRazz.length == 0) {
                            return fourdeal;
                        }
                        if(fourdeal[0] == this.razz) {
                            return fourdeal;
                        }
                    }
                } else { //! 软炸
                    for(var i = 2; i <= 14; i++) {
                        var fourdeal = this.getFourCard(fourCard, i)
                        if(fourdeal == null) {
                            continue
                        }
                        if(fourdeal[0] == this.razz) {
                            return fourdeal;
                        }
                        if(fourdeal[0] > stepCards[0]) {
                            return fourdeal;
                        }
                        if(this.getRazzCard(fourdeal[0], 1) == fourdeal[0]) {
                            return fourdeal;
                        }
                    }
                }

                //cc.log(fourCard);
                //cc.log(stepCards[0]);

            } else {
                //! 3带1
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0]);
                if(threedeal != null) {
                    this.costCard(threeCard, threedeal, 3);
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0);
                    if(onedeal != null) {
                        threedeal[3] = onedeal[0];
                        return threedeal;
                    }
                }
            }
        }

        if(stepCards.length == 5) {
            if(_threeCard.length > 0 && _twoCard.length > 0) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0]);
                if(threedeal != null) {
                    this.costCard(threeCard, threedeal, 3);
                    var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, 0);
                    if(twodeal != null) {
                        threedeal[3] = threedeal[4] = twodeal[0];
                        return threedeal;
                    }
                }
            }
        }

        if(stepCards.length >= 5) {
            if(_oneCard.length == stepCards.length) { //! 顺子
                var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, _oneCard[0], _oneCard.length, true);
                if(onedeal != null) {
                    return onedeal;
                }
            } else if(_twoCard.length == stepCards.length / 2) {
                var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, _twoCard[0], _twoCard.length, true);
                if(twodeal != null) {
                    return twodeal;
                }
            } else if(_threeCard.length == stepCards.length / 3) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
                if(threedeal != null) {
                    return threedeal;
                }
            } else if(_fourCard.length == 0 && _threeCard.length == _oneCard.length && _twoCard.length == 0) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
                if(threedeal != null) {
                    this.costCard(threeCard, threedeal, 3);
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, _threeCard.length);
                    if(onedeal != null) {
                        for(var i = 0; i < onedeal.length; i++) {
                            threedeal[threedeal.length + i] = onedeal[i];
                        }
                        return threedeal;
                    }
                }
            } else if(_fourCard.length == 0 && _threeCard.length == _twoCard.length && _oneCard.length == 0) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
                if(threedeal != null) {
                    var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, 0, _threeCard.length);
                    if(twodeal != null) {
                        this.costCard(threeCard, threedeal, 3);
                        for(var i = 0; i < twodeal.length; i++) {
                            threedeal[threedeal.length + i] = twodeal[i];
                        }
                        return threedeal;
                    }
                }
            } else if(_fourCard.length == 0 && _threeCard.length == (_oneCard.length + _twoCard.length)) {
                var threedeal = this.getThreeCard(oneCard, twoCard, threeCard, fourCard, _threeCard[0], _threeCard.length, true);
                if(threedeal != null) {
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, _threeCard.length);
                    if(onedeal != null) {
                        this.costCard(threeCard, threedeal, 3);
                        for(var i = 0; i < onedeal.length; i++) {
                            threedeal[threedeal.length + i] = onedeal[i];
                        }
                        return threedeal;
                    }
                }
            }  else if(_fourCard.length == 1 && _oneCard.length == 2 && _threeCard.length == 0 && _twoCard.length == 0) {
                var fourdeal = this.getFourCard(fourCard, _fourCard[0]);
                if(fourdeal != null) {
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, 2);
                    if(onedeal != null) {
                        fourdeal[4] = onedeal[0];
                        fourdeal[5] = onedeal[1];
                        return fourdeal;
                    }
                }
            } else if(_fourCard.length == 1 && _twoCard.length == 1 && _threeCard.length == 0 && _oneCard.length == 0) {
                var fourdeal = this.getFourCard(fourCard, _fourCard[0]);
                if(fourdeal != null) {
                    var onedeal = this.getOneCard(oneCard, twoCard, threeCard, fourCard, 0, 2);
                    if(onedeal != null) {
                        fourdeal[4] = onedeal[0];
                        fourdeal[5] = onedeal[1];
                        return fourdeal;
                    }
                }
            } else if(_fourCard.length == 1 && _twoCard.length == 2 && _threeCard.length == 0 && _oneCard.length == 0) {
                var fourdeal = this.getFourCard(fourCard, _fourCard[0]);
                if(fourdeal != null) {
                    var twodeal = this.getTwoCard(oneCard, twoCard, threeCard, fourCard, 0, 2);
                    if(twodeal != null) {
                        fourdeal[4] = fourdeal[5] = twodeal[0];
                        fourdeal[6] = fourdeal[7] = twodeal[2];
                        return fourdeal;
                    }
                }
            }
        }

        if(!boom) {
            for(var i = 0; i < fourCard.length; i++) {
                cc.log("boom fourCard="+fourCard[i]);
                lastCards[0] = lastCards[1] = lastCards[2] = lastCards[3] = fourCard[i];
                cc.log("lastCards[0]="+lastCards[0]);
                return lastCards;
            }
        }

        if(rocket) {
            lastCards[0] = 1000;
            lastCards[1] = 2000;
            return lastCards;
        }

        return new Array();
    },

    //! 将手牌复制并放入癞子
    getHandCards:function(handCards, card) {
        var outCards = [];
        for(var i = 0; i < handCards.length; i++) {
            outCards[i] = handCards[i];
        }
        if(card != null) {
            outCards[outCards.length] = card;
            outCards.sort(function(a, b){
                return a - b});
        }

        return outCards;
    },

    getCurRazz:function(currazz, card) {
        var outCards = [];
        for(var i = 0; i < currazz.length; i++) {
            outCards[i] = currazz[i];
        }
        outCards[outCards.length] = card;

        return outCards;
    },

    //! 递归尝试放入癞子
    getOutCards:function(handCards, stepCards, razznum, steprazz, currazz) {
        razznum--;
        for(var i = 3; i <= 14; i++) {
            var outCard = this.getHandCards(handCards, i);
            var curRazz = this.getCurRazz(currazz, i);
            if(razznum == 0) {
                var lastCard = this.getLastCard(outCard, stepCards, curRazz, steprazz);
                if(lastCard.length > 0) {
                    return lastCard;
                }
            } else {
                var lastCard = this.getOutCards(outCard, stepCards, razznum, steprazz, curRazz);
                if(lastCard != null && lastCard.length > 0) {
                    return lastCard;
                }
            }
        }
        var outCard = this.getHandCards(handCards, 20);
        var curRazz = this.getCurRazz(currazz, 20);
        if(razznum == 0) {
            var lastCard = this.getLastCard(outCard, stepCards, curRazz, steprazz);
            if(lastCard.length > 0) {
                return lastCard;
            }
        } else {
            var lastCard = this.getOutCards(outCard, stepCards, razznum, steprazz, curRazz);
            if(lastCard != null && lastCard.length > 0) {
                return lastCard;
            }
        }
        return null;
    },

    //! 将最后的牌转成有癞子的牌
    transformLastCard:function(handCards, lastCard, abscards) {
        for(var i = 0; i < lastCard.length; i++) {
            abscards[i] = lastCard[i];
            var find = false;
            for(var j = 0; j < handCards.length; j++) {
                if(handCards[j] == lastCard[i]) {
                    handCards.splice(j, 1);
                    find = true;
                    break;
                }
            }
            if(!find) {
                lastCard[i] = this.razz;
            }
        }
        return lastCard;
    },

    //! 提示
    //! handCards手牌
    //! stepCards上家出的牌,若上家是你自己或者你第一个出牌，stepCards传个长度为0的数组,请传绝对牌型
    //! razz为癞子,癞不要传花色
    //! stepRazz为上家的癞子,若无癞子传0,有癞子传非0即可,主要用以判断软炸
    //! 注意函数内会改变handCards和stepCards，因此务必传入内存拷贝的数据。
    //! 返回一个数组,数组内没有花色
    //! 返回值是一个数组。。告诉你哪些牌被弹出来。。数组不带花色。。
    //! 比如弹出4个8.。数组是[8, 8, 8, 8]不是[81, 82, 83, 84]。
    //! 返回绝对牌型
    tipsCard:function(handCards, stepCards, stepRazz, razz, abscards) {//!
        if(razz == 1) {
            this.razz = 14;
        } else if(razz == 2) {
            this.razz = 20;
        } else {
            this.razz = razz;
        }
        //! 癞子数量
        this.razznum = 0;

        for(var i = 0; i < handCards.length;) {
            if(handCards[i] == 1000 || handCards[i] == 2000) {
                i++;
                continue;
            }
            handCards[i] = parseInt(handCards[i] / 10);
            if(handCards[i] == 1) {
                handCards[i] = 14;
            } else if(handCards[i] == 2) {
                handCards[i] = 20;
            }

            if(handCards[i] == this.razz) {
                handCards.splice(i, 1);
                this.razznum++;
            } else {
                i++;
            }
        }
        cc.log("Tool--tipsCard="+handCards);
        handCards.sort(function(a, b){
            return a - b});

        for(var i = 0; i < stepCards.length; i++) {
            if(stepCards[i] == 1000 || stepCards[i] == 2000) {
                continue;
            }
            stepCards[i] = parseInt(stepCards[i] / 10);
            if(stepCards[i] == 1) {
                stepCards[i] = 14;
            } else if(stepCards[i] == 2) {
                stepCards[i] = 20;
            }
        }
        stepCards.sort(function(a, b){
            return a - b});

        var nblastCard = this.getLastCard(this.getHandCards(handCards), stepCards, [], stepRazz);
        if(nblastCard.length == 2 && nblastCard[0] == 1000 && nblastCard[1] == 2000) { //! 火箭

        } else if(nblastCard.length == 4 && nblastCard[0] == nblastCard[1] && nblastCard[0] == nblastCard[2] && nblastCard[0] == nblastCard[3]) { //! 硬炸

        } else if(nblastCard.length > 0) { //! 不是火箭和硬炸
            for(var i = 0; i < nblastCard.length; i++) {
                abscards[i] = nblastCard[i];
            }
            return nblastCard;
        }

        if(this.razznum > 0) {
            var lastCard = this.getOutCards(handCards, stepCards, 1, stepRazz, []);
            if(lastCard != null) {
                return this.transformLastCard(handCards, lastCard, abscards);
            }
            this.razznum--;
        }

        if(this.razznum > 0) {
            var lastCard = this.getOutCards(handCards, stepCards, 2, stepRazz, []);
            if(lastCard != null) {
                return this.transformLastCard(handCards, lastCard, abscards);
            }
            this.razznum--;
        }

        if(this.razznum > 0) {
            var lastCard = this.getOutCards(handCards, stepCards, 3, stepRazz, []);
            if(lastCard != null) {
                return this.transformLastCard(handCards, lastCard, abscards);
            }
            this.razznum--;
        }

        if(this.razznum > 0) {
            var lastCard = this.getOutCards(handCards, stepCards, 4, stepRazz, []);
            if(lastCard != null) {
                return this.transformLastCard(handCards, lastCard, abscards);
            }
            this.razznum--;
        }

        if(nblastCard.length > 0) { //! 不是火箭和硬炸
            for(var i = 0; i < nblastCard.length; i++) {
                abscards[i] = nblastCard[i];
            }
            return nblastCard;
        }

        return new Array();
    },
});

gameclass.tool_wildcardType.create = function(){

    return new gameclass.tool_wildcardType();
}
/*
var cd = new gameclass.tool_cardType();
var res = cd.isHuoJian([100,200]);
cc.log( "fhz:" );
cc.log(  res);*/
/**
 * 按钮控制器
 * @type {Function}
 */
gameclass.baseButtonControl = cc.Class.extend({
    _btnNode: null,
    _normalChildArr: null,
    _selectChildArr: null,
    _isSelect:false,
    /**
     * 构造函数
     * @param $btnNode 按钮node
     * @param $normalChildArr 按钮node中正常状态下待处理的孩子名列表
     * @param $selectChildArr 按钮node中按下状态下待处理的孩子名列表
     */
    ctor: function ($btnNode, $normalChildArr, $selectChildArr) {
        // this._super();

        this._btnNode = $btnNode;
        this._normalChildArr = $normalChildArr;
        this._selectChildArr = $selectChildArr;
        this._isSelect = false;
    },
    /**
     * 根据选中状态，处理所有孩子的显示状态
     * @param isSelect 是否选中
     */
    setSelect: function (isSelect) {
        this._isSelect = isSelect;
        var normalLen = this._normalChildArr.length;
        for(var i = 0;i<normalLen;i++){
            var child = this._btnNode.getChildByName(this._normalChildArr[i]);
            if(!child)continue;
            child.setVisible(!isSelect);
        }
        var selectLen = this._selectChildArr.length;
        for(var i = 0;i<selectLen;i++){
            var child = this._btnNode.getChildByName(this._selectChildArr[i]);
            if(!child)continue;
            child.setVisible(isSelect);
        }
    },
    destroy:function () {
        this._btnNode = null;
        this._normalChildArr = null;
        this._selectChildArr = null;
        this._isSelect = false;
    }
});
/**
 * tab按钮组控制器
 * @type {Function}
 */
gameclass.buttonGroupControl = cc.Class.extend({
    _callback:null,
    _btnControlArr: null,
    _selectIndex:0,
    //按钮点击事件名
    _BTN_CLICK:"BTN_CLICK",
    ctor: function (callback) {
        this._callback = callback;
    },
    initListen: function () {
        if (!this._btnControlArr) return;

        var len = this._btnControlArr.length;
        for (var i = 0; i < len; i++) {
            var btnControl = this._btnControlArr[i];
            var btn = btnControl._btnNode;
            btn.addTouchEventListener(this.btnClickHandle.bind(this));
        }
    },
    initData: function ($btnControlArr) {
        this._btnControlArr = $btnControlArr;

        this.initListen();
    },
    setSelectIndex:function (index) {
        this._selectIndex = index;
        this.updateSelect();
    },
    updateSelect:function () {
        var len = this._btnControlArr.length;
        for (var i = 0; i < len; i++) {
            var btnControl = this._btnControlArr[i];
            var btn = btnControl._btnNode;
            if(i === this._selectIndex){
                btnControl.setSelect(true);
            }else{
                btnControl.setSelect(false);
            }
        }
    },
    btnClickHandle: function (sender, type) {
        if(type != ccui.Widget.TOUCH_ENDED)return;
        var len = this._btnControlArr.length;
        for (var i = 0; i < len; i++) {
            var btnControl = this._btnControlArr[i];
            var btn = btnControl._btnNode;
            if(btn === sender && !btnControl._isSelect){
                this.setSelectIndex(i);
                if(this._callback){
                    this._callback(i);
                }else{
                    cc.eventManager.dispatchCustomEvent(this._BTN_CLICK, {index:i});
                }
                break;
            }
        }
    },
    destroy: function () {
        this._btnControlArr = null;
    }
});
gameclass.buttonGroupControl.prototype.switchBtnControl = function(btnArr, normalArr, selectArr){
    var btnControlArr = [];
    var len = btnArr.length;
    for(var i = 0;i<len;i++){
        var btnControl = new gameclass.baseButtonControl(btnArr[i], normalArr, selectArr);
        btnControlArr.push(btnControl);
    }
    return btnControlArr;
}
gameclass.buttonGroupControl.prototype.createStand = function(parent, len){
    var btnControlArr = [];
    for(var i = 0;i<len;i++){
        var btn = parent.getChildByName("btn"+i);
        btnControlArr.push(new gameclass.baseButtonControl(btn, ["normal"], ["select"]));
    }
    this.initData(btnControlArr);
}
/**
 * 设置数值面板控制器，构造函数中传入的node的孩子命名必须规范，参考wzqSetScore
 * @type {Function}
 */
gameclass.numSetSimpleCtr = cc.Class.extend({
    _node: null,
    //显示的数值是否是图片，如果否，则是文本
    _isImgShow: false,
    //可输入长度
    _maxLen: -1,
    //重置按钮
    _resetBtn: null,
    //删除按钮
    _delBtn: null,
    //已选数字列表
    _numArr: null,
    //当前待填数字索引
    _curFillIndex: -1,
    //0-9按钮列表
    _numBtnArr: null,
    //显示的数值背景列表
    _numBgArr: null,
    //显示的数值容器
    _numShowContain: null,
    //控制层
    _operateLayer: null,
    //关闭事件名
    _EVENT_CLOSE: gameclass.NUMSET_CLOSE_DEFAULT,
    //确认事件名
    _EVENT_OK: gameclass.NUMSET_OK_DEFAULT,
    //已填满事件名
    _EVENT_FULL: gameclass.NUMSET_FULL_DEFAULT,
    //填满了数字回调
    _fillFullCallback: null,
    ctor: function (node, isImgShow, maxLen) {
        this._node = node;
        this._isImgShow = isImgShow;
        this._maxLen = maxLen;
        this.init();
        this.initView();
        this.initListen();
        this.initialize();
    },
    init: function () {
        if (!this._maxLen) {
            this._maxLen = gameclass.numSetControl.defaultMaxLen;
        }
        this._curFillIndex = 0;

        this._operateLayer = this._node.getChildByName("operateLayer");
        var dynamicLayer = this._node.getChildByName("dynamicLayer");
        this.staticLayer = this._node.getChildByName("staticLayer");

        this._resetBtn = this._operateLayer.getChildByName("cs");
        this._delBtn = this._operateLayer.getChildByName("sc");

        this._numShowContain = new ccui.Layout();
        this._numBgArr = new Array(this._maxLen);
        this._numArr = new Array(this._maxLen);
        this._numBtnArr = new Array(10);
        var btn;
        for (var i = 0; i < 10; i++) {
            btn = this._operateLayer.getChildByName("btn" + i);
            this._numBtnArr[i] = btn;
        }
        for (var i = 0; i < this._maxLen; i++) {
            this._numArr[i] = "";
        }
    },
    initView: function () {
        this._node.addChild(this._numShowContain);

        var numShowChild;
        for (var i = 0; i < this._maxLen; i++) {
            this._numBgArr[i] = this.staticLayer.getChildByName("num" + i);
            if (this._isImgShow) {
                numShowChild = new cc.Sprite();
            } else {
                numShowChild = new ccui.Text();
            }
            this._numShowContain.addChild(numShowChild);
        }
    },
    initListen: function () {
        var len = this._numBtnArr.length;
        for (var i = 0; i < len; i++) {
            this._numBtnArr[i].addTouchEventListener(this.clickNumHandle, this);
        }
        this._resetBtn.addTouchEventListener(this.clickResetHandle, this);
        this._delBtn.addTouchEventListener(this.clickDelHandle, this);
    },
    initialize: function () {

    },
    clickNumHandle: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;

        var name = sender.getName();
        this.updateNext(name.substr(3, name.length - 1));
    },
    updateNext: function (num) {
        if (this._curFillIndex >= this._maxLen) return;

        if (this._curFillIndex < 0) {
            this._curFillIndex = 0;
        }

        this.updateNumChild(this._curFillIndex, num);

        this._curFillIndex++;

        if (this._curFillIndex >= this._maxLen) {
            if(this._fillFullCallback){
                this._fillFullCallback(this.getNumber());
            }else{
                cc.eventManager.dispatchCustomEvent(this._EVENT_FULL, {number: this.getNumber()});
            }
        }
    },
    clickResetHandle: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;

        this.resetNumber();
    },
    clickDelHandle: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;

        if (this._curFillIndex <= 0) return;

        this.updateNumChild(this._curFillIndex - 1, -1);

        this._curFillIndex--;
    },
    getNumber: function () {
        var str = "";
        for (var i = 0; i < this._maxLen; i++) {
            str += this._numArr[i];
        }
        if (str == "") return 0;
        // cc.log("str=="+str);
        var number = parseInt(str);
        // cc.log("number=="+number);

        if (number == 0) return 0;

        return number;
    },
    updateNumChild: function (index, num) {
        if (!this._numShowContain) return;
        var numShowChild = this._numShowContain.getChildren()[index];
        if (num < 0) {
            this._numArr[index] = "";
            if (this._isImgShow) {
                numShowChild.setTextureRect(cc.rect(0, 0, 0, 0));
            } else {
                numShowChild.setString("");
            }
        } else {
            this._numArr[index] = num;
            if (this._isImgShow) {
                numShowChild.setTexture(res["wzqNum" + num]);
            } else {
                numShowChild.setString(num.toString());
            }
        }

        numShowChild.setPosition(this._numBgArr[index].getPosition());
    },
    destroy:function () {
        this._node = null;
        this._resetBtn = null;
        this._delBtn = null;
        this._numArr = null;
        this._numBtnArr = null;
        this._numBgArr = null;
        this._numShowContain = null;
        this._operateLayer = null;
        this._fillFullCallback = null;
    }
});
gameclass.numSetSimpleCtr.prototype.resetNumber = function () {
    for (var i = 0; i < this._maxLen; i++) {
        this.updateNumChild(i, -1);
    }
    this._curFillIndex = 0;
};
/**
 * 设置数值面板控制器，构造函数中传入的node的孩子命名必须规范，参考wzqSetScore
 * @type {Function}
 */
gameclass.numSetControl = gameclass.numSetSimpleCtr.extend({
    //关闭按钮
    _closeBtn: null,
    //确定按钮
    _okBtn: null,
    //确定按钮回调
    _okBtnCallback: null,
    ctor: function (node, isImgShow, maxLen) {
        this._super(node, isImgShow, maxLen);
    },
    init: function () {
        this._super();
        this._okBtn = this._operateLayer.getChildByName("okBtn");
        this._closeBtn = this._operateLayer.getChildByName("backBtn");
    },
    initListen: function () {
        this._super();
        this._closeBtn.addTouchEventListener(this.clickCloseHandle, this);
        this._okBtn.addTouchEventListener(this.clickOkHandle, this);
    },
    clickCloseHandle: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;

        cc.eventManager.dispatchCustomEvent(this._EVENT_CLOSE, {});
    },
    clickOkHandle: function (sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;

        if(this._okBtnCallback){
            this._okBtnCallback(this.getNumber());
        }else{
            cc.eventManager.dispatchCustomEvent(this._EVENT_OK, {number: this.getNumber()});
        }
    },
});
/**
 * 默认最大长度
 * @type {number}
 */
gameclass.numSetControl.defaultMaxLen = 6;
/**
 * 关闭默认事件名
 * @type {string}
 */
gameclass.NUMSET_CLOSE_DEFAULT = "gameclass.NUMSET_CLOSE_DEFAULT";
/**
 * 确认默认事件名
 * @type {string}
 */
gameclass.NUMSET_OK_DEFAULT = "gameclass.NUMSET_OK_DEFAULT";
/**
 * 已填满默认事件名
 * @type {string}
 */
gameclass.NUMSET_FULL_DEFAULT = "gameclass.NUMSET_FULL_DEFAULT";
var staticFunction = staticFunction || {};

/**
 * 获取本地缓存，待写入缓存时使用
 */
staticFunction.getStorages = function (storageKey) {
    var localStr = cc.sys.localStorage.getItem(storageKey);
    if (localStr) {
        var obj = JSON.parse(localStr);
        return obj;
    }
    return {};
};
/**
 * 获取本地缓存
 */
staticFunction.getStorage = function (storageKey, key) {
    var localStr = cc.sys.localStorage.getItem(storageKey);
    if (localStr) {
        var obj = JSON.parse(localStr);
        if (obj[key] || obj[key] == 0) {
            return obj[key];
        }
    }
    return null;
};
/**
 * 写入本地缓存
 */
staticFunction.setStorages = function (storageKey, ob) {
    cc.sys.localStorage.setItem(storageKey, JSON.stringify(ob));
};
/**
 * 写入本地缓存
 */
staticFunction.setStorage = function (storageKey, key, value) {
    var obj = staticFunction.getStorages(storageKey);
    obj[key] = value;
    staticFunction.setStorages(storageKey, obj);
};
/**
 * 根据格林威治时间获取标准显示时间
 * @param date
 */
staticFunction.getStandardTime = function (date) {
    var d = new Date(date * 1000);
    var hour = d.getHours();
    if (hour < 10) hour = "0" + hour;
    var min = d.getMinutes();
    if (min < 10) min = "0" + min;
    var sec = d.getSeconds();
    if (sec < 10) sec = "0" + sec;
    var date = (d.getFullYear()) + "-" +
        (d.getMonth() + 1) + "-" +
        (d.getDate()) + " " +
        hour + ":" +
        min + ":" +
        sec;
    return date;
};



var shareKey = "e32c36ea311bff152efc73508b6fd8f8";

var RequestURL = function (url,func) {
	var xhr = cc.loader.getXMLHttpRequest();

	xhr.open("GET", url);
	//set Content-type "text/plain;charset=UTF-8" to post plain text
	//xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");

	xhr.onreadystatechange = function () {

		if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
			var httpStatus = xhr.statusText;

			func(xhr.responseText);
		}
	};
	xhr.send();
}

var PostURL = function (url,data,func,otherdata,errorhandle) {
	var xhr = cc.loader.getXMLHttpRequest();
	xhr.open("POST", url);

	cc.log("postUrl,url=="+url)

	//set Content-type "text/plain;charset=UTF-8" to post plain text
	//xhr.setRequestHeader("Content-Type","text/plain");
	xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
	//xhr.responseType = "arraybuffer";
	xhr.otherdata = otherdata;
	xhr.onreadystatechange = function () {
		if(xhr.status == 200) {
			if(xhr.readyState == 4) {
				var httpStatus = xhr.statusText;
				var buffer = xhr.response;

				func(buffer, xhr.otherdata);
			}
		} else {
			cc.log("PostURL error");
			if(errorhandle != null)
				errorhandle(xhr.otherdata);
		}
	};

	xhr.send(data);

}

var PostURLPHP = function (url,data,func,otherdata,errorhandle) {
	var xhr = cc.loader.getXMLHttpRequest();
	//cc.log(url);
	xhr.open("POST", url);
	//set Content-type "text/plain;charset=UTF-8" to post plain text
	//xhr.setRequestHeader("Content-Type","text/plain");
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//xhr.responseType = "arraybuffer";
	xhr.otherdata = otherdata;
	xhr.onreadystatechange = function () {

		if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
			var httpStatus = xhr.statusText;
			var buffer = xhr.response;

			func(buffer, xhr.otherdata);

		}else{
			//func(out.join(''), xhr.otherdata);
			cc.log("PostURL error");
			if(errorhandle != null)
				errorhandle(xhr.otherdata);
		}
	};

	xhr.send(data);

}



var getwebsocket = function(url,openfunc,onmsgfunc,onerrorfunc,onclosefunc){
    this._wsiError = null;
    //if (!cc.sys.isNative) {
        this._wsiError = new WebSocket(url);
    /*}else{
        this._wsiError = new MySocket(url);
    }*/
    this._wsiError.binaryType = "arraybuffer";
    var _ws = this._wsiError;
    this._wsiError.onopen = function(evt) {
        cc.log("open");

        /*var data = JSON.parse("{\"uid\":513297,\"pground\":1,\"bid\":4}");
        senddata = getdatapacket(RoomCommand.CLIENT_ROOM_LOGIN,data);
        _ws.send(senddata.buffer);*/

        if (openfunc != null) {
            openfunc(evt,_ws);
        }

    };
    this._wsiError.onmessage = function(evt) {

        var b64 = new Base64();
        //cc.log("onmessage    " + b64.decode(evt.data));
        if (onmsgfunc != null) {
            onmsgfunc(evt,_ws,//evt.data);
                b64.decode(evt.data));
        }
    };
    this._wsiError.onerror = function(evt) {
        cc.log("Error was fired");
        //self._errorStatus.setString("an error was fired");
        if (onerrorfunc != null) {
            onerrorfunc(evt,_ws);
        }
    };
    this._wsiError.onclose = function(evt) {
        cc.log("_wsiError websocket instance closed.");
        //self._wsiError = null;
        if (onclosefunc != null) {
            onclosefunc(evt,_ws);
        }
    };

    return  this._wsiError;
};

var wsSendData = function (ws,cmd,data,isu8arr) {
    var senddata = getdatapacket(cmd,data,isu8arr);
    ws.send(senddata.buffer);
};
/**
 * Created by yang on 2016/11/10.
 */

gameclass.websocket = cc.Class.extend({
    url:null,
    openfunc:null,
    onmsgfunc:null,
    onerrorfunc:null,
    onclosefunc:null,
    onpingfunc:null,
    ws:null,
    curservrtime:null,
    curclienttime:null,
    game:null,
    ctor: function () {
        this.curservrtime = 0;
        this.curclienttime = 0;
    },setgame:function(_game){
        this.game = _game;
    }
});

gameclass.websocket.prototype.getcurservertime = function(){
    return this.curservrtime + (Math.floor(new Date().getTime()/1000) - this.curclienttime);
};

gameclass.websocket.prototype.close = function(){
    this.ws.close();
};

gameclass.websocket.prototype.init = function(url,openfunc,onmsgfunc,onerrorfunc,onclosefunc,onpingfunc){
    this.url = url;
    this.openfunc = openfunc;
    this.onmsgfunc = onmsgfunc;
    this.onerrorfunc = onerrorfunc;
    this.onclosefunc = onclosefunc;
    this.onpingfunc = onpingfunc;

    this.ws = null;
    //if (!cc.sys.isNative) {
    this.ws = new WebSocket(this.url);
    /*}else{
     this._wsiError = new MySocket(url);
     }*/
    this.ws.binaryType = "arraybuffer";
    var _this = this;
    this.ws.onopen = function(evt) {
        cc.log("websocket open...");
        if (_this.openfunc != null) {
            _this.openfunc(_this,evt);
        }
    };
    this.ws.onmessage = function(evt) {
        //cc.log("onmessage");
        if (_this.onmsgfunc != null) {
            var u8a = new Uint8Array(evt.data);
            var str = Bytes2Str(u8a);
            //cc.log(str);

            var recvdata = JSON.parse(str);

            var msgsign = JSON.parse(recvdata.msgsign);

            _this.curservrtime = msgsign.time;
            _this.curclienttime = Math.floor(new Date().getTime()/1000);

            if(msgsign.encode && msgsign.encode == 1) {
                var data = new Uint8Array(BASE64.decoder(recvdata.msgdata));
                recvdata.msgdata = Bytes2Str(pako.inflate(data));
            }
            //cc.log("getMsg-----socket----->" + recvdata.msgdata);
            if(recvdata.msghead != "gameping"){
                //cc.log(recvdata.msgdata.toString());
                //cc.log(recvdata);
                //cc.log("====================");
                //cc.log(recvdata.msgdata.toString());
            }

            if (recvdata.msghead == "err"){
                var data = JSON.parse(recvdata.msgdata);
                if(data.info.length > 0) {
                    _this.game.uimgr.closeui("gameclass.inputcode2");
                    _this.game.uimgr.showui("gameclass.msgboxui");
                    if(data.info == "您的金币不足，请前往充值。") {
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString(data.info, function () {
                            _this.game.uimgr.showui("gameclass.goldShop");
                        });
                    } else {
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString(data.info);
                    }
                }
            } else if(recvdata.msghead == "warning") {
                var data = JSON.parse(recvdata.msgdata);
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString(data.info, function () {
                });
            } else if(recvdata.msghead == "updcard") {
                var data = JSON.parse(recvdata.msgdata);
                // cc.log(data);
                _this.game.modmgr.mod_login.setLoginData(data.card - data.gold, data.gold)
            } else if(recvdata.msghead == "gameping") {
                if(_this.onpingfunc != null) {
                    recvdata.msgdata = JSON.parse(recvdata.msgdata);
                    _this.onpingfunc(_this, recvdata);
                }
            } else {
                recvdata.msgdata = JSON.parse(recvdata.msgdata);
                _this.onmsgfunc(_this, recvdata);
            }
        }
    };
    this.ws.onerror = function(evt) {
        cc.log("websocket Error was fired");
        //self._errorStatus.setString("an error was fired");
        if (_this.onerrorfunc != null) {
            _this.onerrorfunc(_this,evt,_this.ws);
        }
    };
    this.ws.onclose = function(evt) {
        cc.log("_wsiError websocket instance closed.");
        //self._wsiError = null;
        if (_this.onclosefunc != null) {
            _this.onclosefunc(_this,evt);
        }
    };
    return  this;
};

gameclass.websocket.prototype.setonmsgfunc = function (onmsgfunc) {
    this.onmsgfunc = onmsgfunc;
};

gameclass.websocket.prototype._send = function (str) {
    this.ws.send(str);
};


gameclass.websocket.prototype.send = function (head,data) {
    var response ={"msghead":head,"msgdata":JSON.stringify(data)};
    var jsonData = JSON.stringify(response);
    cc.log("sendMsg--------->" + jsonData);
    this._send(jsonData);
};

gameclass.newwebsocket = function(_game,url,preinit,openfunc,onmsgfunc,onerrorfunc,onclosefunc,onpingfunc){
    cc.log("create socket ip=============" + url);
    var websocket =  new gameclass.websocket;
    websocket.setgame(_game);

    if (preinit != null){
        preinit(websocket);
    }
    websocket.init(url,openfunc,onmsgfunc,onerrorfunc,onclosefunc,onpingfunc);
    return websocket;
}
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


/**
 * Created by yang on 2016/11/18.
 */

gameclass.mod_userbase = gameclass.mod_base.extend({
    userbase:null,    //! uid, money, gem, charm
    ctor:function () {
    }
});

gameclass.mod_userbase.prototype.setData = function(data) {
    this.userbase = data;
};
/**
 * Created by yang on 2016/11/9.
 */



gameclass.mod_login = gameclass.mod_base.extend({
    data: null,
    logindata: null,
    roomdata: null,
    islogin: null,
    ctor: function () {
        this.islogin = false;
    }
});

gameclass.mod_login.prototype.getserverver = function (func) {

    var data = {};
    var _this = this;
    this.getver("", data, function (retdata, temp, recvdata) {
        func(retdata)
    });
}
/**
 * 设置登录数据
 * @param openid
 */
gameclass.mod_login.prototype.setLoginData = function (card, gold) {
    this.logindata.card = card;
    this.logindata.gold = gold;
    if (this.logindata.card < 0) {
        this.logindata.card = 0;
    }
    if (this.logindata.gold < 0) {
        this.logindata.gold = 0;
    }

    this.game.uimgr.updateUIMsg("updcard");
};

//是否显示招募信息
gameclass.mod_login.prototype.isOpenInvite = function () {
    var date = new Date();
    var curDay = Number(date.Format("dd"));
    var openInvite = false;
    if (!cc.sys.localStorage.getItem("loginDay")) {
        openInvite = true;
    } else {
        var data = cc.sys.localStorage.getItem("loginDay");
        var lastLoginDay = JSON.parse(data).day;
        if (curDay != lastLoginDay) {
            openInvite = true;
        } else {
            openInvite = false;
        }
    }
    cc.sys.localStorage.setItem("loginDay", JSON.stringify({"day": curDay}));
    return openInvite;
};

gameclass.mod_login.prototype.getTokey = function (func) {
    this.sendhttp('createtoken', {"uid": this.logindata.uid, "unionid":mod_userdefault.globaldata.code}, function (retdata, temp, recvdata) {
        cc.log(retdata);
        if (retdata.token) {
            if (func) func(retdata.token);
        }
    });
};

//获取金币场游戏人数
gameclass.mod_login.prototype.getGoldGameNum = function (func) {
    this.sendhttp('getgamenum', {}, function (retdata, temp, recvdata) {
        if (func) {
            func(retdata);
        }
    });
};

gameclass.mod_login.prototype.guestlogin = function (openid) {
    cc.log("guestlogin..............");
    gameclass.servertype = 2;
    setservertype(gameclass.servertype);
    gameclass.clientver = 0;

    if (openid != null && openid != "") {
        mod_userdefault.globaldata.code = openid;
    }
    var data = {"code": mod_userdefault.globaldata.code, "ver": gameclass.clientver};
    var _this = this;

    _this.game.uimgr.showload(true);

    this.sendhttp("loginYK", data, function (retdata, temp, recvdata) {
        if (recvdata.msghead == "loginfail") {
            gameclass.servertype = 2;//1正式服 2测试服
            gameclass.clientver = 0;
            _this.game.modmgr.mod_login.guestlogin(openid);
        } else {
            _this.logindata = retdata;
            cc.log(_this.logindata);
            _this.setLoginData(retdata.card - retdata.gold, retdata.gold);
            mod_userdefault.globaldata.code = retdata.openid;
            mod_userdefault.writeglobaljson();
            gameclass.mod_platform.sendGetBattery();

            if (retdata.room == 0) {
                _this.game.uimgr.showload(false);
                _this.game.uimgr.closeallui(true);

                _this.showHall();
            } else {
                _this.jionroom(retdata.ip, retdata.room);
            }
            _this.game.modmgr.mod_center.connect("ws://" + retdata.center);
        }
    });
};
gameclass.mod_login.prototype.showHall = function () {
    var loginSetStorage = staticFunction.getStorage(gameclass.gameStorageKey, gameclass.loginSetKey);
    if (loginSetStorage == null) {
        if (gameclass.LOGIN_TO_ROOM_DEFAULT == gameclass.TAB_LOGIN_TO_GOLD) {
            this.game.uimgr.showui("gameclass.hallGoldui");
        } else {
            this.game.uimgr.showui("gameclass.hallui");
        }
    } else if (parseInt(loginSetStorage) == gameclass.TAB_LOGIN_TO_GOLD) {
        this.game.uimgr.showui("gameclass.hallGoldui");
    } else {
        this.game.uimgr.showui("gameclass.hallui");
    }

    //if(gameclass.test == "false") { //! 不是审核模式
    //    this.game.uimgr.showui("gameclass.goldScwelcome");
    //}
}
gameclass.mod_login.prototype.wxlogin = function (code, isfrist) {
    cc.log("wxlogin..............");
    var type = 3;
    if (!cc.sys.isNative) {
        type = 1;
    }

    var op = "loginWX";
    if (mod_userdefault.globaldata.code != "") {
        code = mod_userdefault.globaldata.code;
        op = "loginOP";
    }

    var data = {"code": code, "type": type, "ver": gameclass.clientver};
    var _this = this;

    if (!isfrist) {
        _this.game.uimgr.showload(true);
    }

    this.sendhttp(op, data, function (retdata, temp, recvdata) {
        cc.log("getMsg-----login----->" + recvdata.msghead + "||data=" + JSON.stringify(recvdata.msgdata));
        if (recvdata.msghead == "loginfail") {
            gameclass.servertype = 2//1正式服 2测试服
            gameclass.clientver = 0;
            _this.game.modmgr.mod_login.guestlogin("");
        } else {
            _this.logindata = retdata;
            _this.setLoginData(retdata.card - retdata.gold, retdata.gold);
            if (mod_userdefault.globaldata.code != retdata.openid) {
                mod_userdefault.globaldata.code = retdata.openid;
                mod_userdefault.globaldata.time = (new Date()).getTime();
                mod_userdefault.writeglobaljson();
            }
            _this.islogin = true;
            g_islogin = true;
            gameclass.mod_platform.sendGetBattery();

            if (retdata.room == 0) {
                _this.game.uimgr.showload(false);
                _this.game.uimgr.closeallui(true);

                _this.showHall();
            } else {
                _this.jionroom(retdata.ip, retdata.room);
            }
            _this.game.modmgr.mod_center.connect("ws://" + retdata.center);

        }
    });
};

gameclass.mod_login.prototype.setMyInfo = function (data, func) {
    this.sendhttp('setextrainfo', data, function (retdata, temp, recvdata) {
        cc.log(retdata);
        if (func) {
            func(retdata);
        }
    });
};

gameclass.mod_login.prototype.replaceCard = function (data, func) {
    this.sendhttp('card2gold', data, function (retdata, temp, recvdata) {
        cc.log("222")
    });
};

gameclass.mod_login.prototype.creategoldroom = function (gametype, num) {
    var _num = 1;
    if (num) _num = num;
    cc.log("gametypechuanru"+gametype);
    var data = {"uid": this.logindata.uid, "type": gametype, "num": _num, "unionid":mod_userdefault.globaldata.code};
    var _this = this;

    var checkCanCreate = _this.checkCanCreate(gametype);
    checkCanCreate = true;
    if (checkCanCreate) {
        this.game.uimgr.showload(true);
        this.sendhttp("fastjoin", data, function (retdata, temp, recvdata) {
            if (retdata.card) {
                _this.setLoginData(retdata.card - retdata.gold, retdata.gold);
            }
            _this.jionroom(retdata.ip, retdata.room);
        });
    } else {
        _this.game.uimgr.showui("gameclsss.hallui");
    }
};

gameclass.mod_login.prototype.checkCanCreate = function (gametype) {
    var checkArr = [1000, 4000, 2000, 6000, 20000, 10000];
    var slectType = parseInt(gametype / 10 % 10);
    var loginData = this.game.modmgr.mod_login.logindata;
    if (loginData.gold >= checkArr[slectType]) {
        return true;
    } else {
        return false;
    }
};


gameclass.mod_login.prototype.createroom = function (gameid, num, param1, param2) {
    var data = {"uid": this.logindata.uid, "type": gameid, "num": num, "param1": param1, "param2": param2, "unionid":mod_userdefault.globaldata.code};
    var _this = this;

    _this.game.uimgr.showload(true);

    this.sendhttp("create", data, function (retdata, temp, recvdata) {
        if (retdata.card) {
            _this.setLoginData(retdata.card - retdata.gold, retdata.gold);
        }

        _this.jionroom(retdata.ip, retdata.room);
    });
};

gameclass.mod_login.prototype.joinwithroomid = function (roomid) {
    var data = {"uid": this.logindata.uid, "group": -1, "roomid": Number(roomid), "unionid":mod_userdefault.globaldata.code};
    var _this = this;

    _this.game.uimgr.showload(true);

    this.sendhttp("join", data, function (retdata, temp, recvdata) {
        _this.jionroom(retdata.ip, retdata.room);

    });
};

gameclass.mod_login.prototype.jionroom = function (ip, roomid, times) {
    var _this = this;

    if (times == null) {
        times = 5;
    }

    this.getroominfo("ws://" + ip, roomid, function (ws, data) {
        cc.log("getMsg-----login----->" + data.msghead + "||data=" + JSON.stringify(data.msgdata));
        switch (data.msghead) {
            case "roominfo":
                _this.game.uimgr.showload(false);
                _this.game.uimgr.closeallui(true);
                g_isgame = true;

                if (data.msgdata.type == gameclass.gameniuniu) {
                    _this.createniuniu(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gameszp) {
                    _this.createzjh(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gameddz) {
                    _this.createddz(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gamelzddz) {
                    _this.createddz_wild(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gamesdb) {
                    _this.createsdb(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gamettz) {
                    _this.createttz(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gameptj) {
                    _this.createptj(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gameszp_fk) {
                    _this.createzjhfk(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gamenxs) {
                    _this.createsaolei(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gamejxnn) {
                    _this.createjxnn(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gameszpbaofang) {
                    _this.createzjhfk(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gamenys||data.msgdata.type == gameclass.gamebrnys||data.msgdata.type == gameclass.gamesznys||
                    data.msgdata.type == gameclass.gamegdnys||data.msgdata.type == gameclass.gamezynys)
                {
                    _this.createnys(data.msgdata, ws);
                } else if (data.msgdata.type == gameclass.gamewzq) {
                    _this.createWzq(data.msgdata, ws);
                } else if (data.msgdata.type >= gameclass.gameBZW && data.msgdata.type < 50000){//这里豹子王是40001，所以不能加10000
                    _this.createBZW(data.msgdata, ws);
                } else if (data.msgdata.type == 2 || data.msgdata.type == 3 || data.msgdata.type == 4 || data.msgdata.type == 5
                    || data.msgdata.type == 13 || data.msgdata.type == 14) {
                    _this.createkwxroom(data.msgdata, ws);
                } else if (data.msgdata.type >= gameclass.gamegoldkwx && data.msgdata.type < gameclass.gamegoldkwx + 10000) {
                    _this.createkwxroom(data.msgdata, ws);
                } else if (data.msgdata.type >= gameclass.gamegoldszp && data.msgdata.type < gameclass.gamegoldszp + 10000) {
                    _this.createzjhfk(data.msgdata, ws);
                } else if (data.msgdata.type >= gameclass.gameGoldNiu && data.msgdata.type < gameclass.gameGoldNiu + 10000) {
                    _this.createGoldNiu(data.msgdata, ws);
                } else if (data.msgdata.type >= gameclass.gamegoldPtj && data.msgdata.type < gameclass.gamegoldPtj + 10000){
                    _this.createGoldptj(data.msgdata, ws);
                } else if (data.msgdata.type >= gameclass.gamegoldEBG && data.msgdata.type < gameclass.gamegoldEBG + 10000){
                    _this.createEBG(data.msgdata, ws);
                } else if (data.msgdata.type >= gameclass.gamegoldTTZ && data.msgdata.type < gameclass.gamegoldTTZ + 10000){
                    _this.createGoldTzz(data.msgdata, ws);
                } else if(data.msgdata.type >= gameclass.gamegoldPDK && data.msgdata.type < gameclass.gamegoldPDK + 10000){
                    _this.createPDK(data.msgdata, ws);
                }else if(data.msgdata.type == gameclass.gamegoldLHD){
                    _this.createLHD(data.msgdata, ws);
                }else if(data.msgdata.type == gameclass.gamegoldYYBF){
                    _this.createYYBF(data.msgdata, ws);
                }else if(data.msgdata.type >= gameclass.gamegoldsxdb && data.msgdata.type < gameclass.gamegoldsxdb + 10000){
                    _this.createSXDB(data.msgdata, ws);
                }else if (data.msgdata.type == gameclass.gamegoldYSZ ){
                    _this.createYSZ(data.msgdata, ws);
                }else if (data.msgdata.type == gameclass.gameDragon){   //龙珠探宝
                    _this.createDragon(data.msgdata, ws);
                }else if (data.msgdata.type == gameclass.gameDxtb){   //地穴探宝
                    _this.createDxtb(data.msgdata, ws);
                }else if (data.msgdata.type == gameclass.gameFpj){   //! 翻牌机
                    _this.createFpj(data.msgdata, ws);
                }else if(data.msgdata.type == gameclass.gamepdk){
                    _this.createpdkfk(data.msgdata, ws);
                }else if(data.msgdata.type == gameclass.gamegoldTB){
                    _this.createTB(data.msgdata, ws);
                }else if(data.msgdata.type == gameclass.gamegoldRacing){
                    _this.createRacing(data.msgdata, ws);
                }else if(data.msgdata.type == gameclass.gameToubao){
                    _this.createTBnew(data.msgdata, ws);
				}else if(data.msgdata.type == gameclass.gameFish){
                    _this.createFishing(data.msgdata, ws);
                }else if(data.msgdata.type == gameclass.gameTBBF){
                    _this.createTBnew(data.msgdata, ws);
                }
                else {
                    ws.onclosefunc = null;
                    _this.dissmissroom();
                    _this.game.uimgr.showui("gameclass.msgboxui");
                    _this.game.uimgr.uis["gameclass.msgboxui"].setString("您在傲世娱乐麻将的房间中,请先登录傲世娱乐麻将退出房间");
                }
                break;
            case "joinroomfail":
                ws.onclosefunc = null;
                _this.dissmissroom();
                _this.game.uimgr.showui("gameclass.msgboxui");
                switch (data.msgdata.result) {
                    case 1:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已解散");
                        break;
                    case 2:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已满员");
                        break;
                    case 4:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房卡不足");
                        break;
                    default:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房间错误");
                        break;
                }
                break;
        }
    })
};

gameclass.mod_login.prototype.getroominfo = function (ip, roomid, func, times) {
    var _this = this;
    gameclass.newwebsocket(this.game, ip, function (ws) {

    }, function (ws) {
        cc.log("mod_login open send joinroom ↓");
        //var data = {"uid":_this.logindata.uid, "roomid":roomid,"serverid":sid,"minfo":gameclass.mod_platform.getmapinfo()};
        var data = {"uid": _this.logindata.uid, "roomid": roomid, "minfo": gameclass.mod_platform.getmapinfo(), "unionid":mod_userdefault.globaldata.code};
        ws.send("joinroom", data);
    }, function (ws, data) {
        cc.log("mod_login onmsng ↓");
        func(ws, data);
    }, function () {
        cc.log("mod_login onerrorfunc");
    }, function () {
        cc.log("mod_login onclosefunc");
        _this.backlogin();
    });
};

gameclass.mod_login.prototype.createniuniu = function (_roominfo, _mysocket) {
    var mod_niuniu = new gameclass.mod_niuniu;
    g_ShowBattery = true;
    this.game.uimgr.showui("gameclass.niuniutable");

    mod_niuniu.setgame(this.game);
    mod_niuniu.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.niuniutable"].setmod(mod_niuniu);

    //this.gamelst[this.gamelst.length] = mod_niuniu;
    this.mod_game = mod_niuniu;

};

gameclass.mod_login.prototype.createzjh = function (_roominfo, _mysocket) {
    var mod_zjh = new gameclass.mod_zjh;
    g_ShowBattery = true;
    this.game.uimgr.showui("gameclass.zjhtable");
    mod_zjh.setgame(this.game);
    mod_zjh.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.zjhtable"].setmod(mod_zjh);

    //this.gamelst[this.gamelst.length] = mod_zjh;
    this.mod_game = mod_zjh;

};

gameclass.mod_login.prototype.createzjhfk = function (_roominfo, _mysocket) {
    var mod_zjh;
    g_ShowBattery = true;
    if (_roominfo.type == gameclass.gameszp_fk) {
        mod_zjh = new gameclass.mod_zjhFk;
        this.game.uimgr.showui("gameclass.zjhtablefk");
    } else if (_roominfo.type == gameclass.gameszpbaofang) {
        mod_zjh = new gameclass.mod_zjhGold;
        this.game.uimgr.showui("gameclass.zjhtableGoldBF", null, null, null, "gameclass.zjhtablefk");
        this.game.uimgr.uis["gameclass.zjhtablefk"].setbftype(_roominfo.type);
    } else {
        mod_zjh = new gameclass.mod_zjhGold;
        this.game.uimgr.showui("gameclass.zjhtableGold", null, null, null, "gameclass.zjhtablefk");
    }

    mod_zjh.setgame(this.game);
    mod_zjh.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.zjhtablefk"].setmod(mod_zjh);

    //this.gamelst[this.gamelst.length] = mod_zjh;
    this.mod_game = mod_zjh;
},


gameclass.mod_login.prototype.createddz = function (_roominfo, _mysocket) {
    var mod_ddzhu = new gameclass.mod_ddzhu;
    g_ShowBattery = true;
    this.game.uimgr.showui("gameclass.ddzhutable");

    // cc.log("------------------------------------------------");
    // cc.log("ddzhutable");
    // cc.log("------------------------------------------------");
    mod_ddzhu.setgame(this.game);
    mod_ddzhu.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.ddzhutable"].setmod(mod_ddzhu);

    //this.gamelst[this.gamelst.length] = mod_ddzhu;
    this.mod_game = mod_ddzhu;
};

gameclass.mod_login.prototype.createddz_wild = function (_roominfo, _mysocket) {
    var mod_ddzhu = new gameclass.mod_ddzhu;
    g_ShowBattery = true;
    this.game.uimgr.showui("gameclass.ddzhutable_wild");

    mod_ddzhu.setgame(this.game);
    mod_ddzhu.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.ddzhutable_wild"].setmod(mod_ddzhu);

    //this.gamelst[this.gamelst.length] = mod_ddzhu;
    this.mod_game = mod_ddzhu;
};

gameclass.mod_login.prototype.createsdb = function (_roominfo, _mysocket) {
    var mod = new gameclass.mod_sdb;
    g_ShowBattery = true;
    this.game.uimgr.showui("gameclass.sdbtable");

    mod.setgame(this.game);
    mod.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.sdbtable"].setmod(mod);

    //this.gamelst[this.gamelst.length] = mod_zjh;
    this.mod_game = mod;
};

gameclass.mod_login.prototype.createsaolei = function (_roominfo, _mysocket) {
    var mod = new gameclass.mod_minesweeping;
    g_ShowBattery = false;
    this.game.uimgr.showui("gameclass.minesweepingtable", false, null, 1);

    mod.setgame(this.game);
    mod.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.minesweepingtable"].setmod(mod);

    //this.gamelst[this.gamelst.length] = mod_zjh;
    this.mod_game = mod;
};

//gameclass.mod_login.prototype.createeat = function (_roominfo, _mysocket) {
//    var mod = new gameclass.mod_eat;
//    this.game.uimgr.showui("gameclass.eatTable");
//
//    mod.setgame(this.game);
//    mod.entergame(_roominfo, _mysocket);
//    this.game.uimgr.uis["gameclass.eatTable"].setmod(mod);
//
//    //this.gamelst[this.gamelst.length] = mod_zjh;
//    this.mod_game = mod;
//};

gameclass.mod_login.prototype.createptj = function (_roominfo, _mysocket) {
    g_ShowBattery = true;
    var mod_ptj = new gameclass.mod_ptj;
    this.game.uimgr.showui("gameclass.pintianjiutable");

    mod_ptj.setgame(this.game);
    mod_ptj.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.pintianjiutable"].setmod(mod_ptj);

    this.mod_game = mod_ptj;
};
gameclass.mod_login.prototype.createGoldptj = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_goldptj = new gameclass.mod_goldptj;
    this.game.uimgr.showui("gameclass.goldpintianjiutable");

    mod_goldptj.setgame(this.game);
    mod_goldptj.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.goldpintianjiutable"].setmod(mod_goldptj);

    this.mod_game = mod_goldptj;
};
gameclass.mod_login.prototype.createEBG = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_goldptj = new gameclass.mod_erbagang;
    this.game.uimgr.showui("gameclass.erbagangTable");

    mod_goldptj.setgame(this.game);
    mod_goldptj.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.erbagangTable"].setmod(mod_goldptj);

    this.mod_game = mod_goldptj;
};
gameclass.mod_login.prototype.createYSZ = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_yaosaizi;
    this.game.uimgr.showui("gameclass.goldYszTable", false, null, 1);

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.goldYszTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};

gameclass.mod_login.prototype.createDragon = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_dragon;
    this.game.uimgr.showui("gameclass.dragonTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.dragonTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};

gameclass.mod_login.prototype.createDxtb = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_dxtb;
    this.game.uimgr.showui("gameclass.dxtbTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.dxtbTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};


gameclass.mod_login.prototype.createFpj = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_goldfpj;
    this.game.uimgr.showui("gameclass.fpjTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.fpjTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};

gameclass.mod_login.prototype.createpdkfk = function(_roominfo,_mysocket) {
    g_ShowBattery = true;
    var mod_pdkfk = new gameclass.mod_pdkfk;

    this.game.uimgr.showui("gameclass.pdktableFk");
    // this.game.uimgr.closeui("gameclass.hallui");
    // this.game.uimgr.closeui("gameclass.jionroomui");


    mod_pdkfk.setgame(this.game);
    mod_pdkfk.entergame(_roominfo,_mysocket);

    this.game.uimgr.uis["gameclass.pdktableFk"].setmod(mod_pdkfk);

    //this.gamelst[this.gamelst.length] = mod_niuniu;
    this.mod_game = mod_pdkfk;
};

gameclass.mod_login.prototype.createTB = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_toubao;
    this.game.uimgr.showui("gameclass.toubaoTable", false, null, 1);

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.toubaoTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};
gameclass.mod_login.prototype.createFishing = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_fish;
    this.game.uimgr.showui("gameclass.goldFishTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.goldFishTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};
gameclass.mod_login.prototype.createTBnew = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_toubaonew;
    this.game.uimgr.showui("gameclass.toubaoTablenew", false, null, 1);

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.toubaoTablenew"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};

gameclass.mod_login.prototype.createRacing = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_racing;
    this.game.uimgr.showui("gameclass.goldracingtable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.goldracingtable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};

gameclass.mod_login.prototype.createSXDB = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_sxdb;
    this.game.uimgr.showui("gameclass.sxdbTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.sxdbTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};
//createYYBF
gameclass.mod_login.prototype.createYYBF = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_yybf;
    this.game.uimgr.showui("gameclass.goldyybftable");
    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.goldyybftable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};
//createLHD
gameclass.mod_login.prototype.createLHD = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_lhd;
    this.game.uimgr.showui("gameclass.longhudouTable");
    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.longhudouTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};
gameclass.mod_login.prototype.createPDK = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_goldptj = new gameclass.mod_pdk;
    this.game.uimgr.showui("gameclass.pdkTable");

    mod_goldptj.setgame(this.game);
    mod_goldptj.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.pdkTable"].setmod(mod_goldptj);

    this.mod_game = mod_goldptj;
};


gameclass.mod_login.prototype.createGoldTzz = function (_roominfo, _mysocket) {
    g_ShowBattery = true;
    var mod_goldttz = new gameclass.mod_goldttz;
    this.game.uimgr.showui("gameclass.goldtuitongzitable");

    mod_goldttz.setgame(this.game);
    mod_goldttz.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.goldtuitongzitable"].setmod(mod_goldttz);

    this.mod_game = mod_goldttz;
};

gameclass.mod_login.prototype.createttz = function (_roominfo, _mysocket) {
    g_ShowBattery = true;
    var mod_ttz = new gameclass.mod_ttz;
    this.game.uimgr.showui("gameclass.tuitongzitable");

    mod_ttz.setgame(this.game);
    mod_ttz.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.tuitongzitable"].setmod(mod_ttz);

    this.mod_game = mod_ttz;
};
gameclass.mod_login.prototype.createjxnn = function (_roominfo, _mysocket) {
    g_ShowBattery = true;
    var mod_niuniu = new gameclass.mod_jxnn;
    this.game.uimgr.showui("gameclass.jxnntable");

    mod_niuniu.setgame(this.game);
    mod_niuniu.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.jxnntable"].setmod(mod_niuniu);

    this.mod_game = mod_niuniu;
};
gameclass.mod_login.prototype.createnys = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_nys = new gameclass.mod_nys;

    this.game.uimgr.showui("gameclass.nystable");

    mod_nys.setgame(this.game);
    mod_nys.entergame(_roominfo, _mysocket);

    this.game.uimgr.uis["gameclass.nystable"].setmod(mod_nys);

    this.mod_game = mod_nys;
};
gameclass.mod_login.prototype.createkwxroom = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_kwx = new gameclass.mod_kwx;
    this.game.uimgr.showui("gameclass.kwxtable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_kwx.setgame(this.game);
    mod_kwx.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.kwxtable"].setmod(mod_kwx);
    this.mod_game = mod_kwx;
};

gameclass.mod_login.prototype.createGoldNiu = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_goldNys();
    this.game.uimgr.showui("gameclass.goldNysTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.goldNysTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};

gameclass.mod_login.prototype.createBZW = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_game = new gameclass.mod_leopardKing;
    this.game.uimgr.showui("gameclass.leopardKingTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_game.setgame(this.game);
    mod_game.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.leopardKingTable"].setmod(mod_game);
    //mod_game.Onroominfo(_roominfo);

    this.mod_game = mod_game;
};


gameclass.mod_login.prototype.createWzq = function (_roominfo, _mysocket) {
    g_ShowBattery = false;
    var mod_goldWzq = new gameclass.mod_goldWzq;
    this.game.uimgr.showui("gameclass.wzqGoldTable");

    var str = _mysocket.url;
    this.logindata.ip = str.substring(5);
    this.logindata.room = _roominfo.roomid;

    mod_goldWzq.setgame(this.game);
    mod_goldWzq.entergame(_roominfo, _mysocket);
    this.game.uimgr.uis["gameclass.wzqGoldTable"].setmod(mod_goldWzq);
    mod_goldWzq.onroominfo(_roominfo);

    // this.gamelst[this.gamelst.length] = mod_goldWzq;
    // modkwx = mod_goldWzq;

    this.mod_game = mod_goldWzq;
};
gameclass.mod_login.prototype.dissmissroom = function () {
    g_isgame = false;
    g_will_room = 0;
    g_ShowBattery = false;
    this.game.uimgr.closeallui(true);
    mod_sound.stopbmg(g_music["ybao_bg"]);
    mod_sound.playbmg(g_music["bmg"],true);
    //cc.log(this.mod_game.roominfo.type);
    var bo = 0;//0普通的退到总大厅,1金币场换桌，2金币场退到金币大厅
    if(this.mod_game == null || this.mod_game.roominfo == null) {
        bo = 2;
    } else {
        if(this.mod_game.roominfo.type >= gameclass.gamegoldkwx || this.mod_game.roominfo.type == gameclass.gamewzq || this.mod_game.roominfo.type == gameclass.gameszpbaofang || this.mod_game.roominfo.type == gameclass.gameTBBF) {
            if (this.mod_game.roominfo.goldchang) {
                bo = 1;
            } else {
                bo = 2;
            }
        }
    }
    if (bo == 1) {
        this.game.uimgr.showload(true);
        this.creategoldroom(this.mod_game.roominfo.type, this.mod_game.roominfo.roomid);
    } else {
        this.game.uimgr.showui("gameclass.hallui", null, null, 0);
        if (bo == 2) {
            this.game.uimgr.showui("gameclass.hallGoldui", null, null, 0);
        }
    }
};

gameclass.mod_login.prototype.backlogin = function (type) {
    g_isgame = false;
    g_islogin = false;
    g_will_room = 0;
    g_ShowBattery = false;

    if (this.game.modmgr.mod_center.myGatewebsocket) {
        this.game.modmgr.mod_center.myGatewebsocket.ws.close();
        this.game.modmgr.mod_center.myGatewebsocket = null;
    }
    cc.log("ssssssssss");
    cc.log(type);
    this.game.uimgr.closeallui(true);
    this.game.uimgr.showui("gameclass.loginui",null,null,0);

    if (type != null && type > 0) {
        var str = [
            "网络连接超时",
            "网络连接错误"
        ]

        this.game.uimgr.showui("gameclass.msgboxui");
        this.game.uimgr.uis["gameclass.msgboxui"].setString(str[type - 1]);
    }
};

gameclass.mod_login.prototype.getfirstgame = function () {

    return this.mod_game;

};

/**
 * Created by feihuihui on 2015/11/27.
 */
var mod_userdefault = {};

mod_userdefault.init = function() {
    mod_userdefault.userdata = {};
    mod_userdefault.globaldata = {};

    mod_userdefault.globaldata.code = "";
    mod_userdefault.globaldata.time = (new Date()).getTime();
    //mod_userdefault.globaldata.savepassword = true;

};

mod_userdefault.init();

/*
mod_userdefault.writejson = function()
{
    var myDate = new Date();
    mod_userdefault.userdata.svaeitme.year = myDate.getYear();
    mod_userdefault.userdata.svaeitme.day = myDate.getDay();

    cc.sys.localStorage.setItem("me" + mod_base.userdata.uid.toString(), JSON.stringify(mod_userdefault.userdata));
};
*/
mod_userdefault.writeglobaljson = function()
{
    cc.sys.localStorage.setItem("global", JSON.stringify(mod_userdefault.globaldata));
};

mod_userdefault.clone2 = function(old,obj){

    var o = old;
    for(var key in old){
        if(obj[key] != null){
            if ( typeof(obj[key]) == 'object' ){
                o[key] = mod_userdefault.clone2(old[key],obj[key]);
            }else{
                o[key] = obj[key];
            }
        }
    }
    return o;
}
/*
mod_userdefault.readjson = function()
{
    cc.log("me" + mod_base.userdata.uid.toString());
    var _str = cc.sys.localStorage.getItem("me" + mod_base.userdata.uid.toString());
    cc.log(_str);

    mod_userdefault.init();

    if(_str == null || _str.length == 0)
    {
        return;
    }

    cc.log("readreadreadreadreadreadreadreadreadreadreadreadread mod_userdefault.userdata");
    mod_userdefault.userdata = JSON.parse(cc.sys.localStorage.getItem("me" + mod_base.userdata.uid.toString()));//mod_userdefault.clone2( mod_userdefault.userdata,JSON.parse(cc.sys.localStorage.getItem("me")) );
    cc.log(JSON.stringify(mod_userdefault.userdata));

    mod_userdefault.Inituserdata();

    var myDate = new Date();
    var year = myDate.getYear();
    var day = myDate.getDay();
    if(mod_userdefault.userdata.svaeitme.year != year && mod_userdefault.userdata.svaeitme.day != day){
        mod_userdefault.userdata.taskeverydata = {};
        mod_userdefault.writejson();
    }
};
*/
mod_userdefault.readglobaljson = function()
{
    var _str = cc.sys.localStorage.getItem("global");
    if(_str == null || _str.length == 0)
        return;

    mod_userdefault.globaldata = JSON.parse(cc.sys.localStorage.getItem("global"));//mod_userdefault.clone2( mod_userdefault.userdata,JSON.parse(cc.sys.localStorage.getItem("me")) );

    mod_userdefault.Initglobaldata();
};
/*
mod_userdefault.Inituserdata = function()
{
    if (!mod_userdefault.userdata.hasOwnProperty("taskdata"))
        mod_userdefault.userdata.taskdata = [0,0,0,0,0,0,0,0,0,0,0,0,0];

    if (!mod_userdefault.userdata.hasOwnProperty("taskeverydata"))
        mod_userdefault.userdata.taskeverydata = [0,0,0,0,0,0,0,0];

    if (!mod_userdefault.userdata.hasOwnProperty("taskdatalqaward"))
        mod_userdefault.userdata.taskdatalqaward = [0,0,0,0,0,0,0,0,0,0,0,0,0];

    if (!mod_userdefault.userdata.hasOwnProperty("taskeverydatalqaward"))
        mod_userdefault.userdata.taskeverydatalqaward = [0,0,0,0,0,0,0,0];

    if (!mod_userdefault.userdata.hasOwnProperty("svaeitme"))
    {
        mod_userdefault.userdata.svaeitme = {};
        if (!mod_userdefault.userdata.svaeitme.hasOwnProperty("year"))
            mod_userdefault.userdata.svaeitme.year = 0;

        if (!mod_userdefault.userdata.svaeitme.hasOwnProperty("day"))
            mod_userdefault.userdata.svaeitme.day = 0;
    }

    if (!mod_userdefault.userdata.hasOwnProperty("Chatmsglist"))
        mod_userdefault.userdata.Chatmsglist = [];

    if (!mod_userdefault.userdata.hasOwnProperty("chouren"))
        mod_userdefault.userdata.chouren = {};

};*/

mod_userdefault.Initglobaldata = function()
{
    if (!mod_userdefault.globaldata.hasOwnProperty("autologin"))
        mod_userdefault.globaldata.autologin = true;

    if (!mod_userdefault.globaldata.hasOwnProperty("savepassword"))
        mod_userdefault.globaldata.savepassword = true;
};

mod_userdefault.readglobaljson();

/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_niuniu = gameclass.mod_base.extend({
    roominfo:null,
    mywebsocket:null,
    serverchair:null,
    selfdata:null,
    isover:null,
    endinfo:null,
    gamestate:null,
    score:null,
    chatlst:null,
    uid:null,
    isover:null,
    _isThisGameOver:null,
    ctor:function () {
        this.isover = false;
        this._isThisGameOver=true;
        this.gamestate = 0;
        this.chatlst = [];
    },

});

gameclass.mod_niuniu.prototype.entergame = function(_roominfo,_mywebsocket){
    //{\"roomid\":351846,\"person\":[{\"openid\":\"59ef6e332117175342041f0e5e90dace\",\"name\":\"游客\",\"imgurl\":\"\",\
    // "ip\":\"221.234.240.2\",\"line\":true}],\"time\":0,\"agree\":[]}"}
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;
    this.updateroominfo(this.roominfo);
    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws,data) {
        cc.log("mod_niuNiu!!!!!!!!!!!!!!!!!!!!!!!!!!");
        cc.log(data);
        switch (data.msghead){
            case "roominfo":
                _this.updateroominfo(data.msgdata);
                _this.view.updataRoomUserInfo();
                _this.view.checkSafe(data.msgdata.person);
                break;
            case "joinroomfail":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.dissmissroom();
                _this.game.uimgr.showui("gameclass.msgboxui");
                switch (data.msgdata.result) {
                    case 1:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已解散");
                        break;
                    case 2:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已满员");
                        break;
                    case 4:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房卡不足");
                        break;
                    default:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房间错误");
                        break;
                }
                break;
            case "exitroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                if (!_this.isover){
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                }
                break;
            case "gameniuniubye":
                _this.endinfo = data.msgdata.info;
                if (_this.endinfo != null){
                    _this.isover = true;
                    _this.mywebsocket.onclosefunc = null;

                    _this.view.onGameNiuNiuBye(data);
                }

                break;
            case "tickroom":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.backlogin();
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                break;
            case "gameready":
                cc.log("gameready");

                _this.gameniuniuinfo.ready[_this.gameniuniuinfo.ready.length] = data.msgdata.uid;

                _this.ready(data.msgdata.uid);

                _this.view.onGameReady(data.msgdata.uid);

                break;
            case "gameniuniubegin":
                cc.log("gameniuniubegin");
                _this._isThisGameOver=false;
                _this.roominfo.step += 1;
                _this.gamestate = 1;
                _this.updategameniuniuinfo(data.msgdata);

                _this.view.onGameNiuNiuBegin(data.msgdata);
                //_this.view.checkSafe(_this.roominfo.person);
                _this.view.safeLayer.btn_safe.setVisible(false);
                /*
                * msgdata =
                 {
                 begin bool = 是否开始
                 ready []string = 准备的人,begin = false的时候有用
                 info []node = 游戏数据，begin = true的时候有用
                 }

                 * */
                break;
            case "gameniuniuinfo":
                cc.log("gameniuniuinfo");
                cc.log(data.msgdata);
                _this.updategameniuniuinfo(data.msgdata);
                _this.view.updataRoomUserInfo();
                _this.view.onGameNiuniuInfo(data.msgdata);
                _this.view.checkSafe(_this.roominfo.person);
                if(data.msgdata.begin){
                    _this.view.safeLayer.btn_safe.setVisible(false);
                }
                /*
                 msgdata =
                 {
                 begin bool = 是否开始
                 ready []string = 准备的人,begin = false的时候有用
                 info []node = 游戏数据，begin = true的时候有用
                 }

                 * */
                break;
            case "gamebets":
                cc.log("gamebets");

                for(var i = 0;i < 5;i++){
                    if (i < _this.gameniuniuinfo.info.length){
                        if (data.msgdata.uid == _this.gameniuniuinfo.info[i].uid){
                            _this.gameniuniuinfo.info[i].bets = data.msgdata.bets;
                        }
                    }
                }

                _this.view.onGameBets(data.msgdata,_this.roominfo.person.length);
                /*
                 msghead = "gamebets"
                 msgdata = {bets int}
                 客户端发送下注消息,bets为下注数量
                 收到的回复可能两种
                 1.
                 msghead = "gamebets"
                 msgdata = {openid string, bets int}

                 * */

                break;
            case "gameniuniuend":
                _this._isThisGameOver=true;
                for (var i =0;i < _this.roominfo.person.length; i++){
                    _this.roominfo.person[i].ready = false;
                    _this.roominfo.person[i].rob = 0;
                }

                _this.gamestate = 2;
                cc.log("gameniuniuend");
                _this.gameniuniuinfo.info = data.msgdata.info;
                _this.updategameniuniuinfo(_this.gameniuniuinfo);
                _this.view.onGameNiuNiuEnd(data.msgdata);
                /*
                * msghead = "gameniuniuend"
                 msgdata =
                 {
                 info []node
                 }

                 刚忘了写node的结构，这个和gameniuniuinfo里的node是一样的
                 node
                 {
                 openid   string
                 card    []int    //! 手牌，未结算的时候，其他人最后一张牌是0
                 bets int //! 下注
                 dealer bool  //! 是否是庄家
                 score  int   //! 这局结算分数
                 }

                 * */
                break;
            case "gameniuniucard":
                _this.ongameniuniucard(data.msgdata.card, data.msgdata.all);
                if(data.msgdata.all != null && cc.isArray(data.msgdata.all)){
                    _this.view.onGameSnedAllCard(data.msgdata.all);
                }else{
                    if(parseInt(_this.roominfo.param1 / 10) == 2){
                        _this.view.onGameSendOtherCard(data.msgdata.card,3);//扣2张模式  第一次叫分补第4张牌
                    }
                }

                break;
            case "gameview":
                _this.view.onGameShowUserCard(data.msgdata.uid,data.msgdata.type,data.msgdata.card,data.msgdata.view);
                break;
            case "dissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.exitroom",false);
                _this.game.uimgr.uis["gameclass.exitroom"].setData(_this,data.msgdata);
                break;
            case "nodissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("有人不同意解散房间");
                break;
            case "gamedeal":
                _this.rob(data.msgdata.uid,data.msgdata.ok);
                _this.view.onGameDeal(data.msgdata);
                break;
            case "gamedealer":
                for (var i =0;i < _this.gameniuniuinfo.info.length; i++){
                    if(_this.gameniuniuinfo.info[i].uid == data.msgdata.uid){
                        _this.gameniuniuinfo.info[i].dealer = true;
                        _this.rob(data.msgdata.uid,true);
                    }
                }
                _this.view.onGameDealer(data.msgdata);
                break;
            case "chatroom":
                _this.chatlst[_this.chatlst.length] = data.msgdata;

                if (_this.game.uimgr.uis["gameclass.chatui"])
                    _this.game.uimgr.uis["gameclass.chatui"].pushstr(data.msgdata);


                _this.view.onchat( data.msgdata);
                break;
            case "lineperson":
                for (var i =0;i < _this.roominfo.person.length; i++){
                    if(_this.roominfo.person[i].uid == data.msgdata.uid){
                        _this.roominfo.person[i].ip = "";
                        _this.game.uimgr.uis["gameclass.niuniutable"].resetIcon(data.msgdata.uid);
                        break;
                    }
                }
                break;

            case "gameline":
                var curIndex = _this.getPlayerIndexById(data.msgdata.uid);
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
        }
    });
};



gameclass.mod_niuniu.prototype.updateroominfo = function(roominfo) {
    this.uid = this.game.modmgr.mod_login.logindata.uid;
    this.roominfo = roominfo;
    for (var i =0;i < this.roominfo.person.length; i++){
        this.roominfo.person[i].ready = false;
        this.roominfo.person[i].rob = 0;

        if (this.roominfo.person[i].uid == this.uid){
            this.serverchair = i;
            this.selfdata = this.roominfo.person[i];
        }
    }
    this.persons  =  this.offsetPlayer(this.roominfo.person);
    if (this.gameniuniuinfo!=null){
        this.updategameniuniuinfo(this.gameniuniuinfo);
    }

};

gameclass.mod_niuniu.prototype.getPlayerIndexById = function(uid){
    for(var i = 0; i< this.persons.length; i++){
        if(this.persons[i] && this.persons[i].uid == uid){
            return i;
        }
    }
};
gameclass.mod_niuniu.prototype.offsetPlayer = function(arr){
    var player = [];

    for (var x= 0;x< 5 ;x++ ){
        player[(5 + x - this.serverchair) %5 ] = arr[x] ? arr[x] : null ;
    }
    return player;
}


gameclass.mod_niuniu.prototype.updategameniuniuinfo = function(gameniuniuinfo) {
    this.gameniuniuinfo = gameniuniuinfo;

    //this.ready = this.gameniuniuinfo.ready;
    if (this.gameniuniuinfo.ready != null) {
        for (var i = 0; i < this.gameniuniuinfo.ready.length; i++) {
            this.ready(this.gameniuniuinfo.ready[i]);
        }

        for (var i = 0; i < this.gameniuniuinfo.deal.length; i++) {
            this.rob(this.gameniuniuinfo.deal[i].uid,this.gameniuniuinfo.deal[i].ok);
        }
    }else{
        for (var i =0;i < this.roominfo.person.length; i++){
            this.roominfo.person[i].ready = false;
            this.roominfo.person[i].rob = 0;
        }
    }

};

gameclass.mod_niuniu.prototype.ready = function(uid) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            this.roominfo.person[i].ready = true;
        }
    }
};

gameclass.mod_niuniu.prototype.rob = function(uid,ok) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            if (ok)
                this.roominfo.person[i].rob = 1;
            else
                this.roominfo.person[i].rob = 2;
        }
    }
};

gameclass.mod_niuniu.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_niuniu.prototype.gameready = function() {
    var data = {};
    this.mywebsocket.send("gameready",data);
};

gameclass.mod_niuniu.prototype.gameniuniubegin = function() {
    var data = {};
    this.mywebsocket.send("gameniuniubegin",data);
};
gameclass.mod_niuniu.prototype.bindUI = function(ui) {
    this.view = ui;
}

gameclass.mod_niuniu.prototype.gamebets = function(num) {

    for(var i = 0;i < 5;i++){
        if (i < this.gameniuniuinfo.info.length){
            if (this.uid == this.gameniuniuinfo.info[i].uid){
                this.gameniuniuinfo.info[i].bets = num;
            }
        }
    }

    var data = {"bets":Number(num)};
    this.mywebsocket.send("gamebets",data);
};

gameclass.mod_niuniu.prototype.gameview = function(num,arrcard) {
    var data = {type:num,view:arrcard};
    this.mywebsocket.send("gameniuniuview",data);
};

gameclass.mod_niuniu.prototype.gameend = function() {
    var data = {};
    this.mywebsocket.send("gameend",data);
};

gameclass.mod_niuniu.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};

gameclass.mod_niuniu.prototype.gamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_niuniu.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};


gameclass.mod_niuniu.prototype.getserverchair = function(cur) {
   // cc.log(this.serverchair,cur );
    return (this.serverchair + cur )%5;
};

gameclass.mod_niuniu.prototype.getplayerdata = function(cur) {
    //cc.log("mod_niuniu roominfo");
    //cc.log(this.roominfo);
    var serverchair = this.getserverchair(cur);
    if (serverchair > this.roominfo.person.length) {
        return
    }
    return this.roominfo.person[serverchair];
};

gameclass.mod_niuniu.prototype.getplayerdatabyuid = function(uid) {

    for(var i = 0;i < this.roominfo.person.length; i++ ){
        if(this.roominfo.person[i].uid == uid){
            return this.roominfo.person[i];
        }
    }
};

gameclass.mod_niuniu.prototype.getplayerotherdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair >= this.gameniuniuinfo.info.length) {
        return
    }

    return this.gameniuniuinfo.info[serverchair];
};

gameclass.mod_niuniu.prototype.ongameniuniucard = function(card, all) {
    for (var i =0;i < this.gameniuniuinfo.info.length; i++){

        if (this.gameniuniuinfo.info[i].uid == this.uid){
            this.gameniuniuinfo.info[i].card[4] = card;
            if (all) {
                this.gameniuniuinfo.info[i].card = all;
            }
            break;
        }
    }
};

gameclass.mod_niuniu.prototype.getplayernum = function() {
    return this.gameniuniuinfo.info.length;
};


/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_nys = gameclass.mod_base.extend({
    roominfo:null,
    mywebsocket:null,
    serverchair:null,
    selfdata:null,
    isover:null,
    simpleOver:null,
    endinfo:null,
    gamestate:null,
    score:null,
    chatlst:null,
    uid:null,
    socketArr:null,
    timestamp:null,
    ctor:function () {
        this.isover = false;
        this.gamestate = 0;
        this.chatlst = [];
        this.socketArr = [];
        this._Headarr=["gamempqzbegin","gamedeal","gamedealer","gamebets","gamempqzend"];
        this.timestamp=0;
    }
});

gameclass.mod_nys.prototype.entergame = function(_roominfo,_mywebsocket){
    //{\"roomid\":351846,\"person\":[{\"openid\":\"59ef6e332117175342041f0e5e90dace\",\"name\":\"游客\",\"imgurl\":\"\",\
    // "ip\":\"221.234.240.2\",\"line\":true}],\"time\":0,\"agree\":[]}"}
    this.mywebsocket = _mywebsocket;
    this.updateroominfo(_roominfo);
    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws,data) {
        //cc.log(data);
        var nowtimestamp = _this.view.updataTimer;
        //cc.log(nowtimestamp);
        if(_this.socketArr.indexOf(data.msghead)<0&&_this._Headarr.indexOf(data.msghead)>-1){
            _this.socketArr.push(data.msghead);
            if(Math.abs(_this.timestamp-nowtimestamp)<0.1){
                _this.checkIsReConnect();
            }
            if(_this._Headarr.indexOf(data.msghead)>-1){
                _this.timestamp=nowtimestamp;
            }
            _this.socketArr.splice(0,_this.socketArr.length-1);
        }
        switch (data.msghead){
            case "gametime":
                _this.view._timerControl.startCount(data.msgdata.time);
                break;
            case "roominfo":
                _this.updateroominfo(data.msgdata);
                //_this.view.checkSafe(data.msgdata.person);
                break;
            case "joinroomfail":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.dissmissroom();
                _this.game.uimgr.showui("gameclass.msgboxui");
                switch (data.msgdata.result) {
                    case 1:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已解散");
                        break;
                    case 2:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已满员");
                        break;
                    default:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房间错误");
                        break;
                }
                break;
            case "exitroom":
                if(_this.serverchair||_this.serverchair==0) {
                    _this.game.uimgr.closeui("gameclass.exitroom");
                    if (!_this.isover) {

                        _this.mywebsocket.onclosefunc = null;
                        _this.game.modmgr.mod_login.dissmissroom();
                    }
                }else {
                    _this.game.uimgr.closeui("gameclass.exitroom");
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                }
                break;
            case "gamempqzbye":
                _this.isover = true;
                _this.mywebsocket.onclosefunc = null;
                var _callBack=function(){
                    _this.endinfo = data.msgdata.info;
                    _this.roominfo.host=data.msgdata.host;

                    if (_this.endinfo != null){
                        // _this.isover = true;
                        // _this.mywebsocket.onclosefunc = null;

                        _this.view.onGameNiuNiuBye(data);
                    }
                }
                if(_this.roominfo.step==_this.roominfo.maxstep&&(_this.roominfo.state==0||_this.roominfo.state==4)){
                    _this.view.scheduleOnce(_callBack,6)
                }else _callBack();
                break;
            case "tickroom":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.backlogin();
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                break;
            case "gameready":
                cc.log("gameready");
                for(var i=0;i<_this.roominfo.person.length;i++){
                    if(_this.roominfo.person[i].uid==data.msgdata.uid){
                        _this.roominfo.person[i].ready = true;
                        _this.view.onGameReady(data.msgdata.uid);
                        if(data.msgdata.uid==_this.uid){
                            _this.view.isGameReadyShow(false);
                        }
                        break;
                    }
                }
                break;
            case "gamempqzbegin":
                cc.log("gameniuniujxbegin");
                _this.roominfo.step += 1;
                _this.roominfo.state = 1;
                _this.updatePlayerinfo(data.msgdata,true);
                _this.view.onGameNiuNiuBegin(data.msgdata);
                _this.view.runJuShuAction();
                if(_this.selfdata){
                    _this.view.showBtnState(false,true);
                }else{
                    _this.view.showBtnState(true,false);
                }
                _this.view.safeLayer.btn_safe.setVisible(false);
                break;
            case "gamempqzinfo":
                cc.log("gamempqzinfo");
                //cc.log(data.msgdata);
                _this.updatePlayerinfo(data.msgdata);
                _this.view._timerControl.startCount(data.msgdata.time);
                _this.view.checkSafe(_this.roominfo.person);
                break;
            case "gamebets":
                cc.log("gamebets");
                for(var i=0;i<_this.roominfo.person.length;i++){
                    if(_this.roominfo.person[i].uid==data.msgdata.uid){
                        _this.roominfo.person[i].bets = data.msgdata.bets  ;
                        _this.view.onGameBets(data.msgdata);
                        if(data.msgdata.uid==_this.uid){
                            _this.view.isGameBetsShow(false);
                        }
                        break;
                    }
                }

                break;
            case "gamempqzend":
                cc.log("gameniuniuend");
                // for(var i=0;i<data.msgdata.info.length;i++){
                //     for(var j in data.msgdata.info[i]){
                //         _this.roominfo.person[i][j]=data.msgdata.info[i][j];
                //     }
                // }
                var _isViewArr=[];
                for(var i=0;i<_this.roominfo.person.length;i++){
                    _isViewArr[i]=_this.roominfo.person[i].view;
                }
                _this.updateroominfo(data.msgdata);
                _this.view.onGameNiuNiuEnd(data.msgdata);
                //cc.log(_isViewArr);
                for(var i=0;i<_this.roominfo.person.length;i++){
                    if(!_isViewArr[i]){
                        _this.view.onGameShowUserCard(_this.roominfo.person[i]);
                    }
                }
                /*
                 * msghead = "gameniuniuend"
                 msgdata =
                 {
                 info []node
                 }

                 刚忘了写node的结构，这个和gameniuniuinfo里的node是一样的
                 node
                 {
                 openid   string
                 card    []int    //! 手牌，未结算的时候，其他人最后一张牌是0
                 bets int //! 下注
                 dealer bool  //! 是否是庄家
                 score  int   //! 这局结算分数
                 }

                 * */
                break;
            case "roomseat":
                _this.updateroominfo(data.msgdata);
                _this.view.checkSafe(data.msgdata.person);
                break;
            case "gamempqzseat":
                _this.updatePlayerinfo(data.msgdata,false);
                break;
            case "gamempqzcard":
                _this.roominfo.state = 3;
                var playerdata=_this.getplayerdata(0);
                for(var i=0;i<data.msgdata.card.length;i++){
                    playerdata.card[4-i]=data.msgdata.card[i];
                }
                break;
            case "gameview":
                data.msgdata.view=true;
                for(var i=0;i<_this.roominfo.person.length;i++){
                    if(_this.roominfo.person[i].uid==data.msgdata.uid){
                        _this.roominfo.person[i].view=true;
                        _this.roominfo.person[i].card=data.msgdata.card;
                        if(data.msgdata.uid==_this.uid){
                            _this.view.isShowLiangLayer(false);
                        }
                        break;
                    }
                }
                _this.view.onGameShowUserCard(data.msgdata);
                break;
            case "dissmissroom":
                if(_this.serverchair||_this.serverchair==0) {
                    _this.game.uimgr.closeui("gameclass.exitroom");
                    _this.game.uimgr.showui("gameclass.exitroom", false);
                    _this.game.uimgr.uis["gameclass.exitroom"].setData(_this, data.msgdata);
                }
                break;
            case "nodissmissroom":
                if(_this.serverchair||_this.serverchair==0){
                    _this.game.uimgr.closeui("gameclass.exitroom");
                    _this.game.uimgr.showui("gameclass.msgboxui");
                    _this.game.uimgr.uis["gameclass.msgboxui"].setString("有人不同意解散房间");
                }
                break;
            case "gamedeal":
                cc.log("gamedeal");
                for(var i=0;i<_this.roominfo.person.length;i++){
                    if(_this.roominfo.person[i].uid==data.msgdata.uid){
                        _this.roominfo.person[i].robdeal = data.msgdata.score;
                        _this.view.onGameDeal(data.msgdata);
                        if(data.msgdata.uid==_this.uid){
                            _this.view.isShowQiangZhuang(false);
                        }
                        break;
                    }
                }
                break;
            case "gamedealer":
                _this.roominfo.state = 2;
                _this.view.unscheduleAllCallbacks();
                var isRanDomZhuang=false;
                var zhuangIndex=-1;
                for(var i =0;i < _this.roominfo.person.length; i++){
                    if(_this.roominfo.person[i].uid == data.msgdata.uid){
                        zhuangIndex=i;
                        break;
                    }
                }
                _this.roominfo.person[zhuangIndex].dealer = true;

                var _callBack=function(){
                    if(_this.roominfo.person[zhuangIndex].robdeal<=0){
                        var _obj={uid:data.msgdata.uid,card:1};
                        _this.roominfo.person[zhuangIndex].robdeal = 1;
                        _this.view.onGameDeal(_obj);
                    }
                }
                var _isRondom=false;
                for(var i =0;i < _this.roominfo.person.length; i++){
                    if(i!=zhuangIndex&&_this.roominfo.person[i].robdeal==_this.roominfo.person[zhuangIndex].robdeal){
                        _isRondom=true;
                        _this.view.randomZhuangBlink(data.msgdata,_callBack);
                        isRanDomZhuang=true;
                        break;
                    }
                }
                if(!_isRondom) _callBack();
                if(!isRanDomZhuang)
                _this.view.onGameDealer(data.msgdata);
                break;
            case "chatroom":
                _this.chatlst[_this.chatlst.length] = data.msgdata;

                if (_this.game.uimgr.uis["gameclass.chatnew"])
                    _this.game.uimgr.uis["gameclass.chatnew"].pushstr(data.msgdata);


                _this.view.onchat( data.msgdata);
                break;
            case "gamempqzopen":
                cc.log(data.msgdata);
                var playerdata=_this.getplayerdata(0);
                playerdata.card = data.msgdata.card;
                _this.view.gameFanPaiCallBack();
            case "lineperson":
                if(!_this.roominfo.person)return;
                for (var i =0;i < _this.roominfo.person.length; i++){
                    if(_this.roominfo.person[i].uid == data.msgdata.uid){
                        _this.roominfo.person[i].ip = "";
                        _this.game.uimgr.uis["gameclass.nystable"].resetIcon(data.msgdata.uid);
                        break;
                    }
                }
                break;
            case "notenoughcard":
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("AA支付房卡不足");
                break;

            case "gameline":
                var curIndex = _this.getPlayerIndexById(data.msgdata.uid);
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
        }
    });
};
gameclass.mod_nys.prototype.getplayerdatabyuid = function(uid) {
    for(var i = 0;i < this.roominfo.person.length; i++ ){
        if(this.roominfo.person[i].uid == uid){
            return this.roominfo.person[i];
        }
    }
};
gameclass.mod_nys.prototype.updateroominfo = function(roominfo) {
    this.uid = this.game.modmgr.mod_login.logindata.uid;
     this.roominfo=this.roominfo||{};
     for(var i in roominfo){
         if(i=="person"){
             if(roominfo["person"]){
                 this.roominfo["person"]=this.roominfo["person"]||[];
                 for(var j=0;j<roominfo["person"].length;j++){
                     this.roominfo["person"][j]=this.roominfo["person"][j]||{};
                     for(var k in roominfo["person"][j]){
                         this.roominfo["person"][j][k]=roominfo["person"][j][k];
                     }
                 }
                 while (this.roominfo["person"].length>roominfo["person"].length){
                      var obj=this.roominfo["person"].pop();
                     delete obj;
                 }
             }else{
                 this.roominfo["person"]=[];
             }
         }else if(i=="info"){
             for(var j=0;j<roominfo["info"].length;j++){
                 this.roominfo["person"][j]=this.roominfo["person"][j]||{};
                 for(var k in roominfo["info"][j]){
                     this.roominfo["person"][j][k]=roominfo["info"][j][k];
                 }
             }
         }else{
             this.roominfo[i]=roominfo[i];
         }

     }
    if(!this.roominfo.person)return;
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == this.uid){
            this.serverchair = i;
            this.selfdata = this.roominfo.person[i];
        }
    }
    if(this.serverchair==null){
        if(this.roominfo.state!=0){
        }
        for(var i=0;i<NYSMAX_PLAY_LENGTH;i++){
            if(!this.roominfo.person[i]){
                this.serverchair=i;
                break;
            }
        }
    }
    this.persons  =  this.offsetPlayer(this.roominfo.person);
    if(this.view)
    this.view.updataRoomUserInfo();
};
gameclass.mod_nys.prototype.checkIsReConnect = function () {
   this._Headarr=["gamempqzbegin","gamedeal","gamedealer","gamebets","gamempqzend"];
    if(this.socketArr[0]=="gamedeal"&&this.socketArr[0]=="gamedealer") return false;
    var _isreflashIndex=0;
    for(var i=0;i<this.socketArr.length;i++){
        if(this._Headarr.indexOf(this.socketArr[i])>-1){
            _isreflashIndex++;
        }
    }
    if(_isreflashIndex>1)  {
        this.view.updataRoomUserInfo();
        this.view.updatePlayerShow()
    }
}
gameclass.mod_nys.prototype.updatePlayerinfo = function(gameniuniuinfo,isNotConnect) {
    for(var i in gameniuniuinfo){
        if(i=="info"){
            for(var j=0;j<gameniuniuinfo["info"].length;j++){
                var _obj=gameniuniuinfo["info"][j];
                for(var m in _obj){
                    this.roominfo.person[j][m]=_obj[m];
                }
            }
        }else{
            this.roominfo[i]=gameniuniuinfo[i];
        }
    }
    if(this.roominfo.person){
        for(var i=0;i<this.roominfo.person.length;i++){
            if(this.roominfo.person[i].uid==this.uid){
                if(this.roominfo.state==0&&!this.roominfo.person[i].ready){
                    if(this.serverchair==0&&this.roominfo.step==0){
                        this.view.changeBeginShow();
                    }else{
                        this.view.isGameReadyShow(true);
                    }
                    break;
                }
            }
        }
    }
    this.view.updataRoomUserInfo();
    //cc.log(this.serverchair,this.roominfo.state);
    // if((this.serverchair||this.serverchair==0)&&this.roominfo.state==0){
    //     if(this.serverchair==0){
    //         this.view.showBtnState(true,true);
    //     }else{
    //         this.view.showBtnState(true,false);
    //     }
    // }else{
    //     this.view.showBtnState(true,false);
    // }
    if(!isNotConnect){
        this.view.updatePlayerShow();
    }
};
gameclass.mod_nys.prototype.ready = function(uid) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            this.roominfo.person[i].ready = true;
        }
    }
};

gameclass.mod_nys.prototype.rob = function(uid,num) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            this.roominfo.person[i].robdeal = num;
            var _obj={};
            _obj.uid=uid;
            _obj.score=num;
            this.view.onGameDeal(_obj);
        }
    }
};

gameclass.mod_nys.prototype.dissmissroom = function(num) {
    var data = {};
    if(this.roominfo.step==0){
        data={type:num};
    }
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_nys.prototype.gameready = function() {
    var data = {};
    this.mywebsocket.send("gameready",data);
};
gameclass.mod_nys.prototype.sendOpen = function(){
    this.mywebsocket.send("gameopen",{});
};
gameclass.mod_nys.prototype.gamebegin = function() {
    var data = {};
    this.mywebsocket.send("gamebegin",data);
};
gameclass.mod_nys.prototype.gameniuniubegin = function() {
    var data = {};
    this.mywebsocket.send("gameniuniubegin",data);
};
gameclass.mod_nys.prototype.bindUI = function(ui) {
    this.view = ui;
}

gameclass.mod_nys.prototype.gamebets = function(num) {

    for(var i = 0;i < NYSMAX_PLAY_LENGTH;i++){
        if (i < this.roominfo.person.length){
            if (this.uid == this.roominfo.person[i].uid){
                this.roominfo.person[i].bets = num;
            }
        }
    }

    var data = {"bets":Number(num)};
    this.mywebsocket.send("gamebets",data);
};
gameclass.mod_nys.prototype.gamedealer = function(num) {

    for(var i = 0;i < NYSMAX_PLAY_LENGTH;i++){
        if (i < this.roominfo.person.length){
            if (this.uid == this.roominfo.person[i].uid){
                this.roominfo.person[i].robdeal = num;
            }
        }
    }

    var data = {"score":Number(num)};
    this.mywebsocket.send("gamedealer",data);
};
gameclass.mod_nys.prototype.gameview = function() {
    this.mywebsocket.send("gameview");
};

gameclass.mod_nys.prototype.gameend = function() {
    var data = {};
    this.mywebsocket.send("gameend",data);
};

gameclass.mod_nys.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};
gameclass.mod_nys.prototype.gameseat = function() {
    var data = {};
    this.mywebsocket.send("gameseat",data);
};
gameclass.mod_nys.prototype.gamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_nys.prototype.chat = function(type,info,hitUid) {
    var data = {"type":type,"chat":info,"hitUid":hitUid};
    this.mywebsocket.send("chatroom",data);
};
gameclass.mod_nys.prototype.tuoGuang = function(_isTuoGuang) {
    var data = {uid:this.selfdata.uid,"ok":_isTuoGuang};
    this.mywebsocket.send("gametrust",data);
};
gameclass.mod_nys.prototype.getserverchair = function(cur) {
    // if(this.roominfo.type==gameclass.gamenys){
    //     if(cur==2||cur==6) return 100;
    //     if(cur>6) cur-=2;
    //     else if(cur>2)cur-=1;
    // }
    var _num=(this.serverchair + cur )%NYSMAX_PLAY_LENGTH;
    return _num;
};

gameclass.mod_nys.prototype.getplayerdata = function(cur) {
    //cc.log(this.roominfo);
    var maxNum=8;
    // if(this.roominfo.type==gameclass.gamenys){
    //     maxNum=6;
    // }
    var serverchair = this.getserverchair(cur);
    if (serverchair >= maxNum) {
        serverchair-=maxNum;
    }
    if(!this.roominfo.person) return null;
    return this.roominfo.person[serverchair];
};

gameclass.mod_nys.prototype.getplayerdatabyuid = function(uid) {

    for(var i = 0;i < this.roominfo.person.length; i++ ){
        if(this.roominfo.person[i].uid == uid){
            return this.roominfo.person[i];
        }
    }
};

gameclass.mod_nys.prototype.getplayerotherdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair >= this.roominfo.person.length) {
        return
    }

    return this.roominfo.person[serverchair];
};

gameclass.mod_nys.prototype.ongameniuniucard = function(cardArr, all) {
    for (var i =0;i < this.roominfo.person.length; i++){

        if (this.roominfo.person[i].uid == this.uid){
            for(var j=0;j<cardArr.length;j++){
                this.roominfo.person[i].card.push(cardArr[j]);
            }
            if (all) {
                this.roominfo.person[i].card = all;
            }
            break;
        }
    }
};
//炸弹 300
//五花牛 200
//五小牛 100
//没牛 0
//判断牛的方法
gameclass.mod_nys.prototype.ongetNiu = function(cardDataArr) {
    //cc.log(cardDataArr);
    //cardDataArr = [101,111,121,131,11];
    var runturnObj={};
    var abcd = ["a","d","b","c"];
    var cardArr=[];
    var type = [];
    for(var i=0;i<cardDataArr.length;i++){
        cardArr[i]=parseInt(cardDataArr[i]/10);
        type[i] = abcd[cardDataArr[i]%10 - 1];
    }
    runturnObj.type=0;
    runturnObj.cardArr=[];
    cardArr.sort(function (a,b) {
        return a-b;
    })
    //======================================
    var aa = 0;
    var bb = 0;
    for(var i = 1;i < 5;i++){
        if(cardArr[i]-cardArr[i-1] == 1){
            aa++;//顺
        }
        if(type[i] == type[i-1]){
            bb++;//同花
        }
    }
    //=========================================
    //顺金牛
    if(parseInt(this.roominfo.param2/10)%10){
        if(aa == 4 && bb == 4){
            runturnObj.type = 800;
            return runturnObj;
        }
        if(cardArr[0] == 1 && cardArr[1] == 10 && cardArr[2] == 11 && cardArr[3] == 12 && cardArr[4] == 13){//1可以和10，J,Q,K成顺子
            runturnObj.type = 200;
            if(bb==4){
                runturnObj.type = 800;
            }
            return runturnObj;
        }
    }
    //炸弹牛
    if(parseInt(this.roominfo.param2/100)%10) {
        if (cardArr[0] == cardArr[3] || cardArr[1] == cardArr[4]) {
            runturnObj.type = 700;//炸弹
            return runturnObj;
        }
    }
    //葫芦牛。三带二
    if(parseInt(this.roominfo.param2/1000)%10) {
        if (cardArr[0] == cardArr[2] && cardArr[3] == cardArr[4] && cardArr[2] != cardArr[3]) {
            runturnObj.type = 600;
            return runturnObj;
        }
        if (cardArr[0] == cardArr[1] && cardArr[2] == cardArr[4] && cardArr[1] != cardArr[2]) {
            runturnObj.type = 600;
            return runturnObj;
        }
    }
    //五小牛
    if(parseInt(this.roominfo.param2/10000)%10) {
        if (cardArr[4] < 5) {
            var _totalNum = 0;//五小牛
            for (var i = 0; i < cardArr.length; i++) {
                _totalNum += cardArr[i];
            }
            if (_totalNum <= 10) {
                runturnObj.type = 500;
                return runturnObj;
            }
        }
    }
    //
    if(parseInt(this.roominfo.param2/100000)%10) {
        if (bb == 4) {
            runturnObj.type = 400;//同花牛
            return runturnObj;
        }
    }
    if(parseInt(this.roominfo.param2/1000000)%10) {
        if (cardArr[0] >= 11) {//五花牛
            runturnObj.type = 300;
            return runturnObj;
        }
    }
    if(parseInt(this.roominfo.param2/10000000)%10) {
        if (aa == 4) {
            runturnObj.type = 200;//顺子牛
            return runturnObj;
        }
    }
    //-----------------------------------------------------------

    var _niuArr=[];
    for(var i=0;i<cardArr.length;i++){
        for(var j=i+1;j<cardArr.length;j++){
            for(var k=j+1;k<cardArr.length;k++){
                var num1=cardArr[i]>10?10:cardArr[i];
                var num2=cardArr[j]>10?10:cardArr[j];
                var num3=cardArr[k]>10?10:cardArr[k];
                if((num1+num2+num3)%10==0){
                    _niuArr=[cardArr[i],cardArr[j],cardArr[k]];
                }
            }
        }
    }
    if(!_niuArr.length) return runturnObj;
    runturnObj.cardArr=_niuArr;
    for(var i=0;i<_niuArr.length;i++){
        for(var j=0;j<cardArr.length;j++){
            if(cardArr[j]==_niuArr[i]){
                cardArr[j]=0;
                break;
            }
        }
    }
    var totalNum=0;
    for(var i=0;i<cardArr.length;i++){
        var _num=cardArr[i]>10?10:cardArr[i];
        totalNum+=_num;
    }
    if(totalNum%10==0){
        runturnObj.type=100;
    }else{
        runturnObj.type=totalNum%10+90;
    }
    return runturnObj;
};
gameclass.mod_nys.prototype.getplayernum = function() {
    return this.roominfo.person.length;
};

gameclass.mod_nys.prototype.offsetPlayer = function(arr){
    var player = [];

    for (var x= 0;x< 5 ;x++ ){
        player[(5 + x - this.serverchair) %5 ] = arr[x] ? arr[x] : null ;
    }
    return player;
}

gameclass.mod_nys.prototype.getPlayerIndexById  =function(uid){
    for(var i = 0; i< this.persons.length; i++){
        if(this.persons[i] && this.persons[i].uid == uid){
            return i;
        }
    }
}


/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_jxnn = gameclass.mod_base.extend({
    roominfo:null,
    mywebsocket:null,
    serverchair:null,
    selfdata:null,
    isover:null,
    endinfo:null,
    gamestate:null,
    score:null,
    chatlst:null,
    uid:null,
    ctor:function () {
        this.isover = false;
        this.gamestate = 0;
        this.chatlst = [];
    }
});

gameclass.mod_jxnn.prototype.entergame = function(_roominfo,_mywebsocket){
    //{\"roomid\":351846,\"person\":[{\"openid\":\"59ef6e332117175342041f0e5e90dace\",\"name\":\"游客\",\"imgurl\":\"\",\
    // "ip\":\"221.234.240.2\",\"line\":true}],\"time\":0,\"agree\":[]}"}
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;
    this.updateroominfo(this.roominfo);
    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws,data) {
        cc.log(data);
        switch (data.msghead){
            case "roominfo":
                _this.updateroominfo(data.msgdata);
                _this.view.updataRoomUserInfo();
                _this.view.checkSafe(data.msgdata.person);
                break;
            case "joinroomfail":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.dissmissroom();
                _this.game.uimgr.showui("gameclass.msgboxui");
                switch (data.msgdata.result) {
                    case 1:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已解散");
                        break;
                    case 2:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已满员");
                        break;
                    default:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房卡不足");
                        break;
                }
                break;
            case "exitroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                if (!_this.isover){

                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                }
                break;
            case "gameniuniubye":
                _this.endinfo = data.msgdata.info;
                if (_this.endinfo != null){
                    _this.isover = true;
                    _this.mywebsocket.onclosefunc = null;

                    _this.view.onGameNiuNiuBye(data);
                }

                break;
            case "tickroom":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.backlogin();
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                break;
            case "gameready":
                cc.log("gameready");
                for(var i=0;i<_this.gameniuniuinfo.info.length;i++){
                    if(_this.gameniuniuinfo.info[i].uid==data.msgdata.uid){
                        _this.gameniuniuinfo.info[i].ready = true;
                        break;
                    }

                }
                _this.ready(data.msgdata.uid);

                //_this.view.onGameReady(data.msgdata.uid);
                break;
            case "gameniuniujxbegin":
                cc.log("gameniuniujxbegin");
                _this.roominfo.step += 1;
                _this.gamestate = 1;
                _this.gameniuniuinfo=data.msgdata;
                _this.updategameniuniuinfo(data.msgdata);

                _this.view.updataRoomUserInfo();
                _this.view.onGameNiuNiuBegin(data.msgdata);
                _this.view.runJuShuAction();
                if(_this.roominfo.step == 1){
                    _this.view.checkSafe(_this.roominfo.person);
                }
                _this.view.safeLayer.btn_safe.setVisible(false);
                /*
                 * msgdata =
                 {
                 begin bool = 是否开始
                 ready []string = 准备的人,begin = false的时候有用
                 info []node = 游戏数据，begin = true的时候有用
                 }

                 * */
                break;
            case "gameniuniujxinfo":
                cc.log("gameniuniujxinfo");
                cc.log(data.msgdata);
                _this.updategameniuniuinfo(data.msgdata);
                _this.view.onGameNiuniuInfo(data.msgdata);
                _this.view.updataRoomUserInfo();
                _this.view.checkSafe(_this.roominfo.person);
                /*
                 msgdata =
                 {
                 begin bool = 是否开始
                 ready []string = 准备的人,begin = false的时候有用
                 info []node = 游戏数据，begin = true的时候有用
                 }

                 * */
                //没开始直接把自己设为准备状态
                if(!data.msgdata.begin){

                }
                break;
            case "gamebets":
                cc.log("gamebets");

                for(var i = 0;i < 5;i++){
                    if (i < _this.gameniuniuinfo.info.length){
                        if (data.msgdata.uid == _this.gameniuniuinfo.info[i].uid){
                            _this.gameniuniuinfo.info[i].bets = data.msgdata.bets;
                        }
                    }
                }
                if(data.msgdata.uid == _this.uid){
                    _this.view.isGameBetShow(false);
                }
                _this.view.onGameBets(data.msgdata,_this.roominfo.person.length);
                /*
                 msghead = "gamebets"
                 msgdata = {bets int}
                 客户端发送下注消息,bets为下注数量
                 收到的回复可能两种
                 1.
                 msghead = "gamebets"
                 msgdata = {openid string, bets int}

                 * */
                break;
            case "gameniuniuend":
                _this.gamestate = 2;
                cc.log("gameniuniuend");
                _this.gameniuniuinfo=data.msgdata;
                for(var i=0;i<_this.gameniuniuinfo.info.length;i++){
                    _this.view.onGameShowUserCard(_this.gameniuniuinfo.info[i]);
                }
                //清理数据
                for (var i =0;i < _this.roominfo.person.length; i++){
                    _this.roominfo.person[i].ready = false;
                    _this.roominfo.person[i].robdeal = -1;
                    _this.roominfo.person[i].bets=0;
                    _this.gameniuniuinfo.info[i].ready=false;
                    _this.gameniuniuinfo.info[i].robdeal=-1;
                    _this.gameniuniuinfo.info[i].bets=0;
                }
                _this.updategameniuniuinfo(_this.gameniuniuinfo);
                _this.view.onGameNiuNiuEnd(data.msgdata);
                /*
                 * msghead = "gameniuniuend"
                 msgdata =
                 {
                 info []node
                 }

                 刚忘了写node的结构，这个和gameniuniuinfo里的node是一样的
                 node
                 {
                 openid   string
                 card    []int    //! 手牌，未结算的时候，其他人最后一张牌是0
                 bets int //! 下注
                 dealer bool  //! 是否是庄家
                 score  int   //! 这局结算分数
                 }

                 * */
                break;
            case "gameniuniucard":
                _this.ongameniuniucard(data.msgdata.card, data.msgdata.all);
                if(data.msgdata.all != null && cc.isArray(data.msgdata.all)){
                    _this.view.onGameSnedAllCard(data.msgdata.all);
                }else{
                        _this.view.onGameSendOtherCard(data.msgdata.card);//扣2张模式  第一次叫分补第4张牌
                }
                break;
            case "gameview":
                data.msgdata.view=true;
                _this.view.onGameShowUserCard(data.msgdata);
                break;
            case "dissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.exitroom",false);
                _this.game.uimgr.uis["gameclass.exitroom"].setData(_this,data.msgdata);
                break;
            case "nodissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("有人不同意解散房间");
                break;
            case "gamedeal":
                _this.rob(data.msgdata.uid,data.msgdata.score);
                _this.view.onGameDeal(data.msgdata);
                if(data.msgdata.uid == _this.uid){
                    _this.view.isShowQiangZhuang(false);
                }
                break;
            case "gamedealer":
                // for (var i =0;i < _this.gameniuniuinfo.info.length; i++){
                //     if(_this.gameniuniuinfo.info[i].uid == data.msgdata.uid){
                //         _this.gameniuniuinfo.info[i].dealer = true;
                //         if(_this.gameniuniuinfo.info[i].robdeal<=0){
                //             var _obj={uid:data.msgdata.uid,score:1};
                //             _this.rob(_obj.uid,_obj.score);
                //             _this.view.onGameDeal(_obj);
                //         }
                //         break;
                //     }
                // }
                var isRanDomZhuang=false;
                for (var i =0;i < _this.gameniuniuinfo.info.length; i++){
                    if(_this.gameniuniuinfo.info[i].uid == data.msgdata.uid){
                        _this.gameniuniuinfo.info[i].dealer = true;
                        if(_this.gameniuniuinfo.info[i].robdeal<=0){
                            isRanDomZhuang=true;
                            _this.view.randomZhuangBlink(data.msgdata);
                            var _obj={uid:data.msgdata.uid,card:1};
                            _this.view.onGameDeal(_obj);
                        }
                        break;
                    }
                }
                if(!isRanDomZhuang);
                _this.view.onGameDealer(data.msgdata);
                break;
            case "chatroom":
                _this.chatlst[_this.chatlst.length] = data.msgdata;

                if (_this.game.uimgr.uis["gameclass.chatui"])
                    _this.game.uimgr.uis["gameclass.chatui"].pushstr(data.msgdata);


                _this.view.onchat( data.msgdata);
                break;
            case "lineperson":
                for (var i =0;i < _this.roominfo.person.length; i++){
                    if(_this.roominfo.person[i].uid == data.msgdata.uid){
                        _this.roominfo.person[i].ip = "";
                        _this.game.uimgr.uis["gameclass.niuniutable"].resetIcon(data.msgdata.uid);
                        break;
                    }
                }
                break;
            case "gameline":
                var curIndex = _this.getPlayerIndexById(data.msgdata.uid);
                //cc.log(curIndex)
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
        }
    });
};

gameclass.mod_jxnn.prototype.updateroominfo = function(roominfo) {
    this.uid = this.game.modmgr.mod_login.logindata.uid;
    this.roominfo = roominfo;
    for (var i =0;i < this.roominfo.person.length; i++){
        this.roominfo.person[i].ready = false;
        this.roominfo.person[i].robdeal = -1;

        if (this.roominfo.person[i].uid == this.uid){
            this.serverchair = i;
            this.selfdata = this.roominfo.person[i];
        }
    }

    if (this.gameniuniuinfo!=null){
        this.updategameniuniuinfo(this.gameniuniuinfo);
    }
};

gameclass.mod_jxnn.prototype.updategameniuniuinfo = function(gameniuniuinfo) {
    this.gameniuniuinfo = gameniuniuinfo;

    var ZhuangInex=-1;
    for(var i=0;i<this.gameniuniuinfo.info.length;i++) {
        if(this.gameniuniuinfo.info[i].dealer){
            ZhuangInex=i;
        }
    }
    for(var i=0;i<this.gameniuniuinfo.info.length;i++){
        if(this.gameniuniuinfo.info[i].ready){
            this.ready(this.gameniuniuinfo.info[i].uid);
        }else{
            this.gameniuniuinfo.info[i].ready=false;
        }
        if(this.gameniuniuinfo.info[i].robdeal>=0) {
            if(ZhuangInex==-1||ZhuangInex==i)
            this.rob(this.gameniuniuinfo.info[i].uid,this.gameniuniuinfo.info[i].robdeal);
        }
    }
    // if (this.gameniuniuinfo.ready != null) {
    //     for (var i = 0; i < this.gameniuniuinfo.ready.length; i++) {
    //         this.ready(this.gameniuniuinfo.ready[i]);
    //     }
    //
    //     for (var i = 0; i < this.gameniuniuinfo.deal.length; i++) {
    //         this.rob(this.gameniuniuinfo.deal[i].uid,this.gameniuniuinfo.deal[i].ok);
    //     }
    // }else{
    //     for (var i =0;i < this.roominfo.person.length; i++){
    //         this.roominfo.person[i].ready = false;
    //         this.roominfo.person[i].rob = 0;
    //     }
    // }

};

gameclass.mod_jxnn.prototype.ready = function(uid) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            this.roominfo.person[i].ready = true;
        }
    }
};

gameclass.mod_jxnn.prototype.rob = function(uid,num) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            this.roominfo.person[i].robdeal = num;
            this.gameniuniuinfo.info[i].robdeal=num;
            var _obj={};
            _obj.uid=uid;
            _obj.score=num;
            this.view.onGameDeal(_obj);
        }
    }
};

gameclass.mod_jxnn.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_jxnn.prototype.gameready = function() {
    var data = {};
    this.mywebsocket.send("gameready",data);
};

gameclass.mod_jxnn.prototype.gameniuniubegin = function() {
    var data = {};
    this.mywebsocket.send("gameniuniubegin",data);
};
gameclass.mod_jxnn.prototype.bindUI = function(ui) {
    this.view = ui;
}

gameclass.mod_jxnn.prototype.gamebets = function(num) {

    for(var i = 0;i < 5;i++){
        if (i < this.gameniuniuinfo.info.length){
            if (this.uid == this.gameniuniuinfo.info[i].uid){
                this.gameniuniuinfo.info[i].bets = num;
            }
        }
    }

    var data = {"bets":Number(num)};
    this.mywebsocket.send("gamebets",data);
};
gameclass.mod_jxnn.prototype.gamedealer = function(num) {

    for(var i = 0;i < 5;i++){
        if (i < this.gameniuniuinfo.info.length){
            if (this.uid == this.gameniuniuinfo.info[i].uid){
                this.gameniuniuinfo.info[i].robdeal = num;
            }
        }
    }

    var data = {"score":Number(num)};
    this.mywebsocket.send("gamedealer",data);
};
gameclass.mod_jxnn.prototype.gameview = function(num,arrcard) {
    var data = {type:num,view:arrcard};
    this.mywebsocket.send("gameview",data);
};

gameclass.mod_jxnn.prototype.gameend = function() {
    var data = {};
    this.mywebsocket.send("gameend",data);
};

gameclass.mod_jxnn.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};

gameclass.mod_jxnn.prototype.gamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_jxnn.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};


gameclass.mod_jxnn.prototype.getserverchair = function(cur) {
    // cc.log(this.serverchair,cur );
    return (this.serverchair + cur )%5;
};

gameclass.mod_jxnn.prototype.getplayerdata = function(cur) {
    //cc.log("mod_niuniu roominfo");
    //cc.log(this.roominfo);
    var serverchair = this.getserverchair(cur);
    if (serverchair >= 5) {
        serverchair-=5;
    }
    return this.roominfo.person[serverchair];
};

gameclass.mod_jxnn.prototype.getplayerdatabyuid = function(uid) {

    for(var i = 0;i < this.roominfo.person.length; i++ ){
        if(this.roominfo.person[i].uid == uid){
            return this.roominfo.person[i];
        }
    }
};

gameclass.mod_jxnn.prototype.getplayerotherdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair >= this.gameniuniuinfo.info.length) {
        return
    }

    return this.gameniuniuinfo.info[serverchair];
};

gameclass.mod_jxnn.prototype.ongameniuniucard = function(cardArr, all) {
    for (var i =0;i < this.gameniuniuinfo.info.length; i++){

        if (this.gameniuniuinfo.info[i].uid == this.uid){
            for(var j=0;j<cardArr.length;j++){
                this.gameniuniuinfo.info[i].card.push(cardArr[j]);
            }
            if (all) {
                this.gameniuniuinfo.info[i].card = all;
            }
            break;
        }
    }
};

gameclass.mod_jxnn.prototype.getplayernum = function() {
    return this.gameniuniuinfo.info.length;
};

gameclass.mod_jxnn.prototype.getPlayerIndexById  =function(uid){
    for(var i = 0; i< this.roominfo.person.length; i++){
        if(this.roominfo.person[i] && this.roominfo.person[i].uid == uid){
            return i;
        }
    }
}


/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_ddzhu = gameclass.mod_base.extend({
    roominfo:null,
    mywebsocket:null,
    ongameready:null,
    ongameDDZbegin:null,//斗地主开始
    ongameddzstep:null,//下一次出牌玩家
    ongameddzbye:null,
    ongameDDZend:null,//斗地主结束
    ongamebets:null,
    ongameDouble:null,//加倍消息
    onupdateroominfo:null,
    serverchair:null,
    selfdata:null,
    ongameview:null,
    isover:null,
    endinfo:null,
    gamestate:null,
    score:null,
    ongamedealer:null,
    onDDZgamedealer:null,
    onUpdateDifen:null,
    onchat:null,
    chatlst:null,
    uid:null,
    nameArr:[],
    uidArr:[],
    maxStep:null,
    minStep:null,
    roomnum:null,
    CreateRoomType:null,
    GameType:null,
    isReconne:false,
    chaiwang:null,
    isdouble:null,

    isend:false,
    ctor:function () {
        this.isover = false;
        this.isend = false;
        this.gamestate = 0;
        this.chatlst = [];
    },

    bindUI : function(ui) {
        this.view = ui;
    },
});
gameclass.mod_ddzhu.prototype.entergame = function(_roominfo,_mywebsocket){
    //{\"roomid\":351846,\"person\":[{\"openid\":\"59ef6e332117175342041f0e5e90dace\",\"name\":\"游客\",\"imgurl\":\"\",\
    // "ip\":\"221.234.240.2\",\"line\":true}],\"time\":0,\"agree\":[]}"}
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;

    var tmpe = _roominfo.param1;

    this.chaiwang = (parseInt(tmpe / 100 % 10) == 0);
    this.isdouble = (parseInt(tmpe / 1000 % 10) == 1);
    //cc.log(this.chaiwang);
    //cc.log(this.isdouble);
    if( !this.chaiwang ){
        tmpe -= 100;
    }
    if( this.isdouble ){
        tmpe -= 1000;
    }
    //cc.log(tmpe);
    if(tmpe == 0 || tmpe == 1 || tmpe == 2 || tmpe == 10 || tmpe == 11 || tmpe == 12){
        this.CreateRoomType = tmpe;
    }else{
        this.CreateRoomType = 0;
    }

    this.GameType = _roominfo.type;//6：经典斗地主  8：癞子斗地主
    this.updateroominfo(this.roominfo);
    var _this = this;

    this.mywebsocket.setonmsgfunc(function (ws,data) {
        cc.log(data.msghead);
        switch (data.msghead){
            case "login":
                //cc.log("switch login");
            case "gameddzinfo":
                _this.isend = false;
                if(_this.roominfo.type == 6){
                    _this.mainUI.laidipaikuang.setVisible(false);
                }
                if(data.msgdata.begin) {
                    _this.ongameDDZbegin(data.msgdata);
                }
                else if(data.msgdata.dzcard.length > 0 && !data.msgdata.begin ){
                    for(var i = 0 ; i< data.msgdata.info.length ;i++){
                        if(data.msgdata.info[i].ready){
                            _this.ready(data.msgdata.info[i].uid);
                            if( data.msgdata.info[i].uid == _this.uid){
                                _this.ongameready();
                            }
                        }

                    }
                    //cc.log("gameddzinfo---------------------");

                    _this.mainUI.RoomMin = _this.minStep+1;
                    if(_this.mainUI.RoomMin > 1){
                        _this.mainUI.invitebtn.setVisible(false);
                    }
                    //_this.mainUI.updateStepText();
                    _this.mywebsocket.send("gameready",{});
                }
                _this.view.checkSafe(_this.roominfo.person);
                if(data.msgdata.begin){
                    _this.view.safeLayer.btn_safe.setVisible(false);
                    _this.view.showProgress(data.msgdata.curstep);
                }
                break;
            case "gamedouble":
                _this.ongameDouble(data.msgdata);
                    break;
            case "joinroom":
                break;
            case "gameddzbegin":
                _this.isend = false;
                _this.gamestate = 1;
                _this.ongameDDZbegin(data.msgdata);
                //防止最后一个人进来没检测同IP
                if(_this.roominfo.step == 0){
                    _this.view.checkSafe(_this.roominfo.person);
                }
                _this.view.safeLayer.btn_safe.setVisible(false);
                break;
            case "gameddzstep":
                //cc.log("轮换");
                _this.ongameddzstep(data.msgdata);
                _this.view.showProgress(data.msgdata.curstep);
                break;
            case "gameddzbye":
                _this.isover = true;
                _this.mywebsocket.onclosefunc = null;
                _this.endinfo = data.msgdata;
                if (_this.endinfo){
                    if(_this.isend && _this.roominfo.step == _this.roominfo.maxstep){}
                    else {
                        _this.ongameddzbye(_this.endinfo);
                    }
                }
                _this.isend = false;
                break;
            case "roominfo":
                _this.updateroominfo(data.msgdata);
                _this.onupdateroominfo(data.msgdata);
                //cc.log(data.msgdata);
                _this.view.checkSafe(data.msgdata.person);
                break;
            case "joinroomfail":
                _this.isend = false;
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.dissmissroom();
                _this.game.uimgr.showui("gameclass.msgboxui");
                switch (data.msgdata.result) {
                    case 1:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已解散");
                        break;
                    case 2:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已满员");
                        break;
                    default:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房间错误");
                        break;
                }
                break;
            case "exitroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.mywebsocket.onclosefunc = null;
                if (!_this.isover){
                    //cc.log("exitroom isover");
                    _this.isover = false;
                    _this.game.modmgr.mod_login.dissmissroom();
                }
                break;
            case "tickroom":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.backlogin();
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                break;
            case "gameready":
                //cc.log("gameready");

                //_this.gameniuniuinfo.ready[_this.gameniuniuinfo.ready.length] = data.msgdata.uid;

                _this.ready(data.msgdata.uid);

                _this.ongameready();

                break;
            case "gamebets":
                //cc.log("gamebets");

                /*for(var i = 0;i < 3;i++){
                    if (i < _this.gameniuniuinfo.info.length){
                        if (data.msgdata.uid == _this.gameniuniuinfo.info[i].uid){
                            _this.gameniuniuinfo.info[i].bets = data.msgdata.bets;
                        }
                    }
                }*/

                _this.ongamebets(data.msgdata);
                /*
                 msghead = "gamebets"
                 msgdata = {bets int}
                 客户端发送下注消息,bets为下注数量
                 收到的回复可能两种
                 1.
                 msghead = "gamebets"
                 msgdata = {openid string, bets int}
                 * */

                break;
            case "gameddzend":
                _this.isend = true;
                _this.gamestate = 2;
                _this.ongameDDZend(data.msgdata,false);

                break;
            case "gameview":
                _this.ongameview();
                break;
            case "dissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.exitroom",false);
                _this.game.uimgr.uis["gameclass.exitroom"].setData(_this,data.msgdata);
                break;
            case "nodissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("有人不同意解散房间");
                break;
            case "gamedeal":
                _this.rob(data.msgdata.uid,data.msgdata.ok);
                //("gamedeal uid="+data.msgdata.uid);
                _this.ongamedealer(false,data.msgdata.uid);
                break;
            case "gamedealer":
                _this.onUpdateDifen(data.msgdata);
                _this.onDDZgamedealer(data.msgdata.card,data.msgdata.uid,data.msgdata.razz);
                mod_sound.playeffect(g_music["Man_Rob1"], false);//抢地主
                break;
            case "chatroom":
                cc.log("recv cha msg",data.msgdata);
                _this.chatlst[_this.chatlst.length] = data.msgdata;

                if (_this.game.uimgr.uis["gameclass.chatui"])
                    _this.game.uimgr.uis["gameclass.chatui"].pushstr(data.msgdata);

                if(_this.onchat){
                    _this.onchat( data.msgdata);
                }
                break;
            case "lineperson":
                for (var i =0;i < _this.roominfo.person.length; i++){
                    if(_this.roominfo.person[i].uid == data.msgdata.uid){
                        _this.roominfo.person[i].ip = "";
                        if(_this.game.uimgr.uis["gameclass.ddzhutable"] != null) {
                            _this.game.uimgr.uis["gameclass.ddzhutable"].resetIcon(data.msgdata.uid);
                        } else {
                            _this.game.uimgr.uis["gameclass.ddzhutable_wild"].resetIcon(data.msgdata.uid);
                        }
                        break;
                    }
                }
                //_this.view.safeLayer.safeBtncallFunc(_this.roominfo.person);
                break;

            case "gameline":
                var curIndex = _this.getPlayerIndexById(data.msgdata.uid);
                //cc.log(curIndex)
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
        }
    });
};

gameclass.mod_ddzhu.prototype.updateroominfo = function(roominfo) {

    this.uid = this.game.modmgr.mod_login.logindata.uid;

    this.roominfo = roominfo;
    this.maxStep = this.roominfo.maxstep;
    this.minStep = this.roominfo.step;
    this.roomnum = this.roominfo.roomid;
    //cc.log("maxstep="+this.roominfo.maxstep);
    //cc.log("minStep="+this.roominfo.step);
    for (var i =0;i < this.roominfo.person.length; i++){
        this.nameArr[i] = this.roominfo.person[i].name;
        this.uidArr[i] = this.roominfo.person[i].uid;

        if (this.roominfo.person[i].uid == this.game.modmgr.mod_login.logindata.uid){
            this.serverchair = i;
            this.selfdata = this.roominfo.person[i];
        }
    }

    if (this.gameniuniuinfo!=null){
        this.updategameniuniuinfo(this.gameniuniuinfo);
    }
};

gameclass.mod_ddzhu.prototype.updategameniuniuinfo = function(gameniuniuinfo) {
    this.gameniuniuinfo = gameniuniuinfo;

    //this.ready = this.gameniuniuinfo.ready;
    if (this.gameniuniuinfo.ready != null) {
        for (var i = 0; i < this.gameniuniuinfo.ready.length; i++) {
            this.ready(this.gameniuniuinfo.ready[i]);
        }

        for (var i = 0; i < this.gameniuniuinfo.deal.length; i++) {
            this.rob(this.gameniuniuinfo.deal[i].uid,this.gameniuniuinfo.deal[i].ok);
        }
    }else{
        for (var i =0;i < this.roominfo.person.length; i++){
            this.roominfo.person[i].ready = false;
            this.roominfo.person[i].rob = 0;
        }
    }
};

gameclass.mod_ddzhu.prototype.ready = function(uid) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            this.roominfo.person[i].ready = true;
        }
    }
};


gameclass.mod_ddzhu.prototype.getPlayerIndexById = function(uid){
    for(var i = 0; i<  this.roominfo.person.length; i++){
        if(this.roominfo.person[i] && this.roominfo.person[i].uid == uid){
            return i;
        }
    }
};

gameclass.mod_ddzhu.prototype.rob = function(uid,ok) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            if (ok)
                this.roominfo.person[i].rob = 1;
            else
                this.roominfo.person[i].rob = 2;
        }
    }
};

gameclass.mod_ddzhu.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_ddzhu.prototype.gameready = function(ready) {
    var data = {};
    this.mywebsocket.send("gameready",data);
};
gameclass.mod_ddzhu.prototype.gamesteps = function(cards) {
    var data = {"cards":cards};
    this.mywebsocket.send("gamesteps",data);
};
gameclass.mod_ddzhu.prototype.gamesteps_wild = function(cards,abscards) {
    var data = {"cards":cards,"abscards":abscards};
    this.mywebsocket.send("gamesteps",data);
};
gameclass.mod_ddzhu.prototype.gameniuniubegin = function() {
    var data = {};
    this.mywebsocket.send("gameniuniubegin",data);
};


gameclass.mod_ddzhu.prototype.gamebets = function(num) {

    /*for(var i = 0;i < 4;i++){
        if (i < this.gameniuniuinfo.info.length){
            if (this.game.modmgr.mod_login.logindata.uid == this.gameniuniuinfo.info[i].uid){
                this.gameniuniuinfo.info[i].bets = num;
            }
        }
    }*/

    var data = {"bets":Number(num)};
    this.mywebsocket.send("gamebets",data);
};
//是否加倍消息
gameclass.mod_ddzhu.prototype.gamedouble = function(isdouble) {
    var data = {"double":isdouble};
    this.mywebsocket.send("gamedouble",data);
};
gameclass.mod_ddzhu.prototype.gameview = function() {
    var data = {};
    this.mywebsocket.send("gameview",data);
};

gameclass.mod_ddzhu.prototype.gameend = function() {
    var data = {};
    this.mywebsocket.send("gameend",data);
};

gameclass.mod_ddzhu.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};

gameclass.mod_ddzhu.prototype.gamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_ddzhu.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};


gameclass.mod_ddzhu.prototype.getserverchair = function(cur) {
    //cc.log(this.serverchair);
    return (this.serverchair + cur )%3;
};


gameclass.mod_ddzhu.prototype.getplayerdata = function(cur) {
    var serverchair = this.getserverchair(cur);
    //cc.log("serverchair"+serverchair);
    if (serverchair > this.roominfo.person.length) {
        return
    }
    /*cc.log("this.roominfo.person[serverchair]");
    cc.log(this.roominfo.person[serverchair]);*/
    return this.roominfo.person[serverchair];
};

gameclass.mod_ddzhu.prototype.getplayerdatabyuid = function(uid) {

    for(var i = 0;i < this.roominfo.person.length; i++ ){
        if(this.roominfo.person[i].uid == uid){
            return this.roominfo.person[i];
        }
    }
};

gameclass.mod_ddzhu.prototype.getplayerotherdata = function(cur) {
    var serverchair = this.getserverchair(cur);
    if(this.gameniuniuinfo) {
        if (serverchair > this.gameniuniuinfo.info.length) {
            return
        }

        return this.gameniuniuinfo.info[serverchair];
    }
    return;
};

gameclass.mod_ddzhu.prototype.ongameniuniucard = function(card) {
    for (var i =0;i < this.gameniuniuinfo.info.length; i++){

        if (this.gameniuniuinfo.info[i].uid == this.game.modmgr.mod_login.logindata.uid){
            this.gameniuniuinfo.info[i].card[4] = card;
        }
    }
};

gameclass.mod_ddzhu.prototype.getplayernum = function() {
    return this.gameniuniuinfo.info.length;
};


/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_zjh = gameclass.mod_base.extend({
    roominfo:null,
    mywebsocket:null,
    ongameready:null,
    ongameniuniubegin:null,
    ongameniuniuinfo:null,
    ongamebets:null,
    ongamecompare:null,
    ongameniuniuend:null,
    onupdateroominfo:null,
    serverchair:null,
    selfdata:null,
    ongameniuniucardui:null,
    ongameview:null,
    isover:null,
    endinfo:null,
    gamestate:null,
    score:null,
    ongamedealer:null,
    onchat:null,
    chatlst:null,

    lastTotal:0,
    ctor:function () {
        this.isover = false;
        this.gamestate = 0;
        this.chatlst = [];
    },

    bindUI : function(ui) {
        this.view = ui;
    },
});

gameclass.mod_zjh.prototype.entergame = function(_roominfo,_mywebsocket){
    //{\"roomid\":351846,\"person\":[{\"openid\":\"59ef6e332117175342041f0e5e90dace\",\"name\":\"游客\",\"imgurl\":\"\",\
    // "ip\":\"221.234.240.2\",\"line\":true}],\"time\":0,\"agree\":[]}"}
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;

    this.updateroominfo(this.roominfo);

    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws,data) {
        switch (data.msghead){
            case "roominfo":
                _this.updateroominfo(data.msgdata);
                _this.onupdateroominfo(data.msgdata);
                _this.view.checkSafe(data.msgdata.person);
                break;
            case "joinroomfail":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.dissmissroom();
                _this.game.uimgr.showui("gameclass.msgboxui");
                switch (data.msgdata.result) {
                    case 1:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已解散");
                        break;
                    case 2:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已满员");
                        break;
                    default:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房间错误");
                        break;
                }
                break;
            case "exitroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                if (!_this.isover){
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                }
                break;
            case "gameniuniubye":

                _this.endinfo = data.msgdata.info;
                if (_this.endinfo != null){
                    _this.isover = true;
                    _this.mywebsocket.onclosefunc = null;
                    _this.ongameniuniuend(data,true);
                }

                break;
            case "tickroom":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.backlogin();
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                break;
            case "gameready":
                cc.log("gameready");
                //_this.hasSendSee = false;
                _this.gameniuniuinfo.ready[_this.gameniuniuinfo.ready.length] = data.msgdata.uid;

                _this.ready(data.msgdata.uid);

                _this.ongameready(data);

                break;
            case "gamezjhbegin":
                cc.log("gamezjhbegin");

                _this.roominfo.step += 1;
                for(var i = 0;i < 5;i++){
                    if (i < _this.gameniuniuinfo.info.length){
                            _this.gameniuniuinfo.info[i].bets = 0;
                    }
                }
                _this.gamestate = 1;
                _this.updategameniuniuinfo(data.msgdata);
                _this.ongameniuniubegin(data);
                _this.view.safeLayer.btn_safe.setVisible(false);

                /*
                * msgdata =
                 {
                 begin bool = 是否开始
                 ready []string = 准备的人,begin = false的时候有用
                 info []node = 游戏数据，begin = true的时候有用
                 }

                 * */
                break;
            case "gamezjhinfo":
                cc.log("gamezjhinfo");

                _this.updategameniuniuinfo(data.msgdata);
                _this.ongameniuniuinfo(_this.gameniuniuinfo);
                _this.view.checkSafe(_this.roominfo.person);
                if(data.msgdata.begin){
                    _this.view.safeLayer.btn_safe.setVisible(false);
                }
                /*
                 msgdata =
                 {
                 begin bool = 是否开始
                 ready []string = 准备的人,begin = false的时候有用
                 info []node = 游戏数据，begin = true的时候有用
                 }

                 * */
                break;
            case "gamecompare":
                for(var i = 0;i < 5;i++){
                    if (i < _this.gameniuniuinfo.info.length){
                        if (data.msgdata.uid == _this.gameniuniuinfo.info[i].uid){
                            _this.gameniuniuinfo.info[i].bets = data.msgdata.addpoint;
                            _this.gameniuniuinfo.info[i].allbets = data.msgdata.allbets;
                        }

                        if (data.msgdata.destuid == _this.gameniuniuinfo.info[i].uid  && data.msgdata.win){
                            _this.gameniuniuinfo.info[i].lose = true
                        }

                        if (data.msgdata.uid == _this.gameniuniuinfo.info[i].uid  && !data.msgdata.win){
                            _this.gameniuniuinfo.info[i].lose = true
                        }
                    }
                }
                mod_sound.playeffect(g_music.fire,false);
                _this.gameniuniuinfo.curop = data.msgdata.opuid;
                _this.gameniuniuinfo.round = data.msgdata.round;
                _this.gameniuniuinfo.point = data.msgdata.point;
                _this.gameniuniuinfo.allpoint = data.msgdata.allpoint;
                _this.ongamecompare(data.msgdata);
                break;
            case "gamediscard":
                for(var i = 0;i < 5;i++){
                    if (i < _this.gameniuniuinfo.info.length){
                        if (data.msgdata.uid == _this.gameniuniuinfo.info[i].uid){
                            _this.gameniuniuinfo.info[i].discard = true
                        }
                    }
                }
                for (var i =0;i < _this.roominfo.person.length; i++) {
                    if (_this.roominfo.person[i].uid == data.msgdata.uid) {
                        if(_this.roominfo.person[i].sex != 0){
                            mod_sound.playeffect(g_music.f_giveup,false);
                        }else{
                            mod_sound.playeffect(g_music.m_giveup,false);
                        }
                    }
                }
                _this.gameniuniuinfo.curop = data.msgdata.opuid;
                _this.gameniuniuinfo.round = data.msgdata.round;
                _this.ongamebets();
                break;
            case "gamebets":
                cc.log("gamebets");
                // -1表示弃牌 0表示看牌 1表示跟住 2表示加注

                for(var i = 0;i < 5;i++){
                    if (i < _this.gameniuniuinfo.info.length){
                        if (data.msgdata.uid == _this.gameniuniuinfo.info[i].uid){

                                _this.gameniuniuinfo.info[i].bets = data.msgdata.addpoint;
                            _this.gameniuniuinfo.info[i].allbets = data.msgdata.allbets;
                        }
                    }
                }


                for (var i =0;i < _this.roominfo.person.length; i++) {
                    if (_this.roominfo.person[i].uid == data.msgdata.uid) {

                        if (data.msgdata.bets == 1){
                            if(_this.roominfo.person[i].sex != 0){
                                mod_sound.playeffect(g_music.f_follow1,false);
                            }else{
                                mod_sound.playeffect(g_music.m_follow1,false);
                            }
                        }
                        //else{
                        //    if(_this.roominfo.person[i].sex != 0){
                        //        mod_sound.playeffect(g_music.f_add,false);
                        //    }else{
                        //        mod_sound.playeffect(g_music.m_add,false);
                        //    }
                        //}
                        else if(data.msgdata.bets == 2){
                            if(_this.roominfo.person[i].sex != 0){
                                mod_sound.playeffect(g_music.f_add,false);
                            }else{
                                mod_sound.playeffect(g_music.m_add,false);
                            }
                        }

                    }
                }

                _this.gameniuniuinfo.curop = data.msgdata.opuid;
                _this.gameniuniuinfo.round = data.msgdata.round;
                _this.gameniuniuinfo.point = data.msgdata.point;
                _this.gameniuniuinfo.allpoint = data.msgdata.allpoint;

                _this.ongamebets(data.msgdata.uid);
                /*
                 msghead = "gamebets"
                 msgdata = {bets int}
                 客户端发送下注消息,bets为下注数量
                 收到的回复可能两种
                 1.
                 msghead = "gamebets"
                 msgdata = {openid string, bets int}

                 * */

                break;
            case "gameniuniuend":

                _this.gameniuniuinfo.round = data.msgdata.round;
                _this.gameniuniuinfo.point = data.msgdata.point;
                _this.gameniuniuinfo.allpoint = data.msgdata.allpoint;

                for (var i =0;i < _this.roominfo.person.length; i++){
                    _this.roominfo.person[i].ready = false;
                    _this.roominfo.person[i].rob = 0;
                }

                _this.gamestate = 2;
                cc.log("gameniuniuend");
                _this.gameniuniuinfo.info = data.msgdata.info;
                _this.updategameniuniuinfo(_this.gameniuniuinfo);
                _this.ongameniuniuend(data,false);
                /*
                * msghead = "gameniuniuend"
                 msgdata =
                 {
                 info []node
                 }

                 刚忘了写node的结构，这个和gameniuniuinfo里的node是一样的
                 node
                 {
                 openid   string
                 card    []int    //! 手牌，未结算的时候，其他人最后一张牌是0
                 bets int //! 下注
                 dealer bool  //! 是否是庄家
                 score  int   //! 这局结算分数
                 }

                 * */
                break;
            case "gameniuniucard":
                _this.ongameniuniucard(data.msgdata.card, data.msgdata.all);
                _this.ongameniuniucardui();
                break;
            case "gameview":
                //if ( data.msgdata.uid  == _this.game.modmgr.mod_login.logindata.uid){
                    for (var i =0;i < _this.gameniuniuinfo.info.length; i++){
                        if(_this.gameniuniuinfo.info[i].uid == data.msgdata.uid){
                            _this.gameniuniuinfo.info[i].card = data.msgdata.card;
                            _this.gameniuniuinfo.info[i].open = true;
                        }
                    }

                    for (var i =0;i < _this.roominfo.person.length; i++) {
                        if (_this.roominfo.person[i].uid == data.msgdata.uid) {
                            if(_this.roominfo.person[i].sex != 0){
                                //if(_this.hasSendSee){
                                    mod_sound.playeffect(g_music.f_see,false);
                                //}
                            }else{
                                //if(_this.hasSendSee){
                                    mod_sound.playeffect(g_music.m_see,false);
                                //}
                            }
                        }
                    }

                //}
                _this.ongameview();
                break;
            case "dissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.exitroom",false);
                _this.game.uimgr.uis["gameclass.exitroom"].setData(_this,data.msgdata);
                break;
            case "nodissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("有人不同意解散房间");
                break;
            case "gamedeal":
                _this.rob(data.msgdata.uid,data.msgdata.ok);
                _this.ongamedealer(false);
                break;
            case "gamedealer":
                for (var i =0;i < _this.gameniuniuinfo.info.length; i++){
                    if(_this.gameniuniuinfo.info[i].uid == data.msgdata.uid){
                        _this.gameniuniuinfo.info[i].dealer = true;
                        _this.rob(data.msgdata.uid,true);
                    }
                }
                _this.ongamedealer(true);
                break;
            case "chatroom":
                _this.chatlst[_this.chatlst.length] = data.msgdata;

                if (_this.game.uimgr.uis["gameclass.chatui"])
                    _this.game.uimgr.uis["gameclass.chatui"].pushstr(data.msgdata);

                if(_this.onchat){
                    _this.onchat( data.msgdata);
                }
                break;
            case "lineperson":
                for (var i =0;i < _this.roominfo.person.length; i++){
                    if(_this.roominfo.person[i].uid == data.msgdata.uid){
                        _this.roominfo.person[i].ip = "";
                        cc.log("lineperson");
                        _this.game.uimgr.uis["gameclass.zjhtable"].resetIcon(data.msgdata.uid);
                        break;
                    }
                }
                break;

            case "gameline":
                var curIndex = _this.getPlayerIndexById(data.msgdata.uid);
                //cc.log(curIndex)
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
        }
    });
};

gameclass.mod_zjh.prototype.updateroominfo = function(roominfo) {
    this.roominfo = roominfo;
    for (var i =0;i < this.roominfo.person.length; i++){
        this.roominfo.person[i].ready = false;
        this.roominfo.person[i].rob = 0;

        if (this.roominfo.person[i].uid == this.game.modmgr.mod_login.logindata.uid){
            this.serverchair = i;
            this.selfdata = this.roominfo.person[i];
        }
    }

    if (this.gameniuniuinfo!=null){
        this.updategameniuniuinfo(this.gameniuniuinfo);
    }
};

gameclass.mod_zjh.prototype.updategameniuniuinfo = function(gameniuniuinfo) {
    this.gameniuniuinfo = gameniuniuinfo;

    //this.ready = this.gameniuniuinfo.ready;
    if (this.gameniuniuinfo.ready != null) {
        for (var i = 0; i < this.gameniuniuinfo.ready.length; i++) {
            this.ready(this.gameniuniuinfo.ready[i]);
        }

    }else{
        for (var i =0;i < this.roominfo.person.length; i++){
            this.roominfo.person[i].ready = false;
            this.roominfo.person[i].rob = 0;
        }
    }

};

gameclass.mod_zjh.prototype.ready = function(uid) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            this.roominfo.person[i].ready = true;
        }
    }
};

gameclass.mod_zjh.prototype.rob = function(uid,ok) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            if (ok)
                this.roominfo.person[i].rob = 1;
            else
                this.roominfo.person[i].rob = 2;
        }
    }
};

gameclass.mod_zjh.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_zjh.prototype.gameready = function() {
    var data = {};
    this.mywebsocket.send("gameready",data);
};

gameclass.mod_zjh.prototype.gameniuniubegin = function() {
    var data = {};
    this.mywebsocket.send("gameniuniubegin",data);
};


gameclass.mod_zjh.prototype.gamebets = function(num) {
    var data = {"bets":Number(num)};
    this.mywebsocket.send("gamebets",data);
};

gameclass.mod_zjh.prototype.gamecompare = function(index) {

    playerdata = this.getplayerdata(index)
    if (index >0 && playerdata != null){
        var destuid = playerdata.uid;
        var data = {"destuid":Number(destuid)};
        this.mywebsocket.send("gamecompare",data);
    }

};

gameclass.mod_zjh.prototype.gameview = function() {
    var data = {};
    this.mywebsocket.send("gameview",data);
};

gameclass.mod_zjh.prototype.gameend = function() {
    var data = {};
    this.mywebsocket.send("gameend",data);
};

gameclass.mod_zjh.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};

gameclass.mod_zjh.prototype.gamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_zjh.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};


gameclass.mod_zjh.prototype.getserverchair = function(cur) {
    return (this.serverchair + cur )%5;
};


gameclass.mod_zjh.prototype.getplayerdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair > this.roominfo.person.length) {
        return
    }

    return this.roominfo.person[serverchair];
};

gameclass.mod_zjh.prototype.getplayerdatabyuid = function(uid) {

    for(var i = 0;i < this.roominfo.person.length; i++ ){
        if(this.roominfo.person[i].uid == uid){
            return this.roominfo.person[i];
        }
    }
};

gameclass.mod_zjh.prototype.getplayerotherdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair >= this.gameniuniuinfo.info.length) {
        return
    }

    return this.gameniuniuinfo.info[serverchair];
};

gameclass.mod_zjh.prototype.ongameniuniucard = function(card, all) {
    for (var i =0;i < this.gameniuniuinfo.info.length; i++){

        if (this.gameniuniuinfo.info[i].uid == this.game.modmgr.mod_login.logindata.uid){
            this.gameniuniuinfo.info[i].card[4] = card;
            if (all) {
                this.gameniuniuinfo.info[i].card = all;
            }
            break;
        }
    }
};

gameclass.mod_zjh.prototype.getplayernum = function() {
    return this.gameniuniuinfo.info.length;
};

gameclass.mod_zjh.prototype.getPlayerIndexById  =function(uid){
    for(var i = 0; i< this.roominfo.person.length; i++){
        if(this.roominfo.person[i] && this.roominfo.person[i].uid == uid){
            return i;
        }
    }
}


/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_sdb = gameclass.mod_base.extend({
    roominfo:null,
    mywebsocket:null,
    ongameready:null,
    ongamebets:null,
    ongamecompare:null,
    onupdateroominfo:null,
    serverchair:null,
    selfdata:null,
    ongameview:null,
    isover:null,
    isend:false,
    endinfo:null,
    gamestate:null,
    score:null,
    ongamedealer:null,
    chatlst:null,
    ctor:function () {
        this.isover = false;
        this.isend = false;
        this.gamestate = 0;
        this.chatlst = [];
    }
});

gameclass.mod_sdb.prototype.entergame = function(_roominfo,_mywebsocket){
    //{\"roomid\":351846,\"person\":[{\"openid\":\"59ef6e332117175342041f0e5e90dace\",\"name\":\"游客\",\"imgurl\":\"\",\
    // "ip\":\"221.234.240.2\",\"line\":true}],\"time\":0,\"agree\":[]}"}
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;
    this.updateroominfo(this.roominfo);

    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws,data) {
        //cc.log(data);
        switch (data.msghead){
            case "roominfo":

                // _this.updateroominfo(data.msgdata);
                //_this.onupdateroominfo(data.msgdata);

                _this.joinRoomInfo(data.msgdata);
                break;
            case "joinroomfail":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.dissmissroom();
                _this.game.uimgr.showui("gameclass.msgboxui");
                switch (data.msgdata.result) {
                    case 1:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已解散");
                        break;
                    case 2:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已满员");
                        break;
                    default:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房间错误");
                        break;
                }
                break;
            case "exitroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                if (!_this.isover){
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                }
                break;

            case "tickroom":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.backlogin();
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                break;
            case "gameready":
                cc.log("gameready");

                _this.ready(data.msgdata.uid);

                // _this.ongameready(data);

                break;
            case "gametenhalfbegin":
                _this.isend = false;
                cc.log("gametenhalfbegin");
                _this.gameBegin(data.msgdata);
                _this.view.safeLayer.btn_safe.setVisible(false);
                break;

            case "gametenhalfplay":

                _this.curPlayerUid = data.msgdata.curstep;
                var curIndex = _this.getPlayerIndexById(data.msgdata.curstep);
                var sendIndex =  _this.getPlayerIndexById(data.msgdata.uid);

                if(curIndex !== sendIndex){//换玩家了
                    _this.view.haveCard_Btn.setEnabled(false);
                    _this.view.haveCard_Btn.setBright(false);
                    _this.view.dontCard_Btn.setEnabled(false);
                    _this.view.dontCard_Btn.setBright(false);
                    mod_sound.playeffect(g_music.sdb_dontCard,false);
                    _this.view.setCurPlayer( curIndex );
                    if(data.msgdata.curstep != _this.bankerUid){
                        _this.view.openBetLayout();
                    }else {
                        if(curIndex == 0){
                            _this.view.haveCard_Btn.setEnabled(true);
                            _this.view.haveCard_Btn.setBright(true);
                            _this.view.dontCard_Btn.setEnabled(true);
                            _this.view.dontCard_Btn.setBright(true);
                        }
                    }

                }

                if(data.msgdata.card.length > 1 && curIndex == sendIndex){
                    mod_sound.playeffect(g_music.sdb_wantCard,false);
                }
                var cardType = -1;
                //是否需要计算牌型
                if( data.msgdata.card[0] > 0 ){
                    cardType = gameclass.mod_sdb.bombComputer( data.msgdata.card );
                    //判断是自己
                    if(curIndex == 0 ){
                        if(curIndex == sendIndex){
                            _this.view.haveCard_Btn.setEnabled(cardType === 1);
                            _this.view.haveCard_Btn.setBright(cardType === 1);
                        }
                    }
                    if( cardType !== 1 && ( sendIndex !== 0 && sendIndex !== _this.bankerUid) ){
                        _this.view.runPlayerEndAction(sendIndex);
                        // alert('闲家大牌');
                        //要亮闲家牌了
                        /***
                         *  大家来填空
                         *
                         * **/
                    }

                }

                //发牌
                _this.view.sendCards( sendIndex , data.msgdata.card , function(){
                    if( data.msgdata.card[0] > 0 &&  curIndex == 0 && curIndex == sendIndex && cardType == 0){
                        _this.view.runSelfCardType();
                    }
                    if(sendIndex == 0 && curIndex !== sendIndex){
                        _this.view.runSelfCardType();
                    }

                } );

                break;
            case "gametenhalfend":
                _this.isend = true;
                _this.isReady = false;
                for(var  i = 0 ; i < data.msgdata.info.length ;i++){
                    for(var j=0;j<_this.persons.length ; j++){
                        if(_this.persons[j] && data.msgdata.info[i].uid == _this.persons[j].uid ){
                            data.msgdata.info[i].name = _this.persons[j].name;
                            data.msgdata.info[i].head =  _this.persons[j].imgurl;
                        }
                    }

                }
                var arr = _this.offsetPlayer(data.msgdata.info);
                _this.view.gameEnd(arr,data.msgdata.info,_this.roominfo);
                for(var j=0;j<_this.persons.length ; j++){
                    if(_this.persons[j]  ){
                        _this.persons[j].ready = false;
                    }
                }

                break;

            case "gametenhalfbye":
                _this.isover=true;
                _this.mywebsocket.onclosefunc = null;

                for(var  i = 0 ; i < data.msgdata.info.length ;i++){
                    for(var j=0;j<_this.persons.length ; j++){
                        if(_this.persons[j] && data.msgdata.info[i].uid == _this.persons[j].uid ){
                            data.msgdata.info[i].name = _this.persons[j].name;
                            data.msgdata.info[i].head =  _this.persons[j].imgurl;
                        }
                    }
                }
                _this.endinfo = data.msgdata.info;
                if (_this.endinfo){
                    if(_this.isend && _this.roominfo.step == _this.roominfo.maxStep){}
                    else {
                        _this.view.gameBye();
                    }
                }
                _this.isend = false;
                break;

            case "gametenhalfinfo":

                _this.isend = false;
                _this.updateGameInfo(data.msgdata);
                if(data.msgdata.begin){
                    _this.view.safeLayer.btn_safe.setVisible(false);
                }

                break;
            case "gamebets":

                cc.log("gamebets");
                //cc.log(data.msgdata);
                _this.view.showBetImg(_this.getPlayerIndexById(data.msgdata.uid),data.msgdata.bets ,data.msgdata.card );

                break;

            case "dissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.exitroom",false);
                _this.game.uimgr.uis["gameclass.exitroom"].setData(_this,data.msgdata);
                break;
            case "nodissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("有人不同意解散房间");
                break;
            case "gamedeal":
                _this.rob(data.msgdata.uid,data.msgdata.ok);
                _this.ongamedealer(false);
                break;

            case "chatroom":
                _this.chatlst[_this.chatlst.length] = data.msgdata;

                if (_this.game.uimgr.uis["gameclass.chatui"])
                    _this.game.uimgr.uis["gameclass.chatui"].pushstr(data.msgdata);
                _this.getPlayerIndexById(data.msgdata.uid);
                _this.view.onChat(_this.getPlayerIndexById(data.msgdata.uid),data.msgdata);

                break;
            case "lineperson":
            case "gameline":
                var curIndex = _this.getPlayerIndexById(data.msgdata.uid);
                //cc.log(curIndex)
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
        }
    });
};

/*
 * gametenhalfbegin data
 * */

gameclass.mod_sdb.prototype.gameBegin  =function(data){

    if(!data.begin){
        return false;
    }
    //cc.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk" , this.isReady);
    this.gameStart = this.isReady = true;

    this.roominfo.step += 1;
    this.curPlayerUid = data.curstep;
    this.view.setCurPlayer(this.getPlayerIndexById(data.curstep));
    var playerInfo  =  this.offsetPlayer(data.info);
    this.bankerUid = 0;
    for(var i=0; i<playerInfo.length; i++){
        if(playerInfo[i] && playerInfo[i].dealer){
            this.bankerUid = playerInfo[i].uid;
        }
    }

    this.view.gameReady(playerInfo,this.roominfo);
    //this.banker =
}


/*
 * 发送玩家选择的倍数
 * */
gameclass.mod_sdb.prototype.setPlayerBet  =function(bet){
    var data = {
        uid:this.curPlayerUid,
        bets:bet,
    };
    this.mywebsocket.send("gamebets",data);
}

/*
 * 发送玩家是否选择要牌
 * */
gameclass.mod_sdb.prototype.askCards =function(bAsk){

    var data = {
        type:bAsk ? 0 : 1
    };
    this.mywebsocket.send("gameplay",data) ;
}


gameclass.mod_sdb.prototype.getPlayerIndexById  =function(uid){
    for(var i = 0; i< this.persons.length; i++){
        if(this.persons[i] && this.persons[i].uid == uid){
            return i;
        }
    }
}


gameclass.mod_sdb.prototype.bindUI = function(ui) {
    this.view = ui;
}
gameclass.mod_sdb.prototype.updateroominfo = function(roominfo) {

    this.roominfo = {
        agree:roominfo.agree,
        maxStep:roominfo.maxstep,
        bankerType:parseInt(roominfo.param1/100),           //房主庄或赢家庄
        mulripleType:parseInt((roominfo.param1/10)%10),
        betType:parseInt(roominfo.param1%10),               //十点半x2或十点半x3
        roomid:roominfo.roomid,
        step:roominfo.step,
        time:roominfo.time,
        type:roominfo.type,
        person:roominfo.person
    };

    //cc.log(this.roominfo);

    this.persons =  roominfo.person;
    this.getCurPlayerIndex(this.persons,this.game.modmgr.mod_login.logindata.uid);
    this.persons  =  this.offsetPlayer(this.persons);
    if (this.roominfo.time != 0){
        this.game.uimgr.showui("gameclass.exitroom",false);
        this.game.uimgr.uis["gameclass.exitroom"].setData(this,this.roominfo);
    }
};

gameclass.mod_sdb.prototype.joinRoomInfo = function(data){
    //cc.log('joinRoomInfo');
    //cc.log(data.person);
    this.roominfo.person = data.person;
    this.getCurPlayerIndex( data.person,this.game.modmgr.mod_login.logindata.uid);
    data = this.offsetPlayer(data.person);
    this.view.checkSafe(this.roominfo.person);

    for(var i=0 ;i< data.length ;i++ ){
        for(var j=0 ;j<  this.persons.length ;j++){
            if(this.persons[j] && data[i] &&  data[i].uid ==  this.persons[j].uid ){
                data[i].ready = this.persons[j].ready;
                //cc.log( i + ":::::::::::::" + this.persons[j].ready);
            }
        }
    }
    for(var i=0 ;i< data.length ;i++ ){
        if(data[i]){
            if(!data[i].ready){
                data[i].ready = false;
            }
            if(this.isReady){
                data[i].ready = false;
            }
        }
    }
    this.persons = data;

    this.view.updatePlayerinfo(this.persons);
    this.view.refreshStep(this.roominfo);
};

gameclass.mod_sdb.prototype.isEnd = function(){
    return this.roominfo.step >= this.roominfo.maxStep;
}

gameclass.mod_sdb.bombComputer = function(cards){

    var point = 0;
    for( var i =0 ;i<  cards.length ; i++){
        var temp =  parseInt( cards[i] / 10);
        temp = temp > 10 ? 0.5 : temp;
        point +=temp;
    }
    var type = 0;  // 0 :爆牌  1：高牌   2：十点半  3: 五小  4：花五小  5：天王
    if( point >= 11 ){
        type = 0;;
    }else if(point <= 10 && cards.length < 5){
        type = 1;
    }else if(point > 10  &&  cards.length < 5){
        type = 2;
    }else if(point >= 3  && point <= 10 &&  cards.length == 5){
        type = 3;
    }else if(point < 3 && cards.length == 5 ){
        type = 4;
    }else if(point > 10 && cards.length == 5 ){
        type = 5;
    }
    return type;
}

/*
 *通过ID 找到索引位置
 * */
gameclass.mod_sdb.prototype.getCurPlayerIndex = function(arr,uid){

    for(var x = 0;x<  5 ;x++){
        if(!arr[x]){
            continue;
        }
        if(arr[x].uid == uid){
            this.curPlayerIndex = x;
            break;
        }
    }
    return this.curPlayerIndex;
}

/*
 * 将进房间的玩家 顺序排序
 * */
gameclass.mod_sdb.prototype.offsetPlayer = function(arr){
    var player = [];

    for (var x= 0;x< 5 ;x++ ){
        player[(5 + x - this.curPlayerIndex) %5 ] = arr[x] ? arr[x] : null ;
    }
    return player;
}


gameclass.mod_sdb.prototype.updateGameInfo = function(gameInfo) {
    this.gameInfo = gameInfo;
    var _this=this;
    this.view.checkSafe(this.roominfo.person);
    if(this.gameInfo.ready.length > 0 ){
        cc.each(this.gameInfo.ready,function(o){
            var index = _this.getPlayerIndexById(o);
            if(_this.persons[index]){
                _this.persons[index].ready = true;
            }

        });
    }else{
        for(var  i = 0; i< this.persons.length ; i++){
            if( this.persons[i]){
                this.persons[i].ready = false;
            }
        }
    }
    this.view.updatePlayerinfo(this.persons);
    this.view.setRoomInfo(this.roominfo);
    if(gameInfo.begin || this.roominfo.step !== 0 ){
        this.reconnection();
        return;
    }

};

gameclass.mod_sdb.prototype.reconnection = function(){

    if(this.gameInfo.begin){
        for(var  i = 0; i< this.persons.length ; i++){
            if( this.persons[i]){
                this.persons[i].ready = false;
            }
        }
        this.roominfo.step --;
        this.gameBegin(this.gameInfo);
    }else {
        var playerInfo  =  this.offsetPlayer(this.gameInfo.info);
        this.bankerUid = 0;
        for(var i=0; i<playerInfo.length; i++){
            if(playerInfo[i] && playerInfo[i].dealer){
                this.bankerUid = playerInfo[i].uid;
            }
        }
        this.view.reconnection(playerInfo,this.roominfo , this.persons);
    }


};





gameclass.mod_sdb.prototype.ready = function(uid) {


    for (var i =0;i < this.persons.length; i++){
        if (this.persons[i] && this.persons[i].uid == uid){
            this.persons[i].ready = true;
            this.view.showReady(i);
        }
    }

};

gameclass.mod_sdb.prototype.rob = function(uid,ok) {
    for (var i =0;i < this.roominfo.person.length; i++){
        if (this.roominfo.person[i].uid == uid){
            if (ok)
                this.roominfo.person[i].rob = 1;
            else
                this.roominfo.person[i].rob = 2;
        }
    }
};

gameclass.mod_sdb.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_sdb.prototype.gameready = function() {
    var data = {};
    this.mywebsocket.send("gameready",data);
};



gameclass.mod_sdb.prototype.gamebets = function(num) {


    var data = {"bets":Number(num)};
    this.mywebsocket.send("gamebets",data);
};

gameclass.mod_sdb.prototype.gamecompare = function(index) {

    playerdata = this.getplayerdata(index)
    if (index >0 && playerdata != null){
        var destuid = playerdata.uid;
        var data = {"destuid":Number(destuid)};
        this.mywebsocket.send("gamecompare",data);
    }

};

gameclass.mod_sdb.prototype.gameview = function() {
    var data = {};
    this.mywebsocket.send("gameview",data);
};

gameclass.mod_sdb.prototype.gameend = function() {
    var data = {};
    this.mywebsocket.send("gameend",data);
};

gameclass.mod_sdb.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};

gameclass.mod_sdb.prototype.gamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_sdb.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};


gameclass.mod_sdb.prototype.getserverchair = function(cur) {
    return (this.serverchair + cur )%5;
};


gameclass.mod_sdb.prototype.getplayerdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair > this.roominfo.person.length) {
        return
    }

    return this.roominfo.person[serverchair];
};

gameclass.mod_sdb.prototype.getplayerdatabyuid = function(uid) {

    for(var i = 0;i < this.roominfo.person.length; i++ ){
        if(this.roominfo.person[i].uid == uid){
            return this.roominfo.person[i];
        }
    }
};




gameclass.mod_ttz = gameclass.mod_base.extend({
    roominfo:null,
    mywebsocket:null,
    ongameready:null,
    ongamebets:null,
    ongamecompare:null,
    onupdateroominfo:null,
    serverchair:null,
    selfdata:null,
    ongameview:null,
    isover:null,
    isoneover:false,
    endinfo:null,
    gamestate:null,
    score:null,
    ongamedealer:null,
    chatlst:null,
    persons:null,
    beginchair:0,
    byeData:null,
    ctor:function () {
        this.isover = false;
        this.gamestate = 0;
        this.chatlst = [];
    }
});

gameclass.mod_ttz.prototype.entergame = function(_roominfo,_mywebsocket){

    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;
    this.updateroominfo(this.roominfo);
    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws,data) {
        cc.log(data.msghead);
        cc.log(data.msgdata);
        switch (data.msghead){
            case "roominfo":

                _this.joinRoomInfo(data.msgdata);
                break;
            case "joinroomfail":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.dissmissroom();
                _this.game.uimgr.showui("gameclass.msgboxui");
                switch (data.msgdata.result) {
                    case 1:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已解散");
                        break;
                    case 2:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已满员");
                        break;
                    default:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房间错误");
                        break;
                }
                break;
            case "exitroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                if (!_this.isover){
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                }
                //else{
                //    _this.game.uimgr.closeui("gameclass.ttzresultoneui");
                //    _this.game.uimgr.closeui("gameclass.ttzallresultui");
                //    _this.game.uimgr.showui("gameclass.ttzallresultui").setmodttz( _this.byeData);
                //}
                break;
            case "tickroom":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.backlogin();
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                break;
            case "gameready":
                cc.log("gameready");
                _this.ready(data.msgdata.uid);
                // _this.ongameready(data);

                break;
            case "dissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.exitroom",false);
                _this.game.uimgr.uis["gameclass.exitroom"].setData(_this,data.msgdata);
                break;
            case "nodissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("有人不同意解散房间");
                break;
            case "chatroom":
                _this.chatlst[_this.chatlst.length] = data.msgdata;

                if (_this.game.uimgr.uis["gameclass.chatui"])
                    _this.game.uimgr.uis["gameclass.chatui"].pushstr(data.msgdata);
                //_this.getchairbyuid(data.msgdata.uid);
                _this.view.onChat(_this.getchairbyuid(data.msgdata.uid),data.msgdata);

                break;
            case "lineperson":
                //if(_this.gamestate == 1){
                //    var curIndex = _this.getchairbyuid(data.msgdata.uid);
                //    _this.view.userLineOut(curIndex,_this.persons[curIndex]);
                //}
                break;
            case "gameTsz":
               _this.beginchair = _this.getchairbyuid(data.msgdata.uid);
                _this.view.showtouzi(data.msgdata.num);
                break;
            case "gameTinfo":
                _this.isoneover = false;
                _this.updateGameInfo(data.msgdata);
                if(data.msgdata.begin){
                    _this.view.safeLayer.btn_safe.setVisible(false);
                }
                break;
            case "gamebegin":
                _this.isoneover = false;
                //if(data.msgdata.begin)
                _this.gamestate = 1;
                _this.view.dealCard(data.msgdata);
                _this.view.safeLayer.btn_safe.setVisible(false);
                break;
            case "gameTend":
                _this.isoneover = true;
                _this.view.resultOnend(data.msgdata);
                break;
            case "gameTbye":
                _this.isover=true;
                _this.mywebsocket.onclosefunc = null;
                _this.byeData = _this.view.resultdata(data.msgdata);
                if(_this.isoneover && _this.roominfo.step == _this.roominfo.maxStep){
                }else {
                    _this.game.uimgr.showui("gameclass.ttzallresultui").setmodttz(_this.roominfo.person, _this.byeData);
                }
                break;
            case "gameline":
                cc.log("gameline")
                var curIndex = _this.getchairbyuid(data.msgdata.uid);
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
        }
    });
};

gameclass.mod_ttz.prototype.bindUI = function(ui) {
    this.view = ui;
}
gameclass.mod_ttz.prototype.updateroominfo = function(roominfo) {

    this.roominfo = {
        agree:roominfo.agree,
        maxStep:roominfo.maxstep,
        bankerType:parseInt(roominfo.param1/10),
        scoreType:parseInt((roominfo.param1)%10),
        selcscore:parseInt(roominfo.param1%100),
        roomid:roominfo.roomid,
        step:roominfo.step,
        time:roominfo.time,
        type:roominfo.type,
        person:roominfo.person
    };

    cc.log(this.roominfo);

    this.persons =  roominfo.person;
    this.getCurPlayerIndex(this.persons,this.game.modmgr.mod_login.logindata.uid);
    this.persons  =  this.offsetPlayer(this.persons);
    if (this.roominfo.time != 0){
        this.game.uimgr.showui("gameclass.exitroom",false);
        this.game.uimgr.uis["gameclass.exitroom"].setData(this,this.roominfo);
    }
};

gameclass.mod_ttz.prototype.joinRoomInfo = function(data){
    cc.log(data.person);
    this.roominfo.person = data.person;
    this.getCurPlayerIndex( data.person,this.game.modmgr.mod_login.logindata.uid);
    var players = this.offsetPlayer(data.person);
    this.view.checkSafe(this.roominfo.person);

    for(var i=0 ;i< players.length ;i++ ){
        for(var j=0 ;j<  this.persons.length ;j++){
            if(this.persons[j] && players[i] &&  players[i].uid ==  this.persons[j].uid ){
                players[i].ready = this.persons[j].ready;
            }
        }
    }
    for(var i=0 ;i< players.length ;i++ ){
        if(players[i]){
            if(!players[i].ready){
                players[i].ready = false;
            }
            if(this.isReady){
                players[i].ready = false;
            }
        }
    }
    this.persons = players;
    this.view.updatePlayerinfo(false);
};

/*
 *通过ID 找到索引位置
 * */
gameclass.mod_ttz.prototype.getCurPlayerIndex = function(arr,uid){

    for(var x = 0;x<  5 ;x++){
        if(!arr[x]){
            continue;
        }
        if(arr[x].uid == uid){
            this.curPlayerIndex = x;
            break;
        }
    }
}

/*
 * 将进房间的玩家 顺序排序
 * */
gameclass.mod_ttz.prototype.offsetPlayer = function(arr){
    var player = [];

    for (var x= 0;x< 5 ;x++ ){
        player[(5 + x - this.curPlayerIndex) %5 ] = arr[x] ? arr[x] : null ;
    }
    return player;
}

gameclass.mod_ttz.prototype.updateGameInfo = function(gameInfo) {
    this.gameInfo = gameInfo;
    //cc.log(gameInfo);
    var _this = this;
    this.view.checkSafe(this.roominfo.person);
    var dealeruid = 0;

    if(this.gameInfo.info.length > 0 ){
        cc.each(this.gameInfo.info,function(o){
            var index = _this.getchairbyuid(o.uid);
            if(_this.persons[index]){
                _this.persons[index].ready = o.ready;
                _this.persons[index].deal = o.deal;
                _this.persons[index].score = o.score;
            }
            if(o.deal) dealeruid = o.uid;
        });
    }else{
        for(var  i = 0; i< this.persons.length ; i++){
            if( this.persons[i]){
                this.persons[i].ready = false;
            }
        }
        dealeruid = this.roominfo.person[0].uid
    }
    this.view.setRoomInfo(dealeruid);
    this.view.ongamebegin(this.gameInfo);
    this.view.updatePlayerinfo(true);
};

gameclass.mod_ttz.prototype.ready = function(uid) {

    for (var i =0;i < this.persons.length; i++){
        if (this.persons[i] && this.persons[i].uid == uid){
            this.persons[i].ready = true;
            this.view.showReady(i);
        }
    }
};

gameclass.mod_ttz.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_ttz.prototype.gameready = function(bool) {
    var data = {};
    this.mywebsocket.send("gameready",data);

    if(bool) this.view.nextju();
};

gameclass.mod_ttz.prototype.gameend = function() {
    var data = {};
    this.mywebsocket.send("gameend",data);
};

gameclass.mod_ttz.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};

gameclass.mod_ttz.prototype.gamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_ttz.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};

gameclass.mod_ttz.prototype.sendselectscore = function(type) {
    var data = {"score":type};
    this.mywebsocket.send("ChoiceScore",data);
};

gameclass.mod_ttz.prototype.sendnext = function() {
    var data = {};
    this.mywebsocket.send("gameTnext",data);
};


gameclass.mod_ttz.prototype.getserverchair = function(cur) {
    return (this.serverchair + cur )%5;
};

gameclass.mod_ttz.prototype.getplayerdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair > this.roominfo.person.length) {
        return
    }

    return this.roominfo.person[serverchair];
};
gameclass.mod_ttz.prototype.getchairbyuid = function(uid) {
    for(var i = 0 ; i < this.persons.length; i++){
        if(this.persons[i]){
            if(this.persons[i].uid == uid){
                return i;
            }
        }
    }
    return -1;
};
gameclass.mod_ttz.prototype.getpersonbyuid = function(uid) {
    for(var i = 0 ; i < this.persons.length; i++){
        if(this.persons[i]){
            if(this.persons[i].uid == uid){
                return this.persons[i];
            }
        }
    }
    return null;
};
/**
 * Created by yang on 2016/11/10.
 */

gameclass.mod_ptj = gameclass.mod_base.extend({
    roominfo:null,
    mywebsocket:null,
    ongameready:null,
    ongamecompare:null,
    onupdateroominfo:null,
    serverchair:null,
    ongameview:null,
    isover:null,
    isoneover:false,
    endinfo:null,
    gamestate:0,
    score:null,
    chatlst:null,
    persons:null,
    beginchair:0,
    byeData:null,
    mysex:0,
    curPlayerIndex:0,
    isfangzhu:false,
    ctor:function () {
        this.isover = false;
        this.gamestate = 0;
        this.mysex = 0;
        this.curPlayerIndex = 0;
        this.chatlst = [];
    }
});

gameclass.mod_ptj.prototype.entergame = function(_roominfo,_mywebsocket){
    this.roominfo = _roominfo;
    this.mywebsocket = _mywebsocket;
    this.updateroominfo(this.roominfo);
    var _this = this;
    this.mywebsocket.setonmsgfunc(function (ws,data) {
        cc.log("msghead = "+data.msghead,data.msgdata);
        switch (data.msghead){
            case "roominfo":
                //cc.log("roominfo");
                _this.joinRoomInfo(data.msgdata);
                break;
            case "joinroomfail":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.dissmissroom();
                _this.game.uimgr.showui("gameclass.msgboxui");
                switch (data.msgdata.result) {
                    case 1:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已解散");
                        break;
                    case 2:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("该房间已满员");
                        break;
                    default:
                        _this.game.uimgr.uis["gameclass.msgboxui"].setString("房间错误");
                        break;
                }
                break;
            case "exitroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                if (!_this.isover){
                    _this.mywebsocket.onclosefunc = null;
                    _this.game.modmgr.mod_login.dissmissroom();
                }
                //else{
                //    _this.game.uimgr.closeui("gameclass.ttzresultoneui");
                //    _this.game.uimgr.closeui("gameclass.ttzallresultui");
                //    _this.game.uimgr.showui("gameclass.ttzallresultui").setmodttz( _this.byeData);
                //}
                break;
            case "tickroom":
                _this.mywebsocket.onclosefunc = null;
                _this.game.modmgr.mod_login.backlogin();
                //_this.game.uimgr.showui("gameclass.msgboxui");
                //_this.game.uimgr.uis["gameclass.msgboxui"].setString("您的账号已在其他地方登陆");
                break;
            case "gameready":
                cc.log("gameready");
                _this.ready(data.msgdata.uid);

                break;
            case "dissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.exitroom",false);
                _this.game.uimgr.uis["gameclass.exitroom"].setData(_this,data.msgdata);
                break;
            case "nodissmissroom":
                _this.game.uimgr.closeui("gameclass.exitroom");
                _this.game.uimgr.showui("gameclass.msgboxui");
                _this.game.uimgr.uis["gameclass.msgboxui"].setString("有人不同意解散房间");
                break;
            case "chatroom":
                _this.chatlst[_this.chatlst.length] = data.msgdata;

                if (_this.game.uimgr.uis["gameclass.chatui"])
                    _this.game.uimgr.uis["gameclass.chatui"].pushstr(data.msgdata);
                //_this.getchairbyuid(data.msgdata.uid);
                _this.view.onChat(_this.getchairbyuid(data.msgdata.uid),data.msgdata);

                break;
            case "lineperson":
                //if(_this.gamestate == 1){
                //    var curIndex = _this.getchairbyuid(data.msgdata.uid);
                //    _this.view.userLineOut(curIndex,_this.persons[curIndex]);
                //}
                break;
            case "gameptjinfo":
                _this.isoneover = false;
                //cc.log("gameptjinfo",_this.roominfo);
                if(data.msgdata.begin){
                    _this.gamestate = 1;
                    _this.view.safeLayer.btn_safe.setVisible(false);
                }
                if(_this.roominfo.step > 1){
                    _this.view.invitebtn.setVisible(false);
                }
                _this.beginchair = 6;
                cc.log("gameptjinfo",data.msgdata);
                _this.updateGameInfo(data.msgdata);
                _this.view.onbegin(data.msgdata);
                break;
            case "gameptjbegin":
                _this.isoneover = false;
                _this.gamestate = 1;
                _this.view.cleartable(true);
                _this.view.showtablecard(data.msgdata);
                _this.view.safeLayer.btn_safe.setVisible(false);
                break;
            case "gameptjcard":
                //_this.beginchair = (data.msgdata.sz[0] + data.msgdata.sz[1] - 2)%2;
                _this.beginchair = data.msgdata.sz[0] + data.msgdata.sz[1];
                _this.view.showtouzicard(data.msgdata);
                break;
            case "gamebets":
                //data.msgdata// uid int //bets int
                _this.view.showbets(data.msgdata);
                break;
            //广播uid抢庄（只有在抢庄模式才发）
            case "gamedeal":
                //data.msgdata
                _this.view.robzhuang(data.msgdata.uid,data.msgdata.ok);
                break;
            //广播谁成为庄家（只有在抢庄模式才发）
            case "gamedealer":
                _this.view.robzhuangsus(data.msgdata.uid);
                break;
            case "gameview":
                var chair = _this.getchairbyuid(data.msgdata.uid);
                if(chair > 0){
                    _this.view.showplayerkaipai(chair);
                }
                break;
            case "gameptjend":
                _this.isoneover = true;
                _this.gamestate = 0;
                _this.view.resultOnend(data.msgdata);
                break;
            case "gameptjbye":
                _this.isover=true;
                _this.gamestate = 0;
                _this.mywebsocket.onclosefunc = null;
                if(data.msgdata.info && data.msgdata.info.length > 0){
                    _this.byeData = _this.view.resultdata(data.msgdata);
                    if(_this.isoneover && _this.roominfo.step == _this.roominfo.maxStep){
                    }else {
                        _this.game.uimgr.showui("gameclass.ptjallresultui").setmodttz(_this.roominfo.person, _this.byeData);
                    }
                }
                break;
            case "gameline":
                var curIndex = _this.getchairbyuid(data.msgdata.uid);
                if(curIndex || curIndex === 0)
                    _this.view.userLineOut(curIndex,data.msgdata);
                break;
        }
    });
};

gameclass.mod_ptj.prototype.bindUI = function(ui) {
    this.view = ui;
    if(this.isfangzhu) this.view.showreadybtn();
}
gameclass.mod_ptj.prototype.updateroominfo = function(roominfo) {

    this.roominfo = {
        param1:roominfo.param1,
        param2:roominfo.param2,
        agree:roominfo.agree,
        maxStep:roominfo.maxstep,
        tianjiu:parseInt(roominfo.param1/10),
        bankerType:parseInt((roominfo.param1)%10),
        shangdao:parseInt(roominfo.param1%100),
        selcscore:parseInt(roominfo.param1%1000),
        roomid:roominfo.roomid,
        step:roominfo.step,
        time:roominfo.time,
        type:roominfo.type,
        person:roominfo.person
    };

    //cc.log(this.roominfo);

    this.persons =  roominfo.person;
    if(roominfo.person && roominfo.person.length > 0){
        this.getCurPlayerIndex(this.persons,this.game.modmgr.mod_login.logindata.uid);
        this.persons  =  this.offsetPlayer(roominfo);
        if (this.roominfo.time != 0){
            this.game.uimgr.showui("gameclass.exitroom",false);
            this.game.uimgr.uis["gameclass.exitroom"].setData(this,this.roominfo);
        }
    }
};

gameclass.mod_ptj.prototype.joinRoomInfo = function(data){
    this.roominfo.person = data.person;
    this.roominfo.param1 = data.param1;
    this.getCurPlayerIndex( data.person,this.game.modmgr.mod_login.logindata.uid);
    var players = this.offsetPlayer(data);
    this.view.checkSafe(this.roominfo.person);

    for(var i=0 ;i< players.length ;i++ ){
        for(var j=0 ;j<  this.persons.length ;j++){
            if(this.persons[j] && players[i] &&  players[i].uid ==  this.persons[j].uid ){
                players[i].ready = this.persons[j].ready;
            }
        }
    }
    for(var i=0 ;i< players.length ;i++ ){
        if(players[i]){
            if(!players[i].ready){
                players[i].ready = false;
            }
            if(this.isReady){
                players[i].ready = false;
            }
        }
    }
    this.persons = players;
    this.view.updatePlayerinfo(false);
};

/*
 *通过ID 找到索引位置
 * */
gameclass.mod_ptj.prototype.getCurPlayerIndex = function(arr,uid){

    for(var x = 0;x<  5 ;x++){
        if(!arr[x]){
            continue;
        }
        if(arr[x].uid == uid){
            this.curPlayerIndex = x;
            this.mysex = arr[x].sex;
            break;
        }
    }
}

/*
 * 将进房间的玩家 顺序排序
 * */
gameclass.mod_ptj.prototype.offsetPlayer = function(roominfop){
    var arr = roominfop.person;
    var player = [];
    if(roominfop.host == this.game.modmgr.mod_login.logindata.uid){
        //this.view.showreadybtn();
        this.isfangzhu = true;
    }else{
        this.isfangzhu = false;
        this.gameready();
    }
    for (var x= 0;x< 4 ;x++ ){
        player[(4 + x - this.curPlayerIndex) %4 ] = arr[x] ? arr[x] : null ;
    }
    return player;
};

gameclass.mod_ptj.prototype.updateGameInfo = function(gameInfo) {
    this.gameInfo = gameInfo;
    var _this = this;
    this.view.checkSafe(this.roominfo.person);

    if(this.gameInfo.info.length > 0 ){
        cc.each(this.gameInfo.info,function(o){
            var index = _this.getchairbyuid(o.uid);
            if(_this.persons[index]){
                _this.persons[index].ready = o.ready;
                _this.persons[index].deal = o.dealer;
                _this.persons[index].score = o.total;
            }
        });
    }else{
        for(var  i = 0; i< this.persons.length ; i++){
            if( this.persons[i]){
                this.persons[i].ready = false;
            }
        }
    }
    this.view.updatePlayerinfo(true);
    this.view.setRoomInfo(this.gameInfo.begin);
};

gameclass.mod_ptj.prototype.ready = function(uid) {

    for (var i =0;i < this.persons.length; i++){
        if (this.persons[i] && this.persons[i].uid == uid){
            this.persons[i].ready = true;
            this.view.showReady(i);
        }
    }
};

gameclass.mod_ptj.prototype.dissmissroom = function() {
    var data = {};
    this.mywebsocket.send("dissmissroom",data);
};

gameclass.mod_ptj.prototype.gameready = function(bool) {
    var data = {};
    if(this.roominfo.person.length > 1){
        this.mywebsocket.send("gameready",data);
    }
};

gameclass.mod_ptj.prototype.nodissmissroom = function() {
    var data = {};
    this.mywebsocket.send("nodissmissroom",data);
};
//发送抢庄
gameclass.mod_ptj.prototype.sendgamedeal = function(b) {
    var data = {"ok":b};
    this.mywebsocket.send("gamedeal",data);
};

gameclass.mod_ptj.prototype.chat = function(type,info) {
    var data = {"type":type,"chat":info};
    this.mywebsocket.send("chatroom",data);
};
//发送下注
gameclass.mod_ptj.prototype.sendselectscore = function(type) {
    var data = {"bets":type};
    this.mywebsocket.send("gamebets",data);
};

//发送亮牌
gameclass.mod_ptj.prototype.sendview = function(viewArr) {
    var data = {"view":viewArr};
    this.mywebsocket.send("gameptjview",data);
};



gameclass.mod_ptj.prototype.getserverchair = function(cur) {
    return (this.serverchair + cur )%5;
};

gameclass.mod_ptj.prototype.getplayerdata = function(cur) {
    var serverchair = this.getserverchair(cur);

    if (serverchair > this.roominfo.person.length) {
        return
    }

    return this.roominfo.person[serverchair];
};
gameclass.mod_ptj.prototype.getchairbyuid = function(uid) {
    for(var i = 0 ; i < this.persons.length; i++){
        if(this.persons[i]){
            if(this.persons[i].uid == uid){
                return i;
            }
        }
    }
    return -1;
};
gameclass.mod_ptj.prototype.getpersonbyuid = function(uid) {
    for(var i = 0 ; i < this.persons.length; i++){
        if(this.persons[i]){
            if(this.persons[i].uid == uid){
                return this.persons[i];
            }
        }
    }
    return null;
};
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
        return