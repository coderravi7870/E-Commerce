import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/Styles";
import ProductCard from "../ProductCard/ProductCard";
import { productData } from "../../../static/Data";
import { getAllProductShop } from "../../../redux/actions/product";

const BestDeals = () => {
  const { products,fetchSuccess } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const [data, setData] = useState([]);
  console.log("products", products);
  console.log("seller", seller);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductShop(seller?._id));
    // if(fetchSuccess){
      const firstFive = products?.slice(0,5);
      setData(firstFive);
    // }
  }, [seller]); 


  // useEffect(() => {
  //   const firstFive = products?.slice(0,5);
  //   setData(firstFive);
  // }, []);
  

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
           {
            data && data.length !== 0 &&(
              <>
               {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )
           }
        </div>
      </div>
    </div>
  );
};

export default BestDeals;