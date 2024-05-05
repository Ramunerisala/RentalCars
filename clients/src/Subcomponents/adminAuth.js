import react,{useContext}from 'react';
import { userContext } from '../components/GetDetails';
import SignIn from '../components/signIn';

var AdminAuth=({children})=>{
var {user}=useContext(userContext);
var {username,email,isAdmin}=user;

if(!username||!email||!isAdmin){
    return <SignIn />
}

return {children};
};

export default AdminAuth;