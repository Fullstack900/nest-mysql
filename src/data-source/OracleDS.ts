require('dotenv').config();

const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export default async function OracleDS() {

  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECTSTRING
    });
    connection.callTimeout = 5 * 1000;
  } catch (exception) {
    console.log(exception);
  }
  return connection;
};



