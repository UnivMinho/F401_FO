document.addEventListener('DOMContentLoaded', function () {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userProfileImage = userData.profileImage || userData.imageUrl;
  document.getElementById('user-profile-image-navbar').src = userProfileImage;

  // Função para calcular o progresso baseado na data atual e na data de início da iniciativa
  function calculateProgress(endDate) {
    const currentDate = new Date();
    const end = new Date(endDate);

    if (currentDate >= end) {
      return 100; // Progresso completo se a data atual é igual ou posterior à data de início
    }

    const totalDuration = end - currentDate; // Tempo total até a data de início
    const elapsed = end - currentDate; // Tempo decorrido desde a data atual até a data de início
    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100); // Limita o progresso entre 0 e 100
  }

  // Função para criar uma linha da tabela de iniciativas
  function createInitiativeTableRow(initiative) {
    const progress = calculateProgress(initiative.date);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${initiative.name}</td>
      <td>${initiative.location}</td>
      <td>${initiative.type}</td>
      <td>${initiative.proponent}</td>
      <td>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </td>
    `;
    return tr;
  }

  function loadInitiatives() {
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const tbody = document.getElementById('initiatives-tbody');
    const initiativesIniciadas = initiatives.filter(initiative => initiative.status === 'aprovada');

    initiativesIniciadas.forEach(initiative => {
      const tr = createInitiativeTableRow(initiative);
      tbody.appendChild(tr);
    });
  }

  // Carregar as iniciativas quando o DOM estiver completamente carregado
  loadInitiatives();
  
  // Função para criar uma linha da tabela de materiais
  function createMaterialTableRow(material) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${material.nome}</td>
      <td>0</td>
      <td>${material.quantidade}</td>
    `;
    return tr;
  }

  function loadMaterials() {
    const materialsData = localStorage.getItem('materials');
    if (materialsData) {
      const materials = JSON.parse(materialsData);
      const tableBody = document.getElementById('materials-table-body');
      tableBody.innerHTML = '';

      materials.forEach(material => {
        const tr = createMaterialTableRow(material);
        tableBody.appendChild(tr);
      });
    } else {
      console.warn('Nenhum material encontrado no localStorage.');
    }
  }

  // Carregar os materiais quando o DOM estiver completamente carregado
  loadMaterials();
});

// carregar iniciativas pendentes
document.addEventListener('DOMContentLoaded', function() {
  const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
  const contagempendentes = initiatives.filter(initiative => initiative.status === 'pendente').length;
  document.getElementById('iniciativas-pendentes').innerText = contagempendentes;
});

// carregar iniciativas por decorrer
document.addEventListener('DOMContentLoaded', function() {
  const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
  const contagemporrealizar = initiatives.filter(initiative => initiative.status === 'aprovada').length;
  document.getElementById('iniciativas-por-realizar').innerText = contagemporrealizar;
});

// carregar voluntários connosco
document.addEventListener('DOMContentLoaded', function() {
  const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
  const contagemvoluntarios = usersData.filter(usersData => usersData.userType === 'Voluntário').length;
  document.getElementById('numero-voluntarios').innerText = contagemvoluntarios;
});
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.540393319546496, lng: -8.307363083499494},
      zoom: 7
  });
}