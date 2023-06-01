import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../store/reducer/authSlice'


const useAutoLogout = ()=>{
    const auth = useSelector(state=>state.auth)

    const dispatch = useDispatch()
  
    useEffect(()=>{
      const timeout = auth.expiredTime- Date.now();
      //console.log('timeout', timeout)
  
      if(timeout<1000*10){//10 seconds
        dispatch(logout())
        return
      }
  
      const timer = setTimeout(()=>{
        dispatch(logout())
      }, timeout)
  
      return ()=>{
        console.log(111)
        clearTimeout(timer)
      }
  
    },[auth])
  
}

export default useAutoLogout