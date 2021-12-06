const mysql = require('mysql2/promise');

const dbconfig = {
    host: '198.23.228.133',
    port: 3306,
    user: 'fooduser',
    password: 'foodece656',
    database: 'foodproject'
};

var pool=mysql.createPool(dbconfig);
 
module.exports={
    query: (sql)=>pool.query(sql),
    bulk: (sql,value)=>pool.query(sql,value)
}
 
