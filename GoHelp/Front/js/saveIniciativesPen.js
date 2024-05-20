//Função que guarda as informações das incicativas pendentes
function saveDataToLocalStorage(data) {
    if (typeof localStorage !== 'undefined') {
        try {
            const existingInitiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
            const userData = JSON.parse(localStorage.getItem('userData'));
            const userEmail = userData.email;
            
            // Longitude e latitude para a iniciativa
            geocodeLocation(data['iniciativa-location'], function(coordinates) {
                const newInitiative = {
                    type: data['TipoIniciativa'],
                    volunteers: data['volunteers'],
                    location: data['iniciativa-location'], 
                    latitude: coordinates.lat,
                    longitude: coordinates.lng,
                    date: data['iniciativa-date'], 
                    start_hour: data['start-hour'], 
                    end_hour: data['end-hour'], 
                    name: data['iniciativa-title'], 
                    description: data['iniciativa-description'], 
                    comments: data['iniciativa-comments'],
                    status: "pendente",
                    userEmail: userEmail,
                    associatedVolunteers: [userEmail]
                };

                existingInitiatives.push(newInitiative);
                
                localStorage.setItem('initiatives', JSON.stringify(existingInitiatives));
            });
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
        }
    } else {
        console.error('localStorage não é suportada neste browser');
    }
}

//gerar longitude e latitude para por o pin no mapa
function geocodeLocation(location, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': location }, function(results, status) {
        if (status === 'OK') {
            const coordinates = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
            };
            callback(coordinates);
        } else {
            console.error('Geocode was not successful for the following reason:', status);
        }
    });
}

//Event Listener para começar a funcção de guardar as iniciativas assim que o utilizador carregar no submit
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.donate-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const formData = new FormData(form);
        const serializedData = {};
        for (const [key, value] of formData.entries()) {
            serializedData[key] = value;
        }        
          // Salvar dados em localStorage
          saveDataToLocalStorage(serializedData);
          form.reset();
          clearAndRestoreFormInputs(form);
          alert("Iniciativa guardada e a aguardar aprovação!");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("iniciativa-date").addEventListener("input", function() {
        validateDate();
    });

    document.getElementById("end-hour").addEventListener("input", function(){
        validateHour();
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
    const tipoIniciativa = document.querySelector('input[name="TipoIniciativa"]:checked').value;
    const startHour = parseInt(document.getElementById("start-hour").value.split(':')[0]);
    const startMinute = parseInt(document.getElementById("start-hour").value.split(':')[1]);
    const endHour = parseInt(document.getElementById("end-hour").value.split(':')[0]);
    const endMinute = parseInt(document.getElementById("end-hour").value.split(':')[1]);

    const durationHours = endHour - startHour;
    const durationMinutes = endMinute - startMinute;

    let timeError = document.getElementById("timeError");

    switch (tipoIniciativa) {
        case 'Limpeza':
        case 'Reflorestação':
            if (durationHours > 4 || (durationHours === 4 && durationMinutes > 0)) {
                timeError.innerText = "A duração execede o tempo limite para este tipo de iniciativa"
                return false;
            }else{
                timeError.innerText = "";
            }
            break;
        case 'Campanhas':
            if (durationHours > 1 || (durationHours === 1 && durationMinutes > 0)) {
                timeError.innerText = "A duração execede o tempo limite para este tipo de iniciativa"
                return false;
            }else{
                timeError.innerText = "";
            }
            break;
        default:
            timeError.innerText = "";
            break;
        }

    return true; 
}


function submitForm() {
    if (!validateDate() && !validateHour()) {
        alert("Por favor selecione uma data e/ou hora no futuro.");
    }
}

//Apaga os campos e faz reload dos placeholders
function clearAndRestoreFormInputs(form) {
    form.querySelectorAll('input, textarea').forEach(input => {
        input.value = '';
        input.setAttribute('placeholder', input.dataset.placeholder);
    });
    document.getElementById("volunteersInput").value = 5;
}

// Guardar os placeholders quando carrega a página
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.donate-form');
    form.querySelectorAll('input, textarea').forEach(input => {
        input.dataset.placeholder = input.getAttribute('placeholder');
    });
});