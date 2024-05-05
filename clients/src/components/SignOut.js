import react,{useState,useContext}from 'react';
import {NavLink,Link} from 'react-router-dom';
import {HomeContext} from './Home.js';
var SignUp=()=>{
    var {In,setup}=useContext(HomeContext);
    var [blink,setBlink]=useState(false);
    var [credentials,setcredentials]=useState({username:'',email:'',password:'',repassword:''});
    var [exist,setExist]=useState('dummy');
    var [message,setMessage]=useState(null);
    var handleSubmit=async (e)=>{
        setExist('dummy');setMessage(null);
        e.preventDefault();
        setExist(false);
        var {username,email,password}=credentials;
        
        
    
            try{
                if(credentials.password!==credentials.repassword){throw new Error('Passwords does match.please check again!');}
                console.log('hii');
                const response=await fetch('http://localhost:4000/register',{
                method:'POST',
                body:JSON.stringify({username,email,password}),
                headers:{'Content-Type':'application/json'},
                credentials:'include'});
                console.log(response);
                if(!response.ok && response.status==404){
                    setExist('true');setMessage("This is email is already registered.Please register with another email id!");
                }else if(response.ok){
                    setExist('false');setMessage("You are succesfully registered.Thank you!");
                }else if(!response.ok && response.status==400){
                    setExist('dummy');alert('Please enter valid credentials!.');
                }

            }catch(error){
                
                alert(error);setExist('dummy');
            }
               
    }
    


    return <div style={{textAlign:'left',fontSize:'15px',display:'grid',backgroundColor:'black',color:'skyblue',width:'700px',backgroundColor:'WindowFrame'}}>
         {exist==='true' && <div><h1>{message}</h1><img style={{marginLeft:'150px',width:'350px',height:'270px'}}src='https://www.shutterstock.com/image-vector/thinking-face-emoji-emoticon-shown-600w-795272986.jpg' alt='smiley emoji'/></div>}

         {exist==='false' && 
                  <div><h1>{message}</h1><img style={{marginLeft:'150px',width:'350px'}}src='https://w7.pngwing.com/pngs/340/651/png-transparent-smiley-thumb-signal-emoticon-smiley-miscellaneous-face-emoji.png' alt='smiley emoji'/></div>}
                           
        {exist==='dummy' && <form style={{marginLeft:'30px'}} onSubmit={handleSubmit}> 
        <h3 style={{textAlign:'center',color:'rgb(255,0,255)'}}>SignUp!</h3>
                <div style={{marginBottom:'10px'}}>
                <div>
                <label for='username' style={{marginRight:'27px'}}>Username</label>
                </div>
               <input style={{width:'600px',height:'30px'}}type='text' id='username' name='username' value={credentials.username} placeholder='Enter your name here...' onChange={(e)=>setcredentials({...credentials,username:e.target.value})} autoFocus/>
               </div>
               <div style={{marginBottom:'10px'}}>
                <div>
                <label for='email' style={{marginRight:'27px'}}>Email Address</label>
                </div>
               <input style={{width:'600px',height:'30px'}}type='text' id='email' name='email' value={credentials.email} placeholder='Enter your Email here...' onChange={(e)=>setcredentials({...credentials,email:e.target.value})} autoFocus/>
               </div>
               <div>
                <div>
               <label for='password' style={{marginRight:'21px'}}>Enter password</label>    
               </div>           
               <input style={{width:'600px',height:'30px'}}type='password' id='password' name='password' value={credentials.password} placeholder='Enter your password here...' onChange={(e)=>setcredentials({...credentials,password:e.target.value})}/>
               </div>
               <div>
                <div>
               <label for='repassword' style={{marginRight:'21px'}}>Re-Enter password</label>
               </div>               
               <input style={{width:'600px',height:'30px'}}type='password' id='repassword' name='repassword' value={credentials.repassword} placeholder='Enter your password here...' onChange={(e)=>setcredentials({...credentials,repassword:e.target.value})}/>
               </div>
               <div style={{textAlign:'center'}}>
               <button style={{backgroundColor:'darkblue',marginTop:'10px'}}type='submit'>Register</button>
               </div>
               <div>
                <p style={{fontSize:'15px',textAlign:'right'}}>Already have account?  <Link style={{marginLeft:'5px',marginRight:'5px'}} onClick={()=>setup(!In)}>SignIn</Link></p>
               </div>
        </form> }
        
    </div>


};

export default SignUp;