const {Client} = require ('pg');


const client = new Client('postgres://localhost:5432/BBKicks');

async function getAllUsers () {
    const { rows } = await client.query(`
    SELECT id, username
    FROM users
    `)

    return rows;
}





module.exports = {
    client,
    getAllUsers
}