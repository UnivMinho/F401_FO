// Função para abrir o popup de login com o Google
function openGoogleSignInPopup() {
    var googleSignInParams = {
        'scope': 'email', // ambito de acesso
        'width': 400, 
        'height': 500 
    };

    gapi.auth2.getAuthInstance().signIn(googleSignInParams).then(function(response) {
        //Verificar o tipo de utilizador
        const userType = localStorage.getItem('userType');
        
        // Redirecionar
        if (userType === 'voluntario') {
            window.location.href = "pagina_para_voluntarios.html";
        } else if (userType === 'administrador') {
            window.location.href = "pagina_para_administradores.html";
        } else {
            // Redirecionar para uma página padrão se o tipo não for reconhecido
            window.location.href = "pagina_para_voluntarios.html";
        }
    });
}

// Função para salvar as informações do usuário no localStorage após o login com o Google
function onSignIn(googleUser) {
    // Handle Google Sign-In
    const profile = googleUser.getBasicProfile();
    let userData = {
        id: profile.getId(),
        name: profile.getName(),
        imageUrl: profile.getImageUrl(),
        email: profile.getEmail()
    };
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log('User data saved to localStorage:', userData);

    // Verificar se o tipo de utilizador já está definido no localStorage
    const userType = localStorage.getItem('userType');
    if (!userType) {
        // Se o tipo de usuário não estiver definido, definir como "voluntário" por padrão
        localStorage.setItem('userType', 'voluntario');
        console.log('Tipo de usuário definido como voluntário por padrão.');
    }
}

// Preencher o formulário com as informações do usuário ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        document.getElementById('google-name').value = userData.name;
        document.getElementById('google-email').value = userData.email;
        document.getElementById('google-name').readOnly = true;
        document.getElementById('google-email').readOnly = true;
    } else {
        console.log('User data not found in localStorage.');
    }
});


//This function will save the user's information as a JSON object in localStorage under the key 'userData'. 
//You can access this information later by retrieving it from localStorage:
// Retrieve user data from localStorage
//const userData = JSON.parse(localStorage.getItem('userData'));
//if (userData) {
//    console.log('User data retrieved from localStorage:', userData);
    // Do something with the user data
//} else {
//    console.log('User data not found in localStorage.');
//}
