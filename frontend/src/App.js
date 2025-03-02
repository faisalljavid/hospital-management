import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HospitalForm from './components/HospitalForm';
import HospitalList from './components/HospitalList';
import HospitalDetails from './pages/HospitalDetails';
import EditHospital from './pages/EditHospital';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>Hospital Management System</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/add">Add Hospital</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HospitalList />} />
            <Route path="/add" element={<HospitalForm />} />
            <Route path="/hospital/:id" element={<HospitalDetails />} />
            <Route path="/edit/:id" element={<EditHospital />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;