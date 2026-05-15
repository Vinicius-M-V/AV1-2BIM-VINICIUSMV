const API_URL = "https://raw.githubusercontent.com/akabab/superhero-api/0.3.0/api/all.json";

async function buscarPersonagens() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao carregar API");
        
        const dados = await response.json();        
        const todosMarvel = dados.filter(heroi => heroi.biography.publisher === "Marvel Comics");
        const marvelEmbaralhado = todosMarvel.sort(() => 0.5 - Math.random());        
        const personagensExibir = marvelEmbaralhado.slice(0, 20);
        
        exibirPersonagens(personagensExibir);
    } catch (error) {
        console.error("Erro:", error);
        document.getElementById("lista-personagens").innerHTML = "<p class='text-center'>Erro ao carregar heróis.</p>";
    }
}

function exibirPersonagens(lista) {
    const container = document.getElementById("lista-personagens");
    container.innerHTML = "";

    lista.forEach(heroi => {
        const col = document.createElement("div"); 
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch"; 
        
        col.innerHTML = `
            <div class="card h-100 shadow border-0 text-dark w-100">
                <img src="${heroi.images.sm}" class="card-img-top" style="height: 250px; object-fit: cover;" alt="${heroi.name}">
                <div class="card-body text-center d-flex flex-column">
                    <h5 class="card-title fw-bold">${heroi.name}</h5>
                    <button class="btn btn-danger mt-auto fw-bold" onclick="verDetalhes(${heroi.id})">VER PERFIL</button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function verDetalhes(id) {
    window.location.href = `detalhes.html?id=${id}`;
}

buscarPersonagens();