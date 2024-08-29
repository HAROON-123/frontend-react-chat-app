import React, { useEffect, useState, useRef } from 'react';
import './Sidebar.css'; // Assuming you've moved css/style.css to src/Sidebar.css
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import Popup from './Popup.js';
import Forwardpopup from './Forwardpopup.js';

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
  const [typingstatus, setTypingstatus] = useState(0);
  const [onstoptyping, setOnstoptyping] = useState(1);
  const chatContainerRef = useRef(null); // Add this line

const [sortedarray, setSortedarray] = useState([]);
const [wesai, setWesai] = useState(0);
const buttonRef = useRef(null);
const [onloaded, setOnloaded] = useState([]);
const button2Ref = useRef(null);
const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, message: null });
const [showinputfield, setShowinputfield] = useState(0);
const [reload, setReload] = useState(false);
const [messageidedit, setMessageidedit] = useState(null);
const [messageedited, setMessageedited] = useState();
const modalRef = useRef(null);
const modalRefforforward = useRef(null);
const [forreplymessage, setForreplymessage] = useState(null);
const messageRefs = useRef({});
const [changecolor, setChangecolor] = useState(null);
  
const sendSound = process.env.PUBLIC_URL + '/sounds/sendingmessagesound.mp3';

const playSendSound = () => {
  const audio = new Audio(sendSound);
  audio.play();
};



