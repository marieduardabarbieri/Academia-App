const API = "http://localhost:3000/exercicios";

let exercicioEditando = null;

const listaExercicios = document.getElementById("listaExercicios");
const form = document.getElementById("formExercicios");

// Carregar exercícios
async function carregarExercicios() {
    const resposta = await fetch(API);
    const exercicios = await resposta.json();

    listaExercicios.innerHTML = "";

    exercicios.forEach((exercicio) => {
        listaExercicios.innerHTML += `
            <tr>
                <td>${exercicio.nome}</td>
                <td>${exercicio.grupoMuscular}</td>

               <td>

                <button
                    class="btnEditar"
                    onclick="editarExercicio('${exercicio._id}')">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="btnExcluir"
                    onclick="excluirExercicio('${exercicio._id}')">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

            </tr>
        `;
    });
}

carregarExercicios();

form.addEventListener("submit", cadastrarExercicio);

async function cadastrarExercicio(event) {
    event.preventDefault();
    console.log("ENTROU AQUI");

    const exercicio = {
        nome: document.getElementById("nome").value,
        grupoMuscular: document.getElementById("grupoMuscular").value,
    };

    if (exercicioEditando) {
        await fetch(`${API}/${exercicioEditando}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exercicio)

        });
        exercicioEditando = null;
        document.getElementById("btnSalvar").innerText = "Salvar";

    } else {
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exercicio)
        });

    }

    form.reset();
    carregarExercicios();
}

async function editarExercicio(id) {
    const resposta = await fetch(`${API}/${id}`);

    const exercicio = await resposta.json();
    exercicioEditando = id;

    document.getElementById("nome").value = exercicio.nome;
    document.getElementById("grupoMuscular").value = exercicio.grupoMuscular;
    document.getElementById("btnSalvar").innerText = "Atualizar";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

async function excluirExercicio(id) {
    const confirmar = confirm("Deseja excluir este exercício?");

    if (!confirmar) return;
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    carregarExercicios();
}
