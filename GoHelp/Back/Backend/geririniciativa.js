// Função para obter o nome do proponente com base no email
function getProponentName(email) {
    const users = JSON.parse(localStorage.getItem('usersData'));
    const user = users.find(user => user.email === email);
    return user ? user.name : 'Utilizador Desconhecido';
}

// Função para adicionar uma linha na tabela
function adicionarLinha(initiative) {
    const tabela = document.querySelector('#example tbody');
    const novaLinha = createRowHTML(initiative);
    tabela.innerHTML += novaLinha;
    attachQuantityControlEvents(document);
}

// Função auxiliar para criar o HTML do input de quantidade com botões de incrementar e decrementar
// Função auxiliar para criar o HTML do input de quantidade com botões de incrementar e decrementar
function createQuantityControlHTML(initiativeId, materialId) {
    return `
        <div class="input-group" style="width: 80px;">
            <input type="number" class="form-control material-quantity" id="quantity-${initiativeId}-${materialId}" min="1" value="1"/>
        </div>`;
}

// Função para criar uma linha de material
function createMaterialRowHTML(initiativeId, selectedMaterials = []) {
    const materialId = selectedMaterials.length;
    return `
    <div class="form-row align-items-center material-row" id="material-row-${initiativeId}-${materialId}">
        <div class="col-sm-6 my-1">
            <label class="sr-only" for="materialDropdown-${initiativeId}-${materialId}">Material</label>
            <div class="input-group">
                ${createMaterialsDropdown(initiativeId, selectedMaterials, materialId)}
            </div>
        </div>
        <div class="col-sm-6 my-1">
            <label class="sr-only" for="quantity-${initiativeId}-${materialId}">Quantidade</label>
            <div class="input-group">
                ${createQuantityControlHTML(initiativeId, materialId)}
                <button type="button" class="btn btn-link add-material-button" onclick="addMaterialFields(${initiativeId}, this)">
                    <i class="mdi mdi-plus-circle-outline mr-2"></i> Adicionar Material
                </button>
            </div>
        </div>
    </div>`;
}


function createRowHTML(initiative) {
    const profissionaisHTML = createProfessionalsDropdown(initiative.professional);
    const lideresDropdownHTML = createLeadersDropdown(initiative.lider);
    const restricoesHTML = initiative.status === 'recusada' ? initiative.rejectReason : initiative.restrictions;

    return `
    <tr data-id="${initiative.id}">
        <td>${initiative.description}</td>
        <td>${initiative.type}</td>
        <td>${getProponentName(initiative.userEmail)}</td>
        <td>${initiative.status}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td style="cursor: pointer;" onclick="toggleDetailsRow(this)">↓</td>
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
                            <select id="liderDropdown-${initiative.id}" class="custom-select" onchange="saveLeader(${initiative.id}, this.value)">
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
                    <form id="profissional-form-${initiative.id}">
                        <div class="profissional-container">
                            <div class="form-row align-items-center profissional-row">
                                <div class="col-sm-6 my-1">
                                    <label class="sr-only" for="profissionalDropdown-${initiative.id}">Associar Profissional</label>
                                    <div class="input-group">
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
                            <!-- Materiais serão carregados dinamicamente -->
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
                            <div class="restrictions">
                                <h6>${restricoesHTML}</h6>
                            </div>
                        </div>
                        <div class="action-buttons ml-auto">
                            <button class="btn btn-danger" onclick="recusarIniciativa(${initiative.id})">Recusar</button>
                            <button class="btn btn-success" onclick="aprovarIniciativa(this)">Aprovar</button>
                        </div>
                    </div>
                </div>
            </div>
        </td>
    </tr>`;
}


// Função para gerar dropdowns de materiais e quantidade dinamicamente
function loadMaterialsFields(initiativeId) {
    const materialsContainer = document.getElementById(`materials-container-${initiativeId}`);
    if (!materialsContainer) return;

    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const initiative = initiatives.find(i => i.id === parseInt(initiativeId, 10));
    if (!initiative) return;

    const materiaisHTML = createMaterialsContainerHTML(initiative.id, initiative.materiais || []);
    materialsContainer.innerHTML = materiaisHTML;

    // Adicionar eventos de controle de quantidade aos novos elementos
    attachQuantityControlEvents(materialsContainer);
}



