const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongo");

async function listarMatriculas(req, res) {
  try {
    const db = getDatabase();

    const matriculas = await db.collection("matriculas").find().toArray();

    res.status(200).json(matriculas);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function cadastrarMatricula(req, res) {
  try {
    const db = getDatabase();

    const { alunoId, treinoId, dataInicio } = req.body;

    if (!alunoId || !treinoId || !dataInicio) {
      return res.status(400).json({
        erro: "Todos os campos são obrigatórios.",
      });
    }

    // Verifica se o aluno existe
    const aluno = await db.collection("alunos").findOne({
      _id: new ObjectId(alunoId),
    });

    if (!aluno) {
      return res.status(404).json({
        erro: "Aluno não encontrado.",
      });
    }

    // Verifica se o treino existe
    const treino = await db.collection("treinos").findOne({
      _id: new ObjectId(treinoId),
    });

    if (!treino) {
      return res.status(404).json({
        erro: "Treino não encontrado.",
      });
    }

    const resultado = await db.collection("matriculas").insertOne({
      alunoId: new ObjectId(alunoId),
      treinoId: new ObjectId(treinoId),
      dataInicio: new Date(dataInicio),
      status: "ativa",
    });

    res.status(201).json(resultado);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function buscarMatriculaPorId(req, res) {
  try {
    const db = getDatabase();

    const matricula = await db.collection("matriculas").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!matricula) {
      return res.status(404).json({
        erro: "Matrícula não encontrada.",
      });
    }

    res.json(matricula);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function atualizarMatricula(req, res) {
  try {
    const db = getDatabase();

    const { alunoId, treinoId, dataInicio, status } = req.body;

    // Verifica se o aluno existe
    const aluno = await db.collection("alunos").findOne({
      _id: new ObjectId(alunoId),
    });

    if (!aluno) {
      return res.status(404).json({
        erro: "Aluno não encontrado.",
      });
    }

    // Verifica se o treino existe
    const treino = await db.collection("treinos").findOne({
      _id: new ObjectId(treinoId),
    });

    if (!treino) {
      return res.status(404).json({
        erro: "Treino não encontrado.",
      });
    }

    const resultado = await db.collection("matriculas").updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: {
          alunoId: new ObjectId(alunoId),
          treinoId: new ObjectId(treinoId),
          dataInicio: new Date(dataInicio),
          status,
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

async function excluirMatricula(req, res) {
  try {
    const db = getDatabase();

    const resultado = await db.collection("matriculas").deleteOne({
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
  listarMatriculas,
  cadastrarMatricula,
  buscarMatriculaPorId,
  atualizarMatricula,
  excluirMatricula,
};
