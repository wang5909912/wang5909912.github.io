"use strict";
/*文件管理模块 file system*/
const fs = require("fs");

let fileModule={

    uploadImg:function(req,resp){
        /*文件流来实现异步上传
        * Node.js - stream - 可读可写 -
        * 首先:创建读入流 createReadStream(临时路径)
        * .pipe() 建立读入流及写入流之间的管道
        * 创建写入流 createWriteStream(目标位置)*/
    //    在流里面的临时路径 req.files.INPUTname.ws.path
        console.log(req.files.myImg);
        let tempPath = req.files.myImg.ws.path;
        let targetPath = "./src/public/upload/"+req.files.myImg.name;
        fs.createReadStream(tempPath).pipe(fs.createWriteStream(targetPath));
        //手动文件清空
        fs.unlink(tempPath);
        //resp.send("OK 上传完毕");
        resp.send("../upload/"+req.files.myImg.name);
    }
}

module.exports=fileModule;
