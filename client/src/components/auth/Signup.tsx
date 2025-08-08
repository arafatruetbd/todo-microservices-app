import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/features/auth/authAPI";
import { useNavigate } from "react-router-dom";
import AuthFormLayout from "./AuthFormLayout";
import InputField from "../shared/InputField";
import { useEffect, useState } from "react";
import Error from "../shared/Error";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import Button from "../shared/Button";

interface SignupFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>();

  const [registerUser, { isLoading, error: responseError, data }] =
    useRegisterMutation();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (responseError) {
      setError(extractErrorMessage(responseError));
    }

    if (data?.token) {
      navigate("/todos");
    }
  }, [data, responseError, navigate]);

  const onSubmit = (data: SignupFormInputs) => {
    setError("");
    registerUser({ email: data.email, password: data.password });
  };

  return (
    <AuthFormLayout
      title="Create your account"
      alternateText="Already have an account?"
      alternateLink="/login"
      alternateLinkText="Sign in now"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          register={register("email", { required: "Email is required" })}
          error={errors.email}
        />

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

        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center text-sm font-semibold"
          loading={isLoading || isSubmitting}
        >
          Sign up
        </Button>
        {error !== "" && <Error message={error} />}
      </form>
    </AuthFormLayout>
  );
}
