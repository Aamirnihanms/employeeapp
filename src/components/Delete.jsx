import React from 'react'
import { useEffect, useState } from 'react'
import { Button,Modal } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import { deleteapi, getallemployeedetailsapi } from '../services/allapi';

const Delete = ({uploaddetailsresponse,setuploaddetailsresponse}) => {
 
  const [modalShow, setModalShow] = React.useState(false);
  const handleshow =()=> setModalShow(true)
  const handleclose =()=> setModalShow(false)


  const deleteemployee =async (employeeid)=>{
    await deleteapi(employeeid)
    setuploaddetailsresponse(Date.now());
    getalldetails()
    
  }
  
  const [allempdetails,setallempdetails]=useState([])

  useEffect(()=>{
      getalldetails()
  },[uploaddetailsresponse])

  const getalldetails =async()=>{
   const result =await getallemployeedetailsapi()
   console.log(result)
   if(result.status>=200 && result.status<300){
     setallempdetails(result.data)
   }
  }
  
  return (
    <div>
         <Button onClick={handleshow} variant="outline-danger"><i class="fa-solid fa-user-xmark"></i></Button>{' '}
         <Modal
      show={modalShow}
      onHide={handleclose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Employee List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th> Name</th>
          <th>Designation</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
       {
        allempdetails?.length>0?
        allempdetails?.map((details,index)=>(
          <tr key={details.id} >
          <td>{index+1}</td>
          <td >{details?.name}</td>
          <td>{details?.designation}</td>
          <td>{details?.email}</td>
          <td><button onClick={()=>deleteemployee(details?.id)} className='btn btn-danger'><i class="fa-solid fa-trash text-danger"></i></button></td>
        </tr>
        ))
        :
        <tr>
        <td colSpan="5" className="text-danger text-bolder fs-3">Nothing To Display</td>
      </tr>
       }
      </tbody>
    </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleclose}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default Delete