// Ajustar a função `toggleDetailsRow` para chamar `loadMaterialsFields`
function toggleDetailsRow(button) {
    const detailsRow = button.parentElement.nextElementSibling;
    const initiativeId = button.parentElement.getAttribute('data-id');

    if (detailsRow.style.display === 'none' || detailsRow.style.display === '') {
        detailsRow.style.display = 'table-row';
        loadMaterialsFields(initiativeId); // Carregar campos de materiais quando a linha de detalhes for expandida
    } else {
        detailsRow.style.display = 'none';
    }
}


// Função para salvar o líder selecionado no localStorage
function saveLeader(initiativeId, leaderName) {
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const initiative = initiatives.find(i => i.id === initiativeId);

    if (initiative) {
        initiative.lider = leaderName;
        localStorage.setItem('initiatives', JSON.stringify(initiatives));
    }
}

// Função auxiliar para criar o dropdown de materiais
function createMaterialsDropdown(initiativeId, selectedMaterials = [], materialId) {
    const materiaisData = JSON.parse(localStorage.getItem('materials'));
    let materiaisHTML = `<select class="custom-select material-dropdown" id="materialDropdown-${initiativeId}-${materialId}">`;
    materiaisHTML += '<option value="">Selecione um material</option>';
    if (Array.isArray(materiaisData)) {
        materiaisData.forEach(material => {
            if (!selectedMaterials.includes(material.nome)) {
                materiaisHTML += `<option value="${material.nome}" data-max-quantity="${material.quantidade}">${material.nome}</option>`;
            }
        });
    }
    materiaisHTML += '</select>';
    return materiaisHTML;
}


// Função auxiliar para criar o dropdown de profissionais
function createProfessionalsDropdown(selectedProfessional = '') {
    const profissionaisData = JSON.parse(localStorage.getItem('profissionais'));
    let profissionaisHTML = '<select class="profissional-dropdown form-control" onchange="saveProfessional(this)">';
    profissionaisHTML += '<option value="">Selecione</option>';
    if (Array.isArray(profissionaisData)) {
        profissionaisData.forEach(profissional => {
            profissionaisHTML += `<option value="${profissional.nome}" ${profissional.nome === selectedProfessional ? 'selected' : ''}>${profissional.nome}</option>`;
        });
    }
    profissionaisHTML += '</select>';
    return profissionaisHTML;
}

// Função para salvar o profissional selecionado no localStorage
function saveProfessional(selectElement) {
    const initiativeId = selectElement.closest('.row-bg').previousElementSibling.dataset.id;
    const selectedProfessional = selectElement.value;
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const initiative = initiatives.find(i => i.id === parseInt(initiativeId, 10));

    if (initiative) {
        initiative.professional = selectedProfessional;
        localStorage.setItem('initiatives', JSON.stringify(initiatives));
    }
}


// Função auxiliar para criar o dropdown de líderes
function createLeadersDropdown(selectedLeader) {
    const usersData = JSON.parse(localStorage.getItem('usersData'));
    let lideresDropdownHTML = '';
    if (Array.isArray(usersData)) {
        usersData.forEach(user => {
            lideresDropdownHTML += `<option value="${user.name}" ${user.name === selectedLeader ? 'selected' : ''}>${user.name}</option>`;
        });
    }
    return lideresDropdownHTML;
}

// Função auxiliar para criar o container de materiais com os materiais já adicionados
function createMaterialsContainerHTML(initiativeId, materiais) {
    let containerHTML = '';
    const selectedMaterials = materiais.map(material => material.nome);

    materiais.forEach((material, index) => {
        containerHTML += `
        <div class="form-row align-items-center material-row" id="material-row-${initiativeId}-${index}">
            <div class="col-sm-6 my-1">
                <label class="sr-only" for="materialDropdown-${initiativeId}-${index}">Material</label>
                <div class="input-group">
                    <select class="custom-select material-dropdown" id="materialDropdown-${initiativeId}-${index}" disabled>
                        <option value="${material.nome}" data-max-quantity="${material.quantidade}" selected>${material.nome}</option>
                    </select>
                </div>
            </div>
            <div class="col-sm-6 my-1">
                <label class="sr-only" for="quantity-${initiativeId}-${index}">Quantidade</label>
                <div class="input-group">
                    ${createQuantityControlHTML(initiativeId, index)}
                    <input type="number" class="form-control material-quantity" id="quantity-${initiativeId}-${index}" min="1" max="${material.quantidade}" value="${material.quantidade}" disabled/>
                    <button type="button" class="btn btn-link remove-material-button" onclick="removeMaterialFields(${initiativeId}, this)">
                        <i class="mdi mdi-minus-circle-outline mr-2"></i> Remover Material
                    </button>
                </div>
            </div>
        </div>`;
    });

    containerHTML += createMaterialRowHTML(initiativeId, selectedMaterials);
    return containerHTML;
}


