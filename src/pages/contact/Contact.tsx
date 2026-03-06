import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const contactFormSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Email must be a valid email address"),
  subject: z.string().min(3, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = () => {
    alert("Thank you for contacting us! We will get back to you soon.");
    reset();
  };
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-900 ">Contact us</h1>
        <p className="text-lg text-gray-600">
          We'd love to hear from you. Send us a message!
        </p>
      </div>
      {/* Contact Form */}
      <form
        className="bg-white rounded-lg shadow-lg p-8 space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="Your name please..."
            {...register("fullName")}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.fullName && (
            <p className="text-red-600 text-sm mt-1">
              {errors.fullName.message}{" "}
            </p>
          )}
        </div>
        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Inquiry about products"
            {...register("subject")}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.subject ? "border-red-500" : "border-gray-300"} `}
          />
          {errors.subject && (
            <p className="text-red-600 text-sm mt-1 ">
              {errors.subject.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your email address"
            {...register("email")}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.email ? "border-red-500" : "border-gray-300"} `}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1 ">{errors.email.message}</p>
          )}
        </div>
        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            placeholder="Your message..."
            rows={5}
            {...register("message")}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.message ? "border-red-500" : "border-gray-300"} `}
          />
          {errors.message && (
            <p className="text-red-600 text-sm mt-1 ">
              {errors.message.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors "
        >
          Send Message
        </button>
      </form>
    </div>
  );
};
