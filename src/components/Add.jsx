import React from 'react'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { uploademployeeapi } from '../services/allapi';

const Add = ({setuploaddetailsresponse}) => {

    const [employeedetails,setemployeedetails]=useState({
      name:"",designation:"",email:""
    })

    console.log(employeedetails)

    const handleupload = async ()=>{
      console.log("i am here")
      const {name,designation,email}=employeedetails
      if(name && designation && email){
      const result =  await uploademployeeapi(employeedetails)
      console.log(result)
      if(result.status>=200 && result.status <300){
        handleclose()
        setemployeedetails({...employeedetails,name:"",designation:"",email:""})
        toast.success("Uploaded Successfully")
        setuploaddetailsresponse(result)
      }
      }else{
        toast.warning("Please Fill The Form Completely")
      }
    }

    const [modalShow, setModalShow] = React.useState(false);
    const handleshow =()=> setModalShow(true)
    const handleclose =()=> setModalShow(false)

  return (
    <div>
        <Button onClick={handleshow} variant="outline-success"><i class="fa-solid fa-user-plus"></i></Button>{' '}
        <Modal
      show={modalShow}
      onHide={handleclose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter The Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      
        <FloatingLabel controlId='floatinginputname' className='mb-3' label="Name">
        <Form.Control onChange={e=>setemployeedetails({...employeedetails, name:e.target.value})} type="text" placeholder="Name" />
      </FloatingLabel>
      <FloatingLabel controlId='floatinginputdesignation' className='mb-3' label="Designation">
        <Form.Control  onChange={e=>setemployeedetails({...employeedetails, designation:e.target.value})} type="text" placeholder="Designation" />
      </FloatingLabel>
      <FloatingLabel  controlId="floatingInputemail"
        label="Email address"
        className="mb-3">
        <Form.Control  onChange={e=>setemployeedetails({...employeedetails, email:e.target.value})} type="email" placeholder="name@example.com" />
      </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleclose}>Close</Button>
        <Button onClick={handleupload}>Upload</Button>
      </Modal.Footer>
    </Modal>
    <ToastContainer theme='colored' autoClose={3000}/>
    </div>
  )
}

export default Add