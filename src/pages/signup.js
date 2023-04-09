import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext";


export const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState([]);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("trying to login");
        const bodyParameters = {
            email,
            fullName,
            password
        };

        const baseUrl = "http://localhost:8000"
        const path = "/api/users/signup";
        axios({
            method: "POST",
            url: `${baseUrl}${path}`,
            headers: {
                "Content-Type": " application/json",
            },
            data: bodyParameters,
        })
            .then((response) => {
                navigate("/login");
            })
            .catch((err) => {
                if (err?.response?.status === 422 || err?.response?.status === 404) setErrorMsg(err?.response?.data?.errors);
            })

    };


    return (
        <>
            <form>
                <h2>Signup</h2>

                <input type="email" className="form-control" placeholder="email" value={email}
                    onChange={e => setEmail(e.target.value)} />
                <br />
                <input type="text" className="form-control" placeholder="fullName" value={fullName}
                    onChange={e => setFullName(e.target.value)} />
                <br />
                <input type="password" className="form-control" placeholder="password" value={password}
                    onChange={e => setPassword(e.target.value)} />
                <br />
                <button className="btn btn-primary" onClick={submitHandler}>Signup</button>

            </form>
            {errorMsg.length > 0 ?
                errorMsg.map((msg) => {
                    return (
                        <div className="alert alert-danger mt-5" role="alert">
                            {msg.param}: {msg.msg}
                        </div>
                    )
                })
                : <></>}
        </>
    )
}