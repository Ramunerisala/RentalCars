import React, { useState,useEffect,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import {gapi} from 'gapi-script';
import { userContext } from './GetDetails';
function GoogleSignIn() {
    var navigate=useNavigate();
    var {setuser} =useContext(userContext);
   useEffect(()=>{
    gapi.load('client:auth2',()=>{
        gapi.auth2.init({clientId:'521212712721-sdcq5ao8ju5aehpufg420j1ftgksp640.apps.googleusercontent.com'})
    })
   },[]);
    const [loginData,setLoginData]=useState(localStorage.getItem('loginData')?JSON.parse(localStorage.getItem('loginData')):null);

    const handleFailure=(result)=>{
        
        console.log(result);
    }
    const handleLogin=async (googleData)=>{
        const response=await fetch('http://localhost:4000/api/google-login',{method:'POST',body:JSON.stringify({token:googleData.tokenId}),headers:{'Content-Type':'application/json'}});
        const data=await response.json();setLoginData(data);console.log(data);localStorage.setItem('loginData',JSON.stringify(data));
        var {username,email,isAdmin}=data; setuser(username,email,isAdmin);navigate('/User');
    }
    const handleLogout=()=>{
        localStorage.removeItem('loginData');setLoginData(null);
    }

  return (
    <div className="App">
       {!loginData ?
        <GoogleLogin 
          clientId="521212712721-sdcq5ao8ju5aehpufg420j1ftgksp640.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
          ></GoogleLogin> : <div><button onClick={handleLogout}>Logout</button></div>}
      
    </div>
  );
}

export default GoogleSignIn;