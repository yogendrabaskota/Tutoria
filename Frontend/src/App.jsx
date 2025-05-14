
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import JobList from './components/hero/JobList'
import JobDetail from './components/job/JobDetails'

function App() {

  return (
    
    <BrowserRouter>
    <Navbar />

    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<JobList />} /> 
      <Route path="/detail/:jobId" element={<JobDetail />} /> 

      {/* apply button in job */}

    </Routes>
    </BrowserRouter>
    
    
    
  )
}

export default App