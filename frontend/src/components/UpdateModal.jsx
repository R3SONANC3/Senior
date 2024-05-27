import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";

const UpdateModal = ({ fetchData }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [formData, setFormData] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    math_score: "",
    science_score: "",
    english_score: "",
  });

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setFormData({
      student_id: "",
      first_name: "",
      last_name: "",
      math_score: "",
      science_score: "",
      english_score: "",
    });
  };

  const handleSearch = () => {
    axios
      .get(
        `https://senior-project-production-336b.up.railway.app/search/${studentId}`
      )
      .then((response) => {
        console.log("Response from search:", response.data);
        if (response.data.length > 0) {
          setFormData(response.data[0]);
        } else {
          alert("No student data found");
        }
      })
      .catch((error) => {
        console.error("Error searching for student:", error);
        alert("Failed to fetch student data");
      });
  };

  const handleSubmit = () => {
    axios
      .put(
        `https://senior-project-production-336b.up.railway.app/update/${formData.student_id}`,
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          math_score: formData.math_score,
          science_score: formData.science_score,
          english_score: formData.english_score,
        }
      )
      .then((response) => {
        console.log("Student updated successfully:", response.data);
        closeUpdateModal();
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating student:", error);
        alert("Failed to update student. Please try again later.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Name:", name, "Value:", value);
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <Button
        label="Update Student"
        icon="pi pi-pencil"
        onClick={openUpdateModal}
        className="p-button-sm"
      />

      <Dialog
        header="Update Student"
        visible={isUpdateModalOpen}
        style={{ width: "400px" }}
        modal
        onHide={closeUpdateModal}
        footer={
          <div>
            <Button
              label="Close"
              icon="pi pi-times"
              onClick={closeUpdateModal}
              className="p-button-text p-button-sm"
            />
            <Button
              label="Update"
              icon="pi pi-check"
              onClick={handleSubmit}
              className="p-button-sm"
            />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="search_student_id">Search Student by ID</label>
            <InputText
              id="search_student_id"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter Student ID"
            />
            <Button
              label="Search"
              icon="pi pi-search"
              onClick={handleSearch}
              className="p-button-sm"
            />
          </div>
          <div className="p-field">
            <label htmlFor="student_id">Student ID</label>
            <InputText
              id="student_id"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="p-field">
            <label htmlFor="first_name">First Name</label>
            <InputText
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="p-field">
            <label htmlFor="last_name">Last Name</label>
            <InputText
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="p-field">
            <label htmlFor="math_score">Math Score</label>
            <InputText
              id="math_score"
              name="math_score"
              value={formData.math_score}
              onChange={handleChange}
            />
          </div>
          <div className="p-field">
            <label htmlFor="science_score">Science Score</label>
            <InputText
              id="science_score"
              name="science_score"
              value={formData.science_score}
              onChange={handleChange}
            />
          </div>
          <div className="p-field">
            <label htmlFor="english_score">English Score</label>
            <InputText
              id="english_score"
              name="english_score"
              value={formData.english_score}
              onChange={handleChange}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UpdateModal;
