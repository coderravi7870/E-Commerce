import React, { useEffect } from 'react'
import SignUp from "../components/Singup/SingUp.jsx"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const SignupPage = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector(state=>state.user);

  useEffect(()=> {
    if(isAuthenticated){
      navigate("/");
    }
  },[])
  return (
    <div>
        <SignUp/>
    </div>
  )
}

export default SignupPage