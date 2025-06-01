import React from 'react';
import './App.css';
import JobOffers from './components/JobOffers/JobOffers';
import Presentation from './components/Presentation/Presentation';
import Contacts from './components/Contacts/Contacts';

function App() {
  return (
    <div className="App">
      <Presentation />
      <JobOffers />
      <Contacts />
    </div>
  );
}

export default App;
