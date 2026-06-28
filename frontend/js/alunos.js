const API = "http://localhost:3000/alunos";

const listaAlunos = document.getElementById("listaAlunos");
const form = document.querySelector("form");

// Carregar alunos
async function carregarAlunos() {
  const resposta = await fetch(API);
  const alunos = await resposta.json();

  listaAlunos.innerHTML = "";

  alunos.forEach((aluno) => {
    listaAlunos.innerHTML += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>${aluno.idade}</td>

                <td>

                    <button onclick="editarAluno('${aluno._id}')">
                        ✏️
                    </button>

                    <button onclick="excluirAluno('${aluno._id}')">
                        🗑️
                    </button>

                </td>

            </tr>
        `;
  });
}

carregarAlunos();

form.addEventListener("submit", cadastrarAluno);

async function cadastrarAluno(event) {
  event.preventDefault();

  const aluno = {
    nome: document.getElementById("nome").value,

    email: document.getElementById("email").value,

    idade: Number(document.getElementById("idade").value),
  };

  await fetch(API, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(aluno),
  });

  form.reset();

  carregarAlunos();
}
