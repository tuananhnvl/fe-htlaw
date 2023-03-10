/* libs */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import classNames from 'classnames';
/* router */
import { Link } from "react-router-dom";

/* actions */
import ExportCSV from '../actions/exportToCSV.js'

/* styles & coponents */
import Navbar from '../components/Navbar'

import usePagination from "../hooks/Pagination";
import '.././styles/DataCustomerDN.css';

/* hook styles */
import Pagination from '@mui/material/Pagination';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const DataCustomerDN = () => {
  /* set vars */
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;


  /* modal view contact customer */
  const [showModalViewContact, setShowModalViewContact] = useState(false);
  const [displayModalViewContact, setDisplayModalViewContact] = useState([]);

  /* modal view action */
  const [showModalAction, setShowModalAction] = useState(false);
  const [dataforDelete, setDataforDelete] = useState();
  /* modal view noti */
  const [showModalNoti, setShowModalNoti] = useState(false);
  const [contentNoti, setContentNoti] = useState();
  const [passNoti, setPassNoti] = useState(false);
  const [errorNoti, setErrorNoti] = useState(false);

  const [datacustomers, setDatacustomers] = useState();
  const [texttoSearch, setTexttoSearch] = useState('');
  const [resultSearch, setResultsearch] = useState([]);
  const [lengthresult, setLengthResult] = useState();

  /* run */
  useEffect(() => {
    getAllCustomer();
  }, []);



  /* handle */
  const count = Math.ceil((resultSearch.length) / PER_PAGE);
  const _DATA = usePagination(resultSearch, PER_PAGE);

  function handleData(x, y) {
    let arrResults = []
    for (let i = 0; i < x.length; i++) {
      arrResults.push({ ...x[i], ...y[i] })
    }
    setDatacustomers(arrResults)
    console.log(arrResults)
  }
  function actionshowModalNotiAction(key, menthod) {
    setShowModalAction(true)
    if (menthod == 'DELETE') {
      setDataforDelete(key)
    }
  }
  function actionopenModalViewContact(e) {
    setShowModalViewContact(true)
    for (let i = 0; i < datacustomers.length; i++) {
      if (datacustomers[i]['key-detail-services'] == e.target.value) {
        setDisplayModalViewContact([
          datacustomers[i]['company'],
          datacustomers[i]['key-detail-services'],
          datacustomers[i]['name-contact'],
          datacustomers[i]['phone-contact'],
          datacustomers[i]['mail-contact'],
          datacustomers[i]['location-contact'],
          datacustomers[i]['active-ketoan-services'],
          datacustomers[i]['active-token-services'],
          datacustomers[i]['publish-info-date'],
          datacustomers[i]['note-space']
        ])

      }
    }
    console.log(displayModalViewContact)
  }
  function closeModalNotiAction() {
    setShowModalAction(false)
  }
  function closeModalViewContact() {
    setShowModalViewContact(false)
  }
  function loadingModalNoti(res) {
    if (res.status == true) {
      setShowModalNoti(true)
      setPassNoti(true)
      setContentNoti(res.msg)
      setTimeout(() => {
        setShowModalNoti(false)
        setPassNoti(false)
      }, 1500);
    } else {
      setContentNoti(res.msg)
      setShowModalNoti(true)
      setErrorNoti(true)
      setTimeout(() => {
        setShowModalNoti(false)
        setErrorNoti(false)
      }, 1500);
    }
  }
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };


  /* api curd */
  const getAllCustomer = async () => {
    const response = await axios.get("https://server-htlaw.onrender.com/datacustomer");
    console.log(response.data)
    // console.log(response.data['datainfo'])

    handleData(response.data['datainfo'], response.data['datadetail'])
  };


  const deleteCustomerDN = async (e) => {
    try {
      const response = await axios.delete(`https://server-htlaw.onrender.com/datacustomerdn/delete/${e.target.value}`);
      console.log(response.data)
      getAllCustomer();
      setShowModalAction(false)
      loadingModalNoti(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(texttoSearch)
    if (texttoSearch == '') {
      alert('Nh???p c?? ph??p tra c???u ..')
    } else {
      try {
        const response = await axios.post(`https://server-htlaw.onrender.com/searchingcustomer`, {
          querySearching: texttoSearch
        });
        console.log(response.data)
        setLengthResult((response.data.length))
        setResultsearch(response.data)



      } catch (error) {
        console.log(error);
      }
    }

  }

  return (
    <>

      <Navbar />

      <div className={classNames('modal-small', { 'active-modal': showModalViewContact })} >
        <button onClick={closeModalViewContact}>X</button>
        <h3>Th??ng tin li??n h???</h3>
        <span>{displayModalViewContact[0]}</span>
        <table>
          <thead>
            <tr>
              <th>MHS</th>
              <th>T??n LH</th>
              <th>Sdt</th>
              <th>Mail</th>
              <th>?????a ch???</th>
              <th>DV-KT</th>
              <th>Token</th>
              <th>Ng??y l???p TT</th>
              <th>L??u ??</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{displayModalViewContact[1]}</td>
              <td>{displayModalViewContact[2]}</td>
              <td>{displayModalViewContact[3]}</td>
              <td>{displayModalViewContact[4]}</td>
              <td>{displayModalViewContact[5]}</td>
              <td>{displayModalViewContact[6]}</td>
              <td>{displayModalViewContact[7]}</td>
              <td>{displayModalViewContact[8]}</td>
              <td>{displayModalViewContact[9]}</td>
            </tr>

          </tbody>
        </table>
      </div>
      <div className={classNames('modal-small', { 'active-modal': showModalAction })} >
        <p>X??c nh???n xo??</p>
        <span>{dataforDelete}</span>
        <button value={dataforDelete} onClick={deleteCustomerDN}>Xo??!</button>
        <button onClick={closeModalNotiAction}>Hu???</button>
      </div>
      <div className={classNames('modal-small', { 'active-modal': showModalNoti, 'pass-notification': passNoti, 'error-notification': errorNoti })} >
        {contentNoti}
      </div>






      <h1>MANAGER DATA CUSTOMER</h1>
      <div className="wrapper-all">
       

          <ExportCSV csvData={datacustomers} fileName={'Danh s??ch KH HTLAW 2022'} />


          <form onSubmit={handleSubmit} className="form-sreaching">
            <input placeholder="MHS / T??n DN / T??n LH / SDT / Lo???i h??nh" type="text" name="searching" onChange={(e) => setTexttoSearch(e.target.value)} value={texttoSearch}></input>
            <button type="submit" className="button is-success">Searching All</button>
          </form>

          <div className="result-sreaching">
            <h3>{lengthresult} be found!</h3>
            <List p="10" pt="3" spacing={2}>
              {_DATA.currentData().map(data => {
                return (
                  <ListItem key={data.id} className="results">
                    {data.tdn}
                  </ListItem>
                );
              })}
            </List>
            <Pagination
              count={count}
              size="small"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </div>


          <table className="data-customer-doanh-nghiep table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>MHS</th>
                <th>T??n DN</th>
                <th>TT li??n h???</th>
                <th>Lo???i h??nh</th>
                <th>Lo???i d???ch v???</th>
                <th>G??i d???ch v???</th>
                <th>Ph?? d???ch v???</th>

                <th>Ti???n ????? DV</th>
                <th>Ng??y k?? H??</th>
                <th>Ng??y b??n giao</th>
                <th>T??c v???</th>

              </tr>
            </thead>

            {/* fetch object data reactfetch object data reactfetch object data reactfetch object data reactfetch object data reactfetch object data react */}
            <tbody>

              {datacustomers &&
                datacustomers.map((data, index) => (
                  <tr key={index + 1}>
                    <td>{data['key-detail-services']}</td>
                    <td>{data['company']}</td>
                    <td><button value={data['key-detail-services']} onClick={actionopenModalViewContact}>View Contact</button></td>
                    <td>{data['type-company']}</td>
                    <td>{data['type-services']}</td>
                    <td>{data['package-services']}</td>
                    <td>{data['fee-services']}</td>

                    <td>{data['status-services']}</td>
                    <td>{data['signing-date-services']}</td>
                    <td>{data['final-date-services']}</td>
                    <td>
                      <Link
                        to={`/datacustomerdn/edit/${data['key-detail-services']}`}
                        className="button is-small is-info mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => actionshowModalNotiAction(data['key-detail-services'], 'DELETE')}
                        className="button is-small is-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
     
      </div>
    </>

  );
};

export default DataCustomerDN;
