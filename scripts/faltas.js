var btnInserirFaltas = document.getElementById("btnInserirFaltas");

// VARIAVEIS PARA CALCULAR AS MEDIAS
var total;



// INSERIR faltas NA TABELA DE faltas E SALVAR NO BANCO
// TAMBEM CALCULA O TOTAL DAS FALTAS
btnInserirFaltas.addEventListener("click", inserirFaltasComPromise);


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


// USANDO PROMISE PARA VERIFICAR SE OS CAMPOS DAS FALTAS ESTÃO PREENCHIDOS
function verificaCamposFaltas() {
    let materia = document.getElementById("faltasMateria");
    let valueMateria = materia.options[materia.selectedIndex].text;
    let bimestre = document.getElementById("faltasBimestre");
    let valueBimestre = bimestre.options[bimestre.selectedIndex].text;
    let falta = document.getElementById("recebeFalta").value;

    let promise = new Promise(function(resolve, reject) {

        if (falta !== "" && valueMateria !== "" && valueBimestre !== "") {
            resolve();
        } else {
            reject();
        }
    })

    return promise;
}

// INSERIR AS FALTAS NA TABELA PARA SER CHAMADA NA FUNÇÃO COM PROMISE
async function inserirFaltas() {
    let materia = document.getElementById("faltasMateria");
    var valueMateria = materia.options[materia.selectedIndex].value;
    let bimestre = document.getElementById("faltasBimestre");
    let valueBimestre = bimestre.options[bimestre.selectedIndex].value;
    let falta = parseInt(document.getElementById("recebeFalta").value);

    //INSERIR FALTA NO BANCO
    await db.collection("alunos").doc(uid).set({
            faltas: {
                [valueMateria]: {
                    [valueBimestre]: falta,
                }
            }
        }, { merge: true })
        .then()
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        })

    // SOMAR FALTAS 
    await db.collection("alunos").doc(uid).get().then(doc => {
            let faltas = doc.data().faltas;
            total = faltas[valueMateria].bimestre1 + faltas[valueMateria].bimestre2 + faltas[valueMateria].bimestre3 + faltas[valueMateria].bimestre4;
        })
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        });

    // IBSERINDO A MEDIA NO BANCO
    await db.collection("alunos").doc(uid).set({
            faltas: {
                [valueMateria]: {
                    total: total,
                }
            },

        }, { merge: true })
        .then()
        .catch(err => {
            alert(err, "Consulte o administrador do Sistema");
        })

    // CARREGA TODAS AS FALTAS NOVAMENTE PARA A TABELA 
    carregaFaltas();

    // LIMPA OS IMPUT
    materia.options.selectedIndex = "0";
    bimestre.options.selectedIndex = "0";
    document.getElementById("recebeFalta").value = "";
}

// INSERIR AS NOTAS MA TABELA COM PROMISE
function inserirFaltasComPromise() {
    verificaCamposFaltas().then(() => {
        inserirFaltas();
    }).catch(() => {
        alert("Preencha todos os campos");
    })
}