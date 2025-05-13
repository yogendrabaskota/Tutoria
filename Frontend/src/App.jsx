
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import JobList from './components/hero/JobList'

function App() {

  return (
    
    <BrowserRouter>
    <Navbar />

    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<JobList />} />

    </Routes>
    </BrowserRouter>
    
    
    
  )
}

export default App