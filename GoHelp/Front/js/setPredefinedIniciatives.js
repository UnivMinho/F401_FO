// Function to generate a unique ID
function generateUniqueId() {
    return 'id-' + new Date().getTime() + '-' + Math.floor(Math.random() * 10000);
}

function setPredefinedInitiatives() {
    const existingInitiatives = JSON.parse(localStorage.getItem('initiatives'));
    
    if (!existingInitiatives || existingInitiatives.length === 0) {
        const predefinedInitiatives = [
            {
                id: generateUniqueId(),
                type: 'Limpeza',
                volunteers: 20,
                location: 'Praia de Ofir',
                latitude: 41.517198,
                longitude: -8.787593,
                date: '2024-06-08',
                start_hour: '09:00',
                end_hour: '12:00',
                name: 'Limpar a praia juntos!',
                description: 'Junte-se a nós por um ambiente melhor!',
                comments: 'Materiais: luvas, sacos do lixo. Profissionais: Engenheiro Ambiental',
                status: 'aprovada',
                userEmail: 'pwtrabalho1@gmail.com',
                associatedVolunteers: ['pwtrabalho1@gmail.com']
            },
            {
                id: generateUniqueId(),
                type: 'Reflorestação',
                volunteers: 15,
                location: 'Picoto',
                latitude: 41.5592121,
                longitude: -8.3644979,
                date: '2024-07-04',
                start_hour: '14:00',
                end_hour: '17:00',
                name: 'Reflorestar o planeta!',
                description: 'Juntos plantamos o amanhã!',
                comments: 'Materiais: sementes, regadores, pás. Profissionais: Engenheiro Florestal',
                status: 'aprovada',
                userEmail: 'pwtrabalho1@gmail.com',
                associatedVolunteers: ['pwtrabalho1@gmail.com']
            },
            {
                id: generateUniqueId(),
                type: 'Campanhas',
                volunteers: 30,
                location: 'Altice Fórum Braga',
                latitude: 41.541648,
                longitude: -8.421845099999999,
                date: '2024-06-15',
                start_hour: '21:00',
                end_hour: '22:00',
                name: 'Sensibilização Ambiental',
                description: 'Venha apreender mais sobre o ambiente!',
                comments: 'Materiais: panfletos, apresentação. Profissionais: Orador',
                status: 'aprovada',
                userEmail: 'pwtrabalho1@gmail.com',
                associatedVolunteers: ['pwtrabalho1@gmail.com']
            }
        ];

        localStorage.setItem('initiatives', JSON.stringify(predefinedInitiatives));
    }
}

window.addEventListener('load', function() {
    setPredefinedInitiatives();
});
