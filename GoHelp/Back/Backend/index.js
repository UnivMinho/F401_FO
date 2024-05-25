document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userProfileImage = userData.profileImage || userData.imageUrl;
  document.getElementById("user-profile-image-navbar").src = userProfileImage;

  // Inicializar mapa e carregar iniciativas
  initMap();

  // Carregar materiais
  loadMaterials();
});

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.540393319546496, lng: -8.307363083499494 },
    zoom: 7,
  });
  loadInitiatives(map);
}

function loadInitiatives(map) {
  const initiatives = JSON.parse(localStorage.getItem("initiatives")) || [];
  const tbody = document.getElementById("initiatives-tbody");
  const initiativesIniciadas = initiatives.filter(
    (initiative) => initiative.status === "A decorrer" 
  )
  tbody.innerHTML = '';

  initiativesIniciadas.forEach((initiative) => {
    const tr = createInitiativeTableRow(initiative);
    tbody.appendChild(tr);
    const marker = new google.maps.Marker({
      position: { lat: parseFloat(initiative.latitude), lng: parseFloat(initiative.longitude) },
      map: map,
      title: initiative.name,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<p>${initiative.name}</p>`
    });

    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  });
}

function createInitiativeTableRow(initiative) {
  const progress = calculateProgress(initiative.date);
  const tr = document.createElement("tr");
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

function calculateProgress(endDate) {
  const currentDate = new Date();
  const end = new Date(endDate);

  if (currentDate >= end) {
    return 100;
  }

  const totalDuration = end - currentDate;
  const elapsed = end - currentDate;
  return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
}

function createMaterialTableRow(material) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${material.nome}</td>
    <td>0</td>
    <td>${material.quantidade}</td>
  `;
  return tr;
}

function loadMaterials() {
  const materialsData = localStorage.getItem("materials");
  if (materialsData) {
    const materials = JSON.parse(materialsData);
    const tableBody = document.getElementById("materials-table-body");
    tableBody.innerHTML = "";

    materials.forEach((material) => {
      const tr = createMaterialTableRow(material);
      tableBody.appendChild(tr);
    });
  } else {
    console.warn("Nenhum material encontrado no localStorage.");
  }
}
// carregar iniciativas pendentes
document.addEventListener("DOMContentLoaded", function () {
  const initiatives = JSON.parse(localStorage.getItem("initiatives")) || [];
  const contagempendentes = initiatives.filter(
    (initiative) => initiative.status === "pendente"
  ).length;
  document.getElementById("iniciativas-pendentes").innerText =
    contagempendentes;
});

// carregar iniciativas por decorrer
document.addEventListener("DOMContentLoaded", function () {
  const initiatives = JSON.parse(localStorage.getItem("initiatives")) || [];
  const contagemporrealizar = initiatives.filter(
    (initiative) => initiative.status === "Por realizar"
  ).length;
  document.getElementById("iniciativas-por-realizar").innerText =
    contagemporrealizar;
});

// carregar profissionais connosco
document.addEventListener("DOMContentLoaded", function () {
  const profissionais = JSON.parse(localStorage.getItem("profissionais")) || [];
  const contagemProfissionais = profissionais.length;
  document.getElementById("numero-profissionais").innerText = contagemProfissionais;
});

// carregar voluntários connosco
document.addEventListener("DOMContentLoaded", function () {
  const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
  const contagemvoluntarios = usersData.filter(
    (usersData) => usersData.userType === "Voluntário"
  ).length;
  document.getElementById("numero-voluntarios").innerText = contagemvoluntarios;
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

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Por favor, escreva uma tarefa.');
    return;
  }

  const listItem = document.createElement('li');
  const Containertarefa = document.createElement('div');
  Containertarefa.className = 'container-tarefa';
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  taskSpan.onclick = toggleTaskCompleted;

  const botaoRemover = document.createElement('button');
  botaoRemover.className='botao-remover';
  botaoRemover.innerHTML = '<i class="mdi mdi-close-circle-outline"></i>';
  botaoRemover.onclick = removeTask;

  Containertarefa.appendChild(taskSpan);
  listItem.appendChild(Containertarefa);
  listItem.appendChild(botaoRemover);
  taskList.appendChild(listItem);

  saveTaskList();

  taskInput.value = '';
}

function saveTaskList() {
  const taskList = document.getElementById('taskList');
  const tasks = [];
  for (let i = 0; i < taskList.children.length; i++) {
    const taskSpan = taskList.children[i].querySelector('.container-tarefa span');
    const taskText = taskSpan.textContent;
    const taskCompleted = taskSpan.classList.contains('completed');
    tasks.push({ text: taskText, completed: taskCompleted });
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.onload = function() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    const taskList = document.getElementById('taskList');
    tasks.forEach(task => {
      const listItem = document.createElement('li');
      const Containertarefa = document.createElement('div');
      Containertarefa.className = 'container-tarefa';
      const taskSpan = document.createElement('span');
      taskSpan.textContent = task.text;
      if (task.completed) {
        taskSpan.classList.add('completed');
      }
      taskSpan.onclick = toggleTaskCompleted;

      const botaoRemover = document.createElement('button');
      botaoRemover.className='botao-remover';
      botaoRemover.innerHTML = '<i class="mdi mdi-close-circle-outline"></i>';
      botaoRemover.onclick = removeTask;

      Containertarefa.appendChild(taskSpan);
      listItem.appendChild(Containertarefa);
      listItem.appendChild(botaoRemover);
      taskList.appendChild(listItem);
    });
  }
}

function toggleTaskCompleted() {
  this.classList.toggle('completed');
  saveTaskList();
}

function removeTask() {
  const listItem = this.parentNode;
  listItem.parentNode.removeChild(listItem);
  saveTaskList();
}

