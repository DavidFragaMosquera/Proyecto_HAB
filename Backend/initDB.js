const { getConnection } = require('./db');

async function main() {
  // Get reference to db
  const connection = await getConnection();

  const result = await connection.query('SELECT * from usuarios');
  
  console.log(result[0]);

  connection.release();
  process.exit();
}

main();