// Function to handle clicking on a message
  const handleClickON = (id) => {
    if (messageRefs.current[id]) {
      // Scroll to the message with smooth behavior
      messageRefs.current[id].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setChangecolor(id);
    }
  };

  useEffect(()=>{
    setTimeout(() => {
     setChangecolor(null);
    }, 1000); // Delay in milliseconds

},[changecolor])


  // Handler for when the input field gains focus
  const handleFocus = () => {
    setTypingstatus(1); // Set state to 1 when focused
  };

  // Handler for when the input field loses focus
  const handleBlur = () => {
    setOnstoptyping(0); // Set state to 0 when blurred
  };

  useEffect(() => {
    // Trigger a re-render once after the component mounts
    const timer = setTimeout(() => {
      setReload(true);
    }, 1000); // Delay in milliseconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  // To ensure re-rendering happens only once
  useEffect(() => {
    if (reload) {
      // Perform any action needed after the re-render
      if(button2Ref.current){
        button2Ref.current.click();
      }
      setReload(false); // Reset reload to prevent further renders
    }
  }, [reload]);

  
  



function functionforbutton2(){
  console.log("hi i am called");
  let sendedrecievedMessages = [];
  let counter = 0;
setOnloaded([]);
  userdata.map((item)=>{
    
    fetch('http://localhost:4000/loadchats', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },        
      body: JSON.stringify({ 
        sendedtoid: profileid,
        recievedfromid: item._id//selectedUser
      })
    }).then((resp) => {
      resp.json().then(async(result) => {
        // console.log("yehle bahi useEffect se tere ayehue messages",result.loadedrecievedmesseges);
        // console.log("yehle bahi useEffect tere behgy hue messages",result.loadedsendedmesseges);
        
        result.loadedrecievedmesseges.forEach((items) => {
          sendedrecievedMessages.push({
            text: items.message,
            type: 'received',
            recievedid: items.sender_id,
            timestamp:items.createdAt,
            messagestatus: items.messagestatus
          })
        })
          result.loadedsendedmesseges.forEach((items) => {
            if(items.deleteforme === 1){
            sendedrecievedMessages.push({
              text: "You deleted message",
              type: 'sent',
              selectedid: items._id,
              timestamp: items.createdAt,
              messagestatus: items.messagestatus
            });
          }else{
            
            sendedrecievedMessages.push({
              text: items.message,
              type: 'sent',
              selectedid: items._id,
              timestamp: items.createdAt,
              messagestatus: items.messagestatus
            });
          }
        }
       
        );
       
        sendedrecievedMessages = sendedrecievedMessages.sort((a, b) => {
          const dateA = new Date(a.timestamp);
          const dateB = new Date(b.timestamp);
          return dateA - dateB;
        });

       sendedrecievedMessages.map((itre)=>{
if(itre.messagestatus == 0 && itre.type == 'received'){
counter = counter+1;

      }})
      let bb
if(counter == 0){
bb = '';
}
else{
  bb = counter
}
        const lastElement = sendedrecievedMessages[sendedrecievedMessages.length - 1];
        console.log("yeh iss ka last message",item.name,bb,lastElement);

        // setCount((prevCount) => [...prevCount, { user: item._id, count12: counter }]);
        if(lastElement){
        setOnloaded((prevMessages) => [...prevMessages, {lastmessage: lastElement.text, type: lastElement.type, user: item._id, count12: bb}]);
}
        counter = 0;
        sendedrecievedMessages = [];
        
         //setOnloaded(sendedrecievedMessages);
         
      });
    });


    
  


  }
  
  )
  


}
useEffect(()=>{

  functionforbutton2();
  
},[userdata]);







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
        setChatMessages(prevChatMessages =>
          prevChatMessages.map(item =>

            item.selectedid == data.userId && item.messagestatus == -1 ? { ...item, messagestatus: 0 } : item,
          )
        );
        

        
      });

      newSocket.on('chat-message', (data) => {
        if(profileid === data.recieverid){
        console.log("Message received from server:", data);
        setWesai((prev)=> prev+1);  
      setChatMessages((prevMessages) => [...prevMessages, { text: data.message, type: 'received',senderid:data.senderid, recievedid: data.senderid, message_id: data.messageid, forreplymessage: data.forreplymessage,timestamp:data.timestamp }]);
      if(button2Ref.current){
        button2Ref.current.click();
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

        newSocket.on('showing-typing', (data) => {
          if(profileid == data.currentuser){
            console.log("typing");
            setUserdata(prevUserdata =>
              prevUserdata.map(user =>
                user._id === data.user ? { ...user, typingstatus: data.typingstatus } : user
              )
            );
          }});
          
          newSocket.on('showing-blurtyping', (data) => {
            if(profileid == data.currentuser){
              console.log("bluredtyping");
              setUserdata(prevUserdata =>
                prevUserdata.map(user =>
                  user._id === data.user ? { ...user, typingstatus: data.typingstatus } : user
                )
              );
            }});
            newSocket.on('messagehasbeendeleted', (data) => {
if(data['ppp']){
  console.log("yeh le naraz na ho",data['ppp'] )
              if(profileid == data['ppp'].reciever_id || profileid == data['ppp'].sender_id){
                setChatMessages(prevchatMessages =>
                  prevchatMessages.map(message123 =>
                    message123.message_id == data['ppp']._id ? { ...message123, text: "message deleted successfully" } : message123
                  )
                );
                const timer = setTimeout(() => {
                  setReload(true);
                }, 1000); // Delay in milliseconds
              }}
            });
            
            newSocket.on('messagehasbeendeletedforme', (data) => {
              if(data['ppp']){
                console.log("yeh le naraz na ho",data['ppp'] )
                            if(profileid == data['ppp'].sender_id){
                              setChatMessages(prevchatMessages =>
                                prevchatMessages.map(message123 =>
                                  message123.message_id == data['ppp']._id ? { ...message123, deleteforme: 1 }: message123
                                )
                              );
                              const timer = setTimeout(() => {
                                setReload(true);
                              }, 1000); // Delay in milliseconds
                            }}
                            
                          });

                          newSocket.on('messagehasbeenedited', (data) => {
                            console.log(data.messageafteredit, data.ppp1);
                            if(profileid == data.ppp1.reciever_id || profileid == data.ppp1.sender_id){
                            setChatMessages(prevchatMessages =>
                              prevchatMessages.map(message123 =>
                                message123.message_id == data.ppp1._id ? { ...message123, text: data.messageafteredit }: message123
                              ))}});
                              newSocket.on('messagehasbeenforwarded', (data) => {
                                //console.log(data.ii.reciever_id,profileid);
                                if(profileid == data.ii.reciever_id){
                                  setWesai((prev)=> prev+1);
                                  setChatMessages((prevMessages) => [...prevMessages, { text: data.ii.message, type: 'received', senderid:data.ii.sender_id, recievedid: data.ii.sender_id, message_id: data.ii._id,timestamp:data.ii.createdAt }]);
                                  
                                  setTimeout(() => {
                                    if(button2Ref.current){
                                      button2Ref.current.click();
                                    }
                                }, 1000); // Adding a small delay
                                }
                              if(profileid == data.ii.sender_id){

if(data.status == -1){
  setWesai((prev)=> prev+1);
  setChatMessages((prevMessages) => [...prevMessages, {text: data.ii.message, type: 'sent',messagestatus: -1,senderid:data.ii.sender_id, selectedid: data.ii.reciever_id, timestamp:data.ii.createdAt, message_id: data.ii._id,deleteforme: data.ii.deleteforme }]);
  setTimeout(() => {
    if(button2Ref.current){
      button2Ref.current.click();
    }
}, 1000); // Adding a small delay
}
else{
  setWesai((prev)=> prev+1);
  setChatMessages((prevMessages) => [...prevMessages, {text: data.ii.message, type: 'sent',messagestatus: 0, senderid:data.ii.sender_id,selectedid: data.ii.reciever_id, timestamp:data.ii.createdAt, message_id: data.ii._id,deleteforme: data.ii.deleteforme }]);
  setTimeout(() => {
    if(button2Ref.current){
      button2Ref.current.click();
    }
}, 1000); // Adding a small delay
}






                                
                              }
                              
                              });

      setSocket(newSocket);
    
      return () => {
        newSocket.disconnect();
      };
    }
  }, [profileid]);
  
  

   const sortingfunction = () => {
   
    
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
    setMessage('');
    setSelectedUser(user);
    setForreplymessage('');

      // Reset chat messages when a new user is selected
      // if(button2Ref.current){
      //   button2Ref.current.click();
      // }
      
      setReload(true);
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
          
            setChatMessages((prevMessages) => [...prevMessages, { text: items.message, type: 'received',senderid:items.sender_id, recievedid: items.sender_id, timestamp:items.createdAt ,message_id: items._id,forreplymessage: items.forreplymessage}])
          
        );
        result.loadedsendedmesseges.map((items)=>
          
            setChatMessages((prevMessages) => [...prevMessages, { text: items.message, type: 'sent',senderid:items.sender_id, selectedid: user._id, timestamp:items.createdAt, messagestatus: items.messagestatus ,message_id: items._id,deleteforme: items.deleteforme,forreplymessage: items.forreplymessage}])
          
        );
        
        socket.emit('messagereaded',{user,profileid});
        
      });
    });
  };

  // Example of using the function outside of render
  
  const handleSendMessage = async() => {
    setForreplymessage(null);
    playSendSound();
    if (message.trim() === '') return;

    if(button2Ref.current){
      button2Ref.current.click();
    }
    await fetch('http://localhost:4000/savechats', {
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
        socket.emit('chatstart', {result, forreplymessage});
        const savedmessageID = result['chat']._id;
        const deleteforme = result['chat'].deleteforme;
      if(result['status']){
        const newMessage = { text: message, type: 'sent',senderid:result['chat'].sender_id, selectedid: selectedUser._id, messagestatus: -1, message_id:savedmessageID, deleteforme:deleteforme,forreplymessage: forreplymessage,  timestamp:result['chat'].createdAt};
        setChatMessages([...chatMessages, newMessage]);
        setMessage(''); // Clear the input field
        
          }
    else{
      const newMessage = { text: message, type: 'sent',senderid:result['chat'].sender_id, selectedid: selectedUser._id, messagestatus: 0, message_id:savedmessageID, deleteforme:deleteforme,forreplymessage: forreplymessage, timestamp:result['chat'].createdAt};
      setChatMessages([...chatMessages, newMessage]);
      setMessage(''); // Clear the input field
     
    }
    if(button2Ref.current){
      button2Ref.current.click();
    }
      });
    });

    
  };

  useEffect(()=>{
    if(typingstatus){
      socket.emit('typingindicator',{selectedUser,profileid,typingstatus});
      setTypingstatus(0);
      console.log("selectedUsergoingfor typing", selectedUser,profileid)
    }
    },[typingstatus])

    useEffect(()=>{
      if(onstoptyping == 0){
        socket.emit('onblur-typing',{selectedUser,profileid,typingstatus: onstoptyping});
        setOnstoptyping(1);
        console.log("selectedUsergoingfor typing", selectedUser,profileid)
      }
      
      },[onstoptyping])
    
