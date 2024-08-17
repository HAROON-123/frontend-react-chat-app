
import { useEffect } from "react";
import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

//////////////////////////////////////////////////
//////////now we are using the BROWSER'S local storage for storage but in realty we use
//////////////////////////////////will be the mongodb ///////









function Forgetpage(){
  

    const [errormessage, setErrormessage] = useState([]);
    const [password, setPassword] = useState('');
    const [confirmedpassword, setConfirmedpassword] = useState('');
    const [token, setToken] = useState('');
    const [user_id, setUser_id] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const pharam1token = params.get('token');
    const pharam2user_id = params.get('user_id');



    
useEffect(
    
  ()=>{
    
    const params = new URLSearchParams(location.search);

    const pharam1token = params.get('token');
    const pharam2user_id = params.get('user_id');
    const func=()=>{
    if(pharam1token ==null &&  pharam2user_id==null){
      navigate('/LOGINBYJWT');
    }
  }
  func();
}
  );
    
function handleLogin(e){
    setToken(pharam1token);
    setUser_id(pharam2user_id);
    // localStorage.setItem('loginn',true);
    // navigate('/');
    e.preventDefault();
  fetch('http://localhost:4000/updatepassword', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
      'Content-Type': 'application/json',
        },
        body: JSON.stringify({password,confirmedpassword,pharam1token,pharam2user_id})
      }).then((resp)=>{
        // console.warn("resp",resp);;
        resp.json().then((result)=>{
if(result['err'] !== undefined){
          setErrormessage(result['err'].map((item)=>item.msg));
}else{
  
  setErrormessage(result['msg']);
  if(result['msg']=="SUCCESS YOUR PASSWORD HAS BEEN CHANGED SUCCESFULLY"){
navigate('/LOGINBYJWT');
  }
 
  if(result['msg']=="sorry no data found for this token"){
    navigate('/LOGINBYJWT');
      }
}
        //   if(result['message'] === 'Login successful' &&  resp.status === 200){
        //   navigate('/')

         // }
        }
       
        
        
    )
      })
//

}

    


return(
    <form onSubmit={handleLogin}>
    <div>
    <label>ID:</label>
    <input type="hidden" value={user_id} />
    <input type="hidden" value={token} />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div>
      <label>Confirmed your Password:</label>
      <input
        type="password"
        value={confirmedpassword}
        onChange={(e) => setConfirmedpassword(e.target.value)}
      />
    </div>
 
    <div>
      <button type="submit">Submit your password</button>
    </div>
    <div style={{color:'white',backgroundColor:'red',}}><h1>{errormessage}</h1></div>

  </form>

) 

}
export default Forgetpage;