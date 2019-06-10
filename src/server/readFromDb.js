const sqlite3 = require("sqlite3").verbose();
const { join } = require("path");

const dbLocation = join(__dirname, "../../manifest/db.sqlite3");
const db = new sqlite3.Database(dbLocation);

module.exports = (entity, hash) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT json FROM ${entity} WHERE id + 4294967296 = ${hash} OR id = ${hash}`,
      function(err, row) {
        if (err) {
          reject(err);
          return;
        }
        resolve(row);
      }
    );
  });
};
