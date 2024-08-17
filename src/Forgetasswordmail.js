import React, { useState } from 'react';


const Forgetasswordmail = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        fetch('http://localhost:4000/forgetpasswordemailsender', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
          'Content-Type': 'application/json',
            },
         
            body: JSON.stringify({email:email})
          }).then((resp)=>{
            // console.warn("resp",resp);;
            resp.json().then((data)=>{
    //   if(data['msg'] === 'varified successfully'){
      
    //           }
    if(data['errors'] !== undefined){
        setMessage(data['errors'].map((item)=>item.msg));
}else{

setMessage(data['msg']);


}
              
              
            }
           
            
            
        )
          })
        
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Send Email</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Forgetasswordmail;
