import React, { useState, useEffect } from 'react';
import './App.css';
import JobOffers from './components/JobOffers/JobOffers';
import Presentation from './components/Presentation/Presentation';
import Contacts from './components/Contacts/Contacts';
import Location from './components/Location/Location';
import fetchData from './utils/Functions';
import { ClockLoader } from 'react-spinners';
import { CSSTransition } from 'react-transition-group';

function App() {
  const [jobOffers, setJobOffers] = useState([]);
  const [infos, setInfos] = useState([]);
  const [services, setServices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const result = await fetchData(['Vagas', 'Sobre', 'Serviços', 'Contatos', 'Localização']);
    if (result.status === 'success') {
      setJobOffers(result.jobOffers);
      setInfos(result.infos);
      setServices(result.services);
      setContacts(result.contacts);
      setLocation(result.location);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClockLoader loading={loading} size={75} />
      </div>
    );
  }

  if (error) {
    return <div className="error">Erro ao carregar vagas. Por favor, tente novamente mais tarde.</div>;
  }

  return (
    <CSSTransition
      in={!loading}
      timeout={1000}
      classNames="fade"
      unmountOnExit
    >
      <div className="App">
        <Presentation infos={infos} services={services} />
        <JobOffers jobOffers={jobOffers} />
        <Contacts contacts={contacts} />
        <Location location={location} />
      </div>
    </CSSTransition>
  );
}

export default App;
