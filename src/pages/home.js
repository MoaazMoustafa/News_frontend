import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext";

export const Home = function () {
    const [articles, setArticles] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:8000/api/news/', {
            headers: {
                'Authorization': token,
            }
        }).then(res => { setArticles(res?.data?.articles); }).catch((err) => {
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
            {articles.map((article) => {
                return (
                    <div className='container mb-5'>
                        <div className="card text-center" >
                            <img src={article.urlToImage} alt={article.title} className="img-fluid" />
                            <div className="card-header">
                                {article.author}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text">{article.description}</p>
                                <a href={article.url} target="_blank" >Read more</a>
                            </div>

                        </div>
                    </div>

                );
            })}
        </div>
    );
};