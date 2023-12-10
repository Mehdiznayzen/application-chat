import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Register, Chat, Login, SetAvatar } from './pages/index'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Chat/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/setAvatar' element={<SetAvatar/>}/>
    </Routes>
  )
}

export default App