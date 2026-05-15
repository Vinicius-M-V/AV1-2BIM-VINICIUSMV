const API_URL = "https://raw.githubusercontent.com/akabab/superhero-api/0.3.0/api/all.json";

async function buscarDetalhes() {
    try { 
        const urlParams = new URLSearchParams(window.location.search);
        const idDoHeroi = urlParams.get("id");

        if(!idDoHeroi) throw new Error("Herói não identificado.");

        const response = await fetch(API_URL);
        const dados = await response.json();
        const heroi = dados.find(h => h.id == idDoHeroi);

        if (heroi) {
            exibirDetalhes(heroi);
        } else {
            throw new Error("O herói não foi encontrado.");
        }
    } catch (error) {
        document.getElementById("detalhes-personagem").innerHTML = `
            <div class="alert alert-danger m-4 text-center">${error.message}</div>`;
    }
}

function exibirDetalhes(heroi) {
    const container = document.getElementById("detalhes-personagem");
    container.innerHTML = `
        <div class="row g-0">
            <div class="col-md-5">
                <img src="${heroi.images.lg}" class="img-fluid w-100 h-100" style="object-fit: cover;">
            </div>
            <div class="col-md-7 p-5">
                <h1 class="display-4 fw-bold text-danger mb-0">${heroi.name}</h1>
                <p class="text-muted fs-5 mb-4">${heroi.biography.publisher}</p>
                <h4 class="border-bottom pb-2 mb-3">Estatísticas</h4>
                <p><strong>Inteligência:</strong> ${heroi.powerstats.intelligence}</p>
                <p><strong>Força:</strong> ${heroi.powerstats.strength}</p>
                <p><strong>Velocidade:</strong> ${heroi.powerstats.speed}</p>
                <h4 class="border-bottom pb-2 mt-4 mb-3">Biografia</h4>
                <p><strong>Nome Real:</strong> ${heroi.biography.fullName || "Identidade Secreta"}</p>
                <p><strong>Alinhamento:</strong> ${heroi.biography.alignment.toUpperCase()}</p>
            </div>
        </div>
    `;
}

buscarDetalhes();