const express = require("express");
const cors = require("cors");

const { conectarBanco } = require("./config/mongo");

const app = express();

app.use(cors());
app.use(express.json());

const alunosRoutes = require("./routes/alunos");

app.use("/alunos", alunosRoutes);

async function iniciarServidor() {
  await conectarBanco();

  app.listen(3000, () => {
    console.log("🚀 Servidor rodando na porta 3000");
  });
}

iniciarServidor();
