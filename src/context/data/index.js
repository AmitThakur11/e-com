import {
  useContext,
  createContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { useAuth } from "../auth/index";
import { loadProducts } from "../../apiCalls";
import {
  initialState,
  filterReducer,
  filteredData,
  sortData,
} from "./reducers/filter";
import { useUser } from "../user/index";

export const dataContext = createContext();

const DataProvider = ({ children }) => {
  const { setLoading } = useAuth();
  const [productList, setProductList] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const { userDispatch } = useUser();

  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    loadProducts(setLoading, setProductList);
  }, [userDispatch, setLoading]);

  const getSortedData = sortData(productList, state);
  const getFilterData = filteredData(getSortedData, state);

  return (
    <dataContext.Provider
      value={{
        productList: getFilterData,
        originalList : productList,
        filterDispatch: dispatch,
        filterState: state,
        sidebar,
        setSidebar,
        setProductList
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export const useData = () => useContext(dataContext);

export default DataProvider;
