import React from 'react'
import {Routes, Route, Link, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import Layout from './components/Layout'
import NeedAuth from './components/NeedAuth'
import useAutoLogout from './hooks/useAutoLogout'
import StudentList from './components/Student/StudentList/StudentList'
import StudentPage from './pages/StudentPage'




export default function App() {
  useAutoLogout()

  return (
    // <div>
    //   <MainMenu/>
    //   <Routes>
    //       <Route path='/' element={<HomePage/>}/>
    //       <Route path='/profile' element={<ProfilePage/>}/>
    //   </Routes>
    // </div>
            //    {/* <Route path={'profile'} element={
            //   auth.isLogged?<ProfilePage/>:<Navigate to={"/auth-form"} replace/>
            // }/> */}
    <Layout>
     
      <Routes>
           <Route path={'/'} element={<HomePage/>}/>

            <Route path={'profile'} element={<NeedAuth><ProfilePage/></NeedAuth>}/>
           <Route path={'auth-form'} element={<AuthPage/>}/>
           <Route path={'student'} element={<NeedAuth><StudentPage/></NeedAuth>}/>
      </Routes>
    </Layout>
  )
}
