import React from 'react';
import './Location.css';

const Location = ({ location }) => {
    return (
        <div className="map-container">
            <div className="map-header">
                <h1>Nossa Localização</h1>
                <p className="subtitle">Estamos aqui para ajudar</p>
            </div>
            {location.length ? (
                <>
                    <div className="map-wrapper">
                        {location.map((local, i) => (
                            <>
                                <iframe
                                    key={i}
                                    title="Location Map"
                                    width="100%"
                                    height="400"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    src={`${local['Link']}&output=embed`}
                                />
                                <p className="address-text">{local['Valor']}</p>
                            </>
                        ))}
                    </div>
                </>
            ) : <></>}
        </div>
    );
};

export default Location;