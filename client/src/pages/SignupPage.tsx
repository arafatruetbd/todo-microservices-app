// src/pages/SignupPage.tsx
import PublicRoute from "@/components/shared/PublicRoute";
import Signup from "@/components/auth/Signup";

export default function SignupPage() {
  return (
    <PublicRoute>
      <Signup />
    </PublicRoute>
  );
}
