const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

let db;

async function conectarBanco() {
  await client.connect();

  db = client.db("academia");

  app.locals.db = db;

  console.log("MongoDB conectado");
}

conectarBanco();

app.use("/alunos", require("./routes/alunos"));
app.use("/instrutores", require("./routes/instrutores"));
app.use("/exercicios", require("./routes/exercicios"));
app.use("/treinos", require("./routes/treinos"));
app.use("/matriculas", require("./routes/matriculas"));

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
