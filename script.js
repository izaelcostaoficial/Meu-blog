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


// ================================
// BOTÃO DO TEMA
// ================================

function atualizarBotaoTema() {

    const modoEscuroAtivo =
        document.body.classList.contains("tema-escuro");


    if (modoEscuroAtivo) {

        botaoTema.textContent = "☀️";

        botaoTema.setAttribute(
            "aria-label",
            "Ativar modo claro"
        );

        botaoTema.setAttribute(
            "title",
            "Ativar modo claro"
        );

    } else {

        botaoTema.textContent = "🌙";

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

    // IMPORTANTE:
    // Seu HTML não possui .acoes.
    // Por isso pegamos os botões diretamente
    // dentro de cada artigo.

    const botoes = artigo.querySelectorAll("button");


    botoes.forEach((botao, tipo) => {

        const contador =
            botao.querySelector("span");


        // Chave da quantidade total
        const chaveContador =
            `blog-artigo-${indice}-reacao-${tipo}`;


        // Chave que registra se este navegador reagiu
        const chaveUsuario =
            `blog-artigo-${indice}-reacao-${tipo}-marcada`;


        // Recupera a quantidade salva
        let quantidade =
            Number(localStorage.getItem(chaveContador)) || 0;


        // Recupera se este usuário já reagiu
        let marcada =
            localStorage.getItem(chaveUsuario) === "true";


        // Mostra a quantidade
        contador.textContent = quantidade;


        // Mostra visualmente a reação marcada
        if (marcada) {

            botao.classList.add("reagiu");

            botao.setAttribute(
                "aria-pressed",
                "true"
            );

        } else {

            botao.setAttribute(
                "aria-pressed",
                "false"
            );
        }


        // ================================
        // CLIQUE NO LIKE / CORAÇÃO
        // ================================

        botao.addEventListener("click", () => {


            // ============================
            // SE JÁ MARCOU
            // REMOVE A REAÇÃO
            // ============================

            if (marcada) {

                quantidade = Math.max(
                    0,
                    quantidade - 1
                );


                marcada = false;


                botao.classList.remove("reagiu");


                botao.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }


            // ============================
            // SE NÃO MARCOU
            // ADICIONA A REAÇÃO
            // ============================

            else {

                quantidade++;


                marcada = true;


                botao.classList.add("reagiu");


                botao.setAttribute(
                    "aria-pressed",
                    "true"
                );
            }


            // Atualiza o contador na tela
            contador.textContent = quantidade;


            // Salva a quantidade
            localStorage.setItem(
                chaveContador,
                quantidade
            );


            // Salva se este usuário marcou
            localStorage.setItem(
                chaveUsuario,
                marcada ? "true" : "false"
            );

        });

    });

});