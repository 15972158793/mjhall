var gameStaticString = gameStaticString || {};

/**
 * 游戏规则名称
 * @type {[null,null]}
 */
gameStaticString.gameRule = [
    {
        gameType: gameclass.gameszp,
        ruleArr: [
            {title: "选择局数", selectArr: ["6局X1房卡", "12局x2房卡"]},
            {title: "玩法选择", selectArr: ["轮庄", "赢家庄"]},
            {title: "选择局数", selectArr: ["50分", "100分"]},
            {title: "选择局数", selectArr: ["无", "5分", "10分"]},
        ]
    },
    {
        gameType: gameclass.gameszp_fk,
        ruleArr: [
            {title: "选择局数", selectArr: ["6局X1房卡", "12局x2房卡"]},
            {title: "玩法选择", selectArr: ["比大小", "比花色", "全比"]},
            {title: "", selectArr: ["豹子额外奖励", "比牌双倍开","解散局算分"]},
            {title: "封顶开牌", selectArr: ["5轮", "10轮", "15轮"]},
            {title: "比牌轮数", selectArr: ["1轮", "2轮", "3轮"]},
            {title: "闷牌轮数", selectArr: ["不闷", "2轮", "3轮", "5轮"]},
        ]
    },
];
