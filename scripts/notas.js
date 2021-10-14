var btnInserirNotas = document.getElementById("btnInserirNotas");

// VARIAVEL PARA CALCULAR AS MEDIAS
var media;

// var uid = auth.currentUser;

// INSERIR NOTAS NA TABELA DE NOTAS E SALVAR NO BANCO
// TAMBEM CALCULA AS MEDIAS
btnInserirNotas.addEventListener("click", inserirNotasComPromise);

// CARREGA AS NOTAS NA TABELTA DE NOTAS
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

// USANDO PROMISE PARA VERIFICAR SE OS CAMPOS DA NOTAS ESTÃO PREENCHIDOS
function verificaCamposNotas() {
    let materia = document.getElementById("notasMateria");
    let valueMateria = materia.options[materia.selectedIndex].text;
    let bimestre = document.getElementById("notasBimestre");
    let valueBimestre = bimestre.options[bimestre.selectedIndex].text;
    let nota = document.getElementById("recebeNota").value;

    let promise = new Promise(function(resolve, reject) {

        if (nota !== "" && valueMateria !== "" && valueBimestre !== "") {
            resolve();
        } else {
            reject();
        }
    })

    return promise;
}

// INSERIR AS NOTAS NA TABELA PARA SER CHAMADA NA FUNÇÃO COM PROMISE
async function inserirNotas() {
    let materia = document.getElementById("notasMateria");
    var valueMateria = materia.options[materia.selectedIndex].value;
    let bimestre = document.getElementById("notasBimestre");
    let valueBimestre = bimestre.options[bimestre.selectedIndex].value;
    let nota = parseInt(document.getElementById("recebeNota").value);

    //INSERIR NOTA NO BANCO
    await db.collection("alunos").doc(uid).set({
            notas: {
                [valueMateria]: {
                    [valueBimestre]: nota,
                }
            }
        }, { merge: true })
        .then()
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        })

    // CALCULAR A MEDIA    
    await db.collection("alunos").doc(uid).get().then(doc => {
            let notas = doc.data().notas;
            media = (notas[valueMateria].bimestre1 + notas[valueMateria].bimestre2 + notas[valueMateria].bimestre3 + notas[valueMateria].bimestre4) / 4;
        })
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        });

    // IBSERINDO A MEDIA NO BANCO
    await db.collection("alunos").doc(uid).set({
            notas: {
                [valueMateria]: {
                    media: media,
                }
            },

        }, { merge: true })
        .then()
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        })

    // CARREGA TODAS AS NOTAS NOVAMENTE PARA A TABELA 
    carregaNotas();

    // LIMPA O INPUT E OS SELECTS
    document.getElementById("recebeNota").value = "";
    materia.options.selectedIndex = "0";
    bimestre.options.selectedIndex = "0";

}

// INSERIR AS NOTAS MA TABELA COM PROMISE
function inserirNotasComPromise() {
    verificaCamposNotas().then(() => {
        inserirNotas();
    }).catch(() => {
        alert("Preencha todos os campos");
    })
}