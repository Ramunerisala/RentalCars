import react,{useState,useEffect} from 'react';
import {NavLink,useNavigate} from 'react-router-dom';
import { faBars,faCar} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RideOp from './RideOp.js';
import useBranch from '../customHooks/useBranch.js';
import Profile from './Profile.js';
import DisplayCars from '../Subcomponents/DisplayCars.js';
const url='http://localhost:4000/cars/getAll';
var Admin=(props)=>{
    var {admin}=props;var [hovered,setHovered]=useState(false);var [sidehover,setSideHover]=useState(false);
     
     var navigate=useNavigate();

     var {data,isLoading,updateLoading}=useBranch(url);
     

    return <div>
        <div style={{backgroundColor:'purple',height:'80px',display:'flex'}}>
            <div style={{paddingLeft:'25px',paddingTop:'25px'}} >
                <div onClick={()=>setSideHover(!sidehover)}>
            <FontAwesomeIcon icon={faBars} />
            </div>
            {sidehover && <div style={{display:'flex'}}>
            <div style={{textAlign:'center',backgroundColor:'lightgrey',position:'relative',top:'35px',height:'650px',width:'150px'}}>
                <div style={{paddingTop:'10px'}} onClick={()=>navigate('/googletrip')}>
                    <NavLink><h3>Go to Trip</h3></NavLink>
                </div>
                <hr/>
                <div style={{paddingTop:'10px'}}>
                    <NavLink><h3>Monthly analysis</h3></NavLink>
                </div>
                <hr/>
                <div style={{paddingTop:'10px'}} onClick={()=>navigate('/carOp')}>
                    <NavLink><h3>Add/Modify Car</h3></NavLink>
                </div>
                <hr/>
                <div style={{paddingTop:'10px'}} onClick={()=>navigate('/edit/branch')}>
                    <NavLink><h3>Add/Modify Branch</h3></NavLink>
                    
                </div>
                <hr/>
                <div style={{paddingTop:'10px'}}>
                    <NavLink><h3>Bookings</h3></NavLink>
                </div>
                <hr/>
                <div style={{paddingTop:'10px'}} onClick={()=>navigate('/op/customers')}>
                    <NavLink><h3>Our customers</h3></NavLink>
                </div>
                <hr/>
            </div>
            
                </div>}
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
            <h2 style={{paddingLeft:'30px',color:'white'}}>EagleC.com</h2>
            <FontAwesomeIcon icon={faCar} />
            </div>
            <div style={{marginLeft:'150px'}}>
            <p style={{paddingBottom:'1px',paddingTop:'1px',color:'skyblue'}}>Welcome</p>    
            <h3 onClick={()=>setHovered(!hovered)}>{admin.username}</h3>
            <div>
                {hovered && <Profile user={admin} />}
            </div>
            </div>
        </div>
        <div style={{display:'flex'}}>
        <div style={{marginLeft:'200px',width:'700px'}}>
        <DisplayCars data={data} />
        </div>
        </div>
        
    </div>
};

export default Admin;