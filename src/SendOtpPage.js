import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const {email,id} = useParams();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [message, setMessage] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let timer;
    if (isButtonDisabled) {
      timer = setInterval(() => {
        setCounter(prevCounter => {
          if (prevCounter <= 1) {
            clearInterval(timer);
            setIsButtonDisabled(false);
            return 0;
          }
          return prevCounter - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isButtonDisabled]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move focus to next input box if not the last one and value of the current is present
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSendOtp = async() => {
    // Logic to send OTP
    fetch('http://localhost:4000/otpmailsender', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
    'Content-Type': 'application/json',
      },
   
      body: JSON.stringify({email})
    }).then((resp)=>{
      // console.warn("resp",resp);;
      resp.json().then((data)=>{
        if(data['err'] !== undefined){
          setMessage(data['err'].map((item)=>item.msg));
  }
  else{
   setMessage(data['msg']);
  }
        
        // setMessage(result);
        setIsButtonDisabled(true);
        setCounter(60);
        
      }
     
      
      
  )
    })
    // setMessage('The otp has been sent to your registered email and phone number');
  };

  const handleVerifyOtp = () => {
    // Join the OTP array to form the complete OTP
    const userOtp = otp.join('');
    
    fetch('http://localhost:4000/verifytheotp', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
    'Content-Type': 'application/json',
      },
   
      body: JSON.stringify({otp:userOtp,id})
    }).then((resp)=>{
      // console.warn("resp",resp);;
      resp.json().then((data)=>{
if(data['msg'] === 'varified successfully'){
  navigate('/LOGINBYJWT');

        }
        if(data['err'] !== undefined){
          setMessage(data['err'].map((item)=>item.msg));
  }
  else{
  
   setMessage(data['msg']);
  }
        
        
      }
     
      
      
  )
    })
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>OTP Verification</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            name="otp"
            maxLength="1"
            value={data}
            onChange={e => handleChange(e.target, index)}
            onFocus={e => e.target.select()}
            style={{
              width: '40px',
              height: '40px',
              margin: '0 5px',
              fontSize: '20px',
              textAlign: 'center',
            }}
          />
        ))}
      </div>
      <div style={{ marginBottom: '20px' }}>
      <button
          onClick={handleSendOtp}
          disabled={isButtonDisabled}
          style={{ 
            opacity: isButtonDisabled ? 0.5 : 1, 
            cursor: isButtonDisabled ? 'not-allowed' : 'pointer' 
          }}
        >
          {isButtonDisabled ? `Send OTP (${counter}s)` : 'Send OTP'}
        </button>        <button onClick={handleVerifyOtp} style={{ marginLeft: '10px' }}>Verify OTP</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OtpVerification;
