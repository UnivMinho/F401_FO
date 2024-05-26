// Função para gerar ID
function generateUniqueId() {
  return "id-" + new Date().getTime() + "-" + Math.floor(Math.random() * 10000);
}

document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userProfileImage = userData.profileImage || userData.imageUrl;
  const userEmail = userData.email; // Assuming you have the user's email in the userData
  document.getElementById("user-profile-image-navbar").src = userProfileImage;

  // Preencher dropdown de materiais
  const materials = JSON.parse(localStorage.getItem("materials")) || [];
  populateMaterialsDropdown(
    document.querySelector(".material-dropdown"),
    materials
  );

  const addMaterialButton = document.querySelector(".add-material-button");
  addMaterialButton.addEventListener("click", function () {
    addNewMaterialRow(materials);
  });

  // Preencher dropdown de profissionais
  const profissionalDropdown = document.querySelector(".profissional-dropdown");
  const profissionais = JSON.parse(localStorage.getItem("profissionais")) || [];
  profissionais.forEach((profissional) => {
    const option = document.createElement("option");
    option.value = profissional.nome; // ou outro identificador único
    option.textContent = profissional.nome;
    profissionalDropdown.appendChild(option);
  });

  const form = document.querySelector(".forms-sample");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (submitForm() === true) {
      const formData = new FormData(form);
      const serializedData = {};
      for (const [key, value] of formData.entries()) {
        serializedData[key] = value;
      }

      // Adicionar materiais
      const materials = [];
      document.querySelectorAll(".material-row").forEach((row) => {
        const materialDropdown = row.querySelector(".material-dropdown");
        const materialId = materialDropdown.value;
        const materialNome =
          materialDropdown.options[materialDropdown.selectedIndex].text;

        const quantityInput = row.querySelector("#quantityInput");
        const quantity = quantityInput.value;

        if (materialNome !== "Selecionar Material..." && quantity) {
          materials.push({ nome: materialNome, quantidade: quantity });
        }
      });
      serializedData.materials = materials;

      // Adicionar profissionais
      let selectedProfessional = null;
      document.querySelectorAll(".profissional-row").forEach((row) => {
        const profissionalDropdown = row.querySelector(
          ".profissional-dropdown"
        );
        selectedProfessional = profissionais.find(
          (p) => p.nome === profissionalDropdown.value
        );
      });

      if (selectedProfessional) {
        serializedData.profissional = {
          nome: selectedProfessional.nome,
          cargo: selectedProfessional.cargo,
        };
      }

      // Salvar dados em localStorage
      saveDataToLocalStorage(serializedData);
    }
  });
});
function populateMaterialsDropdown(dropdown, materials) {
  materials.forEach((material) => {
    const option = document.createElement("option");
    option.value = material.id;
    option.textContent = material.nome;
    dropdown.appendChild(option);
  });
}

