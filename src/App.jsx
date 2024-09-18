import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './App.css'
import Details from './components/Details';
import Add from './components/Add';
import Edit from './components/Edit';
import Delete from './components/Delete';

function App() {
  const [count, setCount] = useState(0)

  const [uploaddetailsresponse,setuploaddetailsresponse]=useState("")

  return (
    <>
          <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
         <div className='d-flex justify-content-center'>
            <i class="fa-solid fa-address-book fs-3"></i>
              <span className='ms-3'>USER ADDRESS BOOK</span>
         </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
     <h1 className='text-center mt-5'>Employee Details</h1>
     <div className='container d-flex justify-content-between mt-5'>
        <Add setuploaddetailsresponse={setuploaddetailsresponse}/> 
        <Edit uploaddetailsresponse={uploaddetailsresponse} setuploaddetailsresponse={setuploaddetailsresponse}/>
        <Delete uploaddetailsresponse={uploaddetailsresponse} setuploaddetailsresponse={setuploaddetailsresponse}/>
     </div>
     <Details uploaddetailsresponse={uploaddetailsresponse}/>
    </>
  )
}

export default App
