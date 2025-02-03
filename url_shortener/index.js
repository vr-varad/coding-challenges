const app = require('express')();

const { Client } = require('pg')

const crypto = require('crypto')

const consistentHash = require("consistent-hash")

const hash_rank = new consistentHash();

hash_rank.add("5433");
hash_rank.add("5434");
hash_rank.add("5435");

const clients = {
    "5433": new Client({
        host: "localhost",
        port: 5433,
        database: "shard1",
        user: "shard1",
        password: "shard1",
    }),
    "5434": new Client({
        host: "localhost",
        port: 5434,
        database: "shard2",
        user: "shard2",
        password: "shard2",
    }),
    "5435": new Client({
        host: "localhost",
        port: 5435,
        database: "shard3",
        user: "shard3",
        password: "shard3",
    })
}


async function connect() {
    await clients["5433"].connect();
    await clients["5434"].connect();
    await clients["5435"].connect();
}

app.get('/:url_Id', async (req, res) => {
    try {
        const url_Id = req.params.url_Id

        const server = hash_rank.get(url_Id);

        const result = await clients[server].query("SELECT * FROM URL_TABLE WHERE URL_ID = $1", [url_Id]);

        if(result.rowCount > 0){
            return res.status(200).json({
                success: true,
                server,
                url: result.rows[0]
            })
        }
        return res.status(404).json({
            success: false,
        })
    } catch (error) {
        return res.json(error);
    }
})

app.post('/', async (req, res) => {
    try {
        const url = req.query.url

        const hashed_url = crypto.createHash("sha256").update(url).digest("base64")

        const url_code = hashed_url.substring(0, 5);

        const server = hash_rank.get(url_code)

        await clients[server].query("INSERT INTO URL_TABLE (URL, URL_ID) VALUES ($1,$2);", [url, url_code]);

        return res.status(200).json({
            url_code,
            hashed_url,
            server,
            success: true
        })
    } catch (error) {
        return res.json(error);
    }
})


const startServer = () => {
    try {
        connect().then(() => {
            console.log("db connected");
            app.listen(3000, () => {
                console.log("server connected");
            })
        })
    } catch (error) {
        console.log("ERRor");
    }
}

startServer();