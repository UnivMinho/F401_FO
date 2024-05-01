document.addEventListener('DOMContentLoaded', function() {
    function adicionarLinha(dados) {
        var tabela = document.querySelector('#example tbody');
        var materiaisHTML = '';
        dados.materiais.forEach(material => {
            materiaisHTML += `<div class="col-sm-6 my-1">
                                <div class="input-group">
                                    <div class="input-group-prepend"></div>
                                    <input type="text" class="form-control" value="${material.nome} - Quantidade: ${material.quantidade}" readonly>
                                </div>
                              </div>`;
        });

        var profissionaisHTML = '';
        dados.profissionais.forEach(profissional => {
            profissionaisHTML += `<div class="col-sm-6 my-1">
                                    <div class="input-group">
                                        <div class="input-group-prepend"></div>
                                        <input type="text" class="form-control" value="${profissional.nome}" readonly>
                                    </div>
                                  </div>`;
        });

        var novaLinha = `<tr onclick="this.nextSibling.style.display = this.nextSibling.style.display === 'none' ? 'table-row' : 'none';">
                            <td>${dados.descricao}</td>
                            <td>${dados.tipoIniciativa}</td>
                            <td>${dados.proponente}</td>
                            <td>${dados.estado}</td>
                            <td>${dados.ultimaAtualizacao}</td>
                            <td style="cursor: pointer;">↓</td>
                        </tr>
                        <tr style="display:none;">
                            <td colspan="6" class="row-bg">
                                <div style="padding:5px;">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex mb-2 p-8" style="gap: 20px;">
                                            <div class="mr-2 min-width-cell" style="margin-right: 20px; padding: 10px;">
                                                <p>Localização</p>
                                                <h6 class="mt-3">${dados.localizacao}</h6>
                                            </div>
                                            <div class="min-width-cell" style="margin-right: 20px; padding: 10px;">
                                                <p>Tipo de iniciativa</p>
                                                <h6 class="mt-3">${dados.tipoIniciativa}</h6>
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
                                                <h6 class="mt-3">${dados.idVoluntario}</h6>
                                            </div>
                                            <div class="min-width-cell" style="padding: 10px;">
                                                <p>E-mail Voluntário</p>
                                                <h6 class="mt-3" style="margin-bottom: 3px;">${dados.emailVoluntario}</h6>
                                            </div>
                                        </div>
                                        <div class="expanded-table-normal-cell">
                                            <p>Observação</p>
                                            <h6>${dados.observacao}</h6>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                                <form id="materials-form">
                                                    <div class="materials-container">
                                                        ${materiaisHTML}
                                                        <div class="form-row align-items-center material-row">
                                                            <div class="col-sm-6 my-1">
                                                                <select class="custom-select material-dropdown">
                                                                    <option selected>Selecionar Material...</option>
                                                                    <option value="1">Luvas</option>
                                                                    <option value="2">Balde</option>
                                                                    <option value="3">Pá</option>
                                                                </select>
                                                            </div>
                                                            <div class="col-sm-6 my-1">
                                                                <select class="custom-select quantity-dropdown">
                                                                    <option selected>Quantidade...</option>
                                                                    <option value="12">12</option>
                                                                    <option value="13">13</option>
                                                                    <option value="14">14</option>
                                                                </select>
                                                            </div>
                                                            <button type="button" class="btn btn-link add-material-button" onclick="addMaterial(this)">
                                                                <i class="mdi mdi-plus-circle-outline mr-2"></i> Adicionar Material
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                                </div>
                                                </div>
                                                <div class="col-12">
                                                <form id="profissionais-form">
                                                    <div class="profissional-container">
                                                        ${profissionaisHTML}
                                                        <div class="form-row align-items-center profissional-row">
                                                            <div class="col-sm-6 my-1">
                                                                <select class="custom-select material-dropdown">
                                                                    <option selected>Profissional</option>
                                                                    <option value="1">Jose Costa - Biologo</option>
                                                                    <option value="2">Joao Martins - Guarda Florestal</option>
                                                                </select>
                                                            </div>
                                                            <button type="button" class="btn btn-link add-profissional-button" onclick="addProfessional(this)">
                                                                <i class="mdi mdi-account-plus mr-2"></i> Adicionar Profissional
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                    <div class="cell-hilighted text-white">
                                    <div class="d-flex mb-2">
                                        <div class="mr-5 min-width-cell">
                                            <p>Número de Voluntários</p>
                                            <h6>${dados.numVoluntarios}</h6>
                                        </div>
                                        <div class="min-width-cell mr-3">
                                            <p>Data Inicial</p>
                                            <h6>${dados.dataInicio}</h6>
                                        </div>
                                        <div class="min-width-cell">
                                            <p>Data Final</p>
                                            <h6>${dados.dataFim}</h6>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="min-width-cell">
                                            <p>Restrições</p>
                                            <h6>${dados.restricoes}</h6>
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

    // Carrega os dados do Local Storage
    var dadosIniciativa = JSON.parse(localStorage.getItem('iniciativa'));

    if (dadosIniciativa) {
        adicionarLinha({
            descricao: dadosIniciativa.descricao,
            tipoIniciativa: dadosIniciativa.tipoIniciativa,
            proponente: 'Nome do Proponente', // Ajustar conforme necessário
            estado: 'Pendente', // Ajustar conforme necessário
            ultimaAtualizacao: '25/04/2020', // Ajustar conforme necessário
            localizacao: dadosIniciativa.localizacao,
            idVoluntario: 'AOP01', // Ajustar conforme necessário
            emailVoluntario: 'email@zmail.pt', // Ajustar conforme necessário
            observacao: dadosIniciativa.descricao,
            numVoluntarios: '23', // Ajustar conforme necessário
            dataInicio: '25/03/2025 - 14:30', // Ajustar conforme necessário
            dataFim: '25/04/2025 - 19:30', // Ajustar conforme necessário
            restricoes: 'Sem restrições', // Ajustar conforme necessário
            materiais: dadosIniciativa.materiais || [],
            profissionais: dadosIniciativa.profissionais || []
        });
    }
});