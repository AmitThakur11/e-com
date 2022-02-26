import React ,{useState , useEffect} from "react";
import { ProductCard } from "../../component";
import axios from 'axios'
import AddProductForm from "./addProductForm";
import "./style.css";
import {useAuth} from "../../context/auth"
import {useUser} from "../../context/user"
import {useParams} from "react-router-dom"
import { axiosInitializer } from "../../utils/axiosInitializer";
export const initialProductInput  = {
    title : "",
    price : null,
    discount :  null,
    badge : "",
    stock : null,
    brand : "",
    description : "",
    size : [],
    category : "",
    fastDeleivery : false,
    features : []

}

function Profile() {

    const [showForm , setShowForm] = useState(false)
    const {id} = useParams();
    const {loading, setLoading} = useAuth();
    const [profile,setProfile] = useState({})
    const {user :{_id}} = useUser()
    const isAdmin = id === _id;
    console.log(id,_id)

    useEffect(() => {
      (async()=>{
        try{
          axiosInitializer();
          setLoading(true)
          const response = await axios.get(`/user_data/${id}/profile`);
          setProfile(response.data.data)
          setLoading(false)
          console.log(response.data.data)
          
        }catch(err){
          setLoading(false)
          console.log(err)
        }
       
      })()
    }, [id,setLoading]);
    

  
  
  
    return (
    <>
    {!loading && <div className="profileContainer">
      <section className="userDescription">
        <p className="userName">
          <span>{profile.username}</span> /Soulmade
        </p>
       {isAdmin && <button className="addProduct" onClick={()=>setShowForm(!showForm)}>Add Product</button>}
      </section>
      <section className="userStore">{
        profile?.products?.map((product)=>{
          return <ProductCard product ={product}/>
        })
      }</section>
      {showForm && <AddProductForm setShow = {setShowForm}/>}
      
    </div>}
    </>
  );
}

export default Profile;
