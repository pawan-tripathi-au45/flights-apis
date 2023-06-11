


import React, { useState } from 'react';
import './FlightPrices.css';

const FlightPrices = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const fetchFlightPrices = async () => {
    // ...fetch flight prices logic...
        try {
      const response = await fetch(`http://localhost:4000/flights?source=${source}&destination=${destination}&date=${date}`);

      if (response.ok) {
        const data = await response.json();
        setPrices(data);
        setError('');
      } else {
        setError('Flight prices not found');
        setPrices(null);
      }
    } catch (error) {
      setError('An error occurred while fetching flight prices');
      setPrices(null);
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    setFormSubmitted(true);

    if (source.trim() !== '' && destination.trim() !== '' && date.trim() !== '') {
      fetchFlightPrices();
    } else {
      setError('Please fill out all fields');
    }
  };

  return (
    <div>
      <h2 style={{textAlign:"center", justifyContent:"center",flexDirection:"row",display:"flex"}}> Flight Prices</h2>
      <div style={{textAlign:"center", backgroundColor:"grey"}}>
        <div>
        <h2>
      data you can fill and check the data 
      </h2>
      <h3>source : Delhi </h3>
      <h3>destination : Jaipur </h3>
      <h3>date : 15 April 2023 </h3>
        </div>

        <div>
        <h2>
      data you can fill and check the data 
      </h2>
      <h3>source : Mumbai </h3>
      <h3>destination : Jaipur </h3>
      <h3>date : 16 April 2023 </h3>
     </div>
    
      </div>
    
      <form onSubmit={handleFormSubmit} className="flight-form">
        <div className="form-group">
          <label htmlFor="source">Source:</label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={event => setSource(event.target.value)}
            className={`form-control ${formSubmitted && source.trim() === '' ? 'is-invalid' : ''}`}
          />
          {formSubmitted && source.trim() === '' && <div className="invalid-feedback">Source is required</div>}
        </div>
        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={event => setDestination(event.target.value)}
            className={`form-control ${formSubmitted && destination.trim() === '' ? 'is-invalid' : ''}`}
          />
          {formSubmitted && destination.trim() === '' && <div className="invalid-feedback">Destination is required</div>}
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={event => setDate(event.target.value)}
            className={`form-control ${formSubmitted && date.trim() === '' ? 'is-invalid' : ''}`}
          />
          {formSubmitted && date.trim() === '' && <div className="invalid-feedback">Date is required</div>}
        </div>
        <button type="submit" className="btn btn-primary">Get Prices</button>
      </form>
      {error && <p>{error}</p>}
      {prices && (
        <div style={{textAlign:"center"}}>
             <ul>
          {Object.entries(prices).map(([airline, price]) => (
            <li key={airline}>
             
              {airline}: {price} : {destination} :{date}
            </li>
          ))}
        </ul>
            </div>
       
      )}
    </div>
  );
};

export default FlightPrices;
