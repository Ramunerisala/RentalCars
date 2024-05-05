import react from 'react';

var About=()=>{
    
    async function handleSubmit(e){

          e.preventDefault();
          try{
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const response = await fetch('${proxyUrl}https://jsonplaceholder.typicode.com/posts');
          console.log('all ok');console.log(response);}
          
          catch(error){
            console.log(error.message);
          }
          }
    

    return <button onClick={handleSubmit}>Submit</button>
};
export default About; 