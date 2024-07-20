import React, { useEffect } from 'react'
import { useRecipeContext } from '../store/recipeContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const {logout} = useRecipeContext()
  const navigate = useNavigate()
  useEffect(() =>{
    logout()
    navigate('/signin')
  },[])
  return null;
}

export default Logout