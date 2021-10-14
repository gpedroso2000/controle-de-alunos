var firebaseConfig = {
    apiKey: "AIzaSyCZin4yujQWT0FkvngMwNmRCkEnrUUifxg",
    authDomain: "escola-d51ae.firebaseapp.com",
    projectId: "escola-d51ae",
    storageBucket: "escola-d51ae.appspot.com",
    messagingSenderId: "198456665840",
    appId: "1:198456665840:web:7fa4bc49d163d36fe4c435"
};

firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var db = firebase.firestore();
var storage = firebase.storage();
var ref = storage.ref();
var logOut = document.getElementById("sair");
var uid;
var download;


logOut.addEventListener("click", sair);


// apareceTela();
arquivoOcorrencia();



setTimeout(() => {
    let tarefas = document.getElementById("tarefa");
    tarefas.style = "transform: translateY(0px); transition: transform 1s;";

    uid = auth.currentUser.uid;
    removeTela();
    carregaNotas();
    carregaFaltas();
    carregaOcorrencias();
    carregaAtividades();

}, 1000);

// FUNÇÃO PARA MOSTRAR A TELA DE CARREGAMENTO
function apareceTela() {
    let tela = document.getElementById("telaDeEspera");
    tela.classList.remove("d-none");
    tela.classList.add("d-flex");
}

// FUNÇÃO PARA REMOVER A TELA DE CARREGAMENTO
function removeTela() {
    let tela = document.getElementById("telaDeEspera");
    tela.classList.remove("d-flex");
    tela.classList.add("d-none");
}

// FUNÇÃO PARA GERAR A URL PARA DOWNLOAD DO ARQUIVO DA OCORRENCIA
function arquivoOcorrencia() {
    ref.listAll().then((res) => {

            res.items[0].getDownloadURL().then(url => {
                download = url;
            })
        })
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        });

}

function carregaFaltas() {
    db.collection("alunos").doc(uid).get().then(doc => {
            let faltas = doc.data().faltas;
            let matematica = document.querySelectorAll("#faltaMatematica p");
            let geografia = document.querySelectorAll("#faltaGeografia p");
            let portugues = document.querySelectorAll("#faltaPortugues p");
            let ciencia = document.querySelectorAll("#faltaCiencia p");
            let historia = document.querySelectorAll("#faltaHistoria p");
            let cont = 0;

            // CARREGAR NOTAS
            matematica.forEach(doc => {
                switch (cont) {
                    case 0:
                        doc.innerText = `${faltas.matematica.bimestre1}`;
                        cont++;
                        break;
                    case 1:
                        doc.innerText = `${faltas.matematica.bimestre2}`;
                        cont++;
                        break;
                    case 2:
                        doc.innerText = `${faltas.matematica.bimestre3}`;
                        cont++;
                        break;
                    case 3:
                        doc.innerText = `${faltas.matematica.bimestre4}`;
                        cont++;
                        break;
                    case 4:
                        doc.innerText = `${faltas.matematica.total}`;
                        cont++;
                        break;
                }
            })
            cont = 0;
            geografia.forEach(doc => {
                switch (cont) {
                    case 0:
                        doc.innerText = `${faltas.geografia.bimestre1}`;
                        cont++;
                        break;
                    case 1:
                        doc.innerText = `${faltas.geografia.bimestre2}`;
                        cont++;
                        break;
                    case 2:
                        doc.innerText = `${faltas.geografia.bimestre3}`;
                        cont++;
                        break;
                    case 3:
                        doc.innerText = `${faltas.geografia.bimestre4}`;
                        cont++;
                        break;
                    case 4:
                        doc.innerText = `${faltas.geografia.total}`;
                        cont++;
                        break;
                }
            })
            cont = 0;
            portugues.forEach(doc => {
                switch (cont) {
                    case 0:
                        doc.innerText = `${faltas.portugues.bimestre1}`;
                        cont++;
                        break;
                    case 1:
                        doc.innerText = `${faltas.portugues.bimestre2}`;
                        cont++;
                        break;
                    case 2:
                        doc.innerText = `${faltas.portugues.bimestre3}`;
                        cont++;
                        break;
                    case 3:
                        doc.innerText = `${faltas.portugues.bimestre4}`;
                        cont++;
                        break;
                    case 4:
                        doc.innerText = `${faltas.portugues.total}`;
                        cont++;
                        break;
                }
            })
            cont = 0;
            ciencia.forEach(doc => {
                switch (cont) {
                    case 0:
                        doc.innerText = `${faltas.ciencia.bimestre1}`;
                        cont++;
                        break;
                    case 1:
                        doc.innerText = `${faltas.ciencia.bimestre2}`;
                        cont++;
                        break;
                    case 2:
                        doc.innerText = `${faltas.ciencia.bimestre3}`;
                        cont++;
                        break;
                    case 3:
                        doc.innerText = `${faltas.ciencia.bimestre4}`;
                        cont++;
                        break;
                    case 4:
                        doc.innerText = `${faltas.ciencia.total}`;
                        cont++;
                        break;
                }
            })
            cont = 0;
            historia.forEach(doc => {
                switch (cont) {
                    case 0:
                        doc.innerText = `${faltas.historia.bimestre1}`;
                        cont++;
                        break;
                    case 1:
                        doc.innerText = `${faltas.historia.bimestre2}`;
                        cont++;
                        break;
                    case 2:
                        doc.innerText = `${faltas.historia.bimestre3}`;
                        cont++;
                        break;
                    case 3:
                        doc.innerText = `${faltas.historia.bimestre4}`;
                        cont++;
                        break;
                    case 4:
                        doc.innerText = `${faltas.historia.total}`;
                        cont++;
                        break;
                }
            })

        })
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        })
}

