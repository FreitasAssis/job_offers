import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './JobOffers.css';
import fetchData from '../../utils/Functions';

const JobOffers = () => {
    const [jobOffers, setJobOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [curriculumFile, setCurriculumFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLocation, setFilterLocation] = useState('');

    const filteredJobs = jobOffers.filter(job => {
        const matchesSearch = job['Job Title'].toLowerCase().includes(searchTerm.toLowerCase()) ||
            job['Company'].toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = !filterLocation || job['Location'] === filterLocation;
        return matchesSearch && matchesLocation;
    });

    const locations = [...new Set(jobOffers.map(job => job['Location']))];

    const openModal = (offer) => {
        setSelectedOffer(offer);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedOffer(null);
        setCurriculumFile(null);
        setMessage('');
        setModalIsOpen(false);
    };

    const handleCurriculumChange = (event) => {
        setCurriculumFile(event.target.files[0]);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const validateForm = () => {
        if (!curriculumFile) {
            alert('Por favor, envie seu currículo');
            return false;
        }
        if (!message.trim()) {
            alert('Por favor, escreva uma mensagem');
            return false;
        }
        return true;
    };

    const sendApplication = () => {
        if (!validateForm()) return;

        // Here you would implement the actual email sending logic
        console.log('Enviando candidatura:', {
            email: selectedOffer['Email'],
            curriculumFile,
            message,
        });

        alert('Candidatura enviada com sucesso!');
        closeModal();
    };

    const loadData = async () => {
        setLoading(true);
        const result = await fetchData('Vagas');
        if (result.status === 'success') {
            setJobOffers(result.data);
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return <div className="loading">Carregando vagas...</div>;
    }

    if (error) {
        return <div className="error">Erro ao carregar vagas. Por favor, tente novamente mais tarde.</div>;
    }

    return (
        <div>
            <h1>Vagas de Emprego</h1>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Buscar vagas ou empresas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="location-filter"
                >
                    <option value="">Todas as Localidades</option>
                    {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
            </div>
            <div className="job-offers-container">
                {filteredJobs.map((job, index) => (
                    <div key={index} className="job-offer-card">
                        {job['Image'] && <img src={job['Image']} alt={job['Job Title']} />}
                        <h3>{job['Job Title']}</h3>
                        <p className="company">{job['Company']}</p>
                        <p className="location">{job['Location']}</p>
                        <p className="salary">R$ {job['Salary']}</p>
                        <button
                            className="button button-primary"
                            onClick={() => openModal(job)}
                        >
                            Candidatar-se
                        </button>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Candidatar-se para a Vaga"
                className="modal-content"
            >
                <h2>Candidatar-se para {selectedOffer?.['Job Title']}</h2>
                <form>
                    <div className="form-group">
                        <label>Currículo:</label>
                        <input
                            type="file"
                            onChange={handleCurriculumChange}
                            accept=".pdf,.doc,.docx"
                        />
                    </div>
                    <div className="form-group">
                        <label>Mensagem:</label>
                        <textarea
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Escreva sua mensagem de candidatura aqui..."
                        />
                    </div>
                    <div className="button-group">
                        <button
                            type="button"
                            className="button button-secondary"
                            onClick={closeModal}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="button button-primary"
                            onClick={sendApplication}
                        >
                            Enviar Candidatura
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default JobOffers;
