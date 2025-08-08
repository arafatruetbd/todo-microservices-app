import { useEffect, useState } from "react";
import { useLoginMutation } from "@/features/auth/authAPI";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthFormLayout from "./AuthFormLayout";
import InputField from "../shared/InputField";
import Error from "../shared/Error";
import Button from "../shared/Button";
import { extractErrorMessage } from "@/utils/extractErrorMessage";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();
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

  const onSubmit = (formData: LoginFormInputs) => {
    setError("");
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          register={register("email", { required: "Email is required" })}
          error={errors.email}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          register={register("password", { required: "Password is required" })}
          error={errors.password}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center text-sm font-semibold"
          loading={isLoading || isSubmitting}
        >
          Sign in
        </Button>
        {error !== "" && <Error message={error} />}
      </form>
    </AuthFormLayout>
  );
}