// Função para adicionar campos de material
// Função para adicionar campos de material
function addMaterialFields(initiativeId, button) {
    const materialRow = button.closest('.material-row');
    const materiaisContainer = materialRow.closest('.materials-container');
    const materialDropdown = materialRow.querySelector('.material-dropdown');
    const selectedMaterial = materialDropdown.value;
    const quantidadeInput = materialRow.querySelector('.material-quantity');
    const materialId = materialRow.id.split('-').pop(); // Extrai o ID do material

    if (selectedMaterial && quantidadeInput.value > 0) {
        materialDropdown.disabled = true;
        quantidadeInput.disabled = true;
        button.outerHTML = `
            <button type="button" class="btn btn-link remove-material-button" onclick="removeMaterialFields(${initiativeId}, this)">
                <i class="mdi mdi-minus-circle-outline mr-2"></i> Remover Material
            </button>`;

        const selectedMaterials = Array.from(materiaisContainer.querySelectorAll('.material-dropdown'))
            .filter(dropdown => dropdown.disabled)
            .map(dropdown => dropdown.value);

        const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
        const initiative = initiatives.find(i => i.id === initiativeId);

        if (initiative) {
            initiative.materiais = initiative.materiais || [];
            initiative.materiais.push({
                nome: selectedMaterial,
                quantidade: quantidadeInput.value
            });
            localStorage.setItem('initiatives', JSON.stringify(initiatives));
        }

        // Criar um novo campo de material
        const newMaterialRowHTML = createMaterialRowHTML(initiativeId, selectedMaterials);
        materiaisContainer.insertAdjacentHTML('beforeend', newMaterialRowHTML);

        // Adicionar eventos de controle de quantidade aos novos elementos
        attachQuantityControlEvents(materiaisContainer);
    } else {
        alert('Por favor, selecione um material e insira uma quantidade válida.');
    }
}
// Função para remover campos de material
function removeMaterialFields(initiativeId, button) {
    const materialRow = button.closest('.material-row');
    const materialDropdown = materialRow.querySelector('.material-dropdown');
    const selectedMaterial = materialDropdown.value;

    materialRow.remove();

    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const initiative = initiatives.find(i => i.id === initiativeId);

    if (initiative) {
        initiative.materiais = initiative.materiais.filter(material => material.nome !== selectedMaterial);
        localStorage.setItem('initiatives', JSON.stringify(initiatives));
    }

    const materiaisContainer = document.getElementById(`materials-container-${initiativeId}`);
    const selectedMaterials = Array.from(materiaisContainer.querySelectorAll('.material-dropdown'))
        .filter(dropdown => dropdown.disabled)
        .map(dropdown => dropdown.value);

    const newRowHTML = createMaterialRowHTML(initiativeId, selectedMaterials);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newRowHTML;
    const newRow = tempDiv.firstChild;

    materiaisContainer.appendChild(newRow);
    attachQuantityControlEvents(materiaisContainer);
}

