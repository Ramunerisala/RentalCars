import react,{useState,useRef}from 'react';
import {useJsApiLoader,GoogleMap,Marker,Autocomplete,DirectionsRenderer} from '@react-google-maps/api';
import { faLocationArrow, faTimes} from '@fortawesome/free-solid-svg-icons';
import useBranch from '../customHooks/useBranch.js';
import DisplayCars from './DisplayCars.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const url='http://localhost:4000/cars/getAll';
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j].Distance > arr[j + 1].Distance) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }
var GoogleTrip=()=>{
    const {isLoaded}=useJsApiLoader({googleMapsApiKey:'AIzaSyDK139zk-8Tvs2VPUY_silw1UqhgKOQ6cs',libraries:['places']});
    var {data,isLoading,updateLoading}=useBranch(url);
    var [filter,setFilter]=useState({capacity:'',name:''});var [sortData,setSortData]=useState(data);
    console.log(data);
    const [distance,setDistance]=useState('');
    const [duration,setDuration]=useState('');
    const [map,setMap]=useState(/** @type google.maps.Map */ (null));
    const [directionResponse,setDirectionResponse]=useState(null);
    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef=useRef();
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef=useRef();    
    
    var calculateRoute=async ()=>{
    
        if(originRef.current.value==''||destinationRef.current.value==''){return ;}
        
        // eslint-disable-next-line no-undef
        const directionServices=new google.maps.DirectionsService();
        const results=await directionServices.route({origin:originRef.current.value,destination:destinationRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode:google.maps.TravelMode.DRIVING});
        try{
        var newData=await Promise.all(data.map(async (item)=>{
          const p=await directionServices.route({origin:originRef.current.value,destination:item.available,
        // eslint-disable-next-line no-undef
         travelMode:google.maps.TravelMode.DRIVING});
         return {...item,Distance:p.routes[0].legs[0].distance.text,Duration:p.routes[0].legs[0].duration.text}
    }));}catch(error){alert('there are no car available nearby places!');}
        sortData=bubbleSort(newData);sortData=sortData.filter((eachObj)=>eachObj.availability);
        if(filter.capacity!=''){sortData=sortData.filter((eachObj)=>eachObj.capacity==filter.capacity);console.log(sortData);}
        if(filter.name!=''){sortData=sortData.filter((eachObj)=>eachObj.name==filter.name);}
        console.log(sortData);setSortData(sortData);
        setDirectionResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
    };

    var clearRoute=()=>{
        setDirectionResponse(null);setDistance('');setDuration('');originRef.current.value='';destinationRef.current.value='';
    }
    return <div style={{display:'flex',backgroundColor:'white'}}>
        <div>
            <GoogleMap onLoad={(map)=>setMap(map)} center={{lat:48.8584,lng:2.2945}} zoom={15} mapContainerStyle={{width:'600px',height:'700px'}} options={{zoomControl:false,streetViewControl:false,mapTypeControl:false,fullscreenControl:false}}>
                  <Marker position={{lat:48.8584,lng:2.2945}} />
                  {directionResponse && <DirectionsRenderer directions={directionResponse}/>}
            </GoogleMap>
        </div>
        <div style={{display:'flex'}}>
        <div style={{marginLeft:'50px',backgroundColor:'lightgrey',height:'100px'}}>
            <div style={{display:'flex'}}>
                <Autocomplete>
                <input type='text' placeholder='Pickup location' ref={originRef}/>
                </Autocomplete>
                <Autocomplete>
                <input type='text' placeholder='Drop point' ref={destinationRef} />
                </Autocomplete>
                <label for='capacity'>Capacity</label>
                <select id='capacity' value={filter.capacity} onChange={(e)=>setFilter({...filter,capacity:e.target.value})}>
                    <option value=''>--</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                </select>
                <label for='Car'>Car Type</label>
                <select id='Car' value={filter.name} onChange={(e)=>setFilter({...filter,name:e.target.value})}>
                    <option value=''>--</option>
                    <option value='Audi'>Audi</option>
                    <option value='Range Rover'>Range Rover</option>
                    <option value='Benzz'>Benzz</option>
                    <option value='innova'>innova</option>
                    <option value='Jaguar'>Jaguar</option>
                </select>
                <button Style={{backgroundColor:'pink'}} onClick={calculateRoute}>Calculate Route</button>
                <button style={{backgroundColor:'red'}} onClick={clearRoute}>
                <FontAwesomeIcon aria-label='center back' icon={faTimes}/>
                </button>
            </div>
            <div style={{display:'flex', justifyContent:'space-evenly'}}>
                <h3>Distance : {distance}</h3>
                <h3>Duration : {duration}</h3>
                <button  style={{backgroundColor:'green',marginTop:'20px',height:'40px'}}>
                <FontAwesomeIcon  aria-label='center back' icon={faLocationArrow} style={{paddingTop:'20px'}} onClick={()=>map.panTo({lat:48.8584,lng:2.2945})}/>
                </button>
            </div>
            <div>
                <DisplayCars data={sortData}/>
            </div>
            
            </div>
            
        </div>
    </div>

};

export default GoogleTrip;