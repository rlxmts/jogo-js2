let listaNumeros = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1; 
console.log(numeroSecreto)
function criarElementos( tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function exibirMsgInicial(){
    criarElementos('.titulo', 'Jogo do numero secreto');
    criarElementos( '.texto__paragrafo', `Escolha um número entre 1 e ${numeroMaximo}`);
}
exibirMsgInicial();

function verificarChute(){
    
    let valorDoChute = document.querySelector('.container__input').value;     
    
    if( valorDoChute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentantivas' : 'tentativa';
        let mensagemTentativas = `Você acertou o numero secreto com ${tentativas} ${palavraTentativa}!`;
        criarElementos('.titulo', 'Acertou!');
        criarElementos( '.texto__paragrafo', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(valorDoChute > numeroSecreto){ criarElementos( '.texto__paragrafo', `O numero é menor.`);}
        else{ criarElementos( '.texto__paragrafo', `O numero é maior.`);}
        tentativas++;
        limparCampo();
    }
}

function limparCampo(){
    valorDoChute = document.querySelector('.container__input');
    valorDoChute.value = '';
}

function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    
    if(listaNumeros.includes(numeroEscolhido)){
        return gerarNumero();
    }else{
        listaNumeros.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function reiniciarJogo(){
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}