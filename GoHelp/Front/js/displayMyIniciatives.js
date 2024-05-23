let currentOpenDetailsRow = null;

// Função para ir buscar a data de hoje neste formato "yyyy-mm-dd" 
function getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}

// Função para ir buscar as iniciativas ao localStorage
function getUserInitiatives() {
    const initiativesString = localStorage.getItem('initiatives');
    
    const initiatives = JSON.parse(initiativesString);
    
    return initiatives || [];
}

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.540393319546496, lng: -8.307363083499494},
        zoom: 7
    });

    displayAndSetStatusUserInitiatives(map);
}

// Função para fazer display das iniciativas
function displayAndSetStatusUserInitiatives(map) {
    const userInitiatives = getUserInitiatives();
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    const associatedTableBody = document.querySelector('#associadas tbody');
    associatedTableBody.innerHTML = ''; 

    const proposedTableBody = document.querySelector('#propostas tbody');
    proposedTableBody.innerHTML = '';

    userInitiatives.forEach(initiative => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <tr onclick="this.nextSibling.style.display = this.nextSibling.style.display === 'none' ? 'table-row' : 'none';">                        
            <td class="iniciativa-titulo">${initiative.name}</td>
            <td class="iniciativa-tipo">${initiative.type}</td>
            <td class="data-iniciativa">${initiative.date}</td>
            <td class="status-column"><button class="status-button"></button></td>
            <td class="toggle-details" style="cursor: pointer;"> ↓</td>
        </tr>
        `;
        
        const hiddenRowHtml = generateHiddenRow(initiative);

        if (initiative.userEmail !== userData.email && initiative.associatedVolunteers && initiative.associatedVolunteers.includes(userData.email)) {
            associatedTableBody.appendChild(row);
            associatedTableBody.insertAdjacentHTML('beforeend', hiddenRowHtml);

            const marker = new google.maps.Marker({
                position: { lat: parseFloat(initiative.latitude), lng: parseFloat(initiative.longitude) },
                map: map,
                title: initiative.name
            });
    
            // Informação do marker
            const infoWindow = new google.maps.InfoWindow({
                content: `<p>${initiative.name}</p>`
            });
    
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });

        } else if (initiative.userEmail === userData.email) {
            proposedTableBody.appendChild(row);
            proposedTableBody.insertAdjacentHTML('beforeend', hiddenRowHtml);

            const marker = new google.maps.Marker({
                position: { lat: parseFloat(initiative.latitude), lng: parseFloat(initiative.longitude) },
                map: map,
                title: initiative.name
            });
    
            // Informação do marker
            const infoWindow = new google.maps.InfoWindow({
                content: `<p>${initiative.name}</p>`
            });
    
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
        }
        
        // Definir status com base na data
        const statusCell = row.querySelector('.status-button');
        const initiativeDate = new Date(initiative.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
        const today = new Date(getTodayDate());

        if (initiative.status === 'pendente') {
            statusCell.textContent = 'Pendente';
            statusCell.style.backgroundColor = '#D75413'; // Laranja
        } else if (initiative.status === 'aprovada') {
            if (today < initiativeDate) {
                statusCell.textContent = 'A realizar';
                statusCell.style.backgroundColor = '#008000'; // Verde
            } else if (today > initiativeDate) {
                statusCell.textContent = 'Concluída';
                statusCell.style.backgroundColor = '#FF0000'; // Vermelho
            } else {
                statusCell.textContent = 'A decorrer';
                statusCell.style.backgroundColor = '#FFD700'; // Amarelo Escuro
            }
        }
    });

    if (proposedTableBody.children.length === 0) {
        const noProposedInitiativesRow = document.createElement('tr');
        noProposedInitiativesRow.innerHTML = `<td colspan="5" style="text-align: center;">Não propôs nenhuma iniciativa.</td>`;
        proposedTableBody.appendChild(noProposedInitiativesRow);
    }

    if (associatedTableBody.children.length === 0) {
        const noAssociatedInitiativesRow = document.createElement('tr');
        noAssociatedInitiativesRow.innerHTML = `<td colspan="5" style="text-align: center;">Não está associado a nenhuma iniciativa.</td>`;
        associatedTableBody.appendChild(noAssociatedInitiativesRow);
    }
}

// Chamar a função displayAndSetStatusUserInitiatives() assim que a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    initMap();

    const table = document.getElementById('associadas');
    table.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('toggle-details')) {
            const clickedRow = target.parentElement;
            const detailsRow = clickedRow.nextElementSibling;

            if (currentOpenDetailsRow && currentOpenDetailsRow !== detailsRow) {
                currentOpenDetailsRow.style.display = 'none';
            }

            detailsRow.style.display = detailsRow.style.display === 'none' ? 'table-row' : 'none';
            currentOpenDetailsRow = detailsRow;
        }
    });

    const table1 = document.getElementById('propostas');
    table1.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('toggle-details')) {
            const clickedRow = target.parentElement;
            const detailsRow = clickedRow.nextElementSibling;

            if (currentOpenDetailsRow && currentOpenDetailsRow !== detailsRow) {
                currentOpenDetailsRow.style.display = 'none';
            }

            detailsRow.style.display = detailsRow.style.display === 'none' ? 'table-row' : 'none';
            currentOpenDetailsRow = detailsRow;
        }
    });
});

function generateHiddenRow(initiative) {
    const currentVolunteersCount = initiative.associatedVolunteers ? initiative.associatedVolunteers.length : 0;

    const proposerName = getProponentName(initiative.userEmail);
    
    return `
        <tr style="display:none;">
            <td colspan="8" class="row-bg">
                <div style="padding:5px;">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-column justify-content-between">
                            <div class="mb-2 p-8" style="gap: 10px;">
                                <div class="min-width-cell" style="margin-right: 20px; padding: 10px;">
                                    <p>Proponente</p>
                                    <h6 style="font-size: 15px;">${proposerName}</h6>
                                </div>
                            </div>
                            <div class="mr-2 min-width-cell" style="margin-right: 20px; padding: 10px; margin-bottom: 30px;">
                                <p>Localização</p>
                                <h6 style="font-size: 15px;">${initiative.location}</h6>
                            </div>
                        </div>
                        <div class="expanded-table-normal-cell">
                            <p>Descrição</p>
                            <h6 style="font-size: 15px;">${initiative.description}</h6>
                        </div> 
                        <div class="cell-hilighted text-white">
                            <div class="d-flex mb-2">
                                <div class="min-width-cell mr-3">
                                    <p style="font-size: 15px;">Nº voluntários atuais</p>
                                    <h6>${currentVolunteersCount}</h6>
                                </div>
                                <div class="min-width-cell mr-3">
                                    <p style="font-size: 15px;">Nº voluntários max</p>
                                    <h6>${initiative.volunteers}</h6>
                                </div>
                                <div class="min-width-cell mr-3">
                                    <p style="font-size: 15px;">Início</p>
                                    <h6>${initiative.date} - ${initiative.start_hour}</h6>
                                </div>
                                <div class="min-width-cell mr-3">
                                    <p style="font-size: 15px;">Fim</p>
                                    <h6>${initiative.date} - ${initiative.end_hour}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    `;
}

function getProponentName(email) {
    const users = JSON.parse(localStorage.getItem('usersData'));

    const user = users.find(user => user.email === email);
        
    return user ? `${user.name}` : 'Unknown User'; 
}
