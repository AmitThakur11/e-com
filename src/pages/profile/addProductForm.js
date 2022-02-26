import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import {previewImg,getSize,getDeleivery,getFeature,getSimpleInput,addFeature,removeFeature} from "./function";
import {toast} from "react-toastify"
import {MdCancel} from 'react-icons/md'
import axios from "axios";
export const initialProductInput = {
  name: "",
  price: "",
  discount: "",
  img : "",
  badge: "",
  stock: "",
  brand: "",
  description: "",
  size: [],
  category: "",
  fastDeleivery: false,
  features: [],
};



export const addProductApi = async(product)=>{
  const response = await axios.post("/product/add",product);
  console.log(response)

}


export const ImagePreview = ({preview , setProductInput})=>{
  return <div className="preview">
  <div
    className="cancelPreview"
    onClick={() => setProductInput((productInput)=>{
      return {...productInput,img : ""}
    })}
  >
    <MdCancel />
  </div>
  <img width="100px" src={preview} alt="preview" />
</div>

}
function AddProductForm({ setShow }) {
  const [productInput, setProductInput] = useState(initialProductInput);
  const [feature, setFeature] = useState("");
  const [showFeature, setShowFeature] = useState(false);

  
  const {
    name,
    price,
    discount,
    badge,
    img,
    stock,
    brand,
    description,
    fastDeleivery,
    features,
  } = productInput;
  const checkEmptyField = (productInput)=>{
    const {
      name,
      price,
      img,
      stock,
      brand,
      description,
      category,
      size,
      features,
    } = productInput;
    if(
    name === "" &&
    price === "" &&
    img === "" &&
    stock === "" &&
    brand === "" &&
    description === "" &&
    size === [] &&
    category === "" &&
    features === []){
     
      return  false
    }
    return true
    
  }

  

  return (
    <section className="addProduct__form">
      <h2 className="formTitle">Add product</h2>

      <div className="addProduct__inputs">
        {img && <ImagePreview preview ={productInput.img}  setProductInput = {setProductInput} /> }
        <label htmlFor="imageInput" className ="picSvg">
          <FaRegImage />
        </label>
        <input
          type="file"
          id="imageInput"
          onChange={(e) => {
            console.log(e.target.files)
              previewImg(e.target.files, setProductInput)
            
          }
        }
          accept="image/*"
        />
        <input
          className="simpleInput"
          name="name"
          value={name}
          placeholder="Name of product"
          onChange={(e) => getSimpleInput(e,setProductInput,productInput)}
        />
        <input
          className="simpleInput"
          name="price"
          placeholder="Price"
          value={price}
          type="number"
          onChange={(e) => getSimpleInput(e,setProductInput,productInput)}
        />
        <input
          className="simpleInput"
          placeholder="Discount"
          name="discount"
          type="number"
          value={discount}
          onChange={(e) => getSimpleInput(e,setProductInput,productInput)}
        />
        <input
          className="simpleInput"
          name="badge"
          placeholder="Badge"
          value={badge}
          onChange={(e) => getSimpleInput(e,setProductInput,productInput)}
        />
        <input
          className="simpleInput"
          name="stock"
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={(e) => getSimpleInput(e,setProductInput,productInput)}
        />
        <input
          className="simpleInput"
          name="brand"
          placeholder="Brand"
          value={brand}
          onChange={(e) => getSimpleInput(e,setProductInput,productInput)}
        />

        <textarea
          className="simpleInput"
          name="description"
          value={description}
          placeholder="Description"
          onChange={(e) => getSimpleInput(e,setProductInput)}
        />

        <section className="sizeInput">
          <p>Size</p>
          <div className="sizeOption">
            <label>
              <input value="S" onChange={(e) => getSize(e,productInput,setProductInput)} type="checkbox" />S
            </label>
            <label>
              <input value="M" onChange={(e) => getSize(e,productInput,setProductInput)} type="checkbox" />M
            </label>
            <label>
              <input value="L" onChange={(e) => getSize(e,productInput,setProductInput)} type="checkbox" />L
            </label>
            <label>
              <input value="XL" onChange={(e) => getSize(e,productInput,setProductInput)} type="checkbox" />X
            </label>
            <label>
              <input value="XXL" onChange={(e) => getSize(e,productInput,setProductInput)} type="checkbox" />
              XXl
            </label>
            <label>
              <input value="XXXL" onChange={(e) => getSize(e,productInput,setProductInput)}  type="checkbox" />
              XXXL
            </label>
          </div>
        </section>

        <section className="sizeInput">
          <select name="category" onClick={(e) => getSimpleInput(e,setProductInput)}>
            <option value="T-shirts">Tshirts</option>
          </select>
          <label>
            <input
              name="fastDeleivery"
              checked={fastDeleivery}
              placeholder="Fast Deleivery"
              type="checkbox"
              onChange={()=>getDeleivery(setProductInput,fastDeleivery,productInput)}
            />
            <span>Fast deleivery</span>
          </label>
        </section>

        <section>
          <div className="addFeatures">
            <input
              value={feature}
              placeholder="Features"
              onChange={(e) => getFeature(e,setFeature)}
            />
            <button onClick={()=>addFeature(setProductInput,setFeature,feature)}>Add</button>
          </div>
          {features.length > 0 && (
            <button onClick={() => setShowFeature(!showFeature)}>
              Features
            </button>
          )}
          {showFeature && features.length > 0 && (
            <div className="featuresContainer">
              <button onClick={() => setShowFeature(false)}>close</button>
              {features.map((feature, index) => {
                return (
                  <div key={index} className="featureItem">
                    <p>{feature}</p>
                    <i
                      class="fa fa-window-close"
                      aria-hidden="true"
                      onClick={() => removeFeature(index,features,setProductInput,productInput)}
                    ></i>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
      <div className="addProduct__btn">
        <button
          onClick={() => {
            if(!checkEmptyField(productInput)){
              addProductApi(productInput)
              setProductInput(initialProductInput);
            }else{
              toast.info("Field empty!")
            }
            
          }}
        >
          Add
        </button>
        <button onClick={() => setShow(false)}>Cancel</button>
      </div>
    </section>
  );
}

export default AddProductForm;
