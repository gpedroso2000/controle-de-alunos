var ocorrencia;
// CRIA UMA FUNÇÃO QUE RETORNA UM OBJETO, E SALVA EM UMA VARIAVEL
function ocorrenciaObjt(motivo, tipo, data) {
    ocorrencia = {
        motivo: motivo,
        tipo: tipo,
        data: data,
    }
}
// PEGA A DIV A QUAL VAI SER INSERIDO AS OCORRENCIAS
var divOcorrencia = document.getElementById("divOcorrencia");

var btnInserirOcorrencia = document.getElementById("btnInserirOcorrencia");

//  NO BOTÃO DO MODAL DE OCORRENCIAS ONDE VAI SER INSERIDO AS OCORRENCIAS, ADICIONAR A FUNÇÃO AABAIXO
btnInserirOcorrencia.addEventListener("click", inserirOcorrenciasComPromise);

// CRIANDO FUNÇÃO SOMENTE PARA A EXECUÇÃO DA OUTRO FUNÇÃO COM PROMISE
function inserirOcorrenciasComPromise() {
    verificaCamposOcorrencias().then(() => {
        inserirOcorrencias();
    }).catch(() => {
        alert("Preencha todos os campos");
    })
}

// FUNÇÃO COM PROMISE PARA VERIFICAR OS CAMPOS DO MODAL SE ESTÃO PREENCHIDOS
function verificaCamposOcorrencias() {
    let motivo = document.getElementById("motivo").value;
    let data = document.getElementById("data").value;
    let tipo = document.getElementById("tipo");
    let valueTipo = tipo.options[tipo.selectedIndex].value;

    let promise = new Promise(function(resolve, reject) {

        if (motivo !== "" && data !== "" && valueTipo !== "") {
            resolve();
        } else {
            reject();
        }
    })
    return promise;
}

// CARREGA AS OCORRENCIAS DO ALUNO NO MODAL OCORRENCIAS
function carregaOcorrencias() {
    db.collection("alunos").doc(uid).get().then(doc => {
        let arrayOcorrencias = doc.data().ocorrencias;
        //LISTO AS OCORRÊNCIAS NO BANCO, E A CADA PASSAGEM EU ADCIONO A MESMA NO HTML
        arrayOcorrencias.forEach(doc => {
                divOcorrencia.innerHTML += `
            <div class="row text-center align-items-center">
                <div class="col-3">
                    <p>${doc.motivo}</p>
                </div>
                <div class="col-3">
                    <p>${doc.data}</p>
                </div>
                <div class="col-3">
                    <p>${doc.tipo}</p>
                </div>
                <div class="col-3 mb-1">
                    <div class="d-grid gap-1" style="height: 100%;">
                        <a class="btn btn-dark" href="${download}" target="_blanck">Acessar</a>
                        <button class="btn btn-dark" type="button" onclick="removerOcorrencias(this)">Remover</button>
                    </div>
                </div>
                <hr>
            </div> 
            `;
            })
            // A VARIAVEL DOWNLOAD VEM DO SCRIPT PROFESSOR.JS, ONDE É GERADO A URL DO ARQUIVO PARA DOWNLOAD
    });
}


// INSERE A OCORRENCIA TANTO NA TELA QUANTO NO BANCO
function inserirOcorrencias() {
    let motivo = document.getElementById("motivo").value;
    let dataInput = document.getElementById("data").value;
    let tipo = document.getElementById("tipo");
    let valueTipo = tipo.options[tipo.selectedIndex].text;

    // FORMATAÇÃO DA DATA, POIS A MESMA VEM AO CONTRARIO
    dataFormatar = new Date(dataInput);
    data = dataFormatar.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    // CHAMA A FUNÇÃO QUE RETORNA UM OBJETO E PASSA AS VARIAVEIS QUE FORAM PASSADAS NOS INPUTS A CIMA
    ocorrenciaObjt(motivo, valueTipo, data);

    // SALVA O OBJETO DENTRO DE UM ARRAY NO BANCO
    db.collection("alunos").doc(uid).update({
        ocorrencias: firebase.firestore.FieldValue.arrayUnion(ocorrencia),

    }).then(() => {
        // DEPOIS DE TER SALVO, ADICIONA NO MODAL AS OCORRENCIAS
        divOcorrencia.innerHTML += ` 
        <div class="row text-center align-items-center">
            <div class="col-3">
                <p>${motivo}</p>
            </div>
            <div class="col-3">
                <p>${data}</p>
            </div>
            <div class="col-3">
                <p>${valueTipo}</p>
            </div>
            <div class="col-3 mb-1">
                <div class="d-grid gap-1" style="height: 100%;">
                <a class="btn btn-dark" href="${download}" target="_blanck">Acessar</a>
                    <button class="btn btn-dark" type="button" onclick="removerOcorrencias(this)">Remover</button>
                </div>
            </div>
             <hr>
        </div> 
        `;

        // LIMPA OS INPUT
        document.getElementById("motivo").value = "";
        document.getElementById("data").value = "";
        tipo.options.selectedIndex = "0";

    }).catch(err => {
        alert(err, "Consulte o administrador do Sistema");
    })



}

// FUNÇÃO P/ REMOVER AS OCORRENCIAS, PASSADA NO BUTTON DA OCCORENCIA (BUTTON A CIMA)
function removerOcorrencias(e) {
    //  PEGA O TARGET DO BOTÃO, E BUSCA O PAI MAIS ALTO DO ELEMENTO(DIVOCORRENCIA)
    let pai = e.parentElement.parentElement.parentElement;
    let motivo = pai.children[0].innerText;
    let data = pai.children[1].innerText;
    let tipo = pai.children[2].innerText;

    // PASSA AS VARIAVEIS PARA FUNÇÃO, ONDE SALVARA NA VARIAVEL LSITADA NO TOPO(OCORRENCIA)
    ocorrenciaObjt(motivo, tipo, data);

    // ASSIM REMOVENDO AS DO BANCO
    db.collection("alunos").doc(uid).update({
            ocorrencias: firebase.firestore.FieldValue.arrayRemove(ocorrencia),
        })
        .then(() => {
            // SE DER CERTO, REMOVE A DIV DA OCORRENCIA
            pai.remove();
        })
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        })

}