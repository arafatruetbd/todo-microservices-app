// src/pages/SigninPage.tsx
import PublicRoute from "@/components/shared/PublicRoute";
import Signin from "@/components/auth/Signin";

export default function SignupPage() {
  return (
    <PublicRoute>
      <Signin />
    </PublicRoute>
  );
}
