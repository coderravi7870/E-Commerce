import axios from "axios";
import { server } from "../../server";


// create product 
export const createProduct = (newForm)=> async (dispatch)=>{
    try {
        dispatch({type:"productCreateRequest"});

        const config = {headers: {'Content-Type': 'multipart/form-data'}}
        // console.log("newForm: " + JSON.stringify(newForm));
        
        const response = await axios.post(`${server}/products/create-product`,newForm,config);
        
        // console.log("response: " + response);
        if(response.data.success){
            dispatch({
                    type:"productCreateSuccess",
                    payload:response.data,
            });
        }
        else{
            dispatch({
                type: "productCreateFail",
                payload:response.data.message,
              }); 
        }
    } catch (error) {
        dispatch({
            type: "productCreateFail",
            payload: error.response.data.message,
          }); 
    }
};

// get all products of a shop
export const getAllProductShop = (id)=> async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsShopRequest",
          });

        const {data} = await axios.get(`${server}/products/get-all-products-shop/${id}`);
        // console.log("response: " + data.result);
        
        if(data.success) {
            dispatch({
                type: "getAllProductsShopSuccess",
                payload: data.result,
              });
        }
        else {
            dispatch({
                type: "getAllProductsShopFailed",
                payload: response.data.result.message,
              });
        }
    } catch (error) {
        dispatch({
            type: "getAllProductsShopFailed",
            payload: error.response.data.message,
          });
    }
}

// delete products of a shop

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProductRequest"
        });
        const response = await axios.delete(`${server}/products/delete-shop-product/${id}`,{
            withCredentials: true,
        });
        // console.log("response: " + response.data);
        
        if(response.data.success) {
            dispatch({
                type:"deleteProductSuccess",
                payload: response.data.message
            })
        }else{
            dispatch({
                type:"deleteProductFailed",
                payload: response.data.message
            })
        }
    } catch (error) {
        dispatch({
            type:"deleteProductFailed",
            payload: error.response.data.message,
        })
    }
}

// get all products
export const getAllProducts =()=> async (dispatch) => {
    try {
      dispatch({
        type: "getAllProductsRequest",
      });
    //   console.log("ram ram");
      
      const { data } = await axios.get(`${server}/products/get-all-products`);
    //   console.log("all products",data);
      if(data.success){
        dispatch({
            type: "getAllProductsSuccess",
            payload: data.result,
          });
      }else{
        dispatch({
            type: "getAllProductsFailed",
            payload: data.message,
          });
      }
      
    } catch (error) {
      dispatch({
        type: "getAllProductsFailed",
        payload: error.response,
      });
    }
};