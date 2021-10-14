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
// var uid;

var login = document.getElementById("login");
var loginEmail = document.getElementById("loginEmail");
var loginSenha = document.getElementById("loginSenha");

login.addEventListener("click", logIn);

alert(`---PROFESSOR---
      login: josevaldo@gmail.com
      senha: 123mudar
`);


function logIn() {
    let email = loginEmail.value;
    let senha = loginSenha.value;

    auth.signInWithEmailAndPassword(email, senha)
        .then(() => {
           let uid = auth.currentUser.uid

            if (uid == "U3BhpZbwHpQpmdxUEQuq5H0gBv52") {
                window.location.replace("professor.html");
            } else {
                window.location.replace("aluno.html");
            }
        })
        .catch(() => {
            alert("Usuario ou senha incorreto")
        })
}