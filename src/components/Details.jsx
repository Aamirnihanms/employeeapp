import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { getallemployeedetailsapi } from '../services/allapi';


const Details = ({uploaddetailsresponse}) => {

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
console.log(allempdetails)
  return (
    <div className='mt-5 container'>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th> Name</th>
          <th>Designation</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
       {
        allempdetails?.length>0?
        allempdetails?.map((details,index)=>(
          <tr key={details.id}>
          <td>{index+1}</td>
          <td>{details?.name}</td>
          <td>{details?.designation}</td>
          <td>{details?.email}</td>
        </tr>
        ))
        :
        <tr>
        <td colSpan="5" className="text-danger text-bolder fs-3">Nothing To Display</td>
      </tr>
       }
      </tbody>
    </Table>
    </div>
  )
}

export default Details