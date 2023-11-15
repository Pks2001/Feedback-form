import logo from './logo.svg';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useState } from 'react';
import Home from './Components/Home';

function App() {
  const [flag, setFlag] = useState(false);
  const [name, setName] = useState();
  const onSuccess = (res) => {
    const decoded = jwtDecode(res.credential);
    console.log(decoded);
    setName(decoded.given_name );
    setFlag(true);
  }
  const onFailure = (res) => {
    console.log("Failure", res);
  }
  return (
    <div >
      {flag ? (
         <Home name={name}/>
      ) : (
        <GoogleOAuthProvider clientId="627414661624-a1jlc8qt70nf1mqq1gk3137knt4uh43l.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onFailure}
          />
        </GoogleOAuthProvider>)}


    </div>
  );
}

export default App;
