import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import About from './About';
import Contact from './Contact';
import NAVbar from './NAVbar';
import Content from "./Content";
// import LOGIN from "./LOGIN";
import PROTECTEDROUTES from "./PROTECTEDROUTES";
import LOGOUT from "./LOGOUT";
import Forgetpage from "./Forgetpage";
import LOGINBYJWT from "./LOGINBYJWT";
import JWTPROTECTEDROUTES from "./JWTPROTECTEDROUTES";
import JWTAUTHENTICATEDPROFILEROUTE from "./JWTAUTHENTICATEDPROFILEROUTE";
import Registerforchatapp from './Registerforchatapp';
import OtpVerification from './SendOtpPage';
import LOGOUTBYJWT from './LOGOUTBYJWT';
import Forgetasswordmail from './Forgetasswordmail';
import Sidebar from './Sidebar';

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* Navbar or other header components */}
        <NAVbar />

    

        {/* Routes */}
        <Routes>
           <Route path="/" element={<PROTECTEDROUTES Components={Home} />} />
          <Route path="/about" element={<PROTECTEDROUTES Components={About} />} />
          <Route path="/Contact" element={<PROTECTEDROUTES Components={Contact} />} />
          <Route path="/Content" element={<PROTECTEDROUTES Components={Content} />} />
          {/* <Route path="/LOGIN" element={<LOGIN />} /> */}
          <Route path="/Registerforchatapp" element={<Registerforchatapp />} />

          {/* Error Page Route */}
          <Route path="/*" element={<h1 style={{color: "red", backgroundColor:"black", height:"100px"}}><center>YAAR ERROR A GYA</center></h1>} />

          {/* Logout Route */}
          <Route path="/LOGOUT" element={<LOGOUT />} />

          {/* Forget Password Route */}
          <Route path="/Forgetpage" element={<Forgetpage />} />

          {/* Login by JWT */}
          <Route path="/LOGINBYJWT" element={<JWTPROTECTEDROUTES Components={LOGINBYJWT} lala={"itslogin"} />} />
          <Route path="/JWTAUTHENTICATEDPROFILEROUTE" element={<JWTPROTECTEDROUTES Components={JWTAUTHENTICATEDPROFILEROUTE} />} />
          <Route path="/otpsenderpage/:email/:id" element={<OtpVerification />} />
          <Route path="/LOGOUTBYJWT" element={<JWTPROTECTEDROUTES Components={LOGOUTBYJWT} />} />
          <Route path="/Forgetasswordmail" element={<Forgetasswordmail />} />
          <Route path="/Sidebar" element={<JWTPROTECTEDROUTES Components={Sidebar} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
