import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function NeedAuth(props) {
    const auth = useSelector(state=>state.auth)
    const location = useLocation()

    console.log(location)
    return auth.isLogged? 
        props.children: 
        <Navigate 
            to={"/auth-form"}
            replace
            state={{preLocation: location}} 
            
        />

}
