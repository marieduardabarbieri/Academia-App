const express = require("express");

const router = express.Router();

const {
  listarMatriculas,
  cadastrarMatricula,
  buscarMatriculaPorId,
  atualizarMatricula,
  excluirMatricula,
} = require("../controllers/matriculasController");

router.get("/", listarMatriculas);
router.post("/", cadastrarMatricula);
router.get("/:id", buscarMatriculaPorId);
router.put("/:id", atualizarMatricula);
router.delete("/:id", excluirMatricula);

module.exports = router;
