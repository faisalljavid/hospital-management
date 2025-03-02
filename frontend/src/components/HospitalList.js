import React, { useState, useEffect } from 'react';
import { getHospitalsByCity, deleteHospital } from '../services/api';
import { Link } from 'react-router-dom';

const HospitalList = () => {
    const [hospitals, setHospitals] = useState([]);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchHospitals = async () => {
        if (!city) return;

        setLoading(true);
        try {
            const response = await getHospitalsByCity(city);
            setHospitals(response.data.data);
        } catch (error) {
            console.error('Error fetching hospitals:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (city) {
            fetchHospitals();
        }
    }, [city]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this hospital?')) {
            try {
                await deleteHospital(id);
                setHospitals(hospitals.filter(hospital => hospital._id !== id));
                alert('Hospital deleted successfully');
            } catch (error) {
                alert('Error deleting hospital');
                console.error(error);
            }
        }
    };

    return (
        <div className="hospitals-container">
            <h2>Find Hospitals</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={fetchHospitals}>Search</button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="hospitals-list">
                    {hospitals.length === 0 ? (
                        <p>No hospitals found in {city}</p>
                    ) : (
                        hospitals.map(hospital => (
                            <div key={hospital._id} className="hospital-card">
                                <img src={hospital.image} alt={hospital.name} />
                                <div className="hospital-info">
                                    <h3>{hospital.name}</h3>
                                    <p>City: {hospital.city}</p>
                                    <p>Specialities: {hospital.speciality.join(', ')}</p>
                                    <p>Rating: {hospital.rating}/100</p>

                                    <div className="card-actions">
                                        <Link to={`/hospital/${hospital._id}`} className="btn-view">View Details</Link>
                                        <Link to={`/edit/${hospital._id}`} className="btn-edit">Edit</Link>
                                        <button onClick={() => handleDelete(hospital._id)} className="btn-delete">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default HospitalList;
