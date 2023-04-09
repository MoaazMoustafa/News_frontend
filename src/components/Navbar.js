import React, { useContext } from 'react';
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Navbar() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    function logout() {
        axios.get('http://localhost:8000/api/users/logout', {
            headers: {
                'Authorization': token,
            }
        }).then(res => {
            localStorage.removeItem('token');
            authContext.setAuth('');
            navigate('/login')
        }).catch((err) => {
            navigate('/error')
        });

    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <a className="navbar-brand mb-0 h1">News</a>

            <div>
                {authContext.auth.token ? (
                    <div className='collapse navbar-collapse'>
                        <div className="navbar-nav">



                            <a href='/' className="nav-link" >Home</a>

                            <a href='/sources' className="nav-link" >Sources</a>

                            <a href='/loginhistory' className="nav-link" >Login-history</a>

                            <a href='/mostsubscribed' className="nav-link" >Most-subscribed</a>
                            <button className="btn btn-outline-danger btn-sm me-md-2" onClick={logout}>Logout</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Link to='/login'>
                            <button className="btn btn-outline-primary btn-sm " >Login</button>
                        </Link>
                        <Link to='/signup'>
                            <button className="btn btn-outline-danger btn-sm ml-5" >Signup</button>
                        </Link>
                    </div>
                )
                }
            </div>
        </nav>
    );
}
