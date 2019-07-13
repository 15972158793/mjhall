/**
 * Created by Administrator on 2017-9-23.
 */



gameclass.animation = cc.Layer.extend({
    m_Image:null,
    m_CurTime:0.0,
    m_CurIndex:0,
    m_Interval:0,
    m_Loop:false,
    m_Frames:0,
    m_Ani:"",
    m_CallBack:null,
    m_Obj:null,

    ctor:function(){
        this._super();
    },

    //! file  �ļ���  string   list������
    //! ani  �ļ���  string   ����ͼƬ���ֲ�����׺
    //! frames  ��֡��  int
    //! interval ���(��) float
    //! loop �Ƿ�ѭ��  bool
    //! callback ����������ϻص�,loopΪfalse��Ч
    Init:function(file, ani, frames, interval, loop, callback, obj) {
        cc.spriteFrameCache.addSpriteFrames(file);

        this.m_CurIndex = 0;
        this.m_Interval = interval;
        this.m_Loop = loop;
        this.m_Frames = frames;
        this.m_Ani = ani;
        this.m_CallBack = callback;
        this.m_Obj = obj;
        this.m_Image = new ccui.ImageView(ani + "_0.png", ccui.Widget.PLIST_TEXTURE);
        this.addChild(this.m_Image);
        this.scheduleUpdate();
    },

    update:function(dt) {
        this.m_CurTime += dt;

        while(this.m_CurTime >= this.m_Interval) {
            this.m_CurTime -= this.m_Interval;
            this.m_CurIndex++;
            if(this.m_CurIndex >= this.m_Frames) {
                if(this.m_Loop) {
                    this.m_CurIndex = 0;
                } else {
                    if(this.m_CallBack != null) {
                        this.m_CallBack(this.m_Obj);
                    }
                    this.removeFromParent();
                    return;
                }
            }

            this.m_Image.loadTexture(this.m_Ani + "_" + this.m_CurIndex + ".png", ccui.Widget.PLIST_TEXTURE);
        }
    },
})