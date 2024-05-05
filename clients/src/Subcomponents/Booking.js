import react from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../components/GetDetails';
var Booking=()=>{
    var {id,name,color,capacity,pickuppoint}=useParams();
    var car={id,name,color,capacity,pickuppoint};var navigate=useNavigate();
   var handleSubmit=async(e)=>{
     e.preventDefault();try{
     var response=await fetch('http://localhost:4000/bookings/book',{method:'POST',body:JSON.stringify(car),headers:{'Content-Type':'application/json'},credentials:'include'});
     if(response.ok){alert('your booking is succesfull!');navigate('/googleTrip');}
     }catch(error){
        console.log('hello');
        console.log(error.message);alert(error.message);
     }
   }





    return <div style={{textAlign:'center'}}>
    <h1 style={{backgroundColor:'lightgrey'}}>Booking Details</h1>
    <hr/>
    <form onSubmit={handleSubmit}>
        <div style={{borderStyle:'solid',borderWidth:'1px',width:'200px',marginLeft:'600px',backgroundColor:'lightskyblue',boxShadow:'3px 3px 2px'}}>
        
        <div style={{marginTop:'10px'}}>
            <label for='Carname'>CarName</label>
            <input type='text' id='Carname' name='Carname' value={name} readOnly/>
        </div>
        <div style={{marginTop:'10px'}}>
            <label for='Carcolor'>color</label>
            <input type='text' id='Carcolor' name='Carcolor' value={color} readOnly/>
        </div>
        <div style={{marginTop:'10px'}}>
            <label for='Carcapacity'>CarName</label>
            <input type='text' id='Carcapacity' name='Carcapacity' value={capacity} readOnly/>
        </div>
        <div style={{marginTop:'10px'}}>
            <label for='place'>Pickup at:</label>
            <input type='text' id='place' name='place'  value={pickuppoint} readOnly />
        </div>
        <div style={{marginTop:'10px'}}>
            <label for='date'>Start Date</label>
            <input type='text'  id='date' name='date' value={new Date()} readOnly/>
        </div>
        
        
        <div style={{marginTop:'10px',boxShadow:'1px 1px'}}>
            <button type='submit' style={{backgroundColor:'black',color:'white',textShadow:'1px 1px'}}>Book</button>
        </div>
        </div>
        </form>
        </div>

    
};
export default Booking;