/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";

import { toast } from "sonner";
import { verifyToken } from "@/utils/verifyToken";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/features/auth/authSlice";

// Validation schema
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Type for form data
type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [login, { data }] = useLoginMutation();
  console.log(data);

  // Typing the onSubmit function
  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Logging in");

    try {
      const res = await login(data).unwrap();

      console.log("API Response:", res); // Add this line to inspect the response

      if (!res.data || !res.token) {
        throw new Error("Login failed: No token received");
      }

      const user: any = verifyToken(res.token);
      if (!user) {
        throw new Error("Invalid user information");
      }

      dispatch(setUser({ user: user, token: res.token }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      if (user?.role == "user") {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
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
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            Login
          </Button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500">
            Sign up
          </a>
        </p>
      </Card>
    </div>
  );
}