// useEffect(()=>{
//   if(noy){
//   countRef.current = noy;
//   }
// },[noy])

function forclikinguser(user){
  socket.emit('messagereaded',{user,profileid});
}

useEffect(()=>{
if(wesai){
  if(selectedUser){
    if(selectedUser._id === othertemp){
    if(buttonRef.current){
      buttonRef.current.click();
    }
    }
  }
}
}
,[wesai])


useEffect(() => {
  if (selectedUser) {
      setTimeout(() => {
        if(button2Ref.current){
          button2Ref.current.click();
        }
      }, 150); // Adding a small delay
  }
}, [selectedUser]);

  // Scroll to the bottom of the chat container whenever the chatMessages array changes
  useEffect(() => {
    if (selectedUser) {
        setTimeout(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }, 100); // Adding a small delay
    }
}, [selectedUser, chatMessages]);


const handleClickOutside = () => {
  setContextMenu({ visible: false, x: 0, y: 0, message: null }); // Hide the menu after action  
};

useEffect(() => {
  document.addEventListener('click', handleClickOutside);

  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);
const handleMenuAction = (action) => {
  if (action === 'edit') {
    setShowinputfield(1);
    setMessageidedit(contextMenu.message.message_id);
    setMessageedited(contextMenu.message.text);

  } else if (action === 'delete') {
console.log("deleting the massage", contextMenu.message )
if (modalRef.current) {
  modalRef.current.openModal(contextMenu.message);
}
  } else if (action === 'forward') {
    // Implement the logic to forward the message 
    if(modalRefforforward.current) {
      modalRefforforward.current.openModalforforward(contextMenu.message,userdata);
    }
  }
  setContextMenu({ visible: false, x: 0, y: 0, message: null }); // Hide the menu after action
};

const handleRightClick = (event, message) => {
  event.preventDefault();
  if(message.type != 'received' && message.text != "message deleted successfully" && message.deleteforme != 1){
  setContextMenu({
    visible: true,
    x: event.pageX,
    y: event.pageY,
    message,
  });
}
};

const handleConfirmationFordeletingeveryone = (message) => {
  console.log('Confirmation received in Sidebar',message);
  socket.emit('deletethismessage',{message});
  setMessageidedit(message.message_id);

  // Perform your delete action here
};
const handleConfirmationFordeletingforme = (message) => {
  console.log('Confirmation received in Sidebar',message);
  socket.emit('deletethismessageforme',{message});

  // Perform your delete action here
};

const handleConfirmationForEdit = () => {
   socket.emit('editthismessageforme', {messageidedit,messageedited});
  setShowinputfield(0);
};

const handleConfirmationForforward = (messageidforward,forwardlist) => {
  socket.emit('forwardthismessage',{messageidforward,forwardlist,profileid});
};
const replyfunction = (replytomessage) => {
 
  console.log(replytomessage);
  setForreplymessage(replytomessage);
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
          <li ref={buttonRef} onClick={() => forclikinguser(selectedUser)}></li>
          <li ref={button2Ref} onClick={() => functionforbutton2()}></li>

          {userdata.map(user => (
                        

            <li key={user._id}  onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
              <span className={`status ${user.status === 1 ? 'k1' : 'k0'}`}></span>
              <img src={`http://localhost:4000/public/${user.image}`} width="35px" height="50%" />
              {user.name} 
              {user.typingstatus == 1 ? <span style={{color: "red", fontSize: "10px"}}><b>typing</b></span> :''}  
          {
            
          onloaded.map((item,index)=>
            
            <div>
       <span key = {index}> {user._id === item.user && index == 0 && item.lastmessage || user._id === item.user && index == 1 && item.lastmessage != '' ? item.type +":"+item.lastmessage: null}               <span key = {index} >{ user._id === item.user && index == 0 && item.count12 != 0 || user._id === item.user && index == 1 && item.count12 != 0 ? <span className="circle-container">{item.count12}</span>: null} </span>
       </span>
       </div>
          )}



            </li>
          ))}
        </ul>
      </nav>
      <div id="content" className="p-4 p-md-5 pt-5">
      
        {selectedUser && (
          <div className="chat-form" >
            <img src={`http://localhost:4000/public/${selectedUser.image}`} width="35px" height="50%" />
            <h3>Chat with {selectedUser.name}</h3>
            <div className="chat-messages" ref={chatContainerRef}>
              {sortedarray.map((msg, index) => (
               <div>

                  {
                msg.recievedid == selectedUser._id || msg.selectedid == selectedUser._id ? <div style={{userSelect: 'none', backgroundColor: changecolor == msg.message_id ? 'red': '', color: changecolor == msg.message_id ? 'white': ''}} onDoubleClick = {(e)=>replyfunction(msg)} key={index} className={`chat-message ${msg.type}`} ref={(el) => { 
                  // Assign the ref using the message ID
                  if (el) messageRefs.current[msg.message_id] = el; 
                }} onContextMenu={(e) => handleRightClick(e, msg)}><div style = {{textAlign : 'left'}}>{<div> { profileid == msg.senderid ? <img src={`http://localhost:4000/public/${profileimage}`} width="35px" height="50%" />: ""}</div>}{<div> {userdata.map((item)=> item._id == msg.senderid ? <img src={`http://localhost:4000/public/${item.image}`} width="35px" height="50%" />: "" )}</div>}</div> {msg.deleteforme == 1 ? "message has been deleted for you": showinputfield == 1 && messageidedit == msg.message_id ? <input type='text'style = {{width:"100%"}} placeholder = {msg.text} autoFocus onBlur={handleConfirmationForEdit} value={messageedited} onChange={(e)=>setMessageedited(e.target.value) }/> :msg.forreplymessage != null ? <span><div style={{backgroundColor:"#D3D3D3"}}>{userdata.map((item)=> item._id == msg.senderid)}{msg.forreplymessage.senderid==profileid ? <div onClick={() => handleClickON(msg.forreplymessage.message_id)} style={{textAlign:"left"}}><div>Sent By:{"you"}</div><div style={{backgroundColor:"#808080",color: "white"}}><b>{msg.forreplymessage.text}</b></div></div>:userdata.map((itemp)=>itemp._id == msg.forreplymessage.senderid ? <div onClick={() => handleClickON(msg.forreplymessage.message_id)} style={{textAlign:"left"}}><div> Sent by:{itemp.name}</div><div style={{backgroundColor:"#808080",color: "white"}}><b>{msg.forreplymessage.text}</b></div></div>: '')}</div>  <span><b>{<span style={{fontSize:"20px",fontFamily:"revert"}}>{msg.text}</span>}</b></span></span> : <b>{msg.text}</b>} <b><span className={`status-${ msg.messagestatus  }`}></span><div style={{textAlign: msg.type == 'recieved' ? "left": "right"}}>{msg.timestamp}</div></b> </div>: '' 
                  }
                </div>
              ))}
            </div>
          {forreplymessage && (<div style={{border:"2px",textAlign:"center",color:"black", backgroundColor :"#D3D3D3",width:"89%",borderRadius: "20px 20px 0 0"}}>
            {forreplymessage.senderid == profileid ? <span>you</span> : ""}
            {userdata.map((itemd)=> itemd._id == forreplymessage.senderid ? itemd.name : "")} 
            <div>you are replying to this message :</div>
<div style={{border:"2px #808080",color:"white",fontSize:"120%",backgroundColor :"#808080",marginTop:"5px",marginBottom:"5px"}}>

<b>{forreplymessage.text}</b>

</div>

            </div>)}  
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={handleBlur}
              placeholder="Type your message here"
              onFocus={handleFocus}
              autoFocus
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        )}
              <Popup ref={modalRef} onConfirmforeveryone={handleConfirmationFordeletingeveryone} onConfirmfordeleteforme={handleConfirmationFordeletingforme}/>
              <Forwardpopup ref={modalRefforforward} onConfirmforforward = {handleConfirmationForforward}/>

          {contextMenu.visible && (
            <ul className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
              <li onClick={() => handleMenuAction('edit')}><b>Edit</b></li>
              <li onClick={() => handleMenuAction('delete')}><b>Delete</b></li>
              <li onClick={() => handleMenuAction('forward')}><b>Forward</b></li>
            </ul>
          )}
          
        
      </div>
    </div>
  );
};

export default Sidebar;
