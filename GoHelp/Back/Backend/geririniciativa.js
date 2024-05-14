// Function to get proponent's name based on their email
function getProponentName(email) {
    const users = JSON.parse(localStorage.getItem('usersData'));
    const user = users.find(user => user.email === email);
    return user ? user.name : 'Unknown User';
}

// Function to update the maximum quantity for a selected material
window.updateMaxQuantity = function(selectElement) {
    var quantidade = selectElement.options[selectElement.selectedIndex].dataset.quantidade;
    var inputQuantity = selectElement.closest('.material-container').querySelector('.material-quantity');
    inputQuantity.max = quantidade;
}

// Function to add a row in the table
function adicionarLinha(initiative) {
    var tabela = document.querySelector('#example tbody');
    var novaLinha = createRowHTML(initiative); // We'll define this function to handle HTML creation
    tabela.innerHTML += novaLinha;
}

// Helper function to create the quantity input HTML
function createQuantityHTML() {
    return '<input type="number" class="form-control material-quantity" min="1" value="1" />';
}

// Create row HTML using modularized functions
function createRowHTML(initiative) {
    var materiaisHTML = createMaterialsDropdown();
    var profissionaisHTML = createProfessionalsDropdown();
    var quantidadeHTML = createQuantityHTML(); // Define quantity HTML here
    var lideresDropdownHTML = createLeadersDropdown();

    return `<tr onclick="this.nextSibling.style.display = this.nextSibling.style.display === 'none' ? 'table-row' : 'none';">
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
                <div class="materials-container" id="materials-container">
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
        <form id="profissional-form">
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
</tr>`;  // Insert your detailed row HTML here
};  


// Helper function to create materials dropdown
function createMaterialsDropdown() {
    var materiaisData = JSON.parse(localStorage.getItem('materials'));
    var materiaisHTML = '<select class="custom-select material-dropdown" onchange="checkMaterialQuantity(this)">';
    materiaisHTML += '<option value="">Selecione um material</option>';
    if (Array.isArray(materiaisData)) {
        materiaisData.forEach(material => {
            materiaisHTML += `<option value="${material.nome}" data-max-quantity="${material.quantidade}">${material.nome}</option>`;
        });
    }
    materiaisHTML += '</select>';
    return materiaisHTML;
}

function checkMaterialQuantity(selectElement) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const maxQuantity = parseInt(selectedOption.getAttribute('data-max-quantity'), 10);
    const inputQuantity = selectElement.closest('.material-entry').querySelector('.material-quantity');
    const currentQuantity = parseInt(inputQuantity.value, 10);

    if (currentQuantity > maxQuantity) {
        alert(`The quantity for ${selectedOption.value} cannot exceed ${maxQuantity}.`);
        inputQuantity.value = maxQuantity; // Reset to max allowed value if exceeded
    }
}



// Helper function to create professionals dropdown
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

// Helper function to create leaders dropdown
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

document.addEventListener('DOMContentLoaded', function() {
    const dadosIniciativas = JSON.parse(localStorage.getItem('initiatives'));
    if (dadosIniciativas) {
        dadosIniciativas.forEach(initiative => {
            adicionarLinha(initiative);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-material-button');
    addButton.addEventListener('click', function() {
        addMaterialFields();
    });

    function saveMaterials() {
        const materials = [];
        document.querySelectorAll('.material-entry').forEach(entry => {
            const materialSelect = entry.querySelector('.material-dropdown');
            const quantityInput = entry.querySelector('.material-quantity');
            const material = materialSelect.value;
            const quantity = quantityInput.value;
    
            if (material && quantity) {
                materials.push({ material, quantity });
            }
        });
    
        localStorage.setItem('addedMaterials', JSON.stringify(materials));
    }
    
    function addMaterialFields() {
        const materialsContainer = document.getElementById('materials-container');
        const newMaterialHTML = createMaterialsDropdown();
        const newQuantityHTML = createQuantityHTML();
    
        const newFieldDiv = document.createElement('div');
        newFieldDiv.className = 'material-entry';
        newFieldDiv.innerHTML = `
            <div class="form-row align-items-center">
                <div class="col-sm-6 my-1">
                    ${newMaterialHTML}
                </div>
                <div class="col-sm-6 my-1">
                    <input type="number" class="form-control material-quantity" min="1" value="1" onchange="checkMaterialQuantity(this.previousElementSibling.querySelector('.material-dropdown'))">
                </div>
            </div>
        `;
    
        materialsContainer.appendChild(newFieldDiv);
        saveMaterials(); // Save materials whenever a new field is added
    }       
});

function displayMaterials() {
    const materials = JSON.parse(localStorage.getItem('addedMaterials'));
    if (materials) {
        materials.forEach(material => {
            const materialsContainer = document.getElementById('materials-container');
            const materialHTML = createMaterialsDropdown(); // Create dropdown and set the selected value
            const quantityHTML = createQuantityHTML(); // Create quantity input

            const materialDiv = document.createElement('div');
            materialDiv.className = 'material-entry';
            materialDiv.innerHTML = `
                <div class="form-row align-items-center">
                    <div class="col-sm-6 my-1">
                        ${materialHTML}
                    </div>
                    <div class="col-sm-6 my-1">
                        ${quantityHTML}
                    </div>
                </div>
            `;

            materialsContainer.appendChild(materialDiv);

            // Set the values from localStorage
            materialDiv.querySelector('.material-dropdown').value = material.material;
            materialDiv.querySelector('.material-quantity').value = material.quantity;
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayMaterials(); // Load and display materials when the page loads
});
