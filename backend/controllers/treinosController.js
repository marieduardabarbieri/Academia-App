const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongo");

async function listarTreino(req, res) {
  try {
    const db = getDatabase();

    const treinos = await db.collection("treinos").find().toArray();

    res.status(200).json(treinos);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function cadastrarTreinos(req, res) {
  try {
    const db = getDatabase();

    const { nome, instrutorId, exercicios } = req.body;

    // Validações
    if (!nome || !instrutorId || !exercicios || exercicios.length === 0) {
      return res.status(400).json({
        erro: "Todos os campos são obrigatórios.",
      });
    }

    const resultado = await db.collection("treinos").insertOne({
      nome,
      instrutorId: new ObjectId(instrutorId),
      exercicios: exercicios.map((id) => new ObjectId(id)),
    });

    res.status(201).json(resultado);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function buscarTreinoporId(req, res) {
  try {
    const db = getDatabase();

    const treino = await db.collection("treinos").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!treino) {
      return res.status(404).json({
        erro: "Treino não encontrado.",
      });
    }

    res.json(treino);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function atualizarTreino(req, res) {
  try {
    const db = getDatabase();

    const { nome, instrutorId, exercicios } = req.body;

    const resultado = await db.collection("treinos").updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: {
          nome,
          instrutorId: new ObjectId(instrutorId),
          exercicios: exercicios.map((id) => new ObjectId(id)),
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

async function excluirTreino(req, res) {
  try {
    const db = getDatabase();

    const resultado = await db.collection("treinos").deleteOne({
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
  listarTreino,
  cadastrarTreinos,
  buscarTreinoporId,
  atualizarTreino,
  excluirTreino,
};
