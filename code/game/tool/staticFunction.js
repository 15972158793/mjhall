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


