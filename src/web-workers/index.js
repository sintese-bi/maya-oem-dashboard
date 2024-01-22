export const callingWebWorkers = () => {
    const worker = new Worker('web_worker.js');

    worker.addEventListener('message', function(e) {
        var dados = e.data;
        alert("O resultado é: " + dados.resultado);
    });
    
    worker.postMessage({ cmd:"acharPrimo", n:100 }); // assíncrono - retorna imediatamente
}