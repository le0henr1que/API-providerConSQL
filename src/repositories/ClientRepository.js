class ClientRepository {
  constructor() {}
  async create(client, options) {
    const query = `
        INSERT INTO 
            Clientes 
                (
                    ClienteID, 
                    NomeCliente, 
                    EmailCliente
                )
            VALUES 
                (3, 'Cliente 3', 'clienteteste@email.com'),
                (4, 'Cliente 4', 'clientetestedddd@email.com');
    `;
    await options.transaction.request().query(`USE ${options.database}`);
    const results = await options.transaction.request().query(query);
    return results.recordsets;
  }
  async get(client, options) {
    const query = `
       SELECT * FROM Clientes
    `;
 
    await options.transaction.request().query(`USE ${options.database}`);
    const results = await options.transaction.request().query(query);
    return results.recordsets;
  }
}
module.exports = ClientRepository;
