import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from "../components/Products/ProductDetails"
import SuggestedProduct from "../components/Products/SuggestedProduct"

import { productData } from '../static/Data'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProductDetailsPage = () => {
    const { products } = useSelector((state) => state.products);
    const {name} = useParams();
    const [data,setData] = useState(null);
    const productName = name.replace(/-/g," ");

    useEffect(()=>{
        const data = products.find((i)=> i.name === productName);
        setData(data);
    },[])
  return (
    <div>
        <Header/>
        <ProductDetails data={data}/>
        {
          data && <SuggestedProduct data={data} />
        }
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage