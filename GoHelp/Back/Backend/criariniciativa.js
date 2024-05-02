document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-group .btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    document.querySelector('.btn.btn-primary.mr-2').addEventListener('click', function(event) {
        event.preventDefault();

        var tipoIniciativa = document.querySelector('.btn-group .btn.active') ? document.querySelector('.btn-group .btn.active').textContent : '';
        var maxParticipantes = document.getElementById('exampleInputName1').value;
        var localizacao = document.getElementById('localizacaoPretendida').value;
        var descricao = document.getElementById('desc').value;
        var horaInicio = document.getElementById('horaInicio').value;
        var dataInicio = document.getElementById('dataInicio').value;
        var horaFim = document.getElementById('horaFim').value;
        var dataFim = document.getElementById('dataFim').value;
        
        var materiais = Array.from(document.querySelectorAll('.materials-container .material-row')).map(row => {
            return {
                material: row.querySelector('.material-dropdown').value,
                quantidade: row.querySelector('.quantity-dropdown').value
            };
        });
        
        var profissionais = Array.from(document.querySelectorAll('.profissional-container .profissional-row')).map(row => {
            return {
                profissional: row.querySelector('.material-dropdown').value
            };
        });

        if (!tipoIniciativa || !maxParticipantes || !localizacao || !descricao || !horaInicio || !dataInicio || !horaFim || !dataFim || !materiais.length || !profissionais.length) {
            alert('Por favor, preencha todos os campos, incluindo materiais e profissionais.');
            return;
        }

        var newInitiative = {
            type: tipoIniciativa,
            volunteers: maxParticipantes,
            location: localizacao, 
            date: dataInicio,
            start_hour: horaInicio,
            end_hour: horaFim,
            end_date: dataFim,
            name: 'Nome da Iniciativa', // Você pode modificar conforme necessário
            description: descricao,
            comments: 'Comentários', // Modifique conforme necessário
            status: "pendente",
            userEmail: 'email@example.com', // Substitua pelo email do usuário atual
            associatedVolunteers: ['email@example.com'],
            materials: materiais,
            professionals: profissionais
        };

        localStorage.setItem('Initiatives', JSON.stringify(newInitiative));
        alert('Iniciativa criada com sucesso!');
    });
});
