import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { getallemployeedetailsapi } from '../services/allapi';
import { editemployeeapi } from '../services/allapi'; // Import the edit API

const Edit = ({ uploaddetailsresponse,setuploaddetailsresponse }) => {
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [allempdetails, setallempdetails] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState({ name: '', designation: '', email: '' });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleshow = () => setModalShow(true);
  const handleclose = () => setModalShow(false);
  
  const handleEditClose = () => setEditModalShow(false);

  useEffect(() => {
    getalldetails();
  }, [uploaddetailsresponse]);

  // Fetch all employee details
  const getalldetails = async () => {
    const result = await getallemployeedetailsapi();
    if (result.status >= 200 && result.status < 300) {
      setallempdetails(result.data);
    }
  };

  // Handle edit button click, open edit modal with selected employee details
  const handleEditClick = (employee) => {
    setCurrentEmployee({
      name: employee.name,
      designation: employee.designation,
      email: employee.email,
    });
    setSelectedEmployeeId(employee.id);
    setEditModalShow(true); // Open edit modal
  };

  // Handle input change in the edit modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated employee details
  const handleSave = async () => {
    const result = await editemployeeapi(selectedEmployeeId, currentEmployee);
    if (result.status >= 200 && result.status < 300) {
      
      setuploaddetailsresponse(Date.now()); // Trigger a re-fetch
      getalldetails(); // Refresh the employee list after successful edit
      setEditModalShow(false); // Close the edit modal
    }
  };

  return (
    <div>
      <Button onClick={handleshow} variant="outline-warning"><i className="fa-solid fa-user-pen"></i></Button>{' '}
      <Modal
        show={modalShow}
        onHide={handleclose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Employee List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {allempdetails?.length > 0 ? (
                allempdetails.map((details, index) => (
                  <tr key={details.id}>
                    <td>{index + 1}</td>
                    <td>{details.name}</td>
                    <td>{details.designation}</td>
                    <td>{details.email}</td>
                    <td>
                      <button
                        onClick={() => handleEditClick(details)}
                        className="btn btn-warning"
                      >
                        <i className="fa-solid fa-user-pen text-warning"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-danger text-bolder fs-3">Nothing To Display</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleclose}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Employee Modal */}
      <Modal
        show={editModalShow}
        onHide={handleEditClose}
        size="lg"
        aria-labelledby="edit-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="edit-modal-title-vcenter">Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={currentEmployee.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                className="form-control"
                name="designation"
                value={currentEmployee.designation}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={currentEmployee.email}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
          <Button variant="secondary" onClick={handleEditClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Edit;