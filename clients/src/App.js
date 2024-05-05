import react,{useState,useEffect,useContext} from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import {Home} from './components/Home.js';
import About from './components/About.js';
import GetDetails, { userContext } from './components/GetDetails.js';
import User from './components/User.js';
import EditBranch from './components/Editbranch.js';
import ShowCustomers from './Subcomponents/showCustomers.js';
import CarsOp from './components/Cars.js';
import GoogleTrip from './Subcomponents/googletrip.js';
import UserRide from './Subcomponents/userRide.js';
import Booking from './Subcomponents/Booking.js';
import ActiveBookings from './Subcomponents/ActiveBookings.js';
function App() {
  var {user}=useContext(userContext);
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />}/>
        <Route path='/getdetails' element={<GetDetails />}/> 
        <Route path='/User' element={<User user={user}/>}/>
        <Route path='*' element={<h1>Page not found 404</h1>} />
        <Route path='/edit/branch' element={<EditBranch />}/>
        <Route path='/op/customers' element={<ShowCustomers />}/>
        <Route path='/carOp' element={<CarsOp />}/>
        <Route path='/googletrip' element={<GoogleTrip />} />
        <Route path='/user/ride' element={<UserRide />} />
        <Route path='/book/:id/:name/:color/:capacity/:pickuppoint' element={<Booking />}/>
        <Route path='/bookings/active' element={<ActiveBookings />}/>
      </Routes>
    </div>
  );
}

export default App;
