import { useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../features/auth/authService";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { registerValidationSchema } from "../validators/authSchema";

export function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [register, { isLoading }] = useRegistrationMutation();

  useEffect(() => {
    setServerError("");
    try {
      registerValidationSchema.validateSync(
        { username, password, repeat_password: repeatPassword, email },
        { abortEarly: false }
      );
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        let newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  }, [username, email, password, repeatPassword]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log({
        username,
        password,
        repeat_password: repeatPassword,
        email,
      })
      await registerValidationSchema.validate(
        { username, password, repeat_password: repeatPassword, email },
        { abortEarly: false }
      );
      await register({
        username,
        password,
        repeat_password: repeatPassword,
        email,
      }).unwrap();
      navigate("/login");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        let newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
        return;
      }
      console.error("Ошибка регистрации", error);
      setServerError(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Зарегестрировать аккаунт
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Имя пользователя
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
              {errors.username && (
                <div className="text-sm font-semibold text-red-500">
                  {errors.username}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
              {errors.email && (
                <div className="text-sm font-semibold text-red-500">
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Пароль
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
              {errors.password && (
                <div className="text-sm font-semibold text-red-500">
                  {errors.password}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="repeat_password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Повторите пароль
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="repeat_password"
                  name="repeat_password"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  required
                  autoComplete={false}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
              {errors.repeat_password && (
                <div className="text-sm font-semibold text-red-500">
                  {errors.repeat_password}
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || Object.keys(errors).length != 0}
                className="cursor-pointer flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Зарегестрироваться
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Вы также можете{" "}
            <a
              onClick={() => navigate("/login")}
              className="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              Войти
            </a>
          </p>
          {serverError !== "" && (
            <div className="text-sm font-semibold text-red-500">
              {serverError}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
