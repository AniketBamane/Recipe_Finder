import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useRecipeContext } from '../store/recipeContext'

const AuthLayout = () => {
  const {token} = useRecipeContext()
  const navigate = useNavigate()
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <Outlet/>
  )
}

export default AuthLayout