document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".forms-sample");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nomeMaterial = document.getElementById("NomeMaterial").value.trim();
        const quantidade = document.getElementById("Quantidade").value.trim();
        const inputFile = document.querySelector(".file-upload-default").files[0];

        // Validar se todos os campos estão preenchidos
        if (!nomeMaterial || !quantidade || !inputFile) {
            alert("Por favor, preencha todos os campos e selecione uma imagem.");
            return;
        }

        // Função para ler e salvar a imagem como base64 no localStorage
        const reader = new FileReader();
        reader.onload = function (e) {
            const newMaterial = {
                id: Date.now(), // Adiciona um ID único
                nome: nomeMaterial,
                quantidade: quantidade,
                imagem: e.target.result, // Imagem em base64
            };

            saveMaterial(newMaterial);
        };
        reader.readAsDataURL(inputFile);
    });

    function saveMaterial(material) {
        let materials = JSON.parse(localStorage.getItem("materials")) || [];
        materials.push(material);
        localStorage.setItem("materials", JSON.stringify(materials));
        alert("Material criado com sucesso!");
        form.reset(); // Limpa o formulário após salvar
        updateMaterialsDisplay(materials); // Atualiza a exibição dos materiais
    }

    // Configuração do botão de upload
    document
        .querySelector(".file-upload-browse")
        .addEventListener("click", function () {
            const fileInput = document.querySelector(".file-upload-default");
            if (fileInput) {
                fileInput.click(); // Abre a janela de seleção de arquivo
            }
        });

    document
        .querySelector(".file-upload-default")
        .addEventListener("change", function () {
            const fileInput = document.querySelector(".file-upload-info");
            if (fileInput) {
                fileInput.value = this.files[0].name; // Atualiza o nome do arquivo no campo de texto
            }
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const materialsContainer = document.querySelector(".row.materials-list");
    if (materialsContainer) {
        const materials = JSON.parse(localStorage.getItem("materials")) || [];

        materials.forEach((material) => {
            const cardHtml = document.createElement("div");
            cardHtml.className = "col-md-3 grid-margin stretch-card mt-50";
            cardHtml.innerHTML = `
      <div class="card" style="height: 400px;">
      <div class="card-body d-flex flex-column align-items-center justify-content-between">
          <div class="d-flex align-items-center justify-content-between w-100 position-relative">
              <h4 class="mb-auto flex-grow-1 text-center">${material.nome}</h4>
              <i class="mdi mdi-window-close" style="font-size: 24px; position: absolute; right: 0;" onclick="removeMaterialById(${material.id})"></i>
          </div>
          <img src="${material.imagem}" style="max-width: 100%; max-height: 150px; margin-bottom: 15px;">
      </div>
      <div class="card-footer" style="border-top: 2px solid #000; border-radius: 10px 10px 10px 10px; border: 2px solid #E8F2E8; height: 150px; background:#ffffff">
          <h5 class="text-center mt-3" id="quantidade-${material.id}">Quantidade: ${material.quantidade}</h5>
          <div class="d-flex justify-content-between mt-4">
              <button type="button" class="btn btn-sm btn-danger mr-2" onclick="removeMaterial(${material.id})">Remover</button>
              <button type="button" class="btn btn-sm btn-success" onclick="addMaterial(${material.id})">Adicionar</button>
          </div>
      </div>
  </div>
            `;

            materialsContainer.appendChild(cardHtml);
        });
    }
});

function addMaterial(id) {
    const quantityToAdd = parseInt(
        prompt("Insira a quantidade a adicionar:", "1"),
        10
    );
    if (Number.isInteger(quantityToAdd) && quantityToAdd > 0) {
        const materials = JSON.parse(localStorage.getItem("materials"));
        const material = materials.find((m) => m.id === id);
        material.quantidade = parseInt(material.quantidade, 10) + quantityToAdd;
        localStorage.setItem("materials", JSON.stringify(materials));
        document.getElementById(
            `quantidade-${id}`
        ).textContent = `Quantidade: ${material.quantidade}`;
    } else {
        alert("Por favor, insira um número válido.");
    }
}

function removeMaterial(id) {
    const quantityToRemove = parseInt(
        prompt("Insira a quantidade a remover:", "1"),
        10
    );
    if (Number.isInteger(quantityToRemove) && quantityToRemove > 0) {
        const materials = JSON.parse(localStorage.getItem("materials"));
        const material = materials.find((m) => m.id === id);
        const currentQuantity = material.quantidade;

        if (quantityToRemove > currentQuantity) {
            alert("A quantidade a remover é maior que a quantidade disponível.");
            return;
        }

        material.quantidade -= quantityToRemove;

        localStorage.setItem("materials", JSON.stringify(materials));
        document.getElementById(
            `quantidade-${id}`
        ).textContent = `Quantidade: ${material.quantidade}`;
    } else {
        alert("Por favor, insira um número válido.");
    }
}

function removeMaterialById(id) {
    if (confirm("Tem certeza de que deseja remover este material?")) {
        let materials = JSON.parse(localStorage.getItem("materials")) || [];
        materials = materials.filter((material) => material.id !== id); // Remove o material com o ID fornecido
        localStorage.setItem("materials", JSON.stringify(materials)); // Atualiza o localStorage
        updateMaterialsDisplay(materials); // Atualiza a exibição dos materiais
    }
}

function filterMaterials() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const materials = JSON.parse(localStorage.getItem("materials")) || [];
    const filteredMaterials = materials.filter((material) =>
        material.nome.toLowerCase().startsWith(searchText)
    );

    updateMaterialsDisplay(filteredMaterials);
}

function updateMaterialsDisplay(materials) {
    const materialsContainer = document.querySelector(".row.materials-list");
    materialsContainer.innerHTML = ""; // Limpa o contêiner atual

    materials.forEach((material) => {
        const cardHtml = document.createElement("div");
        cardHtml.className = "col-md-3 grid-margin stretch-card";
        cardHtml.innerHTML = `
    <div class="card" style="height: 400px;">
      <div class="card-body d-flex flex-column align-items-center justify-content-between">
          <div class="d-flex align-items-center justify-content-between w-100 position-relative">
              <h4 class="mb-auto flex-grow-1 text-center">${material.nome}</h4>
              <i class="mdi mdi-window-close" style="font-size: 24px; position: absolute; right: 0;" onclick="removeMaterialById(${material.id})"></i>
          </div>
          <img src="${material.imagem}" style="max-width: 100%; max-height: 150px; margin-bottom: 15px;">
      </div>
      <div class="card-footer" style="border-top: 2px solid #000; border-radius: 10px 10px 10px 10px; border: 2px solid #E8F2E8; height: 150px; background:#ffffff">
          <h5 class="text-center mt-3" id="quantidade-${material.id}">Quantidade: ${material.quantidade}</h5>
          <div class="d-flex justify-content-between mt-4">
              <button type="button" class="btn btn-sm btn-danger mr-2" onclick="removeMaterial(${material.id})">Remover</button>
              <button type="button" class="btn btn-sm btn-success" onclick="addMaterial(${material.id})">Adicionar</button>
          </div>
      </div>
  </div>
        `;

        materialsContainer.appendChild(cardHtml); // Adiciona o novo cartão ao contêiner
    });
}
