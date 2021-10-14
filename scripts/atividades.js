var atividade;

// CRIA UMA FUNÇÃO QUE RETORNA UM OBJETO, E SALVA EM UMA VARIAVEL
function atividadeObjt(descri, materia, doc, down) {
    atividade = {
        descricao: descri,
        materia: materia,
        documento: doc,
        download: down,
    }
}

// PEGA A DIV A QUAL VAI SER INSERIDA AS ATIVIDADES
var divAtividades = document.getElementById("divAtividades");

var btnInserirAtividades = document.getElementById("btnInserirAtividade");

//  BOTÃO INSERIR ATIVIDADES
btnInserirAtividades.addEventListener("click", inserirAtividades);

// FUNÇÃO PARA CARREGAR ATIVIDADES QUE É CHAMADA NO SCRIPT PROFESSOR.JS
function carregaAtividades() {
    db.collection("alunos").doc(uid).get().then(doc => {
        let arrayAtividades = doc.data().atividades;

        arrayAtividades.forEach(doc => {
            divAtividades.innerHTML += `
            <div class="row text-center align-items-center">
                <div class="col-3">
                    <p>${doc.descricao}</p>
                </div>
                <div class="col-3">
                    <p>${doc.materia}</p>
                </div>
                <div class="col-3">
                    <p>José Valdo</p>
                </div>
                <div class="col-3 mb-1">
                    <div class="d-grid gap-1" style="height: 100%;">
                        <a class="btn btn-dark" data-nome="${doc.documento}" href="${doc.download}" target="_blanck">Acessar</a>
                        <button class="btn btn-dark" type="button" onclick="removerAtividades(this)">Remover</button>
                    </div>
                </div>
                <hr>
            </div>  
              `;
        })

    });
}

// INSERIR ATIVIDADES NO BANCO, NA TELA E SALVAR O ARQUIVO NO STORAGE
async function inserirAtividades() {
    let nomeAtividade = document.getElementById("nomeAtividade").value;
    let materia = document.getElementById("materiaAtividade");
    let textMateria = materia.options[materia.selectedIndex].text;
    let formFile = document.getElementById("formFile");

    // VERIFICA SE TODOS OS CAMPOS ESTÃO PREENCHIDOS
    if (nomeAtividade !== "" && textMateria !== "" && formFile.files[0] !== undefined) {
        let nomeDoc = formFile.files[0].name;
        // VARIAVEL PARA REDECER A URL PARA DOWNLOAD
        let down;

        // SALVA O ARQUIVO NO STORAGE
        await refAtivi.child(formFile.files[0].name).put(formFile.files[0]).then(() => {})

        // CRIA O LINK DE DOWNLOAD DO ARQUIVO SALVO
        await refAtivi.child(`${nomeDoc}`).getDownloadURL()
            .then(url => {
                down = url;
            })
            .catch(err => {
                alert(err, "Consulte o administrador do Sistema");
            })

        atividadeObjt(nomeAtividade, textMateria, nomeDoc, down);

        db.collection("alunos").doc(uid).update({
            atividades: firebase.firestore.FieldValue.arrayUnion(atividade),

        }).then(() => {

            divAtividades.innerHTML += `
                <div class="row text-center align-items-center">
                    <div class="col-3">
                        <p>${nomeAtividade}</p>
                    </div>
                    <div class="col-3">
                        <p>${textMateria}</p>
                    </div>
                    <div class="col-3">
                        <p>José Valdo</p>
                    </div>
                    <div class="col-3 mb-1">
                        <div class="d-grid gap-1" style="height: 100%;">
                            <a class="btn btn-dark" data-nome="${nomeDoc}" href="${down}" target="_blanck">Acessar</a>
                            <button class="btn btn-dark" type="button" onclick="removerAtividades(this)">Remover</button>
                        </div>
                    </div>
                    <hr>
                </div> 
                `;
            // O NOME SALVO NO ATRIBUTO NOME, SERA UTIL PARA A EXCLUSÃO NA FUNÇÃO DE REMOVERATIVIDADE

            // REMOVE OS INPUTS
            document.getElementById("nomeAtividade").value = "";
            materia.options.selectedIndex = "0";
            document.getElementById("formFile").value = "";

        }).catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        })
    } else {
        alert("preencha todos os campos")
    }
}

async function removerAtividades(e) {
    let pai = e.parentElement.parentElement.parentElement;
    let nomeAtividade = pai.children[0].innerText;
    let materia = pai.children[1].innerText;
    let elementDoc = pai.children[3].children[0].children[0];
    let nomeDoc = elementDoc.dataset.nome;
    let down = elementDoc.getAttribute("href");

    atividadeObjt(nomeAtividade, materia, nomeDoc, down);

    // REMOVE O ARQUIVO DO STORAGE
    await refAtivi.child(`${nomeDoc}`).delete()
        .then()
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        })

    // REMOVE OS DADOS SALVOS NO BANCO
    db.collection("alunos").doc(uid).update({
            atividades: firebase.firestore.FieldValue.arrayRemove(atividade),
        })
        .then(() => {
            pai.remove();
        })
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        })

}