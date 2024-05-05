import react,{useState,useEffect}from 'react';

var useBranch=(url)=>{
    
    var [data,setData]=useState([]);
    var [isLoading,setLoading]=useState(true);
    var updateLoading=(toggle)=>setLoading(toggle);
    var getData=async()=>{
        try{
            var response=await fetch(url,{method:'GET',headers:{'Content-Type':'application/json'},credentials:'include'});
            if(response.ok){
                var newData=await response.json();setData(newData);updateLoading(false);
            }
            else{
               alert(await response.json());
            }
        }catch(error){
            alert(error.message);
        }
    };
    useEffect(()=>{
        getData();
    },[isLoading]);
    return {data,isLoading,updateLoading};
};

export default useBranch;