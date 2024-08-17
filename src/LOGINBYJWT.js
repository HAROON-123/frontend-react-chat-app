import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGINBYJWT = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setErrormessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/loginbyjwt', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
      'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      }).then((resp)=>{
        // console.warn("resp",resp);;
        resp.json().then((result)=>{
            if(result['err'] !== undefined){
                setErrormessage(result['err'].map((item)=>item.msg));
      }else{
        console.log(result);
        setErrormessage(result['msg']);
        if(result['msg']=="login successfully"){
            ///saving the token in client's browser
      localStorage.setItem('token',result['user'])
        navigate('/JWTAUTHENTICATEDPROFILEROUTE')
    }
        }
       
    }
        
    )
      })
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>EMAIL:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
    <button onClick={() => {navigate('/Forgetasswordmail')}}>Forget Password</button>
    
    </div>
  );
};

export default LOGINBYJWT;
