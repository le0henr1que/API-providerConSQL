const { Router } = require("express");
const MSSQLProvider = require("./infra/SQLProvider");
const ClientRepository = require("./repositories/ClientRepository")
const ParentRepository = require("./repositories/ParentRepository")
const router = Router();

router.get("/provider", async (req, res) => {
  let provider;
  provider = new MSSQLProvider();
  await provider.connect();
  const transaction = provider.transaction();
  const client = new ClientRepository();
  const parent = new ParentRepository()
  try {
    await transaction.begin();

    const create = await client.create(1, {
      transaction: transaction,
      database: "master",
    });

    
    const clients = await client.get(1, {
      transaction: transaction,
      database: "master",
    });
    
    const parents = await parent.get(1, {
      transaction: transaction,
      database: "develop",
    })

    await transaction.commit();
    res.json([...clients, ...parents]);
  } catch (error) {
    console.error("Error in transaction", error);
    await transaction.rollback();
  } finally {
    await provider.pool.close();
    console.log("Is the pool connected?", provider.pool);
  }
});

module.exports = router;
