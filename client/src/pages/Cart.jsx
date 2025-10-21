import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Cart = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { food } = location.state || {}
    const [loading, setLoading] = useState(false)
    const [cartItems, setCartItems] = useState(food ? [food] : []) 
    console.log('Cart items:', cartItems)

    // Handle quantity changes
    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return
        
        setCartItems(prev => prev.map((item, i) => 
            i === index ? { ...item, quantity: newQuantity } : item
        ))
    }

    // Remove item from cart
    const removeItem = (index) => {
        setCartItems(prev => prev.filter((_, i) => i !== index))
    }

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const quantity = item.quantity || 1
            return total + (item.price * quantity)
        }, 0)
    }

    // Handle checkout - pass all cart data to payment page
const handleCheckout = () => {
    setLoading(true)
    const orderDetails = {
      items: cartItems,
      total: calculateTotal(),
      itemCount: cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
      timestamp: new Date().toISOString()
    };
  
    navigate('/checkout', { state: { orderDetails } });
  };

    // Handle continue shopping
    const handleContinueShopping = () => {
        navigate(-1) // Going back to previous page
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                        Your Order Cart
                    </h1>
                    <p className="text-gray-600">
                        Review your items and proceed to checkout
                    </p>
                </div>

                {/* Cart Content */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Processing your order...</p>
                    </div>
                ) : cartItems.length > 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Desktop Table */}
                        <div className="hidden md:block">
                            <table className="w-full">
                                <thead className="bg-amber-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Item</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Quantity</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {cartItems.map((item, index) => {
                                        const quantity = item.quantity || 1
                                        const itemTotal = item.price * quantity
                                        
                                        return (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    Kes {item.price}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(index, quantity - 1)}
                                                            disabled={quantity <= 1}
                                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center font-medium">{quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(index, quantity + 1)}
                                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-800">
                                                    Kes {itemTotal}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => removeItem(index)}
                                                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden">
                            {cartItems.map((item, index) => {
                                const quantity = item.quantity || 1
                                const itemTotal = item.price * quantity
                                
                                return (
                                    <div key={index} className="p-4 border-b border-gray-200">
                                        <div className="flex gap-4">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                                                <p className="text-amber-600 font-semibold mt-1">Kes {item.price}</p>
                                                
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(index, quantity - 1)}
                                                            disabled={quantity <= 1}
                                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center font-medium">{quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(index, quantity + 1)}
                                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(index)}
                                                        className="text-red-500 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="mt-2 text-right font-semibold">
                                                    Total: Kes {itemTotal}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Order Summary */}
                        <div className="border-t border-gray-200 p-6 bg-gray-50">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold">Total Amount:</span>
                                <span className="text-2xl font-bold text-amber-600">
                                    Kes {calculateTotal()}
                                </span>
                            </div>
                            
                            <div className="flex gap-4">
                                <button
                                    onClick={handleContinueShopping}
                                    className="flex-1 py-3 px-6 border border-amber-500 text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-colors"
                                >
                                    Continue Shopping
                                </button>
                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className="flex-1 py-3 px-6 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 disabled:opacity-50 transition-colors"
                                >
                                    {loading ? 'Processing...' : 'Proceed to Checkout'}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                        <div className="text-6xl mb-4">🛒</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
                        <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
                        <button
                            onClick={handleContinueShopping}
                            className="bg-amber-500 text-white py-3 px-8 rounded-xl font-semibold hover:bg-amber-600 transition-colors"
                        >
                            Browse Menu
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart