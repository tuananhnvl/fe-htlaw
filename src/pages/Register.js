import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div className='wrapper-register'>
            <div className='register-detail'>
                <form onSubmit={Register} >
                    <p >{msg}</p>
                    <div >
                        <label>Name</label>
                        <div >
                            <input type="text" className="input" placeholder="Name"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div >
                        <label>Email</label>
                        <div >
                            <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label>Password</label>
                        <div >
                            <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <div >
                            <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="btn-gr">
                        <button className="register-btn">Register</button>
                        <Link to='/' className='login-btn'>Login</Link>

                    </div>
                </form>
            </div> </div>
    )
}

export default Register