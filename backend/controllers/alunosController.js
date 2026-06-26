const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongo");

async function listarAlunos(req, res) {
  try {
    const db = getDatabase();

    const alunos = await db.collection("alunos").find().toArray();

    res.status(200).json(alunos);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function cadastrarAluno(req, res) {
  try {
    const db = getDatabase();

    const { nome, email, idade } = req.body;

    // Validações
    if (!nome || !email || !idade) {
      return res.status(400).json({
        erro: "Todos os campos são obrigatórios.",
      });
    }

    const resultado = await db.collection("alunos").insertOne({
      nome,
      email,
      idade,
    });

    res.status(201).json(resultado);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

module.exports = {
  listarAlunos,
  cadastrarAluno,
};
