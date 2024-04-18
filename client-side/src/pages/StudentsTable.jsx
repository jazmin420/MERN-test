import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students');
        console.log(response.data)
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students: ", error);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/students/${id}`);
      console.log(response.data);
      // Remove the deleted student from the state
      setStudents(students.filter((student) => student._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  
  

  return (
  <>
      <Navbar expand="lg" className="bg-success mb-5">
      <Container>
        <Navbar.Brand href="#home">Education</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Services</Nav.Link>
            <Nav.Link href="#link">About us</Nav.Link>
            <Nav.Link href="#link">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
      <div className='d-flex align-items-center justify-content-center bg-light m-auto w-100'>
        <table className="table table-striped table-hover">
    <thead className="table-success">
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Mobile</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Date of Birth</th>
        <th>Course</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {students.map((student) => (
        <tr key={student._id}>
          <td>{student.name}</td>
          <td>{student.address}</td>
          <td>{student.mobile}</td>
          <td>{student.email}</td>
          <td>{student.gender}</td>
          <td>{student.dob}</td>
          <td>{student.course}</td>
          <td>
        <button className='btn btn-danger' onClick={() => handleDelete(student._id)}>Delete</button>
      </td>
        </tr>
      ))}
    </tbody>
  </table>
  
      </div>
  </>
  );
};

export default StudentsTable;
