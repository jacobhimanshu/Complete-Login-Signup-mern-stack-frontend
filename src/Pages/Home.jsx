import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handlesucces } from '../Utils';
import { ToastContainer } from 'react-toastify';
const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products,setproducts] = useState("");
   const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])
  const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handlesucces('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }
    
      const  fetchProducts = async() =>{
                  try {
                    const url = 'http://localhost:3000/products';
                    const headers = {
                      headers :{
                        'Authorization':localStorage.getItem('token')
                      }
                    }
                    const response = await fetch(url,headers);
                    const result = await response.json();
                    // console.log(result);
                    setproducts(result)
                  } catch (error) {
                    handleError(error)
                  }
      }

    useEffect(()=>{
      //  console.log("🧪 useEffect triggered");
      fetchProducts();
    },[])

  return (
    <div>
    <h1>Welcome {loggedInUser}</h1>
    <button onClick={handleLogout}>Logout</button>
       <div>
        {
           products &&  products?.map((items,index)=>{
            return (

            <ul key={index}>
                <span>
                  {items.name}:{items.price}
                </span>
               </ul>
                )
          })
        }
       </div>
     
    <ToastContainer/>

      </div>
       )
      }

export default Home