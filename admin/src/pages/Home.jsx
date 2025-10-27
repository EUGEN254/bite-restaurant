import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Sidebar/>
      {/* main content */}
      <div>
        <Navbar/>
        {/* main Page Wrapper */}
        <div>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Home