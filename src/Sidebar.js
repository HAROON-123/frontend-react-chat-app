import React, { useEffect, useState, useRef } from 'react';
import './Sidebar.css'; // Assuming you've moved css/style.css to src/Sidebar.css
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';

const Sidebar = () => {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [profilename, setProfilename] = useState('');
  const [profileimage, setProfileimage] = useState('');
  const [profileid, setProfileid] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [othertemp, setOthertemp] = useState(0);
  const [tempstate, setTempstate] = useState(0);
const [sortedarray, setSortedarray] = useState([]);
const buttonRef = useRef(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/userstoshow', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then((resp) => {
      resp.json().then((result) => {
        console.log(result);
        setProfilename(result['profilename']);
        setProfileimage(result['profileimage']);
        setProfileid(result['profileid']);
        if (result['userdta'] !== undefined) {
          setUserdata(result['userdta']);
        } else {
          console.log("no user registered yet");
        }
      });
    });
  }, []);

  useEffect(() => {
    if (profileid) {
      const newSocket = io('http://localhost:4000/user-namespace', {
        auth: {
          token: `${profileid}`
        }
      });

      newSocket.on('user-status-update', (data) => {
        setUserdata(prevUserdata =>
          prevUserdata.map(user =>
            user._id === data.userId ? { ...user, status: data.status } : user
          )
        );
      });

      newSocket.on('chat-message', (data) => {
        if(profileid === data.recieverid){
        console.log("Message received from server:", data);
        setChatMessages((prevMessages) => [...prevMessages, { text: data.message, type: 'received', recievedid: data.senderid }]);
      
      if(buttonRef.current){

        buttonRef.current.click();
      }
      
      
      }});

      newSocket.on('readed-message', (data) => {
        setTempstate(data.whosemeeages._id);
        setOthertemp(data.personwhohasreadmessage);
        if(profileid === data.whosemeeages._id){
          setChatMessages(prevChatMessages =>
            prevChatMessages.map(message =>
              message.selectedid === data.personwhohasreadmessage ? { ...message, messagestatus: 1 } : message
            )
          );
        }});
      setSocket(newSocket);
    
      return () => {
        newSocket.disconnect();
      };
    }
  }, [profileid]);
  
  

   const sortingfunction = () => {
    const ii = chatMessages;
    
// Sort messages by createdAt timestamp
const sortedMessages = chatMessages.sort((a, b) => {
  const dateA = new Date(a.timestamp);
  const dateB = new Date(b.timestamp);
  return dateA - dateB;
});
console.log("hi this array", sortedMessages )
// setChatMessages(sortedMessages);
  setSortedarray(sortedMessages);
}
useEffect(

()=>{
  sortingfunction();
}

,[chatMessages])


  const handleUserClick = (user) => {
    setSelectedUser(user);
      // Reset chat messages when a new user is selected

      setChatMessages([]);
     fetch('http://localhost:4000/loadchats', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },        
      body: JSON.stringify({ 
        sendedtoid: profileid,
        recievedfromid: user._id//selectedUser
      })
    }).then((resp) => {
      resp.json().then((result) => {
        console.log("yehle bahi tere ayehue messages",result.loadedrecievedmesseges);
        console.log("yehle bahi tere behgy hue messages",result.loadedsendedmesseges);
        result.loadedrecievedmesseges.map((items)=>
          
            setChatMessages((prevMessages) => [...prevMessages, { text: items.message, type: 'received', recievedid: items.sender_id, timestamp:items.createdAt }])
          
        );
        result.loadedsendedmesseges.map((items)=>
          
            setChatMessages((prevMessages) => [...prevMessages, { text: items.message, type: 'sent', selectedid: user._id, timestamp:items.createdAt, messagestatus: items.messagestatus }])
          
        );
        
        socket.emit('messagereaded',{user,profileid});



      });
    });
  };




  // Example of using the function outside of render
  
  const handleSendMessage = () => {
    if (message.trim() === '') return;

    fetch('http://localhost:4000/savechats', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },        
      body: JSON.stringify({ 
        senderid: profileid,
        recieverid: selectedUser._id,
        message: message
      })
    }).then((resp) => {
      resp.json().then((result) => {
        //console.log(result);
        socket.emit('chatstart', result);
      });
    });

    const newMessage = { text: message, type: 'sent', selectedid: selectedUser._id, messagestatus: 0};
    setChatMessages([...chatMessages, newMessage]);
    setMessage(''); // Clear the input field
    
  };
  return (
    
    <div className="wrapper d-flex align-items-stretch">
      
      <nav id="sidebar">
        <div className="custom-menu">
          <button type="button" id="sidebarCollapse" className="btn btn-primary">
            <i className="fa fa-bars"></i>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
        <h1>
          <a href="/" className="logo">CHAT SYSTEM</a>
        </h1>
        <h1>
          <a href="/" className="logo">
            <img src={`http://localhost:4000/public/${profileimage}`} width="35px" height="50%" />
            {profilename}
          </a>
        </h1>
        <ul className="list-unstyled components mb-5">
          <li className="active">
            <a href="#"><span className="fa fa-home mr-3"></span> Homepage</a>
          </li>
          <li>
            <a href="#"><span className="fa fa-user mr-3"></span> Dashboard</a>
          </li>
          <li>
            <a href="#"><span className="fa fa-sticky-note mr-3"></span> Friends</a>
          </li>
        </ul>
        <ul className="list-unstyled components mb-5">
          
          {userdata.map(user => (
            <li key={user._id} ref={buttonRef} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
              <span className={`status ${user.status === 1 ? 'k1' : 'k0'}`}></span>
              <img src={`http://localhost:4000/public/${user.image}`} width="35px" height="50%" />
              {user.name} 
            </li>
          ))}
        </ul>
      </nav>
      <div id="content" className="p-4 p-md-5 pt-5">
        <h2 className="mb-4">Sidebar #04</h2>
        {selectedUser && (
          <div className="chat-form">
            <img src={`http://localhost:4000/public/${selectedUser.image}`} width="35px" height="50%" />
            <h3>Chat with {selectedUser.name}</h3>
            <div className="chat-messages">
              {sortedarray.map((msg, index) => (
               <div >
                  
                  {
                    msg.recievedid == selectedUser._id || msg.selectedid == selectedUser._id ? <div key={index} className={`chat-message ${msg.type}`}> {msg.text} {tempstate === profileid && othertemp ===selectedUser._id &&  msg.selectedid == selectedUser._id? msg.messagestatus : 0 } </div>: '' 
                  }
                </div>
              ))}
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
