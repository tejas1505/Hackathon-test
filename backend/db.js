var mysql2 = require('mysql2')
var connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'tejas1505', 
  database: 'hackathon',
})
connection.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Database connected')
})

module.exports = connection;