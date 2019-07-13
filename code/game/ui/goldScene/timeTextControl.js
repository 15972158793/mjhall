gameclass.timeTextControl = gameclass.timeControl.extend({
    _txt: null,
    ishide:true,
    _count:0,
    ctor: function (layout, barUrl) {
        this._super(layout, barUrl);
    },
    init: function () {
        this._super();
        this._txt = this._layout.getChildByName("txt");
    },
    setishide:function(bool){
        this.ishide = bool;
    },
    update:function () {
        this._super();
        if(!this._isRun) {
            return;
        }
        var curtime = this._overTime - parseInt(new Date().getTime());
        //this.curtime = curtime;
        this._count = parseInt(curtime / 1000);
        if(curtime <= 0) {
            this._isRun = false;
            this._timer.setPercentage(0);
            this._txt.setString(0);
            this._count = -1;
            if(this.ishide) this.stopCount();
            return;
        }
        this._timer.setPercentage(curtime * 100 / this._maxTime);
        this._txt.setString(this._count.toString());

        //var percent = this._timer.getPercentage();
        //var num = this._proAction.getDuration();
        //var number = parseInt((num + 1) * percent / 100);
        //var str = number.toString();
        //
        //this._txt.setString(str);
        //this._super();
        //
        //if(number <= 0){
        //    this._isRun = false;
        //    this.stopCount();
        //}
    },
})