function addNewMaterialRow(materials) {
  const newMaterialRow = document.createElement("div");
  newMaterialRow.className = "form-row align-items-center material-row";
  newMaterialRow.innerHTML = `
    <div class="col-sm-6 my-1">
      <label class="sr-only" for="materialDropdown">Material</label>
      <div class="input-group">
        <select class="custom-select material-dropdown mr-3">
          <option selected>Selecionar Material...</option>
        </select>
      </div>
    </div>
    <div class="col-sm-6 my-1">
      <label class="sr-only" for="quantityInput">Quantidade</label>
      <div class="input-group">
        <input type="number" class="form-control quantity-input" id="quantityInput" value="0" min="0">
        <span class="availability">Disponibilidade: <span class="quantity-available">0</span></span>
        <span id="quantityError" style="color: red;"></span>
        <button type="button" class="btn btn-link remove-material-button">
          <i class="mdi mdi-minus-circle-outline"></i>
        </button>
      </div>
    </div>
  `;

  populateMaterialsDropdown(
    newMaterialRow.querySelector(".material-dropdown"),
    materials
  );

  document.querySelector(".materials-container").appendChild(newMaterialRow);

  newMaterialRow
    .querySelector(".remove-material-button")
    .addEventListener("click", function () {
      newMaterialRow.remove();
      updateAllMaterialDropdowns();
    });

  newMaterialRow
    .querySelector(".material-dropdown")
    .addEventListener("change", function () {
      updateMaterialAvailability(newMaterialRow);
      updateAllMaterialDropdowns();
    });

  newMaterialRow
    .querySelector(".quantity-input")
    .addEventListener("input", function () {
      validateQuantity(newMaterialRow);
    });

  updateAllMaterialDropdowns();
}
function saveDataToLocalStorage(data) {
  if (typeof localStorage !== "undefined") {
    try {
      const existingInitiatives =
        JSON.parse(localStorage.getItem("initiatives")) || [];
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userEmail = userData.email;
      const locationError = document.getElementById("locationError");

      // Longitude e latitude para a iniciativa
      geocodeLocation(
        data["iniciativa-location"],
        function (coordinates, status) {
          if (status === "OK") {
            // Criar nova iniciativa
            const newInitiative = {
              id: generateUniqueId(),
              type: data["TipoIniciativa"],
              name: data["iniciativa-title"],
              volunteers: data["volunteers"],
              location: data["iniciativa-location"],
              latitude: coordinates.lat,
              longitude: coordinates.lng,
              date: data["iniciativa-date"],
              start_hour: data["start-hour"],
              end_hour: data["end-hour"],
              description: data["iniciativa-description"],
              comments: data["iniciativa-comments"],
              materiais: data.materials,
              profissional: data.profissional,
              status: "Por realizar",
              userEmail: userEmail,
              associatedVolunteers: [userEmail],
            };
            existingInitiatives.push(newInitiative);

            localStorage.setItem(
              "initiatives",
              JSON.stringify(existingInitiatives)
            );

            const successModal = new bootstrap.Modal(
              document.getElementById("successModal")
            );
            successModal.show();

            document.querySelector(".forms-sample").reset();
            clearAndRestoreFormInputs(document.querySelector(".forms-sample"));
            locationError.innerText = "";
          } else {
            const unsuccessModal = new bootstrap.Modal(
              document.getElementById("unsuccessModal")
            );
            unsuccessModal.show();

            locationError.innerText =
              "Localização inválida. Por favor insira outra localização e submeta novamente.";
          }
        }
      );
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  } else {
    console.error("localStorage não é suportada neste browser");
  }
}

// Gerar longitude e latitude para por o pin no mapa
function geocodeLocation(location, callback) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: location }, function (results, status) {
    if (status === "OK") {
      const coordinates = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      };
      callback(coordinates, "OK");
    } else {
      console.error(
        "Geocode was not successful for the following reason:",
        status
      );
      callback(null, status);
    }
  });
}

// Apagar os campos e restaurar os placeholders
function clearAndRestoreFormInputs(form) {
  form.querySelectorAll("input, textarea").forEach((input) => {
    input.value = "";
    input.setAttribute("placeholder", input.dataset.placeholder);
  });

  const materialRows = document.querySelectorAll(".material-row");
  materialRows.forEach((materialRow, index) => {
    if (index > 0) {
      materialRow.remove();
    } else {
      materialRow.querySelector(".quantity-available").textContent = "0";
      document.getElementById("quantityInput").value = 0;
    }
  });
  document.getElementById("volunteersInput").value = 1;
}

// Guardar os placeholders quando carrega a página
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".forms-sample");
  form.querySelectorAll("input, textarea").forEach((input) => {
    input.dataset.placeholder = input.getAttribute("placeholder");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("iniciativa-date")
    .addEventListener("input", function () {
      validateDate();
      validateNumberInitiatives();
    });

  document.getElementById("end-hour").addEventListener("input", function () {
    validateHour();
  });

  const initiativeTypes = document.querySelectorAll(
    'input[name="TipoIniciativa"]'
  );
  initiativeTypes.forEach((type) => {
    type.addEventListener("change", function () {
      validateNumberInitiatives();
    });
  });

  document
    .getElementById("quantityInput")
    .addEventListener("input", function () {
      validateQuantity(document.querySelector(".material-row"));
    });
});

