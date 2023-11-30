import React from 'react'
import { useState,useEffect } from 'react';
import api from '../api';
import './Getmethod.css'

const  Getmethod = () => {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        const response = await api.get('/transactions');
        setTransactions(response.data);
      };

      useEffect(() => {
        fetchTransactions();
      }, []);

return (
  <>
    <div className='tablee'>
<table className="table-container">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Description</th>
      <th>Email</th>
      <th>Income</th>
    </tr>
  </thead>
  <tbody>
    {transactions.map((transaction)=>(
      <tr>
        <td>{transaction.id}</td> 
        <td>{transaction.name}</td>
        <td>{transaction.description}</td>
        <td>{transaction.email}</td>
        <td>{transaction.is_income? 'Yes':'No'}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>  


</>


  )
}

export default  Getmethod
