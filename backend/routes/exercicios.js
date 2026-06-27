const express = require("express");

const router = express.Router();

const {
  listarExercicios,
  cadastrarExercicio,
  buscarExercicioPorId,
  atualizarExercicio,
  excluirExercicio,
} = require("../controllers/exerciciosController");

router.get("/", listarExercicios);
router.post("/", cadastrarExercicio);
router.get("/:id", buscarExercicioPorId);
router.put("/:id", atualizarExercicio);
router.delete("/:id", excluirExercicio);

module.exports = router;
