import { useState, useEffect } from 'react'
import { useGoogleLogin } from "@react-oauth/google";

function App() {
    const login = useGoogleLogin({
        onSuccess:(tokenResponse) => console.log(tokenResponse),
    });

  return (
    <button onClick={() => login() }>
        Sign in With Google {" "}
    </button>
)
}

export default App
