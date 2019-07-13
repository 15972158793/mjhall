
gameclass.csvmgr  = cc.Class.extend({
    csv_item:[],
	csv_fish:[],
    ctor:function () {
    },

    init:function() {
        this.initCsv("res/csv/item.csv", this.csv_item);
		this.initCsv("res/csv/fishid.csv", this.csv_fish);
    },

    CSVToArray : function(strData, strDelimiter) {
        strDelimiter = (strDelimiter || ",");
        var objPattern = new RegExp(
            (
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );
        var arrData = [[]];
        var arrMatches = null;
        while (arrMatches = objPattern.exec( strData )){
            var strMatchedDelimiter = arrMatches[ 1 ];
            if (
                strMatchedDelimiter.length &&
                (strMatchedDelimiter != strDelimiter)
            ){
                arrData.push( [] );
            }
            if (arrMatches[ 2 ]){
                var strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                );
            } else {
                var strMatchedValue = arrMatches[ 3 ];
            }
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }
        return arrData;
    },

    initCsv : function(path, node){
        var _this = this;
        cc.loader.loadTxt(path,function(err,data){
            if(err){
                cc.log(err);
                return;
            }
            var csvArray = _this.CSVToArray(data,",");
            for(var i = 1;i < csvArray.length; i++){
                var rowData = csvArray[i];
                for(var j = 0;j < rowData.length; j++){
                    node[csvArray[i][0] + "_" + csvArray[0][j]] = csvArray[i][j];
                }
            }
            //cc.log(node);
        });
    }
});

var getcsvmgr = new gameclass.csvmgr();