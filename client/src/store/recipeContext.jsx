import { createContext , useContext, useEffect, useState } from "react";

const RecipeContext = createContext();

const ContextProvider = ({children}) =>{
  const [token,setToken] = useState(localStorage.getItem("token"));
  const login = (token)=>{
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
  }
  const logout = ()=>{
    setToken(null);
    localStorage.removeItem("token");
  }
  const getToken = ()=>{
    const storedToken  = JSON.parse(localStorage.getItem("token"))
    if (storedToken) setToken(storedToken);
  }
  useEffect(()=>{
    getToken()
    // console.log(token)
  },[])
  return (
  <RecipeContext.Provider value={{token,login,logout}}>
    {children}
  </RecipeContext.Provider>
  )
}

const useRecipeContext = ()=>{
  return useContext(RecipeContext);
}

export { RecipeContext, ContextProvider,useRecipeContext };