import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DatabasePage.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import InsertModal from "./InsertModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import QueryModal from "./QueryModal";

const DatabasePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://senior-project-production-336b.up.railway.app/getData")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data. Please try again later.");
      });
  };

  return (
    <div className="container">
      <div className="content">
        <h2>Welcome to Database</h2>
        <div className="button-group">
          <InsertModal fetchData={fetchData} />
          <UpdateModal fetchData={fetchData} />
          <DeleteModal fetchData={fetchData} />
          <QueryModal fetchData={fetchData} />
          <button type="button" onClick={fetchData} className="p-button-sm">
            Show Data
          </button>
          <button type="button" onClick={() => setData([])} className="p-button-sm">
            Clear
          </button>
        </div>
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
    </div>
  );
};

export default DatabasePage;
