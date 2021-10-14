// SALVAR A UID DO USUARIO PARA CONSEGUIR FAZER AS ALTERAÇÕES DE NOTAS E FALTAS
// var uid;

// BOTÕES DA PAGINA
var btnCadastro = document.getElementById("btnCadastro");
var btnConsultar = document.getElementById("btnConsultar");
var btnRemover = document.getElementById("btnRemover");

// MOSTRAR OS ALUNOS NO MENU INICIALMENTE
mostrarAlunoMenu();

// CONSULTAR INFORMAÇÕES DO USUARIO
btnConsultar.addEventListener("click", consultarAluno);

// REMOVER INFORMAÇÕES DO USUARIO
btnRemover.addEventListener("click", removerAluno);

// INSERIR NOME DOS ALUNOS NO MENU ALUNOS E CADASTRAR NO BANCO
btnCadastro.addEventListener("click", inserirAluno);

// CARREGA OS NOMES DOS ALUNOS DO BANCO PARA O MENU ALUNOS
function mostrarAlunoMenu() {
    db.collection("alunos").get().then(snapshot => {
            snapshot.forEach(doc => {
                let nome = doc.data().nome;
                let id = doc.data().uid;
                let divAluno = document.getElementById("listaNomes");
                divAluno.innerHTML += `<a href="#" uid="${id}" class="list-group-item list-group-item-action activ" onclick="carregaAluno(this)">${nome}</a>`;
            })
        })
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        })
}


// CRIAR EMAIL, SENHA PARA LOGIN E INFORMAÇÕES DO ALUNO, DEPOIS SALVA NO BANCO
function cadastrarAluno() {
    let email = document.getElementById("email").value;
    let nome = document.getElementById("nome").value;
    let senha = document.getElementById("senha").value;
    let idade = document.getElementById("idade").value;
    let matricula = document.getElementById("matricula").value;
    let celular = document.getElementById("celular").value;

    // CRIAR EMAIL E SENHA
    auth.createUserWithEmailAndPassword(email, senha)
        .then(() => {
            let id = auth.currentUser.uid;
            db.collection("alunos").doc(id).set({
                    uid: id,
                    nome: nome,
                    idade: idade,
                    matricula: matricula,
                    celular: celular,
                    email: email,
                    senha: senha,
                    notas: {
                        matematica: {
                            bimestre1: 0,
                            bimestre2: 0,
                            bimestre3: 0,
                            bimestre4: 0,
                            media: 0,
                        },

                        geografia: {
                            bimestre1: 0,
                            bimestre2: 0,
                            bimestre3: 0,
                            bimestre4: 0,
                            media: 0,
                        },

                        portugues: {
                            bimestre1: 0,
                            bimestre2: 0,
                            bimestre3: 0,
                            bimestre4: 0,
                            media: 0,
                        },

                        ciencia: {
                            bimestre1: 0,
                            bimestre2: 0,
                            bimestre3: 0,
                            bimestre4: 0,
                            media: 0,
                        },

                        historia: {
                            bimestre1: 0,
                            bimestre2: 0,
                            bimestre3: 0,
                            bimestre4: 0,
                            media: 0,
                        }
                    },

                    faltas: {
                        matematica: {
                            bimestre1: 0,
                            bimestre2: 0,
                            bimestre3: 0,
                            bimestre4: 0,
                            total: 0,
                        },

                        geografia: {
                            bimestre1: 0,
                            bimestre2: 0,
                            bimestre3: 0,
                            bimestre4: 0,
                            total: 0,
                        },

                        portugues: {
                            bimestre1: 0,
                            bimestre2: 0,
                            bimestre3: 0,
                            bimestre4: 0,
                            total: 0,
                        },

                        ciencia: {
                            bimestre1: 0,
                            bimestre2: 0,
                            bimestre3: 0,
                            bimestre4: 0,
                            total: 0,
                        },

                        historia: {
                            bimestre1: 0,
                            bimestre2: 0,
                            bimestre3: 0,
                            bimestre4: 0,
                            total: 0,
                        }
                    },

                    ocorrencias: [],

                    atividades: [],

                })
                .then(() => {
                    let validar = document.querySelectorAll("#validaCadastro .form-control");
                    let nome = document.getElementById("nome").value;
                    let divAluno = document.getElementById("listaNomes");

                    // INSERE O NOME DO ALUNO CADASTRADO NO MENU
                    divAluno.innerHTML += `<a href="#" uid="${id}" class="list-group-item list-group-item-action activ" onclick="carregaAluno(this)">${nome}</a>`;

                    // LIMPA OS CAMPOS DO INPUT
                    validar.forEach(element => {
                        element.value = "";
                    })

                    alert("Aluno Cadastrado");

                    
                }).catch(err => {
                    alert(err, "Consulte o administrador do Sistema");
                });
        })
        .catch(err => {
            let msg = err.code;
            if (msg == "auth/email-already-in-use") {
                alert("Esse e-mail ja existe");
            } else if (msg == "auth/weak-password") {
                alert("A senha deve ter no minino 6 caracteres");
            }
        })
}

