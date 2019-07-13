/**
 * Created by Administrator on 2017/3/11 0011.
 */

gameclass.mod_record = gameclass.mod_base.extend({
    msg_list_Hander:{},//{:1, gameclass.gameddz, gameclass.gameniuniu, gameclass.gamelzddz},
    msg_data_hander:{},
    o_data:null,
    s_data:null,
    curGameid:null,
    curRoomid:null,
    curBureauid:null,
    curUserid:null,
    ctor: function () {
        this.msg_list_Hander[gameclass.gameniuniu] = "record";//牛牛消息请求头
        this.msg_list_Hander[gameclass.gamelzddz] = "recordddz1";//斗地主获取房间号及局数列表消息
        this.msg_list_Hander[gameclass.gameddz] = "recordddz1";
        this.msg_list_Hander[gameclass.gamesdb] = "record";
        this.msg_list_Hander[gameclass.gamettz] = "record";
        this.msg_list_Hander[gameclass.gameszp] = "record";
        this.msg_list_Hander[gameclass.gameptj] = "record";
        this.msg_list_Hander[gameclass.gamenxs] = "record";
        this.msg_list_Hander[gameclass.gamekwx] = "recordkwx1";
        this.msg_list_Hander[gameclass.gamegoldkwx] = "record";

        this.msg_data_hander[gameclass.gameniuniu] = "record";//牛牛
        this.msg_data_hander[gameclass.gamelzddz] = "recordddz2";//斗地主获取战绩界面消息
        this.msg_data_hander[gameclass.gameddz] = "recordddz2";
        this.msg_data_hander[gameclass.gamesdb] = "record";  //十点半
        this.msg_data_hander[gameclass.gamettz] = "record";
        this.msg_data_hander[gameclass.gameszp] = "record";
        this.msg_data_hander[gameclass.gameptj] = "record";
        this.msg_data_hander[gameclass.gamenxs] = "record";
        this.msg_data_hander[gameclass.gamekwx] = "recordkwx2";
        this.msg_data_hander[gameclass.gamegoldkwx] = "record";


    },
    setCurGameid:function(gid){
        this.curGameid = gid;
    },
    setCurRoomid:function(rid){
        this.curRoomid = rid;
    },
    setCurBureauid:function(bid){
        this.curBureauid = bid;
    },
    setCurUserid:function(uid){
        this.curUserid = uid;
    },
});
gameclass.mod_record.prototype.getRecordList = function(gameid,data,func){
    this.getGCRecordInfo(gameid,data,func);
};

gameclass.mod_record.prototype.getGCRecordInfo = function(gameid,data,func){
    this.curGameid = null;
    this.o_data=null;
    this.s_data=null;
    var _this=this;

    this.sendhttp( this.msg_list_Hander[gameid],data,function (retdata,temp,recvdata){

        _this.setCurGameid(gameid);
        if(gameid == gameclass.gamelzddz || gameid == gameclass.gameddz||gameid == gameclass.gameszp){
            var mydata = {roomData:retdata,temp:temp,playData:recvdata};
            _this.o_data = mydata.roomData.info;
        }else{
            if(!retdata.info){
                return;
            }
            _this.o_data = [];
            //cc.log(retdata.info);
            for(var i = 0;i < retdata.info.length;i++){
                if(gameid == gameclass.gamekwx)
                    _this.o_data.push(retdata.info[i]);
                else
                    _this.o_data.push(JSON.parse(retdata.info[i]));
            }
        }
        //cc.log(_this.o_data)
        var sd = {};
        cc.each(_this.o_data,function(o,x){
            if(gameid == gameclass.gameszp) o = JSON.parse(o);
            //if(!o.roomid) o.roomid = gameclass.gamegoldkwx;
            var rid = parseInt(o.roomid/100);
            if(!sd[rid]){
                sd[rid] = {
                    ot: o.roomid,
                    time: o.time,
                    children:[],
                    maxstep: o.maxstep,
                }
            }
            sd[rid].children.push(o);
        });
        _this.s_data = sd;
        if(func){
            func(_this.o_data);
        }
    });
},

gameclass.mod_record.prototype.getBureauList = function (){
    //cc.log(this.s_data);
    return this.s_data[this.curRoomid];
};

//回放请求
gameclass.mod_record.prototype.getRecordBureau = function(func){
    var header = this.msg_data_hander[this.curGameid];
    var data = {
        type:this.curBureauid,
        uid:this.curUserid
    };
    //cc.log(header,data);
    this.sendhttp(header,data,function (retdata,temp,recvdata){
        //cc.log("func ddzrecord");
        func(retdata);
    });
};