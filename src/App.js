/* add libs */
import {BrowserRouter, Routes, Route} from "react-router-dom";

/*  add pages */
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import DataCustomerDN from "./pages/DataCustomerDN";
import DataCustomerKTT from "./pages/DataCustomerKTT";

/* add actions */
import AddCustomerDN from "./actions/AddCustomerDN";
import AddCustomerKT from "./actions/AddCustomerKT";
import EditUser from "./actions/EditCustomerDN";
import Register from "./pages/Register";

/* add styles */
import './styles/App.css'

function App() {
  return (
    <>
    
    <BrowserRouter>
    
      <Routes>
        {/* base routers */}
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        {/* display routers */}
        <Route path="/datacustomerdn" element={<DataCustomerDN/>}/>
        <Route path="/datacustomerktt" element={<DataCustomerKTT/>}/>
        {/* action routers */}
        <Route path="/datacustomerdn/add" element={<AddCustomerDN/>}/>
        <Route path="/datacustomerkt/add" element={<AddCustomerKT/>}/>
        <Route path="/datacustomerdn/edit/:key" element={<EditUser/>}/>
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
