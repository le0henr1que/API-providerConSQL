class ParentRepository {
  constructor() {}

  async get(client, options) {
    const query = `
       SELECT * FROM parentesco
    `;
 
    await options.transaction.request().query(`USE ${options.database}`);
    const results = await options.transaction.request().query(query);
    return results.recordsets;
  }
}
module.exports = ParentRepository;
