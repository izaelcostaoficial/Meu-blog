// ================================
// MODO CLARO / MODO ESCURO
// ================================

const botaoTema = document.querySelector(".btn-tema-escuro");


// Verifica se o usuário já escolheu um tema
const temaSalvo = localStorage.getItem("tema");


// Verifica a preferência do sistema
const prefereEscuro = window.matchMedia(
    "(prefers-color-scheme: dark)"
).matches;


// Define o tema inicial
if (temaSalvo === "escuro") {
    document.body.classList.add("tema-escuro");
} else if (temaSalvo === "claro") {
    document.body.classList.remove("tema-escuro");
} else if (prefereEscuro) {
    document.body.classList.add("tema-escuro");
}


// Atualiza o texto de acessibilidade do botão
function atualizarBotaoTema() {

    const modoEscuroAtivo =
        document.body.classList.contains("tema-escuro");

    if (modoEscuroAtivo) {

        botaoTema.setAttribute(
            "aria-label",
            "Ativar modo claro"
        );

        botaoTema.setAttribute(
            "title",
            "Ativar modo claro"
        );

    } else {

        botaoTema.setAttribute(
            "aria-label",
            "Ativar modo escuro"
        );

        botaoTema.setAttribute(
            "title",
            "Ativar modo escuro"
        );
    }
}


// Aplica o texto correto ao carregar
atualizarBotaoTema();


// Troca o tema
botaoTema.addEventListener("click", () => {

    document.body.classList.toggle("tema-escuro");


    const modoEscuroAtivo =
        document.body.classList.contains("tema-escuro");


    // Salva a escolha do usuário
    localStorage.setItem(
        "tema",
        modoEscuroAtivo ? "escuro" : "claro"
    );


    atualizarBotaoTema();
});


// ================================
// SISTEMA DE CURTIDAS
// ================================

const artigos = document.querySelectorAll("article");


artigos.forEach((artigo, indice) => {

    const botoes = artigo.querySelectorAll(".acoes button");


    botoes.forEach((botao, tipo) => {

        botao.addEventListener("click", () => {

            const contador = botao.querySelector("span");

            let quantidade = Number(contador.textContent);

            quantidade++;

            contador.textContent = quantidade;


            // Salva a quantidade de curtidas
            const chave = `blog-artigo-${indice}-reacao-${tipo}`;

            localStorage.setItem(
                chave,
                quantidade
            );
        });


        // Recupera curtidas salvas
        const chave = `blog-artigo-${indice}-reacao-${tipo}`;

        const quantidadeSalva =
            localStorage.getItem(chave);


        if (quantidadeSalva !== null) {

            botao.querySelector("span").textContent =
                quantidadeSalva;
        }

    });

});
