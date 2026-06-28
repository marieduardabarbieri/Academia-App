const API = "http://localhost:3000/alunos";

let alunoEditando = null;

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

                <button
                    class="btnEditar"
                    onclick="editarAluno('${aluno._id}')">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="btnExcluir"
                    onclick="excluirAluno('${aluno._id}')">

                    <i class="fa-solid fa-trash"></i>

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

    if (alunoEditando) {
        await fetch(`${API}/${alunoEditando}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)

        });
        alunoEditando = null;
        document.getElementById("btnSalvar").innerText = "Salvar";

    } else {

        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
        });

    }

    form.reset();
    carregarAlunos();
}

async function editarAluno(id) {
    const resposta = await fetch(`${API}/${id}`);

    const aluno = await resposta.json();
    alunoEditando = id;

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("email").value = aluno.email;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("btnSalvar").innerText = "Atualizar";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

async function excluirAluno(id) {
    const confirmar = confirm("Deseja excluir este aluno?");

    if (!confirmar) return;
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    listarAlunos();
}
