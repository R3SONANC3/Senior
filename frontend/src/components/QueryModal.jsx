import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import "./DatabasePage.css";

const QueryModal = ({ fetchData }) => {
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [scoreType, setScoreType] = useState("");
  const [scoreValue, setScoreValue] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  const scoreTypes = [
    { label: "Math Score", value: "math_score" },
    { label: "Science Score", value: "science_score" },
    { label: "English Score", value: "english_score" },
  ];

  const openQueryModal = () => {
    setIsQueryModalOpen(true);
  };

  const closeQueryModal = () => {
    setIsQueryModalOpen(false);
    setScoreType("");
    setScoreValue("");
    setQueryResults([]);
  };

  const handleSearch = () => {
    axios
      .get(`https://senior-project-production-336b.up.railway.app/queryData?scoreType=${scoreType}&scoreValue=${scoreValue}`)
      .then((response) => {
        setQueryResults(response.data);
      })
      .catch((error) => {
        console.error("Error querying data:", error);
        alert("Failed to query data. Please try again later.");
      });
  };

  const renderQueryResults = () => {
    return (
      <table className="p-table">
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
          {queryResults.map((item, index) => (
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
    );
  };

  return (
    <div>
      <Button label="Query Student" icon="pi pi-search" onClick={openQueryModal} className="p-button-sm" />
      
      <Dialog
        header="Query Student"
        visible={isQueryModalOpen}
        style={{ width: '600px' }}
        modal
        onHide={closeQueryModal}
        footer={
          <div>
            <Button label="Close" icon="pi pi-times" onClick={closeQueryModal} className="p-button-text p-button-sm" />
            <Button label="Search" icon="pi pi-check" onClick={handleSearch} className="p-button-sm" />
          </div>
        }
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="score_type">Score Type</label>
            <Dropdown
              id="score_type"
              value={scoreType}
              options={scoreTypes}
              onChange={(e) => setScoreType(e.value)}
              placeholder="Select Score Type"
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="score_value">Score Value</label>
            <input
              id="score_value"
              value={scoreValue}
              onChange={(e) => setScoreValue(e.target.value)}
              placeholder="Enter Score Value"
              className="score-input" // Added custom class
            />
          </div>
          <div className="p-field p-col-12">
            <Button label="Search" icon="pi pi-check" onClick={handleSearch} className="p-button-sm" />
          </div>
        </div>

        <div className="p-grid">
          <div className="p-col-12">
            {queryResults.length > 0 ? (
              renderQueryResults()
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default QueryModal;
