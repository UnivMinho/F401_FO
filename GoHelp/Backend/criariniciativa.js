document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-group .btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active')); // Remove 'active' de todos os botões
            button.classList.add('active'); // Adiciona 'active' ao botão clicado
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.btn.btn-primary.mr-2').addEventListener('click', function(event) {
        event.preventDefault();  // Impede o comportamento padrão do formulário

        // Verifica se todos os campos estão preenchidos
        var tipoIniciativa = document.querySelector('.btn-group .btn.active') ? document.querySelector('.btn-group .btn.active').textContent : '';
        var maxParticipantes = document.getElementById('exampleInputName1').value;
        var localizacao = document.getElementById('localizacaoPretendida').value;
        var descricao = document.getElementById('desc').value;
        var horaInicio = document.getElementById('horaInicio').value;
        var dataInicio = document.getElementById('dataInicio').value;
        var horaFim = document.getElementById('horaFim').value;
        var dataFim = document.getElementById('dataFim').value;

        // Captura informações dos materiais
        var materiais = Array.from(document.querySelectorAll('.materials-container .material-row')).map(row => {
            return {
                material: row.querySelector('.material-dropdown').value,
                quantidade: row.querySelector('.quantity-dropdown').value
            };
        });

        // Captura informações dos profissionais
        var profissionais = Array.from(document.querySelectorAll('.profissional-container .profissional-row')).map(row => {
            return {
                profissional: row.querySelector('.material-dropdown').value
            };
        });

        if (!tipoIniciativa || !maxParticipantes || !localizacao || !descricao || !horaInicio || !dataInicio || !horaFim || !dataFim || !materiais.length || !profissionais.length) {
            alert('Por favor, preencha todos os campos, incluindo materiais e profissionais.');
            return;
        }

        // Se todos os campos estiverem preenchidos, guarda no Local Storage
        var dadosIniciativa = {
            tipoIniciativa: tipoIniciativa,
            maxParticipantes: maxParticipantes,
            localizacao: localizacao,
            descricao: descricao,
            horaInicio: horaInicio,
            dataInicio: dataInicio,
            horaFim: horaFim,
            dataFim: dataFim,
            materiais: materiais,
            profissionais: profissionais
        };

        localStorage.setItem('iniciativa', JSON.stringify(dadosIniciativa));
        alert('Iniciativa criada com sucesso!');
    });
});