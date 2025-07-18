import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import InputForm from '../components/InputForm';
import PredictionCard from '../components/PredictionCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResult = async (dataPromise) => {
    setLoading(true);
    const data = await dataPromise;
    setResult(data);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        {loading ? <LoadingSpinner /> : <PredictionCard result={result} />} {/* ✅ use here */}
      </div>
      <div style={{ marginBottom: '90px' }}></div> {/* Spacer for fixed form */}
      <InputForm onResult={handleResult} />
    </>
  );
}