import logo from './logo.svg';
import './App.css';
import React, { useContext } from 'react';
import { Login } from './pages/login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Home } from './pages/home';
import { Sources } from './pages/sources';
import { AuthProvider, AuthContext } from "./AuthContext";
import Navbar from './components/Navbar';
import { Signup } from './pages/signup';
import { LoginHistory } from './pages/loginHistory';
import { MostSubscribed } from './pages/mostSubscribed';
import { Error } from './pages/error';
import { NotFound } from './pages/NotFound';

function App() {
  const authContext = useContext(AuthContext);
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <Routes>
          {authContext.auth.token ? (
            <>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/sources' element={<Sources />} />
              <Route exact path='/loginhistory' element={<LoginHistory />} />
              <Route exact path='/mostsubscribed' element={<MostSubscribed />} />
            </>
          ) : (
            <>
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
            </>
          )
          }
          <Route exact path='/error' element={<Error />} />
          {/* <Route path='*' element={<NotFound />} /> */}


        </Routes>

      </div>

    </Router>

  );
}

function AppWithAuth() {
  return (<AuthProvider>
    <App />
  </AuthProvider>);
}

export default AppWithAuth;
