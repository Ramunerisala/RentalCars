import {useState,useContext}from 'react';
import {NavLink,Link,useNavigate} from 'react-router-dom';
import {HomeContext} from './Home.js';
import GoogleSignIn from  './GoogleSignIn.js';
var SignIn=()=>{
    var {In,setup}=useContext(HomeContext);
    var [credential,setcredential]=useState({email:'',password:''});
    var [message,setMessage]=useState(null);
    var navigate=useNavigate();

    var handlesubmit=async (e)=>{
        e.preventDefault();
        var {email,password}=credential;
        
        try{
        if(!email||!password){throw new Error('None of the fields should be empty!');}
        var response=await fetch('http://localhost:4000/login',{method:'POST',body:JSON.stringify({email,password}),headers:{'Content-Type':'application/json'},credentials:'include'});
        
        if(response.ok){
            console.log('hello',response);
             navigate('/getdetails');
        }
        if(response.status==404){setMessage(await response.json());}
        else if(response.status==400){setMessage(await response.json());}
        }catch(error){
            alert(error.message);
        }

    };
    if(message!=null){
        return <h1 style={{color:'red'}}>{message}</h1>;}
        


    return <div style={{textAlign:'left',fontSize:'20px',display:'grid',backgroundColor:'black',color:'skyblue',width:'700px',backgroundColor:'WindowFrame'}}>
                     
        <form style={{marginLeft:'30px'}} onSubmit={handlesubmit}> 
        <h1 style={{textAlign:'center',color:'rgb(255,0,255)'}}>SignIn!</h1>
               <div style={{marginBottom:'20px'}}>
                <div>
                <label for='email' style={{PaddingRight:'21px'}}>Email Address</label>
                </div>
               <input style={{width:'600px',height:'30px'}}type='text' id='email' name='email' value={credential.email} placeholder='Enter your Email here...' onChange={(e)=>setcredential({...credential,email:e.target.value})} autoFocus/>
               </div>
               <div>
                <div style={{display:'flex'}}>
               <label for='password' style={{paddingRight:'21px'}}>Enter password</label>
               <NavLink><span  style={{fontSize:'15px',textDecorationLine:'underline',marginLeft:'150px'}}>Forgot Password?</span></NavLink>
               </div>
               <input style={{width:'600px',height:'30px'}}type='password' id='password' name='password' value={credential.password} placeholder='Enter your password here...' onChange={(e)=>setcredential({...credential,password:e.target.value})}/>
               </div>
               <div style={{textAlign:'center'}}>
               <button style={{backgroundColor:'darkblue',marginTop:'10px'}}type='submit'>SignIn</button>
               </div>
               
               
        </form>
        <div>
                <p style={{fontSize:'15px',textAlign:'right'}}>Create new account?  <Link style={{marginLeft:'5px',marginRight:'5px'}} onClick={()=>setup(!In)}>clickhere</Link></p>
               </div>
        <div style={{textAlign:'center'}}>
            <GoogleSignIn />
               </div>
    </div>


};

export default SignIn;