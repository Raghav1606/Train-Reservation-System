const sql = require('mysql')


var dbconfig = {
	user : "root",
	password : "raghav16",
	host : "localhost",
	database : "accounts_node" 
}

var connection = sql.createConnection(dbconfig);

function createConnection(){
	connection.connect();
}