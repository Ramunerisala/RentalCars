import react,{useState,useEffect}from 'react';
import useBranch from '../customHooks/useBranch.js';
const url='http://localhost:4000/cars/getAll';
var CarsOp=()=>{
var [car,setCar]=useState({name:'',color:'',place:'',image:'',capacity:'',availability:Boolean(true)});    
var {data,isLoading,updateLoading}=useBranch(url);
var [edit,setEdit]=useState(null);
var handleSubmit=async (e)=>{
    e.preventDefault();
    try{console.log('hello');updateLoading(true);
        var response=await fetch('http://localhost:4000/cars/add',{method:'POST',body:JSON.stringify(car),headers:{'Content-Type':'application/json'},credentials:'include'});
        
        if(response.ok){alert(car.name+' is succesfully added to EagleC.com');}
        else{var message=await response.json();
            console.log(message);
            alert(message);
        }updateLoading(false);
    }catch(error){
        console.log(error.message);alert(error.message);
    }
}

var handleDelete=async (id)=>{
    try{updateLoading(true);
        var response=await fetch('http://localhost:4000/cars/delete/'+id,{method:'DELETE',headers:{'Content-Type':'application/json'},credentials:'include'});
        var message=await response.json();var status=await response.status;
        if(response.ok){alert(message,status);}
        else{
            alert(message,status);
        }
        
    }catch(error){
        console.log(error.message);alert(error.message);
    }
    updateLoading(false);
}

var handleEdit=async (edit)=>{

try{updateLoading(true);
    var response=await fetch('http://localhost:4000/cars/edit/'+edit,{method:'PUT',body:JSON.stringify(car),headers:{'Content-Type':'application/json'},credentials:'include'});
    if(response.ok){alert('your car is updated succesfully!');}
    else{var message=await response.json();alert(message);}

}catch(error){
    console.log(error.message);alert(error.message);
}
setEdit(null);
updateLoading(false);

};


    return <div style={{textAlign:'center'}}>
        <h1 style={{backgroundColor:'lightgrey'}}>Here are the car operations</h1>
        <hr/>
        <form onSubmit={!edit?handleSubmit:()=>handleEdit(edit)}>
            <div style={{borderStyle:'solid',borderWidth:'1px',width:'200px',marginLeft:'600px',backgroundColor:'lightskyblue',boxShadow:'3px 3px 2px'}}>
            <div style={{marginTop:'10px'}}>
                <label for='name'>Car Name:</label>
                <input type='text' id='name' name='name' placeholder='Enter car name' value={car.name} onChange={(e)=>setCar({...car,name:e.target.value})}/>
            </div>
            <div style={{marginTop:'10px'}}>
                <label for='color'>Color:</label>
                <input type='text' id='color' name='color' placeholder='Enter car color' value={car.color} onChange={(e)=>setCar({...car,color:e.target.value})}/>
            </div>
            <div style={{marginTop:'10px'}}>
                <label for='place'>Available at:</label>
                <input type='text' id='place' name='place' placeholder='Enter car place' value={car.place} onChange={(e)=>setCar({...car,place:e.target.value})}/>
            </div>
            <div style={{marginTop:'10px'}}>
                <label for='image'>Image</label>
                <input type='text' placeholder='Enter image url' id='image' name='image' value={car.image} onChange={(e)=>setCar({...car,image:e.target.value})}/>
            </div>
            {edit && <div style={{marginTop:'10px'}}>
                <label for='Availability'>Availability:</label>
                <select value={car.availabilty} onChange={(e)=>setCar({...car,availability:e.target.value})}>
                    <option value='1'>true</option>
                    <option value='0'>false</option>
                </select>
            </div>}
            <div style={{marginTop:'10px'}}>
                <label for='capacity'>Capacity:</label>
                <select value={car.capacity} onChange={(e)=>setCar({...car,capacity:e.target.value})}>
                    <option value=''>--</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                </select>
            </div>
            <div style={{marginTop:'10px',boxShadow:'1px 1px'}}>
                <button type='submit' style={{backgroundColor:'black',color:'white',textShadow:'1px 1px'}}>{!edit?'Add':'Edit'}</button>
            </div>
            </div>
            </form>
        <hr/>
        <div>
            {isLoading?'DataLoading...':(data.length==0?'No Data is available':<div>

            <table className="Table">
      <thead>
        <tr>
          <th>Id</th>
          <th>name</th>
          <th>Availability</th>
          <th>Capacity</th>
          <th>Available at</th>
          <th>Color</th>
          <th>Images</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{String(item.availability)}</td>
            <td>{item.capacity}</td>
            <td>{item.available}</td>
            <td>{item.color}</td>
            <td>{item.Images}</td>
            <td>{item.Rating}</td>
            <td><button style={{backgroundColor:'violet',cursor:'pointer'}} onClick={()=>{setEdit(item._id);setCar({name:item.name,availability:item.availability,capacity:item.capacity,color:item.color,image:item.Images,place:item.available})}}>Edit</button></td>
            <td><button style={{backgroundColor:'red',cursor:'pointer'}} onClick={()=>{handleDelete(item._id)}}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>






            </div>)}
        </div>
        </div>
};
export default CarsOp;