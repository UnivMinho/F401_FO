document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados do usuário do localStorage
    const userData = JSON.parse(localStorage.getItem('userData')) || {};

    // Preencher os campos do formulário com os dados do usuário, se disponíveis
    document.getElementById('nome').value = userData.name || '';
    document.getElementById('email').value = userData.email || '';
    document.getElementById('telemovel').value = userData.telemovel || ''; // Adicionado para preencher o número de telemóvel

    const imgElement = document.querySelector('img[src="images/faces/face28.jpg"]');
    if (imgElement && userData.photoURL) {
        imgElement.src = userData.photoURL;
    }

    const imgElementForm = document.getElementById('user-profile-form');
    if (imgElementForm && userData.photoURL) {
        imgElementForm.src = userData.photoURL;
    }
    
    // Event listener para o botão de upload de imagem
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

        // Obter os valores dos inputs
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telemovel = document.getElementById('telemovel').value;
        const fotoURL = userData.photoURL || ''; // Manter a mesma foto se não for atualizada

        // Criar objeto com os dados do usuário
        const userDataUpdated = { name: nome, email: email, telemovel: telemovel, photoURL: fotoURL }; // Adicionado telemovel

        // Atualizar os dados do usuário no localStorage
        localStorage.setItem('userData', JSON.stringify(userDataUpdated));

        // Limpar campos do formulário
        form.reset();
    });
});


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
