/**
 * Created by 11952 on 2017/4/18.
 */
//mysql-pro
var Client = require("../node_modules/mysql-pro");
exports.client = new Client({
  mysql: {
    host: "127.0.0.1",
    port: 3306,
    database: "sign_data",
    user: "root",
    password: "chuang521"
  }
});
console.log(exports.client);

module.exports=exports;
