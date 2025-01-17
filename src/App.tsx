import React from 'react';
import { ShoppingCart, Heart, Search, Menu, ChevronRight } from 'lucide-react';
import { products } from './data';
import { useCart } from './contexts/CartContext';
import { Cart } from './components/Cart';

function App() {
  const { state, dispatch } = useCart();
  const cartItemsCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: any) => {
    const button = document.getElementById(`add-to-cart-${product.id}`);
    if (button) {
      button.classList.add('animate-wiggle');
      setTimeout(() => {
        button.classList.remove('animate-wiggle');
      }, 500);
    }
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 text-gray-600 mr-4 cursor-pointer hover:text-black transition-colors" />
              <h1 className="text-2xl font-bold text-gray-800">SneakerVault</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Search className="h-6 w-6 text-gray-600 cursor-pointer hover:text-black transition-colors" />
              <Heart className="h-6 w-6 text-gray-600 cursor-pointer hover:text-black transition-colors" />
              <button 
                className="relative"
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              >
                <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer hover:text-black transition-colors" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[500px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">Step into Style</h2>
            <p className="text-xl mb-8">Discover our latest collection of premium sneakers</p>
            <a 
              href="https://innotech-vn.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 transition-transform duration-300"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800">Featured Products</h3>
          <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full  object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4">
                  <Heart className="h-6 w-6 text-gray-600 hover:text-red-500 transition-colors transform hover:scale-110" />
                </button>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-black transition-colors">{product.name}</h4>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex space-x-2 mb-4">
                {product.size && product.size.map((s, index) => (
    <span key={index} className="border p-2 rounded hover:bg-gray-200 transition cursor-pointer">
        {s}
    </span>
))}
  </div>
                  
                
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">${product.price}</span>
                  <button 
                    id={`add-to-cart-${product.id}`}
                    onClick={() => handleAddToCart(product)}
                    className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors transform hover:scale-105 active:scale-95 transition-transform duration-150"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Cart />
    </div>
  );
}

export default App;