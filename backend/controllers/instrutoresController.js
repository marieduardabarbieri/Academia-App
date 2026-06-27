const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongo");

async function listarInstrutores(req, res) {
  try {
    const db = getDatabase();

    const instrutores = await db.collection("instrutores").find().toArray();

    res.status(200).json(instrutores);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function cadastrarInstrutores(req, res) {
  try {
    const db = getDatabase();

    const { nome, especialidade } = req.body;

    // Validações
    if (!nome || !especialidade) {
      return res.status(400).json({
        erro: "Todos os campos são obrigatórios.",
      });
    }

    const resultado = await db.collection("instrutores").insertOne({
      nome,
      especialidade,
    });

    res.status(201).json(resultado);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function buscarInstrutoresporId(req, res) {
  try {
    const db = getDatabase();

    const instrutor = await db.collection("instrutores").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!instrutor) {
      return res.status(404).json({
        erro: "Instrutor não encontrado.",
      });
    }

    res.json(instrutor);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function atualizarInstrutor(req, res) {
  try {
    const db = getDatabase();

    const { nome, especialidade } = req.body;

    const resultado = await db.collection("instrutores").updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: {
          nome,
          especialidade,
        },
      },
    );

    res.json(resultado);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function excluirInstrutor(req, res) {
  try {
    const db = getDatabase();

    const resultado = await db.collection("instrutores").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json(resultado);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

module.exports = {
  listarInstrutores,
  cadastrarInstrutores,
  buscarInstrutoresporId,
  atualizarInstrutor,
  excluirInstrutor,
};
