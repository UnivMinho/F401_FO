document.addEventListener('DOMContentLoaded', function () {
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

// Função para criar uma linha da tabela
function createTableRow(initiative) {
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

// Função para carregar as iniciativas do localStorage
function loadInitiatives() {
 const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
 const tbody = document.querySelector('.table tbody');

 initiatives.forEach(initiative => {
   const tr = createTableRow(initiative);
   tbody.appendChild(tr);
 });
}

// Carregar as iniciativas quando o DOM estiver completamente carregado
loadInitiatives();
});

//caregar iniciativas pendentes
  document.addEventListener('DOMContentLoaded', function() {
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const contagempendentes = initiatives.filter(initiative => initiative.status === 'pendente').length;
    document.getElementById('iniciativas-pendentes').innerText = contagempendentes;
  });

//carregar iniciativas por decorrer
document.addEventListener('DOMContentLoaded', function() {
  const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
  const contagempordecorrer = initiatives.filter(initiative => initiative.status === 'aprovada').length;
  document.getElementById('iniciativas-por-decorrer').innerText = contagempordecorrer;
});


function loadMaterials() {
   const materialsData = localStorage.getItem('materials');
   if (materialsData) {
       const materials = JSON.parse(materialsData);
       const tableBody = document.getElementById('materials-table-body');
       tableBody.innerHTML = '';

       materials.forEach(material => {
           const row = document.createElement('tr');

           const nomeCell = document.createElement('td');
           nomeCell.textContent = material.nome;
           row.appendChild(nomeCell);

           const noTerrenoCell = document.createElement('td');
           noTerrenoCell.textContent = '0'; // Mantém tudo a 0
           row.appendChild(noTerrenoCell);

           const disponivelCell = document.createElement('td');
           disponivelCell.textContent = material.quantidade;
           row.appendChild(disponivelCell);

           tableBody.appendChild(row);
       });
   } else {
       console.warn('Nenhum material encontrado no localStorage.');
   }
}

document.addEventListener('DOMContentLoaded', loadMaterials);
