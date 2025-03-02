import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateHospital, addHospitalDetails } from '../services/api';
import axios from 'axios';

const EditHospital = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [hospitalData, setHospitalData] = useState({
        rating: 0,
        image: ''
    });

    const [detailsData, setDetailsData] = useState({
        description: '',
        images: [''],
        numberOfDoctors: 0,
        numberOfDepartments: 0
    });

    useEffect(() => {
        const fetchHospital = async () => {
            try {
                // We'll need to add an endpoint to get a specific hospital by ID  
                const response = await axios.get(`http://localhost:5000/api/v1/hospitals/${id}`);
                const hospital = response.data.data;

                setHospitalData({
                    rating: hospital.rating,
                    image: hospital.image
                });

                if (hospital.details) {
                    setDetailsData({
                        description: hospital.details.description || '',
                        images: hospital.details.images || [''],
                        numberOfDoctors: hospital.details.numberOfDoctors || 0,
                        numberOfDepartments: hospital.details.numberOfDepartments || 0
                    });
                }
            } catch (err) {
                setError('Failed to fetch hospital details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHospital();
    }, [id]);

    const handleHospitalChange = (e) => {
        const { name, value } = e.target;
        setHospitalData({ ...hospitalData, [name]: value });
    };

    const handleDetailsChange = (e) => {
        const { name, value } = e.target;
        setDetailsData({ ...detailsData, [name]: value });
    };

    const handleImageChange = (index, value) => {
        const newImages = [...detailsData.images];
        newImages[index] = value;
        setDetailsData({ ...detailsData, images: newImages });
    };

    const addImageField = () => {
        setDetailsData({ ...detailsData, images: [...detailsData.images, ''] });
    };

    const removeImageField = (index) => {
        const newImages = detailsData.images.filter((_, i) => i !== index);
        setDetailsData({ ...detailsData, images: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateHospital(id, hospitalData);
            await addHospitalDetails(id, {
                description: detailsData.description,
                images: detailsData.images.filter(img => img.trim() !== ''),
                numberOfDoctors: parseInt(detailsData.numberOfDoctors),
                numberOfDepartments: parseInt(detailsData.numberOfDepartments)
            });

            alert('Hospital updated successfully');
            navigate(`/hospital/${id}`);
        } catch (error) {
            alert('Error updating hospital');
            console.error(error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="edit-hospital-container">
            <h2>Edit Hospital</h2>

            <form onSubmit={handleSubmit}>
                <h3>Basic Information</h3>
                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={hospitalData.rating}
                        onChange={handleHospitalChange}
                        min="0"
                        max="100"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Main Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={hospitalData.image}
                        onChange={handleHospitalChange}
                        required
                    />
                </div>

                <h3>Additional Details</h3>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={detailsData.description}
                        onChange={handleDetailsChange}
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="numberOfDoctors">Number of Doctors</label>
                    <input
                        type="number"
                        id="numberOfDoctors"
                        name="numberOfDoctors"
                        value={detailsData.numberOfDoctors}
                        onChange={handleDetailsChange}
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="numberOfDepartments">Number of Departments</label>
                    <input
                        type="number"
                        id="numberOfDepartments"
                        name="numberOfDepartments"
                        value={detailsData.numberOfDepartments}
                        onChange={handleDetailsChange}
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label>Gallery Images</label>
                    {detailsData.images.map((image, index) => (
                        <div key={index} className="image-input-group">
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                placeholder="Image URL"
                            />
                            <button
                                type="button"
                                onClick={() => removeImageField(index)}
                                className="btn-remove"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addImageField}
                        className="btn-add"
                    >
                        Add Another Image
                    </button>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-save">Save Changes</button>
                    <button
                        type="button"
                        onClick={() => navigate(`/hospital/${id}`)}
                        className="btn-cancel"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditHospital;