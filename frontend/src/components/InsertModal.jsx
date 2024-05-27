import React, { useState } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

const InsertModal = ({ fetchData }) => {
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    math_score: "",
    science_score: "",
    english_score: "",
  });

  const openInsertModal = () => {
    setIsInsertModalOpen(true);
  };

  const closeInsertModal = () => {
    setIsInsertModalOpen(false);
    setFormData({
      student_id: "",
      first_name: "",
      last_name: "",
      math_score: "",
      science_score: "",
      english_score: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .post("https://senior-project-production-336b.up.railway.app/insertData", formData)
      .then((response) => {
        console.log("Student inserted successfully:", response.data);
        closeInsertModal();
        fetchData();
      })
      .catch((error) => {
        console.error("Error inserting student:", error);
        alert("Failed to insert student. Please try again later.");
      });
  };

  return (
    <div>
      <Button label="Insert Student" icon="pi pi-plus" onClick={openInsertModal} className="p-button-sm" />
      
      <Dialog
        header="Insert Student"
        visible={isInsertModalOpen}
        style={{ width: '400px' }}
        modal
        onHide={closeInsertModal}
        footer={
          <div>
            <Button label="Close" icon="pi pi-times" onClick={closeInsertModal} className="p-button-text p-button-sm" />
            <Button label="Insert" icon="pi pi-check" onClick={handleSubmit} className="p-button-sm" />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="student_id">Student ID</label>
            <InputText
              id="student_id"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              placeholder="Enter Student ID"
            />
          </div>
          <div className="p-field">
            <label htmlFor="first_name">First Name</label>
            <InputText
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter First Name"
            />
          </div>
          <div className="p-field">
            <label htmlFor="last_name">Last Name</label>
            <InputText
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter Last Name"
            />
          </div>
          <div className="p-field">
            <label htmlFor="math_score">Math Score</label>
            <InputText
              id="math_score"
              name="math_score"
              value={formData.math_score}
              onChange={handleChange}
              placeholder="Enter Math Score"
            />
          </div>
          <div className="p-field">
            <label htmlFor="science_score">Science Score</label>
            <InputText
              id="science_score"
              name="science_score"
              value={formData.science_score}
              onChange={handleChange}
              placeholder="Enter Science Score"
            />
          </div>
          <div className="p-field">
            <label htmlFor="english_score">English Score</label>
            <InputText
              id="english_score"
              name="english_score"
              value={formData.english_score}
              onChange={handleChange}
              placeholder="Enter English Score"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default InsertModal;
