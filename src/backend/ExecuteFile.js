var exec = require('child_process').exec;
const fs = require('fs'); 

module.exports.executeFile = function(res,data){
    res.header("Access-Control-Allow-Origin", "*");
    exec("type nul > ./codes/"+data.FileName, function (error, stdout, stderr) {
        if(error==null){
            fs.writeFile("./codes/"+data.FileName, data.Code, function(err) {
                if(err==null){
                    exec("uclid ./codes/"+data.FileName, function(e, stdouti, stderr){
                        if(e==null){
                        res.send(stdouti);
                        }else {
                            console.log("Compilation error")
                            res.send(e+stderr);
                        }
                    });
                }else {
                    res.send("Something went wrong try again later.");
                }
            });
        }else {
            res.send("Something went wrong try again later.");
        }
    });

}