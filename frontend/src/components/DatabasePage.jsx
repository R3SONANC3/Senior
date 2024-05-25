import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DatabasePage.css';
import InsertModal from './InsertModal';

const initialFormData = {
  id: '',
  first_name: '',
  last_name: '',
  math_score: '',
  science_score: '',
  english_score: ''
};

function DatabasePage() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://senior-project-production-336b.up.railway.app/getData')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Please try again later.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    axios.post('https://senior-project-production-336b.up.railway.app/insertData', formData)
      .then(response => {
        console.log(response.data);
        fetchData();
        setIsModalOpen(false);
        setFormData(initialFormData);
      })
      .catch(error => {
        console.error('Error inserting data:', error);
        alert('Failed to insert data. Please try again later.');
      });
  };

  return (
    <div>
      <h2>Welcome to Database</h2>
      <div className="button-group">
        <button type="button" onClick={() => setIsModalOpen(true)}>Insert</button>
        <button type="button">Query</button>
        <button type="button">Update</button>
        <button type="button">Delete</button>
        <button type="button" onClick={fetchData}>Show Data</button>
        <button type="button" onClick={() => setData([])}>Clear</button>
      </div>
      <br />
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Math Score</th>
              <th>Science Score</th>
              <th>English Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.student_id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.math_score}</td>
                <td>{item.science_score}</td>
                <td>{item.english_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InsertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
      />
    </div>
  );
}

export default DatabasePage;
