import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function PredictionCard({ result, loading }) {
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <LoadingSpinner />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center text-muted mt-5 fs-5">
        <h2>Enter your skills and experience below to <br />get job predictions and career advice.</h2>
      </div>
    );
  }

  return (
    <div className="card shadow-sm p-4">
      <h5 className="card-title fs-4 fw-bold ">Predicted Salary</h5>
      <p className="fs-3 fw-bold text-success">₹{result.predicted_salary}</p>
      <p className="text-muted mb-1">(Estimated Range: ₹{result.salary_range})</p>
      <h6 className="mt-4 fw-semibold">Companies That May Hire You:</h6>
      <p className="fs-5 text-primary fw-bold">
        {result.companies}
      </p>
      <h5 className="mt-4 fw-semibold">AI Career Advice:</h5>
      <p className="text-muted fs-5" style={{ whiteSpace: 'pre-line' }}>{result.advice}</p>
    </div>
  );
}