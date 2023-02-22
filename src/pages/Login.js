import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            console.log(email)
            await axios.post('https://server-htlaw.onrender.com/login', {
                email: email,
                password: password
            }, { withCredentials: true });
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (

        <div className='wrapper-login'>
            <div className='login-detail'>
                <form onSubmit={Auth}>
                    <p>{msg}</p>
                    <div>
                        <label>Email</label>
                        <div>
                            <input type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label>Password</label>
                        <div>
                            <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='btn-gr'>
                        <button className='login-btn'>Login</button>
                        <Link to='/register' className='register-btn'>Register</Link>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default Login