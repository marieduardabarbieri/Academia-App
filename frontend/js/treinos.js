const API = "http://localhost:3000/treinos";

let treinoEditando = null;

const form = document.getElementById("formTreino");
const listaTreinos = document.getElementById("listaTreinos");
const selectInstrutor = document.getElementById("instrutor");
const selectExercicios = document.getElementById("exercicios");
const btnSalvar = document.getElementById("btnSalvar");

async function carregarInstrutores() {
    const resposta = await fetch("http://localhost:3000/instrutores");
    const instrutores = await resposta.json();

    selectInstrutor.innerHTML =
        '<option value="">Selecione um instrutor</option>';

    instrutores.forEach(instrutor => {
        selectInstrutor.innerHTML += `
            <option value="${instrutor._id}">
                ${instrutor.nome}
            </option>
        `;
    });
}

async function carregarExercicios() {
    const resposta = await fetch("http://localhost:3000/exercicios");

    const exercicios = await resposta.json();
    selectExercicios.innerHTML = "";

    exercicios.forEach(exercicio => {
        selectExercicios.innerHTML += `
            <option value="${exercicio._id}">
                ${exercicio.nome}
            </option>
        `;
    });
}

async function carregarTreinos() {
    const resposta = await fetch(API);

    const treinos = await resposta.json();
    listaTreinos.innerHTML = "";

    treinos.forEach(treino => {
        listaTreinos.innerHTML += `
            <tr>
                <td>${treino.nome}</td>
                <td>${treino.instrutorId}</td>
                <td>${treino.exercicios.join(", ")}</td>
                <td>
                    <button
                        class="btnEditar"
                        onclick="editarTreino('${treino._id}')">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        class="btnExcluir"
                        onclick="excluirTreino('${treino._id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}


form.addEventListener("submit", cadastrarTreino);

async function cadastrarTreino(event) {
    event.preventDefault();

    const exerciciosSelecionados =
        Array.from(selectExercicios.selectedOptions)
            .map(opcao => opcao.value);

    const treino = {
        nome: document.getElementById("nome").value,
        instrutorId: selectInstrutor.value,
        exercicios: exerciciosSelecionados
    };

    if (treinoEditando) {
        await fetch(`${API}/${treinoEditando}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(treino)
        });

        treinoEditando = null;
        btnSalvar.innerText = "Salvar";
    }
    else {
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(treino)
        });
    }

    form.reset();
    carregarTreinos();
}

carregarInstrutores();
carregarExercicios();
carregarTreinos();

async function editarTreino(id) {
    const resposta = await fetch(`${API}/${id}`);
    const treino = await resposta.json();

    treinoEditando = id;
    document.getElementById("nome").value = treino.nome;

    selectInstrutor.value = treino.instrutorId;

    Array.from(selectExercicios.options).forEach(opcao => {
        opcao.selected = treino.exercicios.includes(opcao.value);
    });

    btnSalvar.innerText = "Atualizar";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

async function excluirTreino(id) {
    const confirmar = confirm("Deseja excluir este treino?");
    if (!confirmar) return;

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });
    carregarTreinos();
}