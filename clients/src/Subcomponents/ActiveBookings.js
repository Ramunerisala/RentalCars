import react,{useState,useEffect}from 'react';

var ActiveBookings=()=>{

var [data,setData]=useState([]);

useEffect(async()=>{
    try{
  var response=await fetch('http://localhost:4000/bookings/active',{method:'GET',headers:{'Content-Type':'application/json'},credentials:'include'});
  if(response.status==200){var fetchedData=await response.json();setData(fetchedData);}

    }catch(error){
        console.log(error.message);alert(error.message);
    }
},[]);
    return <div style={{textAlign:'center',backgroundColor:'lightgray'}}>

    {!data?<h1>No active bookings</h1>:<div>
        <h1>Here are the active bookings</h1>
        <table className="Table" style={{marginLeft:'500px'}}>
      <thead>
        <tr>
          <th>Id</th>
          <th>PickUpPoint</th>
          <th>StartDate</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item._id}</td>
            <td>{item.pickUpPoint}</td>
            <td>{item.startDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
        </div>}
    </div>
};

export default ActiveBookings;