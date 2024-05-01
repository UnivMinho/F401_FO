function updateButtonText(element, text) {
    // 'element' é o item do dropdown que foi clicado
    // O botão que queremos alterar é o elemento 'button' dentro do componente 'dropdown' que contém o item clicado
    var button = element.closest('.dropdown').querySelector('.dropdown-toggle');
    button.textContent = text;
}

function updateUserType(userId, newType, element) {
let users = JSON.parse(localStorage.getItem('usersData')) || [];
const userIndex = users.findIndex(user => user.id === userId);
if (userIndex !== -1) {
  users[userIndex].userType = newType;  // Atualiza o tipo de usuário
  localStorage.setItem('usersData', JSON.stringify(users));  // Salva no localStorage
  element.closest('.dropdown').querySelector('.btn').textContent = newType;  // Atualiza o texto do botão
}
}

