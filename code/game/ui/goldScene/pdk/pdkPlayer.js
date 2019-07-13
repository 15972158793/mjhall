/**
 * Created by Administrator on 2018-1-3.
 */

gameclass.pdkPlayer = cc.Class.extend({
    curCards:null,//手牌数组
    curCardsSP:null,//手牌精灵数组
    ready:false,

    ctor:function(node,index,uiParent,parent){
        this.node = node;
        this.index = index;
        this.uiParent = uiParent;
        this.parent = parent;

        this.handsNum = this.node.getChildByName("alarmcount");
        this.name_text    =  ccui.helper.seekWidgetByName(this.node,"playername");
        this.score_text   =  ccui.helper.seekWidgetByName(this.node,"jifenText");
        this.stateImg = ccui.helper.seekWidgetByName(this.node,"stateImg");
        this.cardsNode = ccui.helper.seekWidgetByName(uiParent,"handNode"+this.index);
        this.outNode = ccui.helper.seekWidgetByName(uiParent,"outNode"+this.index);
        this.alarm = ccui.helper.seekWidgetByName(this.node,"alarm");
        //if(this.parent.mod_pdk.maxNum == 2){
        //    this.cardsNode.setPositionX(568);
        //}
        this.orginalOutPos = this.outNode.getPosition();
        this.orginalHandPos = this.cardsNode.getPosition();

        var talkPosArr = [cc.p(135,240),cc.p(1000,500),cc.p(130,500)];
        this.talkPos = talkPosArr[this.index];

        var size = this.node.getContentSize();
        this.parent.createSpine("roler"+(this.index),cc.p(size.width/2,0),'daiji',true,0.8,this.node);
        //this.initRoleAnimtion();

        this.initData();
        this.initShow();
    },

    initData:function(){
        this.curCards = [];
        this.curCardsSP = [];
        this.ready = false;
    },

    initShow:function(){
        this.node.setBackGroundColorType(ccui.Layout.BG_COLOR_NONE);
        this.stateImg.setVisible(false);
        this.handsNum.setVisible(false);
        this.alarm.setVisible(false);
        this.cardsNode.removeAllChildren();
        //this.outNode.removeAllChildren();
    },


    //initRoleAnimtion:function(){
    //    this["roler"+(this.index+1)].setAnimation(0,'daiji',true);
    //    if(this.index == 1){
    //        this["roler2"].setScaleX(-1);
    //    }
    //},

    //setRoleAnimtion:function(str1,str2,duratime){
    //    this["roler"+(this.index+1)].setMix(str1,str2,duratime);
    //    this["roler"+(this.index+1)].addAnimation(0,str2,true);
    //},

    setBaseInfo:function(data){
        data = data || {};
        this.sex = data.sex;
        this.ready = data.ready;
        //不用点击显示的信息
        this.name_text.setString(data.name || "游客");
        this.score_text.setString(data.total || this.score_text.getString());

        if(!this.parent.mod_pdk.begin){
            if(data.ready){
                this.stateImg.setVisible(true);
                this.stateImg.setTexture(res.readyImg);
            }else{
                this.stateImg.setVisible(false);
            }
        }else{
            this.stateImg.setVisible(false);
        }
    },

    setVisible:function(b){
        this.node.setVisible(b);
        if(!b){
            this.cardsNode.removeAllChildren();
            this.outNode.removeAllChildren();
        }
    },

    showCardLen:function(len){
        this.handsNum.setVisible(true);
        this.handsNum.setString("剩余张数:"+len);
    },

    dealCards:function(_cardArr){
        //=====test=============
        //if(this.index == 0){
        //    _cardArr = [61,62,63,71,72,73,81,82,81,91];
        //}
        //======================
        this.curCards = this.parent.transCardtoNum(_cardArr);
        if(this.index == 0){
            this.renderHandCard(true);
        }
        if(this.curCards.length == 1){
            this.alarmRes();
        }
    },

    mySort:function(cards){
        var indexArr = ["a","d","b","c"];
        cards.sort(function (a, b) {
            if(a.card < b.card){
                return 1;
            }else if(a.card == b.card){
                var indexA = indexArr.indexOf(a.type);
                var indexB = indexArr.indexOf(b.type);
                //return a.type < b.type ? 1:-1;
                return indexA > indexB ? 1:-1;
            }else{
                return -1;
            }
        });
    },

    renderHandCard:function(ismove){
        this.cardsNode.setPositionX(this.orginalHandPos.x);
        this.cardsNode.removeAllChildren();
        this.willSendCard = [];
        this.mySort(this.curCards);
        for(var i = 0;i < this.curCards.length;i++){
            var tmpSp = this.curCards[i];
            var sp = this.parent.createCardUI(tmpSp.card,tmpSp.type);
            if(ismove){
                sp.setPosition(0, 0);
                sp.runAction(cc.sequence(cc.moveBy(0.8,-this.curCards.length * 20 + (42 * i) + 20, 0),cc.callFunc(function(sender){
                    //cc.log(sender.getPosition());
                },sp)));
            }else{
                sp.setPosition(-this.curCards.length * 20 + (42 * i) + 20, 0);
            }
            sp.setTag(tmpSp.id);
            sp.setScale(1.2);

            this.cardsNode.addChild(sp);
        }
        this.createMyEventListener();
        this.parent.isFirstTips = true;
    },

    onReady:function(){
        this.stateImg.setVisible(true);
        this.stateImg.setTexture(res.readyImg);
    },

    onSendCard:function(sendCard,type){
        this.outNode.removeAllChildren();
        if(sendCard.length==0){
            var type = parseInt(Math.random()*3);
            var direction = (this.index == 1 ? 1 : 0);
            this.stateImg.setVisible(true);
            this.stateImg.setTexture(res["buyao"+type+"_"+direction]);
            mod_sound.playeffect(g_music["buyao"+ type]);
            return;
        }
        this.showOutPoke(sendCard,type);
        if(this.index == 0){
            this.onSendReflash(sendCard);
        }else{
            this.curCards.splice(0,sendCard.length);
        }
        if(this.curCards.length == 1){
            this.alarmRes();
        }
        this.handsNum.setString("剩余张数:"+ this.curCards.length);
    },
    alarmRes:function(){
        var animFrames = [];
        for (var i = 0; i < 2; i++) {
            var str = "alarm" + i+".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = new cc.Animation(animFrames,0.2);
        var animate = cc.animate(animation);
        this.alarm.setVisible(true);
        this.alarm.runAction(cc.sequence(animate).repeatForever());
        var _this = this;
        this.node.scheduleOnce(function(){
            mod_sound.playeffect(g_music["Man_one_card"], false);
        }, 1);
    },

    showOutPoke:function(sendCard,type){
        //显示出出去的牌
        this.outNode.setPositionX(this.orginalOutPos.x);
        if(sendCard.length == this.curCards.length){
            this.outNode.setScale(1.5);
            this.outNode.runAction(cc.scaleTo(0.3,1,1));
        }
        var checkArr = this.parent.transCardtoNum(sendCard);
        if(type < 10){
            this.mySort(checkArr);
            checkArr.reverse();
        }
        for(var i = 0;i < checkArr.length;i++){
            var sp = this.parent.createCardUI(checkArr[i].card,checkArr[i].type);
            sp.setPosition(24 * i, 0);
            sp.setScale(0.8);
            this.outNode.addChild(sp);
        }
        if(this.index != 2){
            var difX = ((sendCard.length-1) * 24)/2;
            if(this.index == 1) difX = (sendCard.length-1) * 24;
            this.outNode.setPositionX(this.orginalOutPos.x - difX);
        }
    },

    onSendReflash:function(sendCard){
        for(var i = 0;i < sendCard.length;i++){
            for(var j = 0;j < this.curCards.length;j++){
                if(sendCard[i] == this.curCards[j].id){
                    this.curCards.splice(j,1);
                }
            }
        }
        this.renderHandCard();
    },
    showEndPoke:function(_node,pokeArr){
        _node.setPositionX(this.orginalHandPos.x);
        pokeArr = this.parent.transCardtoNum(pokeArr);
        this.mySort(pokeArr);

        var difX = 24;
        var scaleNum = 0.8;
        if(this.index == 0){
            difX = 42;
            scaleNum = 1.2;
        }
        if(this.index != 2){
            var enddifX = ((pokeArr.length - 1) * difX)/2;
            if(this.index == 1) enddifX = (pokeArr.length - 1) * difX;
            _node.setPositionX(this.orginalHandPos.x - enddifX);
        }

        for(var i = 0;i < pokeArr.length;i++){
            var sp = this.parent.createCardUI(pokeArr[i].card,pokeArr[i].type);
            sp.setPosition(0,0);
            sp.setScale(scaleNum);
            sp.runAction(cc.moveBy(0.5, difX * i, 0));
            _node.addChild(sp);
        }
    },

    reflashScore:function(_scoreNum){
        this.score_text.setString(_scoreNum);
    },

    createMyEventListener:function(){
        var _this = this;
        // 创建一个事件监听器 OneByOne 为单点触摸
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,                        // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
            onTouchBegan: function (touch, event) {        //实现 onTouchBegan 事件回调函数
                var target = event.getCurrentTarget();    // 获取事件所绑定的 target
                var position = target.convertToNodeSpace(touch.getLocation());
                if(position.y > 180){return true;}
                _this.selStartCard = _this.getTouchCard(position);
                return true;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var position =target.convertToNodeSpace(touch.getLocation());            // 触摸移动时触发
                if( position.y > 180){return true;}
                if(_this.selStartCard === null)return true;
                _this.selEndCard = _this.getTouchCard(position);
                if(_this.selEndCard === null){
                    var startCard = _this.getHandCardWithIndex(0);
                    var endCard = _this.getHandCardWithIndex(-1);
                    if( 0 > startCard.convertToNodeSpace(position).x ){
                        _this.selEndCard = 0;
                    }
                    if(endCard.convertToNodeSpace(position).x > endCard.getContentSize().width ){
                        _this.selEndCard = _this.curCards.length - 1;
                    }
                    if(_this.selEndCard === null){return true;}
                }
                _this.touchHandCard();
                return true;
            },
            onTouchEnded: function (touch, event) {            // 点击事件结束处理
                if(_this.selStartCard !== null &&  _this.selEndCard === null){
                    _this.selEndCard = _this.getTouchCard(touch.getLocation());
                }
                if(_this.selStartCard !== null && _this.selEndCard !== null){
                    _this.touchHandCard(true);
                }
                _this.selStartCard = null;
                _this.selEndCard = null;
                cc.each(_this.curCards,function(o,i){
                    var target = _this.cardsNode.getChildByTag(o.id);
                    var targetchild = target.getChildren();
                    target.setColor(cc.color(255,255,255,255));
                    if(targetchild.length > 0){
                        targetchild[0].setColor(cc.color(255,255,255,255));
                    }
                });
                return true;
            }
        }),ccui.helper.seekWidgetByName(this.uiParent,"bg"));
    },

    getTouchCard:function(position){
        var index = null;
        var _this = this;
        cc.each(this.curCards,function(o,i){
            var target = _this.cardsNode.getChildByTag(o.id);
            var tmppos = target.convertToNodeSpace(position);
            var mwith =  (i == _this.curCards.length -1) ? target.getContentSize().width:40;
            if(tmppos.x > 0 && tmppos.x < mwith){
                index = i;
                return false;
            }
        });
        return index;
    },

    touchHandCard:function(isSel){
        var min = Math.min(this.selStartCard , this.selEndCard );
        var max = Math.max(this.selStartCard , this.selEndCard );
        var _this = this;
        cc.each(this.curCards,function(o,i){
            var target = _this.cardsNode.getChildByTag(o.id);
            var targetchild = target.getChildren();
            if(i >=  min && i<=max){
                target.setColor(cc.color(200,200,200,200));
                if(targetchild.length > 0)
                    targetchild[0].setColor(cc.color(200,200,200,200));
                if(isSel){
                    target.isup = !target.isup;
                    target.setPositionY( target.getPositionY() + ( target.isup ? 1 : -1 ) * 20   );
                    if(target.isup){
                        _this.willSendCard.push(o.id);
                    }else{
                        _this.willSendCard.remove(o.id);
                    }
                }
            }else{
                target.setColor(cc.color(255,255,255,255));
                if(targetchild.length > 0)
                    targetchild[0].setColor(cc.color(255,255,255,255));
            }
        });
    },

    getHandCardWithIndex:function(index){
        if(index < 0){
            index = this.curCards.length + index;
        }
        var target = this.cardsNode.getChildByTag(this.curCards[index].id);
        return target;
    },

    onChat:function(data){
        for(var i = 0;i < g_chatstr.length; i++){
            if(g_chatstr[i] == data.chat){
                mod_sound.playeffect(g_music["fix_msg_" + (i+1)],false);
                break;
            }
            else if(i==8)
            {
                mod_sound.playeffect(g_music.fix_msg_9,false);
                break;
            }
        }
        var arr = [
            res.chatbg_ld,
            res.chatbg_rd,
            res.chatbg_ld,
        ];
        var _node = new ccui.Layout();
        var s9 = null;
        if(data.type == 1){
            s9 = new cc.Scale9Sprite(arr[this.index]);
            s9.setCapInsets(cc.rect(60,10,10,10));
            s9.setAnchorPoint(cc.p(0,0));
            s9.setPosition(cc.p(-18,-18));
            _node.addChild(s9);

            var helloLabel = new cc.LabelTTF(data.chat, "Arial", 36);
            helloLabel.setAnchorPoint(cc.p(0,0));
            helloLabel.setColor(cc.color(33,111,75));
            _node.addChild(helloLabel);
            s9.setContentSize(helloLabel.getContentSize().width + 30,helloLabel.getContentSize().height + 30);
        }else if(data.type == 2){
            var index = Number(data.chat);
            var spine = new sp.SkeletonAnimation(g_chat_expression["expression"+index+"_json"],g_chat_expression["expression"+index+"_atlas"]);
            spine.setAnimation(0, 'animation', false);
            spine.setAnchorPoint(0.5, 0.5);

            s9 = new ccui.Layout();
            s9.setContentSize(110, 100);
            s9.setBackGroundImage(arr[this.index]);
            s9.setBackGroundImageScale9Enabled(true);
            spine.setPosition(0.5 * s9.getContentSize().width, 0.5 * s9.getContentSize().height + 5);
            s9.addChild(spine);
            _node.addChild(s9);

        }else if (data.type == 3){
            gameclass.mod_platform.playurl(data.chat);
            var spr = new cc.Sprite(res.soundopen2);
            spr.setAnchorPoint(cc.p(0.5,0.5));
            _node.addChild(spr);
        }

        if (this.index == 1){
            _node.setPosition(this.talkPos.x - s9.width,this.talkPos.y);
        }else{
            _node.setPosition(this.talkPos);
        }

        this.uiParent.addChild(_node);
        var seq = cc.sequence(cc.delayTime(2),cc.callFunc(function(){
            _node.removeFromParent(true);
        }));
        _node.runAction(seq);
    },
})

//删除指定一个元素
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

//数组中找到要删除的元素
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};



