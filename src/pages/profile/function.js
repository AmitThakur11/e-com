import axios from "axios"
export const initialInputs = {
  img : "",
  name : "",
  price:"",
  discount :"",
  badge : "",
  stock : "",
  brand : "",
  description : "",
  size : [],
  category : "T-shirts",
  fastDeleivery : false,
  features : []
}


export const previewImg = (img,setImg,setPreview)=>{
  setImg(img)
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onloadend =()=>{
    setPreview(reader.result)
  }

}
export const uploadImg = async (img,setUserInputs) => {
  const formData = new FormData();
  formData.append("file", img);
  formData.append("upload_preset", "j70dvps3");

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dfxhtdmfq/image/upload",
    formData
  );
  console.log(response)
  setUserInputs((userInputs)=>{
    return {...userInputs , img : response.url}
  })
  return response
}

export const takeSimpleInputs = (e,setUserInputs)=>{
  const {name,value} = e.target;
  console.log(name,value)
  setUserInputs((userInputs)=>{
    return {...userInputs , [name]: value}
  })

}