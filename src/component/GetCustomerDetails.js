import React,{useState,useEffect} from "react"
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function GetCustomerDetails(){

    const[customers,setCustomers]=useState([]);

    const[errorMessage,setErrorMessage]=useState();
    const[errorMessage2,setErrorMessage2]=useState();

    const [successMessage,setSuccessMessage]=useState("")
    const [successMessage2,setSuccessMessage2]=useState("")
    
    const [showUpdateForm,setShowUpdateForm]=useState(false)
    const [showAddCustomerForm,setShowAddCustomerForm]=useState(false)
    
    const [valid,setValid]=useState(true);
    const [valid2,setValid2]=useState(false);
    
    const [mandatory,setMandatory]=useState(true);
    const [mandatory2,setMandatory2]=useState(true);

    
    const [errors,setErrors] =useState(
        {
            name:"",
            email:"",
            phoneNo:"",
          }
    )

    const [errors2,setErrors2] =useState(
        {
            name:" ",
            email:" ",
            phoneNo:" ",
          }
    )

    const [state,setState]=useState(
        {
            name:"",
            email:"",
            phoneNo:"",
            address:"",
            accountType:""
        }
    )

    const [state2,setState2]=useState(
        {
            name:"",
            email:"",
            phoneNo:"",
            address:"",
            accountType:""
        }
    )


    function getCustomerDetails(){
        //event.preventDefault();
       // axios.get("http://localhost:4075/customers")
       axios.get("https://customer-registrationform.onrender.com/customers")
        .then((response)=>{
            console.log(response.data)
            setCustomers(response.data);
            setErrorMessage("")
        })
        .catch((error)=>{
            console.log(error)
            setErrorMessage("Something went wrong..")
        })
    }

    function handleAddCustomer(event){
        event.preventDefault();
        setShowAddCustomerForm(true);
    }

    function addCustomer(event){
        event.preventDefault();
        //axios.post("http://localhost:4075/customers",state2)
        axios.post("https://customer-registrationform.onrender.com/customers",state2)
        .then((response)=>
        {
            console.log(response.data);
            setCustomers([...customers,response.data])
            setSuccessMessage2(`Registration successfull! Youe customer ID is ${response.data.id}`)
            setErrorMessage2("")
        })
        .catch((error)=>{console.log(error)
            setErrorMessage2("Something went wrong...")
            setSuccessMessage2("");
        })
    }

    function cancel2(event){
        event.preventDefault();
        setShowAddCustomerForm(false);
        setSuccessMessage("")
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

                default:
                    break;
        }
        setErrors(errMsg)
        setState({...state,[event.target.name]:event.target.value})
    
        if(errors.name!=""  || errors.email!=""  || errors.phoneNo!="" )
        {
        setValid(false)
        }
        else{
        setValid(true)
        }

        if(state.phoneNo =="" || state.name =="" || state.email=="" || state.address =="" || state.accountType ==""){
            setMandatory(true)
         }else{
           setMandatory(false)
         }
    }

    function handleChange2(event){
        let fieldName=event.target.name;
        let val=event.target.value;
        let errMsg2=errors2;
        switch(fieldName){
            case "phoneNo":
                if(val.length!=10)
                {
                    errMsg2.phoneNo="Invalid PhoneNo";
                }
                else
                {
                    errMsg2.phoneNo="";
                }
                break;
    
            case "name":
                if(val.length<3 || val.length>20)
                {
                    errMsg2.name="Invalid name";
                }
                else
                {
                    errMsg2.name="";
                }
                break;
    
            case "email":
                let regex= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if(!regex.test(val))
                {
                    errMsg2.email="Invalid email";
                }
                else
                {
                    errMsg2.email="";
                }
                break;

            default :
            break; 
        }
        setErrors2(errMsg2)
        setState2({...state2,[event.target.name]:event.target.value})
    
        if(errors2.name===""  && errors2.email===""  && errors2.phoneNo==="" )
        {
        setValid2(true)
        }
        else{
        setValid2(false)
        }

        if(state2.phoneNo !="" && state2.name !="" && state2.email!="" && state2.address !="" && state2.accountType !=""){
            setMandatory2(false)
         }else{
           setMandatory2(true)
         }
    }

    function update(event){
        event.preventDefault();
        //axios.put("http://localhost:4075/customers/"+state.id,state)
        axios.put("https://customer-registrationform.onrender.com/customers/"+state.id,state)
        .then((response)=>{
            console.log(response.data)
            let index=customers.findIndex(customer => customer.id === state.id);
            console.log(index);
            let customersCopy=[...customers]
            customersCopy[index]=state;
            setCustomers(customersCopy)
            setSuccessMessage("Customer Details Succesfully Updated")
            setErrorMessage("")   
        
        })
        .catch((error)=>{
        console.log(error)
        setSuccessMessage("")
        setErrorMessage("Some thing went wrong. Please try Again!")
        })
    }

    function cancel(event){
        event.preventDefault();
        setShowUpdateForm(false);
    }

    function handleUpdate(event,id){
        event.preventDefault();
        setShowUpdateForm(true);
        //axios.get("http://localhost:4075/customers/"+id)
        axios.get("https://customer-registrationform.onrender.com/customers/"+id)
        .then((response)=>{
            console.log(response.data)
            setState(response.data);
        })
        .catch((error)=>{console.log(error)})
    }

    function handleDelete(event,id){
        event.preventDefault();
        //axios.delete("http://localhost:4075/customers/"+id)
        axios.delete("https://customer-registrationform.onrender.com/customers/"+id)
        .then((response)=>{
            alert("Deleted Successfully..");
            let customersCopy=[...customers];
           customersCopy= customersCopy.filter((customer)=>{return customer.id!=id})
            setCustomers(customersCopy)
        })
        .catch((error)=>{console.log("error")})
    }

    useEffect(
        ()=>{
            getCustomerDetails();
        },[]
    )

    return(
        <>
        <div className="container mt-5">
                <h2>The customer details are as follows..</h2>
                <br/>
                { (customers.length!=0) ? 
                <table className="table table-sm">
                   <thead>
                     <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Account Type</th>
                        <th></th>
                        <th></th>
                    </tr>
                  </thead>
                  <tbody>
                   {
                    customers.map((customer)=>{ return <tr>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phoneNo}</td>
                        <td>{customer.address}</td>
                        <td>{customer.accountType}</td>
                        <td><button onClick={(event)=>{handleDelete(event,customer.id)}}>Delete</button></td>
                        <td><button onClick={(event)=>{handleUpdate(event,customer.id)}}>Update</button></td>
                       </tr>
                       })
                  }
                </tbody>
            </table> : null}

             <button onClick={handleAddCustomer}>Add Customer</button>
       
             { (showUpdateForm) ?
               <>
               <div className="card w-50">
                 <div className="card-header">Update Form</div>
                  <div className="card-body">
                    <form>
                    <label className="form-label">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={state.name}
                      className="form-control" 
                      onChange={(event)=>handleChange(event)}
                    /> 
                    {(errors.name) ? <div>{errors.name}</div>: null}

                   <label className="form-label">Email Id</label>
                   <input 
                         type="email" 
                         name="email" 
                         value={state.email}
                         className="form-control" 
                         onChange={(event)=>handleChange(event)}
                      />
                    {(errors.email) ? <div>{errors.email}</div>: null}

                   
                   <label className="form-label">Phone No</label>
                   <input 
                        type="number" 
                        name="phoneNo" 
                        value={state.phoneNo}
                        className="form-control" 
                        onChange={(event)=>handleChange(event)}
                      /> 
                    {(errors.phoneNo) ? <div>{errors.phoneNo}</div>: null}

                   
                   <label className="form-label">Address</label>
                   <textarea  
                        name="address" 
                        value={state.address} 
                        className="form-control"
                        onChange={(event)=>handleChange(event)}>
                      </textarea> 
                    {(errors.address) ? <div>{errors.address}</div>: null}

                
                   <label className="form-label">Account Type</label>
                   <select 
                   name="accountType" 
                   value={state.accountType}
                   className="form-control" 
                   onChange={(event)=>handleChange(event)}>
                        <option value="">Please Select</option>
                        <option value="Customer">Customer</option>
                        <option value="Employee">Employee</option>
                       </select> 
                   {(errors.accountType) ? <div>{errors.accountType}</div>: null}


               <button onClick={(event)=>update(event)} disabled={!valid} className={"btn btn-primary"}>Update Details</button>&nbsp;&nbsp;
               <button onClick={(event)=>cancel(event)} className={"btn btn-primary"}>Cancel</button>
               {(mandatory) ? <div>Please enter all mandatory fields</div> : null}
               {(successMessage) ? <div>{successMessage}</div>:null}
               {(errorMessage) ? <div>{errorMessage}</div>:null}
               </form>
               </div>
               </div>
               </> :null
            }
       

            { (showAddCustomerForm) ?
               <>
                   <h2>Add Customer Form</h2>
                   <form>
                        <p>Name</p>
                        <p><input 
                           type="text" 
                           name="name" 
                           value={state2.name} 
                           onChange={(event)=>handleChange2(event)}
                           /> *</p>
                        {(errors2.name) ? <div>{errors2.name}</div>: null}

                        <p>Email</p>
                        <p><input 
                               type="email" 
                               name="email" 
                               value={state2.email} 
                               onChange={(event)=>handleChange2(event)}
                               /> *</p>
                       {(errors2.email) ? <div>{errors2.email}</div>: null}

                       <p>PhoneNo</p>
                       <p><input 
                             type="number" 
                             name="phoneNo" 
                             value={state2.phoneNo} 
                             onChange={(event)=>handleChange2(event)}
                             /> *</p>
                        {(errors2.phoneNo) ? <div>{errors2.phoneNo}</div>: null}

                        <p>Address</p>
                        <p><textarea  
                        type="text"
                        name="address" 
                        value={state2.address} 
                        onChange={(event)=>handleChange2(event)}>
                        </textarea> *</p>
                        {(errors2.address) ? <div>{errors2.address}</div>: null}

                       <p>AccountType</p>
                      <p><select 
                      name="accountType" 
                      value={state2.accountType} 
                      onChange={(event)=>handleChange2(event)}>
                           <option value="">Please Select</option>
                           <option value="Customer">Customer</option>
                           <option value="Employee">Employee</option>
                        </select> *
                      </p>
                      {(errors2.accountType) ? <div>{errors2.accountType}</div>: null}


                     <button onClick={(event)=>addCustomer(event)} disabled={!valid2} className={"btn btn-primary"}>Add Details</button>
                     <button onClick={(event)=>cancel2(event)} className={"btn btn-primary"}>Cancel</button>
                     <div>Fields marked with * are mandatory</div>
                     {(mandatory2) ? <div>Please enter all mandatory fields</div> : null}
                     {(successMessage2) ? <div>{successMessage2}</div>:null}
                     {(errorMessage2) ? <div>{errorMessage2}</div>:null}
             </form>
             </> :null
            }
            </div>
    </>
    )
}

