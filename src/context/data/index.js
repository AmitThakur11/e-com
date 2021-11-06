
import {useContext , createContext , useEffect , useState , useReducer } from "react";
import {useAuth} from "../auth/index"
import axios from "axios";
import {initialState , filterReducer , filteredData , sortData} from "./reducers/filter"
import { toast } from "react-toastify";
import {useUser} from "../user/index"



export const dataContext = createContext();

const DataProvider = ({children})=>{
    const {setLoading} = useAuth();
    const [productList , setProductList] = useState([])
    const [sidebar, setSidebar] = useState(false)
    const {userDispatch} = useUser()
    
   
    const [state, dispatch] = useReducer(filterReducer, initialState);

    useEffect(()=>{
        try{

            (async ()=>{
                setLoading(true)
                const response = await axios.get("/product");
                setProductList(response.data.product)
                setLoading(false)
            })()
            
        }
        catch(err){
            setLoading(false);
            toast.error(err.response.data.msg)
        }
        
    },[userDispatch, setLoading])

    const getSortedData = sortData(productList, state);
    const getFilterData = filteredData(getSortedData, state);



    return <dataContext.Provider value ={{productList : getFilterData , filterDispatch : dispatch , filterState : state , sidebar , setSidebar }}>
        {children}
    </dataContext.Provider>
}

export const useData =()=>useContext(dataContext);


export default DataProvider