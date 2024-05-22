function updateButtonText(element, text) {
    // 'element' é o item do dropdown que foi clicado
    // O botão que queremos alterar é o elemento 'button' dentro do componente 'dropdown' que contém o item clicado
    var button = element.closest('.dropdown').querySelector('.dropdown-toggle');
    button.textContent = text;
}
document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userProfileImage = userData.profileImage || userData.imageUrl;
    document.getElementById('user-profile-image-navbar').src = userProfileImage;
});