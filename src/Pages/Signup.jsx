import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handlesucces } from "../Utils";

const Signup = () => {
   const BaseUrl=import.meta.env.VITE_API_BASE_URL
  const [signupinfo, setsignupinfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupinfo = { ...signupinfo };
    copySignupinfo[name] = value;
    setsignupinfo(copySignupinfo);
  };
  //  console.log("login infor---->",loginfo)

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupinfo;
    if (!name || !email || !password) {
      return handleError("name ,email,password are required");
    }
    try {
      const url =` ${BaseUrl}/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupinfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handlesucces(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      }
      else if(!success){
        handleError(message)
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name..."
            value={signupinfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={signupinfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={signupinfo.password}
          />
        </div>
        <button>Signup</button>
        <span>
          Already have an account ?<Link to="/login">Login </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
