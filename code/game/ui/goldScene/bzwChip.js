/**
 * Created by mayn on 2017/12/2.
 */


gameclass.bzwChip = cc.Sprite.extend({
    ctor:function(name,num){
        this._super();
        this.initWithSpriteFrameName(name+num+".png");
    },

    setChipMove:function(time,startPos,endPos,type,func,sender){
        this.timer = 0;
        this.callBack = func;
        this.type = type;
        this.moveTime = time;
        this.startPos = startPos;
        this.endPos = endPos;
        this.totalx = (endPos.x - startPos.x);//筹码
        this.totaly = (endPos.y - startPos.y);
        if(sender){
            sender.removeFromParent(true);
        }
        this.scheduleUpdate();
        this.update();
    },

    moveChip:function(passTime){
        var posx = this.startPos.x + (passTime/this.moveTime)*this.totalx;
        var posy = this.startPos.y + (passTime/this.moveTime)*this.totaly;
        this.setPosition(cc.p(posx,posy));
    },

    update:function(dt){
        dt = dt || 1/60;
        this.timer += dt;
        if(this.timer > this.moveTime){
            if(this.callBack){
                this.callBack();
            }
            //前面的只是动画。用默认调度器会有位置不准的情况。毕竟是0.1666S,会有误差
            this.setPosition(this.endPos);
            this.unscheduleUpdate();
            if(this.type == 1){
                this.removeFromParent(true);
            }
        }else{
            this.moveChip(this.timer);
        }
    },



});



gameclass.tbChip = cc.Sprite.extend({
    ctor:function(name,num){
        this._super(name,num);
        //this.initWithSpriteFrameName(name+num+".png");
    },

    setChipMove:function(time,startPos,endPos,type,func,sender){
        this.timer = 0;
        this.callBack = func;
        this.type = type;
        this.moveTime = time;
        this.startPos = startPos;
        this.endPos = endPos;
        this.totalx = (endPos.x - startPos.x);//筹码
        this.totaly = (endPos.y - startPos.y);
        if(sender){
            sender.removeFromParent(true);
        }
        this.scheduleUpdate();
        this.update();
    },

    moveChip:function(passTime){
        var posx = this.startPos.x + (passTime/this.moveTime)*this.totalx;
        var posy = this.startPos.y + (passTime/this.moveTime)*this.totaly;
        this.setPosition(cc.p(posx,posy));
    },

    update:function(dt){
        dt = dt || 1/60;
        this.timer += dt;
        if(this.timer > this.moveTime){
            if(this.callBack){
                this.callBack();
            }
            //前面的只是动画。用默认调度器会有位置不准的情况。毕竟是0.1666S,会有误差
            this.setPosition(this.endPos);
            this.unscheduleUpdate();
            if(this.type == 1){
                this.removeFromParent(true);
            }
        }else{
            this.moveChip(this.timer);
        }
    },
})