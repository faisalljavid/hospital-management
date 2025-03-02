import React, { useState } from 'react';
import { createHospital } from '../services/api';

const HospitalForm = () => {
    const [hospital, setHospital] = useState({
        name: '',
        city: '',
        image: '',
        speciality: [],
        rating: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHospital({ ...hospital, [name]: value });
    };

    const handleSpecialityChange = (e) => {
        const values = Array.from(e.target.selectedOptions, option => option.value);
        setHospital({ ...hospital, speciality: values });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createHospital(hospital);
            alert('Hospital created successfully!');
            setHospital({ name: '', city: '', image: '', speciality: [], rating: 0 });
        } catch (error) {
            alert('Error creating hospital');
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <h2>Add New Hospital</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Hospital Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={hospital.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={hospital.city}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={hospital.image}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="speciality">Specialities</label>
                    <select
                        id="speciality"
                        name="speciality"
                        multiple
                        value={hospital.speciality}
                        onChange={handleSpecialityChange}
                        required
                    >
                        <option value="Heart">Heart</option>
                        <option value="Ear">Ear</option>
                        <option value="Eye">Eye</option>
                        <option value="Brain">Brain</option>
                        <option value="Kidney">Kidney</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={hospital.rating}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        required
                    />
                </div>

                <button type="submit" className="btn-submit">Create Hospital</button>
            </form>
        </div>
    );
};

export default HospitalForm;