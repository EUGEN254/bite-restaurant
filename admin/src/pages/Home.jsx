import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from "react-router-dom";
import { useAdminContext } from '../context/AdminContext';

const Home = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const {admin} = useAdminContext()

  const handleLinkClick = () => {
    setIsMobileSidebarOpen(false);
  };

  return admin && (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar onLinkClick={handleLinkClick} />
      </div>
      
      {/* Mobile sidebar overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-50 w-64 h-full">
            <Sidebar onLinkClick={handleLinkClick} />
          </div>
        </div>
      )}
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <div className="flex-shrink-0">
          <Navbar onMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        </div>
        
        {/* Main content wrapper */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 w-full max-w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home