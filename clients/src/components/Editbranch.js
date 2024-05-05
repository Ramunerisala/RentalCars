import react,{useState,useEffect}from 'react';
import './Home.css';
import useBranch from '../customHooks/useBranch.js';
const url='http://localhost:4000/branch/getAll';
var EditBranch=()=>{
    var [branch,setBranch]=useState({place:'',capacity:0,occupied:0});
    var {data,isLoading,updateLoading}=useBranch(url);
    var [edit,setEdit]=useState('');
    var handleSubmit=async(e)=>{
       try{ e.preventDefault();updateLoading(true);
        if(branch.place=='' || branch.capacity==0){alert('None of the fields should be empty!');}
        else{
        var response=await fetch('http://localhost:4000/branch/addBranch',{method:'POST',body:JSON.stringify(branch),headers:{'Content-Type':'application/json'},credentials:'include'});
        console.log(response);
        updateLoading(false);
        var message=await response.json();alert(message);
        setBranch({place:'',capacity:0,occupied:0});
        }
       }catch(error){
        alert(error.message);
        console.log(error);
       }
    };

    var handleDelete=async (id)=>{
        var url='http://localhost:4000/branch/delete/'+id;console.log(url);
        try{updateLoading(true);
            var response=await fetch(url,{method:'DELETE',headers:{'Content-Type':'application/json'},credentials:'include'});
            console.log(response);updateLoading(false);var message=await response.json();alert(message);
        }catch(error){
            alert(error.message);console.log(error.message);
        }
        
    }

   var handleEdit=async (edit)=>{
           var url='http://localhost:4000/branch/edit/'+edit;console.log(url);
        try{updateLoading(true);
        var response=await fetch(url,{method:'PUT',body:JSON.stringify(branch),headers:{'Content-Type':'application/json'},credentials:'include'});
        console.log(await response.json());
        }catch(error){
        alert(error.message);console.log(error.message);
        }
        setEdit('');
   }


return <div>
    <h1 style={{textAlign:'center',backgroundColor:'lightgray'}}>Add/Update branch</h1>

<div style={{alignItems:'center',marginLeft:'650px',marginTop:'40px'}}>
    <form style={{backgroundColor:'lightgrey',width:'300px'}} onSubmit={!edit?handleSubmit:()=>handleEdit(edit)}>
        <div>
        <div style={{paddingLeft:'70px',paddingTop:'30px',marginleft:'200px',display:'grid',width:'100px'}}>
        <label for='place'>Branch Name</label>
        <input type='text' id='place' name='place' placeholder='Enter the place of branch' value={branch.place} onChange={(e)=>setBranch({...branch,place:e.target.value})}/>
        </div>
        <div style={{paddingLeft:'70px',paddingTop:'30px',display:'grid',width:'100px'}}>
        <label for='capacity'>Max Capacity</label>
        <input type='Number' id='capacity' name='capacity' min='1' placeholder='Enter max capacity' value={branch.capacity} onChange={(e)=>setBranch({...branch,capacity:e.target.value})}/>
        </div>
        {edit && <div style={{paddingLeft:'70px',paddingTop:'30px',display:'grid',width:'100px'}}>
        <label for='Available'>Available</label>
        <input type='Number' id='Available' name='Available' min='1' placeholder='Enter park areas' value={branch.occupied} onChange={(e)=>setBranch({...branch,occupied:e.target.value})}/>
        </div>}
        <div>
            <button type='Submit' style={{width:'100px',marginTop:'30px',marginLeft:'100px',backgroundColor:'lightblue'}}>{!edit?'Add':'Edit'}</button>
        </div>
        </div>
    </form>
</div>
<hr/>
<div style={{marginLeft:'550px'}}>
{isLoading?<h3>Data loading</h3>:(data.length==0 ?<h3>No data is available</h3>:<div>

<table className="Table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Place</th>
          <th>Capacity</th>
          <th>Available</th>
          <th>Cars</th>
          <th colSpan='2'>Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.capacity}</td>
            <td>{item.available}</td>
            <td>{item.cars.join(',')}</td>
            <td><button style={{backgroundColor:'violet',cursor:'pointer'}} onClick={()=>{setEdit(item._id);setBranch({place:item.name,capacity:item.capacity,occupied:item.available})}}>Edit</button></td>
            <td><button style={{backgroundColor:'red',cursor:'pointer'}} onClick={()=>handleDelete(item._id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>



</div>)}
</div>



</div>

};

export default EditBranch;