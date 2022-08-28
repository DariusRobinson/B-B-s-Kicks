const { client, getAllUsers } = require("./index");

async function droptables() {
  try {

console.log("starting to drop tables")

    await client.query(`
    DROP TABLE IF EXISTS users;



        `);
        console.log("finished droping tables")
  } catch (error) {
    console.error('erro dropping tables')
  }throw error;
}

async function createTables() {
  try {

    console.log("starting to build tables")

    await client.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );


    `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
  }throw error;
}

async function rebuildDB() {
  try {
    await droptables();
    await createTables();
  } catch (error) {
    throw(error)
  } finally {
    client.end();
  }
}
async function testDB() {
    try {
      console.log("Starting to test database...");
  
      const users = await getAllUsers();
      console.log("getAllUsers:", users);
  
      console.log("Finished database tests!");
    } catch (error) {
      console.error("Error testing database!");
      throw error;
    }
  }


rebuildDB()
.then(testDB)
.catch(console.error)
.finally(()=>client.end());