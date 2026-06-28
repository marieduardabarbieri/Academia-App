const API = "http://localhost:3000/instrutores";

let instrutorEditando = null;

const listaInstrutores = document.getElementById("listaInstrutores");
const form = document.getElementById("formInstrutor");

// Carregar instrutores
async function carregarInstrutores() {
    const resposta = await fetch(API);
    const instrutores = await resposta.json();

    listaInstrutores.innerHTML = "";

    instrutores.forEach((instrutor) => {
        listaInstrutores.innerHTML += `
            <tr>
                <td>${instrutor.nome}</td>
                <td>${instrutor.especialidade}</td>

               <td>

                <button
                    class="btnEditar"
                    onclick="editarInstrutor('${instrutor._id}')">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="btnExcluir"
                    onclick="excluirInstrutor('${instrutor._id}')">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

            </tr>
        `;
    });
}

carregarInstrutores();

form.addEventListener("submit", cadastrarInstrutor);

async function cadastrarInstrutor(event) {
    event.preventDefault();
    console.log("ENTROU AQUI");

    const instrutor = {
        nome: document.getElementById("nome").value,
        especialidade: document.getElementById("especialidade").value,
    };

    if (instrutorEditando) {
        await fetch(`${API}/${instrutorEditando}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(instrutor)

        });
        instrutorEditando = null;
        document.getElementById("btnSalvar").innerText = "Salvar";

    } else {
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(instrutor)
        });

    }

    form.reset();
    carregarInstrutores();
}

async function editarInstrutor(id) {
    const resposta = await fetch(`${API}/${id}`);

    const instrutor = await resposta.json();
    instrutorEditando = id;

    document.getElementById("nome").value = instrutor.nome;
    document.getElementById("especialidade").value = instrutor.especialidade;
    document.getElementById("btnSalvar").innerText = "Atualizar";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

async function excluirInstrutor(id) {
    const confirmar = confirm("Deseja excluir este instrutor?");

    if (!confirmar) return;
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    carregarInstrutores();
}
