const API = "http://localhost:3000/matriculas";

let matriculaEditando = null;

let mapaAlunos = {};
let mapaTreinos = {};

const form = document.getElementById("formMatricula");
const lista = document.getElementById("listaMatriculas");
const selectAluno = document.getElementById("aluno");
const selectTreino = document.getElementById("treino");
const btnSalvar = document.getElementById("btnSalvar");

async function carregarAlunos() {
    const resposta = await fetch("http://localhost:3000/alunos");
    const alunos = await resposta.json();

    mapaAlunos = {};

    selectAluno.innerHTML =
        '<option value="">Selecione</option>';
    alunos.forEach(aluno => {
        mapaAlunos[aluno._id] = aluno.nome;
        selectAluno.innerHTML += `
            <option value="${aluno._id}">
              ${aluno.nome}
            </option>
            `;
    });
}

async function carregarTreinos() {
    const resposta = await fetch("http://localhost:3000/treinos");
    const treinos = await resposta.json();

    mapaTreinos = {};

    selectTreino.innerHTML = '<option value="">Selecione</option>';
    treinos.forEach(treino => {
        mapaTreinos[treino._id] = treino.nome;
        selectTreino.innerHTML += `
            <option value="${treino._id}">
                ${treino.nome}
            </option>
            `;
    });
}

async function carregarMatriculas() {
    const resposta = await fetch(API);
    const matriculas = await resposta.json();

    lista.innerHTML = "";

    matriculas.forEach(m => {
        const dataFormatada = new Date(m.dataInicio).toLocaleDateString("pt-BR");

        lista.innerHTML += `
            <tr>
                <td>${mapaAlunos[m.alunoId] || m.alunoId}</td>
                <td>${mapaTreinos[m.treinoId] || m.treinoId}</td>
                <td>${dataFormatada}</td>
                <td>${m.status ? "Ativa" : "Inativa"}</td>
                
                <td>
                    <button
                        class="btnEditar"
                        onclick="editarMatricula('${m._id}')">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        class="btnExcluir"
                        onclick="excluirMatricula('${m._id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </td>
            </tr>
                    `;
    });
}

form.addEventListener("submit", cadastrarMatricula);

async function cadastrarMatricula(event) {
    event.preventDefault();

    const matricula = {
        alunoId: selectAluno.value,
        treinoId: selectTreino.value,
        dataInicio: document.getElementById("dataInicio").value,
        status: document.getElementById("status").value === "true"
    };

    if (matriculaEditando) {
        await fetch(`${API}/${matriculaEditando}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(matricula)
        });

        matriculaEditando = null;
        btnSalvar.innerText = "Salvar";
    } else {
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(matricula)
        });
    }

    form.reset();
    await carregarMatriculas();
}

async function editarMatricula(id) {
    const resposta = await fetch(`${API}/${id}`);

    const m = await resposta.json();

    matriculaEditando = id;

    selectAluno.value = m.alunoId;
    selectTreino.value = m.treinoId;

    document.getElementById("dataInicio").value = m.dataInicio;
    document.getElementById("status").value = m.status.toString();

    btnSalvar.innerText = "Atualizar";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

async function excluirMatricula(id) {
    if (!confirm("Deseja excluir esta matrícula?")) return;

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    carregarMatriculas();
}

async function iniciar() {
    await carregarAlunos();
    await carregarTreinos();
    await carregarMatriculas();
}

iniciar();