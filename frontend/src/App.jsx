import React, { useState } from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import DatabasePage from './components/DatabasePage';

function App() {
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log(tokenResponse);
            // You can decode and store the token if needed
            // const userInfo = jwtDecode(tokenResponse.credential);
            // localStorage.setItem('userToken', tokenResponse.credential);

            // Redirect to DatabasePage
            navigate('/');
        },
        onError: () => console.log("Login Failed"),
    });

    return (
        <button onClick={() => login()}>
            Sign in With Google{" "}
        </button>
    );
}

function MainApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/" element={<DatabasePage />} />
            </Routes>
        </Router>
    );
}

export default MainApp;
