import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // Form handling & validation
import { useRegisterMutation } from "@/features/auth/authAPI"; // RTK Query hook for registration API
import { useNavigate } from "react-router-dom"; // Navigation after signup
import AuthFormLayout from "@/components/auth/AuthFormLayout"; // Common layout wrapper for authentication pages
import InputField from "@/components/shared/InputField"; // Reusable input component
import Error from "@/components/shared/Error"; // Error message display component
import { extractErrorMessage } from "@/utils/extractErrorMessage"; // Helper to format API errors
import Button from "@/components/shared/Button"; // Reusable button component

// Form field types for TypeScript
interface SignupFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  // React Hook Form setup
  const {
    register, // register form fields
    handleSubmit, // handles form submission
    watch, // watches specific form values (used for confirm password check)
    formState: { errors, isSubmitting }, // form state (errors & submission status)
  } = useForm<SignupFormInputs>();

  // RTK Query mutation for registration
  const [registerUser, { isLoading, error: responseError, data }] =
    useRegisterMutation();

  // Local error message state
  const [error, setError] = useState("");

  // Router navigation hook
  const navigate = useNavigate();

  // Watch for API response or errors
  useEffect(() => {
    // If API returns an error, store it for display
    if (responseError) {
      setError(extractErrorMessage(responseError));
    }

    // If registration succeeds and token is received, navigate to /todos
    if (data?.token) {
      navigate("/todos");
    }
  }, [data, responseError, navigate]);

  // Submit handler for signup form
  const onSubmit = (data: SignupFormInputs) => {
    setError(""); // clear old errors
    registerUser({ email: data.email, password: data.password }); // call API
  };

  return (
    <AuthFormLayout
      title="Create your account"
      alternateText="Already have an account?"
      alternateLink="/login"
      alternateLinkText="Sign in now"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email input */}
        <InputField
          id="email"
          label="Email address"
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
          autoComplete="new-password"
          register={register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
          error={errors.password}
        />

        {/* Confirm password input - must match password */}
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          register={register("confirmPassword", {
            required: "Please confirm your password",
            validate: (val) =>
              val === watch("password") || "Passwords do not match",
          })}
          error={errors.confirmPassword}
        />

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center text-sm font-semibold"
          loading={isLoading || isSubmitting}
        >
          Sign up
        </Button>

        {/* Error message display */}
        {error !== "" && <Error message={error} />}
      </form>
    </AuthFormLayout>
  );
}
