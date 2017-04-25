"use strict";
const db = require("./config.js");
const pageModule={
    pageCount:3,        //ÿһҳ��ʾ������
    queryAll:function(req,resp){
        let pageNum = req.query.pageNum;    //ҳ��
        //let pageCount = 3;  //ÿһҳ������
        let sql = "select * from product_details limit ?,?";
        let param=[];
        param.push((pageNum-1)*pageModule.pageCount);
        param.push(pageModule.pageCount);

        /*��һҳ
         * 1/limit 0,3
         * 2/limit 3,3
         * 3/limit 6,3
         *
         * ��ǰҳ-1 * ÿһҳ��ʾ������*/
        db.connection(sql,param,function(err,data){
            //console.log(err);
            if(data!=undefined){
                resp.send(data);
            }
        })
    },
    /*Ҫ֪���ж�������Ϣ��Ȼ�����ÿһ�����������õ���ҳ��*/
    pageNumCount:function(req,resp){
        //let pageCount=3;
        let sql="select count(*) as mycount from product_details";
        db.connection(sql,[],function(err,data){
            //console.log(this);
            console.log(data[0].mycount/pageModule.pageCount);
            //���send��һ��������Number���ͣ����ͻḲ�Ƿ���Ĭ�ϵ�status
            //�ڶ���������ΪҪ���ص�����
            //resp.send(200,5);
            resp.send(String(Math.ceil(data[0].mycount/pageModule.pageCount)));
        })
    }
};
module.exports=pageModule;
