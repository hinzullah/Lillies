import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBookmark,
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const menuItems = [
    {
      id: 1,
      name: "Burger Deluxe",
      description: "Premium beef burger with fresh veggies",
      price: 2500,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      rating: 4.8,
      category: "Burgers",
    },
    {
      id: 2,
      name: "Stir Fry Pasta",
      description: "In-house pasta with chicken by chef Moose",
      price: 3200,
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
      rating: 4.9,
      category: "Pasta",
    },
    {
      id: 3,
      name: "Crispy Samosa",
      description: "Golden fried samosas with spicy filling",
      price: 1500,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
      rating: 4.6,
      category: "Appetizers",
    },
    {
      id: 4,
      name: "Special Indomie",
      description: "Loaded indomie with eggs and veggies",
      price: 1800,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
      rating: 4.7,
      category: "Noodles",
    },
    {
      id: 5,
      name: "Plantain & Fries",
      description: "Crispy plantain with seasoned fries",
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1639744091680-e1c525c93185?w=400&h=300&fit=crop",
      rating: 4.5,
      category: "Sides",
    },
    {
      id: 6,
      name: "Chicken Burger",
      description: "Grilled chicken with special sauce",
      price: 2800,
      image:
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop",
      rating: 4.8,
      category: "Burgers",
    },
  ];

  const orders = [
    {
      id: "ORD-001",
      date: "2024-12-20",
      items: 2,
      total: 5500,
      status: "Delivered",
    },
    {
      id: "ORD-002",
      date: "2024-12-19",
      items: 3,
      total: 4800,
      status: "In Transit",
    },
    {
      id: "ORD-003",
      date: "2024-12-18",
      items: 1,
      total: 2500,
      status: "Delivered",
    },
  ];

  useEffect(() => {
    const userData = JSON.parse(
      sessionStorage.getItem("userData") ||
        localStorage.getItem("userData") ||
        "{}"
    );
    if (userData.name) {
      setUser(userData);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId, change) => {
    setCartItems(
      cartItems
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter((id) => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-200 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full z-10">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              L
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">Lilies</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <FaUser className="text-orange-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "dashboard"
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-orange-50"
                }`}
              >
                <FaHome />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "profile"
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-orange-50"
                }`}
              >
                <FaUser />
                <span>Your Profile</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "orders"
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-orange-50"
                }`}
              >
                <FaBookmark />
                <span>Orders</span>
                {orders.filter((o) => o.status === "In Transit").length > 0 && (
                  <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    {orders.filter((o) => o.status === "In Transit").length}
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("cart")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "cart"
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-orange-50"
                }`}
              >
                <FaShoppingCart />
                <span>Your Cart</span>
                {cartItems.length > 0 && (
                  <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {getGreeting()}, {user.name}! 👋
                </h2>
                <p className="text-gray-600 mt-1">
                  What delicious meal are you craving today?
                </p>
              </div>
              <button className="relative p-3 bg-orange-100 rounded-full hover:bg-orange-200 transition">
                <FaBell className="text-orange-500 text-xl" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            {activeTab === "dashboard" && (
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for meals, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition"
                    >
                      <FaHeart
                        className={
                          favorites.includes(item.id)
                            ? "text-red-500"
                            : "text-gray-300"
                        }
                      />
                    </button>
                    <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="text-sm font-semibold">
                          {item.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-500">
                        ₦{item.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cart Tab */}
        {activeTab === "cart" && (
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h3>
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <FaShoppingCart className="text-gray-300 text-6xl mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-800">
                          {item.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                        <p className="text-orange-500 font-bold mt-2">
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="font-bold text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">
                  <h4 className="font-bold text-lg mb-4">Order Summary</h4>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">
                        ₦{cartTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery</span>
                      <span className="font-semibold">₦500</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-lg text-orange-500">
                        ₦{(cartTotal + 500).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold transition">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Your Orders
            </h3>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg">{order.id}</h4>
                      <p className="text-gray-600 text-sm">
                        {order.date} • {order.items} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-500">
                        ₦{order.total.toLocaleString()}
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="p-8">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Profile Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    className="w-full px-4 py-3 border rounded-lg"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="w-full px-4 py-3 border rounded-lg"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 XXX XXX XXXX"
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
