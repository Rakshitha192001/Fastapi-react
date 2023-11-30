import './App.css'
import React from 'react';
import { useState,useEffect } from 'react';
import api from './api';
import Getmethod from './Components/Getmethod';




function App() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    email:'',
    is_income: false, 
  });
  

  const fetchTransactions = async () => {
    const response = await api.get('/transactions');
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm({
      ...form,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/transactions', form);
    fetchTransactions();
    setForm({
      name: '',
      description: '',
      email:'',
      is_income: false,
    });
  };
  return (
    <>
    
    
    <nav className="nav-bar">
    <b><div>Employee App</div></b>
  </nav>

  <div className="form-container">
    <form onSubmit={handleFormSubmit}>
      <label>
        Name:<br></br>
        <input type="text" placeholder="name" name="name" value={form.amount} onChange={handleInputChange} />
      </label>
      <br></br>
      <label>
        Description:<br></br>
        <input type="text" placeholder="description" name="description" value={form.category} onChange={handleInputChange} />
      </label>
      <br></br>
      <label>
        Email:<br></br>
        <input type="text" name="email" placeholder="Email" value={form.email} onChange={handleInputChange} />
      </label>
       <br></br>
      <label>
        Income:
        <input type="checkbox" name="is_income" checked={form.is_income} onChange={handleInputChange} />
      </label>
       <br></br>
      <button type="submit"  className='post-button' >SUBMIT</button>
    </form> 
  </div>

  <Getmethod />

  </>
  )
}

export default App;

