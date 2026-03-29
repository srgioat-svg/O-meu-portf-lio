
// 1. ESTADO INICIAL

const IMAGEM_ORIGINAL = "Images/KL1bW5.jpg";
const IMAGEM_ALTERNATIVA = "Images/header1.webp";
const HOBBIES_INICIAIS = ["Fotografia", "Leitura", "Programação"];

// Imagem base
let imagemTrocada = false;



// 2. TEMA CLARO / ESCURO

const btnLight = document.getElementById("btnLight");
const btnDark = document.getElementById("btnDark");

btnLight.addEventListener("click", function () {

    document.documentElement.setAttribute("data-bs-theme", "light");
    btnLight.classList.add("active");
    btnDark.classList.remove("active");
});

btnDark.addEventListener("click", function () {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    btnDark.classList.add("active");
    btnLight.classList.remove("active");
});



// 3. TROCAR IMAGEM BASE

const btnTrocarImagem = document.getElementById("btnTrocarImagem");
const fotoPerfil = document.getElementById("fotoPerfil");

btnTrocarImagem.addEventListener("click", function () {
    if (!imagemTrocada) {
        fotoPerfil.src = IMAGEM_ALTERNATIVA;
        btnTrocarImagem.textContent = "Repor Imagem";
        imagemTrocada = true;
    } else {
        fotoPerfil.src = IMAGEM_ORIGINAL;
        btnTrocarImagem.textContent = "Trocar Imagem";
        imagemTrocada = false;
    }
});



// 4. ADICIONAR HOBBY

const btnAdicionarHobby = document.getElementById("btnAdicionarHobby");
const listaHobbies = document.getElementById("listaHobbies");

btnAdicionarHobby.addEventListener("click", function () {

    const novoHobby = prompt("Qual é o teu novo hobby?");

    if (novoHobby !== null) {
        if (novoHobby.trim() !== "") {
            const novoItem = document.createElement("li");
            novoItem.classList.add("list-group-item");
            novoItem.textContent = novoHobby.trim();
            listaHobbies.appendChild(novoItem);
        }
    }
});



// 5. FORMULÁRIO DE PERSONALIZAÇÃO DO PERFIL

const formPerfil = document.getElementById("formPerfil");
const nomePerfil = document.getElementById("nomePerfil");
const descricaoPerfil = document.getElementById("descricaoPerfil");
const cardPerfil = document.getElementById("cardPerfil");

formPerfil.addEventListener("submit", function (event) {
    event.preventDefault();


    const dados = new FormData(formPerfil);

    const novoNome = dados.get("nome").trim();
    const novaFrase = dados.get("frase").trim();
    const novaCor = dados.get("cor");
    const novaFoto = dados.get("foto").trim();


    if (novoNome !== "") {
        nomePerfil.textContent = novoNome;
    }


    if (novaFrase !== "") {
        descricaoPerfil.textContent = novaFrase;
    }


    cardPerfil.style.backgroundColor = novaCor;


    if (novaFoto !== "") {
        fotoPerfil.src = novaFoto;

        imagemTrocada = false;
        btnTrocarImagem.textContent = "Trocar Imagem";
    }



    alert("Perfil atualizado com sucesso!");
});



// 6. API — INSPIRAÇÃO DO DIA

const btnCarregarApi = document.getElementById("btnCarregarApi");
const resultadoApi = document.getElementById("resultadoApi");


btnCarregarApi.addEventListener("click", function () {
    resultadoApi.innerHTML = '<p class="text-muted">A carregar...</p>';


    fetch("https://api.adviceslip.com/advice") // Dava erro, necessária conversão text>JSON 
        .then(function (resposta) {
            return resposta.text();
        })
        .then(function (texto) {
            const dados = JSON.parse(texto);
            resultadoApi.innerHTML =
                '<blockquote class="blockquote">' +
                '<p class="mb-2 fst-italic">"' + dados.slip.advice + '"</p>' +
                '<footer class="blockquote-footer">Advice Slip API</footer>' +
                "</blockquote>";
        })
        .catch(function (erro) {
            console.error("Erro na API:", erro);
            resultadoApi.innerHTML =
                '<p class="text-danger">Não foi possível carregar. Tenta novamente.</p>';
        });
});


// 7. GERADOR DE COR ALEATÓRIA HOBBIES


const btnCorAleatoria = document.getElementById("btnCorAleatoria");
const seccaoHobbies = document.getElementById("hobbies");

btnCorAleatoria.addEventListener("click", function () {

    const cores = ["red", "blue", "green", "purple", "orange", "pink", "teal", "gold"];

    const indice = Math.floor(Math.random() * cores.length);

    seccaoHobbies.style.backgroundColor = cores[indice];

});


// 8. ATALHO COM TECLA ENTER

document.addEventListener("keydown", function (evento) {

    if (evento.key == "Enter") {
        alert("Tem a certeza que acabou o exercício?");
    }

});



// 9. RESET 

const btnReset = document.getElementById("btnReset");

btnReset.addEventListener("click", function () {
    const confirmado = confirm("Tens a certeza que queres repor o estado inicial?");
    if (!confirmado) return;

    // Tema
    document.documentElement.setAttribute("data-bs-theme", "light");
    btnLight.classList.add("active");
    btnDark.classList.remove("active");

    // Imagem 
    fotoPerfil.src = IMAGEM_ORIGINAL;
    imagemTrocada = false;
    btnTrocarImagem.textContent = "Trocar Imagem";

    // Nome e descrição 
    nomePerfil.textContent = "O Teu Nome";
    descricaoPerfil.textContent = "A tua frase de apresentação aparece aqui.";

    // Cor do card
    cardPerfil.style.backgroundColor = "";

    // Foto 
    fotoPerfil.src = IMAGEM_ORIGINAL;

    // Hobbies 
    listaHobbies.innerHTML = ""; // apaga todos os <li>
    HOBBIES_INICIAIS.forEach(function (hobby) {
        const item = document.createElement("li");
        item.classList.add("list-group-item");
        item.textContent = hobby;
        listaHobbies.appendChild(item);
    });

    // Cor da secção hobbies
    seccaoHobbies.style.backgroundColor = "";

    // Formulário
    formPerfil.reset();

    // API 
    resultadoApi.innerHTML = '<p class="text-muted fst-italic">Clica no botão para receber inspiração.</p>';


});

