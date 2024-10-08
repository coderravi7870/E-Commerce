import React from 'react'
import Lottie from "react-lottie"
import animationData from "../../assets/animations/Animation - 1725694040917.json"

const Loader = () => {
    const defaultOptions = {
        loop:false,
        autoplay:true,
        animationData:animationData,
        rendereSettings:{
            preserveAspectRate: "xMidYMid slice",
        }
    }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <Lottie options={defaultOptions} width={300} height={3000} />
    </div>
  )
}

export default Loader