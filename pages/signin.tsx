import { signIn } from "next-auth/react";

export default function Signin() {
  return (
    <div>
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: "http://localhost:3000",
          })
        }
      >
        Sign in with Google
      </button>
    </div>
  );
}
