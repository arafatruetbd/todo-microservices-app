import http, { RefinedResponse, ResponseType } from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";

export const options: Options = {
  vus: 20,          // 20 virtual users
  duration: "30s",  // run for 30s
};

export default function (): void {
  // 1. Login
  const loginRes: RefinedResponse<ResponseType> = http.post(
    "http://localhost:5000/auth/login",
    JSON.stringify({
      email: "test@example.com",
      password: "password",
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  check(loginRes, {
    "login succeeded": (r: RefinedResponse<ResponseType>) => r.status === 200,
  });

  const token: string | undefined = loginRes.json("token") as string;

  // 2. Create Todo
  const todoRes: RefinedResponse<ResponseType> = http.post(
    "http://localhost:5001/todos",
    JSON.stringify({
      title: "Load test todo",
      completed: false,
    }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  check(todoRes, {
    "todo created": (r: RefinedResponse<ResponseType>) => r.status === 201,
  });

  sleep(1);
}
