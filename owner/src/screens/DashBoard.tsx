import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelecter'

const DashBoard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.userReducer)
  const token: any = localStorage.getItem("token" || "")

  useEffect(() => {
    if(token){
      console.log("I have token")
    }
    else{
        navigate('/login')
    }
  }, [user])

  return (
    <div>dashBoard</div>
  )
}

export default DashBoard