import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/shared/api/client";
import styles from "./registration.module.css";
import { parseErrors, type FieldErrors } from "@/shared/lib/parseErrors";

type RegistrationForm = {
  username: string;
  email: string;
  gender: "man" | "woman" | "others";
  password1: string;
  password2: string;
};

export const Registration = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegistrationForm>({
    username: "",
    email: "",
    gender: "others",
    password1: "",
    password2: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const registration = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      await api.post("auth/registration", {
        username: form.username,
        email: form.email,
        gender: form.gender,
        password1: form.password1,
        password2: form.password2,
      });

      navigate("/login");
    } catch (error) {
      const fieldErrors = parseErrors(error);

      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
      } else {
        setErrors({ username: "Ошибка регистрации" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Регистрация</h2>

        <form autoComplete="off" className={styles.form}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.username && <div className={styles.error}>{errors.username}</div>}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="others">Others</option>
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </select>
          {errors.gender && <div className={styles.error}>{errors.gender}</div>}

          <input
            name="password1"
            type="password"
            placeholder="Password"
            value={form.password1}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.password1 && <div className={styles.error}>{errors.password1}</div>}

          <input
            name="password2"
            type="password"
            placeholder="Confirm Password"
            value={form.password2}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.password2 && <div className={styles.error}>{errors.password2}</div>}

          <button
            className={styles.button}
            onClick={registration}
            disabled={loading}
          >
            {loading ? "Регистрируем аккаунт..." : "Зарегистрироваться"}
          </button>
        </form>

        <div className={styles.footer}>
          Есть аккаунт?
          <Link to="/login" className={styles.link}>
            {" "}Войти
          </Link>
        </div>
      </div>
    </section>
  );
};