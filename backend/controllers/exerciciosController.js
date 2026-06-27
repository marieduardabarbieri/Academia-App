const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongo");

async function listarExercicios(req, res) {
  try {
    const db = getDatabase();

    const exercicios = await db.collection("exercicios").find().toArray();

    res.status(200).json(exercicios);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function cadastrarExercicio(req, res) {
  try {
    const db = getDatabase();

    const { nome, grupoMuscular } = req.body;

    // Validações
    if (!nome || !grupoMuscular) {
      return res.status(400).json({
        erro: "Todos os campos são obrigatórios.",
      });
    }

    const resultado = await db.collection("exercicios").insertOne({
      nome,
      grupoMuscular,
    });

    res.status(201).json(resultado);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function buscarExercicioPorId(req, res) {
  try {
    const db = getDatabase();

    const exercicio = await db.collection("exercicios").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!exercicio) {
      return res.status(404).json({
        erro: "Exercício não encontrado.",
      });
    }

    res.json(exercicio);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function atualizarExercicio(req, res) {
  try {
    const db = getDatabase();

    const { nome, grupoMuscular } = req.body;

    const resultado = await db.collection("exercicios").updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: {
          nome,
          grupoMuscular,
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

async function excluirExercicio(req, res) {
  try {
    const db = getDatabase();

    const resultado = await db.collection("exercicios").deleteOne({
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
  listarExercicios,
  cadastrarExercicio,
  buscarExercicioPorId,
  atualizarExercicio,
  excluirExercicio,
};
