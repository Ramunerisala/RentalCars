import react,{useState} from 'react';
import {NavLink,useNavigate} from 'react-router-dom';
import { faBars,faCar} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RideOp from './RideOp.js';
import Profile from './Profile.js';
var User=(props)=>{
    var navigate=useNavigate();
    var {user}=props;var [hovered,setHovered]=useState(false);var [sidehover,setSideHover]=useState(false);
     var [ride,setRide]=useState({cancel:false,manage:false,drop:false});



    return <div>
        <div style={{backgroundColor:'purple',height:'80px',display:'flex'}}>
            <div style={{paddingLeft:'25px',paddingTop:'25px'}} >
                <div onClick={()=>setSideHover(!sidehover)}>
            <FontAwesomeIcon icon={faBars} />
            </div>
            {sidehover && <div style={{display:'flex'}}>
            <div style={{textAlign:'center',backgroundColor:'lightgrey',position:'relative',top:'35px',height:'650px',width:'150px'}}>
                
                <div style={{paddingTop:'10px'}} onClick={()=>navigate('/user/ride')}>
                    <NavLink><h3>Book a ride</h3></NavLink>
                </div>
                <hr/>
                <div style={{paddingTop:'10px'}} onClick={()=>navigate('/bookings/active')}>
                    <NavLink><h3>Active Rides</h3></NavLink>
                </div>
                <hr/>
                <div style={{paddingTop:'10px'}}>
                    <NavLink><h3>History</h3></NavLink>
                </div>
                <hr/>
                <div style={{paddingTop:'10px',backgroundColor:ride.cancel?'grey':''}} onClick={()=>setRide({cancel:!ride.cancel,manage:false,drop:false})}>
                    <NavLink><h3>Cancel Ride</h3></NavLink>
                    
                </div>
                <hr/>
                <div style={{paddingTop:'10px',backgroundColor:ride.manage?'grey':''}} onClick={()=>setRide({cancel:false,manage:!ride.manage,drop:false})}>
                    <NavLink><h3>Manage Ride</h3></NavLink>
                </div>
                <hr/>
                <div style={{paddingTop:'10px',backgroundColor:ride.drop?'grey':''}} onClick={()=>setRide({cancel:false,manage:false,drop:!ride.drop})}>
                    <NavLink><h3>Drop vehicle</h3></NavLink>
                </div>
                <hr/>
            </div>
            { (ride.cancel || ride.manage || ride.drop) &&
            <div style={{position:'relative',top:'300px'}}>
                <RideOp ride={ride} />
            </div>
            }
                </div>}
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
            <h2 style={{paddingLeft:'30px',color:'white'}}>EagleC.com</h2>
            <FontAwesomeIcon icon={faCar} />
            </div>
            {/* <div style={{display:'grid',width:'100px',marginLeft:'400px',paddingTop:'5px'}}>
            <label for='capacity'>Max Capacity</label>  
            <select id="capacity">
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
            </select>
            </div> */}
            {/* <div style={{display:'grid',width:'100px',marginLeft:'100px',paddingTop:'20px'}}>
            <label for='car'>Select Car</label>  
            <select id="car" style={{height:'20px'}}>
                <option value='Audi'>Audi</option>
                <option value='Benz'>Benz</option>
                <option value='Jaguar'>Jaguar</option>
                <option value='Innova'>Innova</option>
                <option value='Range Rover'>Range Rover</option>
            </select>
            </div> */}
            {/* <div style={{width:'100px',height:'10px',marginLeft:'100px',paddingTop:'50px'}}> 
            <input type='text' placeholder='search pickup point' autoFocus/>
            </div> */}
            <div style={{marginLeft:'950px'}}>
            <p style={{paddingBottom:'1px',paddingTop:'1px',color:'skyblue'}}>Welcome</p>    
            <h3 onClick={()=>setHovered(!hovered)}>{user.username}</h3>
            <div>
                {hovered && <Profile user={user} />}
            </div>
            </div>
        </div>
        
    </div>
};

export default User;