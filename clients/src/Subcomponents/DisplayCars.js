import react,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../components/GetDetails';

var DisplayCars=(props)=>{
var {user}=useContext(userContext);
var {data}=props;
var navigate=useNavigate();
return <div>
    {data.map((eachObj)=>(
    <div style={{display:'flex',backgroundColor:'skyblue',borderStyle:'dashed',marginTop:'5px',borderColor:'skyblue',height:'150px'}}>
    <div style={{marginRight:'50px'}}>
        <p>Name:{eachObj.name}</p>
        <p>Color:{eachObj.color}</p>
        <p>Distance:{eachObj.Distance}</p>
        
    </div>
    <div style={{marginRight:'50px'}}>
        <p>Availability Status:{eachObj.availability?'true':'false'}</p>
        <p>Available at:{eachObj.available}</p>
        
    </div>
    <div style={{marginRight:'50px'}}>
    <p>Capacity:{eachObj.capacity}</p>
    <p>Rating:{eachObj.Rating}</p>
    <p>Duration:{eachObj.Duration}</p>
    </div>
    <div style={{marginRight:'80px'}}>
       <img src={eachObj.Images} alt='This is car image' width='150px' height='100px'/>
    </div>
    {!user.isAdmin &&
    <div style={{marginTop:'50px',marginRight:'50px'}} onClick={()=>navigate('/book/'+eachObj._id+'/'+eachObj.name+'/'+eachObj.color+'/'+eachObj.capacity+'/'+eachObj.available)}>
       <button style={{color:'pink'}}>Book vehicle</button>
    </div>}
    
    </div>
))}
</div>


};
export default DisplayCars;