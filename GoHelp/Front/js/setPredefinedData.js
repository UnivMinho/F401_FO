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
                status: 'Por realizar',
                userEmail: 'pwtrabalho1@gmail.com',
                associatedVolunteers: ['pwtrabalho1@gmail.com'],
                lider: 'Trabalho PW',
                materiais: [{nome:'Luvas', quantidade:'10'},{nome:'Sacos do lixo', quantidade:'20'}],
                profissional: {nome: 'Eduardo Gomes', cargo: 'Engenheiro Ambiental'},
                restrictions: ''
            },
            {
                id: generateUniqueId(),
                type: 'Reflorestação',
                volunteers: 15,
                location: 'Picoto',
                latitude: 41.5592121,
                longitude: -8.3644979,
                date: '2024-05-29',
                start_hour: '09:00',
                end_hour: '12:00',
                name: 'Reflorestar o planeta!',
                description: 'Juntos plantamos o amanhã!',
                comments: 'Materiais: sementes, pás. Profissionais: Engenheiro Florestal',
                status: 'Por realizar',
                userEmail: 'pwtrabalho1@gmail.com',
                associatedVolunteers: ['pwtrabalho1@gmail.com'],
                lider: 'Trabalho PW',
                materiais: [{nome:'Sementes', quantidade:'5'},{nome:'Pás', quantidade:'10'}],
                profissional: {nome: 'Simão Cunha', cargo: 'Engenheiro Florestal'},
                restrictions: ''
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
                comments: 'Materiais: panfletos. Profissionais: Orador',
                status: 'Por realizar',
                userEmail: 'pwtrabalho1@gmail.com',
                associatedVolunteers: ['pwtrabalho1@gmail.com'],
                lider: 'Trabalho PW',
                materiais: [{nome:'Panfletos', quantidade:'30'}],
                profissional: {nome: 'Mafalda Miguel', cargo: 'Oradora'},
                restrictions: ''
            },
            {
                id: generateUniqueId(),
                type: 'Campanhas',
                volunteers: 1,
                location: 'Altice Fórum Braga',
                latitude: 41.541648,
                longitude: -8.421845099999999,
                date: '2024-04-15',
                start_hour: '21:00',
                end_hour: '22:00',
                name: 'Sabe mais sobre o ambiente!',
                description: 'Venha apreender mais sobre o ambiente!',
                comments: 'Materiais: panfletos. Profissionais: Orador',
                status: 'Concluída',
                userEmail: 'pwtrabalho1@gmail.com',
                associatedVolunteers: ['pwtrabalho1@gmail.com'],
                lider: 'Trabalho PW',
                materiais: [{nome:'Panfletos', quantidade:'5'}],
                profissional: {nome: 'Mafalda Miguel', cargo: 'Oradora'},
                restrictions: ''
            },
            {
                id: generateUniqueId(),
                type: 'Campanhas',
                volunteers: 10,
                location: 'Universidade do Minho',
                latitude: 41.5607319,
                longitude: -8.3962368,
                date: '2024-05-29',
                start_hour: '09:40',
                end_hour: '09:50',
                name: 'Apresentação PW',
                description: 'Realização da apresentação de PW!',
                comments: 'Materiais: projetor. Profissionais: Orador',
                status: 'Por realizar',
                userEmail: 'pwtrabalho1@gmail.com',
                associatedVolunteers: ['pwtrabalho1@gmail.com', 'filipe@gmail.com', 'tiago@gmail.com', 'ana@gmail.com', 'liandro@gmail.com', 'maria@gmail.com', 'rafael@gmail.com', 'pedro@gmail.com', 'tomas@gmail.com'],
                lider: 'Trabalho PW',
                materiais: [{nome:'Projetores', quantidade:'1'}],
                profissional: {nome: 'Mafalda Miguel', cargo: 'Oradora'},
                restrictions: ''
            }

        ];

        localStorage.setItem('initiatives', JSON.stringify(predefinedInitiatives));
    }
}

