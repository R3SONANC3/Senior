import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";

const QueryModal = ({ fetchData }) => {
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [scoreType, setScoreType] = useState("");
  const [scoreValue, setScoreValue] = useState("");

  const openQueryModal = () => {
    setIsQueryModalOpen(true);
  };

  const closeQueryModal = () => {
    setIsQueryModalOpen(false);
    setScoreType("");
    setScoreValue("");
  };

  const handleSearch = () => {
    axios
      .get(`https://senior-project-production-336b.up.railway.app/queryData?scoreType=${scoreType}&scoreValue=${scoreValue}`)
      .then((response) => {
        displayQueryResults(response.data);
        closeQueryModal();
      })
      .catch((error) => {
        console.error("Error querying data:", error);
        alert("Failed to query data. Please try again later.");
      });
  };

  const displayQueryResults = (data) => {
    // Handle displaying the query results, you can implement as per your requirement
    console.log(data);
  };

  return (
    <div>
      <Button label="Query Student" icon="pi pi-search" onClick={openQueryModal} className="p-button-sm" />
      
      <Dialog
        header="Query Student"
        visible={isQueryModalOpen}
        style={{ width: '400px' }}
        modal
        onHide={closeQueryModal}
        footer={
          <div>
            <Button label="Close" icon="pi pi-times" onClick={closeQueryModal} className="p-button-text p-button-sm" />
            <Button label="Search" icon="pi pi-check" onClick={handleSearch} className="p-button-sm" />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="score_type">Score Type</label>
            <InputText
              id="score_type"
              value={scoreType}
              onChange={(e) => setScoreType(e.target.value)}
              placeholder="Enter Score Type"
            />
          </div>
          <div className="p-field">
            <label htmlFor="score_value">Score Value</label>
            <InputText
              id="score_value"
              value={scoreValue}
              onChange={(e) => setScoreValue(e.target.value)}
              placeholder="Enter Score Value"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default QueryModal;
