//Conexão com o mongo
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

let db;

async function conectarBanco() {
  try {
    await client.connect();

    db = client.db("academia");

    console.log("✅ MongoDB conectado.");
  } catch (erro) {
    console.error("Erro ao conectar:", erro.message);
  }
}

function getDatabase() {
  return db;
}

module.exports = {
  conectarBanco,
  getDatabase,
};
