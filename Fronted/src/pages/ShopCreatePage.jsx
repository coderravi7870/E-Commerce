import React, { useEffect } from 'react'
import ShopCart from "../components/Shop/ShopCart"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const {isSeller,seller} = useSelector(state=>state.seller);

  useEffect(()=>{
    if(isSeller) {
      navigate(`/shop/${seller._id}`)
    }
  })

  return (
    <div>
        <ShopCart/>
    </div>
  )
}

export default ShopCreatePage