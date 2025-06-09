import React from 'react';
import './Contacts.css';
import { FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contacts = ({ contacts }) => {
    const getIconForType = (type) => {
        switch (type.toLowerCase()) {
            case 'instagram':
                return <FaInstagram className="contact-icon" />;
            case 'whatsapp':
                return <FaWhatsapp className="contact-icon" />;
            case 'email':
                return <FaEnvelope className="contact-icon" />;
            case 'endereço':
                return <FaMapMarkerAlt className="contact-icon" />;
            default:
                return null;
        }
    };

    return (
        <div className="contacts-container">
            {contacts.length ? (
                <>
                    <div className="contacts-header">
                        <h1>Entre em Contato</h1>
                        <p className="subtitle">Responderemos o mais breve possível</p>
                    </div>
                    <div className="contacts-grid">
                        {contacts.map((contact, i) => (
                            <div key={i} className="contact-card">
                                {contact['Tipo'] && (
                                    <div className="contact-header">
                                        {getIconForType(contact['Tipo'])}
                                        <h3>{contact['Tipo']}</h3>
                                    </div>
                                )}
                                {contact['Valor'] && (
                                    <p>
                                        {contact['Link'] ? (
                                            <a
                                                href={contact['Link']}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="contact-link"
                                            >
                                                {contact['Valor']}
                                            </a>
                                        ) : (
                                            contact['Valor']
                                        )}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            ) : <></>}
        </div>
    );
};

export default Contacts;