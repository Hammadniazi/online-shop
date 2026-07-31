import { Link } from "@tanstack/react-router";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "react-hot-toast";
import { formatPrice, getDisplayPrice, isDiscounted } from "@/utils/price";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { QuantityStepper } from "@/components/QuantityStepper";

export const Cart = () => {
  useDocumentTitle("Cart");
  const { items, removeItem, updateQuantity } = useCartStore();
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const itemCount = useCartStore((state) => state.getItemCount());

  if (items.length === 0) {
    return (
      <div className="text-center py-12 space-y-6">
        <p className="text-2xl text-gray-600">Your cart is empty.</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
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
                src={item.image?.url || "/placeholder.svg"}
                alt={item.title}
                loading="lazy"
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
                        {formatPrice(item.price)}
                      </span>{" "}
                      <span className="font-semibold text-green-600">
                        {formatPrice(discountedPrice)}
                      </span>
                    </>
                  ) : (
                    <span>{formatPrice(item.price)}</span>
                  )}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Qty:</span>
                  <QuantityStepper
                    quantity={item.quantity}
                    onChange={(quantity) => updateQuantity(item.id, quantity)}
                    ariaLabel={`Quantity for ${item.title}`}
                  />
                </div>
              </div>

              {/* Total & Remove */}
              <div className="flex flex-col items-end justify-between">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    {formatPrice(discountedPrice * item.quantity)}
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
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Total:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <Link
            to="/checkout"
            className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mb-3"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/"
            className="block text-center w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
