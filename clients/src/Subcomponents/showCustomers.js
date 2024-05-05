import react,{useEffect} from 'react';
import useBranch from '../customHooks/useBranch.js';
const url='http://localhost:4000/op/customers';
var ShowCustomers=()=>{


var {data}=useBranch(url);
console.log(data);

    return <div>
        <h1 style={{textAlign:'center',backgroundColor:'lightgrey'}}>Here are all coustomers</h1>
        <hr/>
        <div style={{marginLeft:'500px'}}>
<table className="Table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Username</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item._id}</td>
            <td>{item.username}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>



</div>
</div>


        
};

export default ShowCustomers;
