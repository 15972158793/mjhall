/**
 *@filename:mod.baseui.class.js
 *@autor:wenzhao.tang
 *@time:2017-07-22 14:11:12
 **/
var clipping = {
    //spriteNode 为要添加流光的对象
    //light为流光对象
    //流光运行的时间
    getClipnode : function(spriteNode, light, time,pos,url){
        time = time||1;
        var fileName=spriteNode._normalFileName;
        if(!fileName) fileName=spriteNode._texture.url;
        var clipnode = this._cliper(fileName);
        spriteNode.parent.removeChild(light,false);
        if(!pos){
            pos={x1:-400,x2:500};
        }
        var point = cc.p(pos.x1,0);
        light.setPosition(point);
        light.runAction(cc.repeatForever( cc.sequence(cc.moveTo(time,cc.p(pos.x2,0)),cc.moveTo(0,point))));
        clipnode.addChild( light);
        clipnode.setPosition(spriteNode.getPosition());
        return clipnode;
    },

    _cliper : function(frameName){
        //创建一个遮罩的模板
        var sten = new cc.Sprite(frameName);
        //创建一个ClippingNode 并设置一些基础属性 容器宽高与模板有关
        var clipnode = new cc.ClippingNode();
        clipnode.attr({
            stencil:sten,
            anchorX:0.5,
            anchorY:0.5,
            alphaThreshold:1,//设置裁剪透明值阀值 默认值为1 等于1時 alpha = 0的部分也被裁剪
        });
        return clipnode;
    },
};

