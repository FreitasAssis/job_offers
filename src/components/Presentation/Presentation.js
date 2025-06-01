import React, { useState, useEffect } from 'react';
import './Presentation.css';
import fetchData from '../../utils/Functions';

const Presentation = () => {
    const [infos, setInfos] = useState([]);
    const [services, setServices] = useState([]);

    const loadData = async () => {
        const result = await fetchData('Sobre');
        if (result.status === 'success') {
            setInfos(result.data);
        }

        const servicos = await fetchData('Serviços');
        if (servicos.status === 'success') {
            setServices(servicos.data);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="community-presentation">
            {infos.length && services.length ? (
                <>
                    <div className="presentation-header">
                        <h1>{infos[0]['Título']}</h1>
                        <p className="subtitle">{infos[0]['Subtítulo']}</p>
                    </div>

                    <div className="presentation-content">
                        <div className="mission-section">
                            <h2>Nossa Missão</h2>
                            <p>{infos[0]['Missão']}</p>
                        </div>

                        <div className="about-section">
                            <h2>Sobre o Conselho</h2>
                            <p>{infos[0]['Sobre']}</p>
                        </div>

                        <div className="services-section">
                            <h2>Nossos Serviços</h2>
                            <ul>
                                {services.map((service, i) => (
                                    <li key={i}>{service['Serviços']}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            ) : <></>}

        </div>
    );
};

export default Presentation;