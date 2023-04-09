import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext";

export const LoginHistory = function () {
    const [loginHistory, setLoginHistory] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/loginHistory', {
            headers: {
                'Authorization': token,
            }
        }).then(res => {
            setLoginHistory(res.data.loginHistory);
        }).catch((err) => {
            if (err?.response?.status === 401) {
                localStorage.removeItem('token');
                authContext.setAuth('');
                navigate('/login');
            } else {
                navigate('/error');
            }
        });
    }, []);

    return (
        <div>
            {loginHistory.map((item) => {
                return (
                    <div key={item.timestamp} className='container mb-5'>
                        <div className="card text-center" >
                            <div className="card-header">
                                ipAddress: {item.ipAddress}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">status: {item.status}</h5>
                                <p className="card-text">userAgent: {item.userAgent}</p>
                                <span >timestamp: {item.timestamp}</span>
                            </div>

                        </div>
                    </div>

                );
            })}
        </div>
    );
};