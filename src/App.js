import React from "react";
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import RegistrationForm from './component/RegistrationForm';
import GetCustomerDetails from './component/GetCustomerDetails';

function App() {
  
  return (
    <div className="App">
      <React.Fragment>
             <BrowserRouter>
             <nav
            className="navbar navbar-expand-sm navbar-light bg-warning"
            >
                <span className="navbar-brand mx-4 fw-bolder fst-italic fs-4">Registration Form</span>
           
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link fw-bolder fst-italic fs-4"
                    to="/getCustomerDetails">
                        Get Customer Details
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link fw-bolder fst-italic fs-4"
                    to="/registrationForm">
                        Registration Form
                    </Link>
                </li>
            </ul>
            </nav>
          
           <Routes>
            <Route path="/" element={<RegistrationForm/>}/> 
            <Route path="/getCustomerDetails" element={<GetCustomerDetails/>}/> 
            <Route path="/registrationForm" element={<RegistrationForm/>}/> 
           </Routes>
       
       </BrowserRouter>
  </React.Fragment>
    </div>
  );
}

export default App;
