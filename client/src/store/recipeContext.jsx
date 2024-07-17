import { createContext , useEffect, useState } from "react";

const recipeContext = createContext();

const ContextProvider = ({children}) =>{
  const [token,setToken] = useState("");
  const login = (token)=>{
    setToken(token);
    localStorage.setItem("token", token);
  }
  const logout = ()=>{
    setToken(null);
    localStorage.removeItem("token");
  }
  const getToken = ()=>{
    setToken(localStorage.getItem("token"));
  }
  useEffect(()=>{
    getToken()
    console.log(token)
  },[token])
  return (
  <recipeContext.Provider value={{ login,logout,token}}>
    {children}
  </recipeContext.Provider>
  )
}

export { recipeContext, ContextProvider };