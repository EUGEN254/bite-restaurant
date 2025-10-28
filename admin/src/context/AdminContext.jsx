import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext(null);

export const AdminContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dishes, setDishes] = useState([]);
  const currSymbol = 'KES'
  const [admin, setAdmin] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
      name: '',
      description: '',
      status: 'active'
    });
  const [loading, setLoading] = useState(false);

  // Fetch categories function
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/categories`,
        { withCredentials: true }
      );
  
      if (response.data.success) {
        // Transform the data to match your frontend format
        const formattedCategories = response.data.data.map(cat => ({
          id: cat._id,
          name: cat.name,
          description: cat.description || '',
          status: cat.status || 'active',
          dishesCount: cat.dishesCount || 0, 
          createdAt: cat.createdAt || new Date().toISOString().split('T')[0]
        }));
        
        setCategories(formattedCategories);
        return formattedCategories;
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Add category function
  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validation
      if (!newCategory.name?.trim()) {
        return toast.error("Category name is required");
      }
  
      // Sending to backend
      const response = await axios.post(
        `${backendUrl}/api/categories/add-category`,
        {
          name: newCategory.name.trim(),
          description: newCategory.description.trim(),
          status: newCategory.status
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to add category");
      }
  
      // Category was created successfully
      const createdCategory = response.data.category;
      
      // Add the new category to your local state
      const newCatWithFrontendFormat = {
        id: createdCategory._id || createdCategory.id,
        name: createdCategory.name,
        description: createdCategory.description,
        status: createdCategory.status,
        dishesCount: 0,
        createdAt: createdCategory.createdAt || new Date().toISOString().split('T')[0]
      };
      
      setCategories([...categories, newCatWithFrontendFormat]);
      setShowAddModal(false);
      setNewCategory({ name: '', description: '', status: 'active' });
      
      toast.success(response.data.message || "Category added successfully!");
      
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error(
        error.response?.data?.message || error.message || "Failed to add category"
      );
    } finally {
      setLoading(false);
    }
  };

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
    fetchDishes();
    fetchCategories(); 
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
    categories, 
    setCategories,
    showAddModal, 
    setShowAddModal,
    newCategory, 
    setNewCategory,
    handleAddCategory,
    fetchCategories,
    loading,
    setLoading
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