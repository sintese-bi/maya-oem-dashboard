addEventListener('message', function(e) {
    var dados = e.data;
    if ( dados.cmd == "acharPrimo" ) {
        var ret = acharPrimo(dados.n); // Chama uma função demorada
        postMessage({ resultado:ret }); // Manda o resultado como mensagem
    }
    // Outras funções, se aplicável
});

function acharPrimo(n) {
    return n;
}