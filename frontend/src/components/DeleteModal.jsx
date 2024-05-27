import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

const App = () => {
  const [studentId, setStudentId] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const submitDeleteForm = async () => {
    try {
      const response = await axios.delete(`https://senior-project-production-336b.up.railway.app/delete/${studentId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      closeDeleteModal();
      fetchData();
      // Reload the table data or refresh the page
      // fetchTableData();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <Button label="Delete Student" icon="pi pi-trash" onClick={openDeleteModal} className="p-button-sm" />

      <Dialog
        header="Delete Student"
        visible={isDeleteModalOpen}
        style={{ width: '400px' }}
        modal
        onHide={closeDeleteModal}
        footer={
          <div>
            <Button label="Close" icon="pi pi-times" onClick={closeDeleteModal} className="p-button-text p-button-sm" />
            <Button label="Delete" icon="pi pi-check" onClick={submitDeleteForm} className="p-button-sm" />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="student_id_modal">Student ID</label>
            <InputText
              id="student_id_modal"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter Student ID"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default App;
