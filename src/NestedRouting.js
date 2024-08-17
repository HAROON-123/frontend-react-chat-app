// Nested routing in React Router allows you to define routes 
// within other routes, enabling a more hierarchical and organized 
// structure for your application's navigation. This can be useful 
// for building complex layouts where different components or sections
//  need to
//  be rendered based on the nested route.
import {NavLink, Outlet} from "react-router-dom";
import './NAVbar.css';
function NestedRouting(){
return(

<div>
<h1 style={{backgroundColor:"pink",height:"auto",width:"auto", border:"2px solid green"}}>I AM NESTED ROUTING TRY ME I AM DON NO 1</h1>

<h1>
    <NavLink className={"NavLink"} to = "FILE1FORNESTEDROUTING" >GO TO FILE1FORNESTEDROUTING </NavLink>
    </h1><h1>
    <NavLink className={"NavLink"} to = "File2nest" >GO TO FILE2FORNESTEDROUTING </NavLink>
    </h1><h1>
    <NavLink className={"NavLink"} to = "File3nest" >GO TO FILE3FORNESTEDROUTING </NavLink>
    </h1>
    <Outlet />
    {/* <Outlet /> //////IT DEFINES THE WHERE TO DISPLAY RERENDERED COMPONENT//// */}
</div>
 

)
}

export default NestedRouting;