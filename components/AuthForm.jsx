import React,{useRef, useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom'
import { useRegisterMutation, useLoginMutation } from '../store/api/authApi'
import {login, logout} from '../store/reducer/authSlice'

export default function AuthForm() {
  const [isLoginForm, setIsLoginForm] = useState(true)


  const [regFn, {error:regError}] = useRegisterMutation()
  const [loginFn, {error:loginError}]=useLoginMutation()

  const usernameInp = useRef()
  const pwdInp = useRef()
  const emailInp = useRef()

  //obtain dispatch
  const dispatch = useDispatch()

  //obtain navigate
  const navigate = useNavigate()

  //obtain location
  const location = useLocation()
  //console.log('authform-->', location.state.preLocation)
  const from =location.state?.preLocation?.pathname || "/"
  console.log('authform-->', from)

  const submitHandler=(e)=>{
    e.preventDefault()

    const username = usernameInp.current.value
    const password = pwdInp.current.value

    //console.log(username, password)
    if(isLoginForm){
        console.log('Login-->', username, password)
        loginFn({
            identifier: username,
            password
        }).then(res=>{
            if(!res.error){
                console.log('Login success', res)
                //need a status indicating login success
                //include flag, jwt and user info
                //jump page to root directory

                dispatch(login({
                    token: res.data.jwt,
                    user: res.data.user
                }))
                //navigate to previous page, it cannot be fixed here
                navigate(from, {replace:true}) //cannot return to login page
            }
        })
    }else{
        const email = emailInp.current.value
        console.log('Sign up-->', username, password, email)
        regFn({
            username, password, email
        }).then(res=>{
            console.log(res)
            if(!res.error){
                //sign up success
                setIsLoginForm(true)
            }
            }
           
        )
    }
  }
  return (
    <div>
        <p style={{color: 'red'}}>
            { regError   && regError.data.error.message}
        </p>
        <p style={{color: 'red'}}>
            { loginError && loginError.data.error.message}
        </p>
        <h2>{isLoginForm? 'Login': 'Sign up'}</h2>
        <form onSubmit={submitHandler}>
            <div>
                <input ref={usernameInp} type='text' placeholder='User Name'/>
            </div>
            {
                !isLoginForm && 
                <div>
                    <input ref={emailInp} type='email' placeholder='Email'/>
                </div>
            }
            <div>
                <input ref={pwdInp} type='password' placeholder='Password'/>
            </div>
            <div>
                <button>{isLoginForm? 'Login': 'Sign up'}</button>
                <a href='#' onClick={
                    event=>{
                        event.preventDefault()
                        setIsLoginForm(preState=>!preState)
                    }
                }>
                {isLoginForm? 'Register if without account': 'Login if with account'}
                </a>
            </div>           

        </form>
    </div>
  )
}
