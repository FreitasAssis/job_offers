import React, { useState, useEffect } from 'react';
import './Contacts.css';
import fetchData from '../../utils/Functions';
import { FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);

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

    const loadData = async () => {
        const result = await fetchData('Contatos');
        if (result.status === 'success') {
            setContacts(result.data);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="contacts-container">
            {contacts.length ? (
                <>
                    <div className="contacts-header">
                        <h2>Entre em Contato</h2>
                        <p className="subtitle">Estamos aqui para ajudar</p>
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