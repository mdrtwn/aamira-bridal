"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";
import styles from "../dashboard.module.css";

const initialState: LoginState = { error: "" };

export default function LoginForm({ nextPath, developmentMode }: Readonly<{ nextPath: string; developmentMode: boolean }>) {
  const [state, action, pending] = useActionState(login, initialState);
  return (
    <form action={action} className={styles.loginForm}>
      <input type="hidden" name="next" value={nextPath} />
      <label htmlFor="dashboard-identity">{developmentMode ? "Username" : "Email address"}</label>
      <input id="dashboard-identity" name="identity" type={developmentMode ? "text" : "email"} autoComplete={developmentMode ? "username" : "email"} required />
      <label htmlFor="dashboard-password">Password</label>
      <input id="dashboard-password" name="password" type="password" autoComplete="current-password" required />
      {state.error ? <p className={styles.formError} role="alert">{state.error}</p> : null}
      <button type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
