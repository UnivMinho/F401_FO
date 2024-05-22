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


// Função para criar uma linha de iniciativa com IDs únicos para dropdowns
function createRowHTML(initiative) {
    const materiaisHTML = createMaterialsContainerHTML(initiative.id, initiative.materiais || []);
    const profissionaisHTML = createProfessionalsDropdown(initiative.id);
    const lideresDropdownHTML = createLeadersDropdown(initiative.id, initiative.lider);

    return `
    <tr>
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
                            ${lideresDropdownHTML}
                        </div>
                        <div class="min-width-cell" style="margin-right: 20px; padding: 10px;">
                            <p>Id. Voluntário</p>
                            <h6 class="mt-3">${getProponentName(initiative.userEmail)}</h6>
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
                            ${materiaisHTML}
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
                            <button class="btn btn-danger" onclick="recusarIniciativa(${initiative.id})">Recusar</button>
                            <button class="btn btn-success" onclick="aprovarIniciativa(this)">Aprovar</button>
                        </div>
                    </div>
                </div>
            </div>
        </td>
    </tr>`;
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

// Função auxiliar para criar o dropdown de profissionais com ID único
function createProfessionalsDropdown(initiativeId) {
    const profissionaisData = JSON.parse(localStorage.getItem('profissionais'));
    let profissionaisHTML = `<select id="profissionalDropdown-${initiativeId}" class="profissional-dropdown form-control">`;
    if (Array.isArray(profissionaisData)) {
        profissionaisData.forEach(profissional => {
            profissionaisHTML += `<option value="${profissional.nome}">${profissional.nome}</option>`;
        });
    }
    profissionaisHTML += '</select>';
    return profissionaisHTML;
}

// Função auxiliar para criar o dropdown de líderes com ID único
function createLeadersDropdown(initiativeId, selectedLeader) {
    const usersData = JSON.parse(localStorage.getItem('usersData'));
    let lideresDropdownHTML = `<select id="liderDropdown-${initiativeId}" class="custom-select">`;
    lideresDropdownHTML += '<option selected>Selecione</option>';
    if (Array.isArray(usersData)) {
        usersData.forEach(user => {
            lideresDropdownHTML += `<option value="${user.name}" ${user.name === selectedLeader ? 'selected' : ''}>${user.name}</option>`;
        });
    }
    lideresDropdownHTML += '</select>';
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

// Função para alternar a exibição da linha de detalhes
function toggleDetailsRow(button) {
    const detailsRow = button.parentElement.nextElementSibling;
    detailsRow.style.display = detailsRow.style.display === 'none' ? 'table-row' : 'none';
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
        const profissionalDropdown = detailsRow.querySelector(`#profissionalDropdown-${initiative.id}`);

        if (!liderDropdown) {
            console.error(`Elemento liderDropdown com ID #liderDropdown-${initiative.id} não encontrado.`);
            return;
        }
        
        if (!profissionalDropdown) {
            console.error(`Elemento profissionalDropdown com ID #profissionalDropdown-${initiative.id} não encontrado.`);
            return;
        }

      
        initiative.status = 'aprovada';
        initiative.lider = liderDropdown.value;
        initiative.profissional = profissionalDropdown.value;

        const materiais = [];
        detailsRow.querySelectorAll('.material-row').forEach(materialRow => {
            const materialDropdown = materialRow.querySelector('.material-dropdown');
            const quantidadeInput = materialRow.querySelector('.material-quantity');
            if (materialDropdown && quantidadeInput && materialDropdown.value) {
                materiais.push({
                    nome: materialDropdown.value,
                    quantidade: quantidadeInput.value
                });
            }
        });
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
            location.reload(); // Atualizar a página para refletir as mudanças
        }
    } else {
        alert('Por favor, escreva o motivo da recusa.');
    }
}




// Função para alternar a exibição da linha de detalhes
function toggleDetailsRow(button) {
    const detailsRow = button.parentElement.nextElementSibling;
    detailsRow.style.display = detailsRow.style.display === 'none' ? 'table-row' : 'none';
}
 
