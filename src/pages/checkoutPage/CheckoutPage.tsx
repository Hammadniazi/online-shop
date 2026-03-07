import { useRouter } from "@tanstack/react-router";
import { useCartStore } from "../../stores/cartStore";

export const CheckoutPage = () => {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const handleCheckout = () => {
    clearCart();
    router.navigate({ to: "/checkout-success" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Order Review */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {items.map((item) => {
              const discountedPrice = item.discountPercentage
                ? item.price * (1 - item.discountPercentage / 100)
                : item.price;

              return (
                <div
                  key={item.id}
                  className="flex justify-between text-gray-700 py-2 border-b"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(discountedPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
          <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="text"
            placeholder="Street Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              placeholder="State"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="ZIP Code"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              placeholder="Country"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>

          <input
            type="text"
            placeholder="Card Holder Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="text"
            placeholder="Card Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              placeholder="CVV"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Order Total */}
        <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Order Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
};
