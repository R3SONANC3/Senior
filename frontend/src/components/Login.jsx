import { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode"
import { useGoogleLogin } from "@react-oauth/google";
import DatabasePage from './DatabasePage';

function App() {
    const login = useGoogleLogin({
        onSuccess:(tokenResponse) => console.log(tokenResponse),
        onError:() => console.log("Login  Failed"),
    });

  return (
    <button onClick={() => login() }>
        Sign in With Google {" "}
    </button>
)
}

export default App
