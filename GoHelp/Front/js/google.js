import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDYfzXglNuRQOo8fYKObQqrhixdfzrbt3k",
    authDomain: "pw-f401.firebaseapp.com",
    projectId: "pw-f401",
    storageBucket: "pw-f401.appspot.com",
    messagingSenderId: "171557937473",
    appId: "1:171557937473:web:cf399649671b58007d01c0",
    measurementId: "G-7KPNJ7MYWT"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
    const googleButtons = document.querySelectorAll("[id^='google-btn']");
    googleButtons.forEach(button => {
        button.addEventListener('click', handleGoogleLogin);
    });

    // Carrega dados existentes do localStorage para a tabela
    loadUserData();
});

function handleGoogleLogin() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;

            let userData = {
                id: user.uid,
                name: user.displayName,
                imageUrl: user.photoURL,
                email: user.email,
                dataCriado: new Date().toISOString(),
                userType: 'Voluntário'
            };

            // Verifica se o usuário já existe e mantém o tipo se ele já estiver definido
            updateUserData(userData);

            // Atualiza a tabela com os novos dados
            loadUserData();

            // Redireciona com base no tipo de usuário
            redirectToPage(userData.userType);
        })
        .catch((error) => {
            console.error(error);
        });
}


function saveUserData(userData) {
    let users = JSON.parse(localStorage.getItem('usersData')) || [];
    users.push(userData);
    localStorage.setItem('usersData', JSON.stringify(users));
    console.log('User data saved to localStorage:', userData);
}

function loadUserData() {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
    const tableBody = document.querySelector('.table tbody');

    if (!tableBody) {
        console.error('O elemento tbody não foi encontrado. Verifique o seletor ou a estrutura do HTML.');
        return;
    }

    // Limpa a tabela antes de adicionar novos dados
    tableBody.innerHTML = '';

    usersData.forEach(user => {
        const row = tableBody.insertRow();
        row.setAttribute('data-user-id', user.id); // Adiciona um atributo data-user-id

        row.insertCell(0).textContent = user.name;
        row.insertCell(1).textContent = user.id;
        row.insertCell(2).textContent = new Date(user.dataCriado).toISOString().slice(0, 10);

        const userTypeCell = row.insertCell(3);
        userTypeCell.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-sm dropdown-toggle" type="button" data-toggle="dropdown" style="background-color: rgb(117, 190, 192); color: white; width: 140px;">
                    ${user.userType || 'Voluntário'}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item">Voluntário</a>
                    <a class="dropdown-item">Administrador</a>
                </div>
            </div>
        `;
        const dropdownItems = userTypeCell.querySelectorAll('.dropdown-item');
        dropdownItems[0].addEventListener('click', () => updateUserType(user.id, 'Voluntário'));
        dropdownItems[1].addEventListener('click', () => updateUserType(user.id, 'Administrador'));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Apagar Conta';
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.style.cssText = 'height: 35px; padding-top: 0; padding-bottom: 0; line-height: 25px;';
        deleteBtn.addEventListener('click', () => removeUser(user.id));
        row.insertCell(4).appendChild(deleteBtn);
    });

    if (usersData.length === 0) {
        const row = tableBody.insertRow();
        const cell = row.insertCell(0);
        cell.textContent = "Nenhuma conta registrada.";
        cell.colSpan = 5;
    }
}

window.removeUser = function(userId) {
    let users = JSON.parse(localStorage.getItem('usersData')) || [];
    users = users.filter(user => user.id !== userId);
    localStorage.setItem('usersData', JSON.stringify(users));
    loadUserData(); // Recarrega a tabela para mostrar as mudanças
};

function updateUserData(userData) {
    let users = JSON.parse(localStorage.getItem('usersData')) || [];
    const existingUser = users.find(user => user.id === userData.id);
    if (existingUser) {
        userData.userType = existingUser.userType;  // Mantém o tipo existente
    }
    // Atualiza ou adiciona o usuário
    users = users.filter(user => user.id !== userData.id);  // Remove a entrada antiga, se houver
    users.push(userData);  // Adiciona a nova entrada
    localStorage.setItem('usersData', JSON.stringify(users));
    console.log('User data saved to localStorage:', userData);
}

function redirectToPage(userType) {
    if (userType === 'Administrador') {
        window.location.href = "http://localhost:3000/GoHelp/back/index.html";  // Página de back office
    } else {  // Assume-se que todos os outros são 'Voluntário'
        window.location.href = "minhasIniciativas.html";  // Página de front office
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};

    // Preencher os campos do formulário com os dados do usuário do Google
    fillFormFields(userData);

    const imgElement = document.querySelector('img[src="images/faces/face28.jpg"]');
    if (imgElement && userData.imageUrl) {
        imgElement.src = userData.imageUrl;
    }

    const imgElementForm = document.getElementById('user-profile-form');
    if (imgElementForm && userData.imageUrl) {
        imgElementForm.src = userData.imageUrl;
    }

    const uploadButton = document.getElementById('uploadButton');
    uploadButton.addEventListener('click', function() {
        const inputFoto = document.createElement('input');
        inputFoto.type = 'file';
        inputFoto.accept = 'image/*';
        inputFoto.onchange = function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const fotoURL = e.target.result;
                    if (imgElement) {
                        imgElement.src = fotoURL;
                    }
                    userData.photoURL = fotoURL;
                    localStorage.setItem('userData', JSON.stringify(userData));
                };
                reader.readAsDataURL(file);
            }
        };
        inputFoto.click();
    });

    const form = document.querySelector('.forms-sample');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telemovel = document.getElementById('telemovel').value;
        const fotoURL = userData.photoURL || '';

        const userDataUpdated = { name: nome, email: email, telemovel: telemovel, photoURL: fotoURL };

        localStorage.setItem('userData', JSON.stringify(userDataUpdated));

        form.reset();
    });
});

function fillFormFields(userData) {
    document.getElementById('nome').value = userData.name || '';
    document.getElementById('email').value = userData.email || '';
    document.getElementById('telemovel').value = userData.telemovel || '';

    const imgElement = document.querySelector('img[src="images/faces/face28.jpg"]');
    if (imgElement && userData.photoURL) {
        imgElement.src = userData.photoURL;
    }

    const imgElementForm = document.getElementById('user-profile-form');
    if (imgElementForm && userData.photoURL) {
        imgElementForm.src = userData.photoURL;
    }
}
