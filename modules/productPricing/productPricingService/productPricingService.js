let Promise                                 = require('bluebird');

let dbHandler                               = require('./../../../services/mysqlLib');

exports.getProductData                      = getProductData;


function getProductData(apiReference, opts) {
  return new Promise((resolve, reject) =>{
    let columns = opts.columns || " * ";
    let sql = ` SELECT ${columns} FROM tb_products WHERE 1=1 `
    let values = [];
    if(opts.product_type){
      sql += " AND product_type = ? ";
      values.push(opts.product_type);
    }
    if(opts.product_type){
      sql += " AND product_type = ? ";
      values.push(opts.product_type);
    }

    dbHandler.mysqlQueryPromise(apiReference, "VALIDATE USER" , sql, values).then((data) =>{
      resolve(data)
    },(error) =>{
      reject(error)
    })
  })
}