import react from 'react';
import {NavLink} from 'react-router-dom';

var Profile=(props)=>{
       
    var {user}=props;


    return <div style={{textAlign:'center',overflow:'scroll',background:'white',height:'300px',width:'200px',borderStyle:'solid',borderWidth:'1px',display:'block'}}>
    <div>
    <header style={{fontSize:'25px',color:'blueviolet'}}>Profile</header>
    <hr/>
    <h3>Name:{user.username}</h3>
    <hr/>
    </div>
    <div>
    <h3>Email:{user.email}</h3>
    </div>
    <hr/>
    <div>
        <NavLink to='*'><h3>Edit profile</h3></NavLink>
        <hr/>
    </div>
    <div>
        <NavLink to='*'><h3 style={{color:'red'}}>Logout</h3></NavLink>
        <hr/>
    </div>
    
    </div>
};
export default Profile;
