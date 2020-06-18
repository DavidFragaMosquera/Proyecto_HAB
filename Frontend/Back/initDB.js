const { getConnection } = require('./db.js');

async function main() {
  // Get reference to db
  const connection = await getConnection();
  //Comprobar que la bbdd
  const result = await connection.query('SELECT * from usuarios');
  
  console.log(result[0]);

  connection.release();
  process.exit();
}

main();