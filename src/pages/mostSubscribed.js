import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext";

export const MostSubscribed = function () {
    const [sources, setSources] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:8000/api/news/mostsubscribed/', {
            headers: {
                'Authorization': token,
            }
        }).then(res => { setSources(res.data); })
            .catch(err => {
                if (err?.response?.status === 401) {
                    localStorage.removeItem('token');
                    authContext.setAuth('');
                    navigate('/login');
                }
            });
    }, []);


    return (
        <div className="row row-cols-1 row-cols-md-2 g-4">
            {sources.map((source) => {
                return (
                    <div key={source._id} className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">Source: {source._id}</h5>
                            <p className="card-text">Count: {source.count}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};