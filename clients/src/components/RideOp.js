import react from 'react';

var RideOp=(props)=>{
    var {ride}=props;var {cancel,manage,drop}=ride;


    return <div style={{textAlign:'center',backgroundColor:'white',borderColor:'black',borderStyle:'solid',width:'200px',height:'120px'}}>
           <header style={{backgroundColor:'skyblue'}}>{cancel?'Cancel Ride':(manage?'Manage Ride':'Drop Ride')}</header>
           <hr/>
           <form>
            <div>
            <label for='reservation'>Reservation ID</label>
            <input type='text' />
            </div>
            <button style={{backgroundColor:'blue'}}type='submit'>{cancel?'cancel':(manage?'Show Details':'Drop')}</button>
           </form>
    </div>
};
export default RideOp;