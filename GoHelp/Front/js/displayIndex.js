let currentOpenDetailsRow = null;

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

    displayInitiativesApproved(map);
}

//Função para mostrar as iniciativas approvadas
function displayInitiativesApproved(map) {
    const userInitiatives = getUserInitiatives();
    const alliniciativesTableBody = document.querySelector('#iniciativasIndex tbody');
    alliniciativesTableBody.innerHTML = ''; 

    userInitiatives.forEach((initiative) => {
        if (initiative.status === 'aprovada') {
            const row = document.createElement('tr');
            row.innerHTML = `
            <tr onclick="this.nextSibling.style.display = this.nextSibling.style.display === 'none' ? 'table-row' : 'none';">
                <td>${initiative.name}</td>
                <td>${initiative.type}</td>
                <td>${initiative.date}</td>
                <td class="toggle-details" style="cursor: pointer;"> ↓</td>
            </tr>
            `;
        
        const hiddenRowHtml = generateHiddenRow(initiative);

        alliniciativesTableBody.appendChild(row);
        alliniciativesTableBody.insertAdjacentHTML('beforeend', hiddenRowHtml);
        
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

    });
    
    if (alliniciativesTableBody.children.length === 0) {
        const allInitiativesRow = document.createElement('tr');
        allInitiativesRow.innerHTML = `<td colspan="5" style="text-align: center;">Atualmente não existem iniciativas disponíveis.</td>`;
        alliniciativesTableBody.appendChild(allInitiativesRow);
    }
}

//Chama a função displayInitiativesApproved
document.addEventListener('DOMContentLoaded', function() {
    initMap();

    const table = document.getElementById('iniciativasIndex');
    table.addEventListener('click', function (e) {
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
    const currentVolunteersCount = initiative.associatedVolunteers.length;

    const proposerName = getProponentName(initiative.userEmail);

    return `
            <tr style="display:none;">
            <td colspan="8" class="row-bg">
                <div style="padding:5px;">
                    <div class="d-flex justify-content-between">
                        <!-- Container for "Proponente" and "Localização" -->
                        <div class="d-flex flex-column justify-content-between">
                            <!-- "Proponente" -->
                            <div class="mb-2 p-8" style="gap: 10px;">
                                <div class="min-width-cell" style="margin-right: 20px; padding: 10px;">
                                    <p>Proponente</p>
                                    <h6 style="font-size: 15px;">${proposerName}</h6>
                                </div>
                            </div>
                            <!-- "Localização" -->
                            <div class="mr-2 min-width-cell" style="margin-right: 20px; padding: 10px; margin-bottom: 1em;">
                                <p>Localização</p>
                                <h6 style="font-size: 15px;">${initiative.location}</h6>
                            </div>
                        </div>
                        <!-- "Descrição" -->
                        <div class="expanded-table-normal-cell">
                            <p>Descrição</p>
                            <h6 style="font-size: 15px;">${initiative.description}</h6>
                        </div> 
                        <!-- "cell-highlighted" -->
                        <div class="cell-hilighted text-white">
                            <div class="d-flex mb-2">
                                <div class="min-width-cell mr-3">
                                    <p style="font-size: 15px;">Nº voluntários atuais</p>
                                    <h6>${currentVolunteersCount}</h6>
                                </div>
                                <div class="min-width-cell mr-3">
                                    <p style="font-size: 15px;">Nº voluntários máximo</p>
                                    <h6>${initiative.volunteers}</h6>
                                </div>
                                <div class="min-width-cell mr-3">
                                    <p style="font-size: 15px;">Início</p>
                                    <h6>${initiative.date} - ${initiative.start_hour}</h6>
                                </div>
                                <div class="min-width-cell mr-3">
                                    <p style="font-size: 15px;">Fim</p>
                                    <h6>${initiative.date}- ${initiative.end_hour}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                      
            </td>
        </tr>
    `;
}

function getProponentName(email){
    const users = JSON.parse(localStorage.getItem('usersData'));

    const user = users.find(user => user.email === email);
        
    return user ? `${user.name}` : 'Unknown User'; 
}