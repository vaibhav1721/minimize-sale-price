let Promise                                 = require('bluebird');

let dbHandler                               = require('./../../../services/mysqlLib');

exports.validateUser                        = validateUser;

function validateUser(apiReference, opts) {
  return new Promise((resolve, reject) =>{
    let columns = opts.columns || " * ";
    let sql = ` SELECT ${columns} FROM tb_users WHERE 1=1 `
    let values = [];
    if(opts.access_token){
      sql += " AND access_token = ? ";
      values.push(opts.access_token);
    }

    dbHandler.mysqlQueryPromise(apiReference, "VALIDATE USER" , sql, values).then((data) =>{
      resolve(data)
    },(error) =>{
      reject(error)
    })
  })
}