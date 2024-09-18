import commonapi from "./commonapi"
import serverurl from "./baseurl"
// upload
export const uploademployeeapi = async (uploademployee)=>{
    return await  commonapi("POST",`${serverurl}/employeedetails`,uploademployee)
}


export const getallemployeedetailsapi = async ()=>{
    return await commonapi("GET",`${serverurl}/employeedetails`,"")
}

// delete
export const deleteapi = async (employeeid)=>{
  return await commonapi("DELETE",`${serverurl}/employeedetails/${employeeid}`,{})
}

// Edit employee details
export const editemployeeapi = async (employeeid, updatedEmployeeDetails) => {
    return await commonapi("PUT",` ${serverurl}/employeedetails/${employeeid}`, updatedEmployeeDetails);
  };