function validateDate() {
  const inputDate = new Date(document.getElementById("iniciativa-date").value);
  const currentDate = new Date();
  const threeDaysAfter = new Date(currentDate);
  threeDaysAfter.setDate(currentDate.getDate() + 1);

  let dateError = document.getElementById("dateError");

  if (inputDate < threeDaysAfter) {
    dateError.innerText = "Por favor selecione uma data no futuro.";
    return false;
  } else {
    dateError.innerText = "";
  }

  return true;
}

function validateHour() {
  const tipoIniciativa = document.querySelector(
    'input[name="TipoIniciativa"]:checked'
  ).value;
  const startHour = parseInt(
    document.getElementById("start-hour").value.split(":")[0]
  );
  const startMinute = parseInt(
    document.getElementById("start-hour").value.split(":")[1]
  );
  const endHour = parseInt(
    document.getElementById("end-hour").value.split(":")[0]
  );
  const endMinute = parseInt(
    document.getElementById("end-hour").value.split(":")[1]
  );

  const durationHours = endHour - startHour;
  const durationMinutes = endMinute - startMinute;

  let timeError = document.getElementById("timeError");

  if (endHour < startHour) {
    timeError.innerText =
      "A hora de fim da iniciativa é menor que a hora de início.";
    return false;
  } else {
    timeError.innerText = "";
  }

  switch (tipoIniciativa) {
    case "Limpeza":
    case "Reflorestação":
      if (durationHours > 4 || (durationHours === 4 && durationMinutes > 0)) {
        timeError.innerText =
          "A duração excede o tempo limite para este tipo de iniciativa";
        return false;
      } else {
        timeError.innerText = "";
      }
      break;
    case "Campanhas":
      if (durationHours > 1 || (durationHours === 1 && durationMinutes > 0)) {
        timeError.innerText =
          "A duração excede o tempo limite para este tipo de iniciativa";
        return false;
      } else {
        timeError.innerText = "";
      }
      break;
    default:
      timeError.innerText = "";
      break;
  }

  return true;
}

function validateNumberInitiatives() {
  const selectedDate = document.getElementById("iniciativa-date").value;
  const tipoIniciativa = document.querySelector(
    'input[name="TipoIniciativa"]:checked'
  ).value;

  const initiatives = JSON.parse(localStorage.getItem("initiatives")) || [];

  const existingInitiative = initiatives.find(
    (initiative) =>
      initiative.date === selectedDate && initiative.type === tipoIniciativa
  );

  let initiativeError = document.getElementById("initiativeError");

  if (existingInitiative) {
    initiativeError.innerText = `Já existe uma iniciativa do tipo ${tipoIniciativa} para a data selecionada.`;
    return false;
  } else {
    initiativeError.innerText = "";
  }

  return true;
}

function validateQuantity(materialRow) {
  const materialDropdown = materialRow.querySelector(".material-dropdown");
  const quantityInput = materialRow.querySelector("#quantityInput");
  const availabilitySpan = materialRow.querySelector(".quantity-available");
  const quantityError = materialRow.querySelector("#quantityError");

  const selectedOption = materialDropdown.options[materialDropdown.selectedIndex];
  const selectedMaterialName = selectedOption.text;
  const enteredQuantity = parseInt(quantityInput.value);

  const availableQuantity = parseInt(availabilitySpan.textContent);

  if (enteredQuantity > availableQuantity) {
    quantityError.innerText = `Quantidade indisponível.`;
    return false;
  } else {
    quantityError.innerText = "";
  }

  return true;
}

