// Função que preenche os campos com os dados atuais
function populateFormFields(userData) {
    console.log('Populando campos com os dados do usuário:', userData);
    document.getElementById('google-name').value = userData.name;
    document.getElementById('google-email').value = userData.email;
    document.getElementById('phone').value = userData.phone || '';
    document.getElementById('google-name').readOnly = true;
    document.getElementById('google-email').readOnly = true;
}

// Função que faz update em userData e em usersData
function updateUserInfo(phone) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        userData.phone = phone;
        localStorage.setItem('userData', JSON.stringify(userData));

        // Update the corresponding user's information in usersData
        const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
        const updatedUsersData = usersData.map(user => {
            if (user.email === userData.email) {
                return { ...user, phone: phone };
            }
            return user;
        });
        localStorage.setItem('usersData', JSON.stringify(updatedUsersData));
        
        alert('Perfil atualizado com sucesso!');
    } else {
        console.log('Dados do utilizador não encontrados em localStorage.');
    }
}

// Função que redireciona para a função de guardar
function saveUpdatedUserInfo() {
    const phone = document.getElementById('phone').value;
    updateUserInfo(phone);
}

// Função que começa assim que a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const users = JSON.parse(localStorage.getItem('usersData'));
    
    if (users.find(user => user.email === userData.email)) {
        populateFormFields(userData);
    } else {
        console.log('Dados do utilizador não encontrados em localStorage.');
    }

    const form = document.getElementById('account-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        saveUpdatedUserInfo(); 
    });
});
