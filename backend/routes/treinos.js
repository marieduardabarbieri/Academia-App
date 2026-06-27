const express = require("express");

const router = express.Router();

const {
  listarTreino,
  cadastrarTreinos,
  buscarTreinoporId,
  atualizarTreino,
  excluirTreino,
} = require("../controllers/treinosController");

router.get("/", listarTreino);
router.post("/", cadastrarTreinos);
router.get("/:id", buscarTreinoporId);
router.put("/:id", atualizarTreino);
router.delete("/:id", excluirTreino);

module.exports = router;
