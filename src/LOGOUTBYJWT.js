import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LOGOUTBYJWT(props){
    const navigate = useNavigate();
    
   
useEffect(
    
  ()=>{
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/logoutbyjwt', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
        },
        
       
      }).then((resp)=>{
        // console.warn("resp",resp);;
        resp.json().then((result)=>{
          //console.log('hi i am profile',result);
         
          if(result['msg']=='YOU ARE LOGGEDOUT SUCCESSFULLY'){
            navigate('/LOGINBYJWT');
    }
      
    }
        
    )
      })
  }  
  ,[]);
    return(
    <div>
</div>
    
    
    ) 
    
    }


    export default LOGOUTBYJWT;