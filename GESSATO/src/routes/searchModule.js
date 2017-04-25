"use strict";
const db = require("./config.js");
let searchM = {
    search:function(req,resp){
        let spaceStyle = req.query.spaceStyle;
        let pageCount=parseInt(req.query.pageCount);
        let pageNum=(parseInt(req.query.pageNum)-1)*pageCount;
        let prdOrderBy=req.query.prdOrderBy;
        let prd_money1 = req.query.prd_money1;
        let prd_money2 = req.query.prd_money2;
        //let sql = "select * from product_details where prd_id=(select pc_id from functional_categories where pc_id=(select sf_id from style_function where sf_name=?))";
        let param=[]
        //param.push(spaceStyle[4]);
        let sql = "select * from product_details where 1=1";
        //let param=[];
        if(spaceStyle[0]!=""){
            sql+=" and fuc_id in(select fuc_id from functional_categories " +
            "where sf_id in(select sf_id from style_function where sf_name=?))";
            param.push(spaceStyle[0]);
        }
        if(spaceStyle[1]!=""){
            sql+=" and fuc_id in(select fuc_id from functional_categories " +
            "where pc_id in(select pc_id from product_category " +
            "where sup_id in(select sup_id from supplier where sup_number=?)))";
            param.push(spaceStyle[1]);
        }
        if(spaceStyle[2]!=""){
            sql+=" and fuc_id in(select fuc_id from functional_categories " +
            "where pc_id in(select pc_id from product_category where pc_stname=?))";
            param.push(spaceStyle[2]);
        }
        if(spaceStyle[3]!=""){
            sql+=" and ts_id in(select ts_id from template_style where ts_stname=?)";
            param.push(spaceStyle[3]);
        }
        if(spaceStyle[4]!=""){
            sql+=" and ma_id in(select ma_id from material where ma_name=?)";
            param.push(spaceStyle[4]);
        }
        if(spaceStyle[5]!=""){
            sql+=" and prd_id in(select prd_id from colors_details " +
            "where col_id in(select col_id from colors where col_name=?))";
            param.push(spaceStyle[5]);
        }
        if(spaceStyle[6]!=""){
            sql+=" and prd_size=?";
            param.push(spaceStyle[6]);
        }
        if(prd_money1!=""&& prd_money2!=""){
            sql+=" and prd_money BETWEEN ? AND ?";
            param.push(prd_money1);
            param.push(prd_money2);
        }
        if(prdOrderBy==1) {
            sql+="";
        }else if(prdOrderBy==2){
            sql+=" order by prd_money";
        }else if(prdOrderBy==3){
            sql+=" order by prd_money desc";
        }
        if(isNaN(pageNum)==false){              /*null  ""*/
            sql+=" limit ?,?"
            param.push(pageNum);
            param.push(pageCount);
        }
        console.log(sql)
        db.connection(sql,param,function(err,data){
            console.log(err);
            //console.log(data);
            resp.send(data);
        })

    }
}
module.exports = searchM;