// Função que preenche os campos com os dados atuais
function populateFormFields(userData) {
    console.log('Populando campos com os dados do usuário:', userData);
    document.getElementById('google-name').value = userData.name;
    document.getElementById('google-email').value = userData.email;
    document.getElementById('phone').value = userData.phone || '';
    document.getElementById('google-name').readOnly = true;
    document.getElementById('google-email').readOnly = true;
    const userProfileImage = userData.profileImage || userData.imageUrl;
    document.getElementById('user-profile-image').src = userProfileImage;
    document.getElementById('user-profile-image-navbar').src = userProfileImage;

}

// Função que faz update em userData e em usersData
function updateUserInfo(phone, profileImage) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        userData.phone = phone;
        if (profileImage) {
            userData.profileImage = profileImage;
        }
        localStorage.setItem('userData', JSON.stringify(userData));

        // Update the corresponding user's information in usersData
        const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
        const updatedUsersData = usersData.map(user => {
            if (user.email === userData.email) {
                return { ...user, phone: phone, profileImage: profileImage || user.profileImage };
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
    const profileImage = document.getElementById('user-profile-image').src;
    updateUserInfo(phone, profileImage);
}

// Função para ler a imagem selecionada
function readURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('user-profile-image').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
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

    document.querySelector(".file-upload-browse").addEventListener("click", function () {
        const fileInput = document.querySelector(".file-upload-default");
        if (fileInput) {
            fileInput.click(); // Abre a janela de seleção de arquivo
        }
    });

    document.querySelector(".file-upload-default").addEventListener("change", function () {
        readURL(this);
        const fileInput = document.querySelector(".file-upload-info");
        if (fileInput) {
            fileInput.value = this.files[0].name; // Atualiza o nome do arquivo no campo de texto
        }
    });
});
