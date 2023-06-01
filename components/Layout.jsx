import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProfilePage from '../pages/ProfilePage'
import MainMenu from './MainMenu'

export default function Layout(props) {
  return (
    <div>
      <MainMenu/>
      <hr/>
      {props.children}
    </div>
  )
}
