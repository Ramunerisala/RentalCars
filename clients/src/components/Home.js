import react,{useState,useContext,useRef,useEffect} from 'react';
import './Home.css';
import {NavLink,Link} from 'react-router-dom';
import SignIn from './signIn.js';
import SignUp from './SignOut.js';
import Sidemenu from './sidemenu.js';
var images=['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1883&q=80',
             'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
             'https://images.unsplash.com/photo-1584191088610-f74145e82ac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'];
export var HomeContext=react.createContext();
export var HomeContextProvider=({children})=>{
    var [In,setIn]=useState(true);
    var [side,setSide]=useState(true);
    
    var setup=(toggle)=>{
            setIn(toggle);
    };
    var setUpSide=(toggle)=>{
        setSide(toggle);
    };
        return <HomeContext.Provider value={{In,side,setup,setUpSide}}>
             {children}
        </HomeContext.Provider>
        
    }
    
export var Home=()=>{
      var {In,side,setup,setUpSide}=useContext(HomeContext);
      var [count,setCount]=useState(0);
      useEffect(()=>{
        var intervalId=setInterval(()=>setCount(count+1),2000);
        return ()=>clearInterval(intervalId);
      },[count]);
    
    
    
    return (
        <div style={{display:'flex'}}>
            <div style={{backgroundColor:'lightgrey',textAlign:'center',width:'25%',borderRight:'solid',borderRightWidth:'1px'}}>
            <Link><h2 onClick={()=>setUpSide(!side)}>Dashboard</h2></Link>
            <Sidemenu />
            </div>
        <div style={{textAlign:'center',display:'grid',marginLeft:'0.5px'}}>
        <div className='header' style={{alignItems:'center'}}>
            
            <h2 style={{color:'black',marginLeft:'550px',marginRight:'500px'}}>EagleC.com</h2>
            <h3 onClick={()=>setup(!In)}>{In?<Link style={{color:'white'}} >SignUp</Link>:<Link style={{color:'white'}}>SignIn</Link>}</h3>
            
        </div>
        <div>
        <div style={{textAlign:'center',color:'skyblue'}}>
             <p>
                <h1>Sign in to your account</h1>
                <h3>Enjoy your trip!</h3>
             </p>
        </div>
        <div style={{display:'flex',marginTop:'80px'}}>
             <img src={images[count%images.length]} alt='Car image' style={{height:'80%',width:'50%'}}/>
             {In?<SignIn />:<SignUp />}
        </div>
        </div>
        </div>
        </div>
     
    );


};

