import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import '.././styles/Dashboard.css'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();

    getUsers();
  }, []);
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
      withCredentials : true
    }
  };
  const refreshToken = async () => {
    try {
      const response = await axios.get('https://server-htlaw.onrender.com/token',config);
      console.log(response)
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      console.log(decoded)
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      console.error(error)
      if (error.response) {
        navigate("/");
      }
    }
  }

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get('https://server-htlaw.onrender.com/token',{ withCredentials : true});
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const getUsers = async () => {
    const response = await axiosJWT.get('https://server-htlaw.onrender.com/users', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials : true
    });
    setUsers(response.data);
  }


  return (
    <>
      <Navbar />
      <h1>Main Dashboard</h1>
      <h1>Welcome Back: {name}</h1>
      <div className='wrapper-all-widthmenu'>
        <table className="table-user-htlaw table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </>
  )
}
