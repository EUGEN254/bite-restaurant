import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext(null);

export const AdminContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dishes, setDishes] = useState([]);
  const currSymbol = 'KES'
  const [admin, setAdmin] = useState(null);

  // Fetch all dishes from database
  const fetchDishes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/dishes/all-dishes`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setDishes(response.data.dishes || []);
      }
    } catch (error) {
      console.error("Error fetching dishes:", error);
      toast.error("Failed to load dishes");
    } 
  };

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

  const logoutAdmin = async() => {
    const response = await axios.post(`${backendUrl}/api/user/logout-admin`,{},{
      withCredentials:true
    });
    if(response.data.success){
      setAdmin(null);
      toast.success(response.data.message)
    }
  };

  // adding dish
  const addDish = (dish) => setDishes((prev) => [dish, ...prev]);
  const removeDish = (id) => setDishes((prev) => prev.filter((s) => s._id !== id));
  const updateDish = (id, updatedDish) => {
    setDishes((prev) => prev.map((dish) => 
      dish._id === id ? { ...dish, ...updatedDish } : dish
    ));
  };

  useEffect(() => {
    fetchCurrentAdmin();
    fetchDishes(); // Fetch dishes when context loads
  }, []);

  const value = {
    backendUrl,
    admin,
    setAdmin,
    logoutAdmin,
    fetchCurrentAdmin,
    currSymbol,
    addDish,
    removeDish,
    updateDish,
    dishes,
    fetchDishes, 
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