/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";

// Validation schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(11, "Address must be at least 11 digits").optional(),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .optional(),
});

// Type for form data
type FormData = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [signup, { data }] = useSignupMutation();
  console.log(data);

  // Typing the onSubmit function
  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Registering...");
    const registerData = {
      ...data,
      role: "user",
    };
    try {
      const res = await signup(registerData).unwrap();

      console.log("API Response:", res);
      toast.success("Registered successfully", { id: toastId, duration: 2000 });
      navigate("/login"); // or another route
    } catch (err: any) {
      toast.error(err?.message || "An error occurred", {
        id: toastId,
        duration: 2000,
      });
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <Card className="max-w-sm w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Name"
              {...register("name")}
              className={`w-full ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`w-full ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="tel"
              placeholder="Phone"
              {...register("phone")}
              className={`w-full ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Address"
              {...register("address")}
              className={`w-full ${errors.address ? "border-red-500" : ""}`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            Register
          </Button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
      </Card>
    </div>
  );
}
