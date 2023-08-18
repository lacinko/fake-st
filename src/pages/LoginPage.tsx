import { useState } from "react";
import Button from "../components/Button";
import { LoginRequest, useLoginMutation } from "../redux/api/authApi";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/user/userSlice";

function LoginPage() {
  const [formState, setFormState] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  function handleClick() {
    setShow(!show);
  }

  function handleChange({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogin() {
    try {
      const user = await login(formState).unwrap();
      dispatch(
        setCredentials({
          user: { username: formState.username },
          token: user.token,
        })
      );
      if (user.token) navigate("/user-profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="mt-10 bg-slate-100 px-4 py-10">
        <h2 className="text-xl font-bold uppercase tracking-wider text-blue-500">
          Login
        </h2>
        <div className="mt-4">
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
            value={formState.username}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="">Password</label>
          <div className="relative w-full border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400">
            <input
              name="password"
              type={show ? "text" : "password"}
              className="w-full rounded-md border-none px-4 py-3 text-sm outline-none"
              value={formState.password}
              onChange={handleChange}
            />
            <button
              className="absolute bottom-2 right-2 rounded-md bg-gray-300 px-2 py-1"
              onClick={handleClick}
            >
              {show ? "Show" : "Hide"}
            </button>
          </div>
        </div>
        <Button handleOnClick={handleLogin} styles="w-full mt-8 uppercase">
          Login
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
