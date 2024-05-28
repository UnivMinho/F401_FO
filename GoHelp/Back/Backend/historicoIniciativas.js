document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userProfileImage = userData.profileImage || userData.imageUrl;
    document.getElementById('user-profile-image-navbar').src = userProfileImage;
});

document.addEventListener('DOMContentLoaded', function() {
    function loadCompletedInitiativesFromLocalStorage() {
        let initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
        let tableBody = document.querySelector('#example tbody');
        tableBody.innerHTML = '';

        initiatives.forEach(initiative => {
            if (initiative.status === "Concluída") {
                // Garantir que associatedVolunteers seja um array
                initiative.associatedVolunteers = initiative.associatedVolunteers || [];

                let mainRow = document.createElement('tr');
                mainRow.setAttribute('onclick', 'this.nextSibling.style.display = this.nextSibling.style.display === "none" ? "table-row" : "none";');
                mainRow.innerHTML = `
                    <td>${initiative.name}</td>
                    <td>${initiative.type}</td>
                    <td>${initiative.lider}</td>
                    <td>${initiative.status}</td>
                    <td>${initiative.date}</td>
                    <td style="cursor: pointer;">↓</td>
                `;

                let detailRow = document.createElement('tr');
                detailRow.style.display = 'none';
                detailRow.innerHTML = `
                    <td colspan="8" class="row-bg">
                        <div style="padding:5px;">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex mb-2 p-8" style="gap: 20px;">
                                    <div class="mr-2 min-width-cell" style="margin-right: 20px; padding: 10px;">
                                        <p>Localização</p>
                                        <h6>${initiative.location}</h6>
                                    </div>
                                    <div class="min-width-cell" style="margin-right: 20px; padding: 10px;">
                                        <p>Tipo de iniciativa</p>
                                        <h6>${initiative.type}</h6>
                                    </div>
                                    <div class="min-width-cell" style="margin-right: 20px; padding: 10px;">
                                        <p>Líder</p>
                                        <h6>${initiative.lider}</h6>
                                    </div>
                                    <div class="min-width-cell" style="margin-right: 20px; padding: 10px;">
                                        <p>Id. Voluntário</p>
                                        <h6>${initiative.id}</h6>
                                    </div>
                                    <div class="min-width-cell" style="padding: 10px;">
                                        <p>E-mail Voluntário</p>
                                        <h6 style="margin-bottom: 3px;">${initiative.userEmail}</h6>
                                    </div>
                                </div>
                                <div class="expanded-table-normal-cell">
                                <p>Descrição</p>
                                <h6>${initiative.description}</h6>
                                <p>Observação</p>
                                <h6>${initiative.comments}</h6>
                                
                                </div> 
                            </div>
                        </div>

                        <div style="display: flex; width: 100%; overflow-x: auto; margin-bottom: 40px; background-color: white;">
                            <table class="table scrollable-table" style="max-height: 116px; overflow-y: auto; flex: 1 1 auto; margin-right: 10px; background-color: white;">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Quantidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${initiative.materiais.map(material => `
                                        <tr>
                                            <td>${material.nome}</td>
                                            <td>${material.quantidade}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                            <table class="table" style="flex: 1 1 auto; margin-right: 10px;">
                                <thead>
                                    <tr>
                                        <th>Profissional</th>
                                        <th>Cargo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${initiative.profissional.nome}</td>
                                        <td>${initiative.profissional.cargo}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table" style="flex: 1 1 auto;">
                                <thead>
                                    <tr>
                                        <th>E-mail do Voluntário</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${initiative.associatedVolunteers.length > 0 ? 
                                        initiative.associatedVolunteers.map(email => `
                                            <tr>
                                                <td>${email}</td>
                                            </tr>
                                        `).join('') : 
                                        '<tr><td>Nenhum voluntário associado</td></tr>'
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div class="cell-hilighted text-white">
                            <div class="d-flex mb-2">
                                <div class="mr-5 min-width-cell">
                                    <p>Número de Voluntários</p>
                                    <h6>${initiative.volunteers}</h6>
                                </div>
                                <div class="min-width-cell mr-3">
                                    <p>Data Inicial</p>
                                    <h6>${initiative.date} - ${initiative.start_hour}</h6>
                                </div>
                                <div class="min-width-cell ml-5">
                                    <p>Data Final</p>
                                    <h6>${initiative.date} - ${initiative.end_hour}</h6>
                                </div>
                                <div class="min-width-cell ml-5">
                                
                                </div>
                            </div>
                        </div>                                                                                                                        
                    </td>
                `;
                tableBody.appendChild(mainRow);
                tableBody.appendChild(detailRow);
                console.log('Initiative:', initiative);
console.log('Associated Volunteers:', initiative.associatedVolunteers);

            }
        });
    }

    loadCompletedInitiativesFromLocalStorage();
});

document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('example');
  
    // Adding event listener to the table
    table.addEventListener('click', function (e) {
        // Check if the clicked element is a cell in the last column
        const target = e.target;
        if (target.tagName === 'TD' && target.cellIndex === 5) {
            const detailsRow = target.parentElement.nextElementSibling; // Get the next sibling row which holds the details
            // Toggle the display of the details row
            detailsRow.style.display = detailsRow.style.display === 'none' ? 'table-row' : 'none';
        }
    });
});
