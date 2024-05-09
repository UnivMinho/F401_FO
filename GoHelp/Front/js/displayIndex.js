// Função para ir buscar as iniciativas ao localStorage
function getUserInitiatives() {
    const initiativesString = localStorage.getItem('initiatives');
    
    const initiatives = JSON.parse(initiativesString);
    
    return initiatives || [];
}

//Função para mostrar as iniciativas approvadas
function displayInitiativesApproved() {
    const userInitiatives = getUserInitiatives();
    
    const alliniciativesTableBody = document.querySelector('#iniciativasIndex tbody');
    alliniciativesTableBody.innerHTML = ''; 

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.540393319546496, lng: -8.307363083499494},
        zoom: 7
    });

    userInitiatives.forEach((initiative) => {
        if (initiative.status === 'aprovada') { // Check if initiative is approved
            const row = document.createElement('tr');
            row.innerHTML = `
            <tr onclick="this.nextSibling.style.display = this.nextSibling.style.display === 'none' ? 'table-row' : 'none';">
                <td>${initiative.name}</td>
                <td>${initiative.type}</td>
                <td>${initiative.date}</td>
                <td style="cursor: pointer;"> ↓</td>
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
}

//Chama a função displayInitiativesApproved
document.addEventListener('DOMContentLoaded', function() {
    displayInitiativesApproved();
});

function generateHiddenRow(initiative) {
    const currentVolunteersCount = initiative.associatedVolunteers.length;

    const proposerName = getProponentName(initiative.userEmail);
    console.log("Proponent Name:", proposerName);

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
                            <div class="mr-2 min-width-cell" style="margin-right: 20px; padding: 10px; margin-bottom: 30px;">
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