// VERIFICA SE TODOS OS CAMPOS PARA CADASTRAR O ALUNO ESTÃO PREENCHIDOS
function verificaCamposCadastro() {
    let val = 0;
    let promise = new Promise(function(resolve, reject) {

        let validar = document.querySelectorAll("#validaCadastro .form-control");

        validar.forEach((e) => {
            if (e.value == "") {
                val++;
            } else {
                return;
            }
        })

        if (val == 0) {
            resolve();
        } else {
            reject();
        }
    })
    return promise;
}

//  INSERIR ALUNO NO MENU E CADASTRAR NO BANCO
async function inserirAluno() {
    // VERIFICA - PARA VERIFICAR SE TODOS OS CAMPOS ESTÃO PREENCHIDOS
    verificaCamposCadastro().then(() => {
            cadastrarAluno();
        }).then(() => {

        })
        .catch(() => {
            alert("Preencha todos os campos");
        })
}



// CONSULTAR OS ALUNOS NO BANCO E COLOCAR NA TELA
async function consultarAluno() {
    let nome = document.getElementById("nomeConsultar").value;
    let variavel = 0;

    await db.collection("alunos").get().then(snapshot => {
            snapshot.forEach(doc => {
                if (nome == doc.data().nome) {
                    document.getElementById("retornaNome").value = `${doc.data().nome}`;
                    document.getElementById("retornaIdade").value = `${doc.data().idade}`;
                    document.getElementById("retornaMatricula").value = `${doc.data().matricula}`;
                    document.getElementById("retornaCelular").value = `${doc.data().celular}`;
                    document.getElementById("retornaEmail").value = `${doc.data().email}`;
                    document.getElementById("retornaSenha").value = `${doc.data().senha}`;
                    variavel = 1;
                }
            })
        })
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        })

    switch (variavel) {
        case 0:
            alert("Aluno não encontrado");
            break;
        case 1:
            break;
    }

}

// REMOVER O ALUNO DO BANCO
async function removerAluno() {
    let nome = document.getElementById("nomeConsultar").value;
    let id;
    let listaDeAlunos = document.querySelectorAll("#listaNomes a");
    let inputs = document.querySelectorAll("#consultar input");



    if (nome == "") {
        alert("Aluno não encontrado")
    } else {

        db.collection("alunos").get().then(snapshot => {
                snapshot.forEach(doc => {
                    if (nome == doc.data().nome) {
                        id = doc.data().uid;
                        db.collection("alunos").doc(id).delete().then(() => {
                                alert("Aluno deletado com sucesso");

                                listaDeAlunos.forEach(doc => {
                                    let uidAluno = doc.getAttribute("uid");
                                    if(uidAluno == id){
                                        doc.remove();
                                    }
                                })

                                inputs.forEach(doc =>{
                                    doc.value = "";
                                })

                            })
                            .catch(err => {
                                alert(err, "Consulte o administrador do Sistema");
                            })
                    } else return;
                })
            })
            .catch(err => {
                alert(err, "Consulte o administrador do Sistema");
            })
    }
}