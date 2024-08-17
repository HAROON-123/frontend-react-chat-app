import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Registerforchatapp =()=>{
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    image: null
  });
  const navigate = useNavigate();

  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');

  const { name, email, password, mobile, image } = formData;
const mail = email;
  const onChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
      setFilename(e.target.files[0].name);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('mobile', mobile);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
     // console.log(data);

      if(data['msg'] === 'registered sucessfully'){
        localStorage.setItem('token','')

        navigate(`/otpsenderpage/${email}/${data['user']._id}`);
      }
      if(data['errors'] !== undefined){
        setMessage(data['errors'].map((item)=>item.msg));
}
else{
//console.log(data);
 setMessage(data['msg']);

}
    } catch (error) {
console.log(error)    ;
}
  };

  return (
    <div className="container">
      <h2>User Registration</h2>
      {message && <p>{message}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <div>
          <label>Mobile:</label>
          <input type="text" name="mobile" value={mobile} onChange={onChange} required />
        </div>
        <div>
          <label>Profile Image:</label>
          <input type="file" name="image" onChange={onChange} required />
          <label>{filename}</label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registerforchatapp;
