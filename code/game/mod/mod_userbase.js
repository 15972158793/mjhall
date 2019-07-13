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