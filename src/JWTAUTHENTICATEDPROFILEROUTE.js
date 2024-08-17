//I AM MAKING THIS FOR ORACTICE OF SENDING GENERATED TOKEN TO SERVER AND THIS FILE ROUTE IN AUTHENTICATED BY THE JWT NY SERBVER
//SO WE ARE GOING TO SEND THE GENERATED TOKEN THAT IS STORED IN OUR BROWSER'S LOCSL STORAGE TO SERVER USING AUTHENTICATION HEADER


// function JWTAUTHENTICATEDPROFILEROUTE(){

// return (
//     <div style={{backgroundColor:"red"}}>HI I AM A JWT PROTECTED profile ROUTE</div>
// )


// }

// export default JWTAUTHENTICATEDPROFILEROUTE;
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react"

function JWTAUTHENTICATEDPROFILEROUTE(props){
    const navigate = useNavigate();
    const { Components } = props;
const [userdata,setUserdata]= useState('');
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
    fetch('http://localhost:4000/profile', {
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
          if(result['userdta']!== undefined){
          setUserdata(result['userdta']);
          }else{
            navigate('/LOGINBYJWT');
          }
    }
        
    )
      })
  }  
  ,[]);
  const imageUrl = `http://localhost:4000/public/${userdata.image}`;
    return(
    <div>
  <div style={{backgroundColor:"red"}} >HI I AM A JWT PROTECTED profile ROUTE</div>
<div><h1>MY DATA ACCORDING TO SENT TOKEN IS</h1></div>
<div><h1>NAME:{userdata.name}</h1></div>
<div><h1>EMAIL:{userdata.email}</h1></div>
<div><h1>password:{userdata.password}</h1></div>
<div><h1>image:{userdata.image}</h1></div>
<div><h1>varified:{userdata.isvarified}</h1></div>
<div><h1>status:{userdata.status}</h1></div>

<div><img src={imageUrl} /></div>

</div>
    
    
    ) 
    
    }


    export default JWTAUTHENTICATEDPROFILEROUTE;