function setPredefinedMaterials() {
    const existingMaterials = JSON.parse(localStorage.getItem('materials'));
    
    if (!existingMaterials || existingMaterials.length === 0) {
        const predefinedMaterials = [
            {
                id: 1716570258231,
                imagem: 'https://mindthetrash.pt/wp-content/uploads/2023/11/Luvas_latex_natural_02_mind_the_trash.jpg',
                nome: 'Luvas',
                quantidade: 50,
                quantidadeTerreno: 0
            },
            {
                id: 1716570258232,
                imagem: 'https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201801/16/05218139100210____5__600x600.jpg',
                nome: 'Sementes',
                quantidade: 150,
                quantidadeTerreno: 0
            },
            {
                id: 1716570258233,
                imagem: 'https://plasticosmacar.pt/430-large_default/sacos-rolo-lixo-domestico.jpg',
                nome: 'Sacos do lixo',
                quantidade: 100,
                quantidadeTerreno: 0
            },
            {
                id: 1716570258234,
                imagem: 'https://www.bcnonline.pt/wp-content/uploads/2020/11/epsonEB-w49.jpg',
                nome: 'Projetores',
                quantidade: 5,
                quantidadeTerreno: 0
            },
            {
                id: 1716570258238,
                imagem: 'https://www.nblgrafica.com/uploads/produtos/panfletos-14x20cm-couche-brilho-90g-corte-reto-4x0-16900291388282773164bbcc52c739c.png',
                nome: 'Panfletos',
                quantidade: 100,
                quantidadeTerreno: 0
            },
            {
                id: 1716570258235,
                imagem: 'https://cdn.pecol.pt/files/ImagensDoGlaciar/31543_0113110101.79_Pas.png',
                nome: 'Pás',
                quantidade: 30,
                quantidadeTerreno: 0
            },
            {
                id: 1716570258236, 
                imagem: 'https://media.adeo.com/marketplace/LMPT/88281618/2303397.jpeg?width=3000&height=3000&format=jpg&quality=80&fit=bounds',
                nome: 'Carrinhos de mão',
                quantidade: 15,
                quantidadeTerreno: 0
            }
        ];

        localStorage.setItem('materials', JSON.stringify(predefinedMaterials));
    }
}

function setPredefinedProfessional() {
    const existingProfessional = JSON.parse(localStorage.getItem('profissionais'));
    
    if (!existingProfessional || existingProfessional.length === 0) {
        const predefinedProfessional = [
            {
                cargo: 'Seguranca Ambiental',
                dataCriacao: '5/20/2024',
                email: 'pedrosantos@gmail.com',
                nome: 'Pedro Santos',
                telemovel: '923156555'
            },
            {
                cargo: 'Biólogo',
                dataCriacao: '5/01/2024',
                email: 'joaosoares@gmail.com',
                nome: 'João Soares',
                telemovel: '963533789'
            },
            {
                cargo: 'Engenheiro Florestal',
                dataCriacao: '5/20/2024',
                email: 'simaocunha@gmail.com',
                nome: 'Simão Cunha',
                telemovel: '923156945'
            },
            {
                cargo: 'Engenheiro Ambiental',
                dataCriacao: '5/20/2024',
                email: 'eduardogomes@gmail.com',
                nome: 'Eduardo Gomes',
                telemovel: '923446555'
            },
            {
                cargo: 'Educadora Ambiental',
                dataCriacao: '5/15/2024',
                email: 'anatorres@gmail.com',
                nome: 'Ana Torres',
                telemovel: '911436785'
            },
            {
                cargo: 'Especialista Eventos',
                dataCriacao: '5/11/2024',
                email: 'joanacarvalho@gmail.com',
                nome: 'Joana Carvalho',
                telemovel: '923156555'
            }, 
            {
                cargo: 'Oradora',
                dataCriacao: '5/11/2024',
                email: 'mafaldamiguel@gmail.com',
                nome: 'Mafalda Miguel',
                telemovel: '933156575'
            }

        ];

        localStorage.setItem('profissionais', JSON.stringify(predefinedProfessional));
    }
}


window.addEventListener('load', function() {
    setPredefinedInitiatives();
    setPredefinedMaterials();
    setPredefinedProfessional();
});
