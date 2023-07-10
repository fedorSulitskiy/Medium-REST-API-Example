const pool = require('../config/database');

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO cs_modules(
        module_id,
        module_name,
        credits,
        grade)
      VALUES(?, ?, ?, ?)`,
      [
        data.module_id,
        data.module_name,
        data.credits,
        data.grade,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  show: callBack => {
    pool.query(
      `SELECT * FROM cs_modules`,
      [],
      (error, results, fields) => {
        if (error) {
            return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  update: (module_id, data, callBack) => {
    pool.query(
      `UPDATE cs_modules SET
        module_name = ?,
        credits = ?,
        grade = ?
      WHERE module_id = ?`,
      [
        data.module_name,
        data.credits,
        data.grade,
        module_id
      ],
      (error, results, fields) => {
        if (error) {
            return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteModule: (module_id, callBack) => {
    pool.query(
      `DELETE FROM cs_modules WHERE module_id = ?`,
      [module_id],
      (error, results, fields) => {
        if (error) {
            return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  login: (username, callBack) => {
    pool.query(
      `SELECT * FROM users WHERE username = ?`,
      [username],
      (error, results, fields) => {
        if (error) {
            return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
}