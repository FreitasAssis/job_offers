import React, { useState, useEffect } from 'react';
import './App.css';
import JobOffers from './components/JobOffers/JobOffers';
import Presentation from './components/Presentation/Presentation';
import Contacts from './components/Contacts/Contacts';
import fetchData from './utils/Functions';

function App() {
  const [jobOffers, setJobOffers] = useState([]);
  const [infos, setInfos] = useState([]);
  const [services, setServices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const result = await fetchData(['Vagas', 'Sobre', 'Serviços', 'Contatos']);
    if (result.status === 'success') {
      setJobOffers(result.jobOffers);
      setInfos(result.infos);
      setServices(result.services);
      setContacts(result.contacts);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">Erro ao carregar vagas. Por favor, tente novamente mais tarde.</div>;
  }

  return (
    <div className="App">
      <Presentation infos={infos} services={services} />
      <JobOffers jobOffers={jobOffers} />
      <Contacts contacts={contacts} />
    </div>
  );
}

export default App;
