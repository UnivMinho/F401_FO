// Função para ir buscar as iniciativas ao localStorage
function getUserInitiatives() {
    const initiativesString = localStorage.getItem('initiatives');
    
    const initiatives = JSON.parse(initiativesString);
    
    return initiatives || [];
}

//Função para mostrar as iniciativas a que o utilizador não está associado
function displayAndSetStatusUserInitiatives() {
    const userInitiatives = getUserInitiatives();
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    const associateTableBody = document.querySelector('#example tbody');
    associateTableBody.innerHTML = ''; 

    userInitiatives.forEach((initiative, index) => {
        if (initiative.status === 'aprovada') { // Check if initiative is approved
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${initiative.name}</td>
                <td>${initiative.type}</td>
                <td>${getProponentName(initiative.userEmail)}</td>
                <td>${initiative.date}</td>
                <td class="status-column"><button class="btn-associar text-white" data-index="${index}"><strong>Associar</strong></button></td>
                <td style="cursor: pointer;"> ↓</td>
            `;
        
        const hiddenRowHtml = generateHiddenRow(initiative);

        if (initiative.userEmail !== userData.email && !initiative.associatedVolunteers.includes(userData.email)) {
            associateTableBody.appendChild(row);
            associateTableBody.insertAdjacentHTML('beforeend', hiddenRowHtml);
        }
        }
    });
}

//Chama a função displayAndSetStatusUserInitiatives() e faz a lógica de associar email a iniciativa
document.addEventListener('DOMContentLoaded', function() {
    displayAndSetStatusUserInitiatives();

    const associateButtons = document.querySelectorAll('.btn-associar');
    associateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.index; 
            const email = JSON.parse(localStorage.getItem('userData')).email; 
            
            const initiatives = getUserInitiatives();
            
            if (index >= 0 && index < initiatives.length) {
                const initiative = initiatives[index];
                
                if (!initiative.associatedVolunteers.includes(email)) {
                    initiative.associatedVolunteers.push(email);
                    
                    localStorage.setItem('initiatives', JSON.stringify(initiatives));
                    
                    displayAndSetStatusUserInitiatives();
                } else {
                    console.log('Utilizador já está associado à iniciativa.');
                }
            } else {
                console.log('Invalid index.');
            }
        });
    });
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