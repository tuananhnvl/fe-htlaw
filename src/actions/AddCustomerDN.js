import React, { useRef, useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseCodeServices from './template-all.json';

const AddCustomerDN = () => {
  const navigate = useNavigate();
  const openPackThanhLapMoi = useRef()
   /* config code servciese */
   const optionsThanhLapMoi = [
    {
      label: 'Nhấp chọn',
      value: 'null'
    },
    {
      label: 'Gói A',
      value: 'PackA'
    }
    ,
    {
      label: 'Gói B',
      value: 'PackB'
    }
    ,
    {
      label: 'Gói C',
      value: 'PackC'
    }
  ]

  /* key-data */
  const [keydetailservices, setKeyDetailServices] = useState("");
  /* data-doanhnghiep */
  const [companyname, setCompanyName] = useState("");
  const [namecontact, setNameContact] = useState("");
  const [phonecontact, setPhoneContact] = useState("");
  const [mailcontact, setMailContact] = useState("");
  const [locationcontact, setLocationContact] = useState("");

  /* core-data-doanhnghiep */
  const [typecompany, setTypeCompany] = useState("");
  const [typeservices, setTypeServices] = useState("");
  const [packageservices, setPackageservices] = useState("");
  const [feeservices, setFeeServices] = useState("");
  const [activeketoanservices, setActiveketoanservices] = useState("0");
  const [activetokenservices, setActivetokenservices] = useState("0");
  const [signingdateservices, setSigningdateservices] = useState("");
  const [finaldateservices, setFinaldateservices] = useState("");
  const [statusservices, setStatusservices] = useState("");
  const [notespace, setNotespace] = useState("");


  function randomCustomer() {
    setCompanyName('Công ty Hoàng Long')
    setNameContact('Lê tú')
    setPhoneContact('09090909')
    setMailContact('gmail@gmail.gmail')
    setLocationContact('16 lô C ngô đức kế HCM')
    setTypeCompany('CTY1TV')
    setTypeServices('TLVN')
    
    setFeeServices('15000000')
    setActiveketoanservices('1')
    setActivetokenservices('1')
    setSigningdateservices('11/02/2021')
    setFinaldateservices('02/02/2023')
    setStatusservices('Đả xong')
    setNotespace('Khách nọ 3ty')
  }

  function actionOpenPackServices(e) {
    setTypeServices(e.target.value)
    if(e.target.value == 'TLVN') {
      openPackThanhLapMoi.current.classList.add('show');
    }else{
      openPackThanhLapMoi.current.classList.remove('show');
    }
  }

 

  const saveUser = async (e) => {
    e.preventDefault();
    let dataReady = {
      'data-doanhnghiep': [
        companyname, namecontact, phonecontact, mailcontact, locationcontact, activeketoanservices, activetokenservices, notespace
      ],
      'core-data-doanhnghiep': [
        typecompany, typeservices,packageservices, feeservices, signingdateservices, finaldateservices, statusservices
      ]
    }
    try {
       const results = await axios.post("https://be-htlaw.vercel.app/addcustomerdn", {
         dataReady
       });
       if(results.data.status == 'PASS') {
        toast.success("Cập nhật thành công !", {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => navigate('/datacustomerdn'),
          autoClose: 700
        });
      }
      else {
        toast.error(`Lỗi hệ thống: ${results.data.error}`, {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => navigate('/datacustomerdn'),
          autoClose: 700
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="wrapper-all">
      <ToastContainer/>
      <Navbar />
   
      <form onSubmit={saveUser} className="form-input-customerdn">
        <h3>Thông tin khách hàng</h3>
       
        <div className="info">
        <div>
            <label>Loại hình công ty</label>
            <select value={typecompany} onChange={(e) => setTypeCompany(e.target.value)}>
              {baseCodeServices['typeCompany'].map((option,index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Tên công ty</label>
            <input
              type="text"
              className="input"
              value={companyname}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Tên công ty"
            />
          </div>
          <div>
            <label>Tên liên hệ</label>
            <input
              type="text"
              className="input"
              value={namecontact}
              onChange={(e) => setNameContact(e.target.value)}
              placeholder="Tên liên hệ"
            />
          </div>
          <div>
            <label>Số điện thoại</label>
            <input
              type="text"
              className="input"
              value={phonecontact}
              onChange={(e) => setPhoneContact(e.target.value)}
              placeholder="Số điện thoại"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              className="input"
              value={mailcontact}
              onChange={(e) => setMailContact(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <label>Địa chỉ</label>
            <input
              type="text"
              className="input"
              value={locationcontact}
              onChange={(e) => setLocationContact(e.target.value)}
              placeholder="Địa chỉ"
            />
          </div>
          <div>
            <label>Lưu ý</label>
            <input
              type="text"
              className="input"
              value={notespace}
              onChange={(e) => setNotespace(e.target.value)}
              placeholder="Lưu ý"
            />
          </div>
          <div>
            <label>Dịch vụ KT</label>
            <select value={activeketoanservices} onChange={(e) => setActiveketoanservices(e.target.value)}>
              <option value="null" disabled selected>Nhấp chọn...</option>
              <option value="1">Có</option>
              <option value="0">Không</option>
            </select>
          </div>
          <div>
            <label>Token</label>
            <select value={activetokenservices} onChange={(e) => setActivetokenservices(e.target.value)}>
            <option value="null" disabled selected>Nhấp chọn...</option>
              <option value="1">Có</option>
              <option value="0">Không</option>
            </select>
          </div>
        </div>
        <h3>Chi tiết dịch vụ DN</h3>
        <div className="detail">
         
          <div >
            <label>Loại dịch vụ</label>
              <select  value={typeservices} onChange={(e) => actionOpenPackServices(e)}>
              {baseCodeServices['typeServcies'].map((option,index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </select>
          </div>
          <div ref={openPackThanhLapMoi} className="hidden">
            <label>Gói dịch vụ</label>
            <select value={packageservices}  onChange={(e) => setPackageservices(e.target.value)}>
              {optionsThanhLapMoi.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
            </select>
          </div>
          <div>
            <label>Phí dịch vụ</label>
            <input
              type="number"
              className="input"
              value={feeservices}
              onChange={(e) => setFeeServices(e.target.value)}
              placeholder="Phí dịch vụ"
            />
          </div>
        
          <div>
            <label>Ngày ký kết</label>
            <input
              type="text"
              className="input"
              value={signingdateservices}
              onChange={(e) => setSigningdateservices(e.target.value)}
              placeholder="Ngày ký kết"
            />
          </div>
          <div>
            <label>Ngày bàn giao</label>
            <input
            type="text"
            className="input"
            value={finaldateservices}
            onChange={(e) => setFinaldateservices(e.target.value)}
            placeholder="Ngày bàn giao"
          />
          </div>
          <div>
            <label>Tiến độ dịch vụ</label>
            <input
              type="text"
              className="input"
              value={statusservices}
              onChange={(e) => setStatusservices(e.target.value)}
              placeholder="Tiến độ dịch vụ"
            />
          </div>
       
         </div>
        <div className="field">
          <button type="submit">
            Check
          </button>
          <button onClick={randomCustomer}>Random Customer</button>
        </div>
      </form>
    </div>
        
     
    </>
  );
};

export default AddCustomerDN;
