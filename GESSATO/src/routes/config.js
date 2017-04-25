"use strict";
const mysql = require("mysql");
exports.connection=function(sql,arr,fn){
    console.log("进入mysql");
    let  myConnection= mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",    //默认不写就是3306
        database:"gessato"
    });
    myConnection.connect();
    myConnection.query(sql,arr,fn);
    myConnection.end();
};
//通过连接池连接数据库
//AJAX包含哪些技术 作用
//同步和异步的原理 概念 区别
//form表单提交是同步还是异步



