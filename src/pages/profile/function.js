
    export const previewImg = (file , setProductInput) => {
       
      console.log(file)
          const reader = new FileReader();
          reader.readAsDataURL(file[0]);
          reader.onloadend = () => {
            setProductInput((productInput)=>{
              console.log(reader.result)
              return {...productInput,img  : reader.result}
          });
        
      };
    }
    



    export const getSimpleInput = (e,setProductInput) => {
        const { name, value } = e.target;
        console.log(name.value)
        setProductInput((productInput) => {
          return { ...productInput, [name]: value };
        });
      };
    
      export const getSize = (e,productInput,setProductInput) => {
        const { value } = e.target;
        const sizeList = productInput.size;
        const isExist = sizeList.includes(value);
        if (isExist) {
          const filterSize = sizeList.filter((size) => size !== value);
          return setProductInput((productInput)=>{
            return { ...productInput, size: filterSize }});
        }
        setProductInput((productInput)=>{
          return { ...productInput, size: [...productInput.size, value] }});
      };
    
      export const getDeleivery = (setProductInput,fastDeleivery,productInput) => {
        if (!fastDeleivery) {
          setProductInput((productInput)=> {
            return{ ...productInput, fastDeleivery: true }
          });
        } else {
          setProductInput((productInput)=> {
            return{ ...productInput, fastDeleivery: false }});
        }
      };
    
      export const getFeature = (e,setFeature) => {
        const { value } = e.target;
        setFeature(value);
      };
    
      export const addFeature = (setProductInput,setFeature,feature) => {
        setProductInput((productInput) => {
          return { ...productInput, features: [...productInput.features,feature] };
        });
      
        setFeature("");
      };
    
      export const removeFeature = (el,features,setProductInput,productInput) => {
        const filterFeatures = features.filter((feature, index) => index !== el);
        setProductInput((productInput)=>{
          return { ...productInput, features: filterFeatures }});
      };