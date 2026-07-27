import { useRouter } from "@tanstack/react-router";
import { useCartStore } from "../../stores/cartStore";
import { toast } from "react-hot-toast";
import { getDisplayPrice, isDiscounted } from "../../utils/price";

export const Cart = () => {
  const router = useRouter();
  const { items, removeItem, updateQuantity } = useCartStore();
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const itemCount = useCartStore((state) => state.getItemCount());

  if (items.length === 0) {
    return (
      <div className="text-center py-12 space-y-6">
        <p className="text-2xl text-gray-600">Your cart is empty.</p>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => router.navigate({ to: "/" })}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {items.map((item) => {
          const discountedPrice = getDisplayPrice(item);

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg p-4 shadow-md flex gap-4"
            >
              {/* Product Image */}
              <img
                src={item.image?.url || "https://via.placeholder.com/100"}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {isDiscounted(item) ? (
                    <>
                      <span className="line-through">
                        ${item.price.toFixed(2)}
                      </span>{" "}
                      <span className="font-semibold text-green-600">
                        ${discountedPrice.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span>${item.price.toFixed(2)}</span>
                  )}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`qty-${item.id}`}
                    className="text-sm text-gray-600"
                  >
                    Qty:
                  </label>
                  <input
                    id={`qty-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.id,
                        Math.max(1, parseInt(e.target.value) || 1),
                      )
                    }
                    className="w-16 px-2 py-1 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Total & Remove */}
              <div className="flex flex-col items-end justify-between">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    ${(discountedPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    removeItem(item.id);
                    toast.success(`${item.title} removed from cart`);
                  }}
                  className="text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg p-6 shadow-lg sticky top-20">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-3 mb-6 border-b pb-4">
            <div className="flex justify-between text-gray-700">
              <span>Items:</span>
              <span>{itemCount}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={() => router.navigate({ to: "/checkout" })}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mb-3"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => router.navigate({ to: "/" })}
            className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
