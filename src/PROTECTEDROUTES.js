import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function PROTECTEDROUTES(props){
    const navigate = useNavigate();
    const { Components } = props;

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
 

  const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/check-auth',{ 
          method: 'GET',
          credentials: 'include'});
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if(!(data['authenticated'])){
          navigate('/LOGIN')
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
        
      } finally {
      
      }
    };
  
    fetchData();

  }
  
  );
   
    return(
    <div>
        <Components />
    </div>
    
    
    ) 
    
    }


    export default PROTECTEDROUTES;