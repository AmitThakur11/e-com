
import {useContext , createContext , useEffect , useState , useReducer } from "react";
import {useAuth} from "../auth/index"

import {initialState , filterReducer , filteredData , sortData} from "./reducers/filter"



export const dataContext = createContext();

const DataProvider = ({children})=>{
    const {authAxios , setLoading} = useAuth();
    const [productList , setProductList] = useState([])
    
   
    const [state, dispatch] = useReducer(filterReducer, initialState);

    useEffect(()=>{
        (async ()=>{
            setLoading(true)
            const response = await authAxios("/product");
            setProductList(response.data.product)
            setLoading(false)
        })()
    },[])

    const getSortedData = sortData(productList, state);
    const getFilterData = filteredData(getSortedData, state);



    return <dataContext.Provider value ={{productList : getFilterData , filterDispatch : dispatch , filterState : state  }}>
        {children}
    </dataContext.Provider>
}

export const useData =()=>useContext(dataContext);


export default DataProvider