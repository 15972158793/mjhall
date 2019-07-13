var gameStaticFunction = gameStaticFunction || {};

/**
 * 根据游戏类型获取游戏规则描述列表
 * @param gameType
 * @return {Array}
 */
gameStaticFunction.getGameRuleArr = function (gameType) {
    var len = gameStaticString.gameRule.length;
    for(var i = 0;i<len;i++){
        if(gameStaticString.gameRule[i].gameType == gameType){
            return gameStaticString.gameRule[i].ruleArr;
        }
    }
    return [];
};