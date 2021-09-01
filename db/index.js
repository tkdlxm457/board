var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'kakaotalk1!',
  database : 'user_info'
});
 
connection.connect();
 
connection.query('SELECT  *  FROM id', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();