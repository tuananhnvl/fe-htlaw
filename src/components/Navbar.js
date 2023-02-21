import React from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import logoCompany from '.././asset/logo-htlaw.png';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout');
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className='nav-des'>
        <div>
          <img src={logoCompany} alt="logo comapny" />
        </div>
        <div>
          <button onClick={Logout} className="button is-light">
            Log Out
          </button>
        </div>
        <div>
          <Link to='/dashboard'>Dashboard</Link>
        </div>
        <div>
          <Link to="/datacustomerdn/add">Tạo mới KHDN</Link>
        </div>
        <div>
          <Link to="/datacustomerkt/add">Tạo mới KHKT</Link>
        </div>
        <div>
          <Link to="/datacustomerdn">Khách hàng doanh nghiệp</Link>
        </div>
        <div>
          <Link to="/datacustomerktt">Khách hàng kế toán</Link>
        </div>
      </div>

    </>
  )
}
