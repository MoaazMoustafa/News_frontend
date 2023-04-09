import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Source } from '../components/Source';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext";

export const Sources = function () {
    const [sources, setSources] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:8000/api/news/sources/', {
            headers: {
                'Authorization': token,
            }
        }).then(res => { setSources(res.data.sources); })
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
                    <Source subscribed={source.subscribed} key={source.id} id={source.id} name={source.name} description={source.description} url={source.url} />

                );
            })}
        </div>
    );
};