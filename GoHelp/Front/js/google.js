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

/// Inicializa o Firebase
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
                userType: 'Voluntário',
                phone: '',
                fullName: ''
            };
            //Guardar informações do user com sessão iniciada
            saveUserData(userData);
            
            // Verifica se o user já existe e mantém o tipo se ele já estiver definido
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
// Função para logout
function logout() {
    auth.signOut().then(() => {
        localStorage.removeItem('userData');
        localStorage.removeItem('userType');
    }).catch((error) => {
        console.error('Erro ao fazer logout:', error);
    });
}

// Event listener para ação de logout
document.getElementById('logoutButton').addEventListener('click', logout);

function saveUserData(userData) {
    let usersData = JSON.parse(localStorage.getItem('usersData')) || [];
    const existingUser = usersData.find(user => user.email === userData.email);
    if (existingUser) {
        // Se o user existir utiliza os dados do localStorage
        userData = existingUser;
    } else {
        // Se o user não exitir utiliza os novos dados
        userData = { ...userData, ...existingUser };
    }

    // Gravar em localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log('User data saved to localStorage:', userData);

    const userType = localStorage.getItem('userType');
    if (!userType) {
        localStorage.setItem('userType', 'voluntario');
        console.log('Tipo de usuário definido como voluntário por padrão.');
    }
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

function updateUserData(userData) {
    let users = JSON.parse(localStorage.getItem('usersData')) || [];
    const existingUserIndex = users.findIndex(user => user.email === userData.email);
    if (existingUserIndex === -1) {
        // Se não existir index, pode criar novo user
        users.push(userData);
        localStorage.setItem('usersData', JSON.stringify(users));
        console.log('New user added to localStorage:', userData);
    } else {
        // Se o user existir, mantém o mesmo userType
        userData.userType = users[existingUserIndex].userType;
        console.log('User already exists in localStorage. Not adding:', userData);
    }
}

function redirectToPage(userType) {
    if (userType === 'Administrador') {
        window.location.href = "http://localhost:3000/GoHelp/back/index.html";  // Página de back office
    } else {  // Assume-se que todos os outros são 'Voluntário'
        window.location.href = "minhasIniciativas.html";  // Página de front office
    }
}

function updateUserType(userId, newUserType) {
    let users = JSON.parse(localStorage.getItem('usersData')) || [];
    const userIndex = users.findIndex(user => user.id === userId);
    if(userIndex !== -1) {
        users[userIndex].userType = newUserType;  // Atualiza o tipo de usuário
        localStorage.setItem('usersData', JSON.stringify(users));  // Salva no localStorage
        loadUserData();  // Recarrega os dados do usuário para atualizar a tabela
    }
}