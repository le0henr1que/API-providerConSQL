// MSSQLProvider.js
const sql = require("mssql");

class MSSQLProvider {
  constructor() {
    this.pool = new sql.ConnectionPool({
      user: "sa",
      password: "StrongPassword123#",
      server: "localhost",
      database: "",
      pool: {
        max: 10,
        min: 0,
      },
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    });
    this.pool.on("error", (err) => console.log(err));
  }

  async connect() {
    if (this.pool.connected || this.pool.connecting) return;
    await this.pool.connect();
  }

  transaction() {
    return new sql.Transaction(this.pool);
  }
}

module.exports = MSSQLProvider;
