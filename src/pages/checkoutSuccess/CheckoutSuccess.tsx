import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { CheckIcon } from "@/components/icons";

export const CheckoutSuccess = () => {
  useDocumentTitle("Order Confirmed");
  const [orderNumber] = useState(() =>
    Math.random().toString(36).slice(2, 11).toUpperCase(),
  );
  const [orderDate] = useState(() => new Date());
  const [deliveryDate] = useState(
    () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  );

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-8">
      {/* Success Icon */}
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
        <CheckIcon className="w-12 h-12 text-green-600" />
      </div>

      {/* Message */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="text-xl text-gray-600">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <p className="text-gray-500">
          You will receive a confirmation email shortly.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg p-8 shadow-md max-w-md w-full space-y-4">
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Order Number:</span>
          <span className="font-semibold">#ORD-{orderNumber}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Order Date:</span>
          <span className="font-semibold">
            {orderDate.toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Estimated Delivery:</span>
          <span className="font-semibold">
            {deliveryDate.toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          to="/contact"
          className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};
