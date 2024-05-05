import react,{useEffect,useState,useContext} from 'react';
import User from './User.js';
import Admin from './Admin.js';
var GetDetails=()=>{
    var [auth,setAuth]=useState(false);
    var {user,setuser}=useContext(userContext);



  var getUser=async ()=>{
    
    try{
        var response=await fetch('http://localhost:4000/profile',{method:'GET',credentials:'include'});
        if(response.ok){
          var userDetails=await response.json();
          var {username,email,isAdmin}=userDetails;
          console.log(userDetails);
          setuser(username,email,isAdmin);
          // setAuth(true);
          
        }else if(!response.ok){
          throw new Error('Sorry you are not authenticated!')
        }

    }catch(error){
        alert(error.message);
    }
  }

     useEffect(()=>{
        getUser();if(user!=null){setAuth(true);}
        
     },[]);

    return <div>
        {auth && !user.isAdmin &&<User user={user}/>}
        {auth && user.isAdmin &&<Admin admin={user}/>}
        </div>
};

export default GetDetails;

export var userContext=react.createContext();
export var UserContextProvider=({children})=>{
    var [user,setUser]=useState({username:'',email:'',isAdmin:false});
    var setuser=(username,email,isAdmin)=>{
          setUser({username:username,email:email,isAdmin:isAdmin});
    }
    return <userContext.Provider value={{user,setuser}}>
        {children}
    </userContext.Provider>
};