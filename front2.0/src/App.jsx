import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home/Home'
import Error from './views/Error/Error'
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import Orders from './views/Orders/Orders'
import Admin from './views/Admin/Admin'
import User from './views/User/User'
import Contact from './views/Contact/Contact'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/user' element={<User/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
  )
}

export default App
