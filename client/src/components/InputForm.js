// src/components/InputForm.js
import React, { useState } from 'react';
import axios from 'axios';

export default function InputForm({ onResult }) {
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = async () => {
    if (!skills || !experience) return alert('Please enter both skills and experience.');

    try {
      const response = await axios.post('http://localhost:5000/api/predict', {
        skills: skills.split(',').map((s) => s.trim()),
        features: [parseFloat(experience), 0]
      });
      onResult(response.data);
    } catch (err) {
      alert('Error fetching prediction');
    }
  };

  return (
    <div
      className="container-fluid bg-light position-fixed bottom-0 w-100 p-4"
      style={{ boxShadow: '0 -1px 5px rgba(0,0,0,0.1)', zIndex: 10 }}
    >
      <div className="row g-3">
        <div className="col-md">
          <div className="form-floating">
            <input
              type="text"
              className="form-control fs-5"
              id="floatingInputSkill"
              placeholder="e.g. React, Node"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <label htmlFor="floatingInputSkill">Enter your skills</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating">
            <input
              type="number"
              className="form-control fs-5"
              id="floatingInputExp"
              placeholder="Experience in years"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
            <label htmlFor="floatingInputExp">Experience (years)</label>
          </div>
        </div>
        <div className="col-md-auto d-flex align-items-end">
          <button className="btn btn-primary btn-lg px-4" onClick={handleSubmit}>
            Get Prediction
          </button>
        </div>
      </div>
    </div>
  );
}
