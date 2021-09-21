import {toast} from "react-toastify";
import axios from "axios";

export const accessToken =  JSON.parse(localStorage.getItem('token'))
export const apiUrl = "https://soulmadeapi.herokuapp.com";
export const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: accessToken,
    },
  });


  export const loadUser = ()=>{

  }

export const addToWishlist = async(product_id ,userDispatch , setLoading, )=>{
    try{

    setLoading(true)
    const {data} = await authAxios.post(`user_data/wishlist/${product_id}`);
    console.log("this place")
    setLoading(false);
    if(data.success){
        toast.success(data.msg)
        console.log(data)
        return userDispatch({type : "ADD TO WISHLIST" , payload : data.data.wishlist})
    }

    

    }catch(err){
        setLoading(false);
        console.log(err.message)
        toast.error(err.response.data.msg)
        

    }
    
    
  
  }

  export const removeFromWishlist = async(product_id ,userDispatch , setLoading)=>{
    try{

    setLoading(true)
    const response = await authAxios.delete(`user_data/wishlist/${product_id}`);
    console.log(response)
    setLoading(false);
    if(response.data.success){

        toast.success(response.data.msg)
        userDispatch({type : "REMOVE FROM WISHLIST" , payload : response.data.data})
    }
    }catch(err){
        setLoading(false);
        console.log(err.message)
        toast.error(err?.response?.data.msg)
        

    }
    
    
  
  }

  export const addToCart = async(product_id ,userDispatch , setLoading)=>{
     
    try{
        
        setLoading(true);
        const cartResponse = await authAxios.post(`/user_data/cart/${product_id}`)
        
        if(cartResponse.data.success){
          console.log(cartResponse.data.data.cart)
            userDispatch({type : "ADD TO CART" , payload : cartResponse.data.data.cart})
            const {data} = await authAxios.delete(`user_data/wishlist/${product_id}`);
            setLoading(false);
            if(data.success){
              toast.success("wishlist updated")
              return userDispatch({type : "REMOVE FROM WISHLIST" , payload : data.data})
            }else{
              toast(data.msg)
            }
          
            
            
        }else{
          toast.error(cartResponse.data.msg)
        }

    }catch(err){
        setLoading(false)
        toast.error(err.response.data.msg);
    }

  }


  export const removeFromCart = async(product_id , userDispatch , setLoading)=> {
    try{
      setLoading(true);
      const {data} = await authAxios.delete(`/user_data/cart/${product_id}`);
      setLoading(false)
      if(data.success){
        toast.success(data.msg)
        userDispatch({type : "REMOVE FROM CART" , payload : data.data.cart})
      }

    }catch(err){
      setLoading(false)
      toast.error(err.response.data.msg)

    }
  }

  export const updateQty = async(product_id,userDispatch , setLoading,action)=>{
    const {type , qty} = action

    try{
      setLoading(true);
      if(qty == 1  && type =="decrement"){
        return await removeFromCart(product_id , userDispatch , setLoading)
      }

      const {data} = await authAxios.post(`/user_data/cart/${product_id}/update_qty`,{payload : type});
      setLoading(false)

      if(data.success){
        toast(data.msg);
        console.log(data.data)
        userDispatch({type : "ADD TO CART" , payload : data.data})

      }
    }catch(error){
      setLoading(false)
      toast.error(error.response.data.msg)

    }

  }
  

  export const moveToWishlist = async(product_id , userDispatch , setLoading)=>{
    try{

      setLoading(true);
    const wishlistResponse = await authAxios.post(`/user_data/wishlist/${product_id}`);
    if(wishlistResponse.data.success){
      userDispatch({type : "ADD TO WISHLIST" , payload : wishlistResponse.data.data.wishlist})
      const {data} = await authAxios.delete(`/user_data/cart/${product_id}`)
      setLoading(false)
      if(data.success){
        
        toast.success("Cart updated")
        userDispatch({type : "REMOVE FROM CART" , payload : data.data.cart})

      }
    }

    }catch(err){

      setLoading(false)
      toast.error(err.response.data.msg)


    }

  }