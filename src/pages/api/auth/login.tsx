// pages/auth/login.tsx

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: userInfo.email,
      password: userInfo.password,
    });

    if (res?.error) {
      // Handle errors
      alert("Invalid credentials");
    } else {
      // Redirect based on role
      router.push("/");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={(e) =>
            setUserInfo({ ...userInfo, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
