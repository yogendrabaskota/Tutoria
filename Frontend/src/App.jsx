import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store"; // Make sure your Redux store is correctly exported from this path
import "./App.css";

import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import JobList from "./components/hero/JobList";
import JobDetail from "./components/job/JobDetails";
import EditProfile from "./components/auth/EditProfile";
import Dashboard from "./pages/Dashboard";
import HeroSection from "./pages/home/HeroSection";
import HomePage from "./pages/home/HomePage";
import About from "./pages/home/About";
import Contact from "./pages/home/Contact";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<JobList />} /> */}
          {/* <Route path="/" element={<HeroSection />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/detail/:jobId" element={<JobDetail />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
