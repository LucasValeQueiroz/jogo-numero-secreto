//Variáveis universais: Lista de número sortados, Número limite, Número secreto e tentativas 
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();//Gera sempre números diferentes 
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    //Textos: título e subtítulo 
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    //Mensagem padrão ao iniciar o site
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    //Pegando informações: Resposta do usuario
    let chute = document.querySelector('input').value;
    //Se o chute for igual a número secreto (if) se não for igual ao número secreto(else)
    if (chute == numeroSecreto) {
        //Exibe mensagem na tela Acertou! com a quantidade de tentativa(s) e ativa o botão reiniciar.
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //Se o chute for menor que o número secreto (if) mas se não for menor(else)
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');//Exibir dica
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');//Exibir dica
        }
        //Adicionar o chute nas tentativas e limpar o campo para nova tentativa
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    //Gera um número aleatório entre 1 e 10
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    //Quantidade de elementos sorteados
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    //Se quantidade de elementos for igual ao número limite (Sorteados todos os numeros)
    if (quantidadeDeElementosNaLista == numeroLimite) {
        //Zerar lista de números para sortear novos números 
        listaDeNumerosSorteados = [];
    }
    //Se o número sorteado ja foi sorteado allguma vez, sortear novamente
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        //Adicionar o número sorteado na lista de números sorteados
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    //Limpar campo para novo chute
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    //Reiniciar jogo: Novo número secreto diferente do anterior, limpa o campo, reseta as tentativas, exibi mensagem inicial e desativa o botão de reiniciar 
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}







