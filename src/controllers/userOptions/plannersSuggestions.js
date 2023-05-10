function planneSuggestionsList(countryId) {
    return [
        {
            title: 'Tirar Passaport',
            descriptions: 'Saber como tirar o passaporte é o primeiro passo para sua viagem internacional aos Estados Unidos, Europa, Ásia e qualquer outro país fora da América do Sul. Você até pode comprar passagens aéreas internacionais sem ter um passaporte, mas o ideal é você fazer logo. O passaporte brasileiro é emitido pela Polícia Federal e tem validade de dez anos.',
            category: 2,
            steps: ['Reunir a documentação necessária para solicitar seu passaporte',
                'Preencher o formulário para solicitar o passaporte',
                'Paguar a taxa de emissão do passaporte',
                'Fazer o agendamento na Polícia Federal',
                'Compareçer ao posto da Polícia Federal',
                'Retirar meu passaporte'],
            attchaments: []

        },
        {
            title: 'Comprar Passagem aréa.',
            descriptions: 'Pesquisa: a primeira etapa é pesquisar as opções disponíveis de voos para o seu destino. Você pode fazer isso através de sites de busca de voos, agências de viagens, ou diretamente com as companhias aéreas. É importante levar em consideração a data da viagem, o preço, as escalas e as companhias aéreas disponíveis.',
            category: 2,
            steps: [],
            attchaments: []


        },
        {
            title: 'Traduzir diplomas e documentos.',
            descriptions: 'É importante traduzir diplomas antes do intercâmbio para garantir que a documentação necessária para o intercâmbio seja compreendida e aceita no país de destino. Isso ajuda a evitar possíveis problemas com a validação dos documentos e garante que o estudante possa matricular-se em uma instituição de ensino superior ou obter um emprego que exija esses documentos. Além disso, a tradução dos diplomas também pode ser útil para solicitar bolsas de estudo ou outros benefícios financeiros no país de destino.',
            category: 1,
            steps: [],
            attchaments: []

        },
        {
            title: 'Fazer um check médico.',
            descriptions: 'Fazer um check-up médico antes de um intercâmbio é importante por diversas razões. Primeiramente, o estudante poderá ter certeza de que está em boas condições de saúde e não corre o risco de ter problemas médicos durante a estadia no exterior. Além disso, dependendo do país de destino, pode ser necessário apresentar um atestado médico para comprovar que o estudante não possui nenhuma doença contagiosa, como a tuberculose, por exemplo.',
            category: 3,
            steps: ['Clínico geral', 'Dermatologista', 'Odontologista', 'Oftalmologista', 'Otorrinolaringologista'],
            attchaments: []

        },
        {
            title: 'Ir ao dentista.',
            descriptions: 'Ir ao dentista antes de fazer um intercâmbio é importante para garantir que a saúde bucal esteja em dia e evitar problemas futuros durante a estadia em outro país. Uma consulta com o dentista pode identificar e tratar problemas como cáries, gengivite ou periodontite, evitando dor e desconforto que podem prejudicar a experiência no intercâmbio. Além disso, uma boa higiene bucal é importante para prevenir doenças bucais e sistêmicas, contribuindo para uma saúde geral melhor durante a estadia no exterior.',
            category: 3,
            steps: [],
            attchaments: []

        },
        {
            title: 'Fazer uma procuração.',
            descriptions: 'Fazer uma procuração antes de viajar é importante porque permite que uma pessoa de confiança, geralmente um advogado ou familiar próximo, possa agir em nome do viajante em situações específicas, caso ele não esteja presente.Isso é especialmente útil em situações de emergência, como problemas de saúde ou legais, em que o viajante pode não estar disponível para tomar decisões importantes ou lidar com certas questões.A procuração também pode ser usada para realizar transações financeiras em nome do viajante, como a venda de um imóvel ou a gestão de investimentos.Ter uma procuração válida pode ajudar a evitar atrasos e outros problemas legais durante a viagem.',
            category: 2,
            steps: [
                'Documento de identificação válido do outorgante (pessoa que está dando a procuração), como RG ou passaporte;',
                'Documento de identificação válido do procurador (pessoa que está recebendo a procuração), como RG ou passaporte;',
                'Comprovante de endereço atualizado do outorgante e do procurador;',
                'Informações detalhadas sobre a finalidade da procuração, incluindo o prazo de validade e as atividades permitidas;',
                'Formulário padrão de procuração, que pode variar dependendo do país e do tipo de procuração;',
                'Taxas e emolumentos a serem pagos, se aplicável;',
            ],
            attchaments: []

        },

    ]


}

module.exports = planneSuggestionsList
