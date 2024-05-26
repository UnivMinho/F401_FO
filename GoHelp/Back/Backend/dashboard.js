document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userProfileImage = userData.profileImage || userData.imageUrl;
    document.getElementById('user-profile-image-navbar').src = userProfileImage;
});

//nome mensagem inicial
document.addEventListener("DOMContentLoaded", function() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      const name = userData.name; 
      const mensagem = document.getElementById("mensagem");
      mensagem.textContent = `Bem-Vindo, ${name}`;
    }
  });