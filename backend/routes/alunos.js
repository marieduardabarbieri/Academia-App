const express = require("express");

const router = express.Router();

const {
  listarAlunos,
  cadastrarAluno,
} = require("../controllers/alunosController");

router.get("/", listarAlunos);
router.post("/", cadastrarAluno);

module.exports = router;
