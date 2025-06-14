import React, { useState } from 'react';
import Modal from 'react-modal';
import './JobOffers.css';

const JobOffers = ({ jobOffers }) => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [curriculumFile, setCurriculumFile] = useState(null);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [candidateName, setCandidateName] = useState('');
    const [candidateEmail, setCandidateEmail] = useState('');
    const MAX_FILE_SIZE = 100 * 1024;

    const filteredJobs = jobOffers.filter(job => {
        const matchesSearch = job['Vaga'].toLowerCase().includes(searchTerm.toLowerCase()) ||
            job['Empresa'].toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = !filterLocation || job['Local'] === filterLocation;
        return matchesSearch && matchesLocation;
    })
        .sort((a, b) => a['Vaga'].localeCompare(b['Vaga']));;

    const locations = [...new Set(jobOffers.map(job => job['Local']))];

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
        if (!candidateName?.trim()) {
            alert('Por favor, insira seu nome');
            return false;
        }
        if (!candidateEmail?.trim()) {
            alert('Por favor, insira seu email');
            return false;
        }
        if (!curriculumFile) {
            alert('Por favor, envie seu currículo');
            return false;
        }
        if (curriculumFile.size > MAX_FILE_SIZE) {
            alert(`O arquivo é muito grande. Por favor, envie um arquivo menor que 100KB.`);
            return false;
        }
        if (!message.trim()) {
            alert('Por favor, escreva uma mensagem');
            return false;
        }
        return true;
    };

    const sendApplication = async () => {
        if (!validateForm()) return;

        try {
            const reader = new FileReader();
            reader.readAsDataURL(curriculumFile);

            reader.onload = async () => {
                const response = await fetch('/api/send-application', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to_email: selectedOffer['Email'],
                        from_name: candidateName,
                        from_email: candidateEmail,
                        job_title: selectedOffer['Vaga'],
                        company: selectedOffer['Empresa'],
                        message,
                        curriculum: reader.result,
                        curriculum_name: curriculumFile.name,
                        curriculum_type: curriculumFile.type,
                    }),
                });

                if (response.ok) {
                    alert('Candidatura enviada com sucesso!');
                    closeModal();
                } else {
                    alert('Erro ao enviar candidatura!');
                }
            };
        } catch (error) {
            alert('Erro ao processar candidatura!');
        }
    };

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
                        {<img src={job['Imagem'] ? job['Imagem'] : 'https://fgtas.rs.gov.br/upload/recortes/201612/16141311_35575_GD.jpg'} alt={job['Vaga']} />}
                        <h3>{job['Vaga']}</h3>
                        <p className="company">{job['Empresa']}</p>
                        <p className="location">{job['Local']}</p>
                        {job['Salário'] ? <p className="salary">{!isNaN(job['Salário']) ? 'R$ ' : ''}{job['Salário']}</p> : <p className="salary">Não informado</p>}
                        <button
                            className="button button-primary"
                            onClick={() => job['Site'] ? window.open(job['Site'], '_blank') : openModal(job)}
                        >
                            {job['Site'] ? 'Ver vaga' : 'Candidatar-se'}
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
                <h2>Candidatar-se para {selectedOffer?.['Vaga']}</h2>
                <form>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input
                            type="text"
                            value={candidateName}
                            onChange={(e) => setCandidateName(e.target.value)}
                            placeholder="Seu nome completo"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={candidateEmail}
                            onChange={(e) => setCandidateEmail(e.target.value)}
                            placeholder="Seu email para contato"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Currículo:</label>
                        <input
                            type="file"
                            onChange={handleCurriculumChange}
                            accept=".pdf,.doc,.docx"
                        />
                        <small className="file-hint">
                            Tamanho máximo permitido: 100KB
                        </small>
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