function submitForm() {
  const materialRows = document.querySelectorAll(".material-row");
  let materialSelected = false;
  materialRows.forEach((row) => {
    const materialDropdown = row.querySelector(".material-dropdown");
    if (materialDropdown.value !== "Selecionar Material...") {
      materialSelected = true;
    }
  });

  if (!materialSelected) {
    alert("Por favor selecione pelo menos um material.");
    return false;
  }

  const professionalRows = document.querySelectorAll(".profissional-row");
  let professionalSelected = false;
  professionalRows.forEach((row) => {
    const professionalDropdown = row.querySelector(".profissional-dropdown");
    if (professionalDropdown.value !== "Selecionar Profissional...") {
      professionalSelected = true;
    }
  });

  if (!professionalSelected) {
    alert("Por favor selecione um profissional.");
    return false;
  }

  let isValid =
    validateDate() &&
    validateHour() &&
    validateNumberInitiatives();

  const materialsRows = document.querySelectorAll(".material-row");
  materialsRows.forEach(materialsRow => {
    if (!validateQuantity(materialsRow)) {
      isValid = false;
    }
  });

  if (!isValid) {
    alert("Por favor corrija os erros antes de submeter.");
  }

  return isValid;
}

//Event listener para verificar as quantidades disponíveis dos materiais
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".material-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("change", function () {
      const row = dropdown.closest(".material-row");
      updateMaterialAvailability(row);
    });
  });
});

function updateMaterialAvailability(row) {
  const materialDropdown = row.querySelector(".material-dropdown");
  const availabilitySpan = row.querySelector(".quantity-available");
  const selectedOption =
    materialDropdown.options[materialDropdown.selectedIndex];
  const selectedMaterialName = selectedOption.text;
  const selectedDate = document.getElementById("iniciativa-date").value;

  const initiatives = fetchInitiativesForDate(selectedDate);

  const availability = calculateMaterialAvailability(
    initiatives,
    selectedMaterialName
  );

  availabilitySpan.textContent = availability;
}
function updateAllMaterialDropdowns() {
  const selectedMaterials = new Set();
  document.querySelectorAll(".material-dropdown").forEach((dropdown) => {
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    if (selectedOption.value && selectedOption.value !== "Selecionar Material...") {
      selectedMaterials.add(selectedOption.value);
    }
  });

  document.querySelectorAll(".material-dropdown").forEach((dropdown) => {
    const currentSelectedValue = dropdown.value;
    Array.from(dropdown.options).forEach((option) => {
      if (selectedMaterials.has(option.value) && option.value !== currentSelectedValue) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    });
  });
}

//Vai buscar a localStorage todas as inicativas na mesma data introduzida
function fetchInitiativesForDate(date) {
  const initiatives = JSON.parse(localStorage.getItem("initiatives")) || [];
  return initiatives.filter((initiative) => initiative.date === date);
}

//Percorre todas as iniciativas para ver quais usam o material em causa
function calculateMaterialAvailability(initiatives, materialName) {
  let totalQuantity = 0;

  initiatives.forEach((initiative) => {
    if (initiative.materiais) {
      if (initiative.materiais.length > 0) {
        if (
          initiative.materiais.some(
            (material) => material.nome === materialName
          )
        ) {
          const material = initiative.materiais.find(
            (material) => material.nome === materialName
          );
          totalQuantity += parseInt(material.quantidade);
        }
      } else {
        console.log("No materials found in initiative.");
      }
    }
  });

  const totalAvailable = fetchTotalQuantity(materialName);

  const availability = totalAvailable - totalQuantity;

  return availability >= 0 ? availability : "N/A";
}

//Função para ir buscar a quantidade total do material
function fetchTotalQuantity(materialName) {
  const materials = JSON.parse(localStorage.getItem("materials")) || [];
  const material = materials.find((material) => material.nome === materialName);
  return material ? parseInt(material.quantidade) : 0;
}
