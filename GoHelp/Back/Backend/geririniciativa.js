// Função para obter o nome do proponente com base no email
function getProponentName(email) {
    const users = JSON.parse(localStorage.getItem('usersData'));
    const user = users.find(user => user.email === email);
    return user ? user.name : 'Utilizador Desconhecido';
}

// Função para adicionar uma linha na tabela
function adicionarLinha(initiative) {
    var tabela = document.querySelector('#example tbody');
    var novaLinha = createRowHTML(initiative); 
    tabela.innerHTML += novaLinha;
    attachQuantityControlEvents(document);
}

// Função auxiliar para criar o HTML do input de quantidade com botões de incrementar e decrementar
function createQuantityControlHTML() {
    return `
        <div class="input-group" style="width: 80px;">
            <input type="number" class="form-control material-quantity" min="1" value="1"/>
            <div class="input-group-append justify-content-end">
         
            </div>
        </div>`;
}

// Função para criar o HTML da linha usando funções modularizadas
function createRowHTML(initiative) {
    var materiaisHTML = createMaterialsDropdown(initiative.id);
    var profissionaisHTML = createProfessionalsDropdown();
    var quantidadeControlHTML = createQuantityControlHTML();
    var lideresDropdownHTML = createLeadersDropdown();

    return `
    <tr onclick="this.nextSibling.style.display = this.nextSibling.style.display === 'none' ? 'table-row' : 'none';">
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
                                ${lideresDropdownHTML}
                            </select>
                        </div>
                        <div class="min-width-cell" style="margin-right: 20px; padding: 10px;">
                            <p>Id. Voluntário</p>
                            <h6 class="mt-3">${initiative.name}</h6>
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
                    <form id="profissional-form">
                        <div class="profissional-container">
                            <div class="form-row align-items-center profissional-row">
                                <div class="col-sm-6 my-1">
                                    <label class="sr-only" for="materialDropdown">Associar Profissional</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend"></div>
                                        ${profissionaisHTML}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-12">
                    <form id="materials-form-${initiative.id}">
                        <div class="materials-container" id="materials-container-${initiative.id}">
                            <div class="form-row align-items-center material-row">
                                <div class="col-sm-6 my-1">
                                    <label class="sr-only" for="materialDropdown">Material</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend"></div>
                                        ${materiaisHTML}
                                    </div>
                                </div>
                                <div class="col-sm-6 my-1">
                                    <label class="sr-only" for="quantityDropdown">Quantidade</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend"></div>
                                        ${quantidadeControlHTML}
                                        <button type="button" class="btn btn-link add-material-button" onclick="addMaterialFields(${initiative.id})">
                                            <i class="mdi mdi-plus-circle-outline mr-2"></i> Adicionar Material
                                        </button>
                                    </div>
                                </div>
                            </div>
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
}

// Função auxiliar para criar o dropdown de materiais
function createMaterialsDropdown(initiativeId) {
    var materiaisData = JSON.parse(localStorage.getItem('materials'));
    var materiaisHTML = '<select class="custom-select material-dropdown">';
    materiaisHTML += '<option value="">Selecione um material</option>';
    if (Array.isArray(materiaisData)) {
        materiaisData.forEach(material => {
            materiaisHTML += `<option value="${material.nome}" data-max-quantity="${material.quantidade}">${material.nome}</option>`;
        });
    }
    materiaisHTML += '</select>';
    return materiaisHTML;
}

// Função auxiliar para criar o dropdown de profissionais
function createProfessionalsDropdown() {
    var profissionaisData = JSON.parse(localStorage.getItem('profissionais'));
    var profissionaisHTML = '<select class="form-control">';
    if (Array.isArray(profissionaisData)) {
        profissionaisData.forEach(profissional => {
            profissionaisHTML += `<option value="${profissional.nome}">${profissional.nome}</option>`;
        });
    }
    profissionaisHTML += '</select>';
    return profissionaisHTML;
}

// Função auxiliar para criar o dropdown de líderes
function createLeadersDropdown() {
    var usersData = JSON.parse(localStorage.getItem('usersData'));
    var lideresDropdownHTML = '';
    if (Array.isArray(usersData)) {
        usersData.forEach(user => {
            lideresDropdownHTML += `<option>${user.name}</option>`;
        });
    }
    return lideresDropdownHTML;
}

// Função para adicionar campos de material
function addMaterialFields(initiativeId) {
    var materiaisContainer = document.getElementById(`materials-container-${initiativeId}`);
    var materialRowHTML = `
    <div class="form-row align-items-center material-row">
        <div class="col-sm-6 my-1">
            <label class="sr-only" for="materialDropdown">Material</label>
            <div class="input-group">
                <div class="input-group-prepend"></div>
                ${createMaterialsDropdown(initiativeId)}
            </div>
        </div>
        <div class="col-sm-6 my-1">
            <label class="sr-only" for="quantityDropdown">Quantidade</label>
            <div class="input-group">
                <div class="input-group-prepend"></div>
                ${createQuantityControlHTML()}
                <button type="button" class="btn btn-link remove-material-button" onclick="removeMaterialFields(this)">
            <i class="mdi mdi-minus-circle-outline mr-2"></i> Remover Material
        </button>
            </div>
        </div>
    </div>`;
    materiaisContainer.insertAdjacentHTML('beforeend', materialRowHTML);
    attachQuantityControlEvents(materiaisContainer);
}

// Função para remover campos de material
function removeMaterialFields(button) {
    button.closest('.material-row').remove();
}

// Função para anexar eventos de controle de quantidade
function attachQuantityControlEvents(container) {
    container.querySelectorAll('.material-dropdown').forEach(dropdown => {
        dropdown.addEventListener('change', function() {
            var maxQuantity = this.options[this.selectedIndex].getAttribute('data-max-quantity');
            var quantityInput = this.closest('.material-row').querySelector('.material-quantity');
            quantityInput.max = maxQuantity;
            if (quantityInput.value > maxQuantity) {
                quantityInput.value = maxQuantity;
            }
        });
    });

    container.querySelectorAll('.increment-quantity').forEach(button => {
        button.addEventListener('click', function() {
            var quantityInput = this.closest('.input-group').querySelector('.material-quantity');
            var maxQuantity = quantityInput.max;
            if (parseInt(quantityInput.value) < parseInt(maxQuantity)) {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            }
        });
    });

    container.querySelectorAll('.decrement-quantity').forEach(button => {
        button.addEventListener('click', function() {
            var quantityInput = this.closest('.input-group').querySelector('.material-quantity');
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
    });
}

// Evento para adicionar linhas ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const dadosIniciativas = JSON.parse(localStorage.getItem('initiatives'));
    if (dadosIniciativas) {
        dadosIniciativas.forEach(initiative => {
            adicionarLinha(initiative);
        });
    }
});
