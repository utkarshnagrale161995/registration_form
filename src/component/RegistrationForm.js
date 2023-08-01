import React, {useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RegistrationForm(){

    const [state,setState] =useState({
    name:"",
    email:"",
    phoneNo:"",
    address:"",
    accountType:""
    })


    const [errors,setErrors] =useState({
    name:" ",
    email:" ",
    phoneNo:" ",
     })

   const [valid,setValid]=useState(false);
   const [mandatory,setMandatory]=useState(true);
   const [successMessage,setSuccessMessage]=useState("")
   const [errorMessage,setErrorMessage]=useState("")


   function handleClick(event){
        event.preventDefault();
        axios.post("http://localhost:4075/customers",state)
        .then((response)=>{
            console.log(response.data)
            setSuccessMessage(`Registration successfull! Youe customer ID is ${response.data.id}`)
            setErrorMessage("")
        })
        .catch((error)=>{
            console.log(error)
            setSuccessMessage("")
            setErrorMessage("Something went wrong..")
        })
    }

    function handleChange(event){
       let fieldName=event.target.name;
       let val=event.target.value;
       let errMsg=errors;
     
       switch(fieldName){

        case "phoneNo":
            if(val.length!=10)
            {
                errMsg.phoneNo="Invalid PhoneNo";
            }
            else
            {
                errMsg.phoneNo="";
            }
            break;

        case "name":
            if(val.length<3 || val.length>20)
            {
                errMsg.name="Invalid name";
            }
            else
            {
                errMsg.name="";
            }
            
            break;

        case "email":
            let regex= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(!regex.test(val))
            {
                errMsg.email="Invalid email";
            }
            else
            {
                errMsg.email="";
            }
            break;

            default :
            break;
    }
    setErrors(errMsg)
    setState({...state,[event.target.name]:event.target.value})

    if(errors.name!=="" || errors.email!=="" || errors.phoneNo!=="" )
    {
    setValid(false)
    }
    else{
    setValid(true)
    }

    if(state.phoneNo =="" || state.name =="" ||  state.email=="" || state.address =="" || state.accountType ==""){
       setMandatory(true)
       console.log(state)
    }else{
      setMandatory(false)
      console.log(state)
    }
   }

return(
    <>
    <div className="card mx-auto w-50 mt-5">
        <div className="card-body">
    <form>
        <label className="form-label">Name</label>
        <input type="text" 
        name="name" 
        value={state.name} 
        className="form-control"
        onChange={(event)=>handleChange(event)}/> 
        {(errors.name) ? <div>{errors.name}</div>: null}

        <label className="form-label">Email Id</label>
        <input type="email" 
        name="email" 
        value={state.email} 
        className="form-control"
        onChange={(event)=>handleChange(event)}/> 
        {(errors.email) ? <div>{errors.email}</div>: null}

        <label className="form-label">Phone No:</label>
        <input type="number" 
        name="phoneNo" 
        value={state.phoneNo} 
        className="form-control"
        onChange={(event)=>handleChange(event)}/> 
        {(errors.phoneNo) ? <div>{errors.phoneNo}</div>: null}

        <label className="form-label">Address</label>
        <textarea  type="text"
        name="address" 
        value={state.address} 
        className="form-control"
        onChange={(event)=>handleChange(event)}></textarea> 
        {(errors.address) ? <div>{errors.address}</div>: null}

        <label className="form-label">Account Type</label>
        <select name="accountType" className="form-control" value={state.accountType} onChange={(event)=>handleChange(event)}>
             <option value="">Please Select</option>
             <option value="Customer">Customer</option>
             <option value="Employee">Employee</option>
             </select> 
            {(errors.accountType) ? <div>{errors.accountType}</div>: null}
            <br/>
        <button className="btn btn-primary" onClick={(event)=>handleClick(event)} disabled={!valid}>Register</button>
        {(mandatory) ? <div>Please enter all mandatory fields</div> : null}
        {(successMessage) ? <div>{successMessage}</div> : null}
        {(errorMessage) ? <div>{errorMessage}</div> : null}
    </form>
    </div>
   </div>
    </>
)

}
