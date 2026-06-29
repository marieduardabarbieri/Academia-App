async function carregarDashboard() {

    const alunos =
        await fetch("http://localhost:3000/alunos")
            .then(r => r.json());

    const instrutores =
        await fetch("http://localhost:3000/instrutores")
            .then(r => r.json());

    const exercicios =
        await fetch("http://localhost:3000/exercicios")
            .then(r => r.json());

    const treinos =
        await fetch("http://localhost:3000/treinos")
            .then(r => r.json());

    const matriculas =
        await fetch("http://localhost:3000/matriculas")
            .then(r => r.json());

    document.getElementById("totalAlunos").innerText =
        alunos.length;

    document.getElementById("totalInstrutores").innerText =
        instrutores.length;

    document.getElementById("totalExercicios").innerText =
        exercicios.length;

    document.getElementById("totalTreinos").innerText =
        treinos.length;

    document.getElementById("totalMatriculas").innerText =
        matriculas.length;
}

carregarDashboard();