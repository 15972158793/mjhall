/**
 * Created by Administrator on 2017-11-8.
 */


gameclass.startAnim = cc.Node.extend({
    openTime:0,//横幅拉开时间
    delayTime:0,
    closeTime:0,//横幅关闭时间
    timer:0,
    hasAdd:false,

    ctor:function(){
        this._super();
        this.setAnchorPoint(0.5,0.5);

        this.openTime = 0.4;
        this.closeTime = 0.4;
        this.delayTime = 1;

        var mycsd = ccs.load(res.startAnim);
        this.node = mycsd.node;
        this.addChild(this.node);

        this.node.scheduleUpdate();
        this.node.update=this.update.bind(this);

        var listView = this.node.getChildByName("ListView_2");
        this.listView = listView;
        listView.setAnchorPoint(0.5,0.5);

        cc.log(listView.getContentSize());
        listView.setContentSize(0,127);
        this.listWidth = 0;

        var startAnim1 = new sp.SkeletonAnimation(res.jsonStartAnim1,res.atlasStartAnim1);
        startAnim1.setAnimation(1, 'animation', false);
        this.addChild(startAnim1,100);

        this.gunzi1 = new cc.Sprite(res.gunzi);
        this.gunzi2 = new cc.Sprite(res.gunzi);
        this.addChild(this.gunzi1);
        this.addChild(this.gunzi2);
    },

    update:function(dt){
        if(this.timer >= this.openTime + this.closeTime + this.delayTime){
            this.node.unscheduleUpdate();
            this.removeFromParent(true);
            return;
        }
        if(this.timer < this.openTime){
            this.listWidth += 20;

        }else if(this.timer >= this.openTime && this.timer < this.openTime + this.delayTime){

        }else{
            this.listWidth -= 20;

        }
        this.timer += dt;
        this.gunzi1.setPositionX(-this.listView.width/2);
        this.gunzi2.setPositionX(this.listView.width/2);
        if(this.listWidth > 400) this.listWidth = 400;
        if(this.listWidth < 0) this.listWidth = 0;
        this.listView.setContentSize(this.listWidth ,127);
    }

})
