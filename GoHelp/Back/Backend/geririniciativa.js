document.addEventListener('DOMContentLoaded', function() {
    function adicionarLinha(initiative) {
        var tabela = document.querySelector('#example tbody');

        // Busca dados de materiais e profissionais no localStorage
        var materiaisData = JSON.parse(localStorage.getItem('materials'));
        var profissionaisData = JSON.parse(localStorage.getItem('profissionais'));

        // Cria dropdown de materiais
        var materiaisHTML = '<select class="custom-select material-dropdown" onchange="updateMaxQuantity(this)">';
        materiaisHTML += '<option value="">Selecione um material</option>';
        if (Array.isArray(materiaisData)) {
            materiaisData.forEach(material => {
                materiaisHTML += `<option value="${material.nome}" data-quantidade="${material.quantidade}">${material.nome}</option>`;
            });
        }
        materiaisHTML += '</select>';

        // Campo para inserir a quantidade
        var quantidadeHTML = '<input type="number" class="form-control material-quantity" min="1" value="1" />';

        // Cria dropdown de profissionais
        var profissionaisHTML = '<select class="form-control">';
        if (Array.isArray(profissionaisData)) {
            profissionaisData.forEach(profissional => {
                profissionaisHTML += `<option value="${profissional.nome}">${profissional.nome}</option>`;
            });
        }
        profissionaisHTML += '</select>';

        var lideresDropdownHTML = '';
        var usersData = JSON.parse(localStorage.getItem('usersData'));
        
        // Verifica se o localStorage contém dados de usuários
        if (Array.isArray(usersData)) {
            usersData.forEach(user => {
                lideresDropdownHTML += `<option>${user.name}</option>`;
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
                                    <form id="materials-form">
                                        <div class="materials-container">
                                            <div class="form-row align-items-center material-row">
                                                <div class="col-sm-6 my-1">
                                                    <label class="sr-only" for="materialDropdown">Material</label>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            
                                                        </div>
                                                        ${materiaisHTML}
                                                    </div>
                                                </div>
                                                <div class="col-sm-6 my-1">
                                                    <label class="sr-only" for="quantityDropdown">Quantidade</label>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            
                                                        </div>
                                                        ${quantidadeHTML}
                                                    </div>
                                                </div>
                                                
                                                  <button type="button" class="btn btn-link add-material-button">
                                                    <i class="mdi mdi-plus-circle-outline mr-2"></i> Adicionar Material
                                                  </button>
                                              
                                            </div>
                                        </div>
                                        
                                    </form>
                                </div>
                                    
                                <div class="col-12">
                                <form id="materials-form">
                                    <div class="profissional-container">
                                        <div class="form-row align-items-center profissional-row">
                                            <div class="col-sm-6 my-1">
                                                <label class="sr-only" for="materialDropdown">Associar Profissional</label>
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        
                                                    </div>
                                                    ${profissionaisHTML}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                        <button type="button" class="btn btn-link add-profissional-button">
                                          <i class="mdi mdi-account-plus mr-2"></i> Adicionar Profissional
                                        </button>
                                    
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

    // Chamando a função adicionarLinha() quando o DOM estiver pronto
    // Você deve ter o código que chama a função adicionarLinha() em algum lugar



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

    // Função para atualizar a quantidade máxima baseada no material selecionado
    window.updateMaxQuantity = function(selectElement) {
        var quantidade = selectElement.options[selectElement.selectedIndex].dataset.quantidade;
        var inputQuantity = selectElement.closest('.material-container').querySelector('.material-quantity');
        inputQuantity.max = quantidade;
    }