import React ,{useState , useEffect} from "react";
import { ProductCard } from "../../component";
import {addProduct,editProduct} from "../../apiCalls"
import axios from 'axios'
import AddProductForm from "./addProductForm";
import "./style.css";
import {useAuth} from "../../context/auth"
import {useUser} from "../../context/user"
import {useParams} from "react-router-dom"
import { axiosInitializer } from "../../utils/axiosInitializer";
import {initialInputs} from "./function"
import {
  EditOutlined
} from "@material-ui/icons";

function Profile() {

    const [showAddForm , setShowAddForm] = useState(false)
    const [showEditForm , setShowEditForm] = useState(false);
    const [editingProduct,setEditingProduct] = useState({})

    const {id} = useParams();
    const {loading, setLoading} = useAuth();
    const [profile,setProfile] = useState({})
    const {user :{_id}} = useUser()
    const isAdmin = id === _id;


    useEffect(() => {
      (async()=>{
        try{
          axiosInitializer();
          setLoading(true)
          const response = await axios.get(`/user_data/${id}/profile`,{
            headers:{
              'Authorization' : localStorage.getItem("token")
            }
          });
          setProfile(response.data.data)
          setLoading(false)
          
          
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
       {isAdmin && <button className="addProduct" onClick={()=>setShowAddForm(!showAddForm)}>Add Product</button>}
      </section>
      <section className="userStore">{
        profile?.products?.map((product)=>{
          return <div className ="profileProduct">
          <ProductCard product ={product} isAdmin={isAdmin}/>
           {isAdmin && <div className = "x-icon3" onClick={()=>{
             setEditingProduct(product);
             setShowEditForm(true)
           }}><EditOutlined/></div>}
          </div>
        })
      }</section>
      {showAddForm && <AddProductForm  initialInputs = {initialInputs} setShow = {setShowAddForm} formAction = {addProduct}  profile ={profile} setProfile = {setProfile}/>}
      {showEditForm && <AddProductForm  initialInputs = {editingProduct} setShow = {setShowEditForm} formAction = {editProduct}  profile ={profile} setProfile = {setProfile}/>}
      
    </div>}
    </>
  );
}

export default Profile;
