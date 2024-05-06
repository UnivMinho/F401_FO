// Função para ir buscara a data de hoje neste formato "yyyy-mm-dd" format
function getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}

// Função para ir buscar as iniciativas ao localStorage
function getUserInitiatives() {
    const initiativesString = localStorage.getItem('initiatives');
    
    const initiatives = JSON.parse(initiativesString);
    
    return initiatives || [];
}


// Função para fazer display das iniciativas
function displayAndSetStatusUserInitiatives() {
    const userInitiatives = getUserInitiatives();
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    const associatedTableBody = document.querySelector('#associadas tbody');
    associatedTableBody.innerHTML = ''; 

    const proposedTableBody = document.querySelector('#propostas tbody');
    proposedTableBody.innerHTML = '';

    userInitiatives.forEach(initiative => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="iniciativa-titulo">${initiative.name}</td>
            <td class="iniciativa-tipo">${initiative.type}</td>
            <td class="data-iniciativa">${initiative.date}</td>
            <td class="status-column"><button class="status-button"></button></td>
            <td style="cursor: pointer;"> ↓</td>
        `;
        
        const hiddenRowHtml = generateHiddenRow(initiative);

        if (initiative.userEmail !== userData.email && initiative.associatedVolunteers.includes(userData.email)) {
            associatedTableBody.appendChild(row);
            associatedTableBody.insertAdjacentHTML('beforeend', hiddenRowHtml);
        } else if(initiative.userEmail === userData.email) {
            proposedTableBody.appendChild(row);
            proposedTableBody.insertAdjacentHTML('beforeend', hiddenRowHtml);
        }
        
        // Set status based on initiative's date
        const statusCell = row.querySelector('.status-button');
        const initiativeDate = new Date(initiative.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
        const today = new Date(getTodayDate());

        if (initiative.status === 'pendente') {
            statusCell.textContent = 'Pendente';
            statusCell.style.backgroundColor = '#D75413'; // Orange
        } else if (initiative.status === 'aprovada') {
            if (today < initiativeDate) {
                statusCell.textContent = 'A realizar';
                statusCell.style.backgroundColor = '#008000'; // Green
            } else if (today > initiativeDate) {
                statusCell.textContent = 'Concluída';
                statusCell.style.backgroundColor = '#FF0000'; // Red
            } else {
                statusCell.textContent = 'A decorrer';
                statusCell.style.backgroundColor = '#FFD700'; // Darker yellow
            }
        }
    });
}

// Chamar a função displayAndSetStatusUserInitiatives() assim que a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    displayAndSetStatusUserInitiatives();
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

function getProponentName(email){
    const users = JSON.parse(localStorage.getItem('usersData'));

    const user = users.find(user => user.email === email);
        
    return user ? `${user.name}` : 'Unknown User'; 
}

document.addEventListener('DOMContentLoaded', function() {
    const mainRows = document.querySelectorAll('.main-row');

    mainRows.forEach(mainRow => {
        mainRow.addEventListener('click', function() {
            const detailsRow = this.nextElementSibling;
            detailsRow.style.display = detailsRow.style.display === 'none' ? 'table-row' : 'none';
        });
    });
});
