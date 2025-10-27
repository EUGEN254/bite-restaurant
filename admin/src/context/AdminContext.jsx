import { createContext, useContext, useEffect, useState } from "react";
import axios  from 'axios'

export const AdminContext = createContext(null);

export const AdminContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [admin, setAdmin] = useState(null);

  // getting admin data
  const fetchCurrentAdmin = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/admin`, {
        withCredentials: true,
      });

      if (response.data.success && response.data.user) {
        setAdmin(response.data.user);
      } else {
        setAdmin(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCurrentAdmin();
  }, []);

  const value = {
    backendUrl,
    admin,
    setAdmin,
    fetchCurrentAdmin,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "useAdminContext must be used within a AdminContextProvider"
    );
  }
  return context;
};
