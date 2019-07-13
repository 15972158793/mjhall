/**
 * Created by feihuihui on 2015/11/27.
 */
var mod_userdefault = {};

mod_userdefault.init = function() {
    mod_userdefault.userdata = {};
    mod_userdefault.globaldata = {};

    mod_userdefault.globaldata.code = "";
    mod_userdefault.globaldata.time = (new Date()).getTime();
    //mod_userdefault.globaldata.savepassword = true;

};

mod_userdefault.init();

/*
mod_userdefault.writejson = function()
{
    var myDate = new Date();
    mod_userdefault.userdata.svaeitme.year = myDate.getYear();
    mod_userdefault.userdata.svaeitme.day = myDate.getDay();

    cc.sys.localStorage.setItem("me" + mod_base.userdata.uid.toString(), JSON.stringify(mod_userdefault.userdata));
};
*/
mod_userdefault.writeglobaljson = function()
{
    cc.sys.localStorage.setItem("global", JSON.stringify(mod_userdefault.globaldata));
};

mod_userdefault.clone2 = function(old,obj){

    var o = old;
    for(var key in old){
        if(obj[key] != null){
            if ( typeof(obj[key]) == 'object' ){
                o[key] = mod_userdefault.clone2(old[key],obj[key]);
            }else{
                o[key] = obj[key];
            }
        }
    }
    return o;
}
/*
mod_userdefault.readjson = function()
{
    cc.log("me" + mod_base.userdata.uid.toString());
    var _str = cc.sys.localStorage.getItem("me" + mod_base.userdata.uid.toString());
    cc.log(_str);

    mod_userdefault.init();

    if(_str == null || _str.length == 0)
    {
        return;
    }

    cc.log("readreadreadreadreadreadreadreadreadreadreadreadread mod_userdefault.userdata");
    mod_userdefault.userdata = JSON.parse(cc.sys.localStorage.getItem("me" + mod_base.userdata.uid.toString()));//mod_userdefault.clone2( mod_userdefault.userdata,JSON.parse(cc.sys.localStorage.getItem("me")) );
    cc.log(JSON.stringify(mod_userdefault.userdata));

    mod_userdefault.Inituserdata();

    var myDate = new Date();
    var year = myDate.getYear();
    var day = myDate.getDay();
    if(mod_userdefault.userdata.svaeitme.year != year && mod_userdefault.userdata.svaeitme.day != day){
        mod_userdefault.userdata.taskeverydata = {};
        mod_userdefault.writejson();
    }
};
*/
mod_userdefault.readglobaljson = function()
{
    var _str = cc.sys.localStorage.getItem("global");
    if(_str == null || _str.length == 0)
        return;

    mod_userdefault.globaldata = JSON.parse(cc.sys.localStorage.getItem("global"));//mod_userdefault.clone2( mod_userdefault.userdata,JSON.parse(cc.sys.localStorage.getItem("me")) );

    mod_userdefault.Initglobaldata();
};
/*
mod_userdefault.Inituserdata = function()
{
    if (!mod_userdefault.userdata.hasOwnProperty("taskdata"))
        mod_userdefault.userdata.taskdata = [0,0,0,0,0,0,0,0,0,0,0,0,0];

    if (!mod_userdefault.userdata.hasOwnProperty("taskeverydata"))
        mod_userdefault.userdata.taskeverydata = [0,0,0,0,0,0,0,0];

    if (!mod_userdefault.userdata.hasOwnProperty("taskdatalqaward"))
        mod_userdefault.userdata.taskdatalqaward = [0,0,0,0,0,0,0,0,0,0,0,0,0];

    if (!mod_userdefault.userdata.hasOwnProperty("taskeverydatalqaward"))
        mod_userdefault.userdata.taskeverydatalqaward = [0,0,0,0,0,0,0,0];

    if (!mod_userdefault.userdata.hasOwnProperty("svaeitme"))
    {
        mod_userdefault.userdata.svaeitme = {};
        if (!mod_userdefault.userdata.svaeitme.hasOwnProperty("year"))
            mod_userdefault.userdata.svaeitme.year = 0;

        if (!mod_userdefault.userdata.svaeitme.hasOwnProperty("day"))
            mod_userdefault.userdata.svaeitme.day = 0;
    }

    if (!mod_userdefault.userdata.hasOwnProperty("Chatmsglist"))
        mod_userdefault.userdata.Chatmsglist = [];

    if (!mod_userdefault.userdata.hasOwnProperty("chouren"))
        mod_userdefault.userdata.chouren = {};

};*/

mod_userdefault.Initglobaldata = function()
{
    if (!mod_userdefault.globaldata.hasOwnProperty("autologin"))
        mod_userdefault.globaldata.autologin = true;

    if (!mod_userdefault.globaldata.hasOwnProperty("savepassword"))
        mod_userdefault.globaldata.savepassword = true;
};

mod_userdefault.readglobaljson();

