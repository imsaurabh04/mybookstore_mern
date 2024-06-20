import { createContext, useContext, useEffect, useState } from "react";
import ProductAPI from "./components/api/ProductAPI";
import UserAPI from "./components/api/UserAPI";
import CategoryAPI from "./components/api/CategoryAPI";
import axios from "axios";

const GlobalState = createContext();

export const DataProvider = ({children}) => {

    const [token, setToken] = useState(null);

    const refreshToken = async() => {
      try {
        const res = await axios.post("/api/users/refreshtoken");
        setToken(res.data.accessToken);
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
 
    useEffect(() => {
      const accessToken = localStorage.getItem("access-token");

      if(accessToken) refreshToken();
    }, [])
    
    const state = {
        token: [ token, setToken],
        productAPI: ProductAPI(),
        userAPI: UserAPI(token),
        categoryAPI: CategoryAPI()
      }
      
    return <GlobalState.Provider value={state}>
        {children}
    </GlobalState.Provider>
}

export const useGlobalState = () => {
    return useContext(GlobalState);
}
