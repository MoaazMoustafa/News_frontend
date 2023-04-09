import axios from 'axios';
import { useState, useEffect } from 'react';

export const Source = function ({ id, name, category, description, url, subscribed }) {
    const [subscribedNow, setSubscribedNow] = useState(false);
    const token = localStorage.getItem('token');

    function handelSubscribe() {
        axios.post('http://localhost:8000/api/news/subscribe',
            { source: id },
            {
                headers: {
                    'Authorization': token,
                }
            })
            .then(res => {
                if (res.status === 200) setSubscribedNow(true);
                console.log('done')
            }).catch(err => console.log(err))
    }
    function handelUnSubscribe() {
        axios.post('http://localhost:8000/api/news/unsubscribe',
            { source: id },
            {
                headers: {
                    'Authorization': token,
                }
            })
            .then(res => {
                if (res.status === 200) {
                    setSubscribedNow(false)
                    subscribed = false;
                };
                console.log('done')
            }).catch(err => console.log(err))
    }

    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{category}</h6>
                <p className="card-text">{description}</p>
                <a href={url} className="card-link mr-5">Go to..</a>
                {
                    subscribed || subscribedNow ? <button className="btn btn-danger" onClick={handelUnSubscribe}>un subscribe</button> :

                        <button className="btn btn-primary mr-5" onClick={handelSubscribe}>Subscribe</button>
                }

            </div>
        </div>

    );

};