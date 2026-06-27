const express = require("express");

const router = express.Router();

const {
  listarInstrutores,
  cadastrarInstrutores,
  buscarInstrutoresporId,
  atualizarInstrutor,
  excluirInstrutor,
} = require("../controllers/instrutoresController");

router.get("/", listarInstrutores);
router.post("/", cadastrarInstrutores);
router.get("/:id", buscarInstrutoresporId);
router.put("/:id", atualizarInstrutor);
router.delete("/:id", excluirInstrutor);

module.exports = router;
