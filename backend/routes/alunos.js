const express = require("express");

const router = express.Router();

const {
  listarAlunos,
  cadastrarAluno,
  buscarAlunoPorId,
  atualizarAluno,
  excluirAluno,
} = require("../controllers/alunosController");

router.get("/", listarAlunos);
router.post("/", cadastrarAluno);
router.get("/:id", buscarAlunoPorId);
router.put("/:id", atualizarAluno);
router.delete("/:id", excluirAluno);

module.exports = router;
