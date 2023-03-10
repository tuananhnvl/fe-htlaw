import React, { useState, useEffect,useRef,useLayoutEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseCodeServices from './template-all.json';
const EditUser = () => {
  const navigate = useNavigate();
  const { key } = useParams();
  const openPackThanhLapMoi = useRef(null)
  const [packageservices, setPackageservices] = useState("")
  const [dataOld, setDataOld] = useState()
  const [dataNew, setDataNew] = useState({
      company: '',
      namecontact:'',
      phonecontact: '',
      mailcontact: '',
      locationcontact: '',
      activeketoanservices: '',
      activetokenservices: '',
      notespace:'',
      typecompany: '',
      typeservices: '',
      packageservices: '',
      feeservices: '',
      signingdateservices: '',
      finaldateservices: '',
      statusservices: ''
  })
  //const [baseCodeSerState, setBaseCodeSerState] = useState(null)
  const [dataInfoOld, setDataInfoOld] = useState()
  const [dataDetailOld, setDataDetailOld] = useState()
  const [dataChange, setDataChange] = useState([])
  const grDataOld = { ...dataInfoOld, ...dataDetailOld };
  let objdataChange = []
  /* function compareCodeSer(x) {
    const y = baseCodeServices['baseKeyCompare']
    let z = x['type-company']
    
    const keyResults = Object.keys(y).find(key => y[key] === z);
    console.log(keyResults);
  } */

  const getCustomerData = async (key) => {
    try {
      const response = await axios.get(`https://server-htlaw.onrender.com/datacustomerdn/${key}`);
      console.log(response.data)
      console.log(response.data.detail['type-services'])
      setDataOld(response.data)
      setDataInfoOld(response.data.info)
      setDataDetailOld(response.data.detail)

  
      if(response.data.detail['type-services'] == 'TLVN') {
        openPackThanhLapMoi.current.classList.add('show');
      }else{
        openPackThanhLapMoi.current.classList.remove('show');
      }
  
    } catch(error) {
      console.error(error);

    }
  };

  
  useEffect(() => {
    getCustomerData(key);
    
  }, [key]);





  function handledataChange(e) {
   // console.log(dataNew)
   // console.log(e.target.value)
   // console.log(e.target.name)
    setDataNew({...dataNew, [e.target.name] : e.target.value.trim()}) // trim() to del white space
    console.log(openPackThanhLapMoi.current)
    console.log(e.target.value)
    if(e.target.value == 'TLVN') {
      openPackThanhLapMoi.current.classList.add('show');
    }else{
      openPackThanhLapMoi.current.classList.remove('show');
    }
  }

  function checkData() {
    console.log(grDataOld)
    console.log(dataNew)
  }
  
  function compareData() {
    let objdataChange = {}
    for (const value in dataNew) {
      if(dataNew[value] !== '') {
        for (const valueCore in grDataOld) {
          if(value == valueCore && dataNew[value] !== grDataOld[valueCore]) {
            console.log(`${dataNew[value]} ???? thay ?????i`)
            Object.assign(objdataChange, {[`${value}`] : dataNew[value]});

          }
        }
      }
    }
    //console.log(objdataChange)
     for (const key in objdataChange) {
      setDataChange(dataChange => [...dataChange, {[`${key}`]: objdataChange[key]}]);
    } 
  
  }

  function actionChange() {
    console.log(dataChange)
  }

  const updateCustomerDN = async (e) => {
    e.preventDefault();
    try {
      const results = await axios.patch(`https://server-htlaw.onrender.com/datacustomerdn/edit/${key}`, {
        dataChange
      });
      if(results.data.status == 'PASS') {
        toast.success("C???p nh???t th??nh c??ng !", {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => navigate('/datacustomerdn'),
          autoClose: 700
        });
      }
      else {
        toast.error(`L???i h??? th???ng: ${results.data.error}`, {
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
   
        <button onClick={checkData}>Check data</button>
        <button onClick={compareData}>Compare Data</button>
        <button onClick={actionChange}>Ready</button>
        <button onClick={updateCustomerDN}>Update</button>
        <form className="form-input-customerdn">
          <h3>??i???u ch???nh th??ng tin MHS</h3>
          <span className="tag-custom">{key}</span>

  
              {dataInfoOld && 
              <>
             
                <h3>Th??ng tin kh??ch h??ng</h3>
                <div>
                  <label>Lo???i h??nh c??ng ty</label>
                  <select defaultValue={dataDetailOld['type-company']}>
                    {baseCodeServices['typeCompany'].map((option,index) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>T??n c??ng ty</label>
                  <input type="text" name="company" defaultValue={dataInfoOld['company']}  onChange={handledataChange}/> 
                </div>
                <div>
                  <label>T??n li??n h???</label>
                  <input type="text" name="name-contact" defaultValue={dataInfoOld['name-contact']} onChange={handledataChange}/> 
                </div>
                <div>
                  <label>S??? ??i???n tho???i</label>
                  <input type="number" name="phone-contact" defaultValue={dataInfoOld['phone-contact']} onChange={handledataChange}/> 
                </div>
                <div>
                  <label>Mail</label>
                  <input type="text" name="mail-contact" defaultValue={dataInfoOld['mail-contact']} onChange={handledataChange}/> 
                </div>
                <div>
                  <label>?????a ch???</label>
                  <input type="text" name="location-contact" defaultValue={dataInfoOld['location-contact']} onChange={handledataChange}/> 
                </div>
                <div>
                  <label>D???ch v??? KT</label>
                  <select defaultValue={dataInfoOld['active-ketoan-services']} name="active-ketoan-services" onChange={handledataChange}>
                    {(baseCodeServices['anotherServices']).map((option, index) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Token</label>
                  <select defaultValue={dataInfoOld['active-token-services']} name="active-token-services" onChange={handledataChange}>
                    {(baseCodeServices['anotherServices']).map((option, index) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>L??u ??</label>
                  <input type="text" name="note-space" defaultValue={dataInfoOld['note-space']} onChange={handledataChange} /> 
                </div>
              </>
              }
          
          <h3>Chi ti???t d???ch v??? DN</h3>
                {dataDetailOld && 
                  <div>
                    <label>Lo???i d???ch v???</label>
                    <select defaultValue={dataDetailOld['type-services']} name="type-services" onChange={handledataChange}>
                      {(baseCodeServices['typeServcies']).map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                }
               
                  <div ref={openPackThanhLapMoi} className="hidden">
                
                    <label>G??i d???ch v???</label>
                  {dataDetailOld && 
                    <select defaultValue={dataDetailOld['package-services']} name="package-services"  >
                      {baseCodeServices['packageThanhLapMoi'].map((option,index) => (
                          <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                  }
                  </div>
            
                
                {dataDetailOld && 
                  <div>
                    <div>
                      <label>Ph?? d???ch v???</label>
                      <input type="number" name="fee-services" defaultValue={dataDetailOld['fee-services']} onChange={handledataChange}/> 
                    </div>
                    <div>
                      <label>Ng??y k?? k???t</label>
                      <input type="text" name="signing-date-services" defaultValue={dataDetailOld['signing-date-services']} onChange={handledataChange}/> 
                    </div>
                    <div>
                      <label>Ng??y b??n giao</label>
                      <input type="text" name="final-date-services" defaultValue={dataDetailOld['final-date-services']} onChange={handledataChange}/> 
                    </div>
                    <div>
                      <label>Ti???n ?????</label>
                      <input type="text" name="status-services" defaultValue={dataDetailOld['status-services']} onChange={handledataChange}/> 
                    </div>
                  </div>
                }
    
       
        </form>
      </div>
    </>
  );
};

export default EditUser;
