import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LOGINBYJWT from "./LOGINBYJWT";
import { useState } from "react";
import JWTAUTHENTICATEDPROFILEROUTE from "./JWTAUTHENTICATEDPROFILEROUTE"

function JWTPROTECTEDROUTES(props){
    const navigate = useNavigate();
    const { Components,lala } = props;
const [checkcomp, setCheckcomp] = useState();



// useEffect(
    
    // ()=>{
  //  const loginn = localStorage.getItem('loginn');
  //       if(!loginn){
  //         navigate('/LOGIN');
  //       }
    // }
//):
useEffect(
    
  ()=>{
    
    const token = localStorage.getItem('token');

      if(!token){
      navigate('/LOGINBYJWT');
        return;
      }
    fetch('http://localhost:4000/reactroutejwtauth', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
       
      }).then((resp)=>{
        // console.warn("resp",resp);;
        resp.json().then((result)=>{
          // console.log(result);
    if(result['msg'] !== "token has been varified"){
           navigate('/LOGINBYJWT');
            return;
          };
          if(lala === "itslogin"){
            setCheckcomp(true);
          }
    }
        
    )
      })
  }  
  ,[]);
  
    return(
    <div>
      {checkcomp ? <JWTAUTHENTICATEDPROFILEROUTE /> : <Components />}
       
    </div>
    
    
    ) 
    
    }


    export default JWTPROTECTEDROUTES;