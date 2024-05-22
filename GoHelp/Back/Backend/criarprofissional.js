document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.forms-sample');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obter os valores dos inputs
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telemovel = document.getElementById('telemovel').value;
        const cargo = document.getElementById('cargo').value;

         // Validar se os campos não estão vazios
         if (!nome || !email || !telemovel || !cargo) {
            alert('Todos os campos são obrigatórios!');
            return;
        }

        // Criar objeto com os dados do profissional
        const profissional = { nome, email, telemovel, cargo, dataCriacao: new Date().toLocaleDateString() };

        // Guardar o profissional no localStorage
        let profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];
        profissionais.push(profissional);
        localStorage.setItem('profissionais', JSON.stringify(profissionais));

        // Adicionar profissional na tabela
        adicionarProfissionalNaTabela(profissional);

        // Limpar campos do formulário
        form.reset();
    });

    // Função para adicionar profissional na tabela
    function adicionarProfissionalNaTabela(profissional) {
        const tabela = document.querySelector('.table tbody');
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${profissional.nome}</td>
            <td>${profissional.cargo}</td>
            <td>${profissional.telemovel}</td>
            <td>${profissional.email}</td>
            <td>${profissional.dataCriacao}</td>
            <td><button class="btn btn-danger apagar-conta" style="height: 35px; padding-top: 0; padding-bottom: 0; line-height: 25px;">Apagar Conta</button></td>
        `;
        tabela.appendChild(linha);

        // Adicionar event listener para o botão "Apagar Conta"
        const botaoApagarConta = linha.querySelector('.apagar-conta');
        botaoApagarConta.addEventListener('click', function() {
            // Remover o profissional da tabela
            linha.remove();

            // Remover o profissional do armazenamento local
            const profissionaisGuardados = JSON.parse(localStorage.getItem('profissionais')) || [];
            const indice = profissionaisGuardados.findIndex(p => p.nome === profissional.nome && p.email === profissional.email && p.telemovel === profissional.telemovel && p.cargo === profissional.cargo && p.dataCriacao === profissional.dataCriacao);
            if (indice !== -1) {
                profissionaisGuardados.splice(indice, 1);
                localStorage.setItem('profissionais', JSON.stringify(profissionaisGuardados));
            }
        });
    }

    // Carregar profissionais do localStorage na tabela ao carregar a página
    const profissionaisGuardados = JSON.parse(localStorage.getItem('profissionais')) || [];
    profissionaisGuardados.forEach(profissional => {
        adicionarProfissionalNaTabela(profissional);
    });
});