import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Modal from 'react-modal';

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

    useEffect(() => {
        const fetchJobOffers = async () => {
            try {
                const excelFileUrl = 'https://docs.google.com/spreadsheets/d/1wnaDlUugyJnVAydX3sGxq91d2OOOOAS9-I1r2yQTHp4/export?format=xlsx';
                const response = await fetch(excelFileUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch job offers');
                }
                const buffer = await response.arrayBuffer();
                const workbook = XLSX.read(buffer, { type: 'buffer' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const data = XLSX.utils.sheet_to_json(worksheet);
                setJobOffers(data);
                setError(null);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to load job offers. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobOffers();
    }, []);

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
