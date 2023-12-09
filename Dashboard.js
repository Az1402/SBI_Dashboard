import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function SbiDashboard() {
  const [selectedQuarter, setSelectedQuarter] = useState(''); 
  const [metricsData, setMetricsData] = useState({
    revenue: 0,
    netIncome: 0,
    netProfit: 0,
    operatingIncome: 0,
  });

  useEffect(() => {
    if (selectedQuarter) { 
      fetch(`/api/sbi/metrics?quarter=${selectedQuarter}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setMetricsData(data); 
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedQuarter]); 

  const handleQuarterChange = (event) => {
    setSelectedQuarter(event.target.value); 
  };

  const formatNumber = (number) => {
    return number.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  return (
    <div className="sbi-dashboard">
      <div className='title'>
      <img className="logo" src="https://imgs.search.brave.com/k4F0ErkNdDeBnZDZOk7QB9PAgMw59cEUzUmBCjuWpz4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL1Mvc2JpLWxv/Z28tNUEzRTdEODFE/NC1zZWVrbG9nby5j/b20ucG5n" alt="loading" />
      <h1 className='heading'>SBI Dashboard</h1>
      </div>
      <div className="quarter-selection">
        <span className='list'>Select Quarter : </span>
        <select value={selectedQuarter} onChange={handleQuarterChange}>
          <option value="">Select Quarter</option>
          <option value="Quarter 1 (Dec 22)">(Q 1) Dec 2022</option>
          <option value="Quarter 2 (Mar 23)">(Q 2) Mar 2023</option>
          <option value="Quarter 3 (Jun 23)">(Q 3) Jun 2023</option>
          <option value="Quarter 4 (Sep 23)">(Q 4) Sep 2023</option>
        </select>
      </div>
      {selectedQuarter && ( 
        <div className="metrics-container">
          <div className="metric-tile">
            <h3>Revenue</h3>
            <p>{formatNumber(metricsData.revenue)} B</p>
          </div>
          <div className="metric-tile">
            <h3>Net Income</h3>
            <p>{formatNumber(metricsData.netIncome)} B</p>
          </div>
          <div className="metric-tile">
            <h3>Net Profit</h3>
            <p>{metricsData.netProfit}%</p>
          </div>
          <div className="metric-tile">
            <h3>Operating Income</h3>
            <p>{formatNumber(metricsData.operatingIncome)} B</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SbiDashboard;
