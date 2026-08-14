const botoes = document.querySelectorAll("button:not(.btn-tema-escuro)");

botoes.forEach(function (botao) {
    const texto = botao.querySelector("span");

    if (!texto) {
        return;
    }

    let curtiu = false;

    botao.addEventListener("click", function () {
        console.log("fui clicado");

        let valorAtual = parseInt(texto.textContent, 10) || 0;

        if (!curtiu) {
            valorAtual++;
            curtiu = true;
        } else {
            valorAtual--;
            curtiu = false;
        }

        texto.textContent = valorAtual;
    });
});


// BOTÃO DO TEMA ESCURO
const btnTemaEscuro = document.querySelector(".btn-tema-escuro");

if (btnTemaEscuro) {
    btnTemaEscuro.addEventListener("click", mudaTema);
}

function mudaTema() {
    document.body.classList.toggle("tema-escuro");
}
