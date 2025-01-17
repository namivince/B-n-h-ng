import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => dispatch({ type: 'TOGGLE_CART' })} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {state.items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center space-y-4">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
              <p className="text-lg text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4">
                {state.items.map((item) => (
                  <div key={item.id} className="mb-4 flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) },
                            })
                          }
                          className="rounded-full p-1 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: { id: item.id, quantity: item.quantity + 1 },
                            })
                          }
                          className="rounded-full p-1 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                      className="rounded-full p-1 hover:bg-gray-100"
                    >
                      <X className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t px-4 py-4">
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <button className="mt-4 w-full rounded-full bg-black py-3 text-white hover:bg-gray-800">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};