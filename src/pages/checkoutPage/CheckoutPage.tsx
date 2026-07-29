import { useRouter } from "@tanstack/react-router";
import { useCartStore } from "../../stores/cartStore";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatPrice, getDisplayPrice } from "../../utils/price";

const checkoutFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Email must be a valid email address"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
  cardHolderName: z.string().min(1, "Card holder name is required"),
  cardNumber: z
    .string()
    .regex(/^\d{13,19}$/, "Card number must be 13-19 digits"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3-4 digits"),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export const CheckoutPage = () => {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({ resolver: zodResolver(checkoutFormSchema) });

  const onSubmit = () => {
    clearCart();
    toast.success("Order completed successfully!");
    router.navigate({ to: "/checkout-success" });
  };

  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Order Review */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {items.map((item) => {
              const discountedPrice = getDisplayPrice(item);

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
                    {formatPrice(discountedPrice * item.quantity)}
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
            <div>
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Street Address"
              {...register("streetAddress")}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.streetAddress ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.streetAddress && (
              <p className="text-red-600 text-sm mt-1">
                {errors.streetAddress.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="City"
                {...register("city")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.city ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.city && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="State"
                {...register("state")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.state ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.state && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="ZIP Code"
                {...register("zipCode")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.zipCode ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.zipCode && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.zipCode.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Country"
                {...register("country")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.country ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.country && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>

          <div>
            <input
              type="text"
              placeholder="Card Holder Name"
              {...register("cardHolderName")}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.cardHolderName ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.cardHolderName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.cardHolderName.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Card Number"
              inputMode="numeric"
              {...register("cardNumber")}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.cardNumber ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.cardNumber && (
              <p className="text-red-600 text-sm mt-1">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="MM/YY"
                {...register("expiry")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.expiry ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.expiry && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.expiry.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="CVV"
                inputMode="numeric"
                {...register("cvv")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.cvv ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.cvv && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.cvv.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Order Total */}
        <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Order Total:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Complete Purchase
          </button>
        </div>
      </div>
    </form>
  );
};
