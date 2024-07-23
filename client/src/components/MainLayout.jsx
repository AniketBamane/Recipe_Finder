import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useRecipeContext } from '../store/recipeContext'

const MainLayout = () => {
  const {token} = useRecipeContext()
  const navigate = useNavigate()
  useEffect(() =>{
    if(!token){
      navigate("/signin")
    }
  },[token])
  return (
    <Outlet />
  )
}

export default MainLayout
