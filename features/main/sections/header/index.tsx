import styles from '../../../../styles/Home.module.css';

const Header = () => {
    const networks = [
        {
            name: 'Facebook',
            link: 'https://www.facebook.com/TreinadorDegrandis/',
            icon: '/icons/facebook.svg',
        },
        {
            name: 'Instagram',
            link: 'https://www.instagram.com/nutrifabriciodegrandis/',
            icon: '/icons/instagram.svg',
        },
        {
            name: 'Lattes',
            link: 'http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4433881U7&tokenCaptchar=03AGdBq24x4dXBRqECk2b0mGC2wt0oFoeEefgxdGVYud668XbZ5dioOyJQkEz_LPgDcZmIMc1SX_dnSB2BYdM-CN83cPsRyHFJoOM-HSOGVCVpTL0z5WB7WSU6x_7u55X26L9rjzt_9R-ELP0dkptFPk39PhO14XuqZFCFe0e5M3NcosldC8WVZi5u1yG_R7-RsX-YDK2eFgyqJ_f2Ff5kdvShIFgNFsa3J2brAhndRH-b-a-padCUEglDJ2aIdG9R1V3fkMkS689pvJuw6MoHzMds_vYZPa1F_HyUKwnloUgJy1bbyAouq49NZeyruBVTqlx0LtElar1HjEHq_DBTKZl24ZothKfZckQCpUa3yyJbGDhypiixTEEvlBGENCIaG4idmPIfO_uXvJd4zPUhrGC8j6IDpeDDsxMZfqF1QnetJoegA2rgQGYC3FV2jAR9BlMTChFbG8dfioT3ot0uzfHNfIKnlzt1NuqaLg2RdXmxyqOCQlHcJTFJKMmI46n46tbBsjcTIKbbaz3LiWdcFAQvTHR2iem38g',
            icon: '/icons/lattes.png',
        },
        {
            name: 'Linkedin',
            link: 'https://www.linkedin.com/in/fabr%C3%ADcio-degrandis-864b0371/',
            icon: '/icons/linkedin.svg',
        },
    ]
    return (
        <div>
            <div style={{ padding: '20px', backgroundColor: 'rgb(152, 209,186, 0.15)', borderRadius: '4px', marginBottom: '20px', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img style={{ borderRadius: '50%', width: '80px', height: '80px' }} src="/images/nutri.png" alt="Fabricio Degrandis" />
                    <div>
                    <h4 style={{ marginBottom: '5px' }}>Fabrício Degrandis</h4>
                    <p>Nutricionista, Prof de Educação Física, EsP; MsC, Doutorando em nutri</p>
                    <h5>Uma dieta simples, um treino simples, mas EFICAZ!</h5>
                    <h5>É isso que eu quero te mostrar no ‘VOCÊ MAIS FORTE’!</h5>
                    </div>
                </div>
                <div className={styles.instructions}>
                    <div>
                        <h4>Instruções:</h4>
                        <p>1. Insira seu nome, peso, frequência de treino e nível de treino</p>
                        <p>2. Avalie sua meta calórica</p>
                        <p>3. Dê nome e horário para suas refeições</p>
                        <p>4. Selecione os melhores alimentos conforme as orientações!</p>
                        <p>5. Avalie as distribuições de macro nutrientes</p>
                        <p>6. Salve sua dieta em PDF</p>
                    </div>
                    <div style={{ width: '100%', justifySelf: 'flex-end' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', height: '100%', alignItems: 'flex-end' }}>
                            <p>Acompanhe o nutri nas redes:</p>
                            {networks?.map(network => (
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }} onClick={() => window.open(network.link)} key={network.link}>
                                    <h4>{network.name}</h4>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img style={{ borderRadius: '50%', width: '25px' }} src={network.icon} alt={network.name} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;