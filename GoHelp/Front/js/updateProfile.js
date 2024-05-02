// Função que preenche os campos com os dados atuais
function populateFormFields(userData) {
    document.getElementById('google-name').value = userData.name;
    document.getElementById('google-email').value = userData.email;
    document.getElementById('all-name').value = userData.fullName || '';
    document.getElementById('phone').value = userData.phone || '';
    document.getElementById('google-name').readOnly = true;
    document.getElementById('google-email').readOnly = true;
}

// Função que faz update em userData e em usersData
function updateUserInfo(fullName, phone) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        userData.fullName = fullName;
        userData.phone = phone;
        localStorage.setItem('userData', JSON.stringify(userData));

        // Update the corresponding user's information in usersData
        const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
        const updatedUsersData = usersData.map(user => {
            if (user.email === userData.email) {
                return { ...user, fullName: fullName, phone: phone };
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
    const fullName = document.getElementById('all-name').value;
    const phone = document.getElementById('phone').value;

    updateUserInfo(fullName, phone);
}

// Função que começa assim que a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        populateFormFields(userData);
    } else {
        console.log('Dados do utilizador não encontrados em localStorage.');
    }

    const form = document.querySelector('.donate-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        saveUpdatedUserInfo(); 
    });
});
