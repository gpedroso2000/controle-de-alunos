var firebaseConfig = {
    apiKey: "AIzaSyCZin4yujQWT0FkvngMwNmRCkEnrUUifxg",
    authDomain: "escola-d51ae.firebaseapp.com",
    projectId: "escola-d51ae",
    storageBucket: "escola-d51ae.appspot.com",
    messagingSenderId: "198456665840",
    appId: "1:198456665840:web:7fa4bc49d163d36fe4c435"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var db = firebase.firestore();
var storage = firebase.storage();
var ref = storage.ref();
var refAtivi = storage.ref("/atividades");

//  VARIAVEL PARA RECEBER A URL DO ARQUIVO DA OCORRENCIA
var download;
var uid;

var logOut = document.getElementById("sair");
logOut.addEventListener("click", sair);

// CHAMA A FUNÇÃO  PARA GERAR A URL PARA DOWNLOAD DO ARQUIVO
arquivoOcorrencia();

// ESPERAR 5 SEGUNDO PARA TIRAR A TELA DE CARREGAMENTO 
setTimeout(() => {
    removeTela();
}, 500)

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

// FECHA O OFFCANVAS DO MENU SEM PRECISAR CLICAR NO "X"
function fechaOffcanvas() {
    let canvas = document.getElementById("mycanvas");
    let offCanvas = document.querySelector("div.offcanvas-backdrop.fade.show");
    offCanvas.remove();
    let body = document.body;
    body.style = "";
    canvas.style.visibility = "hidden";
    canvas.classList.remove("show");
    canvas.removeAttribute("aria-modal");
    canvas.removeAttribute("role");
    canvas.setAttribute("aria-hidden", "true");
}

// fUNÇÃO ATRELADA AO NOME DO ALUNO NO MENU
// PUXA AS INFORMAÇÕES DE NOTAS, FALTAS, OCORRENCIAS E ATIVIDADES DO ALUNO
// AS FUNÇÕES DE CARREGAMENTO ESTÃO CADA UMA EM UM SCRIPT
function carregaAluno(e) {
    // ELE RETORNA O TARGET DO ELEMENTO POIS TEM O ATRIBUTO UID, ONDE ESTÁ A UID DE CADA USUARIO, 
    // QUE SERÁ USADO NAS FUNÇÕES DE CARREGAMENTO
    fechaOffcanvas();
    apareceTela();
    uid = e.getAttribute("uid");
    carregaNotas();
    carregaFaltas();
    carregaOcorrencias();
    carregaAtividades();

    // MOSTRA O MENU DE TAREFAS
    let tarefas = document.getElementById("tarefa");
    tarefas.style = "transform: translateY(0px); transition: transform 1s;";

    // APÓS TUDO SER CARREGADO ELE REMOVE A TELA DE CARREGAMENTO
    setTimeout(() => {
        removeTela();
    }, 1200)

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

// FUNÇÃO PARA GERAR A URL PARA DOWNLOAD DO ARQUIVO DA OCORRENCIA
function arquivoOcorrencia() {
    ref.listAll().then((res) => {

            res.items[0].getDownloadURL().then(url => {
                // SALVA NA VARIAVEL DOWNLOAD, QUE ESTÁ DECLARADA NO TOPO
                // A MESMA SERÁ USADA NO SCRIPT OCORRENCIA.JS
                download = url;
            })
        })
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        });

}