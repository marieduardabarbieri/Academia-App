const express = require("express");
const cors = require("cors");

const { conectarBanco } = require("./config/mongo");

const app = express();

app.use(cors());
app.use(express.json());

const alunosRoutes = require("./routes/alunos");
const exerciciosRoutes = require("./routes/exercicios");
const instrutoresRoutes = require("./routes/instrutores");
const matriculasRoutes = require("./routes/matriculas");
const treinosRoutes = require("./routes/treinos");

app.use("/alunos", alunosRoutes);
app.use("/exercicios", exerciciosRoutes);
app.use("/instrutores", instrutoresRoutes);
app.use("/matriculas", matriculasRoutes);
app.use("/treinos", treinosRoutes);

async function iniciarServidor() {
  await conectarBanco();

  app.listen(3000, () => {
    console.log("🚀 Servidor rodando na porta 3000");
  });
}

iniciarServidor();