// Função para anexar eventos de controle de quantidade
function attachQuantityControlEvents(container) {
    container.querySelectorAll('.material-dropdown').forEach(dropdown => {
        dropdown.addEventListener('change', function() {
            const maxQuantity = this.options[this.selectedIndex].getAttribute('data-max-quantity');
            const quantityInput = this.closest('.material-row').querySelector('.material-quantity');
            quantityInput.max = maxQuantity;
            if (quantityInput.value > maxQuantity) {
                quantityInput.value = maxQuantity;
            }
        });
    });

    container.querySelectorAll('.increment-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const quantityInput = this.closest('.input-group').querySelector('.material-quantity');
            const maxQuantity = quantityInput.max;
            if (parseInt(quantityInput.value) < parseInt(maxQuantity)) {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            }
        });
    });

    container.querySelectorAll('.decrement-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const quantityInput = this.closest('.input-group').querySelector('.material-quantity');
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

// Função para aprovar uma iniciativa
function aprovarIniciativa(button) {
    const row = button.closest('tr').previousElementSibling;

    if (!row || !row.cells || row.cells.length === 0) {
        console.error("Não foi possível obter a linha da iniciativa.");
        return;
    }

    const initiativeDescription = row.cells[0].innerText;

    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const initiative = initiatives.find(i => i.description === initiativeDescription);

    if (initiative) {
        const detailsRow = row.nextElementSibling;

        if (!detailsRow || !detailsRow.querySelector) {
            console.error("Não foi possível obter a linha de detalhes da iniciativa.");
            return;
        }

        const liderDropdown = detailsRow.querySelector(`#liderDropdown-${initiative.id}`);
        const profissionalDropdown = detailsRow.querySelector('.profissional-dropdown');

        if (!liderDropdown || !profissionalDropdown) {
            console.error("Não foi possível encontrar os elementos de dropdown.");
            return;
        }

        const selectedLeader = liderDropdown.value;
        const selectedProfessional = profissionalDropdown.value;

        if (selectedLeader === "Selecione" || selectedProfessional === "Selecione") {
            alert("Por favor, selecione um líder e um profissional.");
            return;
        }

        initiative.status = 'Aprovada';
        initiative.lider = selectedLeader;
        initiative.professional = selectedProfessional;

        const materiais = [];
        let allMaterialsValid = true;
        detailsRow.querySelectorAll('.material-row').forEach(materialRow => {
            const materialDropdown = materialRow.querySelector('.material-dropdown');
            const quantidadeInput = materialRow.querySelector('.material-quantity');
            if (materialDropdown && quantidadeInput && materialDropdown.value && quantidadeInput.value > 0) {
                materiais.push({
                    nome: materialDropdown.value,
                    quantidade: quantidadeInput.value
                });
            } else {
                allMaterialsValid = false;
            }
        });

        if (!allMaterialsValid) {
            alert("Por favor, preencha todos os campos de materiais.");
            return;
        }

        initiative.materiais = materiais;

        localStorage.setItem('initiatives', JSON.stringify(initiatives));

        row.cells[3].innerText = 'aprovada';
    } else {
        console.error("Iniciativa não encontrada.");
    }
}


// Função para recusar uma iniciativa com motivo
function recusarIniciativa(initiativeId) {
    const reason = prompt("Por favor, escreva o motivo da recusa:");
    if (reason) {
        const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
        const initiative = initiatives.find(i => i.id === initiativeId);

        if (initiative) {
            initiative.status = 'recusada';
            initiative.rejectReason = reason;

            localStorage.setItem('initiatives', JSON.stringify(initiatives));

            // Atualizar a linha na tabela sem recarregar a página
            const row = document.querySelector(`tr[data-id='${initiativeId}']`);
            if (row) {
                const detailsRow = row.nextElementSibling;
                row.cells[3].innerText = 'recusada';

                const restricoesCell = detailsRow.querySelector('.restrictions');
                if (restricoesCell) {
                    restricoesCell.innerHTML = `<h6>${reason}</h6>`;
                }
            }
        }
    } else {
        alert('Por favor, escreva o motivo da recusa.');
    }
}



// Verificar e bloquear materiais diariamente
document.addEventListener('DOMContentLoaded', function() {
    bloquearMateriais();
    setInterval(bloquearMateriais, 86400000); // Verificar diariamente
});

// Função para bloquear materiais no dia de início da iniciativa
function bloquearMateriais() {
    const iniciativas = JSON.parse(localStorage.getItem('initiatives')) || [];
    const hoje = new Date().toLocaleDateString();

    iniciativas.forEach(initiative => {
        if (initiative.status === 'aprovada' && initiative.date === hoje) {
            initiative.materiais.forEach(material => {
                const materialData = JSON.parse(localStorage.getItem('materials')) || [];
                const materialItem = materialData.find(m => m.nome === material.nome);
                if (materialItem) {
                    materialItem.quantidade -= material.quantidade;
                }
                localStorage.setItem('materials', JSON.stringify(materialData));
            });
        }
    });
};


