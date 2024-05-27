import React, { useState } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

function InsertModal({}) {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    math_score: 0,
    science_score: 0,
    english_score: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.value !== null ? e.value.toString() : "0",
    });
  };

  const handleSubmit = () => {
    // Log form data before sending
    console.log("Form Data to be Submitted:", formData);

    // Adjust the formData keys to match the backend expectations
    const dataToSend = [
      {
        student_id: formData.student_id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        math_score: parseInt(formData.math_score),
        science_score: parseInt(formData.science_score),
        english_score: parseInt(formData.english_score),
      },
    ];

    // Make the API call to insert data into the database
    axios
      .post(
        "https://senior-project-production-336b.up.railway.app/insertData",
        dataToSend
      )
      .then((response) => {
        console.log("Data successfully submitted:", response.data);
        // Optionally, handle the response (e.g., show a success message)
      })
      .catch((error) => {
        // Log the error response for debugging
        console.error(
          "Error submitting data:",
          error.response ? error.response.data : error.message
        );
        // Optionally, handle the error (e.g., show an error message)
      });

    // Reset the form and close the dialog
    setFormData({
      student_id: "",
      first_name: "",
      last_name: "",
      math_score: 0,
      science_score: 0,
      english_score: 0,
    });
    setVisible(false);
  };

  return (
    <>
      <Button icon="pi pi-plus" label="Insert Student" onClick={() => setVisible(true)} />
      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50vw" }}
        header="Insert Data"
        draggable={false}
        dismissableMask
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="id">ID</label>
            <InputText
              id="student_id"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
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
            <InputNumber
              id="math_score"
              name="math_score"
              value={parseInt(formData.math_score)}
              onValueChange={(e) => handleNumberChange(e, "math_score")}
            />
          </div>
          <div className="p-field">
            <label htmlFor="science_score">Science Score</label>
            <InputNumber
              id="science_score"
              name="science_score"
              value={parseInt(formData.science_score)}
              onValueChange={(e) => handleNumberChange(e, "science_score")}
            />
          </div>
          <div className="p-field">
            <label htmlFor="english_score">English Score</label>
            <InputNumber
              id="english_score"
              name="english_score"
              value={parseInt(formData.english_score)}
              onValueChange={(e) => handleNumberChange(e, "english_score")}
            />
          </div>
          <Button label="Submit" onClick={handleSubmit} />
        </div>
      </Dialog>
    </>
  );
}

export default InsertModal;
