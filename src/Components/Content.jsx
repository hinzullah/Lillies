import React, { useState } from "react";

const Content = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const foods = [
    {
      id: 1,
      menu: "Stir fry Pasta",
      ingredients: "Delicious stir-fried pasta with fresh vegetables, savory sauce, and your choice of protein",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      menu: "Meat Balls",
      ingredients: "Juicy homemade meatballs served with rich tomato sauce and fresh herbs",
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      menu: "Burger Meals",
      ingredients: "Premium beef burger with crispy lettuce, tomatoes, cheese, and special sauce",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    },
  ];

  const handleEmailSubmit = () => {
    if (!email || !email.includes("@")) {
      setSubmitStatus({ type: "error", message: "Please enter a valid email address" });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    setTimeout(() => {
      setSubmitStatus({ 
        type: "success", 
        message: "🎉 You're subscribed! We'll notify you of updates." 
      });
      setEmail("");
      setIsSubmitting(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEmailSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-16">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800">
              Order <span className="text-orange-500">food</span> anytime, anywhere
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Browse from our list of specials to place your order and have food
              delivered to you in no time. Affordable, tasty and fast!
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg">
              Order Now
            </button>
          </div>

          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop" 
              alt="Delicious food presentation" 
              className="w-full max-w-md mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* Download Section */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a href="#" className="transform hover:scale-105 transition-transform" aria-label="Download on Google Play">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
              alt="Get it on Google Play" 
              className="h-14"
            />
          </a>
          <a href="#" className="transform hover:scale-105 transition-transform" aria-label="Download on App Store">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
              alt="Download on App Store" 
              className="h-14"
            />
          </a>
        </div>

        {/* Special Meals Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Special Meals of the day!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check our specials of the day and get discounts on all our meals and
            swift delivery to whatever location within Ilorin.
          </p>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {foods.map((food) => (
            <div 
              key={food.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={food.image} 
                  alt={food.menu}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Special
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {food.menu}
                </h3>
                <p className="text-gray-600 mb-4">
                  {food.ingredients}
                </p>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Get notified when we update!
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Get notified when we add new items to our specials menu, update
              our price list or have promos!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your email address"
                className="flex-1 max-w-md px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-lg"
                disabled={isSubmitting}
                aria-label="Email address for notifications"
              />
              <button 
                onClick={handleEmailSubmit}
                disabled={isSubmitting}
                className="bg-white text-orange-500 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Subscribing..." : "Get Notified"}
              </button>
            </div>

            {submitStatus && (
              <div 
                className={`mt-6 p-4 rounded-lg ${
                  submitStatus.type === "success" 
                    ? "bg-green-500 bg-opacity-20 border border-green-300" 
                    : "bg-red-500 bg-opacity-20 border border-red-300"
                }`}
                role="alert"
              >
                {submitStatus.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;