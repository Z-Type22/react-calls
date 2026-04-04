import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { api } from "@/shared/api/client";
import styles from "./login.module.css";
import { useCurrentUser } from "@/app/providers/user/UserProvider";

type LoginForm = {
  username: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();

  const { setCurrentUser } = useCurrentUser();

  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const login = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("auth/login", {
        username: form.username,
        password: form.password,
      });

      const { access, refresh } = response.data;

      Cookies.set("access_token", access);
      Cookies.set("refresh_token", refresh);

      const profile = await api.get("users/me");
      setCurrentUser(profile.data);

      navigate("/");
    } catch {
      setError("Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Авторизация</h2>

        <form autoComplete="off" className={styles.form}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={styles.input}
          />

          {error && <div className={styles.error}>{error}</div>}

          <button
            className={styles.button}
            onClick={login}
            disabled={loading}
          >
            {loading ? "Входим..." : "Войти"}
          </button>
        </form>

        <div className={styles.footer}>
          Нет аккаунта?
          <Link to="/registration" className={styles.link}>
            {" "}Зарегистрироваться
          </Link>
        </div>
      </div>
    </section>
  );
};
