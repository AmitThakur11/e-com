import "./style.css";
import { FaRegImage, FaTrash } from "react-icons/fa";
import { useState } from "react";
import {useAuth}  from "../../context/auth"
import {useData}  from "../../context/data/index"
import {toast} from "react-toastify"

import {
  previewImg,
  uploadImg,
  takeSimpleInputs
} from "./function";
export default function AddProductForm({initialInputs, setShow ,formAction,profile,setProfile}) {
  
  const [preview, setPreview] = useState("");
  const [userInputs, setUserInputs] = useState(initialInputs);
  const [img, setImg] = useState(userInputs.img);
  const [feature, setFeature] = useState("");
  const {setLoading} = useAuth();
  const {productList ,setProductList} = useData()

  const takeFeature = (e) => {
    setFeature(e.target.value);
  };
  const addFeature = () => {
    if (userInputs.features.length > 5) {
      return alert("Feature limit exceed");
    }
    if (feature === "") {
      return alert("First write something");
    }
    setUserInputs((userInputs) => {
      return { ...userInputs, features: [...userInputs.features, feature] };
    });
    setFeature("");
  };

  const takeSizeInputs = (e, setUserInputs, userInputs) => {
    const { size } = userInputs;
    const { value } = e.target;
    if (size.includes(value)) {
      console.log("already there");
      const filterSize = size.filter((feature) => feature !== value);
      setUserInputs((userInputs) => {
        return { ...userInputs, size: filterSize };
      });
    } else {
      setUserInputs((userInputs) => {
        return { ...userInputs, size: [...userInputs.size, value] };
      });
    }
  };

  const takeDeleivery = (e, setUserInputs) => {
    let { name, value } = e.target;
    value = value === "on" ? false : true;

    setUserInputs((userInputs) => {
      return { ...userInputs, [name]: value };
    });
  };

  const removeFeature = (id, userInputs, setUserInputs) => {
    const filteredFeatures = userInputs.features.filter(
      (feature, index) => index !== id
    );
    setUserInputs((userInputs) => {
      return { ...userInputs, features: filteredFeatures };
    });
  };

  const uploadProduct = async (initialInputs, userInputs, img,formAction) => {

    try{
      const {
      name,
      price,
      discount,
      badge,
      stock,
      brand,
      description,
      size,
      features
    } = userInputs;
    
    const checkEmpty =
      img !== "" &&
      name !== "" &&
      price !== "" &&
      discount !== "" &&
      badge !== "" &&
      stock !== "" &&
      brand !== "" &&
      description !== "" &&
      size.length !== 0 &&
      features.length !== 0
    if (!checkEmpty) {
      return alert("Empty field");
    }

let payload
if(typeof(img) === 'string'){
  console.log("is a url")
  payload = {...userInputs ,  price  : Number(price),discount : Number(discount), stock : Number(stock) }
}else{
  const response = await uploadImg(img,setUserInputs);
  console.log("not a url so first upload and then url") 
  payload = {...userInputs,img : response.data.url , price  : Number(price),discount : Number(discount), stock : Number(stock) }
  
}
  
    
    // const payload = {...userInputs,img : response.data.url , price  : Number(price),discount : Number(discount), stock : Number(stock) }
    formAction({setLoading,payload,profile,setProfile, productList,setProductList})
    // console.log(payload)
  

    }catch(err){
      toast.error(err.response)
    }
    
  };
  console.log("user inputs",userInputs)
  return (
    <div className="addProductPage">
      <div className="addProductContainer">
        <div className="allInputs">
          <section className="addProduct_one">
            <div className="addImage">
              <input
                id="imgInput"
                type="file"
                onChange={(e) =>
                  previewImg(e.target.files[0], setImg, setPreview ,setUserInputs)
                }
                accept="image/*"
              />
              <label className="imgIcon" htmlFor="imgInput">
                <FaRegImage />
              </label>
              <div className="preview">
                {(preview || userInputs.img )&& <img src={userInputs.img ? userInputs.img : preview} alt="t shirt" />}
              </div>
            </div>
          </section>
          <section className="addProduct_two">
            <input
              name="name"
              className="simpleInput"
              placeholder="Name of product"
              value={userInputs.name}
              onChange={(e) => takeSimpleInputs(e, setUserInputs)}
            />
            <input
              className="simpleInput"
              name="price"
              placeholder="Price"
              value={userInputs.price}
              type="number"
              onChange={(e) => takeSimpleInputs(e, setUserInputs)}
            />
            <input
              className="simpleInput"
              placeholder="Discount"
              name="discount"
              value={userInputs.discount}
              type="number"
              onChange={(e) => takeSimpleInputs(e, setUserInputs)}
            />
            <input
              className="simpleInput"
              name="badge"
              value ={userInputs.badge}

              placeholder="Badge"
              onChange={(e) => takeSimpleInputs(e, setUserInputs)}
            />
            <input
              className="simpleInput"
              name="stock"
              placeholder="Stock"
              value ={userInputs.stock}

              type="number"
              onChange={(e) => takeSimpleInputs(e, setUserInputs)}
            />
            {/* onChange = {(e)=>takeSimpleInputs(e,setUserInputs)} */}
            <input
              className="simpleInput"
              name="brand"
              placeholder="Brand"
              value ={userInputs.brand}

              onChange={(e) => takeSimpleInputs(e, setUserInputs)}
            />
            <textarea
              className="simpleInput"
              name="description"
              value ={userInputs.description}
              placeholder="Description"
              onChange={(e) => takeSimpleInputs(e, setUserInputs)}
            />
          </section>
          <section className="addProduct_three">
            <div className="inputSection">
              <p>Size</p>
              <div className="sizeOption">
                <label>
                  <input
                    name="size"
                    value="S"
                    checked = {userInputs.size.includes('S')}

                    type="checkbox"
                    onChange={(e) =>
                      takeSizeInputs(e, setUserInputs, userInputs)
                    }
                  />
                  S
                </label>
                <label>
                  <input
                    name="size"
                    value="M"
                    checked = {userInputs.size.includes('M')}
                    type="checkbox"
                    onChange={(e) =>
                      takeSizeInputs(e, setUserInputs, userInputs)
                    }
                  />
                  M
                </label>
                <label>
                  <input
                    name="size"
                    value="L"
                    checked = {userInputs.size.includes('L')}
                    type="checkbox"
                    onChange={(e) =>
                      takeSizeInputs(e, setUserInputs, userInputs)
                    }
                  />
                  L
                </label>
                <label>
                  <input
                    name="size"
                    value="XL"
                    type="checkbox"
                    checked = {userInputs.size.includes('XL')}
                    onChange={(e) =>
                      takeSizeInputs(e, setUserInputs, userInputs)
                    }
                  />
                  XL
                </label>
                <label>
                  <input
                    name="size"
                    value="XXL"
                    type="checkbox"
                    checked = {userInputs.size.includes('XXL')}
                    onChange={(e) =>
                      takeSizeInputs(e, setUserInputs, userInputs)
                    }
                  />
                  XXl
                </label>
                <label>
                  <input
                    name="size"
                    value="XXXL"
                    type="checkbox"
                    checked = {userInputs.size.includes('XXXL')}
                    onChange={(e) =>
                      takeSizeInputs(e, setUserInputs, userInputs)
                    }
                  />
                  XXXL
                </label>
              </div>
            </div>
            <div className="inputSection">
              <select
                name="category"
                onClick={(e) => takeSimpleInputs(e, setUserInputs)}
              >
                <option className="option" value="T-shirts">
                  Tshirts
                </option>
                <option className="option" value="Boxers">
                  Boxers
                </option>
              </select>
            </div>

            <div className="inputSection">
              <label>
                <input
                  name="fastDeleivery"
                  placeholder="Fast Deleivery"
                  type="checkbox"
                  checked = {userInputs.fastDeleivery}
                  value={userInputs.fastDeleivery ? "on" : ""}
                  onChange={(e) => takeDeleivery(e, setUserInputs)}
                />
                <span>Fast deleivery</span>
              </label>
            </div>
            <div className="inputSection">
              <div className="addFeatures">
                <input
                  placeholder="Features"
                  value={feature}
                  onChange={(e) => takeFeature(e)}
                />
                <button onClick={() => addFeature()}>Add</button>
              </div>
            </div>
            <div className="featuresList">
              {userInputs.features.map((feature, index) => {
                return (
                  <div className="featureItem" key={index}>
                    <p>{feature}</p>
                    <span
                      onClick={() =>
                        removeFeature(index, userInputs, setUserInputs)
                      }
                    >
                      <FaTrash />
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
        <section className="formAction">
          <button
            onClick={() => {
              
              uploadProduct(initialInputs, userInputs, img ,formAction);
            }}
          >
            Upload
          </button>
          <button
            onClick={() => {
              setUserInputs(initialInputs);
              setPreview("");
              setImg("");
              setShow(false)
            }}
          >
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
}
