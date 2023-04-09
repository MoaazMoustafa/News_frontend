import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext";


export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(false);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("trying to login");
        const bodyParameters = {
            email,
            password
        };

        const baseUrl = "http://localhost:8000"
        const path = "/api/users/login";
        axios({
            method: "POST",
            url: `${baseUrl}${path}`,
            headers: {
                "Content-Type": " application/json",
            },
            data: bodyParameters,
        })
            .then((response) => {
                console.log(response);
                const token = response.data.token;
                localStorage.setItem("token", token);
                authContext.setAuth(token)
                navigate("/");
                window.location.reload()
            })
            .catch((err) => {
                if (err?.response?.status === 401 || err?.response?.status === 404) setErrorMsg(true);
                else {
                    navigate('/error')
                }
            })

    };


    return (
        <>
            <form>
                <h2>Login</h2>

                <input type="email" className="form-control" placeholder="email" value={email}
                    onChange={e => setEmail(e.target.value)} />
                <br />
                <input type="password" className="form-control" placeholder="password" value={password}
                    onChange={e => setPassword(e.target.value)} />
                <br />
                <button className="btn btn-primary" onClick={submitHandler}>Login</button>

            </form>
            {errorMsg ? <div className="alert alert-danger mt-5" role="alert">
                login failed
            </div> : <></>}
        </>
    )
}