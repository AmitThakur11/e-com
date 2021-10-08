import {toast} from "react-toastify";
import axios from "axios";



  export const loadUser = ()=>{

  }

export const addToWishlist = async(product_id ,userDispatch , setLoading, )=>{
    try{

    setLoading(true)
    const {data} = await axios.post(`user_data/wishlist/${product_id}`);
    console.log("this place")
    setLoading(false);
    if(data.success){
        toast.success(data.msg)
        console.log(data)
        return userDispatch({type : "UPDATE WISHLIST" , payload : data.data.wishlist})
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
    const response = await axios.delete(`user_data/wishlist/${product_id}`);
    console.log(response)
    setLoading(false);
    if(response.data.success){

        toast.success(response.data.msg)
        userDispatch({type : "UPDATE WISHLIST" , payload : response.data.data})
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
        const cartResponse = await axios.post(`/user_data/cart/${product_id}`)
        
        if(cartResponse.data.success){
          console.log(cartResponse.data.data.cart)
            userDispatch({type : "UPDATE CART" , payload : cartResponse.data.data.cart})
            const {data} = await axios.delete(`user_data/wishlist/${product_id}`);
            setLoading(false);
            if(data.success){
              toast.success("wishlist updated")
              return userDispatch({type : "UPDATE WISHLIST" , payload : data.data})
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
      const {data} = await axios.delete(`/user_data/cart/${product_id}`);
      setLoading(false)
      if(data.success){
        toast.success(data.msg)
        userDispatch({type : "UPDATE CART" , payload : data.data.cart})
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
      if(qty === 1  && type === "decrement"){
        return await removeFromCart(product_id , userDispatch , setLoading)
      }

      const {data} = await axios.post(`/user_data/cart/${product_id}/update_qty`,{payload : type});
      setLoading(false)

      if(data.success){
        toast(data.msg);
        console.log(data.data)
        userDispatch({type : "UPDATE CART" , payload : data.data})

      }
    }catch(error){
      setLoading(false)
      toast.error(error.response.data.msg)

    }

  }
  

  export const moveToWishlist = async(product_id , userDispatch , setLoading)=>{
    try{

      setLoading(true);
    const wishlistResponse = await axios.post(`/user_data/wishlist/${product_id}`);
    if(wishlistResponse.data.success){
      userDispatch({type : "UPDATE WISHLIST" , payload : wishlistResponse.data.data.wishlist})
      const {data} = await axios.delete(`/user_data/cart/${product_id}`)
      setLoading(false)
      if(data.success){
        
        toast.success("Cart updated")
        userDispatch({type : "UPDATE CART" , payload : data.data.cart})

      }
    }

    }catch(err){

      setLoading(false)
      toast.error(err.response.data.msg)


    }

  }


  export const addAddress = async(address_data,userDispatch,setLoading)=>{
    try{
      setLoading(true)
      const {data} = await axios.post("/user_data/address" , {address : address_data});
      setLoading(false)
      if(data.success){
        userDispatch({type : "UPDATE ADDRESS" , payload : data.data})
        return toast.success(data.msg)
        
      }
      toast(data.msg)
      
    }catch(error){
      setLoading(false)
      toast(error.response.data.msg)
    }

  }


  export const removeAddress = async(address_id,userDispatch,setLoading)=>{
    try{
      setLoading(true)
      const {data} = await axios.delete(`/user_data/address/${address_id}`);
      setLoading(false)
      if(data.success){
        userDispatch({type : "UPDATE ADDRESS" , payload : data.data})
        return toast.success(data.msg)
      }
      toast(data.msg)
      
    }catch(error){
      setLoading(false)
      toast(error.response.data.msg)
    }

  }

  export const updateAddress = async(address_id,userDispatch,setLoading, address)=>{
    try{
      setLoading(true);
      const {data}= await axios.post(`user_data/address/${address_id}`,{newAddress : address});
      console.log(data)
      setLoading(false);
      if(data.success){
        userDispatch({type : "UPDATE ADDRESS" , payload : data.data.address})
        console.log(data)
        return toast.success(data.msg)
      }
      toast.error(data.msg)

    }catch(error){
      setLoading(false)
      toast(error.response.data.msg)

    }

  }


  export const addOrder = ()=>{
    try{

    }
    catch(error){
      
    }
  }