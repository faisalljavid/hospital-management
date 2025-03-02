import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HospitalDetails = () => {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHospital = async () => {
            try {
                // We'll need to add an endpoint to get a specific hospital by ID  
                const response = await axios.get(`http://localhost:5000/api/v1/hospitals/${id}`);
                setHospital(response.data.data);
            } catch (err) {
                setError('Failed to fetch hospital details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHospital();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!hospital) return <div>Hospital not found</div>;

    return (
        <div className="hospital-detail-container">
            <h2>{hospital.name}</h2>

            <div className="hospital-main-image">
                <img src={hospital.image} alt={hospital.name} />
            </div>

            <div className="hospital-info-grid">
                <div className="info-card">
                    <h3>Location</h3>
                    <p>{hospital.city}</p>
                </div>

                <div className="info-card">
                    <h3>Rating</h3>
                    <p>{hospital.rating}/100</p>
                </div>

                <div className="info-card">
                    <h3>Specialities</h3>
                    <p>{hospital.speciality.join(', ')}</p>
                </div>
            </div>

            {hospital.details && (
                <div className="hospital-details-section">
                    <h3>About Hospital</h3>
                    <p>{hospital.details.description}</p>

                    <div className="hospital-stats">
                        <div className="stat">
                            <span className="stat-value">{hospital.details.numberOfDoctors}</span>
                            <span className="stat-label">Doctors</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{hospital.details.numberOfDepartments}</span>
                            <span className="stat-label">Departments</span>
                        </div>
                    </div>

                    {hospital.details.images && hospital.details.images.length > 0 && (
                        <div className="details-gallery">
                            <h3>Gallery</h3>
                            <div className="image-grid">
                                {hospital.details.images.map((img, index) => (
                                    <img key={index} src={img} alt={`${hospital.name} ${index + 1}`} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HospitalDetails;