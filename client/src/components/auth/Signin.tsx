import { useEffect, useState } from "react";
import { useLoginMutation } from "@/features/auth/authAPI"; // RTK Query mutation hook for login
import { useNavigate } from "react-router-dom"; // Navigation hook
import { useForm } from "react-hook-form"; // Form handling
import AuthFormLayout from "@/components/auth/AuthFormLayout"; // Reusable layout for auth forms
import InputField from "@/components/shared/InputField"; // Reusable input component
import Error from "@/components/shared/Error"; // Error message display
import Button from "@/components/shared/Button"; // Reusable button component
import { extractErrorMessage } from "@/utils/extractErrorMessage"; // Helper to parse error messages

// Define the shape of the form inputs
interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  // React Hook Form setup for form state and validation
  const {
    register, // function to register form fields
    handleSubmit, // handler for form submission
    formState: { errors, isSubmitting }, // form state (validation errors, submission state)
  } = useForm<LoginFormInputs>();

  // RTK Query hook for login API call
  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  // Local state for storing error messages
  const [error, setError] = useState("");

  // React Router navigation
  const navigate = useNavigate();

  // Handle API response or error
  useEffect(() => {
    // If API returns an error, display it
    if (responseError) {
      setError(extractErrorMessage(responseError));
    }

    // If login is successful and token exists, redirect to /todos
    if (data?.token) {
      navigate("/todos");
    }
  }, [data, responseError, navigate]);

  // Form submission handler
  const onSubmit = (formData: LoginFormInputs) => {
    setError(""); // Clear previous errors
    login({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <AuthFormLayout
      title="Sign in to your account"
      alternateText="Not a member?"
      alternateLink="/signup"
      alternateLinkText="Sign up now"
    >
      {/* Login form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email input */}
        <InputField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          register={register("email", { required: "Email is required" })}
          error={errors.email}
        />

        {/* Password input */}
        <InputField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          register={register("password", { required: "Password is required" })}
          error={errors.password}
        />

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center text-sm font-semibold"
          loading={isLoading || isSubmitting}
        >
          Sign in
        </Button>

        {/* Error message */}
        {error !== "" && <Error message={error} />}
      </form>
    </AuthFormLayout>
  );
}