function carregaNotas() {
    db.collection("alunos").doc(uid).get().then(doc => {
            let notas = doc.data().notas;
            let matematica = document.querySelectorAll("#materiaMatematica p");
            let geografia = document.querySelectorAll("#materiaGeografia p");
            let portugues = document.querySelectorAll("#materiaPortugues p");
            let ciencia = document.querySelectorAll("#materiaCiencia p");
            let historia = document.querySelectorAll("#materiaHistoria p");
            let cont = 0;


            // CARREGAR NOTAS
            matematica.forEach(doc => {

                switch (cont) {
                    case 0:
                        doc.innerText = `${notas.matematica.bimestre1}`;
                        cont++;
                        break;
                    case 1:
                        doc.innerText = `${notas.matematica.bimestre2}`;
                        cont++;
                        break;
                    case 2:
                        doc.innerText = `${notas.matematica.bimestre3}`;
                        cont++;
                        break;
                    case 3:
                        doc.innerText = `${notas.matematica.bimestre4}`;
                        cont++;
                        break;
                    case 4:
                        doc.innerText = `${notas.matematica.media}`;
                        cont++;
                        break;
                }
            })
            cont = 0;
            geografia.forEach(doc => {
                switch (cont) {
                    case 0:
                        doc.innerText = `${notas.geografia.bimestre1}`;
                        cont++;
                        break;
                    case 1:
                        doc.innerText = `${notas.geografia.bimestre2}`;
                        cont++;
                        break;
                    case 2:
                        doc.innerText = `${notas.geografia.bimestre3}`;
                        cont++;
                        break;
                    case 3:
                        doc.innerText = `${notas.geografia.bimestre4}`;
                        cont++;
                        break;
                    case 4:
                        doc.innerText = `${notas.geografia.media}`;
                        cont++;
                        break;
                }
            })
            cont = 0;
            portugues.forEach(doc => {
                switch (cont) {
                    case 0:
                        doc.innerText = `${notas.portugues.bimestre1}`;
                        cont++;
                        break;
                    case 1:
                        doc.innerText = `${notas.portugues.bimestre2}`;
                        cont++;
                        break;
                    case 2:
                        doc.innerText = `${notas.portugues.bimestre3}`;
                        cont++;
                        break;
                    case 3:
                        doc.innerText = `${notas.portugues.bimestre4}`;
                        cont++;
                        break;
                    case 4:
                        doc.innerText = `${notas.portugues.media}`;
                        cont++;
                        break;
                }
            })
            cont = 0;
            ciencia.forEach(doc => {
                switch (cont) {
                    case 0:
                        doc.innerText = `${notas.ciencia.bimestre1}`;
                        cont++;
                        break;
                    case 1:
                        doc.innerText = `${notas.ciencia.bimestre2}`;
                        cont++;
                        break;
                    case 2:
                        doc.innerText = `${notas.ciencia.bimestre3}`;
                        cont++;
                        break;
                    case 3:
                        doc.innerText = `${notas.ciencia.bimestre4}`;
                        cont++;
                        break;
                    case 4:
                        doc.innerText = `${notas.ciencia.media}`;
                        cont++;
                        break;
                }
            })
            cont = 0;
            historia.forEach(doc => {
                switch (cont) {
                    case 0:
                        doc.innerText = `${notas.historia.bimestre1}`;
                        cont++;
                        break;
                    case 1:
                        doc.innerText = `${notas.historia.bimestre2}`;
                        cont++;
                        break;
                    case 2:
                        doc.innerText = `${notas.historia.bimestre3}`;
                        cont++;
                        break;
                    case 3:
                        doc.innerText = `${notas.historia.bimestre4}`;
                        cont++;
                        break;
                    case 4:
                        doc.innerText = `${notas.historia.media}`;
                        cont++;
                        break;
                }
            })
        })
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        })
}

function carregaOcorrencias() {
    db.collection("alunos").doc(uid).get().then(doc => {
        let arrayOcorrencias = doc.data().ocorrencias;

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
                      </div>
                  </div>
                  <hr>
              </div> 
              `;
        })

    });
}


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
                    </div>
                </div>
                <hr>
            </div>  
              `;
        })

    });
}




function sair() {
    auth.signOut()
        .then(() => {
            window.location.replace("index.html");
        })
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        })
}