// Função para atualizar as quantidades de materiais para iniciativas com estado "A decorrer"
function atualizarQuantidadesMateriaisHoje() {
    const hoje = new Date().toLocaleDateString();
    const iniciativas = JSON.parse(localStorage.getItem('initiatives')) || [];
    const materiaisData = JSON.parse(localStorage.getItem('materials')) || [];

    iniciativas.forEach(initiative => {
        if (initiative.status === 'A decorrer' && initiative.date === hoje) {
            initiative.materiais.forEach(materialUtilizado => {
                const material = materiaisData.find(m => m.nome === materialUtilizado.nome);
                if (material) {
                    material.quantidadeTerreno = (material.quantidadeTerreno || 0) + parseInt(materialUtilizado.quantidade);
                    material.quantidade -= parseInt(materialUtilizado.quantidade);
                }
            });
        }
    });

    localStorage.setItem('materials', JSON.stringify(materiaisData));
}

// Evento para atualizar as quantidades de materiais ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    atualizarQuantidadesMateriaisHoje();
});

// Função para reverter as quantidades de materiais para o dia seguinte
function reverterQuantidadesMateriaisDiaSeguinte() {
    const materiaisData = JSON.parse(localStorage.getItem('materials')) || [];

    materiaisData.forEach(material => {
        if (material.quantidadeTerreno) {
            material.quantidade += material.quantidadeTerreno;
            material.quantidadeTerreno = 0;
        }
    });

    localStorage.setItem('materials', JSON.stringify(materiaisData));
}

// Função para verificar e atualizar quantidades ao carregar a página
function verificarAtualizacaoDiaria() {
    const hoje = new Date().toLocaleDateString();
    const ultimaAtualizacao = localStorage.getItem('ultimaAtualizacao');

    if (ultimaAtualizacao !== hoje) {
        atualizarQuantidadesMateriaisHoje();
        localStorage.setItem('ultimaAtualizacao', hoje);
    }
}

// Agendar a execução das funções ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    verificarAtualizacaoDiaria();

    // Agendar a reversão das quantidades de materiais ao final do dia
    const agora = new Date();
    const proximaMeiaNoite = new Date(agora);
    proximaMeiaNoite.setHours(24, 0, 0, 0); // Próxima meia-noite
    const tempoAteMeiaNoite = proximaMeiaNoite - agora;

    setTimeout(function() {
        reverterQuantidadesMateriaisDiaSeguinte();
        verificarAtualizacaoDiaria(); // Para garantir que as quantidades sejam atualizadas novamente após a reversão
    }, tempoAteMeiaNoite);
});

// Função para atualizar o estado das iniciativas para "A decorrer" se a data atual corresponder à data da iniciativa
function atualizarEstadoIniciativasHoje() {
    const hoje = new Date().toLocaleDateString();
    const iniciativas = JSON.parse(localStorage.getItem('initiatives')) || [];

    iniciativas.forEach(initiative => {
        if (initiative.date === hoje) {
            initiative.status = 'A decorrer';
        }
    });

    localStorage.setItem('initiatives', JSON.stringify(iniciativas));
}

// Evento para atualizar o estado das iniciativas ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    atualizarEstadoIniciativasHoje();
});





document.addEventListener('DOMContentLoaded', function() {
    const novaIniciativa = {
        id: Date.now(), // Gera um ID único com base na data atual
        description: 'Nova Iniciativa de Teste',
        type: 'Tipo de Teste',
        userEmail: 'teste@exemplo.com',
        status: 'pendente',
        location: 'Localização de Teste',
        lider: '',
        comments: 'Comentários de Teste',
        volunteers: 5,
        date: new Date().toLocaleDateString(),
        start_hour: '09:00',
        end_hour: '17:00',
        restrictions: 'Sem restrições',
        materiais: [],
        profissional: ''
    };

    // Adiciona a nova iniciativa ao localStorage
    const iniciativas = JSON.parse(localStorage.getItem('initiatives')) || [];
    iniciativas.push(novaIniciativa);
    localStorage.setItem('initiatives', JSON.stringify(iniciativas));

    // Adiciona a nova linha na tabela
    adicionarLinha(novaIniciativa);
});