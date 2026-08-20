```javascript
// ================================
// MODO CLARO / MODO ESCURO
// ================================

const botaoTema = document.querySelector(".btn-tema-escuro");

const temaSalvo = localStorage.getItem("tema");

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
// ATUALIZA BOTÃO DO TEMA
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


// Aplica ao carregar
atualizarBotaoTema();


// ================================
// TROCAR TEMA
// ================================

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

    const botoes =
        artigo.querySelectorAll(".btn-reacao");


    botoes.forEach((botao) => {

        const tipo =
            botao.dataset.tipo;

        const contador =
            botao.querySelector("span");


        // Chave da quantidade total
        const chaveQuantidade =
            `blog-artigo-${indice}-${tipo}-quantidade`;


        // Chave que identifica se ESTE navegador já reagiu
        const chaveUsuario =
            `blog-artigo-${indice}-${tipo}-usuario`;


        // ================================
        // CARREGAR QUANTIDADE
        // ================================

        const quantidadeSalva =
            localStorage.getItem(chaveQuantidade);


        if (quantidadeSalva !== null) {

            contador.textContent =
                quantidadeSalva;

        } else {

            contador.textContent = "0";
        }


        // ================================
        // CARREGAR REAÇÃO DA PESSOA
        // ================================

        const jaReagiu =
            localStorage.getItem(chaveUsuario) === "true";


        if (jaReagiu) {

            botao.classList.add("ativo");

            botao.setAttribute(
                "aria-pressed",
                "true"
            );

        } else {

            botao.classList.remove("ativo");

            botao.setAttribute(
                "aria-pressed",
                "false"
            );
        }


        // ================================
        // CLIQUE
        // ================================

        botao.addEventListener("click", () => {

            let quantidade =
                Number(contador.textContent);


            const reagiu =
                localStorage.getItem(chaveUsuario) === "true";


            // ============================
            // DESMARCAR
            // ============================

            if (reagiu) {

                quantidade =
                    Math.max(0, quantidade - 1);


                localStorage.setItem(
                    chaveQuantidade,
                    quantidade
                );


                localStorage.removeItem(
                    chaveUsuario
                );


                botao.classList.remove("ativo");


                botao.setAttribute(
                    "aria-pressed",
                    "false"
                );
            }


            // ============================
            // MARCAR
            // ============================

            else {

                quantidade++;


                localStorage.setItem(
                    chaveQuantidade,
                    quantidade
                );


                localStorage.setItem(
                    chaveUsuario,
                    "true"
                );


                botao.classList.add("ativo");


                botao.setAttribute(
                    "aria-pressed",
                    "true"
                );
            }


            // Atualiza contador na tela
            contador.textContent =
                quantidade;
        });

    });

});
```
