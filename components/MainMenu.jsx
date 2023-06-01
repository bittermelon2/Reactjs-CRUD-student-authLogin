import React from 'react'
import {Routes, Route, Link, useSearchParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../store/reducer/authSlice'

export default function Main() {
  const auth = useSelector(state=>state.auth)
  const dispatch = useDispatch()

  return (
    <header>
      <ul>
        <li>
          <Link to={"/"}>Home Page Page</Link>
        </li>
        {!auth.isLogged && (
          <li>
            <Link to={"/auth-form"}>Login/Sign Up</Link>
          </li>
        )}

        {auth.isLogged && (
          <>
            <li>
              <Link to={"/profile"}>{auth.user.username}</Link>
            </li>
            <li>
              <Link to={"/"} onClick={() => dispatch(logout())}>
                Log Out
              </Link>
            </li>
            <li>
              <Link to={"/student"} >
                 Student Info
              </Link>
            </li>
          </>
        )}

      </ul>
    </header>
  );
}
