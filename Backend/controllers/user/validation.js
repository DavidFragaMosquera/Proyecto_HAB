require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function validateUser(req, res, next) {
  let connection;

  try {
    const { code } = req.query;

    connection = await getConnection();
    const [
      result
    ] = await connection.query(
      'UPDATE usuarios SET active=true,registrationcode=NULL WHERE registrationcode=?',
      [code]
    );
    if (result.affectedRows === 0) {
      throw generateError('Wrong validation', 400);
    }
    res.send({
      status: 'ok',
      message: 'User is validated, now, you can login.'
      // data: {
      //   token
      // }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { validateUser };