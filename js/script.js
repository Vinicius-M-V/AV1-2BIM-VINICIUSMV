const API_URL = "https://marvel.emreparker.com/v1/characters";

async function buscarPersonagens() {
    try{
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Erro carregar dados");
        }
        const dados = await response.json();
        const personagens = dados.slice(0, 20);
        exibirPersonagens(personagens);
    } catch (error) {
    console.error("Erro Detectado", error);
    document.getElementById("lista-personagens").innerHTML = `<p style="color: red;">Erro de carregamento.</p>`;
    }    
}
    
function exibirPersonagens(personagens) {
    const container = document.getElementById("lista-personagens");
    container.innerHTML = "";

    personagens.forEach (personagem => {
        const card = document.createElement("div");
        card.style.border = "1px solid #ccc";
        card.style.margin = "10px";
        card.style.padding = "10px";
        card.style.display = "inline-block";
        card.style.width = "200px";
        card.style.verticalAlign = "top";

        card.innerHTML = `
            <img src="${personagem.image || 'https://via.placeholder.com/150'}" alt="${personagem.name}" style="width: 100%;">
            <h3>${personagem.name}</h3>
            <button onclick="verDetalhes('${personagem.id}')">Ver Detalhes</button>
        `;
        container.appendChild(card);
    });
}
function verDetalhes(id) {
    console.log("ID do personagem clicado", id);
}


buscarPersonagens();