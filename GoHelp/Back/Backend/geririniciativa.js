document.addEventListener('DOMContentLoaded', function() {
    function adicionarLinha(initiative) {
        var tabela = document.querySelector('#example tbody');
        var materiaisHTML = '';
        
        // Verifica se a lista de materiais existe e é uma array antes de iterar
        if (Array.isArray(initiative.materiais)) {
            initiative.materiais.forEach(material => {
                materiaisHTML += `<div class="col-sm-6 my-1">
                                    <div class="input-group">
                                        <div class="input-group-prepend"></div>
                                        <input type="text" class="form-control" value="${material.nome} - Quantidade: ${material.quantidade}" readonly>
                                    </div>
                                  </div>`;
            });
        }

        var profissionaisHTML = '';
        
        // Verifica se a lista de profissionais existe e é uma array antes de iterar
        if (Array.isArray(initiative.profissionais)) {
            initiative.profissionais.forEach(profissional => {
                profissionaisHTML += `<div class="col-sm-6 my-1">
                                        <div class="input-group">
                                            <div class="input-group-prepend"></div>
                                            <input type="text" class="form-control" value="${profissional.nome}" readonly>
                                        </div>
                                      </div>`;
            });
        }

        var novaLinha = `<tr onclick="this.nextSibling.style.display = this.nextSibling.style.display === 'none' ? 'table-row' : 'none';">
                            <td>${initiative.description}</td>
                            <td>${initiative.type}</td>
                            <td>${getProponentName(initiative.userEmail)}</td>
                            <td>${initiative.status}</td>
                            <td>${new Date().toLocaleDateString()}</td>
                            <td style="cursor: pointer;">↓</td>
                        </tr>
                        <tr style="display:none;">
                            <td colspan="6" class="row-bg">
                                <div style="padding:5px;">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex mb-2 p-8" style="gap: 20px;">
                                            <div class="mr-2 min-width-cell" style="margin-right: 20px; padding: 10px;">
                                                <p>Localização</p>
                                                <h6 class="mt-3">${initiative.location}</h6>
                                            </div>
                                            <div class="min-width-cell" style="margin-right: 20px; padding: 10px;">
                                                <p>Tipo de iniciativa</p>
                                                <h6 class="mt-3">${initiative.type}</h6>
                                            </div>
                                            <div class="min-width-cell" style="margin-right: 20px; padding: 10px;">
                                                <p>Líder</p>
                                                <select id="liderDropdown" class="custom-select">
                                                    <option selected>Selecione</option>
                                                    <!-- Adicionar mais opções aqui dinamicamente se necessário -->
                                                </select>
                                            </div>
                                            <div class="min-width-cell" style="margin-right: 20px; padding: 10px;">
                                                <p>Id. Voluntário</p>
                                                <h6 class="mt-3">${initiative.userEmail}</h6>
                                            </div>
                                            <div class="min-width-cell" style="padding: 10px;">
                                                <p>E-mail Voluntário</p>
                                                <h6 class="mt-3" style="margin-bottom: 3px;">${initiative.userEmail}</h6>
                                            </div>
                                        </div>
                                        <div class="expanded-table-normal-cell">
                                            <p>Observação</p>
                                            <h6>${initiative.comments}</h6>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <form id="materials-form">
                                            <div class="materials-container">
                                                ${materiaisHTML}
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-12">
                                        <form id="profissionais-form">
                                            <div class="profissional-container">
                                                ${profissionaisHTML}
                                            </div>
                                        </form>
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
                                            <div class="min-width-cell">
                                                <p>Data Final</p>
                                                <h6>${initiative.date} - ${initiative.end_hour}</h6>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="min-width-cell">
                                                <p>Restrições</p>
                                                <h6>${initiative.restrictions}</h6>
                                            </div>
                                            <div class="action-buttons ml-auto">
                                                <button class="btn btn-danger">Recusar</button>
                                                <button class="btn btn-success">Aprovar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>`;
        tabela.innerHTML += novaLinha;
    }

    function getProponentName(email) {
        // Busca o nome do proponente no local storage de usuários
        const users = JSON.parse(localStorage.getItem('usersData'));
        const user = users.find(user => user.email === email);
        return user ? user.name : 'Unknown User';
    }

    // Carrega os dados do Local Storage
    const dadosIniciativas = JSON.parse(localStorage.getItem('initiatives'));
    
    if (dadosIniciativas) {
        dadosIniciativas.forEach(initiative => {
            adicionarLinha(initiative);
        });
    }
});

    window.addMaterial = function(button) {
        var materialsContainer = button.closest('.materials-container');
        var materialRow = materialsContainer.querySelector('.material-row').cloneNode(true);
        materialRow.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
        materialsContainer.appendChild(materialRow);
    };

    window.addProfessional = function(button) {
        var professionalsContainer = button.closest('.profissional-container');
        var professionalRow = professionalsContainer.querySelector('.profissional-row').cloneNode(true);
        professionalRow.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
        professionalsContainer.appendChild(professionalRow);
    };
